"use client";

import React, { useEffect, useRef } from "react";

export interface PptItem {
  id: number;
  title: string;
  image: string;
}

// 10 Desain PPT (16:9 JPG) — public/assets/ppt/ppt-1.jpg s/d ppt-10.jpg
const PPT_ITEMS: PptItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Presentation Deck ${String(i + 1).padStart(2, "0")}`,
  image: `/assets/ppt/ppt-${i + 1}.jpg`,
}));

export function PptSnakeShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cycleRef = useRef(0);
  const speedBoostRef = useRef(0);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    let animId: number;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      speedBoostRef.current = Math.min(0.015, dy * 0.00035);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Spacing between cards in the snake train & total cycle length (includes pause when text is 100% clear)
    const CARD_SPACING = 0.055;
    const SNAKE_TAIL_SPAN = PPT_ITEMS.length * CARD_SPACING; // 0.55
    const TOTAL_CYCLE = 1 + SNAKE_TAIL_SPAN + 0.18; // Extra 0.18 gap so text is completely uncovered between waves

    const render = () => {
      animId = requestAnimationFrame(render);

      const baseSpeed = isHoveredRef.current ? 0.0012 : 0.0036;
      cycleRef.current = (cycleRef.current + baseSpeed + speedBoostRef.current) % TOTAL_CYCLE;
      speedBoostRef.current *= 0.92;

      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        // u is this card's individual progress from far-left outside (0) to far-right outside (1)
        const u = cycleRef.current - idx * CARD_SPACING;

        if (u < 0 || u > 1) {
          // Card is either waiting outside left edge or has already disappeared on the right
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
          card.style.transform = "translate3d(-120vw, 200px, -200px) scale(0.5)";
          return;
        }

        card.style.pointerEvents = "auto";

        // Horizontal travel: starts outside far-left (-75vw) and exits outside far-right (+75vw)
        const xVw = -75 + u * 150;

        // Diagonal climb (bottom-left to top-right) + 3D S-curve snake wave
        const waveY = Math.sin(u * Math.PI * 2.5) * 42;
        const yPx = (0.45 - u) * 240 + waveY;

        // 3D Depth & Scale
        const zPx = Math.sin(u * Math.PI) * 60;
        const scale = 0.96 - u * 0.18;

        // Crisp solid opacity across the screen, fading out smoothly as it disappears on the right
        const opacity = u < 0.05 ? u / 0.05 : u > 0.86 ? (1 - u) / 0.14 : 1;

        card.style.transform = `translate3d(${xVw}vw, ${yPx}px, ${zPx}px) scale(${scale})`;
        card.style.opacity = String(Math.max(0, Math.min(1, opacity)));
        // Front/leading cards stay layered cleanly over trailing cards
        card.style.zIndex = String(100 - idx);
      });
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      className="relative w-screen left-1/2 -translate-x-1/2 py-20 lg:py-28 overflow-hidden select-none"
    >
      {/* Inner Content Aligned with Page Padding */}
      <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <span className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#f4f4ed]/50">
            Presentation Design (10 Works • 16:9)
          </span>
          <span className="font-brier italic text-lg text-[#0055FF]">
            Slide Decks
          </span>
        </div>
      </div>

      {/* Full-Bleed Viewport Stage so Snake Enters from Outside Left Edge & Disappears on Right */}
      <div
        className="relative w-full h-[460px] sm:h-[560px] flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        {/* Background Giant Typography */}
        <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20 relative z-0 pointer-events-none flex flex-col justify-center">
          <h3 className="font-sans text-5xl sm:text-7xl lg:text-8xl xl:text-[6.5rem] font-semibold tracking-tight leading-[0.94] text-[#f4f4ed]">
            Revolutionizing <br />
            <span className="font-brier italic font-normal text-[#0055FF]">
              Slide
            </span>{" "}
            <br />
            Visualization
          </h3>
        </div>

        {/* 10 Slithering 16:9 PPT Cards (Enters from -75vw left, exits +75vw right) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {PPT_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="absolute w-[280px] sm:w-[370px] md:w-[420px] aspect-video rounded-[28px] p-3 sm:p-3.5 bg-[#f4f4ed] text-[#111112] border border-white shadow-[0_24px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between will-change-transform"
            >
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-[#18181c] flex items-center justify-center">
                <img
                  src={item.image}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                />
                <div className="flex flex-col items-center justify-center text-center p-4 z-0">
                  <span className="font-brier italic text-3xl text-[#f4f4ed]/50">
                    PPT {String(item.id).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Micro Captions */}
      <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mt-6 text-xs text-[#f4f4ed]/55">
        <p className="max-w-xs">
          High-impact 16:9 presentation decks crafted with structured layouts and visual clarity.
        </p>
        <p className="max-w-xs sm:text-right">
          Continuous 3D wave showcase — enters from left and glides across the stage.
        </p>
      </div>
    </div>
  );
}
