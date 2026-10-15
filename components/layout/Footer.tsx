"use client";

import Image from "next/image";

const SPONSORS = [
  { name: "Google", icon: "/assets/shared/68dbd5d7a8a302c07e91904d_ln4-ln4-collab-google.svg" },
  { name: "Hilton", icon: "/assets/shared/67efc88c1939bc87931c2599_ln4-ln4-collab-logo-hilton.svg" },
  { name: "Uber", icon: "/assets/shared/68d294a99b218abd71dc0764_ln4-ln4-collab-logo-uber.svg" },
  { name: "Quadrant", icon: "/assets/shared/67efc88c532235956e5d267a_ln4-ln4-collab-logo-quadrant.svg" },
  { name: "TUMI", icon: "/assets/shared/67efc88cb3373daa7ba240d6_ln4-ln4-collab-logo-tumi.svg" },
  { name: "Bell", icon: "/assets/shared/68dbd5d72c50967c2195c702_ln4-ln4-collab-bell-helmets.svg" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-[#00d2ff] via-[#1d4ed8] to-[#0a1128] pt-12 pb-6 overflow-hidden">
      
      {/* The Iconic Inverted-Curved Masked Frame */}
      <div className="page-shell px-2 md:px-6">
        <div className="relative rounded-[2.5rem] bg-[#0A0A0A] text-[#efefe5] overflow-hidden shadow-2xl border-4 border-[#00d2ff] shadow-[0_0_50px_rgba(0,210,255,0.25)]">
          
          {/* Topographic Lines Inside Footer */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="relative z-10 pt-16 pb-12 px-6 md:px-14 flex flex-col items-center">
            
            {/* Top Floating Signature in Electric Blue */}
            <div className="relative w-44 h-16 mb-2">
              <Image
                src="/assets/shared/signature-lime.svg"
                alt="Signature"
                fill
                className="object-contain filter drop-shadow-[0_2px_16px_rgba(0,210,255,0.7)]"
              />
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-center text-[#efefe5] mb-12">
              ALWAYS <span className="font-brier italic font-normal bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent">BRINGING</span> THE{" "}
              <span className="font-brier italic font-normal bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1d4ed8] bg-clip-text text-transparent">FIGHT</span>.
            </h2>

            {/* Three-Column Layout: Left Links | Center 3D Helmet Bust | Right Socials */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 items-center gap-8 mb-12">
              
              {/* Left Column: SINGLE SCROLL SECTIONS */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="font-display text-[10px] font-bold uppercase tracking-widest text-[#8A8A7A] mb-3">
                  SECTIONS
                </span>
                <nav className="flex flex-col gap-2">
                  <a
                    href="#hero"
                    className="font-display text-2xl md:text-3xl font-black uppercase text-[#efefe5] hover:text-[#00d2ff] transition-colors"
                  >
                    HOME
                  </a>
                  <a
                    href="#about"
                    className="font-display text-2xl md:text-3xl font-black uppercase text-[#efefe5] hover:text-[#00d2ff] transition-colors"
                  >
                    ABOUT
                  </a>
                  <a
                    href="#work"
                    className="font-display text-2xl md:text-3xl font-black uppercase text-[#efefe5] hover:text-[#00d2ff] transition-colors"
                  >
                    SELECTED WORK
                  </a>
                  <a
                    href="#skills"
                    className="font-display text-2xl md:text-3xl font-black uppercase text-[#efefe5] hover:text-[#00d2ff] transition-colors"
                  >
                    ARSENAL
                  </a>
                  <a
                    href="#journey"
                    className="font-display text-2xl md:text-3xl font-black uppercase text-[#efefe5] hover:text-[#00d2ff] transition-colors"
                  >
                    JOURNEY
                  </a>
                  <a
                    href="#contact"
                    className="font-display text-2xl md:text-3xl font-black uppercase text-[#00d2ff] hover:text-white transition-colors"
                  >
                    CONTACT
                  </a>
                </nav>
              </div>

              {/* Center Column: 3D Helmet Technologist Bust + CTA Button */}
              <div className="flex flex-col items-center justify-center relative">
                <div className="relative w-64 h-64 md:w-80 md:h-80 select-none">
                  <Image
                    src="/assets/shared/footer-helmet.webp"
                    alt="Cyberpunk Helmet Technologist"
                    fill
                    className="object-contain filter contrast-110 drop-shadow-[0_12px_32px_rgba(0,0,0,0.9)]"
                  />
                </div>

                {/* Overlaid CTA Button in Front of Chest */}
                <div className="mt-[-2rem] relative z-20">
                  <a
                    href="#contact"
                    style={{ color: "#ffffff" }}
                    className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-[#00d2ff] via-[#1d4ed8] to-[#0a192f] hover:from-[#38bdf8] hover:to-[#1e3a8a] font-display text-sm font-black uppercase tracking-wider rounded-xl shadow-[0_4px_24px_rgba(0,210,255,0.45)] transition-all duration-200 transform hover:-translate-y-1 text-white"
                  >
                    <span>START A PROJECT</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Column: FOLLOW ON */}
              <div className="flex flex-col items-center md:items-end text-center md:text-right">
                <span className="font-display text-[10px] font-bold uppercase tracking-widest text-[#8A8A7A] mb-3">
                  CONNECT ON
                </span>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://github.com/maskaiki"
                    target="_blank"
                    rel="noreferrer"
                    className="font-display text-2xl md:text-3xl font-black uppercase text-[#efefe5] hover:text-[#00d2ff] transition-colors"
                  >
                    GITHUB
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="font-display text-2xl md:text-3xl font-black uppercase text-[#efefe5] hover:text-[#00d2ff] transition-colors"
                  >
                    LINKEDIN
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="font-display text-2xl md:text-3xl font-black uppercase text-[#efefe5] hover:text-[#00d2ff] transition-colors"
                  >
                    INSTAGRAM
                  </a>
                </div>
              </div>

            </div>

            {/* Bottom Sponsor / Tech Partners Logo Strip */}
            <div className="w-full pt-8 border-t border-white/10 flex items-center justify-around gap-6 flex-wrap opacity-60">
              {SPONSORS.map((sp, i) => (
                <div key={i} className="relative h-6 w-20 filter grayscale invert">
                  <Image src={sp.icon} alt={sp.name} fill className="object-contain" />
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Electric Blue Bar with Copyright & Back to Top */}
      <div className="page-shell mt-4 px-6 flex flex-col sm:flex-row items-center justify-between text-white/90 font-display text-[11px] font-black uppercase tracking-wider">
        <span>© 2026 KAIKI (MOHAMMAD RIFKY WICAKSANA). ALL RIGHTS RESERVED</span>
        <button
          onClick={scrollToTop}
          className="mt-2 sm:mt-0 flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
        >
          <span>BACK TO TOP</span>
          <span>↑</span>
        </button>
      </div>

    </footer>
  );
}
