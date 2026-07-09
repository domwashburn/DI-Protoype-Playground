/**
 * Formula Parser for Evaluation Engine
 * 
 * Recursive descent parser that converts tokens into an Abstract Syntax Tree (AST).
 * Implements operator precedence and associativity rules.
 * 
 * PARSER MODES - STANDARD vs BAL (Business Action Language)
 * 
 * The parser supports two distinct modes with automatic detection:
 * 
 * STANDARD MODE:
 * - Clean, symbolic syntax aligned with traditional formula languages
 * - Strict parsing rules for predictability
 * - Symbolic operators only: +, -, *, /, ^, =, <, >, etc.
 * - Traditional function calls: SUM($values), COUNT($items)
 * - Required keywords: IF/THEN/END structure
 * - AND/OR are logical operators only
 * 
 * BAL MODE (Superset - IBM Business Action Language):
 * - Full natural language support following IBM BAL/ODM patterns
 * - Accepts BOTH natural language AND standard symbolic syntax
 * - Natural operators: "multiply by", "is greater than", etc.
 * - Natural functions: "the sum of", "the average of", etc.
 * - Flexible keywords: "and" can be separator, "or if" for ELSEIF
 * - Optional END keywords for natural flow
 * - Verbalizations: 'customer name' instead of $customerName
 * - Context-sensitive parsing for ambiguous constructs
 * 
 * MODE DETECTION:
 * - Automatic: Scans for natural language indicators in tokens
 * - If natural language found → BAL mode
 * - Otherwise → STANDARD mode (safe default)
 * - Can be explicitly specified if needed
 */

import { tokenize } from './Tokenizer';
import type { Token, TokenType } from './Tokenizer';
import type {
  Program,
  Statement,
  Expression,
  Assignment,
  ReturnStatement,
  IfExpression,
  BinaryOp,
  UnaryOp,
  FunctionCall,
  VariableRef,
  NumberLiteral,
  StringLiteral,
  BooleanLiteral,
  ListLiteral,
  ObjectLiteral,
  IndexAccess,
  PropertyAccess,
  RangeExpression,
  ForLoopStatement,
  WhileLoopStatement,
  SwitchStatement,
  CaseClause,
  BreakStatement,
  ContinueStatement,
  BinaryOperator,
  UnaryOperator,
  SourceLocation,
  AttributeRef
} from '../ast';
import { resolveVerbalization, type VerbalizationMap } from '../verbalization';

/**
 * Parse Error
 */
export class ParseError extends Error {
  location?: SourceLocation;
  
  constructor(message: string, location?: SourceLocation) {
    super(message);
    this.name = 'ParseError';
    this.location = location;
  }
}

/**
 * Parser Modes
 * 
 * PARSER MODES - STANDARD vs BAL (Business Action Language)
 * 
 * The parser supports two distinct modes with automatic detection:
 * 
 * STANDARD MODE:
 * - Clean, symbolic syntax aligned with traditional formula languages
 * - Strict parsing rules for predictability
 * - Symbolic operators only: +, -, *, /, ^, =, <, >, etc.
 * - Traditional function calls: SUM($values), COUNT($items)
 * - Required keywords: IF/THEN/END structure
 * - AND/OR are logical operators only
 * 
 * BAL MODE (Superset - IBM Business Action Language):
 * - Full natural language support following IBM BAL/ODM patterns
 * - Accepts BOTH natural language AND standard symbolic syntax
 * - Natural operators: "multiply by", "is greater than", etc.
 * - Natural functions: "the sum of", "the average of", etc.
 * - Flexible keywords: "and" can be separator, "or if" for ELSEIF
 * - Optional END keywords for natural flow
 * - Verbalizations: 'customer name' instead of $customerName
 * - Context-sensitive parsing for ambiguous constructs
 * 
 * MODE DETECTION:
 * - Automatic: Scans for natural language indicators in tokens
 * - If natural language found → BAL mode
 * - Otherwise → STANDARD mode (safe default)
 * - Can be explicitly specified if needed
 */
export enum ParserMode {
  STANDARD = 'STANDARD',
  BAL = 'BAL'
}

/**
 * Parse Context
 * 
 * Track what parsing context we're in to handle ambiguous tokens.
 * For example, "IS" can be comparison operator or part of predicate function.
 */
enum ParseContext {
  Statement = 'Statement',
  Expression = 'Expression',
  Comparison = 'Comparison'
}

/**
 * Parser class
 */
export class FormulaParser {
  private tokens: Token[] = [];
  private current: number = 0;
  private verbalizationMap?: VerbalizationMap;
  private context: ParseContext = ParseContext.Statement; // PHASE 5: Context tracking
  private mode: ParserMode = ParserMode.STANDARD; // PHASE 5.11: Parser mode
  
  /**
   * Parse source code into AST
   * 
   * @param source - Source code to parse
   * @param verbalizationMap - Optional map for resolving natural language variable references
   * @param mode - Optional parser mode (STANDARD or BAL). If not specified, mode is auto-detected.
   */
  parse(source: string, verbalizationMap?: VerbalizationMap, mode?: ParserMode): Program {
    this.tokens = tokenize(source);
    this.current = 0;
    this.verbalizationMap = verbalizationMap;
    
    // Auto-detect mode if not explicitly specified
    this.mode = mode ?? this.autoDetectMode(this.tokens);
    
    return this.program();
  }
  
  /**
   * Auto-detect parser mode based on tokens
   * 
   * Scans tokens for natural language indicators.
   * If ANY natural language construct is found, use BAL mode (superset).
   * Otherwise, use STANDARD mode (strict symbolic only).
   * 
   * Natural language indicators:
   * - Natural operators: multiply, divide, plus, minus, etc.
   * - Natural comparisons: is greater than, is less than, etc.
   * - Natural functions: the sum of, the average of, etc.
   * - Verbalizations: 'customer name' instead of $customerName
   * - Natural keywords: OTHERWISE
   * - Natural predicates: is null, starts with, etc.
   * 
   * IBM BAL patterns:
   * - This aligns with IBM Business Action Language (BAL) which supports
   *   natural language constructs alongside traditional operators
   */
  private autoDetectMode(tokens: Token[]): ParserMode {
    for (const token of tokens) {
      // Natural language operators
      if (
        token.type === 'TIMES' ||
        token.type === 'DIVIDED_BY' ||
        token.type === 'PLUS_NL' ||
        token.type === 'MINUS_NL' ||
        token.type === 'POWER_OF' ||
        token.type === 'SQUARED' ||
        token.type === 'CUBED' ||
        token.type === 'MOD_NL'
      ) {
        return ParserMode.BAL;
      }
      
      // Natural language comparisons
      if (
        token.type === 'IS_GREATER_THAN' ||
        token.type === 'IS_LESS_THAN' ||
        token.type === 'IS_GREATER_EQUAL' ||
        token.type === 'IS_LESS_EQUAL' ||
        token.type === 'IS_EQUAL_TO' ||
        token.type === 'IS_NOT_EQUAL_TO'
      ) {
        return ParserMode.BAL;
      }
      
      // Natural language functions
      if (
        token.type === 'THE_SUM_OF' ||
        token.type === 'THE_AVERAGE_OF' ||
        token.type === 'THE_COUNT_OF' ||
        token.type === 'THE_MAXIMUM_OF' ||
        token.type === 'THE_MINIMUM_OF' ||
        token.type === 'THE_TOTAL_OF' ||
        token.type === 'THE_FIRST_ELEMENT_OF' ||
        token.type === 'THE_LAST_ELEMENT_OF' ||
        token.type === 'THE_FIRST_OF' ||
        token.type === 'THE_LAST_OF' ||
        token.type === 'THE_LENGTH_OF' ||
        token.type === 'THE_SIZE_OF' ||
        token.type === 'THE_UPPERCASE_OF' ||
        token.type === 'THE_LOWERCASE_OF' ||
        token.type === 'THE_ABSOLUTE_VALUE_OF' ||
        token.type === 'THE_SQUARE_ROOT_OF' ||
        token.type === 'THE_CEILING_OF' ||
        token.type === 'THE_FLOOR_OF' ||
        token.type === 'THE_ROUND_OF'
      ) {
        return ParserMode.BAL;
      }
      
      // Verbalizations (natural language variable aliases)
      if (token.type === 'VERBALIZATION') {
        return ParserMode.BAL;
      }
      
      // Natural language keywords
      if (token.type === 'OTHERWISE') {
        return ParserMode.BAL;
      }
      
      // Natural language predicates
      if (
        token.type === 'IS_NULL' ||
        token.type === 'IS_NOT_NULL' ||
        token.type === 'IS_EMPTY' ||
        token.type === 'IS_NOT_EMPTY' ||
        token.type === 'STARTS_WITH' ||
        token.type === 'ENDS_WITH' ||
        token.type === 'CONTAINS_OP'
      ) {
        return ParserMode.BAL;
      }
    }
    
    // No natural language indicators found → STANDARD mode
    return ParserMode.STANDARD;
  }
  
