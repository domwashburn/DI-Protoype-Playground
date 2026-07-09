# EPIC - BAL Dynamic Keyword Highlighting

**Status:** Planned  
**Priority:** Medium  
**Complexity:** Medium  
**Estimated Effort:** 3-5 days

---

## Overview

Implement dynamic keyword highlighting in the BAL editor where user-defined terms (from `definitions` and `dictionary` sections) are automatically treated as keywords and highlighted appropriately throughout the code.

## Problem Statement

Currently, the BAL editor treats all syntax the same way:
- String literals in `set` statements are highlighted as strings
- References to those terms later are highlighted as regular text
- Dictionary vocabulary terms are not given special highlighting

This makes it harder to:
- **Identify references** to defined terms vs. regular text
- **Understand semantic meaning** - defined terms are special, not just strings
- **Catch typos** - if a term isn't highlighted, it might be misspelled
- **Maintain consistency** - knowing which terms are "official" vocabulary

## Desired Behavior

### Example Code:

```bal
definitions:
  set 'minimum service for fixed holidays' to 0.5; // 6 months
  set 'minimum service for personal choice' to 1; // 1 year
  set 'personal holidays per year' to 3;
  set 'additional holidays after 5 years' to 2;

// Fixed Holidays
if the years of service of the employee is greater than or equal to the minimum service for fixed holidays
  then
    set 'is eligible for fixed holidays' of the holiday eligibility to true;
  else
    set 'is eligible for fixed holidays' of the holiday eligibility to false;
```

### Current Highlighting:

- `'minimum service for fixed holidays'` → **String literal** (green/yellow)
- `the minimum service for fixed holidays` → **Regular text** (white)
- `years of service` → **Regular text** (white)

### Desired Highlighting:

- `'minimum service for fixed holidays'` → **Definition declaration** (special color, e.g., cyan)
- `the minimum service for fixed holidays` → **Defined term reference** (cyan, matching definition)
- `years of service` → **Dictionary vocabulary** (different color, e.g., purple)
- `the employee` → **Dictionary vocabulary** (purple)

## User Benefits

1. **Visual Clarity**: Immediately see which terms are part of your domain model
2. **Error Detection**: Typos are obvious - term won't be highlighted
3. **Documentation**: Code becomes self-documenting - highlighted terms indicate "official" vocabulary
4. **Navigation**: Could later add "go to definition" for highlighted terms
5. **Learning**: New users can see the semantic structure of BAL code more clearly

## Technical Approach

### Phase 1: Definition Extraction

**Goal:** Parse the BAL code to extract user-defined terms.

**Implementation:**

1. **Parse `definitions:` section**
   - Extract all `set 'term' to value;` statements
   - Store terms in a Set for fast lookup
   
2. **Parse `dictionary:` section** (if exists)
   - Extract vocabulary definitions
   - Store in separate Set for vocabulary terms

**Location:** `/components/BALEditor/hooks/useBALDefinitions.ts` (new file)

```typescript
export interface BALDefinitions {
  /** Terms defined in definitions section */
  definedTerms: Set<string>;
  
  /** Terms from dictionary section */
  vocabularyTerms: Set<string>;
  
  /** Map of term to definition location (line number) */
  termLocations: Map<string, number>;
}

export function useBALDefinitions(code: string): BALDefinitions {
  return useMemo(() => {
    const definedTerms = new Set<string>();
    const vocabularyTerms = new Set<string>();
    const termLocations = new Map<string, number>();
    
    // Parse definitions section
    const defMatch = code.match(/definitions:\s*([\s\S]*?)(?=\n\S|$)/);
    if (defMatch) {
      const defsSection = defMatch[1];
      const setPattern = /set\s+'([^']+)'\s+to\s+/g;
      let match;
      
      while ((match = setPattern.exec(defsSection)) !== null) {
        const term = match[1];
        definedTerms.add(term);
        
        // Find line number
        const lineNum = code.substring(0, match.index).split('\n').length;
        termLocations.set(term, lineNum);
      }
    }
    
    // Parse dictionary section (similar pattern)
    // ...
    
    return { definedTerms, vocabularyTerms, termLocations };
  }, [code]);
}
```

### Phase 2: Syntax Highlighting Enhancement

**Goal:** Highlight defined terms and vocabulary differently from regular text.

**Implementation:**

Update `/components/BALEditor/BALEditor.tsx` to:

1. Extract definitions using the new hook
2. Pass definitions to syntax highlighter
3. Apply special highlighting classes

**Key Changes:**

```typescript
// In BALEditor.tsx
const { definedTerms, vocabularyTerms } = useBALDefinitions(value);

// Apply highlighting
const applyHighlighting = useCallback(() => {
  // ... existing highlighting logic
  
  // Add defined term highlighting
  definedTerms.forEach(term => {
    // Highlight both quoted and unquoted usage
    highlightDefinedTerm(term);
  });
  
  vocabularyTerms.forEach(term => {
    highlightVocabularyTerm(term);
  });
}, [value, definedTerms, vocabularyTerms]);
```

