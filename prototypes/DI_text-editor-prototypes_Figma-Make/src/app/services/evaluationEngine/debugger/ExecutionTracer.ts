/**
 * Execution Tracer
 * 
 * Records step-by-step execution trace of formula evaluation.
 * Captures variable states, branch decisions, and intermediate results.
 * 
 * @module debugger/ExecutionTracer
 */

import type { Expression, SourceLocation } from '../ast/ASTNodes';
import type { PrimitiveType } from '../types/TypeSystem';

/**
 * Type of AST node being evaluated
 */
export type NodeType =
  | 'Literal'
  | 'Variable'
  | 'BinaryOperation'
  | 'UnaryOperation'
  | 'FunctionCall'
  | 'IfExpression'
  | 'Assignment'
  | 'ReturnStatement'
  | 'BlockExpression';

/**
 * Single step in execution trace
 */
export interface TraceStep {
  /** Unique step number in execution order (0-indexed) */
  stepNumber: number;
  
  /** Timestamp when step was recorded */
  timestamp: number;
  
  /** Type of AST node */
  nodeType: NodeType;
  
  /** Source location in formula code */
  location: SourceLocation;
  
  /** Description of what this step does */
  description: string;
  
  // ======== Variable State ========
  
  /** Variable values before this step executes */
  variablesBefore: Record<string, any>;
  
  /** Variable values after this step executes */
  variablesAfter: Record<string, any>;
  
  /** Names of variables that changed in this step */
  changedVariables: string[];
  
  // ======== Evaluation Result ========
  
  /** Result of evaluating this expression */
  result: any;
  
  /** Type of the result */
  resultType: PrimitiveType;
  
  // ======== Execution Context ========
  
  /** Parent step number (for nested expressions) */
  parentStep?: number;
  
  /** Child step numbers (for expressions with sub-expressions) */
  childSteps: number[];
  
  /** Depth in expression tree (0 = top level) */
  depth: number;
  
  // ======== Control Flow (for IF/ELSIF/ELSE) ========
  
  /** For conditionals: was this branch taken? */
  branchTaken?: boolean;
  
  /** For conditionals: result of condition evaluation */
  conditionResult?: boolean;
  
  /** For conditionals: which branch was selected */
  selectedBranch?: 'then' | 'else' | 'elsif' | 'none';
  
  // ======== Function Calls ========
  
  /** For function calls: function name */
  functionName?: string;
  
  /** For function calls: argument values */
  functionArgs?: any[];
  
  /** For function calls: return value */
  functionReturn?: any;
}

/**
 * Options for trace recording
 */
export interface TraceOptions {
  /** Maximum steps to record (prevents infinite loops) */
  maxSteps?: number;
  
  /** Whether to include child expression details */
  includeSubExpressions?: boolean;
  
  /** Whether to deep clone variable state (slower but safer) */
  deepClone?: boolean;
}

/**
 * Execution trace recorder
 * 
 * Captures complete execution history of a formula evaluation.
 * Provides playback and inspection capabilities.
 * 
 * @example
 * const tracer = new ExecutionTracer();
 * 
 * // Record step
 * tracer.recordStep({
 *   nodeType: 'Assignment',
 *   description: '$total = $price * $quantity',
 *   variablesBefore: { price: 10, quantity: 5 },
 *   result: 50,
 *   // ...
 * });
 * 
 * // Get complete trace
 * const trace = tracer.getTrace();
 * console.log(`Executed ${trace.length} steps`);
 */
export class ExecutionTracer {
  private steps: TraceStep[] = [];
  private currentStepNumber = 0;
  private depthStack: number[] = [0];
  private options: Required<TraceOptions>;
  
  constructor(options: TraceOptions = {}) {
    this.options = {
      maxSteps: options.maxSteps ?? 10000,
      includeSubExpressions: options.includeSubExpressions ?? true,
      deepClone: options.deepClone ?? true,
    };
  }

