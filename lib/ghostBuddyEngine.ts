export type Pt = [number, number];

export const TAU = Math.PI * 2;
export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const sstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
export const rgba = (rgb: string, a: number) => `rgba(${rgb},${a})`;

// Tuned to Kaiki's Cobalt Blue, Ice Cyan & Deep Obsidian Glass Palette
export const COLORS = {
  shadow: "0,85,255",
  ripple: "56,189,248",
  auraCyan: "0,195,255",
  auraMagenta: "56,189,248",
  auraViolet: "0,85,255",
  edgeCyan: "56,210,255",
  edgeMagenta: "96,165,250",
  bodyTop: "#1d4ed8",
  bodyMid: "#0f172a",
  bodyBottom: "#1e3a8a",
  innerMagenta: "56,189,248",
  innerBlue: "0,102,255",
  innerTeal: "125,211,252",
  core: "8,14,30",
  scanline: "#bae6fd",
  rimTop: "186,230,253",
  rimMid: "56,189,248",
  rimBottom: "0,85,255",
  ringTop: "240,249,255",
  ringMid: "147,197,253",
  ringBottom: "56,189,248",
  ringShadow: "56,189,248",
  hairline: "224,242,254",
  specular: "255,255,255",
  eye: "#ffffff",
  eyeGlow: "186,230,253",
  sparks: ["56,189,248", "0,85,255", "125,211,252", "255,255,255"],
  z: "0,85,255",
} as const;

export const BEHAVIOUR = {
  sleepAfter: 5,
  startleSpeed: 1700,
  wakeHop: 220,
  clickHop: 140,
  startleHop: 185,
  gravity: 1300,
  firstBlink: 2,
  blinkGap: [2.2, 2.6],
  blinkLength: 0.16,
  clickSparks: 26,
  startleSparks: 8,
  rippleLife: 1.1,
  zLife: 2.4,
  zRate: 0.7,
} as const;

const EN = 72;
export type Expression = "pill" | "closed" | "happy" | "press" | "surprise" | "sleep";
export type EyeWeights = { happy: number; press: number; surprise: number; sleep: number; closed: number };
type EyeSet = Record<Expression, Pt[]>;
type EyeCache = { u: number; sides: Record<-1 | 1, EyeSet> };

export type View = { W: number; H: number; DPR: number; U: number; CX: number; CY: number };

export type Pointer = {
  x: number;
  y: number;
  px: number;
  py: number;
  present: boolean;
  down: boolean;
  touch: boolean;
  lastMove: number;
  spd: number;
};

export type Ghost = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gx: number;
  gy: number;
  gvx: number;
  gvy: number;
  lean: number;
  lv: number;
  sq: number;
  sqv: number;
  happy: number;
  surp: number;
  press: number;
  sleep: number;
  woke: boolean;
  blink: number;
  blinkT: number;
  nextBlink: number;
  phase: number;
  glow: number;
  lift: number;
  liftv: number;
  trailX: number;
  trailY: number;
  hover: boolean;
};

export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  t: number;
  life: number;
  s: number;
  c: string;
  rot: number;
  vr: number;
  star: boolean;
};
export type Ripple = { x: number; y: number; t: number; big: boolean };
export type Snore = { x: number; y: number; t: number };

export type World = {
  ctx: CanvasRenderingContext2D;
  view: View;
  pointer: Pointer;
  ghost: Ghost;
  parts: Particle[];
  rips: Ripple[];
  zz: Snore[];
  eyeW: EyeWeights;
  eyeV: EyeWeights;
  t: number;
  path: Path2D | null;
  reducedMotion: boolean;
};

const weights = (): EyeWeights => ({ happy: 0, press: 0, surprise: 0, sleep: 0, closed: 0 });

export function createWorld(ctx: CanvasRenderingContext2D, view: View): World {
  const { W, H, CX, CY } = view;
  return {
    ctx,
    view,
    pointer: { x: W * 0.5, y: H * 0.5, px: 0, py: 0, present: false, down: false, touch: false, lastMove: 0, spd: 0 },
    ghost: {
      x: CX, y: CY, vx: 0, vy: 0, gx: 0, gy: 0, gvx: 0, gvy: 0, lean: 0, lv: 0, sq: 0, sqv: 0,
      happy: 0, surp: 0, press: 0, sleep: 0, woke: false, blink: 0, blinkT: -1, nextBlink: BEHAVIOUR.firstBlink,
      phase: 0, glow: 0, lift: 0, liftv: 0, trailX: 0, trailY: 0, hover: false,
    },
    parts: [],
    rips: [],
    zz: [],
    eyeW: weights(),
    eyeV: weights(),
    t: 0,
    path: null,
    reducedMotion: false,
  };
}

