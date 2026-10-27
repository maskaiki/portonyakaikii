"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";

interface HeroTitleProps {
  shiftX?: MotionValue<number>;
  titleRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export function HeroTitle({ shiftX, titleRef, className = "" }: HeroTitleProps) {
  const sharedPositionClass =
    "hero-title-stage absolute top-[31%] sm:top-[23%] left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-[47%] md:left-[49%] lg:left-[50%] z-20 pointer-events-none select-none flex flex-col items-center sm:items-start will-change-transform";

  const sharedTypographyStyle: React.CSSProperties = {
    fontSize: "clamp(56px, min(14.5vw, 13.5svh), 195px)",
  };

  return (
    <>
      {/* LAYER 1: DIFFERENCE BLEND MODE ON OUTER DIRECT CHILD OF HERO SECTION */}
      <motion.div
        ref={titleRef}
        style={{
          x: shiftX,
          mixBlendMode: "difference",
        }}
        className={`${sharedPositionClass} ${className}`}
        aria-hidden="true"
      >
        <h1
          className="font-manrope font-extrabold lowercase tracking-[-0.07em] leading-[0.78161] whitespace-nowrap text-white"
          style={sharedTypographyStyle}
        >
          {/* Line 1: 'nev' visible in difference mode, 'er' transparent */}
          <span className="block ml-[0.25em] sm:ml-[0.58em]">
            <span className="text-white">nev</span>
            <span className="opacity-0 select-none">er</span>
          </span>

          {/* Line 2: 'stop' visible in difference mode */}
          <span className="block">
            <span className="text-white">stop</span>
          </span>

          {/* Line 3: 'creat' visible in difference mode, 'ing' transparent */}
          <span className="block">
            <span className="text-white">creat</span>
            <span className="opacity-0 select-none">ing</span>
          </span>
        </h1>
      </motion.div>

      {/* LAYER 2: NORMAL BLEND MODE FOR SOLID CYAN-BLUE 'er' AND 'ing' */}
      <motion.div
        style={{
          x: shiftX,
          mixBlendMode: "normal",
        }}
        className={`${sharedPositionClass} ${className}`}
        aria-hidden="true"
      >
        <h1
          className="font-manrope font-extrabold lowercase tracking-[-0.07em] leading-[0.78161] whitespace-nowrap"
          style={sharedTypographyStyle}
        >
          {/* Line 1: 'nev' transparent, 'er' solid cyan-blue */}
          <span className="block ml-[0.25em] sm:ml-[0.58em]">
            <span className="opacity-0 select-none">nev</span>
            <span className="text-[#00b8ff]">er</span>
          </span>

          {/* Line 2: 'stop' transparent */}
          <span className="block">
            <span className="opacity-0 select-none">stop</span>
          </span>

          {/* Line 3: 'creat' transparent, 'ing' solid cyan-blue */}
          <span className="block">
            <span className="opacity-0 select-none">creat</span>
            <span className="text-[#00b8ff]">ing</span>
          </span>
        </h1>
      </motion.div>
    </>
  );
}
