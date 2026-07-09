# Barrel Export Refactoring Plan

> **Status: ✅ Complete** — Completed organically during Carbon migration phases — all components already in folder+barrel form. All six sub-tasks are done.

## Overview

**Goal:** Convert all loose component files at the top of `src/app/components/` into
folder-based barrel-exported modules, and add a missing barrel to `ChatHistoryPanel/`.
Update all consumer import paths to point to the new folder barrels. No code changes —
this is purely a file restructuring task.

**Scope:**
- 15 active loose components that have consumers and need import updates
- 4 orphaned/unused loose components (moved into folders for consistency; no import updates needed)
- 1 existing folder without a barrel: `ChatHistoryPanel/`
- 0 changes to the `SidePanel/` barrel — already fully barrelised; only a final audit is needed

**Non-goals:**
- No changes to component logic, JSX, CSS modules, or styles
- No changes to `pages/`, `ui/`, or `figma/` folders (not domain component barrels)
- No creation of a root `components/index.ts` (out of scope)
- No deletions of orphaned files — move them into folders and leave them
- No changes to `SidePanel/panels/` — already barrelised

**Pattern to follow:** Each folder contains the component `.tsx` + `.module.css` files,
plus an `index.ts` that re-exports all public symbols. This mirrors the existing
`CarbonHeader/index.ts` and `SideRailNavigation/index.ts` patterns already in the codebase.

**Verification approach:** After each sub-task, Playwright visual snapshot tests confirm
zero style regression. A TypeScript build check (`vite build`) runs as the final gate.
Playwright must be installed as a dev dependency before Sub-Task 1 begins.

---

## Sub-Task 1 — Add barrel to `ChatHistoryPanel/`

**Status:** `[x] done`

**Intent:**
`ChatHistoryPanel/` is already a folder with a `.tsx` and `.module.css` but lacks an
`index.ts`. Its one consumer (`CarbonDecisionAssistant.tsx`) imports directly from the
file path `'./ChatHistoryPanel/ChatHistoryPanel'`. Adding a barrel lets the consumer use
the clean `'./ChatHistoryPanel'` path.

**Expected Outcomes:**
- New file `ChatHistoryPanel/index.ts` exists and exports the named export `ChatHistoryPanel`
- Consumer `CarbonDecisionAssistant.tsx` import updated to `'./ChatHistoryPanel'`
- No visual or functional changes

**Todo List:**
1. Create `src/app/components/ChatHistoryPanel/index.ts`:
   ```ts
   export { ChatHistoryPanel } from './ChatHistoryPanel';
   ```
2. Update `CarbonDecisionAssistant.tsx` line 36: change import path from
   `'./ChatHistoryPanel/ChatHistoryPanel'` → `'./ChatHistoryPanel'`

**Relevant Context:**
- `src/app/components/ChatHistoryPanel/ChatHistoryPanel.tsx` — source file (named export)
- `src/app/components/CarbonDecisionAssistant.tsx` line 36 — only consumer

---

## Sub-Task 2 — Wrap & barrel: simple default-export components (Group A)

**Status:** `[x] done`

**Intent:**
Move 9 loose, purely default-exported components that each have exactly one `.tsx` +
one `.module.css` file and are consumed by a small number of files. Each gets its own new
folder containing both files, plus an `index.ts`. Consumer imports resolve to the same
path (folder barrel) so no consumer logic changes.

**Components in this group:**

| Component | Consumer count |
|---|---|
| `BreadcrumbActionBar` | 2 |
| `ChatLayoutTemplate` | 1 |
| `DataModelsTable` | 2 |
| `DecisionAutomationSideNav` | 1 (no CSS file) |
| `LinkedAutomationCard` | 2 |
| `LinkedObjectiveCard` | 2 |
| `ObjectiveHierarchyTree` | 2 |
| `PageHeaderWrapper` | 4 |
| `PlaceholderContent` | 14+ |

**Expected Outcomes:**
- Each component lives in `ComponentName/ComponentName.tsx` and `ComponentName/ComponentName.module.css`
- Each folder has an `index.ts` with `export { default } from './ComponentName'`
- CSS module paths inside each moved `.tsx` remain `'./ComponentName.module.css'`
  (co-located after move — relative path does not change)
- All consumer imports resolve correctly
- No visual changes

**Todo List:**
For each of the 9 components:
1. Create the folder `ComponentName/`
2. Move `ComponentName.tsx` → `ComponentName/ComponentName.tsx`
3. Move `ComponentName.module.css` → `ComponentName/ComponentName.module.css`
4. Create `ComponentName/index.ts`:
   ```ts
   export { default } from './ComponentName';
   ```
