---
Plan-name: DI Prototype Repo Cleanup
Prototype(s): prototypes/DI_nav-ia-prototype_Figma-Make
Date-created: 2025-07-15
Origin-Chat-ID: plan-session-cleanup-01
Chat-session-IDs: [cleanup-execution-01]
Implementation status: complete
Next-step: Run `npm run dev` and visually smoke-test the app. Then run `npx playwright test tests/icon-baselines.spec.ts` with the dev server running to capture final icon baselines.
---

# DI Prototype Repo Cleanup Plan

## Overview

This plan finalises the Carbon v11 migration and brings the repo into full compliance with `Guidelines.md`. The migration itself is ~85% done across three overlapping planning documents (`CARBON_MIGRATION_PLAN.md`, `GRID_MIGRATION_PLAN.md`, `barrel-exports-plan.md`). What remains is:

1. **Tracker / documentation housekeeping** — several completed phases are not marked done; multiple plan documents are now stale or superseded.
2. **Remaining `lucide-react` elimination** — two components still import lucide; the package cannot be removed until both are migrated.
3. **Dead dependency removal** — ~25+ packages from the original Figma Make / shadcn scaffold remain in `package.json` despite `components/ui/` being deleted in Phase 0A.
4. **Dead file cleanup** — ~90 unused SVG path files and ~56 Figma Make reference `.tsx` files in `src/app/imports/` (confirmed not imported by any active component). Four SVG files and `HomePageHeader`/`DecisionAutomationCard` use raw SVG paths that should be replaced with Carbon icons.
5. **CSS token compliance** — hardcoded hex values and `font-size: Npx` remain in several component CSS Modules; inline styles in page components need to move to CSS Modules.
6. **Grid plan completion** — steps 6.7 and 6.8 remain open.
7. **Documentation** — no `README.md` or `readme.agents.md` files exist in any component folder; Guidelines.md requires both.
8. **Final CHANGELOG update** — each completed cleanup sub-task should be recorded.

**Approach:** Strangler Fig — each sub-task is independently verifiable; a `vite build` gate runs after any file deletions or dependency changes.

---

## Sub-Task 0: Playwright Baseline — Capture Custom Icon Snapshots

**Status:** `[ ] pending`

**Intent:**
Before any code changes, capture focused Playwright screenshots of every custom SVG icon and lucide icon that will be replaced in Sub-Tasks 2 and 3. These screenshots become the visual ground truth for the icon migration — each replaced Carbon icon must match the baseline at the same size. This is the only sub-task that requires the Vite dev server to be running (`npm run dev` / `vite`).

The snapshots are stored at `.tmp/icon-baselines/` so they persist across sessions and can be viewed during implementation without re-running the app.

**Icons to capture (14 targets across 4 components):**

| Snapshot name | Component | Location in UI | Icon being captured |
|---------------|-----------|----------------|---------------------|
| `settings-adjust-btn` | `HomePageHeader` | Home page → "Display settings" button icon | `svg-8azqa4lekk` (filter sliders) |
| `homepage-chat-tile-icon` | `HomePageHeader` | Home page → Chat tile → top-left icon | `svg-jon3mbttas` (chat/terminal icon) |
| `homepage-chat-send-icon` | `HomePageHeader` | Home page → Chat tile → send arrow in input | `svg-jon3mbttas` (`pf9d6480`) |
| `homepage-new-project-icon` | `HomePageHeader` | Home page → "New decision project" tile icon | `svg-jon3mbttas` (`p2e0fc7f0`) |
| `homepage-new-service-icon` | `HomePageHeader` | Home page → "New decision service" tile icon | `svg-8azqa4lekk` (`p38b1e480`) |
| `automation-card-arrow` | `DecisionAutomationCard` | Home page → Pinned automation card → arrow icon | `svg-19c7tsrlrh` (`pfec3600`) |
| `display-settings-pin-outline` | `DisplaySettingsContent` | Home page → Display settings modal → unpinned item | `svg-wxegm48afc` pin outline |
| `display-settings-pin-filled` | `DisplaySettingsContent` | Home page → Display settings modal → pinned item | `svg-wxegm48afc` pin filled |
| `display-settings-drag-handle` | `DisplaySettingsContent` | Home page → Display settings modal → drag handle | lucide `GripVertical` |
| `display-settings-search-icon` | `DisplaySettingsContent` | Home page → Display settings modal → search field | lucide `Search` |
| `display-settings-clear-btn` | `DisplaySettingsContent` | Home page → Display settings modal → clear search | lucide `X` |
| `toolbar-grid-icon` | `CardLayoutToolbar` | Decision Automations → toolbar → grid view button | lucide `LayoutGrid` |
| `toolbar-list-icon` | `CardLayoutToolbar` | Decision Automations → toolbar → list view button | lucide `List` |
| `toolbar-search-icon` | `CardLayoutToolbar` | Decision Automations → toolbar → search field icon | lucide `Search` |

