# Formula Editor - Metadata & Text-to-Variable Conversion

**Date:** October 24, 2025  
**Version:** v04  
**Type:** Feature Implementation

## Summary

Added comprehensive formula metadata system and text-to-variable conversion feature to the Formula Editor, enabling named formulas that can be invoked like Excel functions (e.g., `=calculateLoanEligibilityScore($param1, $param2)`).

## Features Implemented

### 1. Formula Metadata Section

**Components:**
- Formula Name input (e.g., "calculateLoanEligibilityScore")
- Return Type selector (number, string, boolean, date)
- Description textarea

**Purpose:**
- Formulas can be given meaningful names
- Names enable function-style invocation in other contexts
- Return type provides type safety for formula composition
- Description documents the formula's purpose

**UI Design:**
- Metadata section appears above the formula logic editor
- Clean, compact layout with Carbon Design System styling
- Helpful hint text showing invocation example

### 2. Text-to-Variable Conversion

**Feature:**
- Select any text in the formula
- Click "Convert to Variable" button that appears
- Selected text is automatically converted to a valid variable name
- New variable is created in the Variables table
- Original text is replaced with `$variableName` reference

**Implementation Details:**
- Uses `onSelect` event to detect text selection
- Sanitizes selected text to create valid variable names:
  - Removes special characters (replaced with `_`)
  - Prevents leading numbers
  - Preserves alphanumeric and underscore characters
- Creates variable with default "number" type
- Adds description showing original converted text
- Auto-focuses editor and positions cursor after insertion

**UX Flow:**
```
1. User selects text: "customer.age * 12"
2. Button appears: "Convert 'customer.age * 12' to Variable"
3. User clicks button
4. Variable "$customer_age_12" is created in Variables table
5. Text in formula is replaced with "$customer_age_12"
6. User can then edit variable name, type, and data source in table
```

### 3. Enhanced Sample Data

Updated `/SampleData/formulaSamples.ts` to include metadata:
- `formulaName`: Function name for invocation
- `formulaReturnType`: Return type of formula
- Each sample now demonstrates a complete named formula

**Sample Formulas:**
1. `calculateCustomerDiscount` - Tiered discount based on order total and loyalty
2. `calculateLoanEligibilityScore` - Credit scoring algorithm
3. `calculateShippingCost` - Distance and speed-based shipping
4. `simpleMathExample` - Basic math operations

### 4. Enhanced Attribute Autocomplete

Improved the # (attribute) autocomplete with realistic data model paths:
- `#customer.age`
- `#customer.income`
- `#customer.creditScore`
- `#customer.loyaltyTier`
- `#order.total`
- `#order.destination.distance`
- etc.

Supports dot-notation for nested attributes (e.g., `#order.destination.distance`)

## Files Changed

### Modified

**Formula Editor Core:**
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx`
  - Added metadata props (name, description, returnType)
  - Added text selection detection (`onSelect`)
  - Added text-to-variable conversion logic
  - Added metadata section UI
  - Added convert button UI

- `/components/editors/code/FormulaEditor/FormulaEditor.module.css`
  - Added metadata section styles
  - Added metadata field styles
  - Added editor header styles
  - Added convert button styles

**Integration Layer:**
- `/App.tsx`
  - Added formula metadata state (name, description, returnType)
  - Added handlers for metadata changes
  - Passed metadata props to EditorContainer

- `/components/EditorContainer/EditorContainer.tsx`
  - Added formula metadata props interface
  - Added metadata loading in document loader
  - Added metadata passing to FormulaEditor component

**Data Layer:**
- `/SampleData/formulaSamples.ts`
  - Added `formulaName` field to FormulaDocument interface
  - Added `formulaReturnType` field to FormulaDocument interface
  - Updated all samples with metadata

## Technical Implementation

### Metadata Props Flow

```tsx
// App.tsx (state)
const [formulaName, setFormulaName] = useState('');
const [formulaDescription, setFormulaDescription] = useState('');
const [formulaReturnType, setFormulaReturnType] = useState<'number' | 'string' | 'boolean' | 'date'>('number');

// EditorContainer (passthrough + document loading)
onFormulaNameChange={setFormulaName}
onFormulaDescriptionChange={setFormulaDescription}
onFormulaReturnTypeChange={setFormulaReturnType}

