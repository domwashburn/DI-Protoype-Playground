# EPIC: Comprehensive String Manipulation Functions

**Epic ID:** EPIC-StringFunctions  
**Status:** 📋 Planned  
**Priority:** Medium  
**Estimated Duration:** 3-5 days  
**Dependencies:** Evaluation Engine (Complete), List/Array Type (Complete)  

---

## Executive Summary

Expand the Formula Editor's string manipulation capabilities from 5 basic functions (CONCAT, UPPER, LOWER, TRIM, LEN) to a comprehensive suite of 20+ string functions enabling text parsing, extraction, transformation, search, and formatting for enterprise business rule scenarios.

**Current State:** 5 basic string functions  
**Target State:** 20+ production-ready string manipulation functions

---

## Business Value

### Problem Statement

Business rules frequently require text manipulation for:
- **Data Extraction:** Parse customer IDs, extract codes from formatted strings
- **Text Formatting:** Format phone numbers, SSNs, account numbers
- **Search & Validation:** Check prefixes/suffixes, find substrings, validate patterns
- **Text Transformation:** Replace characters, pad values, build composite strings
- **Data Cleaning:** Remove characters, normalize text, standardize formats

**Current Limitation:** Users limited to CONCAT, UPPER, LOWER, TRIM, LEN - insufficient for real-world text processing.

### Use Cases

**Example 1: Customer ID Extraction**
```
// Extract customer ID from formatted order number "ORD-CUST12345-2024"
$customerId = SUBSTRING($orderNumber, 9, 12)
// Current workaround: None - not possible
```

**Example 2: Phone Number Formatting**
```
// Format "5551234567" as "(555) 123-4567"
$formatted = CONCAT("(", LEFT($phone, 3), ") ", SUBSTRING($phone, 4, 6), "-", RIGHT($phone, 4))
// Current workaround: External preprocessing required
```

**Example 3: Data Validation**
```
// Check if account starts with region code
IF STARTS_WITH($accountNumber, "US-") THEN
  $region = "United States"
END
// Current workaround: Manual character-by-character comparison
```

**Example 4: Text Replacement**
```
// Clean product codes: "SKU_A-123" → "SKUA123"
$cleanCode = REPLACE(REPLACE($rawCode, "_", ""), "-", "")
// Current workaround: Not possible without external tools
```

---

## Goals

### Primary Goals

1. **Comprehensive Coverage** - Support common string operations from other formula languages (Excel, SQL, JavaScript)
2. **Text Extraction** - SUBSTRING, LEFT, RIGHT, MID for extracting portions of text
3. **Text Search** - FIND, SEARCH, STARTS_WITH, ENDS_WITH, CONTAINS for locating text
4. **Text Transformation** - REPLACE, REPEAT, REVERSE, PAD for modifying strings
5. **Text Formatting** - PAD_LEFT, PAD_RIGHT, FORMAT for standardizing output
6. **Production Ready** - Full type safety, error handling, comprehensive testing

### Success Metrics

- ✅ 20+ string functions implemented and tested
- ✅ Sample formulas demonstrating real-world text processing
- ✅ Type-safe implementations with clear error messages
- ✅ Autocomplete support for all new functions
- ✅ Syntax highlighting integration
- ✅ Documentation with usage examples

---

## Proposed String Functions

### Phase 1: Text Extraction (Core Priority)

**SUBSTRING(text, start, [length])**
- Extract substring from position (1-indexed)
- Negative indices count from end
- Optional length parameter
- Example: `SUBSTRING("Hello World", 7, 5)` → `"World"`

**LEFT(text, count)**
- Extract N characters from left
- Example: `LEFT("Hello", 3)` → `"Hel"`

**RIGHT(text, count)**
- Extract N characters from right  
- Example: `RIGHT("Hello", 3)` → `"llo"`

