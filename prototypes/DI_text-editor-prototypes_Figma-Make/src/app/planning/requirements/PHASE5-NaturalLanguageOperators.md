# Phase 5: Natural Language Operators

**Epic:** Variable Verbalization
**Status:** Planning
**Complexity:** High
**Created:** 2025-11-07

---

## Overview

Extend the natural language system beyond variable names and comparison operators to include arithmetic operators, property accessors, and other language constructs. Enable users to write formulas that read like natural English sentences.

**Current State:**
- ✅ Natural language variable names: `'customer name'` instead of `$customerName`
- ✅ Natural language comparison operators: `'is greater than'`, `'is less than or equal to'`, etc.

**Goal:**
Add natural language alternatives for:
- Arithmetic operators (`*`, `/`, `+`, `-`, `^`)
- Property access (`.key`)
- Assignment vs equality (context-aware `=` handling)
- Potentially other constructs (function calls, etc.)

---

## Natural Language Operator Mappings

### 1. Arithmetic Operators

#### Multiplication (`*`)
**Natural Language Alternatives:**
- `multiplied by`
- `times`
- `multiply by`

**Examples:**
```
'total price' = 'unit price' multiplied by 'quantity'
'area' = 'width' times 'height'
'result' = 5 multiply by 3
```

**Symbolic Equivalent:**
```
$totalPrice = $unitPrice * $quantity
$area = $width * $height
$result = 5 * 3
```

---

#### Division (`/`)
**Natural Language Alternatives:**
- `divided by`
- `divide by`
- `over` (potentially ambiguous?)

**Examples:**
```
'average' = 'total' divided by 'count'
'rate' = 'distance' divide by 'time'
```

**Symbolic Equivalent:**
```
$average = $total / $count
$rate = $distance / $time
```

---

#### Addition (`+`)
**Natural Language Alternatives:**
- `plus`
- `add` / `added to`
- Contextual: `if __ then add __ to __` (more complex)

**Examples:**
```
'total' = 'subtotal' plus 'tax'
'sum' = 'value1' add 'value2'
'new balance' = 'old balance' added to 'deposit'
```

**Symbolic Equivalent:**
```
$total = $subtotal + $tax
$sum = $value1 + $value2
$newBalance = $oldBalance + $deposit
```

**Complex Example (Conditional Add):**
```
IF 'is premium' THEN
  'final price' = 'base price' // add discount
ELSE
  'final price' = 'base price' add 'surcharge'
END
```

---

#### Subtraction (`-`)
**Natural Language Alternatives:**
- `minus`
- `subtract` / `subtract from`
- `less` / `less than` (ambiguous with comparison!)

**Examples:**
```
'net' = 'gross' minus 'deductions'
'difference' = 'price1' subtract 'price2'
```

**Symbolic Equivalent:**
```
$net = $gross - $deductions
$difference = $price1 - $price2
```

**⚠️ Ambiguity Warning:**
- `'a' less 'b'` → subtraction
- `'a' 'is less than' 'b'` → comparison
- Context and exact phrasing matter!

---

#### Exponentiation (`^`)
**Natural Language Alternatives:**
- `to the power of`
- `to the __ power`
- `raised to`
- `squared` (shorthand for `^2`)
- `cubed` (shorthand for `^3`)

**Examples:**
```
'result' = 'base' to the power of 'exponent'
'area' = 'radius' to the 2 power
'volume' = 'side' cubed
'square' = 'number' squared
```

**Symbolic Equivalent:**
```
$result = $base ^ $exponent
$area = $radius ^ 2
$volume = $side ^ 3
$square = $number ^ 2
```

---

### 2. Property Access (`.key`)

**Natural Language Alternatives:**
- `__ of __`
- `__ in __`
- `__ from __`

**Examples:**
```
'customer name' = name of 'customer info'
'order total' = total in 'current order'
'email address' = email from 'user profile'
```

**Symbolic Equivalent:**
```
$customerName = $customerInfo.name
$orderTotal = $currentOrder.total
$emailAddress = $userProfile.email
```

**Chained Property Access:**
```
'city name' = city of address of 'customer info'
```