**Expected Outcomes:**
- `.tmp/icon-baselines/` directory exists with 14 named PNG snapshots
- Each snapshot is tightly cropped to the icon itself (16×16 or 24×24 viewport clip), not the full page
- Snapshots are committed / preserved before any migration code changes
- Sub-Tasks 2 and 3 reference these snapshots by name during implementation

**Todo List:**
1. Ensure Vite dev server is running (`npm run dev` from `prototypes/DI_nav-ia-prototype_Figma-Make/`)
2. Create `tests/icon-baselines.spec.ts` — a Playwright test file that:
   - Navigates to `/` (Home page)
   - Locates and clips each home-page icon target using a stable selector (data-testid, aria-label, or CSS class)
   - Navigates to `/decision-automations` for toolbar icons
   - Opens the Display Settings modal for the pin/search/drag icons
   - Saves each clip as a PNG to `.tmp/icon-baselines/<snapshot-name>.png`
3. Add temporary `data-testid` attributes to the 5 components that need them for reliable selector targeting:
   - `HomePageHeader`: `data-testid="settings-btn-icon"`, `data-testid="chat-tile-icon"`, `data-testid="chat-send-icon"`, `data-testid="new-project-icon"`, `data-testid="new-service-icon"`
   - `DecisionAutomationCard`: `data-testid="card-arrow-icon"` on the first card
   - `DisplaySettingsContent`: `data-testid="drag-handle"`, `data-testid="pin-btn"`, `data-testid="search-icon"`
   - `CardLayoutToolbar`: `data-testid="toolbar-grid-btn"`, `data-testid="toolbar-list-btn"`, `data-testid="toolbar-search-icon"`
4. Run: `npx playwright test tests/icon-baselines.spec.ts` — confirm all 14 snapshots saved
5. Verify each PNG visually — confirm it shows the icon, not a blank/wrong element
6. The `data-testid` attributes added in step 3 are **kept** — they are valid accessibility aids and useful for future testing

**Relevant Context:**
- Dev server: `npm run dev` in `prototypes/DI_nav-ia-prototype_Figma-Make/` → `http://localhost:5173`
- Playwright config (if present): `prototypes/DI_nav-ia-prototype_Figma-Make/playwright.config.ts`
- Snapshot output: `.tmp/icon-baselines/` (relative to workspace root)
- Sub-Task 2 will reference: `toolbar-grid-icon`, `toolbar-list-icon`, `toolbar-search-icon`
- Sub-Task 3 will reference: all remaining 11 snapshots

---

## Sub-Task 1: Tracker & Plan Housekeeping

**Status:** `[ ] pending`

**Intent:**
Several completed phases are incorrectly marked "Not started" in `CARBON_MIGRATION_PLAN.md`. The `barrel-exports-plan.md` documents work that was completed organically during the migration but is entirely marked pending. `MIGRATION_EXECUTION_PLAN.md` is superseded. Fix the record so future sessions start from a truthful baseline.

**Expected Outcomes:**
- `CARBON_MIGRATION_PLAN.md` Execution Tracker updated: Phase 5A marked ✅ Complete (Carbon Tooltip already in use; no custom `Tooltip.tsx` exists)
- `barrel-exports-plan.md`: all six sub-tasks marked `[x] done`; overall status updated to complete
- `MIGRATION_EXECUTION_PLAN.md`: "SUPERSEDED" header added at the top pointing to `CARBON_MIGRATION_PLAN.md`
- No code changes; build is unaffected

**Todo List:**
1. Edit `src/app/ai/plans/CARBON_MIGRATION_PLAN.md` Execution Tracker row for `5A` — change `Not started` → `✅ Complete`; add note "Carbon Tooltip already in use across all SideRail components; no custom Tooltip.tsx ever existed"
2. Edit `barrel-exports-plan.md` — mark all six sub-task statuses `[x] done`; add a summary note: "Completed organically during Carbon migration phases — all components already in folder+barrel form"
3. Edit `src/app/MIGRATION_EXECUTION_PLAN.md` — prepend a `> ⚠️ SUPERSEDED` blockquote pointing to `src/app/ai/plans/CARBON_MIGRATION_PLAN.md` as the authoritative plan

**Relevant Context:**
- `src/app/ai/plans/CARBON_MIGRATION_PLAN.md` lines 798–828 — execution tracker
- `barrel-exports-plan.md` — all sub-tasks
- `src/app/MIGRATION_EXECUTION_PLAN.md` — superseded document

