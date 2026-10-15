"use client";

import { useEffect, useRef } from "react";

interface RainSimulationCanvasProps {
  intensity: number; // 0 - 100
  speed: number;     // 0 - 100
  size: number;      // 0 - 100
  isPaused: boolean;
  onWetnessChange?: (wetness: number) => void;
  className?: string;
}

interface Drop {
  x: number;
  y: number;
  speed: number;
  len: number;
  width: number;
  opacity: number;
  layer: number; // 0: background, 1: midground (collides), 2: foreground
  angleSin: number;
  angleCos: number;
  active: boolean;
}

interface Splash {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
  color: string;
  active: boolean;
}

interface Bead {
  x: number;
  y: number;
  slideSpeed: number;
  life: number;
  maxLife: number;
  radius: number;
  opacity: number;
  active: boolean;
}

interface ImpactRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  active: boolean;
}

// Storm Lab Wetness Shedding Model (ported 1:1 from class h0 in NFengine.tsx)
class StormWetnessModel {
  value = 0;
  pendingWater = 0;
  exposure = 0;
  responseAge = 0;
  shedding = 0;

  setExposure(e: number) {
    if (e > this.exposure + 1e-4) {
      this.responseAge = 0;
      this.shedding *= 0.35;
    }
    this.exposure = e;
  }

  impact(e: number) {
    this.pendingWater += e;
  }

  update(dt: number) {
    this.responseAge += dt;
    const t = this.responseAge > 1.6 || this.exposure === 0 ? 1 : 0;
    this.shedding += (t - this.shedding) * (1 - Math.exp(-dt * 1.7));
    this.value += this.pendingWater * (1 - this.shedding * 0.82);
    this.pendingWater = 0;
    this.value *= Math.exp(-dt * (0.22 + this.shedding * 0.95));
    this.value = Math.min(95, this.value);
    if (this.exposure === 0 && this.value < 0.025) this.value = 0;
    return this.value;
  }
}

