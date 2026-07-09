# EPIC: Formula Evaluation Debugger & Step-Through Replay

**Status:** ✅ Phase 3 Complete  
**Priority:** High  
**Complexity:** High  
**Estimated Phases:** 4  
**Dependencies:**
- ✅ Evaluation Engine (v07)
- ✅ Formula Test Panel (v01)
- ✅ AST Parser & Tokenizer (v07)

**Progress:**
- ✅ **Phase 1 Complete** (v16) - Execution trace recording infrastructure
- ✅ **Phase 2 Complete** (v18) - Debugger UI with step controls and variable inspection
- ✅ **Phase 3 Complete** (v23) - Editor integration with line highlighting, ghost values, and branch indicators
- 📋 **Phase 4 Planned** - Advanced features (timeline, breakpoints, trace export)

---

## Vision Statement

Enable users to **trace formula execution step-by-step** with a visual debugger that shows:
- How values flow through the formula
- Which branches are taken in conditionals
- Intermediate calculation results
- Variable assignments and updates
- Function call arguments and returns

**Think:** Chrome DevTools debugger, but for Formula/BAL expressions.

---

## User Stories

### Story 1: Step-Through Execution
**As a** formula author  
**I want to** step through my formula line-by-line  
**So that** I can understand exactly how it evaluates with test data

**Acceptance Criteria:**
- [ ] Click "Debug" button to start step-through mode
- [ ] Current execution line is highlighted
- [ ] Can step forward/backward through execution
- [ ] See current variable values at each step
- [ ] See the evaluation result of each expression

### Story 2: Visual Execution Flow
**As a** formula author  
**I want to** see which branches my formula takes  
**So that** I can verify conditional logic works correctly

**Acceptance Criteria:**
- [ ] IF/ELSIF/ELSE branches are visually highlighted when taken
- [ ] Skipped branches are dimmed/grayed out
- [ ] Can see why a branch was taken (condition evaluated to true/false)
- [ ] Nested conditionals show hierarchy clearly

### Story 3: Intermediate Value Inspection
**As a** formula author  
**I want to** inspect intermediate calculation results  
**So that** I can debug complex expressions

**Acceptance Criteria:**
- [ ] Hover over any expression to see its value at that step
- [ ] See function arguments before evaluation
- [ ] See function return values after evaluation
- [ ] See variable values before/after assignment

### Story 4: Execution Timeline Replay
**As a** formula author  
**I want to** replay the execution forward and backward  
**So that** I can review how values changed over time

**Acceptance Criteria:**
- [ ] Timeline scrubber showing all execution steps
- [ ] Click any step to jump to that point in execution
- [ ] Play/pause animation of step-through
- [ ] Adjustable playback speed

### Story 5: Breakpoints & Conditional Breaks
**As a** power user  
**I want to** set breakpoints in my formula  
**So that** I can jump to specific points of interest

**Acceptance Criteria:**
- [ ] Click line numbers to set/remove breakpoints
- [ ] "Run to breakpoint" executes until breakpoint is hit
- [ ] Conditional breakpoints (e.g., "break when $total > 1000")
- [ ] Breakpoints persist across test runs

---

## Technical Architecture

### Phase 1: Execution Trace Recording

**Goal:** Capture execution trace data without UI changes

**Components:**

1. **ExecutionTracer** (new service)
   - Wraps Evaluator to capture each step
   - Records AST node visits
   - Captures variable state snapshots
   - Records branch decisions

2. **TraceStep Interface**
   ```typescript
   interface TraceStep {
     stepNumber: number;
     timestamp: number;
     nodeType: ASTNodeType;
     node: ASTNode;
     location: { line: number; column: number };
     
     // State before step
     variablesBefore: Map<string, any>;
     
     // Evaluation result
     result: any;
     resultType: ValueType;
     
     // State after step
     variablesAfter: Map<string, any>;
     
     // Context
     parentStep?: number;
     childSteps: number[];
     
     // Control flow
     branchTaken?: boolean; // For IF/ELSIF
     conditionResult?: boolean;
   }
   ```

