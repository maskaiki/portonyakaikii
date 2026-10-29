"use client";

import React, { useLayoutEffect, useRef } from "react";

// ── 1. GEOMETRY & TIMING CONSTANTS (1080 x 1080 Stage) ───────────────
const STAGE = 1080;

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
}

type Pt = [number, number];

const PILL: Rect = { x: 150, y: 300, w: 400, h: 104, r: 52 };
const CRAWL: Rect = { x: 610, y: 505, w: 350, h: 132, r: 30 };
const MATCH: Rect = { x: 200, y: 760, w: 470, h: 180, r: 30 };

const SEAT_PILL: Pt = [455, 300];
const SEAT_CRAWL: Pt = [700, 505];
const SEAT_MATCH: Pt = [545, 760];

const FLOW_1 = "M550 352 H725 Q785 352 785 412 V505";
const FLOW_2 = "M785 637 V668 Q785 698 755 698 H465 Q435 698 435 728 V760";

const CAT_ROOM = 240;
const CAT_REACH = 150;

const T = {
  type0: 0.5,
  type1: 1.7,
  drop0: 1.05,
  land1: 1.5,
  tap1: 2.3,
  c1: 2.45,
  e2in: 2.95,
  jump1: 3.8,
  land2: 4.62,
  tap2: 5.05,
  c2: 5.2,
  e3in: 5.8,
  jump2: 6.5,
  land3: 7.32,
  end: 10,
};
const LOOP = 10.5;

const COPY = {
  lead: "How a project",
  accent: "works",
  steps: ["01 — You ask", "02 — We craft the system", "03 — Standout result wins"],
  query: "cool portfolio web",
  searching: "Crafting…",
  crawlLabel: "Engineering & Design",
  crawlPages: 1284502331,
  crawlUnit: "pixels",
  matchLabel: "Best match",
  matchPercent: 98,
  matchUnit: "% match",
  matchName: "KAIKI Studio",
  matchMeta: "Front-End · Visuals · ★ 5.0",
  scores: [
    { label: "Visual Craft", value: 0.97, delay: 0.5 },
    { label: "Performance", value: 0.88, delay: 0.7 },
    { label: "Interactive", value: 0.95, delay: 0.9 },
  ],
};

// ── 2. EASING & PARK-MILLER PSEUDORANDOM GENERATOR ─────────────────────
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const eo = (t: number) => 1 - Math.pow(1 - t, 3);
const eio = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const back = (t: number) => {
  const c = 1.5;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};
const bump = (d: number, w: number) => Math.exp(-Math.pow(d / w, 2));

const N_LEN = 16384;
const NZ = new Float32Array(N_LEN);
{
  let s = 11;
  for (let i = 0; i < N_LEN; i++) {
    s = (s * 16807) % 2147483647;
    NZ[i] = s / 2147483647;
  }
}
const noise = (i: number) => NZ[((i % N_LEN) + N_LEN) % N_LEN];

// Pre-render a 128x128 repeating noise tile once to replace slow per-frame getImageData loops
function createNoisePattern(ctx: CanvasRenderingContext2D): CanvasPattern | null {
  if (typeof document === "undefined") return null;
  const tile = document.createElement("canvas");
  tile.width = 128;
  tile.height = 128;
  const tctx = tile.getContext("2d");
  if (!tctx) return null;
  const imgData = tctx.createImageData(128, 128);
  const data = imgData.data;
  for (let i = 0; i < 128 * 128; i++) {
    const n = noise(i);
    const v = (n * 255) | 0;
    const idx = i * 4;
    data[idx] = v;
    data[idx + 1] = v;
    data[idx + 2] = v;
    data[idx + 3] = ((n - 0.5) * 55 + 40) | 0;
  }
  tctx.putImageData(imgData, 0, 0);
  return ctx.createPattern(tile, "repeat");
}

