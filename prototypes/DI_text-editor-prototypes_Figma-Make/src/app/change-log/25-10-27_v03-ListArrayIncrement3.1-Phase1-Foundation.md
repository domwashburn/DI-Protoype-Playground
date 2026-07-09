# List/Array Type - Increment 3.1 Phase 1: Object Foundation

**Date:** October 27, 2025  
**Status:** 🚧 In Progress  
**EPIC:** List/Array Type Support  
**Phase:** Phase 1 - Object Foundation

---

## Summary

Implementing **Increment 3.1: Structured Data (Arrays of Objects)** to enable realistic data modeling with objects and property access. Phase 1 focuses on the foundational infrastructure for object types.

---

## Context

With Increment 3 complete (20+ list functions), users can work with homogeneous lists of primitives. However, real-world data is often structured (e.g., sales records with names, divisions, amounts). 

**Goal:** Enable arrays of objects like:
```
$salesData = [
  {name: "Alice Chen", division: "West", amount: 45000},
  {name: "Bob Smith", division: "East", amount: 78000},
  {name: "Charlie Brown", division: "West", amount: 52000}
]

$amounts = PLUCK($salesData, "amount")
$topSeller = FIRST(SORT_BY_DESC($salesData, "amount"))
$topName = $topSeller.name
```

---

## Phase 1: Object Foundation

### Objectives
1. ✅ Add ObjectType to type system
2. ✅ Add LBRACE, RBRACE, COLON, DOT tokens
3. ✅ Add ObjectLiteral and PropertyAccess AST nodes
4. 🚧 Implement object literal parsing
5. 🚧 Implement property access parsing
6. 🚧 Implement object literal evaluation
7. 🚧 Implement property access evaluation
8. ⏳ Update syntax highlighting

---

## Implementation Progress

### 1. Type System ✅ COMPLETE

**Added ObjectType:**
```typescript
export interface ObjectType {
  kind: 'object';
  properties: Map<string, PrimitiveType | ListType>;
}

export type FormulaType = PrimitiveType | ListType | ObjectType;
```

**Type Guards:**
- `isObject(type)` - Check if type is ObjectType
- `areObjectShapesCompatible(type1, type2)` - Validate same shape
- `areFormulaTypesEqual(type1, type2)` - Recursive type equality

**Updated inferType():**
```typescript
if (typeof value === 'object' && value !== null) {
  // Plain object - infer object type
  const properties = new Map<string, PrimitiveType | ListType>();
  for (const [key, val] of Object.entries(value)) {
    const propType = inferType(val);
    if (isObject(propType)) {
      throw new Error('Nested objects are not yet supported');
    }
    properties.set(key, propType);
  }
  return createObjectType(properties);
}
```

**Updated formatValue():**
```typescript
// Handle object types
if (isObject(valueType) || (typeof value === 'object' && ...)) {
  const pairs: string[] = [];
  for (const [key, val] of Object.entries(value)) {
    pairs.push(`${key}: ${formatValue(val)}`);
  }
  return `{${pairs.join(', ')}}`;
}
```

**Updated ListType:**
```typescript
export interface ListType {
  kind: 'list';
  elementType: PrimitiveType | ObjectType;  // Now supports objects!
}
```

**Files Modified:**
- `/services/evaluationEngine/types/TypeSystem.ts`

---

### 2. Tokenizer ✅ COMPLETE

**Added Tokens:**
```typescript
export type TokenType =
  // ... existing tokens
  | 'LBRACE'       // {
  | 'RBRACE'       // }
  | 'COLON'        // :
  | 'DOT'          // .
```

**Updated readOperatorOrDelimiter():**
```typescript
case '{': return { type: 'LBRACE', line, column };
case '}': return { type: 'RBRACE', line, column };
case ':': return { type: 'COLON', line, column };
case '.': return { type: 'DOT', line, column };
```

**Important:** DOT handling preserves decimal number parsing:
```typescript
// Check for decimal point (only if followed by digit)
// This prevents consuming DOT for property access (e.g., in "42.toString()")
if (this.peek() === '.' && this.isDigit(this.peekNext())) {
  numStr += this.advance(); // consume '.'
  // ... rest of decimal parsing
}
```

**Example Tokenization:**
```
Input: {name: "Alice", age: 30}
Tokens: LBRACE, IDENTIFIER("name"), COLON, STRING("Alice"), COMMA, 
        IDENTIFIER("age"), COLON, NUMBER(30), RBRACE

Input: $person.name
Tokens: VARIABLE("person"), DOT, IDENTIFIER("name")
```

**Files Modified:**
- `/services/evaluationEngine/parsers/Tokenizer.ts`

---

### 3. AST Nodes ✅ COMPLETE

**Added ObjectLiteral:**
```typescript
export interface ObjectLiteral extends ASTNode {
  type: 'ObjectLiteral';
  properties: Array<{
    key: string;
    value: Expression;
  }>;
}
```

**Added PropertyAccess:**
```typescript
export interface PropertyAccess extends ASTNode {
  type: 'PropertyAccess';
  object: Expression;
  property: string;
}
```

