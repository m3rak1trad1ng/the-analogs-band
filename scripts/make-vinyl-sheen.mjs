// Renders public/brand/vinyl-sheen.png — the light reflecting off the record.
//
// Why an image and not a CSS gradient: the reflection on real vinyl is not a
// smooth wedge. Every groove catches the light at a slightly different angle,
// so the highlight is ragged and streaky along its length, and its edges
// separate very slightly into color. A gradient cannot do either, and that
// smoothness is exactly what made the record read as a drawing. This computes
// it per pixel instead.
//
// The layer is rotationally "stable": it sits still over a disc that turns
// underneath it, which is what the light on a real turntable does.
//
//   node scripts/make-vinyl-sheen.mjs
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

const N = 1000;
const px = Buffer.alloc(N * N * 4);
const h = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const gaps = [176 / 198, 151 / 198, 131 / 198, 108 / 198];
const t0 = -1.02; // the main light, upper right
const ad = (a, b) => { const v = Math.abs(a - b) % (2 * Math.PI); return v > Math.PI ? 2 * Math.PI - v : v; };
const lobe = (th, off) => {
  const a = ad(th, t0 + off), b = ad(th, t0 + Math.PI + off);
  return Math.exp(-((a / 0.23) ** 2)) * 0.9 + Math.exp(-((a / 0.055) ** 2)) * 0.8
       + Math.exp(-((b / 0.19) ** 2)) * 0.62 + Math.exp(-((b / 0.045) ** 2)) * 0.5
       + Math.exp(-((ad(th, t0 + 1.35 + off) / 0.07) ** 2)) * 0.16;
};
for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
  const dx = (i + 0.5 - N / 2) / (N / 2), dy = (j + 0.5 - N / 2) / (N / 2);
  const r = Math.hypot(dx, dy), th = Math.atan2(dy, dx), k = (j * N + i) * 4;
  if (r < 0.455 || r > 0.985) continue;
  const g1 = Math.floor(r * 430), ring = h(g1), ring2 = h(Math.floor(r * 97) + 900);
  let fine = (0.42 + 0.58 * ring) * (0.75 + 0.25 * ring2);
  let gap = 0; for (const g of gaps) gap = Math.max(gap, Math.exp(-(((r - g) / 0.011) ** 2)));
  fine = fine * (1 - gap) + 0.55 * gap;
  const jit = (h(g1 + 50) - 0.5) * 0.05; // each groove throws the light a little differently
  const R = lobe(th + jit, 0.035), G = lobe(th + jit, 0), B = lobe(th + jit, -0.035);
  const edge = Math.min(1, (0.985 - r) / 0.02) * Math.min(1, (r - 0.455) / 0.02);
  const m = Math.max(R, G, B) * fine * edge, mx = Math.max(R, G, B, 1e-6);
  const a = Math.min(1, m * 0.62) + 0.018 * ring * edge;
  px[k] = 255 * (0.82 + 0.18 * R / mx);
  px[k + 1] = 255 * (0.80 + 0.18 * G / mx) * 0.985;
  px[k + 2] = 255 * (0.72 + 0.2 * B / mx);
  px[k + 3] = Math.min(255, a * 255);
}

// minimal PNG writer (RGBA, 8-bit)
const crcT = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc = (b) => { let c = 0xffffffff; for (const v of b) c = crcT[(c ^ v) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (t, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(t), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([len, td, c]); };
const raw = Buffer.alloc((N * 4 + 1) * N);
for (let y = 0; y < N; y++) px.copy(raw, y * (N * 4 + 1) + 1, y * N * 4, (y + 1) * N * 4);
const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(N, 0); ihdr.writeUInt32BE(N, 4); ihdr[8] = 8; ihdr[9] = 6;
const out = new URL("../public/brand/vinyl-sheen.png", import.meta.url);
writeFileSync(out, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]));
console.log("wrote", out.pathname);
