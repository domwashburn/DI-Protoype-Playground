/**
 * useThresholdEvaluation Hook
 * 
 * Hook for evaluating numeric formula outputs against threshold ranges.
 * Provides real-time evaluation and formatting utilities.
 */

import { useMemo } from 'react';
import type { Threshold, ThresholdEvaluation } from '../../../core/types';
import { evaluateThreshold, formatThresholdRange } from '../../../../../utils/thresholdEvaluation';

export interface UseThresholdEvaluationOptions {
  /** Thresholds to evaluate against */
  thresholds: Threshold[];
  /** Current numeric value to evaluate */
  value?: number;
}

export interface UseThresholdEvaluationReturn {
  /** Evaluate a value against thresholds */
  evaluate: (value: number) => ThresholdEvaluation | null;
  /** Current evaluation result (if value provided) */
  currentEvaluation: ThresholdEvaluation | null;
  /** Format threshold range as string */
  formatRange: (threshold: Threshold) => string;
  /** Get threshold by ID */
  getThresholdById: (id: string) => Threshold | undefined;
  /** Check if value falls within any threshold */
  hasMatch: (value: number) => boolean;
}

/**
 * Hook for threshold evaluation
 * 
 * @param options - Configuration options
 * @returns Evaluation utilities and current result
 * 
 * @example
 * const { evaluate, currentEvaluation } = useThresholdEvaluation({
 *   thresholds: creditScoreThresholds,
 *   value: 750
 * });
 * 
 * console.log(currentEvaluation?.category); // "Very Good"
 * 
 * const newEval = evaluate(820);
 * console.log(newEval?.category); // "Excellent"
 */
export function useThresholdEvaluation({
  thresholds,
  value,
}: UseThresholdEvaluationOptions): UseThresholdEvaluationReturn {
  
  /**
   * Evaluate value against thresholds
   */
  const evaluate = useMemo(() => {
    return (val: number) => evaluateThreshold(val, thresholds);
  }, [thresholds]);

  /**
   * Current evaluation (if value provided)
   */
  const currentEvaluation = useMemo(() => {
    if (value === undefined || value === null) {
      return null;
    }
    return evaluate(value);
  }, [value, evaluate]);

  /**
   * Format threshold range
   */
  const formatRange = useMemo(() => {
    return (threshold: Threshold) => formatThresholdRange(threshold);
  }, []);

  /**
   * Get threshold by ID
   */
  const getThresholdById = useMemo(() => {
    return (id: string) => thresholds.find(t => t.id === id);
  }, [thresholds]);

  /**
   * Check if value has a matching threshold
   */
  const hasMatch = useMemo(() => {
    return (val: number) => {
      const result = evaluate(val);
      return result !== null;
    };
  }, [evaluate]);

  return {
    evaluate,
    currentEvaluation,
    formatRange,
    getThresholdById,
    hasMatch,
  };
}
