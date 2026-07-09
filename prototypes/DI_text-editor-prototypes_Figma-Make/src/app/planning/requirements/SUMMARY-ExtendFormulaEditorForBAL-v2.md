# EXECUTIVE SUMMARY: Extend Formula Editor for BAL Support (REVISED)

**Goal:** Single editor handles both Formula and BAL modes  
**Approach:** Extend optimized FormulaEditor with `mode` prop  
**Timeline:** 3-4 hours total implementation + migration  

---

## The Plan in 30 Seconds

1. **Add `mode: 'formula' | 'bal'` prop** to FormulaEditor
2. **Hide Formula-only UI** when mode='bal' (debug, variables, ghost values)
3. **Extend autocomplete suggestions** to include BAL items (keywords, vocabulary, attributes)
4. **Pass mode to useCodeSyntax** (already supports both modes!)
5. **Migrate BAL consumers** to use FormulaEditor with mode='bal'
6. **Delete old BALEditor**

---

## Why This Works

### FormulaEditor Already Has 95% of What We Need!

✅ **Syntax highlighting** via `useCodeSyntax` - already mode-aware!  
✅ **Autocomplete system** via `useAutocompleteTriggers` - already works perfectly!  
✅ **Line numbers with gutter** - works for both modes  
✅ **Error/warning highlighting** - reuse for BAL errors  
✅ **Optimized architecture** - BAL gets all benefits automatically  

### Only Need to Add:

- ✅ **Extend autocomplete suggestions** to include BAL items when mode='bal'
- ✅ **Conditional UI rendering** (hide Formula features in BAL mode)
- ✅ **BAL error display** (simpler than Formula)

**NOT building new autocomplete** - just adding BAL items to existing suggestion list!

---

## Autocomplete: How It Actually Works

### Current Formula Mode:
```tsx
// Autocomplete suggestions for Formula mode
const suggestions = [
  { label: '$customerAge', type: 'variable' },
  { label: '#totalAmount', type: 'attribute' },
  { label: 'SUM', type: 'function' },
  { label: 'AVG', type: 'function' },
  // ... etc
];
```

### Extended for BAL Mode:
```tsx
// SHARED constructs (both modes use these!)
const sharedItems = [
  // Natural language operators (SHARED!)
  { label: 'is greater than', type: 'operator' },
  { label: 'is equal to', type: 'operator' },
  { label: 'contains', type: 'operator' },
  
  // Natural language functions (SHARED!)
  { label: 'the sum of', type: 'function' },
  { label: 'the average of', type: 'function' },
  
  // Standard functions (SHARED! - BAL can call formulas)
  { label: 'SUM', type: 'function' },
  { label: 'AVG', type: 'function' },
  { label: 'ELIGIBILITY_SCORE', type: 'formula' }, // User-defined formula
  
  // Vocabulary mappings (SHARED!)
  { label: 'customer name', type: 'vocabulary' },
  { label: 'total amount', type: 'vocabulary' },
];

// BAL mode = BAL-specific + SHARED
const balSuggestions = [
  // BAL-SPECIFIC constructs
  { label: 'if', type: 'keyword' },
  { label: 'then', type: 'keyword' },
  { label: 'else', type: 'keyword' },
  { label: 'set', type: 'keyword' },
  { label: 'employee.salary', type: 'attribute' },
  { label: 'employee.years of service', type: 'attribute' },
  
  // SHARED constructs
  ...sharedItems
];

// Formula mode = Formula-specific + SHARED
const formulaSuggestions = [
  // FORMULA-SPECIFIC constructs
  { label: '$customerAge', type: 'variable' },
  { label: '$totalAmount', type: 'variable' },
  { label: '#employee.age', type: 'attribute' },
  
  // SHARED constructs
  ...sharedItems
];
```

**KEY:** Natural language operators/functions are SHARED, not BAL-specific!  
**See:** `/planning/requirements/SHARED-VS-SPECIFIC-CONSTRUCTS.md` for complete breakdown

---

## Implementation Steps (REVISED)

### Phase 1: Extend FormulaEditor (2-3 hours)

#### 1. Add Mode Prop (15 min)
```tsx
export interface FormulaEditorProps {
  mode?: 'formula' | 'bal';  // NEW!
  
  // BAL-specific props
  vocabularyMappings?: Array<{ term: string; definition: string; dataType?: string }>;
  balErrors?: Array<{ line: number; message: string }>;
  
  // Existing props...
}
```

#### 2. Extend Autocomplete Suggestions (45 min)
```tsx
// In FormulaEditor.tsx or in a hook
const autocompleteItems = useMemo(() => {
  if (mode === 'bal') {
    return [
      // Import from balVocabulary.ts
      ...balVocabulary.keywords.map(k => ({ 
        label: k, 
        type: 'keyword',
        description: 'BAL keyword'
      })),
      ...balVocabulary.nlOperators.map(op => ({ 
        label: op, 
        type: 'operator',
        description: 'Natural language operator'
      })),
      ...balVocabulary.nlFunctions.map(fn => ({ 
        label: fn, 
        type: 'function',
        description: 'Natural language function'
      })),
      // User-provided vocabulary
      ...(vocabularyMappings || []).map(v => ({ 
        label: v.term, 
        type: 'vocabulary',
        description: v.definition,
        dataType: v.dataType,
      })),
      // Default BAL attributes
      ...BAL_ATTRIBUTES.map(a => ({ 
        label: a.text, 
        type: 'attribute',
        description: a.description,
      })),
    ];
  }
  
  // Formula mode - existing logic (unchanged)
  return [
    ...variables.map(v => ({ label: v.name, type: 'variable' })),
    ...FORMULA_FUNCTIONS.map(f => ({ label: f, type: 'function' })),
    // ... etc (existing code)
  ];
}, [mode, variables, vocabularyMappings]);

// Pass to existing autocomplete system
// The autocomplete UI, dropdown, keyboard nav - all already works!
```

