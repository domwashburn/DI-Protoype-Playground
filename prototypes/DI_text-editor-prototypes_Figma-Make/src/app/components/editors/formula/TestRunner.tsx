/**
 * Test Runner Component
 * 
 * Provides keyboard shortcut (Ctrl+Option+Cmd+T) to run test suite
 * and display results in console with beautiful formatting
 */

import { useEffect, useState } from 'react';
import { TracingEvaluator } from '../../../services/evaluationEngine/debugger/TracingEvaluator';
import { createContext } from '../../../services/evaluationEngine/runtime/Context';
import { formulaSamples } from '../../../SampleData/formulaSamples';
import type { VerbalizationMap } from '../../core/types';
import { buildVerbalizationMap } from '../../../utils/verbalizationUtils';

interface TestResult {
  sampleId: string;
  title: string;
  passed: boolean;
  error?: string;
  duration: number;
}

interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  duration: number;
  results: TestResult[];
}

export function TestRunner() {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ctrl + Option + Cmd + T
      if (event.ctrlKey && event.altKey && event.metaKey && event.key === 't') {
        event.preventDefault();
        runTests();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const runTests = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    console.clear();
    
    // Beautiful header
    console.log('%c╔═══════════════════════════════════════════════════════════╗', 'color: #0F62FE; font-weight: bold;');
    console.log('%c║         FORMULA EDITOR TEST SUITE                         ║', 'color: #0F62FE; font-weight: bold;');
    console.log('%c╚═══════════════════════════════════════════════════════════╝', 'color: #0F62FE; font-weight: bold;');
    console.log('');
    console.log('%cRunning comprehensive formula tests...', 'color: #8A3FFC; font-weight: bold;');
    console.log('');

    const startTime = performance.now();
    const results: TestResult[] = [];
    const evaluator = new TracingEvaluator();

    for (const sample of formulaSamples) {
      const sampleStartTime = performance.now();
      
      try {
        // Create context from sample
        const variables = new Map();
        const attributes = new Map();

        if (sample.variables) {
          for (const varDef of sample.variables) {
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

        // Build verbalization map from variable definitions
        // CRITICAL: Map keys must be lowercase for case-insensitive resolution
        const verbalizationMap: VerbalizationMap = buildVerbalizationMap(sample.variables);
        
        const context = createContext({ variables, attributes });
        
        // Pass verbalization map to evaluator
        const result = evaluator.evaluate(sample.formula, context, verbalizationMap);

        const duration = performance.now() - sampleStartTime;

        if (result.success) {
          results.push({
            sampleId: sample.id,
            title: sample.title,
            passed: true,
            duration
          });
        } else {
          results.push({
            sampleId: sample.id,
            title: sample.title,
            passed: false,
            error: result.errors[0]?.message || 'Unknown error',
            duration
          });
        }
      } catch (error: any) {
        const duration = performance.now() - sampleStartTime;
        results.push({
          sampleId: sample.id,
          title: sample.title,
          passed: false,
          error: error.message || String(error),
          duration
        });
      }
    }

    const totalDuration = performance.now() - startTime;
    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed).length;

    const summary: TestSummary = {
      total: results.length,
      passed,
      failed,
      duration: totalDuration,
      results
    };

    // Display results
    displayResults(summary);
    
    setIsRunning(false);
  };

  return null; // This component doesn't render anything
}

function displayResults(summary: TestSummary) {
  console.log('');
  console.log('%c═══════════════════════════════════════════════════════════', 'color: #0F62FE;');
  console.log('%c                    TEST RESULTS                           ', 'color: #0F62FE; font-weight: bold;');
  console.log('%c═══════════════════════════════════════════════════════════', 'color: #0F62FE;');
  console.log('');

  // Summary stats
  const passRate = ((summary.passed / summary.total) * 100).toFixed(1);
  const successColor = summary.failed === 0 ? '#24A148' : summary.passed > summary.failed ? '#F1C21B' : '#DA1E28';
  
  console.log(`%c📊 SUMMARY:`, 'font-weight: bold; font-size: 14px;');
  console.log(`   Total:    ${summary.total} tests`);
  console.log(`%c   ✅ Passed:  ${summary.passed} tests`, 'color: #24A148;');
  console.log(`%c   ❌ Failed:  ${summary.failed} tests`, 'color: #DA1E28;');
  console.log(`%c   📈 Pass Rate: ${passRate}%`, `color: ${successColor}; font-weight: bold;`);
  console.log(`   ⏱️  Duration: ${summary.duration.toFixed(0)}ms`);
  console.log('');

  // Failed tests (if any)
  if (summary.failed > 0) {
    console.log('%c❌ FAILED TESTS:', 'color: #DA1E28; font-weight: bold; font-size: 14px;');
    console.log('');
    
    const failedResults = summary.results.filter(r => !r.passed);
    failedResults.forEach((result, index) => {
      console.group(`%c${index + 1}. ${result.title}`, 'color: #DA1E28; font-weight: bold;');
      console.log(`ID: ${result.sampleId}`);
      console.log(`%cError: ${result.error}`, 'color: #DA1E28;');
      console.log(`Duration: ${result.duration.toFixed(2)}ms`);
      console.groupEnd();
    });
    
    console.log('');
  }

  // Passed tests summary
  if (summary.passed > 0) {
    console.log('%c✅ PASSED TESTS:', 'color: #24A148; font-weight: bold; font-size: 14px;');
    console.log('');
    
    const passedResults = summary.results.filter(r => r.passed);
    
    // Group by category
    const categories: Record<string, TestResult[]> = {};
    passedResults.forEach(result => {
      // Extract category from ID (e.g., "customer-discount" -> "Customer")
      const category = result.title.split(' ')[0] || 'Other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(result);
    });

    Object.entries(categories).forEach(([category, tests]) => {
      console.group(`%c${category} (${tests.length})`, 'color: #24A148;');
      tests.forEach(test => {
        console.log(`%c✓ ${test.title}`, 'color: #24A148;', `(${test.duration.toFixed(1)}ms)`);
      });
      console.groupEnd();
    });
    
    console.log('');
  }

  // Performance analysis
  const avgDuration = summary.results.reduce((sum, r) => sum + r.duration, 0) / summary.results.length;
  const slowTests = summary.results
    .filter(r => r.duration > avgDuration * 2)
    .sort((a, b) => b.duration - a.duration);

  if (slowTests.length > 0) {
    console.log('%c⚠️  SLOW TESTS (>2x average):', 'color: #F1C21B; font-weight: bold;');
    console.log('');
    slowTests.forEach((test, index) => {
      console.log(`%c${index + 1}. ${test.title}`, 'color: #F1C21B;', `${test.duration.toFixed(1)}ms`);
    });
    console.log('');
  }

  // Final status
  console.log('%c═══════════════════════════════════════════════════════════', 'color: #0F62FE;');
  if (summary.failed === 0) {
    console.log('%c🎉 ALL TESTS PASSED! 🎉', 'color: #24A148; font-weight: bold; font-size: 16px; background: #E5F6EC; padding: 8px;');
  } else {
    console.log(`%c⚠️  ${summary.failed} TEST${summary.failed > 1 ? 'S' : ''} FAILED`, 'color: #DA1E28; font-weight: bold; font-size: 16px; background: #FFF1F1; padding: 8px;');
  }
  console.log('%c═══════════════════════════════════════════════════════════', 'color: #0F62FE;');
  console.log('');
  console.log('%cℹ️  Tip: Press Ctrl+Option+Cmd+T to run tests again', 'color: #0F62FE; font-style: italic;');
  console.log('');
}