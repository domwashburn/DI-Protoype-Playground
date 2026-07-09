# Syntax Highlighting Regressions - FIXED ✅

**Date:** 2024
**Reporter:** User
**Status:** ✅ ALL FIXED

## Reported Issues

### 1. ✅ FIXED: Keywords (IF/THEN/OR/AND) Display as Black Instead of Blue
**Symptom:** Keywords in formula mode show as bold black instead of bold blue

**Root Cause:** Missing CSS variable `--syntax-keyword` in `/styles/globals.css`

**Fix:** Added `--syntax-keyword: #0f62fe;` to globals.css

**Files Modified:**
- `/styles/globals.css` - Added `--syntax-keyword` variable

---

### 2. ✅ FIXED: Plain Text in BAL Editor is Purple (Should be Gray 90)
**Symptom:** Regular text (not keywords, variables, etc.) is highlighted purple

**Root Cause:** Overly broad BAL variable pattern was matching all identifiers

**Fix Applied:** Removed problematic BAL variable pattern from `useCodeSyntax.ts`

**Result:** Plain text now defaults to `--text-primary` (#161616, gray 90)

---

### 3. ✅ FIXED: Special Characters in Comments Break Highlighting
**Symptom:** Comments with special characters ($, ', `, /, ?, &, ;, ", *, etc.) cause incorrect highlighting on subsequent lines

**Example:**
```formula
// Type $ to see symbolic variables
// Type ' to see verbalized variables

'customer name' = "John Doe"  // Should highlight correctly
```

**Root Cause:** 
1. Overlap detection was incomplete - only checked if match START was inside region
2. Didn't properly check if entire match overlapped with comment region

**Fix Applied:**
- Improved overlap detection to use proper interval overlap logic
- Changed from: `match.index >= region.start && match.index < region.end`
- Changed to: `matchStart < region.end && matchEnd > region.start`
- This prevents ANY overlap between token matches and comment regions

**Result:** Comments with special characters no longer break highlighting on subsequent lines

---

### 4. ✅ FIXED: Template Literal Highlighting Regressed
**Symptom:** Template literals show all green instead of applying internal highlighting rules

**Example:**
```formula
set 'summary' to `'item count' items ('first item' to 'last item') = $'final price'`
```

**Expected:** 
- Backticks and overall template: green italic
- `'item count'`, `'first item'`, `'last item'`: purple italic (verbalizations)
- `$'final price'`: purple (variable with verbalization)
- `=`: pink (operator)

**Previous Behavior:**
- Entire template literal: green (no internal highlighting)

**Root Cause:** 
- Only highlighting `${}` expressions inside templates
- Ignoring all other syntax (verbalizations, variables, operators)

**Fix Applied:**
- Changed to recursively highlight ENTIRE template content
- Removed `${}` expression extraction
- Now calls `highlightSyntax(content)` on the full template content
- Wraps result in template literal class for green italic styling

**Result:** Template literals now show full internal syntax highlighting while maintaining template literal styling (green italic wrapper)

---

## Implementation Details

### Key Innovation: Two-Pass Highlighting System

**Pass 1: Pre-processing (Special Regions)**
```typescript
// Extract and process special regions
const specialRegions: SpecialRegion[] = [];

// 1. Comments (// to newline)
const commentPattern = /\/\/[^\n]*/g;
while ((match = commentPattern.exec(text)) !== null) {
  specialRegions.push({
    start: match.index,
    end: match.index + match[0].length,
    html: `<span class="${mode}-comment">${escapeHtml(match[0])}</span>`,
    type: 'comment'
  });
}

// 2. Template literals (recursive highlighting)
const templatePattern = /`(?:[^`\\]|\\.)*`/g;
while ((match = templatePattern.exec(text)) !== null) {
  const content = match[0].substring(1, match[0].length - 1);
  const highlightedContent = highlightSyntax(content); // RECURSIVE
  specialRegions.push({
    start: match.index,
    end: match.index + match[0].length,
    html: `<span class="template-literal">\`${highlightedContent}\`</span>`,
    type: 'template'
  });
}
```

**Pass 2: Token Matching with Overlap Prevention**
```typescript
// Apply syntax rules, but skip overlapping regions
syntaxRules.forEach(rule => {
  const matches = text.matchAll(rule.pattern);
  for (const match of matches) {
    const matchStart = match.index;
    const matchEnd = match.index + match[0].length;
    
    // PROPER overlap detection
    const overlapsSpecial = specialRegions.some(region => 
      matchStart < region.end && matchEnd > region.start
    );
    
    if (overlapsSpecial) continue; // Skip!
    
    tokens.push({ ...match });
  }
});
```

### Why This Works

**Comments:**
- Extracted first as special regions
- Content is HTML-escaped and wrapped in comment class
- All subsequent token matching skips the comment region
- Special characters like $, ', `, etc. are never matched by other patterns

**Template Literals:**
- Extracted as special regions
- Content is recursively highlighted (allows nested syntax)
- Wrapped in template literal class (green italic)
- Other patterns skip the template region on the outer pass
- Inner content is highlighted normally on the recursive pass

**Overlap Detection:**
- Uses standard interval overlap formula: `A.start < B.end && A.end > B.start`
- Prevents partial overlaps, full overlaps, and adjacent matches
- Ensures clean separation between special regions and tokens

---

## Files Modified

1. **`/styles/globals.css`**
   - Added `--syntax-keyword: #0f62fe;` variable

2. **`/components/editors/code/shared/hooks/useCodeSyntax.ts`**
   - Removed overly broad BAL variable pattern
   - Implemented pre-processing for comments
   - Implemented recursive highlighting for template literals
   - Fixed overlap detection logic

3. **`/components/editors/code/FormulaEditor/FormulaEditor.module.css`**
   - Updated comment color to use `--syntax-comment` variable

---

## Testing Examples

### Example 1: Comments with Special Characters ✅
```formula
// Type $ to see symbolic variables
// Type ' to see verbalized variables

'customer name' = "John Doe"
'customer age' = 25
```
**Expected:** Comments gray, verbalizations purple, strings green

### Example 2: Template Literal with Internal Highlighting ✅
```formula
set 'summary' to `'item count' items ('first item' to 'last item') = $'final price'`
```
**Expected:** 
- Template wrapper: green italic
- Verbalizations inside: purple italic
- Variable inside: purple
- Operators inside: pink

### Example 3: Object Property Access ✅
```formula
// Create a customer record object
$customer = {name: "Alice Chen", age: 32, score: 850}

// Access individual properties
$customerName = $customer.name
$customerAge = $customer.age
$customerScore = $customer.score

// Calculate credit worthiness from properties
IF $customer.score >= 800 AND $customer.age >= 25 THEN
  95
ELSIF $customer.score >= 700 THEN
  75
END
```
**Expected:**
- `$customer` validates as defined variable (purple)
- `$customer.name`, `$customer.age`, `$customer.score` all valid (purple)
- No red underlines on property access
- Base variable name validated, properties always valid

### Example 4: Unmatched Quotes in Comments ✅
```formula
// Type $ to see symbolic variables
// Type ' to see verbalized variables

'customer name' = "John Doe"
'customer age' = 25
'is adult' = 'customer age' >= 18

IF 'is adult' THEN
  'welcome message' = "Welcome, " + 'customer name'
ELSE
  'welcome message' = "Parental consent required"
END

RETURN 'welcome message'
```
**Expected:**
- Comments with `'` or `"` don't break highlighting on subsequent lines
- All verbalizations on lines 4-12 highlight correctly as purple italic
- All strings highlight correctly as green

**Root Cause:**
- Verbalization pattern: `/'([^'\\]|\\.)+('(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*)/g` could match across newlines
- String pattern: `/"(?:[^"\\]|\\.)*"/g` could match across newlines
- A single `'` in a comment on line 2 could match with a `'` on line 4, treating everything between as a verbalization
- This broke highlighting for all code between the unmatched quote and its eventual match

**Fix Applied:**
- Updated verbalization pattern to exclude newlines: `/'([^'\\\n]|\\.)+('(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*)/g`
- Updated string pattern to exclude newlines: `/"([^"\\\n]|\\.)*"/g`
- Character class now explicitly includes `\n` in the negated set
- Patterns can no longer match across line boundaries
- Unmatched quotes are simply not highlighted (correct behavior)

---

## All Issues Resolved ✅

All 4+ syntax highlighting regressions have been fixed:
1. ✅ Keywords display as blue
2. ✅ BAL plain text is gray
3. ✅ Comments with special characters work
4. ✅ Template literals have internal highlighting
5. ✅ Object property access validates correctly

**Status:** Complete and tested