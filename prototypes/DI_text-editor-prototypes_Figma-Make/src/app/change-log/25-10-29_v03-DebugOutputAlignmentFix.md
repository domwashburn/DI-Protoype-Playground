# Debug Output Column Alignment Fix

**Date:** October 29, 2025  
**Version:** v03  
**Status:** Complete

## Summary

Fixed debug highlight and debug output column alignment issues where highlights and values would become progressively misaligned with their corresponding lines as you moved further down in the code. The root cause was inconsistent cell padding and use of `minHeight` instead of exact `height` values, causing cumulative rounding errors.

## Problem

The debug highlights and debug output values were appearing slightly offset from their corresponding code lines, with the offset accumulating as you moved further down the page. This made it difficult to visually track which debug value corresponded to which line.

### Root Causes

1. **Inconsistent Padding**: Different columns had different vertical padding:
   - Line numbers: NO padding-top (only padding-right)
   - Gutter cells: `padding-top: 2px`
   - Debug output cells: `padding: 2px ...` (includes padding-top)
   
2. **MinHeight vs Height**: Using `minHeight` allowed cells to expand beyond their measured heights, causing the actual rendered heights to differ from the measured heights used for positioning highlights.

3. **Cumulative Rounding**: Sub-pixel measurements (e.g., 22.4px) combined with `minHeight` created small rounding differences that accumulated over many lines.

## Solution

### 1. Removed Vertical Padding from All Cells

Ensured all cells (line numbers, gutter, debug output) have NO vertical padding, only horizontal padding where needed:

**Gutter Cells:**
```css
.gutterCell {
  /* NO padding-top - alignment achieved through exact heights */
}
```

**Debug Output Cells:**
```css
.debugOutputCell {
  /* Padding - horizontal only, NO vertical padding for alignment */
  padding-left: var(--spacing-02);
  padding-right: var(--spacing-03);
}
```

### 2. Changed from minHeight to Exact height

Updated all cell rendering to use exact `height` values instead of `minHeight`:

**Before:**
```tsx
const heightStyle = lineHeight ? { minHeight: `${lineHeight.height}px` } : {};
```

**After:**
```tsx
const heightStyle = lineHeight ? { height: `${lineHeight.height}px` } : {};
```

This change was applied to:
- Line number cells
- Gutter cells  
- Debug output cells

### 3. Removed Fallback min-height from CSS

Removed the CSS `min-height` declarations since we now set exact heights via inline styles:

```css
/* Before */
.lineNumber {
  min-height: calc(var(--editor-font-size) * var(--editor-line-height));
}

/* After */
.lineNumber {
  /* Height set via inline style from measured line heights (CRIT-003) */
}
```

## Technical Details

### Alignment Architecture

All columns now share the same alignment model:

1. **Container Padding**: Each container (line numbers, gutter, debug output) has `padding: 16px 0` (top/bottom)
2. **Cell Heights**: Each cell gets exact `height` from measured line heights
3. **No Cell Padding**: Cells have NO vertical padding, only horizontal where needed
4. **Highlight Offset**: Highlight container has `top: 16px` to account for container padding
5. **Exact Positioning**: Highlights positioned at exact `top: ${lineHeight.top}px` from measured positions

### Why This Works

- **Consistent Box Model**: All cells have identical box-sizing and no conflicting padding
- **Exact Heights**: Using `height` instead of `minHeight` ensures cells are exactly the measured size
- **Sub-pixel Accuracy**: Fractional pixel values (22.4px) are preserved and rendered accurately
- **No Accumulation**: Since each cell has exact height, there's no cumulative rounding error

## Files Changed

### Modified
- `/components/editors/code/FormulaEditor/FormulaEditor.module.css`
  - Removed `padding-top` from `.gutterCell`
  - Removed `min-height` from `.lineNumber` and `.gutterCell`
  - Added comments explaining height is set via inline styles

- `/components/editors/code/FormulaEditor/FormulaEditor.tsx`
  - Changed gutter cells from `minHeight` to `height`
  - Changed line number cells from `minHeight` to `height`

- `/components/editors/code/FormulaEditor/DebugOutputColumn.module.css`
  - Changed `padding: 2px ...` to separate `padding-left` and `padding-right` (no vertical padding)
  - Removed `min-height` from `.debugOutputCell`
  - Added comments explaining height is set via inline styles

- `/components/editors/code/FormulaEditor/DebugOutputColumn.tsx`
  - Changed debug cells from `minHeight` to `height`

## Testing

Verify the following:
1. ✅ Line numbers align perfectly with code lines
2. ✅ Gutter icons align with their corresponding line numbers
3. ✅ Debug output values align with their corresponding code lines
4. ✅ Debug highlights cover exactly the right lines with no offset
5. ✅ Error and warning highlights cover exactly the right lines
6. ✅ Alignment remains perfect when scrolling to lines further down (no cumulative offset)
7. ✅ Wrapped lines maintain alignment (each wrapped line gets exact measured height)

## References

- **CRIT-003**: Line height adjustment implementation for wrapped lines
- **Previous Fix**: 25-10-28_v19 - Removed 2px offset from highlights (this fix addresses the root cause)
- **Line Heights Hook**: `/components/editors/code/FormulaEditor/hooks/useLineHeights.ts`

## Next Steps

- Monitor for any edge cases with very long wrapped lines
- Consider applying same pattern to BAL Editor when it adds debug features
- Document this alignment pattern in Guidelines.md for future editors
