# v13 - Threshold Gap Handling - Phase 1 (Foundation)

**Date:** October 25, 2025  
**Type:** Feature Implementation  
**Status:** ✅ Complete  
**Epic:** [EPIC: Advanced Threshold Evaluation](/change-log/EPIC-AdvancedThresholdEvaluation.md)  
**Related:**
- [v06 - Threshold Evaluation Architecture](/change-log/25-10-25_v06-ThresholdEvaluationArchitecture.md)
- [v07 - Evaluation Engine Implementation](/change-log/25-10-25_v07-EvaluationEngineImplementation.md)
- [Evaluation Engine README](/services/evaluationEngine/README.md)

---

## Summary

Implemented **Phase 1** of the Advanced Threshold Evaluation epic: **Gap Detection & Validation**. Created the foundation for intelligent gap handling by implementing services that analyze threshold sets to detect gaps and overlaps, providing detailed validation, suggestions, and warnings.

This solves the "40.1 problem" where values fall between threshold ranges (e.g., `<= 40` and `> 41`) and provides the infrastructure for 7 different gap handling strategies.

---

## What Was Implemented

### 1. ThresholdValidator Service

**Location:** `/services/evaluationEngine/threshold/ThresholdValidator.ts`

**Capabilities:**
- ✅ Detect gaps between threshold ranges
- ✅ Detect overlaps between threshold ranges
- ✅ Provide detailed analysis with errors and warnings
- ✅ Generate helpful suggestions for fixing gaps
- ✅ Generate resolution recommendations for overlaps
- ✅ Validate individual threshold definitions
- ✅ Sort thresholds by lower bound
- ✅ Calculate total covered range
- ✅ Find gaps for specific values
- ✅ Check if thresholds form a continuous range

**Key Features:**
```typescript
const validator = new ThresholdValidator();

// Analyze threshold set
const analysis = validator.analyze(thresholds);
// Returns: { gaps, overlaps, isValid, errors, warnings }

// Find gap for a specific value
const gap = validator.findGapForValue(40.5, thresholds);
// Returns gap info if value falls in gap

// Check continuity
const isContinuous = validator.isContinuous(thresholds);
// Returns true if no gaps exist
```

### 2. ThresholdEvaluator Service

**Location:** `/services/evaluationEngine/threshold/ThresholdEvaluator.ts`

**Capabilities:**
- ✅ Evaluate values against threshold sets
- ✅ Detect when values fall in gaps
- ✅ Apply 7 different gap handling strategies:
  - `nearest` - Use closest threshold (default)
  - `interpolate` - Linear interpolation between values
  - `lower` - Always use lower threshold
  - `upper` - Always use upper threshold
  - `error` - Throw error (strict mode)
  - `default` - Return user-specified default
  - `null` - Return null
- ✅ Provide detailed metadata about evaluation
- ✅ Handle out-of-range values
- ✅ Batch evaluate multiple values

**Key Features:**
```typescript
const evaluator = new ThresholdEvaluator();

// Evaluate with gap handling
const result = evaluator.evaluate(40.5, thresholds, {
  gapStrategy: 'nearest'
});

// Returns:
// {
//   value: "Low",              // Value from nearest threshold
//   matchedThreshold: {...},   // The threshold that was selected
//   wasGap: true,              // Value was in a gap
//   strategyUsed: 'nearest',   // Strategy that was applied
//   metadata: {
//     distance: 0.5,           // Distance to selected threshold
//     gap: { min: 40, max: 41 } // The gap range
//   }
// }
```

### 3. Module Exports

**Location:** `/services/evaluationEngine/threshold/index.ts`

Barrel export providing clean public API:
```typescript
export { ThresholdValidator, ThresholdEvaluator };
export type { 
  GapAnalysis, 
  Gap, 
  Overlap, 
  GapStrategy, 
  EvaluationOptions, 
  ThresholdEvaluationResult 
};
```

### 4. Updated Main Engine Index

**Location:** `/services/evaluationEngine/index.ts`

Added threshold evaluation exports to main engine API:
```typescript
export { ThresholdValidator, ThresholdEvaluator } from './threshold';
export type { 
  GapAnalysis, 
  Gap, 
  Overlap, 
  GapStrategy, 
  EvaluationOptions, 
  ThresholdEvaluationResult 
} from './threshold';
```

