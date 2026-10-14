"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Lab", href: "/lab" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const [wicaksanaActive, setWicaksanaActive] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a1128]/95 backdrop-blur-md border-b border-blue-500/20 py-3 shadow-lg text-[#efefe5]"
            : "bg-transparent py-5 text-[#111112]"
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between">
          {/* Left: RW Monogram Logo + RIFKY WICAKSANA (Flush to far left) */}
          <Link
            href="/"
            onClick={() => setWicaksanaActive((prev) => !prev)}
            className="flex items-center gap-3 text-left group transition-transform duration-200 hover:scale-[1.02]"
            aria-label="Rifky Wicaksana — Home"
          >
            {/* Geometric RW Racing Monogram (moved to left) */}
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                scrolled
                  ? "border border-[#00d2ff]/40 bg-[#0a192f]/60 group-hover:border-[#00d2ff] group-hover:shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                  : "border border-black/15 bg-white/70 group-hover:border-[#00d2ff] group-hover:shadow-[0_0_15px_rgba(0,210,255,0.3)]"
              }`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 4h7a4 4 0 0 1 4 4c0 2-1.5 3.5-3.5 3.8L16 20h-3.8l-4-7.5H7.5V20H4V4zm3.5 3.5v2.8h3.2c1 0 1.8-.6 1.8-1.4s-.8-1.4-1.8-1.4H7.5z"
                  fill="#00d2ff"
                />
                <path
                  d="M17 10l1.8 7.5 2-6.5h2l-2.8 9h-2.5l-1.8-7.5L15 20h-2.2l2-10h2.2z"
                  fill={scrolled ? "#f4f4ed" : "#111112"}
                />
              </svg>
            </div>

            {/* Brand Name Text */}
            <div className="flex flex-col">
              <span
                className={`font-display text-xs sm:text-sm font-black tracking-widest uppercase leading-none transition-colors duration-200 ${
                  scrolled
                    ? "text-[#efefe5] group-hover:text-[#00d2ff]"
                    : "text-[#111112] group-hover:text-[#00d2ff]"
                }`}
              >
                RIFKY
              </span>
              <span
                className={`font-display text-base sm:text-lg font-black tracking-tighter uppercase leading-tight transition-colors duration-200 ${
                  wicaksanaActive
                    ? "text-[#00d2ff]"
                    : scrolled
                    ? "text-[#efefe5] group-hover:text-[#00d2ff] group-active:text-[#00d2ff] active:text-[#00d2ff]"
                    : "text-[#111112] group-hover:text-[#00d2ff] group-active:text-[#00d2ff] active:text-[#00d2ff]"
                }`}
              >
                WICAKSANA
              </span>
            </div>
          </Link>

          {/* Right: STORE/CONNECT Button (Electric Blue Gradient) + Hamburger Menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00d2ff] via-[#1d4ed8] to-[#0a192f] hover:from-[#38bdf8] hover:to-[#1e3a8a] text-white font-display text-xs md:text-sm font-black uppercase tracking-wider rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(0,210,255,0.4)]"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span>CONNECT</span>
            </Link>

            {/* Framed Square Hamburger Button */}
            <button
              onClick={toggleMenu}
              className={`w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#00d2ff] ${
                scrolled
                  ? "border border-white/20 hover:border-[#00d2ff] bg-[#0a192f]/60"
                  : "border border-black/20 hover:border-[#00d2ff] bg-white/60"
              }`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span
                className={`w-5 h-[2px] transition-all duration-300 ${
                  menuOpen
                    ? "rotate-45 translate-y-2 bg-[#00d2ff]"
                    : scrolled
                    ? "bg-white"
                    : "bg-[#111112]"
                }`}
              />
              <span
                className={`w-5 h-[2px] transition-all duration-300 ${
                  menuOpen
                    ? "-rotate-45 -translate-y-0.5 bg-[#00d2ff]"
                    : scrolled
                    ? "bg-white"
                    : "bg-[#111112]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0a1128]/98 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-16 overflow-y-auto"
            style={{
              backgroundImage: "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="pt-20 max-w-4xl mx-auto w-full">
              <span className="font-display text-xs font-bold tracking-widest text-[#00d2ff] uppercase mb-8 block">
                NAVIGATION // SELECT ROUTE
              </span>
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <Link
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
                  </Link>
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
                  href="https://github.com"
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
