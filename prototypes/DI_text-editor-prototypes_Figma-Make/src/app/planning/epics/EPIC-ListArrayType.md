# EPIC: List/Array Type Support

**Status:** 🚧 In Progress (Increment 3 Complete - Core Complete!)  
**Priority:** Medium  
**Estimated Effort:** Large (3-5 days)  
**Dependencies:** Formula Evaluation Engine (Complete), Type System Foundation  
**Progress:** Foundation + Core + Advanced Functions Complete ✅ (20+ functions ready!)

---

## Overview

Add support for a **List/Array** type to the Formula Editor evaluation engine, enabling users to work with collections of homogeneous values. Lists will support common operations like filtering, mapping, aggregation, and element access.

### Key Constraints

1. **Homogeneous only** - All elements in a list must be the same primitive type
2. **No nested lists** - Lists cannot contain other lists (single-level only)
3. **Immutable operations** - List operations return new lists rather than mutating
4. **Type-safe** - Full type checking at parse time and runtime

---

## Motivation

**User Scenarios:**

1. **Batch calculations** - Apply a formula to multiple values at once
   ```
   LET $prices = [10.00, 15.50, 20.00, 8.75]
   LET $discounted = MAP($prices, $p -> $p * 0.9)
   RETURN SUM($discounted)
   ```

2. **Filtering datasets** - Select items matching criteria
   ```
   LET $scores = [85, 92, 78, 95, 88]
   LET $passing = FILTER($scores, $s -> $s >= 80)
   RETURN AVG($passing)
   ```

3. **Threshold ranges** - Work with multiple threshold values
   ```
   LET $thresholds = [0, 50, 100, 200]
   RETURN THRESHOLD($revenue, $thresholds, ["low", "medium", "high", "premium"])
   ```

4. **Multi-value lookups** - Process multiple related values
   ```
   LET $orderTotals = [120, 450, 890, 1200]
   RETURN COUNT(FILTER($orderTotals, $t -> $t > 1000))
   ```

**Benefits:**
- More expressive formulas
- Reduced code duplication
- Better support for batch operations
- Foundation for future data pipeline features

---

## Type System Design

### List Type Definition

**Syntax:**
```
List<T>  where T ∈ {number, string, boolean, date}
```

**Examples:**
```typescript
List<number>   // [1, 2, 3, 4]
List<string>   // ["apple", "banana", "cherry"]
List<boolean>  // [true, false, true]
List<date>     // [DATE("2025-01-01"), DATE("2025-02-01")]
```

**NOT Allowed:**
```typescript
List<List<number>>  // ❌ Nested lists not supported
List<any>           // ❌ Must specify element type
[]                  // ❌ Empty list without type annotation
```

### Type Inference

**Literal lists infer type from elements:**
```
[1, 2, 3]           // → List<number>
["a", "b", "c"]     // → List<string>
[true, false]       // → List<boolean>

[1, "a"]            // ❌ TYPE ERROR: Mixed types in list literal
[]                  // ❌ TYPE ERROR: Cannot infer type of empty list
```

**Empty lists require type annotation:**
```
LET $empty: List<number> = []     // ✅ Explicit type
LET $empty = []                   // ❌ Type error
```

### Type Checking Rules

1. **List literal elements must be homogeneous:**
   ```
   [1, 2, 3]        // ✅ All numbers
   [1, 2, "3"]      // ❌ Mixed number and string
   ```

2. **Variable assignment must match declared type:**
   ```
   LET $nums: List<number> = [1, 2, 3]     // ✅ Matches
   LET $nums: List<string> = [1, 2, 3]     // ❌ Type mismatch
   ```

3. **Function parameters must match list element type:**
   ```
   SUM([1, 2, 3])              // ✅ SUM expects List<number>
   SUM(["a", "b", "c"])        // ❌ Cannot sum strings
   ```

4. **List operations preserve element type:**
   ```
   MAP([1, 2, 3], $x -> $x * 2)           // → List<number>
   MAP(["a", "b"], $x -> UPPER($x))       // → List<string>
   FILTER([1, 2, 3], $x -> $x > 1)        // → List<number>
   ```

---

## Language Syntax

### List Literals

**Syntax:**
```
list_literal := "[" [expression ("," expression)*] "]"
```

**Examples:**
```
[1, 2, 3, 4, 5]
["red", "green", "blue"]
[true, false, true, true]
[$var1, $var2, $var3]
[10 + 5, 20 * 2, 30 / 3]
```

### List Indexing

