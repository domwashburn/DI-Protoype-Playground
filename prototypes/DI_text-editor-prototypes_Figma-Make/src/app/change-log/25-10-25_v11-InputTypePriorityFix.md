# v11 - Input Type Priority Fix (Number Inputs vs Dropdowns)

**Date:** October 25, 2025  
**Type:** Bug Fix  
**Status:** ✅ Complete  
**Related:**
- [v10 - Defined Variable Parser Fix](./25-10-25_v10-DefinedVariableParserFix.md)
- [v08 - Defined Variable Calculation](./25-10-25_v08-DefinedVariableCalculation.md)

---

## Problem Statement

Number variables like `$orderTotal` were incorrectly rendered as **dropdown selects** instead of **number inputs** when the formula contained numeric comparisons.

### **Example Formula:**
```formula
IF $orderTotal > 1000 THEN
  IF $loyaltyTier = "gold" THEN
    $orderTotal * 0.15
  ELSE IF $loyaltyTier = "silver" THEN
    $orderTotal * 0.10
  END
ELSE
  0
END
```

### **Incorrect Behavior:**
- ❌ `$orderTotal` rendered as a **dropdown** with extracted option `"1000"`
- ✅ `$loyaltyTier` correctly rendered as a **dropdown** with options "gold", "silver"

### **Expected Behavior:**
- ✅ `$orderTotal` should be a **number input** (allows any numeric value)
- ✅ `$loyaltyTier` should be a **dropdown** (string type with extracted options)

---

## Root Cause Analysis

The input type priority logic was incorrectly structured:

```typescript
// ❌ OLD PRIORITY (WRONG):
// 1. Boolean → Switch ✓
// 2. Date → Date Picker ✓
// 3. Has extracted options → Dropdown ❌ (applies to ALL types!)
// 4. Number → Number Input
// 5. String → Text Input

// This meant: If ANY type (including numbers) had extracted options,
// it would render as a dropdown before checking the actual type
```

**Example:**
- `$orderTotal` is a **number** type
- Formula contains `$orderTotal > 1000`
- `extractOptionsForVariable()` extracts `["1000"]` from the comparison
- `hasExtractedOptions` is `true`
- Priority #3 triggers → Dropdown rendered ❌
- Priority #4 (Number Input) never reached

**The Problem:** Extracted options took priority over **type-appropriate inputs** for numbers.

---

## Solution Overview

**Key Insight:** Only **STRING** types should use dropdowns for extracted options. Numbers, booleans, and dates have more appropriate native input types.

**New Priority Logic:**

```typescript
// ✅ NEW PRIORITY (CORRECT):
// 1. Boolean → Switch (ALWAYS)
// 2. Date → Date Picker (ALWAYS)
// 3. String + extracted options → Dropdown
// 4. Number → Number Input (ALWAYS)
// 5. String (no options) → Text Input
```

**Why This Works:**
- **Boolean**: Always use toggle switch (true/false)
- **Date**: Always use date picker (calendar UI)
- **String with options**: Use dropdown (predefined choices)
- **Number**: Always use number input (allows any numeric value, even if formula has comparison thresholds)
- **String without options**: Use text input (free-form text)

---

## Implementation Details

### Changed Logic

**Before (Incorrect):**
```tsx
{effectiveType === 'boolean' ? (
  /* Boolean: Toggle Switch */
) : effectiveType === 'date' ? (
  /* Date: Date Picker */
) : hasExtractedOptions ? (
  /* ANY TYPE with extracted options → Dropdown ❌ */
) : effectiveType === 'number' ? (
  /* Number: Number Input */
) : (
  /* String: Text Input */
)}
```

**After (Correct):**
```tsx
{effectiveType === 'boolean' ? (
  /* Boolean: Toggle Switch */
) : effectiveType === 'date' ? (
  /* Date: Date Picker */
) : effectiveType === 'string' && hasExtractedOptions ? (
  /* STRING with extracted options → Dropdown ✅ */
) : effectiveType === 'number' ? (
  /* Number: Number Input ✅ */
) : (
  /* String: Text Input */
)}
```

**Key Change:** Added `effectiveType === 'string' &&` condition to restrict dropdown to string types only.

---

## Test Cases

### Test 1: Number Variable with Comparisons
```formula
IF $orderTotal > 1000 THEN
  100
END
```

**Variables:**
- `$orderTotal` (number)

**Extracted Options:** `["1000"]`

**Expected Input:** Number input (type="number") ✅

**Result:** User can enter ANY number (500, 1000, 2500, etc.), not just "1000" from dropdown

---

### Test 2: String Variable with Comparisons
```formula
IF $loyaltyTier = "gold" OR $loyaltyTier = "silver" THEN
  100
END
```

**Variables:**
- `$loyaltyTier` (string)

**Extracted Options:** `["gold", "silver"]`

**Expected Input:** Dropdown select ✅

**Result:** User selects from predefined options: "gold", "silver"

---

### Test 3: Mixed Number and String
```formula
IF $orderTotal > 1000 THEN
  IF $loyaltyTier = "gold" THEN
    $orderTotal * 0.15
  ELSE IF $loyaltyTier = "silver" THEN
    $orderTotal * 0.10
  END
ELSE
  0
END
```

**Variables:**
- `$orderTotal` (number) → Number input ✅
- `$loyaltyTier` (string) → Dropdown with ["gold", "silver"] ✅

**Result:** Each variable gets the correct input type based on its data type

---

