# Phase 5.8: Natural Language Control Structures - Implementation Status

**Last Updated:** January 7, 2025

---

## Overview

Phase 5.8 extends the natural language formula syntax to support conversational control structures that read like actual English sentences. This includes "set X to Y" assignments, "otherwise" as an alternative to ELSE, and natural flow with commas instead of rigid block structures.

---

## Current Status: ✅ TOKENIZER COMPLETE | ⏳ PARSER PLANNED

### Completed ✅

#### Tokenizer Updates
- **OTHERWISE token** - Defined and ready
- **SET token** - Defined for "set X to Y" syntax
- **TO token** - Defined for assignment syntax
- **Articles** - THE, A, AN tokens defined
- **IS_SET_TO pattern** - Recognized as 3-word operator

**File:** `/services/evaluationEngine/parsers/Tokenizer.ts`

#### Sample Updates
- **BAL samples updated** - All ELSE → OTHERWISE in `/SampleData/balSamples.ts`
  - Loan approval sample
  - Employee holiday sample
  - Pricing discount sample
- **Vocabulary updated** - "otherwise" added to keywords list

**Files:**
- `/SampleData/balSamples.ts`

#### Documentation
- **Phase requirements** - Complete specification in `/planning/requirements/PHASE5-8-NaturalControlStructures.md`
- **Examples library** - 20 comprehensive examples in `/planning/requirements/PHASE5-8-Examples.md`
- **Planning index** - Updated with Phase 5.8 reference

**Files:**
- `/planning/requirements/PHASE5-8-NaturalControlStructures.md`
- `/planning/requirements/PHASE5-8-Examples.md`
- `/planning/README.md`

---

## Remaining Work ⏳

### Priority 1: Core Parser Support

#### 1. OTHERWISE as ELSE Synonym
**Location:** `/services/evaluationEngine/parsers/FormulaParser.ts`

**Current Code:**
```typescript
if (this.match('ELSE')) {
  elseBranch = this.parseStatementBlock();
}
```

**Required Change:**
```typescript
if (this.match('ELSE') || this.match('OTHERWISE')) {
  elseBranch = this.parseStatementBlock();
}
```

**Also update block terminator checks:**
```typescript
// In parseStatementBlock()
while (!this.isAtEnd() && 
       !this.check('ELSE') && 
       !this.check('OTHERWISE') &&  // Add this
       !this.check('ELSEIF') && 
       !this.check('END') &&
       !this.matchElseIf()) {
```

**Estimated Effort:** 30 minutes

---

#### 2. "set X to Y" Assignment Syntax
**Location:** `/services/evaluationEngine/parsers/FormulaParser.ts`

**Required:**
1. Detect `SET` token at statement start
2. Parse lvalue (variable or verbalization)
3. Consume `TO` token
4. Parse rvalue (expression)
5. Generate Assignment AST node

**Pseudo-code:**
```typescript
private parseSetAssignment(): AssignmentExpression {
  this.consume('SET', 'Expected SET');
  
  const lvalue = this.parseLValue(); // Variable or verbalization
  
  this.consume('TO', 'Expected TO after variable');
  
  const rvalue = this.expression();
  
  return {
    type: 'Assignment',
    target: lvalue,
    value: rvalue,
    location: this.createLocation(startToken)
  };
}
```

**Integration point:**
```typescript
// In parseStatementBlock() or statement()
if (this.check('SET')) {
  statements.push(this.parseSetAssignment());
  continue;
}
```

**Estimated Effort:** 2 hours

---

#### 3. "X is set to Y" Assignment Syntax
**Location:** `/services/evaluationEngine/parsers/FormulaParser.ts`

**Current:** IS_SET_TO recognized as single token by tokenizer

**Required:**
1. Detect variable/verbalization followed by IS_SET_TO
2. Parse rvalue expression
3. Generate Assignment AST node

**Pseudo-code:**
```typescript
// In assignment detection
if (this.peekAhead(1)?.type === 'IS_SET_TO') {
  const lvalue = this.parseLValue();
  this.consume('IS_SET_TO', 'Expected "is set to"');
  const rvalue = this.expression();
  
  return {
    type: 'Assignment',
    target: lvalue,
    value: rvalue,
    location: this.createLocation(startToken)
  };
}
```

