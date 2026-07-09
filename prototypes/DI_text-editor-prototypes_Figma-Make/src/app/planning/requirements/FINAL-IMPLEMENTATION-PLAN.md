# ✅ FINAL Implementation Plan: Extend FormulaEditor for BAL Mode

**Date:** November 13, 2025  
**Status:** All corrections applied, ready for approval  

---

## 🎯 Executive Summary

**Goal:** Single editor supporting both Formula and BAL modes with full feature parity  
**Approach:** Extend FormulaEditor with `mode` prop, keep ALL debug features for both modes  
**Timeline:** 7-8 hours total  
**Architecture:** Dynamic, domain-agnostic, no hardcoded vocabulary  

---

## 📚 Supporting Documentation

### 1. Corrected Understanding
**File:** `/planning/requirements/CORRECTED-BAL-UNDERSTANDING.md`  
**Key Insights:**
- Formula ALSO supports `if/then/else` (not BAL-specific!)
- Both modes get FULL debug capabilities
- Nested attribute support required for test panel

### 2. Dynamic Vocabulary Architecture  
**File:** `/planning/requirements/ARCHITECTURE-DYNAMIC-VOCABULARY.md`  
**Key Principle:**
- Examples are PATTERNS, not hardcoded implementations
- Editor is domain-agnostic
- Attributes provided via props by consuming app
- No hardcoded business domain knowledge

### 3. Shared vs Specific Constructs
**File:** `/planning/requirements/SHARED-VS-SPECIFIC-CONSTRUCTS.md`  
**Key Finding:**
- Natural language operators/functions are SHARED
- Control flow is SHARED
- Only ~10% is mode-specific

### 4. Autocomplete Feature Parity
**File:** `/planning/requirements/AUTOCOMPLETE-FEATURE-PARITY.md`  
**Key Requirements:**
- Word-based autocomplete for BAL
- Tab indentation for both modes
- Shift+Tab unindent for both modes

---

## 🏗️ Architecture Principles

### 1. Domain-Agnostic Design

**❌ WRONG (Hardcoded):**
```tsx
const BAL_ATTRIBUTES = [
  { text: 'employee.salary', type: 'number' },
  { text: 'request.type', type: 'string' }
];
```

**✅ CORRECT (Dynamic):**
```tsx
export interface FormulaEditorProps {
  mode?: 'formula' | 'bal';
  attributes?: AttributeDefinition[]; // Provided by consuming app
}

// Consuming app provides domain knowledge
<FormulaEditor
  mode="bal"
  attributes={[
    { path: 'employee.salary', type: 'number', description: 'Annual salary' },
    { path: 'request.type', type: 'string', description: 'Request type' }
  ]}
/>
```

### 2. Full Feature Parity

**Both modes get:**
- ✅ Debug output column
- ✅ Ghost values
- ✅ Test panel
- ✅ Step-through debugger
- ✅ Execution trace
- ✅ Branch indicators

**Only Formula gets:**
- ✅ Variable table (inline variable definitions)
- ✅ "Convert to variable" button

**Only BAL gets:**
- ✅ Dot-notation attribute autocomplete
- ✅ Statement keyword autocomplete (`set`, `define`, `return`)

### 3. Shared Constructs (90%)

**Both modes share:**
- ✅ Control flow: `if/then/else/elsif/end`
- ✅ Natural language operators: `is greater than`, `contains`, etc.
- ✅ Natural language functions: `the sum of`, `the average of`, etc.
- ✅ Standard functions: `SUM`, `AVG`, `COUNT`, etc.
- ✅ Vocabulary mappings (user-defined terms)
- ✅ All debug/test infrastructure

---

## 📋 Implementation Plan

### Phase 1A: Mode Prop + Conditional UI (1 hour)

