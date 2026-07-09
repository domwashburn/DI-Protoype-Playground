# Carbon Migration Plan v2.0

> **Last updated:** 2026-02-25
> **Status:** Phase 0 complete (partial), Phase 1 not started
> **Plan location:** `/ai/plans/CARBON_MIGRATION_PLAN.md`
> **Supersedes:** `/MIGRATION_EXECUTION_PLAN.md` (retained as reference)

---

## Guiding Principles

1. **Strangler fig pattern** — wrap, replace, delete. Zero regression at each step.
2. **Single-turn completable** — every sub-phase is scoped for one Sonnet 4.6 session (~15-20 file edits max).
3. **Error-free checkpoints** — the UI must compile and render correctly after every sub-phase.
4. **CSS Modules + Carbon tokens only** — no inline styles (except dynamic/interaction-driven), no hardcoded hex/px, no Tailwind for typography/spacing/color.
5. **Carbon Clone = replacement target** — any component labeled "Carbon Clone" gets replaced with a proper `@carbon/react` or `@carbon/ibm-products` import. Custom compositions get relabeled "Custom Carbon-compliant."

---

## Styling Rules (Apply to ALL Phases)

These are non-negotiable. Verify at every checkpoint.

| Rule | Description |
|------|-------------|
| CSS Modules | All component styling in `.module.css`. No inline `style={{}}` unless dynamic. |
| Carbon tokens | Every color/spacing/border/radius/shadow/typography via `var(--cds-*)`. No hex, no px for spacing. |
| No Tailwind for design | Tailwind OK for layout (`flex`, `grid`, `items-center`), display, position, icon sizing. NOT for typography, spacing, color. |
| No `!important` | Unless documented with removal plan. |
| `<div>` over `<p>` | The global `@layer base p { font-size: 14px }` rule poisons `<p>` elements. Use `<div>` for text content. |
| `react-router` not `react-router-dom` | All routing imports from `react-router`. |

---

## Phase Overview

| Phase | Name | Sub-phases | Depends On |
|-------|------|-----------|------------|
| 0 | Foundation & Cleanup | 0A, 0B | — |
| 1 | React Router Migration | 1A, 1B, 1C | Phase 0 |
| 2 | Icon Standardization | 2A, 2B | Phase 0 |
| 3 | Carbon Component Swaps | 3A, 3B, 3C, 3D | Phase 1 |
| 4 | Shell Components | 4A, 4B, 4C | Phases 1, 2 |
| 5 | Utility Components | 5A, 5B | Phase 1 |
| 6 | Panel System Compliance | 6A, 6B | Phases 2, 3 |
| 7 | Grid & Token Alignment | 7A, 7B | Phase 6 |
| 8 | InboxLayout Finalization | 8A | Phase 3 |
| 9 | Chat Interface (Optional) | 9A | Phase 2 |
| 10 | Final Cleanup & Docs | 10A, 10B | All above |

**Critical path:** 0 -> 1 -> 3 -> 4 -> 6 -> 7 -> 10

**Parallelizable:** Phase 2 can run alongside Phase 1. Phases 5, 8, 9 can run after their deps independently.

---

## Phase 0: Foundation & Cleanup

### Phase 0A: Superfluous Docs Cleanup

**Goal:** Remove accumulated process/debug/implementation log markdown files. Retain component READMEs and architecture docs.

**Files to DELETE (superfluous process docs):**

