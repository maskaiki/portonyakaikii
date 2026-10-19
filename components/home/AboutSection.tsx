"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SERVICES_PILLARS = [
  {
    num: "01",
    title: "PORTFOLIO & FRONT-END WEB",
    sub: "Custom Interactive Websites",
    desc: "Helping creators, students, and professionals own a standout, interactive portfolio website just like this one — custom-crafted, fast, and responsive.",
  },
  {
    num: "02",
    title: "GRAPHIC DESIGN",
    sub: "Canva Visual Layouts & Posters",
    desc: "Clean social media feeds, posters, event graphics, and visual layouts crafted in Canva to match your personal or brand identity.",
  },
  {
    num: "03",
    title: "VIDEO EDITING",
    sub: "CapCut Short-Form & Motion Cuts",
    desc: "Short-form video cuts, smooth transitions, and engaging Reels or TikTok edits in CapCut to keep your audience watching.",
  },
];

const PERSONAL_HOBBIES = [
  {
    num: "I",
    title: "Photography",
    detail: "Capturing everyday moments, street lighting, moods, and visual perspectives through the lens.",
  },
  {
    num: "II",
    title: "Visual Design",
    detail: "Passionate about typography, editorial layouts, color harmony, and modern digital aesthetics.",
  },
  {
    num: "III",
    title: "Exploring New Things",
    detail: "Always experimenting with new creative tools, AI workflows, and interactive web technologies.",
  },
];