### 5. Updated Evaluation Engine README

**Location:** `/services/evaluationEngine/README.md`

- ✅ Added Phase 2 (Current Sprint) with threshold gap handling
- ✅ Added Phase 5 (Formula Evaluation Debugger)
- ✅ Added Phase 6 (Named Formulas)
- ✅ Linked to all epic documentation

---

## Implementation Details

### Gap Detection Algorithm

**How it works:**

1. **Convert thresholds to segments** - Extract `[min, max]` ranges from each threshold
2. **Sort by lower bound** - Order segments from lowest to highest
3. **Check consecutive pairs** - For each pair, check if `next.min > current.max`
4. **Calculate gap size** - If gap exists, record the range `(current.max, next.min)`
5. **Generate suggestions** - Provide actionable fixes based on gap size

**Example:**
```typescript
Thresholds:
  - <= 40 ("Low")
  - > 41 ("High")

Gap Detected:
  - Range: 40 to 41
  - Suggestion: "Consider changing 'Low' max to 40.99 or 'High' min to 40.01"
```

### Overlap Detection Algorithm

**How it works:**

1. **Check all pairs** - Compare each threshold against every other
2. **Calculate intersection** - Find min/max of overlapping ranges
3. **Verify overlap exists** - Ensure intersection is non-empty
4. **Flag as error** - Overlaps are always errors (ambiguous matching)

**Example:**
```typescript
Thresholds:
  - 0-50 ("Low")
  - 40-100 ("Medium")

Overlap Detected:
  - Range: 40 to 50
  - Resolution: "Adjust ranges so they don't overlap"
```

### Gap Strategy Implementation

**Nearest Strategy:**
```typescript
// Calculate distance to both boundaries
distanceToLower = |value - gap.min|
distanceToUpper = |value - gap.max|

// Use closer boundary
if (distanceToUpper < distanceToLower) {
  return upperThreshold.value
} else {
  return lowerThreshold.value
}
```

**Interpolate Strategy:**
```typescript
// Linear interpolation formula
range = gap.max - gap.min
position = value - gap.min
factor = position / range
result = lowerValue + factor * (upperValue - lowerValue)

// Example: value=40.5, gap=(40,41), values=(10,20)
// factor = 0.5 / 1 = 0.5
// result = 10 + 0.5 * (20 - 10) = 15
```

**Error Strategy:**
```typescript
// Throw descriptive error
throw new Error(
  `Value ${value} falls in gap between ${gap.min} and ${gap.max}. ` +
  `${suggestion}`
);
```

---

## Type Definitions

### GapAnalysis

```typescript
interface GapAnalysis {
  gaps: Gap[];              // Detected gaps
  overlaps: Overlap[];      // Detected overlaps
  isValid: boolean;         // No blocking errors
  errors: string[];         // Blocking errors (overlaps)
  warnings: string[];       // Non-blocking warnings (gaps)
}
```

### Gap

```typescript
interface Gap {
  min: number;              // Gap start
  max: number;              // Gap end
  lowerThreshold: Threshold; // Threshold before gap
  upperThreshold: Threshold; // Threshold after gap
  suggestion?: string;      // Fix suggestion
}
```

### Overlap

```typescript
interface Overlap {
  min: number;              // Overlap start
  max: number | null;       // Overlap end (null if open-ended)
  thresholds: Threshold[];  // Overlapping thresholds
  resolution?: string;      // Resolution recommendation
}
```

### ThresholdEvaluationResult

```typescript
interface ThresholdEvaluationResult {
  value: any;                     // Result value
  matchedThreshold?: Threshold;   // Matched threshold (if any)
  wasGap: boolean;                // Whether value was in gap
  strategyUsed?: GapStrategy;     // Strategy applied (if gap)
  metadata?: {
    distance?: number;            // For 'nearest'
    interpolation?: {...};        // For 'interpolate'
    gap?: { min, max };          // Gap range
  };
}
```

---

## Usage Examples

### Example 1: Analyze Thresholds

