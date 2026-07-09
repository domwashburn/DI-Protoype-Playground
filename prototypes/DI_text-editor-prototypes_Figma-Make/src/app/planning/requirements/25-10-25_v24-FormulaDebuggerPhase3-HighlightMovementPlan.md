# Debug Highlight Movement - Troubleshooting Plan

**Date:** October 25, 2025  
**Version:** v24  
**Epic:** Formula Evaluation Debugger (Phase 3)  
**Status:** 🚧 Blocked - Needs Investigation

---

## Problem Statement

The debug highlight (blue line) does not move when stepping through execution traces in the Formula Editor debugger. The highlight renders on the initial step but remains fixed when clicking Next/Previous step buttons.

### Symptoms

1. **Initial render works:** First line highlights correctly when entering debug mode
2. **Movement fails:** Clicking Next/Previous step buttons doesn't move the highlight
3. **Data is flowing:** Console shows `currentStep` changing (0 → 1 → 0)
4. **Highlight object incomplete:** `buildDebugHighlight` returns object missing `currentLine`:

```javascript
// Expected
{
  currentLine: 10,
  currentColumn: 0,
  ghostValues: Map {},
  branchInfo: []
}

// Actual
{
  currentColumn: 0,  // ✓ present
  ghostValues: {},   // ✓ present (but empty Map serialized as {})
  branchInfo: []     // ✓ present
  // ❌ currentLine is MISSING!
}
```

### Console Evidence

```javascript
[FormulaTestPanel] Debug state changed: {
  "currentStep": 1,
  "executionTrace": "2 steps",
  "hasOnDebugHighlight": true
}
[FormulaTestPanel] Built highlight: {
  "currentColumn": 0,
  "ghostValues": {},
  "branchInfo": []
  // currentLine is missing!
}
```

---

## Root Cause Hypotheses

### Hypothesis 1: Trace Steps Missing Location Data ⭐ MOST LIKELY

**Theory:** The execution trace steps don't contain proper `location` information (line/column).

**Evidence:**
- `getCurrentLocation` returns `null` when location data is missing
- If location is `null`, `buildDebugHighlight` returns `null`
- But the logged object has `currentColumn: 0`, suggesting partial data

**How to Test:**
```typescript
// In FormulaTestPanel.tsx, log the actual trace structure
console.log('[TRACE STRUCTURE]', {
  totalSteps: executionTrace.steps.length,
  step0: executionTrace.steps[0],
  step1: executionTrace.steps[1],
  step0Location: executionTrace.steps[0]?.location,
  step1Location: executionTrace.steps[1]?.location
});
```

**Expected Result:**
```javascript
{
  totalSteps: 2,
  step0: {
    nodeType: 'IfExpression',
    location: { line: 1, column: 0 },  // ← Should have this
    result: false,
    // ...
  },
  step1: {
    nodeType: 'Literal',
    location: { line: 10, column: 2 }, // ← Should have this
    result: 0,
    // ...
  }
}
```

**If location is missing:**
- Problem is in `TracingEvaluator.ts` - not capturing location during evaluation
- Need to ensure every `addStep()` call includes location from AST node

### Hypothesis 2: getCurrentLocation Logic Error

**Theory:** `getCurrentLocation` has a boundary condition bug or type mismatch.

**Current Code:**
```typescript
export function getCurrentLocation(
  trace: ExecutionTrace | null,
  currentStep: number
): { line: number; column: number } | null {
  if (!trace || !trace.steps || currentStep < 0 || currentStep >= trace.steps.length) {
    return null;
  }
  
  const step = trace.steps[currentStep];
  return {
    line: step.location.line,
    column: step.location.column || 0
  };
}
```

**Potential Issues:**
- `step.location` might be `undefined` → would throw error, not return partial object
- `step.location.line` might be `undefined` → would return `{ line: undefined, column: 0 }`
- Type mismatch between `ExecutionTrace` and actual trace object