#### 1. Add Mode Prop
```tsx
export interface FormulaEditorProps {
  /** Editor mode: 'formula' (default) or 'bal' */
  mode?: 'formula' | 'bal';
  
  // Shared props (both modes)
  value: string;
  onChange: (value: string) => void;
  errors?: Array<{ line: number; message: string }>;
  warnings?: Array<{ line: number; message: string }>;
  
  // Formula-specific props
  variables?: Variable[];
  onVariablesChange?: (vars: Variable[]) => void;
  
  // BAL-specific props
  /** Vocabulary mappings (user-defined terms) */
  vocabularyMappings?: Array<{
    term: string;
    definition: string;
    dataType?: string;
  }>;
  
  /** Attribute definitions for autocomplete and test panel */
  attributes?: Array<{
    path: string; // 'employee.salary', 'customer.address.city'
    type: 'string' | 'number' | 'boolean' | 'date' | 'time' | 'datetime';
    description?: string;
    defaultValue?: any;
    unit?: string; // 'USD', 'days', 'kg', etc.
  }>;
  
  // Shared debug props (both modes)
  onDebugHighlight?: (highlight: DebugHighlight | null) => void;
  onErrorHighlight?: (error: ErrorHighlight | null) => void;
  onWarningHighlight?: (warnings: WarningHighlight[] | null) => void;
}
```

#### 2. Conditional UI Rendering
```tsx
{/* ONLY hide variable management in BAL mode */}
{mode === 'formula' && (
  <>
    <VariableTable 
      variables={variables} 
      onChange={onVariablesChange}
    />
    <ConvertToVariableButton />
  </>
)}

{/* Debug features SHARED - always show when enabled */}
{debugMode && (
  <>
    <DebugOutputColumn trace={executionTrace} />
    <GhostValue values={intermediateValues} />
    <BranchIndicator activeBranch={activeBranch} />
  </>
)}

{/* Test panel SHARED - always show */}
<FormulaTestPanel
  mode={mode}
  variables={mode === 'formula' ? variables : []}
  attributes={mode === 'bal' ? attributes : []}
  formulaCode={value}
  onEvaluate={handleEvaluate}
/>
```

### Phase 1B: Nested Attribute Support (2-3 hours)

#### 1. Create Dynamic Attribute Extraction (30 min)
```tsx
/**
 * Extract attributes referenced in BAL code
 * Supports: object.property, object.property.subproperty
 * Supports: object.'property with spaces'
 */
export function extractBALAttributes(code: string): string[] {
  const attributes = new Set<string>();
  
  // Regex to match dot-notation attribute references
  // Matches: word.word, word.word.word, etc.
  // Supports spaces in attribute names: employee.'years of service'
  const attrPattern = /\b([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*|\.'[^']+'))+\b/g;
  
  const matches = code.matchAll(attrPattern);
  for (const match of matches) {
    const attr = match[0];
    // Exclude keywords that might match pattern
    if (!isBALKeyword(attr)) {
      attributes.add(attr);
    }
  }
  
  return Array.from(attributes);
}
```

#### 2. Parse Nested Structure (30 min)
```tsx
/**
 * Parse flat dot-notation attributes into nested object structure
 * For hierarchical test panel UI
 */
function parseAttributeHierarchy(
  attributeDefs: AttributeDefinition[]
): NestedAttributeStructure {
  const root: any = {};
  
  attributeDefs.forEach(def => {
    const parts = def.path.split('.');
    let current = root;
    
    parts.forEach((part, i) => {
      const isLeaf = i === parts.length - 1;
      
      if (isLeaf) {
        // Leaf node - actual attribute with type
        current[part] = {
          type: def.type,
          description: def.description,
          defaultValue: def.defaultValue,
          unit: def.unit,
          fullPath: def.path
        };
      } else {
        // Intermediate node - nested object
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
    });
  });
  
  return root;
}
```