---

## Sub-Task 2: Eliminate `lucide-react` — `CardLayoutToolbar`

**Status:** `[ ] pending`

**Intent:**
`CardLayoutToolbar` uses 4 lucide icons and raw HTML `<select>` / `<input>` / `<button>` elements. Replace all of them with Carbon equivalents. This is the simpler of the two remaining lucide components.

Use the Carbon MCP `code_search` and `docs_search` tools to verify the correct Carbon component APIs before implementing. Confirm icon mapping 1:1 before touching any imports.

**Icon mapping (confirm against `@carbon/icons-react` via Carbon MCP before implementing):**

| lucide | Carbon equivalent | Notes |
|--------|------------------|-------|
| `ChevronDown` | `ChevronDown` from `@carbon/icons-react` | Same name |
| `Search` | `Search` from `@carbon/icons-react` | Same name |
| `LayoutGrid` | `Grid` from `@carbon/icons-react` | Verify with Carbon MCP |
| `List` | `List` from `@carbon/icons-react` | Same name — verify |

**Component replacements:**
- Native `<select>` sort dropdown → Carbon `Select` + `SelectItem` from `@carbon/react`
- Native `<input type="text">` search → Carbon `Search` component from `@carbon/react`
- Custom `<button>` grid/list view toggle → Carbon `ContentSwitcher` + `Switch` from `@carbon/react` (or Carbon `ToggleSmall` — verify which fits the 2-state icon toggle pattern via Carbon MCP)
- Remove `ChevronDown` once `Select` provides its own chevron

**Expected Outcomes:**
- Zero `lucide-react` imports in `CardLayoutToolbar.tsx`
- All interactive elements are Carbon components
- Visual appearance matches current — sort, search, view toggle all function correctly
- No new inline styles; all CSS uses Carbon tokens via CSS Modules

**Todo List:**
1. Open `.tmp/icon-baselines/toolbar-grid-icon.png`, `toolbar-list-icon.png`, `toolbar-search-icon.png` — confirm the shapes to match
2. Use Carbon MCP `code_search` to find a `ContentSwitcher` icon-toggle example and a `Select` example
3. Use Carbon MCP `docs_search` to confirm `ContentSwitcher` vs `ToggleSmall` for a 2-icon view-mode switcher
4. Replace lucide import line with `@carbon/icons-react` equivalents (1:1 mapping confirmed above)
5. Replace `<select>` + `<option>` with Carbon `Select` + `SelectItem`; remove `ChevronDown` usage
6. Replace `<input type="text">` with Carbon `Search`; remove lucide `Search` usage
7. Replace `<button>` view toggle pair with Carbon `ContentSwitcher` using `Grid` and `List` icons; remove `LayoutGrid`/`List` lucide usage
8. Update `CardLayoutToolbar.module.css` — remove any styles targeting the replaced raw HTML elements; add any overrides needed for Carbon component sizing
9. Run Playwright: `npx playwright test tests/icon-baselines.spec.ts --update-snapshots` on the toolbar route — visually compare new Carbon icons against baselines
10. Verify: `vite build` passes

**Relevant Context:**
- `src/app/components/CardLayout/CardLayoutToolbar.tsx` — full file
- `src/app/components/CardLayout/CardLayoutToolbar.module.css` — companion CSS
- `src/app/components/CardLayout/CardLayoutTemplate.tsx` — parent that renders the toolbar (verify props still flow)
- `src/app/components/pages/DecisionAutomationsPage.tsx` — page-level consumer

---

## Sub-Task 3: Eliminate `lucide-react` — `DisplaySettingsContent` + Replace SVG Path Icons in `HomePageHeader`

**Status:** `[ ] pending`

**Intent:**
`DisplaySettingsContent` uses 3 lucide icons inside a drag-and-drop list (`react-dnd` must be preserved). `HomePageHeader` uses two SVG path files (`svg-jon3mbttas`, `svg-8azqa4lekk`) for decorative icons inline in JSX, and `DecisionAutomationCard` uses `svg-19c7tsrlrh`. These SVG path imports should be replaced with Carbon icon components, eliminating the dependency on those three SVG files and making `HomePageHeader` fully Carbon-compliant.

Once icons are migrated and confirmed working, the three SVG path files can be deleted.

Use Carbon MCP to verify the correct Carbon icon names for each visual shape before implementing.

**Icon mapping for `DisplaySettingsContent` (confirm via Carbon MCP):**

