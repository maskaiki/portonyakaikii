"use client";

import { useState } from "react";
import { RainSimulationCanvas } from "./RainSimulationCanvas";
import { WeatherControlPanel } from "./WeatherControlPanel";
import { HeroTitle } from "./HeroTitle";
import { InteractivePortrait } from "./InteractivePortrait";
import { BottomIntro } from "./BottomIntro";
import { ProductCallout } from "./ProductCallout";
import { ReticleFocus } from "./ReticleFocus";

export function Hero() {
  const [intensity, setIntensity] = useState(20); // Calm, elegant, non-crowded rain
  const [speed, setSpeed] = useState(75);
  const [size, setSize] = useState(28);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      id="hero"
      className="hero-section relative h-screen w-full bg-[#f4f4ed] text-[#111112] overflow-hidden select-none"
      style={{
        backgroundImage: "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Cyan/Blue subtle edge vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(56,189,248,0.18)]" />

      {/* Targeting Reticle Focus Brackets behind portrait */}
      <div className="absolute top-[16%] left-[26%] sm:left-[34%] pointer-events-none">
        <ReticleFocus />
      </div>

      {/* Center Stage: Interactive Half-Body Portrait + Overlapping Negative Blend Typography */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 flex justify-center items-end pointer-events-auto">
          <InteractivePortrait />
        </div>
        <HeroTitle />
      </div>

      {/* Real-time Rain Particle Simulation Canvas with realistic splashes & sliding beads at z-[30] */}
      <RainSimulationCanvas
        intensity={intensity}
        speed={speed}
        size={size}
        isPaused={isPaused}
      />

      {/* Floating Top-Left "TEST YOUR SYSTEM" Control Panel at z-[35] */}
      <div className="absolute top-20 sm:top-24 left-4 sm:left-6 md:left-12 z-[35] pointer-events-auto">
        <WeatherControlPanel
          intensity={intensity}
          speed={speed}
          size={size}
          isPaused={isPaused}
          onIntensityChange={setIntensity}
          onSpeedChange={setSpeed}
          onSizeChange={setSize}
          onTogglePause={() => setIsPaused((prev) => !prev)}
        />
      </div>

      {/* Floating Bottom-Left: Kaiki's Original Tagline (Building Systems, Exploring Ideas, Telling Stories) at z-[35] */}
      <div className="absolute bottom-5 sm:bottom-8 left-4 sm:left-6 md:left-12 z-[35] pointer-events-auto">
        <BottomIntro />
      </div>

      {/* Floating Bottom-Right: Technical Callout & Barcode at z-[35] */}
      <div className="absolute bottom-5 sm:bottom-8 right-4 sm:right-6 md:right-12 z-[35] pointer-events-auto">
        <ProductCallout />
      </div>
    </section>
  );
}
