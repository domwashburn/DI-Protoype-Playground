# Phase 5: Natural Language Operators - Implementation Plan

**Related Documents:**
- `/planning/requirements/PHASE5-NaturalLanguageOperators.md`
- `/planning/requirements/BAL-ODM-ADS-GapAnalysis.md`
- `/planning/requirements/PHASE5-ParserDisambiguation.md`

**Status:** Implementation Ready
**Created:** 2025-11-07

---

## Implementation Sequence

### Phase 5.1: Core Infrastructure (Tokenizer Enhancement)
**Goal:** Add multi-word natural language operator tokenization with greedy matching

**Files to Modify:**
1. `/services/evaluationEngine/parsers/Tokenizer.ts`

**Changes:**
- Add new token types for natural language operators
- Implement greedy multi-word operator matching
- Add operator lookup table (sorted by length, longest first)
- Implement lookahead for disambiguation

**Test:**
- Tokenization of multi-word operators
- Greedy matching (prefer longer matches)
- Correct disambiguation based on lookahead

---

### Phase 5.2: Parser Enhancement (Context-Aware Parsing)
**Goal:** Update parser to handle natural language operators and track context

**Files to Modify:**
1. `/services/evaluationEngine/parsers/FormulaParser.ts`
2. `/services/evaluationEngine/ast/ASTNodes.ts` (if needed for new node types)

**Changes:**
- Add parse context tracking (Statement, Boolean, Arithmetic)
- Update expression parsing to handle new operator tokens
- Add property access with `of`/`in`/`from` syntax
- Handle optional articles (`the`, `a`, `an`)
- Context-aware interpretation of ambiguous operators

**Test:**
- Context-sensitive operator interpretation
- Property access parsing
- Article handling (optional)

---

### Phase 5.3: Syntax Highlighting
**Goal:** Highlight natural language operators like symbolic operators

**Files to Modify:**
1. `/components/editors/code/FormulaEditor/hooks/useFormulaSyntax.ts`

**Changes:**
- Add patterns for all natural language operators
- Style them same as symbolic operators (bold/red)
- Ensure multi-word patterns are highlighted as single units

**Test:**
- Visual verification of highlighting
- Multi-word operators highlighted as units

---

### Phase 5.4: Autocomplete Enhancement
**Goal:** Suggest natural language operators in appropriate contexts

**Files to Modify:**
1. `/components/editors/code/FormulaEditor/hooks/useFormulaAutocomplete.ts`

**Changes:**
- Context-aware operator suggestions
- After variable: suggest arithmetic operators
- After identifier: suggest `of`, `in`, `from`
- Include both symbolic and natural language options

**Test:**
- Autocomplete suggestions appear correctly
- Context-appropriate suggestions

---

### Phase 5.5: Evaluation Engine Updates
**Goal:** Ensure evaluator handles new syntax correctly

**Files to Modify:**
1. `/services/evaluationEngine/runtime/Evaluator.ts` (if needed)

**Changes:**
- Property access with reversed syntax (`name of X` → `X.name`)
- Verify all natural language operators evaluate correctly

**Test:**
- End-to-end evaluation tests
- Property access evaluation
- Complex expressions with natural language operators

---

### Phase 5.6: Formula Samples
**Goal:** Add examples demonstrating natural language operators

**Files to Modify:**
1. `/data/formulaSamples.ts`

**Changes:**
- Add new samples category: "Natural Language Operators"
- Show side-by-side symbolic vs natural language examples
- Demonstrate property access with `of`
- Show mixed symbolic/natural language usage

---

### Phase 5.7: Documentation & Testing
**Goal:** Comprehensive testing and documentation

**Files to Create/Modify:**
1. `/tests/naturalLanguageOperators.test.ts` (create)
2. `/change-log/25-11-07_v01-NaturalLanguageOperators.md` (create)

**Changes:**
- Unit tests for lexer
- Unit tests for parser
- Integration tests for evaluation
- Documentation of implementation

---

## BAL Alignment Checklist

Based on IBM BAL/ODM/ADS patterns:

### ✅ Arithmetic Operators (BAL-aligned)
- [ ] `multiplied by` / `times` → `*`
- [ ] `divided by` → `/`
- [ ] `plus` → `+`
- [ ] `minus` → `-`
- [ ] `to the power of` / `squared` / `cubed` → `^`
- [ ] `mod` / `modulo` → `%`

### ✅ Property Access (BAL-aligned)
- [ ] `name of 'object'` → `object.name`
- [ ] `property in 'object'` → `object.property`
- [ ] `field from 'object'` → `object.field`
- [ ] Chained: `city of address of 'customer'` → `customer.address.city`

