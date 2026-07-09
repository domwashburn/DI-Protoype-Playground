/**
 * Tracing Evaluator
 * 
 * Wrapper around EvaluationEngine that records execution traces.
 * Records every step of formula evaluation for debugging and replay.
 * 
 * @module debugger/TracingEvaluator
 */

import { FormulaParser } from '../parsers/FormulaParser';
import { FunctionRegistry } from '../runtime/FunctionRegistry';
import { createContext, type ExecutionContext } from '../runtime/Context';
import { ExecutionTracer, createStepDescription } from './ExecutionTracer';
import type { Program, Expression } from '../ast/ASTNodes';
import type { PrimitiveType } from '../types/TypeSystem';
import type { TraceStep } from './ExecutionTracer';
import { BreakSignal, ContinueSignal, RuntimeError } from '../errors/EvaluationError';
import type { VerbalizationMap } from '../../../components/editors/core/types';

/**
 * Execution trace
 */
export interface ExecutionTrace {
  steps: readonly TraceStep[];
}

/**
 * Evaluation result with trace
 */
export interface TracingEvaluationResult {
  /** Success status */
  success: boolean;
  
  /** Evaluated value (if success) */
  value?: any;
  
  /** Errors (if any) */
  errors: any[];
  
  /** Performance metrics */
  metrics: {
    parseTimeMs: number;
    evalTimeMs: number;
    totalTimeMs: number;
  };
  
  /** Result type */
  resultType?: 'number' | 'string' | 'boolean' | 'date' | 'null';
  
  /** Execution trace (if success) */
  trace?: ExecutionTrace;
}

/**
 * TracingEvaluator
 * 
 * Evaluates formulas while capturing execution traces.
 * 
 * @example
 * const tracer = new TracingEvaluator();
 * const result = tracer.evaluate(formulaCode, context);
 * 
 * console.log(`Executed ${result.trace?.steps.length} steps`);
 */
export class TracingEvaluator {
  private parser: FormulaParser;
  private defaultFunctions: FunctionRegistry;
  private tracer: ExecutionTracer | null = null;

  constructor() {
    this.parser = new FormulaParser();
    this.defaultFunctions = new FunctionRegistry();
  }

  /**
   * Evaluate source code with trace recording
   * 
   * @param source - Formula source code
   * @param context - Execution context
   * @param verbalizationMap - Optional map for resolving natural language variable references
   * @returns Evaluation result with trace
   */
  evaluate(source: string, context: Partial<ExecutionContext> = {}, verbalizationMap?: VerbalizationMap): TracingEvaluationResult {
    const startTotal = performance.now();
    const startParse = performance.now();
    
    try {
      // Parse source code with verbalization map
      const program = this.parser.parse(source, verbalizationMap);
      const endParse = performance.now();
      
      // Validate parsed program
      if (!program) {
        throw new Error('Parser returned null or undefined program');
      }
      
      if (program.type !== 'Program') {
        throw new Error(`Parser returned unexpected node type: ${program.type}`);
      }
      
      if (!Array.isArray(program.body)) {
        console.error('Invalid program structure:', program);
        throw new Error(`Program.body is not an array (got ${typeof program.body})`);
      }
      
      // Create full context
      const fullContext = createContext({
        ...context,
        functions: context.functions || this.defaultFunctions
      });
      
      // Create tracer
      this.tracer = new ExecutionTracer();
      
      // Evaluate with trace
      const startEval = performance.now();
      const value = this.evaluateProgram(program, fullContext);
      const endEval = performance.now();
      
      // Get trace
      const trace = this.tracer.getTrace();
      
      return {
        success: true,
        value,
        errors: [],
        metrics: {
          parseTimeMs: endParse - startParse,
          evalTimeMs: endEval - startEval,
          totalTimeMs: performance.now() - startTotal
        },
        resultType: this.inferResultType(value),
        trace: { steps: trace }
      };
    } catch (error: any) {
      // Log error with proper serialization
      console.error('[TracingEvaluator] Evaluation error:', {
        message: error.message || String(error),
        code: error.code,
        location: error.location,
        name: error.name
      });
      return {
        success: false,
        errors: [error],
        metrics: {
          parseTimeMs: performance.now() - startParse,
          evalTimeMs: 0,
          totalTimeMs: performance.now() - startTotal
        }
      };
    } finally {
      this.tracer = null;
    }
  }

