# Error & Debug Highlight Foundation - Partial Implementation

**Date:** October 28, 2025  
**Version:** v02  
**Status:** 🚧 Partial - Backend Complete, Frontend Wiring Needed

---

## Summary

Implemented the **backend infrastructure** for error line highlighting in the Formula Editor as a foundation for debug highlighting. The error highlight system extracts line numbers from evaluation errors and prepares them for visual highlighting in the editor.

---

## ✅ Completed Steps

### **Step 1: Error Classes with Line Extraction** ✅

**File:** `/services/evaluationEngine/errors/EvaluationError.ts`

- Added `getErrorLine()` utility function to extract line numbers from any error type
- Handles `EvaluationError` with `location` property
- Falls back to direct `line` property or nested `location.start.line`
- Returns `null` if no location information available

```typescript
export function getErrorLine(error: unknown): number | null {
  if (!error) return null;
  
  if (error instanceof EvaluationError && error.location) {
    return error.location.start.line;
  }
  
  // Fallback checks for other error formats
  // ...
  
  return null;
}
```

### **Step 2: FormulaTestPanel Error Extraction** ✅

**File:** `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`

- Added `ErrorHighlight` interface:
  ```typescript
  export interface ErrorHighlight {
    line: number;
    column?: number;
    message: string;
  }
  ```

- Added `onErrorHighlight` prop to `FormulaTestPanelProps`
- Updated `handleEvaluate()` to extract error location and call callback
- Clears error highlight on successful evaluation
- Handles errors in both debug mode and regular mode
- Comprehensive logging for debugging

**Key Changes:**
```typescript
// On error
if (onErrorHighlight && evalResult.errors.length > 0) {
  const firstError = evalResult.errors[0];
  const errorLine = getErrorLine(firstError);
  
  if (errorLine !== null) {
    onErrorHighlight({
      line: errorLine,
      message: firstError.message
    });
  }
}

// On success
if (onErrorHighlight) {
  onErrorHighlight(null);
}
```

### **Step 3: Error Test Samples** ✅

**File:** `/SampleData/formulaSamples.ts`

Added 4 error test samples prefixed with ⚠️:

1. **⚠️ ERROR: Syntax Error - Unknown Keyword**
   - Formula with `RETURM` instead of `RETURN`
   - Error on line 3
   
2. **⚠️ ERROR: Undefined Function**
   - Formula with `UNKNOWNFUNC()` call
   - Error on line 2
   
3. **⚠️ ERROR: Division by Zero**
   - Formula with `10 / 0`
   - Error on line 1
   
4. **⚠️ ERROR: Type Mismatch**
   - Formula with `"abc" + 123`
   - Error on line 1

---

## ❌ Remaining Steps (For Completion)

### **Step 3: Wire Through App.tsx** ❌ NOT DONE

**File:** `/App.tsx`

**Needed:**
```typescript
// Add errorHighlight state
const [debugHighlight, setDebugHighlight] = useState<DebugHighlight | null>(null);
const [errorHighlight, setErrorHighlight] = useState<ErrorHighlight | null>(null);

// Pass to EditorContainer
<EditorContainer
  activeEditor={activeEditor}
  code={code}
  onCodeChange={handleCodeChange}
  debugHighlight={debugHighlight}
  errorHighlight={errorHighlight}  // ← NEW
  onDebugHighlightChange={setDebugHighlight}
  onErrorHighlightChange={setErrorHighlight}  // ← NEW
/>
```

### **Step 4: Wire Through EditorContainer** ❌ NOT DONE

**File:** `/components/EditorContainer/EditorContainer.tsx`

**Needed:**
```typescript
interface EditorContainerProps {
  // ... existing props
  errorHighlight?: ErrorHighlight | null;
  onErrorHighlightChange?: (highlight: ErrorHighlight | null) => void;
}

// Pass to FormulaEditor
<FormulaEditor
  code={code}
  onChange={onCodeChange}
  debugHighlight={debugHighlight}
  errorHighlight={errorHighlight}  // ← NEW
/>

// Pass to FormulaTestPanel
<FormulaTestPanel
  code={code}
  onErrorHighlight={onErrorHighlightChange}  // ← NEW
  // ... other props
/>
```

### **Step 5: Render Error Overlay in FormulaEditor** ❌ NOT DONE

**File:** `/components/editors/code/FormulaEditor/FormulaEditor.tsx`

**Needed:**
```typescript
interface FormulaEditorProps {
  // ... existing props
  errorHighlight?: ErrorHighlight | null;
}

// In render:
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
  
  {/* ... other overlays */}
</div>
```

### **Step 6: Style Error Overlay** ❌ NOT DONE

**File:** `/components/editors/code/FormulaEditor/FormulaEditor.module.css`

**Needed:**
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
```

---

## Implementation Notes

### Design Decisions

1. **Error highlight has lower z-index than debug** - When both are present (error while debugging), debug wins
2. **Red for errors, blue for debug** - Clear visual distinction
3. **Semi-transparent backgrounds** - Allows code to remain readable
4. **Left border indicator** - Visual anchor for the highlighted line
5. **Clear on success** - Highlights automatically disappear when code is fixed

### Data Flow

```
FormulaTestPanel (evaluation)
  └─> Extract error line with getErrorLine()
      └─> Call onErrorHighlight({ line, message })
          └─> App.tsx state update
              └─> EditorContainer pass-through
                  └─> FormulaEditor renders red overlay
```

### Logging Added

All steps log to console for debugging:
- `[FormulaTestPanel] Error highlight: { line: X, message: "..." }`
- `[buildDebugHighlight] Called with: { ... }`
- `[getCurrentLocation] Step data: { ... }`

---

## Testing Plan

Once frontend wiring is complete:

1. **Load error test sample** - Select "⚠️ ERROR: Syntax Error"
2. **Click "Evaluate Formula"** - Should fail with error
3. **Verify red highlight** - Line 3 should have red background
4. **Fix the error** - Change `RETURM` to `RETURN`
5. **Re-evaluate** - Should succeed, red highlight should disappear

Test all 4 error samples to verify different error types.

---

## Next Steps

To complete error highlighting:

1. Update `App.tsx` - Add `errorHighlight` state
2. Update `EditorContainer.tsx` - Wire through props
3. Update `FormulaEditor.tsx` - Render error overlay
4. Update `FormulaEditor.module.css` - Add error overlay styles
5. Test with all 4 error samples
6. Remove debug logging once working
7. Proceed to debug highlight investigation

---

## Related Files

### Modified
- `/services/evaluationEngine/errors/EvaluationError.ts`
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`
- `/SampleData/formulaSamples.ts`

### Need Modification
- `/App.tsx`
- `/components/EditorContainer/EditorContainer.tsx`
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx`
- `/components/editors/code/FormulaEditor/FormulaEditor.module.css`

---

## References

- [Error & Debug Highlight Foundation Plan](./25-10-28_v01-ErrorAndDebugHighlightFoundation.md)
- [Debug Highlight Movement Plan](./25-10-25_v24-FormulaDebuggerPhase3-HighlightMovementPlan.md)
- [Debugger EPIC](./EPIC-FormulaEvaluationDebugger.md)
