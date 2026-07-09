/**
 * Tokenizer for Formula & BAL Evaluation Engine
 * 
 * Performs lexical analysis, converting source code into tokens.
 * Tracks line and column numbers for error reporting.
 * 
 * @module evaluationEngine/parsers/Tokenizer
 */

/**
 * Token types
 */
export type TokenType =
  // Literals
  | 'NUMBER'
  | 'STRING'
  | 'TEMPLATE_LITERAL'  // Template literal with interpolation: `text $var 'verbalization' more text`
  | 'TRUE'
  | 'FALSE'
  | 'NULL'        // null literal
  
  // Identifiers and references
  | 'IDENTIFIER'      // Function names, etc.
  | 'VARIABLE'        // $variableName
  | 'ATTRIBUTE'       // #attribute.path
  | 'VERBALIZATION'   // 'natural language alias'
  
  // Keywords
  | 'IF'
  | 'THEN'
  | 'ELSE'
  | 'ELSIF'
  | 'ELSEIF'
  | 'OTHERWISE'    // otherwise (more natural than ELSE)
  | 'END'
  | 'RETURN'
  | 'AND'
  | 'OR'
  | 'NOT'
  | 'FOR'          // Loop keywords
  | 'WHILE'
  | 'DO'
  | 'IN'
  | 'BREAK'
  | 'CONTINUE'
  | 'SWITCH'       // Switch keywords
  | 'CASE'
  | 'DEFAULT'
  
  // Operators
  | 'PLUS'         // +
  | 'MINUS'        // -
  | 'STAR'         // *
  | 'SLASH'        // /
  | 'PERCENT'      // %
  | 'POWER'        // ^ (exponentiation)
  | 'EQUALS'       // =
  | 'NOT_EQUALS'   // !=
  | 'LESS'         // <
  | 'GREATER'      // >
  | 'LESS_EQ'      // <=
  | 'GREATER_EQ'   // >=
  | 'DOTDOT'       // .. (range operator)
  
  // Natural language arithmetic operators
  | 'TIMES'              // times / multiplied by
  | 'DIVIDED_BY'         // divided by
  | 'PLUS_NL'            // plus (natural language)
  | 'MINUS_NL'           // minus (natural language)
  | 'POWER_OF'           // to the power of
  | 'SQUARED'            // squared
  | 'CUBED'              // cubed
  | 'MOD_NL'             // mod / modulo
  | 'BY'                 // by (multiply X by Y, divide X by Y)
  
  // Property access keywords
  | 'OF'                 // of (property access)
  | 'FROM'               // from (property access / subtract X from Y)
  
  // Assignment keywords
  | 'SET'                // set (assignment)
  | 'TO'                 // to (assignment)
  | 'IS_SET_TO'          // is set to
  | 'EQUAL_TO'           // equal to (for "set X equal to Y")
  
  // Equality and checks
  | 'IS'                 // is (equality or checks)
  | 'IS_NULL'            // is null
  | 'IS_NOT_NULL'        // is not null
  | 'IS_EMPTY'           // is empty
  | 'IS_NOT_EMPTY'       // is not empty
  
  // String predicates
  | 'STARTS_WITH'        // starts with
  | 'ENDS_WITH'          // ends with
  | 'CONTAINS_OP'        // contains (operator form)
  
  // Comparison operators (natural language) - from Phase 4
  | 'IS_GREATER_THAN'    // is greater than
  | 'IS_LESS_THAN'       // is less than
  | 'IS_GREATER_EQUAL'   // is greater than or equal to
  | 'IS_LESS_EQUAL'      // is less than or equal to
  | 'IS_EQUAL_TO'        // is equal to
  | 'IS_NOT_EQUAL_TO'    // is not equal to
  
  // Natural language functions (PHASE 5.2.1)
  | 'THE_SUM_OF'                // the sum of
  | 'THE_AVERAGE_OF'            // the average of
  | 'THE_COUNT_OF'              // the count of
  | 'THE_MAXIMUM_OF'            // the maximum of
  | 'THE_MINIMUM_OF'            // the minimum of
  | 'THE_TOTAL_OF'              // the total of
  | 'THE_FIRST_ELEMENT_OF'      // the first element of
  | 'THE_LAST_ELEMENT_OF'       // the last element of
  | 'THE_FIRST_OF'              // the first of
  | 'THE_LAST_OF'               // the last of
  | 'THE_LENGTH_OF'             // the length of
  | 'THE_SIZE_OF'               // the size of
  | 'THE_UPPERCASE_OF'          // the uppercase of
  | 'THE_LOWERCASE_OF'          // the lowercase of
  | 'THE_ABSOLUTE_VALUE_OF'     // the absolute value of
  | 'THE_SQUARE_ROOT_OF'        // the square root of
  | 'THE_CEILING_OF'            // the ceiling of
  | 'THE_FLOOR_OF'              // the floor of
  | 'THE_ROUND_OF'              // the round of
  
  // Articles (optional - stripped during parsing)
  | 'THE'                // the
  | 'A'                  // a
  | 'AN'                 // an
  
  // Delimiters
  | 'LPAREN'       // (
  | 'RPAREN'       // )
  | 'LBRACKET'     // [
  | 'RBRACKET'     // ]
  | 'LBRACE'       // {
  | 'RBRACE'       // }
  | 'COMMA'        // ,
  | 'COLON'        // :
  | 'DOT'          // .
  
  // Special
  | 'EOF'
  | 'NEWLINE';

