"use client";

import { motion } from "framer-motion";

interface SkillPillar {
  icon: string;
  badge: string;
  title: string;
  subtitle: string;
  accent: string;
  skills: { name: string; tag: string }[];
}

const PILLARS: SkillPillar[] = [
  {
    icon: "💻",
    badge: "ENGINEERING",
    title: "CODE & SYSTEMS",
    subtitle: "Modern reactive frontends, algorithmic logic & typed software architectures.",
    accent: "#00d2ff",
    skills: [
      { name: "Next.js", tag: "App Router" },
      { name: "React", tag: "UI Architecture" },
      { name: "TypeScript", tag: "Type Safety" },
      { name: "JavaScript", tag: "ESNext / DOM" },
      { name: "Python", tag: "Scripting / Data" },
      { name: "Tailwind CSS", tag: "Design Tokens" },
      { name: "Git & GitHub", tag: "Version Control" },
    ],
  },
  {
    icon: "🎨",
    badge: "CREATIVE",
    title: "VISUAL & DESIGN",
    subtitle: "Brand identity, typographic composition & high-impact editorial graphics.",
    accent: "#00FF88",
    skills: [
      { name: "Figma", tag: "Design Systems" },
      { name: "Canva Pro", tag: "Rapid Creative" },
      { name: "Adobe Photoshop", tag: "Visual Posters" },
      { name: "Adobe Illustrator", tag: "Vector & Logos" },
      { name: "Brand Identity", tag: "Guidelines" },
      { name: "Editorial Layout", tag: "Print & Digital" },
    ],
  },
  {
    icon: "📱",
    badge: "GROWTH",
    title: "MEDIA & STRATEGY",
    subtitle: "Short-form video hooks, audience retention loops & multi-platform campaigns.",
    accent: "#FF6B00",
    skills: [
      { name: "CapCut Pro", tag: "Reels / TikTok" },
      { name: "Content Architecture", tag: "Hook Planning" },
      { name: "Audience Growth", tag: "Organic Reach" },
      { name: "Campaign Analytics", tag: "Metrics & KPIs" },
      { name: "Copywriting", tag: "Engagement Copy" },
      { name: "Community Strategy", tag: "Retention" },
    ],
  },
];

