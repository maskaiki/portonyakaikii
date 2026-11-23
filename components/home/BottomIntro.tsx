"use client";

interface BottomIntroProps {
  className?: string;
}

export function BottomIntro({ className = "" }: BottomIntroProps) {
  return (
    <div
      className={`z-25 flex flex-col items-start text-left select-none max-w-[calc(100vw-40px)] sm:max-w-[420px] lg:max-w-[460px] ${className}`}
    >
      <span className="font-display text-[11px] sm:text-xs font-extrabold tracking-[0.18em] text-[#111112] uppercase mb-1.5">
        Visual Front-End Creator
      </span>

      <h2
        className="font-display font-black tracking-tight leading-[0.94] uppercase text-[#111112]"
        style={{ fontSize: "clamp(24px, 3.3vw, 48px)" }}
      >
        I MAKE FRONT-END{" "}
        <span className="inline-block font-brier italic font-normal text-[#0055FF] px-0.5">
          for people.
        </span>
      </h2>

      <p className="mt-2.5 font-sans text-xs sm:text-[14px] text-[#111112] font-medium leading-relaxed max-w-md line-clamp-2 sm:line-clamp-none">
        Mohammad Rifky Wicaksana (Kaiki), crafting standout personal portfolio
        websites, visual graphics, and video edits.
      </p>

      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-4">
        <a
          href="#about"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-[#111112] !text-[#f4f4ed] font-display text-xs font-extrabold uppercase tracking-wider hover:bg-[#0055FF] hover:!text-white transition-colors duration-200"
        >
          <span>About Me</span>
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none border border-[#111112] bg-[#f4f4ed]/90 hover:bg-[#111112] !text-[#111112] hover:!text-[#f4f4ed] font-display text-xs font-extrabold uppercase tracking-wider transition-colors duration-200"
        >
          <span>Contact</span>
        </a>
      </div>
    </div>
  );
}
