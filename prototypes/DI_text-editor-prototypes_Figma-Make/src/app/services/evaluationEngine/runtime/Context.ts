/**
 * Execution Context for Formula & BAL Evaluation Engine
 * 
 * Manages runtime state including variables, attributes, functions, and resource limits.
 * 
 * @module evaluationEngine/runtime/Context
 */

import type { FunctionRegistry } from './FunctionRegistry';
import { coerceType } from '../types/TypeSystem';

/**
 * Resource limits for evaluation
 */
export interface ResourceLimits {
  /** Maximum number of iterations/operations */
  maxIterations: number;
  /** Maximum call stack depth */
  maxCallDepth: number;
  /** Timeout in milliseconds */
  timeoutMs: number;
}

/**
 * Default resource limits
 */
export const DEFAULT_LIMITS: ResourceLimits = {
  maxIterations: 10000,
  maxCallDepth: 100,
  timeoutMs: 5000
};

/**
 * Execution context for formula evaluation
 */
export interface ExecutionContext {
  /** Variable bindings (test values or actual data) */
  variables: Map<string, any>;
  
  /** Attribute values (from data model) */
  attributes: Map<string, any>;
  
  /** Local variables (defined within formula) */
  locals?: Map<string, any>;
  
  /** Variable type declarations (for type coercion) */
  variableTypes?: Map<string, string>;
  
  /** Function registry */
  functions?: FunctionRegistry;
  
  /** Threshold sets for THRESHOLD() function */
  thresholdSets?: Map<string, any>;
  
  /** Resource limits */
  limits?: ResourceLimits;
  
  /** Enable execution trace */
  trace?: boolean;
}

/**
 * Create execution context with defaults
 */
export function createContext(partial: Partial<ExecutionContext> = {}): ExecutionContext {
  return {
    variables: partial.variables || new Map(),
    attributes: partial.attributes || new Map(),
    locals: partial.locals || new Map(),
    variableTypes: partial.variableTypes || new Map(),
    functions: partial.functions,
    thresholdSets: partial.thresholdSets || new Map(),
    limits: partial.limits || DEFAULT_LIMITS,
    trace: partial.trace || false
  };
}

/**
 * Get variable value from context
 * Checks locals first, then variables
 */
export function getVariable(ctx: ExecutionContext, name: string): any {
  // Check local variables first
  if (ctx.locals?.has(name)) {
    return ctx.locals.get(name);
  }
  
  // Then check parameter variables
  if (ctx.variables.has(name)) {
    return ctx.variables.get(name);
  }
  
  return undefined;
}

/**
 * Set variable value in context (local variables)
 * Automatically coerces value to declared type if available
 * 
 * Note: Objects and lists are NOT coerced - they're stored as-is.
 * Coercion only applies to primitive types (number, string, boolean, date, datetime, time)
 */
export function setVariable(ctx: ExecutionContext, name: string, value: any): void {
  if (!ctx.locals) {
    ctx.locals = new Map();
  }
  
  // Check if variable has a declared type and coerce if needed
  if (ctx.variableTypes?.has(name)) {
    const declaredType = ctx.variableTypes.get(name)!;
    
    // Only coerce primitive types - objects and lists are stored as-is
    const primitiveTypes = ['number', 'string', 'boolean', 'date', 'datetime', 'time'];
    
    if (primitiveTypes.includes(declaredType)) {
      const coercedValue = coerceType(value, declaredType as any, { allowCoercion: true, strictCoercion: false });
      ctx.locals.set(name, coercedValue);
    } else {
      // For 'object', 'list', or other non-primitive types, store value as-is
      ctx.locals.set(name, value);
    }
  } else {
    ctx.locals.set(name, value);
  }
}

/**
 * Get attribute value from context
 */
export function getAttribute(ctx: ExecutionContext, path: string[]): any {
  // Try direct lookup first (for flat structure)
  const flatKey = path.join('.');
  if (ctx.attributes.has(flatKey)) {
    return ctx.attributes.get(flatKey);
  }
  
  // Try nested lookup
  let current: any = ctx.attributes;
  
  for (const segment of path) {
    if (current instanceof Map) {
      if (!current.has(segment)) {
        return undefined;
      }
      current = current.get(segment);
    } else if (typeof current === 'object' && current !== null) {
      if (!(segment in current)) {
        return undefined;
      }
      current = current[segment];
    } else {
      return undefined;
    }
  }
  
  return current;
}

/**
 * Check if variable exists in context
 */
export function hasVariable(ctx: ExecutionContext, name: string): boolean {
  return ctx.locals?.has(name) || ctx.variables.has(name);
}

/**
 * Check if attribute exists in context
 */
export function hasAttribute(ctx: ExecutionContext, path: string[]): boolean {
  const flatKey = path.join('.');
  if (ctx.attributes.has(flatKey)) {
    return true;
  }
  
  // Check nested structure
  let current: any = ctx.attributes;
  
  for (const segment of path) {
    if (current instanceof Map) {
      if (!current.has(segment)) {
        return false;
      }
      current = current.get(segment);
    } else if (typeof current === 'object' && current !== null) {
      if (!(segment in current)) {
        return false;
      }
      current = current[segment];
    } else {
      return false;
    }
  }
  
  return true;
}

/**
 * Get all available variable names
 */
export function getAvailableVariables(ctx: ExecutionContext): string[] {
  const names = new Set<string>();
  
  // Add locals
  if (ctx.locals) {
    ctx.locals.forEach((_, name) => names.add(name));
  }
  
  // Add variables
  ctx.variables.forEach((_, name) => names.add(name));
  
  return Array.from(names);
}

/**
 * Get all available attribute paths
 */
export function getAvailableAttributes(ctx: ExecutionContext): string[] {
  const paths = new Set<string>();
  
  ctx.attributes.forEach((_, key) => {
    if (typeof key === 'string') {
      paths.add(key);
    }
  });
  
  return Array.from(paths);
}