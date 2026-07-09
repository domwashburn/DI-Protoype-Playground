# Extend Formula Editor for BAL Support - Implementation Plan

**Date:** November 13, 2025  
**Goal:** Extend optimized FormulaEditor to support BAL mode  
**Approach:** Add `mode` prop, conditionally show/hide features, maintain single codebase  

---

## Current State

### FormulaEditor (OPTIMIZED - Primary Editor)
**Location:** `/components/editors/code/FormulaEditor/`

**Features:**
- ✅ Textarea + overlay architecture
- ✅ Advanced autocomplete with keyboard nav (`useAutocompleteTriggers`)
- ✅ Syntax highlighting via `useCodeSyntax` (already mode-aware!)
- ✅ Line numbers with error/warning/debug icons
- ✅ Variable management (`$variable`, `#attribute`)
- ✅ Debug mode with execution visualization
- ✅ Ghost value hints
- ✅ Branch indicators
- ✅ Error/warning highlighting
- ✅ Variable inspector
- ✅ Text-to-variable conversion
- ✅ Line height calculations for wrapping
- ✅ Resize handles for debug panel

**Already Supports Multiple Modes:**
```tsx
// In useCodeSyntax hook - already accepts mode!
const { highlightSyntax } = useCodeSyntax({
  mode: 'formula', // or 'bal'
  variables,
});
```

### BALEditor (Simple - To Be Replaced)
**Location:** `/components/BALEditor/`

**BAL-Specific Features:**
- Vocabulary mappings autocomplete
- Simple error display
- Attributes (employee.salary, request.type, etc.)

**What We'll Extract:**
- `balVocabulary.ts` - Keywords, operators, functions
- Vocabulary mappings integration
- BAL-specific autocomplete logic

---

## Implementation Strategy

### Core Insight
**FormulaEditor already has 90% of what we need!**

The `useCodeSyntax` hook already supports both modes:
```tsx
useCodeSyntax({ mode: 'bal' | 'formula', ... })
```

**Changes Needed:**
1. Add `mode: 'bal' | 'formula'` prop to FormulaEditor
2. Pass mode to `useCodeSyntax` (already supports it!)
3. Hide Formula-only UI in BAL mode (debug, variables, ghost values)
4. Add BAL-specific autocomplete (vocabulary, attributes)
5. Simplify error display for BAL mode

---

## Detailed Changes

### 1. Props Interface (FormulaEditor.tsx)

**Add mode prop:**
```tsx
export interface FormulaEditorProps {
  // NEW: Mode selector
  mode?: 'formula' | 'bal';
  
  // Existing props...
  value: string;
  onChange: (value: string) => void;
  
  // Formula-specific (optional in BAL mode)
  variables?: Variable[];
  onVariablesChange?: (variables: Variable[]) => void;
  formulaName?: string;
  formulaDescription?: string;
  formulaReturnType?: 'number' | 'string' | 'boolean' | 'date' | 'time';
  onFormulaMetadataChange?: (...) => void;
  debugHighlight?: DebugHighlight | null;
  
  // BAL-specific (optional in Formula mode)
  vocabularyMappings?: Array<{ 
    term: string; 
    definition: string; 
    dataType?: string;
  }>;
  balErrors?: Array<{ line: number; message: string }>;
  
  // Shared
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  errorHighlight?: ErrorHighlight | null;
  warningHighlights?: WarningHighlight[];
  onWarningHighlightsChange?: (highlights: WarningHighlight[]) => void;
  onLineIssuesChange?: (issues: LineIssue[]) => void;
}
```

### 2. Syntax Highlighting (Already Works!)

**Current code:**
```tsx
const { highlightSyntax } = useCodeSyntax({
  mode: 'formula', // Hard-coded
  variables,
});
```

**Change to:**
```tsx
const { highlightSyntax } = useCodeSyntax({
  mode: mode || 'formula', // Use prop, default to formula
  variables: mode === 'formula' ? variables : undefined,
  vocabularyMappings: mode === 'bal' ? vocabularyMappings : undefined,
});
```

**That's it!** Syntax highlighting already supports both modes via shared hook.

