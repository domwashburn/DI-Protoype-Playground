# CarbonSideNav

Phase 4B replacement for the custom `NavigationPanel`. Uses official `@carbon/react` UI Shell `SideNav` components inside a `<Theme theme="g100">` wrapper.

## Carbon components used

| Carbon component | Role |
|---|---|
| `SideNav` | Slide-in overlay panel (`expanded` prop controls open/close) |
| `SideNavItems` | Container for all nav entries |
| `SideNavLink` | Each primary navigation link (7 items) |
| `SideNavMenu` | Expandable group (Settings, Support) |
| `SideNavMenuItem` | Items inside expandable groups |
| `Theme` | Applies g100 (dark) Carbon token scope |

## Props

```ts
interface CarbonSideNavProps {
  isOpen: boolean;                        // drives SideNav expanded
  onClose: () => void;                    // SideNav onOverlayClick handler
  currentRoute: NavigationRoute;          // drives SideNavLink isActive
  onNavigate: (route: NavigationRoute) => void;
}
```

## Navigation items

| Label | Route | Carbon icon |
|---|---|---|
| Home | `home` | `Home` |
| Decision assistant | `decision-assistant` | `ChatBot` |
| Decision automations | `decision-automations` | `DecisionTree` |
| Rules and policies | `rules-and-policies` | `Rule` |
| Dashboards | `dashboards` | `Dashboard` |
| Objectives | `objectives-and-goals` | `Trophy` |
| Resource hub | `resource-hub` | `Catalog` |

## Positioning

Rendered **after** `CarbonHeader` in `AppLayout` DOM order. Carbon's own CSS selector `.cds--header ~ .cds--side-nav` fires, automatically setting `top: 3rem` (48px) on the SideNav so it sits below the header with no additional CSS required.

## Beta badge

"Decision assistant" item wraps its label and badge in a `<span className={styles.labelWithBadge}>` flex row. The badge uses `--cds-tag-background-blue` / `--cds-tag-color-blue` tokens, matching the NavigationPanel's custom tag styling.
