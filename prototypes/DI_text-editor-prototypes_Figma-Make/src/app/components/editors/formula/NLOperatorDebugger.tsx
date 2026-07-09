/**
 * Natural Language Operator Debugger
 * 
 * Tests tokenization and parsing of natural language operators
 * Activated with Ctrl+Option+Cmd+D
 */

import { useEffect } from 'react';
import { tokenize } from '../../../services/evaluationEngine/parsers/Tokenizer';
import { FormulaParser } from '../../../services/evaluationEngine/parsers/FormulaParser';

export function NLOperatorDebugger() {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ctrl + Option + Cmd + D
      if (event.ctrlKey && event.altKey && event.metaKey && event.key === 'd') {
        event.preventDefault();
        runDiagnostics();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return null;
}

function runDiagnostics() {
  console.clear();
  console.log('%c═══════════════════════════════════════════════════════════', 'color: #0F62FE;');
  console.log('%c           NL OPERATOR DIAGNOSTICS                         ', 'color: #0F62FE; font-weight: bold;');
  console.log('%c═══════════════════════════════════════════════════════════', 'color: #0F62FE;');
  console.log('');

  const testCases = [
    {
      name: 'Simple Times',
      formula: `'result' = 5 times 3`
    },
    {
      name: 'Multiplied By',
      formula: `'result' = 5 multiplied by 3`
    },
    {
      name: 'Divided By',
      formula: `'result' = 10 divided by 2`
    },
    {
      name: 'Plus',
      formula: `'result' = 5 plus 3`
    },
    {
      name: 'Minus',
      formula: `'result' = 5 minus 3`
    },
    {
      name: 'Squared',
      formula: `'result' = 4 squared`
    },
    {
      name: 'Cubed',
      formula: `'result' = 3 cubed`
    },
    {
      name: 'To The Power Of',
      formula: `'result' = 2 to the power of 8`
    },
    {
      name: 'Verbalization with Times',
      formula: `'subtotal' = 'base amount' times 'quantity'`
    },
    {
      name: 'The Average Of',
      formula: `'avg' = the average of 'prices'`
    },
    {
      name: 'The First Item In',
      formula: `'first' = the first item in 'items'`
    },
  ];

  testCases.forEach((testCase, index) => {
    console.group(`%c${index + 1}. ${testCase.name}`, 'color: #0F62FE; font-weight: bold;');
    console.log(`Formula: ${testCase.formula}`);
    console.log('');

    try {
      // Tokenize
      console.log('%cTokens:', 'color: #24A148; font-weight: bold;');
      const tokens = tokenize(testCase.formula);
      tokens.forEach((token, i) => {
        if (token.type !== 'EOF') {
          console.log(`  ${i}. ${token.type}${token.value !== undefined ? ` (${JSON.stringify(token.value)})` : ''}`);
        }
      });
      console.log('');

      // Parse
      console.log('%cAST:', 'color: #24A148; font-weight: bold;');
      const parser = new FormulaParser(tokens);
      const ast = parser.parse();
      console.log(JSON.stringify(ast, null, 2));
      console.log('');
      console.log('%c✅ Success', 'color: #24A148; font-weight: bold;');
    } catch (error: any) {
      console.log('%c❌ Error:', 'color: #DA1E28; font-weight: bold;');
      console.log(error.message || String(error));
      console.log('');
      console.log('Stack:');
      console.log(error.stack);
    }

    console.groupEnd();
    console.log('');
  });

  console.log('%c═══════════════════════════════════════════════════════════', 'color: #0F62FE;');
  console.log('%cℹ️  Press Ctrl+Option+Cmd+D to run diagnostics again', 'color: #0F62FE; font-style: italic;');
  console.log('');
}