/**
 * Token interface
 */
export interface Token {
  type: TokenType;
  value?: any;
  line: number;
  column: number;
}

/**
 * Keywords map
 */
const KEYWORDS: Record<string, TokenType> = {
  // Uppercase (traditional)
  'IF': 'IF',
  'THEN': 'THEN',
  'ELSE': 'ELSE',
  'ELSIF': 'ELSEIF',   // Support both ELSIF...
  'ELSEIF': 'ELSEIF',  // ...and ELSEIF
  'OTHERWISE': 'OTHERWISE', // otherwise (natural alternative to ELSE)
  'END': 'END',
  'RETURN': 'RETURN',
  'AND': 'AND',
  'OR': 'OR',
  'NOT': 'NOT',
  'TRUE': 'TRUE',
  'FALSE': 'FALSE',
  'NULL': 'NULL',      // null literal
  
  // Lowercase (natural language)
  'if': 'IF',
  'then': 'THEN',
  'else': 'ELSE',
  'elsif': 'ELSEIF',
  'elseif': 'ELSEIF',
  // NOTE: 'or' is the OR logical operator, not ELSEIF!
  // "or if" is recognized as two tokens (OR + IF) by the parser's matchElseIf() function
  'otherwise': 'OTHERWISE',  // otherwise maps to OTHERWISE (not ELSE)
  'end': 'END',
  'return': 'RETURN',
  'and': 'AND',
  'or': 'OR',  // ✅ FIXED: 'or' is the logical OR operator
  'not': 'NOT',
  'true': 'TRUE',
  'false': 'FALSE',
  'null': 'NULL',      // null literal
  
  // Loop keywords
  'FOR': 'FOR',
  'WHILE': 'WHILE',
  'DO': 'DO',
  'IN': 'IN',
  'BREAK': 'BREAK',
  'CONTINUE': 'CONTINUE',
  'for': 'FOR',
  'while': 'WHILE',
  'do': 'DO',
  'in': 'IN',
  'break': 'BREAK',
  'continue': 'CONTINUE',
  
  // Switch keywords
  'SWITCH': 'SWITCH',
  'CASE': 'CASE',
  'DEFAULT': 'DEFAULT'
};

/**
 * Natural Language Operators
 * 
 * PHASE 5: Support for natural language operator syntax aligned with IBM BAL/ODM/ADS
 * PHASE 6: Enhanced pseudo-code syntax for more natural expression
 * 
 * Sorted by word count (longest first) to enable greedy matching.
 * This ensures "is less than or equal to" matches before "is less than".
 */
