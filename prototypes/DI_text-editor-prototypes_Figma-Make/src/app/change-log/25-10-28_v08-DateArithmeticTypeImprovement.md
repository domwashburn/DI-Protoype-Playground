# v08 - Date Arithmetic Type Improvement

**Date:** October 28, 2025  
**Type:** Type System Enhancement

---

## Summary

Updated the type system to correctly handle date arithmetic operations. When subtracting two dates (`date - date`), the result is now properly typed as `time` (duration) instead of `number`, which aligns with the semantic meaning of the operation.

## Context

Previously, the expression `#ticket.closedAt - #ticket.createdAt` would produce a type mismatch error:
- The operation returned a raw `number` (milliseconds)
- If assigned to a variable declared as `time`, the type system would flag it as incompatible
- This was semantically incorrect since the difference between two dates is a duration, which is what the `time` type represents

## Implementation Details

### Type Compatibility (TypeSystem.ts)
```typescript
// Added exception for date subtraction
if (operator === '-' && left === 'date' && right === 'date') {
  return true;
}
```

### Result Type Inference (TypeSystem.ts)
```typescript
// date - date produces time duration
if (operator === '-' && leftType === 'date' && rightType === 'date') {
  return 'time';
}
```

### Runtime Evaluation (Evaluator.ts)
```typescript
if (op.operator === '-') {
  // Special case: date - date produces a time duration
  if (leftType === 'date' && rightType === 'date') {
    const leftDate = left as Date;
    const rightDate = right as Date;
    const milliseconds = leftDate.getTime() - rightDate.getTime();
    return new TimeValue(milliseconds);
  }
  return Number(left) - Number(right);
}
```

## Files Changed

- `/services/evaluationEngine/types/TypeSystem.ts`
  - Updated `areTypesCompatible()` to allow `date - date` operations
  - Updated `getResultType()` to return `'time'` for `date - date`
  
- `/services/evaluationEngine/runtime/Evaluator.ts`
  - Added `TimeValue` import
  - Updated `evaluateBinaryOp()` to return `TimeValue` for date subtraction

## Benefits

1. **Semantic Correctness**: Date differences are durations, which the `time` type represents
2. **Type Safety**: No more type mismatches when assigning date differences to time variables
3. **Better DX**: Users can now naturally write `$responseTime = #ticket.closedAt - #ticket.createdAt` with proper typing
4. **Automatic Conversion**: The `TimeValue` wrapper provides all time formatting methods (toMinutes, toHours, toHHMMSS, etc.)

## Example

### Before (Error)
```
$responseTime = #ticket.closedAt - #ticket.createdAt
// Type error: Cannot assign number to time variable
```

### After (Success)
```
$responseTime = #ticket.closedAt - #ticket.createdAt
// ✓ Correctly typed as time
// Can use: $responseTime.toMinutes(), $responseTime.toHHMMSS(), etc.
```

## Next Steps

- Consider adding support for other date/time arithmetic operations:
  - `date + time` → `date` (add duration to date)
  - `date - time` → `date` (subtract duration from date)
  - `time + time` → `time` (add durations)
  - `time - time` → `time` (subtract durations)
  - `time * number` → `time` (scale duration)
  - `time / number` → `time` (divide duration)

## Related

- Epic: EPIC-FormulaTypeSystem.md
- Previous: 25-10-28_v07-TimeTypeImplementation.md
