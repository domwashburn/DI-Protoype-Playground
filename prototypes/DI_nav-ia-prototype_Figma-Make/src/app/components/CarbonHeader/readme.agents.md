# CarbonHeader — Agent Context

> **For humans:** see `README.md`
> **Last updated:** 2026-03-05 (Phase 4A)

---

## What this is

The global application header. Replaced the custom `GlobalHeader` with official
`@carbon/react` UI Shell Header components in Phase 4A. Prop API is intentionally
identical to `GlobalHeader` so `AppLayout` required only an import-swap.

Renders: hamburger menu button → IBM logo + product name → feedback link →
Decision Assistant toggle → Help toggle → user avatar.

---

## File map

```
/components/CarbonHeader/
  CarbonHeader.tsx            — component implementation
  CarbonHeader.module.css     — scoped styles (userAvatar, feedbackLink, menuButton)
  index.ts                    — barrel export
  README.md                   — human-facing docs
  readme.agents.md            — this file
```

---

## Carbon components used

### `@carbon/react`
- `Header` — root shell header element
- `HeaderMenuButton` — hamburger icon button
- `HeaderName` — product name with IBM prefix
- `HeaderGlobalBar` — right-side action cluster
- `HeaderGlobalAction` — individual icon action button (used for Assistant, Help, User)
- `SkipToContent` — accessibility skip link

### `@carbon/icons-react`
- `ChatBot` — Decision Assistant action button icon
- `Help` — Help panel action button icon

---

## Props interface

```ts
interface CarbonHeaderProps {
  isNavigationOpen: boolean;
  onToggleNavigation: () => void;
  onNavigate?: (route: string) => void;
  /** Suppress the Assistant button when on the decision-assistant page. */
  currentRoute?: string;
}
```

---

## Behaviour

- **Help button** — opens a `global` + `overlay` panel via `openPanel()`. Closes the nav drawer first if open.
- **Assistant button** — opens `DecisionAssistantPanel` as `global` + `influence` (assistant slot). Hidden when `currentRoute === 'decision-assistant'`.
- **Hamburger button** — calls `onToggleNavigation()`. Does NOT manage its own open state.

---

## Known constraints / gotchas

1. **Must be a sibling of `CarbonSideNav` inside a single `<Theme theme="g100">` wrapper.**
   Carbon's CSS uses the `.cds--header ~ .cds--side-nav` sibling selector to automatically
   offset the SideNav top by 48px. Wrapping Header and SideNav in separate `<Theme>` elements
   breaks this selector and causes the SideNav to overlap the header.

2. **`usePanelManager()` dependency** — `CarbonHeader` calls `usePanelManager()` directly, so it
   must be rendered inside a `PanelManagerProvider`. In `AppLayout`, the Provider wraps the entire
   `AppShell`, so this is satisfied automatically.

3. **`isPersistent` is not used here** — `CarbonHeader` does not render `CarbonSideNav`; the
   overlay behaviour is entirely controlled by `CarbonSideNav`'s `isPersistent={false}` prop.
   Opening the nav drawer from the hamburger only calls `onToggleNavigation`.

4. **Assistant button is conditionally hidden, not disabled** — when on the `decision-assistant`
   route the button is removed from the DOM (`!isOnAssistantPage && (...)`) rather than shown
   as disabled. Do not attempt to render it as `disabled` — the full-page assistant route
   is the replacement.

5. **`UserAvatar` renders initials ("DW") as a hardcoded placeholder.** It is passed as
   `renderIcon` to `HeaderGlobalAction`. No user auth is wired.

---

## Files it imports from

| Import | Source |
|--------|--------|
| `Header`, `HeaderMenuButton`, etc. | `@carbon/react` |
| `ChatBot`, `Help` | `@carbon/icons-react` |
| `DecisionAssistantPanel`, `HelpPanel`, `usePanelManager` | `../SidePanel` |
| CSS module | `./CarbonHeader.module.css` |

## Files that import it

| File | Notes |
|------|-------|
| `layouts/AppLayout.tsx` | Only consumer. Renders inside `<Theme theme="g100">` sibling with `CarbonSideNav`. |
