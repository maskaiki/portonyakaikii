"use client";

import React, { useEffect, useRef } from "react";

interface Vec3 {
  x: number;
  y: number; // Stored in DOCUMENT WORLD Y (does NOT follow scroll!)
  z: number;
}

interface PortalFX {
  x: number;
  y: number; // World Y
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  kind: "<>" | "[]";
}

interface Dragon {
  id: string;
  headSymbol: "<>" | "[]";
  armorDark: string;
  armorMid: string;
  circuitBright: string;
  eyeGlow: string;
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

const CODE_STRINGS = ["01011", "10110", "00101", "<sys>", "[ram]", "11010"];

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

    // Get boxes in DOCUMENT WORLD SPACE (rect.top + window.scrollY) so dragons stay anchored to the page!
    const getWorldBoxes = () => {
      const scrollY = window.scrollY;
      const selectors =
        ".web-scroll-card, .arsenal-3d-card, .journey-row, .rain-panel, .stat-card, .project-card";
      const els = Array.from(document.querySelectorAll(selectors));
      const boxes: { left: number; top: number; width: number; height: number }[] = [];

      for (const el of els) {
        const r = el.getBoundingClientRect();
        const worldTop = r.top + scrollY;
        // Pick boxes near the current active region of the page
        if (
          r.width > 140 &&
          r.height > 60 &&
          Math.abs(worldTop - (scrollY + height * 0.5)) < height * 1.15
        ) {
          boxes.push({
            left: r.left,
            top: worldTop,
            width: r.width,
            height: r.height,
          });
        }
      }
      return boxes;
    };

    // Larger Dragon Proportions (28 segments, 26px spacing)
    const NUM_SEGMENTS = 28;
    const SEG_DIST = 26;

    const createDragon = (
      id: string,
      headSymbol: "<>" | "[]",
      armorDark: string,
      armorMid: string,
      circuitBright: string,
      eyeGlow: string,
      startX: number,
      startWorldY: number,
      timeOffset: number
    ): Dragon => {
      const segments: Vec3[] = [];
      for (let i = 0; i < NUM_SEGMENTS; i++) {
        segments.push({ x: startX - i * SEG_DIST, y: startWorldY, z: 0 });
      }
      return {
        id,
        headSymbol,
        armorDark,
        armorMid,
        circuitBright,
        eyeGlow,
        segments,
        vel: { x: 5, y: -2, z: 0 },
        target: { x: width * 0.65, y: startWorldY + 120, z: 80 },
        phase: "flying",
        portalEntry: null,
        portalExit: null,
        swallowedCount: 0,
        insideTimer: 0,
        timeOffset,
      };
    };

    const initialScrollY = window.scrollY;
    const dragons: Dragon[] = [
      // Dragon 1: "<>" Head — Matte Black Faceted Armor + Electric Cyan/Blue Code Circuitry
      createDragon(
        "dragon-angle",
        "<>",
        "#0c1220",
        "#16213a",
        "#0088FF",
        "#00F0FF",
        width * 0.25,
        initialScrollY + height * 0.45,
        0
      ),
      // Dragon 2: "[]" Head — Deep Obsidian Navy Armor + Royal Cobalt Code Circuitry
      createDragon(
        "dragon-bracket",
        "[]",
        "#080d1a",
        "#111b36",
        "#2563EB",
        "#60A5FA",
        width * 0.75,
        initialScrollY + height * 1.15,
        50
      ),
    ];

    const portals: PortalFX[] = [];

    const spawnPortal = (x: number, worldY: number, color: string, kind: "<>" | "[]") => {
      portals.push({
        x,
        y: worldY,
        radius: 12,
        maxRadius: 95,
        alpha: 1,
        color,
        kind,
      });
    };

    let t = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      t += 0.016;