**MID(text, start, length)**
- Alias for SUBSTRING (Excel compatibility)
- Example: `MID("Hello World", 7, 5)` → `"World"`

### Phase 2: Text Search

**FIND(search, text, [start])**
- Find position of substring (case-sensitive, 1-indexed)
- Returns 0 if not found
- Optional start position
- Example: `FIND("World", "Hello World")` → `7`

**SEARCH(search, text, [start])**
- Find position of substring (case-insensitive, 1-indexed)
- Returns 0 if not found
- Example: `SEARCH("world", "Hello World")` → `7`

**STARTS_WITH(text, prefix)**
- Check if text starts with prefix
- Returns boolean
- Example: `STARTS_WITH("Hello World", "Hello")` → `true`

**ENDS_WITH(text, suffix)**
- Check if text ends with suffix
- Returns boolean
- Example: `ENDS_WITH("Hello World", "World")` → `true`

**CONTAINS(text, substring)**
- Check if text contains substring (case-sensitive)
- Returns boolean
- Example: `CONTAINS("Hello World", "lo Wo")` → `true`

### Phase 3: Text Transformation

**REPLACE(text, oldText, newText)**
- Replace all occurrences of oldText with newText
- Case-sensitive
- Example: `REPLACE("Hello World", "World", "Universe")` → `"Hello Universe"`

**REPLACE_FIRST(text, oldText, newText)**
- Replace first occurrence only
- Example: `REPLACE_FIRST("test test", "test", "demo")` → `"demo test"`

**REPEAT(text, count)**
- Repeat text N times
- Example: `REPEAT("*", 5)` → `"*****"`

**REVERSE(text)**
- Reverse string
- Example: `REVERSE("Hello")` → `"olleH"`

**REMOVE(text, substring)**
- Remove all occurrences of substring
- Example: `REMOVE("Hello World", "o")` → `"Hell Wrld"`

### Phase 4: Text Formatting & Padding

**PAD_LEFT(text, length, [padChar])**
- Pad string on left to reach length
- Default padChar is space
- Example: `PAD_LEFT("42", 5, "0")` → `"00042"`

**PAD_RIGHT(text, length, [padChar])**
- Pad string on right to reach length
- Example: `PAD_RIGHT("ID", 5, "-")` → `"ID---"`

**TRIM_LEFT(text)**
- Remove leading whitespace only
- Example: `TRIM_LEFT("  Hello  ")` → `"Hello  "`

**TRIM_RIGHT(text)**
- Remove trailing whitespace only
- Example: `TRIM_RIGHT("  Hello  ")` → `"  Hello"`

### Phase 5: Advanced Functions

**CHAR_AT(text, position)**
- Get character at position (1-indexed)
- Example: `CHAR_AT("Hello", 2)` → `"e"`

**CHAR_CODE(char)**
- Get ASCII/Unicode code point
- Example: `CHAR_CODE("A")` → `65`

**TEXT(value, [format])**
- Convert value to formatted text
- Format patterns for numbers/dates
- Example: `TEXT(1234.5, "0000.00")` → `"1234.50"`

**PROPER(text)**
- Title case (capitalize first letter of each word)
- Example: `PROPER("hello world")` → `"Hello World"`

**CLEAN(text)**
- Remove non-printable characters
- Example: `CLEAN("Hello\x00World")` → `"HelloWorld"`

---

## Function Comparison Matrix

