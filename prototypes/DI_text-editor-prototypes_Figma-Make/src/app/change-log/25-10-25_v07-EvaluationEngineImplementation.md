# v07 - Evaluation Engine Implementation Plan

**Date:** October 25, 2025  
**Type:** Implementation Planning  
**Status:** Ready for Implementation  
**Related:**
- [v04 - Formula Engine Architecture Plan](./25-10-25_v04-FormulaEngineArchitecturePlan.md)
- [v05 - Formula Engine Architecture Addendum](./25-10-25_v05-FormulaEngineArchitectureAddendum.md)
- [v06 - Threshold Evaluation Architecture](./25-10-25_v06-ThresholdEvaluationArchitecture.md)

---

## Executive Summary

This document provides the implementation roadmap for the Formula & BAL Evaluation Engine, translating the architectural plans (v04, v05, v06) into concrete development tasks with clear acceptance criteria.

**Implementation Scope:**
- Phase 1 Foundation (this sprint)
- Real formula evaluation replacing mock implementation
- Threshold evaluation with gap handling
- Integration with existing Formula Test Panel
- Zero regression on existing functionality

---

## Requirements

### Functional Requirements

**FR1 - Basic Formula Evaluation**
- Parse and evaluate arithmetic expressions: `$a + $b * 2`
- Support variable substitution: `$variableName`
- Support attribute access: `#customer.age`
- Handle operator precedence correctly
- Return typed results (number, string, boolean, date)

**FR2 - Logical Expressions**
- Support comparison operators: `=`, `!=`, `<`, `>`, `<=`, `>=`
- Support logical operators: `AND`, `OR`, `NOT`
- Evaluate boolean expressions: `$age > 18 AND $hasLicense = true`

**FR3 - Control Flow**
- Support IF/THEN/ELSE/ELSEIF/END blocks
- Support nested conditionals
- Optional RETURN statement (IBM ADS/ODM compatibility)
- Implicit return (last expression value)

**FR4 - Built-in Functions**
- Arithmetic: `ROUND`, `FLOOR`, `CEIL`, `ABS`, `SQRT`, `POW`
- Aggregate: `SUM`, `AVG`, `MAX`, `MIN`, `COUNT`
- String: `CONCAT`, `UPPER`, `LOWER`, `TRIM`, `LEN`
- Logical: `IF` (ternary), `AND`, `OR`, `NOT`
- Date: `NOW`, `TODAY`, `DATEADD`, `DATEDIFF`

**FR5 - Threshold Evaluation**
- Evaluate numeric values against threshold sets
- Support all gap handling strategies (error, default, null, nearest, interpolate, lower, upper)
- Detect and warn about gaps and overlaps
- THRESHOLD() function in formulas

**FR6 - Error Handling**
- Parse errors with line/column information
- Runtime errors with context
- Type mismatch detection
- Undefined variable/attribute detection
- Helpful error messages with suggestions

**FR7 - Test Panel Integration**
- Replace mock evaluation with real engine
- Support variable input values
- Support attribute input values
- Display evaluation results
- Show execution trace (optional)
- Display performance metrics

### Non-Functional Requirements

**NFR1 - Performance**
- Parse simple formula (<50 chars): <10ms (browser main thread)
- Evaluate simple formula: <5ms
- 100 sequential evaluations: <500ms
- No UI blocking during evaluation

**NFR2 - Compatibility**
- Works in browser (current priority)
- Platform adapter pattern for future Node.js support
- No dependencies on server-side APIs

**NFR3 - Maintainability**
- Clear separation: parser, AST, evaluator, runtime
- Comprehensive type definitions
- Well-documented public API
- Unit tests for all components

**NFR4 - Zero Regression**
- All existing tests pass
- No changes to existing component APIs
- Formula Test Panel continues to work
- Threshold evaluation maintains current behavior

---

## Epic 1: Evaluation Engine Foundation

**Goal:** Create the core evaluation engine infrastructure with basic parsing and evaluation.

### User Story 1.1: Core Engine Structure

**As a** developer  
**I want** a well-structured evaluation engine service  
**So that** I can parse and evaluate formulas with clear separation of concerns

**Acceptance Criteria:**
- [ ] `/services/evaluationEngine/` directory structure created
- [ ] `EvaluationEngine.ts` main class with public API
- [ ] `index.ts` exports public API
- [ ] TypeScript interfaces for all core types
- [ ] README.md documenting the architecture

