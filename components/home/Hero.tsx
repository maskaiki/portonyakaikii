"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section
      className="hero-section relative min-h-screen w-full bg-[#f4f4ed] text-[#111112] overflow-x-hidden flex flex-col justify-between pt-20 pb-8 select-none"
      style={{
        backgroundImage: "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Cyan/Blue subtle edge vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(56,189,248,0.18)]" />

      {/* Main Hero Stage: Full width with side-by-side alignment, generous padding, zero vertical clipping */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 pb-16 md:pb-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Kinetic Headline (Flush left, zero clipping, fully rendered glyphs) */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem] font-black uppercase tracking-tight text-[#111112] leading-[1.08] select-none text-left py-4 overflow-visible"
            >
              BUILDING{" "}
              <span className="inline-block font-brier italic font-bold bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent px-1.5 py-1 overflow-visible">
                SYSTEMS
              </span>
              .
              <br />
              EXPLORING{" "}
              <span className="inline-block font-brier italic font-bold bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent px-1.5 py-1 overflow-visible">
                IDEAS
              </span>
              .
              <br />
              TELLING{" "}
              <span className="inline-block font-brier italic font-bold bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent px-1.5 py-1 overflow-visible">
                STORIES
              </span>
              .
            </motion.h1>
          </div>

          {/* Right Column: Informatics Engineering (Bold & Large, flush right, text only) */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end text-left lg:text-right pt-2 lg:pt-4">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#111112] leading-[0.95]">
                INFORMATICS <br className="hidden lg:block" />
                ENGINEERING
              </h2>
              <p className="font-display text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.2em] text-[#00d2ff] mt-2">
                × CREATIVE TECHNOLOGY
              </p>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Floating Bottom Left Cyber Notched Badge (Lando Austin GP Style) */}
      <div className="absolute bottom-6 left-6 md:left-12 z-20">
        <div className="w-36 md:w-40 bg-[#efefe5]/95 backdrop-blur-md border border-black/15 rounded-xl p-3 shadow-lg flex flex-col items-center text-center">
          <span className="font-display text-[8px] font-black uppercase tracking-widest text-black/60 mb-1">
            STATUS // 2026
          </span>
          
          {/* Circuit SVG Loop */}
          <div className="w-16 h-8 my-0.5">
            <svg viewBox="0 0 100 50" fill="none" className="w-full h-full text-black">
              <path
                d="M15 25 C15 10, 35 10, 50 25 C65 40, 85 40, 85 25 C85 10, 65 10, 50 25 C35 40, 15 40, 15 25 Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          <span className="font-display text-[11px] font-black uppercase tracking-wider text-black">
            INFORMATICS GP
          </span>
          
          <div className="w-full my-1 border-t border-black/10" />

          {/* Laurel Wreath with Tech Badge */}
          <div className="flex items-center justify-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#282c20]">
              <path
                d="M6 16c-1.5-2-2-5-1-8 2 2 3 4 3 7M18 16c1.5-2 2-5 1-8-2 2-3 4-3 7M12 20v-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-display text-[8px] font-bold tracking-tight text-black/70">
              UM SINCE 2022
            </span>
          </div>
        </div>
      </div>

      {/* Floating Bottom Right Action Links */}
      <div className="absolute bottom-6 right-6 md:right-12 z-20 flex items-center gap-3">
        <Link
          href="/projects"
          style={{ color: "#ffffff" }}
          className="font-display text-xs md:text-sm font-black uppercase tracking-wider bg-gradient-to-r from-[#00d2ff] via-[#1d4ed8] to-[#0a192f] hover:from-[#38bdf8] hover:to-[#1e3a8a] text-white px-5 py-2.5 rounded-lg shadow-[0_4px_16px_rgba(0,210,255,0.4)] transition-all transform hover:-translate-y-0.5"
        >
          SELECTED WORK ↓
        </Link>
        <Link
          href="/about"
          style={{ color: "#111112" }}
          className="font-display text-xs md:text-sm font-bold uppercase tracking-wider hover:underline px-2 py-1"
        >
          PROFILE →
        </Link>
      </div>
    </section>
  );
}
