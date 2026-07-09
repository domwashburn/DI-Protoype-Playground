# Phase 5: Parser Disambiguation Strategies

**Related:** `/planning/requirements/PHASE5-NaturalLanguageOperators.md`
**Status:** Technical Design
**Created:** 2025-11-07

---

## Overview

Natural language operators introduce ambiguity that symbolic operators don't have. For example:

- `a less b` - Subtraction? Or incomplete comparison?
- `a is less than b` - Comparison
- `IF a is less than b` - Comparison in boolean context

This document outlines strategies for disambiguating natural language constructs using **contextual clues** during parsing.

---

## Disambiguation Strategies

### 1. **Greedy Multi-Word Token Matching**

**Principle:** Always try to match the longest possible operator sequence first.

**Example:**
```
'a' is less than 'b'
```

**Tokenization Process:**
1. See `is` → Could be standalone operator
2. Look ahead: `less` → Could be `is less`
3. Look ahead: `than` → Could be `is less than`
4. ✅ Match found: `is less than` (complete operator)
5. Return single token: `LESS_THAN_OP`

**vs.**
```
'a' less 'b'
```

**Tokenization Process:**
1. See `less` → Could be standalone operator (subtraction)
2. Look ahead: `'b'` → Not part of operator phrase
3. ✅ Match found: `less` (standalone, means subtraction)
4. Return single token: `MINUS_OP`

---

**Implementation:**

```typescript
// Operator lookup table (sorted by length, longest first!)
const OPERATORS = [
  // Multi-word operators (longest first)
  { pattern: 'is less than or equal to', token: TokenType.LESS_THAN_EQUAL },
  { pattern: 'is greater than or equal to', token: TokenType.GREATER_THAN_EQUAL },
  { pattern: 'is not equal to', token: TokenType.NOT_EQUAL },
  { pattern: 'is less than', token: TokenType.LESS_THAN },
  { pattern: 'is greater than', token: TokenType.GREATER_THAN },
  { pattern: 'is equal to', token: TokenType.EQUAL },
  { pattern: 'multiplied by', token: TokenType.MULTIPLY },
  { pattern: 'divided by', token: TokenType.DIVIDE },
  { pattern: 'to the power of', token: TokenType.POWER },
  { pattern: 'starts with', token: TokenType.STARTS_WITH },
  { pattern: 'ends with', token: TokenType.ENDS_WITH },
  { pattern: 'is not empty', token: TokenType.IS_NOT_EMPTY },
  { pattern: 'is not null', token: TokenType.IS_NOT_NULL },
  { pattern: 'is empty', token: TokenType.IS_EMPTY },
  { pattern: 'is null', token: TokenType.IS_NULL },
  
  // Single-word operators (after multi-word)
  { pattern: 'times', token: TokenType.MULTIPLY },
  { pattern: 'plus', token: TokenType.PLUS },
  { pattern: 'minus', token: TokenType.MINUS },
  { pattern: 'less', token: TokenType.MINUS },  // ⚠️ Standalone = subtraction
  { pattern: 'mod', token: TokenType.MODULO },
  { pattern: 'is', token: TokenType.EQUAL },     // ⚠️ Standalone = equality
  // ... etc
];

function tryMatchOperator(tokens: string[], position: number): OperatorMatch | null {
  // Try matching operators from longest to shortest
  for (const op of OPERATORS) {
    const words = op.pattern.split(' ');
    const slice = tokens.slice(position, position + words.length);
    
    if (slice.join(' ').toLowerCase() === op.pattern) {
      return {
        token: op.token,
        consumedTokens: words.length,
        text: op.pattern
      };
    }
  }
  
  return null;
}
```

**Key Insight:** By checking longer patterns first, we ensure:
- `is less than` matches as one operator (not `is` + `less` + `than`)
- `is not empty` matches as one operator (not `is` + `not` + `empty`)
- `less` alone only matches if NOT followed by `than`

---

### 2. **Contextual Parsing**

