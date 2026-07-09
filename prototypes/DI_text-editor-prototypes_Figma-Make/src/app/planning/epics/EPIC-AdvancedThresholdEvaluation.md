# EPIC: Advanced Threshold Evaluation with Gap Handling Strategies

**Status:** 📋 Planned  
**Priority:** High  
**Complexity:** Medium  
**Estimated Time:** 5-7 days  
**Dependencies:**
- ✅ Evaluation Engine (v07) - COMPLETE
- ✅ Basic Threshold Evaluation - COMPLETE
- ✅ Threshold Types & Architecture (v06) - PLANNED

---

## Vision Statement

Implement **production-ready threshold evaluation** with intelligent gap handling strategies that automatically resolve values falling between defined ranges, eliminating the "40.1 problem" where a value like 40.1 falls in a gap between `<=40` and `>41` thresholds.

**Current Pain Point:**  
Users define thresholds like:
```
<= 40  → "Low"
>  41  → "High"
```

Then test with value `40.5` and get an error or `null` because it doesn't match any threshold. This is confusing and forces users to manually adjust ranges.

**Solution:**  
Implement 7 gap handling strategies (error, default, null, nearest, interpolate, lower, upper) that intelligently handle gaps based on business requirements.

---

## User Stories

### Story 1: Detect Gaps and Overlaps

**As a** formula author  
**I want** automatic detection of gaps and overlaps in my thresholds  
**So that** I'm warned about potential issues before testing

**Acceptance Criteria:**
- [ ] Detect gaps between threshold ranges
- [ ] Detect overlapping threshold ranges
- [ ] Warn user in threshold configuration UI
- [ ] Show visual indicators for problematic ranges
- [ ] Provide suggestions for fixing gaps/overlaps

### Story 2: Nearest Strategy (Default for Gaps)

**As a** formula author  
**I want** values in gaps to automatically use the nearest threshold  
**So that** my formulas work without manual intervention

**Acceptance Criteria:**
- [ ] Calculate distance to nearest threshold boundary
- [ ] Return value from nearest threshold
- [ ] Show which threshold was selected in evaluation result
- [ ] Work with both numeric and date ranges

**Example:**
```typescript
Thresholds: <= 40 ("Low"), > 41 ("High")
Value: 40.5
Strategy: nearest
Result: "Low" (closer to 40 than 41)
```

### Story 3: Interpolate Strategy (for Numeric Values)

**As a** formula author  
**I want** numeric gaps to interpolate between thresholds  
**So that** I get proportional values for in-between cases

**Acceptance Criteria:**
- [ ] Linear interpolation between threshold values
- [ ] Only works when both thresholds return numbers
- [ ] Show calculation in evaluation result
- [ ] Proper handling of edge cases (division by zero, etc.)

**Example:**
```typescript
Thresholds: <= 40 (value: 10), > 41 (value: 20)
Value: 40.5
Strategy: interpolate
Calculation: 10 + (40.5-40)/(41-40) * (20-10) = 15
Result: 15
```

### Story 4: Error Strategy (Strict Mode)

**As a** formula author  
**I want** strict gap detection that throws errors  
**So that** I'm forced to fix my threshold definitions

**Acceptance Criteria:**
- [ ] Throw descriptive error when value falls in gap
- [ ] Error message shows the gap range
- [ ] Error message suggests nearby thresholds
- [ ] Works in both test panel and formula evaluation

### Story 5: Lower/Upper Strategies

**As a** formula author  
**I want** to always round down or always round up for gap values  
**So that** I have consistent, predictable behavior

**Acceptance Criteria:**
- [ ] Lower strategy always uses lower threshold
- [ ] Upper strategy always uses upper threshold
- [ ] Clear about which threshold was selected
- [ ] Works regardless of distance

### Story 6: Default/Null Strategies

**As a** formula author  
**I want** to return a default value or null for gaps  
**So that** I can handle missing cases explicitly in my logic

**Acceptance Criteria:**
- [ ] Default strategy returns user-specified default value
- [ ] Null strategy returns null
- [ ] Clear indication in evaluation result
- [ ] Can be used in IF conditions

### Story 7: Configure Gap Strategy per Threshold Set

**As a** formula author  
**I want** to choose the gap strategy for each threshold set  
**So that** different use cases can use different strategies

**Acceptance Criteria:**
- [ ] Gap strategy dropdown in Threshold Configuration UI
- [ ] Shows description of each strategy
- [ ] Default value input (for 'default' strategy)
- [ ] Preview of strategy behavior with example value

