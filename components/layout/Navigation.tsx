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
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Dynamic scroll spy for highlighting active section
      const sections = ["hero", "about", "work", "skills", "journey", "contact"];
      const scrollPos = window.scrollY + 240;

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

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <>
      <header className="fixed top-3 sm:top-5 inset-x-0 z-50 px-4 sm:px-6 md:px-12 flex items-center justify-between pointer-events-none transition-all duration-300">
        {/* Left: Aesthetic Clean RW Monogram (No dots, No KAIKI) */}
        <a
          href="#hero"
          className={`pointer-events-auto flex items-center select-none transition-all duration-300 px-3.5 py-1.5 border rounded-none ${
            scrolled
              ? "bg-[#0A0A0A]/85 backdrop-blur-2xl border-white/15 text-[#efefe5] shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
              : "bg-white/60 backdrop-blur-2xl border-white/85 text-[#111112] shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
          }`}
          aria-label="Kaiki — Back to Top"
        >
          <div className="flex items-baseline tracking-tighter leading-none">
            <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#00d2ff]">
              R
            </span>
            <span
              className={`font-brier italic text-xl sm:text-2xl font-bold -ml-0.5 transition-colors duration-300 ${
                scrolled ? "text-[#efefe5]" : "text-[#111112]"
              }`}
            >
              W
            </span>
          </div>
        </a>

        {/* Right: Architectural Site Nav (Mentok ke Kanan — 0 collision dengan rambut) */}
        <div
          className={`pointer-events-auto flex items-center gap-1.5 p-1 transition-all duration-300 border rounded-none ${
            scrolled
              ? "bg-[#0A0A0A]/85 backdrop-blur-2xl border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.7)]"
              : "site-nav-glass"
          }`}
        >
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <a
              href="#hero"
              className={`site-nav-link ${
                activeSection === "hero"
                  ? scrolled
                    ? "!bg-[#00d2ff] !text-black !border-[#00d2ff] font-black shadow-[0_0_12px_rgba(0,210,255,0.4)]"
                    : "site-nav-link--active"
                  : scrolled
                  ? "!bg-white/5 hover:!bg-white/15 !text-[#efefe5] hover:!text-[#00d2ff] !border-white/10"
                  : ""
              }`}
            >
              Explore
            </a>
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={href}
                  href={href}
                  className={`site-nav-link ${
                    isActive
                      ? scrolled
                        ? "!bg-[#00d2ff] !text-black !border-[#00d2ff] font-black shadow-[0_0_12px_rgba(0,210,255,0.4)]"
                        : "site-nav-link--active"
                      : scrolled
                      ? "!bg-white/5 hover:!bg-white/15 !text-[#efefe5] hover:!text-[#00d2ff] !border-white/10"
                      : ""
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Right: CONNECT Button */}
          <a
            href="#contact"
            className={`inline-flex items-center justify-center px-4 py-2 font-display text-xs font-black uppercase tracking-wider transition-all duration-200 border rounded-none ${
              scrolled
                ? "bg-[#00d2ff] hover:bg-white text-black font-black border-transparent shadow-[0_0_16px_rgba(0,210,255,0.3)]"
                : "bg-[#111112] text-white hover:bg-[#00d2ff] hover:text-black border-black/20 shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
            }`}
          >
            CONNECT
          </a>

          {/* Square Glass Hamburger Button */}
          <button
            onClick={toggleMenu}
            className={`w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-none backdrop-blur-md transition-all duration-200 focus:outline-none ${
              scrolled
                ? "border border-white/20 hover:border-[#00d2ff] bg-white/10 text-white"
                : "border border-black/15 hover:border-[#111112] bg-white/60 text-[#111112]"
            }`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`w-4 h-[2px] transition-all duration-300 ${
                menuOpen
                  ? "rotate-45 translate-y-1.5 bg-[#00d2ff]"
                  : scrolled
                  ? "bg-white"
                  : "bg-[#111112]"
              }`}
            />
            <span
              className={`w-4 h-[2px] transition-all duration-300 ${
                menuOpen
                  ? "-rotate-45 -translate-y-1 bg-[#00d2ff]"
                  : scrolled
                  ? "bg-white"
                  : "bg-[#111112]"
              }`}
            />
          </button>
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
            className="fixed inset-0 z-50 bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-16 overflow-y-auto"
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
                    <span className="font-mono text-sm text-[#00d2ff] opacity-0 group-hover:opacity-100 transition-opacity">
                      [0{i + 1}]
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="max-w-4xl mx-auto w-full pt-12 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-sans text-xs text-[#8A8A7A]">
                  KAIKI — Mohammad Rifky Wicaksana
                </p>
                <p className="font-sans text-xs text-[#8A8A7A]">
                  Informatics & Creative Engineering
                </p>
              </div>
              <a
                href="#contact"
                onClick={closeMenu}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-[#00d2ff] text-black font-display text-xs font-black uppercase tracking-wider hover:bg-white transition-colors"
              >
                Start A Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