**Updated Union Types:**
```typescript
export type Literal =
  | NumberLiteral
  | StringLiteral
  | BooleanLiteral
  | DateLiteral
  | ListLiteral
  | ObjectLiteral;  // NEW

export type Expression =
  | Literal
  | VariableRef
  | AttributeRef
  | BinaryOp
  | UnaryOp
  | FunctionCall
  | IfExpression
  | IndexAccess
  | PropertyAccess;  // NEW
```

**Updated Type Guards:**
- `isExpression()` - Includes ObjectLiteral and PropertyAccess
- `isLiteral()` - Includes ObjectLiteral

**Files Modified:**
- `/services/evaluationEngine/ast/ASTNodes.ts`

---

### 4. Parser 🚧 IN PROGRESS

**To Implement:**

#### parseObjectLiteral()
```typescript
private parseObjectLiteral(): ObjectLiteral {
  this.expect(TokenType.LBRACE);
  
  const properties: Array<{key: string; value: Expression}> = [];
  
  while (!this.check(TokenType.RBRACE)) {
    // Parse key
    const key = this.expect(TokenType.IDENTIFIER).value;
    
    // Expect colon
    this.expect(TokenType.COLON);
    
    // Parse value
    const value = this.parseExpression();
    
    properties.push({ key, value });
    
    // Optional comma
    if (!this.check(TokenType.RBRACE)) {
      this.expect(TokenType.COMMA);
    }
  }
  
  this.expect(TokenType.RBRACE);
  
  return {
    type: 'ObjectLiteral',
    properties
  };
}
```

#### parsePropertyAccess()
```typescript
// Integrate into parsePrimary or parsePostfix
private parsePropertyAccess(object: Expression): PropertyAccess {
  this.expect(TokenType.DOT);
  const property = this.expect(TokenType.IDENTIFIER).value;
  
  return {
    type: 'PropertyAccess',
    object,
    property
  };
}

// In parsePostfix (handle chaining)
private parsePostfix(): Expression {
  let expr = this.parsePrimary();
  
  while (true) {
    if (this.check(TokenType.LBRACKET)) {
      expr = this.parseIndexAccess(expr);
    } else if (this.check(TokenType.DOT)) {
      expr = this.parsePropertyAccess(expr);
    } else {
      break;
    }
  }
  
  return expr;
}
```

**Example Parsing:**
```
Input: {name: "Alice", age: 30}
AST:
{
  type: 'ObjectLiteral',
  properties: [
    {key: 'name', value: {type: 'StringLiteral', value: 'Alice'}},
    {key: 'age', value: {type: 'NumberLiteral', value: 30}}
  ]
}

Input: $person.name
AST:
{
  type: 'PropertyAccess',
  object: {type: 'VariableRef', name: 'person'},
  property: 'name'
}
```

---

### 5. Evaluator 🚧 IN PROGRESS

**To Implement:**

#### Evaluate ObjectLiteral
```typescript
case 'ObjectLiteral': {
  const obj: Record<string, any> = {};
  
  for (const prop of node.properties) {
    obj[prop.key] = this.evaluate(prop.value, context);
  }
  
  return obj;
}
```

#### Evaluate PropertyAccess
```typescript
case 'PropertyAccess': {
  const obj = this.evaluate(node.object, context);
  
  if (typeof obj !== 'object' || obj === null) {
    throw new EvaluationError(
      `Cannot access property '${node.property}' on non-object value`
    );
  }
  
  if (!(node.property in obj)) {
    throw new EvaluationError(
      `Property '${node.property}' does not exist on object`
    );
  }
  
  return obj[node.property];
}
```

**Type Checking:**
```typescript
// During type inference
case 'PropertyAccess': {
  const objectType = this.inferType(node.object, context);
  
  if (!isObject(objectType)) {
    throw new TypeError(
      `Cannot access property on non-object type: ${objectType}`
    );
  }
  
  const propertyType = objectType.properties.get(node.property);
  
  if (!propertyType) {
    throw new TypeError(
      `Property '${node.property}' does not exist on object type`
    );
  }
  
  return propertyType;
}
```

---

## Test Cases (Planned)

### Basic Object Literals
```typescript
// Simple object
$person = {name: "Alice", age: 30}

// Mixed types
$record = {
  name: "Bob",
  amount: 45000,
  active: true,
  date: DATE("2025-01-15")
}
```

### Property Access
```typescript
$person = {name: "Alice", age: 30}
$name = $person.name      // "Alice"
$age = $person.age        // 30
```

### Chained Access
```typescript
$team = [
  {name: "Alice", amount: 45000},
  {name: "Bob", amount: 78000}
]

$first = $team[0]         // {name: "Alice", amount: 45000}
$firstName = $first.name  // "Alice"

// Or chained
$firstAmount = $team[0].amount  // 45000
```

### Error Cases
```typescript
// Non-object property access
$num = 42
$bad = $num.value  // ERROR: Cannot access property on non-object

// Missing property
$person = {name: "Alice"}
$bad = $person.salary  // ERROR: Property 'salary' does not exist

// Wrong type in object
$bad = {name: "Alice", age: "thirty"}  // Type checking phase
```

