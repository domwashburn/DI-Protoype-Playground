import { test, expect } from '@playwright/test';

const routes = [
  { path: '/',                     name: 'home' },
  { path: '/decision-assistant',   name: 'decision-assistant' },
  { path: '/decision-automations', name: 'decision-automations' },
  { path: '/automation/1',         name: 'automation-detail' },
  { path: '/rules-and-policies',   name: 'rules-and-policies' },
  { path: '/dashboards',           name: 'dashboards' },
  { path: '/objectives-and-goals', name: 'objectives-and-goals' },
  { path: '/resource-hub',         name: 'resource-hub' },
];

for (const route of routes) {
  test(`visual regression: ${route.name}`, async ({ page }) => {
    await page.goto(route.path);
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.cds--header', { state: 'visible', timeout: 15000 });
    await expect(page).toHaveScreenshot(`${route.name}.png`, {
      maxDiffPixels: 0,
      fullPage: true,
    });
  });
}
