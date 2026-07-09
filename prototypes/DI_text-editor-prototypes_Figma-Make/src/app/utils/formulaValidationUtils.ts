/**
 * Formula Validation Utilities
 * 
 * Utilities for extracting and processing formula validation warnings and errors.
 * Converts validation issues to line-based highlights for the editor.
 */

import type { ValidationIssue } from '../components/editors/code/FormulaEditor/hooks/useFormulaValidation';
import type { WarningHighlight, ErrorHighlight } from '../components/editors/code/FormulaEditor/FormulaTestPanel';
import type { LineIssue } from '../components/editors/code/FormulaEditor/ErrorWarningList';

/**
 * Extract line numbers from validation warnings
 * Converts character positions to line numbers for editor highlighting
 * 
 * @param formula - The formula text
 * @param warnings - Validation warnings with optional position information
 * @returns Array of warning highlights with line numbers
 */
export function extractWarningLines(
  formula: string,
  warnings: ValidationIssue[]
): WarningHighlight[] {
  if (!formula || !warnings || warnings.length === 0) {
    return [];
  }

  const warningHighlights: WarningHighlight[] = [];
  
  for (const warning of warnings) {
    let line: number | null = null;

    if (warning.position) {
      // Convert character position to line number
      line = getLineNumberFromPosition(formula, warning.position.start);
    } else {
      // Warning without position - try to find it in formula text
      line = findWarningInFormula(formula, warning);
    }

    if (line !== null) {
      warningHighlights.push({
        line,
        message: warning.message,
        code: warning.code,
      });
    }
  }
  
  // Remove duplicate warnings on the same line (keep first)
  const seenLines = new Set<number>();
  return warningHighlights.filter(warning => {
    if (seenLines.has(warning.line)) {
      return false;
    }
    seenLines.add(warning.line);
    return true;
  });
}

/**
 * Convert character position to line number (1-indexed)
 * 
 * @param text - The full text
 * @param position - Character position (0-indexed)
 * @returns Line number (1-indexed)
 */
export function getLineNumberFromPosition(text: string, position: number): number {
  const beforePosition = text.substring(0, position);
  const linesBefore = beforePosition.split('\n');
  return linesBefore.length;
}

/**
 * Try to find warning pattern in formula text
 * Fallback for warnings without explicit position information
 * 
 * @param formula - The formula text
 * @param warning - Validation warning
 * @returns Line number (1-indexed) or null if not found
 */
export function findWarningInFormula(formula: string, warning: ValidationIssue): number | null {
  const lines = formula.split('\n');
  
  // Pattern matching for specific warning types
  switch (warning.code) {
    case 'DIVISION_BY_ZERO':
      // Find line with "/ 0" pattern (literal zero division)
      for (let i = 0; i < lines.length; i++) {
        if (/\/\s*0\s*(?![0-9.])/.test(lines[i])) {
          return i + 1; // 1-indexed
        }
      }
      break;

    case 'EMPTY_PARENS':
      // Find line with empty parentheses
      for (let i = 0; i < lines.length; i++) {
        if (/\(\s*\)/.test(lines[i])) {
          return i + 1;
        }
      }
      break;

    // Add more patterns as needed for other warning types
    default:
      // For warnings without specific patterns, try to find first non-empty line
      // This is a fallback - ideally all warnings should have positions
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim()) {
          return i + 1;
        }
      }
  }
  
  return null;
}

/**
 * Extract line numbers from validation errors
 * Converts character positions to line numbers for editor highlighting
 * 
 * @param formula - The formula text
 * @param errors - Validation errors with optional position information
 * @returns Array of error highlights with line numbers
 */
export function extractErrorLines(
  formula: string,
  errors: ValidationIssue[]
): ErrorHighlight[] {
  if (!formula || !errors || errors.length === 0) {
    return [];
  }

  const errorHighlights: ErrorHighlight[] = [];
  
  for (const error of errors) {
    let line: number | null = null;

    if (error.position) {
      // Convert character position to line number
      line = getLineNumberFromPosition(formula, error.position.start);
    } else {
      // Error without position - try to find it in formula text
      line = findErrorInFormula(formula, error);
    }

    if (line !== null) {
      errorHighlights.push({
        line,
        message: error.message,
      });
    }
  }
  
  return errorHighlights;
}

