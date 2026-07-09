# Architecture: Dynamic Vocabulary (No Hardcoding)

**Date:** November 13, 2025  
**Critical Principle:** Examples are for PATTERN understanding, NOT for hardcoding  

---

## ❌ WRONG Approach (Hardcoded)

### What I Was Planning (DON'T DO THIS):

```tsx
// ❌ WRONG - Hardcoded BAL attributes
const BAL_ATTRIBUTES = [
  { text: 'employee.salary', type: 'number', description: 'Employee salary' },
  { text: 'employee.department', type: 'string', description: 'Department name' },
  { text: 'employee.years of service', type: 'number', description: 'Years worked' },
  { text: 'request.type', type: 'string', description: 'Request type' },
  { text: 'request.duration', type: 'number', description: 'Duration in days' },
  // ...more hardcoded examples
];

// Then use in autocomplete
const balAutocomplete = [
  ...BAL_KEYWORDS,
  ...BAL_ATTRIBUTES.map(a => ({ label: a.text, type: 'attribute' }))
];
```

**Why this is WRONG:**
- ❌ Assumes every BAL rule uses the same domain objects
- ❌ Can't adapt to different business domains
- ❌ Creates maintenance burden (updating hardcoded list)
- ❌ Limits flexibility
- ❌ Violates separation of concerns (editor shouldn't know business domain)

---

## ✅ CORRECT Approach (Dynamic)

### Principle: Editor is Domain-Agnostic

**The editor should:**
- ✅ Accept attribute definitions via props
- ✅ Extract attributes from code dynamically
- ✅ Support ANY attribute structure
- ✅ Not assume specific domain objects

**The consuming application should:**
- ✅ Define what attributes are available (domain knowledge)
- ✅ Provide attribute definitions with types
- ✅ Supply vocabulary mappings if needed

---

## 🏗️ Architecture

### 1. Attribute Definitions via Props

```tsx
export interface AttributeDefinition {
  /** Full path: 'employee.salary' or 'customer.address.city' */
  path: string;
  
  /** Data type */
  type: 'string' | 'number' | 'boolean' | 'date' | 'time' | 'datetime';
  
  /** Human-readable description (optional) */
  description?: string;
  
  /** Default value for testing (optional) */
  defaultValue?: any;
  
  /** For numbers: unit label (optional) */
  unit?: string;
}

export interface FormulaEditorProps {
  mode?: 'formula' | 'bal';
  
  // ... other props
  
  /** 
   * BAL mode: Attribute definitions for autocomplete and test panel
   * These are provided by the consuming application based on their domain model
   */
  attributes?: AttributeDefinition[];
  
  /**
   * Vocabulary mappings (user-defined natural language terms)
   * Also provided by consuming application
   */
  vocabularyMappings?: Array<{
    term: string;
    definition: string;
    dataType?: string;
  }>;
}
```

### 2. Dynamic Attribute Extraction

```tsx
/**
 * Extract attributes referenced in BAL code
 * 
 * @param code - BAL code to analyze
 * @returns Array of attribute paths referenced in code
 * 
 * @example
 * Input: "if employee.salary > 50000 then eligible"
 * Output: ['employee.salary']
 * 
 * @example
 * Input: "set total to customer.order.amount + customer.order.tax"
 * Output: ['customer.order.amount', 'customer.order.tax']
 */
export function extractBALAttributes(code: string): string[] {
  const attributes = new Set<string>();
  
  // Regex to match dot-notation attribute references
  // Matches: word.word, word.word.word, etc.
  // Supports spaces in attribute names: employee.'years of service'
  const attrPattern = /\b([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*|\.'[^']+'))+\b/g;
  
  const matches = code.matchAll(attrPattern);
  for (const match of matches) {
    // Exclude keywords that might match pattern
    const attr = match[0];
    if (!isKeyword(attr)) {
      attributes.add(attr);
    }
  }
  
  return Array.from(attributes);
}

/**
 * Check if a token is a keyword (not an attribute)
 */
function isKeyword(token: string): boolean {
  const keywords = new Set([
    'if', 'then', 'else', 'elsif', 'elseif', 'otherwise', 'end',
    'set', 'to', 'define', 'function', 'return',
    'for', 'each', 'in', 'while', 'do',
    'true', 'false', 'null'
  ]);
  
  return keywords.has(token.toLowerCase());
}
```

### 3. Autocomplete from Props + Code

```tsx
const autocompleteItems = useMemo(() => {
  if (mode === 'bal') {
    // Start with keywords (always available)
    const items = [
      ...BAL_CONTROL_KEYWORDS.map(k => ({ 
        label: k, 
        type: 'keyword',
        description: 'BAL keyword'
      })),
      ...BAL_STATEMENT_KEYWORDS.map(k => ({ 
        label: k, 
        type: 'keyword',
        description: 'BAL statement'
      })),
    ];
    
    // Add attributes from PROPS (if provided by consuming app)
    if (attributes && attributes.length > 0) {
      items.push(...attributes.map(attr => ({
        label: attr.path,
        type: 'attribute',
        description: attr.description || `${attr.type} attribute`,
        dataType: attr.type
      })));
    }
    
    // OR: Add attributes from CODE (dynamic discovery)
    // This could be a fallback if no attributes provided via props
    const codeAttributes = extractBALAttributes(value);
    codeAttributes.forEach(attr => {
      // Only add if not already in list
      if (!items.find(item => item.label === attr)) {
        items.push({
          label: attr,
          type: 'attribute',
          description: 'Referenced in code'
        });
      }
    });
    
    // Add shared constructs
    items.push(...sharedAutocompleteItems);
    
    return items;
  }
  
  // Formula mode...
}, [mode, value, attributes, vocabularyMappings]);
```

### 4. Test Panel Uses Provided Attributes

```tsx
/**
 * FormulaTestPanel discovers attributes dynamically
 */
export function FormulaTestPanel({
  mode,
  variables,
  attributes, // Provided by consuming app OR extracted from code
  formulaCode,
  onEvaluate
}: FormulaTestPanelProps) {
  // Use provided attributes if available
  const attributeList = useMemo(() => {
    if (attributes && attributes.length > 0) {
      return attributes;
    }
    
    // Fallback: Extract from code
    if (mode === 'bal') {
      const paths = extractBALAttributes(formulaCode);
      return paths.map(path => ({
        path,
        type: 'string', // Default type (could try to infer)
        description: 'Auto-detected from code'
      }));
    }
    
    return [];
  }, [mode, attributes, formulaCode]);
  
  // Build nested structure from attribute list
  const nestedAttributes = useMemo(() => {
    return parseAttributeHierarchy(attributeList);
  }, [attributeList]);
  
  // Render nested attribute inputs
  return (
    <div className={styles.testPanel}>
      {Object.entries(nestedAttributes).map(([name, node]) => (
        <NestedAttributeInput
          key={name}
          name={name}
          node={node}
          value={attributeValues[name]}
          onChange={handleAttributeChange}
        />
      ))}
    </div>
  );
}
```

---

## 🎯 How the Examples Inform Architecture

### Example 1: Employee Attributes
```bal
if employee.salary > 50000 then
  eligible
```

**What this teaches us:**
- ✅ Support dot-notation: `object.property`
- ✅ Attributes can be compared with operators
- ✅ Attributes have types (salary is number)

**Architecture decision:**
- Create regex pattern for dot-notation
- Support type inference or type definitions
- Don't hardcode "employee.salary"!

### Example 2: Nested Attributes
```bal
if customer.address.city is equal to "New York" then
  local customer
```

**What this teaches us:**
- ✅ Support multi-level nesting: `object.property.subproperty`
- ✅ Nested structure for test panel
- ✅ String comparison

**Architecture decision:**
- Regex supports unlimited nesting
- Test panel uses recursive component
- Don't hardcode "customer.address.city"!

### Example 3: Attributes with Spaces
```bal
if employee.'years of service' > 5 then
  veteran
```

**What this teaches us:**
- ✅ Support quoted property names with spaces
- ✅ Pattern: `object.'property with spaces'`

**Architecture decision:**
- Regex includes quoted segments: `\.'[^']+'`
- Parser handles quoted identifiers
- Don't hardcode specific employee properties!

### Example 4: Natural Language + Attributes
```bal
if the sum of (order.items) > 10 then
  bulk order
```

**What this teaches us:**
- ✅ Attributes work with natural language functions
- ✅ Attributes can be arrays/collections
- ✅ Integration with existing NL functions

**Architecture decision:**
- Attributes integrate with shared vocabulary
- Support array-type attributes
- Don't hardcode "order.items"!

---

## 📂 Consumer Application Responsibility

### Example: Automations App Defines Its Domain

```tsx
// In the automations app (consuming FormulaEditor)
const AUTOMATION_ATTRIBUTES: AttributeDefinition[] = [
  // Employee domain
  { 
    path: 'employee.salary', 
    type: 'number', 
    description: 'Annual salary',
    unit: 'USD',
    defaultValue: 50000
  },
  { 
    path: 'employee.department', 
    type: 'string', 
    description: 'Department name',
    defaultValue: 'Engineering'
  },
  { 
    path: 'employee.years of service', 
    type: 'number', 
    description: 'Years worked at company',
    defaultValue: 0
  },
  
  // Request domain
  { 
    path: 'request.type', 
    type: 'string', 
    description: 'Type of request',
    defaultValue: 'vacation'
  },
  { 
    path: 'request.duration', 
    type: 'number', 
    description: 'Duration in days',
    unit: 'days',
    defaultValue: 5
  },
  
  // Customer domain
  { 
    path: 'customer.creditScore', 
    type: 'number', 
    description: 'Credit score (300-850)',
    defaultValue: 700
  },
  { 
    path: 'customer.address.city', 
    type: 'string', 
    description: 'City name',
    defaultValue: 'New York'
  },
];

// Use in app
function AutomationBALEditor() {
  return (
    <FormulaEditor
      mode="bal"
      value={balCode}
      onChange={setBalCode}
      attributes={AUTOMATION_ATTRIBUTES} // Domain knowledge
      vocabularyMappings={vocabularyMappings}
    />
  );
}
```

**Benefits:**
- ✅ Domain knowledge stays in domain layer
- ✅ Editor remains reusable across domains
- ✅ Different apps can use different attributes
- ✅ Easy to add new attributes in app code

---

## 🔧 Implementation Strategy

### Phase 1: Build Dynamic Infrastructure

1. **AttributeDefinition interface** - flexible, domain-agnostic
2. **extractBALAttributes()** - dynamic discovery from code
3. **Autocomplete accepts attributes prop** - uses provided definitions
4. **Test panel accepts attributes prop** - builds UI dynamically
5. **No hardcoded examples** - only pattern support

### Phase 2: Use Examples to Test

1. Create test cases with example attributes
2. Verify regex patterns work
3. Verify nested structure parsing works
4. Verify autocomplete suggestions appear
5. Verify test panel renders correctly

### Phase 3: Documentation

1. Document how to provide attributes
2. Show example domain definitions
3. Explain dynamic discovery fallback
4. Show integration patterns

---

## 📋 Key Architectural Principles

### 1. **Separation of Concerns**
- ✅ Editor: Presentation layer, domain-agnostic
- ✅ App: Domain layer, provides business context

### 2. **Flexibility**
- ✅ Works with ANY domain model
- ✅ Adapts to provided attributes
- ✅ Falls back to code extraction

### 3. **No Hardcoding**
- ✅ Examples inform patterns, not implementations
- ✅ Domain knowledge stays in consuming app
- ✅ Editor focuses on syntax and UX

### 4. **Progressive Enhancement**
- ✅ Works with no attributes (basic syntax only)
- ✅ Better with provided attributes (rich autocomplete)
- ✅ Best with typed attributes + defaults (smart test panel)

---

## ✅ Checklist: No Hardcoding

- [ ] No hardcoded BAL_ATTRIBUTES array
- [ ] Attributes accepted via props
- [ ] Dynamic attribute extraction from code
- [ ] Autocomplete built from props + code
- [ ] Test panel uses provided definitions
- [ ] Examples only in documentation/tests
- [ ] Domain-agnostic architecture
- [ ] Flexible attribute structure
- [ ] Support ANY attribute paths
- [ ] Support ANY data types

---

## 🎯 Summary

**Examples provided:**
- `employee.salary`
- `employee.department`
- `employee.years of service`
- `request.type`
- `request.duration`
- `customer.address.city`

**Purpose of examples:**
- ✅ Show dot-notation pattern
- ✅ Show nested structure support
- ✅ Show attributes with spaces
- ✅ Show different data types

**What we build:**
- ✅ Regex to match ANY dot-notation
- ✅ Parser for ANY attribute path
- ✅ Props interface for ANY attributes
- ✅ Test panel for ANY nested structure
- ❌ NOT a hardcoded list of those specific examples!

**Architecture wins:**
- ✅ Reusable across domains
- ✅ Flexible for any business model
- ✅ Maintainable (no hardcoded lists)
- ✅ Testable with example data
- ✅ Domain-agnostic design

---

**The examples are teaching tools, not implementation details!** ✨
