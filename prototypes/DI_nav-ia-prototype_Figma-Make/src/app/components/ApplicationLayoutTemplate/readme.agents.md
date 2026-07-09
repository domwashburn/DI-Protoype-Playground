# ApplicationLayoutTemplate — Agent Context

> **For humans:** see inline JSDoc in `ApplicationLayoutTemplate.tsx`
> **Last updated:** 2026-03-05

---

## What this is

The **Automation Shell** — the full-page layout for viewing an individual decision automation.
It is an SPA-within-an-SPA: once the user drills into a specific automation, this component
renders a persistent shell (breadcrumb bar + side rail + panel system) and swaps internal
**views** without triggering React Router navigation at the L1 level.

Instantiated by the router at the `automation-detail` route. The global `AppLayout` header and
side nav remain visible above/behind it.

---

## Terminology

| Term | Meaning |
|------|---------|
| Application Shell | `AppLayout` — global header, L1 nav, content area |
| Automation Shell | This component — breadcrumb + action bar + side rail + view content |
| View | The content area rendered inside the shell (`automation-overview`, `services`, `asset-detail`, etc.) |

---

## Architecture

```
ApplicationLayoutTemplate
├── PanelManagerProvider        — own panel scope (independent of AppLayout's)
│   ├── AutomationShellPanelRenderer  — page-level panel renderer
│   ├── BreadcrumbActionBar     — sticky breadcrumb + branch controls
│   ├── DecisionAutomationSideNav — left side rail (SideRailNavigation)
│   └── SectionInfluencedLayout — wraps section content; shifts when section panel opens
│       └── [current view component]
```

The component wraps its entire subtree in a **second** `PanelManagerProvider`. This is intentional
— the automation shell's page/section panels are scoped to the shell and must not interfere
with `AppLayout`'s global panels (Help, Assistant).

---

## Internal view routing

`viewState` is an `AutomationViewState` object managed via `useState`. The `DecisionAutomationSideNav`
updates it on click; no React Router navigation occurs. Views include:

`automation-overview`, `services`, `asset-detail`, `branches`, `history`, `updates`,
`test-automation`, `deploy-automation`, `monitor-automation`, `versions`,
`automation-settings`, `decision-model`, `task-model`, `predictive-model`,
`optimization-model`, `genai-node`, `rules-and-policies`, `decision-outcomes`

---

## Key imports

| Import | Source | Notes |
|--------|--------|-------|
| `PanelManagerProvider`, `usePanelManager`, `SectionInfluencedLayout`, `AutomationShellPanelRenderer`, `ServiceDetailsPanel`, `SettingsPanel` | `../SidePanel` | Own panel scope |
| `DecisionAutomationSideNav` | `../DecisionAutomationSideNav` | Side rail for automation views |
| `InboxLayoutTemplate`, `InboxPanelHeader`, `InboxActionButton`, `InboxPanelToolbar`, `InboxPanelList`, `AddIcon` | `../InboxLayout` | Services and objectives list panels |
| `BreadcrumbActionBar` | `../BreadcrumbActionBar` | Breadcrumb + branch switcher bar |
| `PageHeader` | `../PageHeader` | Section-level page titles |
| `CardGrid` | `../CardLayout/CardGrid` | Card grids in overview/objectives |
| `DecisionAssetsTable`, `DataModelsTable` | `../DecisionAssetsTable`, `../DataModelsTable` | Asset listing tables |
| `ObjectiveHierarchyTree` | `../ObjectiveHierarchyTree` | Objective tree view |
| Page components (13) | `../pages/*` | Each view is a separate page component |
| `useServices`, `useAssets`, `useObjectives`, `useGoals`, `useAutomations` | `../../data/hooks` | Data layer |
| `useParams` | `react-router` | Resolves `automationId` from URL |

---

## Props interface

```ts
interface ApplicationLayoutTemplateProps {
  navigationBehavior?: 'overlay' | 'push';   // default: 'overlay'
  currentBranch?: string;                     // default: 'main'
  onBranchChange?: (branchId: string) => void;
  branches?: Array<{ id: string; name: string; isActive?: boolean }>;
  automationId?: string;      // if omitted, resolved from useParams()
  automationName?: string;
  initialView?: AutomationViewState;
  onViewStateChange?: (ctx: { view; serviceName?; serviceId?; assetName?; assetType? }) => void;
  navigationRef?: React.MutableRefObject<{
    navigateToView: (view, options?) => void;
  } | null>;
}
```

`navigationRef` is used by `AppLayout`'s breadcrumb to programmatically navigate the shell
back to overview or services when a breadcrumb crumb is clicked.

---

## Known constraints / gotchas

1. **Own `PanelManagerProvider` scope** — this component creates a nested `PanelManagerProvider`.
   `usePanelManager()` inside the shell resolves to the shell's provider, not `AppLayout`'s.
   Opening a panel inside the shell does NOT affect the global Help/Assistant state.

2. **`AutomationShellPanelRenderer` must be rendered, and `AppLayout` must pass `renderPanel={false}`**
   to `UniversalPanelWrapper` for the `automation-detail` route. If `renderPanel={true}` is left
   set, page-level panels render twice (both wrappers attempt to claim `currentPanel`).

3. **`automationId` dual-source** — resolved from `automationIdProp ?? routeAutomationId`. The
   prop takes precedence for backward-compatible sub-component usage outside the router.

4. **`SectionInfluencedLayout` wraps only the section content area**, not the full shell.
   `PageHeader` is intentionally rendered *outside* `SectionInfluencedLayout` so it stays
   fixed while the content below shifts for section panels.

5. **`onViewStateChange` is called upward to `AppLayout`** — `AppLayout` uses this to update
   the breadcrumb trail (e.g., showing service name and asset name in the global breadcrumb).

---

## Files that import it

| File | Notes |
|------|-------|
| `app/routes.tsx` | Mounted at the `automation-detail` route |