**Implementation:**
```
/services/evaluationEngine/
  index.ts                    # Public API exports
  EvaluationEngine.ts         # Main engine class
  README.md                   # Architecture documentation
  
  /ast/
    ASTNodes.ts              # AST node type definitions
    ASTBuilder.ts            # Helper for building AST
    
  /parsers/
    FormulaParser.ts         # Formula language parser
    Tokenizer.ts             # Lexical analysis
    
  /types/
    TypeSystem.ts            # Type definitions and checking
    
  /runtime/
    Evaluator.ts             # AST evaluation
    Context.ts               # Execution context
    FunctionRegistry.ts      # Built-in functions
    
  /threshold/
    ThresholdEvaluator.ts    # Threshold evaluation
    ThresholdValidator.ts    # Gap/overlap detection
    
  /errors/
    EvaluationError.ts       # Error types
```

### User Story 1.2: AST Node Definitions

**As a** developer  
**I want** comprehensive AST node type definitions  
**So that** I can represent any formula expression in a structured way

**Acceptance Criteria:**
- [ ] `ASTNode` base interface with location tracking
- [ ] Literal nodes: Number, String, Boolean, Date
- [ ] Reference nodes: Variable, Attribute
- [ ] Expression nodes: BinaryOp, UnaryOp, FunctionCall, IfExpression
- [ ] Statement nodes: Assignment, ReturnStatement, Program
- [ ] Union types for convenience (Expression, Statement, etc.)
- [ ] Full TypeScript type safety

**Files:**
- `/services/evaluationEngine/ast/ASTNodes.ts`

### User Story 1.3: Tokenizer (Lexical Analysis)

**As a** parser  
**I want** to convert source code into tokens  
**So that** I can build an Abstract Syntax Tree

**Acceptance Criteria:**
- [ ] Tokenize numbers (integers, floats): `42`, `3.14`
- [ ] Tokenize strings (single/double quotes): `"text"`, `'text'`
- [ ] Tokenize keywords: `IF`, `THEN`, `ELSE`, `ELSEIF`, `END`, `RETURN`, `AND`, `OR`, `NOT`, `TRUE`, `FALSE`
- [ ] Tokenize operators: `+`, `-`, `*`, `/`, `%`, `=`, `!=`, `<`, `>`, `<=`, `>=`
- [ ] Tokenize variables: `$variableName`
- [ ] Tokenize attributes: `#customer.age`
- [ ] Tokenize identifiers (function names): `ROUND`, `SUM`
- [ ] Tokenize parentheses and commas: `(`, `)`, `,`
- [ ] Skip whitespace and comments
- [ ] Track line/column for error reporting

**Files:**
- `/services/evaluationEngine/parsers/Tokenizer.ts`

**Test Cases:**
```typescript
describe('Tokenizer', () => {
  it('tokenizes numbers', () => {
    expect(tokenize('42')).toEqual([{ type: 'NUMBER', value: 42, line: 1, col: 1 }]);
    expect(tokenize('3.14')).toEqual([{ type: 'NUMBER', value: 3.14, line: 1, col: 1 }]);
  });
  
  it('tokenizes strings', () => {
    expect(tokenize('"hello"')).toEqual([{ type: 'STRING', value: 'hello', line: 1, col: 1 }]);
  });
  
  it('tokenizes variables', () => {
    expect(tokenize('$myVar')).toEqual([{ type: 'VARIABLE', name: 'myVar', line: 1, col: 1 }]);
  });
  
  it('tokenizes operators', () => {
    expect(tokenize('+ - * / = <=')).toHaveLength(6);
  });
});
```

### User Story 1.4: Basic Expression Parser

**As a** developer  
**I want** to parse arithmetic expressions into AST  
**So that** I can evaluate mathematical formulas

**Acceptance Criteria:**
- [ ] Parse number literals: `42`, `3.14`
- [ ] Parse variables: `$a`, `$price`
- [ ] Parse binary operations: `$a + $b`, `$x * 2`
- [ ] Parse parentheses: `($a + $b) * 2`
- [ ] Respect operator precedence: `*` before `+`
- [ ] Parse unary operations: `-$x`
- [ ] Generate correct AST structure
- [ ] Report parse errors with line/column

**Files:**
- `/services/evaluationEngine/parsers/FormulaParser.ts`

**Grammar (simplified for Phase 1):**
```
Expression = Additive

Additive = Multiplicative (('+' | '-') Multiplicative)*

Multiplicative = Unary (('*' | '/' | '%') Unary)*

Unary = ('-') Primary | Primary

Primary = NUMBER
        | VARIABLE
        | '(' Expression ')'
```

