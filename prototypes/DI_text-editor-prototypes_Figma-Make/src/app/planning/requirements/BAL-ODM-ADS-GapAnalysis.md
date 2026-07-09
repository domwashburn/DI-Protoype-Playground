# BAL/ODM/ADS Gap Analysis for Phase 5 Natural Language Operators

**Related:** `/planning/requirements/PHASE5-NaturalLanguageOperators.md`
**Status:** Research & Planning
**Created:** 2025-11-07

---

## Overview

This document analyzes gaps between our proposed Phase 5 natural language operator implementation and IBM's actual Business Action Language (BAL) as used in ODM (Operational Decision Manager) and ADS (Automation Decision Services).

**Purpose:** Ensure our natural language formula syntax aligns with industry-standard BAL patterns where appropriate, while maintaining our unique formula language design goals.

---

## IBM BAL Core Patterns

Based on IBM's BAL documentation and public sources, here are the key natural language patterns BAL uses:

### 1. **Articles (Definite/Indefinite)**

**BAL Pattern:**
```bal
set the age of the customer to 25
set a discount to 10%
```

**Key Feature:**
- Uses **"the"** for definite references (specific instance)
- Uses **"a"** or **"an"** for indefinite references (new instance or general reference)
- Makes rules read like natural English sentences

**Gap in Our Implementation:**
❌ We do NOT currently support articles (`the`, `a`, `an`)

**Our Current Syntax:**
```
'age' = 25
'discount' = 10
```

**Potential BAL-style Syntax:**
```
set the 'age' to 25
set a 'discount' to 10
```

**Question:** Should we add article support?

**Pros:**
- More readable, closer to natural English
- Aligns with industry standard (IBM BAL)
- Could improve business user comprehension

**Cons:**
- Articles don't add semantic meaning in our context
- Makes syntax more verbose
- Could be confusing (when to use "the" vs "a"?)
- Increases parser complexity

**Recommendation:** 
- **OPTIONAL** - Could add as syntactic sugar
- Make articles optional: `set 'age' to 25` and `set the 'age' to 25` both valid
- Articles are stripped during parsing (no semantic difference)

---

### 2. **Property Access with "the ... of"**

**BAL Pattern:**
```bal
the name of the customer
the age of the person
the address of the company
```

**Gap in Our Implementation:**
✅ We DO support this in Phase 5 proposal:
```
name of 'customer'
age of 'person'  
address of 'company'
```

**BAL Addition:**
BAL uses **"the"** before both the property and the object:
```bal
the name of the customer
```

**Our Equivalent:**
```
name of 'customer'
```

**Question:** Should we require/support "the"?

**Recommendation:**
- Make "the" **optional** in property access
- `name of 'customer'` ✅
- `the name of 'customer'` ✅ (equivalent)
- `name of the 'customer'` ✅ (equivalent)
- `the name of the 'customer'` ✅ (equivalent)

**Parser treats all four as identical.**

---

### 3. **"set ... to ..." Assignment**

**BAL Pattern:**
```bal
set the discount to 10
set the customer name to "Alice"
```

**Gap in Our Implementation:**
✅ We DO support this in Phase 5.3 (optional phase):
```
set 'discount' to 10
set 'customer name' to "Alice"
```

**Alignment:** ✅ Strong alignment with BAL

---

### 4. **Temporal Operators**

**BAL Pattern:**
```bal
after the order date
before the due date
during the promotion period
within 30 days of the start date
```

**Gap in Our Implementation:**
❌ We do NOT support temporal operators

**Our Current Support:**
- Date arithmetic: `'due date' - 'order date'` (produces duration)
- Time functions: `DAYS_BETWEEN('order date', 'due date')`

**Missing:**
- Natural language temporal prepositions: `after`, `before`, `during`, `within`

**Example Use Cases:**
```
IF 'order date' is after 'promotion start date' THEN
  'discount' = 20
END

IF 'current date' is within 30 days of 'event date' THEN
  'reminder' = "Coming soon"
END
```

**Recommendation:**
- **ADD** in Phase 5 or separate Phase 6
- Temporal operators for date comparisons:
  - `is after` → `>`
  - `is before` → `<`
  - `is within X days of` → special temporal function
  - `is during` → range check

**Implementation:**
```
'order date' is after 'start date'
// Equivalent to: orderDate > startDate

'event date' is within 30 days of 'current date'
// Equivalent to: ABS(DAYS_BETWEEN(eventDate, currentDate)) <= 30
```

