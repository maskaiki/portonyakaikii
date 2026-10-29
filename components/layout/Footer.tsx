"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import WebThreads from "@/components/shared/WebThreads";
import CloverMark from "@/components/shared/CloverMark";

const CORE_PILLARS = [
  "ANTIGRAVITY",
  "GOOGLE AI STUDIO",
  "NEXT.JS & TAILWIND",
  "GITHUB & VERCEL",
  "CANVA",
  "CAPCUT",
];

const NAV_LINKS = [
  { num: "01", label: "Explore", href: "#hero" },
  { num: "02", label: "About", href: "#about" },
  { num: "03", label: "Work", href: "#work" },
  { num: "04", label: "Arsenal", href: "#skills" },
  { num: "05", label: "Journey", href: "#journey" },
];

export function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "mwrifky@gmail.com";

  const cloverRef = useRef<HTMLDivElement>(null);
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

    if (cloverRef.current) {
      gsap.to(cloverRef.current, {
        x: -nx * 20,
        y: -ny * 16,
        rotateZ: nx * 12,
        duration: 0.65,
        ease: "power2.out",
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
          <div className="absolute inset-x-0 bottom-0 h-[520px] sm:h-[580px] z-[2]">
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
              opacity={0.92}
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

            {/* Full-Width Three-Column Layout: Left Navigation | Center Info & Details | Right Socials */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 items-center gap-10 md:gap-8 mb-12 pt-12 border-t border-white/10">
              {/* Left Column: SITEMAP / NAVIGATION */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left pointer-events-auto">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#38bdf8] mb-5">
                  {"// 01 NAVIGATION"}
                </span>
                <nav className="flex flex-col gap-3 sm:gap-4">
                  {NAV_LINKS.map((item) => (
                    <a
                      key={item.num}
                      href={item.href}
                      className="group flex items-baseline gap-3.5 font-display text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black uppercase tracking-tight !text-[#f4f4ed] hover:!text-[#38bdf8] hover:translate-x-2 transition-all drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
                    >
                      <span className="font-mono text-xs sm:text-sm font-semibold text-[#38bdf8]/60 group-hover:text-[#38bdf8] transition-colors">
                        {item.num}
                      </span>
                      <span>{item.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Center Column: CloverMark (PlasmaWave) Halo & Keterangan Status */}
              <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 py-4 pointer-events-auto">
                {/* Live Availability Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] font-display text-xs font-bold tracking-widest uppercase mb-5 backdrop-blur-sm drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
                  </span>
                  <span>Available for Work &amp; Collab</span>
                </div>

                {/* Masked PlasmaWave CloverMark Emblem */}
                <div
                  ref={cloverRef}
                  className="relative flex items-center justify-center will-change-transform opacity-95 drop-shadow-[0_0_40px_rgba(0,85,255,0.45)] my-2"
                >
                  <CloverMark
                    size={210}
                    className="w-[170px] sm:w-[195px] md:w-[220px]"
                    plasmaProps={{
                      color1: "#0055FF",
                      color2: "#38bdf8",
                      color3: "#f4f4ed",
                      backgroundColor: "#0c0b10",
                      speed: 0.9,
                      scale: 2.1,
                      intensity: 1.25,
                    }}
                  />
                </div>

                {/* Keterangan Details */}
                <div className="mt-5 flex flex-col items-center gap-2 max-w-sm drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  <span className="font-display text-sm sm:text-base font-extrabold uppercase tracking-widest text-[#f4f4ed]">
                    Mohammad Rifky Wicaksana
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[#f4f4ed]/75 leading-relaxed">
                    Front-End Engineering &bull; Next.js 16 &bull; Creative WebGL &bull; Canva &bull; CapCut
                  </p>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#38bdf8] tracking-wider uppercase mt-1">
                    <span>Malang &amp; Surabaya, ID</span>
                    <span className="text-white/30">&bull;</span>
                    <span>UTC+7 (WIB)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: SOCIALS & CHANNELS */}
              <div className="flex flex-col items-center md:items-end text-center md:text-right pointer-events-auto">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#38bdf8] mb-5">
                  {"// 02 CONNECT & SOCIALS"}
                </span>
                <div className="flex flex-col gap-5 sm:gap-6">
                  <a
                    href="https://instagram.com/mrifkywicaksana"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col items-center md:items-end !text-[#f4f4ed] hover:!text-[#38bdf8] transition-colors"
                  >
                    <span className="font-display text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black uppercase leading-none group-hover:-translate-x-2 transition-transform drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                      Instagram ↗
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-semibold text-[#38bdf8] mt-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      @mrifkywicaksana
                    </span>
                  </a>

                  <a
                    href="https://github.com/maskaiki"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col items-center md:items-end !text-[#f4f4ed] hover:!text-[#38bdf8] transition-colors"
                  >
                    <span className="font-display text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black uppercase leading-none group-hover:-translate-x-2 transition-transform drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                      GitHub ↗
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-semibold text-[#38bdf8] mt-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      maskaiki
                    </span>
                  </a>

                  <a
                    href="https://www.linkedin.com/search/results/all/?keywords=Mohammad%20Rifky%20Wicaksana"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col items-center md:items-end !text-[#f4f4ed] hover:!text-[#38bdf8] transition-colors"
                  >
                    <span className="font-display text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black uppercase leading-none group-hover:-translate-x-2 transition-transform drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                      LinkedIn ↗
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-semibold text-[#38bdf8] mt-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      Mohammad Rifky Wicaksana
                    </span>
                  </a>

                  <div className="flex flex-col items-center md:items-end text-[#f4f4ed]/70">
                    <span className="font-display text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black uppercase leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                      TikTok
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-[#f4f4ed]/50 mt-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      @maskaiki &bull; Coming soon
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
                  className="font-display text-xs sm:text-sm font-black tracking-[0.22em] text-[#f4f4ed]/85 hover:text-[#38bdf8] transition-colors uppercase"
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
