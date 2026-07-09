# EPIC: Loops and Switch/Case Statements

**Epic ID:** EPIC-007  
**Epic Name:** Loops and Switch/Case Control Flow  
**Status:** 📋 Planned  
**Priority:** Medium  
**Estimated Duration:** 12-16 days  
**Dependencies:** Evaluation Engine (Complete), Debugger Phase 3 (Complete), Type System (Recommended)  
**Lead:** Senior Front End Architect  
**Created:** October 30, 2025  

---

## Executive Summary

Extend the formula language with iterative control flow (FOR, WHILE loops) and multi-way branching (SWITCH/CASE statements) to enable collection processing, iterative calculations, and simplified conditional logic. This epic adds enterprise-grade control structures while maintaining the existing architecture's strengths in debugging, type safety, and error handling.

**Key Value:** Enables complex business logic patterns like commission calculations, bulk processing, status-based routing, and iterative algorithms without code repetition.

---

## Vision

Enable formula authors to:
- **Iterate over collections** with FOR loops (`FOR $item IN $list DO ... END`)
- **Repeat until conditions met** with WHILE loops (`WHILE $count < 10 DO ... END`)
- **Simplify multi-way branching** with SWITCH statements (`SWITCH $status CASE "pending" ... END`)
- **Process ranges** efficiently (`FOR $i IN 1..100 DO ... END`)
- **Maintain debugging clarity** with iteration-aware trace visualization
- **Ensure safety** with iteration limits and infinite loop protection

---

## Business Value

### Use Cases Enabled

**1. Commission Calculations:**
```
$totalCommission = 0
FOR $sale IN $salesList DO
  IF $sale > 1000 THEN
    $totalCommission = $totalCommission + ($sale * 0.10)
  ELSE
    $totalCommission = $totalCommission + ($sale * 0.05)
  END
END
RETURN $totalCommission
```

**2. Status-Based Routing:**
```
SWITCH $orderStatus
  CASE "pending"
    $shippingDays = 5
    $priority = "low"
  CASE "urgent"
    $shippingDays = 1
    $priority = "high"
  CASE "standard"
    $shippingDays = 3
    $priority = "medium"
  DEFAULT
    $shippingDays = 7
    $priority = "low"
END
```

**3. Iterative Calculations:**
```
$fibonacci = [1, 1]
$count = 2
WHILE $count < 10 DO
  $next = $fibonacci[LENGTH($fibonacci) - 1] + $fibonacci[LENGTH($fibonacci) - 2]
  $fibonacci = CONCAT($fibonacci, [$next])
  $count = $count + 1
END
RETURN $fibonacci
```

**4. Bulk Processing:**
```
$discountedPrices = []
FOR $price IN $priceList DO
  $discountedPrice = $price * 0.9
  $discountedPrices = CONCAT($discountedPrices, [$discountedPrice])
END
RETURN $discountedPrices
```

---

## Goals & Success Criteria

### Primary Goals