| Function | Excel | SQL | JavaScript | Python | This Implementation |
|----------|-------|-----|------------|--------|-------------------|
| SUBSTRING | MID | SUBSTR | substring | [start:end] | ✅ SUBSTRING |
| LEFT | LEFT | LEFT | slice(0,n) | [:n] | ✅ LEFT |
| RIGHT | RIGHT | RIGHT | slice(-n) | [-n:] | ✅ RIGHT |
| FIND | FIND | INSTR | indexOf | find | ✅ FIND |
| REPLACE | SUBSTITUTE | REPLACE | replace | replace | ✅ REPLACE |
| UPPER | UPPER | UPPER | toUpperCase | upper | ✅ Already exists |
| LOWER | LOWER | LOWER | toLowerCase | lower | ✅ Already exists |
| TRIM | TRIM | TRIM | trim | strip | ✅ Already exists |
| LEN | LEN | LENGTH | length | len | ✅ Already exists |
| CONCAT | CONCAT | CONCAT | concat | + | ✅ Already exists |
| REPEAT | REPT | REPEAT | repeat | * | ✅ REPEAT |
| REVERSE | — | REVERSE | — | [::-1] | ✅ REVERSE |
| PAD | — | LPAD/RPAD | padStart | ljust/rjust | ✅ PAD_LEFT/RIGHT |

---

## Implementation Plan

### Increment 1: Foundation & Text Extraction (1 day)

**Goal:** Core substring extraction functions

**Functions:**
- SUBSTRING(text, start, [length])
- LEFT(text, count)
- RIGHT(text, count)  
- MID(text, start, length) - alias

**Tasks:**
1. Update FunctionRegistry.ts with extraction functions
2. Handle edge cases (negative indices, out of bounds)
3. Add sample formulas demonstrating extraction
4. Test with various text inputs

**Sample Formula:**
```
// Extract area code from phone number
$phone = "555-123-4567"
$areaCode = LEFT($phone, 3)
$exchange = SUBSTRING($phone, 5, 3)
$number = RIGHT($phone, 4)
$formatted = CONCAT("(", $areaCode, ") ", $exchange, "-", $number)
```

### Increment 2: Text Search Functions (1 day)

**Goal:** Locate substrings within text

**Functions:**
- FIND(search, text, [start])
- SEARCH(search, text, [start]) - case insensitive
- STARTS_WITH(text, prefix)
- ENDS_WITH(text, suffix)
- CONTAINS(text, substring) - already exists in list functions, port to string

**Tasks:**
1. Implement search functions in FunctionRegistry
2. Handle case sensitivity differences (FIND vs SEARCH)
3. 1-indexed positions (Excel compatibility)
4. Return 0 for not found (consistent with Excel)
5. Add validation sample formulas

**Sample Formula:**
```
// Validate account number format
IF STARTS_WITH($accountNumber, "US-") AND LEN($accountNumber) = 12 THEN
  $position = FIND("-", $accountNumber)
  $regionCode = LEFT($accountNumber, $position - 1)
  $valid = true
ELSE
  $valid = false
END
```

### Increment 3: Text Transformation (1 day)

**Goal:** Modify and transform text

**Functions:**
- REPLACE(text, oldText, newText)
- REPLACE_FIRST(text, oldText, newText)
- REPEAT(text, count)
- REVERSE(text)
- REMOVE(text, substring)

**Tasks:**
1. Implement transformation functions
2. Handle multiple replacement scenarios
3. Add text cleaning sample formulas
4. Test with special characters

**Sample Formula:**
```
// Clean and standardize product SKU
$rawSKU = "SKU_A-123-XYZ"
$cleaned = REMOVE(REMOVE($rawSKU, "_"), "-")
$standardized = CONCAT("SKU", $cleaned)
// Result: "SKUA123XYZ"
```

### Increment 4: Formatting & Padding (0.5 days)

**Goal:** Format text with padding

**Functions:**
- PAD_LEFT(text, length, [padChar])
- PAD_RIGHT(text, length, [padChar])
- TRIM_LEFT(text)
- TRIM_RIGHT(text)

**Tasks:**
1. Implement padding functions with default space character
2. Handle length <= text length (no padding)
3. Add formatting sample formulas
4. Test with various pad characters

**Sample Formula:**
```
// Format invoice number with leading zeros
$invoiceNum = 42
$formatted = PAD_LEFT(TEXT($invoiceNum), 8, "0")
// Result: "00000042"
```

