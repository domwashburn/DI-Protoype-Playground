# Phase 5.8: Natural Language Control Structures - Examples

**Comprehensive examples demonstrating conversational control flow syntax**

**NOTE:** All examples in this document are now **implemented as live samples** in `/SampleData/formulaSamples.ts` (lines 4326+). You can test them directly in the Formula Editor!

**Live Samples Available:**
1. **Example 15: E-commerce Discount Calculator** → `phase58-discount-calculator`
2. **Example 16: Employee Bonus Calculation** → `phase58-employee-bonus`
3. **Example 17: Shipping Cost Calculator** → `phase58-shipping-cost`
4. **Example 18: Loan Approval Decision** → `phase58-loan-approval` (mapped to Example 11 in this doc)
5. **Example 20: Insurance Premium Calculator** → `phase58-insurance-premium`

---

## Table of Contents

1. [Simple Conditionals](#simple-conditionals)
2. [Assignment Syntax](#assignment-syntax)
3. [Switch-Case Style](#switch-case-style)
4. [Nested Conditionals](#nested-conditionals)
5. [Loops](#loops)
6. [Real-World Examples](#real-world-examples)

---

## Simple Conditionals

### Example 1: Basic If-Otherwise (Single Line)

**Natural Syntax:**
```typescript
if the 'age' is greater than or equal to 18, then set 'can vote' to true, otherwise set 'can vote' to false
```

**Equivalent Old Syntax:**
```typescript
IF 'age' >= 18 THEN
  'can vote' = TRUE
ELSE
  'can vote' = FALSE
END
```

---

### Example 2: Basic If-Otherwise (Multi-Line)

**Natural Syntax:**
```typescript
if the 'error message' is empty, then
  set 'has error' to false
otherwise
  set 'has error' to true
```

**Equivalent Old Syntax:**
```typescript
IF 'error message' is empty THEN
  'has error' = FALSE
ELSE
  'has error' = TRUE
END
```

---

### Example 3: Conditional with Multiple Actions

**Natural Syntax:**
```typescript
if the 'age' is greater than 18, then
  set 'can vote' to true,
  set 'voting age reached' to true,
  set 'status' to "eligible"
otherwise
  set 'can vote' to false,
  set 'status' to "not eligible"
```

**Equivalent Old Syntax:**
```typescript
IF 'age' > 18 THEN
  'can vote' = TRUE
  'voting age reached' = TRUE
  'status' = "eligible"
ELSE
  'can vote' = FALSE
  'status' = "not eligible"
END
```

---

## Assignment Syntax

### Example 4: Set X to Y

**Natural Syntax:**
```typescript
set 'customer status' to "active"
set 'total' to 100
set 'discount rate' to 0.15
```

**Equivalent Old Syntax:**
```typescript
'customer status' = "active"
'total' = 100
'discount rate' = 0.15
```

---

### Example 5: X is set to Y

**Natural Syntax:**
```typescript
'customer status' is set to "active"
'total' is set to 100
'discount rate' is set to 0.15
```

**Equivalent Old Syntax:**
```typescript
'customer status' = "active"
'total' = 100
'discount rate' = 0.15
```

---

### Example 6: Complex Expressions

**Natural Syntax:**
```typescript
set 'final price' to the 'original price' times (1 minus the 'discount')
set 'tax amount' to the 'subtotal' times the 'tax rate'
set 'total' to the 'subtotal' plus the 'tax amount'
```

**Equivalent Old Syntax:**
```typescript
'final price' = 'original price' * (1 - 'discount')
'tax amount' = 'subtotal' * 'tax rate'
'total' = 'subtotal' + 'tax amount'
```

---

## Switch-Case Style

### Example 7: Simple Status Check

**Natural Syntax:**
```typescript
if 'status' is "pending", then set 'color' to "yellow";
if 'status' is "approved", then set 'color' to "green";
if 'status' is "rejected", then set 'color' to "red";
otherwise set 'color' to "gray"
```

**Equivalent Old Syntax:**
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

**Why This is Better:**
- Reads like a series of independent checks
- "otherwise" clearly means "none of the above"
- Semicolons separate distinct statements naturally
- No nested END keyword needed

---

### Example 8: Customer Tier Discount

**Natural Syntax:**
```typescript
if the 'customer tier' is "platinum", then set 'discount' to 0.20;
if the 'customer tier' is "gold", then set 'discount' to 0.15;
if the 'customer tier' is "silver", then set 'discount' to 0.10;
otherwise set 'discount' to 0.05
```

**Equivalent Old Syntax:**
```typescript
IF 'customer tier' = "platinum" THEN
  'discount' = 0.20
ELSEIF 'customer tier' = "gold" THEN
  'discount' = 0.15
ELSEIF 'customer tier' = "silver" THEN
  'discount' = 0.10
ELSE
  'discount' = 0.05
END
```

---

### Example 9: Priority Level with Actions

**Natural Syntax:**
```typescript
if the 'priority' is "critical", then
  set 'response time' to 1,
  set 'assigned team' to "senior",
  set 'escalate' to true;

if the 'priority' is "high", then
  set 'response time' to 4,
  set 'assigned team' to "standard";

if the 'priority' is "medium", then
  set 'response time' to 24;

otherwise
  set 'response time' to 72,
  set 'assigned team' to "support"
```

**Key Points:**
- Each condition is independent
- Semicolons separate the IF blocks
- Multiple actions per condition using commas
- OTHERWISE handles default case

---

## Nested Conditionals

### Example 10: Nested Age and Membership Check

**Natural Syntax:**
```typescript
if the 'age' is greater than or equal to 18, then
  if the 'is member' is true, then
    set 'discount' to 0.15
  otherwise
    set 'discount' to 0.10
otherwise
  set 'discount' to 0
```

**Equivalent Old Syntax:**
```typescript
IF 'age' >= 18 THEN
  IF 'is member' = TRUE THEN
    'discount' = 0.15
  ELSE
    'discount' = 0.10
  END
ELSE
  'discount' = 0
END
```

---

### Example 11: Loan Approval Logic

**Natural Syntax:**
```typescript
if the 'credit score' is greater than or equal to 750, then
  set 'approved' to true,
  set 'interest rate' to 0.035
otherwise
  if the 'credit score' is greater than or equal to 650 and the 'income' is greater than 50000, then
    set 'approved' to true,
    set 'interest rate' to 0.045
  otherwise
    set 'approved' to false,
    set 'interest rate' to 0
```

**Equivalent Old Syntax:**
```typescript
IF 'credit score' >= 750 THEN
  'approved' = TRUE
  'interest rate' = 0.035
ELSE
  IF 'credit score' >= 650 AND 'income' > 50000 THEN
    'approved' = TRUE
    'interest rate' = 0.045
  ELSE
    'approved' = FALSE
    'interest rate' = 0
  END
END
```

---

## Loops

### Example 12: For Each Loop

**Natural Syntax:**
```typescript
for each 'item' in 'items',
  set 'total' to the 'total' plus the 'item'
```

**Equivalent Old Syntax:**
```typescript
FOR $item IN 'items' DO
  'total' = 'total' + $item
END
```

---

### Example 13: While Loop

**Natural Syntax:**
```typescript
while the 'count' is less than 10,
  set 'count' to the 'count' plus 1
```

**Equivalent Old Syntax:**
```typescript
WHILE 'count' < 10 DO
  'count' = 'count' + 1
END
```

---

### Example 14: For Each with Conditional

**Natural Syntax:**
```typescript
for each 'order' in 'orders',
  if the 'total' of the 'order' is greater than 100, then
    set 'discount' to 0.10,
    set 'discounted price' to the 'total' of the 'order' times (1 minus the 'discount')
  otherwise
    set 'discounted price' to the 'total' of the 'order'
```

**Equivalent Old Syntax:**
```typescript
FOR $order IN 'orders' DO
  IF $order.'total' > 100 THEN
    'discount' = 0.10
    'discounted price' = $order.'total' * (1 - 'discount')
  ELSE
    'discounted price' = $order.'total'
  END
END
```

---

## Real-World Examples

### Example 15: E-commerce Discount Calculator

**Natural Syntax:**
```typescript
// Initialize variables
set 'base discount' to 0

// Determine loyalty discount
if the 'customer tier' is "platinum", then set 'base discount' to 0.20;
if the 'customer tier' is "gold", then set 'base discount' to 0.15;
if the 'customer tier' is "silver", then set 'base discount' to 0.10;
otherwise set 'base discount' to 0.05

// Add volume discount
if the 'order total' is greater than 1000, then
  set 'volume discount' to 0.05
otherwise
  set 'volume discount' to 0

// Calculate final discount
set 'total discount' to the 'base discount' plus the 'volume discount'

// Apply discount cap
if the 'total discount' is greater than 0.30, then
  set 'total discount' to 0.30

// Calculate final price
set 'final price' to the 'order total' times (1 minus the 'total discount')
```

---

### Example 16: Employee Bonus Calculation

**Natural Syntax:**
```typescript
// Determine performance multiplier
if the 'performance rating' is greater than or equal to 4.5, then
  set 'multiplier' to 1.5,
  set 'bonus message' to "Exceptional performance!"
otherwise
  if the 'performance rating' is greater than or equal to 3.5, then
    set 'multiplier' to 1.2,
    set 'bonus message' to "Great work!"
  otherwise
    if the 'performance rating' is greater than or equal to 2.5, then
      set 'multiplier' to 1.0,
      set 'bonus message' to "Good effort!"
    otherwise
      set 'multiplier' to 0.5,
      set 'bonus message' to "Improvement needed"

// Calculate base bonus
set 'base bonus' to the 'salary' times 0.10

// Apply multiplier
set 'final bonus' to the 'base bonus' times the 'multiplier'

// Add tenure bonus
if the 'years of service' is greater than 5, then
  set 'tenure bonus' to 1000,
  set 'final bonus' to the 'final bonus' plus the 'tenure bonus'
```

---

### Example 17: Shipping Cost Calculator

**Natural Syntax:**
```typescript
// Determine base shipping cost by weight
if the 'weight' is less than or equal to 1, then set 'base cost' to 5.00;
if the 'weight' is less than or equal to 5, then set 'base cost' to 10.00;
if the 'weight' is less than or equal to 10, then set 'base cost' to 15.00;
otherwise set 'base cost' to 20.00

// Determine speed multiplier
if the 'shipping speed' is "express", then set 'speed multiplier' to 1.5;
if the 'shipping speed' is "overnight", then set 'speed multiplier' to 2.0;
otherwise set 'speed multiplier' to 1.0

// Calculate final cost
set 'shipping cost' to the 'base cost' times the 'speed multiplier'

// Add distance surcharge
if the 'distance' is greater than 100, then
  set 'distance surcharge' to (the 'distance' minus 100) times 0.10,
  set 'shipping cost' to the 'shipping cost' plus the 'distance surcharge'
```

---

### Example 18: Credit Card Approval

**Natural Syntax:**
```typescript
// Initialize decision
set 'approved' to false
set 'credit limit' to 0
set 'apr' to 0

// Check credit score and income
if the 'credit score' is greater than or equal to 750 and the 'annual income' is greater than 75000, then
  set 'approved' to true,
  set 'credit limit' to 15000,
  set 'apr' to 15.99,
  set 'card tier' to "platinum"
otherwise
  if the 'credit score' is greater than or equal to 700 and the 'annual income' is greater than 50000, then
    set 'approved' to true,
    set 'credit limit' to 10000,
    set 'apr' to 18.99,
    set 'card tier' to "gold"
  otherwise
    if the 'credit score' is greater than or equal to 650 and the 'annual income' is greater than 30000, then
      set 'approved' to true,
      set 'credit limit' to 5000,
      set 'apr' to 21.99,
      set 'card tier' to "standard"
    otherwise
      set 'approved' to false,
      set 'denial reason' to "Credit score or income too low"

// Apply for secured card if denied
if the 'approved' is false and the 'credit score' is greater than 500, then
  set 'secured card offered' to true,
  set 'secured card message' to "Consider our secured card option"
```

---

### Example 19: Tax Bracket Calculator

**Natural Syntax:**
```typescript
// Calculate tax based on income brackets
if the 'income' is less than or equal to 10000, then
  set 'tax rate' to 0.10
otherwise
  if the 'income' is less than or equal to 40000, then
    set 'tax rate' to 0.12
  otherwise
    if the 'income' is less than or equal to 85000, then
      set 'tax rate' to 0.22
    otherwise
      if the 'income' is less than or equal to 165000, then
        set 'tax rate' to 0.24
      otherwise
        set 'tax rate' to 0.32

// Calculate base tax
set 'tax amount' to the 'income' times the 'tax rate'

// Apply deductions
if the 'has dependents' is true, then
  set 'deduction' to the count of 'dependents' times 2000,
  set 'tax amount' to the 'tax amount' minus the 'deduction'

// Ensure tax is not negative
if the 'tax amount' is less than 0, then
  set 'tax amount' to 0
```

---

### Example 20: Insurance Premium Calculator

**Natural Syntax:**
```typescript
// Start with base premium
set 'base premium' to 500

// Age factor
if the 'age' is less than 25, then set 'age factor' to 1.5;
if the 'age' is less than 35, then set 'age factor' to 1.2;
if the 'age' is less than 50, then set 'age factor' to 1.0;
otherwise set 'age factor' to 1.3

// Driving record factor
if the 'accidents' is equal to 0 and the 'tickets' is equal to 0, then
  set 'record factor' to 0.9,
  set 'safe driver discount' to true
otherwise
  if the 'accidents' is greater than 2 or the 'tickets' is greater than 3, then
    set 'record factor' to 1.5,
    set 'high risk' to true
  otherwise
    set 'record factor' to 1.2

// Calculate premium
set 'premium' to the 'base premium' times the 'age factor' times the 'record factor'

// Apply multi-policy discount
if the 'has home insurance' is true, then
  set 'multi policy discount' to 0.10,
  set 'premium' to the 'premium' times (1 minus the 'multi policy discount')

// Round to nearest dollar
set 'final premium' to the 'premium'
```

---

## Comparison: Before and After

### Before (Traditional Syntax)
```typescript
IF $creditScore >= 750 THEN
  IF $income > 100000 THEN
    $approved = TRUE
    $rate = 0.035
  ELSE
    $approved = TRUE
    $rate = 0.040
  END
ELSIF $creditScore >= 650 THEN
  IF $income > 50000 THEN
    $approved = TRUE
    $rate = 0.055
  ELSE
    $approved = FALSE
    $rate = 0
  END
ELSE
  $approved = FALSE
  $rate = 0
END
```

### After (Natural Language Syntax)
```typescript
if the 'credit score' is greater than or equal to 750, then
  if the 'income' is greater than 100000,
    then set 'approved' to true, set 'rate' to 0.035
    otherwise set 'approved' to true, set 'rate' to 0.040
otherwise
  if the 'credit score' is greater than or equal to 650, then
    if the 'income' is greater than 50000,
      then set 'approved' to true, set 'rate' to 0.055
      otherwise set 'approved' to false, set 'rate' to 0
  otherwise
    set 'approved' to false,
    set 'rate' to 0
```

**Key Improvements:**
- ✅ Reads like natural English
- ✅ No END keywords to track
- ✅ "otherwise" is more intuitive than ELSE
- ✅ "set X to Y" is conversational
- ✅ Commas separate actions naturally
- ✅ Articles (the) make it flow better

---

## Style Recommendations

### When to Use Single-Line vs Multi-Line

**Single-Line (Simple Conditionals):**
```typescript
if the 'age' is greater than 18, then set 'can vote' to true, otherwise set 'can vote' to false
```

**Multi-Line (Complex Logic):**
```typescript
if the 'age' is greater than 18, then
  set 'can vote' to true,
  set 'voting age reached' to true
otherwise
  set 'can vote' to false
```

### When to Use Switch-Case Style

**Use for:**
- Status checks
- Tier/category selection
- Priority levels
- Any "if this value, then that" pattern

**Example:**
```typescript
if 'status' is "pending", then set 'color' to "yellow";
if 'status' is "approved", then set 'color' to "green";
if 'status' is "rejected", then set 'color' to "red";
otherwise set 'color' to "gray"
```

### When to Use Nested Conditionals

**Use for:**
- Multi-criteria decisions
- Progressive filtering
- Dependent conditions

**Example:**
```typescript
if the 'is member' is true, then
  if the 'purchase amount' is greater than 100,
    then set 'discount' to 0.20
    otherwise set 'discount' to 0.10
otherwise
  set 'discount' to 0
```

---

## Migration Tips

1. **Start with "otherwise"** - Easiest change, most readable
2. **Use "set X to Y" for new assignments** - More conversational
3. **Try switch-case style** - Great for status/tier logic
4. **Add articles gradually** - "the" prefix improves flow
5. **Mix styles as needed** - Old syntax still works!

---

## Testing Checklist

When implementing Phase 5.8, test these patterns:

- [ ] Simple if-otherwise (single line)
- [ ] Simple if-otherwise (multi-line)
- [ ] Multiple actions with commas
- [ ] "set X to Y" assignment
- [ ] "X is set to Y" assignment
- [ ] Switch-case style (sequential IF + OTHERWISE)
- [ ] Nested conditionals with otherwise
- [ ] For each loops
- [ ] While loops
- [ ] Articles (the, a, an)
- [ ] Complex real-world examples
- [ ] Mixed old and new syntax

---

**Status:** Examples Complete ✅  
**Next:** Implement parser support for these patterns