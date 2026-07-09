/**
 * Threshold Evaluator
 * 
 * Evaluates numeric values against threshold sets with intelligent gap handling.
 * Supports 7 gap handling strategies to handle values that fall between defined ranges.
 */

import type { Threshold } from '../../../components/editors/core/types';
import { ThresholdValidator, type Gap } from './ThresholdValidator';

/**
 * Gap handling strategy types
 */
export type GapStrategy = 
  | 'error'         // Throw error on gap
  | 'default'       // Return default value
  | 'null'          // Return null
  | 'nearest'       // Use nearest threshold
  | 'interpolate'   // Interpolate between thresholds (numeric only)
  | 'lower'         // Always use lower threshold
  | 'upper';        // Always use upper threshold

/**
 * Options for threshold evaluation
 */
export interface EvaluationOptions {
  /** Gap handling strategy (default: 'nearest') */
  gapStrategy?: GapStrategy;
  
  /** Default value to return (for 'default' strategy) */
  defaultValue?: any;
  
  /** Whether to throw errors on gaps (for 'error' strategy) */
  strict?: boolean;
}

/**
 * Result of threshold evaluation
 */
export interface ThresholdEvaluationResult {
  /** The value returned (from matched threshold or gap strategy) */
  value: any;
  
  /** The threshold that was matched (if any) */
  matchedThreshold?: Threshold;
  
  /** Whether the value fell in a gap */
  wasGap: boolean;
  
  /** Gap handling strategy that was used (if wasGap = true) */
  strategyUsed?: GapStrategy;
  
