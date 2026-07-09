# BAL Editor Selection Bug Fix

**Date:** October 24, 2025  
**Version:** v18  
**Type:** Bug Fix  
**Status:** ✅ Fixed

---

## Summary

Fixed a critical bug in the BAL Editor where users couldn't select text across the full width of lines. The issue was caused by two problems: inconsistent sizing between overlay and textarea, AND HTML entity encoding of single quotes causing character width mismatches.

---

## Problem

**User Report:**
- Could only select text in certain areas (shown in blue highlighting)
- Selection didn't extend to the full width of editor
- Cursor placement was restricted to specific regions

**Root Causes:**

1. **Inconsistent sizing between `.balHighlightOverlay` and `.balTextarea`:**
   - Overlay used: `right: 0; bottom: 0;`
   - Textarea used: `width: 100%; height: 100%;`

2. **HTML entity encoding for single quotes:**
   - Overlay rendered: `&#39;hello&#39;` (11 characters)
   - Textarea contained: `'hello'` (7 characters)
   - Character count mismatch caused overlay/textarea misalignment

---

## Solution

**Fix 1: Consistent sizing (Applied in first fix)**

```css
/* Changed .balHighlightOverlay to use explicit width/height */
.balHighlightOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;  /* ✅ Matches textarea */
  height: 100%; /* ✅ Matches textarea */
  /* ... */
}
```

**Fix 2: Remove HTML entity encoding for quotes**

```javascript
// BEFORE - HTML entity encoding
highlighted = highlighted.replace(/(?<![a-zA-Z0-9])'([^']*)'(?![a-zA-Z0-9])/g, 
  (match, content) => {
    const escapedContent = content.replace(/'/g, '&#39;');
    return `<span class="bal-string">&#39;${escapedContent}&#39;</span>`;
  }
);

// AFTER - Raw single quote character
highlighted = highlighted.replace(/(?<![a-zA-Z0-9])'([^']*)'(?![a-zA-Z0-9])/g, 
  (match, content) => {
    // Use raw single quote character, not HTML entity
    return `<span class="bal-string">'${content}'</span>`;
  }
);
```

**Why this works:**
- Single quotes don't need to be HTML-escaped (only in attributes)
- Raw characters ensure exact character count match between overlay and textarea
- Perfect alignment enables proper text selection

---

## Files Modified

```
/components/BALEditor/
  BALEditor.module.css    # Fixed overlay sizing (first fix)
  BALEditor.tsx           # Fixed quote HTML entity encoding (second fix)
```

---

## Testing

**Verified:**
- [x] Can select text across full width of lines
- [x] Can click anywhere in the editor to position cursor
- [x] Text selection works correctly in all areas
- [x] Selection works with strings containing single quotes
- [x] No impact on syntax highlighting appearance
- [x] No impact on line numbers
- [x] No impact on autocomplete

**Formula Editor:**
- [x] Formula Editor still works correctly (uses same pattern)

---

## Why This Happened

The BAL Editor was recently refactored to add line numbers (similar to Formula Editor). Two issues were introduced:

1. **Sizing mismatch**: Using `right: 0; bottom: 0;` vs. `width: 100%; height: 100%;` can produce different results depending on padding, borders, and box-sizing, causing the layers to misalign.

2. **HTML entity encoding**: The syntax highlighting code was converting single quotes to `&#39;` HTML entities. This caused the overlay text to have different character counts than the textarea text, breaking the alignment between the transparent textarea text and the colored overlay text.

---

## Prevention

**Best Practices:**

1. **Overlapping positioned elements must use identical sizing:**

```css
/* ✅ GOOD - Consistent */
.layer1 { width: 100%; height: 100%; }
.layer2 { width: 100%; height: 100%; }

/* ❌ AVOID - Inconsistent */
.layer1 { width: 100%; height: 100%; }
.layer2 { right: 0; bottom: 0; }
```

2. **Textarea + overlay pattern requires exact character matching:**

```javascript
/* ✅ GOOD - Raw characters */
overlayHTML = `<span class="highlight">${rawText}</span>`;

/* ❌ AVOID - HTML entities change character count */
overlayHTML = `<span class="highlight">&#39;${text}&#39;</span>`;
```

**Key Principle:** In textarea + overlay architectures, the overlay HTML must render with **exactly the same character widths** as the textarea's raw text. Any character count or width mismatch will break text selection and cursor positioning.

---

## Related Guidelines

From **Guidelines.md v2.1**:

> Some of the base components you are using may have styling (eg. gap/typography) baked in as defaults.
> So make sure you explicitly set any styling information from the guidelines in the generated react to override the defaults.

This applies to ensuring consistent rendering between layers - always verify that:
- Sizing properties match exactly
- Character encoding is consistent
- Font metrics are identical
- Padding/spacing is synchronized

---

## Status

✅ **Fixed** - BAL Editor selection now works correctly across entire editor area with proper character alignment