1. ✅ **FOR Loop Implementation**
   - Iterate over lists: `FOR $item IN $list DO ... END`
   - Iterate over ranges: `FOR $i IN 1..10 DO ... END`
   - Loop variable scoping (doesn't leak outside loop)
   - BREAK and CONTINUE support

2. ✅ **WHILE Loop Implementation**
   - Condition-based iteration: `WHILE $condition DO ... END`
   - Infinite loop protection (max iterations configurable)
   - BREAK support

3. ✅ **SWITCH/CASE Implementation**
   - Multi-way branching: `SWITCH $expr CASE value1 ... CASE value2 ... DEFAULT ... END`
   - Automatic break (no fall-through by default)
   - Type-safe case matching

4. ✅ **Debugger Integration**
   - Iteration tracking (show iteration count)
   - Loop variable values during stepping
   - Case matching visualization
   - Performance: handle loops with many iterations gracefully

5. ✅ **Type Safety**
   - Loop variables inherit type from iteration source
   - Range type support (1..10 is Range<number>)
   - SWITCH expression and case value type compatibility

### Success Metrics

- **Functionality:** All loop/switch patterns execute correctly
- **Safety:** Infinite loops caught and prevented
- **Debuggability:** Clear iteration tracking in debugger
- **Performance:** 1000-iteration loops complete in <100ms
- **Type Safety:** Type mismatches caught at validation time
- **Documentation:** 10+ sample formulas demonstrating patterns

---

## Architecture Impact Analysis

### Overall Assessment: **LOW-MEDIUM Complexity**

The existing architecture is **well-designed** and can accommodate these features with **incremental additions**. No major refactoring required.

### Component-by-Component Analysis

#### 1. AST (ASTNodes.ts) - **LOW Complexity**

**Changes Needed:**
- Add new node types:
  - `ForLoopStatement` - FOR loop with iterator and body
  - `WhileLoopStatement` - WHILE loop with condition and body
  - `SwitchStatement` - SWITCH with expression and cases
  - `CaseClause` - Individual case in switch
  - `BreakStatement` - BREAK keyword
  - `ContinueStatement` - CONTINUE keyword
  - `RangeExpression` - Range syntax (1..10)

**Example AST Node:**
```typescript
export interface ForLoopStatement extends ASTNode {
  type: 'ForLoopStatement';
  iterator: string;              // $item
  iterableExpression: Expression; // $list or range
  body: Expression[];            // Loop body statements
}

export interface SwitchStatement extends ASTNode {
  type: 'SwitchStatement';
  expression: Expression;        // Value to match
  cases: CaseClause[];           // Array of cases
  defaultCase?: Expression[];    // Optional DEFAULT
}
```

**Impact:** Straightforward additions, no breaking changes.

---

#### 2. Tokenizer (Tokenizer.ts) - **LOW Complexity**

**Changes Needed:**
- Add new token types:
  - `FOR`, `IN`, `DO`, `WHILE`, `BREAK`, `CONTINUE`
  - `SWITCH`, `CASE`, `DEFAULT`
  - `..` (range operator)

**Example:**
```typescript
const KEYWORDS = {
  // Existing...
  FOR: 'FOR',
  IN: 'IN',
  DO: 'DO',
  WHILE: 'WHILE',
  BREAK: 'BREAK',
  CONTINUE: 'CONTINUE',
  SWITCH: 'SWITCH',
  CASE: 'CASE',
  DEFAULT: 'DEFAULT',
};
```

**Impact:** Minimal, just adding new keyword recognition.

---

#### 3. Parser (FormulaParser.ts) - **LOW-MEDIUM Complexity**

**Changes Needed:**
- Add parsing methods:
  - `parseForLoop()` - Parse FOR...IN...DO...END
  - `parseWhileLoop()` - Parse WHILE...DO...END
  - `parseSwitch()` - Parse SWITCH...CASE...DEFAULT...END
  - `parseRange()` - Parse range expressions (1..10)

**Parsing Examples:**
```typescript
// FOR loop parsing
parseForLoop(): ForLoopStatement {
  this.expect('FOR');
  const iterator = this.expect('VARIABLE').value; // $item
  this.expect('IN');
  const iterable = this.parseExpression(); // $list or range
  this.expect('DO');
  const body = this.parseBlock(); // Statements until END
  this.expect('END');
  
  return {
    type: 'ForLoopStatement',
    iterator,
    iterableExpression: iterable,
    body,
    location: this.currentLocation()
  };
}

// SWITCH parsing
parseSwitch(): SwitchStatement {
  this.expect('SWITCH');
  const expression = this.parseExpression();
  const cases: CaseClause[] = [];
  let defaultCase: Expression[] | undefined;
  
  while (this.match('CASE')) {
    const value = this.parseExpression();
    const body = this.parseBlock(); // Until next CASE/DEFAULT/END
    cases.push({ value, body });
  }
  
  if (this.match('DEFAULT')) {
    defaultCase = this.parseBlock();
  }
  
  this.expect('END');
  
  return { type: 'SwitchStatement', expression, cases, defaultCase };
}
```

**Impact:** Moderate - need to handle nested loops, proper END matching, error recovery.

---

#### 4. Evaluator (Evaluator.ts) - **MEDIUM Complexity**

**Changes Needed:**
- Add evaluation methods for loop/switch nodes
- Implement iteration logic with safety limits
- Handle BREAK/CONTINUE control flow
- Manage loop variable scope

**Key Implementation Points:**

**A. FOR Loop Execution:**
```typescript
evaluateForLoop(node: ForLoopStatement, context: ExecutionContext): any {
  const iterable = this.evaluate(node.iterableExpression, context);
  
  // Validate iterable (must be list or range)
  if (!Array.isArray(iterable)) {
    throw new EvaluationError('FOR loop requires list or range');
  }
  
  let lastValue: any = null;
  
  // Create nested scope for loop variable
  const loopContext = context.createChildScope();
  
  for (let i = 0; i < iterable.length; i++) {
    // Check iteration limit
    if (i >= this.maxIterations) {
      throw new EvaluationError('Maximum iterations exceeded (infinite loop protection)');
    }
    
    // Set loop variable
    loopContext.setVariable(node.iterator, iterable[i]);
    
    // Execute body
    try {
      for (const stmt of node.body) {
        lastValue = this.evaluate(stmt, loopContext);
      }
    } catch (e) {
      if (e instanceof BreakException) break;
      if (e instanceof ContinueException) continue;
      throw e;
    }
  }
  
  return lastValue;
}
```

**B. WHILE Loop Execution:**
```typescript
evaluateWhileLoop(node: WhileLoopStatement, context: ExecutionContext): any {
  let iterations = 0;
  let lastValue: any = null;
  
  while (this.evaluate(node.condition, context)) {
    // Infinite loop protection
    if (++iterations > this.maxIterations) {
      throw new EvaluationError('Maximum iterations exceeded');
    }
    
    try {
      for (const stmt of node.body) {
        lastValue = this.evaluate(stmt, context);
      }
    } catch (e) {
      if (e instanceof BreakException) break;
      if (e instanceof ContinueException) continue;
      throw e;
    }
  }
  
  return lastValue;
}
```

**C. SWITCH Execution:**
```typescript
evaluateSwitch(node: SwitchStatement, context: ExecutionContext): any {
  const switchValue = this.evaluate(node.expression, context);
  
  // Try each case
  for (const caseClause of node.cases) {
    const caseValue = this.evaluate(caseClause.value, context);
    
    if (switchValue === caseValue) {
      // Execute case body
      let lastValue: any = null;
      for (const stmt of caseClause.body) {
        lastValue = this.evaluate(stmt, context);
      }
      return lastValue; // Automatic break, no fall-through
    }
  }
  
  // No case matched, execute DEFAULT
  if (node.defaultCase) {
    let lastValue: any = null;
    for (const stmt of node.defaultCase) {
      lastValue = this.evaluate(stmt, context);
    }
    return lastValue;
  }
  
  return null; // No match, no default
}
```

**Safety Mechanisms:**
- `maxIterations` configurable (default: 10,000)
- BreakException/ContinueException for control flow
- Child scope for loop variables (prevents leaking)

**Impact:** Moderate - requires careful control flow handling and safety checks.

---

#### 5. Context (Context.ts) - **LOW-MEDIUM Complexity**

**Changes Needed:**
- Add `createChildScope()` method for nested scopes
- Track scope depth for loop variables
- Support variable shadowing

**Example:**
```typescript
export class ExecutionContext {
  private scopes: Map<string, any>[] = [new Map()]; // Stack of scopes
  
  createChildScope(): ExecutionContext {
    const child = new ExecutionContext();
    child.scopes = [...this.scopes, new Map()]; // Add new scope layer
    return child;
  }
  
  setVariable(name: string, value: any): void {
    // Set in current (top) scope
    this.scopes[this.scopes.length - 1].set(name, value);
  }
  
  getVariable(name: string): any {
    // Search from top scope down to global
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      if (this.scopes[i].has(name)) {
        return this.scopes[i].get(name);
      }
    }
    throw new Error(`Variable ${name} not defined`);
  }
}
```

**Impact:** Moderate - need to ensure scope chain works correctly.

---

#### 6. TracingEvaluator (TracingEvaluator.ts) - **MEDIUM Complexity**

**Changes Needed:**
- Record loop entry/exit traces
- Track iteration count
- Record loop variable changes per iteration
- Record case matching in SWITCH

**Key Points:**

**A. Loop Iteration Tracking:**
```typescript
// Record loop entry
tracer.recordStep({
  nodeType: 'ForLoopStatement',
  location: node.location,
  description: `FOR ${node.iterator} IN [${iterable.length} items]`,
  variablesBefore: context.getAllVariables(),
  result: null,
  resultType: 'null'
});

// Record each iteration
for (let i = 0; i < iterable.length; i++) {
  tracer.recordStep({
    nodeType: 'Assignment',
    description: `${node.iterator} = ${iterable[i]} (iteration ${i + 1})`,
    variablesBefore: loopContext.getAllVariables(),
    result: iterable[i],
    resultType: inferType(iterable[i])
  });
  
  // Execute and trace body statements...
}

// Record loop exit
tracer.recordStep({
  nodeType: 'ForLoopStatement',
  description: 'Loop complete',
  result: lastValue,
  resultType: inferType(lastValue)
});
```

**B. Switch Case Matching:**
```typescript
// Record switch evaluation
tracer.recordStep({
  nodeType: 'SwitchStatement',
  description: `SWITCH evaluating: ${switchValue}`,
  result: switchValue
});

// Record case matching attempt
for (const caseClause of node.cases) {
  const matched = switchValue === caseValue;
  
  tracer.recordStep({
    nodeType: 'SwitchStatement',
    description: `CASE ${caseValue}: ${matched ? 'MATCHED' : 'skipped'}`,
    branchTaken: matched,
    result: caseValue
  });
  
  if (matched) {
    // Execute and trace case body...
    break;
  }
}
```

**Performance Consideration:**
- For loops with 1000+ iterations, may want to limit trace detail
- Option: Record every 10th iteration or just entry/exit for large loops
- Configurable trace granularity

**Impact:** Moderate - need to balance trace detail with performance.

---

#### 7. Syntax Highlighting (useFormulaSyntax.ts) - **LOW Complexity**

**Changes Needed:**
- Add new keywords to syntax highlighting patterns
- Highlight loop variables differently (optional)

**Example:**
```typescript
const FORMULA_KEYWORDS = [
  // Existing...
  'FOR', 'IN', 'DO', 'WHILE', 'BREAK', 'CONTINUE',
  'SWITCH', 'CASE', 'DEFAULT'
];

// Highlight pattern
const keywordPattern = new RegExp(`\\b(${FORMULA_KEYWORDS.join('|')})\\b`, 'gi');
```

**Optional Enhancement:**
- Different color for loop variables (e.g., `$i`, `$item` when used in loop context)

**Impact:** Minimal - just adding keywords to existing patterns.

---

#### 8. Validation (useFormulaValidation.ts) - **LOW-MEDIUM Complexity**

**Changes Needed:**
- Validate BREAK/CONTINUE only inside loops
- Validate iterable expressions (must be list or range)
- Validate SWITCH case value types match
- Warn about unreachable code after BREAK

**Example Validations:**
```typescript
// BREAK outside loop
validateBreakStatement(node: BreakStatement, inLoop: boolean) {
  if (!inLoop) {
    return {
      type: 'error',
      message: 'BREAK can only be used inside a loop',
      location: node.location
    };
  }
}

// Invalid iterable
validateForLoop(node: ForLoopStatement) {
  const iterableType = inferType(node.iterableExpression);
  
  if (iterableType !== 'list' && iterableType !== 'range') {
    return {
      type: 'error',
      message: 'FOR loop requires a list or range',
      location: node.iterableExpression.location
    };
  }
}

// SWITCH type mismatch
validateSwitch(node: SwitchStatement) {
  const switchType = inferType(node.expression);
  
  for (const caseClause of node.cases) {
    const caseType = inferType(caseClause.value);
    
    if (switchType !== caseType) {
      return {
        type: 'warning',
        message: `CASE value type (${caseType}) doesn't match SWITCH expression type (${switchType})`,
        location: caseClause.location
      };
    }
  }
}
```

**Impact:** Moderate - need to track loop nesting depth for BREAK/CONTINUE validation.

---

#### 9. Type System (TypeSystem.ts) - **LOW-MEDIUM Complexity**

**Changes Needed:**
- Add `RangeType` for range expressions
- Loop variable type inference from iterable
- SWITCH expression type tracking

**Example:**
```typescript
export interface RangeType extends TypeDefinition {
  kind: 'range';
  elementType: 'number'; // Ranges always produce numbers
}

