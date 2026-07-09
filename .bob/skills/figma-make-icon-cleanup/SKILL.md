---
name: figma-make-icon-cleanup
description: Migrate raw SVG path files and lucide-react icons from Figma Make exports to @carbon/icons-react. Covers baseline snapshot capture, 1:1 icon mapping verification, component refactoring, and safe deletion of dead SVG files. Use whenever a component imports from svg-*.ts path files or from lucide-react.
---

# Figma Make Icon Cleanup

Use this skill whenever you encounter:
- Imports from `../../imports/svg-*.ts` or `../../imports/svg-*.tsx` path files
- Imports from `lucide-react`
- Inline `<svg>` blocks using `svgPaths.pXXXXXX` path keys
- Raw `<input>`, `<select>`, or custom `<button>` elements that should be Carbon components

Follow this workflow exactly. Do not skip phases. Do not delete any file before the build gate passes.

---

## Phase 1: Inventory

Before touching any code, fully understand what needs to change.

1. **List every SVG path file being imported** in the target component(s). Read each `svg-*.ts` file to extract its path keys.
2. **List every lucide-react icon** being imported. Note the exact icon name and where it is rendered.
3. **List every raw HTML element** (`<select>`, `<input type="text">`, `<button>`) that should be replaced with a Carbon component.
4. Record findings in this format before proceeding:

```
SVG FILES:
  svg-XXXXXXXX.ts → used for: [describe the visual shape]
  svg-YYYYYYYY.ts → used for: [describe the visual shape]

LUCIDE ICONS:
  Search → [where rendered, what it looks like]
  GripVertical → [where rendered, what it looks like]

RAW HTML:
  <input type="text"> → [what it does, Carbon replacement candidate]
  <select> → [what it does, Carbon replacement candidate]
```

Refer to `icon-mapping-reference.md` (in this skill folder) for known mappings from previous migrations.

---

## Phase 2: Baseline Snapshots (Playwright)

Before any code changes, capture screenshots of every icon and interactive element that will change.

1. **Add `data-testid` attributes** to each target element in the source components. These are permanent — keep them after the migration. Use descriptive names:
   - Format: `data-testid="[component]-[element-description]"` e.g. `data-testid="toolbar-grid-btn"`

2. **Create or update** `tests/icon-baselines.spec.ts` with a test that:
   - Navigates to each relevant route
   - For modal/overlay targets: opens the modal first
   - Clips each `data-testid` element to a tight PNG (use `locator.screenshot()`)
   - Saves to `.tmp/icon-baselines/<snapshot-name>.png`

3. **Run the spec** against the running dev server (`npm run dev`):
   ```bash
   npx playwright test tests/icon-baselines.spec.ts
   ```

4. **Verify each PNG** opens and shows the correct icon (not blank, not the wrong element).

Snapshot naming convention: `<component-kebab>-<icon-purpose>.png`
Examples: `toolbar-grid-icon.png`, `display-settings-pin-outline.png`, `homepage-chat-tile-icon.png`

---

## Phase 3: Icon Mapping Verification

For each SVG path file and lucide icon identified in Phase 1:

1. **Decode the SVG path shape** by reading the path data. Common patterns:
   - Horizontal tracks with circles = filter sliders → `SettingsAdjust`
   - Pin/tack shape = `Pin` / `PinFilled`
   - Arrow pointing right = `ArrowRight`
   - Magnifying glass = `Search` (or use Carbon `Search` component)
   - X / cross = `Close`
   - Vertical grip dots = `DragVertical`
   - Bracket shapes + dots = `Chat` or `WatsonxAi`
   - Arrow with tail (send) = `SendAlt`
   - Branching nodes = `Workflow` or `DecisionTree`

