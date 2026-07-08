# Resource Hub — 1:1 Figma Layout Refactor

## Context
The Resource Hub page must match the attached Figma design 1:1. The current implementation already has a two-column filter/content layout and `tabLeadingControls` for filter/search icons in `PageHeader`, but the design has moved further: the large page-title row is gone, the breadcrumb is the only chrome above an **inset content card** that holds the toolbar (filter + expandable search + contained tabs) and the section grid. The filter button must drive a real panel (not a placeholder aside), the search button must expand inline, and the card grid must respond to its container — not the viewport. The "Add resource" affordance is removed.

## Decisions (confirmed)
1. Extend `PageHeaderWrapper` with a `breadcrumbOnly` mode and use it on this page.
2. Replace the custom tabs in the inset toolbar with Carbon's **contained `Tabs`** component (`@carbon/react`).
3. Filter panel uses a **section-level influence** panel via `PanelManager`. If the inset layout reveals that section-level influence doesn't compose cleanly inside the inset container, we'll revisit (possibly a new `inset` influence variant).

## New named layout: **Inset Content Area**
This refactor introduces a new, reusable layout primitive — formally named **Inset Content Area** — that we expect to use on other pages going forward. Capture it as a first-class component so future pages don't reinvent it.

- **Component**: `src/app/components/layouts/InsetContentArea/InsetContentArea.tsx` (+ `.module.css`, `readme.md`, `readme.agents.md`, `index.ts`).
- **Props**:
  - `toolbar?: ReactNode` — rendered in the 48px-tall sticky top row of the card.
  - `children: ReactNode` — main scrollable content; becomes a container-query context (`container-type: inline-size`).
  - `flushBottom?: boolean` (default `true`) — card hugs the viewport bottom edge with no padding below.
- **Behavior**: 16px outer gutter on top/right/left (Carbon grid spec), 0 bottom; inner card uses `--cds-layer`; toolbar gets a 1px Carbon divider; content area scrolls independently and exposes itself as a container query context so children like `CardGrid` reflow to *available space*, not viewport width.
- **Docs**: `readme.md` covers human usage (props, when to use); `readme.agents.md` notes that it intentionally hosts a container-query boundary and lists pages currently using it (start: ResourceHubPage).
- **Changelog**: prepend a new entry to the repo's version changelog markdown noting the introduction of `InsetContentArea` and its first consumer.

## Target structure
```
<div .resourceHubPage>
  <PageHeaderWrapper breadcrumbOnly title="Resource hub" />   ← thin breadcrumb bar, no title row, no tabs
  <InsetContentArea toolbar={<ResourceHubToolbar … />}>        ← new named layout primitive
    <SectionInfluencedLayout>
      {sections.map(<ResourceSection>…</ResourceSection>)}
    </SectionInfluencedLayout>
  </InsetContentArea>
</div>
```

Toolbar contents (passed in via the `toolbar` prop):
```
<div .toolbar>                                                ← filter | search-expander | contained tabs
        <FilterTrigger />                                      ← toggles section panel; dirty dot when filters active
        <SearchExpander />                                     ← icon → input, flex-grows, pushes tabs right
        <Tabs contained> … </Tabs>                             ← Sample assets / prompts / policies / dashboards
      </div>
```

## Files to modify

### `src/app/components/PageHeaderWrapper.tsx` (+ `.module.css`)
- Add `breadcrumbOnly?: boolean` prop. When true, render a slim breadcrumb-only bar (Carbon `Breadcrumb`/`BreadcrumbItem` using `title`) and skip the title row, tabs, actions, and panel triggers.
- Bar height = `--cds-spacing-08` (40px), padding-inline = `--cds-spacing-05`, bottom border `--cds-border-subtle`.

### `src/app/components/pages/ResourceHubPage.tsx`
- Delete the `actionButton` block (lines 42–129) and its prop on `PageHeaderWrapper`.
- Stop passing `tabs` / `tabLeadingControls` to `PageHeaderWrapper`; pass `breadcrumbOnly` instead.
- Render the new inset shell + toolbar + content area locally (no new shared component yet — extract later if reused).
- Wire `FilterTrigger.onClick` to `togglePanel({ id: 'resource-hub-filter', level: 'section', pattern: 'influence', content: <ResourceFiltersPanel … /> })` and track a `hasActiveFilters` boolean (placeholder for now) to drive the dirty dot.
- `SearchExpander` is a small local component: collapsed = `IconButton(Search)`; expanded = Carbon `Search` size="lg" with `flex: 1`, collapses on blur+empty + on Escape. Animate width with the expressive curve `240ms cubic-bezier(0.4, 0.14, 0.3, 1)`.
- Tabs: Carbon `<Tabs contained selectedIndex onChange>` driving the existing `activeTab` state. Tabs sit at the trailing edge of the toolbar (`margin-inline-start: auto`).

