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
      className={`z-30 w-[240px] sm:w-[280px] p-3.5 sm:p-4 rounded-2xl bg-white/20 dark:bg-black/30 backdrop-blur-2xl border border-white/60 dark:border-white/15 shadow-[0_14px_40px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.75)] text-[#111112] dark:text-[#efefe5] transition-all duration-300 ${className}`}
    >
      {/* Heading Row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-ping" />
          <h2 className="font-display text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#111112] dark:text-white">
            TEST YOUR SYSTEM
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Mobile Collapse Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="sm:hidden p-1 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
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

          {/* Pause / Play Button */}
          <button
            type="button"
            onClick={onTogglePause}
            className={`w-6 h-6 rounded-lg flex items-center justify-center backdrop-blur-md border transition-all duration-200 ${
              isPaused
                ? "bg-[#00d2ff] text-white border-[#00d2ff] shadow-[0_0_12px_rgba(0,210,255,0.5)]"
                : "bg-white/40 dark:bg-white/10 border-white/60 dark:border-white/20 text-[#111112] dark:text-white hover:bg-white/60 dark:hover:bg-white/20 shadow-sm"
            }`}
            title={isPaused ? "Resume particle simulation" : "Pause particle simulation"}
            aria-label={isPaused ? "Resume particle simulation" : "Pause particle simulation"}
          >
            {isPaused ? (
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 16 16">
                <path d="m5 2 9 6-9 6z" />
              </svg>
            ) : (
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 16 16">
                <path d="M4 3h3v10H4zM9 3h3v10H9z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Sliders Area (Always visible on desktop, toggleable on mobile) */}
      <div
        className={`space-y-3 pt-3 transition-all duration-200 ${
          isExpanded ? "block" : "hidden sm:block"
        }`}
      >
        {/* Shard Intensity */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-sans font-semibold text-black/75 dark:text-white/75">
            <span>Shard intensity</span>
            <span className="font-mono text-[10px] font-bold text-[#00d2ff]">{intensity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(e) => onIntensityChange(Number(e.target.value))}
            className="w-full h-1.5 bg-black/10 dark:bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#00d2ff]"
          />
        </div>

        {/* Drop Speed */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-sans font-semibold text-black/75 dark:text-white/75">
            <span>Drop speed</span>
            <span className="font-mono text-[10px] font-bold text-[#00d2ff]">{speed}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-full h-1.5 bg-black/10 dark:bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#00d2ff]"
          />
        </div>

        {/* Drop Size */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-sans font-semibold text-black/75 dark:text-white/75">
            <span>Drop size</span>
            <span className="font-mono text-[10px] font-bold text-[#00d2ff]">{size}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={size}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            className="w-full h-1.5 bg-black/10 dark:bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#00d2ff]"
          />
        </div>
      </div>
    </div>
  );
}
