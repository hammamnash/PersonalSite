import { expect, test } from "@playwright/test";

for (const width of [320, 768, 1440]) {
  test(`EA reference image loads uncropped with attribution at ${width}px`, async ({ page, request }, testInfo) => {
    await page.setViewportSize({ width, height: 960 });
    await page.goto("/");
    const experience = page.locator("details").filter({ has: page.getByText("Making enterprise architecture usable", { exact: true }) });
    if (!(await experience.evaluate((element: HTMLDetailsElement) => element.open))) {
      await experience.locator("summary").focus();
      await page.keyboard.press("Enter");
    }
    const image = experience.getByRole("img", { name: /TOGAF ADM cycle/ });
    await expect(image).toBeVisible();
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth === 705 && element.naturalHeight === 596)).toBe(true);
    await expect(image).toHaveAttribute("src", "/images/experience/togaf-archimate-core.png");
    await expect(image).toHaveCSS("object-fit", "contain");
    const rect = await image.boundingBox();
    expect(rect!.width / rect!.height).toBeCloseTo(705 / 596, 2);
    expect(rect!.x).toBeGreaterThanOrEqual(0);
    expect(rect!.x + rect!.width).toBeLessThanOrEqual(width);
    await expect(experience.getByText(/Framework reference, not an ATD client deliverable/)).toBeVisible();
    await expect(experience.getByRole("link", { name: "Source: Archimetric" })).toHaveAttribute("href", "https://www.archimetric.com/id/quick-learning-archimate-part-1-core-concepts/");
    const original = experience.getByRole("link", { name: "View full-size diagram" });
    const response = await request.get((await original.getAttribute("href"))!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
    await original.focus();
    expect(await original.evaluate((e) => getComputedStyle(e).outlineStyle)).toBe("solid");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/images\/experience\/togaf-archimate-core\.png$/);
    await page.goBack();
    if (!(await experience.evaluate((element: HTMLDetailsElement) => element.open))) {
      await experience.locator("summary").focus();
      await page.keyboard.press("Enter");
    }
    await image.scrollIntoViewIfNeeded();
    await experience.locator("figure").screenshot({ path: testInfo.outputPath(`ea-reference-${width}.png`) });
  });
}
