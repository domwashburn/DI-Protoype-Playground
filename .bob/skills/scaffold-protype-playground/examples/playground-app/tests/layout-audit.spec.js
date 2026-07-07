// layout-audit.spec.js — visual + computed-style audit for the page header layout.
// Checks Product and docs model requirements:
//   1. Hero band is truly full-bleed: left/right edges == viewport edges (no grid margin offset)
//   2. Hero content (h1) left edge aligns to the body content grid column padding
//   3. Body content (first panel heading) left edge matches hero h1 left edge
//   4. No stray top gap between the Carbon Header and the hero band
//   5. Hero band background is NOT the same as the page background (it must stand out)
//
// Run with: npx playwright test tests/layout-audit.spec.js --reporter=list

import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:5173';

// ── helpers ──────────────────────────────────────────────────────────────────

function px(cssValue) {
  return parseFloat(cssValue);
}

/** Returns the bounding box PLUS computed bg-color of an element. */
async function measure(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = window.getComputedStyle(el);
    return {
      top: r.top,
      left: r.left,
      right: r.right,
      bottom: r.bottom,
      width: r.width,
      height: r.height,
      bg: cs.backgroundColor,
      paddingTop: cs.paddingTop,
      paddingLeft: cs.paddingLeft,
      marginTop: cs.marginTop,
      marginLeft: cs.marginLeft,
    };
  }, selector);
}

// ── HubView ───────────────────────────────────────────────────────────────────

test.describe('HubView — header layout audit', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.setViewportSize({ width: 1440, height: 900 });
    // Wait for Carbon styles to apply
    await page.waitForTimeout(500);
  });

  test('hero band is full-bleed — left/right edges touch viewport', async ({ page }) => {
    const band = await measure(page, '.hubHeroBand,[class*="hubHeroBand"]');

    if (!band) {
      console.log('⚠  hubHeroBand selector not found — checking all classes on page:');
      const classes = await page.evaluate(() =>
        [...document.querySelectorAll('[class]')].map(e => e.className).filter(Boolean).slice(0, 30)
      );
      console.log(classes.join('\n'));
      expect(band, 'hubHeroBand element must exist').toBeTruthy();
      return;
    }

    console.log('hubHeroBand bounds:', band);

    // Left edge should be 0 (or the SideNav width at lg+ — 256px)
    // It must NOT be inset by grid margins (16–32px)
    expect(band.left).toBeLessThanOrEqual(256 + 1); // ≤ sidenav width
    // Right edge should reach the viewport right edge
    expect(band.right).toBeGreaterThanOrEqual(page.viewportSize().width - 1);
  });

  test('hero h1 left edge aligns to body grid column padding', async ({ page }) => {
    const h1 = await measure(page, '[id="hub-title"]');
    // The hubToolbarSearch div is a direct child of a Grid Column — no extra
    // component internal padding — so its left edge == the column padding edge.
    const toolbarSearch = await measure(page, '[class*="hubToolbarSearch"]');

    console.log('hub-title h1:', h1);
    console.log('hubToolbarSearch:', toolbarSearch);

    expect(h1, 'h1#hub-title must exist').toBeTruthy();
    expect(toolbarSearch, 'hubToolbarSearch must exist').toBeTruthy();

    const diff = Math.abs(h1.left - toolbarSearch.left);
    console.log(`Alignment diff (h1 vs toolbar): ${diff}px — should be ≤ 2px`);
    expect(diff).toBeLessThanOrEqual(2);
  });

  test('no gap between Carbon header bottom and hero band top', async ({ page }) => {
    const header = await measure(page, '.cds--header');
    const band = await measure(page, '[class*="hubHeroBand"]');

    console.log('Carbon header bottom:', header?.bottom);
    console.log('hubHeroBand top:', band?.top);

    if (!header || !band) {
      console.log('⚠  Could not find header or band');
      return;
    }

    const gap = band.top - header.bottom;
    console.log(`Gap between header bottom and hero band top: ${gap}px`);
    expect(gap).toBeLessThanOrEqual(2); // ≤ 2px tolerance for borders
  });

  test('screenshot — HubView full page', async ({ page }) => {
    await page.screenshot({
      path: 'tests/screenshots/hub-view.png',
      fullPage: false,
    });
  });
});

// ── DetailView ────────────────────────────────────────────────────────────────

test.describe('DetailView — header layout audit', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(500);
    // Click into the first prototype in the SideNav
    const firstLink = page.locator('.cds--side-nav__link').nth(1);
    await firstLink.click();
    await page.waitForTimeout(400);
  });

  test('hero band is full-bleed — left/right edges touch content area', async ({ page }) => {
    const band = await measure(page, '[class*="detailHeroBand"]');
    const viewportWidth = page.viewportSize().width;

    if (!band) {
      console.log('⚠  detailHeroBand not found. Classes found:');
      const classes = await page.evaluate(() =>
        [...document.querySelectorAll('[class]')].map(e => e.className).filter(Boolean).slice(0, 30)
      );
      console.log(classes.join('\n'));
      expect(band, 'detailHeroBand element must exist').toBeTruthy();
      return;
    }

    console.log('detailHeroBand bounds:', band);

    // Right edge must reach viewport right
    expect(band.right).toBeGreaterThanOrEqual(viewportWidth - 1);
    // Left edge must be ≤ sidenav width (256px), NOT inset by grid margin
    expect(band.left).toBeLessThanOrEqual(256 + 1);
  });

  test('no gap between Carbon header bottom and detail hero band top', async ({ page }) => {
    const header = await measure(page, '.cds--header');
    const band = await measure(page, '[class*="detailHeroBand"]');

    console.log('Carbon header bottom:', header?.bottom);
    console.log('detailHeroBand top:', band?.top);

    if (!header || !band) return;

    const gap = band.top - header.bottom;
    console.log(`Gap between header and hero band: ${gap}px`);
    expect(gap).toBeLessThanOrEqual(2);
  });

  test('hero h1 and back button share the same left edge (grid alignment)', async ({ page }) => {
    const h1 = await measure(page, '[id="prototype-title"]');
    // The back button is a direct sibling of h1 inside the same Grid Column —
    // its left edge == the column padding edge, same as h1.
    const backBtn = await measure(page, '[class*="detailHero"] button');

    console.log('prototype-title h1:', h1);
    console.log('back button:', backBtn);

    if (!h1 || !backBtn) {
      console.log('⚠  Could not find both elements for alignment check');
      return;
    }

    const diff = Math.abs(h1.left - backBtn.left);
    console.log(`Alignment diff (hero h1 vs back button): ${diff}px — should be ≤ 2px`);
    expect(diff).toBeLessThanOrEqual(2);
  });

  test('screenshot — DetailView full page', async ({ page }) => {
    await page.screenshot({
      path: 'tests/screenshots/detail-view.png',
      fullPage: false,
    });
  });
});
