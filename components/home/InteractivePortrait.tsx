"use client";

import React, { useRef } from "react";
import Image from "next/image";

interface InteractivePortraitProps {
  onHoverChange?: (hovered: boolean) => void;
  className?: string;
}

export function InteractivePortrait({ onHoverChange, className = "" }: InteractivePortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        onHoverChange?.(true);
      }}
      onMouseLeave={() => {
        onHoverChange?.(false);
      }}
      className={`relative flex flex-col items-center justify-end select-none h-[88vh] sm:h-[92vh] lg:h-[96vh] xl:h-[98vh] max-h-[1020px] aspect-[720/960] mx-auto pointer-events-auto ${className}`}
      aria-label="Mohammad Rifky Wicaksana (Kaiki) — Digital Creative"
    >
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        <Image
          src="/assets/hero/kaiki-portrait-young.webp"
          alt="Mohammad Rifky Wicaksana (Kaiki) — Digital Creative"
          fill
          priority
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 1020px"
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}
