"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type GearCategory = "all" | "code" | "design" | "media" | "hardware";

export interface GearItem {
  id: string;
  code: string;
  name: string;
  category: "code" | "design" | "media" | "hardware";
  classification: "PRIMARY WEAPON" | "SECONDARY WEAPON" | "TACTICAL GEAR" | "DAILY RIG";
  statusColor: string;
  role: string;
  efficiency: number;
  output: string;
  architecture: string;
  protocol: string;
  verdict: string;
  icon: React.ReactNode;
}

const GEAR_ITEMS: GearItem[] = [
  // ── CODE & SYSTEMS ──────────────────────────────────────────
  {
    id: "nextjs",
    code: "SYS.01",
    name: "Next.js 15",
    category: "code",
    classification: "PRIMARY WEAPON",
    statusColor: "#00FF88",
    role: "Full-stack reactive web applications & App Router server architectures",
    efficiency: 96,
    output: "12+ Production Repositories",
    architecture: "React 19 / App Router / Server Components",
    protocol: "Turbopack, Server Actions, Edge Middleware",
    verdict: "The undisputed foundational framework for high-velocity kinetic web experiences.",
    icon: (
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path d="M20 18h14v64H20zM66 18h14v64H66zM20 18l52 64h14L32 18z" />
      </svg>
    ),
  },
  {
    id: "react",
    code: "SYS.02",
    name: "React 19",
    category: "code",
    classification: "PRIMARY WEAPON",
    statusColor: "#00FF88",
    role: "Declarative component ecosystems, custom hooks & kinetic state engines",
    efficiency: 95,
    output: "20+ Interactive Systems",
    architecture: "Fiber Engine / Concurrent Hydration",
    protocol: "Hooks, Context Architecture, Virtual DOM",
    verdict: "Modular core powering fluid interfaces and particle-driven canvas engines.",
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" className="w-7 h-7" aria-hidden="true">
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
    id: "typescript",
    code: "SYS.03",
    name: "TypeScript 5",
    category: "code",
    classification: "PRIMARY WEAPON",
    statusColor: "#00FF88",
    role: "End-to-end static type safety & robust API contracts",
    efficiency: 94,
    output: "Strict Zero-Any Codebases",
    architecture: "AST Compiler / Static Type Matrix",
    protocol: "Generics, Union Narrowing, Utility Types",
    verdict: "Ensures mission-critical reliability when fusing complex math and UI states.",
    icon: (
      <svg viewBox="35 48 85 58" fill="currentColor" className="w-8 h-6" aria-hidden="true">
        <path d="M37.3 50.8v8.6h17v44.1h10.3V59.4h17v-8.6H37.3zM83.8 84.8c2.8 4.2 7.1 6.5 12.8 6.5 5 0 8.7-2.4 8.7-6.2 0-3.6-2.9-5.4-8.7-7.7l-4.5-1.8c-8.7-3.4-13.3-8-13.3-15.5 0-8.9 7-15.4 18.2-15.4 7.6 0 13.5 2.6 17.6 7.6l-6.5 5.8c-2.4-3.3-5.7-5-10.7-5-5 0-7.8 2.3-7.8 5.4 0 3.3 2.6 4.9 8.1 7.1l4.5 1.8c9.5 3.8 14.2 8.6 14.2 16.2 0 9.8-7.7 16-19.6 16-9 0-16.1-3.2-20.6-9.1l6.7-5.7z" />
      </svg>
    ),
  },
  {
    id: "tailwind",
    code: "SYS.04",
    name: "Tailwind CSS v4",
    category: "code",
    classification: "PRIMARY WEAPON",
    statusColor: "#00FF88",
    role: "Atomic token design system & rapid responsive layout crafting",
    efficiency: 98,
    output: "Custom Design Tokens & HUDs",
    architecture: "Lightning CSS Engine / JIT Compiler",
    protocol: "Arbitrary Variants, CSS Variables, Container Queries",
    verdict: "Precision tool for industrial telemetry HUDs and editorial dark-mode palettes.",
    icon: (
      <svg viewBox="0 0 54 33" fill="currentColor" className="w-8 h-5" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.005-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
      </svg>
    ),
  },
  {
    id: "python",
    code: "SYS.05",
    name: "Python 3.12",
    category: "code",
    classification: "SECONDARY WEAPON",
    statusColor: "#00d2ff",
    role: "Computer science algorithms, asset automation & data telemetry pipelines",
    efficiency: 88,
    output: "Custom Automation Scripts & OpenCV Matting",
    architecture: "CPython / Scipy / NumPy / Pillow",
    protocol: "Image Processing, Data Structures, Automation CLI",
    verdict: "The mathematical backbone for heavy algorithmic calculations and media transformations.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path d="M11.91 0c-1.87 0-3.55.33-4.63.88-1.57.8-1.55 2.47-1.55 2.47v2.6h6.35v.87H2.81S1.2 6.78.43 8.35C-.4 9.99-.08 11.9-.08 11.9s.75 3.32 2.89 3.32h1.67v-2.34s-.09-2.79 2.74-2.79h4.69s2.65-.04 2.65-2.61V2.81S14.86 0 11.91 0zm-2.47 1.48c.5 0 .91.41.91.91s-.41.91-.91.91-.91-.41-.91-.91.41-.91.91-.91zm2.65 21.04c1.87 0 3.55-.33 4.63-.88 1.57-.8 1.55-2.47 1.55-2.47v-2.6H11.92v-.87h9.27s1.61.04 2.38-1.53c.83-1.64.51-3.55.51-3.55s-.75-3.32-2.89-3.32h-1.67v2.34s.09 2.79-2.74 2.79h-4.69s-2.65.04-2.65 2.61v5.67s-.3 2.81 2.65 2.81zm2.47-1.48c-.5 0-.91-.41-.91-.91s.41-.91.91-.91.91.41.91.91-.41.91-.91.91z" />
      </svg>
    ),
  },

  // ── CREATIVE & DESIGN ───────────────────────────────────────
  {
    id: "figma",
    code: "DES.01",
    name: "Figma Pro",
    category: "design",
    classification: "PRIMARY WEAPON",
    statusColor: "#00FF88",
    role: "Component systems, atomic typography hierarchies & high-fidelity interactive prototypes",
    efficiency: 96,
    output: "18+ Multi-Page Systems & UI Kits",
    architecture: "Auto-Layout 5.0 / Variables Engine",
    protocol: "Design Tokens, Interactive Variants, Developer Hand-off",
    verdict: "Primary digital canvas for translating abstract creative ideas into production-ready blueprints.",
    icon: (
      <svg viewBox="0 0 38 57" fill="currentColor" className="w-6 h-7" aria-hidden="true">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0zM0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0zM0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5zM0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5zM19 0h9.5a9.5 9.5 0 0 1 0 19H19V0z" />
      </svg>
    ),
  },
  {
    id: "photoshop",
    code: "DES.02",
    name: "Adobe Photoshop",
    category: "design",
    classification: "PRIMARY WEAPON",
    statusColor: "#00FF88",
    role: "Editorial poster compositing, cinematic color grading & texture matting",
    efficiency: 93,
    output: "40+ Editorial Posters & Client Graphics",
    architecture: "Raster Engine / Non-Destructive Smart Objects",
    protocol: "Color Lookups (LUTs), Frequency Separation, Blend Modes",
    verdict: "Master instrument for deep aesthetic editorial moodboards and visual manipulation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path d="M0 0v24h24V0H0zm2.25 2.25h19.5v19.5H2.25V2.25zm4.05 4.5v10.5h2.85v-3.75h1.8c2.4 0 3.9-1.35 3.9-3.45 0-2.1-1.5-3.3-3.9-3.3H6.3zm2.85 2.25h1.5c1.05 0 1.65.45 1.65 1.2 0 .75-.6 1.2-1.65 1.2h-1.5V9zm9.3 2.1c-.9 0-1.65.45-2.1 1.2l1.65 1.05c.15-.3.45-.6.9-.6.45 0 .75.15.75.45 0 .15-.15.3-.45.45l-1.35.6c-1.2.6-1.65 1.35-1.65 2.4 0 1.5 1.2 2.55 2.85 2.55 1.2 0 2.1-.45 2.55-1.35l-1.65-.9c-.15.3-.45.6-.9.6-.45 0-.75-.15-.75-.45 0-.15.15-.3.45-.45l1.35-.6c1.2-.6 1.65-1.35 1.65-2.4 0-1.5-1.2-2.55-2.85-2.55z" />
      </svg>
    ),
  },
  {
    id: "illustrator",
    code: "DES.03",
    name: "Adobe Illustrator",
    category: "design",
    classification: "SECONDARY WEAPON",
    statusColor: "#00d2ff",
    role: "Vector branding, logomarks, technical emblems & bespoke iconography",
    efficiency: 89,
    output: "15+ Identity Guidelines & Vector Assets",
    architecture: "Bézier Vector Engine / Mathematical Curves",
    protocol: "Pathfinder, Precision Grid, SVG Optimization",
    verdict: "Clean mathematical geometry generator for razor-sharp logos and UI insignias.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path d="M0 0v24h24V0H0zm2.25 2.25h19.5v19.5H2.25V2.25zm4.8 14.25h2.1l.9-2.7h3.9l.9 2.7h2.1L12.3 5.25h-2.1L7.05 16.5zm4.2-7.8l1.35 4.05h-2.7l1.35-4.05zm6.75-2.25c-.6 0-1.05.45-1.05 1.05s.45 1.05 1.05 1.05 1.05-.45 1.05-1.05-.45-1.05-1.05-1.05zm-.9 3.6h1.8v6.45h-1.8V10.2z" />
      </svg>
    ),
  },
  {
    id: "canva",
    code: "DES.04",
    name: "Canva Pro Studio",
    category: "design",
    classification: "TACTICAL GEAR",
    statusColor: "#FFB800",
    role: "Rapid tactical visual turnarounds, client pitch decks & fast social creatives",
    efficiency: 96,
    output: "50+ Fast-Deployment Assets & Presentations",
    architecture: "Cloud Asset Pipeline / Rapid Layouts",
    protocol: "Brand Kit Sync, High-Velocity Export, Deck Design",
    verdict: "High-speed rapid prototyping tool when deployment velocity is the top priority.",
    icon: (
      <svg viewBox="0 0 192 192" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path d="M95.2 170c-11.6 0-22-3.1-30.9-9.1-8.8-6-15.4-14.6-19.7-25.6-2.5-6.4-4-13.4-4.7-21.4-.8-9.5-.2-19.2 1.9-28.7 3.3-15.3 10-28.5 19.8-39.5 9.7-10.8 21.2-18.1 34.3-21.5 5.6-1.5 11.2-2.2 16.5-2.2 6.4 0 12.7 1.1 18.7 3.3 8.9 3.3 15 9 17.9 17 1.4 3.7 1.8 7.6 1.4 12-.6 6.2-2.6 11.7-6 16.4-3.9 5.4-8.6 8.7-14.3 10.1-1 .3-2.1.4-3.3.4-.5 0-.9 0-1.4-.1-1.7-.2-3.2-.9-4.2-2.2-1-1.3-1.4-3-1.2-4.7.3-2 1.1-3.7 1.9-5.1l.3-.6c1.6-3.2 3.1-6.2 3.9-9.4 1.3-5.4 1.3-9.5-.1-13.3-1.5-4-4.3-6.5-8.5-7.5-1.6-.4-3.2-.6-4.8-.6-3.6 0-7.4.9-11.4 2.7C93.4 44 86.7 50 81 58.7c-3.9 6-6.9 12.7-9.1 20.5-1.6 5.6-2.6 11.5-3.2 17.6-.3 2.9-.5 6.3-.5 9.6.1 9.7 1.5 17.4 4.5 24.2 3.3 7.6 7.8 12.9 13.9 16.3 4.1 2.3 8.7 3.5 13.6 3.5.8 0 1.7 0 2.6-.1 10.4-.8 19.6-5.5 28-14.3 4.3-4.5 7.9-9.7 11-15.9.5-.9 1-1.9 1.8-2.7 1-1.1 2.3-1.7 3.7-1.7 1.7 0 3.2.9 4.2 2.5 1.2 2 1.1 4.2.9 5.6-.6 4.1-2.1 8.1-4.6 12.8-7.2 12.9-17.1 22.4-29.4 28.3-6.3 3-13.1 4.7-20.1 5-1.1.1-2.1.1-3.1.1z" />
      </svg>
    ),
  },
  {
    id: "identity",
    code: "DES.05",
    name: "Brand Lab & Editorial",
    category: "design",
    classification: "PRIMARY WEAPON",
    statusColor: "#00FF88",
    role: "Comprehensive design guidelines, typographic pairing & visual voice architecture",
    efficiency: 94,
    output: "Full Brand Playbooks & Voicebooks",
    architecture: "Editorial Design Thinking & Grid Foundations",
    protocol: "Modular Scales, Kinetic Pacing, Color Psychology",
    verdict: "Fuses computer science structure with artistic soul to give brands distinct character.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },

  // ── MEDIA & STRATEGY ────────────────────────────────────────
  {
    id: "capcut",
    code: "MED.01",
    name: "CapCut Pro Studio",
    category: "media",
    classification: "PRIMARY WEAPON",
    statusColor: "#00FF88",
    role: "High-retention short-form video editing, kinetic transitions & audio-sync hooks",
    efficiency: 95,
    output: "60+ Viral Formats & Client Reels",
    architecture: "Multi-Track Timeline / Kinetic Keyframing",
    protocol: "Sound Design, Speed Ramping, Dynamic Captions",
    verdict: "Primary engine for capturing short-form attention spans within the first 3 seconds.",
    icon: (
      <svg viewBox="0 0 192 192" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M170 42 22 124v14c0 6.627 5.373 12 12 12h78c6.627 0 12-5.373 12-12v-9.5" />
        <path d="M170 150 22 68V54c0-6.627 5.373-12 12-12h78c6.627 0 12 5.373 12 12v9.5" />
      </svg>
    ),
  },
  {
    id: "content-arch",
    code: "MED.02",
    name: "Content Architecture",
    category: "media",
    classification: "TACTICAL GEAR",
    statusColor: "#FFB800",
    role: "Audience retention loops, behavioral psychology & algorithm-aligned posting roadmaps",
    efficiency: 91,
    output: "300K+ Organic Video Views Managed",
    architecture: "Funnel Matrix (TOFU / MOFU / BOFU)",
    protocol: "Narrative Hooks, Watch-Time Pacing, CTA Engineering",
    verdict: "Strategic framework ensuring aesthetic creative translates directly into engagement metrics.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    id: "analytics",
    code: "MED.03",
    name: "Growth & Telemetry",
    category: "media",
    classification: "SECONDARY WEAPON",
    statusColor: "#00d2ff",
    role: "Meta insights audit, audience retention tracking & creative AB-testing telemetry",
    efficiency: 87,
    output: "Data-Backed Creative Optimization",
    architecture: "Platform Analytics / Conversion Tracking",
    protocol: "CTR Analysis, Average Watch Duration, Cohort Engagement",
    verdict: "Replaces guesswork with empirical audience behavior analytics.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },

  // ── HARDWARE LOADOUT ─────────────────────────────────────────
  {
    id: "dev-rig",
    code: "RIG.01",
    name: "M-Series Silicon Rig",
    category: "hardware",
    classification: "DAILY RIG",
    statusColor: "#A855F7",
    role: "UNIX workstation for rapid code compilation, parallel dev servers & 4K editing",
    efficiency: 99,
    output: "Primary Command Center",
    architecture: "ARM64 Architecture / Unified Memory",
    protocol: "Zsh, Docker, Vite / Next Server Instances",
    verdict: "Zero-latency daily workhorse handling concurrent engineering and creative renders.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: "tablet",
    code: "RIG.02",
    name: "Precision Stylus & Slate",
    category: "hardware",
    classification: "DAILY RIG",
    statusColor: "#A855F7",
    role: "Pressure-sensitive pen tablet for freehand masking, vector drawing & digital illustration",
    efficiency: 92,
    output: "Pixel-Level Masking & Hand Lettering",
    architecture: "8192 Pressure Levels / Tilt Recognition",
    protocol: "Precision Retouching, Freehand Bezier Curves",
    verdict: "Direct tactile bridge connecting human hand gestures directly into digital pixels.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    id: "audio-monitor",
    code: "RIG.03",
    name: "Acoustic Flow Rig",
    category: "hardware",
    classification: "DAILY RIG",
    statusColor: "#A855F7",
    role: "Active acoustic isolation & Hi-Fi reference monitoring for editing and focus sessions",
    efficiency: 96,
    output: "Deep Cognitive Flow States",
    architecture: "Flat-Response Reference Drivers / ANC Engine",
    protocol: "Binaural Pacing, Audio Mastering, Acoustic Quarantine",
    verdict: "Enforces non-distracted deep focus during late-night code sprints and video scoring.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
];

export function ArsenalSection() {
  const [activeFilter, setActiveFilter] = useState<GearCategory>("all");
  const [selectedGearId, setSelectedGearId] = useState<string>("nextjs");

  const filteredItems = GEAR_ITEMS.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  const activeItem =
    GEAR_ITEMS.find((item) => item.id === selectedGearId) || GEAR_ITEMS[0];

  return (
    <section
      id="skills"
      className="relative w-full py-24 lg:py-32 bg-[#09090b] text-[#EFEFE5] border-t border-[#1F1F24] overflow-hidden select-none"
    >
      {/* Background ambient telemetry lighting */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 rounded-full bg-[#0066FF]/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 rounded-full bg-[#00FF88]/08 blur-[160px] pointer-events-none" />

      {/* Subtle blueprint grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Top Telemetry Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 sm:px-6 rounded-lg bg-[#111115] border border-white/5 font-mono text-[11px] text-[#8A8A7A] mb-12">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF88]" />
            </span>
            <span className="tracking-wider uppercase text-[#EFEFE5] font-bold">
              SYS.03 // ARSENAL LOADOUT
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="hidden sm:inline text-[#00d2ff]">
              16/16 SLOTS DEPLOYED
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase">
            <span className="hidden md:inline text-white/40">
              OPERATIONAL SPEC: INDUSTRIAL R&amp;D
            </span>
            <span className="px-2 py-0.5 rounded bg-[#181820] text-[#00FF88] border border-[#00FF88]/20 font-bold">
              READY FOR COMBAT ✦
            </span>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#00d2ff]" />
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#00d2ff] uppercase">
                DIGITAL GEARBAG // LOADOUT
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#EFEFE5] leading-[0.95]">
              TECHNICAL ARSENAL &amp; <br />
              <span className="font-serif italic font-normal bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent">
                CREATIVE LOADOUT.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm text-[#8A8A7A] leading-relaxed">
            Every instrument in the inventory is battle-tested. Click any slot in the gearbag to inspect its real-time telemetry, production output, and architectural role.
          </p>
        </div>

        {/* Filter Category Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/5">
          {[
            { id: "all", label: "00 // ALL SLOTS", count: GEAR_ITEMS.length },
            { id: "code", label: "01 // CODE & SYSTEMS", count: 5 },
            { id: "design", label: "02 // CREATIVE & DESIGN", count: 5 },
            { id: "media", label: "03 // MEDIA & GROWTH", count: 3 },
            { id: "hardware", label: "04 // HARDWARE RIG", count: 3 },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as GearCategory)}
                className={`relative px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-[#00d2ff] text-[#09090b] font-bold shadow-[0_0_20px_rgba(0,210,255,0.4)]"
                    : "bg-[#141418] text-[#8A8A7A] hover:text-[#EFEFE5] hover:bg-[#1a1a20] border border-white/5"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-[#09090b]/30 text-[#09090b]" : "bg-white/5 text-[#8A8A7A]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Loadout Matrix & Telemetry Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
          
          {/* LEFT: Tactical Inventory Grid (7 Cols on LG) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => {
                const isSelected = item.id === activeItem.id;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: idx * 0.02 }}
                    onClick={() => setSelectedGearId(item.id)}
                    className={`group relative p-5 rounded-xl cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "bg-[#15151c] border-2 border-[#00d2ff] shadow-[0_0_30px_rgba(0,210,255,0.2)] -translate-y-1"
                        : "bg-[#121216] border border-white/5 hover:border-white/20 hover:bg-[#16161c] hover:-translate-y-0.5"
                    }`}
                  >
                    {/* Corner Crosshairs */}
                    <span className="absolute top-2 left-2 text-[10px] font-mono text-white/10 group-hover:text-[#00d2ff]/40 transition-colors pointer-events-none">
                      +
                    </span>
                    <span className="absolute top-2 right-2 text-[10px] font-mono text-white/10 group-hover:text-[#00d2ff]/40 transition-colors pointer-events-none">
                      +
                    </span>

                    {/* Slot Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: item.statusColor }}
                        />
                        <span className="font-mono text-[10px] tracking-widest text-[#8A8A7A] uppercase">
                          {item.code}
                        </span>
                      </div>
                      <span
                        className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-black/40 border border-white/5"
                        style={{ color: item.statusColor }}
                      >
                        {item.classification}
                      </span>
                    </div>

                    {/* Tool Icon & Title */}
                    <div className="flex items-center gap-3.5 mb-3">
                      <div
                        className={`p-2.5 rounded-lg transition-colors ${
                          isSelected
                            ? "bg-[#00d2ff]/10 text-[#00d2ff]"
                            : "bg-[#181820] text-[#EFEFE5] group-hover:text-[#00d2ff]"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-sans font-black text-base uppercase tracking-tight text-[#EFEFE5] truncate group-hover:text-[#00d2ff] transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-[11px] font-mono text-[#8A8A7A] truncate">
                          {item.architecture.split("/")[0]}
                        </p>
                      </div>
                    </div>

                    {/* Mini Efficiency Bar */}
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[10px]">
                      <span className="text-[#8A8A7A]">MASTERY</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${item.efficiency}%`,
                              backgroundColor: item.statusColor,
                            }}
                          />
                        </div>
                        <span className="font-bold text-[#EFEFE5]">
                          {item.efficiency}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* RIGHT: Live Telemetry Spec Sheet Inspector (5 Cols on LG) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#121216] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
              
              {/* Scanline & ambient glow behind inspector */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-20"
                style={{ backgroundColor: activeItem.statusColor }}
              />

              {/* Inspector Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs text-[#8A8A7A]">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse" />
                  <span className="text-[#00d2ff] font-bold tracking-wider uppercase">
                    LIVE SPEC SHEET
                  </span>
                </div>
                <span className="text-white/40 tracking-widest">
                  SLOT // {activeItem.code}
                </span>
              </div>

              {/* Active Item Title & Classification */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span
                    className="inline-block text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded mb-2 border"
                    style={{
                      backgroundColor: `${activeItem.statusColor}15`,
                      color: activeItem.statusColor,
                      borderColor: `${activeItem.statusColor}30`,
                    }}
                  >
                    {activeItem.classification}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#EFEFE5] tracking-tight">
                    {activeItem.name}
                  </h3>
                </div>
                <div className="p-3.5 rounded-xl bg-[#181820] text-[#00d2ff] border border-white/10">
                  {activeItem.icon}
                </div>
              </div>

              {/* Tactical Role Description */}
              <p className="text-sm text-[#8A8A7A] leading-relaxed mb-6 font-sans">
                {activeItem.role}
              </p>

              {/* Telemetry Monospace Table */}
              <div className="space-y-3 p-4 rounded-xl bg-[#0c0c0f] border border-white/5 font-mono text-xs mb-6">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#8A8A7A]">ARCHITECTURE:</span>
                  <span className="text-[#EFEFE5] font-bold text-right truncate max-w-[200px]">
                    {activeItem.architecture}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#8A8A7A]">PROD OUTPUT:</span>
                  <span className="text-[#00FF88] font-bold text-right">
                    {activeItem.output}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#8A8A7A]">CORE PROTOCOLS:</span>
                  <span className="text-[#00d2ff] font-bold text-right truncate max-w-[200px]">
                    {activeItem.protocol}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8A8A7A]">MASTERY RATING:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#EFEFE5] font-bold">
                      {activeItem.efficiency}%
                    </span>
                    <span className="text-[#00FF88]">● OPTIMAL</span>
                  </div>
                </div>
              </div>

              {/* Tactical Verdict Quote */}
              <div className="p-4 rounded-lg bg-white/[0.02] border-l-2 border-[#00d2ff] text-xs text-[#8A8A7A] italic leading-relaxed mb-6">
                &ldquo;{activeItem.verdict}&rdquo;
              </div>

              {/* Action Button */}
              <a
                href="#work"
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-[#09090b] bg-[#00d2ff] hover:bg-[#38bdf8] transition-colors shadow-[0_0_20px_rgba(0,210,255,0.4)]"
              >
                <span>EXPLORE WORK BUILT WITH THIS</span>
                <span aria-hidden="true">↗</span>
              </a>

            </div>
          </div>

        </div>

        {/* Kinetic Ticker for Brand Logos */}
        <div className="pt-10 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#8A8A7A] uppercase">
              CERTIFIED TECH STACK // DEPLOYED ECOSYSTEMS
            </span>
            <span className="font-mono text-[11px] text-[#00d2ff]">
              100% PRODUCTION READY
            </span>
          </div>

          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-fit marquee-track-logos">
              {[...GEAR_ITEMS, ...GEAR_ITEMS].map((gear, idx) => (
                <div
                  key={`${gear.id}-${idx}`}
                  onClick={() => setSelectedGearId(gear.id)}
                  title={`${gear.name} — Click to inspect`}
                  className="flex items-center gap-3 px-6 py-3 mx-2 rounded-xl bg-[#111115] border border-white/5 hover:border-[#00d2ff]/40 hover:bg-[#16161c] text-[#8A8A7A] hover:text-[#00d2ff] transition-all cursor-pointer group"
                >
                  <div className="w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {gear.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#EFEFE5] group-hover:text-[#00d2ff] whitespace-nowrap">
                    {gear.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
