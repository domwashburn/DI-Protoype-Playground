/**
 * Evaluation Engine - Main Entry Point
 * 
 * Provides the public API for parsing and evaluating formulas.
 * Supports both synchronous and asynchronous evaluation.
 * 
 * @module evaluationEngine
 */

import { FormulaParser } from './parsers/FormulaParser';
import { Evaluator } from './runtime/Evaluator';
import { FunctionRegistry } from './runtime/FunctionRegistry';
import { createContext, type ExecutionContext, type ResourceLimits } from './runtime/Context';
import type { Program } from './ast/ASTNodes';
import type { ParseError, RuntimeError } from './errors/EvaluationError';
import type { VerbalizationMap } from '../../components/editors/core/types';

/**
 * Evaluation result
 */
export interface EvaluationResult {
  /** Success status */
  success: boolean;
  
  /** Evaluated value (if success) */
  value?: any;
  
  /** Errors (if any) */
  errors: Array<ParseError | RuntimeError>;
  
  /** Performance metrics */
  metrics: {
    parseTimeMs: number;
    evalTimeMs: number;
    totalTimeMs: number;
  };
  
  /** Result type */
  resultType?: 'number' | 'string' | 'boolean' | 'date' | 'null';
}

/**
 * Compile result
 */
export interface CompileResult {
  /** Success status */
  success: boolean;
  
  /** Compiled program (if success) */
  program?: CompiledProgram;
  
  /** Parse errors (if any) */
  errors: ParseError[];
  
  /** Parse time */
  parseTimeMs: number;
}

/**
 * Compiled program (can be evaluated multiple times)
 */
export class CompiledProgram {
  constructor(
    private ast: Program,
    private defaultFunctions: FunctionRegistry
  ) {}
  
  /**
   * Evaluate with given context
   */
  evaluate(context: Partial<ExecutionContext>): EvaluationResult {
    const startEval = performance.now();
    
    try {
      // Create full context with defaults
      const fullContext = createContext({
        ...context,
        functions: context.functions || this.defaultFunctions
      });
      
      // Evaluate
      const evaluator = new Evaluator();
      const value = evaluator.evaluate(this.ast, fullContext);
      
      const endEval = performance.now();
      
      return {
        success: true,
        value,
        errors: [],
        metrics: {
          parseTimeMs: 0, // Already parsed
          evalTimeMs: endEval - startEval,
          totalTimeMs: endEval - startEval
        },
        resultType: this.inferResultType(value)
      };
    } catch (error: any) {
      const endEval = performance.now();
      
      return {
        success: false,
        errors: [error],
        metrics: {
          parseTimeMs: 0,
          evalTimeMs: endEval - startEval,
          totalTimeMs: endEval - startEval
        }
      };
    }
  }
  
  /**
   * Get AST (for debugging)
   */
  getAST(): Program {
    return this.ast;
  }
  
  /**
   * Infer result type from value
   */
  private inferResultType(value: any): 'number' | 'string' | 'boolean' | 'date' | 'null' {
    if (value === null) return 'null';
    if (value instanceof Date) return 'date';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'boolean') return 'boolean';
    return 'null';
  }
}

/**
 * Evaluation engine configuration
 */
export interface EngineConfig {
  /** Default resource limits */
  defaultLimits?: ResourceLimits;
  
  /** Custom function registry */
  functions?: FunctionRegistry;
}

/**
 * Main evaluation engine class
 */
export class EvaluationEngine {
  private parser: FormulaParser;
  private defaultFunctions: FunctionRegistry;
  private config: EngineConfig;
  
  constructor(config: EngineConfig = {}) {
    this.parser = new FormulaParser();
    this.defaultFunctions = config.functions || new FunctionRegistry();
    this.config = config;
  }
  
  /**
   * Compile source code to AST (synchronous)
   * 
   * @param source - Formula source code
   * @param verbalizationMap - Optional map for resolving natural language variable references
   */
  compile(source: string, verbalizationMap?: VerbalizationMap): CompileResult {
    const startParse = performance.now();
    
    try {
      const ast = this.parser.parse(source, verbalizationMap);
      const endParse = performance.now();
      
      return {
        success: true,
        program: new CompiledProgram(ast, this.defaultFunctions),
        errors: [],
        parseTimeMs: endParse - startParse
      };
    } catch (error: any) {
      const endParse = performance.now();
      
      return {
        success: false,
        errors: [error],
        parseTimeMs: endParse - startParse
      };
    }
  }
  
  /**
   * One-shot evaluation (parse + execute)
   * 
   * @param source - Formula source code
   * @param context - Execution context (variables, attributes, etc.)
   * @param verbalizationMap - Optional map for resolving natural language variable references
   */
  evaluate(source: string, context: Partial<ExecutionContext> = {}, verbalizationMap?: VerbalizationMap): EvaluationResult {
    const startTotal = performance.now();
    const startParse = performance.now();
    
    try {
      // Parse with verbalization map
      const ast = this.parser.parse(source, verbalizationMap);
      const endParse = performance.now();
      
      // Create full context
      const fullContext = createContext({
        ...context,
        functions: context.functions || this.defaultFunctions,
        limits: context.limits || this.config.defaultLimits
      });
      
      // Evaluate
      const startEval = performance.now();
      const evaluator = new Evaluator();
      const value = evaluator.evaluate(ast, fullContext);
      const endEval = performance.now();
      
      return {
        success: true,
        value,
        errors: [],
        metrics: {
          parseTimeMs: endParse - startParse,
          evalTimeMs: endEval - startEval,
          totalTimeMs: performance.now() - startTotal
        },
        resultType: this.inferResultType(value)
      };
    } catch (error: any) {
      return {
        success: false,
        errors: [error],
        metrics: {
          parseTimeMs: performance.now() - startParse,
          evalTimeMs: 0,
          totalTimeMs: performance.now() - startTotal
        }
      };
    }
  }
  
  /**
   * Get function registry
   */
  getFunctions(): FunctionRegistry {
    return this.defaultFunctions;
  }
  
  /**
   * Register custom function
   */
  registerFunction(fn: any): void {
    this.defaultFunctions.register(fn);
  }
  
  /**
   * Infer result type from value
   */
  private inferResultType(value: any): 'number' | 'string' | 'boolean' | 'date' | 'null' {
    if (value === null) return 'null';
    if (value instanceof Date) return 'date';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'boolean') return 'boolean';
    return 'null';
  }
}