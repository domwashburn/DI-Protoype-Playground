# SideRailNavigation — Agent Context

> **For humans:** no separate README exists; this file is the primary reference
> **Last updated:** 2026-03-05

---

## What this is

A **custom Carbon-compliant** navigation rail component used as the secondary (L2) navigation
inside the Automation Shell and the Decision Assistant shell. It is **not** a Carbon clone —
it intentionally deviates from Carbon's `SideNav` in layout and interaction to support
collapsed/expanded toggling, branch dropdowns, history sections, and a "new chat" action mode.

Approved as a custom component per `Guidelines.md`. Do not attempt to replace it with
`@carbon/react` `SideNav`.

---

## File map

```
/components/SideRailNavigation/
  SideRailNavigation.tsx      — root component (main entry point)
  SideRailNavigation.module.css
  SideRailHeader.tsx          — header with toggle button or newChatAction
  SideRailHeader.module.css
  SideRailNavItem.tsx         — individual nav item (icon + label + tooltip when collapsed)
  SideRailNavItem.module.css
  SideRailDivider.tsx         — section divider (shows label when expanded)
  SideRailDivider.module.css
  SideRailActionButton.tsx    — primary action button (e.g. "Open panel")
  SideRailActionButton.module.css
  SideRailHistoryItems.tsx    — history group renderer (visible only when expanded)
  SideRailHistoryItems.module.css
  SideRailBranchDropdown.tsx  — branch selector (shown inside the header when branches provided)
  SideRailBranchDropdown.module.css
  types.ts                    — all prop interfaces
  index.ts                    — barrel export
  readme.agents.md            — this file
```

---

## Barrel export (`index.ts`)

```ts
export { default as SideRailNavigation } from './SideRailNavigation';
export { default as SideRailHeader } from './SideRailHeader';
export { default as SideRailNavItem } from './SideRailNavItem';
export { default as SideRailDivider } from './SideRailDivider';
export { default as SideRailActionButton } from './SideRailActionButton';
export { default as SideRailHistoryItems } from './SideRailHistoryItems';
export { default as SideRailBranchDropdown } from './SideRailBranchDropdown';
export * from './types';
```

Import the root from the barrel: `import { SideRailNavigation } from '../SideRailNavigation'`.

---

## Carbon components used

### `@carbon/react`
- `Tooltip` (with `autoAlign`) — used by `SideRailNavItem` to show item labels when the rail is
  collapsed. CSS overrides prevent the Tooltip wrapper from breaking full-width item layout.

No other Carbon components are used. All other elements are custom HTML + CSS module tokens.

---

## Props interface (`SideRailNavigationProps`)

```ts
{
  sections: SideRailNavSection[];         // REQUIRED — nav item sections
  isExpanded?: boolean;                   // default: false
  onToggle?: () => void;                  // called when toggle button clicked
  headerTitle?: string;                   // default: 'Navigation'
  activeItemId?: string;                  // id of the currently active item
  onItemClick?: (itemId: string) => void; // called when a nav item is clicked
  className?: string;
  toggleIcon?: ReactNode;                 // custom toggle icon
  behavior?: 'overlay' | 'push';         // default: 'overlay'
  expandedItems?: Set<string>;            // ids of items with expanded children
  onToggleExpanded?: (itemId) => void;
  panelAction?: PanelActionProps;         // optional action button above nav items
  historyGroups?: HistoryGroup[];         // history section (visible only when expanded)
  positioning?: 'fixed' | 'relative';    // default: 'fixed'
  branches?: BranchOption[];             // branch dropdown in header
  selectedBranch?: string;
  onBranchChange?: (branchId) => void;
  onCollapseRail?: () => void;           // collapse rail on nav item click
  newChatAction?: NewChatAction;         // replaces toggle button with a primary action
}
```

### `SideRailNavSection`
```ts
{
  id: string;
  items: SideRailNavItem[];
  hasDividerAfter?: boolean;
  sectionType?: 'standard' | 'history';
  sectionLabel?: string;
  hideWhenCollapsed?: boolean;
  showWhenCollapsed?: boolean;
}
```

### `SideRailNavItem`
```ts
{
  id: string;
  label: string;
  icon: ReactNode;
  isActive?: boolean;
  isChild?: boolean;
  children?: SideRailNavItem[];
  onClick?: () => void;
}
```

---

## Positioning and height

When `positioning === 'fixed'` (default), the rail uses inline styles:
- `top: 88px` — accounts for global header (48px) + breadcrumb bar (40px)
- `height: calc(100% - 88px)`

When `positioning === 'relative'`, no inline style is set; the parent controls size.

---

## `newChatAction` mode

When `newChatAction` is provided, the collapse/expand toggle in the header is replaced by a
primary action button (used by the Decision Assistant sidebar). In this mode the rail does not
collapse — `isExpanded` should always be `true` and `onToggle` can be omitted.

---

## Known constraints / gotchas

1. **Not a Carbon `SideNav` — do not force Carbon nav patterns onto it.** Icon items, tooltips,
   branch dropdowns, and history sections are all custom. Carbon's `SideNavLink` is not used here.

2. **`Tooltip` wrapper CSS override required** — `@carbon/react` Tooltip wraps its child in a
   `<span>`. The CSS module has a `.tooltipWrapper` override that sets `display: block; width: 100%`
   to prevent the nav item from collapsing to inline width.

3. **History section is expanded-only** — `historyGroups` renders only when `isExpanded === true`.
   Items with `sectionType: 'history'` in `sections` are skipped in the primary loop; they are
   handled separately by `SideRailHistoryItems`.

4. **`activeItemId` must match `item.id` exactly** — active state comparison is strict equality.
   If navigation uses path strings and the item uses a route key, ensure they are normalised.

---

## Files that import it

| File | Notes |
|------|-------|
| `components/DecisionAutomationSideNav/DecisionAutomationSideNav.tsx` | Automation shell L2 nav |
| `components/CarbonDecisionAssistant/CarbonDecisionAssistant.tsx` | Decision Assistant history rail |
| `components/ChatSidebar/ChatSidebar.tsx` | Chat history sidebar |
