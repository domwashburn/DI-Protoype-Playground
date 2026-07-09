# Formula Debugger Phase 3 - Editor Integration & Line Highlighting

**Date:** October 25, 2025  
**Epic:** Formula Evaluation Debugger  
**Phase:** 3 of 4  
**Status:** 📋 Planned

---

## Summary

Phase 3 enhances the debugger with visual feedback in the Formula Editor itself. When stepping through a formula in debug mode, the editor will highlight the current execution line, show ghost value annotations for intermediate results, and provide visual indicators for control flow (branches taken/skipped).

---

## Goals

1. **Current Line Highlighting** - Visually show which line/expression is being executed
2. **Ghost Value Annotations** - Display intermediate values inline next to expressions
3. **Branch Flow Indicators** - Show which IF/ELSIF/ELSE branches were taken
4. **Editor Sync** - Auto-scroll editor to show current line during playback
5. **Execution Path Visualization** - Visual trail of execution flow

---

## User Stories

### Story 1: See Current Execution Line
**As a** formula author  
**I want to** see which line is currently being executed  
**So that** I can follow the execution flow visually

**Acceptance Criteria:**
- Current execution line has distinct highlight (blue/cyan background)
- Highlight updates as I step forward/backward
- Editor auto-scrolls to keep current line visible
- Line numbers show execution indicator (arrow or dot)

### Story 2: Inspect Intermediate Values
**As a** formula author  
**I want to** see intermediate calculation results inline  
**So that** I can understand how complex expressions are evaluated

**Acceptance Criteria:**
- Ghost values appear to the right of expressions
- Values show result type and formatted value
- Hover shows detailed value information
- Values update as I step through execution

### Story 3: Visualize Control Flow
**As a** formula author  
**I want to** see which branches were taken  
**So that** I can verify conditional logic is working

**Acceptance Criteria:**
- Taken branches highlighted with green left border
- Skipped branches dimmed/grayed out
- THEN/ELSE clauses show which was executed
- Nested IFs show hierarchy clearly

---

## Technical Design

### Architecture

```
FormulaEditor
  ├─ Textarea (input layer)
  ├─ Syntax Highlighting Overlay
  └─ Debug Highlighting Overlay (NEW)
      ├─ Current Line Highlight
      ├─ Ghost Value Annotations
      ├─ Branch Indicators
      └─ Execution Markers
```

### Component Changes

#### 1. FormulaEditor Enhancement

**Add Debug Overlay Layer:**

```tsx
// FormulaEditor.tsx
export interface FormulaEditorProps {
  // ... existing props
  
  // NEW: Debug mode props
  debugHighlight?: {
    currentLine: number;
    currentColumn?: number;
    ghostValues?: Map<number, any>; // line number → value
    branchInfo?: BranchHighlight[];
  };
}

interface BranchHighlight {
  line: number;
  taken: boolean; // true = executed, false = skipped
  type: 'then' | 'elsif' | 'else';
}
```

**Render Debug Overlay:**

```tsx
{/* Existing overlays */}
<div ref={overlayRef} className={styles.highlightOverlay}>
  {renderedLines}
</div>

{/* NEW: Debug overlay */}
{debugHighlight && (
  <div className={styles.debugOverlay}>
    {/* Current line highlight */}
    <div 
      className={styles.currentLineHighlight}
      style={{
        top: `${debugHighlight.currentLine * lineHeight}px`,
        height: `${lineHeight}px`
      }}
    />
    
    {/* Ghost values */}
    {Array.from(debugHighlight.ghostValues || []).map(([line, value]) => (
      <GhostValue
        key={line}
        line={line}
        value={value}
        lineHeight={lineHeight}
      />
    ))}
    
    {/* Branch indicators */}
    {debugHighlight.branchInfo?.map((branch, i) => (
      <BranchIndicator
        key={i}
        line={branch.line}
        taken={branch.taken}
        type={branch.type}
        lineHeight={lineHeight}
      />
    ))}
  </div>
)}
```

#### 2. New Components

**GhostValue Component:**

