import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

for (const country of ["Kenya", "Nigeria"] as const) {
  for (const width of [390, 1440]) {
    test(`${country} at ${width}px: local content, images, navigation and FAQ`, async ({ page }) => {
      await page.setViewportSize({ width, height: 960 });
      await page.goto(`/${country}/`);
      await page.getByRole("button", { name: "Reject", exact: true }).click();
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByText("Coming soon", { exact: true })).toHaveCount(0);
      const photo = page.locator(".country-hero-media img");
      await expect(photo).toBeVisible();
      await expect.poll(() => photo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      expect(await page.locator(".country-guide-list > a").count()).toBe(country === "Nigeria" ? 5 : 4);
      const question = page.locator(".country-faq summary").first();
      await question.focus();
      await page.keyboard.press("Enter");
      await expect(page.locator(".country-faq details").first()).toHaveAttribute("open", "");
      if (width === 390) {
        await page.getByRole("button", { name: "Open navigation" }).click();
        await expect(page.locator(".nav-mobile-product-group").getByText(country === "Nigeria" ? "Savings" : "Earn", { exact: true })).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(page.getByRole("button", { name: "Open navigation" })).toBeVisible();
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.evaluate(() => document.fonts.ready);
      await mkdir("test-results/country-previews", { recursive: true });
      await page.screenshot({ path: `test-results/country-previews/${country.toLowerCase()}-${width}.png`, fullPage: true });
    });
  }
}

test("country download links retain campaign tags and measure clicks only with consent", async ({ page, context }) => {
  await context.route("https://jazarione.app.link/**", route => route.fulfill({ body: "Test app destination" }));
  await page.route("https://www.googletagmanager.com/gtag/js**", route => route.fulfill({ body: "" }));
  await page.goto("/Nigeria/?utm_source=google&utm_medium=cpc&utm_campaign=nigeria-dollar&utm_term=dollar+account&utm_content=ad-one&untrusted=drop-me");
  const download = page.locator(".country-hero .country-primary-action");
  await expect(download).toHaveAttribute("href", /utm_campaign=nigeria-dollar/);
  for (const link of await page.locator('a[href*="jazarione.app.link"]').all()) {
    const href = new URL((await link.getAttribute("href"))!);
    expect(href.searchParams.get("utm_source")).toBe("google");
    expect(href.searchParams.get("utm_content")).toBe("ad-one");
    expect(href.searchParams.has("untrusted")).toBe(false);
  }
  async function clicks() { return page.evaluate(() => (window.dataLayer ?? []).map(item => Array.from(item as ArrayLike<unknown>)).filter(item => item[1] === "app_download_click")); }
  let popup = page.waitForEvent("popup");
  await download.click();
  await (await popup).close();
  expect(await clicks()).toHaveLength(0);
  await page.getByRole("button", { name: "Reject", exact: true }).click();
  popup = page.waitForEvent("popup");
  await download.click();
  await (await popup).close();
  expect(await clicks()).toHaveLength(0);
  await page.getByRole("button", { name: "Cookie Preferences", exact: true }).click();
  await page.getByRole("checkbox", { name: "Allow analytics cookies" }).check();
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  popup = page.waitForEvent("popup");
  await download.click();
  await (await popup).close();
  expect(await clicks()).toEqual([["event", "app_download_click", { country: "Nigeria", placement: "hero" }]]);
});

test("blog country filters connect all new guides to their country pages", async ({ page }) => {
  await page.goto("/blog/");
  await page.getByRole("button", { name: "Reject", exact: true }).click();
  await expect(page.locator(".blog-index-grid > a")).toHaveCount(13);
  await page.getByRole("button", { name: "Kenya", exact: true }).click();
  await expect(page.locator(".blog-index-grid > a")).toHaveCount(4);
  await page.getByRole("button", { name: "Nigeria", exact: true }).click();
  await expect(page.locator(".blog-index-grid > a")).toHaveCount(5);
  await page.getByRole("link", { name: /Requirements for opening a dollar account in Nigeria/ }).click();
  await expect(page.locator("h1")).toHaveText("Requirements for opening a dollar account in Nigeria");
  await page.getByRole("link", { name: "Explore Jazari One in Nigeria" }).click();
  await expect(page).toHaveURL(/\/Nigeria\//);
});