3. **TraceRecorder**
   ```typescript
   class TraceRecorder {
     private steps: TraceStep[] = [];
     private currentStep = 0;
     
     recordStep(step: TraceStep): void;
     getTrace(): TraceStep[];
     getStepAt(index: number): TraceStep;
     getTotalSteps(): number;
   }
   ```

**Implementation:**
- Modify Evaluator to accept optional TraceRecorder
- Each AST node evaluation records a step
- Deep clone variable state at each step (for replay)
- Parent-child relationship for nested expressions

**Output:** Execution trace data structure

---

### Phase 2: Debugger UI Panel

**Goal:** Visual interface for step-through debugging

**Components:**

1. **FormulaDebuggerPanel** (new component)
   - Replaces FormulaTestPanel in debug mode
   - Shows formula code with current line highlighted
   - Variable inspector pane
   - Execution controls

2. **Layout Structure:**
   ```
   ┌─────────────────────────────────────────┐
   │ Debug Controls: [◀ Step Back] [Step ▶] │
   │ Step 5/23: Evaluating IF condition      │
   ├─────────────────────────────────────────┤
   │ Formula Code (with highlighting)        │
   │   1  IF $orderTotal > 1000 THEN         │
   │ → 2    IF $loyaltyTier = "gold" THEN ← │
   │   3      $orderTotal * 0.15             │
   │   4    ELSIF $loyaltyTier = "silver"    │
   │   5      $orderTotal * 0.10             │
   │   6    END                               │
   ├─────────────────────────────────────────┤
   │ Variables (at current step)             │
   │ ┌─────────────────────────────────────┐ │
   │ │ $orderTotal = 1500                  │ │
   │ │ $loyaltyTier = "gold" ✓             │ │
   │ └─────────────────────────────────────┘ │
   ├─────────────────────────────────────────┤
   │ Current Expression                      │
   │ $loyaltyTier = "gold"                   │
   │ → Evaluates to: true                    │
   └─────────────────────────────────────────┘
   ```

3. **Debug Controls Bar:**
   ```tsx
   <DebugControls
     currentStep={currentStep}
     totalSteps={totalSteps}
     onStepBack={() => setCurrentStep(currentStep - 1)}
     onStepForward={() => setCurrentStep(currentStep + 1)}
     onReset={() => setCurrentStep(0)}
     onRunToEnd={() => setCurrentStep(totalSteps - 1)}
     isAtStart={currentStep === 0}
     isAtEnd={currentStep === totalSteps - 1}
   />
   ```

4. **Code Highlighting:**
   - Current line: Strong highlight (blue background)
   - Taken branches: Green left border
   - Skipped branches: Gray, dimmed
   - Breakpoints: Red dot in gutter

5. **Variable Inspector:**
   - Show all variables at current step
   - Highlight changed variables (yellow flash)
   - Show previous vs. current value for changed vars
   - Collapse/expand complex values

**Files to Create:**
- `/components/editors/code/FormulaEditor/FormulaDebuggerPanel.tsx`
- `/components/editors/code/FormulaEditor/FormulaDebuggerPanel.module.css`
- `/components/editors/code/FormulaEditor/DebugControls.tsx`
- `/components/editors/code/FormulaEditor/VariableInspector.tsx`

**Integration:**
- Add "Debug" button to FormulaTestPanel
- Switch to debugger mode on click
- Pass trace data from evaluator to debugger panel

---

### Phase 3: Timeline & Replay Controls

**Goal:** Timeline scrubber and playback controls

**Components:**

1. **ExecutionTimeline** (new component)
   - Visual timeline of all steps
   - Click to jump to any step
   - Shows step types (assignment, condition, expression, return)
   - Shows branch points

