# Threshold Evaluation Implementation

**Date:** October 24, 2025  
**Version:** v12  
**Type:** Feature Implementation  
**Phase:** 2.3 - Threshold Configuration & Formula Library (Continued)

## Summary

Implemented functional threshold evaluation system for numeric formulas, including:
- Core evaluation utilities
- React hook for threshold evaluation
- Visual badge component for displaying evaluations
- Test value input in the Details panel
- Default thresholds for the Loan Eligibility formula

## Context

This builds on v11 (Threshold Configuration) by making thresholds functional rather than just configuration. Users can now:
1. Define threshold ranges (v11)
2. **Evaluate values against those ranges** (v12 - this PR)
3. See visual feedback with color-coded badges
4. Test threshold behavior in real-time

## Implementation Details

### 1. Core Evaluation Utilities (`/utils/thresholdEvaluation.ts`)

**Functions:**
- `evaluateThreshold()` - Match value to threshold range
- `validateThresholds()` - Validate threshold definitions
- `formatThresholdRange()` - Format as human-readable string
- `getSuggestedThresholds()` - Pre-built threshold patterns

**Example Usage:**
```typescript
const thresholds = [
  { min: 0, max: 40, label: 'Not Eligible', severity: 'error', ... },
  { min: 41, max: 65, label: 'Review Required', severity: 'warning', ... },
  { min: 66, max: 85, label: 'Eligible', severity: 'info', ... },
  { min: 86, max: null, label: 'Highly Eligible', severity: 'success', ... }
];

const result = evaluateThreshold(75, thresholds);
// Returns: {
//   value: 75,
//   category: 'Eligible',
//   severity: 'info',
//   color: '#0F62FE',
//   threshold: { ... }
// }
```

**Validation:**
```typescript
const errors = validateThresholds(thresholds);
// Returns array of validation messages:
// - "Gap between X and Y"
// - "X overlaps with Y"
// - "X is open-ended but not the last range"
```

**Suggested Patterns:**
```typescript
const creditScoreThresholds = getSuggestedThresholds('credit-score');
const percentageThresholds = getSuggestedThresholds('percentage');
const riskThresholds = getSuggestedThresholds('risk');
const ratingThresholds = getSuggestedThresholds('rating');
```

### 2. Threshold Evaluation Hook (`useThresholdEvaluation`)

**Purpose:** React hook for evaluating values against thresholds

**Returns:**
- `evaluate(value)` - Evaluate a single value
- `currentEvaluation` - Current evaluation (if value provided)
- `formatRange(threshold)` - Format threshold range
- `getThresholdById(id)` - Get threshold by ID
- `hasMatch(value)` - Check if value matches any threshold

**Example:**
```typescript
const { evaluate, currentEvaluation } = useThresholdEvaluation({
  thresholds: loanEligibilityThresholds,
  value: 75
});

console.log(currentEvaluation?.category); // "Eligible"

const newEval = evaluate(95);
console.log(newEval?.category); // "Highly Eligible"
```

### 3. Threshold Badge Component

**Visual Display:** Color-coded badge showing evaluation result

**Props:**
- `evaluation: ThresholdEvaluation | null` - Result to display
- `showValue?: boolean` - Show numeric value (default: true)
- `size?: 'sm' | 'md' | 'lg'` - Size variant
- `className?: string` - Custom class

**Features:**
- Color-coded by severity (error/warning/info/success)
- Carbon Design System colors
- Hover effect with scale and shadow
- Accessible with title attribute

**Example:**
```tsx
<ThresholdBadge 
  evaluation={result}
  showValue
  size="md"
/>
// Renders: "75 - Eligible" with blue background
```

**Visual Design:**
```
┌─────────────────────────┐
│  75 - Eligible          │  ← Blue background (#0F62FE)
└─────────────────────────┘

┌─────────────────────────┐
│  95 - Highly Eligible   │  ← Green background (#24A148)
└─────────────────────────┘
```

### 4. Test Value Feature

**Location:** FormulaDetailsPanel → Thresholds section → Test Value input

**Purpose:** Allow users to test threshold evaluation in real-time

**UI Flow:**
1. User configures thresholds
2. Test Value input appears below threshold list
3. User enters a number (e.g., 75)
4. Badge appears showing evaluation (e.g., "75 - Eligible")
5. If no match, shows warning message

