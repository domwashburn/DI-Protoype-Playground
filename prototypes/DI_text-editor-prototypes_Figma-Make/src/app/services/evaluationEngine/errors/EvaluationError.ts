/**
 * Error Types for Formula & BAL Evaluation Engine
 * 
 * Defines comprehensive error types with helpful messages and context.
 * All errors include location information when available.
 * 
 * @module evaluationEngine/errors/EvaluationError
 */

import type { SourceLocation } from '../ast/ASTNodes';

/**
 * Base evaluation error
 */
export class EvaluationError extends Error {
  constructor(
    message: string,
    public code: string,
    public location?: SourceLocation,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'EvaluationError';
  }
}

/**
 * Parse error - syntax or grammar issue
 */
export class ParseError extends EvaluationError {
  constructor(
    message: string,
    location?: SourceLocation,
    public suggestions?: string[]
  ) {
    super(message, 'PARSE_ERROR', location);
    this.name = 'ParseError';
  }
}

/**
 * Runtime error - error during evaluation
 */
export class RuntimeError extends EvaluationError {
  constructor(
    message: string,
    location?: SourceLocation,
    context?: Record<string, any>
  ) {
    super(message, 'RUNTIME_ERROR', location, context);
    this.name = 'RuntimeError';
  }
}

/**
 * Type error - type mismatch
 */
export class TypeError extends EvaluationError {
  constructor(
    message: string,
    public expected: string,
    public actual: string,
    location?: SourceLocation
  ) {
    super(message, 'TYPE_ERROR', location, { expected, actual });
    this.name = 'TypeError';
  }
}

/**
 * Undefined variable error
 */
export class UndefinedVariableError extends RuntimeError {
  constructor(
    public variableName: string,
    location?: SourceLocation,
    public suggestions?: string[]
  ) {
    super(
      `Undefined variable: $${variableName}`,
      location,
      { variableName, suggestions }
    );
    this.name = 'UndefinedVariableError';
    this.code = 'UNDEFINED_VARIABLE';
  }
}

/**
 * Undefined attribute error
 */
export class UndefinedAttributeError extends RuntimeError {
  constructor(
    public attributePath: string,
    location?: SourceLocation,
    public availableAttributes?: string[]
  ) {
    super(
      `Undefined attribute: #${attributePath}`,
      location,
      { attributePath, availableAttributes }
    );
    this.name = 'UndefinedAttributeError';
    this.code = 'UNDEFINED_ATTRIBUTE';
  }
}

/**
 * Undefined function error
 */
export class UndefinedFunctionError extends RuntimeError {
  constructor(
    public functionName: string,
    location?: SourceLocation,
    public suggestions?: string[]
  ) {
    super(
      `Undefined function: ${functionName}`,
      location,
      { functionName, suggestions }
    );
    this.name = 'UndefinedFunctionError';
    this.code = 'UNDEFINED_FUNCTION';
  }
}

/**
 * Invalid argument count error
 */
export class InvalidArgumentCountError extends RuntimeError {
  constructor(
    public functionName: string,
    public expected: number,
    public actual: number,
    location?: SourceLocation
  ) {
    super(
      `Function ${functionName} expected ${expected} arguments, got ${actual}`,
      location,
      { functionName, expected, actual }
    );
    this.name = 'InvalidArgumentCountError';
    this.code = 'INVALID_ARGUMENT_COUNT';
  }
}

/**
 * Division by zero error
 */
export class DivisionByZeroError extends RuntimeError {
  constructor(
    public dividend: number,
    location?: SourceLocation
  ) {
    super(
      `Division by zero: ${dividend} / 0`,
      location,
      { dividend }
    );
    this.name = 'DivisionByZeroError';
    this.code = 'DIVISION_BY_ZERO';
  }
}

/**
 * Timeout error
 */
export class TimeoutError extends RuntimeError {
  constructor(
    public timeoutMs: number
  ) {
    super(
      `Evaluation timeout after ${timeoutMs}ms`,
      undefined,
      { timeoutMs }
    );
    this.name = 'TimeoutError';
    this.code = 'TIMEOUT';
  }
}

/**
 * Max iterations exceeded error
 */
export class MaxIterationsError extends RuntimeError {
  constructor(
    public maxIterations: number
  ) {
    super(
      `Maximum iterations exceeded: ${maxIterations}`,
      undefined,
      { maxIterations }
    );
    this.name = 'MaxIterationsError';
    this.code = 'MAX_ITERATIONS';
  }
}

/**
 * Threshold gap error
 */
export class ThresholdGapError extends RuntimeError {
  constructor(
    public value: any,
    public gaps: Array<{ min: number; max: number }>
  ) {
    super(
      `Value ${value} does not match any threshold`,
      undefined,
      { value, gaps }
    );
    this.name = 'ThresholdGapError';
    this.code = 'THRESHOLD_GAP';
  }
}

/**
 * Control flow signals - NOT errors, used for BREAK and CONTINUE
 * These are caught by loop handlers to control execution flow
 */
export class BreakSignal extends Error {
  constructor() {
    super('BREAK');
    this.name = 'BreakSignal';
  }
}

export class ContinueSignal extends Error {
  constructor() {
    super('CONTINUE');
    this.name = 'ContinueSignal';
  }
}

/**
 * Type error specific to evaluation (different from parse-time type checking)
 */
export class EvalTypeError extends RuntimeError {
  constructor(
    message: string,
    location?: SourceLocation,
    context?: Record<string, any>
  ) {
    super(message, location, context);
    this.name = 'EvalTypeError';
    this.code = 'TYPE_ERROR';
  }
}

/**
 * Format error for user display
 */
export function formatError(error: EvaluationError): string {
  let formatted = error.message;
  
  if (error.location) {
    formatted += `\n  at line ${error.location.start.line}, column ${error.location.start.column}`;
  }
  
  if (error.context) {
    if (error.context.suggestions && error.context.suggestions.length > 0) {
      formatted += `\n  Did you mean: ${error.context.suggestions.join(', ')}?`;
    }
    
    if (error.context.availableAttributes && error.context.availableAttributes.length > 0) {
      formatted += `\n  Available attributes: ${error.context.availableAttributes.slice(0, 5).join(', ')}`;
    }
  }
  
  return formatted;
}

/**
 * Extract error line number for highlighting
 * 
 * Returns the line number (1-indexed) where the error occurred,
 * or null if no location information is available.
 */
export function getErrorLine(error: unknown): number | null {
  if (!error) return null;
  
  // Check if it's an EvaluationError with location
  if (error instanceof EvaluationError && error.location) {
    return error.location.start.line;
  }
  
  // Check for other error types with line property
  if (typeof error === 'object' && error !== null) {
    const errorObj = error as any;
    
    // Check for direct line property
    if (typeof errorObj.line === 'number') {
      return errorObj.line;
    }
    
    // Check for location object
    if (errorObj.location?.start?.line) {
      return errorObj.location.start.line;
    }
  }
  
  return null;
}