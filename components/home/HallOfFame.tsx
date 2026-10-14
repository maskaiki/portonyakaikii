"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const HALL_OF_FAME_ITEMS = [
  {
    title: "Maskumambang",
    category: "Academic Infrastructure",
    year: "2025",
    tag: "Platform",
    imgBase: "/assets/shared/68305b3e6c7ab86033cf172c_In-helm-2025-Season-base.webp",
    imgHover: "/assets/shared/68305b411c575b2f777125f6_In-helm-2025-Season-hover.webp",
    href: "/projects",
  },
  {
    title: "NLP Research",
    category: "AI & Knowledge Extraction",
    year: "2025",
    tag: "AI Engine",
    imgBase: "/assets/shared/68305a153de4a824d397d21d_In-helm-2023-Chrome-base.webp",
    imgHover: "/assets/shared/68305b411c575b2f777125f6_In-helm-2025-Season-hover.webp",
    href: "/projects",
  },
  {
    title: "Chain Registry",
    category: "Decentralized Credentials",
    year: "2024",
    tag: "Web3",
    imgBase: "/assets/shared/68305a2e3fccf71c6d71e5a8_In-helm-2023-Las%20Vegas-base.webp",
    imgHover: "/assets/shared/68305b411c575b2f777125f6_In-helm-2025-Season-hover.webp",
    href: "/projects",
  },
  {
    title: "Cinematic Reel",
    category: "Visual Storytelling",
    year: "2024",
    tag: "Creative",
    imgBase: "/assets/shared/68305a459178b78319e05b55_In-helm-2023-Race%20100-base.webp",
    imgHover: "/assets/shared/68305b411c575b2f777125f6_In-helm-2025-Season-hover.webp",
    href: "/lab",
  },
];

export function HallOfFame() {
  return (
    <section className="relative bg-[#111112] text-[#f4f4ed] py-28 overflow-hidden">
      {/* Top Edge Panorama Transition Strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent" />

      <div className="page-shell relative z-10">
        
        {/* Header Block: PROJECTS (Mona Sans) + HALL OF FAME (Brier Blue Gradient) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-widest text-[#00d2ff] mb-2 block">
              SHOWCASE ARCHIVE
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase text-[#efefe5] leading-none">
              PROJECTS <br />
              <span className="font-brier italic font-normal bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent">HALL OF FAME</span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm text-white/60 leading-relaxed">
            From high-throughput platforms to experimental AI models, exploring the frontiers of software craftsmanship and design with relentless curiosity.
          </p>
        </div>

        {/* 4-Column Notched Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HALL_OF_FAME_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="notched-card-wrap group flex flex-col"
            >
              <Link href={item.href} className="relative block w-full aspect-[407/411] overflow-hidden">
                
                {/* SVG Notched Border Frame (Exact Lando Norris Path) */}
                <svg
                  className="absolute inset-0 w-full h-full text-white/15 group-hover:text-[#00d2ff] transition-colors duration-300 pointer-events-none z-20"
                  viewBox="0 0 407 411"
                  fill="none"
                >
                  <path
                    d="M8 1h390.89a7 7 0 0 1 7 7v356.983a7 7 0 0 1-7 7H263.329a23.999 23.999 0 0 0-18.766 9.038l-16.499 20.694A21.999 21.999 0 0 1 210.862 410H8a7 7 0 0 1-7-7V8a7 7 0 0 1 7-7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>

                {/* Card Background & Visual Render */}
                <div className="absolute inset-0 bg-[#0a192f]/90 backdrop-blur-sm rounded-xl overflow-hidden p-6 flex flex-col items-center justify-center border border-white/5">
                  
                  {/* Base 3D Render Image */}
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 group-hover:scale-110 transition-transform duration-500 ease-out">
                    <Image
                      src={item.imgBase}
                      alt={item.title}
                      fill
                      className="object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
                    />
                  </div>

                  {/* Title & Category at Top Left */}
                  <div className="absolute top-5 left-6 z-10 text-left">
                    <h3 className="font-display text-lg font-black uppercase text-white group-hover:text-[#00d2ff] transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[11px] text-white/50">
                      {item.category}
                    </p>
                  </div>

                  {/* Notched Corner Badge at Bottom Right */}
                  <div className="absolute bottom-3 right-6 z-10 flex items-center gap-1.5 font-display text-xs font-black uppercase tracking-wider">
                    <span className="text-white/80">{item.tag}</span>
                    <span className="text-[#00d2ff]">{item.year}</span>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Link */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-display text-xs font-black tracking-widest text-[#00d2ff] hover:text-white uppercase transition-colors"
          >
            <span>VIEW ALL WORKS & EXPERIMENTS</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
