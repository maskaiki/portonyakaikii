"use client";

import { Hero } from "./Hero";
import { TickerSection } from "./TickerSection";
import { StatementSection } from "./StatementSection";
import { EditorialSection } from "./EditorialSection";
import { HallOfFame } from "./HallOfFame";
import { CollabsSection } from "./CollabsSection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-[#efefe5] overflow-x-hidden">
      {/* 1. Sliced Visor Hero Section with Austin GP Cyber Badge */}
      <Hero />

      {/* 2. Message from Rifky & Kinetic Dual-Tier Marquee */}
      <TickerSection />

      {/* 3. Bold Alternating Kinetic Statement */}
      <StatementSection />

      {/* 4. Asymmetric Editorial Grid & Lime Signature Quote */}
      <EditorialSection />

      {/* 5. Projects Hall of Fame with Authentic Notched Cyber Cards */}
      <HallOfFame />

      {/* 6. Tech Stack & Collaborations with Giant Graffiti Collabs Script */}
      <CollabsSection />
    </div>
  );
}