// ── 3. DOT-MATRIX BACKGROUND RENDERER (Optimized single-pass) ──────────
function drawBackground(
  canvas: HTMLCanvasElement,
  ex: number,
  ey: number,
  noisePattern: CanvasPattern | null
) {
  const cw = STAGE + 2 * ex;
  const ch = STAGE + 2 * ey;
  canvas.width = cw;
  canvas.height = ch;
  const c = canvas.getContext("2d");
  if (!c) return;

  c.setTransform(1, 0, 0, 1, ex, ey);

  // Deep Obsidian / Navy Backdrop
  c.fillStyle = "#05070f";
  c.fillRect(-ex, -ey, cw, ch);

  // Radial Ambient Light Top
  const LIGHT = { x: 540, y: -120, stretch: 1.9, radius: 640 };
  c.save();
  c.translate(LIGHT.x, LIGHT.y);
  c.scale(LIGHT.stretch, 1);
  const g = c.createRadialGradient(0, 0, 0, 0, 0, LIGHT.radius);
  g.addColorStop(0, "#102a7a");
  g.addColorStop(0.5, "#091538");
  g.addColorStop(1, "rgba(5,7,15,0)");
  c.fillStyle = g;
  c.fillRect((-ex - LIGHT.x) / LIGHT.stretch, -ey - LIGHT.y, cw / LIGHT.stretch, ch);
  c.restore();

  // Dot Matrix Grid
  const pitch = 11;
  const start = 6;
  const size = 2.4;
  const reach = 700;
  const x0 = start - pitch * Math.ceil(ex / pitch);
  const y0 = start - pitch * Math.ceil(ey / pitch);
  for (let y = y0; y < STAGE + ey; y += pitch) {
    for (let x = x0; x < STAGE + ex; x += pitch) {
      const d = Math.hypot((x - LIGHT.x) / LIGHT.stretch, y - LIGHT.y);
      const k = Math.max(0, 1 - d / reach) * (0.85 + 0.15 * Math.sin(x * 0.004));
      const a = k * k * (0.75 + 0.35 * noise(y * 43 + x));
      if (a < 0.02) continue;
      c.fillStyle = `rgba(${(90 + 90 * k) | 0},${(150 + 70 * k) | 0},255,${a})`;
      c.fillRect(x - size / 2, y - size / 2, size, size);
    }
  }

  // Vignette Gradient
  const v = c.createLinearGradient(0, 0, 0, STAGE);
  v.addColorStop(0, "rgba(5,7,15,0)");
  v.addColorStop(0.55, "rgba(5,7,15,0.15)");
  v.addColorStop(1, "rgba(5,7,15,0.85)");
  c.fillStyle = v;
  c.fillRect(-ex, -ey, cw, ch);

  // Subtle film grain overlay on background
  if (noisePattern) {
    c.save();
    c.globalAlpha = 0.14;
    c.fillStyle = noisePattern;
    c.fillRect(-ex, -ey, cw, ch);
    c.restore();
  }
}

// ── 4. GPU-ACCELERATED GRAINY NEON GLOW LAYER ─────────────────────────
// Fast GPU glow rendering using native radial gradients (0ms stall, no shadowBlur / getImageData)
function drawGlows(
  c: CanvasRenderingContext2D,
  glows: { rect: Rect; a: number; rgb: string }[]
) {
  c.clearRect(0, 0, STAGE, STAGE);
  for (const { rect, a, rgb } of glows) {
    if (a <= 0.01) continue;
    const cx = rect.x + rect.w / 2;
    const cy = rect.y + rect.h / 2;
    const rad = Math.max(rect.w, rect.h) * 0.72;
    const grad = c.createRadialGradient(cx, cy, rad * 0.15, cx, cy, rad);
    grad.addColorStop(0, `rgba(${rgb},${Math.min(0.55, a * 0.65)})`);
    grad.addColorStop(0.6, `rgba(${rgb},${Math.min(0.22, a * 0.25)})`);
    grad.addColorStop(1, `rgba(${rgb},0)`);
    c.fillStyle = grad;
    c.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
  }
}

// ── 5. THE WHITE VECTOR CAT ENGINE ────────────────────────────────────
const FUR = "#f3f6ff";
const EYE = "#09122a";
const SIZE = 1.5;
const JUMP = 0.82;
const SQUASH = 0.42;
const CROUCH = 0.3;

interface CatState {
  x: number;
  y: number;
  pose: "sit" | "leap";
  tilt?: number;
  flip?: boolean;
  sx?: number;
  sy?: number;
  reach?: number;
  tap?: number;
}

function drawCatEyes(c: CanvasRenderingContext2D, blink: number) {
  c.fillStyle = EYE;
  c.beginPath();
  c.ellipse(4, -56, 2, 2.8 * blink, 0, 0, 7);
  c.fill();
  c.beginPath();
  c.ellipse(11.5, -56, 2, 2.8 * blink, 0, 0, 7);
  c.fill();
  c.fillStyle = FUR;
}