**Principle:** Parser knows what type of expression it's currently parsing and adjusts interpretation accordingly.

**Parse Contexts:**
1. **Statement Context** - Top-level statements (assignments, IF, etc.)
2. **Boolean Context** - Inside IF condition, while loop, etc.
3. **Arithmetic Context** - Numeric expression
4. **String Context** - String expression
5. **Assignment RHS Context** - Right side of assignment

---

**Example 1: `=` Operator**

**Context 1: Statement (Assignment)**
```
'x' = 5
```

Parser sees:
- Current context: **Statement**
- Pattern: `VARIABLE = EXPRESSION`
- Interpretation: ✅ **Assignment** statement

---

**Context 2: Boolean Expression**
```
IF 'x' = 5 THEN
```

Parser sees:
- Current context: **Boolean** (inside IF condition)
- Pattern: `EXPRESSION = EXPRESSION`
- Interpretation: ✅ **Equality comparison**

---

**Implementation:**

```typescript
enum ParseContext {
  Statement,
  Boolean,
  Arithmetic,
  String,
  AssignmentRHS
}

class Parser {
  private context: ParseContext = ParseContext.Statement;
  
  parseStatement(): Statement {
    this.context = ParseContext.Statement;
    
    // Try assignment first
    if (this.peek().type === TokenType.VERBALIZED_VAR && this.peekAhead(1).type === TokenType.ASSIGN) {
      return this.parseAssignment();
    }
    
    // Try IF statement
    if (this.match(TokenType.IF)) {
      return this.parseIfStatement();
    }
    
    // ... etc
  }
  
  parseIfStatement(): IfStatement {
    this.expect(TokenType.IF);
    
    // Switch to boolean context for condition
    const prevContext = this.context;
    this.context = ParseContext.Boolean;
    const condition = this.parseExpression();
    this.context = prevContext;
    
    this.expect(TokenType.THEN);
    const thenBlock = this.parseBlock();
    
    // ... etc
    
    return { type: 'IfStatement', condition, thenBlock, ... };
  }
  
  parseExpression(): Expression {
    // Behavior changes based on context
    switch (this.context) {
      case ParseContext.Boolean:
        return this.parseBooleanExpression();
      case ParseContext.Arithmetic:
        return this.parseArithmeticExpression();
      case ParseContext.String:
        return this.parseStringExpression();
      default:
        return this.parseGeneralExpression();
    }
  }
}
```

---

**Example 2: `is` Operator**

**Context 1: Statement (Assignment via `is`)**
```
'status' is "active"
```

Parser sees:
- Current context: **Statement**
- Next token after `is`: String literal
- No THEN or boolean connective following
- Interpretation: ✅ **Assignment** (syntactic sugar for `=`)

**AST:**
```typescript
{
  type: 'AssignmentStmt',
  variable: 'status',
  value: { type: 'StringLiteral', value: 'active' }
}
```

---

**Context 2: Boolean Expression**
```
IF 'status' is "active" THEN
```

Parser sees:
- Current context: **Boolean** (inside IF)
- Interpretation: ✅ **Equality comparison**

**AST:**
```typescript
{
  type: 'IfStatement',
  condition: {
    type: 'BinaryOp',
    operator: '==',
    left: { type: 'Variable', name: 'status' },
    right: { type: 'StringLiteral', value: 'active' }
  },
  ...
}
```

---

**Context 3: Complex Boolean**
```
IF 'count' > 10 AND 'status' is "active" THEN
```

Parser sees:
- Current context: **Boolean**
- Both sides of `AND` are comparisons
- `is` in boolean context = comparison
- Interpretation: ✅ **Equality comparison**

---

### 3. **Lookahead for Disambiguation**

**Principle:** Look at following tokens to determine current token's meaning.

**Example: `less` Disambiguation**

**Case 1: Subtraction**
```
'result' = 'a' less 'b'
```

**Lookahead:**
1. Current: `less`
2. Next: `'b'` (variable or number)
3. Next is NOT `than`
4. Interpretation: ✅ **Subtraction** (`-`)

