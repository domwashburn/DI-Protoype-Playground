# Future Enhancement: List/Array as Variable Type

**Status:** 📋 Planned  
**Priority:** Medium  
**Estimated Effort:** Small (0.5-1 day)  
**Dependencies:** List/Array Type Support (Complete ✅)  

---

## Executive Summary

Currently, the Variables panel in the Formula Editor supports these types:
- Number
- String  
- Boolean
- Date
- Time

**Enhancement Goal:** Add **List** (Array) as a selectable variable type, enabling users to provide test data for formulas that work with lists.

---

## Current State

**Variables Panel Type Dropdown:**
```
┌─ TYPE ──────────────────┐
│ Number            ✓     │
│ String                  │
│ Boolean                 │
│ Date                    │
│ Time                    │
└─────────────────────────┘
```

**Limitation:** Users cannot test formulas with list variables unless they manually edit the formula or create list literals inline.

---

## Proposed Enhancement

**Updated Type Dropdown:**
```
┌─ TYPE ──────────────────┐
│ Number            ✓     │
│ String                  │
│ Boolean                 │
│ Date                    │
│ Time                    │
│ List                    │ ← NEW
└─────────────────────────┘
```

**UI Flow:**
1. User selects "List" type
2. Additional dropdown appears: "Element Type"
   - Number
   - String
   - Boolean
   - Date
   - Time
3. Input method options:
   - **JSON Array Input** - Enter `[1, 2, 3]` directly
   - **Visual List Editor** - Add/remove items with buttons
   - **CSV Input** - Enter `1, 2, 3` and auto-convert

---

## UI Mockup

### Compact Version (JSON Input)
```
┌────────────────────────────────────────────────────────┐
│ $ variableName                                    ✓ ✗  │
├────────────────────────────────────────────────────────┤
│ TYPE                                                   │
│ ┌────────────────────────────────────────┐            │
│ │ List                              ▼    │            │
│ └────────────────────────────────────────┘            │
│                                                        │
│ ELEMENT TYPE                                           │
│ ┌────────────────────────────────────────┐            │
│ │ Number                            ▼    │            │
│ └────────────────────────────────────────┘            │
│                                                        │
│ VALUE (JSON Array)                                     │
│ ┌────────────────────────────────────────┐            │
│ │ [1, 2, 3, 4, 5]                        │            │
│ └────────────────────────────────────────┘            │
│                                                        │
│ ✓ Valid list of numbers (5 items)                     │
└────────────────────────────────────────────────────────┘
```

### Expanded Version (Visual Editor)
```
┌────────────────────────────────────────────────────────┐
│ $ salesAmounts                                    ✓ ✗  │
├────────────────────────────────────────────────────────┤
│ TYPE: List<Number>                                     │
│                                                        │
│ ITEMS (5 total)                                        │
│ ┌──────────────────────────────────────────────────┐  │
│ │ [0] 45000                                    ✗   │  │
│ │ [1] 78000                                    ✗   │  │
│ │ [2] 52000                                    ✗   │  │
│ │ [3] 91000                                    ✗   │  │
│ │ [4] 63000                                    ✗   │  │
│ └──────────────────────────────────────────────────┘  │
│                                                        │
│ + Add Item                                             │
│                                                        │
│ [ Switch to JSON Input ]                               │
└────────────────────────────────────────────────────────┘
```

---

## Implementation Details

### 1. Type System Updates

**Add List type to variable type enum:**
```typescript
export type VariableType = 
  | 'number' 
  | 'string' 
  | 'boolean' 
  | 'date' 
  | 'time'
  | 'list';  // NEW

export interface ListVariableMetadata {
  elementType: 'number' | 'string' | 'boolean' | 'date' | 'time';
}

export interface Variable {
  id: string;
  name: string;
  type: VariableType;
  description?: string;
  listMetadata?: ListVariableMetadata;  // NEW - only for list types
}
```

### 2. Variable Table Updates

**VariableTable Component (`/components/editors/code/shared/components/VariableTable`):**

```typescript
// Add List to type options
const TYPE_OPTIONS = [
  { value: 'number', label: 'Number' },
  { value: 'string', label: 'String' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'date', label: 'Date' },
  { value: 'time', label: 'Time' },
  { value: 'list', label: 'List' }  // NEW
];

// Conditional element type selector
{variable.type === 'list' && (
  <div className={styles.elementTypeSelector}>
    <label>Element Type</label>
    <Select
      value={variable.listMetadata?.elementType || 'number'}
      onChange={(e) => updateListElementType(variable.id, e.target.value)}
    >
      <option value="number">Number</option>
      <option value="string">String</option>
      <option value="boolean">Boolean</option>
      <option value="date">Date</option>
      <option value="time">Time</option>
    </Select>
  </div>
)}
```