  /**
   * Parse program (top-level)
   */
  private program(): Program {
    const body: Statement[] = [];
    const startToken = this.peek();
    
    while (!this.isAtEnd()) {
      // Check for statement keywords
      if (this.check('RETURN')) {
        body.push(this.returnStatement());
      } else if (this.check('FOR')) {
        body.push(this.forLoopStatement());
      } else if (this.check('WHILE')) {
        body.push(this.whileLoopStatement());
      } else if (this.check('SWITCH')) {
        body.push(this.switchStatement());
      } else if (this.check('BREAK')) {
        body.push(this.breakStatement());
      } else if (this.check('CONTINUE')) {
        body.push(this.continueStatement());
      } else if (this.isAssignmentStart()) {
        body.push(this.assignment());
      } else if (this.check('IF')) {
        // IF expression can be a statement
        body.push(this.expression());
      } else {
        // Try to parse as expression
        const expr = this.expression();
        body.push(expr);
        
        // If there's more content, continue parsing
        if (!this.isAtEnd() && !this.check('EOF')) {
          continue;
        }
        break;
      }
    }
    
    // Determine return value (implicit return = last expression)
    let returnValue: Expression | undefined;
    
    if (body.length > 0) {
      const lastStatement = body[body.length - 1];
      
      if (lastStatement.type === 'ReturnStatement') {
        returnValue = (lastStatement as ReturnStatement).value;
      } else if (lastStatement.type !== 'Assignment') {
        // Last statement is an expression
        returnValue = lastStatement as Expression;
      }
    }
    
    return {
      type: 'Program',
      body,
      returnValue,
      location: this.createLocation(startToken)
    };
  }
  
  /**
   * Parse assignment: $var = expression OR 'verbalization' = expression OR set X to expression
   * 
   * Supports multiple syntaxes:
   * 1. $var = expr
   * 2. 'verbalization' = expr  
   * 3. #attr.path = expr
   * 4. set $var to expr
   * 5. set 'verbalization' to expr
   * 6. set #attr.path to expr
   */
  private assignment(): Assignment {
    const startToken = this.peek();
    let variableName: string;
    
    // Check if this is SET...TO syntax
    if (this.match('SET')) {
      // SET syntax: set X to Y
      // X can be: VARIABLE, VERBALIZATION, or ATTRIBUTE
      
      if (this.match('VARIABLE')) {
        variableName = this.previous().value;
      } else if (this.match('VERBALIZATION')) {
        const verbToken = this.previous();
        const verbalization = verbToken.value;
        
        // Resolve verbalization to variable name
        if (!this.verbalizationMap) {
          throw new ParseError(
            `Verbalization '${verbalization}' cannot be resolved - no verbalization map provided`,
            this.createLocation(verbToken)
          );
        }
        
        const resolvedName = resolveVerbalization(verbalization, this.verbalizationMap);
        
        if (!resolvedName) {
          throw new ParseError(
            `Undefined verbalization: '${verbalization}'. No variable with this natural language alias exists.`,
            this.createLocation(verbToken)
          );
        }
        
        variableName = resolvedName;
      } else if (this.match('ATTRIBUTE')) {
        // For attributes, join the path with dots as the variable name
        const attrPath = this.previous().value as string[];
        variableName = attrPath.join('.');
      } else {
        throw new ParseError(
          'Expected variable name, verbalization, or attribute after SET',
          this.createLocation(this.peek())
        );
      }
      
      // Expect TO keyword
      this.consume('TO', 'Expected TO after variable name in SET statement');
      
      // Parse value expression
      const value = this.expression();
      
      return {
        type: 'Assignment',
        variable: variableName,
        value,
        location: this.createLocation(startToken)
      };
    }
    
    // Traditional syntax: X = Y
    // Support VARIABLE, VERBALIZATION, and ATTRIBUTE on left side
    if (this.match('VARIABLE')) {
      variableName = this.previous().value;
    } else if (this.match('VERBALIZATION')) {
      const verbToken = this.previous();
      const verbalization = verbToken.value;
      
      // Resolve verbalization to variable name
      if (!this.verbalizationMap) {
        throw new ParseError(
          `Verbalization '${verbalization}' cannot be resolved - no verbalization map provided`,
          this.createLocation(verbToken)
        );
      }
      
      const resolvedName = resolveVerbalization(verbalization, this.verbalizationMap);
      
      if (!resolvedName) {
        throw new ParseError(
          `Undefined verbalization: '${verbalization}'. No variable with this natural language alias exists.`,
          this.createLocation(verbToken)
        );
      }
      
      variableName = resolvedName;
    } else if (this.match('ATTRIBUTE')) {
      // For attributes, join the path with dots
      const attrPath = this.previous().value as string[];
      variableName = attrPath.join('.');
    } else {
      throw new ParseError(
        'Expected variable name, verbalization, or attribute in assignment',
        this.createLocation(startToken)
      );
    }
    
    this.consume('EQUALS', 'Expected = after variable name');
    const value = this.expression();
    
    return {
      type: 'Assignment',
      variable: variableName,
      value,
      location: this.createLocation(startToken)
    };
  }
  
  /**
   * Parse return statement: RETURN expression
   */
  private returnStatement(): ReturnStatement {
    const startToken = this.advance(); // consume RETURN
    const value = this.expression();
    
    return {
      type: 'ReturnStatement',
      value,
      location: this.createLocation(startToken)
    };
  }
  
  /**
   * Parse expression
   */
  private expression(): Expression {
    return this.logicalOr();
  }
  
  /**
   * Parse logical OR: expr OR expr
   */
  private logicalOr(): Expression {
    let left = this.logicalAnd();
    
    while (this.match('OR')) {
      const operator = 'OR' as BinaryOperator;
      const right = this.logicalAnd();
      
      left = {
        type: 'BinaryOp',
        operator,
        left,
        right,
        location: left.location
      };
    }
    
    return left;
  }
  
  /**
   * Parse logical AND: expr AND expr
   * 
   * PHASE 5.11: Context-sensitive AND handling
   * When parsing IF conditions, AND can be:
   * 1. Logical operator: "if $x > 5 AND $y < 10 then..."
   * 2. IF separator: "if $x > 5 and if $y < 10 then..."
   * 
   * We disambiguate by checking if AND is followed by a statement keyword (IF, FOR, WHILE, etc.)
   * If so, treat it as a separator and don't consume it as a logical operator.
   */
  private logicalAnd(): Expression {
    let left = this.comparison();
    
    while (this.check('AND')) {
      // PHASE 5.11: Check if AND is followed by a statement keyword
      // If so, it's likely a separator (e.g., "if X and if Y"), not a logical operator
      const nextToken = this.peekNext();
      if (nextToken && this.isStatementKeyword(nextToken.type)) {
        // Don't consume AND - let the parent IF parser handle it as a separator
        break;
      }
      
      // Consume AND as logical operator
      this.advance();
      const operator = 'AND' as BinaryOperator;
      const right = this.comparison();
      
      left = {
        type: 'BinaryOp',
        operator,
        left,
        right,
        location: left.location
      };
    }
    
    return left;
  }
  
