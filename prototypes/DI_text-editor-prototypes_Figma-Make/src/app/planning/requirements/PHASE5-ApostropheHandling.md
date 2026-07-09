# Phase 5: Apostrophe Handling in Verbalizations

**Issue:** Apostrophes in verbalizations break tokenization
**Reported:** 2025-11-07
**Status:** Solution Identified

---

## Problem Statement

Verbalizations use single quotes (`'`) as delimiters:
```
'customer name' = "John"
```

But English uses apostrophes (`'`) for:
1. **Possessives:** `customer's`, `user's`, `company's`
2. **Contractions:** `isn't`, `can't`, `won't`, `doesn't`

**Conflict:** Apostrophe inside verbalization terminates it prematurely

### Failing Examples:

```
'customer's email' = email of 'customer'
// Tokenizes as: 'customer' then 's email' → ERROR

'status' = "isn't active"
// String literal works (double quotes), but:

'description' = 'isn't empty'
// Tokenizes as: 'isn' then 't empty' → ERROR
```

---

## Solution Options

### Option 1: Escape Sequences ⭐ **RECOMMENDED**

**Syntax:** Use backslash to escape apostrophes
```
'customer\'s email' = email of 'customer'
'status isn\'t active' = FALSE
```

**Implementation:**
```typescript
private readVerbalization(line: number, column: number): Token {
  this.advance(); // consume opening '
  let str = '';
  
  while (!this.isAtEnd() && this.peek() !== "'") {
    if (this.peek() === '\\') {
      // Escape sequence
      this.advance(); // consume backslash
      
      if (this.isAtEnd()) {
        throw new Error(`Unterminated verbalization at line ${line}, column ${column}`);
      }
      
      const escapedChar = this.advance();
      
      // Support common escape sequences
      switch (escapedChar) {
        case "'":
          str += "'";   // Escaped apostrophe
          break;
        case '\\':
          str += '\\';  // Escaped backslash
          break;
        case 'n':
          str += '\n';  // Newline
          break;
        case 't':
          str += '\t';  // Tab
          break;
        default:
          str += escapedChar;  // Unknown escape = literal char
      }
    } else {
      if (this.peek() === '\n') {
        this.line++;
        this.column = 0;
      }
      str += this.advance();
    }
  }
  
  if (this.isAtEnd()) {
    throw new Error(`Unterminated verbalization at line ${line}, column ${column}`);
  }
  
  this.advance(); // consume closing '
  
  return {
    type: 'VERBALIZATION',
    value: str,
    line,
    column
  };
}
```

**Pros:**
- ✅ Standard pattern (JSON, JavaScript, most languages)
- ✅ Unambiguous
- ✅ Handles all edge cases
- ✅ Supports other escape sequences (newline, tab, etc.)
- ✅ Easy to implement
- ✅ Easy to explain to users

**Cons:**
- ⚠️ Requires typing backslash (minor inconvenience)
- ⚠️ Less "natural" than raw text

**BAL Alignment:** ✅ IBM BAL uses escape sequences in strings

---

### Option 2: Smart Quote Detection

**Syntax:** Apostrophe followed by letter = part of word
```
'customer's email' = email of 'customer'
'status isn't active' = FALSE
```

**Implementation:**
```typescript
private readVerbalization(line: number, column: number): Token {
  this.advance(); // consume opening '
  let str = '';
  
  while (!this.isAtEnd()) {
    if (this.peek() === "'") {
      // Check if this is a possessive/contraction or closing quote
      const nextChar = this.peekNext();
      
      // If followed by letter or apostrophe is preceded by letter, it's internal
      if (nextChar && this.isAlpha(nextChar)) {
        // Part of contraction/possessive
        str += this.advance(); // Add the apostrophe
        continue;
      } else {
        // Closing quote
        break;
      }
    }
    
    if (this.peek() === '\n') {
      this.line++;
      this.column = 0;
    }
    str += this.advance();
  }
  
  if (this.isAtEnd() || this.peek() !== "'") {
    throw new Error(`Unterminated verbalization at line ${line}, column ${column}`);
  }
  
  this.advance(); // consume closing '
  
  return {
    type: 'VERBALIZATION',
    value: str,
    line,
    column
  };
}
```

**Pros:**
- ✅ Natural syntax (no escaping needed)
- ✅ Handles possessives and contractions automatically

