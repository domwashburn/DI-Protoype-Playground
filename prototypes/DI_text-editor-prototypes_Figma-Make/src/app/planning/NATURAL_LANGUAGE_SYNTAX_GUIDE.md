# Natural Language Syntax Guide

**Goal:** Create a formula language that reads like spoken English, without programming noise like semicolons, curly braces, or required END keywords.

## Core Principles

1. **Write formulas the way you'd speak them** - If you wouldn't say it, don't require it
2. **Structure through indentation and context** - Like Python, but more forgiving
3. **Multiple ways to express the same thing** - Support natural variation in speech
4. **No syntactic noise** - No required semicolons, no mandatory END keywords at EOF
5. **Implicit over explicit** - Infer intent from structure when unambiguous

---

## Current Status (✅ Implemented)

### Variables
```
✅ Symbolic: $orderTotal, $customerAge
✅ Natural language: 'customer age', 'order total', 'is premium member'
✅ Mixed usage: Can use both in same formula
```

### Operators - Comparison
```
✅ Symbolic: =, !=, <, >, <=, >=
✅ Natural: is greater than, is less than, is equal to
✅ Contextual: "is" (becomes "=" in comparison context)
✅ Predicates: is null, is not null, is empty, is not empty
✅ String tests: starts with, ends with, contains
```

### Operators - Arithmetic
```
✅ Symbolic: +, -, *, /, %, ^
✅ Natural: plus, minus, times, divided by, mod
✅ Prefix form: multiply X by Y, divide X by Y, add X to Y, subtract X from Y
✅ Postfix: X squared, X cubed
✅ Phrase: X to the power of Y
```

### Operators - Logical
```
✅ Symbolic: AND, OR, NOT
✅ Usage: $age >= 18 AND $income > 50000
```

### Control Flow - IF Statements
```
✅ Basic: if CONDITION then RESULT
✅ With ELSE: if CONDITION then RESULT else DEFAULT
✅ With ELSEIF: if C1 then R1 or if C2 then R2 else DEFAULT
✅ Natural connector: if CONDITION and RESULT (instead of "then")
✅ Synonym: "otherwise" for "else"
✅ Optional END: END is optional at EOF or before new statements
✅ Nested: Properly handles nested if statements without explicit END
```

### Functions
```
✅ Traditional: SUM($values), COUNT($items), MAX($scores)
✅ Natural language: the sum of $values, the count of $items
✅ Natural variants: the total of, the average of, the maximum of, etc.
```

### Loops
```
✅ FOR loop: for $item in $list do ... end
✅ WHILE loop: while $condition do ... end
✅ Range syntax: for $i in 1..10 do ... end
✅ Break/continue: break, continue
```

---

## Proposed Enhancements (🔄 To Implement)

### 1. Natural Language Loops

**Current (verbose):**
```
for $item in $items do
  $total = $total + $item.price
end
```

**Proposed natural language:**
```
for each item in the items
  add the item price to the running total

// Alternatives:
for every customer in the customer list
  calculate their lifetime value

for all products in the catalog
  update the price
```

**Key changes:**
- `for each` / `for every` / `for all` instead of just `for`
- Optional articles: `the`, `a`, `an`
- Optional `do` keyword (structure is clear without it)
- Optional `end` keyword at EOF

### 2. WHEN instead of IF (for single conditions)

**Current:**
```
if $status is "approved" then
  send notification
```

**Proposed:**
```
when the status is approved
  send a notification

// Nested example:
when the order total exceeds 1000
  when the customer is a gold member
    apply a 15% discount
  otherwise when the customer is silver
    apply a 10% discount
  otherwise
    apply a 5% discount
```

**Key insight:** "when" feels more natural for event-driven logic, "if" for conditional branching

### 3. Natural Logical Operators

**Current:**
```
if $age >= 18 AND $income > 50000 then "approved"
```

**Proposed alternatives:**
```
if age is at least 18 and income exceeds 50000 then approved

when the age is 18 or older and the income is above 50000
  approve the application

// With natural negation:
if the customer is not a member or the balance is below zero
  deny access
```

**Additions:**
- `at least` = `>=`
- `at most` = `<=`
- `exceeds` = `>`
- `below` / `under` = `<`
- `above` / `over` = `>`
- `between X and Y` = `>= X AND <= Y`
- `either X or Y` = logical OR with natural flow

### 4. Action Phrases (Implied Assignment)

**Current:**
```
$discount = $orderTotal * 0.15
```

**Proposed:**
```
set the discount to 15% of the order total

calculate the discount as 15% of the order total

// More examples:
increase the price by 10%
decrease the quantity by 5
double the bonus
multiply the score by 1.5
```

**Pattern:** `[action verb] [variable] [preposition] [expression]`
- Actions: set, calculate, increase, decrease, update, assign
- Prepositions: to, by, as, from

### 5. Implicit Returns

**Current:**
```
if $condition then
  return $value1
else
  return $value2
end
```

**Proposed (ALREADY WORKS!):**
```
if the order qualifies for free shipping
  0
otherwise
  calculate standard shipping cost
```

**Key:** Last expression in a block is automatically returned (already implemented)

