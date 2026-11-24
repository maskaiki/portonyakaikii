"use client";

/**
 * AtmosphericPreloader
 * Fullscreen intro for the home route: WebGL2 volumetric cumulus, a rain
 * layer that mirrors RainSimulationCanvas parameter for parameter, and an
 * editorial wordmark. Self-contained on purpose: the home rain engine is not
 * modified, the hand-off simply wakes its loop the same way a first input does.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

/* ══════════════════════════════════════════════════════════════════
   Session gate
   ══════════════════════════════════════════════════════════════════ */
const ATMO_ATTR = "data-atmo";
const ATMO_STORAGE_KEY = "kaiki:intro";
const FORCE_INTRO = /[?&]intro=1(?:&|$)/;

/** Fired when the hand-off starts and once the preloader has fully unmounted. */
export const ATMO_HANDOFF_EVENT = "kaiki:atmo-handoff";
export const ATMO_DONE_EVENT = "kaiki:atmo-done";

/**
 * Runs synchronously while the HTML is parsed (hard navigations), so a
 * returning visitor never sees the overlay and a first visit never sees the
 * page underneath. It writes to its parent: the overlay root.
 */
const BOOT_SCRIPT = `(function(){try{var el=document.currentScript&&document.currentScript.parentElement;if(!el)return;var f=${FORCE_INTRO}.test(location.search);if(!f&&sessionStorage.getItem("${ATMO_STORAGE_KEY}")==="seen"){el.setAttribute("${ATMO_ATTR}","skip");return}sessionStorage.setItem("${ATMO_STORAGE_KEY}","playing");el.setAttribute("${ATMO_ATTR}","play");if("scrollRestoration" in history)history.scrollRestoration="manual"}catch(e){}})()`;

/** Hidden by default (no JS, returning visitors); scroll locked only while playing. */
const GATE_CSS = `.atmo-preloader{display:none}.atmo-preloader[${ATMO_ATTR}="play"],.atmo-preloader[${ATMO_ATTR}="release"]{display:block}html:has(.atmo-preloader[${ATMO_ATTR}="play"]){overflow:hidden!important;scrollbar-gutter:stable;background:#f4f4ed!important}`;

/** Same rule as BOOT_SCRIPT, for soft navigations where the script does not run. */
function readIntroMode(root: HTMLElement | null): "play" | "skip" {
  try {
    const attr = root?.getAttribute(ATMO_ATTR);
    if (attr === "play" || attr === "release") return "play";
    if (attr === "skip") return "skip";
    if (FORCE_INTRO.test(window.location.search)) return "play";
    return window.sessionStorage.getItem(ATMO_STORAGE_KEY) === "seen" ? "skip" : "play";
  } catch {
    return "skip";
  }
}

/** Server renders an executable script, the client keeps it inert (Next.js docs pattern). */
function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════
   Hero surface (mirrors components/home/Hero.tsx)
   ══════════════════════════════════════════════════════════════════ */
const HERO_BACKGROUND = "#f4f4ed";
const HERO_BACKGROUND_IMAGE =
  "url('/assets/shared/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg')";
const HERO_LIGHTING =
  "radial-gradient(ellipse 48% 52% at 50% 62%, rgba(0, 85, 255, 0.08) 0%, rgba(56, 189, 248, 0.04) 45%, transparent 74%), radial-gradient(circle at 80% 16%, rgba(255, 255, 255, 0.92) 0%, transparent 52%)";
const HERO_PORTRAIT_SRC = "/assets/hero/kaiki-portrait-young.webp";

/* ══════════════════════════════════════════════════════════════════
   Rain primitives, copied 1:1 from components/home/RainSimulationCanvas.tsx
   (preset LEVEL 92 / VELOCITY 89 / SCALE 100, slant sin -0.481).
   ══════════════════════════════════════════════════════════════════ */
const HOME_RAIN_PRESET = { intensity: 92, speed: 89, size: 100 } as const;
const RAIN_BASE_ANGLE_SIN = -0.481;
const RAIN_BASE_ANGLE_COS = Math.sqrt(1 - RAIN_BASE_ANGLE_SIN * RAIN_BASE_ANGLE_SIN);

interface RainDrop {
  x: number;
  y: number;
  speed: number;
  len: number;
  width: number;
  opacity: number;
  layer: number;
  angleSin: number;
  angleCos: number;
  active: boolean;
}

interface RainSplash {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
  color: string;
  active: boolean;
}

interface RainBead {
  x: number;
  y: number;
  slideSpeed: number;
  life: number;
  maxLife: number;
  radius: number;
  opacity: number;
  active: boolean;
}

interface RainRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  active: boolean;
}

interface RainMetrics {
  targetActiveDrops: number;
  baseVelocity: number;
  baseLength: number;
  baseThickness: number;
}

function rainPoolSizes(viewportWidth: number) {
  const isMobile = viewportWidth < 768;
  return {
    drops: isMobile ? 160 : 320,
    splashes: isMobile ? 120 : 280,
    beads: isMobile ? 60 : 140,
    rings: 60,
  };
}

function rainMetrics(intensity: number, speed: number, size: number, maxDrops: number): RainMetrics {
  const normalizedIntensity = intensity / 100;
  const normalizedSpeed = speed / 100;
  const normalizedSize = size / 100;
  return {
    targetActiveDrops: Math.floor(normalizedIntensity * maxDrops),
    baseVelocity: 680 + normalizedSpeed * 1150,
    baseLength: 28 + normalizedSize * 48 + normalizedSpeed * 22,
    baseThickness: 1.8 + normalizedSize * 3.0,
  };
}

const createDropPool = (count: number): RainDrop[] =>
  Array.from({ length: count }, () => ({
    x: 0,
    y: 0,
    speed: 1,
    len: 1,
    width: 1,
    opacity: 0.4,
    layer: 1,
    angleSin: RAIN_BASE_ANGLE_SIN,
    angleCos: RAIN_BASE_ANGLE_COS,
    active: false,
  }));

const createSplashPool = (count: number): RainSplash[] =>
  Array.from({ length: count }, () => ({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    life: 0,
    maxLife: 1,
    size: 1,
    opacity: 1,
    color: "rgba(0, 210, 255, 0.85)",
    active: false,
  }));

const createBeadPool = (count: number): RainBead[] =>
  Array.from({ length: count }, () => ({
    x: 0,
    y: 0,
    slideSpeed: 0,
    life: 0,
    maxLife: 1,
    radius: 1,
    opacity: 1,
    active: false,
  }));

