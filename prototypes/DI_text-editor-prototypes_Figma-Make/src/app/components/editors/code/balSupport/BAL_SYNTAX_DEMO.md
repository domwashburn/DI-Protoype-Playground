# BAL Syntax Highlighting Demo

Visual guide showing syntax highlighting differences between Formula and BAL modes.

## Formula Mode Syntax

```formula
// Calculate shipping cost
$subtotal = order.quantity * order.unitPrice
$discount = IF($subtotal > 100, $subtotal * 0.10, 0)
$shipping = IF(order.weight > 5, 15.00, 5.00)
$total = $subtotal - $discount + $shipping

RETURN $total
```

**Highlighting:**
- `$subtotal`, `$discount`, `$shipping`, `$total` - **Purple** (variables with `$`)
- `order.quantity`, `order.unitPrice`, `order.weight` - **Blue** (attributes)
- `IF`, `RETURN` - **Blue** (functions/keywords)
- `100`, `0.10`, `0`, `15.00`, `5.00` - **Purple** (numbers)
- `>`, `-`, `+`, `*` - **Pink** (operators)
- `// Calculate shipping cost` - **Gray italic** (comments)

---

## BAL Mode Syntax

```bal
// Calculate employee bonus
if employee.salary is greater than 50000 and employee.years of service >= 5 then
  set bonus to employee.salary multiplied by 0.10
else
  set bonus to employee.salary multiplied by 0.05
end

return bonus
```

**Highlighting:**
- `bonus` - **Purple** (variable, no `$` prefix)
- `employee.salary`, `employee.years of service` - **Purple** (attributes with dot-notation)
- `if`, `then`, `else`, `end`, `set`, `to`, `return` - **Blue bold** (keywords)
- `is greater than`, `multiplied by` - **Pink italic** (natural language operators)
- `50000`, `5`, `0.10`, `0.05` - **Purple** (numbers)
- `and`, `>=` - **Pink** (operators)
- `// Calculate employee bonus` - **Gray italic** (comments)

---

## Side-by-Side Comparison

### Variable Assignment

| Formula Mode | BAL Mode |
|-------------|----------|
| `$total = $price * 1.05` | `set total to price times 1.05` |
| **Purple:** `$total`, `$price` | **Purple:** `total`, `price` (no `$`) |

### Conditionals

| Formula Mode | BAL Mode |
|-------------|----------|
| `IF($age > 18, "adult", "minor")` | `if age > 18 then "adult" else "minor"` |
| **Blue:** `IF` | **Blue bold:** `if`, `then`, `else` |
| **Purple:** `$age` | **Purple:** `age` (no `$`) |

### Attribute Access

| Formula Mode | BAL Mode |
|-------------|----------|
| `#customer.age` | `customer.age` |
| **Blue:** `#customer.age` | **Purple:** `customer.age` (no `#`) |

### Natural Language

| Formula Mode | BAL Mode |
|-------------|----------|
| `$total + $tax` | `total plus tax` |
| **Pink:** `+` | **Pink italic:** `plus` |

---

## Color Scheme

All colors follow IBM Carbon Design System:

| Token Type | Color | Hex | Weight | Style |
|-----------|-------|-----|--------|-------|
| Keyword | Blue | `#0f62fe` | 600 (bold) | Normal |
| Variable | Purple | `#8a3ffc` | 500 | Normal |
| Attribute | Purple | `#8a3ffc` | 600 (bold) | Normal |
| Number | Purple | `#8a3ffc` | 400 | Normal |
| String | Green | `#198038` | 400 | Normal |
| Operator (symbolic) | Pink | `#d12771` | 600 (bold) | Normal |
| Operator (natural) | Pink | `#d12771` | 400 | Italic |
| Comment | Gray | `#6f6f6f` | 400 | Italic |
| Verbalization | Green | `#198038` | 500 | Italic |
| Vocabulary | Purple | `#8a3ffc` | 600 (bold) | Underline dotted |

---

## Complex Example

### Formula Mode
```formula
// Advanced pricing with multiple tiers
$basePrice = #product.price
$quantity = #order.quantity
$customerTier = #customer.loyaltyTier

$discount = IF($customerTier == "platinum", 0.20,
                IF($customerTier == "gold", 0.15,
                   IF($customerTier == "silver", 0.10, 0.05)))

$volumeDiscount = IF($quantity >= 100, 0.10,
                     IF($quantity >= 50, 0.05, 0))

$finalPrice = $basePrice * $quantity * (1 - $discount) * (1 - $volumeDiscount)

RETURN $finalPrice
```

### BAL Mode (Equivalent)
```bal
// Advanced pricing with multiple tiers
if customer.loyaltyTier is equal to "platinum" then
  set discount to 0.20
elsif customer.loyaltyTier is equal to "gold" then
  set discount to 0.15
elsif customer.loyaltyTier is equal to "silver" then
  set discount to 0.10
else
  set discount to 0.05
end

if order.quantity is greater than or equal to 100 then
  set volumeDiscount to 0.10
elsif order.quantity is greater than or equal to 50 then
  set volumeDiscount to 0.05
else
  set volumeDiscount to 0
end

set basePrice to product.price
set finalPrice to basePrice multiplied by order.quantity 
  multiplied by (1 minus discount)
  multiplied by (1 minus volumeDiscount)

return finalPrice
```

**Note:** Both examples produce identical results, but BAL mode:
- ✅ No `$` or `#` prefixes
- ✅ Natural language operators
- ✅ More readable for business users
- ✅ Longer but clearer intent

---

## Implementation Notes

### Regex Patterns

**Formula Variables:**
```regex
/\$[a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*/g
```
Matches: `$variable`, `$variable.property`

**BAL Variables:**
```regex
/\b(?!(?:if|then|else|...)\b)[a-zA-Z_][a-zA-Z0-9_]*(?!\.[a-zA-Z_])\b/g
```
Matches: `variable` (excluding keywords and attribute parts)

**BAL Natural Language Operators:**
```regex
/\b(is\s+greater\s+than|is\s+equal\s+to|multiplied\s+by|plus|minus|...)\b/gi
```
Matches: Multi-word operators

### Priority System

Higher priority wins overlaps:
1. Comments (10)
2. Natural language functions (9)
3. Natural language operators (8)
4. Variables (Formula: 6, BAL: 4)
5. Attributes (5)
6. Keywords (3)

BAL variables have lower priority (4) to avoid conflicts with attributes.

---

## User Experience

### For Business Users (BAL Mode)
- Natural language reads like English
- No confusing `$` or `#` symbols
- Familiar conditional structure
- Clear variable assignments

### For Technical Users (Formula Mode)
- Concise syntax
- Familiar to Excel/programming users
- Clear variable/attribute distinction
- Powerful function library

### Switching Modes
```tsx
<FormulaEditor mode="formula" ... />  // Technical users
<FormulaEditor mode="bal" ... />      // Business users
```

Both modes use the same evaluation engine and produce identical results.
