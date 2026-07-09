/**
 * Parser Test Suite
 * 
 * Comprehensive tests for FormulaParser to ensure:
 * - Correct parsing of all syntax forms
 * - No regressions in parser behavior
 * - Proper error handling
 */

import { FormulaParser } from '../services/evaluationEngine/parsers/FormulaParser';
import type { Program } from '../services/evaluationEngine/ast/ASTNodes';

describe('FormulaParser', () => {
  let parser: FormulaParser;

  beforeEach(() => {
    parser = new FormulaParser();
  });

  // ============================================================
  // BASIC EXPRESSION PARSING
  // ============================================================

  describe('Basic Expressions', () => {
    test('parses number literals', () => {
      const result = parser.parse('42');
      expect(result.type).toBe('Program');
      expect(result.body.length).toBe(0);
      expect(result.returnValue?.type).toBe('NumberLiteral');
      expect((result.returnValue as any).value).toBe(42);
    });

    test('parses string literals', () => {
      const result = parser.parse('"hello"');
      expect(result.returnValue?.type).toBe('StringLiteral');
      expect((result.returnValue as any).value).toBe('hello');
    });

    test('parses boolean literals', () => {
      const result = parser.parse('TRUE');
      expect(result.returnValue?.type).toBe('BooleanLiteral');
      expect((result.returnValue as any).value).toBe(true);
    });

    test('parses variable references', () => {
      const result = parser.parse('$myVar');
      expect(result.returnValue?.type).toBe('VariableRef');
      expect((result.returnValue as any).name).toBe('myVar');
    });

    test('parses attribute references', () => {
      const result = parser.parse('#customer.name');
      expect(result.returnValue?.type).toBe('AttributeRef');
    });
  });

  // ============================================================
  // BINARY OPERATIONS
  // ============================================================

  describe('Binary Operations', () => {
    test('parses arithmetic operations', () => {
      const result = parser.parse('5 + 3');
      expect(result.returnValue?.type).toBe('BinaryOp');
      expect((result.returnValue as any).operator).toBe('+');
    });

    test('parses comparison operations', () => {
      const result = parser.parse('$x > 10');
      expect(result.returnValue?.type).toBe('BinaryOp');
      expect((result.returnValue as any).operator).toBe('>');
    });

    test('parses logical operations', () => {
      const result = parser.parse('$x > 10 AND $y < 20');
      expect(result.returnValue?.type).toBe('BinaryOp');
      expect((result.returnValue as any).operator).toBe('AND');
    });

    test('parses natural language operators', () => {
      const result = parser.parse('$x is greater than 10');
      expect(result.returnValue?.type).toBe('BinaryOp');
      expect((result.returnValue as any).operator).toBe('>');
    });
  });

  // ============================================================
  // ASSIGNMENTS
  // ============================================================

  describe('Assignments', () => {
    test('parses simple assignment', () => {
      const result = parser.parse('$x = 42');
      expect(result.body.length).toBe(1);
      expect(result.body[0].type).toBe('Assignment');
      expect((result.body[0] as any).variable).toBe('x');
    });

    test('parses assignment with expression', () => {
      const result = parser.parse('$total = $price * $quantity');
      expect(result.body[0].type).toBe('Assignment');
      expect((result.body[0] as any).value.type).toBe('BinaryOp');
    });

    test('parses multiple assignments', () => {
      const result = parser.parse(`
        $x = 10
        $y = 20
        $z = $x + $y
      `);
      expect(result.body.length).toBe(3);
      expect(result.body[0].type).toBe('Assignment');
      expect(result.body[1].type).toBe('Assignment');
      expect(result.body[2].type).toBe('Assignment');
    });
  });

  // ============================================================
  // IF EXPRESSIONS - CRITICAL TEST CASES
  // ============================================================

  describe('IF Expressions', () => {
    test('parses simple IF-THEN-ELSE-END', () => {
      const result = parser.parse(`
        IF $x > 10 THEN
          $y = 20
        ELSE
          $y = 5
        END
      `);
      expect(result.body[0].type).toBe('IfExpression');
    });

    test('parses nested IF expressions', () => {
      const result = parser.parse(`
        IF $orderTotal > 1000 THEN
          IF $loyaltyTier = "gold" THEN
            $orderTotal * 0.15
          ELSIF $loyaltyTier = "silver" THEN
            $orderTotal * 0.10
          ELSE
            $orderTotal * 0.05
          END
        ELSE
          0
        END
      `);
      expect(result.body[0].type).toBe('IfExpression');
      const outerIf = result.body[0] as any;
      expect(outerIf.thenBranch.type).toBe('IfExpression'); // Inner IF
    });

    test('parses IF with ELSIF chain', () => {
      const result = parser.parse(`
        IF $score >= 90 THEN
          "A"
        ELSIF $score >= 80 THEN
          "B"
        ELSIF $score >= 70 THEN
          "C"
        ELSE
          "F"
        END
      `);
      const ifExpr = result.body[0] as any;
      expect(ifExpr.type).toBe('IfExpression');
      expect(ifExpr.elseIfBranches).toBeDefined();
      expect(ifExpr.elseIfBranches.length).toBe(2);
    });

    test('parses IF without ELSE branch', () => {
      const result = parser.parse(`
        IF $flag THEN
          $x = 10
        END
      `);
      expect(result.body[0].type).toBe('IfExpression');
      const ifExpr = result.body[0] as any;
      expect(ifExpr.elseBranch).toBeUndefined();
    });

    test('parses IF with natural language', () => {
      const result = parser.parse(`
        IF $age is greater than or equal to 18 THEN
          "Adult"
        OTHERWISE
          "Minor"
        END
      `);
      expect(result.body[0].type).toBe('IfExpression');
    });

    test('parses IF as expression value', () => {
      const result = parser.parse(`
        IF $x > 0 THEN
          "positive"
        ELSE
          "negative"
        END
      `);
      expect(result.body[0].type).toBe('IfExpression');
    });
  });

  // ============================================================
  // LIST/ARRAY EXPRESSIONS
  // ============================================================

  describe('List Expressions', () => {
    test('parses list literals', () => {
      const result = parser.parse('[1, 2, 3, 4, 5]');
      expect(result.returnValue?.type).toBe('ListLiteral');
      expect((result.returnValue as any).elements.length).toBe(5);
    });

    test('parses empty list', () => {
      const result = parser.parse('[]');
      expect(result.returnValue?.type).toBe('ListLiteral');
      expect((result.returnValue as any).elements.length).toBe(0);
    });

    test('parses list assignment', () => {
      const result = parser.parse('$numbers = [10, 20, 30]');
      expect(result.body[0].type).toBe('Assignment');
      expect((result.body[0] as any).value.type).toBe('ListLiteral');
    });

    test('parses list index access', () => {
      const result = parser.parse('$numbers[0]');
      expect(result.returnValue?.type).toBe('IndexAccess');
    });

    test('parses range expression', () => {
      const result = parser.parse('1..10');
      expect(result.returnValue?.type).toBe('RangeExpression');
    });
  });

  // ============================================================
  // FUNCTION CALLS
  // ============================================================

  describe('Function Calls', () => {
    test('parses function with no arguments', () => {
      const result = parser.parse('NOW()');
      expect(result.returnValue?.type).toBe('FunctionCall');
      expect((result.returnValue as any).name).toBe('NOW');
      expect((result.returnValue as any).args.length).toBe(0);
    });

    test('parses function with arguments', () => {
      const result = parser.parse('MAX($x, $y)');
      expect(result.returnValue?.type).toBe('FunctionCall');
      expect((result.returnValue as any).args.length).toBe(2);
    });

    test('parses natural language function', () => {
      const result = parser.parse('the sum of $revenues');
      expect(result.returnValue?.type).toBe('FunctionCall');
      expect((result.returnValue as any).name).toBe('LIST_SUM');
    });

    test('parses nested function calls', () => {
      const result = parser.parse('ROUND(AVG($scores), 2)');
      expect(result.returnValue?.type).toBe('FunctionCall');
      expect((result.returnValue as any).args[0].type).toBe('FunctionCall');
    });
  });

  // ============================================================
  // FOR LOOPS
  // ============================================================

  describe('FOR Loops', () => {
    test('parses FOR loop with list', () => {
      const result = parser.parse(`
        FOR $item IN $items DO
          $total = $total + $item
        END
      `);
      expect(result.body[0].type).toBe('ForLoopStatement');
    });

    test('parses FOR loop with range', () => {
      const result = parser.parse(`
        FOR $i IN 1..10 DO
          $sum = $sum + $i
        END
      `);
      expect(result.body[0].type).toBe('ForLoopStatement');
    });

    test('parses nested FOR loops', () => {
      const result = parser.parse(`
        FOR $row IN $matrix DO
          FOR $cell IN $row DO
            $total = $total + $cell
          END
        END
      `);
      expect(result.body[0].type).toBe('ForLoopStatement');
      const outer = result.body[0] as any;
      expect(outer.body[0].type).toBe('ForLoopStatement');
    });

    test('parses FOR loop with BREAK', () => {
      const result = parser.parse(`
        FOR $item IN $items DO
          IF $item = 0 THEN
            BREAK
          END
        END
      `);
      expect(result.body[0].type).toBe('ForLoopStatement');
    });

    test('parses FOR loop with CONTINUE', () => {
      const result = parser.parse(`
        FOR $item IN $items DO
          IF $item < 0 THEN
            CONTINUE
          END
          $sum = $sum + $item
        END
      `);
      expect(result.body[0].type).toBe('ForLoopStatement');
    });
  });

  // ============================================================
  // WHILE LOOPS
  // ============================================================

  describe('WHILE Loops', () => {
    test('parses WHILE loop', () => {
      const result = parser.parse(`
        WHILE $x < 10 DO
          $x = $x + 1
        END
      `);
      expect(result.body[0].type).toBe('WhileLoopStatement');
    });

    test('parses WHILE with natural language condition', () => {
      const result = parser.parse(`
        WHILE $count is less than 100 DO
          $count = $count + 1
        END
      `);
      expect(result.body[0].type).toBe('WhileLoopStatement');
    });
  });

  // ============================================================
  // SWITCH STATEMENTS
  // ============================================================

  describe('SWITCH Statements', () => {
    test('parses SWITCH with CASE', () => {
      const result = parser.parse(`
        SWITCH $status
          CASE "active"
            $priority = 1
          CASE "pending"
            $priority = 2
          DEFAULT
            $priority = 3
        END
      `);
      expect(result.body[0].type).toBe('SwitchStatement');
    });
  });

  // ============================================================
  // ERROR HANDLING
  // ============================================================

  describe('Error Handling', () => {
    test('throws error on unclosed IF', () => {
      expect(() => {
        parser.parse(`
          IF $x > 10 THEN
            $y = 20
        `);
      }).toThrow();
    });

    test('throws error on mismatched brackets', () => {
      expect(() => {
        parser.parse('[1, 2, 3');
      }).toThrow();
    });

    test('throws error on invalid syntax', () => {
      expect(() => {
        parser.parse('$x =');
      }).toThrow();
    });
  });

  // ============================================================
  // MODE DETECTION
  // ============================================================

  describe('Mode Detection', () => {
    test('detects STANDARD mode with $ prefix', () => {
      const result = parser.parse('$x + $y');
      // Parser should be in STANDARD mode
      expect(result).toBeDefined();
    });

    test('detects BAL mode with natural language', () => {
      const result = parser.parse('the sum of revenues');
      // Parser should be in BAL mode
      expect(result).toBeDefined();
    });

    test('BAL mode accepts symbolic operators', () => {
      const result = parser.parse('customer age > 18');
      // BAL mode should accept both natural language and symbolic
      expect(result).toBeDefined();
    });
  });
});
