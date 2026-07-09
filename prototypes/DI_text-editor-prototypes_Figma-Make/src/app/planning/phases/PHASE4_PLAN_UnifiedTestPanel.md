# Phase 4: Unified Test Panel Implementation Plan

**Date:** November 14, 2025  
**Status:** Planning  
**Goal:** Create unified test panel for both Formula and BAL editors with ZERO regressions

---

## Critical Requirements

### 1. ZERO Regressions for Formula Editor Test Panel (v702)

**Existing FormulaTestPanel Features That MUST Work:**
- ✅ Variable inputs (testable vs defined variables)
- ✅ Attribute inputs (flat for formula mode)
- ✅ Nested attribute inputs (BAL mode support already exists)
- ✅ Type-based input widgets (string, number, boolean, date, time, datetime)
- ✅ Bidirectional variable-attribute syncing
- ✅ String option extraction from formula
- ✅ Debug mode with step-through debugger
- ✅ Error/warning/debug highlighting callbacks to editor
- ✅ Threshold evaluation and visualization
- ✅ Predefined value dropdowns
- ✅ Link indicators for variables↔attributes
- ✅ Real-time type validation warnings
- ✅ ErrorWarningList integration
- ✅ Imperative handle for keyboard shortcuts

**Strategy:** Leave FormulaTestPanel UNTOUCHED. Create new unified panel alongside it.

### 2. New BAL Editor Test Panel

**Currently:** BAL Editor has NO test panel yet.

