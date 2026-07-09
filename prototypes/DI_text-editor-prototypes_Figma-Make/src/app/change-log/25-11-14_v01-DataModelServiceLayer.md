# Data Model Service Layer - Phase 1 Foundation

**Date:** November 14, 2025  
**Type:** Feature - Service Layer  
**Phase:** Phase 1 of Data Model Hierarchy EPIC  
**Status:** ✅ Complete

---

## Summary

Implemented foundational service layer for data model hierarchy and extensions. This enables automations to extend global base models with custom attributes and vocabulary without modifying the base models or affecting other automations.

**Key Achievement:** Built complete service layer in isolation with zero changes to existing UI or components.

---

## Context

As part of the Data Model Hierarchy & Testing Enhancements EPIC, we need:
1. Automations to customize global data models with automation-specific attributes
2. Vocabulary customization per automation (additive - base + custom both work)
3. Visual distinction between global and custom attributes (future phases)
4. Comprehensive testing with attributes and vocabulary (future phases)

This change log covers **Phase 1 only** - the service layer foundation that provides the business logic for all future phases.

---

## Implementation Details

### Files Created

**Service Layer:**
- `/services/dataModelService.ts` - Core service for model resolution and operations
- `/services/__tests__/dataModelService.test.ts` - Test suite
- `/services/README.md` - Complete documentation

**Data Layer:**
- `/data/dataModelExtensions.ts` - Sample automation-specific extensions
- `/data/automations.ts` - Automation entities with data model configuration
- `/data/initializeDataModelService.ts` - Service initialization

### Architecture

```
Service Layer (NEW)
  ├─ dataModelService.ts
  │   ├─ Model Resolution (base + extension → resolved)
  │   ├─ Extension CRUD
  │   ├─ Attribute Operations
  │   ├─ Vocabulary Operations
  │   └─ Validation
  │
Data Layer (NEW)
  ├─ dataModelExtensions.ts (5 sample extensions)
  ├─ automations.ts (6 sample automations)
  └─ initializeDataModelService.ts
```

### Key Interfaces

**DataModelExtension:**
```typescript
interface DataModelExtension {
  id: string;
  automationId: string;
  baseModelId: string;
  addedAttributes: DataModelAttribute[];
  vocabularyOverrides: Record<string, string[]>; // Additive
  hiddenAttributes: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

**ResolvedDataModel:**
```typescript
interface ResolvedDataModel extends DataModel {
  isExtended: boolean;
  baseModelId?: string;
  extensionId?: string;
  attributeSources: Map<string, 'global' | 'custom'>;
  vocabularyOverrides: Map<string, string[]>;
}
```

### Service API

**Model Resolution:**
- `resolveModel(automationId, extensionId?)` - Merge base + extension
- `getAllVocabulary(resolvedModel)` - Get all vocabulary terms

**Extension Management:**
- `createExtension(automationId, baseModelId)` - Create new extension
- `updateExtension(extensionId, updates)` - Update extension
- `deleteExtension(extensionId)` - Delete extension

**Attribute Operations:**
- `addAttribute(extensionId, attribute)` - Add custom attribute
- `removeAttribute(extensionId, attributeName)` - Remove custom attribute
- `updateAttribute(extensionId, attributeName, updates)` - Update attribute

**Vocabulary Operations:**
- `addVocabulary(extensionId, attributePath, terms)` - Add vocabulary (additive)
- `removeVocabulary(extensionId, attributePath, terms)` - Remove vocabulary
- `resetVocabulary(extensionId, attributePath)` - Reset to base vocabulary

**Attribute Visibility:**
- `hideAttribute(extensionId, attributePath)` - Hide base attribute
- `unhideAttribute(extensionId, attributePath)` - Unhide attribute

**Validation:**
- `validateExtension(extension)` - Validate extension
- `validateAttribute(attribute)` - Validate custom attribute

### Sample Data

**Created 5 sample extensions:**
1. Loan Approval (adds: riskScore, approvalOverride, underwriterNotes)
2. Mortgage Approval (adds: propertyValue, downPaymentPercent, debtToIncomeRatio, etc.)
3. Holiday Eligibility (adds: eligibility object with sub-attributes)
4. Employee Bonus (adds: performanceRating, bonusMultiplier, calculatedBonus)
5. Discount Calculator (adds: discountTier, seasonalDiscountActive, finalDiscountPercent)

**Created 6 sample automations:**
- 4 BAL automations with extended models
- 2 Formula automations (1 extended, 1 global-only)

All samples demonstrate real-world usage patterns.

---

## Architectural Decisions

### 1. Vocabulary Strategy: Additive (Merge)
**Decision:** Base vocabulary + custom vocabulary both work (not replacement)

**Rationale:**
- More user-friendly (existing vocabulary doesn't break)
- Allows gradual refinement
- Reduces risk of breaking existing BAL/formulas

**Implementation:**
```typescript
// Extension specifies additional terms
vocabularyOverrides: {
  'applicant.creditScore': ['FICO score', 'credit rating']
}

