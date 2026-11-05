"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// What rises into view as you scroll. Anything already on screen when the page opens is left alone
// (the hero has its own entrance in CSS), so nothing visible ever blinks out.
const REVEAL = [
  "main h2", "main .lead", "main .brand-text", "main .sheet", "main .sheet-notes li", "main .routes li", "main .services li",
  "main figure", "main .fleet-head a", "main .close-side", "main .logo-tile", "main .logo-meta", "main .swatches li",
  "main .type-card", "main .spec-list > div", "main .voice-list li", "main .donts li", "main .card-face", "main .faq-item",
  "main .well", "main .row", "main .note", "main form fieldset", ".footer-top > *", ".footer-base > *",
].join(",");

/**
 * Site-wide motion. Sections rise in as they scroll into view, and every animated logo restarts its
 * drawing when it comes into view and pauses when it leaves, so the footer and closing band draw
 * themselves in front of you instead of mid-cycle. Does nothing under reduced motion.
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fold = window.innerHeight;

    const items = [...document.querySelectorAll(REVEAL)].filter((el) => el.getBoundingClientRect().top > fold * 0.92);
    const counts = new Map();
    for (const el of items) {
      const i = counts.get(el.parentElement) ?? 0;
      counts.set(el.parentElement, i + 1);
      el.style.setProperty("--rv-delay", `${(i % 6) * 70}ms`);
      el.classList.add("rv");
    }
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("rv-in");
          reveal.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => reveal.observe(el));

    const logos = [...document.querySelectorAll(".logo svg")].filter((svg) => svg.querySelector(".vl-trace"));
    const restart = (svg) => {
      svg.setCurrentTime?.(0);
      svg.unpauseAnimations?.();
      svg.getAnimations?.({ subtree: true }).forEach((a) => { a.currentTime = 0; a.play(); });
    };
    const pause = (svg) => {
      svg.pauseAnimations?.();
      svg.getAnimations?.({ subtree: true }).forEach((a) => a.pause());
    };
    const seen = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? restart(e.target) : pause(e.target))),
      { threshold: 0.35 },
    );
    logos.forEach((svg) => seen.observe(svg));

    return () => {
      reveal.disconnect();
      seen.disconnect();
      items.forEach((el) => el.classList.remove("rv", "rv-in"));
    };
  }, [pathname]);

  return null;
}
