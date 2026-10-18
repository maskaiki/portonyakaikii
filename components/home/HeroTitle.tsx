"use client";

interface HeroTitleProps {
  className?: string;
}

export function HeroTitle({ className = "" }: HeroTitleProps) {
  return (
    <div
      className={`hero-title-stage absolute top-[20%] sm:top-[24%] left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-[50%] md:left-[52%] lg:left-[53%] pointer-events-none select-none flex flex-col items-center sm:items-start ${className}`}
      aria-hidden="true"
    >
      <h1
        className="font-manrope font-extrabold lowercase tracking-[-0.07em] leading-[0.78161] whitespace-nowrap"
        style={{
          fontSize: "clamp(52px, min(14.5vw, 13svh), 195px)",
        }}
      >
        {/* Line 1: 'never' shifted right by 0.3em on mobile, 0.58em on desktop with blue 'er' */}
        <span className="block ml-[0.25em] sm:ml-[0.58em]">
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
    </div>
  );
}