function sitting(c: CanvasRenderingContext2D, t: number, tap: number, blink: number) {
  const tl = Math.sin(t * 2.6) * 0.5;
  c.lineCap = "round";
  c.strokeStyle = FUR;
  c.lineWidth = 6;
  c.beginPath();
  c.moveTo(-11, -4);
  c.bezierCurveTo(-26, -2, -32, -14, -27 + tl * 4, -26 - tl * 3);
  c.stroke();
  c.beginPath();
  c.moveTo(-13, 0);
  c.bezierCurveTo(-18, -12, -17, -27, -9, -37);
  c.bezierCurveTo(-6, -41, -4, -44, -4, -48);
  c.bezierCurveTo(-7, -53, -7, -58, -5, -62);
  c.lineTo(-3, -73);
  c.lineTo(2, -65);
  c.bezierCurveTo(5, -66, 9, -66, 12, -65);
  c.lineTo(17, -73);
  c.lineTo(17, -62);
  c.bezierCurveTo(20, -57, 19, -50, 14, -47);
  c.bezierCurveTo(11, -45, 9, -44, 8, -42);
  c.bezierCurveTo(11, -33, 13, -20, 12, -6);
  c.lineTo(13, 0);
  c.closePath();
  c.fill();

  c.lineWidth = 5.5;
  c.beginPath();
  c.moveTo(7, -16);
  c.quadraticCurveTo(12 + tap * 4, -10 - tap * 10, 10 + tap * 8, -Math.sin(tap * Math.PI) * 14);
  c.stroke();
  drawCatEyes(c, blink);
}

function leaping(c: CanvasRenderingContext2D, reach: number) {
  const r = reach;
  c.lineCap = "round";
  c.lineJoin = "round";
  c.strokeStyle = FUR;
  c.lineWidth = 6;
  c.beginPath();
  c.moveTo(-24, -20);
  c.bezierCurveTo(-38, -22, -46, -30, -52, -38 + r * 10);
  c.stroke();

  c.beginPath();
  c.moveTo(-26, -20);
  c.bezierCurveTo(-22, -31, 4, -33, 18, -28);
  c.bezierCurveTo(26, -25, 26, -15, 16, -13);
  c.bezierCurveTo(4, -11, -16, -10, -24, -14);
  c.closePath();
  c.fill();

  c.lineWidth = 5.5;
  const fl = lerp(-0.2, 0.9, r);
  const bl = lerp(-0.9, 0.3, r);
  for (const [x, a] of [
    [14, fl],
    [9, fl - 0.25],
  ]) {
    c.beginPath();
    c.moveTo(x, -15);
    c.lineTo(x + Math.cos(a) * 16, -15 + Math.sin(a) * 16);
    c.stroke();
  }
  for (const [x, a] of [
    [-18, Math.PI - bl],
    [-22, Math.PI - bl + 0.25],
  ]) {
    c.beginPath();
    c.moveTo(x, -15);
    c.lineTo(x + Math.cos(a) * 16, -15 + Math.sin(a) * 16);
    c.stroke();
  }

  c.save();
  c.translate(26, -31);
  c.beginPath();
  c.arc(0, 0, 11, 0, 7);
  c.fill();
  c.beginPath();
  c.moveTo(-9, -4);
  c.lineTo(-6, -19);
  c.lineTo(-1, -9);
  c.closePath();
  c.fill();
  c.beginPath();
  c.moveTo(2, -10);
  c.lineTo(9, -19);
  c.lineTo(10, -3);
  c.closePath();
  c.fill();
  c.fillStyle = EYE;
  c.beginPath();
  c.ellipse(1, -1, 1.9, 2.6, 0, 0, 7);
  c.fill();
  c.beginPath();
  c.ellipse(7.5, -1, 1.9, 2.6, 0, 0, 7);
  c.fill();
  c.restore();
}

function drawCat(c: CanvasRenderingContext2D, s: CatState, t: number) {
  c.save();
  c.translate(s.x, s.y);
  c.rotate(s.tilt || 0);
  c.scale(SIZE, SIZE);
  if (s.flip) c.scale(-1, 1);
  c.scale(s.sx || 1, s.sy || 1);
  c.fillStyle = FUR;
  const blink = t % 3.3 < 0.11 ? 0.15 : 1;
  if (s.pose === "leap") leaping(c, s.reach || 0);
  else sitting(c, t, s.tap || 0, blink);
  c.restore();
}

