"use client";

import React, { useEffect, useRef } from "react";

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface PortalFX {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  kind: "<>" | "[]";
}

interface Dragon {
  id: string;
  headSymbol: "<>" | "[]";
  primaryColor: string;
  secondaryColor: string;
  glowColor: string;
  segments: Vec3[];
  vel: Vec3;
  target: Vec3;
  phase: "flying" | "diving" | "inside_box" | "emerging";
  portalEntry: { x: number; y: number } | null;
  portalExit: { x: number; y: number } | null;
  swallowedCount: number;
  insideTimer: number;
  timeOffset: number;
}

export function CodeDragonsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Helper: Find visible card boxes in viewport for dragons to dive into & emerge out of
    const getVisibleBoxes = (): DOMRect[] => {
      const selectors =
        ".web-scroll-card, .arsenal-3d-card, .journey-row, .rain-panel, .stat-card, .project-card, section h2, footer a";
      const els = Array.from(document.querySelectorAll(selectors));
      const valid: DOMRect[] = [];
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (
          r.width > 120 &&
          r.height > 45 &&
          r.top > 60 &&
          r.bottom < height - 40 &&
          r.left >= 0 &&
          r.right <= width
        ) {
          valid.push(r);
        }
      }
      return valid;
    };

    const NUM_SEGMENTS = 26;
    const SEG_DIST = 16;

    const createDragon = (
      id: string,
      headSymbol: "<>" | "[]",
      primaryColor: string,
      secondaryColor: string,
      glowColor: string,
      startX: number,
      startY: number,
      timeOffset: number
    ): Dragon => {
      const segments: Vec3[] = [];
      for (let i = 0; i < NUM_SEGMENTS; i++) {
        segments.push({ x: startX - i * SEG_DIST, y: startY, z: 0 });
      }
      return {
        id,
        headSymbol,
        primaryColor,
        secondaryColor,
        glowColor,
        segments,
        vel: { x: 4, y: -2, z: 0 },
        target: { x: width * 0.5, y: height * 0.4, z: 60 },
        phase: "flying",
        portalEntry: null,
        portalExit: null,
        swallowedCount: 0,
        insideTimer: 0,
        timeOffset,
      };
    };

    // Twin 3D Dragons: "<>" (Electric Cobalt Blue) & "[]" (Deep Royal Navy Blue)
    const dragons: Dragon[] = [
      createDragon(
        "dragon-angle",
        "<>",
        "#0055FF",
        "#38BDF8",
        "rgba(0, 85, 255, 0.45)",
        width * 0.2,
        height * 0.35,
        0
      ),
      createDragon(
        "dragon-bracket",
        "[]",
        "#1E3A8A",
        "#2563EB",
        "rgba(30, 58, 138, 0.5)",
        width * 0.8,
        height * 0.65,
        100
      ),
    ];

    const portals: PortalFX[] = [];

    const spawnPortal = (x: number, y: number, color: string, kind: "<>" | "[]") => {
      portals.push({
        x,
        y,
        radius: 6,
        maxRadius: 58,
        alpha: 0.95,
        color,
        kind,
      });
    };

    let t = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      t += 0.016;

      ctx.clearRect(0, 0, width, height);

      // 1. Update & Draw Active Box Portals
      for (let i = portals.length - 1; i >= 0; i--) {
        const p = portals[i];
        p.radius += (p.maxRadius - p.radius) * 0.12;
        p.alpha -= 0.022;
        if (p.alpha <= 0.02) {
          portals.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(t * 2.5);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.lineWidth = 2;

        // Geometric Portal Ring matching "<>" or "[]"
        ctx.beginPath();
        if (p.kind === "<>") {
          for (let k = 0; k < 6; k++) {
            const ang = (k * Math.PI) / 3;
            const px = Math.cos(ang) * p.radius;
            const py = Math.sin(ang) * (p.radius * 0.65);
            if (k === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
        } else {
          ctx.strokeRect(-p.radius * 0.8, -p.radius * 0.5, p.radius * 1.6, p.radius);
        }
        ctx.stroke();
        ctx.restore();
      }

      // 2. Update & Draw Each 3D Dragon
      for (const d of dragons) {
        const head = d.segments[0];
        const time = t + d.timeOffset;

        if (d.phase === "flying") {
          const distToTarget = Math.hypot(d.target.x - head.x, d.target.y - head.y);
          if (distToTarget < 90) {
            // Chance to pick a real DOM Box on screen to dive into!
            const boxes = getVisibleBoxes();
            if (boxes.length >= 2 && Math.random() < 0.48) {
              const entryBox = boxes[Math.floor(Math.random() * boxes.length)];
              let exitBox = boxes[Math.floor(Math.random() * boxes.length)];
              if (exitBox === entryBox && boxes.length > 1) {
                exitBox = boxes[(boxes.indexOf(entryBox) + 1) % boxes.length];
              }

              d.portalEntry = {
                x: entryBox.left + entryBox.width * (0.25 + Math.random() * 0.5),
                y: entryBox.top + entryBox.height * 0.5,
              };
              d.portalExit = {
                x: exitBox.left + exitBox.width * (0.25 + Math.random() * 0.5),
                y: exitBox.top + exitBox.height * 0.5,
              };
              d.target = { x: d.portalEntry.x, y: d.portalEntry.y, z: -80 };
              d.phase = "diving";
            } else {
              // Pick next 3D aerial waypoint across the screen
              d.target = {
                x: width * (0.12 + Math.random() * 0.76),
                y: height * (0.14 + Math.random() * 0.72),
                z: (Math.random() - 0.5) * 260,
              };
            }
          }
        } else if (d.phase === "diving" && d.portalEntry) {
          const dist = Math.hypot(d.portalEntry.x - head.x, d.portalEntry.y - head.y);
          if (dist < 28) {
            if (d.swallowedCount === 0) {
              spawnPortal(d.portalEntry.x, d.portalEntry.y, d.primaryColor, d.headSymbol);
            }
            d.swallowedCount += 1.35;
            if (d.swallowedCount >= NUM_SEGMENTS) {
              d.phase = "inside_box";
              d.insideTimer = 28; // stays inside the box briefly before bursting out of exit box
            }
          }
        } else if (d.phase === "inside_box") {
          d.insideTimer -= 1;
          if (d.insideTimer <= 0 && d.portalExit) {
            // Teleport all segments to the exit box portal and burst out in 3D!
            for (const seg of d.segments) {
              seg.x = d.portalExit.x;
              seg.y = d.portalExit.y;
              seg.z = -60;
            }
            spawnPortal(d.portalExit.x, d.portalExit.y, d.secondaryColor, d.headSymbol);
            d.swallowedCount = NUM_SEGMENTS;
            d.phase = "emerging";
            d.target = {
              x: width * (0.15 + Math.random() * 0.7),
              y: height * (0.15 + Math.random() * 0.7),
              z: 140, // Swoops forward toward camera on exit!
            };
          }
          continue;
        } else if (d.phase === "emerging") {
          d.swallowedCount -= 1.25;
          if (d.swallowedCount <= 0) {
            d.swallowedCount = 0;
            d.phase = "flying";
          }
        }

        // Steering physics with 3D sinusoidal serpentine undulation
        const dx = d.target.x - head.x;
        const dy = d.target.y - head.y;
        const dz = d.target.z - head.z;
        const dist = Math.max(1, Math.hypot(dx, dy, dz));

        const speed = d.phase === "diving" ? 7.2 : 5.4;
        const waveX = Math.cos(time * 4.2) * 1.8;
        const waveY = Math.sin(time * 4.2) * 1.8;
        const waveZ = Math.sin(time * 2.6) * 2.2;

        d.vel.x += ((dx / dist) * speed + waveX - d.vel.x) * 0.08;
        d.vel.y += ((dy / dist) * speed + waveY - d.vel.y) * 0.08;
        d.vel.z += ((dz / dist) * speed + waveZ - d.vel.z) * 0.08;

        head.x += d.vel.x;
        head.y += d.vel.y;
        head.z += d.vel.z;

        // 3D Inverse Kinematics (IK) Spine Chain
        for (let i = 1; i < NUM_SEGMENTS; i++) {
          const prev = d.segments[i - 1];
          const curr = d.segments[i];
          const sdx = prev.x - curr.x;
          const sdy = prev.y - curr.y;
          const sdz = prev.z - curr.z;
          const sDist = Math.max(0.001, Math.hypot(sdx, sdy, sdz));

          // Lateral slithering wave along the dragon's spine
          const slither = Math.sin(time * 6 - i * 0.45) * 1.6;
          const perpX = -sdy / sDist;
          const perpY = sdx / sDist;

          curr.x = prev.x - (sdx / sDist) * SEG_DIST + perpX * slither;
          curr.y = prev.y - (sdy / sDist) * SEG_DIST + perpY * slither;
          curr.z = prev.z - (sdz / sDist) * SEG_DIST;
        }

        // Render Dragon from Tail to Head (Painter's Algorithm for 3D Depth)
        const focalLength = 700;
        const startIdx =
          d.phase === "diving" ? Math.floor(d.swallowedCount) : 0;
        const endIdx =
          d.phase === "emerging"
            ? NUM_SEGMENTS - Math.floor(d.swallowedCount)
            : NUM_SEGMENTS;

        for (let i = endIdx - 1; i >= startIdx; i--) {
          const seg = d.segments[i];
          const nextSeg = d.segments[Math.max(0, i - 1)];
          const angle = Math.atan2(nextSeg.y - seg.y, nextSeg.x - seg.x);

          // 3D Perspective Scale Factor
          const scale3D = Math.max(0.45, Math.min(1.65, focalLength / (focalLength - seg.z)));
          const taper = 1 - (i / NUM_SEGMENTS) * 0.72;
          const s = scale3D * taper;

          ctx.save();
          ctx.translate(seg.x, seg.y);
          ctx.rotate(angle);

          if (i === 0) {
            // ── 3D EXTRUDED DRAGON HEAD: "<>" OR "[]" ──────────────
            ctx.scale(scale3D, scale3D);

            // 3D Depth Extrusion Shadow Layer
            ctx.fillStyle = "#081226";
            ctx.strokeStyle = d.secondaryColor;
            ctx.lineWidth = 2.5;
            ctx.font = "900 26px var(--font-display), monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Draw 3D extruded layers for the "<>" or "[]" head
            for (let layer = 4; layer >= 0; layer--) {
              ctx.fillStyle = layer === 0 ? d.primaryColor : "#0a1936";
              ctx.fillText(d.headSymbol, -layer * 1.4, layer * 1.2);
            }

            // Specular highlight stroke on top face of "<>" or "[]"
            ctx.strokeStyle = d.secondaryColor;
            ctx.lineWidth = 1.2;
            ctx.strokeText(d.headSymbol, 0, 0);

            // Glowing Dragon Horns / Whiskers
            ctx.beginPath();
            ctx.moveTo(4, -8);
            ctx.quadraticCurveTo(-14, -22, -28, -16);
            ctx.moveTo(4, 8);
            ctx.quadraticCurveTo(-14, 22, -28, 16);
            ctx.strokeStyle = d.secondaryColor;
            ctx.lineWidth = 1.8;
            ctx.stroke();
          } else {
            // ── 3D ARTICULATED VERTEBRAE & CYBER WINGS/RIBS ────────
            const isWing = i === 4 || i === 5 || i === 12;
            const ribSpan = isWing ? 26 * s : 13 * s;

            // Connect spine bone to previous segment
            ctx.strokeStyle = d.primaryColor;
            ctx.lineWidth = Math.max(1.5, 5.5 * s);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(SEG_DIST * 0.9, 0);
            ctx.stroke();

            // Draw 3D Geometric Ribs / Wings matching "<>" or "[]" aesthetic
            ctx.strokeStyle = i % 2 === 0 ? d.primaryColor : d.secondaryColor;
            ctx.lineWidth = isWing ? 2.2 * s : 1.5 * s;

            ctx.beginPath();
            if (d.headSymbol === "<>") {
              // Angular Chevron Ribs
              ctx.moveTo(-6 * s, -ribSpan);
              ctx.lineTo(5 * s, 0);
              ctx.lineTo(-6 * s, ribSpan);
            } else {
              // Architectural Bracket Ribs
              ctx.moveTo(-4 * s, -ribSpan);
              ctx.lineTo(3 * s, -ribSpan);
              ctx.lineTo(3 * s, ribSpan);
              ctx.lineTo(-4 * s, ribSpan);
            }
            ctx.stroke();

            // Dorsal Node Core
            ctx.fillStyle = i % 3 === 0 ? d.secondaryColor : d.primaryColor;
            ctx.fillRect(-3 * s, -3 * s, 6 * s, 6 * s);
          }

          ctx.restore();
        }
      }
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[45] w-full h-full"
      aria-hidden="true"
    />
  );
}
