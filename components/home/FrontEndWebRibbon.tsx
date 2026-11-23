"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export interface WebProjectItem {
  id: string;
  num: string;
  title: string;
  description: string;
  previewImage: string;
  liveUrl: string;
  tags: string[];
}

interface FrontEndWebRibbonProps {
  projects: WebProjectItem[];
}

const VERT_SRC = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG_SRC = `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform float uDpr;
uniform sampler2D uAtlas;
uniform vec2 uGrid;
uniform float uN;
uniform float uOffset;
uniform float uCardW;
uniform float uCardH;
uniform float uLabH;
uniform float uTexH;
uniform float uTexLH;
uniform float uRad;
uniform float uA0;
uniform float uC0;
uniform float uLo;
uniform float uHi;
uniform float uStride;
uniform vec4 uFade;
uniform float uShrink;
uniform float uTime;
uniform float uWob;
uniform float uE0;
uniform float uMag;
uniform float uLift;
uniform float uVMag;
uniform float uHover;
uniform float uHoverT;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float sdBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

vec3 bg(vec2 p) {
  vec2 uv = p / max(uRes, vec2(1.0));
  vec3 deep = vec3(0.051, 0.063, 0.094);
  vec3 glow = vec3(0.075, 0.115, 0.215);
  float rad = clamp(1.0 - length((uv - vec2(0.5, 0.52)) * vec2(1.15, 1.45)), 0.0, 1.0);
  return mix(deep, glow, pow(rad, 1.8) * 0.55);
}

vec4 strip(vec2 p) {
  float s = p.x - uA0 + uOffset;
  float k = floor(s / uStride + 0.5);
  float local = s - k * uStride;

  bool hov = abs(k - uHover) < 0.5;
  float hT = hov ? uHoverT : 0.0;

  float scaleMod = (1.0 - 0.055 * uShrink) * (1.0 + 0.025 * hT);
  float w = uCardW * scaleMod;
  float h = uCardH * scaleMod;

  float cc = uC0 + sin(s * 0.0032 + uTime * 0.85) * uWob;
  vec2 c = vec2(local, p.y - cc);

  // Exact integer slot & 2D grid cell computation (immune to ANGLE/D3D11 mod precision bugs)
  float fk = floor(k + 0.5);
  float slot = fk - uN * floor((fk + 0.5) / uN);
  slot = floor(slot + 0.5);
  if (slot >= uN) slot -= uN;
  if (slot < 0.0) slot += uN;
  float ri = floor((slot + 0.5) / uGrid.x);
  float ci = slot - uGrid.x * ri;

  float cellH = uTexH + uTexLH;
  vec4 col = vec4(0.0);

  float inside = clamp(0.5 - sdBox(c, vec2(w, h) * 0.5, min(uRad, h * 0.5)), 0.0, 1.0);
  if (inside > 0.0) {
    vec2 iuv = vec2(c.x / w + 0.5, c.y / h + 0.5);
    vec2 auv = vec2(
      (ci + clamp(iuv.x, 0.003, 0.997)) / uGrid.x,
      (ri + (uTexLH + clamp(iuv.y * uTexH, 2.0, uTexH - 2.0)) / cellH) / uGrid.y
    );
    vec3 img = texture2D(uAtlas, auv).rgb;
    if (hT > 0.001) {
      img = clamp((img - 0.5) * (1.0 + 0.1 * hT) + 0.5 + 0.03 * hT, 0.0, 1.0);
    }
    col = vec4(img * inside, inside);
  }

  float ly = c.y + h * 0.5 + uLabH;
  if (ly >= 0.0 && ly < uLabH && abs(c.x) < w * 0.5) {
    vec2 luv = vec2(c.x / w + 0.5, ly / uLabH);
    vec2 auv2 = vec2(
      (ci + clamp(luv.x, 0.003, 0.997)) / uGrid.x,
      (ri + clamp(luv.y * uTexLH, 2.0, uTexLH - 2.0) / cellH) / uGrid.y
    );
    vec4 lab = texture2D(uAtlas, auv2);
    col = mix(col, vec4(lab.rgb, 1.0), lab.a);
  }
  return col;
}

vec2 bendMap(vec2 p, out float t, out float sg) {
  float hw = p.x < uA0 ? uA0 - uLo : uHi - uA0;
  float u = (p.x - uA0) / max(hw, 1.0);
  float a = abs(u);
  sg = u < 0.0 ? -1.0 : 1.0;

  float vy = (p.y - uC0) / max(uCardH, 1.0);
  float e0 = max(0.22, uE0 - 0.09 * vy * vy);
  t = smoothstep(e0, 1.0, a);

  float span = max(1.0 - e0, 0.001);
  float ex = max(a - e0, 0.0);
  float aq = a - uMag * ex * ex / (2.0 * span);
  float cl = uC0 - sg * uLift * t * t;

  return vec2(uA0 + sg * aq * hw, uC0 + (p.y - cl) / (1.0 + uVMag * t));
}

void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uRes;
  vec3 base = bg(p);
  vec3 col;
  vec4 s;
  float t, sg;
  vec2 q = bendMap(p, t, sg);

  if (t < 0.002) {
    s = strip(q);
    col = mix(base, s.rgb, s.a);
  } else {
    vec2 dd = vec2(sg * 22.0, -sg * 7.0) * t * t;
    vec3 acc = vec3(0.0);
    vec3 ws = vec3(0.0);
    float al = 0.0;
    for (int i = 0; i < 7; i++) {
      float k = float(i) / 6.0;
      vec3 w = vec3(
        exp(-pow(k / 0.38, 2.0)),
        exp(-pow((k - 0.5) / 0.38, 2.0)),
        exp(-pow((k - 1.0) / 0.38, 2.0))
      );
      s = strip(q + dd * (k - 0.5));
      acc += mix(base, s.rgb, s.a) * w;
      ws += w;
      al += s.a;
    }
    col = acc / ws;
    al /= 7.0;
    float hl = smoothstep(0.03, 0.22, t) * (1.0 - smoothstep(0.22, 0.55, t));
    col = mix(col, col * (1.0 - 0.1 * t * t) + vec3(0.015, 0.035, 0.08) * hl, al);
  }

  col = mix(base, col, smoothstep(uFade.x, uFade.y, p.y) * (1.0 - smoothstep(uFade.z, uFade.w, p.y)));
  col += (hash(p * uDpr + fract(uTime) * 61.0) - 0.5) * 0.006;
  gl_FragColor = vec4(col, 1.0);
}
`;

