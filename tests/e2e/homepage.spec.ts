import { expect, test, type Page } from "@playwright/test";

async function prepareStablePage(page: Page) {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".home-page")).toHaveClass(/is-ready/);
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

      .provider-grid.is-visible .provider-card {
        opacity: 1 !important;
        transform: none !important;
        animation: none !important;
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

async function revealScrollableContent(page: Page) {
  for (const selector of [".provider-grid"]) {
    const revealTarget = page.locator(selector);
    await revealTarget.scrollIntoViewIfNeeded();
    await expect(revealTarget).toHaveClass(/is-visible/);
  }

  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = page.viewportSize()?.height ?? 800;

  for (let offset = 0; offset < pageHeight; offset += Math.max(320, viewportHeight * 0.7)) {
    await page.evaluate((nextOffset) => window.scrollTo(0, nextOffset), offset);
    await page.waitForTimeout(24);
  }

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  });
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
}

test("keeps the core interactions working", async ({ page }) => {
  await prepareStablePage(page);

  await expect(page.getByRole("heading", { name: /Your dollars,/ })).toBeVisible();
  await expect(page.locator("main")).toHaveAttribute("data-theme", "jazari");
  await expect(page.locator("main")).toHaveAttribute("data-shader", "beam");
  await expect(page.getByRole("button", { name: /Choose color theme/ })).toHaveCount(0);
  await expect
    .poll(() => page.evaluate(() => window.localStorage.getItem("jazari-theme")))
    .toBeNull();
  await expect
    .poll(() => page.evaluate(() => window.localStorage.getItem("jazari-shader")))
    .toBeNull();

  const heroAccess = page.locator(".magic-access-button");
  await heroAccess.hover({ position: { x: 22, y: 12 } });
  await expect
    .poll(() =>
      heroAccess.evaluate((node) => node.style.getPropertyValue("--pointer-nx")),
    )
    .not.toBe("0");

  const receiveScenario = page.getByRole("tab", { name: "Receive", exact: true });
  await receiveScenario.focus();
  await receiveScenario.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Send", exact: true })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("tab", { name: /Choose a recipient/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.locator("#step-screen .active-step-phone.is-active img")).toHaveAttribute(
    "src",
    /how-to-send-01\.png$/,
  );

  const currencyPicker = page.locator("#receive-currency");
  await currencyPicker.click();
  const currencyMenu = page.getByRole("listbox", { name: "Recipient currency" });
  await expect(currencyMenu.getByRole("option")).toHaveCount(4);
  await expect(currencyMenu.getByRole("option", { name: /Mexico.*MXN/ })).toBeVisible();
  await expect(currencyMenu.getByRole("option", { name: /Colombia.*COP/ })).toBeVisible();
  await expect(currencyMenu.getByRole("option", { name: /Brazil.*BRL/ })).toBeVisible();
  await expect(currencyMenu.getByRole("option", { name: /Europe.*EUR/ })).toBeVisible();
  await currencyMenu.getByRole("option", { name: /Colombia.*COP/ }).click();
  await expect(currencyPicker).toContainText("COP");
  await expect(page.locator(".money-input.result strong")).toContainText("$4,175,000.00");

  await expect(page.locator(".nav-cta")).toHaveAttribute(
    "href",
    "https://apps.apple.com/",
  );

  const card = page.locator(".blog-card").first();
  await card.scrollIntoViewIfNeeded();
  await card.hover({ position: { x: 80, y: 90 } });
  await expect
    .poll(() =>
      card.evaluate((node) =>
        node.style.getPropertyValue("--pointer-x"),
      ),
    )
    .not.toBe("50%");

  const roadmapTrack = page.locator(".roadmap-track");
  await roadmapTrack.evaluate((node) => {
    node.scrollLeft = node.scrollWidth;
  });
  await expect
    .poll(() =>
      roadmapTrack.evaluate((node) =>
        Math.round(node.scrollWidth - node.clientWidth - node.scrollLeft),
      ),
    )
    .toBeLessThanOrEqual(1);

  const firstQuestion = page.getByText("What is a Jazari USD account?", { exact: true });
  await firstQuestion.click();
  await expect(
    page.getByText(/one interface for holding supported digital dollars/i),
  ).toBeVisible();
});

