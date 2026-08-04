import { expect, test, type Page } from "@playwright/test";

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

  await expect(page.getByRole("heading", { name: /Use dollars\.\s*Anywhere\./ })).toBeVisible();
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
    .getByRole("heading", { name: /Use dollars\.\s*Anywhere\./ })
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
  await expect(currencyMenu.getByRole("option")).toHaveCount(4);
  await expect(currencyMenu.getByRole("option", { name: /Mexico.*MXN/ })).toBeVisible();
  await expect(currencyMenu.getByRole("option", { name: /Colombia.*COP/ })).toBeVisible();
  await expect(currencyMenu.getByRole("option", { name: /Brazil.*BRL/ })).toBeVisible();
  await expect(currencyMenu.getByRole("option", { name: /Europe.*EUR/ })).toBeVisible();
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
  await expect(page.locator(".money-input.result strong")).toContainText("~$4,175,000.00");
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
    "https://apps.apple.com/",
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

test("renders the plan preview and legal links", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/plan/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Plan" })).toBeVisible();
  await expect(
    page.getByText(/Preview pricing\. Final fees and availability are confirmed in the app\./),
  ).toBeVisible();
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

test("renders the legal documents as internal Jazari pages", async ({ page }) => {
  await page.goto("/terms/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "US Terms and Conditions" })).toBeVisible();
  await expect(page.getByText("Effective date: 21 April 2026")).toBeVisible();
  await expect(page.getByRole("heading", { name: "1. INTRODUCTION" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "29. STATE-SPECIFIC DISCLOSURES" }),
  ).toBeAttached();
  await expect(
    page.getByRole("heading", { name: "30. CONTACT INFORMATION" }),
  ).toBeAttached();

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
  await expect(page.getByRole("heading", { name: "Coming soon" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "USD account" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Higher-yield strategies" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Remit Now Pay Later" })).toBeVisible();
  const usdAccountCard = page.locator(".roadmap-full-card").first();
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
  const [mobileCard, mobileArt] = await Promise.all([
    usdAccountCard.boundingBox(),
    usdAccountCard.locator(".roadmap-milestone-art").boundingBox(),
  ]);
  expect(mobileCard).not.toBeNull();
  expect(mobileArt).not.toBeNull();
  expect(mobileArt!.x).toBeGreaterThanOrEqual(mobileCard!.x);
  expect(mobileArt!.x + mobileArt!.width).toBeLessThanOrEqual(
    mobileCard!.x + mobileCard!.width + 1,
  );
  expect(mobileArt!.y + mobileArt!.height).toBeLessThanOrEqual(
    mobileCard!.y + mobileCard!.height + 1,
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
  const [signoffBox, foundersPhotoBox] = await Promise.all([
    page.getByText(/Alex and Has, founders of Jazari One/).boundingBox(),
    foundersPhoto.boundingBox(),
  ]);
  expect(signoffBox).not.toBeNull();
  expect(foundersPhotoBox).not.toBeNull();
  expect(foundersPhotoBox!.y).toBeGreaterThan(signoffBox!.y + signoffBox!.height);
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

test("keeps mobile Coming soon cards visible and their artwork contained", async ({ page }) => {
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
    expect(artBox!.x + artBox!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width + 1);
    expect(artBox!.y + artBox!.height).toBeLessThanOrEqual(cardBox!.y + cardBox!.height + 1);
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