const NATURAL_LANGUAGE_OPERATORS: Array<{ pattern: string; token: TokenType; wordCount: number }> = [
  // 6 words
  { pattern: 'is less than or equal to', token: 'IS_LESS_EQUAL', wordCount: 6 },
  { pattern: 'is greater than or equal to', token: 'IS_GREATER_EQUAL', wordCount: 6 },
  
  // 4 words
  { pattern: 'to the power of', token: 'POWER_OF', wordCount: 4 }, // Fixed: was 5, should be 4
  
  // 4 words
  { pattern: 'is not equal to', token: 'IS_NOT_EQUAL_TO', wordCount: 4 },
  { pattern: 'set equal to', token: 'IS_SET_TO', wordCount: 3 },  // "set X equal to Y"
  
  // 3 words
  { pattern: 'is greater than', token: 'IS_GREATER_THAN', wordCount: 3 },
  { pattern: 'is less than', token: 'IS_LESS_THAN', wordCount: 3 },
  { pattern: 'is equal to', token: 'IS_EQUAL_TO', wordCount: 3 },
  { pattern: 'multiply the', token: 'TIMES', wordCount: 3 },  // multiply the X by Y
  { pattern: 'divide the', token: 'DIVIDED_BY', wordCount: 3 },  // divide the X by Y
  { pattern: 'is not null', token: 'IS_NOT_NULL', wordCount: 3 },
  { pattern: 'is not empty', token: 'IS_NOT_EMPTY', wordCount: 3 },
  { pattern: 'is set to', token: 'IS_SET_TO', wordCount: 3 },  // "X is set to Y" assignment
  { pattern: 'does not equal', token: 'IS_NOT_EQUAL_TO', wordCount: 3 },
  { pattern: 'equal to', token: 'EQUAL_TO', wordCount: 2 },  // "set X equal to Y"
  
  // 2 words
  { pattern: 'if not', token: 'ELSE', wordCount: 2 },  // Natural language: "if not" means "else"
  // BUG FIX: Also support "or else" and plain "else" for inline IF-ELSE
  { pattern: 'or else', token: 'ELSE', wordCount: 2 },  // Natural: "... then X or else Y"
  { pattern: 'starts with', token: 'STARTS_WITH', wordCount: 2 }, // Fixed: was 3, should be 2
  { pattern: 'multiplied by', token: 'TIMES', wordCount: 2 },
  { pattern: 'divided by', token: 'DIVIDED_BY', wordCount: 2 },
  { pattern: 'add the', token: 'PLUS_NL', wordCount: 2 },  // add the X to Y
  { pattern: 'subtract the', token: 'MINUS_NL', wordCount: 2 },  // subtract the X from Y
  { pattern: 'is null', token: 'IS_NULL', wordCount: 2 },
  { pattern: 'is empty', token: 'IS_EMPTY', wordCount: 2 },
  { pattern: 'ends with', token: 'ENDS_WITH', wordCount: 2 },
  { pattern: 'set to', token: 'TO', wordCount: 2 },  // For now map to TO (will handle SET separately)
  
  // 1 word
  { pattern: 'multiply', token: 'TIMES', wordCount: 1 },  // multiply X by Y
  { pattern: 'divide', token: 'DIVIDED_BY', wordCount: 1 },  // divide X by Y
  { pattern: 'add', token: 'PLUS_NL', wordCount: 1 },  // add X to Y
  { pattern: 'subtract', token: 'MINUS_NL', wordCount: 1 },  // subtract X from Y
  { pattern: 'equals', token: 'IS_EQUAL_TO', wordCount: 1 },  // X equals Y
  { pattern: 'times', token: 'TIMES', wordCount: 1 },
  { pattern: 'plus', token: 'PLUS_NL', wordCount: 1 },
  { pattern: 'minus', token: 'MINUS_NL', wordCount: 1 },
  { pattern: 'mod', token: 'MOD_NL', wordCount: 1 },
  { pattern: 'squared', token: 'SQUARED', wordCount: 1 },
  { pattern: 'cubed', token: 'CUBED', wordCount: 1 },
  { pattern: 'contains', token: 'CONTAINS_OP', wordCount: 1 },
  { pattern: 'is', token: 'IS', wordCount: 1 },  // Context-sensitive
  { pattern: 'by', token: 'BY', wordCount: 1 },  // multiply X by Y, divide X by Y
  { pattern: 'of', token: 'OF', wordCount: 1 },  // Property access
  { pattern: 'in', token: 'IN', wordCount: 1 },  // Alternative to "of": the first item in 'array'
  { pattern: 'from', token: 'FROM', wordCount: 1 },  // Alternative property access / subtract X from Y
  { pattern: 'set', token: 'SET', wordCount: 1 },  // Assignment keyword
  { pattern: 'to', token: 'TO', wordCount: 1 },  // Assignment keyword  
  { pattern: 'the', token: 'THE', wordCount: 1 },  // Article (optional)
  { pattern: 'a', token: 'A', wordCount: 1 },  // Article (optional)
  { pattern: 'an', token: 'AN', wordCount: 1 },  // Article (optional)
  { pattern: 'all', token: 'ALL', wordCount: 1 },  // Quantifier: "all prices"
];

/**
 * Natural language functions (PHASE 5.2.1)
 * 
 * Matches: \"the sum of\", \"the average of\", \"the first item in\", etc.
 * 
 * Examples:
 * - \"the sum of 'x', 'y', 'z'\" → SUM(x, y, z)
 * - \"the average of 'prices'\" → AVERAGE(prices)
 * - \"the first item in 'orders'\" → FIRST(orders)
 * 
 * Sorted by word count (longest first) for greedy matching.
 */
