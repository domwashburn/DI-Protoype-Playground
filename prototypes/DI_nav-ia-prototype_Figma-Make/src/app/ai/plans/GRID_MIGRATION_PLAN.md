# Grid Migration Plan — Phase 6: Page/Section/Layout Grid Compliance

**Goal:** Migrate all page and layout grid patterns to Carbon-compliant implementations with zero regression across ALL views.

**Strategy:** Incremental, view-by-view migration using the strangler fig pattern. Each step is independently verifiable. We do NOT force Carbon `<Grid>` / `<Column>` where custom CSS Grid (container queries, subgrid) is the correct tool — Carbon's Grid is a structural helper, not a replacement for responsive layout intelligence.

---

## Current State Inventory

### Grid Pattern Categories

| Pattern | Where Used | Carbon Equivalent | Migration Decision |
|---------|-----------|-------------------|-------------------|
| **Carbon `<Grid>` + `<Column>`** | `CardLayoutTemplate` | Already Carbon | **KEEP** |
| **CSS Grid + container queries** | `CardGrid`, `ResourceDetailsPage` | No equivalent — Carbon Grid has no container query support | **KEEP** (superior to Carbon Grid for panel-aware responsive) |
| **CSS Grid + subgrid** | `ResourceSection` in `ResourceHubPage` | No equivalent — Carbon Grid has no subgrid | **KEEP** (with `grid-column: 1 / -1` directly) |
| **CSS Grid + media queries** | `HomePageSection` (4→8→16 cols), `HomePage.exploreGrid` (1→2→3→4 cols) | Carbon `<Grid>` (16-col responsive) | **MIGRATE** HomePageSection to Carbon Grid; keep exploreGrid as container query |
| **Raw 16-col CSS grid** | `ResourceHubPage.sectionsContainer` | Carbon `<Grid>` | **EVALUATE** — may benefit from Carbon Grid or stay CSS Module |
| **Flexbox layouts** | `AppLayout`, `ApplicationLayoutTemplate`, `InboxLayoutTemplate`, `SectionInfluencedLayout`, `InfluencedLayout`, `GridLayout`, most pages | Flexbox is correct for these patterns | **KEEP** |
| **Page padding/spacing** | Various page `.pageContainer` / `.pageContent` | Carbon Grid gutter | **STANDARDIZE** via shared CSS tokens |

### View Audit (27 page components + 8 layout components)

#### Group A: L1 Pages (rendered inside AppLayout > UniversalPanelWrapper > Outlet)

| Page | Current Grid | Panel Support | Migration Notes |
|------|-------------|---------------|-----------------|
| `HomePage` | `HomePageSection` (CSS Grid 4→8→16), `exploreGrid` (media queries 1→2→3→4), `CardGrid` (container queries) | None (no SectionInfluencedLayout) | Step 6.1 — Migrate `HomePageSection` to Carbon Grid |
| `DecisionAutomationsPage` | `CardLayoutTemplate` (Carbon Grid ✅) | `SectionInfluencedLayout` ✅ | Step 6.2 — Verify only |
| `ResourceHubPage` | `.sectionsContainer` (CSS Grid 16-col), `ResourceSection` (subgrid) | `SectionInfluencedLayout` ✅ | Step 6.3 — Evaluate Carbon Grid wrapper |
| `ResourceDetailsPage` | Container query grid (`.tileGridContext` + `.tileGrid`) | `SectionInfluencedLayout` ✅ | Step 6.4 — Verify only |
| `DashboardsPage` | Simple flex layout | `SectionInfluencedLayout` ✅ | Step 6.5 — Verify only |
| `RulesAndPoliciesPage` | Simple flex layout | `SectionInfluencedLayout` ✅ | Step 6.5 — Verify only |
| `ObjectivesAndGoalsPage` | `InboxLayoutTemplate` (320px sidebar + flex content) | Via InboxLayout | Step 6.6 — Verify only |
| `DecisionAssistantPage` | `ChatLayoutTemplate` (custom layout) | Own layout | Step 6.6 — Verify only |

#### Group B: Automation Shell Pages (inside ApplicationLayoutTemplate > mainContent)

