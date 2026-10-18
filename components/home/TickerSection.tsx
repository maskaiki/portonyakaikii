"use client";

export function TickerSection() {
  return (
    <section className="relative bg-[#0A0A0A] text-[#efefe5] py-16 md:py-24 overflow-hidden border-t border-b border-white/10">
      {/* Top Electric Cyan Divider Line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent opacity-70" />

      {/* Topographic Background Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Giant Dual-Line Kinetic Marquee */}
      <div className="relative w-full flex flex-col gap-4 md:gap-6 select-none">
        {/* Row 1: High-Contrast Serif in Electric Blue Gradient (Scrolling Left) */}
        <div className="marquee-row">
          <div className="marquee-track-left">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="font-brier text-5xl md:text-8xl italic bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#0066FF] bg-clip-text text-transparent uppercase tracking-tight flex items-center gap-8"
              >
                <span>DESIGN</span>
                <span className="text-xs font-mono not-italic text-[#00FF88]">✦</span>
                <span>DEVELOP</span>
                <span className="text-xs font-mono not-italic text-[#00d2ff]">✦</span>
                <span>STRATEGIZE</span>
                <span className="text-xs font-mono not-italic text-[#00FF88]">✦</span>
                <span>INNOVATE</span>
                <span className="text-xs font-mono not-italic text-[#00d2ff]">✦</span>
                <span>CREATE</span>
                <span className="text-xs font-mono not-italic text-[#00FF88]">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Alternating Solid & Hollow Outline Sans (Scrolling Right) */}
        <div className="marquee-row">
          <div className="marquee-track-right">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter flex items-center gap-8"
              >
                <span className="text-[#efefe5]">INFORMATICS ENGINEERING</span>
                <span className="w-3 h-3 bg-[#00d2ff]" />
                <span className="text-stroke-editorial">GRAPHIC DESIGN</span>
                <span className="w-3 h-3 bg-[#00FF88]" />
                <span className="text-[#efefe5]">SOCIAL MEDIA STRATEGY</span>
                <span className="w-3 h-3 bg-[#00d2ff]" />
                <span className="text-stroke-editorial">KINETIC INTERFACES</span>
                <span className="w-3 h-3 bg-[#00FF88]" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