  /**
   * Parse comparison: expr = expr, expr < expr, etc.
   * 
   * PHASE 5: Enhanced to support natural language comparison operators
   * Supports: is greater than, is less than, is equal to, etc.
   */
  private comparison(): Expression {
    let left = this.range();
    
    // Symbolic comparison operators
    while (this.match('EQUALS', 'NOT_EQUALS', 'LESS', 'GREATER', 'LESS_EQ', 'GREATER_EQ',
                      // PHASE 5: Natural language comparison operators
                      'IS_GREATER_THAN', 'IS_LESS_THAN', 'IS_GREATER_EQUAL', 'IS_LESS_EQUAL',
                      'IS_EQUAL_TO', 'IS_NOT_EQUAL_TO',
                      // Context-sensitive operators
                      'IS')) {
      const op = this.previous();
      const operator = this.tokenTypeToOperator(op.type);
      const right = this.range();
      
      left = {
        type: 'BinaryOp',
        operator,
        left,
        right,
        location: left.location
      };
    }
    
    // PHASE 5: Check for null/empty predicates
    // Pattern: 'value' IS NULL, 'value' IS NOT NULL, 'value' IS EMPTY, etc.
    if (this.match('IS_NULL', 'IS_NOT_NULL', 'IS_EMPTY', 'IS_NOT_EMPTY')) {
      const op = this.previous();
      const functionName = op.type === 'IS_NULL' ? 'IS_NULL' :
                          op.type === 'IS_NOT_NULL' ? 'IS_NOT_NULL' :
                          op.type === 'IS_EMPTY' ? 'IS_EMPTY' : 'IS_NOT_EMPTY';
      
      // Convert to function call
      return {
        type: 'FunctionCall',
        name: functionName,
        args: [left],
        location: left.location
      };
    }
    
    // PHASE 5: Check for string predicates
    // Pattern: 'text' STARTS WITH "prefix", 'text' ENDS WITH "suffix", 'text' CONTAINS "substring"
    if (this.match('STARTS_WITH', 'ENDS_WITH', 'CONTAINS_OP')) {
      const op = this.previous();
      const functionName = op.type === 'STARTS_WITH' ? 'STARTS_WITH' :
                          op.type === 'ENDS_WITH' ? 'ENDS_WITH' : 'CONTAINS';
      const right = this.range();
      
      // Convert to function call: STARTS_WITH(left, right)
      return {
        type: 'FunctionCall',
        name: functionName,
        args: [left, right],
        location: left.location
      };
    }
    
    return left;
  }
  
  /**
   * Parse range: expr..expr (e.g., 1..10, $start..$end)
   */
  private range(): Expression {
    let left = this.additive();
    
    if (this.match('DOTDOT')) {
      const startToken = this.previous();
      const end = this.additive();
      
      return {
        type: 'RangeExpression',
        start: left,
        end,
        location: this.createLocation(startToken)
      };
    }
    
    return left;
  }
  
  /**
   * Parse additive: expr + expr, expr - expr
   * 
   * PHASE 5: Enhanced to support natural language operators (plus, minus, less)
   * PHASE 5.8: Enhanced to support "add X to Y" and "subtract X from Y" patterns
   */
  private additive(): Expression {
    let left = this.multiplicative();
    
    while (this.match('PLUS', 'MINUS', 'PLUS_NL', 'MINUS_NL')) {
      const op = this.previous();
      const operator = (op.type === 'PLUS' || op.type === 'PLUS_NL') ? '+' : '-';
      
      // PHASE 5.8: Handle "add X to Y" and "subtract X from Y" patterns
      const right = this.multiplicative();
      
      // After parsing right operand, check for connecting word (to, from)
      // For "add X to Y", tokenizer produces: PLUS_NL X TO Y
      // We already consumed PLUS_NL, so now we need to check for TO/FROM and parse Y
      if (op.type === 'PLUS_NL' || op.type === 'MINUS_NL') {
        // Check for optional connecting word (to, from)
        if (this.match('TO', 'FROM')) {
          // We have "add X to Y" or "subtract X from Y" pattern
          // X is already in `right`, now parse Y
          const actualRight = this.multiplicative();
          
          left = {
            type: 'BinaryOp',
            operator,
            left: right,  // X becomes left operand
            right: actualRight,  // Y becomes right operand
            location: left.location
          };
          
          continue; // Skip the normal left assignment below
        }
      }
      
      // Normal pattern: left OPERATOR right
      left = {
        type: 'BinaryOp',
        operator,
        left,
        right,
        location: left.location
      };
    }
    
    return left;
  }
  
  /**
   * Parse multiplicative: expr * expr, expr / expr, expr % expr
   * 
   * PHASE 5: Enhanced to support natural language operators (times, divided by, mod)
   * PHASE 5.8: Enhanced to support "multiply X by Y" and "divide X by Y" patterns
   */
  private multiplicative(): Expression {
    let left = this.power();
    
    while (this.match('STAR', 'SLASH', 'PERCENT', 'TIMES', 'DIVIDED_BY', 'MOD_NL')) {
      const op = this.previous();
      
      // Determine the operator
      const operator = 
        (op.type === 'STAR' || op.type === 'TIMES') ? '*' :
        (op.type === 'SLASH' || op.type === 'DIVIDED_BY') ? '/' :
        '%'; // PERCENT or MOD_NL
      
      // PHASE 5.8: Handle "multiply X by Y" pattern
      // When we see TIMES or DIVIDED_BY, check if there's an optional BY/FROM/TO after the right operand
      const right = this.power();
      
      // After parsing right operand, check for connecting word (by, from, to)
      // For "multiply X by Y", tokenizer produces: TIMES X BY Y
      // We already consumed TIMES, so now we need to check for BY and parse Y
      if (op.type === 'TIMES' || op.type === 'DIVIDED_BY') {
        // Check for optional connecting word (by, from, to)
        if (this.match('BY', 'FROM', 'TO')) {
          // We have "multiply X by Y" pattern
          // X is already in `right`, now parse Y
          const actualRight = this.power();
          
          left = {
            type: 'BinaryOp',
            operator,
            left: right,  // X becomes left operand
            right: actualRight,  // Y becomes right operand
            location: left.location
          };
          
          continue; // Skip the normal left assignment below
        }
      }
      
      // Normal pattern: left OPERATOR right
      left = {
        type: 'BinaryOp',
        operator,
        left,
        right,
        location: left.location
      };
    }
    
    return left;
  }
  
  /**
   * Parse power: expr ^ expr, expr SQUARED, expr CUBED, expr TO THE POWER OF expr
   * 
   * PHASE 5: New precedence level for exponentiation
   * Handles: ^, squared, cubed, to the power of
   */
  private power(): Expression {
    let left = this.unary();
    
    // Check for power operators
    if (this.match('POWER')) {
      // Symbolic: expr ^ expr
      const right = this.power(); // Right-associative
      
      return {
        type: 'BinaryOp',
        operator: '^',
        left,
        right,
        location: left.location
      };
    }
    
    if (this.match('POWER_OF')) {
      // Natural language: expr to the power of expr
      const right = this.power(); // Right-associative
      
      return {
        type: 'BinaryOp',
        operator: '^',
        left,
        right,
        location: left.location
      };
    }
    
    if (this.match('SQUARED')) {
      // Postfix: expr squared → expr ^ 2
      return {
        type: 'BinaryOp',
        operator: '^',
        left,
        right: {
          type: 'NumberLiteral',
          value: 2,
          location: left.location
        },
        location: left.location
      };
    }
    
    if (this.match('CUBED')) {
      // Postfix: expr cubed → expr ^ 3
      return {
        type: 'BinaryOp',
        operator: '^',
        left,
        right: {
          type: 'NumberLiteral',
          value: 3,
          location: left.location
        },
        location: left.location
      };
    }
    
    return left;
  }
  