const UNIFORM_NAMES = [
  "uRes",
  "uDpr",
  "uAtlas",
  "uGrid",
  "uN",
  "uOffset",
  "uCardW",
  "uCardH",
  "uLabH",
  "uTexH",
  "uTexLH",
  "uRad",
  "uA0",
  "uC0",
  "uLo",
  "uHi",
  "uStride",
  "uFade",
  "uShrink",
  "uTime",
  "uWob",
  "uE0",
  "uMag",
  "uLift",
  "uVMag",
  "uHover",
  "uHoverT",
] as const;

type UniformKey = (typeof UNIFORM_NAMES)[number];

const CARD_PALETTES = [
  { stops: ["#0b1224", "#10244d", "#0055FF"], orb: "#38bdf8" },
  { stops: ["#0e111a", "#172554", "#1d4ed8"], orb: "#60a5fa" },
  { stops: ["#090d18", "#111b36", "#0284c7"], orb: "#38bdf8" },
] as const;

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";

  for (let wi = 0; wi < words.length; wi++) {
    const test = cur ? `${cur} ${words[wi]}` : words[wi];
    if (ctx.measureText(test).width <= maxWidth) {
      cur = test;
    } else {
      if (cur) lines.push(cur);
      cur = words[wi];
      if (lines.length === maxLines - 1) {
        const rem = words.slice(wi + 1).join(" ");
        let lastLine = cur + (rem ? ` ${rem}` : "");
        if (ctx.measureText(lastLine).width > maxWidth) {
          while (
            lastLine.length > 4 &&
            ctx.measureText(`${lastLine}…`).width > maxWidth
          ) {
            lastLine = lastLine.slice(0, -1);
          }
          lastLine += "…";
        }
        lines.push(lastLine);
        return lines;
      }
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  return lines;
}

export function FrontEndWebRibbon({ projects }: FrontEndWebRibbonProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const scrubRailRef = useRef<HTMLDivElement>(null);
  const scrubThumbRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [autoDrift, setAutoDrift] = useState(true);
  const autoDriftRef = useRef(true);

  const controlsRef = useRef<{
    step: (dir: number) => void;
    jumpToRatio: (pct: number) => void;
    jumpToIndex: (idx: number) => void;
  }>({
    step: () => {},
    jumpToRatio: () => {},
    jumpToIndex: () => {},
  });

  const handleToggleDrift = useCallback(() => {
    setAutoDrift((prev) => {
      const next = !prev;
      autoDriftRef.current = next;
      return next;
    });
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || projects.length === 0) return;

    // Create a fresh canvas per effect run so React StrictMode remounts never reuse a lost WebGL context
    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 w-full h-full block outline-none";
    canvas.setAttribute("aria-label", "Curved 16:9 Front-End Web Projects Ribbon");
    stage.prepend(canvas);

    const N = projects.length;
    // Exact 16:9 per tile: 960 x 540 (+ 68px top label strip), 2x2 grid = 1920 x 1216 safe GPU texture
    const CW = 960;
    const CH = 540;
    const LH = 68;
    const GX = 2;
    const GY = 2;

    const atlasCv = document.createElement("canvas");
    atlasCv.width = CW * GX;
    atlasCv.height = (CH + LH) * GY;
    const actx = atlasCv.getContext("2d");
    const loadedImages: (HTMLImageElement | null)[] = new Array(N).fill(null);

    let W = 0;
    let H = 0;
    let DPR = 1;
    let cardW = 580;
    let cardH = Math.round((580 * 9) / 16);
    let GAP = 32;
    let LABH = 38;
    let A0 = 0;
    let C0 = 0;
    let LO = 0;
    let HI = 0;
    let FADE: [number, number, number, number] = [-10, 0, 1e6, 1e6 + 1];

    const BEND = { e0: 0.44, mag: 0.44, lift: 0.36, vmag: 0.3 };
    const stride = () => cardW + GAP;

    const geom = () => {
      W = stage.clientWidth;
      H = stage.clientHeight;
      if (!W || !H) return;
      DPR = Math.min(2, window.devicePixelRatio || 1);

      if (W < 640) {
        cardW = Math.min(350, Math.max(260, W * 0.84));
        GAP = 20;
        LABH = 30;
      } else if (W < 1024) {
        cardW = Math.min(540, Math.max(400, W * 0.58));
        GAP = 28;
        LABH = 34;
      } else {
        cardW = Math.min(680, Math.max(520, W * 0.48));
        GAP = 36;
        LABH = 38;
      }

      cardH = Math.round((cardW * 9) / 16);
      A0 = W * 0.5;
      C0 = H * 0.53;
      LO = 0;
      HI = W;
      FADE = [-10, 0, H, H + 10];
    };

    const gl =
      canvas.getContext("webgl", {
        antialias: true,
        alpha: false,
        depth: false,
        powerPreference: "high-performance",
      }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return;

    const compileShader = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERT_SRC);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      gl.deleteProgram(prog);
      return;
    }
    gl.useProgram(prog);

    const U = {} as Record<UniformKey, WebGLUniformLocation | null>;
    UNIFORM_NAMES.forEach((name) => {
      U[name] = gl.getUniformLocation(prog, name);
    });

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let disposed = false;
    let uploadQueued = false;

    const uploadAtlas = () => {
      if (disposed || !tex) return;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        atlasCv
      );
    };

    const queueUploadAtlas = () => {
      if (uploadQueued || disposed) return;
      uploadQueued = true;
      requestAnimationFrame(() => {
        uploadQueued = false;
        uploadAtlas();
      });
    };

    const drawAtlasTile = (i: number, img: HTMLImageElement | null) => {
      const w = projects[i];
      if (!w || !actx) return;
      const col = i % GX;
      const row = Math.floor(i / GX);
      const tx = col * CW;
      const ty = row * (CH + LH);

      // 1. Top label strip above the 16:9 frame
      actx.clearRect(tx, ty, CW, LH);
      actx.textBaseline = "alphabetic";
      actx.font = "800 22px 'Mona Sans', 'Manrope', sans-serif";
      actx.textAlign = "left";
      actx.fillStyle = "#f4f4ed";
      const leftLabel = `(${w.num}) ${w.title.toUpperCase()}`;
      actx.fillText(leftLabel, tx + 10, ty + 46, CW - 280);

      actx.textAlign = "right";
      actx.fillStyle = "#38bdf8";
      actx.font = "700 18px 'Mona Sans', 'Manrope', sans-serif";
      const rightLabel = w.tags.slice(0, 2).join(" · ").toUpperCase();
      actx.fillText(rightLabel, tx + CW - 10, ty + 46, 250);

      // 2. Clipped 16:9 Card Body (960 x 540)
      const by = ty + LH;
      actx.save();
      actx.beginPath();
      actx.rect(tx, by, CW, CH);
      actx.clip();

      if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
        const scale = Math.max(CW / img.naturalWidth, CH / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        const dx = tx + (CW - dw) * 0.5;
        const dy = by + (CH - dh) * 0.5;
        actx.drawImage(img, dx, dy, dw, dh);
      } else {
        const pal = CARD_PALETTES[i % CARD_PALETTES.length];
        const bgGrad = actx.createLinearGradient(tx, by, tx + CW, by + CH);
        bgGrad.addColorStop(0, pal.stops[0]);
        bgGrad.addColorStop(0.55, pal.stops[1]);
        bgGrad.addColorStop(1, pal.stops[2]);
        actx.fillStyle = bgGrad;
        actx.fillRect(tx, by, CW, CH);

        const orb = actx.createRadialGradient(
          tx + CW * 0.8,
          by + CH * 0.25,
          0,
          tx + CW * 0.8,
          by + CH * 0.25,
          CW * 0.55
        );
        orb.addColorStop(0, pal.orb);
        orb.addColorStop(1, "transparent");
        actx.fillStyle = orb;
        actx.fillRect(tx, by, CW, CH);
      }

      // Subtle top vignette + rich bottom readability scrim
      const topScrim = actx.createLinearGradient(0, by, 0, by + CH * 0.26);
      topScrim.addColorStop(0, "rgba(9, 13, 24, 0.58)");
      topScrim.addColorStop(1, "rgba(9, 13, 24, 0.0)");
      actx.fillStyle = topScrim;
      actx.fillRect(tx, by, CW, CH * 0.26);

      const botScrim = actx.createLinearGradient(
        0,
        by + CH * 0.36,
        0,
        by + CH
      );
      botScrim.addColorStop(0, "rgba(9, 13, 24, 0.0)");
      botScrim.addColorStop(0.52, "rgba(9, 13, 24, 0.78)");
      botScrim.addColorStop(1, "rgba(9, 13, 24, 0.96)");
      actx.fillStyle = botScrim;
      actx.fillRect(tx, by + CH * 0.36, CW, CH * 0.64);

      // Top-right editorial index number
      actx.textBaseline = "alphabetic";
      actx.font = "900 54px 'Mona Sans', 'Manrope', sans-serif";
      actx.fillStyle = "rgba(244, 244, 237, 0.88)";
      actx.textAlign = "right";
      actx.fillText(w.num, tx + CW - 36, by + 74);

      // Bottom title & stack metadata
      actx.textAlign = "left";
      actx.fillStyle = "#f4f4ed";
      actx.font = "900 36px 'Mona Sans', 'Manrope', sans-serif";
      const titleLines = wrapLines(actx, w.title.toUpperCase(), CW - 80, 2);
      const lineH = 42;
      const baseTitleY = by + CH - 72 - (titleLines.length - 1) * lineH;
      titleLines.forEach((ln, li) => {
        actx.fillText(ln, tx + 38, baseTitleY + li * lineH);
      });

      actx.fillStyle = "#38bdf8";
      actx.font = "700 20px 'Mona Sans', 'Manrope', sans-serif";
      actx.fillText(w.tags.join(" · ").toUpperCase(), tx + 38, by + CH - 32);

      // Subtle crisp outer frame inside 16:9 card
      actx.strokeStyle = "rgba(244, 244, 237, 0.22)";
      actx.lineWidth = 3;
      actx.strokeRect(tx + 1.5, by + 1.5, CW - 3, CH - 3);

      actx.restore();
    };

    const generateAtlas = () => {
      for (let i = 0; i < N; i++) {
        drawAtlasTile(i, loadedImages[i]);
      }
      uploadAtlas();
    };

    const loadPhotos = () => {
      projects.forEach((item, i) => {
        if (!item.previewImage) return;
        const img = new window.Image();
        img.onload = () => {
          if (disposed) return;
          loadedImages[i] = img;
          drawAtlasTile(i, img);
          queueUploadAtlas();
        };
        img.src = item.previewImage;
      });
    };

    const resize = () => {
      geom();
      if (!W || !H) return;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
    };

    // Kinetic Ribbon Physics State (matching 05_prestasi.html)
    const BASE = 42;
    let pos = 0;
    let target = 0;
    let boost = 0;
    let dragVel = 0;
    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let lastMoveT = 0;
    let prevPos = 0;
    let speedE = 0;
    let shrinkE = 0;
    let activeIdxLocal = 0;
    let hoverSlot = -10000;
    let hoverT = 0;

    controlsRef.current = {
      step: (dir: number) => {
        boost = 0;
        dragVel = 0;
        const st = stride();
        const snapped = Math.round(target / st) * st;
        target = snapped + dir * st;
      },
      jumpToRatio: (pct: number) => {
        const total = stride() * N;
        const cur = ((target % total) + total) % total;
        boost = 0;
        dragVel = 0;
        target += pct * total - cur;
      },
      jumpToIndex: (idx: number) => {
        const st = stride();
        const currentStep = Math.round(target / st);
        const currentWrapped = ((currentStep % N) + N) % N;
        let diff = idx - currentWrapped;
        if (diff > N / 2) diff -= N;
        if (diff < -N / 2) diff += N;
        boost = 0;
        dragVel = 0;
        target = (currentStep + diff) * st;
      },
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (scrubRailRef.current?.contains(e.target as Node)) return;
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      lastMoveT = performance.now();
      dragVel = 0;
      boost = 0;
      try {
        stage.setPointerCapture(e.pointerId);
      } catch {
        // Ignore capture failure on touch
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const st = stride();

      if (
        !dragging &&
        px >= 0 &&
        px <= rect.width &&
        py >= 0 &&
        py <= rect.height &&
        st > 0
      ) {
        hoverSlot = Math.floor((px - A0 + pos) / st + 0.5);
      } else if (!dragging) {
        hoverSlot = -10000;
      }

      if (!dragging) return;
      const now = performance.now();
      const dtm = Math.max(8, now - lastMoveT);
      lastMoveT = now;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      moved += Math.abs(dx);
      target -= dx * 1.15;
      dragVel = dragVel * 0.6 + ((-dx * 1.15) / dtm) * 1000 * 0.4;
    };

    const onPointerLeaveStage = () => {
      if (!dragging) hoverSlot = -10000;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      boost =
        performance.now() - lastMoveT < 90
          ? Math.max(-5200, Math.min(5200, dragVel))
          : 0;

      if (moved < 6 && e.type === "pointerup") {
        const rect = stage.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const st = stride();
        if (clickX >= 0 && clickX <= rect.width && st > 0) {
          const clickedSlot = Math.round((clickX - A0 + pos) / st);
          const clickedIdx = ((clickedSlot % N) + N) % N;
          if (clickedIdx === activeIdxLocal) {
            const url = projects[clickedIdx]?.liveUrl;
            if (url && url !== "#") {
              window.open(url, "_blank", "noopener,noreferrer");
            }
          } else {
            controlsRef.current.jumpToIndex(clickedIdx);
          }
        }
      }
    };

    // Only intercept intentional horizontal trackpad/wheel gestures so vertical Lenis scroll never gets trapped
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
        e.preventDefault();
        boost = Math.max(-6000, Math.min(6000, boost + e.deltaX * 6));
      }
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointerleave", onPointerLeaveStage);
    stage.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    const ro = new ResizeObserver(() => resize());
    ro.observe(stage);

    // Zero-zombie rAF lifecycle bound to IntersectionObserver + tab visibility
    let isVisible = false;
    let isRunning = false;
    let rafId = 0;
    let prevT = performance.now();

    const loop = (t: number) => {
      if (!isVisible || document.hidden || disposed) {
        isRunning = false;
        return;
      }
      rafId = requestAnimationFrame(loop);

      const dt = Math.min(0.05, Math.max(0.001, (t - prevT) / 1000));
      prevT = t;
      const time = t / 1000;
      const f60 = dt * 60;

      if (!dragging) {
        boost *= Math.pow(0.5, dt / 0.5);
        if (Math.abs(boost) < 1) boost = 0;
        target += ((autoDriftRef.current ? BASE : 0) + boost) * dt;
      }
      pos += (target - pos) * (1 - Math.pow(dragging ? 0.55 : 0.35, f60));

      const velSigned = (pos - prevPos) / dt;
      const sp = Math.min(1, Math.abs(velSigned) / 2600);
      prevPos = pos;
      shrinkE += (sp - shrinkE) * (sp > shrinkE ? 0.25 : 0.06) * f60;
      speedE += (sp - speedE) * 0.12 * f60;

      const targetHoverT = hoverSlot > -5000 && !dragging ? 1 : 0;
      hoverT += (targetHoverT - hoverT) * Math.min(1, 0.16 * f60);

      const st = stride();
      const curSlot = Math.round(pos / st);
      const idx = ((curSlot % N) + N) % N;
      if (idx !== activeIdxLocal) {
        activeIdxLocal = idx;
        setActiveIndex(idx);
      }

      const total = st * N;
      const prog = (((pos % total) + total) % total) / total;
      if (scrubThumbRef.current) {
        scrubThumbRef.current.style.transform = `translateX(${(prog * 200).toFixed(2)}%)`;
      }

      if (W > 0 && H > 0) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(U.uRes, W, H);
        gl.uniform1f(U.uDpr, DPR);
        gl.uniform1i(U.uAtlas, 0);
        gl.uniform2f(U.uGrid, GX, GY);
        gl.uniform1f(U.uN, N);
        gl.uniform1f(U.uOffset, pos);
        gl.uniform1f(U.uCardW, cardW);
        gl.uniform1f(U.uCardH, cardH);
        gl.uniform1f(U.uLabH, LABH);
        gl.uniform1f(U.uTexH, CH);
        gl.uniform1f(U.uTexLH, LH);
        gl.uniform1f(U.uRad, 18);
        gl.uniform1f(U.uA0, A0);
        gl.uniform1f(U.uC0, C0);
        gl.uniform1f(U.uLo, LO);
        gl.uniform1f(U.uHi, HI);
        gl.uniform1f(U.uStride, st);
        gl.uniform4f(U.uFade, FADE[0], FADE[1], FADE[2], FADE[3]);
        gl.uniform1f(U.uShrink, shrinkE);
        gl.uniform1f(U.uTime, time);
        gl.uniform1f(U.uWob, 1.4 + 6.5 * speedE);
        gl.uniform1f(U.uE0, BEND.e0);
        gl.uniform1f(U.uMag, BEND.mag);
        gl.uniform1f(U.uLift, BEND.lift * cardH);
        gl.uniform1f(U.uVMag, BEND.vmag);
        gl.uniform1f(U.uHover, hoverSlot);
        gl.uniform1f(U.uHoverT, hoverT);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
    };

    const startLoop = () => {
      if (!isRunning && isVisible && !document.hidden && !disposed) {
        isRunning = true;
        prevT = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(rafId);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const vis = entry.isIntersecting;
        if (vis && !isVisible) {
          isVisible = true;
          startLoop();
        } else if (!vis && isVisible) {
          isVisible = false;
          stopLoop();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );
    io.observe(stage);

    const onVisibilityChange = () => {
      if (!document.hidden && isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    resize();
    generateAtlas();
    loadPhotos();
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!disposed) generateAtlas();
      });
    }

    return () => {
      disposed = true;
      stopLoop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointerleave", onPointerLeaveStage);
      stage.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, [projects]);

  const activeProject = projects[activeIndex] ?? projects[0];
  const totalStr = String(projects.length).padStart(2, "0");

  return (
    <div className="space-y-5">
      {/* Header Controls Row */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#f4f4ed]">
            Front-End Web{" "}
            <span className="font-brier italic font-normal text-[#0055FF] lowercase ml-1">
              ({totalStr})
            </span>
          </h3>
          <p className="font-sans text-sm text-[#f4f4ed] mt-1">
            Interactive 16:9 curved WebGL showcase. Drag horizontally or click any build to inspect.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => controlsRef.current.step(-1)}
            aria-label="Previous web project"
            className="w-10 h-10 bg-white/5 border border-white/20 hover:border-[#0055FF] hover:bg-[#0055FF] text-[#f4f4ed] font-display text-base font-bold flex items-center justify-center transition-colors cursor-pointer"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => controlsRef.current.step(1)}
            aria-label="Next web project"
            className="w-10 h-10 bg-white/5 border border-white/20 hover:border-[#0055FF] hover:bg-[#0055FF] text-[#f4f4ed] font-display text-base font-bold flex items-center justify-center transition-colors cursor-pointer"
          >
            ›
          </button>
          <button
            type="button"
            onClick={handleToggleDrift}
            aria-label={autoDrift ? "Pause auto drift" : "Resume auto drift"}
            title={autoDrift ? "Pause auto drift" : "Resume auto drift"}
            className="px-4 h-10 bg-white/5 border border-white/20 hover:border-[#f4f4ed] text-[#f4f4ed] font-display text-xs font-extrabold uppercase tracking-wider flex items-center justify-center transition-colors cursor-pointer"
          >
            {autoDrift ? "Pause" : "Play"}
          </button>
        </div>
      </div>

      {/* 3D Curved 16:9 WebGL Ribbon Stage */}
      <div
        ref={stageRef}
        role="region"
        aria-label="Front-End Web 16:9 Interactive 3D Ribbon"
        className="relative w-full h-[360px] sm:h-[490px] lg:h-[570px] rounded-[20px] overflow-hidden bg-[#0d1017] border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing select-none touch-pan-y"
      >
        {/* Bottom HUD: Slot Counter + Scrub Rail + Active Title */}
        <div className="absolute bottom-5 inset-x-5 sm:inset-x-7 flex items-center justify-between gap-4 pointer-events-none z-10">
          <div className="px-3 py-1.5 bg-[#0d1017]/90 border border-white/20 font-display text-xs font-extrabold tracking-[0.14em] text-[#f4f4ed] tabular-nums shrink-0">
            {activeProject.num} / {totalStr}
          </div>

          <div
            ref={scrubRailRef}
            onClick={(e) => {
              e.stopPropagation();
              const r = e.currentTarget.getBoundingClientRect();
              const pct = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
              controlsRef.current.jumpToRatio(pct);
            }}
            title="Click to jump to project"
            className="pointer-events-auto cursor-pointer w-32 sm:w-48 h-1.5 hover:h-2 bg-white/15 overflow-hidden relative transition-all shrink-0"
          >
            <div
              ref={scrubThumbRef}
              className="absolute left-0 top-0 h-full w-1/3 bg-[#0055FF]"
              style={{ transform: "translateX(0%)" }}
            />
          </div>

          <div className="hidden sm:block px-3.5 py-1.5 bg-[#0d1017]/90 border border-white/20 font-display text-xs font-extrabold uppercase tracking-wider text-[#f4f4ed] truncate max-w-[320px]">
            ({activeProject.num}) {activeProject.title}
          </div>
        </div>
      </div>

      {/* Synced Active Project Detail Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 sm:p-7 rounded-[18px] bg-[#131722]/90 border border-white/15">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-brier italic text-lg text-[#0055FF]">
              {activeProject.num}
            </span>
            <h4 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-[#f4f4ed]">
              {activeProject.title}
            </h4>
          </div>
          <p className="font-sans text-sm text-[#f4f4ed] leading-relaxed">
            {activeProject.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {activeProject.tags.map((tag) => (
              <span
                key={tag}
                className="font-display text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#38bdf8]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => controlsRef.current.jumpToIndex(idx)}
              className={`w-10 h-10 font-display text-xs font-extrabold transition-colors cursor-pointer border ${
                idx === activeIndex
                  ? "bg-[#f4f4ed] text-[#111112] border-[#f4f4ed]"
                  : "bg-white/5 text-[#f4f4ed] border-white/20 hover:border-[#0055FF]"
              }`}
            >
              {p.num}
            </button>
          ))}

          <a
            href={activeProject.liveUrl}
            target={activeProject.liveUrl !== "#" ? "_blank" : undefined}
            rel={activeProject.liveUrl !== "#" ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 px-5 h-10 bg-[#0055FF] hover:bg-[#f4f4ed] !text-white hover:!text-[#111112] font-display text-xs font-black uppercase tracking-wider transition-colors"
          >
            <span>Visit Web</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
