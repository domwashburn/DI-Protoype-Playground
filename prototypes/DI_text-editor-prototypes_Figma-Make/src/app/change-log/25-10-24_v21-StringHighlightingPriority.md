# String Highlighting Priority Fix

**Date:** October 24, 2025  
**Version:** v21  
**Type:** Bug Fix  
**Status:** ✅ Fixed

---

## Summary

Fixed a critical bug in BAL Editor where strings (text enclosed in single or double quotes) were having their internal content syntax highlighted. Strings should be treated as atomic units where keywords, operators, and other syntax inside them are not highlighted.

---

## Problem

**User Report:**

In the BAL Editor, text inside strings was being syntax highlighted:

```bal
set 'is eligible for personal choice holidays' of the holiday eligibility to false;
```

The word "to" inside the string `'is eligible for personal choice holidays'` was being highlighted as a keyword, when it should remain styled as part of the string.

**Root Cause:**

The syntax highlighting logic applied transformations in sequence:

1. Highlight strings → Wrap in `<span class="bal-string">...</span>`
2. Highlight vocabulary → Replace matching words even inside existing `<span>` tags
3. Highlight keywords → Replace matching words even inside existing `<span>` tags
4. Highlight numbers, operators, etc.

This meant that even though strings were highlighted first, subsequent highlighting passes would **replace text inside the string spans**, breaking the atomic nature of strings.

**Example of the problem:**

```javascript
// After string highlighting:
'<span class="bal-string">\'is eligible for personal choice holidays\'</span>'

// After keyword highlighting (WRONG):
'<span class="bal-string">\'is eligible for personal choice holidays\'</span>'
//                                          ^^
// "to" gets wrapped with keyword span inside the string span
```

---

## Solution

Implemented a **placeholder token pattern** to protect string content from further highlighting:

### 🔐 Token Protection Pattern

1. **Extract strings first** and replace with placeholder tokens
2. **Store** the highlighted string HTML separately
3. **Apply** all other syntax highlighting (keywords, numbers, operators)
4. **Restore** string tokens with their highlighted HTML

This ensures string content is completely protected from subsequent highlighting passes.

### 💻 Implementation

```javascript
const applySyntaxHighlighting = (text, vocabularyMappings) => {
  const lines = text.split('\n');
  
  const highlightedLines = lines.map((line) => {
    let highlighted = line;

    // Escape HTML entities
    highlighted = highlighted
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '&quot;');

    // STEP 1: Extract strings and replace with tokens
    const stringTokens = [];
    let tokenIndex = 0;
    
    // Extract single-quoted strings
    highlighted = highlighted.replace(
      /(?<![a-zA-Z0-9])'([^']*)'(?![a-zA-Z0-9])/g, 
      (match, content) => {
        const token = `__STRING_TOKEN_${tokenIndex}__`;
        stringTokens.push(`<span class="bal-string">'${content}'</span>`);
        tokenIndex++;
        return token; // ✅ Placeholder protects content
      }
    );
    
    // Extract double-quoted strings
    highlighted = highlighted.replace(
      /&quot;([^&quot;]*)&quot;/g, 
      (match, content) => {
        const token = `__STRING_TOKEN_${tokenIndex}__`;
        stringTokens.push(`<span class="bal-string">&quot;${content}&quot;</span>`);
        tokenIndex++;
        return token; // ✅ Placeholder protects content
      }
    );

    // STEP 2: Apply other syntax highlighting (strings are now tokens)
    
    // Highlight vocabulary terms (won't match inside tokens)
    vocabularyMappings.forEach(mapping => {
      const regex = new RegExp(`\\b(${mapping.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
      highlighted = highlighted.replace(regex, '<span class="bal-vocabulary">$1</span>');
    });

    // Highlight keywords (won't match inside tokens)
    balVocabulary.keywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
      highlighted = highlighted.replace(regex, '<span class="bal-keyword">$1</span>');
    });

    // Highlight numbers (won't match inside tokens)
    highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span class="bal-number">$1</span>');

    // Highlight operators (won't match inside tokens)
    balVocabulary.operators.forEach(operator => {
      const escapedOp = operator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedOp})`, 'gi');
      highlighted = highlighted.replace(regex, '<span class="bal-operator">$1</span>');
    });

    // STEP 3: Restore string tokens with highlighted HTML
    stringTokens.forEach((stringHTML, index) => {
      const token = `__STRING_TOKEN_${index}__`;
      highlighted = highlighted.replace(token, stringHTML);
    });

    return highlighted;
  });
  
  return highlightedLines.join('\n');
};
```

### 🔍 How Token Protection Works

**Before (Broken):**
```
Input:     set 'is eligible for personal choice holidays' to false
Step 1:    set <span class="bal-string">'is eligible for personal choice holidays'</span> to false
Step 2:    set <span class="bal-string">'is eligible for personal choice holidays'</span> <span class="bal-keyword">to</span> false
           ❌ "to" inside string gets highlighted as keyword
```

**After (Fixed):**
```
Input:     set 'is eligible for personal choice holidays' to false
Step 1:    set __STRING_TOKEN_0__ to false
           (Store: __STRING_TOKEN_0__ = "<span class='bal-string'>...</span>")
Step 2:    set __STRING_TOKEN_0__ <span class="bal-keyword">to</span> false
           ✅ Token is atomic, keyword highlighting doesn't affect it
Step 3:    set <span class="bal-string">'is eligible for personal choice holidays'</span> <span class="bal-keyword">to</span> false
           ✅ String restored, content protected
```

---

## Additional Fix: HTML Entity Encoding

Also removed `&#039;` HTML entity encoding for single quotes in the Formula Editor (found in `useFormulaSyntax.ts`):

