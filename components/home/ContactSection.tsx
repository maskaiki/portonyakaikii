"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "rifkywicaksana@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 lg:py-36 bg-[#0A0A0A] text-[#EFEFE5] border-t border-[#1F1F1F] overflow-hidden"
    >
      {/* Topographic line art backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Atmospheric Electric Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0066FF]/12 blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Section Header Badge */}
        <div className="flex items-center gap-3 mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#2A2A2A] text-xs font-mono tracking-widest text-[#00d2ff] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse" />
            05 // LET&rsquo;S CONNECT
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        {/* Center CTA Box */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Status Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141414] border border-white/10 text-xs font-mono text-[#00FF88] uppercase tracking-wider mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
            AVAILABLE FOR SELECT COMMISSIONS &amp; COLLABORATIONS
          </motion.div>

          {/* Main Giant Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#EFEFE5] leading-[0.95] mb-8"
          >
            GOT A PROJECT? <br />
            <span className="font-brier italic font-normal bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent">
              LET&rsquo;S MAKE IT HAPPEN.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-sans text-base sm:text-lg text-[#8A8A7A] max-w-2xl leading-relaxed mb-12"
          >
            Whether you need a complete visual identity system, custom web architecture, or high-retention short-form media strategy — let&rsquo;s talk and build something exceptional.
          </motion.p>

          {/* Action CTAs: Direct Mailto + Copy Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#00d2ff] via-[#1d4ed8] to-[#0a192f] hover:from-[#38bdf8] hover:to-[#1e3a8a] text-white font-display text-sm font-black uppercase tracking-wider shadow-[0_4px_24px_rgba(0,210,255,0.4)] transition-all transform hover:-translate-y-1 group"
            >
              <span>START A CONVERSATION</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[#141414] border border-[#2A2A2A] hover:border-[#00d2ff] text-xs font-mono font-bold tracking-wider text-[#EFEFE5] hover:text-[#00d2ff] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              aria-label="Copy email address"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>{copied ? "COPIED TO CLIPBOARD!" : email}</span>
            </button>
          </motion.div>

          {/* Social Channels Row */}
          <div className="w-full pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-[#8A8A7A]">
              FIND KAIKI ONLINE
            </span>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="font-display text-sm font-bold uppercase tracking-wider text-[#EFEFE5] hover:text-[#00d2ff] transition-colors flex items-center gap-1 group"
              >
                <span>INSTAGRAM</span>
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="font-display text-sm font-bold uppercase tracking-wider text-[#EFEFE5] hover:text-[#00d2ff] transition-colors flex items-center gap-1 group"
              >
                <span>LINKEDIN</span>
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
              <a
                href="https://github.com/maskaiki"
                target="_blank"
                rel="noreferrer"
                className="font-display text-sm font-bold uppercase tracking-wider text-[#EFEFE5] hover:text-[#00d2ff] transition-colors flex items-center gap-1 group"
              >
                <span>GITHUB</span>
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
