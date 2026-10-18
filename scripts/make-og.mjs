// Builds the share card — the picture a text message, Facebook or Slack shows
// when someone sends the link — and gives it a new address every time it
// changes.
//
// ⛔ WHY THE ADDRESS CHANGES. The card used to live at /og.jpg for every
//    version of the site. Phones and social sites save a preview against the
//    image's address, so after a redesign people kept being shown the OLD look
//    when the link was shared (the band hit exactly this, 2026-10-18). The file
//    is now named after a fingerprint of its own pixels — og-<hash>.png — so a
//    new design is a new address that nothing has cached.
//
// ⭐ WHY IT RUNS ON EVERY BUILD. It is wired to `prebuild`, so the GitHub
//    deploy regenerates it from the current content.ts and theme each time.
//    It cannot fall behind the site because nobody has to remember it.
//
// ⚠ If no Chrome is found it keeps the card that is already committed and
//   says so, rather than failing the deploy.
//
//   node scripts/make-og.mjs
import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync, mkdtempSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const pub = join(root, "public");
const content = readFileSync(join(root, "app/content.ts"), "utf8");
const pick = (key) => (content.match(new RegExp(`\\n  ${key}: "([^"]*)"`)) || [])[1] ?? "";
const theme = pick("theme"), tagline = pick("tagline"), city = pick("city");
const host = pick("url").replace(/^https?:\/\//, "");

const light = theme && theme !== "koda-dark";
const logo = theme === "koda-dark" ? "brand/logo-cream.png" : theme ? "brand/logo-ink.png" : "brand/logo.webp";
const P = theme === "pastel"
  ? { bg: "#f7f0e6", ink: "#2b2a33", sub: "#6d6a75", bars: ["#a9d4c5", "#f3d68a", "#eaa9a2", "#aebbe6"] }
  : theme === "koda-dark"
  ? { bg: "#1d242c", ink: "#f2e8d5", sub: "#a9a59b", bars: ["#2e8f8a", "#e3a72b", "#cf4a2b", "#4f8fb8"] }
  : theme
  ? { bg: "#f2e8d5", ink: "#1f2428", sub: "#5d6166", bars: ["#2e8f8a", "#e3a72b", "#cf4a2b", "#4f8fb8"] }
  : { bg: "#050505", ink: "#e6cf9c", sub: "#a8977a", bars: [] };

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&family=Playfair+Display:ital,wght@1,700&display=block" rel="stylesheet">
<style>
  html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:${P.bg}}
  .c{position:relative;width:1200px;height:630px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;box-sizing:border-box;padding-bottom:${P.bars.length ? 36 : 0}px}
  img{width:${light ? 560 : 640}px;height:auto;${light ? "" : "mix-blend-mode:lighten;"}}
  .t{font:italic 700 46px/1.05 "Playfair Display",Georgia,serif;color:${P.ink};margin-top:4px}
  .s{font:500 19px/1 Oswald,"Arial Narrow",sans-serif;letter-spacing:.26em;text-transform:uppercase;color:${P.sub};margin-top:10px}
  .b{position:absolute;left:0;right:0;bottom:0;height:30px;display:flex}
  .b i{flex:1}
</style></head><body><div class="c">
  <img src="file://${join(pub, logo)}">
  ${tagline ? `<div class="t">${tagline}</div>` : ""}
  <div class="s">${[city, host].filter(Boolean).join("  ·  ")}</div>
  ${P.bars.length ? `<div class="b">${P.bars.map((c) => `<i style="background:${c}"></i>`).join("")}</div>` : ""}
</div></body></html>`;

const work = mkdtempSync(join(tmpdir(), "og-"));
writeFileSync(join(work, "card.html"), html);
const shot = join(work, "card.png");

const candidates = [process.env.CHROME, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "google-chrome-stable", "google-chrome", "chromium", "chromium-browser"].filter(Boolean);
const chrome = candidates.find((c) => c.startsWith("/") ? existsSync(c) : spawnSync("which", [c]).status === 0);

const ogTs = join(root, "app/og-image.ts");
if (!chrome) {
  console.warn("make-og: no Chrome found — keeping the share card already committed.");
  process.exit(0);
}
const r = spawnSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-sandbox",
  "--allow-file-access-from-files", `--user-data-dir=${join(work, "profile")}`, "--virtual-time-budget=4000",
  "--window-size=1200,630", `--screenshot=${shot}`, `file://${join(work, "card.html")}`], { timeout: 60000 });
if (!existsSync(shot)) {
  console.warn("make-og: Chrome did not write a screenshot — keeping the committed card.", r.stderr?.toString().slice(-300));
  process.exit(0);
}

const png = readFileSync(shot);
const name = `og-${createHash("sha256").update(png).digest("hex").slice(0, 10)}.png`;
for (const f of readdirSync(pub)) if (/^og(-[0-9a-f]+)?\.(png|jpg)$/.test(f) && f !== name) unlinkSync(join(pub, f));
writeFileSync(join(pub, name), png);
writeFileSync(ogTs, `// Written by scripts/make-og.mjs on every build — do not edit by hand.\n// The name is a fingerprint of the image, so a changed card is a new address.\nexport const OG_IMAGE = "/${name}";\n`);
console.log(`make-og: ${name} (${theme || "gold"} theme)`);
