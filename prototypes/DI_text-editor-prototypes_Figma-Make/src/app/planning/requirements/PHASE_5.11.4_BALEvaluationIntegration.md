# Phase 5.11.4: BAL Evaluation Integration

**Status:** ✅ IN PROGRESS  
**Phase:** 5.11.4  
**Pattern:** Strangler - Feature Flag Enablement

---

## Overview

Enable vocabulary system in BAL Editor with proper syntax highlighting, evaluation integration, and test panel support. Build on Phase 5.11.3's parser integration layer.

---

## Objectives

1. **Syntax Highlighting:** Vocabulary terms highlighted distinctly in BAL Editor
2. **Parser Integration:** BAL parser resolves vocabulary terms during evaluation
3. **Autocomplete:** Vocabulary-aware autocomplete suggestions
4. **Test Panel:** Support vocabulary terms in test values
5. **Feature Flag:** Per-editor feature flag system
6. **Backward Compatibility:** Existing verbalization system continues to work

---

## Components

### 1. Enhanced Syntax Highlighting ✅ COMPLETE

**File:** `/components/editors/code/shared/hooks/useVocabularySyntax.ts`

**Features:**
- Extends formula syntax highlighting with vocabulary term recognition
- Highest priority matching (priority: 12) to match before other patterns
- Distinct CSS styling for vocabulary terms
- Falls back to standard highlighting when vocabulary disabled

**CSS Styling:**
```css
:global(.formula-vocabulary-term) {
  color: var(--syntax-function); /* Blue like functions */
  font-weight: 600;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-color: var(--syntax-function);
  text-underline-offset: 2px;
}
```

**Hook API:**
```typescript
const { highlightSyntax, vocabularyEnabled, vocabularyTerms } = useVocabularySyntax(variables);
```

---

### 2. Feature Flag System

**Implementation Strategy:**

#### Global Feature Flag (Phase 5.11.3)
```typescript
// In VocabularyResolver.ts
export const USE_VOCABULARY_RESOLUTION = false; // Master switch
```

#### Per-Editor Feature Flags (Phase 5.11.4)
```typescript
// In editor configuration or context
const vocabularyConfig = {
  enabledInBAL: true,        // Enable for BAL
  enabledInFormula: false,   // Disabled for Formula (Phase 5.11.5)
  enabledInTest: true        // Enable in test panels
};
```

**Why Per-Editor Flags:**
- Gradual rollout per editor type
- Independent testing
- Easy rollback per editor
- No cross-editor interference

---

### 3. BAL Editor Integration

**Location:** `/components/BALEditor/` (UNTOUCHED - use composition)

**Integration Approach:**

#### Option A: Wrapper Component (Recommended)
```typescript
// NEW FILE: /components/BALEditor/BALEditorWithVocabulary.tsx
import { BALEditor } from './BALEditor';
import { useVocabularySyntax } from '../editors/code/shared/hooks';

export function BALEditorWithVocabulary(props) {
  const { highlightSyntax } = useVocabularySyntax(props.variables);
  
  return (
    <BALEditor
      {...props}
      customSyntaxHighlighter={highlightSyntax}
    />
  );
}
```

#### Option B: Hook Injection
```typescript
// In BAL Editor usage
const vocabularySyntax = useVocabularySyntax(variables);

<BALEditor
  {...props}
  syntaxHighlighter={vocabularySyntax.highlightSyntax}
/>
```

**Strangler Pattern Compliance:**
- BALEditor.tsx remains UNTOUCHED
- New wrapper/HOC provides vocabulary features
- Feature flag controls which component is used
- Easy rollback by using original BALEditor

---

### 4. Parser Evaluation Integration

**Goal:** BAL parser resolves vocabulary terms during evaluation

**Integration Point:** `/services/evaluationEngine/parsers/FormulaParser.ts`

**Strangler Approach:**

