"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { RainSimulationCanvas } from "./RainSimulationCanvas";
import { WeatherControlPanel } from "./WeatherControlPanel";
import { HeroTitle } from "./HeroTitle";
import { InteractivePortrait } from "./InteractivePortrait";
import { BottomIntro } from "./BottomIntro";
import { ProductCallout } from "./ProductCallout";
import { ReticleFocus } from "./ReticleFocus";

export function Hero() {
  const [intensity, setIntensity] = useState(25);
  const [speed, setSpeed] = useState(80);
  const [size, setSize] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [wetness, setWetness] = useState(0);
  const [portraitHovered, setPortraitHovered] = useState(false);

  // Smooth mouse parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  const portraitShiftX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const titleShiftX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const reticleShiftX = useTransform(smoothX, [-0.5, 0.5], [-28, 28]);
  const reticleShiftY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="hero-section relative h-screen w-full bg-[#f4f4ed] text-[#111112] overflow-hidden select-none"
      style={{
        backgroundImage: "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Cyan/Blue subtle edge vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(56,189,248,0.18)]" />

      {/* Interactive Targeting Reticle Focus Brackets behind portrait */}
      <motion.div
        style={{ x: reticleShiftX, y: reticleShiftY }}
        className="absolute top-[17%] sm:top-[16%] left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-[33%] pointer-events-none z-20 flex items-center gap-3"
      >
        <div className={`transition-transform duration-500 ${portraitHovered ? "scale-110" : "scale-100"}`}>
          <ReticleFocus />
        </div>
        <div className="hidden sm:flex flex-col font-mono text-[10px] tracking-widest uppercase">
          <span className="text-[#0066FF] font-black">
            {portraitHovered ? "● SUBJECT LOCKED" : "○ SCANNING SUBJECT"}
          </span>
          <span className="text-[#111112]/60 font-bold">
            ID: KAIKI // SEM-06 INF.ENG
          </span>
        </div>
      </motion.div>

      {/* Center Stage: Portrait + Overlapping Negative Blend Typography */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ x: portraitShiftX }}
          className="absolute inset-x-0 bottom-0 flex justify-center items-end pointer-events-auto"
        >
          <InteractivePortrait onHoverChange={setPortraitHovered} />
        </motion.div>

        <motion.div style={{ x: titleShiftX }} className="absolute inset-0 pointer-events-none">
          <HeroTitle />
        </motion.div>
      </div>

      {/* Real-time Rain Particle Simulation Canvas */}
      <RainSimulationCanvas
        intensity={intensity}
        speed={speed}
        size={size}
        isPaused={isPaused}
        onWetnessChange={setWetness}
      />

      {/* Floating Top-Left "TEST YOUR SYSTEM" Control Panel */}
      <div className="absolute top-16 sm:top-24 left-3 sm:left-6 md:left-12 z-[35] pointer-events-auto">
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

      {/* Floating Top-Right: Storm Lab Surface Wetness Readout */}
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
          Creative<br />energy
        </p>
      </aside>

      {/* Floating Bottom-Left: Kaiki's Original Tagline */}
      <div className="absolute bottom-4 sm:bottom-8 left-4 right-4 sm:right-auto sm:left-6 md:left-12 z-[35] pointer-events-auto">
        <BottomIntro />
      </div>

      {/* Floating Bottom-Right: Upgraded Live Telemetry Callout (Desktop only to prevent mobile overlap) */}
      <div className="absolute bottom-5 sm:bottom-8 right-4 sm:right-6 md:right-12 z-[35] pointer-events-auto hidden md:flex">
        <ProductCallout />
      </div>
    </section>
  );
}