**Estimated Effort:** 1 hour

---

### Priority 2: Enhanced Control Flow

#### 4. Optional END Keyword
**Location:** `/services/evaluationEngine/parsers/FormulaParser.ts`

**Current:**
```typescript
this.consume('END', 'Expected END after IF expression');
```

**Required:**
- Make END optional for simple conditionals
- Detect end of conditional by:
  - Next statement starts (IF, SET, etc.)
  - EOF reached
  - Explicit END keyword (backward compatibility)

**Pseudo-code:**
```typescript
// Optional END consumption
if (this.check('END')) {
  this.consume('END', 'Expected END');
} else {
  // END is optional - conditional ends naturally
  // Next statement or EOF marks the end
}
```

**Estimated Effort:** 2 hours (requires careful testing)

---

#### 5. Switch-Case Style (Sequential IF + OTHERWISE)
**Location:** `/services/evaluationEngine/parsers/FormulaParser.ts`

**Pattern to recognize:**
```typescript
if condition1, then action1;
if condition2, then action2;
if condition3, then action3;
otherwise defaultAction
```

**Required:**
1. Track sequential IF statements at same indentation
2. Final OTHERWISE applies to entire sequence
3. Generate chained ELSEIF structure in AST

**Notes:**
- Semicolons separate independent IF statements
- OTHERWISE must follow sequence of IFs
- Complex pattern, may defer to Priority 3

**Estimated Effort:** 4 hours

---

### Priority 3: Polish

#### 6. Article Stripping
**Location:** `/services/evaluationEngine/parsers/FormulaParser.ts`

**Pattern:**
```typescript
if the 'variable name' ...
set a 'variable name' to ...
```

**Required:**
- Detect THE, A, AN before variables/verbalizations
- Strip articles during parsing
- Don't affect semantics

**Pseudo-code:**
```typescript
private parseLValue(): Expression {
  // Strip optional article
  if (this.match('THE') || this.match('A') || this.match('AN')) {
    // Continue to parse variable/verbalization
  }
  
  return this.parseVariableOrVerbalization();
}
```

**Estimated Effort:** 1 hour

---

#### 7. Comma-Separated Actions
**Location:** `/services/evaluationEngine/parsers/FormulaParser.ts`

**Pattern:**
```typescript
if condition, then
  action1,
  action2,
  action3
```

**Current:** Already works with newlines as separators

**Required:**
- Recognize commas as statement separators within clauses
- Don't confuse with function argument commas
- End clause on OTHERWISE/ELSE/END

**Pseudo-code:**
```typescript
// In parseStatementBlock()
while (...) {
  statements.push(this.statement());
  
  // Allow comma as statement separator (in addition to newline)
  if (this.match('COMMA')) {
    continue;
  }
  
  // Check for clause terminators
  if (this.check('OTHERWISE') || this.check('ELSE') || this.check('END')) {
    break;
  }
}
```

**Estimated Effort:** 2 hours

---

### Priority 4: Loop Syntax

#### 8. Natural Loop Syntax
**Location:** `/services/evaluationEngine/parsers/FormulaParser.ts`

**Patterns:**
```typescript
for each 'item' in 'items', ...
while 'condition', ...
```

**Required:**
- Recognize "for each" (two tokens: FOR + EACH)
- Recognize "while" followed by condition
- Make DO and END optional
- Use commas/newlines as block separators

**Estimated Effort:** 3 hours

---

## Testing Strategy

### Unit Tests (Parser)

**File:** `/services/evaluationEngine/parsers/__tests__/FormulaParser.test.ts`

Add test cases for:
```typescript
describe('Phase 5.8: Natural Language Control Structures', () => {
  describe('OTHERWISE keyword', () => {
    it('should parse OTHERWISE as synonym for ELSE');
    it('should handle nested conditionals with OTHERWISE');
    it('should work in switch-case style patterns');
  });
  
  describe('Assignment syntax', () => {
    it('should parse "set X to Y" assignment');
    it('should parse "X is set to Y" assignment');
    it('should handle complex expressions in assignments');
  });
  
  describe('Optional END keyword', () => {
    it('should allow conditionals without END');
    it('should still support END for backward compatibility');
  });
  
  describe('Articles', () => {
    it('should strip THE before variables');
    it('should strip A/AN before variables');
  });
  
  describe('Comma-separated actions', () => {
    it('should parse multiple actions separated by commas');
    it('should not confuse with function argument commas');
  });
});
```