  /**
   * Parse unary: -expr, NOT expr
   */
  private unary(): Expression {
    if (this.match('MINUS', 'NOT')) {
      const op = this.previous();
      const operator = (op.type === 'MINUS' ? '-' : 'NOT') as UnaryOperator;
      const operand = this.unary();
      
      return {
        type: 'UnaryOp',
        operator,
        operand,
        location: this.createLocation(op)
      };
    }
    
    return this.postfix();
  }
  
  /**
   * Parse postfix: expr[index] or expr.property
   * Supports chaining: expr[0].property or expr.property[0]
   */
  private postfix(): Expression {
    let expr = this.primary();
    
    while (true) {
      if (this.match('LBRACKET')) {
        // Index access: expr[index]
        const index = this.expression();
        this.consume('RBRACKET', 'Expected ] after index');
        
        expr = {
          type: 'IndexAccess',
          object: expr,
          index,
          location: expr.location
        };
      } else if (this.match('DOT')) {
        // Property access: expr.property
        const propertyToken = this.consume('IDENTIFIER', 'Expected property name after .');
        
        expr = {
          type: 'PropertyAccess',
          object: expr,
          property: propertyToken.value,
          location: expr.location
        };
      } else {
        break;
      }
    }
    
    return expr;
  }
  
  /**
   * Parse primary expressions
   */
  private primary(): Expression {
    const token = this.peek();
    
    // Numbers
    if (this.match('NUMBER')) {
      return {
        type: 'NumberLiteral',
        value: this.previous().value,
        location: this.createLocation(this.previous())
      };
    }
    
    // Strings
    if (this.match('STRING')) {
      return {
        type: 'StringLiteral',
        value: this.previous().value,
        location: this.createLocation(this.previous())
      };
    }
    
    // Template literals (backticks) - convert to concatenation
    if (this.match('TEMPLATE_LITERAL')) {
      return this.parseTemplateLiteral(this.previous());
    }
    
    // Booleans
    if (this.match('TRUE')) {
      return {
        type: 'BooleanLiteral',
        value: true,
        location: this.createLocation(this.previous())
      };
    }
    
    if (this.match('FALSE')) {
      return {
        type: 'BooleanLiteral',
        value: false,
        location: this.createLocation(this.previous())
      };
    }
    
    // NULL literal
    if (this.match('NULL')) {
      return {
        type: 'NullLiteral',
        value: null,
        location: this.createLocation(this.previous())
      };
    }
    
    // Variables
    if (this.match('VARIABLE')) {
      return {
        type: 'VariableRef',
        name: this.previous().value,
        location: this.createLocation(this.previous())
      };
    }
    
    // Attributes
    if (this.match('ATTRIBUTE')) {
      return {
        type: 'AttributeRef',
        path: this.previous().value,
        location: this.createLocation(this.previous())
      };
    }
    
    // Verbalizations - natural language variable references ('customer name')
    if (this.match('VERBALIZATION')) {
      const verbToken = this.previous();
      const verbalization = verbToken.value;
      
      // Resolve verbalization to variable name
      if (!this.verbalizationMap) {
        throw new ParseError(
          `Verbalization '${verbalization}' cannot be resolved - no verbalization map provided`,
          this.createLocation(verbToken)
        );
      }
      
      const resolvedName = resolveVerbalization(verbalization, this.verbalizationMap);
      
      if (!resolvedName) {
        throw new ParseError(
          `Undefined verbalization: '${verbalization}'. No variable with this natural language alias exists.`,
          this.createLocation(verbToken)
        );
      }
      
      // Return as VariableRef with resolved name
      return {
        type: 'VariableRef',
        name: resolvedName,
        location: this.createLocation(verbToken)
      };
    }
    
    // PHASE 5.2.1: Natural language functions
    if (this.isNaturalLanguageFunction()) {
      return this.naturalLanguageFunction();
    }
    
    // Function calls
    if (this.check('IDENTIFIER')) {
      return this.functionCall();
    }
    
    // IF expressions
    if (this.check('IF')) {
      return this.ifExpression();
    }
    
    // Parenthesized expressions
    if (this.match('LPAREN')) {
      const expr = this.expression();
      this.consume('RPAREN', 'Expected ) after expression');
      return expr;
    }
    
    // List literals
    if (this.match('LBRACKET')) {
      return this.listLiteral();
    }
    
    // Object literals
    if (this.match('LBRACE')) {
      return this.objectLiteral();
    }
    
    // PHASE 5.8: Natural language operators in prefix position
    // Handle patterns like "multiply X by Y", "add X to Y", "divide X by Y", "subtract X from Y"
    if (this.match('TIMES', 'DIVIDED_BY', 'PLUS_NL', 'MINUS_NL')) {
      const opToken = this.previous();
      
      // Parse left operand (skip optional articles like "the")
      this.match('THE', 'A', 'AN'); // Optional articles
      const left = this.unary(); // Use unary() to allow for full expressions
      
      // Expect connecting word: by, to, from
      let expectedConnector: string;
      if (opToken.type === 'TIMES') {
        expectedConnector = 'BY';
      } else if (opToken.type === 'DIVIDED_BY') {
        expectedConnector = 'BY';
      } else if (opToken.type === 'PLUS_NL') {
        expectedConnector = 'TO';
      } else { // MINUS_NL
        expectedConnector = 'FROM';
      }
      
      this.consume(expectedConnector as TokenType, `Expected ${expectedConnector.toLowerCase()} after operand`);
      
      // Parse right operand (skip optional articles)
      this.match('THE', 'A', 'AN'); // Optional articles
      const right = this.unary(); // Use unary() to allow for full expressions
      
      // Determine operator symbol
      const operator = 
        opToken.type === 'TIMES' ? '*' :
        opToken.type === 'DIVIDED_BY' ? '/' :
        opToken.type === 'PLUS_NL' ? '+' :
        '-'; // MINUS_NL
      
      return {
        type: 'BinaryOp',
        operator: operator as BinaryOperator,
        left,
        right,
        location: this.createLocation(opToken)
      };
    }
    
    throw new ParseError(
      `Unexpected token: ${token.type}`,
      this.createLocation(token)
    );
  }
  
  /**
   * Parse list literal: [1, 2, 3] or ["a", "b", "c"]
   */
  private listLiteral(): ListLiteral {
    const startToken = this.previous(); // LBRACKET
    const elements: Expression[] = [];
    
    // Parse elements
    if (!this.check('RBRACKET')) {
      do {
        elements.push(this.expression());
      } while (this.match('COMMA'));
    }
    
    this.consume('RBRACKET', 'Expected ] after list elements');
    
    return {
      type: 'ListLiteral',
      elements,
      location: this.createLocation(startToken)
    };
  }
  
  /**
   * Parse object literal: {name: "Alice", age: 30}
   */
  private objectLiteral(): ObjectLiteral {
    const startToken = this.previous(); // LBRACE
    const properties: Array<{ key: string; value: Expression }> = [];
    
    // Parse properties
    if (!this.check('RBRACE')) {
      do {
        // Parse key (must be identifier)
        const keyToken = this.consume('IDENTIFIER', 'Expected property name');
        const key = keyToken.value;
        
        // Expect colon
        this.consume('COLON', 'Expected : after property name');
        
        // Parse value
        const value = this.expression();
        
        properties.push({ key, value });
      } while (this.match('COMMA'));
    }
    
    this.consume('RBRACE', 'Expected } after object properties');
    
    return {
      type: 'ObjectLiteral',
      properties,
      location: this.createLocation(startToken)
    };
  }
  
