# Formula Testing Enhancements

**Date:** October 25, 2025  
**Version:** v02

## Summary

Enhanced the Formula Test Panel with intelligent input detection logic that distinguishes between defined and testable variables, extracts string options from formula comparisons, and provides type-aware inputs with attribute type inheritance.

## Context

The original Test Panel implementation displayed inputs for all variables without considering whether they were defined (computed) in the formula or testable (needed as inputs). It also didn't leverage formula context to provide smart dropdown options for string variables or inherit types from linked attributes.

### User Requirements

Based on the shipping cost formula example:
```
$baseCost = $weight * 0.5

IF #order.destination.distance > 100 THEN
  $baseCost = $baseCost + ($distance - 100) * 0.1
END

IF $shippingSpeed = "express" THEN
  $baseCost * 1.5
ELSE IF $shippingSpeed = "overnight" THEN
  $baseCost * 2.0
ELSE
  $baseCost
END
```

Expected behavior:
- **$baseCost**: No input (defined in formula)
- **$weight**: Number input with unit note
- **#order.destination.distance**: Input based on attribute type
- **$shippingSpeed**: Dropdown with "express" and "overnight" extracted from formula

Additionally, variables should inherit their linked attribute's data type unless explicitly overridden.

## Implementation Details

### 1. Formula Test Utilities (`/utils/formulaTestUtils.ts`)

Created new utility functions for formula analysis:

**`getDefinedVariables(formula: string): string[]`**
- Detects variables that are assigned in the formula (e.g., `$baseCost = ...`)
- Uses pattern: `/\$([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g`

**`getReferencedVariables(formula: string): string[]`**
- Extracts all variable references (e.g., `$weight`, `$baseCost`)
- Uses pattern: `/\$([a-zA-Z_][a-zA-Z0-9_]*)/g`

**`getTestableVariables(formula: string): string[]`**
- Returns variables referenced but not defined
- These need test inputs

**`getReferencedAttributes(formula: string): string[]`**
- Extracts attribute references (e.g., `#order.destination.distance`)
- Uses pattern: `/#([a-zA-Z_][a-zA-Z0-9_.]*)/g`

**`extractStringOptions(formula: string, variableName: string): string[]`**
- Parses formula for string comparisons like `$varName = "value"`
- Supports both single and double quotes
- Returns array of unique string values
- Example: `$status = "pending" OR $status = "active"` → `["pending", "active"]`

### 2. Enhanced Test Panel Logic

**Variable Detection:**
```tsx
// Extract testable variable names from formula
const testableVariableNames = useMemo(() => {
  return getTestableVariables(formulaCode);
}, [formulaCode]);

// Get full definitions for testable variables
const testableVariables = useMemo(() => {
  return variables.filter(v => testableVariableNames.includes(v.name));
}, [variables, testableVariableNames]);
```

**Type Inheritance:**
```tsx
// Use attribute type if available, otherwise use variable type
const effectiveType = attributeDef?.type || variable.type;
```

**Smart Input Selection:**

Priority order for determining input type:
1. **Boolean without options** → Toggle switch
2. **Attribute has predefined values** → Dropdown with attribute values
3. **Formula has string comparisons** → Dropdown with extracted options
4. **Date type** → Date picker
5. **Number type** → Number input (step="any" for decimals)
6. **String type** → Text input

**Unit Notes:**
```tsx
const unitNote = effectiveType === 'number' && attrKey?.includes('weight') ? ' (kg)' : '';
```

### 3. Input Rendering

**Toggle Switch for Booleans:**
```tsx
<div className={styles.toggleContainer}>
  <Switch checked={value === 'true'} onCheckedChange={...} />
  <span className={styles.toggleLabel}>
    {value === 'true' ? 'True' : 'False'}
  </span>
</div>
```

**Dropdown with Extracted String Options:**
```tsx
const extractedOptions = extractStringOptions(formulaCode, variable.name);

<Select value={testValues[variable.name]} onValueChange={...}>
  <SelectTrigger>
    <SelectValue placeholder={`Select ${variable.name}...`} />
  </SelectTrigger>
  <SelectContent>
    {extractedOptions.map(value => (
      <SelectItem key={value} value={value}>{value}</SelectItem>
    ))}
  </SelectContent>
</Select>
```

**Type-Aware Number Input:**
```tsx
<Input
  type="number"
  step="any"  // Allows decimals
  value={testValues[variable.name]}
  onChange={...}
  placeholder="Enter number..."
/>
```

## Files Changed

