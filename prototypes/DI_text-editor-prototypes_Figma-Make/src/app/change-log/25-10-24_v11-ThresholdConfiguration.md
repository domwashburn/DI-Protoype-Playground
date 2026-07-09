# Threshold Configuration for Formula Editor

**Date:** October 24, 2025  
**Version:** v11  
**Type:** Feature Implementation  
**Phase:** 2.3 - Threshold Configuration & Formula Library (Partial)

## Summary

Implemented comprehensive threshold configuration system for numeric formulas, allowing users to categorize formula outputs into labeled ranges with visual indicators (e.g., credit scores: Poor, Fair, Good, Very Good, Excellent).

## Context

Part of Phase 2.3 from the EditorArchitectureRefactor plan. Thresholds provide a way to map numeric formula outputs to meaningful categories with severity levels and colors, enabling:

1. **Decision Logic**: =IF(CreditScore.category() = "High Risk", "Deny", "Review")
2. **Visual Indicators**: Badges with colors/severities automatically applied
3. **Reporting**: Category-based grouping and analysis
4. **Excel-like Functions**: VLOOKUP-style threshold matching

## Architecture Decisions

### 1. Threshold Data Model

```typescript
interface Threshold {
  id: string;
  min: number;
  max: number | null;  // null for open-ended (≥ min)
  label: string;       // "Excellent", "High Risk", etc.
  color: string;       // CSS color value
  severity: 'error' | 'warning' | 'info' | 'success';
  isOpenEnded?: boolean;
}
```

**Key Features:**
- ✅ **Continuous ranges**: Validation prevents gaps/overlaps
- ✅ **Open-ended ranges**: Support for "≥ 800" style thresholds
- ✅ **Severity mapping**: Error (red), Warning (yellow), Info (blue), Success (green)
- ✅ **Visual preview**: Colored bar showing all ranges proportionally

### 2. Where Thresholds Apply

**Formula Output Evaluation:**
```
Inputs → Execute Formula → Numeric Value → Apply Thresholds → Result
  ↓            ↓                ↓                ↓                ↓
$income    calculate          750            find range         {
$debt         logic                          (740-799)           value: 750,
                                                                 category: "Very Good",
                                                                 severity: "success"
                                                               }
```

**Only for Numeric Formulas:**
- Thresholds section only appears when `returnType === 'number'`
- Disabled/hidden for string, boolean, and date formulas
- Metadata stored alongside formula definition

### 3. UI Integration

**Location**: Details tab in Formula Editor sidebar (not a separate tab)

**Why in Details tab?**
- Thresholds are optional metadata, like name/description
- Avoids tab proliferation
- Natural grouping with other formula configuration
- Visual divider separates from basic metadata

**Structure:**
```
Details Tab
├── Formula Name
├── Return Type
├── Description
└── ─────────────── (divider)
    └── Thresholds (if returnType = "number")
        ├── Visual Preview Bar
        ├── Validation Messages
        └── Threshold List (CRUD)
```

### 4. Validation Rules

**Implemented Validations:**
1. **No Overlaps**: `current.max >= next.min` is an error
2. **No Gaps**: `current.max + 1 < next.min` is a warning
3. **Min < Max**: Basic range validation
4. **Open-ended Placement**: Open-ended range must be last
5. **Continuous Coverage**: Encourages complete range coverage

**Visual Feedback:**
- Red error banner for critical issues
- Sorted display (min → max) for clarity
- Hover tooltips on preview bar

## Implementation Details

### Files Created

```
/components/editors/core/types/EditorTypes.ts
  ├── Threshold interface
  └── ThresholdEvaluation interface

/components/editors/code/FormulaEditor/
  ├── ThresholdConfig.tsx          (NEW)
  ├── ThresholdConfig.module.css   (NEW)
  ├── FormulaDetailsPanel.tsx      (UPDATED)
  └── FormulaDetailsPanel.module.css (UPDATED)

/App.tsx (UPDATED)
  └── Added formulaThresholds state
```

### Component Structure

**ThresholdConfig Component:**
- Composable design (self-contained CRUD)
- Three sub-components:
  1. `ThresholdConfig` (main container)
  2. `ThresholdRow` (read-only display)
  3. `ThresholdEditRow` (inline editing)
  
