# Increment 3.1: Structured Data (Arrays of Objects) - Implementation Plan

**Status:** 📋 Planning Phase  
**Estimated Effort:** Large (2-3 days)  
**Dependencies:** Increment 3 Complete ✅  
**EPIC:** List/Array Type Support  

---

## Executive Summary

**Goal:** Enable arrays of objects (structured data) with property access, type checking, and specialized functions.

**Why This Matters:**
- Real-world data is often structured (sales records, user profiles, transactions)
- Enables more realistic sample formulas and use cases
- Natural stepping stone to Increment 4 (lambdas with MAP/FILTER)
- Unlocks powerful data manipulation patterns

**Example Use Case:**
```
// Sales leaderboard with names and divisions
$salesData = [
  {name: "Alice Chen", division: "West", amount: 45000, quota: 40000},
  {name: "Bob Smith", division: "East", amount: 78000, quota: 60000},
  {name: "Charlie Brown", division: "West", amount: 52000, quota: 50000},
  {name: "Diana Lopez", division: "North", amount: 91000, quota: 70000}
]

// Extract just amounts for calculations
$amounts = PLUCK($salesData, "amount")
$totalRevenue = LIST_SUM($amounts)

// Sort by performance
$ranked = SORT_BY_DESC($salesData, "amount")
$topPerformer = FIRST($ranked)
$topName = $topPerformer.name           // "Diana Lopez"

// Filter by division (requires Increment 4 lambdas, but we can prepare)
// $westSales = FILTER($salesData, $s -> $s.division = "West")

// Group by division
$byDivision = GROUP_BY($salesData, "division")
// Returns: {West: [...], East: [...], North: [...]}
```

---

## Core Features

### 1. Object Type System

**New Type: `ObjectType`**
```typescript
export class ObjectType extends Type {
  constructor(
    public properties: Map<string, Type>,
    public isOpen: boolean = false  // Open = can have additional properties
  ) {
    super('object');
  }
  
  getPropertyType(name: string): Type | undefined {
    return this.properties.get(name);
  }
  
  hasProperty(name: string): boolean {
    return this.properties.has(name);
  }
  
  // Two objects are compatible if they have the same properties with same types
  isCompatible(other: Type): boolean {
    if (!(other instanceof ObjectType)) return false;
    
    // Check all required properties match
    for (const [key, type] of this.properties) {
      const otherType = other.getPropertyType(key);
      if (!otherType || !type.isCompatible(otherType)) {
        return false;
      }
    }
    
    return true;
  }
}
```

**List of Objects:**
```typescript
// List<Object{name: string, amount: number}>
const objectType = new ObjectType(new Map([
  ['name', StringType],
  ['amount', NumberType]
]));
const listType = new ListType(objectType);
```

### 2. Syntax Extensions

#### Object Literal Syntax
```
// Basic object
{name: "Alice", amount: 45000}

// With various types
{
  name: "Bob",
  age: 30,
  active: true,
  hired: DATE("2020-01-15"),
  quota: 50000
}

// Nested objects (Phase 2)
{
  name: "Charlie",
  metrics: {
    current: 52000,
    quota: 50000,
    rate: 104.0
  }
}
```

#### Property Access Syntax
```
$person.name              // Access property
$person.age               // Access property

$salesRecord.amount       // From object
$salesRecord.quota        // From object

// Chained access (Phase 2 - nested objects)
$record.metrics.current
$record.metrics.quota
```

#### Arrays of Objects
```
$salesTeam = [
  {name: "Alice", amount: 45000},
  {name: "Bob", amount: 78000},
  {name: "Charlie", amount: 52000}
]

// All objects must have same shape (homogeneous)
// Type: List<Object{name: string, amount: number}>
```

### 3. New AST Nodes

```typescript
// Object literal
export interface ObjectLiteralNode extends ASTNode {
  type: 'ObjectLiteral';
  properties: Array<{
    key: string;
    value: ASTNode;
  }>;
}

// Property access
export interface PropertyAccessNode extends ASTNode {
  type: 'PropertyAccess';
  object: ASTNode;      // Variable or another property access
  property: string;      // Property name
}
```

