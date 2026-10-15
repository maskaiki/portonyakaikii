"use client";

import { motion } from "framer-motion";

export function ManifestoSection() {
  return (
    <section className="relative bg-[#0d0f0c] text-[#efefe5] py-28 md:py-40 overflow-hidden border-t border-b border-white/10 select-none">
      {/* Topographic line art backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Electric ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-[#0066FF]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-12 text-center relative z-10 flex flex-col items-center">
        
        {/* Laurel / Technologist Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-12 h-12 rounded-full border border-[#00d2ff]/40 bg-[#141414] flex items-center justify-center text-[#00d2ff] mb-3 shadow-[0_0_20px_rgba(0,210,255,0.3)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-display text-[11px] font-black uppercase tracking-[0.25em] text-[#8A8A7A]">
            THE MANIFESTO // 2026
          </span>
        </motion.div>

        {/* The Bold Giant Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-brier text-3xl sm:text-5xl md:text-7xl lg:text-8xl italic font-normal text-[#efefe5] leading-[1.08]"
        >
          &ldquo;Lines of code give{" "}
          <span className="underline decoration-[#00d2ff] underline-offset-8">structure</span> to thought.
          <br />
          Design gives it a{" "}
          <span className="font-bold bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent">
            soul
          </span>
          .&rdquo;
        </motion.h2>

        {/* Signature Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex items-center gap-3"
        >
          <span className="w-8 h-[1px] bg-[#00d2ff]" />
          <span className="font-display text-sm md:text-base font-black tracking-widest uppercase text-[#00d2ff]">
            KAIKI — MOHAMMAD RIFKY WICAKSANA
          </span>
          <span className="w-8 h-[1px] bg-[#00d2ff]" />
        </motion.div>

      </div>
    </section>
  );
}