const squash = (t: number, at: number) => {
  const l = seg(t, at, at + SQUASH);
  return Math.sin(l * Math.PI) * Math.exp(-l * 2.2);
};

const tapAt = (t: number, at: number) => {
  const tp = seg(t, at - 0.32, at + 0.18);
  return tp > 0 && tp < 1 ? tp : 0;
};

function leap(t: number, t0: number, from: Pt, to: Pt, peak: number): CatState {
  const flip = to[0] < from[0];
  if (t < t0) {
    const k = Math.sin(seg(t, t0 - CROUCH, t0) * Math.PI * 0.5);
    return { x: from[0], y: from[1], pose: "sit", sx: 1 + 0.1 * k, sy: 1 - 0.2 * k, flip };
  }
  const e = seg(t, t0, t0 + JUMP);
  if (e < 1) {
    const dir = Math.sign(to[0] - from[0]) || 1;
    const x = lerp(from[0], to[0], e);
    const y = lerp(from[1], to[1], e) - peak * 4 * e * (1 - e);
    const tilt = lerp(-0.42, 0.38, eio(e)) * dir;
    return { x, y, pose: "leap", reach: e, tilt, flip: dir < 0, sx: 1 + 0.06 * Math.sin(e * Math.PI), sy: 1 };
  }
  const sq = squash(t, t0 + JUMP);
  return { x: to[0], y: to[1], pose: "sit", sx: 1 + 0.18 * sq, sy: 1 - 0.24 * sq, flip };
}

function catAt(t: number, lift = 0): CatState | null {
  if (t < T.drop0) return null;
  if (t < T.land1) {
    const k = seg(t, T.drop0, T.land1);
    return { x: SEAT_PILL[0], y: lerp(-90 - lift, SEAT_PILL[1], k * k), pose: "leap", reach: 0.9, tilt: 0.5 };
  }
  if (t < T.jump1 - CROUCH) {
    const sq = squash(t, T.land1);
    return {
      x: SEAT_PILL[0],
      y: SEAT_PILL[1],
      pose: "sit",
      sx: 1 + 0.18 * sq,
      sy: 1 - 0.24 * sq,
      tap: tapAt(t, T.tap1),
    };
  }
  if (t < T.tap2 - 0.32) return leap(t, T.jump1, SEAT_PILL, SEAT_CRAWL, 165);
  if (t < T.jump2 - CROUCH) return { x: SEAT_CRAWL[0], y: SEAT_CRAWL[1], pose: "sit", tap: tapAt(t, T.tap2) };
  return leap(t, T.jump2, SEAT_CRAWL, SEAT_MATCH, 150);
}