**Syntax:**
```
list_access := expression "[" expression "]"
```

**Behavior:**
- **0-based indexing** - First element is index 0
- **Negative indexing** - -1 is last element, -2 is second-to-last, etc.
- **Out of bounds** - Returns `null` (or error based on configuration)

**Examples:**
```
LET $nums = [10, 20, 30, 40]

$nums[0]        // → 10 (first element)
$nums[2]        // → 30 (third element)
$nums[-1]       // → 40 (last element)
$nums[-2]       // → 30 (second-to-last)
$nums[10]       // → null (out of bounds)
```

### List Type Annotations

**Syntax:**
```
type_annotation := ":" "List" "<" primitive_type ">"
```

**Examples:**
```
LET $scores: List<number> = [85, 90, 78]
LET $names: List<string> = []
LET $flags: List<boolean> = [true, false]
```

---

## Built-in Functions

### Aggregation Functions

**`LENGTH(list: List<T>) -> number`**
- Returns the number of elements in the list
```
LENGTH([1, 2, 3, 4])           // → 4
LENGTH([])                     // → 0
LENGTH(["a", "b"])             // → 2
```

**`SUM(list: List<number>) -> number`**
- Returns the sum of all numeric elements
```
SUM([1, 2, 3, 4])              // → 10
SUM([])                        // → 0
SUM([10.5, 20.25])             // → 30.75
```

**`AVG(list: List<number>) -> number`**
- Returns the average (mean) of numeric elements
```
AVG([1, 2, 3, 4])              // → 2.5
AVG([100])                     // → 100
AVG([])                        // → null (or error)
```

**`MIN(list: List<number>) -> number`**
- Returns the minimum value
```
MIN([5, 2, 8, 1, 9])           // → 1
MIN([42])                      // → 42
MIN([])                        // → null
```

**`MAX(list: List<number>) -> number`**
- Returns the maximum value
```
MAX([5, 2, 8, 1, 9])           // → 9
MAX([42])                      // → 42
MAX([])                        // → null
```

**`COUNT(list: List<T>) -> number`**
- Alias for LENGTH (for clarity in some contexts)
```
COUNT([1, 2, 3])               // → 3
COUNT(FILTER($items, ...))     // → number of matching items
```

### Transformation Functions

**`MAP(list: List<T>, fn: T -> R) -> List<R>`**
- Transforms each element using a function
```
MAP([1, 2, 3], $x -> $x * 2)              // → [2, 4, 6]
MAP(["a", "b"], $x -> UPPER($x))          // → ["A", "B"]
MAP([10, 20, 30], $x -> $x > 15)          // → [false, true, true]
```

**`FILTER(list: List<T>, predicate: T -> boolean) -> List<T>`**
- Returns elements that match the predicate
```
FILTER([1, 2, 3, 4], $x -> $x > 2)        // → [3, 4]
FILTER(["a", "ab", "abc"], $x -> LENGTH($x) > 1)  // → ["ab", "abc"]
FILTER([10, 20, 30], $x -> $x MOD 20 = 0) // → [20]
```

**`SORT(list: List<T>) -> List<T>`**
- Returns a sorted copy of the list (ascending)
```
SORT([3, 1, 4, 1, 5])          // → [1, 1, 3, 4, 5]
SORT(["c", "a", "b"])          // → ["a", "b", "c"]
```

**`REVERSE(list: List<T>) -> List<T>`**
- Returns a reversed copy of the list
```
REVERSE([1, 2, 3])             // → [3, 2, 1]
REVERSE(["a", "b", "c"])       // → ["c", "b", "a"]
```

**`SLICE(list: List<T>, start: number, end?: number) -> List<T>`**
- Returns a subset of the list from start (inclusive) to end (exclusive)
```
SLICE([1, 2, 3, 4, 5], 1, 3)   // → [2, 3]
SLICE([1, 2, 3, 4, 5], 2)      // → [3, 4, 5] (from index 2 to end)
SLICE([1, 2, 3, 4, 5], -2)     // → [4, 5] (last 2 elements)
```

### Search Functions

**`CONTAINS(list: List<T>, value: T) -> boolean`**
- Returns true if the list contains the value
```
CONTAINS([1, 2, 3], 2)         // → true
CONTAINS([1, 2, 3], 5)         // → false
CONTAINS(["a", "b"], "c")      // → false
```

**`INDEX_OF(list: List<T>, value: T) -> number`**
- Returns the first index of value, or -1 if not found
```
INDEX_OF([1, 2, 3, 2], 2)      // → 1 (first occurrence)
INDEX_OF([1, 2, 3], 5)         // → -1 (not found)
```

