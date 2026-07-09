# CardLayout — Agent Context

> **For humans:** see `README.md`
> **Last updated:** 2026-03-05 (Phase 7A)

---

## What this is

A 4-component family for card-based page layouts: a responsive grid container,
a toolbar with sort/search/view-toggle controls, and a full-featured composite
template that combines them. Used on `DecisionAutomationsPage`, `ResourceHubPage`,
`HomePage`, `AutomationOverviewPage`, and `ObjectivesAndGoalsPage`.

---

## File map

```
/components/CardLayout/
  index.ts                  — barrel export
  CardLayoutTemplate.tsx    — composite: toolbar + CardGrid (main entry point)
  CardLayoutTemplate.module.css
  CardGrid.tsx              — responsive container-query grid
  CardGrid.module.css
  CardLayoutToolbar.tsx     — sort / search / view-toggle bar (Carbon Select, Search, @carbon/icons-react Grid + List)
  CardLayoutToolbar.module.css
  Card.tsx                  — individual card; CardHeader, CardContent, CardFooter sub-components
  Card.module.css
  README.md                 — human-facing docs
  readme.agents.md          — this file
```

---

## Barrel export (`index.ts`)

```ts
export { default } from './CardLayoutTemplate';       // default export
export { default as CardLayoutTemplate } from './CardLayoutTemplate';
export { default as CardGrid } from './CardGrid';
export { default as CardLayoutToolbar } from './CardLayoutToolbar';
export { default as Card, CardHeader, CardContent, CardFooter } from './Card';
```

---

## Component decision guide

| Need | Use |
|------|-----|
| Full page with toolbar + responsive grid | `CardLayoutTemplate` (default export) |
| Just the responsive grid, no toolbar | `CardGrid` directly |
| Custom layout wrapper, bypass grid | `CardLayoutTemplate` with `customContainer` prop |
| Individual card component | `Card` |
| Toolbar standalone | `CardLayoutToolbar` |

---

## Props (quick reference)

### `CardLayoutTemplate`
```ts
{
  toolbarProps?: CardLayoutToolbarProps;
  children: ReactNode;
  viewMode?: 'grid' | 'list';     // default: 'grid'
  hideToolbar?: boolean;           // default: false
  customContainer?: boolean;       // default: false — bypasses CardGrid wrapping
}
```

### `CardGrid`
```ts
{
  children: ReactNode;
  viewMode?: 'grid' | 'list';  // default: 'grid'
  className?: string;
}
```
Responsive breakpoints (container queries, not viewport):
- `< 672px` → 1 column
- `672px+` → 2 columns
- `1056px+` → 3 columns
- `1584px+` → 4 columns

### `CardLayoutToolbar`
```ts
{
  sortOptions?: SortOption[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;       // default: 'Search'
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode) => void;
  hideSort?: boolean;               // default: false
  hideSearch?: boolean;             // default: false
  hideViewToggle?: boolean;         // default: false
}
```

---

## Carbon components used

### `@carbon/react` (in `CardLayoutTemplate`)
- `Grid`, `Column` — structural layout for toolbar and grid content areas (Phase 7A)

### `@carbon/icons-react` (in `CardLayoutToolbar`)
- `ChevronDown`, `Search`, `LayoutGrid`, `List` — toolbar icons

`CardLayoutToolbar` is a **migration target**. It uses a custom `<select>` for sort, a
hand-rolled `<input>` for search, and `<button>` elements for the view toggle. These are
not Carbon components. Do not assume Carbon patterns apply to this component's internals.

---

## Known constraints / gotchas

1. **`CardGrid` uses container queries, not Carbon's `Grid`** — the responsive column layout
   is driven by `@container` rules in `CardGrid.module.css`. Do not wrap `CardGrid` in a
   Carbon `<Grid>` column that is itself too narrow — the container query measures the
   `cardGridContext` wrapper, not the viewport.

2. **`CardLayoutTemplate` wraps toolbar + grid in Carbon `<Grid fullWidth>` + `<Column lg={16}`**
   — this provides the correct gutter spacing per Phase 7A. When using `CardGrid` directly,
   you are responsible for the outer gutter context.

3. **`CardLayoutToolbar` is now Carbon-compliant** — it uses Carbon `Select`, `Search`, and `@carbon/icons-react` `Grid`/`List` icons. The migration was completed in the repo-cleanup sprint.
   `<select>` element. A migration to `@carbon/react` `Search`, `Dropdown`, and icon buttons
   is planned but not yet scheduled.

4. **`customContainer={true}` bypasses `CardGrid`** — use this when you need a non-standard layout
   (e.g., a full-width list without card grid breakpoints). `children` renders directly.

---

## Files that import it

| File | Components imported |
|------|---------------------|
| `pages/DecisionAutomationsPage.tsx` | `CardLayoutTemplate`, `Card`, `CardMenuItem` |
| `pages/ResourceHubPage.tsx` | `Card`, `CardGrid` |
| `pages/ObjectivesAndGoalsPage.tsx` | `CardGrid` (direct file import) |
| `pages/AutomationOverviewPage.tsx` | `CardGrid` (direct file import) |
| `components/HomePage/HomePage.tsx` | `Card`, `CardGrid` |
| `components/ApplicationLayoutTemplate/ApplicationLayoutTemplate.tsx` | `CardGrid` (direct file import) |
