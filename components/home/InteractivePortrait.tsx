"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const PORTRAIT_IMAGES = [
  "/assets/hero/kaiki-portrait-young.webp",
  "/assets/hero/kaiki-portrait-reach.webp?v=halfbody",
  "/assets/hero/kaiki-portrait-watch.webp?v=halfbody",
] as const;

interface InteractivePortraitProps {
  onHoverChange?: (hovered: boolean) => void;
  className?: string;
}

// Giant 3D Translucent Blue Glass SVG Cursor (Exact match to 3D glass pointer reference!)
function Glass3DCursorSVG({ isPressed }: { isPressed: boolean }) {
  return (
    <motion.div
      animate={{
        scale: isPressed ? 0.82 : 1,
        rotate: isPressed ? -6 : 0,
      }}
      transition={{ type: "spring", stiffness: 520, damping: 22 }}
      className="relative flex items-center justify-center filter drop-shadow-[0_18px_28px_rgba(2,132,199,0.42)]"
    >
      {/* Expanding Click Ripple Rings */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            key="ripple"
            initial={{ scale: 0.3, opacity: 0.95 }}
            animate={{ scale: 2.3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute -top-2 -left-2 w-14 h-14 rounded-full border-[3px] border-[#38bdf8] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <svg
        width="88"
        height="88"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* 3D Extruded Side-Wall Depth Gradient */}
          <linearGradient id="glassExtrudeGrad" x1="20" y1="15" x2="95" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="45%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>

          {/* Translucent Ice-Blue Glass Core Gradient */}
          <linearGradient id="glassBodyGrad" x1="18" y1="14" x2="82" y2="92" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.92" />
            <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.88" />
          </linearGradient>

          {/* Outer Beveled Rim Gradient */}
          <linearGradient id="glassRimGrad" x1="14" y1="10" x2="90" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#38bdf8" />
            <stop offset="75%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#bae6fd" />
          </linearGradient>

          {/* Glossy Diagonal Specular Reflection */}
          <linearGradient id="glassGlossGrad" x1="20" y1="16" x2="62" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#e0f2fe" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* LAYER 1: 3D Extruded Depth Side-Wall (Shifted +9px X, +8px Y for thick 3D block depth) */}
        <path
          d="M31 20 C27 16 32 11 37 13 L99 40 C105 43 104 51 98 53 L69 62 L83 92 C85 97 82 103 76 105 L64 109 C58 111 53 108 50 103 L37 73 L22 90 C17 95 10 91 11 84 L31 20 Z"
          fill="url(#glassExtrudeGrad)"
          stroke="#082f49"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* 3D Bevel Connector Facet Lines (Gives realistic crystal refraction blocks) */}
        <path
          d="M90 36 L99 44 M60 56 L69 62 M74 88 L83 95 M54 101 L63 109"
          stroke="#bae6fd"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* LAYER 2: Main Front 3D Glass Pointer Body */}
        <path
          d="M22 12 C18 8 23 3 28 5 L90 32 C96 35 95 43 89 45 L60 54 L74 84 C76 89 73 95 67 97 L55 101 C49 103 44 100 41 95 L28 65 L13 82 C8 87 1 83 2 76 L22 12 Z"
          fill="url(#glassBodyGrad)"
          stroke="url(#glassRimGrad)"
          strokeWidth="5.5"
          strokeLinejoin="round"
        />

        {/* LAYER 3: Inner Refracted Glass Channel */}
        <path
          d="M26 17 L83 41 L55 50 L68 82 L56 86 L43 54 L17 73 L26 17 Z"
          fill="none"
          stroke="#0284c7"
          strokeWidth="2.2"
          strokeLinejoin="round"
          opacity="0.65"
        />

        {/* LAYER 4: Diagonal Glossy Specular Glass Sheen Across Upper Blade */}
        <path
          d="M26 15 L81 39 L53 48 L36 62 L15 72 L26 15 Z"
          fill="url(#glassGlossGrad)"
        />

        {/* LAYER 5: Crisp White Specular Rim Highlight on Top-Left Edge */}
        <path
          d="M16 68 L25 14 L78 37"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
      </svg>

      {/* Floating Glass Pill Badge Next to Cursor */}
      <div className="absolute left-[72px] top-[52px] px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#38bdf8] shadow-[0_8px_20px_rgba(2,132,199,0.28)] whitespace-nowrap pointer-events-none">
        <span className="font-display text-[10px] font-black uppercase tracking-wider text-[#0369a1]">
          Click Pose
        </span>
      </div>
    </motion.div>
  );
}

export function InteractivePortrait({ onHoverChange, className = "" }: InteractivePortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Smooth spring cursor coordinates relative to the portrait box
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 320, damping: 28 });
  const smoothY = useSpring(cursorY, { stiffness: 320, damping: 28 });

  const handleClick = useCallback(() => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 320);

    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % PORTRAIT_IMAGES.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  // Autonomous Demo Animation when not hovered ( Gently glides & clicks Kaiki's portrait to invite user interaction! )
  useEffect(() => {
    if (isHovered) return;

    let frameId: number;
    let startTime = performance.now();

    const animateIdleCursor = (now: number) => {
      frameId = requestAnimationFrame(animateIdleCursor);
      const elapsed = (now - startTime) / 1000;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width * 0.54;
      const centerY = rect.height * 0.58;

      // Gentle figure-8 hover trajectory over Kaiki's chest/shoulder
      const offsetX = Math.sin(elapsed * 1.6) * 42;
      const offsetY = Math.cos(elapsed * 3.2) * 22;

      cursorX.set(centerX + offsetX);
      cursorY.set(centerY + offsetY);
    };

    // Periodic simulated click pulse every 2.8 seconds while idle
    const clickInterval = setInterval(() => {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 340);
    }, 2800);

    frameId = requestAnimationFrame(animateIdleCursor);
    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(clickInterval);
    };
  }, [isHovered, cursorX, cursorY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverChange?.(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverChange?.(false);
      }}
      className={`relative flex flex-col items-center justify-end select-none w-[128vw] sm:w-full max-w-none h-[82svh] sm:h-[95vh] lg:h-[98vh] max-h-[1080px] aspect-square mx-auto pointer-events-auto cursor-none ${className}`}
      aria-label="Mohammad Rifky Wicaksana (Kaiki) — Click to switch pose"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Portrait Pose Stack */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        {PORTRAIT_IMAGES.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Mohammad Rifky Wicaksana (Kaiki) — Pose ${index + 1}`}
            fill
            priority={index === 0}
            unoptimized
            sizes="100vw"
            className="object-contain object-bottom scale-100 origin-bottom"
            style={{
              opacity: currentIndex === index ? 1 : 0,
              transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: currentIndex === index ? 2 : 1,
            }}
          />
        ))}
      </div>

      {/* Giant 3D Blue Glass Animated SVG Cursor Layer */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          top: 0,
          left: 0,
        }}
        className="absolute z-30 pointer-events-none -translate-x-4 -translate-y-3 will-change-transform"
      >
        <Glass3DCursorSVG isPressed={isPressed} />
      </motion.div>
    </div>
  );
}
