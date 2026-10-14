"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type ProjectCategory = "all" | "code" | "design" | "social";

export interface ProjectItem {
  id: string;
  title: string;
  category: "code" | "design" | "social";
  categoryLabel: string;
  year: string;
  description: string;
  image: string;
  techs: string[];
  ctaLabel: string;
  ctaLink: string;
  accentColor: string; // for category highlight
}

const PROJECTS: ProjectItem[] = [
  {
    id: "hyperion",
    title: "Hyperion Design System & Web Engine",
    category: "code",
    categoryLabel: "CODE / DEV",
    year: "2025",
    description:
      "High-performance kinetic interaction platform built for modern creative engineering teams, featuring dark kinetic tokens, WebGL shaders, and micro-interactions.",
    image: "/assets/projects/project-1-hyperion.webp",
    techs: ["Next.js", "WebGL", "Tailwind", "TypeScript"],
    ctaLabel: "LIVE REPOSITORY",
    ctaLink: "https://github.com/maskaiki",
    accentColor: "#00d2ff",
  },
  {
    id: "neon-tokyo",
    title: "Neon Tokyo Editorial Visual Identity",
    category: "design",
    categoryLabel: "GRAPHIC DESIGN",
    year: "2024",
    description:
      "Comprehensive brand identity, typography poster series, and experimental packaging concept blending Japanese cyberpunk aesthetics with Swiss typographic rigor.",
    image: "/assets/projects/project-2-neontokyo.webp",
    techs: ["Figma", "Illustrator", "Photoshop", "Brand System"],
    ctaLabel: "BEHANCE CASE",
    ctaLink: "#",
    accentColor: "#00FF88",
  },
  {
    id: "viral-growth",
    title: "Viral Growth Engine & Campaign Architecture",
    category: "social",
    categoryLabel: "SOCIAL STRATEGY",
    year: "2024",
    description:
      "End-to-end multi-platform content strategy driving over 120,000 organic engagements via micro-video storytelling, kinetic reel editing, and hook analytics.",
    image: "/assets/projects/project-3-growth.webp",
    techs: ["CapCut", "Analytics", "TikTok & IG", "Copywriting"],
    ctaLabel: "+120K REACH CASE",
    ctaLink: "#",
    accentColor: "#FF6B00",
  },
  {
    id: "market-intel",
    title: "Algorithmic Market Intelligence Dashboard",
    category: "code",
    categoryLabel: "CODE / DEV",
    year: "2025",
    description:
      "Data pipeline aggregator and quantitative monitoring tool written in React and TypeScript with Python background workers for automated scraping and telemetries.",
    image: "/assets/projects/project-4-market.webp",
    techs: ["TypeScript", "React", "Python API", "Tailwind"],
    ctaLabel: "VIEW SOURCE",
    ctaLink: "https://github.com/maskaiki",
    accentColor: "#00d2ff",
  },
  {
    id: "future-sound",
    title: "Future Sound Festival Poster & Key Visuals",
    category: "design",
    categoryLabel: "GRAPHIC DESIGN",
    year: "2024",
    description:
      "Award-winning national competition submission. Designed key visual assets, social banners, and stage visual loops for a speculative future electronic sound festival.",
    image: "/assets/projects/project-5-festival.webp",
    techs: ["Photoshop", "Poster Grid", "Typography", "Visual Loops"],
    ctaLabel: "AWARD WINNER",
    ctaLink: "#",
    accentColor: "#00FF88",
  },
  {
    id: "tech-community",
    title: "Creative Tech Community Brand Campaign",
    category: "social",
    categoryLabel: "SOCIAL STRATEGY",
    year: "2024",
    description:
      "Scaled a regional developer discord & Instagram community to 4.8x follower growth in 6 months using micro-content loops and dynamic Canva/Figma creative templates.",
    image: "/assets/projects/project-6-community.webp",
    techs: ["Canva Pro", "Figma", "Copywriting", "Growth Strategy"],
    ctaLabel: "CASE STUDY",
    ctaLink: "#",
    accentColor: "#FF6B00",
  },
];

const FILTER_TABS: { key: ProjectCategory; label: string }[] = [
  { key: "all", label: "[ ALL ]" },
  { key: "code", label: "[ CODE / DEV ]" },
  { key: "design", label: "[ GRAPHIC DESIGN ]" },
  { key: "social", label: "[ SOCIAL MEDIA ]" },
];

export function SelectedWorkSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section
      id="work"
      className="relative w-full py-24 lg:py-32 bg-[#0A0A0A] text-[#EFEFE5] border-t border-[#1F1F1F] overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#0066FF]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[#00FF88]/08 blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#2A2A2A] text-xs font-mono tracking-widest text-[#00d2ff] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse" />
                02 // SELECTED WORK
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#EFEFE5] leading-[0.95]">
              CRAFTED <br />
              <span className="font-serif italic font-normal bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent">
                PORTFOLIO
              </span>
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[#141414] border border-[#2A2A2A] self-start lg:self-end">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`relative px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? "text-[#0A0A0A]"
                      : "text-[#8A8A7A] hover:text-[#EFEFE5]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00d2ff] to-[#38bdf8] shadow-[0_2px_14px_rgba(0,210,255,0.4)]"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Responsive Card Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#121212] border border-[#222222] hover:border-[#0066FF] transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_50px_rgba(0,102,255,0.18)]"
              >
                <div>
                  {/* Image Container with Ambient Vignette & Badges */}
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-[#181818] border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent z-10 opacity-70" />
                    
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Category & Year Floating Badges */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                      <span
                        className="px-3 py-1 rounded-full bg-[#0A0A0A]/90 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase border border-white/10"
                        style={{ color: project.accentColor }}
                      >
                        {project.categoryLabel}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#0A0A0A]/90 backdrop-blur-md text-[#8A8A7A] text-[11px] font-mono tracking-wider border border-white/10">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Title & Arrow */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl sm:text-2xl font-black uppercase text-[#EFEFE5] group-hover:text-[#00d2ff] transition-colors duration-300 leading-snug">
                        {project.title}
                      </h3>
                      <span className="w-8 h-8 rounded-full bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-[#8A8A7A] group-hover:text-[#00d2ff] group-hover:border-[#0066FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0">
                        ↗
                      </span>
                    </div>

                    <p className="text-sm text-[#8A8A7A] leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tech Pills & CTA Link */}
                <div className="pt-6 mt-6 border-t border-[#1E1E1E] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techs.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono text-[#8A8A7A] px-2.5 py-1 rounded bg-[#181818] border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.ctaLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold uppercase tracking-wider text-[#00d2ff] hover:text-white transition-colors flex items-center gap-1 group/cta"
                  >
                    <span>{project.ctaLabel}</span>
                    <span className="inline-block transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA to contact / view all */}
        <div className="flex justify-center pt-16">
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-[#141414] border border-[#2A2A2A] text-xs font-bold uppercase tracking-widest text-[#EFEFE5] hover:border-[#0066FF] hover:text-[#00d2ff] transition-all duration-300 flex items-center gap-2 group shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            <span>HAVE A PROJECT FOR KAIKI? LET'S CONNECT</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