### 3. Conditional UI Rendering

**Formula-Only Features (hide in BAL mode):**
```tsx
{mode === 'formula' && (
  <>
    {/* Variable management UI */}
    {/* Debug output column */}
    {/* Ghost value hints */}
    {/* Branch indicators */}
    {/* Variable inspector */}
    {/* Convert to variable button */}
  </>
)}
```

**BAL-Only Features (show in BAL mode):**
```tsx
{mode === 'bal' && (
  <>
    {/* Simple error display */}
    {balErrors?.map(error => (
      <Alert>Line {error.line}: {error.message}</Alert>
    ))}
  </>
)}
```

**Shared Features (always visible):**
- Textarea + overlay
- Line numbers with gutter icons
- Autocomplete dropdown
- Error/warning highlighting
- Keyboard shortcuts

### 4. Autocomplete Enhancement

**Current:** Formula autocomplete (variables, functions)  
**Add:** BAL autocomplete (keywords, vocabulary, attributes)

**In `useAutocompleteTriggers` or similar:**
```tsx
const autocompleteItems = useMemo(() => {
  if (mode === 'bal') {
    return [
      ...balVocabulary.keywords.map(k => ({ 
        label: k, 
        type: 'keyword' 
      })),
      ...balVocabulary.nlOperators.map(op => ({ 
        label: op, 
        type: 'operator' 
      })),
      ...balVocabulary.nlFunctions.map(fn => ({ 
        label: fn, 
        type: 'function' 
      })),
      ...vocabularyMappings.map(v => ({ 
        label: v.term, 
        type: 'vocabulary',
        description: v.definition 
      })),
      ...BAL_ATTRIBUTES.map(a => ({ 
        label: a.text, 
        type: 'attribute',
        description: a.description 
      })),
    ];
  }
  
  // Formula mode - existing logic
  return [
    ...variables.map(v => ({ label: v.name, type: 'variable' })),
    ...FORMULA_FUNCTIONS.map(f => ({ label: f, type: 'function' })),
    // ...etc
  ];
}, [mode, variables, vocabularyMappings]);
```

---

## Implementation Steps

### Step 1: Add Mode Prop (30 min)

**Files to modify:**
- `FormulaEditor.tsx` - Add mode prop to interface
- Pass mode to useCodeSyntax hook

**Test:**
- Verify syntax highlighting works for both modes
- No visual changes yet

### Step 2: Conditional UI Rendering (1 hour)

**Wrap Formula-only features:**
```tsx
{mode === 'formula' && (
  <DebugOutputColumn ... />
)}

{mode === 'formula' && variables && (
  <GhostValue ... />
)}

{mode === 'formula' && (
  <BranchIndicator ... />
)}
```

**Test:**
- Formula mode: All features visible (no change)
- BAL mode: Only shared features visible

### Step 3: Add BAL Autocomplete (1-2 hours)

**Create:**
- `balSupport/balVocabulary.ts` - Copy from BALEditor
- `balSupport/balAttributes.ts` - Default attributes

**Integrate:**
- Import BAL vocabulary in FormulaEditor
- Extend existing autocomplete suggestions to include BAL items when mode === 'bal'
- **NO NEW AUTOCOMPLETE SYSTEM** - just add BAL items to existing dropdown!

**Test:**
- Type "if" - shows BAL keywords
- Type "emp" - shows employee attributes
- Type "is gr" - shows "is greater than"

### Step 3a: Add BAL-Specific Autocomplete Features (1 hour)

**CRITICAL:** BAL has autocomplete features that Formula doesn't!

