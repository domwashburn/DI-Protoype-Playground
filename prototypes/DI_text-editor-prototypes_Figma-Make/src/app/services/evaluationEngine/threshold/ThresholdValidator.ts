/**
 * Threshold Validator
 * 
 * Analyzes threshold sets to detect gaps and overlaps between ranges.
 * Provides validation, suggestions, and warnings for threshold configuration.
 */

import type { Threshold } from '../../../components/editors/core/types';

/**
 * Analysis result for a threshold set
 */
export interface GapAnalysis {
  /** Gaps detected between thresholds */
  gaps: Gap[];
  
  /** Overlaps detected between thresholds */
  overlaps: Overlap[];
  
  /** Whether thresholds are valid (no errors, only warnings allowed) */
  isValid: boolean;
  
  /** Blocking errors that must be fixed */
  errors: string[];
  
  /** Warnings (non-blocking, can be handled by gap strategy) */
  warnings: string[];
}

/**
 * Gap between two thresholds
 */
export interface Gap {
  /** Gap range minimum */
  min: number;
  
  /** Gap range maximum */
  max: number;
  
  /** Threshold before the gap */
  lowerThreshold: Threshold;
  
  /** Threshold after the gap */
  upperThreshold: Threshold;
  
  /** Suggested fix for the gap */
  suggestion?: string;
}

/**
 * Overlap between thresholds
 */
export interface Overlap {
  /** Overlap range minimum */
  min: number;
  
  /** Overlap range maximum */
  max: number | null;
  
  /** Overlapping thresholds */
  thresholds: Threshold[];
  
  /** Recommended resolution */
  resolution?: string;
}

/**
 * Threshold condition operator types
 */
type ThresholdOperator = '<' | '<=' | '>' | '>=' | '=' | '!=' | 'BETWEEN' | 'NOT_BETWEEN';

/**
 * ThresholdValidator
 * 
 * Analyzes threshold sets for gaps and overlaps.
 * Provides detailed validation information and suggestions.
 */
export class ThresholdValidator {
  /**
   * Analyze threshold set for gaps and overlaps
   * 
   * @param thresholds - Array of threshold definitions
   * @returns Complete gap analysis with errors and warnings
   * 
   * @example
   * const validator = new ThresholdValidator();
   * const analysis = validator.analyze(thresholds);
   * 
   * if (!analysis.isValid) {
   *   console.error('Errors:', analysis.errors);
   * }
   * 
   * if (analysis.warnings.length > 0) {
   *   console.warn('Warnings:', analysis.warnings);
   * }
   */
  analyze(thresholds: Threshold[]): GapAnalysis {
    if (thresholds.length === 0) {
      return {
        gaps: [],
        overlaps: [],
        isValid: true,
        errors: [],
        warnings: [],
      };
    }

    const gaps = this.detectGaps(thresholds);
    const overlaps = this.detectOverlaps(thresholds);
    
    const errors = this.buildErrors(overlaps);
    const warnings = this.buildWarnings(gaps);

    return {
      gaps,
      overlaps,
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Detect gaps between thresholds
   * 
   * Gaps occur when there are values between two threshold ranges
   * that don't match any threshold.
   * 
   * Example: <= 40 and > 41 has a gap for values 40.01 to 41
   */
  private detectGaps(thresholds: Threshold[]): Gap[] {
    // Convert thresholds to sorted range segments
    const segments = this.convertToSegments(thresholds);
    
    // Sort by lower bound
    const sorted = segments.sort((a, b) => a.min - b.min);
    
    const gaps: Gap[] = [];

    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i];
      const next = sorted[i + 1];

      // Skip if current segment is open-ended (max = null)
      if (current.max === null) {
        continue;
      }

      // Check if there's a gap between current.max and next.min
      const epsilon = 0.00001; // Floating point tolerance
      
      if (next.min - current.max > epsilon) {
        gaps.push({
          min: current.max,
          max: next.min,
          lowerThreshold: current.threshold,
          upperThreshold: next.threshold,
          suggestion: this.generateGapSuggestion(current, next),
        });
      }
    }

    return gaps;
  }

  /**
   * Detect overlaps between thresholds
   * 
   * Overlaps occur when the same value matches multiple thresholds.
   * This is an error because it's ambiguous which threshold should apply.
   */
  private detectOverlaps(thresholds: Threshold[]): Overlap[] {
    const overlaps: Overlap[] = [];
    
    // Check each pair of thresholds for overlap
    for (let i = 0; i < thresholds.length; i++) {
      for (let j = i + 1; j < thresholds.length; j++) {
        const overlap = this.checkOverlap(thresholds[i], thresholds[j]);
        
        if (overlap) {
          overlaps.push({
            ...overlap,
            thresholds: [thresholds[i], thresholds[j]],
            resolution: this.generateOverlapResolution(thresholds[i], thresholds[j]),
          });
        }
      }
    }

    return overlaps;
  }