---

**Case 2: Comparison (should be `is less than`)**
```
IF 'a' less than 'b' THEN
```

**Lookahead:**
1. Current: `less`
2. Next: `than`
3. Pattern matches: `less than`
4. Interpretation: ✅ **Comparison** (`<`)

**But better:** Encourage `is less than` instead:
```
IF 'a' is less than 'b' THEN
```

---

**Implementation:**

```typescript
function tokenize(input: string): Token[] {
  const words = input.split(/\s+/);
  const tokens: Token[] = [];
  let i = 0;
  
  while (i < words.length) {
    const word = words[i];
    
    // Try to match multi-word operator
    const operatorMatch = tryMatchOperator(words, i);
    if (operatorMatch) {
      tokens.push({
        type: operatorMatch.token,
        value: operatorMatch.text,
        position: i
      });
      i += operatorMatch.consumedTokens;
      continue;
    }
    
    // Check for standalone 'less' - lookahead for 'than'
    if (word.toLowerCase() === 'less') {
      const nextWord = words[i + 1]?.toLowerCase();
      
      if (nextWord === 'than') {
        // This should have been caught by multi-word matching above
        // But if we get here, it means 'is' is missing
        // We can still interpret as comparison
        tokens.push({
          type: TokenType.LESS_THAN,
          value: 'less than',
          position: i
        });
        i += 2;
        continue;
      } else {
        // Standalone 'less' = subtraction
        tokens.push({
          type: TokenType.MINUS,
          value: 'less',
          position: i
        });
        i++;
        continue;
      }
    }
    
    // ... other token matching
    i++;
  }
  
  return tokens;
}
```

---

### 4. **Grammar-Based Disambiguation**

**Principle:** Parser grammar encodes disambiguation rules.

**Example: Property Access vs. Variable**

**Ambiguous:**
```
name of 'customer'
```

**Question:** Is `name` a variable or a property?

**Grammar Rule:**
```
PropertyAccess := IDENTIFIER 'of' Expression
Variable       := VERBALIZED_VAR
```

**Disambiguation:**
- Un-quoted identifier before `of` → Property name
- Quoted identifier → Variable

**Examples:**
```
name of 'customer'        // Property access (name is property)
'name' of 'customer'      // ❌ Error: Variable cannot be used as property selector
```

**Better:**
```
name of 'customer'        // ✅ Property access
'customer name'           // ✅ Variable
```

---

**Implementation:**

```typescript
function parsePropertyAccessOrVariable(): Expression {
  const token = this.peek();
  
  // Check if un-quoted identifier followed by 'of'
  if (token.type === TokenType.IDENTIFIER) {
    const nextToken = this.peekAhead(1);
    
    if (nextToken && (nextToken.value === 'of' || nextToken.value === 'in' || nextToken.value === 'from')) {
      // This is property access
      const propertyName = this.advance().value;
      this.advance(); // consume 'of'/'in'/'from'
      const object = this.parseExpression();
      
      return {
        type: 'PropertyAccess',
        property: propertyName,
        object: object
      };
    }
  }
  
  // Otherwise, must be variable
  if (token.type === TokenType.VERBALIZED_VAR || token.type === TokenType.VARIABLE) {
    return this.parseVariable();
  }
  
  throw new Error(`Expected variable or property access, got ${token.type}`);
}
```

---

### 5. **Precedence-Based Disambiguation**

**Principle:** Operator precedence determines grouping, which can resolve ambiguity.

**Example:**
```
'result' = 'a' plus 'b' times 'c'
```

**Without Precedence:**
- Could be: `(a + b) * c`
- Could be: `a + (b * c)`

**With Precedence:**
- Multiplication has higher precedence than addition
- Interpretation: ✅ `a + (b * c)`

---

**Example with Natural Language:**
```
'result' = 'a' plus 'b' multiplied by 'c'
```