---

## Next Steps

### Remaining Phase 1 Tasks
1. 🚧 Complete parser implementation (parseObjectLiteral, parsePropertyAccess)
2. 🚧 Complete evaluator implementation (handle ObjectLiteral, PropertyAccess)
3. ⏳ Add syntax highlighting for object syntax
4. ⏳ Test basic object literals
5. ⏳ Test property access
6. ⏳ Test error handling

### Phase 2: Arrays of Objects
1. List of objects shape validation
2. Homogeneity checking
3. Error messages for mismatched shapes
4. Sample formulas with object arrays

### Phase 3: Object Functions
1. PLUCK function
2. SORT_BY and SORT_BY_DESC
3. GROUP_BY function
4. COUNT_BY function
5. Comprehensive samples

---

## Files Modified (So Far)

### Type System
- `/services/evaluationEngine/types/TypeSystem.ts` ✅
  - Added ObjectType interface
  - Added type guards (isObject, areObjectShapesCompatible)
  - Updated inferType to handle objects
  - Updated formatValue to display objects

### Tokenizer
- `/services/evaluationEngine/parsers/Tokenizer.ts` ✅
  - Added LBRACE, RBRACE, COLON, DOT tokens
  - Updated readOperatorOrDelimiter
  - Preserved decimal number parsing

### AST
- `/services/evaluationEngine/ast/ASTNodes.ts` ✅
  - Added ObjectLiteral interface
  - Added PropertyAccess interface
  - Updated union types and type guards

### Parser
- `/services/evaluationEngine/parsers/FormulaParser.ts` 🚧
  - (To be implemented)

### Evaluator
- `/services/evaluationEngine/runtime/Evaluator.ts` 🚧
  - (To be implemented)

### TracingEvaluator
- `/services/evaluationEngine/debugger/TracingEvaluator.ts` ⏳
  - (To be updated after Evaluator)

---

## Future Enhancement Documented

Created comprehensive plan for **Variable Type List Support**:
- `/change-log/FUTURE-VariableTypeListSupport.md`
- Enables List as selectable variable type in UI
- JSON input validation
- Visual list editor (future phase)
- Sample data generation

**User Request:** Allow array/lists as a variable type in the Variables panel dropdown

---

## Design Decisions

### 1. No Nested Objects (Phase 1)
**Decision:** Flat objects only for now  
**Rationale:**
- Simplifies type inference
- Reduces complexity
- Still covers 90% of use cases
- Can add nesting in future increment

**Future:**
```typescript
// Phase 2+
$record = {
  customer: {
    name: "Alice",
    company: "ACME"
  },
  order: {
    amount: 45000,
    date: DATE("2025-01-15")
  }
}
```

### 2. DOT Token Handling
**Decision:** DOT is a separate token, not part of numbers  
**Rationale:**
- Enables property access syntax
- Numbers already handled: check if next char is digit before consuming DOT
- Clean separation of concerns

**Example:**
```
42.5      -> NUMBER(42.5)    // DOT consumed as part of number
$obj.prop -> VARIABLE, DOT, IDENTIFIER  // DOT is delimiter
```

### 3. Homogeneous Object Arrays
**Decision:** All objects in array must have same shape  
**Rationale:**
- Type safety guarantee
- Predictable PLUCK/SORT_BY behavior
- Aligns with list homogeneity principle
- Clear error messages

**Example:**
```
// ✅ Valid - same shape
[
  {name: "Alice", amount: 45000},
  {name: "Bob", amount: 78000}
]

// ❌ Invalid - different properties
[
  {name: "Alice", amount: 45000},
  {name: "Bob", quota: 60000}  // Different shape!
]
```

### 4. Immutability Preserved
**Decision:** Objects are immutable (no property assignment)  
**Rationale:**
- Consistent with list operations
- Predictable behavior
- Safe concurrent use
- Future: Object spread/merge functions

**Not Supported:**
```
$person.name = "Bob"  // ❌ No mutation
```

**Instead:**
```
// Future: Object spread/update functions
$updated = UPDATE($person, {name: "Bob"})
```

---

## Status

**Phase 1 Progress:**  
- ✅ Type System (100%)
- ✅ Tokenizer (100%)
- ✅ AST Nodes (100%)
- 🚧 Parser (0% - next task)
- ⏳ Evaluator (0%)
- ⏳ Syntax Highlighting (0%)
- ⏳ Testing (0%)

**Overall Increment 3.1:** ~30% complete

---

## References

- **Plan:** `/change-log/PLAN-ListArrayIncrement3.1-StructuredData.md`
- **Increment 3:** `/change-log/25-10-27_v02-ListArrayTypeIncrement3.md`
- **Type System:** `/services/evaluationEngine/types/TypeSystem.ts`
- **Tokenizer:** `/services/evaluationEngine/parsers/Tokenizer.ts`
- **AST:** `/services/evaluationEngine/ast/ASTNodes.ts`

---

**Created:** October 27, 2025  
**Status:** 🚧 Phase 1 In Progress  
**Next Task:** Implement parser for object literals and property access
