# Carbon Grid Implementation Reference

> How grid and layout are implemented across every page and layout component in the DI UI.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Layout Shell (Viewport to Page)](#layout-shell-viewport-to-page)
- [Grid Pattern Catalog](#grid-pattern-catalog)
- [L1 Pages](#l1-pages)
- [Automation Shell Pages](#automation-shell-pages)
- [Cross-Cutting Layout Components](#cross-cutting-layout-components)
- [Decision Log: Why Not Carbon Grid Everywhere](#decision-log-why-not-carbon-grid-everywhere)
- [Spacing & Padding Standards](#spacing--padding-standards)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Rules & Constraints](#rules--constraints)
- [File Index](#file-index)

---

## Architecture Overview

The DI UI uses **four distinct grid strategies**, each chosen for a specific reason. Carbon's `<Grid>` / `<Column>` is used where its responsive 16-column system adds value. CSS Grid with container queries or subgrid is used where Carbon Grid lacks capability. Flexbox is used for shell/panel layouts where a column grid is not appropriate.

```
Grid Strategy           | Where                        | Why
------------------------|------------------------------|------------------------------------------
Carbon <Grid>/<Column>  | CardLayoutTemplate           | Standard Carbon structural layout
CSS Grid + CQ           | CardGrid, ResourceDetailsPage| Panel-aware responsive (container queries)
CSS Grid + subgrid      | ResourceHubPage/Section      | Parent-child column alignment
CSS Grid + media queries| HomePageSection, Header      | Full-width page sections (16-col)
Flexbox                 | Shell, panels, most pages    | Linear flow, not column-based content
```

**CQ** = Container Queries

---

## Layout Shell (Viewport to Page)

Every page is rendered inside the same shell hierarchy. Understanding this chain is critical for debugging layout issues.

### Flex Chain

```
<html>                                     (font-size: var(--font-size))
  <body>                                   (bg-background, text-foreground, IBM Plex Sans)
    <App>                                  (RouterProvider)
      <AppLayout>                          (PanelManagerProvider)
        <AppShell>
          .appContainer                    flex col, 100vh, overflow: hidden
            .userInterface                 flex col, flex:1, isolation: isolate
              <CarbonHeader />             position: fixed, height: 48px, z-index: 6000+
              <CarbonSideNav />            position: fixed, top: 48px (sibling CSS rule)
              .appContent                  flex col, flex:1, padding-top: 48px, overflow: hidden
                <UniversalPanelWrapper>
                  <GridLayout> or <InfluencedLayout>
                    .contentArea           flex col, flex:1
                      [BreadcrumbActionBar]  flex-shrink: 0 (conditional)
                      .pageContentWrapper  flex col, flex:1, bg: --cds-background
                        <Outlet />         === Page Component
```

### Key Properties at Each Level

| Container | CSS | Purpose |
|-----------|-----|---------|
| `.appContainer` | `height: 100vh; overflow: hidden` | Viewport boundary |
| `.userInterface` | `flex: 1; isolation: isolate; overflow: hidden` | Stacking context |
| `.appContent` | `flex: 1; padding-top: 48px; overflow: hidden` | Clear fixed header; no scroll here |
| `.gridLayoutOverlay` / `.outerContainer` | `flex: 1; min-height: 0` | Panel wrapper passthrough |
| `.contentArea` / `.panelContainer` | `flex: 1; min-height: 0` | Content + panel sibling |
| `.pageContentWrapper` | `flex: 1; min-height: 0; bg: --cds-background` | Page mount point |

### Scroll Boundaries

Scrolling happens **inside each page**, not at the shell level. Each page owns its own scroll container:

| Page Type | Scroll Container |
|-----------|-----------------|
| HomePage | `.pageContainer { overflow-y: auto }` |
| DecisionAutomationsPage | `.cardLayoutContent { overflow-y: auto }` (via CardLayoutTemplate) |
| ResourceHubPage | `.sectionsContainer { overflow-y: auto }` |
| Automation Shell pages | `.mainContent { overflow-y: auto }` (ApplicationLayoutTemplate) |
| ChatLayoutTemplate | ChatInterface manages its own scroll |

### CSS Custom Properties (Shell-Level)

Published by `AppLayout.tsx` via `document.documentElement.style.setProperty()`:

| Property | Value | Used By |
|----------|-------|---------|
| `--panel-top-offset` | `88px` (breadcrumb) or `48px` (no breadcrumb) | `GridLayout` overlay panel `top` |
| `--page-header-sticky-top` | `var(--breadcrumb-height, 40px)` or `0px` | `PageHeaderWrapper` sticky offset |

Defined in `globals.css :root`:

| Property | Value | Used By |
|----------|-------|---------|
| `--header-height` | `48px` | `.appContent` padding-top, panel calculations |
| `--breadcrumb-height` | `40px` | Breadcrumb bar height, panel offset |
| `--panel-width-narrow` | `240px` | Panel width variant |
| `--panel-width-standard` | `320px` | Panel width variant |
| `--panel-width-wide` | `384px` | Panel width variant |
| `--z-panel-section` | `1` | Section-level panel z-index |
| `--z-panel-page` | `100` | Page-level panel z-index |
| `--z-panel-automation-shell` | `6000` | Automation shell panel z-index |
| `--z-panel-global` | `9000` | Global panel z-index |

---

## Grid Pattern Catalog

### Pattern 1: Carbon `<Grid>` + `<Column>`

**Import:** `import { Grid, Column } from '@carbon/react'`

**Behavior:** Carbon's responsive 16-column grid system. Automatically applies gutters. Column counts respond to viewport breakpoints:
- `sm` (< 672px): 4 columns
- `md` (672px - 1055px): 8 columns
- `lg` (1056px - 1311px): 16 columns
- `xlg` (1312px - 1583px): 16 columns
- `max` (1584px+): 16 columns

**Usage:**
```tsx
<Grid fullWidth>
  <Column lg={16} md={8} sm={4}>
    {/* Full-width content */}
  </Column>
</Grid>
```

**Where used:** `CardLayoutTemplate` only (toolbar + card grid wrapper).

**Limitation:** Column widths respond to **viewport** width, not container width. This means panels opening/closing do not cause column reflow. For panel-aware responsive behavior, use container queries instead.

---

### Pattern 2: CSS Grid + Container Queries

**Behavior:** Grid column count responds to the **component's available width** (not viewport). When a side panel opens and narrows the content area, the grid automatically adjusts column count.

**Implementation:**
```css
/* Outer wrapper establishes containment */
.cardGridContext {
  width: 100%;
  container-type: inline-size;
  container-name: card-grid;
}

/* Inner grid responds to container width */
.cardGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--cds-spacing-05);
}

@container card-grid (min-width: 672px) {
  .cardGrid { grid-template-columns: repeat(2, 1fr); }
}

@container card-grid (min-width: 1056px) {
  .cardGrid { grid-template-columns: repeat(3, 1fr); }
}

@container card-grid (min-width: 1584px) {
  .cardGrid { grid-template-columns: repeat(4, 1fr); }
}
```

**Where used:**
- `CardGrid` (`CardGrid.module.css`) — reusable card grid component
- `ResourceDetailsPage` (`ResourceDetailsPage.module.css`) — tile grid (`.tileGridContext` + `.tileGrid`)
- `HomePageHeader` (`HomePageHeader.module.css`) — task tiles grid (`.taskSets` inside `header-container`)

**Why not Carbon Grid:** Carbon Grid has no container query equivalent. It only responds to viewport width, which means cards would not reflow when a panel opens.

---

### Pattern 3: CSS Grid + Subgrid

**Behavior:** Child component inherits the parent's column tracks via `grid-template-columns: subgrid`, allowing cross-component column alignment.

**Implementation:**
```css
/* Parent: 16-column grid */
.sectionsContainer {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  gap: var(--cds-spacing-05);
  row-gap: var(--cds-spacing-07);
  align-content: start;
}

/* Child: inherits parent columns via subgrid */
.resourceSection {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  gap: var(--cds-spacing-05);
  align-content: start;
}

/* Grandchild: spans full width directly (no <Column> wrapper) */
.sectionHeaderRow { grid-column: 1 / -1; }
.sectionContentRow { grid-column: 1 / -1; }
```

**Where used:** `ResourceHubPage` (parent grid) + `ResourceSection` (subgrid child).

**Why not Carbon Grid:** Carbon Grid has no subgrid support. Wrapping `ResourceSection` children in `<Column>` would break the subgrid inheritance chain.

---

### Pattern 4: CSS Grid + Media Queries (Responsive Column Count)

**Behavior:** Responsive column grid using viewport-based media queries at Carbon breakpoints. Matches Carbon's own column counts (4 → 8 → 16).

**Implementation:**
```css
.section {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* sm: 4 columns */
  gap: var(--cds-spacing-05);
}

@media (min-width: 672px) {
  .section { grid-template-columns: repeat(8, 1fr); } /* md: 8 columns */
}

@media (min-width: 1056px) {
  .section { grid-template-columns: repeat(16, 1fr); } /* lg: 16 columns */
}
```

**Column positioning within the grid:**
```css
/* Title: always 4 columns wide */
.titleArea { grid-column: span 4; }
@media (min-width: 1056px) {
  .titleArea { grid-column: 1 / 5; } /* Explicit: columns 1-4 */
}

/* Content: full width at sm/md, columns 5-16 at lg */
.contentArea { grid-column: 1 / -1; } /* sm/md: full width, stacks below title */
@media (min-width: 1056px) {
  .contentArea { grid-column: 5 / 17; } /* lg: 12 columns beside title */
}
```

**Where used:**
- `HomePageSection` (`HomePageSection.module.css`) — page-level content sections
- `HomePageSectionTitle` (`HomePageSectionTitle.module.css`) — 4-column title area
- `HomePageSectionContent` (`HomePageSectionContent.module.css`) — 12-column content area
- `HomePageHeader` (`HomePageHeader.module.css`) — hero header grid (uses container queries instead of media queries for panel-awareness)

**Migration candidate:** `HomePageSection` could migrate to Carbon `<Grid>` + `<Column>` in Step 6.1 since it follows the standard 4/8/16-column pattern.

---

### Pattern 5: Flexbox Layouts

**Behavior:** Standard flex column or flex row layouts for linear content flow. No column grid needed.

**Where used:** Almost everything that is not a card/tile grid:
- `AppLayout` — shell structure (flex column)
- `ApplicationLayoutTemplate` — automation shell (flex row: side rail + content)
- `InboxLayoutTemplate` — master-detail (flex row: 320px sidebar + flex content)
- `ChatLayoutTemplate` — chat layout (flex row: sidebar + chat area)
- `SectionInfluencedLayout` — panel overlay container (flex row: content + absolute panel)
- `InfluencedLayout` — push panel container (flex row: content with margin + panel)
- `GridLayout` — overlay panel container (flex column: content + fixed panel)
- Most page containers (`.pageContainer`, `.pageContent`)

---

## L1 Pages

### HomePage

**File:** `/components/pages/HomePage.tsx`

**Layout structure:**
```
.pageContainer (flex col, overflow-y: auto)
  <HomePageHeader>         — container-query grid (4→8→16 cols) with hero tiles
  <HomePageSection>        — CSS Grid (4→8→16 cols via media queries)
    <HomePageSectionTitle> — grid-column: span 4 (1/5 at lg)
    <HomePageSectionContent> — grid-column: 1/-1 (5/17 at lg = 12 cols)
      <CardGrid>           — container-query grid (1→2→3→4 cols)
        <Card />           — individual cards
  <HomePageSection>        — (repeated for each section: pinned, recent, explore)
    ...
```

**Grid patterns used:**
1. `HomePageHeader` — Container query grid (Pattern 2) with `container-name: header-container`
2. `HomePageSection` — Media query grid (Pattern 4) with 4→8→16 column breakpoints
3. `CardGrid` — Container query grid (Pattern 2) for responsive card columns
4. `exploreGrid` — Media query grid in `HomePage.module.css` (1→2→3→4 columns)

**Padding:** `HomePageSection` provides `padding: spacing-05` horizontal, `spacing-09/08/07` vertical (responsive).

---

### DecisionAutomationsPage

**File:** `/components/pages/DecisionAutomationsPage.tsx`

**Layout structure:**
```
.pageContainer (flex col)
  <SectionInfluencedLayout>
    <PageHeaderWrapper>      — sticky header with tabs
    <CardLayoutTemplate>     — Carbon Grid wrapper
      <Grid fullWidth>
        <Column lg={16}>
          <CardLayoutToolbar>  — sort/search/view controls
      <Grid fullWidth>
        <Column lg={16}>
          <CardGrid>           — container-query grid
            <Card />
```

**Grid patterns used:**
1. Carbon `<Grid>` + `<Column>` (Pattern 1) — structural wrapper via `CardLayoutTemplate`
2. `CardGrid` — Container query grid (Pattern 2) for responsive card columns

**Padding:** Carbon Grid provides its own gutters. No explicit page padding.

---

### ResourceHubPage

**File:** `/components/pages/ResourceHubPage.tsx`

**Layout structure:**
```
.resourceHubPage (flex col)
  <SectionInfluencedLayout>
    <PageHeaderWrapper>         — sticky header with tabs
    .sectionsContainer          — CSS Grid, 16 columns, overflow-y: auto
      <ResourceSection>         — CSS subgrid (grid-column: 1/-1)
        .sectionHeaderRow       — grid-column: 1/-1
        .sectionContentRow      — grid-column: 1/-1
          <ResourceHubTile />   — flex column tile
```

**Grid patterns used:**
1. CSS Grid 16-column (Pattern 4) — `.sectionsContainer` in `ResourceHubPage.module.css`
2. CSS subgrid (Pattern 3) — `ResourceSection` inherits parent column tracks

**Why not Carbon Grid:** Subgrid requirement. `ResourceSection` children use `grid-column: 1 / -1` directly without a `<Column>` wrapper. Carbon Grid does not support subgrid.

**Padding:** `.sectionsContainer` provides `padding: spacing-05` all sides.

---

### ResourceDetailsPage

**File:** `/components/pages/ResourceDetailsPage.tsx`

**Layout structure:**
```
.pageContainer (flex col)
  <SectionInfluencedLayout>
    .pageContent (flex col, overflow-y: auto, padding: spacing-06)
      .tileGridContext          — container-type: inline-size
        .tileGrid               — CSS Grid, responsive columns via @container
          .tile                 — individual tiles
```

**Grid patterns used:**
1. Container query grid (Pattern 2) — `.tileGridContext` / `.tileGrid` (1→2→3→4 cols)

**Padding:** `.pageContent` provides `padding: spacing-06` with `padding-bottom: spacing-09`.

---

### DashboardsPage / RulesAndPoliciesPage

**Files:** `/components/pages/DashboardsPage.tsx`, `/components/pages/RulesAndPoliciesPage.tsx`

**Layout structure:**
```
.pageContainer (flex col, overflow-y: auto)
  <SectionInfluencedLayout>
    <PageHeaderWrapper>
    .pageContent (flex col, padding)
      {content}
```

**Grid patterns used:** None — simple flex column layout.

**Padding:** `.pageContent` provides `padding: spacing-05`.

---

### ObjectivesAndGoalsPage

**File:** `/components/pages/ObjectivesAndGoalsPage.tsx`

**Layout structure:**
```
.pageContainer (flex col)
  <InboxLayoutTemplate>
    sidebar (320px):
      <InboxPanelHeader>
      <InboxActionButton>
      <InboxPanelToolbar>
      <InboxPanelList>
    main:
      <PageHeader>
      <SectionInfluencedLayout>
        {content}
```

**Grid patterns used:** None — `InboxLayoutTemplate` is a flex row (320px fixed sidebar + flex:1 content).

---

### DecisionAssistantPage (ChatLayoutTemplate)

**File:** `/components/ChatLayoutTemplate.tsx`

**Layout structure:**
```
.chatLayoutContent (flex row, height: calc(100vh - 48px))
  <ChatSidebar>               — 48px collapsed / 256px expanded side rail
  .mainChatContent (flex:1, margin-left: 48px)
    <ChatInterface>           — full-height chat with input
```

**Grid patterns used:** None — flex row with fixed sidebar offset.

---

## Automation Shell Pages

All pages below are rendered inside `ApplicationLayoutTemplate`:

```
.applicationContent (flex row)
  <DecisionAutomationSideNav>    — 48px collapsed / 256px expanded
  .mainContent (flex col, margin-left: 48px, overflow-y: auto)
    {page content}               — specific page renders here
```

### AutomationOverviewPage

**Grid:** Flex column + `CardGrid` (container queries) for linked objective cards.

### Services / Objectives Views (InboxLayout)

**Grid:** `InboxLayoutTemplate` (flex row: 320px sidebar + flex content). Content area uses `PageHeader` + `SectionInfluencedLayout`.

### Asset Detail Pages

**Pages:** DecisionModelPage, TaskModelPage, PredictiveModelPage, OptimizationModelPage, GenAINodePage

**Grid:** Flex column layouts. TaskModelPage uses Carbon `TreeView` for the sidebar tree + flex content split.

### Lifecycle Pages

**Pages:** BranchesPage, HistoryPage, UpdatesPage, VersionsPage

**Grid:** Flex column with tables/timelines/lists. No card grid. `SectionInfluencedLayout` for panel support where applicable.

### Operations Pages

**Pages:** TestAutomationPage, DeployAutomationPage, MonitorAutomationPage

**Grid:** Flex column with mixed content (tables, charts, cards). DeployAutomationPage uses `Timeline`, `VersionList`, `EnvironmentsList` components.

**Padding:** `.pageContent { padding: spacing-06; padding-bottom: spacing-09 }`.

### Configuration Pages

**Pages:** AutomationSettingsPage, RulesAndPoliciesPage (reused), DecisionOutcomesPage

**Grid:** Flex column with form/table content.

---

## Cross-Cutting Layout Components

### UniversalPanelWrapper

**File:** `/components/SidePanel/UniversalPanelWrapper.tsx`

**Role:** Wraps page content with panel context. Switches between `GridLayout` (overlay) and `InfluencedLayout` (push) based on panel pattern.

**Grid:** None. Pure flex passthrough. Provides `SidePanelProvider` context.

### GridLayout (Overlay Panel)

**File:** `/components/SidePanel/GridLayout.tsx` + `.module.css`

**Layout:** Flex column. Content area is full width. Panel is `position: fixed` and slides in from the right.

### InfluencedLayout (Push Panel)

**File:** `/components/SidePanel/InfluencedLayout.tsx` + `.module.css`

**Layout:** Flex row. Content area gets `margin-right: 320px` when panel is open (push pattern). Panel is `position: absolute` (page-level) or `position: fixed` (global-level).

### SectionInfluencedLayout (Section Overlay Panel)

**File:** `/components/SidePanel/SectionInfluencedLayout.tsx` + `.module.css`

**Layout:** Flex row with `overflow: hidden`. Panel is `position: absolute` within the container (overlay, no content reflow). Content width and height are unchanged when panel opens.

### PageHeaderWrapper / PageHeader

**File:** `/components/PageHeaderWrapper.tsx`, `/components/PageHeader.tsx`

**Layout:** Flex column. Fixed height header (64px content area + optional 40px tab bar). `flex-shrink: 0` prevents compression.

### CardLayoutTemplate

**File:** `/components/CardLayout/CardLayoutTemplate.tsx`

**Layout:** Carbon `<Grid fullWidth>` + `<Column lg={16} md={8} sm={4}>` wrapping toolbar and `<CardGrid>`.

### InboxLayoutTemplate

**File:** `/components/InboxLayout/InboxLayoutTemplate.tsx`

**Layout:** Flex row. 320px fixed-width sidebar + flex:1 content area.

### ApplicationLayoutTemplate

**File:** `/components/ApplicationLayoutTemplate.tsx`

**Layout:** Flex row. SideRail nav (48px collapsed / 256px expanded via margin-left) + flex:1 content. Pages render inside `.mainContent` which has `overflow-y: auto`.

---

## Decision Log: Why Not Carbon Grid Everywhere

| Component | Carbon Grid? | Reason |
|-----------|-------------|--------|
| `CardGrid` | No | Container queries are required for panel-aware responsive behavior. Carbon Grid only responds to viewport width. |
| `ResourceSection` | No | CSS subgrid is required for parent-child column alignment. Carbon Grid has no subgrid support. |
| `ResourceHubPage.sectionsContainer` | No | Hosts `ResourceSection` subgrid children. Wrapping in `<Column>` would break `grid-column: 1 / -1`. |
| `ResourceDetailsPage.tileGrid` | No | Container queries needed for panel-aware tile reflow. |
| `HomePageHeader.taskSets` | No | Container queries needed for header tile responsive behavior. |
| `HomePageSection` | Candidate | Currently uses CSS Grid with media queries matching Carbon's 4/8/16 breakpoints. Could migrate to Carbon `<Grid>` for consistency. |
| `AppLayout`, panel layouts | No | Flexbox is the correct tool for linear shell/panel layouts. A column grid adds no value. |
| All automation shell pages | No | Content is inside a side-rail offset layout. Page content is flex column. No card/tile grids at the page level (individual components like `CardGrid` handle their own). |

---

## Spacing & Padding Standards

### Carbon Spacing Tokens

| Token | Value | Common Use |
|-------|-------|-----------|
| `--cds-spacing-01` | 2px | Micro gaps |
| `--cds-spacing-02` | 4px | Tag padding, tight gaps |
| `--cds-spacing-03` | 8px | Icon gaps, small padding |
| `--cds-spacing-04` | 12px | Medium gaps |
| `--cds-spacing-05` | 16px | Standard gap/padding (grid gutter) |
| `--cds-spacing-06` | 24px | Section padding |
| `--cds-spacing-07` | 32px | Large section gaps |
| `--cds-spacing-08` | 40px | Page section top/bottom (md) |
| `--cds-spacing-09` | 48px | Page section top/bottom (lg), header height |
| `--cds-spacing-10` | 64px | Extra large spacing |

### Page Padding by Context

| Context | Horizontal | Vertical | Source |
|---------|-----------|----------|--------|
| L1 pages (Carbon Grid) | Auto (Grid gutters) | None | `<Grid fullWidth>` |
| L1 pages (no Grid) | `spacing-05` | `spacing-05` top | `_shared.module.css` |
| HomePage sections | `spacing-05` | `spacing-09` (lg), `spacing-08` (md), `spacing-07` (sm) | `HomePageSection.module.css` |
| Automation shell pages | `spacing-05` left, `spacing-07` right | `spacing-05` top | `ApplicationLayoutTemplate.module.css` |
| Deploy/Resource detail pages | `spacing-06` all | `spacing-09` bottom | Page-specific `.module.css` |
| ResourceHub sections | `spacing-05` all | `spacing-07` row-gap | `ResourceHubPage.module.css` |

---

## Responsive Breakpoints

All breakpoints align with Carbon Design System v11:

| Name | Width | Grid Columns | Notes |
|------|-------|-------------|-------|
| `sm` | < 672px | 4 | Mobile. Cards: 1 column |
| `md` | 672px - 1055px | 8 | Tablet. Cards: 2 columns |
| `lg` | 1056px - 1311px | 16 | Desktop. Cards: 3 columns. Title + content side-by-side |
| `xlg` | 1312px - 1583px | 16 | Wide desktop |
| `max` | 1584px+ | 16 | Ultra-wide. Cards: 4 columns. Max-width constraint |

Container query breakpoints use the same thresholds but respond to component width instead of viewport width.

---

## Rules & Constraints

1. **Never wrap container-query grids in `<Column>`** — `<Column>` constrains width in ways that can interfere with `container-type: inline-size` calculations.

2. **Never wrap subgrid children in `<Column>`** — subgrid requires `grid-column: 1 / -1` directly on the child element. A `<Column>` wrapper breaks the subgrid inheritance chain.

3. **Keep `globals.css` spacing tokens as fallbacks** — the CDN-loaded Carbon CSS (`@carbon/styles@1.72.0`) defines these tokens, but our fallback definitions in `:root` prevent the UI from collapsing if the CDN load is delayed or fails.

4. **Use CSS Modules for all layout styles** — no inline `style={{}}` unless the value is dynamically computed at runtime. No Tailwind for spacing, color, or typography.

5. **All spacing values must reference Carbon tokens** — `var(--cds-spacing-05)`, never bare `16px`.

6. **Document deviations** — any CSS Module grid that does not use Carbon `<Grid>` must have a CSS comment explaining why (container queries, subgrid, etc.).

7. **Scroll at the page level** — never at the shell level. Each page owns its own scroll container.

8. **`align-content: start`** — required on any CSS Grid container that is also a flex child with `flex: 1`. Without it, CSS Grid distributes excess height across rows, pushing content to the vertical center.

---

## File Index

### Layout Shell

| File | Role |
|------|------|
| `/App.tsx` | `RouterProvider` entry point |
| `/routes.tsx` | Route configuration |
| `/layouts/AppLayout.tsx` | App shell (header, sidenav, breadcrumb, outlet) |
| `/layouts/AppLayout.module.css` | Shell layout styles |

### Grid Components

| File | Pattern | Notes |
|------|---------|-------|
| `/components/CardLayout/CardGrid.tsx` | Container queries | Reusable responsive card grid |
| `/components/CardLayout/CardGrid.module.css` | Container queries | 1→2→3→4 columns |
| `/components/CardLayout/CardLayoutTemplate.tsx` | Carbon Grid | Wraps CardGrid in `<Grid>` + `<Column>` |
| `/components/CardLayout/CardLayoutTemplate.module.css` | Flex | Template structure |
| `/components/ResourceHub/ResourceSection.tsx` | Subgrid | Section within ResourceHub |
| `/components/ResourceHub/ResourceSection.module.css` | Subgrid | `grid-column: 1 / -1` |

### HomePage Components

| File | Pattern | Notes |
|------|---------|-------|
| `/components/HomePage/HomePageSection.tsx` | Media query grid | 4→8→16 columns |
| `/components/HomePage/HomePageSection.module.css` | Media query grid | Responsive column counts |
| `/components/HomePage/HomePageSectionTitle.tsx` | Grid positioning | `grid-column: span 4` |
| `/components/HomePage/HomePageSectionTitle.module.css` | Grid positioning | 4-col title area |
| `/components/HomePage/HomePageSectionContent.tsx` | Grid positioning | `grid-column: 5/17` at lg |
| `/components/HomePage/HomePageSectionContent.module.css` | Grid positioning | 12-col content area |
| `/components/HomePage/HomePageHeader.tsx` | Container query grid | Hero header with tiles |
| `/components/HomePage/HomePageHeader.module.css` | Container query grid | `container-name: header-container` |

### Panel Layouts

| File | Pattern | Notes |
|------|---------|-------|
| `/components/SidePanel/UniversalPanelWrapper.tsx` | Context provider | Switches GridLayout/InfluencedLayout |
| `/components/SidePanel/GridLayout.tsx` | Flex + fixed panel | Overlay panel pattern |
| `/components/SidePanel/GridLayout.module.css` | Flex + fixed panel | `position: fixed` panel |
| `/components/SidePanel/InfluencedLayout.tsx` | Flex + margin push | Push/influence pattern |
| `/components/SidePanel/InfluencedLayout.module.css` | Flex + margin push | `margin-right: 320px` when open |
| `/components/SidePanel/SectionInfluencedLayout.tsx` | Flex + absolute panel | Section overlay pattern |
| `/components/SidePanel/SectionInfluencedLayout.module.css` | Flex + absolute panel | `overflow: hidden` clips panel |

### Page Styles (with grid patterns)

| File | Pattern | Notes |
|------|---------|-------|
| `/components/pages/HomePage.module.css` | Media query grid | `.exploreGrid` 1→2→3→4 columns |
| `/components/pages/ResourceHubPage.module.css` | 16-col CSS Grid | `.sectionsContainer` hosts subgrid children |
| `/components/pages/ResourceDetailsPage.module.css` | Container queries | `.tileGridContext` + `.tileGrid` |
| `/components/pages/DecisionAutomationsPage.module.css` | (none) | Uses CardLayoutTemplate (Carbon Grid) |
| `/components/pages/_shared.module.css` | (none) | Shared flex container + padding utilities |

### Automation Shell

| File | Pattern | Notes |
|------|---------|-------|
| `/components/ApplicationLayoutTemplate.tsx` | Flex row | Side rail + content |
| `/components/ApplicationLayoutTemplate.module.css` | Flex row | `margin-left: 48px/256px` |
| `/components/InboxLayout/InboxLayoutTemplate.tsx` | Flex row | 320px sidebar + content |
| `/components/InboxLayout/InboxLayoutTemplate.module.css` | Flex row | Fixed sidebar width |
| `/components/ChatLayoutTemplate.tsx` | Flex row | Chat sidebar + chat area |
| `/components/ChatLayoutTemplate.module.css` | Flex row | `margin-left: 48px` |
