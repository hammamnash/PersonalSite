import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const path of ["/missing-portfolio-page", "/missing/deep/page"]) {
  test(`missing URL ${path} serves the custom page with HTTP 404`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.getByRole("heading", { level: 1, name: "This page took a catnap." })).toBeVisible();
    const image = page.getByRole("img", { name: /unimpressed ginger cat/i });
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth === 201)).toBe(true);
  });
}

for (const width of [320, 375, 768, 1280, 1440]) {
  test(`custom 404 is readable and accessible at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/404.html");
    await page.evaluate(() => document.fonts.ready);
    const layout = await page.evaluate(() => ({
      content: document.documentElement.scrollWidth,
      viewport: innerWidth,
      clipped: [...document.querySelectorAll("h1,p,a,figcaption")].filter((e) => e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).display !== "inline").map((e) => e.textContent),
      smallTargets: [...document.querySelectorAll("a")].filter((e) => { const r = e.getBoundingClientRect(); return r.width < 44 || r.height < 44; }).map((e) => e.textContent),
    }));
    expect(layout.content).toBeLessThanOrEqual(layout.viewport);
    expect(layout.clipped).toEqual([]);
    expect(layout.smallTargets).toEqual([]);
    expect(errors).toEqual([]);
    const image = page.getByRole("img", { name: /unimpressed ginger cat/i });
    await image.scrollIntoViewIfNeeded();
    const bounds = await image.boundingBox();
    expect(bounds!.width).toBeLessThanOrEqual(201);
    expect(bounds!.width / bounds!.height).toBeCloseTo(201 / 251, 2);
    const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(accessibility.violations).toEqual([]);
    await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); window.scrollTo(0, 0); });
    await page.screenshot({ path: testInfo.outputPath(`not-found-${width}.png`), fullPage: true });
  });
}

test("404 recovery links work by keyboard without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const links = [
    ["Hammam, back to introduction", "/"],
    ["Work", "/#work"],
    ["Contact", "/#contact"],
    ["Back to portfolio", "/"],
    ["View my work", "/#work"],
  ];
  for (const [name, destination] of links) {
    await page.goto("/404.html");
    const link = page.getByRole("link", { name, exact: true });
    await link.focus();
    expect(await link.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe("solid");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new URL(destination, "http://127.0.0.1:3100").href);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Making sense of");
  }
  await page.goto("/404.html");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await context.close();
});

test("404 recovery links also work with JavaScript enabled", async ({ page }) => {
  for (const [name, destination] of [["Back to portfolio", "/"], ["View my work", "/#work"]]) {
    await page.goto("/missing/deep/page");
    await page.getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(new URL(destination, "http://127.0.0.1:3100").href);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Making sense of");
    if (destination.endsWith("#work")) await expect(page.locator("#work")).toBeInViewport();
  }
});

test("404 stays light and reflows at 200 percent zoom", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/404.html");
  await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  const layout = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
    scheme: getComputedStyle(document.documentElement).colorScheme,
  }));
  expect(layout.content).toBeLessThanOrEqual(layout.viewport);
  expect(layout.scheme).toBe("light");
  await expect(page.getByRole("link", { name: "Back to portfolio", exact: true })).toBeVisible();
  expect(await page.locator(".button").evaluate((e) => getComputedStyle(e).transitionDuration)).toBe("0s");
});

test("custom 404 offers the supplied cat image and clear recovery links", async ({ page }) => {
  await page.goto("/404.html");
  await expect(page.getByRole("heading", { level: 1, name: "This page took a catnap." })).toBeVisible();
  await expect(page.getByText("404 / Page not found", { exact: true })).toBeVisible();
  const image = page.getByRole("img", { name: /unimpressed ginger cat/i });
  await expect(image).toHaveAttribute("src", "/images/sdimages.jpg");
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  await expect(page.getByRole("link", { name: "Back to portfolio", exact: true })).toHaveAttribute("href", "/");
  await expect(page.getByRole("link", { name: "View my work", exact: true })).toHaveAttribute("href", "/#work");
});
