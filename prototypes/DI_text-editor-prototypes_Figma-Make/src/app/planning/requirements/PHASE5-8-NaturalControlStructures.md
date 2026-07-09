# Phase 5.8: Natural Language Control Structures

**Status:** PLANNED  
**Priority:** HIGH  
**Dependencies:** Phase 5.1-5.7 (Natural Language Operators & Functions)  
**Estimated Complexity:** LARGE  

---

## Overview

Extend the natural language syntax to support **conversational control structures** that read like actual English sentences. Emphasis on natural flow with commas and conjunctions rather than rigid block structures with END keywords.

### Core Principle
> "Write formulas like you would explain them to a colleague"

---

## Current State (Before Phase 5.8)

**Rigid Block Syntax:**
```typescript
IF 'error message' is empty THEN
  'has error' = FALSE
ELSE
  'has error' = TRUE
END
```

**Problems:**
- Requires explicit END keyword
- Assignment uses `=` operator (mathematical, not conversational)
- Feels like programming code, not natural language

---

## Target State (After Phase 5.8)

**Natural Flow Syntax:**
```typescript
if the 'error message' is empty, then set 'has error' to false, otherwise set 'has error' to true
```

**Benefits:**
- Reads like a sentence
- No END keyword needed
- Commas separate clauses naturally
- "set X to Y" is conversational
- "otherwise" is more natural than ELSE

---

## Phase 5.8.1: Natural Assignment Syntax

### Requirements

**Support "set X to Y" assignment:**
```typescript
// Current syntax
'customer status' = "active"
$total = 100

// New natural syntax
set 'customer status' to "active"
set $total to 100
```

**Support "X is set to Y" assignment:**
```typescript
'customer status' is set to "active"
$total is set to 100
```

**Maintain backward compatibility:**
- `X = Y` syntax still works
- `set X to Y` is an alternative, not replacement

### Implementation Notes

**Tokenizer:** ✅ COMPLETE
- `SET` token defined
- `TO` token defined
- `IS_SET_TO` pattern recognized (3-word operator)

**Parser:** ⏳ TODO
- Detect `SET <lvalue> TO <expression>` pattern
- Generate Assignment AST node
- Support both variable and verbalization targets

**Evaluation:** ✅ NO CHANGES NEEDED
- Assignment node already exists
- Just needs new parser path to create it

---

## Phase 5.8.2: Natural Conditional Flow

### Requirements

**Support "otherwise" as alternative to ELSE:**
```typescript
// Current
IF condition THEN
  action1
ELSE
  action2
END

// New
if condition, then
  action1
otherwise
  action2
```

**Make END keyword optional for simple conditionals:**
```typescript
// Single-line natural flow
if the 'age' is greater than 18, then set 'can vote' to true, otherwise set 'can vote' to false

// Multi-line still readable
if the 'age' is greater than 18, then
  set 'can vote' to true
otherwise
  set 'can vote' to false
```

### Implementation Notes

**Tokenizer:** ✅ COMPLETE
- `OTHERWISE` token defined
- Mapped to `OTHERWISE` type (not aliased to ELSE)

**Parser:** ⏳ TODO
- Map `OTHERWISE` to same behavior as `ELSE` in AST
- Make `END` keyword optional
- Use natural separators (commas, semicolons, newlines) to detect clause boundaries
- Detect end of conditional by:
  - Next statement starts (another IF, variable assignment, etc.)
  - EOF reached
  - Explicit END keyword (for backward compatibility)

---

## Phase 5.8.3: Switch-Case Style Conditionals

### Requirements

**Support cascading if-then with otherwise:**
```typescript
// Traditional switch-style
if 'status' is "pending", then set 'color' to "yellow";
if 'status' is "approved", then set 'color' to "green";
if 'status' is "rejected", then set 'color' to "red";
otherwise set 'color' to "gray"
```

**Equivalent to:**
```typescript
IF 'status' = "pending" THEN
  'color' = "yellow"
ELSEIF 'status' = "approved" THEN
  'color' = "green"
ELSEIF 'status' = "rejected" THEN
  'color' = "red"
ELSE
  'color' = "gray"
END
```

**Key Insight:**
- Multiple independent IF statements with final OTHERWISE
- OTHERWISE applies to "none of the above conditions"
- Semicolons separate independent conditional statements
- This is MORE natural than traditional ELSEIF chains

### Implementation Notes