**That's it!** The existing autocomplete system handles the rest.

#### 3. Hide Formula-Only UI (30 min)
```tsx
{mode === 'formula' && debugHighlight && (
  <DebugOutputColumn ... />
)}

{mode === 'formula' && variables && (
  <GhostValue ... />
)}

{mode === 'formula' && (
  <BranchIndicator ... />
)}
```

#### 4. Pass Mode to Syntax Highlighting (5 min)
```tsx
const { highlightSyntax } = useCodeSyntax({
  mode: mode || 'formula',
  variables: mode === 'formula' ? variables : undefined,
  vocabularyMappings: mode === 'bal' ? vocabularyMappings : undefined,
});
```

#### 5. Add BAL Error Display (30 min)
```tsx
{mode === 'bal' && balErrors && balErrors.length > 0 && (
  <div className={styles.balErrors}>
    {balErrors.map((error, i) => (
      <Alert key={i}>
        Line {error.line}: {error.message}
      </Alert>
    ))}
  </div>
)}
```

#### 6. Add BAL-Specific Autocomplete Features (1 hour)

**⚠️ CRITICAL:** BAL has autocomplete features that Formula doesn't!

**Feature 1: Word-Based Trigger**
- BAL: Triggers on ANY word with 2+ characters (no special symbol)
- Formula: Only triggers on `$`, `#`, `@` special characters
- **Action:** Add word-based provider with `trigger: ''` for BAL mode

**Feature 2: Tab Indentation**
- BAL: Tab inserts 2 spaces when autocomplete is closed
- Formula: **Currently has NO Tab indentation!**
- **Action:** Add Tab handler to insert 2 spaces

**Feature 3: Shift+Tab Unindent**
- BAL: Removes 2 spaces from line start
- Formula: Doesn't have this
- **Action:** Copy BAL's unindent logic

**See:** `/planning/requirements/AUTOCOMPLETE-FEATURE-PARITY.md` for full analysis

### Phase 2: Migrate Consumers (1 hour)
- Replace `<BALEditor />` with `<FormulaEditor mode="bal" />`
- Update props: `errors` → `balErrors`

### Phase 3: Cleanup (30 min)
- Delete `/components/BALEditor/`
- Update docs

---

## The Key Insight

### We're NOT Building:
- ❌ New autocomplete system
- ❌ New autocomplete UI
- ❌ New keyboard navigation
- ❌ New dropdown positioning

### We're ONLY Adding:
- ✅ BAL vocabulary items to the suggestion list
- ✅ Conditional logic: "if mode='bal', show BAL items; else show Formula items"

**The autocomplete infrastructure is already perfect!**

---

## Code Example

### Before (Two Separate Editors):
```tsx
// Formula - has great autocomplete
<FormulaEditor 
  value={formula} 
  variables={vars}
/>

// BAL - has basic autocomplete
<BALEditor 
  value={bal} 
  vocabularyMappings={mappings}
/>
```

### After (One Editor with Unified Autocomplete):
```tsx
// Formula mode - existing autocomplete (variables, functions)
<FormulaEditor 
  mode="formula"
  value={formula} 
  variables={vars}
/>

// BAL mode - SAME autocomplete system, different suggestions
<FormulaEditor 
  mode="bal"
  value={bal} 
  vocabularyMappings={mappings}
/>
```

**Same autocomplete UI. Same keyboard shortcuts. Same behavior.**  
**Just different suggestions based on mode!**

---

## Benefits

🎯 **Best-in-class autocomplete for both modes** - BAL gets Formula's optimized system  
🎯 **Consistent UX** - same shortcuts, same dropdown, same behavior  
🎯 **Single codebase** - autocomplete improvements benefit both modes  
🎯 **Vocabulary integration** - BAL vocabulary terms in autocomplete automatically  

---

## Timeline (REVISED)

- **Phase 1 (Extend):** 2-3 hours (was 2-4)
- **Phase 2 (Migrate):** 1 hour  
- **Phase 3 (Cleanup):** 30 min

**Total:** 3-4 hours (was 4-6)

**Faster because:** We're not building autocomplete, just extending the suggestion list!

---

## What Changed from Previous Plan

### ❌ OLD (Incorrect):
> "Add BAL autocomplete system"

### ✅ NEW (Correct):
> "Extend existing autocomplete suggestions to include BAL items"

**Much simpler!** The autocomplete **system** is already perfect in FormulaEditor.

---

## Detailed Plan

See: `/planning/requirements/PLAN-ExtendFormulaEditorForBAL.md` (will update)

**Ready to proceed?** 🚀