**Symbolic Equivalent:**
```
$cityName = $customerInfo.address.city
```

**⚠️ Key Consideration:**
The property name (`name`, `total`, `email`, `city`) appears BEFORE the object reference in natural language, which is opposite of symbolic syntax.

---

### 3. Assignment vs Equality (`=`)

**Challenge:** The equals sign has two meanings:
1. **Assignment:** `'x' = 5` (set x to 5)
2. **Comparison:** `'x' = 5` (is x equal to 5?)

**Current Behavior:**
- In assignment contexts (LHS = RHS at statement level), `=` is assignment
- In boolean/conditional contexts, `=` is equality check
- This is already handled by parser context

**Natural Language Options:**

#### Assignment
**Alternatives:**
- `set __ to __`
- `is set to`
- `equals` (context-dependent)

**Examples:**
```
set 'count' to 10
'total' is set to 'subtotal' plus 'tax'
'result' equals 'value1' times 'value2'
```

#### Equality Check
**Alternatives:**
- `is equal to`
- `equals` (context-dependent)
- `is the same as`

**Examples:**
```
IF 'status' is equal to "active" THEN
  ...
END

IF 'count' equals 5 THEN
  ...
END
```

**⚠️ Complexity:**
The challenge is that `equals` could mean either depending on context:
- `'x' equals 5` at statement level → assignment
- `'x' equals 5` in IF condition → comparison

**Proposed Solution:**
Let context determine meaning (like current `=` handling), but:
- Prefer `set __ to __` for explicit assignment
- Prefer `is equal to` for explicit comparison
- Allow `equals` for both (context-dependent)

---

### 4. Modulo (`%`)

**Natural Language Alternatives:**
- `mod`
- `modulo`
- `remainder of __ divided by __`

**Examples:**
```
'is even' = 'number' mod 2 = 0
'remainder' = 'dividend' modulo 'divisor'
```

**Symbolic Equivalent:**
```
$isEven = $number % 2 = 0
$remainder = $dividend % $divisor
```

---

### 5. String Concatenation (`+` for strings)

**Natural Language Alternatives:**
- `plus` (same as addition)
- `concatenated with`
- `concat`
- `combined with`

**Examples:**
```
'full name' = 'first name' concatenated with " " concatenated with 'last name'
'message' = "Hello, " combined with 'customer name'
```

**Symbolic Equivalent:**
```
$fullName = $firstName + " " + $lastName
$message = "Hello, " + $customerName
```

---

## Operator Precedence with Natural Language

Natural language operators must follow the same precedence rules as symbolic operators:

**Precedence (Highest to Lowest):**
1. `^` / `to the power of` / `squared` / `cubed`
2. `*` / `multiplied by` / `times` / `/` / `divided by` / `%` / `mod`
3. `+` / `plus` / `-` / `minus`
4. Comparison operators (`>`, `<`, `>=`, `<=`, `=`, `!=`)
5. Logical operators (`AND`, `OR`, `NOT`)

**Example:**
```
'result' = 'a' plus 'b' times 'c'
// Evaluates as: a + (b * c)

'result' = 'base' to the 2 power times 'pi'
// Evaluates as: (base ^ 2) * pi
```

---

## Context-Aware Parsing

### Statement Context (Assignment)
```
'x' = 5
'x' equals 5
set 'x' to 5
```
All three are assignments.

### Boolean/Conditional Context (Comparison)
```
IF 'x' = 5 THEN ...
IF 'x' equals 5 THEN ...
IF 'x' is equal to 5 THEN ...
```
All three are equality checks.

### Expression Context
```
'result' = 'a' plus 'b' times 'c'
```
- `plus` and `times` are arithmetic operators
- The statement-level `=` is assignment

---

## Autocomplete Integration

### Trigger Contexts

**After Variable Reference:**
When user types a verbalized variable followed by space:
```
'order total' _
```

**Autocomplete Suggestions:**
- `plus`
- `minus`
- `times` / `multiplied by`
- `divided by`
- `to the power of`
- `mod`
- `is equal to`
- `is greater than`
- `is less than`
- ... (all comparison operators)