### ✅ Assignment Keywords (BAL-aligned)
- [ ] `set 'var' to value` → `var = value`
- [ ] `'var' is set to value` → `var = value`

### ✅ Equality and Checks (BAL-aligned)
- [ ] `'x' is "value"` → `x == "value"` (in boolean context)
- [ ] `'x' is null` → null check
- [ ] `'x' is not null` → not null check
- [ ] `'x' is empty` → empty check (string/list)
- [ ] `'x' is not empty` → not empty check

### ✅ String Predicates (BAL-aligned)
- [ ] `'text' starts with "prefix"` → STARTS_WITH(text, "prefix")
- [ ] `'text' ends with "suffix"` → ENDS_WITH(text, "suffix")
- [ ] `'text' contains "substring"` → CONTAINS(text, "substring")

### ✅ Optional Articles (BAL-aligned)
- [ ] `the` before variables: `set the 'x' to 5`
- [ ] `the` in property access: `the name of the 'customer'`
- [ ] `a` before variables: `set a 'discount' to 10`
- [ ] Articles are optional (stripped during parsing)

### ✅ Comparison Operators (Already implemented in Phase 4)
- [x] `is greater than` → `>`
- [x] `is less than` → `<`
- [x] `is greater than or equal to` → `>=`
- [x] `is less than or equal to` → `<=`
- [x] `is equal to` → `==`
- [x] `is not equal to` → `!=`

---

## Token Type Additions

Add to Tokenizer TokenType enum:

```typescript
// Natural language arithmetic operators
| 'TIMES'              // times / multiplied by
| 'DIVIDED_BY'         // divided by
| 'PLUS_NL'            // plus (natural language)
| 'MINUS_NL'           // minus (natural language)
| 'POWER_OF'           // to the power of
| 'SQUARED'            // squared
| 'CUBED'              // cubed
| 'MOD_NL'             // mod / modulo

// Property access keywords
| 'OF'                 // of (property access)
| 'FROM'               // from (property access)

// Assignment keywords
| 'SET'                // set (assignment)
| 'TO'                 // to (assignment)
| 'IS_SET_TO'          // is set to

// Equality and checks
| 'IS'                 // is (equality or checks)
| 'IS_NULL'            // is null
| 'IS_NOT_NULL'        // is not null
| 'IS_EMPTY'           // is empty
| 'IS_NOT_EMPTY'       // is not empty

// String predicates
| 'STARTS_WITH'        // starts with
| 'ENDS_WITH'          // ends with
| 'CONTAINS_OP'        // contains (operator form)

// Articles (optional)
| 'THE'                // the
| 'A'                  // a
| 'AN'                 // an

// Comparison operators (natural language) - from Phase 4
| 'IS_GREATER_THAN'    // is greater than
| 'IS_LESS_THAN'       // is less than
| 'IS_GREATER_EQUAL'   // is greater than or equal to
| 'IS_LESS_EQUAL'      // is less than or equal to
| 'IS_EQUAL_TO'        // is equal to
| 'IS_NOT_EQUAL_TO'    // is not equal to
```

---

## Operator Lookup Table (Greedy Matching)

