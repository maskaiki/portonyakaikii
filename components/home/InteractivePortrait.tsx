"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";

const PORTRAIT_IMAGES = [
  "/assets/hero/kaiki-portrait-young.webp",
  "/assets/hero/kaiki-portrait-reach.webp",
  "/assets/hero/kaiki-portrait-watch.webp",
] as const;

interface InteractivePortraitProps {
  onHoverChange?: (hovered: boolean) => void;
  className?: string;
}

export function InteractivePortrait({
  onHoverChange,
  className = "",
}: InteractivePortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [preloadOthers, setPreloadOthers] = useState(false);

  const handleClick = useCallback(() => {
    setPreloadOthers(true);
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % PORTRAIT_IMAGES.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const handleMouseEnter = () => {
    setPreloadOthers(true);
    onHoverChange?.(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onTouchStart={() => setPreloadOthers(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className={`relative flex flex-col items-center justify-end select-none w-[128vw] sm:w-full max-w-none h-[82svh] sm:h-[95vh] lg:h-[98vh] max-h-[1080px] aspect-square mx-auto pointer-events-auto cursor-pointer ${className}`}
      aria-label="Mohammad Rifky Wicaksana (Kaiki) — Click to switch pose"
      role="button"
      tabIndex={0}
    >
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        {PORTRAIT_IMAGES.map((src, index) => {
          if (index > 0 && !preloadOthers && currentIndex === 0) {
            return null;
          }
          const isFirst = index === 0;
          return (
            <Image
              key={src}
              src={src}
              alt={`Mohammad Rifky Wicaksana (Kaiki) — Pose ${index + 1}`}
              fill
              priority={isFirst}
              fetchPriority={isFirst ? "high" : "low"}
              decoding={isFirst ? "sync" : "async"}
              quality={70}
              sizes="(max-width: 640px) 240px, (max-width: 1024px) 480px, 720px"
              className="object-contain object-bottom scale-100 origin-bottom"
              style={
                preloadOthers
                  ? {
                      opacity: currentIndex === index ? 1 : 0,
                      transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      zIndex: currentIndex === index ? 2 : 1,
                    }
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
}
