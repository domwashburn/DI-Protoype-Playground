# InsetContentArea — agent notes

- This component intentionally establishes a container-query boundary on its
  scrollable content slot (`container-type: inline-size; container-name: inset-content`).
  Children that use `@container` queries (e.g. `CardGrid` with its own
  `card-grid` container) reflow based on the inset card's width, not the viewport.
- The toolbar slot is `position: sticky; top: 0` with a `--cds-border-subtle`
  bottom divider — do not add another divider in consumer toolbars.
- Outer gutter is 16px on top/left/right via `--cds-spacing-05`. Bottom defaults
  to flush (0). Set `flushBottom={false}` to add the bottom gutter back.

## Consumers

- `src/app/components/pages/ResourceHubPage.tsx`
