# Change Log Entry: SWITCH Case Ghost Value Fixes

**Date:** 2025-10-31  
**Version:** v06  
**Type:** Bug Fix  
**Severity:** Medium  

---

## Summary

Fixed two critical bugs with ghost values and debug highlighting in SWITCH statements:
1. Ghost values for assignments inside SWITCH cases now show variable names (not just values)
2. Line highlight no longer disappears after SWITCH statement ends

---

## Problem Description

### Bug 1: Ghost Values Missing Variable Names

**Observed Symptom:**
When stepping through SWITCH case bodies in debug mode, assignment ghost values showed only the result value, not the variable name:

```
CASE 3
  $additionalDiscount = 10     // Ghost showed: "10" (wrong)
  $pointsMultiplier = 2.0      // Ghost showed: "2" (wrong)
```

**Expected Behavior:**
- Simple assignment: Show variable name only: "$additionalDiscount"
- Assignment with function: Show variable + function: "$additionalDiscount = ROUND(...)"

**Root Cause:**
The `buildExpressionDescription` function in TracingEvaluator didn't include the variable name for assignments. It only showed the value or calculation, unlike the top-level assignment handling code which correctly included `$${assignment.variable}`.

### Bug 2: Line Highlight Lost After SWITCH

**Observed Symptom:**
After stepping through a SWITCH statement and reaching the line after the END, the current line highlight disappeared. The debug panel showed "Step 10 of 11" with the correct line number, but the editor didn't highlight that line.

**Example:**
```
SWITCH $membershipLevel
  CASE 3
    $additionalDiscount = 10
END

$totalDiscount = $baseDiscount + $additionalDiscount  // ❌ No highlight here!
```

**Root Cause:**
The `buildDebugHighlight` function returned `null` when a trace step didn't have location information. After the SWITCH ended, if a step had no location data, the highlight would be cleared completely instead of showing the last known location.

---

## Changes Made

### Fix 1: Include Variable Name in Assignment Descriptions

**File:** `/services/evaluationEngine/debugger/TracingEvaluator.ts`

**Before:**
```typescript
case 'Assignment': {
  // For assignments, check if the RHS contains a calculation
  const assignment = expr as any;
  const rhsStr = this.formatExpressionValue(assignment.value, variableSnapshot);
  
  // If the RHS is different from the result (meaning there was a calculation),
  // show the calculation. Otherwise just show the value.
  if (rhsStr !== resultStr) {
    return `${rhsStr} = ${resultStr} ${resultType}`;
  }
  
  return `${resultStr} ${resultType}`;
}
```

**After:**
```typescript
case 'Assignment': {
  // For assignments, always show the variable name
  const assignment = expr as any;
  const rhsStr = this.formatExpressionValue(assignment.value, variableSnapshot);
  
  // If the RHS is different from the result (meaning there was a calculation),
  // show: $variable = calculation = result
  // Otherwise show: $variable = result
  if (rhsStr !== resultStr) {
    return `$${assignment.variable} = ${rhsStr} = ${resultStr} ${resultType}`;
  }
  
  return `$${assignment.variable} = ${resultStr} ${resultType}`;
}
```

**Key Change:** Always include `$${assignment.variable}` in the description, matching the pattern used for top-level assignments.

### Fix 2: Improved Ghost Value Display Logic

**File:** `/components/editors/code/FormulaEditor/GhostValue.tsx`

**Before:**
```typescript
// Remove result (everything after " = ")
if (displayText.includes(' = ')) {
  displayText = displayText.split(' = ')[0];
}
```

**After:**
```typescript
// Handle assignments vs. expressions differently
// Assignments: "$variable = expression = result" or "$variable = result"
// Expressions: "expression = result"

const parts = displayText.split(' = ');

if (parts.length === 3) {
  // Format: "$variable = expression = result"
  // Show: "$variable = expression" (variable + calculation/function)
  displayText = `${parts[0]} = ${parts[1]}`;
} else if (parts.length === 2) {
  // Two possibilities:
  // 1. Assignment: "$variable = value" -> show "$variable"
  // 2. Expression: "expression = result" -> show "expression"
  
  // If first part starts with $, it's an assignment
  if (parts[0].startsWith('$')) {
    // Simple assignment - show just variable name
    displayText = parts[0];
  } else {
    // Expression comparison - show the expression without result
    displayText = parts[0];
  }
}
// else: single part, use as-is
```

**Key Changes:**
1. Remove type suffix FIRST (before splitting on " = ")
2. Handle three different formats:
   - 3 parts: `$var = expr = result` → show `$var = expr`
   - 2 parts (assignment): `$var = value` → show `$var`
   - 2 parts (expression): `expr = result` → show `expr`

### Fix 3: Fallback Location for Steps Without Location Data

**File:** `/utils/debugHighlighting.ts`

**Added Safety Check in `getCurrentLocation`:**
```typescript
// Safety check: ensure location and start exist
if (!step.location || !step.location.start || !step.location.start.line) {
  console.warn('[getCurrentLocation] Step missing location data:', { currentStep, step });
  return null;
}
```

**Improved `buildDebugHighlight` with Fallback:**
```typescript
// Try to get location for current step
let location = getCurrentLocation(trace, currentStep);

// If current step has no location, find the most recent step that has one
if (!location) {
  console.log('[buildDebugHighlight] Current step has no location, searching backwards...');
  for (let i = currentStep - 1; i >= 0; i--) {
    location = getCurrentLocation(trace, i);
    if (location) {
      console.log(`[buildDebugHighlight] Found location at step ${i}:`, location);
      break;
    }
  }
}

// If still no location found, return null
if (!location) {
  console.log('[buildDebugHighlight] No location found in any previous step!');
  return null;
}
```