// Type inference for loop variables
function inferLoopVariableType(iterable: Expression): PrimitiveType {
  const iterableType = inferType(iterable);
  
  if (iterableType.kind === 'list') {
    return iterableType.elementType; // List<number> → number
  }
  
  if (iterableType.kind === 'range') {
    return 'number'; // Ranges always produce numbers
  }
  
  throw new TypeError('Invalid iterable type');
}
```

**Impact:** Low-Medium - straightforward type definitions.

---

#### 10. Debugger UI (DebugControls, GhostValue, etc.) - **LOW-MEDIUM Complexity**

**Changes Needed:**
- Show iteration count in debug trace
- Visualize loop iterations (e.g., "Iteration 5 of 10")
- Show case matching in SWITCH
- Performance: Collapse iterations in trace view

**UI Enhancements:**

**A. Iteration Indicator:**
```tsx
{trace.nodeType === 'ForLoopStatement' && (
  <div className={styles.iterationBadge}>
    Iteration {currentIteration} of {totalIterations}
  </div>
)}
```

**B. Loop Variable Display:**
```tsx
// In ghost value overlay
{loopVariables.map(variable => (
  <GhostValue
    key={variable.name}
    value={variable.value}
    label={`${variable.name} (loop variable)`}
    isLoopVariable={true}
  />
))}
```

**C. Case Matching Indicator:**
```tsx
{trace.nodeType === 'SwitchStatement' && trace.branchTaken && (
  <div className={styles.caseMatchedBadge}>
    Case Matched ✓
  </div>
)}
```

**Performance Optimization:**
- For loops with 100+ iterations, group iterations in trace view
- "Show all iterations" toggle for detailed inspection

**Impact:** Low-Medium - mostly UI presentation enhancements.

---

## Implementation Phases

### Phase 1: FOR Loop Foundation (3-4 days)

**Goal:** Implement FOR loops with basic iteration over lists.

**Tasks:**
1. Add AST nodes (ForLoopStatement, RangeExpression)
2. Add tokenizer keywords (FOR, IN, DO)
3. Implement parser for FOR...IN...DO...END
4. Implement evaluator for FOR loops
5. Add loop variable scope management
6. Implement infinite loop protection
7. Add syntax highlighting
8. Write validation rules
9. Create 5+ sample formulas

**Deliverables:**
- FOR loops functional in evaluator
- Syntax highlighting working
- Validation catching common errors
- Sample formulas demonstrating use cases

---

### Phase 2: BREAK/CONTINUE Support (1-2 days)

**Goal:** Add control flow within loops.

**Tasks:**
1. Add AST nodes (BreakStatement, ContinueStatement)
2. Add tokenizer keywords (BREAK, CONTINUE)
3. Implement parser for BREAK/CONTINUE
4. Implement exception-based control flow in evaluator
5. Add validation (BREAK/CONTINUE outside loop error)
6. Update samples with BREAK/CONTINUE examples

**Deliverables:**
- BREAK exits loops early
- CONTINUE skips to next iteration
- Validation prevents misuse

---

### Phase 3: WHILE Loop Implementation (2-3 days)

**Goal:** Condition-based iteration.

**Tasks:**
1. Add AST node (WhileLoopStatement)
2. Add tokenizer keyword (WHILE)
3. Implement parser for WHILE...DO...END
4. Implement evaluator for WHILE loops
5. Ensure infinite loop protection works
6. Add syntax highlighting
7. Write validation rules
8. Create 3+ sample formulas

**Deliverables:**
- WHILE loops functional
- Infinite loop protection tested
- Samples showing use cases

---

### Phase 4: SWITCH/CASE Implementation (2-3 days)

**Goal:** Multi-way branching.

**Tasks:**
1. Add AST nodes (SwitchStatement, CaseClause)
2. Add tokenizer keywords (SWITCH, CASE, DEFAULT)
3. Implement parser for SWITCH...CASE...DEFAULT...END
4. Implement evaluator for SWITCH
5. Add syntax highlighting
6. Write validation rules (type checking)
7. Create 5+ sample formulas

**Deliverables:**
- SWITCH/CASE functional
- Type-safe case matching
- Samples showing status routing, tier selection, etc.

---

### Phase 5: Debugger Integration (2-3 days)

**Goal:** Visual debugging for loops and switches.

**Tasks:**
1. Update TracingEvaluator to record loop iterations
2. Add iteration tracking in trace steps
3. Show loop variable changes in debug output
4. Add iteration badge to debug UI
5. Implement case matching visualization for SWITCH
6. Test performance with large loops (1000+ iterations)
7. Add trace granularity controls (optional)

**Deliverables:**
- Debugger shows iteration count
- Loop variables visible during stepping
- Case matching clearly indicated
- Performance acceptable for large loops

---

### Phase 6: Type System Integration (1-2 days)

**Goal:** Type-safe loops and switches.

**Tasks:**
1. Add RangeType to type system
2. Implement loop variable type inference
3. Add SWITCH type checking (case values match expression)
4. Update type validation rules
5. Test type safety end-to-end

**Deliverables:**
- Loop variables have correct types
- Type mismatches caught at validation
- Clear error messages for type issues

---

### Phase 7: Documentation & Polish (1-2 days)

**Goal:** Comprehensive documentation and refinement.

**Tasks:**
1. Write epic completion summary
2. Create 15+ sample formulas covering all patterns
3. Document syntax in formula editor help
4. Add autocomplete entries for new keywords
5. Performance testing and optimization
6. Bug fixes and edge case handling

**Deliverables:**
- Complete documentation
- Comprehensive samples
- Help integration
- Production-ready quality

---

## Syntax Examples

### FOR Loop Syntax

**Iterate over list:**
```
FOR $item IN $list DO
  $total = $total + $item
