# Change Log Entry: Loop and Switch Ghost Text Consistency Fix

**Date:** 2025-10-31  
**Version:** v05  
**Type:** Bug Fix  
**Severity:** Medium  

---

## Summary

Fixed inconsistent ghost text (debug output) behavior inside FOR loops, WHILE loops, and SWITCH statements. Previously, only assignment statements were traced inside these control structures, causing ghost values to be missing for function calls, binary operations, and other expressions.

---

## Problem Description

### Observed Symptom
When debugging formulas with loops or switch statements, ghost text (inline debug output) was inconsistent:
- ✅ **Outside loops**: All expressions showed ghost values (assignments, function calls, operations)
- ❌ **Inside FOR loops**: Only assignments showed ghost values
- ❌ **Inside WHILE loops**: Only assignments showed ghost values  
- ❌ **Inside SWITCH cases**: Only assignments showed ghost values

**Example - Missing ghost text inside WHILE loop:**
```
WHILE $principal < $target DO
  $principal = $principal * (1 + $rate)  // ✅ Ghost text appears
  $years = $years + 1                    // ✅ Ghost text appears
  
  // ❌ Ghost text MISSING for IF condition
  IF $years >= 50 THEN
    BREAK
  END
END
```

**Example - Missing ghost text inside SWITCH:**
```
SWITCH $membershipLevel
  CASE 3
    $additionalDiscount = 10              // ✅ Ghost text appears
    $pointsMultiplier = 2.0               // ✅ Ghost text appears (assignment)
    // ❌ Ghost text MISSING for calculation: $baseDiscount + $additionalDiscount
  CASE 4
    $additionalDiscount = 15              // ✅ Ghost text appears
END
```

### Root Cause
The `TracingEvaluator` class was inconsistent in how it recorded trace steps:

**Outside loops/switches:**
- All expression statements were recorded as trace steps
- Ghost values appeared for all evaluated expressions

**Inside loops/switches:**
- Loop/switch code explicitly checked `if (stmt.type === 'Assignment')` before recording
- Only assignments generated trace steps
- Other expressions (function calls, binary ops, IF conditions) were evaluated but NOT traced

### Why This Happened
The loop and switch implementation code was written to be selective about what to trace, likely to reduce trace noise. However, this created an inconsistent debugging experience where expressions would "disappear" when moved inside a loop.

---

## Changes Made

### Modified `/services/evaluationEngine/debugger/TracingEvaluator.ts`

Updated four locations where loop/switch bodies are executed:

#### 1. FOR Loop Body Execution (lines ~772-789)

**Before:**
```typescript
// Execute loop body, catching BREAK/CONTINUE signals
try {
  for (const stmt of forLoop.body) {
    lastValue = this.evaluateExpression(stmt, context);
  }
} catch (error) {
  // Handle control flow signals...
}
```

**After:**
```typescript
// Execute loop body, catching BREAK/CONTINUE signals
try {
  for (const stmt of forLoop.body) {
    // Record step for each statement in the loop body
    const varsBeforeStmt = this.captureVariables(context);
    lastValue = this.evaluateExpression(stmt, context);
    const varsAfterStmt = this.captureVariables(context);
    
    // Record step for this statement (all expressions, not just assignments)
    if (stmt.type !== 'IfExpression') { // IF expressions record their own steps
      const stmtDescription = this.buildExpressionDescription(
        stmt,
        lastValue,
        varsBeforeStmt
      );
      
      this.tracer.recordStep({
        nodeType: stmt.type === 'Assignment' ? 'Assignment' : stmt.type as any,
        location: stmt.location || forLoop.location,
        description: stmtDescription,
        variablesBefore: varsBeforeStmt,
        variablesAfter: varsAfterStmt,
        changedVariables: this.findChangedVariables(varsBeforeStmt, varsAfterStmt),
        result: lastValue,
        resultType: this.getType(lastValue),
      });
    }
  }
} catch (error) {
  // Handle control flow signals...
}
```

#### 2. WHILE Loop Body Execution (lines ~838-855)

Same fix as FOR loop - now records all statements, not just when evaluating.

#### 3. SWITCH Case Body Execution (lines ~915-944)

**Before:**
```typescript
// Record step for this statement (if it's an assignment or significant)
if (stmt.type === 'Assignment') {
  // Only record assignments...
}
```

**After:**
```typescript
// Record step for this statement (all expressions, not just assignments)
if (stmt.type !== 'IfExpression') { // IF expressions record their own steps
  // Record all statements...
}
```

#### 4. SWITCH Default Case Body Execution (lines ~953-982)

Same fix as case body - now records all statements.

**Key Changes:**
1. **Removed selective tracing**: Changed from `if (stmt.type === 'Assignment')` to `if (stmt.type !== 'IfExpression')`
2. **Added variable snapshots**: Capture variables before and after each statement
3. **Build descriptions**: Generate descriptions for all statement types
4. **Preserve node type**: Use actual statement type instead of always 'Assignment'
5. **Exception for IF expressions**: Don't record IF expressions because they record their own detailed steps (condition, THEN, ELSIF, ELSE)

