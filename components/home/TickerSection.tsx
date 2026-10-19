"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function TickerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const skewSetter1 = gsap.quickTo(row1Ref.current, "skewX", { duration: 0.3, ease: "power3.out" });
      const skewSetter2 = gsap.quickTo(row2Ref.current, "skewX", { duration: 0.3, ease: "power3.out" });
      const xSetter1 = gsap.quickTo(row1Ref.current, "x", { duration: 0.5, ease: "power2.out" });
      const xSetter2 = gsap.quickTo(row2Ref.current, "x", { duration: 0.5, ease: "power2.out" });

      let scrollOffset = 0;

      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const skew = gsap.utils.clamp(-14, 14, velocity / -220);
          scrollOffset = gsap.utils.clamp(-180, 180, velocity / -25);

          skewSetter1(skew);
          skewSetter2(-skew);
          xSetter1(scrollOffset);
          xSetter2(-scrollOffset);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#111112] text-[#f4f4ed] py-16 md:py-24 overflow-hidden border-t border-b border-white/10"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative w-full flex flex-col gap-4 md:gap-6 select-none">
        {/* Row 1: Editorial Serif Italic */}
        <div className="marquee-row">
          <div ref={row1Ref} className=" will-change-transform">
            <div className="marquee-track-left">
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="font-brier text-5xl md:text-8xl italic text-[#f4f4ed] uppercase tracking-tight flex items-center gap-10"
                >
                  <span>Design</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0055FF]" />
                  <span>Develop</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f4f4ed]/25" />
                  <span>Create</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0055FF]" />
                  <span>Explore</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f4f4ed]/25" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Bold Display Sans */}
        <div className="marquee-row">
          <div ref={row2Ref} className="will-change-transform">
            <div className="marquee-track-right">
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter flex items-center gap-10"
                >
                  <span className="text-[#f4f4ed]">FRONT-END WEB</span>
                  <span className="w-3 h-3 bg-[#0055FF]" />
                  <span className="text-stroke-editorial">GRAPHIC DESIGN</span>
                  <span className="w-3 h-3 bg-[#0055FF]" />
                  <span className="text-[#f4f4ed]">VIDEO EDITING</span>
                  <span className="w-3 h-3 bg-[#0055FF]" />
                  <span className="text-stroke-editorial">VISUAL STORYTELLING</span>
                  <span className="w-3 h-3 bg-[#0055FF]" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
