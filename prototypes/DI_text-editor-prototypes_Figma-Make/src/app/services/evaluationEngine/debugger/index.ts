/**
 * Formula Debugger Module
 * 
 * Provides execution tracing and debugging capabilities for formulas.
 * 
 * @module debugger
 */

export { ExecutionTracer, createStepDescription } from './ExecutionTracer';
export type { 
  TraceStep, 
  TraceOptions, 
  TraceSummary, 
  NodeType 
} from './ExecutionTracer';

export { TracingEvaluator } from './TracingEvaluator';
export type { TracingEvaluationResult } from './TracingEvaluator';

/**
 * ExecutionTrace - Complete trace of formula execution
 * Wrapper around array of trace steps for consistent API
 */
export interface ExecutionTrace {
  steps: readonly TraceStep[];
}