**Parser:** ⏳ TODO
- Track sequential IF statements at same indentation level
- Final OTHERWISE applies to entire sequence
- Generate proper conditional chain AST
- Semicolons act as statement separators

---

## Phase 5.8.4: Natural Loop Syntax

### Requirements

**Natural FOR loops:**
```typescript
// Current
FOR $item IN 'items' DO
  // process item
END

// New
for each 'item' in 'items',
  // process item
```

**Natural WHILE loops:**
```typescript
// Current
WHILE 'count' < 10 DO
  'count' = 'count' + 1
END

// New
while 'count' is less than 10,
  set 'count' to 'count' plus 1
```

### Implementation Notes

**Tokenizer:** ⏳ TODO
- Add `EACH` token for "for each"

**Parser:** ⏳ TODO
- Support "for each X in Y" pattern
- Make DO and END optional
- Use natural clause separators

---

## Phase 5.8.5: Articles and Determiners

### Requirements

**Support "the" prefix for variables:**
```typescript
// Without articles
if 'error message' is empty, then...

// With articles (more natural)
if the 'error message' is empty, then...
```

**Optional "a" and "an" for clarity:**
```typescript
set a 'default value' to 100
set an 'error flag' to false
```

### Implementation Notes

**Tokenizer:** ✅ COMPLETE
- `THE`, `A`, `AN` tokens defined