  /**
   * Record a single execution step
   * 
   * @param step - Step data (stepNumber and timestamp will be auto-filled)
   * @throws Error if max steps exceeded
   */
  recordStep(step: Omit<TraceStep, 'stepNumber' | 'timestamp' | 'depth' | 'childSteps'>): void {
    if (this.steps.length >= this.options.maxSteps) {
      throw new Error(
        `Maximum trace steps exceeded (${this.options.maxSteps}). ` +
        `Possible infinite loop detected.`
      );
    }

    const depth = this.depthStack[this.depthStack.length - 1];

    const fullStep: TraceStep = {
      ...step,
      stepNumber: this.currentStepNumber++,
      timestamp: Date.now(),
      depth,
      childSteps: [],
      // Deep clone if requested to prevent mutations
      variablesBefore: this.options.deepClone
        ? this.deepClone(step.variablesBefore)
        : { ...step.variablesBefore },
      variablesAfter: this.options.deepClone
        ? this.deepClone(step.variablesAfter)
        : { ...step.variablesAfter },
    };

    this.steps.push(fullStep);

    // Add this step as a child of its parent
    if (step.parentStep !== undefined && this.steps[step.parentStep]) {
      this.steps[step.parentStep].childSteps.push(fullStep.stepNumber);
    }
  }

  /**
   * Enter a nested expression (increase depth)
   */
  enterNested(): void {
    const currentDepth = this.depthStack[this.depthStack.length - 1];
    this.depthStack.push(currentDepth + 1);
  }

  /**
   * Exit a nested expression (decrease depth)
   */
  exitNested(): void {
    if (this.depthStack.length > 1) {
      this.depthStack.pop();
    }
  }

  /**
   * Get the complete execution trace
   * 
   * @returns Array of all recorded steps in execution order
   */
  getTrace(): ReadonlyArray<TraceStep> {
    return this.steps;
  }

  /**
   * Get a specific step by index
   * 
   * @param stepNumber - Step number to retrieve
   * @returns Step at that index, or undefined if not found
   */
  getStepAt(stepNumber: number): TraceStep | undefined {
    return this.steps[stepNumber];
  }

  /**
   * Get the total number of steps recorded
   */
  getTotalSteps(): number {
    return this.steps.length;
  }

  /**
   * Get the current step number (next to be recorded)
   */
  getCurrentStepNumber(): number {
    return this.currentStepNumber;
  }

  /**
   * Get all steps at a specific depth
   * 
   * @param depth - Depth level (0 = top-level)
   * @returns Steps at that depth
   */
  getStepsAtDepth(depth: number): TraceStep[] {
    return this.steps.filter(step => step.depth === depth);
  }

  /**
   * Get all child steps of a parent step
   * 
   * @param parentStepNumber - Parent step number
   * @returns Child steps in execution order
   */
  getChildSteps(parentStepNumber: number): TraceStep[] {
    const parent = this.steps[parentStepNumber];
    if (!parent) {
      return [];
    }

    return parent.childSteps
      .map(stepNum => this.steps[stepNum])
      .filter(Boolean);
  }

  /**
   * Get steps where a specific variable was modified
   * 
   * @param variableName - Variable to search for
   * @returns Steps where this variable changed
   */
  getStepsModifying(variableName: string): TraceStep[] {
    return this.steps.filter(step =>
      step.changedVariables.includes(variableName)
    );
  }

  /**
   * Get steps by node type
   * 
   * @param nodeType - Type of node to filter by
   * @returns Steps of that node type
   */
  getStepsByType(nodeType: NodeType): TraceStep[] {
    return this.steps.filter(step => step.nodeType === nodeType);
  }

  /**
   * Get all branch decision points (IF/ELSIF)
   * 
   * @returns Steps where conditional branches were evaluated
   */
  getBranchPoints(): TraceStep[] {
    return this.steps.filter(step =>
      step.nodeType === 'IfExpression' && step.branchTaken !== undefined
    );
  }