**Parse Tree:**
```
Assignment
├─ variable: 'result'
└─ value: BinaryOp (PLUS)
    ├─ left: Variable('a')
    └─ right: BinaryOp (MULTIPLY)
        ├─ left: Variable('b')
        └─ right: Variable('c')
```

**Operator Precedence Table:**
```typescript
const PRECEDENCE = {
  // Highest precedence
  '^': 5,
  'to the power of': 5,
  'squared': 5,
  'cubed': 5,
  
  '*': 4,
  '/': 4,
  '%': 4,
  'times': 4,
  'multiplied by': 4,
  'divided by': 4,
  'mod': 4,
  
  '+': 3,
  '-': 3,
  'plus': 3,
  'minus': 3,
  'less': 3,  // When used as subtraction
  
  '>': 2,
  '<': 2,
  '>=': 2,
  '<=': 2,
  '=': 2,
  '!=': 2,
  'is greater than': 2,
  'is less than': 2,
  'is equal to': 2,
  'is': 2,
  
  'AND': 1,
  'OR': 1,
  'NOT': 1
  // Lowest precedence
};
```

---

## Complex Examples

### Example 1: Nested Comparisons with Natural Language

**Input:**
```
IF 'price' is greater than 100 AND 'status' is "active" THEN
  'discount' = 'price' multiplied by 0.1
END
```

**Tokenization:**
1. `IF` → IF_KEYWORD
2. `'price'` → VERBALIZED_VAR
3. `is greater than` → GREATER_THAN_OP (greedy match!)
4. `100` → NUMBER
5. `AND` → AND_OP
6. `'status'` → VERBALIZED_VAR
7. `is` → EQUAL_OP (not followed by `greater`/`less`/etc.)
8. `"active"` → STRING
9. `THEN` → THEN_KEYWORD
10. `'discount'` → VERBALIZED_VAR
11. `=` → ASSIGN_OP (statement context!)
12. `'price'` → VERBALIZED_VAR
13. `multiplied by` → MULTIPLY_OP (greedy match!)
14. `0.1` → NUMBER
15. `END` → END_KEYWORD

**Context Tracking:**
- `IF` → Enter **Boolean context**
- Parse condition: `'price' is greater than 100 AND 'status' is "active"`
- `THEN` → Exit Boolean context, enter **Statement context**
- Parse body: `'discount' = 'price' multiplied by 0.1`
- `END` → Exit IF statement

**Parse Tree:**
```
IfStatement
├─ condition: BinaryOp (AND)
│   ├─ left: BinaryOp (>)
│   │   ├─ left: Variable('price')
│   │   └─ right: Number(100)
│   └─ right: BinaryOp (==)
│       ├─ left: Variable('status')
│       └─ right: String("active")
└─ thenBlock:
    └─ AssignmentStmt
        ├─ variable: 'discount'
        └─ value: BinaryOp (*)
            ├─ left: Variable('price')
            └─ right: Number(0.1)
```

---

### Example 2: Property Access Chaining

**Input:**
```
'city name' = city of address of 'customer'
```

**Tokenization:**
1. `'city name'` → VERBALIZED_VAR
2. `=` → ASSIGN_OP
3. `city` → IDENTIFIER
4. `of` → OF_KEYWORD
5. `address` → IDENTIFIER
6. `of` → OF_KEYWORD
7. `'customer'` → VERBALIZED_VAR

**Parsing (Right-to-Left for Property Access):**

**Step 1:** Parse `address of 'customer'`
```
PropertyAccess
├─ property: 'address'
└─ object: Variable('customer')
```

**Step 2:** Parse `city of [previous result]`
```
PropertyAccess
├─ property: 'city'
└─ object: PropertyAccess
    ├─ property: 'address'
    └─ object: Variable('customer')
```

**Step 3:** Assign to `'city name'`
```
AssignmentStmt
├─ variable: 'city name'
└─ value: PropertyAccess (from step 2)
```

**Result:** Evaluates to `customer.address.city`

---

### Example 3: Ambiguous `less` Disambiguation

**Input 1: Subtraction**
```
'diff' = 'a' less 'b'
```