const TECH_LOGOS = [
  {
    name: "Next.js",
    icon: (
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true">
        <path d="M20 18h14v64H20zM66 18h14v64H66zM20 18l52 64h14L32 18z" />
      </svg>
    ),
  },
  {
    name: "React",
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true">
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg viewBox="35 48 85 58" fill="currentColor" className="w-12 h-9 sm:w-14 sm:h-10" aria-hidden="true">
        <path d="M37.3 50.8v8.6h17v44.1h10.3V59.4h17v-8.6H37.3zM83.8 84.8c2.8 4.2 7.1 6.5 12.8 6.5 5 0 8.7-2.4 8.7-6.2 0-3.6-2.9-5.4-8.7-7.7l-4.5-1.8c-8.7-3.4-13.3-8-13.3-15.5 0-8.9 7-15.4 18.2-15.4 7.6 0 13.5 2.6 17.6 7.6l-6.5 5.8c-2.4-3.3-5.7-5-10.7-5-5 0-7.8 2.3-7.8 5.4 0 3.3 2.6 4.9 8.1 7.1l4.5 1.8c9.5 3.8 14.2 8.6 14.2 16.2 0 9.8-7.7 16-19.6 16-9 0-16.1-3.2-20.6-9.1l6.7-5.7z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    icon: (
      <svg viewBox="0 0 54 33" fill="currentColor" className="w-12 h-8 sm:w-14 sm:h-9" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.005-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
      </svg>
    ),
  },
  {
    name: "Canva",
    icon: (
      <svg viewBox="0 0 192 192" fill="currentColor" className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true">
        <path d="M95.2 170c-11.6 0-22-3.1-30.9-9.1-8.8-6-15.4-14.6-19.7-25.6-2.5-6.4-4-13.4-4.7-21.4-.8-9.5-.2-19.2 1.9-28.7 3.3-15.3 10-28.5 19.8-39.5 9.7-10.8 21.2-18.1 34.3-21.5 5.6-1.5 11.2-2.2 16.5-2.2 6.4 0 12.7 1.1 18.7 3.3 8.9 3.3 15 9 17.9 17 1.4 3.7 1.8 7.6 1.4 12-.6 6.2-2.6 11.7-6 16.4-3.9 5.4-8.6 8.7-14.3 10.1-1 .3-2.1.4-3.3.4-.5 0-.9 0-1.4-.1-1.7-.2-3.2-.9-4.2-2.2-1-1.3-1.4-3-1.2-4.7.3-2 1.1-3.7 1.9-5.1l.3-.6c1.6-3.2 3.1-6.2 3.9-9.4 1.3-5.4 1.3-9.5-.1-13.3-1.5-4-4.3-6.5-8.5-7.5-1.6-.4-3.2-.6-4.8-.6-3.6 0-7.4.9-11.4 2.7C93.4 44 86.7 50 81 58.7c-3.9 6-6.9 12.7-9.1 20.5-1.6 5.6-2.6 11.5-3.2 17.6-.3 2.9-.5 6.3-.5 9.6.1 9.7 1.5 17.4 4.5 24.2 3.3 7.6 7.8 12.9 13.9 16.3 4.1 2.3 8.7 3.5 13.6 3.5.8 0 1.7 0 2.6-.1 10.4-.8 19.6-5.5 28-14.3 4.3-4.5 7.9-9.7 11-15.9.5-.9 1-1.9 1.8-2.7 1-1.1 2.3-1.7 3.7-1.7 1.7 0 3.2.9 4.2 2.5 1.2 2 1.1 4.2.9 5.6-.6 4.1-2.1 8.1-4.6 12.8-7.2 12.9-17.1 22.4-29.4 28.3-6.3 3-13.1 4.7-20.1 5-1.1.1-2.1.1-3.1.1z" />
      </svg>
    ),
  },
  {
    name: "CapCut",
    icon: (
      <svg viewBox="0 0 192 192" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true">
        <path d="M170 42 22 124v14c0 6.627 5.373 12 12 12h78c6.627 0 12-5.373 12-12v-9.5" />
        <path d="M170 150 22 68V54c0-6.627 5.373-12 12-12h78c6.627 0 12 5.373 12 12v9.5" />
      </svg>
    ),
  },
  {
    name: "Framer Motion",
    icon: (
      <svg viewBox="0 0 14 21" fill="currentColor" className="w-8 h-10 sm:w-10 sm:h-12" aria-hidden="true">
        <path d="M0 0h14v7H7zm0 7h7l7 7H7v7l-7-7z" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    icon: (
      <svg viewBox="28 46 80 58" fill="currentColor" className="w-12 h-9 sm:w-14 sm:h-10" aria-hidden="true">
        <path d="M72.2 87.5c1.9 3.2 4.4 5.7 8.9 5.7 4.5 0 7.3-2.2 7.3-5.3 0-3.7-2.9-5-7.9-7.2l-2.7-1.2c-7.8-3.3-13-7.5-13-16.3 0-8.1 6.2-14.3 16-14.3 7 0 12 2.4 15.6 8.7l-6.8 4.4c-1.8-3.2-3.8-4.5-8.8-4.5-4.1 0-6.7 2.1-6.7 4.8 0 3.3 2.6 4.7 7.2 6.7l2.7 1.2c9.2 4 14 8.2 14 17.2 0 9.8-7.7 15.2-17.7 15.2-9.9 0-16.1-4.8-19.2-11l6.4-4.5zm-33.8 1.4c1.3 2.2 2.6 4 5.6 4 3 0 4.8-1.2 4.8-5.9V49.6h9.5v37.4c0 9.7-5.7 14.1-14.4 14.1-7.8 0-12.4-4-14.6-8.7l9.1-3.5z" />
      </svg>
    ),
  },
  {
    name: "Git",
    icon: (
      <svg viewBox="0 0 128 128" fill="currentColor" className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true">
        <path d="M125.1 57.6L70.4 2.9c-3.9-3.9-10.2-3.9-14.1 0L44.8 14.4l17.8 17.8c4.2-1.4 9.1-.5 12.5 2.9 3.4 3.4 4.3 8.3 2.9 12.5l17.1 17.1c4.2-1.4 9.1-.5 12.5 2.9 4.7 4.7 4.7 12.3 0 17-4.7 4.7-12.3 4.7-17 0-3.6-3.6-4.4-8.9-2.6-13.3L72.2 48.5v35.3c1.2.6 2.3 1.4 3.3 2.4 4.7 4.7 4.7 12.3 0 17s-12.3 4.7-17 0c-4.7-4.7-4.7-12.3 0-17 1.2-1.2 2.6-2.1 4.1-2.7V47.7c-1.5-.6-2.9-1.5-4.1-2.7-3.6-3.6-4.4-9-2.5-13.4L38.4 14 2.9 69.5c-3.9 3.9-3.9 10.2 0 14.1l54.7 54.7c3.9 3.9 10.2 3.9 14.1 0l53.4-53.4c3.9-3.9 3.9-10.2 0-14.1v-.2z" />
      </svg>
    ),
  },
];