const NATURAL_LANGUAGE_FUNCTIONS: Array<{ pattern: string; token: TokenType; wordCount: number }> = [
  // 5 words
  { pattern: 'the absolute value of', token: 'THE_ABSOLUTE_VALUE_OF', wordCount: 4 },  // FIX: was 5
  { pattern: 'the first element of', token: 'THE_FIRST_ELEMENT_OF', wordCount: 4 },    // FIX: was 5
  { pattern: 'the last element of', token: 'THE_LAST_ELEMENT_OF', wordCount: 4 },      // FIX: was 5
  { pattern: 'the square root of', token: 'THE_SQUARE_ROOT_OF', wordCount: 4 },        // FIX: was 5
  
  // 4 words
  { pattern: 'the ceiling of', token: 'THE_CEILING_OF', wordCount: 3 },         // FIX: was 4
  { pattern: 'the uppercase of', token: 'THE_UPPERCASE_OF', wordCount: 3 },     // FIX: was 4
  { pattern: 'the lowercase of', token: 'THE_LOWERCASE_OF', wordCount: 3 },     // FIX: was 4
  { pattern: 'the first item in', token: 'THE_FIRST_OF', wordCount: 4 },        // More natural
  { pattern: 'the first item of', token: 'THE_FIRST_OF', wordCount: 4 },        // More natural
  { pattern: 'the last item in', token: 'THE_LAST_OF', wordCount: 4 },          // More natural
  { pattern: 'the last item of', token: 'THE_LAST_OF', wordCount: 4 },          // More natural
  
  // 3 words
  { pattern: 'the sum of', token: 'THE_SUM_OF', wordCount: 3 },
  { pattern: 'the average of', token: 'THE_AVERAGE_OF', wordCount: 3 },
  { pattern: 'the count of', token: 'THE_COUNT_OF', wordCount: 3 },
  { pattern: 'the maximum of', token: 'THE_MAXIMUM_OF', wordCount: 3 },
  { pattern: 'the minimum of', token: 'THE_MINIMUM_OF', wordCount: 3 },
  { pattern: 'the total of', token: 'THE_TOTAL_OF', wordCount: 3 },
  { pattern: 'the first of', token: 'THE_FIRST_OF', wordCount: 3 },
  { pattern: 'the last of', token: 'THE_LAST_OF', wordCount: 3 },
  { pattern: 'the first in', token: 'THE_FIRST_OF', wordCount: 3 },     // Alternative
  { pattern: 'the last in', token: 'THE_LAST_OF', wordCount: 3 },       // Alternative
  { pattern: 'the length of', token: 'THE_LENGTH_OF', wordCount: 3 },
  { pattern: 'the size of', token: 'THE_SIZE_OF', wordCount: 3 },
  { pattern: 'the floor of', token: 'THE_FLOOR_OF', wordCount: 3 },
  { pattern: 'the round of', token: 'THE_ROUND_OF', wordCount: 3 },
];

/**
 * Result of operator matching attempt
 */
interface OperatorMatch {
  token: Token;
  consumedChars: number;
}

/**
 * Tokenizer class
 */
export class Tokenizer {
  private input: string;
  private position: number = 0;
  private line: number = 1;
  private column: number = 1;
  
  constructor(input: string) {
    this.input = input;
  }
  
  /**
   * Tokenize the entire input
   */
  tokenize(): Token[] {
    const tokens: Token[] = [];
    
    while (!this.isAtEnd()) {
      const token = this.nextToken();
      if (token) {
        tokens.push(token);
      }
    }
    
    tokens.push({
      type: 'EOF',
      line: this.line,
      column: this.column
    });
    
    return tokens;
  }
  
  /**
   * Get next token
   */
  private nextToken(): Token | null {
    this.skipWhitespaceAndComments();
    
    if (this.isAtEnd()) {
      return null;
    }
    
    const char = this.peek();
    const line = this.line;
    const column = this.column;
    
    // Numbers
    if (this.isDigit(char)) {
      return this.readNumber(line, column);
    }
    
    // Strings (double quotes) - literal string values
    if (char === '"') {
      return this.readString(line, column);
    }
    
    // Template literals (backticks) - string interpolation with verbalizations/variables
    if (char === '`') {
      return this.readTemplateLiteral(line, column);
    }
    
    // Verbalizations (single quotes) - natural language variable references
    if (char === "'") {
      return this.readVerbalization(line, column);
    }
    
    // Variables ($variableName)
    if (char === '$') {
      return this.readVariable(line, column);
    }
    
    // Attributes (#attribute.path)
    if (char === '#') {
      return this.readAttribute(line, column);
    }
    
    // Identifiers and keywords
    if (this.isAlpha(char)) {
      return this.readIdentifierOrKeyword(line, column);
    }
    
    // Operators and delimiters
    return this.readOperatorOrDelimiter(line, column);
  }
  
  /**
   * Read a number token
   */
  private readNumber(line: number, column: number): Token {
    let numStr = '';
    
    while (this.isDigit(this.peek())) {
      numStr += this.advance();
    }
    
    // Check for decimal point (only if followed by digit)
    // This prevents consuming DOT for property access (e.g., in "42.toString()")
    if (this.peek() === '.' && this.isDigit(this.peekNext())) {
      numStr += this.advance(); // consume '.'
      
      while (this.isDigit(this.peek())) {
        numStr += this.advance();
      }
    }
    
    return {
      type: 'NUMBER',
      value: parseFloat(numStr),
      line,
      column
    };
  }
  