### `src/app/components/pages/ResourceHubPage.module.css`
- Remove all `.addButton`, `.addIcon`, `.buttonText`, `.findFilter*`, `.resourceContentLayout`, `.filterPanel*` rules (moved into `InsetContentArea` / the toolbar component).
- Keep `.sectionsContainer` (16-col subgrid, 1px row-gap) — it now lives inside `InsetContentArea`'s children slot.
- Add toolbar-local classes:
  - `.toolbar` — flex row, `align-items: center`, height `var(--cds-spacing-09)` (48px); children separated by 1px dividers per Figma.
  - `.filterTrigger` — square 48×48, `position: relative`; `.filterTriggerDot` = 6px `--cds-support-info` circle, top-right, shown when filters dirty.
  - `.searchExpander` — `flex: 1 1 auto`; transition `width 240ms cubic-bezier(0.4, 0.14, 0.3, 1)`.
  - `.tabsSlot` — `margin-inline-start: auto` so contained tabs hug the trailing edge.

### `src/app/components/layouts/InsetContentArea/InsetContentArea.module.css`
- `.shell` — `padding: var(--cds-spacing-05) var(--cds-spacing-05) 0`, `flex: 1`, `min-height: 0`, `display: flex`.
- `.card` — `flex: 1`, `min-height: 0`, `display: flex`, `flex-direction: column`, `background: var(--cds-layer)`, `overflow: hidden`.
- `.toolbarSlot` — sticky top, 1px bottom divider via `--cds-border-subtle`.
- `.contentSlot` — `container-type: inline-size; container-name: inset-content;` `flex: 1; min-height: 0; overflow-y: auto`.

### New: `src/app/components/ResourceHub/ResourceFiltersPanel.tsx` (+ `.module.css`)
- Minimal placeholder content matching the existing "Filter panel contents — TBD" copy. Real filter controls land in a follow-up; this PR just proves the panel wiring.
- Exports a default React component consumed by `openPanel({ content: <ResourceFiltersPanel /> })`.

### Files NOT to modify
- The manually edited imports (`PanelProviderPage-1`, `AppContentWrapper-1`, their svg files) — leave alone.
- `PanelManager.tsx` — no changes needed; section + influence + the existing `SectionInfluencedLayout` should suffice.
- `ResourceSection.tsx` / its CSS — keep subgrid behavior.
- `CardGrid.module.css` — already container-query based; will react to the new `.contentArea` container.

## Reused existing utilities
- `usePanelManager` / `togglePanel` — `src/app/components/SidePanel/PanelManager.tsx`.
- `SectionInfluencedLayout` — `src/app/components/SidePanel/…`.
- `ResourceSection`, `Card`, `CardGrid` — unchanged.
- Resource data hooks in `src/app/data/resourceHubData.ts` — unchanged.
- Carbon `Tabs`, `Tab`, `TabList`, `Search`, `IconButton`, `Breadcrumb`, `BreadcrumbItem` from `@carbon/react`.

## Open risk to validate during implementation
Section-level influence panels were designed to influence the page-level content region. Mounting `SectionInfluencedLayout` *inside* an inset card may require the panel to render relative to the inset, not the viewport. If the influence layout breaks the inset boundary, the fallback is to introduce a new `inset` variant of the influence layout (separate PR) — flagged but not implemented here.

## Verification
1. Visual check against the Figma screenshot at common widths (1280, 1440, 1920). The inset card must hug the viewport bottom and have 16px gutter on top/left/right.
2. Click Filter → panel opens beside content within the inset card; click again → closes. Dirty dot appears when a placeholder `hasActiveFilters` flag is toggled in code.
3. Click Search → input expands smoothly (240ms expressive curve), tabs slide to trailing edge; blur empty input + Escape collapses it.
4. Resize the browser and toggle the AI assistant panel — the card grid reflows via container queries (1 → 2 → 3 → 4 columns) based on `.contentArea` width, not viewport.
5. Tab switching still updates section data; no regressions in resource navigation (`navigate('resource-detail', …)`).
6. Confirm "Add resource" button is gone everywhere on this page.
7. `pnpm tsc --noEmit` (or project equivalent) passes.
