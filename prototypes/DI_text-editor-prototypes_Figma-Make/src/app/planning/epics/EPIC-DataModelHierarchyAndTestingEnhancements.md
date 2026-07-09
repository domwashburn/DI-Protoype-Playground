# EPIC - Data Model Hierarchy & Testing Enhancements

**Status:** 📋 Planned  
**Priority:** High  
**Complexity:** High  
**Estimated Effort:** 2-3 weeks

---

## Executive Summary

This EPIC introduces two critical architectural enhancements that work together to enable more flexible and testable decision automation:

1. **Data Model Hierarchy**: Enable automations to extend global data models with automation-specific attributes and vocabulary
2. **Enhanced Test Panel**: Provide comprehensive testing inputs for variables, attributes, and vocabulary terms with realistic mock data

These features enable:
- Automation-specific customization of shared data models
- Complete test coverage for formulas and BAL rules
- Visual distinction between global and custom attributes
- Natural language vocabulary testing

---

## Problem Statement

### Current Limitations

**Data Model Architecture:**
- All data models are global and shared across automations
- No way to add automation-specific attributes without polluting global models
- Cannot override/customize vocabulary for specific contexts
- Automations with unique data needs must use global models as-is

**Test Panel Limitations:**
- Formula test panel only shows variables (not attributes from data model)
- BAL test panel only shows attributes (not vocabulary terms)
- No way to test with realistic mock data for different attribute types
- Cannot see how vocabulary maps to underlying attributes during testing
- Manual entry required for all test values

### User Impact

**For Business Analysts:**
- Cannot customize vocabulary per automation without affecting all automations
- Hard to test rules with data model attributes (must manually construct variables)
- Cannot validate natural language mappings work as expected

**For Decision Engineers:**
- Code duplication when multiple automations need similar but slightly different models
- Risk of breaking other automations when changing global models
- Difficulty maintaining large global models that serve many contexts

---

## Vision

### Data Model Hierarchy

**Enable a flexible inheritance model where:**
- Global base models provide common attributes used across automations
- Automations can extend base models with custom attributes
- Automations can override vocabulary for context-specific terminology
- Clear visual indicators show what's global vs. custom
- Changes to automation-specific extensions don't affect other automations

**Example Use Case: Loan Applications**

```
Global Loan Model (base):
  - applicant.creditScore
  - applicant.income
  - loanAmount
  - loanTerm

Automation A: "Standard Loan Approval"
  Extends: Global Loan Model
  Adds:
    - riskScore (calculated)
    - approvalOverride (boolean)
  Vocabulary Override:
    - creditScore → ["FICO score", "credit rating"] (more specific)

Automation B: "Mortgage Approval"  
  Extends: Global Loan Model
  Adds:
    - propertyValue (number)
    - downPaymentPercent (number)
    - debtToIncomeRatio (number)
  Vocabulary Override:
    - income → ["annual income", "gross income", "household income"]
```

### Enhanced Test Panel

**Provide comprehensive testing interface with:**
- Tabbed interface for Variables / Attributes / Vocabulary
- Auto-generated realistic mock data based on attribute types
- Visual mapping showing vocabulary → attribute relationships
- Smart input validation matching attribute types
- Quick-fill with sample data sets
- Test results showing intermediate steps and final values

---

## User Stories

### Story 1: Automation-Specific Attributes
**As a** decision engineer  
**I want to** add custom attributes to an automation without modifying the global data model  
**So that** I can support unique business logic without affecting other automations

**Acceptance Criteria:**
- Can select a base data model for an automation
- Can add new attributes specific to that automation
- Custom attributes are clearly marked as "automation-specific" in UI
- Changes to custom attributes don't affect other automations
- Can view combined (base + custom) data model for an automation

### Story 2: Vocabulary Customization
**As a** business analyst  
**I want to** customize vocabulary terms for specific automations  
**So that** I can use domain-specific language that matches our business context

**Acceptance Criteria:**
- Can override vocabulary for base model attributes
- Custom vocabulary only applies to that automation
- Original vocabulary still works (additive, not replacement)
- Visual indicator shows when vocabulary has been customized
- Can reset to base vocabulary if needed

### Story 3: Comprehensive Testing
**As a** decision engineer  
**I want to** test formulas and BAL rules with all types of inputs (variables, attributes, vocabulary)  
**So that** I can validate my logic works correctly before deployment

**Acceptance Criteria:**
- Can input test values for variables (formula parameters)
- Can input test values for data model attributes
- Can test using natural language vocabulary terms
- System shows how vocabulary maps to attributes
- Results show intermediate steps and final output
- Can quickly populate with realistic mock data

