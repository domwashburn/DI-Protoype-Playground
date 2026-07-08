# Plan: Fix ResourceHub Section Shrinking Bug

## Context

After restoring to a previous app version, the user reports that the "BAI Dashboards" section
renders correctly (full 256px cards with title, type, description, and Provider/Type footer)
while all other sections (Decision Models, ML Models, Task Models, etc.) appear compact —
showing only title + type, roughly 50–80px tall instead of 256px.

The code is identical for every section: `Card` always receives `title`, `resourceType`,
`description`, `provider`, and `type`. `Card.module.css` sets `height: 256px`. There is no
conditional rendering or data mismatch causing the visual difference.

## Root Cause

`sectionsContainer` in `ResourceHubPage.module.css` is a flex-column container with `height: 100%`
and `overflow-y: auto`. Critically, `sectionShell` children have the default CSS value
`flex-shrink: 1`.

When a tab renders **many sections** (e.g. "Assets" shows 8 sections, "All" shows all
categories), their natural combined height far exceeds the container's `100%` height. CSS
flexbox responds by shrinking all children proportionally via `flex-shrink`. With 8 sections
each wanting ~310px and the container being ~600px, each section is scaled to ~75px — which
squeezes the card content out of view behind `sectionShell`'s `overflow: hidden`.

When the **"Dashboards" tab** is selected, only 1 section (BAI Dashboards) is rendered. Its
natural height (~310px) fits within the container, so **no shrinking occurs** and the full cards
appear correctly.

This is why BAI Dashboards works and others don't: it's a **tab selection + flex-shrink
interaction**, not a data or rendering difference.

## Fix

**File:** `src/app/components/pages/ResourceHubPage.module.css`

Add `flex-shrink: 0` to `.sectionShell`. This prevents flexbox from compressing sections.
`overflow-y: auto` on `sectionsContainer` already handles scrolling when total section height
exceeds the container.

```css
.sectionShell {
  flex-shrink: 0;          /* ← ADD THIS LINE */
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  gap: 1px;
  background-color: var(--cds-layer-accent-01);
  border: 1px solid var(--cds-border-subtle);
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}
```

This is a **one-line fix** in a single file. No changes to JSX, data, or any other CSS file.

## Verification

1. Switch to the "Assets" tab → Decision Models, ML Models, Task Models sections should all
   render with full 256px cards showing description + Provider/Type footer, visually matching
   the BAI Dashboards section in image-25.png.
2. Switch to the "All" tab → all sections should render at full height and the container
   should scroll vertically through them.
3. Switch to the "Dashboards" tab → BAI Dashboards should remain unchanged (still working).
4. Open the filter panel (click filter icon) → sections should still render at full height
   in the narrower main column.
