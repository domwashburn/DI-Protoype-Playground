# EPIC: Formula Type System & Runtime Type Checking

**Status:** 📋 Planned  
**Priority:** High  
**Complexity:** High  
**Dependencies:** Evaluation Engine (Complete), Debugger (Complete)

---

## Overview

Implement a comprehensive type system for the Formula Editor that prevents type errors at both compile-time (validation) and runtime (evaluation). Currently, the formula engine has JavaScript-level type flexibility, which can lead to unexpected behavior, silent failures, and difficult-to-debug issues.

---

## Problem Statement

### Current State: "JavaScript-level" Type Flexibility

The formula engine currently allows operations that should be type errors:

```
// ❌ Currently allowed but problematic:
$stringVar = "hello"
$numberVar = 10

// Type mismatch in assignment
$stringVar = 100  // Should error: assigning number to string variable

// Type mismatch in comparison
IF $stringVar > $numberVar THEN  // Should error: comparing string to number
  ...
END

// Type mismatch in arithmetic
$result = $stringVar + $numberVar  // Should error or coerce explicitly

// Function argument type mismatch
$result = ROUND($stringVar, 2)  // Should error: ROUND expects number, got string
```

### Issues This Causes

1. **Silent failures** - Operations succeed but produce unexpected results
2. **Runtime errors** - Crashes during evaluation instead of validation errors
3. **Poor developer experience** - No feedback until execution
4. **Difficult debugging** - Type errors manifest far from the source
5. **Data quality issues** - Incorrect results due to implicit coercions

---

## Goals

### Primary Goals

1. **Type Safety** - Prevent type mismatches at validation and runtime
2. **Clear Error Messages** - Show exactly what type was expected vs. received
3. **Early Detection** - Catch type errors during editing, not execution
4. **Explicit Coercion** - Force developers to be explicit about type conversions
5. **Function Type Checking** - Validate function argument types

### Non-Goals

1. **Type Inference** - Not implementing full type inference (too complex)
2. **Generic Types** - Not implementing generics or parameterized types
3. **Union Types** - Not supporting union types (variable is one type)
4. **Gradual Typing** - Not supporting "any" type or gradual typing

---

## Type System Design

### Type Hierarchy

```
Type
├── Primitive
│   ├── Number
│   ├── String
│   ├── Boolean
│   └── Date
├── Null
└── Error (for type checking failures)
```

### Variable Type Declaration

Variables MUST have a declared type:

```typescript
// In Variable table:
{
  name: 'revenue',
  type: 'number',  // ✅ Type is declared
  dataSource: '#order.total'
}
```

### Type Rules

#### 1. Assignment Type Checking

```
// ✅ Valid: Type matches
$revenue = 1000  // $revenue is declared as 'number'

// ❌ Invalid: Type mismatch
$revenue = "1000"  // ERROR: Cannot assign string to number variable
```

#### 2. Comparison Type Checking

```
// ✅ Valid: Same types
IF $revenue > 1000 THEN  // number > number

// ❌ Invalid: Type mismatch
IF $revenue > "1000" THEN  // ERROR: Cannot compare number to string

// ✅ Valid: Boolean comparisons
IF $isActive = true THEN  // boolean = boolean
```

#### 3. Arithmetic Type Checking

```
// ✅ Valid: Numbers only
$total = $price + $tax  // number + number

// ❌ Invalid: Non-numeric operands
$total = $price + "10"  // ERROR: Cannot add string to number
```

#### 4. Function Argument Type Checking

```
// ✅ Valid: Argument types match
$rounded = ROUND($price, 2)  // ROUND(number, number) → number

// ❌ Invalid: Wrong argument type
$rounded = ROUND("$10.50", 2)  // ERROR: ROUND expects number, got string
```

#### 5. Explicit Coercion (Future Enhancement)

```
// Force explicit type conversion
$stringValue = STRING($numericValue)  // Convert number to string
$numericValue = NUMBER($stringValue)  // Convert string to number
```

---

## Implementation Phases

### Phase 1: Type Checking Infrastructure

**Deliverables:**
- Type system definition (`TypeSystem.ts` - already exists, needs expansion)
- Type checking utilities
- Type error types and messages

