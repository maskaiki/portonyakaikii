"use client";

import Image from "next/image";

export function TickerSection() {
  return (
    <section className="relative bg-[#282c20] text-[#f4f4ed] py-20 overflow-hidden border-t border-b border-white/10">
      {/* Topographic Background Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Message Badge at Top */}
      <div className="page-shell flex flex-col items-center mb-10 relative z-10">
        <div className="flex items-center gap-2.5 px-3 py-1 rounded-full border border-[#00d2ff]/40 bg-[#0a192f]/80 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse" />
          <span className="font-display text-[10px] font-black uppercase tracking-widest text-[#00d2ff]">
            MESSAGE FROM RIFKY
          </span>
        </div>
      </div>

      {/* Giant Dual-Line Kinetic Marquee */}
      <div className="relative w-full flex flex-col gap-2 select-none">
        
        {/* Row 1: High-Contrast Serif in Electric Blue Gradient (Scrolling Left) */}
        <div className="marquee-row">
          <div className="marquee-track-left">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="font-brier text-5xl md:text-8xl italic bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent uppercase tracking-tight flex items-center gap-8"
              >
                <span>CODE AT SCALE</span>
                <span className="w-4 h-4 rounded-full bg-white/20" />
                <span>SYSTEMS THINKING</span>
                <span className="w-4 h-4 rounded-full bg-white/20" />
                <span>VISUAL CRAFT</span>
                <span className="w-4 h-4 rounded-full bg-white/20" />
              </span>
            ))}
          </div>
        </div>

        {/* Floating Center Studio Card */}
        <div className="my-[-2.5rem] relative z-20 mx-auto w-48 h-32 md:w-64 md:h-40 rounded-xl overflow-hidden border-2 border-[#00d2ff]/70 shadow-[0_12px_40px_rgba(0,210,255,0.25)] transform rotate-1 hover:rotate-0 transition-transform duration-300">
          <Image
            src="/assets/shared/68302ff5ff89a9a4afb8c19e_ln-home-helm-large.webp"
            alt="Studio Portrait"
            fill
            className="object-cover filter contrast-[1.1] grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
            <span className="font-display text-[9px] font-bold text-[#00d2ff] uppercase tracking-wider">
              MALANG STUDIO // 2026
            </span>
          </div>
        </div>

        {/* Row 2: Massive Bold Condensed Sans in Off-White (Scrolling Right) */}
        <div className="marquee-row">
          <div className="marquee-track-right">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="font-display text-6xl md:text-9xl font-black text-[#f4f4ed]/90 uppercase tracking-tighter flex items-center gap-8"
              >
                <span>SOFTWARE</span>
                <span className="w-3 h-3 bg-[#00d2ff]" />
                <span>ARTIFICIAL INTELLIGENCE</span>
                <span className="w-3 h-3 bg-[#00d2ff]" />
                <span>BLOCKCHAIN</span>
                <span className="w-3 h-3 bg-[#00d2ff]" />
                <span>INFORMATICS</span>
                <span className="w-3 h-3 bg-[#00d2ff]" />
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
