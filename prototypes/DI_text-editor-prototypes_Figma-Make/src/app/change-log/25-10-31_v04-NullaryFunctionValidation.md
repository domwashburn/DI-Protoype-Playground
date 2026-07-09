# Change Log Entry: Nullary Function Validation

**Date:** 2025-10-31  
**Version:** v04  
**Type:** Bug Fix  
**Severity:** Minor  

---

## Summary

Fixed validation logic to correctly handle nullary functions (utility functions that don't require parameters). Functions like `NOW()`, `TODAY()`, `TRUE()`, `FALSE()`, etc. no longer trigger "Empty parentheses found" warnings.

---

## Problem Description

### Observed Symptom
Valid formula expressions using nullary functions were incorrectly flagged with warnings:
```
$daysUntilPreferred = DAYS_BETWEEN(NOW(), #appointment.preferredDate)
                                   ^^^^^
Warning: Empty parentheses found
```

### Root Cause
The formula validation hook was checking for all empty parentheses `()` patterns and flagging them as warnings, without distinguishing between:
- **Invalid empty calls**: `someFunction()` where parameters are required
- **Valid nullary functions**: `NOW()`, `TODAY()`, etc. that have no parameters by design

### Why This Matters
- Creates false positives in the Issues panel
- Confuses users about what is actually wrong
- Nullary functions are a standard pattern in formula languages (SQL, Excel, etc.)

---

## Changes Made

### Modified `/components/editors/code/FormulaEditor/hooks/useFormulaValidation.ts`

**Before:**
```typescript
// 3. Check for empty parentheses or brackets
if (/\(\s*\)/.test(formulaWithoutComments)) {
  issues.push({
    severity: 'warning',
    message: 'Empty parentheses found',
    code: 'EMPTY_PARENS',
  });
}
```

**After:**
```typescript
// 3. Check for empty parentheses (but not for nullary functions)
// Nullary functions are valid utility functions that don't require parameters
const nullaryFunctions = [
  'NOW', 'TODAY', 'TRUE', 'FALSE', 'NULL', 'PI', 'E'
];

const emptyParensPattern = /\(\s*\)/g;
while ((match = emptyParensPattern.exec(formulaWithoutComments)) !== null) {
  // Check if this is preceded by a nullary function name
  const beforeParen = formulaWithoutComments.substring(0, match.index).trim();
  const isNullaryFunction = nullaryFunctions.some(fn => 
    new RegExp(`\\b${fn}$`, 'i').test(beforeParen)
  );
  
  if (!isNullaryFunction) {
    issues.push({
      severity: 'warning',
      message: 'Empty parentheses found',
      position: {
        start: match.index,
        end: match.index + match[0].length,
      },
      code: 'EMPTY_PARENS',
    });
  }
}
```

**Key Changes:**
1. **Nullary function whitelist** - Defined list of functions that don't require parameters
2. **Context-aware checking** - Look at what precedes the `()` to determine if it's a known nullary function
3. **Case-insensitive matching** - Works with `NOW()`, `now()`, `Now()`, etc.
4. **Word boundary check** - Ensures we match complete function names (won't match `KNOW()`)

---

## Nullary Functions Supported

The following functions are recognized as valid with empty parentheses:

| Function | Return Type | Description |
|----------|-------------|-------------|
| `NOW()` | datetime | Current date and time |
| `TODAY()` | date | Current date (no time) |
| `TRUE()` | boolean | Boolean true constant |
| `FALSE()` | boolean | Boolean false constant |
| `NULL()` | null | Null/empty value |
| `PI()` | number | Mathematical constant π (3.14159...) |
| `E()` | number | Mathematical constant e (2.71828...) |

**Note:** These functions CAN be called with empty parentheses but some also support alternative syntax:
- `TRUE` and `FALSE` can be used without parentheses as keywords
- `NOW()` always requires parentheses

---

## Files Modified

1. `/components/editors/code/FormulaEditor/hooks/useFormulaValidation.ts`
   - Updated empty parentheses validation logic (lines 304-323)
   - Added nullary function whitelist
   - Added context-aware checking before flagging warning

---

## Testing Recommendations

### Test Cases

**1. Valid Nullary Functions (No Warning Expected):**
```
$currentDate = NOW()
$today = TODAY()
$isTrue = TRUE()
$isFalse = FALSE()
$empty = NULL()
$pi = PI()
$e = E()
```

**2. Invalid Empty Parentheses (Warning Expected):**
```
$result = SOME_FUNCTION()  // If SOME_FUNCTION requires params
$value = ()                 // Invalid syntax
```

**3. Case Insensitivity:**
```
$now1 = NOW()
$now2 = now()
$now3 = Now()
```
All should work without warnings.

**4. Mixed Context:**
```
$daysUntilPreferred = DAYS_BETWEEN(NOW(), #appointment.preferredDate)
```
Should work without warning - `NOW()` is valid, `DAYS_BETWEEN` has required parameters.

**5. Word Boundaries:**
```
$result = KNOW()  // Should warn (KNOW is not in nullary list)
$result = NOW()   // Should NOT warn
```

---

## Impact

**Before Fix:**
- ❌ Valid nullary functions flagged with warnings
- ❌ Issues panel shows false positives
- ❌ User confusion about what needs fixing
- ❌ `NOW()`, `TODAY()`, etc. appear as problems

**After Fix:**
- ✅ Nullary functions validated correctly
- ✅ Only actual issues appear in Issues panel
- ✅ Clear distinction between valid utility functions and errors
- ✅ Standard formula syntax fully supported

---

## Future Enhancements

### Potential Improvements

1. **Function Registry**
   - Move nullary function list to centralized function registry
   - Include parameter requirements for ALL functions
   - Validate parameter count dynamically

2. **Parameter Validation**
   - Warn when wrong number of parameters provided
   - Example: `DATE_ADD()` requires 3 parameters, warn if different

3. **Better Error Messages**
   - "Function X requires N parameters, received M"
   - Suggest correct usage

4. **Autocomplete Integration**
   - Show parameter hints for functions
   - Indicate which parameters are optional vs required

---

## Related Patterns

### Nullary Functions in Other Languages

**SQL:**
```sql
SELECT NOW(), CURRENT_DATE, USER()
```

**Excel:**
```excel
=TODAY()
=NOW()
=TRUE()
=PI()
```

**JavaScript:**
```javascript
new Date()  // No parameters needed
Math.PI     // Property, not function
```

Our implementation aligns with SQL/Excel patterns where nullary functions use `()` syntax.

---

## Notes

- This fix is backwards compatible - existing formulas work the same way
- Only affects validation warnings, not evaluation behavior
- The evaluation engine already supported these functions correctly
- User-visible change: Fewer false positive warnings

---

## Verification Steps

To verify the fix:

1. Open Formula Editor
2. Select "Appointment Scheduling Window" sample (or create new formula)
3. Type: `$currentTime = NOW()`
4. Verify no warning appears in Issues panel
5. Type: `$result = SOME_RANDOM_FUNCTION()`
6. Verify warning DOES appear (if function not recognized)
7. Test with various case combinations: `now()`, `NOW()`, `Now()`
8. All should work without warnings

---

## Context

This issue was discovered while testing the "Appointment Scheduling Window" formula sample which uses:
```
$daysUntilPreferred = DAYS_BETWEEN(NOW(), #appointment.preferredDate)
```

The `NOW()` function was being flagged incorrectly, even though it's a standard utility function that doesn't require parameters.

The fix ensures that our formula validation aligns with standard formula language conventions where certain utility functions are "nullary" (take zero arguments) by design.