**Components:**
```typescript
// services/evaluationEngine/types/TypeChecker.ts
class TypeChecker {
  // Check if value matches expected type
  validateType(value: any, expectedType: VariableType): TypeCheckResult
  
  // Check if assignment is valid
  validateAssignment(variable: Variable, value: any): TypeCheckResult
  
  // Check if comparison is valid
  validateComparison(left: any, right: any, operator: string): TypeCheckResult
  
  // Check if operation is valid
  validateOperation(left: any, right: any, operator: string): TypeCheckResult
}
```

**New Error Types:**
```typescript
class TypeMismatchError extends EvaluationError {
  constructor(
    expected: VariableType,
    received: VariableType,
    location?: SourceLocation
  )
}

class InvalidOperationError extends EvaluationError {
  constructor(
    operation: string,
    leftType: VariableType,
    rightType: VariableType,
    location?: SourceLocation
  )
}
```

### Phase 2: Static Type Checking (Validation)

**Deliverables:**
- Static analysis of AST for type errors
- Integration with `useFormulaValidation` hook
- Real-time type error highlighting

**Implementation:**
```typescript
// services/evaluationEngine/validation/TypeValidator.ts
class TypeValidator {
  // Analyze AST for type errors
  validateTypes(ast: Program, variables: Variable[]): ValidationError[]
  
  // Check expression types
  inferExpressionType(expr: Expression, context: TypeContext): VariableType
  
  // Validate assignment
  validateAssignment(assignment: Assignment, context: TypeContext): ValidationError[]
}
```

**Integration:**
```typescript
// In useFormulaValidation.ts
const typeErrors = TypeValidator.validateTypes(ast, variables);
const allErrors = [...syntaxErrors, ...typeErrors];
```

### Phase 3: Runtime Type Checking (Evaluation)

**Deliverables:**
- Runtime type checks in evaluator
- Type-safe function implementations
- Better error messages with type information

**Evaluator Updates:**
```typescript
// In Evaluator.ts
private evaluateAssignment(assignment: Assignment, context: Context): any {
  const value = this.evaluateExpression(assignment.value, context);
  const variable = context.getVariable(assignment.variable);
  
  // ✅ NEW: Runtime type check
  const typeCheck = TypeChecker.validateAssignment(variable, value);
  if (!typeCheck.valid) {
    throw new TypeMismatchError(
      variable.type,
      typeof value,
      assignment.location
    );
  }
  
  context.setVariable(assignment.variable, value);
  return value;
}
```

### Phase 4: Function Type Signatures

**Deliverables:**
- Type signatures for all built-in functions
- Function argument validation
- Return type validation

**Function Registry Updates:**
```typescript
// In FunctionRegistry.ts
interface FunctionSignature {
  name: string;
  parameters: Array<{
    name: string;
    type: VariableType;
    optional?: boolean;
  }>;
  returnType: VariableType;
}

const FUNCTION_SIGNATURES: Record<string, FunctionSignature> = {
  ROUND: {
    name: 'ROUND',
    parameters: [
      { name: 'number', type: 'number' },
      { name: 'decimals', type: 'number', optional: true }
    ],
    returnType: 'number'
  },
  // ... other functions
};
```

**Validation:**
```typescript
private validateFunctionCall(call: FunctionCall, context: TypeContext): ValidationError[] {
  const signature = FUNCTION_SIGNATURES[call.name];
  if (!signature) return [];
  
  const errors: ValidationError[] = [];
  
  // Check argument count
  const required = signature.parameters.filter(p => !p.optional).length;
  if (call.args.length < required) {
    errors.push(new ValidationError(
      `Function ${call.name} requires ${required} arguments, got ${call.args.length}`
    ));
  }
  
  // Check argument types
  call.args.forEach((arg, i) => {
    const expectedType = signature.parameters[i]?.type;
    const actualType = this.inferExpressionType(arg, context);
    
    if (expectedType && actualType !== expectedType) {
      errors.push(new TypeMismatchError(
        expectedType,
        actualType,
        arg.location
      ));
    }
  });
  
  return errors;
}
```

### Phase 5: Type Checking UI Integration

**Deliverables:**
- Type error highlighting in editor
- Type information in hover tooltips
- Type-aware autocomplete suggestions
- Variable Inspector shows type information

**UI Updates:**

1. **Editor highlighting:**
```tsx
// Color code type errors differently from syntax errors
<span className={styles.typeError}>$stringVar + $numberVar</span>
```