| Page | Current Grid | Panel Support | Migration Notes |
|------|-------------|---------------|-----------------|
| `AutomationOverviewPage` | Flex + `CardGrid` (container queries) | `SectionInfluencedLayout` ✅ | Step 6.7 — Verify |
| `BranchesPage` | Table layout | `SectionInfluencedLayout` ✅ | Step 6.7 — Verify |
| `HistoryPage` | Timeline + Table | Via parent | Step 6.7 — Verify |
| `UpdatesPage` | List layout | Via parent | Step 6.7 — Verify |
| `TestAutomationPage` | Table layout | Via parent | Step 6.7 — Verify |
| `DeployAutomationPage` | Card + table layout | Via parent | Step 6.7 — Verify |
| `MonitorAutomationPage` | Charts + tables | Via parent | Step 6.7 — Verify |
| `VersionsPage` | Table layout | Via parent | Step 6.7 — Verify |
| `AutomationSettingsPage` | Form layout | Via parent | Step 6.7 — Verify |
| `DecisionModelPage` | Custom canvas | Via parent | Step 6.7 — Verify |
| `TaskModelPage` | TreeView + content | Via parent | Step 6.7 — Verify |
| `PredictiveModelPage` | Content layout | Via parent | Step 6.7 — Verify |
| `OptimizationModelPage` | Content layout | Via parent | Step 6.7 — Verify |
| `GenAINodePage` | Content layout | Via parent | Step 6.7 — Verify |
| `DecisionOutcomesPage` | Content layout | Via parent | Step 6.7 — Verify |
| Services view (InboxLayout) | `InboxLayoutTemplate` | Via parent | Step 6.7 — Verify |
| Objectives view (InboxLayout) | `InboxLayoutTemplate` | Via parent | Step 6.7 — Verify |

#### Group C: Cross-cutting Layout Components