**After Property-like Word:**
When user types a potential property name:
```
name _
```

**Autocomplete Suggestions:**
- `of` (for property access)
- `in`
- `from`

**In Assignment Context:**
When user types variable name at start of line:
```
'total' _
```

**Autocomplete Suggestions:**
- `=` (symbolic)
- `equals`
- `is set to`
- `set to` (if we support dropping the leading "set")

---

## Syntax Highlighting

**Style:** Bold + Red (same as current operators)

**Tokens to Highlight:**
- `multiplied by`, `times`, `multiply by`
- `divided by`, `divide by`
- `plus`, `add`, `added to`
- `minus`, `subtract`, `subtract from`
- `to the power of`, `to the __ power`, `raised to`, `squared`, `cubed`
- `mod`, `modulo`
- `of`, `in`, `from` (when used for property access)
- `is equal to`, `equals`, `is the same as`
- `set to`, `is set to` (assignment keywords)
- All existing comparison operators: `is greater than`, `is less than`, etc.

**Implementation:**
Update syntax highlighting tokenizer to recognize these multi-word patterns and apply the operator style (bold + red).

---

## Parser/Lexer Changes

### Lexer (Tokenization)

**Multi-Word Operator Detection:**
The lexer needs to look ahead to identify multi-word operators:

**Example:**
```
'result' = 'a' multiplied by 'b'
```

**Tokenization:**
1. `'result'` → VERBALIZED_VAR
2. `=` → ASSIGN
3. `'a'` → VERBALIZED_VAR
4. `multiplied by` → MULTIPLY_OP (multi-word token!)
5. `'b'` → VERBALIZED_VAR

**Challenge:**
How to distinguish:
- `multiplied by` (operator)
- `multiplied` followed by variable named `'by'`

**Solution:**
1. Greedy matching: If current word is `multiplied` and next word is `by`, check if `multiplied by` is a known operator
2. If yes, consume both words as single token
3. If no, treat `multiplied` as identifier

**Operator Lookup Table:**
```typescript
const MULTI_WORD_OPERATORS = {
  'multiplied by': TokenType.MULTIPLY,
  'divided by': TokenType.DIVIDE,
  'to the power of': TokenType.POWER,
  'is equal to': TokenType.EQUAL,
  'is greater than': TokenType.GREATER,
  // ... etc
};
```

**Special Case: `to the __ power`**
```
'x' to the 2 power
```
This is variable: `2` should be recognized as a number, not part of the operator phrase.

**Tokenization:**
1. `to the` → Look ahead
2. Next token is a number → This is `to the __ power` pattern
3. Consume `to the`, return POWER_PREFIX token
4. Let parser handle the number
5. Consume `power` as POWER_SUFFIX

Or simpler: Recognize `to the ... power` pattern where `...` is the exponent.

---

### Parser (Grammar)

**Property Access with Natural Language:**

**Current Grammar:**
```
PropertyAccess := Expression '.' IDENTIFIER
```

**New Grammar:**
```
PropertyAccess := Expression '.' IDENTIFIER
                | IDENTIFIER 'of' Expression
                | IDENTIFIER 'in' Expression  
                | IDENTIFIER 'from' Expression
```

**Example:**
```
name of 'customer info'
```

**Parse Tree:**
```
PropertyAccess
  ├─ property: "name"
  └─ object: VerbalizedVar("customer info")
```

**AST Node (same as current):**
```typescript
{
  type: 'PropertyAccess',
  object: { type: 'VerbalizedVar', name: 'customer info' },
  property: 'name'
}
```

---

**Arithmetic Operators:**

**Current Grammar:**
```
MultiplicativeExpr := ExponentiationExpr (('*' | '/' | '%') ExponentiationExpr)*
```

**New Grammar:**
```
MultiplicativeExpr := ExponentiationExpr (
  ('*' | 'times' | 'multiplied by' | 'multiply by') ExponentiationExpr |
  ('/' | 'divided by' | 'divide by') ExponentiationExpr |
  ('%' | 'mod' | 'modulo') ExponentiationExpr
)*
```