2. **Hover tooltips:**
```tsx
// Show type information on hover
<Tooltip>
  Variable: $revenue
  Type: number
  Value: 1000
</Tooltip>
```

3. **Autocomplete filtering:**
```tsx
// Only suggest functions that accept the current type
IF $revenue [autocomplete shows: >, <, >=, <=, =, !=]
// But NOT string-specific operations
```

4. **Variable Inspector:**
```tsx
<VariableInspector>
  <Variable 
    name="$revenue" 
    type="number"  // ✅ Show type
    value={1000}
  />
</VariableInspector>
```

---

## Type Checking Examples

### Example 1: Assignment Type Error

**Formula:**
```
$revenue = 1000  // $revenue declared as 'number'
$revenue = "updated"  // ❌ Type error
```

**Validation Error:**
```
Type Error [Line 2, Column 12]: Cannot assign string to variable $revenue of type number
  Expected: number
  Received: string
```

**Editor Display:**
```
$revenue = 1000
$revenue = "updated"
           ^^^^^^^^^
           Type Error: Cannot assign string to number variable
```

### Example 2: Comparison Type Error

**Formula:**
```
$count = 10  // number
$status = "active"  // string

IF $count > $status THEN  // ❌ Type error
  100
END
```

**Validation Error:**
```
Type Error [Line 4, Column 13]: Cannot compare number to string
  Left operand type: number
  Right operand type: string
  Operator: >
```

### Example 3: Function Argument Type Error

**Formula:**
```
$discount = "0.15"  // string
$rounded = ROUND($discount, 2)  // ❌ Type error
```

**Validation Error:**
```
Type Error [Line 2, Column 18]: Function ROUND expects argument 1 to be number, got string
  Function: ROUND
  Parameter: number
  Expected type: number
  Received type: string
```

### Example 4: Arithmetic Type Error

**Formula:**
```
$price = 100  // number
$label = "Total: "  // string

$result = $price + $label  // ❌ Type error
```

**Validation Error:**
```
Type Error [Line 4, Column 11]: Cannot use arithmetic operator '+' with types number and string
  Left operand type: number
  Right operand type: string
  
  Hint: Use explicit type conversion: STRING($price) + $label
```

---

## Error Messages

### Type Error Message Template

```
Type Error [Line X, Column Y]: <Description>
  Expected: <type>
  Received: <type>
  
  [Optional context/hint]
```

### Error Message Examples

**Assignment:**
```
Type Error [Line 5, Column 12]: Cannot assign string to number variable
  Variable: $revenue
  Expected type: number
  Received type: string
```

**Comparison:**
```
Type Error [Line 10, Column 8]: Cannot compare different types
  Left operand: $count (number)
  Right operand: $status (string)
  Operator: >
  
  Hint: Comparison operators require both operands to be the same type
```

**Function:**
```
Type Error [Line 15, Column 20]: Invalid function argument type
  Function: ROUND
  Parameter: number (argument 1)
  Expected type: number
  Received type: string
  
  Available signatures:
    ROUND(number) → number
    ROUND(number, number) → number
```

**Operation:**
```
Type Error [Line 8, Column 14]: Invalid operand types for arithmetic operation
  Operation: +
  Left operand: $price (number)
  Right operand: $label (string)
  
  Hint: Arithmetic operators (+, -, *, /, %) require numeric operands
```

---

## Type Coercion Rules

### No Implicit Coercion

Unlike JavaScript, we do NOT allow implicit type coercion:

```javascript
// JavaScript behavior:
"5" + 3   // → "53" (implicit string coercion)
"5" - 3   // → 2 (implicit number coercion)
true + 1  // → 2 (implicit number coercion)

// Our formula engine behavior:
"5" + 3   // ❌ Type Error: Cannot add string and number
"5" - 3   // ❌ Type Error: Cannot subtract number from string
true + 1  // ❌ Type Error: Cannot add boolean and number
```

### Future: Explicit Coercion Functions

**Phase 6 (Future):**
```
// Explicit type conversion functions
STRING(value)   // Convert to string
NUMBER(value)   // Convert to number
BOOLEAN(value)  // Convert to boolean
DATE(value)     // Convert to date

// Usage:
$price = 100
$label = "Total: " + STRING($price)  // ✅ "Total: 100"
```

---

## Special Cases

