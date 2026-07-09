# Vocabulary Service

**Status:** Phase 5.11.1 - Complete Foundation  
**Pattern:** Strangler Pattern - Complete Isolation  
**Integration:** Phase 5.11.3+ (Parser, BAL, Formula)

---

## Overview

The Vocabulary Service provides a comprehensive system for managing business-friendly natural language terms backed by structured data models. It follows IBM ADS/ODM patterns for vocabulary verbalization including:

- Singular/plural forms with articles
- Expression patterns for data access
- Action patterns for data modification
- List-specific operations (add, remove, clear)
- Validation rules and constraints
- Type information and documentation

## Architecture

```
React Components (Future)
         ↓
   Custom Hooks (useVocabulary, useVocabularyTerm, etc.)
         ↓
   VocabularyRepository (Singleton Service)
         ↓
   VocabularyStorage (Persistence Layer)
```

## Quick Start

### Initialize Repository

```typescript
import { VocabularyRepository } from './services/vocabulary';

const repo = VocabularyRepository.getInstance();
await repo.initialize(); // Load BOMs from storage
```

### Using React Hooks

```typescript
import { useVocabulary, useVocabularyTerm } from './services/vocabulary';

function MyComponent() {
  const { boms, isLoading } = useVocabulary();
  const { resolution, isValid } = useVocabularyTerm('the credit score');
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>Vocabulary</h1>
      <p>BOMs: {boms.length}</p>
      <p>Term valid: {isValid ? 'Yes' : 'No'}</p>
      {resolution && (
        <p>Resolved to: {resolution.attributePath}</p>
      )}
    </div>
  );
}
```

## Core Concepts

### Business Object Model (BOM)

A BOM is a container for related vocabulary attributes representing a business domain:

```typescript
{
  id: 'loan-application',
  name: 'Loan Application',
  description: 'Data model for loan processing',
  attributes: [
    // VocabularyAttribute[]
  ]
}
```

### Vocabulary Attribute

Defines a single attribute with full verbalization support:

```typescript
{
  jsonName: 'creditScore',
  type: 'number',
  isList: false,
  
  singular: {
    definite: 'the credit score',
    indefinite: 'a credit score',
    variants: ['the FICO score']
  },
  
  plural: {
    definite: 'the credit scores',
    bare: 'credit scores'
  },
  
  expressions: {
    template: '{credit score} of {this}',
    examples: ['the credit score of the applicant']
  },
  
  actions: {
    template: 'set the credit score of {this} to {value}',
    examples: ['set the credit score of the applicant to 750']
  },
  
  validation: {
    min: 300,
    max: 850,
    required: true
  }
}
```

### List Attributes

List attributes have additional action patterns:

```typescript
{
  jsonName: 'employers',
  type: 'string',
  isList: true,
  elementType: 'string',
  
  listActions: {
    add: {
      template: 'add {0} to the employers of {this}',
      examples: ['add "Acme Corp" to the employers of the applicant']
    },
    remove: {
      template: 'remove {0} from the employers of {this}',
      examples: ['remove "Acme Corp" from the employers of the applicant']
    },
    clear: {
      template: 'clear the employers of {this}',
      examples: ['clear the employers of the applicant']
    }
  }
}
```

## API Reference

### VocabularyRepository

**Singleton service for vocabulary management.**

#### Term Resolution

```typescript
// Resolve a natural language term
const resolution = repo.resolveTerm('the credit score');
// → { attribute, attributePath: 'applicant.creditScore', matchType, bomId }

// Check if term exists
const exists = repo.hasTerm('the credit score'); // boolean

// Resolve with variants
const resolutions = repo.resolveTermVariants('credit'); // TermResolution[]
```

#### BOM Management

```typescript
// Get all BOMs
const boms = repo.getAllBOMs(); // BusinessObjectModel[]

// Get specific BOM
const bom = repo.getBOM('loan-application'); // BusinessObjectModel | null

// Add BOM
repo.addBOM(newBOM);

// Update BOM
repo.updateBOM('loan-application', { name: 'Updated Name' });

// Delete BOM
repo.deleteBOM('loan-application');
```

#### Search & Filtering

```typescript
// Search vocabulary
const results = repo.search('credit', {
  types: ['number'],
  maxResults: 10,
  scope: 'global'
});

// Get attributes by type
const numberAttrs = repo.getAttributesByType('number');

// Get attributes by tag
const financialAttrs = repo.getAttributesByTag('financial');
```

#### Validation

```typescript
// Validate a value
const result = repo.validate('applicant.creditScore', 750);
// → { valid: true }

const invalid = repo.validate('applicant.creditScore', 900);
// → { valid: false, errors: ['Value 900 exceeds maximum 850'] }
```

#### Import/Export

```typescript
// Export BOM to JSON
const json = repo.exportToJSON('loan-application');

// Import BOM from JSON
const bom = repo.importFromJSON(jsonString);

// Export all BOMs
const allJSON = repo.exportAll();
```

### Custom Hooks

#### useVocabulary()

**Access repository with React state management.**

```typescript
const {
  boms,          // BusinessObjectModel[]
  isLoading,     // boolean
  getBOM,        // (id: string) => BusinessObjectModel | null
  addBOM,        // (bom: BusinessObjectModel) => void
  updateBOM,     // (id: string, updates: Partial<BusinessObjectModel>) => void
  deleteBOM,     // (id: string) => void
  repository     // VocabularyRepository (advanced)
} = useVocabulary();
```

#### useVocabularyTerm(term: string)

**Resolve natural language terms with React.**