```
# /components/Carbon/ — process docs (component itself migrated later)
/components/Carbon/BUTTON_IMPLEMENTATION.md
/components/Carbon/Button.COMPOSITION.md
/components/Carbon/Button.README.md

# /components/CardLayout/
/components/CardLayout/NESTED_BUTTON_FIX.md

# /components/HomePage/
/components/HomePage/IMPLEMENTATION_SUMMARY.md

# /components/InsetPanel/ — keep README, delete the rest
/components/InsetPanel/ARCHITECTURE.md
/components/InsetPanel/COMPONENT_MAP.md
/components/InsetPanel/IMPLEMENTATION_SUMMARY.md
/components/InsetPanel/QUICK_START.md

# /components/SidePanel/ — keep README, delete all debug/fix logs
/components/SidePanel/IMPLEMENTATION_GUIDE.md
/components/SidePanel/PANEL_TRIGGER_BUG_FIX.md
/components/SidePanel/QUICK_START.md
/components/SidePanel/SECTION_PANELS_GUIDE.md
/components/SidePanel/SECTION_PANEL_DEBUG_LOG.md
/components/SidePanel/SECTION_PANEL_FIX.md
/components/SidePanel/SECTION_PANEL_FIXES_COMPLETE.md
/components/SidePanel/SECTION_PANEL_FIX_SUMMARY.md
/components/SidePanel/USAGE_EXAMPLES.md

# /components/Timeline/
/components/Timeline/COMPONENT_STRUCTURE.md
/components/Timeline/IMPLEMENTATION_SUMMARY.md

# /components/pages/
/components/pages/TaskModelPage_TAB_UPDATES.md

# /data/ — keep READMEs, delete process summaries
/data/ARCHITECTURE_OVERVIEW.md
/data/AUTOMATION_RELATIONSHIPS_GUIDE.md
/data/DATA_LAYER_SUMMARY.md
/data/INTEGRATION_GUIDE.md
/data/LINKED_OBJECTIVES_IMPLEMENTATION_SUMMARY.md
/data/OBJECTIVES_AND_CHATS_SUMMARY.md
/data/QUICK_REFERENCE.md

# /data/automations/ — keep README & /docs/, delete root-level process docs
/data/automations/ARCHITECTURE.md
/data/automations/ARCHITECTURE_REWORK_SUMMARY.md
/data/automations/BRANCHING_AND_VERSIONING.md
/data/automations/CLEANUP_SUMMARY.md
/data/automations/DEPLOYMENT_DATA_SYNC.md
/data/automations/FINAL_CLEANUP_VERIFICATION.md
/data/automations/MIGRATION_GUIDE.md
/data/automations/QUICK_REFERENCE.md

# /data/automations/registry/
/data/automations/registry/LOCAL_VARIABLES_GUIDE.md
/data/automations/registry/LOCAL_VARIABLES_UPDATE.md
/data/automations/registry/MIGRATION_COMPLETE.md
/data/automations/registry/PHASE_2_PROGRESS.md

# /data/hooks/
/data/hooks/PINNED_AUTOMATIONS_TRACKING.md
/data/hooks/RECENT_AUTOMATIONS_TRACKING.md

# /design-documentation/ — keep Panel-System.md (architecture), delete process notes
/design-documentation/Development-Process-Notes.md
/design-documentation/emergent_behaviors.md
```

**Files to KEEP:**

```
/Attributions.md                        — Legal
/MIGRATION_EXECUTION_PLAN.md            — Reference (superseded by this plan)
/guidelines/Guidelines.md               — Active guidelines
/components/*/README.md                 — All component READMEs
/data/*/README.md                       — All data layer READMEs
/data/automations/docs/**               — Organized documentation
/design-documentation/Panel-System.md   — Architecture reference
```

**Verification:** App compiles, no visual changes, no broken imports.

**Deliverable:** Create `/CHANGELOG.md` with initial entry.

---

### Phase 0B: Create Changelog & Agent Docs

**Goal:** Establish the changelog and `readme.agents.md` pattern per guidelines.

**Create:**

1. `/CHANGELOG.md` — reverse chronological, 1-sentence per version
2. `/components/InboxLayout/readme.agents.md` — agent context (used in which files, dependencies, etc.)

**Verification:** Files exist, content is accurate.

---

## Phase 1: React Router Migration

### Phase 1A: Create Route Infrastructure

**Goal:** Create the routing foundation files without changing App.tsx behavior yet.

**Create:**
1. `/types/navigation.ts` — Extract `NavigationRoute` type and `AppState` interface from App.tsx
2. `/hooks/useAppNavigation.ts` — Custom hook wrapping `useNavigate()` and `useParams()` with typed helpers
3. `/routes.ts` — Route configuration using `createBrowserRouter`
4. `/layouts/AppLayout.tsx` — Shell layout extracting GlobalHeader + NavigationPanel + UniversalPanelWrapper from App.tsx, renders `<Outlet />`
5. `/layouts/AppLayout.module.css` — Styling for AppLayout

**Key behaviors to preserve in AppLayout:**
- `PanelManagerProvider` wrapping
- `GlobalHeader` + toggle state
- `GlobalNavigationPanel` + open/close
- `UniversalPanelWrapper` panel rendering delegation
- `BreadcrumbActionBar` for automation-detail and resource-detail routes
- `GlobalPanelRenderer` as sibling
- Panel-top-offset CSS variable based on route
- Close global panels when navigation opens

**DO NOT touch App.tsx yet.** Just create the new files.

**Verification:** New files compile (no import errors). Existing App.tsx unchanged. UI works as before.

---

### Phase 1B: Wire App.tsx to RouterProvider

**Goal:** Replace App.tsx's manual routing with `RouterProvider`.

