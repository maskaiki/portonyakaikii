"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PLATFORMS = [
  {
    name: "Antigravity",
    role: "AI-Assisted Web Engineering",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 2L3 21h4l2-5h6l2 5h4L12 2z" />
        <path d="M12 2v11" />
      </svg>
    ),
  },
  {
    name: "Google AI Studio",
    role: "Creative Prompting & Prototyping",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    role: "Source Code & Version Control",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    name: "Vercel",
    role: "Cloud Deployment & Hosting",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2L2 21h20L12 2z" />
      </svg>
    ),
  },
  {
    name: "Canva",
    role: "Graphic Design & Visual Layouts",
    icon: (
      <svg viewBox="0 0 192 192" fill="currentColor" className="w-6 h-6">
        <path d="M95.2 170c-11.6 0-22-3.1-30.9-9.1-8.8-6-15.4-14.6-19.7-25.6-2.5-6.4-4-13.4-4.7-21.4-.8-9.5-.2-19.2 1.9-28.7 3.3-15.3 10-28.5 19.8-39.5 9.7-10.8 21.2-18.1 34.3-21.5 5.6-1.5 11.2-2.2 16.5-2.2 6.4 0 12.7 1.1 18.7 3.3 8.9 3.3 15 9 17.9 17 1.4 3.7 1.8 7.6 1.4 12-.6 6.2-2.6 11.7-6 16.4-3.9 5.4-8.6 8.7-14.3 10.1-1 .3-2.1.4-3.3.4-.5 0-.9 0-1.4-.1-1.7-.2-3.2-.9-4.2-2.2-1-1.3-1.4-3-1.2-4.7.3-2 1.1-3.7 1.9-5.1l.3-.6c1.6-3.2 3.1-6.2 3.9-9.4 1.3-5.4 1.3-9.5-.1-13.3-1.5-4-4.3-6.5-8.5-7.5-1.6-.4-3.2-.6-4.8-.6-3.6 0-7.4.9-11.4 2.7C93.4 44 86.7 50 81 58.7c-3.9 6-6.9 12.7-9.1 20.5-1.6 5.6-2.6 11.5-3.2 17.6-.3 2.9-.5 6.3-.5 9.6.1 9.7 1.5 17.4 4.5 24.2 3.3 7.6 7.8 12.9 13.9 16.3 4.1 2.3 8.7 3.5 13.6 3.5.8 0 1.7 0 2.6-.1 10.4-.8 19.6-5.5 28-14.3 4.3-4.5 7.9-9.7 11-15.9.5-.9 1-1.9 1.8-2.7 1-1.1 2.3-1.7 3.7-1.7 1.7 0 3.2.9 4.2 2.5 1.2 2 1.1 4.2.9 5.6-.6 4.1-2.1 8.1-4.6 12.8-7.2 12.9-17.1 22.4-29.4 28.3-6.3 3-13.1 4.7-20.1 5-1.1.1-2.1.1-3.1.1z" />
      </svg>
    ),
  },
  {
    name: "CapCut",
    role: "Video Editing & Short-Form Cuts",
    icon: (
      <svg
        viewBox="0 0 192 192"
        fill="none"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M170 42 22 124v14c0 6.627 5.373 12 12 12h78c6.627 0 12-5.373 12-12v-9.5" />
        <path d="M170 150 22 68V54c0-6.627 5.373-12 12-12h78c6.627 0 12 5.373 12 12v9.5" />
      </svg>
    ),
  },
];

const WEBSITE_SPECS = [
  { label: "Front-End", value: "Next.js, React & TypeScript" },
  { label: "Styling", value: "Tailwind CSS & Architectural Glass" },
  { label: "Motion & 3D", value: "GSAP ScrollTrigger, Framer Motion & Lenis" },
  { label: "AI Workflow", value: "Antigravity & Google AI Studio" },
  { label: "Creative Suite", value: "Canva & CapCut" },
  { label: "Deployment", value: "GitHub & Vercel" },
];

