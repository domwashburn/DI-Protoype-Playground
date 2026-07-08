# Resource Hub — Header redesign + content-area tweaks

## Context

The Resource Hub page currently has a two-band top: a thin breadcrumb bar
(`PageHeaderWrapper breadcrumbOnly`) followed by `InsetContentArea` whose
toolbar holds the contained tabs, search, and filter button. The new Figma
design (`.figma/attachments/image-0.png`) collapses that into a **single page
header bar** with the page title on the left, a pill-shaped tab group in the
middle, and the search + filter icons on the right. The content area below
keeps the same two-column layout (sections grid + 256 px filter aside) but
loses the toolbar band entirely, so the cards start directly under the header.

The goal is visual + structural alignment with the design while preserving
every existing behavior (live search, tab filtering, filter-panel toggle,
1 px gutter card rhythm, Carbon tokens, 240 ms expressive motion).

## Scope (confirmed with user)

Both the header transformation **and** the minor content-area layout tweaks,
in one plan.

## Files to modify

Only ResourceHubPage and a new local subcomponent for the header. No edits to
shared components (`PageHeader`, `PageHeaderWrapper`, `InsetContentArea`)
unless the user later approves a broader change.

- `src/app/components/pages/ResourceHubPage.tsx` — drop `PageHeaderWrapper`,
  drop `InsetContentArea` toolbar usage, render the new local header above
  the content layout. Tab state, search state, filter-panel state, and the
  live-filter logic all stay; only the JSX that renders them moves.
- `src/app/components/pages/ResourceHubPage.module.css` — remove `.toolbar`,
  `.tabsSlot`, `.toolbarSpacer`, `.divider`, `.searchExpander*`,
  `.filterTrigger*` (or move them under a new `.pageHeader*` namespace).
  Add the new header rules. Keep `.resourceContentLayout`, `.panelClosed`,
  `.sectionsContainer`, `.filterPanel`, `.tightCardGrid` largely intact;
  only adjust top padding now that the toolbar band is gone.
- `src/app/components/pages/ResourceHubHeader.tsx` *(new)* — small
  presentational subcomponent that renders the title + pill tabs +
  search/filter cluster. Lives next to `ResourceHubPage.tsx` because it is
  page-specific (per the design system rule, only promote to a shared
  component once a second consumer appears).
- `src/app/components/pages/ResourceHubHeader.module.css` *(new)* —
  styles for the header bar.

`src/imports/PanelProviderGlobal-3/**` is read-only reference for the visual
target; do not edit it (matches the user's "account for manual edits in
`src/imports/`" rule).

## Header implementation notes

- **Layout:** flex row, `align-items: center`, `height` = `var(--cds-spacing-09)`
  to match the previous toolbar band; `background-color: var(--cds-layer)`;
  bottom border `1px solid var(--cds-border-subtle)` to replace the
  breadcrumb bar's divider.
- **Title:** `<h1>` using the existing Carbon heading token already used on
  this page (`--cds-heading-03-*`). Left-aligned, no breadcrumb above it.
- **Pill tab group (middle):** custom buttons with `border-radius: 9999px`,
  `background: var(--cds-layer-accent-01)` for inactive, `var(--cds-layer-selected)`
  for active, `color: var(--cds-text-primary)`. Reuses the existing
  `activeTab` / `handleTabChange` state — just a different visual shell
  around the same `TAB_ORDER` array. Tab labels update to match the
  Figma: `All`, `Assets`, `Policies`, `Prompts`, `Dashboards` (drop the
  `Sample ` prefix); `More` in the design appears to be an overflow
  affordance — defer until confirmed (see Open question 1).
- **Right cluster:** the existing expandable `Search` and filter `IconButton`
  move verbatim into the header's right slot. Keep the 240 ms /
  `cubic-bezier(0.4, 0.14, 0.3, 1)` width transition on `.searchExpander`.
- **Reuse:** the search-expand logic (`searchExpanded`, `searchInputRef`,
  `expandSearch`, `handleSearchBlur`, `handleSearchKeyDown`) is lifted as-is
  from `ResourceHubPage.tsx:35-70`. The filter-dot indicator
  (`ResourceHubPage.tsx:179`) ports over unchanged.

## Content-area tweaks

- Remove the `InsetContentArea` wrapper (its only job here was hosting the
  toolbar). Render `.resourceContentLayout` directly as the child of
  `.resourceHubPage`.
- Keep `.sectionsContainer` (16-col subgrid carrier) and `.tightCardGrid`
  (1 px gutter) unchanged — the card rhythm in the Figma matches today's
  output.
- Filter aside: unchanged width (256 px), unchanged toggle behavior. The
  `placeholder` "Filter panel contents TBD" text stays until filter content
  is designed.
- Add small top spacing (`padding-top: var(--cds-spacing-03)` on
  `.resourceContentLayout`) so the first section title doesn't collide with
  the new header border.

## Behavior preservation checklist

- Live search across `title`, `resourceType`, `description` — unchanged.
- Escape clears search and collapses input — unchanged.
- Filter-panel toggle collapses the grid column via `.panelClosed` —
  unchanged.
- Tab change resets `activeTab` and re-derives `tabData` — unchanged.
- 240 ms expressive easing on search expansion — unchanged.

## Verification

1. `pnpm dev` (already running in this environment — do not restart).
2. Open the Resource Hub route in the preview surface.
3. Confirm: no breadcrumb band; single header bar with title + pill tabs +
   search/filter; clicking each tab swaps the section list; typing in search
   filters cards live; Escape collapses search; filter button toggles the
   right aside and shows the indicator dot when active; card grid still
   shows the 1 px divider rhythm.
4. Resize the viewport — header should remain a single row at desktop widths.
5. Visual diff against `.figma/attachments/image-0.png`.

## Resolved questions

1. **`More` pill** — Render as a non-functional placeholder pill (matches the
   Figma). It will use the same inactive pill styling, carry
   `aria-disabled="true"`, and no click handler. Not added to `TAB_ORDER`,
   so it cannot become the active tab and does not affect filtering.