---

## Technical Architecture

### Phase 1: Gap Detection & Validation

**Goal:** Detect gaps and overlaps in threshold definitions

**New Service:** `/services/evaluationEngine/threshold/ThresholdValidator.ts`

```typescript
export interface GapAnalysis {
  /** Gaps detected between thresholds */
  gaps: Gap[];
  
  /** Overlaps detected between thresholds */
  overlaps: Overlap[];
  
  /** Whether thresholds are valid */
  isValid: boolean;
  
  /** Overall validation errors */
  errors: string[];
  
  /** Warnings (non-blocking) */
  warnings: string[];
}

export interface Gap {
  /** Gap range */
  min: number;
  max: number;
  
  /** Threshold before the gap */
  lowerThreshold: Threshold;
  
  /** Threshold after the gap */
  upperThreshold: Threshold;
  
  /** Suggested fix */
  suggestion?: string;
}

export interface Overlap {
  /** Overlap range */
  min: number;
  max: number;
  
  /** Overlapping thresholds */
  thresholds: Threshold[];
  
  /** Conflict resolution recommendation */
  resolution?: string;
}

export class ThresholdValidator {
  /**
   * Analyze threshold set for gaps and overlaps
   */
  analyze(thresholds: Threshold[]): GapAnalysis {
    const gaps = this.detectGaps(thresholds);
    const overlaps = this.detectOverlaps(thresholds);
    
    return {
      gaps,
      overlaps,
      isValid: gaps.length === 0 && overlaps.length === 0,
      errors: this.buildErrors(gaps, overlaps),
      warnings: this.buildWarnings(gaps, overlaps),
    };
  }
  
  /**
   * Detect gaps between thresholds
   */
  private detectGaps(thresholds: Threshold[]): Gap[] {
    // Sort by lower bound
    const sorted = this.sortByLowerBound(thresholds);
    const gaps: Gap[] = [];
    
    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i];
      const next = sorted[i + 1];
      
      const currentMax = this.getUpperBound(current);
      const nextMin = this.getLowerBound(next);
      
      if (currentMax !== null && nextMin > currentMax) {
        gaps.push({
          min: currentMax,
          max: nextMin,
          lowerThreshold: current,
          upperThreshold: next,
          suggestion: `Consider changing "${current.label}" max to ${nextMin - 0.01} or "${next.label}" min to ${currentMax + 0.01}`,
        });
      }
    }
    
    return gaps;
  }
  
  /**
   * Detect overlaps between thresholds
   */
  private detectOverlaps(thresholds: Threshold[]): Overlap[] {
    const overlaps: Overlap[] = [];
    
    for (let i = 0; i < thresholds.length; i++) {
      for (let j = i + 1; j < thresholds.length; j++) {
        const overlap = this.checkOverlap(thresholds[i], thresholds[j]);
        if (overlap) {
          overlaps.push({
            ...overlap,
            thresholds: [thresholds[i], thresholds[j]],
            resolution: `Use priority to determine which threshold wins, or adjust ranges`,
          });
        }
      }
    }
    
    return overlaps;
  }
  
  /**
   * Check if two thresholds overlap
   */
  private checkOverlap(a: Threshold, b: Threshold): { min: number; max: number } | null {
    const aMin = this.getLowerBound(a);
    const aMax = this.getUpperBound(a);
    const bMin = this.getLowerBound(b);
    const bMax = this.getUpperBound(b);
    
    // Determine overlap range
    const overlapMin = Math.max(aMin, bMin);
    const overlapMax = aMax === null || bMax === null 
      ? null 
      : Math.min(aMax, bMax);
    
    if (overlapMax !== null && overlapMin <= overlapMax) {
      return { min: overlapMin, max: overlapMax };
    }
    
    return null;
  }
  
  /**
   * Get lower bound of a threshold condition
   */
  private getLowerBound(threshold: Threshold): number {
    const { operator, value } = threshold.condition;
    
    switch (operator) {
      case '>=':
      case '>':
        return typeof value === 'number' ? value : -Infinity;
      case 'BETWEEN':
        return Array.isArray(value) ? value[0] : -Infinity;
      case '<=':
      case '<':
      case '=':
        return -Infinity;
      default:
        return -Infinity;
    }
  }
  
  /**
   * Get upper bound of a threshold condition
   */
  private getUpperBound(threshold: Threshold): number | null {
    const { operator, value } = threshold.condition;
    
    switch (operator) {
      case '<=':
      case '<':
        return typeof value === 'number' ? value : null;
      case 'BETWEEN':
        return Array.isArray(value) ? value[1] : null;
      case '>=':
      case '>':
      case '=':
        return null; // Open-ended
      default:
        return null;
    }
  }
  
  /**
   * Sort thresholds by lower bound
   */
  private sortByLowerBound(thresholds: Threshold[]): Threshold[] {
    return [...thresholds].sort((a, b) => {
      const aMin = this.getLowerBound(a);
      const bMin = this.getLowerBound(b);
      return aMin - bMin;
    });
  }
  
  /**
   * Build error messages
   */
  private buildErrors(gaps: Gap[], overlaps: Overlap[]): string[] {
    const errors: string[] = [];
    
    overlaps.forEach(overlap => {
      errors.push(
        `Overlap detected: "${overlap.thresholds[0].label}" and "${overlap.thresholds[1].label}" both match values between ${overlap.min} and ${overlap.max}`
      );
    });
    
    return errors;
  }
  
  /**
   * Build warning messages
   */
  private buildWarnings(gaps: Gap[], overlaps: Overlap[]): string[] {
    const warnings: string[] = [];
    
    gaps.forEach(gap => {
      warnings.push(
        `Gap detected: Values between ${gap.min} and ${gap.max} don't match any threshold`
      );
    });
    
    return warnings;
  }
}
```

---

### Phase 2: Gap Handling Strategies Implementation

**Goal:** Implement all 7 gap handling strategies

**Enhanced Service:** `/services/evaluationEngine/threshold/ThresholdEvaluator.ts`

```typescript
export interface EvaluationOptions {
  /** Gap handling strategy */
  gapStrategy?: GapStrategy;
  