### Increment 5: Advanced Functions & Polish (0.5-1 day)

**Goal:** Additional utility functions

**Functions:**
- CHAR_AT(text, position)
- CHAR_CODE(char)
- TEXT(value, [format]) - basic implementation
- PROPER(text)
- CLEAN(text)

**Tasks:**
1. Implement advanced functions
2. Add comprehensive sample formulas
3. Update autocomplete vocabulary
4. Update syntax highlighting if needed
5. Final testing and documentation

**Sample Formula:**
```
// Format customer name properly
$rawName = "JOHN DOE"
$properName = PROPER(LOWER($rawName))
// Result: "John Doe"

// Build customer display ID
$id = PAD_LEFT(TEXT($customerId), 6, "0")
$display = CONCAT("CUST-", $id)
// Result: "CUST-000123"
```

---

## Type Safety & Error Handling

### Type Signatures

All string functions follow strict type signatures:

```typescript
// Single string argument
UPPER(text: string) → string
LOWER(text: string) → string
TRIM(text: string) → string
LEN(text: string) → number
REVERSE(text: string) → string

// String + number arguments
LEFT(text: string, count: number) → string
RIGHT(text: string, count: number) → string
SUBSTRING(text: string, start: number, length?: number) → string
REPEAT(text: string, count: number) → string
PAD_LEFT(text: string, length: number, padChar?: string) → string

// Multiple string arguments
CONCAT(...texts: string[]) → string
REPLACE(text: string, oldText: string, newText: string) → string
FIND(search: string, text: string, start?: number) → number
CONTAINS(text: string, substring: string) → boolean
STARTS_WITH(text: string, prefix: string) → boolean
```

### Error Handling

**Invalid Argument Types:**
```
SUBSTRING(123, 1, 5)  // Error: Expected string, got number
LEFT($amount, "three")  // Error: Expected number, got string
```

**Out of Bounds:**
```
LEFT("Hello", -1)  // Error: count must be >= 0
SUBSTRING("Hello", 100, 5)  // Returns "" (empty string, no error)
CHAR_AT("Hello", 10)  // Error: position out of range
```

**Invalid Parameters:**
```
REPEAT("*", -5)  // Error: count must be >= 0
PAD_LEFT("text", 2, "abc")  // Error: padChar must be single character
```

---

## Integration Points

### 1. FunctionRegistry (/services/evaluationEngine/runtime/FunctionRegistry.ts)

Add all string functions to `registerBuiltIns()` method:

```typescript
// Text extraction
this.register({
  name: 'SUBSTRING',
  minArgs: 2,
  maxArgs: 3,
  execute: ([text, start, length]) => {
    const str = String(text);
    const startIdx = start < 0 ? str.length + start : start - 1; // Convert to 0-indexed
    return length === undefined 
      ? str.substring(startIdx)
      : str.substring(startIdx, startIdx + length);
  },
  description: 'Extract substring from text'
});
```

### 2. Sample Data (/SampleData/formulaSamples.ts)

Add comprehensive string manipulation examples:

```typescript
{
  id: 'string-extraction',
  name: 'Text Extraction',
  formula: '// Extract customer ID from order number\n$orderId = "ORD-CUST12345-2024"\n$customerId = SUBSTRING($orderId, 9, 12)\nRETURN $customerId',
  description: 'Extract substring from formatted text',
  category: 'String Functions'
}
```

### 3. Autocomplete Vocabulary

Update autocomplete to suggest string functions with parameter hints.

### 4. Syntax Highlighting

String functions already highlighted as functions (blue) - no changes needed.

---

## Testing Strategy

### Unit Tests

Test each function with:
- Valid inputs (basic cases)
- Edge cases (empty strings, single characters)
- Boundary conditions (start/end of string)
- Invalid inputs (wrong types, negative numbers)
- Unicode/special characters

### Integration Tests

