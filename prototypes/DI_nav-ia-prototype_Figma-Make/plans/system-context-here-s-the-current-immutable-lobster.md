# Resource Hub Refactor — Implementation Plan

## Context

The Resource Hub page needs to match the Figma design 1:1. The current layout uses a full `PageHeaderWrapper` (large title + tab bar + action button) with a visible filter sidebar. The target layout moves tabs and toolbar controls _inside_ an inset card (InsetContentArea), renders only a breadcrumb-style header, and uses a PanelManager-driven filter panel instead of the sidebar.

No code written yet; previous plan was approved and this is the execution handoff.

---

## Phase 1 — Extend `PageHeaderWrapper` with `breadcrumbOnly` mode

**File:** `src/app/components/PageHeaderWrapper.tsx`

Add optional `breadcrumbOnly?: boolean` prop. When `true`, return `null` — the global `BreadcrumbActionBar` from `AppLayout` already provides the breadcrumb row; the page title + tabs section simply disappears.

```ts
// PageHeaderWrapperProps addition
breadcrumbOnly?: boolean;

// In the component body, before all rendering:
if (breadcrumbOnly) return null;
```

No changes to `PageHeader.tsx` — the wrapper handles the short-circuit.

---

## Phase 2 — Create `InsetContentArea` layout primitive

**Location:** `src/app/components/layouts/InsetContentArea/`

### Props
```ts
interface InsetContentAreaProps {
  toolbar?: ReactNode;     // sticky toolbar strip at top of card
  children: ReactNode;     // scrollable content area
  flushBottom?: boolean;   // remove bottom gutter (for edge-to-edge content)
}
```

### Layout behaviour
- Outer wrapper: 16px padding on all four sides (`var(--cds-spacing-05)`)
- Inner card: `background: var(--cds-layer)`, full height flex column
- Toolbar strip: `min-height: 48px`, `border-bottom: 1px solid var(--cds-border-subtle-01)`, `position: sticky`, `top: 0`, `z-index: 1`
- Scrollable content: `overflow-y: auto`, `flex: 1`, `container-type: inline-size` (enables child container queries)

### Files
- `InsetContentArea.tsx` — component implementation
- `InsetContentArea.module.css` — CSS module (no Tailwind arbitrary values, only CDS tokens)
- `index.ts` — barrel export
- `readme.md` — human docs
- `readme.agents.md` — agent context (lists consuming files)

---

## Phase 3 — `ResourceHubToolbar` (inline in ResourceHubPage)

Built as a local component inside `ResourceHubPage.tsx` (not extracted to its own file — single consumer, no reuse pressure).

### Contents (left-to-right)
1. **FilterTrigger** — Carbon `IconButton` with `Filter` icon. Calls `openPanel(...)` via `usePanelManager`. Shows a blue dot (CSS `::after`) when filter panel is open (`isPanelOpen && currentPanel?.id === 'resource-filters-panel'`).
2. **Divider** — `1px` vertical separator, `var(--cds-spacing-06)` tall, `var(--cds-border-subtle)` colour.
3. **SearchExpander** — starts as `IconButton` with `Search` icon. On click, expands to a Carbon `Search` input (width animates from 0 → 240px with `240ms cubic-bezier(0.4, 0.14, 0.3, 1)`). Collapses on blur or Escape keydown.
4. **Divider** (same as above)
5. **Carbon contained `Tabs`** — `<Tabs type="contained">` from `@carbon/react`. Tabs: Sample Assets / Sample Prompts / Sample Policies / Monitoring. `onTabClick` fires `setActiveTab` and `closeSectionPanels()`.

Toolbar uses `display: flex; align-items: center; height: 48px` via its own CSS class in `ResourceHubPage.module.css`.

---

## Phase 4 — `ResourceFiltersPanel` placeholder

**File:** `src/app/components/ResourceHub/ResourceFiltersPanel.tsx`

Simple placeholder using `SampleSidePanel` wrapper. Exported from `src/app/components/ResourceHub/index.ts`.

---

## Phase 5 — Refactor `ResourceHubPage`

**File:** `src/app/components/pages/ResourceHubPage.tsx`