export function RainSimulationCanvas({
  intensity,
  speed,
  size,
  isPaused,
  onWetnessChange,
  className = "",
}: RainSimulationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wetnessModelRef = useRef<StormWetnessModel>(new StormWetnessModel());
  const onWetnessRef = useRef(onWetnessChange);
  onWetnessRef.current = onWetnessChange;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Trajectory vector matching NFengine: _s = (-0.55, -1, -0.3).normalize()
    // In 2D: normalized angle with dx = -0.481, dy = 0.877 (~28.8° slant downwards to the left)
    const BASE_ANGLE_SIN = -0.481;
    const BASE_ANGLE_COS = Math.sqrt(1 - BASE_ANGLE_SIN * BASE_ANGLE_SIN);

    // Optimized pool sizes for smooth 60fps execution
    const MAX_DROPS = 340;
    const drops: Drop[] = [];
    for (let i = 0; i < MAX_DROPS; i++) {
      drops.push({
        x: 0,
        y: 0,
        speed: 1,
        len: 1,
        width: 1,
        opacity: 0.4,
        layer: 1,
        angleSin: BASE_ANGLE_SIN,
        angleCos: BASE_ANGLE_COS,
        active: false,
      });
    }

    const MAX_SPLASHES = 320;
    const splashes: Splash[] = [];
    for (let i = 0; i < MAX_SPLASHES; i++) {
      splashes.push({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        life: 0,
        maxLife: 1,
        size: 1,
        opacity: 1,
        color: "rgba(0, 210, 255, 0.85)",
        active: false,
      });
    }

    const MAX_BEADS = 160;
    const beads: Bead[] = [];
    for (let i = 0; i < MAX_BEADS; i++) {
      beads.push({
        x: 0,
        y: 0,
        slideSpeed: 0,
        life: 0,
        maxLife: 1,
        radius: 1,
        opacity: 1,
        active: false,
      });
    }

    const MAX_RINGS = 80;
    const rings: ImpactRing[] = [];
    for (let i = 0; i < MAX_RINGS; i++) {
      rings.push({
        x: 0,
        y: 0,
        radius: 0,
        maxRadius: 10,
        opacity: 1,
        active: false,
      });
    }

    let splashCursor = 0;
    let beadCursor = 0;
    let ringCursor = 0;

    const wetnessModel = wetnessModelRef.current;
    // Set exposure based on NFengine formula: t/100 * (.3 + n/100 * .7) * (.5 + i/100)
    const exposure = (intensity / 100) * (0.3 + (speed / 100) * 0.7) * (0.5 + size / 100);
    wetnessModel.setExposure(exposure);

    // Burst generator on body hit (reflecting Storm Lab's burst() method)
    const spawnBodyHit = (
      x: number,
      y: number,
      normX: number,
      normY: number,
      dropWidth: number,
      dropSpeedScale: number
    ) => {
      // Impact wetness model
      wetnessModel.impact(0.025 + (size / 100) * 0.075 * 1.5);

      // 1. Spatter droplets (4 to 8 particles bouncing off normal)
      const splashCount = 4 + Math.round(size / 25);
      for (let i = 0; i < splashCount; i++) {
        const s = splashes[splashCursor % MAX_SPLASHES];
        splashCursor++;

        // Tangent perpendicular to normal
        const tanX = -normY;
        const tanY = normX;
        const spread = (Math.random() - 0.5) * 4.2;
        const bounce = (Math.random() * 2.6 + 1.2) * dropSpeedScale;

        // Bounces off surface normal + wind push
        s.x = x + normX * 2;
        s.y = y + normY * 2;
        s.vx = normX * bounce + tanX * spread - 0.6;
        s.vy = normY * bounce + tanY * spread - 1.4; // upward arc against gravity
        s.life = 0;
        s.maxLife = Math.random() * 24 + 14;
        s.size = (Math.random() * 1.8 + 1.2) * (dropWidth / 2);
        s.opacity = 0.75 + Math.random() * 0.25;
        s.color =
          Math.random() < 0.6
            ? "rgba(0, 210, 255, 0.9)" // electric cyan droplet
            : "rgba(225, 245, 255, 0.95)"; // bright water gleam
        s.active = true;
      }

      // 2. Surface Bead (clinging droplet that slides down subject's body)
      if (Math.random() < 0.75) {
        const b = beads[beadCursor % MAX_BEADS];
        beadCursor++;
        b.x = x + (Math.random() - 0.5) * 6;
        b.y = y + (Math.random() - 0.5) * 4;
        b.slideSpeed = Math.random() * 18 + 8; // slides downwards
        b.life = 0;
        b.maxLife = Math.random() * 45 + 30; // lasts 0.8 - 1.4s
        b.radius = Math.random() * 2.2 + 1.4;
        b.opacity = 0.85;
        b.active = true;
      }

      // 3. Impact Ripple Ring
      const r = rings[ringCursor % MAX_RINGS];
      ringCursor++;
      r.x = x;
      r.y = y;
      r.radius = 2;
      r.maxRadius = Math.random() * 14 + 8;
      r.opacity = 0.7;
      r.active = true;
    };

    let lastTime = performance.now();
    let spawnAccumulator = 0;
    let uiTimer = 0;

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (isPaused) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      const normalizedIntensity = intensity / 100;
      const normalizedSpeed = speed / 100;
      const normalizedSize = size / 100;

      // Dynamics formulas aligned with NFengine.tsx
      const targetActiveDrops = Math.floor(normalizedIntensity * MAX_DROPS);
      const baseVelocity = 680 + normalizedSpeed * 1150; // punchy, crisp speed
      const baseLength = 28 + normalizedSize * 48 + normalizedSpeed * 22; // visible aerodynamic streaks
      const baseThickness = 1.8 + normalizedSize * 3.0; // rich, impactful droplet thickness

      // Silhouette geometry of Kaiki's portrait for collision
      const centerX = width * 0.5;
      const portraitTopY = height * 0.07; // head top
      const headHeight = height * 0.17;
      const headRadius = width * 0.082; // rounded head dome
      const neckRadius = width * 0.06;
      const shoulderTopY = portraitTopY + headHeight + height * 0.04;
      const shoulderBottomY = shoulderTopY + height * 0.16;
      const shoulderMaxRadius = width * 0.245; // wide shoulders
      const torsoRadius = width * 0.25;

      // Spawn rain drops continuously
      spawnAccumulator += targetActiveDrops * dt * 2.0;
      while (spawnAccumulator > 1) {
        spawnAccumulator -= 1;
        const freeDrop = drops.find((d) => !d.active);
        if (freeDrop) {
          // Layer depth: 0: Far background, 1: Midground (body hit), 2: Foreground
          const randLayer = Math.random();
          freeDrop.layer = randLayer < 0.25 ? 0 : randLayer < 0.82 ? 1 : 2;

          const layerScale = freeDrop.layer === 0 ? 0.65 : freeDrop.layer === 1 ? 1.0 : 1.45;
          const individualVariation = 0.75 + Math.random() * 0.5;

          // Storm Lab wind angle: ~ -28.8° + slight individual variation
          const windAngle = BASE_ANGLE_SIN + (Math.random() - 0.5) * 0.07;
          freeDrop.angleSin = windAngle;
          freeDrop.angleCos = Math.sqrt(1 - windAngle * windAngle);

          // Spawn across top and right field
          freeDrop.x = Math.random() * (width + 550) - 100;
          freeDrop.y = -baseLength * layerScale - Math.random() * 80;

          freeDrop.speed = baseVelocity * layerScale * individualVariation;
          freeDrop.len = baseLength * layerScale * individualVariation;
          freeDrop.width = baseThickness * layerScale * individualVariation;
          freeDrop.opacity =
            freeDrop.layer === 0
              ? 0.25 + Math.random() * 0.2
              : freeDrop.layer === 1
              ? 0.5 + Math.random() * 0.35
              : 0.7 + Math.random() * 0.3;

          freeDrop.active = true;
        }
      }

      // ── Update & Render Drops ──────────────────────────────────────
      ctx.lineCap = "round";
      for (const d of drops) {
        if (!d.active) continue;

        const prevY = d.y;
        const dist = d.speed * dt;
        d.x += d.angleSin * dist;
        d.y += d.angleCos * dist;

        // Collision Check (Midground drops only hit Kaiki's physical body)
        if (d.layer === 1 && d.y >= portraitTopY && d.y <= height) {
          const dxFromCenter = Math.abs(d.x - centerX);
          let isHit = false;
          let normX = 0;
          let normY = -1;

          // 1. Head dome
          if (d.y <= portraitTopY + headHeight) {
            const dyHead = (d.y - (portraitTopY + headHeight * 0.5)) / (headHeight * 0.5);
            const dxHead = dxFromCenter / headRadius;
            if (dxHead * dxHead + dyHead * dyHead <= 1.05 && prevY <= portraitTopY + headHeight) {
              isHit = true;
              normX = (d.x - centerX) / headRadius;
              normY = -0.85;
            }
          }
          // 2. Sloped Shoulders
          else if (d.y > portraitTopY + headHeight && d.y <= shoulderBottomY) {
            const shoulderProgress = (d.y - shoulderTopY) / (shoulderBottomY - shoulderTopY);
            const currentShoulderWidth =
              neckRadius + (shoulderMaxRadius - neckRadius) * Math.min(1, Math.max(0, shoulderProgress));

            if (dxFromCenter <= currentShoulderWidth && prevY <= d.y) {
              isHit = true;
              normX = (d.x - centerX) > 0 ? 0.7 : -0.7;
              normY = -0.7;
            }
          }
          // 3. Upper Torso & Chest / Shirt (gentle impact rate to keep portrait pristine)
          else if (d.y > shoulderBottomY && d.y <= height) {
            if (dxFromCenter <= torsoRadius) {
              if (Math.random() < 0.05) {
                isHit = true;
                normX = (d.x - centerX) > 0 ? 0.3 : -0.3;
                normY = -0.95;
              }
            }
          }

          if (isHit) {
            d.active = false;
            const isTorsoHit = d.y > shoulderBottomY;
            if (isTorsoHit) {
              const s = splashes[splashCursor % MAX_SPLASHES];
              splashCursor++;
              s.x = d.x;
              s.y = d.y;
              s.vx = (Math.random() - 0.5) * 1.5;
              s.vy = -1.2;
              s.life = 0;
              s.maxLife = 14;
              s.size = 1.2;
              s.opacity = 0.55;
              s.color = "rgba(0, 210, 255, 0.7)";
              s.active = true;
            } else {
              spawnBodyHit(d.x, d.y, normX, normY, d.width, d.speed / baseVelocity);
            }
            continue;
          }
        }

        // Out of bounds
        if (d.y > height + d.len || d.x < -150) {
          d.active = false;
          if (d.y >= height && Math.random() < 0.3) {
            spawnBodyHit(d.x, height - 2, 0, -1, d.width * 0.8, 0.7);
          }
          continue;
        }

        // Draw Rain Streak with tapered aerodynamic gradient
        const headX = d.x;
        const headY = d.y;
        const tailX = d.x - d.angleSin * d.len;
        const tailY = d.y - d.angleCos * d.len;

        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        grad.addColorStop(0, "rgba(0, 210, 255, 0)");
        grad.addColorStop(0.5, `rgba(56, 189, 248, ${d.opacity * 0.4})`);
        grad.addColorStop(0.88, `rgba(0, 210, 255, ${d.opacity * 0.9})`);
        grad.addColorStop(1, `rgba(17, 17, 18, ${d.opacity * 0.95})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = d.width;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();

        // Droplet Head Bead (glistening spherical water point at leading edge)
        if (d.width > 2.0) {
          ctx.fillStyle = `rgba(0, 210, 255, ${d.opacity * 0.85})`;
          ctx.beginPath();
          ctx.arc(headX, headY, d.width * 0.7, 0, Math.PI * 2);
          ctx.fill();

          // Shiny water glint dot
          ctx.fillStyle = `rgba(230, 250, 255, ${d.opacity * 0.95})`;
          ctx.beginPath();
          ctx.arc(headX - d.width * 0.2, headY - d.width * 0.2, d.width * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Update & Render Splashes ──────────────────────────────────
      for (const s of splashes) {
        if (!s.active) continue;

        s.life += dt * 60;
        if (s.life >= s.maxLife) {
          s.active = false;
          continue;
        }

        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.36; // gravity arc downward

        const progress = s.life / s.maxLife;
        const alpha = Math.max(0, (1 - progress) * s.opacity);
        const currentSize = s.size * (1 - progress * 0.4);

        ctx.fillStyle = s.color.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Update & Render Surface Water Beads ───────────────────────
      for (const b of beads) {
        if (!b.active) continue;

        b.life += dt * 60;
        if (b.life >= b.maxLife) {
          b.active = false;
          continue;
        }

        // Slides down along gravity
        b.y += b.slideSpeed * dt;
        b.x += (Math.random() - 0.5) * 0.2; // subtle micro-wobble

        const progress = b.life / b.maxLife;
        const alpha = Math.max(0, (1 - progress) * b.opacity);

        // Water droplet body with soft cyan gleam
        ctx.fillStyle = `rgba(0, 210, 255, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();

        // White specular reflection highlight
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Update & Render Impact Rings ──────────────────────────────
      for (const r of rings) {
        if (!r.active) continue;

        r.radius += (r.maxRadius - r.radius) * 0.2;
        r.opacity -= dt * 3.5;

        if (r.opacity <= 0.05 || r.radius >= r.maxRadius - 0.5) {
          r.active = false;
          continue;
        }

        ctx.strokeStyle = `rgba(0, 210, 255, ${r.opacity * 0.7})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ── Telemetry Wetness Calculation using NFengine's h0 model ───
      const currentWetness = wetnessModel.update(dt);
      uiTimer += dt;
      if (uiTimer >= 0.1) {
        uiTimer = 0;
        if (onWetnessRef.current) {
          onWetnessRef.current(Math.round(currentWetness));
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [intensity, speed, size, isPaused]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-30 ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
