/**
 * AST Node Definitions for Formula & BAL Evaluation Engine
 * 
 * Defines the Abstract Syntax Tree node types used to represent parsed formulas.
 * All AST nodes include location information for error reporting.
 * 
 * @module evaluationEngine/ast/ASTNodes
 */

/**
 * Source location for error reporting
 */
export interface SourceLocation {
  start: { line: number; column: number };
  end: { line: number; column: number };
}

/**
 * Base interface for all AST nodes
 */
export interface ASTNode {
  type: string;
  location?: SourceLocation;
}

// ============================================================================
// Literal Nodes
// ============================================================================

/**
 * Numeric literal: 42, 3.14, -10
 */
export interface NumberLiteral extends ASTNode {
  type: 'NumberLiteral';
  value: number;
}

/**
 * String literal: "hello", 'world'
 */
export interface StringLiteral extends ASTNode {
  type: 'StringLiteral';
  value: string;
}

/**
 * Boolean literal: TRUE, FALSE
 */
export interface BooleanLiteral extends ASTNode {
  type: 'BooleanLiteral';
  value: boolean;
}

/**
 * Null literal: NULL
 */
export interface NullLiteral extends ASTNode {
  type: 'NullLiteral';
  value: null;
}

/**
 * Date literal: "2025-10-25" (ISO 8601 format)
 */
export interface DateLiteral extends ASTNode {
  type: 'DateLiteral';
  value: string; // ISO 8601 format
}

/**
 * List literal: [1, 2, 3], ["a", "b", "c"]
 * All elements must be homogeneous (same type)
 */
export interface ListLiteral extends ASTNode {
  type: 'ListLiteral';
  elements: Expression[];
}

/**
 * Object literal: {name: "Alice", age: 30}
 * All properties defined with key: value pairs
 */
export interface ObjectLiteral extends ASTNode {
  type: 'ObjectLiteral';
  properties: Array<{
    key: string;
    value: Expression;
  }>;
}

// ============================================================================
// Reference Nodes
// ============================================================================

/**
 * Variable reference: $variableName
 */
export interface VariableRef extends ASTNode {
  type: 'VariableRef';
  name: string;
}

/**
 * Attribute reference: #customer.creditScore
 * Path is stored as array: ['customer', 'creditScore']
 */
export interface AttributeRef extends ASTNode {
  type: 'AttributeRef';
  path: string[];
}

// ============================================================================
// Operation Nodes
// ============================================================================

/**
 * Binary operation: $a + $b, $x > 10, $p AND $q
 */
export interface BinaryOp extends ASTNode {
  type: 'BinaryOp';
  operator: BinaryOperator;
  left: Expression;
  right: Expression;
}

export type BinaryOperator =
  // Arithmetic
  | '+' | '-' | '*' | '/' | '%'
  // Comparison
  | '=' | '!=' | '<' | '>' | '<=' | '>='
  // Logical
  | 'AND' | 'OR';

/**
 * Unary operation: -$x, NOT $condition
 */
export interface UnaryOp extends ASTNode {
  type: 'UnaryOp';
  operator: UnaryOperator;
  operand: Expression;
}

export type UnaryOperator = '-' | 'NOT';

/**
 * Function call: ROUND($price, 2), SUM($a, $b, $c)
 */
export interface FunctionCall extends ASTNode {
  type: 'FunctionCall';
  name: string;
  args: Expression[];
}

/**
 * Conditional expression: IF condition THEN expr ELSE expr END
 */
export interface IfExpression extends ASTNode {
  type: 'IfExpression';
  condition: Expression;
  thenBranch: Expression;
  elseIfBranches?: Array<{ condition: Expression; body: Expression }>;
  elseBranch?: Expression;
}

/**
 * Index access: $list[0], $arr[-1]
 * Supports negative indexing (-1 = last element)
 */
export interface IndexAccess extends ASTNode {
  type: 'IndexAccess';
  object: Expression;
  index: Expression;
}

/**
 * Property access: $person.name, $record.amount
 * Accesses a property on an object
 */
export interface PropertyAccess extends ASTNode {
  type: 'PropertyAccess';
  object: Expression;
  property: string;
}

/**
 * Block expression: A sequence of statements that execute in order
 * Used for multi-statement IF branches
 * The value of a block is the value of its last expression
 */
export interface BlockExpression extends ASTNode {
  type: 'BlockExpression';
  statements: Expression[];
}

// ============================================================================
// Statement Nodes
// ============================================================================

