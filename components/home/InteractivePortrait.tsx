"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type LookMode = "studio" | "creative";

interface InteractivePortraitProps {
  lookMode?: LookMode;
  onToggleLook?: () => void;
  onHoverChange?: (hovered: boolean) => void;
  className?: string;
}

export function InteractivePortrait({
  lookMode: controlledMode,
  onToggleLook,
  onHoverChange,
  className = "",
}: InteractivePortraitProps) {
  const [internalMode, setInternalMode] = useState<LookMode>("studio");
  const mode = controlledMode ?? internalMode;

  const handleToggle = () => {
    if (onToggleLook) {
      onToggleLook();
    } else {
      setInternalMode((prev) => (prev === "studio" ? "creative" : "studio"));
    }
  };

  return (
    <div className={`w-full h-full pointer-events-none ${className}`}>
      <AnimatePresence mode="wait">
        {mode === "studio" ? (
          /* 01. Studio Look: Centered, clean, invitation to pop up creative look */
          <motion.div
            key="studio-stage"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="relative flex flex-col items-center justify-end select-none h-[86vh] sm:h-[90vh] lg:h-[94vh] max-h-[960px] aspect-[720/960] mx-auto cursor-pointer group pointer-events-auto"
            onClick={handleToggle}
            onMouseEnter={() => onHoverChange?.(true)}
            onMouseLeave={() => onHoverChange?.(false)}
            title="Click to pop up creative pose look"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle();
              }
            }}
            aria-label="Toggle to Look 02 Creative Pose"
          >
            {/* Interactive floating badge placed clearly beside subject without covering face */}
            <div className="absolute top-[18%] -left-6 sm:-left-16 md:-left-24 z-30 pointer-events-auto">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle();
                }}
                className="px-3.5 py-1.5 bg-white/90 dark:bg-[#111112]/90 backdrop-blur-md border border-black/15 dark:border-white/20 font-mono text-[10px] sm:text-[11px] font-bold text-[#111112] dark:text-[#efefe5] shadow-lg uppercase tracking-wider flex items-center gap-2 group cursor-pointer transition-all hover:border-[#00d2ff]"
              >
                <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-ping" />
                <span>LOOK 01 // STUDIO</span>
                <span className="text-[#00d2ff] group-hover:translate-x-1 transition-transform font-bold">
                  ➔ POP UP CREATIVE
                </span>
              </motion.button>
            </div>

            {/* Blue studio portrait */}
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
              <Image
                src="/assets/hero/kaiki-portrait-young.webp"
                alt="Mohammad Rifky Wicaksana (Kaiki) — Studio Clean"
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
                className="object-contain object-bottom group-hover:scale-[1.01] transition-transform duration-500 ease-out"
              />
            </div>
          </motion.div>
        ) : (
          /* 02. Creative Look: Enchanced size, flush to right edge ("mentokin ke kanan"), pop up spring animation, typography in hand grip */
          <motion.div
            key="creative-stage"
            initial={{ opacity: 0, scale: 0.7, y: 150, x: 90 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 110, x: 70 }}
            transition={{
              type: "spring",
              stiffness: 230,
              damping: 21,
              mass: 0.78,
            }}
            className="absolute right-0 bottom-0 select-none h-[93vh] sm:h-[97vh] lg:h-[100vh] max-h-[1100px] aspect-[720/960] cursor-pointer group pointer-events-auto z-20"
            onClick={handleToggle}
            onMouseEnter={() => onHoverChange?.(true)}
            onMouseLeave={() => onHoverChange?.(false)}
            title="Click to return to studio look"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle();
              }
            }}
            aria-label="Toggle back to Look 01 Studio"
          >
            {/* Return pill button positioned right above hand typography column */}
            <div className="absolute top-[13%] sm:top-[14%] right-[37%] sm:right-[38%] md:right-[39%] z-30 pointer-events-auto">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle();
                }}
                className="px-3.5 py-1.5 bg-[#111112]/90 text-white border border-white/30 backdrop-blur-md font-mono text-[10px] sm:text-[11px] font-bold tracking-wider hover:bg-black hover:border-[#00d2ff] transition-all flex items-center gap-2 shadow-xl cursor-pointer"
                title="Click to return to studio look"
              >
                <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-ping" />
                <span>LOOK 02 // CREATIVE</span>
                <span className="text-[#00d2ff] font-bold">⟵ RETURN TO STUDIO</span>
              </motion.button>
            </div>

            {/* Typography in Hand Grip: Anchored right into the palm and fingers (Y: ~20%, X: ~39%) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.84, x: -65 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.86, x: -40 }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[19.5%] sm:top-[20%] right-[37%] sm:right-[38%] md:right-[39%] pointer-events-none select-none z-20 flex flex-col items-end text-right"
            >
              {/* Telemetry mark */}
              <div className="flex items-center gap-1.5 mb-1.5 px-2.5 py-0.5 bg-black/60 backdrop-blur-md border border-[#00d2ff]/40 font-mono text-[9px] sm:text-[10px] tracking-widest text-[#00d2ff] uppercase shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-ping" />
                <span>[ GESTURE // 02 · NEVER STOP CREATING ]</span>
              </div>

              {/* Big bold typography nestled inside hand grip */}
              <h1
                className="font-manrope font-extrabold lowercase tracking-[-0.07em] leading-[0.78161] whitespace-nowrap"
                style={{
                  fontSize: "clamp(62px, min(8.6vw, 15svh), 185px)",
                }}
              >
                {/* Line 1: 'never' enters directly between curled fingers & thumb */}
                <span className="block" style={{ marginRight: "0.08em" }}>
                  <span
                    className="text-white negative-blend"
                    style={{ mixBlendMode: "difference" }}
                  >
                    nev
                  </span>
                  <span
                    className="text-[#00d2ff]"
                    style={{ mixBlendMode: "normal" }}
                  >
                    er
                  </span>
                </span>

                {/* Line 2: 'stop' */}
                <span className="block" style={{ marginRight: "0.38em" }}>
                  <span
                    className="text-white negative-blend"
                    style={{ mixBlendMode: "difference" }}
                  >
                    stop
                  </span>
                </span>

                {/* Line 3: 'creating' */}
                <span className="block">
                  <span
                    className="text-white negative-blend"
                    style={{ mixBlendMode: "difference" }}
                  >
                    creat
                  </span>
                  <span
                    className="text-[#00d2ff]"
                    style={{ mixBlendMode: "normal" }}
                  >
                    ing
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* Brown Creative Pose portrait flush to right-bottom edge */}
            <div className="absolute inset-0 flex items-end justify-end pointer-events-none">
              <Image
                src="/assets/hero/kaiki-portrait-pose.webp"
                alt="Mohammad Rifky Wicaksana (Kaiki) — Creative Pose"
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
                className="object-contain object-right-bottom group-hover:scale-[1.01] transition-transform duration-500 ease-out"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

