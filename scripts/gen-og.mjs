// Renders scripts/og-card.html to public/og.png at 1200x630.
// Run: node scripts/gen-og.mjs  (requires npm install already done)
import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "scripts", "og-card.html");
const outPath = path.join(root, "public", "og.png");

const browser = await chromium.launch({ channel: "msedge" });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(`file://${htmlPath}`);
  await page.screenshot({ path: outPath, type: "png" });
} finally {
  await browser.close();
}

const stat = fs.statSync(outPath);
console.log(`wrote ${outPath} (${stat.size} bytes)`);