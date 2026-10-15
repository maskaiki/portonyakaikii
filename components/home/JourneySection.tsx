"use client";

import { motion } from "framer-motion";

interface TimelineItem {
  year: string;
  role: string;
  organization: string;
  description: string;
  tags: string[];
  accent: string;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "2024 — PRESENT",
    role: "Freelance Graphic Designer & Brand Consultant",
    organization: "Independent Practice",
    description:
      "Crafting high-impact visual identities, custom typography posters, and marketing collateral for diverse commercial clients and creative competitions.",
    tags: ["Branding", "Visual Systems", "Poster Art", "Figma & Adobe"],
    accent: "#00d2ff",
  },
  {
    year: "2024 — PRESENT",
    role: "Social Media Strategist & Content Architect",
    organization: "Digital Creators & Brand Campaigns",
    description:
      "Engineering viral short-form micro-content loops, carousel structures, and audience retention strategies that generated over 120k organic impressions.",
    tags: ["CapCut", "Viral Hooks", "Audience Growth", "Analytics"],
    accent: "#FF6B00",
  },
  {
    year: "2023",
    role: "Competition Finalist & Design Award",
    organization: "National Creative & Tech Design Contest",
    description:
      "Honored for innovative futuristic poster aesthetics and brand design narrative in speculative electronic and cultural themes.",
    tags: ["Competition Winner", "Key Visuals", "Design Award"],
    accent: "#00FF88",
  },
  {
    year: "2022 — PRESENT",
    role: "Informatics Engineering Degree",
    organization: "Universitas Negeri Malang (UM)",
    description:
      "Pursuing Bachelor of Informatics Engineering. Focusing on software engineering, frontend architecture, reactive UI systems, and algorithmic problem-solving.",
    tags: ["Software Engineering", "Full-Stack", "Algorithms", "Systems"],
    accent: "#38bdf8",
  },
];

export function JourneySection() {
  return (
    <section
      id="journey"
      className="relative w-full py-24 lg:py-32 bg-[#0A0A0A] text-[#EFEFE5] border-t border-[#1F1F1F] overflow-hidden"
    >
      {/* Subtle atmospheric gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0066FF]/05 blur-[180px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#2A2A2A] text-xs font-mono tracking-widest text-[#00d2ff] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse" />
              04 // JOURNEY
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#EFEFE5] leading-[0.95]">
              EXPERIENCE &amp; <br />
              <span className="font-serif italic font-normal bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent">
                MILESTONES
              </span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm text-[#8A8A7A] leading-relaxed">
            The progression through software engineering academia, freelance brand commissions, and high-retention digital media architecture.
          </p>
        </div>

        {/* Luminescent Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical Center Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute top-4 bottom-4 left-4 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#00d2ff] via-[#0066FF] to-transparent opacity-40" />

          <div className="space-y-12 md:space-y-16">
            {TIMELINE_DATA.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.role}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  } gap-8 md:gap-16 pl-12 md:pl-0`}
                >
                  {/* Glowing Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 z-20 flex items-center justify-center">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-[#0A0A0A] shadow-[0_0_16px_currentColor] animate-pulse"
                      style={{ backgroundColor: item.accent, color: item.accent }}
                    />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-[calc(50%-2rem)] p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/10 hover:border-[#0066FF] transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.4)] group hover:-translate-y-1 ${
                      isEven ? "md:text-left" : "md:text-left"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="font-mono text-xs font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#1C1C1C] border border-white/5"
                        style={{ color: item.accent }}
                      >
                        {item.year}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-[#EFEFE5] group-hover:text-[#00d2ff] transition-colors leading-snug">
                      {item.role}
                    </h3>
                    <p className="font-display text-xs font-bold uppercase tracking-wider text-[#8A8A7A] mt-1 mb-4">
                      {item.organization}
                    </p>

                    <p className="font-sans text-sm text-[#8A8A7A] leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono text-[#8A8A7A] px-2.5 py-1 rounded bg-[#1C1C1C] border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Spacer for opposite column */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
