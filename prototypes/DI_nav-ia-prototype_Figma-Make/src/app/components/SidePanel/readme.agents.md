# SidePanel — Agent Context

> **For humans:** see `README.md`
> **Last updated:** 2026-03-05

---

## What this is

The full panel management system for the DI UI. Provides context, state, layout wrappers, and
content renderers for all side panels across the application.

Two independent slots can be open simultaneously:
- **Main slot** — page-level, section-level, and global-overlay panels (e.g. Help). Mutually exclusive: opening one closes the previous one.
- **Assistant slot** — the AI Decision Assistant. Always `level: 'global', pattern: 'influence'`. Independent of the main slot.

---

## File map

```
/components/SidePanel/
  index.ts                        — barrel export
  PanelManager.tsx                — context + two-slot state machine (PRIMARY API)
  SidePanelContext.tsx            — legacy single-boolean open/close context (bridging only)
  UniversalPanelWrapper.tsx       — outermost layout wrapper; renders assistant + page slots
  GlobalPanelRenderer.tsx         — fixed-position renderer for global-overlay panels
  AutomationShellPanelRenderer.tsx — page-level panel renderer inside the automation shell
  SectionPanelRenderer.tsx        — section-level panel renderer (used by page sections)
  SectionInfluencedLayout.tsx     — layout wrapper that shifts content when section panel opens
  InfluencedLayout.tsx            — layout wrapper that shifts content (push/influence pattern)
  GridLayout.tsx                  — layout wrapper for overlay/inset patterns
  InsetLayout.tsx                 — inset panel layout (section-level, expandable to sub-view)
  SubView.tsx                     — expanded sub-view shell for section-inset panels
  PanelTriggerButton.tsx          — standardised trigger button component
  PanelIntegration.tsx            — usePanelTriggers() integration hook
  SampleSidePanel.tsx             — dev/demo placeholder panel
  panels/                         — real panel content components
    AssetDetailsPanel.tsx
    DecisionAssistantPanel.tsx
    HelpPanel/                    — help panel sub-components
    ResourceDetailsPanel.tsx
    ServiceDetailsPanel.tsx
    ServiceAssetPanels.tsx
    SettingsPanel.tsx
    PlaceholderPanelA/B/C.tsx
```

---

## Barrel export (`index.ts`)

```ts
export { SidePanelProvider, useSidePanel } from './SidePanelContext';   // legacy
export { PanelManagerProvider, usePanelManager, usePanelTrigger } from './PanelManager';
export { default as UniversalPanelWrapper } from './UniversalPanelWrapper';
export { default as GlobalPanelRenderer } from './GlobalPanelRenderer';
export { default as AutomationShellPanelRenderer } from './AutomationShellPanelRenderer';
export { default as SectionPanelRenderer } from './SectionPanelRenderer';
export { default as SectionInfluencedLayout } from './SectionInfluencedLayout';
export { default as InfluencedLayout } from './InfluencedLayout';
export { default as GridLayout } from './GridLayout';
export { default as InsetLayout } from './InsetLayout';
export { default as SubView } from './SubView';
export { default as PanelTriggerButton } from './PanelTriggerButton';
export { usePanelTriggers } from './PanelIntegration';
export * from './panels';
```

Always import from the barrel (`../SidePanel`).

---

## PanelManager — core API

### `openPanel(config: PanelConfig)`
Routes by config: `level === 'global' && pattern === 'influence'` → assistant slot. Everything else → main slot.

### `PanelConfig` shape
```ts
{
  content: ReactNode;
  level?: 'page' | 'section' | 'global';
  pattern?: 'influence' | 'overlay' | 'inset';
  width?: 'narrow' | 'standard' | 'wide';
  id?: string;
  expandable?: boolean;         // assistant: full viewport; section-inset: sub-view
  expandedView?: ReactNode;     // section-inset only
  expandedTitle?: string;       // section-inset only
  expandedActions?: ReactNode;  // section-inset only
}
```