**Test Cases:**
```typescript
describe('FormulaParser - Basic Expressions', () => {
  it('parses number literals', () => {
    const ast = parse('42');
    expect(ast.type).toBe('Program');
    expect(ast.body[0].type).toBe('NumberLiteral');
  });
  
  it('parses simple addition', () => {
    const ast = parse('$a + $b');
    expect(ast.body[0].type).toBe('BinaryOp');
    expect(ast.body[0].operator).toBe('+');
  });
  
  it('respects operator precedence', () => {
    const ast = parse('$a + $b * 2');
    // Should be: $a + ($b * 2), not ($a + $b) * 2
    expect(ast.body[0].left.type).toBe('VariableRef');
    expect(ast.body[0].right.type).toBe('BinaryOp');
  });
  
  it('parses parentheses', () => {
    const ast = parse('($a + $b) * 2');
    expect(ast.body[0].left.type).toBe('BinaryOp');
  });
});
```

### User Story 1.5: Basic Evaluator

**As a** developer  
**I want** to evaluate simple arithmetic expressions  
**So that** I can compute formula results

**Acceptance Criteria:**
- [ ] Evaluate number literals: `42` → `42`
- [ ] Evaluate variable references using context
- [ ] Evaluate binary operations: `+`, `-`, `*`, `/`, `%`
- [ ] Evaluate unary operations: `-$x`
- [ ] Handle operator precedence correctly
- [ ] Throw error for undefined variables
- [ ] Handle division by zero (configurable)
- [ ] Return typed results

**Files:**
- `/services/evaluationEngine/runtime/Evaluator.ts`
- `/services/evaluationEngine/runtime/Context.ts`

**Test Cases:**
```typescript
describe('Evaluator - Basic Operations', () => {
  it('evaluates number literals', () => {
    const result = evaluate('42', {});
    expect(result.value).toBe(42);
  });
  
  it('evaluates simple addition', () => {
    const result = evaluate('$a + $b', { variables: { a: 10, b: 20 } });
    expect(result.value).toBe(30);
  });
  
  it('evaluates with precedence', () => {
    const result = evaluate('$a + $b * 2', { variables: { a: 10, b: 5 } });
    expect(result.value).toBe(20); // 10 + (5 * 2)
  });
  
  it('throws error for undefined variable', () => {
    const result = evaluate('$undefined', {});
    expect(result.success).toBe(false);
    expect(result.errors[0].type).toBe('UndefinedVariable');
  });
});
```

---

## Epic 2: Formula Language Support

**Goal:** Extend parser and evaluator to support full Formula language.

### User Story 2.1: Comparison and Logical Operators

**As a** user  
**I want** to write logical conditions in formulas  
**So that** I can implement decision logic

**Acceptance Criteria:**
- [ ] Parse comparison operators: `=`, `!=`, `<`, `>`, `<=`, `>=`
- [ ] Parse logical operators: `AND`, `OR`, `NOT`
- [ ] Evaluate comparison operations correctly
- [ ] Evaluate logical operations with short-circuit
- [ ] Support string and date comparisons
- [ ] Handle type coercion for comparisons

**Test Cases:**
```typescript
describe('Logical Operations', () => {
  it('evaluates comparisons', () => {
    expect(evaluate('$a > 10', { variables: { a: 15 } }).value).toBe(true);
    expect(evaluate('$a <= 10', { variables: { a: 15 } }).value).toBe(false);
  });
  
  it('evaluates logical AND', () => {
    expect(evaluate('$a > 10 AND $b < 5', { variables: { a: 15, b: 3 } }).value).toBe(true);
  });
  
  it('short-circuits OR', () => {
    // Should not evaluate second operand if first is true
    expect(evaluate('TRUE OR $undefined', {}).value).toBe(true);
  });
});
```

### User Story 2.2: IF/THEN/ELSE Control Flow

**As a** user  
**I want** conditional logic in formulas  
**So that** I can return different values based on conditions

**Acceptance Criteria:**
- [ ] Parse IF/THEN/ELSE/END blocks
- [ ] Parse ELSEIF branches
- [ ] Evaluate conditions and return appropriate branch
- [ ] Support nested IF expressions
- [ ] Only evaluate the branch that is taken (lazy evaluation)

