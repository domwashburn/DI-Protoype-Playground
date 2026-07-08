# Plan — Continuous panel orchestration transitions

## Context

The inset panel mounts/unmounts with a slide+fade now, but expanding the panel into its sub-view (and opening the sub-view's nested panel) reads as two separate cross-fades rather than one continuous motion.

Today:
- Expand cross-fades `.panelWrapper` (slides off) with `.expandedOverlay` (fades in) — the panel "jumps off then back on."
- Open inner panel slides the nested inset in *on top of* unchanged sub-view content rather than the sub-view making room.

Target (mirror the assistant in `InfluencedLayout.module.css` lines 68–94):

```css
.globalSidePanel { width: 320px; transition: width var(--cds-expressive-02) …; }
.globalSidePanel[data-panel-expanded="true"] { width: 100%; }
```

One element, width animates. Inner content reflows as the wrapper grows.

## Outcome

- Expanding the inset panel is **one wrapper widening in place**; the sub-view emerges as a second column inside it. `currentPanel.content` never unmounts.
- Opening the inner panel makes the sub-view body compress to make room while the inner inset slides in from the right — driven by the same expressive tokens.

## Files

- `src/app/components/SidePanel/InsetLayout.tsx` — collapse the two render branches into one wrapper with slot children.
- `src/app/components/SidePanel/InsetLayout.module.css` — add `width` transition; replace the expanded-shell classes with `.panelSlot` / `.subViewSlot` / `.nestedSlot`.
- `src/app/components/SidePanel/SubView.module.css` — verify `min-width: 0; overflow: auto` on body so flex reflow works.

Reuses: `isSectionExpanded` + `isSectionExpandedMounted` + `subPanel` + `isSubPanelOpen` (already in `PanelManager.tsx`), `var(--cds-expressive-02, 240ms) cubic-bezier(0.4, 0.14, 0.3, 1)`, `panel.width` token → `data-width`. Attach/detach divider rules (`data-attached="true"`) move from the old expanded wrappers to the new slot selectors.

## Implementation

### 1. Single wrapper, three slots (`InsetLayout.tsx`)

Render once whenever `currentPanel?.content` exists:

```jsx
<div
  className={[styles.panelWrapper, side === 'right' ? styles.wrapperRight : styles.wrapperLeft].join(' ')}
  data-panel-open={isPanelOpen ? 'true' : 'false'}
  data-expanded={isExpandedSectionOpen ? 'true' : 'false'}
  data-attached={isSubViewAttached ? 'true' : 'false'}
  data-width={panelWidth}
>
  <div className={styles.panelSlot}>
    <div className={styles.panelShell}>{currentPanel.content}</div>
  </div>

  {isSectionExpandedMounted && (
    <div className={styles.subViewSlot} data-visible={isExpandedSectionOpen ? 'true' : 'false'}>
      <SubView title={…} actions={…}>{currentPanel.expandedView}</SubView>
    </div>
  )}

  {subPanel?.content && (
    <div
      className={styles.nestedSlot}
      data-panel-open={isSubPanelOpen ? 'true' : 'false'}
      data-width={subPanel.width ?? 'standard'}
    >
      <div className={styles.panelShell}>{subPanel.content}</div>
    </div>
  )}
</div>
```

### 2. Wrapper CSS (`InsetLayout.module.css`)

- `.panelWrapper` — `position: absolute; top: 0; bottom: 0; right: 0; display: flex; box-sizing: border-box`.
- Base width by `[data-width]`: 240 / 320 / 384 (+ 16 gap).
- Closed: `transform: translateX(100%); opacity: 0; pointer-events: none`.
- Open: `transform: translateX(0); opacity: 1; pointer-events: auto`.
- Expanded: `width: calc(100% - var(--cds-spacing-09, 96px))`.
- Transitions: `width`, `transform`, `opacity` — all `var(--cds-expressive-02, 240ms) cubic-bezier(0.4, 0.14, 0.3, 1)`.

- `.panelSlot` — `flex: 0 0 <data-width>`. Holds the original panel content at its native width while the wrapper grows around it.
- `.subViewSlot` — `flex: 1 1 auto; min-width: 0; overflow: hidden; opacity: 1`. With `[data-visible="false"]`: `flex: 0 0 0; opacity: 0; padding: 0`. `transition: flex-basis …, opacity …, padding …`.
- `.nestedSlot` — keeps the existing `.expandedNestedWrapper` mechanics (translateX + opacity by `[data-panel-open]`, width by `[data-width]`).

### 3. Attach/detach + 1 px divider

Move the existing `[data-attached="true"]` rules from `.expandedPanelWrapper` / `.expandedSubViewWrapper` onto `.panelSlot` / `.subViewSlot`. Same intent — flatten the seam radii, keep the panel slot's right border at `--cds-border-subtle` as the divider. `SubView.module.css`'s own `data-attached` rule stays.

### 4. Cleanup

Remove `.expandedOverlay`, `.expandedCluster`, `.expandedPanelWrapper`, `.expandedSubViewWrapper`, `.expandedPanelShell`, `.expandedNestedWrapper`, and their keyframes — superseded by the unified wrapper.

Keep `expandedView` / `expandedTitle` / `expandedActions` on `PanelConfig` (public API unchanged).

## Verification

1. Open Panel A on any service-asset page. Slide+fade in — unchanged.
2. Click **Maximize**. Same wrapper widens to expanded width; sub-view emerges as a second column. Verify in React DevTools that `currentPanel.content`'s React instance does **not** unmount/remount.
3. Click **Minimize**. Wrapper shrinks back; sub-view slot collapses; panel instance still mounted.
4. From expanded state click **Open inner panel**. Sub-view body's right edge compresses; nested inset slides in from the right. Sub-view shifts to acknowledge it (not layered on top).
5. Close inner panel — sub-view reflows back to full width.
6. Toggle attach/detach — 240 ms transition, 1 px divider appears at the seam when attached.
7. Close the main panel — whole wrapper slides off-canvas and fades; content unmounts after 300 ms.
8. Chrome devtools recording: only `width` / `transform` / `opacity` / `flex-basis` should animate — no layout thrash on the section content underneath.
