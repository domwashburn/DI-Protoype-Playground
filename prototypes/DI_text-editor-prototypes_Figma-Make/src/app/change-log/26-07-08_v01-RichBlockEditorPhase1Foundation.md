# Rich Block Editor Phase 1 Foundation

## Summary

Implemented the isolated Phase 1 Lexical foundation for the future Notion-style rich text editor under `src/app/components/editors/rich/`.

## Context

The legacy rich text and markdown editors remain untouched per the Strangler Pattern. This foundation proves Lexical shell composition, Carbon-token CSS Modules, slash-command groundwork, markdown shortcut support, and formatting toolbar behavior in a new namespace.

## Implementation Details

- Added Lexical dependencies for React, markdown, rich text, lists, code, table, selection, link, and HTML serialization.
- Created `RichBlockEditor` smart shell with `LexicalComposer`, history, lists, checklist support, markdown shortcuts, `OnChangePlugin`, slash command palette, and floating formatting toolbar.
- Added `useBlockEditor` hook as the data abstraction for block definitions and markdown-mode filtering.
- Added barrel-exported dumb block component boundaries for paragraph, headings, bullet lists, numbered lists, checklists, quotes, code, and dividers.
- Added CSS Module styles using only Carbon-compatible `--cds-*` tokens for spacing, color, typography, borders, focus, and selection-related surfaces.

## Files Changed

- `package.json`, `pnpm-lock.yaml`
- `src/app/components/editors/rich/**`

## Breaking Changes

None. The new editor is isolated and not wired into `EditorContainer` or legacy editor paths.

## Next Steps

- Phase 2: custom callout/table/image nodes and drag handle plugin.
- Phase 3: mention bridge and feature-flagged integration with `EditorContainer`.
- Phase 4: markdown wrapper and round-trip fixtures.
