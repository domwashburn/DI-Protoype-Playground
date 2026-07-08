# InboxLayout — Agent Context

> **For humans:** see `README.md`
> **Last updated:** 2026-03-05 (Phase 8A)

---

## What this is

A 5-component family that implements a master-detail "inbox" panel layout:
320 px fixed sidebar + flexible main content area.

**Phase 8A complete.** All components are now classified as **Custom Carbon-compliant**:
- `InboxPanelToolbar` replaced its hand-rolled `<input>` + `<button>` with
  `@carbon/react` `Search` (size="md") and `@carbon/react` `Button` (ghost, icon-only).
- `InboxLayoutTemplate`, `InboxPanelHeader`, `InboxPanelList` relabeled from
  "Carbon Clone" to "Custom Carbon-compliant" — no structural changes.
- `InboxActionButton` was already "Custom Carbon-compliant" (relabeled in Phase 3D).

---

## File map

```
/components/InboxLayout/
  index.ts                    — barrel export (all 5 components + legacy icon re-exports)
  InboxLayoutTemplate.tsx     — root layout (sidebar + content flex container)
  InboxLayoutTemplate.module.css
  InboxPanelHeader.tsx        — 48 px panel title bar, heading-03 typography
  InboxPanelHeader.module.css
  InboxPanelToolbar.tsx       — custom search input + filter icon button (40 px)
  InboxPanelToolbar.module.css
  InboxPanelList.tsx          — scrollable list; data-driven or composition mode
  InboxPanelList.module.css
  InboxActionButton.tsx       — primary or combo (split) action button
  InboxActionButton.module.css
  icons.tsx                   — legacy named icon wrappers (SearchIcon, FilterIcon, AddIcon)
  README.md                   — human-facing docs
  readme.agents.md            — this file
```

---

## Barrel export (`index.ts`)

```ts
export { default as InboxLayoutTemplate } from './InboxLayoutTemplate';
export { default as InboxPanelHeader }    from './InboxPanelHeader';
export { default as InboxPanelToolbar }   from './InboxPanelToolbar';
export { default as InboxActionButton }   from './InboxActionButton';
export { default as InboxPanelList }      from './InboxPanelList';
export { SearchIcon, FilterIcon, AddIcon } from './icons'; // legacy compat
```

Always import from the barrel (`../InboxLayout`), never from individual files.

---

## Consumer map

| File | Components imported |
|------|---------------------|
| `/components/ApplicationLayoutTemplate.tsx` | `InboxLayoutTemplate`, `InboxPanelHeader`, `InboxActionButton`, `InboxPanelToolbar`, `InboxPanelList`, `AddIcon` |
| `/components/pages/BranchesPage.tsx` | `InboxLayoutTemplate`, `InboxPanelHeader`, `InboxPanelToolbar`, `InboxActionButton`, `InboxPanelList`, `AddIcon`, `SearchIcon`, `FilterIcon` |
| `/components/pages/ObjectivesAndGoalsPage.tsx` | `InboxLayoutTemplate`, `InboxPanelHeader`, `InboxActionButton`, `InboxPanelToolbar`, `InboxPanelList`, `AddIcon`, `SearchIcon`, `FilterIcon` |

`/components/LargeListItem.tsx` references InboxLayoutTemplate in a **comment only** (structural alignment note) — not an import.

---

## Internal dependencies

| Import | From | Migration status |
|--------|------|-----------------|
| `Button` | `@carbon/react` | ✅ Phase 3A complete |
| `Tearsheet` | `@carbon/ibm-products` | ✅ Phase 3D complete — 1:1 replacement, `isOpen→open`, actions array |
| `ChevronDown`, `Search`, `Filter`, `Add` | `@carbon/icons-react` | ✅ Already Carbon |
| `LargeListItem` | `../LargeListItem` | Custom Carbon-compliant, no replacement planned |

---

## Props interfaces (quick reference)

### InboxLayoutTemplate
```ts
{ sidebar: ReactNode; children: ReactNode; className?: string }
```

### InboxPanelHeader
```ts
{ title: string; actions?: ReactNode; className?: string }
```

### InboxPanelToolbar
```ts
{
  searchPlaceholder?: string;  // default: 'Search'
  searchValue?: string;        // controlled; uncontrolled if omitted
  onSearchChange?: (value: string) => void;
  showFilter?: boolean;        // default: true
  onFilterClick?: () => void;
  className?: string;
  // @deprecated: SearchIcon, FilterIcon props (kept for backward compat)
}
```

### InboxPanelList
```ts
{
  items?: { id: string; name: string; details?: string[]; description?: string }[];
  selectedItemId?: string | null;
  onItemClick?: (id: string) => void;
  onMenuAction?: (action: string, id: string) => void;
  getMenuItems?: (itemId: string) => LargeListItemMenuItem[];
  variant?: 'details' | 'description'; // default: 'details'
  children?: ReactNode;                // composition mode (when items omitted)
  className?: string;
}
```

### InboxActionButton
```ts
{
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  menuItems?: { label: string; onClick: () => void }[];
  variant?: 'primary' | 'combo'; // default: 'primary'
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg'; // default: 'md'
  fullWidth?: boolean;           // default: false
}
```

---

## Known issues / tech debt

1. **`InboxActionButton` has an inline `style` prop** — the dropdown-separator
   border (`borderLeft: '1px solid rgba(255,255,255,0.3)'`) is a hardcoded
   value in `InboxActionButton.module.css`. Track for cleanup in Phase 10.

2. ~~**`InboxPanelToolbar` is a custom `<input>`**~~ — **Resolved in Phase 8A.**
   Now uses `@carbon/react` `Search` + `Button`.

3. **`InboxActionButton` combo tearsheet is a stub** — the tearsheet body is
   placeholder content (`console.log` on primary/secondary click). Consumers
   are expected to pass real `menuItems[].onClick` handlers. The tearsheet
   wiring inside `InboxActionButton` is temporary scaffolding.

4. **`ObjectivesAndGoalsPage` imports `NavigationRoute` from `../../App`** —
   this is a Phase 1C concern (not InboxLayout's responsibility), but agents
   editing this page should note the circular-ish dependency.

---

## Migration targets

| Phase | Action |
|-------|--------|
| **3A** | ✅ Replace `Button` import from `../Carbon` with `@carbon/react` Button |
| **3C** | ✅ Replace `OverflowMenu` import with `@carbon/react` OverflowMenu + OverflowMenuItem |
| **3D** | ✅ Replace `Tearsheet` import with `@carbon/ibm-products` Tearsheet — `open`, `onClose`, `actions[]` |
| **8A** | ✅ Replace custom `<input>` in `InboxPanelToolbar` with `@carbon/react` `Search`; relabel all 5 components "Custom Carbon-compliant"; `ComboButton` evaluation → kept custom (no IBM Products equivalent matches the split-primary pattern) |

---

## Styling conventions

- All CSS via Carbon tokens (`var(--cds-*)`) in `.module.css` files.
- No hardcoded hex or pixel values **except** the one inline style noted above.
- Sidebar width: `320px` (Carbon panel standard).
- Header height: `48px`.
- Toolbar height: `40px` (Carbon compact search height).
- Uses `<div>` not `<p>` for all text nodes (global `@layer base p` font-size poisoning).