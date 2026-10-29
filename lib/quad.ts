export type Point = { x: number; y: number };
export type Quad = [Point, Point, Point, Point];

export const segment = (t: number, from: number, to: number) =>
  Math.min(1, Math.max(0, (t - from) / (to - from)));

export const inOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

export const lerpQuad = (a: Quad, b: Quad, t: number): Quad =>
  a.map((p, i) => ({
    x: p.x + (b[i].x - p.x) * t,
    y: p.y + (b[i].y - p.y) * t,
  })) as Quad;

export const scaleQuad = (q: Quad, c: Point, s: number): Quad =>
  q.map((p) => ({
    x: c.x + (p.x - c.x) * s,
    y: c.y + (p.y - c.y) * s,
  })) as Quad;

export const rectQuad = (cx: number, cy: number, w: number, h: number): Quad => [
  { x: cx - w / 2, y: cy - h / 2 },
  { x: cx + w / 2, y: cy - h / 2 },
  { x: cx + w / 2, y: cy + h / 2 },
  { x: cx - w / 2, y: cy + h / 2 },
];

export function quadToMatrix3d(w: number, h: number, [p0, p1, p2, p3]: Quad): string {
  const dx1 = p1.x - p2.x, dy1 = p1.y - p2.y;
  const dx2 = p3.x - p2.x, dy2 = p3.y - p2.y;
  const sx = p0.x - p1.x + p2.x - p3.x;
  const sy = p0.y - p1.y + p2.y - p3.y;
  const det = dx1 * dy2 - dx2 * dy1 || 1e-6;
  const g = (sx * dy2 - dx2 * sy) / det;
  const k = (dx1 * sy - sx * dy1) / det;
  const a = p1.x - p0.x + g * p1.x;
  const b = p3.x - p0.x + k * p3.x;
  const d = p1.y - p0.y + g * p1.y;
  const e = p3.y - p0.y + k * p3.y;
  const m = [
    a / w, d / w, 0, g / w,
    b / h, e / h, 0, k / h,
    0, 0, 1, 0,
    p0.x, p0.y, 0, 1,
  ];
  return `matrix3d(${m.map((v) => +v.toFixed(8)).join(",")})`;
}

