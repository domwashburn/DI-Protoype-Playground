/**
 * Threshold Evaluation Module
 * 
 * Provides threshold evaluation with intelligent gap handling.
 * 
 * @module threshold
 */

export { ThresholdValidator } from './ThresholdValidator';
export type { GapAnalysis, Gap, Overlap } from './ThresholdValidator';

export { ThresholdEvaluator } from './ThresholdEvaluator';
export type { 
  GapStrategy, 
  EvaluationOptions, 
  ThresholdEvaluationResult 
} from './ThresholdEvaluator';
