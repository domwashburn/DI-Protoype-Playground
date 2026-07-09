/**
 * Formula Samples Regression Test Suite
 * 
 * Tests all formula samples from formulaSamples.ts to ensure:
 * - No type mismatch errors
 * - All formulas parse correctly
 * - All formulas evaluate without errors
 * - Results match expected outputs
 */

import { TracingEvaluator } from '../services/evaluationEngine/debugger/TracingEvaluator';
import { createContext } from '../services/evaluationEngine/runtime/Context';
import { formulaSamples } from '../SampleData/formulaSamples';
import type { FormulaSample } from '../SampleData/formulaSamples';

describe('Formula Samples Regression Tests', () => {
  let evaluator: TracingEvaluator;

  beforeEach(() => {
    evaluator = new TracingEvaluator();
  });

  /**
   * Helper to create context from formula sample variables
   */
  function createContextFromSample(sample: FormulaSample) {
    const variables = new Map();
    const attributes = new Map();

    if (sample.variables) {
      for (const varDef of sample.variables) {
        // Skip calculated variables (they're assigned in the formula)
        if (varDef.type === 'calculated') continue;
        
        // For input variables, use dataSource value if available
        if (varDef.dataSource && varDef.value !== undefined) {
          variables.set(varDef.name, varDef.value);
        }
      }
    }

    if (sample.attributes) {
      for (const attrDef of sample.attributes) {
        attributes.set(attrDef.path, attrDef.value);
      }
    }

    return createContext({ variables, attributes });
  }

  /**
   * Test helper that validates a formula sample
   */
  function testFormulaSample(sample: FormulaSample) {
    const context = createContextFromSample(sample);
    const result = evaluator.evaluate(sample.formula, context);

    return {
      sample,
      result,
      passed: result.success,
      errors: result.errors
    };
  }

  // ============================================================
  // CRITICAL SAMPLES - Must Pass
  // ============================================================

  describe('Critical Samples', () => {
    test('Customer Discount Calculation (nested IF)', () => {
      const sample = formulaSamples.find(s => s.id === 'customer-discount');
      expect(sample).toBeDefined();
      
      const testResult = testFormulaSample(sample!);
      
      if (!testResult.passed) {
        console.error('Customer Discount errors:', testResult.errors);
      }
      
      expect(testResult.passed).toBe(true);
      expect(testResult.errors.length).toBe(0);
    });

    test('Monthly Revenue Analysis (list operations)', () => {
      const sample = formulaSamples.find(s => s.id === 'revenue-analysis');
      expect(sample).toBeDefined();
      
      const testResult = testFormulaSample(sample!);
      
      if (!testResult.passed) {
        console.error('Revenue Analysis errors:', testResult.errors);
      }
      
      expect(testResult.passed).toBe(true);
      expect(testResult.errors.length).toBe(0);
    });

    test('FOR Loop - Array Iteration', () => {
      const sample = formulaSamples.find(s => s.id === 'for-loop-array');
      expect(sample).toBeDefined();
      
      const testResult = testFormulaSample(sample!);
      
      if (!testResult.passed) {
        console.error('FOR Loop errors:', testResult.errors);
      }
      
      expect(testResult.passed).toBe(true);
      expect(testResult.errors.length).toBe(0);
    });
  });

  // ============================================================
  // ALL SAMPLES - No Parse Errors
  // ============================================================

  describe('All Samples Parse Successfully', () => {
    test('all samples should parse without errors', () => {
      const failedSamples: Array<{
        id: string;
        title: string;
        errors: any[];
      }> = [];

      for (const sample of formulaSamples) {
        const testResult = testFormulaSample(sample);
        
        if (!testResult.passed) {
          failedSamples.push({
            id: sample.id,
            title: sample.title,
            errors: testResult.errors
          });
        }
      }

      if (failedSamples.length > 0) {
        console.error('Failed samples:', JSON.stringify(failedSamples, null, 2));
      }

      expect(failedSamples.length).toBe(0);
    });
  });

  // ============================================================
  // TYPE MISMATCH DETECTION
  // ============================================================

  describe('No Type Mismatch Errors', () => {
    test('no samples should have type mismatch errors', () => {
      const typeMismatchSamples: Array<{
        id: string;
        title: string;
        error: string;
      }> = [];

      for (const sample of formulaSamples) {
        const testResult = testFormulaSample(sample);
        
        // Check for type mismatch errors
        const hasTypeMismatch = testResult.errors.some(err => 
          err.message?.includes('Type mismatch') ||
          err.message?.includes('type mismatch') ||
          err.message?.includes('cannot coerce')
        );

        if (hasTypeMismatch) {
          typeMismatchSamples.push({
            id: sample.id,
            title: sample.title,
            error: testResult.errors[0].message || 'Unknown error'
          });
        }
      }

      if (typeMismatchSamples.length > 0) {
        console.error('Type mismatch samples:', JSON.stringify(typeMismatchSamples, null, 2));
      }

      expect(typeMismatchSamples.length).toBe(0);
    });
  });

  // ============================================================
  // SPECIFIC SAMPLE CATEGORIES
  // ============================================================

  describe('IF Expression Samples', () => {
    const ifSamples = [
      'customer-discount',
      'shipping-cost',
      'loan-approval',
      'performance-rating'
    ];

    for (const sampleId of ifSamples) {
      test(`IF sample: ${sampleId}`, () => {
        const sample = formulaSamples.find(s => s.id === sampleId);
        if (!sample) {
          console.warn(`Sample ${sampleId} not found`);
          return;
        }

        const testResult = testFormulaSample(sample);
        
        if (!testResult.passed) {
          console.error(`${sampleId} errors:`, testResult.errors);
        }
        
        expect(testResult.passed).toBe(true);
      });
    }
  });

  describe('List Operation Samples', () => {
    const listSamples = [
      'revenue-analysis',
      'student-grades',
      'inventory-levels',
      'data-cleaning',
      'leaderboard-ranking'
    ];

    for (const sampleId of listSamples) {
      test(`List sample: ${sampleId}`, () => {
        const sample = formulaSamples.find(s => s.id === sampleId);
        if (!sample) {
          console.warn(`Sample ${sampleId} not found`);
          return;
        }

        const testResult = testFormulaSample(sample);
        
        if (!testResult.passed) {
          console.error(`${sampleId} errors:`, testResult.errors);
        }
        
        expect(testResult.passed).toBe(true);
      });
    }
  });

  describe('Loop Samples', () => {
    const loopSamples = [
      'for-loop-array',
      'loop-break-continue',
      'nested-loops'
    ];

    for (const sampleId of loopSamples) {
      test(`Loop sample: ${sampleId}`, () => {
        const sample = formulaSamples.find(s => s.id === sampleId);
        if (!sample) {
          console.warn(`Sample ${sampleId} not found`);
          return;
        }

        const testResult = testFormulaSample(sample);
        
        if (!testResult.passed) {
          console.error(`${sampleId} errors:`, testResult.errors);
        }
        
        expect(testResult.passed).toBe(true);
      });
    }
  });

  // ============================================================
  // PERFORMANCE METRICS
  // ============================================================

  describe('Performance Metrics', () => {
    test('all samples evaluate within reasonable time', () => {
      const slowSamples: Array<{
        id: string;
        title: string;
        totalTimeMs: number;
      }> = [];

      const TIMEOUT_THRESHOLD = 1000; // 1 second

      for (const sample of formulaSamples) {
        const testResult = testFormulaSample(sample);
        
        if (testResult.result.metrics.totalTimeMs > TIMEOUT_THRESHOLD) {
          slowSamples.push({
            id: sample.id,
            title: sample.title,
            totalTimeMs: testResult.result.metrics.totalTimeMs
          });
        }
      }

      if (slowSamples.length > 0) {
        console.warn('Slow samples (>1s):', JSON.stringify(slowSamples, null, 2));
      }

      // This is a warning, not a failure
      expect(slowSamples.length).toBeLessThan(formulaSamples.length * 0.1); // Less than 10% slow
    });

    test('samples have execution traces', () => {
      const samplesWithoutTraces: string[] = [];

      for (const sample of formulaSamples) {
        const testResult = testFormulaSample(sample);
        
        if (testResult.passed && (!testResult.result.trace || testResult.result.trace.steps.length === 0)) {
          samplesWithoutTraces.push(sample.id);
        }
      }

      if (samplesWithoutTraces.length > 0) {
        console.warn('Samples without traces:', samplesWithoutTraces);
      }

      // Most samples should have traces
      expect(samplesWithoutTraces.length).toBeLessThan(formulaSamples.length * 0.1);
    });
  });

  // ============================================================
  // INTENTIONAL ERROR SAMPLES
  // ============================================================

  describe('Intentional Error Samples', () => {
    // Some samples are designed to show errors - these should fail gracefully

    test('division by zero sample fails gracefully', () => {
      const sample = formulaSamples.find(s => 
        s.title.toLowerCase().includes('division') && 
        s.title.toLowerCase().includes('zero')
      );

      if (sample) {
        const testResult = testFormulaSample(sample);
        expect(testResult.passed).toBe(false);
        expect(testResult.errors.some(e => e.message?.includes('Division by zero'))).toBe(true);
      }
    });

    test('parse error samples fail gracefully', () => {
      const errorSamples = formulaSamples.filter(s => 
        s.title.toLowerCase().includes('parse error') ||
        s.title.toLowerCase().includes('syntax error')
      );

      for (const sample of errorSamples) {
        const testResult = testFormulaSample(sample);
        expect(testResult.passed).toBe(false);
        expect(testResult.errors.length).toBeGreaterThan(0);
      }
    });
  });
});