### Story 4: Visual Data Model Hierarchy
**As a** business analyst  
**I want to** see which attributes come from the base model vs. automation-specific  
**So that** I understand what's shared vs. unique to this automation

**Acceptance Criteria:**
- Base model attributes have visual indicator (e.g., 🌍 globe icon)
- Custom attributes have different indicator (e.g., 🔧 wrench icon)
- Overridden vocabulary is clearly marked (e.g., 🔁 override icon)
- Can toggle visibility of base vs. custom attributes
- Tooltip/help text explains the hierarchy

### Story 5: Mock Data Generation
**As a** decision engineer  
**I want** realistic test data auto-generated based on attribute types  
**So that** I don't have to manually create test scenarios

**Acceptance Criteria:**
- System generates appropriate values for each type (string, number, date, etc.)
- Can choose from multiple sample data sets ("persona A", "persona B", "edge case")
- Generated data respects constraints (e.g., positive numbers for age)
- Can override auto-generated values with custom inputs
- Can save and reload test data sets

---

## Technical Architecture

### Phase 1: Data Model Service Layer (Foundation)

**New Files:**
```
/services/
  dataModelService.ts           # Service for data model operations (NEW)
  testDataService.ts            # Mock data generation service (NEW)

/data/
  dataModelExtensions.ts        # Automation-specific extensions (NEW)
  automations.ts                # Automation entities with data model config (NEW)
```

**Key Interfaces:**

```typescript
// Data Model Extension
interface DataModelExtension {
  id: string;
  automationId: string;          // Which automation owns this
  baseModelId: string;            // Which global model to extend
  addedAttributes: DataModelAttribute[];
  vocabularyOverrides: Record<string, string[]>; // attributePath → custom vocab
  hiddenAttributes: string[];     // Base attributes to hide
  createdAt: Date;
  updatedAt: Date;
}

// Resolved Data Model (base + extension merged)
interface ResolvedDataModel extends DataModel {
  isExtended: boolean;
  baseModelId?: string;
  extensionId?: string;
  attributeSources: Map<string, 'global' | 'custom'>; // Track source
}

// Automation Entity
interface Automation {
  id: string;
  name: string;
  type: 'bal' | 'formula';
  
  dataModelConfig: {
    mode: 'global' | 'extended' | 'custom';
    baseModelId?: string;
    extensionId?: string;
    customModelId?: string;
  };
  
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Service Methods:**

```typescript
// dataModelService.ts
export interface DataModelService {
  // Resolution
  getResolvedModel(automationId: string): ResolvedDataModel;
  getBaseModel(modelId: string): DataModel;
  
  // Extension CRUD
  createExtension(automationId: string, baseModelId: string): DataModelExtension;
  updateExtension(extensionId: string, updates: Partial<DataModelExtension>): void;
  deleteExtension(extensionId: string): void;
  
  // Attribute operations
  addAttribute(automationId: string, attribute: DataModelAttribute): void;
  removeAttribute(automationId: string, attributePath: string): void;
  updateAttribute(automationId: string, attributePath: string, updates: Partial<DataModelAttribute>): void;
  
  // Vocabulary operations
  addVocabulary(automationId: string, attributePath: string, terms: string[]): void;
  removeVocabulary(automationId: string, attributePath: string, terms: string[]): void;
  resetVocabulary(automationId: string, attributePath: string): void;
  
  // Validation
  validateExtension(extension: DataModelExtension): ValidationResult;
  validateAttribute(attribute: DataModelAttribute): ValidationResult;
}

// testDataService.ts
export interface TestDataService {
  // Mock data generation
  generateMockValue(attribute: DataModelAttribute): any;
  generateMockValueSet(attributes: DataModelAttribute[], persona?: string): Record<string, any>;
  
  // Personas/scenarios
  getAvailablePersonas(modelId: string): Persona[];
  generatePersonaData(personaId: string, attributes: DataModelAttribute[]): Record<string, any>;
  
  // Validation
  validateTestValue(value: any, attribute: DataModelAttribute): boolean;
  
  // Vocabulary
  getVocabularyExamples(attribute: DataModelAttribute): string[];
  resolveVocabularyTerm(term: string, model: DataModel): string | null;
}
```

### Phase 2: Hook Layer (Data Access)

**New Hooks:**
```
/hooks/
  useAutomationDataModel.ts     # Access resolved data model for automation (NEW)
  useDataModelExtension.ts      # CRUD operations on extensions (NEW)
  useTestData.ts                # Test data generation and management (NEW)
