"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RainSimulationCanvas } from "./RainSimulationCanvas";
import { HeroTitle } from "./HeroTitle";
import { InteractivePortrait } from "./InteractivePortrait";
import { BottomIntro } from "./BottomIntro";
import { ProductCallout } from "./ProductCallout";
import { HeroGhostBuddy } from "./HeroGhostBuddy";

export function Hero() {

  const sectionRef = useRef<HTMLElement>(null);
  const portraitStageRef = useRef<HTMLDivElement>(null);
  const portraitShiftRef = useRef<HTMLDivElement>(null);
  const titleStageRef = useRef<HTMLDivElement>(null);
  const titleOverlayRef = useRef<HTMLDivElement>(null);
  const leftHudRef = useRef<HTMLDivElement>(null);
  const rightHudRef = useRef<HTMLDivElement>(null);

  const portraitXTo = useRef<gsap.QuickToFunc | null>(null);
  const titleStageXTo = useRef<gsap.QuickToFunc | null>(null);
  const titleOverlayXTo = useRef<gsap.QuickToFunc | null>(null);
  const viewportWidthRef = useRef<number>(1440);

  useEffect(() => {
    viewportWidthRef.current = window.innerWidth || 1440;
    const onResize = () => {
      viewportWidthRef.current = window.innerWidth || 1440;
    };
    window.addEventListener("resize", onResize, { passive: true });

    if (portraitShiftRef.current) {
      portraitXTo.current = gsap.quickTo(portraitShiftRef.current, "x", {
        duration: 0.45,
        ease: "power2.out",
      });
    }
    if (titleStageRef.current) {
      titleStageXTo.current = gsap.quickTo(titleStageRef.current, "x", {
        duration: 0.45,
        ease: "power2.out",
      });
    }
    if (titleOverlayRef.current) {
      titleOverlayXTo.current = gsap.quickTo(titleOverlayRef.current, "x", {
        duration: 0.45,
        ease: "power2.out",
      });
    }

    let ctx: gsap.Context | null = null;

    const initScrollTrigger = () => {
      if (ctx || !sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
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
              scale: 1.12,
              yPercent: 10,
              ease: "none",
              immediateRender: false,
            },
            0
          );
        }

        if (leftHudRef.current) {
          tl.to(
            leftHudRef.current,
            { xPercent: -25, opacity: 0, ease: "none", immediateRender: false },
            0
          );
        }

        if (rightHudRef.current) {
          tl.to(
            rightHudRef.current,
            { xPercent: 25, opacity: 0, ease: "none", immediateRender: false },
            0
          );
        }
      }, sectionRef);
    };

    window.addEventListener("scroll", initScrollTrigger, {
      passive: true,
      once: true,
    });
    window.addEventListener("wheel", initScrollTrigger, {
      passive: true,
      once: true,
    });
    window.addEventListener("touchmove", initScrollTrigger, {
      passive: true,
      once: true,
    });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", initScrollTrigger);
      window.removeEventListener("wheel", initScrollTrigger);
      window.removeEventListener("touchmove", initScrollTrigger);
      if (ctx) ctx.revert();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const nx = e.clientX / viewportWidthRef.current - 0.5;
    portraitXTo.current?.(nx * 32);
    titleStageXTo.current?.(-nx * 40);
    titleOverlayXTo.current?.(-nx * 40);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="hero-section relative isolate h-screen w-full bg-[#f4f4ed] text-[#111112] overflow-hidden select-none"
      style={{
        backgroundImage:
          "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle Studio Lighting Gradient (Key Light Top-Right + Soft Halo Behind Torso) */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 48% 52% at 50% 62%, rgba(0, 85, 255, 0.08) 0%, rgba(56, 189, 248, 0.04) 45%, transparent 74%), radial-gradient(circle at 80% 16%, rgba(255, 255, 255, 0.92) 0%, transparent 52%)",
        }}
        aria-hidden="true"
      />

      {/* LAYER 1 (z-10): Portrait Stage With Realistic Cast Shadow */}
      <div
        ref={portraitStageRef}
        className="absolute inset-0 z-10 pointer-events-none will-change-transform"
      >
        <div
          ref={portraitShiftRef}
          className="absolute inset-x-0 bottom-0 flex justify-center items-end pointer-events-auto will-change-transform"
        >
          <InteractivePortrait />
        </div>
      </div>

      {/* Subtle Bottom Grounding Fade for Clean HUD Contrast */}
      <div
        className="absolute inset-x-0 bottom-0 h-64 sm:h-32 z-[15] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(244, 244, 237, 0.96) 0%, rgba(244, 244, 237, 0.72) 45%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* LAYER 2 (z-20): Original Difference-Blend HeroTitle */}
      <HeroTitle titleRef={titleStageRef} overlayRef={titleOverlayRef} />

      {/* LAYER 3 (z-30): Real-time Rain Particle Simulation Canvas (Fixed Preset) */}
      <RainSimulationCanvas
        intensity={92}
        speed={89}
        size={100}
        isPaused={false}
      />

      {/* LAYER 4 (z-32): Interactive Glass Ghost Buddy Mascot (Cleanly In Front) */}
      <HeroGhostBuddy />

      {/* Left HUD Wrapper */}
      <div
        ref={leftHudRef}
        className="absolute inset-y-0 left-0 w-full pointer-events-none z-[35]"
      >
        <div className="absolute bottom-6 sm:bottom-9 left-5 right-5 sm:right-auto sm:left-10 lg:left-14 xl:left-20 pointer-events-auto">
          <BottomIntro />
        </div>
      </div>

      {/* Right HUD Wrapper */}
      <div
        ref={rightHudRef}
        className="absolute inset-y-0 right-0 w-full pointer-events-none z-[35]"
      >
        <div className="absolute bottom-6 sm:bottom-9 right-5 sm:right-10 lg:right-14 xl:right-20 pointer-events-auto hidden md:flex">
          <ProductCallout />
        </div>
      </div>
    </section>
  );
}
