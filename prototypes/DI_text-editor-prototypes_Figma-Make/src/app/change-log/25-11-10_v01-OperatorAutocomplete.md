# Natural Language Operator Autocomplete Fixes & Enhancements

**Date:** November 10, 2025  
**Type:** Bug Fix + Enhancement  
**Component:** FormulaEditor, useAutocompleteTriggers

## Summary

Fixed broken autocomplete for natural language operators, implemented smart value autocomplete that triggers after operator keywords, and added support for verbalizations with apostrophes (like "the customer's loyalty tier").

## Problems Fixed

### 1. Duplicate Text on Operator Selection
**Issue:** Selecting an autocompleted operator like "is greater than" would duplicate text instead of replacing the partial phrase.

**Root Cause:** Word boundary detection was including spaces in the break pattern, so multi-word phrases weren't being detected correctly.

**Fix:** Updated boundary regex from `/[\s+\-*/%=<>!&|(),]/` to `/[\n+\-*/%=<>!&|(),$#]/` to:
- Allow spaces within multi-word phrases
- Break at newlines, operators, parens, and special tokens ($, #)
- Properly detect phrases like "is greater than"

### 2. Click Selection Not Working
**Issue:** Clicking autocomplete items sometimes didn't select them.

**Root Cause:** Clicking caused textarea blur, which closed autocomplete before click registered.

**Fix:** Added `onMouseDown` handler with `preventDefault()` to prevent blur race condition.

### 3. Autocomplete Not Showing for Operators
**Issue:** Typing "is" or "multiply" didn't trigger autocomplete popover.

**Root Cause:** Minimum phrase length was 2 characters, which worked but was inconsistent.

**Fix:** 
- Reduced minimum phrase length to 1 character
- Added intelligent sorting to prioritize:
  1. Exact matches
  2. Starts with query
  3. Contains query
- Added missing operator keywords: `is`, `equals`, `does not equal`

### 4. Verbalizations with Apostrophes Not Working
**Issue:** Verbalizations like "the customer's loyalty tier" couldn't be typed because the apostrophe was treated as a closing quote.

**Root Cause:** Simple quote counting didn't distinguish between apostrophes and verbalization delimiters.

**Solution:** 
- Implemented smart quote detection: quotes followed by letters (like `'s`) are apostrophes, not delimiters
- Only quotes followed by space, operator, or end-of-string are treated as closing quotes
- Both autocomplete detection and selection logic updated to handle apostrophes
- Users can now type: `'the customer's loyalty tier'` and it works correctly

### 5. Parser Errors for Prefix Natural Language Operators
**Issue:** Parser threw "Unexpected token: TIMES" error when formulas started with operators like `multiply $x by 0.15`.

**Root Cause:** Parser expected operators in infix position (`$x multiply $y`) but natural language syntax allows prefix position (`multiply $x by $y`).

**Solution:**
- Added prefix operator handling in `primary()` method
- When TIMES/DIVIDED_BY/PLUS_NL/MINUS_NL appear at start of expression, parser now:
  1. Consumes the operator token
  2. Skips optional articles (the, a, an)
  3. Parses left operand
  4. Expects connecting word (by, to, from)
  5. Parses right operand
  6. Returns BinaryOp AST node
- Supports patterns: `multiply X by Y`, `divide X by Y`, `add X to Y`, `subtract X from Y`
- Works in any expression context (THEN branch, assignments, etc.)

### 6. Lowercase Keywords Not Recognized
**Issue:** Parser threw errors for lowercase keywords like `if`, `then`, `else`, `otherwise`.

**Root Cause:** Tokenizer only recognized uppercase keywords (IF, THEN, ELSE, END).

**Solution:**
- Added lowercase keyword mappings to KEYWORDS map in Tokenizer
- Support both uppercase and lowercase: `if`/`IF`, `then`/`THEN`, `else`/`ELSE`, `end`/`END`
- Added natural language synonyms:
  - `or` → ELSEIF (natural language: "or $condition then ...")
  - `otherwise` → ELSE (natural language: "otherwise return 0")
- Updated keyword lookup to check both original text and uppercase version
- Users can now write: `if $x > 10 then ... or $x < 5 then ... otherwise ...`

## Enhancements

### Smart Value Autocomplete After Operators

**Feature:** After typing an operator keyword that expects values (like "multiply the", "divide by"), automatically show autocomplete for variables, attributes, and verbalizations.

**Implementation:**
- Added `VALUE_EXPECTING_KEYWORDS` list including: multiply, divide, add, subtract, by, to, from, than, etc.
- New autocomplete provider that detects value context by analyzing text before cursor
- When in value context, shows ALL variables (symbolic + verbalization) and attributes
- User can start typing to filter, or just press space to see all options

**Example Usage:**
```
User types: "multiply the "
→ Autocomplete shows: $orderTotal, 'order total', #customer.income, etc.

User types: "multiply the $order"
→ Autocomplete filters to: $orderTotal, $orderCount, etc.

User selects: $orderTotal
Result: "multiply the $orderTotal "

User types: "by "
→ Autocomplete shows variables/attributes again

User types: "0.15"
Result: "multiply the $orderTotal by 0.15"
```

### Extended Natural Language Operators

Added new operator patterns to support more natural syntax:

**Comparison Operators (Added):**
- `is` → Natural language equality/comparison
- `equals` → Natural language: ==
- `does not equal` → Natural language: !=

**Arithmetic Operators (Added):**
- `multiply` → Multiply {value} by {value}
- `multiply the` → Multiply the {value} by {value}
- `divide` → Divide {value} by {value}
- `divide the` → Divide the {value} by {value}
- `add` → Add {value} to {value}
- `add the` → Add the {value} to {value}
- `subtract` → Subtract {value} from {value}
- `subtract the` → Subtract the {value} from {value}

## Files Changed

- `/components/editors/core/hooks/useAutocompleteTriggers.ts`
  - Updated word boundary detection regex
  - Reduced minimum phrase length to 1
  - Added leading space trimming in selection logic
  - Implemented smart apostrophe detection for verbalizations
  - Fixed verbalization autocomplete to support "customer's" style possessives

- `/components/editors/code/FormulaEditor/FormulaEditor.tsx`
  - Added intelligent sorting for keyword autocomplete
  - Added VALUE_EXPECTING_KEYWORDS list
  - Implemented smart value autocomplete provider
  - Added AutocompleteItem type import
  - Extended natural language operator keywords (is, equals, does not equal, multiply, divide, add, subtract, etc.)
  - Added `onMouseDown` with preventDefault to autocomplete items

- `/services/evaluationEngine/parsers/Tokenizer.ts`
  - Added missing operator patterns: `is`, `equals`, `does not equal`
  - Added `multiply`, `multiply the`, `divide`, `divide the` patterns
  - Added `add`, `add the`, `subtract`, `subtract the` patterns
  - Added `by` token for "multiply X by Y" patterns
  - Ordered patterns by word count for greedy matching
  - Added lowercase keyword mappings to KEYWORDS map
  - Support both uppercase and lowercase: `if`/`IF`, `then`/`THEN`, `else`/`ELSE`, `end`/`END`
  - Added natural language synonyms:
    - `or` → ELSEIF (natural language: "or $condition then ...")
    - `otherwise` → ELSE (natural language: "otherwise return 0")
  - Updated keyword lookup to check both original text and uppercase version

- `/services/evaluationEngine/parsers/FormulaParser.ts`
  - Enhanced multiplicative() to handle "multiply X by Y" and "divide X by Y" patterns
  - Enhanced additive() to handle "add X to Y" and "subtract X from Y" patterns
  - Parser now correctly handles BY, TO, FROM connecting words

## Testing Scenarios

✅ **Natural Language Operators:**
- Typing "i" shows: is, IF, is null, is equal to, is greater than, etc.
- Typing "is" shows: is, is equal to, is greater than, is less than, is null, etc.
- Typing "is gre" filters to: is greater than, is greater than or equal to
- Typing "eq" shows: equals, is equal to
- Selecting "is greater than" replaces "is gre" with "is greater than" (no duplication)

✅ **Click Selection:**
- Clicking any autocomplete item always selects it
- No blur race condition

✅ **Verbalizations with Apostrophes:**
- Typing `'the customer'` shows verbalization autocomplete
- Can type `'the customer's loyalty tier'` with apostrophe inside
- Autocomplete continues to work while typing the apostrophe
- Selection correctly inserts the full verbalization with apostrophe
- Example: `if 'the customer's loyalty tier' is "gold" then ...` works correctly

✅ **Smart Value Autocomplete:**
- After "multiply the " → shows all variables/attributes
- After "divide by " → shows all variables/attributes  
- After "is " → shows all variables/attributes
- After "equals " → shows all variables/attributes
- After "is greater than " → shows all variables/attributes
- Typing filters the list
- Works with symbolic ($var), verbalization ('var'), and attributes (#attr)

✅ **All Other Autocomplete:**
- $ variables still work
- # attributes still work
- ' verbalizations still work (with auto-closing quote AND apostrophes)
- Regular keywords (IF, THEN, SUM) still work

## Next Steps

- Consider adding number autocomplete (recent numbers, common values like 0, 1, 100, 1000)
- Consider adding string literal autocomplete (recent strings, common values)
- Consider context-aware filtering (only show numeric vars after "is greater than")
- Consider adding "by" word autocomplete after "multiply the $var " to guide users