**Example:**
```
┌─────────────────────────────────────┐
│ Test Value                          │
│ [Enter value: 75______]             │
│ Enter a number to see how it would  │
│ be categorized                      │
│                                     │
│     ┌─────────────────────┐         │
│     │  75 - Eligible      │  ← Badge│
│     └─────────────────────┘         │
└─────────────────────────────────────┘
```

### 5. Default Thresholds

**Added to Loan Eligibility Formula:**

```typescript
thresholds: [
  {
    id: 'loan-thresh-1',
    min: 0,
    max: 40,
    label: 'Not Eligible',
    color: '#DA1E28',    // Red
    severity: 'error',
  },
  {
    id: 'loan-thresh-2',
    min: 41,
    max: 65,
    label: 'Review Required',
    color: '#F1C21B',    // Yellow
    severity: 'warning',
  },
  {
    id: 'loan-thresh-3',
    min: 66,
    max: 85,
    label: 'Eligible',
    color: '#0F62FE',    // Blue
    severity: 'info',
  },
  {
    id: 'loan-thresh-4',
    min: 86,
    max: null,           // Open-ended
    label: 'Highly Eligible',
    color: '#24A148',    // Green
    severity: 'success',
    isOpenEnded: true,
  },
]
```

**Rationale:**
- Continuous coverage: 0-40, 41-65, 66-85, 86+
- No gaps or overlaps
- Logical progression from red → yellow → blue → green
- Matches loan eligibility use case

### 6. Data Flow

**Loading Formula with Thresholds:**
```
App.tsx
  ├── Load "loan-eligibility" formula
  ├── EditorContainer receives thresholds from sample
  ├── Pass to FormulaDetailsPanel
  └── Display in ThresholdConfig + Test Value input

User interaction:
  ├── Enter test value: "75"
  ├── useThresholdEvaluation.evaluate(75)
  ├── Returns: { category: "Eligible", severity: "info", ... }
  └── ThresholdBadge renders: "75 - Eligible" (blue)
```

**State Management:**
```typescript
// App.tsx
const [formulaThresholds, setFormulaThresholds] = useState<Threshold[]>([]);

// Loaded from sample
formulaThresholds = sampleDoc.thresholds;

// Passed to Details panel
<FormulaDetailsPanel
  thresholds={formulaThresholds}
  onThresholdsChange={setFormulaThresholds}
/>

// Test value (local state in FormulaDetailsPanel)
const [testValue, setTestValue] = useState<string>('');
const { evaluate } = useThresholdEvaluation({ thresholds });
const evaluation = evaluate(parseFloat(testValue));
```

## Files Created/Modified

### Created:
```
/utils/thresholdEvaluation.ts
  ├── evaluateThreshold()
  ├── validateThresholds()
  ├── formatThresholdRange()
  └── getSuggestedThresholds()

/components/editors/code/FormulaEditor/
  ├── hooks/useThresholdEvaluation.ts
  ├── ThresholdBadge.tsx
  └── ThresholdBadge.module.css
```

### Modified:
```
/components/editors/code/FormulaEditor/
  ├── FormulaDetailsPanel.tsx    (Added test value input + badge)
  ├── FormulaDetailsPanel.module.css (Added test section styles)
  ├── hooks/index.ts             (Export useThresholdEvaluation)
  └── index.ts                   (Export ThresholdBadge)

/SampleData/formulaSamples.ts
  ├── FormulaDocument interface  (Added thresholds?: Threshold[])
  └── loan-eligibility sample    (Added default thresholds)

/components/EditorContainer/EditorContainer.tsx
  ├── Props                      (Added formulaThresholds + handler)
  └── loadFormulaDocument        (Load thresholds from sample)
```

## Usage Examples

### Example 1: Evaluate Value in Code

```typescript
import { evaluateThreshold } from '@/utils/thresholdEvaluation';

const thresholds = [
  { min: 0, max: 40, label: 'Not Eligible', severity: 'error', ... },
  { min: 41, max: 65, label: 'Review Required', severity: 'warning', ... },
  { min: 66, max: 85, label: 'Eligible', severity: 'info', ... },
  { min: 86, max: null, label: 'Highly Eligible', severity: 'success', ... }
];

// Evaluate a score
const score = 75;
const result = evaluateThreshold(score, thresholds);

console.log(result?.category);    // "Eligible"
console.log(result?.severity);    // "info"
console.log(result?.color);       // "#0F62FE"
```