// ── 6. MAIN REACT SECTION COMPONENT ──────────────────────────────────
export function CatWorkflowSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const glowCanvasRef = useRef<HTMLCanvasElement>(null);
  const catCanvasRef = useRef<HTMLCanvasElement>(null);

  const stepsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const pillElRef = useRef<HTMLDivElement>(null);
  const pillQueryRef = useRef<HTMLDivElement>(null);
  const pillTextRef = useRef<HTMLSpanElement>(null);
  const pillCaretRef = useRef<HTMLElement>(null);

  const crawlElRef = useRef<HTMLDivElement>(null);
  const crawlCountRef = useRef<HTMLSpanElement>(null);
  const crawlBarRef = useRef<HTMLElement>(null);

  const matchElRef = useRef<HTMLDivElement>(null);
  const matchPercentRef = useRef<HTMLElement>(null);
  const matchAvatarRef = useRef<HTMLDivElement>(null);
  const matchResultRef = useRef<HTMLDivElement>(null);
  const matchScoresRef = useRef<HTMLDivElement>(null);
  const matchFillsRef = useRef<(HTMLElement | null)[]>([]);
  const matchShineRef = useRef<HTMLDivElement>(null);

  const flowLinesRef = useRef<(SVGPathElement | null)[]>([]);
  const flowGlowsRef = useRef<(SVGPathElement | null)[]>([]);
  const flowDotsRef = useRef<(SVGCircleElement | null)[]>([]);
  const flowDotGlowsRef = useRef<(SVGCircleElement | null)[]>([]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    const bgCanvas = bgCanvasRef.current;
    const glowCanvas = glowCanvasRef.current;
    const catCanvas = catCanvasRef.current;
    if (!viewport || !stage || !bgCanvas || !glowCanvas || !catCanvas) return;

    const glowCtx = glowCanvas.getContext("2d");
    const catCtx = catCanvas.getContext("2d");
    if (!glowCtx || !catCtx) return;

    // Create noise pattern tile once
    const noisePattern = createNoisePattern(glowCtx);

    const flows = [0, 1].map((i) => {
      const line = flowLinesRef.current[i]!;
      const glow = flowGlowsRef.current[i]!;
      const dot = flowDotsRef.current[i]!;
      const dotGlow = flowDotGlowsRef.current[i]!;
      return { line, glow, dot, dotGlow, length: line.getTotalLength() };
    });

    let currentLift = 0;
    let currentTop = 0;
    let reach = "";

    const fit = () => {
      const vw = viewport.clientWidth;
      const vh = viewport.clientHeight;
      const s = Math.min(vw / STAGE, vh / STAGE);
      stage.style.transform = `scale(${s})`;
      const ex = Math.max(0, Math.ceil((vw / s - STAGE) / 2));
      const ey = Math.max(0, Math.ceil((vh / s - STAGE) / 2));
      if (`${ex},${ey}` === reach) return;
      reach = `${ex},${ey}`;

      drawBackground(bgCanvas, ex, ey, noisePattern);
      Object.assign(bgCanvas.style, {
        left: `${-ex}px`,
        top: `${-ey}px`,
        width: `${STAGE + 2 * ex}px`,
        height: `${STAGE + 2 * ey}px`,
      });

      currentLift = ey;
      currentTop = ey + CAT_ROOM;
      catCanvas.width = STAGE;
      catCanvas.height = STAGE + currentTop;
      catCanvas.style.top = `${-currentTop}px`;
      catCanvas.style.height = `${STAGE + currentTop}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(viewport);

    let isVisible = false;
    let t0: number | null = null;
    let raf = 0;

    const tick = (now: number) => {
      if (!isVisible) {
        raf = 0;
        return;
      }
      if (t0 === null) t0 = now;
      renderFrame(((now - t0) / 1000) % LOOP);
      raf = requestAnimationFrame(tick);
    };

    // Performance booster: Only render when the section is in the viewport!
    const io = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible && !raf) {
          raf = requestAnimationFrame(tick);
        } else if (!isVisible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.05 }
    );
    io.observe(viewport);

    const renderFrame = (t: number) => {
      const pillEl = pillElRef.current;
      const pillQuery = pillQueryRef.current;
      const pillText = pillTextRef.current;
      const pillCaret = pillCaretRef.current;
      const crawlEl = crawlElRef.current;
      const crawlCount = crawlCountRef.current;
      const crawlBar = crawlBarRef.current;
      const matchEl = matchElRef.current;
      const matchPercent = matchPercentRef.current;
      const matchAvatar = matchAvatarRef.current;
      const matchResult = matchResultRef.current;
      const matchScores = matchScoresRef.current;
      const matchShine = matchShineRef.current;

      if (!pillEl || !crawlEl || !matchEl) return;

      // Step 01: Pill
      const e1i = eo(seg(t, 0, 0.7));
      pillEl.style.opacity = String(e1i);
      const press1 = bump(t - T.tap1 - 0.08, 0.08);
      pillEl.style.transform = `translateY(${(1 - e1i) * 14}px) scale(${1 - press1 * 0.03})`;
      if (t < T.tap1) {
        const n = Math.floor(COPY.query.length * seg(t, T.type0, T.type1));
        if (pillQuery) pillQuery.dataset.state = "typing";
        if (pillText) pillText.textContent = COPY.query.slice(0, n);
        if (pillCaret) pillCaret.style.opacity = Math.floor(t * 2.4) % 2 ? "1" : "0";
      } else {
        if (pillQuery) pillQuery.dataset.state = "searching";
        if (pillText) pillText.textContent = COPY.searching;
      }

      // Step 02: Crawl Card
      const e2k = back(seg(t, T.e2in, T.e2in + 0.6));
      crawlEl.style.opacity = String(seg(t, T.e2in, T.e2in + 0.3));
      const hit2 = bump(t - T.land2 - 0.04, 0.09) * 0.7 + bump(t - T.tap2 - 0.06, 0.08);
      crawlEl.style.transform = `translateY(${(1 - e2k) * 12}px) scale(${
        lerp(0.94, 1, e2k) * (1 - hit2 * 0.025)
      })`;
      const cp = eo(seg(t, T.tap2, T.end - 0.6));
      if (crawlCount) crawlCount.textContent = Math.round(cp * COPY.crawlPages).toLocaleString("en-US");
      if (crawlBar) crawlBar.style.width = cp * 100 + "%";

      // Step 03: Match Card
      const e3k = back(seg(t, T.e3in, T.e3in + 0.6));
      matchEl.style.opacity = String(seg(t, T.e3in, T.e3in + 0.3));
      const hit3 = bump(t - T.land3 - 0.04, 0.1);
      matchEl.style.transform = `translateY(${(1 - e3k) * 12}px) scale(${
        lerp(0.94, 1, e3k) * (1 - hit3 * 0.02)
      })`;
      [matchResult, matchScores].forEach((el, i) => {
        if (!el) return;
        const k = eo(seg(t, T.land3 + 0.2 + i * 0.18, T.land3 + 0.75 + i * 0.18));
        el.style.opacity = String(k);
        el.style.transform = `translateY(${(1 - k) * 8}px)`;
      });
      if (matchPercent) {
        matchPercent.textContent = String(
          Math.round(COPY.matchPercent * eo(seg(t, T.land3 + 0.15, T.land3 + 1.6)))
        );
      }
      COPY.scores.forEach(({ value, delay }, i) => {
        const bar = matchFillsRef.current[i];
        if (bar) bar.style.width = value * 100 * eio(seg(t, T.land3 + delay, T.land3 + delay + 0.9)) + "%";
      });
      if (matchShine) {
        matchShine.style.transform = `translateX(${lerp(
          -120,
          320,
          eio(seg(t, T.land3 + 1.3, T.land3 + 2.3))
        )}%)`;
      }
      if (matchAvatar) {
        matchAvatar.style.transform = `scale(${1 + 0.06 * bump(t - T.land3 - 0.5, 0.15)})`;
      }

      // Step Captions
      const marks = [0, T.land2, T.land3];
      const cur = t < T.land2 ? 0 : t < T.land3 ? 1 : 2;
      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        const k = i === cur ? eo(seg(t, marks[i], marks[i] + 0.45)) : 0;
        el.style.opacity = String(i === 0 && t < 0.45 ? seg(t, 0, 0.45) : k);
        el.style.transform = `translateY(${(1 - k) * 6}px)`;
      });

      // Flow Lines & Sparks
      [eio(seg(t, T.c1, T.c1 + 0.6)), eio(seg(t, T.c2, T.c2 + 0.6))].forEach((d, i) => {
        const f = flows[i];
        if (!f) return;
        for (const p of [f.line, f.glow]) {
          if (!p) continue;
          p.style.strokeDasharray = String(f.length);
          p.style.strokeDashoffset = String(f.length * (1 - d));
        }
        const live = d > 0 && d < 1;
        const pt = f.line.getPointAtLength(f.length * d);
        for (const c of [f.dot, f.dotGlow]) {
          if (!c) continue;
          c.setAttribute("cx", String(pt.x));
          c.setAttribute("cy", String(pt.y));
          c.style.opacity = live ? "1" : "0";
        }
      });

      // Grainy Cobalt/Cyan Card Glows (Zero lag GPU path)
      drawGlows(glowCtx, [
        {
          rect: PILL,
          a: 0.55 * e1i + 0.4 * press1 + 0.06 * Math.sin(t * 2.2),
          rgb: "0,102,255",
        },
        {
          rect: CRAWL,
          a: 0.42 * seg(t, T.e2in, T.e2in + 0.6) + 0.45 * hit2 + 0.15 * seg(t, T.land2, T.land2 + 0.4),
          rgb: "56,189,248",
        },
        {
          rect: MATCH,
          a: 0.42 * seg(t, T.e3in, T.e3in + 0.6) + 0.5 * hit3 + 0.2 * seg(t, T.land3, T.land3 + 0.5),
          rgb: "37,99,235",
        },
      ]);

      // Cat Layer (Ultra-fast direct render with cyan neon halo)
      catCtx.clearRect(0, 0, STAGE, STAGE + currentTop);
      const s = catAt(t, currentLift);
      if (s) {
        catCtx.save();
        catCtx.setTransform(1, 0, 0, 1, 0, currentTop);
        drawCat(catCtx, s, t);

        if (noisePattern) {
          catCtx.save();
          catCtx.globalCompositeOperation = "source-atop";
          catCtx.globalAlpha = 0.2;
          catCtx.fillStyle = noisePattern;
          catCtx.fillRect(s.x - CAT_REACH, s.y - CAT_REACH, CAT_REACH * 2, CAT_REACH * 2);
          catCtx.restore();
        }
        catCtx.restore();
      }
    };

    // Render initial static frame at mount
    renderFrame(0);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const glassStyle =
    "absolute overflow-hidden z-[4] bg-[linear-gradient(180deg,rgba(24,38,75,0.92),rgba(13,20,38,0.95)_60%,rgba(9,13,26,0.98))] shadow-[inset_0_0_0_1px_rgba(147,197,253,0.3),inset_0_1px_0_rgba(224,242,254,0.48),0_20px_45px_rgba(0,0,0,0.6)] will-change-transform";

  return (
    <section
      ref={viewportRef}
      className="relative w-full h-screen min-h-[680px] overflow-hidden bg-[#05070f] text-[#f1f5ff] select-none border-t border-white/10"
    >
      <div
        ref={stageRef}
        className="absolute left-1/2 top-1/2 w-[1080px] h-[1080px] -ml-[540px] -mt-[540px]"
      >
        <canvas ref={bgCanvasRef} className="absolute left-0 top-0 w-[1080px] h-[1080px]" />
        <canvas
          ref={glowCanvasRef}
          width={STAGE}
          height={STAGE}
          className="absolute left-0 top-0 w-[1080px] h-[1080px]"
        />

        {/* Flow Lines SVG */}
        <svg className="absolute left-0 top-0 w-[1080px] h-[1080px]" viewBox="0 0 1080 1080" fill="none">
          <defs>
            <filter id="cat-flow-blur" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>
          <g filter="url(#cat-flow-blur)" opacity=".8">
            {[FLOW_1, FLOW_2].map((d, i) => (
              <path
                key={`g-${i}`}
                d={d}
                stroke="#0066ff"
                strokeWidth="6"
                ref={(el) => {
                  flowGlowsRef.current[i] = el;
                }}
              />
            ))}
          </g>
          {[FLOW_1, FLOW_2].map((d, i) => (
            <path
              key={`l-${i}`}
              d={d}
              stroke="#bae6fd"
              strokeWidth="1.8"
              strokeLinecap="round"
              ref={(el) => {
                flowLinesRef.current[i] = el;
              }}
            />
          ))}
          {[0, 1].map((i) => (
            <React.Fragment key={`sp-${i}`}>
              <circle
                r="14"
                fill="rgba(56,189,248,0.38)"
                ref={(el) => {
                  flowDotGlowsRef.current[i] = el;
                }}
              />
              <circle
                r="3.5"
                fill="#ffffff"
                ref={(el) => {
                  flowDotsRef.current[i] = el;
                }}
              />
            </React.Fragment>
          ))}
        </svg>

        {/* Heading */}
        <div className="absolute inset-x-0 top-[70px] text-center z-[5]">
          <h2 className="font-sans font-medium text-[30px] tracking-[-0.035em] text-[#efedff]">
            {COPY.lead}{" "}
            <em className="font-brier italic font-normal text-[34px] tracking-[-0.01em] text-[#60a5fa]">
              {COPY.accent}
            </em>
          </h2>
          <p className="relative h-[24px] mt-[9px] text-[16px] tracking-[-0.01em] text-[#93c5fd]/60">
            {COPY.steps.map((s, i) => (
              <span
                key={s}
                ref={(el) => {
                  stepsRef.current[i] = el;
                }}
                className="absolute inset-x-0"
              >
                {s}
              </span>
            ))}
          </p>
        </div>

        {/* Step 01: Lit Search Pill */}
        <div
          ref={pillElRef}
          style={{ left: PILL.x, top: PILL.y, width: PILL.w, height: PILL.h, borderRadius: PILL.r }}
          className="absolute z-[4] flex items-center gap-[16px] px-[30px] pl-[34px] bg-[linear-gradient(180deg,rgba(37,99,235,0.92),rgba(0,85,255,0.92))] shadow-[inset_0_0_0_1px_rgba(191,219,254,0.6),inset_0_2px_0_rgba(255,255,255,0.6),inset_0_-12px_24px_rgba(10,25,90,0.4),0_20px_50px_rgba(0,40,140,0.55)] will-change-transform"
        >
          <svg
            className="w-[28px] h-[28px] shrink-0"
            viewBox="0 0 28 28"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="7.5" />
            <path d="M17.8 17.8L24 24" />
          </svg>
          <div
            ref={pillQueryRef}
            data-state="typing"
            className="flex-1 text-[27px] font-medium tracking-[-0.03em] whitespace-nowrap text-white data-[state=searching]:font-brier data-[state=searching]:italic data-[state=searching]:text-[33px] data-[state=searching]:tracking-normal"
          >
            <span ref={pillTextRef} />
            <i
              ref={pillCaretRef}
              className="inline-block w-[2px] h-[28px] bg-white align-[-5px] ml-[3px] [[data-state=searching]_&]:hidden"
            />
          </div>
          <svg
            className="w-[26px] h-[26px] shrink-0 opacity-90"
            viewBox="0 0 26 26"
            fill="none"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinejoin="round"
          >
            <path d="M4 4l19 9-19 9 4-9z" />
            <path d="M8 13h15" />
          </svg>
        </div>

        {/* Step 02: Crawl Card */}
        <div
          ref={crawlElRef}
          style={{ left: CRAWL.x, top: CRAWL.y, width: CRAWL.w, height: CRAWL.h, borderRadius: CRAWL.r }}
          className={`${glassStyle} p-[24px_28px]`}
        >
          <div className="text-[16px] text-[#dbeafe]/75">{COPY.crawlLabel}</div>
          <div className="text-[36px] font-medium tracking-[-0.045em] mt-[6px] tabular-nums text-white">
            <span ref={crawlCountRef} />
            <small className="text-[16px] font-normal text-[#dbeafe]/60 ml-[8px] tracking-normal">
              {COPY.crawlUnit}
            </small>
          </div>
          <div className="h-[3px] rounded-[2px] bg-white/10 mt-[12px] overflow-hidden">
            <i
              ref={crawlBarRef}
              className="block h-full w-0 bg-[linear-gradient(90deg,#38bdf8,#e0f2fe)]"
            />
          </div>
        </div>

        {/* Step 03: Match Card */}
        <div
          ref={matchElRef}
          style={{ left: MATCH.x, top: MATCH.y, width: MATCH.w, height: MATCH.h, borderRadius: MATCH.r }}
          className={`${glassStyle} p-[24px_28px]`}
        >
          <div className="flex justify-between items-baseline">
            <span className="text-[13px] tracking-[0.16em] uppercase text-[#dbeafe]/60">
              {COPY.matchLabel}
            </span>
            <span className="text-[14px] text-[#dbeafe]/60">
              <b ref={matchPercentRef} className="font-medium text-white text-[15px] tabular-nums" />
              {COPY.matchUnit}
            </span>
          </div>

          <div ref={matchResultRef} className="mt-[10px] flex items-center gap-[14px]">
            <div
              ref={matchAvatarRef}
              className="w-[48px] h-[48px] rounded-[14px] bg-[linear-gradient(135deg,#38bdf8,#0055FF)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] grid place-items-center"
            >
              <span className="font-display text-lg font-black text-white">RW</span>
            </div>
            <div>
              <b className="block text-[24px] font-medium tracking-[-0.035em] text-white">
                {COPY.matchName}
              </b>
              <span className="block text-[15px] text-[#dbeafe]/65 mt-[3px]">
                {COPY.matchMeta}
              </span>
            </div>
          </div>

          <div ref={matchScoresRef} className="mt-[16px] grid grid-cols-3 gap-[14px]">
            {COPY.scores.map((s, i) => (
              <div key={s.label}>
                <span className="block text-[12px] text-[#dbeafe]/55 mb-[6px]">
                  {s.label}
                </span>
                <i className="block h-[4px] rounded-[2px] bg-[#dbeafe]/15 overflow-hidden">
                  <b
                    ref={(el) => {
                      matchFillsRef.current[i] = el;
                    }}
                    className="block h-full w-0 rounded-[2px] bg-[linear-gradient(90deg,#38bdf8,#e0f2fe)]"
                  />
                </i>
              </div>
            ))}
          </div>

          <div
            ref={matchShineRef}
            className="absolute inset-y-0 left-0 w-[40%] z-[3] pointer-events-none bg-[linear-gradient(100deg,transparent,rgba(224,242,254,0.18),transparent)] -translate-x-[120%]"
          />
        </div>

        {/* Cat Canvas Layer */}
        <canvas ref={catCanvasRef} className="absolute left-0 top-0 w-[1080px] h-[1080px] pointer-events-none" />
      </div>
    </section>
  );
}