  /**
   * Read a string literal token (double quotes)
   * 
   * PHASE 5: Supports escape sequences for consistency with verbalizations
   * Example: "customer\'s email" or "path\\to\\file"
   */
  private readString(line: number, column: number): Token {
    this.advance(); // consume opening "
    let str = '';
    
    while (!this.isAtEnd() && this.peek() !== '"') {
      if (this.peek() === '\\') {
        // Handle escape sequence
        this.advance(); // consume backslash
        
        if (this.isAtEnd()) {
          throw new Error(`Unterminated string at line ${line}, column ${column}`);
        }
        
        const escapedChar = this.advance();
        
        // Support common escape sequences
        switch (escapedChar) {
          case '"':
            str += '"';   // Escaped double quote
            break;
          case '\\':
            str += '\\';  // Escaped backslash
            break;
          case 'n':
            str += '\n';  // Newline
            break;
          case 't':
            str += '\t';  // Tab
            break;
          case 'r':
            str += '\r';  // Carriage return
            break;
          default:
            // Unknown escape sequence - treat as literal character
            str += escapedChar;
        }
      } else {
        if (this.peek() === '\n') {
          this.line++;
          this.column = 0;
        }
        str += this.advance();
      }
    }
    
    if (this.isAtEnd()) {
      throw new Error(`Unterminated string at line ${line}, column ${column}`);
    }
    
    this.advance(); // consume closing "
    
    return {
      type: 'STRING',
      value: str,
      line,
      column
    };
  }
  
  /**
   * Read a template literal token (backticks)
   * 
   * Template literals automatically interpolate verbalizations and variables.
   * Example: `'item count' items ('first item' to 'last item') = $'final price'`
   * 
   * The token value contains an array of parts, where each part is either:
   * - { type: 'text', value: string } - literal text
   * - { type: 'verbalization', value: string } - verbalization to interpolate
   * - { type: 'variable', value: string } - variable to interpolate
   * 
   * PHASE 6: Backtick strings for cleaner interpolation syntax
   */
  private readTemplateLiteral(line: number, column: number): Token {
    this.advance(); // consume opening `
    
    const parts: Array<{ type: 'text' | 'verbalization' | 'variable', value: string }> = [];
    let textBuffer = '';
    
    const saveTextBuffer = () => {
      if (textBuffer) {
        parts.push({ type: 'text', value: textBuffer });
        textBuffer = '';
      }
    };
    
    while (!this.isAtEnd() && this.peek() !== '`') {
      if (this.peek() === "'") {
        // Found a verbalization - save any accumulated text first
        saveTextBuffer();
        
        // Read the verbalization
        const verb = this.readVerbalization(this.line, this.column);
        parts.push({ type: 'verbalization', value: verb.value });
      } else if (this.peek() === '$' && this.isAlpha(this.peekNext())) {
        // Found a variable - save any accumulated text first
        saveTextBuffer();
        
        // Read the variable
        const variable = this.readVariable(this.line, this.column);
        parts.push({ type: 'variable', value: variable.value });
      } else if (this.peek() === '\\') {
        // Handle escape sequences
        this.advance(); // consume backslash
        
        if (this.isAtEnd()) {
          throw new Error(`Unterminated template literal at line ${line}, column ${column}`);
        }
        
        const escapedChar = this.advance();
        
        // Support common escape sequences
        switch (escapedChar) {
          case '`':
            textBuffer += '`';   // Escaped backtick
            break;
          case '\\':
            textBuffer += '\\';  // Escaped backslash
            break;
          case 'n':
            textBuffer += '\n';  // Newline
            break;
          case 't':
            textBuffer += '\t';  // Tab
            break;
          case 'r':
            textBuffer += '\r';  // Carriage return
            break;
          default:
            // Unknown escape sequence - treat as literal character
            textBuffer += escapedChar;
        }
      } else {
        // Regular character - accumulate in text buffer
        if (this.peek() === '\n') {
          this.line++;
          this.column = 0;
        }
        textBuffer += this.advance();
      }
    }
    
    if (this.isAtEnd()) {
      throw new Error(`Unterminated template literal at line ${line}, column ${column}`);
    }
    
    // Save final text buffer
    saveTextBuffer();
    
    this.advance(); // consume closing `
    
    return {
      type: 'TEMPLATE_LITERAL',
      value: parts,
      line,
      column
    };
  }
  