```typescript
interface OperatorPattern {
  pattern: string;          // Natural language pattern (lowercase)
  tokenType: TokenType;     // Token type to return
  symbolicEquiv: string;    // Symbolic equivalent (for documentation)
}

// CRITICAL: Sorted by pattern length DESC (longest first!)
const NATURAL_LANGUAGE_OPERATORS: OperatorPattern[] = [
  // Comparison operators (longest first) - Phase 4
  { pattern: 'is greater than or equal to', tokenType: 'IS_GREATER_EQUAL', symbolicEquiv: '>=' },
  { pattern: 'is less than or equal to', tokenType: 'IS_LESS_EQUAL', symbolicEquiv: '<=' },
  { pattern: 'is not equal to', tokenType: 'IS_NOT_EQUAL_TO', symbolicEquiv: '!=' },
  
  // Checks (4 words)
  { pattern: 'is not empty', tokenType: 'IS_NOT_EMPTY', symbolicEquiv: 'IS_NOT_EMPTY' },
  { pattern: 'is not null', tokenType: 'IS_NOT_NULL', symbolicEquiv: 'IS_NOT_NULL' },
  
  // Power operators (3-4 words)
  { pattern: 'to the power of', tokenType: 'POWER_OF', symbolicEquiv: '^' },
  
  // Comparison operators (3 words) - Phase 4
  { pattern: 'is greater than', tokenType: 'IS_GREATER_THAN', symbolicEquiv: '>' },
  { pattern: 'is less than', tokenType: 'IS_LESS_THAN', symbolicEquiv: '<' },
  { pattern: 'is equal to', tokenType: 'IS_EQUAL_TO', symbolicEquiv: '==' },
  
  // Assignment (3 words)
  { pattern: 'is set to', tokenType: 'IS_SET_TO', symbolicEquiv: '=' },
  
  // Arithmetic operators (2 words)
  { pattern: 'multiplied by', tokenType: 'TIMES', symbolicEquiv: '*' },
  { pattern: 'multiply by', tokenType: 'TIMES', symbolicEquiv: '*' },
  { pattern: 'divided by', tokenType: 'DIVIDED_BY', symbolicEquiv: '/' },
  { pattern: 'divide by', tokenType: 'DIVIDED_BY', symbolicEquiv: '/' },
  { pattern: 'added to', tokenType: 'PLUS_NL', symbolicEquiv: '+' },
  
  // String predicates (2 words)
  { pattern: 'starts with', tokenType: 'STARTS_WITH', symbolicEquiv: 'STARTS_WITH()' },
  { pattern: 'ends with', tokenType: 'ENDS_WITH', symbolicEquiv: 'ENDS_WITH()' },
  
  // Checks (2 words)
  { pattern: 'is null', tokenType: 'IS_NULL', symbolicEquiv: 'IS_NULL' },
  { pattern: 'is empty', tokenType: 'IS_EMPTY', symbolicEquiv: 'IS_EMPTY' },
  
  // Single-word operators
  { pattern: 'times', tokenType: 'TIMES', symbolicEquiv: '*' },
  { pattern: 'plus', tokenType: 'PLUS_NL', symbolicEquiv: '+' },
  { pattern: 'minus', tokenType: 'MINUS_NL', symbolicEquiv: '-' },
  { pattern: 'less', tokenType: 'MINUS_NL', symbolicEquiv: '-' }, // ⚠️ Context-sensitive!
  { pattern: 'mod', tokenType: 'MOD_NL', symbolicEquiv: '%' },
  { pattern: 'modulo', tokenType: 'MOD_NL', symbolicEquiv: '%' },
  { pattern: 'squared', tokenType: 'SQUARED', symbolicEquiv: '^ 2' },
  { pattern: 'cubed', tokenType: 'CUBED', symbolicEquiv: '^ 3' },
  
  // Property access keywords
  { pattern: 'of', tokenType: 'OF', symbolicEquiv: '.' },
  { pattern: 'in', tokenType: 'IN', symbolicEquiv: '.' }, // Note: conflicts with FOR..IN
  { pattern: 'from', tokenType: 'FROM', symbolicEquiv: '.' },
  
  // Assignment keywords
  { pattern: 'set', tokenType: 'SET', symbolicEquiv: '' },
  { pattern: 'to', tokenType: 'TO', symbolicEquiv: '' },
  
  // Equality
  { pattern: 'is', tokenType: 'IS', symbolicEquiv: '==' }, // ⚠️ Context-sensitive!
  { pattern: 'contains', tokenType: 'CONTAINS_OP', symbolicEquiv: 'CONTAINS()' },
  
  // Articles (optional - can be stripped)
  { pattern: 'the', tokenType: 'THE', symbolicEquiv: '' },
  { pattern: 'a', tokenType: 'A', symbolicEquiv: '' },
  { pattern: 'an', tokenType: 'AN', symbolicEquiv: '' },
];
```

---

## Grammar Updates

### Property Access

**Old Grammar:**
```
PropertyAccess := Primary DOT IDENTIFIER
```

**New Grammar:**
```
PropertyAccess := Primary DOT IDENTIFIER
                | IDENTIFIER (OF | IN | FROM) Primary
                | IDENTIFIER (OF | IN | FROM) PropertyAccess  // For chaining
```

**Example:**
```
name of 'customer'           // Simple property access
city of address of 'customer' // Chained property access
```

---

### Assignment

**Old Grammar:**
```
Assignment := (VARIABLE | VERBALIZATION) EQUALS Expression
```

**New Grammar:**
```
Assignment := (VARIABLE | VERBALIZATION) EQUALS Expression
            | (VARIABLE | VERBALIZATION) IS Expression          // Context: Statement
            | SET (VARIABLE | VERBALIZATION) TO Expression
            | (VARIABLE | VERBALIZATION) IS_SET_TO Expression
```