```

**Hook Interfaces:**

```typescript
// useAutomationDataModel.ts
export function useAutomationDataModel(automationId?: string) {
  return {
    // Data
    resolvedModel: ResolvedDataModel | null,
    baseModel: DataModel | null,
    extension: DataModelExtension | null,
    
    // State
    isLoading: boolean,
    error: Error | null,
    
    // Queries
    isExtended: boolean,
    hasCustomAttributes: boolean,
    hasVocabularyOverrides: boolean,
    getAttributeSource: (path: string) => 'global' | 'custom' | null,
    
    // Mutations
    createExtension: (baseModelId: string) => void,
    deleteExtension: () => void,
    addAttribute: (attribute: DataModelAttribute) => void,
    removeAttribute: (path: string) => void,
    updateAttribute: (path: string, updates: Partial<DataModelAttribute>) => void,
    addVocabulary: (path: string, terms: string[]) => void,
    removeVocabulary: (path: string, terms: string[]) => void,
    resetVocabulary: (path: string) => void,
  };
}

// useTestData.ts
export function useTestData(
  variables: Variable[],
  attributes: DataModelAttribute[],
  mode: 'formula' | 'bal'
) {
  return {
    // Test values
    variableValues: Record<string, any>,
    attributeValues: Record<string, any>,
    vocabularyMappings: Record<string, string>,
    
    // Setters
    setVariableValue: (name: string, value: any) => void,
    setAttributeValue: (path: string, value: any) => void,
    setVocabularyMapping: (term: string, attributePath: string) => void,
    
    // Batch operations
    populateFromPersona: (personaId: string) => void,
    clearAllValues: () => void,
    resetToDefaults: () => void,
    
    // Validation
    validateAll: () => ValidationResult[],
    isValid: boolean,
    
    // Mock data
    generateMockValues: () => void,
    availablePersonas: Persona[],
  };
}
```

### Phase 3: UI Components (Visual Interface)

**Component Structure:**
```
/components/
  DataModelExtensionEditor/       # Editor for automation-specific extensions (NEW)
    DataModelExtensionEditor.tsx
    BaseAttributeList.tsx         # Shows inherited attributes
    CustomAttributeList.tsx       # Shows custom attributes
    AttributeRow.tsx              # Single attribute with edit controls
    VocabularyEditor.tsx          # Edit vocabulary for an attribute
    DataModelExtensionEditor.module.css
    README.md
  
  editors/code/shared/components/
    UnifiedTestPanel/              # Enhanced test panel with tabs (NEW)
      UnifiedTestPanel.tsx
      VariableInputs.tsx          # Variable value inputs (refactored from existing)
      AttributeInputs.tsx         # Data model attribute inputs (NEW)
      VocabularyInputs.tsx        # Vocabulary term inputs (NEW)
      TestInputRow.tsx            # Reusable input row (NEW)
      PersonaSelector.tsx         # Quick-fill with persona data (NEW)
      UnifiedTestPanel.module.css
      README.md