```typescript
// In FormulaParser (NEW CODE - doesn't modify existing)
import { getVocabularyResolver, USE_VOCABULARY_RESOLUTION } from './VocabularyResolver';

class FormulaParser {
  private vocabularyResolver = getVocabularyResolver();
  
  private parseVerbalization(): Expression {
    const token = this.current;
    
    // NEW: Try vocabulary resolution first (if enabled)
    if (USE_VOCABULARY_RESOLUTION && this.vocabularyResolver.isEnabled()) {
      const result = this.vocabularyResolver.resolveVerbalizationToken(token);
      
      if (result.resolved) {
        // Convert to variable reference
        this.advance();
        return {
          type: 'VariableRef',
          name: result.suggestedVariableName,
          location: this.getLocation()
        };
      }
    }
    
    // EXISTING: Fall back to old verbalization map
    return this.parseOldVerbalization();
  }
}
```

**Testing Strategy:**
1. Enable feature flag in test environment
2. Test vocabulary term evaluation
3. Verify fallback to old system works
4. Verify both systems can coexist

---

### 5. Autocomplete Enhancement

**Goal:** Vocabulary-aware autocomplete suggestions

**Hook:** `useVocabularyAutocomplete` (Already exists from Phase 5.11.3)

**Integration:**
```typescript
import { useVocabularyAutocomplete } from './services/evaluationEngine';

function BALAutocomplete({ query }) {
  const { suggestions, isSearching } = useVocabularyAutocomplete(query, 10);
  
  return (
    <div>
      {suggestions.map(s => (
        <AutocompleteItem
          key={s.term}
          term={s.term}
          type={s.resolution?.attribute.type}
          icon={<VocabularyIcon />}
        />
      ))}
    </div>
  );
}
```

---

### 6. Test Panel Integration

**Goal:** Support vocabulary terms in test values

**Location:** Test panel components

**Integration:**
```typescript
import { useVocabularyTermResolution } from './services/evaluationEngine';

function TestValueInput({ value }) {
  const { resolution } = useVocabularyTermResolution(value);
  
  return (
    <div>
      <input value={value} />
      {resolution.resolved && (
        <Tooltip content={`Vocabulary term: ${resolution.attributePath}`}>
          <Badge>Vocabulary</Badge>
        </Tooltip>
      )}
    </div>
  );
}
```

---

## Implementation Plan

### Phase 1: Syntax Highlighting ✅ COMPLETE

- [x] Create `useVocabularySyntax` hook
- [x] Add CSS styling for vocabulary terms
- [x] Export from shared hooks
- [x] Test with sample vocabulary

### Phase 2: Feature Flag System (Next)

- [ ] Create per-editor configuration
- [ ] Add feature flag context/provider
- [ ] Document flag precedence rules
- [ ] Test flag combinations

### Phase 3: BAL Editor Integration

- [ ] Create BAL Editor wrapper component
- [ ] Integrate vocabulary syntax highlighting
- [ ] Test highlighting in BAL context
- [ ] Verify backward compatibility

### Phase 4: Parser Integration

- [ ] Add vocabulary resolution to FormulaParser
- [ ] Implement fallback logic
- [ ] Test evaluation with vocabulary terms
- [ ] Test mixed vocabulary + verbalization

### Phase 5: Autocomplete Enhancement

- [ ] Integrate vocabulary autocomplete
- [ ] Add vocabulary-specific icons/badges
- [ ] Test search relevance
- [ ] Add keyboard shortcuts

### Phase 6: Test Panel Integration

- [ ] Add vocabulary term recognition
- [ ] Visual indicators for vocabulary
- [ ] Validation against vocabulary constraints
- [ ] Test panel auto-population from vocabulary

### Phase 7: Testing & Documentation

- [ ] Unit tests for all components
- [ ] Integration tests (BAL + vocabulary)
- [ ] Performance tests
- [ ] Update documentation
- [ ] Create usage examples

---

## Success Criteria

### Functional
- ✅ Vocabulary terms highlighted distinctly in BAL Editor
- [ ] Parser resolves vocabulary terms correctly
- [ ] Autocomplete suggests vocabulary terms
- [ ] Test panel recognizes vocabulary
- [ ] Feature flags control enablement

### Non-Functional
- [ ] No degradation in editor performance
- [ ] Backward compatibility maintained
- [ ] Easy rollback via feature flags
- [ ] Clear error messages

### Strangler Pattern
- [ ] Zero modifications to existing BAL Editor code
- [ ] New features composable via wrappers/HOCs
- [ ] Feature flags enable gradual rollout
- [ ] Old system continues to work

