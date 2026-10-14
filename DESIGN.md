---
version: "alpha"
name: "KAIKI — Kinetic Editorial Portfolio"
description: "A bold, dark-mode single-scroll portfolio for Mohammad Rifky Wicaksana (KAIKI) — creative technologist, informatics engineer, graphic designer, and social media strategist. Inspired by the kinetic, high-contrast, editorial aesthetic of landonnorris.com."

colors:
  primary: "#0066FF"
  primary-glow: "rgba(0, 102, 255, 0.35)"
  secondary: "#00FF88"
  accent-coral: "#FF3D00"
  background: "#0A0A0A"
  surface: "#141414"
  surface-elevated: "#1A1A1A"
  surface-card: "#121212"
  text-primary: "#EFEFE5"
  text-muted: "#8A8A7A"
  text-subtle: "#555550"
  border: "#2A2A2A"
  border-subtle: "rgba(239, 239, 229, 0.08)"
  border-active: "#0066FF"

typography:
  display:
    fontFamily: "Mona Sans, system-ui, sans-serif"
    fontSize: "clamp(4.5rem, 11vw, 9.5rem)"
    fontWeight: 900
    lineHeight: "0.88"
    letterSpacing: "-0.04em"
    textTransform: "uppercase"
  h1:
    fontFamily: "Mona Sans, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 800
    lineHeight: "0.95"
    letterSpacing: "-0.03em"
    textTransform: "uppercase"
  h2:
    fontFamily: "Mona Sans, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: "1.1"
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "Mona Sans, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: "1.2"
  serif-headline:
    fontFamily: "Brier, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 4rem)"
    fontWeight: 700
    fontStyle: "italic"
    lineHeight: "1.1"
  body:
    fontFamily: "Mona Sans, Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: "1.65"
  body-sm:
    fontFamily: "Mona Sans, Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: "1.5"
  caption:
    fontFamily: "Mona Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.16em"
    textTransform: "uppercase"

rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "16px"
  xl: "24px"
  full: "9999px"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  section: "120px"
  section-mobile: "64px"

components:
  navbar:
    background: "rgba(10, 10, 10, 0.82)"
    backdropBlur: "16px"
    height: "76px"
    borderBottom: "1px solid {colors.border-subtle}"
  button-primary:
    background: "{colors.primary}"
    color: "#FFFFFF"
    borderRadius: "{rounded.full}"
    padding: "14px 28px"
    fontWeight: 700
    textTransform: "uppercase"
    letterSpacing: "0.08em"
    boxShadow: "0 4px 24px {colors.primary-glow}"
  button-pill:
    background: "transparent"
    border: "1px solid {colors.border}"
    color: "{colors.text-primary}"
    borderRadius: "{rounded.full}"
    padding: "8px 18px"
    fontSize: "0.875rem"
  card:
    background: "{colors.surface-card}"
    border: "1px solid {colors.border}"
    borderRadius: "{rounded.lg}"
    padding: "32px"
    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease"
  badge:
    background: "{colors.surface-elevated}"
    color: "{colors.secondary}"
    borderRadius: "{rounded.full}"
    padding: "4px 12px"
    fontSize: "0.75rem"
    fontWeight: 600
---

# KAIKI — Kinetic Editorial Portfolio Design System

## 1. Overview & Vision
This design system defines the aesthetic and component architecture for the personal portfolio of **Mohammad Rifky Wicaksana (KAIKI)**. 

Kaiki is a hybrid creative technologist with a unique tripartite profile:
1. **Informatics Engineering** (Code, Frontend Engineering, Systems)
2. **Graphic Design** (Brand Identity, Editorial Layout, Visual Posters)
3. **Social Media Strategy** (Content Architecture, Engagement, Campaigns)

The portfolio follows a **continuous single-scroll vertical flow** (no separate subpages for contact, about, or lab). The visual identity is directly inspired by **landonnorris.com**: dark, cinematic, editorial, bold typography, electric blue light accents, and perpetual kinetic motion.

---

## 2. Atmosphere & Color Palette

### 2.1 The Obsidian Canvas
The interface is built on deep blacks (`#0A0A0A`) and charcoal surfaces (`#141414`), ensuring visual weight and letting typography and imagery command the page.

