# List/Array Type Support - Increment 1: Foundation

**Date:** October 27, 2025  
**Status:** ✅ Complete  
**EPIC:** List/Array Type Support  

---

## Summary

Implemented **Increment 1 (Foundation)** of the List/Array Type Support EPIC. Established core infrastructure for lists including type definitions, tokenization, parsing, AST nodes, evaluation, and debugging support.

---

## Context

Lists/arrays are essential for batch operations, data processing, and working with collections. This increment establishes the foundation - the ability to create list literals and access elements by index - before adding list manipulation functions in later increments.

---

## Implementation Details

### 1. Type System - ListType

**File:** `/services/evaluationEngine/types/TypeSystem.ts`

Added comprehensive list type support:

```typescript
// List type definition
export interface ListType {
  kind: 'list';
  elementType: PrimitiveType;
}

// Union type for all formula types
export type FormulaType = PrimitiveType | ListType;

// Type guards
export function isList(type: FormulaType): type is ListType
export function createListType(elementType: PrimitiveType): ListType
export function getListElementType(type: ListType): PrimitiveType
```

**Updated functions:**
- `inferType(value)` - Now detects arrays and infers element type from first element
- `isType(value, expectedType)` - Handles list type comparisons
- `formatValue(value, type?)` - Formats lists as `[1, 2, 3]`

**Key Features:**
- **Homogeneous type tracking** - Each list knows its element type
- **Type inference** - Infer `List<number>` from `[1, 2, 3]`
- **No nested lists** - Throws error if attempting to create `List<List<T>>`
- **Empty list handling** - Throws error (cannot infer type)

### 2. Tokenizer - Bracket Tokens

**File:** `/services/evaluationEngine/parsers/Tokenizer.ts`

Added two new token types:
- `LBRACKET` - Left bracket `[`
- `RBRACKET` - Right bracket `]`

**Implementation:**
```typescript
// In readOperatorOrDelimiter()
case '[': return { type: 'LBRACKET', line, column };
case ']': return { type: 'RBRACKET', line, column };
```

### 3. AST Nodes

**File:** `/services/evaluationEngine/ast/ASTNodes.ts`

Added two new AST node types:

```typescript
// List literal: [1, 2, 3]
export interface ListLiteral extends ASTNode {
  type: 'ListLiteral';
  elements: Expression[];
}

// Index access: $list[0], $list[-1]
export interface IndexAccess extends ASTNode {
  type: 'IndexAccess';
  object: Expression;
  index: Expression;
}
```

Updated union types:
- Added `ListLiteral` to `Literal` type
- Added `IndexAccess` to `Expression` type
- Updated type guards (`isExpression`, `isLiteral`)

### 4. Parser

**File:** `/services/evaluationEngine/parsers/FormulaParser.ts`

Added parsing support for lists:

**Postfix operator support:**
```typescript
// Modified unary() to call postfix() instead of primary()
private unary(): Expression {
  if (this.match('MINUS', 'NOT')) {
    // ... unary logic
  }
  return this.postfix();  // ← Changed from primary()
}

// New postfix() method handles index access
private postfix(): Expression {
  let expr = this.primary();
  
  while (this.match('LBRACKET')) {
    const index = this.expression();
    this.consume('RBRACKET', 'Expected ] after index');
    
    expr = {
      type: 'IndexAccess',
      object: expr,
      index,
      location: expr.location
    };
  }
  
  return expr;
}
```

**List literal parsing:**
```typescript
// In primary() method
if (this.match('LBRACKET')) {
  return this.listLiteral();
}

private listLiteral(): ListLiteral {
  const startToken = this.previous();
  const elements: Expression[] = [];
  
  if (!this.check('RBRACKET')) {
    do {
      elements.push(this.expression());
    } while (this.match('COMMA'));
  }
  
  this.consume('RBRACKET', 'Expected ] after list elements');
  
  return {
    type: 'ListLiteral',
    elements,
    location: this.createLocation(startToken)
  };
}
```

**Supports:**
- Empty lists: `[]`
- Single element: `[42]`
- Multiple elements: `[1, 2, 3]`
- Complex expressions: `[$a + 1, $b * 2, ROUND($c, 2)]`

### 5. Evaluator