**Example:**
```
'x' = 5
'x' is 5                    // Equivalent (statement context)
set 'x' to 5                // Explicit assignment
'x' is set to 5             // Explicit assignment
```

---

### Arithmetic Operations

**Old Grammar:**
```
Multiplicative := Unary ((STAR | SLASH | PERCENT) Unary)*
Additive := Multiplicative ((PLUS | MINUS) Multiplicative)*
```

**New Grammar:**
```
Multiplicative := Power ((STAR | TIMES | SLASH | DIVIDED_BY | PERCENT | MOD_NL) Power)*
Additive := Multiplicative ((PLUS | PLUS_NL | MINUS | MINUS_NL) Multiplicative)*
Power := Unary ((POWER | POWER_OF) Unary | SQUARED | CUBED)?
```

**Example:**
```
'result' = 'a' plus 'b' times 'c'        // a + (b * c)
'square' = 'x' squared                    // x ^ 2
'power' = 'x' to the power of 'n'        // x ^ n
```

---

### Equality and Checks

**New Grammar:**
```
Comparison := Additive (ComparisonOp Additive)*
            | Additive IS (NULL | EMPTY | NOT NULL | NOT EMPTY)
            | Additive IS Expression                          // Context: Boolean

ComparisonOp := EQUALS | NOT_EQUALS | LESS | GREATER | LESS_EQ | GREATER_EQ
              | IS_EQUAL_TO | IS_NOT_EQUAL_TO
              | IS_GREATER_THAN | IS_LESS_THAN
              | IS_GREATER_EQUAL | IS_LESS_EQUAL
              | IS                                            // Context: Boolean
```

**Example:**
```
IF 'x' is null THEN ...              // Null check
IF 'text' is not empty THEN ...      // Empty check
IF 'status' is "active" THEN ...     // Equality (boolean context)
```

---

### String Predicates

**New Grammar:**
```
Comparison := ... existing ...
            | Additive (STARTS_WITH | ENDS_WITH | CONTAINS_OP) Additive
```

**Example:**
```
IF 'email' contains "@example.com" THEN ...
IF 'name' starts with "A" THEN ...
```

---

## Parse Context Tracking

```typescript
enum ParseContext {
  Statement,   // Top-level or in block
  Boolean,     // Inside IF/WHILE condition, or logical expression
  Arithmetic,  // Numeric expression
  String,      // String expression
}

class FormulaParser {
  private context: ParseContext = ParseContext.Statement;
  
  // Switch context when entering IF condition
  private ifExpression(): IfExpression {
    this.consume('IF');
    
    const prevContext = this.context;
    this.context = ParseContext.Boolean;  // ← Switch to boolean context
    
    const condition = this.expression();
    
    this.context = prevContext;  // ← Restore context
    this.consume('THEN');
    
    // ... rest of IF parsing
  }
  
  // Interpret 'IS' based on context
  private handleIsOperator(): BinaryOperator {
    if (this.context === ParseContext.Boolean) {
      return '==';  // Equality comparison
    } else {
      // This shouldn't happen in well-formed code
      // 'IS' at statement level should be part of assignment
      throw new ParseError('Unexpected IS operator in this context');
    }
  }
}
```

---

## Error Messages & Warnings

### Style Warnings

```typescript
// Warn about ambiguous 'less' usage
if (token.type === 'MINUS_NL' && token.value === 'less' && this.context === ParseContext.Boolean) {
  this.warn({
    message: "In boolean context, prefer 'is less than' over 'less' for clarity. 'less' alone typically means subtraction.",
    location: this.createLocation(token),
    severity: 'warning'
  });
}
```

### Error Messages

```typescript
// Helpful error for missing 'is'
if (token.type === 'LESS' && this.peekAhead()?.value === 'than' && this.context === ParseContext.Boolean) {
  throw new ParseError(
    "Did you mean 'is less than'? The 'is' keyword is recommended before comparison operators.",
    this.createLocation(token)
  );
}

// Error for property access with quoted identifier
if (token.type === 'VERBALIZATION' && this.peek().type === 'OF') {
  throw new ParseError(
    "Property names cannot be verbalizations. Use: name of 'object', not: 'name' of 'object'",
    this.createLocation(token)
  );
}
```

---

## Testing Strategy

### Unit Tests: Tokenizer

