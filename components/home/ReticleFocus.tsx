"use client";

interface ReticleFocusProps {
  className?: string;
}

export function ReticleFocus({ className = "" }: ReticleFocusProps) {
  return (
    <div
      className={`pointer-events-none select-none z-10 text-[#00d2ff]/60 ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-12 h-12 sm:w-16 sm:h-16 stroke-current"
        viewBox="0 0 80 80"
        fill="none"
        strokeWidth="2"
      >
        <path d="M1 23V1h22M57 1h22v22M79 57v22H57M23 79H1V57" />
      </svg>
    </div>
  );
}