5. Update all consumer import paths (see Relevant Context below)
6. Verify the CSS import inside each moved `.tsx` still reads `'./ComponentName.module.css'`

**Relevant Context — consumer import locations:**
- `BreadcrumbActionBar`: `AppLayout.tsx` (L23), `ApplicationLayoutTemplate.tsx` (L29)
- `ChatLayoutTemplate`: `routes.tsx` (L21) — also contains internal import of `CarbonDecisionAssistant`
  from `'./CarbonDecisionAssistant'`; after CarbonDecisionAssistant is moved in Sub-Task 4,
  update that internal import to `'../CarbonDecisionAssistant'`
- `DataModelsTable`: `pages/DecisionServiceDetailPage.tsx` (L4), `ApplicationLayoutTemplate.tsx` (L53)
- `DecisionAutomationSideNav`: `ApplicationLayoutTemplate.tsx` (L27)
- `LinkedAutomationCard`: `pages/ObjectivesAndGoalsPage.tsx` (L16), `ApplicationLayoutTemplate.tsx` (L49)
- `LinkedObjectiveCard`: `pages/DecisionServiceDetailPage.tsx` (L9), `pages/AutomationOverviewPage.tsx` (L7)
- `ObjectiveHierarchyTree`: `pages/ObjectivesAndGoalsPage.tsx` (L15), `ApplicationLayoutTemplate.tsx` (L51)
- `PageHeaderWrapper`: `pages/RulesAndPoliciesPage.tsx` (L1), `pages/ObjectivesAndGoalsPage.tsx` (L3),
  `pages/DashboardsPage.tsx` (L2), `pages/DecisionAutomationsPage.tsx` (L4)
  — also contains internal import of `PageHeader` from `'./PageHeader'`;
  after PageHeader is moved in Sub-Task 3, update that internal import to `'../PageHeader'`
- `PlaceholderContent`: 14+ page files — grep `from ['"]\.\.?/PlaceholderContent` before implementing

---

## Sub-Task 3 — Wrap & barrel: components with named exports (Group B)

**Status:** `[x] done`

**Intent:**
These components export both a default AND named exports (interfaces, types, or named
components) that consumers import explicitly. The `index.ts` for each must re-export
all public symbols so consuming code continues to work without any import-side changes
(other than the path resolution the folder barrel provides).

**Components in this group:**

| Component | Named exports | Consumer count |
|---|---|---|
| `BranchSwitcher` | `interface Branch` | 1 (`BreadcrumbActionBar`) |
| `PageHeader` | `interface PanelTriggerConfig` | 13 |
| `DecisionAssetsTable` | default only, but imports SidePanel internals | 2 |
| `LargeListItem` | `LargeListItemMenuItem` | 4 |

**Expected Outcomes:**
- Each component lives in its own folder
- `index.ts` exports the default AND all named symbols
- Consumers using `import PageHeader from '../PageHeader'` and
  `import { type PanelTriggerConfig } from '../PageHeader'` continue to work unchanged
- No code logic changes

**Todo List:**

1. **`BranchSwitcher/`**
   - Move `.tsx` + `.module.css` into folder
   - Create `index.ts`:
     ```ts
     export { default } from './BranchSwitcher';
     export type { Branch } from './BranchSwitcher';
     ```
   - Update consumer: `BreadcrumbActionBar.tsx` — after BreadcrumbActionBar is moved
     in Sub-Task 2, its internal `'./BranchSwitcher'` import becomes `'../BranchSwitcher'`

2. **`PageHeader/`**
   - Move `.tsx` + `.module.css` into folder
   - Create `index.ts`:
     ```ts
     export { default } from './PageHeader';
     export type { PanelTriggerConfig } from './PageHeader';
     ```
   - Update all 13 consumers:
     - 10 page files that do `import PageHeader from "../PageHeader"`
     - `pages/serviceAssetPanelGroups.tsx` (L1): `import { type PanelTriggerConfig } from '../PageHeader'`
     - `pages/DecisionServiceAssetDetailsPage.tsx` (L2): combined import
       `import PageHeader, { type PanelTriggerConfig } from "../PageHeader"`
     - `PageHeaderWrapper.tsx` internal import (handled in Sub-Task 2 above)
     - `ApplicationLayoutTemplate.tsx` (L28) (handled in Sub-Task 4)