END
```

**Iterate over range:**
```
FOR $i IN 1..10 DO
  $sum = $sum + $i
END
```

**With BREAK:**
```
FOR $item IN $list DO
  IF $item > 100 THEN
    BREAK
  END
  $count = $count + 1
END
```

**With CONTINUE:**
```
FOR $item IN $list DO
  IF $item < 0 THEN
    CONTINUE
  END
  $sum = $sum + $item
END
```

**Nested loops:**
```
FOR $row IN $matrix DO
  FOR $cell IN $row DO
    $total = $total + $cell
  END
END
```

---

### WHILE Loop Syntax

**Condition-based iteration:**
```
WHILE $count < 10 DO
  $count = $count + 1
  $sum = $sum + $count
END
```

**With BREAK:**
```
WHILE TRUE DO
  $value = $value * 2
  IF $value > 1000 THEN
    BREAK
  END
END
```

---

### SWITCH/CASE Syntax

**Status routing:**
```
SWITCH $status
  CASE "pending"
    $priority = "low"
    $days = 5
  CASE "urgent"
    $priority = "high"
    $days = 1
  CASE "standard"
    $priority = "medium"
    $days = 3
  DEFAULT
    $priority = "low"
    $days = 7
END
```

**Tier selection:**
```
SWITCH $tier
  CASE "gold"
    $discount = 0.20
  CASE "silver"
    $discount = 0.10
  CASE "bronze"
    $discount = 0.05
  DEFAULT
    $discount = 0.00
