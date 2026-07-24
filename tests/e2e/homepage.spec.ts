import { expect, test, type Page } from "@playwright/test";

async function prepareStablePage(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.setItem("jazari-theme", "carbon");
  });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: `
      canvas,
      video {
        visibility: hidden !important;
      }

      *,
      *::before,
      *::after {
        animation-delay: 0s !important;
        animation-duration: 0.001ms !important;
        transition-delay: 0s !important;
        transition-duration: 0.001ms !important;
      }
    `,
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images, (image) =>
        image.complete ? Promise.resolve() : image.decode().catch(() => undefined),
      ),
    );
  });
}

test("keeps the core interactions working", async ({ page }) => {
  await prepareStablePage(page);

  await expect(page.getByRole("heading", { name: /Your dollars,/ })).toBeVisible();
  await expect(page.locator("main")).toHaveAttribute("data-theme", "carbon");

  await page.getByRole("button", { name: /Palette:/ }).click();
  await page.getByRole("button", { name: /Toxic Bloom/ }).click();
  await expect(page.locator("main")).toHaveAttribute("data-theme", "toxic");
  await expect
    .poll(() => page.evaluate(() => window.localStorage.getItem("jazari-theme")))
    .toBe("toxic");

  const accountTab = page.getByRole("tab", { name: /Set up your account/ });
  await accountTab.focus();
  await accountTab.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /Build the transfer/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.locator("#step-screen img")).toHaveAttribute(
    "src",
    /amount-entry\.webp$/,
  );

  await page.locator(".nav-cta").click();
  await expect(page.locator("#access")).toHaveClass(/is-open/);
  await expect(page.getByLabel("Email address")).toBeVisible();

  const card = page.locator(".card-interaction");
  await card.scrollIntoViewIfNeeded();
  await card.focus();
  await card.press("ArrowRight");
  await expect
    .poll(() =>
      card.locator(".card-object").evaluate((node) =>
        node.style.getPropertyValue("--card-ry"),
      ),
    )
    .toBe("28deg");

  const moneyRain = page.locator(".money-rain");
  await moneyRain.scrollIntoViewIfNeeded();
  await moneyRain.hover();
  await expect(moneyRain).toHaveClass(/is-raining/);
  await expect(moneyRain.locator(".coin-fall")).toHaveCount(28);
});

for (const viewport of [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 820, height: 1100 },
  { name: "mobile", width: 390, height: 844 },
]) {
  test(`matches the ${viewport.name} layout baseline`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await prepareStablePage(page);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);

    await expect(page).toHaveScreenshot(`homepage-${viewport.name}.png`, {
      fullPage: true,
      animations: "disabled",
      caret: "hide",
      maxDiffPixelRatio: 0.01,
    });
  });
}
