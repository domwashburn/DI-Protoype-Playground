# ✅ READY TO IMPLEMENT: Extend FormulaEditor for BAL Mode

**Date:** November 13, 2025  
**Status:** All planning complete, ready for implementation  

---

## 📋 Complete Planning Documents

### 1. Executive Summary
**File:** `/planning/requirements/SUMMARY-ExtendFormulaEditorForBAL-v2.md`  
**What:** High-level overview and approach  
**Key Point:** 3-4 hours total, just extend autocomplete + hide some UI  

### 2. Detailed Implementation Plan
**File:** `/planning/requirements/PLAN-ExtendFormulaEditorForBAL.md`  
**What:** Step-by-step implementation with code examples  
**Key Point:** 6 clear steps, each with time estimate and testing  

### 3. Autocomplete Feature Parity
**File:** `/planning/requirements/AUTOCOMPLETE-FEATURE-PARITY.md`  
**What:** What BAL has that Formula needs  
**Key Point:** Tab indentation, word-based triggers, Shift+Tab unindent  

### 4. Shared vs Specific Constructs
**File:** `/planning/requirements/SHARED-VS-SPECIFIC-CONSTRUCTS.md`  
**What:** What's shared vs mode-specific  
**Key Point:** Natural language operators/functions are SHARED, not BAL-specific!  

---

## ✅ All Questions Answered

### Question 1: "Should we hide Formula UI in BAL mode?"
**Answer:** YES, but only variable management, debug, and ghost values.  
**Reason:** BAL should be able to CALL formulas, so keep function library visible.

### Question 2: "Are natural language operators BAL-specific?"
**Answer:** NO! They're SHARED between Formula and BAL.  
**Reason:** Both modes use "is greater than", "the sum of", etc.

### Question 3: "Does BAL have autocomplete features Formula doesn't?"
**Answer:** YES!  
- Word-based autocomplete (2+ chars, no trigger symbol)
- Tab indentation (inserts 2 spaces)
- Shift+Tab unindent (removes 2 spaces)

---

## 🎯 Implementation Approach (FINAL)

### What FormulaEditor Already Has:
✅ Syntax highlighting (mode-aware via `useCodeSyntax`)  
✅ Autocomplete system (just need different suggestions)  
✅ Line numbers + gutter  
✅ Error/warning highlighting  
✅ Precise positioning, highlight matching, type badges  

### What We Need to Add:

#### 1. Mode Prop & Conditional UI (45 min)
```tsx
export interface FormulaEditorProps {
  mode?: 'formula' | 'bal';
  vocabularyMappings?: Array<{ term: string; definition: string }>;
  balErrors?: Array<{ line: number; message: string }>;
  // ... existing props
}

// Hide Formula-specific UI
{mode === 'formula' && <DebugOutputColumn />}
{mode === 'formula' && <VariableTable />}
{mode === 'formula' && <GhostValue />}

// Show BAL-specific UI
{mode === 'bal' && balErrors && <BALErrorDisplay />}
```

#### 2. Shared + Mode-Specific Autocomplete (1 hour)
```tsx
// Create sharedVocabulary.ts
export const SHARED_NL_OPERATORS = ['is greater than', ...];
export const SHARED_NL_FUNCTIONS = ['the sum of', ...];

// Autocomplete = Shared + Mode-Specific
const autocompleteItems = useMemo(() => {
  const sharedItems = [
    ...SHARED_NL_OPERATORS,
    ...SHARED_NL_FUNCTIONS,
    ...STANDARD_FUNCTIONS, // BAL can call formulas!
    ...vocabularyMappings,
  ];
  
  if (mode === 'bal') {
    return [
      // BAL-specific
      ...BAL_KEYWORDS, // if, then, else, set
      ...BAL_ATTRIBUTES, // employee.salary
      ...sharedItems
    ];
  }
  
  return [
    // Formula-specific
    ...variables, // $var
    ...attributes, // #attr
    ...sharedItems
  ];
}, [mode, variables, vocabularyMappings]);
```

#### 3. Word-Based Autocomplete Trigger (30 min)
```tsx
// Check if useAutocompleteTriggers supports trigger: ''
// If not, add support for word-based matching
const providers = mode === 'bal' ? [{
  trigger: '', // Empty = word-based
  minChars: 2,
  suggestions: balAutocompleteItems
}] : [
  { trigger: '$', suggestions: variables },
  { trigger: '#', suggestions: attributes }
];
```

#### 4. Tab/Shift+Tab Indentation (1 hour)
```tsx
const handleKeyDown = (e) => {
  // ... autocomplete handling ...
  
  if (e.key === 'Tab' && !autocomplete.showSuggestions) {
    e.preventDefault();
    
    if (e.shiftKey) {
      // Unindent: remove 2 spaces from line start
      handleUnindent();
    } else {
      // Indent: insert 2 spaces
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        textarea.selectionStart = start + 2;
        textarea.selectionEnd = start + 2;
      }, 0);
    }
  }
};
```

#### 5. BAL Error Display (30 min)
```tsx
{mode === 'bal' && balErrors?.length > 0 && (
  <div className={styles.balErrors}>
    {balErrors.map((error, i) => (
      <Alert key={i} variant="destructive">
        <AlertCircle size={16} />
        <AlertDescription>
          Line {error.line}: {error.message}
        </AlertDescription>
      </Alert>
    ))}
  </div>
)}
```

### Total Phase 1: 3-4 hours

---

## 🧪 Testing Checklist

