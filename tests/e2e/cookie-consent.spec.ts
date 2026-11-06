import { expect, test, type Page, type Request } from "@playwright/test";

const measurementId = "G-TEST123456";
const gaScriptPattern = /googletagmanager\.com\/gtag\/js/;
const gtmScriptPattern = /googletagmanager\.com\/gtm\.js/;

async function captureGoogleAnalytics(page: Page) {
  const requests: Request[] = [];

  page.on("request", (request) => {
    if (gaScriptPattern.test(request.url())) requests.push(request);
  });

  await page.route("https://www.googletagmanager.com/gtag/js**", async (route) => {
    await route.fulfill({
      contentType: "application/javascript",
      body: "window.__jazariGaTestLoaded = true;",
    });
  });

  return requests;
}

async function captureTagManager(page: Page) {
  const requests: Request[] = [];

  page.on("request", (request) => {
    if (gtmScriptPattern.test(request.url())) requests.push(request);
  });

  // Never reach the real container: it holds live advertising pixels.
  await page.route("https://www.googletagmanager.com/gtm.js**", async (route) => {
    await route.fulfill({
      contentType: "application/javascript",
      body: "window.__jazariGtmTestLoaded = true;",
    });
  });

  return requests;
}

async function readConsentCookie(page: Page) {
  const cookie = (await page.context().cookies()).find(
    (candidate) => candidate.name === "jazari_cookie_consent",
  );
  if (!cookie) return null;

  return {
    ...cookie,
    storedValue: JSON.parse(decodeURIComponent(cookie.value)) as {
      analytics: boolean;
      marketing?: boolean;
      updatedAt: string;
    },
  };
}

async function readDataLayer(page: Page) {
  return page.evaluate(() =>
    (window.dataLayer ?? []).map((command) =>
      Array.from(command as ArrayLike<unknown>),
    ),
  );
}

test.beforeEach(async ({ page }) => {
  await page.route("https://www.googletagmanager.com/gtm.js**", (route) =>
    route.fulfill({ contentType: "application/javascript", body: "" }),
  );
});

test("denies analytics by default and shows the first-visit banner", async ({ page }) => {
  const analyticsRequests = await captureGoogleAnalytics(page);
  const marketingRequests = await captureTagManager(page);

  await page.goto("/");

  const banner = page.getByRole("complementary", { name: "Your privacy choices" });
  await expect(banner).toBeVisible();
  await expect(banner.getByRole("button", { name: "Accept all" })).toBeVisible();
  await expect(banner.getByRole("button", { name: "Reject" })).toBeVisible();
  expect(analyticsRequests).toHaveLength(0);
  expect(marketingRequests).toHaveLength(0);
  expect((await page.context().cookies()).some((cookie) => cookie.name.startsWith("_ga"))).toBe(false);

  const consentCommands = await readDataLayer(page);
  expect(consentCommands).toContainEqual([
    "consent",
    "default",
    expect.objectContaining({ analytics_storage: "denied" }),
  ]);
});