---

## Testing Strategy

### Unit Tests
```typescript
describe('useVocabularySyntax', () => {
  it('highlights vocabulary terms', () => {
    const { highlightSyntax } = useVocabularySyntax([]);
    const html = highlightSyntax('the credit score = 750');
    expect(html).toContain('formula-vocabulary-term');
  });
  
  it('falls back to standard highlighting when disabled', () => {
    USE_VOCABULARY_RESOLUTION = false;
    const { highlightSyntax } = useVocabularySyntax([]);
    const html = highlightSyntax('the credit score = 750');
    expect(html).not.toContain('formula-vocabulary-term');
  });
});
```

### Integration Tests
```typescript
describe('BAL Editor with Vocabulary', () => {
  it('evaluates vocabulary terms', async () => {
    const code = 'the credit score = 750';
    const result = await evaluateBAL(code, testContext);
    expect(result.variables.$applicantCreditScore).toBe(750);
  });
  
  it('autocomplete suggests vocabulary', () => {
    const suggestions = getAutocomplete('credit');
    expect(suggestions).toContainEqual({
      term: 'the credit score',
      type: 'vocabulary'
    });
  });
});
```

### Performance Tests
```typescript
describe('Vocabulary Performance', () => {
  it('highlights large documents quickly', () => {
    const largeCode = generateLargeBALCode(1000); // 1000 lines
    const startTime = performance.now();
    highlightSyntax(largeCode);
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100); // < 100ms
  });
});
```

---

## Rollback Plan

### Scenario 1: Syntax Highlighting Issues
```typescript
// Revert to old syntax hook
import { useFormulaSyntax } from './hooks/useFormulaSyntax';
// Instead of: import { useVocabularySyntax } from './shared/hooks';
```

### Scenario 2: Parser Evaluation Issues
```typescript
// Disable vocabulary resolution in parser
const USE_VOCABULARY_IN_PARSER = false;

if (USE_VOCABULARY_IN_PARSER && vocabularyResolver.isEnabled()) {
  // Try vocabulary
} else {
  // Use old system
}
```

### Scenario 3: Complete Rollback
```typescript
// Revert to original BAL Editor
import { BALEditor } from './BALEditor';
// Instead of: import { BALEditorWithVocabulary } from './BALEditorWithVocabulary';
```

---

## Documentation Updates

### User Documentation
- How to use vocabulary terms in BAL
- Syntax highlighting legend
- Autocomplete keyboard shortcuts
- Test panel vocabulary support

### Developer Documentation
- Integration guide for other editors
- Feature flag configuration
- Extending vocabulary syntax highlighting
- Adding custom vocabulary patterns

---

## Future Enhancements (Phase 5.11.5+)

### Formula Editor Integration
- Enable vocabulary in Formula Editor
- Unified syntax highlighting
- Cross-editor consistency

### Advanced Features
- Vocabulary term hover tooltips
- Jump to vocabulary definition
- Vocabulary term refactoring
- Import/export vocabulary from editor

### UI Improvements
- Vocabulary browser panel
- Real-time vocabulary validation
- Vocabulary term suggestions as you type
- Visual vocabulary relationship graph

---

## References

- **Phase 5.11.1:** Vocabulary Foundation (`/change-log/25-11-13_v01-VocabularySystemFoundation.md`)
- **Phase 5.11.3:** Parser Integration (`/change-log/25-11-13_v02-VocabularyParserIntegration.md`)
- **Syntax Highlighting:** `/components/editors/code/shared/hooks/useVocabularySyntax.ts`
- **VocabularyResolver:** `/services/evaluationEngine/parsers/VocabularyResolver.ts`
- **Guidelines:** `/guidelines/Guidelines.md` (Strangler Pattern)

---

## Status

**Phase 5.11.4:** IN PROGRESS

**Completed:**
- ✅ Enhanced syntax highlighting hook
- ✅ CSS styling for vocabulary terms
- ✅ Hook exports

**Next Steps:**
1. Feature flag system
2. BAL Editor wrapper component
3. Parser integration
4. Autocomplete enhancement
5. Test panel integration

**Ready for:** BAL Editor integration and testing