**Highlighting Pattern:**

For a term like `'minimum service for fixed holidays'`:

1. **In definition:** Highlight the quoted string specially
   ```bal
   set 'minimum service for fixed holidays' to 0.5;
       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
       Definition declaration (cyan background)
   ```

2. **In usage:** Highlight the unquoted reference
   ```bal
   the minimum service for fixed holidays
       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
       Defined term reference (cyan text)
   ```

**Challenge:** Terms can appear with articles and prepositions:
- `the minimum service for fixed holidays`
- `a minimum service for fixed holidays`
- `minimum service for fixed holidays`

**Solution:** Use fuzzy matching or normalize terms (remove articles) for comparison.

### Phase 3: Styling

**Goal:** Define distinct visual styles for different term types.

**CSS Additions to `BALEditor.module.css`:**

```css
/* Definition declaration (in set statement) */
.definitionDeclaration {
  background-color: var(--highlight-cyan-subtle);
  color: var(--text-cyan);
  font-weight: 500;
  border-radius: var(--radius-sm);
  padding: 0 var(--spacing-01);
}

/* Defined term reference (used in code) */
.definedTermRef {
  color: var(--text-cyan);
  font-weight: 500;
}

/* Dictionary vocabulary */
.vocabularyTerm {
  color: var(--text-purple);
  font-style: italic;
}

/* Hover state shows definition location */
.definedTermRef:hover,
.vocabularyTerm:hover {
  text-decoration: underline;
  cursor: help;
}
```

**Color Palette Additions to `/styles/globals.css`:**

```css
:root {
  /* Cyan for defined terms */
  --text-cyan: #0f62fe;
  --highlight-cyan-subtle: rgba(15, 98, 254, 0.1);
  
  /* Purple for vocabulary */
  --text-purple: #8a3ffc;
  --highlight-purple-subtle: rgba(138, 63, 252, 0.1);
}
```

### Phase 4: Tooltips & Navigation

**Goal:** Show additional context when hovering over highlighted terms.

**Implementation:**

1. **Tooltip on hover:**
   - Show where term is defined (line number)
   - Show the definition value
   - For vocabulary, show the dictionary description

2. **Click to navigate:**
   - Clicking a term reference scrolls to its definition
   - Uses existing cursor/selection utilities

**Example Tooltip:**

```
Defined term: "minimum service for fixed holidays"
Defined on line 2 as: 0.5
```

## Implementation Plan

### Files to Create

- `/components/BALEditor/hooks/useBALDefinitions.ts` - Definition extraction logic
- `/components/BALEditor/hooks/useBALKeywordHighlighting.ts` - Highlighting logic
- `/utils/balDefinitionParser.ts` - Parser utilities

### Files to Modify

- `/components/BALEditor/BALEditor.tsx` - Integrate definition highlighting
- `/components/BALEditor/BALEditor.module.css` - Add highlighting styles
- `/styles/globals.css` - Add color tokens
- `/SampleData/balSamples.ts` - Add examples with definitions

### Testing Considerations

1. **Definition extraction:**
   - Single-line definitions
   - Multi-word terms
   - Terms with special characters
   - Nested quotes (edge case)

2. **Highlighting accuracy:**
   - Exact matches
   - Matches with articles (`the`, `a`, `an`)
   - Avoid false positives (substring matches)

3. **Performance:**
   - Large definition sets (100+ terms)
   - Real-time highlighting during typing
   - Debounce re-parsing on changes

## Edge Cases & Challenges

### 1. Partial Matches

**Problem:** How to handle substring matches?

```bal
set 'service' to 1;
set 'minimum service' to 0.5;

// Should both be highlighted here?
the minimum service
```

**Solution:** Prefer longest match (greedy matching).

### 2. Articles & Determiners

**Problem:** Terms can appear with different articles:

```bal
set 'employee' to ...;

// All valid references:
the employee
an employee
each employee
every employee
```

**Solution:** Normalize by stripping common articles/determiners before comparison.

### 3. Case Sensitivity

**Problem:** Should matching be case-insensitive?

```bal
set 'Employee' to ...;

// Should this match?
the employee
```

**Solution:** Make matching case-insensitive by default, configurable if needed.

### 4. Performance

**Problem:** Re-parsing definitions on every keystroke could be slow.

**Solution:**
- Debounce definition extraction (500ms)
- Only re-parse when `definitions:` section changes
- Cache parsed terms until relevant sections change

### 5. Conflicts with Existing Keywords

**Problem:** What if a defined term conflicts with BAL keywords?

```bal
set 'if' to 5;  // Should we allow this?
```

**Solution:** Either:
- Disallow reserved keywords as definition names (show validation error)
- Prioritize built-in keywords in highlighting

### 6. Multi-line Definitions

**Problem:** Definitions might span multiple lines:

```bal
set 'very long term name that
     spans multiple lines' to 5;
```

**Solution:** Support multi-line parsing in regex patterns.

## Future Enhancements

### Phase 5: Autocomplete Integration