  /**
   * Parse function call: FUNC(arg1, arg2, ...)
   */
  private functionCall(): FunctionCall {
    const nameToken = this.advance();
    const name = nameToken.value;
    
    this.consume('LPAREN', 'Expected ( after function name');
    
    const args: Expression[] = [];
    
    if (!this.check('RPAREN')) {
      do {
        args.push(this.expression());
      } while (this.match('COMMA'));
    }
    
    this.consume('RPAREN', 'Expected ) after function arguments');
    
    return {
      type: 'FunctionCall',
      name,
      args,
      location: this.createLocation(nameToken)
    };
  }
  
  /**
   * Parse IF expression
   * 
   * PHASE 5.9: Enhanced to support "and" as alternative to "then" for more natural flow
   * Both patterns are supported:
   *   - if <condition> then <body>
   *   - if <condition> and <body>
   * 
   * PHASE 5.10: Make END optional for natural language flow (BAL mode only)
   * In STANDARD mode, END is always required
   * In BAL mode, END is only required if there's more code after the IF at the same level
   * At EOF or end of a block, END can be omitted in BAL mode
   * 
   * PHASE 5.12: Fixed inline IF-ELSE parsing
   * Inline IF-ELSE (single line, no END keyword ahead) now parses single expressions per branch
   * Block IF-ELSE (multi-line with END) parses statement blocks per branch
   */
  private ifExpression(): IfExpression {
    const startToken = this.advance(); // consume IF
    
    const condition = this.expression();
    
    // Accept either THEN or AND as connector after condition
    // "and" provides more natural flow: "if X and [do this]"
    if (!this.match('THEN') && !this.match('AND')) {
      throw new ParseError(
        'Expected THEN or AND after IF condition',
        this.createLocation(this.peek())
      );
    }
    
    // Detect if this is an inline IF (single line) or block IF (multi-line with END)
    // Inline IF: "if X then Y else Z" (all on same line, no END keyword)
    // Block IF: "if X then\n  Y\n  Z\nelse\n  A\nend" (multi-line with END)
    //
    // We look ahead to see if there's an ELSE/ELSEIF/OTHERWISE before we'd hit END or EOF
    const isInlineIF = this.lookaheadForInlineIfPattern();
    
    console.log('🔍 PARSER: IF statement is', isInlineIF ? 'INLINE' : 'BLOCK');
    
    // DEBUG: Log before parsing THEN branch
    console.log('🔍 PARSER: About to parse THEN branch. Current token:', this.peek().type, this.peek().value);
    
    // Parse THEN branch
    // For inline IF, parse single statement/expression. For block IF, parse statement block
    const thenBranch = isInlineIF ? this.parseInlineBranch() : this.parseStatementBlock();
    
    // DEBUG: Log after parsing THEN branch
    console.log('🔍 PARSER: Finished THEN branch. Current token:', this.peek().type, this.peek().value);
    
    const elseIfBranches: Array<{ condition: Expression; body: Expression }> = [];
    
    // Handle ELSIF, ELSEIF, or ELSE IF (two tokens)
    while (this.matchElseIf()) {
      const elseIfCondition = this.expression();
      
      // Also allow AND for ELSEIF conditions
      if (!this.match('THEN') && !this.match('AND')) {
        throw new ParseError(
          'Expected THEN or AND after ELSEIF condition',
          this.createLocation(this.peek())
        );
      }
      
      const elseIfBody = isInlineIF ? this.parseInlineBranch() : this.parseStatementBlock();
      elseIfBranches.push({ condition: elseIfCondition, body: elseIfBody });
    }
    
    let elseBranch: Expression | undefined;
    
    // DEBUG: Log before checking for ELSE
    console.log('🔍 PARSER: Checking for ELSE. Current token:', this.peek().type, this.peek().value);
    
    if (this.match('ELSE') || this.match('OTHERWISE')) {
      console.log('🔍 PARSER: Found ELSE! Parsing ELSE branch...');
      elseBranch = isInlineIF ? this.parseInlineBranch() : this.parseStatementBlock();
      console.log('🔍 PARSER: Finished ELSE branch. elseBranch:', elseBranch);
    } else {
      console.log('🔍 PARSER: No ELSE found. elseBranch will be undefined.');
    }
    
    // PHASE 5.10: Make END optional for natural language flow (BAL mode only)
    // In STANDARD mode, END is always required
    // In BAL mode, END is only required if there's more code after the IF at the same level
    // At EOF or end of a block, END can be omitted in BAL mode
    
    if (this.mode === ParserMode.STANDARD) {
      // STANDARD mode: END is always required
      this.consume('END', 'Expected END after IF expression');
    } else {
      // BAL mode: END is optional at end of program or block
      if (this.check('END')) {
        this.advance(); // consume END if present
      } else if (!this.isAtEnd() && !this.isIfBlockTerminator()) {
        // END is required only if we're not at EOF and not at a genuine IF block terminator
        // (ELSE, ELSEIF, statement keywords, but NOT END itself)
        throw new ParseError(
          'Expected END after IF expression (or END is implicit at end of program)',
          this.createLocation(this.peek())
        );
      }
    }
    
    return {
      type: 'IfExpression',
      condition,
      thenBranch,
      elseIfBranches: elseIfBranches.length > 0 ? elseIfBranches : undefined,
      elseBranch,
      location: this.createLocation(startToken)
    };
  }
  
  /**
   * Parse a block of statements until we hit ELSE, ELSEIF, or END
   * Returns a BlockExpression if multiple statements, or a single expression if only one
   * 
   * PHASE 5.10: Enhanced to recognize "or if" as a block terminator
   */
  private parseStatementBlock(): Expression {
    const statements: Expression[] = [];
    const startToken = this.peek();
    
    console.log('🔍 PARSER: parseStatementBlock() starting. Current token:', this.peek().type, this.peek().value);
    
    // Parse statements until we hit a block terminator
    while (!this.isAtEnd() && !this.isBlockTerminator()) {
      console.log('🔍 PARSER: parseStatementBlock() loop iteration. Current token:', this.peek().type, this.peek().value);
      
      // Check if it's an assignment
      if (this.isAssignmentStart()) {
        statements.push(this.assignment() as any);
      } else if (this.check('RETURN')) {
        statements.push(this.returnStatement());
      } else if (this.check('BREAK')) {
        statements.push(this.breakStatement() as any);
      } else if (this.check('CONTINUE')) {
        statements.push(this.continueStatement() as any);
      } else if (this.check('FOR')) {
        statements.push(this.forLoopStatement() as any);
      } else if (this.check('WHILE')) {
        statements.push(this.whileLoopStatement() as any);
      } else if (this.check('SWITCH')) {
        statements.push(this.switchStatement() as any);
      } else if (this.check('IF')) {
        // Nested IF expression
        statements.push(this.expression());
      } else {
        // Before trying to parse as expression, double-check we're not at a block terminator
        // This can happen if isBlockTerminator() didn't catch it in the while condition
        if (this.isBlockTerminator()) {
          break;
        }
        
        // Regular expression
        statements.push(this.expression());
      }
      
      // Re-check if we've hit a block terminator after parsing statement
      if (this.isBlockTerminator()) {
        break;
      }
    }
    
    // If only one statement, return it directly
    if (statements.length === 1) {
      return statements[0];
    }
    
    // Otherwise, wrap in a BlockExpression
    return {
      type: 'BlockExpression',
      statements,
      location: this.createLocation(startToken)
    };
  }
  
  /**
   * Match ELSIF, ELSEIF, or ELSE IF (special handling for two-token variant)
   * Returns true if matched and consumed the token(s)
   * 
   * PHASE 5.10: Enhanced to support "or if" as natural alternative to "else if"
   * Supports: ELSEIF, ELSIF, ELSE IF, OR IF
   */
  private matchElseIf(): boolean {
    // Check for ELSEIF (single token - covers both ELSIF and ELSEIF keywords)
    if (this.check('ELSEIF')) {
      this.advance();
      return true;
    }
    
    // Check for ELSE IF (two tokens)
    if (this.check('ELSE') && this.peekNext()?.type === 'IF') {
      this.advance(); // consume ELSE
      this.advance(); // consume IF
      return true;
    }
    
    // PHASE 5.10: Check for OR IF (natural alternative)
    // "or if" reads naturally: "if X then Y or if Z then W"
    if (this.check('OR') && this.peekNext()?.type === 'IF') {
      this.advance(); // consume OR
      this.advance(); // consume IF
      return true;
    }
    
    return false;
  }
  
