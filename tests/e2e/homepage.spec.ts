import { expect, test, type Page } from "@playwright/test";

const exchangeRates = {
  BRL: 5.36582475,
  COP: 3026.213091,
  EUR: 0.908127,
  GBP: 0.78804,
  MXN: 19.70124651,
} as const;
const exchangeRatesUrl = "https://api.jazari.xyz/public/exchange_rates";

const rateBatch = (rates: Record<string, number>) => Object.entries(rates).map(([to, rate]) => ({
  from: "USDC",
  to,
  rate,
  updated_at: "2026-08-19T00:00:00.000+00:00",
}));

test.beforeEach(async ({ context }) => {
  await context.route(exchangeRatesUrl, async (route) => {
    await route.fulfill({
      headers: {
        "access-control-allow-origin": "*",
        "cache-control": "public, max-age=3600",
      },
      json: rateBatch(exchangeRates),
    });
  });

  await context.addCookies([
    {
      name: "jazari_cookie_consent",
      value: encodeURIComponent(
        JSON.stringify({ analytics: false, updatedAt: "2026-08-19" }),
      ),
      url: "http://127.0.0.1:3000",
      sameSite: "Lax",
    },
  ]);
});

async function prepareStablePage(page: Page, path = "/") {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(path, { waitUntil: "networkidle" });
  if (path === "/") {
    await expect(page.locator(".home-page")).toHaveClass(/is-ready/);
    await expect(page.locator(".hero-color-event canvas")).toHaveAttribute(
      "data-rendered",
      "true",
    );
  }
  await page.addStyleTag({
    content: `
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
      Array.from(document.images)
        .filter((image) => image.loading !== "lazy")
        .map((image) =>
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

  await page.evaluate(async () => {
    await Promise.all(
      Array.from(document.images)
        .filter((image) => image.currentSrc)
        .map((image) =>
          image.complete ? Promise.resolve() : image.decode().catch(() => undefined),
        ),
    );
  });

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  });
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
}

test("refreshes the displayed exchange rate when its cache expires", async ({ page }) => {
  let rate = 19.70124651;
  await page.route(exchangeRatesUrl, async (route) => {
    await route.fulfill({
      headers: {
        "access-control-allow-origin": "*",
        "cache-control": "public, max-age=1",
      },
      json: rateBatch({ ...exchangeRates, MXN: rate }),
    });
  });

  await page.goto("/send/", { waitUntil: "domcontentloaded" });
  const displayedRate = page.locator(".prominent-rate .is-result b");
  await expect(displayedRate).toHaveText("19.70");
  const freshness = page.locator(".rate-freshness");
  await expect(freshness).toContainText("Live");
  await expect.poll(() => freshness.evaluate((node) => getComputedStyle(node).color))
    .toBe("rgb(255, 92, 92)");

  rate = 20.123;
  await expect(displayedRate).toHaveText("20.12", { timeout: 3_000 });
});

test("shows a marked estimate when live pricing times out", async ({ page }) => {
  await page.route(exchangeRatesUrl, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 2_500));
    await route.fulfill({
      json: rateBatch({ ...exchangeRates, MXN: 19.70124651 }),
    }).catch(() => undefined);
  });

  await page.goto("/send/", { waitUntil: "domcontentloaded" });
  const freshness = page.locator(".rate-freshness");
  const recipientAmount = page.locator(".money-input.result > strong");
  await expect(freshness).toContainText("Checking");
  await expect(recipientAmount).toHaveText("Loading…");
  await expect(freshness).toContainText("Estimate", { timeout: 3_500 });
  await expect(recipientAmount).toHaveText("~$18,720.00");
  await expect.poll(() => freshness.evaluate((node) => getComputedStyle(node).color))
    .toBe("rgb(141, 146, 143)");
});

test("runs the color event with the reference choreography", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".home-page")).toHaveClass(/is-ready/);

  const canvas = page.locator(".hero-color-event canvas");
  await expect(canvas).toHaveAttribute("data-rendered", "true");
  const choreography = await page.evaluate(() => {
    const readAnimation = (node: Element | null) => {
      if (!node) return null;
      const style = getComputedStyle(node);
      return {
        delay: style.animationDelay,
        duration: style.animationDuration,
      };
    };
    const background = document.querySelector(".hero-color-event canvas");
    return {
      firstLine: readAnimation(
        document.querySelector(".hero-title-line:first-child > span"),
      ),
      secondLine: readAnimation(
        document.querySelector(".hero-title-line:last-child > span"),
      ),
      sub: readAnimation(document.querySelector(".hero-copy > p")),
      action: readAnimation(document.querySelector(".hero-download-control")),
      product: readAnimation(document.querySelector(".hero-product")),
      backgroundWidth: background?.getBoundingClientRect().width ?? 0,
    };
  });

  expect(choreography).toEqual({
    firstLine: { delay: "1s", duration: "0.62s" },
    secondLine: { delay: "1.09s", duration: "0.62s" },
    sub: { delay: "1.28s", duration: "0.7s" },
    action: { delay: "1.43s", duration: "0.7s" },
    product: { delay: "2.05s", duration: "1.1s" },
    backgroundWidth: 1280,
  });

  const introStart = Number(await canvas.getAttribute("data-intro"));
  const dustStart = Number(await canvas.getAttribute("data-dust-time"));
  expect(introStart).toBeLessThan(0.5);
  await page.waitForTimeout(350);
  const introAfter = Number(await canvas.getAttribute("data-intro"));
  const dustAfter = Number(await canvas.getAttribute("data-dust-time"));
  expect(introAfter).toBeGreaterThan(introStart);
  expect(dustAfter).toBeGreaterThan(dustStart);
  await expect
    .poll(async () => Number(await canvas.getAttribute("data-intro")))
    .toBe(1);
  const settledDust = Number(await canvas.getAttribute("data-dust-time"));
  await page.waitForTimeout(250);
  expect(Number(await canvas.getAttribute("data-dust-time"))).toBeGreaterThan(
    settledDust,
  );
});

test("keeps the core interactions working", async ({ page }) => {
  await prepareStablePage(page);

  const hero = page.getByRole("heading", { name: /Get paid\. Earn\.\s*Send worldwide\./ });
  await expect(hero).toBeVisible();
  await expect(page.getByText(/Your own USD account\. Up to 7% APY with Yields/)).toBeVisible();
  await expect(page.locator(".journey-card")).toHaveCount(3);
  await expect(page.locator(".journey-kicker")).toHaveCount(0);
  await expect(page.getByText("What do you want to do?", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Receive", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore receiving" })).toHaveAttribute("href", /\/receive\/?$/);
  await expect(page.getByRole("link", { name: "Check rates & destinations" })).toHaveAttribute("href", /\/send\/#rates$/);
  await expect(page.getByRole("link", { name: "Explore Yields" })).toHaveAttribute("href", /\/yields\/?$/);

  const personalMenu = page.locator(".nav-dropdown");
  await personalMenu.locator("summary").hover();
  await expect(personalMenu).toHaveAttribute("open", "");
  const productEntries = personalMenu.locator(".nav-dropdown-menu a");
  await expect(productEntries).toHaveCount(3);
  await expect(productEntries.nth(0)).toContainText("ReceiveReceive money into your own USD account and stablecoin wallet");
  await expect(productEntries.nth(1)).toContainText("EarnEarn up to 7% APY on your balance");
  await expect(productEntries.nth(2)).toContainText("SendSend money to stablecoin wallets and to local bank accounts in 30+ countries");
  await productEntries.nth(2).hover();
  await page.waitForTimeout(220);
  await expect(personalMenu).toHaveAttribute("open", "");
  await expect(productEntries.nth(2)).toBeVisible();

  await expect(page.locator(".journey-card h3")).toHaveText(["Receive", "Earn", "Send"]);

  const journeyTitleMetrics = await page.locator(".journey-card h3").evaluateAll((titles) =>
    titles.map((title) => {
      const range = document.createRange();
      range.selectNodeContents(title);
      return {
        fontSize: getComputedStyle(title).fontSize,
        lineHeight: getComputedStyle(title).lineHeight,
        lineBoxes: range.getClientRects().length,
      };
    }),
  );
  expect(new Set(journeyTitleMetrics.map((item) => item.fontSize)).size).toBe(1);
  expect(new Set(journeyTitleMetrics.map((item) => item.lineHeight)).size).toBe(1);
  for (const item of journeyTitleMetrics) {
    expect(item.lineBoxes).toBe(1);
  }

  const heroTitleSize = await hero.evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize));
  expect(heroTitleSize).toBeGreaterThanOrEqual(107);
  const desktopDescriptionSize = await page.locator(".hero-copy > p").evaluate(
    (node) => Number.parseFloat(getComputedStyle(node).fontSize),
  );
  expect(desktopDescriptionSize).toBe(22);
  const heroProductHeight = await page.locator(".hero-product").evaluate(
    (node) => node.getBoundingClientRect().height,
  );
  expect(heroProductHeight).toBeGreaterThanOrEqual(450);
  const journeyArtSize = await page.locator(".journey-art").first().evaluate((node) => ({
    width: node.getBoundingClientRect().width,
    height: node.getBoundingClientRect().height,
  }));
  expect(journeyArtSize.width).toBeGreaterThanOrEqual(109);
  expect(journeyArtSize.width).toBeLessThanOrEqual(111);
  expect(journeyArtSize.height).toBeGreaterThanOrEqual(109);
  expect(journeyArtSize.height).toBeLessThanOrEqual(111);
  await expect(page.locator(".journey-card").first()).toHaveCSS("height", "500px");
  const journeyArtOffset = await page.locator(".journey-card").first().evaluate((card) => {
    const art = card.querySelector(".journey-art");
    if (!(art instanceof HTMLElement)) return null;
    const cardBox = card.getBoundingClientRect();
    const artBox = art.getBoundingClientRect();
    return { left: artBox.left - cardBox.left, top: artBox.top - cardBox.top };
  });
  expect(journeyArtOffset).not.toBeNull();
  expect(journeyArtOffset!.left).toBeLessThanOrEqual(30);
  expect(journeyArtOffset!.top).toBeLessThanOrEqual(36);
  await expect(page.locator(".journey-card").first()).toHaveCSS("transform", "none");

  await page.goto("/send/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Send", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Bank transfer", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Stablecoin wallet", exact: true })).toBeVisible();
  await expect(page.locator("#bank-accounts .method-flow-screen img")).toHaveAttribute("src", /how-to-send-02\.png$/);
  await expect(page.locator("#wallet .method-flow-screen img")).toHaveAttribute("src", /how-to-send-01\.png$/);
  await expect(page.locator("#wallet .wallet-network-list article")).toHaveCount(5);
  await expect(page.locator("#wallet .wallet-assets > div")).toHaveCount(2);
  await expect(page.locator(".scenario-how")).toHaveCount(0);

  const currencyPicker = page.locator("#receive-currency");
  await currencyPicker.click();
  const currencyMenu = page.getByRole("listbox", { name: "Recipient currency" });
  await expect(currencyMenu.getByRole("option")).toHaveCount(5);
  await currencyMenu.getByRole("option", { name: /Colombia.*COP/ }).click();
  await expect(page.locator(".money-input.result strong")).toContainText("~$3,026,213.09");
  await expect(page.locator(".rate-freshness")).toContainText("Live");

  const countriesDialog = page.locator(".receive-countries-dialog");
  await page.getByRole("button", { name: "All receiving countries" }).click();
  await expect(countriesDialog).toBeVisible();
  await expect(countriesDialog.locator(".receiving-country-group li")).toHaveCount(30);
  await page.getByRole("button", { name: "Close receiving countries" }).click();

  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".blog-card")).toHaveCount(4);
  await expect(page.getByText("How to compare a transfer beyond the headline rate")).toHaveCount(0);
});

test("uses the intended mobile hero line breaks", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await prepareStablePage(page);

  await expect(page.locator(".hero-title-desktop")).toBeHidden();
  const mobileLines = page.locator(".hero-title-mobile .hero-title-line");
  await expect(mobileLines).toHaveText(["Get paid.", "Earn. Send", "worldwide."]);

  const mobileDescriptionEnding = page.locator(".hero-copy-mobile-keep");
  await expect(mobileDescriptionEnding).toHaveText(
    "Yields. Bank transfers to 30+ countries.",
  );
  await expect(mobileDescriptionEnding).toHaveCSS("white-space", "nowrap");
});

test("renders the pricing preview and legal links", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/plan/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Pricing" })).toBeVisible();
  await expect(
    page.getByText(/Preview pricing\. Applicable fees are always shown at confirmation\./),
  ).toBeVisible();
  await expect(page.getByText(/Free over \$10/)).toBeVisible();
  await expect(page.getByText("Free · FX Rate", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Yields", exact: true })).toBeVisible();
  await expect(page.getByText("Deposit and withdrawal", { exact: true })).toBeVisible();
  await expect(page.getByText("~$0.01*", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Terms & Conditions" })).toHaveAttribute(
    "href",
    /\/terms\/?$/,
  );
  await expect(page.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
    "href",
    /\/privacy-policy\/?$/,
  );
  const firstPriceRow = page.locator(".pricing-group dl > div").first();
  const priceColumns = await firstPriceRow.evaluate(
    (node) => getComputedStyle(node).gridTemplateColumns.split(" ").length,
  );
  const [service, price] = await Promise.all([
    firstPriceRow.locator("dt").boundingBox(),
    firstPriceRow.locator("dd").boundingBox(),
  ]);
  expect(priceColumns).toBe(2);
  expect(service).not.toBeNull();
  expect(price).not.toBeNull();
  expect(price!.x).toBeGreaterThan(service!.x);
});

test("offers help from the footer support section", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  const footer = page.locator("footer");
  await expect(footer.getByText("Support", { exact: true })).toBeVisible();
  await expect(footer.getByRole("link", { name: "FAQ", exact: true })).toHaveAttribute(
    "href",
    /\/#faq$/,
  );
  await expect(footer.getByRole("link", { name: "hello@jazary.xyz" })).toHaveAttribute(
    "href",
    "mailto:hello@jazary.xyz",
  );
  await expect(footer.getByRole("link", { name: "Contact", exact: true })).toHaveCount(0);
  await expect(page.locator(".nav-mobile-group").getByRole("link", { name: "Contact", exact: true })).toHaveCount(0);

  await footer.getByRole("link", { name: "Help", exact: true }).click();
  await expect(page).toHaveURL(/\/help\/?$/);
  await expect(page.getByRole("heading", { name: "Help", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Have a question?" })).toBeVisible();
  await expect(page.getByText(/If you have any questions, please reach us/)).toBeVisible();
  await expect(page.getByRole("link", { name: "hello@jazari.xyz" })).toHaveAttribute(
    "href",
    "mailto:hello@jazari.xyz",
  );

  const viewport = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(viewport.scrollWidth).toBe(viewport.clientWidth);
});

test("keeps audience cards readable in a compact desktop window", async ({ page }) => {
  await page.setViewportSize({ width: 940, height: 800 });
  await page.goto("/", { waitUntil: "networkidle" });

  const audience = page.locator(".audience-explorer");
  await audience.scrollIntoViewIfNeeded();
  const metrics = await audience.evaluate((node) => ({
    columns: getComputedStyle(node).gridTemplateColumns.split(" ").length,
    cardWidths: Array.from(node.children, (card) =>
      Math.round(card.getBoundingClientRect().width),
    ),
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(metrics.columns).toBe(2);
  expect(Math.min(...metrics.cardWidths)).toBeGreaterThanOrEqual(430);
  expect(metrics.scrollWidth).toBe(metrics.clientWidth);
});

test("uses Safari-safe phone rendering and stacks cards in narrow windows", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/receive/", { waitUntil: "networkidle" });

  const phoneImage = page.locator("#usd-account .method-flow-screen img");
  const phoneLayers = await page.locator("#usd-account .method-flow-screen").evaluate((screen) => {
    const phone = screen.querySelector(".phone");
    return {
      mask: getComputedStyle(screen).maskImage,
      filter: phone ? getComputedStyle(phone).filter : "missing",
    };
  });
  expect(phoneLayers).toEqual({ mask: "none", filter: "none" });
  await expect
    .poll(() => phoneImage.evaluate((image) => (image as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0);

  const viewport = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(viewport.scrollWidth).toBe(viewport.clientWidth);
});

test("renders the legal documents as internal Jazari pages", async ({ page }) => {
  await page.goto("/terms/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "US Terms and Conditions" })).toBeVisible();
  await expect(page.getByText("Effective date: 21 April 2026")).toBeVisible();
  await expect(page.getByRole("heading", { name: "1. Introduction" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "29. State-specific disclosures" }),
  ).toBeAttached();
  await expect(
    page.getByRole("heading", { name: "30. Contact information" }),
  ).toBeAttached();
  await expect(page.getByRole("link", { name: "Introduction", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "INTRODUCTION", exact: true })).toHaveCount(0);

  await page.getByRole("link", { name: "Privacy Policy" }).first().click();
  await expect(page).toHaveURL(/\/privacy-policy\/?$/);
  await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible();
  await expect(page.getByText("Last updated: April 2026")).toBeVisible();
  await expect(page.getByRole("heading", { name: "11. Cookies" })).toBeVisible();
});

test("renders UK risk information statically and without mobile overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/uk-risk-information/", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("heading", { name: "Risk information for customers in the United Kingdom" }),
  ).toBeVisible();
  await expect(page.getByText(/Reading time:/)).toHaveCount(0);
  await expect(page.getByText("Last updated: 20 Aug 2026", { exact: true })).toBeVisible();
  await expect(page.getByText("Due to the potential for losses", { exact: false })).toHaveCount(0);
  await expect(page.getByText("What are the key risks?", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "hello@jazari.xyz" })).toHaveAttribute(
    "href",
    "mailto:hello@jazari.xyz",
  );
  await expect(page.getByRole("heading", { name: "D. Complaints" })).toBeAttached();
  await expect(page.getByRole("link", { name: "UK Risk Information" })).toHaveAttribute(
    "href",
    /\/uk-risk-information\/?$/,
  );

  const tocLink = page.getByRole("navigation", { name: "Risk information for customers in the United Kingdom sections" })
    .getByRole("link", { name: "You could lose all the money you invest" });
  await expect(tocLink).toHaveAttribute("href", "#lose-all-money");
  await tocLink.click();
  await expect(page).toHaveURL(/#lose-all-money$/);

  const externalLinks = page.locator(".legal-document a[href^='https://']");
  await expect(externalLinks).toHaveCount(5);
  for (const link of await externalLinks.all()) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }

  const viewport = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(viewport.scrollWidth).toBe(viewport.clientWidth);
});

test("places legal document content to the left of Contents on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  for (const path of ["/privacy-policy/", "/terms/", "/uk-risk-information/"]) {
    await page.goto(path, { waitUntil: "networkidle" });
    const [document, contents] = await Promise.all([
      page.locator(".legal-document").boundingBox(),
      page.locator(".legal-index").boundingBox(),
    ]);

    expect(document).not.toBeNull();
    expect(contents).not.toBeNull();
    expect(document!.x).toBeLessThan(contents!.x);
    expect(Math.abs(document!.y - contents!.y)).toBeLessThanOrEqual(1);
  }
});

test("aligns footer copyright with the final disclosure on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });

  const [lastDisclosure, stores, copyright] = await Promise.all([
    page.locator(".footer-disclosures li").last().boundingBox(),
    page.locator(".footer-stores").boundingBox(),
    page.locator(".footer-copyright").boundingBox(),
  ]);

  expect(lastDisclosure).not.toBeNull();
  expect(stores).not.toBeNull();
  expect(copyright).not.toBeNull();
  expect(
    Math.abs(
      (lastDisclosure!.y + lastDisclosure!.height) -
      (copyright!.y + copyright!.height),
    ),
  ).toBeLessThanOrEqual(2);
  expect(copyright!.y - (stores!.y + stores!.height)).toBeGreaterThanOrEqual(18);
  expect(copyright!.y - (stores!.y + stores!.height)).toBeLessThanOrEqual(28);
});

test("explains yields and links into the app flow", async ({ page }) => {
  await page.goto("/yields/", { waitUntil: "networkidle" });
  await expect(
    page.getByRole("heading", { name: "Yields", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Gauntlet USD Alpha" })).toBeVisible();
  await expect(page.getByText("USDC", { exact: true })).toHaveCount(2);
  await expect(page.getByText("USDC", { exact: true }).first()).toBeVisible();
  await expect(page.getByText(/USDC · USDT|USDC or USDT/)).toHaveCount(0);
  await expect(page.getByText("4.66%", { exact: true })).toBeVisible();
  await expect(page.getByText("7%", { exact: true })).toBeVisible();
  await expect(page.getByText("Variable", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Lido EarnUSD" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Lido" })).toHaveAttribute(
    "src",
    /lido-white\.svg$/,
  );
  await expect(page.getByRole("link", { name: "Open Lido EarnUSD" })).toHaveAttribute(
    "href",
    "https://stake.lido.fi/earn/usd/deposit",
  );
  await expect(page.getByText("Illustrative rate supplied by Jazari")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "How Yields work" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ready to open Yields?" })).toBeVisible();
  await expect(page.getByText("Return and risk move together")).toHaveCount(0);
  const yieldCards = await page.locator(".yield-feature").evaluateAll((cards) =>
    cards.map((card) => {
      const box = card.getBoundingClientRect();
      return { x: box.x, y: box.y, width: box.width };
    }),
  );
  expect(yieldCards).toHaveLength(2);
  expect(Math.abs(yieldCards[0].y - yieldCards[1].y)).toBeLessThanOrEqual(1);
  expect(yieldCards[1].x).toBeGreaterThan(yieldCards[0].x + yieldCards[0].width);
  await expect(page.getByRole("link", { name: "Download App" }).last()).toHaveAttribute(
    "href", "https://jazarione.app.link/web-launch",
  );
});

test("keeps receiving on one product page and redirects the old USD account route", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Receive", exact: true })).toBeVisible();
  await expect(page.locator(".journey-card").nth(1).locator("img")).toHaveAttribute(
    "src",
    /yields-wheat\.png$/,
  );
  await expect(page.locator('.nav-dropdown-menu a[href$="/usd-account/"]')).toHaveCount(0);

  await page.goto("/usd-account/", { waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/receive\/#usd-account$/);
  await expect(page.getByRole("heading", { name: "Receive", exact: true })).toBeVisible();
  const usdAccountHeading = page.getByRole("heading", { name: "USD Account", exact: true });
  await expect(usdAccountHeading).toBeVisible();
  await expect(page.getByText(/licensed US bank partner/)).toBeVisible();
  await expect(page.getByText(/US routing and account number/).first()).toBeVisible();
  await expect(page.getByText(/ACH, FedNow, domestic wire, and SWIFT/).first()).toBeVisible();
  await expect(page.getByText(/Eligible users in 190\+ countries/)).toBeVisible();
  const walletHeading = page.getByRole("heading", { name: "Stablecoin wallet", exact: true });
  await expect(walletHeading).toBeVisible();
  await expect(page.getByRole("heading", { name: "Supported networks", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Supported stablecoins", exact: true })).toBeVisible();
  await expect(page.getByText("Ethereum", { exact: true })).toBeVisible();
  await expect(page.getByText("TRON", { exact: true })).toBeVisible();
  await expect(page.getByText("Solana", { exact: true })).toBeVisible();
  await expect(page.getByText("Polygon", { exact: true })).toBeVisible();
  await expect(page.getByText("Base", { exact: true })).toBeVisible();
  const [usdHeadingBox, usdDescriptionBox, walletHeadingBox, walletDescriptionBox] = await Promise.all([
    usdAccountHeading.boundingBox(),
    page.locator("#usd-account .method-flow-description").boundingBox(),
    walletHeading.boundingBox(),
    page.locator("#wallet .method-flow-description").boundingBox(),
  ]);
  expect(usdDescriptionBox!.y).toBeGreaterThan(usdHeadingBox!.y + usdHeadingBox!.height);
  expect(walletDescriptionBox!.y).toBeGreaterThan(walletHeadingBox!.y + walletHeadingBox!.height);
  await expect(page.locator("#wallet .wallet-network-list article")).toHaveCount(5);
  await expect(page.locator("#wallet .wallet-assets > div")).toHaveCount(2);
  await expect(page.locator("#wallet .method-flow-screen img")).toBeVisible();
  const [networkCardBox, stablecoinCardBox] = await Promise.all([
    page.locator("#wallet .wallet-network-list article").first().boundingBox(),
    page.locator("#wallet .wallet-assets > div").first().boundingBox(),
  ]);
  expect(Math.abs(networkCardBox!.width - stablecoinCardBox!.width)).toBeLessThanOrEqual(1);
  const [walletSupportBox, walletPhoneBox] = await Promise.all([
    page.locator("#wallet .method-flow-copy").boundingBox(),
    page.locator("#wallet .method-flow-screen").boundingBox(),
  ]);
  expect(walletSupportBox!.x).toBeLessThan(walletPhoneBox!.x);
  await expect(page.locator("#wallet")).toHaveCSS("border-top-width", "0px");
  await expect(page.getByText(/Availability is subject to identity verification/)).toHaveCount(0);
  await expect(page.locator("#wallet .wallet-network-list img").first()).toHaveCSS(
    "filter",
    "grayscale(1) brightness(0) invert(1)",
  );
  await expect(page.locator(".scenario-how")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Download App" }).first()).toHaveAttribute(
    "href",
    "https://jazarione.app.link/web-launch",
  );

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#usd-account .method-flow-screen")).toBeVisible();
  const viewport = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(viewport.scrollWidth).toBe(viewport.clientWidth);
});

test("shows every product milestone on the roadmap page", async ({ page }) => {
  await page.goto("/roadmap/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Coming soon" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "USD account" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Visa card" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Additional payout countries" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Higher-return Yields" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Remit Now Pay Later" })).toBeVisible();
  await expect(page.locator(".roadmap-flags").first()).toHaveCSS("flex-direction", "column");
  const visaCard = page.locator(".roadmap-full-card").first();
  const payoutCard = page.locator(".roadmap-full-card").nth(1);
  await expect(visaCard.locator(".roadmap-milestone-art")).toHaveAttribute(
    "src",
    /visa-card\.png$/,
  );
  const roadmapCards = page.locator(".roadmap-full-card");
  const [firstCard, secondCard] = await Promise.all([
    roadmapCards.nth(0).boundingBox(),
    roadmapCards.nth(1).boundingBox(),
  ]);
  expect(firstCard).not.toBeNull();
  expect(secondCard).not.toBeNull();
  expect(firstCard!.height).toBe(500);
  expect(secondCard!.x).toBeGreaterThan(firstCard!.x + firstCard!.width);

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileHeights = await roadmapCards.evaluateAll((cards) =>
    cards.map((card) => Math.round(card.getBoundingClientRect().height)),
  );
  expect(new Set(mobileHeights).size).toBe(1);
  expect(mobileHeights[0]).toBe(352);
  const [mobileVisaCard, mobileVisaArt, mobilePayoutCard, mobileFlags] = await Promise.all([
    visaCard.boundingBox(),
    visaCard.locator(".roadmap-milestone-art").boundingBox(),
    payoutCard.boundingBox(),
    payoutCard.locator(".roadmap-flags").boundingBox(),
  ]);
  expect(mobileVisaCard).not.toBeNull();
  expect(mobileVisaArt).not.toBeNull();
  expect(mobilePayoutCard).not.toBeNull();
  expect(mobileFlags).not.toBeNull();
  expect(mobileVisaArt!.x + mobileVisaArt!.width).toBeGreaterThan(
    mobileVisaCard!.x + mobileVisaCard!.width,
  );
  expect(mobileVisaArt!.y + mobileVisaArt!.height).toBeGreaterThan(
    mobileVisaCard!.y + mobileVisaCard!.height,
  );
  expect(mobileFlags!.x).toBeGreaterThanOrEqual(mobilePayoutCard!.x);
  expect(mobileFlags!.x + mobileFlags!.width).toBeLessThanOrEqual(
    mobilePayoutCard!.x + mobilePayoutCard!.width + 1,
  );
});

test("explains who the reader trusts with their money", async ({ page }) => {
  await page.goto("/about/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "About us" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Manifesto" })).toBeVisible();
  await expect(page.getByText(/Every transfer begins with something real/)).toBeVisible();
  await expect(page.getByText(/Alex and Has, founders of Jazari One/)).toBeVisible();
  const foundersPhoto = page.getByRole("img", {
    name: "Alex and Has, founders of Jazari One, seated together",
  });
  await expect(
    foundersPhoto,
  ).toBeVisible();
  await foundersPhoto.scrollIntoViewIfNeeded();
  await expect
    .poll(() => foundersPhoto.evaluate((image) => image.currentSrc))
    .toContain("jazari-founders-1600.avif");
  const foundersResolution = await foundersPhoto.evaluate((image) => ({
    naturalWidth: image.naturalWidth,
    renderedWidth: image.getBoundingClientRect().width,
  }));
  expect(foundersResolution.naturalWidth).toBeGreaterThanOrEqual(
    foundersResolution.renderedWidth,
  );
  const [manifestHeadingBox, foundersPhotoBox] = await Promise.all([
    page.getByRole("heading", { name: "Manifesto" }).boundingBox(),
    foundersPhoto.boundingBox(),
  ]);
  expect(manifestHeadingBox).not.toBeNull();
  expect(foundersPhotoBox).not.toBeNull();
  expect(foundersPhotoBox!.y + foundersPhotoBox!.height).toBeLessThan(manifestHeadingBox!.y);
  await expect(
    page.getByRole("heading", { name: "Built in the United States and UAE" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Jazari One, Inc." })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Jazari Fintech Services — FZCO" }),
  ).toBeVisible();
  await expect(page.getByText("United States entity")).toHaveCount(0);
  await expect(page.getByText("UAE entity")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Our partners" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Bridge logo" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Lido logo" })).toBeVisible();
  await expect(page.locator(".about-partners .provider-card")).toHaveCount(4);
  await expect(page.getByText("Your account, your keys.")).toBeVisible();
  await expect(page.getByText(/not a bank and not us/)).toBeVisible();
  const allPartners = page.getByRole("link", { name: /See all partners/ });
  await expect(allPartners).toHaveAttribute(
    "href",
    /\/partners\/?$/,
  );
  await expect(allPartners).toHaveCSS("border-radius", "999px");
  const [partnersHeadingBox, allPartnersBox] = await Promise.all([
    page.getByRole("heading", { name: "Our partners" }).boundingBox(),
    allPartners.boundingBox(),
  ]);
  expect(partnersHeadingBox).not.toBeNull();
  expect(allPartnersBox).not.toBeNull();
  expect(allPartnersBox!.x).toBeGreaterThan(partnersHeadingBox!.x);
  expect(Math.abs(
    (allPartnersBox!.y + allPartnersBox!.height) -
    (partnersHeadingBox!.y + partnersHeadingBox!.height),
  )).toBeLessThan(3);
});

test("uses concise Blog titles without route labels", async ({ page }) => {
  await page.goto("/blog/", { waitUntil: "networkidle" });
  await expect(
    page.getByRole("heading", { name: "How to send dollars to Mexico in 3 steps" }),
  ).toBeVisible();
  await expect(page.locator(".blog-index-copy > span")).toHaveCount(0);
});

test("renders the numbered component board with live interactions", async ({ page }) => {
  await page.goto("/storyboard/", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("heading", { name: /Jazari One component board/ }),
  ).toBeVisible();
  await expect(page.locator(".storyboard-story")).toHaveCount(11);
  await expect(page.locator(".sb-specimen.sb-desktop")).toHaveCount(11);
  await expect(page.locator(".sb-specimen.sb-mobile")).toHaveCount(11);
  await expect(page.getByRole("heading", { name: "Dropdowns" })).toBeVisible();

  const dropdownIndex = page.getByRole("link", { name: /06 Dropdowns/ });
  await dropdownIndex.click();
  await expect(page).toHaveURL(/#story-dropdowns$/);

  const accordions = page.locator("#story-accordions");
  await accordions.scrollIntoViewIfNeeded();
  const firstQuestion = accordions.locator("details").first();
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
  await menu.click({ position: { x: 360, y: 780 } });
  await expect(menu.locator("#mobile-product-links")).toBeVisible();
  await expect(menu.getByText("Company", { exact: true })).toBeVisible();
  await expect(menu.getByRole("link", { name: /Send.*Send money to stablecoin wallets/ })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Partners", exact: true })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Terms & Conditions" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Privacy Policy" })).toBeVisible();
  await expect(menu.getByText("Cookies", { exact: true })).toHaveCount(0);
  const [paidLine, earnedLine] = await Promise.all([
    page.locator(".hero-title-mobile .hero-title-line").nth(0).boundingBox(),
    page.locator(".hero-title-mobile .hero-title-line").nth(1).boundingBox(),
  ]);
  expect(paidLine).not.toBeNull();
  expect(earnedLine).not.toBeNull();
  expect(earnedLine!.y).toBeGreaterThan(paidLine!.y + paidLine!.height * 0.7);
  const [receiveTitle, receiveDescription, companyLink] = await Promise.all([
    menu.locator(".nav-mobile-product-group .nav-product-entry span").first().boundingBox(),
    menu.locator(".nav-mobile-product-group .nav-product-entry small").first().boundingBox(),
    menu.getByRole("link", { name: "Blog", exact: true }).boundingBox(),
  ]);
  expect(receiveTitle).not.toBeNull();
  expect(receiveDescription).not.toBeNull();
  expect(companyLink).not.toBeNull();
  expect(receiveDescription!.y).toBeGreaterThanOrEqual(receiveTitle!.y + receiveTitle!.height + 3);
  const [productTitleSize, companyLinkSize] = await Promise.all([
    menu.locator(".nav-mobile-product-group .nav-product-entry span").first().evaluate(
      (node) => getComputedStyle(node).fontSize,
    ),
    menu.getByRole("link", { name: "Blog", exact: true }).evaluate(
      (node) => getComputedStyle(node).fontSize,
    ),
  ]);
  expect(productTitleSize).toBe(companyLinkSize);
  const [download, socials, legal] = await Promise.all([
    menu.getByRole("link", { name: "Download App" }).boundingBox(),
    menu.locator(".nav-mobile-socials").boundingBox(),
    menu.locator(".nav-mobile-legal").boundingBox(),
  ]);
  expect(download).not.toBeNull();
  expect(socials).not.toBeNull();
  expect(legal).not.toBeNull();
  expect(Math.abs(
    download!.y + download!.height / 2 - (socials!.y + socials!.height / 2),
  )).toBeLessThanOrEqual(1);
  expect(legal!.y).toBeGreaterThan(download!.y + download!.height);
  await expect
    .poll(() => menu.evaluate((node) => Math.round(node.getBoundingClientRect().height)))
    .toBe(844);
  await expect
    .poll(() => page.evaluate(() => document.body.style.overflow))
    .toBe("hidden");

  await page.getByRole("button", { name: "Close navigation" }).click();
  await expect(menu).not.toHaveClass(/is-open/);
});

test("keeps mobile Coming soon cards visible with intentionally cropped artwork", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await prepareStablePage(page);

  const roadmapWindow = page.locator(".roadmap-window");
  const roadmapTrack = page.locator(".roadmap-track");
  await roadmapWindow.scrollIntoViewIfNeeded();
  await expect
    .poll(() => roadmapWindow.evaluate(
      (node) => getComputedStyle(node, "::after").display,
    ))
    .toBe("none");

  const visaCard = page.locator(".roadmap-card").first();
  const visaArt = visaCard.locator(".roadmap-milestone-art");
  const visaCopy = visaCard.locator(".roadmap-milestone-copy");
  const [cardBox, artBox, copyBox] = await Promise.all([
    visaCard.boundingBox(),
    visaArt.boundingBox(),
    visaCopy.boundingBox(),
  ]);
  expect(cardBox).not.toBeNull();
  expect(artBox).not.toBeNull();
  expect(copyBox).not.toBeNull();
  expect(Math.round(cardBox!.height)).toBe(352);
  expect(artBox!.x + artBox!.width).toBeGreaterThan(cardBox!.x + cardBox!.width);
  expect(artBox!.y + artBox!.height).toBeGreaterThan(cardBox!.y + cardBox!.height);
  expect(copyBox!.y + copyBox!.height).toBeLessThanOrEqual(artBox!.y + 1);

  const payoutFlags = page.locator(".roadmap-card").nth(1).locator(".roadmap-flags");
  await expect(payoutFlags).toBeVisible();

  await roadmapTrack.evaluate((node) => {
    node.scrollLeft = node.scrollWidth - node.clientWidth;
  });
  await expect
    .poll(() => roadmapTrack.evaluate(
      (node) => Math.round(node.scrollWidth - node.clientWidth - node.scrollLeft),
    ))
    .toBeLessThanOrEqual(1);
  await expect(page.locator(".roadmap-card").last()).toBeVisible();
  await expect(page.locator(".roadmap-card").last()).toHaveCSS("transform-style", "flat");
  await expect(page.locator(".roadmap-card").last()).toHaveCSS("will-change", "auto");
});

test("keeps the Receive account features and phone preview usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await prepareStablePage(page, "/receive/");

  await page.getByRole("heading", { name: "USD Account" }).scrollIntoViewIfNeeded();

  const flow = page.locator("#usd-account .method-flow");
  const features = flow.locator(".method-flow-features > div");
  await expect(features).toHaveCount(4);
  const activeScreenImage = flow.locator(".method-flow-screen img");
  await expect
    .poll(() => activeScreenImage.evaluate((image) => (image as HTMLImageElement).naturalWidth))
    .toBeGreaterThanOrEqual(300);
  expect(
    await activeScreenImage.evaluate((image) => (image as HTMLImageElement).naturalWidth),
  ).toBeLessThanOrEqual(520);
  await expect
    .poll(() => flow.locator(".method-flow-screen").evaluate(
      (node) => getComputedStyle(node).maskImage,
    ))
    .toBe("none");

  await expect(flow).toBeVisible();
  await expect(activeScreenImage).toHaveAttribute("src", /receive-usd-account\.png$/);
  await expect(features.nth(0)).toContainText("US routing and account number");
  await expect(features.nth(2)).toContainText("190+ countries");
  await expect(features.nth(3)).toContainText("Incoming fee$0");
  await expect(flow.locator(".phone-copy-corrections")).toHaveCount(0);
  await expect(flow).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  const [screenBox, phoneBox] = await Promise.all([
    flow.locator(".method-flow-screen").boundingBox(),
    flow.locator(".method-flow-phone-shell").boundingBox(),
  ]);
  expect(screenBox!.height).toBeGreaterThanOrEqual(phoneBox!.height - 1);
});

test("shows wallet receiving details without a generic walkthrough floor", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await prepareStablePage(page, "/receive/");

  await expect(page.locator(".scenario-how")).toHaveCount(0);
  await expect(page.locator("#wallet .method-flow-screen img")).toHaveAttribute(
    "src",
    /receive-stablecoins-account\.png$/,
  );
  await expect(page.locator("#wallet .wallet-network-list article")).toHaveCount(5);
  await expect(page.locator("#wallet > .wallet-support")).toHaveCount(0);
  await expect(page.locator("#wallet .method-flow-copy .wallet-support")).toHaveCount(1);
  await expect(page.locator("#wallet .phone-copy-corrections")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Receive through a wallet" })).toHaveCount(0);
});

test("fits the complete Yields mobile interaction at 430px", async ({ page }) => {
  await page.setViewportSize({ width: 430, height: 932 });
  await prepareStablePage(page, "/yields/");

  await page.getByRole("heading", { name: "How it works" }).scrollIntoViewIfNeeded();
  const steps = page.locator(".scenario-how").getByRole("tab");
  await expect(steps).toHaveCount(3);
  await expect(steps.first()).toHaveAttribute("aria-selected", "true");
  await steps.nth(2).click();
  await expect(steps.nth(2)).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#yields-step-screen .active-step-phone.is-active img")).toHaveAttribute(
    "src",
    /how-to-yield-03\.png$/,
  );
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