Similar updates for:
- Additive expressions (`+`, `-`, `plus`, `minus`)
- Exponentiation (`^`, `to the power of`, `squared`, `cubed`)
- Comparisons (already done in Phase 4)

---

**Assignment Keywords:**

**Optional Enhancement:**
```
set 'x' to 5
```

**Grammar:**
```
AssignmentStmt := VERBALIZED_VAR '=' Expression
                | VERBALIZED_VAR 'equals' Expression
                | VERBALIZED_VAR 'is set to' Expression
                | 'set' VERBALIZED_VAR 'to' Expression
```

**Note:** This adds `set ... to` syntax for explicit assignment.

---

## Edge Cases & Ambiguities

### 1. `less` vs `is less than`

**Ambiguous:**
```
'result' = 'a' less 'b'
```
Is this subtraction (`a - b`) or comparison (`a < b`)?

**Resolution:**
- `less` alone → subtraction
- `is less than` → comparison
- Require explicit `minus` or `is less than` to avoid ambiguity

**Better:**
```
'result' = 'a' minus 'b'  // Subtraction
'check' = 'a' 'is less than' 'b'  // Comparison
```

---

### 2. Property Name Collisions

**Example:**
```
name of 'customer info'
```
What if there's a variable called `'name'`?

**Tokenization:**
```
name of 'customer info'
```

**Interpretation:**
1. `name` → Could be variable or property name
2. `of` → Property access keyword
3. Since `of` follows, treat `name` as property name
4. Result: Access `customerInfo.name`

**Alternative (if `name` is a variable):**
```
'name' of 'customer info'  // Error: can't access property of string
```

**Resolution:**
- Un-quoted identifier before `of`/`in`/`from` → property name
- Quoted identifier before `of`/`in`/`from` → variable, then error or different interpretation

**Clearest Approach:**
Property names in natural language syntax should be un-quoted:
```
name of 'customer info'    // ✅ Property access
'name' of 'customer info'  // ❌ Error or different meaning
```

---

### 3. Chained Property Access

**Natural Language:**
```
city of address of 'customer info'
```

**Parsing:**
Right-to-left or left-to-right?

**English Reading (Left-to-Right):**
"Get city... of address... of customer info"

**Interpretation (Right-to-Left Evaluation):**
1. Start with `'customer info'`
2. Get `address` property
3. Get `city` property

**Result:** `customerInfo.address.city`

**Grammar:**
```
PropertyAccess := IDENTIFIER 'of' PropertyAccess
                | IDENTIFIER 'of' Expression
```

Allows recursion for chaining.

**Example Parse:**
```
city of address of 'customer info'
```

**Parse Tree:**
```
PropertyAccess
  ├─ property: "city"
  └─ object: PropertyAccess
       ├─ property: "address"
       └─ object: VerbalizedVar("customer info")
```

---

### 4. `equals` in Assignment vs Comparison

**Context-Dependent:**

**Assignment (statement level):**
```
'x' equals 5
```
Parser sees: Statement context → Assignment

**Comparison (in condition):**
```
IF 'x' equals 5 THEN
```
Parser sees: Boolean expression context → Comparison

**Implementation:**
Parser tracks context and interprets `equals` accordingly (same as current `=` handling).

---

### 5. `to` Keyword Conflicts

**Power:**
```
'x' to the 2 power
```

**Potential Range Function:**
```
RANGE(1 to 10)  // Generate [1, 2, 3, ..., 10]
```

**Ambiguity:**
Is `to` part of power operator or range syntax?

**Resolution:**
- `to the __ power` is a complete phrase
- `to` alone (in function call) could be range operator
- Parser context determines meaning

**Better: Use different syntax for range:**
```
RANGE(1, 10)  // Function call with two args
```

Avoid keyword collision.

---

## Implementation Phases

### Phase 5.1: Arithmetic Operators
**Scope:**
- Add natural language for: `*`, `/`, `+`, `-`, `^`, `%`
- Lexer updates for multi-word tokens
- Parser grammar updates
- Syntax highlighting
- Autocomplete

