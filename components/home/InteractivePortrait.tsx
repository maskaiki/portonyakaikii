"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface InteractivePortraitProps {
  onHoverChange?: (hovered: boolean) => void;
  className?: string;
}

export function InteractivePortrait({ onHoverChange, className = "" }: InteractivePortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized cursor coordinates [0 to 1]
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // High-performance springs for fluid 60fps kinetic physics (zero stutter)
  const springConfig = { damping: 26, stiffness: 140, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D perspective rotation matching Storm Lab subtle tilt
  const rotateX = useTransform(smoothMouseY, [0, 1], [3.2, -3.2]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-4.2, 4.2]);

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

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col items-center justify-end select-none h-[86vh] sm:h-[90vh] lg:h-[95vh] xl:h-[97vh] max-h-[960px] xl:max-h-[1040px] aspect-[720/960] mx-auto cursor-pointer ${className}`}
    >
      {/* Real Portrait: Young Man Studio Portrait (Kaiki) - 100% Clean Transparent Background */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        <Image
          src="/assets/hero/kaiki-portrait-young.webp"
          alt="Mohammad Rifky Wicaksana (Kaiki)"
          fill
          priority
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}