### Key changes
1. Remove `actionButton` JSX entirely (no more "Add resource" button).
2. Pass `breadcrumbOnly` to `PageHeaderWrapper` (or remove `PageHeaderWrapper` entirely since it returns null).
3. Replace `SectionInfluencedLayout` + `.resourceContentLayout` + `.filterPanel` + `.sectionsContainer` with:
   ```tsx
   <InsetContentArea toolbar={<ResourceHubToolbar />}>
     <div className={styles.sectionsContainer}>
       {/* same ResourceSection map as before */}
     </div>
   </InsetContentArea>
   ```
4. Filter panel opened via `openPanel({ id: 'resource-filters-panel', content: <ResourceFiltersPanel />, level: 'section', pattern: 'overlay', width: 'standard' })`.
5. Tab switching: Carbon `Tabs` `onTabClick` updates `activeTab` state; also calls `closeSectionPanels()`.
6. Migrate tab state from custom `'assets' | 'prompts' | 'policies' | 'monitoring'` string union — same logic, just triggered by Carbon Tabs `selectedIndex` / `onClick`.

### CSS changes in `ResourceHubPage.module.css`
- Remove: `.resourceContentLayout`, `.filterPanel`, `.filterPanelText`, `.addButton`, `.addIcon`, `.buttonText`
- Keep: `.sectionsContainer` (grid unchanged — subgrid rationale still applies), `.loadingMessage`, `.emptyMessage`, `.findFilter*` classes (reused for toolbar)
- Add: `.toolbar` (flex row, height 48px, align-items center), `.searchExpander` (width transition), `.filterDot` (dirty indicator)

---

## Phase 6 — Container queries for card grid

**File:** `src/app/components/CardLayout/CardGrid.tsx` (or its CSS module)

`InsetContentArea` sets `container-type: inline-size` on the scrollable content area. `CardGrid` can then use `@container` rules to change column count:

```css
/* CardGrid.module.css addition */
@container (max-width: 600px) {
  .cardGrid { grid-template-columns: 1fr; }
}
@container (min-width: 600px) and (max-width: 960px) {
  .cardGrid { grid-template-columns: repeat(2, 1fr); }
}
@container (min-width: 960px) {
  .cardGrid { grid-template-columns: repeat(3, 1fr); }
}
```

Requires reading `CardGrid.tsx` to confirm current column rule before editing.

---

## Files to Create

| Path | Purpose |
|------|---------|
| `src/app/components/layouts/InsetContentArea/InsetContentArea.tsx` | Component |
| `src/app/components/layouts/InsetContentArea/InsetContentArea.module.css` | Styles |
| `src/app/components/layouts/InsetContentArea/index.ts` | Barrel |
| `src/app/components/layouts/InsetContentArea/readme.md` | Human docs |
| `src/app/components/layouts/InsetContentArea/readme.agents.md` | Agent context |
| `src/app/components/ResourceHub/ResourceFiltersPanel.tsx` | Filter panel placeholder |

## Files to Modify

| Path | Change |
|------|--------|
| `src/app/components/PageHeaderWrapper.tsx` | Add `breadcrumbOnly` prop |
| `src/app/components/pages/ResourceHubPage.tsx` | Full refactor (toolbar, tabs, panel) |
| `src/app/components/pages/ResourceHubPage.module.css` | Remove dead classes, add toolbar classes |
| `src/app/components/ResourceHub/index.ts` | Export `ResourceFiltersPanel` |
| `src/app/components/CardLayout/CardGrid.tsx` or its CSS module | Add container queries |

---

## Verification

1. Visual at 1280 / 1440 / 1920px — inset card with outer gutter visible
2. Filter button toggles panel; dirty dot appears when panel is open; panel closes when button pressed again
3. Search icon expands to input with 240ms animation; collapses on blur/Escape
4. Tab switching updates content and closes any open section panels
5. "Add resource" button is gone
6. Card grid reflows columns at different container widths
7. `tsc --noEmit` passes (or project TypeScript check)
8. No regression on other pages (AppLayout, breadcrumb, assistant panel still work)