### 4. Tokenizer Updates

**New Tokens:**
```typescript
export enum TokenType {
  // ... existing tokens
  
  // Object syntax
  LBRACE = 'LBRACE',           // {
  RBRACE = 'RBRACE',           // }
  COLON = 'COLON',             // :
  DOT = 'DOT',                 // . (for property access)
}
```

**Tokenization Rules:**
```
{        -> LBRACE
}        -> RBRACE
:        -> COLON
.        -> DOT (when not in a number)

// Examples
"{name: "Alice"}"  -> [LBRACE, IDENTIFIER, COLON, STRING, RBRACE]
"$person.name"     -> [VARIABLE, DOT, IDENTIFIER]
```

### 5. Parser Updates

**Parse Object Literal:**
```typescript
private parseObjectLiteral(): ObjectLiteralNode {
  this.expect(TokenType.LBRACE);
  
  const properties: Array<{key: string; value: ASTNode}> = [];
  
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

**Parse Property Access:**
```typescript
private parsePropertyAccess(object: ASTNode): PropertyAccessNode {
  this.expect(TokenType.DOT);
  const property = this.expect(TokenType.IDENTIFIER).value;
  
  return {
    type: 'PropertyAccess',
    object,
    property
  };
}

// Integrate into primary expression parsing
private parsePrimary(): ASTNode {
  // ... existing cases
  
  if (this.check(TokenType.LBRACE)) {
    return this.parseObjectLiteral();
  }
  
  // ... handle variables
  let node = /* variable node */;
  
  // Check for property access
  while (this.check(TokenType.DOT)) {
    node = this.parsePropertyAccess(node);
  }
  
  return node;
}
```

### 6. Evaluator Updates

**Evaluate Object Literal:**
```typescript
case 'ObjectLiteral': {
  const obj: Record<string, any> = {};
  
  for (const prop of node.properties) {
    obj[prop.key] = this.evaluate(prop.value, context);
  }
  
  return obj;
}
```

**Evaluate Property Access:**
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

### 7. Type Checking & Validation

**Object Shape Validation:**
```typescript
// When creating list of objects, validate all have same shape
function validateObjectList(objects: any[]): ObjectType {
  if (objects.length === 0) {
    throw new Error('Cannot infer type from empty object array');
  }
  
  const firstObj = objects[0];
  const properties = new Map<string, Type>();
  
  // Infer shape from first object
  for (const [key, value] of Object.entries(firstObj)) {
    properties.set(key, inferType(value));
  }
  
  // Validate all other objects have same shape
  for (let i = 1; i < objects.length; i++) {
    const obj = objects[i];
    
    // Check same keys
    const objKeys = Object.keys(obj).sort();
    const expectedKeys = Array.from(properties.keys()).sort();
    
    if (!arraysEqual(objKeys, expectedKeys)) {
      throw new Error(
        `Object at index ${i} has different properties than first object. ` +
        `Expected: [${expectedKeys.join(', ')}], ` +
        `Got: [${objKeys.join(', ')}]`
      );
    }
    
    // Check same types
    for (const [key, expectedType] of properties) {
      const actualType = inferType(obj[key]);
      if (!actualType.isCompatible(expectedType)) {
        throw new Error(
          `Property '${key}' has type ${actualType} in object ${i}, ` +
          `but expected type ${expectedType}`
        );
      }
    }
  }
  
  return new ObjectType(properties);
}
```

**Property Access Type Checking:**
```typescript
// During type checking phase
case 'PropertyAccess': {
  const objectType = this.inferType(node.object, context);
  
  if (!(objectType instanceof ObjectType)) {
    throw new TypeError(
      `Cannot access property on non-object type: ${objectType}`
    );
  }
  
  const propertyType = objectType.getPropertyType(node.property);
  
  if (!propertyType) {
    throw new TypeError(
      `Property '${node.property}' does not exist on object type`
    );
  }
  
  return propertyType;
}
```

---

## New Functions

### PLUCK - Extract Property from All Objects

**Signature:** `PLUCK($list, propertyName)`

**Purpose:** Extract a single property from all objects in a list

**Returns:** List of values for that property

```typescript
this.register({
  name: 'PLUCK',
  minArgs: 2,
  maxArgs: 2,
  execute: ([list, propertyName]) => {
    if (!Array.isArray(list)) {
      throw new Error('PLUCK requires a list as first argument');
    }
    
    const propName = String(propertyName);
    
    return list.map(item => {
      if (typeof item !== 'object' || item === null) {
        throw new Error('PLUCK requires a list of objects');
      }
      
      if (!(propName in item)) {
        throw new Error(`Property '${propName}' does not exist on object`);
      }
      
      return item[propName];
    });
  },
  description: 'Extract a property from all objects in a list'
});
```

**Example:**
```
$salesData = [
  {name: "Alice", amount: 45000},
  {name: "Bob", amount: 78000},
  {name: "Charlie", amount: 52000}
]

