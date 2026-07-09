# Phase 5.7: Comprehensive Testing Guide

**Created:** 2025-11-07  
**Purpose:** Test all Natural Language Operators and Functions end-to-end

---

## Testing Overview

This document provides a comprehensive testing plan for Phase 5 (Natural Language Operators & Functions). Each test should verify that the feature works from **typing → highlighting → autocomplete → parsing → evaluation**.

---

## Test Categories

### 1. ✅ Natural Language Comparison Operators

**Test NL-COMP-01: Basic Comparison**
```typescript
// Test Formula
'price' = 150
'min' = 100

IF 'price' is greater than 'min' THEN
  'result' = "Valid"
END
```
**Expected:**
- ✅ Tokenizer: "is greater than" recognized as single IS_GREATER_THAN token
- ✅ Parser: Converted to BinaryOp with > operator
- ✅ Syntax Highlighting: "is greater than" highlighted in italic operator color
- ✅ Autocomplete: Typing "is g" suggests "is greater than"
- ✅ Evaluation: Returns "Valid"

**Test NL-COMP-02: Less Than or Equal To**
```typescript
'score' = 75
'threshold' = 75

IF 'score' is less than or equal to 'threshold' THEN
  'result' = "Pass"
END
```
**Expected:**
- ✅ Tokenizer: "is less than or equal to" recognized as IS_LESS_THAN_OR_EQUAL_TO
- ✅ Parser: Converted to BinaryOp with <= operator
- ✅ Syntax Highlighting: "is less than or equal to" highlighted in italic
- ✅ Autocomplete: Typing "is less" suggests both "is less than" and "is less than or equal to"
- ✅ Evaluation: Returns "Pass"

**Test NL-COMP-03: Equality Check**
```typescript
'status' = "Active"

IF 'status' is equal to "Active" THEN
  'result' = TRUE
END
```
**Expected:**
- ✅ Tokenizer: "is equal to" recognized as IS_EQUAL_TO
- ✅ Parser: Converted to BinaryOp with == operator
- ✅ Autocomplete: Typing "is eq" suggests "is equal to"
- ✅ Evaluation: Returns TRUE

**Test NL-COMP-04: Not Equal**
```typescript
'tier' = "Gold"

IF 'tier' is not equal to "Silver" THEN
  'result' = "Different tier"
END
```
**Expected:**
- ✅ Evaluation: Returns "Different tier"

---

### 2. ✅ Natural Language Arithmetic Operators

**Test NL-ARITH-01: Multiplication**
```typescript
'base' = 100
'quantity' = 5

'total' = 'base' times 'quantity'
```
**Expected:**
- ✅ Tokenizer: "times" recognized as TIMES_NL
- ✅ Parser: Converted to BinaryOp with * operator
- ✅ Syntax Highlighting: "times" highlighted in italic
- ✅ Autocomplete: Typing "ti" suggests "times"
- ✅ Evaluation: Returns 500

**Test NL-ARITH-02: Division**
```typescript
'total' = 100
'count' = 4

'average' = 'total' divided by 'count'
```
**Expected:**
- ✅ Tokenizer: "divided by" recognized as DIVIDED_BY
- ✅ Parser: Converted to BinaryOp with / operator
- ✅ Evaluation: Returns 25

**Test NL-ARITH-03: Power Operators**
```typescript
'side' = 4
'area' = 'side' squared

'cube side' = 3
'volume' = 'cube side' cubed

'base' = 2
'exp' = 8
'result' = 'base' to the power of 'exp'
```
**Expected:**
- ✅ "squared" evaluates to 16
- ✅ "cubed" evaluates to 27
- ✅ "to the power of" evaluates to 256

**Test NL-ARITH-04: Mixed Symbolic and NL**
```typescript
'a' = 10
'b' = 5

'result' = 'a' times 'b' + 'a' divided by 'b'
```
**Expected:**
- ✅ Correct precedence: (10 * 5) + (10 / 5) = 52
- ✅ Both symbolic (+) and NL (times, divided by) work together

---

### 3. ✅ Natural Language Aggregate Functions

**Test NL-AGG-01: Sum**
```typescript
'prices' = [10, 20, 30, 40]
'total' = the sum of 'prices'
```
**Expected:**
- ✅ Tokenizer: "the sum of" recognized as THE_SUM_OF
- ✅ Parser: Converted to FunctionCall with name "SUM"
- ✅ Syntax Highlighting: "the sum of" highlighted in italic function color
- ✅ Autocomplete: Typing "the s" suggests "the sum of"
- ✅ Evaluation: Returns 100

