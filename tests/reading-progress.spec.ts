import { expect, test } from "@playwright/test";

// Reduced motion makes anchor navigation instant, so scroll positions are
// deterministic when the assertions below read them (see globals.css).

test.describe("reading progress and current-section highlight", () => {
  test("progress bar tracks how far the page has been read", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const bar = page.locator(".reading-progress");
    await expect(bar).toBeAttached();

    const scale = () =>
      bar.evaluate((el) => {
        const transform = getComputedStyle(el).transform;
        return transform === "none" ? 1 : Number.parseFloat(transform.slice(7));
      });

    await expect.poll(scale).toBeLessThan(0.05);

    await page.evaluate(() =>
      window.scrollTo(0, document.documentElement.scrollHeight),
    );
    await expect.poll(scale).toBeGreaterThan(0.95);

    await page.evaluate(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, Math.round(max / 2));
    });
    await expect.poll(scale).toBeGreaterThan(0.4);
    expect(await scale()).toBeLessThan(0.6);
  });

  test("nav highlights the section currently in view", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator(".nav-links a")).toHaveCount(6);
    await expect(page.locator('[aria-current="location"]')).toHaveCount(0);

    for (const id of ["projects", "contact"]) {
      await page.locator(`.nav-links a[href="#${id}"]`).click();
      await expect(
        page.locator(`.nav-links a[href="#${id}"]`),
      ).toHaveAttribute("aria-current", "location");
      await expect(page.locator('[aria-current="location"]')).toHaveCount(1);
    }
  });

  test("degrades cleanly without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator(".reading-progress")).toBeAttached();
    await expect(page.locator('[aria-current="location"]')).toHaveCount(0);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();
    await context.close();
  });
});