$amounts = PLUCK($salesData, "amount")     // [45000, 78000, 52000]
$names = PLUCK($salesData, "name")         // ["Alice", "Bob", "Charlie"]

// Can then use existing functions
$totalRevenue = LIST_SUM($amounts)
$avgRevenue = LIST_AVG($amounts)
$bestSales = LIST_MAX($amounts)
```

### SORT_BY - Sort Objects by Property

**Signature:** `SORT_BY($list, propertyName)`

**Purpose:** Sort a list of objects by a specific property (ascending)

```typescript
this.register({
  name: 'SORT_BY',
  minArgs: 2,
  maxArgs: 2,
  execute: ([list, propertyName]) => {
    if (!Array.isArray(list)) {
      throw new Error('SORT_BY requires a list as first argument');
    }
    
    const propName = String(propertyName);
    
    // Validate all items are objects with the property
    for (const item of list) {
      if (typeof item !== 'object' || item === null) {
        throw new Error('SORT_BY requires a list of objects');
      }
      if (!(propName in item)) {
        throw new Error(`Property '${propName}' does not exist on all objects`);
      }
    }
    
    // Create copy and sort
    const sorted = [...list];
    
    sorted.sort((a, b) => {
      const aVal = a[propName];
      const bVal = b[propName];
      
      // Type-aware comparison (same as SORT)
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return aVal - bVal;
      } else if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal);
      } else if (aVal instanceof Date && bVal instanceof Date) {
        return aVal.getTime() - bVal.getTime();
      } else {
        return String(aVal).localeCompare(String(bVal));
      }
    });
    
    return sorted;
  },
  description: 'Sort a list of objects by a property (ascending)'
});
```

**Example:**
```
$salesData = [
  {name: "Charlie", amount: 52000},
  {name: "Alice", amount: 45000},
  {name: "Bob", amount: 78000}
]

// Sort by name
$byName = SORT_BY($salesData, "name")
// [{name: "Alice", ...}, {name: "Bob", ...}, {name: "Charlie", ...}]

// Sort by amount
$byAmount = SORT_BY($salesData, "amount")
// [{name: "Alice", amount: 45000}, {name: "Charlie", amount: 52000}, {name: "Bob", amount: 78000}]
```

### SORT_BY_DESC - Sort Objects by Property (Descending)

**Signature:** `SORT_BY_DESC($list, propertyName)`

**Purpose:** Sort a list of objects by a specific property (descending)

```typescript
this.register({
  name: 'SORT_BY_DESC',
  minArgs: 2,
  maxArgs: 2,
  execute: ([list, propertyName]) => {
    // Similar to SORT_BY but with reversed comparison
    // ... (reverse the comparison in the sort function)
  },
  description: 'Sort a list of objects by a property (descending)'
});
```

**Example:**
```
$salesData = [
  {name: "Alice", amount: 45000},
  {name: "Bob", amount: 78000},
  {name: "Charlie", amount: 52000}
]

$ranked = SORT_BY_DESC($salesData, "amount")
// [{name: "Bob", amount: 78000}, {name: "Charlie", amount: 52000}, {name: "Alice", amount: 45000}]

