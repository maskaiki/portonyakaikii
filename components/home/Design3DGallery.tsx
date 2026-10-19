"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export interface DesignWorkItem {
  id: number;
  title: string;
  tool: string;
  year: string;
  image: string;
}

const TEN_DESIGNS: DesignWorkItem[] = [
  { id: 1, title: "Poster Tahun Baru Islam 1448 H", tool: "Canva / PS", year: "2026", image: "" },
  { id: 2, title: "Dokumentasi Pelantikan ASC UM", tool: "Canva Pro", year: "2026", image: "" },
  { id: 3, title: "Graphic Design Artwork #03", tool: "Canva", year: "2025", image: "" },
  { id: 4, title: "Social Media Feed Design #04", tool: "Canva", year: "2025", image: "" },
  { id: 5, title: "Event Poster & Key Visual #05", tool: "Graphic Design", year: "2025", image: "" },
  { id: 6, title: "Typography Poster Series #06", tool: "Visual Art", year: "2025", image: "" },
  { id: 7, title: "Instagram Carousel Layout #07", tool: "Canva", year: "2025", image: "" },
  { id: 8, title: "Digital Campaign Poster #08", tool: "Graphic Design", year: "2025", image: "" },
  { id: 9, title: "Visual Presentation Deck #09", tool: "Canva", year: "2026", image: "" },
  { id: 10, title: "Experimental Visual Poster #10", tool: "Visual Art", year: "2026", image: "" },
];

export function Design3DGallery() {
  const ringRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ y: 0 });
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const autoTweenRef = useRef<gsap.core.Tween | null>(null);
  const [selectedItem, setSelectedItem] = useState<DesignWorkItem | null>(null);

  const count = TEN_DESIGNS.length;
  const angleStep = 360 / count; // 36deg per card for 10 cards
  const radius = 440; // 3D cylinder radius in px

  // Initialize GSAP continuous 3D rotation
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const startAutoSpin = () => {
      autoTweenRef.current?.kill();
      autoTweenRef.current = gsap.to(rotationRef.current, {
        y: "-=360",
        duration: 38,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          if (ringRef.current) {
            gsap.set(ringRef.current, { rotateY: rotationRef.current.y });
          }
        },
      });
    };

    startAutoSpin();
    return () => {
      autoTweenRef.current?.kill();
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    autoTweenRef.current?.pause();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !ringRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    startXRef.current = e.clientX;
    rotationRef.current.y += deltaX * 0.35;

    gsap.to(ringRef.current, {
      rotateY: rotationRef.current.y,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    autoTweenRef.current?.play();
  };

  const rotateByStep = (dir: number) => {
    autoTweenRef.current?.pause();
    rotationRef.current.y += dir * angleStep;
    gsap.to(ringRef.current, {
      rotateY: rotationRef.current.y,
      duration: 0.7,
      ease: "expo.out",
      onComplete: () => {
        autoTweenRef.current?.play();
      },
    });
  };

  return (
    <div className="w-full select-none">
      {/* Header & GSAP Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-3 border-b border-white/10">
        <div>
          <span className="font-mono text-xs font-bold tracking-widest text-[#00FF88] uppercase block">
            [02] 10 GRAPHIC DESIGN WORKS (GSAP + REACT BITS 3D CYLINDER)
          </span>
          <p className="font-sans text-xs text-[#8A8A7A] mt-1">
            Drag left/right to spin the 3D cylinder or click any card to inspect.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => rotateByStep(1)}
            className="px-4 py-2 rounded-full bg-[#141414] border border-white/15 hover:border-[#00d2ff] text-xs font-mono font-bold text-[#EFEFE5] hover:text-[#00d2ff] transition-colors cursor-pointer"
          >
            ← SPIN LEFT
          </button>
          <button
            onClick={() => rotateByStep(-1)}
            className="px-4 py-2 rounded-full bg-[#141414] border border-white/15 hover:border-[#00d2ff] text-xs font-mono font-bold text-[#EFEFE5] hover:text-[#00d2ff] transition-colors cursor-pointer"
          >
            SPIN RIGHT →
          </button>
        </div>
      </div>

      {/* React Bits Style 3D Rolling Cylinder Stage */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full h-[440px] sm:h-[500px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ perspective: "1400px" }}
      >
        <div
          ref={ringRef}
          className="relative w-[220px] sm:w-[250px] h-[300px] sm:h-[340px]"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(-4deg)",
          }}
        >
          {TEN_DESIGNS.map((item, i) => {
            const angle = i * angleStep;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                }}
                className="absolute inset-0 rounded-2xl p-4 bg-[#14141a]/95 border border-white/15 hover:border-[#00d2ff] shadow-[0_16px_40px_rgba(0,0,0,0.65)] hover:shadow-[0_0_35px_rgba(0,210,255,0.35)] flex flex-col justify-between transition-colors group"
              >
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-[#00FF88] font-bold">
                    DES // {String(item.id).padStart(2, "0")}
                  </span>
                  <span className="text-[#8A8A7A]">{item.year}</span>
                </div>

                <div className="relative w-full flex-1 my-2.5 rounded-xl overflow-hidden bg-[#0c0c10] border border-dashed border-white/10 flex flex-col items-center justify-center p-3 text-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  ) : (
                    <>
                      <span className="font-display text-3xl font-black text-white/15 group-hover:text-[#00d2ff]/40 transition-colors">
                        #{String(item.id).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-[9px] text-[#00d2ff] uppercase tracking-widest mt-1">
                        3D SLOT {String(item.id).padStart(2, "0")}
                      </span>
                    </>
                  )}
                </div>

                <div>
                  <span className="font-mono text-[9px] text-[#8A8A7A] uppercase tracking-wider block">
                    {item.tool}
                  </span>
                  <h4 className="font-display text-xs sm:text-sm font-black uppercase text-[#EFEFE5] group-hover:text-[#00d2ff] truncate transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Preview Modal when a 3D card is clicked */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-[#121216] border border-[#00d2ff] p-6 space-y-4"
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#00FF88]">
                DES // {String(selectedItem.id).padStart(2, "0")}
              </span>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-white/60 hover:text-white cursor-pointer"
              >
                ✕ CLOSE
              </button>
            </div>
            <div className="aspect-[4/5] w-full rounded-xl bg-[#0c0c10] border border-white/10 flex items-center justify-center overflow-hidden">
              {selectedItem.image ? (
                <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
              ) : (
                <span className="font-mono text-xs text-[#8A8A7A]">
                  Preview Slot #{String(selectedItem.id).padStart(2, "0")}
                </span>
              )}
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#00d2ff] uppercase">
                {selectedItem.tool} • {selectedItem.year}
              </span>
              <h3 className="font-display text-xl font-black uppercase text-white mt-1">
                {selectedItem.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
