"use client";

import React, { useEffect, useRef, type CSSProperties } from "react";

export interface PlasmaWaveProps {
  color1?: string;
  color2?: string;
  color3?: string;
  backgroundColor?: string;
  speed?: number;
  scale?: number;
  intensity?: number;
  mouseInteraction?: boolean;
  dpr?: number;
  className?: string;
  style?: CSSProperties;
}

type RGB = [number, number, number];

const VERTEX_SHADER = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uPointer;
uniform float uScale;
uniform float uIntensity;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uBg;

// Dual-wave interference & domain warping plasma
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
  uv *= uScale;

  // Cursor wave distortion
  vec2 ptr = (uPointer - 0.5) * 2.0;
  float distToPtr = length(uv - ptr * 0.85);
  uv += (uv - ptr * 0.85) * (0.18 / (distToPtr + 0.45)) * sin(distToPtr * 6.0 - uTime * 2.5);

  vec2 p = uv;
  float t = uTime;
  float accum = 0.0;
  vec3 waveCol = vec3(0.0);

  // 6-octave dual-wave interference loop
  for (float i = 1.0; i <= 6.0; i++) {
    p.x += 0.38 / i * sin(i * 2.4 * p.y + t * 0.85 + 0.3 * i);
    p.y += 0.38 / i * cos(i * 2.1 * p.x - t * 0.75 + 0.5 * i);

    float w1 = sin(p.x * (2.2 + i * 0.4) + t);
    float w2 = cos(p.y * (2.5 + i * 0.35) - t * 1.1);
    float interference = w1 * w2 + sin(length(p) * 3.2 - t * 1.3);

    float ridge = 0.045 / (abs(interference) + 0.065);
    accum += ridge / i;

    vec3 layerTint = mix(uColor1, uColor2, 0.5 + 0.5 * sin(i * 1.2 + t * 0.4));
    layerTint = mix(layerTint, uColor3, smoothstep(0.65, 1.4, ridge));
    waveCol += layerTint * ridge * (0.36 / i);
  }

  waveCol *= uIntensity;

  // Core hot highlights at wave intersections
  float coreGlow = smoothstep(1.35, 2.8, accum * uIntensity);
  vec3 finalRgb = mix(uBg, waveCol, clamp(accum * 0.55, 0.0, 1.0));
  finalRgb = mix(finalRgb, uColor3, coreGlow * 0.55);

  // Soft radial vignette inside canvas
  float vig = smoothstep(1.65, 0.25, length(uv / uScale));
  finalRgb *= (0.75 + 0.25 * vig);

  outColor = vec4(clamp(finalRgb, 0.0, 1.0), 1.0);
}`;

function hexToRgb(hex: string, fallback: RGB): RGB {
  const clean = hex.replace("#", "").trim();
  if (clean.length === 6) {
    const n = parseInt(clean, 16);
    if (!Number.isNaN(n)) {
      return [
        ((n >> 16) & 255) / 255,
        ((n >> 8) & 255) / 255,
        (n & 255) / 255,
      ];
    }
  }
  return fallback;
}

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function PlasmaWave({
  color1 = "#0055FF",
  color2 = "#38bdf8",
  color3 = "#f4f4ed",
  backgroundColor = "#0c0b10",
  speed = 0.85,
  scale = 2.1,
  intensity = 1.15,
  mouseInteraction = true,
  dpr = 1.5,
  className = "",
  style,
}: PlasmaWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const currentProps = {
    c1: hexToRgb(color1, [0, 0.33, 1]),
    c2: hexToRgb(color2, [0.22, 0.74, 0.97]),
    c3: hexToRgb(color3, [0.96, 0.96, 0.93]),
    bg: hexToRgb(backgroundColor, [0.05, 0.04, 0.06]),
    speed,
    scale,
    intensity,
    mouseInteraction,
    dpr,
  };

  const propsRef = useRef(currentProps);
  useEffect(() => {
    propsRef.current = currentProps;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let cleanupGl: (() => void) | null = null;
    let initialized = false;

    const initWebGL = () => {
      if (initialized) return;
      initialized = true;

      const canvas = document.createElement("canvas");
      canvas.style.display = "block";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      container.appendChild(canvas);

      const gl = canvas.getContext("webgl2", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
      });
      if (!gl) {
        canvas.remove();
        return;
      }

      const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      const program = gl.createProgram();
      if (!vs || !fs || !program) {
        canvas.remove();
        return;
      }

      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.bindAttribLocation(program, 0, "aPosition");
      gl.linkProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.deleteProgram(program);
        canvas.remove();
        return;
      }

      const vao = gl.createVertexArray();
      gl.bindVertexArray(vao);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW
      );
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.useProgram(program);

      const uResolution = gl.getUniformLocation(program, "uResolution");
      const uTime = gl.getUniformLocation(program, "uTime");
      const uPointer = gl.getUniformLocation(program, "uPointer");
      const uScale = gl.getUniformLocation(program, "uScale");
      const uIntensity = gl.getUniformLocation(program, "uIntensity");
      const uColor1 = gl.getUniformLocation(program, "uColor1");
      const uColor2 = gl.getUniformLocation(program, "uColor2");
      const uColor3 = gl.getUniformLocation(program, "uColor3");
      const uBg = gl.getUniformLocation(program, "uBg");

      let width = 1;
      let height = 1;
      let clock = 0;
      let last = 0;
      let raf = 0;
      let visible = true;
      const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

      const resize = (cw?: number, ch?: number) => {
        const ratio = Math.min(
          window.devicePixelRatio || 1,
          propsRef.current.dpr
        );
        const w = cw ?? container.clientWidth;
        const h = ch ?? container.clientHeight;
        const nextW = Math.max(1, Math.round(w * ratio));
        const nextH = Math.max(1, Math.round(h * ratio));
        if (nextW === width && nextH === height) return;
        width = nextW;
        height = nextH;
        canvas.width = width;
        canvas.height = height;
      };

      const onMove = (e: PointerEvent) => {
        if (!visible || !propsRef.current.mouseInteraction) return;
        const rect = container.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;
        pointer.tx = (e.clientX - rect.left) / rect.width;
        pointer.ty = 1.0 - (e.clientY - rect.top) / rect.height;
      };

      const tick = (now: number) => {
        raf = requestAnimationFrame(tick);
        if (!visible || document.hidden) {
          last = now;
          return;
        }
        const p = propsRef.current;
        const dt = last ? Math.min((now - last) / 1000, 0.1) : 1 / 60;
        last = now;
        clock += dt * p.speed;

        pointer.x += (pointer.tx - pointer.x) * 0.08;
        pointer.y += (pointer.ty - pointer.y) * 0.08;

        gl.viewport(0, 0, width, height);
        gl.uniform2f(uResolution, width, height);
        gl.uniform1f(uTime, clock);
        gl.uniform2f(uPointer, pointer.x, pointer.y);
        gl.uniform1f(uScale, p.scale);
        gl.uniform1f(uIntensity, p.intensity);
        gl.uniform3f(uColor1, p.c1[0], p.c1[1], p.c1[2]);
        gl.uniform3f(uColor2, p.c2[0], p.c2[1], p.c2[2]);
        gl.uniform3f(uColor3, p.c3[0], p.c3[1], p.c3[2]);
        gl.uniform3f(uBg, p.bg[0], p.bg[1], p.bg[2]);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      const visibility = new IntersectionObserver((entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
      });
      visibility.observe(container);

      const sizes = new ResizeObserver(([entry]) => {
        if (!entry) return;
        resize(entry.contentRect.width, entry.contentRect.height);
      });
      sizes.observe(container);
      resize();

      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(tick);

      cleanupGl = () => {
        cancelAnimationFrame(raf);
        visibility.disconnect();
        sizes.disconnect();
        window.removeEventListener("pointermove", onMove);
        gl.deleteProgram(program);
        gl.deleteBuffer(buffer);
        gl.deleteVertexArray(vao);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        canvas.remove();
      };
    };

    const bootObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          initWebGL();
          bootObserver.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    bootObserver.observe(container);

    return () => {
      bootObserver.disconnect();
      if (cleanupGl) cleanupGl();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={style}
    />
  );
}