// FormulaEditor (UI + unified callback)
onFormulaMetadataChange={(metadata) => {
  // Callback with { name?, description?, returnType? }
}}
```

### Text-to-Variable Conversion Algorithm

```tsx
const handleConvertToVariable = () => {
  // 1. Get selected text
  const selected = textareaRef.current.value.substring(start, end);
  
  // 2. Sanitize to valid variable name
  const varName = selected
    .trim()
    .replace(/[^a-zA-Z0-9_]/g, '_')  // Remove special chars
    .replace(/^[0-9]/, '_$&');        // Fix leading numbers
  
  // 3. Create new variable
  const newVariable = {
    id: generateId(),
    name: varName,
    type: 'number',
    description: `Converted from: ${selected}`
  };
  
  // 4. Replace in formula
  const newValue = 
    value.substring(0, start) +
    `$${varName}` +
    value.substring(end);
  
  // 5. Update state and refocus
  onVariablesChange([...variables, newVariable]);
  onChange(newValue);
  repositionCursor(start + varName.length + 1);
};
```

### Selection UI Pattern

```tsx
// Track selection state
const [showConvertToVariable, setShowConvertToVariable] = useState(false);
const [selectedText, setSelectedText] = useState('');

// Listen to selection changes
<textarea
  onSelect={handleSelect}
  // ...
/>

// Show convert button when text is selected
{showConvertToVariable && (
  <Button onClick={handleConvertToVariable}>
    <Wand2 /> Convert "{selectedText}" to Variable
  </Button>
)}
```

## UI/UX Considerations

### Metadata Section Design

**Layout:**
- Grid layout: Name (left) + Return Type (right)
- Description spans full width below
- Light background to visually separate from formula logic
- Helpful hint showing invocation syntax

**Accessibility:**
- All form fields properly labeled
- Keyboard navigation works
- Clear visual hierarchy

### Convert Button

**Visibility:**
- Only shows when text is selected
- Positioned in editor header (right side)
- Uses Wand2 icon for "magic" conversion metaphor
- Shows preview of selected text in button label

**Interaction:**
- One-click conversion
- Automatic cursor repositioning
- Immediate visual feedback

## Benefits

### 1. Formula Reusability
Named formulas can be invoked in other contexts:
```tsx
// Formula definition
formulaName: "calculateLoanEligibilityScore"

// Invocation elsewhere
=calculateLoanEligibilityScore($customerIncome, $customerCredit)
```

### 2. Type Safety
Return type enables:
- Type checking when composing formulas
- Better autocomplete suggestions
- Runtime validation

### 3. Developer Experience
Text-to-variable conversion:
- Reduces tedious manual variable creation
- Encourages proper variable usage
- Speeds up formula development
- Natural workflow: write expression → convert to variable → configure

### 4. Documentation
- Formula names serve as documentation
- Descriptions explain purpose
- Variable descriptions track conversions

## Next Steps

### Immediate
- [x] Test formula metadata persistence
- [x] Test text-to-variable conversion
- [x] Verify 2-way binding still works
- [ ] Test with multiple formula documents

### Future Enhancements
1. **Formula Invocation**
   - Implement function-style formula calls
   - Parameter mapping UI
   - Type validation for parameters

2. **Formula Library**
   - Browse available formulas
   - Search formulas by name/description
   - Import formulas into current context

3. **Threshold Configuration**
   - Add threshold support to formulas
   - Visual threshold builder
   - Threshold testing UI

4. **Enhanced Conversion**
   - Smart type inference for converted variables
   - Detect and reuse existing variables
   - Batch conversion of similar expressions

5. **Formula Validation**
   - Real-time syntax validation
   - Type checking
   - Undefined variable detection
   - Circular dependency detection

## Testing Checklist

- [x] Metadata section renders correctly
- [x] Formula name can be edited
- [x] Description can be edited
- [x] Return type can be changed
- [x] Metadata persists when switching documents
- [x] Text selection shows convert button
- [x] Convert button creates new variable
- [x] Converted variable has correct name
- [x] Formula text is replaced correctly
- [x] Cursor repositions after conversion
- [x] Convert button hides when selection is cleared
- [x] Enhanced attributes appear in autocomplete
- [x] Dot-notation attributes work correctly
- [x] No regressions in existing features
- [x] Variable table still works
- [x] 2-way binding still works
- [x] Autocomplete still works

## References

- [Formula Editor Component](/components/editors/code/FormulaEditor/FormulaEditor.tsx)
- [Variable Table Component](/components/editors/code/shared/components/VariableTable/VariableTable.tsx)
- [Formula Samples](/SampleData/formulaSamples.ts)
- [Editor Container](/components/EditorContainer/EditorContainer.tsx)

## Notes

This implementation lays the groundwork for a complete formula management system. The metadata enables formulas to be treated as reusable functions, while text-to-variable conversion dramatically improves the formula authoring experience.

The pattern follows Excel's model of named formulas that can be invoked elsewhere, making complex business logic composable and maintainable.