**Edit:**
1. `/App.tsx` — Simplify to:
   ```tsx
   import { RouterProvider } from 'react-router';
   import { router } from './routes';
   export default function App() {
     return <RouterProvider router={router} />;
   }
   ```

**This requires `/layouts/AppLayout.tsx` to fully replicate the current App.tsx behavior.**

**Verification:** All L1 navigation routes work. Browser back/forward works. URL reflects current page.

---

### Phase 1C: Update Page Components for Router

**Goal:** Remove prop-drilling of navigation callbacks. Pages use `useAppNavigation` hook.

**Files to edit (~8 files):**
1. `/components/pages/HomePage.tsx` — Replace `onNavigateToAutomation` prop with `useAppNavigation()`
2. `/components/pages/DecisionAutomationsPage.tsx` — Replace `onNavigateToAutomation` prop
3. `/components/pages/ObjectivesAndGoalsPage.tsx` — Replace `onNavigate` prop
4. `/components/pages/ResourceHubPage.tsx` — Replace `onNavigateToResource` prop
5. `/components/pages/ResourceDetailsPage.tsx` — Get `resourceId` from `useParams()`
6. `/components/pages/AutomationDetailPage.tsx` — Get `automationId` from `useParams()`, remove `NavigationRoute` import from App
7. `/components/ApplicationLayoutTemplate.tsx` — Get `automationId` from `useParams()`
8. `/components/NavigationPanel.tsx` — Import `NavigationRoute` from `/types/navigation.ts` instead of App

**Verification:** All pages navigate correctly. No prop-drilling warnings. URL params resolve. Panel system still functions.

---

## Phase 2: Icon Standardization

### Phase 2A: Replace lucide-react in Panel Components

**Goal:** Eliminate lucide-react from all SidePanel content components.

**Icon mapping:**

| lucide-react | @carbon/icons-react |
|-------------|-------------------|
| `X` | `Close` |
| `Box` | `Cube` |
| `PanelLeftOpen` | `SidePanelOpen` |
| `Book` | `Book` |
| `FileText` | `Document` |
| `MessageCircle` | `Chat` |
| `Video` | `Video` |
| `ExternalLink` | `Launch` |
| `Lightbulb` | `Idea` |

**Note:** Carbon icons use `size` prop (number) not className sizing:
```tsx
// Before: <X className="size-4" />
// After:  <Close size={16} />
```

**Files to edit (6 files):**
1. `/components/SidePanel/panels/DecisionAssistantPanel.tsx`
2. `/components/SidePanel/panels/HelpPanel.tsx`
3. `/components/SidePanel/panels/PlaceholderPanelA.tsx`
4. `/components/SidePanel/panels/PlaceholderPanelB.tsx`
5. `/components/SidePanel/panels/PlaceholderPanelC.tsx`
6. `/components/ChatInterface.tsx` — Replace `Send`, `Bot`, `User`

**Verification:** All icons render at correct sizes. Colors match (Carbon uses `fill="currentColor"`).

---

### Phase 2B: Replace lucide-react in Page Components

**Goal:** Eliminate remaining lucide-react from pages and header.

**Icon mapping:**

| lucide-react | @carbon/icons-react |
|-------------|-------------------|
| `Bot` | `ChatBot` |
| `ChevronRight` | `ChevronRight` |
| `Folder` | `Folder` |
| `FileText` | `Document` |
| `Search` | `Search` |
| `LayoutGrid` | `Grid` |
| `List` | `List` |
| `AlignJustify` | `Menu` |
| `Code` | `Code` |

**Files to edit (3 files):**
1. `/components/GlobalHeader.tsx` — Replace `Bot`
2. `/components/pages/AutomationDetailPage.tsx` — Replace `ChevronRight`
3. `/components/pages/TaskModelPage.tsx` — Replace 7 icons

**Verification:** All icons render correctly. Zero `lucide-react` imports remain in the project.

---

## Phase 3: Carbon Component Swaps

### Phase 3A: Replace Custom Button with @carbon/react Button

**Goal:** Swap the custom `Carbon/Button.tsx` clone for the real `@carbon/react` Button via barrel export.

**Strategy:** Update `/components/Carbon/index.ts` to re-export from `@carbon/react`. Then fix any prop incompatibilities in consumers.

**Known prop differences:**
- `renderIcon`: Custom accepts `ReactNode`, Carbon expects `ComponentType` — audit each consumer
- `isSelected`: Custom-only prop — check if used, implement via className if needed
- `theme`: Custom-only prop — wrap with `<Theme>` if used
- `iconAfter`: Custom-only prop — remove from all consumers (Carbon places `renderIcon` icons after text by default)

