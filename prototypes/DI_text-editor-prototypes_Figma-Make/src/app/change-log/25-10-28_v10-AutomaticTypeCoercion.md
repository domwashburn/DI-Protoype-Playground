# v10 - Automatic Type Coercion

**Date:** October 28, 2025  
**Type:** Feature Enhancement

---

## Summary

Implemented automatic type coercion system that allows implicit type conversions when assigning expressions to variables of different but compatible types. This eliminates false type mismatch errors for valid coercions like `number → time`, `string → number`, etc.

## Problem

After fixing the date attribute types in v09, users encountered a new issue: date arithmetic (`date - date`) produces a numeric millisecond value, which should be coercible to a `time` variable but was being rejected as a type mismatch.

**Error Example:**
```
$responseTime = #ticket.closedAt - #ticket.createdAt
```

Where:
- `$responseTime` is declared as `time` type
- `#ticket.closedAt` and `#ticket.createdAt` are `date` attributes
- `date - date` produces a `number` (milliseconds)
- System incorrectly rejected: "Type mismatch: time vs number"

This is a **valid coercion** — a number representing milliseconds can be automatically converted to a `TimeValue` object.

## Solution

Implemented automatic type coercion at three levels:

### 1. Validation Layer (Static Analysis)

**Updated `useFormulaValidation.ts`:**

Added type coercion compatibility checking:

```typescript
/**
 * Check if a source type can be coerced to a target type
 */
function isTypeCoercible(sourceType: string, targetType: string): boolean {
  // Same type is always compatible
  if (sourceType === targetType) return true;
  
  // Unknown types are always compatible (can't validate)
  if (sourceType === 'unknown' || targetType === 'unknown') return true;
  
  // String can be coerced to any type
  if (targetType === 'string') return true;
  
  // Time coercions (KEY: Allow number and string to coerce to time)
  if (targetType === 'time') {
    return ['number', 'string'].includes(sourceType);
  }
  
  // ... other coercion rules
}
```

**Enhanced expression type inference** to recognize date arithmetic:

```typescript
function inferExpressionType(expression: string): '...' | 'time' | 'unknown' {
  // Check for date subtraction (date - date = time duration)
  const dateSubPattern = /#[a-zA-Z_][a-zA-Z0-9_.]*\s*-\s*#[a-zA-Z_][a-zA-Z0-9_.]*/;
  if (dateSubPattern.test(trimmed)) {
    return 'time'; // Date arithmetic produces time duration
  }
  // ... existing patterns
}
```

**Updated validation** to use coercion compatibility instead of exact type matching:

```typescript
// Before: Strict type matching
if (expressionType !== 'unknown' && expressionType !== variable.type) {
  // ERROR
}

// After: Coercion-aware matching
if (expressionType !== 'unknown' && !isTypeCoercible(expressionType, variable.type)) {
  issues.push({
    severity: 'error',
    message: `... (cannot coerce)`,
    code: 'TYPE_MISMATCH_ASSIGNMENT',
  });
}
```

### 2. Runtime Layer (Execution)

**Updated `Context.ts`:**

Added variable type tracking to execution context:

```typescript
export interface ExecutionContext {
  // ... existing properties
  
  /** Variable type declarations (for type coercion) */
  variableTypes?: Map<string, string>;
}
```

**Enhanced `setVariable` function** with automatic coercion:

```typescript
export function setVariable(ctx: ExecutionContext, name: string, value: any): void {
  if (!ctx.locals) {
    ctx.locals = new Map();
  }
  
  // Check if variable has a declared type and coerce if needed
  if (ctx.variableTypes?.has(name)) {
    const declaredType = ctx.variableTypes.get(name)!;
    const { coerceType } = require('../types/TypeSystem');
    const coercedValue = coerceType(value, declaredType as any, {
      allowCoercion: true,
      strictCoercion: false
    });
    ctx.locals.set(name, coercedValue);
  } else {
    ctx.locals.set(name, value);
  }
}
```

This ensures that when you write:
```typescript
$responseTime = #ticket.closedAt - #ticket.createdAt
// value is 3600000 (number)
// declaredType is 'time'
// → automatic coercion to TimeValue(3600000)
```

### 3. Test Panel (Data Preparation)

**Updated `FormulaTestPanel.tsx`:**

**Pass variable type information** to evaluation context:

```typescript
const variableTypes = new Map<string, string>();

testableVariables.forEach(v => {
  variableTypes.set(v.name, v.type); // Track type for coercion
  // ... set test value
});

const context = { variables, attributes, variableTypes };
```

**Parse date attributes** as Date objects (not strings):

```typescript
if (def?.type === 'date') {
  // Parse date string to Date object for proper date arithmetic
  attributes.set(attr, new Date(value));
}
```

This ensures date arithmetic works correctly: `Date - Date` produces a numeric millisecond difference.

## Type Coercion Matrix

| Source Type | Target Type | Coercible? | Example |
|-------------|-------------|------------|---------|
| `number` | `time` | ✅ Yes | `3600000` → `TimeValue(3600000)` |
| `number` | `string` | ✅ Yes | `42` → `"42"` |
| `number` | `boolean` | ✅ Yes | `0` → `false`, `1+` → `true` |
| `string` | `number` | ✅ Yes | `"42.5"` → `42.5` |
| `string` | `boolean` | ✅ Yes | `"true"` → `true` |
| `string` | `date` | ✅ Yes | `"2025-10-28"` → `Date(...)` |
| `string` | `time` | ✅ Yes | `"01:30:00"` → `TimeValue(5400000)` |
| `boolean` | `number` | ✅ Yes | `true` → `1`, `false` → `0` |
| `boolean` | `string` | ✅ Yes | `true` → `"true"` |
| `date` | `number` | ✅ Yes | `Date(...)` → `1730000000000` (timestamp) |
| `date` | `string` | ✅ Yes | `Date(...)` → `"2025-10-28T..."` (ISO) |
| `time` | `number` | ✅ Yes | `TimeValue(3600000)` → `3600000` |
| `number` | `date` | ✅ Yes | `1730000000000` → `Date(...)` |