```tsx
// GhostValue.tsx
export interface GhostValueProps {
  line: number;
  value: any;
  lineHeight: number;
  type?: PrimitiveType;
}

export function GhostValue({ line, value, lineHeight, type }: GhostValueProps) {
  const formattedValue = formatGhostValue(value, type);
  
  return (
    <div 
      className={styles.ghostValue}
      style={{
        top: `${line * lineHeight}px`,
        height: `${lineHeight}px`
      }}
    >
      <span className={styles.ghostValueText}>
        {formattedValue}
      </span>
      <span className={styles.ghostValueType}>
        {type}
      </span>
    </div>
  );
}

function formatGhostValue(value: any, type?: PrimitiveType): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  
  switch (type) {
    case 'number':
      return typeof value === 'number' 
        ? value.toLocaleString(undefined, { maximumFractionDigits: 2 })
        : String(value);
    
    case 'string':
      return `"${String(value)}"`;
    
    case 'boolean':
      return String(value);
    
    case 'date':
      return String(value);
    
    default:
      return String(value);
  }
}
```

**BranchIndicator Component:**

```tsx
// BranchIndicator.tsx
export interface BranchIndicatorProps {
  line: number;
  taken: boolean;
  type: 'then' | 'elsif' | 'else';
  lineHeight: number;
}

export function BranchIndicator({ line, taken, type, lineHeight }: BranchIndicatorProps) {
  return (
    <div
      className={`${styles.branchIndicator} ${taken ? styles.taken : styles.skipped}`}
      style={{
        top: `${line * lineHeight}px`,
        height: `${lineHeight}px`
      }}
      title={`${type.toUpperCase()} branch ${taken ? 'executed' : 'skipped'}`}
    >
      <div className={styles.branchLine} />
      {taken && <div className={styles.branchArrow}>→</div>}
    </div>
  );
}
```

#### 3. Integration with Debug State

**Connect FormulaTestPanel to FormulaEditor:**

```tsx
// FormulaTestPanel.tsx
export function FormulaTestPanel({ 
  // ... existing props
  onDebugHighlight?: (highlight: DebugHighlight | null) => void 
}) {
  // ... existing code
  
  // Notify parent of debug highlight changes
  useEffect(() => {
    if (executionTrace && onDebugHighlight) {
      const currentStep = executionTrace.steps[debug.state.currentStep];
      
      if (currentStep) {
        const highlight: DebugHighlight = {
          currentLine: currentStep.location.line,
          currentColumn: currentStep.location.column,
          ghostValues: extractGhostValues(executionTrace, debug.state.currentStep),
          branchInfo: extractBranchInfo(executionTrace, debug.state.currentStep),
        };
        
        onDebugHighlight(highlight);
      } else {
        onDebugHighlight(null);
      }
    }
  }, [executionTrace, debug.state.currentStep, onDebugHighlight]);
}
```

**App.tsx Integration:**

```tsx
// App.tsx
export default function App() {
  const [debugHighlight, setDebugHighlight] = useState<DebugHighlight | null>(null);
  
  return (
    <div>
      {selectedEditorType === 'formula' && (
        <>
          <FormulaEditor
            value={formulaContent}
            onChange={setFormulaContent}
            debugHighlight={debugHighlight} // ✅ Pass debug state
          />
          
          {/* Sidebar with test panel */}
          <FormulaTestPanel
            formulaCode={formulaContent}
            onDebugHighlight={setDebugHighlight} // ✅ Receive debug state
          />
        </>
      )}
    </div>
  );
}
```

### CSS Styling

**Debug Overlay Styles:**

