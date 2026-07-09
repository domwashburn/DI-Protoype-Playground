# Formula & BAL Evaluation Engine

Production-ready evaluation engine for parsing and executing Formula and BAL (Business Action Language) expressions.

## Overview

The Evaluation Engine provides:
- **Real formula evaluation** - Not just syntax highlighting
- **Type-safe execution** - Runtime type checking with helpful errors
- **Performance** - Compile once, evaluate many times
- **Extensibility** - Plugin architecture for custom functions
- **Error handling** - Line/column error reporting with suggestions

## Architecture

```
/services/evaluationEngine/
  index.ts                    # Public API
  EvaluationEngine.ts         # Main engine class
  README.md                   # This file
  
  /ast/
    ASTNodes.ts              # AST type definitions
  
  /parsers/
    Tokenizer.ts             # Lexical analysis
    FormulaParser.ts         # Formula language parser
  
  /runtime/
    Evaluator.ts             # AST evaluation
    Context.ts               # Execution context
    FunctionRegistry.ts      # Built-in functions
  
  /types/
    TypeSystem.ts            # Type checking and coercion
  
  /errors/
    EvaluationError.ts       # Error types
```

## Quick Start

### Basic Evaluation

```typescript
import { EvaluationEngine } from './services/evaluationEngine';

const engine = new EvaluationEngine();

// Simple arithmetic
const result1 = engine.evaluate('$a + $b * 2', {
  variables: new Map([
    ['a', 10],
    ['b', 5]
  ])
});
console.log(result1.value); // 20

// Conditional logic
const result2 = engine.evaluate(`
  IF $age >= 18 THEN
    "adult"
  ELSE
    "minor"
  END
`, {
  variables: new Map([['age', 20]])
});
console.log(result2.value); // "adult"

// Built-in functions
const result3 = engine.evaluate('ROUND($price * 1.13, 2)', {
  variables: new Map([['price', 9.99]])
});
console.log(result3.value); // 11.29
```

### Compile Once, Evaluate Many

```typescript
// Compile formula once
const compiled = engine.compile('$revenue - $cost');

if (!compiled.success) {
  console.error('Parse errors:', compiled.errors);
  return;
}

// Evaluate with different inputs
const scenarios = [
  { revenue: 1000, cost: 600 },
  { revenue: 1500, cost: 800 },
  { revenue: 2000, cost: 1200 }
];

scenarios.forEach(scenario => {
  const result = compiled.program!.evaluate({
    variables: new Map(Object.entries(scenario))
  });
  console.log(`Profit: ${result.value}`);
});
```

### Error Handling

```typescript
const result = engine.evaluate('$undefinedVar + 10');

if (!result.success) {
  result.errors.forEach(error => {
    console.error(error.message);
    // "Undefined variable: $undefinedVar"
    // "Did you mean: $revenue, $cost?"
    
    if (error.location) {
      console.error(`  at line ${error.location.start.line}, column ${error.location.start.column}`);
    }
  });
}
```

## Supported Features

### Operators

**Arithmetic:**
- `+` Addition
- `-` Subtraction
- `*` Multiplication
- `/` Division
- `%` Modulo

**Comparison:**
- `=` Equal
- `!=` Not equal
- `<` Less than
- `>` Greater than
- `<=` Less than or equal
- `>=` Greater than or equal

**Logical:**
- `AND` Logical and (short-circuit)
- `OR` Logical or (short-circuit)
- `NOT` Logical not

### Control Flow

**IF/THEN/ELSE:**
```
IF condition THEN
  expression
ELSEIF condition THEN
  expression
ELSE
  expression
END
```

**RETURN Statement (optional):**
```
$result = $a + $b
RETURN $result
```

### Variables and Attributes

**Variables:** `$variableName`
```
$price = 9.99
$tax = $price * 0.13
RETURN $price + $tax
```

**Attributes:** `#object.property`
```
IF #customer.creditScore > 700 THEN
  "approved"
ELSE
  "denied"
END
```

### Built-in Functions

**Arithmetic:**
- `ROUND(number, decimals)` - Round to N decimal places
- `FLOOR(number)` - Round down
- `CEIL(number)` - Round up
- `ABS(number)` - Absolute value
- `SQRT(number)` - Square root
- `POW(base, exponent)` - Raise to power

**Aggregate:**
- `SUM(...numbers)` - Sum of values
- `AVG(...numbers)` - Average of values
- `MAX(...numbers)` - Maximum value
- `MIN(...numbers)` - Minimum value
- `COUNT(...values)` - Count of values

**String:**
- `CONCAT(...strings)` - Concatenate strings
- `UPPER(string)` - Convert to uppercase
- `LOWER(string)` - Convert to lowercase
- `TRIM(string)` - Remove whitespace
- `LEN(string)` - String length

**Date:**
- `NOW()` - Current date and time
- `TODAY()` - Current date at midnight

**Logical:**
- `IF(condition, thenValue, elseValue)` - Ternary conditional

### Examples

**Grade Calculation:**
```
$average = AVG($test1, $test2, $test3)

IF $average >= 90 THEN
  "A"
ELSEIF $average >= 80 THEN
  "B"
ELSEIF $average >= 70 THEN
  "C"
ELSEIF $average >= 60 THEN
  "D"
ELSE
  "F"
END
```