  /** Additional metadata about the evaluation */
  metadata?: {
    /** For 'nearest': distance to selected threshold */
    distance?: number;
    
    /** For 'interpolate': interpolation details */
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

/**
 * ThresholdEvaluator
 * 
 * Main class for evaluating values against thresholds with gap handling.
 * 
 * @example
 * const evaluator = new ThresholdEvaluator();
 * 
 * const result = evaluator.evaluate(40.5, thresholds, {
 *   gapStrategy: 'nearest'
 * });
 * 
 * console.log(result.value); // Value from nearest threshold
 * console.log(result.wasGap); // true
 * console.log(result.metadata?.distance); // 0.5
 */
export class ThresholdEvaluator {
  private validator: ThresholdValidator;

  constructor() {
    this.validator = new ThresholdValidator();
  }

  /**
   * Evaluate a value against thresholds with gap handling
   * 
   * @param value - Numeric value to evaluate
   * @param thresholds - Array of threshold definitions
   * @param options - Evaluation options including gap strategy
   * @returns Evaluation result with value and metadata
   * 
   * @throws Error if strategy is 'error' and value falls in gap
   * @throws Error if strategy is 'interpolate' and threshold values aren't numeric
   * 
   * @example
   * const result = evaluator.evaluate(750, creditScoreThresholds);
   * // Direct match: { value: "Excellent", wasGap: false }
   * 
   * const result2 = evaluator.evaluate(40.5, gappedThresholds, {
   *   gapStrategy: 'nearest'
   * });
   * // Gap handled: { value: "Low", wasGap: true, strategyUsed: 'nearest' }
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

    // Validate input
    if (!Number.isFinite(value)) {
      throw new Error(`Invalid value for threshold evaluation: ${value}`);
    }

    if (thresholds.length === 0) {
      return {
        value: defaultValue,
        wasGap: true,
        strategyUsed: 'default',
      };
    }

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
    const gap = this.validator.findGapForValue(value, thresholds);

    if (gap) {
      // Value is in a detected gap - apply strategy
      return this.applyGapStrategy(value, gap, gapStrategy, defaultValue, strict);
    } else {
      // Value is outside all defined ranges
      return this.handleOutOfRange(value, thresholds, gapStrategy, defaultValue);
    }
  }

  /**
   * Find direct threshold match for a value
   * 
   * @param value - Value to match
   * @param thresholds - Thresholds to search
   * @returns Matching threshold or null
   */
  private findDirectMatch(value: number, thresholds: Threshold[]): Threshold | null {
    return thresholds.find(threshold => this.valueMatchesThreshold(value, threshold)) || null;
  }

  /**
   * Check if a value matches a threshold's range
   * 
   * @param value - Value to check
   * @param threshold - Threshold definition
   * @returns true if value falls within threshold range
   */
  private valueMatchesThreshold(value: number, threshold: Threshold): boolean {
    const meetsMin = value >= threshold.min;
    const meetsMax = threshold.max === null || threshold.isOpenEnded || value <= threshold.max;
    
    return meetsMin && meetsMax;
  }

  /**
   * Apply gap handling strategy
   * 
   * @param value - Value in gap
   * @param gap - Gap information
   * @param strategy - Strategy to apply
   * @param defaultValue - Default value (for 'default' strategy)
   * @param strict - Whether to throw errors (for 'error' strategy)
   * @returns Evaluation result
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
          `No threshold matches. ${gap.suggestion || ''}`
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
   * Apply 'nearest' strategy - use closest threshold boundary
   * 
   * @param value - Value in gap
   * @param gap - Gap information
   * @returns Evaluation result with nearest threshold
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
   * Apply 'interpolate' strategy - linear interpolation between thresholds
   * 
   * Only works when both threshold values are numeric.
   * 
   * @param value - Value in gap
   * @param gap - Gap information
   * @returns Evaluation result with interpolated value
   * @throws Error if threshold values aren't numeric
   */
  private applyInterpolateStrategy(value: number, gap: Gap): ThresholdEvaluationResult {
    const lowerValue = gap.lowerThreshold.value;
    const upperValue = gap.upperThreshold.value;

    // Both values must be numeric for interpolation
    if (typeof lowerValue !== 'number' || typeof upperValue !== 'number') {
      throw new Error(
        `Cannot interpolate between non-numeric values. ` +
        `Lower threshold returns ${typeof lowerValue}, upper returns ${typeof upperValue}. ` +
        `Consider using 'nearest' strategy instead.`
      );
    }

    // Linear interpolation formula:
    // result = lowerValue + (position / range) * (upperValue - lowerValue)
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
   * 
   * @param value - Value outside ranges
   * @param thresholds - All thresholds
   * @param strategy - Gap strategy to apply
   * @param defaultValue - Default value (for 'default' strategy)
   * @returns Evaluation result
   */
  private handleOutOfRange(
    value: number,
    thresholds: Threshold[],
    strategy: GapStrategy,
    defaultValue: any
  ): ThresholdEvaluationResult {
    const range = this.validator.getCoveredRange(thresholds);

    // For out-of-range, use default or null
    if (strategy === 'default') {
      return {
        value: defaultValue,
        wasGap: true,
        strategyUsed: 'default',
      };
    }

    if (strategy === 'error') {
      const rangeDesc = range 
        ? `${range.min} to ${range.max !== null ? range.max : '∞'}`
        : 'any defined range';
      
      throw new Error(
        `Value ${value} is outside all threshold ranges (${rangeDesc})`
      );
    }

    // For nearest/lower/upper, try to find the closest threshold
    if (strategy === 'nearest' || strategy === 'lower' || strategy === 'upper') {
      const sorted = this.validator.sortByLowerBound(thresholds);
      
      if (range) {
        // If value is below all thresholds, use lowest
        if (value < range.min) {
          return {
            value: sorted[0].value,
            matchedThreshold: sorted[0],
            wasGap: true,
            strategyUsed: strategy,
            metadata: { distance: range.min - value },
          };
        }
        
        // If value is above all thresholds, use highest
        if (range.max !== null && value > range.max) {
          const highest = sorted[sorted.length - 1];
          return {
            value: highest.value,
            matchedThreshold: highest,
            wasGap: true,
            strategyUsed: strategy,
            metadata: { distance: value - range.max },
          };
        }
      }
    }

    // Default: return null
    return {
      value: null,
      wasGap: true,
      strategyUsed: 'null',
    };
  }

  /**
   * Batch evaluate multiple values
   * 
   * Useful for performance when evaluating many values against the same thresholds.
   * 
   * @param values - Array of values to evaluate
   * @param thresholds - Threshold set
   * @param options - Evaluation options
   * @returns Array of evaluation results
   */
  batchEvaluate(
    values: number[],
    thresholds: Threshold[],
    options: EvaluationOptions = {}
  ): ThresholdEvaluationResult[] {
    return values.map(value => this.evaluate(value, thresholds, options));
  }

  /**
   * Get validator instance for gap/overlap analysis
   */
  getValidator(): ThresholdValidator {
    return this.validator;
  }
}
