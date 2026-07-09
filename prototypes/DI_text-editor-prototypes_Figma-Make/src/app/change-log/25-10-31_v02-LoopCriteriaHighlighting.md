# Loop Criteria Highlighting - Debugger Enhancement

**Date:** October 31, 2025  
**Type:** Feature Enhancement  
**Component:** Formula Debugger - Loop Tracing

## Summary

Enhanced the formula debugger to display evaluation highlights and ghost values on loop criteria lines during each iteration. When loops execute, the debugger now shows:
- **FOR loops**: Iterator variable value on each iteration
- **WHILE loops**: Condition evaluation result (true/false) on each check

This makes loop execution transparent and helps users understand when and why loops continue or terminate.

## Context

The formula debugger traces execution step-by-step, showing intermediate values and highlighting the current line being executed. However, loop constructs (FOR and WHILE) were not showing their criteria evaluations, making it difficult to understand:

1. What value the iterator has on each FOR loop iteration
2. What the WHILE condition evaluates to on each iteration  
3. When and why a loop terminates (condition becomes false)

## User Request

> "Please ensure that the highlight displays on the loop criteria line to show the evaluation/output like standard lines when the loop continues and restarts (until the loop's criteria is satisfied and it ends)"

## Implementation Details

### Files Changed
- `/services/evaluationEngine/debugger/TracingEvaluator.ts`

### FOR Loop Enhancement

**Added tracing for each iteration:**

```typescript
case 'ForLoopStatement': {
  // ... existing setup code ...
  
  for (let i = 0; i < iterable.length; i++) {
    const item = iterable[i];
    
    // Set loop variable
    context.locals.set(forLoop.iterator, item);
    
    // TRACE: Record step showing iterator value on loop line
    const varsBeforeIteration = this.captureVariables(context);
    const iteratorDescription = `${forLoop.iterator} = ${this.formatValue(item)}`;
    
    this.tracer.recordStep({
      nodeType: 'ForLoopStatement',
      location: forLoop.location,  // FOR loop line
      description: `FOR ${iteratorDescription}`,
      variablesBefore: varsBeforeIteration,
      variablesAfter: varsBeforeIteration,
      changedVariables: [forLoop.iterator],
      result: item,
      resultType: this.getType(item),
    });
    
    // Execute loop body...
  }
}
```

**Result:**
- On each iteration, the FOR line highlights with a ghost value showing the iterator
- Example: `FOR $num = 10` then `FOR $num = 20` then `FOR $num = 30` etc.
- Users can see exactly what value the iterator has on each pass

### WHILE Loop Enhancement

**Added tracing for each condition evaluation:**

```typescript
case 'WhileLoopStatement': {
  // ... existing setup code ...
  
  while (true) {
    // TRACE: Evaluate and record condition check on EACH iteration
    const varsBeforeCondition = this.captureVariables(context);
    const condition = this.evaluateExpression(whileLoop.condition, context);
    
    // Build description showing the condition expression and result
    const conditionDescription = this.buildExpressionDescription(
      whileLoop.condition,
      condition,
      varsBeforeCondition
    );
    
    this.tracer.recordStep({
      nodeType: 'WhileLoopStatement',
      location: whileLoop.location,  // WHILE loop line
      description: `WHILE ${conditionDescription}`,
      variablesBefore: varsBeforeCondition,
      variablesAfter: varsBeforeCondition,
      changedVariables: [],
      result: condition,
      resultType: 'boolean',
    });
    
    // If condition is false, exit loop
    if (!condition) {
      break;
    }
    
    // Execute loop body...
  }
}
```

**Result:**
- On each iteration, the WHILE line highlights with a ghost value showing condition evaluation
- Example: `WHILE $count <= 10 = true` then eventually `WHILE $count <= 10 = false`
- Users can see the exact moment when the condition becomes false and the loop exits
- The condition expression is fully evaluated and displayed (e.g., `5 <= 10 = true`)

## Visual Example

### FOR Loop Debugging

```
Line 3: FOR $num IN [10, 20, 30] DO
        👻 $num = 10        ← First iteration
        
Line 4:   $sum = $sum + $num
        👻 10 NUMBER        ← Result of addition

[Step forward...]

Line 3: FOR $num IN [10, 20, 30] DO
        👻 $num = 20        ← Second iteration
        
Line 4:   $sum = $sum + $num
        👻 30 NUMBER        ← Result of addition

[Step forward...]

Line 3: FOR $num IN [10, 20, 30] DO
        👻 $num = 30        ← Third iteration
```

### WHILE Loop Debugging

