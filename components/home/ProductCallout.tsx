"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCalloutProps {
  className?: string;
}

const DISCIPLINES = [
  {
    index: "01",
    title: "Front-End Web",
    sub: "Interactive Portfolio Builds",
  },
  {
    index: "02",
    title: "Graphic Design",
    sub: "Visual Layouts & Posters",
  },
  {
    index: "03",
    title: "Video Editing",
    sub: "Short-Form Motion & Cuts",
  },
];

export function ProductCallout({ className = "" }: ProductCalloutProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    // Jangan jalankan interval di Mobile karena komponen ini hidden md:flex!
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    let cycle: ReturnType<typeof setInterval> | null = null;
    const startCycle = () => {
      if (cycle) return;
      cycle = setInterval(() => {
        setActiveIdx((prev) => (prev + 1) % DISCIPLINES.length);
      }, 3500);
    };

    window.addEventListener("pointermove", startCycle, {
      passive: true,
      once: true,
    });
    window.addEventListener("scroll", startCycle, {
      passive: true,
      once: true,
    });

    return () => {
      if (cycle) clearInterval(cycle);
      window.removeEventListener("pointermove", startCycle);
      window.removeEventListener("scroll", startCycle);
    };
  }, []);

  const current = DISCIPLINES[activeIdx];

  return (
    <aside
      className={`z-25 flex flex-col items-end select-none pointer-events-auto ${className}`}
      aria-label="Kaiki Disciplines"
    >
      <div
        onClick={() => setActiveIdx((prev) => (prev + 1) % DISCIPLINES.length)}
        className="relative w-48 sm:w-52 p-4 border border-white/85 bg-white/55 backdrop-blur-xl cursor-pointer transition-colors duration-300 hover:bg-white/75 shadow-[0_16px_40px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(255,255,255,0.9)]"
      >
        <div
          className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#111112]"
          aria-hidden="true"
        />

        <div className="flex items-baseline justify-between border-b border-[#111112]/15 pb-2 mb-3">
          <span className="font-display text-[10px] font-extrabold tracking-[0.16em] uppercase text-[#111112]/75">
            Focus Area
          </span>
          <span className="font-brier italic text-sm text-[#111112]">
            {current.index}
          </span>
        </div>

        <div className="h-12 flex flex-col justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <p className="font-display text-sm font-black uppercase text-[#111112] tracking-tight leading-none">
                {current.title}
              </p>
              <p className="font-sans text-[11px] text-[#111112]/75 mt-1">
                {current.sub}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-[#111112]/15">
          {DISCIPLINES.map((_, i) => (
            <span
              key={i}
              className={`h-[2px] w-6 origin-left transition-transform duration-300 will-change-transform ${
                i === activeIdx
                  ? "scale-x-100 bg-[#111112]"
                  : "scale-x-[0.35] bg-[#111112]/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div
        className="w-48 sm:w-52 mt-2 font-barcode text-[#111112]/80 text-xl leading-none select-none tracking-widest text-right overflow-hidden"
        aria-hidden="true"
      >
        <div className="whitespace-nowrap">NEVERSTOPCREATING</div>
      </div>
    </aside>
  );
}
