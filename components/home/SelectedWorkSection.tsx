"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PptSnakeShowcase } from "./PptSnakeShowcase";
import { VisualFlyAndDomeShowcase } from "./VisualFlyAndDomeShowcase";

const WEB_PROJECTS = [
  {
    id: "web-01",
    num: "01",
    title: "Personal Portfolio Website",
    description:
      "Interactive single-scroll portfolio website built with kinetic typography, real-time canvas physics, and responsive front-end architecture.",
    previewImage: "",
    liveUrl: "https://www.heyitskaikii.my.id",
    tags: ["Next.js", "Tailwind CSS", "GSAP"],
  },
  {
    id: "web-02",
    num: "02",
    title: "Web Project Showcase Two",
    description:
      "Clean, modern front-end web build designed for personal branding and digital portfolio presentation.",
    previewImage: "",
    liveUrl: "#",
    tags: ["Front-End", "Responsive UI", "Web Design"],
  },
  {
    id: "web-03",
    num: "03",
    title: "Web Project Showcase Three",
    description:
      "Lightweight interactive landing page crafted with smooth transitions and mobile-first layout structure.",
    previewImage: "",
    liveUrl: "#",
    tags: ["React", "TypeScript", "Interactive"],
  },
];

const GRAPHIC_DESIGNS = [
  { id: 1, title: "Poster Tahun Baru Islam 1448 H", category: "Poster Design", year: "2026", image: "" },
  { id: 2, title: "Dokumentasi Pelantikan ASC UM", category: "Event Visual", year: "2026", image: "" },
  { id: 3, title: "Visual Poster Exploration III", category: "Graphic Design", year: "2025", image: "" },
  { id: 4, title: "Social Media Feed Layout IV", category: "Social Media", year: "2025", image: "" },
  { id: 5, title: "Event Key Visual & Banner V", category: "Brand Collateral", year: "2025", image: "" },
  { id: 6, title: "Typography Poster Series VI", category: "Editorial Print", year: "2025", image: "" },
  { id: 7, title: "Creative Carousel Story VII", category: "Social Media", year: "2025", image: "" },
  { id: 8, title: "Digital Campaign Artwork VIII", category: "Graphic Design", year: "2025", image: "" },
  { id: 9, title: "Visual Presentation Deck IX", category: "Editorial Layout", year: "2026", image: "" },
  { id: 10, title: "Experimental Visual Poster X", category: "Visual Art", year: "2026", image: "" },
];

