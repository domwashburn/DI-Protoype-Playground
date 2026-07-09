# EXECUTIVE SUMMARY: Extend Formula Editor for BAL Support

**Goal:** Single editor handles both Formula and BAL modes  
**Approach:** Extend optimized FormulaEditor with `mode` prop  
**Timeline:** 4-6 hours total implementation + migration  

---

## The Plan in 30 Seconds

1. **Add `mode: 'formula' | 'bal'` prop** to FormulaEditor
2. **Hide Formula-only UI** when mode='bal' (debug, variables, ghost values)
3. **Add BAL autocomplete** (keywords, vocabulary, attributes)
4. **Pass mode to useCodeSyntax** (already supports both modes!)
5. **Migrate BAL consumers** to use FormulaEditor with mode='bal'
6. **Delete old BALEditor**

---

## Why This Works

### FormulaEditor Already Has 90% of What We Need!

✅ **Syntax highlighting** via `useCodeSyntax` - already mode-aware!  
✅ **Advanced autocomplete** system - just add BAL items  
✅ **Line numbers with gutter** - works for both modes  
✅ **Error/warning highlighting** - reuse for BAL errors  
✅ **Optimized architecture** - BAL gets all benefits automatically  

### Only Need to Add:

- BAL-specific autocomplete items (keywords, vocabulary)
- Conditional UI rendering (hide Formula features in BAL mode)
- BAL error display (simpler than Formula)

---

## Code Example

### Before (Two Separate Editors):
```tsx
// Formula editing
<FormulaEditor 
  value={formula} 
  onChange={setFormula}
  variables={vars}
/>

// BAL editing
<BALEditor 
  value={bal} 
  onChange={setBal}
  vocabularyMappings={mappings}
/>
```

### After (One Editor, Two Modes):
```tsx
// Formula editing - no change to consumers
<FormulaEditor 
  mode="formula"  // optional, default
  value={formula} 
  onChange={setFormula}
  variables={vars}
/>

// BAL editing - just switch mode!
<FormulaEditor 
  mode="bal"
  value={bal} 
  onChange={setBal}
  vocabularyMappings={mappings}
/>
```

---

## Implementation Steps

### Phase 1: Extend FormulaEditor (2-4 hours)
```tsx
export interface FormulaEditorProps {
  mode?: 'formula' | 'bal';  // NEW!
  
  // Formula-specific (optional in BAL mode)
  variables?: Variable[];
  debugHighlight?: DebugHighlight;
  
  // BAL-specific (optional in Formula mode)  
  vocabularyMappings?: VocabMapping[];
  balErrors?: BALError[];
  
  // Shared
  value: string;
  onChange: (value: string) => void;
}
```

**Key changes:**
- Pass `mode` to `useCodeSyntax` (already supports it!)
- Conditional rendering for Formula-only UI
- Add BAL autocomplete items
- Add BAL error display

### Phase 2: Migrate Consumers (1 hour)
- Find all `<BALEditor />` usage
- Replace with `<FormulaEditor mode="bal" />`
- Update props (`errors` → `balErrors`)

### Phase 3: Cleanup (30 min)
- Delete `/components/BALEditor/`
- Update docs

---

## Feature Matrix

| Feature | Formula Mode | BAL Mode |
|---------|-------------|----------|
| Syntax highlighting | ✅ | ✅ |
| Autocomplete | ✅ Variables, functions | ✅ Keywords, vocabulary |
| Line numbers + gutter | ✅ | ✅ |
| Error highlighting | ✅ | ✅ |
| Debug mode | ✅ | ❌ Hidden |
| Variables | ✅ | ❌ Hidden |
| Ghost values | ✅ | ❌ Hidden |
| Vocabulary mappings | ❌ | ✅ |

---

## Benefits

🎯 **Single source of truth** - one editor, one codebase  
🎯 **Features apply to both** - add once, works everywhere  
🎯 **Optimized foundation** - BAL gets all Formula optimizations  
🎯 **Consistent UX** - same shortcuts, autocomplete, behavior  
🎯 **Easy to extend** - add SQL, Python, etc. in future  

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Break Formula mode | ✅ Thorough regression testing, feature flags |
| BAL mode incomplete | ✅ Feature parity checklist, real code testing |
| Too complex | ✅ Simple conditional logic, clear TypeScript types |
| Performance hit | ✅ Lazy loading, React.memo, profiling |

---

## Timeline

- **Phase 1 (Extend):** 2-4 hours
- **Phase 2 (Migrate):** 1 hour  
- **Phase 3 (Cleanup):** 30 min

**Total:** 4-6 hours for complete implementation

---

## Success Criteria

✅ One editor handles both Formula and BAL modes  
✅ Zero regressions in Formula mode  
✅ BAL mode has feature parity with old BALEditor  
✅ All consumers successfully migrated  
✅ Old BALEditor deleted  

---

## Detailed Plan

See: `/planning/requirements/PLAN-ExtendFormulaEditorForBAL.md`

**Ready to proceed?** 🚀