| lucide | Carbon equivalent | Usage |
|--------|------------------|-------|
| `Search` | `Search` from `@carbon/icons-react` | Search field icon |
| `X` | `Close` from `@carbon/icons-react` | Clear search button |
| `GripVertical` | `Draggable` from `@carbon/icons-react` | Drag handle (verify — or use `DragVertical`) |

**Component replacements in `DisplaySettingsContent`:**
- Native `<input type="text">` + custom icon → Carbon `Search` component from `@carbon/react` (provides its own search + clear icon)
- Custom `<button>` content switcher (All / Pinned tabs) → Carbon `ContentSwitcher` + `Switch`
- Pin `<button>` with custom SVG → Carbon `IconButton` with appropriate Carbon pin icon (use `Pin` / `PinFilled` from `@carbon/icons-react` — verify via Carbon MCP)

**SVG path files in `HomePageHeader` + `DecisionAutomationCard`:**
- `svg-jon3mbttas` — used for inline decorative icons in the chat tile and task tiles (robot/send/add icons). Identify the visual match in `@carbon/icons-react` via Carbon MCP and replace.
- `svg-8azqa4lekk` — used as the "Settings" gear icon in the `SettingsIcon` component. Replace with `Settings` from `@carbon/icons-react`.
- `svg-19c7tsrlrh` — used in `DecisionAutomationCard`. Identify the visual match via Carbon MCP and replace.

**Expected Outcomes:**
- Zero `lucide-react` imports anywhere in `src/app/` (all three active consumers resolved)
- `DisplaySettingsContent` uses Carbon `Search`, `ContentSwitcher`, `IconButton`
- `HomePageHeader` `SettingsIcon` replaced with `<Settings size={16} />` from `@carbon/icons-react`; inline SVG path blocks replaced with Carbon icon components
- `DecisionAutomationCard` inline SVG replaced with a Carbon icon component
- `react-dnd` drag-and-drop in `DisplaySettingsContent` is fully preserved and functional
- `vite build` passes; all three affected components render correctly

**Todo List:**
1. Open all 11 remaining baseline snapshots in `.tmp/icon-baselines/` — use these as the visual reference for every Carbon icon choice below
2. Use Carbon MCP `code_search` to find Carbon `ContentSwitcher` usage examples
3. Cross-reference baseline `display-settings-drag-handle.png` against `@carbon/icons-react` — confirm `DragVertical` matches `GripVertical`; if not, try `Draggable`
4. Cross-reference baseline `display-settings-pin-outline.png` + `display-settings-pin-filled.png` against Carbon `Pin` / `PinFilled` icons
5. Cross-reference `settings-adjust-btn.png` against Carbon `SettingsAdjust` and `Settings` — pick the closer match
6. Cross-reference `homepage-chat-tile-icon.png` against Carbon `Chat`, `WatsonxAi`, `Terminal` — pick closest
7. Cross-reference `homepage-chat-send-icon.png` against Carbon `SendAlt`, `Send` — pick closest
8. Cross-reference `homepage-new-project-icon.png` against Carbon `Workflow`, `DecisionTree` — pick closest
9. Cross-reference `homepage-new-service-icon.png` against Carbon `ServiceDesk`, `Network_3`, `IbmCloudPak` — pick closest
10. Cross-reference `automation-card-arrow.png` against Carbon `ArrowRight` — confirm match
11. Replace lucide icons in `DisplaySettingsContent.tsx` with confirmed `@carbon/icons-react` equivalents
12. Replace custom `<input type="text">` with Carbon `Search`; remove lucide `Search`/`X` usage (Carbon `Search` has built-in clear)
13. Replace custom tab switcher `<button>` pair with Carbon `ContentSwitcher`; update module CSS
14. Replace pin `<button>` raw SVG with Carbon `IconButton` + `Pin`/`PinFilled` toggle
15. Remove `window.__displaySettingsApply` hack — refactor to pass `onApply` callback directly or use a `ref`-forwarded function (this anti-pattern violates guidelines)
16. In `HomePageHeader.tsx`: replace `SettingsIcon` SVG component with confirmed Carbon icon; replace all inline SVG path blocks with confirmed Carbon icon components
17. In `DecisionAutomationCard.tsx`: replace inline `svgPaths` import and SVG block with `<ArrowRight size={16} />`
18. Update CSS Modules for both components — remove styles targeting replaced HTML elements; add Carbon component sizing overrides as needed
19. Confirm `svg-jon3mbttas`, `svg-8azqa4lekk`, `svg-19c7tsrlrh`, `svg-wxegm48afc` are no longer imported anywhere
20. Run Playwright against Home page and Display Settings modal — visually compare new Carbon icons against all 11 baselines; flag any that look wrong before proceeding
21. `vite build` passes — only then proceed to Sub-Task 4 for deletions