3. **`DecisionAssetsTable/`**
   - Move `.tsx` + `.module.css` into folder
   - Create `index.ts`:
     ```ts
     export { default } from './DecisionAssetsTable';
     ```
   - Inside the moved `DecisionAssetsTable.tsx`, update the internal SidePanel import:
     `'./SidePanel'` → `'../SidePanel'` (the file is now one level deeper)
   - Update consumers: `pages/DecisionServiceDetailPage.tsx` (L3), `ApplicationLayoutTemplate.tsx` (L52)

4. **`LargeListItem/`**
   - Move `.tsx` + `.module.css` into folder
   - Create `index.ts`:
     ```ts
     export { default } from './LargeListItem';
     export { LargeListItemMenuItem } from './LargeListItem';
     ```
   - Update consumers: `pages/ObjectivesAndGoalsPage.tsx` (L12), `pages/BranchesPage.tsx` (L14),
     `InboxLayout/InboxPanelList.tsx` (L2), `ApplicationLayoutTemplate.tsx` (L47)

**Relevant Context:**
- `BranchSwitcher.tsx` line 6: `export interface Branch`; line 20: `export default function BranchSwitcher()`
- `PageHeader.tsx` line 49: `export interface PanelTriggerConfig`; line 74: `export default function PageHeader()`
- `DecisionAssetsTable.tsx` line 12: `import { usePanelManager, AssetDetailsPanel } from "./SidePanel"`
  — this path must become `'../SidePanel'` after the file is moved into its subfolder

---

## Sub-Task 4 — Wrap & barrel: `ApplicationLayoutTemplate` and `CarbonDecisionAssistant`

**Status:** `[x] done`

**Intent:**
These two are the most heavily internally-coupled top-level loose components.
`ApplicationLayoutTemplate` imports almost every other loose component in the folder;
its internal relative imports must all be updated after those components have been moved
in Sub-Tasks 1–3. `CarbonDecisionAssistant` uses a named-export pattern and is a
dependency of `SidePanel/panels/DecisionAssistantPanel.tsx`.

This sub-task is intentionally last among the active components so all siblings are
already in their final folder locations.

**Components in this group:**

| Component | Export type | Consumer count |
|---|---|---|
| `ApplicationLayoutTemplate` | Default | 1 (`routes.tsx`) |
| `CarbonDecisionAssistant` | Named `{ CarbonDecisionAssistant }` | 3 |

**Expected Outcomes:**
- Both components moved into their own folders
- `ApplicationLayoutTemplate/index.ts` re-exports default
- `CarbonDecisionAssistant/index.ts` re-exports the named export
- All internal sibling imports inside `ApplicationLayoutTemplate.tsx` updated to `'../X'`
- `CarbonDecisionAssistant.tsx` internal imports of `ChatHistoryPanel` and `ChatSidebar`
  updated to `'../ChatHistoryPanel'` and `'../ChatSidebar'`
- No visual or functional changes

**Todo List:**

1. **`CarbonDecisionAssistant/`**
   - Move `.tsx` + `.module.css` into folder
   - Create `index.ts`:
     ```ts
     export { CarbonDecisionAssistant } from './CarbonDecisionAssistant';
     ```
   - Inside moved file, update internal imports:
     - `'./ChatHistoryPanel'` → `'../ChatHistoryPanel'` (barrelised in Sub-Task 1)
     - `'./ChatSidebar'` → `'../ChatSidebar'` (moved in Sub-Task 5)
   - Update consumers:
     - `pages/DecisionAssistantPage.tsx` (L1)
     - `ChatLayoutTemplate.tsx` (L1) — file was moved in Sub-Task 2; update its internal import
     - `SidePanel/panels/DecisionAssistantPanel.tsx` (L2)

2. **`ApplicationLayoutTemplate/`**
   - Move `.tsx` + `.module.css` into folder
   - Create `index.ts`:
     ```ts
     export { default } from './ApplicationLayoutTemplate';
     ```
   - Inside moved `ApplicationLayoutTemplate.tsx`, update ALL `'./X'` sibling imports to `'../X'`.
     Grep the file for `from './'` before implementing to get the complete list. Known imports:
     - `'./PageHeader'` → `'../PageHeader'`
     - `'./BreadcrumbActionBar'` → `'../BreadcrumbActionBar'`
     - `'./DecisionAutomationSideNav'` → `'../DecisionAutomationSideNav'`
     - `'./PlaceholderContent'` → `'../PlaceholderContent'`
     - `'./LargeListItem'` → `'../LargeListItem'`
     - `'./LinkedAutomationCard'` → `'../LinkedAutomationCard'`
     - `'./ObjectiveHierarchyTree'` → `'../ObjectiveHierarchyTree'`
     - `'./DecisionAssetsTable'` → `'../DecisionAssetsTable'`
     - `'./DataModelsTable'` → `'../DataModelsTable'`
     - `'./SidePanel'` → `'../SidePanel'`
     - Any other `'./'` references found during grep
   - Update consumer: `routes.tsx` (L27)

