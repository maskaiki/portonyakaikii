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
      {/* Heading Row */}
      <div className="rain-panel__heading">
        <div className="flex items-center gap-2.5">
          {/* Storm Lab Square Indicator (Pure Sharp Kotak) */}
          <span className="w-2.5 h-2.5 rounded-none bg-[#00d2ff] shrink-0 shadow-[0_0_10px_rgba(0,210,255,0.9)]" />
          <h2 id="rain-panel-title" className="tracking-wider">
            TEST YOUR SYSTEM
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Toggle Button */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="sm:hidden p-1.5 text-[#111112] hover:bg-black/5 transition-colors"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Hide rain controls" : "Show rain controls"}
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

          {/* Pause / Play Button (Architectural Square shape from NFstyles) */}
          <button
            type="button"
            onClick={onTogglePause}
            className={`rain-panel__pause ${isPaused ? "bg-[#00d2ff] border-[#00d2ff] shadow-[0_0_10px_rgba(0,210,255,0.6)]" : ""}`}
            title={isPaused ? "Resume rain simulation" : "Pause rain simulation"}
            aria-label={isPaused ? "Resume rain simulation" : "Pause rain simulation"}
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

      {/* Sliders Area (Visible on desktop, collapsible on mobile) */}
      <div
        className={`rain-panel__controls ${
          isExpanded ? "grid" : "hidden sm:grid"
        }`}
        id="rain-controls"
      >
        {/* Rain / Shard Intensity */}
        <div className="rain-control">
          <div className="rain-control__label">
            <label htmlFor="rain-intensity">SHARD INTENSITY</label>
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

        {/* Drop Speed */}
        <div className="rain-control">
          <div className="rain-control__label">
            <label htmlFor="drop-speed">DROP SPEED</label>
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

        {/* Drop Size */}
        <div className="rain-control">
          <div className="rain-control__label">
            <label htmlFor="drop-size">DROP SIZE</label>
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