* **Canvas Void (`{colors.background}` | `#0A0A0A`):** The default infinite backdrop.
* **Surface Card (`{colors.surface-card}` | `#121212`):** Cards and elevated containers.
* **Elevated Hover (`{colors.surface-elevated}` | `#1A1A1A`):** Active interactive elements and hovering states.
* **Border Lines (`{colors.border}` | `#2A2A2A`):** Sharp, subtle geometric dividers.

### 2.2 Electric Accents & Illumination
* **Electric Blue (`{colors.primary}` | `#0066FF`):** The signature brand accent. Used for high-voltage focal points, glowing buttons, active tabs, and primary CTAs.
* **Neon Mint (`{colors.secondary}` | `#00FF88`):** Secondary punctuation. Used for badges, technical tags, and live status indicators.
* **Hot Coral (`{colors.accent-coral}` | `#FF3D00`):** Alert states and expressive contrast accents.

### 2.3 Editorial Typography Colors
* **Warm Milk Primary (`{colors.text-primary}` | `#EFEFE5`):** High-readability editorial off-white. Never pure `#FFFFFF` for large blocks of text to reduce harsh glare.
* **Muted Sage (`{colors.text-muted}` | `#8A8A7A`):** Subheadings, labels, secondary metadata, and descriptions.
* **Charcoal Dim (`{colors.text-subtle}` | `#555550`):** Inactive numbers, timestamps, and secondary grid markers.

---

## 3. Typography Architecture

The typography pairs an ultra-bold kinetic sans-serif with a high-fashion, editorial italic serif.

1. **Primary Sans — Mona Sans:**
   * **Weights:** 900 (Black) for display headlines, 800 (ExtraBold) for section titles, 700 (Bold) for UI controls, 400 (Regular) for body text.
   * **Display Headlines:** Massive, tight-tracking (`-0.04em`), uppercase, line-height under `0.95`.
2. **Editorial Accent — Brier Serif:**
   * **Style:** High-contrast serif, italicized.
   * **Usage:** Signature phrases, the word "ENGINEERING" in the hero, pull quotes, and manifesto lines.
3. **Numbers & Timelines:**
   * Tabular figures with monospaced precision. Section indices (`01`, `02`, `03`) styled with tracking and dimmed tint.

---

## 4. Single-Scroll Architecture (Section Breakdown)

Every section exists along a single scrollable timeline without page refreshes.

### Section 00: Sticky Glass Navigation
* **Placement:** `position: sticky; top: 0; z-index: 100;`
* **Layout:** Left: Bold `KAIKI` logo mark; Center: Section jump indicators (`Work`, `About`, `Skills`); Right: Glowing `CONNECT` pill CTA.
* **Styling:** Glassmorphism with `backdrop-filter: blur(16px)` and 1px border bottom.

### Section 01: Hero (Cinematic First Impression)
* **Height:** `100vh` full viewport height.
* **Layout Grid (Desktop):** 
  * Left column: Massive display title **`KAIKI`** and subtitle **`BUILDING DIGITAL SYSTEMS & STORIES`**.
  * Center: Desaturated portrait photograph of Kaiki with electric cyan-blue duotone aura and ambient edge glow.
  * Right column: High-impact editorial text **`INFORMATICS ENGINEERING`** (bold Brier serif) + role pill badges (`Graphic Designer`, `Social Media Strategist`).
* **Scroll Cue:** Pulsing chevron with label `SCROLL TO EXPLORE`.

### Section 02: Dual Kinetic Marquee Tickers
* **Movement:** Two infinite horizontal sliding rows moving in opposing directions.
* **Content:** Repeating keywords `DESIGN × DEVELOP × STRATEGIZE × INNOVATE × CREATE`.
* **Style:** Mona Sans 800, uppercase, outline stroke styling mixed with solid electric blue highlighted words.

### Section 03: The Manifesto & About Story
* **Section Index:** `01 // ABOUT`
* **Headline:** "I DON'T CHOOSE BETWEEN CODE AND CANVAS. I CRAFT AT THE INTERSECTION."
* **Bio Block:** Narrative highlighting the synthesis of technical computer science rigor and visual storytelling intuition.
* **Metrics Counter:** 3 distinct metric cards:
  * `20+` Completed Projects
  * `100%` Code & Visual Craftsmanship
  * `3+` Years Multidisciplinary Practice

