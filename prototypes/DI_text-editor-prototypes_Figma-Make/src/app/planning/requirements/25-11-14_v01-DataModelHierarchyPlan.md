# Data Model Hierarchy & Testing Plan - Review Summary

**Date:** November 14, 2025  
**Status:** 📋 Planning - Ready for Review  
**Related EPIC:** `/planning/epics/EPIC-DataModelHierarchyAndTestingEnhancements.md`

---

## Quick Summary

This plan addresses two interconnected needs:

1. **Data Model Hierarchy**: Enable automations to extend global models with custom attributes
2. **Enhanced Test Panel**: Support testing with variables, attributes, AND vocabulary

---

## Key Architectural Changes

### Service Layer (NEW)
- `dataModelService.ts` - Model resolution and CRUD operations
- `testDataService.ts` - Mock data generation and personas

### Hook Layer (NEW)
- `useAutomationDataModel()` - Access resolved models (global + custom)
- `useDataModelExtension()` - Manage extensions
- `useTestData()` - Test value management

### UI Components (NEW)
- `DataModelExtensionEditor/` - Manage automation-specific attributes
- `UnifiedTestPanel/` - Enhanced testing with tabs (Variables/Attributes/Vocabulary)

---

## Implementation Timeline

| Phase | Duration | Key Deliverable |
|-------|----------|-----------------|
| 1. Service Layer | 3-4 days | Working model resolution + mock data |
| 2. Hook Layer | 2-3 days | React hooks for data access |
| 3. Data Model UI | 4-5 days | Extension editor component |
| 4. Test Panel UI | 4-5 days | Enhanced test panel with tabs |
| 5. Integration | 3-4 days | End-to-end working system |

**Total: 16-20 days (3-4 weeks)**

---

## Major Design Decisions

### ✅ Recommendations

1. **Vocabulary Override Strategy**: Additive (merge base + custom vocabulary)
2. **Extension Scope**: Automation-specific only (no shared extensions)
3. **Nested Extensions**: Not allowed (only extend global base models)
4. **Test Data Persistence**: Save to localStorage
5. **Backward Compatibility**: Existing `useDataModel()` continues to work

### ❓ Questions for Review

1. **Should automations see other automations' custom models?**
   - Recommended: No (isolated)
   - Alternative: Read-only visibility

2. **Where should data model configuration live in UI?**
   - Recommended: Automation details panel (tab)
   - Alternative: Separate configuration page

3. **Should we support model versioning in this EPIC?**
   - Recommended: No (future enhancement)
   - Adds significant complexity

---

## UI Mockups (Key Screens)

### Data Model Extension Editor
```
┌─ Automation Settings ─────────────────────┐
│ Mode: ● Extend global  ○ Use as-is        │
│ Base: [Loan Application ▼]                │
│                                            │
│ ┌─ Inherited Attributes ─────────────┐    │
│ │ 🌍 applicant.creditScore  [Edit]   │    │
│ │ 🌍 applicant.income       [Edit]   │    │
│ └────────────────────────────────────┘    │
│                                            │
│ ┌─ Custom Attributes ────────────────┐    │
│ │ 🔧 riskScore         [Edit] [×]    │    │
│ │ 🔧 approvalOverride  [Edit] [×]    │    │
│ └────────────────────────────────────┘    │
│                                            │
│ [+ Add Custom Attribute]                  │
└────────────────────────────────────────────┘
```

### Enhanced Test Panel
```
┌─ Testing ──────────────────────────────────┐
│ [Variables] [Attributes] [Vocabulary]     │
│                                            │
│ Quick Fill: [Standard Applicant ▼]        │
│                                            │
│ 🌍 applicant.creditScore: [750___]        │
│ 🌍 applicant.income:      [85000_]        │
│ 🔧 riskScore:             [72____]        │
│ 🔧 approvalOverride:      [ ] false [×]   │
│                                            │
│ [▶ Run Test]                              │
│                                            │
│ ✅ Result: Approved                       │
└────────────────────────────────────────────┘
```

---

## Migration Strategy

Following **Strangler Pattern**:

1. ✅ Build service layer in isolation
2. ✅ Build hooks without touching existing code
3. ✅ Build UI components separately
4. ✅ Feature flags for gradual rollout
5. ✅ Keep old components as fallback
6. ✅ Remove old code only after validation period

**Backward Compatibility Guaranteed:**
- Existing `useDataModel()` calls continue to work
- Existing automations default to global mode
- No breaking changes to current functionality

---

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Performance (large models) | High | Virtual scrolling, memoization, caching |
| Complex resolution logic | High | Comprehensive unit tests, debug logging |
| UI complexity | Medium | Progressive disclosure, tooltips, wizards |
| Data migration | Low | Default to global mode, no structure changes |

---

## Success Criteria

### Must Have (P0)
- ✅ Create automation with extended data model
- ✅ Add custom attributes
- ✅ Override vocabulary
- ✅ Test panel supports attributes from data model
- ✅ Visual indicators (🌍 global, 🔧 custom)

### Should Have (P1)
- ✅ Mock data generation for all types
- ✅ Persona-based quick-fill
- ✅ Vocabulary tab in test panel
- ✅ Hide inherited attributes

### Nice to Have (P2)
- ⚠️ Drag-to-reorder custom attributes
- ⚠️ Custom persona creation
- ⚠️ Test data export/import

---

## Next Steps for Review

### Before Starting Implementation

1. **Review architecture** - Is the service layer approach sound?
2. **Review UI mockups** - Do the components make sense?
3. **Approve timeline** - Is 3-4 weeks reasonable?
4. **Resolve open questions** - Decide on design questions above
5. **Prioritize features** - Can we cut P2 items if timeline is tight?

### After Approval

1. Create git branch: `epic/data-model-hierarchy`
2. Start Phase 1: Service Layer Foundation
3. Daily updates on progress
4. Demo at end of each phase

---

## Questions?

- **Full EPIC document**: `/planning/epics/EPIC-DataModelHierarchyAndTestingEnhancements.md`
- **Questions or concerns**: [Add comments in review session]
- **Alternative approaches**: [Open for discussion]

---

**Ready to proceed?** 🚀

Once approved, we'll begin with Phase 1 (Service Layer Foundation) and deliver working model resolution within 3-4 days.
