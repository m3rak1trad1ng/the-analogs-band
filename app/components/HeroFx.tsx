"use client";

import { useEffect } from "react";

/**
 * The hero's one behavior. No rendering — it only sets an attribute that the
 * stylesheet reacts to.
 *
 * Sets `data-hot` on the hero while "Book the band" or the meter itself is
 * hovered, focused or touched. The stylesheet turns that into the meter going
 * into the red: needle pinned, peak lamp lit, dial brighter, the signal on
 * both sides surging.
 * ⚠ An attribute rather than a CSS :hover chain so a TAP works too — a phone
 * has no hover, and most of this traffic is a phone. A tap holds it for a
 * second and a half, long enough to be seen.
 */
export default function HeroFx() {
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

    return () => clearTimeout(timer);
  }, []);
  return null;
}