**How to Test:**
```typescript
// Add defensive logging in getCurrentLocation
export function getCurrentLocation(
  trace: ExecutionTrace | null,
  currentStep: number
): { line: number; column: number } | null {
  console.log('[getCurrentLocation] Input:', { 
    hasTrace: !!trace, 
    currentStep,
    stepsLength: trace?.steps?.length 
  });
  
  if (!trace || !trace.steps || currentStep < 0 || currentStep >= trace.steps.length) {
    console.log('[getCurrentLocation] Early return - invalid input');
    return null;
  }
  
  const step = trace.steps[currentStep];
  console.log('[getCurrentLocation] Step:', step);
  console.log('[getCurrentLocation] Location:', step.location);
  
  if (!step.location) {
    console.log('[getCurrentLocation] No location on step!');
    return null;
  }
  
  return {
    line: step.location.line,
    column: step.location.column || 0
  };
}
```

### Hypothesis 3: ExecutionTrace Type Mismatch

**Theory:** The actual trace object structure doesn't match the `ExecutionTrace` type definition.

**How to Test:**
```typescript
// In FormulaTestPanel after evaluation succeeds
console.log('[TRACE TYPE CHECK]', {
  isExecutionTrace: executionTrace.constructor.name,
  keys: Object.keys(executionTrace),
  hasSteps: 'steps' in executionTrace,
  stepsIsArray: Array.isArray(executionTrace.steps),
  firstStepKeys: Object.keys(executionTrace.steps[0] || {})
});
```

### Hypothesis 4: React Not Re-rendering

**Theory:** The highlight object is correct, but React isn't re-rendering the component.

**Evidence Against:** We added a `key` prop that should force re-render when `currentLine` changes. But if `currentLine` is `undefined`, the key would be `key="debug-undefined"` and wouldn't change between steps.

**How to Test:**
```typescript
// In FormulaEditor.tsx, log when highlight changes
useEffect(() => {
  console.log('[FormulaEditor] debugHighlight changed:', debugHighlight);
}, [debugHighlight]);
```

---

## Investigation Plan (Monday)

### Phase 1: Trace Structure Verification (15 min)

**Goal:** Confirm execution trace contains location data

**Steps:**
1. Add comprehensive logging to `FormulaTestPanel.tsx`:
   ```typescript
   useEffect(() => {
     if (executionResult?.trace) {
       console.group('🔍 TRACE STRUCTURE INVESTIGATION');
       console.log('Total steps:', executionResult.trace.steps.length);
       
       executionResult.trace.steps.forEach((step, i) => {
         console.log(`Step ${i}:`, {
           nodeType: step.nodeType,
           location: step.location,
           result: step.result,
           description: step.description
         });
       });
       
       console.groupEnd();
     }
   }, [executionResult]);
   ```

2. Run a simple test case:
   ```
   IF $orderTotal > 1000 THEN
     0
   ELSE
     5
   END
   ```
   With inputs: `orderTotal = 500`

3. **Expected:** Each step has `location: { line: X, column: Y }`
4. **If location is missing:** Problem is in `TracingEvaluator` - proceed to Phase 2A
5. **If location exists:** Problem is in highlight extraction - proceed to Phase 2B

### Phase 2A: Fix Trace Location Capture (30 min)

**If location data is missing from trace:**

1. **Check `TracingEvaluator.ts`** - every `addStep()` call should include location:
   ```typescript
   // Example pattern
   private evaluateIfExpression(node: IfExpressionNode, context: Context): any {
     this.addStep(node, /* ... */);  // ← Does this include node.location?
   }
   ```

2. **Verify AST nodes have location** in `FormulaParser.ts`:
   ```typescript
   // Parser should set location on every node
   const node: IfExpressionNode = {
     type: 'IfExpression',
     location: { line: this.currentToken.line, column: this.currentToken.column },
     // ...
   };
   ```

3. **Check Tokenizer** (`Tokenizer.ts`) - ensures tokens have line/column:
   ```typescript
   // Tokenizer should track position
   private currentLine: number = 1;
   private currentColumn: number = 0;
   ```

4. **Fix:** Ensure full location data flow: Tokenizer → Parser → AST → TracingEvaluator

