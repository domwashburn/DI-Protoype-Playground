# CarbonSideNav — Agent Context

> **For humans:** see `README.md`
> **Last updated:** 2026-03-05 (Phase 4B)

---

## What this is

The global L1 navigation panel. Replaced the custom `GlobalNavigationPanel` with official
`@carbon/react` SideNav UI Shell components in Phase 4B. Prop API matches
`NavigationPanel` exactly for import-swap compatibility.

Renders a slide-in side navigation with 7 primary nav links and two expandable groups
(Settings, Support). Operates in **overlay mode only** (`isPersistent={false}`).

---

## File map

```
/components/CarbonSideNav/
  CarbonSideNav.tsx           — component implementation
  CarbonSideNav.module.css    — scoped styles (badge, external link)
  index.ts                    — barrel export
  README.md                   — human-facing docs
  readme.agents.md            — this file
```

---

## Carbon components used

### `@carbon/react`
- `SideNav` — root side navigation shell element (`isPersistent={false}`)
- `SideNavItems` — list container
- `SideNavLink` — individual route link
- `SideNavMenu` — expandable group (Settings, Support)
- `SideNavMenuItem` — child item inside an expandable group

### `@carbon/icons-react`
- `Home`, `ChatBot`, `DecisionTree`, `Rule`, `Dashboard`, `Trophy`, `Catalog` — primary nav icons
- `Settings`, `Help` — expandable group icons
- `Launch` — external link indicator on support items

---

## Props interface

```ts
interface CarbonSideNavProps {
  isOpen: boolean;           // true = expanded (overlay visible)
  onClose: () => void;       // called by onOverlayClick (click outside)
  currentRoute: NavigationRoute;
  onNavigate: (route: NavigationRoute) => void;
}
```

---

## Primary navigation items

| Route | Label | Icon |
|-------|-------|------|
| `home` | Home | `Home` |
| `decision-assistant` | Decision assistant | `ChatBot` + Beta badge |
| `decision-automations` | Decision automations | `DecisionTree` |
| `rules-and-policies` | Rules and policies | `Rule` |
| `dashboards` | Dashboards | `Dashboard` |
| `objectives-and-goals` | Objectives | `Trophy` |
| `resource-hub` | Resource hub | `Catalog` |

---

## Behaviour

- `isPersistent={false}` — the SideNav is always in **overlay mode**. It slides in over content; it never pushes the page layout. Carbon automatically renders a scrim overlay behind it.
- `onOverlayClick={onClose}` — clicking the scrim calls `onClose`, which in `AppLayout` toggles `isNavigationOpen` to false.
- `expanded={isOpen}` — fully controlled; `CarbonSideNav` holds no internal open state.
- Nav clicks call `e.preventDefault()` (all hrefs are `#`) then `onNavigate(route)`.

---

## Known constraints / gotchas

1. **Must be a sibling of `CarbonHeader` inside a single `<Theme theme="g100">` wrapper.**
   The CSS sibling selector `.cds--header ~ .cds--side-nav` auto-offsets the SideNav
   below the 48px header. Breaking them apart into separate Theme wrappers breaks this.

2. **Overlay-only — never use `isPersistent={true}` here.** The DI shell layout does not have
   a push-nav layout. Setting `isPersistent={true}` will permanently shift all page content
   by 256px and break the panel system's right-offset calculations.

3. **`NavigationRoute` type** — imported from `../../types/navigation`. The `onNavigate` prop
   must receive a properly typed route string, not an arbitrary string.

4. **Beta badge is custom CSS** — `styles.betaBadge` / `styles.labelWithBadge` are scoped CSS module
   classes. Do not use Carbon's built-in tag/pill components inside `SideNavLink` children
   (they conflict with Carbon's nav item text truncation).

5. **No active state for expandable groups** — `SideNavMenu` items (Settings, Support) have
   no `isActive` prop wired. Active state is only tracked on `SideNavLink` items.

---

## Files it imports from

| Import | Source |
|--------|--------|
| `SideNav`, `SideNavItems`, etc. | `@carbon/react` |
| `Home`, `ChatBot`, etc. | `@carbon/icons-react` |
| `NavigationRoute` type | `../../types/navigation` |
| CSS module | `./CarbonSideNav.module.css` |

## Files that import it

| File | Notes |
|------|-------|
| `layouts/AppLayout.tsx` | Only consumer. Rendered as sibling to `CarbonHeader` inside `<Theme theme="g100">`. |
