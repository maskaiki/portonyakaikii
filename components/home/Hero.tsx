"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

  const sectionRef = useRef<HTMLElement>(null);
  const portraitStageRef = useRef<HTMLDivElement>(null);
  const titleStageRef = useRef<HTMLDivElement>(null);
  const leftHudRef = useRef<HTMLDivElement>(null);
  const rightHudRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  const portraitShiftX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const titleShiftX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const reticleShiftX = useTransform(smoothX, [-0.5, 0.5], [-28, 28]);
  const reticleShiftY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      if (portraitStageRef.current) {
        tl.to(
          portraitStageRef.current,
          {
            scale: 1.15,
            yPercent: 12,
            ease: "none",
          },
          0
        );
      }

      if (leftHudRef.current) {
        tl.to(leftHudRef.current, { xPercent: -25, opacity: 0, ease: "none" }, 0);
      }

      if (rightHudRef.current) {
        tl.to(rightHudRef.current, { xPercent: 25, opacity: 0, ease: "none" }, 0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="hero-section relative isolate h-screen w-full bg-[#f4f4ed] text-[#111112] overflow-hidden select-none"
      style={{
        backgroundImage: "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 lg:grid-cols-12 px-5 sm:px-10 lg:px-14 xl:px-20 opacity-[0.04]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-[#111112] h-full first:border-l" />
        ))}
      </div>

      {/* Storm Lab Reticle Brackets */}
      <motion.div
        style={{ x: reticleShiftX, y: reticleShiftY }}
        className="absolute top-[17%] sm:top-[16%] left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-[35%] pointer-events-none z-10"
      >
        <div className={`transition-transform duration-500 ${portraitHovered ? "scale-110" : "scale-100"}`}>
          <ReticleFocus />
        </div>
      </motion.div>

      {/* LAYER 1 (z-10): Portrait Stage directly inside Hero Section */}
      <div ref={portraitStageRef} className="absolute inset-0 z-10 pointer-events-none">
        <motion.div
          style={{ x: portraitShiftX }}
          className="absolute inset-x-0 bottom-0 flex justify-center items-end pointer-events-auto"
        >
          <InteractivePortrait onHoverChange={setPortraitHovered} />
        </motion.div>
      </div>

      {/* LAYER 2 (z-20): Direct Difference-Blend HeroTitle (Unwrapped so mix-blend-mode: difference blends with Portrait & Background!) */}
      <HeroTitle shiftX={titleShiftX} titleRef={titleStageRef} />

      {/* LAYER 3 (z-30): Real-time Rain Particle Simulation Canvas */}
      <RainSimulationCanvas
        intensity={intensity}
        speed={speed}
        size={size}
        isPaused={isPaused}
        onWetnessChange={setWetness}
      />

      {/* Left HUD Wrapper */}
      <div ref={leftHudRef} className="absolute inset-y-0 left-0 w-full pointer-events-none z-[35]">
        <div className="absolute top-16 sm:top-24 left-5 sm:left-10 lg:left-14 xl:left-20 pointer-events-auto">
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

        <div className="absolute bottom-5 sm:bottom-8 left-5 right-5 sm:right-auto sm:left-10 lg:left-14 xl:left-20 pointer-events-auto">
          <BottomIntro />
        </div>
      </div>

      {/* Right HUD Wrapper */}
      <div ref={rightHudRef} className="absolute inset-y-0 right-0 w-full pointer-events-none z-[35]">
        <aside
          className="surface-readout-panel absolute top-20 sm:top-24 right-5 sm:right-10 lg:right-14 xl:right-20 pointer-events-none select-none hidden md:flex"
          aria-label={`Creative energy: ${wetness} percent.`}
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

        <div className="absolute bottom-5 sm:bottom-8 right-5 sm:right-10 lg:right-14 xl:right-20 pointer-events-auto hidden md:flex">
          <ProductCallout />
        </div>
      </div>
    </section>
  );
}
