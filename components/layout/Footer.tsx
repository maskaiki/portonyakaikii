"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import WebThreads from "@/components/shared/WebThreads";

const CORE_PILLARS = [
  "ANTIGRAVITY",
  "GOOGLE AI STUDIO",
  "NEXT.JS & TAILWIND",
  "GITHUB & VERCEL",
  "CANVA",
  "CAPCUT",
];

export function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "mwrifky@gmail.com";

  const bustRef = useRef<HTMLDivElement>(null);
  const bgTitleRef = useRef<HTMLHeadingElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    if (bustRef.current) {
      gsap.to(bustRef.current, {
        x: nx * 36,
        y: ny * 24,
        rotateY: nx * 18,
        rotateX: -ny * 14,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    }

    if (bgTitleRef.current) {
      gsap.to(bgTitleRef.current, {
        x: -nx * 28,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  return (
    <footer
      id="contact"
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#f4f4ed] pt-10 pb-8 overflow-hidden scroll-mt-10 border-t border-[#111112]/15"
    >
      {/* Full-Width Edge-to-Edge Outer Padding */}
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="relative rounded-[2rem] bg-[#111112] text-[#f4f4ed] overflow-hidden border border-[#111112]">
          {/* Topographic Lines Inside Footer */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage:
                "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Interactive WebGL2 WebThreads Layer across the Footer Horizon */}
          <div className="absolute inset-x-0 bottom-0 h-[460px] sm:h-[520px] z-[2]">
            <WebThreads
              colors={["#0055FF", "#38bdf8", "#60a5fa", "#f4f4ed"]}
              coreColor="#ffffff"
              threadCount={10}
              speed={0.22}
              frequency={4.5}
              spread={0.26}
              taper={0.9}
              position={0.52}
              pinch={0.5}
              nodes={2}
              glow={0.026}
              falloff={0.6}
              thickness={1.2}
              brightness={0.85}
              opacity={0.95}
              depth={0.65}
              pulses={0.35}
              mirror={true}
              shimmer={true}
              fade={0.14}
              grain={0.04}
              intro={true}
              mouseInteraction={true}
              mouseStrength={0.65}
              pulseOnClick={true}
            />
          </div>

          <div className="relative z-10 pt-16 pb-12 px-6 sm:px-12 lg:px-16 xl:px-24 flex flex-col items-center pointer-events-none">
            <span className="font-display text-xs font-extrabold tracking-[0.2em] text-[#f4f4ed]/70 uppercase mb-3">
              Contact &amp; Collab
            </span>

            <div className="mb-2 flex flex-col items-center select-none">
              <span className="font-brier italic text-3xl sm:text-5xl text-[#0055FF]">
                Rifky Wicaksana
              </span>
            </div>

            {/* Giant Parallax Headline */}
            <h2
              ref={bgTitleRef}
              className="font-display text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-center text-[#f4f4ed] mb-4 will-change-transform"
            >
              LET&rsquo;S BUILD YOUR{" "}
              <span className="font-brier italic font-normal text-[#0055FF]">
                portfolio
              </span>{" "}
              WEB.
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#f4f4ed]/75 max-w-xl text-center mb-8">
              Want a standout front-end portfolio website like this, Canva
              graphic design, or CapCut video edits? Copy my email below or
              reach out on socials.
            </p>

            {/* Copy Gmail + Direct Mailto Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 pointer-events-auto">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#f4f4ed] hover:bg-[#0055FF] hover:text-white text-[#111112] font-display text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                aria-label="Copy email address"
              >
                <span>{copied ? "Copied: mwrifky@gmail.com" : email}</span>
              </button>

              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-7 py-4 bg-[#18181a] border border-white/20 hover:border-white text-xs font-display font-extrabold uppercase tracking-wider !text-[#f4f4ed] transition-colors"
              >
                <span>Send Email</span>
                <span>↗</span>
              </a>
            </div>

            {/* Full-Width Three-Column Layout: Left Navigation | Center 3D Bust | Right Socials */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 items-center gap-8 mb-12 pt-12 border-t border-white/10">
              {/* Left Column: SECTIONS */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left pointer-events-auto">
                <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#f4f4ed]/65 mb-4">
                  Navigation
                </span>
                <nav className="flex flex-col gap-2">
                  <a
                    href="#hero"
                    className="font-display text-2xl md:text-4xl font-black uppercase !text-[#f4f4ed] hover:!text-[#0055FF] hover:translate-x-2 transition-all"
                  >
                    Explore
                  </a>
                  <a
                    href="#about"
                    className="font-display text-2xl md:text-4xl font-black uppercase !text-[#f4f4ed] hover:!text-[#0055FF] hover:translate-x-2 transition-all"
                  >
                    About
                  </a>
                  <a
                    href="#work"
                    className="font-display text-2xl md:text-4xl font-black uppercase !text-[#f4f4ed] hover:!text-[#0055FF] hover:translate-x-2 transition-all"
                  >
                    Work
                  </a>
                  <a
                    href="#skills"
                    className="font-display text-2xl md:text-4xl font-black uppercase !text-[#f4f4ed] hover:!text-[#0055FF] hover:translate-x-2 transition-all"
                  >
                    Arsenal
                  </a>
                  <a
                    href="#journey"
                    className="font-display text-2xl md:text-4xl font-black uppercase !text-[#f4f4ed] hover:!text-[#0055FF] hover:translate-x-2 transition-all"
                  >
                    Journey
                  </a>
                </nav>
              </div>

              {/* Center Column: 3D Parallax Kaiki Bust framed by WebThreads */}
              <div
                className="flex flex-col items-center justify-center relative"
                style={{ perspective: "1000px" }}
              >
                <div
                  ref={bustRef}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative w-64 h-64 md:w-80 md:h-80 select-none will-change-transform"
                >
                  <Image
                    src="/assets/shared/kaiki-footer.webp"
                    alt="Mohammad Rifky Wicaksana (Kaiki)"
                    fill
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-contain filter grayscale contrast-125"
                  />
                </div>
              </div>

              {/* Right Column: SOCIALS */}
              <div className="flex flex-col items-center md:items-end text-center md:text-right pointer-events-auto">
                <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#f4f4ed]/65 mb-4">
                  Socials
                </span>
                <div className="flex flex-col gap-4">
                  <a
                    href="https://instagram.com/mrifkywicaksana"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col items-center md:items-end !text-[#f4f4ed] hover:!text-[#0055FF] transition-colors"
                  >
                    <span className="font-display text-xl md:text-3xl font-black uppercase leading-none group-hover:-translate-x-2 transition-transform">
                      Instagram ↗
                    </span>
                    <span className="font-brier italic text-sm text-[#f4f4ed]/75 mt-1">
                      @mrifkywicaksana
                    </span>
                  </a>

                  <a
                    href="https://github.com/maskaiki"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col items-center md:items-end !text-[#f4f4ed] hover:!text-[#0055FF] transition-colors"
                  >
                    <span className="font-display text-xl md:text-3xl font-black uppercase leading-none group-hover:-translate-x-2 transition-transform">
                      GitHub ↗
                    </span>
                    <span className="font-brier italic text-sm text-[#f4f4ed]/75 mt-1">
                      maskaiki
                    </span>
                  </a>

                  <a
                    href="https://www.linkedin.com/search/results/all/?keywords=Mohammad%20Rifky%20Wicaksana"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col items-center md:items-end !text-[#f4f4ed] hover:!text-[#0055FF] transition-colors"
                  >
                    <span className="font-display text-xl md:text-3xl font-black uppercase leading-none group-hover:-translate-x-2 transition-transform">
                      LinkedIn ↗
                    </span>
                    <span className="font-brier italic text-sm text-[#f4f4ed]/75 mt-1">
                      Mohammad Rifky Wicaksana
                    </span>
                  </a>

                  <div className="flex flex-col items-center md:items-end text-[#f4f4ed]/60">
                    <span className="font-display text-xl md:text-3xl font-black uppercase leading-none">
                      TikTok
                    </span>
                    <span className="font-brier italic text-xs mt-1">
                      Coming soon
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Core Platforms Strip */}
            <div className="w-full pt-8 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
              {CORE_PILLARS.map((pillar, i) => (
                <span
                  key={i}
                  className="font-display text-[11px] font-bold tracking-[0.18em] text-[#f4f4ed]/70 uppercase"
                >
                  {pillar}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Back to Top */}
      <div className="w-full px-6 sm:px-12 mt-5 flex flex-col sm:flex-row items-center justify-between text-[#111112]/80 font-display text-[11px] font-extrabold uppercase tracking-wider">
        <span>© 2026 KAIKI — MOHAMMAD RIFKY WICAKSANA</span>
        <button
          onClick={scrollToTop}
          className="mt-2 sm:mt-0 flex items-center gap-1.5 hover:text-[#0055FF] transition-colors cursor-pointer"
        >
          <span>Back to Top</span>
          <span>↑</span>
        </button>
      </div>
    </footer>
  );
}