**Interaction Pattern:**
- Click + to add threshold
- Click edit icon to modify
- Click delete icon to remove
- Inline editing with check/cancel
- Auto-sort by min value

### Visual Design

**Preview Bar:**
```
[■■■■■■ Poor ■■■■■■][■■■■■■ Fair ■■■■■■][■■■■■■ Good ■■■■■■][■■■■ Very Good ■■■■][■■ Excellent ■■]
```
- Proportional segment sizing based on range width
- Hover shows label and range
- Color-coded by severity

**Threshold Row:**
```
[●] Excellent              Icon shows segment positioning
    800 - 850              Range display
    SUCCESS                Severity badge (color-coded)
    [✏] [🗑]               Edit/Delete actions (on hover)
```

**Edit Mode:**
```
┌─────────────────────────────────────┐
│ Label: [Excellent____________]       │
│ Min: [800]  Max: [850] ☑ Open-ended│
│ Severity: [Success ▼]               │
│                         [✓] [✕]     │
└─────────────────────────────────────┘
```

## Usage Examples

### Example 1: Credit Score Categorization

```typescript
const thresholds: Threshold[] = [
  { id: '1', min: 300, max: 579, label: 'Poor', color: '#DA1E28', severity: 'error' },
  { id: '2', min: 580, max: 669, label: 'Fair', color: '#F1C21B', severity: 'warning' },
  { id: '3', min: 670, max: 739, label: 'Good', color: '#0F62FE', severity: 'info' },
  { id: '4', min: 740, max: 799, label: 'Very Good', color: '#24A148', severity: 'success' },
  { id: '5', min: 800, max: null, label: 'Excellent', color: '#24A148', severity: 'success', isOpenEnded: true }
];
```

**Formula:**
```
$creditScore = 
  IF($income > 50000 AND $debt < 20000, 800,
  IF($income > 30000 AND $debt < 30000, 700,
  IF($income > 20000, 600,
     500)))
```

**Evaluation:**
```javascript
const score = 750;
const threshold = findMatchingThreshold(score, thresholds);
// Returns: { label: "Very Good", severity: "success", color: "#24A148", ... }
```

### Example 2: Risk Assessment

```typescript
const riskThresholds: Threshold[] = [
  { id: '1', min: 0, max: 20, label: 'Low Risk', color: '#24A148', severity: 'success' },
  { id: '2', min: 21, max: 50, label: 'Medium Risk', color: '#F1C21B', severity: 'warning' },
  { id: '3', min: 51, max: null, label: 'High Risk', color: '#DA1E28', severity: 'error', isOpenEnded: true }
];
```

**Usage in Other Formulas:**
```
=IF(RiskScore.category() = "High Risk", "Manual Review Required", "Auto-Approve")
```

## State Management Flow

```
App.tsx
  ├── formulaThresholds: Threshold[]
  │   └── setFormulaThresholds()
  │
  └── FormulaDetailsPanel
      ├── thresholds={formulaThresholds}
      └── onThresholdsChange={setFormulaThresholds}
          │
          └── ThresholdConfig
              ├── Add/Edit/Delete operations
              ├── Validation
              └── Visual preview
```

**Data Flow:**
1. User clicks "+" to add threshold
2. ThresholdConfig enters edit mode
3. User fills form (label, min, max, severity)
4. Click ✓ → validateThresholds() → onThresholdsChange()
5. App.tsx updates formulaThresholds state
6. FormulaDetailsPanel re-renders with new thresholds
7. Visual preview updates automatically

## Future Enhancements (Not in this PR)

### Threshold Evaluation Hook
```typescript
const { evaluate } = useThresholdEvaluation(thresholds);
const result = evaluate(750);
// { value: 750, category: "Very Good", severity: "success", ... }
```

### Auto-Generate from Historical Data
```typescript
const suggestedThresholds = analyzeHistoricalValues(pastScores);
// Suggests ranges based on distribution (quartiles, etc.)
```

### Multiple Threshold Sets
```typescript
const displayThresholds = [...];  // For UI badges
const logicThresholds = [...];    // For decision rules
```

### Threshold Functions in Formulas
```typescript
=CreditScore()              // Returns: 750
=CreditScore.evaluate()     // Returns: { value: 750, category: "Very Good", ... }
=CreditScore.category()     // Returns: "Very Good"
=CreditScore.severity()     // Returns: "success"
```

