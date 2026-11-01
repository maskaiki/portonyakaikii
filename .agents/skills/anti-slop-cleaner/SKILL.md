---
name: anti-slop-cleaner
description: Detect, purge, and prevent AI-generated design slop across Kaiki's website (micro-copy, gray fonts, divider strips, fake badges, and unsolicited AI decorations).
---

# Anti-Slop Visual Standard & Cleaner for Kaiki's Portfolio

This skill enforces Kaiki's zero-tolerance policy against AI-generated design slop ("desain slop"). AI agents frequently inject unsolicited decorative filler that degrades the clean, bold, editorial aesthetic of the site.

## 1. The Core Anti-Slop Rules

### 🚫 Rule 1: No Tiny Random Text ("Teks Kecil Gak Jelas")
* **PURGE:**
  * Pseudo-developer annotations, random serial codes, timestamps, coordinates, or timezones (e.g. `UTC+7 (WIB)`, `Malang & Surabaya, ID`, `v1.0.4-prod`, `SYS_OK`).
  * Terminal/cyberpunk clichés: double slashes like `// 01 NAVIGATION`, `// 02 CONNECT`, pseudo-code tags like `<PORTFOLIO />` or `[01]`.
  * Random micro-captions or micro-tags under titles or buttons unless explicitly requested by Kaiki.
* **KEEP ONLY:**
  * Real, purposeful content written or approved by Kaiki (clear section headings, concise descriptions, actual project titles, real contact links).

### 🚫 Rule 2: No Faded Gray Text ("Font Abu-Abu")
* **PURGE:**
  * Low-contrast, washed-out text like `text-white/40`, `text-white/50`, `text-[#f4f4ed]/40`, `text-[#f4f4ed]/50`, `text-neutral-500`, `text-gray-400`. These make the UI look like a generic AI template with low readability.
* **ENFORCE:**
  * High-contrast, crisp, confident typography:
    * Light text on dark backgrounds: `#f4f4ed` (Warm Bone) or high opacity `#f4f4ed`/90.
    * Dark text on light backgrounds: `#111112` (Deep Charcoal) or `#111112`/90.
    * Accent highlights: `#0055FF` (Editorial Cobalt Blue) or `#38bdf8` (Electric Sky) for key focal points.

### 🚫 Rule 3: No Unnecessary Strips & Divider Lines ("Strip-Strip Garis")
* **PURGE:**
  * Gratuitous divider lines (`border-t border-white/10`, `border-b border-white/15`, horizontal/vertical separator stripes) that AI inserts between columns, below titles, or above footers to "fill empty space".
  * Dashed lines, grid outlines, tech-bracket borders.
* **ENFORCE:**
  * Structural definition through **negative space (whitespace), typography hierarchy, and alternating section contrast** (`#f4f4ed` vs `#111112`), NOT cluttering lines.

### 🚫 Rule 4: No Unsolicited AI Micro-Decorations & Clichés
* **PURGE:**
  * Pulsing neon dots (`animate-ping`, `●`, `■`, neon green dots).
  * Pill badges like `● Available for Work & Collab`, `STATUS: ONLINE`, etc.
  * `font-mono` on section headings, badges, or card subtitles (only `font-display` Mona Sans for headings/labels, `font-brier` for editorial italic accents, `font-sans` for body copy).
  * Fake tech pill chips or tags scattered across cards.

## 2. Audit Workflow
When running a clean-up:
1. Scan all components from top to bottom (`Navigation.tsx` &rarr; `Hero.tsx` &rarr; `TickerSection.tsx` &rarr; `AboutSection.tsx` &rarr; `PortaleSection.tsx` &rarr; `SelectedWorkSection.tsx` &rarr; `CatWorkflowSection.tsx` &rarr; `ArsenalSection.tsx` &rarr; `JourneySection.tsx` &rarr; `Footer.tsx`).
2. Search for:
   * Class patterns: `text-white/40`, `text-white/50`, `text-[#f4f4ed]/50`, `text-[#f4f4ed]/60`, `border-white/10`, `border-t`, `border-b`, `font-mono`, `animate-ping`, `//`.
   * Unsolicited AI copy: fake status, fake badges, unnecessary pill tags.
3. Remove or upgrade each violation.
4. Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.

