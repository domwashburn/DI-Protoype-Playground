/**
 * Threshold Evaluation Utilities
 * 
 * Functions for evaluating numeric values against threshold ranges.
 * Used by the Formula Editor to categorize numeric outputs.
 */

import type { Threshold, ThresholdEvaluation } from '../components/editors/core/types';

/**
 * Evaluate a numeric value against a set of thresholds
 * Returns the matching threshold category and metadata
 * 
 * @param value - The numeric value to evaluate
 * @param thresholds - Array of threshold definitions
 * @returns ThresholdEvaluation or null if no match
 * 
 * @example
 * const thresholds = [
 *   { min: 0, max: 579, label: 'Poor', severity: 'error', ... },
 *   { min: 580, max: 669, label: 'Fair', severity: 'warning', ... },
 *   { min: 670, max: null, label: 'Good', severity: 'success', ... }
 * ];
 * 
 * const result = evaluateThreshold(750, thresholds);
 * // Returns: { value: 750, category: 'Good', severity: 'success', ... }
 */
export function evaluateThreshold(
  value: number,
  thresholds: Threshold[]
): ThresholdEvaluation | null {
  if (thresholds.length === 0) {
    return null;
  }

  // Find matching threshold
  const matchingThreshold = thresholds.find((threshold) => {
    const meetsMin = value >= threshold.min;
    const meetsMax = threshold.max === null || value <= threshold.max;
    return meetsMin && meetsMax;
  });

  if (!matchingThreshold) {
    return null;
  }

  return {
    value,
    category: matchingThreshold.label,
    severity: matchingThreshold.severity,
    color: matchingThreshold.color,
    threshold: matchingThreshold,
  };
}

/**
 * Validate that thresholds form continuous, non-overlapping ranges
 * Returns array of validation error messages
 * 
 * @param thresholds - Array of threshold definitions
 * @returns Array of error messages (empty if valid)
 */
export function validateThresholds(thresholds: Threshold[]): string[] {
  const errors: string[] = [];
  
  if (thresholds.length === 0) {
    return errors;
  }

  const sorted = [...thresholds].sort((a, b) => a.min - b.min);

  // Validate each threshold
  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i];
    
    // Basic validation
    if (current.max !== null && current.min > current.max) {
      errors.push(`"${current.label}": min (${current.min}) is greater than max (${current.max})`);
    }

    // Check relationships with next threshold
    if (i < sorted.length - 1) {
      const next = sorted[i + 1];

      // Check for open-ended in middle
      if (current.max === null) {
        errors.push(`"${current.label}" is open-ended but not the last range`);
        continue;
      }

      // Check overlap
      if (current.max >= next.min) {
        errors.push(`"${current.label}" overlaps with "${next.label}"`);
      }

      // Check gap
      if (current.max + 1 < next.min) {
        errors.push(`Gap between "${current.label}" (ends at ${current.max}) and "${next.label}" (starts at ${next.min})`);
      }
    }
  }

  return errors;
}

/**
 * Format threshold range as human-readable string
 * 
 * @param threshold - Threshold definition
 * @returns Formatted range string (e.g., "750-799" or "800+")
 */
export function formatThresholdRange(threshold: Threshold): string {
  if (threshold.max === null || threshold.isOpenEnded) {
    return `${threshold.min}+`;
  }
  
  if (threshold.min === threshold.max) {
    return `${threshold.min}`;
  }
  
  return `${threshold.min}-${threshold.max}`;
}

/**
 * Get suggested thresholds based on common patterns
 * 
 * @param pattern - Pattern type (e.g., 'credit-score', 'percentage', 'risk')
 * @returns Array of suggested threshold definitions
 */
export function getSuggestedThresholds(pattern: 'credit-score' | 'percentage' | 'risk' | 'rating'): Threshold[] {
  const patterns: Record<string, Threshold[]> = {
    'credit-score': [
      {
        id: 'cs-1',
        min: 300,
        max: 579,
        label: 'Poor',
        color: '#DA1E28',
        severity: 'error',
      },
      {
        id: 'cs-2',
        min: 580,
        max: 669,
        label: 'Fair',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'cs-3',
        min: 670,
        max: 739,
        label: 'Good',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'cs-4',
        min: 740,
        max: 799,
        label: 'Very Good',
        color: '#24A148',
        severity: 'success',
      },
      {
        id: 'cs-5',
        min: 800,
        max: null,
        label: 'Excellent',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    'percentage': [
      {
        id: 'pct-1',
        min: 0,
        max: 25,
        label: 'Low',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'pct-2',
        min: 26,
        max: 50,
        label: 'Medium',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'pct-3',
        min: 51,
        max: 75,
        label: 'High',
        color: '#FF832B',
        severity: 'warning',
      },
      {
        id: 'pct-4',
        min: 76,
        max: 100,
        label: 'Very High',
        color: '#DA1E28',
        severity: 'error',
      },
    ],
    'risk': [
      {
        id: 'risk-1',
        min: 0,
        max: 20,
        label: 'Low Risk',
        color: '#24A148',
        severity: 'success',
      },
      {
        id: 'risk-2',
        min: 21,
        max: 50,
        label: 'Medium Risk',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'risk-3',
        min: 51,
        max: null,
        label: 'High Risk',
        color: '#DA1E28',
        severity: 'error',
        isOpenEnded: true,
      },
    ],
    'rating': [
      {
        id: 'rate-1',
        min: 0,
        max: 1,
        label: '1 Star',
        color: '#DA1E28',
        severity: 'error',
      },
      {
        id: 'rate-2',
        min: 2,
        max: 2,
        label: '2 Stars',
        color: '#FF832B',
        severity: 'warning',
      },
      {
        id: 'rate-3',
        min: 3,
        max: 3,
        label: '3 Stars',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'rate-4',
        min: 4,
        max: 4,
        label: '4 Stars',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'rate-5',
        min: 5,
        max: 5,
        label: '5 Stars',
        color: '#24A148',
        severity: 'success',
      },
    ],
  };

  return patterns[pattern] || [];
}
