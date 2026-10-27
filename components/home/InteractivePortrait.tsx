"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

const PORTRAIT_IMAGES = [
  "/assets/hero/kaiki-portrait-young.webp",
  "/assets/hero/kaiki-portrait-reach.webp?v=halfbody",
  "/assets/hero/kaiki-portrait-watch.webp?v=halfbody",
] as const;

interface BrushPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  age: number;
  maxAge: number;
}

interface InteractivePortraitProps {
  onHoverChange?: (hovered: boolean) => void;
  className?: string;
}

export function InteractivePortrait({ onHoverChange, className = "" }: InteractivePortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const xrayImgRef = useRef<HTMLImageElement | null>(null);
  const pointsRef = useRef<BrushPoint[]>([]);
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % PORTRAIT_IMAGES.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  useEffect(() => {
    const img = new window.Image();
    img.src = "/assets/hero/kaiki-xray.png";
    xrayImgRef.current = img;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d");

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      maskCanvas.width = rect.width;
      maskCanvas.height = rect.height;
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      animId = requestAnimationFrame(render);
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0 || !maskCtx) return;

      ctx.clearRect(0, 0, w, h);
      maskCtx.clearRect(0, 0, w, h);

      const pts = pointsRef.current;
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        p.age += 1;
        p.x += p.vx * 0.15;
        p.y += p.vy * 0.15;

        if (p.age >= p.maxAge) {
          pts.splice(i, 1);
          continue;
        }

        const lifeRatio = 1 - p.age / p.maxAge;
        const currentRadius = p.radius * (0.65 + 0.35 * Math.sin(lifeRatio * Math.PI));

        const grad = maskCtx.createRadialGradient(p.x, p.y, currentRadius * 0.2, p.x, p.y, currentRadius);
        grad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, lifeRatio * 1.4)})`);
        grad.addColorStop(0.7, `rgba(255, 255, 255, ${lifeRatio * 0.85})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        maskCtx.fillStyle = grad;
        maskCtx.beginPath();
        maskCtx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        maskCtx.fill();
      }

      if (pts.length > 0 && xrayImgRef.current && xrayImgRef.current.complete && xrayImgRef.current.naturalWidth > 0) {
        ctx.save();
        ctx.drawImage(maskCanvas, 0, 0);
        ctx.globalCompositeOperation = "source-in";

        const xImg = xrayImgRef.current;
        const imgAspect = xImg.naturalWidth / xImg.naturalHeight;
        const canvasAspect = w / h;
        let drawW = w;
        let drawH = h;
        let drawX = 0;
        let drawY = 0;

        if (imgAspect > canvasAspect) {
          drawH = h;
          drawW = h * imgAspect;
          drawX = (w - drawW) / 2;
        } else {
          drawW = w;
          drawH = w / imgAspect;
          drawY = h - drawH;
        }

        ctx.drawImage(xImg, drawX, drawY, drawW, drawH);
        ctx.restore();
      }
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const prev = lastMouseRef.current;
    const vx = prev ? x - prev.x : 0;
    const vy = prev ? y - prev.y : 0;
    const speed = Math.min(45, Math.hypot(vx, vy));
    lastMouseRef.current = { x, y };

    pointsRef.current.push({
      x,
      y,
      vx,
      vy,
      radius: 85 + speed * 1.4,
      age: 0,
      maxAge: 46,
    });

    if (speed > 4) {
      pointsRef.current.push({
        x: x - vx * 0.4 + (Math.random() - 0.5) * 35,
        y: y - vy * 0.4 + (Math.random() - 0.5) * 35,
        vx: vx * 0.2,
        vy: vy * 0.2,
        radius: 55 + Math.random() * 35,
        age: 0,
        maxAge: 38,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => {
        onHoverChange?.(false);
        lastMouseRef.current = null;
      }}
      className={`relative flex flex-col items-center justify-end select-none w-[175vw] sm:w-full max-w-none h-[92svh] sm:h-[95vh] lg:h-[98vh] max-h-[1080px] aspect-square mx-auto pointer-events-auto cursor-pointer ${className}`}
      aria-label="Mohammad Rifky Wicaksana (Kaiki) — Move cursor for X-Ray Blueprint, click to switch pose"
      role="button"
      tabIndex={0}
    >
      {/* Base Studio Portrait Layer (Scaled up on mobile so it fills the screen!) */}
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
            className="object-contain object-bottom scale-[1.18] sm:scale-100 origin-bottom"
            style={{
              opacity: currentIndex === index ? 1 : 0,
              transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: currentIndex === index ? 2 : 1,
            }}
          />
        ))}
      </div>

      {/* Liquid Brush X-Ray Blueprint Reveal Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none w-full h-full"
      />
    </div>
  );
}
