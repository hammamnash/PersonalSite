import { expect, test } from "@playwright/test";

for (const width of [320, 768, 1440]) {
  test(`analytics illustration loads with honest caption at ${width}px`, async ({ page, request }, testInfo) => {
    await page.setViewportSize({ width, height: 960 });
    await page.goto("/");
    const section = page.locator("details").filter({ has: page.getByText("Turning operational data into useful reporting", { exact: true }) });
    await section.locator("summary").focus();
    await page.keyboard.press("Enter");
    const image = section.getByRole("img", { name: /analyst.*light-themed dashboard/i });
    await expect(image).toBeVisible();
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((e: HTMLImageElement) => e.complete && e.naturalWidth === 1024 && e.naturalHeight === 576)).toBe(true);
    await expect(image).toHaveAttribute("src", "/images/experience/inventory-data-analytics-v2.webp");
    await expect(image).toHaveAttribute("loading", "lazy");
    await expect(section.getByText("AI-generated illustration of analytical work, not a real employer dashboard or a portrait of me.")).toBeVisible();
    const bounds = await image.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    expect(bounds!.width / bounds!.height).toBeCloseTo(16 / 9, 2);
    const response = await request.get((await image.getAttribute("src"))!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/webp");
    await section.locator("figure").screenshot({ path: testInfo.outputPath(`analytics-${width}.png`) });
  });

  test(`warehouse illustration loads with honest caption at ${width}px`, async ({ page, request }, testInfo) => {
    await page.setViewportSize({ width, height: 960 });
    await page.goto("/");
    const section = page.locator("details").filter({ has: page.getByText("Warehouse management, built around its users", { exact: true }) });
    await section.locator("summary").focus();
    await page.keyboard.press("Enter");
    const image = section.getByRole("img", { name: /warehouse associate.*product specialist/i });
    await expect(image).toBeVisible();
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((e: HTMLImageElement) => e.complete && e.naturalWidth === 1024 && e.naturalHeight === 576)).toBe(true);
    await expect(image).toHaveAttribute("src", "/images/experience/warehouse-product-management.webp");
    await expect(image).toHaveAttribute("loading", "lazy");
    await expect(section.getByText("AI-generated illustration of warehouse collaboration, not a Social Bella facility or its staff.")).toBeVisible();
    const bounds = await image.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    expect(bounds!.width / bounds!.height).toBeCloseTo(16 / 9, 2);
    const response = await request.get((await image.getAttribute("src"))!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/webp");
    await section.locator("figure").screenshot({ path: testInfo.outputPath(`warehouse-${width}.png`) });
  });
}