| Component | Role | Migration Notes |
|-----------|------|-----------------|
| `AppLayout` | App shell (flex column) | Step 6.0 — Audit, no Grid needed |
| `UniversalPanelWrapper` | Panel context + layout switching | Step 6.0 — Audit, no Grid needed |
| `GridLayout` | Overlay panel container | Step 6.0 — No Grid (it's a panel layout, not page grid) |
| `InfluencedLayout` | Push panel container | Step 6.0 — No Grid |
| `SectionInfluencedLayout` | Section overlay panel | Step 6.0 — No Grid |
| `PageHeaderWrapper` / `PageHeader` | Sticky page header | Step 6.0 — Audit header padding consistency |
| `BreadcrumbActionBar` | Breadcrumb + actions bar | Step 6.0 — Already Carbon Breadcrumb ✅ |
| `CardLayoutTemplate` | Carbon Grid + CardGrid | Already Carbon Grid ✅ |
| `InboxLayoutTemplate` | 320px sidebar + content | Step 6.0 — Flex, correct as-is |
| `ApplicationLayoutTemplate` | Automation shell | Step 6.0 — Flex, correct as-is |

---

## Migration Steps

### Step 6.0: Layout Shell Audit (No Code Changes)

**Purpose:** Verify the flex chain from viewport to page content is correct and consistent across all routes. This is a read-only audit that documents the current state and identifies any inconsistencies.

**Flex chain (expected):**
```
viewport (100vh)
  └─ AppLayout.appContainer (flex col, 100vh)
       └─ AppLayout.userInterface (flex col, flex:1)
            └─ AppLayout.appContent (flex col, flex:1, padding-top:48px, overflow:hidden)
                 └─ UniversalPanelWrapper → GridLayout/InfluencedLayout
                      └─ gridLayoutOverlay / outerContainer (flex col, flex:1)
                           └─ contentArea / panelContainer (flex col, flex:1)
                                └─ [BreadcrumbActionBar] (flex-shrink:0)
                                └─ pageContentWrapper (flex col, flex:1)
                                     └─ <Outlet /> → Page Component
```

**Audit checklist:**
- [x] Every container in the chain has `flex: 1; min-height: 0` — VERIFIED
- [x] Scroll boundaries are at the page level (not app shell) — VERIFIED (appContainer/userInterface/appContent all `overflow: hidden`)
- [x] `overflow: hidden` on `appContent` prevents double scrollbars — VERIFIED
- [x] Panel overlays don't affect page content height — VERIFIED (GridLayout: `position: fixed`; InfluencedLayout: `position: absolute`/`fixed`; SectionInfluencedLayout: `position: absolute`)
- [x] Header (48px) + breadcrumb (40px) heights are correctly accounted for — VERIFIED (`--panel-top-offset: 88px`/`48px`, `padding-top: var(--header-height, 48px)`)

**Deliverable:** ~~Confirmation that the shell is correct, OR a list of fixes needed before touching page grids.~~

**Result: PASS — shell is correct. No fixes needed. Proceeding to Step 6.1.**

Minor observation (non-blocking): `.pageContentWrapper` and GridLayout `.contentArea` lack `min-width: 0`, but both are in flex-column contexts where `min-width` is not a factor.

---

### Step 6.1: HomePage Grid Standardization

**Scope:** `HomePageSection`, `HomePageSectionTitle`, `HomePageSectionContent`, `HomePage`

**Current state:**
- `HomePageSection` uses a custom CSS Grid (4→8→16 columns via media queries)
- `HomePageSectionContent` uses `grid-column: 5/17` at lg for 12-column span
- `HomePageSectionTitle` uses `grid-column: 1/5` at lg for 4-column span
- `HomePage.exploreGrid` uses media-query grid (1→2→3→4 cols) — not panel-aware
- `RecentDecisionAutomationsSection.decisionProjectsList` uses media-query grid (1→2→3→4 cols) — not panel-aware
- `CardGrid` uses container queries (KEEP as-is)

**Decision: KEEP HomePageSection as CSS Grid (revised from original plan)**

Carbon Grid's `<Grid>` component uses column-level padding to create gutters (16px per side = 32px between adjacent columns). HomePageSection uses `gap: var(--cds-spacing-05)` (16px between columns). Switching to Carbon Grid would either:
- Double the gutter width (32px vs 16px) — visual regression
- Require overriding all of Carbon Grid's padding — negates the benefit of using the component

The CSS Grid already uses Carbon breakpoints (672, 1056, 1584px), Carbon column counts (4→8→16), and Carbon spacing tokens. It IS Carbon-compliant in behavior; it just doesn't use the React component because the React component's gutter model doesn't fit.

**Revised plan:**
1. ~~Replace HomePageSection with Carbon `<Grid>`~~ → **KEEP** as CSS Grid (Carbon-compliant tokens/breakpoints already in use)
2. ~~Replace HomePageSectionContent with `<Column>`~~ → **KEEP** as grid-column positioning
3. ~~Replace HomePageSectionTitle with `<Column>`~~ → **KEEP** as grid-column positioning
4. **Convert `exploreGrid` from media queries to container queries** — matches CardGrid pattern; becomes panel-aware
5. **Convert `decisionProjectsList` from media queries to container queries** — same rationale as exploreGrid
6. **Add CSS comments** documenting why CSS Grid is used instead of Carbon `<Grid>`
7. **Clean up debug comments** (remove TEMPORARY visual debugging comments)
8. **CardGrid stays as-is** (container queries, self-contained)

**Files to modify:**
- `/components/pages/HomePage.module.css` — convert exploreGrid to container queries
- `/components/HomePage/RecentDecisionAutomationsSection.module.css` — convert decisionProjectsList to container queries
- `/components/HomePage/HomePageSection.module.css` — add documentation comment, clean up
- `/components/HomePage/HomePageSectionTitle.module.css` — clean up debug comments
- `/components/HomePage/HomePageSectionContent.module.css` — clean up debug comments

**Files NOT modified (verified correct as-is):**
- `/components/HomePage/HomePageSection.tsx` — no changes needed
- `/components/HomePage/HomePageSectionTitle.tsx` — no changes needed
- `/components/HomePage/HomePageSectionContent.tsx` — no changes needed

**Constraints:**
- Padding must match current: `spacing-05` horizontal, `spacing-09` vertical (lg), `spacing-08` (md), `spacing-07` (sm)
- 4-col title + 12-col content at lg must stack at md/sm
- `CardGrid` container queries must continue to work
- Container query conversions must use the same breakpoints (672, 1056, 1584px)

**Verification:**
- [x] HomePage renders identically at all breakpoints (sm/md/lg/xl)
- [x] Pinned section cards responsive (1→2→3→4 columns)
- [x] Recent section cards responsive — converted to container queries
- [ ] Explore section cards responsive — exploreGrid CSS ready (container queries); Figma import still uses Tailwind grid
- [x] Section title + content side-by-side at lg, stacked at md/sm
- [x] Panel system still works (open help panel, content doesn't shift)
- [x] Vertical spacing between sections preserved
- [x] No horizontal overflow at any breakpoint

**Result: COMPLETE — CSS Grid kept with documentation; card grids converted to container queries.**

Note: `exploreGrid` / `exploreCard` styles in `HomePage.module.css` are currently unused — the Explore section renders `HomePageRecentProjectsProjectGrid4X2` (a Figma import with Tailwind grid). Container query CSS is ready for when the Figma import is replaced with native components.

---

### Step 6.2: DecisionAutomationsPage Verification

**Scope:** Already uses Carbon Grid via `CardLayoutTemplate`. Verify and document.

**Current state:**
- `CardLayoutTemplate` wraps toolbar and content in `<Grid fullWidth>` + `<Column lg={16} md={8} sm={4}>`
- `CardGrid` inside uses container queries
- `PageHeaderWrapper` provides sticky header
- `SectionInfluencedLayout` wraps the content for panel support

**Plan:** Read-only verification. No code changes expected.

**Verification:**
- [x] Page renders correctly at all breakpoints
- [x] Cards responsive via container queries
- [x] Section panel opens/closes without layout shift
- [x] Sort/filter/view-mode toolbar works
- [x] Search filters cards
- [x] Grid ↔ List view toggle works

**Result: COMPLETE — Verified. Grid alignment fixes applied to `DecisionAutomationsPage.tsx`, `DecisionAutomationsPage.module.css`, and `RecentDecisionAutomationsSection.module.css` to match `HomePageHeader` tile column spans (`<Column max={3} lg={4} md={4} sm={4}>`). No regression.**

---

### Step 6.3: ResourceHubPage Grid Evaluation

**Scope:** `ResourceHubPage`, `ResourceSection`, `ResourceHubTile`

**Current state:**
- `.sectionsContainer` uses a raw CSS Grid with `grid-template-columns: repeat(16, 1fr)` 
- `ResourceSection` uses CSS subgrid + `grid-column: 1 / -1`
- No Carbon Grid/Column used

**Decision point:** The 16-column grid + subgrid pattern works correctly and is more capable than Carbon Grid (subgrid is not supported by Carbon's Grid component). **KEEP as CSS Module grid.** However, standardize:

**Plan:**
1. **Verify** the existing pattern works correctly at all breakpoints
2. **Standardize padding** to match Carbon Grid gutters if they differ
3. **Document** why this page uses CSS Grid instead of Carbon Grid (subgrid requirement)

**Files to audit (no changes expected):**
- `/components/pages/ResourceHubPage.tsx` + `.module.css`
- `/components/ResourceHub/ResourceSection.tsx` + `.module.css`

**Verification:**
- [x] Resource sections render with correct vertical spacing
- [x] Cards within sections are properly aligned
- [x] Tab switching (Assets/Prompts/Policies/Monitoring) works
- [x] Section panel opens/closes without layout shift
- [x] Subgrid alignment is correct

**Result: COMPLETE — Pattern verified correct. Refactored ambiguous `gap` + `row-gap` shorthand to explicit `column-gap` / `row-gap` declarations in `sectionsContainer`. Added file-header documentation to both `ResourceHubPage.module.css` and `ResourceSection.module.css` explaining the subgrid rationale and the `grid-column: 1 / -1` direct-assignment requirement. No structural changes — zero regression.**

---

### Step 6.4: ResourceDetailsPage Verification

**Scope:** Container query grid for resource detail tiles.

**Current state:** Already uses CSS Module container queries (migrated in Phase 7A).

**Plan:** Read-only verification.

**Verification:**
- [x] Tile grid responds to available width (not viewport)
- [x] Panel open/close causes tiles to reflow correctly
- [x] No horizontal overflow

**Result: COMPLETE — Container query pattern verified correct. Pattern is identical to `CardGrid` (same breakpoints: 672/1056/1584px; same gap: `spacing-05`). Removed four dead CSS classes (`.contentGrid`, `.section`, `.sectionTitle`, `.sectionDescription`) — stale pre-Phase-7A styles that were never referenced in the TSX. Added inline documentation comment to the `.tileGridContext` block explaining the container query rationale and why Carbon `<Grid>` is not appropriate. Zero structural changes — zero regression.**

---

### Step 6.5: Simple Pages Verification (DashboardsPage, RulesAndPoliciesPage)

**Scope:** Pages with minimal grid requirements.

**Current state:** Simple flex layouts with `SectionInfluencedLayout`.

**Plan:** Read-only verification.

**Verification:**
- [x] Content renders within padded area
- [x] Section panels work
- [x] No layout issues

**Result: COMPLETE — Three defects found and fixed in both pages:**
1. **`overflow-y: auto` misplaced on `.pageContainer`** (outside `SectionInfluencedLayout`) — moved scroll boundary to a new `.pageContent` wrapper div *inside* `SectionInfluencedLayout`. The section panel uses `position: absolute` relative to `.sectionContainer`; if scroll lives outside it the panel won't track visible content correctly on a populated page. Pattern now matches `ResourceDetailsPage`.
2. **4 dead CSS classes removed per file** — `.pageHeader`, `.pageTitle`, `.placeholderContent`, `.placeholderText` were unreferenced in both TSX files and contained non-Carbon Tailwind tokens (`--text-2xl`, `--font-weight-medium`, etc.).
3. **`RulesAndPoliciesPage` used `variant="page"`** — `PlaceholderContent` has no `variant-page` CSS class; silently rendered unstyled. Changed to `variant="section"` (consistent with `DashboardsPage`).

---

### Step 6.6: Specialized Layout Pages Verification (ObjectivesAndGoalsPage, DecisionAssistantPage)

**Scope:** Pages with unique layout patterns (InboxLayout, ChatLayout).

**Plan:** Read-only verification.

**Verification:**
- [x] InboxLayout: 320px sidebar + content area
- [x] ChatLayout: Full-screen chat interface
- [x] Responsive behavior correct

**Result: COMPLETE — Layout patterns verified and minor icon/prop defects fixed:**
1. Fixed `ObjectivesAndGoalsPage` passing obsolete `SearchIcon` and `FilterIcon` props to the refactored Carbon-compliant `InboxPanelToolbar`.
2. Verified `DecisionAssistantPage` successfully leverages `chatPageContainer` with `display: flex; height: 100%; overflow: hidden` to fill the app shell correctly without causing scroll leaks.
3. Hooked up the link routing for the newly refactored `HelpPanel`.

---

### Step 6.7: Automation Shell Pages Verification

**Scope:** All pages rendered inside `ApplicationLayoutTemplate`.

**Current state:** 
- `ApplicationLayoutTemplate` uses flex row layout: SideRail (48px/256px) + mainContent
- Pages inside use their own layout patterns
- `AutomationShellPanelRenderer` handles page-level panels within the shell
- `SectionInfluencedLayout` is used per-page for section panels

**Plan:** Systematic verification of each page within the automation shell.

**Sub-steps:**
- 6.7a: AutomationOverviewPage — CardGrid + linked objectives
- 6.7b: Services view (InboxLayout) — sidebar + content
- 6.7c: Objectives view (InboxLayout) — sidebar + content  
- 6.7d: Asset detail pages (DecisionModel, TaskModel, PredictiveModel, OptimizationModel, GenAI)
- 6.7e: Lifecycle pages (Branches, History, Updates, Versions)
- 6.7f: Operations pages (Test, Deploy, Monitor)
- 6.7g: Configuration pages (Settings, Rules & Policies, Decision Outcomes)

**Verification per sub-step:**
- [ ] Content renders correctly within the 48px side rail offset
- [ ] Expanding side rail to 256px adjusts content correctly
- [ ] Panel triggers open correct panels
- [ ] Section panels don't impact page height
- [ ] Scroll behavior is correct (page content scrolls, header/tabs stay fixed)

---

### Step 6.8: Page Padding Standardization

**Scope:** Ensure all pages use consistent Carbon-token-based padding.

**Current patterns (inconsistent):**
- `_shared.module.css`: `.pageContent { padding: var(--cds-spacing-05) }` (16px all)
- `_shared.module.css`: `.pageContentWithPadding { padding: var(--cds-spacing-05) var(--cds-spacing-07) }` (16px top/bottom, 32px left/right)
- `ApplicationLayoutTemplate`: `.pageContent { padding: var(--cds-spacing-05) var(--cds-spacing-07) 0 var(--cds-spacing-05) }` (16px top, 32px right, 0 bottom, 16px left)
- `HomePage`: No explicit padding on `.pageContainer` (padding is inside `HomePageSection`)
- `CardLayoutTemplate`: No padding (Carbon Grid handles gutters)

**Plan:**
1. **Define standard padding tokens** for each layout context:
   - L1 pages (no side rail): Carbon Grid gutters (handled by `<Grid>`)
   - Automation shell pages (with side rail): `spacing-05` horizontal, `spacing-05` top
   - Inbox pages: No extra padding (sidebar + content have their own)
2. **Normalize inconsistencies** where they exist
3. **Verify** no visual regression

**Files to potentially modify:**
- `/components/pages/_shared.module.css`
- Various page `.module.css` files that override padding

**Verification:**
- [ ] All pages have consistent horizontal gutters
- [ ] Content doesn't touch container edges
- [ ] Padding is responsive (narrower on small screens)

---

### Step 6.9: Grid Implementation Documentation

**Scope:** Document the final grid implementation details.

**Plan:**
1. **Create a documentation file** `./ai/docs/carbon-grid-implementation.md`
2. **Document the final grid patterns** used in each page/layout component
3. **Explain any deviations** from Carbon Grid and the reasons for them

**Files to create:**
- `/ai/docs/carbon-grid-implementation.md`

**Verification:**
- [ ] Documentation file is created
- [ ] All grid patterns are documented
- [ ] Deviations are explained

---

## Execution Order

```
6.0  Layout Shell Audit (read-only)
 ↓
6.1  HomePage Grid Standardization (most complex, highest visibility)
 ↓
6.2  DecisionAutomationsPage Verification (already Carbon Grid)
 ↓
6.3  ResourceHubPage Evaluation (CSS Grid + subgrid — likely keep)
 ↓
6.4  ResourceDetailsPage Verification (container queries — keep)
 ↓
6.5  Simple Pages Verification (Dashboards, Rules & Policies)
 ↓
6.6  Specialized Layout Pages Verification (Objectives, Chat)
 ↓
6.7  Automation Shell Pages Verification (all 17+ pages)
 ↓
6.8  Page Padding Standardization (cross-cutting)
 ↓
6.9  Grid Implementation Documentation (./ai/docs/carbon-grid-implementation.md)
```

## Rules

1. **Never wrap container-query grids in `<Column>`** — container queries need unrestricted width inheritance
2. **Never wrap subgrid children in `<Column>`** — subgrid requires `grid-column: 1 / -1` directly on the child
3. **Keep `globals.css` spacing tokens** — they're fallbacks for the CDN-loaded Carbon CSS
4. **Use CSS Modules for all new styles** — no inline styles, no Tailwind for spacing/color
5. **All spacing values must be Carbon tokens** (`--cds-spacing-*`)
6. **Document any deviation** from Carbon Grid in a CSS comment explaining why

## Success Criteria

- Zero visual regression across all 27 page components
- Zero layout shift when opening/closing panels at any level
- Correct responsive behavior at all Carbon breakpoints (320px, 672px, 1056px, 1312px, 1584px)
- Consistent padding and gutter spacing across all views
- All container query and subgrid patterns preserved
- No new Tailwind classes for spacing, typography, or color