const createRingPool = (count: number): RainRing[] =>
  Array.from({ length: count }, () => ({
    x: 0,
    y: 0,
    radius: 0,
    maxRadius: 10,
    opacity: 1,
    active: false,
  }));

/** Depth layer, wind jitter, speed, length, thickness, opacity. Returns the layer scale. */
function assignDropTraits(drop: RainDrop, metrics: RainMetrics): number {
  const randLayer = Math.random();
  drop.layer = randLayer < 0.25 ? 0 : randLayer < 0.82 ? 1 : 2;
  const layerScale = drop.layer === 0 ? 0.65 : drop.layer === 1 ? 1.0 : 1.45;
  const individualVariation = 0.75 + Math.random() * 0.5;
  const windAngle = RAIN_BASE_ANGLE_SIN + (Math.random() - 0.5) * 0.07;
  drop.angleSin = windAngle;
  drop.angleCos = Math.sqrt(1 - windAngle * windAngle);
  drop.speed = metrics.baseVelocity * layerScale * individualVariation;
  drop.len = metrics.baseLength * layerScale * individualVariation;
  drop.width = metrics.baseThickness * layerScale * individualVariation;
  drop.opacity =
    drop.layer === 0
      ? 0.25 + Math.random() * 0.2
      : drop.layer === 1
      ? 0.5 + Math.random() * 0.35
      : 0.7 + Math.random() * 0.3;
  return layerScale;
}

