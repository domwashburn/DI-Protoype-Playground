# ✅ BAL Editor Aligned with Formula Editor

**Date:** November 13, 2025  
**Issue:** BAL Editor had inconsistent syntax highlighting compared to perfect Formula Editor  
**Status:** ✅ Fixed - Both editors now use identical highlighting logic

---

## Problems Fixed

### 1. ❌ HTML Entity Display Issue
**Problem:** Quotes were showing as `&quot;` instead of actual quote characters

**Before:**
```
&quot;Congratulations! Your loan has been approved.&quot;
```

**After:**
```
"Congratulations! Your loan has been approved."
```

**Fix:** Escape HTML AFTER tokenization, not before pattern matching
- Formula Editor does: `escapeHtml(token.text)` on individual tokens
- BAL Editor was doing: `escapeHtml(entireLine)` then trying to match patterns on escaped HTML

### 2. ❌ Single Quotes Not Rendering
**Problem:** Single quotes were being escaped when they shouldn't be

**Fix:** Don't escape single quotes in HTML content (only needed in HTML attributes)
```typescript
const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '&quot;');
  // Note: Single quotes NOT escaped - keeps exact character width match with textarea
};
```

### 3. ❌ Natural Language Operators Highlighted as Keywords
**Problem:** Words like `of`, `to`, `is` were highlighted blue (keywords) instead of red (NL operators)

**Before:**
```bal
if the credit score of the applicant is greater than...
   ^^^ blue      ^^^ BLUE (wrong!)
```

**After:**
```bal
if the credit score of the applicant is greater than or equal to...
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ RED (italic)
```

**Fix:** Lower keyword priority from 7 to 3, so NL operators (priority 8-9) win

---

## Unified Architecture

Both editors now use THE SAME token-based highlighting approach:

### Token Priority System (Higher Wins Overlaps)

| Priority | Type | Example | Color |
|----------|------|---------|-------|
| 11 | Template literals | `` `Hello ${name}` `` | Green |
| 10 | Comments | `// comment` | Gray |
| 9 | NL Functions | `the sum of`, `the first of` | Red italic |
| 8 | NL Operators | `is greater than`, `multiplied by` | Red italic |
| 6 | Vocabulary | `the credit score` | Purple |
| 5 | Verbalizations | `'customer name'.value` | Green |
| 4 | Strings | `"text"` | Green |
| 3 | Keywords | `IF`, `THEN`, `SET` | Blue |
| 2 | Numbers | `123`, `45.67` | Purple |
| 1 | Operators | `+`, `-`, `*` | Pink |

### Key Principles

1. **Escape AFTER tokenization** - Pattern match on plain text, escape individual tokens
2. **Don't escape single quotes** - Keeps character width match with textarea
3. **NL operators before keywords** - Higher priority prevents keyword capture
4. **Token overlap resolution** - Higher priority wins

---

## Color Consistency

### BAL Editor CSS Variables
```css
--bal-syntax-keyword: #0f62fe;          /* Blue */
--bal-syntax-string: #198038;           /* Green */
--bal-syntax-verbalization: #198038;    /* Green */
--bal-syntax-number: #8a3ffc;           /* Purple */
--bal-syntax-operator: #d12771;         /* Pink */
--bal-syntax-nl-operator: #d12771;      /* Pink - NEW! */
--bal-syntax-comment: #6f6f6f;          /* Gray */
--bal-syntax-vocabulary: #8a3ffc;       /* Purple */
```

### Formula Editor CSS Variables
```css
--syntax-variable: #8a3ffc;             /* Purple */
--syntax-attribute: #0f62fe;            /* Blue */
--syntax-operator: #d12771;             /* Pink */
--syntax-number: #8a3ffc;               /* Purple */
--syntax-function: #0f62fe;             /* Blue */
--syntax-string: #198038;               /* Green */
--syntax-comment: #6f6f6f;              /* Gray */
```

**Perfect alignment!** Same colors across both editors.

---

## Files Changed

### `/components/BALEditor/BALEditor.tsx`
- ✅ Rewrote `applySyntaxHighlighting()` to match Formula Editor approach
- ✅ Moved `escapeHtml()` inside function to escape tokens individually
- ✅ Removed single quote escaping
- ✅ Lowered keyword priority from 7 → 3
- ✅ Added NL operator patterns with priority 8-9
- ✅ Escape HTML AFTER pattern matching, not before

### `/styles/globals.css`
- ✅ Added `--bal-syntax-nl-operator: #d12771;`
- ✅ Added `--bal-syntax-verbalization: #198038;`

---

## Expected Results

### ✅ Natural Language Operators (Red Italic)
```bal
if the credit score of the applicant is greater than or equal to 750
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ RED italic
```

### ✅ String Literals (Green)
```bal
set 'approval message' to "Congratulations! Your loan has been approved.";
                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ GREEN
```

### ✅ Keywords (Blue)
```bal
if the tier is equal to "platinum" then
^^ BLUE  ^^ BLUE       ^^^^ BLUE
```

### ✅ Numbers (Purple)
```bal
set 'platinum discount' to 0.15;
                           ^^^^ PURPLE
```

### ✅ Proper Quote Rendering
- No more `&quot;` showing in editor
- Single quotes render correctly
- Perfect character alignment with textarea

---

## Architecture Notes

**Both editors are now architecturally aligned:**

- Same token-based highlighting algorithm
- Same priority system
- Same escape strategy (after tokenization)
- Same NL operator support
- Same color scheme

**The editors are NOT a single component with modes** - they're separate components that now share the same highlighting APPROACH. This is intentional:
- BAL Editor has BAL-specific features (autocomplete, validation)
- Formula Editor has formula-specific features (variable validation, attribute support)
- Shared highlighting LOGIC, not shared COMPONENT

This follows the **Strangler Pattern** - both editors can evolve independently while maintaining consistent highlighting behavior.

---

## Summary

✅ **HTML entities fixed** - quotes render properly  
✅ **NL operators highlighted correctly** - red italic, not blue  
✅ **Perfect color alignment** - matches Formula Editor  
✅ **Architectural consistency** - same token-based approach  
✅ **Single quotes work** - no escaping issues  

**Both editors are now visually consistent and use the same proven highlighting logic!** 🎉
