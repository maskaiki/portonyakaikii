"use client";

import { Hero } from "./Hero";
import { TickerSection } from "./TickerSection";
import { AboutSection } from "./AboutSection";
import { SelectedWorkSection } from "./SelectedWorkSection";
import { ArsenalSection } from "./ArsenalSection";
import { JourneySection } from "./JourneySection";
import { ManifestoSection } from "./ManifestoSection";
import { ContactSection } from "./ContactSection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-[#efefe5] overflow-x-hidden">
      {/* 01. Visor Hero Section */}
      <Hero />

      {/* 02. Kinetic Dual-Tier Marquee Ticker */}
      <TickerSection />

      {/* 03. About Me Story & Metric Stats */}
      <AboutSection />

      {/* 04. Selected Work Showcase with Filter Tabs */}
      <SelectedWorkSection />

      {/* 05. Arsenal Skills & Tech Marquee */}
      <ArsenalSection />

      {/* 06. Journey & Experience Timeline */}
      <JourneySection />

      {/* 07. Manifesto Quote Section */}
      <ManifestoSection />

      {/* 08. Direct Contact & Collaboration CTA */}
      <ContactSection />
    </div>
  );
}
