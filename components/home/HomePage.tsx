"use client";

import { Hero } from "./Hero";
import { TickerSection } from "./TickerSection";
import { AboutSection } from "./AboutSection";
import { PortaleSection } from "./PortaleSection";
import { SelectedWorkSection } from "./SelectedWorkSection";
import { PptAndVideoShowcase } from "./PptAndVideoShowcase";
import { KaikiMonumentSection } from "./KaikiMonumentSection";
import { CatWorkflowSection } from "./CatWorkflowSection";
import { ArsenalSection } from "./ArsenalSection";
import { JourneySection } from "./JourneySection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-[#efefe5] overflow-x-hidden">
      {/* 01. EXPLORE: Rain Simulation & Interactive Portrait */}
      <Hero />

      {/* Kinetic Dual-Tier Marquee Transition */}
      <TickerSection />

      {/* 02. ABOUT: "I Make Front-End For People" & Ghost Buddy Mascot */}
      <AboutSection />

      {/* Portale 3D Glass Portal & Creator Card Transition */}
      <PortaleSection />

      {/* 03. WORK: Front-End Web Builds & 10 Graphic Designs (3D Cylinder) */}
      <SelectedWorkSection />

      {/* 04. STORYTELLING & REEL: 10 Slide Decks (3D Snake) & 1 Featured Video Edit */}
      <PptAndVideoShowcase />

      {/* 05. MONUMENT: 3D KAIKI Sculpt, Mega Mendung Stage & Fisheye Dome Wall */}
      <KaikiMonumentSection />

      {/* Cat Workflow 10.5s Motion Explainer */}
      <CatWorkflowSection />

      {/* 06. ARSENAL: Built With & Platforms Marquee */}
      <ArsenalSection />

      {/* 07. JOURNEY: CV & Experience Timeline */}
      <JourneySection />

      {/* 08. CONTACT + FOOTER: Rendered by SiteShell via Footer.tsx (#contact) */}
    </div>
  );
}
