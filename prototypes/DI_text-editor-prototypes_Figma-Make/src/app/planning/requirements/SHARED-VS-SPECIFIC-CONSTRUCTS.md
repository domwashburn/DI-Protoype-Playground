# Shared vs BAL-Specific vs Formula-Specific Constructs

**Date:** November 13, 2025  
**Purpose:** Clarify what's SHARED vs mode-specific to avoid duplication  

---

## ✅ SHARED (Both Formula AND BAL)

### Natural Language Operators
```tsx
'is greater than',
'is less than',
'is equal to',
'is not equal to',
'is greater than or equal to',
'is less than or equal to',
'is null',
'is not null',
'is empty',
'is not empty',
'starts with',
'ends with',
'contains',
'does not contain',
'plus',
'minus',
'times',
'multiplied by',
'divided by',
'mod',
'to the power of',
```

**Used in Formula:**
```formula
$age is greater than 18
$name contains "Smith"
$total is empty
```

**Used in BAL:**
```bal
if employee.age is greater than 18 then
  eligible
```

### Natural Language Functions
```tsx
'the sum of',
'the average of',
'the count of',
'the maximum of',
'the minimum of',
'the total of',
'the first of',
'the last of',
'the length of',
'the size of',
'the floor of',
'the round of',
'the ceiling of',
'the uppercase of',
'the lowercase of',
'the absolute value of',
'the first element of',
'the last element of',
'the square root of',
'the first item in',
'the last item in',
```

**Used in Formula:**
```formula
$total = the sum of ($price, $tax, $shipping)
$avg = the average of $scores
```

**Used in BAL:**
```bal
set the total to the sum of (base amount, bonus amount)
```

### Symbolic Operators
```tsx
'+', '-', '*', '/', '%',
'=', '<', '>', '<=', '>=', '!=', '==',
'&&', '||', '!',
```

**Used in Both:**
```formula
$total = $base + $bonus
```
```bal
if salary > 50000 then
```

### Standard Formula Functions
```tsx
'SUM', 'AVG', 'COUNT', 'MAX', 'MIN',
'FIRST', 'LAST', 'LENGTH', 'FLOOR', 'ROUND', 'CEILING',
'UPPER', 'LOWER', 'ABS', 'SQRT',
// ... etc
```

**Used in Formula:**
```formula
$total = SUM($amounts)
```

**Used in BAL (can call formulas!):**
```bal
if SUM(employee.bonuses) > 10000 then
  review required
```

### Vocabulary Mappings (User-Defined Terms)
```tsx
// User defines:
'customer name' → #customer.name
'total amount' → #order.total
'credit score' → #applicant.creditScore
```

**Used in Formula:**
```formula
$eligible = the credit score is greater than 700
```

**Used in BAL:**
```bal
if the credit score is greater than 700 then
  approved
```

---

## 🔵 BAL-SPECIFIC Only

### Control Flow Keywords
```tsx
'if',
'then',
'else',
'elsif',
'elseif',
'otherwise',
'end',
```

**BAL Only:**
```bal
if condition then
  action
else
  other action
end
```

**NOT in Formula** - Formula is expression-based, no control flow statements

### Statement Keywords
```tsx
'set',
'define',
'return',
```

**BAL Only:**
```bal
set the bonus to 5000
define function calculate_bonus
return the total
```

**NOT in Formula** - Formula uses `$var = expr` for assignment, not `set`

### Iteration Keywords
```tsx
'for',
'each',
'in',
'while',
'do',
```

**BAL Only:**
```bal
for each employee in employees
  process employee
```

**NOT in Formula** - Formula doesn't have loops (uses array functions instead)

### Attributes with Dot Notation
```tsx
'employee.salary',
'employee.department',
'employee.years of service',
'request.type',
'request.duration',
```

**BAL Specific:**
```bal
if employee.years of service > 5 then
```

**Formula uses #attributes:**
```formula
$years = #employee.yearsOfService  // camelCase, # prefix
```

**Different syntax!**

---