test("renders the plan preview and legal links", async ({ page }) => {
  await page.goto("/plan/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Plan" })).toBeVisible();
  await expect(page.getByText(/Preview pricing only/)).toBeVisible();
  await expect(page.getByText(/Free over \$10/)).toBeVisible();
  await expect(page.getByText(/Variable APY/)).toBeVisible();
  await expect(page.getByRole("link", { name: "Terms & Conditions" })).toHaveAttribute(
    "href",
    /\/terms\/?$/,
  );
  await expect(page.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
    "href",
    /\/privacy-policy\/?$/,
  );
});

test("renders the legal documents as internal Jazari pages", async ({ page }) => {
  await page.goto("/terms/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Terms & Conditions" })).toBeVisible();
  await expect(page.getByText("Effective date: April 2026")).toBeVisible();
  await expect(page.getByRole("heading", { name: "1. Introduction" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "20. How We Use Your Information" })).toBeVisible();

  await page.getByRole("link", { name: "Privacy Policy" }).first().click();
  await expect(page).toHaveURL(/\/privacy-policy\/?$/);
  await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible();
  await expect(page.getByText("Last updated: April 2026")).toBeVisible();
  await expect(page.getByRole("heading", { name: "11. Cookies" })).toBeVisible();
});

test("explains yields and links into the app flow", async ({ page }) => {
  await page.goto("/yields/", { waitUntil: "networkidle" });
  await expect(
    page.getByRole("heading", { name: "Yields" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Gauntlet USD Alpha" })).toBeVisible();
  await expect(page.getByText("4.66%")).toBeVisible();
  await expect(page.getByText("Return and risk move together")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Download App" }).last()).toHaveAttribute(
    "href", "/#access",
  );
});

test("shows every product milestone on the roadmap page", async ({ page }) => {
  await page.goto("/roadmap/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Roadmap" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "USD account" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Yields with higher APY" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Remit Now Pay Later" })).toBeVisible();
});

test("renders the numbered component board with live interactions", async ({ page }) => {
  await page.goto("/storyboard/", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("heading", { name: /Jazari One component board/ }),
  ).toBeVisible();
  await expect(page.locator(".storyboard-story")).toHaveCount(11);
  await expect(page.getByRole("heading", { name: "Transfer Experience" })).toBeVisible();

  const transferIndex = page.getByRole("link", { name: /05 Transfer Experience/ });
  await transferIndex.click();
  await expect(page).toHaveURL(/#story-transfer$/);

  const faq = page.locator("#story-faq");
  await faq.scrollIntoViewIfNeeded();
  const firstQuestion = faq.locator("details").first();
  await firstQuestion.locator("summary").click();
  await expect(firstQuestion).toHaveAttribute("open", "");
});

test("opens a full-height mobile navigation with download and social actions", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await prepareStablePage(page);

  await page.getByRole("button", { name: "Open navigation" }).click();
  const menu = page.locator(".nav-menu");
  await expect(menu).toHaveClass(/is-open/);
  await expect(menu.getByRole("link", { name: "Download App" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Jazari One on X" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Jazari One on Instagram" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Jazari One on Facebook" })).toBeVisible();
  await expect
    .poll(() => menu.evaluate((node) => Math.round(node.getBoundingClientRect().height)))
    .toBe(844);
  await expect
    .poll(() => page.evaluate(() => document.body.style.overflow))
    .toBe("hidden");

  await page.getByRole("button", { name: "Close navigation" }).click();
  await expect(menu).not.toHaveClass(/is-open/);
});

for (const viewport of [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 820, height: 1100 },
  { name: "mobile", width: 390, height: 844 },
]) {
  test(`matches the ${viewport.name} layout baseline`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await prepareStablePage(page);
    await revealScrollableContent(page);

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