// Resolved model merges base + custom
resolvedAttribute.vocabulary = [
  ...baseVocab,      // ['credit score']
  ...customVocab     // ['FICO score', 'credit rating']
]
// Result: ['credit score', 'FICO score', 'credit rating'] all work
```

### 2. Extension Scope: Automation-Specific Only
**Decision:** Extensions belong to one automation, not shared

**Rationale:**
- Simpler to reason about (no cascading changes)
- Clearer ownership (automation owns its customizations)
- Easier to delete/modify (no dependency tracking)
- Can add sharing later if needed

### 3. Storage: Embedded in Automation
**Decision:** Extension configuration stored with automation entity

**Rationale:**
- Simpler data model (one entity, not two)
- Atomic updates (change automation + extension together)
- Easier serialization for save/load
- Can extract to separate entity later if needed

### 4. Nested Extensions: Not Allowed
**Decision:** Can only extend global base models, not other extensions

**Rationale:**
- Avoids complexity of inheritance chains
- Prevents circular dependencies
- Easier to understand and debug
- Sufficient for current use cases

---

## Vocabulary Propagation (Critical Requirement)

**Requirement:** When vocabulary is updated in data model, updates must be reflected everywhere.

**Phase 1 Implementation (Service Layer):**
✅ Vocabulary merging in `resolveModel()`
✅ `getAllVocabulary()` returns merged vocabulary
✅ Validation ensures vocabulary terms are valid

**Phase 2 TODO (Hook Layer):**
🔄 React hooks listen for vocabulary changes
🔄 State updates trigger re-renders
🔄 Autocomplete refreshes with new vocabulary

**Phase 3 TODO (UI Layer):**
🔄 Visual vocabulary editor
🔄 Real-time validation feedback
🔄 Syntax highlighting updates (BAL)

**Pattern:**
```typescript
// Update vocabulary
dataModelService.addVocabulary(extensionId, 'applicant.income', [
  'annual income', 'gross income'
]);

// Re-resolve model (gets merged vocabulary)
const updated = dataModelService.resolveModel(automationId);