END
```

**Return value:**
```
$message = SWITCH $code
  CASE 200
    "Success"
  CASE 404
    "Not Found"
  CASE 500
    "Server Error"
  DEFAULT
    "Unknown Status"
END
```

---

## Technical Considerations

### Infinite Loop Protection

**Strategy:**
- Default max iterations: 10,000
- Configurable per formula or globally
- Clear error message when limit exceeded
- Suggestion to use BREAK or adjust limit

**Error Message:**
```
Maximum iterations exceeded (10,000). 
Possible infinite loop detected in WHILE loop at line 5.
Use BREAK to exit the loop or increase iteration limit.
```

---

### Performance Optimization

**For Large Loops:**
- Trace granularity control (record every Nth iteration)
- Collapse iterations in debug UI
- Lazy trace rendering
- Efficient variable snapshot (shallow copy for immutables)

**Benchmarks:**
- 100 iterations: <10ms
- 1,000 iterations: <100ms
- 10,000 iterations: <1s

---

### Scope Management

**Nested Scopes:**
```
Global Scope:
  $total = 0
  FOR $item IN $list DO
    Loop Scope 1:
      $item = 5 (loop variable)
      FOR $subItem IN $item DO
        Loop Scope 2:
          $subItem = 3 (loop variable)
        END
      END
    // $subItem not accessible here
  END
  // $item not accessible here