**Relevant Context:**
- `src/app/components/Modal/DisplaySettingsContent.tsx` — full file
- `src/app/components/Modal/DisplaySettingsContent.module.css` — companion CSS
- `src/app/components/HomePage/HomePageHeader.tsx` — lines 3–4 (SVG imports), lines 14–24 (SettingsIcon), lines 140–415 (inline SVG blocks)
- `src/app/components/HomePage/DecisionAutomationCard.tsx` — line 2 (SVG import)
- `src/app/imports/svg-jon3mbttas.ts`, `svg-8azqa4lekk.ts`, `svg-19c7tsrlrh.ts`, `svg-wxegm48afc.ts` (pin icon — used by DisplaySettingsContent, handle in this task)

---

## Sub-Task 4: Delete Dead Files — `src/app/imports/`

**Status:** `[ ] pending`

**Intent:**
After Sub-Task 3 confirms all four actively-used SVG files have been replaced, this sub-task deletes all dead code from `src/app/imports/`. The ~56 Figma Make `.tsx` reference files and ~90 unused SVG `.ts` files are confirmed not imported by any active component. Their presence causes confusion about what is "live" code vs. design references.

**Must complete Sub-Task 3 first** — the four SVG files (`svg-jon3mbttas`, `svg-8azqa4lekk`, `svg-19c7tsrlrh`, `svg-wxegm48afc`) are only safe to delete after their consumers have been migrated and the build confirmed clean.

**Expected Outcomes:**
- `src/app/imports/` directory is empty (or removed entirely)
- `vite build` passes with zero errors — confirms no hidden imports were missed
- `src/imports/` (root-level, if present) also audited

**Todo List:**
1. Grep `src/app/components/` and `src/app/layouts/` for any remaining imports from `../../imports/` or `../imports/` — should return zero results after Sub-Task 3
2. Grep `src/app/` broadly for any import from the `imports/` directory to catch edge cases (data layer, hooks, etc.)
3. Delete all `.tsx` files in `src/app/imports/` (56 files — confirmed unused)
4. Delete all `.ts` / `.tsx` SVG path files in `src/app/imports/` (94 files — 4 were migrated in Sub-Task 3)
5. Delete `src/app/imports/image.png` (Figma Make artifact)
6. If `src/app/imports/` is now empty, delete the directory
7. Run `vite build` — must pass with zero errors before proceeding

**Relevant Context:**
- `src/app/imports/` — full directory listing confirmed in research
- The four SVG files that must be migrated first: `svg-jon3mbttas.ts`, `svg-8azqa4lekk.ts`, `svg-19c7tsrlrh.ts`, `svg-wxegm48afc.ts`

---

## Sub-Task 5: Remove Dead Dependencies from `package.json`

**Status:** `[ ] pending`

**Intent:**
When `components/ui/` was deleted in Phase 0A, the ~25 shadcn/Radix/MUI packages that backed it were not removed from `package.json`. These inflate install time, bundle size, and create confusion about what the project depends on. All have zero imports in active code.

**Expected Outcomes:**
- `package.json` `dependencies` contains only packages that are actually imported
- `lucide-react` removed (confirmed zero imports after Sub-Tasks 2 and 3)
- `vite build` passes; dev server starts cleanly
- `node_modules` is clean after re-install

**Packages to remove (confirm zero imports via grep before each removal):**

| Package | Reason |
|---------|--------|
| `@radix-ui/react-accordion` through `@radix-ui/react-tooltip` (all 20) | shadcn scaffold — `components/ui/` deleted in Phase 0A |
| `@mui/material`, `@mui/icons-material` | MUI — never used in active components |
| `@emotion/react`, `@emotion/styled` | MUI peer deps — no active usage |
| `class-variance-authority` | shadcn/cva — no active usage |
| `cmdk` | shadcn Command component — no active usage |
| `vaul` | shadcn Drawer component — no active usage |
| `next-themes` | shadcn theme provider — no active usage |
| `embla-carousel-react` | shadcn Carousel — no active usage |
| `recharts` | shadcn Chart component — no active usage |
| `react-day-picker` | shadcn Calendar — no active usage |
| `input-otp` | shadcn OTP field — no active usage |
| `sonner` | shadcn Toast — no active usage |
| `lucide-react` | Replaced by `@carbon/icons-react` in Sub-Tasks 2 & 3 |

**Packages to keep (actively used):**

