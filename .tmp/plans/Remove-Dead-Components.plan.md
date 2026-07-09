---
Plan-name: Remove Dead Components
Prototype(s): prototypes/DI_nav-ia-prototype_Figma-Make
Date-created: 2025-07-09
Origin-Chat-ID: current
Chat-session-IDs: []
Implementation status: complete
Next-step: Optional follow-up — dependency audit for now-unused packages (class-variance-authority, clsx, tailwind-merge, @radix-ui/*)
---

# Remove Dead Components

## Overview

The prototype has fully migrated from the original Figma Make scaffolding (shadcn/ui, `components/ui/`, wrapper re-exports) to Carbon Design System (`@carbon/react`). The dead code falls into three categories:

1. **Isolated unused components** — built but never wired up
2. **Superseded page files** — replaced by newer equivalents but not deleted
3. **Entire abandoned library** — the original shadcn/ui `components/ui/` directory and its supporting infrastructure (`components/Carbon/` re-export wrapper, `components/figma/ImageWithFallback`)

All removals are safe deletes. No active code needs to change.

---

## Dead Code Confirmed

### Category A — Isolated Unused Components

| Component | Location | Evidence of Disuse |
|---|---|---|
| `TaskModelSubAssetsTable` | `components/TaskModelSubAssetsTable/` | Zero imports across entire `src/` |
| `Match360Navigation` | `components/Match360Navigation/` | Zero imports; only a stale CSS comment references it |

### Category B — Superseded Page Files

| Component | Location | Evidence of Disuse |
|---|---|---|
| `DecisionAssistantPage` | `components/pages/DecisionAssistantPage.tsx` | Superseded by `ChatLayoutTemplate` (both render `<CarbonDecisionAssistant mode="full" />`); `routes.tsx` correctly uses `ChatLayoutTemplate`; this file was never wired up post-migration |
| `SidePanelDemoPage` | `components/pages/SidePanelDemoPage.tsx` | Dev scratch page never added to routes; zero inbound imports |

### Category C — Abandoned Figma Make Scaffolding (shadcn/ui)

| Directory / File | Evidence of Disuse |
|---|---|
| `components/ui/` (46 files) | Entire shadcn/ui component library from original Figma Make export; zero imports by any active app code; active app uses `@carbon/react` exclusively (77 direct imports vs 0 for `components/ui/`) |
| `components/Carbon/index.ts` | Dead re-export wrapper — re-exports `Button`, `ButtonProps`, `OverflowMenu`, `OverflowMenuItem`, `Breadcrumb`, `BreadcrumbItem` from `@carbon/react`; all active code already imports from `@carbon/react` directly |
| `components/figma/ImageWithFallback.tsx` | Zero imports anywhere in codebase |

**Confirmed Active (do not touch):**
- `SideRailNavigation` — used by `ChatSidebar`, `CarbonDecisionAssistant`, `DecisionAutomationSideNav`
- `InboxLayout` — used by `ApplicationLayoutTemplate`, `ObjectivesAndGoalsPage`, `BranchesPage`

---

## Sub-Tasks

---

### Sub-Task 1 — Delete `TaskModelSubAssetsTable`

**Intent:** Remove the `TaskModelSubAssetsTable` component and its barrel export. The component was never imported anywhere and has no consumers.

**Expected Outcomes:**
- Directory `components/TaskModelSubAssetsTable/` is deleted
- No other file references this component, so no secondary edits are needed
- Project builds and runs without errors

**Todo List:**
1. Delete all files in `components/TaskModelSubAssetsTable/`
2. Remove the directory
3. Grep for `TaskModelSubAssetsTable` — confirm zero remaining references

**Relevant Context:**
- `prototypes/DI_nav-ia-prototype_Figma-Make/src/app/components/TaskModelSubAssetsTable/TaskModelSubAssetsTable.tsx`
- `prototypes/DI_nav-ia-prototype_Figma-Make/src/app/components/TaskModelSubAssetsTable/index.ts`

**Status:** [x] done

---

### Sub-Task 2 — Delete `Match360Navigation` + stale CSS comment

**Intent:** Remove the `Match360Navigation` component directory and clean up the one stale CSS comment that references it in `ApplicationLayoutTemplate.module.css`.

**Expected Outcomes:**
- Directory `components/Match360Navigation/` is deleted
- Stale comment removed from `ApplicationLayoutTemplate.module.css` line 24
- `SideRailNavigation` is unaffected (3 other active consumers)
- Project builds and runs without errors

**Todo List:**
1. Delete all files in `components/Match360Navigation/`
2. Remove the directory
3. Remove the comment `/* Navigation is now handled by Match360Navigation component */` from `components/ApplicationLayoutTemplate/ApplicationLayoutTemplate.module.css` line 24
4. Grep for `Match360Navigation` — confirm zero remaining references

**Relevant Context:**
- `prototypes/DI_nav-ia-prototype_Figma-Make/src/app/components/Match360Navigation/`
- Stale comment: `prototypes/DI_nav-ia-prototype_Figma-Make/src/app/components/ApplicationLayoutTemplate/ApplicationLayoutTemplate.module.css` line 24
- `SideRailNavigation` (imported by `Match360Navigation`) is kept — live consumers elsewhere

**Status:** [x] done

---

### Sub-Task 3 — Delete `DecisionAssistantPage`

**Intent:** Remove the superseded `DecisionAssistantPage`. The migration replaced it with `ChatLayoutTemplate`, which adds `navigationBehavior` prop support and uses the correct layout CSS class. `routes.tsx` already uses `ChatLayoutTemplate` correctly. This file was never wired up post-migration.

**Expected Outcomes:**
- `components/pages/DecisionAssistantPage.tsx` is deleted
- `components/pages/DecisionAssistantPage.module.css` is deleted
- `routes.tsx` is unaffected (it never imported this file)
- Project builds and runs without errors

**Todo List:**
1. Delete `components/pages/DecisionAssistantPage.tsx`
2. Delete `components/pages/DecisionAssistantPage.module.css`
3. Grep for `DecisionAssistantPage` in `*.tsx` and `*.ts` files — confirm zero remaining references (markdown doc references are acceptable to leave)

**Relevant Context:**
- `prototypes/DI_nav-ia-prototype_Figma-Make/src/app/components/pages/DecisionAssistantPage.tsx`
- `prototypes/DI_nav-ia-prototype_Figma-Make/src/app/components/pages/DecisionAssistantPage.module.css`
- `MIGRATION_EXECUTION_PLAN.md` lines 289 and 304 mention this as a planned pattern — those doc references do NOT need updating (historical context)
- Active replacement: `components/ChatLayoutTemplate/ChatLayoutTemplate.tsx`

**Status:** [x] done

---

### Sub-Task 4 — Delete `SidePanelDemoPage`

**Intent:** Remove the `SidePanelDemoPage` development scratch page. It was never added to `routes.tsx` and has zero inbound imports.

**Expected Outcomes:**
- `components/pages/SidePanelDemoPage.tsx` is deleted
- `components/pages/SidePanelDemoPage.module.css` is deleted
- No other file is affected
- Project builds and runs without errors

**Todo List:**
1. Delete `components/pages/SidePanelDemoPage.tsx`
2. Delete `components/pages/SidePanelDemoPage.module.css`
3. Grep for `SidePanelDemoPage` — confirm zero remaining references

**Relevant Context:**
- `prototypes/DI_nav-ia-prototype_Figma-Make/src/app/components/pages/SidePanelDemoPage.tsx`
- `prototypes/DI_nav-ia-prototype_Figma-Make/src/app/components/pages/SidePanelDemoPage.module.css`

**Status:** [x] done

---

### Sub-Task 5 — Delete `components/Carbon/index.ts`

**Intent:** Remove the dead re-export wrapper that proxies `Button`, `OverflowMenu`, `Breadcrumb`, etc. from `@carbon/react`. All active code already imports from `@carbon/react` directly — this file was a migration stepping-stone that was never consumed.

**Expected Outcomes:**
- `components/Carbon/index.ts` is deleted
- If `components/Carbon/` becomes empty, the directory is removed too
- No other file is affected (zero inbound imports confirmed)
- Project builds and runs without errors

**Todo List:**
1. Delete `components/Carbon/index.ts`
2. Check if the `components/Carbon/` directory is now empty — if so, remove it
3. Grep for `from '../Carbon'` and `from './Carbon'` — confirm zero remaining references

**Relevant Context:**
- `prototypes/DI_nav-ia-prototype_Figma-Make/src/app/components/Carbon/index.ts`
- Exports: `Button`, `ButtonProps`, `OverflowMenu`, `OverflowMenuItem`, `Breadcrumb`, `BreadcrumbItem` (all re-exported from `@carbon/react`)

**Status:** [x] done

---

### Sub-Task 6 — Delete `components/figma/ImageWithFallback.tsx`

**Intent:** Remove the `ImageWithFallback` component from the Figma integration layer. It has zero imports anywhere in the project.

**Expected Outcomes:**
- `components/figma/ImageWithFallback.tsx` is deleted
- If `components/figma/` becomes empty or contains only other unused files, note for follow-up
- Project builds and runs without errors

**Todo List:**
1. Delete `components/figma/ImageWithFallback.tsx`
2. List remaining contents of `components/figma/` — if empty, remove the directory
3. Grep for `ImageWithFallback` — confirm zero remaining references

**Relevant Context:**
- `prototypes/DI_nav-ia-prototype_Figma-Make/src/app/components/figma/ImageWithFallback.tsx`
- Only file in `components/figma/` — if deleted, the directory will be empty

**Status:** [x] done

---

### Sub-Task 7 — Delete `components/ui/` (entire shadcn/ui library)

**Intent:** Remove the entire `components/ui/` directory — 46 files of shadcn/ui scaffolding from the original Figma Make export. The active app uses `@carbon/react` exclusively (77 direct imports vs 0 for `components/ui/`). This is the largest single cleanup in the plan.

**Expected Outcomes:**
- All 46 files in `components/ui/` are deleted
- The `components/ui/` directory is removed
- No active app code is affected (zero inbound imports confirmed from outside the directory)
- `package.json` dependencies that are only used by `components/ui/` may become unused — note these for a follow-up dependency audit (do NOT remove deps in this sub-task)
- Project builds and runs without errors

**Todo List:**
1. Delete the entire `components/ui/` directory and all 46 files within it
2. Grep for `from '../ui/` and `from './ui/` and `from 'components/ui/` across `src/` — confirm zero remaining references from outside the directory
3. Note: `utils.ts` (`cn()`) and `use-mobile.ts` (`useIsMobile()`) were only used internally within `components/ui/` — they go with the directory
4. After deletion, run `npm run build` (or equivalent) to confirm clean build

**Relevant Context:**
- `prototypes/DI_nav-ia-prototype_Figma-Make/src/app/components/ui/` (46 files)
- All files are shadcn/ui wrappers over Radix UI primitives — none consumed by active app
- The `utils.ts` `cn()` helper and `use-mobile.ts` `useIsMobile()` hook are internal-only utilities used within the `ui/` components themselves
- Dependencies likely used only by `components/ui/`: `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/*` packages — follow-up dependency audit recommended after this sub-task

**Status:** [x] done
