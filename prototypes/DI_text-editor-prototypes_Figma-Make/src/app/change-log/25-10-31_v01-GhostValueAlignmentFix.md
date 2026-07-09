# Ghost Value Alignment Fix

**Date:** October 31, 2025  
**Type:** Bug Fix  
**Component:** Formula Editor - Ghost Values

## Summary

Fixed severe misalignment of ghost value annotations in the Formula Editor debugger. Ghost values were appearing significantly offset from their intended line positions due to double-counting of editor padding in the positioning calculation.

## Context

Ghost values are inline value annotations that appear on the right side of the editor during debug mode, showing intermediate expression results. They are absolutely positioned to align with specific code lines, with support for line wrapping via the `useLineHeights` hook.

## Root Cause

The ghost values are rendered inside `.highlightContainer`, which is already offset from the top of `.editorContent` by `var(--editor-padding)` (16px):

```css
.highlightContainer {
  position: absolute;
  top: var(--editor-padding);  /* Already accounts for padding offset */
  ...
}
```

However, the `GhostValue.module.css` was ALSO adding `var(--editor-padding)` to the line position:

```css
/* BEFORE (incorrect) */
top: calc(var(--line-top, ...) + var(--editor-padding));
```

This caused double-counting: the ghost values were offset by 2× the editor padding (32px total instead of 16px), causing them to appear significantly lower than their intended position.

## Implementation Details

### File Changed
- `/components/editors/code/FormulaEditor/GhostValue.module.css`

### The Fix

Removed the redundant `+ var(--editor-padding)` from the top calculation:

```css
/* AFTER (correct) */
.ghostValue {
  position: absolute;
  right: var(--spacing-05);
  /* Parent .highlightContainer already offsets by var(--editor-padding) */
  top: var(--line-top, calc(var(--editor-font-size) * var(--editor-line-height) * (var(--line-number, 1) - 1)));
  ...
}
```

Now the positioning correctly uses:
- `--line-top`: Measured top offset from `useLineHeights` hook (accounts for line wrapping)
- Fallback: Calculated position based on line number × line height
- NO additional padding offset (parent container handles it)

## Verification

The BranchIndicator component (also rendered in `.highlightContainer`) was checked and found to already use the correct positioning pattern without adding editor padding, confirming this is the right approach.

## Impact

- **Fixed:** Ghost values now align perfectly with their corresponding code lines
- **Fixed:** Multi-line expressions show ghost values at the correct vertical position
- **No Breaking Changes:** This is purely a positioning fix with no API or behavior changes

## Related

- **Parent Issue:** Ghost value alignment severely misaligned (user report with screenshot)
- **Related Components:** BranchIndicator (uses same positioning pattern correctly)
- **Related System:** `.highlightContainer` positioning architecture