**⚠️ Known layout bugs — fix at every consumer during this phase:**

**Bug 1 — Custom SVG `renderIcon` components must forward `className`**
Carbon's `Button` renders `<RenderIcon className="cds--btn__icon" />`. Any custom SVG component
passed to `renderIcon` that doesn't accept/apply `className` will lose Carbon's icon positioning
rule (`margin-inline-start: 0.5rem; position: relative` for ghost buttons). Fix pattern:
```tsx
// Before (broken)
const MyIcon = () => <svg viewBox="0 0 16 16" style={{ width: 16, height: 16 }}>...</svg>;

// After (correct)
const MyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ width: 16, height: 16 }}>...</svg>
);
```
Affected custom icons in scope: `SettingsIcon` in `HomePageHeader.tsx`.
All `@carbon/icons-react` icons already handle this correctly.

**Bug 2 — `justify-content: space-between` icon gap on ghost text+icon buttons**
Carbon's `.cds--btn` base sets `justify-content: space-between` globally. On a ghost button
with a text label and trailing icon, this pushes text left and icon right, creating a visible
gap equal to the button's padding budget (~40px). This is correct for icon-only and
fixed-width buttons but wrong for inline ghost text+icon buttons.

Fix: add a targeted CSS override. Add to `/styles/globals.css` (Phase 7B is acceptable,
but can be done earlier as part of Phase 3A):
```css
/* Ghost text+icon buttons: collapse space-between gap */
.cds--btn--ghost:not(.cds--btn--icon-only) {
  justify-content: flex-start;
}
```
Or apply per-component via a CSS Module class if a global override is undesirable:
```css
/* ComponentName.module.css */
.ghostTextButton { justify-content: flex-start; }
```

**Files to edit:**
1. `/components/Carbon/index.ts` — Re-export Button + IconButton from `@carbon/react`
2. `/styles/globals.css` — Add `justify-content: flex-start` override (see Bug 2 above)
3. Audit & fix all 9 Button consumers (remove `iconAfter`, fix custom `renderIcon` icons):
   - `/components/PageHeader.tsx`
   - `/components/pages/DecisionAutomationsPage.tsx`
   - `/components/pages/HomePage.tsx`
   - `/components/SideRailNavigation/SideRailHeader.tsx`
   - `/components/SideRailNavigation/SideRailActionButton.tsx`
   - `/components/InboxLayout/InboxActionButton.tsx`
   - `/components/HomePage/HomePageHeader.tsx`
   - `/components/HomePage/PinnedDecisionAutomationSection.tsx`
   - `/components/HomePage/RecentDecisionAutomationsSection.tsx`

**Files to delete after verification:**
```
/components/Carbon/Button.tsx
/components/Carbon/Button.module.css
/components/Carbon/Button.examples.tsx
/components/Carbon/IconButton.tsx
/components/Carbon/IconButton.module.css
```

**Verification:** All 9 consumers render buttons correctly. Kinds, sizes, disabled state, onClick handlers, icons all work. Ghost text+icon buttons show icon inline with text (no space-between gap).

---

### Phase 3B: Replace Custom Modal with @carbon/react ComposedModal

**Goal:** Replace the custom Modal with Carbon's `ComposedModal` / `ModalHeader` / `ModalBody` / `ModalFooter`.

**Strategy:** Create a thin adapter at `/components/Modal/ModalAdapter.tsx` that maps the existing API to Carbon's.

**Prop mapping:**
```
isOpen            -> open
onClose           -> onRequestClose
title             -> (ModalHeader modalHeading)
primaryButtonText -> (ModalFooter primaryButtonText)
secondaryButtonText -> (ModalFooter secondaryButtonText)
onPrimaryClick    -> onRequestSubmit
children          -> (ModalBody children)
```

**Files to edit/create:**
1. Create `/components/Modal/ModalAdapter.tsx`
2. Edit `/components/Modal/index.ts` — export adapter as `Modal`
3. Verify 4 consumers (no changes needed if adapter maps correctly):
   - `/components/pages/BranchesPage.tsx`
   - `/components/pages/VersionsPage.tsx`
   - `/components/pages/DeployAutomationPage.tsx`
   - `/components/HomePage/HomePageHeader.tsx`

**Files to delete after verification:**
```
/components/Modal/Modal.tsx
/components/Modal/Modal.module.css
```

**Verification:** All 4 modals open/close correctly. Escape key, backdrop click, primary/secondary buttons all work.

---