**Test Cases:**
```typescript
describe('Control Flow', () => {
  it('evaluates simple IF/THEN/ELSE', () => {
    const formula = 'IF $age >= 18 THEN "adult" ELSE "minor" END';
    expect(evaluate(formula, { variables: { age: 20 } }).value).toBe('adult');
    expect(evaluate(formula, { variables: { age: 15 } }).value).toBe('minor');
  });
  
  it('evaluates ELSEIF branches', () => {
    const formula = `
      IF $score >= 90 THEN "A"
      ELSEIF $score >= 80 THEN "B"
      ELSEIF $score >= 70 THEN "C"
      ELSE "F"
      END
    `;
    expect(evaluate(formula, { variables: { score: 85 } }).value).toBe('B');
  });
  
  it('supports nested IF', () => {
    const formula = `
      IF $age >= 18 THEN
        IF $hasLicense THEN "can drive" ELSE "cannot drive" END
      ELSE
        "too young"
      END
    `;
    expect(evaluate(formula, { variables: { age: 20, hasLicense: true } }).value).toBe('can drive');
  });
});
```

### User Story 2.3: Built-in Functions

**As a** user  
**I want** to use built-in functions in formulas  
**So that** I can perform common operations

**Acceptance Criteria:**
- [ ] Function registry for registering functions
- [ ] Parse function calls: `ROUND($price, 2)`
- [ ] Evaluate function calls with arguments
- [ ] Implement arithmetic functions: `ROUND`, `FLOOR`, `CEIL`, `ABS`, `SQRT`, `POW`
- [ ] Implement aggregate functions: `SUM`, `AVG`, `MAX`, `MIN`, `COUNT`
- [ ] Implement string functions: `CONCAT`, `UPPER`, `LOWER`, `TRIM`, `LEN`
- [ ] Validate argument count and types

**Files:**
- `/services/evaluationEngine/runtime/FunctionRegistry.ts`
- `/services/evaluationEngine/runtime/functions/` (built-in function implementations)

**Test Cases:**
```typescript
describe('Built-in Functions', () => {
  it('evaluates ROUND function', () => {
    expect(evaluate('ROUND($price, 2)', { variables: { price: 3.14159 } }).value).toBe(3.14);
  });
  
  it('evaluates SUM function', () => {
    expect(evaluate('SUM($a, $b, $c)', { variables: { a: 10, b: 20, c: 30 } }).value).toBe(60);
  });
  
  it('evaluates string functions', () => {
    expect(evaluate('UPPER($name)', { variables: { name: 'john' } }).value).toBe('JOHN');
    expect(evaluate('LEN($text)', { variables: { text: 'hello' } }).value).toBe(5);
  });
  
  it('throws error for wrong argument count', () => {
    const result = evaluate('ROUND($x)', { variables: { x: 3.14 } });
    expect(result.success).toBe(false);
    expect(result.errors[0].message).toContain('expected 2 arguments');
  });
});
```

### User Story 2.4: Attribute Access

**As a** user  
**I want** to access nested object properties  
**So that** I can reference data model attributes

**Acceptance Criteria:**
- [ ] Parse attribute paths: `#customer.age`, `#order.total`
- [ ] Evaluate attribute access from context
- [ ] Handle nested attributes: `#customer.address.city`
- [ ] Throw error for undefined attributes
- [ ] Provide helpful error messages

**Test Cases:**
```typescript
describe('Attribute Access', () => {
  it('evaluates simple attributes', () => {
    const context = {
      attributes: {
        'customer.age': 30
      }
    };
    expect(evaluate('#customer.age', context).value).toBe(30);
  });
  
  it('evaluates nested attributes', () => {
    const context = {
      attributes: {
        'customer': {
          address: {
            city: 'New York'
          }
        }
      }
    };
    expect(evaluate('#customer.address.city', context).value).toBe('New York');
  });
  
  it('throws error for undefined attribute', () => {
    const result = evaluate('#nonexistent', {});
    expect(result.success).toBe(false);
    expect(result.errors[0].type).toBe('UndefinedAttribute');
  });
});
```

### User Story 2.5: RETURN Statement Support

**As a** user  
**I want** to use explicit RETURN statements  
**So that** I can match IBM ADS/ODM conventions

**Acceptance Criteria:**
- [ ] Parse RETURN statement: `RETURN $result`
- [ ] Evaluate and return the expression value
- [ ] Support implicit return (last expression)
- [ ] Both styles work equivalently

**Test Cases:**
```typescript
describe('RETURN Statement', () => {
  it('evaluates explicit RETURN', () => {
    const formula = `
      $total = $a + $b
      RETURN $total * 2
    `;
    expect(evaluate(formula, { variables: { a: 10, b: 5 } }).value).toBe(30);
  });
  
  it('evaluates implicit return', () => {
    const formula = '$a + $b';
    expect(evaluate(formula, { variables: { a: 10, b: 5 } }).value).toBe(15);
  });
});
```

