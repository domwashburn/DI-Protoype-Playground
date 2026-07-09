# Syntax Highlighting Regression Fixes

**Date:** November 13, 2025
**Type:** Bug Fixes
**Status:** ✅ Complete

## Summary

Fixed 6 critical syntax highlighting regressions in FormulaEditor that were discovered during Phase 1 of BAL feature implementation. All issues related to pattern matching, overlap detection, and cross-line matching have been resolved.

## Issues Fixed

### 1. Keywords Not Displaying as Blue
- **Issue:** IF/THEN/ELSE/AND/OR keywords showed as bold black instead of bold blue
- **Fix:** Added missing `--syntax-keyword: #0f62fe;` CSS variable to globals.css

### 2. BAL Plain Text Incorrectly Purple
- **Issue:** All identifiers in BAL mode were highlighted purple (should be gray)
- **Fix:** Removed overly broad BAL variable pattern that was matching all identifiers

### 3. Comments with Special Characters Breaking Highlighting
- **Issue:** Special chars ($, ', ", `, etc.) in comments broke highlighting on subsequent lines
- **Fix:** Improved overlap detection from `match.index >= region.start` to proper interval overlap: `matchStart < region.end && matchEnd > region.start`

### 4. Template Literal Internal Highlighting Lost
- **Issue:** Template literals showed all green, no internal syntax highlighting
- **Fix:** Changed to recursively highlight ENTIRE template content, not just `${}` expressions

### 5. Object Property Access Showing as Invalid
- **Issue:** `$customer.name` showed red underline (undefined variable)
- **Fix:** Validate only base variable name before dot; property access always valid

### 6. Unmatched Quotes Breaking Highlighting Across Lines
- **Issue:** Single `'` or `"` in comment caused highlighting to break on subsequent lines
- **Fix:** Updated verbalization and string patterns to exclude newlines: `[^'\\\n]` and `[^"\\\n]`

## Technical Details

### Pattern Updates

**Verbalization Pattern:**
```typescript
// Before: Could match across lines
pattern: /'([^'\\]|\\.)+('(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*)/g

// After: Cannot cross line boundaries
pattern: /'([^'\\\n]|\\.)+('(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*)/g
```

**String Pattern:**
```typescript
// Before: Could match across lines
pattern: /"(?:[^"\\]|\\.)*"/g

// After: Cannot cross line boundaries  
pattern: /"([^"\\\n]|\\.)*"/g
```

**Variable Validation:**
```typescript
// Before: Validated entire match including properties
const varName = match[0].substring(1); // "customer.name"
const isValid = variableNames.includes(varName); // ❌

// After: Validate only base variable name
const withoutDollar = fullMatch.substring(1);
const dotIndex = withoutDollar.indexOf('.');
const baseVarName = dotIndex > 0 ? withoutDollar.substring(0, dotIndex) : withoutDollar;
const isValid = variableNames.includes(baseVarName); // ✅
```

### Key Innovation: Two-Pass Highlighting System

**Pass 1 - Extract Special Regions:**
- Comments: Extract and escape as HTML, mark region bounds
- Template Literals: Recursively highlight content, mark region bounds

**Pass 2 - Token Matching:**
- Match all syntax rule patterns
- Skip any tokens that overlap with special regions
- Proper interval overlap: `matchStart < region.end && matchEnd > region.start`

This prevents special characters in comments/templates from being matched by other patterns.

## Files Modified

### Core Files
- `/components/editors/code/shared/hooks/useCodeSyntax.ts`
  - Updated verbalization pattern to exclude newlines
  - Updated string pattern to exclude newlines
  - Fixed variable validation to check only base name
  - Improved overlap detection logic (already fixed in previous session)

### Styles
- `/styles/globals.css`
  - Added `--syntax-keyword: #0f62fe;` variable

## Testing Examples

### Example 1: Comments with Special Characters ✅
```formula
// Type $ to see symbolic variables
// Type ' to see verbalized variables

'customer name' = "John Doe"
'customer age' = 25
```

### Example 2: Template Literals ✅
```formula
set 'summary' to `'item count' items = $'final price'`
```

### Example 3: Object Property Access ✅
```formula
$customer = {name: "Alice", age: 32}
$customerName = $customer.name  // No red underline
```

### Example 4: Multi-line with Unmatched Quotes ✅
```formula
// Type ' to see variables
'customer name' = "John"
'is adult' = 'customer age' >= 18
IF 'is adult' THEN
  "Welcome"
END
```

## Impact

- ✅ All 6 syntax highlighting regressions resolved
- ✅ Comments fully protected from pattern matching
- ✅ Template literals show full internal highlighting
- ✅ Object property access validates correctly
- ✅ Cross-line quote matching eliminated
- ✅ Ready to continue Phase 2 (conditional variable table) and Phase 3 (testing & polish)

## Next Steps

Continue with BAL feature implementation:
- **Phase 2:** Conditional variable table hiding based on editor mode
- **Phase 3:** Testing and polish for BAL support

## References

- Bug tracking: `/planning/bugs/SYNTAX_HIGHLIGHTING_REGRESSIONS.md`
- Syntax hook: `/components/editors/code/shared/hooks/useCodeSyntax.ts`
