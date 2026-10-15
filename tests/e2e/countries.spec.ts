import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

for (const country of ["Kenya", "Nigeria"] as const) {
  for (const width of [320, 390, 768, 1440]) {
    test(`${country} at ${width}px: local content, images, navigation and FAQ`, async ({ page }) => {
      await page.setViewportSize({ width, height: 960 });
      await page.goto(`/${country}/`);
      const sticky = page.locator(".country-mobile-download");
      if (width <= 900) {
        await expect(sticky.getByRole("link", { name: "Download App", exact: true })).toBeVisible();
        const [banner, action] = await Promise.all([page.locator(".cookie-banner").boundingBox(), sticky.boundingBox()]);
        expect(banner).not.toBeNull();
        expect(action).not.toBeNull();
        expect(banner!.y + banner!.height).toBeLessThanOrEqual(action!.y);
      } else {
        await expect(sticky).toBeHidden();
      }
      await page.getByRole("button", { name: "Reject", exact: true }).click();
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(`Your dollar account in ${country}.`);
      await expect(page.locator("#savings h2")).toHaveText("Savings");
      await expect(page.getByText("Explore your USD account", { exact: true })).toHaveCount(0);
      await expect(page.getByText("Coming soon", { exact: true })).toHaveCount(0);
      await expect(page.locator(".site-header .nav-menu")).toHaveCount(0);
      await expect(page.getByRole("button", { name: "Open navigation" })).toHaveCount(0);
      await expect(page.locator(".country-wallet a, .country-savings a")).toHaveCount(0);
      await expect(page.locator("footer .footer-navigation")).toHaveCount(0);
      await expect(page.getByRole("navigation", { name: "Legal information", exact: true }).getByRole("link")).toHaveCount(3);
      await expect(page.locator("footer").getByRole("button", { name: "Cookie Preferences", exact: true })).toHaveCount(1);
      await expect(page.locator("footer .footer-addresses-content address")).toHaveCount(2);
      await expect(page.locator("footer .footer-disclosures li")).toHaveCount(4);
      await expect(page.locator("footer .footer-copyright")).toHaveText("© 2026 Jazari One. All rights reserved.");
      await expect(page.locator("footer a")).toHaveCount(9);
      await expect(page.locator("footer .social-links a")).toHaveCount(5);
      const photo = page.locator(".country-hero-media img");
      await expect(photo).toBeVisible();
      await expect.poll(() => photo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      expect(await page.locator(".country-guide-list > a").count()).toBe(country === "Nigeria" ? 5 : 4);
      const question = page.locator(".country-faq summary").first();
      await question.focus();
      await page.keyboard.press("Enter");
      await expect(page.locator(".country-faq details").first()).toHaveAttribute("open", "");
      const screen = page.locator(".country-phone img");
      await screen.scrollIntoViewIfNeeded();
      await expect(screen).toHaveAttribute("src", "/images/countries/receive-usd-chidi.webp");
      await expect.poll(() => screen.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
      if (width <= 900) {
        const beforeScroll = await sticky.boundingBox();
        await page.locator(".country-faq").scrollIntoViewIfNeeded();
        const afterScroll = await sticky.boundingBox();
        expect(afterScroll!.y).toBe(beforeScroll!.y);
        expect(afterScroll!.y + afterScroll!.height).toBe(960);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.evaluate(() => document.fonts.ready);
      await mkdir("test-results/country-previews", { recursive: true });
      await page.screenshot({ path: `test-results/country-previews/${country.toLowerCase()}-${width}.png`, fullPage: true });
    });
  }
}

test("country download links retain campaign tags and measure clicks only with consent", async ({ page, context }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await context.route("https://jazarione.app.link/**", route => route.fulfill({ body: "Test app destination" }));
  await page.route("https://www.googletagmanager.com/gtag/js**", route => route.fulfill({ body: "" }));
  const campaignPath = "/Nigeria/?utm_source=google&utm_medium=cpc&utm_campaign=nigeria-dollar&utm_term=dollar+account&utm_content=ad-one&untrusted=drop-me";
  await page.goto(campaignPath);
  const download = page.locator(".country-mobile-download .country-primary-action");
  await expect(download).toHaveAttribute("href", /utm_campaign=nigeria-dollar/);
  for (const link of await page.locator('a[href*="jazarione.app.link"]').all()) {
    const href = new URL((await link.getAttribute("href"))!);
    expect(href.origin + href.pathname).toBe("https://jazarione.app.link/zidMo5PYf7b");
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
  await page.goto("/");
  await page.getByRole("button", { name: "Cookie Preferences", exact: true }).click();
  await page.getByRole("checkbox", { name: "Allow analytics cookies" }).check();
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  await page.goto(campaignPath);
  await expect(download).toHaveAttribute("href", /utm_campaign=nigeria-dollar/);
  popup = page.waitForEvent("popup");
  await download.click();
  await (await popup).close();
  expect(await clicks()).toEqual([["event", "app_download_click", { country: "Nigeria", placement: "mobile-sticky" }]]);
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
  await expect(page.locator("h1")).toHaveCSS("font-family", /Instrument Serif/);
  await expect(page.locator(".article-copy h2").first()).toHaveCSS("font-family", /Instrument Serif/);
  await expect(page.locator(".article-copy p").first()).toHaveCSS("font-family", /Inter/);
  await expect(page.locator(".site-header .nav-menu")).toHaveCount(1);
  await expect(page.getByRole("navigation", { name: "Footer navigation", exact: true })).toHaveCount(1);
  await mkdir("test-results/country-previews", { recursive: true });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.screenshot({ path: `test-results/country-previews/country-article-${width}.png` });
  }
  await page.getByRole("link", { name: "Explore Jazari One in Nigeria" }).click();
  await expect(page).toHaveURL(/\/Nigeria\//);
  await page.goto("/");
  await expect(page.locator(".site-header .nav-menu")).toHaveCount(1);
  await expect(page.getByRole("navigation", { name: "Footer navigation", exact: true })).toHaveCount(1);
  await expect(page.locator(".country-header, .country-footer")).toHaveCount(0);
});
