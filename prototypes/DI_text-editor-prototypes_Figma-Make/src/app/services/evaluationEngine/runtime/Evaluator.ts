/**
 * Evaluator for Formula & BAL Evaluation Engine
 * 
 * Walks the AST and evaluates expressions to produce values.
 * Handles variable/attribute lookup, function calls, control flow, and type checking.
 * 
 * @module evaluationEngine/runtime/Evaluator
 */

import type {
  Program,
  Expression,
  Statement,
  NumberLiteral,
  StringLiteral,
  BooleanLiteral,
  NullLiteral,
  ListLiteral,
  ObjectLiteral,
  PropertyAccess,
  VariableRef,
  AttributeRef,
  BinaryOp,
  UnaryOp,
  FunctionCall,
  IfExpression,
  IndexAccess,
  Assignment,
  ReturnStatement
} from '../ast/ASTNodes';
import type { ExecutionContext } from './Context';
import {
  getVariable,
  setVariable,
  getAttribute,
  hasVariable,
  hasAttribute,
  getAvailableVariables,
  getAvailableAttributes
} from './Context';
import {
  RuntimeError,
  UndefinedVariableError,
  UndefinedAttributeError,
  DivisionByZeroError,
  MaxIterationsError,
  TimeoutError,
  TypeError as EvalTypeError,
  BreakSignal,
  ContinueSignal
} from '../errors/EvaluationError';
import { inferType, areTypesCompatible, coerceType, TimeValue } from '../types/TypeSystem';

/**
 * Evaluator class
 */
export class Evaluator {
  private iterationCount = 0;
  private startTime = 0;
  