export function outline(G: Ghost, t: number): Pt[] {
  const w = 0.43, top = -0.48, sideY = -0.07, hem = 0.42, pts: Pt[] = [];
  const hemWave = (u: number) => {
    const k = 4;
    const s = Math.sin(u * Math.PI * k + G.phase);
    return 0.065 * (s > 0 ? Math.pow(s, 0.7) : -Math.pow(-s, 1.6) * 0.35);
  };
  for (let i = 0; i <= 40; i++) {
    const a = Math.PI + (i / 40) * Math.PI;
    pts.push([Math.cos(a) * w, sideY + Math.sin(a) * (sideY - top)]);
  }
  for (let i = 1; i <= 18; i++) {
    const v = i / 18;
    pts.push([w * (1 + 0.035 * Math.sin(v * Math.PI)), lerp(sideY, hem, v)]);
  }
  for (let i = 1; i <= 60; i++) {
    const u = i / 60;
    const x = lerp(w, -w, u);
    pts.push([x, hem + hemWave(u)]);
  }
  for (let i = 1; i < 18; i++) {
    const v = 1 - i / 18;
    pts.push([-w * (1 + 0.035 * Math.sin(v * Math.PI)), lerp(sideY, hem, v)]);
  }
  const sx = 1 + G.sq * 0.9, sy = 1 - G.sq * 0.75;
  return pts.map(([x, y]) => {
    const f = sstep(-0.15, 0.5, y);
    x += G.trailX * f * f + Math.sin(t * 2.1 + y * 5) * 0.012 * f;
    y += G.trailY * f * 0.5;
    return [x * sx, (y - 0.42) * sy + 0.42];
  });
}

export function toScreen(G: Ghost, U: number, pts: Pt[]): Pt[] {
  const c = Math.cos(G.lean), s = Math.sin(G.lean), sc = U * (1 + 0.04 * G.happy);
  return pts.map(([x, y]) => [G.x + (x * c - y * s) * sc, G.y + (x * s + y * c) * sc]);
}

export function trace(ctx: CanvasRenderingContext2D, p: Pt[]) {
  ctx.beginPath();
  ctx.moveTo((p[0][0] + p[p.length - 1][0]) / 2, (p[0][1] + p[p.length - 1][1]) / 2);
  for (let i = 0; i < p.length; i++) {
    const a = p[i], b = p[(i + 1) % p.length];
    ctx.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
  }
  ctx.closePath();
}

export function makePath(p: Pt[]) {
  const P = new Path2D();
  P.moveTo(p[0][0], p[0][1]);
  for (const q of p) P.lineTo(q[0], q[1]);
  P.closePath();
  return P;
}

function capsuleLine(pts: Pt[], th: number): Pt[] {
  const L: Pt[] = [], R: Pt[] = [], n = pts.length;
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
    let tx = b[0] - a[0], ty = b[1] - a[1];
    const l = Math.hypot(tx, ty) || 1;
    tx /= l;
    ty /= l;
    L.push([pts[i][0] - (ty * th) / 2, pts[i][1] + (tx * th) / 2]);
    R.push([pts[i][0] + (ty * th) / 2, pts[i][1] - (tx * th) / 2]);
  }
  const cap = (p: Pt, from: number) => {
    const o: Pt[] = [];
    for (let k = 1; k < 12; k++) {
      const ang = from + (k / 12) * Math.PI;
      o.push([p[0] + (Math.cos(ang) * th) / 2, p[1] + (Math.sin(ang) * th) / 2]);
    }
    return o;
  };
  const e = pts[n - 1], e2 = pts[n - 2], s0 = pts[0], s1 = pts[1];
  const ae = Math.atan2(e[1] - e2[1], e[0] - e2[0]), as = Math.atan2(s0[1] - s1[1], s0[0] - s1[0]);
  return [...R, ...cap(e, ae - Math.PI / 2), ...L.reverse(), ...cap(s0, as - Math.PI / 2)];
}

