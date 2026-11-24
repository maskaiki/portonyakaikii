"use client";

import React, { useEffect, useRef } from "react";
import { startGhostBuddy } from "@/lib/ghostBuddyEngine";

export function HeroGhostBuddy({
  className = "z-[5]",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    return startGhostBuddy(canvasRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      aria-label="Interactive Glass Ghost Buddy that tracks your cursor, smiles on hover, and squishes on click"
    />
  );
}