**Parser:** ⏳ TODO
- Strip articles during parsing (they're optional)
- Don't affect semantics, just readability
- Validation: articles before variables/verbalizations only

---

## Phase 5.8.6: Comma-Separated Actions

### Requirements

**Support comma-separated actions in THEN/ELSE clauses:**
```typescript
if the 'age' is greater than 18, then
  set 'can vote' to true,
  set 'voting age reached' to true,
  set 'status' to "eligible"
```

**Equivalent to:**
```typescript
IF 'age' > 18 THEN
  'can vote' = TRUE
  'voting age reached' = TRUE
  'status' = "eligible"
END
```

### Implementation Notes

**Parser:** ⏳ TODO
- Commas act as statement separators within clauses
- Newlines also act as separators (flexible)
- End of clause detected by OTHERWISE/ELSE keyword or new statement

---

## Implementation Roadmap

### Priority 1: Foundation (Phase 5.8.1 + 5.8.2)
1. ✅ Tokenizer updates (OTHERWISE, SET, TO, articles)
2. ⏳ Parser: "set X to Y" assignment
3. ⏳ Parser: OTHERWISE as synonym for ELSE
4. ⏳ Parser: Optional END for simple conditionals
5. ⏳ Update samples to demonstrate new syntax
6. ⏳ Test suite for natural assignment and conditionals

### Priority 2: Advanced Control Flow (Phase 5.8.3 + 5.8.4)
7. ⏳ Parser: Switch-case style (sequential IF + OTHERWISE)
8. ⏳ Parser: Natural loop syntax ("for each", "while")
9. ⏳ Update samples with loop examples
10. ⏳ Test suite for advanced control structures

### Priority 3: Polish (Phase 5.8.5 + 5.8.6)
11. ⏳ Parser: Article stripping (the, a, an)
12. ⏳ Parser: Comma-separated actions
13. ⏳ Complete sample library with all patterns
14. ⏳ Comprehensive test suite

---

## Example Transformations

### Simple Conditional
**Before:**
```typescript
IF 'age' >= 18 THEN
  'can vote' = TRUE
ELSE
  'can vote' = FALSE
END
```

**After:**
```typescript
if the 'age' is greater than or equal to 18, then set 'can vote' to true, otherwise set 'can vote' to false
```

### Multi-Line Conditional
**Before:**
```typescript
IF 'error message' is empty THEN
  'has error' = FALSE
  'status' = "success"
ELSE
  'has error' = TRUE
  'status' = "error"
END
```

**After:**
```typescript
if the 'error message' is empty, then
  set 'has error' to false,
  set 'status' to "success"
otherwise
  set 'has error' to true,
  set 'status' to "error"
```

### Switch-Case Style
**Before:**
```typescript
IF 'status' = "pending" THEN
  'color' = "yellow"
ELSEIF 'status' = "approved" THEN
  'color' = "green"
ELSEIF 'status' = "rejected" THEN
  'color' = "red"
ELSE
  'color' = "gray"
END
```

**After:**
```typescript
if 'status' is "pending", then set 'color' to "yellow";
if 'status' is "approved", then set 'color' to "green";
if 'status' is "rejected", then set 'color' to "red";
otherwise set 'color' to "gray"
```

### Loop
**Before:**
```typescript
FOR $item IN 'items' DO
  'total' = 'total' + $item
END
```

**After:**
```typescript
for each 'item' in 'items',
  set 'total' to 'total' plus the 'item'
```

### Complex Example
**Before:**
```typescript
'discount' = 0
IF 'is member' = TRUE THEN
  IF 'purchase amount' >= 100 THEN
    'discount' = 0.2
  ELSE
    'discount' = 0.1
  END
END
'final price' = 'original price' * (1 - 'discount')
```

**After:**
```typescript
set 'discount' to 0

if the 'is member' is true, then
  if the 'purchase amount' is greater than or equal to 100,
    then set 'discount' to 0.2
    otherwise set 'discount' to 0.1

set 'final price' to the 'original price' times (1 minus the 'discount')
```

---

## Success Criteria

### Phase 5.8 Complete When:
- ✅ All 56 natural language operators/functions from Phase 5.1-5.7 work seamlessly with new control structures
- ⏳ "set X to Y" assignment syntax works in all contexts
- ⏳ "otherwise" works as drop-in replacement for ELSE
- ⏳ END keyword is optional for simple conditionals
- ⏳ Switch-case style (sequential IF + OTHERWISE) works
- ⏳ Natural loop syntax ("for each", "while") works
- ⏳ Articles (the, a, an) are properly stripped
- ⏳ Comma-separated actions work in clauses
- ⏳ All samples updated to showcase natural syntax
- ⏳ Comprehensive test suite passes (50+ test cases)
- ⏳ Documentation updated with all patterns

### User Experience Goal:
> "Users can write formulas that read like natural English explanations, not programming code"

---

## Testing Strategy

### Unit Tests (Parser)
- Parse "set X to Y" assignment
- Parse "X is set to Y" assignment
- Parse IF...OTHERWISE without END
- Parse sequential IF + OTHERWISE (switch style)
- Parse "for each X in Y" loops
- Parse "while X" loops
- Strip articles correctly
- Comma-separated actions

### Integration Tests (Evaluation)
- Evaluate natural assignment syntax
- Evaluate OTHERWISE conditionals
- Evaluate switch-case style conditions
- Evaluate natural loops
- Complex nested structures

### Sample Tests
- All 6 comprehensive samples from Phase 5.6
- New samples demonstrating Phase 5.8 features
- Edge cases (nested, complex)

---

## Migration Path

### Backward Compatibility
**100% backward compatible:**
- All existing syntax continues to work
- `X = Y` still works alongside "set X to Y"
- ELSE still works alongside "otherwise"
- END keyword still supported (just optional)

**Users can mix styles:**
```typescript
// Mix old and new
IF 'condition' THEN
  set 'x' to 100  // new style assignment
ELSE
  'x' = 200       // old style assignment
END
```

### Recommended Migration
1. Start using "otherwise" instead of ELSE (easiest)
2. Start using "set X to Y" for assignments (more readable)
3. Gradually remove END keywords for simple conditionals
4. Adopt switch-case style where appropriate
5. Use natural loop syntax for new loops

---

## Related Documentation

- **Phase 5.1:** Natural Language Operators
- **Phase 5.2:** Natural Language Functions
- **Phase 5.3-5.5:** Syntax Highlighting, Autocomplete, Evaluation
- **Phase 5.6:** Formula Samples
- **Phase 5.7:** Testing Plan
- **Guidelines v2.1:** Section on Natural Language Syntax (to be added)

---

## Notes

**Why This Matters:**
- BAL (Business Action Language) emphasizes natural language
- Users are business analysts, not programmers
- Natural syntax reduces cognitive load
- Easier to review and validate logic
- Aligns with IBM ADS/ODM philosophy

**Design Philosophy:**
- **Readability over brevity** - "set X to Y" is longer but clearer
- **Natural over rigid** - commas and flow vs. keywords and blocks
- **Flexible over strict** - support multiple styles for same concept
- **Familiar over novel** - reads like explaining to a colleague

**Future Considerations:**
- Could extend to natural language error handling ("if error, then...")
- Could support question syntax ("is 'x' greater than 10?")
- Could support named clauses ("when approved: set status to 'active'")
