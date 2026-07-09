# Phase 5.2.1: Natural Language Function Syntax

**Created:** 2025-11-07
**Status:** Planning → Implementation

---

## Problem Statement

Users should be able to write natural language function calls in BAL style:

```
the sum of 'x', 'y', and 'z' is less than 'a'
the average of 'prices' is greater than 100
the count of 'items' is not 0
the maximum of 'a', 'b', 'c'
```

Currently, users must write:
```
SUM('x', 'y', 'z') is less than 'a'
AVERAGE('prices') is greater than 100
COUNT('items') is not 0
MAX('a', 'b', 'c')
```

---

## Natural Language Function Patterns

### Core Pattern

**Syntax:** `the [FUNCTION] of [arguments]`

**Arguments can be:**
- Single expression: `the count of 'items'`
- Comma-separated: `the sum of 'x', 'y', 'z'`
- With "and" connector: `the sum of 'x', 'y', and 'z'`
- Mixed: `the sum of 'x' and 'y'` (no commas)

### Supported Functions

#### Aggregate Functions
```
the sum of 'x', 'y', 'z'              → SUM(x, y, z)
the average of 'prices'               → AVERAGE(prices)
the count of 'items'                  → COUNT(items)
the maximum of 'a', 'b', 'c'          → MAX(a, b, c)
the minimum of 'a', 'b', 'c'          → MIN(a, b, c)
the total of 'x', 'y'                 → SUM(x, y)
```

#### Array Functions
```
the first element of 'list'           → FIRST(list)
the last element of 'list'            → LAST(list)
the length of 'list'                  → LENGTH(list)
the size of 'list'                    → LENGTH(list)
```

#### String Functions
```
the length of 'text'                  → LENGTH(text)
the uppercase of 'text'               → UPPER(text)
the lowercase of 'text'               → LOWER(text)
```

#### Math Functions
```
the absolute value of 'x'             → ABS(x)
the square root of 'x'                → SQRT(x)
the ceiling of 'x'                    → CEIL(x)
the floor of 'x'                      → FLOOR(x)
the round of 'x'                      → ROUND(x)
```

---

## Token Types

### New Token Types (Add to Tokenizer.ts)

```typescript
// Natural Language Function Tokens
'THE_SUM_OF'
'THE_AVERAGE_OF'
'THE_COUNT_OF'
'THE_MAXIMUM_OF'
'THE_MINIMUM_OF'
'THE_TOTAL_OF'
'THE_FIRST_ELEMENT_OF'
'THE_LAST_ELEMENT_OF'
'THE_FIRST_OF'
'THE_LAST_OF'
'THE_LENGTH_OF'
'THE_SIZE_OF'
'THE_UPPERCASE_OF'
'THE_LOWERCASE_OF'
'THE_ABSOLUTE_VALUE_OF'
'THE_SQUARE_ROOT_OF'
'THE_CEILING_OF'
'THE_FLOOR_OF'
'THE_ROUND_OF'
```

---

## Implementation

### Step 1: Add Natural Language Function Table to Tokenizer

**File:** `/services/evaluationEngine/parsers/Tokenizer.ts`

```typescript
/**
 * Natural Language Function Patterns
 * 
 * Pattern: "the [FUNCTION] of [arguments]"
 * 
 * Sorted by word count (longest first) for greedy matching
 */
const NATURAL_LANGUAGE_FUNCTIONS: Array<{ pattern: string; token: TokenType; wordCount: number }> = [
  // 5 words
  { pattern: 'the absolute value of', token: 'THE_ABSOLUTE_VALUE_OF', wordCount: 5 },
  { pattern: 'the square root of', token: 'THE_SQUARE_ROOT_OF', wordCount: 5 },
  { pattern: 'the first element of', token: 'THE_FIRST_ELEMENT_OF', wordCount: 5 },
  { pattern: 'the last element of', token: 'THE_LAST_ELEMENT_OF', wordCount: 5 },
  
  // 4 words
  { pattern: 'the ceiling of', token: 'THE_CEILING_OF', wordCount: 4 },
  { pattern: 'the uppercase of', token: 'THE_UPPERCASE_OF', wordCount: 4 },
  { pattern: 'the lowercase of', token: 'THE_LOWERCASE_OF', wordCount: 4 },
  
  // 3 words
  { pattern: 'the sum of', token: 'THE_SUM_OF', wordCount: 3 },
  { pattern: 'the average of', token: 'THE_AVERAGE_OF', wordCount: 3 },
  { pattern: 'the count of', token: 'THE_COUNT_OF', wordCount: 3 },
  { pattern: 'the maximum of', token: 'THE_MAXIMUM_OF', wordCount: 3 },
  { pattern: 'the minimum of', token: 'THE_MINIMUM_OF', wordCount: 3 },
  { pattern: 'the total of', token: 'THE_TOTAL_OF', wordCount: 3 },
  { pattern: 'the length of', token: 'THE_LENGTH_OF', wordCount: 3 },
  { pattern: 'the size of', token: 'THE_SIZE_OF', wordCount: 3 },
  { pattern: 'the first of', token: 'THE_FIRST_OF', wordCount: 3 },
  { pattern: 'the last of', token: 'THE_LAST_OF', wordCount: 3 },
  { pattern: 'the floor of', token: 'THE_FLOOR_OF', wordCount: 3 },
  { pattern: 'the round of', token: 'THE_ROUND_OF', wordCount: 3 },
];
```