```css
/* FormulaEditor.module.css */

/* Debug overlay container */
.debugOverlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none; /* Allow clicks to pass through */
  z-index: 2; /* Above syntax highlighting, below cursor */
}

/* Current line highlight */
.currentLineHighlight {
  position: absolute;
  left: 0;
  right: 0;
  background: rgba(33, 150, 243, 0.15); /* Carbon Blue 60 at 15% */
  border-left: 3px solid var(--support-info); /* Blue accent */
  pointer-events: none;
  transition: top 240ms cubic-bezier(0.2, 0, 0.38, 0.9); /* Carbon motion */
}

/* Ghost value annotation */
.ghostValue {
  position: absolute;
  right: var(--spacing-05);
  display: flex;
  align-items: center;
  gap: var(--spacing-02);
  padding: 0 var(--spacing-03);
  background: var(--layer-01);
  border: 1px solid var(--border-subtle-01);
  border-radius: var(--radius-sm);
  font-family: var(--font-family-mono);
  font-size: 12px;
  line-height: 16px;
  color: var(--text-secondary);
  opacity: 0;
  animation: fadeInGhost 240ms cubic-bezier(0.2, 0, 0.38, 0.9) forwards;
}

@keyframes fadeInGhost {
  from {
    opacity: 0;
    transform: translateX(8px);
  }
  to {
    opacity: 0.9;
    transform: translateX(0);
  }
}

.ghostValueText {
  color: var(--text-primary);
  font-weight: 600;
}

.ghostValueType {
  color: var(--text-helper);
  font-size: 10px;
  text-transform: uppercase;
}

/* Branch indicators */
.branchIndicator {
  position: absolute;
  left: 0;
  width: 4px;
  pointer-events: none;
}

.branchIndicator.taken {
  background: var(--support-success); /* Green for executed */
}

.branchIndicator.skipped {
  background: var(--border-subtle-01); /* Gray for skipped */
  opacity: 0.3;
}

.branchArrow {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--support-success);
  font-size: 16px;
  font-weight: bold;
}

/* Dimmed text for skipped branches */
.debugOverlay ~ .highlightOverlay .skippedBranch {
  opacity: 0.4;
}
```

---

## Implementation Utilities

### Extract Ghost Values from Trace

```typescript
// utils/debugHighlighting.ts

/**
 * Extract ghost values (intermediate results) from execution trace
 * Shows the result of each expression on its line
 */
export function extractGhostValues(
  trace: ExecutionTrace,
  currentStep: number
): Map<number, any> {
  const ghostValues = new Map<number, any>();
  
  // Get all steps up to and including current step
  const executedSteps = trace.steps.slice(0, currentStep + 1);
  
  // For each line, show the most recent value
  for (const step of executedSteps) {
    const line = step.location.line;
    
    // Only show values for expressions (not blocks or statements)
    if (shouldShowGhostValue(step)) {
      ghostValues.set(line, {
        value: step.result,
        type: step.resultType
      });
    }
  }
  
  return ghostValues;
}

function shouldShowGhostValue(step: TraceStep): boolean {
  // Show values for:
  // - Binary operations (e.g., $a + $b → 150)
  // - Function calls (e.g., ROUND($x, 2) → 10.50)
  // - Variable references (e.g., $total → 1000)
  // - Literals (e.g., 100)
  
  // Don't show for:
  // - Assignments (already clear from code)
  // - IF blocks (condition result shown separately)
  // - Block expressions
  
  const showTypes: NodeType[] = [
    'BinaryOperation',
    'UnaryOperation',
    'FunctionCall',
    'Variable',
    'Literal'
  ];
  
  return showTypes.includes(step.nodeType);
}
```

### Extract Branch Information

```typescript
/**
 * Extract branch execution information from trace
 * Shows which IF/ELSIF/ELSE branches were taken
 */
export function extractBranchInfo(
  trace: ExecutionTrace,
  currentStep: number
): BranchHighlight[] {
  const branchInfo: BranchHighlight[] = [];
  
  // Get all IF expression steps
  const executedSteps = trace.steps.slice(0, currentStep + 1);
  const ifSteps = executedSteps.filter(s => s.nodeType === 'IfExpression');
  
  for (const ifStep of ifSteps) {
    if (ifStep.selectedBranch) {
      // Mark the taken branch
      branchInfo.push({
        line: ifStep.location.line,
        taken: true,
        type: ifStep.selectedBranch as 'then' | 'elsif' | 'else'
      });
      
      // Mark skipped branches
      // (This requires AST analysis to find other branches)
      // For now, we'll leave this as a TODO
    }
  }
  
  return branchInfo;
}
```

