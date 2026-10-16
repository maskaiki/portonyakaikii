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
  const [intensity, setIntensity] = useState(25); // Elegant, visible Storm Lab rain flow
  const [speed, setSpeed] = useState(80);
  const [size, setSize] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [wetness, setWetness] = useState(0);
  const [lookMode, setLookMode] = useState<"studio" | "creative">("studio");

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
        <InteractivePortrait
          lookMode={lookMode}
          onToggleLook={() => setLookMode((prev) => (prev === "studio" ? "creative" : "studio"))}
        />
        <HeroTitle isVisible={lookMode === "studio"} />
      </div>

      {/* Real-time Rain Particle Simulation Canvas with realistic splashes & sliding beads at z-[30] */}
      <RainSimulationCanvas
        intensity={intensity}
        speed={speed}
        size={size}
        isPaused={isPaused}
        onWetnessChange={setWetness}
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

      {/* Floating Top-Right: Storm Lab Surface Wetness Readout from experience.tsx at z-[35] */}
      <aside
        className="surface-readout-panel absolute top-20 sm:top-24 right-4 sm:right-6 md:right-12 z-[35] pointer-events-none select-none hidden md:flex"
        aria-label={`Subject surface wetness: ${wetness} percent.`}
        title="Real-time particle telemetry"
      >
        <div className="surface-readout__measurement" aria-hidden="true">
          <svg className="surface-readout__drop" viewBox="0 0 24 32" fill="currentColor">
            <path d="M12 0C9 6 1 16 1 21a11 11 0 0 0 22 0C23 16 15 6 12 0Z" />
          </svg>
          <div className="surface-readout__value">
            <span>{String(wetness).padStart(2, "0")}</span>
            <span className="surface-readout__unit">%</span>
          </div>
        </div>
        <p className="surface-readout-caption">
          Subject surface<br />wetness
        </p>
      </aside>

      {/* Floating Bottom-Left: Kaiki's Original Tagline at z-[35] */}
      <div className="absolute bottom-5 sm:bottom-8 left-4 sm:left-6 md:left-12 z-[35] pointer-events-auto">
        <BottomIntro />
      </div>

      {/* Floating Bottom-Right: Technical Callout & Barcode at z-[35] */}
      <div
        className={`absolute bottom-5 sm:bottom-8 right-4 sm:right-6 md:right-12 z-[35] pointer-events-auto transition-all duration-300 ${
          lookMode === "creative" ? "opacity-25 hover:opacity-100 hidden 2xl:flex" : "opacity-100"
        }`}
      >
        <ProductCallout />
      </div>
    </section>
  );
}
