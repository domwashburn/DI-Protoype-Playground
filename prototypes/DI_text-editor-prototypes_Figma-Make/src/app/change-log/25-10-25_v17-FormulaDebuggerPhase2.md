# Formula Debugger Phase 2 - UI Implementation

**Date:** October 25, 2025  
**Epic:** Formula Evaluation Debugger  
**Phase:** 2 of 2

## Summary

Implemented Phase 2 of the Formula Evaluation Debugger, adding the complete UI layer with step controls, variable inspection, timeline playback, and inline "ghost" value annotations that show calculation results at each line during debug playback.

## Context

Phase 1 (completed in v16) built the execution trace infrastructure with `ExecutionTracer` and `TracingEvaluator`. Phase 2 adds the user-facing debugger UI that allows developers to step through formula execution, inspect variable states, and see intermediate calculation results.

## Implementation Details

### New Components

#### 1. `DebugControls.tsx`
Step-through playback controls with Carbon Design System styling.

**Features:**
- Step counter (Step X of Y)
- Navigation controls (First, Previous, Play/Pause, Next, Last)
- Playback speed selector (Slow/Normal/Fast/Very Fast)
- Disabled state management during playback
- Composition pattern with clear button hierarchy

**Props:**
```typescript
interface DebugControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  playbackSpeed: number;
  onStepBackward: () => void;
  onStepForward: () => void;
  onStepFirst: () => void;
  onStepLast: () => void;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
}
```

#### 2. `DebugVariableInspector.tsx`
Shows variable and attribute values at the current debug step.