  /**
   * Parse FOR loop: FOR $item IN iterable DO ... END
   */
  private forLoopStatement(): ForLoopStatement {
    const startToken = this.advance(); // consume FOR
    
    const iteratorToken = this.consume('VARIABLE', 'Expected variable after FOR');
    const iterator = iteratorToken.value;
    
    this.consume('IN', 'Expected IN after loop variable');
    
    const iterable = this.expression(); // Can be list or range
    
    this.consume('DO', 'Expected DO after iterable expression');
    
    // Parse loop body
    const body: Statement[] = [];
    while (!this.isAtEnd() && !this.check('END')) {
      if (this.check('RETURN')) {
        body.push(this.returnStatement());
      } else if (this.check('FOR')) {
        body.push(this.forLoopStatement());
      } else if (this.check('WHILE')) {
        body.push(this.whileLoopStatement());
      } else if (this.check('SWITCH')) {
        body.push(this.switchStatement());
      } else if (this.check('BREAK')) {
        body.push(this.breakStatement());
      } else if (this.check('CONTINUE')) {
        body.push(this.continueStatement());
      } else if (this.isAssignmentStart()) {
        body.push(this.assignment());
      } else if (this.check('IF')) {
        body.push(this.expression());
      } else {
        // Before parsing as expression, verify we're not at END
        // This can happen after nested statements consume their ENDs
        if (this.check('END')) {
          break;
        }
        body.push(this.expression());
      }
    }
    
    this.consume('END', 'Expected END after FOR loop body');
    
    return {
      type: 'ForLoopStatement',
      iterator,
      iterable,
      body,
      location: this.createLocation(startToken)
    };
  }
  
  /**
   * Parse WHILE loop: WHILE condition DO ... END
   */
  private whileLoopStatement(): WhileLoopStatement {
    const startToken = this.advance(); // consume WHILE
    
    const condition = this.expression();
    
    this.consume('DO', 'Expected DO after WHILE condition');
    
    // Parse loop body
    const body: Statement[] = [];
    while (!this.isAtEnd() && !this.check('END')) {
      if (this.check('RETURN')) {
        body.push(this.returnStatement());
      } else if (this.check('FOR')) {
        body.push(this.forLoopStatement());
      } else if (this.check('WHILE')) {
        body.push(this.whileLoopStatement());
      } else if (this.check('SWITCH')) {
        body.push(this.switchStatement());
      } else if (this.check('BREAK')) {
        body.push(this.breakStatement());
      } else if (this.check('CONTINUE')) {
        body.push(this.continueStatement());
      } else if (this.isAssignmentStart()) {
        body.push(this.assignment());
      } else if (this.check('IF')) {
        body.push(this.expression());
      } else {
        // Before parsing as expression, verify we're not at END
        // This can happen after nested statements consume their ENDs
        if (this.check('END')) {
          break;
        }
        body.push(this.expression());
      }
    }
    
    this.consume('END', 'Expected END after WHILE loop body');
    
    return {
      type: 'WhileLoopStatement',
      condition,
      body,
      location: this.createLocation(startToken)
    };
  }
  
  /**
   * Parse SWITCH statement: SWITCH expr CASE value1 ... CASE value2 ... DEFAULT ... END
   */
  private switchStatement(): SwitchStatement {
    const startToken = this.advance(); // consume SWITCH
    
    const expression = this.expression();
    
    const cases: CaseClause[] = [];
    let defaultCase: Statement[] | undefined;
    
    // Parse CASE clauses
    while (this.match('CASE')) {
      const caseStart = this.previous();
      const value = this.expression();
      
      // Parse case body (statements until next CASE, DEFAULT, or END)
      const body: Statement[] = [];
      while (!this.isAtEnd() && !this.check('CASE') && !this.check('DEFAULT') && !this.check('END')) {
        if (this.check('RETURN')) {
          body.push(this.returnStatement());
        } else if (this.check('FOR')) {
          body.push(this.forLoopStatement());
        } else if (this.check('WHILE')) {
          body.push(this.whileLoopStatement());
        } else if (this.check('SWITCH')) {
          body.push(this.switchStatement());
        } else if (this.check('BREAK')) {
          body.push(this.breakStatement());
        } else if (this.check('CONTINUE')) {
          body.push(this.continueStatement());
        } else if (this.isAssignmentStart()) {
          body.push(this.assignment());
        } else if (this.check('IF')) {
          body.push(this.expression());
        } else {
          body.push(this.expression());
        }
      }
      
      cases.push({
        type: 'CaseClause',
        value,
        body,
        location: this.createLocation(caseStart)
      });
    }
    
    // Parse optional DEFAULT case
    if (this.match('DEFAULT')) {
      defaultCase = [];
      while (!this.isAtEnd() && !this.check('END')) {
        if (this.check('RETURN')) {
          defaultCase.push(this.returnStatement());
        } else if (this.check('FOR')) {
          defaultCase.push(this.forLoopStatement());
        } else if (this.check('WHILE')) {
          defaultCase.push(this.whileLoopStatement());
        } else if (this.check('SWITCH')) {
          defaultCase.push(this.switchStatement());
        } else if (this.check('BREAK')) {
          defaultCase.push(this.breakStatement());
        } else if (this.check('CONTINUE')) {
          defaultCase.push(this.continueStatement());
        } else if (this.isAssignmentStart()) {
          defaultCase.push(this.assignment());
        } else if (this.check('IF')) {
          defaultCase.push(this.expression());
        } else {
          defaultCase.push(this.expression());
        }
      }
    }
    
    this.consume('END', 'Expected END after SWITCH statement');
    
    return {
      type: 'SwitchStatement',
      expression,
      cases,
      defaultCase,
      location: this.createLocation(startToken)
    };
  }
  
  /**
   * Parse BREAK statement
   */
  private breakStatement(): BreakStatement {
    const startToken = this.advance(); // consume BREAK
    
    return {
      type: 'BreakStatement',
      location: this.createLocation(startToken)
    };
  }
  
  /**
   * Parse CONTINUE statement
   */
  private continueStatement(): ContinueStatement {
    const startToken = this.advance(); // consume CONTINUE
    
    return {
      type: 'ContinueStatement',
      location: this.createLocation(startToken)
    };
  }
  
  /**
   * Parse template literal and convert to concatenation expression
   * 
   * Template literals use backticks and automatically interpolate verbalizations and variables.
   * Example: `'item count' items ('first item' to 'last item') = $'final price'`
   * 
   * Converts to: 'item count' + " items (" + 'first item' + " to " + 'last item' + ") = $" + 'final price'
   * 
   * PHASE 6: Cleaner interpolation syntax
   */
  private parseTemplateLiteral(token: Token): Expression {
    const parts = token.value as Array<{ type: 'text' | 'verbalization' | 'variable', value: string }>;
    
    if (parts.length === 0) {
      // Empty template literal → empty string
      return {
        type: 'StringLiteral',
        value: '',
        location: this.createLocation(token)
      };
    }
    
    if (parts.length === 1 && parts[0].type === 'text') {
      // Simple case: just text, no interpolation
      return {
        type: 'StringLiteral',
        value: parts[0].value,
        location: this.createLocation(token)
      };
    }
    
    // Build concatenation expression (left-associative)
    let result: Expression | null = null;
    
    for (const part of parts) {
      let partExpr: Expression;
      
      if (part.type === 'text') {
        // Literal text → StringLiteral
        partExpr = {
          type: 'StringLiteral',
          value: part.value,
          location: this.createLocation(token)
        };
      } else if (part.type === 'verbalization') {
        // Verbalization → VariableRef (resolved via verbalization map)
        const varName = resolveVerbalization(part.value, this.verbalizationMap);
        partExpr = {
          type: 'VariableRef',
          name: varName,
          location: this.createLocation(token)
        };
      } else {
        // Variable → VariableRef
        partExpr = {
          type: 'VariableRef',
          name: part.value,
          location: this.createLocation(token)
        };
      }
      
      // Concatenate with previous result using '+'
      if (result === null) {
        result = partExpr;
      } else {
        result = {
          type: 'BinaryOp',
          operator: '+',
          left: result,
          right: partExpr,
          location: this.createLocation(token)
        };
      }
    }
    
    return result!;
  }
  
