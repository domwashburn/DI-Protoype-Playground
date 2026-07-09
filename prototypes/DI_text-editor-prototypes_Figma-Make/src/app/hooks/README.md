# React Hooks Documentation

This directory contains custom React hooks that provide data access and state management for the application.

## Table of Contents

1. [useDataModel](#usedatamodel) - Access data models for documents
2. [useAutomationDataModel](#useautomationdatamodel) - Automation-specific data model resolution
3. [useDataModelExtension](#usedatamodelextension) - Extension CRUD operations
4. [useTestData](#usetestdata) - Test data management
5. [useAutoSave](#useautosave) - Auto-save functionality
6. [useKeyboardShortcuts](#usekeyboardshortcuts) - Keyboard shortcuts
7. [useMentionableEntities](#usementionableentities) - @mention entities

---

## useDataModel

**Purpose:** Access data models for a specific document/example with optional automation-specific resolution.

**File:** `/hooks/useDataModel.ts`

### Basic Usage

```typescript
import { useDataModel } from './hooks/useDataModel';

function MyComponent() {
  const { dataModels, attributes, vocabulary } = useDataModel('holiday-eligibility');
  
  return (
    <div>
      <h3>Available Attributes:</h3>
      {attributes.map(attr => (
        <div key={attr.name}>{attr.name}</div>
      ))}
    </div>
  );
}
```

### Advanced Usage - Automation-Specific Resolution

```typescript
import { useDataModel } from './hooks/useDataModel';

function AutomationEditor({ automationId }) {
  const { 
    dataModels, 
    attributes, 
    vocabulary,
    isExtended,
    getAttributeSource 
  } = useDataModel('holiday-eligibility', {
    automationId // Enable automation-specific resolution
  });
  
  return (
    <div>
      {isExtended && <p>Using extended data model</p>}
      
      {attributes.map(attr => {
        const source = getAttributeSource?.(attr.name);
        return (
          <div key={attr.name}>
            {source === 'custom' ? '🔧' : '🌍'} {attr.name}
          </div>
        );
      })}
    </div>
  );
}
```

### API

```typescript
interface UseDataModelOptions {
  automationId?: string; // Enable automation-specific resolution
}

interface UseDataModelResult {
  dataModels: DataModel[];
  attributes: DataModelAttribute[];
  vocabulary: string[];
  getModelById: (id: string) => DataModel | undefined;
  usesModel: (modelId: string) => boolean;
  isExtended?: boolean; // NEW - if using extended model
  getAttributeSource?: (path: string) => 'global' | 'custom' | null; // NEW
}
```

### Backward Compatibility

✅ **Fully backward compatible** - existing code works without changes:

```typescript
// Old code still works
const { dataModels, attributes, vocabulary } = useDataModel('holiday-eligibility');

// New features are optional
const { dataModels, isExtended } = useDataModel('holiday-eligibility', {
  automationId: 'auto-001'
});
```

---

## useAutomationDataModel

**Purpose:** Primary hook for managing automation-specific data models with full CRUD operations.

**File:** `/hooks/useAutomationDataModel.ts`

### Basic Usage

```typescript
import { useAutomationDataModel } from './hooks/useAutomationDataModel';

function AutomationDataModelEditor({ automationId }) {
  const {
    resolvedModel,
    isExtended,
    addAttribute,
    addVocabulary
  } = useAutomationDataModel(automationId);
  
  if (!resolvedModel) {
    return <p>No data model configured</p>;
  }
  
  return (
    <div>
      <h3>{resolvedModel.name}</h3>
      {isExtended && <p>✅ Extended Model</p>}
      
      <button onClick={() => addAttribute({
        name: 'customField',
        type: 'string',
        vocabulary: ['custom field', 'extra data']
      })}>
        Add Custom Attribute
      </button>
    </div>
  );
}
```

### Extension Management

```typescript
function ExtensionManager({ automationId }) {
  const {
    extension,
    isExtended,
    createExtension,
    deleteExtension
  } = useAutomationDataModel(automationId);
  
  if (!isExtended) {
    return (
      <button onClick={() => createExtension('loan-financial')}>
        Extend Base Model
      </button>
    );
  }
  
  return (
    <div>
      <p>Extension ID: {extension?.id}</p>
      <button onClick={deleteExtension}>Remove Extension</button>
    </div>
  );
}
```

### Vocabulary Management (Additive)

```typescript
function VocabularyEditor({ automationId }) {
  const {
    resolvedModel,
    addVocabulary,
    getCustomVocabulary,
    resetVocabulary
  } = useAutomationDataModel(automationId);
  
  const handleAddVocabulary = () => {
    // ADDITIVE - merges with base vocabulary
    addVocabulary('applicant.creditScore', [
      'FICO score',
      'credit rating'
    ]);
  };
  
  return (
    <div>
      <button onClick={handleAddVocabulary}>
        Add Custom Vocabulary
      </button>
      
      {resolvedModel?.attributes.map(attr => {
        const customVocab = getCustomVocabulary(attr.name);
        return (
          <div key={attr.name}>
            {attr.name}:
            Base Vocab: {attr.vocabulary?.slice(0, -customVocab?.length || 0).join(', ')}
            {customVocab && (
              <>
                <br />
                Custom Vocab: {customVocab.join(', ')} 🔁
                <button onClick={() => resetVocabulary(attr.name)}>Reset</button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
```

### API

```typescript
interface UseAutomationDataModelResult {
  // Data
  resolvedModel: ResolvedDataModel | null;
  baseModel: DataModel | null;
  extension: DataModelExtension | null;
  
  // State
  isLoading: boolean;
  error: Error | null;
  
  // Queries
  isExtended: boolean;
  hasCustomAttributes: boolean;
  hasVocabularyOverrides: boolean;
  getAttributeSource: (path: string) => 'global' | 'custom' | null;
  getCustomVocabulary: (path: string) => string[] | null;
  getAllVocabulary: () => string[];
  
  // Mutations - Extension Management
  createExtension: (baseModelId: string) => void;
  deleteExtension: () => void;
  
  // Mutations - Attribute Operations
  addAttribute: (attribute: DataModelAttribute) => void;
  removeAttribute: (attributeName: string) => void;
  updateAttribute: (attributeName: string, updates: Partial<DataModelAttribute>) => void;
  
  // Mutations - Vocabulary Operations (ADDITIVE)
  addVocabulary: (attributePath: string, terms: string[]) => void;
  removeVocabulary: (attributePath: string, terms: string[]) => void;
  resetVocabulary: (attributePath: string) => void;
  
  // Mutations - Attribute Visibility
  hideAttribute: (attributePath: string) => void;
  unhideAttribute: (attributePath: string) => void;
  
  refresh: () => void;
}
```

### Vocabulary Propagation

**Critical:** Vocabulary updates automatically propagate everywhere they're used:

```typescript
function VocabularyPropagationExample({ automationId }) {
  const { addVocabulary, getAllVocabulary, refresh } = useAutomationDataModel(automationId);
  
  // Add vocabulary
  addVocabulary('applicant.income', ['annual income', 'gross income']);
  
  // Vocabulary automatically available everywhere:
  // ✅ Autocomplete suggestions
  // ✅ Syntax highlighting (BAL)
  // ✅ Test panel vocabulary inputs
  // ✅ getAllVocabulary() returns merged base + custom
  
  const allVocab = getAllVocabulary();
  // ['income', 'salary', 'annual income', 'gross income', ...]
  // Base vocab + custom vocab both work
}
```

---

## useDataModelExtension

**Purpose:** Focused hook for extension CRUD operations with validation.

**File:** `/hooks/useDataModelExtension.ts`

### Basic Usage

```typescript
import { useDataModelExtension } from './hooks/useDataModelExtension';

function ExtensionEditor({ extensionId }) {
  const {
    extension,
    validation,
    isValid,
    update,
    addAttributeWithValidation
  } = useDataModelExtension(extensionId);
  
  if (!extension) {
    return <p>Extension not found</p>;
  }
  
  return (
    <div>
      <h3>Extension: {extension.id}</h3>
      
      {!isValid && (
        <div className="errors">
          {validation?.errors.map(err => (
            <p key={err}>{err}</p>
          ))}
        </div>
      )}
      
      <button onClick={() => addAttributeWithValidation({
        name: 'newField',
        type: 'string',
        vocabulary: []
      })}>
        Add Attribute (Validated)
      </button>
    </div>
  );
}
```

### Validation

```typescript
function ValidatedExtensionForm() {
  const { validateAttribute, addAttributeWithValidation } = useDataModelExtension(extId);
  
  const handleSubmit = (attribute: DataModelAttribute) => {
    // Validate before adding
    const validation = validateAttribute(attribute);
    
    if (!validation.isValid) {
      console.error('Validation errors:', validation.errors);
      return;
    }
    
    // Add with automatic validation
    const success = addAttributeWithValidation(attribute);
    if (success) {
      console.log('Attribute added successfully');
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### API

```typescript
interface UseDataModelExtensionResult {
  // Data
  extension: DataModelExtension | null;
  validation: ValidationResult | null;
  
  // State
  isLoading: boolean;
  error: Error | null;
  isValid: boolean;
  
  // Operations
  update: (updates: Partial<DataModelExtension>) => void;
  validate: () => ValidationResult;
  validateAttribute: (attribute: DataModelAttribute) => ValidationResult;
  addAttributeWithValidation: (attribute: DataModelAttribute) => boolean;
  refresh: () => void;
}
```

---

## useTestData

**Purpose:** Manage test values for variables and attributes in formula/BAL testing.

**File:** `/hooks/useTestData.ts`

### Basic Usage

```typescript
import { useTestData } from './hooks/useTestData';

function FormulaTestPanel({ variables, attributes }) {
  const {
    variableValues,
    attributeValues,
    setVariableValue,
    setAttributeValue,
    generateMockValues,
    isValid
  } = useTestData({
    variables,
    attributes,
    mode: 'formula'
  });
  
  return (
    <div>
      <button onClick={generateMockValues}>
        Generate Mock Data
      </button>
      
      {variables.map(variable => (
        <div key={variable.name}>
          <label>{variable.name}</label>
          <input
            value={variableValues[variable.name] || ''}
            onChange={(e) => setVariableValue(variable.name, e.target.value)}
          />
        </div>
      ))}
      
      {!isValid && <p className="error">Some values are invalid</p>}
    </div>
  );
}
```

### Persona-Based Quick-Fill

```typescript
function TestPanelWithPersonas() {
  const {
    attributeValues,
    populateFromPersona,
    availablePersonas,
    clearAllValues
  } = useTestData({
    attributes: dataModel.attributes,
    mode: 'bal',
    personas: [
      {
        id: 'standard-applicant',
        name: 'Standard Applicant',
        description: 'Average credit, moderate income',
        values: {
          'applicant.creditScore': 720,
          'applicant.income': 75000,
          'loanAmount': 250000
        }
      },
      {
        id: 'high-risk',
        name: 'High Risk Applicant',
        description: 'Low credit, high debt',
        values: {
          'applicant.creditScore': 580,
          'applicant.income': 35000,
          'loanAmount': 400000
        }
      }
    ]
  });
  
  return (
    <div>
      <select onChange={(e) => populateFromPersona(e.target.value)}>
        <option value="">Select Persona...</option>
        {availablePersonas.map(persona => (
          <option key={persona.id} value={persona.id}>
            {persona.name}
          </option>
        ))}
      </select>
      
      <button onClick={clearAllValues}>Clear All</button>
      
      {/* Display current values */}
      <pre>{JSON.stringify(attributeValues, null, 2)}</pre>
    </div>
  );
}
```

### Validation

```typescript
function ValidatedTestPanel() {
  const {
    setAttributeValue,
    validateAll,
    isValid
  } = useTestData({ attributes, mode: 'bal' });
  
  const handleRunTest = () => {
    const validation = validateAll();
    
    if (!validation.isValid) {
      console.error('Validation errors:', validation.errors);
      return;
    }
    
    // Run test with validated values
    runTest(attributeValues);
  };
  
  return (
    <button onClick={handleRunTest} disabled={!isValid}>
      Run Test
    </button>
  );
}
```

### API

```typescript
interface TestDataConfig {
  variables?: Variable[];
  attributes?: DataModelAttribute[];
  mode: 'formula' | 'bal';
  personas?: Persona[];
}

interface UseTestDataResult {
  // Test Values
  variableValues: Record<string, any>;
  attributeValues: Record<string, any>;
  vocabularyMappings: Record<string, string>;
  
  // Setters
  setVariableValue: (name: string, value: any) => void;
  setAttributeValue: (path: string, value: any) => void;
  setVocabularyMapping: (term: string, attributePath: string) => void;
  
  // Batch Operations
  populateFromPersona: (personaId: string) => void;
  clearAllValues: () => void;
  resetToDefaults: () => void;
  generateMockValues: () => void;
  
  // Validation
  validateAll: () => TestValueValidation;
  isValid: boolean;
  availablePersonas: Persona[];
}
```

---

## Hook Patterns

### Smart vs Dumb Components

**Pattern:** Hooks are for Smart components (data access), not Dumb components (presentational).

```typescript
// ✅ GOOD - Smart component uses hooks
function AutomationPage({ automationId }) {
  const { resolvedModel, addAttribute } = useAutomationDataModel(automationId);
  
  return (
    <DataModelEditor 
      model={resolvedModel}
      onAddAttribute={addAttribute}
    />
  );
}

// ✅ GOOD - Dumb component receives props
function DataModelEditor({ model, onAddAttribute }) {
  return <div>...</div>;
}

// ❌ BAD - Dumb component uses hooks
function DataModelEditor({ automationId }) {
  const { resolvedModel } = useAutomationDataModel(automationId);
  return <div>...</div>;
}
```

### Memoization

All hooks use `useMemo` and `useCallback` for optimal performance:

```typescript
// All data is memoized
const resolvedModel = useMemo(() => {
  // Only recomputes when dependencies change
}, [automationId, extension, refreshKey]);

// All callbacks are stable
const addVocabulary = useCallback((path, terms) => {
  // Function reference stays the same
}, [extension]);
```

### Error Handling

All hooks provide error state:

```typescript
function MyComponent() {
  const { resolvedModel, error } = useAutomationDataModel(automationId);
  
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  
  return <div>...</div>;
}
```

---

## Migration Guide

### Existing Code Using useDataModel

**No changes required!** Existing code continues to work:

```typescript
// Before Phase 2
const { attributes, vocabulary } = useDataModel('holiday-eligibility');

// After Phase 2 - STILL WORKS
const { attributes, vocabulary } = useDataModel('holiday-eligibility');
```

### Adding Automation-Specific Resolution

**Opt-in enhancement:**

```typescript
// Enable automation resolution by adding automationId
const { 
  attributes, 
  vocabulary,
  isExtended,
  getAttributeSource 
} = useDataModel('holiday-eligibility', {
  automationId: 'auto-holiday-001' // NEW - optional
});

// Now attributes include custom attributes
// Now vocabulary includes custom vocabulary (additive)
// New properties available: isExtended, getAttributeSource
```

---

## Examples

### Complete Automation Editor

```typescript
function AutomationEditor({ automationId }) {
  const {
    resolvedModel,
    isExtended,
    hasCustomAttributes,
    createExtension,
    addAttribute,
    addVocabulary,
    getAttributeSource,
    error
  } = useAutomationDataModel(automationId);
  
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  
  if (!isExtended) {
    return (
      <div>
        <p>This automation uses a global data model.</p>
        <button onClick={() => createExtension('loan-financial')}>
          Customize Data Model
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <h2>{resolvedModel?.name}</h2>
      
      <section>
        <h3>Attributes</h3>
        {resolvedModel?.attributes.map(attr => {
          const source = getAttributeSource(attr.name);
          return (
            <div key={attr.name}>
              {source === 'custom' ? '🔧' : '🌍'} {attr.name}
              <br />
              Vocabulary: {attr.vocabulary?.join(', ')}
            </div>
          );
        })}
      </section>
      
      <button onClick={() => addAttribute({
        name: 'customScore',
        type: 'number',
        vocabulary: ['custom score', 'calculated value']
      })}>
        Add Custom Attribute
      </button>
      
      <button onClick={() => addVocabulary('applicant.income', [
        'annual income',
        'yearly salary'
      ])}>
        Add Vocabulary Terms
      </button>
    </div>
  );
}
```

---

## Related Documentation

- Service Layer: `/services/README.md`
- EPIC Plan: `/planning/epics/EPIC-DataModelHierarchyAndTestingEnhancements.md`
- Phase 1 (Service Layer): `/change-log/25-11-14_v01-DataModelServiceLayer.md`
- Phase 2 (Hook Layer): `/change-log/25-11-14_v02-DataModelHookLayer.md` (this phase)

---

**Last Updated:** November 14, 2025  
**Phase:** Phase 2 - Hook Layer Complete
