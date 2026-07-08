# CarbonHeader

Phase 4A replacement for the custom `GlobalHeader`. Uses official `@carbon/react` UI Shell components inside a `<Theme theme="g100">` wrapper so Carbon's dark-header token set is scoped correctly.

## Carbon components used

| Carbon component | Role |
|---|---|
| `Header` | Root shell header element (`<header role="banner">`) |
| `HeaderMenuButton` | Hamburger toggle — shows close icon when `isActive` |
| `HeaderName` | "IBM · Decision Intelligence" product wordmark |
| `HeaderGlobalBar` | Right-side action button container |
| `HeaderGlobalAction` | Documents, Decision Assistant, Help, and User buttons |
| `SkipToContent` | Accessibility skip link |
| `Theme` | Applies g100 (dark) Carbon token scope |

## Props

```ts
interface CarbonHeaderProps {
  isNavigationOpen: boolean;     // drives HeaderMenuButton isActive
  onToggleNavigation: () => void; // hamburger click handler
  onNavigate?: (route: string) => void; // used by Decision Assistant expand
}
```

## Panel interactions

Opens global panels via `usePanelManager()` (must be rendered inside `PanelManagerProvider`):

- **Decision Assistant** — `id: 'decision-assistant-panel'`, pattern: `'influence'`, level: `'global'`
- **Help** — `id: 'global-help-panel'`, pattern: `'overlay'`, level: `'global'`

Button `isActive` state derives from `isPanelOpen && currentPanel?.id === '<id>'`.

## "Give feedback" link

Rendered as a plain `<a>` element with class `styles.feedbackLink` positioned between `HeaderName` and `HeaderGlobalBar` via flexbox `margin-left: auto`. Not a Carbon `HeaderNavigation` item because it's a standalone CTA, not primary navigation.

## User avatar

`UserAvatar` is a stable inner component (not inline function) that renders a green circle with "DW" initials, passed as `children` to `HeaderGlobalAction`. Defined at module scope to avoid re-creation on each render.
