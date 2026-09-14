import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 375, 768, 1280, 1440]) {
  test(`light design is accessible and fits at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 960 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    for (const summary of await page.locator("summary").all()) {
      if (!(await summary.locator("..").getAttribute("open")) && !(await summary.locator("..").evaluate((e) => e.hasAttribute("open")))) await summary.click();
    }
    const layout = await page.evaluate(() => ({
      viewport: innerWidth,
      content: document.documentElement.scrollWidth,
      clippedText: [...document.querySelectorAll("h1,h2,h3,p,summary,dd,a")].filter((e) => e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).display !== "inline").map((e) => e.textContent),
      smallTargets: [...document.querySelectorAll("a,summary")].filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && (r.height < 44 || r.width < 44);
      }).map((e) => e.textContent),
      body: getComputedStyle(document.body).backgroundColor,
    }));
    expect(layout.content).toBeLessThanOrEqual(layout.viewport);
    expect(layout.clippedText).toEqual([]);
    expect(layout.smallTargets).toEqual([]);
    expect(layout.body).toBe("rgb(250, 250, 250)");
    expect(errors).toEqual([]);
    const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(accessibility.violations).toEqual([]);
    await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); window.scrollTo(0, 0); });
    await expect(page.locator(".site-header")).toHaveCSS("top", "16px");
    await expect(page.locator(".skip-link")).not.toBeInViewport();
    await page.screenshot({ path: testInfo.outputPath(`site-${width}.png`), fullPage: true });
    await testInfo.attach("layout", { body: JSON.stringify(layout, null, 2), contentType: "application/json" });
  });
}

test("all local links and accordion controls work using keyboard", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  for (const summary of await page.locator("summary").all()) {
    await summary.focus();
    const details = summary.locator("..");
    const initial = await details.evaluate((e) => e.hasAttribute("open"));
    await page.keyboard.press("Enter");
    await expect.poll(() => details.evaluate((e) => e.hasAttribute("open"))).toBe(!initial);
    await page.keyboard.press("Space");
    await expect.poll(() => details.evaluate((e) => e.hasAttribute("open"))).toBe(initial);
    expect(await summary.evaluate((e) => getComputedStyle(e).outlineStyle)).toBe("solid");
  }
  const links = page.locator('a[href^="#"]');
  for (let i = 0; i < await links.count(); i++) {
    const link = links.nth(i);
    const destination = await link.getAttribute("href");
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${destination}$`));
    const target = page.locator(destination!);
    await expect(target).toBeAttached();
    if (destination !== "#home" && destination !== "#main") {
      const rect = await target.boundingBox();
      expect(rect!.y).toBeGreaterThanOrEqual(100);
      expect(rect!.y).toBeLessThan(600);
    }
  }
  for (const summary of await page.locator("summary").all()) {
    if (!(await summary.locator("..").evaluate((element: HTMLDetailsElement) => element.open))) {
      await summary.focus();
      await page.keyboard.press("Enter");
    }
  }
  for (const link of await page.locator("a").all()) {
    await link.focus();
    await expect(link).toBeFocused();
    expect(await link.evaluate((e) => getComputedStyle(e).outlineStyle)).toBe("solid");
  }
});

test("public content remains usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const row = page.locator("details").last();
  await row.locator("summary").click();
  await expect(row).toHaveAttribute("open", "");
  await expect(row.getByText(/I built reporting pipelines/)).toBeVisible();
  await page.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(page).toHaveURL(/#contact$/);
  await context.close();
});

test("200 percent content zoom reflows without overflow", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  for (const summary of await page.locator("summary").all()) {
    if (!(await summary.locator("..").evaluate((e) => e.hasAttribute("open")))) await summary.click();
  }
  const sizes = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(sizes.scroll).toBeLessThanOrEqual(sizes.client);
  await expect(page.getByRole("link", { name: "Contact", exact: true })).toBeVisible();
});

test("reduced motion, preview metadata, and local font loading", async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
  const remote: string[] = [];
  page.on("request", (req) => { if (!req.url().startsWith("http://127.0.0.1:3100")) remote.push(req.url()); });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  expect(remote).toEqual([]);
  await expect(page).toHaveTitle("Hammam Nashiruddin | Enterprise Architecture Consultant");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  expect(await page.locator("h1").evaluate((e) => getComputedStyle(e).fontFamily)).toContain("DM Sans");
  expect(await page.locator("h2").first().evaluate((e) => getComputedStyle(e).fontFamily)).toContain("Geist");
  expect(await page.locator(".button").evaluate((e) => getComputedStyle(e).transitionDuration)).toBe("0s");
  expect(await page.locator("html").evaluate((e) => getComputedStyle(e).colorScheme)).toBe("light");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
  const icon = await request.get("/icon.svg");
  expect(icon.status()).toBe(200);
});