function resample(poly: Pt[], N: number): Pt[] {
  let area = 0;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    area += a[0] * b[1] - b[0] * a[1];
  }
  if (area < 0) poly = poly.slice().reverse();
  let cx = 0, cy = 0;
  poly.forEach((p) => {
    cx += p[0];
    cy += p[1];
  });
  cx /= poly.length;
  cy /= poly.length;
  let best = 0, bv = -1e9;
  poly.forEach((p, i) => {
    const v = -(p[1] - cy) - Math.abs(p[0] - cx) * 0.35;
    if (v > bv) {
      bv = v;
      best = i;
    }
  });
  poly = [...poly.slice(best), ...poly.slice(0, best)];
  const seg: number[] = [];
  let tot = 0;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length], l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    seg.push(l);
    tot += l;
  }
  const out: Pt[] = [];
  let i = 0, acc = 0;
  for (let k = 0; k < N; k++) {
    const d = (k / N) * tot;
    while (acc + seg[i] < d) {
      acc += seg[i];
      i++;
    }
    const u = (d - acc) / (seg[i] || 1), a = poly[i], b = poly[(i + 1) % poly.length];
    out.push([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]);
  }
  return out;
}

const curve = (f: (t: number) => Pt, n = 16) => [...Array(n)].map((_, i) => f(i / (n - 1)));

function buildEyes(u: number): Record<-1 | 1, EyeSet> {
  const mk = (pts: Pt[], th: number) => resample(capsuleLine(pts, th), EN);
  const one = (side: -1 | 1): EyeSet => {
    const k = u * 0.046;
    return {
      pill: mk([[0, -u * 0.055], [0, u * 0.055]], u * 0.072),
      closed: mk(curve((t) => [lerp(-u * 0.05, u * 0.05, t), u * 0.012 * Math.sin(t * Math.PI)]), u * 0.026),
      happy: mk(
        curve((t) => {
          const x = lerp(-u * 0.058, u * 0.058, t);
          return [x, u * 0.03 - u * 0.075 * Math.sin(t * Math.PI)];
        }),
        u * 0.034
      ),
      press: mk(
        [[side * k, -k], [side * k * 0.4, -k * 0.45], [-side * k * 0.8, 0], [side * k * 0.4, k * 0.45], [side * k, k]],
        u * 0.032
      ),
      surprise: resample(
        curve((t) => [Math.cos(t * Math.PI * 2) * u * 0.058, Math.sin(t * Math.PI * 2) * u * 0.058], 48).slice(0, 47),
        EN
      ),
      sleep: mk(curve((t) => [lerp(-u * 0.05, u * 0.05, t), u * 0.02 + u * 0.024 * Math.sin(t * Math.PI)]), u * 0.024),
    };
  };
  return { [-1]: one(-1), [1]: one(1) } as Record<-1 | 1, EyeSet>;
}

export function eyeWeights(W: EyeWeights, V: EyeWeights, G: Ghost, dt: number) {
  const T: EyeWeights = {
    happy: G.hover ? 1 : 0,
    press: G.press > 0.4 ? 1 : 0,
    surprise: G.hover ? 0 : clamp(G.surp * 1.6, 0, 1),
    sleep: G.sleep > 0.5 && !G.hover ? 1 : 0,
    closed: G.blink,
  };
  const K: EyeWeights = { happy: 170, press: 420, surprise: 220, sleep: 60, closed: 900 };
  const n = dt > 0.02 ? Math.ceil(dt / 0.02) : 1, h = dt / n;
  for (let i = 0; i < n; i++)
    for (const k of ["happy", "press", "surprise", "sleep", "closed"] as const) {
      const kk = K[k], c = 2 * Math.sqrt(kk) * 0.92;
      V[k] += ((T[k] - W[k]) * kk - V[k] * c) * h;
      W[k] += V[k] * h;
    }
}

let cache: EyeCache | null = null;