**File:** `/services/evaluationEngine/runtime/Evaluator.ts`

Added evaluation logic for lists:

```typescript
case 'ListLiteral':
  return this.evaluateListLiteral(expr as ListLiteral, context);

case 'IndexAccess':
  return this.evaluateIndexAccess(expr as IndexAccess, context);
```

**List literal evaluation:**
```typescript
private evaluateListLiteral(listLiteral: ListLiteral, context: ExecutionContext): any[] {
  // Empty list
  if (listLiteral.elements.length === 0) {
    return [];
  }
  
  // Evaluate all elements
  const elements = listLiteral.elements.map(el => 
    this.evaluateExpression(el, context)
  );
  
  // Homogeneous type checking
  const firstType = inferType(elements[0]);
  for (let i = 1; i < elements.length; i++) {
    const elementType = inferType(elements[i]);
    
    // Reject nested lists
    if (isList(firstType) || isList(elementType)) {
      throw new EvalTypeError(
        `List elements must be primitive types, not lists`,
        listLiteral.location
      );
    }
    
    // Check type consistency
    if (firstType !== elementType) {
      throw new EvalTypeError(
        `List elements must be homogeneous. Expected ${firstType}, got ${elementType} at index ${i}`,
        listLiteral.location,
        { expected: firstType, actual: elementType, position: i }
      );
    }
  }
  
  return elements;
}
```

**Index access evaluation:**
```typescript
private evaluateIndexAccess(indexAccess: IndexAccess, context: ExecutionContext): any {
  // Evaluate the object being indexed
  const obj = this.evaluateExpression(indexAccess.object, context);
  
  // Validate it's an array
  if (!Array.isArray(obj)) {
    throw new EvalTypeError(
      `Cannot index non-list value`,
      indexAccess.location,
      { actualType: inferType(obj) }
    );
  }
  
  // Evaluate the index
  const index = this.evaluateExpression(indexAccess.index, context);
  
  // Validate index is a number
  if (typeof index !== 'number') {
    throw new EvalTypeError(
      `List index must be a number`,
      indexAccess.location,
      { actualType: inferType(index) }
    );
  }
  
  // Validate index is an integer
  if (!Number.isInteger(index)) {
    throw new RuntimeError(
      `List index must be an integer, got ${index}`,
      indexAccess.location
    );
  }
  
  // Handle negative indexing (-1 = last element)
  const actualIndex = index < 0 ? obj.length + index : index;
  
  // Bounds checking
  if (actualIndex < 0 || actualIndex >= obj.length) {
    throw new RuntimeError(
      `List index out of bounds: ${index} (list length: ${obj.length})`,
      indexAccess.location,
      { index, actualIndex, length: obj.length }
    );
  }
  
  return obj[actualIndex];
}
```

**Error Handling:**
- ✅ Type mismatch in list elements
- ✅ Nested lists rejected
- ✅ Non-array indexing rejected
- ✅ Non-numeric index rejected
- ✅ Non-integer index rejected
- ✅ Out-of-bounds access caught

### 6. Tracing Evaluator (Debugging)

**File:** `/services/evaluationEngine/debugger/TracingEvaluator.ts`

Added full debugging support for lists:

**Evaluation:**
```typescript
case 'ListLiteral': {
  const listLiteral = expr as any;
  
  if (!listLiteral.elements || listLiteral.elements.length === 0) {
    return [];
  }
  
  const elements = listLiteral.elements.map((el: Expression) => 
    this.evaluateExpression(el, context)
  );
  
  // Homogeneous type checking
  const firstType = this.getType(elements[0]);
  for (let i = 1; i < elements.length; i++) {
    const elementType = this.getType(elements[i]);
    if (firstType !== elementType) {
      throw new Error(
        `List elements must be homogeneous. Expected ${firstType}, got ${elementType} at index ${i}`
      );
    }
  }
  
  return elements;
}

case 'IndexAccess': {
  // ... full index access with validation
}
```

**Type inference:**
```typescript
private getType(value: any): PrimitiveType | string {
  if (Array.isArray(value)) {
    if (value.length === 0) return 'list';
    const elemType = this.getType(value[0]);
    return `list<${elemType}>`;  // e.g., "list<number>"
  }
  // ... primitive types
}
```

