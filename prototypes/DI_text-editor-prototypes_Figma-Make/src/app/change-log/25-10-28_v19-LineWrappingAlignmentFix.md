# Line Wrapping Alignment Fix - CRIT-003 Resolution

**Date:** October 28, 2025  
**Version:** v19  
**Status:** Complete  
**Related:** CRIT-003 (Line number height adjustments for wrapped lines)

---

## Summary

Fixed misalignment between textarea and syntax overlay in FormulaEditor by removing the complex indentation-preserving wrapping approach and reverting to standard wrapping behavior. Documented this as a known limitation with future enhancement path.

---

## Problem

After implementing CRIT-003's indentation-preserving wrapping (using `padding-left` + `text-indent` on overlay divs), the textarea and overlay were misaligned:

* **Overlay:** Wrapped lines continued at indentation level (e.g., column 2)
* **Textarea:** Wrapped lines returned to column 0 (standard HTML behavior)
* **Result:** Text and cursor positions didn't match, making editing confusing

**Root Cause:** HTML `<textarea>` elements cannot be styled to wrap at indentation levels. This is a fundamental limitation - textareas only support plain text, not the HTML/CSS techniques that work for other elements.

---

## Solution

### 1. Removed Complex Wrapping Logic

**Before:**
```typescript
// Removed leading spaces and used CSS padding-left
const wrapLinesWithIndentation = (html: string): string => {
  return lines.map((line) => {
    const spaceCount = detectSpaces(line);
    const contentWithoutSpaces = removeLeadingSpaces(line);
    return `<div style="padding-left: ${spaceCount}ch; text-indent: -${spaceCount}ch;">${content}</div>`;
  }).join('');
};
```

**After:**
```typescript
// Simple syntax highlighting without wrapping divs
const highlightSyntax = (text: string): string => {
  // ... syntax highlighting logic
  return result; // No wrapping divs, just highlighted HTML
};
```

### 2. Updated Line Height Measurement

Changed from measuring overlay divs to measuring from textarea directly using a temporary measuring element:

```typescript
// Create measuring element that mimics textarea styling
const measuringEl = document.createElement('div');
const computedStyle = window.getComputedStyle(textarea);
measuringEl.style.fontFamily = computedStyle.fontFamily;
measuringEl.style.fontSize = computedStyle.fontSize;
// ... copy all relevant styling

// Measure each line individually
lines.forEach((line) => {
  measuringEl.textContent = line;
  const height = measuringEl.offsetHeight;
  // Store height and position
});
```

### 3. Enhanced Measurement Robustness

* **Double requestAnimationFrame:** Ensures DOM is fully rendered before measurement
* **Separate resize handler:** Smooth re-measurement on window resize
* **Complete style copying:** Copies all typography properties (font-weight, letter-spacing, etc.)

### 4. Documented Limitation

Added to Guidelines.md under "Known Limitations & Future Enhancements":

* Explanation of the HTML textarea limitation
* Impact on code editors
* Future enhancement options (contenteditable, CodeMirror, Monaco)
* Current workaround (accepted limitation)

---

## Technical Details

### Why Textarea Can't Wrap at Indentation

HTML textareas:
* Store content as **plain text**, not HTML
* Don't support CSS styling of **individual characters or lines**
* Always wrap to the left edge (column 0) when content exceeds width
* Cannot use `padding-left` + `text-indent` because there's no way to target "first line vs wrapped lines"

Contenteditable divs:
* Store content as **HTML**
* Support full CSS styling on any element
* Can use `padding-left` + `text-indent` to create indentation-preserving wrapping
* Require more complex input handling (cursor position, selection, etc.)

### Line Height Measurement Strategy

