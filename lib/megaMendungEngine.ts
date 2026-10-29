export type Pt = [number, number];

const TAU = Math.PI * 2;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rgba = (rgb: string, a: number) => `rgba(${rgb},${a})`;

// Palet Liquid Glass yang selaras 1:1 dengan ghostBuddyEngine.ts & CLAUDE.md
const COLORS = {
  shadow: "0,85,255",
  ripple: "56,189,248",
  auraCyan: "0,195,255",
  auraViolet: "0,85,255",
  edgeCyan: "56,210,255",
  edgeBlue: "96,165,250",
  bodyTop: "#1d4ed8",
  bodyMid: "#0f172a",
  bodyBottom: "#1e3a8a",
  innerCyan: "56,189,248",
  innerBlue: "0,85,255",
  innerIce: "186,230,253",
  core: "8,14,30",
  scanline: "#bae6fd",
  specular: "255,255,255",
  // 5 Lapisan Gradasi Khas Batik Mega Mendung (Luar -> Dalam)
  gradasiRings: [
    "244,244,237", // Warm Bone outer hairline
    "186,230,253", // Ice Sky
    "56,189,248",  // Electric Cyan-Blue
    "37,99,235",   // Royal Cobalt
    "0,85,255",    // Deep Editorial Cobalt
  ],
  sparks: ["56,189,248", "0,85,255", "186,230,253", "244,244,237"],
} as const;

interface CloudCluster {
  id: number;
  anchorX: number; // 0..1 terhadap lebar layar
  anchorY: number; // 0..1 terhadap tinggi layar
  scale: number;   // proporsi relatif terhadap U
  flipX: -1 | 1;
  flipY: -1 | 1;
  baseTilt: number;
  phase: number;
  speed: number;
  // State fisika pegas (sama seperti Ghost Buddy)
  x: number;
  y: number;
  vx: number;
  vy: number;
  sq: number;
  sqv: number;
  lean: number;
  lv: number;
  glow: number;
  hover: boolean;
  path: Path2D | null;
}

interface SparkParticle {
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
}

interface CloudRipple {
  x: number;
  y: number;
  t: number;
  big: boolean;
}

// 6 Lobe pembentuk siluet Awan Mega Mendung Cirebon
const MEGA_LOBES = [
  { cx: -0.78, cy: 0.22, rx: 0.34, ry: 0.22 }, // Ekor ulir kiri
  { cx: -0.44, cy: 0.04, rx: 0.42, ry: 0.32 }, // Bahu kiri
  { cx: -0.02, cy: -0.14, rx: 0.52, ry: 0.44 }, // Puncak kubah tengah
  { cx: 0.42, cy: 0.03, rx: 0.43, ry: 0.33 },  // Bahu kanan
  { cx: 0.78, cy: 0.20, rx: 0.35, ry: 0.23 },  // Ekor ulir kanan
  { cx: 0.0, cy: 0.24, rx: 0.88, ry: 0.20 },   // Dasar perut awan
] as const;

