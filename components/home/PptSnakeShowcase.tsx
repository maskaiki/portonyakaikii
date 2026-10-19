"use client";

import React, { useEffect, useRef } from "react";

export interface PptItem {
  id: number;
  num: string;
  image: string;
}

const PPT_ITEMS: PptItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  num: String(i + 1).padStart(2, "0"),
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

    const CARD_SPACING = 0.055;
    const SNAKE_TAIL_SPAN = PPT_ITEMS.length * CARD_SPACING;
    const TOTAL_CYCLE = 1 + SNAKE_TAIL_SPAN + 0.18;

    const render = () => {
      animId = requestAnimationFrame(render);

      const baseSpeed = isHoveredRef.current ? 0.0012 : 0.0036;
      cycleRef.current = (cycleRef.current + baseSpeed + speedBoostRef.current) % TOTAL_CYCLE;
      speedBoostRef.current *= 0.92;

      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const u = cycleRef.current - idx * CARD_SPACING;

        if (u < 0 || u > 1) {
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
          card.style.transform = "translate3d(-120vw, 200px, -200px) scale(0.5)";
          return;
        }

        card.style.pointerEvents = "auto";

        const xVw = -75 + u * 150;
        const waveY = Math.sin(u * Math.PI * 2.5) * 42;
        const yPx = (0.45 - u) * 240 + waveY;
        const zPx = Math.sin(u * Math.PI) * 60;
        const scale = 0.96 - u * 0.18;
        const opacity = u < 0.05 ? u / 0.05 : u > 0.86 ? (1 - u) / 0.14 : 1;

        card.style.transform = `translate3d(${xVw}vw, ${yPx}px, ${zPx}px) scale(${scale})`;
        card.style.opacity = String(Math.max(0, Math.min(1, opacity)));
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
      className="relative w-screen left-1/2 -translate-x-1/2 py-16 lg:py-24 overflow-hidden select-none"
    >
      <div
        className="relative w-full h-[440px] sm:h-[520px] flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        {/* Background Giant Typography */}
        <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20 relative z-0 pointer-events-none flex flex-col justify-center">
          <h3 className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-[6.5rem] font-black uppercase tracking-tight leading-[0.92] text-[#f4f4ed]">
            REVOLUTIONIZING <br />
            <span className="font-brier italic font-normal text-[#0055FF] lowercase">
              slide
            </span>{" "}
            <br />
            VISUALIZATION.
          </h3>
        </div>

        {/* 10 Slithering 16:9 PPT Cards (Clean, no broken image icons or file path text) */}
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
              className="absolute w-[280px] sm:w-[370px] md:w-[420px] aspect-video rounded-[24px] p-2.5 bg-[#f4f4ed] border border-white shadow-[0_24px_60px_rgba(0,0,0,0.9)] flex items-center justify-center will-change-transform"
            >
              <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-[#18181c] flex items-center justify-center">
                <img
                  src={item.image}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                />
                <span className="font-brier italic text-3xl text-[#f4f4ed]/30 z-0">
                  {item.num}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