```typescript
import { ThresholdValidator } from './services/evaluationEngine';

const validator = new ThresholdValidator();

const thresholds = [
  { id: '1', min: 0, max: 40, label: 'Low', value: 'L' },
  { id: '2', min: 41, max: null, label: 'High', value: 'H', isOpenEnded: true }
];

const analysis = validator.analyze(thresholds);

console.log(analysis.isValid);  // false (has gaps, but no overlaps)
console.log(analysis.warnings); 
// ["Gap detected: Values between 40 and 41 don't match any threshold..."]
```

### Example 2: Evaluate with Nearest Strategy

```typescript
import { ThresholdEvaluator } from './services/evaluationEngine';

const evaluator = new ThresholdEvaluator();

const result = evaluator.evaluate(40.5, thresholds, {
  gapStrategy: 'nearest'
});

console.log(result.value);           // 'L' (closer to 40 than 41)
console.log(result.wasGap);          // true
console.log(result.strategyUsed);    // 'nearest'
console.log(result.metadata.distance); // 0.5
```

### Example 3: Evaluate with Interpolate Strategy

```typescript
const numericThresholds = [
  { id: '1', min: 0, max: 40, label: 'Low', value: 10 },
  { id: '2', min: 41, max: null, label: 'High', value: 20, isOpenEnded: true }
];

const result = evaluator.evaluate(40.5, numericThresholds, {
  gapStrategy: 'interpolate'
});

console.log(result.value); // 15 (midpoint between 10 and 20)
console.log(result.metadata.interpolation);
// {
//   lowerValue: 10,
//   upperValue: 20,
//   factor: 0.5,
//   result: 15
// }
```

### Example 4: Strict Mode (Error Strategy)

```typescript
try {
  const result = evaluator.evaluate(40.5, thresholds, {
    gapStrategy: 'error'
  });
} catch (error) {
  console.error(error.message);
  // "Value 40.5 falls in gap between 40 and 41. No threshold matches.
  //  Consider changing 'Low' max to 40.99..."
}
```

### Example 5: Batch Evaluation

```typescript
const testValues = [35, 40.5, 45, 50.2, 100];

const results = evaluator.batchEvaluate(testValues, thresholds, {
  gapStrategy: 'nearest'
});

results.forEach((result, i) => {
  console.log(`${testValues[i]}: ${result.value} (gap: ${result.wasGap})`);
});
```

---

## Edge Cases Handled

### Floating Point Precision

Uses epsilon tolerance (0.00001) for gap detection to handle floating point arithmetic:

```typescript
// Without epsilon, 40.0 and 40.00000001 might appear as a gap
const epsilon = 0.00001;
if (next.min - current.max > epsilon) {
  // Real gap
}
```

### Open-Ended Ranges

Properly handles open-ended ranges (max = null):

```typescript
{
  min: 800,
  max: null,
  label: 'Excellent',
  isOpenEnded: true
}
```

### Out-of-Range Values

Handles values outside all defined ranges:

```typescript
// Value below all thresholds
evaluator.evaluate(-10, thresholds, { gapStrategy: 'nearest' });
// Returns: lowest threshold value

// Value above all thresholds  
evaluator.evaluate(9999, thresholds, { gapStrategy: 'nearest' });
// Returns: highest threshold value
```

### Non-Numeric Interpolation

Throws clear error when trying to interpolate non-numeric values:

```typescript
const stringThresholds = [
  { min: 0, max: 40, value: 'Low' },
  { min: 41, max: 100, value: 'High' }
];

// This will throw:
evaluator.evaluate(40.5, stringThresholds, { gapStrategy: 'interpolate' });
// Error: "Cannot interpolate between non-numeric values...
//         Consider using 'nearest' strategy instead."
```

---

## Files Created

### New Files
- `/services/evaluationEngine/threshold/ThresholdValidator.ts` - Gap/overlap detection (400+ lines)
- `/services/evaluationEngine/threshold/ThresholdEvaluator.ts` - Gap strategy evaluation (350+ lines)
- `/services/evaluationEngine/threshold/index.ts` - Module exports

### Modified Files
- `/services/evaluationEngine/index.ts` - Added threshold exports
- `/services/evaluationEngine/README.md` - Updated roadmap and documentation
- `/change-log/index.md` - Added this change log entry

---

## Testing Strategy