---

### 5. **Collection Operations**

**BAL Pattern:**
```bal
for each item in the order
where the price of the item is greater than 100
```

**Quantifiers:**
```bal
there exists an item in the order where the price is greater than 100
for all items in the order, the price is less than 1000
```

**Gap in Our Implementation:**
❌ We do NOT support collection iteration or quantifiers in natural language

**Our Current Support:**
- List functions: `LIST_SUM`, `LIST_AVG`, `CONTAINS`, etc.
- No iteration syntax
- No quantifier syntax

**Missing:**
- `for each ... in ...` loops
- `where` clause filtering
- `there exists` existential quantifier
- `for all` universal quantifier

**Example Use Cases:**
```
// Iteration
for each 'product' in 'products'
  'total' = 'total' + 'price' of 'product'
END

// Existential
IF there exists a 'product' in 'products' where 'price' of 'product' > 100 THEN
  'has premium items' = true
END

// Universal
IF for all 'products' in 'products', 'price' of 'product' < 1000 THEN
  'all affordable' = true
END
```

**Recommendation:**
- **ADD** in Phase 6 (Collection Operations)
- Separate from Phase 5 (operators) due to complexity
- Requires significant parser changes (new statement types)

**Priority:** Medium (useful but not critical for initial natural language support)

---

### 6. **"is" for Type Checking and Assertions**

**BAL Pattern:**
```bal
the customer is a premium member
the order is not empty
the status is "active"
```

**Gap in Our Implementation:**
⚠️ **PARTIAL** support

**Our Current Support:**
- Equality: `'status' = "active"` or `'status' is equal to "active"`
- Inequality: `'status' != "active"` or `'status' is not equal to "active"`

**Missing:**
- Type-like checks: `is a premium member`
- Empty checks: `is empty`, `is not empty`
- Null checks: `is null`, `is not null`

**Recommendation:**
- **ADD** `is` for equality as alternative to `=`
- **ADD** `is null` / `is not null` checks
- **ADD** `is empty` / `is not empty` for strings and lists

**Examples:**
```
IF 'status' is "active" THEN  // Equality check
  ...
END

IF 'email' is not empty THEN  // Non-empty string
  ...
END

IF 'order items' is not empty THEN  // Non-empty list
  ...
END

IF 'discount' is null THEN  // Null check
  ...
END
```

**Implementation:**
```typescript
// Parser recognizes these patterns:
"is" followed by value → equality comparison
"is null" → null check
"is empty" → empty check (LENGTH = 0 or value === "")
"is not null" → not null check
"is not empty" → not empty check
```

---

### 7. **Boolean Connectives (Natural Language)**

**BAL Pattern:**
```bal
if the age is greater than 18 and the status is "active" then
  ...
end
```

**Gap in Our Implementation:**
✅ We already support this

**Our Current Support:**
- `AND`, `OR`, `NOT` keywords
- Natural language comparison operators: `is greater than`, `is less than`, etc.

**Alignment:** ✅ Strong alignment with BAL

---

### 8. **String Operations**

**BAL Pattern:**
```bal
the name starts with "A"
the email contains "@example.com"
the message ends with "!"
```

**Gap in Our Implementation:**
❌ We do NOT support natural language string predicates

**Our Current Support:**
- Functions: `CONTAINS('email', "@example.com")`
- No natural language predicates

**Missing:**
- `starts with`
- `ends with`
- `contains` (as operator, not function)

**Recommendation:**
- **ADD** in Phase 5 or Phase 6
- Natural language string predicates

**Examples:**
```
IF 'name' starts with "A" THEN
  ...
END

IF 'email' contains "@example.com" THEN
  ...
END

IF 'message' ends with "!" THEN
  ...
END
```

**Implementation:**
```typescript
// Parser recognizes:
"starts with" → function call: STARTS_WITH(left, right)
"ends with" → function call: ENDS_WITH(left, right)  
"contains" → function call: CONTAINS(left, right)
```

---

### 9. **Conditional "when" Clauses**

**BAL Pattern:**
```bal
when the order total is greater than 100
  set the discount to 10%
```

**Gap in Our Implementation:**
❌ We do NOT support `when` as alternative to `IF`

**Our Current Support:**
- `IF ... THEN ... END` syntax

**Missing:**
- `when` clause as alternative to `IF`