#### 3. Recursive Nested UI Component (1 hour)
```tsx
/**
 * Recursive component for nested attribute rendering
 * Supports expandable/collapsible sections
 */
function NestedAttributeInput({
  name,
  node,
  path = [],
  values,
  onChange
}: NestedAttributeInputProps) {
  const [expanded, setExpanded] = useState(true);
  const fullPath = [...path, name].join('.');
  
  // Check if this is a leaf node (actual attribute) or object node
  const isLeaf = node.type !== undefined;
  
  if (isLeaf) {
    // Leaf node - render typed input
    return (
      <div className={styles.inputRow}>
        <label className={styles.attributeLabel}>
          <span className={styles.attributeName}>{name}</span>
          <span className={styles.attributeType}>{node.type}</span>
          {node.unit && (
            <span className={styles.attributeUnit}>({node.unit})</span>
          )}
        </label>
        
        <TypedInput
          type={node.type}
          value={getNestedValue(values, [...path, name])}
          onChange={(value) => onChange(fullPath, value)}
          placeholder={node.defaultValue}
        />
        
        {node.description && (
          <span className={styles.attributeDescription}>
            {node.description}
          </span>
        )}
      </div>
    );
  }
  
  // Object node - render expandable section
  const childCount = Object.keys(node).length;
  
  return (
    <div className={styles.nestedObject}>
      <div 
        className={styles.objectHeader}
        onClick={() => setExpanded(!expanded)}
      >
        <ChevronRight 
          className={expanded ? styles.rotated : ''}
          size={16}
        />
        <span className={styles.objectName}>{name}</span>
        <span className={styles.propertyCount}>
          {childCount} {childCount === 1 ? 'property' : 'properties'}
        </span>
      </div>
      
      {expanded && (
        <div className={styles.nestedContent}>
          {Object.entries(node).map(([childName, childNode]) => (
            <NestedAttributeInput
              key={childName}
              name={childName}
              node={childNode}
              path={[...path, name]}
              values={values}
              onChange={onChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

#### 4. Value Management Helpers (30 min)
```tsx
// Nested value getter
function getNestedValue(obj: any, path: string[]): any {
  let current = obj;
  for (const part of path) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return current;
}

// Nested value setter
function setNestedValue(obj: any, path: string, value: any): any {
  const newObj = { ...obj };
  const parts = path.split('.');
  let current: any = newObj;
  
  // Navigate to parent
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  
  // Set leaf value
  current[parts[parts.length - 1]] = value;
  
  return newObj;
}

// Flatten for evaluation engine
function flattenAttributeValues(nested: any): Record<string, any> {
  const flat: Record<string, any> = {};
  
  function traverse(obj: any, path: string[] = []) {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = [...path, key];
      
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        traverse(value, currentPath);
      } else {
        flat[currentPath.join('.')] = value;
      }
    }
  }
  
  traverse(nested);
  return flat;
}
```

### Phase 1C: Shared + Mode-Specific Autocomplete (1 hour)

#### 1. Create Shared Vocabulary File
```tsx
// /components/editors/code/shared/vocabulary/sharedVocabulary.ts

/**
 * SHARED vocabulary used by BOTH Formula and BAL
 */

export const SHARED_NL_OPERATORS = [
  'is greater than',
  'is less than',
  'is equal to',
  'is not equal to',
  'is greater than or equal to',
  'is less than or equal to',
  'is null',
  'is not null',
  'is empty',
  'is not empty',
  'starts with',
  'ends with',
  'contains',
  'does not contain',
  'plus',
  'minus',
  'times',
  'multiplied by',
  'divided by',
  'mod',
  'to the power of',
];

export const SHARED_NL_FUNCTIONS = [
  'the sum of',
  'the average of',
  'the count of',
  'the maximum of',
  'the minimum of',
  'the total of',
  'the first of',
  'the last of',
  'the length of',
  'the size of',
  'the floor of',
  'the round of',
  'the ceiling of',
  'the uppercase of',
  'the lowercase of',
  'the absolute value of',
  'the first element of',
  'the last element of',
  'the square root of',
  'the first item in',
  'the last item in',
];

export const SHARED_STANDARD_FUNCTIONS = [
  'SUM', 'AVG', 'COUNT', 'MAX', 'MIN',
  'FIRST', 'LAST', 'LENGTH', 'FLOOR', 'ROUND', 'CEILING',
  'UPPER', 'LOWER', 'ABS', 'SQRT',
  // ... all standard functions
];
```

#### 2. Create BAL-Specific Vocabulary
```tsx
// /components/editors/code/balSupport/balVocabulary.ts

/**
 * BAL-SPECIFIC vocabulary (not shared with Formula)
 */

export const BAL_CONTROL_KEYWORDS = [
  // Control flow (SHARED with Formula!)
  'if', 'then', 'else', 'elsif', 'elseif', 'otherwise', 'end',
];

export const BAL_STATEMENT_KEYWORDS = [
  // BAL-specific statements
  'set', 'to', 'define', 'function', 'return',
];

export const BAL_ITERATION_KEYWORDS = [
  // BAL-specific iteration
  'for', 'each', 'in', 'while', 'do',
];

export const BAL_LOGICAL_KEYWORDS = [
  // Shared with Formula
  'and', 'or', 'not',
];