```

**UI Flow - Data Model Extension:**

```
┌─ Automation Settings Panel ───────────────────────────┐
│ 📊 Data Model Configuration                          │
│                                                       │
│ ○ Use global model as-is                            │
│ ● Extend global model                               │
│ ○ Create custom model (no inheritance)              │
│                                                       │
│ [Base Model: Loan Application ▼]                     │
│                                                       │
│ ┌─ Inherited Attributes ─────────────────────────┐   │
│ │                                                 │   │
│ │ 🌍 applicant.creditScore (number)          [👁]│   │
│ │    Vocab: credit score, FICO score             │   │
│ │    [Edit Vocabulary]                            │   │
│ │                                                 │   │
│ │ 🌍 applicant.income (number)               [👁]│   │
│ │    Vocab: income, salary, annual income        │   │
│ │    [Edit Vocabulary]                            │   │
│ │                                                 │   │
│ │ 🌍 loanAmount (number)                     [👁]│   │
│ │    Vocab: loan amount, requested amount        │   │
│ │    [Edit Vocabulary]                            │   │
│ │                                                 │   │
│ └─────────────────────────────────────────────────┘   │
│                                                       │
│ ┌─ Custom Attributes ────────────────────────────┐   │
│ │                                                 │   │
│ │ 🔧 riskScore (number)                      [×] │   │
│ │    Vocab: risk score, calculated risk          │   │
│ │    Description: Calculated risk score          │   │
│ │    [Edit] [Remove]                              │   │
│ │                                                 │   │
│ │ 🔧 approvalOverride (boolean)              [×] │   │
│ │    Vocab: override, manual approval            │   │
│ │    Description: Manual approval override flag  │   │
│ │    [Edit] [Remove]                              │   │
│ │                                                 │   │
│ └─────────────────────────────────────────────────┘   │
│                                                       │
│ [+ Add Custom Attribute]                             │
│                                                       │
│ [Cancel]                            [Save Changes]   │
└───────────────────────────────────────────────────────┘
```

**UI Flow - Enhanced Test Panel:**

```
┌─ Testing ─────────────────────────────────────────────┐
│                                                       │
│ [Variables] [Attributes] [Vocabulary]    [▶ Run Test]│
│ ───────────────────────────────────────────────────── │
│                                                       │
│ Attributes (Loan Application + Custom)                │
│ [Quick Fill: Standard Applicant ▼] [Clear All]       │
│                                                       │
│ 🌍 applicant.creditScore (number)                    │
│    [750________________]  ← Auto-generated           │
│                                                       │
│ 🌍 applicant.income (number)                         │
│    [85000______________]  ← Auto-generated           │
│                                                       │
│ 🌍 loanAmount (number)                               │
│    [350000_____________]  ← Auto-generated           │
│                                                       │
│ 🔧 riskScore (number)                                │
│    [72_________________]  ← Auto-generated           │
│                                                       │
│ 🔧 approvalOverride (boolean)                        │
│    [ ] false  [×] true                                │
│                                                       │
│ ─────────────────────────────────────────────────────│
│                                                       │
│ 📋 Test Result:                                      │
│ ✅ Approved                                          │
│                                                       │
│ Intermediate Values:                                  │
│ • Credit tier: "Excellent"                           │
│ • DTI ratio: 23.5%                                   │
│ • Final decision: "APPROVED"                         │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 1: Service Layer Foundation (3-4 days)

**Goal:** Create service layer and data structures for data model hierarchy

**Tasks:**
1. ✅ Define TypeScript interfaces
   - `DataModelExtension`
   - `ResolvedDataModel`
   - `Automation` with data model config
   - Validation types

2. ✅ Implement `dataModelService.ts`
   - Model resolution (merge base + extension)
   - Extension CRUD operations
   - Attribute operations (add/remove/update)
   - Vocabulary operations
   - Validation logic

3. ✅ Implement `testDataService.ts`
   - Mock value generation by type
   - Persona system
   - Vocabulary helpers
   - Validation

4. ✅ Create sample data
   - `/data/dataModelExtensions.ts` with examples
   - `/data/automations.ts` with examples
   - Sample personas for testing

5. ✅ Unit tests
   - Test model resolution
   - Test extension validation
   - Test mock data generation

**Success Criteria:**
- Services can resolve base + extension into single model
- Mock data generation produces valid values for all types
- Validation catches invalid extensions
- Sample data demonstrates all features

**Deliverable:** Working service layer with tests and examples

---

### Phase 2: Hook Layer (2-3 days)

**Goal:** Create React hooks for accessing and mutating data models

**Tasks:**
1. ✅ Create `useAutomationDataModel` hook
   - Fetch resolved model for automation
   - Provide mutation operations
   - Handle loading/error states
   - Memoization and optimization

2. ✅ Create `useDataModelExtension` hook
   - CRUD operations on extensions
   - Optimistic updates
   - Validation integration

3. ✅ Create `useTestData` hook
   - Manage test values for variables and attributes
   - Persona integration
   - Batch operations

4. ✅ Update `useDataModel` hook
   - Support automation-specific resolution
   - Backward compatibility with existing usage
   - Optional automation ID parameter

5. ✅ Integration tests
   - Test hooks with sample automations
   - Test mutation flows
   - Test error handling

**Success Criteria:**
- Hooks provide clean API for components
- State management is efficient (no unnecessary re-renders)
- Existing code using `useDataModel` still works
- Error states handled gracefully

**Deliverable:** Production-ready hooks with documentation

---

### Phase 3: Data Model Extension UI (4-5 days)

**Goal:** Build UI for managing automation-specific data model extensions

**Tasks:**
1. ✅ Create `DataModelExtensionEditor` component
   - Mode selector (global / extended / custom)
   - Base model selector
   - Layout with inherited and custom sections

2. ✅ Create `BaseAttributeList` component
   - Show inherited attributes
   - Read-only with edit vocabulary button
   - Hide toggle
   - Visual indicator (🌍 globe icon)

3. ✅ Create `CustomAttributeList` component
   - Show custom attributes
   - Full CRUD operations
   - Visual indicator (🔧 wrench icon)
   - Drag to reorder

