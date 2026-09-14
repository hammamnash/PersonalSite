import { expect, test } from "@playwright/test";

for (const width of [375, 1440]) {
  test(`navbar scroll animates to its target at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => {
      const state = window as typeof window & { scrollSamples: number[] };
      state.scrollSamples = [];
      window.addEventListener("scroll", () => state.scrollSamples.push(window.scrollY));
    });
    await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Projects", exact: true }).click();
    await expect(page).toHaveURL(/#projects$/);
    await expect.poll(() => page.evaluate(() => {
      const target = document.querySelector("#projects")!;
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
      return Math.abs(target.getBoundingClientRect().top - offset);
    })).toBeLessThan(2);
    const samples = await page.evaluate(() => (window as typeof window & { scrollSamples: number[] }).scrollSamples);
    expect(new Set(samples).size).toBeGreaterThan(2);
    await expect(page.locator("html")).toHaveCSS("scroll-behavior", "smooth");
    await testInfo.attach("scroll-positions", { body: JSON.stringify(samples), contentType: "application/json" });
    await page.getByRole("link", { name: "Hammam, back to introduction" }).click();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  });
}

test("reduced motion keeps anchor navigation instant", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  const position = await page.locator("#projects").boundingBox();
  const offset = await page.locator("html").evaluate((element) => parseFloat(getComputedStyle(element).scrollPaddingTop));
  expect(Math.abs(position!.y - offset)).toBeLessThan(2);
});
