"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { startMegaMendungStage } from "@/lib/megaMendungEngine";

const VISUAL_COLLECTION = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  num: String(i + 1).padStart(2, "0"),
  image: `/assets/visuals/visual-${i + 1}.webp`,
}));

const DOME_ROWS = [
  VISUAL_COLLECTION.slice(0, 4),
  VISUAL_COLLECTION.slice(4, 8),
  VISUAL_COLLECTION.slice(8, 12),
  VISUAL_COLLECTION.slice(12, 16),
];

// 14 Lapisan Ekstrusi Z-Axis untuk membentuk dinding 3D pada teks "KAIKI"
const EXTRUSION_LAYERS = Array.from({ length: 14 }, (_, i) => {
  const depth = (i + 1) * 2.6;
  // Gradasi dinding 3D: Ice Cyan rim -> Editorial Cobalt -> Deep Midnight Obsidian
  const color =
    i < 2
      ? "#38bdf8"
      : i < 6
      ? "#0055FF"
      : i < 10
      ? "#1e3a8a"
      : "#090d18";
  return { depth, color };
});

export function VisualFlyAndDomeShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const megaCanvasRef = useRef<HTMLCanvasElement>(null);
  const wordmark3DRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

  // 1. Jalankan Engine Awan Mega Mendung (sama seperti HeroGhostBuddy)
  useEffect(() => {
    if (!megaCanvasRef.current) return;
    return startMegaMendungStage(megaCanvasRef.current);
  }, []);

  // 2. Observer Visibilitas & Idle 3D Breathing untuk Teks "KAIKI"
  useEffect(() => {
    const targetEl = containerRef.current;
    if (!targetEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(targetEl);
    return () => observer.disconnect();
  }, []);

  // 3. Interaksi Tilt 3D & Specular Light Sweep pada Teks "KAIKI"
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const nx = px - 0.5;
    const ny = py - 0.5;

    setShinePos({ x: px * 100, y: py * 100 });

    if (wordmark3DRef.current) {
      gsap.to(wordmark3DRef.current, {
        rotateY: nx * 24,
        rotateX: -ny * 20,
        duration: 0.55,
        ease: "power2.out",
        transformPerspective: 1400,
      });
    }
  };

  const handleStageMouseLeave = () => {
    setShinePos({ x: 50, y: 50 });
    if (wordmark3DRef.current) {
      gsap.to(wordmark3DRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.9,
        ease: "elastic.out(1, 0.5)",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden select-none"
    >
      {/* ── PART A: 3D SCULPTED "KAIKI" MONUMENT & PROCEDURAL MEGA MENDUNG STAGE ── */}
      <div
        onMouseMove={handleStageMouseMove}
        onMouseLeave={handleStageMouseLeave}
        className="relative w-full h-[88vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden"
        style={{ perspective: "1400px" }}
      >
        {/* Ambient Center Cobalt & Ice Glow */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,85,255,0.18) 0%, rgba(56,189,248,0.08) 38%, rgba(13,16,23,0) 72%)",
          }}
        />

        {/* LAYER 1 (z-10): Procedural Glass Mega Mendung Clouds Canvas (Flanking Edges) */}
        <canvas
          ref={megaCanvasRef}
          className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
          style={{ width: "100%", height: "100%" }}
          aria-label="Interactive Glass Mega Mendung Clouds framing the 3D KAIKI monument"
        />

        {/* LAYER 2 (z-20): 3D Extruded & Textured "KAIKI" Wordmark */}
        <div className="relative z-20 pointer-events-none flex flex-col items-center justify-center px-4">
          <span className="font-brier italic text-lg sm:text-2xl text-[#38bdf8] tracking-wide mb-2 sm:mb-4 drop-shadow-[0_4px_20px_rgba(0,85,255,0.6)]">
            Crafted in Malang, Indonesia
          </span>

          <div
            ref={wordmark3DRef}
            className="relative flex items-center justify-center will-change-transform"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(6deg) rotateY(-8deg)",
            }}
          >
            {/* Deep 3D Ambient Floor Shadow Plane */}
            <span
              aria-hidden="true"
              className="absolute font-display text-[20vw] sm:text-[21vw] font-black uppercase leading-none tracking-tighter text-black/80 blur-2xl select-none"
              style={{
                transform: "translateZ(-56px) translateY(24px) scale(0.98)",
              }}
            >
              KAIKI
            </span>

            {/* 14 Stepped 3D Z-Extrusion Side Walls */}
            {EXTRUSION_LAYERS.map((layer, idx) => (
              <span
                key={idx}
                aria-hidden="true"
                className="absolute font-display text-[20vw] sm:text-[21vw] font-black uppercase leading-none tracking-tighter select-none"
                style={{
                  color: layer.color,
                  transform: `translateZ(-${layer.depth}px)`,
                  WebkitTextStroke:
                    idx === 0
                      ? "2px rgba(186,230,253,0.75)"
                      : "1px rgba(15,23,42,0.5)",
                  textShadow:
                    idx === EXTRUSION_LAYERS.length - 1
                      ? "0 28px 65px rgba(0, 85, 255, 0.45)"
                      : "none",
                }}
              >
                KAIKI
              </span>
            ))}

            {/* Front Chiseled 3D Textured Face (Metallic Bone + Liquid Glass Scanlines + Dynamic Cursor Specular) */}
            <h3
              className="relative font-display text-[20vw] sm:text-[21vw] font-black uppercase leading-none tracking-tighter select-none"
              style={{
                transform: "translateZ(4px)",
                backgroundImage: `
                  radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.98) 0%, rgba(186,230,253,0.75) 22%, rgba(244,244,237,0) 52%),
                  repeating-linear-gradient(135deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 2px, rgba(0,85,255,0.12) 2px, rgba(0,85,255,0.12) 6px),
                  linear-gradient(180deg, #ffffff 0%, #f4f4ed 36%, #bae6fd 68%, #38bdf8 86%, #f4f4ed 100%)
                `,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(255,255,255,0.78)",
                filter: "drop-shadow(0 4px 12px rgba(0,85,255,0.35))",
              }}
            >
              KAIKI
            </h3>
          </div>
        </div>

        {/* Top & Bottom Seamless Vignette Blends */}
        <div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            background:
              "linear-gradient(to bottom, #0d1017 0%, transparent 18%, transparent 82%, #0d1017 100%)",
          }}
        />
      </div>

      {/* ── PART B: SEAMLESS FULL-BLEED 16-VISUAL FISHEYE DOME WALL ── */}
      <div className="relative w-full h-[90vh] min-h-[620px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 flex flex-col justify-center gap-4 sm:gap-5 py-4 scale-105"
          style={{
            perspective: "950px",
            transformStyle: "preserve-3d",
          }}
        >
          {DOME_ROWS.map((rowItems, rowIndex) => {
            const rotateX = (1.5 - rowIndex) * 10;
            const translateZ = -Math.abs(1.5 - rowIndex) * 32;
            const durations = ["36s", "28s", "40s", "32s"];

            return (
              <div
                key={rowIndex}
                className="w-full overflow-hidden"
                style={{
                  transform: `rotateX(${rotateX}deg) translateZ(${translateZ}px)`,
                }}
              >
                <div
                  className="flex gap-4 sm:gap-5 w-max marquee-track-right"
                  style={{
                    animationDuration: durations[rowIndex],
                    animationPlayState: isVisible ? "running" : "paused",
                  }}
                >
                  {[...rowItems, ...rowItems].map((item, i) => (
                    <div
                      key={`${item.id}-${i}`}
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                      className="relative w-[220px] sm:w-[290px] md:w-[330px] aspect-[16/10] rounded-[20px] bg-[#141824] border border-white/15 overflow-hidden shrink-0 group will-change-transform"
                    >
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 220px, 330px"
                        className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(13,16,23,0.25) 10%, rgba(13,16,23,0.78) 68%, #0d1017 100%), linear-gradient(to bottom, #0d1017 0%, transparent 20%, transparent 75%, #0d1017 100%)",
          }}
        />

        <div className="relative z-30 max-w-2xl mx-auto px-6 flex flex-col items-center text-center">
          <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#f4f4ed] leading-[0.95] mb-8">
            YOUR NEXT BIG <br />
            <span className="font-brier italic font-normal text-[#0055FF] lowercase">
              idea starts here.
            </span>
          </h3>

          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-[#f4f4ed] !text-[#111112] hover:bg-[#0055FF] hover:!text-white font-display text-xs font-extrabold uppercase tracking-wider transition-all shadow-[0_16px_40px_rgba(0,0,0,0.8)] flex items-center gap-2"
          >
            <span>Let&rsquo;s Connect</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