  /**
   * Evaluate program with trace recording
   */
  private evaluateProgram(program: Program, context: ExecutionContext): any {
    if (!this.tracer) {
      throw new Error('Tracer not initialized');
    }

    // Record program start
    const programStartVars = this.captureVariables(context);
    
    // Execute statements
    let lastResult: any = null;
    
    try {
      for (const statement of program.body) {
      const varsBefore = this.captureVariables(context);
      
      if (statement.type === 'ReturnStatement') {
        const returnStmt = statement as any;
        lastResult = this.evaluateExpression(returnStmt.value, context);
        
        const varsAfter = this.captureVariables(context);
        this.tracer.recordStep({
          nodeType: 'ReturnStatement',
          location: statement.location,
          description: `RETURN ${this.formatValue(lastResult)}`,
          variablesBefore: varsBefore,
          variablesAfter: varsAfter,
          changedVariables: [],
          result: lastResult,
          resultType: this.getType(lastResult),
        });
        
        return lastResult;
      } else if (statement.type === 'Assignment') {
        const assignment = statement as any;
        const value = this.evaluateExpression(assignment.value, context);
        
        // Set in locals instead of mutating the variables Map
        // This prevents all trace steps from showing the final value
        if (!context.locals) {
          context.locals = new Map();
        }
        context.locals.set(assignment.variable, value);
        
        const varsAfter = this.captureVariables(context);
        
        // Build description showing the expression
        const expressionStr = this.formatExpressionValue(assignment.value, varsBefore);
        const description = expressionStr !== this.formatValue(value)
          ? `$${assignment.variable} = ${expressionStr} = ${this.formatValue(value)} ${this.getType(value).toUpperCase()}`
          : `$${assignment.variable} = ${this.formatValue(value)} ${this.getType(value).toUpperCase()}`;
        
        this.tracer.recordStep({
          nodeType: 'Assignment',
          location: statement.location,
          description,
          variablesBefore: varsBefore,
          variablesAfter: varsAfter,
          changedVariables: [assignment.variable],
          result: value,
          resultType: this.getType(value),
        });
        
        lastResult = value;
      } else {
        // Expression statement
        const varsBeforeExpr = this.captureVariables(context);
        lastResult = this.evaluateExpression(statement as Expression, context);
        
        // Don't record a duplicate step for IF expressions - they record their own detailed steps
        if (statement.type !== 'IfExpression') {
          const varsAfter = this.captureVariables(context);
          
          // Build detailed description for the expression
          const description = this.buildExpressionDescription(
            statement as Expression,
            lastResult,
            varsBeforeExpr
          );
          
          this.tracer.recordStep({
            nodeType: statement.type as any,
            location: statement.location,
            description,
            variablesBefore: varsBeforeExpr,
            variablesAfter: varsAfter,
            changedVariables: this.findChangedVariables(varsBeforeExpr, varsAfter),
            result: lastResult,
            resultType: this.getType(lastResult),
          });
        }
      }
    }
    
      // Return value
      if (program.returnValue) {
        // Check if the return value is the same as the last statement in the body
        // If so, we've already evaluated it, so don't evaluate it again
        const lastStatement = program.body[program.body.length - 1];
        const isLastStatementReturnValue = lastStatement === program.returnValue;
        
        if (!isLastStatementReturnValue) {
          const varsBefore = this.captureVariables(context);
          lastResult = this.evaluateExpression(program.returnValue, context);
          
          const varsAfter = this.captureVariables(context);
          
          // Build detailed description for the return value
          const description = this.buildExpressionDescription(
            program.returnValue,
            lastResult,
            varsBefore
          );
          
          this.tracer.recordStep({
            nodeType: 'ReturnValue',
            location: program.returnValue.location,
            description: `RETURN: ${description}`,
            variablesBefore: varsBefore,
            variablesAfter: varsAfter,
            changedVariables: [],
            result: lastResult,
            resultType: this.getType(lastResult),
          });
        }
      }
      
      return lastResult;
    } catch (error) {
      // Catch BREAK/CONTINUE that escaped from loops
      if (error instanceof BreakSignal) {
        throw new RuntimeError('BREAK statement outside of loop or switch');
      }
      if (error instanceof ContinueSignal) {
        throw new RuntimeError('CONTINUE statement outside of loop');
      }
      // Re-throw other errors
      throw error;
    }
  }

