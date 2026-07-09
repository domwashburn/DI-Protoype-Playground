# RichBlockEditor

Phase 1 isolated Lexical foundation for the future Notion-style editor. It is intentionally built under `components/editors/rich/` and is not wired into the legacy `RichTextEditor` or `MarkdownEditorNew` yet.

## Composition

```tsx
<RichBlockEditor
  mode="rich"
  initialContent="# Decision notes"
  onChange={({ markdown, json }) => saveDraft(markdown, json)}
/>
```

## Carbon styling

Styles are scoped with CSS Modules and reference Carbon-compatible CSS variables only: `--cds-background`, `--cds-layer-*`, `--cds-text-*`, `--cds-border-*`, and `--cds-spacing-*`.
