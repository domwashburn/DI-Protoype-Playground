# CRIT-003: Line Number Height Adjustments & Indentation-Preserving Wrapping

**Date:** October 28, 2025  
**Type:** Feature Implementation  
**Scope:** Formula Editor (New Architecture)

## Summary

Implemented CRIT-003 which ensures:
1. Line numbers adjust their height to match wrapped content
2. Wrapped lines maintain their indentation level (no hanging indents, no wrapping to column 0)
3. Error/warning/debug row highlights cover the full wrapped height

This follows the user's requirement: "I DO NOT WANT hanging indents for ANY editor - I want ALL lines to wrap at their tab level, meaning if a line starts with 2 spaces, wrapped text continues at column 2."

## Problem Statement

**Before:**
- Line numbers had fixed height regardless of content wrapping
- When indented lines wrapped, the wrapped portion went to column 0 instead of maintaining indentation
- Error/warning/debug highlights had fixed height and didn't cover wrapped lines
- Line numbers appeared misaligned with multi-line wrapped content

**Example of problem:**
```
1  IF $someLongVariableName > 1000 AND $anotherReallyLongVariable < 500
THEN
```
Wrapped text didn't maintain the indentation level.

## Implementation

### 1. Indentation-Preserving Line Wrapping

**File:** `/components/editors/code/FormulaEditor/hooks/useFormulaSyntax.ts`

**Strategy:**
- Each line is wrapped in a `<div>` element
- Leading spaces are detected and removed from the content
- CSS `padding-left` is applied to the div equal to the space count (in `ch` units)
- When the line wraps, the wrapped portion naturally continues at the padding level

**Code:**
```typescript
const wrapLinesWithIndentation = (html: string): string => {
  const lines = html.split('\n');
  
  return lines.map((line) => {
    const match = line.match(/^( *)/);
    const spaceCount = match ? match[1].length : 0;
    
    if (spaceCount === 0) {
      const content = line.length === 0 ? '&nbsp;' : line;
      return `<div>${content}</div>`;
    }
    
    const contentWithoutLeadingSpaces = line.substring(spaceCount);
    const content = contentWithoutLeadingSpaces.length === 0 ? '&nbsp;' : contentWithoutLeadingSpaces;
    return `<div style="padding-left: ${spaceCount}ch;">${content}</div>`;
  }).join('');
};
```

**Why this works:**
- `ch` unit is the width of the "0" character in monospace fonts
- Perfect for measuring character-based indentation
- CSS padding naturally applies to wrapped lines
- No JavaScript calculation needed at runtime

### 2. Dynamic Line Height Measurement

**File:** `/components/editors/code/FormulaEditor/hooks/useLineHeights.ts`

**Created new hook:** `useLineHeights(overlayRef, value)`

**Strategy:**
- Measures actual rendered height of each line div from the syntax overlay
- Returns array of `{ lineNumber, height, top }` for each line
- Re-measures on value change and window resize
- Uses `requestAnimationFrame` to ensure DOM is updated before measuring

**Code:**
```typescript
export function useLineHeights(
  overlayRef: RefObject<HTMLDivElement>,
  value: string
): LineHeight[] {
  const measureLineHeights = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    
    const pre = overlay.querySelector('pre');
    if (!pre) return;
    
    const lineDivs = pre.querySelectorAll(':scope > div');
    const measuredHeights: LineHeight[] = [];
    let cumulativeTop = 0;
    
    lineDivs.forEach((div, index) => {
      const height = (div as HTMLElement).offsetHeight;
      measuredHeights.push({
        lineNumber: index + 1,
        height,
        top: cumulativeTop,
      });
      cumulativeTop += height;
    });
    
    setLineHeights(measuredHeights);
  }, [overlayRef, value]);
  
  useEffect(() => {
    requestAnimationFrame(() => {
      measureLineHeights();
    });
    // ... resize listener
  }, [measureLineHeights]);
  
  return lineHeights;
}
```

### 3. Applied Heights to Line Numbers

**File:** `/components/editors/code/FormulaEditor/FormulaEditor.tsx`

**Applied measured heights to:**
- Line number divs (via `minHeight` style)
- Error line highlights
- Warning line highlights
- Debug current line highlights
- Ghost values (debug annotations)
- Branch indicators (debug)

**Example:**
```tsx
{lineNumbers.map(line => {
  const lineHeight = lineHeights.find(lh => lh.lineNumber === line);
  const heightStyle = lineHeight ? { minHeight: `${lineHeight.height}px` } : {};
  
  return (
    <div 
      key={line} 
      className={styles.lineNumber}
      style={heightStyle}
    >
      {line}
    </div>
  );
})}
```

### 4. Updated Row Highlights

**Changed from:** Fixed height using CSS calc
**Changed to:** Dynamic height from measured values

**Before:**
```tsx
<div 
  className={styles.errorLineHighlight}
  style={{
    '--line-index': errorHighlight.line - 1,
    top: `calc(var(--line-index) * var(--formula-line-height-px))`,
    height: 'var(--formula-line-height-px)'
  }}
/>
```

**After:**
```tsx
{errorHighlight && (() => {
  const lineHeight = lineHeights.find(lh => lh.lineNumber === errorHighlight.line);
  return lineHeight ? (
    <div 
      className={styles.errorLineHighlight}
      style={{
        top: `${lineHeight.top}px`,
        height: `${lineHeight.height}px`
      }}
    />
  ) : null;
})()}
```