**Recommendation:**
- **OPTIONAL** - Low priority
- `when` is just syntactic sugar for `IF`
- Could add for BAL compatibility

**Example:**
```
when 'order total' > 100
  'discount' = 10
END

// Equivalent to:
IF 'order total' > 100 THEN
  'discount' = 10
END
```

---

### 10. **Action Phrases**

**BAL Pattern:**
```bal
increase the balance by 100
decrease the quantity by 5
add 10 to the score
subtract 5 from the total
```

**Gap in Our Implementation:**
❌ We do NOT support action phrases

**Our Current Support:**
- Assignment with arithmetic: `'balance' = 'balance' + 100`

**Missing:**
- Action verbs: `increase`, `decrease`, `add to`, `subtract from`

**Recommendation:**
- **ADD** in Phase 6 (Enhancement)
- Makes formulas more readable
- Common business language pattern

**Examples:**
```
increase 'balance' by 100
// Equivalent to: 'balance' = 'balance' + 100

decrease 'quantity' by 5
// Equivalent to: 'quantity' = 'quantity' - 5

add 10 to 'score'
// Equivalent to: 'score' = 'score' + 10

multiply 'price' by 1.1
// Equivalent to: 'price' = 'price' * 1.1
```

**Parser Implementation:**
```typescript
// Pattern recognition:
"increase VAR by EXPR" → VAR = VAR + EXPR
"decrease VAR by EXPR" → VAR = VAR - EXPR
"add EXPR to VAR" → VAR = VAR + EXPR
"subtract EXPR from VAR" → VAR = VAR - EXPR
"multiply VAR by EXPR" → VAR = VAR * EXPR
"divide VAR by EXPR" → VAR = VAR / EXPR
```

---

## Summary: Gaps & Recommendations

### ✅ Already Aligned with BAL

| Feature | Status | Notes |
|---------|--------|-------|
| Property access with `of` | ✅ In Phase 5 proposal | `name of 'customer'` |
| `set ... to ...` assignment | ✅ In Phase 5.3 (optional) | `set 'x' to 5` |
| Boolean connectives (`AND`, `OR`, `NOT`) | ✅ Already supported | Works as expected |
| Natural language comparison operators | ✅ In Phase 4 (complete) | `is greater than`, etc. |

---

### ❌ Missing from Our Implementation

| Feature | Priority | Recommendation | Complexity |
|---------|----------|----------------|------------|
| **Articles** (`the`, `a`, `an`) | Low | Optional syntactic sugar | Low |
| **Temporal operators** (`after`, `before`, `within`) | Medium | Add in Phase 6 | Medium |
| **Collection operations** (`for each`, `where`) | Medium | Add in Phase 6 | High |
| **Quantifiers** (`there exists`, `for all`) | Low | Add in Phase 6 | High |
| **`is` for equality/checks** | High | Add in Phase 5 | Low |
| **`is null` / `is empty` checks** | High | Add in Phase 5 | Low |
| **String predicates** (`starts with`, `ends with`, `contains`) | High | Add in Phase 5 or 6 | Medium |
| **`when` clause** | Low | Optional syntactic sugar | Low |
| **Action phrases** (`increase by`, `add to`) | Medium | Add in Phase 6 | Medium |

---

## Prioritized Additions for Phase 5

Based on the gap analysis, here are **high-priority additions** that should be included in Phase 5:

### 1. **"is" for Equality and Checks**
```
'status' is "active"          // Equality
'email' is not empty          // Empty check
'discount' is null            // Null check
'items' is not null           // Not null check
```

**Why:** Common BAL pattern, low complexity, high readability gain

---

### 2. **String Predicates**
```
'name' starts with "A"
'email' contains "@example.com"
'message' ends with "!"
```

**Why:** Very common in business rules, medium complexity, high utility

---

### 3. **Optional Articles**
```
set the 'discount' to 10      // Same as: set 'discount' to 10
the name of the 'customer'    // Same as: name of 'customer'
```

**Why:** Makes syntax more natural for BAL users, low complexity (optional = backward compatible)

---

### 4. **"is" with "not" for Negation**
```
'status' is not "active"      // Not equal
'email' is not null           // Not null
```

**Why:** Completes the `is` operator pattern, consistent with BAL

---

## Future Phases (Phase 6+)

These should be separate phases due to complexity:

### Phase 6: Temporal Operators
- `is after`, `is before`, `is during`, `is within X days of`
- Requires new date comparison patterns
- Medium complexity