### Example 2: Use Hook in Component

```typescript
import { useThresholdEvaluation, ThresholdBadge } from '@/components/editors/code/FormulaEditor';

function MyComponent() {
  const [score, setScore] = useState(75);
  const { evaluate, currentEvaluation } = useThresholdEvaluation({
    thresholds: myThresholds,
    value: score
  });

  return (
    <div>
      <input 
        type="number" 
        value={score} 
        onChange={(e) => setScore(parseInt(e.target.value))}
      />
      
      {currentEvaluation && (
        <ThresholdBadge evaluation={currentEvaluation} showValue />
      )}
    </div>
  );
}
```

### Example 3: Get Suggested Thresholds

```typescript
import { getSuggestedThresholds } from '@/utils/thresholdEvaluation';

// Credit score thresholds (300-850)
const creditThresholds = getSuggestedThresholds('credit-score');
// Returns: Poor, Fair, Good, Very Good, Excellent

// Percentage thresholds (0-100)
const percentageThresholds = getSuggestedThresholds('percentage');
// Returns: Low, Medium, High, Very High

// Risk thresholds (0-100+)
const riskThresholds = getSuggestedThresholds('risk');
// Returns: Low Risk, Medium Risk, High Risk

// Rating thresholds (1-5)
const ratingThresholds = getSuggestedThresholds('rating');
// Returns: 1 Star, 2 Stars, 3 Stars, 4 Stars, 5 Stars
```

## Testing Checklist

- [x] Evaluate value against thresholds
- [x] Test with value in first range (0-40)
- [x] Test with value in middle range (66-85)
- [x] Test with value in open-ended range (86+)
- [x] Test with value outside all ranges
- [x] Test badge renders with correct color
- [x] Test badge severity mapping (error/warning/info/success)
- [x] Test value input updates badge in real-time
- [x] Test "no match" message displays
- [x] Test load formula with default thresholds
- [x] Test suggested threshold patterns
- [x] Test threshold validation
- [x] Test badge size variants (sm/md/lg)
- [x] Test badge with/without value display

## Visual Design

### Threshold Badge Variants

**Error (Red):**
```
┌─────────────────────────┐
│  35 - Not Eligible      │  ← Red background
└─────────────────────────┘
```

**Warning (Yellow):**
```
┌─────────────────────────┐
│  50 - Review Required   │  ← Yellow background, dark text
└─────────────────────────┘
```

**Info (Blue):**
```
┌─────────────────────────┐
│  75 - Eligible          │  ← Blue background
└─────────────────────────┘
```

**Success (Green):**
```
┌─────────────────────────┐
│  95 - Highly Eligible   │  ← Green background
└─────────────────────────┘
```

### Test Value Section

```
┌────────────────────────────────────────┐
│ Test Value                             │
│ ┌────────────────────────────────────┐ │
│ │ 75                                 │ │
│ └────────────────────────────────────┘ │
│ Enter a number to see how it would be  │
│ categorized                            │
│                                        │
│        ┌─────────────────────┐         │
│        │  75 - Eligible      │         │
│        └─────────────────────┘         │
└────────────────────────────────────────┘
```

## Carbon Design System Compliance

**Colors (Severity Mapping):**
```css
Error:   #DA1E28  (Carbon red-60)
Warning: #F1C21B  (Carbon yellow-30)
Info:    #0F62FE  (Carbon blue-60)
Success: #24A148  (Carbon green-60)
```

**Badge Pattern:**
- Follows Carbon Tag/Badge visual language
- Rounded corners (border-radius: full)
- Proper spacing with design tokens
- Color-coded with sufficient contrast
- Hover effect (scale + shadow)

**Typography:**
- Value: Monospace font (IBM Plex Mono)
- Category: Sans-serif font (IBM Plex Sans)
- Proper weight and sizing

## Future Enhancements (Not in this PR)

### Formula Execution Integration
```typescript
// Execute formula and auto-evaluate
const executeFormula = (formula, variables) => {
  const value = evaluate(formula, variables);
  const threshold = evaluateThreshold(value, formula.thresholds);
  return { value, threshold };
};
```