4. ✅ Create `AttributeRow` component
   - Display attribute details
   - Edit controls (type, vocab, description)
   - Validation feedback
   - Expandable for nested attributes

5. ✅ Create `VocabularyEditor` component
   - Tag input for vocabulary terms
   - Add/remove terms
   - Reset to base vocabulary
   - Override indicator (🔁)

6. ✅ Styling with CSS Modules
   - Carbon-aligned design
   - Visual hierarchy (base vs custom)
   - Responsive layout
   - Animations for add/remove

7. ✅ Integration with automation settings
   - Add data model tab to automation panel
   - Save/cancel workflow
   - Validation before save

**Success Criteria:**
- Can create extension from base model
- Can add/remove custom attributes
- Can override vocabulary for any attribute
- Visual distinction between base and custom
- Changes save and persist
- Validation prevents invalid configurations

**Deliverable:** Working data model extension editor integrated into app

---

### Phase 4: Enhanced Test Panel (4-5 days)

**Goal:** Build comprehensive test panel with variables, attributes, and vocabulary

**Tasks:**
1. ✅ Create `UnifiedTestPanel` component
   - Tabbed interface (Variables / Attributes / Vocabulary)
   - Mode prop (formula / bal)
   - Result display section
   - Error/warning display

2. ✅ Refactor `VariableInputs` component
   - Extract from existing `FormulaTestPanel`
   - Support all variable types
   - Type-specific input controls
   - Validation feedback

3. ✅ Create `AttributeInputs` component
   - List all attributes from resolved model
   - Type-specific input controls
   - Auto-generated mock values
   - Visual indicator for attribute source (🌍/🔧)

4. ✅ Create `VocabularyInputs` component
   - Show vocabulary → attribute mappings
   - Allow testing with natural language terms
   - Show resolution (term → attribute → value)
   - Highlight custom vocabulary terms

5. ✅ Create `TestInputRow` component
   - Reusable input row with label and control
   - Type-specific input widgets
   - Validation and error display
   - Mock data generation button

6. ✅ Create `PersonaSelector` component
   - Dropdown of available personas
   - Quick-fill all values
   - Persona descriptions
   - Custom persona creation

7. ✅ Integrate test data service
   - Auto-generate mock values on load
   - Persona-based data sets
   - Validation on input

8. ✅ Update evaluation integration
   - Pass attribute values to evaluator
   - Support vocabulary term resolution
   - Display intermediate values
   - Error highlighting

**Success Criteria:**
- Can test formulas with variables
- Can test BAL with attributes from data model
- Can test using vocabulary terms (natural language)
- Mock data generation works for all types
- Personas provide quick test scenarios
- Results show clear pass/fail and intermediate values
- Visual mapping shows vocabulary → attributes

**Deliverable:** Production-ready enhanced test panel

---

### Phase 5: Integration & Polish (3-4 days)

**Goal:** Integrate all pieces and refine UX

**Tasks:**
1. ✅ Connect automations to data models
   - Add data model config to automation entity
   - Save/load automation with data model settings
   - Migration for existing automations (default to global)

2. ✅ Update BAL Editor integration
   - Use resolved data model for autocomplete
   - Show attribute source in autocomplete (🌍/🔧)
   - Vocabulary suggestions include custom terms

3. ✅ Update Formula Editor integration
   - Support data model attributes as variables
   - Show data model in sidebar
   - Testing with attribute values

4. ✅ Visual polish
   - Consistent iconography (🌍🔧🔁)
   - Smooth animations
   - Loading states
   - Empty states with helpful guidance

5. ✅ Documentation
   - Component READMEs
   - Usage examples
   - Architecture documentation
   - Migration guide

6. ✅ End-to-end testing
   - Create automation with extended model
   - Add custom attributes
   - Test with vocabulary
   - Verify no regressions

7. ✅ Performance optimization
   - Memoization
   - Lazy loading
   - Debouncing
   - Virtual scrolling for large models

**Success Criteria:**
- All features work end-to-end
- No regressions in existing functionality
- Performance is acceptable (< 100ms for model resolution)
- Documentation complete
- Code review passed
- Ready for production

**Deliverable:** Production-ready integrated feature set

---

## Data Structures

### Data Model Extension

