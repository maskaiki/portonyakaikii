"use client";

import { useState } from "react";

interface WeatherControlPanelProps {
  intensity: number;
  speed: number;
  size: number;
  isPaused: boolean;
  onIntensityChange: (val: number) => void;
  onSpeedChange: (val: number) => void;
  onSizeChange: (val: number) => void;
  onTogglePause: () => void;
  className?: string;
}

export function WeatherControlPanel({
  intensity,
  speed,
  size,
  isPaused,
  onIntensityChange,
  onSpeedChange,
  onSizeChange,
  onTogglePause,
  className = "",
}: WeatherControlPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`z-30 w-[260px] sm:w-[300px] p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] text-[#111112] transition-all duration-300 ${className}`}
    >
      {/* Heading Row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          {/* Square Indicator (No dots) */}
          <span className="w-2.5 h-2.5 rounded-none bg-[#00d2ff] shrink-0 shadow-[0_0_8px_rgba(0,210,255,0.8)]" />
          <h2 className="font-display text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#111112]">
            TEST YOUR SYSTEM
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Mobile Collapse Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="sm:hidden p-1 text-black/60 hover:text-black"
            aria-label={isExpanded ? "Collapse controls" : "Expand controls"}
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m3 6 5 5 5-5" />
            </svg>
          </button>

          {/* Pause / Play Button (Square shape) */}
          <button
            type="button"
            onClick={onTogglePause}
            className={`w-7 h-7 rounded-none flex items-center justify-center border transition-all duration-200 ${
              isPaused
                ? "bg-[#00d2ff] text-black border-[#00d2ff] shadow-[0_0_10px_rgba(0,210,255,0.5)]"
                : "bg-black/5 hover:bg-black/10 border-black/10 text-[#111112]"
            }`}
            title={isPaused ? "Resume particle simulation" : "Pause particle simulation"}
            aria-label={isPaused ? "Resume particle simulation" : "Pause particle simulation"}
          >
            {isPaused ? (
              <svg className="w-3 h-3 fill-current" viewBox="0 0 16 16">
                <path d="m5 2 9 6-9 6z" />
              </svg>
            ) : (
              <svg className="w-3 h-3 fill-current" viewBox="0 0 16 16">
                <path d="M4 3h3v10H4zM9 3h3v10H9z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Sliders Area (Always visible on desktop, toggleable on mobile) */}
      <div
        className={`space-y-4 pt-4 transition-all duration-200 ${
          isExpanded ? "block" : "hidden sm:block"
        }`}
      >
        {/* Shard Intensity */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="font-manrope text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#111112]/85">
              Shard intensity
            </span>
            <span className="font-mono text-xs sm:text-sm font-black text-[#0066FF] bg-blue-50/80 px-2 py-0.5 rounded-none border border-blue-200/60">
              {intensity}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(e) => onIntensityChange(Number(e.target.value))}
            className="w-full h-2 bg-black/10 rounded-none appearance-none cursor-pointer accent-[#0066FF]"
          />
        </div>

        {/* Drop Speed */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="font-manrope text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#111112]/85">
              Drop speed
            </span>
            <span className="font-mono text-xs sm:text-sm font-black text-[#0066FF] bg-blue-50/80 px-2 py-0.5 rounded-none border border-blue-200/60">
              {speed}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-full h-2 bg-black/10 rounded-none appearance-none cursor-pointer accent-[#0066FF]"
          />
        </div>

        {/* Drop Size */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="font-manrope text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#111112]/85">
              Drop size
            </span>
            <span className="font-mono text-xs sm:text-sm font-black text-[#0066FF] bg-blue-50/80 px-2 py-0.5 rounded-none border border-blue-200/60">
              {size}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={size}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            className="w-full h-2 bg-black/10 rounded-none appearance-none cursor-pointer accent-[#0066FF]"
          />
        </div>
      </div>
    </div>
  );
}
