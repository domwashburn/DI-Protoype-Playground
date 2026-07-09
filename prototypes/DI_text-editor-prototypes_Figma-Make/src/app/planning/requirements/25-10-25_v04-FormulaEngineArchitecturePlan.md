# v04 - Formula & BAL Evaluation Engine Architecture Plan

**Date:** October 25, 2025  
**Type:** Architectural Planning  
**Scope:** Formula Editor, BAL Editor, Testing Infrastructure  
**Status:** Planning Phase - Not Yet Implemented

---

## Executive Summary

This document outlines the architecture for a unified evaluation engine capable of:
1. **Formula evaluation** - Mathematical/logical expressions with IF/THEN/ELSE control flow
2. **BAL evaluation** - Business Action Language rule evaluation for testing
3. **Extensibility** - Plugin architecture for future language additions
4. **Type safety** - Strong typing with runtime validation
5. **Performance** - Compiled evaluation for production use

**Key Design Principles:**
- **Unified AST** - Single Abstract Syntax Tree representation for all languages
- **Pluggable parsers** - Language-specific parsers produce common AST
- **Compiled evaluation** - Parse once, evaluate many times
- **Testability** - Mock-friendly, dependency-injectable design
- **IBM compatibility** - Supports IBM ADS/ODM conventions

---

## Table of Contents