**Key Change:** When a step has no location, search backwards to find the most recent step that has a location, and use that for highlighting. This ensures the highlight stays visible even when processing internal steps.

---

## Files Modified

1. `/services/evaluationEngine/debugger/TracingEvaluator.ts`
   - Updated `buildExpressionDescription` for Assignment case (lines ~1252-1264)

2. `/components/editors/code/FormulaEditor/GhostValue.tsx`
   - Improved ghost value display logic to handle assignments vs expressions (lines ~46-72)

3. `/utils/debugHighlighting.ts`
   - Added safety checks in `getCurrentLocation` (lines ~325-338)
   - Added fallback location search in `buildDebugHighlight` (lines ~349-388)

---

## Testing Recommendations

### Test Case 1: Simple Assignment in SWITCH

```
SWITCH $membershipLevel
  CASE 3
    $additionalDiscount = 10
    $pointsMultiplier = 2.0
END
```

**Expected Ghost Text:**
- Line with `$additionalDiscount = 10` → shows "$additionalDiscount"
- Line with `$pointsMultiplier = 2.0` → shows "$pointsMultiplier"

### Test Case 2: Assignment with Calculation in SWITCH

```
SWITCH $membershipLevel
  CASE 3
    $additionalDiscount = $baseDiscount + 5
    $pointsMultiplier = ROUND(2.5, 1)
END
```

**Expected Ghost Text:**
- Line with calculation → shows "$additionalDiscount = 5 + 5" (variable + expression)
- Line with function → shows "$pointsMultiplier = ROUND(2.5, 1)" (variable + function)

### Test Case 3: Line Highlight After SWITCH

```
SWITCH $membershipLevel
  CASE 3
    $additionalDiscount = 10
END

$totalDiscount = $baseDiscount + $additionalDiscount
RETURN $totalDiscount
```

**Expected Behavior:**
1. Step through SWITCH cases - highlight stays on CASE lines
2. Step to line after END - highlight appears on `$totalDiscount` line (NOT lost)
3. Step to RETURN line - highlight moves to RETURN line

### Test Case 4: Ghost Values Outside vs Inside SWITCH

```
$baseDiscount = 5

SWITCH $membershipLevel
  CASE 3
    $additionalDiscount = 10
END

$totalDiscount = $baseDiscount + $additionalDiscount
```

**Consistency Check:**
- Ghost text for `$baseDiscount = 5` (outside) should match style of `$additionalDiscount = 10` (inside)
- Both should show variable name only for simple assignments

---

## Impact

### Before Fix

**Bug 1 - Ghost Values:**
```
CASE 3
  $additionalDiscount = 10     // ❌ Ghost: "10"
  $pointsMultiplier = 2.0      // ❌ Ghost: "2"
```
Users couldn't tell WHICH variable was being set, just saw the value.

**Bug 2 - Line Highlight:**
```
SWITCH $membershipLevel
  CASE 3
    $additionalDiscount = 10
END

$totalDiscount = ...  // ❌ No highlight - appears debugger stopped
```
Users lost track of current execution position after SWITCH.

### After Fix

**Bug 1 - Ghost Values:**
```
CASE 3
  $additionalDiscount = 10     // ✅ Ghost: "$additionalDiscount"
  $pointsMultiplier = 2.0      // ✅ Ghost: "$pointsMultiplier"
```
Clear indication of which variable is being set.

**Bug 2 - Line Highlight:**
```
SWITCH $membershipLevel
  CASE 3
    $additionalDiscount = 10
END

$totalDiscount = ...  // ✅ Highlight shows current line
```
Continuous visual feedback of execution position.

---

## Related Patterns

### Ghost Value Display Rules

After this fix, ghost values follow these rules:

1. **Simple assignments:** Show variable name only
   - `$discount = 0.15` → "$discount"

2. **Assignments with calculations:** Show variable + expression
   - `$total = $a + $b` → "$total = 10 + 5"

3. **Assignments with functions:** Show variable + function call
   - `$rounded = ROUND($x, 2)` → "$rounded = ROUND(10.152, 2)"

4. **Expressions (non-assignments):** Show expression without result
   - `$count > 10` → "$count > 10" (not "15 > 10")

### Debug Highlight Fallback

When a trace step has no location:
1. Search backwards through previous steps
2. Find most recent step with valid location
3. Use that location for highlighting
4. Only clear highlight if NO steps have locations

This ensures continuous visual feedback during debugging.

---

## Notes

- The ghost value display logic now matches user expectations: show what's being SET (variable name), not just the result value
- The line highlight fallback ensures users never lose track of execution position during debugging
- Both fixes improve debugging experience consistency between loops, SWITCH statements, and regular code

---

## Breaking Changes

None. These fixes only improve the debugging display - the underlying evaluation logic remains unchanged.

---

## Context

These bugs were discovered while testing the "SWITCH Statement - Numeric Case Matching" sample formula. Users reported:
1. "setting variables for the first time should show the variable name + a function (if just a single value, only the variable name)"
2. "after the switch case ends, the line highlight is lost (line 26)"

The fixes ensure consistent debugging behavior across all control structures (IF, WHILE, FOR, SWITCH) and maintain visual continuity during step-through debugging.