### Section 04: Selected Work Showcase
* **Section Index:** `02 // SELECTED WORK`
* **Filter System:** Pill tabs: `[ALL]` `[CODE / DEV]` `[GRAPHIC DESIGN]` `[SOCIAL MEDIA]`.
* **Grid Layout:** 2-column asymmetric editorial cards:
  * 16:9 high-resolution project visual with dark vignette.
  * Hover state: Card scales up slightly (`1.02x`), image shifts smoothly, title glows in electric blue.
  * Meta: Project name, category pill badge, year tag, and brief impact statement.

### Section 05: Arsenal (Technical & Creative Toolkit)
* **Section Index:** `03 // ARSENAL`
* **Tri-Pillar Grid:**
  * **Column 1 — Code & Systems:** Next.js, TypeScript, JavaScript, React, Python, Git.
  * **Column 2 — Visual & Design:** Figma, Canva, Adobe Photoshop, Adobe Illustrator, Visual Identity.
  * **Column 3 — Media & Strategy:** CapCut, Content Strategy, Audience Growth, Campaign Analytics.
* **Logo Infinite Ticker:** Seamless horizontal track running Next.js, TypeScript, JavaScript, Canva, CapCut, Figma SVG brand marks.

### Section 06: Journey & Experience Timeline
* **Section Index:** `04 // JOURNEY`
* **Visual:** Vertical luminescent timeline line with glowing junction nodes.
* **Milestones:**
  * Semester 5–6 Informatics Engineering student.
  * Freelance Graphic Designer for diverse commercial branding projects.
  * Social Media Strategist & Content Creator.

### Section 07: Editorial Manifesto Quote
* Full-width dark section with giant editorial serif quote:
  > *"Lines of code give structure to thought. Design gives it a soul."*
* Styled in oversized italic serif with subtle ambient gradient lighting behind the text.

### Section 08: Direct Contact & CTA
* **Section Index:** `05 // LET'S CONNECT`
* **Layout:** 
  * Massive callout: **"HAVE A PROJECT IN MIND? LET'S BUILD SOMETHING EXTRAORDINARY."**
  * Direct Contact Button: Large magnetic pill button `[ START A CONVERSATION → ]` triggering `mailto:`.
  * Social Channel Links: Bold text links with hover arrows: `Instagram ↗`, `LinkedIn ↗`, `GitHub ↗`.
  * No separate route or popup — seamless on-page conversion.

### Section 09: Minimalist Colophon Footer
* Clean copyright notice: `© 2026 KAIKI (Mohammad Rifky Wicaksana). All Rights Reserved.`
* Design credit: `Designed & Engineered with kinetic precision.`
* `[ BACK TO TOP ↑ ]` smooth-scroll anchor.

---

## 5. Motion, Physics & Micro-Interactions

1. **Kinetic Tickers:** Constant CSS `@keyframes` `translateX` with `-50%` reset loop. Must pause or decelerate on user hover.
2. **Magnetic CTA Buttons:** Primary buttons follow the cursor position within a 15px radius before snapping back on mouse leave.
3. **Card Elevate:** Cards translate `-6px` on the Y-axis with a transition curve of `cubic-bezier(0.16, 1, 0.3, 1)`.
4. **Scroll Reveal:** Section titles and text lines stagger upwards with a 40ms stagger per word/line upon entering the viewport.

---

## 6. Do's and Don'ts (Strict Guardrails)

### ✅ DO:
* **DO** maintain high contrast between background (`#0A0A0A`) and text (`#EFEFE5`).
* **DO** use the electric blue (`#0066FF`) sparingly as an intentional light source and interactive accent.
* **DO** keep all sections on a single unified page with smooth scroll behavior.
* **DO** use dramatic scale differences in typography (giant 120px+ headlines alongside delicate 12px uppercase captions).
* **DO** keep corners slightly rounded (`8px` to `16px`) for cards and fully pill-shaped (`9999px`) for interactive buttons.

### ❌ DON'T:
* **DON'T** introduce generic purple or multicolor saturated gradients. Stick strictly to electric blue, cyan, and neon mint accents.
* **DON'T** create multi-page navigation links that break the single-scroll flow.
* **DON'T** use pure white (`#FFFFFF`) for background surfaces or body paragraphs.
* **DON'T** use generic corporate layouts, centered boring icons, or standard Bootstrap/Tailwind starter card templates.
* **DON'T** allow typography to wrap awkwardly or get cut off on mobile viewports.
