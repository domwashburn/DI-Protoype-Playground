# CORRECTED Understanding: BAL Mode Requirements

**Date:** November 13, 2025  
**Status:** Critical corrections from user feedback  

---

## ❌ INCORRECT Assumptions (What I Got Wrong)

### Wrong #1: Control Flow Keywords are BAL-Specific
**I said:** "Only control flow keywords (`if`, `then`, `else`) are BAL-specific"  
**WRONG!** Formula ALSO supports `if/then/else` control flow!

**Evidence:**
- `/services/evaluationEngine/ast/ASTNodes.ts` defines `IfExpression`
- `/services/evaluationEngine/parsers/FormulaParser.ts` has full `IF/THEN/ELSE/END` parsing
- Formula examples use: `if $age > 18 then "eligible" else "not eligible"`
- Both modes support: `if`, `then`, `else`, `elsif`, `elseif`, `otherwise`, `end`

### Wrong #2: BAL Mode Should Hide Debug/Test Features
**I said:** "Hide debug output and ghost values in BAL mode"  
**WRONG!** BAL should have FULL debug/test capabilities just like Formula!

**User said:**
> "BAL mode should also have a fully featured test and debug mode, just like formula... including a panel that lets you set values for attributes (and their sub attributes)"

---

## ✅ CORRECTED Understanding

### What's Actually SHARED (Both Modes)

#### 1. Control Flow (NOT BAL-specific!)
```
if, then, else, elsif, elseif, otherwise, end
```

**Formula Example:**
```formula
$status = if $age > 18 then "adult" else "minor"
```

**BAL Example:**
```bal
if employee.age > 18 then
  eligible
else
  not eligible
end
```

#### 2. Natural Language Operators
```
is greater than, is less than, is equal to, contains, starts with, etc.
```

#### 3. Natural Language Functions
```
the sum of, the average of, the count of, the first item in, etc.
```

#### 4. Standard Functions
```
SUM, AVG, COUNT, MAX, MIN, FIRST, LAST, etc.
```

#### 5. Vocabulary Mappings (User-Defined)
```
'customer name' → variable/attribute
'total amount' → variable/attribute
```

#### 6. Debug & Test Features (NOT Formula-only!)
- ✅ Debug output column
- ✅ Ghost values showing intermediate results
- ✅ Test panel with value inputs
- ✅ Step-through debugger
- ✅ Execution trace
- ✅ Branch indicators

---

### What's Actually DIFFERENT

#### Formula-Specific Syntax:
```tsx
// Variable assignment with $
$totalAmount = #price + #tax

// Variable references with $
$total = $subtotal + $shipping

// Attribute references with #
$age = #customer.age
```

#### BAL-Specific Syntax:
```tsx
// Statement keywords
set the total to price + tax
define function calculate_bonus
return the result

// Dot notation attributes (NO # prefix)
employee.salary
employee.department.name
customer.address.city

// Iteration
for each employee in employees
  process employee
```

---

## 🎯 NEW Requirement: Nested Attribute Support

**User said:**
> "extend the test panel to support nested attributes for easier management"

### Current Limitation:
Test panel only handles flat attributes:
```tsx
attributeValues = {
  'employee.salary': '50000',
  'employee.age': '35'
}
```

### Required: Nested Object Structure
```tsx
attributeValues = {
  employee: {
    salary: 50000,
    age: 35,
    department: {
      name: 'Engineering',
      budget: 1000000
    },
    address: {
      city: 'New York',
      state: 'NY',
      zip: '10001'
    }
  },
  customer: {
    name: 'John Doe',
    creditScore: 750
  }
}
```

### Benefits:
- ✅ Easier to manage hierarchical data
- ✅ Visual grouping of related attributes
- ✅ Expandable/collapsible sections
- ✅ Clear parent-child relationships
- ✅ Easier to set entire objects at once

