# Line Wrapping Support for Highlights - v01

**Date:** October 30, 2025  
**Type:** Enhancement  
**Component:** FormulaEditor  
**Status:** Complete

## Summary

Extended the dynamic CSS variable system (previously implemented for line numbers and gutter cells) to all highlight elements (error highlights, warning highlights, debug current line highlights, ghost values, and branch indicators). Highlights now properly expand to cover wrapped lines instead of being fixed at 22.4px height.

## Context

After implementing dynamic line height support for line numbers and gutter cells in response to CRIT-003, highlights were still using static calc()-based positioning and fixed heights. This caused visual issues when lines wrapped:
- Error/warning highlights only covered the first 22.4px of a wrapped line
- Debug current line highlight didn't extend over wrapped content
- Ghost values and branch indicators were positioned at fixed offsets

The user requested the same dynamic system be applied to highlights to complete the wrapping support.

## Implementation Details

### 1. **Extended Highlight Rendering with Measured Heights**

Modified `FormulaEditor.tsx` to look up measured line height data and pass it to each highlight element:

```tsx
{/* Error line highlights - CSS-based positioning with dynamic height */}
{errorHighlight && (() => {
  const lineHeightData = lineHeights.find(lh => lh.lineNumber === errorHighlight.line);
  return (
    <div 
      className={styles.errorLineHighlight}
      style={{
        '--line-number': errorHighlight.line,
        '--line-top': lineHeightData ? `${lineHeightData.top}px` : undefined,
        '--line-height-override': lineHeightData ? `${lineHeightData.height}px` : undefined
      } as React.CSSProperties}
    />
  );
})()}
```

Applied the same pattern to:
- Error highlights
- Warning highlights  
- Debug current line highlights
- Ghost values (component props)
- Branch indicators (component props)

### 2. **Updated CSS for Dynamic Positioning**

Modified `FormulaEditor.module.css` to use dynamic CSS variables with fallbacks:

```css
.errorLineHighlight {
  /* DYNAMIC POSITIONING - Uses measured line heights for wrapping support */
  /* Prefers --line-top if available, falls back to calc-based positioning */
  top: var(--line-top, calc(var(--calculated-line-height) * (var(--line-number, 1) - 1)));
  
  /* DYNAMIC HEIGHT - Uses measured height if available, falls back to calculated */
  height: var(--line-height-override, var(--calculated-line-height));
}
```

Same CSS pattern applied to:
- `.warningLineHighlight`
- `.currentLineHighlight`

### 3. **Updated Component Props and Styling**

**GhostValue Component:**
- Added `lineTop?: number` prop for dynamic positioning
- Removed `lineHeight` prop - ghost value maintains fixed height (it's a compact badge)
- Updated `GhostValue.module.css`:
  - Uses `--line-top` for dynamic positioning (aligns with wrapped lines)
  - Fixed height with `padding-top: 3px` to center with first line of text (like gutter icons)
  - Does NOT expand height with wrapped lines (intentional - it's a small badge)

**BranchIndicator Component:**
- Added `lineTop?: number` and `lineHeight?: number` props
- Passes these as CSS variables `--line-top` and `--line-height-override`
- Updated `BranchIndicator.module.css` to use dynamic variables with fallbacks

**DebugOutputColumn Component:**
- Updated to apply `--line-height-override` to each cell
- Looks up measured height from `lineHeights` array
- Updated `DebugOutputColumn.module.css` to use dynamic height with fallback

## Technical Approach

**CSS Variable Pattern:**
```css
/* Prefers measured value if available, falls back to calc() if not */
top: var(--line-top, calc(var(--calculated-line-height) * (var(--line-number, 1) - 1)));
height: var(--line-height-override, var(--calculated-line-height));
```

**Benefits:**
- Graceful fallback if measurements not available yet
- No JavaScript-based positioning (CSS-driven)
- Smooth updates via CSS variable changes
- Consistent with existing line number/gutter approach

## Files Changed

### Modified
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx`
  - Added line height lookup for all highlight elements
  - Passed measured data as inline CSS variables
  - Updated GhostValue and BranchIndicator component calls

- `/components/editors/code/FormulaEditor/FormulaEditor.module.css`
  - Updated `.errorLineHighlight` positioning and height
  - Updated `.warningLineHighlight` positioning and height
  - Updated `.currentLineHighlight` positioning and height

- `/components/editors/code/FormulaEditor/GhostValue.tsx`
  - Added `lineTop` prop
  - Applied as CSS variable in inline style

- `/components/editors/code/FormulaEditor/GhostValue.module.css`
  - Updated `.ghostValue` to use dynamic positioning and fixed height

- `/components/editors/code/FormulaEditor/BranchIndicator.tsx`
  - Added `lineTop` and `lineHeight` props
  - Applied as CSS variables in inline style

- `/components/editors/code/FormulaEditor/BranchIndicator.module.css`
  - Updated `.branchIndicator` to use dynamic positioning and height

- `/components/editors/code/FormulaEditor/DebugOutputColumn.tsx`
  - Updated to apply `--line-height-override` to each cell
  - Looks up measured height from `lineHeights` array

- `/components/editors/code/FormulaEditor/DebugOutputColumn.module.css`
  - Updated `.debugOutputColumn` to use dynamic height with fallback

## Testing

**Manual Testing:**
1. Enter formula with long line that wraps
2. Add error/warning to wrapped line
3. Verify highlight extends over full wrapped height
4. Use debugger with wrapped lines
5. Verify current line highlight covers wrapped content
6. Verify ghost values and branch indicators position correctly

**Test Cases:**
- Single-line content (no wrapping) - should work as before
- Multi-line wrapped content - highlights should expand
- Mixed wrapped/unwrapped lines - each line uses correct height
- Resize editor width - highlights should reflow with content

## Benefits

✅ **Visual Consistency** - Highlights match actual line heights  
✅ **Wrapping Support** - Highlights cover full wrapped line height  
✅ **Performance** - CSS-driven with efficient variable updates  
✅ **Maintainability** - Consistent pattern across all positioned elements  
✅ **Graceful Degradation** - Fallbacks to calc() if measurements unavailable

## Related

- **Previous:** `25-10-28_v18-LineWrappingIndentation-CRIT003.md` - Initial line wrapping implementation
- **Previous:** `25-10-30_v00-LineNumberDynamicHeight.md` - Dynamic height for line numbers and gutter
- **CRIT-003:** Line number height adjustments for wrapped lines
- **Hook:** `useLineHeights` - Measures actual line heights accounting for wrapping

## Next Steps

- Consider applying same pattern to DebugOutputColumn if line alignment issues arise
- Potential future enhancement: Wrapped text continuation at indentation level (requires contenteditable or Monaco Editor)