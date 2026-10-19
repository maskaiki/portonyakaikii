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
      className={`z-25 flex flex-col items-start text-left select-none max-w-[calc(100vw-32px)] sm:max-w-[500px] lg:max-w-[620px] ${className}`}
    >
      {/* Clean Editorial Role Label (No glowing box, no //) */}
      <span className="font-display text-[11px] sm:text-xs font-extrabold tracking-[0.2em] text-[#111112]/60 uppercase mb-1.5 sm:mb-2">
        Visual Front-End Creator
      </span>

      {/* Main Tagline */}
      <h2
        className="font-display font-black tracking-tight leading-[0.94] uppercase text-[#111112]"
        style={{ fontSize: "clamp(26px, 4.4vw, 64px)" }}
      >
        I MAKE FRONT-END{" "}
        <span className="inline-block font-brier italic font-normal text-[#0055FF] px-1">
          for people.
        </span>
      </h2>

      {/* Subtitle Description */}
      <p className="mt-2 sm:mt-3.5 font-sans text-xs sm:text-[14px] text-[#111112]/75 font-medium leading-relaxed max-w-lg line-clamp-2 sm:line-clamp-none">
        Mohammad Rifky Wicaksana (Kaiki) — helping people craft standout personal portfolio websites, visual graphics, and video edits.
      </p>

      {/* Action Buttons: ABOUT ME & CONTACT */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-4">
        <a
          href="#about"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-[#111112] text-[#f4f4ed] font-display text-xs font-extrabold uppercase tracking-wider hover:bg-[#0055FF] transition-colors duration-200"
        >
          <span>About Me</span>
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none border border-[#111112]/30 hover:border-[#111112] bg-white/60 hover:bg-white text-[#111112] font-display text-xs font-extrabold uppercase tracking-wider transition-colors duration-200"
        >
          <span>Contact</span>
        </a>
      </div>
    </motion.div>
  );
}