### Phase 3C: Replace Custom OverflowMenu Components

**Goal:** Replace `Carbon/OverflowMenuButton`, `Carbon/OverflowMenuContent`, `Carbon/MenuItem`, `Carbon/MenuDivider`, and root-level `OverflowMenu.tsx` with `@carbon/react` equivalents.

**Carbon provides:** `OverflowMenu` + `OverflowMenuItem`

**Files to edit:**
1. `/components/Carbon/index.ts` — Re-export `OverflowMenu`, `OverflowMenuItem` from `@carbon/react`
2. `/components/CardLayout/Card.tsx` — Replace `OverflowMenuButton`/`MenuItem`/`MenuDivider` usage
3. `/components/LargeListItem.tsx` — Same replacement
4. `/components/InboxLayout/InboxActionButton.tsx` — Replace root `OverflowMenu` import

**Files to delete after verification:**
```
/components/Carbon/OverflowMenuButton.tsx
/components/Carbon/OverflowMenuContent.tsx
/components/Carbon/OverflowMenuContent.module.css
/components/Carbon/MenuItem.tsx
/components/Carbon/MenuItem.module.css
/components/Carbon/MenuDivider.tsx
/components/Carbon/MenuDivider.module.css
/components/OverflowMenu.tsx
/components/OverflowMenu.module.css
```

**Verification:** Card menus, LargeListItem menus, InboxActionButton dropdown all open/close, items are clickable, danger items styled.

---

### Phase 3D: Replace Custom Tearsheet with @carbon/ibm-products Tearsheet

**Goal:** Replace `Tearsheet.tsx` and `TearsheetNarrow.tsx` with `@carbon/ibm-products` Tearsheet.

**Single consumer:** `/components/InboxLayout/InboxActionButton.tsx`

**Strategy:** Create adapter or direct replacement.

**Files to edit:**
1. `/components/InboxLayout/InboxActionButton.tsx` — Update Tearsheet import/usage

**Files to delete after verification:**
```
/components/Tearsheet.tsx
/components/Tearsheet.module.css
/components/TearsheetNarrow.tsx
/components/TearsheetNarrow.module.css
```

**Verification:** Tearsheet slides up, close button works, action buttons work, escape closes it.

---

## Phase 4: Shell Components

### Phase 4A: Replace GlobalHeader with Carbon UI Shell Header

**Goal:** Replace custom `GlobalHeader.tsx` with `@carbon/react` Header components.

**Carbon components to use:**
- `Header`, `HeaderMenuButton`, `HeaderName`, `HeaderGlobalBar`, `HeaderGlobalAction`, `SkipToContent`

**Behaviors to preserve:**
- Navigation toggle (hamburger)
- "Give feedback" link
- Documents button
- Decision Assistant button (opens global influence panel)
- Help button (opens global overlay panel)
- User profile button with initials
- Active state on panel trigger buttons
- Close navigation when opening global panel

**Files to create:**
1. `/components/CarbonHeader/CarbonHeader.tsx`
2. `/components/CarbonHeader/CarbonHeader.module.css`
3. `/components/CarbonHeader/index.ts`

**Files to edit:**
1. `/layouts/AppLayout.tsx` (or `/App.tsx` if Phase 1 not done) — Replace `<GlobalHeader />` with `<CarbonHeader />`

**Files to delete after verification:**
```
/components/GlobalHeader.tsx
/components/GlobalHeader.module.css
```

**Verification:** Header at 48px, hamburger toggles nav, all utility buttons render and function, dark theme (g100).

---

### Phase 4B: Replace NavigationPanel with Carbon SideNav

**Goal:** Replace custom `NavigationPanel.tsx` with `@carbon/react` SideNav components.

**Carbon components:** `SideNav`, `SideNavItems`, `SideNavLink`, `SideNavDivider`

**Navigation items to preserve (7 items):**
1. Home
2. Decision assistant
3. Decision automations
4. Rules & policies
5. Dashboards
6. Objectives & goals
7. Resource hub

**Files to create:**
1. `/components/CarbonSideNav/CarbonSideNav.tsx`
2. `/components/CarbonSideNav/CarbonSideNav.module.css`
3. `/components/CarbonSideNav/index.ts`

**Files to edit:**
1. `/layouts/AppLayout.tsx` (or `/App.tsx`) — Replace `<GlobalNavigationPanel />` with `<CarbonSideNav />`

**Files to delete after verification:**
```
/components/NavigationPanel.tsx
/components/GlobalNavigationPanel.module.css
```

**Verification:** All 7 items render with correct icons, active state matches route, click navigates and closes panel.