  /**
   * Evaluate a program
   */
  evaluate(program: Program, context: ExecutionContext): any {
    this.iterationCount = 0;
    this.startTime = Date.now();
    
    try {
      // Execute all statements in the program
      for (const statement of program.body) {
        this.checkResourceLimits(context);
        
        if (statement.type === 'ReturnStatement') {
          return this.evaluateExpression((statement as ReturnStatement).value, context);
        } else if (statement.type === 'Assignment') {
          this.evaluateAssignment(statement as Assignment, context);
        } else {
          // Expression statement
          this.evaluateExpression(statement as Expression, context);
        }
      }
      
      // Return implicit return value
      if (program.returnValue) {
        return this.evaluateExpression(program.returnValue, context);
      }
      
      return null;
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
   * Evaluate an expression
   */
  private evaluateExpression(expr: Expression, context: ExecutionContext): any {
    this.checkResourceLimits(context);
    
    switch (expr.type) {
      case 'NumberLiteral':
        return (expr as NumberLiteral).value;
      
      case 'StringLiteral':
        return (expr as StringLiteral).value;
      
      case 'BooleanLiteral':
        return (expr as BooleanLiteral).value;
      
      case 'NullLiteral':
        return null;
      
      case 'ListLiteral': {
        const listLiteral = expr as ListLiteral;
        
        // Empty list
        if (listLiteral.elements.length === 0) {
          return [];
        }
        
        // Evaluate all elements
        const elements = listLiteral.elements.map(el => this.evaluateExpression(el, context));
        
        // Check homogeneous type requirement
        const firstType = inferType(elements[0]);
        
        for (let i = 1; i < elements.length; i++) {
          const elementType = inferType(elements[i]);
          
          // Check if types match (supports nested lists now)
          if (typeof firstType === 'object' && typeof elementType === 'object') {
            // Both are complex types (objects or lists)
            if (firstType.kind === 'object' && elementType.kind === 'object') {
              // Check if object shapes match
              if (!this.areObjectShapesEqual(firstType, elementType)) {
                const firstKeys = Array.from(firstType.properties.keys()).sort();
                const elementKeys = Array.from(elementType.properties.keys()).sort();
                throw new EvalTypeError(
                  `Object at index ${i} has different shape than first object. ` +
                  `Expected properties: [${firstKeys.join(', ')}], ` +
                  `Got properties: [${elementKeys.join(', ')}]`,
                  listLiteral.location,
                  { expected: firstKeys, actual: elementKeys, position: i }
                );
              }
            } else if (firstType.kind === 'list' && elementType.kind === 'list') {
              // Both are lists - check element types match (for nested lists)
              if (!this.areTypesEqual(firstType.elementType, elementType.elementType)) {
                throw new EvalTypeError(
                  `List elements must be homogeneous. Nested list at index ${i} has different element type`,
                  listLiteral.location,
                  { position: i }
                );
              }
            } else {
              throw new EvalTypeError(
                `List elements must be homogeneous. Type mismatch at index ${i}`,
                listLiteral.location,
                { position: i }
              );
            }
          } else if (firstType !== elementType) {
            throw new EvalTypeError(
              `List elements must be homogeneous. Expected ${firstType}, got ${elementType} at index ${i}`,
              listLiteral.location,
              { expected: firstType, actual: elementType, position: i }
            );
          }
        }
        
        return elements;
      }
      
      case 'ObjectLiteral':
        return this.evaluateObjectLiteral(expr as ObjectLiteral, context);
      
      case 'PropertyAccess':
        return this.evaluatePropertyAccess(expr as PropertyAccess, context);
      
      case 'Assignment': {
        // Handle assignments that appear as expressions (e.g., inside IF blocks)
        const assignment = expr as Assignment;
        const value = this.evaluateExpression(assignment.value, context);
        setVariable(context, assignment.variable, value);
        return value;
      }
      
      case 'VariableRef':
        return this.evaluateVariable(expr as VariableRef, context);
      
      case 'AttributeRef':
        return this.evaluateAttribute(expr as AttributeRef, context);
      
      case 'BinaryOp':
        return this.evaluateBinaryOp(expr as BinaryOp, context);
      
      case 'UnaryOp':
        return this.evaluateUnaryOp(expr as UnaryOp, context);
      
      case 'FunctionCall':
        return this.evaluateFunctionCall(expr as FunctionCall, context);
      
      case 'IfExpression':
        return this.evaluateIfExpression(expr as IfExpression, context);
      
      case 'BlockExpression': {
        const block = expr as any;
        let lastValue: any;
        
        // Execute each statement in the block
        for (const stmt of block.statements) {
          lastValue = this.evaluateExpression(stmt, context);
        }
        
        // Return the value of the last expression
        return lastValue;
      }
      
      case 'IndexAccess':
        return this.evaluateIndexAccess(expr as IndexAccess, context);
      
      case 'RangeExpression': {
        const rangeExpr = expr as any;
        const start = this.evaluateExpression(rangeExpr.start, context);
        const end = this.evaluateExpression(rangeExpr.end, context);
        
        if (typeof start !== 'number' || typeof end !== 'number') {
          throw new RuntimeError('Range bounds must be numbers', expr.location);
        }
        
        if (!Number.isInteger(start) || !Number.isInteger(end)) {
          throw new RuntimeError('Range bounds must be integers', expr.location);
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
        
        // Evaluate the iterable
        const iterable = this.evaluateExpression(forLoop.iterable, context);
        
        if (!Array.isArray(iterable)) {
          throw new RuntimeError('FOR loop iterable must be a list', expr.location);
        }
        
        let lastValue: any = null;
        
        // Iterate over each element
        for (let i = 0; i < iterable.length; i++) {
          this.checkResourceLimits(context);
          
          const item = iterable[i];
          
          // Create child scope for loop iteration to support nested loops
          // This ensures nested loop iterators don't overwrite outer loop iterators
          // We create a new locals map that inherits from the parent context
          const previousLocals = context.locals;
          context.locals = new Map(previousLocals);
          
          // Set loop variable in child scope
          setVariable(context, forLoop.iterator, item);
          
          // Execute loop body in child scope, catching BREAK/CONTINUE signals
          try {
            for (const stmt of forLoop.body) {
              lastValue = this.evaluateExpression(stmt, context);
            }
          } catch (error) {
            // Handle control flow signals
            if (error instanceof BreakSignal) {
              // Restore parent locals before breaking
              context.locals = previousLocals;
              return lastValue;
            }
            if (error instanceof ContinueSignal) {
              // Continue to next iteration (after restoring locals)
              // Fall through to restoration code
            } else {
              // Re-throw other errors
              throw error;
            }
          }
          
          // Restore parent locals after iteration
          // But keep any modified variables that existed in parent scope
          if (previousLocals) {
            // Copy back any variables that existed in parent scope (but not the iterator)
            context.locals.forEach((value, key) => {
              if (key !== forLoop.iterator && previousLocals.has(key)) {
                previousLocals.set(key, value);
              }
            });
          }
          context.locals = previousLocals;
        }
        
        return lastValue;
      }
      
      case 'WhileLoopStatement': {
        const whileLoop = expr as any;
        
        let lastValue: any = null;
        
        while (true) {
          this.checkResourceLimits(context);
          
          // Evaluate condition
          const condition = this.evaluateExpression(whileLoop.condition, context);
          
          if (!condition) {
            break;
          }
          
          // Execute loop body, catching BREAK/CONTINUE signals
          try {
            for (const stmt of whileLoop.body) {
              lastValue = this.evaluateExpression(stmt, context);
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
        
        // Evaluate switch expression
        const switchValue = this.evaluateExpression(switchStmt.expression, context);
        
        let lastValue: any = null;
        let matched = false;
        
        // Check each case
        for (const caseClause of switchStmt.cases) {
          const caseValue = this.evaluateExpression(caseClause.value, context);
          
          if (switchValue === caseValue) {
            matched = true;
            
            // Execute case body, catching BREAK signal
            try {
              for (const stmt of caseClause.body) {
                lastValue = this.evaluateExpression(stmt, context);
              }
            } catch (error) {
              // Handle BREAK signal
              if (error instanceof BreakSignal) {
                return lastValue;
              }
              // Re-throw other errors (CONTINUE is invalid in SWITCH)
              throw error;
            }
            
            // No automatic fall-through
            break;
          }
        }
        
        // Execute DEFAULT case if no match
        if (!matched && switchStmt.defaultCase) {
          try {
            for (const stmt of switchStmt.defaultCase) {
              lastValue = this.evaluateExpression(stmt, context);
            }
          } catch (error) {
            // Handle BREAK signal
            if (error instanceof BreakSignal) {
              return lastValue;
            }
            // Re-throw other errors (CONTINUE is invalid in SWITCH)
            throw error;
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
        throw new RuntimeError(
          `Unknown expression type: ${(expr as any).type}`,
          expr.location
        );
    }
  }
  
  /**
   * Evaluate assignment
   */
  private evaluateAssignment(assignment: Assignment, context: ExecutionContext): void {
    const value = this.evaluateExpression(assignment.value, context);
    setVariable(context, assignment.variable, value);
  }
  
  /**
   * Evaluate variable reference
   */
  private evaluateVariable(varRef: VariableRef, context: ExecutionContext): any {
    if (!hasVariable(context, varRef.name)) {
      throw new UndefinedVariableError(
        varRef.name,
        varRef.location,
        this.getVariableSuggestions(varRef.name, context)
      );
    }
    
    const value = getVariable(context, varRef.name);
    
    if (value === null || value === undefined) {
      throw new RuntimeError(
        `Variable $${varRef.name} is ${value === null ? 'null' : 'undefined'}`,
        varRef.location,
        { variableName: varRef.name, value }
      );
    }
    
    return value;
  }
  
  /**
   * Evaluate attribute reference
   */
  private evaluateAttribute(attrRef: AttributeRef, context: ExecutionContext): any {
    const path = attrRef.path;
    
    if (!hasAttribute(context, path)) {
      throw new UndefinedAttributeError(
        path.join('.'),
        attrRef.location,
        getAvailableAttributes(context)
      );
    }
    
    const value = getAttribute(context, path);
    
    if (value === null || value === undefined) {
      throw new RuntimeError(
        `Attribute #${path.join('.')} is ${value === null ? 'null' : 'undefined'}`,
        attrRef.location,
        { attributePath: path.join('.'), value }
      );
    }
    
    return value;
  }
  
  /**
   * Evaluate binary operation
   */
  private evaluateBinaryOp(op: BinaryOp, context: ExecutionContext): any {
    // Short-circuit evaluation for logical operators
    if (op.operator === 'AND' || op.operator === 'OR') {
      return this.evaluateLogicalOp(op, context);
    }
    
    const left = this.evaluateExpression(op.left, context);
    const right = this.evaluateExpression(op.right, context);
    
    const leftType = inferType(left);
    const rightType = inferType(right);
    
    // Type checking
    if (!areTypesCompatible(leftType, rightType, op.operator)) {
      throw new EvalTypeError(
        `Cannot apply operator ${op.operator} to ${leftType} and ${rightType}`,
        leftType,
        rightType,
        op.location
      );
    }
    
    // Arithmetic operators
    if (op.operator === '+') {
      // String concatenation
      if (leftType === 'string' || rightType === 'string') {
        return String(left) + String(right);
      }
      return Number(left) + Number(right);
    }
    
    if (op.operator === '-') {
      // Special case: date - date produces a time duration
      if (leftType === 'date' && rightType === 'date') {
        const leftDate = left as Date;
        const rightDate = right as Date;
        const milliseconds = leftDate.getTime() - rightDate.getTime();
        return new TimeValue(milliseconds);
      }
      return Number(left) - Number(right);
    }
    
    if (op.operator === '*') {
      return Number(left) * Number(right);
    }
    
    if (op.operator === '/') {
      if (Number(right) === 0) {
        throw new DivisionByZeroError(Number(left), op.location);
      }
      return Number(left) / Number(right);
    }
    
    if (op.operator === '%') {
      if (Number(right) === 0) {
        throw new DivisionByZeroError(Number(left), op.location);
      }
      return Number(left) % Number(right);
    }
    
    if (op.operator === '^') {
      // Exponentiation: left ^ right
      return Math.pow(Number(left), Number(right));
    }
    
    // Comparison operators
    if (op.operator === '=') {
      return left === right;
    }
    
    if (op.operator === '!=') {
      return left !== right;
    }
    
    if (op.operator === '<') {
      return left < right;
    }
    
    if (op.operator === '>') {
      return left > right;
    }
    
    if (op.operator === '<=') {
      return left <= right;
    }
    
    if (op.operator === '>=') {
      return left >= right;
    }
    
    throw new RuntimeError(
      `Unknown binary operator: ${op.operator}`,
      op.location
    );
  }
  
  /**
   * Evaluate logical operation (with short-circuit)
   */
  private evaluateLogicalOp(op: BinaryOp, context: ExecutionContext): boolean {
    const left = this.evaluateExpression(op.left, context);
    
    if (op.operator === 'AND') {
      // Short-circuit: if left is false, don't evaluate right
      if (!left) return false;
      const right = this.evaluateExpression(op.right, context);
      return Boolean(right);
    }
    
    if (op.operator === 'OR') {
      // Short-circuit: if left is true, don't evaluate right
      if (left) return true;
      const right = this.evaluateExpression(op.right, context);
      return Boolean(right);
    }
    
    throw new RuntimeError(
      `Unknown logical operator: ${op.operator}`,
      op.location
    );
  }
  
  /**
   * Evaluate unary operation
   */
  private evaluateUnaryOp(op: UnaryOp, context: ExecutionContext): any {
    const operand = this.evaluateExpression(op.operand, context);
    
    if (op.operator === '-') {
      return -Number(operand);
    }
    
    if (op.operator === 'NOT') {
      return !Boolean(operand);
    }
    
    throw new RuntimeError(
      `Unknown unary operator: ${op.operator}`,
      op.location
    );
  }
  
  /**
   * Evaluate function call
   */
  private evaluateFunctionCall(call: FunctionCall, context: ExecutionContext): any {
    if (!context.functions) {
      throw new RuntimeError(
        'Function registry not available in context',
        call.location
      );
    }
    
    // Evaluate arguments
    const args = call.args.map(arg => this.evaluateExpression(arg, context));
    
    // Execute function
    return context.functions.execute(call.name, args, context, call.location);
  }
  
  /**
   * Evaluate IF expression
   * 
   * BUG FIX: Added better error handling for missing ELSE branch
   * Ensures inline IF-ELSE expressions are properly evaluated
   */
  private evaluateIfExpression(ifExpr: IfExpression, context: ExecutionContext): any {
    const condition = this.evaluateExpression(ifExpr.condition, context);

    if (condition) {
      return this.evaluateExpression(ifExpr.thenBranch, context);
    }

    if (ifExpr.elseIfBranches) {
      for (const elseIf of ifExpr.elseIfBranches) {
        const elseIfCondition = this.evaluateExpression(elseIf.condition, context);
        if (elseIfCondition) {
          return this.evaluateExpression(elseIf.body, context);
        }
      }
    }

    if (ifExpr.elseBranch) {
      return this.evaluateExpression(ifExpr.elseBranch, context);
    }

    // Previously returned null silently, which cascaded into confusing downstream
    // type errors. Surface the real cause instead.
    throw new RuntimeError(
      'IF expression with no matching branch and no ELSE clause',
      ifExpr.location
    );
  }
  
  /**
   * Evaluate object literal: {name: "Alice", age: 30}
   */
  private evaluateObjectLiteral(objectLiteral: ObjectLiteral, context: ExecutionContext): any {
    const obj: Record<string, any> = {};
    
    for (const prop of objectLiteral.properties) {
      obj[prop.key] = this.evaluateExpression(prop.value, context);
    }
    
    return obj;
  }
  
  /**
   * Evaluate property access: $person.name
   */
  private evaluatePropertyAccess(propertyAccess: PropertyAccess, context: ExecutionContext): any {
    // Evaluate the object
    const obj = this.evaluateExpression(propertyAccess.object, context);
    
    // Check if it's an object
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj) || obj instanceof Date || obj instanceof TimeValue) {
      throw new EvalTypeError(
        `Cannot access property '${propertyAccess.property}' on non-object value`,
        propertyAccess.location,
        { actualType: inferType(obj) }
      );
    }
    
    // Check if property exists
    if (!(propertyAccess.property in obj)) {
      const availableProps = Object.keys(obj);
      throw new RuntimeError(
        `Property '${propertyAccess.property}' does not exist on object. Available properties: ${availableProps.join(', ')}`,
        propertyAccess.location,
        { property: propertyAccess.property, availableProperties: availableProps }
      );
    }
    
    return obj[propertyAccess.property];
  }
  
  /**
   * Evaluate index access: $list[0], $arr[-1]
   */
  private evaluateIndexAccess(indexAccess: IndexAccess, context: ExecutionContext): any {
    // Evaluate the object being indexed
    const obj = this.evaluateExpression(indexAccess.object, context);
    
    // Check if it's an array
    if (!Array.isArray(obj)) {
      throw new EvalTypeError(
        `Cannot index non-list value`,
        indexAccess.location,
        { actualType: inferType(obj) }
      );
    }
    
    // Evaluate the index
    const index = this.evaluateExpression(indexAccess.index, context);
    
    // Check if index is a number
    if (typeof index !== 'number') {
      throw new EvalTypeError(
        `List index must be a number`,
        indexAccess.location,
        { actualType: inferType(index) }
      );
    }
    
    // Check if index is an integer
    if (!Number.isInteger(index)) {
      throw new RuntimeError(
        `List index must be an integer, got ${index}`,
        indexAccess.location
      );
    }
    
    // Handle negative indexing
    const actualIndex = index < 0 ? obj.length + index : index;
    
    // Bounds checking
    if (actualIndex < 0 || actualIndex >= obj.length) {
      throw new RuntimeError(
        `List index out of bounds: ${index} (list length: ${obj.length})`,
        indexAccess.location,
        { index, actualIndex, length: obj.length }
      );
    }
    
    return obj[actualIndex];
  }
  
  /**
   * Check resource limits
   */
  private checkResourceLimits(context: ExecutionContext): void {
    this.iterationCount++;
    
    if (context.limits) {
      // Check max iterations
      if (this.iterationCount > context.limits.maxIterations) {
        throw new MaxIterationsError(context.limits.maxIterations);
      }
      
      // Check timeout
      const elapsed = Date.now() - this.startTime;
      if (elapsed > context.limits.timeoutMs) {
        throw new TimeoutError(context.limits.timeoutMs);
      }
    }
  }
  
  /**
   * Get variable name suggestions (for typos)
   */
  private getVariableSuggestions(name: string, context: ExecutionContext): string[] {
    const available = getAvailableVariables(context);
    
    // Simple suggestion: find variables that start with the same letter
    const suggestions = available.filter(v => 
      v.toLowerCase()[0] === name.toLowerCase()[0]
    );
    
    return suggestions.slice(0, 3);
  }
  
  /**
   * Check if two object types have the same shape
   */
  private areObjectShapesEqual(type1: any, type2: any): boolean {
    if (type1.properties.size !== type2.properties.size) {
      return false;
    }
    
    for (const [key, value] of type1.properties) {
      if (!type2.properties.has(key)) {
        return false;
      }
      
      const type2Value = type2.properties.get(key);
      
      // Check if types match (primitive comparison)
      if (typeof value === 'string' && typeof type2Value === 'string') {
        if (value !== type2Value) {
          return false;
        }
      }
    }
    
    return true;
  }
  
  /**
   * Check if two types are equal (supports nested lists and objects)
   */
  private areTypesEqual(type1: any, type2: any): boolean {
    // Primitive types
    if (typeof type1 === 'string' && typeof type2 === 'string') {
      return type1 === type2;
    }
    
    // Both are complex types
    if (typeof type1 === 'object' && typeof type2 === 'object') {
      // List types
      if (type1.kind === 'list' && type2.kind === 'list') {
        return this.areTypesEqual(type1.elementType, type2.elementType);
      }
      
      // Object types
      if (type1.kind === 'object' && type2.kind === 'object') {
        return this.areObjectShapesEqual(type1, type2);
      }
    }
    
    return false;
  }
}