**Pricing with Discounts:**
```
$subtotal = $quantity * $unitPrice
$discount = IF $quantity >= 100 THEN 0.15 ELSE IF $quantity >= 50 THEN 0.10 ELSE 0 END
$total = $subtotal * (1 - $discount)
ROUND($total, 2)
```

**Loan Approval:**
```
$creditScore = #applicant.creditScore
$debtToIncome = #applicant.monthlyDebt / #applicant.monthlyIncome

IF $creditScore >= 750 AND $debtToIncome <= 0.3 THEN
  "Auto-Approve"
ELSEIF $creditScore >= 650 AND $debtToIncome <= 0.4 THEN
  "Manual Review"
ELSE
  "Decline"
END
```

## API Reference

### EvaluationEngine

Main engine class for parsing and evaluating formulas.

```typescript
class EvaluationEngine {
  constructor(config?: EngineConfig);
  
  // One-shot evaluation
  evaluate(source: string, context?: Partial<ExecutionContext>): EvaluationResult;
  
  // Compile for reuse
  compile(source: string): CompileResult;
  
  // Register custom function
  registerFunction(fn: BuiltInFunction): void;
  
  // Get function registry
  getFunctions(): FunctionRegistry;
}
```

### ExecutionContext

Runtime context for evaluation.

```typescript
interface ExecutionContext {
  // Variable values ($variableName)
  variables: Map<string, any>;
  
  // Attribute values (#object.property)
  attributes: Map<string, any>;
  
  // Function registry (optional, uses defaults if not provided)
  functions?: FunctionRegistry;
  
  // Resource limits (optional)
  limits?: ResourceLimits;
}
```

### EvaluationResult

Result of formula evaluation.

```typescript
interface EvaluationResult {
  // Success status
  success: boolean;
  
  // Evaluated value (if success)
  value?: any;
  
  // Errors (if any)
  errors: Array<ParseError | RuntimeError>;
  
  // Performance metrics
  metrics: {
    parseTimeMs: number;
    evalTimeMs: number;
    totalTimeMs: number;
  };
  
  // Result type
  resultType?: 'number' | 'string' | 'boolean' | 'date' | 'null';
}
```

## Performance

**Target Metrics:**
- Simple formula parsing: <10ms
- Simple formula evaluation: <5ms
- 100 sequential evaluations: <500ms

**Optimization Strategies:**
1. **Compile once, evaluate many** - Avoid re-parsing
2. **Short-circuit evaluation** - AND/OR operators
3. **Lazy evaluation** - IF branches only evaluate when taken

## Error Handling

The engine provides comprehensive error reporting with:

**Parse Errors:**
- Syntax errors with line/column information
- Helpful error messages
- Suggestions for common typos

**Runtime Errors:**
- Undefined variables/attributes with suggestions
- Type mismatches with expected vs. actual types
- Division by zero
- Function argument count validation

**Example Error Output:**
```
Undefined variable: $tottal
  at line 3, column 10
  Did you mean: $total?
```

## Testing

The engine includes comprehensive tests covering:
- Tokenization
- Parsing
- Evaluation
- Error handling
- Edge cases

## Future Enhancements

**Phase 2 (Current Sprint):**
- ✅ Threshold evaluation with gap handling - [EPIC: Advanced Threshold Evaluation](/change-log/EPIC-AdvancedThresholdEvaluation.md)
- More built-in functions (date arithmetic, string manipulation)
- Advanced date formatting and parsing

**Phase 3:**
- BAL (Business Action Language) parser
- Web Worker support for batch evaluation
- AST optimization passes
- Performance profiling and optimization

**Phase 4:**
- Server-side API endpoints
- Multi-tenancy support
- Formula caching layer
- Formula versioning and migration

**Phase 5:**
- Formula Evaluation Debugger - [EPIC: Formula Evaluation Debugger](/change-log/EPIC-FormulaEvaluationDebugger.md)
  - Step-by-step execution trace recording
  - Visual debugger UI with step forward/backward
  - Timeline replay with playback controls
  - Breakpoints and conditional breaks
  - Variable inspection at each step
  - Call stack visualization
  - Watch expressions

**Phase 6:**
- Named formulas and function composition - [Named Formulas Plan](/change-log/25-10-23_v07-NamedFormulasPlan.md)
- Formula library and registry
- Cross-formula dependencies
- Circular dependency detection

## Related Documentation

- [v04 - Formula Engine Architecture Plan](/change-log/25-10-25_v04-FormulaEngineArchitecturePlan.md)
- [v05 - Formula Engine Architecture Addendum](/change-log/25-10-25_v05-FormulaEngineArchitectureAddendum.md)
- [v06 - Threshold Evaluation Architecture](/change-log/25-10-25_v06-ThresholdEvaluationArchitecture.md)
- [v07 - Evaluation Engine Implementation](/change-log/25-10-25_v07-EvaluationEngineImplementation.md)
- [EPIC: Advanced Threshold Evaluation](/change-log/EPIC-AdvancedThresholdEvaluation.md)
- [EPIC: Formula Evaluation Debugger](/change-log/EPIC-FormulaEvaluationDebugger.md)