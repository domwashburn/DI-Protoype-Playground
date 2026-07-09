# Variable Verbalization - Phase 1: Foundation

**Date:** November 5, 2025  
**Epic:** [EPIC-VariableVerbalization.md](/planning/epics/EPIC-VariableVerbalization.md)  
**Phase:** 1 of 7 - Variable Verbalization Foundation  
**Status:** ✅ Complete  

---

## Summary

Implemented the foundation for variable verbalization, enabling natural language aliases for variables (e.g., `'customer name'` for `$customerName`). Added verbalization support to the Variable type, created bidirectional mapping utilities, and updated VariableTable UI with verbalization editing and real-time validation.

**Key Achievement:** Business users can now assign natural language names to technical variables, making formulas more readable and accessible.

---

## Changes Implemented

### 1. Variable Type Extension

**File:** `/components/editors/core/types/EditorTypes.ts`

Added `verbalization` property to Variable interface:

```typescript
export interface Variable {
  // ... existing properties
  /** Optional natural language alias (e.g., "customer name" for $customerName) */
  verbalization?: string;
}
```

Added new interfaces for verbalization mapping:

```typescript
export interface VerbalizationMap {
  variableToVerbalization: Map<string, string>;
  verbalizationToVariable: Map<string, string>;
}

export interface VerbalizationValidation {
  valid: boolean;
  error?: string;
  conflictingVariable?: string;
}
```

**Why:** Foundation for storing and managing natural language aliases alongside technical variable names.

---

### 2. Verbalization Utilities

**File:** `/utils/verbalizationUtils.ts` (NEW)

Created comprehensive utility module for verbalization management:

**Functions:**
- `buildVerbalizationMap()` - Build bidirectional lookup between variables and verbalizations
- `validateVerbalization()` - Check uniqueness and conflicts (case-insensitive)
- `resolveVerbalization()` - Resolve verbalization to variable name
- `getVerbalization()` - Get verbalization for a variable
- `hasVerbalization()` - Check if verbalization exists
- `getAllVerbalizations()` - Get all defined verbalizations
- `getVariablesWithVerbalizations()` - Filter variables with verbalizations
- `normalizeVerbalization()` - Normalize for consistent comparison

**Key Features:**
- Case-insensitive matching (stored as lowercase)
- Bidirectional mapping for fast lookups in both directions
- Comprehensive validation preventing duplicates and conflicts
- Whitespace normalization and trimming

**Example:**
```typescript
const map = buildVerbalizationMap(variables);
// map.verbalizationToVariable.get('customer name') → '$customerName'
// map.variableToVerbalization.get('$customerName') → 'customer name'

const validation = validateVerbalization('customer name', '$customerName', variables);
// { valid: true } or { valid: false, error: 'Duplicate verbalization...', conflictingVariable: '$otherVar' }
```

---

### 3. VariableTable UI Updates

**File:** `/components/editors/code/shared/components/VariableTable/VariableTable.tsx`

Added verbalization editing to variable cards:

**New Features:**
- Verbalization input row (between header and type selector)
- Real-time validation with visual error feedback
- Optional label and help text
- State management for new variable verbalizations
- Error message display with AlertCircle icon

**Validation Logic:**
```typescript
const handleVerbalizationChange = (variableId, variableName, newVerbalization) => {
  // Update variable
  onUpdate(variableId, { verbalization: newVerbalization });
  
  // Validate
  const validation = validateVerbalization(newVerbalization, variableName, variables);
  
  // Update error state
  if (!validation.valid) {
    setVerbalizationErrors(new Map([[variableId, validation.error]]));
  } else {
    verbalizationErrors.delete(variableId);
  }
};
```

**UI Structure:**
```tsx
<div className={styles.cardRow}>
  <div className={styles.cardLabel}>
    Verbalization
    <span className={styles.optionalLabel}>(optional)</span>
  </div>
  <div className={styles.verbalizationSection}>
    <Input
      value={variable.verbalization || ''}
      onChange={(e) => handleVerbalizationChange(variable.id, variable.name, e.target.value)}
      placeholder="e.g., customer name"
      className={verbalizationErrors.has(variable.id) ? styles.inputError : ''}
    />
    {verbalizationErrors.has(variable.id) && (
      <div className={styles.errorMessage}>
        <AlertCircle size={14} />
        {verbalizationErrors.get(variable.id)}
      </div>
    )}
    <div className={styles.helpText}>
      Natural language alias for business users
    </div>
  </div>
</div>
```