**Relevant Context:**
- `ApplicationLayoutTemplate.tsx` is the hub that imports almost every other loose component;
  completing Sub-Tasks 1–3 first ensures all sibling folders exist before updating its paths
- `SidePanel/panels/DecisionAssistantPanel.tsx` line 2 imports `CarbonDecisionAssistant`
  directly — check the exact current path and update to the new barrelised folder path

---

## Sub-Task 5 — Wrap & barrel: orphaned/unused loose components

**Status:** `[x] done`

**Intent:**
Four loose components have no consumers and are unused. They still need to be wrapped
into folders for consistency. No import updates are required in other files.

**Components in this group:**
- `ChatInterface` (`.tsx` + `.module.css`)
- `ChatSidebar` (`.tsx` + `.module.css`)
- `Match360Navigation` (`.tsx` + `.module.css`)
- `TaskModelSubAssetsTable` (`.tsx` only — but internally imports `'./DecisionAssetsTable.module.css'`)

**Special case — `TaskModelSubAssetsTable`:** It borrows `DecisionAssetsTable.module.css`.
After `DecisionAssetsTable` is moved to its folder in Sub-Task 3, the CSS file lives at
`DecisionAssetsTable/DecisionAssetsTable.module.css`. After `TaskModelSubAssetsTable` is
moved to its own folder in this sub-task, its internal CSS import must be updated to
`'../DecisionAssetsTable/DecisionAssetsTable.module.css'`.

> **Note:** This sub-task can be done in any order relative to Sub-Tasks 2–4. It is
> placed last only because it is the lowest-priority work. However, `ChatSidebar` is
> imported by `CarbonDecisionAssistant` — move `ChatSidebar` before Sub-Task 4.

**Expected Outcomes:**
- Each of the 4 components lives in its own folder with an `index.ts`
- `TaskModelSubAssetsTable.tsx`'s internal CSS import corrected after the move
- No import updates needed in any other file (components are unused)

**Todo List:**
1. `ChatSidebar/`: move `.tsx` + `.module.css`, create `index.ts`:
   ```ts
   export { default } from './ChatSidebar';
   ```
2. `ChatInterface/`: move `.tsx` + `.module.css`, create `index.ts`:
   ```ts
   export { default } from './ChatInterface';
   ```
3. `Match360Navigation/`: move `.tsx` + `.module.css`, create `index.ts`:
   ```ts
   export { default } from './Match360Navigation';
   ```
4. `TaskModelSubAssetsTable/`: move `.tsx`, create `index.ts`:
   ```ts
   export { default } from './TaskModelSubAssetsTable';
   ```
   Update internal CSS import in the moved file:
   `'./DecisionAssetsTable.module.css'` → `'../DecisionAssetsTable/DecisionAssetsTable.module.css'`

---

## Sub-Task 0 — Install Playwright and capture baseline snapshots

**Status:** `[x] done`

**Intent:**
Before any files are moved, install Playwright as a dev dependency and capture full-page
screenshots of every route in the app. These baseline snapshots are the visual ground
truth that every subsequent sub-task is compared against to guarantee zero style
regression. Playwright is installed once here and reused by Sub-Tasks 1–6.

**Routes to snapshot (from `routes.tsx`):**
| Route | Snapshot name |
|---|---|
| `/` | `home` |
| `/decision-assistant` | `decision-assistant` |
| `/decision-automations` | `decision-automations` |
| `/automation/1` (any valid ID) | `automation-detail` |
| `/rules-and-policies` | `rules-and-policies` |
| `/dashboards` | `dashboards` |
| `/objectives-and-goals` | `objectives-and-goals` |
| `/resource-hub` | `resource-hub` |

**Expected Outcomes:**
- Playwright installed in `devDependencies`
- `playwright.config.ts` created at project root pointing to `http://localhost:5173`
- A smoke test file `tests/barrel-regression.spec.ts` exists
- Running `pnpm exec playwright test` while `vite dev` is running captures baseline PNGs
  under `tests/snapshots/`