// NO hardcoded attributes - these come from props!
```

#### 3. Build Mode-Specific Autocomplete
```tsx
const autocompleteItems = useMemo(() => {
  // SHARED items (both modes)
  const sharedItems = [
    ...SHARED_NL_OPERATORS.map(op => ({ 
      label: op, 
      type: 'operator',
      description: 'Natural language operator'
    })),
    ...SHARED_NL_FUNCTIONS.map(fn => ({ 
      label: fn, 
      type: 'function',
      description: 'Natural language function'
    })),
    ...SHARED_STANDARD_FUNCTIONS.map(f => ({ 
      label: f, 
      type: 'function',
      description: 'Standard function'
    })),
  ];
  
  // Add vocabulary mappings (if provided)
  if (vocabularyMappings) {
    sharedItems.push(...vocabularyMappings.map(v => ({
      label: v.term,
      type: 'vocabulary',
      description: v.definition,
      dataType: v.dataType
    })));
  }
  
  if (mode === 'bal') {
    const balItems = [
      // BAL-specific keywords
      ...BAL_CONTROL_KEYWORDS.map(k => ({ 
        label: k, 
        type: 'keyword',
        description: 'Control flow keyword'
      })),
      ...BAL_STATEMENT_KEYWORDS.map(k => ({ 
        label: k, 
        type: 'keyword',
        description: 'Statement keyword'
      })),
      ...BAL_ITERATION_KEYWORDS.map(k => ({ 
        label: k, 
        type: 'keyword',
        description: 'Iteration keyword'
      })),
    ];
    
    // Add attributes from props (provided by consuming app)
    if (attributes && attributes.length > 0) {
      balItems.push(...attributes.map(attr => ({
        label: attr.path,
        type: 'attribute',
        description: attr.description || `${attr.type} attribute`,
        dataType: attr.type
      })));
    }
    
    // Fallback: Extract attributes from code if none provided
    if (!attributes || attributes.length === 0) {
      const codeAttributes = extractBALAttributes(value);
      balItems.push(...codeAttributes.map(attr => ({
        label: attr,
        type: 'attribute',
        description: 'Referenced in code'
      })));
    }
    
    return [...balItems, ...sharedItems];
  }
  
  // Formula mode
  return [
    // Formula-specific
    ...variables.map(v => ({ 
      label: `$${v.name}`, 
      type: 'variable',
      description: v.description,
      dataType: v.dataType
    })),
    ...formulaAttributes.map(a => ({ 
      label: `#${a.name}`, 
      type: 'attribute',
      description: a.description
    })),
    
    // SHARED
    ...sharedItems
  ];
}, [mode, value, variables, attributes, vocabularyMappings]);
```

### Phase 1D: Tab Indentation (1 hour)

```tsx
const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  const textarea = textareaRef.current;
  if (!textarea) return;
  
  const { selectionStart: start, selectionEnd: end } = textarea;
  
  // ... existing autocomplete handling ...
  
  // Tab indentation (when autocomplete closed)
  if (e.key === 'Tab' && !autocompleteState.showSuggestions) {
    e.preventDefault();
    
    if (e.shiftKey) {
      // Shift+Tab: Unindent
      handleUnindent(textarea, start, end);
    } else {
      // Tab: Indent (insert 2 spaces)
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      // Move cursor after spaces
      setTimeout(() => {
        textarea.selectionStart = start + 2;
        textarea.selectionEnd = start + 2;
      }, 0);
    }
  }
};

function handleUnindent(
  textarea: HTMLTextAreaElement, 
  start: number, 
  end: number
) {
  const lines = value.split('\n');
  const startLine = value.substring(0, start).split('\n').length - 1;
  const endLine = value.substring(0, end).split('\n').length - 1;
  
  let newLines = [...lines];
  let charsRemoved = 0;
  
  for (let i = startLine; i <= endLine; i++) {
    const line = newLines[i];
    // Remove up to 2 leading spaces
    if (line.startsWith('  ')) {
      newLines[i] = line.substring(2);
      charsRemoved += 2;
    } else if (line.startsWith(' ')) {
      newLines[i] = line.substring(1);
      charsRemoved += 1;
    }
  }
  
  const newValue = newLines.join('\n');
  onChange(newValue);
  
  // Adjust cursor position
  setTimeout(() => {
    textarea.selectionStart = Math.max(0, start - charsRemoved);
    textarea.selectionEnd = Math.max(0, end - charsRemoved);
  }, 0);
}
```

### Phase 1E: Word-Based Autocomplete Trigger (30 min)

```tsx
// Check if useAutocompleteTriggers supports word-based (trigger: '')
// If not, add support in the hook