END
```

**Variable Shadowing:**
- Loop variables can shadow outer variables
- Original value restored after loop exits
- Warning if shadowing occurs (optional)

---

### Type Inference

**Loop Variable Types:**
```
$numbers: List<number> = [1, 2, 3]
FOR $num IN $numbers DO
  // $num is inferred as type: number
END

$range = 1..10
FOR $i IN $range DO
  // $i is inferred as type: number
END
```

**SWITCH Type Checking:**
```
$status: string = "pending"
SWITCH $status
  CASE "pending"  // ✅ string matches
  CASE 404        // ❌ number doesn't match, warning
END
```

---

## Sample Formulas

### Commission Calculation
```
// Calculate total commission from sales list
$totalCommission = 0
$salesList = [500, 1200, 800, 1500, 300]

FOR $sale IN $salesList DO
  IF $sale > 1000 THEN
    $commission = $sale * 0.10  // 10% for sales over $1000
  ELSE
    $commission = $sale * 0.05  // 5% for smaller sales
  END
  
  $totalCommission = $totalCommission + $commission
END

RETURN $totalCommission  // Should return 220
```

---

### Find First Match
```
// Find first item meeting criteria
$items = [10, 25, 5, 40, 15]
$threshold = 30
$result = NULL

FOR $item IN $items DO
  IF $item >= $threshold THEN
    $result = $item
    BREAK  // Found it, exit loop
  END
