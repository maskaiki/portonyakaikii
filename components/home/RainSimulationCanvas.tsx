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

export function RainSimulationCanvas({
  intensity,
  speed,
  size,
  isPaused,
  onWetnessChange,
  className = "",
}: RainSimulationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wetnessRef = useRef<number>(6);
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

    // Well-balanced object pools for elegant, non-crowded rain
    const MAX_DROPS = 320;
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
        angleSin: -0.42,
        angleCos: 0.91,
        active: false,
      });
    }

    const MAX_SPLASHES = 300;
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
        color: "rgba(0, 210, 255, 0.8)",
        active: false,
      });
    }

    const MAX_BEADS = 150;
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

    // Burst generator on body hit
    const spawnBodyHit = (
      x: number,
      y: number,
      normX: number,
      normY: number,
      dropWidth: number,
      dropSpeedScale: number
    ) => {
      // 1. Spatter droplets (4 to 8 particles bouncing off normal)
      const splashCount = 4 + Math.floor(Math.random() * 5);
      for (let i = 0; i < splashCount; i++) {
        const s = splashes[splashCursor % MAX_SPLASHES];
        splashCursor++;
        // Tangent perpendicular to normal
        const tanX = -normY;
        const tanY = normX;
        const spread = (Math.random() - 0.5) * 3.8;
        const bounce = (Math.random() * 2.8 + 1.2) * dropSpeedScale;

        s.x = x + normX * 2;
        s.y = y + normY * 2;
        s.vx = normX * bounce + tanX * spread - 0.8; // slight wind push
        s.vy = normY * bounce + tanY * spread - 1.2; // upward bounce against gravity
        s.life = 0;
        s.maxLife = Math.random() * 22 + 14;
        s.size = (Math.random() * 1.8 + 1.2) * (dropWidth / 2);
        s.opacity = 0.7 + Math.random() * 0.3;
        s.color =
          Math.random() < 0.65
            ? "rgba(0, 210, 255, 0.85)" // electric cyan droplet
            : "rgba(220, 240, 255, 0.95)"; // bright water gleam
        s.active = true;
      }

      // 2. Surface Bead (clinging droplet that slides down)
      if (Math.random() < 0.7) {
        const b = beads[beadCursor % MAX_BEADS];
        beadCursor++;
        b.x = x + (Math.random() - 0.5) * 8;
        b.y = y + (Math.random() - 0.5) * 4;
        b.slideSpeed = Math.random() * 18 + 8; // slides down
        b.life = 0;
        b.maxLife = Math.random() * 45 + 30; // lasts 0.8 - 1.5s
        b.radius = Math.random() * 2.2 + 1.4;
        b.opacity = 0.8;
        b.active = true;
      }

      // 3. Impact Ripple Ring
      const r = rings[ringCursor % MAX_RINGS];
      ringCursor++;
      r.x = x;
      r.y = y;
      r.radius = 2;
      r.maxRadius = Math.random() * 12 + 8;
      r.opacity = 0.65;
      r.active = true;
    };

    let lastTime = performance.now();
    let spawnAccumulator = 0;
    let wetnessTimer = 0;

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (isPaused) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      const normalizedIntensity = intensity / 100;
      const normalizedSpeed = speed / 100;
      const normalizedSize = size / 100;

      // Significantly larger and more impactful rain drops
      const targetActiveDrops = Math.floor(normalizedIntensity * MAX_DROPS);
      const baseVelocity = 650 + normalizedSpeed * 1050; // faster, punchy rain
      const baseLength = 26 + normalizedSize * 50 + normalizedSpeed * 22; // noticeably longer, visible streaks
      const baseThickness = 1.6 + normalizedSize * 2.8; // thick, chunky droplets (up to 4.4px)

      // Silhouette geometry of Kaiki's enlarged portrait
      const centerX = width * 0.5;
      const portraitTopY = height * 0.07; // head top
      const headHeight = height * 0.17;
      const headRadius = width * 0.082; // rounded head
      const neckRadius = width * 0.06;
      const shoulderTopY = portraitTopY + headHeight + height * 0.04;
      const shoulderBottomY = shoulderTopY + height * 0.16;
      const shoulderMaxRadius = width * 0.245; // wide shoulders
      const torsoRadius = width * 0.25;

      // Spawn new rain drops with gentle, well-spaced flow
      spawnAccumulator += targetActiveDrops * dt * 2.0;
      while (spawnAccumulator > 1) {
        spawnAccumulator -= 1;
        const freeDrop = drops.find((d) => !d.active);
        if (freeDrop) {
          // Layer depth: 0: Far background, 1: Midground (body hit), 2: Foreground
          const randLayer = Math.random();
          freeDrop.layer = randLayer < 0.25 ? 0 : randLayer < 0.82 ? 1 : 2;

          // Scale properties based on layer
          const layerScale = freeDrop.layer === 0 ? 0.65 : freeDrop.layer === 1 ? 1.0 : 1.45;
          const individualVariation = 0.75 + Math.random() * 0.5;

          // Organic wind gusts: base angle ~ -24 degrees + slight variation
          const windAngle = -0.42 + (Math.random() - 0.5) * 0.09;
          freeDrop.angleSin = windAngle;
          freeDrop.angleCos = Math.sqrt(1 - windAngle * windAngle);

          // Spawn anywhere across the top and upper right (since rain falls down-left)
          freeDrop.x = Math.random() * (width + 500) - 100;
          freeDrop.y = -baseLength * layerScale - Math.random() * 80;

          freeDrop.speed = baseVelocity * layerScale * individualVariation;
          freeDrop.len = baseLength * layerScale * individualVariation;
          freeDrop.width = baseThickness * layerScale * individualVariation;
          freeDrop.opacity =
            freeDrop.layer === 0
              ? 0.25 + Math.random() * 0.2
              : freeDrop.layer === 1
              ? 0.45 + Math.random() * 0.35
              : 0.65 + Math.random() * 0.35; // foreground drops are bold and vibrant

          freeDrop.active = true;
        }
      }

      let impactsThisFrame = 0;

      // ── Update & Render Drops ──────────────────────────────────────
      ctx.lineCap = "round";
      for (const d of drops) {
        if (!d.active) continue;

        const prevX = d.x;
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
          // 3. Upper Torso & Chest / Shirt (Greatly reduced to keep shirt clean and uncluttered)
          else if (d.y > shoulderBottomY && d.y <= height) {
            if (dxFromCenter <= torsoRadius) {
              // Only 4% chance of subtle impact on shirt so it doesn't look too crowded
              if (Math.random() < 0.04) {
                isHit = true;
                normX = (d.x - centerX) > 0 ? 0.3 : -0.3;
                normY = -0.95;
              }
            }
          }

          if (isHit) {
            d.active = false;
            impactsThisFrame++;
            // If on shirt/torso, spawn only 1-2 tiny delicate droplets
            const isTorsoHit = d.y > shoulderBottomY;
            if (isTorsoHit) {
              // Gentle, minimal splash on shirt
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
              s.color = "rgba(0, 210, 255, 0.65)";
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
          if (d.y >= height && Math.random() < 0.28) {
            // ground splash
            spawnBodyHit(d.x, height - 2, 0, -1, d.width * 0.8, 0.7);
          }
          continue;
        }

        // Draw Rain Streak
        const headX = d.x;
        const headY = d.y;
        const tailX = d.x - d.angleSin * d.len;
        const tailY = d.y - d.angleCos * d.len;

        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        // Translucent tail fading to vibrant cyan / dark droplet head
        grad.addColorStop(0, "rgba(0, 210, 255, 0)");
        grad.addColorStop(0.5, `rgba(56, 189, 248, ${d.opacity * 0.45})`);
        grad.addColorStop(0.9, `rgba(0, 210, 255, ${d.opacity * 0.95})`);
        grad.addColorStop(1, `rgba(17, 17, 18, ${d.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = d.width;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();

        // Droplet Head Bead (glistening spherical water point at leading edge)
        if (d.width > 2.0) {
          ctx.fillStyle = `rgba(0, 210, 255, ${d.opacity * 0.8})`;
          ctx.beginPath();
          ctx.arc(headX, headY, d.width * 0.7, 0, Math.PI * 2);
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
        s.vy += 0.32; // gravity arc

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
        b.x += (Math.random() - 0.5) * 0.2; // slight micro-wobble

        const progress = b.life / b.maxLife;
        const alpha = Math.max(0, (1 - progress) * b.opacity);

        // Water droplet body with soft specular gleam
        ctx.fillStyle = `rgba(0, 210, 255, ${alpha * 0.55})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();

        // White specular reflection dot
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
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

      // ── Telemetry Wetness Calculation (Storm Lab shedding model) ──
      wetnessTimer += dt;
      if (wetnessTimer >= 0.08) {
        wetnessTimer = 0;
        let w = wetnessRef.current;
        if (impactsThisFrame > 0) {
          w += impactsThisFrame * (0.6 + normalizedSize * 0.8);
        }
        // Exponential shedding decay
        w *= Math.exp(-dt * 0.95);
        // Base minimum wetness proportional to rain intensity
        const baseMin = Math.round(normalizedIntensity * 14);
        w = Math.max(baseMin, Math.min(99, w));
        wetnessRef.current = w;
        if (onWetnessRef.current) {
          onWetnessRef.current(Math.round(w));
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
