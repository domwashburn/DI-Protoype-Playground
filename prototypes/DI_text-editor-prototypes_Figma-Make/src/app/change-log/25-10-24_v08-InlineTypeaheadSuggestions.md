# Inline Typeahead Suggestions - Formula Editor

**Date:** October 24, 2025  
**Version:** v08  
**Type:** Feature  

## Summary

Implemented Gmail-style inline typeahead suggestions for the Formula Editor. As you type keywords (e.g., "EL"), ghost text appears after the cursor showing the completion (e.g., "SEIF" for "ELSEIF") that can be accepted with Tab.

## Context

User requested inline typeahead functionality similar to Gmail's autocomplete, where suggestions appear as ghost text inline with your typing rather than in a dropdown menu. This provides a faster, more intuitive autocomplete experience for formula keywords.

## Implementation Details

### New Hook: `useInlineTypeahead.ts`

Created a new hook that handles:
- **Word detection** - Finds the current word being typed at cursor position
- **Suggestion matching** - Matches typed prefix against formula keywords (case-insensitive)
- **Tab acceptance** - Accepts suggestion and inserts completion text
- **Auto-update** - Updates suggestions on every keystroke and cursor movement

**Vocabulary:**
```typescript
const FORMULA_KEYWORDS = [
  // Control flow
  'IF', 'ELSEIF', 'ELSE', 'END', 'THEN',
  
  // Logical
  'AND', 'OR', 'NOT',
  
  // Functions
  'SUM', 'AVG', 'AVERAGE', 'MAX', 'MIN', 'COUNT',
  'ABS', 'ROUND', 'FLOOR', 'CEIL', 'SQRT', 'POW', 'MOD',
  'CONCAT', 'UPPER', 'LOWER', 'TRIM', 'LEN',
  'LEFT', 'RIGHT', 'MID', 'REPLACE', 'FIND',
  'DATE', 'NOW', 'TODAY', 'YEAR', 'MONTH', 'DAY',
  
  // Common comparisons
  'TRUE', 'FALSE', 'NULL',
];
```

**Key Features:**
- Only suggests when typing 2+ characters
- Matches keywords that start with typed prefix (case-insensitive)
- Returns first match (simple algorithm - could be enhanced with ranking)
- Clears suggestion when cursor moves or typing doesn't match

### UI Implementation

**Ghost Text Overlay:**
```tsx
{/* Inline typeahead ghost text overlay */}
{inlineTypeahead.suggestion && (
  <div className={styles.typeaheadOverlay} aria-hidden="true">
    <pre className={styles.overlayContent}>
      {renderTypeaheadGhost()}
      {'\n'}
    </pre>
  </div>
)}
```

**CSS Styling:**
```css
/* Typeahead Overlay - Ghost text layer */
.typeaheadOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: var(--spacing-04);
  overflow: auto;
  pointer-events: none;
  color: transparent;
  white-space: pre-wrap;
  word-wrap: break-word;
  z-index: 2; /* Above syntax highlighting overlay */
}

/* Ghost text styling */
.ghostText {
  color: var(--text-placeholder);
  opacity: 0.5;
  font-style: italic;
}
```

**Visual Characteristics:**
- Ghost text appears in gray/placeholder color
- 50% opacity for subtle appearance
- Italic styling to distinguish from actual text
- Positioned precisely at cursor using same font/spacing as textarea

### Keyboard Handling

**Priority Order:**
1. **Tab + inline suggestion** - Accept inline typeahead (highest priority)
2. **Dropdown autocomplete** - $ or # triggered suggestions
3. **Keyboard shortcuts** - Cmd+A, Escape, etc.

```typescript
const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  // Tab key for inline typeahead (highest priority)
  if (e.key === 'Tab' && inlineTypeahead.suggestion && !autocomplete.showSuggestions) {
    e.preventDefault();
    inlineTypeahead.acceptSuggestion();
    return;
  }
  
  // ... rest of keyboard handling
}, [autocomplete, onChange, keyboardShortcuts, inlineTypeahead]);
```

### Rendering Logic

The `renderTypeaheadGhost()` function splits content into three parts:
1. **Text before cursor** - Syntax highlighted normally
2. **Ghost completion** - Gray italic text (what will be inserted)
3. **Text after cursor** - Syntax highlighted normally