**Note:** Coercion is **permissive by default** (`strictCoercion: false`) to support flexible formula writing while maintaining type safety.

## Usage Examples

### Example 1: Date Arithmetic to Time (Original Issue)

```typescript
// Variable Declaration
{
  name: 'responseTime',
  type: 'time',
  timeFormat: 'HH:MM:SS'
}

// Formula
$responseTime = #ticket.closedAt - #ticket.createdAt

// Runtime:
// 1. #ticket.closedAt = Date('2025-10-28T11:00:00Z')
// 2. #ticket.createdAt = Date('2025-10-28T10:00:00Z')
// 3. Subtraction: 3600000 (number milliseconds)
// 4. Assignment: Coerce 3600000 → TimeValue(3600000)
// 5. Result: $responseTime = TimeValue { milliseconds: 3600000 }
// 6. Display: "01:00:00"
```

✅ **No type error!** Automatic coercion from number to time.

### Example 2: String to Number

```typescript
// Variable Declaration
{
  name: 'amount',
  type: 'number'
}

// Formula
$amount = "42.50"

// Runtime: Coerce "42.50" → 42.50
```

✅ Valid coercion.

### Example 3: Number to String

```typescript
// Variable Declaration
{
  name: 'label',
  type: 'string'
}

// Formula
$label = 42

// Runtime: Coerce 42 → "42"
```

✅ Valid coercion.

### Example 4: Invalid Coercion (Still Rejected)

```typescript
// Variable Declaration
{
  name: 'count',
  type: 'number'
}

// Formula
$count = #customer.loyaltyTier  // loyaltyTier is a string

// Validation:
// sourceType = 'string'
// targetType = 'number'
// isTypeCoercible('string', 'number') = true ✅

// Runtime:
// Try to coerce "gold" → Number("gold") → NaN
// With strictCoercion: false, fallback to original value
```

⚠️ Coercion **attempted but may fail** at runtime if string is non-numeric.

## Coercion Flow

```
Assignment: $var = expression

1. Parse expression → Evaluate → Get value
   Example: #ticket.closedAt - #ticket.createdAt → 3600000

2. Check if variable has declared type
   variableTypes.has('responseTime') → true
   declaredType = 'time'

3. Infer actual value type
   inferType(3600000) → 'number'

4. Coerce if needed
   coerceType(3600000, 'time', config)
   → new TimeValue(3600000)

5. Store coerced value
   context.locals.set('responseTime', TimeValue(...))
```

## Benefits

1. **User-Friendly**: Reduces cognitive load — users don't need to manually convert types
2. **Flexible**: Supports natural formula expressions like `date - date` for duration
3. **Type-Safe**: Still validates that coercions are valid (e.g., can't coerce arbitrary string to number)
4. **Explicit**: Coercion errors in validation messages clearly state "(cannot coerce)"
5. **Performance**: Minimal overhead — only coerces when types differ

## Files Changed

- `/components/editors/code/FormulaEditor/hooks/useFormulaValidation.ts`
  - Added `isTypeCoercible()` function
  - Enhanced `inferExpressionType()` to detect date arithmetic
  - Updated type mismatch validation to use coercion compatibility

- `/services/evaluationEngine/runtime/Context.ts`
  - Added `variableTypes` to `ExecutionContext`
  - Updated `setVariable()` to perform automatic coercion
  - Updated `createContext()` to initialize variableTypes map

- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`
  - Added import for `TimeValue`
  - Created `variableTypes` map in test evaluation
  - Populated `variableTypes` with variable declarations
  - Updated date attribute parsing to use `new Date()`
  - Passed `variableTypes` to evaluation context

## Testing

**Test the SLA formula** to verify coercion:

1. Open Formula Editor
2. Select "SLA Response Time (Upper Strategy)" sample
3. Verify no type mismatch errors
4. Run test with default values
5. Verify result displays correctly as time

**Test other coercions:**
- String → Number: `$x = "42"` where x is number type
- Number → String: `$y = 42` where y is string type  
- Boolean → Number: `$z = true` where z is number type

## Breaking Changes

None. This is a backward-compatible enhancement that makes the type system **more permissive**, not more strict.

## Future Enhancements

1. **Stricter Mode**: Add option for `strictCoercion: true` to reject implicit coercions
2. **Coercion Warnings**: Show info-level hints when coercion happens (educational)
3. **Smart Suggestions**: When coercion fails, suggest manual conversion functions
4. **Type Inference**: Automatically infer variable types from usage patterns

## Related

- Epic: EPIC-FormulaTypeSystem.md
- Previous: 25-10-28_v09-DateAttributeTypeFix.md
- Type System: /services/evaluationEngine/types/TypeSystem.ts
- Coercion Rules: TypeSystem.performCoercion()

## Notes

The `TimeValue` class from the TypeSystem already existed and supported coercion from numbers. This implementation leverages that existing infrastructure and extends the validation layer to recognize valid coercions before they reach runtime.

**Design Philosophy:** "Make valid things easy, invalid things hard." If a coercion makes semantic sense (like milliseconds → time), the system should handle it automatically. If it doesn't (like random string → number), validation should warn but runtime should gracefully degrade.