**`FIND(list: List<T>, predicate: T -> boolean) -> T | null`**
- Returns the first element matching the predicate, or null
```
FIND([1, 2, 3, 4], $x -> $x > 2)           // → 3
FIND([1, 2, 3], $x -> $x > 10)             // → null
```

### Utility Functions

**`CONCAT(list1: List<T>, list2: List<T>) -> List<T>`**
- Combines two lists into one
```
CONCAT([1, 2], [3, 4])         // → [1, 2, 3, 4]
CONCAT(["a"], ["b", "c"])      // → ["a", "b", "c"]
```

**`UNIQUE(list: List<T>) -> List<T>`**
- Returns list with duplicates removed
```
UNIQUE([1, 2, 2, 3, 1])        // → [1, 2, 3]
UNIQUE(["a", "b", "a"])        // → ["a", "b"]
```

**`RANGE(start: number, end: number, step?: number) -> List<number>`**
- Generates a list of numbers
```
RANGE(1, 5)                    // → [1, 2, 3, 4, 5]
RANGE(0, 10, 2)                // → [0, 2, 4, 6, 8, 10]
RANGE(5, 1, -1)                // → [5, 4, 3, 2, 1]
```

---

## Implementation Plan

### Phase 1: Type System & Parser (Day 1-2)

**Files to modify:**
- `/services/evaluationEngine/types/TypeSystem.ts`
- `/services/evaluationEngine/parsers/Tokenizer.ts`
- `/services/evaluationEngine/parsers/FormulaParser.ts`
- `/services/evaluationEngine/ast/ASTNodes.ts`

**Tasks:**

1. **Add List type to TypeSystem:**
   ```typescript
   export type PrimitiveType = 'number' | 'string' | 'boolean' | 'date';
   
   export interface ListType {
     kind: 'list';
     elementType: PrimitiveType;
   }
   
   export type FormulaType = PrimitiveType | ListType;
   
   export function isList(type: FormulaType): type is ListType {
     return typeof type === 'object' && type.kind === 'list';
   }
   
   export function getListElementType(type: ListType): PrimitiveType {
     return type.elementType;
   }
   
   export function createListType(elementType: PrimitiveType): ListType {
     return { kind: 'list', elementType };
   }
   ```

2. **Add list literal tokens:**
   ```typescript
   // In Tokenizer.ts
   { type: 'LEFT_BRACKET', value: '[' }
   { type: 'RIGHT_BRACKET', value: ']' }
   { type: 'COMMA', value: ',' }
   ```

3. **Add list literal AST node:**
   ```typescript
   // In ASTNodes.ts
   export interface ListLiteralNode extends BaseNode {
     type: 'ListLiteral';
     elements: ExpressionNode[];
     elementType?: PrimitiveType; // Inferred from elements
   }
   
   export interface IndexAccessNode extends BaseNode {
     type: 'IndexAccess';
     list: ExpressionNode;
     index: ExpressionNode;
   }
   
   export interface LambdaNode extends BaseNode {
     type: 'Lambda';
     parameter: string;
     body: ExpressionNode;
   }
   ```

4. **Parse list literals:**
   ```typescript
   // In FormulaParser.ts
   private parseListLiteral(): ListLiteralNode {
     this.consume('LEFT_BRACKET');
     const elements: ExpressionNode[] = [];
     
     if (!this.check('RIGHT_BRACKET')) {
       do {
         elements.push(this.parseExpression());
       } while (this.match('COMMA'));
     }
     
     this.consume('RIGHT_BRACKET');
     
     // Infer element type from first element
     // Validate all elements have same type
     
     return {
       type: 'ListLiteral',
       elements,
       location: { /* ... */ }
     };
   }
   
   private parseIndexAccess(list: ExpressionNode): IndexAccessNode {
     this.consume('LEFT_BRACKET');
     const index = this.parseExpression();
     this.consume('RIGHT_BRACKET');
     
     return {
       type: 'IndexAccess',
       list,
       index,
       location: { /* ... */ }
     };
   }
   ```

5. **Type checking for list literals:**
   - Validate all elements have same type
   - Infer list element type
   - Check empty lists have type annotation
   - Validate against declared variable types

### Phase 2: Runtime Evaluation (Day 2-3)

**Files to modify:**
- `/services/evaluationEngine/runtime/Evaluator.ts`
- `/services/evaluationEngine/debugger/TracingEvaluator.ts`