  /** Default value (for 'default' strategy) */
  defaultValue?: any;
  
  /** Whether to throw errors on gaps (for 'error' strategy) */
  strict?: boolean;
}

export interface ThresholdEvaluationResult {
  /** Matched value */
  value: any;
  
  /** Matched threshold (if any) */
  matchedThreshold?: Threshold;
  
  /** Whether value fell in a gap */
  wasGap: boolean;
  
  /** Gap handling strategy used */
  strategyUsed?: GapStrategy;
  
  /** Additional metadata */
  metadata?: {
    /** For 'nearest': distance to selected threshold */
    distance?: number;
    
    /** For 'interpolate': interpolation calculation */
    interpolation?: {
      lowerValue: number;
      upperValue: number;
      factor: number;
      result: number;
    };
    
    /** For gaps: the gap range */
    gap?: { min: number; max: number };
  };
}

export class ThresholdEvaluator {
  private validator: ThresholdValidator;
  
  constructor() {
    this.validator = new ThresholdValidator();
  }
  
  /**
   * Evaluate a value against thresholds with gap handling
   */
  evaluate(
    value: number,
    thresholds: Threshold[],
    options: EvaluationOptions = {}
  ): ThresholdEvaluationResult {
    const {
      gapStrategy = 'nearest',
      defaultValue = null,
      strict = false,
    } = options;
    
    // Try direct match first
    const directMatch = this.findDirectMatch(value, thresholds);
    if (directMatch) {
      return {
        value: directMatch.value,
        matchedThreshold: directMatch,
        wasGap: false,
      };
    }
    
    // No direct match - value is in a gap or outside range
    // Find the gap
    const gaps = this.validator.detectGaps(thresholds);
    const containingGap = gaps.find(gap => value > gap.min && value < gap.max);
    
    if (!containingGap) {
      // Value is outside all defined ranges
      return this.handleOutOfRange(value, thresholds, gapStrategy, defaultValue);
    }
    
    // Value is in a gap - apply strategy
    return this.applyGapStrategy(
      value,
      containingGap,
      gapStrategy,
      defaultValue,
      strict
    );
  }
  
  /**
   * Find direct threshold match
   */
  private findDirectMatch(value: number, thresholds: Threshold[]): Threshold | null {
    return thresholds.find(threshold => {
      return this.matchesCondition(value, threshold.condition);
    }) || null;
  }
  
  /**
   * Check if value matches a condition
   */
  private matchesCondition(value: number, condition: ThresholdCondition): boolean {
    const { operator, value: condValue } = condition;
    
    switch (operator) {
      case '<':
        return value < (condValue as number);
      case '<=':
        return value <= (condValue as number);
      case '>':
        return value > (condValue as number);
      case '>=':
        return value >= (condValue as number);
      case '=':
        return value === condValue;
      case '!=':
        return value !== condValue;
      case 'BETWEEN':
        const [min, max] = condValue as [number, number];
        return value >= min && value <= max;
      case 'NOT_BETWEEN':
        const [min2, max2] = condValue as [number, number];
        return value < min2 || value > max2;
      default:
        return false;
    }
  }
  