```typescript
describe('Natural Language Operator Tokenization', () => {
  test('greedy matching: "is less than" as single token', () => {
    const tokens = tokenize("'a' is less than 'b'");
    expect(tokens).toContainEqual(
      expect.objectContaining({ type: 'IS_LESS_THAN', value: 'is less than' })
    );
  });
  
  test('"less" alone tokenizes as MINUS_NL', () => {
    const tokens = tokenize("'a' less 'b'");
    expect(tokens).toContainEqual(
      expect.objectContaining({ type: 'MINUS_NL', value: 'less' })
    );
  });
  
  test('"multiplied by" as single token', () => {
    const tokens = tokenize("'x' multiplied by 'y'");
    expect(tokens).toContainEqual(
      expect.objectContaining({ type: 'TIMES', value: 'multiplied by' })
    );
  });
});
```

### Unit Tests: Parser

```typescript
describe('Natural Language Operator Parsing', () => {
  test('parse arithmetic with natural language', () => {
    const ast = parse("'result' = 'a' plus 'b' times 'c'");
    expect(ast.body[0].value.operator).toBe('+');
    expect(ast.body[0].value.right.operator).toBe('*');  // Precedence
  });
  
  test('parse property access with "of"', () => {
    const ast = parse("'x' = name of 'customer'");
    expect(ast.body[0].value.type).toBe('PropertyAccess');
    expect(ast.body[0].value.property).toBe('name');
  });
  
  test('context-sensitive "is" operator', () => {
    const ast = parse("IF 'x' is 5 THEN 'y' = 1 END");
    expect(ast.body[0].condition.operator).toBe('==');  // Comparison in boolean context
  });
});
```

### Integration Tests: Evaluation

```typescript
describe('Natural Language Operator Evaluation', () => {
  test('evaluate arithmetic', () => {
    const result = evaluate("'result' = 5 times 3");
    expect(result.variables.result).toBe(15);
  });
  
  test('evaluate property access', () => {
    const result = evaluate(
      "'name' = name of 'customer'",
      { customer: { name: 'Alice' } }
    );
    expect(result.variables.name).toBe('Alice');
  });
  
  test('evaluate chained property access', () => {
    const result = evaluate(
      "'city' = city of address of 'customer'",
      { customer: { address: { city: 'NYC' } } }
    );
    expect(result.variables.city).toBe('NYC');
  });
});
```

---

## Implementation Checklist

### Phase 5.1: Tokenizer
- [ ] Add new TokenType definitions
- [ ] Create NATURAL_LANGUAGE_OPERATORS table
- [ ] Implement greedy multi-word matching
- [ ] Add lookahead for disambiguation
- [ ] Handle articles (optional tokens)
- [ ] Test tokenization

### Phase 5.2: Parser
- [ ] Add ParseContext enum and tracking
- [ ] Update comparison() to handle natural language operators
- [ ] Update arithmetic operators (additive, multiplicative)
- [ ] Add power operators (squared, cubed, to the power of)
- [ ] Add property access with of/in/from
- [ ] Add assignment variations (set...to, is set to)
- [ ] Add equality checks (is, is null, is empty)
- [ ] Add string predicates (starts with, ends with, contains)
- [ ] Context-sensitive interpretation
- [ ] Test parsing

### Phase 5.3: Syntax Highlighting
- [ ] Add patterns for all natural language operators
- [ ] Style consistently with symbolic operators
- [ ] Test visual highlighting

### Phase 5.4: Autocomplete
- [ ] Context-aware operator suggestions
- [ ] Include natural language alternatives
- [ ] Test autocomplete behavior

### Phase 5.5: Evaluation
- [ ] Verify property access reversal works
- [ ] Test all operator evaluations
- [ ] Integration tests

### Phase 5.6: Samples
- [ ] Add "Natural Language Operators" category
- [ ] Create comprehensive examples
- [ ] Show mixed symbolic/natural language

### Phase 5.7: Documentation
- [ ] Write tests
- [ ] Create change log entry
- [ ] Update any affected READMEs

---

## Success Criteria

Phase 5 is complete when:

✅ All natural language operators tokenize correctly
✅ Parser handles natural language operators with correct precedence
✅ Context-aware disambiguation works (is, less, etc.)
✅ Property access with of/in/from works (including chaining)
✅ Syntax highlighting shows natural language operators
✅ Autocomplete suggests natural language operators
✅ All tests pass
✅ Formula samples demonstrate new features
✅ Users can write: `'total price' = 'unit price' times 'quantity'`
✅ Users can write: `'email' = email of 'customer'`
✅ Users can write: `IF 'price' is greater than 100 THEN ...`
✅ Mixed symbolic/natural language works

---

**Ready to implement!**

**Next Step:** Begin with Phase 5.1 - Tokenizer enhancement
