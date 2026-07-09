# Formula Editor Test Suite

Comprehensive test suite for the Formula Editor evaluation engine, parser, and formula samples.

## Test Files

### `parser.test.ts`
Tests the FormulaParser to ensure correct parsing of all syntax forms:
- Basic expressions (literals, variables, attributes)
- Binary and unary operations
- Assignments
- **IF expressions** (including nested IFs, ELSIF chains)
- List/array expressions
- Function calls
- FOR/WHILE loops
- SWITCH statements
- Error handling
- Mode detection (STANDARD vs BAL)

**Critical Tests:**
- Nested IF expressions (previously failing)
- IF with ELSIF chains
- IF as expression value

### `evaluator.test.ts`
Tests the evaluation engine to ensure correct evaluation:
- Basic expression evaluation
- Arithmetic operations (including division by zero error)
- Comparison and logical operations
- Assignments and variable scoping
- **IF expression evaluation** (nested, ELSIF, etc.)
- List operations and indexing
- Function execution (LIST_SUM, LIST_AVG, etc.)
- FOR/WHILE loop execution
- SWITCH statement execution
- Type checking
- Execution tracing
- Error handling

**Critical Tests:**
- Nested IF evaluation (Customer Discount scenario)
- List type assignments (no type mismatch errors)
- FOR loop iteration with arrays

### `formula-samples.test.ts`
Regression tests for all formula samples:
- Validates ALL samples from `formulaSamples.ts`
- Detects type mismatch errors
- Tests specific sample categories (IF, List, Loop)
- Performance metrics
- Handles intentional error samples

**Critical Tests:**
- No type mismatch errors across all samples
- Customer Discount Calculation (nested IF)
- Monthly Revenue Analysis (list operations)
- FOR Loop - Array Iteration

## Running Tests

### Prerequisites
```bash
# Install dependencies (if using Jest)
npm install --save-dev jest @types/jest ts-jest

# Initialize Jest config
npx ts-jest config:init
```

### Run All Tests
```bash
npm test
```

### Run Specific Test File
```bash
npm test parser.test
npm test evaluator.test
npm test formula-samples.test
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

## Test Structure

Each test file follows this structure:

```typescript
describe('Component/Module', () => {
  beforeEach(() => {
    // Setup
  });

  describe('Feature Category', () => {
    test('specific behavior', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## Key Test Scenarios

### 1. Nested IF Expressions
**Why Critical:** This was a major bug where nested IFs failed to parse.

```typescript
IF $orderTotal > 1000 THEN
  IF $loyaltyTier = "gold" THEN
    $orderTotal * 0.15
  ELSIF $loyaltyTier = "silver" THEN
    $orderTotal * 0.10
  ELSE
    $orderTotal * 0.05
  END
ELSE
  0
END
```

**Tests:**
- `parser.test.ts`: Parses correctly, creates nested IfExpression AST
- `evaluator.test.ts`: Evaluates correctly, returns expected discount
- `formula-samples.test.ts`: Customer Discount sample passes

### 2. Type Mismatch Errors
**Why Critical:** Variables declared as `number` but assigned `list` values caused errors.

```typescript
$revenues = [45000, 52000, 48000] // Should be type: 'list', not 'number'
```

**Tests:**
- `formula-samples.test.ts`: No type mismatch errors across all samples
- `evaluator.test.ts`: List assignments work correctly

### 3. FOR Loop with Arrays
**Why Critical:** FOR loops must iterate over arrays correctly.

```typescript
$transactions = [125.50, 89.99, 234.00]
FOR $amount IN $transactions DO
  $total = $total + $amount
END
```

**Tests:**
- `parser.test.ts`: Parses FOR loop correctly
- `evaluator.test.ts`: Evaluates loop, calculates correct total
- `formula-samples.test.ts`: FOR loop samples pass

### 4. TracingEvaluator Method Names
**Why Critical:** `addStep()` vs `recordStep()` method name mismatch caused crashes.

**Tests:**
- `evaluator.test.ts`: Execution traces are generated without errors
- All tests validate that tracing doesn't throw errors

## Regression Prevention

These tests prevent future regressions by:

1. **Parser Tests**: Ensure syntax changes don't break parsing
2. **Evaluator Tests**: Ensure evaluation logic changes don't break calculations
3. **Formula Samples Tests**: Ensure ANY changes to parser/evaluator don't break existing formulas

## Continuous Integration

Recommended CI setup:

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test -- --coverage
```

## Writing New Tests

When adding new features:

1. **Add parser test** in `parser.test.ts` for new syntax
2. **Add evaluator test** in `evaluator.test.ts` for new evaluation logic
3. **Add formula sample** in `formulaSamples.ts` with real-world example
4. **Regression test automatically includes** new sample via `formula-samples.test.ts`

### Example: Adding a new operator

```typescript
// 1. parser.test.ts
test('parses new BETWEEN operator', () => {
  const result = parser.parse('$x BETWEEN 10 AND 20');
  expect(result.returnValue?.type).toBe('BetweenOp');
});

// 2. evaluator.test.ts
test('evaluates BETWEEN operator', () => {
  const result = evaluator.evaluate('15 BETWEEN 10 AND 20');
  expect(result.value).toBe(true);
});

// 3. formulaSamples.ts
{
  id: 'age-range-check',
  title: 'Age Range Check',
  formula: 'IF $age BETWEEN 18 AND 65 THEN "working age" ELSE "other" END',
  // ...
}

// 4. formula-samples.test.ts automatically tests it!
```

## Test Coverage Goals

- **Parser**: 90%+ coverage of all parsing methods
- **Evaluator**: 85%+ coverage of all evaluation paths
- **Formula Samples**: 100% of samples parse without errors (excluding intentional error samples)

## Debugging Failed Tests

### Parser Failures
1. Check the generated AST structure
2. Verify tokenizer output
3. Check `isBlockTerminator()` logic
4. Verify END keyword handling

### Evaluator Failures
1. Check variable context setup
2. Verify function registry
3. Check type checking logic
4. Verify control flow (IF, FOR, WHILE)

### Formula Sample Failures
1. Check variable type declarations (number vs list)
2. Verify formula syntax is correct
3. Check for missing END keywords
4. Verify function names are correct

## Maintenance

Update tests when:
- Adding new syntax features
- Changing evaluation behavior
- Adding new functions
- Modifying error handling
- Changing type system

Keep tests:
- **Focused**: One concept per test
- **Fast**: Use mocks when possible
- **Isolated**: No dependencies between tests
- **Maintainable**: Clear naming and structure