**Deliverables:**
- Users can write: `'total' = 'price' times 'quantity'`
- Syntax highlighting shows operators in bold/red
- Autocomplete suggests natural language operators

---

### Phase 5.2: Property Access
**Scope:**
- Add `of`, `in`, `from` for property access
- Handle chained property access
- Update parser grammar
- Syntax highlighting for property keywords
- Autocomplete

**Deliverables:**
- Users can write: `'email' = email of 'customer info'`
- Chained access: `city of address of 'customer info'`
- Autocomplete suggests property names after `of`

---

### Phase 5.3: Assignment Keywords (Optional)
**Scope:**
- Add `set __ to __` syntax
- Add `is set to` syntax
- Handle `equals` in both assignment and comparison contexts

**Deliverables:**
- Users can write: `set 'total' to 100`
- Context-aware `equals` handling

---

### Phase 5.4: Advanced Operators (Optional)
**Scope:**
- `squared`, `cubed` shorthands
- `remainder of __ divided by __` for modulo
- Additional string operators: `concatenated with`, `combined with`

**Deliverables:**
- Users can write: `'area' = 'radius' squared`
- More expressive formula writing

---

## Testing Strategy

### Unit Tests: Lexer

**Multi-Word Operator Tokenization:**
```typescript
describe('Natural Language Operator Lexer', () => {
  it('should tokenize "multiplied by" as single operator', () => {
    const tokens = tokenize("'a' multiplied by 'b'");
    expect(tokens).toContainEqual({ type: TokenType.MULTIPLY, value: 'multiplied by' });
  });

  it('should tokenize "to the power of" as power operator', () => {
    const tokens = tokenize("'x' to the power of 3");
    // Should have POWER operator token
  });

  it('should distinguish "multiplied by" from "multiplied" + variable "by"', () => {
    // Edge case: Is there a variable called 'by'?
    // Should prefer operator interpretation
  });
});
```

---

### Unit Tests: Parser

**Arithmetic with Natural Language:**
```typescript
describe('Natural Language Arithmetic Parser', () => {
  it('should parse "a times b"', () => {
    const ast = parse("'result' = 'a' times 'b'");
    expect(ast.body[0].type).toBe('AssignmentStmt');
    expect(ast.body[0].value.type).toBe('BinaryOp');
    expect(ast.body[0].value.operator).toBe('*');
  });

  it('should handle precedence with natural language operators', () => {
    const ast = parse("'result' = 'a' plus 'b' times 'c'");
    // Should parse as: a + (b * c)
    expect(ast.body[0].value.operator).toBe('+');
    expect(ast.body[0].value.right.operator).toBe('*');
  });
});
```

**Property Access:**
```typescript
describe('Natural Language Property Access Parser', () => {
  it('should parse "name of customer"', () => {
    const ast = parse("'x' = name of 'customer'");
    expect(ast.body[0].value.type).toBe('PropertyAccess');
    expect(ast.body[0].value.property).toBe('name');
  });

  it('should parse chained "city of address of customer"', () => {
    const ast = parse("'x' = city of address of 'customer'");
    expect(ast.body[0].value.type).toBe('PropertyAccess');
    expect(ast.body[0].value.property).toBe('city');
    expect(ast.body[0].value.object.type).toBe('PropertyAccess');
    expect(ast.body[0].value.object.property).toBe('address');
  });
});
```

---

### Integration Tests: Evaluation

**End-to-End Formula Execution:**
```typescript
describe('Natural Language Operator Evaluation', () => {
  it('should evaluate arithmetic with natural language', () => {
    const result = evaluate("'result' = 5 times 3", {});
    expect(result.variables.result).toBe(15);
  });

  it('should evaluate property access with natural language', () => {
    const result = evaluate(
      "'name' = name of 'customer'",
      { customer: { name: 'Alice' } }
    );
    expect(result.variables.name).toBe('Alice');
  });

  it('should handle complex expressions', () => {
    const result = evaluate(
      "'total' = 'price' times 'qty' plus 'tax'",
      { price: 10, qty: 5, tax: 5 }
    );
    expect(result.variables.total).toBe(55); // (10 * 5) + 5
  });
});
```

