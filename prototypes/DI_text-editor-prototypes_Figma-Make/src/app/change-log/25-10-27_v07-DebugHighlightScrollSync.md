# Debug Highlight Scroll Sync Fix

**Date:** October 27, 2025  
**Status:** ✅ Complete  
**Related:** Formula Debugger, Object Support

---

## Summary

Fixed debug/error/warning row highlights not syncing with scroll position in the Formula Editor. The highlights (error lines, warning lines, debug current line, ghost values, branch indicators) now move correctly with the scrolled content.

---

## Problem

When scrolling the Formula Editor vertically or horizontally:
- ✅ Textarea scrolled correctly
- ✅ Syntax highlighting overlay scrolled correctly  
- ✅ Line numbers scrolled correctly
- ❌ **Highlight container (error/warning/debug highlights) stayed fixed**

**Visual Issue:**
```
// When scrolled down, highlights appeared on wrong lines
Line 1:  $salesData = [...]     ← Highlight appears here
Line 2:  ...
Line 3:  ...
Line 10: $topName = ...         ← But error is actually on line 10
```

**Root Cause:**
The `highlightContainer` was positioned absolutely with `overflow: hidden`, and the `syncScroll` function attempted to scroll it by setting `scrollTop/scrollLeft`. However, an element with `overflow: hidden` cannot scroll, so the JavaScript scroll sync had no effect.

---

## Solution

### Approach: CSS Transform Instead of Scroll

Instead of trying to scroll the `highlightContainer`, we use CSS `transform: translate()` to move the entire container in the opposite direction of the scroll. This creates the illusion that the highlights are scrolling with the content.

**Analogy:**
- Imagine the highlights are painted on a transparent sheet of glass
- When the content scrolls up 100px, we move the glass down 100px
- The highlights appear to stay aligned with the content

### Implementation Details

**1. Updated CSS - Added Padding**

```css
/* Before - Positioned with top offset */
.highlightContainer {
  position: absolute;
  top: var(--editor-padding);  /* 16px offset */
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

/* After - Full positioning with padding */
.highlightContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: var(--editor-padding);  /* Padding matches textarea/overlay */
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}
```

**Why Padding Matters:**
- Textarea has 16px padding on all sides
- Overlay has 16px padding on all sides
- Highlights must be offset by the same amount to align with text
- Using padding instead of top/left offset maintains consistency

**2. Updated syncScroll - CSS Transform**

```typescript
const syncScroll = useCallback(() => {
  if (!textareaRef.current || !overlayRef.current) return;
  
  const scrollTop = textareaRef.current.scrollTop;
  const scrollLeft = textareaRef.current.scrollLeft;
  
  // Sync syntax highlighting overlay (scrolls normally)
  overlayRef.current.scrollTop = scrollTop;
  overlayRef.current.scrollLeft = scrollLeft;
  
  // Move highlight container using transform (opposite direction)
  if (highlightContainerRef.current) {
    highlightContainerRef.current.style.transform = 
      `translate(${-scrollLeft}px, ${-scrollTop}px)`;
  }
  
  // Sync line numbers (vertical only)
  if (editorContentRef.current && lineNumbersRef.current) {
    lineNumbersRef.current.scrollTop = editorContentRef.current.scrollTop;
  }
}, []);
```

**How Transform Works:**

1. User scrolls down 100px → `scrollTop = 100`
2. Content moves up 100px (normal scroll behavior)
3. Transform applies `translateY(-100px)` → moves container up 100px
4. Highlights move with the transform, staying aligned with content

**Negative Values:**
- Scroll down → positive scrollTop → negative translateY (move up)
- Scroll right → positive scrollLeft → negative translateX (move left)
- This keeps highlights aligned with the scrolled content

---

## Technical Details

### Element Hierarchy

```
.editorContent (scrolling container)
  ├── .overlay (scrolls via scrollTop/scrollLeft)
  ├── .highlightContainer (moves via transform)
  │   ├── .errorLineHighlight
  │   ├── .warningLineHighlight
  │   ├── .currentLineHighlight
  │   ├── GhostValue components
  │   └── BranchIndicator components
  └── .textarea (user scrolls this)
```

### Scroll Sync Flow

1. **User scrolls textarea** → triggers `onScroll` event
2. **syncScroll callback runs:**
   - Reads `textareaRef.current.scrollTop` and `scrollLeft`
   - Sets `overlayRef.current.scrollTop/Left` (normal scroll)
   - Sets `highlightContainerRef.current.style.transform` (CSS transform)
   - Sets `lineNumbersRef.current.scrollTop` (normal scroll)
3. **Browser renders:**
   - Textarea: scrolled to new position
   - Overlay: scrolled to match textarea
   - Highlight container: transformed to offset scroll
   - Line numbers: scrolled to match content
   - **Result: Everything appears synchronized**

### Why Not Scroll the Highlight Container?