### BAL Mode Tests:
- [ ] Type "if" → autocomplete shows BAL keywords
- [ ] Type "is g" → shows "is greater than", "is greater than or equal to"
- [ ] Type "the s" → shows "the sum of", "the square root of"
- [ ] Type "emp" → shows "employee.salary", "employee.department"
- [ ] Type "SUM" → shows SUM function (can call formulas!)
- [ ] Tab with autocomplete open → accepts suggestion
- [ ] Tab with autocomplete closed → inserts 2 spaces
- [ ] Shift+Tab on indented line → removes 2 spaces
- [ ] Arrow Up/Down → navigates suggestions
- [ ] Escape → closes autocomplete
- [ ] Enter → accepts suggestion
- [ ] Syntax highlighting matches BAL Editor (already works!)
- [ ] BAL errors display correctly
- [ ] No variable table showing
- [ ] No debug output showing
- [ ] No ghost values showing

### Formula Mode Tests (Regression):
- [ ] Type "$" → variable autocomplete
- [ ] Type "#" → attribute autocomplete
- [ ] Type "@" → mention autocomplete (if applicable)
- [ ] Tab with autocomplete open → accepts suggestion
- [ ] Tab with autocomplete closed → inserts 2 spaces (NEW!)
- [ ] Shift+Tab → unindents (NEW!)
- [ ] All existing features still work
- [ ] Variable table still shows
- [ ] Debug output still works
- [ ] Ghost values still work

---

## 📂 File Structure

### New Files to Create:
```
/components/editors/code/shared/
  vocabulary/
    sharedVocabulary.ts         # SHARED NL operators/functions

/components/editors/code/balSupport/
  balVocabulary.ts              # Copy from BALEditor (BAL-specific only)
  balAttributes.ts              # Default BAL attributes
```

### Files to Modify:
```
/components/editors/code/FormulaEditor/
  FormulaEditor.tsx             # Add mode prop, conditional UI, autocomplete
  FormulaEditor.module.css      # Styles for BAL error display
```

### Files to Check:
```
/components/editors/core/hooks/
  useAutocompleteTriggers.ts    # Verify supports word-based matching
```

---

## 🚀 Migration Plan

### Phase 2: Migrate Consumers (1 hour)

**Find all BALEditor usages:**
```bash
# Search for BALEditor imports
grep -r "from.*BALEditor" components/
```

**Replace with FormulaEditor:**
```tsx
// Before
<BALEditor
  value={balCode}
  onChange={setBalCode}
  errors={balErrors}
  vocabularyMappings={mappings}
/>

// After
<FormulaEditor
  mode="bal"
  value={balCode}
  onChange={setBalCode}
  balErrors={balErrors}
  vocabularyMappings={mappings}
/>
```

**Update imports:**
```tsx
// Before
import { BALEditor } from './components/BALEditor';

// After
import { FormulaEditor } from './components/editors/code/FormulaEditor';
```

### Phase 3: Cleanup (30 min)

- [ ] Delete `/components/BALEditor/` directory
- [ ] Update docs/README files
- [ ] Create change log entry
- [ ] Git commit with descriptive message

---

## 📊 Timeline Summary

| Phase | Task | Time | Status |
|-------|------|------|--------|
| 1.1 | Mode prop + conditional UI | 45 min | ⬜ Not started |
| 1.2 | Shared + mode-specific autocomplete | 1 hour | ⬜ Not started |
| 1.3 | Word-based trigger | 30 min | ⬜ Not started |
| 1.4 | Tab/Shift+Tab indentation | 1 hour | ⬜ Not started |
| 1.5 | BAL error display | 30 min | ⬜ Not started |
| **Phase 1 Total** | | **3-4 hours** | |
| 2 | Migrate consumers | 1 hour | ⬜ Not started |
| 3 | Cleanup | 30 min | ⬜ Not started |
| **GRAND TOTAL** | | **4.5-5.5 hours** | |

---

## ✅ Pre-Flight Checklist

- [x] All planning documents complete
- [x] All questions answered
- [x] Architecture validated
- [x] Testing checklist defined
- [x] Migration plan defined
- [x] File structure planned
- [x] Timeline estimated
- [x] Strangler Pattern principles followed
- [x] Zero-regression approach confirmed

---

## 🎯 Success Criteria

### Must Have:
1. ✅ FormulaEditor accepts `mode: 'bal'`
2. ✅ BAL mode shows BAL-specific autocomplete (keywords, attributes)
3. ✅ Both modes show SHARED autocomplete (NL operators, NL functions, standard functions)
4. ✅ BAL mode hides variable table, debug output, ghost values
5. ✅ BAL mode displays BAL errors correctly
6. ✅ Tab indentation works in both modes
7. ✅ Shift+Tab unindent works in both modes
8. ✅ Word-based autocomplete works in BAL mode
9. ✅ All Formula mode features still work (regression-free)
10. ✅ BAL Editor deleted, consumers migrated

### Nice to Have:
- Better type icons for BAL constructs
- Context-aware descriptions in autocomplete
- Keyboard shortcut cheat sheet

---

## 🚦 Ready to Start?

**All planning complete!**

Three comprehensive documents:
1. ✅ Executive Summary - the "why" and high-level approach
2. ✅ Detailed Plan - step-by-step implementation
3. ✅ Feature Parity - what BAL has that Formula needs
4. ✅ Shared vs Specific - avoid duplication

**Give the go-ahead and I'll implement!** 🚀