2. **Cross-reference with the Carbon icon library** using the Figma Desktop MCP:
   - Get a screenshot of the candidate Carbon icon from the [Carbon Icon Library Figma file](https://www.figma.com/community/file/1089055696623512692) if available, OR
   - Use `mcp__context7__query-docs` with library `/carbon-design-system/carbon` querying the specific icon name
   - Compare the screenshot against the baseline PNG captured in Phase 2

3. **Record the confirmed mapping** before writing any code:
   ```
   svg-8azqa4lekk.ts (p2acbe800 + pb1a8400) → SettingsAdjust [CONFIRMED via Playwright visual match]
   lucide GripVertical → DragVertical [CONFIRMED]
   lucide LayoutGrid → Grid [CONFIRMED]
   ```

4. **For ambiguous icons** (decorative tile icons, custom shapes): use the Figma Desktop MCP `get_screenshot` tool to capture the Figma source frame if available, and find the nearest semantic Carbon icon. Document the deviation if exact match isn't possible.

Refer to `icon-mapping-reference.md` for the pre-researched mapping table.

---

## Phase 4: Component Refactoring

Work one component at a time. Complete and verify each before moving to the next.

### 4a. Replace SVG path file icons

For each `<svg>` block using `svgPaths.pXXXXXX`:

```tsx
// BEFORE
import svgPaths from '../../imports/svg-XXXXXXXX';
<svg fill="none" viewBox="0 0 16 16">
  <path d={svgPaths.pXXXXXX} fill="#525252" />
</svg>

// AFTER
import { ArrowRight } from '@carbon/icons-react';
<ArrowRight size={16} aria-hidden />
```

Rules:
- Always use `aria-hidden` on decorative icons
- Match the `size` prop to the original SVG `viewBox` dimensions (16, 20, 24, or 32)
- Remove the `fill` prop — Carbon icons use `fill="currentColor"` by default
- If the icon is passed as `renderIcon` to a Carbon `Button`, do NOT wrap it — pass the component reference directly: `renderIcon={SettingsAdjust}`

### 4b. Replace lucide icons with Carbon icons

```tsx
// BEFORE
import { GripVertical, Search, X } from 'lucide-react';
<GripVertical size={16} />

// AFTER
import { DragVertical } from '@carbon/icons-react';
<DragVertical size={16} />
```

### 4c. Replace raw HTML elements with Carbon components

**Search input + icon:**
```tsx
// BEFORE
import { Search } from 'lucide-react';
<div className={styles.searchContainer}>
  <Search className={styles.searchIcon} />
  <input type="text" value={searchValue} onChange={...} />
</div>

// AFTER
import { Search } from '@carbon/react';
<Search
  id="toolbar-search"
  labelText="Search"
  placeholder="Search"
  value={searchValue}
  onChange={(e) => onSearchChange(e.target.value)}
  size="md"
/>
```

**Select / sort dropdown:**
```tsx
// BEFORE
<select value={sortValue} onChange={(e) => onSortChange(e.target.value)}>
  {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
</select>

// AFTER
import { Select, SelectItem } from '@carbon/react';
<Select
  id="toolbar-sort"
  labelText="Sort by"
  value={sortValue}
  onChange={(e) => onSortChange(e.target.value)}
  size="md"
>
  {sortOptions.map(opt => (
    <SelectItem key={opt.value} value={opt.value} text={opt.label} />
  ))}
</Select>
```

**Icon toggle (grid / list view):**
```tsx
// BEFORE
<button onClick={() => onViewModeChange('grid')} aria-label="Grid view">
  <LayoutGrid className={styles.viewIcon} />
</button>
<button onClick={() => onViewModeChange('list')} aria-label="List view">
  <List className={styles.viewIcon} />
</button>

// AFTER
import { ContentSwitcher, Switch } from '@carbon/react';
import { Grid, List } from '@carbon/icons-react';
<ContentSwitcher
  onChange={({ name }) => onViewModeChange(name as 'grid' | 'list')}
  selectedIndex={viewMode === 'grid' ? 0 : 1}
  size="md"
>
  <Switch name="grid" text="Grid view" renderIcon={Grid} hasIconOnly />
  <Switch name="list" text="List view" renderIcon={List} hasIconOnly />
</ContentSwitcher>
```

**Pin toggle button:**
```tsx
// BEFORE — custom SVG inline toggle
<button onClick={() => onTogglePin(id)}>
  <svg viewBox="0 0 16 16"><path d={isPinned ? PIN_PATH_FILLED : PIN_PATH_OUTLINE} /></svg>
</button>

// AFTER
import { IconButton } from '@carbon/react';
import { Pin, PinFilled } from '@carbon/icons-react';
<IconButton
  label={isPinned ? 'Unpin' : 'Pin to home'}
  kind="ghost"
  size="sm"
  onClick={() => onTogglePin(id)}
  renderIcon={isPinned ? PinFilled : Pin}
  disabled={!isPinned && !canPin}
/>
```

**Content switcher (tabs):**
```tsx
// BEFORE — custom button tabs
<button className={activeTab === 'all' ? styles.active : ''} onClick={() => setActiveTab('all')}>All</button>
<button className={activeTab === 'pinned' ? ''} onClick={() => setActiveTab('pinned')}>Pinned</button>

// AFTER
import { ContentSwitcher, Switch } from '@carbon/react';
<ContentSwitcher
  onChange={({ name }) => setActiveTab(name as 'all' | 'pinned')}
  selectedIndex={activeTab === 'all' ? 0 : 1}
  size="md"
>
  <Switch name="all" text="All" />
  <Switch name="pinned" text="Pinned" />
</ContentSwitcher>
```

---

## Phase 5: CSS Module Cleanup

After each component is refactored:

1. **Remove CSS classes that targeted replaced HTML elements** — any `.searchContainer`, `.searchIcon`, `.sortChevron`, `.viewButton`, `.viewIcon`, `.switcherButton` etc. that only styled the removed elements.
2. **Add Carbon component size overrides** only where the Carbon default doesn't match the design spec. Document why with a comment:
   ```css
   /* Override Carbon Search height to match 32px toolbar spec */
   .toolbar :global(.cds--search) { height: 32px; }
   ```
3. **No new inline styles** — all sizing/spacing must go in the CSS Module using `var(--cds-*)` tokens.

---

## Phase 6: Playwright Verification

After each component is migrated, run a visual comparison against the baselines:

```bash
npx playwright test tests/icon-baselines.spec.ts
```

The spec will compare new screenshots against the saved baselines. Review any diffs:
- **Acceptable diff**: icon is visually equivalent but rendered by Carbon (same shape, same size, different SVG internals)
- **Unacceptable diff**: wrong icon shape, wrong size, missing icon, broken layout

If an icon doesn't match the baseline, go back to Phase 3 and re-evaluate the Carbon icon candidate.

---

## Phase 7: Build Gate & File Deletion

Only after ALL components in scope are migrated and Playwright passes:

1. **Confirm zero remaining imports** from the migrated SVG files:
   ```bash
   grep -r "svg-XXXXXXXX" src/app/components src/app/layouts
   # must return 0 results
   ```

2. **Confirm zero remaining lucide imports**:
   ```bash
   grep -r "from 'lucide-react'" src/app/
   # must return 0 results
   ```

3. **Run `vite build`** — must pass with zero errors.

4. **Only if build passes**: delete the SVG path files that have been fully migrated.

5. **Run `vite build` again** after deletion to confirm nothing was missed.

---

## Rules

- **Never delete an SVG file before the build gate passes**
- **Never guess an icon name** — always verify via Playwright baseline comparison or Carbon MCP
- **Always keep `react-dnd`** if drag-and-drop is present — there is no Carbon equivalent
- **Never add `!important`** to CSS overrides without a documented reason
- **Keep `data-testid` attributes** — they are permanent accessibility aids, not temporary markers
- **One component at a time** — complete Phase 4–6 for one component before starting the next
