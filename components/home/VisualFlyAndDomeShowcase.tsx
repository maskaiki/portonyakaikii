"use client";

import React, { useEffect, useRef } from "react";

// 6 Clean Radial Trajectories for Scene 1 (Fly-Past around center KAIKI title)
const FLY_SLOTS = [
  { id: 1, x: -28, y: -18, image: "/assets/fly/fly-1.jpg" },
  { id: 2, x: 28, y: 16, image: "/assets/fly/fly-2.jpg" },
  { id: 3, x: -24, y: 20, image: "/assets/fly/fly-3.jpg" },
  { id: 4, x: 26, y: -18, image: "/assets/fly/fly-4.jpg" },
  { id: 5, x: 0, y: -24, image: "/assets/fly/fly-5.jpg" },
  { id: 6, x: 0, y: 24, image: "/assets/fly/fly-6.jpg" },
];

// 16 Visual Collection Slots for Scene 3 (public/assets/visuals/visual-1.jpg to visual-16.jpg)
const VISUAL_COLLECTION = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  num: String(i + 1).padStart(2, "0"),
  image: `/assets/visuals/visual-${i + 1}.jpg`,
}));

const DOME_ROWS = [
  VISUAL_COLLECTION.slice(0, 4),
  VISUAL_COLLECTION.slice(4, 8),
  VISUAL_COLLECTION.slice(8, 12),
  VISUAL_COLLECTION.slice(12, 16),
];

export function VisualFlyAndDomeShowcase() {
  const flyCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef(0);
  const scrollBoostRef = useRef(0);

  useEffect(() => {
    let animId: number;
    let lastY = window.scrollY;

    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      scrollBoostRef.current = Math.min(0.015, dy * 0.00035);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = () => {
      animId = requestAnimationFrame(animate);
      progressRef.current = (progressRef.current + 0.0018 + scrollBoostRef.current) % 1;
      scrollBoostRef.current *= 0.92;

      const total = FLY_SLOTS.length;

      flyCardsRef.current.forEach((el, i) => {
        if (!el) return;
        const slot = FLY_SLOTS[i];
        const t = (progressRef.current + i / total) % 1;

        // Controlled scale (0.2 -> 1.65) so cards never blow up into giant screen-blocking blobs
        const scale = 0.2 + Math.pow(t, 1.8) * 1.45;
        const tx = slot.x * Math.pow(t, 1.25);
        const ty = slot.y * Math.pow(t, 1.25);

        // Smooth bell-curve opacity fade in & fade out
        const opacity = Math.sin(t * Math.PI);

        el.style.transform = `translate3d(${tx}vw, ${ty}vh, 0px) scale(${scale})`;
        el.style.opacity = String(Math.max(0, Math.min(1, opacity)));
        el.style.zIndex = String(Math.round(t * 30));
      });
    };

    animId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden select-none">
      
      {/* ══════════════════════════════════════════════════════════════
          PART A: SEAMLESS FULL-BLEED "KAIKI" Z-AXIS FLY-PAST STAGE
         ══════════════════════════════════════════════════════════════ */}
      <div className="relative w-full h-[85vh] min-h-[560px] flex items-center justify-center overflow-hidden">
        
        {/* Center Giant Clean "KAIKI" Typography */}
        <h3 className="relative z-10 font-display text-[21vw] font-black uppercase leading-none tracking-tighter text-[#f4f4ed] pointer-events-none select-none">
          KAIKI
        </h3>

        {/* Flying Frame Slots (Clean, no broken image icons) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          {FLY_SLOTS.map((slot, idx) => (
            <div
              key={slot.id}
              ref={(el) => {
                flyCardsRef.current[idx] = el;
              }}
              className="absolute w-[180px] sm:w-[230px] aspect-square rounded-[26px] bg-[#1a1a1e] border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.85)] overflow-hidden flex items-center justify-center will-change-transform"
            >
              <img
                src={slot.image}
                alt=""
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                className="absolute inset-0 w-full h-full object-cover z-10"
              />
              <span className="font-brier italic text-2xl text-[#f4f4ed]/25 z-0">
                0{slot.id}
              </span>
            </div>
          ))}
        </div>

        {/* Seamless Top & Bottom Fade into #111112 */}
        <div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            background:
              "linear-gradient(to bottom, #111112 0%, transparent 18%, transparent 82%, #111112 100%)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          PART B: SEAMLESS FULL-BLEED 16-VISUAL FISHEYE DOME WALL
         ══════════════════════════════════════════════════════════════ */}
      <div className="relative w-full h-[90vh] min-h-[620px] flex items-center justify-center overflow-hidden">
        
        {/* 3D Fisheye Curved Rows Scrolling Right */}
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
                  style={{ animationDuration: durations[rowIndex] }}
                >
                  {[...rowItems, ...rowItems, ...rowItems, ...rowItems].map((item, i) => (
                    <div
                      key={`${item.id}-${i}`}
                      className="relative w-[220px] sm:w-[290px] md:w-[330px] aspect-[16/10] rounded-[22px] bg-[#18181c] border border-white/10 overflow-hidden shrink-0 flex items-center justify-center group"
                    >
                      <img
                        src={item.image}
                        alt=""
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="font-brier italic text-2xl text-[#f4f4ed]/20 z-0">
                        {item.num}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Seamless Radial & Vertical Vignette Blending into #111112 */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(17,17,18,0.25) 10%, rgba(17,17,18,0.75) 68%, #111112 100%), linear-gradient(to bottom, #111112 0%, transparent 20%, transparent 75%, #111112 100%)",
          }}
        />

        {/* Clean Center Title + Single Contact Button */}
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