---

### 4. VariableTable CSS Styles

**File:** `/components/editors/code/shared/components/VariableTable/VariableTable.module.css`

Added styles for verbalization UI elements:

**New Classes:**
- `.verbalizationSection` - Container for input + error + help text
- `.verbalizationInput` - Text input with focus states and error styling
- `.verbalizationInput.inputError` - Red border for validation errors
- `.optionalLabel` - Small "(optional)" label next to field name
- `.helpText` - Italic help text below input
- `.errorMessage` - Error message with icon and red text

**Example Styles:**
```css
.verbalizationInput {
  font-family: var(--font-family-sans);
  padding: var(--spacing-02) var(--spacing-03);
  background: var(--background-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  transition: border-color 200ms ease;
}

.verbalizationInput.inputError {
  border-color: var(--border-error);
}

.errorMessage {
  display: flex;
  align-items: center;
  gap: var(--spacing-02);
  font-size: 12px;
  color: var(--text-error);
}
```

---

### 5. Sample Data Updates

**File:** `/SampleData/formulaSamples.ts`

Added verbalizations to sample variables:

```typescript
{
  id: 'var-1',
  name: 'orderTotal',
  type: 'number',
  verbalization: 'order total',  // NEW
  // ...
},
{
  id: 'var-2',
  name: 'loyaltyTier',
  type: 'string',
  verbalization: 'loyalty tier',  // NEW
  // ...
}
```

**Examples:**
- `orderTotal` → `'order total'`
- `loyaltyTier` → `'loyalty tier'`
- `baseScore` → `'base score'`
- `debtRatio` → `'debt ratio'`

---

## User Experience

### Adding Verbalization to Variable

1. User opens VariableTable in Formula Editor
2. Sees "Verbalization (optional)" row for each variable
3. Types natural language name (e.g., "customer name")
4. Input validates in real-time
5. Error appears if duplicate or conflict detected
6. Help text explains purpose: "Natural language alias for business users"

### Validation Feedback

**Duplicate Verbalization:**
```
❌ Duplicate verbalization: "customer name" is already used by $customerName
```

**Conflict with Variable Name:**
```
❌ Verbalization "orderTotal" conflicts with existing variable name $orderTotal
```

**Valid Verbalization:**
```
✅ (no error message, green/neutral state)
```

---

## Validation Rules

### Case-Insensitive Matching

```typescript
'customer name' === 'Customer Name' === 'CUSTOMER NAME'
// All treated as same verbalization (stored as lowercase)
```

### Uniqueness Enforcement

```typescript
// ✅ VALID
$customerName → 'customer name'
$orderTotal → 'order total'

// ❌ INVALID - Duplicate
$customerName → 'customer name'
$clientName → 'customer name'  // Error: already used
```

### No Conflicts with Variable Names

```typescript
// ❌ INVALID - Conflict
$orderTotal → 'orderTotal'  // Error: conflicts with variable name $orderTotal
```

### Optional Field

```typescript
// Empty verbalization is valid (it's optional)
$customerName → ''  // ✅ No verbalization assigned
```

---

## Architecture Decisions

### Why Bidirectional Mapping?

**Reason:** Need fast lookups in both directions:
- **Parser:** Verbalization → Variable name (to resolve `'customer name'` → `$customerName`)
- **UI/Tooltips:** Variable name → Verbalization (to show aliases)

**Implementation:** Two Maps created from single pass over variables:
```typescript
{
  variableToVerbalization: Map { '$customerName' => 'customer name' },
  verbalizationToVariable: Map { 'customer name' => '$customerName' }
}
```

### Why Case-Insensitive?

**Reason:** Business users expect natural language flexibility.

**Implementation:** Store canonical lowercase form, match case-insensitively:
```typescript
normalizeVerbalization('Customer Name')  // → 'customer name'
```

