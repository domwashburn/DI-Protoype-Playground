# v15 - Known Issues & Bug Tracking

**Date:** October 25, 2025  
**Type:** Bug Documentation  
**Status:** 📋 Tracked  

---

## Active Issues

### Issue #1: String Type Coercion in Comparisons

**Severity:** Medium  
**Component:** Evaluation Engine  
**Status:** 🐛 Bug - Needs Fix  

**Description:**

When testing formulas with numeric variables, comparison operators (`>`, `<`, `>=`, `<=`) fail because values from test inputs are treated as strings instead of numbers.

**Reproduction:**

1. Create formula with numeric comparison:
   ```
   IF $priority > 5 OR $priority = 3 THEN
     100
   ELSE
     50
   END
   ```

2. Set variable `$priority` type to `number`
3. Enter test value `11` in test panel
4. Evaluate

**Expected Result:**
- `11 > 5` evaluates to `true`
- Formula returns `100`

**Actual Result:**
- Error: "Cannot apply operator > to string and string"
- Formula fails to evaluate

**Root Cause:**

The `FormulaTestPanel` passes test values to the engine without type conversion. The evaluation engine receives:
```typescript
{ priority: "11" }  // String, not number
```

Instead of:
```typescript
{ priority: 11 }  // Number
```

**Affected Code:**

1. `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`
   - `testInputs` state stores values as strings
   - No type conversion before passing to engine

2. `/services/evaluationEngine/runtime/Evaluator.ts`
   - Comparison operators don't coerce types
   - Should convert numeric strings to numbers for comparisons

**Possible Fixes:**

**Option 1: Fix in Test Panel (Type at Input)**
```typescript
// Convert based on variable type before evaluating
const typedInputs = Object.fromEntries(
  Object.entries(testInputs).map(([key, value]) => {
    const variable = variables.find(v => v.name === key);
    if (variable?.type === 'number') {
      return [key, Number(value)];
    }
    if (variable?.type === 'boolean') {
      return [key, value === 'true'];
    }
    return [key, value];
  })
);

engine.evaluate(formula, typedInputs);
```

**Option 2: Fix in Evaluator (Coerce at Comparison)**
```typescript
// In Evaluator.ts comparison operators
private evaluateComparison(left: any, operator: string, right: any): boolean {
  // Attempt numeric coercion if both sides look numeric
  const leftNum = Number(left);
  const rightNum = Number(right);
  
  if (!isNaN(leftNum) && !isNaN(rightNum)) {
    // Both are numeric, compare as numbers
    switch (operator) {
      case '>': return leftNum > rightNum;
      case '<': return leftNum < rightNum;
      // ...
    }
  }
  
  // Fall back to string comparison or throw type error
}
```

**Recommended Approach:**

**Option 1** (Type at Input) is preferred because:
- Explicit type conversion based on variable metadata
- Catches type errors early
- More predictable behavior
- Aligns with how real API would send typed data

**Priority:** Medium - Workaround exists (use `=` for exact matches), but breaks numeric range comparisons

**Workaround:**

Use exact equality instead of range comparisons:
```
// Instead of:
IF $priority > 5 THEN

// Use:
IF $priority = 10 OR $priority = 9 OR $priority = 8 THEN
```

**Related Files:**
- `/services/evaluationEngine/runtime/Evaluator.ts`
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`
- `/services/evaluationEngine/errors/EvaluationError.ts`

---

## Future Enhancements

### Enhancement #1: Better Type Error Messages

When type errors occur, provide helpful suggestions:

```
Error: Cannot apply operator > to string and string

Did you mean to compare numbers?
  Variable $priority has type 'number' but received value "11" (string)
  
Suggestion: Ensure test inputs match variable types, or use explicit type conversion
```

### Enhancement #2: Test Panel Type Validation

Show warnings when test input doesn't match variable type:

```
⚠️ Type mismatch
Variable $priority expects number, but "11" is a string
[Convert to number automatically?]
```

---

## Resolved Issues

### Issue #1: String Type Coercion in Comparisons ✅ RESOLVED

**Resolution Date:** October 28, 2025  
**Resolved In:** v28_v05-TypeCoercionAndInlineWarnings  
**Solution:** Implemented type validation utilities and real-time warning system

**What Was Fixed:**
1. Created `validateTestValue()` utility to check type compatibility
2. Created `convertTestValue()` utility for safe type conversion
3. Added real-time validation effect in FormulaTestPanel
4. Warnings now surface **before** evaluation, not after
5. Clear error messages guide users to fix type mismatches

**Before:**
- Test value `"11"` for number variable caused: "Cannot apply operator > to string and string"
- Error only appeared after clicking "Evaluate"
- Unclear which variable had wrong type

**After:**
- Immediate warning when typing invalid value: "Type mismatch for $priority: Expected number, got \"abc\""  
- Orange warning underline in editor (like ESLint)
- Works for all types: number, boolean, date, string
- Non-blocking (allows invalid values, just warns)

**See:** `/change-log/25-10-28_v05-TypeCoercionAndInlineWarnings.md` for full details

---

## Notes

This document tracks bugs and known issues discovered during development.
Issues are documented here until they can be prioritized and fixed.

Each issue should include:
- Clear reproduction steps
- Expected vs actual behavior  
- Root cause analysis
- Possible fixes with tradeoffs
- Recommended approach
- Workaround (if any)

---

**Next Steps:**
- ✅ ~~Implement Option 1 (type conversion in FormulaTestPanel)~~ - COMPLETE
- ✅ ~~Add type validation warnings in test panel UI~~ - COMPLETE
- ✅ ~~Update error messages to suggest type issues~~ - COMPLETE