### 1. Null Handling

```
// Null is a valid value for any type
$value = null  // ✅ Valid for any variable type

// Null comparisons
IF $value = null THEN  // ✅ Valid
```

### 2. String Concatenation

```
// Special case: + operator for strings
$firstName = "John"
$lastName = "Doe"
$fullName = $firstName + " " + $lastName  // ✅ Valid: string + string

// But NOT mixed types
$name = "Age: " + $age  // ❌ Type Error
```

### 3. Boolean Logic

```
// AND/OR require boolean operands
IF $isActive AND $isVerified THEN  // ✅ Valid: boolean AND boolean
IF $count > 10 AND $isActive THEN  // ✅ Valid: (comparison → boolean) AND boolean

// NOT mixed types
IF $count AND $isActive THEN  // ❌ Type Error: number is not boolean
```

### 4. Date Comparisons

```
$startDate = "2024-01-01"  // date type
$endDate = "2024-12-31"    // date type

IF $startDate < $endDate THEN  // ✅ Valid: date < date
```

---

## Testing Strategy

### Unit Tests

**Type Checker Tests:**
```typescript
describe('TypeChecker', () => {
  it('should validate number assignment', () => {
    const variable: Variable = { name: 'revenue', type: 'number' };
    const result = TypeChecker.validateAssignment(variable, 1000);
    expect(result.valid).toBe(true);
  });
  
  it('should reject string assignment to number variable', () => {
    const variable: Variable = { name: 'revenue', type: 'number' };
    const result = TypeChecker.validateAssignment(variable, "1000");
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Cannot assign string to number');
  });
  
  it('should validate number comparison', () => {
    const result = TypeChecker.validateComparison(100, 200, '>');
    expect(result.valid).toBe(true);
  });
  
  it('should reject mixed-type comparison', () => {
    const result = TypeChecker.validateComparison(100, "200", '>');
    expect(result.valid).toBe(false);
  });
});
```

**Type Validator Tests:**
```typescript
describe('TypeValidator', () => {
  it('should detect assignment type error', () => {
    const formula = `
      $revenue = 1000
      $revenue = "updated"
    `;
    const variables = [{ name: 'revenue', type: 'number' }];
    const errors = TypeValidator.validate(formula, variables);
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toContain('Cannot assign string to number');
  });
  
  it('should detect function argument type error', () => {
    const formula = `ROUND("10.5", 2)`;
    const errors = TypeValidator.validate(formula, []);
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toContain('ROUND expects number, got string');
  });
});
```

### Integration Tests

**End-to-End Type Checking:**
```typescript
describe('Formula Type System E2E', () => {
  it('should show type error in editor', () => {
    render(<FormulaEditor />);
    
    // Set up variable
    addVariable({ name: 'count', type: 'number' });
    
    // Type invalid formula
    typeFormula('$count = "invalid"');
    
    // Should show type error
    expect(screen.getByText(/Type Error/i)).toBeInTheDocument();
    expect(screen.getByText(/Cannot assign string to number/i)).toBeInTheDocument();
  });
  
  it('should prevent evaluation with type errors', () => {
    const formula = '$count = "invalid"';
    const variables = [{ name: 'count', type: 'number', value: 0 }];
    
    expect(() => {
      evaluate(formula, variables);
    }).toThrow(TypeMismatchError);
  });
});
```

---

## Migration Strategy

### Backward Compatibility

**Challenge:** Existing formulas may have type errors.

**Solution:**
1. **Opt-in initially** - Type checking is a warning, not an error
2. **Migration tool** - Identify and fix type errors in existing formulas
3. **Gradual enforcement** - Warnings → Errors over time

**Migration Tool UI:**
```tsx
<TypeMigrationPanel>
  <Alert severity="warning">
    This formula has 3 type errors. Click "Auto-fix" to apply suggested fixes.
  </Alert>
  
  <TypeErrorList>
    <TypeError 
      line={5}
      message="Cannot assign string to number"
      suggestion="Change variable type to string OR convert value to number"
    />
  </TypeErrorList>
  
  <Button onClick={autoFix}>Auto-fix All</Button>
</TypeMigrationPanel>
```

---

## Performance Considerations

### Static Analysis Performance

- Type checking happens during validation (already running)
- AST traversal is O(n) where n = number of AST nodes
- Type inference cache for repeated expressions