Test string functions in complete formulas:
- Nested function calls: `UPPER(LEFT($name, 5))`
- Combinations: `REPLACE(TRIM($text), " ", "_")`
- With conditionals: `IF STARTS_WITH($id, "US") THEN...`
- With variables: `$result = CONCAT(LEFT($a, 3), RIGHT($b, 3))`

### Sample Formula Coverage

Create 10-15 sample formulas demonstrating:
- Data extraction (parsing IDs, codes)
- Text formatting (phone numbers, SSNs)
- Data validation (prefix/suffix checks)
- Text cleaning (remove characters, standardize)
- Composite operations (multi-step transformations)

---

## Sample Formulas

### Example 1: Customer ID Parser
```
// Parse customer data from composite ID
$compositeId = "US-CUST-12345-PREMIUM"

// Extract components
$countryCode = LEFT($compositeId, 2)
$customerId = SUBSTRING($compositeId, 9, 5)
$tier = RIGHT($compositeId, 7)

// Validate format
IF STARTS_WITH($compositeId, "US-") AND LEN($compositeId) = 21 THEN
  $valid = true
  $formattedId = CONCAT("Customer #", $customerId, " (", PROPER(LOWER($tier)), ")")
ELSE
  $valid = false
  $formattedId = "INVALID ID"
END

RETURN $formattedId
```

### Example 2: Phone Number Formatter
```
// Format raw phone number
$rawPhone = "5551234567"

// Extract parts
$areaCode = LEFT($rawPhone, 3)
$exchange = SUBSTRING($rawPhone, 4, 3)
$number = RIGHT($rawPhone, 4)

// Format as (555) 123-4567
$formatted = CONCAT("(", $areaCode, ") ", $exchange, "-", $number)

RETURN $formatted
```

### Example 3: Product SKU Cleaner
```
// Clean and standardize product SKU
$rawSKU = "SKU_A-123-XYZ"

// Remove separators
$step1 = REPLACE($rawSKU, "_", "")
$step2 = REPLACE($step1, "-", "")

// Standardize
$cleaned = UPPER($step2)

// Validate
IF STARTS_WITH($cleaned, "SKU") AND LEN($cleaned) >= 8 THEN
  $valid = true
ELSE
  $valid = false
END

RETURN $cleaned
```

### Example 4: Account Number Generator
```
// Generate formatted account number
$customerId = 12345
$branchCode = "NYC"
$accountType = "SAV"

// Build parts
$idPadded = PAD_LEFT(TEXT($customerId), 8, "0")
$branchUpper = UPPER($branchCode)
$typeUpper = UPPER($accountType)

// Generate account number
$accountNumber = CONCAT($branchUpper, "-", $typeUpper, "-", $idPadded)

// Result: "NYC-SAV-00012345"
RETURN $accountNumber
```

### Example 5: Name Formatter
```
// Format customer name properly
$firstName = "JOHN"
$lastName = "DOE-SMITH"

// Title case each part
$firstProper = PROPER(LOWER($firstName))
$lastProper = PROPER(LOWER($lastName))

// Build full name
$fullName = CONCAT($firstProper, " ", $lastProper)

// Add suffix if VIP
IF $vipStatus = true THEN
  $displayName = CONCAT($fullName, " (VIP)")
ELSE
  $displayName = $fullName
END

RETURN $displayName
```

---

## Documentation Updates

### Files to Update

1. **/services/evaluationEngine/README.md**
   - Add string functions to capabilities list
   - Update function count (40+ → 60+)

2. **/SampleData/formulaSamples.ts**
   - Add 10-15 string manipulation samples

3. **/change-log/index.md**
   - Add implementation entry

4. **Create: /change-log/25-11-XX_vXX-StringFunctionsImplementation.md**
   - Document all new functions
   - Include sample formulas
   - Note any edge cases

---

## Success Criteria

### Completion Checklist