```typescript
interface DataModelExtension {
  id: string;
  automationId: string;
  baseModelId: string;
  
  // Custom attributes
  addedAttributes: DataModelAttribute[];
  
  // Vocabulary overrides (attributePath → custom vocabulary)
  vocabularyOverrides: {
    [attributePath: string]: string[];
  };
  
  // Hidden base attributes
  hiddenAttributes: string[];
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
}

// Example
const loanExtension: DataModelExtension = {
  id: 'ext-001',
  automationId: 'auto-loan-approval',
  baseModelId: 'loan-financial',
  
  addedAttributes: [
    {
      name: 'riskScore',
      type: 'number',
      vocabulary: ['risk score', 'calculated risk'],
      description: 'Automated risk assessment score (0-100)'
    },
    {
      name: 'approvalOverride',
      type: 'boolean',
      vocabulary: ['override', 'manual approval', 'bypass'],
      description: 'Manual approval override flag'
    }
  ],
  
  vocabularyOverrides: {
    'applicant.creditScore': ['FICO score', 'credit rating', 'creditworthiness'],
    'applicant.income': ['annual income', 'gross income', 'salary']
  },
  
  hiddenAttributes: ['loanTerm'], // Hide if not needed
  
  createdAt: new Date('2025-11-14'),
  updatedAt: new Date('2025-11-14')
};
```

### Resolved Data Model

```typescript
interface ResolvedDataModel extends DataModel {
  isExtended: boolean;
  baseModelId?: string;
  extensionId?: string;
  
  // Track source of each attribute
  attributeSources: Map<string, 'global' | 'custom'>;
  
  // Track which vocabulary is custom
  vocabularyOverrides: Map<string, string[]>;
}

// Example - resolved from base + extension
const resolvedModel: ResolvedDataModel = {
  id: 'resolved-auto-loan-approval',
  name: 'Loan Application (Extended)',
  description: 'Standard loan model with automation-specific additions',
  
  isExtended: true,
  baseModelId: 'loan-financial',
  extensionId: 'ext-001',
  
  attributes: [
    // Base attributes
    {
      name: 'applicant',
      type: 'object',
      subAttributes: [
        {
          name: 'creditScore',
          type: 'number',
          // Override vocabulary from extension
          vocabulary: ['FICO score', 'credit rating', 'creditworthiness']
        },
        {
          name: 'income',
          type: 'number',
          // Override vocabulary
          vocabulary: ['annual income', 'gross income', 'salary']
        }
      ]
    },
    // Custom attributes
    {
      name: 'riskScore',
      type: 'number',
      vocabulary: ['risk score', 'calculated risk']
    },
    {
      name: 'approvalOverride',
      type: 'boolean',
      vocabulary: ['override', 'manual approval', 'bypass']
    }
  ],
  
  attributeSources: new Map([
    ['applicant', 'global'],
    ['applicant.creditScore', 'global'],
    ['applicant.income', 'global'],
    ['riskScore', 'custom'],
    ['approvalOverride', 'custom']
  ]),
  
  vocabularyOverrides: new Map([
    ['applicant.creditScore', ['FICO score', 'credit rating', 'creditworthiness']],
    ['applicant.income', ['annual income', 'gross income', 'salary']]
  ])
};
```

### Test Data State

```typescript
interface TestDataState {
  // Variable values (for formula testing)
  variableValues: Record<string, any>;
  
  // Attribute values (for data model testing)
  attributeValues: Record<string, any>;
  
  // Vocabulary mappings (natural language → attribute path)
  vocabularyMappings: Record<string, string>;
  
  // Selected persona (for quick-fill)
  selectedPersona: string | null;
  
  // Validation errors
  validationErrors: Record<string, string>;
}

// Example
const testState: TestDataState = {
  variableValues: {
    '$threshold': 750,
    '$multiplier': 1.2
  },
  
  attributeValues: {
    'applicant.creditScore': 780,
    'applicant.income': 95000,
    'loanAmount': 350000,
    'riskScore': 68,
    'approvalOverride': false
  },
  
  vocabularyMappings: {
    'FICO score': 'applicant.creditScore',
    'annual income': 'applicant.income',
    'calculated risk': 'riskScore'
  },
  
  selectedPersona: 'excellent-applicant',
  
  validationErrors: {}
};
```

### Persona Definition

