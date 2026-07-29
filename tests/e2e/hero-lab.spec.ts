import { expect, test } from "@playwright/test";

const ids = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];

test("separates the Claude and Codex labs behind a neutral chooser", async ({ page }) => {
  await page.goto("/hero-lab/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Choose an independent hero lab" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Hero Lab \/ Claude/ })).toHaveAttribute(
    "href",
    "/hero-lab-claude/",
  );
  await expect(page.getByRole("link", { name: /Hero Lab \/ Codex/ })).toHaveAttribute(
    "href",
    "/hero-lab-codex/",
  );

  await page.goto("/hero-lab/01/", { waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/hero-lab-claude\/01\/$/);
});

test("keeps the Claude implementation on its own route tree", async ({ page }) => {
  await page.goto("/hero-lab-claude/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Hero Lab" })).toBeVisible();
  await expect(page.locator(".hlab-card")).toHaveCount(10);
  await expect(page.locator(".hlab-card-preview canvas")).toHaveCount(0);

  for (const id of ids) {
    await page.goto(`/hero-lab-claude/${id}/`, { waitUntil: "domcontentloaded" });
    await expect(page.locator(".hlab-scene")).toHaveClass(new RegExp(`hlab-v${id}`));
    await expect(page.getByRole("button", { name: "Replay intro" })).toBeVisible();
  }

  await page.goto("/hero-lab-claude/compare/", { waitUntil: "networkidle" });
  await expect(page.locator(".hlab-compare-pane")).toHaveCount(2);
});

test("renders ten independent Codex concepts and their controls", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/hero-lab-codex/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Hero Lab / Codex" })).toBeVisible();
  await expect(page.locator(".xlab-card")).toHaveCount(10);
  await expect(page.locator(".xlab-card canvas")).toHaveCount(0);

  for (const id of ids) {
    await page.goto(`/hero-lab-codex/${id}/`, { waitUntil: "domcontentloaded" });
    await expect(page.locator(".xlab-scene")).toHaveClass(new RegExp(`xlab-v${id}`));
    await expect(page.getByRole("button", { name: "Replay intro" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Pause|Play/ })).toBeVisible();
    await expect(page.locator(".xlab-nav")).toBeVisible();
  }

  expect(pageErrors).toEqual([]);
});

test("supports Codex playback, reduced motion, mobile preview and comparison", async ({ page }) => {
  await page.goto("/hero-lab-codex/05/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pause" }).click();
  await expect(page.getByRole("button", { name: "Play", exact: true })).toBeVisible();
  await expect(page.locator(".xlab-scene")).toHaveClass(/is-paused/);

  await page.getByText("Reduced motion", { exact: true }).click();
  await expect(page.locator(".xlab-scene")).toHaveClass(/is-reduced/);

  await page.getByRole("button", { name: "Mobile" }).click();
  await expect(page.locator(".xlab-stage")).toHaveClass(/is-mobile/);
  await expect
    .poll(() => page.locator(".xlab-frame").evaluate((node) => Math.round(node.getBoundingClientRect().width)))
    .toBeLessThanOrEqual(390);

  await page.goto("/hero-lab-codex/compare/", { waitUntil: "networkidle" });
  await expect(page.locator(".xlab-compare-pane")).toHaveCount(2);
  await expect(page.locator(".xlab-scene")).toHaveCount(2);
});

test("keeps the Codex composition legible at 1440, 1024 and 390", async ({ page }) => {
  for (const sample of [
    { width: 1440, height: 960, id: "01" },
    { width: 1024, height: 820, id: "06" },
    { width: 390, height: 844, id: "08" },
  ]) {
    await page.setViewportSize({ width: sample.width, height: sample.height });
    await page.goto(`/hero-lab-codex/${sample.id}/`, { waitUntil: "networkidle" });
    await expect(page.locator(".xlab-copy h1")).toBeVisible();
    await expect(page.locator(".xlab-phone")).toBeVisible();
    await expect(page.locator(".xlab-nav")).toBeVisible();
    await expect
      .poll(() => page.locator(".xlab-frame").evaluate((node) => Math.round(node.getBoundingClientRect().width)))
      .toBeLessThanOrEqual(sample.width);
  }
});
