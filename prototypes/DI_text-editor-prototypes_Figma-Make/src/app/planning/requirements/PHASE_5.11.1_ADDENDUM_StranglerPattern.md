# Phase 5.11.1 ADDENDUM: Strangler Pattern & Custom Hooks

**Parent Document:** PHASE_5.11.1_VocabularyDataModel.md  
**Purpose:** Clarify refactoring patterns and integration strategy

---

## Strangler Pattern: Complete Isolation

**CRITICAL:** This phase follows the **Strangler Pattern** strictly per Guidelines.md:

### Core Principles

✅ **Build in COMPLETE ISOLATION** - No touching existing code  
✅ **New architecture in `/services/vocabulary/`** - Separate from editors  
✅ **Zero integration until Phase 5.11.3+** - Validate foundation first  
✅ **Existing editors remain UNTOUCHED** - BAL, Formula stay as-is  
✅ **Migration boundary is strict** - No imports crossing until ready

### What This Means

**DO in Phase 5.11.1:**
- ✅ Create `/services/vocabulary/` directory structure
- ✅ Implement all types, repository, storage
- ✅ Create custom hooks (see below)
- ✅ Write comprehensive tests
- ✅ Create sample BOM JSON files
- ✅ Migrate vocabularyMappings to new format (JSON only, no code changes)
- ✅ Document everything

**DON'T in Phase 5.11.1:**
- ❌ Import vocabulary code into existing editors
- ❌ Modify BAL Editor
- ❌ Modify Formula Editor
- ❌ Change evaluation engine
- ❌ Update parsers
- ❌ Touch any existing tokenizer
- ❌ Modify any existing autocomplete

### Validation Before Integration

Phase 5.11.1 complete when:
1. All code builds and tests pass
2. Repository can be instantiated
3. Term resolution works (unit tested)
4. Sample BOMs load successfully
5. **Zero changes to existing editors**

Then and ONLY then → Phase 5.11.2 (UI) or Phase 5.11.3 (Parser Integration)

---

## Custom Hooks Layer

**Pattern:** Following Guidelines.md "Custom Hooks for Data Layer" pattern.

### Why Custom Hooks?

Per Guidelines:
- Components don't import data/services directly
- Custom hooks abstract data access
- Easy to swap implementations
- Enables composition

### Hook Architecture

```
┌───────────────────────────────────────────────────────┐
│           React Components (Future Phases)            │
│                                                        │
│  • BAL Editor (Phase 5.11.4)                          │
│  • Formula Editor (Phase 5.11.5)                      │
│  • Vocabulary Manager UI (Phase 5.11.2)               │
│  • Autocomplete Components (Phase 5.11.3)             │
└───────────────────────────────────────────────────────┘
                        ↕
         ┌──────────────────────────────┐
         │    Custom Hooks (Phase 5.11.1)    │
         └──────────────────────────────┘
                        ↕
         ┌──────────────────────────────┐
         │  VocabularyRepository        │
         │  (Singleton Service)          │
         └──────────────────────────────┘
```

---

## Custom Hook Implementations

### File: `/services/vocabulary/hooks/useVocabulary.ts`

```typescript
/**
 * useVocabulary
 * 
 * Primary hook for accessing vocabulary repository.
 * Provides access to all BOMs and repository methods.
 * 
 * @example
 * const { boms, getBOM, addBOM } = useVocabulary();
 */
export function useVocabulary() {
  const repo = VocabularyRepository.getInstance();
  
  const [boms, setBOMs] = useState<BusinessObjectModel[]>([]);
  
  useEffect(() => {
    // Load BOMs on mount
    setBOMs(repo.getAllBOMs());
  }, []);
  
  const getBOM = useCallback((id: string) => {
    return repo.getBOM(id);
  }, [repo]);
  
  const addBOM = useCallback((bom: BusinessObjectModel) => {
    repo.addBOM(bom);
    setBOMs(repo.getAllBOMs());
  }, [repo]);
  
  const updateBOM = useCallback((id: string, updates: Partial<BusinessObjectModel>) => {
    repo.updateBOM(id, updates);
    setBOMs(repo.getAllBOMs());
  }, [repo]);
  
  const deleteBOM = useCallback((id: string) => {
    repo.deleteBOM(id);
    setBOMs(repo.getAllBOMs());
  }, [repo]);
  
  return {
    boms,
    getBOM,
    addBOM,
    updateBOM,
    deleteBOM,
    repository: repo // Advanced usage
  };
}
```

