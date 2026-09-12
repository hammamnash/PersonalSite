import { expect, test } from "@playwright/test";

test("recruiter can read selected work and reach contact details", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  const product = page.locator("details").filter({ has: page.getByText("Warehouse management, built around its users", { exact: true }) });
  await product.locator("summary").click();
  await expect(product).toHaveAttribute("open", "");
  await expect(product.getByText(/Vietnam/)).toBeVisible();
  await page.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByRole("link", { name: "hammamnash0@gmail.com" })).toHaveAttribute("href", "mailto:hammamnash0@gmail.com");
  await expect(page.getByRole("link", { name: /LinkedIn profile/ })).toHaveAttribute("href", "https://www.linkedin.com/in/hammamnash/");
});

test("recruiter can identify Hammam and his primary practice", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Making sense of business and technology.");
  await expect(page.getByText("Moh. Hammam Nashiruddin", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Enterprise Architecture Consultant", { exact: true }).first()).toBeVisible();
});
