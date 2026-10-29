"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TimelineItem {
  num: string;
  year: string;
  role: string;
  organization: string;
  description: string;
  tags: string[];
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    num: "01",
    year: "Present",
    role: "Freelance Front-End & Visual Creator",
    organization: "Independent Practice",
    description:
      "Helping people build interactive personal portfolio websites, alongside graphic design in Canva and short-form video editing in CapCut.",
    tags: ["Front-End Web", "Portfolio Websites", "Canva", "CapCut"],
  },
  {
    num: "02",
    year: "2025 — 2026",
    role: "Creative Media & Graphic Design",
    organization: "UKM Al-Qur'an Study Club (ASC) — Universitas Negeri Malang",
    description:
      "Created event posters, commemorative holiday graphics, and visual documentation layouts for organizational programs and social media.",
    tags: ["Graphic Design", "Event Documentation", "Social Media"],
  },
  {
    num: "03",
    year: "2023 — Present",
    role: "Informatics Engineering Student",
    organization: "Universitas Negeri Malang (UM)",
    description:
      "Studying software development, front-end web interfaces, and exploring modern AI-assisted workflows using Antigravity and Google AI Studio.",
    tags: ["Informatics Engineering", "Front-End", "Visual Web"],
  },
];

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

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
              end: "top 40%",
              scrub: 0.4,
            },
          }
        );
      }

      if (progressLineRef.current && rowsRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: rowsRef.current,
              start: "top 70%",
              end: "bottom 50%",
              scrub: 0.4,
            },
          }
        );
      }

      if (rowsRef.current) {
        const items = rowsRef.current.querySelectorAll(".journey-row");
        items.forEach((row) => {
          gsap.fromTo(
            row,
            { opacity: 0.2, rotateX: -16, y: 40, transformPerspective: 1000 },
            {
              opacity: 1,
              rotateX: 0,
              y: 0,
              ease: "power2.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                end: "top 50%",
                scrub: 0.4,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative w-full py-28 lg:py-40 bg-[#0d1017] text-[#f4f4ed] overflow-hidden select-none"
    >
      {/* LAYERED ARCHITECTURAL TWO-TONE BACKGROUND */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, #0b0d13 0%, #111a2e 46%, #0d1017 46.1%, #0a0c10 100%)",
        }}
      />

      {/* Ambient Blue & Cyan Gallery Spotlights */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#0055FF]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[460px] h-[460px] rounded-full bg-[#38bdf8]/10 blur-[150px] pointer-events-none" />

      {/* Top 3D Paper-Cut Wave Relief Divider (Transition from light ArsenalSection) */}
      <div className="absolute top-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-12 sm:h-20">
          <path
            d="M0,0 L1440,0 L1440,40 C1160,95 880,10 600,60 C320,110 140,25 0,65 Z"
            fill="#dce6f7"
            opacity="0.35"
          />
          <path
            d="M0,0 L1440,0 L1440,24 C1120,75 840,0 560,42 C280,85 120,18 0,46 Z"
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

      {/* Full-Bleed Widescreen Wrapper */}
      <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20 relative z-10 pt-8">
        
        {/* Full-Width Section Header with Reversible Scroll In/Out */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-16 border-b border-white/15 will-change-transform"
        >
          <div>
            <span className="font-display text-xs font-extrabold tracking-[0.2em] text-[#60a5fa] uppercase block mb-3">
              Journey &amp; CV
            </span>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tight text-[#f4f4ed] leading-[0.92]">
              EXPERIENCE &amp; <br />
              <span className="font-brier italic font-normal text-[#0055FF]">
                background.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm sm:text-base text-[#f4f4ed]/65 leading-relaxed">
            My academic foundation at Universitas Negeri Malang, campus creative roles, and freelance front-end &amp; visual practice.
          </p>
        </div>

        {/* Full-Width 12-Column Editorial Rows with GSAP Scrubbed Progress Line */}
        <div ref={rowsRef} className="relative w-full">
          {/* Background Track Line on Left Edge */}
          <div className="hidden lg:block absolute left-[25%] top-0 bottom-0 w-[1px] bg-white/10" />
          {/* GSAP Scrubbed Active Cobalt Line */}
          <div
            ref={progressLineRef}
            className="hidden lg:block absolute left-[25%] top-0 bottom-0 w-[2px] bg-[#0055FF] origin-top shadow-[0_0_12px_#0055FF]"
          />

          <div className="divide-y divide-white/15">
            {TIMELINE_DATA.map((item, idx) => (
              <div
                key={item.role}
                className="journey-row group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12 lg:py-16 items-start will-change-transform"
              >
                {/* Left 3 Cols: Giant Year & Floating Milestone Badge */}
                <div className="lg:col-span-3 flex flex-col justify-between pr-6">
                  <span className="font-brier italic text-3xl sm:text-4xl text-[#0055FF] group-hover:translate-x-2 transition-transform">
                    {item.year}
                  </span>
                  <div
                    className="inline-flex items-center gap-1.5 mt-2.5 w-fit px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                    style={{
                      animation: `bounce-down ${3.4 + idx * 0.4}s ease-in-out infinite`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF]" />
                    <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#f4f4ed]/60">
                      Milestone {item.num}
                    </span>
                  </div>
                </div>

                {/* Center 5 Cols: Role & Organization */}
                <div className="lg:col-span-5 lg:pl-8">
                  <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-[#f4f4ed] group-hover:text-[#0055FF] transition-colors leading-[0.98]">
                    {item.role}
                  </h3>
                  <p className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-[#60a5fa] mt-2">
                    {item.organization}
                  </p>
                </div>

                {/* Right 4 Cols: Description & Tags in Midnight-Cobalt Glass Card */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-6 rounded-[24px] bg-[#141824]/80 backdrop-blur-xl border border-white/10 group-hover:border-[#0055FF]/60 p-6 sm:p-8 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <p className="font-sans text-sm sm:text-base text-[#f4f4ed]/70 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-[8px] bg-white/5 border border-white/10 font-display text-[10px] font-bold uppercase tracking-wider text-[#f4f4ed]/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