### Phase 2B: Fix Highlight Extraction (20 min)

**If location data exists in trace:**

1. **Add defensive checks** to `getCurrentLocation`:
   ```typescript
   export function getCurrentLocation(
     trace: ExecutionTrace | null,
     currentStep: number
   ): { line: number; column: number } | null {
     // ... existing checks ...
     
     const step = trace.steps[currentStep];
     
     // NEW: Check if location exists and has required fields
     if (!step.location || typeof step.location.line !== 'number') {
       console.error('[getCurrentLocation] Invalid location:', step.location);
       return null;
     }
     
     return {
       line: step.location.line,
       column: step.location.column || 0
     };
   }
   ```

2. **Add null check** to `buildDebugHighlight`:
   ```typescript
   const location = getCurrentLocation(trace, currentStep);
   
   if (!location) {
     console.error('[buildDebugHighlight] No location for step', currentStep);
     return null;  // This is correct - but need to investigate WHY
   }
   ```

### Phase 3: Data Flow Verification (15 min)

**Goal:** Ensure highlight object flows correctly through component tree

1. **Log in App.tsx:**
   ```typescript
   const [debugHighlight, setDebugHighlight] = useState<DebugHighlight | null>(null);
   
   useEffect(() => {
     console.log('[App] debugHighlight state updated:', debugHighlight);
   }, [debugHighlight]);
   ```

2. **Log in EditorContainer.tsx:**
   ```typescript
   console.log('[EditorContainer] Passing debugHighlight to FormulaEditor:', debugHighlight);
   ```

3. **Log in FormulaEditor.tsx:**
   ```typescript
   useEffect(() => {
     console.log('[FormulaEditor] Received debugHighlight:', debugHighlight);
     console.log('[FormulaEditor] Current line should be:', debugHighlight?.currentLine);
   }, [debugHighlight]);
   ```

4. **Verify CSS:**
   ```typescript
   // In FormulaEditor.tsx, log the calculated top position
   {debugHighlight && (
     <div 
       key={`debug-${debugHighlight.currentLine}`}
       className={styles.debugOverlay}
       ref={(el) => {
         if (el) {
           console.log('[Debug Overlay] Rendered with:', {
             currentLine: debugHighlight.currentLine,
             calculatedTop: (debugHighlight.currentLine - 1) * LINE_HEIGHT_PX,
             overlayElement: el
           });
         }
       }}
     >
       {/* ... */}
     </div>
   )}
   ```

### Phase 4: React Re-render Verification (10 min)

**Goal:** Ensure React detects highlight changes

1. **Force new object reference:**
   ```typescript
   // In buildDebugHighlight, ensure we always return NEW object
   const highlight = {
     currentLine: location.line,
     currentColumn: location.column,
     ghostValues: extractGhostValues(trace, currentStep), // Returns new Map
     branchInfo: extractBranchInfo(trace, currentStep)     // Returns new Array
   };
   
   // The object itself is new, but verify with:
   console.log('[buildDebugHighlight] New object created:', highlight);
   console.log('[buildDebugHighlight] Object identity:', Object.is(highlight, lastHighlight));
   ```

2. **Check useEffect dependency:**
   ```typescript
   // In FormulaTestPanel - verify useEffect fires
   useEffect(() => {
     console.log('[FormulaTestPanel] useEffect fired - currentStep:', currentStep);
     // ...
   }, [executionTrace, currentStep, onDebugHighlight]);
   ```

3. **Verify callback stability:**
   ```typescript
   // In App.tsx - ensure setDebugHighlight is stable
   const handleDebugHighlightChange = useCallback((highlight: DebugHighlight | null) => {
     console.log('[App] handleDebugHighlightChange called:', highlight);
     setDebugHighlight(highlight);
   }, []);
   ```

---

## Expected Fixes

### If Location Data Missing (Most Likely)

**Files to modify:**
- `/services/evaluationEngine/parsers/Tokenizer.ts`
- `/services/evaluationEngine/parsers/FormulaParser.ts`
- `/services/evaluationEngine/debugger/TracingEvaluator.ts`