### 3. Input Methods

**Phase 1: JSON Array Input (Simplest)**
- Text input with JSON validation
- Parse with `JSON.parse()`
- Validate all elements match element type
- Display element count and validation status

```typescript
const validateListInput = (input: string, elementType: string): ValidationResult => {
  try {
    const parsed = JSON.parse(input);
    
    if (!Array.isArray(parsed)) {
      return { valid: false, error: 'Input must be an array' };
    }
    
    if (parsed.length === 0) {
      return { valid: false, error: 'Array cannot be empty' };
    }
    
    // Validate homogeneous types
    for (const item of parsed) {
      if (!matchesType(item, elementType)) {
        return { 
          valid: false, 
          error: `All elements must be ${elementType}` 
        };
      }
    }
    
    return { 
      valid: true, 
      count: parsed.length,
      message: `Valid list of ${elementType} (${parsed.length} items)`
    };
  } catch (e) {
    return { valid: false, error: 'Invalid JSON format' };
  }
};
```

**Phase 2: Visual List Editor (Enhancement)**
- Add/remove items with buttons
- Inline editing of each item
- Type-specific input widgets per element

**Phase 3: CSV Input (Convenience)**
- Enter comma-separated values
- Auto-parse and convert to array
- Useful for quick data entry

### 4. Test Value Generation

**Update `useFormulaVariables` hook:**
```typescript
const generateTestValue = (variable: Variable): any => {
  switch (variable.type) {
    case 'number':
      return 0;
    case 'string':
      return '';
    case 'boolean':
      return false;
    case 'date':
      return new Date().toISOString().split('T')[0];
    case 'time':
      return '00:00:00';
    case 'list':  // NEW
      return generateListTestValue(variable.listMetadata);
    default:
      return null;
  }
};

const generateListTestValue = (metadata?: ListVariableMetadata): any[] => {
  if (!metadata) return [];
  
  const elementType = metadata.elementType;
  
  // Generate 3 sample items
  switch (elementType) {
    case 'number':
      return [1, 2, 3];
    case 'string':
      return ['item1', 'item2', 'item3'];
    case 'boolean':
      return [true, false, true];
    case 'date':
      return [
        '2025-01-01',
        '2025-02-01',
        '2025-03-01'
      ];
    case 'time':
      return ['08:00:00', '12:00:00', '17:00:00'];
    default:
      return [];
  }
};
```

---

## Validation Rules

### Type Validation
✅ **Valid:**
```json
// List<Number>
[1, 2, 3, 4, 5]
[10.5, 20.25, 30.75]

// List<String>
["apple", "banana", "cherry"]
["Alice", "Bob", "Charlie"]

// List<Boolean>
[true, false, true, true]

// List<Date>
["2025-01-01", "2025-02-15", "2025-03-30"]
```

❌ **Invalid:**
```json
// Mixed types
[1, "two", 3]  // ERROR: Mixed number and string

// Nested lists
[[1, 2], [3, 4]]  // ERROR: Nested lists not supported

// Empty array
[]  // ERROR: Cannot infer type from empty array

// Wrong element type
// List<Number> but got strings
["1", "2", "3"]  // ERROR: Elements must be numbers
```

### Homogeneity Enforcement
- All elements must be the same type
- Type must match declared element type
- Clear error messages for mismatches

---

## User Experience Improvements

### 1. Smart Defaults
- When selecting "List" type, default to `List<Number>`
- Pre-populate with sample data: `[1, 2, 3]`
- User can immediately test without manual input

### 2. Validation Feedback
```
Input: [1, 2, 3, 4, 5]
✓ Valid list of numbers (5 items)

Input: [1, "two", 3]
✗ All elements must be numbers (found string at index 1)

Input: []
✗ Array cannot be empty
```

### 3. Quick Actions
- **Copy from formula** - Extract list literal from formula code
- **Import from CSV** - Paste CSV data, auto-convert
- **Clear all** - Reset to empty list
- **Add sample** - Insert type-appropriate sample data

---

## Sample Use Cases

### Use Case 1: Sales Analysis
```
Variable: $salesAmounts
Type: List<Number>
Value: [45000, 78000, 52000, 91000, 63000]

Formula:
$total = LIST_SUM($salesAmounts)
$average = LIST_AVG($salesAmounts)
$best = LIST_MAX($salesAmounts)

Test Result: 
total = 329000
average = 65800
best = 91000
```

### Use Case 2: Customer Names
```
Variable: $customerNames
Type: List<String>
Value: ["Alice Chen", "Bob Smith", "Charlie Brown"]

Formula:
$count = LENGTH($customerNames)
$first = FIRST($customerNames)
$sorted = SORT($customerNames)

Test Result:
count = 3
first = "Alice Chen"
sorted = ["Alice Chen", "Bob Smith", "Charlie Brown"]
```