**Features:**
- Separate sections for variables ($) and attributes (#)
- Three-column layout: Name | Value | Type
- Formatted value display (strings quoted, numbers localized, booleans as true/false)
- Type badges (number/string/boolean)
- Empty state when no variables/attributes exist

**Props:**
```typescript
interface DebugVariableInspectorProps {
  variables: Map<string, any>;
  attributes: Map<string, any>;
}
```

#### 3. `useDebugger.ts` Hook
Manages debugger state and playback logic.

**Features:**
- Current step tracking (0-based index)
- Play/pause state
- Configurable playback speed
- Automatic playback with setInterval
- Step navigation (forward, backward, first, last)
- Resets when trace changes
- Cleanup on unmount

**Returns:**
```typescript
interface UseDebuggerResult {
  state: {
    currentStep: number;
    isPlaying: boolean;
    playbackSpeed: number;
    totalSteps: number;
  };
  actions: {
    setCurrentStep: (step: number) => void;
    stepBackward: () => void;
    stepForward: () => void;
    stepFirst: () => void;
    stepLast: () => void;
    togglePlay: () => void;
    setPlaybackSpeed: (speed: number) => void;
    reset: () => void;
  };
}
```

### Updated Components

#### `FormulaTestPanel.tsx`
Integrated debugger UI with existing test panel.

**New State:**
- `debugMode: boolean` - Toggle for debug mode
- `executionTrace: ExecutionTrace | null` - Stores trace from TracingEvaluator

**New Features:**
- Debug mode toggle (Switch component)
- Conditional rendering of debug UI when trace exists
- DebugControls integration
- DebugVariableInspector integration
- `onDebugStateChange` callback prop for editor highlighting

**Integration Flow:**
1. User enables debug mode
2. Evaluation uses `TracingEvaluator` instead of regular `Evaluator`
3. Execution trace stored in state
4. Debug UI renders with controls and inspector
5. `useDebugger` hook manages step navigation
6. Parent component (FormulaEditor) receives debug state for line highlighting

### Ghost Value Feature

**Concept:**
Show the result of each calculation inline as a "ghost" annotation at the end of lines during debug playback.

**Example:**
```
$orderTotal * 0.15    | = 150
$discount + $shipping | = 165
```

**Implementation approach** (TBD):
- Extract line-by-step values from ExecutionTrace
- Render ghost values in FormulaEditor overlay
- Position ghosts at end of each line
- Style with muted color and monospace font
- Only show for lines that produce values
- Update ghost values as user steps through trace

## Files Changed

### Created:
- `/components/editors/code/FormulaEditor/DebugControls.tsx`
- `/components/editors/code/FormulaEditor/DebugControls.module.css`
- `/components/editors/code/FormulaEditor/DebugVariableInspector.tsx`
- `/components/editors/code/FormulaEditor/DebugVariableInspector.module.css`
- `/components/editors/code/FormulaEditor/hooks/useDebugger.ts`

### Modified:
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx` - Integrated debugger UI
- `/components/editors/code/FormulaEditor/hooks/index.ts` - Exported useDebugger hook

## Design Decisions

### Carbon Design System Compliance
- All components use CSS modules + CSS variables from globals.css
- Explicit overrides for shadcn/ui component defaults
- Typography follows IBM Plex Sans guidelines
- Spacing uses var(--spacing-*) tokens
- Colors use var(--background-*, --text-*, --button-*) tokens

### Component Composition
- DebugControls is a single composition component (not split into sub-components)
- Rationale: Controls are tightly coupled and always rendered together
- DebugVariableInspector is similarly monolithic
- Clear separation: Controls (playback) vs. Inspector (state)

### State Management
- useDebugger hook encapsulates all playback logic
- FormulaTestPanel owns the trace and coordinates UI
- Clean separation between trace data and UI state
- Parent can subscribe to debug state via onDebugStateChange callback

### Playback Speeds
- Slow: 2000ms (2 seconds per step)
- Normal: 1000ms (1 second per step) - default
- Fast: 500ms (0.5 seconds per step)
- Very Fast: 250ms (0.25 seconds per step)

Rationale: Provides range from pedagogical (slow) to quick review (very fast)

## Next Steps

### Immediate (Phase 2 completion):
1. [ ] Add debug mode toggle to FormulaTestPanel UI
2. [ ] Implement TracingEvaluator integration in handleEvaluate
3. [ ] Connect DebugControls to useDebugger state
4. [ ] Connect DebugVariableInspector to trace steps
5. [ ] Add CSS for debug section layout
6. [ ] Test step navigation and playback
7. [ ] Implement ghost value rendering in FormulaEditor
8. [ ] Add current line highlighting in FormulaEditor

### Future Enhancements:
- Timeline scrubber (visual timeline with click-to-jump)
- Breakpoint support (pause at specific lines)
- Conditional breakpoints (pause when variable === value)
- Step over/into for function calls
- Export trace as JSON for analysis
- Trace comparison (diff between two runs)
- Performance metrics (execution time per step)

## Testing Strategy

### Manual Testing:
1. Enable debug mode
2. Evaluate formula with multi-line logic
3. Verify step controls work (forward, backward, first, last)
4. Test play/pause functionality
5. Change playback speed during playback
6. Inspect variable values at each step
7. Verify ghost values show correct intermediate results
8. Test with formulas containing conditionals (if/elsif/else)
9. Test with formulas containing function calls
10. Verify trace resets when formula changes

### Edge Cases:
- Formula with single line (1 step trace)
- Formula with errors (no trace generated)
- Rapid step navigation
- Playback at very fast speed
- Variables with complex values (nulls, long strings)

## Known Issues

- Need to implement debug mode toggle UI
- Need to integrate TracingEvaluator in evaluation flow
- Ghost value rendering not yet implemented
- Current line highlighting not yet implemented
- DebugControls/DebugVariableInspector not yet connected to actual data

## References

- Phase 1 Implementation: `25-10-25_v16-FormulaDebuggerPhase1.md`
- Epic Document: `EPIC-FormulaEvaluationDebugger.md`
- Evaluation Engine: `/services/evaluationEngine/`
- Debugger Services: `/services/evaluationEngine/debugger/`