### Auto-scroll to Current Line

```typescript
/**
 * Scroll editor to show current execution line
 */
export function scrollToLine(
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  line: number,
  lineHeight: number
): void {
  if (!textareaRef.current) return;
  
  const lineTop = line * lineHeight;
  const viewportHeight = textareaRef.current.clientHeight;
  const scrollTop = textareaRef.current.scrollTop;
  
  // Check if line is outside viewport
  if (lineTop < scrollTop || lineTop > scrollTop + viewportHeight - lineHeight) {
    // Scroll to center the line
    textareaRef.current.scrollTop = lineTop - (viewportHeight / 2) + (lineHeight / 2);
  }
}
```

---

## Visual Examples

### Example 1: Current Line Highlight

```
┌────────────────────────────────────────┐
│ Formula Editor                         │
├────────────────────────────────────────┤
│  1  $revenue = 1000                    │
│  2  $discount = 0                      │
│  3                                     │
│→ 4  IF $revenue > 500 THEN             │ ← Blue highlight
│     ^^^^^^^^^^^^^^^^^^^                │
│  5    $discount = $revenue * 0.10      │
│  6  ELSIF $revenue > 100 THEN          │
│  7    $discount = $revenue * 0.05      │
│  8  END                                 │
└────────────────────────────────────────┘
```

### Example 2: Ghost Values

```
┌─────────────────────────────────────────────────────┐
│ Formula Editor                                      │
├─────────────────────────────────────────────────────┤
│  1  $price = 100                    │ 100 number    │ ← Ghost value
│  2  $quantity = 5                   │ 5 number      │
│  3                                                  │
│→ 4  $total = $price * $quantity     │ 500 number    │
│  5                                                  │
│  6  ROUND($total * 1.15, 2)         │ 575.00 number │
└─────────────────────────────────────────────────────┘
```

### Example 3: Branch Indicators

```
┌────────────────────────────────────────┐
│ Formula Editor                         │
├────────────────────────────────────────┤
│  1  $score = 850                       │
│  2                                     │
│  3  IF $score > 800 THEN               │
│▌ 4    "Excellent"              → ✓     │ ← Green bar (taken)
│  5  ELSIF $score > 600 THEN            │
│░ 6    "Good"                           │ ← Gray bar (skipped)
│  7  ELSE                                │
│░ 8    "Average"                        │ ← Gray bar (skipped)
│  9  END                                 │
└────────────────────────────────────────┘

Legend:
▌ = Green left border (branch taken)
░ = Gray border (branch skipped)
→ = Arrow indicator (current branch)
```

---

## Files to Create/Modify

### New Files

1. `/components/editors/code/FormulaEditor/GhostValue.tsx`
2. `/components/editors/code/FormulaEditor/GhostValue.module.css`
3. `/components/editors/code/FormulaEditor/BranchIndicator.tsx`
4. `/components/editors/code/FormulaEditor/BranchIndicator.module.css`
5. `/utils/debugHighlighting.ts`

### Modified Files

1. `/components/editors/code/FormulaEditor/FormulaEditor.tsx` - Add debug overlay layer
2. `/components/editors/code/FormulaEditor/FormulaEditor.module.css` - Add debug styles
3. `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx` - Connect to editor
4. `/App.tsx` - Wire up debug state between components

---

## Implementation Steps

### Step 1: Create Debug Highlighting Utilities
- `utils/debugHighlighting.ts`
- `extractGhostValues()`
- `extractBranchInfo()`
- `scrollToLine()`

### Step 2: Create GhostValue Component
- Component with line-based positioning
- Format value based on type
- Fade-in animation
- Tooltip with detailed value

### Step 3: Create BranchIndicator Component
- Left border indicator
- Color-coded by taken/skipped
- Arrow for taken branches
- Tooltip with branch type

### Step 4: Add Debug Overlay to FormulaEditor
- New overlay layer in render
- Current line highlight
- Render ghost values
- Render branch indicators
- Auto-scroll to current line

