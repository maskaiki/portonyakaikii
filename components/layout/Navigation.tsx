"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "Explore", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Arsenal", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

function MagneticButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      xTo(dx * 0.28);
      yTo(dy * 0.28);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a ref={ref} href={href} className={className}>
      {children}
    </a>
  );
}

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      const sections = ["hero", "about", "work", "skills", "journey", "contact"];
      const scrollPos = y + 260;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Full-Width Edge-to-Edge Header (No top blue loading bar) */}
      <header className="fixed top-3 sm:top-5 inset-x-0 z-50 px-5 sm:px-10 lg:px-14 xl:px-20 flex items-center justify-between pointer-events-none transition-all duration-300">
        {/* Left: Magnetic RW Monogram */}
        <MagneticButton
          href="#hero"
          className={`pointer-events-auto flex items-center select-none transition-colors duration-300 px-4 py-2 border ${
            scrolled
              ? "bg-[#111112]/90 backdrop-blur-2xl border-white/15 !text-[#f4f4ed]"
              : "bg-white/70 backdrop-blur-2xl border-white/90 !text-[#111112]"
          }`}
        >
          <div className="flex items-baseline tracking-tighter leading-none">
            <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#0055FF]">
              R
            </span>
            <span className="font-brier italic text-xl sm:text-2xl font-bold -ml-0.5">
              W
            </span>
          </div>
        </MagneticButton>

        {/* Right: Architectural Site Nav */}
        <div
          className={`pointer-events-auto flex items-center gap-1.5 p-1.5 transition-all duration-300 border ${
            scrolled
              ? "bg-[#111112]/90 backdrop-blur-2xl border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
              : "site-nav-glass"
          }`}
        >
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={href}
                  href={href}
                  className={`group relative overflow-hidden site-nav-link ${
                    isActive
                      ? scrolled
                        ? "!bg-[#f4f4ed] !text-[#111112] !border-[#f4f4ed]"
                        : "site-nav-link--active"
                      : scrolled
                      ? "!bg-white/5 hover:!bg-white/15 !text-[#f4f4ed] !border-white/10"
                      : ""
                  }`}
                >
                  <span className="relative block overflow-hidden h-[14px] leading-[14px]">
                    <span className="block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                      {label}
                    </span>
                    <span className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-[#0055FF]">
                      {label}
                    </span>
                  </span>
                </a>
              );
            })}
          </nav>

          <MagneticButton
            href="#contact"
            className={`inline-flex items-center justify-center px-5 py-2 font-display text-xs font-black uppercase tracking-wider transition-colors duration-200 ${
              scrolled
                ? "bg-[#0055FF] hover:bg-[#f4f4ed] !text-white hover:!text-[#111112]"
                : "bg-[#111112] !text-[#f4f4ed] hover:bg-[#0055FF] hover:!text-white"
            }`}
          >
            Connect
          </MagneticButton>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`w-9 h-9 flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
              scrolled
                ? "border border-white/20 bg-white/10 text-white"
                : "border border-black/15 bg-white/60 text-[#111112]"
            }`}
            aria-label="Toggle Menu"
          >
            <span
              className={`w-4 h-[2px] transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-1 bg-[#0055FF]" : "bg-current"
              }`}
            />
            <span
              className={`w-4 h-[2px] transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-1 bg-[#0055FF]" : "bg-current"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Fullscreen Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#111112] text-[#f4f4ed] flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-24 overflow-y-auto"
          >
            <div className="w-full pt-8">
              <span className="font-display text-xs font-extrabold tracking-[0.2em] text-[#f4f4ed]/40 uppercase mb-8 block">
                Navigation
              </span>
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline justify-between py-4 border-b border-white/10 hover:border-[#0055FF] transition-colors"
                  >
                    <span className="font-display text-5xl sm:text-7xl font-black uppercase text-[#f4f4ed] group-hover:text-[#0055FF] group-hover:translate-x-4 transition-all duration-300">
                      {label}
                    </span>
                    <span className="font-brier italic text-2xl text-[#f4f4ed]/40 group-hover:text-[#0055FF]">
                      0{i + 1}
                    </span>
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="font-sans text-sm text-[#f4f4ed]/60">
                Mohammad Rifky Wicaksana — Visual Front-End Creator
              </p>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 bg-[#f4f4ed] !text-[#111112] font-display text-xs font-black uppercase tracking-wider hover:bg-[#0055FF] hover:!text-white transition-colors"
              >
                Start a Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
