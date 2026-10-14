"use client";

import Image from "next/image";

const TECH_STACK = [
  {
    name: "Next.js",
    icon: (
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" aria-hidden="true">
        <path d="M20 18h14v64H20zM66 18h14v64H66zM20 18l52 64h14L32 18z" />
      </svg>
    ),
  },
  {
    name: "React",
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" aria-hidden="true">
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg viewBox="35 48 85 58" fill="currentColor" className="w-12 h-9 sm:w-14 sm:h-10 md:w-16 md:h-12" aria-hidden="true">
        <path d="M37.3 50.8v8.6h17v44.1h10.3V59.4h17v-8.6H37.3zM83.8 84.8c2.8 4.2 7.1 6.5 12.8 6.5 5 0 8.7-2.4 8.7-6.2 0-3.6-2.9-5.4-8.7-7.7l-4.5-1.8c-8.7-3.4-13.3-8-13.3-15.5 0-8.9 7-15.4 18.2-15.4 7.6 0 13.5 2.6 17.6 7.6l-6.5 5.8c-2.4-3.3-5.7-5-10.7-5-5 0-7.8 2.3-7.8 5.4 0 3.3 2.6 4.9 8.1 7.1l4.5 1.8c9.5 3.8 14.2 8.6 14.2 16.2 0 9.8-7.7 16-19.6 16-9 0-16.1-3.2-20.6-9.1l6.7-5.7z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    icon: (
      <svg viewBox="0 0 54 33" fill="currentColor" className="w-12 h-8 sm:w-14 sm:h-9 md:w-16 md:h-10" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.005-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
      </svg>
    ),
  },
  {
    name: "Canva",
    icon: (
      <svg viewBox="0 0 192 192" fill="currentColor" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" aria-hidden="true">
        <path d="M95.2 170c-11.6 0-22-3.1-30.9-9.1-8.8-6-15.4-14.6-19.7-25.6-2.5-6.4-4-13.4-4.7-21.4-.8-9.5-.2-19.2 1.9-28.7 3.3-15.3 10-28.5 19.8-39.5 9.7-10.8 21.2-18.1 34.3-21.5 5.6-1.5 11.2-2.2 16.5-2.2 6.4 0 12.7 1.1 18.7 3.3 8.9 3.3 15 9 17.9 17 1.4 3.7 1.8 7.6 1.4 12-.6 6.2-2.6 11.7-6 16.4-3.9 5.4-8.6 8.7-14.3 10.1-1 .3-2.1.4-3.3.4-.5 0-.9 0-1.4-.1-1.7-.2-3.2-.9-4.2-2.2-1-1.3-1.4-3-1.2-4.7.3-2 1.1-3.7 1.9-5.1l.3-.6c1.6-3.2 3.1-6.2 3.9-9.4 1.3-5.4 1.3-9.5-.1-13.3-1.5-4-4.3-6.5-8.5-7.5-1.6-.4-3.2-.6-4.8-.6-3.6 0-7.4.9-11.4 2.7C93.4 44 86.7 50 81 58.7c-3.9 6-6.9 12.7-9.1 20.5-1.6 5.6-2.6 11.5-3.2 17.6-.3 2.9-.5 6.3-.5 9.6.1 9.7 1.5 17.4 4.5 24.2 3.3 7.6 7.8 12.9 13.9 16.3 4.1 2.3 8.7 3.5 13.6 3.5.8 0 1.7 0 2.6-.1 10.4-.8 19.6-5.5 28-14.3 4.3-4.5 7.9-9.7 11-15.9.5-.9 1-1.9 1.8-2.7 1-1.1 2.3-1.7 3.7-1.7 1.7 0 3.2.9 4.2 2.5 1.2 2 1.1 4.2.9 5.6-.6 4.1-2.1 8.1-4.6 12.8-7.2 12.9-17.1 22.4-29.4 28.3-6.3 3-13.1 4.7-20.1 5-1.1.1-2.1.1-3.1.1z" />
      </svg>
    ),
  },
  {
    name: "CapCut",
    icon: (
      <svg viewBox="0 0 192 192" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" aria-hidden="true">
        <path d="M170 42 22 124v14c0 6.627 5.373 12 12 12h78c6.627 0 12-5.373 12-12v-9.5" />
        <path d="M170 150 22 68V54c0-6.627 5.373-12 12-12h78c6.627 0 12 5.373 12 12v9.5" />
      </svg>
    ),
  },
  {
    name: "Framer Motion",
    icon: (
      <svg viewBox="0 0 14 21" fill="currentColor" className="w-8 h-10 sm:w-10 sm:h-12 md:w-11 md:h-14" aria-hidden="true">
        <path d="M0 0h14v7H7zm0 7h7l7 7H7v7l-7-7z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg viewBox="0 0 32 32" fill="currentColor" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" aria-hidden="true">
        <path d="M16 2.5L3.5 9.7v14.6L16 31.5l12.5-7.2V9.7L16 2.5zm-.1 3.5l9.5 5.5-4.2 2.4-7.5-4.3v7.3l-2.1 1.2V7.9l4.3-1.9zm-10.4 6.7l8.4 4.8v9.7l-8.4-4.8V12.7zm10.4 16.4l-8.4-4.8 4.2-2.4 7.5 4.3v-7.3l2.1-1.2v10.2l-5.4 1.2zm10.5-6.7l-8.4 4.8V17.5l8.4-4.8v9.7z" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    icon: (
      <svg viewBox="28 46 80 58" fill="currentColor" className="w-12 h-9 sm:w-14 sm:h-10 md:w-16 md:h-12" aria-hidden="true">
        <path d="M72.2 87.5c1.9 3.2 4.4 5.7 8.9 5.7 4.5 0 7.3-2.2 7.3-5.3 0-3.7-2.9-5-7.9-7.2l-2.7-1.2c-7.8-3.3-13-7.5-13-16.3 0-8.1 6.2-14.3 16-14.3 7 0 12 2.4 15.6 8.7l-6.8 4.4c-1.8-3.2-3.8-4.5-8.8-4.5-4.1 0-6.7 2.1-6.7 4.8 0 3.3 2.6 4.7 7.2 6.7l2.7 1.2c9.2 4 14 8.2 14 17.2 0 9.8-7.7 15.2-17.7 15.2-9.9 0-16.1-4.8-19.2-11l6.4-4.5zm-33.8 1.4c1.3 2.2 2.6 4 5.6 4 3 0 4.8-1.2 4.8-5.9V49.6h9.5v37.4c0 9.7-5.7 14.1-14.4 14.1-7.8 0-12.4-4-14.6-8.7l9.1-3.5z" />
      </svg>
    ),
  },
  {
    name: "Git",
    icon: (
      <svg viewBox="0 0 128 128" fill="currentColor" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" aria-hidden="true">
        <path d="M125.1 57.6L70.4 2.9c-3.9-3.9-10.2-3.9-14.1 0L44.8 14.4l17.8 17.8c4.2-1.4 9.1-.5 12.5 2.9 3.4 3.4 4.3 8.3 2.9 12.5l17.1 17.1c4.2-1.4 9.1-.5 12.5 2.9 4.7 4.7 4.7 12.3 0 17-4.7 4.7-12.3 4.7-17 0-3.6-3.6-4.4-8.9-2.6-13.3L72.2 48.5v35.3c1.2.6 2.3 1.4 3.3 2.4 4.7 4.7 4.7 12.3 0 17s-12.3 4.7-17 0c-4.7-4.7-4.7-12.3 0-17 1.2-1.2 2.6-2.1 4.1-2.7V47.7c-1.5-.6-2.9-1.5-4.1-2.7-3.6-3.6-4.4-9-2.5-13.4L38.4 14 2.9 69.5c-3.9 3.9-3.9 10.2 0 14.1l54.7 54.7c3.9 3.9 10.2 3.9 14.1 0l53.4-53.4c3.9-3.9 3.9-10.2 0-14.1v-.2z" />
      </svg>
    ),
  },
];