  /**
   * Get execution summary statistics
   * 
   * @returns Summary of trace execution
   */
  getSummary(): TraceSummary {
    const byType = new Map<NodeType, number>();
    let assignments = 0;
    let functionCalls = 0;
    let branchPoints = 0;
    let variablesModified = new Set<string>();

    for (const step of this.steps) {
      // Count by type
      byType.set(step.nodeType, (byType.get(step.nodeType) ?? 0) + 1);

      // Count specific operations
      if (step.nodeType === 'Assignment') {
        assignments++;
      }
      if (step.nodeType === 'FunctionCall') {
        functionCalls++;
      }
      if (step.nodeType === 'IfExpression' && step.branchTaken !== undefined) {
        branchPoints++;
      }

      // Track modified variables
      step.changedVariables.forEach(v => variablesModified.add(v));
    }

    return {
      totalSteps: this.steps.length,
      executionTimeMs: this.steps.length > 0
        ? this.steps[this.steps.length - 1].timestamp - this.steps[0].timestamp
        : 0,
      stepsByType: Object.fromEntries(byType),
      assignments,
      functionCalls,
      branchPoints,
      variablesModified: Array.from(variablesModified),
      maxDepth: Math.max(...this.steps.map(s => s.depth), 0),
    };
  }

  /**
   * Reset the tracer (clear all recorded steps)
   */
  reset(): void {
    this.steps = [];
    this.currentStepNumber = 0;
    this.depthStack = [0];
  }

  /**
   * Deep clone an object (for variable snapshots)
   */
  private deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime()) as any;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.deepClone(item)) as any;
    }

    const cloned: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = this.deepClone(obj[key]);
      }
    }

    return cloned;
  }

  /**
   * Export trace as JSON (for persistence or analysis)
   * 
   * @returns JSON string of complete trace
   */
  exportAsJSON(): string {
    return JSON.stringify({
      version: '1.0',
      generatedAt: new Date().toISOString(),
      summary: this.getSummary(),
      steps: this.steps,
    }, null, 2);
  }

  /**
   * Import trace from JSON
   * 
   * @param json - JSON string from exportAsJSON
   * @throws Error if JSON is invalid
   */
  importFromJSON(json: string): void {
    try {
      const data = JSON.parse(json);
      
      if (data.version !== '1.0') {
        throw new Error(`Unsupported trace version: ${data.version}`);
      }

      this.steps = data.steps;
      this.currentStepNumber = this.steps.length;
      
      // Rebuild depth stack (set to max depth + 1)
      const maxDepth = Math.max(...this.steps.map(s => s.depth), 0);
      this.depthStack = [maxDepth + 1];
    } catch (error) {
      throw new Error(`Failed to import trace: ${error.message}`);
    }
  }
}

/**
 * Execution trace summary
 */
export interface TraceSummary {
  /** Total number of steps executed */
  totalSteps: number;
  
  /** Total execution time in milliseconds */
  executionTimeMs: number;
  
  /** Steps grouped by node type */
  stepsByType: Record<string, number>;
  
  /** Number of variable assignments */
  assignments: number;
  
  /** Number of function calls */
  functionCalls: number;
  
  /** Number of conditional branch points */
  branchPoints: number;
  
  /** Names of all variables that were modified */
  variablesModified: string[];
  
  /** Maximum nesting depth reached */
  maxDepth: number;
}

/**
 * Helper to create step description from AST node
 * 
 * @param nodeType - Type of node
 * @param context - Additional context (variable name, function name, etc.)
 * @returns Human-readable description
 */
export function createStepDescription(
  nodeType: NodeType,
  context?: { varName?: string; funcName?: string; operator?: string; value?: any }
): string {
  switch (nodeType) {
    case 'Literal':
      return `Literal value: ${context?.value}`;
    
    case 'Variable':
      return `Read variable: $${context?.varName}`;
    
    case 'Assignment':
      return `Assign: $${context?.varName} = ${context?.value}`;
    
    case 'BinaryOperation':
      return `Evaluate: ${context?.operator} operation`;
    
    case 'UnaryOperation':
      return `Evaluate: ${context?.operator} operation`;
    
    case 'FunctionCall':
      return `Call function: ${context?.funcName}()`;
    
    case 'IfExpression':
      return `Evaluate IF condition`;
    
    case 'ReturnStatement':
      return `Return: ${context?.value}`;
    
    case 'BlockExpression':
      return `Execute block`;
    
    default:
      return `Evaluate ${nodeType}`;
  }
}
