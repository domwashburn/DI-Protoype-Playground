# v03 - Debug Output Column Implementation Plan

**Date:** October 29, 2025  
**Type:** Feature Enhancement - Formula Editor  
**Status:** 📋 Planning Phase  
**Priority:** 🟢 Enhancement (Post-Recovery)

---

## Summary

This document provides a comprehensive plan for implementing a **Debug Output Column** in the Formula Editor - a resizable side rail on the right edge that displays real-time variable values during debugger execution. This feature will significantly improve the debugging experience by showing computed values inline with the formula code.

**Key Requirements:**
- Side rail positioned on right edge of formula editor
- Similar visual treatment to error/warning/line number columns
- Resizable via hover interaction on left edge (between editor content and debug column)
- Max width: 50px (expandable via resize)
- Single-line output per row, right-justified text
- Text clamped/truncated for now (wrapping deferred to future phase)
- Only visible during active debugging session

---

## Table of Contents

1. [Feature Overview](#feature-overview)
2. [Visual Design](#visual-design)
3. [Technical Architecture](#technical-architecture)
4. [Implementation Phases](#implementation-phases)
5. [Component Specifications](#component-specifications)
6. [Integration Points](#integration-points)
7. [Future Enhancements](#future-enhancements)
8. [Success Criteria](#success-criteria)

---

## Feature Overview

### User Story

**As a** formula developer  
**I want to** see computed variable values displayed inline next to my formula code during debugging  
**So that** I can quickly understand what values are being calculated at each step without having to look away from the code

### Current State

The Formula Editor debugger currently displays variable values in:
1. **DebugVariableInspector** - Panel below the editor showing all variables in current scope
2. **GhostValue** - Inline overlay showing values next to variables in the code

**Problems with Current Approach:**
- DebugVariableInspector is far from the code (requires eye movement away from editor)
- GhostValue shows individual variable values but not line-level computed results
- No way to see "what did this line evaluate to?" at a glance
- Hard to spot where values change during step-through

### Proposed Solution

Add a **Debug Output Column** as a side rail on the right edge of the editor:

```
┌─────────┬──────────────────────────────────────┬─────────────────┐
│ Gutter  │ Line Numbers │ Formula Content       │ Debug Output    │
├─────────┼──────────────┼───────────────────────┼─────────────────┤
│    ⚠️   │      1       │ $price = 100          │          100    │
│         │      2       │ $tax = $price * 0.08  │          8.0    │
│    ❌   │      3       │ $total = $price + ... │        108.0    │
│         │      4       │ IF $total > 50 THEN   │         true    │
│         │      5       │   $discount = 10      │           10    │
│         │      6       │ END                   │                 │
└─────────┴──────────────┴───────────────────────┴─────────────────┘
          ↑                                       ↑
     Error/Warning                          Debug Output
        Icons                                  Column
                                          (Right-justified,
                                           single-line,
                                           resizable)
```

**Benefits:**
- See line-by-line evaluation results without looking away from code
- Quickly identify where unexpected values occur
- Natural reading flow: code → result
- Familiar pattern (similar to IDE debuggers like VS Code, IntelliJ)
- Minimal visual noise when not debugging (column hidden)

---

## Visual Design

### Layout Structure

The Formula Editor will use a **5-column grid layout** when debugger is active:

```css
.editorContainer {
  display: grid;
  grid-template-columns: 
    auto          /* Gutter (error/warning icons) - conditional */
    auto          /* Line numbers - always visible */
    1fr           /* Editor content - flexible */
    var(--resize-handle-width)  /* Resize handle - 8px */
    var(--debug-output-width);  /* Debug output - resizable, 50px-200px */
}
```

When debugger is **inactive**, the layout collapses to current 3-column structure:
```css
.editorContainer {
  grid-template-columns: 
    auto   /* Gutter - if errors exist */
    auto   /* Line numbers */
    1fr;   /* Editor content */
}
```

### Debug Output Column Specifications

**Visual Treatment:**
- Background: `var(--background-secondary)` (slightly darker than editor background)
- Border left: `1px solid var(--border-subtle)` (subtle separator from resize handle)
- Font: IBM Plex Mono (monospaced, same as editor)
- Font size: `var(--editor-font-size)` (14px, matches editor)
- Line height: `var(--editor-line-height)` (1.6, matches editor)
- Text alignment: Right-justified
- Text color: `var(--text-secondary)` (subtle, non-intrusive)
- Padding: `0 var(--spacing-03)` (8px horizontal padding)

**Sizing:**
- Default width: 50px (just enough for typical numbers)
- Minimum width: 30px (prevent collapse to unusable)
- Maximum width: 200px (prevent taking over too much space)
- Height: Syncs with line heights (same as line number column)

**Text Overflow Handling:**
- Single line per row (no wrapping)
- Text clipped with ellipsis: `text-overflow: ellipsis`
- Overflow hidden: `overflow: hidden`
- White space: `white-space: nowrap`
- Future: Tooltip on hover showing full value
- Future: Click to expand to see formatted/wrapped value

### Resize Handle

**Visual Treatment:**
- Width: 8px (comfortable hover target)
- Background: Transparent (invisible when not hovered)
- Background on hover: `var(--background-hover)` (subtle visual feedback)
- Border right: `1px solid var(--border-subtle)` (appears on hover)
- Cursor: `col-resize` (indicates resizable)
- Transition: Background and border fade in/out on hover

**Interaction:**
- Hover over left edge of debug output column
- Cursor changes to resize cursor (`↔`)
- Click and drag left/right to adjust width
- Width constrained to min/max bounds
- Width persists in local state (not saved across sessions initially)

**Implementation Pattern:**
Similar to Carbon's resizable panels - uses mouse down/move/up events with boundary clamping.

### Value Display Formatting

**Type-Based Formatting:**

| Type    | Display Example       | Color                    | Notes                    |
|---------|-----------------------|--------------------------|--------------------------|
| Number  | `100`                 | `var(--text-secondary)`  | No quotes                |
| String  | `"hello"`             | `var(--syntax-string)`   | Quoted                   |
| Boolean | `true` / `false`      | `var(--syntax-keyword)`  | Lowercase                |
| Date    | `2024-10-29`          | `var(--text-secondary)`  | ISO format               |
| Time    | `14:30:00`            | `var(--text-secondary)`  | HH:MM:SS                 |
| Null    | `null`                | `var(--text-disabled)`   | Italic                   |
| Error   | `[Error]`             | `var(--cds-support-error)` | Red, italic            |
| None    | (empty)               | N/A                      | No value for this line   |

**Truncation Examples:**

```
Width: 50px
─────────────────
100           ← Fits comfortably
"A very l...  ← Truncated with ellipsis
true          ← Boolean fits
[1, 2, 3...   ← Array truncated
```

---

## Technical Architecture

### Component Structure

**New Components:**

1. **`DebugOutputColumn.tsx`** - Main column component
   ```tsx
   interface DebugOutputColumnProps {
     lineHeights: LineHeight[];      // Sync with line number heights
     debugValues: DebugLineValue[];  // Values to display per line
     width: number;                  // Current column width
     onWidthChange: (width: number) => void;
   }
   ```

2. **`ResizeHandle.tsx`** - Draggable resize handle
   ```tsx
   interface ResizeHandleProps {
     onResize: (deltaX: number) => void;
     orientation: 'vertical' | 'horizontal';  // 'vertical' for column resize
     minWidth: number;
     maxWidth: number;
   }
   ```

**Modified Components:**

1. **`FormulaEditor.tsx`**
   - Add state for debug output width: `const [debugOutputWidth, setDebugOutputWidth] = useState(50)`
   - Add grid column to layout when debugger active
   - Pass debug line values to `DebugOutputColumn`
   - Wire up resize handlers

2. **`FormulaEditor.module.css`**
   - Add 5-column grid layout (conditional on debugger active)
   - Add `.debugOutputColumn` styles
   - Add `.debugResizeHandle` styles
   - Add responsive collapse behavior

3. **`useDebugger.ts`**
   - Add `getLineOutputValues()` method
   - Returns array of `DebugLineValue[]` for current step
   - Extracts computed values from trace execution

### Data Flow

```
TracingEvaluator
      ↓
  ExecutionTracer
      ↓
  ExecutionTrace (current step)
      ↓
  useDebugger.getLineOutputValues()
      ↓
  FormulaEditor (state: debugLineValues)
      ↓
  DebugOutputColumn (render values)
```

**DebugLineValue Interface:**
```typescript
interface DebugLineValue {
  lineNumber: number;
  value: any;              // Computed result for this line
  type: ValueType;         // 'number' | 'string' | 'boolean' | 'date' | 'time' | 'array' | 'object' | 'null' | 'error'
  displayText: string;     // Pre-formatted display string
  fullText?: string;       // Full untruncated value (for tooltip/expansion)
  hasError?: boolean;      // True if this line threw an error
}
```

### Integration with Existing Debugger

**useDebugger Hook Extension:**

```typescript
export function useDebugger(/* existing params */) {
  // ... existing code ...

  /**
   * Get output values for each line based on current execution trace
   * Returns array with entries for lines that produced values
   */
  const getLineOutputValues = useCallback((): DebugLineValue[] => {
    if (!executionTrace || currentStepIndex < 0) return [];

    const lineValues: DebugLineValue[] = [];
    const currentTrace = executionTrace.steps[currentStepIndex];

    // Build map of line number → computed value from trace
    for (const step of executionTrace.steps.slice(0, currentStepIndex + 1)) {
      if (step.line && step.result !== undefined) {
        lineValues.push({
          lineNumber: step.line,
          value: step.result,
          type: inferType(step.result),
          displayText: formatDebugValue(step.result),
          fullText: formatDebugValueFull(step.result),
          hasError: step.error !== undefined
        });
      }
    }

    return lineValues;
  }, [executionTrace, currentStepIndex]);

  return {
    // ... existing return values ...
    getLineOutputValues
  };
}
```

**Helper Functions:**

```typescript
/**
 * Infer the type of a runtime value
 */
function inferType(value: any): ValueType {
  if (value === null || value === undefined) return 'null';
  if (value instanceof Date) return 'date';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') return isTimeString(value) ? 'time' : 'string';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object') return 'object';
  return 'unknown';
}

/**
 * Format value for compact display in debug column
 */
function formatDebugValue(value: any): string {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return `"${value}"`;
  if (value instanceof Date) return value.toISOString().split('T')[0];
  if (Array.isArray(value)) return `[${value.slice(0, 3).join(', ')}${value.length > 3 ? '...' : ''}]`;
  if (typeof value === 'object') return '{...}';
  return String(value);
}

/**
 * Format value with full detail (for tooltip/expansion)
 */
function formatDebugValueFull(value: any): string {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return `"${value}"`;
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return JSON.stringify(value, null, 2);
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  return String(value);
}
```

---

## Implementation Phases

### Phase 1: Foundation (Session 1)

**Goal:** Add basic debug output column without resize functionality

**Tasks:**
1. Create `DebugOutputColumn.tsx` component
   - Render single column with line-synced height
   - Accept `debugValues` prop
   - Render right-justified text per line
   - Apply text truncation CSS

2. Extend `useDebugger.ts`
   - Add `getLineOutputValues()` method
   - Implement `inferType()` helper
   - Implement `formatDebugValue()` helper
   - Wire up to execution trace

3. Update `FormulaEditor.tsx`
   - Add conditional rendering of debug column
   - Only show when `debugHighlight` is active
   - Add to grid layout
   - Pass line heights and debug values

4. Update `FormulaEditor.module.css`
   - Add 4-column grid (no resize handle yet)
   - Style `.debugOutputColumn`
   - Style `.debugOutputCell`
   - Match line height sync pattern from line numbers

**Acceptance Criteria:**
- [ ] Debug column appears when debugger is active
- [ ] Debug column hidden when debugger inactive
- [ ] Line heights sync with editor content
- [ ] Values display right-justified
- [ ] Long values truncate with ellipsis
- [ ] Column uses consistent styling (background, border, font)
- [ ] No layout shifts when column appears/disappears
- [ ] Test with various formula samples (numbers, strings, booleans)

**Deliverable:** Basic debug output column functioning (non-resizable)

---

### Phase 2: Resize Functionality (Session 2)

**Goal:** Add interactive resize handle

**Tasks:**
1. Create `ResizeHandle.tsx` component
   - Render 8px vertical bar between editor and debug column
   - Implement hover state (cursor change, visual feedback)
   - Implement drag interaction (mousedown → mousemove → mouseup)
   - Emit resize events with delta X
   - Clamp to min/max width boundaries

2. Update `FormulaEditor.tsx`
   - Add `debugOutputWidth` state (default: 50px, min: 30px, max: 200px)
   - Add resize handle to grid layout (5 columns now)
   - Wire up `onResize` handler
   - Persist width in component state
   - Apply width to debug column via CSS variable

3. Update `FormulaEditor.module.css`
   - Update to 5-column grid layout
   - Add `.debugResizeHandle` styles
   - Add hover states
   - Add transition effects
   - Update debug column to use `var(--debug-output-width)`

4. Add visual feedback
   - Resize handle highlights on hover
   - Border appears on hover
   - Cursor changes to `col-resize`
   - Smooth width transition during drag

**Acceptance Criteria:**
- [ ] Resize handle appears between editor content and debug column
- [ ] Handle shows hover state (background, border, cursor)
- [ ] Click and drag adjusts column width smoothly
- [ ] Width clamped to min (30px) and max (200px)
- [ ] Width persists during debugging session
- [ ] No layout jank during resize
- [ ] Resize doesn't break line height sync
- [ ] Works with keyboard focus in editor (doesn't steal focus)

**Deliverable:** Fully interactive resizable debug output column

---

### Phase 3: Polish & Edge Cases (Session 3)

**Goal:** Handle edge cases and improve UX

**Tasks:**
1. **Value Formatting Edge Cases**
   - Test with null/undefined values
   - Test with very long strings
   - Test with nested arrays/objects
   - Test with error states
   - Test with mixed types

2. **Layout Edge Cases**
   - Test with very short formulas (1-2 lines)
   - Test with very long formulas (50+ lines)
   - Test with wrapped lines (ensure values align with first line of wrap)
   - Test with scroll behavior (column scrolls with editor)
   - Test with error/warning gutter visible

3. **Performance**
   - Ensure no lag when stepping through 50+ step traces
   - Optimize re-renders (memoization)
   - Debounce resize if needed

4. **Accessibility**
   - Resize handle keyboard accessible (future enhancement)
   - Screen reader announcements (future enhancement)
   - Focus management doesn't break

5. **Documentation**
   - Add JSDoc comments to new components
   - Update FormulaEditor README
   - Add to Formula Editor feature list
   - Document resize interaction pattern

**Acceptance Criteria:**
- [ ] All value types display correctly
- [ ] No console errors or warnings
- [ ] Smooth performance with large traces
- [ ] Layout stable across all scenarios
- [ ] Code is well-documented
- [ ] No accessibility regressions

**Deliverable:** Production-ready debug output column

---

## Component Specifications

### DebugOutputColumn Component

**File:** `/components/editors/code/FormulaEditor/DebugOutputColumn.tsx`

```typescript
import React from 'react';
import styles from './DebugOutputColumn.module.css';

export interface DebugLineValue {
  lineNumber: number;
  value: any;
  type: 'number' | 'string' | 'boolean' | 'date' | 'time' | 'array' | 'object' | 'null' | 'error';
  displayText: string;
  fullText?: string;
  hasError?: boolean;
}

export interface LineHeight {
  lineNumber: number;
  height: number;
}

export interface DebugOutputColumnProps {
  lineNumbers: number[];           // Array of line numbers (e.g., [1, 2, 3, ...])
  lineHeights: LineHeight[];       // Measured heights for wrapped lines
  debugValues: DebugLineValue[];   // Values to display
  width: number;                   // Column width in pixels
}

export function DebugOutputColumn({
  lineNumbers,
  lineHeights,
  debugValues,
  width
}: DebugOutputColumnProps) {
  // Create lookup map for quick value access
  const valueMap = React.useMemo(() => {
    const map = new Map<number, DebugLineValue>();
    debugValues.forEach(v => map.set(v.lineNumber, v));
    return map;
  }, [debugValues]);

  return (
    <div 
      className={styles.debugOutputColumn}
      style={{ width: `${width}px` }}
      aria-label="Debug output values"
    >
      {lineNumbers.map(lineNumber => {
        // Get measured height for this line (for wrapped lines)
        const lineHeight = lineHeights.find(lh => lh.lineNumber === lineNumber);
        const heightStyle = lineHeight ? { minHeight: `${lineHeight.height}px` } : {};

        // Get debug value for this line (if any)
        const debugValue = valueMap.get(lineNumber);

        return (
          <div
            key={lineNumber}
            className={`${styles.debugOutputCell} ${debugValue?.hasError ? styles.error : ''}`}
            style={heightStyle}
            title={debugValue?.fullText} // Tooltip shows full value
          >
            {debugValue?.displayText || ''}
          </div>
        );
      })}
    </div>
  );
}
```

**CSS File:** `/components/editors/code/FormulaEditor/DebugOutputColumn.module.css`

```css
.debugOutputColumn {
  background: var(--background-secondary);
  border-left: 1px solid var(--border-subtle);
  overflow: hidden;
  user-select: none;
  font-family: 'IBM Plex Mono', 'Courier New', monospace;
  font-size: var(--editor-font-size);
  padding: var(--editor-padding) 0;
}

.debugOutputCell {
  line-height: var(--editor-line-height);
  min-height: calc(var(--editor-font-size) * var(--editor-line-height));
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end; /* Right-justify */
  padding: 2px var(--spacing-03) 0 var(--spacing-02);
  
  /* Text overflow handling */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  color: var(--text-secondary);
}

.debugOutputCell.error {
  color: var(--cds-support-error);
  font-style: italic;
}
```

---

### ResizeHandle Component

**File:** `/components/editors/code/FormulaEditor/ResizeHandle.tsx`

```typescript
import React, { useCallback, useRef, useState } from 'react';
import styles from './ResizeHandle.module.css';

export interface ResizeHandleProps {
  onResize: (deltaX: number) => void;
  minWidth: number;
  maxWidth: number;
}

export function ResizeHandle({ onResize, minWidth, maxWidth }: ResizeHandleProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number>(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartX.current = e.clientX;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - dragStartX.current;
      dragStartX.current = moveEvent.clientX;
      onResize(-deltaX); // Negative because dragging left increases width
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [onResize]);

  return (
    <div
      className={`${styles.resizeHandle} ${isDragging ? styles.dragging : ''}`}
      onMouseDown={handleMouseDown}
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize debug output column"
    />
  );
}
```

**CSS File:** `/components/editors/code/FormulaEditor/ResizeHandle.module.css`

```css
.resizeHandle {
  width: 8px;
  cursor: col-resize;
  background: transparent;
  border-right: 1px solid transparent;
  transition: background 150ms ease, border-color 150ms ease;
  position: relative;
  user-select: none;
}

.resizeHandle:hover,
.resizeHandle.dragging {
  background: var(--background-hover);
  border-right-color: var(--border-subtle);
}

.resizeHandle.dragging {
  background: var(--background-active);
}

/* Visual indicator on hover */
.resizeHandle::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3px;
  height: 24px;
  background: var(--border-subtle);
  border-radius: 2px;
  opacity: 0;
  transition: opacity 150ms ease;
}

.resizeHandle:hover::before,
.resizeHandle.dragging::before {
  opacity: 1;
}
```

---

## Integration Points

### FormulaEditor.tsx Changes

**State Additions:**
```typescript
// Debug output column state
const [debugOutputWidth, setDebugOutputWidth] = useState(50); // Default 50px

// Resize handler
const handleDebugOutputResize = useCallback((deltaX: number) => {
  setDebugOutputWidth(prev => {
    const newWidth = prev + deltaX;
    return Math.max(30, Math.min(200, newWidth)); // Clamp to min/max
  });
}, []);
```

**Grid Layout Update:**
```typescript
// In JSX, update editorContainer grid columns
<div 
  className={`${styles.editorContainer} ${isFocused ? styles.focused : ''}`}
  style={{
    gridTemplateColumns: debugHighlight 
      ? `${lineIssues.length > 0 ? 'auto' : ''} auto 1fr 8px ${debugOutputWidth}px`
      : `${lineIssues.length > 0 ? 'auto' : ''} auto 1fr`
  }}
>
  {/* Existing gutter */}
  {/* Existing line numbers */}
  {/* Existing editor content */}
  
  {/* NEW: Resize handle (only when debugging) */}
  {debugHighlight && (
    <ResizeHandle
      onResize={handleDebugOutputResize}
      minWidth={30}
      maxWidth={200}
    />
  )}
  
  {/* NEW: Debug output column (only when debugging) */}
  {debugHighlight && (
    <DebugOutputColumn
      lineNumbers={lineNumbers}
      lineHeights={lineHeights}
      debugValues={debugger.getLineOutputValues()}
      width={debugOutputWidth}
    />
  )}
</div>
```

---

## Future Enhancements

### Phase 4 (Future): Value Expansion

**Feature:** Click value to see formatted/expanded view

**Implementation:**
- Add click handler to debug output cells
- Show popover/tooltip with formatted JSON
- Syntax highlighted JSON for objects/arrays
- Copy to clipboard button

**Example:**
```
Click on: "[1, 2, 3..."

Popover shows:
┌─────────────────────┐
│ Array (5 items)     │
│ [                   │
│   1,                │
│   2,                │
│   3,                │
│   4,                │
│   5                 │
│ ]                   │
│ [Copy] [Close]      │
└─────────────────────┘
```

---

### Phase 5 (Future): Multi-line Value Display

**Feature:** Allow debug column to show wrapped values for complex types

**Implementation:**
- Add toggle button in debug controls: "Wrap debug values"
- When enabled, debug output cells can grow vertically
- Show formatted arrays/objects across multiple lines
- Syntax highlighting for complex values

**Example:**
```
Line 5: [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
]
```

---

### Phase 6 (Future): Value History

**Feature:** Show value changes over time (previous → current)

**Implementation:**
- Track value history per line
- Show diff when value changes
- Visual indicator (color flash) when value updates

**Example:**
```
Line 3: 100 → 150  (increased)
        ^green highlight^
```

---

### Phase 7 (Future): Persistent Width Preference

**Feature:** Remember debug column width across sessions

**Implementation:**
- Save to localStorage: `formulaEditor.debugOutputWidth`
- Load on mount
- Reset to default option

---

## Success Criteria

### Must Have (Phase 1 + 2)
- [x] Debug output column appears only during active debugging
- [x] Values display right-justified and single-line
- [x] Line heights sync with editor content (including wrapped lines)
- [x] Column is resizable via drag handle
- [x] Width constrained to 30px-200px range
- [x] Long values truncate with ellipsis
- [x] All common types display correctly (number, string, boolean, date, time)
- [x] No layout regressions or visual glitches
- [x] Smooth resize interaction with visual feedback

### Should Have (Phase 3)
- [x] Tooltips show full value on hover
- [x] Error values display in red with distinct styling
- [x] Null/undefined values display appropriately
- [x] Arrays and objects show abbreviated preview
- [x] Performance is smooth with large execution traces
- [x] Code is well-documented

### Nice to Have (Future Phases)
- [ ] Click to expand value with syntax highlighting
- [ ] Multi-line value display option
- [ ] Value change history/diff view
- [ ] Persistent width preference
- [ ] Keyboard navigation for resize handle

---

## Timeline Estimate

**Phase 1:** 1-2 hours (foundation, basic rendering)  
**Phase 2:** 1-2 hours (resize interaction)  
**Phase 3:** 1 hour (polish, edge cases, documentation)  

**Total:** 3-5 hours of focused development

---

## Dependencies

**Prerequisites:**
- ✅ Line height measurement system (`useLineHeights`) - Already implemented
- ✅ Debug highlighting system - Already implemented  
- ✅ ExecutionTracer/TracingEvaluator - Already implemented
- ✅ useDebugger hook - Already implemented

**Blockers:**
- None - all required infrastructure is in place

**Related:**
- TD-001 (Ghost Value Formatting) - Similar value display concerns, but independent
- CRIT-002 (Error/Warning gutter) - Similar column pattern, good reference

---

## Notes

**Design Decisions:**

1. **Right-side placement:** Matches natural reading flow (code → result), doesn't interfere with error gutter on left
2. **Single-line only (Phase 1-2):** Keeps visual noise low, easier to scan, prevents column from dominating screen
3. **Resizable:** Users have different needs (some want compact, some want detail)
4. **Only during debugging:** Doesn't clutter interface when not needed
5. **Right-justified:** Creates visual column alignment, easier to compare values
6. **Max 200px:** Prevents debug column from taking over too much horizontal space

**Inspiration:**
- VS Code debugger inline values
- IntelliJ IDEA inline watch expressions
- Chrome DevTools debugger value inspection

---

**Last Updated:** October 29, 2025  
**Next Review:** After Phase 1 implementation  
**Implementation Target:** Post-Recovery (after CRIT-000 through CRIT-003 resolved)
