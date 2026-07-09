# Phase 5.8: Natural Language Control Structures - Quick Reference

**One-page reference for natural language syntax patterns**

---

## ✅ Already Working (Phase 5.1-5.7)

```typescript
// Natural language operators
if the 'age' is greater than 18
if the 'name' starts with "A"
if the 'status' is equal to "active"

// Natural language functions
the sum of 'x', 'y', 'z'
the average of 'scores'
the first item in 'list'
the length of 'text'
```

---

## 🎯 Phase 5.8 New Syntax

### 1. OTHERWISE (✅ Tokenizer Ready)

**Instead of:**
```typescript
IF condition THEN
  action
ELSE
  alternative
END
```

**Use:**
```typescript
if condition, then
  action
otherwise
  alternative
```

---

### 2. SET X TO Y (⏳ Parser Needed)

**Instead of:**
```typescript
'customer status' = "active"
'total' = 100
```

**Use:**
```typescript
set 'customer status' to "active"
set 'total' to 100
```

**Or:**
```typescript
'customer status' is set to "active"
'total' is set to 100
```

---

### 3. Switch-Case Style (⏳ Parser Needed)

**Instead of:**
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

**Use:**
```typescript
if 'status' is "pending", then set 'color' to "yellow";
if 'status' is "approved", then set 'color' to "green";
if 'status' is "rejected", then set 'color' to "red";
otherwise set 'color' to "gray"
```

---

### 4. Optional END (⏳ Parser Needed)

**Instead of:**
```typescript
IF 'age' > 18 THEN
  'can vote' = TRUE
END
```

**Use (END is optional):**
```typescript
if 'age' is greater than 18, then
  set 'can vote' to true
```

---

### 5. Comma-Separated Actions (⏳ Parser Needed)

**Instead of:**
```typescript
IF condition THEN
  action1
  action2
  action3
END
```

**Use:**
```typescript
if condition, then
  action1,
  action2,
  action3
```

---

### 6. Articles (✅ Tokenizer Ready, ⏳ Parser Needed)

**Without articles:**
```typescript
if 'age' is greater than 18
```

**With articles (more natural):**
```typescript
if the 'age' is greater than 18
```

---

## 📋 Common Patterns

### Pattern 1: Simple Conditional
```typescript
if the 'age' is greater than or equal to 18, then set 'can vote' to true, otherwise set 'can vote' to false
```

### Pattern 2: Multi-Action Conditional
```typescript
if the 'is member' is true, then
  set 'discount' to 0.15,
  set 'free shipping' to true,
  set 'points earned' to the 'purchase amount' times 2
otherwise
  set 'discount' to 0,
  set 'free shipping' to false,
  set 'points earned' to the 'purchase amount'
```

### Pattern 3: Nested Conditional
```typescript
if the 'credit score' is greater than or equal to 750, then
  set 'approved' to true,
  set 'rate' to 0.035
otherwise
  if the 'credit score' is greater than or equal to 650, then
    set 'approved' to true,
    set 'rate' to 0.045
  otherwise
    set 'approved' to false
```

### Pattern 4: Switch-Case
```typescript
if the 'tier' is "platinum", then set 'discount' to 0.20;
if the 'tier' is "gold", then set 'discount' to 0.15;
if the 'tier' is "silver", then set 'discount' to 0.10;
otherwise set 'discount' to 0.05
```

### Pattern 5: Complex Expression
```typescript
set 'final price' to the 'original price' times (1 minus the 'discount')
set 'tax' to the 'subtotal' times the 'tax rate'
set 'total' to the 'subtotal' plus the 'tax'
```

---

## 🔄 Mixing Old and New Syntax

**100% backward compatible - mix styles freely:**

```typescript
// Old style assignment
'x' = 100

// New style assignment
set 'y' to 200

// Old style conditional with new OTHERWISE
IF 'condition' THEN
  'result' = TRUE
OTHERWISE
  'result' = FALSE
END

// New style conditional with old assignment
if 'condition', then
  'result' = TRUE
otherwise
  'result' = FALSE
```

---

## 🚀 Quick Start

### 1. Start Using OTHERWISE Today
Simply replace `ELSE` with `OTHERWISE` in your formulas. Already supported!

```typescript
// Change this:
if condition then
  action
else
  alternative

// To this:
if condition then
  action
otherwise
  alternative
```

### 2. Try SET X TO Y (Coming Soon)
More readable assignment syntax:

```typescript
set 'customer name' to "John Doe"
set 'order total' to 1500
set 'is processed' to true
```

### 3. Use Switch-Case Style (Coming Soon)
Perfect for status/tier checks:

```typescript
if 'status' is "pending", then set 'color' to "yellow";
if 'status' is "complete", then set 'color' to "green";
otherwise set 'color' to "gray"
```

---

## 📊 Implementation Status

| Feature | Tokenizer | Parser | Evaluator | Status |
|---------|-----------|--------|-----------|--------|
| OTHERWISE | ✅ | ⏳ | ✅ | 90% |
| SET X TO Y | ✅ | ⏳ | ✅ | 60% |
| X IS SET TO Y | ✅ | ⏳ | ✅ | 60% |
| Articles (the, a, an) | ✅ | ⏳ | ✅ | 60% |
| Optional END | ✅ | ⏳ | ✅ | 30% |
| Comma actions | ✅ | ⏳ | ✅ | 30% |
| Switch-case style | ✅ | ⏳ | ✅ | 20% |
| For each loops | ✅ | ⏳ | ✅ | 20% |
| While loops | ✅ | ⏳ | ✅ | 20% |

**Legend:**
- ✅ Complete
- ⏳ In Progress / Planned
- ❌ Not Started

---

## 🎓 Learning Path

### Level 1: Start with OTHERWISE
Replace ELSE with OTHERWISE - it's more intuitive!

### Level 2: Try SET X TO Y
Use natural assignment syntax for new formulas.

### Level 3: Switch-Case Patterns
Use for status checks and tier selections.

### Level 4: Full Natural Flow
Combine all features for maximum readability.

---

## 💡 Why Phase 5.8?

**Before:**
```typescript
IF $creditScore >= 750 THEN
  $approved = TRUE
  $rate = 0.035
ELSE
  $approved = FALSE
  $rate = 0
END
```

**After:**
```typescript
if the 'credit score' is greater than or equal to 750, then
  set 'approved' to true,
  set 'rate' to 0.035
otherwise
  set 'approved' to false,
  set 'rate' to 0
```

**Result:** Formulas that read like you're explaining them to a colleague! 🎉

---

## 📚 More Resources

- **Full Requirements:** `/planning/requirements/PHASE5-8-NaturalControlStructures.md`
- **20+ Examples:** `/planning/requirements/PHASE5-8-Examples.md`
- **Implementation Status:** `/planning/requirements/PHASE5-8-ImplementationStatus.md`
- **BAL Samples:** `/SampleData/balSamples.ts` (already using OTHERWISE!)

---

**Remember:** All new syntax is *optional* - use what makes your formulas most readable!