  /**
   * Read a verbalization token (single quotes)
   * 
   * Verbalizations are natural language aliases for variables.
   * Example: 'customer name' resolves to $customerName
   * 
   * PHASE 5: Supports escape sequences for apostrophes in possessives/contractions
   * Example: 'customer\'s email' contains a literal apostrophe
   */
  private readVerbalization(line: number, column: number): Token {
    this.advance(); // consume opening '
    let str = '';
    
    while (!this.isAtEnd() && this.peek() !== "'") {
      if (this.peek() === '\\') {
        // Handle escape sequence
        this.advance(); // consume backslash
        
        if (this.isAtEnd()) {
          throw new Error(`Unterminated verbalization at line ${line}, column ${column}`);
        }
        
        const escapedChar = this.advance();
        
        // Support common escape sequences
        switch (escapedChar) {
          case "'":
            str += "'";   // Escaped apostrophe (for possessives/contractions)
            break;
          case '\\':
            str += '\\';  // Escaped backslash
            break;
          case 'n':
            str += '\n';  // Newline
            break;
          case 't':
            str += '\t';  // Tab
            break;
          case 'r':
            str += '\r';  // Carriage return
            break;
          default:
            // Unknown escape sequence - treat as literal character
            // This is lenient: \x → x
            str += escapedChar;
        }
      } else {
        if (this.peek() === '\n') {
          this.line++;
          this.column = 0;
        }
        str += this.advance();
      }
    }
    
    if (this.isAtEnd()) {
      throw new Error(`Unterminated verbalization at line ${line}, column ${column}`);
    }
    
    this.advance(); // consume closing '
    
    return {
      type: 'VERBALIZATION',
      value: str,
      line,
      column
    };
  }
  
  /**
   * Read a variable token ($variableName)
   */
  private readVariable(line: number, column: number): Token {
    this.advance(); // consume '$'
    
    if (!this.isAlpha(this.peek()) && this.peek() !== '_') {
      throw new Error(`Invalid variable name at line ${line}, column ${column}`);
    }
    
    let name = '';
    while (this.isAlphaNumeric(this.peek()) || this.peek() === '_') {
      name += this.advance();
    }
    
    return {
      type: 'VARIABLE',
      value: name,
      line,
      column
    };
  }
  
  /**
   * Read an attribute token (#attribute.path)
   */
  private readAttribute(line: number, column: number): Token {
    this.advance(); // consume '#'
    
    if (!this.isAlpha(this.peek()) && this.peek() !== '_') {
      throw new Error(`Invalid attribute name at line ${line}, column ${column}`);
    }
    
    const path: string[] = [];
    let segment = '';
    
    while (this.isAlphaNumeric(this.peek()) || this.peek() === '_' || this.peek() === '.') {
      if (this.peek() === '.') {
        if (segment) {
          path.push(segment);
          segment = '';
        }
        this.advance(); // consume '.'
      } else {
        segment += this.advance();
      }
    }
    
    if (segment) {
      path.push(segment);
    }
    
    return {
      type: 'ATTRIBUTE',
      value: path,
      line,
      column
    };
  }
  
  /**
   * Read an identifier or keyword
   * 
   * PHASE 5: Enhanced to support multi-word natural language operators and functions
   * Uses greedy matching (longest pattern first) for disambiguation
   * 
   * PHASE 5.2.1: Now also tries to match natural language function patterns
   */
  private readIdentifierOrKeyword(line: number, column: number): Token {
    // PHASE 5.2.1: First, try to match natural language functions (highest priority)
    const nlFunction = this.tryMatchNaturalLanguageFunction(line, column);
    if (nlFunction) {
      return nlFunction.token;
    }
    
    // PHASE 5: Try to match multi-word natural language operators
    const nlOperator = this.tryMatchNaturalLanguageOperator(line, column);
    if (nlOperator) {
      // DEBUG: Log when we match "if not" or other ELSE patterns
      if (nlOperator.token.type === 'ELSE') {
        console.log('🔍 TOKENIZER: Matched ELSE pattern:', nlOperator.token.value, 'at line', line, 'column', column);
      }
      return nlOperator.token;
    }
    
    // Fall back to standard identifier/keyword matching
    let text = '';
    
    while (this.isAlphaNumeric(this.peek()) || this.peek() === '_') {
      text += this.advance();
    }
    
    // Check for keyword (case-insensitive by checking both original and uppercase)
    const tokenType = KEYWORDS[text] || KEYWORDS[text.toUpperCase()] || 'IDENTIFIER';
    
    // DEBUG: Log when we produce IF token (to see if "if not" is being split)
    if (tokenType === 'IF' || tokenType === 'NOT') {
      console.log('🔍 TOKENIZER: Single keyword token:', tokenType, '(text:', text + ')', 'at line', line, 'column', column);
    }
    
    return {
      type: tokenType,
      value: tokenType === 'IDENTIFIER' ? text : undefined,
      line,
      column
    };
  }
  
