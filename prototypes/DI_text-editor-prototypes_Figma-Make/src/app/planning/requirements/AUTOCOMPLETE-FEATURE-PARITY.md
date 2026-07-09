# Autocomplete Feature Parity Analysis

**Date:** November 13, 2025  
**Purpose:** Identify BAL Editor autocomplete features to migrate to Formula Editor  

---

## Executive Summary

After analyzing both editors, **FormulaEditor has a MORE SOPHISTICATED autocomplete system** than BALEditor. We need to **migrate some BAL-specific behaviors** while **preserving FormulaEditor's superior infrastructure**.

### Key Findings:

✅ **FormulaEditor is superior** - shared hook, better positioning, highlight matching  
⚠️ **BAL has unique Tab behavior** - Tab accepts autocomplete OR indents (context-aware)  
⚠️ **BAL has simpler trigger** - 2+ characters triggers autocomplete (no special triggers)  
✅ **Both have keyboard nav** - Arrow keys, Enter, Escape work the same  

---

## Feature Comparison Matrix

| Feature | BALEditor | FormulaEditor | Action Required |
|---------|-----------|---------------|-----------------|
| **Keyboard Navigation** | ✅ Arrow Up/Down | ✅ Arrow Up/Down | ✅ Already equivalent |
| **Accept Suggestion** | ✅ Enter or Tab | ✅ Enter or Tab | ✅ Already equivalent |
| **Close Autocomplete** | ✅ Escape | ✅ Escape | ✅ Already equivalent |
| **Highlight Match** | ❌ Plain text | ✅ Bold matching text | ✅ FormulaEditor better |
| **Positioning Logic** | ⚠️ Approximate (char width calc) | ✅ Precise (getTextareaCaretPosition) | ✅ FormulaEditor better |
| **Autocomplete Hook** | ❌ Inline logic | ✅ Shared `useAutocompleteTriggers` | ✅ FormulaEditor better |
| **Tab Behavior** | ⚠️ Accept OR indent | ⚠️ Accept OR pass-through | ⚠️ **NEED TO FIX** |
| **Trigger Logic** | ✅ 2+ chars, any word | ⚠️ Trigger chars ($, #, @) | ⚠️ **NEED TO ADD** |
| **Suggestion Type Icons** | ❌ No icons | ✅ Type badges/icons | ✅ FormulaEditor better |
| **Scroll with list** | ❌ No scroll handling | ✅ Scrolls with suggestions | ✅ FormulaEditor better |

---

## Critical Differences to Address

### 1. Tab Behavior (MUST FIX)

**BALEditor (Context-Aware Tab):**
```tsx
// In handleKeyDown
if (e.key === 'Tab') {
  if (suggestions.length > 0) {
    // Accept autocomplete suggestion
    e.preventDefault();
    handleAutocompleteSelect(suggestions[selectedSuggestionIndex]);
  } else {
    // Insert 2 spaces for indentation
    handleTab(e); // Inserts '  ' at cursor
  }
}
```

**FormulaEditor (Current - Inconsistent):**
```tsx
// In autocomplete.handleKeyDown
case 'Tab':
  if (suggestions[selectedIndex]) {
    return true; // Signal handled, parent prevents default
  }
  return false; // Not handled, browser default (move focus)

// In main handleKeyDown - no manual Tab indent handling!
// Browser default Tab moves focus to next element
```

**❌ PROBLEM:** FormulaEditor doesn't handle Tab for indentation when autocomplete is closed!

**✅ SOLUTION:** Add Tab indent handling like BAL:
```tsx
const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  // ... existing autocomplete handling ...
  
  // Tab for indentation (when autocomplete not showing)
  if (e.key === 'Tab' && !autocomplete.showSuggestions) {
    e.preventDefault();
    
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    if (e.shiftKey) {
      // Shift+Tab: Unindent (remove 2 spaces from line start)
      // ... BAL logic ...
    } else {
      // Tab: Insert 2 spaces
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      setTimeout(() => {
        textarea.selectionStart = start + 2;
        textarea.selectionEnd = start + 2;
      }, 0);
    }
  }
}, [value, onChange, autocomplete]);
```

---

### 2. Trigger Logic (NEED TO ADD for BAL Mode)

**BALEditor (Word-Based Trigger):**
```tsx
// Triggers autocomplete on any word with 2+ characters
const updateAutocomplete = () => {
  const { word } = getCurrentWord(); // Gets word at cursor
  
  if (word.length < 2) {
    // Don't show autocomplete for single char
    setSuggestions([]);
    return;
  }
  
  // Filter all suggestions by partial match
  const filtered = allSuggestions
    .filter(s => s.text.toLowerCase().includes(word.toLowerCase()))
    .slice(0, 8);
  
  setSuggestions(filtered);
};
```

**FormulaEditor (Trigger-Character Based):**
```tsx
// Only triggers on special characters: $, #, @
const providers: AutocompleteProvider[] = [
  {
    trigger: '$',
    suggestions: variables.map(v => ({ label: v.name }))
  },
  {
    trigger: '#',
    suggestions: attributes.map(a => ({ label: a.name }))
  },
  {
    trigger: '@',
    suggestions: mentions.map(m => ({ label: m.name }))
  }
];
```

**✅ SOLUTION:** Add word-based provider for BAL mode:
```tsx
const providers: AutocompleteProvider[] = mode === 'bal' ? [
  {
    trigger: '', // Empty string = word-based matching
    minChars: 2, // Require 2+ characters
    suggestions: [
      ...balVocabulary.keywords.map(k => ({ label: k, type: 'keyword' })),
      ...balVocabulary.nlOperators.map(op => ({ label: op, type: 'operator' })),
      ...balVocabulary.nlFunctions.map(fn => ({ label: fn, type: 'function' })),
      ...vocabularyMappings.map(v => ({ label: v.term, type: 'vocabulary' })),
      ...ATTRIBUTES.map(a => ({ label: a.text, type: 'attribute' }))
    ]
  }
] : [
  // Formula mode providers (existing)
  { trigger: '$', suggestions: variables },
  { trigger: '#', suggestions: attributes },
  { trigger: '@', suggestions: mentions }
];
```

**CHECK IF ALREADY SUPPORTED:** Does `useAutocompleteTriggers` support `trigger: ''` (word-based)?

---

### 3. Indentation Handling (NEED TO ADD)

**BALEditor has Shift+Tab unindent:**
```tsx
if (e.shiftKey) {
  // Shift+Tab: Remove indent from current line
  const lineStart = text.lastIndexOf('\n', start - 1) + 1;
  const currentLine = text.substring(lineStart, lineEnd);
  
  let newLine = currentLine;
  if (currentLine.startsWith('  ')) {
    newLine = currentLine.substring(2); // Remove 2 spaces
  } else if (currentLine.startsWith(' ')) {
    newLine = currentLine.substring(1); // Remove 1 space
  }
  
  // Replace line and adjust cursor
  // ...
}
```

**FormulaEditor:** No Shift+Tab unindent support currently.

**✅ SOLUTION:** Add full Tab/Shift+Tab indent handling to FormulaEditor for both modes.

---

## Features FormulaEditor Already Has (BAL Doesn't)

### ✅ Highlight Matching Text in Suggestions
```tsx
const highlightMatch = (text: string, query: string) => {
  // ... sophisticated matching logic ...
  return (
    <>
      {before}<strong>{match}</strong>{after}
    </>
  );
};
```

### ✅ Precise Cursor Positioning
```tsx
import { getTextareaCaretPosition } from '../../../../utils/cursorPosition';

// Calculate exact pixel position for autocomplete dropdown
const pos = getTextareaCaretPosition(textareaRef.current, cursorPosition);
setAutocompletePosition({
  x: pos.left,
  y: pos.top,
  placeAbove: shouldPlaceAbove,
  maxHeight: calculateMaxHeight()
});
```

### ✅ Type Icons/Badges
```tsx
// Shows different icons for variable, function, attribute, etc.
<div className={styles.suggestionType}>
  {item.type === 'variable' && <VariableIcon />}
  {item.type === 'function' && <FunctionIcon />}
</div>
```

### ✅ Shared Hook Architecture
```tsx
// Reusable across all editors
const autocomplete = useAutocompleteTriggers({
  textareaRef,
  value,
  cursorPosition,
  providers,
});
```

---

## Migration Checklist

### Phase 1: Add Word-Based Autocomplete for BAL Mode

- [ ] **Check if `useAutocompleteTriggers` supports empty trigger**
  - Read `/components/editors/core/hooks/useAutocompleteTriggers.ts`
  - Look for `trigger: ''` or word-based matching logic
  - If not supported, add it

- [ ] **Create BAL autocomplete provider**
  ```tsx
  const balProvider: AutocompleteProvider = {
    trigger: '', // Word-based
    minChars: 2,
    suggestions: [
      ...balKeywords,
      ...balOperators,
      ...balFunctions,
      ...vocabularyMappings,
      ...balAttributes
    ],
    filterFn: (suggestions, query) => 
      suggestions.filter(s => 
        s.label.toLowerCase().includes(query.toLowerCase())
      )
  };
  ```

- [ ] **Conditional provider based on mode**
  ```tsx
  const providers = mode === 'bal' ? [balProvider] : [variableProvider, attributeProvider, mentionProvider];
  ```

### Phase 2: Add Tab Indentation Handling

- [ ] **Add Tab indent when autocomplete closed**
  ```tsx
  if (e.key === 'Tab' && !autocomplete.showSuggestions) {
    e.preventDefault();
    // Insert 2 spaces
  }
  ```

- [ ] **Add Shift+Tab unindent**
  ```tsx
  if (e.key === 'Tab' && e.shiftKey && !autocomplete.showSuggestions) {
    e.preventDefault();
    // Remove 2 spaces from line start
  }
  ```

- [ ] **Copy BAL indent/unindent logic**
  - Copy `handleTab` function from BALEditor
  - Adapt to FormulaEditor's structure
  - Test with multi-line selections

### Phase 3: Test Feature Parity

- [ ] **BAL Mode Tests:**
  - Type "if" → autocomplete appears
  - Type "is gr" → shows "is greater than"
  - Tab with autocomplete open → accepts suggestion
  - Tab with autocomplete closed → indents (2 spaces)
  - Shift+Tab → unindents current line
  - Arrow Up/Down → navigates suggestions
  - Escape → closes autocomplete
  - Enter → accepts suggestion

- [ ] **Formula Mode Tests (Regression):**
  - Type "$" → variable autocomplete
  - Type "#" → attribute autocomplete
  - Type "@" → mention autocomplete
  - Tab with autocomplete open → accepts suggestion
  - Tab with autocomplete closed → indents (NEW!)
  - All existing features still work

---

## Implementation Priority

### 🔴 **CRITICAL (Must Fix):**
1. **Tab indentation** - FormulaEditor currently doesn't handle Tab for indent
2. **Word-based autocomplete** - BAL mode needs this to show keywords/vocabulary

### 🟡 **IMPORTANT (Should Add):**
3. **Shift+Tab unindent** - Power user feature, improves UX

### 🟢 **NICE TO HAVE (Already Better in FormulaEditor):**
- Highlight matching text ✅ Already has
- Precise positioning ✅ Already has
- Type icons ✅ Already has

---

## Code Changes Required

### File: `/components/editors/code/FormulaEditor/FormulaEditor.tsx`

#### Change 1: Add Tab Indent Handling
```tsx
const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  // ... existing autocomplete handling ...
  
  // NEW: Tab for indentation
  if (e.key === 'Tab' && !autocomplete.showSuggestions) {
    e.preventDefault();
    handleTabIndent(e.shiftKey);
    return;
  }
  
  // ... rest of existing code ...
}, [autocomplete, handleTabIndent]);

const handleTabIndent = useCallback((unindent: boolean) => {
  const textarea = textareaRef.current;
  if (!textarea) return;
  
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  
  if (unindent) {
    // Shift+Tab: Unindent
    // Copy BAL logic here
  } else {
    // Tab: Indent
    const newValue = value.substring(0, start) + '  ' + value.substring(end);
    onChange(newValue);
    
    setTimeout(() => {
      textarea.selectionStart = start + 2;
      textarea.selectionEnd = start + 2;
    }, 0);
  }
}, [value, onChange]);
```

#### Change 2: Add Word-Based Autocomplete Provider
```tsx
const autocompleteProviders = useMemo(() => {
  if (mode === 'bal') {
    return [{
      trigger: '', // Word-based matching
      minChars: 2,
      suggestions: [
        ...balVocabulary.keywords.map(k => ({ label: k, type: 'keyword' })),
        ...balVocabulary.nlOperators.map(op => ({ label: op, type: 'operator' })),
        ...balVocabulary.nlFunctions.map(fn => ({ label: fn, type: 'function' })),
        ...(vocabularyMappings || []).map(v => ({ label: v.term, type: 'vocabulary' })),
        ...BAL_ATTRIBUTES.map(a => ({ label: a.text, type: 'attribute' }))
      ],
      filterFn: (suggestions, query) =>
        suggestions.filter(s => 
          s.label.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8) // Limit to 8 like BAL
    }];
  }
  
  // Formula mode - existing providers
  return [
    { trigger: '$', suggestions: variables },
    { trigger: '#', suggestions: attributes },
    { trigger: '@', suggestions: mentions }
  ];
}, [mode, variables, vocabularyMappings]);
```

### File: `/components/editors/core/hooks/useAutocompleteTriggers.ts`

#### Check if word-based matching supported:
- Look for `trigger: ''` or empty string handling
- If not supported, add logic to match on any word when `trigger === ''`

---

## Testing Plan

### Manual Testing

**BAL Mode:**
1. Type "if" - autocomplete should show "if", "elsif", etc.
2. Type "is g" - should show "is greater than", "is greater than or equal to"
3. Press Tab with autocomplete - should accept "is greater than"
4. Press Tab on blank line - should insert 2 spaces
5. Press Shift+Tab on indented line - should remove 2 spaces
6. Type "emp" - should show "employee.salary", "employee.department", etc.

**Formula Mode:**
1. Type "$" - should show variables
2. Type "#" - should show attributes
3. Press Tab with autocomplete - should accept suggestion
4. Press Tab on blank line - should insert 2 spaces (NEW!)
5. All existing formula features still work

---

## Summary

### What BAL Has That Formula Needs:
1. ✅ **Word-based autocomplete** (2+ char trigger, no special symbol)
2. ✅ **Tab indentation** (Tab = 2 spaces when autocomplete closed)
3. ✅ **Shift+Tab unindent** (Remove 2 spaces from line start)

### What Formula Has That's Better:
1. ✅ Highlight matching text in suggestions
2. ✅ Precise cursor positioning (not approximate)
3. ✅ Type icons and badges
4. ✅ Shared hook architecture
5. ✅ Better scroll handling

### Action Items:
1. ✅ Verify `useAutocompleteTriggers` supports word-based matching
2. ✅ Add BAL autocomplete provider with `trigger: ''`
3. ✅ Add Tab/Shift+Tab indent handling
4. ✅ Test both modes thoroughly

**After these changes, FormulaEditor will have ALL of BAL's autocomplete features PLUS all of its own superior features!**