$topSeller = FIRST($ranked)
$topName = $topSeller.name              // "Bob"
$topAmount = $topSeller.amount          // 78000
```

### GROUP_BY - Group Objects by Property Value

**Signature:** `GROUP_BY($list, propertyName)`

**Purpose:** Group objects by unique values of a property

**Returns:** Object where keys are unique property values, values are arrays of objects

```typescript
this.register({
  name: 'GROUP_BY',
  minArgs: 2,
  maxArgs: 2,
  execute: ([list, propertyName]) => {
    if (!Array.isArray(list)) {
      throw new Error('GROUP_BY requires a list as first argument');
    }
    
    const propName = String(propertyName);
    const groups: Record<string, any[]> = {};
    
    for (const item of list) {
      if (typeof item !== 'object' || item === null) {
        throw new Error('GROUP_BY requires a list of objects');
      }
      
      if (!(propName in item)) {
        throw new Error(`Property '${propName}' does not exist on all objects`);
      }
      
      const key = String(item[propName]);
      
      if (!groups[key]) {
        groups[key] = [];
      }
      
      groups[key].push(item);
    }
    
    return groups;
  },
  description: 'Group objects by unique values of a property'
});
```

**Example:**
```
$salesData = [
  {name: "Alice", division: "West", amount: 45000},
  {name: "Bob", division: "East", amount: 78000},
  {name: "Charlie", division: "West", amount: 52000},
  {name: "Diana", division: "North", amount: 91000}
]

$byDivision = GROUP_BY($salesData, "division")
// Returns:
// {
//   West: [{name: "Alice", ...}, {name: "Charlie", ...}],
//   East: [{name: "Bob", ...}],
//   North: [{name: "Diana", ...}]
// }

// Access groups (requires property access on result object)
$westTeam = $byDivision.West
$westTotal = LIST_SUM(PLUCK($westTeam, "amount"))
```

**Note:** GROUP_BY returns an object (not a list), so accessing groups requires property access.

### COUNT_BY - Count Objects by Property Value

**Signature:** `COUNT_BY($list, propertyName)`

**Purpose:** Count how many objects have each unique value for a property

**Returns:** Object where keys are unique property values, values are counts

```typescript
this.register({
  name: 'COUNT_BY',
  minArgs: 2,
  maxArgs: 2,
  execute: ([list, propertyName]) => {
    const groups = this.functions.get('GROUP_BY')!.execute([list, propertyName]);
    const counts: Record<string, number> = {};
    
    for (const [key, items] of Object.entries(groups)) {
      counts[key] = (items as any[]).length;
    }
    
    return counts;
  },
  description: 'Count objects by unique values of a property'
});
```

**Example:**
```
$salesData = [
  {name: "Alice", division: "West", amount: 45000},
  {name: "Bob", division: "East", amount: 78000},
  {name: "Charlie", division: "West", amount: 52000},
  {name: "Diana", division: "North", amount: 91000}
]

$divisionCounts = COUNT_BY($salesData, "division")
// Returns: {West: 2, East: 1, North: 1}

$westCount = $divisionCounts.West       // 2
```

---

## Implementation Phases

### Phase 1: Object Foundation (Day 1)
**Goal:** Basic object support

- [ ] Add ObjectType to type system
- [ ] Add LBRACE, RBRACE, COLON, DOT tokens to tokenizer
- [ ] Add ObjectLiteral and PropertyAccess AST nodes
- [ ] Implement object literal parsing
- [ ] Implement property access parsing
- [ ] Implement object literal evaluation
- [ ] Implement property access evaluation
- [ ] Basic type checking for objects
- [ ] Syntax highlighting for object syntax

**Test Cases:**
```
// Object literals
$person = {name: "Alice", age: 30}

// Property access
$name = $person.name
$age = $person.age