### Key context values
| Value | Purpose |
|-------|---------|
| `isPanelOpen` / `isMainPanelOpen` | Main slot open state |
| `currentPanel` / `currentMainPanel` | Main slot content |
| `isAssistantPanelOpen` | Assistant slot open state |
| `assistantPanel` | Assistant slot content |
| `isAssistantExpanded` | Assistant in full-viewport mode |
| `isSectionExpanded` | Section-inset sub-view is open |
| `subPanel` | Nested inset panel inside sub-view |

### Close actions
- `closePanel()` — closes main slot
- `closeAssistantPanel()` — closes assistant slot
- `closeSectionPanels()` — closes main slot only if it holds a section-level panel
- Both accept `{ immediate: true }` to skip the 300 ms CSS transition

---

## Renderer placement rules

| Panel level + pattern | Rendered by |
|-----------------------|-------------|
| `global` + `overlay` | `GlobalPanelRenderer` (fixed sibling outside shell) |
| `global` + `influence` | `UniversalPanelWrapper` outer `InfluencedLayout` (assistant slot) |
| `page` + any (standard routes) | `UniversalPanelWrapper` inner `GridLayout` or `InfluencedLayout` |
| `page` + any (automation-detail) | `AutomationShellPanelRenderer` (inside the automation shell) |
| `section` + `inset`/`influence` | `SectionPanelRenderer` + `SectionInfluencedLayout` |

---

## CSS custom properties set by PanelManager

| Property | Value when open | Consumers |
|----------|----------------|-----------|
| `--assistant-panel-offset` | `320px` | Right-anchored panel renderers |
| `--assistant-panel-frozen` | `1` while assistant is expanded | Suppress layout transitions |
| `--panel-top-offset` | `88px` (with breadcrumb) / `48px` | Panel position from top |

---

## Known constraints / gotchas

1. **`UniversalPanelWrapper` must wrap `<Outlet />`** — the `AppLayout` shell must render `UniversalPanelWrapper` as the outermost content wrapper, with `<Outlet>` inside. Placing it inside a child breaks the assistant push layout.

2. **`renderPanel={false}` on automation-detail** — `AppLayout` passes `renderPanel={false}` to `UniversalPanelWrapper` when on the `automation-detail` route. The automation shell has its own `AutomationShellPanelRenderer`; if `renderPanel` is left `true`, page panels render twice.

3. **Opening the assistant auto-closes global-overlay panels** — e.g. opening the Decision Assistant while Help is open will close Help. Page/section panels are unaffected.

4. **Navigating to `decision-assistant` route force-closes the assistant slot** — the route IS the assistant; the floating slot would duplicate it.

5. **Non-global panels close immediately on route change** — global panels (Help, Assistant) persist. Page/section panels close with `{ immediate: true }` on route change.

6. **Same-ID toggle** — calling `openPanel()` with the same `id` as the current panel acts as a close toggle (both slots). Always set a stable `id` in configs.

7. **`SidePanelContext` is legacy** — it is a simple boolean toggle used by lower-level layout components (`InfluencedLayout`, `GridLayout`). New code should use `usePanelManager` only.

---

## Files it imports from

| Import | Source |
|--------|--------|
| React primitives | `react` |
| Panel content | `./panels/*` |
| Layout components | `./InfluencedLayout`, `./GridLayout` |
| Context bridge | `./SidePanelContext` |

## Files that import it

| File | What it uses |
|------|-------------|
| `layouts/AppLayout.tsx` | `PanelManagerProvider`, `usePanelManager`, `UniversalPanelWrapper`, `GlobalPanelRenderer`, `ServiceDetailsPanel`, `SettingsPanel` |
| `components/ApplicationLayoutTemplate/ApplicationLayoutTemplate.tsx` | `PanelManagerProvider`, `usePanelManager`, `SectionInfluencedLayout`, `AutomationShellPanelRenderer`, `ServiceDetailsPanel`, `SettingsPanel` |
| `components/CarbonHeader/CarbonHeader.tsx` | `usePanelManager`, `DecisionAssistantPanel`, `HelpPanel` |
| `components/BreadcrumbActionBar/` | `usePanelTriggers`, `usePanelManager` |
| Various page components | `usePanelManager`, `SectionPanelRenderer`, specific panel content |