/**
 * Try to find error pattern in formula text
 * Fallback for errors without explicit position information
 * 
 * @param formula - The formula text
 * @param error - Validation error
 * @returns Line number (1-indexed) or null if not found
 */
export function findErrorInFormula(formula: string, error: ValidationIssue): number | null {
  const lines = formula.split('\n');
  
  // Pattern matching for specific error types
  switch (error.code) {
    case 'UNDEFINED_VARIABLE':
      // Extract variable name from message "Undefined variable: $varName"
      const varMatch = error.message.match(/\$([a-zA-Z_][a-zA-Z0-9_]*)/);
      if (varMatch) {
        const varName = varMatch[0]; // includes $
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(varName)) {
            return i + 1;
          }
        }
      }
      break;

    case 'UNMATCHED_PAREN':
    case 'UNCLOSED_PAREN':
      // Find line with unmatched parentheses
      for (let i = 0; i < lines.length; i++) {
        let count = 0;
        for (const char of lines[i]) {
          if (char === '(') count++;
          if (char === ')') count--;
          if (count < 0) return i + 1;
        }
      }
      break;

    case 'UNCLOSED_STRING':
      // Find line with unclosed string
      for (let i = 0; i < lines.length; i++) {
        const doubleQuotes = (lines[i].match(/"/g) || []).length;
        const singleQuotes = (lines[i].match(/'/g) || []).length;
        if (doubleQuotes % 2 !== 0 || singleQuotes % 2 !== 0) {
          return i + 1;
        }
      }
      break;

    default:
      // For errors without specific patterns, try to find first non-empty line
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim()) {
          return i + 1;
        }
      }
  }
  
  return null;
}

/**
 * Convert validation errors and warnings to line issues for ErrorWarningList
 * 
 * @param formula - The formula text
 * @param errors - Validation errors
 * @param warnings - Validation warnings
 * @returns Array of line issues sorted by line number
 */
export function extractLineIssues(
  formula: string,
  errors: ValidationIssue[],
  warnings: ValidationIssue[]
): LineIssue[] {
  const lineIssues: LineIssue[] = [];
  
  // Process errors
  for (const error of errors) {
    let line: number | null = null;

    if (error.position) {
      line = getLineNumberFromPosition(formula, error.position.start);
    } else {
      line = findErrorInFormula(formula, error);
    }

    if (line !== null) {
      lineIssues.push({
        line,
        type: 'error',
        message: error.message,
        code: error.code,
      });
    }
  }
  
  // Process warnings
  for (const warning of warnings) {
    let line: number | null = null;

    if (warning.position) {
      line = getLineNumberFromPosition(formula, warning.position.start);
    } else {
      line = findWarningInFormula(formula, warning);
    }

    if (line !== null) {
      lineIssues.push({
        line,
        type: 'warning',
        message: warning.message,
        code: warning.code,
      });
    }
  }
  
  // Sort by line number, then by type (errors first)
  return lineIssues.sort((a, b) => {
    if (a.line !== b.line) return a.line - b.line;
    if (a.type === 'error' && b.type === 'warning') return -1;
    if (a.type === 'warning' && b.type === 'error') return 1;
    return 0;
  });
}

/**
 * Get gutter icon data for a specific line
 * Prioritizes errors over warnings when multiple issues exist on the same line
 * 
 * @param line - Line number (1-indexed)
 * @param lineIssues - Array of all line issues
 * @returns Gutter icon data or null if no issues on this line
 */
export function getGutterIconData(
  line: number,
  lineIssues: LineIssue[]
): { type: 'error' | 'warning'; messages: string[] } | null {
  const issuesOnLine = lineIssues.filter(issue => issue.line === line);
  
  if (issuesOnLine.length === 0) {
    return null;
  }
  
  // Prioritize errors over warnings
  const hasError = issuesOnLine.some(issue => issue.type === 'error');
  const type = hasError ? 'error' : 'warning';
  
  // Collect all messages for this line (filtered by prioritized type if mixed)
  const messages = issuesOnLine
    .filter(issue => !hasError || issue.type === 'error')
    .map(issue => issue.message);
  
  return { type, messages };
}