---

### File: `/services/vocabulary/hooks/useVocabularyTerm.ts`

```typescript
/**
 * useVocabularyTerm
 * 
 * Hook for resolving natural language terms to vocabulary attributes.
 * Optimized for autocomplete and real-time validation.
 * 
 * @param term - Natural language term to resolve
 * @returns Resolved term information or null
 * 
 * @example
 * const { resolution, isValid, attribute } = useVocabularyTerm('the credit score');
 */
export function useVocabularyTerm(term: string) {
  const repo = VocabularyRepository.getInstance();
  
  const [resolution, setResolution] = useState<TermResolution | null>(null);
  
  useEffect(() => {
    if (!term) {
      setResolution(null);
      return;
    }
    
    const result = repo.resolveTerm(term);
    setResolution(result);
  }, [term, repo]);
  
  return {
    resolution,
    isValid: resolution !== null,
    attribute: resolution?.attribute,
    attributePath: resolution?.attributePath,
    matchType: resolution?.matchType,
    bomId: resolution?.bomId
  };
}
```

---

### File: `/services/vocabulary/hooks/useVocabularySearch.ts`

```typescript
/**
 * useVocabularySearch
 * 
 * Hook for searching vocabulary attributes.
 * Debounced for performance with autocomplete.
 * 
 * @param query - Search query
 * @param options - Search options (types, tags, scope)
 * @returns Search results with relevance scores
 * 
 * @example
 * const { results, isSearching } = useVocabularySearch('credit', {
 *   types: ['number'],
 *   maxResults: 10
 * });
 */
export function useVocabularySearch(
  query: string,
  options?: SearchOptions
) {
  const repo = VocabularyRepository.getInstance();
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Debounce search for performance
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }
    
    setIsSearching(true);
    
    const timeoutId = setTimeout(() => {
      const searchResults = repo.search(query, options);
      setResults(searchResults);
      setIsSearching(false);
    }, 150); // 150ms debounce
    
    return () => clearTimeout(timeoutId);
  }, [query, options, repo]);
  
  return {
    results,
    isSearching,
    hasResults: results.length > 0
  };
}
```

---

### File: `/services/vocabulary/hooks/useVocabularyValidation.ts`

```typescript
/**
 * useVocabularyValidation
 * 
 * Hook for validating values against vocabulary attribute constraints.
 * 
 * @param attributePath - Path to attribute
 * @param value - Value to validate
 * @param bomId - Optional BOM ID for scoping
 * @returns Validation result
 * 
 * @example
 * const { isValid, errors, warnings } = useVocabularyValidation(
 *   'applicant.creditScore',
 *   750
 * );
 */
export function useVocabularyValidation(
  attributePath: string,
  value: any,
  bomId?: string
) {
  const repo = VocabularyRepository.getInstance();
  
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    valid: true
  });
  
  useEffect(() => {
    if (!attributePath) {
      setValidationResult({ valid: true });
      return;
    }
    
    const result = repo.validate(attributePath, value, bomId);
    setValidationResult(result);
  }, [attributePath, value, bomId, repo]);
  
  return {
    isValid: validationResult.valid,
    errors: validationResult.errors || [],
    warnings: validationResult.warnings || [],
    validationResult
  };
}
```

---

### File: `/services/vocabulary/hooks/useVocabularyAttribute.ts`