  /**
   * Apply gap handling strategy
   */
  private applyGapStrategy(
    value: number,
    gap: Gap,
    strategy: GapStrategy,
    defaultValue: any,
    strict: boolean
  ): ThresholdEvaluationResult {
    switch (strategy) {
      case 'error':
        throw new Error(
          `Value ${value} falls in gap between ${gap.min} and ${gap.max}. ` +
          `No threshold matches. Suggestion: ${gap.suggestion}`
        );
      
      case 'default':
        return {
          value: defaultValue,
          wasGap: true,
          strategyUsed: 'default',
          metadata: { gap: { min: gap.min, max: gap.max } },
        };
      
      case 'null':
        return {
          value: null,
          wasGap: true,
          strategyUsed: 'null',
          metadata: { gap: { min: gap.min, max: gap.max } },
        };
      
      case 'nearest':
        return this.applyNearestStrategy(value, gap);
      
      case 'interpolate':
        return this.applyInterpolateStrategy(value, gap);
      
      case 'lower':
        return {
          value: gap.lowerThreshold.value,
          matchedThreshold: gap.lowerThreshold,
          wasGap: true,
          strategyUsed: 'lower',
          metadata: { gap: { min: gap.min, max: gap.max } },
        };
      
      case 'upper':
        return {
          value: gap.upperThreshold.value,
          matchedThreshold: gap.upperThreshold,
          wasGap: true,
          strategyUsed: 'upper',
          metadata: { gap: { min: gap.min, max: gap.max } },
        };
      
      default:
        throw new Error(`Unknown gap strategy: ${strategy}`);
    }
  }
  
  /**
   * Apply 'nearest' strategy - use closest threshold
   */
  private applyNearestStrategy(value: number, gap: Gap): ThresholdEvaluationResult {
    const distanceToLower = Math.abs(value - gap.min);
    const distanceToUpper = Math.abs(value - gap.max);
    
    const useUpper = distanceToUpper < distanceToLower;
    const selected = useUpper ? gap.upperThreshold : gap.lowerThreshold;
    const distance = useUpper ? distanceToUpper : distanceToLower;
    
    return {
      value: selected.value,
      matchedThreshold: selected,
      wasGap: true,
      strategyUsed: 'nearest',
      metadata: {
        distance,
        gap: { min: gap.min, max: gap.max },
      },
    };
  }
  
  /**
   * Apply 'interpolate' strategy - linear interpolation
   */
  private applyInterpolateStrategy(value: number, gap: Gap): ThresholdEvaluationResult {
    const lowerValue = gap.lowerThreshold.value;
    const upperValue = gap.upperThreshold.value;
    
    // Both values must be numeric for interpolation
    if (typeof lowerValue !== 'number' || typeof upperValue !== 'number') {
      throw new Error(
        `Cannot interpolate between non-numeric values: ${lowerValue} and ${upperValue}`
      );
    }
    
    // Linear interpolation
    const range = gap.max - gap.min;
    const position = value - gap.min;
    const factor = position / range;
    const result = lowerValue + factor * (upperValue - lowerValue);
    
    return {
      value: result,
      wasGap: true,
      strategyUsed: 'interpolate',
      metadata: {
        gap: { min: gap.min, max: gap.max },
        interpolation: {
          lowerValue,
          upperValue,
          factor,
          result,
        },
      },
    };
  }
  