**Update `readIdentifierOrKeyword`:**
```typescript
private readIdentifierOrKeyword(line: number, column: number): Token {
  const start = this.current;
  
  // Try matching natural language operators first (Phase 5.1)
  const nlOperator = this.tryMatchNaturalLanguageOperator(line, column);
  if (nlOperator) {
    return nlOperator;
  }
  
  // Try matching natural language functions (Phase 5.2.1)
  const nlFunction = this.tryMatchNaturalLanguageFunction(line, column);
  if (nlFunction) {
    return nlFunction;
  }
  
  // ... rest of existing logic
}

/**
 * Try to match natural language function pattern
 * Similar to tryMatchNaturalLanguageOperator but for functions
 */
private tryMatchNaturalLanguageFunction(line: number, column: number): Token | null {
  // Extract words ahead for matching
  const words = this.extractWordsAhead(6); // Up to 6 words for lookahead
  
  // Try matching from longest to shortest
  for (const { pattern, token, wordCount } of NATURAL_LANGUAGE_FUNCTIONS) {
    const candidatePhrase = words.slice(0, wordCount).join(' ').toLowerCase();
    
    if (candidatePhrase === pattern) {
      // Match found! Consume the words
      const startPos = this.current;
      
      for (let i = 0; i < wordCount; i++) {
        // Consume word
        while (!this.isAtEnd() && this.isAlphaNumeric(this.peek())) {
          this.advance();
        }
        
        // Consume space after word (except last word)
        if (i < wordCount - 1) {
          while (!this.isAtEnd() && this.peek() === ' ') {
            this.advance();
          }
        }
      }
      
      return {
        type: token,
        value: pattern,
        line,
        column
      };
    }
  }
  
  return null;
}
```

### Step 2: Add Parser Support for Natural Language Functions

**File:** `/services/evaluationEngine/parsers/FormulaParser.ts`

**Update `primary()` to check for natural language functions:**
```typescript
private primary(): Expression {
  const token = this.peek();
  
  // ... existing checks (numbers, strings, etc.)
  
  // PHASE 5.2.1: Natural language functions
  if (this.isNaturalLanguageFunction()) {
    return this.naturalLanguageFunction();
  }
  
  // ... rest of primary logic
}

/**
 * Check if current token is a natural language function
 */
private isNaturalLanguageFunction(): boolean {
  const type = this.peek().type;
  return (
    type === 'THE_SUM_OF' ||
    type === 'THE_AVERAGE_OF' ||
    type === 'THE_COUNT_OF' ||
    type === 'THE_MAXIMUM_OF' ||
    type === 'THE_MINIMUM_OF' ||
    type === 'THE_TOTAL_OF' ||
    type === 'THE_FIRST_ELEMENT_OF' ||
    type === 'THE_LAST_ELEMENT_OF' ||
    type === 'THE_FIRST_OF' ||
    type === 'THE_LAST_OF' ||
    type === 'THE_LENGTH_OF' ||
    type === 'THE_SIZE_OF' ||
    type === 'THE_UPPERCASE_OF' ||
    type === 'THE_LOWERCASE_OF' ||
    type === 'THE_ABSOLUTE_VALUE_OF' ||
    type === 'THE_SQUARE_ROOT_OF' ||
    type === 'THE_CEILING_OF' ||
    type === 'THE_FLOOR_OF' ||
    type === 'THE_ROUND_OF'
  );
}

/**
 * Parse natural language function call
 * 
 * Pattern: "the [FUNCTION] of [arguments]"
 * 
 * Examples:
 * - the sum of 'x', 'y', 'z'
 * - the average of 'prices'
 * - the count of 'items'
 * - the maximum of 'a', 'b', and 'c'
 */
private naturalLanguageFunction(): FunctionCall {
  const funcToken = this.advance(); // consume function token
  
  // Map token type to function name
  const functionName = this.nlFunctionTokenToName(funcToken.type);
  
  // Parse arguments
  // Arguments can be:
  // 1. Single expression: the count of 'items'
  // 2. Comma-separated: the sum of 'x', 'y', 'z'
  // 3. With "and": the sum of 'x', 'y', and 'z'
  // 4. Just "and": the sum of 'x' and 'y'
  
  const args: Expression[] = [];
  
  // Parse first argument
  args.push(this.expression());
  
  // Parse additional arguments
  while (this.match('COMMA') || this.match('AND')) {
    args.push(this.expression());
  }
  
  return {
    type: 'FunctionCall',
    name: functionName,
    args,
    location: this.createLocation(funcToken)
  };
}

/**
 * Map natural language function token to function name
 */
private nlFunctionTokenToName(type: TokenType): string {
  switch (type) {
    // Aggregate functions
    case 'THE_SUM_OF': return 'SUM';
    case 'THE_TOTAL_OF': return 'SUM';
    case 'THE_AVERAGE_OF': return 'AVERAGE';
    case 'THE_COUNT_OF': return 'COUNT';
    case 'THE_MAXIMUM_OF': return 'MAX';
    case 'THE_MINIMUM_OF': return 'MIN';
    
    // Array functions
    case 'THE_FIRST_ELEMENT_OF': return 'FIRST';
    case 'THE_FIRST_OF': return 'FIRST';
    case 'THE_LAST_ELEMENT_OF': return 'LAST';
    case 'THE_LAST_OF': return 'LAST';
    case 'THE_LENGTH_OF': return 'LENGTH';
    case 'THE_SIZE_OF': return 'LENGTH';
    
    // String functions
    case 'THE_UPPERCASE_OF': return 'UPPER';
    case 'THE_LOWERCASE_OF': return 'LOWER';
    
    // Math functions
    case 'THE_ABSOLUTE_VALUE_OF': return 'ABS';
    case 'THE_SQUARE_ROOT_OF': return 'SQRT';
    case 'THE_CEILING_OF': return 'CEIL';
    case 'THE_FLOOR_OF': return 'FLOOR';
    case 'THE_ROUND_OF': return 'ROUND';
    
    default:
      throw new Error(`Unknown natural language function: ${type}`);
  }
}
```