**Value formatting:**
```typescript
private formatValue(value: any): string {
  if (Array.isArray(value)) {
    const elements = value.map(el => this.formatValue(el));
    return `[${elements.join(', ')}]`;
  }
  // ... primitive formatting
}
```

**Expression descriptions:**
```typescript
// In buildExpressionDescription
case 'ListLiteral': {
  return `${resultStr} ${resultType}`;  // e.g., "[1, 2, 3] LIST<NUMBER>"
}

case 'IndexAccess': {
  const indexAccess = expr as any;
  const objStr = this.formatExpressionValue(indexAccess.object, variableSnapshot);
  const indexStr = this.formatExpressionValue(indexAccess.index, variableSnapshot);
  return `${objStr}[${indexStr}] = ${resultStr} ${resultType}`;
}
```

### 7. Syntax Highlighting

**File:** `/components/editors/code/FormulaEditor/hooks/useFormulaSyntax.ts`

Bracket highlighting already existed (line 64-69):

```typescript
// Parentheses and brackets
{
  name: 'bracket',
  pattern: /[()[\\]{}]/g,
  className: 'formula-bracket',
  priority: 2,
},
```

**CSS Styling:**

File: `/components/editors/code/FormulaEditor/FormulaEditor.module.css`

```css
:global(.formula-bracket) {
  color: var(--syntax-bracket);
  font-weight: 600;
}
```

Lists automatically get highlighted with the existing bracket styling.

---

## Design Decisions

### Homogeneous Lists Only

**Rationale:**
- Simpler type system
- Better type safety
- Clearer error messages
- Easier to optimize

**Enforced at runtime:**
```typescript
// ✅ Valid
[1, 2, 3]           // List<number>
["a", "b", "c"]     // List<string>

// ❌ Error
[1, "a", true]      // Mixed types
```

### Negative Indexing

**Python-style negative indices:**
- `-1` = last element
- `-2` = second-to-last
- etc.

```typescript
const actualIndex = index < 0 ? obj.length + index : index;
```

**Benefits:**
- More ergonomic than `$list[LENGTH($list) - 1]`
- Familiar to Python/Ruby users
- Common in modern languages

### Empty Lists

**Current behavior:** Empty lists are allowed but cannot infer type

```typescript
$empty = []         // Returns []
LENGTH($empty)      // Returns 0
LIST_SUM($empty)    // Returns 0 (identity)
```

**Future consideration:** Require type annotations for empty lists  
```typescript
$empty: List<number> = []   // Explicit type (not yet implemented)
```

### Non-Mutating Operations

Lists are treated as **immutable values**:
- Index access returns element copy
- Future operations (REVERSE, SORT, etc.) return new lists
- Original lists never modified

**Example:**
```typescript
$original = [1, 2, 3]
$reversed = REVERSE($original)  // Returns [3, 2, 1]
// $original is still [1, 2, 3]
```

---

## Files Changed

### Modified Files
1. `/services/evaluationEngine/types/TypeSystem.ts`
   - Added `ListType` interface and `FormulaType` union
   - Added `isList`, `createListType`, `getListElementType` helpers
   - Updated `inferType`, `isType`, `formatValue` for lists
   
2. `/services/evaluationEngine/parsers/Tokenizer.ts`
   - Added `LBRACKET` and `RBRACKET` token types
   - Added bracket tokenization in `readOperatorOrDelimiter()`
   
3. `/services/evaluationEngine/ast/ASTNodes.ts`
   - Added `ListLiteral` and `IndexAccess` node interfaces
   - Updated `Literal` and `Expression` union types
   - Updated `isExpression` and `isLiteral` type guards
   
4. `/services/evaluationEngine/parsers/FormulaParser.ts`
   - Added imports for `ListLiteral` and `IndexAccess` types
   - Modified `unary()` to call `postfix()` instead of `primary()`
   - Added `postfix()` method for index access
   - Added `listLiteral()` method for parsing list literals
   
5. `/services/evaluationEngine/runtime/Evaluator.ts`
   - Added imports for `ListLiteral` and `IndexAccess` types
   - Added cases for `ListLiteral` and `IndexAccess` in `evaluateExpression()`
   - Added `evaluateListLiteral()` method with type checking
   - Added `evaluateIndexAccess()` method with bounds checking
   