| Package | Used by |
|---------|---------|
| `react-dnd`, `react-dnd-html5-backend` | `DisplaySettingsContent.tsx` drag-and-drop |
| `@tanstack/react-table` | `DataModelsTable`, `DecisionAssetsTable` |
| `dagre`, `@types/dagre` | `DecisionModelCanvas` layout |
| `reactflow` | `DecisionModelCanvas` |
| `react-router` | Routing |
| `clsx` | Conditional classNames |
| `motion` | Animation — verify active usage, keep if found |
| `react-resizable-panels` | Verify active usage — keep if found |
| `react-slick` | Verify active usage — keep if found |
| `react-responsive-masonry` | Verify active usage — keep if found |
| `react-popper`, `@popperjs/core` | Verify active usage — keep if found |
| `react-hook-form` | Verify active usage — keep if found |
| `date-fns` | Verify active usage — keep if found |
| `tw-animate-css`, `tailwind-merge` | Tailwind — keep until Tailwind is formally removed |

**Todo List:**
1. Grep `src/app/components/` and `src/app/layouts/` for imports of each "keep but verify" package — document findings
2. Remove confirmed-dead packages from `package.json` `dependencies` in a single edit
3. Run `npm install` (or `pnpm install`) to update lockfile
4. Run `vite build` — must pass with zero errors
5. Start dev server and smoke-test: Home, Decision Automations, Automation Detail, Decision Assistant routes

**Relevant Context:**
- `package.json` — current dependencies list
- Must run **after** Sub-Tasks 2 and 3 confirm `lucide-react` is fully eliminated

---

## Sub-Task 6: CSS Token Compliance — Replace Hardcoded Values

**Status:** `[ ] pending`

**Intent:**
Multiple component CSS Modules contain hardcoded hex colors and `font-size: Npx` values that violate Styling Rule 2 from `Guidelines.md` (all design tokens must reference Carbon CSS variables). This sub-task replaces them with the appropriate `var(--cds-*)` equivalents. Inline styles in page components that are not data-driven also move to CSS Modules.

Work file-by-file in priority order. Do not batch all files into one change — it is too risky to review.

**Priority order (by severity):**

1. **`ObjectivesAndGoalsPage.module.css`** — 20+ hardcoded hex status colors (`#24a148`, `#da1e28`, `#0f62fe`, etc.) and 15+ `font-size: Npx` values
2. **`ApplicationLayoutTemplate.module.css`** — `#d0e2ff`, `#0043ce`, `#fff1f1`, `#6929c4`, raw `px` font sizes
3. **`Timeline/TimelineItem.module.css` + `TimelineItemDetail.module.css`** — `#8a3ffc`, `#0050e6`
4. **`VersionList/VersionListItem.module.css`** — `#0050e6`
5. **`BranchesPage` inline styles** — hardcoded `#24a148`, `#da1e28` via `getChangeTypeColor()` helper; move to CSS Module status classes
6. **`TestAutomationPage` inline styles** — multiple `style={{ display: "flex", ... }}` blocks; move to CSS Modules
7. **`TaskModelPage` inline styles** — multiple layout `style={{}}` blocks; move to CSS Modules
8. **`ResourceDetailsPage` inline styles** — `style={{ fontFamily: 'var(--cds-font-family)', ... }}` inline label/value rendering; extract to CSS Modules

**Token mapping reference (Carbon v11 white theme):**

| Hardcoded | Carbon token |
|-----------|-------------|
| `#24a148` / `#198038` | `var(--cds-support-success)` |
| `#da1e28` / `#cf222e` | `var(--cds-support-error)` |
| `#0f62fe` / `#0550ae` | `var(--cds-interactive)` |
| `#6929c4` / `#8a3ffc` | `var(--cds-support-info-inverse)` (purple — verify) |
| `#d0e2ff` | `var(--cds-highlight)` |
| `#fff1f1` | `var(--cds-support-error-inverse)` (verify) |
| `#0050e6` | `var(--cds-interactive)` (slightly darker variant — map to closest token) |
| `font-size: 12px` | `var(--cds-label-01-font-size)` |
| `font-size: 14px` | `var(--cds-body-01-font-size)` |
| `font-size: 16px` | `var(--cds-heading-compact-01-font-size)` |
| `font-size: 20px` | `var(--cds-heading-03-font-size)` |

**Note on `DecisionModelCanvas` and `SideRailNavigation`:** These files use hex values as fallbacks in the `var(--cds-xxx, #hex)` pattern — these are acceptable per Phase 7B deferral. Do not change them.

**Expected Outcomes:**
- Zero bare hardcoded hex colors in `ObjectivesAndGoalsPage`, `ApplicationLayoutTemplate`, `Timeline`, `VersionList` CSS Modules
- Inline styles in `BranchesPage`, `TestAutomationPage`, `TaskModelPage`, `ResourceDetailsPage` moved to CSS Module classes
- All replaced values use Carbon CSS variable tokens
- No visual regression — status colors match their Carbon token equivalents