**Test NL-AGG-02: Average**
```typescript
'scores' = [85, 90, 78, 92]
'avg' = the average of 'scores'
```
**Expected:**
- ✅ Evaluation: Returns 86.25

**Test NL-AGG-03: Maximum and Minimum**
```typescript
'values' = [15, 42, 8, 33, 21]
'max val' = the maximum of 'values'
'min val' = the minimum of 'values'
```
**Expected:**
- ✅ 'max val' = 42
- ✅ 'min val' = 8

**Test NL-AGG-04: Count**
```typescript
'items' = ["A", "B", "C", "D", "E"]
'count' = the count of 'items'
```
**Expected:**
- ✅ Evaluation: Returns 5

**Test NL-AGG-05: Multiple Arguments**
```typescript
'total' = the sum of 10, 20, 30, 40, 50
```
**Expected:**
- ✅ Parser handles comma-separated arguments
- ✅ Evaluation: Returns 150

**Test NL-AGG-06: "And" Separator**
```typescript
'total' = the sum of 'a', 'b', and 'c'
```
**Expected:**
- ✅ Parser handles "and" as argument separator
- ✅ Works alongside commas

---

### 4. ✅ Natural Language Array Functions

**Test NL-ARR-01: First Element**
```typescript
'items' = ["Apple", "Banana", "Cherry"]
'first' = the first element of 'items'
```
**Expected:**
- ✅ Tokenizer: "the first element of" recognized as THE_FIRST_ELEMENT_OF
- ✅ Parser: Converted to FunctionCall with name "FIRST"
- ✅ Evaluation: Returns "Apple"

**Test NL-ARR-02: Last Element**
```typescript
'items' = ["Apple", "Banana", "Cherry"]
'last' = the last of 'items'
```
**Expected:**
- ✅ "the last of" is shorter alternative syntax
- ✅ Evaluation: Returns "Cherry"

**Test NL-ARR-03: Length**
```typescript
'data' = [1, 2, 3, 4, 5]
'length' = the length of 'data'
'size' = the size of 'data'
```
**Expected:**
- ✅ Both "length" and "size" work
- ✅ Both evaluate to 5

---

### 5. ✅ Natural Language String Functions

**Test NL-STR-01: Uppercase**
```typescript
'text' = "hello world"
'upper' = the uppercase of 'text'
```
**Expected:**
- ✅ Evaluation: Returns "HELLO WORLD"

**Test NL-STR-02: Lowercase**
```typescript
'text' = "HELLO WORLD"
'lower' = the lowercase of 'text'
```
**Expected:**
- ✅ Evaluation: Returns "hello world"

---

### 6. ✅ Natural Language Math Functions

**Test NL-MATH-01: Absolute Value**
```typescript
'negative' = -42
'positive' = the absolute value of 'negative'
```
**Expected:**
- ✅ Evaluation: Returns 42

**Test NL-MATH-02: Square Root**
```typescript
'value' = 144
'sqrt' = the square root of 'value'
```
**Expected:**
- ✅ Evaluation: Returns 12

**Test NL-MATH-03: Ceiling and Floor**
```typescript
'value' = 7.3
'ceil' = the ceiling of 'value'
'floor' = the floor of 'value'
```
**Expected:**
- ✅ 'ceil' = 8
- ✅ 'floor' = 7

**Test NL-MATH-04: Round**
```typescript
'value' = 7.6
'rounded' = the round of 'value'
```
**Expected:**
- ✅ Evaluation: Returns 8

---

### 7. ✅ Natural Language Predicates

**Test NL-PRED-01: Is Null**
```typescript
'value' = NULL

IF 'value' is null THEN
  'result' = "Value is null"
END
```
**Expected:**
- ✅ Tokenizer: "is null" recognized as IS_NULL
- ✅ Parser: Converted to FunctionCall with name "IS_NULL"
- ✅ Syntax Highlighting: "is null" highlighted in italic
- ✅ Autocomplete: Typing "is n" suggests "is null" and "is not null"
- ✅ Evaluation: Returns "Value is null"

**Test NL-PRED-02: Is Not Null**
```typescript
'value' = 42

IF 'value' is not null THEN
  'result' = "Has value"
END
```
**Expected:**
- ✅ Evaluation: Returns "Has value"

**Test NL-PRED-03: Is Empty (String)**
```typescript
'text' = ""

IF 'text' is empty THEN
  'result' = "Empty string"
END
```
**Expected:**
- ✅ Evaluation: Returns "Empty string"