### Runtime Performance

- Type checks only on assignments and operations
- Negligible overhead (simple type comparisons)
- Can be disabled in production if needed (but not recommended)

---

## Future Enhancements

### Phase 6+: Advanced Type Features

1. **Type Conversion Functions**
   - STRING(), NUMBER(), BOOLEAN(), DATE()
   - Explicit coercion

2. **Type Guards**
   - ISNUMBER(), ISSTRING(), ISBOOLEAN(), ISDATE()
   - Conditional logic based on type

3. **Array Types**
   - number[], string[], etc.
   - Type-safe array operations

4. **Object Types**
   - Structured types for complex data
   - Dot notation type checking

5. **Type Aliases**
   - User-defined type names
   - Semantic types (e.g., "Currency", "Percentage")

---

## Success Metrics

### Developer Experience

- **Fewer runtime errors** - Type errors caught during editing
- **Faster debugging** - Clear type error messages
- **Reduced cognitive load** - Type system prevents entire classes of bugs

### Code Quality

- **Type safety** - 100% of assignments and operations type-checked
- **Error detection rate** - >90% of type errors caught before execution
- **False positive rate** - <5% of type errors are false positives

### User Impact

- **Fewer failed evaluations** - Type errors prevented at validation
- **Better error messages** - Users understand what went wrong
- **Confidence in results** - Type system prevents silent failures

---

## Dependencies

### Completed

- ✅ Evaluation Engine (Phase 1)
- ✅ AST Definition (ASTNodes.ts)
- ✅ Type System Foundation (TypeSystem.ts)
- ✅ Validation Infrastructure (useFormulaValidation)
- ✅ Debugger (helps validate type checking behavior)

### Required

- Variable metadata (type declarations) - ✅ Already have
- AST location information - ✅ Already have
- Error reporting infrastructure - ✅ Already have

---

## Timeline Estimate

### Phase 1: Infrastructure (1-2 days)
- TypeChecker utility class
- Type error classes
- Basic type validation

### Phase 2: Static Checking (2-3 days)
- TypeValidator class
- AST type inference
- Integration with validation hook
- Editor error highlighting

### Phase 3: Runtime Checking (2-3 days)
- Evaluator type checks
- Runtime error handling
- Better error messages

### Phase 4: Function Signatures (2-3 days)
- Function type signatures
- Argument validation
- Return type checking

### Phase 5: UI Integration (2-3 days)
- Type error styling
- Hover tooltips
- Type-aware autocomplete
- Variable Inspector updates

**Total: 9-14 days** (full implementation)

---

## Open Questions

1. **Type coercion for `+` operator with strings?**
   - Option A: Allow `string + string` only
   - Option B: Allow `string + any` with implicit conversion
   - **Recommendation:** Option A (strict, explicit)

2. **Null/undefined handling?**
   - Option A: Null is valid for any type
   - Option B: Null is its own type
   - **Recommendation:** Option A (more practical)

3. **Type inference for undefined variables?**
   - Option A: Infer type from first assignment
   - Option B: Require explicit type declaration
   - **Recommendation:** Option B (safer, clearer)

4. **Mixed type comparisons with `=` and `!=`?**
   - Option A: Allow (always returns false/true)
   - Option B: Reject as type error
   - **Recommendation:** Option B (catch errors early)

---

## Related Epics

- [EPIC: Formula Evaluation Debugger](./EPIC-FormulaEvaluationDebugger.md) - ✅ Complete
- [EPIC: Advanced Threshold Evaluation](./EPIC-AdvancedThresholdEvaluation.md) - ✅ Complete

---

## References

### Type Systems

- TypeScript Type System: https://www.typescriptlang.org/docs/handbook/2/basic-types.html
- Static Analysis: https://en.wikipedia.org/wiki/Static_program_analysis
- Type Checking: https://en.wikipedia.org/wiki/Type_system#Type_checking

### Similar Systems

- Excel Formula Type System
- SQL Type System
- Python Type Hints (PEP 484)

---

## Conclusion

The Formula Type System will transform the formula editor from a JavaScript-like "anything goes" environment to a type-safe, predictable system that catches errors early and provides clear feedback. This epic represents a significant quality-of-life improvement for formula authors and will prevent entire classes of bugs from reaching production.

**Key Principle:** If it doesn't type check, it doesn't run.