### Use Case 3: Status Flags
```
Variable: $completedTasks
Type: List<Boolean>
Value: [true, false, true, true, false]

Formula:
$total = LENGTH($completedTasks)
$completed = COUNT($completedTasks, true)
$percentComplete = ($completed / $total) * 100

Test Result:
total = 5
completed = 3
percentComplete = 60
```

---

## Implementation Phases

### Phase 1: Basic JSON Input (0.5 day)
**Goal:** Users can type JSON arrays directly

- [ ] Add "List" to type dropdown
- [ ] Add element type selector
- [ ] JSON input field with validation
- [ ] Display validation status and item count
- [ ] Update test value generation
- [ ] Sample data for different element types

**Deliverable:** Users can create list variables with JSON input

### Phase 2: Visual List Editor (Future)
**Goal:** Point-and-click list editing

- [ ] Add/remove item buttons
- [ ] Inline editing per item
- [ ] Type-specific input widgets
- [ ] Drag-and-drop reordering
- [ ] Duplicate item detection

**Deliverable:** Full visual editor for list construction

### Phase 3: Advanced Features (Future)
**Goal:** Power user conveniences

- [ ] CSV import/export
- [ ] Copy list from formula
- [ ] Generate sample data automatically
- [ ] List templates (common patterns)
- [ ] Import from file (JSON/CSV)

---

## Technical Considerations

### Storage Format
```typescript
// Variable with list type
{
  id: 'var-1',
  name: 'salesAmounts',
  type: 'list',
  listMetadata: {
    elementType: 'number'
  },
  testValue: [45000, 78000, 52000, 91000, 63000],
  description: 'Monthly sales amounts'
}
```

### Backward Compatibility
- Existing formulas unaffected
- Existing variables unchanged
- New `listMetadata` field is optional
- Graceful handling of missing metadata

### Type Safety
- Runtime validation of test values
- Compile-time type checking in TypeScript
- Integration with evaluation engine type system

---

## Benefits

### For Formula Authors
✅ **Test list-based formulas** without inline literals  
✅ **Reuse test data** across multiple formulas  
✅ **Clear variable documentation** with types  
✅ **Visual validation** of list contents  
✅ **Quick prototyping** with sample data  

### For The System
✅ **Consistent type system** across all features  
✅ **Better testing** for list functions  
✅ **Improved UX** with visual feedback  
✅ **Foundation for objects** (Increment 3.1)  

---

## Future Extensions

### Object Type Support (Post Increment 3.1)
Once arrays of objects are implemented, extend to:

```
Variable: $salesData
Type: List<Object>
Object Shape: {name: String, amount: Number}
Value: [
  {name: "Alice", amount: 45000},
  {name: "Bob", amount: 78000}
]
```

### Nested Structures (Far Future)
```
Variable: $nestedData
Type: List<Object>
Object Shape: {
  customer: Object{name: String, company: String},
  order: Object{amount: Number, date: Date}
}
```

---

## Success Criteria

✅ Users can select "List" as a variable type  
✅ Element type is selectable (Number, String, Boolean, Date, Time)  
✅ JSON array input is validated  
✅ Validation errors are clear and actionable  
✅ Test values are correctly passed to evaluation engine  
✅ List functions work with test variables  
✅ Type mismatches are caught and reported  
✅ Sample data can be generated automatically  

---

## Open Questions

1. **Default element type?** Start with Number or prompt user to choose?
   - **Recommendation:** Default to Number (most common use case)

2. **Empty arrays allowed?** Or require at least one element?
   - **Recommendation:** Require at least one element for type inference

3. **Max list size?** Should we limit to prevent performance issues?
   - **Recommendation:** Soft limit of 1000 items with warning

4. **Import formats?** Support CSV, JSON, or both?
   - **Recommendation:** Start with JSON only, add CSV in Phase 3

---

## Related Work

- **Increment 3:** Advanced list functions (SLICE, CONCAT, UNIQUE, SORT) ✅
- **Increment 3.1:** Arrays of objects (In Progress)
- **Increment 4:** Lambda expressions (Planned)
- **EPIC:** Formula Type System & Runtime Type Checking (Planned)

---

## References

- **Screenshot:** Variables panel showing type dropdown (Number, String, Boolean, Date, Time)
- **Increment 3:** `/change-log/25-10-27_v02-ListArrayTypeIncrement3.md`
- **Variable Table:** `/components/editors/code/shared/components/VariableTable/`
- **Type System:** `/services/evaluationEngine/types/TypeSystem.ts`

---

**Status:** 📋 Documented - Ready for Implementation  
**Next Step:** Prioritize and schedule implementation  
**Estimated Timeline:** 0.5 day for Phase 1 (JSON input)
