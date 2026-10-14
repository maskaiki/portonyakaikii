# 📋 Product Requirements Document (PRD)
## KAIKI — Personal Portfolio Website

> **Version:** 1.0  
> **Author:** Antigravity AI × Kaiki  
> **Date:** October 2026  
> **Target Platform:** Webflow (with custom code for advanced interactions)  
> **Reference:** [landonorris.com](https://landonorris.com) — adapted for creative technologist identity

---

## 1. Product Overview

### 1.1 Vision
A **single-scroll kinetic storytelling experience** that positions **Kaiki (Mohammad Rifky Wicaksana)** as a boundary-crossing creative — someone who codes systems AND crafts visual stories. The site should feel like a high-end editorial magazine that moves, not a static developer portfolio.

### 1.2 Identity Summary
| Attribute | Detail |
|---|---|
| **Brand Name** | KAIKI |
| **Full Name** | Mohammad Rifky Wicaksana |
| **Tagline** | Digital Creative · Design & Development |
| **Status** | Informatics Engineering Student (Semester 5–6) |
| **Core Skills** | Graphic Design (Freelance) · Social Media Strategy · Web Development |
| **Personality** | Bold, edgy, confident — dark aesthetic with kinetic energy |
| **Language** | English (all copy) |
| **Social Links** | Instagram · LinkedIn · GitHub |

### 1.3 Target Audience
- Potential employers & recruiters (tech + creative agencies)
- Freelance design clients
- Fellow students / collaborators
- Competition judges (portfolio submissions)

---

## 2. Design System

### 2.1 Color Palette (Suggested)

> [!TIP]
> Bold & Edgy palette inspired by landonorris.com — deep blacks with electric accent colors that pop.

```
┌─────────────────────────────────────────────────────────┐
│  KAIKI BRAND PALETTE                                     │
├────────────────┬────────────────┬────────────────────────┤
│ TOKEN          │ HEX            │ USAGE                  │
├────────────────┼────────────────┼────────────────────────┤
│ --bg-primary   │ #0A0A0A        │ Page background        │
│ --bg-secondary │ #141414        │ Cards, sections        │
│ --bg-elevated  │ #1A1A1A        │ Hover states, modals   │
│ --text-primary │ #EFEFE5        │ Main body text         │
│ --text-muted   │ #8A8A7A        │ Captions, labels       │
│ --accent-1     │ #0066FF        │ Electric Blue (primary)│
│ --accent-2     │ #00FF88        │ Neon Mint (secondary)  │
│ --accent-3     │ #FF3D00        │ Hot Coral (danger/CTA) │
│ --border       │ #2A2A2A        │ Dividers, outlines     │
│ --gradient-1   │ #0066FF→#00FF88│ Hero gradient          │
│ --gradient-2   │ #0A0A0A→#141414│ Section transitions    │
└────────────────┴────────────────┴────────────────────────┘
```

### 2.2 Typography

| Role | Font | Weight | Size (Desktop) | Notes |
|---|---|---|---|---|
| **Display / Hero** | Mona Sans (Variable) | 800–900 | 96–160px | All caps, tight tracking (-0.04em) |
| **Section Titles** | Mona Sans | 700 | 48–72px | Mixed case or uppercase |
| **Body** | Mona Sans | 400 | 16–18px | Regular reading |
| **Accent / Signature** | Brier (Serif) | 700 | 24–40px | Italic for quotes, callouts |
| **Labels / Tags** | Mona Sans | 500 | 12–14px | Uppercase, wide tracking (+0.1em) |

### 2.3 Spacing & Grid

- **Grid:** 12-column with 24px gutter (Webflow default)
- **Section padding:** `120px` top/bottom (desktop) → `64px` (mobile)
- **Max content width:** `1440px`, centered
- **Side margins:** `48px` (desktop) → `20px` (mobile)

### 2.4 Motion Principles

| Pattern | Usage | Webflow Implementation |
|---|---|---|
| **Scroll-triggered fade/slide** | Section entrances | IX2 — scroll-into-view trigger |
| **Parallax depth** | Hero background, images | IX2 — while-scrolling trigger |
| **Infinite marquee** | Ticker text, tech stack logos | CSS `@keyframes` (no IX2) |
| **Hover scale/glow** | Project cards, buttons | IX2 — hover trigger |
| **Stagger reveal** | List items, grid children | IX2 — scroll-into-view with `delay` |
| **Magnetic cursor** | CTA buttons | Custom code (JS) |

---

## 3. Page Architecture — Single Scroll

> [!IMPORTANT]
> Everything lives on ONE page. No separate routes. Smooth vertical journey from hero to footer. Navigation anchors scroll to sections.

### 3.0 Sticky Navigation Bar
```
┌──────────────────────────────────────────────────────────┐
│  [KAIKI]                           [≡ MENU]  [CONNECT]   │
│   logo/brand                   hamburger    CTA button   │
└──────────────────────────────────────────────────────────┘
```

**Behavior:**
- Fixed/sticky at top, transparent initially → solid `#0A0A0A` on scroll
- **KAIKI** wordmark on far left (link to top)
- **CONNECT** button on far right (smooth-scrolls to contact section)
- Hamburger menu opens overlay with section links: *Work · About · Skills · Contact*
- Subtle backdrop blur (`backdrop-filter: blur(12px)`)
- Auto-hide on scroll-down, reappear on scroll-up

---

### 3.1 Section 01 — HERO (Full Viewport)

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  KAIKI                                                       │
│                                                              │
│  ┌─────────────────────────────┐    INFORMATICS              │
│  │                             │    ENGINEERING               │
│  │    [PORTRAIT PHOTO]         │                              │
│  │    full-bleed, desaturated  │    ───────────               │
│  │    with electric blue tint  │                              │
│  │                             │    Digital Creative           │
│  └─────────────────────────────┘    Design & Development      │
│                                                              │
│  ────────── SCROLL TO EXPLORE ──────────  ↓                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Content:**
- Giant **"KAIKI"** display text (Mona Sans 900, 120–160px)
- Professional portrait photo — desaturated with an electric blue duotone overlay
- **"INFORMATICS ENGINEERING"** — bold, right-aligned, big serif text (Brier)
- **"Digital Creative | Design & Development"** — tagline in muted text
- Scroll indicator at bottom with bounce animation
- Subtle grain texture overlay on entire hero

**Animations:**
- Name letters stagger-in from bottom on load (0.05s delay per letter)
- Photo fades in + slight scale from 1.05→1.0
- Parallax: photo moves slower than text on scroll
- Scroll indicator pulses gently

**Webflow Notes:**
- Hero wrapper: `100vh`, `position: relative`, `overflow: hidden`
- Photo: `position: absolute` or CSS grid overlay, `mix-blend-mode: luminosity` + blue tint
- IX2: page-load trigger for entrance animations

---

### 3.2 Section 02 — KINETIC MARQUEE TICKER

```
┌──────────────────────────────────────────────────────────────┐
│ ◄── DESIGN × DEVELOP × CREATE × INNOVATE × DESIGN × DEVEL  │
│ INNOVATE × DESIGN × DEVELOP × CREATE × INNOVATE × DESIGN ──►│
└──────────────────────────────────────────────────────────────┘
```

**Content:**
- Two rows of infinite-scroll text moving in opposite directions
- Keywords: `DESIGN` · `DEVELOP` · `CREATE` · `INNOVATE` · `STRATEGIZE`
- Separator character: `×` or `✦`
- Font: Mona Sans 700, 48px, uppercase, muted color `#2A2A2A` with 1 keyword per row highlighted in `--accent-1`

**Animations:**
- Pure CSS infinite `translateX` animation (no JS)
- Row 1: Right → Left
- Row 2: Left → Right
- Speed: ~40s per complete loop

**Webflow Notes:**
- Use flex container with duplicated text blocks for seamless loop
- `animation: ticker linear infinite`
- No IX2 needed — pure CSS

---

### 3.3 Section 03 — ABOUT ME (The Story)

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  01                                                          │
│  ── ABOUT                                                    │
│                                                              │
│  I'M A SEMESTER 5 INFORMATICS ENGINEERING STUDENT            │
│  WHO BLURS THE LINE BETWEEN CODE AND CANVAS.                 │
│                                                              │
│  With hands-on experience as a freelance graphic designer    │
│  and social media strategist, I bring a rare mix of          │
│  technical precision and creative intuition to every project.│
│                                                              │
│  I don't just build — I craft experiences.                   │
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                      │
│  │  20+    │  │  3+     │  │  5+     │                      │
│  │ Projects│  │ Clients │  │  Awards │                      │
│  └─────────┘  └─────────┘  └─────────┘                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Content:**
- Section label: `01 — ABOUT`
- Bold statement (Mona Sans 700, 36–48px): 2-line hook about identity
- Body paragraph (Mona Sans 400, 18px): elaboration on the three-pillar identity
- Closing punch-line in accent color
- **Stats row**: 3 metric cards with animated count-up numbers
  - e.g., `20+ Projects` · `3+ Clients` · `5+ Awards` (Kaiki to confirm actual numbers)

**Animations:**
- Statement text: word-by-word reveal on scroll
- Stats: count-up animation triggered when section enters viewport
- Section label: slide-in from left

**Webflow Notes:**
- IX2 scroll-into-view on the text wrapper
- Count-up: custom embed `<script>` with IntersectionObserver

---

### 3.4 Section 04 — WORK SHOWCASE (Portfolio Gallery)

> [!IMPORTANT]
> This is the most critical section. Three categories of work need to be showcased distinctly but within a unified visual system.

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  02                                                          │
│  ── SELECTED WORK                                            │
│                                                              │
│  [ ALL ]  [ DESIGN ]  [ CODE ]  [ SOCIAL MEDIA ]            │
│                                                              │
│  ┌───────────────────────┐  ┌───────────────────────┐        │
│  │                       │  │                       │        │
│  │   PROJECT THUMBNAIL   │  │   PROJECT THUMBNAIL   │        │
│  │   with hover overlay  │  │   with hover overlay  │        │
│  │                       │  │                       │        │
│  │ ─────────────────────  │  │ ─────────────────────  │        │
│  │ Project Name           │  │ Project Name           │        │
│  │ Category • Year        │  │ Category • Year        │        │
│  └───────────────────────┘  └───────────────────────┘        │
│                                                              │
│  ┌───────────────────────┐  ┌───────────────────────┐        │
│  │                       │  │                       │        │
│  │   PROJECT THUMBNAIL   │  │   PROJECT THUMBNAIL   │        │
│  │                       │  │                       │        │
│  │ ─────────────────────  │  │ ─────────────────────  │        │
│  │ Project Name           │  │ Project Name           │        │
│  │ Category • Year        │  │ Category • Year        │        │
│  └───────────────────────┘  └───────────────────────┘        │
│                                                              │
│              [ VIEW ALL PROJECTS → ]                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Content:**
- Section label: `02 — SELECTED WORK`
- **Filter tabs**: ALL · DESIGN · CODE · SOCIAL MEDIA
- **Project cards** (2-column masonry-style grid):
  - Thumbnail image (16:9 or 4:3)
  - Project name (bold)
  - Category tag + Year
  - On hover: subtle scale-up + overlay with brief description

**Project Categories:**
1. **Design** — Poster design, branding, visual identity, competition entries
2. **Code** — Web development projects, apps, coding competition work
3. **Social Media** — Campaign work, content strategy, growth metrics

**Animations:**
- Filter tabs: active tab has `--accent-1` underline with smooth slide
- Cards: stagger fade-in on scroll (0.1s delay between cards)
- Hover: card lifts (`translateY(-8px)`) + shadow increase + overlay fade

**Webflow Notes:**
- Webflow CMS Collection for projects (fields: name, category, year, thumbnail, description, link)
- Filter via CMS filter or custom JS with `data-category` attributes
- Masonry layout: CSS grid with `grid-auto-rows` or manual column stacking

---

### 3.5 Section 05 — SKILLS & TOOLS (Tech Stack)

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  03                                                          │
│  ── ARSENAL                                                  │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   💻 CODE    │  │   🎨 DESIGN  │  │  📱 SOCIAL   │        │
│  │              │  │              │  │              │        │
│  │ • Next.js    │  │ • Canva      │  │ • Content    │        │
│  │ • TypeScript │  │ • Figma      │  │   Strategy   │        │
│  │ • JavaScript │  │ • Adobe PS   │  │ • Analytics  │        │
│  │ • React      │  │ • Illustrator│  │ • Copywriting│        │
│  │ • Python     │  │ • CapCut     │  │ • Campaign   │        │
│  │ • Git        │  │              │  │   Management │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                              │
│  ◄── LOGO MARQUEE: [Next.js] [TS] [JS] [Canva] [CapCut] ──►│
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Content:**
- Section label: `03 — ARSENAL`
- Three-column layout showing skill pillars
- Infinite scrolling logo marquee at bottom (existing tech logos + Canva + CapCut)
- Each column has an icon, pillar name, and bulleted skill list

**Animations:**
- Columns: stagger slide-up on scroll (left→right, 0.15s delay)
- Logo marquee: pure CSS infinite scroll (already implemented, carry over)
- Skill items: fade-in one by one within each column

**Webflow Notes:**
- Static content (no CMS needed)
- Marquee: flex container with CSS animation
- SVG logos as inline or image assets

---

### 3.6 Section 06 — EXPERIENCE TIMELINE

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  04                                                          │
│  ── JOURNEY                                                  │
│                                                              │
│        2024 ──── Freelance Graphic Designer                  │
│                  Branding & visual identity for clients       │
│             │                                                │
│        2024 ──── Social Media Strategist                     │
│                  Content planning & audience growth           │
│             │                                                │
│        2023 ──── Competition Winner                          │
│                  [Competition Name] — Design Category         │
│             │                                                │
│        2022 ──── Started Informatics Engineering             │
│                  [University Name]                           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Content:**
- Section label: `04 — JOURNEY`
- Vertical timeline with alternating left/right entries (desktop) → stacked (mobile)
- Each entry: Year · Title · Brief description
- Timeline line has animated dot/pulse at each milestone

**Animations:**
- Timeline line draws downward on scroll (stroke-dashoffset)
- Each entry fades in when it reaches the center viewport
- Year numbers: bold `--accent-1` color

**Webflow Notes:**
- IX2 scroll-into-view for each timeline item
- Timeline line: pseudo-element or dedicated div with border-left
- Custom code for line-draw animation

---

### 3.7 Section 07 — BOLD STATEMENT / MANIFESTO

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│          "I DON'T CHOOSE BETWEEN                             │
│           CODE AND CREATIVITY.                               │
│           I USE BOTH."                                       │
│                                              — KAIKI         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Content:**
- Full-width statement in giant serif text (Brier 700, 64–96px)
- Italic styling for emphasis
- Attribution: `— KAIKI` in accent color
- Background: subtle gradient or grain texture

**Animations:**
- Each line reveals on scroll (slide up + opacity)
- Final attribution appears with slight delay
- Optional: subtle parallax on background texture

---

### 3.8 Section 08 — CONTACT / CTA (Final Section)

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  05                                                          │
│  ── LET'S CONNECT                                            │
│                                                              │
│                                                              │
│        GOT A PROJECT?                                        │
│        LET'S MAKE IT HAPPEN.                                 │
│                                                              │
│        [ SAY HELLO → ]                                       │
│                                                              │
│        ──────────────────────                                │
│                                                              │
│        rifkywicaksana@email.com                               │
│                                                              │
│        [IG]  [LinkedIn]  [GitHub]                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Content:**
- Section label: `05 — LET'S CONNECT`
- Bold CTA headline: "GOT A PROJECT? LET'S MAKE IT HAPPEN."
- Primary CTA button: `SAY HELLO →` (opens `mailto:` or contact form)
- Email address displayed
- Social icon row: Instagram · LinkedIn · GitHub
- No separate contact page — this IS the contact section

**Animations:**
- Headline: word reveal on scroll
- Button: magnetic hover effect (follows cursor slightly)
- Social icons: stagger pop-in
- Button hover: background fills from left to right

---

### 3.9 Section 09 — FOOTER

```
┌──────────────────────────────────────────────────────────────┐
│  © 2026 KAIKI. All Rights Reserved.                          │
│                                                              │
│  Designed & Built by Kaiki           [↑ BACK TO TOP]         │
└──────────────────────────────────────────────────────────────┘
```

**Content:**
- Copyright line
- Credit line
- Back-to-top button (smooth scroll)
- Minimal, clean, no clutter

---

## 4. Responsive Breakpoints

| Breakpoint | Width | Key Changes |
|---|---|---|
| **Desktop XL** | 1440px+ | Full 12-col grid, max content width |
| **Desktop** | 1024–1439px | Slightly tighter spacing |
| **Tablet** | 768–1023px | 2-col grid → stacked, smaller type |
| **Mobile** | 320–767px | Single column, hamburger nav, 48px margins → 20px |

### Mobile-Specific Adjustments:
- Hero text: 60–80px (down from 120–160px)
- Project grid: single column
- Timeline: left-aligned only (no alternating)
- Marquee text: 28px (down from 48px)
- Section padding: 64px (down from 120px)

---

## 5. Technical Architecture (Webflow)

### 5.1 Webflow Structure

```
Body
├── Navbar (Sticky)
│   ├── Brand Logo (KAIKI)
│   ├── Nav Menu (overlay)
│   └── CTA Button (CONNECT)
│
├── Hero Section (100vh)
│   ├── Name Display
│   ├── Portrait Image
│   ├── Title Text
│   └── Scroll Indicator
│
├── Marquee Section
│   ├── Ticker Row 1 (→)
│   └── Ticker Row 2 (←)
│
├── About Section
│   ├── Section Label
│   ├── Statement Block
│   ├── Body Text
│   └── Stats Row (3x)
│
├── Work Section
│   ├── Section Label
│   ├── Filter Tabs
│   └── Project Grid (CMS)
│       └── Project Card (CMS Item)
│
├── Arsenal Section
│   ├── Section Label
│   ├── Skills Columns (3x)
│   └── Logo Marquee
│
├── Journey Section
│   ├── Section Label
│   └── Timeline Items
│
├── Statement Section
│   └── Quote Block
│
├── Contact Section
│   ├── Section Label
│   ├── CTA Headline
│   ├── CTA Button
│   ├── Email
│   └── Social Links
│
└── Footer
    ├── Copyright
    └── Back to Top
```

### 5.2 Webflow CMS Collections

| Collection | Fields |
|---|---|
| **Projects** | `name` (text), `category` (option: Design/Code/Social Media), `year` (text), `thumbnail` (image), `description` (text), `external_link` (url), `is_featured` (switch), `order` (number) |

### 5.3 Custom Code Required

```javascript
// 1. Infinite Marquee (CSS only — no custom code needed)
// 2. Count-up Animation for Stats
// 3. Smooth Scroll for Navigation Anchors  
// 4. Magnetic Button Effect (CTA)
// 5. Filter functionality for project gallery
// 6. Scroll-direction-aware navbar show/hide
```

### 5.4 Naming Convention (Client-First)

```
// Sections
.section_hero
.section_marquee
.section_about
.section_work
.section_arsenal
.section_journey
.section_statement
.section_contact
.footer_component

// Components
.nav_component
.project-card_component
.timeline-item_component
.stat-card_component
.filter-tab_component

// Utilities
.text-style-display
.text-style-heading
.text-style-body
.text-style-label
.margin-top-120
.padding-section-large
```

---

## 6. Content Inventory (Copy to Write)

> [!NOTE]
> All copy is in **English**. Kaiki to review and personalize.

| Section | Content Needed | Status |
|---|---|---|
| Nav | Brand name, menu items | ✅ Defined |
| Hero | Name, title, tagline | ✅ Defined |
| Marquee | 5 keywords | ✅ Defined |
| About | 2-line statement + paragraph + stats | ⚠️ Needs Kaiki's real numbers |
| Work | Project names, descriptions, thumbnails | ⚠️ Needs Kaiki's real projects |
| Arsenal | Full skill lists per pillar | ⚠️ Needs confirmation |
| Journey | Timeline entries with dates | ⚠️ Needs Kaiki's real history |
| Statement | Manifesto quote | ✅ Suggested |
| Contact | Email, social URLs | ⚠️ Needs real links |
| Footer | Copyright | ✅ Defined |

---

## 7. SEO & Performance

### 7.1 Meta Tags
```html
<title>KAIKI — Digital Creative | Design & Development</title>
<meta name="description" content="Portfolio of Mohammad Rifky Wicaksana (Kaiki) — Informatics Engineering student, freelance graphic designer, and social media strategist. Crafting experiences at the intersection of code and creativity.">
<meta property="og:title" content="KAIKI — Digital Creative">
<meta property="og:description" content="Code × Design × Content. Portfolio by Kaiki.">
<meta property="og:image" content="[og-image.jpg]">
```

### 7.2 Performance Targets
- **Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices, SEO)
- **LCP:** < 2.5s
- **CLS:** < 0.1
- Image optimization: WebP format, lazy loading below fold
- Font loading: `font-display: swap`