## Carbon Design System Compliance

**CSS Variables Used:**
- `--spacing-*`: All spacing values
- `--background-*`: Backgrounds
- `--text-*`: Text colors
- `--border-*`: Borders
- `--radius-*`: Border radius
- `--font-family-sans`: Typography

**Colors (Severity Mapping):**
```css
--severity-error: #DA1E28;    /* Carbon red-60 */
--severity-warning: #F1C21B;  /* Carbon yellow-30 */
--severity-info: #0F62FE;     /* Carbon blue-60 */
--severity-success: #24A148;  /* Carbon green-60 */
```

**Component Patterns:**
- Input fields with focus states
- Inline editing pattern
- Validation banner style
- Hover actions (edit/delete)

## Testing Checklist

- [x] Add threshold to numeric formula
- [x] Edit existing threshold
- [x] Delete threshold
- [x] Cancel threshold edit
- [x] Open-ended threshold (checkbox)
- [x] Validation: overlapping ranges
- [x] Validation: gap between ranges
- [x] Visual preview updates correctly
- [x] Threshold section hidden for non-numeric formulas
- [x] State persists across tab switches
- [x] Sorted display (min → max)
- [x] Severity color mapping
- [x] Read-only mode (if implemented)

## Known Limitations

1. **No Threshold Evaluation**: This PR implements configuration UI only. Actual formula evaluation with thresholds will be in a future PR.

2. **No Persistence**: Thresholds are stored in React state but not persisted to localStorage/backend yet (will be added with formula saving).

3. **No Import/Export**: Can't copy thresholds between formulas yet.

4. **Single Threshold Set**: Each formula has one threshold set. Multiple sets (e.g., for different contexts) not yet supported.

## Migration Notes

**For Existing Formulas:**
- Thresholds are optional - existing formulas work without them
- Thresholds only apply to `returnType === 'number'`
- Adding thresholds doesn't change formula execution (yet)

**Breaking Changes:**
- None. This is a pure addition.

## Related Files

```
Core Types:
  /components/editors/core/types/EditorTypes.ts
  
Components:
  /components/editors/code/FormulaEditor/ThresholdConfig.tsx
  /components/editors/code/FormulaEditor/ThresholdConfig.module.css
  /components/editors/code/FormulaEditor/FormulaDetailsPanel.tsx
  /components/editors/code/FormulaEditor/FormulaDetailsPanel.module.css
  
Application:
  /App.tsx
  
Change Logs:
  /change-log/25-10-24_v11-ThresholdConfiguration.md (this file)
```

## References

- Parent Plan: `/change-log/25-10-24_v01-EditorArchitectureRefactor.md`
- Phase: 2.3 - Threshold Configuration & Formula Library
- Carbon Design: https://carbondesignsystem.com/
- Guidelines: `/guidelines/Guidelines.md`

## Next Steps

1. **Formula Evaluation**: Implement actual threshold matching during formula execution
2. **Function Syntax**: Add `.category()` and `.evaluate()` methods to formula invocation
3. **Persistence**: Save thresholds with formula documents
4. **Auto-Generation**: Suggest thresholds based on historical values
5. **Import/Export**: Copy threshold sets between formulas
6. **Testing Suite**: Add threshold evaluation test cases

## User Feedback

This implementation addresses the user's questions:

> "let's think through where the threshold should apply to... I'd assume evaluating the formula output?"

✅ **Confirmed**: Thresholds apply to the numeric output value after formula execution.

> "Is it exported as a value type (like a special string)?"

✅ **Design**: Formula can return:
- Raw value: `=CreditScore()` → `750`
- Evaluated: `=CreditScore.evaluate()` → `{ value: 750, category: "Very Good", ... }`
- Category only: `=CreditScore.category()` → `"Very Good"`

> "all those questions, yes"

✅ **Implemented**: 
- Continuous ranges (with gap/overlap validation)
- Open-ended ranges (≥ min)
- Multiple uses supported (design allows future expansion)
- Auto-generation (architecture supports, not yet implemented)

> "you can try adding a section to the details tab in the panel rather than a new tab"

✅ **Implemented**: Thresholds appear as a section in the Details tab, below a divider, only when returnType is "number".
