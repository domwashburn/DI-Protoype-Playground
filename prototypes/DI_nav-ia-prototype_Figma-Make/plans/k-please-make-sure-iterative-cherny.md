# Plan: Folderize remaining page files (hybrid grouping)

## Context

`HomePage.tsx` + `HomePage.module.css` were just relocated from `components/pages/` into a sibling-style `components/HomePage/` folder so the page sits alongside the section components it owns (`HomePageHeader`, `RecentDecisionAutomationsSection`, etc.). Every other page still lives flat in `components/pages/`, which means page-specific helpers (e.g. `ResourceHubHeader`, `ResourceDetailHeader`, `_shared.module.css`) are detached from their page and from each other. This change moves the remaining pages into folders at the components root using a **hybrid** rule: group by family where one clearly exists, otherwise one folder per page. No functional changes — pure relocation + import-path updates.

## Approach

### Family folders (grouped)

Create the following new folders at `src/app/components/` and move the listed files into each. The existing `components/ResourceHub/` folder is reused.

1. **`Automation/`** — all automation-shell pages
   - `AutomationDetailPage.{tsx,module.css}`
   - `AutomationOverviewPage.{tsx,module.css}`
   - `AutomationSettingsPage.{tsx,module.css}`
   - `DeployAutomationPage.{tsx,module.css}`
   - `MonitorAutomationPage.{tsx,module.css}`
   - `TestAutomationPage.{tsx,module.css}`
   - `BranchesPage.{tsx,module.css}`
   - `HistoryPage.{tsx,module.css}`
   - `UpdatesPage.{tsx,module.css}`
   - `VersionsPage.{tsx,module.css}`

2. **`ServiceAssets/`** — the five asset-type detail pages + the service detail pages that own them
   - `DecisionServiceDetailPage.{tsx,module.css}`
   - `DecisionServiceAssetDetailsPage.{tsx,module.css}`
   - `DecisionModelPage.{tsx,module.css}`
   - `TaskModelPage.{tsx,module.css}`
   - `PredictiveModelPage.{tsx,module.css}`
   - `OptimizationModelPage.{tsx,module.css}`
   - `GenAINodePage.{tsx,module.css}`

3. **`ResourceHub/`** (already exists, currently holds `ResourceFiltersPanel.tsx`, `ResourceSection.{tsx,module.css}`, `index.ts`) — absorb the page + headers
   - `ResourceHubPage.{tsx,module.css}`
   - `ResourceHubHeader.{tsx,module.css}`
   - `ResourceDetailsPage.{tsx,module.css}`
   - `ResourceDetailHeader.{tsx,module.css}`

### Solo folders (one per page)

Create one new folder per page for the remaining standalone pages:

- `DecisionAutomationsPage/` ← `DecisionAutomationsPage.{tsx,module.css}`
- `DecisionAssistantPage/` ← `DecisionAssistantPage.{tsx,module.css}`
- `RulesAndPoliciesPage/` ← `RulesAndPoliciesPage.{tsx,module.css}`
- `DashboardsPage/` ← `DashboardsPage.{tsx,module.css}`
- `ObjectivesAndGoalsPage/` ← `ObjectivesAndGoalsPage.{tsx,module.css}`
- `DecisionOutcomesPage/` ← `DecisionOutcomesPage.{tsx,module.css}`
- `SidePanelDemoPage/` ← `SidePanelDemoPage.{tsx,module.css}`

### Shared file

- `components/pages/_shared.module.css` → move to `components/_sharedPage.module.css` (or keep one shared location). Update any `@value` / `composes` references inside the moved page CSS files to the new relative path.

### Import updates

Two import sites cover almost everything:

- **`src/app/routes.tsx`** (lines 20, 22–26): rewrite to the new paths, e.g. `./components/Automation/AutomationDetailPage`, `./components/ResourceHub/ResourceHubPage`.
- **`src/app/components/ApplicationLayoutTemplate.tsx`** (lines 54–69): rewrite the bulk page imports to their new family-folder paths.

