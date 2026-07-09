# Services Layer

This directory contains service layer implementations that provide business logic and data operations.

---

## Data Model Service

**File:** `dataModelService.ts`

### Purpose

Provides operations for data model extensions and resolution. Enables automations to extend global base models with custom attributes and vocabulary.

### Key Concepts

**Base Models**: Global data models shared across automations (defined in `/data/dataModels.ts`)

**Extensions**: Automation-specific additions to base models
- Add custom attributes
- Override/extend vocabulary (additive)
- Hide base attributes if not needed

**Resolved Models**: Result of merging base model + extension
- Single unified model for an automation
- Tracks source of each attribute (global vs custom)
- Tracks vocabulary overrides

### Architecture

```
┌─────────────────────────────────────────────────────┐
│                 Application Layer                    │
│          (Components, Hooks, UI Logic)              │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│              Data Model Service                      │
│  - Model Resolution (base + extension → resolved)   │
│  - Extension CRUD Operations                        │
│  - Attribute Management                             │
│  - Vocabulary Operations                            │
│  - Validation                                       │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│                   Data Layer                         │
│  - Base Models (/data/dataModels.ts)                │
│  - Extensions (/data/dataModelExtensions.ts)        │
│  - Automations (/data/automations.ts)               │
└─────────────────────────────────────────────────────┘
```

### Usage Example

```typescript
import { dataModelService } from './services/dataModelService';
import { initializeDataModelService } from './data/initializeDataModelService';

// Initialize with sample data
initializeDataModelService();

// Resolve a model for an automation
const resolvedModel = dataModelService.resolveModel('auto-loan-approval');

console.log(resolvedModel.name); // "Loan Financial (Extended)"
console.log(resolvedModel.isExtended); // true
console.log(resolvedModel.attributes.length); // Base + custom attributes

// Check attribute source
const isCustom = resolvedModel.attributeSources.get('riskScore') === 'custom';
console.log(isCustom); // true

// Get all vocabulary terms (base + custom)
const vocabulary = dataModelService.getAllVocabulary(resolvedModel);
console.log(vocabulary); // ['credit score', 'FICO score', 'risk score', ...]
```

### API Reference

#### Model Resolution

**`resolveModel(automationId: string, extensionId?: string): ResolvedDataModel`**

Resolves a data model for an automation by merging base model + extension.

```typescript
const resolved = dataModelService.resolveModel('auto-loan-approval');
// Returns: ResolvedDataModel with merged attributes and vocabulary
```

**`getAllVocabulary(resolvedModel: ResolvedDataModel): string[]`**

Gets all vocabulary terms from a resolved model (base + custom).

```typescript
const vocab = dataModelService.getAllVocabulary(resolvedModel);
// Returns: ['credit score', 'FICO score', 'annual income', ...]
```

#### Extension Management

**`createExtension(automationId: string, baseModelId: string): DataModelExtension`**

Creates a new extension for an automation.

```typescript
const extension = dataModelService.createExtension('auto-001', 'loan-financial');
```

**`updateExtension(extensionId: string, updates: Partial<DataModelExtension>): DataModelExtension`**

Updates an existing extension.

```typescript
dataModelService.updateExtension('ext-001', {
  addedAttributes: [...]
});
```

**`deleteExtension(extensionId: string): boolean`**

Deletes an extension.

```typescript
dataModelService.deleteExtension('ext-001');
```

#### Attribute Operations

**`addAttribute(extensionId: string, attribute: DataModelAttribute): void`**

Adds a custom attribute to an extension.

```typescript
dataModelService.addAttribute('ext-001', {
  name: 'riskScore',
  type: 'number',
  vocabulary: ['risk score', 'calculated risk'],
  description: 'Automated risk score'
});
```

**`removeAttribute(extensionId: string, attributeName: string): void`**

Removes a custom attribute.

```typescript
dataModelService.removeAttribute('ext-001', 'riskScore');
```

**`updateAttribute(extensionId: string, attributeName: string, updates: Partial<DataModelAttribute>): void`**

Updates a custom attribute.

```typescript
dataModelService.updateAttribute('ext-001', 'riskScore', {
  description: 'Updated description'
});
```

#### Vocabulary Operations

**`addVocabulary(extensionId: string, attributePath: string, terms: string[]): void`**

Adds vocabulary terms to an attribute (additive - merges with base vocabulary).

```typescript
dataModelService.addVocabulary('ext-001', 'applicant.creditScore', [
  'FICO score',
  'credit rating'
]);
```

**`removeVocabulary(extensionId: string, attributePath: string, terms: string[]): void`**

Removes vocabulary terms.

```typescript
dataModelService.removeVocabulary('ext-001', 'applicant.creditScore', [
  'FICO score'
]);
```

**`resetVocabulary(extensionId: string, attributePath: string): void`**

Resets vocabulary to base model vocabulary only (removes all custom terms).

```typescript
dataModelService.resetVocabulary('ext-001', 'applicant.creditScore');
```

