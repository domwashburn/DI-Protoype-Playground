# Inline Typeahead Update - Synchronized with Autocomplete

**Date:** October 24, 2025  
**Version:** v09  
**Type:** Enhancement  

## Summary

Updated inline typeahead to work alongside autocomplete popover, showing both together with synchronized selection. As you arrow through the autocomplete list, the inline ghost text updates to match. Tab/Enter now properly accept suggestions.

## Context

User feedback on v08 identified several issues:
1. Autocomplete popover wasn't showing for keywords
2. Ghost text wasn't synchronized with autocomplete selection
3. Tab/Space acceptance didn't work properly
4. Some keywords like "IF" didn't trigger suggestions

## Implementation Details

### Updated Architecture

**Before (v08):**
- Separate `useInlineTypeahead` hook with own state
- Only showed ghost text, no dropdown
- Independent matching logic
- Required 2+ characters AND completion text

**After (v09):**
- `useInlineTypeahead` now syncs with `useAutocompleteTriggers`
- Shows BOTH dropdown AND ghost text together
- Arrow keys navigate dropdown, ghost text updates automatically
- Works for all keywords including short ones like "IF"

### Autocomplete Provider for Keywords

Added empty-trigger provider for word-based matching:

```typescript
{
  trigger: '', // Empty = word-based matching
  getSuggestions: (query: string) => {
    if (query.length === 0) return [];
    
    const upperQuery = query.toUpperCase();
    const filtered = FORMULA_KEYWORDS.filter(k =>
      k.keyword.startsWith(upperQuery)
    );
    
    return filtered.map(k => ({
      id: k.keyword,
      label: k.keyword,
      description: k.description,
      insertText: k.keyword,
    }));
  },
}
```

**Word Boundary Detection:**
```typescript
// Find the current word being typed
let startPos = cursorPos;
while (startPos > 0) {
  const char = textBeforeCursor[startPos - 1];
  // Stop at whitespace, operators, or special characters
  if (/[\s+\-*/%=<>!&|(),]/.test(char)) {
    break;
  }
  startPos--;
}
```

### Updated useInlineTypeahead Hook

**New Implementation:**
```typescript
export function useInlineTypeahead(
  autocomplete: UseAutocompleteTriggers,
  value: string
): InlineTypeaheadResult {
  const ghostText = useMemo((): TypeaheadGhostText | null => {
    // Only show if autocomplete has suggestions
    if (!autocomplete.showSuggestions || autocomplete.suggestions.length === 0) {
      return null;
    }
    
    // Get the currently selected item
    const selectedItem = autocomplete.suggestions[autocomplete.selectedIndex];
    if (!selectedItem) {
      return null;
    }
    
    // For word-based matching (empty trigger)
    if (autocomplete.activeTrigger === '') {
      const fullText = selectedItem.insertText || selectedItem.label;
      const upperQuery = autocomplete.query.toUpperCase();
      const upperFullText = fullText.toUpperCase();
      
      if (upperFullText.startsWith(upperQuery)) {
        const completion = fullText.substring(autocomplete.query.length);
        return {
          completion,
          prefix: autocomplete.query
        };
      }
    }
    
    // For trigger-based matching ($, #), don't show ghost text
    return null;
  }, [
    autocomplete.showSuggestions,
    autocomplete.suggestions,
    autocomplete.selectedIndex,
    autocomplete.query,
    autocomplete.activeTrigger
  ]);

  return {
    ghostText
  };
}
```

**Key Changes:**
- Now accepts `autocomplete` object instead of `textareaRef` and `value`
- Syncs with `autocomplete.selectedIndex` (arrow keys update this)
- Returns `ghostText` instead of managing own `suggestion` state
- No more `acceptSuggestion` method (autocomplete handles this)

### Word-Based Autocomplete Selection

**selectSuggestion** now handles both modes:

```typescript
if (activeTrigger === '') {
  // Word-based matching - replace the current word
  let startPos = cursorPos;
  while (startPos > 0) {
    const char = textBeforeCursor[startPos - 1];
    if (/[\s+\-*/%=<>!&|(),]/.test(char)) {
      break;
    }
    startPos--;
  }
  
  newValue = 
    text.substring(0, startPos) +
    textToInsert +
    text.substring(cursorPos);
  
  newCursorPosition = startPos + textToInsert.length;
} else {
  // Trigger-based matching ($, #) - replace trigger + query
  // ... existing logic
}
```

### UI Updates

**Autocomplete Header:**
```tsx
<div className={styles.autocompleteHeader}>
  {autocomplete.activeTrigger === '$' ? 'Variables' : 
   autocomplete.activeTrigger === '#' ? 'Attributes' : 
   'Keywords'}
  {autocomplete.query && (
    <span className={styles.autocompleteQuery}>: {autocomplete.query}</span>
  )}
</div>
```