Inside each moved page, fix relative imports that change depth — all current page files use `../` to reach `components/<X>` siblings; after the move they remain at depth 2 from `src/app/`, so most `../`/`../../` paths are unchanged. The exceptions to grep-and-fix per file:

- Co-located imports between pages and their owned headers (e.g. `ResourceHubPage` → `./ResourceHubHeader` instead of `./ResourceHubHeader`).
- `_shared.module.css` references.

### Pattern (representative)

For each move:

1. `mv components/pages/<Page>.tsx components/<Folder>/<Page>.tsx`
2. `mv components/pages/<Page>.module.css components/<Folder>/<Page>.module.css`
3. Edit the moved `.tsx`: any `./` import that pointed to a *peer page* in the old flat `pages/` directory becomes a path into the new family folder structure — typically the same folder (`./Sibling`) for grouped pages, or a cross-folder hop (`../OtherFamily/Other`) for cross-family references.
4. Edit `routes.tsx` / `ApplicationLayoutTemplate.tsx` import line.

### Templates

Two layout templates live flat at `components/` root and deserve the same treatment:

- `ApplicationLayoutTemplate.{tsx,module.css}` — the shell for `/automation/:id` and its sub-routes
- `ChatLayoutTemplate.{tsx,module.css}` — the shell for `/decision-assistant`

(`CardLayoutTemplate` already sits inside `CardLayout/` — no action.)

**Placement:** create a dedicated `components/Templates/` folder and move both templates into it.

- `components/Templates/ApplicationLayoutTemplate.{tsx,module.css}`
- `components/Templates/ChatLayoutTemplate.{tsx,module.css}`

Update import sites:
- `src/app/routes.tsx` line 21 → `./components/Templates/ChatLayoutTemplate`
- `src/app/routes.tsx` line 27 → `./components/Templates/ApplicationLayoutTemplate`
- Inside `ApplicationLayoutTemplate.tsx`, the 16 page imports already get rewritten to the new family folders (see Import updates section); other `../`-prefixed sibling imports remain depth-2 and are unchanged.
- Inside `ChatLayoutTemplate.tsx`, audit `./` and `../` imports — anything that pointed to a `components/` root sibling stays at depth 2 (`../Sibling`).

### Out of scope (not touched)

- `MIGRATION_EXECUTION_PLAN.md` and other markdown references to old `pages/` paths — these are historical docs; rewriting them risks confusing the migration record. Skip.
- `useAppNavigation.ts` JSDoc comment mentioning `/components/pages/HomePage.tsx` — already stale from the HomePage move; update its comments only.
- The `components/pages/` directory itself — delete once empty.
- Loose non-page components in `components/` root (`ChatInterface`, `BranchSwitcher`, `LargeListItem`, etc.) — not pages, out of scope per the user's "pages" framing.

## Critical files to modify

- `src/app/routes.tsx` — 6 import paths
- `src/app/components/ApplicationLayoutTemplate.tsx` — 16 import paths (lines 54–69)
- Every moved `*.tsx` — fix sibling-page imports and `_shared.module.css` paths
- `src/app/hooks/useAppNavigation.ts` — update stale JSDoc path comments

## Verification

1. After moves, `ls src/app/components/pages/` should be empty (or contain only `_shared.module.css` if we choose to leave it); then `rmdir` the empty folder.
2. Run the dev server (already running) and exercise every route in `routes.tsx`:
   - `/` (Home), `/decision-automations`, `/automation/:id` (and its sub-tabs: overview, settings, branches, history, updates, versions, test, deploy, monitor), `/rules-and-policies`, `/dashboards`, `/objectives-and-goals`, `/resource-hub`, `/resource/:id`.
3. Open at least one of each asset-type detail page (DecisionModel, TaskModel, PredictiveModel, OptimizationModel, GenAINode) via `ApplicationLayoutTemplate` routing.
4. Watch the Vite HMR console for unresolved import errors.
5. Confirm no visual regressions on the pages that share `_shared.module.css`.
