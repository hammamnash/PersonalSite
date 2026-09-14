import { expect, test } from "@playwright/test";

test("conceptual agent workflow remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/#exploring-ai");
  const figure = page.getByRole("figure", { name: "Conceptual agent workflow" });
  await expect(figure).toBeVisible();
  await expect(figure.locator("li strong")).toHaveText(["Task", "Context & tools", "Agent actions", "Human review"]);
  await expect(figure).toContainText("Illustrative sequence, not a deployed system.");
  await expect(figure).toContainText("Human approval can also be required before consequential actions.");
  await expect(figure.getByRole("button")).toHaveCount(0);
  await context.close();
});

for (const width of [320, 375, 768, 1280, 1440]) {
  test(`AI exploration fits at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 960 });
    await page.goto("/#exploring-ai");
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator("#exploring-ai");
    const boxes = await section.locator("h2,p,dt,dd,li,strong,span").evaluateAll((elements) => elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return { text: element.textContent, x: rect.x, right: rect.right, clipped: element.scrollWidth > element.clientWidth + 1 && getComputedStyle(element).display !== "inline" };
    }));
    expect(boxes.filter((box) => box.x < 0 || box.right > width + 1 || box.clipped)).toEqual([]);
    const steps = await section.locator("li").evaluateAll((elements) => elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom };
    }));
    expect(steps).toHaveLength(4);
    for (let i = 1; i < steps.length; i++) expect(steps[i].top).toBeGreaterThan(steps[i - 1].bottom);
    await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); });
    await section.screenshot({ path: testInfo.outputPath(`ai-exploration-${width}.png`) });
  });
}

test("AI interests follow career history without replacing EA positioning", async ({ page }) => {
  await page.goto("/");
  const exploration = page.getByRole("region", { name: "Putting AI agents to practical use." });
  await expect(exploration).toBeVisible();
  await expect(exploration.getByText("Currently exploring", { exact: true })).toBeVisible();
  await expect(exploration.getByText("Agentic AI", { exact: true })).toBeVisible();
  await expect(exploration.getByText("Hands-on experimentation", { exact: true })).toBeVisible();
  await expect(exploration.getByText("Enterprise questions", { exact: true })).toBeVisible();
  await expect(exploration.getByRole("heading", { name: "An example: this website" })).toBeVisible();
  await expect(exploration.getByText(/Built with AI assistance, with me directing the content and design/)).toBeVisible();
  await expect(exploration).not.toContainText(/AI expert|AI engineer|production AI deployment/i);
  await expect(page.locator(".practice-label")).toHaveText("Enterprise Architecture Consultant");
  expect(await exploration.evaluate((element) => ({
    previous: element.previousElementSibling?.id,
    nextHeading: element.nextElementSibling?.querySelector("h2")?.id,
  }))).toEqual({ previous: "projects", nextHeading: "practice-heading" });
});