---

## 8. Asset Checklist

| Asset | Format | Status |
|---|---|---|
| Portrait photo (hero) | WebP/PNG, min 1200px wide | ✅ Available |
| Project screenshots/mockups | WebP/PNG, 16:9 ratio | ⚠️ Partially available |
| Tech/tool logos (SVG) | SVG, monochrome white | ✅ Available (from current site) |
| OG Image (social sharing) | PNG, 1200×630px | ❌ Need to create |
| Favicon | ICO/PNG, 32×32 + 180×180 | ❌ Need to create |
| Grain texture overlay | PNG, tileable | ❌ Need to create |

---

## 9. Implementation Phases

### Phase 1 — Foundation (Week 1)
- [ ] Set up Webflow project with Client-First structure
- [ ] Configure typography (Mona Sans + Brier from Google Fonts or custom upload)
- [ ] Build design system: colors, spacing, text styles
- [ ] Create Navbar component
- [ ] Build Hero section (static first, then animate)

### Phase 2 — Core Sections (Week 2)
- [ ] Build Marquee ticker section
- [ ] Build About section with stats
- [ ] Build Work section with CMS + filter
- [ ] Populate CMS with project data

### Phase 3 — Supporting Sections (Week 3)
- [ ] Build Arsenal / Skills section + logo marquee
- [ ] Build Journey timeline
- [ ] Build Statement / manifesto section
- [ ] Build Contact section + footer