**Tokenization:**
1. `'diff'` → VERBALIZED_VAR
2. `=` → ASSIGN_OP (statement context)
3. `'a'` → VERBALIZED_VAR
4. `less` → Lookahead: next is `'b'` (not `than`)
5. `less` → MINUS_OP ✅
6. `'b'` → VERBALIZED_VAR

**Parse Tree:**
```
AssignmentStmt
├─ variable: 'diff'
└─ value: BinaryOp (-)
    ├─ left: Variable('a')
    └─ right: Variable('b')
```

---

**Input 2: Comparison (Better Style)**
```
IF 'a' is less than 'b' THEN
```

**Tokenization:**
1. `IF` → IF_KEYWORD
2. `'a'` → VERBALIZED_VAR
3. `is less than` → LESS_THAN_OP ✅ (greedy multi-word match)
4. `'b'` → VERBALIZED_VAR
5. `THEN` → THEN_KEYWORD

**Parse Tree:**
```
IfStatement
├─ condition: BinaryOp (<)
│   ├─ left: Variable('a')
│   └─ right: Variable('b')
└─ thenBlock: ...
```

---

**Input 3: Comparison (Discouraged Style)**
```
IF 'a' less than 'b' THEN
```

**Tokenization:**
1. `IF` → IF_KEYWORD
2. `'a'` → VERBALIZED_VAR
3. `less than` → LESS_THAN_OP ✅ (multi-word match without `is`)
4. `'b'` → VERBALIZED_VAR
5. `THEN` → THEN_KEYWORD

**Note:** This works, but we should encourage `is less than` for clarity.

---

## Disambiguation Decision Tree

```
┌─────────────────────────────────────┐
│  See potential operator keyword     │
│  (e.g., 'is', 'less', 'plus', etc.) │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Try greedy multi-word match        │
│  (longest pattern first)            │
└─────────────┬───────────────────────┘
              │
              ├─ Match found? ─────────────────┐
              │                                 │
              NO                               YES
              │                                 │
              ▼                                 ▼
┌─────────────────────────────────────┐   Return matched
│  Try single-word match              │   multi-word token
└─────────────┬───────────────────────┘
              │
              ├─ Match found? ─────────────────┐
              │                                 │
              NO                               YES
              │                                 │
              ▼                                 ▼
┌─────────────────────────────────────┐   Check context:
│  Must be identifier or variable     │   - Boolean → Comparison
└─────────────────────────────────────┘   - Statement → Assignment/Arithmetic
                                          - Check lookahead for 'of'
                                          │
                                          ▼
                                      Return token with
                                      context annotation
```

---

## Implementation Strategy

### Phase 1: Lexer (Tokenizer)

**Responsibility:** Convert text to tokens using greedy matching

```typescript
class Lexer {
  private input: string;
  private position: number;
  private words: string[];
  
  tokenize(): Token[] {
    const tokens: Token[] = [];
    
    while (this.position < this.words.length) {
      // Try multi-word operator match (longest first)
      const operatorMatch = this.tryMatchOperator();
      if (operatorMatch) {
        tokens.push(operatorMatch.token);
        this.position += operatorMatch.consumedWords;
        continue;
      }
      
      // Try single word token
      const token = this.matchSingleToken();
      if (token) {
        tokens.push(token);
        this.position++;
        continue;
      }
      
      throw new Error(`Unexpected token at position ${this.position}`);
    }
    
    return tokens;
  }
  
  private tryMatchOperator(): OperatorMatch | null {
    // Check operators from longest to shortest
    for (const op of NATURAL_LANGUAGE_OPERATORS) {
      const wordCount = op.pattern.split(' ').length;
      const slice = this.words.slice(this.position, this.position + wordCount);
      const text = slice.join(' ').toLowerCase();
      
      if (text === op.pattern.toLowerCase()) {
        return {
          token: { type: op.tokenType, value: text },
          consumedWords: wordCount
        };
      }
    }
    
    return null;
  }
}
```

---

### Phase 2: Parser (Context-Aware)

