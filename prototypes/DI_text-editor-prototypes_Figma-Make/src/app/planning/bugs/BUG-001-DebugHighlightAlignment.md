# BUG-001: Debug Highlight Alignment Issue

**Status:** Open  
**Priority:** Medium  
**Component:** FormulaEditor  
**Reported:** November 4, 2025

---

## Summary

The debug output column highlights (error highlights, warning highlights, debug current line highlight, ghost values, and branch indicators) are not properly aligned with their corresponding code lines. The misalignment increases with higher line numbers, indicating a calculation error in the `top` positioning.

## Visual Symptoms

- Highlights appear progressively lower than their target lines as line numbers increase
- The offset grows linearly with line number
- Debug output column values themselves are fine - only the visual highlights are misaligned
- All highlight types affected: errors, warnings, debug current line, ghost values, branch indicators

## Technical Context

### Architecture

The Formula Editor uses a multi-layer positioning system:

```
.editorContent (position: relative)
  ├── .lineNumbers (absolute, left: 0)
  ├── .highlightContainer (absolute, top: 0)
  │     ├── Error highlights (absolute, top: calc(var(--highlight-top) + var(--editor-padding)))
  │     ├── Warning highlights (absolute, top: calc(var(--highlight-top) + var(--editor-padding)))
  │     ├── Debug current line (absolute, top: calc(var(--highlight-top) + var(--editor-padding)))
  │     ├── Ghost values (absolute, top: calc(var(--line-top) + var(--editor-padding)))
  │     └── Branch indicators (absolute, top: calc(var(--line-top) + var(--editor-padding)))
  ├── .textarea (absolute)
  └── .debugOutputWrapper (absolute, right: 0)
        └── .debugOutputColumn (padding: var(--editor-padding) 0)
              └── .debugOutputCell (height: dynamic based on line wrapping)
```

### Measurement System

The `useLineHeights` hook measures each line's position and height:
- Uses a hidden ghost `<pre>` element to measure line positions
- Returns `lineHeightData.top` - the cumulative offset from the start of the text content
- `lineHeightData.top` is relative to where the TEXT starts (16px padding into container)

### Current Positioning Logic

All highlight elements use:
```css
top: calc(var(--line-top) + var(--editor-padding));
/* or */
top: calc(var(--highlight-top) + var(--editor-padding));
```

Where:
- `--line-top` / `--highlight-top` come from `lineHeightData.top` (measured position)
- `var(--editor-padding)` is 16px

## Attempted Fixes

### Attempt 1: Container Offset
- Changed `.highlightContainer` from `top: var(--editor-padding)` to `top: 0`
- Added `var(--editor-padding)` offset to all child elements
- **Result:** Still misaligned with increasing offset at higher line numbers

### Attempt 2: Verify calc() Logic
- Reviewed CSS calc functions
- Confirmed CSS variables are being set correctly
- **Result:** Logic appears sound, but alignment still broken

## Hypothesis

The issue likely stems from one of:

1. **Measurement coordinate system mismatch**: `lineHeightData.top` may be measured in a different coordinate space than where highlights are rendered
2. **Line height calculation error**: The cumulative `top` calculation in `useLineHeights` may not account for some offset
3. **Container positioning issue**: Despite `.highlightContainer` being at `top: 0`, there may be another positioning context issue
4. **CSS variable timing**: The CSS variables may not be updating in sync with measurements

## Reproduction Steps

1. Open Formula Editor with debug mode active
2. Write code with 10+ lines
3. Step through debugger
4. Observe that ghost values and highlights drift progressively lower from their target lines

## Related Files

- `/components/editors/code/FormulaEditor/FormulaEditor.tsx` - Main editor component
- `/components/editors/code/FormulaEditor/FormulaEditor.module.css` - Highlight container and line highlight styles
- `/components/editors/code/FormulaEditor/GhostValue.module.css` - Ghost value positioning
- `/components/editors/code/FormulaEditor/BranchIndicator.module.css` - Branch indicator positioning
- `/components/editors/code/FormulaEditor/hooks/useLineHeights.ts` - Line measurement hook

## Next Steps (When Prioritized)

1. Add console logging to verify `lineHeightData.top` values match visual expectations
2. Inspect computed styles in browser DevTools to verify calc() results
3. Consider alternative measurement approach (e.g., measure from container top, not text top)
4. Test with simpler positioning logic to isolate the issue
5. Potentially refactor to use a single coordinate system throughout

## Workaround

None currently. Debug mode highlights are visually incorrect but do not affect functionality.

---

**Note:** This bug was logged after multiple fix attempts to allow progress on other features. Will revisit when debugging capabilities are more critical.