**Todo List:**
1. Edit `ObjectivesAndGoalsPage.module.css` — replace all hex colors with tokens; replace px font sizes with typography tokens
2. Edit `ApplicationLayoutTemplate.module.css` — replace hex colors with tokens
3. Edit `Timeline/TimelineItem.module.css` and `TimelineItemDetail.module.css` — replace hex colors
4. Edit `VersionList/VersionListItem.module.css` — replace `#0050e6`
5. Refactor `BranchesPage.tsx` — replace `getChangeTypeColor()` inline style pattern with CSS Module status classes (`.added`, `.modified`, `.removed`)
6. Refactor `TestAutomationPage.tsx` — extract inline layout styles to `TestAutomationPage.module.css`
7. Refactor `TaskModelPage.tsx` — extract inline layout styles to `TaskModelPage.module.css`
8. Refactor `ResourceDetailsPage.tsx` — extract inline typography styles to `ResourceDetailsPage.module.css`
9. `vite build` + visual smoke test after each file pair

**Relevant Context:**
- `src/app/components/pages/ObjectivesAndGoalsPage.module.css`
- `src/app/components/ApplicationLayoutTemplate/ApplicationLayoutTemplate.module.css`
- `src/app/components/Timeline/TimelineItem.module.css`
- `src/app/components/Timeline/TimelineItemDetail.module.css`
- `src/app/components/VersionList/VersionListItem.module.css`
- `src/app/components/pages/BranchesPage.tsx` + `.module.css`
- `src/app/components/pages/TestAutomationPage.tsx`
- `src/app/components/pages/TaskModelPage.tsx`
- `src/app/components/pages/ResourceDetailsPage.tsx`

---

## Sub-Task 7: Grid Plan — Steps 6.7 and 6.8

**Status:** `[ ] pending`

**Intent:**
Complete the two remaining open steps in `GRID_MIGRATION_PLAN.md`. Step 6.7 is a read-only verification pass (no code changes expected). Step 6.8 normalises the three competing page padding patterns across the app.

**Expected Outcomes:**
- GRID_MIGRATION_PLAN steps 6.7 and 6.8 verification checkboxes ticked
- Page padding is consistent across all layout contexts
- No layout shift or visual regression

**Todo List — Step 6.7 (Automation Shell Pages Verification):**
1. Open each of the 17 pages inside `ApplicationLayoutTemplate` in the browser
2. For each: verify content renders with 48px side rail offset, side rail expansion adjusts content, section panels work, scroll is correct
3. Tick each 6.7 sub-step checkbox in `GRID_MIGRATION_PLAN.md` as verified

**Todo List — Step 6.8 (Page Padding Standardization):**
1. Audit the three competing padding patterns:
   - `_shared.module.css` `.pageContent` — `spacing-05` all sides
   - `_shared.module.css` `.pageContentWithPadding` — `spacing-05` top/bottom, `spacing-07` left/right
   - `ApplicationLayoutTemplate` `.pageContent` — `spacing-05` top, `spacing-07` right, `0` bottom, `spacing-05` left
2. Decide on the canonical pattern for each layout context (L1 page vs. automation shell vs. inbox)
3. Update `_shared.module.css` and `ApplicationLayoutTemplate.module.css` to use consistent values
4. Verify no pages lose their padding after the change

**Relevant Context:**
- `src/app/ai/plans/GRID_MIGRATION_PLAN.md` — steps 6.7 and 6.8
- `src/app/components/pages/_shared.module.css`
- `src/app/components/ApplicationLayoutTemplate/ApplicationLayoutTemplate.module.css`

---

## Sub-Task 8: Documentation — `readme.agents.md` for Key Components

**Status:** `[ ] pending`

**Intent:**
`Guidelines.md` requires every custom component and hook to have a `readme.agents.md` (agent context file) alongside any `README.md`. Currently zero component folders have either. This sub-task adds `readme.agents.md` files to the highest-value components — the ones agents are most likely to work with or get wrong.

**Scope** (write `readme.agents.md` for these; write `README.md` only where a human-readable doc would add material value):

| Component | Priority | Why |
|-----------|----------|-----|
| `SidePanel/` | Critical | Most complex system in the codebase; wrong use causes z-index/layout bugs |
| `CarbonHeader/` | High | Shell component; important notes on Theme wrapper sibling requirement |
| `CarbonSideNav/` | High | Shell component; `isPersistent={false}` and overlay behaviour |
| `ApplicationLayoutTemplate/` | High | Hub component that wires 20+ sub-components |
| `CardLayout/` | Medium | Contains `CardLayoutTemplate` (Carbon Grid), `CardGrid` (container queries), `CardLayoutToolbar` |
| `InboxLayout/` | Medium | Already has `readme.agents.md` — update it to reflect Phase 8A changes |
| `Modal/` | Medium | `ModalAdapter` wrapping pattern; `DisplaySettingsContent` side-effects |
| `SideRailNavigation/` | Medium | Custom Carbon-compliant component; not a Carbon clone |