/**
 * Variable assignment: $result = $a + $b
 */
export interface Assignment extends ASTNode {
  type: 'Assignment';
  variable: string;
  value: Expression;
}

/**
 * Return statement: RETURN $result (optional, IBM ADS/ODM compatibility)
 */
export interface ReturnStatement extends ASTNode {
  type: 'ReturnStatement';
  value: Expression;
}

/**
 * FOR loop statement: FOR $item IN $list DO ... END
 * Iterates over a list or range expression
 */
export interface ForLoopStatement extends ASTNode {
  type: 'ForLoopStatement';
  iterator: string; // Loop variable name (e.g., "$item")
  iterable: Expression; // List or range to iterate over
  body: Statement[]; // Statements to execute in loop
}

/**
 * WHILE loop statement: WHILE condition DO ... END
 * Executes body while condition is true
 */
export interface WhileLoopStatement extends ASTNode {
  type: 'WhileLoopStatement';
  condition: Expression; // Loop condition
  body: Statement[]; // Statements to execute in loop
}

/**
 * SWITCH statement: SWITCH expr CASE value1 ... CASE value2 ... DEFAULT ... END
 * Multi-way branching based on expression value
 */
export interface SwitchStatement extends ASTNode {
  type: 'SwitchStatement';
  expression: Expression; // Value to match against
  cases: CaseClause[]; // Array of CASE clauses
  defaultCase?: Statement[]; // Optional DEFAULT case
}

/**
 * CASE clause within a SWITCH statement
 */
export interface CaseClause extends ASTNode {
  type: 'CaseClause';
  value: Expression; // Value to match
  body: Statement[]; // Statements to execute if matched
}

/**
 * BREAK statement: Exit current loop
 */
export interface BreakStatement extends ASTNode {
  type: 'BreakStatement';
}

/**
 * CONTINUE statement: Skip to next loop iteration
 */
export interface ContinueStatement extends ASTNode {
  type: 'ContinueStatement';
}

/**
 * Range expression: 1..10, $start..$end
 * Creates a numeric range for iteration
 */
export interface RangeExpression extends ASTNode {
  type: 'RangeExpression';
  start: Expression; // Start value (inclusive)
  end: Expression; // End value (inclusive)
}

/**
 * Program (top-level container)
 */
export interface Program extends ASTNode {
  type: 'Program';
  body: Statement[];
  returnValue?: Expression; // Implicit return (last expression)
}

// ============================================================================
// Union Types
// ============================================================================

/**
 * All literal types
 */
export type Literal =
  | NumberLiteral
  | StringLiteral
  | BooleanLiteral
  | NullLiteral
  | DateLiteral
  | ListLiteral
  | ObjectLiteral;

/**
 * All expression types (can be evaluated to a value)
 */
export type Expression =
  | Literal
  | VariableRef
  | AttributeRef
  | BinaryOp
  | UnaryOp
  | FunctionCall
  | IfExpression
  | BlockExpression
  | IndexAccess
  | PropertyAccess
  | RangeExpression;

/**
 * All statement types
 */
export type Statement =
  | Assignment
  | ReturnStatement
  | ForLoopStatement
  | WhileLoopStatement
  | SwitchStatement
  | BreakStatement
  | ContinueStatement
  | Expression;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Create source location
 */
export function createLocation(
  startLine: number,
  startCol: number,
  endLine: number,
  endCol: number
): SourceLocation {
  return {
    start: { line: startLine, column: startCol },
    end: { line: endLine, column: endCol }
  };
}

/**
 * Type guard to check if node is an expression
 */
export function isExpression(node: ASTNode): node is Expression {
  return [
    'NumberLiteral',
    'StringLiteral',
    'BooleanLiteral',
    'NullLiteral',
    'DateLiteral',
    'ListLiteral',
    'ObjectLiteral',
    'VariableRef',
    'AttributeRef',
    'BinaryOp',
    'UnaryOp',
    'FunctionCall',
    'IfExpression',
    'IndexAccess',
    'PropertyAccess',
    'RangeExpression'
  ].includes(node.type);
}

/**
 * Type guard to check if node is a literal
 */
export function isLiteral(node: ASTNode): node is Literal {
  return [
    'NumberLiteral',
    'StringLiteral',
    'BooleanLiteral',
    'NullLiteral',
    'DateLiteral',
    'ListLiteral',
    'ObjectLiteral'
  ].includes(node.type);
}