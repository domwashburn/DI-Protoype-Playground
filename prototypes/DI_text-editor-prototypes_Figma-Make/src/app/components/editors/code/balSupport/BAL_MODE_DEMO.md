# BAL Mode Demo & Usage Guide

This document shows how to use FormulaEditor in BAL mode with nested attributes.

## Basic Usage

```tsx
import { FormulaEditor } from './components/editors/code/FormulaEditor/FormulaEditor';
import { FormulaTestPanel } from './components/editors/code/FormulaEditor/FormulaTestPanel';

function BALEditorDemo() {
  const [code, setCode] = useState(`
if employee.salary > 50000 and employee.years of service >= 5 then
  set bonus to employee.salary * 0.10
else
  set bonus to employee.salary * 0.05
end

return bonus
  `.trim());

  // Define nested attributes
  const attributes = [
    {
      path: 'employee.salary',
      type: 'number' as const,
      description: 'Annual salary',
      unit: 'USD',
      defaultValue: 60000
    },
    {
      path: 'employee.years of service',
      type: 'number' as const,
      description: 'Years with company',
      defaultValue: 7
    },
    {
      path: 'employee.name',
      type: 'string' as const,
      description: 'Employee full name',
      defaultValue: 'John Smith'
    },
    {
      path: 'employee.department.name',
      type: 'string' as const,
      description: 'Department name',
      defaultValue: 'Engineering'
    },
    {
      path: 'employee.department.budget',
      type: 'number' as const,
      description: 'Department annual budget',
      unit: 'USD',
      defaultValue: 1000000
    },
  ];

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {/* BAL Editor */}
      <div style={{ flex: 1 }}>
        <FormulaEditor
          mode="bal"
          value={code}
          onChange={setCode}
          attributes={attributes}
          placeholder="Enter business rule..."
        />
      </div>

      {/* Test Panel with Nested Attributes */}
      <div style={{ width: '400px' }}>
        <FormulaTestPanel
          mode="bal"
          attributes={attributes}
          formulaCode={code}
          returnType="number"
          variables={[]} // BAL mode doesn't need variable table
        />
      </div>
    </div>
  );
}
```

## Key Differences: Formula Mode vs BAL Mode

### Formula Mode (default)
- **Variables**: Uses `$variableName` syntax
- **Convert to Variable**: Button appears on selection
- **Variable Table**: Full variable management table shown
- **Test Panel**: Flat attribute list
- **Attributes**: Uses `#attribute` syntax

### BAL Mode
- **Variables**: Hidden from user (internal only for evaluation)
- **Convert to Variable**: Hidden (not applicable)
- **Variable Table**: Not shown (handled by parent)
- **Test Panel**: Hierarchical nested attribute inputs
- **Attributes**: Dot notation `object.property.subproperty`

## Test Panel: Nested Attributes UI

The test panel automatically creates a hierarchical UI from flat attribute definitions:

```
Input attributes:
  - employee.salary
  - employee.name
  - employee.department.name
  - employee.department.budget

Renders as:
  ▼ employee (4 properties)
    salary: [60000] (number, USD)
    name: [John Smith] (string)
    ▼ department (2 properties)
      name: [Engineering] (string)
      budget: [1000000] (number, USD)
```

## Attribute Utilities

### `extractBALAttributes(code: string)`
Extracts dot-notation attributes from BAL code:

```typescript
extractBALAttributes("if employee.salary > 50000 then...")
// Returns: ["employee.salary"]
```

### `parseAttributeHierarchy(attributes: AttributeDefinition[])`
Converts flat attribute definitions to nested structure:

```typescript
parseAttributeHierarchy([
  { path: 'employee.salary', type: 'number' },
  { path: 'employee.name', type: 'string' }
])
// Returns:
// {
//   employee: {
//     salary: { type: 'number', fullPath: 'employee.salary' },
//     name: { type: 'string', fullPath: 'employee.name' }
//   }
// }
```

### `flattenAttributeValues(nested: any)`
Flattens nested values back to dot-notation for evaluation:

```typescript
flattenAttributeValues({
  employee: {
    salary: 60000,
    name: 'John'
  }
})
// Returns: { 'employee.salary': 60000, 'employee.name': 'John' }
```

## Implementation Details

### State Management

**Formula Mode:**
- `attributeValues`: Flat object `{ 'customer.age': '25' }`

**BAL Mode:**
- `nestedAttributeValues`: Nested object `{ customer: { age: 25 } }`
- `attributeValues`: Auto-synced flat version for evaluation

### Evaluation Engine

Both modes use the same evaluation engine. The test panel:
1. Collects nested values in BAL mode
2. Flattens to dot-notation
3. Passes to evaluation engine (which expects flat format)

### Attribute Type Support

All types supported in both modes:
- `string`: Text input or dropdown
- `number`: Number input or dropdown
- `boolean`: Toggle switch
- `date`: Calendar picker
- `time`: Time input
- `datetime`: Datetime-local input

## Migration Path

Existing Formula mode code is 100% backward compatible:

```tsx
// Formula mode (unchanged)
<FormulaEditor
  value={code}
  onChange={setCode}
  variables={variables}
  onVariablesChange={setVariables}
/>

// BAL mode (new)
<FormulaEditor
  mode="bal"
  value={code}
  onChange={setCode}
  attributes={attributes}
/>
```

## Performance Considerations

### Nested Attributes
- Hierarchy is computed once via `useMemo`
- Only re-computes when attribute definitions change
- Expandable/collapsible sections reduce DOM overhead

### Attribute Flattening
- Flattened on every change for evaluation
- Efficient for moderate nesting (3-4 levels deep)
- Could be optimized with immutable updates if needed

## Future Enhancements

### Phase 2 (Optional)
- Predefined value dropdowns from attribute definitions
- Attribute value validation (min/max, patterns)
- Array/list attributes (e.g., `orders[0].total`)
- Attribute search/filter for large hierarchies

### Phase 3 (Optional)
- Attribute editor (add/remove/edit definitions)
- Import attributes from JSON schema
- Export test cases with attribute values
- Attribute value history/presets