**Tasks:**

1. **Add list value representation:**
   ```typescript
   export type RuntimeValue = 
     | number 
     | string 
     | boolean 
     | Date 
     | RuntimeValue[]; // List values
   ```

2. **Evaluate list literals:**
   ```typescript
   private evaluateListLiteral(node: ListLiteralNode, context: Context): any[] {
     const elements = node.elements.map(el => this.evaluate(el, context));
     
     // Runtime type checking
     if (elements.length > 0) {
       const firstType = typeof elements[0];
       const allSameType = elements.every(el => typeof el === firstType);
       
       if (!allSameType) {
         throw new EvaluationError('List elements must be homogeneous', node);
       }
     }
     
     return elements;
   }
   ```

3. **Evaluate index access:**
   ```typescript
   private evaluateIndexAccess(node: IndexAccessNode, context: Context): any {
     const list = this.evaluate(node.list, context);
     const index = this.evaluate(node.index, context);
     
     if (!Array.isArray(list)) {
       throw new EvaluationError('Index access requires a list', node);
     }
     
     if (typeof index !== 'number') {
       throw new EvaluationError('Index must be a number', node);
     }
     
     // Handle negative indexing
     const actualIndex = index < 0 ? list.length + index : index;
     
     // Bounds checking
     if (actualIndex < 0 || actualIndex >= list.length) {
       return null; // or throw error based on config
     }
     
     return list[actualIndex];
   }
   ```

4. **Update TracingEvaluator:**
   - Add trace steps for list literal evaluation
   - Add trace steps for index access
   - Show list values in debug inspector

### Phase 3: Built-in Functions (Day 3-4)

**Files to modify:**
- `/services/evaluationEngine/runtime/FunctionRegistry.ts`

**Tasks:**

1. **Register aggregation functions:**
   ```typescript
   registerFunction('LENGTH', {
     minArgs: 1,
     maxArgs: 1,
     execute: (args: any[]) => {
       const list = args[0];
       if (!Array.isArray(list)) {
         throw new Error('LENGTH requires a list');
       }
       return list.length;
     }
   });
   
   registerFunction('SUM', {
     minArgs: 1,
     maxArgs: 1,
     execute: (args: any[]) => {
       const list = args[0];
       if (!Array.isArray(list)) {
         throw new Error('SUM requires a list');
       }
       return list.reduce((sum, val) => sum + val, 0);
     }
   });
   
   registerFunction('AVG', {
     minArgs: 1,
     maxArgs: 1,
     execute: (args: any[]) => {
       const list = args[0];
       if (!Array.isArray(list)) {
         throw new Error('AVG requires a list');
       }
       if (list.length === 0) return null;
       return list.reduce((sum, val) => sum + val, 0) / list.length;
     }
   });
   
   registerFunction('MIN', { /* ... */ });
   registerFunction('MAX', { /* ... */ });
   ```

2. **Register transformation functions:**
   ```typescript
   registerFunction('MAP', {
     minArgs: 2,
     maxArgs: 2,
     execute: (args: any[], context: Context) => {
       const list = args[0];
       const lambda = args[1]; // LambdaNode
       
       if (!Array.isArray(list)) {
         throw new Error('MAP first argument must be a list');
       }
       
       return list.map(item => {
         // Create new context with lambda parameter
         const lambdaContext = context.createChild();
         lambdaContext.set(lambda.parameter, item);
         
         // Evaluate lambda body
         return this.evaluate(lambda.body, lambdaContext);
       });
     }
   });
   
   registerFunction('FILTER', { /* similar to MAP */ });
   registerFunction('SORT', { /* ... */ });
   registerFunction('REVERSE', { /* ... */ });
   ```

3. **Register search/utility functions:**
   ```typescript
   registerFunction('CONTAINS', { /* ... */ });
   registerFunction('INDEX_OF', { /* ... */ });
   registerFunction('FIND', { /* ... */ });
   registerFunction('CONCAT', { /* ... */ });
   registerFunction('UNIQUE', { /* ... */ });
   registerFunction('RANGE', { /* ... */ });
   ```

### Phase 4: UI & Editor Support (Day 4)