### Phase 7: Collection Operations
- `for each ... in ...` iteration
- `where` clause filtering
- `there exists` and `for all` quantifiers
- High complexity, requires new AST node types

### Phase 8: Action Phrases
- `increase by`, `decrease by`, `add to`, `subtract from`
- Syntactic sugar for common update patterns
- Medium complexity

---

## Differences from BAL (By Design)

Some things we do differently intentionally:

### 1. **Variable Syntax**
**BAL:** Uses natural identifiers without special prefix
```bal
the customer
the order total
```

**Ours:** Uses either `$` or single quotes
```
$customerName
'customer name'
```

**Why Different:** Our syntax explicitly marks variables, avoiding ambiguity with keywords/text. This is intentional and should be preserved.

---

### 2. **Assignment Operator**
**BAL:** Primarily uses `set ... to ...`
```bal
set the discount to 10
```

**Ours:** Supports both `=` and `set ... to ...`
```
'discount' = 10
set 'discount' to 10
```

**Why Different:** We support mathematical notation (`=`) as primary, with `set ... to ...` as alternative. This gives users choice.

---

### 3. **Explicit RETURN**
**BAL:** Implicit return (last value)

**Ours:** Explicit `RETURN` statement
```
RETURN 'result'
```

**Why Different:** Makes control flow explicit, especially important for debugging. This is intentional.

---

## Recommendations Summary

### For Phase 5 (Current Proposal)

**Add to Phase 5.1 (Arithmetic Operators):**
- No changes - proceed as planned

**Add to Phase 5.2 (Property Access):**
- ✅ Keep `of`, `in`, `from` as planned
- ➕ ADD: Optional `the` before property and object
  - `name of 'customer'` ✅
  - `the name of the 'customer'` ✅ (equivalent)

**Add to Phase 5.3 (Assignment Keywords):**
- ✅ Keep `set ... to ...` as planned
- ➕ ADD: Optional `the` before variable
  - `set 'discount' to 10` ✅
  - `set the 'discount' to 10` ✅ (equivalent)

**NEW: Phase 5.4 (Equality and Checks):**
- ➕ ADD: `is` for equality
  - `'status' is "active"` → equality check
  - `'status' is not "active"` → inequality check
- ➕ ADD: `is null` / `is not null`
  - `'value' is null` → null check
  - `'value' is not null` → not null check
- ➕ ADD: `is empty` / `is not empty`
  - `'text' is empty` → empty string check
  - `'list' is not empty` → non-empty list check

**NEW: Phase 5.5 (String Predicates):**
- ➕ ADD: `starts with`, `ends with`, `contains`
  - `'name' starts with "A"` → string predicate
  - `'email' contains "@"` → string predicate
  - `'message' ends with "!"` → string predicate

---

### For Phase 6 (Future)

**Phase 6.1: Temporal Operators**
- `is after`, `is before`, `is within X days of`, `is during`

**Phase 6.2: Collection Operations**
- `for each ... in ...` iteration
- `where` clause filtering

**Phase 6.3: Quantifiers**
- `there exists`, `for all`

**Phase 6.4: Action Phrases**
- `increase by`, `decrease by`, `add to`, `subtract from`, `multiply by`, `divide by`

---

## Conclusion

Our Phase 5 proposal is **well-aligned with IBM BAL** for arithmetic operators and property access. However, there are **important gaps** that should be addressed to provide full BAL-style natural language support:

**Critical Additions:**
1. ✅ `is` for equality and checks (High Priority)
2. ✅ `is null` / `is empty` checks (High Priority)
3. ✅ String predicates: `starts with`, `ends with`, `contains` (High Priority)
4. ⚠️ Optional articles: `the`, `a` (Medium Priority - enhances readability)

**Future Considerations:**
5. Temporal operators (Phase 6)
6. Collection operations (Phase 6)
7. Action phrases (Phase 6)

These additions will make our formula language more expressive, readable, and aligned with industry-standard business rule languages while maintaining our unique design goals (explicit variables, flexible syntax, debugging support).

---

**Next Steps:**

1. Review this gap analysis
2. Decide which high-priority additions to include in Phase 5
3. Update Phase 5 requirements document with new sub-phases
4. Begin implementation with updated scope

---

**Document Version:** 1.0
**Last Updated:** 2025-11-07
**Author:** Development Team
