"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";

const PORTRAIT_IMAGES = [
  {
    src: "/assets/hero/kaiki-portrait-young.webp",
    label: "POSE 01 // FOCUS",
    tag: "Studio",
  },
  {
    src: "/assets/hero/kaiki-portrait-reach.webp",
    label: "POSE 02 // REACH",
    tag: "Dynamic",
  },
  {
    src: "/assets/hero/kaiki-portrait-watch.webp",
    label: "POSE 03 // WATCH",
    tag: "Perspective",
  },
  {
    src: "/assets/hero/kaiki-portrait-hood.webp",
    label: "POSE 04 // HOOD",
    tag: "Stealth",
  },
  {
    src: "/assets/hero/kaiki-portrait-pose.webp",
    label: "POSE 05 // ACTION",
    tag: "Editorial",
  },
] as const;

// 8-bit Pixel Hand Vector Component (Crisp SVG)
function PixelHandIcon({ isClicking }: { isClicking: boolean }) {
  const rows = [
    "       11                       ",
    "      12211                     ",
    "      123221                    ",
    "      123221                    ",
    "      123221                    ",
    "      123221                    ",
    "      123221    11              ",
    "      123221   12211            ",
    "      123221  1232221   11      ",
    "  11  123221  1232221  12211    ",
    " 12211123221 12322221 123221   ",
    " 12322123221 12322221 123221 11",
    " 1232222322111232222111232211221",
    "  123222322222232222222232222321",
    "  123222222222222222222222222221",
    "   1232222222222222222222222221 ",
    "   1232222222222222222222222221 ",
    "    12322222222222222222222221  ",
    "    12222222222222222222222221  ",
    "     112222222222222222222221   ",
    "      1112222222222222222221    ",
    "        1122222222222222221     ",
    "         11111111111111111      ",
  ];

  const palette: Record<string, string> = {
    "1": "#000000",
    "2": "#FFFFFF",
    "3": "#00E5FF",
    "4": "#0891B2",
  };

  return (
    <svg
      viewBox="0 0 32 23"
      className={`w-16 h-12 sm:w-20 sm:h-14 drop-shadow-[0_4px_12px_rgba(0,229,255,0.7)] transition-transform duration-100 ${
        isClicking ? "scale-90 translate-y-1.5" : ""
      }`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <g>
        {rows.map((row, y) =>
          row.split("").map((ch, x) => {
            const fill = palette[ch];
            if (!fill) return null;
            return (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width={1}
                height={1}
                fill={fill}
              />
            );
          })
        )}
      </g>
    </svg>
  );
}

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
  const [isClicking, setIsClicking] = useState(false);
  const [isShuttering, setIsShuttering] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const triggerNextPose = useCallback(
    (e?: React.MouseEvent) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setIsClicking(true);
      setIsShuttering(true);
      setHasInteracted(true);

      // Add ripple at click coordinates or center
      const rect = containerRef.current?.getBoundingClientRect();
      const clickX = e && rect ? e.clientX - rect.left : (rect?.width || 300) / 2;
      const clickY = e && rect ? e.clientY - rect.top : (rect?.height || 500) / 2;
      const rippleId = Date.now();
      setRipples((prev) => [...prev.slice(-3), { id: rippleId, x: clickX, y: clickY }]);

      setCurrentIndex((prev) => (prev + 1) % PORTRAIT_IMAGES.length);

      setTimeout(() => setIsClicking(false), 150);
      setTimeout(() => setIsShuttering(false), 220);
      setTimeout(() => {
        setIsTransitioning(false);
        setRipples((prev) => prev.filter((r) => r.id !== rippleId));
      }, 600);
    },
    [isTransitioning]
  );

  return (
    <div
      ref={containerRef}
      onClick={triggerNextPose}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerNextPose();
        }
      }}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className={`group relative flex flex-col items-center justify-end select-none w-[128vw] sm:w-full max-w-none h-[82svh] sm:h-[95vh] lg:h-[98vh] max-h-[1080px] aspect-square mx-auto pointer-events-auto cursor-pixel ${className}`}
      aria-label={`Mohammad Rifky Wicaksana (Kaiki) — ${PORTRAIT_IMAGES[currentIndex].label}. Click to switch pose (${currentIndex + 1} of ${PORTRAIT_IMAGES.length})`}
      role="button"
      tabIndex={0}
    >
      {/* 1. Main Portrait Stage with Smooth Crossfade */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-visible">
        {PORTRAIT_IMAGES.map((item, index) => (
          <Image
            key={item.src}
            src={item.src}
            alt={`Mohammad Rifky Wicaksana (Kaiki) — ${item.label}`}
            fill
            priority={index === 0 || index === 1}
            unoptimized
            sizes="100vw"
            className={`object-contain object-bottom scale-100 origin-bottom transition-all duration-500 ease-out ${
              isShuttering && currentIndex === index ? "brightness-125 contrast-105" : ""
            }`}
            style={{
              opacity: currentIndex === index ? 1 : 0,
              zIndex: currentIndex === index ? 2 : 1,
            }}
          />
        ))}

        {/* Shutter flash ambient feedback */}
        <div
          className={`absolute inset-0 bg-white/20 transition-opacity duration-200 pointer-events-none z-10 ${
            isShuttering ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* 2. Expanding Click Shockwaves */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none z-30 rounded-full border-2 border-[#00E5FF] shadow-[0_0_15px_#00E5FF] animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "50px",
            height: "50px",
            marginLeft: "-25px",
            marginTop: "-25px",
          }}
        />
      ))}

      {/* 3. Central Animated Pixel Cursor Hand & Callout Prompt */}
      <div
        className="absolute top-[48%] sm:top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-none transition-all duration-300 group-hover:scale-105"
      >
        {/* Animated Pixel Hand Pointer */}
        <div className="relative flex flex-col items-center animate-[pixelTap_1.8s_ease-in-out_infinite]">
          {/* Neon Tap Radar expanding from the fingertip */}
          <span className="absolute -top-3 left-4 sm:left-5 w-7 h-7 rounded-full border-2 border-[#00E5FF] shadow-[0_0_12px_#00E5FF] animate-ping opacity-75" />
          <span className="absolute -top-1 left-6 w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />

          {/* Large Pixel Hand Vector */}
          <PixelHandIcon isClicking={isClicking} />
        </div>

        {/* Cyberpunk HUD Action Pill */}
        <div className="mt-2.5 flex flex-col items-center px-3.5 py-1.5 rounded-full bg-[#050B14]/85 border border-[#00E5FF]/60 backdrop-blur-md shadow-[0_4px_20px_rgba(0,229,255,0.35)] transition-all duration-200 group-hover:border-[#00E5FF] group-hover:shadow-[0_4px_28px_rgba(0,229,255,0.6)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
            <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-wider uppercase text-white">
              {hasInteracted ? "KLIK UNTUK GANTI POSE" : "PENCET KARAKTER DI SINI"}
            </span>
          </div>

          {/* Segmented Pose Indicator [ █ ░ ░ ░ ░ ] */}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[9px] font-mono text-[#00E5FF] font-semibold tracking-wider">
              POSE 0{currentIndex + 1} / 05
            </span>
            <div className="flex items-center gap-1 ml-1">
              {PORTRAIT_IMAGES.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-4 bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]"
                      : "w-1.5 bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