**Feature 1: Word-Based Autocomplete Trigger**
- BAL triggers on ANY word with 2+ characters (no special trigger like $, #, @)
- Check if `useAutocompleteTriggers` supports `trigger: ''` (word-based)
- If not, add support for empty trigger = word-based matching

**Feature 2: Tab Indentation**
- BAL has context-aware Tab: accepts autocomplete OR indents
- Formula currently has NO Tab indentation support!
- Add Tab handler: insert 2 spaces when autocomplete closed

**Feature 3: Shift+Tab Unindent**
- BAL removes 2 spaces from line start on Shift+Tab
- Formula doesn't have this
- Copy BAL's `handleTab` logic for indent/unindent

**Implementation:**
```tsx
// Word-based autocomplete for BAL
const providers = mode === 'bal' ? [{
  trigger: '', // Word-based, no special char
  minChars: 2, // Trigger after 2+ characters
  suggestions: balSuggestions
}] : [
  { trigger: '$', suggestions: variables },
  { trigger: '#', suggestions: attributes }
];

// Tab indentation
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

**See:** `/planning/requirements/AUTOCOMPLETE-FEATURE-PARITY.md` for full analysis

**Test:**
- Type "if" (no trigger char) - autocomplete appears after 2 chars ✅
- Tab on blank line - inserts 2 spaces ✅
- Shift+Tab on indented line - removes 2 spaces ✅
- Tab with autocomplete open - accepts suggestion ✅

### Step 4: Add BAL Error Display (30 min)

**Add simple error display:**
```tsx
{mode === 'bal' && balErrors && balErrors.length > 0 && (
  <div className={styles.balErrors}>
    {balErrors.map((error, i) => (
      <Alert key={i}>
        <AlertCircle />
        <AlertDescription>
          Line {error.line}: {error.message}
        </AlertDescription>
      </Alert>
    ))}
  </div>
)}
```

**Test:**
- Pass balErrors prop in BAL mode
- Errors display below editor

### Step 5: Add Vocabulary Mappings Support (30 min)

**Integrate vocabulary system:**
```tsx
// In autocomplete logic
if (mode === 'bal' && vocabularyMappings) {
  items.push(...vocabularyMappings.map(v => ({
    label: v.term,
    type: 'vocabulary',
    description: v.definition,
    dataType: v.dataType,
  })));
}
```

**Test:**
- Pass vocabularyMappings prop
- Vocabulary terms appear in autocomplete
- Highlighted in syntax

### Step 6: Rename for Clarity (Optional - 15 min)

**Rename to CodeEditor:**
```bash
mv FormulaEditor.tsx CodeEditor.tsx
mv FormulaEditor.module.css CodeEditor.module.css
```

**Update exports:**
```tsx
export function CodeEditor(props: CodeEditorProps) {
  const { mode = 'formula', ...rest } = props;
  // ...
}
```

**OR keep FormulaEditor name** - it's the primary editor, just extended.

---

## Migration Plan

### Phase 1: Extend FormulaEditor (2-4 hours)
- [ ] Add mode prop
- [ ] Pass mode to useCodeSyntax
- [ ] Conditional Formula-only UI
- [ ] Add BAL autocomplete
- [ ] Add BAL error display
- [ ] Add vocabulary mappings support
- [ ] Test both modes thoroughly

### Phase 2: Create Feature Flag (15 min)
```tsx
const USE_EXTENDED_EDITOR = false;

{USE_EXTENDED_EDITOR ? (
  <FormulaEditor mode="bal" value={code} onChange={setCode} />
) : (
  <BALEditor value={code} onChange={setCode} />
)}
```

### Phase 3: Migrate BAL Consumers (1 hour)
- [ ] Find all BALEditor usage
- [ ] Replace with FormulaEditor mode="bal"
- [ ] Update props (vocabularyMappings, balErrors)
- [ ] Test each consumer
- [ ] Remove feature flags

### Phase 4: Cleanup (30 min)
- [ ] Delete `/components/BALEditor/` directory
- [ ] Update documentation
- [ ] Update Guidelines.md
- [ ] Create change log entry

**Total Time:** 4-6 hours

---

## Props Mapping (Migration Guide)

**BALEditor → FormulaEditor with mode="bal"**

| BALEditor Prop | FormulaEditor Prop | Notes |
|----------------|-------------------|-------|
| `value` | `value` | ✅ Same |
| `onChange` | `onChange` | ✅ Same |
| `errors` | `balErrors` | ✅ Renamed for clarity |
| `vocabularyMappings` | `vocabularyMappings` | ✅ Same |
| `onValidate` | `onValidate` | ✅ Add if needed |
| `className` | `className` | ✅ Same |
| `placeholder` | `placeholder` | ✅ Same |
| `readOnly` | `readOnly` | ✅ Same |

**Before:**
```tsx
<BALEditor
  value={code}
  onChange={setCode}
  errors={errors}
  vocabularyMappings={mappings}
/>
```

**After:**
```tsx
<FormulaEditor
  mode="bal"
  value={code}
  onChange={setCode}
  balErrors={errors}
  vocabularyMappings={mappings}
/>
```

---

## Testing Checklist

### BAL Mode Tests
- [ ] Syntax highlighting (keywords, operators, NL constructs)
- [ ] Autocomplete (keywords, vocabulary, attributes)
- [ ] Vocabulary mappings display correctly
- [ ] Errors display below editor
- [ ] Line numbers work
- [ ] Error/warning icons in gutter
- [ ] No Formula-specific UI visible
- [ ] Keyboard shortcuts work

### Formula Mode Tests (Regression)
- [ ] All existing features still work
- [ ] Variables autocomplete
- [ ] Debug mode displays
- [ ] Ghost values show
- [ ] Branch indicators work
- [ ] Variable inspector opens
- [ ] Convert to variable button works
- [ ] Error/warning highlighting
- [ ] No BAL-specific UI visible

### Shared Feature Tests
- [ ] Textarea + overlay architecture
- [ ] Line numbers with gutter
- [ ] Scroll sync between overlay and textarea
- [ ] Error/warning icons in gutter
- [ ] Autocomplete dropdown positioning
- [ ] Keyboard navigation in autocomplete
- [ ] Copy/paste works
- [ ] Undo/redo works
- [ ] Line wrapping calculates correctly

---

## Benefits

### ✅ Single Codebase
- One editor handles both BAL and Formula
- Features added once, work for both modes
- Consistent behavior and UX

### ✅ Optimized Foundation
- FormulaEditor is already optimized
- All advanced features (line heights, gutter, debug) already built
- BAL gets all these benefits automatically

### ✅ Easy Extension
- Adding new modes in future is straightforward
- Just add new mode type and conditional logic
- Could support SQL, Python, etc.

### ✅ Maintainability
- Single file to maintain (vs 2 separate editors)
- Consistent bug fixes apply to both modes
- Shared CSS, hooks, utilities

### ✅ Better UX
- Consistent keyboard shortcuts across modes
- Same autocomplete experience
- Same error highlighting patterns
- Users learn once, use everywhere

---

## Risks & Mitigations

### Risk: Breaking Formula Mode
**Mitigation:** 
- Thorough regression testing
- Feature flag for easy rollback
- Keep all Formula features in separate components (don't modify them)

### Risk: BAL Mode Missing Features
**Mitigation:**
- Comprehensive feature parity matrix
- Test with real BAL code samples
- Get user validation before deleting BALEditor

### Risk: Props Interface Too Complex
**Mitigation:**
- Use optional props with sensible defaults
- Clear TypeScript types for mode-specific props
- Good JSDoc documentation

### Risk: Performance Impact
**Mitigation:**
- Lazy load mode-specific logic
- Use React.memo for expensive components
- Profile both modes to ensure no degradation

---

## Success Criteria

✅ FormulaEditor supports `mode="bal"` prop  
✅ BAL mode has feature parity with old BALEditor  
✅ Formula mode has zero regressions  
✅ Syntax highlighting works for both modes  
✅ Autocomplete works for both modes  
✅ All tests pass  
✅ BAL consumers successfully migrated  
✅ Old BALEditor deleted  
✅ Documentation updated  

---

## Next Steps

### 1. Review & Approve This Plan
- Confirm approach is correct
- Identify any missing requirements
- Get go-ahead to proceed

### 2. Implementation (Phase 1)
- Add mode prop to FormulaEditor
- Implement conditional UI
- Add BAL autocomplete
- Test thoroughly

### 3. Migration (Phases 2-3)
- Add feature flags
- Migrate consumers one by one
- Validate with real usage

### 4. Cleanup (Phase 4)
- Delete old BALEditor
- Update documentation
- Create change log entry

**Ready to start implementation?**