// Mixed types
$record = {
  name: "Bob",
  amount: 45000,
  active: true,
  date: DATE("2025-01-15")
}
```

### Phase 2: Arrays of Objects (Day 2 Morning)
**Goal:** Homogeneous arrays of objects

- [ ] Update ListType to support ObjectType elements
- [ ] Implement object shape validation for lists
- [ ] Type checking for list of objects
- [ ] Error messages for mismatched object shapes
- [ ] Syntax highlighting for arrays of objects

**Test Cases:**
```
// Homogeneous arrays
$team = [
  {name: "Alice", amount: 45000},
  {name: "Bob", amount: 78000},
  {name: "Charlie", amount: 52000}
]

// Access array element and property
$first = $team[0]
$firstName = $first.name

// Chained access
$firstAmount = $team[0].amount

// Error: mismatched shapes
$bad = [
  {name: "Alice", amount: 45000},
  {name: "Bob", quota: 60000}  // ERROR: different properties
]
```

### Phase 3: Object Functions (Day 2 Afternoon)
**Goal:** Functions for working with object arrays

- [ ] Implement PLUCK function
- [ ] Implement SORT_BY function
- [ ] Implement SORT_BY_DESC function
- [ ] Implement GROUP_BY function
- [ ] Implement COUNT_BY function
- [ ] Syntax highlighting for new functions
- [ ] Comprehensive test cases

**Test Cases:**
```
$salesData = [
  {name: "Alice", division: "West", amount: 45000},
  {name: "Bob", division: "East", amount: 78000},
  {name: "Charlie", division: "West", amount: 52000}
]

// PLUCK
$amounts = PLUCK($salesData, "amount")
$names = PLUCK($salesData, "name")

// SORT_BY
$byName = SORT_BY($salesData, "name")
$byAmount = SORT_BY_DESC($salesData, "amount")

// GROUP_BY
$byDivision = GROUP_BY($salesData, "division")

// COUNT_BY
$counts = COUNT_BY($salesData, "division")
```

### Phase 4: Sample Formulas & Documentation (Day 3)
**Goal:** Real-world examples and comprehensive docs

- [ ] Create sales leaderboard sample with names and divisions
- [ ] Create inventory tracking sample with objects
- [ ] Create team performance sample
- [ ] Update syntax highlighting documentation
- [ ] Create comprehensive README for object support
- [ ] Update EPIC documentation
- [ ] Create change log entry

---

## Sample Formula: Sales Leaderboard with Details

```
// Sales team data with names, divisions, and quotas
$salesData = [
  {name: "Alice Chen", division: "West", amount: 45000, quota: 40000},
  {name: "Bob Smith", division: "East", amount: 78000, quota: 60000},
  {name: "Charlie Brown", division: "West", amount: 52000, quota: 50000},
  {name: "Diana Lopez", division: "North", amount: 91000, quota: 70000},
  {name: "Eve Wilson", division: "East", amount: 63000, quota: 55000},
  {name: "Frank Miller", division: "West", amount: 48000, quota: 45000},
  {name: "Grace Lee", division: "North", amount: 85000, quota: 75000},
  {name: "Henry Davis", division: "East", amount: 72000, quota: 65000}
]

// Rank by sales amount
$ranked = SORT_BY_DESC($salesData, "amount")

// Get top performer
$topPerformer = FIRST($ranked)
$topName = $topPerformer.name                    // "Diana Lopez"
$topAmount = $topPerformer.amount                // 91000
$topDivision = $topPerformer.division            // "North"

// Get top 3
$topThree = SLICE($ranked, 0, 3)
$topThreeNames = PLUCK($topThree, "name")
// ["Diana Lopez", "Grace Lee", "Bob Smith"]

// Calculate metrics
$allAmounts = PLUCK($salesData, "amount")
$totalRevenue = LIST_SUM($allAmounts)            // 534000
$avgRevenue = LIST_AVG($allAmounts)              // 66750

// Performance vs quota
$allQuotas = PLUCK($salesData, "quota")
$totalQuota = LIST_SUM($allQuotas)               // 460000
$quotaAttainment = ($totalRevenue / $totalQuota) * 100  // 116.1%

