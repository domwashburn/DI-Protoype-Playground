# Formula Comment Support

**Date:** October 25, 2025  
**Version:** v19

## Summary

Added support for `//` single-line comments in the Formula Editor. The tokenizer now properly skips comment lines, and comments are highlighted with italic styling in the editor.

## Context

Users were getting parse errors when trying to use comments in their formulas. The tokenizer was treating `//` as two division operators instead of recognizing it as a comment delimiter.

**Error Before Fix:**
```
ParseError: Unexpected token: SLASH at line 3, column 2
```

**Example Formula with Comments:**
```formula
$monthlyUsage = #account.apiCallsThisMonth / 1000

// Calculate base usage score
IF $monthlyUsage <= 100 THEN
  $usageScore = 10
ELSIF $monthlyUsage <= 500 THEN
  $usageScore = 25
ELSE
  $usageScore = 50
END
```

## Implementation Details

### 1. Tokenizer Updates (`/services/evaluationEngine/parsers/Tokenizer.ts`)

**Added Comment Detection in Operator Reading:**
- When encountering `/`, check if the next character is also `/`
- If yes, skip the entire line as a comment
- Otherwise, treat as division operator

**Added `skipComment()` method:**
```typescript
private skipComment(): void {
  while (!this.isAtEnd() && this.peek() !== '\n') {
    this.advance();
  }
  this.advance(); // consume '\n'
  this.line++;
  this.column = 1;
}
```

**Modified `readOperatorOrDelimiter()`:**
```typescript
case '/':
  // Check for comment
  if (this.peek() === '/') {
    // This is a comment, skip it
    this.skipComment();
    return this.nextToken()!;
  }
  return { type: 'SLASH', line, column };
```

### 2. Syntax Highlighting (`/components/editors/code/FormulaEditor/hooks/useFormulaSyntax.ts`)

**Added comment syntax rule:**
```typescript
{
  name: 'comment',
  pattern: /\/\/[^\n]*/g,
  className: 'formula-comment',
  priority: 10, // Highest priority to prevent parsing comment contents
}
```

**Why Priority 10?**
- Comments need highest priority so their contents aren't parsed as code
- Prevents variables, functions, etc. inside comments from being highlighted

### 3. CSS Styling (`/components/editors/code/FormulaEditor/FormulaEditor.module.css`)

**Added comment styling:**
```css
:global(.formula-comment) {
  color: var(--text-placeholder);
  font-style: italic;
  opacity: 0.7;
}
```

**Visual Treatment:**
- Uses placeholder text color for subtle appearance
- Italic font style to distinguish from code
- Reduced opacity (0.7) for further de-emphasis

## Files Changed

- `/services/evaluationEngine/parsers/Tokenizer.ts` - Added comment detection and skipping
- `/components/editors/code/FormulaEditor/hooks/useFormulaSyntax.ts` - Added comment highlighting rule
- `/components/editors/code/FormulaEditor/FormulaEditor.module.css` - Added comment styling

## Testing

### Test Cases

**1. Single-line comment:**
```formula
// This is a comment
$result = 10
```

**2. Comment after code:**
```formula
$result = 10 // Not yet supported (inline comments)
```

**3. Multiple comments:**
```formula
// Calculate discount
// Based on customer tier
$discount = #customer.tier * 0.1
```

**4. Comment with special characters:**
```formula
// Cost: $100, Discount: 10%, Total: $90
$total = 100 * 0.9
```

## Known Limitations

### Inline Comments Not Supported
Currently, comments must be on their own line. This does NOT work:
```formula
$result = 10 + 20 // Add two numbers
```

**Reason:** The tokenizer looks for `//` when reading the `/` operator. At that point, it has already consumed the first `/`, so it can't detect `//` after an expression on the same line.

**Future Fix:** Would require lookahead in the tokenizer to detect `//` before consuming the first `/`.

### Multi-line Comments Not Supported
Block comments (like `/* ... */`) are not supported:
```formula
/*
 * This is a multi-line comment
 * NOT SUPPORTED
 */
```

**Rationale:** Single-line comments cover 90% of use cases and are simpler to implement.

## Breaking Changes

None. This is purely additive functionality.

## Next Steps

### Potential Future Enhancements

1. **Inline Comment Support**
   - Allow comments after code on the same line
   - Requires tokenizer refactoring for better lookahead

2. **Multi-line Comment Support**
   - Block comments with `/* ... */`
   - Useful for longer documentation

3. **Documentation Comments**
   - Special syntax like `/// Documentation` for formula documentation
   - Could auto-populate formula description field

4. **Comment-based Directives**
   - Special comments like `// @deprecated` or `// @version 2.0`
   - Could provide metadata or warnings

## References

- **Tokenizer Pattern:** Similar to JavaScript's `//` comment handling
- **Syntax Highlighting:** Comments typically have lowest visual priority (muted color, italic)
- **Carbon Design:** Uses placeholder text color for de-emphasized content
