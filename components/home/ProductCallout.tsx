"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCalloutProps {
  className?: string;
}

const MODULES = [
  {
    code: "MOD.01 // ENG",
    title: "FRONTEND & SYSTEMS",
    metric: "NEXT.JS 15 + TS",
    accent: "#0066FF",
  },
  {
    code: "MOD.02 // VIS",
    title: "EDITORIAL & BRANDING",
    metric: "FIGMA + ADOBE CC",
    accent: "#00d2ff",
  },
  {
    code: "MOD.03 // GRW",
    title: "SOCIAL ARCHITECTURE",
    metric: "120K+ ORGANIC REACH",
    accent: "#00FF88",
  },
];

export function ProductCallout({ className = "" }: ProductCalloutProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [timeStr, setTimeStr] = useState("MALANG // GMT+7");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTimeStr(`MLG, ID // ${formatted} WIB`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cycle = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % MODULES.length);
    }, 3200);
    return () => clearInterval(cycle);
  }, []);

  const current = MODULES[activeIdx];

  return (
    <motion.aside
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`z-25 flex flex-col items-end select-none pointer-events-auto ${className}`}
      aria-label="Kaiki System Telemetry"
    >
      {/* Interactive Telemetry Spec Box (Replacing old ski goggles) */}
      <div
        onClick={() => setActiveIdx((prev) => (prev + 1) % MODULES.length)}
        title="Click to cycle system module"
        className="relative w-44 sm:w-52 p-3 border border-black/25 bg-white/65 backdrop-blur-xl group cursor-pointer transition-all duration-300 hover:border-[#0066FF] shadow-[0_12px_32px_rgba(0,0,0,0.06)] rounded-sm"
      >
        {/* Storm Lab Top-Right Solid Square Tick */}
        <div
          className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#111112] group-hover:bg-[#0066FF] transition-colors"
          aria-hidden="true"
        />

        {/* Top Telemetry Bar: Real-time Malang Clock */}
        <div className="flex items-center justify-between border-b border-black/10 pb-1.5 mb-2">
          <span className="font-mono text-[9px] font-bold tracking-wider text-[#111112]/70">
            {timeStr}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-ping" />
        </div>

        {/* Cycling Tri-Pillar Module Display */}
        <div className="h-14 flex flex-col justify-between relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.code}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col"
            >
              <span
                className="font-mono text-[9px] font-black tracking-widest uppercase"
                style={{ color: current.accent }}
              >
                {current.code}
              </span>
              <span className="font-display text-xs sm:text-[13px] font-black text-[#111112] tracking-tight leading-tight mt-0.5">
                {current.title}
              </span>
              <span className="font-mono text-[10px] font-bold text-[#111112]/60 mt-1">
                {current.metric}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-1 mt-2 pt-1.5 border-t border-black/10">
          {MODULES.map((_, i) => (
            <span
              key={i}
              className={`h-1 transition-all duration-300 ${
                i === activeIdx ? "w-5 bg-[#0066FF]" : "w-1.5 bg-black/20"
              }`}
            />
          ))}
          <span className="ml-auto font-mono text-[8px] font-bold text-black/40 uppercase">
            CLICK TO SWITCH
          </span>
        </div>
      </div>

      {/* Barcode Graphic using Libre Barcode 128 */}
      <div
        className="w-44 sm:w-52 mt-2 font-barcode text-[#111112]/85 text-xl sm:text-2xl leading-none select-none tracking-widest text-right overflow-hidden"
        aria-hidden="true"
      >
        <div className="whitespace-nowrap">NEVERSTOPCREATING</div>
        <div className="flex justify-between font-mono text-[9px] tracking-wider font-bold text-[#111112]/70 mt-0.5">
          <span>KAIKI</span>
          <span>UM // MLG</span>
          <span>SYS.2026</span>
        </div>
      </div>
    </motion.aside>
  );
}