### Test 4: Boolean and Date (Always Use Native Inputs)
```formula
IF $isActive = true AND $startDate > "2024-01-01" THEN
  100
END
```

**Variables:**
- `$isActive` (boolean) → Toggle switch ✅ (not dropdown with ["true", "false"])
- `$startDate` (date) → Date picker ✅ (not dropdown with ["2024-01-01"])

**Result:** Native inputs used regardless of extracted options

---

## Visual Comparison

### Before (Incorrect):
```
VARIABLES
├─ $orderTotal     [Dropdown: 1000]           ❌ WRONG - Should be number input
├─ $loyaltyTier    [Dropdown: gold, silver]  ✅ Correct
```

### After (Correct):
```
VARIABLES
├─ $orderTotal     [Number Input: 1000]       ✅ Can enter any number
├─ $loyaltyTier    [Dropdown: gold, silver]  ✅ Dropdown for strings
```

---

## Files Changed

### Modified:
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`
  - Line 486: Changed condition from `hasExtractedOptions ?` to `effectiveType === 'string' && hasExtractedOptions ?`
  - Updated comment documentation to reflect correct priority
  - Priority order now: Boolean → Date → String+Options → Number → String

---

## User Experience Impact

**Before:**
- Number variables with comparisons showed dropdowns with limited options
- User couldn't test edge cases (e.g., $orderTotal = 999, 1001, 5000)
- Confusing UX - why is a number field a dropdown?

**After:**
- Number variables always show number inputs
- User can test any numeric value
- Clear UX - numbers use number inputs, strings with options use dropdowns
- Type-appropriate inputs for all data types

---

## Design Rationale

### Why Not Use Dropdowns for Numbers?

**Question:** If we extract `["1000"]` from `$orderTotal > 1000`, why not offer it as a dropdown option?

**Answer:**
1. **Flexibility**: Users need to test edge cases (999, 1001, 500, 5000, etc.)
2. **UX Clarity**: Number inputs signal "enter any number here"
3. **Incomplete Options**: Extracted numbers are comparison thresholds, not exhaustive options
4. **Type Consistency**: Number variables should always use number inputs

**Counterexample - Strings:**
- String comparisons like `$status = "pending" OR $status = "active"` represent **complete option sets**
- Users should select from these predefined values
- Dropdown makes sense for finite, known string values

---

## Edge Cases Handled

### 1. Multiple Numeric Comparisons
```formula
IF $age >= 18 AND $age <= 65 THEN
  100
END
```
- Extracted options: `["18", "65"]`
- Input type: Number input ✅
- User can test: 17, 18, 30, 65, 66, etc.

### 2. Numeric Equality (Edge Case)
```formula
IF $priority = 3 OR $priority = 5 THEN
  100
END
```
- Extracted options: `["3", "5"]`
- Input type: Number input ✅
- User can test: 1, 3, 4, 5, 10, etc.
- **Rationale**: Even with specific values, allow testing other numbers

### 3. Mixed Operators
```formula
IF $score > 50 AND $score != 75 AND $score <= 100 THEN
  100
END
```
- Extracted options: `["50", "75", "100"]`
- Input type: Number input ✅
- User can test: 49, 50, 51, 74, 75, 76, 100, 101, etc.

---

## Future Enhancements

### Phase 2: Smart Suggestions for Numbers
Instead of dropdowns, show **suggestions** while still allowing free input:

```tsx
<Input
  type="number"
  value={testValues[variable.name]}
  onChange={handleChange}
  list={`${variable.name}-suggestions`}
/>
<datalist id={`${variable.name}-suggestions`}>
  {extractedOptions.map(opt => (
    <option key={opt} value={opt} />
  ))}
</datalist>
```

**Benefits:**
- User sees common/threshold values as suggestions
- Can still enter any number
- Best of both worlds

---

## Success Criteria

- [x] Number variables render as number inputs (not dropdowns)
- [x] String variables with extracted options render as dropdowns
- [x] Boolean variables render as toggle switches
- [x] Date variables render as date pickers
- [x] Input type matches data type regardless of extracted options
- [x] User can test any numeric value for number variables
- [x] No regression for other input types

---

## Testing Verification

**Manual Test:**
1. Open Formula Editor
2. Enter the user's formula (IF $orderTotal > 1000...)
3. Go to Test tab
4. Verify variables:
   - `$orderTotal` → Number input (can type any number)
   - `$loyaltyTier` → Dropdown with "gold", "silver"
5. Enter different values:
   - $orderTotal: 500, 1000, 1001, 2500
   - $loyaltyTier: "gold", "silver"
6. Evaluate and verify results match expected logic

**Expected Results:**
- Number input accepts any value ✅
- Dropdown restricts to predefined options ✅
- Formula evaluates correctly ✅
- No console errors ✅

---

## Related Work

**v10 - Defined Variable Parser Fix:**
- Fixed parser to distinguish comparisons from assignments
- Made variables editable (not all marked as "Calculated")
- This fix builds on that by ensuring correct input types

**v08 - Defined Variable Calculation:**
- Introduced distinction between input and defined variables
- This fix ensures input variables use appropriate input types

---

## Notes

This was a critical UX bug that prevented users from properly testing formulas with numeric variables. The fix is simple (add type check to condition) but essential for usability.

**Key Takeaway:** Input type priority must respect data types. Extracted options are informative but shouldn't override type-appropriate inputs for numbers, booleans, or dates. Only strings benefit from option-based dropdowns.