// Menghasilkan titik-titik kontur luar & dalam Awan Mega Mendung
function megaMendungContour(
  layerScale: number,
  t: number,
  phase: number,
  sq: number
): Pt[] {
  const pts: Pt[] = [];
  const N = 88;
  const sx = (1 + sq * 0.65) * layerScale;
  const sy = (1 - sq * 0.52) * layerScale;

  for (let i = 0; i < N; i++) {
    const u = i / N;
    const ang = u * TAU;
    const dirX = Math.cos(ang);
    const dirY = Math.sin(ang);

    // Cari jarak terjauh dari gabungan lobe elips Mega Mendung (smooth union)
    let maxDist = 0.18;
    for (let j = 0; j < MEGA_LOBES.length; j++) {
      const L = MEGA_LOBES[j];
      // Proyeksi sinar dari pusat ke elips lobe
      const A = (dirX * dirX) / (L.rx * L.rx) + (dirY * dirY) / (L.ry * L.ry);
      const B = -2 * ((dirX * L.cx) / (L.rx * L.rx) + (dirY * L.cy) / (L.ry * L.ry));
      const C = (L.cx * L.cx) / (L.rx * L.rx) + (L.cy * L.cy) / (L.ry * L.ry) - 1;
      const disc = B * B - 4 * A * C;
      if (disc > 0) {
        const d = (-B + Math.sqrt(disc)) / (2 * A);
        if (d > 0) {
          // Smooth max blend agar lekukan antar-lobe awan mengalir lembut
          maxDist = Math.log(Math.exp(maxDist * 9) + Math.exp(d * 9)) / 9;
        }
      }
    }

    // Gelombang napas organik khas Mega Mendung
    const wave =
      0.024 * Math.sin(ang * 5 + t * 2.1 + phase) +
      0.014 * Math.cos(ang * 3 - t * 1.6 + phase);

    const r = maxDist + wave;
    const px = dirX * r;
    let py = dirY * r;

    // Ratakan sedikit bagian bawah awan dengan lekuk ombak halus
    if (py > 0.28) {
      py = 0.28 + (py - 0.28) * 0.38 + 0.018 * Math.sin(px * 6 + t * 2.2 + phase);
    }

    pts.push([px * sx, py * sy]);
  }

  return pts;
}

// Titik spiral ulir dalam (gelung khas Mega Mendung di kiri, tengah, kanan)
function buildSpiralCurve(
  cx: number,
  cy: number,
  maxR: number,
  turns: number,
  dir: -1 | 1,
  t: number,
  phase: number,
  U: number,
  cloud: CloudCluster
): Pt[] {
  const pts: Pt[] = [];
  const steps = 32;
  const cosL = Math.cos(cloud.lean + cloud.baseTilt);
  const sinL = Math.sin(cloud.lean + cloud.baseTilt);
  const sc = U * cloud.scale * (1 + 0.04 * cloud.glow);

  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    const a = dir * u * TAU * turns + t * 0.6 + phase;
    const r = maxR * (1 - u * 0.82);
    const lx = (cx + Math.cos(a) * r) * cloud.flipX;
    const ly = (cy + Math.sin(a) * r * 0.78) * cloud.flipY;
    pts.push([
      cloud.x + (lx * cosL - ly * sinL) * sc,
      cloud.y + (lx * sinL + ly * cosL) * sc,
    ]);
  }
  return pts;
}

function toScreen(cloud: CloudCluster, U: number, pts: Pt[]): Pt[] {
  const c = Math.cos(cloud.lean + cloud.baseTilt);
  const s = Math.sin(cloud.lean + cloud.baseTilt);
  const sc = U * cloud.scale * (1 + 0.045 * cloud.glow);
  return pts.map(([x, y]) => {
    const fx = x * cloud.flipX;
    const fy = y * cloud.flipY;
    return [
      cloud.x + (fx * c - fy * s) * sc,
      cloud.y + (fx * s + fy * c) * sc,
    ];
  });
}

function traceSmooth(ctx: CanvasRenderingContext2D, p: Pt[]) {
  if (p.length < 3) return;
  ctx.beginPath();
  ctx.moveTo((p[0][0] + p[p.length - 1][0]) / 2, (p[0][1] + p[p.length - 1][1]) / 2);
  for (let i = 0; i < p.length; i++) {
    const a = p[i];
    const b = p[(i + 1) % p.length];
    ctx.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
  }
  ctx.closePath();
}

function traceOpenCurve(ctx: CanvasRenderingContext2D, p: Pt[]) {
  if (p.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(p[0][0], p[0][1]);
  for (let i = 1; i < p.length - 1; i++) {
    const xc = (p[i][0] + p[i + 1][0]) / 2;
    const yc = (p[i][1] + p[i + 1][1]) / 2;
    ctx.quadraticCurveTo(p[i][0], p[i][1], xc, yc);
  }
  ctx.lineTo(p[p.length - 1][0], p[p.length - 1][1]);
}

function makeHitPath(p: Pt[], dpr: number): Path2D {
  const path = new Path2D();
  if (!p.length) return path;
  path.moveTo(p[0][0] * dpr, p[0][1] * dpr);
  for (let i = 1; i < p.length; i++) {
    path.lineTo(p[i][0] * dpr, p[i][1] * dpr);
  }
  path.closePath();
  return path;
}

function radialGrad(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  stops: [number, string][]
) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  for (const [o, col] of stops) g.addColorStop(o, col);
  return g;
}

