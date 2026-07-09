/**
 * Icon Baseline Snapshot Tests
 *
 * Captures tight PNG crops of every custom SVG / lucide icon that will be
 * replaced in Sub-Tasks 2 and 3 of the Repo Cleanup Plan.
 *
 * Prerequisites:
 *   - Dev server must be running: npm run dev (http://localhost:5173)
 *   - Run once with --update-snapshots to write initial baselines
 *
 * Output: .tmp/icon-baselines/<snapshot-name>.png
 */

import { test, expect, Page } from "@playwright/test";
import path from "path";
import fs from "fs";

const BASE_URL = "http://localhost:5173";
const OUTPUT_DIR = path.resolve(__dirname, "../.tmp/icon-baselines");

/** Ensure the output directory exists before tests run */
test.beforeAll(() => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
});

/** Wait for Carbon shell to hydrate */
async function waitForApp(page: Page) {
  await page.waitForLoadState("networkidle");
}

/** Capture a tight crop around the bounding box of a selector and save as PNG */
async function captureIcon(
  page: Page,
  selector: string,
  name: string,
  padding = 4
) {
  const locator = page.locator(selector).first();
  await locator.waitFor({ state: "visible", timeout: 10_000 });
  const box = await locator.boundingBox();
  if (!box) throw new Error(`No bounding box for selector: ${selector}`);

  const clip = {
    x: Math.max(0, box.x - padding),
    y: Math.max(0, box.y - padding),
    width: box.width + padding * 2,
    height: box.height + padding * 2,
  };

  const outPath = path.join(OUTPUT_DIR, `${name}.png`);
  await page.screenshot({ clip, path: outPath });
  console.log(`  ✓ ${name}.png (${Math.round(clip.width)}×${Math.round(clip.height)})`);
}

// ─── Home Page icons ──────────────────────────────────────────────────────────

test("capture HomePageHeader icons", async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await waitForApp(page);

  // Settings / display-settings button icon
  await captureIcon(page, '[data-testid="settings-btn-icon"] svg', "settings-adjust-btn");

  // Chat tile: top-left AI/terminal icon
  await captureIcon(page, '[data-testid="chat-tile-icon"]', "homepage-chat-tile-icon");

  // Chat tile: send arrow in prompt input
  await captureIcon(page, '[data-testid="chat-send-icon"]', "homepage-chat-send-icon");

  // New project tile icon
  await captureIcon(page, '[data-testid="new-project-icon"]', "homepage-new-project-icon");

  // New service tile icon
  await captureIcon(page, '[data-testid="new-service-icon"]', "homepage-new-service-icon");
});

test("capture DecisionAutomationCard arrow icon", async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await waitForApp(page);

  await captureIcon(page, '[data-testid="card-arrow-icon"]', "automation-card-arrow");
});

test("capture Display Settings modal icons", async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await waitForApp(page);

  // Open the Display Settings modal via the button
  await page.locator("button", { hasText: "Display settings" }).first().click();
  await page.waitForSelector('[data-testid="drag-handle"]', { state: "visible", timeout: 8_000 });

  // Drag handle (GripVertical)
  await captureIcon(page, '[data-testid="drag-handle"]', "display-settings-drag-handle");

  // Search icon
  await captureIcon(page, '[data-testid="search-icon"]', "display-settings-search-icon");

  // Pin button - first unpinned item (outline)
  const pinBtns = page.locator('[data-testid="pin-btn"]');
  const firstUnpinned = pinBtns.first();
  await captureIcon(page, '[data-testid="pin-btn"]:first-of-type', "display-settings-pin-outline");

  // Type in search then clear to reveal clear-X button
  const searchField = page.locator('input[placeholder="Find a decision project"]').first();
  await searchField.fill("test");
  await page.waitForTimeout(200);
  const clearBtn = page.locator("button.clearButton, button[aria-label='Reset search'], button[title='Clear']").first();
  // Fall back to any button sibling of the search input
  await captureIcon(
    page,
    `[data-testid="search-icon"] ~ button, .clearButton, button[aria-label="clear"]`,
    "display-settings-clear-btn"
  ).catch(async () => {
    // clearButton may not be visible if selector fails — save a note
    console.warn("clear-btn not found via selector; search term may not have triggered it");
  });
  await searchField.clear();
});

// ─── CardLayoutToolbar icons ──────────────────────────────────────────────────

test("capture CardLayoutToolbar icons", async ({ page }) => {
  await page.goto(`${BASE_URL}/decision-automations`);
  await waitForApp(page);

  await captureIcon(page, '[data-testid="toolbar-grid-btn"]', "toolbar-grid-icon");
  await captureIcon(page, '[data-testid="toolbar-list-btn"]', "toolbar-list-icon");
  await captureIcon(page, '[data-testid="toolbar-search-icon"]', "toolbar-search-icon");
});