### 5. Updated Debug Components

**Files:**
- `/components/editors/code/FormulaEditor/GhostValue.tsx`
- `/components/editors/code/FormulaEditor/BranchIndicator.tsx`

**Changes:**
- Added `top` and `height` props (new, CRIT-003)
- Kept `line` and `lineHeight` props (deprecated, backward compatible)
- Components calculate position using new props if available, fall back to old props

**Why backward compatible:** Allows gradual migration if needed, defensive programming

## Technical Details

### CSS Units: `ch` for Indentation

**Why `ch` unit?**
- Represents the width of the "0" character
- Perfect for monospace fonts where all characters have same width
- Direct mapping: 2 spaces = `padding-left: 2ch`
- Browser-native, no JavaScript calculation

### Measurement Timing: requestAnimationFrame

**Why RAF?**
- Ensures DOM has been updated with new divs before measuring
- Prevents measuring stale/unmounted elements
- Allows browser to complete render cycle

### Fallback for Empty Lines

**Empty lines use `&nbsp;`:**
- Maintains consistent line height even with no content
- Prevents line collapse
- Ensures line numbers align correctly

## Files Modified

### Created
- `/components/editors/code/FormulaEditor/hooks/useLineHeights.ts` - New hook for measuring line heights

### Modified
- `/components/editors/code/FormulaEditor/hooks/useFormulaSyntax.ts` - Added `wrapLinesWithIndentation` function
- `/components/editors/code/FormulaEditor/hooks/index.ts` - Exported new hook
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx` - Applied line heights to all elements
- `/components/editors/code/FormulaEditor/FormulaEditor.module.css` - Added styles for line divs
- `/components/editors/code/FormulaEditor/GhostValue.tsx` - Added top/height props
- `/components/editors/code/FormulaEditor/BranchIndicator.tsx` - Added top/height props

## Testing Checklist

- [x] Line numbers adjust height for wrapped lines
- [x] Indented lines wrap at their indentation level (not column 0)
- [x] Error highlights cover full wrapped line height
- [x] Warning highlights cover full wrapped line height
- [x] Debug current line highlight covers full wrapped line height
- [x] Ghost values positioned correctly on wrapped lines
- [x] Branch indicators positioned correctly on wrapped lines
- [x] Window resize re-measures heights correctly
- [x] Empty lines maintain correct height
- [x] Very long lines with deep indentation wrap correctly

## Visual Examples

### Before CRIT-003:
```
Line #  Content
1       IF $someLongVariable > 1000 AND $anotherReallyLongVariable < 500
        THEN  <-- wrapped to column 0
```

### After CRIT-003:
```
Line #  Content
1       IF $someLongVariable > 1000 AND $anotherReallyLongVariable < 500
        AND $thirdVariable = TRUE  <-- wrapped at indentation level
        THEN
```

Error highlights now cover the full multi-line height, and line number "1" grows to match.

## Integration with Existing Features

**Works with:**
- ✅ Syntax highlighting (colors preserved in wrapped lines)
- ✅ Undefined variable highlighting (wavy underlines wrap correctly)
- ✅ Error highlighting (row background covers full height)
- ✅ Warning highlighting (row background covers full height)
- ✅ Debug mode (current line, ghost values, branch indicators all positioned correctly)
- ✅ Autocomplete (not affected)
- ✅ Inline typeahead (not affected)
- ✅ Variable table (not affected)
- ✅ Scrolling (line numbers stay synced)

## Performance Considerations

**Measurement frequency:**
- On value change (debounced by React rendering)
- On window resize (debounced by RAF)
- NOT on scroll (measurements are cached)

**DOM queries:**
- Single query per measurement: `pre.querySelectorAll(':scope > div')`
- Efficient selector, no deep traversal
- Cached in state until next measurement

**Memory:**
- LineHeight array stored in state
- Minimal: ~24 bytes per line (3 numbers)
- 100 lines = ~2.4KB

## Future Enhancements

**Possible improvements:**
1. Virtual scrolling for very large formulas (1000+ lines)
2. IntersectionObserver to only measure visible lines
3. Web Worker for measurement (if formulas get extremely large)
4. Memoization of line heights if content hasn't changed

**Not needed now:** Current implementation performs well for typical formula sizes (< 100 lines)

## Strangler Pattern Compliance

**✅ Compliant:**
- Only modified NEW architecture (`/components/editors/code/FormulaEditor/`)
- Did NOT touch old BAL Editor, Markdown Editor, or RTE
- New hook is isolated and testable
- Can be reused when/if we migrate other editors
- No shared CSS that could affect old editors

**Future migration path:**
When migrating BAL Editor to new architecture, this hook will be ready to use.

## Related Issues

- Completes CRIT-002 partial implementation (error row highlights now adjust)
- Sets foundation for CRIT-004 (if we add gutter icons beside line numbers)
- Addresses user requirement from Guidelines: "NO hanging indents for ANY editor"

## References

- User requirement: "I want ALL lines to wrap at their tab level, meaning if a line starts with 2 spaces, wrapped text continues at column 2"
- Guidelines.md: Typography and editor behavior specifications
- Change log: 25-10-28_v17-ActiveTokenSuppression.md (previous CRIT-002 work)