function Web3DCard({ web }: { web: (typeof WEB_PROJECTS)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: px * 16,
      rotateX: -py * 16,
      y: -8,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const onLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d" }}
      className="group flex flex-col justify-between p-7 sm:p-8 bg-[#18181a] border border-white/15 hover:border-[#f4f4ed] transition-colors will-change-transform"
    >
      <div style={{ transform: "translateZ(28px)" }}>
        <div className="relative w-full aspect-[16/10] overflow-hidden mb-6 bg-[#111112] border border-white/10 flex flex-col items-center justify-center p-4 text-center">
          {web.previewImage ? (
            <img src={web.previewImage} alt={web.title} className="w-full h-full object-cover" />
          ) : (
            <>
              <span className="font-brier italic text-4xl text-[#f4f4ed]/25 mb-1">
                {web.num}
              </span>
              <span className="font-display text-[10px] font-bold tracking-[0.18em] text-[#f4f4ed]/40 uppercase">
                Preview Slot Ready
              </span>
            </>
          )}
        </div>

        <h4 className="font-display text-2xl font-black uppercase text-[#f4f4ed] mb-2">
          {web.title}
        </h4>
        <p className="font-sans text-sm text-[#f4f4ed]/65 leading-relaxed mb-6">
          {web.description}
        </p>
      </div>

      <div
        style={{ transform: "translateZ(20px)" }}
        className="pt-4 border-t border-white/10 flex items-center justify-between gap-2"
      >
        <div className="flex flex-wrap gap-2">
          {web.tags.map((t) => (
            <span
              key={t}
              className="font-display text-[10px] font-bold uppercase tracking-wider text-[#f4f4ed]/50"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={web.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-display text-xs font-extrabold !text-[#f4f4ed] hover:!text-[#0055FF] uppercase tracking-wider shrink-0 transition-colors"
        >
          <span>Visit Web</span>
          <span>↗</span>
        </a>
      </div>
    </div>
  );
}

export function SelectedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const videoStageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Deterministic rotation state (Never snaps back to old position!)
  const rotationRef = useRef({ y: 0 });
  const targetYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const startXRef = useRef(0);

  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const count = GRAPHIC_DESIGNS.length;
  const angleStep = 360 / count; // 36deg per card
  const radius = 560; // Wide cylinder radius so cards spread nicely without clipping

  // Helper to animate cylinder to any target angle and update active card index
  const animateCylinderTo = useCallback(
    (newTargetY: number, duration = 0.75) => {
      targetYRef.current = newTargetY;
      // Calculate which card index (0..9) is currently facing the front
      const normalizedStep = Math.round(-newTargetY / angleStep);
      const wrappedIndex = ((normalizedStep % count) + count) % count;
      setActiveIdx(wrappedIndex);

      gsap.to(rotationRef.current, {
        y: newTargetY,
        duration,
        ease: "power3.out",
        overwrite: true,
        onUpdate: () => {
          if (ringRef.current) {
            gsap.set(ringRef.current, { rotateY: rotationRef.current.y });
          }
        },
      });
    },
    [angleStep, count]
  );

  // Jump directly to a specific card (0..9) via shortest 3D rotation path
  const goToCardIndex = useCallback(
    (targetIdx: number) => {
      const currentStep = Math.round(-targetYRef.current / angleStep);
      const currentWrapped = ((currentStep % count) + count) % count;
      let diff = targetIdx - currentWrapped;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;
      const nextAngle = (currentStep + diff) * -angleStep;
      animateCylinderTo(nextAngle, 0.8);
    },
    [angleStep, animateCylinderTo, count]
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (videoStageRef.current) {
        gsap.fromTo(
          videoStageRef.current,
          { rotateX: 16, scale: 0.92, opacity: 0.5 },
          {
            rotateX: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: videoStageRef.current,
              start: "top 85%",
              end: "top 35%",
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragMovedRef.current = false;
    startXRef.current = e.clientX;
    gsap.killTweensOf(rotationRef.current);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !ringRef.current) return;
    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 4) {
      dragMovedRef.current = true;
    }
    startXRef.current = e.clientX;
    rotationRef.current.y += dx * 0.28;
    gsap.set(ringRef.current, { rotateY: rotationRef.current.y });
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    // Snap to closest card on release
    const nearestStep = Math.round(rotationRef.current.y / angleStep);
    animateCylinderTo(nearestStep * angleStep, 0.6);
  };

  const spinByStep = (dir: number) => {
    // dir: 1 (left) or -1 (right)
    const currentStep = Math.round(targetYRef.current / angleStep);
    animateCylinderTo((currentStep + dir) * angleStep, 0.7);
  };

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full py-24 lg:py-36 bg-[#111112] text-[#f4f4ed] overflow-hidden"
    >
      {/* Full-Width Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 lg:grid-cols-12 px-5 sm:px-10 lg:px-14 xl:px-20 opacity-[0.04]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-white h-full first:border-l" />
        ))}
      </div>

      {/* Full-Bleed Widescreen Wrapper */}
      <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20 relative z-10 space-y-32">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/15">
          <div>
            <span className="font-display text-xs font-extrabold tracking-[0.2em] text-[#f4f4ed]/50 uppercase block mb-3">
              Selected Work
            </span>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tight text-[#f4f4ed] leading-[0.92]">
              WEB, VISUALS &amp; <br />
              <span className="font-brier italic font-normal text-[#0055FF]">
                motion archive.
              </span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm sm:text-base text-[#f4f4ed]/65 leading-relaxed">
            Three front-end web builds, ten graphic design works in a 3D GSAP cylinder gallery, and one featured video edit.
          </p>
        </div>

        {/* ── PART 1: 3 WEB PROJECTS (Full-Width 3D Tilt Grid) ─────── */}
        <div>
          <div className="flex items-baseline justify-between mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#f4f4ed]">
              Front-End Web{" "}
              <span className="font-brier italic font-normal text-[#0055FF] lowercase ml-1">
                (03)
              </span>
            </h3>
            <span className="font-display text-xs font-bold tracking-[0.16em] text-[#f4f4ed]/40 uppercase">
              Interactive Portfolio Builds
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10">
            {WEB_PROJECTS.map((web) => (
              <Web3DCard key={web.id} web={web} />
            ))}
          </div>
        </div>

        {/* ── PART 2: 10 GRAPHIC DESIGNS (GSAP 3D 360° Cylinder Ring) ─ */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#f4f4ed]">
                Graphic Design{" "}
                <span className="font-brier italic font-normal text-[#0055FF] lowercase ml-1">
                  (10 works in 3D space)
                </span>
              </h3>
              <p className="font-sans text-sm text-[#f4f4ed]/60 mt-1">
                Drag to spin or click any card to bring it front and center.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => spinByStep(1)}
                className="px-5 py-2.5 bg-[#18181a] border border-white/20 hover:border-white text-xs font-display font-extrabold uppercase tracking-wider text-[#f4f4ed] transition-colors cursor-pointer"
              >
                ← Spin Left
              </button>
              <button
                onClick={() => spinByStep(-1)}
                className="px-5 py-2.5 bg-[#18181a] border border-white/20 hover:border-white text-xs font-display font-extrabold uppercase tracking-wider text-[#f4f4ed] transition-colors cursor-pointer"
              >
                Spin Right →
              </button>
            </div>
          </div>

          {/* Full-Bleed 3D Cylinder Stage (No clipping, perspective 2400px, radius 560px) */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative w-full h-[600px] sm:h-[640px] flex items-center justify-center overflow-x-clip overflow-y-visible select-none cursor-grab active:cursor-grabbing"
            style={{ perspective: "2400px" }}
          >
            <div
              ref={ringRef}
              className="relative w-[230px] sm:w-[260px] h-[320px] sm:h-[360px]"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {GRAPHIC_DESIGNS.map((item, i) => {
                const angle = i * angleStep;
                const isSelected = activeIdx === i;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (!dragMovedRef.current) {
                        goToCardIndex(i);
                      }
                    }}
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                      transformStyle: "preserve-3d",
                    }}
                    className={`absolute inset-0 p-5 bg-[#f4f4ed] text-[#111112] border shadow-[0_24px_60px_rgba(0,0,0,0.75)] flex flex-col justify-between transition-all duration-300 cursor-pointer ${isSelected
                        ? "border-[#0055FF] ring-2 ring-[#0055FF] shadow-[0_0_30px_rgba(0,85,255,0.35)]"
                        : "border-[#111112] hover:border-[#0055FF]"
                      }`}
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="font-brier italic text-xl">
                        {String(item.id).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[10px] font-bold uppercase tracking-widest opacity-60">
                        {item.year}
                      </span>
                    </div>

                    <div className="relative w-full flex-1 my-3 overflow-hidden bg-[#e6e6df] group-hover:bg-black/20 border border-[#111112]/10 flex flex-col items-center justify-center p-4 text-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover pointer-events-none"
                        />
                      ) : (
                        <span className="font-brier italic text-2xl opacity-40">
                          Artwork {String(item.id).padStart(2, "0")}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="font-display text-[9px] font-bold uppercase tracking-widest opacity-60 block">
                        {item.category}
                      </span>
                      <h4 className="font-display text-sm font-black uppercase truncate mt-0.5">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── PPT PRESENTATION DECKS (3D Auto-Looping Snake Trajectory) ── */}
        <PptSnakeShowcase />

        {/* ── PART 3: 1 FEATURED VIDEO EDIT (GSAP 3D Scroll Unfold) ── */}
        <div style={{ perspective: "1200px" }}>
          <div className="flex items-baseline justify-between mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#f4f4ed]">
              Video Editing{" "}
              <span className="font-brier italic font-normal text-[#0055FF] lowercase ml-1">
                (featured reel)
              </span>
            </h3>
            <span className="font-display text-xs font-bold tracking-[0.16em] text-[#f4f4ed]/40 uppercase">
              Edited in CapCut
            </span>
          </div>

          <div
            ref={videoStageRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center p-6 sm:p-10 bg-[#18181a] border border-white/15 will-change-transform"
          >
            <div className="lg:col-span-8">
              <div
                onClick={toggleVideo}
                className="relative w-full aspect-video overflow-hidden bg-[#111112] border border-white/15 hover:border-[#f4f4ed] group cursor-pointer flex items-center justify-center transition-colors"
              >
                <video
                  ref={videoRef}
                  src="/assets/projects/featured-video.mp4"
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />

                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 bg-[#f4f4ed] text-[#111112] group-hover:bg-[#0055FF] group-hover:text-white flex items-center justify-center group-hover:scale-110 transition-all mb-4">
                      <svg className="w-6 h-6 fill-current ml-0.5" viewBox="0 0 16 16">
                        <path d="m4 2 10 6-10 6z" />
                      </svg>
                    </div>
                    <span className="font-display text-xs font-extrabold tracking-[0.2em] text-[#f4f4ed] uppercase">
                      Play Featured Video Edit
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-5">
              <span className="font-brier italic text-2xl text-[#0055FF] block">
                CapCut Showcase
              </span>
              <h4 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#f4f4ed] leading-[0.95]">
                VISUAL STORYTELLING &amp; RHYTHM CUTS.
              </h4>
              <p className="font-sans text-sm sm:text-base text-[#f4f4ed]/65 leading-relaxed">
                A featured showcase of my short-form editing craft — combining smooth speed ramps, beat-synced transitions, and engaging visual pacing.
              </p>
            </div>
          </div>
        </div>

        {/* ── VISUAL FLY-PAST & 16-SLOT FISHEYE DOME SHOWCASE ── */}
        <VisualFlyAndDomeShowcase />
      </div>
    </section>
  );
}