function drawRainDrop(ctx: CanvasRenderingContext2D, d: RainDrop) {
  const headX = d.x;
  const headY = d.y;
  const tailX = d.x - d.angleSin * d.len;
  const tailY = d.y - d.angleCos * d.len;

  const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
  grad.addColorStop(0, "rgba(0, 210, 255, 0)");
  grad.addColorStop(0.5, `rgba(56, 189, 248, ${d.opacity * 0.4})`);
  grad.addColorStop(0.88, `rgba(0, 210, 255, ${d.opacity * 0.9})`);
  grad.addColorStop(1, `rgba(17, 17, 18, ${d.opacity * 0.95})`);

  ctx.strokeStyle = grad;
  ctx.lineWidth = d.width;
  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.lineTo(headX, headY);
  ctx.stroke();

  if (d.width > 2.0) {
    ctx.fillStyle = `rgba(0, 210, 255, ${d.opacity * 0.85})`;
    ctx.beginPath();
    ctx.arc(headX, headY, d.width * 0.7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(230, 250, 255, ${d.opacity * 0.95})`;
    ctx.beginPath();
    ctx.arc(headX - d.width * 0.2, headY - d.width * 0.2, d.width * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
}

function emitImpactSplash(
  s: RainSplash,
  x: number,
  y: number,
  normX: number,
  normY: number,
  dropWidth: number,
  dropSpeedScale: number
) {
  const tanX = -normY;
  const tanY = normX;
  const spread = (Math.random() - 0.5) * 4.2;
  const bounce = (Math.random() * 2.6 + 1.2) * dropSpeedScale;
  s.x = x + normX * 2;
  s.y = y + normY * 2;
  s.vx = normX * bounce + tanX * spread - 0.6;
  s.vy = normY * bounce + tanY * spread - 1.4;
  s.life = 0;
  s.maxLife = Math.random() * 24 + 14;
  s.size = (Math.random() * 1.8 + 1.2) * (dropWidth / 2);
  s.opacity = 0.75 + Math.random() * 0.25;
  s.color = Math.random() < 0.6 ? "rgba(0, 210, 255, 0.9)" : "rgba(225, 245, 255, 0.95)";
  s.active = true;
}

function emitBead(b: RainBead, x: number, y: number) {
  b.x = x + (Math.random() - 0.5) * 6;
  b.y = y + (Math.random() - 0.5) * 4;
  b.slideSpeed = Math.random() * 18 + 8;
  b.life = 0;
  b.maxLife = Math.random() * 45 + 30;
  b.radius = Math.random() * 2.2 + 1.4;
  b.opacity = 0.85;
  b.active = true;
}

function emitRing(r: RainRing, x: number, y: number) {
  r.x = x;
  r.y = y;
  r.radius = 2;
  r.maxRadius = Math.random() * 14 + 8;
  r.opacity = 0.7;
  r.active = true;
}

function stepDrawSplash(ctx: CanvasRenderingContext2D, s: RainSplash, dt: number) {
  s.life += dt * 60;
  if (s.life >= s.maxLife) {
    s.active = false;
    return;
  }
  s.x += s.vx;
  s.y += s.vy;
  s.vy += 0.36;
  const progress = s.life / s.maxLife;
  const alpha = Math.max(0, (1 - progress) * s.opacity);
  const currentSize = s.size * (1 - progress * 0.4);
  ctx.fillStyle = s.color.replace(/[\d.]+\)$/, `${alpha})`);
  ctx.beginPath();
  ctx.arc(s.x, s.y, currentSize, 0, Math.PI * 2);
  ctx.fill();
}

function stepDrawBead(ctx: CanvasRenderingContext2D, b: RainBead, dt: number) {
  b.life += dt * 60;
  if (b.life >= b.maxLife) {
    b.active = false;
    return;
  }
  b.y += b.slideSpeed * dt;
  b.x += (Math.random() - 0.5) * 0.2;
  const progress = b.life / b.maxLife;
  const alpha = Math.max(0, (1 - progress) * b.opacity);
  ctx.fillStyle = `rgba(0, 210, 255, ${alpha * 0.6})`;
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
  ctx.beginPath();
  ctx.arc(b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.4, 0, Math.PI * 2);
  ctx.fill();
}

function stepDrawRing(ctx: CanvasRenderingContext2D, r: RainRing, dt: number) {
  r.radius += (r.maxRadius - r.radius) * 0.2;
  r.opacity -= dt * 3.5;
  if (r.opacity <= 0.05 || r.radius >= r.maxRadius - 0.5) {
    r.active = false;
    return;
  }
  ctx.strokeStyle = `rgba(0, 210, 255, ${r.opacity * 0.7})`;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
  ctx.stroke();
}

/* ══════════════════════════════════════════════════════════════════
   Timeline (seconds). One master clock drives every layer.
   ══════════════════════════════════════════════════════════════════ */
const TL = {
  revealStart: 0.18,
  revealStagger: 0.03,
  revealDur: 0.55,
  entryEnd: 1.1,
  condenseStart: 1.05,
  condensePeak: 1.5,
  rainStart: 1.4,
  rainRamp: 0.3,
  dropletStart: 1.46,
  dropletDetach: 1.6,
  dropletEnd: 1.84,
  hold: 1.62,
  textExitStart: 1.8,
  textExitStagger: 0.012,
  textExitDur: 0.32,
  handoff: 1.86,
  partStart: 1.9,
  partEnd: 2.7,
  bgFadeStart: 2.05,
  bgFadeEnd: 2.55,
  release: 2.3,
  drainCap: 3.25,
} as const;

/** Longest we wait at the condensation hold for fonts + hero image. */
const MAX_HOLD = 2.4;

/**
 * Wall-clock failsafe. The timeline clock is frame-capped, so a very slow GPU
 * would stretch the intro (and the scroll lock) far beyond ~2.7s. Past this
 * point the cloud is dropped and the exit runs in real time.
 */
const MAX_WALL_MS = 6500;

const WORDMARK = "heyitskaiki.my.id";
const ACCENT_INDEX = 11; // the first "." becomes the electric accent dot
const LETTER_HIDDEN_EM = 1.75;
const LETTER_EXIT_EM = 1.35;
const INITIAL_LETTER_TRANSFORM = `translate3d(0em, ${LETTER_HIDDEN_EM}em, 0)`;

/* Cloud camera + composition */
const CAM_Z_REST = 5.6;
const CAM_Z_FAR = 18;
const CLOUD_HALF_EXTENT = 2.0;
const CLOUD_BASE_Y = -0.6;

/** Cumulus puffs [x, y, z, radius]. Shared by the WebGL shader and the 2D fallback. */
const CLOUD_PUFFS: ReadonlyArray<readonly [number, number, number, number]> = [
  [0.0, 0.08, 0.0, 0.92],
  [-0.92, -0.2, 0.12, 0.66],
  [0.98, -0.24, -0.06, 0.62],
  [0.4, 0.58, 0.06, 0.6],
  [-0.42, 0.48, -0.12, 0.54],
  [-1.62, -0.4, 0.0, 0.4],
  [1.66, -0.42, 0.04, 0.38],
];

/* ── Math helpers ─────────────────────────────────────────────── */
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const smoothstep = (e0: number, e1: number, x: number) => {
  const k = clamp01((x - e0) / (e1 - e0));
  return k * k * (3 - 2 * k);
};
const easeOutCubic = (k: number) => 1 - Math.pow(1 - k, 3);
const easeInCubic = (k: number) => k * k * k;
const easeOutExpo = (k: number) => (k >= 1 ? 1 : 1 - Math.pow(2, -10 * k));
const easeInOutCubic = (k: number) =>
  k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;

/* ══════════════════════════════════════════════════════════════════
   Cloud state per frame
   ══════════════════════════════════════════════════════════════════ */
interface CloudFrame {
  time: number;
  camZ: number;
  focal: number;
  yShift: number;
  sharp: number;
  opacity: number;
  condense: number;
  glow: number;
  split: number;
  lift: number;
  fade: number;
  mouseX: number;
  mouseY: number;
}

function cloudFocal(aspect: number) {
  const coverage = aspect < 1 ? 0.88 : aspect < 1.4 ? 0.6 : 0.44;
  return Math.min((0.5 * aspect * coverage * CAM_Z_REST) / CLOUD_HALF_EXTENT, 1.08);
}

function cloudYShift(aspect: number) {
  return aspect < 1 ? 0.17 : 0.2;
}

function computeCloudFrame(
  t: number,
  time: number,
  aspect: number,
  mouseX: number,
  mouseY: number
): CloudFrame {
  const entry = easeOutCubic(clamp01(t / TL.entryEnd));
  const partRaw = clamp01((t - TL.partStart) / (TL.partEnd - TL.partStart));
  const split = easeInOutCubic(partRaw);
  const condense =
    smoothstep(TL.condenseStart, TL.condensePeak, t) *
    (1 - smoothstep(TL.partStart, TL.partStart + 0.45, t));
  const pulse = 0.5 + 0.5 * Math.sin(time * 9.0);
  return {
    time,
    camZ: lerp(CAM_Z_FAR, CAM_Z_REST, entry),
    focal: cloudFocal(aspect),
    yShift: cloudYShift(aspect),
    sharp: smoothstep(0.1, 1.05, t),
    opacity: smoothstep(0, 0.5, t) * (1 - smoothstep(0.55, 1, partRaw)),
    condense,
    glow: 0.16 + condense * (0.62 + 0.3 * pulse),
    split,
    lift: Math.pow(split, 1.35) * 2.5,
    fade: smoothstep(0.25, 1, partRaw),
    mouseX,
    mouseY,
  };
}

/** Screen-space footprint of the cloud base, where rain is released. */
function cloudBaseOnScreen(f: CloudFrame, w: number, h: number) {
  const k = (f.focal / f.camZ) * h;
  const y = h * 0.5 - f.yShift * h - (CLOUD_BASE_Y + f.lift) * k;
  return { x: w * 0.5, y, halfW: 1.45 * k };
}

interface CloudRenderer {
  resize(cssW: number, cssH: number): void;
  render(f: CloudFrame): void;
  degrade(): void;
  destroy(): void;
}

/* ══════════════════════════════════════════════════════════════════
   LAYER 1a: WebGL2 raymarched volumetric cumulus (0 dependencies)
   ══════════════════════════════════════════════════════════════════ */
const num = (v: number) => v.toFixed(3);

const CLOUD_VERT = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const CLOUD_FRAG = `#version 300 es
precision highp float;
precision mediump sampler3D;

uniform vec2 uRes;
uniform float uTime;
uniform float uCamZ;
uniform float uFocal;
uniform float uYShift;
uniform float uSharp;
uniform float uOpacity;
uniform float uCondense;
uniform float uGlow;
uniform float uSplit;
uniform float uLift;
uniform float uFade;
uniform vec2 uMouse;
uniform sampler3D uNoise;

out vec4 outColor;

float noise3(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return texture(uNoise, (i + f + 0.5) / 32.0).r;
}

const mat3 ROT = mat3(0.00, 0.80, 0.60, -0.80, 0.36, -0.48, -0.60, -0.48, 0.64);

float fbm(vec3 p, int oct) {
  float sum = 0.0;
  float amp = 0.5;
  float norm = 0.0;
  for (int i = 0; i < 5; i++) {
    if (i >= oct) break;
    float a = i >= 2 ? amp * uSharp : amp;
    sum += a * noise3(p);
    norm += a;
    p = ROT * p * 2.03;
    amp *= 0.5;
  }
  return sum / max(norm, 1e-3);
}

float sdSphere(vec3 p, vec3 c, float r) { return length(p - c) - r; }

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float cumulus(vec3 p) {
${CLOUD_PUFFS.map(([x, y, z, r], i) =>
  i === 0
    ? `  float d = sdSphere(p, vec3(${num(x)}, ${num(y)}, ${num(z)}), ${num(r)});`
    : `  d = smin(d, sdSphere(p, vec3(${num(x)}, ${num(y)}, ${num(z)}), ${num(r)}), 0.40);`
).join("\n")}
  return max(d, ${num(CLOUD_BASE_Y)} - p.y);
}

float localDensity(vec3 q, int oct) {
  float s = cumulus(q);
  if (s > 0.42) return 0.0;
  vec3 drift = vec3(uTime * 0.05, -uTime * 0.012, uTime * 0.03);
  float n = fbm(q * 1.65 + drift, oct);
  float d = -s * 2.1 + (n - 0.52) * 1.5;
  d -= uFade * (0.55 + 0.4 * n);
  d *= mix(0.6, 1.0, uSharp) * (1.0 + uCondense * 0.55);
  return clamp(d, 0.0, 2.0);
}

float density(vec3 p, int oct) {
  p.y -= uLift;
  if (uSplit < 0.001) return localDensity(p, oct);
  float soft = clamp(uSplit * 5.0, 0.0, 1.0);
  vec3 qR = p - vec3(uSplit * 1.55, uSplit * 0.42, 0.0);
  float cR = qR.x + 0.38 * qR.y + (noise3(qR * 1.4 + 11.0) - 0.5) * 0.55;
  if (cR > 0.0) return localDensity(qR, oct) * mix(1.0, smoothstep(0.0, 0.18, cR), soft);
  vec3 qL = p - vec3(-uSplit * 1.55, uSplit * 0.18, 0.0);
  float cL = qL.x + 0.38 * qL.y + (noise3(qL * 1.4 + 11.0) - 0.5) * 0.55;
  if (cL <= 0.0) return localDensity(qL, oct) * mix(1.0, 1.0 - smoothstep(-0.18, 0.0, cL), soft);
  return 0.0;
}

float ign(vec2 p) {
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

bool hitBox(vec3 ro, vec3 rd, vec3 bmin, vec3 bmax, out float t0, out float t1) {
  vec3 inv = 1.0 / rd;
  vec3 a = (bmin - ro) * inv;
  vec3 b = (bmax - ro) * inv;
  vec3 lo = min(a, b);
  vec3 hi = max(a, b);
  t0 = max(max(lo.x, lo.y), lo.z);
  t1 = min(min(hi.x, hi.y), hi.z);
  return t1 > max(t0, 0.0);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  uv.y -= uYShift;

  vec3 ro = vec3(uMouse.x * 0.55, uMouse.y * 0.3 + 0.05, uCamZ);
  vec3 fw = normalize(-ro);
  vec3 rt = normalize(cross(fw, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(rt, fw);
  vec3 rd = normalize(uv.x * rt + uv.y * up + uFocal * fw);

  float spread = uSplit * 1.7;
  vec3 bmin = vec3(-2.35 - spread, -1.0 + uLift, -1.35);
  vec3 bmax = vec3(2.35 + spread, 1.6 + uLift + uSplit * 0.5, 1.35);
  float t0;
  float t1;
  if (!hitBox(ro, rd, bmin, bmax, t0, t1)) {
    outColor = vec4(0.0);
    return;
  }
  t0 = max(t0, 0.0);

  const int STEPS = 44;
  float dt = (t1 - t0) / float(STEPS);
  float t = t0 + dt * ign(gl_FragCoord.xy);

  vec3 sun = normalize(vec3(0.32, 1.0, 0.42));
  vec3 pearl = vec3(1.0, 0.998, 0.992);
  vec3 slate = vec3(0.55, 0.62, 0.73);
  vec3 cyan = vec3(0.0, 0.659, 0.910);
  vec3 cobalt = vec3(0.114, 0.306, 0.847);

  vec3 col = vec3(0.0);
  float T = 1.0;
  for (int i = 0; i < STEPS; i++) {
    vec3 p = ro + rd * t;
    float d = density(p, 5);
    if (d > 0.003) {
      float l1 = density(p + sun * 0.24, 3);
      float l2 = density(p + sun * 0.62, 2);
      float shade = exp(-(l1 * 1.5 + l2 * 1.1) * 1.35);
      float h = clamp((p.y - uLift - ${num(CLOUD_BASE_Y)}) / 1.85, 0.0, 1.0);
      vec3 c = mix(slate, pearl, shade);
      c *= mix(0.9, 1.0, h);
      float under = pow(1.0 - h, 2.4);
      vec3 sss = mix(cobalt, cyan, clamp(shade * 1.6 + 0.2, 0.0, 1.0));
      c = mix(c, sss, clamp(under * uGlow * (0.7 + 0.3 * (1.0 - shade)), 0.0, 0.85));
      float a = 1.0 - exp(-d * 9.0 * dt);
      col += T * a * c;
      T *= 1.0 - a;
      if (T < 0.015) break;
    }
    t += dt;
    if (t > t1) break;
  }

  float alpha = (1.0 - T) * uOpacity;
  outColor = vec4(col * uOpacity, alpha);
}`;

function compileShader(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[AtmosphericPreloader] shader:", gl.getShaderInfoLog(sh));
    }
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function createWebGLCloud(canvas: HTMLCanvasElement): CloudRenderer | null {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "high-performance",
  });
  if (!gl) return null;

  const vs = compileShader(gl, gl.VERTEX_SHADER, CLOUD_VERT);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, CLOUD_FRAG);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  // 32^3 lattice noise, trilinear filtered + smooth-weighted in the shader.
  const N = 32;
  const lattice = new Uint8Array(N * N * N);
  for (let i = 0; i < lattice.length; i++) lattice[i] = (Math.random() * 256) | 0;
  const noiseTex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_3D, noiseTex);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  gl.texImage3D(gl.TEXTURE_3D, 0, gl.R8, N, N, N, 0, gl.RED, gl.UNSIGNED_BYTE, lattice);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.REPEAT);

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.useProgram(program);
  gl.disable(gl.DEPTH_TEST);
  gl.disable(gl.BLEND);

  const loc = (name: string) => gl.getUniformLocation(program, name);
  const u = {
    res: loc("uRes"),
    time: loc("uTime"),
    camZ: loc("uCamZ"),
    focal: loc("uFocal"),
    yShift: loc("uYShift"),
    sharp: loc("uSharp"),
    opacity: loc("uOpacity"),
    condense: loc("uCondense"),
    glow: loc("uGlow"),
    split: loc("uSplit"),
    lift: loc("uLift"),
    fade: loc("uFade"),
    mouse: loc("uMouse"),
    noise: loc("uNoise"),
  };
  gl.uniform1i(u.noise, 0);

  // Soft volumes upscale cleanly, so the march runs on a fixed pixel budget.
  let pixelBudget = 300_000;
  let cssW = 1;
  let cssH = 1;

  const applySize = () => {
    const scale = Math.min(1, Math.sqrt(pixelBudget / Math.max(1, cssW * cssH)));
    canvas.width = Math.max(1, Math.round(cssW * scale));
    canvas.height = Math.max(1, Math.round(cssH * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  return {
    resize(w, h) {
      cssW = w;
      cssH = h;
      applySize();
    },
    degrade() {
      pixelBudget *= 0.55;
      applySize();
    },
    render(f) {
      if (gl.isContextLost()) return;
      if (f.opacity <= 0.001) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        return;
      }
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_3D, noiseTex);
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform1f(u.time, f.time);
      gl.uniform1f(u.camZ, f.camZ);
      gl.uniform1f(u.focal, f.focal);
      gl.uniform1f(u.yShift, f.yShift);
      gl.uniform1f(u.sharp, f.sharp);
      gl.uniform1f(u.opacity, f.opacity);
      gl.uniform1f(u.condense, f.condense);
      gl.uniform1f(u.glow, f.glow);
      gl.uniform1f(u.split, f.split);
      gl.uniform1f(u.lift, f.lift);
      gl.uniform1f(u.fade, f.fade);
      gl.uniform2f(u.mouse, f.mouseX, f.mouseY);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    destroy() {
      gl.deleteTexture(noiseTex);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}

/* ══════════════════════════════════════════════════════════════════
   LAYER 1b: Canvas 2D soft-gradient fallback (no WebGL2)
   ══════════════════════════════════════════════════════════════════ */
function createCanvasCloud(canvas: HTMLCanvasElement): CloudRenderer | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  let w = 1;
  let h = 1;
  let scale = 0.5;

  const applySize = () => {
    canvas.width = Math.max(1, Math.round(w * scale));
    canvas.height = Math.max(1, Math.round(h * scale));
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
  };

  return {
    resize(cssW, cssH) {
      w = cssW;
      h = cssH;
      applySize();
    },
    degrade() {
      scale = 0.35;
      applySize();
    },
    render(f) {
      ctx.clearRect(0, 0, w, h);
      if (f.opacity <= 0.001) return;
      const k = (f.focal / f.camZ) * h;
      const cx = w * 0.5 + f.mouseX * 18;
      const cy = h * 0.5 - f.yShift * h - f.mouseY * 10;
      const blur = (1 - f.sharp) * 16 + f.fade * 14;

      ctx.save();
      ctx.globalAlpha = f.opacity * (1 - f.fade * 0.85);
      ctx.filter = blur > 0.5 ? `blur(${(blur * scale).toFixed(1)}px)` : "none";

      const baseY = cy - (CLOUD_BASE_Y + f.lift) * k;
      ctx.save();
      ctx.translate(cx, baseY);
      ctx.scale(1, 0.3);
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 1.7 * k);
      glow.addColorStop(0, `rgba(0, 168, 232, ${0.5 * f.glow})`);
      glow.addColorStop(0.5, `rgba(29, 78, 216, ${0.2 * f.glow})`);
      glow.addColorStop(1, "rgba(29, 78, 216, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, 1.7 * k, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      for (const [x, y, , r] of CLOUD_PUFFS) {
        const side = x >= 0 ? 1 : -1;
        const px = cx + (x + side * f.split * 1.55) * k;
        const py = cy - (y + f.lift + f.split * 0.3) * k;
        const pr = r * k * 1.2;
        const g = ctx.createRadialGradient(px - pr * 0.15, py - pr * 0.35, pr * 0.1, px, py, pr);
        g.addColorStop(0, "rgba(255, 255, 255, 0.98)");
        g.addColorStop(0.6, "rgba(236, 240, 246, 0.9)");
        g.addColorStop(0.86, "rgba(150, 166, 190, 0.45)");
        g.addColorStop(1, "rgba(150, 166, 190, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    },
    destroy() {
      ctx.clearRect(0, 0, w, h);
    },
  };
}

/* ══════════════════════════════════════════════════════════════════
   Stage: renders identical markup on the server and the client.
   ══════════════════════════════════════════════════════════════════ */
interface StageProps {
  rootRef: React.RefObject<HTMLDivElement | null>;
  active: boolean;
  reduced: boolean;
  onRelease: () => void;
  onDone: () => void;
}

function PreloaderStage({ rootRef, active, reduced, onRelease, onDone }: StageProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const cloudHostRef = useRef<HTMLDivElement>(null);
  const rainRef = useRef<HTMLCanvasElement>(null);
  const maskRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const dotRef = useRef<HTMLSpanElement>(null);
  const dropletRef = useRef<HTMLSpanElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const skipRef = useRef<() => void>(() => {});

  const onReleaseRef = useRef(onRelease);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onReleaseRef.current = onRelease;
    onDoneRef.current = onDone;
  }, [onRelease, onDone]);

  useEffect(() => {
    if (!active) return;
    const root = rootRef.current;
    const bg = bgRef.current;
    const hud = hudRef.current;
    const rainCanvas = rainRef.current;
    const cloudHost = cloudHostRef.current;
    if (!root || !bg || !hud || !rainCanvas || !cloudHost) return;

    let disposed = false;
    let ready = false;
    let releaseSent = false;
    let doneSent = false;

    const finishRelease = () => {
      if (releaseSent) return;
      releaseSent = true;
      root.style.pointerEvents = "none";
      onReleaseRef.current();
    };
    const finishDone = () => {
      if (doneSent) return;
      doneSent = true;
      finishRelease();
      onDoneRef.current();
    };

    const assetsReady = Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      (() => {
        const heroImg = document.querySelector<HTMLImageElement>("#hero img");
        if (heroImg) return heroImg.decode().catch(() => undefined);
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = img.onerror = () => resolve();
          img.src = HERO_PORTRAIT_SRC;
        });
      })(),
    ]);

    /* ── Reduced motion: static wordmark, quick fade, no heavy layers ── */
    if (reduced) {
      letterRefs.current.forEach((el) => {
        if (el) el.style.transform = "none";
      });
      if (pctRef.current) pctRef.current.textContent = "100%";
      let fadeTimer = 0;
      let doneTimer = 0;
      const startFade = () => {
        if (disposed) return;
        root.style.transition = "opacity 320ms ease";
        root.style.opacity = "0";
        finishRelease();
        doneTimer = window.setTimeout(finishDone, 340);
      };
      const capTimer = window.setTimeout(startFade, 900);
      assetsReady.then(() => {
        window.clearTimeout(capTimer);
        fadeTimer = window.setTimeout(startFade, 120);
      });
      return () => {
        disposed = true;
        window.clearTimeout(capTimer);
        window.clearTimeout(fadeTimer);
        window.clearTimeout(doneTimer);
      };
    }

    /* ── Viewport ── */
    let vw = document.documentElement.clientWidth || window.innerWidth;
    let vh = window.innerHeight;

    /* ── Layer 1: cloud renderer (fresh canvas per mount) ── */
    const cloudCanvas = document.createElement("canvas");
    cloudCanvas.className = "absolute inset-0 h-full w-full";
    cloudCanvas.setAttribute("aria-hidden", "true");
    cloudHost.appendChild(cloudCanvas);
    let cloud: CloudRenderer | null = createWebGLCloud(cloudCanvas);
    if (!cloud) {
      // A canvas that refused WebGL2 cannot hand out a 2D context, so swap it.
      const fallbackCanvas = document.createElement("canvas");
      fallbackCanvas.className = cloudCanvas.className;
      fallbackCanvas.setAttribute("aria-hidden", "true");
      cloudHost.replaceChild(fallbackCanvas, cloudCanvas);
      cloud = createCanvasCloud(fallbackCanvas);
    }
    cloud?.resize(vw, vh);
    const onContextLost = (e: Event) => {
      e.preventDefault();
      cloud = null;
    };
    cloudCanvas.addEventListener("webglcontextlost", onContextLost);

    /* ── Layer 2: rain (identical primitives to the home engine) ── */
    const rainCtx = rainCanvas.getContext("2d", { alpha: true });
    if (!rainCtx) return;
    const sizeRain = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      rainCanvas.width = vw * dpr;
      rainCanvas.height = vh * dpr;
      rainCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeRain();

    const pools = rainPoolSizes(vw);
    const drops = createDropPool(pools.drops);
    const splashes = createSplashPool(pools.splashes);
    const beads = createBeadPool(pools.beads);
    const rings = createRingPool(pools.rings);
    let splashCursor = 0;
    let beadCursor = 0;
    let ringCursor = 0;
    const metrics = rainMetrics(
      HOME_RAIN_PRESET.intensity,
      HOME_RAIN_PRESET.speed,
      HOME_RAIN_PRESET.size,
      pools.drops
    );
    let spawnAccumulator = 0;

    const impact = (d: RainDrop, x: number, y: number, widthScale = 1) => {
      const splashCount = 3 + Math.round(HOME_RAIN_PRESET.size / 30);
      for (let i = 0; i < splashCount; i++) {
        emitImpactSplash(
          splashes[splashCursor++ % pools.splashes],
          x,
          y,
          0,
          -1,
          d.width * widthScale,
          d.speed / metrics.baseVelocity
        );
      }
      if (Math.random() < 0.65) emitBead(beads[beadCursor++ % pools.beads], x, y);
      emitRing(rings[ringCursor++ % pools.rings], x, y);
    };

    /* ── Layer 3: wordmark hit band for micro-splashes ── */
    let textBand: { left: number; right: number; top: number; bottom: number } | null = null;
    const measureText = () => {
      const mask = maskRef.current;
      if (!mask) return;
      const r = mask.getBoundingClientRect();
      const fontSize = parseFloat(getComputedStyle(mask).fontSize) || 64;
      // Lowercase x-height zone of the line box, ignoring the mask padding.
      const lineTop = r.top + fontSize * 0.1;
      textBand = {
        left: r.left + fontSize * 0.1,
        right: r.right - fontSize * 0.1,
        top: lineTop + fontSize * 0.3,
        bottom: lineTop + fontSize * 0.46,
      };
    };
    measureText();

    assetsReady.then(() => {
      if (disposed) return;
      ready = true;
      measureText();
    });

    const onResize = () => {
      vw = document.documentElement.clientWidth || window.innerWidth;
      vh = window.innerHeight;
      cloud?.resize(vw, vh);
      sizeRain();
      measureText();
    };
    window.addEventListener("resize", onResize, { passive: true });

    /* ── Pointer parallax ── */
    let mouseTX = 0;
    let mouseTY = 0;
    let mouseX = 0;
    let mouseY = 0;
    const onPointer = (e: PointerEvent) => {
      mouseTX = (e.clientX / Math.max(1, vw)) * 2 - 1;
      mouseTY = -((e.clientY / Math.max(1, vh)) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    /* ── Skip ── */
    let skipped = false;
    let t = 0;
    const skip = () => {
      if (skipped) return;
      skipped = true;
      t = Math.max(t, TL.textExitStart);
    };
    skipRef.current = skip;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);

    /* ── Per-frame writers ── */
    const n = WORDMARK.length;
    const updateText = () => {
      const tracking = 1 - easeOutCubic(clamp01((t - TL.revealStart) / 1.0));
      for (let i = 0; i < n; i++) {
        const el = letterRefs.current[i];
        if (!el) continue;
        const pIn = easeOutExpo(
          clamp01((t - (TL.revealStart + i * TL.revealStagger)) / TL.revealDur)
        );
        const pOut = easeInCubic(
          clamp01((t - (TL.textExitStart + i * TL.textExitStagger)) / TL.textExitDur)
        );
        const x = (i - (n - 1) / 2) * 0.05 * tracking;
        const y = (1 - pIn) * LETTER_HIDDEN_EM - pOut * LETTER_EXIT_EM;
        el.style.transform = `translate3d(${x.toFixed(4)}em, ${y.toFixed(4)}em, 0)`;
      }

      const droplet = dropletRef.current;
      const dot = dotRef.current;
      if (droplet && dot) {
        const grow = easeOutCubic(
          clamp01((t - TL.dropletStart) / (TL.dropletDetach - TL.dropletStart))
        );
        const fall = clamp01((t - TL.dropletDetach) / (TL.dropletEnd - TL.dropletDetach));
        const fallEase = fall * fall;
        droplet.style.opacity = String(grow * (1 - fall));
        droplet.style.transform = `translate3d(0, ${(fallEase * 0.5).toFixed(4)}em, 0) scale(${(
          grow * (1 - fall * 0.35)
        ).toFixed(3)}, ${(grow * (1 + fall * 0.3)).toFixed(3)})`;
        const squash = Math.sin(Math.PI * clamp01((t - TL.dropletDetach) / 0.2));
        dot.style.transform = `scale(${(1 + squash * 0.1).toFixed(3)}, ${(1 - squash * 0.16).toFixed(3)})`;
      }
    };

    let lastPct = -1;
    let shownProgress = 0;
    let lastBgOpacity = -1;

    const stepRain = (dt: number, base: { x: number; y: number; halfW: number }) => {
      rainCtx.clearRect(0, 0, vw, vh);

      let rate = 0;
      if (t >= TL.rainStart) {
        rate =
          smoothstep(TL.rainStart, TL.rainStart + TL.rainRamp, t) *
          (1 - smoothstep(TL.handoff, TL.bgFadeEnd, t));
      }
      spawnAccumulator += metrics.targetActiveDrops * dt * 2.0 * rate;
      const cloudShare = 1 - smoothstep(TL.partStart, TL.partStart + 0.5, t);
      while (spawnAccumulator > 1) {
        spawnAccumulator -= 1;
        const d = drops.find((drop) => !drop.active);
        if (!d) {
          spawnAccumulator = 0;
          break;
        }
        const layerScale = assignDropTraits(d, metrics);
        if (Math.random() < cloudShare) {
          d.x = base.x + (Math.random() * 2 - 1) * base.halfW;
          d.y = base.y - d.len * 0.35 + Math.random() * 10;
        } else {
          d.x = Math.random() * (vw + 550) - 100;
          d.y = -metrics.baseLength * layerScale - Math.random() * 80;
        }
        d.active = true;
      }

      const band =
        textBand && t >= TL.rainStart && t < TL.textExitStart + 0.12 ? textBand : null;
      let active = 0;
      rainCtx.lineCap = "round";
      for (const d of drops) {
        if (!d.active) continue;
        const prevY = d.y;
        const dist = d.speed * dt;
        d.x += d.angleSin * dist;
        d.y += d.angleCos * dist;

        if (
          band &&
          d.layer === 1 &&
          d.y >= band.top &&
          prevY <= band.bottom &&
          d.x >= band.left &&
          d.x <= band.right &&
          Math.random() < 0.6
        ) {
          d.active = false;
          const hitY = Math.min(d.y, band.top + Math.random() * (band.bottom - band.top));
          impact(d, d.x, hitY);
          continue;
        }

        if (d.y > vh + d.len || d.x < -150) {
          d.active = false;
          if (d.y >= vh && Math.random() < 0.3) impact(d, d.x, vh - 2, 0.8);
          continue;
        }

        drawRainDrop(rainCtx, d);
        active++;
      }

      for (const s of splashes) if (s.active) stepDrawSplash(rainCtx, s, dt);
      for (const b of beads) if (b.active) stepDrawBead(rainCtx, b, dt);
      for (const r of rings) if (r.active) stepDrawRing(rainCtx, r, dt);
      return active;
    };

    /* ── Master loop ── */
    let raf = 0;
    let last = performance.now();
    let clock = 0;
    let heldFor = 0;
    let handoffSent = false;
    let frameCount = 0;
    let perfSum = 0;
    let degraded = false;
    let cloudRetired = false;
    let hurried = false;
    const wallStart = performance.now();

    const frame = (now: number) => {
      if (disposed) return;
      raf = requestAnimationFrame(frame);
      const rawDt = (now - last) / 1000;
      last = now;

      if (!hurried && now - wallStart > MAX_WALL_MS) {
        hurried = true;
        skip();
        if (cloud && !cloudRetired) {
          cloudRetired = true;
          cloud.destroy();
          cloud = null;
        }
      }

      const dt = Math.min(hurried ? 0.4 : 0.05, Math.max(0, rawDt));
      clock += dt;

      // Adaptive quality: one downgrade if the first frames run slow.
      frameCount++;
      if (!degraded && frameCount > 12 && frameCount <= 42) {
        perfSum += rawDt;
        if (frameCount === 42 && perfSum / 30 > 0.024) {
          degraded = true;
          cloud?.degrade();
        }
      }

      // Asset gate: hold at the condensation peak until fonts + hero image are in.
      const canAdvance = ready || skipped || heldFor >= MAX_HOLD;
      const speed = skipped ? 1.6 : 1;
      if (canAdvance || t + dt < TL.hold) {
        t += dt * speed;
      } else {
        t = TL.hold;
        heldFor += dt;
      }

      // Progress readout
      let target = clamp01(t / TL.bgFadeStart);
      if (!canAdvance) target = Math.min(target, 0.86 + 0.08 * clamp01(heldFor / MAX_HOLD));
      shownProgress += (target - shownProgress) * (1 - Math.exp(-dt * 12));
      if (t >= TL.bgFadeStart) shownProgress = 1;
      const pct = Math.round(shownProgress * 100);
      if (pct !== lastPct && pctRef.current) {
        lastPct = pct;
        pctRef.current.textContent = `${pct < 10 ? "0" : ""}${pct}%`;
      }

      // Cloud
      mouseX += (mouseTX - mouseX) * (1 - Math.exp(-dt * 3.5));
      mouseY += (mouseTY - mouseY) * (1 - Math.exp(-dt * 3.5));
      const cf = computeCloudFrame(t, clock, vw / Math.max(1, vh), mouseX, mouseY);
      if (cloud && !cloudRetired) {
        cloud.render(cf);
        if (t > TL.partEnd && cf.opacity <= 0.001) {
          // Fully dissolved: free the GPU before the rain finishes draining.
          cloudRetired = true;
          cloud.destroy();
          cloud = null;
        }
      }

      // Rain
      const activeDrops = stepRain(dt, cloudBaseOnScreen(cf, vw, vh));

      // Typography
      if (t <= TL.textExitStart + n * TL.textExitStagger + TL.textExitDur + 0.05) {
        updateText();
      }

      // Backdrop + HUD crossfade into the hero
      const bgOpacity = 1 - smoothstep(TL.bgFadeStart, TL.bgFadeEnd, t);
      if (Math.abs(bgOpacity - lastBgOpacity) > 0.001) {
        lastBgOpacity = bgOpacity;
        bg.style.opacity = bgOpacity.toFixed(3);
        hud.style.opacity = bgOpacity.toFixed(3);
      }

      if (!handoffSent && t >= TL.handoff) {
        handoffSent = true;
        window.dispatchEvent(new Event(ATMO_HANDOFF_EVENT));
        // Wake the home rain loop under the fading backdrop, exactly as a first
        // scroll would (scrollY stays 0), so its storm takes over seamlessly.
        window.dispatchEvent(new Event("scroll"));
      }
      if (t >= TL.release) finishRelease();
      if (t >= TL.bgFadeEnd && (activeDrops === 0 || t >= TL.drainCap)) {
        cancelAnimationFrame(raf);
        finishDone();
      }
    };

    updateText();
    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("keydown", onKey);
      cloudCanvas.removeEventListener("webglcontextlost", onContextLost);
      cloud?.destroy();
      cloud = null;
      cloudHost.replaceChildren();
      rainCtx.clearRect(0, 0, vw, vh);
      rainCanvas.width = 0;
      rainCanvas.height = 0;
      skipRef.current = () => {};
    };
  }, [active, reduced, rootRef]);

  return (
    <div
      ref={rootRef}
      className="atmo-preloader fixed inset-0 z-[9999] overflow-hidden select-none"
      style={{ contain: "strict" }}
      suppressHydrationWarning
    >
      <style dangerouslySetInnerHTML={{ __html: GATE_CSS }} />
      <InlineScript html={BOOT_SCRIPT} />

      {/* Backdrop: identical surface to the hero, so the fade reveals it without a seam */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          backgroundColor: HERO_BACKGROUND,
          backgroundImage: HERO_BACKGROUND_IMAGE,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0" style={{ background: HERO_LIGHTING }} />
      </div>

      {/* LAYER 1: volumetric cloud */}
      <div ref={cloudHostRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* LAYER 3: editorial wordmark */}
      <div
        className="absolute inset-x-0 top-[52%] sm:top-[56%] -translate-y-1/2 flex justify-center pointer-events-none"
        aria-hidden="true"
      >
        <span
          ref={maskRef}
          className="font-manrope font-extrabold lowercase leading-none tracking-[-0.06em] whitespace-nowrap text-[#111112] overflow-hidden block"
          style={{
            fontSize: "clamp(34px, 7.4vw, 124px)",
            padding: "0.1em 0.1em 0.55em",
            marginBottom: "-0.55em",
          }}
        >
          {WORDMARK.split("").map((ch, i) =>
            i === ACCENT_INDEX ? (
              <span
                key={i}
                ref={(el) => {
                  letterRefs.current[i] = el;
                }}
                className="relative inline-block will-change-transform"
                style={{ width: "0.27em", height: "0.2em", transform: INITIAL_LETTER_TRANSFORM }}
              >
                <span
                  ref={dotRef}
                  className="absolute bottom-0 left-1/2 block rounded-full bg-[#0055FF]"
                  style={{
                    width: "0.19em",
                    height: "0.19em",
                    marginLeft: "-0.095em",
                    transformOrigin: "50% 0%",
                  }}
                />
                <span
                  ref={dropletRef}
                  className="absolute left-1/2 top-full block bg-[#0055FF]"
                  style={{
                    width: "0.1em",
                    height: "0.13em",
                    marginLeft: "-0.05em",
                    marginTop: "-0.03em",
                    borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
                    transformOrigin: "50% 0%",
                    transform: "scale(0)",
                    opacity: 0,
                  }}
                />
              </span>
            ) : (
              <span
                key={i}
                ref={(el) => {
                  letterRefs.current[i] = el;
                }}
                className="inline-block will-change-transform"
                style={{ transform: INITIAL_LETTER_TRANSFORM }}
              >
                {ch}
              </span>
            )
          )}
        </span>
      </div>

      {/* LAYER 2: rain + micro-splash, above the wordmark so drops land on it */}
      <canvas
        ref={rainRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Minimal HUD */}
      <div ref={hudRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-6 sm:bottom-9 left-5 sm:left-10 lg:left-14 xl:left-20 flex items-baseline gap-3 text-[#111112]">
          <span
            ref={pctRef}
            className="italic tabular-nums leading-none"
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(22px, 2vw, 30px)",
            }}
            aria-hidden="true"
          >
            00%
          </span>
          <span
            className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.18em] leading-none"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Atmosphere
          </span>
        </div>
        <button
          type="button"
          onClick={() => skipRef.current()}
          className="pointer-events-auto absolute bottom-5 sm:bottom-8 right-3 sm:right-8 lg:right-12 xl:right-[4.5rem] px-2 py-1 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.18em] leading-none text-[#111112] hover:text-[#0055FF] focus-visible:text-[#0055FF] focus-visible:outline-none transition-colors duration-200 cursor-pointer"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
          aria-label="Skip intro"
        >
          Skip
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Public component: decides play / skip, owns scroll lock + session flag.
   ══════════════════════════════════════════════════════════════════ */
type Mode = "pending" | "play" | "reduced" | "done";

export function AtmosphericPreloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("pending");
  const [released, setReleased] = useState(false);
  const lenis = useLenis();
  const lenisStoppedRef = useRef(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (readIntroMode(root) === "skip") {
      setMode("done");
      return;
    }
    // Soft navigations never ran the boot script, so apply the gate here too.
    root?.setAttribute(ATMO_ATTR, "play");
    try {
      window.sessionStorage.setItem(ATMO_STORAGE_KEY, "playing");
    } catch {}
    window.scrollTo(0, 0);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(reduced ? "reduced" : "play");
  }, []);

  const playing = mode === "play" || mode === "reduced";
  const locked = playing && !released;

  // Pause Lenis smooth scroll while the intro owns the viewport.
  useEffect(() => {
    if (!lenis) return;
    if (locked) {
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.stop();
      lenisStoppedRef.current = true;
    } else if (lenisStoppedRef.current) {
      lenis.start();
      lenisStoppedRef.current = false;
    }
  }, [lenis, locked]);

  useEffect(
    () => () => {
      if (lenisStoppedRef.current) lenis?.start();
    },
    [lenis]
  );

  const handleRelease = () => {
    rootRef.current?.setAttribute(ATMO_ATTR, "release");
    setReleased(true);
  };

  const handleDone = () => {
    try {
      window.sessionStorage.setItem(ATMO_STORAGE_KEY, "seen");
      if ("scrollRestoration" in history) history.scrollRestoration = "auto";
    } catch {}
    setMode("done");
    window.dispatchEvent(new Event(ATMO_DONE_EVENT));
  };

  if (mode === "done") return null;

  return (
    <PreloaderStage
      rootRef={rootRef}
      active={playing}
      reduced={mode === "reduced"}
      onRelease={handleRelease}
      onDone={handleDone}
    />
  );
}

export default AtmosphericPreloader;