// Duplicated arrays to ensure a mathematically seamless, infinite rightward scroll
const REPEATED_STACK = [...TECH_STACK, ...TECH_STACK];

export function CollabsSection() {
  return (
    <section className="relative bg-[#efefe5] text-[#111112] pt-24 pb-32 overflow-hidden select-none">
      
      {/* Subtle Atmospheric Graffiti Background — positioned behind the title with low opacity */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none w-full max-w-5xl h-64 md:h-80 opacity-20 select-none -z-0">
        <Image
          src="/assets/shared/67d43b0fcd3d4512a46df889_ln-collabs-rive-placeholder.svg"
          alt=""
          fill
          className="object-contain filter drop-shadow-[0_4px_30px_rgba(0,210,255,0.2)]"
        />
      </div>

      <div className="page-shell relative z-10">
        
        {/* Section Header: Headline & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-widest text-[#00d2ff] mb-2 block">
              CORE CAPABILITIES
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase text-[#111112] leading-[0.9]">
              TECH STACK <br />
              <span className="font-brier italic font-normal bg-gradient-to-r from-[#00d2ff] via-[#1d4ed8] to-[#0a192f] bg-clip-text text-transparent">
                &amp;ARCHITECTURE
              </span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm text-[#111112]/75 leading-relaxed md:pb-2">
            Built with modern, high-performance web standards — leveraging reactive UI architectures, typed safety, kinetic physics, and clean code craftsmanship.
          </p>
        </div>

      </div>

      {/* Infinite Marquee Track: Animated to the RIGHT (translateX -50% to 0%), seamless looping */}
      <div className="w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-fit marquee-track-logos">
          {[...REPEATED_STACK, ...REPEATED_STACK].map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              title={tech.name}
              aria-label={tech.name}
              className="flex items-center justify-center text-[#111112]/60 hover:text-[#00d2ff] transition-all duration-300 transform hover:scale-125 cursor-pointer filter hover:drop-shadow-[0_4px_20px_rgba(0,210,255,0.65)] px-2"
            >
              {tech.icon}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