**Test NL-PRED-04: Is Empty (Array)**
```typescript
'list' = []

IF 'list' is empty THEN
  'result' = "Empty array"
END
```
**Expected:**
- ✅ Evaluation: Returns "Empty array"

**Test NL-PRED-05: Is Not Empty**
```typescript
'data' = [1, 2, 3]

IF 'data' is not empty THEN
  'result' = "Has data"
END
```
**Expected:**
- ✅ Evaluation: Returns "Has data"

**Test NL-PRED-06: Starts With**
```typescript
'email' = "admin@example.com"

IF 'email' starts with "admin@" THEN
  'user type' = "Administrator"
END
```
**Expected:**
- ✅ Tokenizer: "starts with" recognized as STARTS_WITH
- ✅ Parser: Converted to FunctionCall
- ✅ Evaluation: Returns "Administrator"

**Test NL-PRED-07: Ends With**
```typescript
'filename' = "report.pdf"

IF 'filename' ends with ".pdf" THEN
  'file type' = "PDF"
END
```
**Expected:**
- ✅ Evaluation: Returns "PDF"

**Test NL-PRED-08: Contains (String)**
```typescript
'message' = "Error: timeout occurred"

IF 'message' contains "timeout" THEN
  'should retry' = TRUE
END
```
**Expected:**
- ✅ Evaluation: Returns TRUE

**Test NL-PRED-09: Contains (Array)**
```typescript
'codes' = ["ADMIN", "USER", "GUEST"]

IF 'codes' contains "ADMIN" THEN
  'has admin' = TRUE
END
```
**Expected:**
- ✅ CONTAINS function works with both strings and arrays
- ✅ Evaluation: Returns TRUE

---

### 8. ✅ Complex Integration Tests

**Test NL-INT-01: Original User Request**
```typescript
'x' = 10
'y' = 20
'z' = 30
'a' = 100

IF the sum of 'x', 'y', and 'z' is less than 'a' THEN
  'result' = "Sum is less"
ELSE
  'result' = "Sum is greater or equal"
END
```
**Expected:**
- ✅ "the sum of" with "and" separator works
- ✅ "is less than" comparison works
- ✅ Evaluation: Returns "Sum is less" (60 < 100)

**Test NL-INT-02: Mixed Operators and Functions**
```typescript
'prices' = [100, 200, 300]
'discount rate' = 0.1

'total' = the sum of 'prices'
'discount' = 'total' multiplied by 'discount rate'
'final' = 'total' minus 'discount'

IF 'final' is greater than or equal to 500 THEN
  'tier' = "Premium"
ELSE
  'tier' = "Standard"
END
```
**Expected:**
- ✅ Multiple NL functions and operators work together
- ✅ Evaluation: 'final' = 540, 'tier' = "Premium"

**Test NL-INT-03: Nested Natural Language**
```typescript
'values' = [5, 10, 15, 20]
'threshold' = 15

'max value' = the maximum of 'values'

IF 'max value' is greater than 'threshold' THEN
  'first value' = the first of 'values'
  'result' = 'first value' times 2
END
```
**Expected:**
- ✅ Nested NL functions work
- ✅ Evaluation: 'result' = 10

**Test NL-INT-04: Comprehensive Real-World Example**
```typescript
// Load the "Comprehensive Natural Language Example" sample
// (nl-comprehensive-example from formulaSamples.ts)
```
**Expected:**
- ✅ All features work together:
  - Comparisons: "is equal to", "is less than", "is not empty"
  - Arithmetic: "multiplied by", "minus"
  - Functions: "the sum of", "the maximum of", "the length of", "the first of", "the last of"
  - Predicates: "starts with", "contains"
- ✅ Complex business logic evaluates correctly

---

## Testing Checklist

### ✅ Tokenizer Tests
- [ ] All NL operators recognized as single tokens
- [ ] Greedy matching works (longest pattern first)
- [ ] No conflicts with keywords or identifiers
- [ ] Lookahead doesn't consume characters incorrectly

### ✅ Parser Tests
- [ ] NL comparison operators converted to correct BinaryOp operators
- [ ] NL arithmetic operators converted to correct BinaryOp operators
- [ ] NL functions converted to FunctionCall with correct names
- [ ] NL predicates converted to FunctionCall
- [ ] Correct operator precedence maintained
- [ ] "and" separator works in function arguments

### ✅ Syntax Highlighting Tests
- [ ] NL operators highlighted in italic operator color
- [ ] NL functions highlighted in italic function color
- [ ] Multi-word patterns highlighted as single units
- [ ] No highlighting conflicts with keywords