2. **Timeline UI:**
   ```
   ┌────────────────────────────────────────────────┐
   │ [▶ Play] [⏸ Pause] Speed: [1x ▼]              │
   ├────────────────────────────────────────────────┤
   │ ●─────●─────◆─────●─────◆─────●─────●─────■   │
   │ │     │     │     │     │     │     │     │   │
   │ 1     3     5     7     9    11    13    15   │
   │                   ↑                            │
   │              Current Step                      │
   └────────────────────────────────────────────────┘
   
   Legend:
   ● Assignment    ◆ Condition    ■ Return
   ```

3. **Playback Controls:**
   ```tsx
   interface PlaybackState {
     isPlaying: boolean;
     speed: number; // 0.5x, 1x, 2x, 4x
     currentStep: number;
   }
   
   function usePlayback(trace: TraceStep[]) {
     const [state, setState] = useState<PlaybackState>({
       isPlaying: false,
       speed: 1,
       currentStep: 0
     });
     
     // Auto-advance when playing
     useEffect(() => {
       if (state.isPlaying) {
         const interval = setInterval(() => {
           setState(prev => ({
             ...prev,
             currentStep: prev.currentStep + 1,
             isPlaying: prev.currentStep < trace.length - 1
           }));
         }, 1000 / state.speed);
         
         return () => clearInterval(interval);
       }
     }, [state.isPlaying, state.speed]);
     
     return {
       ...state,
       play: () => setState(s => ({ ...s, isPlaying: true })),
       pause: () => setState(s => ({ ...s, isPlaying: false })),
       setSpeed: (speed: number) => setState(s => ({ ...s, speed })),
       jumpTo: (step: number) => setState(s => ({ ...s, currentStep: step }))
     };
   }
   ```

4. **Step Annotations:**
   - Show what happened at each step on timeline
   - Color-code by step type
   - Tooltip on hover showing details

**Features:**
- Click timeline to jump to step
- Drag scrubber to scan through execution
- Play/pause animation
- Speed controls (0.5x, 1x, 2x, 4x)
- Keyboard shortcuts: Space (play/pause), ← (back), → (forward)

---

### Phase 4: Advanced Debugging Features

**Goal:** Breakpoints, conditional breaks, and call stack

**Components:**

1. **Breakpoint Manager**
   ```typescript
   interface Breakpoint {
     id: string;
     line: number;
     enabled: boolean;
     condition?: string; // Optional conditional breakpoint
     hitCount: number;
   }
   
   class BreakpointManager {
     private breakpoints: Map<number, Breakpoint> = new Map();
     
     addBreakpoint(line: number, condition?: string): void;
     removeBreakpoint(line: number): void;
     toggleBreakpoint(line: number): void;
     shouldBreak(step: TraceStep): boolean;
     evaluateCondition(condition: string, variables: Map<string, any>): boolean;
   }
   ```

2. **Breakpoint UI:**
   - Click line gutter to add/remove breakpoint
   - Right-click for conditional breakpoint dialog
   - Visual indicator in gutter (red dot)
   - Disabled breakpoints (gray dot)

3. **Run to Breakpoint:**
   - "Continue" button runs until next breakpoint
   - If no breakpoint, runs to end
   - Breakpoint hit indicator

4. **Call Stack View** (for nested expressions)
   ```
   ┌─────────────────────────────────────┐
   │ Call Stack                          │
   ├─────────────────────────────────────┤
   │ → IF condition (line 2)             │
   │   ├─ Comparison expression          │
   │   └─ Variable reference             │
   └─────────────────────────────────────┘
   ```

5. **Watch Expressions:**
   - User can add expressions to watch
   - Shows value at each step
   - Highlights when value changes

6. **Step Types:**
   - **Step Over:** Execute current line, don't dive into nested expressions
   - **Step Into:** Dive into nested expressions
   - **Step Out:** Execute until returning to parent expression

**Advanced Features:**
- Conditional breakpoints (e.g., "break when $total > 1000")
- Hit count breakpoints (e.g., "break after 5 hits")
- Watch expressions that evaluate alongside execution
- Call stack for nested function calls
- Exception breakpoints (break on evaluation errors)