  /**
   * Convert token type to operator
   * 
   * PHASE 5: Enhanced to support natural language comparison operators
   */
  private tokenTypeToOperator(type: TokenType): BinaryOperator {
    switch (type) {
      // Symbolic operators
      case 'EQUALS': return '=';
      case 'NOT_EQUALS': return '!=';
      case 'LESS': return '<';
      case 'GREATER': return '>';
      case 'LESS_EQ': return '<=';
      case 'GREATER_EQ': return '>=';
      
      // PHASE 5: Natural language comparison operators
      case 'IS': return '=';  // Context-sensitive: equality in comparisons
      case 'IS_EQUAL_TO': return '=';
      case 'IS_NOT_EQUAL_TO': return '!=';
      case 'IS_LESS_THAN': return '<';
      case 'IS_GREATER_THAN': return '>';
      case 'IS_LESS_EQUAL': return '<=';
      case 'IS_GREATER_EQUAL': return '>=';
      
      default: throw new Error(`Not a comparison operator: ${type}`);
    }
  }
  
  /**
   * Match and consume tokens
   */
  private match(...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }
  
  /**
   * Check if current token matches type
   */
  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }
  
  /**
   * Check if current position is the start of an assignment statement
   * Supports:
   * - $var = expr
   * - 'verbalization' = expr
   * - set $var to expr
   * - set 'verbalization' to expr
   * - set #attr.path to expr
   */
  private isAssignmentStart(): boolean {
    const current = this.peek();
    const next = this.peekNext();
    
    // Pattern 1: SET keyword (set X to Y)
    if (current.type === 'SET') {
      return true;
    }
    
    // Pattern 2: VARIABLE/VERBALIZATION/ATTRIBUTE followed by EQUALS
    // This handles: $var = expr, 'verbalization' = expr, #attr = expr
    return (
      (current.type === 'VARIABLE' || current.type === 'VERBALIZATION' || current.type === 'ATTRIBUTE') &&
      next?.type === 'EQUALS'
    );
  }
  
  /**
   * Advance to next token
   */
  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }
  
  /**
   * Check if at end of tokens
   */
  private isAtEnd(): boolean {
    return this.peek().type === 'EOF';
  }
  
  /**
   * Peek at current token
   */
  private peek(): Token {
    return this.tokens[this.current];
  }
  
  /**
   * Peek at next token
   */
  private peekNext(): Token | undefined {
    if (this.current + 1 < this.tokens.length) {
      return this.tokens[this.current + 1];
    }
    return undefined;
  }
  
  /**
   * Get previous token
   */
  private previous(): Token {
    return this.tokens[this.current - 1];
  }
  
  /**
   * Consume expected token type
   */
  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) return this.advance();
    
    throw new ParseError(
      message,
      this.createLocation(this.peek())
    );
  }
  
  /**
   * Create source location from token
   */
  private createLocation(token: Token): SourceLocation {
    return {
      start: { line: token.line, column: token.column },
      end: { line: token.line, column: token.column }
    };
  }
  
  /**
   * Check if current token is a natural language function
   * 
   * PHASE 5.2.1: Natural language functions
   */
  private isNaturalLanguageFunction(): boolean {
    const type = this.peek().type;
    return (
      type === 'THE_SUM_OF' ||
      type === 'THE_AVERAGE_OF' ||
      type === 'THE_COUNT_OF' ||
      type === 'THE_MAXIMUM_OF' ||
      type === 'THE_MINIMUM_OF' ||
      type === 'THE_TOTAL_OF' ||
      type === 'THE_FIRST_ELEMENT_OF' ||
      type === 'THE_LAST_ELEMENT_OF' ||
      type === 'THE_FIRST_OF' ||
      type === 'THE_LAST_OF' ||
      type === 'THE_LENGTH_OF' ||
      type === 'THE_SIZE_OF' ||
      type === 'THE_UPPERCASE_OF' ||
      type === 'THE_LOWERCASE_OF' ||
      type === 'THE_ABSOLUTE_VALUE_OF' ||
      type === 'THE_SQUARE_ROOT_OF' ||
      type === 'THE_CEILING_OF' ||
      type === 'THE_FLOOR_OF' ||
      type === 'THE_ROUND_OF'
    );
  }
  
  /**
   * Parse natural language function
   * 
   * PHASE 5.2.1: Natural language functions like "the sum of", "the average of", etc.
   * 
   * Pattern: "the [FUNCTION] of [arguments]"
   * Arguments can be comma-separated and/or "and"-separated
   */
  private naturalLanguageFunction(): FunctionCall {
    const funcToken = this.advance(); // consume function token
    
    // Map token type to function name
    const functionName = this.nlFunctionTokenToName(funcToken.type);
    
    // Parse arguments
    // Arguments can be:
    // 1. Single expression: the count of 'items'
    // 2. Comma-separated: the sum of 'x', 'y', 'z'
    // 3. With "and": the sum of 'x', 'y', and 'z'
    // 4. Just "and": the sum of 'x' and 'y'
    
    const args: Expression[] = [];
    
    // Parse first argument
    args.push(this.expression());
    
    // Parse additional arguments (comma-separated or "and"-separated)
    while (this.match('COMMA') || this.match('AND')) {
      args.push(this.expression());
    }
    
    return {
      type: 'FunctionCall',
      name: functionName,
      args,
      location: this.createLocation(funcToken)
    };
  }
  
  /**
   * Map natural language function token to function name
   * 
   * PHASE 5.2.1: Natural language functions
   */
  private nlFunctionTokenToName(type: TokenType): string {
    switch (type) {
      // Aggregate functions
      case 'THE_SUM_OF': return 'SUM';
      case 'THE_TOTAL_OF': return 'SUM';
      case 'THE_AVERAGE_OF': return 'AVG'; // Fixed: Was 'AVERAGE', but registry has 'AVG'
      case 'THE_COUNT_OF': return 'COUNT';
      case 'THE_MAXIMUM_OF': return 'MAX';
      case 'THE_MINIMUM_OF': return 'MIN';
      
      // Array functions
      case 'THE_FIRST_ELEMENT_OF': return 'FIRST';
      case 'THE_FIRST_OF': return 'FIRST';
      case 'THE_LAST_ELEMENT_OF': return 'LAST';
      case 'THE_LAST_OF': return 'LAST';
      case 'THE_LENGTH_OF': return 'LENGTH';
      case 'THE_SIZE_OF': return 'LENGTH';
      
      // String functions
      case 'THE_UPPERCASE_OF': return 'UPPER';
      case 'THE_LOWERCASE_OF': return 'LOWER';
      
      // Math functions
      case 'THE_ABSOLUTE_VALUE_OF': return 'ABS';
      case 'THE_SQUARE_ROOT_OF': return 'SQRT';
      case 'THE_CEILING_OF': return 'CEIL';
      case 'THE_FLOOR_OF': return 'FLOOR';
      case 'THE_ROUND_OF': return 'ROUND';
      
      default:
        throw new Error(`Unknown natural language function: ${type}`);
    }
  }
  
  /**
   * Check if current token is a block terminator
   * 
   * PHASE 5.10: END keyword is now optional for natural language flow
   * END is only required when the IF statement is followed by more code at the same level
   * At the end of a program or block, END can be omitted for more natural syntax
   * 
   * Block terminators include keywords that signal the end of a nested structure:
   * - ELSE/OTHERWISE/ELSEIF: Signals parent IF's branches (terminates nested IF)
   * - Statement keywords: FOR, WHILE, IF, SWITCH, RETURN, BREAK, CONTINUE
   * - EOF: End of program
   * 
   * PHASE 5.11: Fixed OR IF handling - not a global terminator
   * "or if" is only recognized as ELSEIF in matchElseIf() context, not here.
   * This prevents false positives when OR appears in other contexts.
   */
  private isBlockTerminator(): boolean {
    // Check for simple single-token terminators
    // IMPORTANT: Only include keywords that ACTUALLY terminate a block
    // Do NOT include IF, FOR, WHILE, SWITCH as they are valid statements WITHIN blocks!
    if (
      this.check('END') ||
      this.check('ELSE') ||
      this.check('OTHERWISE') ||
      this.check('ELSEIF') ||
      this.check('RETURN') || // Terminates because it returns from the whole function
      this.check('EOF')
    ) {
      return true;
    }
    
    // Check for multi-token terminators (don't consume tokens)
    // ELSE IF (two tokens)
    if (this.check('ELSE') && this.peekNext()?.type === 'IF') {
      return true;
    }
    
    // NOTE: We do NOT check for "OR IF" here because OR can appear in many contexts
    // (logical OR, "or if" as ELSEIF, etc.). We only recognize "or if" as ELSEIF
    // in the matchElseIf() function where context makes it unambiguous.
    
    return false;
  }
  
  /**
   * Check if a token type is a statement keyword
   * 
   * PHASE 5.11: Context-sensitive AND handling
   * Used to disambiguate AND in IF conditions
   */
  private isStatementKeyword(type: TokenType): boolean {
    return (
      type === 'FOR' ||
      type === 'WHILE' ||
      type === 'IF' ||
      type === 'SWITCH' ||
      type === 'RETURN' ||
      type === 'BREAK' ||
      type === 'CONTINUE'
    );
  }
  
  /**
   * Check if current token is a genuine IF block terminator (excluding END itself)
   * 
   * Used by IF expression parsing to determine if END can be omitted in BAL mode.
   * Genuine IF block terminators are keywords that naturally end an IF block WITHOUT needing an explicit END:
   * - ELSE/OTHERWISE/ELSEIF: Signals parent IF's branches
   * - Statement keywords: FOR, WHILE, IF, SWITCH, RETURN, BREAK, CONTINUE (next statement starting)
   * - EOF: End of program
   * 
   * NOTE: This does NOT include END itself, which is the whole point - we're checking if END can be omitted.
   */
  private isIfBlockTerminator(): boolean {
    // Check for single-token terminators (NOT including END)
    if (
      this.check('ELSE') ||
      this.check('OTHERWISE') ||
      this.check('ELSEIF') ||
      this.check('FOR') ||
      this.check('WHILE') ||
      this.check('SWITCH') ||
      this.check('IF') ||
      this.check('RETURN') ||
      this.check('BREAK') ||
      this.check('CONTINUE') ||
      this.check('EOF')
    ) {
      return true;
    }
    
    // Check for multi-token terminators (don't consume tokens)
    // ELSE IF (two tokens)
    if (this.check('ELSE') && this.peekNext()?.type === 'IF') {
      return true;
    }
    
    return false;
  }
  
  /**
   * Look ahead to detect if this is an inline IF statement
   * 
   * Inline IF: "if X then Y else Z" (single line, ELSE appears before END)
   * Block IF: "if X then\n  Y\nelse\n  Z\nend" (multi-line, requires END)
   * 
   * We scan forward to see if ELSE/ELSEIF appears before END.
   * This doesn't consume tokens - just peeks ahead.
   * 
   * IMPORTANT: We track nesting depth to avoid being confused by
   * nested IF statements. Only ELSE tokens at depth 0 count for this IF.
   * 
   * ALSO IMPORTANT: Even if we find ELSE before END, if the IF spans multiple
   * lines, it's still a BLOCK IF and requires END.
   */
  private lookaheadForInlineIfPattern(): boolean {
    let i = 0;
    let depth = 0; // Track IF nesting depth
    const startLine = this.peek().line; // Line where IF statement starts
    
    console.log('🔍 LOOKAHEAD: Starting from position', this.current, '/', this.tokens.length, 'token:', this.peek().type, this.peek().value, 'startLine:', startLine);
    
    // Scan ahead up to 100 tokens (reasonable limit for one line)
    while (i < 100 && this.current + i < this.tokens.length) {
      const token = this.tokens[this.current + i];
      
      // Always log first 20 tokens to debug
      if (i < 20) {
        console.log(`🔍 LOOKAHEAD: [${i}] pos=${this.current + i} depth=${depth} line=${token.line} token: ${token.type} "${token.value}"`);
      }
      
      // Track nested IF statements
      if (token.type === 'IF') {
        depth++;
        if (i < 20) console.log(`🔍 LOOKAHEAD: Encountered nested IF, depth now ${depth}`);
      }
      
      // If we hit ELSE/ELSEIF/OTHERWISE at depth 0, check if it's on same line
      if ((token.type === 'ELSE' || token.type === 'ELSEIF' || token.type === 'OTHERWISE') && depth === 0) {
        // Check if this ELSE is on a different line than the IF
        if (token.line !== startLine) {
          console.log('🔍 LOOKAHEAD: Found ELSE-like token at depth 0, but on different line (', token.line, 'vs', startLine, ') - returning FALSE (block)');
          return false; // Multi-line IF-ELSE requires END
        }
        console.log('🔍 LOOKAHEAD: Found ELSE-like token at depth 0 on same line, offset', i, '- returning TRUE (inline)');
        return true;
      }
      
      // If we hit END, it closes either a nested IF (decrement depth) or our IF (we're done)
      if (token.type === 'END') {
        if (depth > 0) {
          depth--;
          if (i < 20) console.log(`🔍 LOOKAHEAD: END closed nested IF, depth now ${depth}`);
        } else {
          console.log('🔍 LOOKAHEAD: Found END at depth 0, offset', i, '- returning FALSE (block)');
          return false;
        }
      }
      
      // ELSE/ELSEIF/OTHERWISE at depth > 0 also closes a nested inline IF
      if ((token.type === 'ELSE' || token.type === 'ELSEIF' || token.type === 'OTHERWISE') && depth > 0) {
        // This ELSE belongs to a nested IF, not ours - keep scanning
        if (i < 20) console.log(`🔍 LOOKAHEAD: ELSE at depth ${depth} belongs to nested IF, continuing...`);
      }
      
      // If we hit EOF before either, it's likely a block IF (missing END)
      if (token.type === 'EOF') {
        console.log('🔍 LOOKAHEAD: Found EOF at offset', i, '- returning FALSE (block)');
        return false;
      }
      
      i++;
    }
    
    console.log('🔍 LOOKAHEAD: Scanned', i, 'tokens without finding ELSE or END - returning FALSE (block)');
    
    // Default to block IF if we didn't find anything conclusive
    return false;
  }
  
  /**
   * Parse a single statement/expression for inline IF branches
   * 
   * Unlike parseStatementBlock() which parses until END/ELSE/EOF,
   * this parses just ONE statement and stops.
   * 
   * Used for inline IF-ELSE statements like:
   * if X then Y else Z
   */
  private parseInlineBranch(): Expression {
    // Check if it's an assignment
    if (this.isAssignmentStart()) {
      return this.assignment() as any;
    } else if (this.check('RETURN')) {
      return this.returnStatement();
    } else if (this.check('BREAK')) {
      return this.breakStatement() as any;
    } else if (this.check('CONTINUE')) {
      return this.continueStatement() as any;
    } else {
      // Regular expression
      return this.expression();
    }
  }
}

/**
 * Parse source code into AST
 * 
 * @param source - Source code string
 * @returns Program AST node
 */
export function parse(source: string): Program {
  const parser = new FormulaParser();
  return parser.parse(source);
}