      const scrollY = window.scrollY;
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        height * 3
      );

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Translate canvas by -scrollY so all dragon positions are in WORLD coordinates (never stuck to screen!)
      ctx.save();
      ctx.translate(0, -scrollY);

      // 1. Render Active Box Portals in World Space
      for (let i = portals.length - 1; i >= 0; i--) {
        const p = portals[i];
        p.radius += (p.maxRadius - p.radius) * 0.11;
        p.alpha -= 0.02;
        if (p.alpha <= 0.02) {
          portals.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(t * 2.2);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.lineWidth = 3;

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
          ctx.strokeRect(-p.radius * 0.85, -p.radius * 0.55, p.radius * 1.7, p.radius * 1.1);
        }
        ctx.stroke();
        ctx.restore();
      }

      // 2. Update & Render Low-Poly 3D Cyber Dragons
      for (const d of dragons) {
        const head = d.segments[0];
        const time = t + d.timeOffset;

        // If the user scrolled very far away (> 2.2 screens), let the dragon patrol near the new world region via a portal
        if (d.phase === "flying" && Math.abs(head.y - (scrollY + height * 0.5)) > height * 2.1) {
          const newY = scrollY + height * (0.25 + Math.random() * 0.5);
          d.portalExit = { x: width * (0.2 + Math.random() * 0.6), y: newY };
          for (const seg of d.segments) {
            seg.x = d.portalExit.x;
            seg.y = d.portalExit.y;
            seg.z = -50;
          }
          spawnPortal(d.portalExit.x, d.portalExit.y, d.circuitBright, d.headSymbol);
          d.swallowedCount = NUM_SEGMENTS;
          d.phase = "emerging";
          d.target = {
            x: width * (0.2 + Math.random() * 0.6),
            y: newY + (Math.random() - 0.5) * 350,
            z: 110,
          };
        }

        if (d.phase === "flying") {
          const distToTarget = Math.hypot(d.target.x - head.x, d.target.y - head.y);
          if (distToTarget < 120) {
            const boxes = getWorldBoxes();
            if (boxes.length >= 2 && Math.random() < 0.52) {
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
              d.target = { x: d.portalEntry.x, y: d.portalEntry.y, z: -70 };
              d.phase = "diving";
            } else {
              // Pick a new 3D waypoint in the current world neighborhood
              const baseRegionY = Math.min(
                docHeight - 300,
                Math.max(250, scrollY + height * 0.5 + (Math.random() - 0.5) * height * 1.1)
              );
              d.target = {
                x: width * (0.12 + Math.random() * 0.76),
                y: baseRegionY,
                z: (Math.random() - 0.5) * 240,
              };
            }
          }
        } else if (d.phase === "diving" && d.portalEntry) {
          const dist = Math.hypot(d.portalEntry.x - head.x, d.portalEntry.y - head.y);
          if (dist < 42) {
            if (d.swallowedCount === 0) {
              spawnPortal(d.portalEntry.x, d.portalEntry.y, d.circuitBright, d.headSymbol);
            }
            d.swallowedCount += 1.2;
            if (d.swallowedCount >= NUM_SEGMENTS) {
              d.phase = "inside_box";
              d.insideTimer = 32;
            }
          }
        } else if (d.phase === "inside_box") {
          d.insideTimer -= 1;
          if (d.insideTimer <= 0 && d.portalExit) {
            for (const seg of d.segments) {
              seg.x = d.portalExit.x;
              seg.y = d.portalExit.y;
              seg.z = -60;
            }
            spawnPortal(d.portalExit.x, d.portalExit.y, d.circuitBright, d.headSymbol);
            d.swallowedCount = NUM_SEGMENTS;
            d.phase = "emerging";
            d.target = {
              x: width * (0.15 + Math.random() * 0.7),
              y: d.portalExit.y + (Math.random() - 0.5) * 420,
              z: 130,
            };
          }
          continue;
        } else if (d.phase === "emerging") {
          d.swallowedCount -= 1.15;
          if (d.swallowedCount <= 0) {
            d.swallowedCount = 0;
            d.phase = "flying";
          }
        }

        // 3D Flight & Serpentine Undulation
        const dx = d.target.x - head.x;
        const dy = d.target.y - head.y;
        const dz = d.target.z - head.z;
        const dist = Math.max(1, Math.hypot(dx, dy, dz));

        const speed = d.phase === "diving" ? 8.2 : 6.2;
        const waveX = Math.cos(time * 3.6) * 2.2;
        const waveY = Math.sin(time * 3.6) * 2.2;
        const waveZ = Math.sin(time * 2.2) * 2.4;

        d.vel.x += ((dx / dist) * speed + waveX - d.vel.x) * 0.075;
        d.vel.y += ((dy / dist) * speed + waveY - d.vel.y) * 0.075;
        d.vel.z += ((dz / dist) * speed + waveZ - d.vel.z) * 0.075;

        head.x += d.vel.x;
        head.y += d.vel.y;
        head.z += d.vel.z;

        // 3D Inverse Kinematics Spine
        for (let i = 1; i < NUM_SEGMENTS; i++) {
          const prev = d.segments[i - 1];
          const curr = d.segments[i];
          const sdx = prev.x - curr.x;
          const sdy = prev.y - curr.y;
          const sdz = prev.z - curr.z;
          const sDist = Math.max(0.001, Math.hypot(sdx, sdy, sdz));

          const slither = Math.sin(time * 5.2 - i * 0.42) * 2.4;
          const perpX = -sdy / sDist;
          const perpY = sdx / sDist;

          curr.x = prev.x - (sdx / sDist) * SEG_DIST + perpX * slither;
          curr.y = prev.y - (sdy / sDist) * SEG_DIST + perpY * slither;
          curr.z = prev.z - (sdz / sDist) * SEG_DIST;
        }

        const focalLength = 800;
        const startIdx = d.phase === "diving" ? Math.floor(d.swallowedCount) : 0;
        const endIdx =
          d.phase === "emerging"
            ? NUM_SEGMENTS - Math.floor(d.swallowedCount)
            : NUM_SEGMENTS;

        // Draw from Tail to Head
        for (let i = endIdx - 1; i >= startIdx; i--) {
          const seg = d.segments[i];
          const nextSeg = d.segments[Math.max(0, i - 1)];
          const angle = Math.atan2(nextSeg.y - seg.y, nextSeg.x - seg.x);

          const scale3D = Math.max(0.5, Math.min(1.6, focalLength / (focalLength - seg.z)));
          const taper = 1 - (i / NUM_SEGMENTS) * 0.72;
          const s = scale3D * taper;

          ctx.save();
          ctx.translate(seg.x, seg.y);
          ctx.rotate(angle);

          // ── 1. LARGE LOW-POLY CYBER WINGS WITH GLOWING CODE (At Shoulder Segment i === 5) ──
          if (i === 5) {
            const flap = Math.sin(time * 5.2) * 0.38;
            const wingSpan = 135 * scale3D;
            const wingChord = 68 * scale3D;

            for (const side of [-1, 1]) {
              ctx.save();
              ctx.scale(1, side * (0.72 + flap * 0.28));

              // Outer Wing Facet (Matte Black Armor)
              ctx.beginPath();
              ctx.moveTo(10 * scale3D, 0);
              ctx.lineTo(-18 * scale3D, wingSpan * 0.55);
              ctx.lineTo(-55 * scale3D, wingSpan);
              ctx.lineTo(-wingChord, wingSpan * 0.68);
              ctx.lineTo(-wingChord * 0.85, wingSpan * 0.35);
              ctx.lineTo(-22 * scale3D, 0);
              ctx.closePath();
              ctx.fillStyle = d.armorDark;
              ctx.fill();
              ctx.strokeStyle = d.circuitBright;
              ctx.lineWidth = 1.6 * scale3D;
              ctx.stroke();

              // Inner Wing Facet (Polygon Shading)
              ctx.beginPath();
              ctx.moveTo(10 * scale3D, 0);
              ctx.lineTo(-55 * scale3D, wingSpan);
              ctx.lineTo(-28 * scale3D, wingSpan * 0.28);
              ctx.closePath();
              ctx.fillStyle = d.armorMid;
              ctx.fill();

              // Glowing Binary & Code Traces on Wing Membrane (Exact Image 2 Style!)
              ctx.strokeStyle = d.circuitBright;
              ctx.lineWidth = 1.1 * scale3D;
              ctx.beginPath();
              ctx.moveTo(-18 * scale3D, wingSpan * 0.55);
              ctx.lineTo(-wingChord * 0.75, wingSpan * 0.58);
              ctx.moveTo(-12 * scale3D, wingSpan * 0.32);
              ctx.lineTo(-wingChord * 0.65, wingSpan * 0.32);
              ctx.stroke();

              ctx.fillStyle = d.eyeGlow;
              ctx.font = `700 ${Math.max(8, Math.round(10 * scale3D))}px monospace`;
              ctx.fillText("010110", -44 * scale3D, wingSpan * 0.48);
              ctx.fillText(d.headSymbol, -36 * scale3D, wingSpan * 0.26);

              ctx.restore();
            }
          }

          // ── 2. SPEARHEAD DRAGON TAIL TIP (i === NUM_SEGMENTS - 1) ──
          if (i === NUM_SEGMENTS - 1) {
            const tailLen = 28 * scale3D;
            ctx.beginPath();
            ctx.moveTo(8 * scale3D, 0);
            ctx.lineTo(-tailLen * 0.5, -10 * scale3D);
            ctx.lineTo(-tailLen, 0);
            ctx.lineTo(-tailLen * 0.5, 10 * scale3D);
            ctx.closePath();
            ctx.fillStyle = d.armorDark;
            ctx.fill();
            ctx.strokeStyle = d.circuitBright;
            ctx.lineWidth = 1.8 * scale3D;
            ctx.stroke();
          } else if (i > 0) {
            // ── 3. LOW-POLY FACETED ARMOR BODY SEGMENT & DORSAL SPIKES ──
            const segW = 24 * s;
            const segL = SEG_DIST * 1.15;

            // Left Armor Facet (Lit)
            ctx.beginPath();
            ctx.moveTo(segL * 0.5, 0);
            ctx.lineTo(0, -segW);
            ctx.lineTo(-segL * 0.6, -segW * 0.65);
            ctx.lineTo(-segL * 0.5, 0);
            ctx.closePath();
            ctx.fillStyle = d.armorMid;
            ctx.fill();
            ctx.strokeStyle = d.circuitBright;
            ctx.lineWidth = 1.2 * s;
            ctx.stroke();

            // Right Armor Facet (Shaded)
            ctx.beginPath();
            ctx.moveTo(segL * 0.5, 0);
            ctx.lineTo(0, segW);
            ctx.lineTo(-segL * 0.6, segW * 0.65);
            ctx.lineTo(-segL * 0.5, 0);
            ctx.closePath();
            ctx.fillStyle = d.armorDark;
            ctx.fill();
            ctx.strokeStyle = d.circuitBright;
            ctx.lineWidth = 1.2 * s;
            ctx.stroke();

            // Glowing Center Spine Circuit Line & Dorsal Spike
            ctx.beginPath();
            ctx.moveTo(-segL * 0.5, 0);
            ctx.lineTo(segL * 0.5, 0);
            ctx.strokeStyle = d.eyeGlow;
            ctx.lineWidth = 2.2 * s;
            ctx.stroke();

            // Binary Code Etching on Larger Body Segments
            if (i % 3 === 0 && i < 16) {
              ctx.fillStyle = d.eyeGlow;
              ctx.font = `700 ${Math.max(7, Math.round(9 * s))}px monospace`;
              ctx.fillText(CODE_STRINGS[i % CODE_STRINGS.length], -10 * s, -4 * s);
            }
          } else {
            // ── 4. SCULPTED LOW-POLY 3D DRAGON HEAD WITH "<>" OR "[]" SNOUT ──
            const hs = scale3D * 1.35;

            // Swept-Back Low-Poly Horns
            for (const side of [-1, 1]) {
              ctx.beginPath();
              ctx.moveTo(-4 * hs, side * 12 * hs);
              ctx.lineTo(-38 * hs, side * 30 * hs);
              ctx.lineTo(-24 * hs, side * 10 * hs);
              ctx.closePath();
              ctx.fillStyle = d.armorDark;
              ctx.fill();
              ctx.strokeStyle = d.circuitBright;
              ctx.lineWidth = 1.6 * hs;
              ctx.stroke();
            }

            // Faceted Cranium / Skull Armor
            ctx.beginPath();
            ctx.moveTo(30 * hs, 0);
            ctx.lineTo(6 * hs, -20 * hs);
            ctx.lineTo(-20 * hs, -16 * hs);
            ctx.lineTo(-26 * hs, 0);
            ctx.lineTo(-20 * hs, 16 * hs);
            ctx.lineTo(6 * hs, 20 * hs);
            ctx.closePath();
            ctx.fillStyle = d.armorMid;
            ctx.fill();
            ctx.strokeStyle = d.circuitBright;
            ctx.lineWidth = 2 * hs;
            ctx.stroke();

            // Glowing Cyan/Blue Angular Dragon Eyes (Exact Image 2 Style!)
            ctx.fillStyle = d.eyeGlow;
            ctx.beginPath();
            ctx.moveTo(10 * hs, -7 * hs);
            ctx.lineTo(2 * hs, -12 * hs);
            ctx.lineTo(0, -6 * hs);
            ctx.closePath();
            ctx.moveTo(10 * hs, 7 * hs);
            ctx.lineTo(2 * hs, 12 * hs);
            ctx.lineTo(0, 6 * hs);
            ctx.closePath();
            ctx.fill();

            // Prominent 3D Extruded "<>" or "[]" Head Emblem at the Snout
            ctx.font = `900 ${Math.round(28 * hs)}px var(--font-display), monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#050b16";
            ctx.fillText(d.headSymbol, 16 * hs - 2, 2);
            ctx.fillStyle = d.eyeGlow;
            ctx.fillText(d.headSymbol, 16 * hs, 0);
          }

          ctx.restore();
        }
      }

      ctx.restore();
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