```typescript
interface Persona {
  id: string;
  name: string;
  description: string;
  
  // Pre-filled values for attributes
  attributeValues: Record<string, any>;
  
  // Applicable to which models
  applicableModels: string[];
}

// Examples
const personas: Persona[] = [
  {
    id: 'excellent-applicant',
    name: 'Excellent Applicant',
    description: 'High credit score, stable income, low debt',
    
    attributeValues: {
      'applicant.creditScore': 820,
      'applicant.income': 150000,
      'applicant.debtToIncome': 15,
      'loanAmount': 400000,
      'downPaymentPercent': 25
    },
    
    applicableModels: ['loan-financial']
  },
  
  {
    id: 'borderline-applicant',
    name: 'Borderline Applicant',
    description: 'Fair credit, moderate income, edge case for approval',
    
    attributeValues: {
      'applicant.creditScore': 680,
      'applicant.income': 55000,
      'applicant.debtToIncome': 42,
      'loanAmount': 250000,
      'downPaymentPercent': 5
    },
    
    applicableModels: ['loan-financial']
  },
  
  {
    id: 'high-risk-applicant',
    name: 'High Risk Applicant',
    description: 'Low credit, high debt, likely rejection',
    
    attributeValues: {
      'applicant.creditScore': 580,
      'applicant.income': 40000,
      'applicant.debtToIncome': 55,
      'loanAmount': 300000,
      'downPaymentPercent': 3
    },
    
    applicableModels: ['loan-financial']
  }
];
```

---

## Migration Strategy (Strangler Pattern)

### Current State
- All data models are global
- Single `useDataModel` hook returns global models only
- Test panel shows only variables (formula) or basic attributes (BAL)
- No automation-specific customization

### Migration Approach

**Phase 1: Build in Isolation**
- Create service layer with no imports from existing code
- Build hooks that don't modify existing hooks
- Create new components in separate directories
- Use feature flags for UI changes

**Phase 2: Parallel Usage**
- New components exist alongside old components
- Feature flag to enable enhanced test panel
- Old test panel still works as fallback
- No changes to existing data model usage

**Phase 3: Gradual Migration**
- Migrate one automation to use extended model
- Validate functionality
- Migrate additional automations
- Keep old code in place

**Phase 4: Cleanup**
- Remove old test panel after validation period
- Remove feature flags
- Update documentation
- Performance optimization

### Rollback Plan
- Feature flags allow instant disable
- Old components remain in codebase during validation
- Git tags before each phase
- Documented rollback procedure

### Backward Compatibility
- Existing `useDataModel` hook continues to work
- New optional parameter for automation ID
- Default behavior unchanged (returns global models)
- Existing automations default to global mode

```typescript
// Old usage (still works)
const { attributes } = useDataModel('holiday-eligibility');

// New usage (opt-in)
const { resolvedModel, isExtended } = useAutomationDataModel('auto-001');
```

---

## Success Criteria

### Functional Requirements
- ✅ Can create automation with extended data model
- ✅ Can add custom attributes to automation
- ✅ Can override vocabulary for any attribute
- ✅ Custom changes don't affect other automations
- ✅ Test panel supports variables, attributes, and vocabulary
- ✅ Mock data generation works for all types
- ✅ Personas provide quick test scenarios
- ✅ Visual indicators show attribute source (global/custom)

### Non-Functional Requirements
- ⚡ Model resolution < 50ms for typical models
- ⚡ Test panel renders < 100ms
- ⚡ No memory leaks from model caching
- 🎨 UI follows Carbon Design System patterns
- 📱 Responsive design works on all screen sizes
- ♿ Accessible (keyboard nav, screen readers)
- 📚 Complete documentation for all components

### User Experience
- 🧠 Intuitive model extension workflow
- 🔍 Clear visual distinction between base and custom
- ⚡ Fast feedback (no loading spinners for < 100ms ops)
- 🎯 Error messages are actionable
- 💡 Empty states guide users
- 🔄 Undo/redo for data model changes

---

## Risks & Mitigations

### Risk 1: Performance with Large Models
**Impact:** High  
**Likelihood:** Medium

**Mitigation:**
- Lazy load attribute lists (virtual scrolling)
- Memoize model resolution
- Cache resolved models
- Debounce vocabulary search
- Profile and optimize hot paths

### Risk 2: Complex Model Resolution Logic
**Impact:** High  
**Likelihood:** Medium

**Mitigation:**
- Comprehensive unit tests for resolution
- Test with deeply nested attributes
- Test with multiple vocabulary overrides
- Document resolution algorithm clearly
- Add debug logging for resolution steps

### Risk 3: UI Complexity
**Impact:** Medium  
**Likelihood:** High

**Mitigation:**
- Progressive disclosure (hide advanced features initially)
- Tooltips and inline help
- Guided workflows (wizards for first-time users)
- User testing before full release
- Iterate based on feedback

### Risk 4: Data Migration for Existing Automations
**Impact:** Medium  
**Likelihood:** Low

**Mitigation:**
- Default existing automations to global mode
- No changes to existing data structures
- Migration script if needed
- Clear migration guide for users
- Support both old and new formats

---

## Future Enhancements (Out of Scope for This EPIC)