### UI Structure Needed:
```tsx
<div className={styles.attributeSection}>
  <div className={styles.objectHeader}>
    <ChevronDown /> {/* Expandable */}
    <span>employee</span>
  </div>
  
  {expanded && (
    <div className={styles.nestedAttributes}>
      <div className={styles.inputRow}>
        <label>salary</label>
        <Input type="number" value={50000} />
      </div>
      
      <div className={styles.inputRow}>
        <label>age</label>
        <Input type="number" value={35} />
      </div>
      
      {/* Nested object */}
      <div className={styles.nestedObject}>
        <div className={styles.objectHeader}>
          <ChevronDown />
          <span>department</span>
        </div>
        
        <div className={styles.nestedAttributes}>
          <div className={styles.inputRow}>
            <label>name</label>
            <Input type="text" value="Engineering" />
          </div>
          
          <div className={styles.inputRow}>
            <label>budget</label>
            <Input type="number" value={1000000} />
          </div>
        </div>
      </div>
    </div>
  )}
</div>
```

---

## 📋 Revised Implementation Plan

### Phase 1A: Mode Prop + Keep All Features (1 hour)

**DON'T HIDE:**
- ❌ ~~Hide debug output~~
- ❌ ~~Hide ghost values~~
- ❌ ~~Hide test panel~~

