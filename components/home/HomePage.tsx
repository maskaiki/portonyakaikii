"use client";

import dynamic from "next/dynamic";
import { Hero } from "./Hero";
import { TickerSection } from "./TickerSection";
import { AboutSection } from "./AboutSection";
import { PortaleSection } from "./PortaleSection";
import { SelectedWorkSection } from "./SelectedWorkSection";
import { ArsenalSection } from "./ArsenalSection";
import { JourneySection } from "./JourneySection";

const CatWorkflowSection = dynamic(
  () => import("./CatWorkflowSection").then((mod) => mod.CatWorkflowSection),
  { ssr: false }
);

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-[#efefe5] overflow-x-hidden">
      {/* 01. EXPLORE: Visor Hero Section */}
      <Hero />

      {/* Kinetic Dual-Tier Marquee Transition */}
      <TickerSection />

      {/* 02. ABOUT: "I Make Front-End For People" & Personal Side */}
      <AboutSection />

      {/* Portale 3D Glass Portal & Creator Card Transition */}
      <PortaleSection />

      {/* 03. WORK: 3 Webs, 10 Graphic Designs (3D), 1 Video Edit & Mega Mendung KAIKI */}
      <SelectedWorkSection />

      {/* Cat Workflow 10.5s Motion Explainer */}
      <CatWorkflowSection />

      {/* 04. ARSENAL: Built With & Platforms Marquee */}
      <ArsenalSection />

      {/* 05. JOURNEY: CV & Experience Timeline */}
      <JourneySection />

      {/* 06. CONTACT + FOOTER: Rendered by SiteShell via Footer.tsx (#contact) */}
    </div>
  );
}