### 6. Range and Collection Predicates

**Current:**
```
if $age >= 18 AND $age <= 65 then "working age"
```

**Proposed:**
```
when age is between 18 and 65
  classify as working age

// More examples:
when price is in the range 100 to 500
  tier = "medium"

when status is one of ["pending", "approved", "processing"]
  allow modification

when category is not in the excluded list
  include in results
```

**Additions:**
- `between X and Y` = composite comparison
- `in the range X to Y` = same as between
- `is one of [list]` = membership test
- `is not in [list]` = negative membership

### 7. Comparison Chains

**Current:**
```
if $score >= 90 then "A"
elsif $score >= 80 then "B"
elsif $score >= 70 then "C"
else "F"
end
```

**Proposed:**
```
when score is at least 90 -> grade A
when score is at least 80 -> grade B  
when score is at least 70 -> grade C
otherwise -> grade F

// Alternative with "give":
when score reaches 90 or above
  give grade A
when score reaches 80 or above
  give grade B
when score reaches 70 or above
  give grade C
otherwise
  give grade F
```

**Addition:** `->` as shorthand for "then" in simple cases

### 8. Percentage Literals

**Current:**
```
$discount = $price * 0.15
```

**Proposed:**
```
set discount to 15% of the price

apply a 20% markup to the cost

// Percentage as literal:
when discount percentage exceeds 25%
  flag for review
```

**Addition:** `15%` = `0.15` (percentage literal)

### 9. Time and Date Natural Language

**Current:**
```
if DAYS_BETWEEN($startDate, $endDate) > 30 then "expired"
```

**Proposed:**
```
when the days between start date and end date exceed 30
  mark as expired

// More natural:
when the subscription is older than 30 days
  send renewal notice

when the event is less than 7 days away
  send reminder
  
when today is past the due date
  apply late fee
```

**Additions:**
- `older than N days/months/years`
- `less than N days/hours away`
- `past the [date]`
- `before [date]`
- `after [date]`

### 10. Question-Style Conditions

**Current:**
```
if $isPremium = true AND $balance > 0 then "active"
```

**Proposed:**
```
when is the customer premium? and does the balance exceed zero?
  status = active

// Simpler:
is the customer a premium member? -> yes
is the balance positive? -> yes
when both are true
  grant access
```

**Philosophical:** Sometimes reading like a decision tree ("is X true?") is more natural than assertions

---

## Design Decisions for Implementation

### When to Require END?

**Rule:** END is optional when structure is unambiguous from context

**Optional:**
- At end of file (EOF)
- When next token starts a new top-level statement (another IF, FOR, RETURN, etc.)
- When next token is ELSE/OTHERWISE/ELSEIF (belongs to parent structure)

**Required:**
- In middle of a block when structure would be ambiguous
- Currently required for FOR/WHILE loops (could be relaxed in future)

### Indentation Significance?

**Current:** Indentation is cosmetic (for humans only)

**Proposed:** Make indentation optional but honored
- Parser ignores it but editor could use it for hints
- Helpful for nested structures
- Not required (unlike Python)

### Verbosity vs. Brevity

**Philosophy:** Support both!

**Terse (symbolic):**
```
if $x > 10 then $y * 2 else $y
```

**Natural (verbose):**
```
when x exceeds 10
  double y
otherwise
  keep y unchanged
```

**Mixed (practical):**
```
when $orderTotal > 1000 and $loyaltyTier is "gold"
  discount = 15% of $orderTotal
otherwise
  discount = 0
```

**All three should work!** Users choose their preference.

---

## Implementation Priority

### Phase 6.1: Enhanced Natural Language Loops ✅ NEXT
```
- for each / for every / for all
- Optional articles (the, a, an)
- Optional DO keyword
- Optional END at EOF
```

### Phase 6.2: Action Phrases
```
- set X to Y
- increase/decrease X by Y
- calculate X as Y
- update X to Y
```

### Phase 6.3: Enhanced Comparisons
```
- at least, at most, exceeds, below, above, over, under
- between X and Y
- is one of [list]
```

### Phase 6.4: WHEN keyword
```
- "when" as alternative to "if"
- More event-driven feel
```

### Phase 6.5: Percentage Literals
```
- 15% as literal = 0.15
- Natural percentage expressions
```

### Phase 6.6: Advanced Time/Date
```
- older than N days
- less than N hours away
- past the due date
```

---

## Examples: Before & After

### Example 1: Customer Discount

**Before (symbolic):**
```
if $orderTotal > 1000 then
  if $loyaltyTier = "gold" then
    return $orderTotal * 0.15
  elsif $loyaltyTier = "silver" then
    return $orderTotal * 0.10
  else
    return $orderTotal * 0.05
  end
else
  return 0
end
```

**After (natural):**
```
when the order total exceeds 1000 and
  when loyalty tier is gold
    give 15% of order total
  or when loyalty tier is silver
    give 10% of order total
  otherwise
    give 5% of order total
otherwise 0
```

### Example 2: Loop with Calculation

**Before (symbolic):**
```
$total = 0
for $item in $items do
  $total = $total + $item.price
end
return $total
```