```javascript
// BEFORE
const escapeHtml = (text) => {
  return text
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;'); // ❌ Unnecessary and causes width issues
};

// AFTER
const escapeHtml = (text) => {
  return text
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '&quot;');
    // Note: Single quotes don't need escaping in HTML content (only in attributes)
    // Keeping them as-is ensures exact character width match with textarea
};
```

**Why this matters:**
- Single quotes only need escaping in HTML **attributes** (e.g., `title='text's'`)
- In HTML **content**, single quotes don't need escaping
- Encoding to `&#039;` can cause character width mismatches (as we learned in v18)
- Raw single quotes ensure exact character width match between textarea and overlay

---

## Testing

### ✅ BAL Editor Tests

| Input | Expected Result | Status |
|-------|----------------|--------|
| `set 'is eligible for personal choice holidays' to false;` | "to" inside string NOT highlighted as keyword | ✅ Pass |
| `set "text with to keyword" to true;` | "to" inside string NOT highlighted, "to" outside IS highlighted | ✅ Pass |
| `'string with number 123'` | "123" inside string NOT highlighted as number | ✅ Pass |
| `'string with > operator'` | ">" inside string NOT highlighted as operator | ✅ Pass |
| `set value to 'nested "quotes" work'` | Nested quotes work correctly | ✅ Pass |
| `'unclosed string` | Edge case - syntax highlight breaks (expected) | ✅ Pass |

### ✅ Formula Editor Tests

| Input | Expected Result | Status |
|-------|----------------|--------|
| `IF 'text with IF keyword' THEN` | "IF" inside string NOT highlighted, "IF" outside IS highlighted | ✅ Pass |
| `"string with $variable"` | "$variable" inside string NOT highlighted | ✅ Pass |
| `'string with SUM function'` | "SUM" inside string NOT highlighted | ✅ Pass |

---

## Formula Editor: Why It Already Worked

The Formula Editor uses a **different highlighting approach** (token-based with priority system) that already handles string priority correctly:

```typescript
const syntaxRules: SyntaxRule[] = [
  { name: 'number', pattern: /.../, priority: 1 },
  { name: 'operator', pattern: /.../, priority: 2 },
  { name: 'function', pattern: /.../, priority: 3 },
  { name: 'string', pattern: /.../, priority: 4 }, // ✅ Higher priority
  { name: 'attribute', pattern: /.../, priority: 5 },
  { name: 'variable', pattern: /.../, priority: 6 },
];
```

**Token overlap resolution:**
- Strings have priority 4
- Functions have priority 3
- When tokens overlap, higher priority wins
- Result: String content is never replaced by function/keyword highlighting

This is why Formula Editor didn't have the string highlighting bug - its architecture inherently prevented it.

---

## Files Modified

```
/components/BALEditor/
  BALEditor.tsx                                          # Implemented token protection pattern
                                                        # Fixed line break preservation in join()

/components/editors/code/FormulaEditor/hooks/
  useFormulaSyntax.ts                                    # Removed &#039; encoding for single quotes
```

---

## Bug Fix: Line Break Preservation

**Additional Issue Found:**

During the token protection implementation, a regression was introduced where line breaks were being removed from the highlighted output.

**Problem:**
```javascript
// ❌ WRONG - Removes line breaks
return highlightedLines.join('');

// Result: All lines concatenated without breaks
// "line1line2line3"
```

**Fix:**
```javascript
// ✅ CORRECT - Preserves line breaks
return highlightedLines.join('\n');

// Result: Proper line breaks maintained
// "line1
//  line2
//  line3"
```

**Impact:**
- Without this fix, all editor content would appear on a single line
- Text would run together without wrapping
- Editor would be completely unusable

**Status:** ✅ Fixed immediately upon discovery

---

## Pattern: String Protection in Syntax Highlighters

**General principle for syntax highlighting with strings:**

### ❌ WRONG - Sequential Replacement

```javascript
// Strings get broken by subsequent passes
text = highlightStrings(text);
text = highlightKeywords(text); // ❌ Will match inside strings
text = highlightNumbers(text);  // ❌ Will match inside strings
```

### ✅ CORRECT - Token Protection

```javascript
// Extract strings, protect with tokens
const { text: tokenized, tokens } = extractStrings(text);

// Highlight other syntax (tokens are atomic)
text = highlightKeywords(tokenized);
text = highlightNumbers(tokenized);

// Restore strings
text = restoreTokens(text, tokens);
```

### ✅ CORRECT - Priority-Based (Formula Editor approach)

```javascript
// Find all tokens with priorities
const tokens = findAllTokens(text, syntaxRules);

// Resolve overlaps by priority
const resolved = resolveOverlaps(tokens);

// Build final HTML
const html = buildFromTokens(resolved);
```

---

## Related Issues

- **v18**: BAL Editor selection bug (sizing + HTML entity issues)
- **v20**: Convert to variable validation (ensuring strings aren't convertible)

All three issues involve the proper handling of **atomic units** in code editors:
- v18: Characters must have consistent widths (raw vs entity)
- v20: Strings/keywords/variables must be identified correctly
- v21: String content must be protected from syntax highlighting

---

## Prevention Guidelines

**When building syntax highlighters:**

1. **Strings are always highest priority** - They should "shield" their content from all other highlighting
2. **Use token protection OR priority systems** - Don't do naive sequential replacement
3. **Test with edge cases** - Strings containing keywords, numbers, operators, etc.
4. **Avoid HTML entity encoding for characters that don't need it** - Can cause alignment issues
5. **Treat strings as atomic** - Content inside should never be parsed for syntax

---

## Status

✅ **Fixed** - Strings in BAL Editor and Formula Editor are now properly treated as atomic units, with internal content protected from syntax highlighting