### ✅ Autocomplete Tests
- [ ] Typing "is g" suggests "is greater than"
- [ ] Typing "the s" suggests "the sum of", "the square root of", etc.
- [ ] Typing "multi" suggests "multiplied by"
- [ ] Category labels show correctly (NL Operator, NL Function)
- [ ] Descriptions show symbolic equivalents

### ✅ Evaluation Tests
- [ ] All NL comparison operators evaluate correctly
- [ ] All NL arithmetic operators evaluate correctly
- [ ] All NL aggregate functions evaluate correctly
- [ ] All NL array functions evaluate correctly
- [ ] All NL string functions evaluate correctly
- [ ] All NL math functions evaluate correctly
- [ ] All NL predicates evaluate correctly
- [ ] IS_NULL handles null and undefined
- [ ] IS_EMPTY handles strings, arrays, objects
- [ ] CONTAINS works with both strings and arrays

### ✅ UI/UX Tests
- [ ] Load natural language samples from dropdown
- [ ] Autocomplete popup appears correctly
- [ ] Ghost text appears for selected autocomplete item
- [ ] Syntax highlighting renders in real-time
- [ ] Evaluation results display correctly
- [ ] No performance issues with long formulas

---

## Manual Testing Procedure

### Step 1: Load Samples
1. Open Formula Editor
2. Open sample dropdown
3. Verify all 6 new NL samples appear in "Verbalizations" category
4. Load each sample and verify it displays correctly

### Step 2: Tokenization Visual Check
1. Type each NL operator manually
2. Verify it highlights as italic immediately
3. Verify multi-word operators highlight as single unit

### Step 3: Autocomplete Check
1. Type partial words and verify suggestions appear:
   - "is g" → "is greater than", "is greater than or equal to"
   - "the s" → "the sum of", "the square root of", "the size of"
   - "multi" → "multiplied by"
   - "start" → "starts with"
2. Verify category labels appear
3. Verify descriptions show symbolic equivalents

### Step 4: Evaluation Check
1. Load each NL sample
2. Click "Run Formula" (or equivalent)
3. Verify evaluation completes without errors
4. Verify results match expected values

### Step 5: Error Handling
1. Try invalid syntax like "is greater" (incomplete operator)
2. Verify clear error messages
3. Try "the sum of" without arguments
4. Verify validation catches it

### Step 6: Edge Cases
1. Mix symbolic and NL syntax in same formula
2. Nest NL functions inside NL functions
3. Use NL operators in complex boolean expressions
4. Verify all work correctly

---

## Automated Testing (Future)

### Unit Tests Needed
```typescript
// Tokenizer tests
describe('Natural Language Tokenizer', () => {
  test('tokenizes "is greater than" as single token', () => {});
  test('greedy matching: "is less than or equal to" before "is less than"', () => {});
  test('tokenizes "the sum of" as single token', () => {});
});

// Parser tests
describe('Natural Language Parser', () => {
  test('parses "is greater than" to BinaryOp with > operator', () => {});
  test('parses "the sum of x, y, and z" to FunctionCall', () => {});
  test('handles "and" separator in function arguments', () => {});
});

// Evaluation tests
describe('Natural Language Evaluation', () => {
  test('IS_NULL returns true for null', () => {});
  test('IS_EMPTY handles strings, arrays, objects', () => {});
  test('STARTS_WITH works correctly', () => {});
  test('CONTAINS works with both strings and arrays', () => {});
});
```

---

## Success Criteria

**Phase 5.7 is COMPLETE when:**
- ✅ All 6 new samples load and run without errors
- ✅ All NL operators tokenize, parse, highlight, and evaluate correctly
- ✅ All NL functions tokenize, parse, highlight, and evaluate correctly
- ✅ All NL predicates work correctly (null, empty, string checks)
- ✅ Autocomplete suggests all NL constructs appropriately
- ✅ Syntax highlighting distinguishes NL syntax with italic style
- ✅ Complex integration tests pass
- ✅ No regressions in existing symbolic syntax
- ✅ Performance is acceptable (no lag when typing)

---

## Known Limitations

1. **Textarea Line Wrapping:** Multi-line NL operators may wrap to column 0 (not to indentation level) - this is a fundamental textarea limitation
2. **Case Sensitivity:** NL operators are case-insensitive in tokenizer but autocomplete is case-sensitive
3. **Ambiguity:** Some phrases like "is" alone are ambiguous - context determines meaning

---

## Next Steps After Testing

1. Document any bugs found
2. Fix critical issues
3. Add automated unit tests
4. Consider BAL Editor migration to support NL syntax there too
5. User feedback and refinement
