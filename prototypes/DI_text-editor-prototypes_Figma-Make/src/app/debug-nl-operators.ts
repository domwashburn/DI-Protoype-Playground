/**
 * Debug script for natural language operators
 */

import { tokenize } from './services/evaluationEngine/parsers/Tokenizer';
import { FormulaParser } from './services/evaluationEngine/parsers/FormulaParser';
import { TracingEvaluator } from './services/evaluationEngine/debugger/TracingEvaluator';
import { createContext } from './services/evaluationEngine/runtime/Context';
import { buildVerbalizationMap } from './utils/verbalizationUtils';
import type { Variable } from './components/editors/core/types';

// Test case 1: Simple multiplication with verbalizations
const testFormula1 = `'subtotal' = 100
'tax rate' = 0.08
'tax' = 'subtotal' multiplied by 'tax rate'
RETURN 'tax'`;

const variables1: Variable[] = [
  {
    id: '1',
    name: 'subtotal',
    type: 'number',
    verbalization: 'subtotal',
  },
  {
    id: '2',
    name: 'taxRate',
    type: 'number',
    verbalization: 'tax rate',
  },
  {
    id: '3',
    name: 'tax',
    type: 'number',
    verbalization: 'tax',
  },
];

console.log('='.repeat(80));
console.log('DEBUG: Natural Language Operators Test');
console.log('='.repeat(80));
console.log('');

console.log('Test Formula:');
console.log(testFormula1);
console.log('');

// Step 1: Tokenize
console.log('STEP 1: Tokenizing...');
const tokens = tokenize(testFormula1);
console.log('Tokens:', tokens.map(t => `${t.type}(${t.value})`).join(' '));
console.log('');

// Step 2: Build verbalization map
console.log('STEP 2: Building verbalization map...');
const verbMap = buildVerbalizationMap(variables1);
console.log('Verbalization Map:');
console.log('  variableToVerbalization:', Array.from(verbMap.variableToVerbalization.entries()));
console.log('  verbalizationToVariable:', Array.from(verbMap.verbalizationToVariable.entries()));
console.log('');

// Step 3: Parse
console.log('STEP 3: Parsing...');
try {
  const parser = new FormulaParser();
  const ast = parser.parse(testFormula1, verbMap);
  console.log('AST:', JSON.stringify(ast, null, 2));
  console.log('');
} catch (error: any) {
  console.error('Parse Error:', error.message);
  console.log('');
}

// Step 4: Evaluate
console.log('STEP 4: Evaluating...');
try {
  const evaluator = new TracingEvaluator();
  const context = createContext({
    variables: new Map(),
    attributes: new Map()
  });
  
  const result = evaluator.evaluate(testFormula1, context, verbMap);
  
  if (result.success) {
    console.log('✅ Success! Result:', result.value);
  } else {
    console.log('❌ Evaluation failed:', result.errors);
  }
} catch (error: any) {
  console.error('❌ Evaluation error:', error.message);
  console.error('Stack:', error.stack);
}

console.log('');
console.log('='.repeat(80));