6. `/services/evaluationEngine/debugger/TracingEvaluator.ts`
   - Added `ListLiteral` and `IndexAccess` evaluation
   - Updated `getType()` to return `list<elementType>` format
   - Updated `formatValue()` to format lists as `[1, 2, 3]`
   - Updated `buildExpressionDescription()` for list expressions
   - Updated `formatExpressionValue()` for list expressions

### New Files
- None (all changes to existing files)

---

## Testing

### Manual Test Cases

**Test in Formula Editor:**

```
// Basic list creation
$numbers = [10, 20, 30, 40, 50]

// Positive indexing
$numbers[0]         // 10
$numbers[2]         // 30
$numbers[4]         // 50

// Negative indexing
$numbers[-1]        // 50 (last)
$numbers[-2]        // 40 (second-to-last)

// Empty list
$empty = []
LENGTH($empty)      // 0 (when LENGTH function added)

// Nested expressions
$values = [$a + 1, $b * 2, $c]
$values[1]          // $b * 2

// Complex access
$matrix = [[1, 2], [3, 4]]    // Will error (no nested lists)
```

### Error Cases

```
// Type mismatch
[1, 2, "three"]     // ERROR: Mixed types

// Nested lists
[[1, 2], [3, 4]]    // ERROR: No nested lists

// Out of bounds
$nums = [1, 2, 3]
$nums[10]           // ERROR: Index 10 out of bounds

// Non-integer index
$nums[1.5]          // ERROR: Index must be integer

// Non-numeric index
$nums["first"]      // ERROR: Index must be number

// Indexing non-list
$number = 42
$number[0]          // ERROR: Cannot index non-list
```

---

## Next Steps

### Increment 2: Core Functions ✅ (Completed)
See: `/change-log/25-10-27_v01-ListArrayTypeIncrement2.md`

- ✅ `LENGTH($list)` - Get list length
- ✅ `LIST_SUM($list)` - Sum numeric list
- ✅ `LIST_AVG($list)` - Average
- ✅ `LIST_MIN($list)`, `LIST_MAX($list)` - Min/Max
- ✅ `CONTAINS($list, value)` - Search
- ✅ `FIRST($list)`, `LAST($list)` - Element access
- ✅ `REVERSE($list)` - Reverse order

### Increment 3: Advanced Functions (Planned)
- `SLICE($list, start, end)` - Extract sublist
- `CONCAT($list1, $list2)` - Concatenate
- `UNIQUE($list)` - Remove duplicates
- `SORT($list)` - Sort ascending
- `JOIN($list, separator)` - Join to string
- `RANGE(start, end)` - Generate list
- `INDEX_OF($list, value)` - Find index

### Increment 4: Lambda Support (Planned)
- Lambda expression parsing
- `MAP($list, $x -> transform)`
- `FILTER($list, $x -> predicate)`

---

## Known Limitations

### Current Scope
- ✅ Can create list literals
- ✅ Can access elements by index
- ❌ No list manipulation functions yet (Increment 2)
- ❌ No lambda expressions yet (Increment 4)
- ❌ No type annotations for empty lists yet

### Design Constraints
- **No nested lists** - Enforced by type system
- **Homogeneous only** - All elements must be same type
- **No empty list type inference** - Cannot determine element type

---

## Impact

### For Formula Authors
✅ Can now work with collections of values  
✅ Can create lists: `[1, 2, 3]`, `["a", "b", "c"]`  
✅ Can access elements: `$list[0]`, `$list[-1]`  
✅ Type-safe - errors for mixed types  
✅ Clear error messages for common mistakes  

### For The System
✅ Foundation for list functions (Increment 2+)  
✅ Type system extended to handle collections  
✅ Parser supports new syntax  
✅ Evaluator handles list operations  
✅ Debugger shows lists in traces  

---

## References

- **EPIC:** `/change-log/EPIC-ListArrayType.md`
- **Next Increment:** `/change-log/25-10-27_v01-ListArrayTypeIncrement2.md`
- **Type System:** `/services/evaluationEngine/types/TypeSystem.ts`
- **Parser:** `/services/evaluationEngine/parsers/FormulaParser.ts`
- **Evaluator:** `/services/evaluationEngine/runtime/Evaluator.ts`
