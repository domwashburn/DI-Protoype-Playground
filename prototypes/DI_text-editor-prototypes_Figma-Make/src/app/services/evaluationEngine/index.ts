/**
 * Formula & BAL Evaluation Engine - Public API
 * 
 * Main entry point for the evaluation engine.
 * Exports all public types and classes.
 * 
 * @module evaluationEngine
 */

// Main engine
export { EvaluationEngine, CompiledProgram } from './EvaluationEngine';
export type { EvaluationResult, CompileResult, EngineConfig } from './EvaluationEngine';

// Runtime
export { FunctionRegistry } from './runtime/FunctionRegistry';
export type { BuiltInFunction } from './runtime/FunctionRegistry';
export { createContext } from './runtime/Context';
export type { ExecutionContext, ResourceLimits } from './runtime/Context';

// Threshold evaluation
export { ThresholdValidator, ThresholdEvaluator } from './threshold';
export type { 
  GapAnalysis, 
  Gap, 
  Overlap, 
  GapStrategy, 
  EvaluationOptions, 
  ThresholdEvaluationResult 
} from './threshold';

// Debugger
export { ExecutionTracer, TracingEvaluator, createStepDescription } from './debugger';
export type { TraceStep, TraceOptions, TraceSummary, NodeType } from './debugger';

// Errors
export {
  EvaluationError,
  ParseError,
  RuntimeError,
  TypeError,
  UndefinedVariableError,
  UndefinedAttributeError,
  UndefinedFunctionError,
  InvalidArgumentCountError,
  DivisionByZeroError,
  TimeoutError,
  MaxIterationsError,
  formatError
} from './errors/EvaluationError';

// Types
export type { PrimitiveType } from './types/TypeSystem';
export { TimeValue } from './types/TypeSystem';

// AST (for advanced use cases)
export type {
  Program,
  Expression,
  Statement,
  SourceLocation
} from './ast/ASTNodes';

// Vocabulary Integration (Phase 5.11.3)
export { 
  VocabularyResolver,
  getVocabularyResolver,
  initializeVocabularyResolver,
  USE_VOCABULARY_RESOLUTION
} from './parsers/VocabularyResolver';
export type { VocabularyResolutionResult } from './parsers/VocabularyResolver';

// Vocabulary Hooks (Phase 5.11.3)
export {
  useVocabularyTermResolution,
  useVocabularyAutocomplete,
  useVocabularyValidation,
  useVocabularyEnabled,
  useVocabularyTerms
} from './hooks';

// Vocabulary Configuration (Phase 5.11.4 Part 2)
export {
  getVocabularyConfig,
  updateVocabularyConfig,
  resetVocabularyConfig,
  isVocabularyEnabledFor,
  isVocabularyFeatureEnabled,
  getVocabularyFeatureStatus,
  DEFAULT_VOCABULARY_CONFIG
} from './config/vocabularyConfig';
export type { VocabularyFeatureConfig } from './config/vocabularyConfig';