import { defineConfig } from "@playwright/test";
const previewPort = process.env.PLAYWRIGHT_PORT ?? "3000";
const previewUrl = `http://127.0.0.1:${previewPort}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  outputDir: "test-results",
  use: {
    baseURL: previewUrl,
    browserName: "chromium",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: `bun run dev --hostname 127.0.0.1 --port ${previewPort}`,
    url: previewUrl,
    env: {
      NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-TEST123456",
    },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