**Responsibility:** Build AST using contextual information

```typescript
class Parser {
  private tokens: Token[];
  private position: number;
  private context: ParseContext;
  
  parseStatement(): Statement {
    const token = this.peek();
    
    // IF statement
    if (token.type === TokenType.IF) {
      return this.parseIfStatement();
    }
    
    // Assignment
    if (this.isAssignmentStart()) {
      return this.parseAssignment();
    }
    
    // ... other statements
  }
  
  parseIfStatement(): IfStatement {
    this.expect(TokenType.IF);
    
    // Switch to boolean context
    const prevContext = this.context;
    this.context = ParseContext.Boolean;
    
    const condition = this.parseExpression();
    
    this.context = prevContext;
    this.expect(TokenType.THEN);
    
    const thenBlock = this.parseBlock();
    
    // ... rest of IF parsing
    
    return { type: 'IfStatement', condition, thenBlock, ... };
  }
  
  parseExpression(): Expression {
    // Context affects interpretation of operators
    if (this.context === ParseContext.Boolean) {
      return this.parseBooleanExpression();
    }
    
    return this.parseArithmeticExpression();
  }
}
```

---

## Edge Cases & Solutions

### Edge Case 1: `less` Without `than` in Boolean Context

**Input:**
```
IF 'a' less 'b' THEN
```

**Problem:** Is this subtraction or incomplete comparison?

**Solution 1: Strict Interpretation**
- In boolean context, `less` alone is an error
- Require `is less than` for comparisons
- Error: "Did you mean 'is less than'?"

**Solution 2: Lenient Interpretation**
- In boolean context, interpret as comparison
- `less` → `is less than` (autocorrect)
- Warning: "Consider using 'is less than' for clarity"

**Recommendation:** Solution 2 (lenient) with warning

---

### Edge Case 2: Multiple Articles

**Input:**
```
set the the 'discount' to 10
```

**Problem:** Duplicate articles

**Solution:**
- Lexer strips consecutive articles
- Or: Parser error on duplicate articles
- Error: "Unexpected duplicate article 'the'"

**Recommendation:** Parser error (catches typos)

---

### Edge Case 3: `is` vs `is equal to`

**Input:**
```
'status' is "active"
```

**vs.**

```
'status' is equal to "active"
```

**Solution:** Both are equivalent
- `is` alone → equality
- `is equal to` → equality (more explicit)
- No semantic difference

---

### Edge Case 4: `contains` as Operator vs Function

**Input 1: Natural Language Operator**
```
IF 'email' contains "@example.com" THEN
```

**Tokenization:**
- `contains` → CONTAINS_OP

**Parse:**
- Binary operator: `left contains right`

**Evaluation:**
- Translate to function call: `CONTAINS(left, right)`

---

**Input 2: Function Call**
```
IF CONTAINS('email', "@example.com") THEN
```

**Tokenization:**
- `CONTAINS` → FUNCTION_NAME

**Parse:**
- Function call: `CONTAINS(arg1, arg2)`

---

**Solution:** Both should work and be equivalent!
- Natural language operator → syntactic sugar for function call
- Both produce same AST after parsing

---

## Validation & Error Messages

### Good Error Messages Using Context

**Example 1:**
```
'result' = 'a' less
```

**Error:**
```
Parse error at line 1, column 20:
  'result' = 'a' less
                     ^
Expected expression after 'less' operator.
Did you mean 'is less than' for comparison?
```

---

**Example 2:**
```
IF 'a' less 'b' THEN
```

**Warning:**
```
Style warning at line 1:
  IF 'a' less 'b' THEN
        ^~~~~^
In boolean context, prefer 'is less than' over 'less' for clarity.
'less' alone typically means subtraction.
```

---

**Example 3:**
```
name is of 'customer'
```

**Error:**
```
Parse error at line 1:
  name is of 'customer'
       ^~^
Unexpected 'is' before 'of'.
Did you mean: name of 'customer' (property access)?
```

---

## Testing Strategy