---

## UI/UX Design Concepts

### Concept 1: Integrated Debugger (Recommended)

**Layout:** Split view with code + inspector

```
┌────────────────────────────────────────────────────────┐
│ Formula Editor                        [Test] [Debug]   │
├────────────────────────────────────────────────────────┤
│ Code Editor (60% width)   │ Debugger Panel (40% width)│
│                            │                            │
│ 1  IF $orderTotal > 1000   │ ┌─ Debug Controls ──────┐ │
│ 2    IF $loyalty = "gold"  │ │ [◀] Step 5/23 [▶]     │ │
│ 3      $orderTotal * 0.15  │ │ [⏮] [▶▶] [⏭] [⏹]    │ │
│ 4    ELSIF $loyalty = ...  │ └───────────────────────┘ │
│ 5      $orderTotal * 0.10  │                            │
│ 6    END                   │ ┌─ Variables ───────────┐ │
│ 7  ELSE                    │ │ $orderTotal: 1500     │ │
│ 8    0                     │ │ $loyalty: "gold" ✓    │ │
│ 9  END                     │ └───────────────────────┘ │
│                            │                            │
│                            │ ┌─ Current Step ────────┐ │
│                            │ │ Evaluating:           │ │
│                            │ │ $loyalty = "gold"     │ │
│                            │ │ Result: true          │ │
│                            │ └───────────────────────┘ │
│                            │                            │
│                            │ ┌─ Timeline ────────────┐ │
│                            │ │ ●───●───◆───●───■     │ │
│                            │ │         ↑             │ │
│                            │ └───────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

**Pros:**
- Code and debugger always visible
- No context switching
- Similar to IDE debuggers

**Cons:**
- Less space for code
- Complex UI

### Concept 2: Modal Debugger

**Layout:** Full-screen modal overlay

```
┌────────────────────────────────────────────────────────┐
│ ✕ Debug: calculateCustomerDiscount                     │
├────────────────────────────────────────────────────────┤
│                                                         │
│ [◀ Back] Step 5 of 23 [Forward ▶]   [⏮] [▶] [⏭] [⏹] │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ 1  IF $orderTotal > 1000 THEN                       ││
│ │ 2    IF $loyaltyTier = "gold" THEN         ← Current││
│ │ 3      $orderTotal * 0.15                           ││
│ │ 4    ELSIF $loyaltyTier = "silver" THEN             ││
│ │ 5      $orderTotal * 0.10                           ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ Variables at Step 5:                                   │
│ ┌──────────────────────┬─────────────┬─────────────┐  │
│ │ Variable             │ Before      │ After       │  │
│ ├──────────────────────┼─────────────┼─────────────┤  │
│ │ $orderTotal          │ 1500        │ 1500        │  │
│ │ $loyaltyTier         │ "gold"      │ "gold"  ✓   │  │
│ └──────────────────────┴─────────────┴─────────────┘  │
│                                                         │
│ Current Expression: $loyaltyTier = "gold"              │
│ Evaluates to: true                                     │
│                                                         │
│ Timeline:                                              │
│ ●─────●─────◆─────●─────◆─────●─────●─────■           │
│             ↑                                          │
│        You are here                                    │
└────────────────────────────────────────────────────────┘
```

**Pros:**
- More space for debugger UI
- Focused debugging experience
- Can show more context

**Cons:**
- Hides code editor
- Requires switching modes

### Concept 3: Bottom Panel (Recommended for MVP)

**Layout:** Debugger in bottom panel, code above

```
┌────────────────────────────────────────────────────────┐
│ Formula Editor                        [Test] [Debug]   │
├────────────────────────────────────────────────────────┤
│ Code Editor (Full Width, 60% height)                   │
│                                                         │
│ 1  IF $orderTotal > 1000 THEN                          │
│ 2    IF $loyaltyTier = "gold" THEN         ← Current   │
│ 3      $orderTotal * 0.15                              │
│ 4    ELSIF $loyaltyTier = "silver" THEN                │
│ 5      $orderTotal * 0.10                              │
│ 6    END                                               │
│ 7  ELSE                                                │
│ 8    0                                                 │
│ 9  END                                                 │
│                                                         │
├─ Debugger ──────────────────────────────────────────────┤
│ [◀] Step 5 of 23 [▶]    [⏮ First] [▶ Play] [⏭ Last]  │
├────────────────────────────────────────────────────────┤
│ Variables            │ Current Expression              │
│ $orderTotal: 1500    │ $loyaltyTier = "gold"          │
│ $loyaltyTier: "gold" │ → Result: true                 │
│                      │ → Branch TAKEN ✓               │
├──────────────────────┴──────────────────────────────────┤
│ Timeline: ●─────●─────◆─────●─────◆─────●─────●─────■ │
│                       ↑                                │
└────────────────────────────────────────────────────────┘
```

**Pros:**
- Code always visible above
- Natural flow (code → debugger)
- Similar to browser DevTools layout
- Can be collapsed when not debugging

**Cons:**
- Vertical space usage

---

## State Management

### Debug Session State

```typescript
interface DebugSession {
  // Source
  formulaCode: string;
  variables: Variable[];
  testValues: Record<string, any>;
  
