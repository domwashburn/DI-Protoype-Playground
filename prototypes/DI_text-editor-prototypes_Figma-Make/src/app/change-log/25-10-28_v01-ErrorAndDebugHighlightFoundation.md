# Error & Debug Highlight Foundation - Phase 1 Extended

**Date:** October 28, 2025  
**Version:** v01  
**Epic:** Formula Evaluation Debugger (Phase 3)  
**Status:** 🚧 In Progress

---

## Overview

This extends Phase 1 of the debug highlight bug fix to start by implementing **error line highlighting** as a foundation. Error highlighting is simpler (just highlight a line in red when there's a parse/evaluation error), and establishing this pattern will validate the positioning mechanism before adding the more complex debug highlighting.

### Goals

1. **Primary:** Implement error line highlighting when formulas fail to parse/evaluate
2. **Secondary:** Establish line overlay positioning pattern for debug mode
3. **Tertiary:** Investigate why debug highlight isn't moving (original Phase 1)

---

## Part 1: Error Line Highlighting Implementation

### User Experience

**When a formula has an error:**
- ❌ The line containing the error is highlighted in red
- ❌ Error highlight appears behind the text (overlay)
- ❌ Error message appears in test panel (already exists)
- ❌ Highlight persists until error is fixed or code changes

**Example:**
```
1  LET $discount = $orderTotal * 0.1
2  IF $discount > 100 THEN
3    RETURM $discount    ← Error: Unknown keyword "RETURM" 
4  END                     (line 3 highlighted in red)
```

### Technical Design

**Error Highlight Structure:**
```typescript
interface ErrorHighlight {
  line: number;          // 1-indexed line number
  column?: number;       // Optional column for precise positioning
  message: string;       // Error message
}
```

**Data Flow:**
1. Formula evaluation fails → EvaluationError thrown
2. FormulaTestPanel catches error → extracts line number
3. TestPanel calls `onErrorHighlight(errorHighlight)`
4. App state updates → passes to FormulaEditor
5. FormulaEditor renders red overlay at line position

**Visual Styling:**
```css
/* Error overlay - red background, semi-transparent */
.errorOverlay {
  position: absolute;
  left: 0;
  right: 0;
  height: var(--line-height);
  background: rgba(218, 30, 40, 0.1);  /* Red, 10% opacity */
  border-left: 3px solid var(--error-primary);
  pointer-events: none;
  z-index: 1;
}
```

### Implementation Steps

#### Step 1: Update Error Classes

**File:** `/services/evaluationEngine/errors/EvaluationError.ts`

Ensure all errors capture line/column information:

```typescript
export class ParseError extends Error {
  constructor(
    message: string,
    public line: number,
    public column: number = 0,
    public token?: string
  ) {
    super(message);
    this.name = 'ParseError';
  }
}

export class EvaluationError extends Error {
  constructor(
    message: string,
    public line?: number,
    public column?: number,
    public node?: any
  ) {
    super(message);
    this.name = 'EvaluationError';
    
    // Extract location from node if not provided
    if (!this.line && node?.location) {
      this.line = node.location.line;
      this.column = node.location.column;
    }
  }
}
```

#### Step 2: Extract Error Location in Test Panel

**File:** `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`

Add error highlight callback:

```typescript
interface FormulaTestPanelProps {
  // ... existing props
  onErrorHighlight?: (highlight: ErrorHighlight | null) => void;
}

export function FormulaTestPanel({ 
  code, 
  variables, 
  onErrorHighlight,
  // ... other props
}: FormulaTestPanelProps) {
  
  useEffect(() => {
    try {
      // ... existing evaluation logic
      
      // Clear error highlight on success
      onErrorHighlight?.(null);
      
    } catch (error) {
      console.error('[FormulaTestPanel] Evaluation failed:', error);
      
      // Extract error location
      if (error instanceof ParseError || error instanceof EvaluationError) {
        const errorHighlight: ErrorHighlight = {
          line: error.line || 1,
          column: error.column,
          message: error.message
        };
        
        console.log('[FormulaTestPanel] Error highlight:', errorHighlight);
        onErrorHighlight?.(errorHighlight);
      }
      
      setEvaluationResult({
        success: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }, [code, variables, onErrorHighlight]);
  
  // ... rest of component
}
```

#### Step 3: Add Error State to App

**File:** `/App.tsx`

Add error highlight state alongside debug highlight:

```typescript
export default function App() {
  // ... existing state
  const [debugHighlight, setDebugHighlight] = useState<DebugHighlight | null>(null);
  const [errorHighlight, setErrorHighlight] = useState<ErrorHighlight | null>(null);
  
  return (
    <EditorContainer
      activeEditor={activeEditor}
      code={code}
      onCodeChange={handleCodeChange}
      debugHighlight={debugHighlight}
      errorHighlight={errorHighlight}  // ← New prop
      onDebugHighlightChange={setDebugHighlight}
      onErrorHighlightChange={setErrorHighlight}  // ← New prop
    />
  );
}
```

#### Step 4: Wire Through EditorContainer

**File:** `/components/EditorContainer/EditorContainer.tsx`

Pass error highlight to FormulaEditor:

```typescript
interface EditorContainerProps {
  // ... existing props
  errorHighlight?: ErrorHighlight | null;
  onErrorHighlightChange?: (highlight: ErrorHighlight | null) => void;
}

export function EditorContainer({ 
  errorHighlight,
  onErrorHighlightChange,
  // ... other props
}: EditorContainerProps) {
  
  return (
    <>
      {activeEditor === 'formula' && (
        <FormulaEditor
          code={code}
          onChange={onCodeChange}
          debugHighlight={debugHighlight}
          errorHighlight={errorHighlight}  // ← Pass through
        />
      )}
      
      <FormulaTestPanel
        code={code}
        onErrorHighlight={onErrorHighlightChange}  // ← Wire up
        // ... other props
      />
    </>
  );
}
```

#### Step 5: Render Error Overlay in FormulaEditor

**File:** `/components/editors/code/FormulaEditor/FormulaEditor.tsx`

Add error overlay rendering (similar to debug overlay):

```typescript
interface FormulaEditorProps {
  // ... existing props
  errorHighlight?: ErrorHighlight | null;
}

export function FormulaEditor({ 
  code, 
  onChange, 
  debugHighlight,
  errorHighlight  // ← New prop
}: FormulaEditorProps) {
  
  // ... existing code
  
  return (
    <div className={styles.editorWrapper}>
      {/* Line numbers */}
      <div className={styles.lineNumbers}>
        {lines.map((_, i) => (
          <div key={i} className={styles.lineNumber}>
            {i + 1}
          </div>
        ))}
      </div>
      
      {/* Overlay container */}
      <div className={styles.overlayContainer}>
        {/* ERROR HIGHLIGHT - Red overlay */}
        {errorHighlight && (
          <div
            className={styles.errorOverlay}
            style={{
              top: (errorHighlight.line - 1) * LINE_HEIGHT_PX,
              height: LINE_HEIGHT_PX
            }}
          />
        )}
        
        {/* DEBUG HIGHLIGHT - Blue overlay (existing) */}
        {debugHighlight && (
          <div
            className={styles.debugOverlay}
            style={{
              top: (debugHighlight.currentLine - 1) * LINE_HEIGHT_PX,
              height: LINE_HEIGHT_PX
            }}
          />
        )}
        
        {/* Syntax highlighting overlay (existing) */}
        <div className={styles.highlightOverlay}>
          {highlightedLines.map((line, i) => (
            <div key={i} className={styles.highlightLine}>
              {line}
            </div>
          ))}
        </div>
      </div>
      
      {/* Textarea (existing) */}
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        className={styles.editor}
        spellCheck={false}
      />
    </div>
  );
}
```

#### Step 6: Style Error Overlay

**File:** `/components/editors/code/FormulaEditor/FormulaEditor.module.css`

Add error overlay styles:

```css
.errorOverlay {
  position: absolute;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 1;
  
  /* Error styling - red background */
  background: rgba(218, 30, 40, 0.1);  /* IBM Red 60, 10% opacity */
  border-left: 3px solid var(--error-primary, #da1e28);
  
  /* Smooth appearance */
  transition: opacity 200ms ease-in-out;
}

.debugOverlay {
  position: absolute;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 2;  /* Above error overlay */
  
  /* Debug styling - blue background */
  background: rgba(0, 122, 255, 0.1);
  border-left: 3px solid var(--interactive-primary, #007aff);
  
  /* Smooth appearance */
  transition: opacity 200ms ease-in-out;
}

/* When both overlays present, debug wins (higher z-index) */
```

### Testing Error Highlighting

**Test Case 1: Parse Error**
```
LET $discount = $orderTotal * 0.1
RETURM $discount
```
Expected: Line 2 highlighted in red, error message "Unknown keyword 'RETURM'"

**Test Case 2: Evaluation Error**
```
LET $result = 10 / 0
RETURN $result
```
Expected: Line 1 highlighted in red, error message "Division by zero"

**Test Case 3: Type Error**
```
LET $total = "abc" + 123
RETURN $total
```
Expected: Line 1 highlighted in red, error message about type mismatch

**Test Case 4: Error on Multi-line IF**
```
IF $orderTotal > 1000 THEN
  LET $discount = UNKNOWNFUNC($orderTotal)
  RETURN $discount
END
```
Expected: Line 2 highlighted in red, error message "Unknown function 'UNKNOWNFUNC'"

---

## Part 2: Debug Highlight Investigation (Original Phase 1)

Once error highlighting works and validates our positioning approach, proceed with debug highlight investigation.

### Hypothesis

Based on error highlight implementation, we'll know if the issue is:

1. **Positioning mechanism** - If error highlight also doesn't move/position correctly, the problem is in the overlay positioning CSS
2. **Data flow** - If error highlight works but debug doesn't, the issue is in how debug highlight data flows
3. **Trace data** - If both work for initial render but debug doesn't update, the issue is trace step data

### Investigation Steps

**Step 1: Verify Error Highlighting Works**
- Test with multiple error scenarios
- Confirm line positions correctly
- Verify overlay appears and disappears

**Step 2: Add Comprehensive Logging**

Add to `FormulaTestPanel.tsx`:
```typescript
useEffect(() => {
  if (executionTrace) {
    console.group('🔍 TRACE STRUCTURE');
    console.log('Total steps:', executionTrace.steps.length);
    
    executionTrace.steps.forEach((step, i) => {
      console.log(`Step ${i}:`, {
        nodeType: step.nodeType,
        location: step.location,  // ← Check if this exists
        result: step.result
      });
    });
    
    console.groupEnd();
  }
}, [executionTrace]);
```

Add to `debugHighlighting.ts`:
```typescript
export function buildDebugHighlight(
  trace: ExecutionTrace | null,
  currentStep: number
): DebugHighlight | null {
  console.log('[buildDebugHighlight] Input:', {
    hasTrace: !!trace,
    stepsLength: trace?.steps?.length,
    currentStep,
    stepData: trace?.steps?.[currentStep]  // ← Log the actual step
  });
  
  // ... rest of function
}
```

**Step 3: Test Debug Highlighting**

Use simple formula:
```
IF $orderTotal > 1000 THEN
  0
ELSE
  5
END
```

With input: `orderTotal = 500`

Watch console for:
- Do trace steps have `location` data?
- What does `buildDebugHighlight` receive?
- What does it return?

**Step 4: Fix Based on Findings**

**Scenario A: Location data missing**
→ Fix Tokenizer/Parser to capture line/column in AST nodes

**Scenario B: Location data exists but highlight object wrong**
→ Fix `buildDebugHighlight` to properly extract line

**Scenario C: Highlight object correct but doesn't render**
→ Fix React re-rendering or CSS positioning

---

## Success Criteria

### Part 1: Error Highlighting
- ✅ Parse errors highlight the correct line in red
- ✅ Evaluation errors highlight the correct line in red
- ✅ Error highlight clears when error is fixed
- ✅ Error highlight doesn't interfere with syntax highlighting
- ✅ Multiple errors show the first error line
- ✅ Error overlay positioned correctly with line numbers aligned

### Part 2: Debug Highlighting
- ✅ Debug highlight moves when stepping through trace
- ✅ Debug highlight positioned at correct line
- ✅ Debug and error highlights can coexist (debug has higher z-index)
- ✅ Console logs reveal root cause of original bug

---

## Implementation Order

1. **Error Classes** - Ensure errors capture line numbers
2. **Test Panel** - Extract error location, call callback
3. **App State** - Add errorHighlight state
4. **EditorContainer** - Wire through to FormulaEditor
5. **FormulaEditor** - Render error overlay
6. **CSS** - Style error overlay (red)
7. **Testing** - Verify with multiple error scenarios
8. **Investigation** - Add debug logging for trace structure
9. **Debug Fix** - Apply fix based on findings

---

## Files Modified

### New/Modified Files
- `/services/evaluationEngine/errors/EvaluationError.ts` - Ensure line capture
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx` - Extract error, add callback
- `/App.tsx` - Add errorHighlight state
- `/components/EditorContainer/EditorContainer.tsx` - Wire through error highlight
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx` - Render error overlay
- `/components/editors/code/FormulaEditor/FormulaEditor.module.css` - Error overlay styles

### Files to Investigate
- `/services/evaluationEngine/parsers/Tokenizer.ts` - Check token location tracking
- `/services/evaluationEngine/parsers/FormulaParser.ts` - Check AST node locations
- `/services/evaluationEngine/debugger/TracingEvaluator.ts` - Check trace step locations
- `/utils/debugHighlighting.ts` - Check highlight extraction

---

## Visual Reference

### Error Highlight (Red)
```
┌────────────────────────────────────┐
│ 1  LET $discount = $total * 0.1    │
│ 2  IF $discount > 100 THEN         │
│ 3  ████ RETURM $discount ████      │ ← Red overlay, left border
│ 4  END                             │
└────────────────────────────────────┘
```

### Debug Highlight (Blue)
```
┌────────────────────────────────────┐
│ 1  IF $orderTotal > 1000 THEN      │
│ 2  ████ 0 ████                     │ ← Blue overlay, left border
│ 3  ELSE                            │
│ 4    5                             │
└────────────────────────────────────┘
```

### Both (Debug wins - higher z-index)
```
┌────────────────────────────────────┐
│ 1  IF $orderTotal > 1000 THEN      │
│ 2  ████ RETURM 0 ████              │ ← Blue debug over red error
│ 3  ELSE                            │
└────────────────────────────────────┘
```

---

## Expected Timeline

- **Error Highlighting:** 1-2 hours
- **Testing Error Highlighting:** 30 minutes
- **Debug Investigation:** 30 minutes
- **Debug Fix:** 30-60 minutes (depends on root cause)
- **Total:** 3-4 hours

---

## Next Steps After Completion

Once error and debug highlighting both work:

1. **Remove debug logging** - Clean up console.log statements
2. **Add error tooltip** - Show error message on hover over error line
3. **Update documentation** - Document error highlighting pattern
4. **Consider multi-error display** - Show all errors, not just first
5. **Ghost values for errors** - Show intermediate values leading to error

---

## References

- [Original Debug Plan](./25-10-25_v24-FormulaDebuggerPhase3-HighlightMovementPlan.md) - Full investigation plan
- [Phase 3 Implementation](./25-10-25_v22-FormulaDebuggerPhase3Implementation.md) - Initial debug overlay
- [Debugger EPIC](./EPIC-FormulaEvaluationDebugger.md) - Overall debugger architecture

---

**Status:** Ready to implement  
**Priority:** High - Establishes foundation for debug mode  
**Risk:** Low - Error highlighting is straightforward, validates approach