// React Bits Style 3D Tilted Card with Specular Glare
function TiltedCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 18;
    const rotateX = (0.5 - py) * 18;

    gsap.to(el, {
      rotateX,
      rotateY,
      scale: 1.02,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1000,
    });

    setGlare({ x: px * 100, y: py * 100, opacity: 0.35 });
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={`relative will-change-transform ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.8), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

const MANIFESTO_WORDS =
  "I MAKE FRONT-END FOR PEOPLE — TURNING PERSONAL BRANDS INTO INTERACTIVE WEB EXPERIENCES.".split(" ");

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsContainerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (!wordsContainerRef.current) return;
      const wordSpans = wordsContainerRef.current.querySelectorAll(".scrub-word");

      gsap.fromTo(
        wordSpans,
        { opacity: 0.16, y: 12 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: wordsContainerRef.current,
            start: "top 82%",
            end: "bottom 45%",
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#f4f4ed] text-[#111112] py-24 md:py-36 overflow-hidden border-b border-[#111112]/15"
    >
      {/* Full-Width Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 lg:grid-cols-12 px-5 sm:px-10 lg:px-14 xl:px-20 opacity-[0.05]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-[#111112] h-full first:border-l" />
        ))}
      </div>

      {/* Full-Bleed Widescreen Container */}
      <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20 relative z-10">
        
        {/* Full-Width Top Editorial Bar */}
        <div className="flex items-baseline justify-between pb-6 mb-14 border-b border-[#111112]/15">
          <span className="font-display text-xs font-extrabold tracking-[0.2em] text-[#111112]/60 uppercase">
            About &amp; Services
          </span>
          <span className="font-brier italic text-lg text-[#111112]">
            Visual Front-End Creator
          </span>
        </div>

        {/* Full-Width 12-Column Hero Hook with GSAP Scrubbed Word Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-end mb-24">
          <div className="lg:col-span-8">
            <h2
              ref={wordsContainerRef}
              className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-black uppercase tracking-tight text-[#111112] leading-[0.94] flex flex-wrap gap-x-3 gap-y-2"
            >
              {MANIFESTO_WORDS.map((word, i) => {
                const isHighlight = word === "FRONT-END" || word === "INTERACTIVE";
                return (
                  <span
                    key={i}
                    className={`scrub-word inline-block ${
                      isHighlight ? "font-brier italic font-normal text-[#0055FF] lowercase" : ""
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 bg-white/80 backdrop-blur-md border border-[#111112] p-7 sm:p-9 shadow-[10px_10px_0px_#111112]">
            <p className="font-sans text-sm sm:text-base text-[#111112]/80 leading-relaxed">
              I love everything visual. My main focus is helping people own a <strong className="text-[#111112]">cool, standout portfolio website</strong> just like mine — plus graphic design in <strong className="text-[#111112]">Canva</strong> and short-form video editing in <strong className="text-[#111112]">CapCut</strong>.
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-[#111112]/15">
              <span className="font-brier italic text-lg text-[#111112]">
                Available for projects
              </span>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#111112] text-[#f4f4ed] font-display text-xs font-extrabold uppercase tracking-wider hover:bg-[#0055FF] transition-colors"
              >
                <span>Commission Web</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Full-Width 3-Column React Bits 3D Tilted Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-10 mb-28">
          {SERVICES_PILLARS.map((item) => (
            <TiltedCard
              key={item.title}
              className="group p-8 sm:p-10 bg-white/75 border border-[#111112]/15 hover:border-[#111112] transition-colors flex flex-col justify-between min-h-[290px]"
            >
              <div style={{ transform: "translateZ(30px)" }}>
                <div className="flex items-baseline justify-between pb-4 mb-6 border-b border-[#111112]/10">
                  <span className="font-brier italic text-4xl text-[#0055FF]">
                    {item.num}
                  </span>
                  <span className="font-display text-[11px] font-bold uppercase tracking-widest text-[#111112]/50">
                    {item.sub}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#111112] mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#111112]/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </TiltedCard>
          ))}
        </div>

        {/* Full-Width 12-Column Personal Side & 3D Portrait Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center pt-16 border-t border-[#111112]/15">
          {/* Left 5 Cols: 3D Tilted Candid Portrait */}
          <div className="lg:col-span-5">
            <TiltedCard className="relative aspect-[4/4.6] w-full overflow-hidden border-2 border-[#111112] bg-[#111112] shadow-[14px_14px_0px_#111112] group">
              <Image
                src="/assets/about/kaiki-candid.jpg"
                alt="Kaiki — Mohammad Rifky Wicaksana"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div
                style={{ transform: "translateZ(40px)" }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-6 sm:p-8"
              >
                <div>
                  <span className="font-brier italic text-base text-[#f4f4ed]/80 block">
                    Behind the screen
                  </span>
                  <p className="font-display text-xl sm:text-2xl font-black uppercase text-[#f4f4ed]">
                    MOHAMMAD RIFKY WICAKSANA
                  </p>
                </div>
                <span className="font-brier italic text-2xl text-[#f4f4ed]">
                  Kaiki
                </span>
              </div>
            </TiltedCard>
          </div>

          {/* Right 7 Cols: Personal Hobbies Spread Edge-to-Edge */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#111112]/50 block mb-3">
                Personal Side &amp; Interests
              </span>
              <h3 className="font-display text-4xl sm:text-6xl font-black uppercase text-[#111112] leading-[0.94]">
                PHOTOGRAPHY, DESIGN &amp;{" "}
                <span className="font-brier italic font-normal text-[#0055FF]">
                  exploring new things.
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {PERSONAL_HOBBIES.map((hobby) => (
                <TiltedCard
                  key={hobby.title}
                  className="p-6 sm:p-7 bg-white/80 border border-[#111112]/15 hover:border-[#111112] transition-colors"
                >
                  <span className="font-brier italic text-2xl text-[#0055FF] block mb-3">
                    {hobby.num}
                  </span>
                  <h4 className="font-display text-base font-black uppercase text-[#111112] mb-2">
                    {hobby.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#111112]/70 leading-relaxed">
                    {hobby.detail}
                  </p>
                </TiltedCard>
              ))}
            </div>

            <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#111112]/15">
              <blockquote className="font-brier italic text-2xl sm:text-3xl text-[#111112]">
                &ldquo;It doesn&rsquo;t matter where you start, it&rsquo;s how you progress from there.&rdquo;
              </blockquote>
              <span className="font-brier italic text-3xl text-[#0055FF] shrink-0">
                Rifky Wicaksana
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