**Cons:**
- ❌ Ambiguous edge cases: `'test' + 's'` vs `'test's value'`
- ❌ Can't end verbalization with letter followed by `'` immediately
- ❌ Harder to explain rules to users
- ❌ Non-standard pattern

**BAL Alignment:** ❓ Not typical in BAL

---

### Option 3: Double Single Quotes (SQL-style)

**Syntax:** Use `''` to represent single apostrophe
```
'customer''s email' = email of 'customer'
'status isn''t active' = FALSE
```

**Implementation:**
```typescript
private readVerbalization(line: number, column: number): Token {
  this.advance(); // consume opening '
  let str = '';
  
  while (!this.isAtEnd() && this.peek() !== "'") {
    if (this.peek() === '\n') {
      this.line++;
      this.column = 0;
    }
    str += this.advance();
  }
  
  if (this.isAtEnd()) {
    throw new Error(`Unterminated verbalization at line ${line}, column ${column}`);
  }
  
  this.advance(); // consume first closing '
  
  // Check for doubled apostrophe
  if (this.peek() === "'") {
    str += "'";  // Add literal apostrophe
    this.advance(); // consume second '
    
    // Continue reading
    return this.readVerbalizationContinued(str, line, column);
  }
  
  return {
    type: 'VERBALIZATION',
    value: str,
    line,
    column
  };
}
```

**Pros:**
- ✅ Well-known pattern (SQL, some string implementations)
- ✅ Unambiguous

**Cons:**
- ❌ Awkward to type (`''`)
- ❌ Requires complex tokenizer logic
- ❌ Less intuitive than backslash escape

**BAL Alignment:** ❓ Not typical in BAL

---

### Option 4: Different Delimiter

**Syntax:** Use backticks for verbalizations
```
`customer's email` = email of `customer`
`status isn't active` = FALSE
```

**Implementation:**
```typescript
// Add support for both ' and ` delimiters
if (char === "'" || char === '`') {
  return this.readVerbalization(line, column, char);
}

private readVerbalization(line: number, column: number, delimiter: string): Token {
  this.advance(); // consume opening delimiter
  let str = '';
  
  while (!this.isAtEnd() && this.peek() !== delimiter) {
    // ... same as before
  }
  
  // ... rest of implementation
}
```

**Pros:**
- ✅ No escaping needed
- ✅ Natural syntax
- ✅ Works like JavaScript template literals

**Cons:**
- ❌ Changes existing design (breaks backward compatibility)
- ❌ Need to support both `'` and `` ` `` (confusing)
- ❌ Backtick not available on all keyboards

**BAL Alignment:** ❌ BAL uses single quotes

---

## Recommendation: **Option 1 - Escape Sequences**

### Why Escape Sequences Win:

1. **Standard Pattern** - Used by virtually every programming language
2. **Unambiguous** - No edge cases or special rules
3. **Extensible** - Can add more escape sequences later (`\n`, `\t`, etc.)
4. **BAL-Aligned** - IBM BAL uses similar escaping
5. **Easy to Teach** - Users already know this from other languages
6. **Handles All Cases** - Including edge cases like: `'John\'s \'special\' item'`

### Usage Examples:

```
// Possessives
'customer\'s email' = email of 'customer'
'company\'s revenue' = revenue of 'company'

// Contractions  
'status isn\'t active' = FALSE
'item can\'t be empty' = NOT ISEMPTY('item')

// Multiple apostrophes
'user\'s manager\'s name' = name of manager of 'user'

// Escaped backslash
'file path' = "C:\\Users\\John"  // String literal
'regex pattern' = 'can\\\'t'      // Verbalization with backslash

// Mixed quotes in description
'description' = "The item isn't available"  // String literal (no escape needed)
'message' = 'Item isn\'t in stock'          // Verbalization (escape needed)
```

---

## Implementation Plan

### Step 1: Update Tokenizer

Modify `readVerbalization` to support escape sequences:

**File:** `/services/evaluationEngine/parsers/Tokenizer.ts`

```typescript
private readVerbalization(line: number, column: number): Token {
  this.advance(); // consume opening '
  let str = '';
  
  while (!this.isAtEnd() && this.peek() !== "'") {
    if (this.peek() === '\\') {
      // Handle escape sequence
      this.advance(); // consume backslash
      
      if (this.isAtEnd()) {
        throw new Error(`Unterminated verbalization at line ${line}, column ${column}`);
      }
      
      const escapedChar = this.advance();
      
      switch (escapedChar) {
        case "'":
          str += "'";   // Escaped apostrophe
          break;
        case '\\':
          str += '\\';  // Escaped backslash
          break;
        case 'n':
          str += '\n';  // Newline
          break;
        case 't':
          str += '\t';  // Tab
          break;
        case 'r':
          str += '\r';  // Carriage return
          break;
        default:
          // Unknown escape sequence - treat as literal
          // This is lenient: \x → x
          str += escapedChar;
      }
    } else {
      if (this.peek() === '\n') {
        this.line++;
        this.column = 0;
      }
      str += this.advance();
    }
  }
  
  if (this.isAtEnd()) {
    throw new Error(`Unterminated verbalization at line ${line}, column ${column}`);
  }
  
  this.advance(); // consume closing '
  
  return {
    type: 'VERBALIZATION',
    value: str,
    line,
    column
  };
}
```