**Expected Outcomes:**
- Each listed folder has a `readme.agents.md` with: purpose, Carbon components used, known constraints, files it imports from, files that import it
- Existing `InboxLayout/readme.agents.md` updated for accuracy

**Todo List:**
1. Create `src/app/components/SidePanel/readme.agents.md` — document PanelManager, panel levels (global/page/section), patterns (overlay/influence/inset), z-index stack, and key constraint that `UniversalPanelWrapper` must be above `Outlet`
2. Create `src/app/components/CarbonHeader/readme.agents.md` — document Theme wrapper requirement, `isPersistent={false}`, sibling selector dependency
3. Create `src/app/components/CarbonSideNav/readme.agents.md` — document navigation items, `isPersistent` overlay mode, `onOverlayClick` pattern
4. Create `src/app/components/ApplicationLayoutTemplate/readme.agents.md` — document all imported components, sub-navigation (SideRailNavigation), panel renderer (AutomationShellPanelRenderer)
5. Create `src/app/components/CardLayout/readme.agents.md` — document Carbon Grid vs. container query grid decision
6. Update `src/app/components/InboxLayout/readme.agents.md` — confirm Phase 8A changes are reflected
7. Create `src/app/components/Modal/readme.agents.md` — document ModalAdapter pattern and the `window.__displaySettingsApply` anti-pattern (to be removed in Sub-Task 3)

**Relevant Context:**
- `Guidelines.md` — documentation requirements
- `src/app/components/InboxLayout/readme.agents.md` — existing example

---

## Sub-Task 9: Final Cleanup & CHANGELOG Update

**Status:** `[ ] pending`

**Intent:**
Close out all remaining open items in `CARBON_MIGRATION_PLAN.md` (10A, 10B). Update the CHANGELOG. Ensure the repo is in a clean, navigable state per `Guidelines.md`.

**Expected Outcomes:**
- `CARBON_MIGRATION_PLAN.md` phases 10A and 10B marked complete
- `CHANGELOG.md` has a new entry for this cleanup sprint
- `GRID_MIGRATION_PLAN.md` all steps marked complete
- No `lucide-react`, no dead deps, no dead files, no hardcoded tokens
- `vite build` passes clean with zero warnings

**Todo List:**
1. Mark `CARBON_MIGRATION_PLAN.md` Phase 10A complete with session note
2. Mark `CARBON_MIGRATION_PLAN.md` Phase 10B complete with session note
3. Mark all GRID_MIGRATION_PLAN steps 6.7 and 6.8 complete (after Sub-Task 7 done)
4. Prepend a new CHANGELOG entry to `CHANGELOG.md`:
   - `v2.50 — Repo cleanup sprint: lucide eliminated, dead deps removed, SVG imports deleted, CSS tokens compliant, documentation added`
5. Final `vite build` — zero errors, zero new warnings

**Relevant Context:**
- `src/app/CHANGELOG.md` — prepend new entry at top
- `src/app/ai/plans/CARBON_MIGRATION_PLAN.md` — phases 10A, 10B
- `src/app/ai/plans/GRID_MIGRATION_PLAN.md` — steps 6.7, 6.8

---

## Execution Order & Dependencies

```
Sub-Task 1  (tracker housekeeping)       — no dependencies, do first
     ↓
Sub-Task 2  (CardLayoutToolbar lucide)   — independent of Sub-Task 3
Sub-Task 3  (DisplaySettingsContent + SVG icon migration)
     ↓ (both 2 and 3 must be done first)
Sub-Task 4  (delete src/app/imports/)    — depends on Sub-Task 3 confirming SVG consumers migrated
Sub-Task 5  (remove dead deps)           — depends on Sub-Tasks 2+3 confirming lucide eliminated
     ↓
Sub-Task 6  (CSS token compliance)       — independent; can run in parallel with 4+5
Sub-Task 7  (grid plan 6.7 + 6.8)        — independent; can run any time after Sub-Task 1
Sub-Task 8  (documentation)              — independent; can run any time
     ↓
Sub-Task 9  (final cleanup + changelog)  — depends on all prior tasks
```

**Parallelisation note:** Sub-Tasks 6, 7, and 8 have no blocking dependencies on each other and can be done in any order or interleaved with Sub-Tasks 4 and 5.