---

### Phase 4C: Replace Breadcrumb with Carbon Breadcrumb

**Goal:** Use `@carbon/react` `Breadcrumb` + `BreadcrumbItem` in `BreadcrumbActionBar.tsx`. Also replace `FigmaActionButton` with Carbon `Button`.

**Files to edit:**
1. `/components/BreadcrumbActionBar.tsx` — Use Carbon Breadcrumb components

**Files to delete after verification:**
```
/components/FigmaActionButton.tsx
/components/FigmaActionButton.module.css
```

**Verification:** Breadcrumbs render hierarchy, separators display, clickable crumbs navigate, action buttons still work, branch switcher still works.

---

## Phase 5: Utility Components

### Phase 5A: Replace Custom Tooltip with Carbon Tooltip

**Goal:** Replace `SideRailNavigation/Tooltip.tsx` with `@carbon/react` Tooltip.

**Files to edit:**
1. `/components/SideRailNavigation/Tooltip.tsx` — Replace with Carbon Tooltip wrapper or direct usage
2. Update any consumers within SideRailNavigation

**Files to delete after verification:**
```
/components/SideRailNavigation/Tooltip.tsx
/components/SideRailNavigation/Tooltip.module.css
```

**Verification:** Tooltips appear on hover, position correctly (right of rail), disappear on mouse leave.

---

### Phase 5B: Replace TreeNavigation with Carbon TreeView

**Goal:** Replace custom `TreeNavigation` with `@carbon/react` `TreeView` + `TreeNode`.

**Single consumer:** `/components/pages/TaskModelPage.tsx`

**Files to edit:**
1. `/components/pages/TaskModelPage.tsx` — Replace import and usage

**Files to delete after verification:**
```
/components/TreeNavigation/TreeNavigation.tsx
/components/TreeNavigation/TreeNavigation.module.css
/components/TreeNavigation/TreeNavigationItem.tsx
/components/TreeNavigation/TreeNavigationItem.module.css
/components/TreeNavigation/index.ts
/components/TreeNavigation/README.md
```

**Verification:** Tree renders with hierarchy, nodes expand/collapse, active node highlighted, click handler fires.

---

## Phase 6: Panel System Token Compliance

### Phase 6A: Add Panel CSS Variables & Fix Renderers

**Goal:** The custom panel system stays (no Carbon equivalent — see MIGRATION_EXECUTION_PLAN.md Step 12 analysis). But all CSS must use Carbon tokens.

**Step 1 — Add variables to `/styles/globals.css`:**
```css
:root {
  --z-panel-section: 1;
  --z-panel-page: 100;
  --z-panel-page-backdrop: 99;
  --z-panel-automation-shell: 6000;
  --z-panel-global: 9000;
  --z-panel-global-backdrop: 8999;
  --z-modal: 10000;
  --header-height: 48px;
  --breadcrumb-height: 40px;
  --panel-width-narrow: 240px;
  --panel-width-standard: 320px;
  --panel-width-wide: 384px;
}
```

**Step 2 — Fix renderer CSS files:**

| File | Find | Replace |
|------|------|---------|
| `GlobalPanelRenderer.module.css` | `z-index: 9000` | `z-index: var(--z-panel-global)` |
| `GlobalPanelRenderer.module.css` | `top: 48px` | `top: var(--header-height)` |
| `AutomationShellPanelRenderer.module.css` | `z-index: 6000` | `z-index: var(--z-panel-automation-shell)` |
| `AutomationShellPanelRenderer.module.css` | `rgba(0, 0, 0, 0.5)` | `var(--cds-overlay)` |
| `InfluencedLayout.module.css` | `rgba(22, 22, 22, 0.32)` | `var(--cds-overlay)` |
| `InfluencedLayout.module.css` | `z-index: 101` / `100` | CSS variable equivalents |
| `SectionInfluencedLayout.module.css` | `rgba(22, 22, 22, 0.32)` | `var(--cds-overlay)` |
| `GridLayout.module.css` | `rgba(22, 22, 22, 0.32)` | `var(--cds-overlay)` |

**Files to edit (~7 CSS files):**
1. `/styles/globals.css` — Add panel variables
2. `/components/SidePanel/GlobalPanelRenderer.module.css`
3. `/components/SidePanel/AutomationShellPanelRenderer.module.css`
4. `/components/SidePanel/InfluencedLayout.module.css`
5. `/components/SidePanel/SectionInfluencedLayout.module.css`
6. `/components/SidePanel/GridLayout.module.css`
7. `/components/SidePanel/SectionPanelRenderer.module.css`

