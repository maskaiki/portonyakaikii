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
    <section
      className={`rain-panel select-none ${className}`}
      aria-labelledby="rain-panel-title"
    >
      <div className={`rain-panel__heading ${isExpanded ? "mb-3 sm:mb-4" : "mb-0 sm:mb-4"}`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-none bg-[#0055FF] shrink-0" />
          <h2 id="rain-panel-title" className="tracking-wider text-xs sm:text-sm">
            ATMOSPHERE
          </h2>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="sm:hidden p-1 text-[#111112] hover:bg-black/5 transition-colors cursor-pointer"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Hide controls" : "Show controls"}
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

          <button
            type="button"
            onClick={onTogglePause}
            className={`rain-panel__pause ${isPaused ? "bg-[#0055FF] text-white border-[#0055FF]" : ""}`}
            title={isPaused ? "Resume simulation" : "Pause simulation"}
            aria-label={isPaused ? "Resume simulation" : "Pause simulation"}
          >
            {isPaused ? (
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16" aria-hidden="true">
                <path d="m5 2 9 6-9 6z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4 3h3v10H4zM9 3h3v10H9z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`rain-panel__controls ${
          isExpanded ? "grid pt-2 border-t border-black/10" : "hidden sm:grid"
        }`}
        id="rain-controls"
      >
        {/* 1. LEVEL */}
        <div className="rain-control">
          <div className="rain-control__label">
            <label htmlFor="rain-intensity">LEVEL</label>
            <output htmlFor="rain-intensity">{intensity}%</output>
          </div>
          <input
            id="rain-intensity"
            name="intensity"
            type="range"
            min="0"
            max="100"
            value={intensity}
            style={{ "--range-progress": `${intensity}%` } as React.CSSProperties}
            onChange={(e) => onIntensityChange(Number(e.target.value))}
          />
        </div>

        {/* 2. VELOCITY */}
        <div className="rain-control">
          <div className="rain-control__label">
            <label htmlFor="drop-speed">VELOCITY</label>
            <output htmlFor="drop-speed">{speed}%</output>
          </div>
          <input
            id="drop-speed"
            name="speed"
            type="range"
            min="0"
            max="100"
            value={speed}
            style={{ "--range-progress": `${speed}%` } as React.CSSProperties}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
          />
        </div>

        {/* 3. SCALE */}
        <div className="rain-control">
          <div className="rain-control__label">
            <label htmlFor="drop-size">SCALE</label>
            <output htmlFor="drop-size">{size}%</output>
          </div>
          <input
            id="drop-size"
            name="size"
            type="range"
            min="0"
            max="100"
            value={size}
            style={{ "--range-progress": `${size}%` } as React.CSSProperties}
            onChange={(e) => onSizeChange(Number(e.target.value))}
          />
        </div>
      </div>
    </section>
  );
}
