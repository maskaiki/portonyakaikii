"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Quad,
  segment,
  inOut,
  lerpQuad,
  scaleQuad,
  rectQuad,
  quadToMatrix3d,
} from "@/lib/quad";

export function PortaleSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgBoxRef = useRef<HTMLDivElement>(null);
  const lightPlaneRef = useRef<HTMLDivElement>(null);
  const portalPlaneRef = useRef<HTMLDivElement>(null);
  const portalFillRef = useRef<HTMLDivElement>(null);
  const portalRimRef = useRef<HTMLDivElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const readyScreenRef = useRef<HTMLDivElement>(null);
  const cardTurnWrapRef = useRef<HTMLDivElement>(null);
  const cardFloatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const state = { p: 0 };
    let rafId: number;

    const ctx = gsap.context(() => {
      if (!pinRef.current || !cardTurnWrapRef.current || !cardFloatRef.current) return;

      // Second Screen Reveal Timeline (M4 from Portale Spec)
      const readyTl = gsap.timeline({ paused: true });
      readyTl.fromTo(
        cardTurnWrapRef.current,
        {
          rotationY: -70,
          rotationZ: 18,
          scale: 0.72,
          filter: "blur(16px) brightness(1.6)",
          opacity: 0,
        },
        {
          rotationY: 0,
          rotationZ: 0,
          scale: 1,
          filter: "blur(0px) brightness(1)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          clearProps: "filter",
        },
        0
      );

      const words = pinRef.current.querySelectorAll(".portale-word");
      readyTl.fromTo(
        words,
        { opacity: 0, yPercent: 28, filter: "blur(12px)" },
        {
          opacity: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 0.65,
          stagger: 0.07,
          ease: "power2.out",
          clearProps: "filter",
        },
        0.18
      );

      // Continuous Floating Motion on the Creator Card
      gsap.to(cardFloatRef.current, {
        yPercent: -2.2,
        rotationZ: 1.2,
        duration: 3.0,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Pointer 3D Tilt on the Floating Card
      const rY = gsap.quickTo(cardFloatRef.current, "rotationY", { duration: 0.7, ease: "power2.out" });
      const rX = gsap.quickTo(cardFloatRef.current, "rotationX", { duration: 0.7, ease: "power2.out" });

      const onMove = (e: PointerEvent) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        rY(nx * 10);
        rX(-ny * 8);
      };
      window.addEventListener("pointermove", onMove);

      let revealed = false;

      // Pinned ScrollTrigger driving p: 0 -> 1 (M3 from Portale Spec)
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: () => "+=" + window.innerHeight * 1.5,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          state.p = self.progress;
          if (state.p >= 0.78 && !revealed) {
            revealed = true;
            readyTl.timeScale(1).play();
          } else if (state.p < 0.72 && revealed) {
            revealed = false;
            readyTl.timeScale(2).reverse();
          }
        },
      });

      const updatePortal = () => {
        rafId = requestAnimationFrame(updatePortal);
        if (
          !pinRef.current ||
          !bgBoxRef.current ||
          !lightPlaneRef.current ||
          !portalPlaneRef.current ||
          !portalFillRef.current ||
          !portalRimRef.current ||
          !heroCopyRef.current ||
          !readyScreenRef.current
        )
          return;

        const p = state.p;
        const W = pinRef.current.clientWidth;
        const H = pinRef.current.clientHeight;

        // Perspective Skewed Glass Monolith Corners in the Center
        const cw = Math.min(W * 0.24, 310);
        const ch = cw * (1024 / 652);
        const cx = W * 0.5;
        const cy = H * 0.5;

        const base: Quad = [
          { x: cx - cw * 0.48, y: cy - ch * 0.52 },
          { x: cx + cw * 0.52, y: cy - ch * 0.44 },
          { x: cx + cw * 0.52, y: cy + ch * 0.46 },
          { x: cx - cw * 0.48, y: cy + ch * 0.54 },
        ];

        const d = 1 + 0.18 * inOut(segment(p, 0, 0.7));
        bgBoxRef.current.style.transform = `scale(${d})`;

        const inPhoto = scaleQuad(base, { x: cx, y: cy }, d);
        const h = ((inPhoto[3].y - inPhoto[0].y + inPhoto[2].y - inPhoto[1].y) / 2) * 1.06;
        const turned = lerpQuad(
          inPhoto,
          rectQuad(cx, cy, (h * 652) / 1024, h),
          inOut(segment(p, 0, 0.45))
        );

        const coverH = Math.max(H, (W * 1024) / 652) * 1.25;
        const cover = rectQuad(W / 2, H / 2, (coverH * 652) / 1024, coverH);
        const quad = lerpQuad(turned, cover, Math.pow(segment(p, 0.5, 0.82), 3));

        const mat3d = quadToMatrix3d(652, 1024, quad);
        lightPlaneRef.current.style.transform = mat3d;
        portalPlaneRef.current.style.transform = mat3d;

        lightPlaneRef.current.style.opacity = String(1 - segment(p, 0.15, 0.45));
        portalRimRef.current.style.opacity = String(segment(p, 0.08, 0.4));
        portalFillRef.current.style.opacity = String(segment(p, 0.35, 0.62));

        heroCopyRef.current.style.transform = `translateY(${-120 * segment(p, 0.2, 0.8)}px)`;

        const readyAlpha = segment(p, 0.78, 0.82);
        readyScreenRef.current.style.opacity = String(readyAlpha);
        readyScreenRef.current.style.visibility = readyAlpha > 0 ? "visible" : "hidden";
      };

      rafId = requestAnimationFrame(updatePortal);

      return () => {
        window.removeEventListener("pointermove", onMove);
        cancelAnimationFrame(rafId);
      };
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef}>
      <div
        ref={pinRef}
        className="relative w-full h-screen overflow-hidden bg-[#f4f4ed] select-none"
      >
        {/* LAYER 1: Atmospheric Backdrop with Glass Monolith */}
        <div
          ref={bgBoxRef}
          className="absolute inset-0 bg-gradient-to-br from-[#0b101d] via-[#13203d] to-[#0a0c12] will-change-transform"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
              backgroundSize: "cover",
            }}
          />

          {/* Mapped 652x1024 Glowing Glass Card Light Plane */}
          <div
            ref={lightPlaneRef}
            className="absolute left-0 top-0 w-[652px] h-[1024px] origin-top-left pointer-events-none will-change-transform"
            style={{
              filter:
                "drop-shadow(0 0 6px rgba(255,255,255,0.95)) drop-shadow(0 0 22px rgba(0,85,255,0.65))",
            }}
          >
            <div className="w-[1024px] h-[652px] origin-top-left translate-x-[652px] rotate-90 rounded-[28px] border-[3px] border-white/90 bg-white/[0.06] backdrop-blur-md p-14 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <div className="w-24 h-20 rounded-xl border-2 border-white/80 grid grid-cols-2 gap-1 p-2">
                  <div className="border border-white/60 rounded-sm" />
                  <div className="border border-white/60 rounded-sm" />
                  <div className="border border-white/60 rounded-sm" />
                  <div className="border border-white/60 rounded-sm" />
                </div>
                <span className="font-display text-5xl font-black tracking-tighter">
                  RW // KAIKI
                </span>
              </div>

              <div className="flex items-baseline justify-between font-sans text-4xl tracking-tight">
                <span>RIFKY WICAKSANA</span>
                <span>2026 •••• 0001</span>
              </div>
            </div>
          </div>
        </div>

        {/* LAYER 2: First Screen Copy */}
        <div
          ref={heroCopyRef}
          className="absolute inset-0 z-10 px-6 sm:px-14 pb-12 flex flex-col justify-end pointer-events-none will-change-transform"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-3 h-3 rounded-[2px] bg-white" />
                <span className="font-sans text-sm text-white/90">
                  Interactive Portal Experience
                </span>
              </div>
              <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-[0.94]">
                Enter New Digital <br />
                Worlds With Kaiki
              </h2>
            </div>

            <p className="font-sans text-base sm:text-lg text-white/80 max-w-md leading-snug">
              Scroll down to step inside the glass portal — where front-end engineering, visual design, and motion converge.
            </p>
          </div>
        </div>

        {/* LAYER 3: Expanding White/Bone Portal Over Layer */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          <div
            ref={portalPlaneRef}
            className="absolute left-0 top-0 w-[652px] h-[1024px] origin-top-left will-change-transform"
          >
            <div
              ref={portalFillRef}
              className="absolute inset-0 rounded-[28px] bg-[#f4f4ed] opacity-0"
            />
            <div
              ref={portalRimRef}
              className="absolute inset-0 rounded-[28px] border-[16px] border-white opacity-0 shadow-[0_0_40px_10px_rgba(255,255,255,0.9),inset_0_0_30px_8px_rgba(255,255,255,0.8)]"
            />
          </div>
        </div>

        {/* LAYER 4: Second Screen ("Everything Ready / Before You Launch") */}
        <section
          ref={readyScreenRef}
          className="absolute inset-0 z-30 bg-[#f4f4ed] text-[#151515] opacity-0 invisible overflow-hidden"
        >
          {/* Giant Pale Background Wordmark */}
          <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center pointer-events-none select-none">
            <span className="font-display text-[19vw] font-black uppercase tracking-tighter text-[#99B6D2]/20 leading-none">
              KAIKI STUDIO
            </span>
          </div>

          {/* Headline 1 (Sits UNDER the floating 3D card at z-0) */}
          <h3 className="absolute left-6 sm:left-14 top-[14%] sm:top-[16%] z-0 font-display text-5xl sm:text-7xl lg:text-[6.2rem] font-black uppercase tracking-tight text-[#151515] leading-none">
            {"Everything Ready".split(" ").map((w, i) => (
              <span key={i} className="portale-word inline-block mr-4">
                {w}
              </span>
            ))}
          </h3>

          {/* Center Floating 3D Creator Card (z-10, between the two headlines!) */}
          <div
            className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[88vw] max-w-[640px] aspect-[16/10] z-10 pointer-events-none"
            style={{ perspective: "1200px" }}
          >
            <div ref={cardTurnWrapRef} className="w-full h-full will-change-transform">
              <div
                ref={cardFloatRef}
                className="w-full h-full rounded-[28px] p-8 sm:p-12 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0055FF] text-white shadow-[0_35px_90px_rgba(0,40,120,0.45)] border border-white/30 flex flex-col justify-between will-change-transform"
              >
                <div className="flex items-center justify-between">
                  <span className="px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md font-display text-xs font-bold uppercase tracking-wider">
                    Creator Pass // Verified
                  </span>
                  <span className="font-display text-3xl font-black tracking-tight">
                    RW
                  </span>
                </div>

                <div>
                  <span className="font-brier italic text-2xl text-[#93c5fd] block mb-1">
                    I Make Front-End For People
                  </span>
                  <h4 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none">
                    STANDOUT WEB PORTFOLIOS
                  </h4>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/20 text-xs sm:text-sm font-sans text-white/80">
                  <span>MOHAMMAD RIFKY WICAKSANA</span>
                  <span>MALANG, ID • 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Headline 2 (Sits OVER the floating 3D card at z-20!) */}
          <h3 className="absolute right-6 sm:right-14 bottom-[22%] sm:bottom-[20%] z-20 font-display text-5xl sm:text-7xl lg:text-[6.2rem] font-black uppercase tracking-tight text-[#151515] leading-none text-right">
            {"Before You Launch".split(" ").map((w, i) => (
              <span key={i} className="portale-word inline-block ml-4">
                {w}
              </span>
            ))}
          </h3>

          {/* Bottom Copy & CTA */}
          <div className="absolute inset-x-6 sm:inset-x-14 bottom-8 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="space-y-4 max-w-md">
              <p className="font-sans text-sm sm:text-base text-[#151515]/80 leading-relaxed">
                Commission your custom portfolio website, graphic design layouts, and video edits — crafted end-to-end so you launch with confidence.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#161616] !text-white hover:bg-[#0055FF] font-sans text-sm font-medium transition-colors"
              >
                <span>Start Your Project</span>
                <span>↗</span>
              </a>
            </div>

            <span className="font-sans text-sm text-[#717171]">
              Scroll down for works ↓
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

