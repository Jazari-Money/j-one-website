import { expect, test, type Page } from "@playwright/test";

async function prepareStablePage(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.setItem("jazari-theme", "carbon");
    window.localStorage.setItem("jazari-shader", "horizon");
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

  const heroAccess = page.locator(".magic-access-button");
  await heroAccess.hover({ position: { x: 22, y: 12 } });
  await expect
    .poll(() =>
      heroAccess.evaluate((node) => node.style.getPropertyValue("--pointer-nx")),
    )
    .not.toBe("0");

  await page.getByRole("button", { name: /Visuals:/ }).click();
  await page.getByRole("button", { name: /Electric Lime/ }).click();
  await expect(page.locator("main")).toHaveAttribute("data-theme", "toxic");
  await expect
    .poll(() => page.evaluate(() => window.localStorage.getItem("jazari-theme")))
    .toBe("toxic");
  await page.getByRole("button", { name: /Ribbon/ }).click();
  await expect(page.locator("main")).toHaveAttribute("data-shader", "ribbon");
  await expect
    .poll(() => page.evaluate(() => window.localStorage.getItem("jazari-shader")))
    .toBe("ribbon");

  const accountTab = page.getByRole("tab", { name: /Set Up Your Account/ });
  await accountTab.focus();
  await accountTab.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /Build The Transfer/ })).toHaveAttribute(
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
  await expect(card.locator(".card-edge")).toHaveCount(4);
  await card.focus();
  await card.press("Home");
  await card.press("ArrowRight");
  await expect
    .poll(() =>
      card.locator(".card-object").evaluate((node) =>
        node.style.getPropertyValue("--card-ry"),
      ),
    )
    .toBe("33deg");

  const moneyRain = page.locator(".money-rain");
  await moneyRain.scrollIntoViewIfNeeded();
  await moneyRain.hover();
  await expect(moneyRain).toHaveClass(/is-raining/);
  await expect(moneyRain.locator(".coin-fall")).toHaveCount(28);

  const firstQuestion = page.getByText("What is a Jazari USD account?", { exact: true });
  await firstQuestion.click();
  await expect(
    page.getByText(/one interface for holding supported digital dollars/i),
  ).toBeVisible();
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
