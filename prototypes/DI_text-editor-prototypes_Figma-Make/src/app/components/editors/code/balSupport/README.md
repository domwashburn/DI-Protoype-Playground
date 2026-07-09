# BAL Support Utilities

Utilities for Business Action Language (BAL) support in the unified FormulaEditor.

## Overview

BAL is a natural language business rule syntax that uses:
- **Dot notation attributes**: `employee.salary`, `customer.address.city`
- **Natural language**: "if employee salary is greater than 50000"
- **No variable prefixes**: Variables are internal to evaluation, hidden from user

This directory provides utilities for:
1. Extracting attributes from BAL code
2. Parsing flat attributes into nested hierarchies
3. Managing nested attribute values
4. Flattening for evaluation engine

## Files

### `balAttributeUtils.ts`
Core utilities for BAL attribute handling:

**Extraction:**
- `extractBALAttributes(code)` - Extract attributes from BAL code

**Hierarchy:**
- `parseAttributeHierarchy(defs)` - Convert flat to nested structure
- `isLeafNode(node)` - Check if node is leaf or object
- `countProperties(node)` - Count properties for UI display

**Value Management:**
- `setNestedValue(obj, path, value)` - Set value at dot-notation path (immutable)
- `getNestedValue(obj, path)` - Get value at path array
- `flattenAttributeValues(nested)` - Flatten nested to dot-notation

### `index.ts`
Barrel export for all BAL utilities

### `BAL_MODE_DEMO.md`
Comprehensive demo and usage guide showing:
- Basic usage examples
- Formula vs BAL mode comparison
- Test panel nested UI behavior
- Migration path
- Performance considerations

## Types

```typescript
// Attribute definition for test panel
interface AttributeDefinition {
  path: string;           // 'employee.salary'
  type: 'string' | 'number' | 'boolean' | 'date' | 'time' | 'datetime';
  description?: string;   // 'Annual salary'
  defaultValue?: any;     // 60000
  unit?: string;          // 'USD'
}

// Nested attribute node for hierarchical UI
interface NestedAttributeNode {
  // Leaf node (actual attribute)
  type?: string;
  description?: string;
  defaultValue?: any;
  unit?: string;
  fullPath?: string;
  
  // Object node (has children)
  [key: string]: NestedAttributeNode | any;
}
```

## Usage Example

```typescript
import { 
  extractBALAttributes, 
  parseAttributeHierarchy,
  flattenAttributeValues,
  setNestedValue 
} from './balSupport';

// Extract attributes from code
const code = "if employee.salary > 50000 then approve else reject end";
const attrs = extractBALAttributes(code);
// => ["employee.salary"]

// Parse into hierarchy
const defs = [
  { path: 'employee.salary', type: 'number' },
  { path: 'employee.name', type: 'string' }
];
const hierarchy = parseAttributeHierarchy(defs);
// => { employee: { salary: {...}, name: {...} } }

// Set nested value
const values = {};
const updated = setNestedValue(values, 'employee.salary', 60000);
// => { employee: { salary: 60000 } }

// Flatten for evaluation
const flat = flattenAttributeValues(updated);
// => { 'employee.salary': 60000 }
```

## Integration

### FormulaEditor
```tsx
<FormulaEditor
  mode="bal"
  value={code}
  onChange={setCode}
  attributes={attributeDefs}
/>
```

### FormulaTestPanel
```tsx
<FormulaTestPanel
  mode="bal"
  attributes={attributeDefs}
  formulaCode={code}
  returnType="number"
  variables={[]}
/>
```

### NestedAttributeInput
Recursive component for rendering nested attributes:

```tsx
<NestedAttributeInput
  name="employee"
  node={hierarchyNode}
  values={nestedValues}
  onChange={handleChange}
  predefinedValues={{}}
/>
```

## Architecture

```
BAL Code → extractBALAttributes → Attribute Paths
  ↓
Attribute Definitions → parseAttributeHierarchy → Nested Structure
  ↓
NestedAttributeInput (UI) → User Input → Nested Values
  ↓
flattenAttributeValues → Flat Values
  ↓
Evaluation Engine
```

## Testing

Key scenarios to test:
1. ✅ Extract simple attributes: `employee.salary`
2. ✅ Extract nested attributes: `customer.address.city`
3. ✅ Extract quoted attributes: `employee.'years of service'`
4. ✅ Parse flat to nested structure
5. ✅ Set nested values immutably
6. ✅ Flatten nested values back to dot-notation
7. ✅ Handle 3+ levels of nesting
8. ✅ UI expand/collapse behavior

## Performance

- **Extraction**: O(n) where n = code length
- **Hierarchy parsing**: O(m) where m = number of attributes
- **Set nested value**: O(d) where d = depth of path
- **Flatten**: O(m) where m = total leaf attributes

All operations are efficient for typical use cases (< 100 attributes, < 5 levels deep).

## Future Enhancements

See `BAL_MODE_DEMO.md` for detailed roadmap.

Priority items:
1. Array attribute support: `orders[0].total`
2. Attribute value validation (min/max, regex)
3. Predefined value dropdowns
4. Attribute search/filter for large sets