**Attempted (didn't work):**
```typescript
// ❌ Doesn't work - overflow:hidden prevents scrolling
highlightContainerRef.current.scrollTop = textareaRef.current.scrollTop;
```

**Why it failed:**
- `overflow: hidden` means no scrollbars, no scrolling
- Setting `scrollTop` on an element with `overflow: hidden` has no effect
- The property gets set, but visually nothing changes

**Working solution:**
```typescript
// ✅ Works - transform moves the element
highlightContainerRef.current.style.transform = `translateY(${-scrollTop}px)`;
```

**Why it works:**
- Transform is a CSS visual effect, not related to overflow
- Moves the element in the visual layer
- Works regardless of overflow settings
- GPU-accelerated for smooth performance

---

## Testing

**Test Case 1: Vertical Scroll**
```typescript
// Formula with error on line 10
$a = 1
$b = 2
...
$error = DIVIDE(10, 0)  // Line 10
```

1. ✅ Error highlight appears on line 10
2. ✅ Scroll down → Error highlight stays on line 10
3. ✅ Scroll up → Error highlight still on line 10

**Test Case 2: Horizontal Scroll**
```typescript
// Long line that requires horizontal scroll
$veryLongVariableName = SOME_FUNCTION_WITH_MANY_PARAMETERS(parameter1, parameter2, parameter3)
```

1. ✅ Highlights appear at correct horizontal position
2. ✅ Scroll right → Highlights move with text
3. ✅ Scroll left → Highlights return to original position

**Test Case 3: Debug Mode with Ghost Values**
```typescript
$salesData = [{name: "Alice", amount: 45000}]
$topName = $salesData[0].name
```

1. ✅ Current line highlight appears on correct line
2. ✅ Ghost values appear at end of correct lines
3. ✅ Scroll down → All debug UI moves with content
4. ✅ Branch indicators stay aligned with their lines

**Test Case 4: Warning Highlights**
```typescript
// Formula with unused variable
$unusedVar = 10
$result = 20
```

1. ✅ Warning highlight appears on line with unused variable
2. ✅ Multiple warnings each on correct lines
3. ✅ Scrolling keeps warnings aligned

---

## Files Modified

- ✅ `/components/editors/code/FormulaEditor/FormulaEditor.module.css`
  - Updated `.highlightContainer` positioning and padding
  
- ✅ `/components/editors/code/FormulaEditor/FormulaEditor.tsx`
  - Updated `syncScroll` function to use CSS transform

---

## Impact

### Before Fix
- Highlights appeared on wrong lines when scrolled
- Debugging was confusing (highlight on line 5, error on line 15)
- Ghost values appeared in wrong positions
- User had to scroll back to top to see highlights correctly

### After Fix
- Highlights always appear on correct lines
- Smooth scrolling behavior
- All debug UI (highlights, ghost values, branch indicators) moves correctly
- Professional, polished user experience

---

## Performance Considerations

### CSS Transform Benefits

**GPU Acceleration:**
- Transform operations are GPU-accelerated
- Much faster than layout recalculation
- Smooth 60fps scrolling

**No Reflow:**
- Transform doesn't trigger layout reflow
- Only affects composite layer
- Minimal performance impact

**Comparison:**
```typescript
// ❌ Slow - triggers layout reflow
element.style.top = '100px';
element.style.left = '50px';

// ✅ Fast - GPU-accelerated composite
element.style.transform = 'translate(50px, 100px)';
```

### Scroll Performance

The `syncScroll` function runs on every scroll event:
- ~60 times per second during smooth scrolling
- Each call is lightweight (just setting properties)
- No DOM queries or complex calculations
- No performance issues observed

---

## Related Issues Fixed

This fix also resolves:
- Ghost values not scrolling with content
- Branch indicators appearing on wrong lines
- Current line highlight misalignment
- Error tooltip positioning (line numbers in tooltip now match visual position)

---

## Future Enhancements

### Potential Improvements

**1. Scroll Debouncing**
Could debounce scroll events for even better performance:
```typescript
const syncScroll = useMemo(
  () => debounce(() => { /* sync logic */ }, 16), // 60fps
  []
);
```

**2. Intersection Observer**
Only render highlights for visible lines:
```typescript
// Don't render highlights for lines outside viewport
if (lineTop < scrollTop - 100 || lineTop > scrollTop + viewportHeight + 100) {
  return null;
}
```

**3. Virtual Scrolling**
For extremely long formulas (1000+ lines):
- Only render visible line highlights
- Reduce DOM node count
- Better performance for large formulas

---

## Lessons Learned

### Key Insights

**1. Overflow:Hidden Elements Cannot Scroll**
- Setting `scrollTop` on `overflow:hidden` elements does nothing
- Use CSS transform for visual movement instead
- Transform works regardless of overflow setting

**2. CSS Transform for Sync**
- Transform is perfect for keeping overlays synchronized
- GPU-accelerated and performant
- No layout reflow or repaint

**3. Consistent Padding**
- All overlays must have same padding as textarea
- Ensures pixel-perfect alignment
- Makes transform calculations simple

**4. Testing Scroll Behavior**
- Always test with scrolling content
- Test both vertical and horizontal scroll
- Test with different highlight types simultaneously

---

## Related Changes

- **Object Syntax Fix:** `/change-log/25-10-27_v05-ObjectSyntaxHighlightingFix.md`
- **Tracing Evaluator:** `/change-log/25-10-27_v06-TracingEvaluatorObjectSupport.md`
- **Error Highlighting:** `/change-log/25-10-28_v03-ErrorHighlightingComplete.md`
- **Warning Highlights:** `/change-log/25-10-28_v04-RealTimeWarningHighlights.md`

---

**Status:** ✅ Complete - All highlights sync perfectly with scroll  
**Impact:** Professional debugging experience with pixel-perfect highlight alignment  
**Performance:** Smooth 60fps scrolling with GPU-accelerated transforms
