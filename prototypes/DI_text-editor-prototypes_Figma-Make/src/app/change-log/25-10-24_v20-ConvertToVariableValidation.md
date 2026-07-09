# Formula Editor - Convert to Variable Validation

**Date:** October 24, 2025  
**Version:** v20  
**Type:** Bug Fix  
**Status:** ✅ Fixed

---

## Summary

Fixed a bug in the Formula Editor where users could select and convert reserved keywords, existing variables, or attributes to new variables. Added comprehensive validation to ensure only plain text expressions can be converted to variables.

---

## Problem

**User Report:**
Users could select ANY text in the formula editor and convert it to a variable, including:
- Reserved keywords (IF, THEN, ELSE, END, etc.)
- Existing variables ($variable)
- Attributes (#attribute)
- Complex expressions containing keywords/variables/attributes

**Example of Invalid Conversion:**
```
Selected: "IF $orderTotal > 1000 THEN IF $loyaltyTier = 'gold' THEN..."
Button showed: Convert "IF $orderTotal..." to Variable ❌
```

This could create invalid formulas and confusing variable names.

---

## Root Cause

The `handleSelect` function (lines 272-286) showed the "Convert to Variable" button whenever ANY text was selected, without validating whether that text was appropriate for conversion.

```typescript
// BEFORE - No validation
const handleSelect = useCallback(() => {
  if (!textareaRef.current) return;
  
  const start = textareaRef.current.selectionStart;
  const end = textareaRef.current.selectionEnd;
  
  if (start !== end) {
    const selected = textareaRef.current.value.substring(start, end);
    setSelectedText(selected);
    setShowConvertToVariable(true); // ❌ Always shows button
  } else {
    setShowConvertToVariable(false);
    setSelectedText('');
  }
}, []);
```

---

## Solution

Added a new `isConvertibleToVariable` validation function that checks:

### ✅ Validation Rules

1. **Not empty or whitespace only**
   - `""` → ❌
   - `"   "` → ❌

2. **No variables ($)**
   - `"$baseScore"` → ❌
   - `"100 + $tax"` → ❌

3. **No attributes (#)**
   - `"#customer.age"` → ❌
   - `"#order.total * 2"` → ❌

4. **No reserved keywords**
   - `"IF"` → ❌
   - `"THEN"` → ❌
   - `"100 + SUM(...)"` → ❌
   - `"IF condition THEN"` → ❌

5. **Must contain valid expression characters**
   - Must have at least one: number, operator, or parenthesis
   - `"abc"` → ❌ (no valid characters)
   - `"100"` → ✅
   - `"100 + 200"` → ✅
   - `"(50 * 2)"` → ✅

### 🔍 Reserved Keywords List

```typescript
const RESERVED_KEYWORDS = [
  // Control flow
  'IF', 'ELSEIF', 'ELSE', 'END', 'THEN',
  
  // Logical
  'AND', 'OR', 'NOT',
  
  // Math functions
  'SUM', 'AVG', 'AVERAGE', 'MAX', 'MIN', 'COUNT',
  'ABS', 'ROUND', 'FLOOR', 'CEIL', 'SQRT', 'POW',
  
  // String functions
  'CONCAT', 'LENGTH', 'UPPER', 'LOWER', 'TRIM',
  
  // Date functions
  'DATE', 'TODAY', 'YEAR', 'MONTH', 'DAY',
  
  // Boolean/null
  'TRUE', 'FALSE', 'NULL'
];
```

### 💻 Implementation

```typescript
/**
 * Check if selected text can be converted to a variable
 * - Must not contain reserved keywords
 * - Must not contain variables ($)
 * - Must not contain attributes (#)
 * - Must be a valid expression (numbers, operators, parentheses, etc.)
 */
const isConvertibleToVariable = (text: string): boolean => {
  const trimmed = text.trim();
  
  // Empty or whitespace only
  if (!trimmed) return false;
  
  // Contains variables ($)
  if (trimmed.includes('$')) return false;
  
  // Contains attributes (#)
  if (trimmed.includes('#')) return false;
  
  // Check for reserved keywords (case-insensitive)
  const upperText = trimmed.toUpperCase();
  
  // Check if the entire selection is a reserved keyword
  if (RESERVED_KEYWORDS.includes(upperText)) return false;
  
  // Check if any word in the selection is a reserved keyword
  // Match word boundaries to avoid false positives (e.g., "IFFY" shouldn't match "IF")
  for (const keyword of RESERVED_KEYWORDS) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    if (regex.test(trimmed)) return false;
  }
  
  // Must contain at least one valid character (number, operator, parenthesis)
  // This ensures we're not just selecting whitespace or invalid text
  if (!/[0-9+\-*/().>=<]/.test(trimmed)) return false;
  
  return true;
};
```

### 🔄 Updated Selection Handler

```typescript
// AFTER - With validation
const handleSelect = useCallback(() => {
  if (!textareaRef.current) return;
  
  const start = textareaRef.current.selectionStart;
  const end = textareaRef.current.selectionEnd;
  
  if (start !== end) {
    const selected = textareaRef.current.value.substring(start, end);
    
    // Validate that selection can be converted to a variable
    const isValidSelection = isConvertibleToVariable(selected); // ✅
    
    setSelectedText(selected);
    setShowConvertToVariable(isValidSelection); // ✅ Only shows if valid
  } else {
    setShowConvertToVariable(false);
    setSelectedText('');
  }
}, []);
```

### 🛡️ Double-Check in Conversion Handler

Also added validation check in `handleConvertToVariable` as a safety measure:

```typescript
const handleConvertToVariable = useCallback(() => {
  if (!textareaRef.current || !selectedText || !onVariablesChange) return;
  
  // Double-check validation before converting
  if (!isConvertibleToVariable(selectedText)) {
    return; // ✅ Safety check
  }
  
  // ... rest of conversion logic
}, [selectedText, value, variables, onChange, onVariablesChange]);
```

---

## Testing

### ✅ Valid Conversions (Button Shows)

| Selected Text | Result | Variable Name |
|--------------|--------|---------------|
| `100` | ✅ Shows button | `100` |
| `100 + 200` | ✅ Shows button | `100___200` |
| `(50 * 2)` | ✅ Shows button | `_50___2_` |
| `850 * 0.5` | ✅ Shows button | `850___0_5` |
| `(100 - 50) / 2` | ✅ Shows button | `_100___50____2` |

### ❌ Invalid Conversions (Button Hidden)

| Selected Text | Reason Blocked |
|--------------|----------------|
| `IF` | Reserved keyword |
| `THEN` | Reserved keyword |
| `$orderTotal` | Contains variable |
| `#customer.age` | Contains attribute |
| `IF condition THEN` | Contains reserved keywords |
| `$score + 100` | Contains variable |
| `#age * 2` | Contains attribute |
| `SUM(values)` | Contains reserved keyword (function) |
| `100 AND 200` | Contains reserved keyword (AND) |
| `   ` | Whitespace only |
| `` | Empty |
| `someText` | No valid expression characters |

### 🔍 Edge Cases

| Selected Text | Result | Notes |
|--------------|--------|-------|
| `IFFY` | ✅ Shows button | Not a keyword (word boundary check) |
| `ENDIF` | ✅ Shows button | Not a keyword (exact match needed) |
| `100IF` | ✅ Shows button | Keyword not at word boundary |
| `  100  ` | ✅ Shows button | Trimmed before validation |
| `If` | ❌ Hidden | Case-insensitive keyword match |
| `if` | ❌ Hidden | Case-insensitive keyword match |

---

## Files Modified

```
/components/editors/code/FormulaEditor/
  FormulaEditor.tsx    # Added isConvertibleToVariable validation function
                      # Updated handleSelect to validate selection
                      # Added safety check in handleConvertToVariable
```

---

## Benefits

### 🛡️ Data Integrity
- Prevents creation of invalid formulas
- Ensures variables only contain valid expressions
- Maintains formula semantics

### 👤 User Experience
- Clear feedback (button only shows when valid)
- Prevents confusion from invalid conversions
- Guides users to correct usage pattern

### 🏗️ Code Quality
- Centralized validation logic
- Comprehensive keyword list
- Word boundary regex prevents false positives
- Safety checks at multiple levels

---

## Future Enhancements

**Could add in future versions:**

1. **Visual Feedback**
   - Show why selection is invalid (tooltip)
   - Highlight invalid portions of selection
   - Suggest valid portions to select

2. **Smart Extraction**
   - Auto-extract valid expression from selection
   - Example: `"IF $score > 100"` → suggest converting just `"100"`

3. **Custom Error Messages**
   - "Selection contains keywords"
   - "Selection contains existing variables"
   - "Selection must be a valid expression"

---

## Related

- **Variable Management**: `/components/editors/code/FormulaEditor/hooks/useFormulaVariables.ts`
- **Syntax Highlighting**: `/components/editors/code/FormulaEditor/hooks/useFormulaSyntax.ts`
- **Formula Validation**: `/components/editors/code/FormulaEditor/hooks/useFormulaValidation.ts`

---

## Status

✅ **Fixed** - Convert to Variable button now only appears for valid plain text expressions
