// Verifies og-card.html layout metrics without a vision model.
import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "scripts", "og-card.html");

const browser = await chromium.launch({ channel: "msedge" });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(`file://${htmlPath}`);
  await page.evaluate(() => document.fonts.ready);
  const r = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const body = document.body;
    const lh = parseFloat(getComputedStyle(h1).lineHeight);
    return {
      dmSansLoaded: document.fonts.check('500 64px "DM Sans"'),
      h1Lines: Math.ceil(h1.getBoundingClientRect().height / lh),
      h1Overflow: h1.scrollWidth > h1.getBoundingClientRect().width,
      h1Width: Math.round(h1.getBoundingClientRect().width),
      bodyOverflow: body.scrollWidth > body.clientWidth,
      monogram: document.querySelector(".monogram").textContent.trim(),
      domain: document.querySelector(".domain").textContent.trim(),
      sub: document.querySelector(".sub").textContent.trim(),
      violetH: document.querySelector(".violet").getBoundingClientRect().height,
    };
  });
  console.log(JSON.stringify(r, null, 2));
} finally {
  await browser.close();
}