END

RETURN $result  // Should return 40
```

---

### Order Priority Routing
```
// Determine shipping priority and days based on order status
SWITCH $orderStatus
  CASE "same-day"
    $priority = "critical"
    $shippingDays = 0
    $carrier = "express"
  CASE "next-day"
    $priority = "high"
    $shippingDays = 1
    $carrier = "express"
  CASE "standard"
    $priority = "normal"
    $shippingDays = 5
    $carrier = "standard"
  DEFAULT
    $priority = "normal"
    $shippingDays = 7
    $carrier = "economy"
END

RETURN $shippingDays
```

---

### Fibonacci Sequence
```
// Generate first 10 Fibonacci numbers
$fibonacci = [1, 1]
$count = 2

WHILE $count < 10 DO
  $prev1 = $fibonacci[LENGTH($fibonacci) - 1]
  $prev2 = $fibonacci[LENGTH($fibonacci) - 2]
  $next = $prev1 + $prev2
  
  $fibonacci = CONCAT($fibonacci, [$next])
  $count = $count + 1
END

RETURN $fibonacci  // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

---

### Discount Tier Selection
```
// Determine discount based on purchase amount
$amount = 1250

$discount = SWITCH $amount
  CASE < 100
    0.00
  CASE < 500
    0.05
  CASE < 1000
    0.10
  CASE >= 1000
    0.15
END

$finalAmount = $amount * (1 - $discount)
RETURN $finalAmount
```

