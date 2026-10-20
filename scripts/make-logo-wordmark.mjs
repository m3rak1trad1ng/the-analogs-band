// Cuts the lettering out of the logo: "THE", "ANALOGS" and the swash under it,
// without the instruments, the oval or the stars.
//
// The band asked (2026-10-19) for just the text in the nav and at the top of
// the front page. The full logo stays everywhere else (footer, album sleeve,
// share card).
//
// How: every separate shape in the logo is found (connected pixels), and a
// shape is kept only if it sits in the lettering's band of the image. The
// instruments all start lower than the lettering does, and the oval and stars
// sit above or below it. The kept shapes are then cropped tight.
//
//   node scripts/make-logo-wordmark.mjs      (after make-logo-variants.mjs)
import { inflateSync, deflateSync } from "node:zlib";
import { readFileSync, writeFileSync } from "node:fs";

const dir = new URL("../public/brand/", import.meta.url);
const read = (file) => {
  const src = readFileSync(new URL(file, dir)); let p = 8, W = 0, H = 0; const idat = [];
  while (p < src.length) { const len = src.readUInt32BE(p), t = src.toString("ascii", p + 4, p + 8), d = src.subarray(p + 8, p + 8 + len);
    if (t === "IHDR") { W = d.readUInt32BE(0); H = d.readUInt32BE(4); } if (t === "IDAT") idat.push(d); p += 12 + len; }
  const raw = inflateSync(Buffer.concat(idat)), stride = W * 4, px = Buffer.alloc(W * H * 4);
  for (let y = 0; y < H; y++) { const f = raw[y * (stride + 1)], line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) { const a = x >= 4 ? px[y * stride + x - 4] : 0, b = y ? px[(y - 1) * stride + x] : 0, c = x >= 4 && y ? px[(y - 1) * stride + x - 4] : 0;
      let v = line[x]; if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) { const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
      px[y * stride + x] = v & 255; } }
  return { W, H, px };
};
const crcT = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc = (b) => { let c = 0xffffffff; for (const v of b) c = crcT[(c ^ v) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
const write = (file, W, H, px) => {
  const out = Buffer.alloc((W * 4 + 1) * H); for (let y = 0; y < H; y++) px.copy(out, y * (W * 4 + 1) + 1, y * W * 4, (y + 1) * W * 4);
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 6;
  writeFileSync(new URL(file, dir), Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(out, { level: 9 })), chunk("IEND", Buffer.alloc(0))]));
};

// Which shapes to keep — decided once, from the ink version, and applied to both.
const { W, H, px } = read("logo-ink.png");
const on = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) on[i] = px[i * 4 + 3] > 8 ? 1 : 0;
const lab = new Int32Array(W * H), keep = new Set(); let n = 0;
let X0 = W, Y0 = H, X1 = 0, Y1 = 0;
for (let i = 0; i < W * H; i++) {
  if (!on[i] || lab[i]) continue; n++; const st = [i], mem = []; let x0 = W, y0 = H, x1 = 0, y1 = 0; lab[i] = n;
  while (st.length) { const k = st.pop(), x = k % W, y = (k / W) | 0; mem.push(k);
    if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const xx = x + dx, yy = y + dy;
      if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; const kk = yy * W + xx; if (on[kk] && !lab[kk]) { lab[kk] = n; st.push(kk); } } }
  // ⭐ The lettering band: "THE" starts at y≈222, the swash ends at y≈714.
  //   Stars and the top of the oval start above 215; every instrument and the
  //   bottom of the oval start below 540 or run past 730.
  if (y0 > 215 && y0 < 540 && y1 < 730) {
    keep.add(n); if (x0 < X0) X0 = x0; if (y0 < Y0) Y0 = y0; if (x1 > X1) X1 = x1; if (y1 > Y1) Y1 = y1;
  }
}
const pad = 12; X0 = Math.max(0, X0 - pad); Y0 = Math.max(0, Y0 - pad); X1 = Math.min(W - 1, X1 + pad); Y1 = Math.min(H - 1, Y1 + pad);
const cw = X1 - X0 + 1, ch = Y1 - Y0 + 1;

for (const [from, to] of [["logo-ink.png", "wordmark-ink.png"], ["logo-cream.png", "wordmark-cream.png"]]) {
  const img = read(from), out = Buffer.alloc(cw * ch * 4);
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const sx = x + X0, sy = y + Y0, si = sy * W + sx, o = (y * cw + x) * 4;
    // Keep a pixel if it belongs to a kept shape, or is a faint edge pixel
    // touching one (anti-aliasing below the shape threshold).
    let k = keep.has(lab[si]);
    if (!k && img.px[si * 4 + 3] > 0) for (let dy = -1; dy <= 1 && !k; dy++) for (let dx = -1; dx <= 1 && !k; dx++) { const t = (sy + dy) * W + sx + dx; if (t >= 0 && t < W * H && keep.has(lab[t])) k = true; }
    if (k) img.px.copy(out, o, si * 4, si * 4 + 4);
  }
  write(to, cw, ch, out);
  console.log("wrote", to, `${cw}x${ch}`);
}
