import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".claude/**",
    ".next/**",
    "node_modules/**",
    "lenis/**",
    "Agent-Reach/**",
    "How-to-Clone-Website---Claude-Skills-main/**",
    "liquid-glass-js/**",
    "work/**",
  ]),
]);