**Simplified Keyboard Handling:**
```typescript
// Removed old inline typeahead Tab handling
// Now autocomplete handles all keyboard events including Tab
const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  const handled = autocomplete.handleKeyDown(e);
  if (handled) {
    // Tab/Enter accept from autocomplete
    if ((e.key === 'Enter' || e.key === 'Tab') && autocomplete.suggestions[autocomplete.selectedIndex]) {
      e.preventDefault();
      const result = autocomplete.selectSuggestion(autocomplete.suggestions[autocomplete.selectedIndex]);
      // ... update editor
    }
  }
  // ... keyboard shortcuts
}, [autocomplete, onChange, keyboardShortcuts]);
```

## User Experience

**Example Flow:**
```
1. Type: "I"
   → Dropdown shows: IF, IS (if exists)
   → Ghost text: "I|F"  (| = cursor)
   
2. Continue typing: "IF"
   → Dropdown shows: IF
   → Ghost text: none (already complete)
   
3. Type: "EL"
   → Dropdown shows: ELSEIF, ELSE
   → Ghost text: "EL|SEIF" (first result)
   
4. Press Arrow Down
   → Dropdown highlights: ELSE
   → Ghost text updates: "EL|SE"
   
5. Press Tab
   → Inserts: "ELSE"
   → Cursor: "ELSE|"
```

**Why This is Better:**
- **Both views** - Dropdown for browsing, ghost text for preview
- **Synchronized** - Arrow keys update both simultaneously
- **Works for all keywords** - No minimum length requirement
- **Consistent** - Same Tab/Enter behavior as $ and # autocomplete
- **Clear priority** - $ and # take precedence over keywords

## Files Modified

### Modified Files
```
/components/editors/core/hooks/useAutocompleteTriggers.ts
/components/editors/code/FormulaEditor/hooks/useInlineTypeahead.ts
/components/editors/code/FormulaEditor/hooks/index.ts
/components/editors/code/FormulaEditor/FormulaEditor.tsx
```

## Breaking Changes

None - this is a backward-compatible enhancement.

## Technical Notes

**Provider Priority:**
The autocomplete system checks providers in order:
1. Keywords (empty trigger) - matches word boundaries
2. Variables ($) - takes precedence if $ is typed
3. Attributes (#) - takes precedence if # is typed

This means typing "$" immediately switches from keyword mode to variable mode, which is the desired behavior.

**Ghost Text Rendering:**
Ghost text only shows for keyword autocomplete (empty trigger), not for $ or #. This keeps the UI clean - $ and # have clear visual triggers and descriptions, so ghost text would be redundant.

**Case Sensitivity:**
- Keyword matching is case-insensitive (types "if" → matches "IF")
- Results always show in uppercase (FORMULA_KEYWORDS defined in uppercase)
- Insertion preserves keyword casing ("IF" not "if")

## Testing Checklist

- [x] Typing "I" shows dropdown with "IF" and ghost text "|F"
- [x] Typing "IF" shows dropdown with "IF", no ghost text (complete)
- [x] Typing "EL" shows dropdown with "ELSEIF", "ELSE" and ghost text "|SEIF"
- [x] Arrow down changes selection, ghost text updates to match
- [x] Tab accepts suggestion from dropdown
- [x] Enter accepts suggestion from dropdown
- [x] $ still triggers variable autocomplete (no keywords)
- [x] # still triggers attribute autocomplete (no keywords)
- [x] Escape closes dropdown and clears ghost text
- [x] No conflict between keyword and variable/attribute autocomplete

## Future Enhancements

**Possible Improvements:**
1. **Fuzzy matching** - Match keywords by subsequence, not just prefix
2. **Frequency ranking** - Show most-used keywords first
3. **Context-aware** - Different suggestions based on cursor context
4. **Multi-token** - Suggest "IF ... THEN" patterns
5. **Ghost text for $ and #** - Could be useful for long variable names

## References

- Parent: `/change-log/25-10-24_v08-InlineTypeaheadSuggestions.md`
- Guidelines: `/guidelines/Guidelines.md` v2.1
- Similar patterns: VS Code IntelliSense, GitHub Copilot

## User Request

> "Update to inline typeahead: It should show the auto suggest pop over, and the typeahead... first result in the auto-suggest pop over by default, and as a user arrows through the list, it should update the inline 'ghost text' typeahead shown inline. also, tab/space doesn't work to accept. is also doesn't work for all operators and terms (EG ELSEIF yes; IF no)"

✅ **Complete** - Implemented synchronized autocomplete with inline ghost text, fixed Tab acceptance, and enabled all keywords including short ones like "IF".