**What BAL Mode Needs:**
- Nested attribute inputs (hierarchy display)
- No variable inputs (BAL doesn't use $variables)
- Rule evaluation (conditions + actions)
- Natural language attribute references
- Data model integration (from Phase 3)

---

## Implementation Strategy

### Option A: Enhance FormulaTestPanel (REJECTED - Too risky)
❌ Would require modifying working code
❌ Risk of breaking Formula Editor functionality
❌ Hard to test both modes simultaneously

### Option B: Create UnifiedTestPanel (SELECTED - Safe)
✅ Build new component from scratch
✅ Both editors can use it OR keep existing panels
✅ Zero risk to Formula Editor
✅ Can test independently
✅ Gradual migration path

---

## Architecture

```
/components/editors/testing/
  UnifiedTestPanel/
    UnifiedTestPanel.tsx           # Main component (mode-aware)
    VariableInputsSection.tsx      # Variables (Formula mode only)
    AttributeInputsSection.tsx     # Attributes (both modes)
    VocabularyTestSection.tsx      # Vocabulary testing (Phase 3 integration)
    EvaluationResults.tsx          # Results display (mode-aware)
    DebugSection.tsx               # Debug controls (shared)
    TestInputRow.tsx               # Reusable input row
    PersonaSelector.tsx            # Quick-fill with persona data
    UnifiedTestPanel.module.css
    README.md
    index.ts

/components/editors/code/FormulaEditor/
  FormulaTestPanel.tsx             # UNCHANGED (keep for safety)

/components/editors/code/BALEditor/
  BALTestPanel.tsx                 # NEW (wraps UnifiedTestPanel)
```

---

## Phase 4 Tasks

### Task 1: Create Core Components (2-3 days)

**1.1 UnifiedTestPanel.tsx**
- Mode prop: 'formula' | 'bal'
- Conditional rendering based on mode
- Integration with useAutomationDataModel hook
- Same callback interface as FormulaTestPanel (compatibility)

**1.2 VariableInputsSection.tsx**
- Extract from FormulaTestPanel (variables section)
- Type-based inputs (same as existing)
- Defined vs input variables distinction
- Extract string options logic

**1.3 AttributeInputsSection.tsx**
- Nested hierarchy display for BAL mode
- Flat list for formula mode
- Reuse NestedAttributeInput component
- Data model extension integration

**1.4 TestInputRow.tsx**
- Reusable input component
- Type-aware widgets (string, number, boolean, date, time)
- Predefined value dropdown
- Link indicator
- Description/unit display

### Task 2: Data Model Integration (1 day)

**2.1 Connect to useAutomationDataModel**
- Get resolved model (base + custom attributes)
- Get merged vocabulary
- Attribute type information
- Custom attribute support

**2.2 Vocabulary Testing**
- Display merged vocabulary per attribute
- Test that all terms work (base + custom)
- Visual distinction (base vs custom)

### Task 3: BAL Editor Integration (1 day)

**3.1 Create BALTestPanel.tsx**
- Wrapper around UnifiedTestPanel
- Mode='bal' by default
- Pass BAL-specific props
- Position in BAL Editor layout

**3.2 BAL Evaluation**
- Connect to BAL evaluation engine
- Condition/action execution
- Rule tracing

### Task 4: Formula Editor Migration (Optional - 1 day)

**4.1 Create FormulaTestPanelV2.tsx**
- Wrapper around UnifiedTestPanel
- Mode='formula' by default
- Feature flag to switch between old and new

**4.2 Validation**
- Side-by-side testing
- Ensure ALL features work
- Performance comparison
- Keep old panel as fallback

---

## Testing Strategy

### Regression Testing Checklist (Formula Mode)

Test with existing Formula Editor samples:

**Basic Functionality:**
- [ ] Variables display correctly
- [ ] Attributes display correctly
- [ ] Type-based inputs work (string, number, boolean, date, time)
- [ ] Evaluation produces correct results
- [ ] Error display works
- [ ] Threshold visualization works

**Advanced Features:**
- [ ] Debug mode works (step-through)
- [ ] Debug highlighting communicates with editor
- [ ] Error highlighting works
- [ ] Warning highlighting works
- [ ] Bidirectional variable-attribute sync
- [ ] String option extraction
- [ ] Defined vs input variables
- [ ] Keyboard shortcuts (Cmd+Enter, Cmd+Shift+Enter)
- [ ] Double-clear debug output
- [ ] ErrorWarningList integration

**Edge Cases:**
- [ ] Empty formula
- [ ] No variables
- [ ] No attributes
- [ ] Type mismatches
- [ ] Evaluation errors
- [ ] Complex nested expressions
- [ ] Date/time arithmetic
- [ ] List/array operations

### BAL Mode Testing

- [ ] Nested attributes display hierarchically
- [ ] No variable section shown
- [ ] Attribute values populate correctly
- [ ] BAL evaluation works
- [ ] Natural language attribute references work
- [ ] Data model extensions work
- [ ] Custom attributes available
- [ ] Merged vocabulary works

---

## Data Model Integration Examples

### Example 1: Formula Mode with Custom Attributes

```typescript
// Automation has extension with custom attribute
{
  baseModelId: 'loan-financial',
  addedAttributes: [
    { name: 'riskScore', type: 'number', vocabulary: ['risk score', 'calculated risk'] }
  ]
}

// Formula references custom attribute
$riskScore = #loan.riskScore * 100

// Test panel shows:
Variables:
  $riskScore (number) - Defined

Attributes:
  loan.riskScore (number) - Custom 🔧
    Vocabulary: risk score, calculated risk
    [Input: 0.75]
```

### Example 2: BAL Mode with Vocabulary

```bal
if the credit score of the applicant > 700
then set the risk level to "low"
```

```typescript
// Test panel shows:
Attributes:
  applicant
    ├─ credit score (number)
    │  Vocabulary: credit score, FICO score, credit rating
    │  [Input: 750]
    └─ risk level (string)
       [Output: "low"]
```

---

## Migration Path (Optional)

### Gradual Formula Editor Migration

**Phase 4A: Keep Both Panels**
```typescript
// FormulaEditor.tsx
const USE_UNIFIED_PANEL = false; // Feature flag

{USE_UNIFIED_PANEL ? (
  <FormulaTestPanelV2 {...props} /> // New unified panel
) : (
  <FormulaTestPanel {...props} />   // Existing panel
)}
```

**Phase 4B: Validate New Panel**
- 1+ week of testing
- User feedback
- Performance monitoring
- Bug fixes

**Phase 4C: Switch Default**
```typescript
const USE_UNIFIED_PANEL = true; // Switch to new
```

**Phase 4D: Remove Old Panel (Optional)**
- Only after new panel proven stable
- Keep old code for 1+ month as backup
- Delete FormulaTestPanel.tsx

---

## Success Criteria

### Must Have (P0)
- [ ] Formula Editor test panel has ZERO regressions
- [ ] BAL Editor has working test panel
- [ ] Data model extensions integrated
- [ ] Custom attributes available in both modes
- [ ] Vocabulary testing works

### Should Have (P1)
- [ ] Feature flag for Formula Editor migration
- [ ] Persona-based quick-fill
- [ ] Visual polish (animations, feedback)
- [ ] Performance optimization

### Nice to Have (P2)
- [ ] Test case save/load
- [ ] Comparison mode (before/after)
- [ ] Batch testing (multiple scenarios)
- [ ] Export test results

---

## Risks & Mitigation

### Risk 1: Breaking Formula Editor
**Mitigation:** Don't modify FormulaTestPanel. Build new component alongside.

### Risk 2: Missing Features in New Panel
**Mitigation:** Feature-by-feature comparison checklist. Side-by-side testing.

### Risk 3: Performance Regression
**Mitigation:** Benchmark before/after. Optimize if needed.

### Risk 4: Evaluation Engine Differences
**Mitigation:** Use SAME evaluation engine. Only UI layer changes.

---

## Timeline

**Day 1-2:** Core components (UnifiedTestPanel, VariableInputsSection, AttributeInputsSection)
**Day 3:** Data model integration + vocabulary testing
**Day 4:** BAL Editor integration + BAL evaluation
**Day 5:** Testing, bug fixes, polish

**Total:** 4-5 days (as estimated)

---

## Next Steps

1. Create `/components/editors/testing/` directory
2. Build TestInputRow (smallest reusable component)
3. Build VariableInputsSection (extract from FormulaTestPanel)
4. Build AttributeInputsSection (with data model integration)
5. Build UnifiedTestPanel (composes all sections)
6. Build BALTestPanel (wrapper for BAL mode)
7. Test thoroughly with Formula Editor (ensure zero regressions)
8. Integrate with BAL Editor
9. Document everything

---

**Author:** AI Assistant  
**Approved:** Pending