  // Execution
  trace: TraceStep[];
  currentStep: number;
  
  // Playback
  isPlaying: boolean;
  playbackSpeed: number;
  
  // Breakpoints
  breakpoints: Breakpoint[];
  
  // UI
  selectedExpression?: ASTNode;
  highlightedLine?: number;
}

interface DebuggerActions {
  startDebug(formulaCode: string, testValues: Record<string, any>): void;
  stepForward(): void;
  stepBackward(): void;
  jumpToStep(stepNumber: number): void;
  play(): void;
  pause(): void;
  reset(): void;
  setPlaybackSpeed(speed: number): void;
  addBreakpoint(line: number, condition?: string): void;
  removeBreakpoint(line: number): void;
  runToBreakpoint(): void;
}
```

### Context Provider

```tsx
interface DebugContextValue {
  session: DebugSession | null;
  actions: DebuggerActions;
}

export function DebugProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<DebugSession | null>(null);
  
  const actions: DebuggerActions = {
    startDebug: (formulaCode, testValues) => {
      // Create trace by evaluating with TraceRecorder
      const recorder = new TraceRecorder();
      const engine = new EvaluationEngine({ recorder });
      engine.evaluate(formulaCode, { variables: testValues });
      
      setSession({
        formulaCode,
        testValues,
        trace: recorder.getTrace(),
        currentStep: 0,
        isPlaying: false,
        playbackSpeed: 1,
        breakpoints: [],
      });
    },
    
    stepForward: () => {
      setSession(prev => prev ? {
        ...prev,
        currentStep: Math.min(prev.currentStep + 1, prev.trace.length - 1)
      } : null);
    },
    
    stepBackward: () => {
      setSession(prev => prev ? {
        ...prev,
        currentStep: Math.max(prev.currentStep - 1, 0)
      } : null);
    },
    
    // ... other actions
  };
  
  return (
    <DebugContext.Provider value={{ session, actions }}>
      {children}
    </DebugContext.Provider>
  );
}
```

---

## Data Structures

### Execution Trace

```typescript
// Example trace for: IF $x > 10 THEN 100 ELSE 50 END
const exampleTrace: TraceStep[] = [
  {
    stepNumber: 0,
    nodeType: 'IfStatement',
    location: { line: 1, column: 1 },
    variablesBefore: new Map([['x', 15]]),
    result: null, // Not yet evaluated
    variablesAfter: new Map([['x', 15]]),
  },
  {
    stepNumber: 1,
    nodeType: 'BinaryExpression',
    location: { line: 1, column: 4 },
    variablesBefore: new Map([['x', 15]]),
    result: true, // $x > 10 = true
    variablesAfter: new Map([['x', 15]]),
    conditionResult: true,
  },
  {
    stepNumber: 2,
    nodeType: 'NumberLiteral',
    location: { line: 1, column: 15 },
    variablesBefore: new Map([['x', 15]]),
    result: 100, // THEN branch taken
    variablesAfter: new Map([['x', 15]]),
    branchTaken: true,
  },
  {
    stepNumber: 3,
    nodeType: 'IfStatement',
    location: { line: 1, column: 1 },
    variablesBefore: new Map([['x', 15]]),
    result: 100, // Final result
    variablesAfter: new Map([['x', 15]]),
  }
];
```

### Visual Highlighting Map

```typescript
interface LineHighlight {
  line: number;
  type: 'current' | 'taken' | 'skipped' | 'breakpoint';
  color: string;
}

