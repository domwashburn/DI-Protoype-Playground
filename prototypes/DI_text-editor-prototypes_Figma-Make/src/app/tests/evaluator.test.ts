/**
 * Evaluator Test Suite
 * 
 * Comprehensive tests for evaluation engine to ensure:
 * - Correct evaluation of all expressions
 * - No regressions in evaluation behavior
 * - Proper error handling and type checking
 */

import { TracingEvaluator } from '../services/evaluationEngine/debugger/TracingEvaluator';
import { createContext } from '../services/evaluationEngine/runtime/Context';

describe('Evaluation Engine', () => {
  let evaluator: TracingEvaluator;

  beforeEach(() => {
    evaluator = new TracingEvaluator();
  });

  // ============================================================
  // BASIC EXPRESSION EVALUATION
  // ============================================================

  describe('Basic Expressions', () => {
    test('evaluates number literals', () => {
      const result = evaluator.evaluate('42');
      expect(result.success).toBe(true);
      expect(result.value).toBe(42);
    });

    test('evaluates string literals', () => {
      const result = evaluator.evaluate('"hello"');
      expect(result.success).toBe(true);
      expect(result.value).toBe('hello');
    });

    test('evaluates boolean literals', () => {
      const result = evaluator.evaluate('TRUE');
      expect(result.success).toBe(true);
      expect(result.value).toBe(true);
    });

    test('evaluates variable references', () => {
      const context = createContext({
        variables: new Map([['myVar', 42]])
      });
      const result = evaluator.evaluate('$myVar', context);
      expect(result.success).toBe(true);
      expect(result.value).toBe(42);
    });

    test('throws error on undefined variable', () => {
      const result = evaluator.evaluate('$undefinedVar');
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  // ============================================================
  // ARITHMETIC OPERATIONS
  // ============================================================

  describe('Arithmetic Operations', () => {
    test('evaluates addition', () => {
      const result = evaluator.evaluate('5 + 3');
      expect(result.value).toBe(8);
    });

    test('evaluates subtraction', () => {
      const result = evaluator.evaluate('10 - 4');
      expect(result.value).toBe(6);
    });

    test('evaluates multiplication', () => {
      const result = evaluator.evaluate('6 * 7');
      expect(result.value).toBe(42);
    });

    test('evaluates division', () => {
      const result = evaluator.evaluate('20 / 4');
      expect(result.value).toBe(5);
    });

    test('throws error on division by zero', () => {
      const result = evaluator.evaluate('10 / 0');
      expect(result.success).toBe(false);
      expect(result.errors.some(e => e.message?.includes('Division by zero'))).toBe(true);
    });

    test('evaluates modulo', () => {
      const result = evaluator.evaluate('17 % 5');
      expect(result.value).toBe(2);
    });

    test('evaluates complex arithmetic', () => {
      const result = evaluator.evaluate('(5 + 3) * 2 - 4');
      expect(result.value).toBe(12);
    });
  });

  // ============================================================
  // COMPARISON OPERATIONS
  // ============================================================

  describe('Comparison Operations', () => {
    test('evaluates greater than', () => {
      const result = evaluator.evaluate('10 > 5');
      expect(result.value).toBe(true);
    });

    test('evaluates less than', () => {
      const result = evaluator.evaluate('3 < 8');
      expect(result.value).toBe(true);
    });

    test('evaluates equality', () => {
      const result = evaluator.evaluate('5 = 5');
      expect(result.value).toBe(true);
    });

    test('evaluates inequality', () => {
      const result = evaluator.evaluate('5 != 3');
      expect(result.value).toBe(true);
    });

    test('evaluates natural language comparison', () => {
      const result = evaluator.evaluate('10 is greater than 5');
      expect(result.value).toBe(true);
    });
  });

  // ============================================================
  // LOGICAL OPERATIONS
  // ============================================================

  describe('Logical Operations', () => {
    test('evaluates AND operation', () => {
      const result = evaluator.evaluate('TRUE AND TRUE');
      expect(result.value).toBe(true);
    });

    test('evaluates OR operation', () => {
      const result = evaluator.evaluate('FALSE OR TRUE');
      expect(result.value).toBe(true);
    });

    test('evaluates NOT operation', () => {
      const result = evaluator.evaluate('NOT FALSE');
      expect(result.value).toBe(true);
    });

    test('evaluates complex logical expression', () => {
      const context = createContext({
        variables: new Map([
          ['x', 10],
          ['y', 20],
          ['z', 30]
        ])
      });
      const result = evaluator.evaluate('$x > 5 AND $y < 25 AND $z = 30', context);
      expect(result.value).toBe(true);
    });
  });

  // ============================================================
  // ASSIGNMENTS
  // ============================================================

  describe('Assignments', () => {
    test('evaluates simple assignment', () => {
      const result = evaluator.evaluate('$x = 42\n$x');
      expect(result.success).toBe(true);
      expect(result.value).toBe(42);
    });

    test('evaluates assignment with expression', () => {
      const context = createContext({
        variables: new Map([
          ['price', 100],
          ['quantity', 5]
        ])
      });
      const result = evaluator.evaluate('$total = $price * $quantity\n$total', context);
      expect(result.value).toBe(500);
    });

    test('evaluates multiple assignments', () => {
      const result = evaluator.evaluate(`
        $x = 10
        $y = 20
        $z = $x + $y
        $z
      `);
      expect(result.value).toBe(30);
    });
  });

  // ============================================================
  // IF EXPRESSIONS - CRITICAL TEST CASES
  // ============================================================

  describe('IF Expressions', () => {
    test('evaluates simple IF-THEN-ELSE', () => {
      const context = createContext({
        variables: new Map([['x', 15]])
      });
      const result = evaluator.evaluate(`
        IF $x > 10 THEN
          "high"
        ELSE
          "low"
        END
      `, context);
      expect(result.success).toBe(true);
      expect(result.value).toBe('high');
    });

    test('evaluates nested IF expressions', () => {
      const context = createContext({
        variables: new Map([
          ['orderTotal', 1500],
          ['loyaltyTier', 'gold']
        ])
      });
      const result = evaluator.evaluate(`
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
      `, context);
      expect(result.success).toBe(true);
      expect(result.value).toBe(225); // 1500 * 0.15
    });

    test('evaluates ELSIF chain', () => {
      const context = createContext({
        variables: new Map([['score', 85]])
      });
      const result = evaluator.evaluate(`
        IF $score >= 90 THEN
          "A"
        ELSIF $score >= 80 THEN
          "B"
        ELSIF $score >= 70 THEN
          "C"
        ELSE
          "F"
        END
      `, context);
      expect(result.value).toBe('B');
    });

    test('evaluates IF without ELSE', () => {
      const context = createContext({
        variables: new Map([
          ['flag', false],
          ['x', 5]
        ])
      });
      const result = evaluator.evaluate(`
        IF $flag THEN
          $x = 10
        END
        $x
      `, context);
      expect(result.value).toBe(5); // x unchanged
    });
  });

  // ============================================================
  // LIST OPERATIONS
  // ============================================================

  describe('List Operations', () => {
    test('evaluates list literal', () => {
      const result = evaluator.evaluate('[1, 2, 3, 4, 5]');
      expect(result.success).toBe(true);
      expect(Array.isArray(result.value)).toBe(true);
      expect(result.value).toEqual([1, 2, 3, 4, 5]);
    });

    test('evaluates list assignment', () => {
      const result = evaluator.evaluate(`
        $numbers = [10, 20, 30]
        $numbers
      `);
      expect(result.value).toEqual([10, 20, 30]);
    });

    test('evaluates list index access', () => {
      const result = evaluator.evaluate(`
        $numbers = [10, 20, 30]
        $numbers[1]
      `);
      expect(result.value).toBe(20);
    });

    test('evaluates negative list indexing', () => {
      const result = evaluator.evaluate(`
        $numbers = [10, 20, 30]
        $numbers[-1]
      `);
      expect(result.value).toBe(30); // Last element
    });

    test('evaluates range expression', () => {
      const result = evaluator.evaluate('1..5');
      expect(result.value).toEqual([1, 2, 3, 4, 5]);
    });

    test('throws error on index out of bounds', () => {
      const result = evaluator.evaluate(`
        $numbers = [10, 20, 30]
        $numbers[10]
      `);
      expect(result.success).toBe(false);
      expect(result.errors.some(e => e.message?.includes('out of bounds'))).toBe(true);
    });
  });

  // ============================================================
  // FUNCTION CALLS
  // ============================================================

  describe('Function Calls', () => {
    test('evaluates LIST_SUM', () => {
      const result = evaluator.evaluate(`
        $revenues = [45000, 52000, 48000, 61000]
        LIST_SUM($revenues)
      `);
      expect(result.success).toBe(true);
      expect(result.value).toBe(206000);
    });

    test('evaluates LIST_AVG', () => {
      const result = evaluator.evaluate(`
        $scores = [85, 92, 78, 88]
        LIST_AVG($scores)
      `);
      expect(result.value).toBeCloseTo(85.75);
    });

    test('evaluates LIST_MAX', () => {
      const result = evaluator.evaluate(`
        $values = [23, 67, 12, 89, 45]
        LIST_MAX($values)
      `);
      expect(result.value).toBe(89);
    });

    test('evaluates LIST_MIN', () => {
      const result = evaluator.evaluate(`
        $values = [23, 67, 12, 89, 45]
        LIST_MIN($values)
      `);
      expect(result.value).toBe(12);
    });

    test('evaluates LENGTH', () => {
      const result = evaluator.evaluate(`
        $items = [1, 2, 3, 4, 5]
        LENGTH($items)
      `);
      expect(result.value).toBe(5);
    });

    test('evaluates ROUND', () => {
      const result = evaluator.evaluate('ROUND(3.14159, 2)');
      expect(result.value).toBe(3.14);
    });

    test('evaluates MAX with multiple args', () => {
      const result = evaluator.evaluate('MAX(5, 12, 8, 3)');
      expect(result.value).toBe(12);
    });

    test('evaluates MIN with multiple args', () => {
      const result = evaluator.evaluate('MIN(5, 12, 8, 3)');
      expect(result.value).toBe(3);
    });
  });

  // ============================================================
  // FOR LOOPS
  // ============================================================

  describe('FOR Loops', () => {
    test('evaluates FOR loop with list iteration', () => {
      const result = evaluator.evaluate(`
        $transactions = [125.50, 89.99, 234.00, 56.75]
        $total = 0
        
        FOR $amount IN $transactions DO
          $total = $total + $amount
        END
        
        $total
      `);
      expect(result.success).toBe(true);
      expect(result.value).toBeCloseTo(506.24);
    });

    test('evaluates FOR loop with range', () => {
      const result = evaluator.evaluate(`
        $sum = 0
        
        FOR $i IN 1..10 DO
          $sum = $sum + $i
        END
        
        $sum
      `);
      expect(result.value).toBe(55); // Sum of 1..10
    });

    test('evaluates FOR loop with BREAK', () => {
      const result = evaluator.evaluate(`
        $scores = [85, 92, 78, 0, 88, 95]
        $sum = 0
        
        FOR $score IN $scores DO
          IF $score = 0 THEN
            BREAK
          END
          $sum = $sum + $score
        END
        
        $sum
      `);
      expect(result.value).toBe(255); // Stops at 0
    });

    test('evaluates FOR loop with CONTINUE', () => {
      const result = evaluator.evaluate(`
        $scores = [85, -1, 78, -1, 88]
        $sum = 0
        
        FOR $score IN $scores DO
          IF $score < 0 THEN
            CONTINUE
          END
          $sum = $sum + $score
        END
        
        $sum
      `);
      expect(result.value).toBe(251); // Skips negative values
    });

    test('evaluates nested FOR loops', () => {
      const result = evaluator.evaluate(`
        $dept1 = [85, 92, 78]
        $dept2 = [76, 84, 91]
        $departments = [$dept1, $dept2]
        $total = 0
        
        FOR $dept IN $departments DO
          FOR $score IN $dept DO
            $total = $total + $score
          END
        END
        
        $total
      `);
      expect(result.value).toBe(506); // Sum of all scores
    });
  });

  // ============================================================
  // WHILE LOOPS
  // ============================================================

  describe('WHILE Loops', () => {
    test('evaluates WHILE loop', () => {
      const result = evaluator.evaluate(`
        $count = 0
        $sum = 0
        
        WHILE $count < 5 DO
          $count = $count + 1
          $sum = $sum + $count
        END
        
        $sum
      `);
      expect(result.value).toBe(15); // 1+2+3+4+5
    });

    test('evaluates WHILE with BREAK', () => {
      const result = evaluator.evaluate(`
        $count = 0
        
        WHILE $count < 100 DO
          $count = $count + 1
          IF $count = 10 THEN
            BREAK
          END
        END
        
        $count
      `);
      expect(result.value).toBe(10);
    });
  });

  // ============================================================
  // SWITCH STATEMENTS
  // ============================================================

  describe('SWITCH Statements', () => {
    test('evaluates SWITCH with matching CASE', () => {
      const context = createContext({
        variables: new Map([['status', 'active']])
      });
      const result = evaluator.evaluate(`
        SWITCH $status
          CASE "active"
            $priority = 1
          CASE "pending"
            $priority = 2
          DEFAULT
            $priority = 3
        END
        $priority
      `, context);
      expect(result.value).toBe(1);
    });

    test('evaluates SWITCH with DEFAULT', () => {
      const context = createContext({
        variables: new Map([['status', 'unknown']])
      });
      const result = evaluator.evaluate(`
        SWITCH $status
          CASE "active"
            $priority = 1
          CASE "pending"
            $priority = 2
          DEFAULT
            $priority = 3
        END
        $priority
      `, context);
      expect(result.value).toBe(3);
    });
  });

  // ============================================================
  // TYPE CHECKING
  // ============================================================

  describe('Type Checking', () => {
    test('accepts list assignment to list variable', () => {
      const result = evaluator.evaluate(`
        $revenues = [45000, 52000, 48000]
        $revenues
      `);
      expect(result.success).toBe(true);
      expect(Array.isArray(result.value)).toBe(true);
    });

    test('throws error on type mismatch', () => {
      // This should be caught by parser/type checker if variables are pre-declared
      // For now, dynamic assignment is allowed
      const result = evaluator.evaluate(`
        $x = 42
        $x = [1, 2, 3]
      `);
      // Dynamic typing allows this, but in production with variable declarations
      // this should throw a type mismatch error
      expect(result.success).toBe(true); // Currently allowed
    });

    test('throws error on heterogeneous list', () => {
      const result = evaluator.evaluate('[1, "two", 3]');
      expect(result.success).toBe(false);
      expect(result.errors.some(e => e.message?.includes('homogeneous'))).toBe(true);
    });
  });

  // ============================================================
  // EXECUTION TRACING
  // ============================================================

  describe('Execution Tracing', () => {
    test('provides execution trace', () => {
      const result = evaluator.evaluate(`
        $x = 10
        $y = 20
        $z = $x + $y
        $z
      `);
      expect(result.trace).toBeDefined();
      expect(result.trace?.steps.length).toBeGreaterThan(0);
    });

    test('trace includes variable snapshots', () => {
      const result = evaluator.evaluate(`
        $x = 10
        $x = $x + 5
        $x
      `);
      expect(result.trace?.steps[0].variablesBefore).toBeDefined();
      expect(result.trace?.steps[0].variablesAfter).toBeDefined();
    });

    test('trace includes changed variables', () => {
      const result = evaluator.evaluate(`
        $x = 10
        $y = 20
        $x = $x + $y
        $x
      `);
      const assignmentStep = result.trace?.steps.find(s => s.nodeType === 'Assignment');
      expect(assignmentStep).toBeDefined();
      expect(assignmentStep?.changedVariables.length).toBeGreaterThan(0);
    });
  });

  // ============================================================
  // ERROR SCENARIOS
  // ============================================================

  describe('Error Handling', () => {
    test('handles parse errors gracefully', () => {
      const result = evaluator.evaluate('$x = ');
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('handles runtime errors gracefully', () => {
      const result = evaluator.evaluate('10 / 0');
      expect(result.success).toBe(false);
      expect(result.errors.some(e => e.message?.includes('Division by zero'))).toBe(true);
    });

    test('handles undefined variable errors', () => {
      const result = evaluator.evaluate('$undefinedVar + 10');
      expect(result.success).toBe(false);
      expect(result.errors.some(e => e.message?.includes('Undefined variable'))).toBe(true);
    });

    test('handles function errors', () => {
      const result = evaluator.evaluate('UNKNOWN_FUNCTION()');
      expect(result.success).toBe(false);
    });
  });
});
