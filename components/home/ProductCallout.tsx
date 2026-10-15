"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProductCalloutProps {
  className?: string;
}

export function ProductCallout({ className = "" }: ProductCalloutProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`z-25 flex flex-col items-end select-none pointer-events-auto ${className}`}
      aria-label="Technical Gear Specification"
    >
      {/* Framed Image with Storm Lab's iconic corner square tick */}
      <div className="relative p-1.5 sm:p-2 border border-black/25 dark:border-white/25 bg-white/40 dark:bg-black/30 backdrop-blur-md group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
        {/* Storm Lab Top-Right Solid Square Tick */}
        <div
          className="absolute -top-1 -right-1 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#111112] dark:bg-white"
          aria-hidden="true"
        />

        <div className="overflow-hidden w-28 sm:w-36 md:w-44 aspect-[1.12] relative">
          <Image
            src="/assets/hero/tech-callout.jpg"
            alt="Technical optical sensor"
            fill
            sizes="(max-width: 768px) 140px, 180px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>
      </div>

      {/* Barcode Graphic using Libre Barcode 128 */}
      <div
        className="w-28 sm:w-36 md:w-44 mt-2 sm:mt-2.5 font-barcode text-[#111112]/80 dark:text-[#efefe5]/80 text-xl sm:text-2xl leading-none select-none tracking-widest text-right overflow-hidden"
        aria-hidden="true"
      >
        <div className="whitespace-nowrap">NEVERSTOPCREATING</div>
        <div className="flex justify-between text-[14px] sm:text-[16px]">
          <span>KAIKI</span>
          <span>LAB2026</span>
          <span>SYSTEMS</span>
        </div>
      </div>

      {/* Technical Spec Caption with indented text */}
      <p
        className="mt-1.5 font-sans text-[9px] sm:text-[10px] md:text-[11px] text-[#111112]/70 dark:text-[#efefe5]/70 text-right leading-tight max-w-[140px] sm:max-w-[180px]"
        style={{ textIndent: "15%" }}
      >
        Performance digital design & software engineering crafted for scalable ecosystems.
      </p>
    </motion.aside>
  );
}
