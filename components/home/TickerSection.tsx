"use client";

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

      {/* Giant Dual-Line Kinetic Marquee */}
      <div className="relative w-full flex flex-col gap-4 md:gap-8 select-none">
        
        {/* Row 1: High-Contrast Serif in Electric Blue Gradient (Scrolling Left) */}
        <div className="marquee-row">
          <div className="marquee-track-left">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="font-brier text-5xl md:text-8xl italic bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent uppercase tracking-tight flex items-center gap-8"
              >
                <span>DESIGN</span>
                <span className="w-3.5 h-3.5 rounded-full bg-white/20" />
                <span>DEVELOP</span>
                <span className="w-3.5 h-3.5 rounded-full bg-white/20" />
                <span>STRATEGIZE</span>
                <span className="w-3.5 h-3.5 rounded-full bg-white/20" />
                <span>INNOVATE</span>
                <span className="w-3.5 h-3.5 rounded-full bg-white/20" />
                <span>CREATE</span>
                <span className="w-3.5 h-3.5 rounded-full bg-white/20" />
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Massive Bold Condensed Sans in Off-White (Scrolling Right) */}
        <div className="marquee-row">
          <div className="marquee-track-right">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="font-display text-5xl md:text-8xl font-black text-[#f4f4ed]/90 uppercase tracking-tighter flex items-center gap-8"
              >
                <span>INFORMATICS ENGINEERING</span>
                <span className="w-3 h-3 bg-[#00d2ff]" />
                <span>GRAPHIC DESIGN</span>
                <span className="w-3 h-3 bg-[#00FF88]" />
                <span>SOCIAL MEDIA STRATEGY</span>
                <span className="w-3 h-3 bg-[#00d2ff]" />
                <span>KINETIC INTERFACES</span>
                <span className="w-3 h-3 bg-[#00FF88]" />
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
