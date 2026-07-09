# v06 - Threshold Evaluation Architecture

**Date:** October 25, 2025  
**Type:** Architectural Enhancement  
**Status:** Planning Phase - Extends v04 & v05  
**Related:** 
- [v04 - Formula Engine Architecture Plan](./25-10-25_v04-FormulaEngineArchitecturePlan.md)
- [v05 - Formula Engine Architecture Addendum](./25-10-25_v05-FormulaEngineArchitectureAddendum.md)
- [v12 - Threshold Evaluation](./25-10-24_v12-ThresholdEvaluation.md)

---

## Executive Summary

This document extends the evaluation engine architecture to handle **threshold-based evaluation** - a common pattern in business rules where values are mapped to categories/outcomes based on numeric ranges.

**Key Features:**
1. **Threshold evaluation** - Map numeric values to outcomes based on ranges
2. **Gap handling** - Intelligent strategies for values that fall between defined ranges
3. **Overlap detection** - Warn when ranges overlap ambiguously
4. **Edge value handling** - Proper handling of boundary values and floating points
5. **Multiple threshold types** - Support for numeric, date, and string-based thresholds

---

## Table of Contents

1. [Threshold Evaluation Fundamentals](#threshold-evaluation-fundamentals)
2. [Gap Handling Strategies](#gap-handling-strategies)
3. [Edge Cases & Validation](#edge-cases--validation)
4. [Threshold Types](#threshold-types)
5. [API Design](#api-design)
6. [Integration with Formula Engine](#integration-with-formula-engine)
7. [User Configuration](#user-configuration)
8. [Performance Optimization](#performance-optimization)
9. [Testing Strategy](#testing-strategy)

---

## Threshold Evaluation Fundamentals

### What is Threshold Evaluation?

**Definition:** Mapping an input value to an output based on which range it falls into.

**Example Use Cases:**
- **Credit scoring:** Score → Risk category (excellent/good/fair/poor)
- **Pricing tiers:** Usage → Price level
- **Performance ratings:** Score → Letter grade (A/B/C/D/F)
- **Age brackets:** Age → Demographic category
- **Temperature ranges:** Temp → Warning level (normal/caution/danger)

### Threshold Definition Structure

```typescript
// /services/evaluationEngine/types/ThresholdTypes.ts

export interface Threshold {
  /** Unique identifier */
  id: string;
  
  /** Condition defining the range */
  condition: ThresholdCondition;
  
  /** Output value when condition is met */
  value: any;
  
  /** Optional label for UI display */
  label?: string;
  
  /** Priority for conflict resolution (higher = higher priority) */
  priority?: number;
}

export interface ThresholdCondition {
  /** Operator: <, <=, >, >=, =, !=, BETWEEN */
  operator: ThresholdOperator;
  
  /** Comparison value(s) */
  value: number | string | Date | [number, number]; // [min, max] for BETWEEN
  
  /** Optional: combine multiple conditions with AND/OR */
  combinator?: 'AND' | 'OR';
  subConditions?: ThresholdCondition[];
}

export type ThresholdOperator = 
  | '<'    // Less than
  | '<='   // Less than or equal
  | '>'    // Greater than
  | '>='   // Greater than or equal
  | '='    // Equal
  | '!='   // Not equal
  | 'BETWEEN'      // Between min and max (inclusive)
  | 'NOT_BETWEEN'; // Not between min and max

export interface ThresholdSet {
  /** Set name */
  name: string;
  
  /** Variable/expression to evaluate */
  inputExpression: string;
  
  /** List of thresholds */
  thresholds: Threshold[];
  
  /** Gap handling strategy */
  gapStrategy: GapStrategy;
  
  /** Default value if no threshold matches */
  defaultValue?: any;
  
  /** Validation strictness */
  strict?: boolean;
}

export type GapStrategy = 
  | 'error'           // Throw error on gap
  | 'default'         // Return default value
  | 'null'            // Return null
  | 'nearest'         // Return nearest threshold
  | 'interpolate'     // Interpolate between thresholds (numeric only)
  | 'lower'           // Use lower threshold
  | 'upper';          // Use upper threshold
```

### Example Threshold Definitions

**Example 1 - Credit Score Categories:**

```typescript
const creditScoreThresholds: ThresholdSet = {
  name: 'Credit Score Rating',
  inputExpression: '$creditScore',
  gapStrategy: 'error',
  thresholds: [
    {
      id: '1',
      condition: { operator: '>=', value: 800 },
      value: 'Excellent',
      label: '800+: Excellent'
    },
    {
      id: '2',
      condition: { operator: 'BETWEEN', value: [740, 799] },
      value: 'Very Good',
      label: '740-799: Very Good'
    },
    {
      id: '3',
      condition: { operator: 'BETWEEN', value: [670, 739] },
      value: 'Good',
      label: '670-739: Good'
    },
    {
      id: '4',
      condition: { operator: 'BETWEEN', value: [580, 669] },
      value: 'Fair',
      label: '580-669: Fair'
    },
    {
      id: '5',
      condition: { operator: '<', value: 580 },
      value: 'Poor',
      label: 'Below 580: Poor'
    }
  ]
};
```

**Example 2 - Pricing Tiers (with gaps):**

```typescript
const pricingTiers: ThresholdSet = {
  name: 'Usage-Based Pricing',
  inputExpression: '$monthlyUsage',
  gapStrategy: 'nearest', // Handle gaps by using nearest tier
  thresholds: [
    {
      id: '1',
      condition: { operator: '<=', value: 100 },
      value: 10, // $10/month
      label: 'Basic: 0-100 units'
    },
    {
      id: '2',
      condition: { operator: 'BETWEEN', value: [101, 500] },
      value: 25,
      label: 'Standard: 101-500 units'
    },
    {
      id: '3',
      condition: { operator: '>', value: 500 },
      value: 50,
      label: 'Premium: 500+ units'
    }
  ]
};
```

**Example 3 - With Gaps (problematic):**

```typescript
// ❌ PROBLEM: What happens with value = 40.5?
const problematicThresholds: ThresholdSet = {
  name: 'Score Categories',
  inputExpression: '$score',
  gapStrategy: 'error', // Will fail on 40.5
  thresholds: [
    {
      id: '1',
      condition: { operator: '<=', value: 40 },
      value: 'Low'
    },
    {
      id: '2',
      condition: { operator: '>', value: 41 }, // Gap: 40 < x <= 41
      value: 'High'
    }
  ]
};

// ✅ SOLUTION 1: Fix the gap
const fixedThresholds1: ThresholdSet = {
  name: 'Score Categories',
  inputExpression: '$score',
  thresholds: [
    {
      id: '1',
      condition: { operator: '<=', value: 40 },
      value: 'Low'
    },
    {
      id: '2',
      condition: { operator: '>', value: 40 }, // No gap
      value: 'High'
    }
  ]
};

// ✅ SOLUTION 2: Use gap strategy
const fixedThresholds2: ThresholdSet = {
  name: 'Score Categories',
  inputExpression: '$score',
  gapStrategy: 'nearest', // 40.5 → nearest is 'Low' (distance: 0.5 from 40)
  thresholds: [
    {
      id: '1',
      condition: { operator: '<=', value: 40 },
      value: 'Low'
    },
    {
      id: '2',
      condition: { operator: '>', value: 41 },
      value: 'High'
    }
  ]
};
```

---

## Gap Handling Strategies

### 1. Error Strategy (Strict)

**Behavior:** Throw error if value doesn't match any threshold.

**Use when:**
- Data quality is critical
- Gaps indicate configuration error
- Want to force explicit handling of all cases

**Example:**

```typescript
// Input: 40.5
// Thresholds: <=40, >41
// Result: Error

{
  success: false,
  error: {
    type: 'GapError',
    message: 'Value 40.5 does not match any threshold',
    value: 40.5,
    gaps: [
      { min: 40, max: 41, exclusive: true }
    ],
    suggestion: 'Adjust threshold conditions to cover this value'
  }
}
```

### 2. Default Strategy

**Behavior:** Return default value if no threshold matches.

**Use when:**
- Have a sensible fallback
- Gaps are expected and acceptable
- Want to handle edge cases gracefully

**Example:**

```typescript
{
  name: 'Score Categories',
  inputExpression: '$score',
  gapStrategy: 'default',
  defaultValue: 'Unclassified',
  thresholds: [...]
}

// Input: 40.5
// Result: 'Unclassified'
```

### 3. Null Strategy

**Behavior:** Return null if no threshold matches.

**Use when:**
- Caller will handle null explicitly
- Want to distinguish "no match" from actual values
- Integrating with systems that expect null for "unknown"

**Example:**

```typescript
// Input: 40.5
// Result: null
```

### 4. Nearest Strategy (Smart Fallback)

**Behavior:** Return the threshold whose boundary is closest to the input value.

**Algorithm:**

```typescript
function findNearestThreshold(value: number, thresholds: Threshold[]): Threshold {
  let minDistance = Infinity;
  let nearestThreshold: Threshold | null = null;
  
  for (const threshold of thresholds) {
    const distance = calculateDistanceToThreshold(value, threshold);
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestThreshold = threshold;
    }
  }
  
  return nearestThreshold!;
}

function calculateDistanceToThreshold(value: number, threshold: Threshold): number {
  const { operator, value: thresholdValue } = threshold.condition;
  
  if (operator === 'BETWEEN') {
    const [min, max] = thresholdValue as [number, number];
    
    if (value < min) {
      return min - value; // Distance to lower bound
    } else if (value > max) {
      return value - max; // Distance to upper bound
    } else {
      return 0; // Inside range
    }
  }
  
  if (operator === '<=' || operator === '<') {
    const boundary = thresholdValue as number;
    return value > boundary ? value - boundary : 0;
  }
  
  if (operator === '>=' || operator === '>') {
    const boundary = thresholdValue as number;
    return value < boundary ? boundary - value : 0;
  }
  
  // For '=' operator
  return Math.abs(value - (thresholdValue as number));
}
```

**Example:**

```typescript
// Thresholds: <=40 → 'Low', >41 → 'High'
// Input: 40.1
// Distance to 40: 0.1
// Distance to 41: 0.9
// Result: 'Low' (closer to 40)

// Input: 40.9
// Distance to 40: 0.9
// Distance to 41: 0.1
// Result: 'High' (closer to 41)
```

### 5. Interpolate Strategy (Numeric Only)

**Behavior:** Interpolate value between adjacent thresholds.

**Use when:**
- Thresholds represent a continuous scale
- Want smooth transitions
- Values are purely numeric

**Algorithm:**

```typescript
function interpolate(
  value: number,
  lowerThreshold: Threshold,
  upperThreshold: Threshold
): number {
  const lowerBound = getLowerBound(lowerThreshold);
  const upperBound = getUpperBound(upperThreshold);
  const lowerValue = lowerThreshold.value as number;
  const upperValue = upperThreshold.value as number;
  
  // Linear interpolation
  const ratio = (value - lowerBound) / (upperBound - lowerBound);
  return lowerValue + ratio * (upperValue - lowerValue);
}
```

**Example:**

```typescript
// Thresholds:
// - <=40 → 10
// - >41 → 20

// Input: 40.5 (midpoint of gap)
// Result: 15 (midpoint between 10 and 20)

// Input: 40.25 (25% into gap)
// Result: 12.5 (25% between 10 and 20)
```

### 6. Lower/Upper Strategies

**Lower:** Always use the threshold below the gap.  
**Upper:** Always use the threshold above the gap.

**Use when:**
- Conservative approach needed (e.g., always round down for safety)
- Business rule requires specific bias

**Example:**

```typescript
// Thresholds: <=40 → 'Low', >41 → 'High'
// gapStrategy: 'lower'

// Input: 40.1, 40.5, 40.9
// Result: Always 'Low'

// gapStrategy: 'upper'
// Result: Always 'High'
```

---

## Edge Cases & Validation

### 1. Gap Detection

**Automatic gap detection during threshold set validation:**

```typescript
// /services/evaluationEngine/validation/ThresholdValidator.ts

export class ThresholdValidator {
  /**
   * Validate threshold set and detect gaps
   */
  validate(thresholdSet: ThresholdSet): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const gaps: Gap[] = [];
    
    // Sort thresholds by boundary values
    const sorted = this.sortThresholds(thresholdSet.thresholds);
    
    // Check for gaps between adjacent thresholds
    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i];
      const next = sorted[i + 1];
      
      const gap = this.findGap(current, next);
      
      if (gap) {
        gaps.push(gap);
        
        if (thresholdSet.gapStrategy === 'error') {
          errors.push({
            type: 'GapError',
            message: `Gap detected between thresholds: ${gap.min} to ${gap.max}`,
            gap
          });
        } else {
          warnings.push({
            type: 'GapWarning',
            message: `Gap detected between thresholds: ${gap.min} to ${gap.max}`,
            gap,
            strategy: thresholdSet.gapStrategy
          });
        }
      }
    }
    
    // Check for overlaps
    const overlaps = this.findOverlaps(sorted);
    overlaps.forEach(overlap => {
      warnings.push({
        type: 'OverlapWarning',
        message: `Overlapping thresholds detected`,
        overlap
      });
    });
    
    // Check for missing coverage
    const coverage = this.checkCoverage(sorted);
    if (!coverage.complete && thresholdSet.gapStrategy === 'error') {
      warnings.push({
        type: 'IncompleteCoverage',
        message: 'Thresholds do not cover all possible values',
        uncoveredRanges: coverage.gaps
      });
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings,
      gaps,
      overlaps
    };
  }
  
  /**
   * Find gap between two thresholds
   */
  private findGap(lower: Threshold, upper: Threshold): Gap | null {
    const lowerBound = this.getUpperBound(lower);
    const upperBound = this.getLowerBound(upper);
    
    if (lowerBound === null || upperBound === null) {
      return null; // Can't determine gap
    }
    
    // Check if there's a gap
    if (lowerBound < upperBound) {
      return {
        min: lowerBound,
        max: upperBound,
        exclusive: true
      };
    }
    
    return null;
  }
  
  /**
   * Get upper boundary of a threshold
   */
  private getUpperBound(threshold: Threshold): number | null {
    const { operator, value } = threshold.condition;
    
    if (operator === '<=') {
      return value as number;
    }
    if (operator === '<') {
      return (value as number) - Number.EPSILON; // Just below
    }
    if (operator === 'BETWEEN') {
      return (value as [number, number])[1];
    }
    if (operator === '=') {
      return value as number;
    }
    
    return null; // No upper bound (e.g., >=, >)
  }
  
  /**
   * Get lower boundary of a threshold
   */
  private getLowerBound(threshold: Threshold): number | null {
    const { operator, value } = threshold.condition;
    
    if (operator === '>=') {
      return value as number;
    }
    if (operator === '>') {
      return (value as number) + Number.EPSILON; // Just above
    }
    if (operator === 'BETWEEN') {
      return (value as [number, number])[0];
    }
    if (operator === '=') {
      return value as number;
    }
    
    return null; // No lower bound (e.g., <=, <)
  }
}

export interface Gap {
  min: number;
  max: number;
  exclusive: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  gaps: Gap[];
  overlaps: Overlap[];
}
```

### 2. Overlap Detection

**Problem:** Multiple thresholds match the same value.

```typescript
// Overlapping thresholds
const overlapping: Threshold[] = [
  { condition: { operator: '>=', value: 50 }, value: 'Medium' },
  { condition: { operator: '<=', value: 100 }, value: 'Low' }
];

// Input: 75 matches BOTH thresholds
// Solution: Use priority
```

**Resolution Strategy:**

```typescript
export interface Threshold {
  // ...
  priority?: number; // Higher number = higher priority
}

function resolveOverlap(matches: Threshold[]): Threshold {
  // Sort by priority (descending)
  const sorted = [...matches].sort((a, b) => 
    (b.priority || 0) - (a.priority || 0)
  );
  
  // Return highest priority
  return sorted[0];
}
```

### 3. Floating Point Precision

**Problem:** Floating point comparisons can be imprecise.

```typescript
// Problem
const value = 40.0;
const threshold = { operator: '>', value: 40 };

// Due to floating point, might not match exactly
// Solution: Use epsilon for comparisons

const EPSILON = 1e-10;

function compareWithEpsilon(a: number, b: number, operator: string): boolean {
  const diff = Math.abs(a - b);
  
  if (diff < EPSILON) {
    // Essentially equal
    return operator === '=' || operator === '<=' || operator === '>=';
  }
  
  // Normal comparison
  switch (operator) {
    case '<': return a < b;
    case '<=': return a <= b;
    case '>': return a > b;
    case '>=': return a >= b;
    case '=': return false; // Already checked with epsilon
    case '!=': return true; // Already checked with epsilon
    default: throw new Error(`Unknown operator: ${operator}`);
  }
}
```

### 4. Boundary Values

**Problem:** Inclusive vs. exclusive boundaries.

```typescript
// Example: Score from 0-100

// ✅ GOOD - Complete coverage, no gaps
[
  { condition: { operator: '<', value: 50 }, value: 'Low' },     // 0-49.999...
  { condition: { operator: '>=', value: 50 }, value: 'High' }    // 50-100
]

// ✅ GOOD - Alternative
[
  { condition: { operator: '<=', value: 49 }, value: 'Low' },    // 0-49
  { condition: { operator: '>', value: 49 }, value: 'High' }     // 50-100
]

// ❌ BAD - Gap at exactly 50
[
  { condition: { operator: '<', value: 50 }, value: 'Low' },
  { condition: { operator: '>', value: 50 }, value: 'High' }
]

// ❌ BAD - Overlap at exactly 50
[
  { condition: { operator: '<=', value: 50 }, value: 'Low' },
  { condition: { operator: '>=', value: 50 }, value: 'High' }
]
```

### 5. Infinite Ranges

**Problem:** Handling unbounded ranges.

```typescript
// ✅ GOOD - Explicit unbounded ranges
[
  { condition: { operator: '<', value: 0 }, value: 'Negative' },
  { condition: { operator: 'BETWEEN', value: [0, 100] }, value: 'Normal' },
  { condition: { operator: '>', value: 100 }, value: 'High' }
]

// Special case: -Infinity and +Infinity
[
  { condition: { operator: '<', value: -Infinity }, value: 'Error' }, // Nothing can be < -Infinity
  { condition: { operator: '>', value: Infinity }, value: 'Error' }   // Nothing can be > Infinity
]
```

---

## Threshold Types

### 1. Numeric Thresholds (Primary)

**Standard numeric range-based thresholds.**

```typescript
const numericThreshold: ThresholdSet = {
  name: 'Temperature Warning Levels',
  inputExpression: '$temperature',
  gapStrategy: 'nearest',
  thresholds: [
    {
      id: '1',
      condition: { operator: '<', value: 0 },
      value: 'Freezing',
      label: 'Below 0°C'
    },
    {
      id: '2',
      condition: { operator: 'BETWEEN', value: [0, 30] },
      value: 'Normal',
      label: '0-30°C'
    },
    {
      id: '3',
      condition: { operator: '>', value: 30 },
      value: 'Hot',
      label: 'Above 30°C'
    }
  ]
};
```

### 2. Date Thresholds

**Time-based thresholds using date comparisons.**

```typescript
const dateThreshold: ThresholdSet = {
  name: 'Payment Terms',
  inputExpression: '#invoice.dueDate',
  gapStrategy: 'default',
  defaultValue: 'Current',
  thresholds: [
    {
      id: '1',
      condition: { operator: '<', value: 'TODAY' }, // Special: TODAY, NOW
      value: 'Overdue',
      label: 'Past due date'
    },
    {
      id: '2',
      condition: { operator: 'BETWEEN', value: ['TODAY', 'TODAY+7'] },
      value: 'Due Soon',
      label: 'Due within 7 days'
    },
    {
      id: '3',
      condition: { operator: '>', value: 'TODAY+7' },
      value: 'Future',
      label: 'More than 7 days away'
    }
  ]
};
```

### 3. String/Categorical Thresholds

**Based on string comparison (alphabetical or custom order).**

```typescript
const stringThreshold: ThresholdSet = {
  name: 'Priority Escalation',
  inputExpression: '$priority',
  gapStrategy: 'error',
  thresholds: [
    {
      id: '1',
      condition: { operator: '=', value: 'Critical' },
      value: 'Immediate',
      priority: 4
    },
    {
      id: '2',
      condition: { operator: '=', value: 'High' },
      value: '4 hours',
      priority: 3
    },
    {
      id: '3',
      condition: { operator: '=', value: 'Medium' },
      value: '24 hours',
      priority: 2
    },
    {
      id: '4',
      condition: { operator: '=', value: 'Low' },
      value: '7 days',
      priority: 1
    }
  ]
};
```

### 4. Multi-Dimensional Thresholds

**Combining multiple input variables.**

```typescript
const multiDimensional: ThresholdSet = {
  name: 'Loan Approval',
  inputExpression: '[$creditScore, $income, $debtToIncome]',
  gapStrategy: 'default',
  defaultValue: 'Review Required',
  thresholds: [
    {
      id: '1',
      condition: {
        combinator: 'AND',
        subConditions: [
          { operator: '>=', value: 750 },     // creditScore >= 750
          { operator: '>=', value: 80000 },   // income >= 80000
          { operator: '<=', value: 0.3 }      // debtToIncome <= 30%
        ]
      },
      value: 'Auto-Approve',
      priority: 1
    },
    {
      id: '2',
      condition: {
        combinator: 'OR',
        subConditions: [
          { operator: '<', value: 600 },      // creditScore < 600
          { operator: '>', value: 0.5 }       // debtToIncome > 50%
        ]
      },
      value: 'Auto-Reject',
      priority: 2
    }
  ]
};
```

---

## API Design

### Threshold Evaluator

```typescript
// /services/evaluationEngine/threshold/ThresholdEvaluator.ts

export class ThresholdEvaluator {
  private validator: ThresholdValidator;
  
  constructor() {
    this.validator = new ThresholdValidator();
  }
  
  /**
   * Evaluate value against threshold set
   */
  evaluate(
    value: any,
    thresholdSet: ThresholdSet,
    context?: ExecutionContext
  ): ThresholdEvaluationResult {
    // Validate threshold set first
    const validation = this.validator.validate(thresholdSet);
    
    if (!validation.valid) {
      return {
        success: false,
        errors: validation.errors,
        warnings: validation.warnings
      };
    }
    
    // Find matching thresholds
    const matches = this.findMatches(value, thresholdSet.thresholds);
    
    if (matches.length === 0) {
      // No matches - use gap strategy
      return this.handleGap(value, thresholdSet, validation.gaps);
    }
    
    if (matches.length === 1) {
      // Single match
      return {
        success: true,
        value: matches[0].value,
        matchedThreshold: matches[0],
        warnings: validation.warnings
      };
    }
    
    // Multiple matches - resolve overlap
    const resolved = this.resolveOverlap(matches);
    
    return {
      success: true,
      value: resolved.value,
      matchedThreshold: resolved,
      warnings: [
        ...validation.warnings,
        {
          type: 'OverlapResolved',
          message: `Multiple thresholds matched, using priority ${resolved.priority}`,
          matches
        }
      ]
    };
  }
  
  /**
   * Find all matching thresholds
   */
  private findMatches(value: any, thresholds: Threshold[]): Threshold[] {
    return thresholds.filter(threshold => 
      this.evaluateCondition(value, threshold.condition)
    );
  }
  
  /**
   * Evaluate a single condition
   */
  private evaluateCondition(value: any, condition: ThresholdCondition): boolean {
    const { operator, value: conditionValue, combinator, subConditions } = condition;
    
    // Handle combined conditions
    if (subConditions && subConditions.length > 0) {
      const results = subConditions.map(sub => 
        this.evaluateCondition(value, sub)
      );
      
      return combinator === 'AND' 
        ? results.every(r => r)
        : results.some(r => r);
    }
    
    // Single condition
    return this.compareValues(value, operator, conditionValue);
  }
  
  /**
   * Compare values with operator
   */
  private compareValues(
    value: any,
    operator: ThresholdOperator,
    conditionValue: any
  ): boolean {
    // Handle BETWEEN specially
    if (operator === 'BETWEEN') {
      const [min, max] = conditionValue as [number, number];
      return value >= min && value <= max;
    }
    
    if (operator === 'NOT_BETWEEN') {
      const [min, max] = conditionValue as [number, number];
      return value < min || value > max;
    }
    
    // Numeric comparison with epsilon for floating point
    if (typeof value === 'number' && typeof conditionValue === 'number') {
      return this.compareNumbers(value, operator, conditionValue);
    }
    
    // Date comparison
    if (value instanceof Date || conditionValue instanceof Date) {
      return this.compareDates(value, operator, conditionValue);
    }
    
    // String/other comparison
    switch (operator) {
      case '<': return value < conditionValue;
      case '<=': return value <= conditionValue;
      case '>': return value > conditionValue;
      case '>=': return value >= conditionValue;
      case '=': return value === conditionValue;
      case '!=': return value !== conditionValue;
      default: throw new Error(`Unknown operator: ${operator}`);
    }
  }
  
  /**
   * Compare numbers with epsilon for floating point precision
   */
  private compareNumbers(
    a: number,
    operator: ThresholdOperator,
    b: number
  ): boolean {
    const EPSILON = 1e-10;
    const diff = Math.abs(a - b);
    
    if (diff < EPSILON) {
      // Essentially equal
      return operator === '=' || operator === '<=' || operator === '>=';
    }
    
    switch (operator) {
      case '<': return a < b;
      case '<=': return a <= b;
      case '>': return a > b;
      case '>=': return a >= b;
      case '=': return false;
      case '!=': return true;
      default: throw new Error(`Unknown operator: ${operator}`);
    }
  }
  
  /**
   * Compare dates
   */
  private compareDates(
    a: Date | string,
    operator: ThresholdOperator,
    b: Date | string
  ): boolean {
    const dateA = a instanceof Date ? a : this.parseDate(a);
    const dateB = b instanceof Date ? b : this.parseDate(b);
    
    const timeA = dateA.getTime();
    const timeB = dateB.getTime();
    
    switch (operator) {
      case '<': return timeA < timeB;
      case '<=': return timeA <= timeB;
      case '>': return timeA > timeB;
      case '>=': return timeA >= timeB;
      case '=': return timeA === timeB;
      case '!=': return timeA !== timeB;
      default: throw new Error(`Unknown operator: ${operator}`);
    }
  }
  
  /**
   * Parse date string (supports special values like TODAY, NOW)
   */
  private parseDate(value: string): Date {
    if (value === 'TODAY' || value === 'NOW') {
      return new Date();
    }
    
    // Handle relative dates: TODAY+7, NOW-3, etc.
    const match = value.match(/^(TODAY|NOW)([+-])(\d+)$/);
    if (match) {
      const base = new Date();
      const operator = match[2];
      const days = parseInt(match[3], 10);
      
      if (operator === '+') {
        base.setDate(base.getDate() + days);
      } else {
        base.setDate(base.getDate() - days);
      }
      
      return base;
    }
    
    return new Date(value);
  }
  
  /**
   * Handle gap (no matching threshold)
   */
  private handleGap(
    value: any,
    thresholdSet: ThresholdSet,
    gaps: Gap[]
  ): ThresholdEvaluationResult {
    const { gapStrategy, defaultValue, thresholds } = thresholdSet;
    
    switch (gapStrategy) {
      case 'error':
        return {
          success: false,
          errors: [{
            type: 'GapError',
            message: `Value ${value} does not match any threshold`,
            value,
            gaps
          }]
        };
      
      case 'default':
        return {
          success: true,
          value: defaultValue,
          usedDefaultValue: true,
          warnings: [{
            type: 'GapWarning',
            message: `Value ${value} did not match any threshold, using default`,
            value,
            gaps
          }]
        };
      
      case 'null':
        return {
          success: true,
          value: null,
          warnings: [{
            type: 'GapWarning',
            message: `Value ${value} did not match any threshold, returning null`,
            value,
            gaps
          }]
        };
      
      case 'nearest':
        const nearest = this.findNearestThreshold(value, thresholds);
        return {
          success: true,
          value: nearest.value,
          matchedThreshold: nearest,
          usedNearestStrategy: true,
          warnings: [{
            type: 'GapWarning',
            message: `Value ${value} fell in gap, using nearest threshold`,
            value,
            gaps
          }]
        };
      
      case 'interpolate':
        const interpolated = this.interpolate(value, thresholds);
        return {
          success: true,
          value: interpolated,
          usedInterpolation: true,
          warnings: [{
            type: 'GapWarning',
            message: `Value ${value} fell in gap, interpolated result`,
            value,
            gaps
          }]
        };
      
      case 'lower':
      case 'upper':
        const threshold = gapStrategy === 'lower'
          ? this.findLowerThreshold(value, thresholds)
          : this.findUpperThreshold(value, thresholds);
        
        return {
          success: true,
          value: threshold.value,
          matchedThreshold: threshold,
          warnings: [{
            type: 'GapWarning',
            message: `Value ${value} fell in gap, using ${gapStrategy} threshold`,
            value,
            gaps
          }]
        };
      
      default:
        throw new Error(`Unknown gap strategy: ${gapStrategy}`);
    }
  }
  
  /**
   * Resolve overlap (multiple matches)
   */
  private resolveOverlap(matches: Threshold[]): Threshold {
    // Sort by priority (descending)
    const sorted = [...matches].sort((a, b) => 
      (b.priority || 0) - (a.priority || 0)
    );
    
    return sorted[0];
  }
  
  /**
   * Find nearest threshold
   */
  private findNearestThreshold(value: number, thresholds: Threshold[]): Threshold {
    let minDistance = Infinity;
    let nearest: Threshold | null = null;
    
    for (const threshold of thresholds) {
      const distance = this.calculateDistance(value, threshold);
      
      if (distance < minDistance) {
        minDistance = distance;
        nearest = threshold;
      }
    }
    
    return nearest!;
  }
  
  /**
   * Calculate distance from value to threshold boundary
   */
  private calculateDistance(value: number, threshold: Threshold): number {
    const { operator, value: conditionValue } = threshold.condition;
    
    if (operator === 'BETWEEN') {
      const [min, max] = conditionValue as [number, number];
      
      if (value < min) {
        return min - value;
      } else if (value > max) {
        return value - max;
      } else {
        return 0; // Inside range
      }
    }
    
    const boundary = conditionValue as number;
    
    if (operator === '<=' || operator === '<') {
      return value > boundary ? value - boundary : 0;
    }
    
    if (operator === '>=' || operator === '>') {
      return value < boundary ? boundary - value : 0;
    }
    
    if (operator === '=') {
      return Math.abs(value - boundary);
    }
    
    return Infinity; // Can't determine distance
  }
  
  /**
   * Interpolate between thresholds
   */
  private interpolate(value: number, thresholds: Threshold[]): number {
    // Find adjacent thresholds
    const { lower, upper } = this.findAdjacentThresholds(value, thresholds);
    
    if (!lower || !upper) {
      throw new Error('Cannot interpolate: missing adjacent thresholds');
    }
    
    const lowerBound = this.getUpperBoundValue(lower);
    const upperBound = this.getLowerBoundValue(upper);
    const lowerValue = lower.value as number;
    const upperValue = upper.value as number;
    
    if (lowerBound === null || upperBound === null) {
      throw new Error('Cannot interpolate: unbounded threshold');
    }
    
    // Linear interpolation
    const ratio = (value - lowerBound) / (upperBound - lowerBound);
    return lowerValue + ratio * (upperValue - lowerValue);
  }
  
  // Helper methods for finding adjacent thresholds, bounds, etc.
  // ... (implementation details)
}

export interface ThresholdEvaluationResult {
  success: boolean;
  value?: any;
  matchedThreshold?: Threshold;
  usedDefaultValue?: boolean;
  usedNearestStrategy?: boolean;
  usedInterpolation?: boolean;
  errors?: ValidationError[];
  warnings?: ValidationWarning[];
}
```

---

## Integration with Formula Engine

### Threshold Functions in Formula Language

**Built-in threshold evaluation functions:**

```typescript
// Register threshold functions
functionRegistry.register('THRESHOLD', {
  name: 'THRESHOLD',
  paramTypes: ['number', 'string'], // (value, thresholdSetName)
  returnType: 'unknown',
  execute: (args, context) => {
    const [value, setName] = args;
    const thresholdSet = context.thresholdSets.get(setName);
    
    if (!thresholdSet) {
      throw new RuntimeError(`Threshold set not found: ${setName}`);
    }
    
    const evaluator = new ThresholdEvaluator();
    const result = evaluator.evaluate(value, thresholdSet, context);
    
    if (!result.success) {
      throw new RuntimeError(result.errors[0].message);
    }
    
    return result.value;
  },
  description: 'Evaluate value against threshold set'
});
```

**Usage in formulas:**

```
// Simple threshold lookup
$rating = THRESHOLD($creditScore, "creditRating")

// Combined with other logic
IF THRESHOLD($temperature, "tempWarnings") = "Danger" THEN
  RETURN "Shut down immediately"
ELSEIF THRESHOLD($temperature, "tempWarnings") = "Caution" THEN
  RETURN "Monitor closely"
ELSE
  RETURN "Normal operation"
END
```

### Threshold Set as Formula Type

**Alternative: Treat thresholds as a special formula type:**

```typescript
export type FormulaType = 
  | 'expression'     // Regular formula
  | 'threshold'      // Threshold-based evaluation
  | 'decision-table' // Decision table (future)
  | 'rule-set';      // BAL rule set (future)

// When formula type is 'threshold', use threshold evaluator
if (formula.type === 'threshold') {
  const evaluator = new ThresholdEvaluator();
  return evaluator.evaluate(inputValue, formula.thresholdSet, context);
}
```

---

## User Configuration

### UI for Threshold Configuration

**Components:**
- `/components/editors/code/FormulaEditor/ThresholdConfig.tsx` (existing)
- Enhance to support all gap strategies

**Enhanced Threshold Config:**

```typescript
interface ThresholdConfigProps {
  value: ThresholdSet;
  onChange: (set: ThresholdSet) => void;
  onValidate?: (result: ValidationResult) => void;
}

export function ThresholdConfig({ value, onChange, onValidate }: ThresholdConfigProps) {
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  
  // Validate on change
  useEffect(() => {
    const validator = new ThresholdValidator();
    const result = validator.validate(value);
    setValidation(result);
    onValidate?.(result);
  }, [value, onValidate]);
  
  return (
    <div className={styles.config}>
      {/* Threshold list */}
      <ThresholdList
        thresholds={value.thresholds}
        onChange={(thresholds) => onChange({ ...value, thresholds })}
      />
      
      {/* Gap strategy selector */}
      <Select
        label="Gap Handling Strategy"
        value={value.gapStrategy}
        onChange={(strategy) => onChange({ ...value, gapStrategy: strategy })}
        options={[
          { value: 'error', label: 'Error on gap (strict)' },
          { value: 'default', label: 'Use default value' },
          { value: 'null', label: 'Return null' },
          { value: 'nearest', label: 'Use nearest threshold' },
          { value: 'interpolate', label: 'Interpolate (numeric only)' },
          { value: 'lower', label: 'Use lower threshold' },
          { value: 'upper', label: 'Use upper threshold' }
        ]}
      />
      
      {/* Default value (if strategy is 'default') */}
      {value.gapStrategy === 'default' && (
        <Input
          label="Default Value"
          value={value.defaultValue}
          onChange={(defaultValue) => onChange({ ...value, defaultValue })}
        />
      )}
      
      {/* Validation results */}
      {validation && (
        <ValidationDisplay
          errors={validation.errors}
          warnings={validation.warnings}
          gaps={validation.gaps}
          overlaps={validation.overlaps}
        />
      )}
    </div>
  );
}
```

### Visual Gap Indicator

**Show gaps visually in threshold editor:**

```tsx
export function ThresholdVisualizer({ thresholds }: { thresholds: Threshold[] }) {
  const validator = new ThresholdValidator();
  const validation = validator.validate({ thresholds, gapStrategy: 'error' });
  
  return (
    <div className={styles.visualizer}>
      {/* Number line showing thresholds and gaps */}
      <svg className={styles.numberLine}>
        {/* Render thresholds as colored segments */}
        {thresholds.map((threshold, i) => (
          <ThresholdSegment key={i} threshold={threshold} color={COLORS[i % COLORS.length]} />
        ))}
        
        {/* Render gaps as red warning segments */}
        {validation.gaps.map((gap, i) => (
          <GapSegment key={i} gap={gap} />
        ))}
      </svg>
      
      {/* Legend */}
      <div className={styles.legend}>
        {thresholds.map((t, i) => (
          <div key={i}>
            <span style={{ background: COLORS[i % COLORS.length] }}></span>
            {t.label || t.value}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Performance Optimization

### Threshold Evaluation Optimization

**1. Pre-sort thresholds for faster lookup:**

```typescript
class OptimizedThresholdEvaluator {
  private sortedThresholds: Threshold[];
  
  constructor(thresholdSet: ThresholdSet) {
    // Sort thresholds by boundary values for binary search
    this.sortedThresholds = this.sortThresholds(thresholdSet.thresholds);
  }
  
  evaluate(value: number): any {
    // Binary search for matching threshold (O(log n) instead of O(n))
    let left = 0;
    let right = this.sortedThresholds.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const threshold = this.sortedThresholds[mid];
      
      if (this.matches(value, threshold)) {
        return threshold.value;
      }
      
      // Adjust search range based on comparison
      // ... (implementation)
    }
    
    // No match - use gap strategy
    return this.handleGap(value);
  }
}
```

**2. Cache threshold evaluations:**

```typescript
class CachedThresholdEvaluator {
  private cache = new Map<string, any>();
  
  evaluate(value: any, thresholdSet: ThresholdSet): any {
    const cacheKey = `${thresholdSet.name}:${value}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    const result = this.doEvaluate(value, thresholdSet);
    this.cache.set(cacheKey, result);
    
    return result;
  }
}
```

---

## Testing Strategy

### Unit Tests for Gap Handling

```typescript
describe('ThresholdEvaluator - Gap Handling', () => {
  describe('Error strategy', () => {
    it('should throw error when value falls in gap', () => {
      const thresholdSet: ThresholdSet = {
        name: 'Test',
        inputExpression: '$value',
        gapStrategy: 'error',
        thresholds: [
          { id: '1', condition: { operator: '<=', value: 40 }, value: 'Low' },
          { id: '2', condition: { operator: '>', value: 41 }, value: 'High' }
        ]
      };
      
      const evaluator = new ThresholdEvaluator();
      const result = evaluator.evaluate(40.5, thresholdSet);
      
      expect(result.success).toBe(false);
      expect(result.errors[0].type).toBe('GapError');
      expect(result.errors[0].value).toBe(40.5);
    });
  });
  
  describe('Nearest strategy', () => {
    it('should use nearest threshold for gap value', () => {
      const thresholdSet: ThresholdSet = {
        name: 'Test',
        inputExpression: '$value',
        gapStrategy: 'nearest',
        thresholds: [
          { id: '1', condition: { operator: '<=', value: 40 }, value: 'Low' },
          { id: '2', condition: { operator: '>', value: 41 }, value: 'High' }
        ]
      };
      
      const evaluator = new ThresholdEvaluator();
      
      // 40.1 is closer to 40 than 41
      expect(evaluator.evaluate(40.1, thresholdSet).value).toBe('Low');
      
      // 40.9 is closer to 41 than 40
      expect(evaluator.evaluate(40.9, thresholdSet).value).toBe('High');
      
      // 40.5 is equidistant - should use lower (configurable)
      expect(evaluator.evaluate(40.5, thresholdSet).value).toBe('Low');
    });
  });
  
  describe('Interpolate strategy', () => {
    it('should interpolate between numeric thresholds', () => {
      const thresholdSet: ThresholdSet = {
        name: 'Test',
        inputExpression: '$value',
        gapStrategy: 'interpolate',
        thresholds: [
          { id: '1', condition: { operator: '<=', value: 40 }, value: 10 },
          { id: '2', condition: { operator: '>', value: 41 }, value: 20 }
        ]
      };
      
      const evaluator = new ThresholdEvaluator();
      
      // 40.5 is midpoint - should return 15
      expect(evaluator.evaluate(40.5, thresholdSet).value).toBe(15);
      
      // 40.25 is 25% into gap - should return 12.5
      expect(evaluator.evaluate(40.25, thresholdSet).value).toBe(12.5);
    });
  });
});
```

### Integration Tests

```typescript
describe('Formula Engine with Thresholds', () => {
  it('should evaluate threshold function in formula', () => {
    const engine = new EvaluationEngine();
    
    // Register threshold set
    engine.registerThresholdSet({
      name: 'creditRating',
      inputExpression: '$creditScore',
      gapStrategy: 'nearest',
      thresholds: [
        { id: '1', condition: { operator: '>=', value: 750 }, value: 'Excellent' },
        { id: '2', condition: { operator: 'BETWEEN', value: [650, 749] }, value: 'Good' },
        { id: '3', condition: { operator: '<', value: 650 }, value: 'Fair' }
      ]
    });
    
    // Evaluate formula using threshold
    const formula = '$rating = THRESHOLD($creditScore, "creditRating")';
    const result = engine.evaluate(formula, {
      variables: new Map([['creditScore', 720]])
    });
    
    expect(result.value).toBe('Good');
  });
});
```

---

## Summary & Next Steps

### Key Takeaways

1. **Threshold evaluation is critical** for business rules and decision logic
2. **Gap handling strategies** provide flexibility for incomplete threshold definitions
3. **Validation is essential** to detect gaps and overlaps early
4. **Multiple threshold types** support diverse use cases (numeric, date, categorical)
5. **Integration with formula engine** makes thresholds a first-class feature

### Implementation Checklist

**Phase 1 - Core Threshold Evaluation:**
- [ ] Implement `ThresholdEvaluator` class
- [ ] Support all comparison operators
- [ ] Implement gap detection
- [ ] Implement basic gap strategies (error, default, null)

**Phase 2 - Advanced Gap Strategies:**
- [ ] Implement nearest strategy
- [ ] Implement interpolation strategy
- [ ] Implement lower/upper strategies
- [ ] Add comprehensive tests

**Phase 3 - Validation & UI:**
- [ ] Implement `ThresholdValidator`
- [ ] Gap and overlap detection
- [ ] Visual gap indicator in UI
- [ ] Enhance `ThresholdConfig` component

**Phase 4 - Integration:**
- [ ] Integrate with formula engine
- [ ] Add THRESHOLD() function
- [ ] Support threshold sets as formula type
- [ ] Add to test panel

**Phase 5 - Optimization:**
- [ ] Binary search optimization
- [ ] Caching layer
- [ ] Performance benchmarks

### Usage Example (Final)

```typescript
// Define threshold set with gap handling
const creditScoreThresholds: ThresholdSet = {
  name: 'Credit Rating',
  inputExpression: '$creditScore',
  gapStrategy: 'nearest', // Handle gaps intelligently
  thresholds: [
    { condition: { operator: '>=', value: 800 }, value: 'Excellent' },
    { condition: { operator: 'BETWEEN', value: [740, 799] }, value: 'Very Good' },
    { condition: { operator: 'BETWEEN', value: [670, 739] }, value: 'Good' },
    { condition: { operator: 'BETWEEN', value: [580, 669] }, value: 'Fair' },
    { condition: { operator: '<', value: 580 }, value: 'Poor' }
  ]
};

// Use in formula
const formula = `
$rating = THRESHOLD($creditScore, "creditRating")

IF $rating = "Excellent" OR $rating = "Very Good" THEN
  RETURN "Approved - Best Rate"
ELSEIF $rating = "Good" THEN
  RETURN "Approved - Standard Rate"
ELSE
  RETURN "Manual Review Required"
END
`;

// Evaluate with potential gap value
const result = engine.evaluate(formula, {
  variables: new Map([['creditScore', 739.5]]) // Falls in potential gap
});

// Result: "Approved - Standard Rate" (uses nearest strategy)
```

This architecture ensures robust, production-ready threshold evaluation with intelligent gap handling!