```
Line 5: WHILE $count <= 10 DO
        👻 1 <= 10 = true BOOLEAN   ← First check: true, loop continues
        
Line 6:   $count = $count + 1
        👻 2 NUMBER

[Step forward through iterations...]

Line 5: WHILE $count <= 10 DO
        👻 10 <= 10 = true BOOLEAN  ← Last true check
        
Line 6:   $count = $count + 1
        👻 11 NUMBER

[Step forward...]

Line 5: WHILE $count <= 10 DO
        👻 11 <= 10 = false BOOLEAN ← Condition false, loop exits
        
Line 8: RETURN $count
        👻 11 NUMBER                ← Final result
```

## Technical Approach

### Using Existing Infrastructure

The implementation leverages the existing tracing infrastructure:

1. **`this.tracer.recordStep()`**: Records each trace step with location, description, and result
2. **`this.buildExpressionDescription()`**: Formats condition expressions showing full evaluation
3. **`this.formatValue()`**: Formats values for display (handles numbers, strings, booleans, lists, objects)
4. **`this.captureVariables()`**: Snapshots variable state before/after each step
5. **AST location info**: `forLoop.location` and `whileLoop.location` provide line numbers

### Description Format

- **FOR loops**: `"FOR $iterator = value"` format
  - Shows iterator variable name and current value
  - Simple and clear for each iteration
  
- **WHILE loops**: `"WHILE condition = result"` format
  - Shows full condition expression with evaluation
  - Example: `"WHILE $count <= 10 = true BOOLEAN"`
  - Makes it obvious when condition becomes false

## Benefits

### 1. **Transparency**
Users can now see:
- What value is being processed in each FOR loop iteration
- How the WHILE condition evaluates on each check
- The exact moment a WHILE loop terminates

### 2. **Debugging Power**
Helps identify:
- Off-by-one errors in loop conditions
- Infinite loops (can see condition never becomes false)
- Unexpected iterator values
- Logic errors in loop termination

### 3. **Educational Value**
New users learning loops can:
- See how FOR loops step through collections
- Understand how WHILE conditions are checked repeatedly
- Learn when and why loops exit

### 4. **Consistency**
Loop constructs now behave like other statements:
- Show highlights on execution
- Display ghost values with results
- Follow same step-through pattern

## Sample Formulas Affected

All loop samples in `/SampleData/loopsSwitchSamples.ts` now have enhanced debugging:

**FOR Loop Samples:**
- Simple FOR Loop - Sum List
- FOR Loop with Range  
- FOR Loop with CONTINUE
- Commission Calculation
- Build List in Loop

**WHILE Loop Samples:**
- Simple WHILE Loop
- WHILE Loop - Find Threshold
- Countdown Timer
- Search with WHILE and BREAK

## Testing

### Verification Steps

1. **Open Formula Editor**
2. **Select a loop sample** (e.g., "Simple WHILE Loop")
3. **Click "Start Debug"**
4. **Step through execution**

**Expected behavior:**
- FOR loop line highlights on each iteration with iterator value
- WHILE loop line highlights on each condition check with result
- Ghost values appear on the loop declaration line
- Loop exits cleanly when condition becomes false

### Edge Cases Handled

✅ **Empty lists**: FOR loop doesn't iterate, no trace steps  
✅ **False initial condition**: WHILE records one false check, immediately exits  
✅ **BREAK statements**: Loop tracing stops cleanly  
✅ **CONTINUE statements**: Skip to next iteration, condition checked again  
✅ **Nested loops**: Each loop level traces independently (though nested lists not currently supported)

## Performance Considerations

**Overhead:** Each loop iteration now creates one additional trace step for the condition/iterator

**Impact:** Minimal - trace steps are lightweight records:
- Loop with 10 iterations: +10 trace steps
- Loop with 100 iterations: +100 trace steps
- Modern browsers handle thousands of steps easily

**Trade-off:** Slightly more memory for significantly better debugging visibility

## Future Enhancements

Potential improvements for loop debugging:

1. **Iteration counter**: Show `(iteration 1 of 5)` in description
2. **Loop summary**: Show total iterations and final state at loop end
3. **Performance metrics**: Track time spent in loop
4. **Loop unwinding**: Allow "run to loop exit" command
5. **Break/continue indicators**: Visual markers when BREAK/CONTINUE executed

## Visual Demo

For a comprehensive visual demonstration of the new loop debugging features, see:
- **[Loop Debugging Visual Demo](./LOOP_DEBUGGING_VISUAL_DEMO.md)** - Step-by-step walkthrough with examples

## Related

- **Parent Epic**: EPIC-007 - Loops and Switch Statements
- **Phase**: EPIC-007 Phase 1 (completed) - Foundation
- **Related Files**: 
  - `/SampleData/loopsSwitchSamples.ts` - Loop test cases
  - `/services/evaluationEngine/debugger/ExecutionTracer.ts` - Trace recording
  - `/components/editors/code/FormulaEditor/GhostValue.tsx` - Visual display

## Notes

This enhancement completes the loop debugging experience by ensuring ALL executable lines produce trace steps, making the debugger's step-through behavior consistent and predictable. Users can now fully understand loop behavior through visual debugging.
