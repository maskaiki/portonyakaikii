@AGENTS.md

## STRICT VISUAL GUARDRAILS (ZERO AI SLOP STANDARD)

1. **NO Tiny Random Text / Micro-Copy ("Teks Kecil Gak Jelas"):**
   - Never inject random serial numbers, coordinates, timestamps, or timezones (`UTC+7 (WIB)`, `Malang & Surabaya`, etc.).
   - Never use terminal/cyberpunk clichés: no double slashes `//`, no pseudo-code brackets `[01]`, no fake developer annotations.
   - Never add filler micro-labels or tags that Kaiki did not explicitly ask for.

2. **NO Low-Contrast Faded Gray Text ("Font Abu-Abu"):**
   - Never use washed-out text like `text-white/40`, `text-white/50`, `text-[#f4f4ed]/50`, `text-neutral-500`.
   - Typography must be crisp, high contrast, and editorial: Warm Bone (`#f4f4ed`) on dark backgrounds, Deep Charcoal (`#111112`) on light backgrounds.

3. **NO Unnecessary Strips / Divider Lines ("Strip Garis"):**
   - Remove gratuitous horizontal/vertical divider lines (`border-t border-white/10`, dividing stripes between columns, etc.).
   - Let generous negative space, scale, and background color contrast define the layout.

4. **NO Unsolicited AI Micro-Decorations & Badges:**
   - Never add pulsing neon dots (`animate-ping`, `●`, `■`), status pills (`Available for Work`, `ONLINE`), or floating pill chips.
   - No `font-mono` on headings, labels, or social links.

5. **Typography Only from PRD:**
   - Headings & Labels: `font-display` (Mona Sans), uppercase, bold/black.
   - Editorial Accents & Numbers: `font-brier` (Brier Serif Italic).
   - Body Copy: `font-sans` (Inter / Manrope).

6. **Color Palette:**
   - Warm Bone (`#F4F4ED`), Deep Charcoal (`#111112`), and Editorial Cobalt Blue (`#0055FF`), with Electric Sky (`#38bdf8`) for accents.
   - Alternating Light & Dark Sections rhythm: `#F4F4ED` (Hero, About, Arsenal, Footer Frame) vs `#111112` (Ticker, Work, Journey, Footer Card).

7. **NO Em Dashes (`—`):**
   - Never use em dashes (`—`) anywhere in website copy, titles, metadata, alt texts, or captions. Replace with clean punctuation: commas (`,`), periods (`.`), or middle dots (`·`).
