// Cuts the band's logo out of its black background.
//
// The logo arrived as gold lettering on a solid black rectangle. That is fine
// on a black page and wrong everywhere else: on cream it is a black box, and
// CSS blend modes only hide the box when nothing between the image and the
// page creates a stacking context — which the hero's entry animation does.
// So the brightness of each pixel becomes its opacity, and the rectangle is
// simply not there any more.
//
//   logo-ink.png    flat dark ink        (light, matte themes)
//   logo-cream.png  flat cream           (dark matte theme)
//
//   sips -s format png public/brand/logo.webp --out /tmp/logo-src.png
//   node scripts/make-logo-variants.mjs /tmp/logo-src.png
import { inflateSync, deflateSync } from "node:zlib";
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync(process.argv[2]);
let p = 8, W = 0, H = 0, ct = 0, idat = [];
while (p < src.length) {
  const len = src.readUInt32BE(p), type = src.toString("ascii", p + 4, p + 8), data = src.subarray(p + 8, p + 8 + len);
  if (type === "IHDR") { W = data.readUInt32BE(0); H = data.readUInt32BE(4); ct = data[9]; if (data[8] !== 8 || data[12] !== 0) throw new Error("need 8-bit, non-interlaced"); }
  if (type === "IDAT") idat.push(data);
  p += 12 + len;
}
const bpp = ct === 6 ? 4 : ct === 2 ? 3 : (() => { throw new Error("need RGB or RGBA, got color type " + ct); })();
const raw = inflateSync(Buffer.concat(idat)), stride = W * bpp, px = Buffer.alloc(W * H * bpp);
for (let y = 0; y < H; y++) {
  const f = raw[y * (stride + 1)], line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
  for (let x = 0; x < stride; x++) {
    const a = x >= bpp ? px[y * stride + x - bpp] : 0, b = y ? px[(y - 1) * stride + x] : 0, c = x >= bpp && y ? px[(y - 1) * stride + x - bpp] : 0;
    let v = line[x];
    if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
    else if (f === 4) { const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
    px[y * stride + x] = v & 255;
  }
}

const crcT = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc = (b) => { let c = 0xffffffff; for (const v of b) c = crcT[(c ^ v) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
const write = (name, fn) => {
  const out = Buffer.alloc((W * 4 + 1) * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * bpp, r = px[i], g = px[i + 1], b = px[i + 2];
    const [R, G, B, A] = fn(r, g, b, Math.max(r, g, b) / 255);
    const o = y * (W * 4 + 1) + 1 + x * 4;
    out[o] = R; out[o + 1] = G; out[o + 2] = B; out[o + 3] = A;
  }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 6;
  const file = new URL(`../public/brand/${name}`, import.meta.url);
  writeFileSync(file, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(out, { level: 9 })), chunk("IEND", Buffer.alloc(0))]));
  console.log("wrote", name);
};
const ss = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
// Flat versions: a steep ramp, so the bevel shading collapses to solid ink.
write("logo-ink.png", (r, g, b, l) => [31, 36, 40, Math.round(255 * ss(0.12, 0.4, l))]);
write("logo-cream.png", (r, g, b, l) => [242, 232, 213, Math.round(255 * ss(0.12, 0.4, l))]);
