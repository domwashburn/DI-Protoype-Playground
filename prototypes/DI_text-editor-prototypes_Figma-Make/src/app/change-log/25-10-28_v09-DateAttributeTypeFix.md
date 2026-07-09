# v09 - Date Attribute Type Fix

**Date:** October 28, 2025  
**Type:** Bug Fix

---

## Summary

Fixed type mismatch error in SLA Response Time formula by correcting the attribute types for `#ticket.closedAt` and `#ticket.createdAt` from `number` to `date`. This ensures that date arithmetic operations correctly produce `time` type results.

## Problem

The formula `$responseTime = #ticket.closedAt - #ticket.createdAt` was causing a type mismatch error:
```
Type mismatch: $responseTime is declared as time, but assigned number expression
```

This occurred because:
1. The variable `$responseTime` was correctly declared as `time` type
2. The attributes `#ticket.closedAt` and `#ticket.createdAt` were incorrectly typed as `number` (timestamps in milliseconds)
3. When subtracting two numbers, the result is a `number`, not a `time`
4. The type system enhancement from v08 expects `date - date` to produce `time`, but was receiving `number - number`

## Root Cause

In `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`, the `ATTRIBUTE_DEFINITIONS` object defined ticket timestamps as numbers:

```typescript
// ❌ INCORRECT - Before
'ticket.closedAt': {
  type: 'number' as const,
  description: 'Ticket closed timestamp (ms)',
  predefinedValues: ['600000', '1800000', '3600000', '7200000', '14400000'],
},
'ticket.createdAt': {
  type: 'number' as const,
  description: 'Ticket created timestamp (ms)',
  predefinedValues: ['0', '0', '0', '0', '0'],
},
```

## Solution

Updated attribute definitions to use `date` type with proper ISO 8601 date strings:

```typescript
// ✅ CORRECT - After
'ticket.closedAt': {
  type: 'date' as const,
  description: 'Ticket closed timestamp',
  predefinedValues: [
    '2025-10-28T10:10:00.000Z', 
    '2025-10-28T10:30:00.000Z', 
    '2025-10-28T11:00:00.000Z', 
    '2025-10-28T12:00:00.000Z', 
    '2025-10-28T14:00:00.000Z'
  ],
},
'ticket.createdAt': {
  type: 'date' as const,
  description: 'Ticket created timestamp',
  predefinedValues: [
    '2025-10-28T10:00:00.000Z', 
    '2025-10-28T10:00:00.000Z', 
    '2025-10-28T10:00:00.000Z', 
    '2025-10-28T10:00:00.000Z', 
    '2025-10-28T10:00:00.000Z'
  ],
},
```

The predefined values now represent:
- `createdAt`: Always 10:00:00 AM
- `closedAt`: Various times (10, 30, 60, 120, and 240 minutes after creation)

This gives realistic test scenarios for SLA response time calculations:
- 10 minutes (Excellent)
- 30 minutes (Good)  
- 60 minutes (Good)
- 120 minutes (Acceptable)
- 240 minutes (Acceptable)

## Files Changed

- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`
  - Updated `ticket.closedAt` and `ticket.createdAt` attribute definitions
  - Changed type from `number` to `date`
  - Updated predefined test values from milliseconds to ISO 8601 date strings

## Impact

**Now Working:**
```typescript
// Formula
$responseTime = #ticket.closedAt - #ticket.createdAt

// Variable Declaration
{
  name: 'responseTime',
  type: 'time',
  timeFormat: 'HH:MM:SS'
}

// Result: ✅ No type mismatch!
// date - date correctly produces time type
```

**Testing Benefits:**
- Realistic date/time test values
- SLA calculations work as expected
- Type system correctly validates date arithmetic
- Time formatting displays properly (HH:MM:SS)

## Additional Work

Created `/SampleData/attributesSamples.ts` to provide a comprehensive, centralized attribute registry with proper types for all sample formulas. This includes:
- Customer attributes (credit score, income, etc.)
- Order attributes (total, weight, shipping, etc.)
- Transaction attributes (amount, location, etc.)
- Ticket attributes (timestamps, priority) - **properly typed as `date`**
- Sensor, employee, inventory, survey, inspection, and production attributes

This registry serves as the single source of truth for attribute types and can be referenced when implementing full attribute type validation across the system.

## Related

- Epic: EPIC-FormulaTypeSystem.md
- Previous: 25-10-28_v08-DateArithmeticTypeImprovement.md
- Formula Sample: SLA Response Time (Upper Strategy) in `/SampleData/formulaSamples.ts`

## Future Enhancements

Consider:
1. Automatically loading attribute types from `attributesSamples.ts` instead of hardcoding in test panel
2. Adding attribute type validation during formula parsing/editing
3. Showing attribute types in autocomplete suggestions
4. Type warnings when attributes are used incorrectly (e.g., adding a string to a number)
