"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

interface InteractivePortraitProps {
  onHoverChange?: (hovered: boolean) => void;
  className?: string;
}

const PORTRAITS = [
  {
    src: "/assets/hero/kaiki-portrait-young.webp",
    alt: "Mohammad Rifky Wicaksana (Kaiki) — Studio Clean",
    label: "LOOK 01 // STUDIO",
  },
  {
    src: "/assets/hero/kaiki-portrait-hood.webp",
    alt: "Mohammad Rifky Wicaksana (Kaiki) — Technical Editorial",
    label: "LOOK 02 // TECHNICAL",
  },
];

export function InteractivePortrait({ onHoverChange, className = "" }: InteractivePortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [portraitIdx, setPortraitIdx] = useState(0);

  // Normalized cursor coordinates [0 to 1]
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 26, stiffness: 140, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    mouseX.set(x);
    mouseY.set(y);
    if (!isHovered) {
      setIsHovered(true);
      onHoverChange?.(true);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const togglePortrait = () => {
    setPortraitIdx((prev) => (prev + 1) % PORTRAITS.length);
  };

  return (
    <div
      ref={containerRef}
      onClick={togglePortrait}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col items-center justify-end select-none h-[86vh] sm:h-[90vh] lg:h-[95vh] xl:h-[97vh] max-h-[960px] xl:max-h-[1040px] aspect-[720/960] mx-auto cursor-pointer group ${className}`}
      title="Click to toggle look"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          togglePortrait();
        }
      }}
      aria-label="Toggle Kaiki portrait look"
    >
      {/* Floating Mode Badge on Hover */}
      <div className="absolute top-[20%] left-2 sm:-left-8 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="px-2.5 py-1 bg-white/70 backdrop-blur-md border border-white/85 font-mono text-[10px] font-bold text-[#111112] shadow-sm uppercase tracking-wider">
          {PORTRAITS[portraitIdx].label} ↻
        </span>
      </div>

      {/* Real Portrait with Fluid Crossfade */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={portraitIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={PORTRAITS[portraitIdx].src}
              alt={PORTRAITS[portraitIdx].alt}
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
              className="object-contain object-bottom"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