**Key Insight:** Instead of measuring from the overlay (which we can't style the same as textarea), measure using a temporary element that **exactly mimics the textarea's styling**.

**Process:**
1. Create temporary div off-screen
2. Copy ALL relevant computed styles from textarea
3. Set width to match textarea's client width
4. Measure each line individually by setting textContent
5. Store heights and cumulative positions
6. Clean up temporary element

**Accuracy Factors:**
* Must copy: font-family, font-size, font-weight, line-height, letter-spacing, word-spacing, word-break
* Must match: width (affects wrapping), white-space, word-wrap settings
* Must use: offsetHeight (includes line-height, accurate for display)

---

## Files Changed

### Modified
* `/components/editors/code/FormulaEditor/FormulaEditor.tsx`
  * Added documentation comment about known limitation
  * Changed lineHeights hook to use textareaRef instead of overlayRef

* `/components/editors/code/FormulaEditor/hooks/useFormulaSyntax.ts`
  * Removed `wrapLinesWithIndentation()` function
  * Simplified syntax highlighting to return plain highlighted HTML
  * No longer wraps lines in divs with padding

* `/components/editors/code/FormulaEditor/hooks/useLineHeights.ts`
  * Complete rewrite to use measuring element approach
  * Enhanced measurement with double requestAnimationFrame
  * Separate effect for resize handling
  * Complete style copying from textarea

* `/components/editors/code/FormulaEditor/FormulaEditor.module.css`
  * Removed CSS rules for overlay content divs
  * Simplified to basic overlay styling

* `/guidelines/Guidelines.md`
  * Added "Known Limitations & Future Enhancements" section
  * Documented textarea wrapping limitation
  * Listed future enhancement options

---

## Testing

**Verification Steps:**
1. ✅ Textarea and overlay align correctly on load
2. ✅ Alignment maintained while typing
3. ✅ Alignment maintained when resizing window
4. ✅ Line numbers adjust height for wrapped lines
5. ✅ Error/warning highlights cover full wrapped line height
6. ✅ Debug highlights position correctly on wrapped lines
7. ✅ Cursor position matches visual text position
8. ✅ Selection highlights work correctly

**Edge Cases:**
* Empty lines (use zero-width space in measurement)
* Very long lines (wrap multiple times)
* Rapid window resizing (debounced with rAF)
* Initial render (double rAF ensures measurement accuracy)

---

## Known Limitation Accepted

**What We Gave Up:**
* Wrapped lines continuing at indentation level
* "Hanging indent" appearance for code blocks

**What We Kept:**
* Perfect textarea/overlay alignment
* Accurate line height measurement
* Correct row highlighting for wrapped content
* Functional editing experience

**Why This Is Okay:**
* Most professional code editors (VS Code, Sublime) also wrap to column 0
* Users are familiar with this behavior
* The alignment accuracy is more important than fancy wrapping
* Can be addressed in future with better editor component

---

## Future Enhancement Options

### Option 1: Contenteditable Div (Medium Effort)
* Replace `<textarea>` with `<div contenteditable="true">`
* Gain full CSS control over content
* **Tradeoff:** Must reimplement input handling, cursor management, selection
* **Benefit:** Can achieve indentation-preserving wrapping

### Option 2: Professional Editor Library (Low Effort, High Quality)
* Integrate CodeMirror 6 or Monaco Editor
* Battle-tested, full-featured code editing
* **Tradeoff:** Larger bundle size, learning curve for customization
* **Benefit:** Professional features out of the box (syntax highlighting, autocomplete, etc.)

### Option 3: Canvas-Based Rendering (High Effort)
* Render text directly to Canvas
* Maximum control over every pixel
* **Tradeoff:** Must implement everything from scratch (cursor, selection, rendering)
* **Benefit:** Unlimited styling possibilities, best performance

### Recommendation for Production

**Phase 1 (Current):** Accepted limitation, focus on core functionality
**Phase 2 (Next):** Evaluate CodeMirror 6 integration for Formula Editor
**Phase 3 (Future):** If CodeMirror works well, migrate other editors

---

## References

* CRIT-003: Line number height adjustments for wrapped lines
* Guidelines.md: Known Limitations & Future Enhancements
* HTML Spec: Textarea element limitations
* CSS Spec: text-indent property (doesn't work on textarea content)

---

## Lessons Learned

1. **Understand platform limitations early** - HTML textareas are text-only, can't style individual lines
2. **Don't fight the platform** - Trying to make textarea do what it can't leads to misalignment
3. **Document limitations clearly** - Future developers need to know why we made this choice
4. **Provide migration path** - Document how to fix this properly when resources allow
5. **Measurement accuracy matters** - Double rAF and complete style copying ensures correct rendering

---

## Next Steps

* ✅ Document limitation in Guidelines.md
* ✅ Update FormulaEditor comments
* ✅ Ensure line height measurement robust
* 🔜 Monitor for user feedback on wrapping behavior
* 🔜 Evaluate CodeMirror 6 for future enhancement
* 🔜 Consider applying same approach to BAL Editor if needed
