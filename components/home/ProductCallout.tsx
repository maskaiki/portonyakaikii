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
      <button
        type="button"
        onClick={() => setActiveIdx((prev) => (prev + 1) % DISCIPLINES.length)}
        className="group relative w-48 sm:w-52 py-1 text-right cursor-pointer transition-opacity duration-200"
      >
        <div className="flex items-baseline justify-end gap-2.5 mb-2">
          <span className="font-display text-[11px] font-extrabold tracking-[0.16em] uppercase text-[#111112]">
            Focus Area
          </span>
          <span className="font-brier italic text-base text-[#0055FF]">
            {current.index}
          </span>
        </div>

        <div className="h-11 flex flex-col justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <p className="font-display text-base font-black uppercase text-[#111112] group-hover:text-[#0055FF] transition-colors tracking-tight leading-none">
                {current.title}
              </p>
              <p className="font-sans text-xs text-[#111112] mt-1 font-medium">
                {current.sub}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-end gap-1.5 mt-3">
          {DISCIPLINES.map((_, i) => (
            <span
              key={i}
              className={`h-[2px] w-6 origin-right transition-transform duration-300 will-change-transform ${
                i === activeIdx
                  ? "scale-x-100 bg-[#0055FF]"
                  : "scale-x-[0.35] bg-[#111112]/35"
              }`}
            />
          ))}
        </div>
      </button>
    </aside>
  );
}
