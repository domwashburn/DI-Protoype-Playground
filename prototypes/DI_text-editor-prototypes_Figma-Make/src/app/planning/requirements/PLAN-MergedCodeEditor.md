# Merged Code Editor Implementation Plan

**Date:** November 13, 2025  
**Goal:** Merge BAL Editor and Formula Editor into single unified CodeEditor component  
**Reason:** Apply editing features/enhancements to all editors simultaneously  

---

## Current State

### Two Separate Editors:
1. **BALEditor** (`/components/BALEditor/`)
   - Simple textarea + overlay
   - Basic autocomplete
   - Vocabulary mappings
   - Error display
   - ~400 lines of code

2. **FormulaEditor** (`/components/editors/code/FormulaEditor/`)
   - Advanced textarea + overlay
   - Full autocomplete with keyboard nav
   - Variable management
   - Debug mode with execution visualization
   - Error/warning highlighting
   - Line number gutter with icons
   - Ghost value hints
   - Branch indicators
   - Variable inspector
   - ~1000+ lines of code

### Already Shared:
- ✅ `useCodeSyntax` hook - syntax highlighting logic
- ✅ CSS styling - both use same design system
- ✅ Core architecture - textarea + overlay pattern

---

## Goal

**ONE component that handles BOTH modes:**
```tsx
// BAL mode
<CodeEditor 
  mode="bal"
  value={balCode}
  onChange={setBalCode}
  vocabularyMappings={mappings}
/>

// Formula mode
<CodeEditor
  mode="formula"
  value={formula}
  onChange={setFormula}
  variables={vars}
  debugHighlight={debug}
/>
```

**Key Requirement:** 
When we add a feature (e.g., better autocomplete, new keyboard shortcut, undo/redo), it automatically works for BOTH BAL and Formula modes.

---

## Approach

### Option 1: Wrapper Component (SIMPLE - Quick Win)
**What:** Create CodeEditor that delegates to existing editors based on mode  
**Pro:** Fast, zero risk, keeps existing editors working  
**Con:** Doesn't truly merge - features still need to be added to both editors  
**Verdict:** ❌ Doesn't meet goal of unified feature development  

### Option 2: Fork Formula Editor (RECOMMENDED - Strangler Pattern)
**What:** Copy FormulaEditor → CodeEditor, add BAL mode support, gradually migrate  
**Pro:** Proven architecture, all Formula features work, gradual migration  
**Con:** Initial duplication, need to migrate consumers  
**Verdict:** ✅ Best approach - follows Strangler Pattern  

### Option 3: Rewrite from Scratch (RISKY)
**What:** Build new unified editor from ground up  
**Pro:** Clean slate, perfect architecture  
**Con:** High risk, might break existing features, long timeline  
**Verdict:** ❌ Too risky, violates Guidelines (no big bang rewrites)  

---

## Recommended Implementation: Option 2 (Fork Formula Editor)

### Phase 1: Create Unified CodeEditor (Isolated)

**Location:** `/components/editors/code/CodeEditor/`

**Steps:**
1. Copy `FormulaEditor.tsx` → `CodeEditor.tsx`
2. Add `mode: 'bal' | 'formula'` prop
3. Make features conditional based on mode:
   ```tsx
   // Always available
   - Textarea + overlay architecture
   - Syntax highlighting (via useCodeSyntax)
   - Line numbers
   - Autocomplete
   - Error highlighting
   
   // Formula-only (mode === 'formula')
   - Debug mode
   - Variable management  
   - Ghost values
   - Branch indicators
   - Variable inspector
   
   // BAL-only (mode === 'bal')  
   - Vocabulary mappings autocomplete
   - Simple error list
   ```

4. Copy FormEditorProps → CodeEditorProps with mode-specific optional props
5. Test in isolation with both modes

**Validation:**
- ✅ CodeEditor in BAL mode matches current BAL Editor behavior
- ✅ CodeEditor in Formula mode matches current Formula Editor behavior
- ✅ All Formula features still work
- ✅ Syntax highlighting works for both modes

### Phase 2: Add Feature Flag to Switch

**In consuming code:**
```tsx
const USE_UNIFIED_CODE_EDITOR = false; // Feature flag

{USE_UNIFIED_CODE_EDITOR ? (
  <CodeEditor mode="bal" value={code} onChange={setCode} />
) : (
  <BALEditor value={code} onChange={setCode} />
)}
```

**Test:**
- Switch flag to true, verify BAL editing still works
- Switch back to false if issues
- Quick rollback available

### Phase 3: Migrate Consumers (One at a Time)

**Priority order:**
1. Formula consumers (already using FormulaEditor features)
2. BAL consumers (simpler, less risk)

**For each consumer:**
1. Update import: `import { CodeEditor } from '.../CodeEditor'`
2. Add mode prop: `<CodeEditor mode="bal" .../>`
3. Test thoroughly
4. Commit with clear rollback point