### Phase 4 — Polish & Launch (Week 4)
- [ ] Add all IX2 animations (scroll reveals, hovers, parallax)
- [ ] Add custom code (count-up, magnetic button, filters)
- [ ] Responsive testing across all breakpoints
- [ ] Performance optimization (images, fonts, animations)
- [ ] SEO meta tags + OG image
- [ ] Launch on custom domain

---

## 10. Success Metrics

| Metric | Target |
|---|---|
| Time on page | > 2 minutes average |
| Scroll depth | > 80% reach contact section |
| Contact CTA clicks | > 5% of visitors |
| Portfolio filter engagement | > 30% use filters |
| Lighthouse performance | > 90 |
| Mobile usability | 100% functional on all breakpoints |

---

## 11. Open Questions for Kaiki

> [!WARNING]
> These items need your input before we can finalize.

1. **Stats numbers** — How many projects, clients, and awards/competitions have you done? (for the About section)
2. **Project list** — Can you list 6–8 of your best projects with:
   - Project name
   - Category (Design / Code / Social Media)
   - Year
   - Brief description (1–2 sentences)
   - Screenshot or link
3. **Timeline entries** — Key milestones (when you started university, first freelance gig, notable competitions, etc.)
4. **Actual skill list** — Confirm which tools/languages you actively use in each pillar
5. **Email address** — Which email to display on the contact section?
6. **Social media URLs** — Exact Instagram, LinkedIn, and GitHub profile links
7. **University name** — Do you want it displayed? Which university?
8. **Custom domain** — Do you already have one, or will you use a Webflow subdomain?

---

> **Next Step:** Review this PRD, answer the open questions above, and we'll proceed to build.
