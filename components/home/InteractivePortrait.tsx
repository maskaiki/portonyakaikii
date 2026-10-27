"use client";

import React, { useState, useCallback } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % PORTRAIT_IMAGES.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className={`relative flex flex-col items-center justify-end select-none w-[128vw] sm:w-full max-w-none h-[82svh] sm:h-[95vh] lg:h-[98vh] max-h-[1080px] aspect-square mx-auto pointer-events-auto cursor-pointer ${className}`}
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
      {/* Base Studio Portrait Layer */}
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
    </div>
  );
}