test("accepting persists consent and activates GA without a reload", async ({ page }) => {
  const analyticsRequests = await captureGoogleAnalytics(page);
  await page.goto("/");

  await page.getByRole("button", { name: "Accept all" }).click();

  await expect.poll(() => analyticsRequests.length).toBe(1);
  await expect(page.locator("script[data-jazari-ga]")).toHaveAttribute(
    "data-jazari-ga",
    measurementId,
  );
  await expect(page.getByRole("complementary", { name: "Your privacy choices" })).toHaveCount(0);

  const queuedCommandTypes = await page.evaluate(() =>
    (window.dataLayer ?? []).map((command) => Object.prototype.toString.call(command)),
  );
  expect(queuedCommandTypes).toContain("[object Arguments]");
  expect(queuedCommandTypes).not.toContain("[object Array]");

  const consentCookie = await readConsentCookie(page);
  expect(consentCookie?.storedValue.analytics).toBe(true);
  expect(consentCookie?.storedValue.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(consentCookie?.sameSite).toBe("Lax");
  expect((consentCookie?.expires ?? 0) * 1000).toBeGreaterThan(
    Date.now() + 360 * 24 * 60 * 60 * 1000,
  );

  const consentCommands = await readDataLayer(page);
  expect(consentCommands).toContainEqual([
    "consent",
    "update",
    expect.objectContaining({ analytics_storage: "granted" }),
  ]);
});

test("accepting all loads the marketing tag container once and keeps it across visits", async ({ page }) => {
  await captureGoogleAnalytics(page);
  const marketingRequests = await captureTagManager(page);
  await page.goto("/");
  expect(marketingRequests).toHaveLength(0);

  await page.getByRole("button", { name: "Accept all" }).click();

  await expect.poll(() => marketingRequests.length).toBe(1);
  expect(marketingRequests[0].url()).toContain("id=GTM-M563XFL2");
  await expect(page.locator("script[data-jazari-gtm]")).toHaveCount(1);
  expect(
    await page.evaluate(() =>
      (window.dataLayer ?? []).some(
        (item) => (item as { event?: string }).event === "gtm.js",
      ),
    ),
  ).toBe(true);
  expect((await readConsentCookie(page))?.storedValue.marketing).toBe(true);

  await page.reload();
  await expect.poll(() => marketingRequests.length).toBe(2);
  await expect(page.locator("script[data-jazari-gtm]")).toHaveCount(1);
});

test("rejecting persists denial and keeps GA inactive across visits", async ({ page }) => {
  const analyticsRequests = await captureGoogleAnalytics(page);
  const marketingRequests = await captureTagManager(page);
  await page.goto("/");

  await page.getByRole("button", { name: "Reject" }).click();
  await expect(page.getByRole("complementary", { name: "Your privacy choices" })).toHaveCount(0);

  const consentCookie = await readConsentCookie(page);
  expect(consentCookie?.storedValue.analytics).toBe(false);
  expect(consentCookie?.storedValue.marketing).toBe(false);
  expect(analyticsRequests).toHaveLength(0);

  await page.reload();
  await expect(page.getByRole("complementary", { name: "Your privacy choices" })).toHaveCount(0);
  expect(analyticsRequests).toHaveLength(0);
  expect(marketingRequests).toHaveLength(0);
  expect((await page.context().cookies()).some((cookie) => cookie.name.startsWith("_ga"))).toBe(false);
});

test("preferences can grant and later withdraw analytics consent", async ({ page }) => {
  const analyticsRequests = await captureGoogleAnalytics(page);
  await page.goto("/");
  await page.getByRole("button", { name: "Reject" }).click();

  const footerPreferences = page.locator("footer").getByRole("button", {
    name: "Cookie Preferences",
  });
  await footerPreferences.click();

  const dialog = page.getByRole("dialog", { name: "Cookie Preferences" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Always active", { exact: true })).toBeVisible();
  await dialog.getByRole("checkbox", { name: "Allow analytics cookies" }).check();
  await dialog.getByRole("button", { name: "Save preferences" }).click();

  await expect.poll(() => analyticsRequests.length).toBe(1);
  expect((await readConsentCookie(page))?.storedValue.analytics).toBe(true);

  await footerPreferences.click();
  await dialog.getByRole("checkbox", { name: "Allow analytics cookies" }).uncheck();
  await dialog.getByRole("button", { name: "Save preferences" }).click();

  expect((await readConsentCookie(page))?.storedValue.analytics).toBe(false);
  expect(await page.evaluate((id) => window[`ga-disable-${id}`], measurementId)).toBe(true);
  const consentCommands = await readDataLayer(page);
  expect(consentCommands.at(-1)).toEqual([
    "consent",
    "update",
    expect.objectContaining({ analytics_storage: "denied" }),
  ]);
});

test("marketing is a separate choice and withdrawing it reloads the page without the container", async ({ page }) => {
  const analyticsRequests = await captureGoogleAnalytics(page);
  const marketingRequests = await captureTagManager(page);
  await page.goto("/");
  await page.getByRole("button", { name: "Reject" }).click();

  const footerPreferences = page.locator("footer").getByRole("button", {
    name: "Cookie Preferences",
  });
  const dialog = page.getByRole("dialog", { name: "Cookie Preferences" });

  await footerPreferences.click();
  await dialog.getByRole("checkbox", { name: "Allow analytics cookies" }).check();
  await dialog.getByRole("button", { name: "Save preferences" }).click();
  await expect.poll(() => analyticsRequests.length).toBe(1);
  expect(marketingRequests).toHaveLength(0);
  expect((await readConsentCookie(page))?.storedValue.marketing).toBe(false);

  await footerPreferences.click();
  await dialog.getByRole("checkbox", { name: "Allow marketing cookies" }).check();
  await dialog.getByRole("button", { name: "Save preferences" }).click();
  await expect.poll(() => marketingRequests.length).toBe(1);

  await footerPreferences.click();
  await expect(dialog.getByRole("checkbox", { name: "Allow marketing cookies" })).toBeChecked();
  await dialog.getByRole("checkbox", { name: "Allow marketing cookies" }).uncheck();
  await Promise.all([
    page.waitForEvent("load"),
    dialog.getByRole("button", { name: "Save preferences" }).click(),
  ]);

  await expect(page.locator("script[data-jazari-ga]")).toHaveCount(1);
  await expect(page.locator("script[data-jazari-gtm]")).toHaveCount(0);
  expect(marketingRequests).toHaveLength(1);
  const stored = (await readConsentCookie(page))?.storedValue;
  expect(stored?.analytics).toBe(true);
  expect(stored?.marketing).toBe(false);
});

test("an older consent cookie without a marketing field keeps marketing off", async ({ page, context, baseURL }) => {
  await captureGoogleAnalytics(page);
  const marketingRequests = await captureTagManager(page);
  await context.addCookies([
    {
      name: "jazari_cookie_consent",
      value: encodeURIComponent(JSON.stringify({ analytics: true, updatedAt: "2026-10-01" })),
      url: baseURL ?? "http://localhost:3000",
    },
  ]);

  await page.goto("/");
  await expect(page.locator("script[data-jazari-ga]")).toHaveCount(1);
  await expect(page.getByRole("complementary", { name: "Your privacy choices" })).toHaveCount(0);
  expect(marketingRequests).toHaveLength(0);
});

test("preferences dialog supports Escape and returns focus", async ({ page }) => {
  await captureGoogleAnalytics(page);
  await page.goto("/");
  await page.getByRole("button", { name: "Reject" }).click();

  const footerPreferences = page.locator("footer").getByRole("button", {
    name: "Cookie Preferences",
  });
  await footerPreferences.focus();
  await footerPreferences.click();
  await expect(page.getByRole("dialog", { name: "Cookie Preferences" })).toBeVisible();

  await page.keyboard.press("Escape");

  await expect(page.getByRole("dialog", { name: "Cookie Preferences" })).toHaveCount(0);
  await expect(footerPreferences).toBeFocused();
});

test("banner and preferences remain usable on a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await captureGoogleAnalytics(page);
  await page.goto("/");

  const banner = page.getByRole("complementary", { name: "Your privacy choices" });
  const bannerBox = await banner.boundingBox();
  expect(bannerBox).not.toBeNull();
  expect(bannerBox?.x ?? -1).toBeGreaterThanOrEqual(0);
  expect((bannerBox?.x ?? 0) + (bannerBox?.width ?? 0)).toBeLessThanOrEqual(390);
  expect((bannerBox?.y ?? 0) + (bannerBox?.height ?? 0)).toBeLessThanOrEqual(844);
  await expect(banner.getByRole("button", { name: "Reject" })).toBeVisible();
  await expect(banner.getByRole("button", { name: "Accept all" })).toBeVisible();

  await banner.getByRole("button", { name: "Cookie Preferences" }).click();
  const dialog = page.getByRole("dialog", { name: "Cookie Preferences" });
  await expect(dialog).toBeVisible();
  const dialogBox = await dialog.boundingBox();
  expect(dialogBox).not.toBeNull();
  expect(dialogBox?.height ?? Number.POSITIVE_INFINITY).toBeLessThanOrEqual(820);
});