---

## Epic 3: Threshold Evaluation Integration

**Goal:** Integrate threshold evaluation with intelligent gap handling.

### User Story 3.1: Threshold Evaluator Core

**As a** developer  
**I want** a threshold evaluation service  
**So that** I can map values to outcomes based on ranges

**Acceptance Criteria:**
- [ ] `ThresholdEvaluator` class created
- [ ] Support all threshold operators: `<`, `<=`, `>`, `>=`, `=`, `!=`, `BETWEEN`, `NOT_BETWEEN`
- [ ] Evaluate single condition thresholds
- [ ] Evaluate multi-condition thresholds (AND/OR)
- [ ] Return matched threshold value
- [ ] Handle multiple matches with priority resolution

**Files:**
- `/services/evaluationEngine/threshold/ThresholdEvaluator.ts`

**Test Cases:**
```typescript
describe('ThresholdEvaluator', () => {
  it('evaluates simple threshold', () => {
    const thresholds = [
      { condition: { operator: '>=', value: 800 }, value: 'Excellent' },
      { condition: { operator: 'BETWEEN', value: [700, 799] }, value: 'Good' },
      { condition: { operator: '<', value: 700 }, value: 'Fair' }
    ];
    
    expect(evaluateThreshold(850, thresholds).value).toBe('Excellent');
    expect(evaluateThreshold(750, thresholds).value).toBe('Good');
    expect(evaluateThreshold(650, thresholds).value).toBe('Fair');
  });
});
```

### User Story 3.2: Gap Detection and Handling

**As a** user  
**I want** intelligent gap handling in thresholds  
**So that** my evaluations don't fail on edge values like 40.1 when I have <=40, >41

**Acceptance Criteria:**
- [ ] `ThresholdValidator` detects gaps between thresholds
- [ ] Support all 7 gap strategies: error, default, null, nearest, interpolate, lower, upper
- [ ] "Nearest" strategy finds closest threshold boundary
- [ ] "Interpolate" strategy calculates value between thresholds
- [ ] Warning messages for detected gaps
- [ ] Configurable gap strategy per threshold set

**Files:**
- `/services/evaluationEngine/threshold/ThresholdValidator.ts`

**Test Cases:**
```typescript
describe('Gap Handling', () => {
  const thresholdsWithGap = [
    { condition: { operator: '<=', value: 40 }, value: 'Low' },
    { condition: { operator: '>', value: 41 }, value: 'High' }
  ];
  
  it('detects gaps', () => {
    const validation = validateThresholds(thresholdsWithGap);
    expect(validation.gaps).toHaveLength(1);
    expect(validation.gaps[0]).toEqual({ min: 40, max: 41 });
  });
  
  it('handles gap with nearest strategy', () => {
    const result = evaluateThreshold(40.1, thresholdsWithGap, { gapStrategy: 'nearest' });
    expect(result.value).toBe('Low'); // Closer to 40
    
    const result2 = evaluateThreshold(40.9, thresholdsWithGap, { gapStrategy: 'nearest' });
    expect(result2.value).toBe('High'); // Closer to 41
  });
  
  it('handles gap with interpolate strategy', () => {
    const numericThresholds = [
      { condition: { operator: '<=', value: 40 }, value: 10 },
      { condition: { operator: '>', value: 41 }, value: 20 }
    ];
    
    const result = evaluateThreshold(40.5, numericThresholds, { gapStrategy: 'interpolate' });
    expect(result.value).toBe(15); // Midpoint between 10 and 20
  });
  
  it('throws error with error strategy', () => {
    const result = evaluateThreshold(40.5, thresholdsWithGap, { gapStrategy: 'error' });
    expect(result.success).toBe(false);
    expect(result.errors[0].type).toBe('GapError');
  });
});
```

### User Story 3.3: THRESHOLD() Function

**As a** user  
**I want** to use THRESHOLD() in formulas  
**So that** I can map values to categories directly in expressions

**Acceptance Criteria:**
- [ ] Register THRESHOLD() function in function registry
- [ ] Accept (value, thresholdSetName) parameters
- [ ] Lookup threshold set from context
- [ ] Evaluate and return threshold result
- [ ] Propagate threshold evaluation errors

