# ✅ Fixed: Regex Word Boundary Bug in useCodeSyntax

**Date:** November 13, 2025  
**Bug:** Keywords (IF, THEN, ELSE, etc.) were not being highlighted in BAL Editor  
**Root Cause:** Double-escaped word boundary `\\\\b` instead of `\\b` in keyword regex  
**Status:** ✅ Fixed

---

## Problem

Keywords like `IF`, `THEN`, `ELSE`, `ELSIF`, `END` were NOT being highlighted in the BAL Editor, even though:
- The `useCodeSyntax` hook was being called
- The CSS styling was correct
- The hook was returning highlighted HTML

**Visual Evidence:**
- Formula Editor: Keywords highlighted in blue ✅
- BAL Editor: Keywords NOT highlighted (plain black text) ❌

---

## Root Cause

The keyword regex pattern had **double-escaped word boundaries**:

```typescript
// ❌ BROKEN - Line 161
pattern: /\\b(IF|THEN|ELSE|...)\\\\b/gi,
//          ^^                  ^^^^ Double backslash!
```

**What this does:**
- Template string `\\\\b` becomes string value `\\b`
- RegExp interprets `\\b` as **literal backslash-b** (not word boundary!)
- The regex `/\\b..\\b/` matches text like `\bIF\b` (with actual backslashes)
- Our code has `IF` without backslashes, so NO MATCH!

**What it should be:**
```typescript
// ✅ FIXED
pattern: /\\b(IF|THEN|ELSE|...)\\b/gi,
//          ^^                  ^^ Single backslash in template string
```

**How this works:**
- Template string `\\b` becomes string value `\b`  
- RegExp interprets `\b` as **word boundary** ✅
- The regex `/\b..\b/` matches words like `IF`, `THEN`, `END`

---

## The Fix

### File: `/components/editors/code/shared/hooks/useCodeSyntax.ts`

**Before (Line 161):**
```typescript
{
  name: 'keyword',
  pattern: /\\b(IF|THEN|ELSE|ELSIF|ELSEIF|OTHERWISE|END|AND|OR|NOT|SET|TO|WHERE|IS|NEW|THE|OF|DEFINE|FUNCTION|RETURNS|RETURN|FOR|EACH|IN|WHILE|DO|TRUE|FALSE|NULL|EQUAL)\\\\b/gi,
  //      ^^                                                                                                                                                               ^^^^ WRONG!
  className: `${prefix}-keyword`,
  priority: 3,
},
```

**After (Line 161):**
```typescript
{
  name: 'keyword',
  pattern: /\\b(IF|THEN|ELSE|ELSIF|ELSEIF|OTHERWISE|END|AND|OR|NOT|SET|TO|WHERE|IS|NEW|THE|OF|DEFINE|FUNCTION|RETURNS|RETURN|FOR|EACH|IN|WHILE|DO|TRUE|FALSE|NULL|EQUAL)\\b/gi,
  //      ^^                                                                                                                                                               ^^ FIXED!
  className: `${prefix}-keyword`,
  priority: 3,
},
```

**Change:** Removed double-escape `\\\\b` → single-escape `\\b`

---

## Why This Happened

**Context:** When creating the shared `useCodeSyntax` hook, the regex patterns were likely copy-pasted from somewhere that required different escaping, or an extra backslash was accidentally added during refactoring.

**JavaScript Regex Escaping Rules:**
1. **Regex literal:** `/\b/` - word boundary (no escaping needed in source)
2. **RegExp constructor with template string:** ``new RegExp(`\\b`)`` - ONE backslash needed
3. **RegExp constructor with regular string:** `new RegExp("\\b")` - ONE backslash needed
4. **WRONG:** ``new RegExp(`\\\\b`)`` - TWO backslashes = literal backslash-b!

---

## Impact

### Before Fix:
- **BAL Editor:** Keywords not highlighted ❌
- **Formula Editor:** Keywords highlighted correctly ✅ (because it uses regex literals, not RegExp constructor for keywords)

### After Fix:
- **BAL Editor:** Keywords highlighted in blue ✅
- **Formula Editor:** Keywords still highlighted correctly ✅
- **Both editors now identical!** 🎉

---

## Testing

### BAL Editor - Keywords Now Highlighted:
```bal
IF $orderTotal > 1000 THEN
^^ Blue                ^^^^ Blue
  $orderTotal = 0.15
  ^^^^^^^^^^^^ Purple
ELSIF $loyaltyTier = "gold" THEN
^^^^^ Blue           ^ Blue ^^^^ Blue
  $orderTotal = 0.10
ELSE
^^^^ Blue
  $orderTotal = 0.05
END
^^^ Blue
```

### Formula Editor - Still Works:
```formula
IF $orderTotal > 1000 THEN
^^ Blue                ^^^^ Blue
  set $discount to 0.15
      ^^^^^^^^^^ Purple
ELSIF $loyaltyTier = "gold" THEN
^^^^^ Blue            ^^^^ Blue
  set $discount to 0.10
ELSE
^^^^ Blue
  set $discount to 0.05
END
^^^ Blue
```

---

## Lessons Learned

### 1. RegExp Constructor Escaping
When using `new RegExp()` with template strings:
- Word boundary: ``\\b`` (one backslash in template string)
- Literal backslash: ``\\\\`` (two backslashes in template string)
- Don't over-escape!

### 2. Testing Shared Code
When creating shared hooks/utilities:
- Test with BOTH consumers immediately
- Don't assume "if it works in one place, it works everywhere"
- Visual testing catches what unit tests might miss

### 3. Copy-Paste Errors
Be careful when copying regex patterns:
- Regex literals use different escaping than RegExp constructor
- `/\b/` (regex literal) ≠ ``new RegExp(`\\b`)`` (constructor)

---

## Related Fixes

While fixing this, also verified:
- ✅ Vocabulary term pattern: Uses RegExp constructor correctly
- ✅ All other patterns: Use proper escaping
- ✅ No other double-escape issues found

---

## Summary

**The bug:** Double-escaped word boundaries in keyword regex prevented matches  
**The fix:** Changed `\\\\b` to `\\b` in keyword pattern  
**The result:** Keywords now highlight correctly in both BAL and Formula Editors  

**Both editors now use the same shared syntax highlighting and display identically!** ✨