function drawStar4(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  rot: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const rr = i % 2 ? r * 0.32 : r;
    const a = (i / 8) * TAU;
    ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function startMegaMendungStage(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  let W = 1440;
  let H = 800;
  let DPR = 1;
  let U = 240;

  // 6 Gugus Awan Mega Mendung yang membingkai pinggir kiri & kanan teks "KAIKI"
  const clouds: CloudCluster[] = [
    // KIRI ATAS (Kanopi Mega Mendung Utama Kiri)
    {
      id: 0,
      anchorX: 0.13,
      anchorY: 0.21,
      scale: 1.05,
      flipX: 1,
      flipY: 1,
      baseTilt: -0.08,
      phase: 0.2,
      speed: 1.1,
      x: 0, y: 0, vx: 0, vy: 0, sq: 0, sqv: 0, lean: 0, lv: 0, glow: 0, hover: false, path: null,
    },
    // KIRI TENGAH-PINGGIR (Awan Pendamping Kiri)
    {
      id: 1,
      anchorX: 0.06,
      anchorY: 0.54,
      scale: 0.72,
      flipX: -1,
      flipY: 1,
      baseTilt: 0.06,
      phase: 1.9,
      speed: 1.35,
      x: 0, y: 0, vx: 0, vy: 0, sq: 0, sqv: 0, lean: 0, lv: 0, glow: 0, hover: false, path: null,
    },
    // KIRI BAWAH (Mega Mendung Foreground Kiri)
    {
      id: 2,
      anchorX: 0.17,
      anchorY: 0.81,
      scale: 0.96,
      flipX: 1,
      flipY: 1,
      baseTilt: 0.05,
      phase: 3.4,
      speed: 0.95,
      x: 0, y: 0, vx: 0, vy: 0, sq: 0, sqv: 0, lean: 0, lv: 0, glow: 0, hover: false, path: null,
    },
    // KANAN ATAS (Kanopi Mega Mendung Utama Kanan)
    {
      id: 3,
      anchorX: 0.87,
      anchorY: 0.20,
      scale: 1.06,
      flipX: -1,
      flipY: 1,
      baseTilt: 0.08,
      phase: 1.1,
      speed: 1.05,
      x: 0, y: 0, vx: 0, vy: 0, sq: 0, sqv: 0, lean: 0, lv: 0, glow: 0, hover: false, path: null,
    },
    // KANAN TENGAH-PINGGIR (Awan Pendamping Kanan)
    {
      id: 4,
      anchorX: 0.94,
      anchorY: 0.52,
      scale: 0.74,
      flipX: 1,
      flipY: 1,
      baseTilt: -0.07,
      phase: 2.7,
      speed: 1.3,
      x: 0, y: 0, vx: 0, vy: 0, sq: 0, sqv: 0, lean: 0, lv: 0, glow: 0, hover: false, path: null,
    },
    // KANAN BAWAH (Mega Mendung Foreground Kanan)
    {
      id: 5,
      anchorX: 0.83,
      anchorY: 0.82,
      scale: 0.98,
      flipX: -1,
      flipY: 1,
      baseTilt: -0.05,
      phase: 4.5,
      speed: 1.0,
      x: 0, y: 0, vx: 0, vy: 0, sq: 0, sqv: 0, lean: 0, lv: 0, glow: 0, hover: false, path: null,
    },
  ];

  const parts: SparkParticle[] = [];
  const rips: CloudRipple[] = [];

  const pointer = {
    x: 0,
    y: 0,
    present: false,
  };

  const burstSparks = (x: number, y: number, count: number) => {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * TAU;
      const v = ((140 + Math.random() * 360) * U) / 300;
      parts.push({
        x,
        y,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v - 40,
        t: 0,
        life: 0.65 + Math.random() * 0.55,
        s: ((3 + Math.random() * 5.5) * U) / 300,
        c: COLORS.sparks[i % COLORS.sparks.length],
        rot: Math.random() * TAU,
        vr: (Math.random() - 0.5) * 7,
        star: Math.random() < 0.65,
      });
    }
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const nextW = Math.max(300, Math.round(rect.width) || window.innerWidth);
    const nextH = Math.max(300, Math.round(rect.height) || window.innerHeight);
    const nextDPR = Math.min(window.devicePixelRatio || 1, 2);

    W = nextW;
    H = nextH;
    DPR = nextDPR;
    const isMobile = W < 768;
    U = Math.max(125, Math.min(W, H) * (isMobile ? 0.32 : 0.29));

    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);

    for (const c of clouds) {
      const ax = W * c.anchorX;
      const ay = H * c.anchorY;
      if (c.x === 0 && c.y === 0) {
        c.x = ax;
        c.y = ay;
      }
    }
  };

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  window.addEventListener("resize", resize);

  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    if (e.clientY < rect.top - 100 || e.clientY > rect.bottom + 100) return;
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.present = true;
  };

  const onPointerDown = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (y < 0 || y > rect.height) return;

    pointer.x = x;
    pointer.y = y;
    pointer.present = true;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    let hitAny = false;
    for (const c of clouds) {
      if (c.path && ctx.isPointInPath(c.path, x * DPR, y * DPR)) {
        hitAny = true;
        c.sqv += 5.8;
        c.glow = 1;
        burstSparks(x, y, 20);
        rips.push({ x: c.x, y: c.y, t: 0, big: true });
      }
    }

    if (!hitAny) {
      rips.push({ x, y, t: 0, big: false });
      burstSparks(x, y, 8);
    }
  };

  const onPointerLeave = () => {
    pointer.present = false;
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  document.addEventListener("pointerleave", onPointerLeave);

  let isVisible = false;
  const io = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
    },
    { threshold: 0.05 }
  );
  io.observe(canvas);

  let elapsed = 0;
  let last = performance.now();
  let raf = 0;

  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(0.033, Math.max(0.001, (now - last) / 1000));
    last = now;
    if (!isVisible) return;

    elapsed += dt;
    const t = elapsed;

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // 1. Render Click Ripples
    for (let i = rips.length - 1; i >= 0; i--) {
      const r = rips[i];
      r.t += dt;
      if (r.t > 1.1) {
        rips.splice(i, 1);
        continue;
      }
      const u = r.t / 1.1;
      const rad = (r.big ? U * 0.35 : U * 0.05) + u * U * (r.big ? 0.65 : 0.35);
      ctx.lineWidth = (r.big ? 2.2 : 1.4) * (1 - u) + 0.4;
      ctx.strokeStyle = rgba(COLORS.ripple, Math.pow(1 - u, 2) * 0.55);
      ctx.beginPath();
      ctx.arc(r.x, r.y, rad, 0, TAU);
      ctx.stroke();
    }

    // 2. Update & Render Each Mega Mendung Cloud Cluster (Ghost Buddy Shader Pipeline)
    for (const cloud of clouds) {
      const ax = W * cloud.anchorX;
      const ay = H * cloud.anchorY;

      // Gerakan melayang organik + respons parallax terhadap kursor
      const driftX = Math.cos(t * 0.85 * cloud.speed + cloud.phase) * U * 0.075;
      const driftY = Math.sin(t * 1.15 * cloud.speed + cloud.phase) * U * 0.045;

      let pullX = 0;
      let pullY = 0;
      if (pointer.present) {
        const dx = pointer.x - ax;
        const dy = pointer.y - ay;
        const dist = Math.hypot(dx, dy) || 1;
        const influence = Math.max(0, 1 - dist / (W * 0.55));
        pullX = clamp(dx * 0.09 * influence, -U * 0.18, U * 0.18);
        pullY = clamp(dy * 0.07 * influence, -U * 0.14, U * 0.14);
      }

      const tx = ax + driftX + pullX;
      const ty = ay + driftY + pullY;

      cloud.vx += ((tx - cloud.x) * 24 - cloud.vx * 7.2) * dt;
      cloud.vy += ((ty - cloud.y) * 24 - cloud.vy * 7.2) * dt;
      cloud.x += cloud.vx * dt;
      cloud.y += cloud.vy * dt;

      // Spring squish & lean
      cloud.sqv += (-cloud.sq * 180 - cloud.sqv * 8.5) * dt;
      cloud.sq += cloud.sqv * dt;

      const targetLean = clamp((cloud.vx / U) * 0.09, -0.12, 0.12);
      cloud.lv += (targetLean - cloud.lean) * 50 * dt - cloud.lv * 8.5 * dt;
      cloud.lean += cloud.lv * dt;

      // Hit test hover
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      cloud.hover = !!(
        cloud.path &&
        pointer.present &&
        ctx.isPointInPath(cloud.path, pointer.x * DPR, pointer.y * DPR)
      );
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      cloud.glow = lerp(cloud.glow, cloud.hover ? 1 : 0, 1 - Math.exp(-dt * 6));

      const R = U * cloud.scale;
      const outerLocal = megaMendungContour(1.0, t, cloud.phase, cloud.sq);
      const outerScr = toScreen(cloud, U, outerLocal);
      cloud.path = makeHitPath(outerScr, DPR);

      // Ambient Aura Glow di belakang awan
      ctx.fillStyle = radialGrad(ctx, cloud.x, cloud.y, R * 1.15, [
        [0, rgba(COLORS.auraCyan, 0.24 + 0.18 * cloud.glow)],
        [0.55, rgba(COLORS.auraViolet, 0.12 + 0.1 * cloud.glow)],
        [1, "rgba(0,0,0,0)"],
      ]);
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, R * 1.15, 0, TAU);
      ctx.fill();

      // RGB-Split Chromatic Edge (Persis seperti Ghost Buddy)
      const split = R * (0.014 + 0.015 * cloud.glow + Math.abs(cloud.sq) * 0.04);
      ctx.save();
      ctx.translate(-split, 0);
      ctx.strokeStyle = rgba(COLORS.edgeCyan, 0.45 + 0.2 * cloud.glow);
      ctx.lineWidth = Math.max(1.5, R * 0.014);
      traceSmooth(ctx, outerScr);
      ctx.stroke();

      ctx.translate(split * 2, 0);
      ctx.strokeStyle = rgba(COLORS.edgeBlue, 0.36 + 0.2 * cloud.glow);
      traceSmooth(ctx, outerScr);
      ctx.stroke();
      ctx.restore();

      // Body Glass Fill & Inner Light Pools
      ctx.save();
      traceSmooth(ctx, outerScr);
      ctx.clip();

      const topY = cloud.y - R * 0.55;
      const botY = cloud.y + R * 0.45;
      const bodyGrad = ctx.createLinearGradient(cloud.x - R * 0.6, topY, cloud.x + R * 0.6, botY);
      bodyGrad.addColorStop(0, COLORS.bodyTop);
      bodyGrad.addColorStop(0.52, COLORS.bodyMid);
      bodyGrad.addColorStop(1, COLORS.bodyBottom);
      ctx.fillStyle = bodyGrad;
      ctx.fillRect(cloud.x - R * 1.3, cloud.y - R * 0.9, R * 2.6, R * 1.8);

      // Additive Inner Pools
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = radialGrad(ctx, cloud.x - R * 0.28, cloud.y - R * 0.18, R * 0.72, [
        [0, rgba(COLORS.innerBlue, 0.48 + 0.25 * cloud.glow)],
        [1, "rgba(0,0,0,0)"],
      ]);
      ctx.fillRect(cloud.x - R * 1.3, cloud.y - R * 0.9, R * 2.6, R * 1.8);

      ctx.fillStyle = radialGrad(ctx, cloud.x + R * 0.32, cloud.y + R * 0.12, R * 0.68, [
        [0, rgba(COLORS.innerCyan, 0.42 + 0.25 * cloud.glow)],
        [1, "rgba(0,0,0,0)"],
      ]);
      ctx.fillRect(cloud.x - R * 1.3, cloud.y - R * 0.9, R * 2.6, R * 1.8);

      ctx.globalCompositeOperation = "source-over";

      // Scanlines lembut di dalam bodi kaca awan
      ctx.globalAlpha = 0.075;
      ctx.fillStyle = COLORS.scanline;
      const step = Math.max(3, R * 0.016);
      const off = (t * R * 0.035) % step;
      for (let y = topY - step + off; y < botY + R * 0.2; y += step) {
        ctx.fillRect(cloud.x - R * 1.2, y, R * 2.4, Math.max(1, step * 0.34));
      }
      ctx.globalAlpha = 1;

      // ── 5 Lapisan Kontur Gradasi Khas Mega Mendung Cirebon ────────
      const ringScales = [0.92, 0.80, 0.67, 0.53, 0.38];
      for (let rIdx = 0; rIdx < ringScales.length; rIdx++) {
        const sc = ringScales[rIdx];
        const ringPts = toScreen(
          cloud,
          U,
          megaMendungContour(sc, t - rIdx * 0.18, cloud.phase, cloud.sq)
        );
        const col = COLORS.gradasiRings[rIdx];
        const pulse = 0.55 + 0.25 * Math.sin(t * 2.2 - rIdx * 0.7 + cloud.phase);

        ctx.strokeStyle = rgba(col, (0.32 + rIdx * 0.08 + cloud.glow * 0.22) * pulse);
        ctx.lineWidth = Math.max(1.4, R * (0.022 - rIdx * 0.0025));
        traceSmooth(ctx, ringPts);
        ctx.stroke();
      }

      // ── Gelung Ulir Spiral Khas Mega Mendung (Kiri, Tengah, Kanan) ─
      ctx.lineCap = "round";
      const spirals = [
        { cx: -0.62, cy: 0.14, r: 0.16, turns: 1.35, dir: 1 as const },
        { cx: -0.02, cy: -0.06, r: 0.22, turns: 1.5, dir: -1 as const },
        { cx: 0.62, cy: 0.13, r: 0.16, turns: 1.35, dir: -1 as const },
      ];
      for (const sp of spirals) {
        const sPts = buildSpiralCurve(
          sp.cx,
          sp.cy,
          sp.r,
          sp.turns,
          sp.dir,
          t,
          cloud.phase,
          U,
          cloud
        );
        ctx.strokeStyle = rgba(COLORS.innerIce, 0.48 + 0.28 * cloud.glow);
        ctx.lineWidth = Math.max(1.5, R * 0.015);
        traceOpenCurve(ctx, sPts);
        ctx.stroke();
      }

      ctx.restore();

      // Garis Tepi Luar Kaca (Hairline & Specular Top Highlight)
      ctx.strokeStyle = rgba(COLORS.gradasiRings[0], 0.42 + 0.3 * cloud.glow);
      ctx.lineWidth = 1.4;
      traceSmooth(ctx, outerScr);
      ctx.stroke();

      // Specular Arc di Puncak Kubah Awan
      ctx.save();
      ctx.translate(cloud.x, cloud.y);
      ctx.rotate(cloud.lean + cloud.baseTilt);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = rgba(COLORS.specular, 0.62 + 0.25 * cloud.glow);
      ctx.lineWidth = Math.max(2, R * 0.018);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(-R * 0.02 * cloud.flipX, -R * 0.12, R * 0.32, Math.PI * 1.15, Math.PI * 1.68);
      ctx.stroke();
      ctx.restore();
    }

    // 3. Update & Render Sparkle Stars
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.t += dt;
      if (p.t > p.life) {
        parts.splice(i, 1);
        continue;
      }
      p.vx *= Math.exp(-2.6 * dt);
      p.vy = p.vy * Math.exp(-2.6 * dt) + 36 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;

      const u = p.t / p.life;
      const a = Math.pow(1 - u, 1.4);
      ctx.fillStyle = rgba(p.c, a);
      if (p.star) {
        drawStar4(ctx, p.x, p.y, p.s * (1 - u * 0.3), p.rot);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s * 0.36, 0, TAU);
        ctx.fill();
      }
    }
  };

  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("pointerleave", onPointerLeave);
  };
}