  /**
   * Handle value outside all defined ranges
   */
  private handleOutOfRange(
    value: number,
    thresholds: Threshold[],
    strategy: GapStrategy,
    defaultValue: any
  ): ThresholdEvaluationResult {
    // For out-of-range, use default or null
    if (strategy === 'default') {
      return {
        value: defaultValue,
        wasGap: true,
        strategyUsed: 'default',
      };
    }
    
    return {
      value: null,
      wasGap: true,
      strategyUsed: 'null',
    };
  }
}
```

---

### Phase 3: UI Integration - Gap Strategy Configuration

**Goal:** Add gap strategy selector to Threshold Configuration UI

**Enhanced Component:** `/components/editors/code/FormulaEditor/ThresholdConfig.tsx`

**New UI Elements:**

1. **Gap Strategy Dropdown**
   ```tsx
   <Select
     value={gapStrategy}
     onValueChange={setGapStrategy}
     label="Gap Handling"
   >
     <SelectTrigger>
       <SelectValue placeholder="Select gap strategy..." />
     </SelectTrigger>
     <SelectContent>
       <SelectItem value="nearest">
         <div>
           <div className={styles.strategyLabel}>Nearest</div>
           <div className={styles.strategyDesc}>
             Use closest threshold (default)
           </div>
         </div>
       </SelectItem>
       <SelectItem value="interpolate">
         <div>
           <div className={styles.strategyLabel}>Interpolate</div>
           <div className={styles.strategyDesc}>
             Calculate proportional value (numeric only)
           </div>
         </div>
       </SelectItem>
       <SelectItem value="lower">
         <div>
           <div className={styles.strategyLabel}>Lower</div>
           <div className={styles.strategyDesc}>
             Always use lower threshold
           </div>
         </div>
       </SelectItem>
       <SelectItem value="upper">
         <div>
           <div className={styles.strategyLabel}>Upper</div>
           <div className={styles.strategyDesc}>
             Always use upper threshold
           </div>
         </div>
       </SelectItem>
       <SelectItem value="error">
         <div>
           <div className={styles.strategyLabel}>Error (Strict)</div>
           <div className={styles.strategyDesc}>
             Throw error on gaps - forces fixing
           </div>
         </div>
       </SelectItem>
       <SelectItem value="default">
         <div>
           <div className={styles.strategyLabel}>Default Value</div>
           <div className={styles.strategyDesc}>
             Return specified default
           </div>
         </div>
       </SelectItem>
       <SelectItem value="null">
         <div>
           <div className={styles.strategyLabel}>Null</div>
           <div className={styles.strategyDesc}>
             Return null for gaps
           </div>
         </div>
       </SelectItem>
     </SelectContent>
   </Select>
   ```

2. **Default Value Input** (shown only when strategy = 'default')
   ```tsx
   {gapStrategy === 'default' && (
     <div className={styles.defaultValueSection}>
       <Label>Default Value</Label>
       <Input
         type={formulaReturnType === 'number' ? 'number' : 'text'}
         value={defaultValue}
         onChange={(e) => setDefaultValue(e.target.value)}
         placeholder="Value to return for gaps"
       />
     </div>
   )}
   ```

3. **Gap/Overlap Warnings**
   ```tsx
   {analysis.warnings.length > 0 && (
     <Alert variant="warning" className={styles.validationAlert}>
       <AlertCircle className={styles.icon} />
       <AlertTitle>Threshold Gaps Detected</AlertTitle>
       <AlertDescription>
         <ul className={styles.warningList}>
           {analysis.warnings.map((warning, i) => (
             <li key={i}>{warning}</li>
           ))}
         </ul>
         <div className={styles.strategyNote}>
           Using <strong>{gapStrategy}</strong> strategy to handle gaps.
         </div>
       </AlertDescription>
     </Alert>
   )}
   
   {analysis.errors.length > 0 && (
     <Alert variant="destructive" className={styles.validationAlert}>
       <AlertCircle className={styles.icon} />
       <AlertTitle>Threshold Overlaps Detected</AlertTitle>
       <AlertDescription>
         <ul className={styles.errorList}>
           {analysis.errors.map((error, i) => (
             <li key={i}>{error}</li>
           ))}
         </ul>
       </AlertDescription>
     </Alert>
   )}
   ```

---

### Phase 4: Test Panel Integration

**Goal:** Show gap handling in action during formula testing

**Enhanced Component:** `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`

**New Display Elements:**

1. **Gap Indicator in Result**
   ```tsx
   {evaluationResult?.wasGap && (
     <div className={styles.gapIndicator}>
       <Info className={styles.icon} />
       <div className={styles.gapInfo}>
         <div className={styles.gapTitle}>Gap Handled</div>
         <div className={styles.gapDetails}>
           Value fell in gap ({evaluationResult.metadata?.gap.min} - {evaluationResult.metadata?.gap.max})
           <br />
           Strategy: <strong>{evaluationResult.strategyUsed}</strong>
         </div>
         {evaluationResult.strategyUsed === 'nearest' && (
           <div className={styles.strategyDetails}>
             Selected nearest threshold (distance: {evaluationResult.metadata?.distance?.toFixed(2)})
           </div>
         )}
         {evaluationResult.strategyUsed === 'interpolate' && evaluationResult.metadata?.interpolation && (
           <div className={styles.strategyDetails}>
             Interpolated: {evaluationResult.metadata.interpolation.lowerValue} + 
             {(evaluationResult.metadata.interpolation.factor * 100).toFixed(1)}% * 
             ({evaluationResult.metadata.interpolation.upperValue} - {evaluationResult.metadata.interpolation.lowerValue})
             = {evaluationResult.metadata.interpolation.result.toFixed(2)}
           </div>
         )}
       </div>
     </div>
   )}
   ```

2. **Strategy Preview**
   ```tsx
   <div className={styles.strategyPreview}>
     <h4>Gap Strategy Preview</h4>
     <p>Test with a gap value to see the strategy in action</p>
     
     <div className={styles.previewTest}>
       <Label>Test Gap Value</Label>
       <Input
         type="number"
         value={gapTestValue}
         onChange={(e) => setGapTestValue(parseFloat(e.target.value))}
         placeholder="e.g., 40.5"
         step="0.1"
       />
       {gapTestValue && (
         <div className={styles.previewResult}>
           <ArrowRight />
           <span>{previewGapResult?.value}</span>
           {previewGapResult?.wasGap && (
             <Badge variant="outline">Gap handled</Badge>
           )}
         </div>
       )}
     </div>
   </div>
   ```

---

## Implementation Phases

### Phase 1: Gap Detection & Validation (2 days)

**Goal:** Detect and report gaps/overlaps

**Tasks:**
- [ ] Create `ThresholdValidator` service
- [ ] Implement gap detection algorithm
- [ ] Implement overlap detection algorithm
- [ ] Unit tests for gap/overlap detection
- [ ] Edge case tests (open-ended ranges, single threshold, etc.)

**Output:** Working gap/overlap analyzer

---

### Phase 2: Gap Strategy Implementation (2-3 days)

**Goal:** Implement all 7 gap handling strategies

**Tasks:**
- [ ] Enhance `ThresholdEvaluator` with strategy support
- [ ] Implement 'error' strategy
- [ ] Implement 'default' strategy
- [ ] Implement 'null' strategy
- [ ] Implement 'nearest' strategy
- [ ] Implement 'interpolate' strategy
- [ ] Implement 'lower' strategy
- [ ] Implement 'upper' strategy
- [ ] Unit tests for each strategy
- [ ] Integration tests with evaluation engine

**Output:** Full gap strategy support in evaluator

---

### Phase 3: UI Integration (2 days)

**Goal:** Add gap configuration to UI

**Tasks:**
- [ ] Add gap strategy dropdown to ThresholdConfig
- [ ] Add default value input (for 'default' strategy)
- [ ] Add gap/overlap warnings to UI
- [ ] Add gap indicator to test results
- [ ] Add strategy preview to test panel
- [ ] Update threshold badge to show strategy
- [ ] CSS styling for all new UI elements

**Output:** Complete UI for gap configuration

---

### Phase 4: Testing & Documentation (1 day)

**Goal:** Comprehensive testing and docs

**Tasks:**
- [ ] End-to-end tests for all strategies
- [ ] Real-world scenario tests
- [ ] Performance tests (large threshold sets)
- [ ] Update README with gap handling docs
- [ ] Create usage examples
- [ ] Update change log

**Output:** Production-ready feature with docs

---

## User Flows

### Flow 1: Discover Gap Warning

1. User creates threshold set with gaps
2. User adds thresholds: `<= 40`, `> 41`
3. **Warning appears:** "Gap detected: Values between 40 and 41 don't match any threshold"
4. User sees suggestion: "Using nearest strategy to handle gaps"
5. User clicks "Test" with value `40.5`
6. Result shows: "Low" with badge "Gap handled (nearest)"
7. User understands their thresholds have gaps but they're being handled

### Flow 2: Choose Gap Strategy

1. User opens Gap Strategy dropdown
2. User sees all 7 strategies with descriptions
3. User selects "Interpolate" for proportional pricing
4. User tests with gap value
5. Result shows interpolated value with calculation details
6. User confirms strategy works as expected

### Flow 3: Fix Overlap Error

1. User creates overlapping thresholds
2. **Error appears:** "Overlap detected: 'Good' and 'Very Good' both match 720-739"
3. User adjusts ranges to remove overlap
4. Error clears
5. User tests successfully

### Flow 4: Strict Mode (Error Strategy)

1. User selects "Error (Strict)" strategy
2. User tests with gap value
3. **Error thrown:** "Value 40.5 falls in gap between 40 and 41. Suggestion: Consider changing 'Low' max to 40.99"
4. User fixes threshold ranges based on suggestion
5. User re-tests successfully

---

## Success Metrics

**Functionality:**
- [ ] All 7 gap strategies work correctly
- [ ] Gap detection finds all gaps accurately
- [ ] Overlap detection finds all overlaps accurately
- [ ] UI clearly communicates gaps and strategies
- [ ] Test panel shows gap handling in action

**Performance:**
- [ ] Gap detection <10ms for 100 thresholds
- [ ] Strategy evaluation adds <5ms overhead
- [ ] No UI lag when analyzing thresholds

**Usability:**
- [ ] Users understand gap warnings
- [ ] Users can choose appropriate strategy
- [ ] Strategy preview is helpful
- [ ] Error messages are actionable

---

## Edge Cases & Validation

### Edge Case 1: Open-Ended Ranges
```typescript
Thresholds: <= 40, 41-50, > 51
// How to handle 40.5?
// Answer: Gap between 40 and 41, apply strategy
```

### Edge Case 2: Single Threshold
```typescript
Thresholds: >= 100
Value: 50
// No lower threshold, out of range
// Answer: Use default or null strategy
```

### Edge Case 3: Floating Point Precision
```typescript
Thresholds: <= 40.0, > 40.0
Value: 40.00000001
// Should match "> 40.0" but floating point math may cause issues
// Answer: Use epsilon comparison for equality checks
```

### Edge Case 4: Interpolate with Non-Numeric
```typescript
Thresholds: <= 40 ("Low"), > 41 ("High")
Value: 40.5
Strategy: interpolate
// Cannot interpolate strings
// Answer: Throw error with clear message, suggest 'nearest' instead
```

### Edge Case 5: Overlapping with Priority
```typescript
Thresholds: 
  - 0-100 (priority: 1)
  - 50-150 (priority: 2)