**After (natural):**
```
set total to 0
for each item in the items
  increase total by the item price
return total
```

### Example 3: Complex Eligibility

**Before (symbolic):**
```
if $age >= 18 AND $age <= 65 AND $income > 50000 AND $creditScore >= 700 then
  return "approved"
elsif $age >= 18 AND $income > 30000 AND $creditScore >= 650 then
  return "conditional"
else
  return "denied"
end
```

**After (natural):**
```
when age is between 18 and 65 and
     income exceeds 50000 and
     credit score is at least 700
  approve

or when age is at least 18 and
        income exceeds 30000 and
        credit score is at least 650
  conditional approval

otherwise
  deny
```

---

## Grammar Specification (EBNF-ish)

```ebnf
Program = Statement* Expression?

Statement = Assignment | Loop | IfStatement | ReturnStatement

Assignment = Variable "=" Expression
           | "set" Variable "to" Expression
           | "calculate" Variable "as" Expression
           | "increase" Variable "by" Expression
           | "decrease" Variable "by" Expression

Loop = ForLoop | WhileLoop

ForLoop = ("for" | "for each" | "for every" | "for all") 
          Variable "in" Expression 
          ("do")? 
          Statement* 
          ("end")?

WhileLoop = "while" Expression ("do")? Statement* ("end")?

IfStatement = ("if" | "when") Expression ("then" | "and")
              Statement*
              ElseIfClause*
              ElseClause?
              ("end")?

ElseIfClause = ("or if" | "elsif" | "elseif" | "or when") 
               Expression ("then" | "and")
               Statement*

ElseClause = ("else" | "otherwise") Statement*

Expression = LogicalOr

LogicalOr = LogicalAnd (("or" | "OR") LogicalAnd)*

LogicalAnd = Comparison (("and" | "AND") Comparison)*

Comparison = Additive ComparisonOp Additive
           | Additive "is" ComparisonPhrase Additive
           | Additive "is between" Additive "and" Additive
           | Additive "is one of" List
           | Additive

ComparisonOp = "=" | "!=" | "<" | ">" | "<=" | ">="
             | "is equal to" | "is not equal to"
             | "is greater than" | "is less than"
             | "is at least" | "is at most"
             | "exceeds" | "is below" | "is above"

Additive = Multiplicative (("+" | "-" | "plus" | "minus") Multiplicative)*
         | ("add" | "subtract") Additive ("to" | "from") Additive

Multiplicative = Power (("*" | "/" | "%" | "times" | "divided by" | "mod") Power)*
               | ("multiply" | "divide") Power ("by") Power

Power = Unary (("^" | "to the power of") Unary)*
      | Unary ("squared" | "cubed")

Unary = ("-" | "NOT" | "not") Primary | Primary

Primary = Number | String | Boolean | Variable | Attribute
        | FunctionCall | IfExpression | List | Object
        | "(" Expression ")"

Variable = "$" Identifier | "'" NaturalPhrase "'"

Attribute = "#" DottedPath

FunctionCall = Identifier "(" Arguments? ")"
             | "the" NaturalFunction "of" Arguments

NaturalFunction = "sum" | "average" | "count" | "maximum" | "minimum"
                | "first" | "last" | "length" | "uppercase" | "lowercase"

Number = Digit+ ("." Digit+)? ("%" )? // Percentage support

```

---

## Next Steps

1. ✅ **Fix nested IF bug** - DONE (ELSE/OTHERWISE now terminates nested IF)
2. 🔄 **Implement Phase 6.1: Enhanced loops** - Natural language loop syntax
3. 🔄 **Implement Phase 6.2: Action phrases** - set/calculate/increase/decrease
4. 🔄 **Implement Phase 6.3: Enhanced comparisons** - at least/between/one of
5. 📝 **Create comprehensive test suite** - Cover all natural language patterns
6. 📝 **Update autocomplete** - Suggest natural language alternatives
7. 📝 **Update syntax highlighting** - Highlight new keywords

---

## Questions for Discussion

1. **WHEN vs IF:** Should we treat them as synonyms, or give WHEN special semantics (e.g., event-driven)?

2. **Implicit returns:** Should ALL blocks return their last expression, or only certain contexts?

3. **Percentage literals:** How to handle ambiguity? `15%` = `0.15` or `15` (keep as number)?

4. **Question-style:** Should we support `is X true?` syntax, or is it too verbose?

5. **Indentation:** Should we make it significant (Python-style) or keep it cosmetic?

6. **Article inference:** Should `for item in items` auto-infer articles ("for each item in the items")?

7. **END requirements:** Current rule is "optional at EOF or before new statements". Is this too permissive?

8. **Performance:** Do natural language patterns hurt parse performance? (Probably not significantly, but worth measuring)

---

## Philosophy

> "The best notation is no notation. The best syntax is natural language. But practicality beats purity, so we support both terse symbolic syntax and verbose natural syntax, letting users choose what feels right for their use case."

The goal is not to force natural language, but to **enable** it for those who want it. Power users can still write terse, symbolic formulas. Business analysts can write readable, English-like rules. Both should be first-class citizens.
