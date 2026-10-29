"use client";

import dynamic from "next/dynamic";
import { Hero } from "./Hero";
import { TickerSection } from "./TickerSection";
import { AboutSection } from "./AboutSection";

const PortaleSection = dynamic(() =>
  import("./PortaleSection").then((m) => ({ default: m.PortaleSection }))
);
const SelectedWorkSection = dynamic(() =>
  import("./SelectedWorkSection").then((m) => ({
    default: m.SelectedWorkSection,
  }))
);
const CatWorkflowSection = dynamic(() =>
  import("./CatWorkflowSection").then((m) => ({
    default: m.CatWorkflowSection,
  }))
);
const ArsenalSection = dynamic(() =>
  import("./ArsenalSection").then((m) => ({ default: m.ArsenalSection }))
);
const JourneySection = dynamic(() =>
  import("./JourneySection").then((m) => ({ default: m.JourneySection }))
);

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-[#efefe5] overflow-x-hidden">
      {/* 01. EXPLORE — Visor Hero Section */}
      <Hero />

      {/* Kinetic Dual-Tier Marquee Transition */}
      <TickerSection />

      {/* 02. ABOUT — "I Make Front-End For People" & Personal Side */}
      <AboutSection />

      {/* Portale 3D Glass Portal & Creator Card Transition */}
      <PortaleSection />

      {/* 03. WORK — 3 Webs, 10 Graphic Designs (3D), 1 Video Edit & Mega Mendung KAIKI */}
      <SelectedWorkSection />

      {/* Cat Workflow 10.5s Motion Explainer */}
      <CatWorkflowSection />

      {/* 04. ARSENAL — Built With & Platforms Marquee */}
      <ArsenalSection />

      {/* 05. JOURNEY — CV & Experience Timeline */}
      <JourneySection />

      {/* 06. CONTACT + FOOTER — Rendered by SiteShell via Footer.tsx (#contact) */}
    </div>
  );
}