### Why Validation at Input Time?

**Reason:** Immediate feedback prevents user from creating conflicting verbalizations.

**Implementation:** Validate on every change, store errors in Map keyed by variable ID:
```typescript
const [verbalizationErrors, setVerbalizationErrors] = useState<Map<string, string>>(new Map());
```

---

## Testing Checklist

### Functionality
- [x] Can add verbalization to new variable
- [x] Can edit verbalization on existing variable
- [x] Can clear verbalization (empty string)
- [x] Verbalization saved when creating new variable
- [x] Verbalization persists across edits

### Validation
- [x] Error shown for duplicate verbalization
- [x] Error shown for conflict with variable name
- [x] Case-insensitive matching works ('customer name' = 'Customer Name')
- [x] No error for empty verbalization
- [x] Error clears when invalid verbalization is fixed

### UI/UX
- [x] Verbalization row appears in correct location (after header, before type)
- [x] "(optional)" label displayed
- [x] Placeholder text helpful ("e.g., customer name")
- [x] Help text explains purpose
- [x] Error message displays with icon
- [x] Input highlighted red when error present
- [x] Input returns to normal when error cleared

---

## Next Steps

### Phase 2: Parser Integration (2-3 days)

**Goal:** Parse and resolve verbalized variable references in formulas.

**Tasks:**
1. Add VERBALIZATION token type to tokenizer
2. Update parser to handle single-quoted references
3. Implement verbalization resolution logic (`'customer name'` → `$customerName`)
4. Support dotted notation for nested attributes (`'customer'.'name'`)
5. Add error messages for undefined verbalizations
6. Test resolution with sample formulas

**Example:**
```
// Current (technical syntax)
$discount = IF $orderTotal > 1000 THEN $orderTotal * 0.10 END

// After Phase 2 (business syntax)
'discount' = IF 'order total' > 1000 THEN 'order total' * 0.10 END
```

---

## Files Changed

### New Files
- `/utils/verbalizationUtils.ts` - Verbalization mapping and validation utilities

### Modified Files
- `/components/editors/core/types/EditorTypes.ts` - Added `verbalization` to Variable interface
- `/components/editors/code/shared/components/VariableTable/VariableTable.tsx` - Added verbalization UI
- `/components/editors/code/shared/components/VariableTable/VariableTable.module.css` - Added verbalization styles
- `/SampleData/formulaSamples.ts` - Added verbalizations to sample variables

---

## Implementation Notes

### Why Not a Separate Table Column?

**Decision:** Use row (not column) for verbalization.

**Reason:** Card-based layout works better for multiple rows of data. Adding columns would make cards too wide and harder to scan.

**Alternative Considered:** Table layout with columns - rejected due to truncation issues and reduced readability.

### State Management

Validation errors stored in component-level state Map:
```typescript
const [verbalizationErrors, setVerbalizationErrors] = useState<Map<string, string>>(new Map());
```

**Why Map?** Efficient lookup by variable ID, easy to add/remove individual errors without affecting others.

### Performance

Validation runs on every keystroke, but:
- Very fast (O(n) single pass over variables array)
- Typical use case: 5-20 variables
- No noticeable lag in testing

Future optimization: Debounce validation if performance issues arise with large variable lists.

---

## References

- [EPIC-VariableVerbalization.md](/planning/epics/EPIC-VariableVerbalization.md) - Full epic documentation
- [EditorTypes.ts](/components/editors/core/types/EditorTypes.ts) - Variable type definition
- [verbalizationUtils.ts](/utils/verbalizationUtils.ts) - Utility functions
- [VariableTable.tsx](/components/editors/code/shared/components/VariableTable/VariableTable.tsx) - UI implementation

---

## Success Criteria

- ✅ Variable type extended with verbalization property
- ✅ Bidirectional mapping utilities created and tested
- ✅ VariableTable UI allows verbalization editing
- ✅ Real-time validation prevents conflicts
- ✅ Sample data includes verbalization examples
- ✅ Error messages clear and actionable
- ✅ Help text guides users
- ✅ Documentation complete

**Phase 1 Complete** - Ready for Phase 2 (Parser Integration)
