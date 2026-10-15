"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Arsenal", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <>
      <header className="fixed top-3 sm:top-5 inset-x-0 z-50 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto transition-all duration-300">
        <div
          className={`w-full rounded-full transition-all duration-300 px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between backdrop-blur-2xl ${
            scrolled
              ? "bg-[#0A0A0A]/85 border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] text-[#efefe5]"
              : "bg-white/25 dark:bg-black/35 border border-white/60 dark:border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.85)] text-[#111112]"
          }`}
        >
          {/* Left: Aesthetic Unboxed RW Monogram + KAIKI */}
          <a
            href="#hero"
            className="flex items-center gap-2 text-left group select-none transition-transform duration-200 hover:scale-[1.03]"
            aria-label="Kaiki — Back to Top"
          >
            {/* Aesthetic Unboxed Typographic RW Monogram */}
            <div className="flex items-baseline tracking-tighter leading-none">
              <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#00d2ff] transition-transform duration-300 group-hover:-translate-y-0.5">
                R
              </span>
              <span
                className={`font-brier italic text-xl sm:text-2xl font-bold -ml-1 transition-colors duration-300 ${
                  scrolled ? "text-[#efefe5]" : "text-[#111112]"
                } group-hover:text-[#00d2ff]`}
              >
                W
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] ml-1 self-center animate-pulse" />
            </div>

            {/* Brand Name Text: KAIKI */}
            <span
              className={`font-display text-sm sm:text-base font-black tracking-[0.16em] uppercase transition-colors duration-200 ${
                scrolled
                  ? "text-[#efefe5] group-hover:text-[#00d2ff]"
                  : "text-[#111112] group-hover:text-[#00d2ff]"
              }`}
            >
              KAIKI
            </span>
          </a>

          {/* Center: Desktop Anchor Links Navigation (Minimal Glass Pill Nav) */}
          <nav className="hidden lg:flex items-center gap-1">
            <a
              href="#hero"
              className="px-3.5 py-1.5 rounded-full font-manrope text-[11px] font-extrabold uppercase tracking-wider text-[#111112] dark:text-white bg-white/50 dark:bg-white/15 backdrop-blur-md transition-all duration-200"
            >
              Explore
            </a>
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="px-3.5 py-1.5 rounded-full font-manrope text-[11px] font-extrabold uppercase tracking-wider text-[#111112]/75 dark:text-[#efefe5]/75 hover:text-[#111112] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right: Glassmorphism CONNECT Button + Mobile Hamburger Menu */}
          <div className="flex items-center gap-2.5">
            <a
              href="#contact"
              className={`inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full font-display text-xs font-black uppercase tracking-wider transition-all duration-200 transform hover:-translate-y-0.5 border ${
                scrolled
                  ? "bg-white text-black hover:bg-[#00d2ff] hover:text-black border-transparent shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
                  : "bg-[#111112] text-white hover:bg-[#00d2ff] hover:text-black border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-ping" />
              <span>CONNECT</span>
            </a>

            {/* Circular Glass Hamburger Button */}
            <button
              onClick={toggleMenu}
              className={`w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-full backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00d2ff] ${
                scrolled
                  ? "border border-white/15 hover:border-[#00d2ff] bg-white/10 text-white"
                  : "border border-white/60 dark:border-white/20 hover:border-[#00d2ff] bg-white/40 dark:bg-white/10 text-[#111112]"
              }`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span
                className={`w-4 h-[2px] rounded-full transition-all duration-300 ${
                  menuOpen
                    ? "rotate-45 translate-y-1.5 bg-[#00d2ff]"
                    : scrolled
                    ? "bg-white"
                    : "bg-[#111112]"
                }`}
              />
              <span
                className={`w-4 h-[2px] rounded-full transition-all duration-300 ${
                  menuOpen
                    ? "-rotate-45 -translate-y-1 bg-[#00d2ff]"
                    : scrolled
                    ? "bg-white"
                    : "bg-[#111112]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Drawer for Mobile / Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-16 overflow-y-auto"
            style={{
              backgroundImage: "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="pt-20 max-w-4xl mx-auto w-full">
              <span className="font-display text-xs font-bold tracking-widest text-[#00d2ff] uppercase mb-8 block">
                NAVIGATION // SINGLE SCROLL SECTIONS
              </span>
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <a
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className="group flex items-center justify-between py-2 border-b border-white/10 hover:border-[#00d2ff] transition-colors"
                  >
                    <span className="font-display text-4xl md:text-7xl font-black uppercase text-[#efefe5] group-hover:text-[#00d2ff] group-hover:translate-x-3 transition-all duration-200">
                      {label}
                    </span>
                    <span className="font-display text-sm font-bold text-white/40 group-hover:text-[#00d2ff] transition-colors">
                      0{i + 1}
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Drawer Footer */}
            <div className="max-w-4xl mx-auto w-full pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
              <div className="text-white/60">
                <span className="text-[#00d2ff] font-bold">Mohammad Rifky Wicaksana</span> — Informatics Engineering UM
              </div>
              <div className="flex gap-6">
                <a
                  href="https://github.com/maskaiki"
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-xs font-bold uppercase tracking-wider text-white/70 hover:text-[#00d2ff] transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-xs font-bold uppercase tracking-wider text-white/70 hover:text-[#00d2ff] transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-xs font-bold uppercase tracking-wider text-white/70 hover:text-[#00d2ff] transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
