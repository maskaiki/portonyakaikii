"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const STATS = [
  {
    value: "20+",
    label: "COMPLETED PROJECTS",
    sub: "Design, code & social campaigns",
    accent: "#00d2ff",
  },
  {
    value: "100%",
    label: "CRAFT & PRECISION",
    sub: "From pixel to production codebase",
    accent: "#00FF88",
  },
  {
    value: "3+",
    label: "YEARS PRACTICE",
    sub: "Engineering & visual freelancing",
    accent: "#38bdf8",
  },
];

const EDITORIAL_PHOTOS = [
  {
    tag: "MALANG, 2024",
    title: "System Architecture & Lab Research",
    img: "/assets/shared/68302ff5ff89a9a4afb8c19e_ln-home-helm-large.webp",
    aspect: "aspect-[4/5]",
    className: "md:translate-y-8",
  },
  {
    tag: "SURABAYA TECH EXPO, 2024",
    title: "Digital Infrastructure & Tech Design",
    img: "/assets/hero/hero-workspace-v1.jpg",
    aspect: "aspect-square",
    className: "md:-translate-y-8",
  },
  {
    tag: "CREATIVE LAB, 2025",
    title: "Brand Systems & Kinetic Exploration",
    img: "/assets/hero/hero-sunset-v1.jpg",
    aspect: "aspect-[16/10]",
    className: "md:translate-y-4",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-[#0d0f0c] text-[#efefe5] py-24 md:py-36 overflow-hidden border-b border-white/10"
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

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Clean Section Label: Just ABOUT (No pills, no dots, no dashes) */}
        <div className="mb-8">
          <span className="font-display text-xs sm:text-sm font-black tracking-[0.25em] text-[#00d2ff] uppercase">
            ABOUT
          </span>
        </div>

        {/* Top Story Header & Bio Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Main Statement Hook */}
          <div className="lg:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#efefe5] leading-[1.05]"
            >
              I&rsquo;M A SEMESTER 5–6 INFORMATICS ENGINEERING STUDENT WHO{" "}
              <span className="font-brier italic font-normal bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent">
                BLURS THE LINE
              </span>{" "}
              BETWEEN CODE AND CANVAS.
            </motion.h2>
          </div>

          {/* Bio Elaboration Narrative */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-sans text-base text-[#8A8A7A] leading-relaxed"
            >
              With hands-on experience as a freelance graphic designer and social media strategist, I bring a rare mix of technical precision and creative intuition to every project.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-sans text-base text-[#efefe5] font-semibold border-l-2 border-[#00d2ff] pl-4"
            >
              I don&rsquo;t just build — I craft memorable digital experiences.
            </motion.p>
          </div>

        </div>

        {/* 3 Animated Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="group relative p-8 rounded-2xl bg-[#141414]/90 border border-white/10 hover:border-[#00d2ff]/60 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:-translate-y-1"
            >
              <div className="flex items-baseline justify-between mb-2">
                <span
                  className="font-display text-5xl sm:text-6xl font-black tracking-tight"
                  style={{ color: stat.accent }}
                >
                  {stat.value}
                </span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.accent }} />
              </div>
              <h3 className="font-display text-sm font-black uppercase tracking-wider text-[#efefe5] mb-1">
                {stat.label}
              </h3>
              <p className="font-sans text-xs text-[#8A8A7A]">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Editorial Quote with Signature */}
        <div className="max-w-2xl ml-auto mb-16 text-right md:pr-4">
          <motion.blockquote
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-brier text-2xl sm:text-3xl md:text-4xl text-[#efefe5] leading-snug"
          >
            &ldquo;It doesn&rsquo;t matter <span className="font-bold underline decoration-[#00d2ff]">where</span> you start, it&rsquo;s <span className="font-bold bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent">how</span> you progress from there.&rdquo;
          </motion.blockquote>

          <div className="flex justify-end mt-4">
            <div className="relative w-40 h-16">
              <Image
                src="/assets/shared/signature-lime.svg"
                alt="Kaiki Signature"
                fill
                className="object-contain filter drop-shadow-[0_2px_12px_rgba(0,210,255,0.6)]"
              />
            </div>
          </div>
        </div>

        {/* Asymmetric Photo Grid with Location Tags */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-center">
          {EDITORIAL_PHOTOS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className={`flex flex-col group ${item.className}`}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff]" />
                <span className="font-display text-[10px] font-bold uppercase tracking-widest text-[#f4f4ed]/70 group-hover:text-[#00d2ff] transition-colors">
                  {item.tag}
                </span>
              </div>

              <div
                className={`relative ${item.aspect} w-full rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shadow-xl group-hover:border-[#00d2ff]/70 transition-all duration-500`}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover filter contrast-[1.05] grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="font-sans text-xs text-white/90 font-medium">
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
