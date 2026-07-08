# Plan: Migrate ResourceHubPage Filter Panel to InsetLayout + PanelManager

## Context

The Resource Hub filter panel is currently implemented with local `filtersActive` state and a hand-rolled CSS grid layout (`resourceContentLayout` / `panelClosed`). The user has confirmed this should be migrated to use `InsetLayout` + `PanelManager`, matching how the Resource Detail info panel was migrated. `InsetLayout` and `PanelManager` are already in place and exported from `src/app/components/SidePanel/index.ts`. A `ResourceFiltersPanel` component already exists at `src/app/components/ResourceHub/ResourceFiltersPanel.tsx`.

## What Changes

### 1. `src/app/components/pages/ResourceHubPage.tsx`

- Add imports: `InsetLayout, usePanelManager` from `'../SidePanel'`; `ResourceFiltersPanel` from `'../ResourceHub/ResourceFiltersPanel'`
- Remove: `const [filtersActive, setFiltersActive] = useState(false)`
- Add: `const { openPanel, isPanelOpen, currentMainPanel } = usePanelManager()`
- Derive: `const filtersActive = isPanelOpen && currentMainPanel?.id === 'resource-filters'`
- Replace `handleFilterClick` body to call `openPanel`:
  ```tsx
  const handleFilterClick = () =>
    openPanel({
      content: <ResourceFiltersPanel />,
      level: 'section',
      pattern: 'inset',
      width: 'narrow',
      id: 'resource-filters',
    });
  ```
- Replace the `<div className={resourceContentLayout + panelClosed}>` wrapper and the `<aside>` with:
  ```tsx
  <InsetLayout side="right">
    <div className={styles.sectionsContainer}>
      {/* existing sections content unchanged */}
    </div>
  </InsetLayout>
  ```

### 2. `src/app/components/pages/ResourceHubPage.module.css`

Remove these classes (now owned by `InsetLayout`):
- `.resourceContentLayout`
- `.panelClosed`
- `.filterPanel`
- `.filterPanelHeader`
- `.filterPanelTitle`
- `.filterPanelDescription`
- `.filterPanelText`
- `.panelShell`

Keep unchanged: `.resourceHubPage`, `.sectionsContainer`, `.sectionShell`, `.tightCardGrid`, `.loadingMessage`, `.emptyMessage`

## Notes

- `InsetLayout` reads `isPanelOpen && currentPanel?.pattern === 'inset'` from PanelManager — no extra props needed beyond `side="right"`.
- `InsetLayout.container` already has `flex: 1; min-height: 0` — it fills the remaining height inside `.resourceHubPage` naturally.
- `filtersActive` boolean passed to `ResourceHubHeader` remains — it now derives from PanelManager state. Header filter button active state works correctly.
- Close button in `ResourceFiltersPanel → SampleSidePanel` calls `usePanelManager().closePanel()` — works automatically.
- No changes needed to `InsetLayout.tsx` or `InsetLayout.module.css`.

## Verification

1. Open Resource Hub — filter button inactive
2. Click filter button → filter panel appears on the right; sections narrow
3. Sections scroll independently from filter panel
4. Close button in filter panel closes it; sections expand to full width
5. Navigate away and back — panel is closed (section-level panel clears on route change)