### Function Syntax
```typescript
// In formulas
=LoanEligibilityScore()              // Returns: 75
=LoanEligibilityScore.evaluate()     // Returns: { value: 75, category: "Eligible", ... }
=LoanEligibilityScore.category()     // Returns: "Eligible"
=LoanEligibilityScore.severity()     // Returns: "info"
```

### Conditional Logic
```typescript
=IF(LoanEligibilityScore.category() = "Highly Eligible", "Auto-Approve", "Manual Review")
```

### Historical Analysis
```typescript
// Analyze past formula executions
const distribution = analyzeThresholdDistribution(pastExecutions, thresholds);
// Returns: { "Not Eligible": 15%, "Review Required": 30%, ... }
```

## Known Limitations

1. **No Formula Execution:** Evaluation is manual via test value input. Actual formula execution with automatic threshold evaluation will be in a future PR.

2. **Single Threshold Set:** Each formula has one threshold set. Can't switch between different threshold configurations.

3. **No Persistence:** Threshold evaluations are not stored. Only the threshold definitions are saved with the formula.

4. **No Analytics:** Can't track how many times each category was matched over time.

## Migration Notes

**For Existing Formulas:**
- Formulas without thresholds work as before
- Adding thresholds is optional
- Test value feature only appears when thresholds exist
- EditorContainer automatically loads thresholds from samples

**Breaking Changes:**
- None. This is a pure addition.

## Performance Considerations

**Evaluation Performance:**
- O(n) where n = number of thresholds
- Typically 3-5 thresholds per formula
- Evaluation is instant for user interaction

**Suggested Optimizations (if needed):**
- Binary search for sorted thresholds
- Memoization in hook
- Debounce test value input

## Related Files

```
Core Utilities:
  /utils/thresholdEvaluation.ts
  
Components:
  /components/editors/code/FormulaEditor/ThresholdBadge.tsx
  /components/editors/code/FormulaEditor/ThresholdBadge.module.css
  /components/editors/code/FormulaEditor/FormulaDetailsPanel.tsx
  /components/editors/code/FormulaEditor/FormulaDetailsPanel.module.css
  
Hooks:
  /components/editors/code/FormulaEditor/hooks/useThresholdEvaluation.ts
  /components/editors/code/FormulaEditor/hooks/index.ts
  
Data:
  /SampleData/formulaSamples.ts
  
Container:
  /components/EditorContainer/EditorContainer.tsx
  
Change Logs:
  /change-log/25-10-24_v12-ThresholdEvaluation.md (this file)
```

## References

- Parent Plan: `/change-log/25-10-24_v01-EditorArchitectureRefactor.md`
- Previous: `/change-log/25-10-24_v11-ThresholdConfiguration.md`
- Phase: 2.3 - Threshold Configuration & Formula Library
- Carbon Design: https://carbondesignsystem.com/components/tag/usage/
- Guidelines: `/guidelines/Guidelines.md`

## User Experience

**Before (v11):**
- User can configure thresholds
- Visual preview shows colored bars
- No way to test thresholds

**After (v12):**
- User can configure thresholds (same as before)
- **User can enter test values and see evaluation**
- **Real-time feedback with color-coded badges**
- **Clear visual confirmation of threshold behavior**
- **Sample formula (loan-eligibility) has default thresholds**

**Example User Flow:**
1. Open Formula Editor → Select "Loan Eligibility Score"
2. Click "Details" tab → See thresholds already configured
3. Scroll to "Test Value" input
4. Enter "75" → See badge: "75 - Eligible" (blue)
5. Try "35" → See badge: "35 - Not Eligible" (red)
6. Try "95" → See badge: "95 - Highly Eligible" (green)
7. User understands exactly how thresholds work!

## Next Steps (Phase 2.3 Continued)

1. **Formula Execution with Thresholds**
   - Execute formulas and auto-evaluate against thresholds
   - Display threshold evaluation in formula results
   - Support `.category()` and `.evaluate()` methods

2. **Formula Library**
   - Browse available formulas
   - Invoke formulas like Excel functions
   - Pass parameters and get evaluated results

3. **Threshold Analytics**
   - Track evaluation distribution over time
   - Show histogram of category occurrences
   - Suggest threshold adjustments based on data

4. **Multiple Threshold Sets**
   - Support different threshold configurations for different contexts
   - Switch between "Display", "Logic", "Reporting" threshold sets
   - Per-context evaluation

---

**Status:** ✅ Complete - Thresholds are now functional and testable!