- [ ] All 20+ string functions implemented in FunctionRegistry
- [ ] Type signatures defined and enforced
- [ ] Error handling for invalid inputs
- [ ] Edge cases handled (empty strings, negative indices, etc.)
- [ ] 10-15 sample formulas added to formulaSamples.ts
- [ ] Autocomplete vocabulary updated
- [ ] Unit tests for all functions
- [ ] Integration tests with nested calls
- [ ] Documentation updated (README, change log)
- [ ] Unicode/special character handling verified

### Quality Gates

✅ **Correctness:** All functions match Excel/SQL behavior  
✅ **Type Safety:** Strict type checking with clear error messages  
✅ **Edge Cases:** Handles empty strings, boundaries, special chars  
✅ **Performance:** Efficient implementations (no unnecessary allocations)  
✅ **Usability:** Clear function names and parameter hints  
✅ **Documentation:** Comprehensive examples and usage guidance  

---

## Timeline Estimate

| Phase | Duration | Description |
|-------|----------|-------------|
| **Increment 1** | 1 day | Text extraction (SUBSTRING, LEFT, RIGHT, MID) |
| **Increment 2** | 1 day | Text search (FIND, SEARCH, STARTS_WITH, ENDS_WITH) |
| **Increment 3** | 1 day | Transformation (REPLACE, REPEAT, REVERSE, REMOVE) |
| **Increment 4** | 0.5 days | Formatting (PAD_LEFT, PAD_RIGHT, TRIM variants) |
| **Increment 5** | 0.5-1 day | Advanced functions (CHAR_AT, PROPER, TEXT, etc.) |
| **Testing & Docs** | 0.5 days | Final testing, documentation, sample formulas |
| **TOTAL** | **3.5-5 days** | Complete string function suite |

---

## Future Enhancements (Beyond Scope)

### Potential Phase 2 Features

- **Regular Expressions:** REGEX_MATCH, REGEX_REPLACE, REGEX_EXTRACT
- **Advanced Formatting:** FORMAT with date/number patterns
- **Localization:** LOCALE_UPPER, LOCALE_LOWER for international text
- **Encoding:** URL_ENCODE, URL_DECODE, HTML_ENCODE, HTML_DECODE
- **Comparison:** COMPARE, LEVENSHTEIN (fuzzy matching)
- **JSON/XML Parsing:** Basic structured text parsing

---

## Dependencies

### Prerequisites

- ✅ Evaluation Engine operational
- ✅ FunctionRegistry extensible
- ✅ Type system foundation in place
- ✅ Error handling infrastructure ready
- ✅ Autocomplete system functional

### No Blockers

This epic has no blockers - can start immediately. All infrastructure is in place.

---

## Risk Assessment

### Low Risk

**Why Low Risk:**
- Self-contained additions to existing FunctionRegistry
- No changes to parser, tokenizer, or AST
- No new syntax or language features
- Similar to List/Array functions implementation (proven pattern)
- String operations are well-understood and straightforward

**Minimal Impact:**
- Only touches `/services/evaluationEngine/runtime/FunctionRegistry.ts`
- Adds samples to `/SampleData/formulaSamples.ts`
- Updates documentation

**Easy Rollback:**
- Functions can be added/removed individually
- No architectural changes
- No breaking changes to existing code

---

## Conclusion

This epic transforms the Formula Editor's string capabilities from basic (5 functions) to comprehensive (25+ functions), enabling real-world text processing scenarios common in enterprise business rules. The implementation is low-risk, self-contained, and follows proven patterns from the List/Array type epic.

**Estimated Effort:** 3.5-5 days  
**Business Value:** High - unlocks text processing use cases  
**Technical Risk:** Low - isolated changes to FunctionRegistry  
**User Impact:** Significant - enables data parsing, validation, formatting  

**Recommendation:** Proceed with Increment 1 (text extraction) to validate approach, then continue through remaining increments.
