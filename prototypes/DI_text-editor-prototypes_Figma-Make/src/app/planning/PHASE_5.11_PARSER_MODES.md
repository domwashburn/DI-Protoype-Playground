# Phase 5.11: Parser Modes (STANDARD vs BAL)

**Date:** 2025-01-10  
**Status:** Proposed  
**Priority:** HIGH - Fixes critical parsing bugs

## Problem Statement

The formula parser is trying to support too many natural language variations simultaneously, leading to fragility and parsing conflicts. The specific issue:

```
if $orderTotal is greater than 1000 and
  if $loyaltyTier is "gold" then multiply $orderTotal by 0.15
  or if $loyaltyTier is "silver" then multiply $orderTotal by 0.15
  otherwise multiply $orderTotal by 0.05
otherwise 0
```

This fails to parse because:
1. "multiply X by Y" is a natural language operator pattern
2. "or if" is a natural language ELSEIF variant
3. The parser gets confused when these patterns appear together
4. Adding more conditional logic to handle edge cases makes the parser more fragile

## Solution: Dual Parser Modes

Create two distinct parser modes with clear boundaries:

### STANDARD Mode (Symbolic)
- Clean, symbolic syntax only
- Strict parsing rules
- Predictable behavior
- Traditional programming constructs
- **Always works, always stable**

**Example:**
```
if $orderTotal > 1000 then
  if $loyaltyTier = "gold" then
    $orderTotal * 0.15
  elsif $loyaltyTier = "silver" then
    $orderTotal * 0.10
  else
    $orderTotal * 0.05
  end
else
  0
end
```

### BAL Mode (Natural Language)
- Full natural language support
- Flexible parsing rules
- Optional END keywords
- Natural operators and connectors
- **Optimized for readability, not brevity**

**Example:**
```
when order total exceeds 1000
  when loyalty tier is "gold"
    give 15% of order total
  or when loyalty tier is "silver"
    give 10% of order total
  otherwise
    give 5% of order total
otherwise 0
```

## Architecture

### Parser Mode Enum
```typescript
export enum ParserMode {
  STANDARD = 'STANDARD',
  BAL = 'BAL'
}
```

### Parser Signature
```typescript
class FormulaParser {
  parse(
    source: string, 
    verbalizationMap?: VerbalizationMap,
    mode: ParserMode = ParserMode.STANDARD
  ): Program
}
```

### Mode-Specific Behavior

| Feature | STANDARD | BAL |
|---------|----------|-----|
| Variables | `$varName` only | `$varName` OR `'natural name'` |
| Operators | `+`, `-`, `*`, `/` | Symbolic + "multiply X by Y" |
| Comparisons | `=`, `<`, `>` | Symbolic + "is greater than" |
| IF syntax | `if...then...else...end` | `when...and` + optional END |
| ELSEIF | `elsif`, `elseif` | `elsif`, `or if`, `or when` |
| Functions | `SUM($values)` | `SUM()` + "the sum of values" |
| END keywords | Required | Optional at EOF |

## Implementation Plan

### Step 1: Add Mode Parameter ✅
- [x] Create `ParserMode` enum
- [x] Add `mode` parameter to `parse()` method
- [x] Export `ParserMode` from parser module

### Step 2: Mode-Specific IF Parsing
- [ ] In `ifExpression()`, check mode before allowing "and" connector
- [ ] In `matchElseIf()`, check mode before allowing "or if"
- [ ] In `isBlockTerminator()`, check mode for optional END

### Step 3: Mode-Specific Operator Parsing
- [ ] In `multiplicative()`, check mode before allowing "multiply X by Y"
- [ ] In `additive()`, check mode before allowing "add X to Y"
- [ ] In `primary()`, check mode before allowing prefix operators

### Step 4: Mode-Specific Function Parsing
- [ ] In `isNaturalLanguageFunction()`, check mode
- [ ] Only allow natural functions in BAL mode

### Step 5: Update UI
- [ ] Add mode selector to Formula Editor
- [ ] Default to STANDARD mode
- [ ] Persist mode preference per formula
- [ ] Show mode indicator in editor

### Step 6: Testing
- [ ] Create test suite for STANDARD mode
- [ ] Create test suite for BAL mode
- [ ] Ensure no cross-contamination
- [ ] Performance testing

## Quick Fix (Immediate)

For the current bug, the simplest fix is:

**Option A: Disable "or if" for now**
- Remove "or if" support temporarily
- Users must use "elsif" or "elseif"
- This makes the parser stable immediately

**Option B: Require parentheses around natural operators in nested IF**
```
if $orderTotal is greater than 1000 and
  if $loyaltyTier is "gold" then (multiply $orderTotal by 0.15)
  or if $loyaltyTier is "silver" then (multiply $orderTotal by 0.10)
  otherwise (multiply $orderTotal by 0.05)
otherwise 0
```

**Option C: Simplify the formula**
```
if $orderTotal > 1000 and
  if $loyaltyTier = "gold" then $orderTotal * 0.15
  elsif $loyaltyTier = "silver" then $orderTotal * 0.10
  else $orderTotal * 0.05
  end
else 0
end
```

## Recommendation

1. **Immediate:** Use Option C (simplify formula) to unblock testing
2. **Short-term (this week):** Implement dual parser modes (Steps 1-3)
3. **Medium-term (next week):** Complete UI integration (Steps 4-5)
4. **Long-term:** Add comprehensive test coverage (Step 6)

## Benefits

1. **Stability:** STANDARD mode never breaks, always predictable
2. **Innovation:** BAL mode can evolve independently
3. **Clear Boundaries:** No ambiguity about what's supported where
4. **User Choice:** Power users get brevity, business users get readability
5. **Testability:** Each mode can be tested independently

## Risks

1. **Complexity:** Maintaining two modes adds code complexity
2. **Documentation:** Need to document both modes clearly
3. **Migration:** Existing formulas need mode assignment
4. **Confusion:** Users might not know which mode to choose

## Mitigation

1. Use mode parameter consistently throughout parser
2. Create comprehensive mode documentation with examples
3. Auto-detect mode from formula syntax (heuristics)
4. Provide clear mode descriptions in UI

## Questions

1. Should we auto-detect mode from formula syntax?
2. Should STANDARD mode support ANY natural language features?
3. Should we allow mode switching on existing formulas?
4. Should we have a third "MIXED" mode that allows everything?

## Next Steps

1. Get user confirmation on approach
2. Implement Step 2 (mode-specific IF parsing)
3. Test with problematic formula
4. Proceed with remaining steps if successful

---

## Related Files

- `/services/evaluationEngine/parsers/FormulaParser.ts` - Main parser
- `/planning/NATURAL_LANGUAGE_SYNTAX_GUIDE.md` - Natural language features
- `/Guidelines.md` - Strangler pattern guidance
