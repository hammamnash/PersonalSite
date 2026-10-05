import { expect, test } from "@playwright/test";

test("the Runees card expands to its screenshot, story, and features", async ({ page }) => {
  await page.goto("/");
  const card = page.locator("#projects details").first();

  await expect(card).not.toHaveAttribute("open", "");
  await card.locator("summary").click();

  await expect(card).toHaveAttribute("open", "");
  const screenshot = card.getByRole("img");
  await expect(screenshot).toHaveAttribute("alt", /Runees treadmill run dashboard/);
  // naturalWidth proves the file is actually served, not a broken reference.
  await expect
    .poll(() => screenshot.evaluate((el) => (el as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0);
  await expect(card.getByRole("link", { name: /Full project page/ })).toHaveAttribute("href", "/projects/runees");
  await expect(card.getByRole("link", { name: /Open live app/ })).toHaveAttribute("href", "https://runees.hammamnash.site");
  await expect(card.getByRole("list", { name: /features/ })).toBeVisible();
});

test("projects without a write-up stay direct links", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#projects details")).toHaveCount(1);
  await expect(page.getByRole("link", { name: /Nyilehno/ })).toHaveAttribute("href", "/projects/nyilehno");
});
