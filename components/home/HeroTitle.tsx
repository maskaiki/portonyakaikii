"use client";

import { motion, AnimatePresence } from "framer-motion";

interface HeroTitleProps {
  className?: string;
  isVisible?: boolean;
}

export function HeroTitle({ className = "", isVisible = true }: HeroTitleProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`hero-title-stage absolute top-[22%] sm:top-[24%] left-[46%] sm:left-[50%] md:left-[52%] lg:left-[53%] pointer-events-none select-none z-10 ${className}`}
          aria-hidden="true"
        >
          <h1
            className="font-manrope font-extrabold lowercase tracking-[-0.07em] leading-[0.78161] whitespace-nowrap"
            style={{
              fontSize: "clamp(68px, min(8.4vw, 15svh), 195px)",
            }}
          >
            {/* Line 1: 'never' shifted right by 0.58em with blue 'er' */}
            <span className="block" style={{ marginLeft: "0.58em" }}>
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

            {/* Line 2: 'stop' with negative difference blend */}
            <span className="block">
              <span
                className="text-white negative-blend"
                style={{ mixBlendMode: "difference" }}
              >
                stop
              </span>
            </span>

            {/* Line 3: 'creating' with blue 'ing' */}
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
      )}
    </AnimatePresence>
  );
}