**Verification:** All panel tiers still open/close with smooth animation. Z-index layering correct. Overlays render properly.

---

### Phase 6B: Panel Content Components Token Audit

**Goal:** Audit all panel content component CSS for Carbon token compliance.

**Files to audit & fix:**
1. `/components/SidePanel/panels/HelpPanel.module.css`
2. `/components/SidePanel/panels/SettingsPanel.module.css`
3. `/components/SidePanel/panels/AssetDetailsPanel.module.css`
4. `/components/SidePanel/panels/ServiceDetailsPanel.module.css`
5. `/components/SidePanel/panels/DecisionAssistantPanel.module.css`
6. `/components/SidePanel/panels/PlaceholderPanelA.module.css`
7. `/components/SidePanel/panels/PlaceholderPanelB.module.css`
8. `/components/SidePanel/panels/PlaceholderPanelC.module.css`
9. `/components/SidePanel/panels/ResourceDetailsPanel.module.css`
10. `/components/SidePanel/PanelTriggerButton.module.css`
11. `/components/SidePanel/SampleSidePanel.module.css`

**Check each for:**
- All spacing uses `var(--cds-spacing-*)` tokens
- All text colors use `var(--cds-text-*)` tokens
- All backgrounds use `var(--cds-layer)`, `var(--cds-background)`, or `var(--cds-header-*)` tokens
- All borders use `var(--cds-border-subtle)`
- No inline styles in corresponding `.tsx` files

**Verification:** All panels render correctly with no visual regressions.

---

## Phase 7: Grid & Token Alignment

### Phase 7A: Replace Custom Grid CSS with Carbon Grid Components

**Goal:** Remove the ~250-line custom grid system from `globals.css` and use `@carbon/react` `Grid` + `Column`.

**Files to audit for custom grid class usage:**
- Search for `cds--grid`, `cds--col-`, `cds--subgrid`, `card-grid` across all `.tsx` and `.module.css` files
- Replace each usage with Carbon `<Grid>` / `<Column>` components or proper Carbon classes

**Files to edit:**
1. `/styles/globals.css` — Remove "IBM Carbon 16-Column Grid System" section
2. All page/component files using custom grid classes (identify via search)

**Verification:** Home page card grids, decision automations grid, all page layouts maintain correct proportions at all breakpoints.

---

### Phase 7B: Align Token System

**Goal:** Remove manually-defined `--cds-*` variables from `globals.css` that duplicate what `@carbon/styles/css/styles.css` already provides.

**Files to edit:**
1. `/styles/globals.css` — Remove manual token definitions (lines ~6-98), keep app-specific extensions

**Verification:** All colors, spacing, typography match before/after. No visual regressions.

---

## Phase 8: InboxLayout Finalization

### Phase 8A: Reclassify & Replace InboxLayout Carbon Clones

**Goal:** Relabel custom compositions as "Custom Carbon-compliant" and replace true clones with `@carbon/react` imports.

**Reclassification:**

| Component | Action |
|-----------|--------|
| `InboxPanelToolbar` | **Replace** search input with `<Search>` from `@carbon/react`, filter with `<IconButton>` |
| `InboxActionButton` | **Replace** combo pattern with `<ComboButton>` from `@carbon/react` (if available), else keep and relabel |
| `InboxLayoutTemplate` | **Relabel** to "Custom Carbon-compliant" |
| `InboxPanelHeader` | **Relabel** to "Custom Carbon-compliant" |
| `InboxPanelList` | **Relabel** to "Custom Carbon-compliant" |
| `icons.tsx` | **Already done** — uses `@carbon/icons-react` |

**Files to edit:**
1. `/components/InboxLayout/InboxPanelToolbar.tsx` — Use Carbon Search component
2. `/components/InboxLayout/InboxPanelToolbar.module.css` — Update for Carbon Search styling
3. `/components/InboxLayout/InboxActionButton.tsx` — Evaluate ComboButton replacement
4. `/components/InboxLayout/InboxLayoutTemplate.tsx` — Update JSDoc label
5. `/components/InboxLayout/InboxPanelHeader.tsx` — Update JSDoc label
6. `/components/InboxLayout/InboxPanelList.tsx` — Update JSDoc label
7. `/components/InboxLayout/README.md` — Update classification language
8. `/components/InboxLayout/index.ts` — Update barrel export comments

**Create:**
- `/components/InboxLayout/readme.agents.md` (if not done in Phase 0B)

**Verification:** InboxLayout renders identically. Search works. Filter button works. Combo button dropdown works.

---

