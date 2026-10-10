"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's live behavior: three things, all of which degrade to nothing.
 *
 * 1. `data-hot` on the hero while "Book the band" or the meter itself is
 *    hovered, focused or touched — the stylesheet turns that into the meter
 *    going into the red.
 *    ⚠ An attribute rather than a CSS :hover chain so a TAP works too. A tap
 *    holds it for a second and a half, long enough to be seen.
 *
 * 2. A spotlight that follows the pointer: two CSS variables, --mx and --my,
 *    that a radial gradient in the stylesheet is positioned by.
 *
 * 3. Dust in the light. A stage has haze in it, and motes drifting through a
 *    beam are what make light look like light. A small canvas, a few dozen
 *    points.
 *    ⛔ It stops when the hero is off screen and never starts for someone who
 *    asked for reduced motion — an animation nobody can see is battery spent
 *    on nothing.
 */
export default function HeroFx() {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero) return;

    const triggers = hero.querySelectorAll<HTMLElement>("[data-hot], .meter");
    let timer: ReturnType<typeof setTimeout> | undefined;
    const on = () => { clearTimeout(timer); hero.setAttribute("data-hot", ""); };
    const off = () => { clearTimeout(timer); hero.removeAttribute("data-hot"); };
    const tap = () => { on(); timer = setTimeout(off, 1500); };
    triggers.forEach((t) => {
      t.addEventListener("pointerenter", (e) => (e as PointerEvent).pointerType === "mouse" && on());
      t.addEventListener("pointerleave", (e) => (e as PointerEvent).pointerType === "mouse" && off());
      t.addEventListener("focus", on);
      t.addEventListener("blur", off);
      t.addEventListener("pointerdown", (e) => (e as PointerEvent).pointerType !== "mouse" && tap());
    });

    const move = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
      hero.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
      hero.setAttribute("data-lit", "");
    };
    const leave = () => hero.removeAttribute("data-lit");
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);

    /* ---- dust ---- */
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    let io: IntersectionObserver | undefined;
    if (c && ctx && !still) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let w = 0, h = 0;
      const size = () => {
        w = hero.clientWidth; h = hero.clientHeight;
        c.width = w * dpr; c.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      size();
      const n = Math.round(Math.min(70, Math.max(26, w / 22)));
      const motes = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: 0.5 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.12, vy: -0.05 - Math.random() * 0.16,
        a: 0.12 + Math.random() * 0.4, tw: Math.random() * Math.PI * 2,
      }));
      const tick = () => {
        raf = 0;
        if (!visible) return;
        ctx.clearRect(0, 0, w, h);
        for (const m of motes) {
          m.x += m.vx; m.y += m.vy; m.tw += 0.012;
          if (m.y < -4) { m.y = h + 4; m.x = Math.random() * w; }
          if (m.x < -4) m.x = w + 4;
          if (m.x > w + 4) m.x = -4;
          /* Brightest in the middle of the stage, where the beams cross. */
          const centre = 1 - Math.min(1, Math.abs(m.x / w - 0.5) * 1.7);
          ctx.globalAlpha = m.a * (0.45 + 0.55 * Math.sin(m.tw) ** 2) * (0.25 + 0.75 * centre);
          ctx.fillStyle = "#f3dca6";
          ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2); ctx.fill();
        }
        raf = requestAnimationFrame(tick);
      };
      io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(tick);
      });
      io.observe(hero);
      window.addEventListener("resize", size);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      clearTimeout(timer);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      io?.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvas} className="hero-dust" aria-hidden="true" />;
}
