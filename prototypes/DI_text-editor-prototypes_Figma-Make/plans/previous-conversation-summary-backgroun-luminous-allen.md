# Block-Based Rich Text Editor (Lexical) — Implementation Plan

## Context

The current `RichTextEditor` (`src/app/components/RichTextEditor/RichTextEditor.tsx`, 1379 lines) is an in-house `contentEditable` block system. It works but has known limits: cross-block selection is fragile, tables are shallow (no nested lists/headings inside cells), quotes/callouts can't nest structured children, and highlighting/selection across blocks is inconsistent. `MarkdownEditorNew` gave up on contentEditable entirely and fell back to a textarea, splitting the editing model.

We are re-imagining this as a **Notion-style block editor** — slash commands, block palette, drag-to-reorder, robust nested blocks, and true cross-block selection — built on **Lexical** (Meta). The same editor, restricted to markdown-compatible nodes, becomes MarkdownEditorNew's preview-mode editing surface, round-tripping through `@lexical/markdown`. This unifies two editors, eliminates the textarea fallback, and gives us a real foundation for tables with nested content.

Follows the **Strangler Pattern** (Guidelines.md §Migration): built alongside the existing editors under a new namespace, gated by a feature flag, old code untouched until the new editor is proven.

## Architecture

**New location (isolated):** `src/app/components/editors/rich/`

```
editors/rich/
  RichBlockEditor/
    RichBlockEditor.tsx           # Smart shell — Lexical <LexicalComposer> + plugins
    RichBlockEditor.module.css
    index.ts                       # Barrel export
    config.ts                      # Node registry + theme mapping to CSS modules
  blocks/                          # Functional components, one per block type
    ParagraphBlock/
    HeadingBlock/                  # H1/H2/H3
    BulletListBlock/
    NumberedListBlock/
    ChecklistBlock/
    QuoteBlock/                    # accepts nested headings/lists
    CalloutBlock/                  # separate from quote; icon + nested content
    CodeBlock/
    DividerBlock/
    TableBlock/                    # cells host nested block children
    ImageBlock/
    MentionNode/                   # decorator node bridging existing @mention system
    index.ts                       # barrel — all blocks
  plugins/
    SlashCommandPlugin/            # `/` opens palette, filters as you type
    BlockPalettePlugin/            # Cmd+/ full command palette
    DragHandlePlugin/              # hover grip, drag-reorder, "+" add-below
    FloatingToolbarPlugin/         # selection-based inline formatting
    MentionPlugin/                 # wraps existing Autocomplete from editors/core
    MarkdownShortcutPlugin/        # `# `, `- `, `> ` auto-transforms
    KeyboardPlugin/                # Cmd+↑↓ move, Enter/Tab semantics
  hooks/
    useBlockEditor.ts              # Smart hook — editor state, serialization
    useSlashCommand.ts
    useCrossBlockSelection.ts
  serializers/
    markdown.ts                    # @lexical/markdown transformers + custom (callout, checklist, table extras)
    html.ts
  types.ts                         # BlockType, BlockDefinition, EditorMode
  MARKDOWN_SUBSET.ts               # allow-list of blocks enabled in markdown mode