- All baseline snapshots stored; CI comparison threshold set to 0px (pixel-perfect)

**Todo List:**
1. Install Playwright: `pnpm add -D @playwright/test`
2. Run: `pnpm exec playwright install chromium` (headless browser only)
3. Create `playwright.config.ts` at the project root:
   - `baseURL: 'http://localhost:5173'`
   - `testDir: './tests'`
   - `use: { screenshot: 'on', fullPage: true }`
   - `webServer` block that runs `pnpm dev` automatically
4. Create `tests/barrel-regression.spec.ts` with a parameterised test loop over
   all 8 routes — each test navigates to the route and calls
   `expect(page).toHaveScreenshot('<snapshot-name>.png', { maxDiffPixels: 0 })`
5. Run once in update mode (`--update-snapshots`) to write baseline PNGs
6. Commit the baseline snapshots to the repo

**Relevant Context:**
- `src/app/routes.tsx` — definitive list of all routes
- App dev server: `pnpm dev` (Vite, port 5173)
- No TypeScript config exists yet — Playwright will bring its own `tsconfig`

---

## Sub-Task 6 — Final audit and verification

**Status:** `[x] done`

**Intent:**
After all moves and barrel creations, do a focused sweep to confirm zero broken imports,
run the Playwright regression suite to verify zero visual changes across all routes, and
run a production build as the final gate. The `SidePanel/` barrel and its `panels/`
sub-barrel are unchanged, but files that import from `SidePanel` may have shifted
path depths — confirm their paths are correct.

**Expected Outcomes:**
- No loose `.tsx` component files remain directly in `components/` root
  (except inside `pages/`, `ui/`, `figma/`, `layouts/` which are out of scope)
- Every new folder has an `index.ts`
- `SidePanel/index.ts` and `SidePanel/panels/index.ts` are byte-for-byte unchanged
- Playwright snapshot comparison reports **0 pixel diff** on all 8 routes
- TypeScript/Vite build passes with zero new errors
- All CSS module imports are co-located with their `.tsx` files (no unintended
  cross-folder CSS imports except the documented `TaskModelSubAssetsTable` special case)

**Todo List:**
1. Run: `grep -rn "from '\./[A-Z]" src/app/components/*.tsx` — should return 0 results
   (no loose top-level file imports remain)
2. Run: `grep -rn "from ['\"]\.\./[A-Z]" src/app/components/pages/` — review results
   to confirm all paths resolve to folders, not bare `.tsx` files
3. Confirm `SidePanel/panels/DecisionAssistantPanel.tsx` import of `CarbonDecisionAssistant`
   uses the updated barrel path
4. Confirm `InboxLayout/InboxPanelList.tsx` import of `LargeListItem` uses updated path
5. Confirm `DecisionModelCanvas/NodeDetailsPanel.tsx` import of `usePanelManager`
   from `'../SidePanel'` is unchanged (SidePanel was not moved)
6. Run Playwright regression suite with `pnpm exec playwright test` (dev server must be
   running). All 8 snapshot comparisons must pass with 0 pixel diff.
7. Run production build: `pnpm build` — must complete with zero errors and zero new warnings

---

## Implementation Order

```
Sub-Task 0  →  Install Playwright, capture baseline snapshots (before any file moves)
Sub-Task 1  →  ChatHistoryPanel barrel (prerequisite for CarbonDecisionAssistant move)
Sub-Task 5  →  Orphaned components incl. ChatSidebar (prerequisite for Sub-Task 4)
Sub-Task 2  →  Group A: simple default-export components
Sub-Task 3  →  Group B: components with named exports
Sub-Task 4  →  ApplicationLayoutTemplate + CarbonDecisionAssistant
Sub-Task 6  →  Playwright regression + build verification
```

After Sub-Tasks 1, 2, 3, 4, and 5 are complete, run
`pnpm exec playwright test` to verify the snapshot diff is 0 before marking that
sub-task done and moving to the next.

---

## Verification Checklist

- [ ] Playwright baseline snapshots captured before first file move (Sub-Task 0)
- [ ] No loose `.tsx` files remain at `components/` top level
- [ ] Every new folder has an `index.ts`
- [ ] `SidePanel/index.ts` is byte-for-byte unchanged
- [ ] `SidePanel/panels/index.ts` is byte-for-byte unchanged
- [ ] All CSS module files are co-located with their component `.tsx` files
- [ ] Playwright snapshot comparison: 0 pixel diff across all 8 routes
- [ ] `pnpm build` passes with zero errors and zero new warnings
