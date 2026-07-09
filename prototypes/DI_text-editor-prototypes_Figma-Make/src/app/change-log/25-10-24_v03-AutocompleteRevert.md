# Formula Editor Autocomplete Revert - Pattern Alignment

**Date:** October 24, 2025  
**Version:** v03  
**Type:** Bug Fix / Architecture Correction

## Summary

Reverted Formula Editor back to the proven BAL Editor pattern (textarea + overlay + inline autocomplete). The previous refactor (v02) broke autocomplete functionality by overcomplicating the architecture with unnecessary abstraction layers.

## Problem

The v02 refactor introduced base `CodeEditor` and `Autocomplete` components that:
- Changed the `useAutocompleteTriggers` interface from `textareaRef` to `value + cursorPosition`
- Broke the working autocomplete (required hitting space, didn't trigger on `$` or `#`)
- Added unnecessary complexity and abstraction
- Violated the principle: "Same editor, same popover - differences only in type"

## Solution

**Back to Basics:**
1. Reverted `useAutocompleteTriggers` to accept `textareaRef` (like BAL Editor)
2. Formula Editor now uses **exact same pattern** as BAL Editor:
   - Textarea + overlay for syntax highlighting
   - Inline autocomplete dropdown (not separate component)
   - Same positioning logic
   - Same keyboard navigation
3. **Differences are only in the data:**
   - BAL: Keywords + operators
   - Formula: Variables ($) + attributes (#)

## Implementation Details

### useAutocompleteTriggers Hook
```tsx
// ✅ CORRECT - Works like BAL Editor
export function useAutocompleteTriggers(
  textareaRef: RefObject<HTMLTextAreaElement>,
  providers: AutocompleteProvider[]
): UseAutocompleteTriggers
```

**Why this works:**
- Direct access to textarea element
- Can read `selectionStart` immediately
- Updates trigger instantly when typing

### Formula Editor Pattern
```tsx
// Same as BAL Editor
<div className={styles.editorWrapper}>
  {/* Overlay for syntax highlighting */}
  <div className={styles.overlay}>
    <pre dangerouslySetInnerHTML={{ __html: highlighted }} />
  </div>
  
  {/* Transparent textarea */}
  <textarea
    ref={textareaRef}
    value={value}
    onChange={handleChange}
    onKeyDown={handleKeyDown}
  />
  
  {/* Inline autocomplete dropdown */}
  {autocomplete.showSuggestions && (
    <div className={styles.autocomplete}>
      {/* Header, list, footer */}
    </div>
  )}
</div>
```

### Autocomplete Providers
```tsx
const providers: AutocompleteProvider[] = [
  {
    trigger: '$',
    getSuggestions: (query) => variables.filter(...)
  },
  {
    trigger: '#',
    getSuggestions: (query) => attributes.filter(...)
  }
];
```

## Files Changed

### Modified
- `/components/editors/core/hooks/useAutocompleteTriggers.ts` - Reverted to textareaRef pattern
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx` - Uses BAL Editor pattern
- `/components/editors/code/FormulaEditor/FormulaEditor.module.css` - Inline autocomplete styles

### Deleted (Unnecessary Abstraction)
- `/components/editors/core/components/CodeEditor/` - Entire directory
- `/components/editors/core/components/Autocomplete/` - Entire directory
- `/components/editors/core/components/index.ts` - Barrel export

## Why the Abstraction Failed

**The v02 approach assumed:**
- Multiple code editors would share the same component
- Abstraction would reduce duplication
- Composition pattern would be more flexible

**Reality:**
- Each editor has different needs (line numbers, formatting, etc.)
- The abstraction layer added complexity without value
- Direct implementation is clearer and more maintainable
- **Same pattern ≠ same component**

## The Correct Pattern

**✅ DO:**
- Use the same **architecture pattern** (textarea + overlay)
- Share the same **hook** (`useAutocompleteTriggers`)
- Share the same **types** (`AutocompleteProvider`, `AutocompleteItem`)
- Keep autocomplete **inline** in each editor

**❌ DON'T:**
- Create base components that wrap everything
- Add abstraction layers "for future reuse"
- Change working patterns without clear benefit

## Lessons Learned

1. **If it ain't broke, don't fix it** - BAL Editor's autocomplete worked perfectly
2. **Patterns > Components** - Share architecture patterns, not necessarily components
3. **YAGNI** - Don't build abstractions for hypothetical future editors
4. **Test Before Commit** - The broken autocomplete should have been caught immediately
5. **User Feedback is Truth** - "It worked better last version" is the most important signal

## Testing Checklist

Verified (post-revert):
- [x] Autocomplete appears immediately when typing `$`
- [x] Autocomplete appears immediately when typing `#`
- [x] Suggestions filter as you type
- [x] Keyboard navigation works (↑↓, Enter, Esc)
- [x] Click selection works
- [x] Cursor positioning is accurate
- [x] Syntax highlighting works
- [x] No regressions in Variable Table
- [x] Same visual style as BAL Editor

## Architecture Decision

**Going Forward:**

**Shared Components:**
- `useAutocompleteTriggers` hook
- Type definitions (`AutocompleteProvider`, `AutocompleteItem`, etc.)
- Utility functions (`getTextareaCaretPosition`)

**Editor-Specific:**
- Textarea + overlay implementation (in each editor)
- Autocomplete dropdown rendering (in each editor)
- Syntax highlighting rules (in each editor)
- Line numbers, formatting, etc. (if/when needed)

**Why this works:**
- Each editor controls its own layout
- Editors can differ (line numbers in BAL, none in Formula)
- No "one size fits all" component trying to handle everything
- Shared hook provides the autocomplete logic
- Easy to understand and debug

## Next Steps

### Immediate
- [ ] Test thoroughly with real usage
- [ ] Verify no edge cases broken
- [ ] Update documentation to reflect correct pattern

### Future
- [ ] If BAL Editor needs line numbers, add them to BAL Editor only
- [ ] If Formula Editor needs different layout, modify Formula Editor only
- [ ] **Don't try to unify them again**

## References

- [BAL Editor](/components/BALEditor/BALEditor.tsx) - Reference implementation
- [useAutocompleteTriggers Hook](/components/editors/core/hooks/useAutocompleteTriggers.ts)
- [Formula Editor](/components/editors/code/FormulaEditor/FormulaEditor.tsx)

## Apology to User

This revert acknowledges that v02 was a mistake. The user was right:
- The autocomplete worked better before
- The pattern should be the same
- Only the type (BAL vs Formula) should differ

The lesson: Trust working code, and always test changes that affect core functionality.
