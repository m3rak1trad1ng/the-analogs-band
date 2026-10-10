"use client";

import { useEffect } from "react";

/**
 * Sections ease in as you reach them. Taken from the Operational Systems site
 * templates, rules intact:
 *
 * ⛔ IntersectionObserver, never a scroll listener.
 * ⛔ The hidden state is applied BY THIS SCRIPT, not the stylesheet — if the
 *    script never runs, nothing is hidden and the page is simply all there.
 * ⛔ Nothing on the first screen is hidden; fading in what is already in view
 *    reads as a broken page.
 * ⚠ prefers-reduced-motion: does nothing at all.
 */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fold = window.innerHeight;
    const hide = Array.from(document.querySelectorAll<HTMLElement>("main section")).filter(
      (el) => el.getBoundingClientRect().top + window.scrollY > fold * 0.9,
    );
    for (const el of hide) el.setAttribute("data-reveal", "");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-reveal", "in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    for (const el of hide) io.observe(el);
    return () => io.disconnect();
  }, []);
  return null;
}