const REPEATED_LOGOS = [...TECH_LOGOS, ...TECH_LOGOS];

export function ArsenalSection() {
  return (
    <section
      id="skills"
      className="relative w-full py-24 lg:py-32 bg-[#0d0d0d] text-[#EFEFE5] border-t border-[#1F1F1F] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 rounded-full bg-[#0066FF]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-48 w-96 h-96 rounded-full bg-[#00FF88]/08 blur-[150px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#2A2A2A] text-xs font-mono tracking-widest text-[#00d2ff] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse" />
              03 // ARSENAL
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#EFEFE5] leading-[0.95]">
              SKILLS &amp; <br />
              <span className="font-serif italic font-normal bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent">
                TOOLKIT
              </span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm text-[#8A8A7A] leading-relaxed">
            The multi-disciplinary toolkit bridging computer science rigor, editorial aesthetic direction, and audience-growth content strategies.
          </p>
        </div>

        {/* Tri-Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative flex flex-col justify-between p-8 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#0066FF] transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1.5"
            >
              <div>
                {/* Pillar Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl">{pillar.icon}</span>
                  <span
                    className="text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#1C1C1C] border border-white/5"
                    style={{ color: pillar.accent }}
                  >
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#EFEFE5] group-hover:text-[#00d2ff] transition-colors mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#8A8A7A] leading-relaxed mb-8">
                  {pillar.subtitle}
                </p>

                {/* Skill List */}
                <div className="space-y-3">
                  {pillar.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#191919] border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <span className="text-sm font-bold text-[#EFEFE5]">
                        {skill.name}
                      </span>
                      <span className="text-[11px] font-mono text-[#8A8A7A]">
                        {skill.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Line Accent */}
              <div
                className="w-full h-1 mt-8 rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: pillar.accent }}
              />
            </motion.div>
          ))}
        </div>

        {/* Marquee Logo Strip */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-center font-display text-[11px] font-bold tracking-[0.2em] text-[#8A8A7A] uppercase mb-8">
            CORE TECHNOLOGIES &amp; PLATFORMS
          </p>
          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-fit marquee-track-logos">
              {[...REPEATED_LOGOS, ...REPEATED_LOGOS].map((tech, idx) => (
                <div
                  key={`${tech.name}-${idx}`}
                  title={tech.name}
                  aria-label={tech.name}
                  className="flex items-center justify-center text-[#8A8A7A] hover:text-[#00d2ff] transition-all duration-300 transform hover:scale-125 cursor-pointer filter hover:drop-shadow-[0_4px_20px_rgba(0,210,255,0.65)] px-4 sm:px-6"
                >
                  {tech.icon}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