```typescript
/**
 * useVocabularyAttribute
 * 
 * Hook for accessing a specific vocabulary attribute by path.
 * 
 * @param bomId - BOM identifier
 * @param attributePath - Dot-notation path to attribute
 * @returns Attribute or null
 * 
 * @example
 * const { attribute, exists } = useVocabularyAttribute(
 *   'loan-application',
 *   'applicant.creditScore'
 * );
 */
export function useVocabularyAttribute(
  bomId: string,
  attributePath: string
) {
  const repo = VocabularyRepository.getInstance();
  
  const [attribute, setAttribute] = useState<VocabularyAttribute | null>(null);
  
  useEffect(() => {
    const bom = repo.getBOM(bomId);
    if (!bom) {
      setAttribute(null);
      return;
    }
    
    // Use repository's internal findAttribute method (make it public)
    const attr = findAttributeInBOM(bom, attributePath);
    setAttribute(attr);
  }, [bomId, attributePath, repo]);
  
  return {
    attribute,
    exists: attribute !== null
  };
}

// Helper function
function findAttributeInBOM(
  bom: BusinessObjectModel,
  path: string
): VocabularyAttribute | null {
  const parts = path.split('.');
  let current: VocabularyAttribute | undefined;
  let attributes = bom.attributes;
  
  for (const part of parts) {
    current = attributes.find(a => a.jsonName === part);
    if (!current) return null;
    if (current.attributes) {
      attributes = current.attributes;
    }
  }
  
  return current || null;
}
```

---

## File Structure Update

Add hooks to vocabulary service:

```
/services/vocabulary/
├── README.md
├── index.ts
│
├── types/
│   ├── VocabularyAttribute.ts
│   ├── BusinessObjectModel.ts
│   ├── VerbalizationPatterns.ts
│   ├── ValidationRules.ts
│   └── index.ts
│
├── hooks/                           # ← NEW: Custom Hooks
│   ├── useVocabulary.ts            # BOM management
│   ├── useVocabularyTerm.ts        # Term resolution
│   ├── useVocabularySearch.ts      # Search with debounce
│   ├── useVocabularyValidation.ts  # Value validation
│   ├── useVocabularyAttribute.ts   # Attribute access
│   └── index.ts                    # Hook exports
│
├── VocabularyRepository.ts
├── VocabularyStorage.ts
├── VocabularyValidator.ts
├── VocabularyMigration.ts
│
└── __tests__/
    ├── VocabularyRepository.test.ts
    ├── VocabularyStorage.test.ts
    ├── VocabularyValidator.test.ts
    ├── hooks/                       # ← NEW: Hook tests
    │   ├── useVocabulary.test.ts
    │   ├── useVocabularyTerm.test.ts
    │   └── useVocabularySearch.test.ts
    └── integration.test.ts
```

---

## Integration Strategy (Future Phases)

### Phase 5.11.2: Vocabulary Manager UI

**Pattern:** Smart/Dumb components per Guidelines

```typescript
// Smart component - uses hooks
function VocabularyManagerPage() {
  const { boms, addBOM, updateBOM } = useVocabulary();
  
  return (
    <VocabularyManager
      boms={boms}
      onAddBOM={addBOM}
      onUpdateBOM={updateBOM}
    />
  );
}

// Dumb component - receives data via props
function VocabularyManager({ boms, onAddBOM, onUpdateBOM }) {
  // Pure presentation logic
}
```

---

### Phase 5.11.3: Parser Integration

**Pattern:** Add NEW parser, don't touch existing

```typescript
// NEW file: /services/balParser/vocabularyResolver.ts
import { useVocabularyTerm } from '../vocabulary/hooks';

export function resolveNaturalLanguageTerm(term: string) {
  const { resolution } = useVocabularyTerm(term);
  return resolution;
}

// OLD file: /services/balParser/balParser.ts
// ← UNCHANGED, no imports from vocabulary
```

---

### Phase 5.11.4: BAL Evaluation

**Pattern:** Feature flag for gradual enablement

```typescript
// New evaluation mode with vocabulary
const USE_VOCABULARY_EVALUATION = false; // Feature flag

if (USE_VOCABULARY_EVALUATION) {
  // Use vocabulary-based evaluation
  const { resolution } = useVocabularyTerm(term);
  // ...
} else {
  // Use existing vocabularyMappings
  // ...
}
```

---

### Phase 5.11.5: Formula Variable Integration

**Pattern:** Optional vocabulary link, backwards compatible

```typescript
interface FormulaVariable {
  name: string;
  type: string;
  vocabulary?: {
    bomId: string;
    attributePath: string;
  };
}

// Variables work with or without vocabulary
```

