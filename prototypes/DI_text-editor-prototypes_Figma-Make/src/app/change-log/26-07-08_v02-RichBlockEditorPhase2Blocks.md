# RichBlockEditor — Phase 2: Advanced Blocks & Drag Handle

## Summary

Extended the isolated Lexical block editor (`src/app/components/editors/rich/`) with three advanced block types and a hover-anchored drag rail. All work stayed inside the strangler boundary — no legacy editor was touched.

## Context

Phase 1 delivered the Lexical foundation, text blocks, slash command, floating toolbar, and markdown shortcuts. Phase 2 targets the block types users expect from a Notion-class editor and the reorder affordance that makes block editing usable:

- **Callout** — separate from Quote, with tone variants (info/success/warning/error) and full nested block support (headings, lists, inline formatting inside the callout).
- **Table** — via `@lexical/table`, with cells that host arbitrary block content so lists and headings inside cells work natively.
- **Image** — DecoratorNode with editable caption and lazy loading.
- **DragHandlePlugin** — hover-anchored rail with grip (drag to reorder) and "+" (insert paragraph after).

## Implementation

### CalloutBlock (`blocks/CalloutBlock/`)
- `CalloutNode` extends `ElementNode` (child-hosting), holds a `tone: CalloutTone` on the node itself so it round-trips through JSON.
- Full lifecycle: `createDOM`, `updateDOM`, `exportDOM`, `importDOM` (matches `<aside data-lexical-callout>`), `importJSON`, `exportJSON`.
- `insertNewAfter` breaks out to a paragraph on Enter at the end; `collapseAtStart` collapses to a paragraph on Backspace at the start.
- Presentational `CalloutBlock` component barrel-exported alongside `$createCalloutNode` / `$isCalloutNode`.

### ImageBlock (`blocks/ImageBlock/`)
- `ImageNode` extends `DecoratorNode<JSX.Element>` and `decorate()` returns the `ImageBlock` React component.
- Caption is editable inline via an input; `setCaption` writes back through `editor.update()`.
- Full import/export lifecycle for `<img>` DOM and JSON serialization.

### TableBlock (`blocks/TableBlock/`)
- Uses the built-in `TableNode`/`TableRowNode`/`TableCellNode` (already registered).
- Wired via `<TablePlugin hasCellMerge hasCellBackgroundColor />` in `RichBlockEditor`.
- CSS overrides the third-party defaults so cell padding, borders, and typography follow Carbon tokens; every direct child gets `margin: var(--cds-spacing-02)` so nested paragraphs/lists/headings inside cells breathe correctly.
- Presentational `TableBlock` component provided for docs/screenshots; runtime rendering is handled by Lexical.

### DragHandlePlugin (`plugins/DragHandlePlugin/`)
- Tracks pointer position over the editor root, resolves the hovered top-level block via `$getNearestNodeFromDOMNode`.
- Positions an absolutely-placed rail (`.dragRail`) anchored to that block; two buttons: "+" (insert paragraph after) and "⋮⋮" (grip, `draggable`).
- Drop handler swaps sibling positions through `editor.update()` on the root's children — no library-level DND dependency.

### Registry updates
- `types.ts` gains `'callout' | 'table' | 'image'` block types plus `CalloutTone`.
- `MARKDOWN_SUBSET.ts` allows `table` and `image` in markdown mode; callout is intentionally excluded (per the markdown-compatible restriction agreed in the plan).
- `hooks/useBlockEditor.ts` registers the new blocks with descriptions/keywords for slash search.
- `RichBlockEditor/config.ts` registers `CalloutNode` and `ImageNode` and extends the theme with `table`/`tableRow`/`tableCell`/`tableCellHeader`/`callout.tone.*`/`image`.
- `blocks/index.ts` barrel-exports every new block, node, factory, and serialized type.

### SlashCommand extensions (`plugins/SlashCommandPlugin/`)
- `/table` dispatches `INSERT_TABLE_COMMAND` (3×3 with header row).
- `/callout` inserts a `CalloutNode` seeded with an empty paragraph so the user can immediately type nested content.
- `/image` inserts a placeholder `ImageNode` (swappable for a modal/upload flow in a later phase).

## Carbon Design System Compliance

- Callout uses `--cds-support-info | success | warning | error` for the left stripe and `--cds-layer-01` for the body.
- Table borders/gridlines use `--cds-border-subtle`; header cells use `--cds-layer-01` with weight 600.
- Image caption input uses `--cds-text-secondary` with a `--cds-border-interactive` focus ring.
- Drag rail uses `--cds-text-secondary` idle, `--cds-layer-01` hover, `--cds-border-interactive` focus ring — matches Carbon icon-button style.
- All spacing tokens (`--cds-spacing-02` through `--cds-spacing-06`) — no hardcoded pixel values.

## Files Changed

Added:
- `blocks/CalloutBlock/{CalloutNode.ts, CalloutBlock.tsx, index.ts}`
- `blocks/ImageBlock/{ImageNode.tsx, ImageBlock.tsx, index.ts}`
- `blocks/TableBlock/{TableBlock.tsx, index.ts}`
- `plugins/DragHandlePlugin/{DragHandlePlugin.tsx, index.ts}`

Modified:
- `types.ts` (new block types, `CalloutTone`)
- `MARKDOWN_SUBSET.ts` (allow table/image)
- `hooks/useBlockEditor.ts` (register new blocks)
- `RichBlockEditor/config.ts` (register nodes + theme entries)
- `RichBlockEditor/RichBlockEditor.tsx` (mount `TablePlugin` + `DragHandlePlugin`)
- `RichBlockEditor/RichBlockEditor.module.css` (callout/table/image/drag-rail styles)
- `plugins/SlashCommandPlugin/SlashCommandPlugin.tsx` (callout/table/image insertion)
- `blocks/index.ts` (barrel exports)

## Strangler Isolation

Everything is under `src/app/components/editors/rich/`. `EditorContainer`, `RichTextEditor/`, and `MarkdownEditorNew/` remain untouched. Feature flag wiring for cutover is still Phase 3 work.

## Next Steps (Phase 3)

- `MentionPlugin` bridging the existing `Autocomplete` from `editors/core/`.
- `KeyboardPlugin` (Cmd+↑/↓ block moves, Tab/Shift+Tab nesting semantics).
- Feature-flag swap in `EditorContainer` (`USE_LEXICAL_RICH_EDITOR`).

## References

- Plan: `plans/previous-conversation-summary-backgroun-luminous-allen.md`
- Phase 1: `src/app/change-log/26-07-08_v01-RichBlockEditorPhase1Foundation.md`
- Lexical Table plugin: `@lexical/table`
- Guidelines §Migration Strategy — Strangler Pattern
