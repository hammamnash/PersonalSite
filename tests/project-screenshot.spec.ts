import { expect, test } from "@playwright/test";

const IMAGE_SRC = "/images/projects/runees/runees-dashboard.webp";

for (const width of [320, 768, 1440]) {
  test(`Runees card screenshot loads with honest caption at ${width}px`, async ({ page, request }, testInfo) => {
    await page.setViewportSize({ width, height: 960 });
    await page.goto("/");
    const card = page.locator("#projects details").first();
    await card.locator("summary").focus();
    await page.keyboard.press("Enter");

    const image = card.getByRole("img", { name: /Runees treadmill run dashboard/i });
    await expect(image).toBeVisible();
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((e: HTMLImageElement) => e.complete && e.naturalWidth === 1400 && e.naturalHeight === 1043)).toBe(true);
    await expect(image).toHaveAttribute("src", IMAGE_SRC);
    await expect(image).toHaveAttribute("loading", "lazy");
    await expect(card.getByText("Captured from the live app at runees.hammamnash.site.")).toBeVisible();

    const bounds = await image.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    expect(bounds!.width / bounds!.height).toBeCloseTo(1400 / 1043, 2);

    const response = await request.get(IMAGE_SRC);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/webp");
    await card.locator("figure").screenshot({ path: testInfo.outputPath(`runees-card-${width}.png`) });
  });

  test(`Runees detail page shows the screenshot at ${width}px`, async ({ page, request }, testInfo) => {
    await page.setViewportSize({ width, height: 960 });
    await page.goto("/projects/runees");

    const figure = page.locator("figure.work-visual");
    await expect(figure).toBeVisible();
    const image = figure.getByRole("img", { name: /Runees treadmill run dashboard/i });
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((e: HTMLImageElement) => e.complete && e.naturalWidth === 1400 && e.naturalHeight === 1043)).toBe(true);
    await expect(image).toHaveAttribute("src", IMAGE_SRC);
    await expect(figure.locator("figcaption")).toContainText("Captured from the live app");

    const bounds = await image.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    expect(bounds!.width / bounds!.height).toBeCloseTo(1400 / 1043, 2);

    const response = await request.get(IMAGE_SRC);
    expect(response.status()).toBe(200);
    await figure.screenshot({ path: testInfo.outputPath(`runees-detail-${width}.png`) });
  });
}
