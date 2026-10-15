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
      className={`z-25 flex flex-col items-start text-left select-none max-w-[340px] sm:max-w-[440px] lg:max-w-[500px] ${className}`}
    >
      {/* Kaiki's Original Signature Kinetic Headline */}
      <h2
        className="font-display font-black tracking-tight leading-[1.08] uppercase text-[#111112] dark:text-[#efefe5]"
        style={{ fontSize: "clamp(26px, 2.9vw, 50px)" }}
      >
        BUILDING{" "}
        <span className="inline-block font-brier italic font-bold bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent px-1">
          SYSTEMS
        </span>
        .
        <br />
        EXPLORING{" "}
        <span className="inline-block font-brier italic font-bold bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent px-1">
          IDEAS
        </span>
        .
        <br />
        TELLING{" "}
        <span className="inline-block font-brier italic font-bold bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent px-1">
          STORIES
        </span>
        .
      </h2>

      {/* Subtitle Description */}
      <p className="mt-3 sm:mt-4 font-sans text-xs sm:text-[13px] text-[#111112]/75 dark:text-[#efefe5]/75 leading-relaxed tracking-tight max-w-md">
        Mohammad Rifky Wicaksana (Kaiki) — Informatics student & creative technologist bridging high-performance computer science systems, brand identities, and kinetic storytelling.
      </p>

      {/* Quick Action Badges */}
      <div className="flex items-center gap-2 mt-4 pt-1">
        <a
          href="#work"
          className="px-3.5 py-1.5 rounded-md bg-[#111112] text-white font-manrope text-[10px] sm:text-[11px] font-bold uppercase tracking-wider hover:bg-[#00d2ff] hover:text-black transition-colors shadow-sm"
        >
          View Archive
        </a>
        <a
          href="#about"
          className="px-3.5 py-1.5 rounded-md border border-black/15 dark:border-white/15 text-[#111112] dark:text-[#efefe5] font-manrope text-[10px] sm:text-[11px] font-bold uppercase tracking-wider hover:border-[#00d2ff] hover:text-[#00d2ff] transition-colors"
        >
          Curriculum
        </a>
      </div>
    </motion.div>
  );
}