  /**
   * Evaluate expression (simplified - delegates to basic evaluation)
   */
  private evaluateExpression(expr: Expression, context: ExecutionContext): any {
    switch (expr.type) {
      case 'NumberLiteral':
        return (expr as any).value;
      
      case 'StringLiteral':
        return (expr as any).value;
      
      case 'BooleanLiteral':
        return (expr as any).value;
      
      case 'NullLiteral':
        return (expr as any).value; // NullLiteral.value is null
      
      case 'Assignment': {
        // Handle assignments that appear as expressions (e.g., inside IF blocks)
        const assignment = expr as any;
        const value = this.evaluateExpression(assignment.value, context);
        
        // Store in locals
        if (!context.locals) {
          context.locals = new Map();
        }
        context.locals.set(assignment.variable, value);
        
        return value;
      }
      
      case 'VariableRef': {
        const varRef = expr as any;
        
        // Check locals first, then variables (same as Context.getVariable)
        if (context.locals?.has(varRef.name)) {
          return context.locals.get(varRef.name);
        }
        
        if (context.variables.has(varRef.name)) {
          return context.variables.get(varRef.name);
        }
        
        throw new Error(`Undefined variable: ${varRef.name}`);
      }
      
      case 'AttributeRef': {
        const attrRef = expr as any;
        const path = attrRef.path;
        
        // Try flat key lookup first
        const flatKey = Array.isArray(path) ? path.join('.') : String(path);
        
        if (context.attributes.has(flatKey)) {
          return context.attributes.get(flatKey);
        }
        
        // Try nested lookup if path is array
        if (Array.isArray(path)) {
          let current: any = context.attributes;
          
          for (const segment of path) {
            if (current instanceof Map) {
              if (!current.has(segment)) {
                throw new Error(`Undefined attribute: #${flatKey}`);
              }
              current = current.get(segment);
            } else if (typeof current === 'object' && current !== null) {
              if (!(segment in current)) {
                throw new Error(`Undefined attribute: #${flatKey}`);
              }
              current = current[segment];
            } else {
              throw new Error(`Undefined attribute: #${flatKey}`);
            }
          }
          
          return current;
        }
        
        throw new Error(`Undefined attribute: #${flatKey}`);
      }
      
      case 'BinaryOp': {
        const binOp = expr as any;
        
        if (!binOp.left || !binOp.right) {
          throw new Error(`Binary operation missing operands`);
        }
        
        const left = this.evaluateExpression(binOp.left, context);
        const right = this.evaluateExpression(binOp.right, context);
        return this.evalBinaryOp(binOp.operator, left, right);
      }
      
      case 'UnaryOp': {
        const unOp = expr as any;
        
        if (!unOp.operand) {
          throw new Error(`Unary operation missing operand`);
        }
        
        const operand = this.evaluateExpression(unOp.operand, context);
        return this.evalUnaryOp(unOp.operator, operand);
      }
      
      case 'FunctionCall': {
        const funcCall = expr as any;
        
        if (!context.functions) {
          throw new Error(`Function registry not available in context`);
        }
        
        // Defensive check for args array
        const args = Array.isArray(funcCall.args) 
          ? funcCall.args.map((arg: Expression) => this.evaluateExpression(arg, context))
          : [];
        
        return context.functions.execute(funcCall.name, args, context, funcCall.location);
      }
      
      case 'IfExpression': {
        const ifExpr = expr as any;
        
        if (!ifExpr.condition) {
          throw new Error(`IF expression missing condition`);
        }
        
        if (!ifExpr.thenBranch) {
          throw new Error(`IF expression missing THEN branch`);
        }
        
        if (!this.tracer) {
          throw new Error('Tracer not initialized');
        }
        
        // Record step for evaluating the condition
        const varsBefore = this.captureVariables(context);
        const condition = this.evaluateExpression(ifExpr.condition, context);
        const varsAfterCondition = this.captureVariables(context);
        
        // Build detailed description showing the calculation
        const conditionDescription = this.buildExpressionDescription(
          ifExpr.condition, 
          condition, 
          varsBefore // Use varsBefore to show values before any changes
        );
        
        this.tracer.recordStep({
          nodeType: 'BinaryOperation',
          location: ifExpr.condition.location || ifExpr.location,
          description: conditionDescription,
          variablesBefore: varsBefore,
          variablesAfter: varsAfterCondition,
          changedVariables: [],
          result: condition,
          resultType: this.getType(condition),
        });
        
        // Evaluate the appropriate branch
        if (condition) {
          // Record step for THEN branch
          const varsBeforeThen = this.captureVariables(context);
          const thenResult = this.evaluateExpression(ifExpr.thenBranch, context);
          const varsAfterThen = this.captureVariables(context);
          
          // Build description for THEN branch
          const thenDescription = this.buildExpressionDescription(
            ifExpr.thenBranch,
            thenResult,
            varsBeforeThen
          );
          
          this.tracer.recordStep({
            nodeType: ifExpr.thenBranch.type === 'Assignment' ? 'Assignment' : 'BlockExpression',
            location: ifExpr.thenBranch.location || ifExpr.location,
            description: thenDescription,
            variablesBefore: varsBeforeThen,
            variablesAfter: varsAfterThen,
            changedVariables: this.findChangedVariables(varsBeforeThen, varsAfterThen),
            result: thenResult,
            resultType: this.getType(thenResult),
          });
          
          return thenResult;
        }
        
        if (Array.isArray(ifExpr.elseIfBranches)) {
          for (const elseIf of ifExpr.elseIfBranches) {
            // Record step for ELSIF condition
            const varsBeforeElsif = this.captureVariables(context);
            const elseIfCondition = this.evaluateExpression(elseIf.condition, context);
            const varsAfterElsifCond = this.captureVariables(context);
            
            // Build description for ELSIF condition
            const elsifConditionDescription = this.buildExpressionDescription(
              elseIf.condition,
              elseIfCondition,
              varsBeforeElsif
            );
            
            this.tracer.recordStep({
              nodeType: 'BinaryOperation',
              location: elseIf.condition.location || ifExpr.location,
              description: elsifConditionDescription,
              variablesBefore: varsBeforeElsif,
              variablesAfter: varsAfterElsifCond,
              changedVariables: [],
              result: elseIfCondition,
              resultType: this.getType(elseIfCondition),
            });
            
            if (elseIfCondition) {
              // Record step for ELSIF branch
              const varsBeforeElsifBody = this.captureVariables(context);
              const elsifResult = this.evaluateExpression(elseIf.body, context);
              const varsAfterElsifBody = this.captureVariables(context);
              
              // Build description for ELSIF body
              const elsifBodyDescription = this.buildExpressionDescription(
                elseIf.body,
                elsifResult,
                varsBeforeElsifBody
              );
              
              this.tracer.recordStep({
                nodeType: elseIf.body.type === 'Assignment' ? 'Assignment' : 'BlockExpression',
                location: elseIf.body.location || ifExpr.location,
                description: elsifBodyDescription,
                variablesBefore: varsBeforeElsifBody,
                variablesAfter: varsAfterElsifBody,
                changedVariables: this.findChangedVariables(varsBeforeElsifBody, varsAfterElsifBody),
                result: elsifResult,
                resultType: this.getType(elsifResult),
              });
              
              return elsifResult;
            }
          }
        }
        
        if (ifExpr.elseBranch) {
          // Record step for ELSE branch
          const varsBeforeElse = this.captureVariables(context);
          const elseResult = this.evaluateExpression(ifExpr.elseBranch, context);
          const varsAfterElse = this.captureVariables(context);
          
          // Build description for ELSE branch
          const elseDescription = this.buildExpressionDescription(
            ifExpr.elseBranch,
            elseResult,
            varsBeforeElse
          );
          
          this.tracer.recordStep({
            nodeType: ifExpr.elseBranch.type === 'Assignment' ? 'Assignment' : 'BlockExpression',
            location: ifExpr.elseBranch.location || ifExpr.location,
            description: elseDescription,
            variablesBefore: varsBeforeElse,
            variablesAfter: varsAfterElse,
            changedVariables: this.findChangedVariables(varsBeforeElse, varsAfterElse),
            result: elseResult,
            resultType: this.getType(elseResult),
          });
          
          return elseResult;
        } else {
          // BUG FIX: Log when no ELSE branch exists for debugging
          console.warn(`IF expression at line ${ifExpr.location?.line} has no ELSE branch. Condition was false, returning null.`);
        }
        
        return null;
      }
      
      case 'ListLiteral': {
        const listLiteral = expr as any;
        
        // Empty list
        if (!listLiteral.elements || listLiteral.elements.length === 0) {
          return [];
        }
        
        // Evaluate all elements
        const elements = listLiteral.elements.map((el: Expression) => 
          this.evaluateExpression(el, context)
        );
        
        // Check homogeneous type requirement
        // IMPORTANT: Objects are allowed in lists (list of objects is valid)
        const firstType = this.getType(elements[0]);
        for (let i = 1; i < elements.length; i++) {
          const elementType = this.getType(elements[i]);
          
          // Allow 'object' type to match 'object' type (list of objects is valid)
          if (firstType !== elementType) {
            throw new Error(
              `List elements must be homogeneous. Expected ${firstType}, got ${elementType} at index ${i}`
            );
          }
        }
        
        return elements;
      }
      
      case 'IndexAccess': {
        const indexAccess = expr as any;
        
        // Evaluate the object being indexed
        const obj = this.evaluateExpression(indexAccess.object, context);
        
        // Check if it's an array
        if (!Array.isArray(obj)) {
          throw new Error(`Cannot index non-list value`);
        }
        
        // Evaluate the index
        const index = this.evaluateExpression(indexAccess.index, context);
        
        // Check if index is a number
        if (typeof index !== 'number') {
          throw new Error(`List index must be a number`);
        }
        
        // Check if index is an integer
        if (!Number.isInteger(index)) {
          throw new Error(`List index must be an integer, got ${index}`);
        }
        
        // Handle negative indexing
        const actualIndex = index < 0 ? obj.length + index : index;
        
        // Bounds checking
        if (actualIndex < 0 || actualIndex >= obj.length) {
          throw new Error(
            `List index out of bounds: ${index} (list length: ${obj.length})`
          );
        }
        
        return obj[actualIndex];
      }
      
      case 'ObjectLiteral': {
        const objectLiteral = expr as any;
        const obj: Record<string, any> = {};
        
        if (!objectLiteral.properties || !Array.isArray(objectLiteral.properties)) {
          return obj;
        }
        
        for (const prop of objectLiteral.properties) {
          obj[prop.key] = this.evaluateExpression(prop.value, context);
        }
        
        return obj;
      }
      
      case 'PropertyAccess': {
        const propertyAccess = expr as any;
        
        // Evaluate the object being accessed
        const obj = this.evaluateExpression(propertyAccess.object, context);
        
        // Type checking: Must be plain object
        if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
          throw new Error(
            `Cannot access property '${propertyAccess.property}' on non-object value`
          );
        }
        
        // Property existence check
        if (!(propertyAccess.property in obj)) {
          const availableProps = Object.keys(obj).join(', ');
          throw new Error(
            `Property '${propertyAccess.property}' does not exist on object. Available properties: ${availableProps}`
          );
        }
        
        const result = obj[propertyAccess.property];
        
        // Emit trace step for property access
        if (this.tracer) {
          // Generate description showing the property access
          const objectName = this.getExpressionSource(propertyAccess.object);
          const description = `${objectName}.${propertyAccess.property}`;
          
          const varsBefore = this.captureVariables(context);
          
          this.tracer.recordStep({
            nodeType: 'PropertyAccess' as any,
            location: propertyAccess.location,
            result,
            resultType: this.inferType(result) as any,
            description,
            variablesBefore: varsBefore,
            variablesAfter: varsBefore, // Property access doesn't change variables
            changedVariables: []
          });
        }
        
        return result;
      }
      
      case 'BlockExpression': {
        const block = expr as any;
        let lastValue: any;
        
        if (!this.tracer) {
          throw new Error('Tracer not initialized');
        }
        
        // Execute each statement in the block
        for (const stmt of block.statements) {
          lastValue = this.evaluateExpression(stmt, context);
        }
        
        // Return the value of the last expression
        return lastValue;
      }
      
      case 'RangeExpression': {
        const rangeExpr = expr as any;
        const start = this.evaluateExpression(rangeExpr.start, context);
        const end = this.evaluateExpression(rangeExpr.end, context);
        
        if (typeof start !== 'number' || typeof end !== 'number') {
          throw new Error('Range bounds must be numbers');
        }
        
        if (!Number.isInteger(start) || !Number.isInteger(end)) {
          throw new Error('Range bounds must be integers');
        }
        
        // Generate array from start to end (inclusive)
        const result: number[] = [];
        if (start <= end) {
          for (let i = start; i <= end; i++) {
            result.push(i);
          }
        } else {
          for (let i = start; i >= end; i--) {
            result.push(i);
          }
        }
        
        return result;
      }
      
      case 'ForLoopStatement': {
        const forLoop = expr as any;
        
        if (!this.tracer) {
          throw new Error('Tracer not initialized');
        }
        
        // Evaluate the iterable
        const iterable = this.evaluateExpression(forLoop.iterable, context);
        
        if (!Array.isArray(iterable)) {
          throw new Error('FOR loop iterable must be a list');
        }
        
        let lastValue: any = null;
        
        // Iterate over each element
        for (let i = 0; i < iterable.length; i++) {
          const item = iterable[i];
          
          // Set loop variable
          if (!context.locals) {
            context.locals = new Map();
          }
          context.locals.set(forLoop.iterator, item);
          
          // TRACE: Record step for loop iteration (shows iterator value on loop line)
          const varsBeforeIteration = this.captureVariables(context);
          const iteratorDescription = `${forLoop.iterator} = ${this.formatValue(item)}`;
          
          this.tracer.recordStep({
            nodeType: 'ForLoopStatement',
            location: forLoop.location,
            description: `FOR ${iteratorDescription}`,
            variablesBefore: varsBeforeIteration,
            variablesAfter: varsBeforeIteration, // No change yet, just showing iterator
            changedVariables: [forLoop.iterator], // Iterator is "changed"
            result: item,
            resultType: this.getType(item),
          });
          
          // Execute loop body, catching BREAK/CONTINUE signals
          try {
            for (const stmt of forLoop.body) {
              // Record step for each statement in the loop body
              const varsBeforeStmt = this.captureVariables(context);
              lastValue = this.evaluateExpression(stmt, context);
              const varsAfterStmt = this.captureVariables(context);
              
              // Record step for this statement (all expressions, not just assignments)
              if (stmt.type !== 'IfExpression') { // IF expressions record their own steps
                const stmtDescription = this.buildExpressionDescription(
                  stmt,
                  lastValue,
                  varsBeforeStmt
                );
                
                this.tracer.recordStep({
                  nodeType: stmt.type === 'Assignment' ? 'Assignment' : stmt.type as any,
                  location: stmt.location || forLoop.location,
                  description: stmtDescription,
                  variablesBefore: varsBeforeStmt,
                  variablesAfter: varsAfterStmt,
                  changedVariables: this.findChangedVariables(varsBeforeStmt, varsAfterStmt),
                  result: lastValue,
                  resultType: this.getType(lastValue),
                });
              }
            }
          } catch (error) {
            // Handle control flow signals
            if (error instanceof BreakSignal) {
              return lastValue;
            }
            if (error instanceof ContinueSignal) {
              // Continue to next iteration
              continue;
            }
            // Re-throw other errors
            throw error;
          }
        }
        
        return lastValue;
      }
      
      case 'WhileLoopStatement': {
        const whileLoop = expr as any;
        
        if (!this.tracer) {
          throw new Error('Tracer not initialized');
        }
        
        let lastValue: any = null;
        let iterations = 0;
        const MAX_ITERATIONS = 10000;
        
        while (true) {
          // Check iteration limit
          if (iterations++ > MAX_ITERATIONS) {
            throw new Error(`WHILE loop exceeded maximum iterations (${MAX_ITERATIONS})`);
          }
          
          // TRACE: Evaluate and record condition check on EACH iteration
          const varsBeforeCondition = this.captureVariables(context);
          const condition = this.evaluateExpression(whileLoop.condition, context);
          
          // Build description showing the condition expression and result
          const conditionDescription = this.buildExpressionDescription(
            whileLoop.condition,
            condition,
            varsBeforeCondition
          );
          
          this.tracer.recordStep({
            nodeType: 'WhileLoopStatement',
            location: whileLoop.location, // This should be the WHILE line
            description: `WHILE ${conditionDescription}`,
            variablesBefore: varsBeforeCondition,
            variablesAfter: varsBeforeCondition, // Condition evaluation doesn't change vars
            changedVariables: [],
            result: condition,
            resultType: 'boolean',
          });
          
          // If condition is false, exit loop
          if (!condition) {
            break;
          }
          
          // Execute loop body, catching BREAK/CONTINUE signals
          try {
            for (const stmt of whileLoop.body) {
              // Record step for each statement in the loop body
              const varsBeforeStmt = this.captureVariables(context);
              lastValue = this.evaluateExpression(stmt, context);
              const varsAfterStmt = this.captureVariables(context);
              
              // Record step for this statement (all expressions, not just assignments)
              if (stmt.type !== 'IfExpression') { // IF expressions record their own steps
                const stmtDescription = this.buildExpressionDescription(
                  stmt,
                  lastValue,
                  varsBeforeStmt
                );
                
                this.tracer.recordStep({
                  nodeType: stmt.type === 'Assignment' ? 'Assignment' : stmt.type as any,
                  location: stmt.location || whileLoop.location,
                  description: stmtDescription,
                  variablesBefore: varsBeforeStmt,
                  variablesAfter: varsAfterStmt,
                  changedVariables: this.findChangedVariables(varsBeforeStmt, varsAfterStmt),
                  result: lastValue,
                  resultType: this.getType(lastValue),
                });
              }
            }
          } catch (error) {
            // Handle control flow signals
            if (error instanceof BreakSignal) {
              return lastValue;
            }
            if (error instanceof ContinueSignal) {
              // Continue to next iteration
              continue;
            }
            // Re-throw other errors
            throw error;
          }
        }
        
        return lastValue;
      }
      
      case 'SwitchStatement': {
        const switchStmt = expr as any;
        
        if (!this.tracer) {
          throw new Error('Tracer not initialized');
        }
        
        // Record step for SWITCH expression evaluation
        const varsBeforeSwitch = this.captureVariables(context);
        const switchValue = this.evaluateExpression(switchStmt.expression, context);
        const varsAfterSwitch = this.captureVariables(context);
        
        // Build description for SWITCH expression
        const switchDescription = this.buildExpressionDescription(
          switchStmt.expression,
          switchValue,
          varsBeforeSwitch
        );
        
        this.tracer.recordStep({
          nodeType: 'BinaryOperation',
          location: switchStmt.expression.location || switchStmt.location,
          description: switchDescription,
          variablesBefore: varsBeforeSwitch,
          variablesAfter: varsAfterSwitch,
          changedVariables: [],
          result: switchValue,
          resultType: this.getType(switchValue),
        });
        
        let lastValue: any = null;
        let matched = false;
        
        // Check each case
        for (const caseClause of switchStmt.cases) {
          const varsBeforeCase = this.captureVariables(context);
          const caseValue = this.evaluateExpression(caseClause.value, context);
          const caseMatches = switchValue === caseValue;
          
          // Record step for CASE comparison
          this.tracer.recordStep({
            nodeType: 'BinaryOperation',
            location: caseClause.location,
            description: `${this.formatValue(switchValue)} = ${this.formatValue(caseValue)}: ${caseMatches}`,
            variablesBefore: varsBeforeCase,
            variablesAfter: varsBeforeCase,
            changedVariables: [],
            result: caseMatches,
            resultType: 'boolean',
          });
          
          if (caseMatches) {
            matched = true;
            
            // Execute case body - record each statement
            for (const stmt of caseClause.body) {
              // Check for BREAK
              if (stmt.type === 'BreakStatement') {
                return lastValue;
              }
              
              const varsBeforeStmt = this.captureVariables(context);
              lastValue = this.evaluateExpression(stmt, context);
              const varsAfterStmt = this.captureVariables(context);
              
              // Record step for this statement (all expressions, not just assignments)
              if (stmt.type !== 'IfExpression') { // IF expressions record their own steps
                const stmtDescription = this.buildExpressionDescription(
                  stmt,
                  lastValue,
                  varsBeforeStmt
                );
                
                this.tracer.recordStep({
                  nodeType: stmt.type === 'Assignment' ? 'Assignment' : stmt.type as any,
                  location: stmt.location || caseClause.location,
                  description: stmtDescription,
                  variablesBefore: varsBeforeStmt,
                  variablesAfter: varsAfterStmt,
                  changedVariables: this.findChangedVariables(varsBeforeStmt, varsAfterStmt),
                  result: lastValue,
                  resultType: this.getType(lastValue),
                });
              }
            }
            
            // No automatic fall-through
            break;
          }
        }
        
        // Execute DEFAULT case if no match
        if (!matched && switchStmt.defaultCase) {
          for (const stmt of switchStmt.defaultCase) {
            // Check for BREAK
            if (stmt.type === 'BreakStatement') {
              return lastValue;
            }
            
            const varsBeforeStmt = this.captureVariables(context);
            lastValue = this.evaluateExpression(stmt, context);
            const varsAfterStmt = this.captureVariables(context);
            
            // Record step for this statement (all expressions, not just assignments)
            if (stmt.type !== 'IfExpression') { // IF expressions record their own steps
              const stmtDescription = this.buildExpressionDescription(
                stmt,
                lastValue,
                varsBeforeStmt
              );
              
              this.tracer.recordStep({
                nodeType: stmt.type === 'Assignment' ? 'Assignment' : stmt.type as any,
                location: stmt.location,
                description: stmtDescription,
                variablesBefore: varsBeforeStmt,
                variablesAfter: varsAfterStmt,
                changedVariables: this.findChangedVariables(varsBeforeStmt, varsAfterStmt),
                result: lastValue,
                resultType: this.getType(lastValue),
              });
            }
          }
        }
        
        return lastValue;
      }
      
      case 'BreakStatement': {
        // Throw a control flow signal that will be caught by the enclosing loop/switch
        throw new BreakSignal();
      }
      
      case 'ContinueStatement': {
        // Throw a control flow signal that will be caught by the enclosing loop
        throw new ContinueSignal();
      }
      
      default:
        throw new Error(`Unknown expression type: ${expr.type}`);
    }
  }

  /**
   * Evaluate binary operation
   */
  private evalBinaryOp(operator: string, left: any, right: any): any {
    switch (operator) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/': 
        if (right === 0) throw new Error('Division by zero');
        return left / right;
      case '%': return left % right;
      case '=': return left === right;
      case '!=': return left !== right;
      case '<': return left < right;
      case '<=': return left <= right;
      case '>': return left > right;
      case '>=': return left >= right;
      case 'AND': return Boolean(left) && Boolean(right);
      case 'OR': return Boolean(left) || Boolean(right);
      default: throw new Error(`Unknown operator: ${operator}`);
    }
  }

  /**
   * Evaluate unary operation
   */
  private evalUnaryOp(operator: string, operand: any): any {
    switch (operator) {
      case '-': return -operand;
      case 'NOT': return !operand;
      default: throw new Error(`Unknown unary operator: ${operator}`);
    }
  }

  /**
   * Capture current variable state
   */
  private captureVariables(context: ExecutionContext): Record<string, any> {
    const vars: Record<string, any> = {}; 
    
    // Add input variables (parameters)
    for (const [name, value] of context.variables.entries()) {
      vars[name] = value;
    }
    
    // Add locals (defined variables)
    if (context.locals) {
      for (const [name, value] of context.locals.entries()) {
        vars[name] = value;
      }
    }
    
    // Add attributes
    for (const [name, value] of context.attributes.entries()) {
      vars[`#${name}`] = value;
    }
    
    return vars;
  }

  /**
   * Find variables that changed between two snapshots
   */
  private findChangedVariables(before: Record<string, any>, after: Record<string, any>): string[] {
    const changed: string[] = [];
    
    for (const name in after) {
      if (!(name in before) || before[name] !== after[name]) {
        changed.push(name);
      }
    }
    
    for (const name in before) {
      if (!(name in after)) {
        changed.push(name);
      }
    }
    
    return changed;
  }

  /**
   * Get primitive type of a value
   */
  private getType(value: any): PrimitiveType | string {
    if (value === null || value === undefined) return 'null';
    if (Array.isArray(value)) {
      // Get element type from first element
      if (value.length === 0) return 'list';
      const elemType = this.getType(value[0]);
      return `list<${elemType}>`;
    }
    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'string') return 'string';
    if (value instanceof Date) return 'date';
    // Check for plain objects
    if (typeof value === 'object' && value.constructor === Object) {
      return 'object';
    }
    return 'any';
  }

  /**
   * Infer result type from value
   */
  private inferResultType(value: any): 'number' | 'string' | 'boolean' | 'date' | 'null' | string {
    if (value === null) return 'null';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'list';
      const elemType = this.getType(value[0]);
      return `list<${elemType}>`;
    }
    if (value instanceof Date) return 'date';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'boolean') return 'boolean';
    // Check for plain objects
    if (typeof value === 'object' && value.constructor === Object) {
      return 'object';
    }
    return 'null';
  }

  /**
   * Format value for display
   */
  private formatValue(value: any): string {
    if (value === null || value === undefined) return 'null';
    if (Array.isArray(value)) {
      const elements = value.map(el => this.formatValue(el));
      return `[${elements.join(', ')}]`;
    }
    if (typeof value === 'string') return `"${value}"`;
    if (value instanceof Date) return value.toISOString();
    // Format plain objects
    if (typeof value === 'object' && value.constructor === Object) {
      const pairs = Object.entries(value).map(([k, v]) => `${k}: ${this.formatValue(v)}`);
      return `{${pairs.join(', ')}}`;
    }
    return String(value);
  }

  /**
   * Build expression description showing the calculation
   * 
   * Shows only values and calculations, no variable names.
   * For assignments: shows just the result value or the calculation
   * For conditions: shows the calculation with result
   * 
   * @param expr - Expression node
   * @param result - Evaluated result
   * @param variableSnapshot - Variable values at time of evaluation
   * @returns Human-readable description of the calculation
   */
  private buildExpressionDescription(expr: Expression, result: any, variableSnapshot: Record<string, any>): string {
    const resultStr = this.formatValue(result);
    const resultType = this.getType(result).toUpperCase();
    
    switch (expr.type) {
      case 'BinaryOp': {
        const binOp = expr as any;
        
        // For binary operations, show the calculation
        const leftStr = this.formatExpressionValue(binOp.left, variableSnapshot);
        const rightStr = this.formatExpressionValue(binOp.right, variableSnapshot);
        
        return `${leftStr} ${binOp.operator} ${rightStr} = ${resultStr} ${resultType}`;
      }
      
      case 'UnaryOp': {
        const unOp = expr as any;
        const operandStr = this.formatExpressionValue(unOp.operand, variableSnapshot);
        
        return `${unOp.operator} ${operandStr} = ${resultStr} ${resultType}`;
      }
      
      case 'VariableRef': {
        // Just show the value, no variable name
        return `${resultStr} ${resultType}`;
      }
      
      case 'AttributeRef': {
        // Just show the value, no attribute name
        return `${resultStr} ${resultType}`;
      }
      
      case 'NumberLiteral':
      case 'StringLiteral':
      case 'BooleanLiteral':
      case 'NullLiteral': {
        return `${resultStr} ${resultType}`;
      }
      
      case 'FunctionCall': {
        const funcCall = expr as any;
        const args = Array.isArray(funcCall.args) 
          ? funcCall.args.map((arg: Expression) => this.formatExpressionValue(arg, variableSnapshot))
          : [];
        
        return `${funcCall.name}(${args.join(', ')}) = ${resultStr} ${resultType}`;
      }
      
      case 'Assignment': {
        // For assignments, always show the variable name
        const assignment = expr as any;
        const rhsStr = this.formatExpressionValue(assignment.value, variableSnapshot);
        
        // If the RHS is different from the result (meaning there was a calculation),
        // show: $variable = calculation = result
        // Otherwise show: $variable = result
        if (rhsStr !== resultStr) {
          return `$${assignment.variable} = ${rhsStr} = ${resultStr} ${resultType}`;
        }
        
        return `$${assignment.variable} = ${resultStr} ${resultType}`;
      }
      
      case 'ListLiteral': {
        return `${resultStr} ${resultType}`;
      }
      
      case 'IndexAccess': {
        const indexAccess = expr as any;
        const objStr = this.formatExpressionValue(indexAccess.object, variableSnapshot);
        const indexStr = this.formatExpressionValue(indexAccess.index, variableSnapshot);
        
        return `${objStr}[${indexStr}] = ${resultStr} ${resultType}`;
      }
      
      default:
        return `${resultStr} ${resultType}`;
    }
  }

  /**
   * Format an expression's value for display
   * 
   * @param expr - Expression node
   * @param variableSnapshot - Variable values
   * @returns Formatted string representation
   */
  private formatExpressionValue(expr: Expression, variableSnapshot: Record<string, any>): string {
    switch (expr.type) {
      case 'VariableRef': {
        const varRef = expr as any;
        const value = variableSnapshot[varRef.name];
        return this.formatValue(value);
      }
      
      case 'AttributeRef': {
        const attrRef = expr as any;
        const path = Array.isArray(attrRef.path) ? attrRef.path.join('.') : String(attrRef.path);
        const value = variableSnapshot[`#${path}`];
        return this.formatValue(value);
      }
      
      case 'NumberLiteral':
      case 'StringLiteral':
      case 'BooleanLiteral': {
        return this.formatValue((expr as any).value);
      }
      
      case 'BinaryOp': {
        const binOp = expr as any;
        const leftStr = this.formatExpressionValue(binOp.left, variableSnapshot);
        const rightStr = this.formatExpressionValue(binOp.right, variableSnapshot);
        return `${leftStr} ${binOp.operator} ${rightStr}`;
      }
      
      case 'UnaryOp': {
        const unOp = expr as any;
        const operandStr = this.formatExpressionValue(unOp.operand, variableSnapshot);
        return `${unOp.operator} ${operandStr}`;
      }
      
      case 'FunctionCall': {
        const funcCall = expr as any;
        const args = Array.isArray(funcCall.args) 
          ? funcCall.args.map((arg: Expression) => this.formatExpressionValue(arg, variableSnapshot))
          : [];
        return `${funcCall.name}(${args.join(', ')})`;
      }
      
      case 'ListLiteral': {
        const listLiteral = expr as any;
        if (!listLiteral.elements || listLiteral.elements.length === 0) {
          return '[]';
        }
        const elements = listLiteral.elements.map((el: Expression) => 
          this.formatExpressionValue(el, variableSnapshot)
        );
        return `[${elements.join(', ')}]`;
      }
      
      case 'IndexAccess': {
        const indexAccess = expr as any;
        const objStr = this.formatExpressionValue(indexAccess.object, variableSnapshot);
        const indexStr = this.formatExpressionValue(indexAccess.index, variableSnapshot);
        return `${objStr}[${indexStr}]`;
      }
      
      default:
        return '?';
    }
  }

  /**
   * Get the source code of an expression
   * 
   * @param expr - Expression node
   * @returns Source code string
   */
  private getExpressionSource(expr: Expression): string {
    switch (expr.type) {
      case 'VariableRef':
        return (expr as any).name;
      
      case 'AttributeRef':
        const path = (expr as any).path;
        return Array.isArray(path) ? path.join('.') : String(path);
      
      case 'BinaryOp':
        const binOp = expr as any;
        return `(${this.getExpressionSource(binOp.left)} ${binOp.operator} ${this.getExpressionSource(binOp.right)})`;
      
      case 'UnaryOp':
        const unOp = expr as any;
        return `${unOp.operator} ${this.getExpressionSource(unOp.operand)}`;
      
      case 'FunctionCall':
        const funcCall = expr as any;
        const args = Array.isArray(funcCall.args) 
          ? funcCall.args.map((arg: Expression) => this.getExpressionSource(arg))
          : [];
        return `${funcCall.name}(${args.join(', ')})`;
      
      case 'ListLiteral':
        const listLiteral = expr as any;
        if (!listLiteral.elements || listLiteral.elements.length === 0) {
          return '[]';
        }
        const elements = listLiteral.elements.map((el: Expression) => 
          this.getExpressionSource(el)
        );
        return `[${elements.join(', ')}]`;
      
      case 'IndexAccess':
        const indexAccess = expr as any;
        const objStr = this.getExpressionSource(indexAccess.object);
        const indexStr = this.getExpressionSource(indexAccess.index);
        return `${objStr}[${indexStr}]`;
      
      default:
        return '?';
    }
  }

  /**
   * Infer type of a value
   * 
   * @param value - Value to infer type from
   * @returns Type string
   */
  private inferType(value: any): string {
    if (value === null || value === undefined) return 'null';
    if (Array.isArray(value)) {
      // Get element type from first element
      if (value.length === 0) return 'list';
      const elemType = this.getType(value[0]);
      return `list<${elemType}>`;
    }
    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'string') return 'string';
    if (value instanceof Date) return 'date';
    // Check for plain objects
    if (typeof value === 'object' && value.constructor === Object) {
      return 'object';
    }
    return 'any';
  }
}