**Test Cases:**
```typescript
describe('THRESHOLD Function', () => {
  it('evaluates THRESHOLD function in formula', () => {
    const formula = 'THRESHOLD($creditScore, "creditRating")';
    const context = {
      variables: { creditScore: 750 },
      thresholdSets: {
        creditRating: {
          thresholds: [
            { condition: { operator: '>=', value: 750 }, value: 'Excellent' },
            { condition: { operator: '<', value: 750 }, value: 'Good' }
          ],
          gapStrategy: 'error'
        }
      }
    };
    
    expect(evaluate(formula, context).value).toBe('Excellent');
  });
  
  it('uses threshold in IF condition', () => {
    const formula = `
      IF THRESHOLD($score, "rating") = "Excellent" THEN
        "Approved"
      ELSE
        "Review"
      END
    `;
    // Test evaluation...
  });
});
```

---

## Epic 4: Test Panel Integration

**Goal:** Replace mock evaluation in Formula Test Panel with real engine.

### User Story 4.1: Engine Integration

**As a** user  
**I want** the Formula Test Panel to execute real formulas  
**So that** I can test my logic accurately

**Acceptance Criteria:**
- [ ] Import EvaluationEngine in FormulaTestPanel
- [ ] Replace mock evaluation with engine.evaluate()
- [ ] Pass variable values from test inputs to engine context
- [ ] Pass attribute values to engine context
- [ ] Display real evaluation results
- [ ] Show evaluation errors with helpful messages
- [ ] All existing test panel features continue to work

**Files to Modify:**
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`

**Changes:**
```typescript
// Before (mock):
let mockResult: any;
if (formulaReturnType === 'number') {
  mockResult = 42.5;
}

// After (real evaluation):
import { EvaluationEngine } from '../../../../../services/evaluationEngine';

const engine = new EvaluationEngine();
const result = engine.evaluate(formulaCode, {
  variables: new Map(testInputs.map(input => [input.name, input.value])),
  attributes: new Map(Object.entries(attributeValues))
});