```

**Integration point:** `EditorContainer.tsx` reads a feature flag (`USE_LEXICAL_RICH_EDITOR`, default `false`) and swaps between the old `RichTextEditor` and the new `RichBlockEditor`. Old files at `src/app/components/RichTextEditor/` and `src/app/components/MarkdownEditorNew/` remain **untouched** until the new editor is stable for a full week.

## Key Design Decisions

1. **Lexical over Tiptap** — user selection. Use `@lexical/react`, `@lexical/markdown`, `@lexical/table`, `@lexical/list`, `@lexical/rich-text`, `@lexical/code`, `@lexical/selection`.

2. **Each block = a functional component + a Lexical Node.** Barrel-exported from `blocks/index.ts`. Node handles Lexical serialization; component handles React rendering via `NodeKey`. Custom nodes (`CalloutNode`, `ChecklistItemNode`) extend `ElementNode` so they legally host child blocks — this is what makes "heading inside a quote" and "bullet list inside a table cell" actually work.

3. **Tables use `@lexical/table`** but with `ElementNode` cells that accept our full block set (headings, lists, quotes) — not just text. This is the main reason we picked Lexical over the old in-house approach.

4. **Cross-block selection** comes free from Lexical's selection model (`$getSelection`, `RangeSelection`). Highlighting spans blocks natively; no custom range math.

5. **Markdown mode = same editor, restricted node registry.** `MarkdownEditorNew` is rebuilt as a thin wrapper around `RichBlockEditor` that:
   - Passes a `mode="markdown"` prop → `config.ts` registers only the markdown-compatible subset (paragraph, headings, lists, checklist, quote, code, divider, table, image, mention). Callout is excluded.
   - Uses `$convertFromMarkdownString` / `$convertToMarkdownString` on load/save via `serializers/markdown.ts`.
   - Slash command palette is filtered to the subset automatically.

6. **@mention system is preserved.** `MentionNode` is a `DecoratorNode` that renders the existing `Autocomplete` from `src/app/components/editors/core/components/Autocomplete/`. The hierarchical mention types in `editors/core/types/MentionTypes.ts` are reused as-is.

7. **Design tokens.** All block styles are CSS Modules referencing `--cds-*` variables from `src/styles/globals.css`. Lexical `theme` object maps node types → CSS module class names (no inline styles, no hardcoded values).

8. **Smart vs Dumb.** `RichBlockEditor` is the smart shell (state, serialization, plugin wiring). Each block component is dumb — receives Lexical `NodeKey` and renders. `useBlockEditor` is the data-abstraction hook consumers use.

## Carbon Design System Compliance

Verified via Carbon MCP (`docs_search`) — all block styling maps to canonical Carbon v11 tokens exposed as `--cds-*` CSS variables in `src/styles/globals.css`. No hardcoded values, no ad-hoc scales.

**Spacing (`$spacing-01`…`$spacing-10` → `--cds-spacing-*`)**
- Block vertical rhythm: `$spacing-04` (1rem) between blocks; `$spacing-03` (0.5rem) inside blocks.
- Slash palette / floating toolbar padding: `$spacing-03` / `$spacing-04`.
- Table cell padding: `$spacing-03 $spacing-05` (matches Carbon DataTable density).
- Callout / Quote inset: `$spacing-05` left padding + `$spacing-04` vertical.
- Where a Carbon `Stack` (`@carbon/react`) fits (toolbar rows, palette items), use it instead of custom `gap` — per Carbon spacing guidance.

**Typography (productive set, `-01` suffix)**
- Body / paragraph / list / table cells: `$body-01`.
- H1: `$heading-05` (or `$heading-06` for editor-page context). H2: `$heading-04`. H3: `$heading-03`.
- Code blocks: `$code-01` (IBM Plex Mono).
- Slash palette labels: `$label-01`; helper text (block descriptions): `$helper-text-01`.
- Quote/callout body: `$body-01`; do NOT switch to expressive set inside product editor.

**Color (Carbon v11 tokens)**
- Editor surface: `$background`; nested surfaces (table cells, callout body): `$layer-01`; toolbar/palette popovers: `$layer-02`.
- Text: `$text-primary` (body), `$text-secondary` (block placeholders, drag handle), `$text-helper` (palette descriptions), `$text-placeholder` (empty block).
- Borders: `$border-subtle-01` (block hover outline, table gridlines), `$border-strong-01` (focused table cell bottom-border), `$border-interactive` (active/selected block).
- Focus ring: `$focus` (2px outline) — required on every focusable block, palette item, and toolbar button.
- Selection highlight (cross-block): `$highlight` (Blue 20, `#d0e2ff`) for the selected text range background.
- Callout variants: `$support-info` / `$support-success` / `$support-warning` / `$support-error` for the icon + left border stripe; body uses `$layer-01` background.
- Code block: `$layer-01` bg, `$text-primary` fg, `$border-subtle-01` border.
- Mention chip: uses existing `Tag` component tokens (already Carbon-compliant).

