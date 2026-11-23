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
      className={`rain-panel select-none ${
        isExpanded ? "rain-panel--expanded" : ""
      } ${className}`}
      aria-labelledby="rain-panel-title"
    >
      <div className="rain-panel__heading">
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center gap-2 text-left cursor-pointer group"
          aria-expanded={isExpanded}
          aria-controls="rain-controls"
        >
          <h2
            id="rain-panel-title"
            className="tracking-[0.12em] text-[11px] sm:text-xs group-hover:text-[#0055FF] transition-colors"
          >
            ATMOSPHERE
          </h2>
          <svg
            className={`w-3.5 h-3.5 text-[#111112] group-hover:text-[#0055FF] transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="m3 6 5 5 5-5" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onTogglePause}
          className={`rain-panel__pause ${
            isPaused ? "bg-[#0055FF] text-white border-[#0055FF]" : ""
          }`}
          title={isPaused ? "Resume simulation" : "Pause simulation"}
          aria-label={isPaused ? "Resume simulation" : "Pause simulation"}
        >
          {isPaused ? (
            <svg className="w-3 h-3 fill-current" viewBox="0 0 16 16" aria-hidden="true">
              <path d="m5 2 9 6-9 6z" />
            </svg>
          ) : (
            <svg className="w-3 h-3 fill-current" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 3h3v10H4zM9 3h3v10H9z" />
            </svg>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="rain-panel__controls grid pt-4" id="rain-controls">
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
      )}
    </section>
  );
}