Value: 75
// Matches both, which to use?
// Answer: Use priority (higher wins), or flag as error
```

---

## Data Structures

### Gap Analysis Result
```typescript
{
  gaps: [
    {
      min: 40,
      max: 41,
      lowerThreshold: { id: '1', condition: { operator: '<=', value: 40 }, value: 'Low' },
      upperThreshold: { id: '2', condition: { operator: '>', value: 41 }, value: 'High' },
      suggestion: "Consider changing 'Low' max to 40.99"
    }
  ],
  overlaps: [],
  isValid: false, // Has gaps but no overlaps
  errors: [],
  warnings: ["Gap detected: Values between 40 and 41 don't match any threshold"]
}
```

### Evaluation Result with Gap Info
```typescript
{
  value: "Low",
  matchedThreshold: { id: '1', label: 'Low', ... },
  wasGap: true,
  strategyUsed: 'nearest',
  metadata: {
    distance: 0.5,
    gap: { min: 40, max: 41 }
  }
}
```

---

## Future Enhancements

### Phase 5: Advanced Features

1. **Auto-Fix Gaps**
   - Suggest automatic fixes for detected gaps
   - One-click "Fill Gaps" button
   - Preview before applying

2. **Visual Threshold Editor**
   - Drag-and-drop threshold ranges on a number line
   - Visual gap/overlap indicators
   - Interactive gap filling

3. **Multi-Dimensional Thresholds**
   - Combine multiple input values (e.g., age AND income)
   - Decision matrix visualization
   - Complex condition builder

4. **Threshold Templates**
   - Predefined threshold sets for common use cases
   - Credit scoring templates
   - Pricing tier templates
   - Risk assessment templates

5. **Smart Suggestions**
   - ML-powered threshold suggestions based on data
   - Optimal threshold boundaries
   - Gap strategy recommendations

---

## Files to Create/Modify

### New Files
- `/services/evaluationEngine/threshold/ThresholdValidator.ts` - Gap/overlap detection
- `/services/evaluationEngine/threshold/GapStrategies.ts` - Strategy implementations
- `/services/evaluationEngine/threshold/index.ts` - Barrel export

### Modified Files
- `/services/evaluationEngine/threshold/ThresholdEvaluator.ts` - Add strategy support
- `/components/editors/code/FormulaEditor/ThresholdConfig.tsx` - Add gap UI
- `/components/editors/code/FormulaEditor/ThresholdConfig.module.css` - Gap UI styles
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx` - Show gap handling
- `/components/editors/core/types/EditorTypes.ts` - Add gap strategy types
- `/utils/thresholdEvaluation.ts` - Enhance with gap strategies