### Phase 6+: Advanced Features
1. **Model Versioning**
   - Track changes to data models over time
   - Rollback to previous versions
   - Compare versions

2. **Model Sharing**
   - Share custom models between automations
   - Model library/marketplace
   - Import/export models

3. **Advanced Testing**
   - Test suites with multiple scenarios
   - Regression testing
   - Performance testing
   - Coverage reporting

4. **AI-Assisted Model Building**
   - Suggest attributes based on automation logic
   - Auto-generate vocabulary from business documents
   - Detect missing attributes

5. **Real Data Integration**
   - Connect to live data sources
   - Test with production data (privacy-safe)
   - Schema inference from databases

6. **Collaborative Editing**
   - Multiple users editing same model
   - Change tracking and attribution
   - Comments and discussions

---

## Open Questions

### Question 1: Model Visibility
**Should automations see other automations' custom models?**
- Option A: Completely isolated (no visibility)
- Option B: Read-only visibility (can reference but not modify)
- Option C: Import/clone from other automations

**Recommendation:** Option A initially, Option C in future enhancement

---

### Question 2: Vocabulary Conflict Resolution
**What happens if custom vocabulary conflicts with base vocabulary?**
- Option A: Merge (both vocabularies work)
- Option B: Replace (custom replaces base)
- Option C: Namespace (prefix custom vocabulary)

**Recommendation:** Option A (additive/merge approach)

---

### Question 3: Nested Extension
**Can an automation extend another automation's extended model?**
- Option A: No (only extend global base models)
- Option B: Yes (chains of extensions)

**Recommendation:** Option A (simpler, avoid complexity)

---

### Question 4: Test Data Persistence
**Should test data values persist across sessions?**
- Option A: No (reset on reload)
- Option B: Yes (save to localStorage)
- Option C: Optional (user choice)

**Recommendation:** Option B (save to localStorage for better UX)

---

## Dependencies

### Internal Dependencies
- Existing data model system (`/data/dataModels.ts`)
- Existing `useDataModel` hook
- BAL attribute extraction (`balAttributeUtils.ts`)
- Formula evaluation engine
- BAL evaluation engine

### External Dependencies
- Carbon Design System v11
- React 18+
- TypeScript 5+

---

## Timeline Estimate

**Total Effort:** 16-20 days (3-4 weeks)

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Service Layer | 3-4 days | None |
| Phase 2: Hook Layer | 2-3 days | Phase 1 |
| Phase 3: Data Model UI | 4-5 days | Phase 1, 2 |
| Phase 4: Enhanced Test Panel | 4-5 days | Phase 1, 2 |
| Phase 5: Integration | 3-4 days | Phase 1, 2, 3, 4 |

**Assumptions:**
- Single developer, full-time
- No major blockers
- Requirements stable
- Design approved upfront

---

## Related Documentation

- `/data/dataModels.ts` - Current data model definitions
- `/hooks/useDataModel.ts` - Current data model hook
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx` - Current test panel
- `/Guidelines.md` - Architecture patterns and conventions

---

## Appendix: Example Scenarios

### Scenario 1: Loan Approval Automation

**Base Model:** `loan-financial`
- applicant.creditScore
- applicant.income
- loanAmount
- loanTerm

**Extension for "Standard Loan Approval":**
```typescript
{
  addedAttributes: [
    { name: 'riskScore', type: 'number' },
    { name: 'approvalOverride', type: 'boolean' }
  ],
  vocabularyOverrides: {
    'applicant.creditScore': ['FICO score', 'credit rating']
  }
}
```

**Extension for "Mortgage Approval":**
```typescript
{
  addedAttributes: [
    { name: 'propertyValue', type: 'number' },
    { name: 'downPaymentPercent', type: 'number' },
    { name: 'debtToIncomeRatio', type: 'number' }
  ],
  vocabularyOverrides: {
    'applicant.income': ['household income', 'combined income']
  }
}
```

### Scenario 2: Employee Leave Request

**Base Model:** `hr-employee`
- employee.yearsOfService
- employee.remainingLeave
- requestedDays

**Extension for "Holiday Eligibility":**
```typescript
{
  addedAttributes: [
    { name: 'isEligibleForFixed', type: 'boolean' },
    { name: 'isEligibleForPersonal', type: 'boolean' },
    { name: 'totalEligibleDays', type: 'number' }
  ],
  vocabularyOverrides: {
    'employee.yearsOfService': ['tenure', 'years employed', 'service length']
  }
}
```

---

**Last Updated:** November 14, 2025  
**Version:** 1.0  
**Author:** Planning System
