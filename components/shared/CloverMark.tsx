"use client";

import React, { type CSSProperties } from "react";
import PlasmaWave, { type PlasmaWaveProps } from "./PlasmaWave";

// Geometric 4-Leaf Clover Mark SVG
const CLOVER_SVG_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="black">
    <path d="M100 8 C124 8 142 26 142 50 C142 66 133 80 120 87 C133 94 142 108 142 124 C142 130 140 136 137 141 L100 104 L63 141 C60 136 58 130 58 124 C58 108 67 94 80 87 C67 80 58 66 58 50 C58 26 76 8 100 8 Z" />
    <circle cx="100" cy="52" r="44" />
    <circle cx="100" cy="148" r="44" />
    <circle cx="52" cy="100" r="44" />
    <circle cx="148" cy="100" r="44" />
    <rect x="68" y="68" width="64" height="64" rx="12" />
  </svg>`
)}`;

export interface CloverMarkProps {
  size?: number | string;
  className?: string;
  style?: CSSProperties;
  plasmaProps?: PlasmaWaveProps;
}

export default function CloverMark({
  size = 480,
  className = "",
  style,
  plasmaProps,
}: CloverMarkProps) {
  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        width: size,
        maxWidth: "100%",
        aspectRatio: "1 / 1",
        background: "#0c0b10",
        WebkitMaskImage: `url("${CLOVER_SVG_DATA_URI}")`,
        maskImage: `url("${CLOVER_SVG_DATA_URI}")`,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        ...style,
      }}
    >
      <PlasmaWave {...plasmaProps} />
    </div>
  );
}

