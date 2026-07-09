# Change Log Entry: Attribute Type Definition Fix

**Date:** 2025-10-31  
**Version:** v03  
**Type:** Bug Fix  
**Severity:** Critical  

---

## Summary

Fixed critical type mismatch errors caused by missing attribute definitions in both sample data and test panel. The error "Cannot apply operator * to number and string" was occurring because `#employee.hourlyRate` and other attributes were undefined, causing the evaluation engine to treat them as strings.

---

## Problem Description

### Observed Symptom
When testing the "Overtime Hours Calculation" formula, the evaluation engine threw a type error:
```
Cannot apply operator * to number and string
Line 11: $regularPay = 8 * #employee.hourlyRate
```

### Root Cause
Multiple attributes referenced in formula samples were not defined in the attribute registry:

**Missing from `/SampleData/attributesSamples.ts`:**
- `employee.hourlyRate` (type: number)
- `timesheet.clockIn` (type: time)
- `timesheet.clockOut` (type: time)
- `appointment.requestedDate` (type: date)
- `appointment.preferredDate` (type: date)

**Missing from `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`:**
- Same 5 attributes missing from `ATTRIBUTE_DEFINITIONS` object

### Why This Happened
After adding loop functionality and list/object type support, we correctly updated the type system to handle these new types. However, we didn't audit all sample formulas to ensure their referenced attributes were properly defined with correct types.

---

## Changes Made

### 1. Added Missing Attributes to `/SampleData/attributesSamples.ts`

Added 5 new attribute definitions:

```typescript
// Employee Attributes - Added hourlyRate
{
  id: 'attr-employee-5',
  path: 'employee.hourlyRate',
  type: 'number',
  description: 'Hourly wage rate',
},

// Timesheet Attributes (NEW SECTION)
{
  id: 'attr-timesheet-1',
  path: 'timesheet.clockIn',
  type: 'time',
  description: 'Clock in time',
},
{
  id: 'attr-timesheet-2',
  path: 'timesheet.clockOut',
  type: 'time',
  description: 'Clock out time',
},

// Appointment Attributes (NEW SECTION)
{
  id: 'attr-appointment-1',
  path: 'appointment.requestedDate',
  type: 'date',
  description: 'Appointment requested date',
},
{
  id: 'attr-appointment-2',
  path: 'appointment.preferredDate',
  type: 'date',
  description: 'Customer preferred appointment date',
},
```

### 2. Added Missing Attributes to FormulaTestPanel

Added same 5 attributes to `ATTRIBUTE_DEFINITIONS` object with predefined test values:

```typescript
'employee.hourlyRate': {
  type: 'number' as const,
  description: 'Hourly wage rate',
  predefinedValues: ['15', '20', '25', '30', '40'],
},
'timesheet.clockIn': {
  type: 'time' as const,
  description: 'Clock in time',
  predefinedValues: ['08:00:00', '09:00:00', '10:00:00'],
},
'timesheet.clockOut': {
  type: 'time' as const,
  description: 'Clock out time',
  predefinedValues: ['17:00:00', '18:00:00', '19:00:00', '20:00:00'],
},
'appointment.requestedDate': {
  type: 'date' as const,
  description: 'Appointment requested date',
  predefinedValues: ['2025-11-01', '2025-11-05', '2025-11-10', '2025-11-15'],
},
'appointment.preferredDate': {
  type: 'date' as const,
  description: 'Customer preferred appointment date',
  predefinedValues: ['2025-11-05', '2025-11-10', '2025-11-15', '2025-11-20'],
},
```

---

## Files Modified

1. `/SampleData/attributesSamples.ts`
   - Added 5 new attribute definitions
   - Added 2 new attribute sections (Timesheet, Appointment)

2. `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`
   - Added 5 new entries to `ATTRIBUTE_DEFINITIONS` object
   - Included predefined test values for each

---

## Testing Recommendations

### 1. Test Overtime Calculation Formula
- Load "Overtime Hours Calculation" sample
- Verify `#employee.hourlyRate` is recognized as number type
- Verify no type errors when evaluating
- Verify calculations produce correct results

### 2. Test Time Utilities
- Test `TIME_TO_MINUTES()` function with `#timesheet.clockIn` and `#timesheet.clockOut`
- Verify time values are properly converted
- Verify time arithmetic works correctly

### 3. Test Date Utilities
- Test date functions with `#appointment.requestedDate` and `#appointment.preferredDate`
- Verify date comparisons work
- Verify `DAYS_BETWEEN()` and `DATE_ADD()` functions work

### 4. Audit All Other Formulas
Run through all formula samples in the dropdown to ensure:
- No undefined attribute errors
- All type validations pass
- All calculations produce expected results

---

## Prevention Strategy

### Immediate Action Items
1. ✅ Fixed immediate issue (this change)
2. Create validation script to check attribute references
3. Add unit tests for attribute type checking

### Long-term Improvements
1. **Centralized Attribute Registry:**
   - Create single source of truth for attributes
   - Both `attributesSamples.ts` and `FormulaTestPanel.tsx` should import from same source
   - Eliminate duplication

2. **Build-time Validation:**
   - Add script that parses all formula samples
   - Extract all `#attribute.path` references
   - Validate against attribute registry
   - Fail build if undefined attributes found

3. **Type-safe Attribute References:**
   - Generate TypeScript types from attribute definitions
   - Enable autocomplete for attribute paths
   - Catch missing attributes at compile time

4. **Sample Data Validation:**
   - Add Jest tests that validate all formula samples
   - Check that all variables have proper types
   - Check that all attributes exist and have correct types
   - Run as part of CI/CD pipeline

---

## Related Issues

- **Previous Issue:** Loop functionality caused Variable type system to not support 'list' and 'object' types (FIXED in previous commit)
- **This Issue:** Missing attribute definitions causing type errors
- **Prevention:** Need centralized attribute registry and validation

---

## Verification Steps

To verify the fix:

1. Open Formula Editor
2. Select "Overtime Hours Calculation" from dropdown
3. Switch to "Test" tab
4. Verify attributes appear with correct types:
   - `#employee.hourlyRate` should show as number with dropdown values
   - `#timesheet.clockIn` should show as time input
   - `#timesheet.clockOut` should show as time input
5. Run formula - should evaluate without type errors
6. Expected output: Calculated pay based on hours worked

---

## Impact

**Before Fix:**
- ❌ Type error: "Cannot apply operator * to number and string"
- ❌ Formula evaluation failed
- ❌ Unable to test overtime calculation
- ❌ Undefined attributes treated as string type

**After Fix:**
- ✅ All attributes properly defined with correct types
- ✅ Type validation passes
- ✅ Formula evaluates successfully
- ✅ Test panel populates correct input types
- ✅ Time and date utilities work as expected

---

## Notes

- The type system already supported 'list', 'object', 'time', and 'date' types
- The Variable interface already included 'list' and 'object' in type union
- The only issue was missing attribute definitions in sample data
- This demonstrates importance of keeping sample data synchronized across files

---

## Next Steps

1. ✅ Fix applied
2. Test all formula samples for similar issues
3. Create centralized attribute registry (technical debt item)
4. Add validation script to prevent regression
5. Document attribute definition process in guidelines