---

## Examples After Implementation

### Aggregate Functions
```typescript
// Sum
'total' = the sum of 'x', 'y', 'z'
'total' = the sum of 'x', 'y', and 'z'  // With "and"
'total' = the sum of 'x' and 'y'        // Just "and"

// Average
'avg' = the average of 'prices'
IF the average of 'scores' is greater than 80 THEN ...

// Count
'num items' = the count of 'items'

// Max/Min
'highest' = the maximum of 'a', 'b', 'c'
'lowest' = the minimum of 'a', 'b', 'c'
```

### Array Functions
```typescript
'first item' = the first element of 'list'
'last item' = the last element of 'list'
'num items' = the length of 'list'
```

### String Functions
```typescript
'upper name' = the uppercase of 'name'
'lower name' = the lowercase of 'name'
'name length' = the length of 'name'
```

### Math Functions
```typescript
'abs value' = the absolute value of 'x'
'sqrt value' = the square root of 'x'
'ceiling value' = the ceiling of 'x'
```

### Complex Example
```typescript
// User's example!
IF the sum of 'x', 'y', and 'z' is less than 'a' THEN
  'result' = "Sum is too small"
ELSE
  'result' = "Sum is acceptable"
END

// More complex
'average price' = the average of 'prices'
IF 'average price' is greater than 100 AND the count of 'items' is less than 10 THEN
  'discount' = the sum of 'base discount' and 'bonus discount'
END
```

---

## Testing

### Unit Tests Needed

```typescript
describe('Natural Language Functions', () => {
  test('the sum of with commas', () => {
    const result = evaluate("the sum of 1, 2, 3");
    expect(result).toBe(6);
  });
  
  test('the sum of with and', () => {
    const result = evaluate("the sum of 1, 2, and 3");
    expect(result).toBe(6);
  });
  
  test('the average of', () => {
    const result = evaluate("the average of 10, 20, 30");
    expect(result).toBe(20);
  });
  
  test('the count of', () => {
    const result = evaluate("the count of [1, 2, 3, 4, 5]");
    expect(result).toBe(5);
  });
  
  test('the maximum of', () => {
    const result = evaluate("the maximum of 5, 10, 3");
    expect(result).toBe(10);
  });
  
  test('in comparison', () => {
    const result = evaluate("the sum of 1, 2, 3 is less than 10");
    expect(result).toBe(true);
  });
});
```

---

## Summary

**What We're Adding:**
- 19 new token types for natural language functions
- `tryMatchNaturalLanguageFunction()` in tokenizer
- `naturalLanguageFunction()` in parser
- Support for comma-separated and "and"-separated arguments

**Benefits:**
- True BAL-style natural language syntax
- More readable formulas
- Answers user's specific request!

**Next:** Implement in code!
