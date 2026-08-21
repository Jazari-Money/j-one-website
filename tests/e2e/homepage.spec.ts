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

async function prepareStablePage(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".home-page")).toHaveClass(/is-ready/);
  await expect(page.locator(".hero-color-event canvas")).toHaveAttribute(
    "data-rendered",
    "true",
  );
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

  await page.goto("/", { waitUntil: "domcontentloaded" });
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

  await page.goto("/", { waitUntil: "domcontentloaded" });
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

  await expect(page.getByRole("heading", { name: /Use digital dollars\.\s*Anywhere\./ })).toBeVisible();
  await expect(page.locator("main")).toHaveAttribute("data-theme", "jazari");
  await expect(page.locator("main")).toHaveAttribute("data-shader", "color-event");
  await expect(page.getByRole("button", { name: /Choose color theme/ })).toHaveCount(0);
  await expect
    .poll(() => page.evaluate(() => window.localStorage.getItem("jazari-theme")))
    .toBeNull();
  await expect
    .poll(() => page.evaluate(() => window.localStorage.getItem("jazari-shader")))
    .toBeNull();

  const personalMenu = page.locator(".nav-dropdown");
  await expect(personalMenu.locator("summary")).toHaveText("Product");
  await personalMenu.locator("summary").click();
  await expect(personalMenu).toHaveAttribute("open", "");
  await expect(personalMenu.locator(".nav-dropdown-menu a")).toHaveText([
    "Receive",
    "Send",
    "Rates",
    "Yields",
  ]);
  await page.mouse.click(40, 300);
  await expect(personalMenu).not.toHaveAttribute("open", "");

  const heroAccess = page.locator(".magic-access-button");
  await heroAccess.hover({ position: { x: 22, y: 12 } });
  await expect
    .poll(() =>
      heroAccess.evaluate((node) => node.style.getPropertyValue("--pointer-nx")),
    )
    .not.toBe("0");
  const heroLabelOffset = await heroAccess.evaluate((node) => {
    const button = node.getBoundingClientRect();
    const label = node.querySelector(".button-label")?.getBoundingClientRect();
    if (!label) return Number.POSITIVE_INFINITY;
    return Math.abs(
      button.top + button.height / 2 - (label.top + label.height / 2),
    );
  });
  expect(heroLabelOffset).toBeLessThanOrEqual(1);
  const heroTitleSize = await page
    .getByRole("heading", { name: /Use digital dollars\.\s*Anywhere\./ })
    .evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize));
  expect(heroTitleSize).toBeGreaterThanOrEqual(107);

  const receiveScenario = page.getByRole("tab", { name: "Receive", exact: true });
  await receiveScenario.focus();
  await receiveScenario.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Send", exact: true })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("tab", { name: /Pick a destination/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.locator("#step-screen .active-step-phone.is-active img")).toHaveAttribute(
    "src",
    /how-to-send-01\.png$/,
  );
  await page.getByRole("tab", { name: "Yields", exact: true }).click();
  await expect(page.getByRole("tab", { name: /Open Yields/ })).toBeVisible();
  const yieldsLink = page.getByRole("link", { name: "Learn more about Yields" });
  await expect(yieldsLink).toHaveCount(1);
  await expect(yieldsLink).toBeVisible();
  await page.getByRole("tab", { name: "Receive", exact: true }).click();
  const comingSoon = page.locator(".step-status");
  await expect(comingSoon).toHaveText("Coming soon");
  await expect
    .poll(() =>
      comingSoon.evaluate((node) => {
        const style = getComputedStyle(node);
        return `${style.backgroundColor}|${style.color}`;
      }),
    )
    .toBe("rgb(244, 244, 239)|rgb(8, 10, 9)");

  const currencyPicker = page.locator("#receive-currency");
  await currencyPicker.click();
  const currencyMenu = page.getByRole("listbox", { name: "Recipient currency" });
  await expect(currencyMenu.getByRole("option")).toHaveCount(5);
  await expect(currencyMenu.getByRole("option", { name: /Mexico.*MXN/ })).toBeVisible();
  await expect(currencyMenu.getByRole("option", { name: /Colombia.*COP/ })).toBeVisible();
  await expect(currencyMenu.getByRole("option", { name: /Brazil.*BRL/ })).toBeVisible();
  await expect(currencyMenu.getByRole("option", { name: /Europe.*EUR/ })).toBeVisible();
  await expect(currencyMenu.getByRole("option", { name: /United Kingdom.*GBP/ })).toBeVisible();
  const currencyMenuStyle = await currencyMenu.evaluate((node) => {
    const style = getComputedStyle(node);
    const option = node.querySelector("[role=option]");
    return {
      background: style.backgroundColor,
      opacity: style.opacity,
      optionBackground: option ? getComputedStyle(option).backgroundColor : "",
      zIndex: style.zIndex,
    };
  });
  expect(currencyMenuStyle).toEqual({
    background: "rgb(23, 26, 24)",
    opacity: "1",
    optionBackground: "rgb(36, 40, 38)",
    zIndex: "20",
  });
  await currencyMenu.getByRole("option", { name: /Colombia.*COP/ }).click();
  await expect(currencyPicker).toContainText("COP");
  await expect(page.locator(".money-input.result strong")).toContainText("~$3,026,213.09");
  await expect(page.locator(".rate-freshness")).toContainText("Live");
  await currencyPicker.click();
  await currencyMenu.getByRole("option", { name: /United Kingdom.*GBP/ }).click();
  await expect(currencyPicker).toContainText("GBP");
  await expect(page.locator(".money-input.result strong")).toContainText("~£788.04");
  await expect(page.locator(".rate-freshness")).toContainText("Live");
  await expect(page.locator("#send-amount")).toHaveValue("$1,000.00");
  await expect(page.getByText("Estimated recipient amount", { exact: true })).toBeVisible();
  await expect(currencyPicker).toHaveClass(/neutral-control/);
  const currencyControlStyle = await currencyPicker.evaluate((node) => {
    const style = getComputedStyle(node);
    return {
      height: Math.round(node.getBoundingClientRect().height),
      radius: style.borderRadius,
    };
  });
  expect(currencyControlStyle).toEqual({ height: 50, radius: "999px" });

  await expect(page.locator(".nav-cta")).toHaveAttribute(
    "href",
    "https://jazarione.app.link/web-launch",
  );
  const navbarLabelOffset = await page.locator(".nav-cta").evaluate((node) => {
    const button = node.getBoundingClientRect();
    const label = node.querySelector(".nav-cta-label")?.getBoundingClientRect();
    if (!label) return Number.POSITIVE_INFINITY;
    return Math.abs(
      button.top + button.height / 2 - (label.top + label.height / 2),
    );
  });
  expect(navbarLabelOffset).toBeLessThanOrEqual(1);

  const receivingCountries = [
    "Andorra", "Austria", "Belgium", "Brazil", "Colombia", "Croatia",
    "Cyprus", "Estonia", "Finland", "France", "Germany", "Greece",
    "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta",
    "Mexico", "Monaco", "Montenegro", "Netherlands", "Poland", "Portugal",
    "Romania", "San Marino", "Slovakia", "Slovenia", "Spain", "United Kingdom",
  ];
  const queuedReceivingCountries = ["India", "Bangladesh", "Pakistan", "Nigeria"];
  const countriesDialog = page.locator(".receive-countries-dialog");
  await expect(countriesDialog).not.toBeVisible();
  await page.getByRole("link", { name: "View receiving countries" }).click();
  await expect(countriesDialog).toBeVisible();
  await page.getByRole("button", { name: "Close receiving countries" }).click();
  await page.getByRole("button", { name: "All receiving countries" }).click();
  await expect(countriesDialog).toBeVisible();
  await expect(countriesDialog.locator(".receiving-country-group li")).toHaveText(receivingCountries);
  await expect(countriesDialog.locator(".receiving-country-group li img")).toHaveCount(receivingCountries.length);
  await expect(countriesDialog.locator(".receiving-country-queue li")).toHaveText(queuedReceivingCountries);
  await page.getByRole("button", { name: "Close receiving countries" }).click();
  await expect(countriesDialog).not.toBeVisible();

  const rateCardDetailsOrder = await page.locator(".rate-card").evaluate((node) => {
    const link = node.querySelector(".receive-countries-link")?.getBoundingClientRect();
    const disclaimer = node.querySelector(".rate-disclaimer")?.getBoundingClientRect();
    return link && disclaimer ? link.top < disclaimer.top : false;
  });
  expect(rateCardDetailsOrder).toBe(true);

  const card = page.locator(".blog-card").first();
  await card.scrollIntoViewIfNeeded();
  const blogImageTransformBefore = await card
    .locator(".blog-card-image")
    .evaluate((node) => getComputedStyle(node).transform);
  await card.hover({ position: { x: 80, y: 90 } });
  await expect
    .poll(() =>
      card.evaluate((node) =>
        node.style.getPropertyValue("--pointer-x"),
      ),
    )
    .not.toBe("50%");
  const pointerPositionBeforeLeave = await card.evaluate((node) => ({
    x: node.style.getPropertyValue("--pointer-x"),
    y: node.style.getPropertyValue("--pointer-y"),
  }));
  await page.mouse.move(0, 0);
  await expect
    .poll(() =>
      card.evaluate((node) => ({
        x: node.style.getPropertyValue("--pointer-x"),
        y: node.style.getPropertyValue("--pointer-y"),
        tiltX: node.style.getPropertyValue("--tilt-x"),
        tiltY: node.style.getPropertyValue("--tilt-y"),
      })),
    )
    .toEqual({
      ...pointerPositionBeforeLeave,
      tiltX: "0deg",
      tiltY: "0deg",
    });
  await expect
    .poll(() =>
      card.locator(".blog-card-image").evaluate((node) => getComputedStyle(node).transform),
    )
    .toBe(blogImageTransformBefore);
  const desktopCardMetrics = await page.evaluate(() => {
    const benefits = getComputedStyle(
      document.querySelector(".benefit-list") as Element,
    ).gridTemplateColumns.split(" ").length;
    const personaHeights = Array.from(
      document.querySelectorAll(".audience-panel"),
      (node) => Math.round(node.getBoundingClientRect().height),
    );
    const articleHeights = Array.from(
      document.querySelectorAll(".blog-card"),
      (node) => Math.round(Number.parseFloat(getComputedStyle(node).height)),
    );
    const articleTitleSizes = new Set(
      Array.from(
        document.querySelectorAll(".blog-card h3"),
        (node) => getComputedStyle(node).fontSize,
      ),
    ).size;
    const title = document.querySelector(".blog-card h3")?.getBoundingClientRect();
    const action = document.querySelector(".blog-read")?.getBoundingClientRect();
    const firstBenefitIcon = document.querySelector(".benefit-row img");
    const firstBenefitCopy = document.querySelector(".benefit-row p");
    const benefitLedger = document.querySelector(".benefit-ledger");
    const reviewMetrics = document.querySelector(".review-metrics");
    const firstBlogCard = document.querySelector(".blog-card");
    const audienceImagePositions = Array.from(
      document.querySelectorAll(".audience-panel .audience-image"),
      (node) => getComputedStyle(node).objectPosition,
    );
    return {
      benefits,
      personaHeights,
      articleHeights,
      articleTitleSizes,
      benefitIconWidth: firstBenefitIcon
        ? Math.round(firstBenefitIcon.getBoundingClientRect().width)
        : 0,
      benefitCopySize: firstBenefitCopy
        ? Number.parseFloat(getComputedStyle(firstBenefitCopy).fontSize)
        : 0,
      benefitLedgerMarginTop: benefitLedger
        ? Number.parseFloat(getComputedStyle(benefitLedger).marginTop)
        : 0,
      reviewMetricsMarginTop: reviewMetrics
        ? Number.parseFloat(getComputedStyle(reviewMetrics).marginTop)
        : 0,
      blogBottomTint: firstBlogCard
        ? getComputedStyle(firstBlogCard, "::before").backgroundImage
        : "",
      audienceImagePositions,
      articleBaselineOffset:
        title && action ? Math.abs(title.bottom - action.bottom) : Number.POSITIVE_INFINITY,
    };
  });
  expect(desktopCardMetrics.benefits).toBe(4);
  expect(desktopCardMetrics.benefitIconWidth).toBe(62);
  expect(desktopCardMetrics.benefitCopySize).toBe(16);
  expect(desktopCardMetrics.benefitLedgerMarginTop).toBeGreaterThanOrEqual(8);
  expect(desktopCardMetrics.reviewMetricsMarginTop).toBe(180);
  expect(desktopCardMetrics.blogBottomTint).toContain("rgb(0, 0, 0)");
  expect(desktopCardMetrics.audienceImagePositions.slice(0, 2)).toEqual([
    "50% calc(50% + 30px)",
    "50% 50%",
  ]);
  expect(desktopCardMetrics.personaHeights).toEqual([500, 500, 500]);
  expect(desktopCardMetrics.articleHeights).toEqual([500, 500, 500, 500]);
  expect(desktopCardMetrics.articleTitleSizes).toBe(1);
  expect(desktopCardMetrics.articleBaselineOffset).toBeLessThanOrEqual(4);

  const roadmapTrack = page.locator(".roadmap-track");
  const roadmapWindow = page.locator(".roadmap-window");
  const usdRoadmapCard = page.locator(".roadmap-card").first();
  await expect(usdRoadmapCard.locator(".roadmap-milestone-art")).toHaveAttribute(
    "src",
    /usa-flag\.png$/,
  );
  const usdCardRegions = await usdRoadmapCard.evaluate((node) => {
    const copy = node.querySelector(".roadmap-milestone-copy")?.getBoundingClientRect();
    const visual = node.querySelector(".roadmap-milestone-visual")?.getBoundingClientRect();
    return copy && visual ? { copyBottom: copy.bottom, visualTop: visual.top } : null;
  });
  expect(usdCardRegions).not.toBeNull();
  expect(usdCardRegions!.copyBottom).toBeLessThanOrEqual(usdCardRegions!.visualTop);
  await expect(roadmapWindow).toHaveClass(/is-at-start/);
  await page.getByRole("button", { name: "Next milestone" }).click();
  await expect
    .poll(() => roadmapTrack.evaluate((node) => Math.round(node.scrollLeft)))
    .toBeGreaterThan(0);
  await page.getByRole("button", { name: "Previous milestone" }).click();
  await expect
    .poll(() => roadmapTrack.evaluate((node) => Math.round(node.scrollLeft)))
    .toBe(0);
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
  await expect(roadmapWindow).toHaveClass(/is-at-end/);

  const firstQuestion = page.getByText("What can I do with a Jazari USD account?", { exact: true });
  await firstQuestion.click();
  await expect(
    page.getByText(/You can hold USDC or USDT, receive payments/i),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Email us", exact: true })).toBeVisible();
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
  await page.goto("/", { waitUntil: "networkidle" });

  const phoneImage = page.locator("#step-screen .active-step-phone.is-active img");
  const phoneLayers = await page.locator("#step-screen").evaluate(() => {
    const stack = document.querySelector(".step-screen-stack");
    const phone = document.querySelector(".active-step-phone.is-active");
    return {
      mask: stack ? getComputedStyle(stack).maskImage : "missing",
      filter: phone ? getComputedStyle(phone).filter : "missing",
    };
  });
  expect(phoneLayers).toEqual({ mask: "none", filter: "none" });
  await expect
    .poll(() => phoneImage.evaluate((image) => (image as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0);

  const audience = page.locator(".audience-explorer");
  const audienceMetrics = await audience.evaluate((node) => ({
    columns: getComputedStyle(node).gridTemplateColumns.split(" ").length,
    widths: Array.from(node.children, (card) =>
      Math.round(card.getBoundingClientRect().width),
    ),
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(audienceMetrics.columns).toBe(1);
  expect(new Set(audienceMetrics.widths).size).toBe(1);
  expect(audienceMetrics.scrollWidth).toBe(audienceMetrics.clientWidth);
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
  expect(copyright!.y - (stores!.y + stores!.height)).toBeGreaterThanOrEqual(20);
  expect(copyright!.y - (stores!.y + stores!.height)).toBeLessThanOrEqual(28);
});

test("explains yields and links into the app flow", async ({ page }) => {
  await page.goto("/yields/", { waitUntil: "networkidle" });
  await expect(
    page.getByRole("heading", { name: "Yields", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Gauntlet USD Alpha" })).toBeVisible();
  await expect(page.getByText("USDC", { exact: true })).toBeVisible();
  await expect(page.getByText(/USDC · USDT|USDC or USDT/)).toHaveCount(0);
  await expect(page.getByText("4.66%")).toBeVisible();
  await expect(page.getByRole("heading", { name: "How Yields work" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ready to open Yields?" })).toBeVisible();
  await expect(page.getByText("Return and risk move together")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Download App" }).last()).toHaveAttribute(
    "href", "https://jazarione.app.link/web-launch",
  );
});

test("shows every product milestone on the roadmap page", async ({ page }) => {
  await page.goto("/roadmap/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Coming soon" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "USD account" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Additional payout countries" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Higher-return Yields" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Remit Now Pay Later" })).toBeVisible();
  await expect(page.locator(".roadmap-flags").first()).toHaveCSS("flex-direction", "column");
  const usdAccountCard = page.locator(".roadmap-full-card").first();
  const visaCard = page.locator(".roadmap-full-card").nth(1);
  await expect(usdAccountCard.locator(".roadmap-milestone-art")).toHaveAttribute(
    "src",
    /usa-flag\.png$/,
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
  const [mobileCard, mobileArt, mobileVisaCard, mobileVisaArt] = await Promise.all([
    usdAccountCard.boundingBox(),
    usdAccountCard.locator(".roadmap-milestone-art").boundingBox(),
    visaCard.boundingBox(),
    visaCard.locator(".roadmap-milestone-art").boundingBox(),
  ]);
  expect(mobileCard).not.toBeNull();
  expect(mobileArt).not.toBeNull();
  expect(mobileVisaCard).not.toBeNull();
  expect(mobileVisaArt).not.toBeNull();
  expect(mobileArt!.x).toBeGreaterThanOrEqual(mobileCard!.x);
  expect(mobileArt!.x + mobileArt!.width).toBeLessThanOrEqual(
    mobileCard!.x + mobileCard!.width + 1,
  );
  expect(mobileArt!.y + mobileArt!.height).toBeGreaterThan(
    mobileCard!.y + mobileCard!.height,
  );
  expect(mobileVisaArt!.x + mobileVisaArt!.width).toBeGreaterThan(
    mobileVisaCard!.x + mobileVisaCard!.width,
  );
  expect(mobileVisaArt!.y + mobileVisaArt!.height).toBeGreaterThan(
    mobileVisaCard!.y + mobileVisaCard!.height,
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
  await expect(menu.getByText("Product", { exact: true })).toBeVisible();
  await expect(menu.getByText("Company", { exact: true })).toBeVisible();
  await expect(menu.getByRole("link", { name: "How it works" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Partners", exact: true })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Terms & Conditions" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Privacy Policy" })).toBeVisible();
  await expect(menu.getByText("Cookies", { exact: true })).toHaveCount(0);
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

  for (const index of [0, 1]) {
    const card = page.locator(".roadmap-card").nth(index);
    const art = card.locator(".roadmap-milestone-art");
    const copy = card.locator(".roadmap-milestone-copy");
    const [cardBox, artBox, copyBox] = await Promise.all([
      card.boundingBox(),
      art.boundingBox(),
      copy.boundingBox(),
    ]);
    expect(cardBox).not.toBeNull();
    expect(artBox).not.toBeNull();
    expect(copyBox).not.toBeNull();
    expect(Math.round(cardBox!.height)).toBe(352);
    expect(artBox!.x).toBeGreaterThanOrEqual(cardBox!.x);
    if (index === 0) {
      expect(artBox!.x + artBox!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width + 1);
    } else {
      expect(artBox!.x + artBox!.width).toBeGreaterThan(cardBox!.x + cardBox!.width);
    }
    expect(artBox!.y + artBox!.height).toBeGreaterThan(cardBox!.y + cardBox!.height);
    expect(copyBox!.y + copyBox!.height).toBeLessThanOrEqual(artBox!.y + 1);
  }

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

test("keeps the mobile phone preview and step accordion in one viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await prepareStablePage(page);

  const scenarioTabs = page.locator(".how-scenario-tabs");
  await scenarioTabs.evaluate((node) => node.scrollIntoView({ block: "start" }));
  await page.evaluate(() => window.scrollBy(0, -86));

  const phone = page.locator(".step-screen");
  const stepTabs = page.locator(".step-tabs");
  const steps = stepTabs.getByRole("tab");
  await expect(steps).toHaveCount(3);
  await expect(page.locator(".step-screen .active-step-phone")).toHaveCount(1);
  const activeScreenImage = page.locator(".step-screen .active-step-phone.is-active img");
  await expect
    .poll(() => activeScreenImage.evaluate((image) => (image as HTMLImageElement).naturalWidth))
    .toBeGreaterThanOrEqual(300);
  expect(
    await activeScreenImage.evaluate((image) => (image as HTMLImageElement).naturalWidth),
  ).toBeLessThanOrEqual(520);
  await expect
    .poll(() => page.locator(".step-screen-stack").evaluate(
      (node) => getComputedStyle(node).maskImage,
    ))
    .toBe("none");

  const initialLayout = await page.evaluate(() => {
    const scenario = document.querySelector(".how-scenario-tabs")?.getBoundingClientRect();
    const screen = document.querySelector(".step-screen")?.getBoundingClientRect();
    const tabs = document.querySelector(".step-tabs")?.getBoundingClientRect();
    const finalStep = document.querySelector(".step-tab-item:last-child")?.getBoundingClientRect();
    return {
      scenarioBottom: scenario?.bottom ?? Number.POSITIVE_INFINITY,
      screenTop: screen?.top ?? 0,
      screenBottom: screen?.bottom ?? Number.POSITIVE_INFINITY,
      tabsTop: tabs?.top ?? 0,
      finalStepBottom: finalStep?.bottom ?? Number.POSITIVE_INFINITY,
      viewportHeight: window.innerHeight,
    };
  });

  expect(initialLayout.screenTop).toBeGreaterThanOrEqual(initialLayout.scenarioBottom);
  expect(initialLayout.tabsTop).toBeGreaterThanOrEqual(initialLayout.screenBottom);
  expect(initialLayout.finalStepBottom).toBeLessThanOrEqual(initialLayout.viewportHeight);
  await expect(phone).toBeVisible();
  await expect(steps.nth(0)).toHaveAttribute("aria-selected", "true");
  await expect
    .poll(() => page.locator(".step-tab-item").nth(0).evaluate(
      (node) => getComputedStyle(node).counterIncrement,
    ))
    .toBe("how-step 1");

  await steps.nth(1).click();
  await expect(steps.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#step-screen .active-step-phone.is-active img")).toHaveAttribute(
    "src",
    /how-to-receive-02\.png$/,
  );
  await expect(page.locator(".step-tab-item").nth(1).locator("small")).toBeVisible();
  await expect(page.locator(".step-tab-item").nth(0).locator("small")).toBeHidden();
});

test("contains the mobile coming-soon badge at narrow widths", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await prepareStablePage(page);

  const finalStep = page.getByRole("tab", { name: /Share USD account/ });
  const badge = finalStep.locator(".step-status");
  const bounds = await Promise.all([
    finalStep.boundingBox(),
    badge.boundingBox(),
  ]);

  expect(bounds[0]).not.toBeNull();
  expect(bounds[1]).not.toBeNull();
  expect(bounds[1]!.x).toBeGreaterThanOrEqual(bounds[0]!.x);
  expect(bounds[1]!.x + bounds[1]!.width).toBeLessThanOrEqual(bounds[0]!.x + bounds[0]!.width);
});

test("fits the complete Yields mobile interaction at 430px", async ({ page }) => {
  await page.setViewportSize({ width: 430, height: 932 });
  await prepareStablePage(page);

  await page.getByRole("tab", { name: "Yields", exact: true }).click();
  const scenarioTabs = page.locator(".how-scenario-tabs");
  await scenarioTabs.evaluate((node) => node.scrollIntoView({ block: "start" }));
  await page.evaluate(() => window.scrollBy(0, -86));

  const learnMore = page.getByRole("link", { name: "Learn more about Yields" });
  await expect(learnMore).toBeVisible();
  const layout = await page.evaluate(() => {
    const scenario = document.querySelector(".how-scenario-tabs")?.getBoundingClientRect();
    const screen = document.querySelector(".step-screen")?.getBoundingClientRect();
    const finalStep = document.querySelector(".step-tab-item:last-child")?.getBoundingClientRect();
    const link = document.querySelector(".how-learn-more")?.getBoundingClientRect();
    return {
      scenarioTop: scenario?.top ?? -1,
      screenBottom: screen?.bottom ?? Number.POSITIVE_INFINITY,
      finalStepBottom: finalStep?.bottom ?? Number.POSITIVE_INFINITY,
      linkTop: link?.top ?? 0,
      linkBottom: link?.bottom ?? Number.POSITIVE_INFINITY,
      viewportHeight: window.innerHeight,
    };
  });

  expect(layout.scenarioTop).toBeGreaterThanOrEqual(70);
  expect(layout.finalStepBottom).toBeGreaterThanOrEqual(layout.screenBottom);
  expect(layout.linkTop).toBeGreaterThanOrEqual(layout.finalStepBottom);
  expect(layout.linkBottom).toBeLessThanOrEqual(layout.viewportHeight);
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
