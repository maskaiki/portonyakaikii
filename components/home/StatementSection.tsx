"use client";

import { motion } from "framer-motion";

export function StatementSection() {
  return (
    <section className="relative bg-[#282c20] text-[#f4f4ed] py-24 md:py-36 overflow-hidden">
      {/* Subtle topographic contour vector background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="page-shell relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        
        {/* Top Laurel Wreath Emblem (McLaren F1 Style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-8"
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#f4f4ed]/80 mb-2">
            <path
              d="M12 32c-3-4-4-10-2-16 4 4 6 8 6 14M36 32c3-4 4-10 2-16-4 4-6 8-6 14M24 40v-8"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="24" cy="20" r="5" stroke="#00d2ff" strokeWidth="2.5" />
          </svg>
          <span className="font-display text-[11px] font-black uppercase tracking-[0.2em] text-[#f4f4ed]/60">
            INFORMATICS ENGINEERING // UM
          </span>
        </motion.div>

        {/* The Signature Alternating Kinetic Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-[6.5rem] font-black uppercase tracking-tight text-[#f4f4ed] leading-[0.92] select-none"
        >
          <span className="font-brier italic font-normal bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent">BUILDING</span> SYSTEMS,
          <br />
          FIGHTING FOR <span className="font-brier italic font-normal bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent">WINS</span>,
          <br />
          BRINGING IT ALL IN
          <br />
          ALL WAYS. DEFINING A
          <br />
          <span className="font-brier italic font-normal bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent">LEGACY</span> IN TECHNOLOGY
          <br />
          ON AND OFF THE TRACK.
        </motion.h2>

        {/* Sub-description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 font-sans text-sm md:text-lg text-white/70 max-w-xl font-normal leading-relaxed"
        >
          Pushing performance boundaries across full-stack software, machine learning architectures, and visual storytelling with deliberate execution.
        </motion.p>
      </div>
    </section>
  );
}
