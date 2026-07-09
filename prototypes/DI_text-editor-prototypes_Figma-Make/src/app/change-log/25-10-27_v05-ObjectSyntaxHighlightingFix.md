# Object Syntax Highlighting & Scroll Sync Fix

**Date:** October 27, 2025  
**Status:** ✅ Complete  
**Related:** Increment 3.1 Phase 1 - Structured Data (Objects)

---

## Summary

Fixed two issues with the Formula Editor's object literal support:
1. Independent scrolling between textarea and formatted overlay
2. Missing syntax highlighting for object literal keys

---

## Issues Fixed

### Issue 1: Independent Scrolling

**Problem:**
The underlying textarea was scrolling independently from the formatted text overlay, causing visual misalignment when viewing formulas with object literals.

**Root Cause:**
The `syncScroll` function referenced a non-existent `typeaheadOverlayRef` that was removed in a previous refactor. This caused the scroll sync to fail silently.

**Solution:**
Updated `syncScroll` to properly sync all overlay elements:
```typescript
const syncScroll = useCallback(() => {
  if (textareaRef.current && overlayRef.current) {
    // Sync horizontal and vertical scroll between textarea and overlay
    overlayRef.current.scrollTop = textareaRef.current.scrollTop;
    overlayRef.current.scrollLeft = textareaRef.current.scrollLeft;
  }
  
  // Sync highlight container if it exists
  if (textareaRef.current && highlightContainerRef.current) {
    highlightContainerRef.current.scrollTop = textareaRef.current.scrollTop;
    highlightContainerRef.current.scrollLeft = textareaRef.current.scrollLeft;
  }
  
  // Sync line numbers (vertical only)
  if (editorContentRef.current && lineNumbersRef.current) {
    lineNumbersRef.current.scrollTop = editorContentRef.current.scrollTop;
  }
}, []);
```

### Issue 2: Missing Object Key Highlighting

**Problem:**
Object literal keys (like `name`, `age`, `amount` in `{name: "Alice", age: 30}`) were not being highlighted, making object literals harder to read.

**Solution:**
Added a new syntax highlighting rule for object keys:

```typescript
// Object literal keys (identifier followed by colon)
{
  name: 'objectKey',
  pattern: /([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g,
  className: 'formula-object-key',
  priority: 7,
}
```

**CSS Styling:**
```css
:global(.formula-object-key) {
  color: var(--syntax-function);
  font-weight: 500;
}
```

**Visual Result:**
```typescript
// Before: name, age, amount had no highlighting
{name: "Alice", age: 30, amount: 45000}

// After: name, age, amount highlighted in function color (bold, blue)
{name: "Alice", age: 30, amount: 45000}
 ^^^^            ^^^      ^^^^^^
 highlighted     highlighted  highlighted
```

---

## Syntax Highlighting Hierarchy

**Current priorities (applied in order):**
1. Comments (priority 10)
2. Numbers, operators, brackets, commas (priority 1-2)
3. Functions (priority 3)
4. Strings (priority 4)
5. Attributes (priority 5)
6. Variables (priority 6)
7. **Object keys (priority 7)** ← NEW
8. **Property access (priority 8)** ← Updated priority

**Pattern Matching:**
- Object keys: `identifier:` → Blue, bold (function color)
- Property access: `.identifier` → Blue, italic (attribute color)
- Variables: `$identifier` → Purple, medium weight
- Attributes: `#identifier.path` → Blue, medium weight

---

## Files Modified

- ✅ `/components/editors/code/FormulaEditor/FormulaEditor.tsx` - Fixed scroll sync
- ✅ `/components/editors/code/FormulaEditor/hooks/useFormulaSyntax.ts` - Added object key pattern
- ✅ `/components/editors/code/FormulaEditor/FormulaEditor.module.css` - Added object key styling

---

## Testing

**Test Case 1: Scroll Synchronization**
```typescript
// Create a long formula with object arrays
$salesData = [
  {name: "Alice Chen", division: "West", amount: 45000},
  {name: "Bob Smith", division: "East", amount: 78000},
  {name: "Charlie Brown", division: "West", amount: 52000},
  {name: "Diana Prince", division: "North", amount: 91000},
  {name: "Ethan Hunt", division: "South", amount: 63000}
]

$topName = $salesData[0].name
```

✅ Scrolling vertically and horizontally keeps overlay aligned with textarea
✅ Line numbers sync with content scroll

**Test Case 2: Object Key Highlighting**
```typescript
{name: "Alice", age: 30, score: 850}
```

✅ `name`, `age`, `score` highlighted in function color (blue, bold)
✅ String values remain in string color (green)
✅ Numbers remain in number color (purple)

**Test Case 3: Property Access vs Object Keys**
```typescript
$customer = {name: "Alice", age: 30}
$customerName = $customer.name
```

✅ Object key `name:` in line 1 → blue, bold
✅ Property access `.name` in line 2 → blue, italic
✅ Visual distinction between object definition and property access

---

## Known Limitations

**Object Key Pattern Limitations:**
- Pattern matches `identifier:` which works for object literals
- May also match labels in other contexts (rare in formula syntax)
- Does not validate that the key is inside `{...}` (would require context-aware parsing)

**Acceptable Trade-off:**
- False positives are rare in formula syntax
- Performance benefit of regex-based highlighting
- Clear visual improvement for 99% of use cases

---

## Future Enhancements

**Potential Improvements:**
- Context-aware parsing to only highlight keys inside object literals
- Different colors for object keys vs property access
- Bracket matching for object literals
- Auto-complete for object keys based on first object in array

---

**Status:** ✅ Complete - Both scrolling and syntax highlighting working correctly  
**Impact:** Improved Formula Editor UX for object literals
