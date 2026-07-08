---
Plan-name: Fix White Screen and Playwright Setup
Prototype(s): prototypes/DI_nav-ia-prototype_Figma-Make
Date-created: 2025-07-09
Origin-Chat-ID: fix-white-screen-playwright
Chat-session-IDs: []
Implementation status: complete
Next-step: Switch to Agent mode and execute Sub-Task 1, then Sub-Task 2
---

# Fix White Screen and Playwright Setup

## Overview

The previous agent added pnpm artifacts to a prototype that runs on npm. This caused
`react-dom@19.0.0-rc` to be installed instead of `18.3.1`, breaking the app (white screen).
It also installed Playwright inside the prototype instead of at the repo root.

**What to keep:** all barrel export changes in `src/app/components/`
**What to fix:**
1. Revert `package.json` and `pnpm-workspace.yaml` in the prototype to their state at
   commit `4f0f60ff8e04b98f96e48190053eff770b9aac4d`
2. Delete `pnpm-lock.yaml` from the prototype
3. Reinstall via npm from the repo root
4. Move Playwright config and test file to the repo root

---

## Sub-Task 1 — Revert pnpm changes, reinstall via npm

**Status:** `[ ] pending`

**Intent:**
Restore the two modified tracked files to commit `4f0f60ff` and delete `pnpm-lock.yaml`.
This removes pnpm from the picture entirely. Reinstall via npm so `react-dom@18.3.1` is
resolved correctly.

**Todo List:**
1. From the repo root:
   ```sh
   git checkout 4f0f60ff8e04b98f96e48190053eff770b9aac4d -- prototypes/DI_nav-ia-prototype_Figma-Make/package.json prototypes/DI_nav-ia-prototype_Figma-Make/pnpm-workspace.yaml
   ```
2. Delete `prototypes/DI_nav-ia-prototype_Figma-Make/pnpm-lock.yaml`
3. Delete `prototypes/DI_nav-ia-prototype_Figma-Make/node_modules/`
4. From the repo root: `npm install --workspaces --include-workspace-root`
5. Verify: `react-dom` in the prototype's `node_modules` shows `"version": "18.3.1"`
6. Verify: `npm run dev:di-nav-ia` starts without a white screen

---

## Sub-Task 2 — Set up Playwright at the repo root

**Status:** `[ ] pending`

**Intent:**
Delete Playwright from the prototype directory and create the config and test file at the
repo root. The root `package.json` already has `@playwright/test` in `devDependencies`.

**Todo List:**
1. Delete `prototypes/DI_nav-ia-prototype_Figma-Make/playwright.config.ts`
2. Delete `prototypes/DI_nav-ia-prototype_Figma-Make/tests/`
3. Create `playwright.config.ts` at the repo root:
   ```ts
   import { defineConfig, devices } from '@playwright/test';

   export default defineConfig({
     testDir: './tests',
     snapshotDir: './tests/snapshots',
     use: {
       baseURL: 'http://localhost:5173',
       screenshot: 'on',
     },
     projects: [
       { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
     ],
     webServer: {
       command: 'npm run dev:di-nav-ia',
       url: 'http://localhost:5173',
       reuseExistingServer: !process.env.CI,
       timeout: 30000,
     },
   });
   ```
4. Create `tests/barrel-regression.spec.ts` at the repo root (same content as the deleted
   prototype version — routes unchanged):
   ```ts
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
   ```
5. Verify: `npx playwright test --list` from the repo root lists 8 tests

---

## Implementation Order

```
Sub-Task 1 → Revert pnpm changes + npm install (fixes white screen)
Sub-Task 2 → Playwright at repo root
```