---

## Dependencies

### Required (Must Be Complete)
- ✅ Evaluation Engine
- ✅ AST Structure
- ✅ Parser Infrastructure
- ✅ Tokenizer

### Recommended (Should Be Complete)
- ✅ Formula Debugger Phase 3
- 📋 Type System (partial exists, full implementation recommended)

### Optional (Nice to Have)
- List/Array Type (enables list iteration)
- Object Literals (enables object iteration - future)

---

## Risks & Mitigation

### Risk 1: Infinite Loops
**Probability:** Medium  
**Impact:** High (UI freeze, poor UX)  
**Mitigation:**
- Configurable iteration limit (default: 10,000)
- Clear error messages
- Timeout protection
- Debugger shows iteration count warning at 50%+ of limit

---

### Risk 2: Debugger Performance with Large Loops
**Probability:** Medium  
**Impact:** Medium (slow debugging)  
**Mitigation:**
- Trace granularity controls
- Collapse iterations in UI
- Lazy rendering
- Performance testing with 1000+ iterations

---

### Risk 3: Nested Loop Complexity
**Probability:** Low  
**Impact:** Medium (confusing traces)  
**Mitigation:**
- Clear visual hierarchy in debugger
- Scope depth indicators
- Comprehensive samples showing nested patterns

---

### Risk 4: Type System Integration
**Probability:** Low  
**Impact:** Medium (type errors not caught)  
**Mitigation:**
- Phase 6 dedicated to type integration
- Comprehensive type tests
- Depends on Type System epic (can proceed with basic type checking)

---

## Success Criteria

### Functional Requirements
- ✅ FOR loops iterate over lists correctly
- ✅ FOR loops iterate over ranges correctly
- ✅ WHILE loops execute while condition is true
- ✅ BREAK exits loops immediately
- ✅ CONTINUE skips to next iteration
- ✅ SWITCH executes matching case
- ✅ DEFAULT case executes when no match
- ✅ Nested loops work correctly
- ✅ Loop variables scoped properly

### Safety Requirements
- ✅ Infinite loop protection works
- ✅ BREAK/CONTINUE outside loop caught
- ✅ Iteration limit configurable
- ✅ Clear error messages for limits

### Debugger Requirements
- ✅ Iteration count displayed
- ✅ Loop variables visible during stepping
- ✅ Case matching clearly indicated
- ✅ Performance acceptable (1000+ iterations in <100ms)

### Type Safety Requirements
- ✅ Loop variable types inferred correctly
- ✅ Range type supported
- ✅ SWITCH type mismatches caught
- ✅ Clear type error messages

### Documentation Requirements
- ✅ 15+ sample formulas covering all patterns
- ✅ Syntax documentation
- ✅ Help integration
- ✅ Epic completion summary

---

## Related Epics

- [Formula Evaluation Debugger](/planning/epics/EPIC-FormulaEvaluationDebugger.md) - Debugger integration
- [Formula Type System](/planning/epics/EPIC-FormulaTypeSystem.md) - Type checking integration
- [List/Array Type Support](/planning/epics/EPIC-ListArrayType.md) - List iteration

---

## Change Log

**October 30, 2025** - Epic created with comprehensive architecture analysis

---

## Next Steps

1. ✅ Epic approved and added to master requirements
2. Review and refine phase breakdown
3. Schedule Phase 1 (FOR Loop Foundation) start date
4. Assign resources
5. Set up tracking in project management system

---

**Epic Owner:** Senior Front End Architect  
**Status:** Awaiting Approval  
**Estimated Start:** After Formula Debugger Phase 3 complete  
**Estimated Duration:** 12-16 days (7 phases)