```typescript
const {
  resolution,     // TermResolution | null
  isValid,        // boolean
  attribute,      // VocabularyAttribute | undefined
  attributePath,  // string | undefined
  matchType,      // MatchType | undefined
  bomId           // string | undefined
} = useVocabularyTerm('the credit score');
```

#### useVocabularySearch(query: string, options?: SearchOptions)

**Search vocabulary with debouncing.**

```typescript
const {
  results,       // SearchResult[]
  isSearching,   // boolean
  hasResults     // boolean
} = useVocabularySearch('credit', {
  types: ['number'],
  maxResults: 10
});
```

#### useVocabularyValidation(attributePath, value, bomId?)

**Validate values with React.**

```typescript
const {
  isValid,          // boolean
  errors,           // string[]
  warnings,         // string[]
  validationResult  // ValidationResult
} = useVocabularyValidation('applicant.creditScore', 750);
```

#### useVocabularyAttribute(bomId, attributePath)

**Access specific attribute with React.**

```typescript
const {
  attribute,  // VocabularyAttribute | null
  exists      // boolean
} = useVocabularyAttribute('loan-application', 'applicant.creditScore');
```

## Sample Data

Sample BOM files are located in `/data/vocabulary/`:

- `loan-application.bom.json` - Loan application data model with credit attributes

To load sample data:

```typescript
// Import sample BOM
import loanBOM from './data/vocabulary/loan-application.bom.json';

const repo = VocabularyRepository.getInstance();
repo.addBOM(loanBOM);
```

## Validation Rules

Vocabulary attributes support comprehensive validation:

### Number Constraints

```typescript
validation: {
  min: 300,              // Minimum value (inclusive)
  max: 850,              // Maximum value (inclusive)
  exclusiveMin: 0,       // Exclusive minimum
  exclusiveMax: 1,       // Exclusive maximum
  multipleOf: 0.01       // Must be multiple of
}
```

### String Constraints

```typescript
validation: {
  minLength: 5,          // Minimum string length
  maxLength: 50,         // Maximum string length
  pattern: '^[A-Z]+$',   // Regex pattern
  format: 'email'        // Format hint
}
```

### Enum Constraints

```typescript
validation: {
  enumValues: ['pending', 'approved', 'rejected'],
  enumLabels: {
    'pending': 'Pending Review',
    'approved': 'Approved',
    'rejected': 'Rejected'
  }
}
```

### List Constraints

```typescript
validation: {
  minItems: 1,           // Minimum array length
  maxItems: 10,          // Maximum array length
  uniqueItems: true      // All items must be unique
}
```

## Strangler Pattern Compliance

**✅ Phase 5.11.1: Complete Isolation**

This vocabulary service is built in **complete isolation** following the Strangler Pattern:

- ❌ **NO imports** in existing editors
- ❌ **NO changes** to BAL Editor
- ❌ **NO changes** to Formula Editor
- ❌ **NO changes** to evaluation engine
- ✅ **All new code** in `/services/vocabulary/`
- ✅ **Complete independence** - can be tested standalone

### Integration Roadmap

**Phase 5.11.2:** Vocabulary Manager UI  
- Visual editor for BOMs
- Create/edit attributes
- Import/export interface

**Phase 5.11.3:** Parser Integration  
- Add NEW linguistic resolution
- Don't touch existing parsers
- Feature flags for gradual enablement

**Phase 5.11.4:** BAL Evaluation  
- Connect BAL evaluation to vocabulary
- Feature flag to enable/disable
- Keep old vocabularyMappings working

**Phase 5.11.5:** Formula Variable Integration  
- Optional vocabulary links for variables
- Enhanced autocomplete
- Backward compatible

## Testing

All services include comprehensive tests:

```bash
# Run vocabulary tests
npm test -- services/vocabulary

# Run specific test file
npm test -- VocabularyRepository.test.ts

# Run with coverage
npm test -- --coverage services/vocabulary
```

## Performance

- **Term resolution:** O(1) via Map index (< 1ms)
- **Search:** O(n) with relevance scoring (< 50ms for 1000 attributes)
- **Index rebuild:** O(n) on BOM add/update (< 10ms for 100 attributes)

## Type Safety

All types are fully documented with JSDoc:

```typescript
import {
  VocabularyAttribute,
  BusinessObjectModel,
  TermResolution,
  ValidationResult
} from './services/vocabulary';
```

## Migration from Old Format

Existing `vocabularyMappings` in `balSamples.ts` remain UNTOUCHED in Phase 5.11.1.

Migration will occur in Phase 5.11.4 with feature flags:

```typescript
const USE_VOCABULARY_REPOSITORY = false; // Feature flag

const vocabulary = USE_VOCABULARY_REPOSITORY
  ? useVocabulary()
  : vocabularyMappings; // Old system still works
```

## Contributing

When adding new vocabulary:

1. Follow the `VocabularyAttribute` interface
2. Include all verbalization forms (singular, plural, variants)
3. Provide expression and action templates
4. Add validation rules where appropriate
5. Include examples for documentation
6. Test term resolution and validation

## References

- IBM ADS Documentation: https://www.ibm.com/docs/en/decision-intelligence
- Planning Document: `/planning/requirements/PHASE_5.11.1_VocabularyDataModel.md`
- Addendum: `/planning/requirements/PHASE_5.11.1_ADDENDUM_StranglerPattern.md`
- Guidelines: `/guidelines/Guidelines.md` (Strangler Pattern section)

---

**Phase 5.11.1 Status:** ✅ Foundation Complete - Ready for Integration (Phase 5.11.3+)