## 🟢 FORMULA-SPECIFIC Only

### Variable Assignment with $
```tsx
'$variableName = expression'
```

**Formula Only:**
```formula
$total = #price + #tax
$eligible = $age > 18
```

**BAL uses `set` instead:**
```bal
set the total to price + tax
```

### Variable References with $ Prefix
```tsx
'$variableName'
```

**Formula:**
```formula
$total = $subtotal + $tax
```

**BAL doesn't use $ for variables** - uses natural language references or `the variableName`

### Attribute References with # Prefix
```tsx
'#attributeName'
```

**Formula:**
```formula
$age = #customer.age
```

**BAL uses dot notation without #:**
```bal
if customer.age > 18 then
```

### Debug/Ghost Values
**Formula Only** - Shows intermediate values and step-by-step evaluation

### Variable Table UI
**Formula Only** - Manages variable definitions

---

## Autocomplete Strategy (CORRECTED)

### Formula Mode Autocomplete:
```tsx
const formulaAutocomplete = [
  // Formula-specific
  ...variables.map(v => ({ label: `$${v.name}`, type: 'variable' })),
  ...attributes.map(a => ({ label: `#${a.name}`, type: 'attribute' })),
  
  // SHARED (both modes use these!)
  ...NL_OPERATORS.map(op => ({ label: op, type: 'operator' })),
  ...NL_FUNCTIONS.map(fn => ({ label: fn, type: 'function' })),
  ...STANDARD_FUNCTIONS.map(f => ({ label: f, type: 'function' })),
  ...vocabularyMappings.map(v => ({ label: v.term, type: 'vocabulary' })),
];
```

### BAL Mode Autocomplete:
```tsx
const balAutocomplete = [
  // BAL-specific
  ...BAL_CONTROL_KEYWORDS.map(k => ({ label: k, type: 'keyword' })),
  ...BAL_STATEMENT_KEYWORDS.map(k => ({ label: k, type: 'keyword' })),
  ...BAL_ATTRIBUTES.map(a => ({ label: a.text, type: 'attribute' })),
  
  // SHARED (both modes use these!)
  ...NL_OPERATORS.map(op => ({ label: op, type: 'operator' })),
  ...NL_FUNCTIONS.map(fn => ({ label: fn, type: 'function' })),
  ...STANDARD_FUNCTIONS.map(f => ({ label: f, type: 'function' })),
  ...vocabularyMappings.map(v => ({ label: v.term, type: 'vocabulary' })),
];
```

**Notice:**
- Natural language operators/functions are in **BOTH** modes ✅
- Standard functions are in **BOTH** modes ✅
- Vocabulary mappings are in **BOTH** modes ✅
- Only control flow keywords are BAL-specific
- Only $ variables and # attributes are Formula-specific

---

## What This Means for Implementation

### ❌ WRONG (What I Was Suggesting):
```tsx
if (mode === 'bal') {
  return [
    ...balKeywords,        // BAL-specific ✅
    ...balNlOperators,     // ❌ NOT BAL-specific! SHARED!
    ...balNlFunctions,     // ❌ NOT BAL-specific! SHARED!
  ];
}
```

### ✅ CORRECT:
```tsx
// Shared constructs (ALWAYS include)
const sharedAutocomplete = [
  ...NL_OPERATORS,        // SHARED
  ...NL_FUNCTIONS,        // SHARED
  ...STANDARD_FUNCTIONS,  // SHARED
  ...vocabularyMappings,  // SHARED
];

if (mode === 'bal') {
  return [
    ...BAL_KEYWORDS,      // BAL-specific (if, then, else, set)
    ...BAL_ATTRIBUTES,    // BAL-specific (employee.salary)
    ...sharedAutocomplete // SHARED
  ];
} else {
  return [
    ...variables,         // Formula-specific ($var)
    ...attributes,        // Formula-specific (#attr)
    ...sharedAutocomplete // SHARED
  ];
}
```

---

## Code Structure (CORRECTED)

### File: `/components/editors/code/shared/vocabulary/sharedVocabulary.ts` (NEW!)
```tsx
/**
 * SHARED vocabulary used by BOTH Formula and BAL
 */
