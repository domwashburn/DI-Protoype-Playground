import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for icon baseline snapshots.
 * Dev server must be running on port 5173 before running tests.
 *
 * Run baselines:
 *   npx playwright test tests/icon-baselines.spec.ts
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: "http://localhost:5173",
    screenshot: "on",
    headless: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