function getHighlightsForStep(step: TraceStep): LineHighlight[] {
  const highlights: LineHighlight[] = [];
  
  // Current line
  highlights.push({
    line: step.location.line,
    type: 'current',
    color: 'var(--highlight-primary)'
  });
  
  // Taken branches
  if (step.branchTaken) {
    highlights.push({
      line: step.location.line,
      type: 'taken',
      color: 'var(--support-success)'
    });
  }
  
  return highlights;
}
```

---

## Implementation Phases

### Phase 1: Foundation (2-3 days)
**Goal:** Record execution trace

- [ ] Create TraceRecorder service
- [ ] Define TraceStep interface
- [ ] Modify Evaluator to record steps
- [ ] Add parent-child step relationships
- [ ] Capture variable snapshots at each step
- [ ] Unit tests for trace recording

**Output:** Working trace data structure

### Phase 2: Basic Debugger UI (3-4 days)
**Goal:** Visual step-through

- [ ] Create FormulaDebuggerPanel component
- [ ] Debug controls (step forward/back, reset)
- [ ] Code highlighting for current step
- [ ] Variable inspector showing current state
- [ ] Current expression display
- [ ] Switch between Test and Debug modes

**Output:** Working step-through debugger

### Phase 3: Timeline & Playback (2-3 days)
**Goal:** Timeline scrubber and animation

- [ ] Create ExecutionTimeline component
- [ ] Playback controls (play/pause)
- [ ] Speed controls (0.5x, 1x, 2x, 4x)
- [ ] Click timeline to jump to step
- [ ] Keyboard shortcuts
- [ ] Auto-play animation

**Output:** Timeline-based replay

### Phase 4: Advanced Features (3-4 days)
**Goal:** Breakpoints and advanced debugging

- [ ] Breakpoint manager
- [ ] Click gutter to add/remove breakpoints
- [ ] Conditional breakpoints
- [ ] Run to breakpoint
- [ ] Call stack view
- [ ] Watch expressions
- [ ] Step over/into/out

**Output:** Full-featured debugger

---

## User Flows

### Flow 1: First-Time Debug

1. User writes formula in Formula Editor
2. User defines variables and test values
3. User clicks **"Test"** to verify formula works
4. Formula returns unexpected result
5. User clicks **"Debug"** button
6. Debugger panel opens showing step 0
7. User clicks **"Step Forward"** repeatedly
8. User sees where calculation goes wrong
9. User identifies bug: wrong variable used
10. User closes debugger, fixes formula
11. User re-tests to verify fix

### Flow 2: Complex Conditional Debugging

1. User has nested IF statements
2. User wants to understand branch logic
3. User clicks **"Debug"**
4. User clicks **"Play"** to animate execution
5. Debugger highlights taken branches in green
6. Debugger dims skipped branches in gray
7. User sees exactly which conditions passed/failed
8. User pauses at interesting step
9. User inspects variable values
10. User understands logic flow
11. User closes debugger, confident formula is correct

### Flow 3: Breakpoint-Based Debugging

1. User has long, complex formula
2. User suspects bug in specific section
3. User clicks **"Debug"**
4. User clicks line 15 gutter to set breakpoint
5. User clicks **"Continue"** (run to breakpoint)
6. Execution stops at line 15
7. User inspects variables at that point
8. User steps through a few lines
9. User identifies bug
10. User removes breakpoint
11. User closes debugger, fixes formula

---

## Technical Challenges & Solutions

### Challenge 1: Large Trace Memory Usage

**Problem:** Complex formulas with loops could generate thousands of trace steps, consuming memory.

**Solutions:**
1. **Lazy trace generation:** Only record steps when debugger is active
2. **Trace compression:** Store diffs instead of full variable snapshots
3. **Step limits:** Warn if trace exceeds 1000 steps
4. **Sampling:** For very long traces, sample every Nth step

**Recommended:** Lazy generation + step limits

### Challenge 2: Variable State Snapshotting

**Problem:** Need deep clones of variable state at each step to support backward stepping.

**Solutions:**
1. **Immutable data structures:** Use Immutable.js for O(1) snapshots
2. **Structural sharing:** Only clone changed variables
3. **Reverse operations:** Store operations to reverse, not full state
4. **Forward-only:** Only support forward stepping (no back)

**Recommended:** Structural sharing with shallow clones

### Challenge 3: AST Line Mapping

**Problem:** AST nodes don't always have accurate line/column info.

**Solutions:**
1. **Enhanced tokenizer:** Capture accurate positions during tokenization
2. **AST post-processing:** Add line/column to all nodes after parsing
3. **Source map generation:** Create source map during parsing
4. **Heuristic mapping:** Use node type + context to estimate position

**Recommended:** Enhanced tokenizer (already captures positions)

### Challenge 4: Nested Expression Display

**Problem:** Nested expressions like `(a + b) * (c + d)` create complex call stacks.

**Solutions:**
1. **Tree view:** Show expression tree in inspector
2. **Breadcrumb trail:** Show nesting like "IF > Condition > BinaryOp > Left"
3. **Flatten display:** Only show current expression, hide nesting
4. **Collapsible hierarchy:** Expandable tree of nested calls

**Recommended:** Breadcrumb trail for MVP, tree view for Phase 4

### Challenge 5: Animation Performance

**Problem:** Updating highlights and UI at 60fps could be slow.

**Solutions:**
1. **requestAnimationFrame:** Use RAF for smooth animations
2. **Virtual scrolling:** Only render visible code lines
3. **Debounced updates:** Batch state updates
4. **CSS transitions:** Use CSS for highlighting, not JS

**Recommended:** RAF + CSS transitions

---

## Success Metrics

**Usability:**
- [ ] User can debug a formula in under 2 minutes (from clicking Debug to identifying issue)
- [ ] 90% of users understand step-through controls without help
- [ ] Users prefer debugger over console.log-style debugging

**Performance:**
- [ ] Trace generation adds <100ms overhead to evaluation
- [ ] Step transitions feel instant (<16ms)
- [ ] Timeline scrubbing is smooth (60fps)
- [ ] Supports formulas up to 500 lines / 1000 steps

**Feature Adoption:**
- [ ] 60%+ of formula authors use debugger at least once
- [ ] 30%+ use debugger regularly (weekly)
- [ ] Debugger reduces support tickets about formula logic

---

## Future Enhancements

### Phase 5: Collaborative Debugging
- Share debug sessions via URL
- Record and export debug sessions
- Annotate debug sessions with notes
- Save debug sessions for later review

### Phase 6: AI-Assisted Debugging
- AI suggests where bug might be
- AI explains why branch was taken
- AI recommends test values to expose bugs
- AI generates test cases from formula

### Phase 7: Production Debugging
- Debug with real production data (anonymized)
- Connect to production logs
- Replay production evaluations
- Compare test vs. production results

### Phase 8: Multi-Formula Debugging
- Debug multiple formulas that call each other
- Cross-formula breakpoints
- Global variable tracking across formulas
- Formula dependency visualization

---

## Dependencies

**Required Before Starting:**
- ✅ Evaluation Engine with AST (v07) - COMPLETE
- ✅ Formula Test Panel (v01) - COMPLETE
- ✅ Variable Table (v09) - COMPLETE

**Nice to Have:**
- ⏳ Syntax error handling improvements
- ⏳ Performance profiling infrastructure
- ⏳ Formula versioning system

**Blocks:**
- ❌ None - can start immediately

---

## Risks & Mitigations

### Risk 1: Complexity Overload
**Risk:** Feature becomes too complex, users avoid it  
**Mitigation:** Start with simple MVP (Phase 2), progressive disclosure of advanced features  
**Severity:** Medium

### Risk 2: Performance Impact
**Risk:** Trace recording slows down evaluation significantly  
**Mitigation:** Make tracing optional, optimize hot paths, add performance benchmarks  
**Severity:** High

### Risk 3: UI Clutter
**Risk:** Debugger UI clutters the Formula Editor  
**Mitigation:** Use collapsible bottom panel, separate modal mode option  
**Severity:** Low

### Risk 4: Maintenance Burden
**Risk:** Debugger requires updates whenever Evaluator changes  
**Mitigation:** Use visitor pattern, keep tracing logic separate, comprehensive tests  
**Severity:** Medium

---

## Open Questions

1. **Should debugger support loops?** (when we add FOR/WHILE)
   - How to handle infinite loops?
   - Step limit? Timeout?

2. **Should we show performance metrics?** (execution time per step)
   - Could help identify slow expressions
   - Might clutter UI

3. **Should we support reverse execution?** (undo steps)
   - Cool feature but complex
   - May require different architecture

4. **Should breakpoints be saved?** (persist across sessions)
   - Useful for complex formulas
   - Needs storage mechanism

5. **Should we visualize data flow?** (like Bret Victor's Learnable Programming)
   - Extremely powerful for understanding
   - Very complex to implement

---

## References

**Inspiration:**
- Chrome DevTools JavaScript Debugger
- VS Code Debugger
- Bret Victor's "Learnable Programming" (http://worrydream.com/LearnableProgramming/)
- Observable Notebooks (runtime value inspection)
- Apple's Swift Playgrounds (inline results)

**Technical:**
- AST Visitor Pattern for instrumentation
- Immutable data structures for snapshots
- Source maps for position tracking
- React DevTools (component inspection patterns)

**Carbon Design:**
- Carbon Code Snippet component
- Carbon Modal patterns
- Carbon Timeline component (custom)

---

## Next Steps

1. **Review & Validate Epic**
   - Get feedback from stakeholders
   - Validate user stories
   - Prioritize phases

2. **Spike: Trace Recording** (1 day)
   - Prototype TraceRecorder
   - Test with complex formula
   - Measure memory/performance impact

3. **Design Review** (1 day)
   - Create mockups for debugger UI
   - Choose layout concept (integrated vs. bottom panel)
   - Design control patterns

4. **Phase 1 Kickoff**
   - Set up epic tracking
   - Create tasks for Phase 1
   - Assign developers

---

## Notes

This is a **high-value, high-complexity** feature that will significantly improve the formula authoring experience. The debugger will:

1. **Reduce cognitive load** - Users don't have to mentally simulate execution
2. **Improve learning** - New users can see exactly how formulas work
3. **Enable debugging** - Complex formulas become debuggable
4. **Build confidence** - Users trust their formulas more when they can verify logic step-by-step

**Key Success Factor:** Keep Phase 2 (Basic Debugger) simple and intuitive. Users should understand it immediately without documentation. Advanced features (breakpoints, watch expressions) can be progressive enhancements.

**Comparison to Similar Tools:**
- **Browser DevTools:** Industry-standard debugger, familiar UX patterns
- **Observable Notebooks:** Inline value display, but less control over stepping
- **Swift Playgrounds:** Live editing + execution, but less debugging control
- **Our Debugger:** Combines step-through control with inline value display

This feature positions our Formula Editor as **best-in-class** for business rule authoring.

---

**Epic Status:** 📋 Ready for Planning