### Integration Tests (Evaluation)

**File:** Create `/services/evaluationEngine/__tests__/Phase5-8.test.ts`

Test full evaluation of:
- Simple conditionals with OTHERWISE
- Complex nested conditionals
- Switch-case style patterns
- "set X to Y" assignments
- Real-world examples from examples doc

### Sample Tests

Run all 20 examples from `PHASE5-8-Examples.md` through:
1. Tokenizer (should tokenize correctly)
2. Parser (should generate valid AST)
3. Evaluator (should produce correct results)
4. Syntax highlighter (should highlight correctly)

---

## Implementation Order

### Week 1: Core Functionality
1. ✅ Tokenizer updates (COMPLETE)
2. ✅ Sample updates (COMPLETE)
3. ⏳ OTHERWISE as ELSE synonym (30 min)
4. ⏳ "set X to Y" assignment (2 hours)
5. ⏳ "X is set to Y" assignment (1 hour)
6. ⏳ Basic testing (1 hour)

**Total: ~4.5 hours**

### Week 2: Enhanced Control Flow
7. ⏳ Optional END keyword (2 hours)
8. ⏳ Article stripping (1 hour)
9. ⏳ Comma-separated actions (2 hours)
10. ⏳ Comprehensive testing (2 hours)

**Total: ~7 hours**

### Week 3: Advanced Features
11. ⏳ Switch-case style parsing (4 hours)
12. ⏳ Natural loop syntax (3 hours)
13. ⏳ Integration testing (2 hours)
14. ⏳ Documentation updates (1 hour)

**Total: ~10 hours**

### Week 4: Polish & Release
15. ⏳ Syntax highlighting updates
16. ⏳ Autocomplete updates
17. ⏳ All 20 examples working
18. ⏳ User documentation
19. ⏳ Release notes

**Total: ~5 hours**

---

## Dependencies

### No Breaking Changes
- All existing syntax continues to work
- Pure additive changes
- Backward compatibility 100%

### Affected Components
- ✅ Tokenizer (complete)
- ⏳ Parser (main work)
- ⏳ Syntax highlighter (needs OTHERWISE highlighting)
- ⏳ Autocomplete (needs OTHERWISE in suggestions)
- ⏳ Error messages (update to mention new syntax)

---

## Success Criteria

Phase 5.8 is complete when:

- [ ] OTHERWISE works as drop-in replacement for ELSE
- [ ] "set X to Y" assignment syntax works in all contexts
- [ ] "X is set to Y" assignment syntax works
- [ ] Articles (the, a, an) are properly stripped
- [ ] All 20 examples from examples doc work correctly
- [ ] Comprehensive test suite passes (100+ test cases)
- [ ] Syntax highlighting updated
- [ ] Autocomplete updated
- [ ] Documentation complete
- [ ] No regressions in existing functionality

---

## Next Steps

1. **Implement OTHERWISE synonym** (Quick win, 30 min)
2. **Test with BAL samples** (Verify samples work)
3. **Implement "set X to Y"** (Core feature)
4. **Create test suite** (Ensure stability)
5. **Continue with remaining features** (Follow priority order)

---

## Related Files

**Parser:**
- `/services/evaluationEngine/parsers/FormulaParser.ts` - Main parser logic
- `/services/evaluationEngine/parsers/Tokenizer.ts` - Tokenizer (complete)

**Tests:**
- `/services/evaluationEngine/parsers/__tests__/FormulaParser.test.ts` - Parser tests
- Create: `/services/evaluationEngine/__tests__/Phase5-8.test.ts` - Integration tests

**Samples:**
- `/SampleData/balSamples.ts` - BAL samples (updated)
- `/SampleData/formulaSamples.ts` - Formula samples (needs update)

**Documentation:**
- `/planning/requirements/PHASE5-8-NaturalControlStructures.md` - Requirements
- `/planning/requirements/PHASE5-8-Examples.md` - Examples library
- This file - Implementation status

---

**Status:** Tokenizer complete, parser implementation in progress  
**Next Action:** Implement OTHERWISE as ELSE synonym in parser (30 min quick win)