### Unit Tests Needed

**ThresholdValidator:**
- [ ] Detect single gap
- [ ] Detect multiple gaps
- [ ] Detect overlaps
- [ ] Handle open-ended ranges
- [ ] Generate helpful suggestions
- [ ] Validate individual thresholds
- [ ] Sort thresholds correctly
- [ ] Find gaps for specific values

**ThresholdEvaluator:**
- [ ] Direct match (no gap)
- [ ] Nearest strategy (both directions)
- [ ] Interpolate strategy (numeric)
- [ ] Interpolate error (non-numeric)
- [ ] Lower strategy
- [ ] Upper strategy
- [ ] Error strategy (throws)
- [ ] Default strategy
- [ ] Null strategy
- [ ] Out-of-range handling
- [ ] Batch evaluation

**Integration Tests:**
- [ ] Real-world credit score example
- [ ] Pricing tiers with gaps
- [ ] Performance ratings
- [ ] Risk categories

---

## Performance Characteristics

**Gap Detection:**
- Time complexity: O(n log n) for sorting + O(n) for gap detection = O(n log n)
- Space complexity: O(n) for segments array

**Overlap Detection:**
- Time complexity: O(n²) for all pairs comparison
- Space complexity: O(n²) worst case (all overlaps)

**Evaluation:**
- Time complexity: O(n) for finding direct match + O(n log n) for gap finding = O(n log n)
- Space complexity: O(1) for evaluation result

**Optimization opportunities:**
- Cache gap analysis for repeated evaluations
- Use interval tree for faster gap lookups (Phase 2 optimization)
- Pre-sort thresholds once

---

## Next Steps

### Phase 2: UI Integration (Next Sprint)

**Goal:** Add gap strategy configuration to Threshold Config UI

**Tasks:**
- [ ] Add gap strategy dropdown to ThresholdConfig component
- [ ] Add default value input (for 'default' strategy)
- [ ] Show gap/overlap warnings in UI
- [ ] Add gap indicator to test results
- [ ] Add strategy preview feature
- [ ] Update ThresholdBadge to show strategy

**Components to modify:**
- `/components/editors/code/FormulaEditor/ThresholdConfig.tsx`
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`
- `/components/editors/code/FormulaEditor/ThresholdBadge.tsx`

### Phase 3: Enhanced Utilities (Later)

- [ ] Replace basic `thresholdEvaluation.ts` utility with new evaluator
- [ ] Update `useThresholdEvaluation` hook to use new services
- [ ] Add visual threshold editor (drag-and-drop ranges)
- [ ] Add auto-fix suggestions

---

## Breaking Changes

**None** - This is purely additive. Existing threshold evaluation in `/utils/thresholdEvaluation.ts` continues to work.

---

## Notes

### Design Decisions

**Why 7 strategies?**
- Different business needs require different gap handling approaches
- Credit scoring: strict (error strategy)
- Pricing: nearest or interpolate
- Risk assessment: conservative (lower/upper)
- General use: default or null for explicit handling

**Why separate Validator and Evaluator?**
- Single Responsibility Principle
- Validator focuses on analysis and validation
- Evaluator focuses on runtime execution
- Can validate without evaluating (design-time checks)

**Why epsilon tolerance?**
- Floating point arithmetic is imprecise
- 40.0 and 40.00000001 should be considered equal
- Prevents false gap detection

### Carbon Design Integration

This implementation follows Carbon Design System principles:

- **Clear error states** - Descriptive error messages with suggestions
- **Progressive disclosure** - Warnings vs. errors (non-blocking vs. blocking)
- **Helpful defaults** - 'nearest' as default strategy (most intuitive)
- **Graceful degradation** - Falls back to null/default for edge cases

---

## References

- [EPIC: Advanced Threshold Evaluation](/change-log/EPIC-AdvancedThresholdEvaluation.md)
- [v06 - Threshold Evaluation Architecture](/change-log/25-10-25_v06-ThresholdEvaluationArchitecture.md)
- [Evaluation Engine README](/services/evaluationEngine/README.md)
- [Carbon Design System - Error States](https://carbondesignsystem.com/patterns/notification-pattern/)

---

**Status:** ✅ Phase 1 Complete - Ready for UI Integration
