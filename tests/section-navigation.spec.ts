import { expect, test } from "@playwright/test";

const sections = ["work", "about", "projects", "exploring-ai", "tools", "contact"];

test("projects follow the background and navigation follows section order", async ({ page }) => {
  await page.goto("/");
  expect(await page.locator("main > section").evaluateAll((elements) => elements.map((element) => element.id))).toEqual(sections);
  // Runees expands into an accordion, so the four projects without a write-up
  // stay the only direct links in the section.
  const projects = page.locator("#projects");
  await expect(projects.getByRole("link")).toHaveCount(4);
  await expect(projects.locator("details")).toHaveCount(1);
  await expect(projects.locator("details summary")).toContainText("Runees");
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  expect(await navigation.locator('.nav-links a').evaluateAll((links) => links.map((link) => link.getAttribute("href")))).toEqual(sections.map((id) => `#${id}`));
});

for (const width of [320, 375, 768, 1440]) {
  test(`all section links are visible and usable at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    // Reduced motion makes anchor navigation instant (see globals.css), so
    // sequential clicks can't interrupt each other's smooth-scroll animation
    // and get dropped mid-flight. Landing positions are identical.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const navigation = page.getByRole("navigation", { name: "Main navigation" });
    for (const id of sections) {
      const link = navigation.locator(`a[href="#${id}"]`);
      await expect(link).toBeVisible();
      await expect(link).toBeInViewport();
      const bounds = await link.boundingBox();
      expect(bounds!.width).toBeGreaterThanOrEqual(44);
      expect(bounds!.height).toBeGreaterThanOrEqual(44);
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      await link.focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      const heading = page.locator(`#${id} h2`).first();
      const headingBounds = await heading.boundingBox();
      const navBounds = await navigation.boundingBox();
      expect(headingBounds!.y).toBeGreaterThanOrEqual(navBounds!.y + navBounds!.height);
      await expect(heading).toBeInViewport();
    }
    await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); window.scrollTo(0, 0); });
    await page.screenshot({ path: testInfo.outputPath(`navigation-${width}.png`) });
  });
}