// Division analysis
$byDivision = GROUP_BY($salesData, "division")
$westTeam = $byDivision.West
$westRevenue = LIST_SUM(PLUCK($westTeam, "amount"))     // 145000
$westQuota = LIST_SUM(PLUCK($westTeam, "quota"))        // 135000
$westAttainment = ($westRevenue / $westQuota) * 100     // 107.4%

// Top division by revenue
$divisions = ["West", "East", "North"]
$divisionRevenues = [
  LIST_SUM(PLUCK($byDivision.West, "amount")),
  LIST_SUM(PLUCK($byDivision.East, "amount")),
  LIST_SUM(PLUCK($byDivision.North, "amount"))
]
$topDivisionRevenue = LIST_MAX($divisionRevenues)       // 213000 (East)

// Return overall quota attainment
$quotaAttainment
```

---

## Syntax Highlighting Updates

**New patterns needed:**
```typescript
// Object literals
{
  name: 'objectBrace',
  pattern: /[{}]/g,
  className: 'formula-bracket',
  priority: 2,
},

// Property access (dot notation)
{
  name: 'propertyAccess',
  pattern: /\.([a-zA-Z_][a-zA-Z0-9_]*)/g,
  className: 'formula-property',
  priority: 4,
},

// Colon in object literals
{
  name: 'colon',
  pattern: /:/g,
  className: 'formula-operator',
  priority: 2,
},

// New functions
{
  name: 'function',
  pattern: /\b(... existing ... |PLUCK|SORT_BY|SORT_BY_DESC|GROUP_BY|COUNT_BY)\b/gi,
  className: 'formula-function',
  priority: 3,
},
```

---

## Type System Implications

### Object Type Representation

**Simple Object:**
```
Object{
  name: string,
  amount: number,
  active: boolean
}
```

**List of Objects:**
```
List<Object{name: string, amount: number}>
```

**Nested Object (Phase 2 - Future):**
```
Object{
  name: string,
  metrics: Object{
    current: number,
    quota: number
  }
}
```

### Type Inference Rules

1. **Object Literal:** Infer type from all properties
2. **Property Access:** Look up property type in object type
3. **PLUCK:** Returns List<T> where T is the property type
4. **SORT_BY:** Returns same type as input (List<Object>)
5. **GROUP_BY:** Returns Object where values are List<Object>

---

## Error Handling

### Common Errors

**Mismatched Object Shapes:**
```
$bad = [
  {name: "Alice", amount: 45000},
  {name: "Bob", quota: 60000}     // Different properties
]
// ERROR: Object at index 1 has different properties than first object
//        Expected: [name, amount], Got: [name, quota]
```

**Property Type Mismatch:**
```
$bad = [
  {name: "Alice", amount: 45000},
  {name: "Bob", amount: "high"}   // Wrong type
]
// ERROR: Property 'amount' has type string in object 1, but expected type number
```

**Missing Property Access:**
```
$person = {name: "Alice", age: 30}
$salary = $person.salary
// ERROR: Property 'salary' does not exist on object
```

**Property Access on Non-Object:**
```
$num = 42
$bad = $num.value
// ERROR: Cannot access property 'value' on non-object value
```

---

## Debugging Support

### Variable Inspector Display

**Object Values:**
```
$person = {name: "Alice", age: 30}

// Display in inspector:
$person: Object
  └─ {name: "Alice", age: 30}
     ├─ name: "Alice" (string)
     └─ age: 30 (number)
```

**Arrays of Objects:**
```
$team = [{name: "Alice"}, {name: "Bob"}]

// Display in inspector:
$team: List<Object> (2 items)
  ├─ [0]: {name: "Alice"}
  │   └─ name: "Alice" (string)
  └─ [1]: {name: "Bob"}
      └─ name: "Bob" (string)
```

### Execution Trace

**Property Access:**
```
$person = {name: "Alice", age: 30}
$name = $person.name

// Trace:
1: $person = {name: "Alice", age: 30}
   └─ Assigned: Object {name: "Alice", age: 30}
2: $name = $person.name
   ├─ $person → {name: "Alice", age: 30}
   ├─ Access property: "name"
   └─ Assigned: "Alice"
