import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".claude/**", ".next/**", "node_modules/**", "lenis/**", "experience.tsx", "NFengine.tsx", "NFstyles.tsx", "NK*.tsx"]),
]);
