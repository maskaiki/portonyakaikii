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
  const progressLineRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (progressLineRef.current && rowsRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
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
            { opacity: 0.2, rotateX: -20, y: 40, transformPerspective: 1000 },
            {
              opacity: 1,
              rotateX: 0,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
                end: "top 45%",
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
      className="relative w-full py-24 lg:py-36 bg-[#111112] text-[#f4f4ed] border-t border-white/10 overflow-hidden"
    >
      {/* Full-Width Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 lg:grid-cols-12 px-5 sm:px-10 lg:px-14 xl:px-20 opacity-[0.04]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-white h-full first:border-l" />
        ))}
      </div>

      {/* Full-Bleed Widescreen Wrapper (No max-w-4xl bottleneck!) */}
      <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20 relative z-10">
        
        {/* Full-Width Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-16 border-b border-white/15">
          <div>
            <span className="font-display text-xs font-extrabold tracking-[0.2em] text-[#f4f4ed]/50 uppercase block mb-3">
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
            className="hidden lg:block absolute left-[25%] top-0 bottom-0 w-[2px] bg-[#0055FF] origin-top"
          />

          <div className="divide-y divide-white/15">
            {TIMELINE_DATA.map((item) => (
              <div
                key={item.role}
                className="journey-row group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12 lg:py-16 items-start will-change-transform"
              >
                {/* Left 3 Cols: Giant Year & Index (Spreads to Far Left) */}
                <div className="lg:col-span-3 flex flex-col justify-between pr-6">
                  <span className="font-brier italic text-3xl sm:text-4xl text-[#0055FF] group-hover:translate-x-2 transition-transform">
                    {item.year}
                  </span>
                  <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#f4f4ed]/35 mt-2">
                    Milestone {item.num}
                  </span>
                </div>

                {/* Center 5 Cols: Role & Organization */}
                <div className="lg:col-span-5 lg:pl-8">
                  <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-[#f4f4ed] group-hover:text-[#0055FF] transition-colors leading-[0.98]">
                    {item.role}
                  </h3>
                  <p className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f4f4ed]/50 mt-2">
                    {item.organization}
                  </p>
                </div>

                {/* Right 4 Cols: Description & Tags (Spreads to Far Right) */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-6 bg-[#18181a] border border-white/10 group-hover:border-white/35 p-6 sm:p-8 transition-colors">
                  <p className="font-sans text-sm sm:text-base text-[#f4f4ed]/70 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-display text-[10px] font-bold uppercase tracking-wider text-[#f4f4ed]/50"
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