export function ArsenalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const specSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 50, opacity: 0.25 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              end: "top 40%",
              scrub: 0.4,
            },
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".arsenal-3d-card");
        gsap.fromTo(
          cards,
          { opacity: 0.25, rotateX: -25, y: 50, transformPerspective: 1000 },
          {
            opacity: 1,
            rotateX: 0,
            y: 0,
            stagger: 0.08,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.4,
            },
          }
        );
      }

      if (specSheetRef.current) {
        gsap.fromTo(
          specSheetRef.current,
          { x: 40, opacity: 0.35 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: specSheetRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 0.4,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: px * 16,
      rotateX: -py * 16,
      y: -6,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };

  const handleCardReset = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full py-28 lg:py-40 bg-[#f4f4ed] text-[#111112] overflow-hidden select-none"
    >
      {/* LAYERED ARCHITECTURAL TWO-TONE ICE-BLUE & BONE GRADIENT */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, #f4f4ed 0%, #e8effa 52%, #f4f4ed 52.1%, #eef3fc 100%)",
        }}
      />

      {/* Ambient Soft Blue & Ice Spotlights */}
      <div className="absolute top-[12%] right-[12%] w-[480px] h-[480px] rounded-full bg-[#0055FF]/8 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[8%] w-[420px] h-[420px] rounded-full bg-[#38bdf8]/10 blur-[130px] pointer-events-none" />

      {/* Top 3D Paper-Cut Wave Relief Divider */}
      <div className="absolute top-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-20"
        >
          <path
            d="M0,0 L1440,0 L1440,40 C1160,95 880,10 600,60 C320,110 140,25 0,65 Z"
            fill="#0d1017"
          />
        </svg>
      </div>

      {/* Full-Width Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 lg:grid-cols-12 px-5 sm:px-10 lg:px-14 xl:px-20 opacity-[0.05]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="border-r border-[#111112] h-full first:border-l"
          />
        ))}
      </div>

      {/* Full-Bleed Widescreen Wrapper */}
      <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20 relative z-10 pt-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-16 border-b border-[#111112]/15 will-change-transform"
        >
          <div>
            <span className="font-display text-xs font-extrabold tracking-[0.2em] text-[#0055FF] uppercase block mb-3">
              Arsenal &amp; Stack
            </span>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tight text-[#111112] leading-[0.92]">
              BUILT WITH &amp; <br />
              <span className="font-brier italic font-normal text-[#0055FF]">
                daily platforms.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm sm:text-base text-[#111112]/80 leading-relaxed">
            How this portfolio website was engineered and the exact platforms I
            use every day to build websites, graphics, and videos.
          </p>
        </div>

        {/* Full-Width 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-stretch mb-20">
          {/* Left 8 Cols: 3-Column Platform Cards */}
          <div
            ref={gridRef}
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {PLATFORMS.map((item, idx) => (
              <div
                key={item.name}
                onMouseMove={handleCardTilt}
                onMouseLeave={handleCardReset}
                style={{ transformStyle: "preserve-3d" }}
                className="arsenal-3d-card group p-7 sm:p-8 rounded-[24px] bg-white/80 backdrop-blur-xl border border-[#111112]/15 hover:border-[#0055FF] hover:shadow-[0_20px_50px_rgba(0,85,255,0.15)] transition-all flex flex-col justify-between min-h-[210px] will-change-transform"
              >
                <div
                  className="flex items-center justify-between mb-6"
                  style={{ transform: "translateZ(25px)" }}
                >
                  <div
                    className="p-3.5 rounded-[14px] bg-[#111112] text-[#f4f4ed] group-hover:bg-[#0055FF] group-hover:scale-105 transition-all shadow-md"
                    style={{
                      animation: `bounce-down ${
                        3.2 + idx * 0.35
                      }s ease-in-out infinite`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <span className="font-brier italic text-2xl text-[#111112]/55 group-hover:text-[#0055FF] transition-colors">
                    0{idx + 1}
                  </span>
                </div>
                <div style={{ transform: "translateZ(20px)" }}>
                  <h3 className="font-display text-2xl font-black uppercase text-[#111112]">
                    {item.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#111112]/80 mt-1.5 leading-relaxed">
                    {item.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right 4 Cols: Architectural Spec Sheet */}
          <div
            ref={specSheetRef}
            className="lg:col-span-4 p-8 sm:p-10 rounded-[28px] bg-[#111112] text-[#f4f4ed] flex flex-col justify-between shadow-[16px_16px_0px_#0055FF] will-change-transform"
          >
            <div>
              <span className="font-brier italic text-xl text-[#60a5fa] block mb-2">
                Under the hood
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#f4f4ed] mb-3">
                HOW THIS WEB WAS BUILT
              </h3>
              <p className="font-sans text-sm text-[#f4f4ed]/80 leading-relaxed mb-6">
                Built by combining modern front-end frameworks with AI-assisted
                workflows in Antigravity and Google AI Studio.
              </p>

              <div className="space-y-3.5 py-5 border-t border-b border-white/15 mb-8">
                {WEBSITE_SPECS.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col sm:flex-row sm:justify-between py-1 text-xs gap-1"
                  >
                    <span className="font-display font-bold uppercase tracking-wider text-[#f4f4ed]/75">
                      {spec.label}
                    </span>
                    <span className="font-sans font-semibold text-[#f4f4ed] sm:text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-display text-xs font-extrabold uppercase tracking-wider !text-[#111112] bg-[#f4f4ed] hover:bg-[#0055FF] hover:!text-white transition-all shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
            >
              <span>Want a Website Like This? Let&rsquo;s Talk</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Full-Bleed Infinite Scrolling Logo Marquee */}
        <div className="pt-10 border-t border-[#111112]/15">
          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-fit marquee-track-logos">
              {[...PLATFORMS, ...PLATFORMS, ...PLATFORMS].map((plat, idx) => (
                <div
                  key={`${plat.name}-${idx}`}
                  className="flex items-center gap-3.5 px-7 py-4 mx-2 rounded-[16px] bg-white/80 backdrop-blur-md border border-[#111112]/15 hover:border-[#0055FF] text-[#111112] transition-all shrink-0"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {plat.icon}
                  </div>
                  <span className="font-display text-sm font-black uppercase tracking-wider whitespace-nowrap">
                    {plat.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