Integrate with `/components/BALAutocomplete`:
- Suggest defined terms when typing
- Show term definitions in autocomplete menu
- Highlight term type (defined vs. vocabulary)

### Phase 6: Refactoring Support

- "Rename term" command
- Updates all references automatically
- Updates definition and all usages

### Phase 7: Validation

- Warn when using undefined terms
- Suggest similar defined terms (typo detection)
- "Quick fix" to add term to definitions

### Phase 8: Term Analytics

- Show usage count for each term
- Identify unused definitions
- Find terms that should be added to dictionary

## Design Rationale

### Why Dynamic Highlighting?

**Alternative:** Static highlighting of known vocabulary only.

**Chosen Approach:** Dynamic - learns from user's code.

**Reasoning:**
- BAL is domain-specific - users define their own vocabulary
- Cannot know all possible terms in advance
- Self-documenting - code defines its own language
- Flexible - works for any business domain

### Why Separate Colors for Definitions vs. Vocabulary?

**Semantic Distinction:**
- **Definitions** = User-defined constants/terms in this automation
- **Vocabulary** = Standard domain model terms (data model attributes)

**Example:**
```bal
// Purple (vocabulary) - from data model
the years of service of the employee

// Cyan (definition) - user-defined in this file
the minimum service for fixed holidays
```

Users need to distinguish:
- What comes from the data model (can't change)
- What's defined in this file (can change/refactor)

## Related Work

### Similar Features in Other Editors

1. **VS Code Semantic Highlighting:**
   - Highlights variables/functions based on AST
   - Different colors for local vs. global scope
   - Inspiration for our approach

2. **JetBrains IDEs:**
   - "Inject language" feature
   - Highlights DSL keywords dynamically
   - Context-aware syntax highlighting

3. **LSP Semantic Tokens:**
   - Standard protocol for semantic highlighting
   - Could be future direction for BAL editor

## Success Metrics

**How we'll know this feature is successful:**

1. **User Feedback:**
   - Users report easier reading of BAL code
   - Fewer typos in term references
   - Faster onboarding for new users

2. **Quantitative:**
   - Reduction in "undefined term" errors
   - Increased use of definitions feature
   - Higher code consistency scores

3. **Visual:**
   - Side-by-side comparison shows clear improvement
   - Screenshots demonstrate semantic clarity

## Example Before/After

### Before (Current State):

```bal
definitions:
  set 'minimum service for fixed holidays' to 0.5;

if the years of service of the employee >= minimum service for fixed holidays
  then set 'is eligible' to true;
```

**Issues:**
- All text looks the same
- Hard to distinguish defined terms from syntax
- Can't tell `years of service` is from data model

### After (With Feature):

```bal
definitions:
  set '▼minimum service for fixed holidays▼' to 0.5;
      ^^^^^^^^^^^^^ Cyan background

if the ▼years of service▼ of the ▼employee▼ >= ▼minimum service for fixed holidays▼
       ^^^^^^^^^^^^^^^^ Purple        ^^^^^^^^ Purple    ^^^^^^^^^^^^^^^^^^^^^^^^ Cyan
       (vocabulary)                  (vocabulary)        (defined term)
  then set '▼is eligible▼' to true;
           ^^^^^^^^^ Cyan (new definition)
```

**Improvements:**
- Clear visual distinction between term types
- Immediate recognition of defined vs. vocabulary terms
- Self-documenting code structure

## Dependencies

**Required Before Starting:**
- None - can be implemented independently

**Recommended:**
- Complete any pending BAL editor refactoring
- Ensure syntax highlighting performance is acceptable

**Blocks:**
- None - other features can proceed in parallel

## References

- Current BAL Editor: `/components/BALEditor/BALEditor.tsx`
- Syntax highlighting: Uses overlay + span elements
- Autocomplete: `/components/BALAutocomplete/BALAutocomplete.tsx`
- Sample data: `/SampleData/balSamples.ts`

## Open Questions

1. **Should we highlight term declarations differently in different contexts?**
   - In `definitions:` section vs. `set` statements in rules?

2. **How to handle terms that are both vocabulary AND defined?**
   ```bal
   // If 'employee' is both in dictionary and defined locally?
   set 'employee' to ...;
   ```

3. **Should clicking a term navigate to definition or show a tooltip?**
   - Or both (tooltip on hover, navigate on click)?

4. **What about terms used before definition?**
   ```bal
   // Used here
   if the minimum service >= 0.5
   
   // Defined later
   definitions:
     set 'minimum service' to 1;
   ```

5. **Should we validate that defined terms are used?**
   - Show warning for unused definitions?

---

## Notes

This epic represents a significant UX improvement for the BAL editor. The feature makes the code more readable and maintainable by adding semantic meaning through visual design.

The implementation should be incremental:
1. Start with simple definition extraction
2. Add basic highlighting
3. Enhance with tooltips
4. Integrate with autocomplete
5. Add refactoring support

Each phase delivers value independently, allowing us to validate the approach with users before committing to advanced features.