#### Attribute Visibility

**`hideAttribute(extensionId: string, attributePath: string): void`**

Hides a base model attribute (won't appear in resolved model).

```typescript
dataModelService.hideAttribute('ext-001', 'loanTerm');
```

**`unhideAttribute(extensionId: string, attributePath: string): void`**

Unhides a previously hidden attribute.

```typescript
dataModelService.unhideAttribute('ext-001', 'loanTerm');
```

#### Validation

**`validateExtension(extension: DataModelExtension): ValidationResult`**

Validates an extension for errors and warnings.

```typescript
const result = dataModelService.validateExtension(extension);
if (!result.isValid) {
  console.error('Validation errors:', result.errors);
}
```

**`validateAttribute(attribute: DataModelAttribute): ValidationResult`**

Validates a custom attribute.

```typescript
const result = dataModelService.validateAttribute({
  name: 'riskScore',
  type: 'number',
  vocabulary: ['risk score']
});
```

### Data Structures

#### DataModelExtension

```typescript
interface DataModelExtension {
  id: string;
  automationId: string;
  baseModelId: string;
  
  addedAttributes: DataModelAttribute[];
  vocabularyOverrides: Record<string, string[]>;
  hiddenAttributes: string[];
  
  createdAt: Date;
  updatedAt: Date;
}
```

#### ResolvedDataModel

```typescript
interface ResolvedDataModel extends DataModel {
  isExtended: boolean;
  baseModelId?: string;
  extensionId?: string;
  
  attributeSources: Map<string, 'global' | 'custom'>;
  vocabularyOverrides: Map<string, string[]>;
}
```

### Vocabulary Propagation

**IMPORTANT:** Vocabulary updates must be reflected everywhere the data model is used.

When vocabulary is updated in an extension:
1. ✅ Resolved model includes merged vocabulary (base + custom)
2. ✅ `getAllVocabulary()` returns all terms
3. 🔄 **TODO**: Hooks need to listen for vocabulary changes and update UI
4. 🔄 **TODO**: Autocomplete needs to refresh when vocabulary changes
5. 🔄 **TODO**: Syntax highlighting may need to update for BAL

**Pattern for Vocabulary Propagation:**
```typescript
// When vocabulary is updated
dataModelService.addVocabulary(extensionId, attributePath, newTerms);

// Trigger re-resolution of model
const updated = dataModelService.resolveModel(automationId);

// Hooks should listen for this change and update their state
// This will be implemented in Phase 2 (Hook Layer)
```

### Testing

Run tests from console:

```typescript
import { runDataModelServiceTests } from './services/__tests__/dataModelService.test';
runDataModelServiceTests();
```

Tests verify:
- Extension registration and retrieval
- Model resolution
- Attribute operations (add/remove/update)
- Vocabulary operations
- Attribute hiding
- Validation
- Vocabulary extraction

### Future Enhancements

**Phase 2 (Hook Layer):**
- React hooks for data access (`useAutomationDataModel`)
- State management for extensions
- Change detection and propagation
- Optimistic updates

**Phase 3 (UI Layer):**
- Visual data model extension editor
- Vocabulary editor component
- Real-time validation feedback
- Attribute source indicators (🌍 global, 🔧 custom)

**Later:**
- Undo/redo for data model changes
- Version history
- Import/export extensions
- Model sharing between automations

---

## Guidelines Compliance

### Architectural Patterns

✅ **Service Layer**: Business logic separate from UI  
✅ **Strangler Pattern**: Built in isolation, no modifications to existing code  
✅ **Data Abstraction**: Service provides clean API for data operations  
✅ **Validation**: Comprehensive validation at service layer  

### Vocabulary Propagation (Critical Requirement)

✅ **Additive Vocabulary**: Base + custom vocabulary both work  
✅ **Resolution**: Merged vocabulary in resolved models  
✅ **Extraction**: `getAllVocabulary()` returns all terms  
🔄 **Propagation**: Will be implemented in Phase 2 hooks  

When a user updates vocabulary in the data model:
1. Service layer merges base + custom vocabulary
2. Hooks layer will detect changes and trigger updates
3. Components will re-render with new vocabulary
4. Autocomplete/syntax highlighting will refresh

### Safety

✅ **No UI Changes**: Existing components untouched  
✅ **No Breaking Changes**: New service, doesn't affect existing code  
✅ **Validation**: Errors caught at service layer before UI  
✅ **Type Safety**: Full TypeScript types throughout  

---

## Related Documentation

- `/data/dataModels.ts` - Base data model definitions
- `/data/dataModelExtensions.ts` - Sample extensions
- `/data/automations.ts` - Automation entities
- `/planning/epics/EPIC-DataModelHierarchyAndTestingEnhancements.md` - Full EPIC plan

---

**Created:** November 14, 2025  
**Phase:** Phase 1 - Service Layer Foundation  
**Status:** ✅ Complete