1. [Current State Analysis](#current-state-analysis)
2. [Requirements](#requirements)
3. [Architecture Overview](#architecture-overview)
4. [Component Design](#component-design)
5. [Language Support](#language-support)
6. [Type System](#type-system)
7. [Execution Model](#execution-model)
8. [Testing Strategy](#testing-strategy)
9. [API Design](#api-design)
10. [Implementation Phases](#implementation-phases)
11. [Integration Points](#integration-points)
12. [Performance Considerations](#performance-considerations)
13. [Error Handling](#error-handling)
14. [Future Enhancements](#future-enhancements)

---

## Current State Analysis

### Formula Editor Mock Evaluation

**Location:** `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`

**Current Behavior:**
```typescript
// Mock evaluation (replace with real formula engine)
// For demo, just compute a simple result based on return type
let mockResult: any;
if (formulaReturnType === 'number') {
  mockResult = 42.5;
} else if (formulaReturnType === 'string') {
  mockResult = 'Sample Result';
} else if (formulaReturnType === 'boolean') {
  mockResult = true;
} else if (formulaReturnType === 'date') {
  mockResult = '2025-10-25';
}
```

**Limitations:**
- Doesn't actually parse or execute formulas
- Ignores input values
- Returns hardcoded results
- No validation of formula correctness
- No support for complex logic

### BAL Editor Testing

**Location:** `/components/BALEditorTestSuite/BALEditorTestSuite.tsx`

**Current State:**
- BAL editor exists but has no evaluation capability
- No way to test BAL rules with sample data
- No validation of BAL syntax correctness
- Limited to syntax highlighting only

### Parsing Infrastructure

**Existing:**
- `formulaParser.ts` - Variable extraction (regex-based, limited)
- `formulaTestUtils.ts` - Test input detection
- `useFormulaSyntax.ts` - Syntax highlighting (regex-based)
- `useFormulaValidation.ts` - Basic undefined variable detection

**Missing:**
- Actual expression parser (AST generation)
- Type checker
- Runtime evaluator
- Error recovery
- Semantic analysis

---

## Requirements

### Functional Requirements

**FR1 - Formula Evaluation:**
- Execute mathematical expressions: `$a + $b * 2`
- Evaluate logical expressions: `$age > 18 AND $hasLicense = true`
- Handle control flow: `IF/THEN/ELSE/ELSEIF/END`
- Support built-in functions: `SUM()`, `AVG()`, `ROUND()`, etc.
- Variable substitution: `$variableName` → actual value
- Attribute access: `#customer.creditScore`
- Optional RETURN statements (IBM ADS/ODM compatibility)

**FR2 - BAL Evaluation:**
- Execute business rules: `WHEN order.total > 1000 THEN apply discount of 10%`
- Support decision tables
- Handle rule sets and rule flows
- Priority-based rule execution
- Conflict resolution strategies

**FR3 - Type System:**
- Support types: `number`, `string`, `boolean`, `date`
- Type inference where possible
- Type coercion with warnings
- Runtime type validation
- Date format handling (user-selectable formats)

**FR4 - Testing Support:**
- Execute with mock variable values
- Support multiple test cases
- Compare expected vs. actual results
- Execution trace for debugging
- Performance metrics

**FR5 - Error Handling:**
- Parse errors with line/column information
- Runtime errors with context
- Type mismatch warnings
- Undefined variable detection
- Division by zero handling

### Non-Functional Requirements

**NFR1 - Performance:**
- Parse to AST once, evaluate many times
- Target: <10ms for typical formula evaluation
- Support for 1000+ variables without degradation

**NFR2 - Developer Experience:**
- Clear error messages
- TypeScript-first API
- Easy to test and mock
- Comprehensive documentation

**NFR3 - Extensibility:**
- Plugin architecture for new functions
- Custom operator support
- Language extension points

**NFR4 - Security:**
- Sandboxed execution (no access to global scope)
- Input validation
- Resource limits (max iterations, max call stack)

---

## Architecture Overview

### High-Level Design

```
┌─────────────────────────────────────────────────────────────┐
│                     Evaluation Engine                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐                     │
│  │   Formula    │      │     BAL      │                     │
│  │   Parser     │      │   Parser     │   (Pluggable)       │
│  └──────┬───────┘      └──────┬───────┘                     │
│         │                      │                             │
│         └──────────┬───────────┘                             │
│                    ▼                                          │
│         ┌─────────────────────┐                             │
│         │   Common AST        │  (Unified representation)   │
│         └──────────┬──────────┘                             │
│                    │                                          │
│         ┌──────────▼──────────┐                             │
│         │  Type Checker       │  (Semantic analysis)        │
│         └──────────┬──────────┘                             │
│                    │                                          │
│         ┌──────────▼──────────┐                             │
│         │  AST Optimizer      │  (Optional)                 │
│         └──────────┬──────────┘                             │
│                    │                                          │
│         ┌──────────▼──────────┐                             │
│         │  Runtime Evaluator  │  (Execution)                │
│         └──────────┬──────────┘                             │
│                    │                                          │
│         ┌──────────▼──────────┐                             │
│         │   Result + Trace    │  (Output)                   │
│         └─────────────────────┘                             │
│                                                               │
└─────────────────────────────────────────────────────────────┘

      ▲                                          ▲
      │                                          │
┌─────┴──────┐                          ┌───────┴────────┐
│ Formula    │                          │  BAL Test      │
│ Test Panel │                          │  Suite         │
└────────────┘                          └────────────────┘
```

### Component Layers

**Layer 1 - Parser Layer:**
- Language-specific parsers (Formula, BAL)
- Lexical analysis (tokenization)
- Syntax analysis (AST construction)
- Error recovery

**Layer 2 - Semantic Layer:**
- Type checking
- Variable resolution
- Function validation
- AST optimization (optional)

**Layer 3 - Runtime Layer:**
- Expression evaluation
- Variable binding
- Function execution
- Control flow management

**Layer 4 - Integration Layer:**
- Test panel integration
- Editor validation integration
- Results formatting
- Trace visualization

---

## Component Design

### 1. Evaluation Engine Core

**Location:** `/services/evaluationEngine/`

**Structure:**
```
/services/evaluationEngine/
  index.ts                      # Public API exports
  EvaluationEngine.ts           # Main engine class
  
  /parsers/
    FormulaParser.ts            # Formula language parser
    BALParser.ts                # BAL parser (future)
    ParserInterface.ts          # Parser contract
    
  /ast/
    ASTNodes.ts                 # AST node definitions
    ASTVisitor.ts               # Visitor pattern for AST traversal
    ASTBuilder.ts               # Helper for building AST
    
  /types/
    TypeChecker.ts              # Type checking logic
    TypeInference.ts            # Type inference
    TypeDefinitions.ts          # Type system definitions
    
  /runtime/
    Evaluator.ts                # AST evaluation
    Context.ts                  # Execution context
    FunctionRegistry.ts         # Built-in functions
    OperatorRegistry.ts         # Operators
    
  /errors/
    EvaluationError.ts          # Error types
    ErrorFormatter.ts           # User-friendly error messages
    
  /utils/
    helpers.ts                  # Utility functions
```

### 2. AST Node Definitions

**Core AST Types:**

```typescript
// /services/evaluationEngine/ast/ASTNodes.ts

/**
 * Base node interface - all AST nodes extend this
 */
export interface ASTNode {
  type: string;
  location?: SourceLocation;
}

export interface SourceLocation {
  start: { line: number; column: number };
  end: { line: number; column: number };
}

/**
 * Literal values
 */
export interface NumberLiteral extends ASTNode {
  type: 'NumberLiteral';
  value: number;
}

export interface StringLiteral extends ASTNode {
  type: 'StringLiteral';
  value: string;
}

export interface BooleanLiteral extends ASTNode {
  type: 'BooleanLiteral';
  value: boolean;
}

export interface DateLiteral extends ASTNode {
  type: 'DateLiteral';
  value: string; // ISO 8601 format
}

/**
 * Variable and attribute references
 */
export interface VariableRef extends ASTNode {
  type: 'VariableRef';
  name: string;
}

export interface AttributeRef extends ASTNode {
  type: 'AttributeRef';
  path: string[]; // e.g., ['customer', 'creditScore']
}

/**
 * Binary operations
 */
export interface BinaryOp extends ASTNode {
  type: 'BinaryOp';
  operator: '+' | '-' | '*' | '/' | '%' | 
            '=' | '!=' | '<' | '>' | '<=' | '>=' |
            'AND' | 'OR';
  left: Expression;
  right: Expression;
}

/**
 * Unary operations
 */
export interface UnaryOp extends ASTNode {
  type: 'UnaryOp';
  operator: '-' | 'NOT';
  operand: Expression;
}

/**
 * Function calls
 */
export interface FunctionCall extends ASTNode {
  type: 'FunctionCall';
  name: string;
  args: Expression[];
}

/**
 * Conditional expressions
 */
export interface IfExpression extends ASTNode {
  type: 'IfExpression';
  condition: Expression;
  thenBranch: Expression;
  elseIfBranches?: Array<{ condition: Expression; body: Expression }>;
  elseBranch?: Expression;
}

/**
 * Assignment (for intermediate variables)
 */
export interface Assignment extends ASTNode {
  type: 'Assignment';
  variable: string;
  value: Expression;
}

/**
 * Return statement (optional, IBM ADS/ODM compatibility)
 */
export interface ReturnStatement extends ASTNode {
  type: 'ReturnStatement';
  value: Expression;
}

/**
 * Program (top-level)
 */
export interface Program extends ASTNode {
  type: 'Program';
  body: Statement[];
  returnValue?: Expression; // Implicit return (last expression)
}

/**
 * Union types for convenience
 */
export type Literal = NumberLiteral | StringLiteral | BooleanLiteral | DateLiteral;
export type Expression = 
  | Literal
  | VariableRef
  | AttributeRef
  | BinaryOp
  | UnaryOp
  | FunctionCall
  | IfExpression;

export type Statement = 
  | Assignment
  | ReturnStatement
  | Expression;
```

### 3. Parser Interface

**Contract for all language parsers:**

```typescript
// /services/evaluationEngine/parsers/ParserInterface.ts

import type { Program } from '../ast/ASTNodes';
import type { ParseError } from '../errors/EvaluationError';

export interface ParserResult {
  success: boolean;
  ast?: Program;
  errors: ParseError[];
}

export interface IParser {
  /**
   * Parse source code into AST
   * @param source - Source code string
   * @returns Parse result with AST or errors
   */
  parse(source: string): ParserResult;
  
  /**
   * Get parser name for error messages
   */
  getName(): string;
}
```

### 4. Execution Context

**Runtime execution context:**

```typescript
// /services/evaluationEngine/runtime/Context.ts

export interface ExecutionContext {
  /**
   * Variable bindings (test values or actual data)
   */
  variables: Map<string, any>;
  
  /**
   * Attribute values (from data model)
   */
  attributes: Map<string, any>;
  
  /**
   * Function registry
   */
  functions: FunctionRegistry;
  
  /**
   * Execution trace (for debugging)
   */
  trace?: ExecutionTrace;
  
  /**
   * Resource limits
   */
  limits: {
    maxIterations: number;
    maxCallDepth: number;
    timeoutMs: number;
  };
}

export interface ExecutionTrace {
  steps: TraceStep[];
}

export interface TraceStep {
  type: 'variable-access' | 'function-call' | 'operation' | 'condition';
  node: ASTNode;
  value?: any;
  timestamp: number;
}
```

### 5. Evaluation Result

**Result of evaluation:**

```typescript
// /services/evaluationEngine/runtime/Evaluator.ts

export interface EvaluationResult {
  /**
   * Success status
   */
  success: boolean;
  
  /**
   * Evaluated value (if success)
   */
  value?: any;
  
  /**
   * Runtime errors (if any)
   */
  errors: RuntimeError[];
  
  /**
   * Execution trace (if enabled)
   */
  trace?: ExecutionTrace;
  
  /**
   * Performance metrics
   */
  metrics: {
    parseTimeMs: number;
    evalTimeMs: number;
    totalTimeMs: number;
  };
  
  /**
   * Type information
   */
  resultType?: 'number' | 'string' | 'boolean' | 'date';
}
```

---

## Language Support

### Formula Language Specification

**Grammar (EBNF-style):**

```
Program         = Statement* Expression?

Statement       = Assignment | ReturnStatement

Assignment      = "$" Identifier "=" Expression

ReturnStatement = "RETURN" Expression

Expression      = IfExpression
                | LogicalOr

IfExpression    = "IF" Expression "THEN" Expression
                  ("ELSEIF" Expression "THEN" Expression)*
                  ("ELSE" Expression)?
                  "END"

LogicalOr       = LogicalAnd ("OR" LogicalAnd)*

LogicalAnd      = Comparison ("AND" Comparison)*

Comparison      = Additive (CompOp Additive)*

CompOp          = "=" | "!=" | "<" | ">" | "<=" | ">="

Additive        = Multiplicative (AddOp Multiplicative)*

AddOp           = "+" | "-"

Multiplicative  = Unary (MulOp Unary)*

MulOp           = "*" | "/" | "%"

Unary           = UnaryOp Primary
                | Primary

UnaryOp         = "-" | "NOT"

Primary         = NumberLiteral
                | StringLiteral
                | BooleanLiteral
                | DateLiteral
                | VariableRef
                | AttributeRef
                | FunctionCall
                | "(" Expression ")"

VariableRef     = "$" Identifier

AttributeRef    = "#" Identifier ("." Identifier)*

FunctionCall    = Identifier "(" (Expression ("," Expression)*)? ")"

NumberLiteral   = [0-9]+ ("." [0-9]+)?

StringLiteral   = '"' [^"]* '"' | "'" [^']* "'"

BooleanLiteral  = "TRUE" | "FALSE" | "true" | "false"

DateLiteral     = '"' [0-9]{4}-[0-9]{2}-[0-9]{2} '"'

Identifier      = [a-zA-Z_][a-zA-Z0-9_]*
```

**Example Formulas:**

```
// Simple expression
$result = $a + $b * 2

// Conditional
IF $age > 18 THEN
  "adult"
ELSE
  "minor"
END

// Complex with functions
$score = ROUND(AVG($test1, $test2, $test3), 2)
IF $score >= 90 THEN
  "A"
ELSEIF $score >= 80 THEN
  "B"
ELSE
  "C"
END

// Attribute access
$creditScore = #customer.creditScore
IF $creditScore > 700 AND #customer.income > 50000 THEN
  RETURN "approved"
ELSE
  RETURN "denied"
END
```

### BAL Language Specification

**Note:** BAL parser is future work. This section provides initial design.

**Grammar concepts:**

```
Rule            = "WHEN" Condition "THEN" Action*

Condition       = Expression

Action          = SetAction
                | AssignmentAction
                | CallAction

SetAction       = "SET" Attribute "TO" Expression

AssignmentAction = Variable "=" Expression

CallAction      = "CALL" FunctionName "(" Args ")"
```

**Example BAL:**

```
WHEN order.total > 1000 THEN
  SET discount TO 10%
  SET priority TO "high"

WHEN customer.loyaltyTier = "gold" THEN
  SET discount TO discount + 5%
```

---

## Type System

### Type Definitions

```typescript
// /services/evaluationEngine/types/TypeDefinitions.ts

export type PrimitiveType = 'number' | 'string' | 'boolean' | 'date';

export type Type = 
  | PrimitiveType
  | ArrayType
  | FunctionType
  | UnknownType;

export interface ArrayType {
  kind: 'array';
  elementType: Type;
}

export interface FunctionType {
  kind: 'function';
  params: Type[];
  returnType: Type;
}

export interface UnknownType {
  kind: 'unknown';
}

export interface TypedValue {
  value: any;
  type: Type;
}
```

### Type Checking

**Strategy:**
1. **Static type checking** during AST construction
2. **Type inference** for literals and operations
3. **Runtime type validation** before operations
4. **Type coercion** with explicit rules

**Type Coercion Rules:**

| From    | To      | Rule                                    |
|---------|---------|------------------------------------------|
| number  | string  | Convert to string                       |
| number  | boolean | 0 = false, non-zero = true              |
| string  | number  | Parse, error if invalid                 |
| string  | boolean | "true"/"1" = true, "false"/"0" = false  |
| boolean | number  | true = 1, false = 0                     |
| boolean | string  | "true" or "false"                       |
| date    | string  | Format according to user preference     |
| string  | date    | Parse ISO 8601, error if invalid        |

---

## Execution Model

### Parse-Compile-Execute Pattern

**Phase 1 - Parse (once):**
```typescript
const engine = new EvaluationEngine();
const compiled = engine.compile(formulaSource);
```

**Phase 2 - Execute (many times):**
```typescript
const result1 = compiled.evaluate({ variables: { a: 10, b: 20 } });
const result2 = compiled.evaluate({ variables: { a: 5, b: 15 } });
```

### Variable Binding

**Three-tier lookup:**
1. **Local variables** - Defined in formula (`$result = ...`)
2. **Parameter variables** - Passed in via context
3. **Attributes** - From data model (`#customer.creditScore`)

**Lookup order:**
1. Check local variables first
2. Then check parameter variables
3. Finally check attributes
4. Error if not found

### Function Execution

**Built-in Function Registry:**

```typescript
// /services/evaluationEngine/runtime/FunctionRegistry.ts

export class FunctionRegistry {
  private functions = new Map<string, BuiltInFunction>();
  
  register(name: string, fn: BuiltInFunction): void;
  execute(name: string, args: any[], context: ExecutionContext): any;
  has(name: string): boolean;
}

export interface BuiltInFunction {
  name: string;
  paramTypes: Type[];
  returnType: Type;
  execute: (args: any[], context: ExecutionContext) => any;
  description: string;
}
```

**Example built-in functions:**

```typescript
// SUM function
{
  name: 'SUM',
  paramTypes: [{ kind: 'array', elementType: 'number' }],
  returnType: 'number',
  execute: (args) => args[0].reduce((a, b) => a + b, 0),
  description: 'Sum of all values'
}

// ROUND function
{
  name: 'ROUND',
  paramTypes: ['number', 'number'],
  returnType: 'number',
  execute: (args) => {
    const [value, decimals] = args;
    const multiplier = Math.pow(10, decimals);
    return Math.round(value * multiplier) / multiplier;
  },
  description: 'Round number to specified decimal places'
}

// IF function (ternary)
{
  name: 'IF',
  paramTypes: ['boolean', 'unknown', 'unknown'],
  returnType: 'unknown',
  execute: (args) => args[0] ? args[1] : args[2],
  description: 'Conditional value selection'
}
```

---

## Testing Strategy

### Unit Testing

**Test Parsers:**
- Valid syntax parsing
- Error recovery
- Edge cases (empty input, very long input)
- All language constructs

**Test Type Checker:**
- Type inference correctness
- Type coercion rules
- Error detection (type mismatches)

**Test Evaluator:**
- Arithmetic operations
- Logical operations
- Control flow (IF/THEN/ELSE)
- Function calls
- Variable binding
- Attribute access

### Integration Testing

**Formula Test Panel Integration:**
- Parse real formulas from samples
- Execute with test values
- Display results correctly
- Show errors with context

**BAL Test Suite Integration:**
- Parse BAL rules
- Execute with test data
- Validate rule execution order
- Display trace information

### Performance Testing

**Benchmarks:**
- Parse 100 formulas: target <100ms
- Evaluate simple formula: target <1ms
- Evaluate complex formula (nested IFs): target <10ms
- 1000 evaluations with different inputs: target <1s

---

## API Design

### Public API

```typescript
// /services/evaluationEngine/index.ts

/**
 * Main evaluation engine class
 */
export class EvaluationEngine {
  /**
   * Compile source code to executable program
   * @param source - Source code (Formula or BAL)
   * @param language - Language type ('formula' | 'bal')
   * @returns Compiled program or errors
   */
  compile(
    source: string,
    language: 'formula' | 'bal' = 'formula'
  ): CompileResult;
  
  /**
   * One-shot evaluation (parse + execute)
   * @param source - Source code
   * @param context - Execution context (variables, attributes)
   * @param language - Language type
   * @returns Evaluation result
   */
  evaluate(
    source: string,
    context: Partial<ExecutionContext>,
    language: 'formula' | 'bal' = 'formula'
  ): EvaluationResult;
  
  /**
   * Validate source code without executing
   * @param source - Source code
   * @param language - Language type
   * @returns Validation result with errors/warnings
   */
  validate(
    source: string,
    language: 'formula' | 'bal' = 'formula'
  ): ValidationResult;
  
  /**
   * Register custom function
   * @param fn - Function definition
   */
  registerFunction(fn: BuiltInFunction): void;
  
  /**
   * Get available functions
   */
  getFunctions(): BuiltInFunction[];
}

/**
 * Compiled program that can be executed multiple times
 */
export class CompiledProgram {
  /**
   * Execute program with given context
   * @param context - Variables and attributes
   * @returns Evaluation result
   */
  evaluate(context: Partial<ExecutionContext>): EvaluationResult;
  
  /**
   * Get program metadata
   */
  getMetadata(): ProgramMetadata;
  
  /**
   * Get AST (for debugging)
   */
  getAST(): Program;
}

export interface CompileResult {
  success: boolean;
  program?: CompiledProgram;
  errors: ParseError[];
}

export interface ValidationResult {
  valid: boolean;
  errors: ParseError[];
  warnings: Warning[];
}

export interface ProgramMetadata {
  language: 'formula' | 'bal';
  variables: string[];        // Variables used
  attributes: string[];       // Attributes accessed
  functions: string[];        // Functions called
  returnType?: PrimitiveType; // Inferred return type
}
```

### Usage Examples

**Example 1 - Formula Test Panel:**

```typescript
// In FormulaTestPanel.tsx

import { EvaluationEngine } from '../../services/evaluationEngine';

function FormulaTestPanel({ formula, variables, returnType }) {
  const [result, setResult] = useState<EvaluationResult | null>(null);
  
  const handleEvaluate = () => {
    const engine = new EvaluationEngine();
    
    // Compile formula
    const compiled = engine.compile(formula, 'formula');
    
    if (!compiled.success) {
      // Show parse errors
      setResult({
        success: false,
        errors: compiled.errors,
        // ...
      });
      return;
    }
    
    // Build execution context from test inputs
    const context = {
      variables: new Map(
        testInputs.map(input => [input.name, input.value])
      ),
      attributes: new Map(),
      limits: {
        maxIterations: 10000,
        maxCallDepth: 100,
        timeoutMs: 5000
      }
    };
    
    // Execute with test values
    const evalResult = compiled.program!.evaluate(context);
    
    setResult(evalResult);
  };
  
  return (
    <div>
      {/* Test inputs */}
      <VariableInputs variables={variables} onChange={setTestInputs} />
      
      {/* Evaluate button */}
      <Button onClick={handleEvaluate}>Evaluate Formula</Button>
      
      {/* Results */}
      {result && (
        <div>
          {result.success ? (
            <ResultDisplay value={result.value} type={result.resultType} />
          ) : (
            <ErrorDisplay errors={result.errors} />
          )}
          
          {/* Execution trace */}
          {result.trace && <TraceViewer trace={result.trace} />}
          
          {/* Performance metrics */}
          <Metrics metrics={result.metrics} />
        </div>
      )}
    </div>
  );
}
```

**Example 2 - Real-time Validation:**

```typescript
// In FormulaEditor.tsx

import { EvaluationEngine } from '../../services/evaluationEngine';

function FormulaEditor({ value, onChange, variables }) {
  const [validationErrors, setValidationErrors] = useState<ParseError[]>([]);
  
  // Validate on change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      const engine = new EvaluationEngine();
      const validation = engine.validate(value, 'formula');
      
      setValidationErrors(validation.errors);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [value]);
  
  return (
    <div>
      <textarea value={value} onChange={onChange} />
      
      {/* Show validation errors */}
      {validationErrors.map(error => (
        <ErrorIndicator
          key={error.location.start.line}
          line={error.location.start.line}
          message={error.message}
        />
      ))}
    </div>
  );
}
```

**Example 3 - BAL Test Suite (Future):**

```typescript
// In BALEditorTestSuite.tsx

import { EvaluationEngine } from '../../services/evaluationEngine';

function BALEditorTestSuite({ balRules, testCases }) {
  const runTests = () => {
    const engine = new EvaluationEngine();
    
    // Compile BAL rules
    const compiled = engine.compile(balRules, 'bal');
    
    if (!compiled.success) {
      return { errors: compiled.errors };
    }
    
    // Run each test case
    const results = testCases.map(testCase => {
      const context = {
        variables: new Map(Object.entries(testCase.inputs)),
        attributes: new Map(),
      };
      
      return compiled.program!.evaluate(context);
    });
    
    return results;
  };
  
  // ...
}
```

---

## Implementation Phases

### Phase 1 - Foundation (Week 1-2)

**Goals:**
- Basic architecture in place
- Simple formula evaluation working

**Deliverables:**
1. Create `/services/evaluationEngine/` directory structure
2. Implement AST node definitions
3. Implement basic lexer/tokenizer
4. Implement simple parser (literals, variables, basic operations)
5. Implement basic evaluator
6. Unit tests for core components

**Formula Support:**
- Number literals
- Variables (`$var`)
- Binary operations (`+`, `-`, `*`, `/`)
- Parentheses

**Example working formula:**
```
$result = ($a + $b) * 2
```

### Phase 2 - Core Features (Week 3-4)

**Goals:**
- Full formula language support
- Integration with Formula Test Panel

**Deliverables:**
1. Complete formula parser (all constructs)
2. IF/THEN/ELSE control flow
3. Built-in functions (SUM, AVG, ROUND, etc.)
4. Type checking and inference
5. Error handling with line/column info
6. Integration with FormulaTestPanel

**Formula Support:**
- String literals
- Boolean literals
- Date literals
- Comparison operators (`=`, `!=`, `<`, `>`, `<=`, `>=`)
- Logical operators (`AND`, `OR`, `NOT`)
- IF/THEN/ELSEIF/ELSE/END
- RETURN statements
- All built-in functions
- Attribute access (`#customer.creditScore`)

**Example working formula:**
```
$creditScore = #customer.creditScore
$income = #customer.income

IF $creditScore > 700 AND $income > 50000 THEN
  RETURN "approved"
ELSEIF $creditScore > 650 THEN
  RETURN "review"
ELSE
  RETURN "denied"
END
```

### Phase 3 - Advanced Features (Week 5-6)

**Goals:**
- Performance optimization
- Advanced debugging features
- Comprehensive error messages

**Deliverables:**
1. AST optimization passes
2. Execution trace for debugging
3. Performance metrics
4. Better error messages with suggestions
5. Type coercion warnings
6. Resource limits (timeout, max iterations)

**Features:**
- Constant folding optimization
- Dead code elimination
- Detailed execution trace
- Performance profiling
- Helpful error messages ("Did you mean $variableName?")
- Stack traces for function calls

### Phase 4 - BAL Support (Week 7-8)

**Goals:**
- BAL language parser
- BAL evaluation
- Integration with BAL test suite

**Deliverables:**
1. BAL lexer and parser
2. BAL AST nodes
3. Rule execution engine
4. Decision table support
5. Integration with BALEditorTestSuite
6. Documentation and examples

**BAL Support:**
- WHEN/THEN rules
- SET actions
- Rule priority
- Decision tables
- Rule sets

### Phase 5 - Production Hardening (Week 9-10)

**Goals:**
- Production-ready quality
- Comprehensive documentation
- Performance benchmarks

**Deliverables:**
1. Comprehensive test suite (>80% coverage)
2. Performance benchmarks
3. Security audit
4. API documentation
5. Migration guide from mock evaluation
6. User documentation with examples

---

## Integration Points

### Formula Editor Integration

**Files to Update:**
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`
  - Replace mock evaluation with real engine
  - Add execution trace display
  - Add performance metrics

- `/components/editors/code/FormulaEditor/hooks/useFormulaValidation.ts`
  - Use engine.validate() for real-time validation
  - Show parse errors with line/column info

### BAL Editor Integration

**Files to Update:**
- `/components/BALEditorTestSuite/BALEditorTestSuite.tsx`
  - Add test execution with real engine
  - Display rule evaluation trace
  - Show which rules fired

- `/components/BALEditor/BALEditor.tsx`
  - Real-time validation
  - Syntax error highlighting

### Shared Autocomplete Integration

**Enhancement:**
- Use engine metadata to suggest available functions
- Context-aware suggestions based on current expression type
- Function signature hints

### Variable Table Integration

**Enhancement:**
- Show inferred types from engine
- Detect unused variables
- Suggest variable renames if typos detected

---

## Performance Considerations

### Parsing Optimization

**Strategy:**
- Parse once, cache AST
- Incremental parsing for edits (future)
- Lazy evaluation where possible

**Target Metrics:**
- Simple formula (<50 chars): <5ms parse time
- Complex formula (<500 chars): <20ms parse time
- Very complex formula (<2000 chars): <100ms parse time

### Evaluation Optimization

**Techniques:**
1. **Constant folding** - Evaluate constants at compile time
   ```
   2 + 3 * 4  →  14  (at compile time, not runtime)
   ```

2. **Common subexpression elimination**
   ```
   $a + $b + ($a + $b)  →  $temp = $a + $b; $temp + $temp
   ```

3. **Short-circuit evaluation**
   ```
   false AND expensive_function()  →  false (don't call function)
   ```

4. **Type specialization** - Generate specialized code for known types

**Target Metrics:**
- Simple evaluation: <1ms
- Complex evaluation: <10ms
- 1000 evaluations: <500ms

### Memory Optimization

**Strategies:**
- Reuse execution context objects
- Pool AST nodes for common patterns
- Limit trace size (configurable)

---

## Error Handling

### Error Types

**Parse Errors:**
```typescript
export class ParseError extends Error {
  constructor(
    message: string,
    public location: SourceLocation,
    public code: string, // Error code (e.g., 'UNEXPECTED_TOKEN')
    public suggestions?: string[] // Helpful suggestions
  ) {
    super(message);
  }
}
```

**Runtime Errors:**
```typescript
export class RuntimeError extends Error {
  constructor(
    message: string,
    public location: SourceLocation,
    public code: string,
    public context: ExecutionContext,
    public stackTrace: string[]
  ) {
    super(message);
  }
}
```

**Type Errors:**
```typescript
export class TypeError extends Error {
  constructor(
    message: string,
    public expected: Type,
    public actual: Type,
    public location: SourceLocation
  ) {
    super(message);
  }
}
```

### Error Messages

**Good error messages include:**
1. **Clear description** - What went wrong
2. **Location** - Where it happened
3. **Suggestions** - How to fix it

**Examples:**

```
❌ Bad:
"Syntax error"

✅ Good:
"Unexpected token 'THEN' at line 3, column 15
Expected expression before 'THEN'
Did you forget to write a condition after 'IF'?"
```

```
❌ Bad:
"Variable not found"

✅ Good:
"Undefined variable '$tottal' at line 5, column 10
Did you mean '$total'?"
```

```
❌ Bad:
"Type error"

✅ Good:
"Type mismatch at line 7, column 5
Cannot add string to number
Left side: $name (string)
Right side: 42 (number)
Hint: Use CONCAT() to join strings, or convert number to string"
```

### Error Recovery

**Strategy:**
- Continue parsing after errors when possible
- Report multiple errors in one pass
- Provide partial AST for IDE features

---

## Future Enhancements

### Short-term (3-6 months)

**1. Enhanced Function Library:**
- Date/time functions: `DATEADD()`, `DATEDIFF()`, `FORMATDATE()`
- String functions: `SUBSTRING()`, `INDEXOF()`, `SPLIT()`
- Array functions: `FILTER()`, `MAP()`, `REDUCE()`
- Statistical functions: `MEDIAN()`, `STDDEV()`, `PERCENTILE()`

**2. Custom Functions:**
- User-defined functions in JavaScript
- Function library management
- Import/export function libraries

**3. Debugging Tools:**
- Step-through debugger
- Breakpoints
- Watch expressions
- Variable inspector

### Medium-term (6-12 months)

**1. Performance Monitoring:**
- Formula execution profiling
- Slow query detection
- Performance recommendations

**2. Advanced BAL Features:**
- Decision tables with conflict resolution
- Rule sets with priorities
- Rule flows (sequential execution)
- Event-driven rule execution

**3. Integration Features:**
- REST API for formula evaluation
- Webhook support for formula results
- Integration with external data sources

### Long-term (12+ months)

**1. Machine Learning Integration:**
- Formula suggestion based on patterns
- Auto-complete using ML models
- Anomaly detection in formula results

**2. Visual Formula Builder:**
- Drag-and-drop formula construction
- Visual decision trees
- Flowchart-style rule building

**3. Collaborative Features:**
- Formula versioning
- Collaborative editing
- Formula review and approval workflows

---

## Security Considerations

### Sandboxing

**Requirements:**
- No access to global JavaScript scope
- No access to `eval()` or `Function()` constructor
- No access to filesystem or network
- No access to browser APIs

**Implementation:**
- Custom interpreter (not eval-based)
- Whitelist of allowed functions
- Resource limits enforcement

### Resource Limits

**Configurable limits:**
```typescript
interface ResourceLimits {
  maxIterations: number;      // Default: 10,000
  maxCallDepth: number;        // Default: 100
  timeoutMs: number;           // Default: 5,000
  maxMemoryMB: number;         // Default: 10
  maxArraySize: number;        // Default: 10,000
}
```

### Input Validation

**All inputs validated:**
- Formula source length limit
- Variable name format validation
- Attribute path depth limit
- Function argument count validation

---

## Success Metrics

### Development Metrics

- [ ] Parser coverage: >90% of language constructs
- [ ] Test coverage: >80% code coverage
- [ ] Performance: Meets all target metrics
- [ ] Documentation: All public APIs documented

### User Metrics

- [ ] Formula test success rate: >95%
- [ ] Error message clarity: User feedback positive
- [ ] Evaluation speed: <100ms perceived delay
- [ ] BAL test coverage: >80% of rules tested

---

## References

### Internal Documentation

- `/change-log/25-10-25_v03-ReturnKeywordSupport.md` - RETURN keyword design
- `/change-log/25-10-25_v02-FormulaTestingEnhancements.md` - Test panel features
- `/change-log/25-10-24_v04-FormulaEditorMetadataAndConversion.md` - Formula metadata
- `/utils/formulaParser.ts` - Current parser (regex-based)
- `/utils/formulaTestUtils.ts` - Test utilities

### External References

- **Parser design:**
  - "Crafting Interpreters" by Robert Nystrom
  - "Compilers: Principles, Techniques, and Tools" (Dragon Book)
  
- **IBM ADS/ODM:**
  - IBM Automation Decision Services documentation
  - IBM Operational Decision Management documentation
  
- **Type systems:**
  - TypeScript type system design
  - Flow type system design

### Tools & Libraries

**Consider using (evaluate during implementation):**
- **Parsing:**
  - Chevrotain (parser combinator library)
  - ANTLR (parser generator)
  - PEG.js (parser generator)
  - Or custom recursive descent parser
  
- **AST manipulation:**
  - estree (AST standard, if compatible)
  - Custom AST library
  
- **Testing:**
  - Vitest (unit testing)
  - Benchmark.js (performance testing)

---

## Next Steps

### Immediate Actions (This Week)

1. **Review and approve this architecture plan**
   - Gather feedback from team
   - Identify any missing requirements
   - Adjust based on constraints

2. **Create proof of concept**
   - Implement minimal parser for simple expressions
   - Demonstrate feasibility
   - Validate performance assumptions

3. **Set up project structure**
   - Create `/services/evaluationEngine/` directory
   - Set up testing infrastructure
   - Configure build tools

### Week 1 (Phase 1 Start)

1. **Implement AST definitions**
   - Create `/services/evaluationEngine/ast/ASTNodes.ts`
   - Add TypeScript types
   - Document each node type

2. **Implement tokenizer**
   - Create `/services/evaluationEngine/parsers/Tokenizer.ts`
   - Support numbers, variables, operators
   - Add comprehensive tests

3. **Begin simple parser**
   - Implement expression parser
   - Support arithmetic operations
   - Add variable references

### Decision Points

**Before starting implementation, decide:**
1. Use existing parser library vs. custom parser?
2. Compile to JavaScript vs. custom interpreter?
3. Type checking: compile-time only vs. runtime validation?
4. Error recovery strategy: bail-out vs. error production?

---

## Appendices

### Appendix A - Grammar Railroad Diagrams

(To be added during implementation)

### Appendix B - Function Reference

(To be expanded during implementation)

**Initial built-in functions:**

| Function | Parameters | Return Type | Description |
|----------|-----------|-------------|-------------|
| SUM | ...numbers | number | Sum all values |
| AVG | ...numbers | number | Average of values |
| MAX | ...numbers | number | Maximum value |
| MIN | ...numbers | number | Minimum value |
| ROUND | number, decimals | number | Round to N decimals |
| FLOOR | number | number | Round down |
| CEIL | number | number | Round up |
| ABS | number | number | Absolute value |
| SQRT | number | number | Square root |
| POW | base, exp | number | Power |
| CONCAT | ...strings | string | Concatenate strings |
| UPPER | string | string | Uppercase |
| LOWER | string | string | Lowercase |
| TRIM | string | string | Remove whitespace |
| LEN | string | number | String length |
| IF | condition, then, else | any | Ternary conditional |
| AND | ...booleans | boolean | Logical AND |
| OR | ...booleans | boolean | Logical OR |
| NOT | boolean | boolean | Logical NOT |
| NOW | - | date | Current date/time |
| TODAY | - | date | Current date |

### Appendix C - Error Code Reference

(To be created during implementation)

**Example error codes:**
- `E001` - Unexpected token
- `E002` - Unclosed string literal
- `E003` - Undefined variable
- `E004` - Undefined function
- `E005` - Type mismatch
- `E006` - Division by zero
- `E007` - Invalid argument count
- `E008` - Resource limit exceeded
- `E009` - Circular reference
- `E010` - Invalid attribute path

---

## Conclusion

This architecture provides a solid foundation for building a production-ready evaluation engine that supports both Formula and BAL languages. The phased implementation approach allows for incremental delivery of value while maintaining code quality and test coverage.

The key advantages of this architecture:
1. **Unified AST** - Single representation for multiple languages
2. **Performance** - Parse once, execute many times
3. **Extensibility** - Easy to add new functions and operators
4. **Type safety** - Strong typing with runtime validation
5. **Developer experience** - Clear APIs and helpful error messages
6. **Testing** - Built-in trace and debugging features

By following this plan, we'll replace the current mock evaluation with a real, production-ready engine that provides accurate results, helpful errors, and excellent performance.