const autocompleteProviders = useMemo(() => {
  if (mode === 'bal') {
    return [
      {
        trigger: '', // Empty = word-based matching
        minChars: 2,
        suggestions: autocompleteItems,
        match: (text: string, cursorPos: number) => {
          // Match any word with 2+ characters before cursor
          const beforeCursor = text.substring(0, cursorPos);
          const match = beforeCursor.match(/\b([a-zA-Z_][a-zA-Z0-9_.\s]*)\s*$/);
          
          if (match && match[1].length >= 2) {
            return {
              matchedText: match[1],
              startPos: cursorPos - match[1].length,
              endPos: cursorPos
            };
          }
          
          return null;
        }
      }
    ];
  }
  
  // Formula mode - symbol triggers
  return [
    { trigger: '$', suggestions: variableSuggestions },
    { trigger: '#', suggestions: attributeSuggestions },
    { trigger: '@', suggestions: mentionSuggestions },
  ];
}, [mode, autocompleteItems]);
```

---

## 📊 Timeline Summary

| Phase | Task | Time | Status |
|-------|------|------|--------|
| 1A | Mode prop + conditional UI | 1 hour | ⬜ Not started |
| 1B | Nested attribute support | 2-3 hours | ⬜ Not started |
| 1C | Shared + mode autocomplete | 1 hour | ⬜ Not started |
| 1D | Tab indentation | 1 hour | ⬜ Not started |
| 1E | Word-based autocomplete | 30 min | ⬜ Not started |
| **Phase 1 Total** | | **5.5-6.5 hours** | |
| 2 | Migrate consumers | 1 hour | ⬜ Not started |
| 3 | Cleanup | 30 min | ⬜ Not started |
| **GRAND TOTAL** | | **7-8 hours** | |

---

## ✅ Success Criteria

### Must Have:
1. ✅ FormulaEditor accepts `mode: 'formula' | 'bal'`
2. ✅ Both modes get full debug features (output, ghost, test panel)
3. ✅ Test panel supports nested attributes with hierarchical UI
4. ✅ Nested attributes are expandable/collapsible
5. ✅ BAL mode shows correct autocomplete (shared + BAL-specific)
6. ✅ Formula mode shows correct autocomplete (shared + Formula-specific)
7. ✅ Attributes provided via props (domain-agnostic)
8. ✅ No hardcoded business domain vocabulary
9. ✅ Tab indentation works in both modes
10. ✅ Word-based autocomplete for BAL mode
11. ✅ All Formula features still work (regression-free)
12. ✅ BAL Editor deleted, consumers migrated

### Nice to Have:
- Bulk import of attribute values (JSON paste)
- Export attribute values to JSON
- Preset attribute configurations
- Better type inference for auto-detected attributes
- Keyboard shortcut cheat sheet

---

## ✅ What's ACTUALLY Different Between Modes

### Formula-Specific (Only 3 things!):
1. Variable assignment: `$var = expression`
2. Variable references: `$var`
3. Attribute prefix: `#attribute`

### BAL-Specific (Only 4 things!):
1. Statement keywords: `set`, `define`, `return`
2. Iteration keywords: `for`, `each`, `in`, `while`, `do`
3. Dot notation: `employee.salary` (no `#` prefix)
4. No `$` for variables (natural language instead)

### SHARED (Almost everything!):
- ✅ Control flow: `if/then/else/elsif/end`
- ✅ Natural language operators: `is greater than`, `contains`, etc.
- ✅ Natural language functions: `the sum of`, `the average of`, etc.
- ✅ Standard functions: `SUM`, `AVG`, `COUNT`, etc.
- ✅ Vocabulary mappings
- ✅ **Debug output column**
- ✅ **Ghost values**
- ✅ **Test panel**
- ✅ **Step-through debugger**

**BAL and Formula are 90% the same!**

---

## ✅ Ready to Implement

**All corrections applied:**
- ✅ Formula ALSO supports `if/then/else`
- ✅ Both modes get full debug capabilities
- ✅ Nested attribute support planned
- ✅ Dynamic, domain-agnostic architecture
- ✅ No hardcoded vocabulary examples

**Estimated time:** 7-8 hours total

**Awaiting approval to proceed!** 🚀