  /**
   * Try to match natural language function pattern starting at current position
   * 
   * PHASE 5.2.1: Matches patterns like "the sum of", "the average of", etc.
   * Uses greedy matching: tries longest patterns first
   * Returns null if no match found
   */
  private tryMatchNaturalLanguageFunction(line: number, column: number): OperatorMatch | null {
    const startPos = this.position;
    const startLine = this.line;
    const startColumn = this.column;
    
    // Extract words ahead to compare against patterns
    const lookaheadWords = this.extractWordsAhead(6); // Max function pattern length is 5 words ("the absolute value of")
    
    if (lookaheadWords.length === 0) {
      return null;
    }
    
    // Try to match function patterns (already sorted by word count DESC)
    for (const pattern of NATURAL_LANGUAGE_FUNCTIONS) {
      if (pattern.wordCount > lookaheadWords.length) {
        continue; // Pattern is longer than available words
      }
      
      // Extract the exact number of words needed for this pattern
      const candidateWords = lookaheadWords.slice(0, pattern.wordCount);
      const candidateText = candidateWords.join(' ').toLowerCase();
      
      if (candidateText === pattern.pattern) {
        // Match found! Consume the words
        let consumedChars = 0;
        
        for (let i = 0; i < pattern.wordCount; i++) {
          // Consume the word
          while (this.isAlphaNumeric(this.peek()) || this.peek() === '_') {
            this.advance();
            consumedChars++;
          }
          
          // Consume whitespace between words (but not after last word)
          if (i < pattern.wordCount - 1) {
            while (!this.isAtEnd() && (this.peek() === ' ' || this.peek() === '\t')) {
              this.advance();
              consumedChars++;
            }
          }
        }
        
        return {
          token: {
            type: pattern.token,
            value: pattern.pattern,
            line: startLine,
            column: startColumn
          },
          consumedChars
        };
      }
    }
    
    // No match found
    return null;
  }
  
  /**
   * Try to match natural language operator starting at current position
   * 
   * Uses greedy matching: tries longest patterns first
   * Returns null if no match found
   * 
   * SPECIAL CASE: "contains" followed by "(" is a function call, not an operator
   */
  private tryMatchNaturalLanguageOperator(line: number, column: number): OperatorMatch | null {
    const startPos = this.position;
    const startLine = this.line;
    const startColumn = this.column;
    
    // Extract words ahead to compare against patterns
    // We need to look ahead without consuming characters
    const lookaheadWords = this.extractWordsAhead(6); // Max pattern length is 6 words
    
    if (lookaheadWords.length === 0) {
      return null;
    }
    
    // Try to match patterns (already sorted by word count DESC)
    for (const pattern of NATURAL_LANGUAGE_OPERATORS) {
      if (pattern.wordCount > lookaheadWords.length) {
        continue; // Pattern is longer than available words
      }
      
      // Extract the exact number of words needed for this pattern
      const candidateWords = lookaheadWords.slice(0, pattern.wordCount);
      const candidateText = candidateWords.join(' ').toLowerCase();
      
      if (candidateText === pattern.pattern) {
        // SPECIAL CASE: "contains" followed by "(" is a function call (IDENTIFIER), not CONTAINS_OP
        if (pattern.token === 'CONTAINS_OP') {
          // Look ahead after the word to see if there's a '('
          let checkPos = this.position;
          
          // Skip the word "contains"
          while (checkPos < this.input.length && (this.isAlphaNumeric(this.input[checkPos]) || this.input[checkPos] === '_')) {
            checkPos++;
          }
          
          // Skip whitespace
          while (checkPos < this.input.length && (this.input[checkPos] === ' ' || this.input[checkPos] === '\t')) {
            checkPos++;
          }
          
          // If next character is '(', treat as function call, not operator
          if (checkPos < this.input.length && this.input[checkPos] === '(') {
            // Don't match - let it fall through to IDENTIFIER matching
            continue;
          }
        }
        
        // Match found! Consume the words
        let consumedChars = 0;
        
        for (let i = 0; i < pattern.wordCount; i++) {
          // Consume the word
          while (this.isAlphaNumeric(this.peek()) || this.peek() === '_') {
            this.advance();
            consumedChars++;
          }
          
          // Consume whitespace between words (but not after last word)
          if (i < pattern.wordCount - 1) {
            while (!this.isAtEnd() && (this.peek() === ' ' || this.peek() === '\t')) {
              this.advance();
              consumedChars++;
            }
          }
        }
        
        return {
          token: {
            type: pattern.token,
            value: pattern.pattern,
            line: startLine,
            column: startColumn
          },
          consumedChars
        };
      }
    }
    
    // No match found - reset position and return null
    return null;
  }
  