  /**
   * Check if two thresholds overlap
   */
  private checkOverlap(a: Threshold, b: Threshold): { min: number; max: number | null } | null {
    const aSegment = this.thresholdToSegment(a);
    const bSegment = this.thresholdToSegment(b);

    // Calculate overlap range
    const overlapMin = Math.max(aSegment.min, bSegment.min);
    
    let overlapMax: number | null;
    if (aSegment.max === null && bSegment.max === null) {
      overlapMax = null; // Both open-ended
    } else if (aSegment.max === null) {
      overlapMax = bSegment.max;
    } else if (bSegment.max === null) {
      overlapMax = aSegment.max;
    } else {
      overlapMax = Math.min(aSegment.max, bSegment.max);
    }

    // Check if there's actually an overlap
    if (overlapMax !== null && overlapMin <= overlapMax) {
      return { min: overlapMin, max: overlapMax };
    } else if (overlapMax === null && overlapMin !== null) {
      // One or both are open-ended and they overlap
      return { min: overlapMin, max: null };
    }

    return null;
  }

  /**
   * Convert threshold to a numeric segment [min, max]
   */
  private thresholdToSegment(threshold: Threshold): { min: number; max: number | null; threshold: Threshold } {
    const { min, max } = threshold;
    
    return {
      min: min,
      max: max === null || threshold.isOpenEnded ? null : max,
      threshold,
    };
  }

  /**
   * Convert all thresholds to segments
   */
  private convertToSegments(thresholds: Threshold[]): Array<{ min: number; max: number | null; threshold: Threshold }> {
    return thresholds.map(t => this.thresholdToSegment(t));
  }

  /**
   * Generate suggestion for fixing a gap
   */
  private generateGapSuggestion(
    lower: { min: number; max: number | null; threshold: Threshold },
    upper: { min: number; max: number | null; threshold: Threshold }
  ): string {
    const gap = upper.min - (lower.max || 0);
    
    if (gap <= 1) {
      // Small gap - suggest adjusting by small amount
      const newLowerMax = upper.min - 0.01;
      return `Consider changing "${lower.threshold.label}" max to ${newLowerMax} or "${upper.threshold.label}" min to ${(lower.max || 0) + 0.01}`;
    } else {
      // Larger gap - suggest adjusting to meet in middle
      const midpoint = ((lower.max || 0) + upper.min) / 2;
      return `Consider changing "${lower.threshold.label}" max to ${midpoint.toFixed(2)} and "${upper.threshold.label}" min to ${midpoint.toFixed(2)}`;
    }
  }

  /**
   * Generate resolution suggestion for overlap
   */
  private generateOverlapResolution(a: Threshold, b: Threshold): string {
    return `Adjust ranges so they don't overlap, or use priority to determine which threshold takes precedence`;
  }

  /**
   * Build error messages from overlaps
   */
  private buildErrors(overlaps: Overlap[]): string[] {
    return overlaps.map(overlap => {
      const [a, b] = overlap.thresholds;
      const rangeDesc = overlap.max !== null 
        ? `between ${overlap.min} and ${overlap.max}`
        : `from ${overlap.min} onwards`;
      
      return `Overlap detected: "${a.label}" and "${b.label}" both match values ${rangeDesc}`;
    });
  }

  /**
   * Build warning messages from gaps
   */
  private buildWarnings(gaps: Gap[]): string[] {
    return gaps.map(gap => {
      return `Gap detected: Values between ${gap.min} and ${gap.max} don't match any threshold. ${gap.suggestion || ''}`;
    });
  }

  /**
   * Validate individual threshold definition
   * 
   * @param threshold - Threshold to validate
   * @returns Array of validation errors (empty if valid)
   */
  validateThreshold(threshold: Threshold): string[] {
    const errors: string[] = [];

    // Check that min <= max
    if (threshold.max !== null && threshold.min > threshold.max) {
      errors.push(`"${threshold.label}": min (${threshold.min}) is greater than max (${threshold.max})`);
    }

    // Check for valid values
    if (!Number.isFinite(threshold.min)) {
      errors.push(`"${threshold.label}": min value must be a finite number`);
    }

    if (threshold.max !== null && !Number.isFinite(threshold.max)) {
      errors.push(`"${threshold.label}": max value must be a finite number or null`);
    }

    return errors;
  }

  /**
   * Sort thresholds by lower bound
   * 
   * Useful for visualizing thresholds in order
   */
  sortByLowerBound(thresholds: Threshold[]): Threshold[] {
    return [...thresholds].sort((a, b) => a.min - b.min);
  }

  /**
   * Get total range covered by thresholds
   * 
   * @returns Object with overall min and max, or null if no thresholds
   */
  getCoveredRange(thresholds: Threshold[]): { min: number; max: number | null } | null {
    if (thresholds.length === 0) {
      return null;
    }

    const segments = this.convertToSegments(thresholds);
    const sorted = segments.sort((a, b) => a.min - b.min);

    const min = sorted[0].min;
    const lastSegment = sorted[sorted.length - 1];
    const max = lastSegment.max;

    return { min, max };
  }

  /**
   * Check if a specific value falls in a gap
   * 
   * @param value - Value to check
   * @param thresholds - Threshold set
   * @returns The gap the value falls in, or null if no gap
   */
  findGapForValue(value: number, thresholds: Threshold[]): Gap | null {
    const gaps = this.detectGaps(thresholds);
    
    return gaps.find(gap => value > gap.min && value < gap.max) || null;
  }

  /**
   * Check if thresholds form a continuous range
   * 
   * @returns true if no gaps exist
   */
  isContinuous(thresholds: Threshold[]): boolean {
    const gaps = this.detectGaps(thresholds);
    return gaps.length === 0;
  }
}