### Created
- `/utils/formulaTestUtils.ts` - Formula analysis utilities

### Modified
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`
  - Added formula-based variable detection
  - Implemented type inheritance from attributes
  - Added string option extraction
  - Enhanced input type selection logic
  - Added unit notes for numeric inputs

## Features

### Defined vs. Testable Variables
- **Defined variables** (computed in formula) are excluded from test inputs
- **Testable variables** (referenced but not defined) get appropriate inputs
- Automatic detection based on formula analysis

### String Option Extraction
- Scans formula for string comparisons (e.g., `$var = "value"`)
- Automatically provides dropdown with extracted options
- Supports both single and double-quoted strings
- Deduplicates options

### Type Inheritance
- Variables inherit type from linked attributes via `dataSource`
- Falls back to variable's explicit type if no attribute mapping
- Example: `$weight` linked to `#order.weight` (number) → number input

### Smart Input Types
- **Boolean** → Toggle switch with True/False label
- **Number** → Number input with `step="any"` for decimals
- **String** → Text input or dropdown (if options extracted)
- **Date** → Date picker
- **Predefined values** → Dropdown (from attribute or extracted)

### Unit Information
- Automatically adds unit notes to descriptions
- Example: "Order weight in kg (kg)"
- Currently supports weight detection, extensible to other units

## Usage Examples

### Shipping Cost Formula
```
$baseCost = $weight * 0.5
IF $shippingSpeed = "express" THEN
  $baseCost * 1.5
ELSE
  $baseCost
END
```

**Test Panel Shows:**
- `$weight` → Number input with unit note
- `$shippingSpeed` → Dropdown with ["express"] (extracted from formula)
- `$baseCost` → Not shown (defined in formula)

### Customer Discount Formula
```
IF $loyaltyTier = "gold" OR $loyaltyTier = "platinum" THEN
  $orderTotal * 0.15
ELSE
  $orderTotal * 0.05
END
```

**Test Panel Shows:**
- `$loyaltyTier` → Dropdown with ["gold", "platinum"] (extracted)
- `$orderTotal` → Number input or dropdown (if linked to attribute with predefined values)

### Attribute Reference
```
IF #order.destination.distance > 100 THEN
  "long distance"
ELSE
  "local"
END
```

**Test Panel Shows:**
- `#order.destination.distance` → Number input or dropdown (based on attribute definition)

## Technical Notes

### Pattern Matching
All regex patterns use word boundaries (`\b`) to ensure exact variable name matching and avoid partial matches.

### Type Coercion
Currently, type inheritance is automatic. Future enhancement could add a checkbox to "treat as string" to override the inherited type.

### Evaluation Context
When building the evaluation context, the panel:
1. Parses string values based on effective type
2. Converts numbers using `parseFloat`
3. Converts booleans by comparing to string "true"
4. Leaves strings as-is

### Extensibility
The `ATTRIBUTE_DEFINITIONS` dictionary can be extended with:
- More attribute types
- Custom predefined value sets
- Unit information
- Validation rules

## Testing Scenarios

### Test with Defined Variables
- Create formula with `$result = $a + $b`
- Test panel should only show inputs for `$a` and `$b`, not `$result`

### Test with String Extraction
- Create formula with `IF $status = "active" THEN ... ELSE IF $status = "pending" THEN ...`
- Test panel should show dropdown for `$status` with ["active", "pending"]

### Test with Type Inheritance
- Create variable `$customerAge` linked to `#customer.age` (number attribute)
- Test panel should show number input even if variable type is string

### Test with Attributes
- Reference `#order.weight` in formula
- Test panel should show dropdown with predefined weight values

## Next Steps

### Suggested Enhancements
1. **Type Override Toggle** - Add checkbox to force string type for variables
2. **Custom Units** - Allow users to specify units for numeric inputs
3. **Value Validation** - Add min/max validation based on attribute definitions
4. **Test Sets** - Save and load sets of test values
5. **Real Formula Evaluation** - Integrate with actual formula engine
6. **Auto-Complete Test Values** - Suggest realistic values based on variable names

### Future Considerations
- Support for array/list types
- Support for nested object attributes
- Support for complex expressions in comparisons
- Export test scenarios for documentation

## Breaking Changes

None - this is a backward-compatible enhancement. Existing formulas will continue to work, with improved UX for testing.

## References

- `/utils/formulaTestUtils.ts` - Formula analysis utilities
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx` - Test panel implementation
- `/change-log/25-10-25_v01-FormulaTestPanel.md` - Original test panel implementation