export const SHARED_NL_OPERATORS = [
  'is greater than',
  'is less than',
  'is equal to',
  // ... etc
];

export const SHARED_NL_FUNCTIONS = [
  'the sum of',
  'the average of',
  // ... etc
];

export const SHARED_STANDARD_FUNCTIONS = [
  'SUM', 'AVG', 'COUNT', 'MAX', 'MIN',
  'FIRST', 'LAST', 'LENGTH',
  // ... etc
];
```

### File: `/components/editors/code/balSupport/balVocabulary.ts` (UPDATED)
```tsx
/**
 * BAL-SPECIFIC vocabulary (control flow, statements)
 */
export const BAL_CONTROL_KEYWORDS = [
  'if', 'then', 'else', 'elsif', 'end'
];

export const BAL_STATEMENT_KEYWORDS = [
  'set', 'define', 'return'
];

export const BAL_ITERATION_KEYWORDS = [
  'for', 'each', 'in', 'while', 'do'
];

// Don't duplicate NL operators/functions here!
// Import from sharedVocabulary instead
```

### File: `/components/editors/code/FormulaEditor/FormulaEditor.tsx`
```tsx
import { 
  SHARED_NL_OPERATORS,
  SHARED_NL_FUNCTIONS,
  SHARED_STANDARD_FUNCTIONS
} from '../shared/vocabulary/sharedVocabulary';

import {
  BAL_CONTROL_KEYWORDS,
  BAL_STATEMENT_KEYWORDS,
  BAL_ATTRIBUTES
} from '../balSupport/balVocabulary';

const autocompleteItems = useMemo(() => {
  // SHARED items (both modes)
  const sharedItems = [
    ...SHARED_NL_OPERATORS.map(op => ({ label: op, type: 'operator' })),
    ...SHARED_NL_FUNCTIONS.map(fn => ({ label: fn, type: 'function' })),
    ...SHARED_STANDARD_FUNCTIONS.map(f => ({ label: f, type: 'function' })),
    ...(vocabularyMappings || []).map(v => ({ label: v.term, type: 'vocabulary' })),
  ];
  
  if (mode === 'bal') {
    return [
      // BAL-specific
      ...BAL_CONTROL_KEYWORDS.map(k => ({ label: k, type: 'keyword' })),
      ...BAL_STATEMENT_KEYWORDS.map(k => ({ label: k, type: 'keyword' })),
      ...BAL_ATTRIBUTES.map(a => ({ label: a.text, type: 'attribute' })),
      
      // SHARED
      ...sharedItems
    ];
  }
  
  // Formula mode
  return [
    // Formula-specific
    ...variables.map(v => ({ label: `$${v.name}`, type: 'variable' })),
    ...attributes.map(a => ({ label: `#${a.name}`, type: 'attribute' })),
    
    // SHARED
    ...sharedItems
  ];
}, [mode, variables, attributes, vocabularyMappings]);
```

---

## Summary

### 🎯 KEY INSIGHT:
Natural language operators and functions are **NOT** BAL-specific!

They are **SHARED** between Formula and BAL modes.

### What's Actually Different:

**BAL-specific:**
- Control flow: `if/then/else`
- Statements: `set/define/return`
- Dot notation attributes: `employee.salary`

**Formula-specific:**
- Variable assignment: `$var = expr`
- Variable references: `$var`
- Attribute references: `#attr`

**SHARED (both modes):**
- Natural language operators: `is greater than`, `contains`, etc.
- Natural language functions: `the sum of`, `the average of`, etc.
- Standard functions: `SUM`, `AVG`, etc.
- Vocabulary mappings: user-defined terms

### Implementation Impact:
- Create `sharedVocabulary.ts` for common items
- Don't duplicate NL operators/functions in `balVocabulary.ts`
- Both modes import from shared vocabulary
- Only add mode-specific items to autocomplete

**This avoids duplication and ensures consistency!** ✅
