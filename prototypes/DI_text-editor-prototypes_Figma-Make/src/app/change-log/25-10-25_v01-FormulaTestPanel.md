# Formula Test Panel Implementation

**Date:** October 25, 2025  
**Version:** v01

## Summary

Implemented a comprehensive formula testing interface that allows users to populate variables and attributes with test values and evaluate formula outputs. The Test panel replaces the "Testing Checklist" tab in the Formula Editor sidebar.

## Context

Users needed a way to test formula logic with different input values before deploying formulas in production. The testing interface needed to:
- Show variables that aren't defined in the formula (require external values)
- Show attributes referenced in the formula (#customer.age, etc.)
- Allow users to input custom values or select from predefined test values
- Evaluate the formula and display results with threshold visualization

## Implementation Details

### New Component: FormulaTestPanel

**Location:** `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`

**Key Features:**
1. **Automatic Detection**
   - Extracts variables not defined in editor (`!variable.definedInEditor`)
   - Parses formula code to find referenced attributes (`#attribute.name` pattern)

2. **Input Interface**
   - Variables: Text inputs (number/string/date) or select dropdowns (boolean)
   - Attributes: Select dropdowns with predefined test values based on attribute type

3. **Attribute Definitions**
   - Predefined test values for common attributes (customer.age, order.total, etc.)
   - Type-aware (number vs string attributes)
   - Realistic test scenarios (income ranges, loyalty tiers, etc.)

4. **Evaluation**
   - Mock evaluation engine (placeholder for real formula engine)
   - Type-specific result display (number, string, boolean, date)
   - Threshold visualization for numeric results using existing ThresholdBadge component

5. **Empty States**
   - Helpful message when no variables or attributes to test
   - Guidance on how to add testable elements

### Attribute Test Values

Sample predefined values for realistic testing:
- **customer.age:** 25, 35, 45, 55, 65
- **customer.income:** 30000, 50000, 75000, 100000, 150000
- **customer.creditScore:** 550, 650, 700, 750, 800
- **customer.loyaltyTier:** bronze, silver, gold, platinum
- **order.total:** 100, 500, 1000, 2500, 5000
- **order.shippingSpeed:** standard, express, overnight
- And more...

### UI/UX Patterns

**Carbon Design System Compliance:**
- Uses CSS variables for all styling values
- Follows Carbon spacing scale (--spacing-XX)
- Uses Carbon color tokens (--text-primary, --field-01, etc.)
- Proper focus states and accessibility

**User Flow:**
1. Switch to "Test" tab in Formula Editor sidebar
2. See list of variables and attributes that need values
3. Populate values (type in or select from dropdown)
4. Click "Evaluate Formula" button
5. View results with threshold categorization (if applicable)

### Styling

**Location:** `/components/editors/code/FormulaEditor/FormulaTestPanel.module.css`

**Key Styles:**
- Scrollable panel layout with proper spacing
- Distinct styling for variable names (`$var`) vs attribute names (`#attr`)
- Result display with large numeric values and threshold badges
- Error states for failed evaluation
- Empty state with helpful guidance

## Files Changed

### New Files
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`
- `/components/editors/code/FormulaEditor/FormulaTestPanel.module.css`

### Modified Files
- `/components/editors/code/FormulaEditor/index.ts` - Added FormulaTestPanel export
- `/App.tsx` - Replaced FeatureList with FormulaTestPanel in "testing" tab, renamed tab to "Test"

## Integration with Existing Features

### Threshold Evaluation
- Reuses `useThresholdEvaluation` hook from existing threshold system
- Displays threshold badges for numeric results
- Shows threshold categorization (Not Eligible, Review Required, etc.)

### Variable Detection
- Leverages existing `definedInEditor` flag on variables
- Only shows variables that need external values (not calculated in formula)

### Type System
- Respects formula return type for result display
- Type-aware input fields (number inputs for numeric vars, select for boolean)

## Testing Scenarios

**Test with "Customer Discount" formula:**
1. Set `orderTotal` = 1500
2. Set `loyaltyTier` = "gold"
3. Click Evaluate → Should show 225 (15% discount)

**Test with "Loan Eligibility" formula:**
1. Set `debtRatio` = 0.25
2. Attributes: creditScore = 750, income = 75000
3. Click Evaluate → Should show score with threshold badge

## Known Limitations

1. **Mock Evaluation:** Currently uses a simple mock evaluation. Production would integrate with a real formula engine (e.g., mathjs, formulajs, or custom parser).

2. **Attribute Schema:** Attributes are hardcoded in the component. Production would fetch from a schema/API.

3. **Validation:** No validation of formula syntax before evaluation (relies on formula editor's validation).

4. **Complex Formulas:** Mock evaluation doesn't actually parse/execute formula logic - it's a weighted average for demo purposes.

## Next Steps

### Short-term Improvements
- Add "Copy Test Values" button to save/share test scenarios
- Add "Clear All" button to reset test values
- Show evaluation history (previous test runs)

### Medium-term Enhancements
- Integrate real formula evaluation engine
- Support for formula debugging (step-through execution)
- Save test scenarios with the formula
- Show intermediate variable values during evaluation

### Long-term Features
- Batch testing with CSV import
- Test coverage analysis (which branches executed)
- Performance metrics (execution time)
- Test scenario management (save/load/share)

## Migration Notes

**For Production:**
1. Replace mock evaluation with real formula engine
2. Fetch attribute definitions from schema API
3. Add proper error handling for evaluation failures
4. Consider caching test values in localStorage
5. Add analytics tracking for test usage

## Dependencies

**Existing Components:**
- ThresholdBadge (for threshold visualization)
- useThresholdEvaluation hook (for threshold evaluation)

**Shadcn/ui Components (to convert):**
- Input (text/number inputs)
- Select (dropdown selects)
- Button (evaluate button)

## References

- Formula Editor: `/components/editors/code/FormulaEditor/FormulaEditor.tsx`
- Threshold System: `/components/editors/code/FormulaEditor/ThresholdConfig.tsx`
- Sample Data: `/SampleData/formulaSamples.ts`