### Step 5: Connect FormulaTestPanel to Editor
- `onDebugHighlight` callback prop
- Extract highlight data from trace
- Update on step change
- Clear on debug mode exit

### Step 6: Wire Up in App.tsx
- State for debug highlight
- Pass to FormulaEditor
- Pass callback to FormulaTestPanel
- Handle state updates

---

## Edge Cases

### Multiple Expressions on Same Line

```
IF $a > 10 AND $b < 20 THEN
    ^^^^^^^     ^^^^^^^
    result 1    result 2
```

**Solution:** Show only the final result for the line, or show multiple ghost values stacked.

### Very Long Values

```
$description = "This is a very long string that would overflow..."
```

**Solution:** Truncate with ellipsis, show full value in tooltip.

### Nested Expressions

```
ROUND(($price * $quantity) * 1.15, 2)
       ^^^^^^^^^^^^^^^^^ step 1
      ^^^^^^^^^^^^^^^^^^^^^^^ step 2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ step 3
```

**Solution:** Show ghost value for outermost expression only, or show progression on hover.

---

## Performance Considerations

### Overlay Rendering

- Use absolute positioning for ghost values (no reflow)
- CSS transforms for animations (GPU accelerated)
- Debounce step changes during playback
- Only render visible lines (virtualization)

### Memory

- Ghost values map can get large for long formulas
- Clear map when debug mode exits
- Limit to last N steps if needed

### Auto-scroll

- Throttle scroll calls during fast playback
- Use `requestAnimationFrame` for smooth scrolling

---

## Testing Strategy

### Manual Testing

1. **Current Line Highlight**
   - Open debugger, step through formula
   - Verify highlight moves to correct line
   - Check highlight stays visible during auto-scroll

2. **Ghost Values**
   - Step through formula with calculations
   - Verify values appear next to expressions
   - Check formatting for different types
   - Hover to see detailed tooltip

3. **Branch Indicators**
   - Formula with IF/ELSIF/ELSE
   - Verify taken branches show green bar
   - Verify skipped branches are gray
   - Check nested IFs show hierarchy

4. **Auto-scroll**
   - Long formula (20+ lines)
   - Play debugger at normal speed
   - Verify editor scrolls to keep current line visible

### Edge Cases

- Empty lines (no ghost value)
- Multi-line expressions
- Deeply nested IFs
- Very long formulas (100+ lines)
- Very fast playback speed

---

## Success Criteria

- [ ] Current line highlights correctly during step-through
- [ ] Ghost values show intermediate results inline
- [ ] Branch indicators show taken/skipped paths
- [ ] Editor auto-scrolls to keep current line visible
- [ ] Animations are smooth (240ms Carbon timing)
- [ ] No performance issues during playback
- [ ] Ghost values formatted correctly for all types
- [ ] Tooltips show detailed information on hover
- [ ] Works with all playback speeds
- [ ] Clears correctly when debug mode exits

---

## Future Enhancements (Phase 4+)

1. **Interactive Ghost Values**
   - Click to inspect value details
   - Show type information
   - Show variable history

2. **Execution Path Trail**
   - Visual line connecting executed steps
   - Animated flow during playback
   - Color-coded by step type

3. **Variable Change Indicators**
   - Highlight when variable changes
   - Show old → new value transition
   - Flash animation on change

4. **Performance Metrics**
   - Show execution time per step
   - Identify slow operations
   - Performance warnings

---

## Related Documents

- [EPIC: Formula Evaluation Debugger](./EPIC-FormulaEvaluationDebugger.md)
- [v16 - Formula Debugger Phase 1](./25-10-25_v16-FormulaDebuggerPhase1.md)
- [v18 - Formula Debugger Phase 2 Complete](./25-10-25_v18-FormulaDebuggerPhase2Complete.md)

---

## Notes

This phase transforms the debugger from a data inspector to a visual execution tracer. The combination of line highlighting, ghost values, and branch indicators makes it easy to understand exactly how a formula executes step-by-step.

Key design principle: **Non-intrusive** - Debug overlays should not interfere with code editing or syntax highlighting. They layer on top and disappear when not in debug mode.
