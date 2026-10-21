"use client";

import React, { useEffect, useRef, useState } from "react";

export interface PptItem {
  id: number;
  num: string;
  title: string;
  image: string;
}

const PPT_ITEMS: PptItem[] = [
  { id: 1, num: "01", title: "Big Data Progress Deck — TI UM", image: "/assets/ppt/ppt-1.webp" },
  { id: 2, num: "02", title: "KerjaKita Solution — HackAttack 2025", image: "/assets/ppt/ppt-2.webp" },
  { id: 3, num: "03", title: "KerjaKita Pitch Deck — HackAttack 2025", image: "/assets/ppt/ppt-3.webp" },
  { id: 4, num: "04", title: "Ritun Recite-to-Unlock App — UM", image: "/assets/ppt/ppt-4.webp" },
  { id: 5, num: "05", title: "MedChain Blockchain Medical Deck", image: "/assets/ppt/ppt-5.webp" },
  { id: 6, num: "06", title: "MongooPod Team & Innovation — KBMK", image: "/assets/ppt/ppt-6.webp" },
  { id: 7, num: "07", title: "Inspektorat NTB Keynote Deck", image: "/assets/ppt/ppt-7.webp" },
  { id: 8, num: "08", title: "MongooConnect Platform UI Mockup", image: "/assets/ppt/ppt-8.webp" },
  { id: 9, num: "09", title: "Bio-Cube Symbiotic Architecture — IdeaFest", image: "/assets/ppt/ppt-9.webp" },
  { id: 10, num: "10", title: "MongooPod Cover Deck — KBMK UM", image: "/assets/ppt/ppt-10.webp" },
];

function PptSlideCard({
  item,
  cardRef,
}: {
  item: PptItem;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      ref={cardRef}
      className="absolute w-[340px] sm:w-[500px] md:w-[620px] lg:w-[700px] aspect-video rounded-[20px] overflow-hidden bg-[#18181c] shadow-[0_28px_70px_rgba(0,0,0,0.92)] flex items-center justify-center will-change-transform"
    >
      <img
        src={item.image}
        alt={item.title}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
        className={`w-full h-full object-cover rounded-[20px] z-10 transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {!loaded && (
        <span className="font-brier italic text-4xl text-[#f4f4ed]/30 z-0">
          {item.num}
        </span>
      )}
    </div>
  );
}

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

    const CARD_SPACING = 0.062;
    const SNAKE_TAIL_SPAN = PPT_ITEMS.length * CARD_SPACING;
    const TOTAL_CYCLE = 1 + SNAKE_TAIL_SPAN + 0.16;

    const render = () => {
      animId = requestAnimationFrame(render);

      const baseSpeed = isHoveredRef.current ? 0.0011 : 0.0032;
      cycleRef.current = (cycleRef.current + baseSpeed + speedBoostRef.current) % TOTAL_CYCLE;
      speedBoostRef.current *= 0.92;

      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const u = cycleRef.current - idx * CARD_SPACING;

        if (u < 0 || u > 1) {
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
          card.style.transform = "translate3d(-120vw, 220px, -200px) scale(0.5)";
          return;
        }

        card.style.pointerEvents = "auto";

        // Enters from outside far-left (-82vw) and exits outside far-right (+82vw)
        const xVw = -82 + u * 164;
        const waveY = Math.sin(u * Math.PI * 2.4) * 52;
        const yPx = (0.45 - u) * 280 + waveY;
        const zPx = Math.sin(u * Math.PI) * 75;
        const scale = 1.02 - u * 0.16;
        const opacity = u < 0.05 ? u / 0.05 : u > 0.88 ? (1 - u) / 0.12 : 1;

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
      className="relative w-screen left-1/2 -translate-x-1/2 py-20 lg:py-28 overflow-hidden select-none"
    >
      <div
        className="relative w-full h-[540px] sm:h-[660px] lg:h-[740px] flex items-center justify-center"
        style={{ perspective: "1600px" }}
      >
        {/* Background Giant Typography */}
        <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20 relative z-0 pointer-events-none flex flex-col justify-center">
          <h3 className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-[6.8rem] font-black uppercase tracking-tight leading-[0.92] text-[#f4f4ed]">
            REVOLUTIONIZING <br />
            <span className="font-brier italic font-normal text-[#0055FF] lowercase">
              slide
            </span>{" "}
            <br />
            VISUALIZATION.
          </h3>
        </div>

        {/* 10 Large Frameless Rounded-[20px] PPT Cards */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {PPT_ITEMS.map((item, idx) => (
            <PptSlideCard
              key={item.id}
              item={item}
              cardRef={(el) => {
                cardsRef.current[idx] = el;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