export function drawEyes(ctx: CanvasRenderingContext2D, G: Ghost, U: number, EW: EyeWeights) {
  if (!cache || cache.u !== U) cache = { u: U, sides: buildEyes(U) };
  const c = Math.cos(G.lean), s = Math.sin(G.lean);
  const fx = G.gx * U * 0.075, fy = G.gy * U * 0.06;
  for (const side of [-1, 1] as const) {
    const E = cache.sides[side];
    const press = clamp(EW.press, 0, 1.15);
    let rest = 1 - Math.min(1, press);
    const happy = clamp(EW.happy, 0, 1.1) * rest;
    rest *= 1 - Math.min(1, clamp(EW.happy, 0, 1));
    const surprise = clamp(EW.surprise, 0, 1.1) * rest;
    rest *= 1 - Math.min(1, clamp(EW.surprise, 0, 1));
    const sleep = clamp(EW.sleep, 0, 1) * rest;
    rest *= 1 - clamp(EW.sleep, 0, 1);
    const closed = clamp(EW.closed, 0, 1) * rest;
    rest *= 1 - clamp(EW.closed, 0, 1);
    const mix: [Expression, number][] = [
      ["press", press], ["happy", happy], ["surprise", surprise], ["sleep", sleep], ["closed", closed], ["pill", rest],
    ];
    const pts: Pt[] = [];
    for (let i = 0; i < EN; i++) {
      let x = 0, y = 0;
      for (const [k, w] of mix) {
        const p = E[k][i];
        x += p[0] * w;
        y += p[1] * w;
      }
      pts.push([x, y]);
    }
    const lx = side * U * 0.135 + fx, ly = -U * 0.1 + fy;
    const ex = G.x + lx * c - ly * s, ey = G.y + lx * s + ly * c;
    ctx.save();
    ctx.translate(ex, ey);
    ctx.rotate(G.lean);
    ctx.shadowColor = rgba(COLORS.eyeGlow, 0.95);
    ctx.shadowBlur = U * 0.06;
    ctx.fillStyle = COLORS.eye;
    ctx.beginPath();
    const m = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const q = m(pts[EN - 1], pts[0]);
    ctx.moveTo(q[0], q[1]);
    for (let i = 0; i < EN; i++) {
      const a = pts[i], b = pts[(i + 1) % EN], mm = m(a, b);
      ctx.quadraticCurveTo(a[0], a[1], mm[0], mm[1]);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

export function burst(w: World, x: number, y: number, n: number) {
  const U = w.view.U, cols = COLORS.sparks;
  for (let i = 0; i < n; i++) {
    const a = Math.random() * TAU, v = ((160 + Math.random() * 420) * U) / 340;
    w.parts.push({
      x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 60, t: 0, life: 0.6 + Math.random() * 0.6,
      s: ((2.5 + Math.random() * 5.5) * U) / 340, c: cols[i % 4], rot: Math.random() * TAU,
      vr: (Math.random() - 0.5) * 8, star: Math.random() < 0.55,
    });
  }
}

export function update(w: World, dt: number) {
  const { ctx, pointer: M, ghost: G } = w;
  const W = Math.max(200, w.view.W || (typeof window !== "undefined" ? window.innerWidth : 1200));
  const H = Math.max(200, w.view.H || (typeof window !== "undefined" ? window.innerHeight : 800));
  const DPR = w.view.DPR || (typeof window !== "undefined" ? window.devicePixelRatio : 1) || 1;
  const U = Math.max(80, w.view.U || 140);
  const CX = Number.isFinite(w.view.CX) && w.view.CX > 0 ? w.view.CX : W * 0.29;
  const CY = Number.isFinite(w.view.CY) && w.view.CY > 0 ? w.view.CY : H * 0.47;

  if (!Number.isFinite(G.x) || G.x === 0) G.x = CX;
  if (!Number.isFinite(G.y) || G.y === 0) G.y = CY;
  if (!Number.isFinite(G.vx)) G.vx = 0;
  if (!Number.isFinite(G.vy)) G.vy = 0;

  w.t += dt;
  const t = w.t, now = performance.now();

  let tx: number, ty: number;
  if (M.present) {
    tx = M.x;
    ty = M.y;
  } else {
    tx = CX + Math.cos(t * 0.4) * W * 0.25;
    ty = CY + Math.sin(t * 0.55) * H * 0.18;
  }
  const sp = dt > 0 ? Math.hypot(M.x - M.px, M.y - M.py) / dt : 0;
  M.spd = lerp(Number.isFinite(M.spd) ? M.spd : 0, M.present && Number.isFinite(sp) ? sp : 0, 0.3);
  M.px = M.x;
  M.py = M.y;

  const idle = (now - M.lastMove) / 1000, drowsy = idle > BEHAVIOUR.sleepAfter;
  G.sleep = lerp(G.sleep, M.present && drowsy && !G.hover ? 1 : 0, 1 - Math.exp(-dt * (drowsy ? 1.2 : 6)));
  if (G.sleep <= 0.5) G.woke = false;

  const dx = tx - CX, dy = ty - CY, dl = Math.hypot(dx, dy) || 1;
  const bx = CX + clamp(dx * 0.08, -U * 0.28, U * 0.28),
    by = CY + clamp(dy * 0.06, -U * 0.18, U * 0.18) + Math.sin(t * 1.5) * U * 0.04 * (1 - 0.6 * G.sleep) - G.lift;
  G.vx += ((bx - G.x) * 28 - G.vx * 7.5) * dt;
  G.vy += ((by - G.y) * 28 - G.vy * 7.5) * dt;
  G.x += G.vx * dt;
  G.y += G.vy * dt;

  const tvx = clamp((-G.vx / U) * 0.22, -0.22, 0.22), tvy = clamp((-G.vy / U) * 0.12, -0.1, 0.1);
  G.trailX = lerp(G.trailX, tvx, 1 - Math.exp(-dt * 6));
  G.trailY = lerp(G.trailY, tvy, 1 - Math.exp(-dt * 6));

  G.lv += (clamp((G.vx / U) * 0.12, -0.16, 0.16) + clamp((dx / W) * 0.12, -0.06, 0.06) - G.lean) * 60 * dt - G.lv * 9 * dt;
  G.lean += G.lv * dt;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  G.hover = !!(w.path && M.present && (!M.touch || M.down) && ctx.isPointInPath(w.path, M.x * DPR, M.y * DPR));
  G.happy = lerp(G.happy, G.hover ? 1 : 0, 1 - Math.exp(-dt * (G.hover ? 8 : 5)));
  G.glow = lerp(G.glow, G.hover ? 1 : 0, 1 - Math.exp(-dt * 4));

  if (M.spd > (BEHAVIOUR.startleSpeed * U) / 340 && !G.hover && G.surp < 0.6) {
    G.surp = 1;
    G.liftv += BEHAVIOUR.startleHop;
    burst(w, G.x, G.y - U * 0.1, BEHAVIOUR.startleSparks);
  }
  G.surp = Math.max(0, G.surp - dt * (G.hover ? 4 : 1.3));
  G.press = Math.max(0, G.press - dt * 2.6);
  eyeWeights(w.eyeW, w.eyeV, G, dt);

  const gm = Math.min(1, dl / (U * 1.2));
  G.gvx += (((dx / dl) * gm - G.gx) * 150 - G.gvx * 17) * dt;
  G.gvy += (((dy / dl) * gm * 0.85 - G.gy) * 150 - G.gvy * 17) * dt;
  G.gx += G.gvx * dt;
  G.gy += G.gvy * dt;

  G.sqv += (-G.sq * 200 - G.sqv * 8) * dt;
  G.sq += G.sqv * dt;
  G.liftv -= BEHAVIOUR.gravity * dt * (U / 340);
  G.lift += G.liftv * dt;
  if (G.lift < 0) {
    if (G.liftv < -150) G.sqv += Math.min(6, -G.liftv * 0.012);
    G.lift = 0;
    G.liftv = 0;
  }
  G.phase += dt * (2.4 + (Math.abs(G.vx) / U) * 3) * (1 - 0.6 * G.sleep);

  G.nextBlink -= dt;
  if (G.nextBlink <= 0 && G.happy < 0.3 && G.press < 0.1 && G.surp < 0.2 && G.sleep < 0.3) {
    G.blinkT = 0;
    G.nextBlink = BEHAVIOUR.blinkGap[0] + Math.random() * BEHAVIOUR.blinkGap[1];
  }
  if (G.blinkT >= 0) {
    G.blinkT += dt;
    const u = G.blinkT / BEHAVIOUR.blinkLength;
    G.blink = u < 0.5 ? u * 2 : Math.max(0, 2 - u * 2);
    if (u >= 1) {
      G.blinkT = -1;
      G.blink = 0;
    }
  }

  for (const p of w.parts) {
    p.t += dt;
    p.vx *= Math.exp(-2.8 * dt);
    p.vy = p.vy * Math.exp(-2.8 * dt) + 40 * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.rot += p.vr * dt;
  }
  for (let i = w.parts.length - 1; i >= 0; i--) if (w.parts[i].t > w.parts[i].life) w.parts.splice(i, 1);
  for (const r of w.rips) r.t += dt;
  for (let i = w.rips.length - 1; i >= 0; i--) if (w.rips[i].t > BEHAVIOUR.rippleLife) w.rips.splice(i, 1);
  if (G.sleep > 0.8 && Math.random() < dt * BEHAVIOUR.zRate) w.zz.push({ x: G.x + U * 0.32, y: G.y - U * 0.4, t: 0 });
  for (const z of w.zz) z.t += dt;
  for (let i = w.zz.length - 1; i >= 0; i--) if (w.zz[i].t > BEHAVIOUR.zLife) w.zz.splice(i, 1);
}

const rg = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, stops: [number, string][]) => {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  for (const [o, c] of stops) g.addColorStop(o, c);
  return g;
};

function star4(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const rr = i % 2 ? r * 0.3 : r, a = (i / 8) * TAU;
    ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function draw(w: World) {
  const { ctx, ghost: G, t } = w;
  const { W, H, DPR, U } = w.view;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

  // Transparent background so Ghost Buddy floats cleanly inside Kaiki's Hero section!
  ctx.clearRect(0, 0, W, H);

  // Floor glow under the ghost
  const fl = G.y + U * 0.62;
  ctx.save();
  ctx.translate(G.x, fl + G.lift * 0.2);
  ctx.scale(1, 0.16);
  ctx.fillStyle = rg(ctx, 0, 0, U * 0.55, [
    [0, rgba(COLORS.shadow, Math.max(0, 0.28 - (0.12 * G.lift) / U))],
    [1, "rgba(0,0,0,0)"],
  ]);
  ctx.beginPath();
  ctx.arc(0, 0, U * 0.55, 0, TAU);
  ctx.fill();
  ctx.restore();

  // Click ripples
  for (const r of w.rips) {
    const u = r.t / BEHAVIOUR.rippleLife, rad = (r.big ? U * 0.55 : U * 0.06) + u * U * (r.big ? 0.9 : 0.5);
    ctx.lineWidth = (r.big ? 2.4 : 1.6) * (1 - u) + 0.4;
    ctx.strokeStyle = rgba(COLORS.ripple, (1 - u) ** 2 * (r.big ? 0.65 : 0.45));
    ctx.beginPath();
    ctx.arc(r.x, r.y, rad, 0, TAU);
    ctx.stroke();
  }

  const loc = outline(G, t), scr = toScreen(G, U, loc);
  w.path = makePath(scr.map((p): Pt => [p[0] * DPR, p[1] * DPR]));
  const ph = G.surp, split = U * (0.018 + 0.05 * ph + 0.02 * G.press);
  const alpha = 1 - 0.45 * ph * (w.reducedMotion ? 0.5 : 0.5 + 0.5 * Math.sin(t * 40));

  // Fast radial gradient aura behind the ghost (zero ctx.filter / zero shadowBlur)
  const auraGrad = rg(ctx, G.x, G.y, U * 0.68, [
    [0, rgba(COLORS.auraCyan, 0.32 + 0.15 * G.glow)],
    [0.55, rgba(COLORS.auraViolet, 0.16 + 0.08 * G.glow)],
    [1, "rgba(0,0,0,0)"],
  ]);
  ctx.fillStyle = auraGrad;
  ctx.beginPath();
  ctx.arc(G.x, G.y, U * 0.68, 0, TAU);
  ctx.fill();

  ctx.save();
  ctx.globalAlpha = alpha;

  // RGB-split edge lines (fast, no blur filter)
  ctx.save();
  ctx.translate(-split, 0);
  ctx.strokeStyle = rgba(COLORS.edgeCyan, 0.5);
  ctx.lineWidth = U * 0.014;
  trace(ctx, scr);
  ctx.stroke();
  ctx.translate(split * 2, 0);
  ctx.strokeStyle = rgba(COLORS.edgeMagenta, 0.4);
  trace(ctx, scr);
  ctx.stroke();
  ctx.restore();

  // Body fill & inner glass light pools
  ctx.save();
  trace(ctx, scr);
  ctx.clip();
  const top = G.y - U * 0.5, bot = G.y + U * 0.5;
  const lg = ctx.createLinearGradient(G.x - U * 0.4, top, G.x + U * 0.4, bot);
  lg.addColorStop(0, COLORS.bodyTop);
  lg.addColorStop(0.5, COLORS.bodyMid);
  lg.addColorStop(1, COLORS.bodyBottom);
  ctx.fillStyle = lg;
  ctx.fillRect(G.x - U, G.y - U, U * 2, U * 2);

  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = rg(ctx, G.x + U * 0.22, G.y + U * 0.25, U * 0.55, [
    [0, rgba(COLORS.innerMagenta, 0.45 + 0.2 * G.glow)],
    [1, "rgba(0,0,0,0)"],
  ]);
  ctx.fillRect(G.x - U, G.y - U, U * 2, U * 2);
  ctx.fillStyle = rg(ctx, G.x - U * 0.26, G.y - U * 0.25, U * 0.55, [
    [0, rgba(COLORS.innerBlue, 0.48 + 0.2 * G.glow)],
    [1, "rgba(0,0,0,0)"],
  ]);
  ctx.fillRect(G.x - U, G.y - U, U * 2, U * 2);
  ctx.fillStyle = rg(ctx, G.x + U * 0.32, G.y - U * 0.1, U * 0.4, [
    [0, rgba(COLORS.innerTeal, 0.25)],
    [1, "rgba(0,0,0,0)"],
  ]);
  ctx.fillRect(G.x - U, G.y - U, U * 2, U * 2);

  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = rg(ctx, G.x - U * 0.05, G.y - U * 0.02, U * 0.5, [
    [0, rgba(COLORS.core, 0.55)],
    [0.7, rgba(COLORS.core, 0.15)],
    [1, rgba(COLORS.core, 0)],
  ]);
  ctx.fillRect(G.x - U, G.y - U, U * 2, U * 2);

  // Scanlines drifting down inside the glass body
  ctx.globalAlpha = alpha * 0.08;
  ctx.fillStyle = COLORS.scanline;
  const step = Math.max(3, U * 0.012);
  const off = (t * U * 0.04) % step;
  for (let y = top - step + off; y < bot + U * 0.2; y += step) {
    ctx.fillRect(G.x - U, y, U * 2, Math.max(1, step * 0.35));
  }
  ctx.globalAlpha = alpha;

  // Inner edge glow (fast gradient, zero filter blur)
  ctx.globalCompositeOperation = "lighter";
  ctx.lineWidth = U * 0.08;
  const eg = ctx.createLinearGradient(G.x - U * 0.4, top, G.x + U * 0.4, bot);
  eg.addColorStop(0, rgba(COLORS.rimTop, 0.5));
  eg.addColorStop(0.5, rgba(COLORS.rimMid, 0.2));
  eg.addColorStop(1, rgba(COLORS.rimBottom, 0.4));
  ctx.strokeStyle = eg;
  trace(ctx, scr);
  ctx.stroke();
  ctx.globalCompositeOperation = "source-over";
  ctx.restore();

  // Glowing inset ring (zero shadowBlur)
  const inset = toScreen(G, U, loc.map(([x, y]): Pt => [x * 0.9, (y + 0.03) * 0.9]));
  const rgd = ctx.createLinearGradient(G.x - U * 0.4, top, G.x + U * 0.35, bot);
  rgd.addColorStop(0, rgba(COLORS.ringTop, 0.85));
  rgd.addColorStop(0.55, rgba(COLORS.ringMid, 0.25));
  rgd.addColorStop(1, rgba(COLORS.ringBottom, 0.55));
  ctx.save();
  ctx.strokeStyle = rgd;
  ctx.lineWidth = U * 0.022;
  trace(ctx, inset);
  ctx.stroke();
  ctx.restore();

  // Outer hairline
  ctx.strokeStyle = rgba(COLORS.hairline, 0.35);
  ctx.lineWidth = 1.2;
  trace(ctx, scr);
  ctx.stroke();

  // Specular dome highlight arc
  ctx.save();
  ctx.translate(G.x, G.y);
  ctx.rotate(G.lean);
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = rgba(COLORS.specular, 0.65);
  ctx.lineWidth = U * 0.022;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(-U * 0.02, -U * 0.08, U * 0.31, Math.PI * 1.12, Math.PI * 1.36);
  ctx.stroke();
  ctx.restore();

  drawEyes(ctx, G, U, w.eyeW);
  ctx.restore();

  // Sparkles and floating sleep "z"s (zero shadowBlur)
  ctx.save();
  for (const p of w.parts) {
    const u = p.t / p.life, a = (1 - u) ** 1.4;
    ctx.fillStyle = rgba(p.c, a);
    if (p.star) star4(ctx, p.x, p.y, p.s * (1 - u * 0.3), p.rot);
    else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.s * 0.35, 0, TAU);
      ctx.fill();
    }
  }
  for (const z of w.zz) {
    const u = z.t / BEHAVIOUR.zLife;
    ctx.fillStyle = rgba(COLORS.z, Math.sin(u * Math.PI) * 0.85);
    ctx.font = `700 ${U * (0.075 + u * 0.05)}px system-ui,sans-serif`;
    ctx.fillText("z", z.x + Math.sin(z.t * 2) * U * 0.04 + u * U * 0.12, z.y - u * U * 0.35);
  }
  ctx.restore();
}

export function startGhostBuddy(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const measure = (): View => {
    const rect = canvas.getBoundingClientRect();
    const docW = typeof window !== "undefined" ? window.innerWidth : 1920;
    const docH = typeof window !== "undefined" ? window.innerHeight : 945;
    const W = Math.round(rect.width) || docW || 1920;
    const H = Math.round(rect.height) || docH || 945;
    const DPR = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const isMobile = W < 768;
    const U = Math.max(85, Math.min(W, H) * (isMobile ? 0.24 : 0.21));
    const CX = isMobile ? W * 0.78 : W * 0.29;
    const CY = isMobile ? H * 0.22 : H * 0.47;
    return { W, H, DPR, U, CX, CY };
  };

  const initialView = measure();
  const w = createWorld(ctx, initialView);

  const resize = () => {
    const v = measure();
    if (v.W <= 0 || v.H <= 0) return;
    const targetW = Math.round(v.W * v.DPR);
    const targetH = Math.round(v.H * v.DPR);

    if (canvas.width === targetW && canvas.height === targetH && w.view.W === v.W && w.view.H === v.H) {
      return;
    }

    w.view = v;
    canvas.width = targetW;
    canvas.height = targetH;
    if (!Number.isFinite(w.ghost.x) || w.ghost.x === 0) {
      w.ghost.x = v.CX;
      w.ghost.y = v.CY;
    }
  };

  resize();
  if (w.view.W > 0 && w.view.H > 0) {
    update(w, 0.016);
    draw(w);
  }
  requestAnimationFrame(resize);

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  window.addEventListener("resize", resize);

  const { pointer: M, ghost: G } = w;
  const hitTest = (x: number, y: number) => {
    if (!w.path) return false;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    return ctx.isPointInPath(w.path, x * w.view.DPR, y * w.view.DPR);
  };

  const wake = () => {
    if (G.sleep > 0.5 && !G.woke) {
      G.surp = Math.max(G.surp, 0.7);
      G.liftv += BEHAVIOUR.wakeHop;
      G.woke = true;
    }
  };

  const onMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    wake();
    M.x = x;
    M.y = y;
    M.present = true;
    M.touch = e.pointerType === "touch";
    M.lastMove = performance.now();
  };

  const onDown = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (y < 0 || y > rect.height) return;

    let hit = G.hover;
    if (e.pointerType === "touch") {
      wake();
      M.touch = true;
      M.present = true;
      M.px = x;
      M.py = y;
      hit = hitTest(x, y);
    } else {
      hit = hitTest(x, y);
    }
    M.down = true;
    M.x = x;
    M.y = y;
    M.lastMove = performance.now();
    if (hit) {
      G.press = 1;
      G.sqv += 7;
      G.liftv += BEHAVIOUR.clickHop;
      burst(w, M.x, M.y, BEHAVIOUR.clickSparks);
      w.rips.push({ x: G.x, y: G.y, t: 0, big: true });
    } else {
      w.rips.push({ x: M.x, y: M.y, t: 0, big: false });
      G.surp = Math.max(G.surp, 0.45);
    }
  };

  const onUp = () => {
    M.down = false;
  };
  const onLeave = (e: PointerEvent) => {
    if (e.pointerType !== "touch") M.present = false;
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onDown, { passive: true });
  window.addEventListener("pointerup", onUp, { passive: true });
  document.addEventListener("pointerleave", onLeave);

  let isVisible = true;
  let isLooping = false;
  let raf = 0;
  let last = performance.now();

  function loop(now: number) {
    if (!isVisible) {
      raf = 0;
      return;
    }
    const dt = Math.min(0.033, Math.max(0.001, (now - last) / 1000));
    last = now;
    if (w.view.W > 0 && w.view.H > 0) {
      update(w, dt);
      draw(w);
    }
    raf = requestAnimationFrame(loop);
  }

  const startLoop = () => {
    if (isLooping) return;
    isLooping = true;
    removeActivationListeners();
    if (isVisible && !raf) {
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }
  };

  const activationEvents = ["pointermove", "pointerdown", "touchstart", "scroll", "wheel", "keydown"] as const;
  const removeActivationListeners = () => {
    clearTimeout(idleTimer);
    activationEvents.forEach((evt) => {
      window.removeEventListener(evt, startLoop);
    });
  };

  activationEvents.forEach((evt) => {
    window.addEventListener(evt, startLoop, { passive: true, once: true });
  });

  const idleTimer = setTimeout(startLoop, 4000);

  const io = new IntersectionObserver(([e]) => {
    isVisible = e.isIntersecting;
    if (isVisible && isLooping && !raf) {
      last = performance.now();
      raf = requestAnimationFrame(loop);
    } else if (!isVisible && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  });
  io.observe(canvas);

  return () => {
    removeActivationListeners();
    if (raf) cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointerup", onUp);
    document.removeEventListener("pointerleave", onLeave);
  };
}

