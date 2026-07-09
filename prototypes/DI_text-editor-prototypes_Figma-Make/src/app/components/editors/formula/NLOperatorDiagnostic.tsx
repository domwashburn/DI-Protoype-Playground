/**
 * Natural Language Operator Diagnostic Tool
 * 
 * Tests tokenization, parsing, and evaluation of natural language operators
 */

import { useState } from 'react';
import { tokenize } from '../../../services/evaluationEngine/parsers/Tokenizer';
import { FormulaParser } from '../../../services/evaluationEngine/parsers/FormulaParser';
import { TracingEvaluator } from '../../../services/evaluationEngine/debugger/TracingEvaluator';
import { createContext } from '../../../services/evaluationEngine/runtime/Context';
import { buildVerbalizationMap } from '../../../utils/verbalizationUtils';
import type { Variable } from '../../core/types';

export function NLOperatorDiagnostic() {
  const [results, setResults] = useState<string>('');

  const runTests = () => {
    let output = '';
    
    // Test formulas
    const tests = [
      {
        name: 'Multiplied By',
        formula: `'subtotal' = 100
'tax rate' = 0.08
'tax' = 'subtotal' multiplied by 'tax rate'
RETURN 'tax'`,
        variables: [
          { id: '1', name: 'subtotal', type: 'number' as const, verbalization: 'subtotal' },
          { id: '2', name: 'taxRate', type: 'number' as const, verbalization: 'tax rate' },
          { id: '3', name: 'tax', type: 'number' as const, verbalization: 'tax' },
        ]
      },
      {
        name: 'Times',
        formula: `'price' = 50
'quantity' = 3
'total' = 'price' times 'quantity'
RETURN 'total'`,
        variables: [
          { id: '1', name: 'price', type: 'number' as const, verbalization: 'price' },
          { id: '2', name: 'quantity', type: 'number' as const, verbalization: 'quantity' },
          { id: '3', name: 'total', type: 'number' as const, verbalization: 'total' },
        ]
      },
      {
        name: 'Divided By',
        formula: `'total' = 100
'count' = 4
'average' = 'total' divided by 'count'
RETURN 'average'`,
        variables: [
          { id: '1', name: 'total', type: 'number' as const, verbalization: 'total' },
          { id: '2', name: 'count', type: 'number' as const, verbalization: 'count' },
          { id: '3', name: 'average', type: 'number' as const, verbalization: 'average' },
        ]
      },
    ];

    for (const test of tests) {
      output += `\n${'='.repeat(80)}\n`;
      output += `TEST: ${test.name}\n`;
      output += `${'='.repeat(80)}\n\n`;
      
      output += `Formula:\n${test.formula}\n\n`;
      
      // Step 1: Tokenize
      output += `STEP 1: TOKENIZATION\n${'-'.repeat(40)}\n`;
      try {
        const tokens = tokenize(test.formula);
        output += `Tokens (${tokens.length}):\n`;
        tokens.forEach((t, i) => {
          output += `  ${i.toString().padStart(2)}: ${t.type.padEnd(20)} | "${t.value}"\n`;
        });
        output += '\n';
      } catch (error: any) {
        output += `❌ TOKENIZATION ERROR: ${error.message}\n\n`;
        continue;
      }
      
      // Step 2: Build verbalization map
      output += `STEP 2: VERBALIZATION MAP\n${'-'.repeat(40)}\n`;
      const verbMap = buildVerbalizationMap(test.variables);
      output += `Verbalizations:\n`;
      for (const [verb, varName] of verbMap.verbalizationToVariable.entries()) {
        output += `  '${verb}' → ${varName}\n`;
      }
      output += '\n';
      
      // Step 3: Parse
      output += `STEP 3: PARSING\n${'-'.repeat(40)}\n`;
      let ast: any;
      try {
        const parser = new FormulaParser();
        ast = parser.parse(test.formula, verbMap);
        output += `✅ Parse successful\n`;
        output += `AST Body (${ast.body.length} statements):\n`;
        ast.body.forEach((stmt: any, i: number) => {
          output += `  ${i}: ${stmt.type}\n`;
          if (stmt.type === 'Assignment') {
            output += `      ${stmt.variable} = ${stmt.value.type}\n`;
            if (stmt.value.type === 'BinaryOp') {
              output += `      Operator: ${stmt.value.operator}\n`;
              output += `      Left: ${stmt.value.left.type} ${stmt.value.left.name || ''}\n`;
              output += `      Right: ${stmt.value.right.type} ${stmt.value.right.value || stmt.value.right.name || ''}\n`;
            }
          }
        });
        output += '\n';
      } catch (error: any) {
        output += `❌ PARSE ERROR: ${error.message}\n`;
        if (error.stack) {
          output += `Stack: ${error.stack.split('\n').slice(0, 5).join('\n')}\n`;
        }
        output += '\n';
        continue;
      }
      
      // Step 4: Evaluate
      output += `STEP 4: EVALUATION\n${'-'.repeat(40)}\n`;
      try {
        const evaluator = new TracingEvaluator();
        const context = createContext({
          variables: new Map(),
          attributes: new Map()
        });
        
        const result = evaluator.evaluate(test.formula, context, verbMap);
        
        if (result.success) {
          output += `✅ EVALUATION SUCCESS\n`;
          output += `Result: ${result.value}\n`;
          output += `Parse time: ${result.parseTimeMs.toFixed(2)}ms\n`;
          output += `Exec time: ${result.execTimeMs.toFixed(2)}ms\n`;
        } else {
          output += `❌ EVALUATION FAILED\n`;
          result.errors.forEach((err: any) => {
            output += `Error: ${err.message}\n`;
          });
        }
      } catch (error: any) {
        output += `❌ EVALUATION EXCEPTION: ${error.message}\n`;
        if (error.stack) {
          output += `Stack:\n${error.stack}\n`;
        }
      }
      
      output += '\n';
    }
    
    setResults(output);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>Natural Language Operator Diagnostic</h2>
      <button 
        onClick={runTests}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#0F62FE',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Run Diagnostic Tests
      </button>
      
      {results && (
        <pre style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f4f4f4',
          border: '1px solid #ddd',
          borderRadius: '4px',
          overflow: 'auto',
          maxHeight: '80vh',
          fontSize: '12px',
          lineHeight: '1.4'
        }}>
          {results}
        </pre>
      )}
    </div>
  );
}
