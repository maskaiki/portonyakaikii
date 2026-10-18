"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";

const PORTRAIT_IMAGES = [
  "/assets/hero/kaiki-portrait-young.webp",
  "/assets/hero/kaiki-portrait-reach.webp?v=halfbody",
  "/assets/hero/kaiki-portrait-watch.webp?v=halfbody",
] as const;

interface InteractivePortraitProps {
  onHoverChange?: (hovered: boolean) => void;
  className?: string;
}

export function InteractivePortrait({ onHoverChange, className = "" }: InteractivePortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % PORTRAIT_IMAGES.length);
    // Allow transition to complete before next click
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={() => {
        onHoverChange?.(true);
      }}
      onMouseLeave={() => {
        onHoverChange?.(false);
      }}
      className={`relative flex flex-col items-center justify-end select-none w-full max-w-[100vw] sm:max-w-none h-[72vh] sm:h-[94vh] lg:h-[97vh] xl:h-[98vh] max-h-[1020px] aspect-auto sm:aspect-square mx-auto pointer-events-auto cursor-pointer ${className}`}
      aria-label="Mohammad Rifky Wicaksana (Kaiki) — Click to change pose"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        {PORTRAIT_IMAGES.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Mohammad Rifky Wicaksana (Kaiki) — Pose ${index + 1}`}
            fill
            priority={index === 0}
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 1020px"
            className="object-contain object-bottom"
            style={{
              opacity: currentIndex === index ? 1 : 0,
              transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: currentIndex === index ? 2 : 1,
            }}
          />
        ))}
      </div>

      {/* Subtle click hint indicator */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 opacity-0 hover:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#111112]/40 font-mono">
          click to switch
        </span>
      </div>
    </div>
  );
}