## Phase 9: Chat Interface (Optional/Deferred)

### Phase 9A: Evaluate @carbon/chat or @carbon/ai-chat

**Goal:** Assess whether `@carbon/chat` package can replace custom ChatInterface/ChatSidebar.

**If available and compatible:**
- Replace `/components/ChatInterface.tsx`
- Replace `/components/ChatSidebar.tsx`
- Replace `/components/ChatLayoutTemplate.tsx`

**If not compatible, keep custom with:**
- Carbon token compliance audit on CSS
- All icons already replaced in Phase 2

**This phase is lowest priority and can be deferred indefinitely.**

---

## Phase 10: Final Cleanup & Documentation

### Phase 10A: Final File Cleanup & Carbon/index.ts

**Goal:** Delete all replaced files, finalize barrel export, remove dead imports.

**Final state of `/components/Carbon/index.ts`:**
```tsx
// Carbon Design System v11 Components
// Re-exported from @carbon/react for consistent import patterns
export { Button, IconButton, OverflowMenu, OverflowMenuItem } from '@carbon/react';
```

**Audit:**
- [ ] Zero imports from deleted files
- [ ] Zero `lucide-react` imports
- [ ] All `@carbon/react` components render correctly
- [ ] All `@carbon/ibm-products` components render correctly
- [ ] No `!important` overrides without documentation
- [ ] No hardcoded colors/spacing in any `.module.css`
- [ ] No inline styles in any `.tsx` (except dynamic)

**Verification:** Full app smoke test — all routes, all panels, all interactions.

---

### Phase 10B: Documentation & Changelog

**Goal:** Finalize all documentation per guidelines.

**Update:**
1. `/CHANGELOG.md` — Add entries for all completed phases
2. Component `readme.agents.md` files for any new components created during migration
3. `/components/CarbonHeader/readme.agents.md`
4. `/components/CarbonSideNav/readme.agents.md`

**Archive:**
- `/MIGRATION_EXECUTION_PLAN.md` — Move to `/ai/archive/` or add "SUPERSEDED" header

**Verification:** All documentation is accurate and current.

---

## Execution Tracker

| Sub-phase | Status | Session | Notes |
|-----------|--------|---------|-------|
| 0A | ✅ Complete | v2.1 | |
| 0B | ✅ Complete | v2.2 | |
| 1A | ✅ Complete | v2.3 | |
| 1B | ✅ Complete | v2.5 | |
| 1C | ✅ Complete | v2.7 | |
| 2A | ✅ Complete | v2.4 | |
| 2B | ✅ Complete | v2.6 | |
| 3A | ✅ Complete | v2.20 | |
| 3B | ✅ Complete | v2.8 | |
| 3C | ✅ Complete | v2.10 | |
| 3D | ✅ Complete | v2.21 | |
| 4A | ✅ Complete | v2.24 | CarbonHeader created; GlobalHeader deleted |
| 4B | ✅ Complete | v2.24 | CarbonSideNav created; NavigationPanel deleted |
| 4C | ✅ Complete | v2.34 | BreadcrumbActionBar → @carbon/react Breadcrumb + BreadcrumbItem |
| 5A | ✅ Complete | v2.x | Carbon Tooltip already in use across all SideRail components; no custom Tooltip.tsx ever existed |
| 5B | ✅ Complete | v2.24 | Carbon TreeView in TaskModelPage; TreeNavigation deleted |
| 6A | ✅ Complete | v2.24 | Panel z-index/dim tokens in globals.css; all panel CSS updated |
| 6B | ✅ Complete | v2.35–2.38 | Panel content token audit; final actionButton clone removed v2.38 |
| 7A | ✅ Complete | v2.40 | Custom grid CSS removed from globals.css; CardGrid/ResourceSection/CardLayoutTemplate/ResourceDetailsPage migrated to CSS Modules + Carbon Grid |
| 7B | ⏸ Deferred | — | Spacing tokens retained as fallbacks; CDN load-order makes removal risky |
| 8A | ✅ Complete | v2.37 | InboxPanelToolbar → Carbon Search + Button; all 5 components relabeled Custom Carbon-compliant |
| 9A | Not started | — | Deferred |
| 10A | ✅ Complete | v2.50 | Dead imports dir deleted, lucide eliminated, SVG path files removed, dead deps pruned |
| 10B | ✅ Complete | v2.50 | CHANGELOG updated, plan docs updated, readme.agents.md files created for 7 components |

**Total: 24 sub-phases across 10 phases**
**Estimated: ~18-20 sessions** (some sub-phases can be combined if simple)