---

## Files Modified

1. `/services/evaluationEngine/debugger/TracingEvaluator.ts`
   - FOR loop body execution (4 locations total)
   - WHILE loop body execution
   - SWITCH case body execution  
   - SWITCH default case body execution

---

## Impact

### Before Fix
```
FOR $item IN $items DO
  $total = $total + $item          // ✅ Ghost: "$total = 150"
  // ❌ Missing ghost for function call
  PRINT($item)
END

SWITCH $status
  CASE "approved"
    $discount = 0.15               // ✅ Ghost: "$discount = 0.15"
    // ❌ Missing ghost for calculation
    $finalPrice = $price * (1 - $discount)
END
```

### After Fix
```
FOR $item IN $items DO
  $total = $total + $item          // ✅ Ghost: "$total = 150"
  PRINT($item)                     // ✅ Ghost: Result of PRINT function
END

SWITCH $status
  CASE "approved"
    $discount = 0.15               // ✅ Ghost: "$discount = 0.15"
    $finalPrice = $price * 0.85    // ✅ Ghost: "$finalPrice = 85.00"
END
```

---

## Testing Recommendations

### Test Case 1: FOR Loop with Function Calls
```
$numbers = [10, 20, 30, 40, 50]
$total = 0

FOR $num IN $numbers DO
  $total = $total + $num
  $rounded = ROUND($total / 2, 1)
  IF $rounded > 50 THEN
    BREAK
  END
END

RETURN $total
```

**Expected Ghost Text:**
- Line with `$total = $total + $num` shows assignment result
- Line with `$rounded = ROUND(...)` shows function call result
- Line with `IF $rounded > 50` shows comparison result

### Test Case 2: WHILE Loop with Calculations
```
$principal = 1000
$rate = 0.05
$years = 0

WHILE $principal < 1500 DO
  $principal = $principal * (1 + $rate)
  $years = $years + 1
  
  IF $years >= 50 THEN
    BREAK
  END
END

RETURN $years
```

**Expected Ghost Text:**
- Line with multiplication shows calculated result
- Line with `$years = $years + 1` shows new value
- Line with `IF $years >= 50` shows comparison result

### Test Case 3: SWITCH with Calculations
```
$membershipLevel = 3
$baseDiscount = 5

SWITCH $membershipLevel
  CASE 1
    $additionalDiscount = 0
    $pointsMultiplier = 1
  CASE 2
    $additionalDiscount = 5
    $pointsMultiplier = 1.5
  CASE 3
    $additionalDiscount = 10
    $pointsMultiplier = 2.0
  DEFAULT
    $additionalDiscount = 0
    $pointsMultiplier = 1
END

$totalDiscount = $baseDiscount + $additionalDiscount
RETURN $totalDiscount
```

**Expected Ghost Text:**
- SWITCH expression evaluation shows `$membershipLevel = 3`
- Each CASE comparison shows result (e.g., `3 = 1: false`, `3 = 3: true`)
- All assignments in matched case show values
- Final calculation shows `$totalDiscount = 15`

---

## Performance Considerations

**Trace Volume:**
- This fix increases the number of trace steps generated
- Loops that execute many iterations will generate more trace data
- For a loop with 100 iterations and 3 statements per iteration, this adds ~300 steps

**Mitigation:**
- Trace steps are only generated during debug mode
- Normal evaluation (non-debug) is unaffected
- Memory usage scales linearly with iteration count
- Max iterations limit (10,000) prevents runaway traces

**Recommendation:**
- For very long-running loops (1000+ iterations), consider adding trace sampling in the future
- Current implementation is acceptable for typical formula debugging scenarios

---

## Related Issues

- **Previous Issue:** Ghost text missing for expressions (resolved by this fix)
- **Related Feature:** Debug output column also benefits from complete trace data
- **Future Enhancement:** Consider trace filtering options for long loops

---

## Verification Steps

To verify the fix:

1. Open Formula Editor
2. Select a loop/switch sample formula (e.g., "WHILE with BREAK")
3. Switch to "Test" tab
4. Click "Debug" button
5. Step through execution
6. **Verify:** Ghost text appears for ALL expressions inside loops/switches, not just assignments
7. **Compare:** Ghost text behavior is now consistent inside and outside of control structures

---

## Notes

- The fix preserves the existing behavior where IF expressions don't get duplicate trace steps (they record their own detailed steps for condition, THEN, ELSIF, ELSE branches)
- Variable snapshots are captured before and after each statement to properly track state changes
- The `buildExpressionDescription` helper generates appropriate descriptions for all statement types

---

## Breaking Changes

None. This fix only adds trace steps that were previously missing. Existing trace steps remain unchanged.

---

## Context

This issue was discovered while testing the formula debugger with loop and switch samples. Users reported that "some functions are missed, some are inconsistent with content outside of loops" in the ghost text display. Investigation revealed that the TracingEvaluator was selectively recording trace steps based on statement type, creating an inconsistent debugging experience.

The fix ensures that the debugging experience is consistent regardless of whether code is inside or outside of control structures, making it easier to understand formula execution flow.