**Files to modify:**
- `/components/editors/code/shared/components/VariableTable/VariableTable.tsx`
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`
- `/components/editors/code/FormulaEditor/hooks/useFormulaSyntax.ts`
- `/utils/formulaParser.ts`

**Tasks:**

1. **Update VariableTable to support list types:**
   ```typescript
   // In VariableTable.tsx
   function renderTypeSelector(variable: Variable) {
     return (
       <Select value={variable.type} onChange={...}>
         <option value="number">Number</option>
         <option value="string">String</option>
         <option value="boolean">Boolean</option>
         <option value="date">Date</option>
         <option value="list-number">List<number></option>
         <option value="list-string">List<string></option>
         <option value="list-boolean">List<boolean></option>
         <option value="list-date">List<date></option>
       </Select>
     );
   }
   
   function renderValueInput(variable: Variable) {
     if (variable.type.startsWith('list-')) {
       return (
         <Input
           placeholder='[1, 2, 3] or ["a", "b"]'
           value={JSON.stringify(variable.value)}
           onChange={handleListInput}
         />
       );
     }
     // ... existing logic for primitives
   }
   ```

2. **Update syntax highlighting:**
   ```typescript
   // In useFormulaSyntax.ts
   function highlightListLiterals(code: string): Highlight[] {
     const highlights: Highlight[] = [];
     
     // Match [...] with proper nesting
     const listRegex = /\[[^\[\]]*\]/g;
     let match;
     
     while ((match = listRegex.exec(code)) !== null) {
       highlights.push({
         start: match.index,
         end: match.index + match[0].length,
         className: 'list-literal'
       });
     }
     
     return highlights;
   }
   ```

3. **Add list-specific autocomplete:**
   ```typescript
   // In useInlineTypeahead.ts
   const LIST_FUNCTIONS = [
     { label: 'MAP', insertText: 'MAP($list, $x -> )', description: 'Transform list' },
     { label: 'FILTER', insertText: 'FILTER($list, $x -> )', description: 'Filter list' },
     { label: 'SUM', insertText: 'SUM($list)', description: 'Sum numbers' },
     { label: 'LENGTH', insertText: 'LENGTH($list)', description: 'List length' },
     // ... more functions
   ];
   ```

4. **Update test panel display:**
   ```typescript
   // In FormulaTestPanel.tsx
   function renderResultValue(value: any, type: FormulaType) {
     if (Array.isArray(value)) {
       return (
         <div className={styles.listResult}>
           <span className={styles.listBracket}>[</span>
           {value.map((item, i) => (
             <span key={i}>
               {renderPrimitiveValue(item)}
               {i < value.length - 1 && ', '}
             </span>
           ))}
           <span className={styles.listBracket}>]</span>
           <span className={styles.typeLabel}>
             List<{getElementType(type)}>
           </span>
         </div>
       );
     }
     // ... existing primitive rendering
   }
   ```

5. **Debug inspector support:**
   ```typescript
   // In DebugVariableInspector.tsx
   function renderListValue(value: any[], type: ListType) {
     return (
       <div className={styles.listInspector}>
         <div className={styles.listHeader}>
           List<{type.elementType}> ({value.length} items)
         </div>
         <div className={styles.listItems}>
           {value.map((item, index) => (
             <div key={index} className={styles.listItem}>
               <span className={styles.index}>[{index}]</span>
               <span className={styles.value}>{formatValue(item)}</span>
             </div>
           ))}
         </div>
       </div>
     );
   }
   ```

### Phase 5: Testing & Documentation (Day 5)

**Files to create/modify:**
- `/SampleData/formulaSamples.ts`
- `/change-log/25-10-28_vXX-ListArrayTypeImplementation.md`
- `/services/evaluationEngine/README.md`

**Tasks:**

1. **Add comprehensive test samples:**
   ```typescript
   // In formulaSamples.ts
   export const listSamples: FormulaSample[] = [
     {
       name: 'List Basics',
       code: `// List literals
   LET $numbers = [1, 2, 3, 4, 5]
   LET $names = ["Alice", "Bob", "Charlie"]
   
   // Index access
   LET $first = $numbers[0]
   LET $last = $numbers[-1]
   
   RETURN $first + $last`,
       description: 'Basic list creation and indexing'
     },
     {
       name: 'Aggregation',
       code: `LET $scores = [85, 92, 78, 95, 88]
   
   RETURN {
     "total": SUM($scores),
     "average": AVG($scores),
     "highest": MAX($scores),
     "lowest": MIN($scores),
     "count": LENGTH($scores)
   }`,
       description: 'Aggregation functions on lists'
     },
     {
       name: 'Transformation',
       code: `LET $prices = [10.00, 15.50, 20.00, 8.75]
   
   // Apply 10% discount
   LET $discounted = MAP($prices, $p -> $p * 0.9)
   
   // Filter expensive items
   LET $expensive = FILTER($discounted, $p -> $p > 15)
   
   RETURN {
     "original": $prices,
     "discounted": $discounted,
     "expensive": $expensive
   }`,
       description: 'MAP and FILTER transformations'
     },
     {
       name: 'Order Processing',
       code: `LET $orderTotals = [120, 450, 890, 1200, 350]
   
   // Count high-value orders
   LET $highValue = FILTER($orderTotals, $t -> $t >= 1000)
   LET $mediumValue = FILTER($orderTotals, $t -> $t >= 500 AND $t < 1000)
   
   RETURN {
     "totalOrders": LENGTH($orderTotals),
     "totalRevenue": SUM($orderTotals),
     "highValueCount": LENGTH($highValue),
     "mediumValueCount": LENGTH($mediumValue),
     "avgOrderValue": AVG($orderTotals)
   }`,
       description: 'Real-world order analysis'
     },
     {
       name: 'Loyalty Tiers',
       code: `LET $customerSpend = [150, 2500, 800, 5000, 400]
   LET $tiers = ["bronze", "gold", "silver", "platinum", "silver"]
   
   // Calculate tier-based discounts
   LET $discounts = MAP($tiers, $tier ->
     IF $tier = "platinum" THEN 0.20
     ELSIF $tier = "gold" THEN 0.15
     ELSIF $tier = "silver" THEN 0.10
     ELSE 0.05
     END
   )
   
   // Apply discounts to spend
   LET $discountedSpend = MAP(RANGE(0, LENGTH($customerSpend) - 1), $i ->
     $customerSpend[$i] * (1 - $discounts[$i])
   )
   
   RETURN SUM($discountedSpend)`,
       description: 'Complex list operations with parallel arrays'
     }
   ];
   ```

2. **Unit tests for type checking:**
   - Test homogeneous list validation
   - Test mixed-type rejection
   - Test empty list type inference errors
   - Test list element type inference
   - Test index access bounds checking

3. **Integration tests for functions:**
   - Test each built-in function with valid inputs
   - Test error handling for type mismatches
   - Test edge cases (empty lists, single elements, etc.)
   - Test lambda expressions in MAP/FILTER

4. **Update README documentation:**
   - Add List type to type system section
   - Document all list functions with examples
   - Add usage guidelines and best practices
   - Document limitations (no nesting, homogeneous only)

---

## Error Handling

### Parse-time Errors

1. **Mixed type list literal:**
   ```
   [1, 2, "3"]
   
   → TYPE ERROR at line 1, column 8:
     List elements must be homogeneous. 
     Expected: number (from first element)
     Found: string at index 2
   ```

2. **Empty list without type annotation:**
   ```
   LET $empty = []
   
   → TYPE ERROR at line 1, column 14:
     Cannot infer type of empty list.
     Please provide type annotation: LET $empty: List<T> = []
   ```

3. **Nested list:**
   ```
   [[1, 2], [3, 4]]
   
   → TYPE ERROR at line 1, column 2:
     Nested lists are not supported.
     List elements must be primitive types (number, string, boolean, date)
   ```

### Runtime Errors

1. **Index out of bounds:**
   ```
   LET $nums = [1, 2, 3]
   RETURN $nums[10]
   
   → RUNTIME ERROR at line 2:
     Index 10 out of bounds for list of length 3
   ```

2. **Type mismatch in function:**
   ```
   SUM(["a", "b", "c"])
   
   → RUNTIME ERROR at line 1:
     SUM requires List<number>, got List<string>
   ```

3. **Index with non-number:**
   ```
   LET $nums = [1, 2, 3]
   RETURN $nums["first"]
   
   → RUNTIME ERROR at line 2:
     List index must be a number, got string
   ```

---

## Edge Cases & Considerations

### Empty Lists

**Type annotations required:**
```
LET $empty: List<number> = []      // ✅ OK
LET $empty = []                    // ❌ Error
```

**Empty list operations:**
```
SUM([])           // → 0
AVG([])           // → null (or error?)
MAX([])           // → null
MIN([])           // → null
LENGTH([])        // → 0
```

### Single-element Lists

**Valid and treated as lists:**
```
[42]              // → List<number> with 1 element
["solo"]          // → List<string> with 1 element