**ONLY HIDE:**
- ✅ Variable table (BAL doesn't define variables inline)
- ✅ "Convert to variable" button
- ✅ Variable verbalization hints (if any)

```tsx
export interface FormulaEditorProps {
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
  vocabularyMappings?: Array<{ term: string; definition: string }>;
  attributes?: AttributeDefinition[]; // For test panel
  
  // Shared debug props
  onDebugHighlight?: (highlight: DebugHighlight | null) => void;
  onErrorHighlight?: (error: ErrorHighlight | null) => void;
}
```

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

{/* Debug features SHARED by both modes! */}
{debugMode && (
  <>
    <DebugOutputColumn trace={executionTrace} />
    <GhostValue values={intermediateValues} />
    <BranchIndicator activeBranch={activeBranch} />
  </>
)}

{/* Test panel SHARED by both modes! */}
<FormulaTestPanel
  mode={mode}
  variables={mode === 'formula' ? variables : []}
  attributes={mode === 'bal' ? attributes : []}
  formulaCode={value}
  onEvaluate={handleEvaluate}
/>
```

### Phase 1B: Nested Attribute Support in Test Panel (2-3 hours)

**NEW REQUIREMENT!**

#### 1. Parse Nested Attribute Structure (30 min)
```tsx
/**
 * Parse flat dot-notation attributes into nested object structure
 * 
 * @example
 * Input: ['employee.salary', 'employee.department.name', 'customer.age']
 * Output: {
 *   employee: {
 *     salary: { type: 'number', value: null },
 *     department: {
 *       name: { type: 'string', value: null }
 *     }
 *   },
 *   customer: {
 *     age: { type: 'number', value: null }
 *   }
 * }
 */
function parseAttributeHierarchy(
  attributes: string[],
  definitions: Record<string, AttributeDefinition>
): NestedAttributeStructure {
  const root: any = {};
  
  attributes.forEach(attr => {
    const parts = attr.split('.');
    let current = root;
    
    parts.forEach((part, i) => {
      const isLeaf = i === parts.length - 1;
      
      if (isLeaf) {
        // Leaf node - actual attribute with type and value
        const def = definitions[attr];
        current[part] = {
          type: def?.type || 'string',
          value: null,
          fullPath: attr
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

#### 2. Expandable Nested Attribute UI (1 hour)
```tsx
/**
 * Recursive component for nested attribute rendering
 */
function NestedAttributeInput({
  name,
  node,
  path = [],
  value,
  onChange
}: NestedAttributeInputProps) {
  const [expanded, setExpanded] = useState(true);
  const fullPath = [...path, name].join('.');
  
  // Check if this is a leaf node (actual attribute) or object node
  const isLeaf = node.type !== undefined;
  
  if (isLeaf) {
    // Leaf node - render input
    return (
      <div className={styles.inputRow}>
        <label className={styles.attributeLabel}>
          {name}
          <span className={styles.attributeType}>
            {node.type}
          </span>
        </label>
        
        <TypedInput
          type={node.type}
          value={value}
          onChange={(newValue) => onChange(fullPath, newValue)}
        />
      </div>
    );
  }
  
  // Object node - render expandable section
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
        <span className={styles.attributeCount}>
          {Object.keys(node).length} properties
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
              value={getNestedValue(value, [...path, name, childName])}
              onChange={onChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

#### 3. Value Management (30 min)
```tsx
// Store values in nested structure
const [attributeValues, setAttributeValues] = useState<NestedAttributeValues>({});

// Helper to set nested value
function setNestedValue(path: string, value: any) {
  setAttributeValues(prev => {
    const newValues = { ...prev };
    const parts = path.split('.');
    let current: any = newValues;
    
    // Navigate to parent
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }
    
    // Set leaf value
    current[parts[parts.length - 1]] = value;
    
    return newValues;
  });
}

// Helper to get nested value
function getNestedValue(obj: any, path: string[]): any {
  let current = obj;
  for (const part of path) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return current;
}

// Convert nested structure to flat for evaluation engine
function flattenAttributeValues(nested: NestedAttributeValues): Record<string, any> {
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

#### 4. Integration with Evaluation Engine (30 min)
```tsx
// When evaluating, flatten nested structure
const handleEvaluate = () => {
  const flatAttributes = flattenAttributeValues(attributeValues);
  
  // Convert to Map for evaluation engine
  const attributes = new Map<string, any>();
  for (const [key, value] of Object.entries(flatAttributes)) {
    attributes.set(key, value);
  }
  
  // Evaluate with attributes
  const result = engine.evaluate(formulaCode, variables, attributes);
  setResult(result);
};
```

### Phase 1C: Shared + Mode-Specific Autocomplete (1 hour)
Same as before, but now we know even more is shared!

### Phase 1D: Tab Indentation (1 hour)
Same as before.

### Phase 1E: BAL Attribute Autocomplete (30 min)
Add dot-notation attributes to BAL autocomplete.

---

## 📊 Revised Timeline

| Phase | Task | Time | Notes |
|-------|------|------|-------|
| 1A | Mode prop + keep debug features | 1 hour | DON'T hide debug/test! |
| 1B | Nested attribute support | 2-3 hours | NEW REQUIREMENT |
| 1C | Shared + mode autocomplete | 1 hour | Even more is shared now! |
| 1D | Tab indentation | 1 hour | Same as before |
| 1E | BAL attribute autocomplete | 30 min | Dot notation |
| **Phase 1 Total** | | **5.5-6.5 hours** | Increased due to nested attributes |
| 2 | Migrate consumers | 1 hour | |
| 3 | Cleanup | 30 min | |
| **GRAND TOTAL** | | **7-8 hours** | More complex than originally thought |

---

## ✅ What's Actually BAL-Specific (FINAL)

### Only These Are BAL-Specific:

1. **Statement keywords:** `set`, `define`, `return`
2. **Iteration keywords:** `for`, `each`, `in`, `while`, `do`
3. **Dot notation attributes:** `employee.salary` (vs `#employee.salary`)
4. **No $ for variables** (uses natural language instead)

### Everything Else is SHARED:

- ✅ Control flow: `if`, `then`, `else`, `elsif`, `end`
- ✅ Natural language operators: `is greater than`, etc.
- ✅ Natural language functions: `the sum of`, etc.
- ✅ Standard functions: `SUM`, `AVG`, etc.
- ✅ Vocabulary mappings
- ✅ Debug output
- ✅ Ghost values
- ✅ Test panel
- ✅ Step-through debugger

**BAL and Formula are much MORE similar than I thought!**

---

## 🎯 Success Criteria (UPDATED)

### Must Have:
1. ✅ Both modes get full debug features (output, ghost, test panel)
2. ✅ Test panel supports nested attributes with hierarchical UI
3. ✅ Nested attributes are expandable/collapsible
4. ✅ Attributes can be set as nested objects or flat paths
5. ✅ BAL mode shows correct autocomplete (shared + BAL-specific)
6. ✅ Formula mode shows correct autocomplete (shared + Formula-specific)
7. ✅ Only variable management hidden in BAL mode
8. ✅ Tab indentation works in both modes
9. ✅ All Formula features still work (regression-free)

### Nice to Have:
- Bulk import of attribute values (JSON paste)
- Export attribute values to JSON
- Preset attribute configurations
- Attribute value validation with type checking

---

## 🚀 Ready to Implement (After Approval)

**Key Changes from Previous Plan:**

1. ✅ **DON'T hide debug features** - both modes get full debug/test
2. ✅ **ADD nested attribute support** - new requirement for test panel
3. ✅ **Even more is shared** - control flow is shared, not BAL-specific!
4. ✅ **Larger scope** - 7-8 hours instead of 4.5-5.5 hours

**Waiting for approval to proceed!** 🎯