```

---

## Benefits

### For Formula Authors
✅ **Realistic data structures** - Model real-world entities  
✅ **Cleaner organization** - Related data stays together  
✅ **Type safety** - Guaranteed object shapes  
✅ **Powerful operations** - PLUCK, SORT_BY, GROUP_BY  
✅ **Better readability** - `$person.name` vs multiple variables  

### For the System
✅ **Stepping stone to lambdas** - Property access patterns established  
✅ **More expressive samples** - Realistic use cases  
✅ **Better type checking** - Object shape validation  
✅ **Foundation for queries** - GROUP_BY enables aggregation patterns  

---

## Future Enhancements (Post 3.1)

### Increment 4: Lambda Expressions
With objects in place, lambdas become more powerful:

```
// Filter by property
$westSales = FILTER($salesData, $s -> $s.division = "West")

// Map to calculated values
$attainment = MAP($salesData, $s -> ($s.amount / $s.quota) * 100)

// Complex transformations
$enriched = MAP($salesData, $s -> {
  name: $s.name,
  amount: $s.amount,
  quota: $s.quota,
  attainment: ($s.amount / $s.quota) * 100,
  status: IF $s.amount >= $s.quota THEN "Met" ELSE "Below"
})
```

### Nested Objects
Support for nested object structures:

```
$record = {
  customer: {
    name: "Alice",
    company: "ACME Corp"
  },
  order: {
    amount: 45000,
    date: DATE("2025-01-15")
  }
}

$customerName = $record.customer.name
$orderAmount = $record.order.amount
```

---

## Success Criteria

✅ Object literals parse and evaluate correctly  
✅ Property access works on object variables  
✅ Arrays of objects validate for shape consistency  
✅ PLUCK, SORT_BY, SORT_BY_DESC, GROUP_BY, COUNT_BY work correctly  
✅ Type checking prevents invalid property access  
✅ Error messages are clear and helpful  
✅ Syntax highlighting covers all object syntax  
✅ Debugging inspector displays objects clearly  
✅ Sample formulas demonstrate realistic use cases  
✅ Documentation is comprehensive  

---

## Open Questions

1. **Nested Objects:** Include in 3.1 or defer to later increment?
   - **Recommendation:** Defer to future increment. Focus on flat objects first.

2. **Object Mutation:** Allow property assignment (`$person.name = "Bob"`)?
   - **Recommendation:** No. Stay immutable. Use object spread in future increment.

3. **GROUP_BY Return Type:** Object or special Map type?
   - **Recommendation:** Object for now. Property access syntax works naturally.

4. **Optional Properties:** Should objects support optional properties?
   - **Recommendation:** Defer. All properties required for now.

5. **Object Equality:** How to compare objects?
   - **Recommendation:** Defer. Reference equality for now. Deep equality in future.

---

## Estimated Timeline

**Day 1: Foundation**
- Type system updates (ObjectType)
- Tokenizer updates (braces, colon, dot)
- AST nodes (ObjectLiteral, PropertyAccess)
- Parser implementation
- Evaluator implementation
- Basic testing

**Day 2: Arrays & Functions**
- Morning: Array of objects support, shape validation
- Afternoon: PLUCK, SORT_BY, SORT_BY_DESC, GROUP_BY, COUNT_BY
- Testing and refinement

**Day 3: Polish & Documentation**
- Sample formulas (leaderboard, inventory, team performance)
- Syntax highlighting
- Debugging support
- Comprehensive documentation
- Change log entry

---

## References

- **EPIC:** `/change-log/EPIC-ListArrayType.md`
- **Increment 3:** `/change-log/25-10-27_v02-ListArrayTypeIncrement3.md`
- **Type System:** `/services/evaluationEngine/types/TypeSystem.ts`
- **Parser:** `/services/evaluationEngine/parsers/FormulaParser.ts`
- **Evaluator:** `/services/evaluationEngine/runtime/Evaluator.ts`
- **Functions:** `/services/evaluationEngine/runtime/FunctionRegistry.ts`

---

**Status:** 📋 Planning Complete - Ready for Implementation  
**Next Step:** Begin Phase 1 - Object Foundation