---

## Testing Strategy

### Unit Tests

```typescript
describe('ThresholdValidator', () => {
  it('detects gaps between thresholds', () => {
    const thresholds = [
      { condition: { operator: '<=', value: 40 }, value: 'Low' },
      { condition: { operator: '>', value: 41 }, value: 'High' }
    ];
    
    const analysis = validator.analyze(thresholds);
    expect(analysis.gaps).toHaveLength(1);
    expect(analysis.gaps[0].min).toBe(40);
    expect(analysis.gaps[0].max).toBe(41);
  });
  
  it('detects overlaps', () => {
    const thresholds = [
      { condition: { operator: 'BETWEEN', value: [0, 50] }, value: 'Low' },
      { condition: { operator: 'BETWEEN', value: [40, 100] }, value: 'High' }
    ];
    
    const analysis = validator.analyze(thresholds);
    expect(analysis.overlaps).toHaveLength(1);
    expect(analysis.overlaps[0].min).toBe(40);
    expect(analysis.overlaps[0].max).toBe(50);
  });
});

describe('GapStrategies', () => {
  const thresholds = [
    { id: '1', condition: { operator: '<=', value: 40 }, value: 10 },
    { id: '2', condition: { operator: '>', value: 41 }, value: 20 }
  ];
  
  it('nearest strategy chooses closer threshold', () => {
    const result = evaluator.evaluate(40.3, thresholds, { gapStrategy: 'nearest' });
    expect(result.value).toBe(10); // Closer to 40
    expect(result.wasGap).toBe(true);
    expect(result.metadata.distance).toBeCloseTo(0.3);
  });
  
  it('interpolate strategy calculates proportional value', () => {
    const result = evaluator.evaluate(40.5, thresholds, { gapStrategy: 'interpolate' });
    expect(result.value).toBe(15); // Midpoint between 10 and 20
    expect(result.wasGap).toBe(true);
    expect(result.metadata.interpolation.factor).toBe(0.5);
  });
  
  it('lower strategy always uses lower threshold', () => {
    const result = evaluator.evaluate(40.9, thresholds, { gapStrategy: 'lower' });
    expect(result.value).toBe(10);
    expect(result.matchedThreshold.id).toBe('1');
  });
  
  it('upper strategy always uses upper threshold', () => {
    const result = evaluator.evaluate(40.1, thresholds, { gapStrategy: 'upper' });
    expect(result.value).toBe(20);
    expect(result.matchedThreshold.id).toBe('2');
  });
  
  it('error strategy throws on gap', () => {
    expect(() => {
      evaluator.evaluate(40.5, thresholds, { gapStrategy: 'error' });
    }).toThrow(/falls in gap/);
  });
  
  it('default strategy returns default value', () => {
    const result = evaluator.evaluate(40.5, thresholds, { 
      gapStrategy: 'default',
      defaultValue: 'Unknown'
    });
    expect(result.value).toBe('Unknown');
  });
  
  it('null strategy returns null', () => {
    const result = evaluator.evaluate(40.5, thresholds, { gapStrategy: 'null' });
    expect(result.value).toBeNull();
  });
});
```