// Future: Hooks detect change and trigger updates
// Future: Components re-render with new vocabulary
// Future: Autocomplete shows new terms
```

---

## Testing

**Test Suite:** `/services/__tests__/dataModelService.test.ts`

**Tests Verify:**
1. ✅ Extension registration and retrieval
2. ✅ Extension retrieval by automation ID
3. ✅ Model resolution (base + extension → resolved)
4. ✅ Custom attributes included in resolved model
5. ✅ Vocabulary overrides applied correctly
6. ✅ Add custom attribute operation
7. ✅ Add vocabulary override operation
8. ✅ Hide attribute operation
9. ✅ Hidden attributes excluded from resolved model
10. ✅ Extension validation
11. ✅ Get all vocabulary from resolved model

**Run Tests:**
```typescript
import { runDataModelServiceTests } from './services/__tests__/dataModelService.test';
runDataModelServiceTests();
```

All tests pass ✅

---

## Safety Measures

### Strangler Pattern Compliance
✅ **Built in isolation** - No modifications to existing files
✅ **No UI changes** - FormulaTestPanel untouched
✅ **No hook changes** - Existing hooks untouched
✅ **No breaking changes** - Purely additive

### Files NOT Modified
- ❌ `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`
- ❌ `/hooks/useDataModel.ts`
- ❌ `/data/dataModels.ts` (except reading from it)
- ❌ Any UI components

### Type Safety
✅ Full TypeScript types for all interfaces
✅ Validation at service layer
✅ Type guards for optional properties
✅ Comprehensive error messages

---

## Example Usage

```typescript
import { dataModelService } from './services/dataModelService';
import { initializeDataModelService } from './data/initializeDataModelService';

// Initialize service with sample data
initializeDataModelService();

// Resolve model for loan approval automation
const resolved = dataModelService.resolveModel('auto-loan-approval');

console.log('Model:', resolved.name);
// "Loan Financial (Extended)"

console.log('Is extended?', resolved.isExtended);
// true

console.log('Attributes:', resolved.attributes.length);
// Base attributes + custom attributes

// Check if attribute is custom or global
const source = resolved.attributeSources.get('riskScore');
console.log('riskScore is:', source);
// "custom"

// Get all vocabulary (base + custom)
const vocabulary = dataModelService.getAllVocabulary(resolved);
console.log('Vocabulary terms:', vocabulary);
// ['credit score', 'FICO score', 'annual income', 'gross income', 'risk score', ...]

// Add new vocabulary term
dataModelService.addVocabulary(
  'ext-loan-approval-001',
  'applicant.income',
  ['yearly salary']
);

// Re-resolve to get updated vocabulary
const updated = dataModelService.resolveModel('auto-loan-approval');
const updatedVocab = dataModelService.getAllVocabulary(updated);
// Now includes 'yearly salary'
```

---

## Next Steps

### Phase 2: Hook Layer (Next)
- Create `useAutomationDataModel()` hook
- Create `useDataModelExtension()` hook
- Implement vocabulary change detection
- State management for extensions
- Integration with existing `useDataModel()`

### Phase 3: UI Layer (Later)
- Data model extension editor component
- Vocabulary editor component
- Visual indicators (🌍 global, 🔧 custom)
- Attribute source badges

### Phase 4: Test Panel Enhancement (Later)
- Attribute inputs in test panel
- Vocabulary tab in test panel
- Mock data generation
- Persona-based quick-fill

---

## Known Limitations

### Current Phase 1 Limitations
- ⚠️ No UI yet (service layer only)
- ⚠️ No React hooks yet (Phase 2)
- ⚠️ No persistence (in-memory only)
- ⚠️ No undo/redo
- ⚠️ No vocabulary change propagation (Phase 2)

### Future Enhancements
- Real-time collaboration
- Version history for extensions
- Import/export extensions
- Extension templates
- AI-suggested attributes

---

## Breaking Changes

**None.** This is a purely additive change.

All existing functionality remains unchanged.

---

## Documentation

- Service documentation: `/services/README.md`
- EPIC plan: `/planning/epics/EPIC-DataModelHierarchyAndTestingEnhancements.md`
- Requirements: `/planning/requirements/25-11-14_v01-DataModelHierarchyPlan.md`

---

## References

- IBM Carbon Design System: https://carbondesignsystem.com/
- TypeScript documentation for service patterns
- Strangler Pattern for incremental migration

---

**Phase 1 Status:** ✅ Complete  
**Next Phase:** Phase 2 - Hook Layer  
**Estimated Next Phase:** 2-3 days

---

**Author:** AI Assistant  
**Reviewed:** Pending  
**Approved:** Pending
