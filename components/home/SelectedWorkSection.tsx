"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface WebProject {
  id: string;
  num: string;
  title: string;
  description: string;
  previewImage: string;
  liveUrl?: string;
  isConcept?: boolean;
  conceptDetails?: {
    role: string;
    timeline: string;
    deliverables: string[];
    summary: string;
  };
  tags: string[];
}

const WEB_PROJECTS: WebProject[] = [
  {
    id: "web-01",
    num: "01",
    title: "Personal Portfolio Website",
    description:
      "Interactive single-scroll portfolio website built with kinetic typography, real-time canvas physics, and responsive front-end architecture.",
    previewImage: "/assets/about/obj-frontend.webp",
    liveUrl: "https://www.heyitskaikii.my.id",
    tags: ["Next.js", "Tailwind CSS", "GSAP"],
  },
  {
    id: "web-02",
    num: "02",
    title: "Design System & UI Library",
    description:
      "Modular front-end component architecture featuring dark-mode tokens, accessible state management, and fluid motion primitives.",
    previewImage: "/assets/about/obj-design.webp",
    isConcept: true,
    conceptDetails: {
      role: "Front-End Developer & UI Designer",
      timeline: "2026",
      deliverables: ["Design Tokens", "Component Sandbox", "Micro-Interactions"],
      summary:
        "A modular, high-contrast design system crafted for rapid prototyping of creative portfolios and editorial platforms with zero visual clutter.",
    },
    tags: ["Design System", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "web-03",
    num: "03",
    title: "Visual Photo Archive & Lab",
    description:
      "Lightweight interactive digital gallery showcasing photography, typographic hierarchy, and responsive CSS layout systems.",
    previewImage: "/assets/about/obj-photo.webp",
    isConcept: true,
    conceptDetails: {
      role: "Creative Technologist",
      timeline: "2026",
      deliverables: ["Responsive Gallery", "Canvas Physics", "Performance Tuning"],
      summary:
        "An experimental playground exploring spatial layout compositions, smooth gesture interactions, and high-performance image loading.",
    },
    tags: ["React", "Motion", "Interactive"],
  },
];

const GRAPHIC_DESIGNS = [
  { id: 1, title: "Choose Your June Cat · ASC UM", image: "/assets/designs/design-1.webp" },
  { id: 2, title: "Maulid Nabi 1448 H · ASC UM", image: "/assets/designs/design-2.webp" },
  { id: 3, title: "AKSI Indosiar 2026 Support Poster", image: "/assets/designs/design-3.webp" },
  { id: 4, title: "Rekap Kabar Juara ASC 2026", image: "/assets/designs/design-4.webp" },
  { id: 5, title: "SYIAR UKM ASC 2026", image: "/assets/designs/design-5.webp" },
  { id: 6, title: "Tahun Baru Islam 1 Muharram 1448 H", image: "/assets/designs/design-6.webp" },
  { id: 7, title: "Sema'an Akbar & Lailatul Qiro'ah", image: "/assets/designs/design-7.webp" },
  { id: 8, title: "Mahasiswa Berprestasi Semester Genap", image: "/assets/designs/design-8.webp" },
  { id: 9, title: "Mahasiswa Berprestasi Semester Ganjil", image: "/assets/designs/design-9.webp" },
  { id: 10, title: "Halalbihalal Keluarga Besar ASC 2026", image: "/assets/designs/design-10.webp" },
];

function Web3DCard({
  web,
  index,
  onOpenConcept,
}: {
  web: WebProject;
  index: number;
  onOpenConcept: (web: WebProject) => void;
}) {
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
      style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
      className="web-scroll-card group flex flex-col justify-between p-7 sm:p-8 rounded-[24px] bg-[#131722]/90 border border-white/15 hover:border-[#0055FF] transition-colors shadow-[0_20px_50px_rgba(0,0,0,0.6)] will-change-transform"
    >
      <div style={{ transform: "translateZ(28px)" }}>
        {/* Preview Frame with Subtle Continuous Floating Loop on Inner Image */}
        <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden mb-6 bg-[#0d111a] border border-white/10 flex flex-col items-center justify-center">
          <div
            className="w-full h-full relative"
            style={{
              animation: `bounce-down ${3.2 + index * 0.4}s ease-in-out infinite`,
            }}
          >
            <Image
              src={web.previewImage}
              alt={web.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="font-brier italic text-base text-[#0055FF]">
            {web.num}
          </span>
          <h4 className="font-display text-2xl font-black uppercase text-[#f4f4ed]">
            {web.title}
          </h4>
        </div>
        <p className="font-sans text-sm text-[#f4f4ed] leading-relaxed mb-6">
          {web.description}
        </p>
      </div>

      <div
        style={{ transform: "translateZ(20px)" }}
        className="pt-4 flex items-center justify-between gap-2"
      >
        <div className="flex flex-wrap gap-2">
          {web.tags.map((t) => (
            <span
              key={t}
              className="font-display text-[10px] font-bold uppercase tracking-wider text-[#38bdf8]"
            >
              {t}
            </span>
          ))}
        </div>

        {web.liveUrl ? (
          <a
            href={web.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-display text-xs font-extrabold !text-[#f4f4ed] hover:!text-[#38bdf8] uppercase tracking-wider shrink-0 transition-colors"
          >
            <span>Visit Web</span>
            <span>↗</span>
          </a>
        ) : (
          <button
            onClick={() => onOpenConcept(web)}
            className="inline-flex items-center gap-1 font-display text-xs font-extrabold text-[#38bdf8] hover:text-white uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
          >
            <span>Case Study</span>
            <span>↗</span>
          </button>
        )}
      </div>
    </div>
  );
}

export function SelectedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const webGridRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cylinderStageRef = useRef<HTMLDivElement>(null);
  const activeNumRef = useRef<HTMLSpanElement>(null);
  const activeTitleRef = useRef<HTMLParagraphElement>(null);

  const rotationRef = useRef({ y: 0 });
  const targetYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const startXRef = useRef(0);
  const pauseUntilRef = useRef(0);
  const activeIdxRef = useRef(0);

  const [inspectedPoster, setInspectedPoster] = useState<(typeof GRAPHIC_DESIGNS)[0] | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<WebProject | null>(null);

  const count = GRAPHIC_DESIGNS.length;
  const angleStep = 360 / count;
  const radius = 580;

  // Direct DOM highlight update with smooth GSAP flip to prevent full React tree re-renders
  const updateActiveCardVisuals = useCallback(
    (activeIdx: number) => {
      if (activeNumRef.current) {
        activeNumRef.current.textContent = `Visual ${String(activeIdx + 1).padStart(2, "0")} / ${count}`;
        gsap.fromTo(
          activeNumRef.current,
          { y: -6, opacity: 0.4 },
          { y: 0, opacity: 1, duration: 0.22, ease: "power2.out" }
        );
      }
      if (activeTitleRef.current) {
        activeTitleRef.current.textContent = GRAPHIC_DESIGNS[activeIdx]?.title || "";
        gsap.fromTo(
          activeTitleRef.current,
          { y: 6, opacity: 0.5 },
          { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }
        );
      }
      if (ringRef.current) {
        const cards = ringRef.current.children;
        for (let i = 0; i < cards.length; i++) {
          const card = cards[i] as HTMLElement;
          if (i === activeIdx) {
            card.classList.add(
              "border-white/80",
              "shadow-[inset_0_1px_2px_rgba(255,255,255,0.85),0_26px_60px_rgba(0,85,255,0.35)]"
            );
            card.classList.remove("border-white/20", "shadow-[0_20px_45px_rgba(0,0,0,0.8)]");
          } else {
            card.classList.remove(
              "border-white/80",
              "shadow-[inset_0_1px_2px_rgba(255,255,255,0.85),0_26px_60px_rgba(0,85,255,0.35)]"
            );
            card.classList.add("border-white/20", "shadow-[0_20px_45px_rgba(0,0,0,0.8)]");
          }
        }
      }
    },
    [count]
  );

  // Continuous Auto-Spin Loop (Pauses when off-screen, zero React state re-renders!)
  useEffect(() => {
    let rafId: number;
    let isVisible = false;

    const tick = (now: number) => {
      if (!isVisible) return;
      rafId = requestAnimationFrame(tick);
      if (!isDraggingRef.current && now > pauseUntilRef.current) {
        targetYRef.current -= 0.15;
      }
      rotationRef.current.y += (targetYRef.current - rotationRef.current.y) * 0.09;
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${rotationRef.current.y}deg)`;
      }
      const norm = Math.round(-rotationRef.current.y / angleStep);
      const wrapped = ((norm % count) + count) % count;
      if (activeIdxRef.current !== wrapped) {
        activeIdxRef.current = wrapped;
        updateActiveCardVisuals(wrapped);
      }
    };

    const targetEl = cylinderStageRef.current || sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        if (visible && !isVisible) {
          isVisible = true;
          rafId = requestAnimationFrame(tick);
        } else if (!visible && isVisible) {
          isVisible = false;
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.05 }
    );

    if (targetEl) observer.observe(targetEl);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [angleStep, count, updateActiveCardVisuals]);

  const goToCardIndex = useCallback(
    (targetIdx: number) => {
      pauseUntilRef.current = performance.now() + 3000;
      const currentStep = Math.round(-targetYRef.current / angleStep);
      const currentWrapped = ((currentStep % count) + count) % count;
      let diff = targetIdx - currentWrapped;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;
      targetYRef.current = (currentStep + diff) * -angleStep;
    },
    [angleStep, count]
  );

  // Reversible Scroll In/Out Animations for Section Elements
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 50, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              end: "top 35%",
              scrub: 0.4,
            },
          }
        );
      }

      if (webGridRef.current) {
        const cards = webGridRef.current.querySelectorAll(".web-scroll-card");
        gsap.fromTo(
          cards,
          { y: 70, opacity: 0, rotateX: 14, transformPerspective: 1000 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.12,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: webGridRef.current,
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
    pauseUntilRef.current = performance.now() + 3000;
    startXRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 4) dragMovedRef.current = true;
    startXRef.current = e.clientX;
    targetYRef.current += dx * 0.3;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    pauseUntilRef.current = performance.now() + 2500;
    targetYRef.current = Math.round(targetYRef.current / angleStep) * angleStep;
  };

  const spinByStep = (dir: number) => {
    pauseUntilRef.current = performance.now() + 3000;
    const snapped = Math.round(targetYRef.current / angleStep) * angleStep;
    targetYRef.current = snapped + dir * angleStep;
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-stage relative w-full py-28 lg:py-40 bg-[#0d1017] text-[#f4f4ed] overflow-hidden"
    >
      {/* Architectural Wall Split Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(125deg, #0b0d13 0%, #101829 48%, #0d1017 48.1%, #090b10 100%)",
        }}
      />

      {/* Ambient Blue & Ice Gallery Spotlights */}
      <div className="absolute top-[12%] left-[18%] w-[520px] h-[520px] rounded-full bg-[#0055FF]/12 blur-[150px] pointer-events-none" />
      <div className="absolute top-[48%] right-[12%] w-[480px] h-[480px] rounded-full bg-[#38bdf8]/10 blur-[160px] pointer-events-none" />

      {/* Top 3D Paper-Cut Layered Wave Relief Divider */}
      <div className="absolute top-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none" className="w-full h-12 sm:h-20">
          <path
            d="M0,0 L1440,0 L1440,45 C1180,105 920,10 640,65 C360,115 160,35 0,75 Z"
            fill="#dce6f7"
            opacity="0.35"
          />
          <path
            d="M0,0 L1440,0 L1440,28 C1120,82 860,0 560,48 C280,92 120,20 0,52 Z"
            fill="#f4f4ed"
          />
        </svg>
      </div>

      {/* Full-Width Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 lg:grid-cols-12 px-5 sm:px-10 lg:px-14 xl:px-20 opacity-[0.04]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-white h-full first:border-l" />
        ))}
      </div>

      <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20 relative z-10 space-y-28 pt-8">
        {/* Section Header with Quick Discovery Category Bar */}
        <div
          ref={headerRef}
          className="flex flex-col gap-8 pb-8 will-change-transform"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="font-display text-xs font-extrabold tracking-[0.2em] text-[#60a5fa] uppercase block mb-3">
                Selected Work
              </span>
              <h2 className="font-display text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tight text-[#f4f4ed] leading-[0.92]">
                WEB, VISUALS &amp; <br />
                <span className="font-brier italic font-normal text-[#0055FF]">
                  motion archive.
                </span>
              </h2>
            </div>
            <p className="max-w-md font-sans text-sm sm:text-base text-[#f4f4ed] leading-relaxed">
              Explore three front-end web builds, ten 3:4 graphic posters in an interactive 3D cylinder, followed by slide decks and video reel below.
            </p>
          </div>

          {/* Gamified Discovery Category Navigation Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-[#141824]/80 border border-white/15 backdrop-blur-md">
            <span className="font-display text-[10px] sm:text-xs font-extrabold tracking-[0.18em] text-[#38bdf8] uppercase px-3 py-1">
              Explore:
            </span>
            <a
              href="#work-web"
              className="font-display text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#0055FF] text-[#f4f4ed] hover:text-white border border-white/10 transition-colors"
            >
              [01] Web Builds (3)
            </a>
            <a
              href="#work-posters"
              className="font-display text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#0055FF] text-[#f4f4ed] hover:text-white border border-white/10 transition-colors"
            >
              [02] Posters (10)
            </a>
            <a
              href="#work-ppt"
              className="font-display text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#0055FF] text-[#f4f4ed] hover:text-white border border-white/10 transition-colors"
            >
              [03] Slide Decks (10)
            </a>
            <a
              href="#work-video"
              className="font-display text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#0055FF] text-[#f4f4ed] hover:text-white border border-white/10 transition-colors"
            >
              [04] Video Reel (1)
            </a>
            <a
              href="#work-monument"
              className="font-display text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#0055FF] text-[#f4f4ed] hover:text-white border border-white/10 transition-colors"
            >
              [05] Monument (16)
            </a>
          </div>
        </div>

        {/* ── PART 1: 3 WEB PROJECTS ───────────────────────────────── */}
        <div id="work-web" ref={webGridRef}>
          <div className="flex items-baseline justify-between mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#f4f4ed]">
              Front-End Web{" "}
              <span className="font-brier italic font-normal text-[#0055FF] lowercase ml-1">
                (03)
              </span>
            </h3>
            <span className="font-display text-xs font-bold tracking-[0.16em] text-[#60a5fa] uppercase">
              Interactive Portfolio Builds
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10">
            {WEB_PROJECTS.map((web, idx) => (
              <Web3DCard
                key={web.id}
                web={web}
                index={idx}
                onOpenConcept={setSelectedConcept}
              />
            ))}
          </div>
        </div>

        {/* ── PART 2: 10 GRAPHIC DESIGNS (Exact 3:4 Liquid Glass Cylinder) ─ */}
        <div id="work-posters">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#f4f4ed]">
                Graphic Design{" "}
                <span className="font-brier italic font-normal text-[#0055FF] lowercase ml-1">
                  (10 works in 3D space)
                </span>
              </h3>
              <p className="font-sans text-sm text-[#f4f4ed] mt-1">
                Drag to spin or click any 3:4 poster to inspect in full resolution.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => spinByStep(1)}
                className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/20 hover:border-[#38bdf8] text-xs font-display font-extrabold uppercase tracking-wider text-[#f4f4ed] transition-colors cursor-pointer"
                aria-label="Spin 3D poster cylinder left"
              >
                ← Spin Left
              </button>
              <button
                onClick={() => spinByStep(-1)}
                className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/20 hover:border-[#38bdf8] text-xs font-display font-extrabold uppercase tracking-wider text-[#f4f4ed] transition-colors cursor-pointer"
                aria-label="Spin 3D poster cylinder right"
              >
                Spin Right →
              </button>
            </div>
          </div>

          {/* Exact 3:4 Unclipped Liquid Glass 3D Cylinder Stage */}
          <div
            ref={cylinderStageRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative w-full h-[560px] sm:h-[640px] py-10 flex items-center justify-center overflow-x-clip overflow-y-visible select-none cursor-grab active:cursor-grabbing"
            style={{ perspective: "2600px" }}
          >
            {/* Outer Ring Locked to Exact 3:4 Proportions */}
            <div
              ref={ringRef}
              className="relative w-[255px] h-[340px] sm:w-[285px] sm:h-[380px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {GRAPHIC_DESIGNS.map((item, i) => {
                const angle = i * angleStep;
                const isInitial = i === 0;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (!dragMovedRef.current) {
                        goToCardIndex(i);
                        setInspectedPoster(item);
                      }
                    }}
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                    className={`graphic-cylinder-card absolute inset-0 w-full h-full rounded-[24px] p-2 bg-[#121622]/90 border transition-[border-color,box-shadow] duration-200 overflow-hidden group will-change-transform cursor-pointer ${
                      isInitial
                        ? "border-white/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.85),0_26px_60px_rgba(0,85,255,0.35)]"
                        : "border-white/20 shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
                    }`}
                  >
                    {/* Liquid Glass Specular Sheen */}
                    <div
                      className="pointer-events-none absolute inset-0 z-20 rounded-[24px] opacity-40 group-hover:opacity-75 transition-opacity"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.05) 40%, transparent 65%, rgba(255,255,255,0.2) 100%)",
                      }}
                    />

                    {/* Full-Width & Full-Height 3:4 Poster Image */}
                    <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-[#10131a]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 260px, 300px"
                        className="object-cover pointer-events-none block group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Poster Title Readout with Inspect Button */}
          <div className="text-center mt-3 flex flex-col items-center">
            <span
              ref={activeNumRef}
              className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[#38bdf8] block"
            >
              Visual 01 / {count}
            </span>
            <p
              ref={activeTitleRef}
              className="font-display text-lg sm:text-xl font-black uppercase text-[#f4f4ed] mt-1"
            >
              {GRAPHIC_DESIGNS[0]?.title}
            </p>
            <button
              onClick={() => {
                const current = GRAPHIC_DESIGNS[activeIdxRef.current] || GRAPHIC_DESIGNS[0];
                setInspectedPoster(current);
              }}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-[#0055FF] text-[#f4f4ed] hover:text-white font-display text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Inspect Poster</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── POSTER INSPECTION LIGHTBOX MODAL ───────────────────────── */}
      {inspectedPoster && (
        <div
          onClick={() => setInspectedPoster(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-[#111112] border border-white/20 rounded-[28px] overflow-hidden shadow-2xl p-6 flex flex-col gap-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="font-display text-[11px] font-bold tracking-[0.2em] text-[#38bdf8] uppercase block">
                  Graphic Poster Archive
                </span>
                <h4 className="font-display text-lg sm:text-xl font-black uppercase text-[#f4f4ed] mt-0.5">
                  {inspectedPoster.title}
                </h4>
              </div>
              <button
                onClick={() => setInspectedPoster(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0055FF] text-[#f4f4ed] hover:text-white flex items-center justify-center font-display font-bold transition-colors cursor-pointer shrink-0"
                aria-label="Close poster inspection"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full aspect-[3/4] rounded-[18px] overflow-hidden bg-[#0d1017] border border-white/10">
              <Image
                src={inspectedPoster.image}
                alt={inspectedPoster.title}
                fill
                sizes="(max-width: 640px) 95vw, 500px"
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="font-brier italic text-base text-[#0055FF]">
                Canva Visual Composition
              </span>
              <span className="font-display text-[11px] font-bold text-[#f4f4ed] uppercase tracking-wider">
                Full 3:4 High-Resolution Poster
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── WEB CONCEPT PREVIEW MODAL ──────────────────────────────── */}
      {selectedConcept && (
        <div
          onClick={() => setSelectedConcept(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-[#111112] border border-white/20 rounded-[28px] overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="font-display text-[11px] font-bold tracking-[0.2em] text-[#38bdf8] uppercase block">
                  Concept Architecture &middot; Project {selectedConcept.num}
                </span>
                <h4 className="font-display text-2xl font-black uppercase text-[#f4f4ed] mt-1">
                  {selectedConcept.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedConcept(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0055FF] text-[#f4f4ed] hover:text-white flex items-center justify-center font-display font-bold transition-colors cursor-pointer shrink-0"
                aria-label="Close concept details"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full aspect-[16/10] rounded-[18px] overflow-hidden bg-[#0d1017] border border-white/10">
              <Image
                src={selectedConcept.previewImage}
                alt={selectedConcept.title}
                fill
                sizes="(max-width: 768px) 95vw, 650px"
                className="object-cover"
              />
            </div>

            {selectedConcept.conceptDetails && (
              <div className="space-y-4">
                <p className="font-sans text-sm text-[#f4f4ed] leading-relaxed">
                  {selectedConcept.conceptDetails.summary}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
                  <div>
                    <span className="font-display text-[10px] font-bold uppercase tracking-wider text-[#38bdf8] block">
                      Role
                    </span>
                    <span className="font-display text-xs font-bold text-[#f4f4ed]">
                      {selectedConcept.conceptDetails.role}
                    </span>
                  </div>
                  <div>
                    <span className="font-display text-[10px] font-bold uppercase tracking-wider text-[#38bdf8] block">
                      Timeline
                    </span>
                    <span className="font-display text-xs font-bold text-[#f4f4ed]">
                      {selectedConcept.conceptDetails.timeline}
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-display text-[10px] font-bold uppercase tracking-wider text-[#38bdf8] block">
                      Deliverables
                    </span>
                    <span className="font-display text-xs font-bold text-[#f4f4ed]">
                      {selectedConcept.conceptDetails.deliverables.join(" · ")}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