---

## References

**Related Documentation:**
- [v06 - Threshold Evaluation Architecture](./25-10-25_v06-ThresholdEvaluationArchitecture.md)
- [v07 - Evaluation Engine Implementation](./25-10-25_v07-EvaluationEngineImplementation.md)
- [Evaluation Engine README](/services/evaluationEngine/README.md)

**Inspiration:**
- IBM Operational Decision Manager (ODM) - Decision table gap handling
- Excel Conditional Formatting - Range-based rules
- SQL CASE statements - Range matching
- Google Sheets - Data validation with ranges

**Similar Patterns:**
- Decision tables with exhaustive coverage
- Range-based routing algorithms
- Interval tree data structures
- Fuzzy logic membership functions

---

## Next Steps

1. **Review Epic with Stakeholders**
   - Validate gap strategies are comprehensive
   - Confirm UI/UX approach
   - Prioritize strategies (can MVP with subset?)

2. **Spike: Gap Detection** (0.5 day)
   - Prototype gap detection algorithm
   - Test with real threshold examples
   - Validate performance

3. **Phase 1 Kickoff**
   - Create epic tracking issue
   - Break down into tasks
   - Assign implementation

---

**Epic Status:** 📋 Ready for Planning
**Next Epic:** Formula Evaluation Debugger (after this completes)
