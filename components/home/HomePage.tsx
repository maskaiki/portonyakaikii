"use client";

import { Hero } from "./Hero";
import { TickerSection } from "./TickerSection";
import { AboutSection } from "./AboutSection";
import { SelectedWorkSection } from "./SelectedWorkSection";
import { ArsenalSection } from "./ArsenalSection";
import { JourneySection } from "./JourneySection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-[#efefe5] overflow-x-hidden">
      {/* 01. EXPLORE — Visor Hero Section */}
      <Hero />

      {/* Kinetic Dual-Tier Marquee Transition */}
      <TickerSection />

      {/* 02. ABOUT — "I Make Front-End For People" & Personal Side */}
      <AboutSection />

      {/* 03. WORK — 3 Webs, 10 Graphic Designs (3D), 1 Video Edit */}
      <SelectedWorkSection />

      {/* 04. ARSENAL — Built With & Platforms Marquee */}
      <ArsenalSection />

      {/* 05. JOURNEY — CV & Experience Timeline */}
      <JourneySection />

      {/* 06. CONTACT + FOOTER — Rendered by SiteShell via Footer.tsx (#contact) */}
    </div>
  );
}