### Phase 4: Delete Old Editors (After Stabilization)

**Only after 1+ week of stable usage:**
1. Delete `/components/BALEditor/`
2. Delete `/components/editors/code/FormulaEditor/`
3. Move CodeEditor features to root if desired
4. Update documentation

---

## Feature Parity Matrix

| Feature | BAL Editor | Formula Editor | Unified CodeEditor |
|---------|-----------|----------------|-------------------|
| Textarea + overlay | ✅ | ✅ | ✅ Both modes |
| Syntax highlighting | ✅ | ✅ | ✅ Both modes |
| Line numbers | ✅ | ✅ | ✅ Both modes |
| Basic autocomplete | ✅ | ✅ | ✅ Both modes |
| Vocabulary mappings | ✅ | ❌ | ✅ BAL mode only |
| Variables | ❌ | ✅ | ✅ Formula mode only |
| Debug mode | ❌ | ✅ | ✅ Formula mode only |
| Error highlighting | Basic | Advanced | ✅ Advanced for both |
| Keyboard shortcuts | Basic | Advanced | ✅ Advanced for both |
| Ghost values | ❌ | ✅ | ✅ Formula mode only |
| Variable inspector | ❌ | ✅ | ✅ Formula mode only |

---

## Benefits of Unified Editor

### 1. Single Source of Truth
- One component handles all code editing
- Features added once, work everywhere
- Consistent behavior across BAL and Formula

### 2. Easier Feature Development
**Example - Adding Undo/Redo:**
```tsx
// Before: Add to both BALEditor.tsx AND FormulaEditor.tsx
// After: Add to CodeEditor.tsx once, works for both modes
```

### 3. Consistent UX
- Same keyboard shortcuts
- Same autocomplete behavior
- Same error display
- Users learn once, use everywhere

### 4. Easier Testing
- Test one component instead of two
- Mode switching tests ensure parity
- Shared test utilities

### 5. Better Architecture
- Clear separation: mode-specific vs shared features
- Easier to add new modes in future (SQL? Python?)
- Composition over duplication

---

## Migration Checklist

### Pre-Migration
- [ ] Document current BALEditor behavior
- [ ] Document current FormulaEditor behavior
- [ ] Create git tag: `before-code-editor-merge`
- [ ] Ensure both editors stable and tested

### Phase 1: Build Unified CodeEditor
- [ ] Create `/components/editors/code/CodeEditor/` directory
- [ ] Copy FormulaEditor.tsx → CodeEditor.tsx
- [ ] Add `mode: 'bal' | 'formula'` prop
- [ ] Make Formula-only features conditional
- [ ] Add BAL-specific features (vocabulary)
- [ ] Test BAL mode matches BALEditor
- [ ] Test Formula mode matches FormulaEditor
- [ ] Create CodeEditor.module.css
- [ ] Document props and usage

### Phase 2: Feature Flag
- [ ] Add USE_UNIFIED_CODE_EDITOR flag to consumers
- [ ] Test with flag=true (use CodeEditor)
- [ ] Test with flag=false (use old editors)
- [ ] Verify quick rollback works

### Phase 3: Migrate Consumers
- [ ] List all Formula Editor consumers
- [ ] List all BAL Editor consumers
- [ ] Migrate Formula consumers first (one at a time)
- [ ] Migrate BAL consumers next (one at a time)
- [ ] Remove feature flags after each successful migration

### Phase 4: Cleanup
- [ ] Stabilization period (1+ week)
- [ ] Delete `/components/BALEditor/`
- [ ] Delete `/components/editors/code/FormulaEditor/`
- [ ] Update documentation
- [ ] Update imports across codebase
- [ ] Create change log entry

---

## Rollback Plan

**At any point, can revert by:**
1. Git revert to tag: `before-code-editor-merge`
2. OR: Set feature flag to false
3. OR: Restore old editor imports

**Old editors remain untouched until Phase 4 cleanup.**

---

## Timeline Estimate

- **Phase 1 (Build):** 2-4 hours
- **Phase 2 (Feature Flag):** 30 minutes
- **Phase 3 (Migration):** 1-2 hours (depends on number of consumers)
- **Phase 4 (Cleanup):** 30 minutes

**Total:** ~5-7 hours for complete migration

---

## Success Criteria

✅ Single CodeEditor component handles both BAL and Formula modes  
✅ All existing BAL Editor features work in BAL mode  
✅ All existing Formula Editor features work in Formula mode  
✅ New features added to CodeEditor work for both modes automatically  
✅ Zero regressions in either mode  
✅ Consumers successfully migrated  
✅ Old editors deleted  

---

## Next Steps

1. **Review this plan** - Confirm approach is correct
2. **Create CodeEditor** - Phase 1 implementation
3. **Test both modes** - Ensure feature parity
4. **Add feature flag** - Safe rollback mechanism
5. **Migrate consumers** - One at a time
6. **Delete old editors** - After stabilization

**Ready to proceed?**
