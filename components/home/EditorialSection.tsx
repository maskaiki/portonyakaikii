"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EDITORIAL_PHOTOS = [
  {
    tag: "MALANG, 2024",
    title: "System Architecture & Lab Research",
    img: "/assets/shared/68302ff5ff89a9a4afb8c19e_ln-home-helm-large.webp",
    aspect: "aspect-[4/5]",
    className: "md:translate-y-8",
  },
  {
    tag: "SURABAYA TECH EXPO, 2024",
    title: "Digital Infrastructure & Pesantren Tech",
    img: "/assets/hero/hero-workspace-v1.jpg",
    aspect: "aspect-square",
    className: "md:-translate-y-12",
  },
  {
    tag: "JAKARTA RESEARCH SUMMIT, 2025",
    title: "AI & NLP Model Experimentation",
    img: "/assets/hero/hero-sunset-v1.jpg",
    aspect: "aspect-[16/10]",
    className: "md:translate-y-4",
  },
];

export function EditorialSection() {
  return (
    <section className="relative bg-[#20261a] text-[#f4f4ed] py-28 overflow-hidden">
      {/* Topographic line art backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="page-shell relative z-10">
        
        {/* Quote Block with Lando's Signature in Electric Lime */}
        <div className="max-w-2xl ml-auto mb-20 text-right md:pr-12">
          <motion.blockquote
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-brier text-2xl sm:text-3xl md:text-4xl text-[#efefe5] leading-snug"
          >
            &ldquo;It doesn&rsquo;t matter <span className="font-bold underline decoration-[#00d2ff]">where</span> you start, it&rsquo;s <span className="font-bold bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent">how</span> you progress from there.&rdquo;
          </motion.blockquote>

          {/* Authentic Electric Blue Handwritten Signature */}
          <div className="flex justify-end mt-4">
            <div className="relative w-40 h-16">
              <Image
                src="/assets/shared/signature-lime.svg"
                alt="Signature"
                fill
                className="object-contain filter drop-shadow-[0_2px_12px_rgba(0,210,255,0.6)]"
              />
            </div>
          </div>
        </div>

        {/* Asymmetric Photo Grid with Location Tags */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-center">
          {EDITORIAL_PHOTOS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className={`flex flex-col group ${item.className}`}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff]" />
                <span className="font-display text-[10px] font-bold uppercase tracking-widest text-[#f4f4ed]/70 group-hover:text-[#00d2ff] transition-colors">
                  {item.tag}
                </span>
              </div>

              <div
                className={`relative ${item.aspect} w-full rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shadow-xl group-hover:border-[#00d2ff]/70 transition-all duration-500`}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover filter contrast-[1.05] grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="font-sans text-xs text-white/90 font-medium">
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