---

## Migration from Old Format

**Pattern:** Migrate data, not code

### Current State (balSamples.ts)

```typescript
export const vocabularyMappings: VocabularyMapping[] = [
  {
    term: 'credit score',
    attributePath: 'applicant.creditScore',
    type: 'number'
  }
];
```

### Migration Process

1. **Create BOM JSON** (one-time, Phase 5.11.1):
```bash
npm run migrate:vocabulary
# Creates /data/vocabulary/loan-application.bom.json
```

2. **Keep old format working** (Phase 5.11.1-5.11.3):
```typescript
// balSamples.ts - UNCHANGED, still works
export const vocabularyMappings = [...]; 
```

3. **Feature flag switch** (Phase 5.11.4):
```typescript
const USE_VOCABULARY_REPOSITORY = false;

const vocabulary = USE_VOCABULARY_REPOSITORY
  ? useVocabulary() // New system
  : vocabularyMappings; // Old system
```

4. **Deprecate old format** (Phase 5.11.6+):
```typescript
// Only after new system proven stable
```

---

## Testing Strategy for Hooks

### Hook Testing with @testing-library/react-hooks

```typescript
// useVocabulary.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useVocabulary } from './useVocabulary';

describe('useVocabulary', () => {
  it('should load BOMs on mount', () => {
    const { result } = renderHook(() => useVocabulary());
    
    expect(result.current.boms).toBeDefined();
    expect(Array.isArray(result.current.boms)).toBe(true);
  });
  
  it('should add BOM', () => {
    const { result } = renderHook(() => useVocabulary());
    
    act(() => {
      result.current.addBOM(mockBOM);
    });
    
    expect(result.current.boms).toContainEqual(mockBOM);
  });
});
```

---

## Success Criteria (Updated)

Phase 5.11.1 complete when:

✅ **Types Complete**
- [ ] All interfaces defined with JSDoc
- [ ] List support with listActions
- [ ] Full TypeScript coverage

✅ **Repository Complete**
- [ ] Singleton pattern implemented
- [ ] CRUD operations working
- [ ] Term resolution with variants
- [ ] Search functionality
- [ ] Validation integration

✅ **Custom Hooks Complete**
- [ ] useVocabulary() implemented
- [ ] useVocabularyTerm() implemented
- [ ] useVocabularySearch() with debounce
- [ ] useVocabularyValidation() implemented
- [ ] useVocabularyAttribute() implemented
- [ ] All hooks tested

✅ **Storage Complete**
- [ ] JSON persistence working
- [ ] Sample BOMs created
- [ ] Import/export utilities

✅ **Migration Complete**
- [ ] vocabularyMappings → BOM JSON
- [ ] Old format still works (untouched)
- [ ] Migration script documented

✅ **Testing Complete**
- [ ] 90%+ code coverage
- [ ] All unit tests passing
- [ ] Hook tests passing
- [ ] Integration tests passing

✅ **Isolation Verified**
- [ ] Zero imports in existing editors
- [ ] No changes to BAL Editor files
- [ ] No changes to Formula Editor files
- [ ] No changes to evaluation engine
- [ ] Clean git diff shows only new files

---

## Checklist: Strangler Pattern Compliance

Before marking Phase 5.11.1 complete:

- [ ] **Isolation:** All new code in `/services/vocabulary/`
- [ ] **No Touching:** Zero changes to existing editor files
- [ ] **Testing:** Can instantiate repository and hooks
- [ ] **Documentation:** README with usage examples
- [ ] **Migration:** Sample BOMs load successfully
- [ ] **Validation:** All tests pass
- [ ] **Git Diff:** Only shows new files, no modifications

---

## References

- `/guidelines/Guidelines.md` - Strangler Pattern section
- `/guidelines/Guidelines.md` - Custom Hooks for Data Layer
- `/guidelines/Guidelines.md` - Smart vs Dumb Components
- Parent: `PHASE_5.11.1_VocabularyDataModel.md`

---

**This addendum ensures Phase 5.11.1 follows all refactoring patterns from Guidelines.md.**