### Test Cases for Disambiguation

```typescript
describe('Parser Disambiguation', () => {
  describe('less operator', () => {
    it('should parse as subtraction in arithmetic context', () => {
      const ast = parse("'result' = 'a' less 'b'");
      expect(ast.body[0].value.operator).toBe('-');
    });
    
    it('should parse as comparison in boolean context', () => {
      const ast = parse("IF 'a' is less than 'b' THEN 'x' = 1 END");
      expect(ast.body[0].condition.operator).toBe('<');
    });
    
    it('should warn for ambiguous usage', () => {
      const { warnings } = parse("IF 'a' less 'b' THEN 'x' = 1 END");
      expect(warnings).toContainEqual(expect.objectContaining({
        message: expect.stringContaining("prefer 'is less than'")
      }));
    });
  });
  
  describe('is operator', () => {
    it('should parse as assignment in statement context', () => {
      const ast = parse("'status' is 'active'");
      expect(ast.body[0].type).toBe('AssignmentStmt');
    });
    
    it('should parse as equality in boolean context', () => {
      const ast = parse("IF 'status' is 'active' THEN 'x' = 1 END");
      expect(ast.body[0].condition.operator).toBe('==');
    });
  });
  
  describe('property access', () => {
    it('should parse un-quoted identifier before "of" as property', () => {
      const ast = parse("'x' = name of 'customer'");
      expect(ast.body[0].value.type).toBe('PropertyAccess');
      expect(ast.body[0].value.property).toBe('name');
    });
    
    it('should error on quoted identifier before "of"', () => {
      expect(() => parse("'x' = 'name' of 'customer'")).toThrow();
    });
  });
  
  describe('greedy operator matching', () => {
    it('should match "is less than" as one operator', () => {
      const tokens = tokenize("'a' is less than 'b'");
      const opToken = tokens.find(t => t.type === TokenType.LESS_THAN);
      expect(opToken).toBeDefined();
      expect(opToken.value).toBe('is less than');
    });
    
    it('should match "multiplied by" as one operator', () => {
      const tokens = tokenize("'x' multiplied by 'y'");
      const opToken = tokens.find(t => t.type === TokenType.MULTIPLY);
      expect(opToken).toBeDefined();
      expect(opToken.value).toBe('multiplied by');
    });
  });
});
```

---

## Summary

### Key Principles

1. **Greedy Matching** - Always match longest operator sequence
2. **Context Awareness** - Parser tracks current context (Boolean, Arithmetic, Statement)
3. **Lookahead** - Check following tokens to disambiguate
4. **Grammar Rules** - Encode disambiguation in parser grammar
5. **Precedence** - Operator precedence resolves grouping ambiguities

### Disambiguation Table

| Construct | Context | Interpretation | Example |
|-----------|---------|----------------|---------|
| `less` | Arithmetic | Subtraction (`-`) | `'a' less 'b'` → `a - b` |
| `less than` | Any | Comparison (`<`) | `'a' less than 'b'` → `a < b` |
| `is less than` | Any | Comparison (`<`) | `'a' is less than 'b'` → `a < b` ✅ Preferred |
| `is` | Statement | Assignment (`=`) | `'x' is 5` → `x = 5` |
| `is` | Boolean | Equality (`==`) | `IF 'x' is 5` → `if (x == 5)` |
| `is equal to` | Any | Equality (`==`) | `'x' is equal to 5` → `x == 5` ✅ Explicit |
| `name of` | Any | Property Access | `name of 'customer'` → `customer.name` |
| `'name' of` | Any | ❌ Error | Quoted identifier can't be property name |

---

## Next Steps

1. Implement greedy multi-word operator matching in lexer
2. Add context tracking to parser
3. Implement lookahead for ambiguous cases
4. Add comprehensive error messages with suggestions
5. Write disambiguation test suite
6. Document recommended style (e.g., prefer `is less than` over `less than`)

---

**Document Version:** 1.0
**Last Updated:** 2025-11-07
**Author:** Development Team
