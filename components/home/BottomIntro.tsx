"use client";

import { motion } from "framer-motion";

interface BottomIntroProps {
  className?: string;
}

export function BottomIntro({ className = "" }: BottomIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`z-25 flex flex-col items-start text-left select-none max-w-[360px] sm:max-w-[500px] lg:max-w-[620px] ${className}`}
    >
      {/* Role Umbrella Label */}
      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
        <span className="w-2 h-2 bg-[#00d2ff] shadow-[0_0_8px_rgba(0,210,255,0.8)]" />
        <span className="font-mono text-xs sm:text-[13px] font-black tracking-widest text-[#0066FF] uppercase">
          CREATIVE TECHNOLOGIST //
        </span>
      </div>

      {/* Enlarged Single Tagline (Code, Motion & Digital Experience) */}
      <h2
        className="font-display font-black tracking-tight leading-[0.94] uppercase text-[#111112]"
        style={{ fontSize: "clamp(34px, 4.4vw, 68px)" }}
      >
        CODE, MOTION &{" "}
        <span className="inline-block font-brier italic font-bold bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent px-1">
          EXPERIENCE
        </span>
        .
      </h2>

      {/* Subtitle Description */}
      <p className="mt-3 sm:mt-4 font-sans text-xs sm:text-[14px] text-[#111112]/80 font-medium leading-relaxed tracking-tight max-w-lg">
        Mohammad Rifky Wicaksana (Kaiki) — Informatics student & multidisciplinary creative fusing software engineering, video editing, and award-winning digital experiences.
      </p>

      {/* Action Buttons: ABOUT ME & EXPLORE WORK */}
      <div className="flex items-center gap-3 mt-4 pt-1">
        <a
          href="#about"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-[#111112] text-white font-manrope text-xs font-bold uppercase tracking-wider hover:bg-[#0066FF] transition-all duration-200 shadow-sm"
        >
          <span>About Me</span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </a>
        <a
          href="#work"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none border border-black/25 hover:border-black bg-white/50 hover:bg-white text-[#111112] font-manrope text-xs font-bold uppercase tracking-wider transition-all duration-200"
        >
          <span>Explore Work</span>
        </a>
      </div>
    </motion.div>
  );
}