**Changes:**
1. Ensure Tokenizer tracks line/column for every token
2. Ensure Parser sets location on every AST node
3. Ensure TracingEvaluator includes location in every trace step

### If Highlight Extraction Issue

**Files to modify:**
- `/utils/debugHighlighting.ts`

**Changes:**
1. Add defensive null checks
2. Add better error logging
3. Handle edge cases (empty trace, missing location, etc.)

### If React Re-render Issue

**Files to modify:**
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx`
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`

**Changes:**
1. Ensure new object references on every update
2. Add explicit keys to force re-renders
3. Verify useEffect dependencies

---

## Test Cases

After fixes, verify with these test cases:

### Test 1: Simple IF Statement
```
IF $a > 10 THEN
  1
ELSE
  0
END
```
**Input:** `a = 5`  
**Expected steps:** 3 (IF condition, ELSE branch, literal 0)  
**Expected highlight:** Line 1 → Line 4 → Line 4

### Test 2: Nested IF
```
IF $a > 10 THEN
  IF $b > 5 THEN
    1
  ELSE
    2
  END
ELSE
  0
END
```
**Input:** `a = 15, b = 3`  
**Expected steps:** 5 (outer IF, inner IF, ELSE branch, literal 2, END)  
**Expected highlight:** Line 1 → Line 2 → Line 4 → Line 5 → Line 6

### Test 3: Variable Assignment
```
LET $discount = $orderTotal * 0.1
RETURN $discount
```
**Input:** `orderTotal = 100`  
**Expected steps:** 3 (multiplication, assignment, variable reference)  
**Expected highlight:** Line 1 → Line 1 → Line 2

### Test 4: Function Call
```
RETURN ROUND($price * 1.1, 2)
```
**Input:** `price = 9.99`  
**Expected steps:** 3 (multiplication, ROUND call, return)  
**Expected highlight:** Line 1 → Line 1 → Line 1

---

## Success Criteria

✅ **Trace Structure:**
- Every trace step has `location: { line: number, column: number }`
- Location corresponds to source code position

✅ **Highlight Object:**
- `buildDebugHighlight` returns complete object with `currentLine`
- `currentLine` changes when `currentStep` changes

✅ **Visual Update:**
- Blue highlight line moves smoothly when clicking Next/Previous
- Highlight position corresponds to current trace step's line number
- No console errors or warnings

✅ **Edge Cases:**
- Works with single-line formulas
- Works with multi-line formulas
- Works with nested structures
- Works when stepping backward (Previous button)

---

## Related Files

### Core Debug System
- `/services/evaluationEngine/debugger/TracingEvaluator.ts` - Captures execution trace
- `/services/evaluationEngine/debugger/ExecutionTracer.ts` - Trace data structure
- `/utils/debugHighlighting.ts` - Extracts highlight from trace

### Parser/AST
- `/services/evaluationEngine/parsers/Tokenizer.ts` - Token position tracking
- `/services/evaluationEngine/parsers/FormulaParser.ts` - AST node location
- `/services/evaluationEngine/ast/ASTNodes.ts` - Node type definitions

### UI Components
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx` - Renders highlight
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx` - Manages debug state
- `/App.tsx` - State container

---

## Notes

- Current implementation has comprehensive logging added (see changes in this session)
- The logging will be VERY helpful for diagnosis Monday
- Once root cause is found, we can remove debug logs and add proper error handling
- Consider adding TypeScript strict mode checks to catch `undefined` location early

---

## References

- [EPIC-FormulaEvaluationDebugger.md](./EPIC-FormulaEvaluationDebugger.md) - Overall debugger epic
- [25-10-25_v22-FormulaDebuggerPhase3Implementation.md](./25-10-25_v22-FormulaDebuggerPhase3Implementation.md) - Phase 3 initial implementation
- [25-10-25_v23-FormulaDebuggerPhase3Complete.md](./25-10-25_v23-FormulaDebuggerPhase3Complete.md) - Completion notes (premature)