**Carbon React components to reuse (from `@carbon/react`) instead of custom UI**
- `OverflowMenu` / `Popover` — slash command palette, block-type menu, drag-handle menu.
- `IconButton` + `@carbon/icons-react` (`AddAlt`, `Draggable`, `TextBold`, `TextItalic`, `Link`, `Quotes`, `ListBulleted`, `ListNumbered`, `Checkbox`, `Table`, `Code`, `Image`, `Warning`, `Information`) — toolbar and drag handle. No custom icon sets.
- `Tag` — mention chips (already in use).
- `Stack` — toolbar/palette layout.
- `Tooltip` — toolbar button labels.
- `Modal` — image upload / link edit dialogs.

**Lexical theme mapping.** `RichBlockEditor/config.ts` exports a Lexical `theme` object whose values are CSS Module class names. Those classes reference only `--cds-*` variables — enforced by ESLint rule (`no-hardcoded-hex`) added in Phase 1.

**MDX / docs.** README for each block component (per Guidelines §Documentation) uses Carbon's MDX doc conventions: composition example, props table, Carbon token reference for each themed property. Change-log entries under `/change-log/` follow the `YY-MM-DD_vNN-Name.md` naming rule.

## Phased Rollout (Strangler)

**Phase 1 — Foundation (isolated, no integration)**
- Install `lexical`, `@lexical/react`, `@lexical/markdown`, `@lexical/table`, `@lexical/list`, `@lexical/rich-text`, `@lexical/code`, `@lexical/selection`.
- Build `RichBlockEditor` shell, `config.ts`, theme mapping.
- Implement core blocks: Paragraph, Heading, BulletList, NumberedList, Checklist, Quote, Code, Divider.
- SlashCommandPlugin + FloatingToolbarPlugin.
- Standalone dev route/storybook page for manual testing. No touch to `EditorContainer`.

**Phase 2 — Advanced blocks**
- CalloutBlock (custom `ElementNode`, hosts nested children).
- TableBlock via `@lexical/table` with block-hosting cells; verify bullet lists + headings inside cells.
- ImageBlock, DragHandlePlugin, cross-block selection verification.

**Phase 3 — Mention + parity**
- MentionPlugin bridging existing Autocomplete.
- KeyboardPlugin (Cmd+↑↓ block moves, Tab/Shift+Tab list nesting).
- Feature-flag switch in `EditorContainer.tsx`; both old and new coexist.

**Phase 4 — Markdown mode**
- `serializers/markdown.ts` with `@lexical/markdown` transformers + custom transformers for checklist/table-cell-nesting.
- `MARKDOWN_SUBSET.ts` registry filter.
- Rewrite `MarkdownEditorNew` as a wrapper (`mode="markdown"`); textarea path removed once round-trip verified.

**Phase 5 — Cutover & cleanup**
- Flip flag on, 1-week stabilization.
- Delete `src/app/components/RichTextEditor/` and old `MarkdownEditorNew` internals.
- Update `change-log/` and `planning/` docs per Guidelines.md §Documentation.

## Critical Files

- **New:** everything under `src/app/components/editors/rich/` (see tree above).
- **Modified (Phase 3+ only):** `src/app/App.tsx` (feature flag), `src/app/components/EditorContainer.tsx` (swap logic), `package.json` (deps).
- **Reused as-is:** `src/app/components/editors/core/components/Autocomplete/`, `src/app/components/editors/core/types/MentionTypes.ts`, `src/styles/globals.css`.
- **Untouched until Phase 5:** `src/app/components/RichTextEditor/**`, `src/app/components/MarkdownEditorNew/**`.

## Verification

- **Manual, per phase:** load the dev route, exercise slash command palette, drag-reorder, nested content (heading in quote, bullet list in table cell, checklist in callout).
- **Cross-block selection:** shift-click across three blocks of different types; apply bold; confirm formatting spans correctly.
- **Markdown round-trip (Phase 4):** load a markdown fixture with headings, tables, lists, checklists, code; edit; serialize back; diff should be minimal and semantically equivalent.
- **Regression:** with flag off, all existing editors (RichTextEditor, MarkdownEditorNew, BAL, Formula) render and behave identically to today. Test each in `EditorContainer`.
- **No build:** `pnpm build` is not available in this env (per project setup). Rely on Vite dev server + manual verification. Type-check via `pnpm tsc --noEmit` if configured.