if (result.success) {
  setEvaluationResult(result.value);
} else {
  setErrors(result.errors);
}
```

### User Story 4.2: Error Display

**As a** user  
**I want** clear error messages when my formula has problems  
**So that** I can fix issues quickly

**Acceptance Criteria:**
- [ ] Display parse errors with line/column
- [ ] Display runtime errors with context
- [ ] Show suggestions for common mistakes (typos, undefined variables)
- [ ] Highlight error location in formula (if possible)
- [ ] Errors don't crash the UI

**UI Additions:**
```tsx
{result.errors && result.errors.length > 0 && (
  <div className={styles.errors}>
    {result.errors.map((error, i) => (
      <div key={i} className={styles.error}>
        <AlertCircle className={styles.errorIcon} />
        <div>
          <div className={styles.errorMessage}>{error.message}</div>
          {error.location && (
            <div className={styles.errorLocation}>
              Line {error.location.start.line}, Column {error.location.start.column}
            </div>
          )}
          {error.suggestions && error.suggestions.length > 0 && (
            <div className={styles.suggestions}>
              Did you mean: {error.suggestions.join(', ')}?
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
)}
```

### User Story 4.3: Performance Metrics

**As a** developer  
**I want** to see formula evaluation performance  
**So that** I can optimize slow formulas

**Acceptance Criteria:**
- [ ] Display parse time
- [ ] Display evaluation time
- [ ] Display total time
- [ ] Show metrics in ms with appropriate precision
- [ ] Highlight slow evaluations (>100ms)

**UI Addition:**
```tsx
{result.metrics && (
  <div className={styles.metrics}>
    <div className={styles.metric}>
      <span>Parse:</span> <span>{result.metrics.parseTimeMs.toFixed(2)}ms</span>
    </div>
    <div className={styles.metric}>
      <span>Eval:</span> <span>{result.metrics.evalTimeMs.toFixed(2)}ms</span>
    </div>
    <div className={styles.metric}>
      <span>Total:</span> 
      <span className={result.metrics.totalTimeMs > 100 ? styles.slow : ''}>
        {result.metrics.totalTimeMs.toFixed(2)}ms
      </span>
    </div>
  </div>
)}
```

---

## Epic 5: Edge Cases & Error Handling

**Goal:** Ensure robust error handling for all edge cases.

### User Story 5.1: Null/Undefined Handling

**As a** system  
**I want** to handle null and undefined values gracefully  
**So that** formulas don't crash on missing data

**Acceptance Criteria:**
- [ ] Clear error for null/undefined variable access
- [ ] Clear error for null/undefined attribute access
- [ ] Configurable null propagation behavior
- [ ] Helpful error messages indicating which variable/attribute is null

### User Story 5.2: Type Safety

**As a** system  
**I want** to validate types at runtime  
**So that** type mismatches are caught with clear errors

**Acceptance Criteria:**
- [ ] Type checking for binary operations
- [ ] Type checking for function arguments
- [ ] Clear error messages for type mismatches
- [ ] Configurable type coercion rules

### User Story 5.3: Division by Zero

**As a** system  
**I want** to handle division by zero  
**So that** formulas don't crash on edge cases

**Acceptance Criteria:**
- [ ] Configurable division by zero behavior: error, infinity, NaN, null
- [ ] Default to throwing error
- [ ] Clear error message indicating division by zero

### User Story 5.4: Floating Point Precision

**As a** system  
**I want** to handle floating point comparisons correctly  
**So that** 0.1 + 0.2 = 0.3 works as expected

**Acceptance Criteria:**
- [ ] Use epsilon for floating point comparisons
- [ ] Configurable arithmetic precision (decimal places)
- [ ] Round results to avoid precision artifacts

---

## Implementation Phases

### Phase 1: Foundation (This Sprint - Days 1-3) ✅ COMPLETE

**Day 1: Structure & Tokenizer** ✅
- [x] Create `/services/evaluationEngine/` structure
- [x] Implement AST node definitions
- [x] Implement Tokenizer
- [x] Write tokenizer tests

**Day 2: Parser & Basic Evaluator** ✅
- [x] Implement basic expression parser (arithmetic)
- [x] Implement basic evaluator (arithmetic operations)
- [x] Write parser and evaluator tests
- [x] Test with simple formulas

**Day 3: Test Panel Integration** ✅
- [x] Integrate engine with FormulaTestPanel
- [x] Replace mock evaluation
- [x] Test with existing formulas
- [x] Verify zero regression

### Implementation Summary

**Files Created:**
```
/services/evaluationEngine/
  index.ts                         # Public API exports
  EvaluationEngine.ts              # Main engine class with compile/evaluate
  README.md                        # Comprehensive documentation
  
  /ast/
    ASTNodes.ts                   # 15+ AST node types with type guards
    
  /parsers/
    Tokenizer.ts                  # Lexical analysis with line/column tracking
    FormulaParser.ts              # Recursive descent parser
    
  /runtime/
    Evaluator.ts                  # AST evaluation with resource limits
    Context.ts                    # Execution context management
    FunctionRegistry.ts           # 20+ built-in functions
    
  /types/
    TypeSystem.ts                 # Type inference and coercion
    
  /errors/
    EvaluationError.ts            # 10+ error types with helpful messages
```

**Files Modified:**
```
/components/editors/code/FormulaEditor/FormulaTestPanel.tsx
  - Added import of EvaluationEngine
  - Replaced mock evaluation with real engine.evaluate()
  - Updated result hint message
```

**What Works Now:**
1. ✅ **Arithmetic**: `$a + $b * 2` evaluates correctly
2. ✅ **Comparisons**: `$age > 18` returns boolean
3. ✅ **Logical operators**: `$a > 10 AND $b < 5` with short-circuit
4. ✅ **IF/THEN/ELSE**: Full conditional logic with ELSEIF
5. ✅ **Functions**: ROUND, SUM, AVG, UPPER, etc.
6. ✅ **Variables**: `$variableName` lookup from context
7. ✅ **Attributes**: `#customer.age` from attribute context
8. ✅ **RETURN**: Optional RETURN keyword (IBM ADS/ODM compatible)
9. ✅ **Error reporting**: Line/column errors with suggestions
10. ✅ **Type checking**: Runtime type validation
11. ✅ **Resource limits**: Timeout and iteration limits
12. ✅ **Formula Test Panel**: Real evaluation instead of mock

**Example Formulas That Now Work:**

```
// Simple arithmetic
$total = $price * $quantity
RETURN $total

// Conditional logic
IF $age >= 18 THEN
  "adult"
ELSE
  "minor"
END

// With functions
$average = AVG($test1, $test2, $test3)
IF $average >= 90 THEN "A"
ELSEIF $average >= 80 THEN "B"
ELSE "C"
END

// Attribute access
IF #customer.creditScore > 700 AND #customer.income > 50000 THEN
  "approved"
ELSE
  "denied"
END
```

---

## Testing Strategy

### Unit Tests

**Parser Tests:**
- Tokenization of all token types
- Parsing of all expression types
- Error recovery and reporting
- Edge cases (empty input, very long input)

**Evaluator Tests:**
- All operators (arithmetic, logical, comparison)
- Control flow (IF/THEN/ELSE, nested)
- Function calls
- Variable and attribute access
- Error cases (undefined variables, type mismatches)

**Threshold Tests:**
- All gap handling strategies
- Gap detection
- Overlap detection
- Floating point edge cases
- Multi-condition thresholds

### Integration Tests

**Formula Test Panel:**
- Evaluate simple formulas
- Evaluate complex formulas with control flow
- Handle evaluation errors gracefully
- Display results correctly
- Show performance metrics

### Regression Tests

**Existing Functionality:**
- All existing formula samples continue to work
- Syntax highlighting still works
- Autocomplete still works
- Variable table still works
- Threshold configuration UI still works

---

## Acceptance Criteria (Overall)

### Must Have (Sprint Goal)

- [ ] EvaluationEngine evaluates basic arithmetic: `$a + $b * 2`
- [ ] EvaluationEngine evaluates logical expressions: `$age > 18 AND $hasLicense`
- [ ] EvaluationEngine evaluates IF/THEN/ELSE: `IF $x > 0 THEN "pos" ELSE "neg" END`
- [ ] Built-in functions work: `ROUND($price, 2)`, `SUM($a, $b)`
- [ ] Attribute access works: `#customer.age`
- [ ] ThresholdEvaluator handles gaps with "nearest" strategy
- [ ] FormulaTestPanel uses real evaluation instead of mock
- [ ] All existing formulas continue to work (zero regression)
- [ ] Error messages are clear and helpful

### Nice to Have (Future Sprints)

- [ ] All 7 gap handling strategies implemented
- [ ] Execution trace for debugging
- [ ] Performance optimization (AST caching)
- [ ] Web Worker support for batch evaluation
- [ ] BAL language support

---

## Risk Assessment

### High Risk

**Risk:** Parser complexity leads to bugs  
**Mitigation:** Comprehensive unit tests, start with simple grammar, incrementally add features

**Risk:** Breaking existing Formula Test Panel  
**Mitigation:** Integration tests, careful API replacement, feature flags for rollback

**Risk:** Performance degradation  
**Mitigation:** Performance benchmarks, keep evaluation simple, optimize later

### Medium Risk

**Risk:** Type system complexity  
**Mitigation:** Start with simple type checking, add coercion later

**Risk:** Error messages are confusing  
**Mitigation:** User testing, iterate on error message clarity

### Low Risk

**Risk:** Integration with existing code  
**Mitigation:** Clean service boundary, minimal API surface

---

## Success Metrics

### Functional Success

- [ ] 100% of sample formulas evaluate correctly
- [ ] Zero regressions in existing tests
- [ ] Error rate < 5% for valid formulas
- [ ] Parse and evaluation errors have line/column info

### Performance Success

- [ ] Simple formula evaluation: <5ms
- [ ] Complex formula evaluation: <50ms
- [ ] No UI blocking during evaluation
- [ ] Threshold evaluation: <10ms

### Quality Success

- [ ] 80%+ code coverage for evaluationEngine
- [ ] All public APIs documented
- [ ] README.md with architecture overview
- [ ] Zero console errors or warnings

---

## Documentation Deliverables

### Code Documentation

- [ ] `/services/evaluationEngine/README.md` - Architecture overview
- [ ] JSDoc comments for all public APIs
- [ ] Type definitions for all interfaces
- [ ] Examples in comments

### Change Log

- [ ] This document (v07) updated with implementation notes
- [ ] Update index.md with link to this document

### User Documentation

- [ ] (Future) Formula language reference
- [ ] (Future) Built-in function reference
- [ ] (Future) Threshold configuration guide

---

## Next Steps After Implementation

### Immediate

1. Monitor for bugs and edge cases
2. Gather user feedback on error messages
3. Performance profiling and optimization

### Short-term (Next Sprint)

1. Add execution trace for debugging
2. Implement remaining gap handling strategies
3. Add more built-in functions based on user needs
4. AST caching for better performance

### Long-term (Future Sprints)

1. Web Worker support for batch evaluation
2. BAL language parser and evaluator
3. Visual formula builder
4. Server-side API endpoints

---

## References

- [v04 - Formula Engine Architecture Plan](./25-10-25_v04-FormulaEngineArchitecturePlan.md)
- [v05 - Formula Engine Architecture Addendum](./25-10-25_v05-FormulaEngineArchitectureAddendum.md)
- [v06 - Threshold Evaluation Architecture](./25-10-25_v06-ThresholdEvaluationArchitecture.md)
- [Guidelines.md](../guidelines/Guidelines.md)
- Existing: `/utils/formulaParser.ts`
- Existing: `/utils/thresholdEvaluation.ts`
- Existing: `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`