LENGTH([42])      // → 1
SUM([42])         // → 42
```

### Large Lists

**Consider performance implications:**
- Memory usage for large lists
- O(n) operations like MAP, FILTER on large datasets
- Debugger display of very long lists (truncate?)

**Potential limits:**
- Max list size: 10,000 elements?
- Warning for lists > 1,000 elements?
- Truncate debug display after 100 elements?

### Type Coercion

**No automatic coercion:**
```
[1, 2, 3] + [4, 5]        // ❌ Error (no list concatenation operator)
                          // Use CONCAT([1, 2, 3], [4, 5])

"[1, 2, 3]"               // String, not a list
                          // No automatic parsing
```

---

## Future Enhancements (Not in Scope)

These features are **intentionally excluded** from this EPIC but could be added later:

1. **Nested lists** - `List<List<T>>`
2. **List comprehensions** - `[x * 2 FOR x IN $list IF x > 10]`
3. **Tuple types** - `(number, string, boolean)` for heterogeneous fixed-size collections
4. **Destructuring** - `LET [$first, $second, ...$rest] = $list`
5. **Spread operator** - `[1, 2, ...$moreNumbers, 5]`
6. **Object/dictionary type** - `{ "key": "value" }` maps
7. **Reduce function** - `REDUCE($list, $initial, ($acc, $val) -> ...)`
8. **Zip function** - `ZIP($list1, $list2)` to combine parallel lists
9. **FlatMap** - `FLATMAP($list, $x -> ...)` for flattening nested results
10. **GroupBy** - `GROUPBY($list, $keyFn)` for aggregation

---

## Success Criteria

### Functional Requirements

- ✅ Can define list literals with homogeneous elements
- ✅ Can access list elements by index (positive and negative)
- ✅ Can use aggregation functions (SUM, AVG, MIN, MAX, LENGTH)
- ✅ Can use transformation functions (MAP, FILTER, SORT, REVERSE)
- ✅ Can use search functions (CONTAINS, INDEX_OF, FIND)
- ✅ Can use utility functions (CONCAT, UNIQUE, RANGE, SLICE)
- ✅ Type checking prevents mixed-type lists
- ✅ Type checking validates function argument types

### UI Requirements

- ✅ Variable table supports list type selection
- ✅ Variable table shows list input UI with JSON array syntax
- ✅ Test panel displays list results clearly
- ✅ Debug inspector shows list contents with indices
- ✅ Syntax highlighting for list literals `[...]`
- ✅ Autocomplete suggests list functions
- ✅ Error messages are clear and actionable

### Quality Requirements

- ✅ Comprehensive test coverage (>90%)
- ✅ Performance acceptable for lists up to 1000 elements
- ✅ Clear documentation with examples
- ✅ No regression in existing formula features

---

## Migration & Compatibility

**No breaking changes:**
- Existing formulas without lists continue to work unchanged
- New list features are opt-in
- No changes to existing variable types or functions

**Backwards compatibility:**
- All existing samples continue to work
- No changes to parser for non-list expressions
- Existing functions work as before

---

## Open Questions

1. **Empty list behavior:**
   - Should `AVG([])` return `null` or throw error?
   - Should out-of-bounds access return `null` or throw error?

2. **Performance limits:**
   - What's the max list size we should support?
   - Should we warn for large lists?
   - How to handle very long lists in debugger?

3. **Lambda syntax:**
   - Current proposal: `$x -> expression`
   - Alternative: `($x) => expression` (arrow function style)?
   - Alternative: `LAMBDA($x, expression)` (function style)?

4. **Type annotation syntax:**
   - Current proposal: `LET $list: List<number> = []`
   - Alternative: `LET $list: number[] = []` (TypeScript style)?

5. **Future object type:**
   - Should we plan for `{ "key": value }` objects in the future?
   - How would that affect the type system design now?

---

## Resources & References

**Similar implementations:**
- JavaScript Array methods (map, filter, reduce)
- Python list comprehensions
- Excel dynamic arrays
- SQL aggregate functions
- Lodash utility functions

**Type system references:**
- TypeScript generic types
- Haskell list types
- ML type inference

**Documentation to update:**
- `/services/evaluationEngine/README.md`
- Function reference (create new doc?)
- Type system documentation
- User guide with examples

---

## Estimated Timeline

| Phase | Effort | Description |
|-------|--------|-------------|
| Phase 1: Type System & Parser | 1.5 days | Add List type, parse literals, type checking |
| Phase 2: Runtime Evaluation | 1 day | Evaluate lists, index access, runtime checks |
| Phase 3: Built-in Functions | 1 day | Implement 15+ list functions |
| Phase 4: UI & Editor Support | 1 day | Variable table, syntax highlighting, autocomplete |
| Phase 5: Testing & Documentation | 0.5 days | Tests, samples, documentation |
| **Total** | **5 days** | Full implementation |

---

## Acceptance Checklist

Before marking this EPIC complete:

- [ ] Type system supports `List<T>` for all primitive types
- [ ] Parser handles list literals `[...]`
- [ ] Parser handles index access `list[index]`
- [ ] Parser handles lambda expressions for MAP/FILTER
- [ ] Type inference works for non-empty lists
- [ ] Type checking rejects mixed-type lists
- [ ] All 15+ built-in functions implemented and tested
- [ ] Variable table UI supports list types
- [ ] Variable table validates list input
- [ ] Test panel displays list results properly
- [ ] Debug inspector shows list contents with indices
- [ ] Syntax highlighting for list literals
- [ ] Autocomplete suggests list functions
- [ ] Comprehensive test suite (unit + integration)
- [ ] Sample formulas demonstrate key features
- [ ] Documentation updated with examples
- [ ] Error messages are clear and helpful
- [ ] No performance degradation for existing formulas
- [ ] All edge cases handled gracefully

---

## Implementation Progress

### Increment 1: Foundation ✅ (October 27, 2025)

**Implemented:**
- ✅ `ListType` in TypeSystem with element type tracking
- ✅ `LBRACKET`, `RBRACKET` tokens in Tokenizer
- ✅ `ListLiteral` and `IndexAccess` AST nodes
- ✅ Parser support for `[1, 2, 3]` literals
- ✅ Parser support for `$list[0]` and `$list[-1]` index access
- ✅ Evaluator with homogeneous type checking
- ✅ Bounds checking with clear error messages
- ✅ Negative indexing support
- ✅ Full tracing/debugging support
- ✅ Syntax highlighting for brackets

**Reference:** `/change-log/25-10-27_v00-ListArrayTypeIncrement1.md`

### Increment 2: Core Functions ✅ (October 27, 2025)

**Implemented:**
- ✅ `LENGTH($list)` - Get list length
- ✅ `LIST_SUM($list)` - Sum numeric list
- ✅ `LIST_AVG($list)` - Average of numeric list
- ✅ `LIST_MIN($list)` - Minimum value
- ✅ `LIST_MAX($list)` - Maximum value
- ✅ `CONTAINS($list, value)` - Check if list contains value
- ✅ `FIRST($list)` - Get first element
- ✅ `LAST($list)` - Get last element
- ✅ `REVERSE($list)` - Reverse list order (non-mutating)
- ✅ Syntax highlighting for all list functions
- ✅ Sample formulas: Revenue Analysis, Student Grades, Inventory Levels

**Reference:** `/change-log/25-10-27_v01-ListArrayTypeIncrement2.md`

### Increment 3: Advanced Functions ✅ (October 27, 2025)

**Implemented:**
- ✅ `SLICE($list, start, end?)` - Extract sublist with negative index support
- ✅ `CONCAT($list1, $list2, ...)` - Concatenate multiple lists
- ✅ `UNIQUE($list)` - Remove duplicates (Set-based)
- ✅ `SORT($list)` - Sort ascending (type-aware: numbers, strings, dates)
- ✅ `SORT_DESC($list)` - Sort descending (type-aware)
- ✅ `JOIN($list, separator)` - Join list to string
- ✅ `SPLIT($string, separator)` - Split string to list
- ✅ `INDEX_OF($list, value)` - Find first index (-1 if not found)
- ✅ `RANGE(start, end, step?)` - Generate number sequences
- ✅ Sample formulas: Data Cleaning, Leaderboards, CSV Processing, Sequences
- ✅ Non-mutating "push/pop" patterns documented

**Reference:** `/change-log/25-10-27_v02-ListArrayTypeIncrement3.md`

### Increment 4: Lambda Support 📋 (Planned)

**To Implement:**
- Lambda expression parsing: `$x -> expression`
- `MAP($list, $x -> transform)` - Transform elements
- `FILTER($list, $x -> predicate)` - Filter elements
- Lambda variable scoping
- Nested lambda support

### Increment 5: UI Enhancements 📋 (Planned)

**To Implement:**
- Variable table list type selection
- Variable table list input UI
- Test panel list display formatting
- Debug inspector list visualization
- Autocomplete for list functions

---

**Created:** October 25, 2025  
**Last Updated:** October 27, 2025  
**Status:** In Progress (Increment 3 Complete - 20+ functions production-ready!)