---

## Example Formulas

### Before (Symbolic):
```
$totalPrice = $unitPrice * $quantity
$discount = $totalPrice * 0.1
$finalPrice = $totalPrice - $discount
$customerEmail = $customer.email
$city = $customer.address.city

IF $finalPrice > 100 THEN
  $shippingCost = 0
ELSE
  $shippingCost = 9.99
END

$grandTotal = $finalPrice + $shippingCost
```

### After (Natural Language):
```
'total price' = 'unit price' times 'quantity'
'discount' = 'total price' times 0.1
'final price' = 'total price' minus 'discount'
'customer email' = email of 'customer'
'city' = city of address of 'customer'

IF 'final price' 'is greater than' 100 THEN
  'shipping cost' = 0
ELSE
  'shipping cost' = 9.99
END

'grand total' = 'final price' plus 'shipping cost'
```

### Mixed (Symbolic + Natural Language):
Users can mix both styles:
```
'total price' = 'unit price' * 'quantity'  // Symbolic operator
'discount' = 'total price' times 0.1       // Natural language operator
'final price' = 'total price' - 'discount' // Symbolic operator
```

This flexibility allows users to choose their preferred style!

---

## Success Criteria

**Phase 5 is complete when:**

✅ Users can write arithmetic operations using natural language:
   - `'result' = 'a' plus 'b'`
   - `'result' = 'a' times 'b'`
   - `'result' = 'a' divided by 'b'`
   - `'result' = 'a' to the power of 'b'`

✅ Users can access properties using natural language:
   - `'name' = name of 'customer'`
   - `'city' = city of address of 'customer'`

✅ Natural language operators are syntax highlighted (bold/red)

✅ Autocomplete suggests natural language operators in appropriate contexts

✅ Operator precedence works correctly with natural language operators

✅ All existing formulas continue to work (backward compatibility)

✅ Users can mix symbolic and natural language operators in the same formula

✅ Comprehensive test coverage for all new operator types

---

## Open Questions

1. **Assignment Keywords:**
   - Should we support `set 'x' to 5` syntax?
   - Or keep assignment as `'x' = 5` and `'x' equals 5`?

2. **Property Access Ambiguity:**
   - Should `name of 'customer'` require un-quoted property names?
   - Or allow `'name' of 'customer'` with different semantics?

3. **Operator Aliases Priority:**
   - When multiple aliases exist (`times` vs `multiplied by`), which does autocomplete suggest first?
   - Should we rank by brevity, commonality, or alphabetically?

4. **String Concatenation:**
   - Should `plus` work for both numbers and strings?
   - Or require `concatenated with` for strings?

5. **Localization:**
   - Future consideration: Support for non-English natural language operators?
   - `multiplicado por` (Spanish), `multiplié par` (French), etc.?

---

## Dependencies

**Required Before Phase 5:**
- ✅ Phase 1: Formula Verbalization Awareness (variables table)
- ✅ Phase 2: Verbalization Input Support (single quotes)
- ✅ Phase 3: Autocomplete with Verbalizations
- ✅ Phase 4: Natural Language Comparison Operators

**Blocking Issues:**
- None currently

**Related Systems:**
- Lexer/Tokenizer
- Parser/Grammar
- Syntax Highlighter
- Autocomplete System
- Evaluation Engine (minor updates for property access reversal)

---

## Notes

- This is a significant parser enhancement
- Backward compatibility is critical
- Natural language operators should feel optional, not mandatory
- Users should be able to mix symbolic and natural language freely
- The goal is enhanced readability, not forced verbosity

---

## Next Steps

1. Review this requirements document
2. Decide on scope for Phase 5.1 (start with arithmetic operators)
3. Design lexer multi-word token matching algorithm
4. Update parser grammar for arithmetic operators
5. Implement syntax highlighting for new operators
6. Update autocomplete to suggest natural language operators
7. Write comprehensive tests
8. Iterate based on usability feedback

---

**Document Version:** 1.0
**Last Updated:** 2025-11-07
**Author:** Development Team