```typescript
const renderTypeaheadGhost = useCallback(() => {
  if (!inlineTypeahead.suggestion || !textareaRef.current) {
    return null;
  }

  const cursorPos = textareaRef.current.selectionStart;
  const textBeforeCursor = value.substring(0, cursorPos);
  const textAfterCursor = value.substring(cursorPos);

  const beforeHtml = highlightSyntax(textBeforeCursor);
  const ghostText = inlineTypeahead.suggestion.completion;
  const afterHtml = highlightSyntax(textAfterCursor);

  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: beforeHtml }} />
      <span className={styles.ghostText}>{ghostText}</span>
      <span dangerouslySetInnerHTML={{ __html: afterHtml }} />
    </>
  );
}, [value, inlineTypeahead.suggestion, highlightSyntax]);
```

## User Experience

**Example Flow:**
1. User types: `IF $amount > 100\n  $discount = 0.10\nEL`
2. Ghost text appears: `EL|SEIF` (| = cursor, "SEIF" is ghost text)
3. User presses Tab → text becomes: `ELSEIF`
4. Cursor automatically positioned after inserted text

**Why This is Better:**
- **Faster** - No dropdown to navigate, just Tab to accept
- **Less disruptive** - Ghost text is subtle, doesn't block view
- **More natural** - Like Gmail, VS Code, and modern IDEs
- **Works alongside dropdown** - Dropdown for $ and #, inline for keywords

## Files Modified

### New Files
```
/components/editors/code/FormulaEditor/hooks/useInlineTypeahead.ts
```

### Modified Files
```
/components/editors/code/FormulaEditor/hooks/index.ts
/components/editors/code/FormulaEditor/FormulaEditor.tsx
/components/editors/code/FormulaEditor/FormulaEditor.module.css
```

## Technical Notes

**Overlay Architecture:**
The Formula Editor now has THREE overlays stacked on top of the textarea:

1. **Syntax highlighting overlay** (z-index: auto)
   - Shows colored syntax for all text
   - `color: transparent` to hide base text, only show spans

2. **Typeahead ghost overlay** (z-index: 2)
   - Shows only when suggestion exists
   - Renders text before + ghost text + text after
   - `color: transparent` except for `.ghostText` span

3. **Textarea** (z-index: 1)
   - `color: transparent` to hide typed text
   - `caret-color: var(--text-primary)` to show cursor
   - Accepts all user input

All three layers must have identical:
- `padding: var(--spacing-04)`
- `font-family: var(--font-family-mono)`
- `white-space: pre-wrap`
- `word-wrap: break-word`

This ensures perfect alignment between typed text, syntax highlighting, and ghost text.

**Event Handling:**
The hook listens to:
- `selectionchange` - Cursor movement
- `click` - Click repositioning
- `keyup` - After key handling
- `value` changes (via useEffect)

This ensures suggestions update immediately and stay in sync with cursor position.

## Future Enhancements

**Possible Improvements:**
1. **Ranking algorithm** - Score suggestions by frequency, context, or user history
2. **Multi-word suggestions** - Suggest entire phrases or code snippets
3. **Custom vocabulary** - Allow users to add custom keywords
4. **Learn from usage** - Prioritize frequently used keywords
5. **Context-aware** - Different suggestions based on what came before
6. **Preview** - Show brief description of keyword when ghost text appears

## Testing Checklist

- [x] Typing "EL" shows "SEIF" as ghost text
- [x] Tab key accepts suggestion and completes to "ELSEIF"
- [x] Ghost text disappears when cursor moves away
- [x] Ghost text updates as you continue typing
- [x] Case-insensitive matching (typing "el" also suggests "SEIF")
- [x] Dropdown autocomplete ($, #) still works
- [x] No conflict between inline typeahead and dropdown Tab
- [x] Ghost text visually distinct (gray, italic, subtle)
- [x] No performance issues or lag

## References

- Parent: `/change-log/25-10-24_v07-SyntaxHighlightingFixes.md`
- Guidelines: `/guidelines/Guidelines.md` v2.1
- Similar patterns: Gmail compose, VS Code IntelliSense, GitHub Copilot

## User Request

> "Can you support inline typeahead suggestions in the formula editor so if I type something like EL i see EL|SE IF after my cursor and I can just tab to accept (like gmail)"

✅ **Complete** - Implemented as requested with Gmail-style inline ghost text and Tab acceptance.