  /**
   * Extract words ahead without consuming them
   * 
   * Looks ahead up to maxWords words, stopping at non-word characters
   * Returns array of words (lowercase)
   */
  private extractWordsAhead(maxWords: number): string[] {
    const words: string[] = [];
    let pos = this.position;
    
    while (words.length < maxWords && pos < this.input.length) {
      // Skip whitespace
      while (pos < this.input.length && (this.input[pos] === ' ' || this.input[pos] === '\t')) {
        pos++;
      }
      
      if (pos >= this.input.length) break;
      
      const char = this.input[pos];
      
      // Check if this is the start of a word
      if (!this.isAlpha(char)) {
        break; // Stop at non-alphabetic characters
      }
      
      // Extract word
      let word = '';
      while (pos < this.input.length && (this.isAlphaNumeric(this.input[pos]) || this.input[pos] === '_')) {
        word += this.input[pos];
        pos++;
      }
      
      if (word) {
        words.push(word.toLowerCase());
      }
    }
    
    return words;
  }
  
  /**
   * Read an operator or delimiter
   */
  private readOperatorOrDelimiter(line: number, column: number): Token {
    const char = this.advance();
    
    switch (char) {
      case '+': return { type: 'PLUS', line, column };
      case '-': return { type: 'MINUS', line, column };
      case '*': return { type: 'STAR', line, column };
      case '/': return { type: 'SLASH', line, column };
      case '%': return { type: 'PERCENT', line, column };
      case '^': return { type: 'POWER', line, column };
      case '(': return { type: 'LPAREN', line, column };
      case ')': return { type: 'RPAREN', line, column };
      case '[': return { type: 'LBRACKET', line, column };
      case ']': return { type: 'RBRACKET', line, column };
      case '{': return { type: 'LBRACE', line, column };
      case '}': return { type: 'RBRACE', line, column };
      case ',': return { type: 'COMMA', line, column };
      case ':': return { type: 'COLON', line, column };
      case '.':
        // Check for range operator (..)
        if (this.peek() === '.') {
          this.advance(); // consume second dot
          return { type: 'DOTDOT', line, column };
        }
        return { type: 'DOT', line, column };
      
      case '=': return { type: 'EQUALS', line, column };
      
      case '!':
        if (this.peek() === '=') {
          this.advance();
          return { type: 'NOT_EQUALS', line, column };
        }
        throw new Error(`Unexpected character '!' at line ${line}, column ${column}`);
      
      case '<':
        if (this.peek() === '=') {
          this.advance();
          return { type: 'LESS_EQ', line, column };
        }
        return { type: 'LESS', line, column };
      
      case '>':
        if (this.peek() === '=') {
          this.advance();
          return { type: 'GREATER_EQ', line, column };
        }
        return { type: 'GREATER', line, column };
      
      default:
        throw new Error(`Unexpected character '${char}' at line ${line}, column ${column}`);
    }
  }
  
  /**
   * Skip whitespace and comments
   */
  private skipWhitespaceAndComments(): void {
    while (!this.isAtEnd()) {
      const char = this.peek();
      
      if (char === ' ' || char === '\t' || char === '\r') {
        this.advance();
      } else if (char === '\n') {
        this.advance();
        this.line++;
        this.column = 1;
      } else if (char === '/' && this.peekNext() === '/') {
        // Comment detected - skip to end of line
        this.skipComment();
      } else {
        break;
      }
    }
  }
  
  /**
   * Skip a comment (assumes we're at the first '/')
   */
  private skipComment(): void {
    // Skip the two slashes
    this.advance(); // first /
    this.advance(); // second /
    
    // Skip to end of line
    while (!this.isAtEnd() && this.peek() !== '\n') {
      this.advance();
    }
    
    // Consume the newline if present
    if (this.peek() === '\n') {
      this.advance();
      this.line++;
      this.column = 1;
    }
  }
  
  /**
   * Peek at current character
   */
  private peek(): string {
    if (this.isAtEnd()) return '\0';
    return this.input[this.position];
  }
  
  /**
   * Peek at next character
   */
  private peekNext(): string {
    if (this.position + 1 >= this.input.length) return '\0';
    return this.input[this.position + 1];
  }
  
  /**
   * Advance to next character
   */
  private advance(): string {
    const char = this.input[this.position];
    this.position++;
    this.column++;
    return char;
  }
  
  /**
   * Check if at end of input
   */
  private isAtEnd(): boolean {
    return this.position >= this.input.length;
  }
  
  /**
   * Check if character is a digit
   */
  private isDigit(char: string): boolean {
    return char >= '0' && char <= '9';
  }
  
  /**
   * Check if character is alphabetic
   */
  private isAlpha(char: string): boolean {
    return (char >= 'a' && char <= 'z') ||
           (char >= 'A' && char <= 'Z');
  }
  
  /**
   * Check if character is alphanumeric
   */
  private isAlphaNumeric(char: string): boolean {
    return this.isAlpha(char) || this.isDigit(char);
  }
}

/**
 * Tokenize source code
 * 
 * @param source - Source code string
 * @returns Array of tokens
 */
export function tokenize(source: string): Token[] {
  const tokenizer = new Tokenizer(source);
  return tokenizer.tokenize();
}