### Step 2: Update String Literals (Consistency)

Apply same escape handling to `readString` for consistency:

```typescript
private readString(line: number, column: number): Token {
  this.advance(); // consume opening "
  let str = '';
  
  while (!this.isAtEnd() && this.peek() !== '"') {
    if (this.peek() === '\\') {
      // Handle escape sequence (same logic as verbalizations)
      this.advance();
      
      if (this.isAtEnd()) {
        throw new Error(`Unterminated string at line ${line}, column ${column}`);
      }
      
      const escapedChar = this.advance();
      
      switch (escapedChar) {
        case '"':
          str += '"';
          break;
        case '\\':
          str += '\\';
          break;
        case 'n':
          str += '\n';
          break;
        case 't':
          str += '\t';
          break;
        case 'r':
          str += '\r';
          break;
        default:
          str += escapedChar;
      }
    } else {
      if (this.peek() === '\n') {
        this.line++;
        this.column = 0;
      }
      str += this.advance();
    }
  }
  
  if (this.isAtEnd()) {
    throw new Error(`Unterminated string at line ${line}, column ${column}`);
  }
  
  this.advance(); // consume closing "
  
  return {
    type: 'STRING',
    value: str,
    line,
    column
  };
}
```

### Step 3: Update Documentation

Add escape sequence documentation to:
- Formula editor help text
- Autocomplete hints
- Error messages
- Formula samples

### Step 4: Add Tests

```typescript
describe('Verbalization Escape Sequences', () => {
  test('escaped apostrophe in possessive', () => {
    const tokens = tokenize("'customer\\'s email'");
    expect(tokens[0]).toEqual(
      expect.objectContaining({
        type: 'VERBALIZATION',
        value: "customer's email"
      })
    );
  });
  
  test('escaped apostrophe in contraction', () => {
    const tokens = tokenize("'isn\\'t active'");
    expect(tokens[0]).toEqual(
      expect.objectContaining({
        type: 'VERBALIZATION',
        value: "isn't active"
      })
    );
  });
  
  test('multiple escaped apostrophes', () => {
    const tokens = tokenize("'user\\'s manager\\'s name'");
    expect(tokens[0]).toEqual(
      expect.objectContaining({
        type: 'VERBALIZATION',
        value: "user's manager's name"
      })
    );
  });
  
  test('escaped backslash', () => {
    const tokens = tokenize("'path\\\\to\\\\file'");
    expect(tokens[0]).toEqual(
      expect.objectContaining({
        type: 'VERBALIZATION',
        value: "path\\to\\file"
      })
    );
  });
  
  test('other escape sequences', () => {
    const tokens = tokenize("'line1\\nline2\\ttab'");
    expect(tokens[0]).toEqual(
      expect.objectContaining({
        type: 'VERBALIZATION',
        value: "line1\nline2\ttab"
      })
    );
  });
});
```

---

## Alternative: Hybrid Approach (Advanced)

For **maximum user-friendliness**, we could implement a hybrid:

1. **Smart detection for common cases** (possessive `'s` and contractions)
2. **Fallback to escape sequences** for edge cases

**Rules:**
- `'s` at end of word → possessive (auto-handled)
- `'t`, `'re`, `'ll`, `'ve`, `'d`, `'m` → contractions (auto-handled)
- Everything else → requires escape

**Pros:**
- Most natural for common cases
- Escape still available for edge cases

**Cons:**
- Complex rules
- Harder to implement and test
- Potential ambiguity

**Verdict:** Too complex. Stick with **pure escape sequences**.

---

## Summary

**Chosen Solution:** Escape sequences (`\'`)

**Syntax:**
```
'customer\'s email'      // Possessive
'isn\'t active'          // Contraction
'user\'s manager\'s name' // Multiple apostrophes
```

**Next Steps:**
1. Implement escape handling in `readVerbalization()`
2. Implement escape handling in `readString()` (consistency)
3. Add comprehensive tests
4. Update documentation and formula samples

---

**Status:** Ready to implement
**Priority:** High (blocks natural language usage)
**Complexity:** Low (standard pattern)
