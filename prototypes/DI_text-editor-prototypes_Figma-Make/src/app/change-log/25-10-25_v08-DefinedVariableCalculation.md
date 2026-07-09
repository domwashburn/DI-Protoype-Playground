# v08 - Defined Variable Calculation in Test Panel

**Date:** October 25, 2025  
**Type:** Feature Enhancement  
**Status:** ✅ Complete  
**Related:**
- [v01 - Formula Test Panel](./25-10-25_v01-FormulaTestPanel.md)
- [v07 - Evaluation Engine Implementation](./25-10-25_v07-EvaluationEngineImplementation.md)
- [v11 - Defined Variable Detection](./25-10-23_v11-DefinedVariableDetection.md)

---

## Problem Statement

In the Formula Test Panel, all variables were being treated as editable inputs, even if they were **defined (calculated)** within the formula itself.

**Example:**
```formula
$baseCost = $weight * 0.5

IF #order.destination.distance > 100 THEN
  $baseCost = $baseCost + ($distance - 100) * 0.1
END
```

In this example:
- `$baseCost` is **defined** (assigned in the formula)
- `$weight`, `$distance` are **input parameters** (not assigned)

The Test Panel was showing `$baseCost` as an editable input field with value "0", when it should be:
- **Read-only** (calculated by the formula)
- **Auto-calculated** when input variables change
- Displayed with a "Calculated" badge

---

## Solution Overview

Enhanced the Formula Test Panel to:

1. **Distinguish between variable types:**
   - **Input variables (parameters)**: User provides values
   - **Defined variables**: Calculated by the formula

2. **Show defined variables as read-only:**
   - Display calculated values
   - Lock icon + "Calculated" badge
   - Disabled input field (no editing)

3. **Auto-evaluate when inputs change** (future enhancement)

---

## Implementation Details

### 1. Variable Classification

Used existing utilities from `/utils/formulaParser.ts`:

```typescript
import { extractDefinedVariables, extractParameterVariables } from '../../../../../utils/formulaParser';

const { inputVariables, definedVariableNames } = useMemo(() => {
  const definedNames = extractDefinedVariables(formulaCode);
  const parameterNames = extractParameterVariables(formulaCode);
  
  // Filter to get only input variables
  const inputs = testableVariables.filter(v => 
    parameterNames.includes(v.name)
  );
  
  return {
    inputVariables: inputs,
    definedVariableNames: definedNames
  };
}, [testableVariables, formulaCode]);
```

### 2. Conditional Rendering

```typescript
{testableVariables.map(variable => {
  const isDefined = definedVariableNames.includes(variable.name);
  
  return (
    <div className={styles.inputRow}>
      <div className={styles.inputLabel}>
        <span className={styles.variableName}>${variable.name}</span>
        {isDefined && (
          <span className={styles.calculatedBadge}>
            <Lock size={12} />
            Calculated
          </span>
        )}
      </div>
      
      {isDefined ? (
        /* Read-only input showing calculated value */
        <Input
          type="text"
          value={definedVariableValues[variable.name] ?? 'Not yet calculated'}
          readOnly
          disabled
          className={styles.inputDisabled}
        />
      ) : (
        /* Editable input for user values */
        <Input ... />
      )}
    </div>
  );
})}
```

### 3. CSS Styling

Added styles for:

```css
/* Calculated badge */
.calculatedBadge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-01);
  padding: 2px var(--spacing-02);
  background: var(--background-brand-tertiary);
  border-radius: var(--radius-sm);
  font-size: 11px;
  color: var(--text-brand);
  font-weight: 500;
}

/* Disabled input */
.inputDisabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: var(--background-disabled) !important;
  color: var(--text-disabled) !important;
}
```

---

## Visual Comparison

### Before:
```
VARIABLES
├─ $weight [Input: editable]
├─ $distance [Input: editable]
├─ $baseCost [Input: editable] ❌ WRONG - should be calculated
```

### After:
```
VARIABLES
├─ $weight [Input: editable]
├─ $distance [Input: editable]
├─ $baseCost [🔒 Calculated: read-only] ✅ CORRECT
```

---

## Files Changed

### Modified:
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`
  - Added Lock icon import from lucide-react
  - Added `extractDefinedVariables`, `extractParameterVariables` imports
  - Added `definedVariableValues` state
  - Added variable classification logic
  - Added conditional rendering for defined vs. input variables
  - Added calculated badge display

- `/components/editors/code/FormulaEditor/FormulaTestPanel.module.css`
  - Added `.calculatedBadge` styles
  - Added `.readOnlyInput` styles
  - Added `.inputDisabled` styles

---

## User Experience

**For input variables:**
- Fully editable
- All input types work (text, number, date, boolean, select)
- Changes immediately reflected in state

**For defined variables:**
- Read-only, disabled input
- Shows "Not yet calculated" initially
- Will show calculated value after evaluation (future enhancement)
- Visual indicator: Lock icon + "Calculated" badge
- Clear visual distinction from input variables

---

## Testing Scenarios

**Scenario 1: Basic calculation**
```formula
$total = $price * $quantity
```
- `$price`: Editable input
- `$quantity`: Editable input
- `$total`: Read-only, calculated

**Scenario 2: Reassignment**
```formula
$baseCost = $weight * 0.5

IF $distance > 100 THEN
  $baseCost = $baseCost + 10
END
```
- `$weight`: Editable input
- `$distance`: Editable input  
- `$baseCost`: Read-only, calculated (reassigned in IF)

**Scenario 3: Multiple definitions**
```formula
$subtotal = $price * $quantity
$tax = $subtotal * 0.13
$total = $subtotal + $tax
```
- `$price`, `$quantity`: Editable inputs
- `$subtotal`, `$tax`, `$total`: All read-only, calculated

---

## Future Enhancements

### Phase 2: Auto-Evaluation
When input variables change, automatically re-evaluate and update defined variables:

```typescript
useEffect(() => {
  if (autoEvaluate) {
    handleEvaluate();
  }
}, [testValues, attributeValues]);
```

### Phase 3: Intermediate Values
Show intermediate calculated values during evaluation:

```typescript
// Track all assignments during evaluation
const intermediateValues = {
  baseCost: 5.0,    // After line 1
  baseCost: 5.1,    // After line 3 (if distance > 100)
  total: 7.65       // Final result
};
```

### Phase 4: Execution Trace
Show step-by-step evaluation with variable values at each step.

---

## Related Work

**Existing Utilities:**
- `extractDefinedVariables()` - Already implemented in v11
- `extractParameterVariables()` - Already implemented in v11
- `analyzeFormula()` - Comprehensive formula analysis

**Integration Points:**
- Evaluation Engine (v07) - Provides real calculation
- Variable Table - Uses same classification logic
- Syntax Highlighting - Can highlight defined vs. parameter variables

---

## Success Criteria

- [x] Defined variables show as read-only
- [x] Lock icon + "Calculated" badge displayed
- [x] Input variables remain editable
- [x] Visual distinction is clear
- [x] No regression in existing functionality
- [ ] Auto-evaluation on input change (Phase 2)
- [ ] Display calculated values (Phase 2)

---

## Notes

This implementation lays the groundwork for:
1. **Live formula evaluation** - Auto-update when inputs change
2. **Debugging tools** - Show intermediate values
3. **Formula validation** - Detect circular dependencies
4. **Performance optimization** - Only re-evaluate when dependencies change

The key insight: **Variables on the left of `=` are defined, variables on the right are parameters.** This simple rule enables powerful formula analysis.
