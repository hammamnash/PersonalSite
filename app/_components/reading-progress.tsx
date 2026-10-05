"use client";

import { useEffect, useRef } from "react";

const SECTION_IDS = [
  "home",
  "work",
  "about",
  "projects",
  "exploring-ai",
  "tools",
  "contact",
];

/**
 * Orientation feedback: a top reading-progress bar plus a current-section
 * highlight in the nav. Both are progressive enhancements — without JS the
 * page renders exactly as before (visible content, no highlight).
 */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const links = new Map<string, HTMLAnchorElement>();
    document
      .querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]')
      .forEach((link) => {
        const target = link.getAttribute("href");
        if (target) links.set(target.slice(1), link);
      });

    const doc = document.documentElement;
    const clearance =
      Number.parseFloat(getComputedStyle(doc).scrollPaddingTop) || 160;
    let frame = 0;

    const update = () => {
      frame = 0;

      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.setProperty("--progress", String(progress));

      const line = clearance + 8;
      let current = "";
      for (const id of SECTION_IDS) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= line) current = id;
      }
      if (max > 0 && window.scrollY >= max - 2) current = SECTION_IDS.at(-1) ?? "";

      links.forEach((link, id) => {
        if (id === current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return <div className="reading-progress" ref={barRef} aria-hidden="true" />;
}
