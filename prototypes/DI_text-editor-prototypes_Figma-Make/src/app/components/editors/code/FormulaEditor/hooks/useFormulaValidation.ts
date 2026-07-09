/**
 * useFormulaValidation - Formula Validation Hook
 * 
 * Provides real-time validation for formula expressions.
 * Validates syntax, variable usage, and expression structure.
 * 
 * @example
 * const { errors, warnings, validate } = useFormulaValidation(variables);
 * const result = validate('$amount * 1.05');
 */

import { useCallback, useMemo } from 'react';
import type { Variable } from '../../../core/types';

/**
 * Infer the type of an expression based on its structure
 * This is a simple heuristic-based type inference
 */
function inferExpressionType(expression: string): 'number' | 'string' | 'boolean' | 'date' | 'datetime' | 'time' | 'list' | 'object' | 'unknown' {
  const trimmed = expression.trim();
  
  // Check for date subtraction (date - date = time duration)
  // Pattern: #attr1 - #attr2 where both are dates
  const dateSubPattern = /#[a-zA-Z_][a-zA-Z0-9_.]*\s*-\s*#[a-zA-Z_][a-zA-Z0-9_.]*/;
  if (dateSubPattern.test(trimmed)) {
    // This is likely date arithmetic producing a time duration
    return 'time';
  }
  
  // Check for string literals
  if (trimmed.startsWith('"') || trimmed.startsWith("'")) {
    return 'string';
  }
  
  // Check for boolean literals
  if (trimmed === 'true' || trimmed === 'FALSE' || trimmed === 'TRUE' || trimmed === 'false') {
    return 'boolean';
  }
  
  // Check for number literals
  if (/^-?\d+\.?\d*$/.test(trimmed)) {
    return 'number';
  }
  
  // Check for list literals
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return 'list';
  }
  
  // Check for object literals
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return 'object';
  }
  
  // IMPORTANT: Function checks must come BEFORE generic string literal checks
  // Otherwise expressions like SPLIT($data, ",") will be incorrectly classified as string
  // because they contain quote characters in their arguments
  
  // Check for numeric functions (including LENGTH and list aggregates)
  if (/^(SUM|AVG|AVERAGE|MAX|MIN|COUNT|ABS|ROUND|FLOOR|CEIL|SQRT|POW|MINUTES_BETWEEN|HOURS_BETWEEN|DAYS_BETWEEN|SECONDS_BETWEEN|MILLISECONDS_BETWEEN|TIME_TO_MINUTES|TIME_TO_HOURS|TIME_TO_SECONDS|YEAR|MONTH|DAY|HOUR|MINUTE|SECOND|WEEKDAY|LENGTH|LIST_SUM|LIST_AVG|LIST_MIN|LIST_MAX|INDEX_OF)\s*\(/i.test(trimmed)) {
    return 'number';
  }
  
  // Check for boolean functions
  if (/^(IS_WEEKEND|IS_WEEKDAY|CONTAINS)\s*\(/i.test(trimmed)) {
    return 'boolean';
  }
  
  // Check for date functions
  if (/^(DATE|NOW|TODAY|YEAR|MONTH|DAY)\s*\(/i.test(trimmed)) {
    return 'date';
  }
  
  // Check for datetime functions
  if (/^(DATE_ADD|DATE_SUBTRACT)\s*\(/i.test(trimmed)) {
    return 'datetime';
  }
  
  // NOW and TODAY return datetime/date
  if (/^NOW\s*\(/i.test(trimmed)) {
    return 'datetime';
  }
  
  if (/^TODAY\s*\(/i.test(trimmed)) {
    return 'date';
  }
  
  // Check for string functions (removed LENGTH - it returns number)
  if (/^(UPPER|LOWER|TRIM|JOIN)\s*\(/i.test(trimmed)) {
    return 'string';
  }
  
  // List functions that return lists
  if (/^(SPLIT|SORT|SORT_DESC|REVERSE|SLICE|CONCAT|UNIQUE|RANGE)\s*\(/i.test(trimmed)) {
    return 'list';
  }
  
  // FIRST and LAST return element type (unknown without more context)
  if (/^(FIRST|LAST)\s*\(/i.test(trimmed)) {
    return 'unknown';
  }
  
  // Check for string concatenation patterns (must come AFTER function checks)
  if (trimmed.includes('"') || trimmed.includes("'")) {
    return 'string'; // If any string literal, likely string result
  }
  
  // Check for boolean operators
  if (/\b(AND|OR|NOT|>=|<=|>|<|==|!=)\b/.test(trimmed)) {
    return 'boolean';
  }
  
  // Check for arithmetic operators (without string literals)
  if (/[+\-*\/]/.test(trimmed) && !trimmed.includes('"') && !trimmed.includes("'")) {
    return 'number';
  }
  
  // Check for IF expressions (can return any type)
  if (/^(IF|ELSIF)\b/i.test(trimmed)) {
    return 'unknown';
  }
  
  return 'unknown';
}

/**
 * Check if a source type can be coerced to a target type
 * Based on the TypeSystem coercion rules
 * 
 * IMPORTANT: In a dynamic formula language, variables can hold any type.
 * The "type" declaration is a hint/default, but assignments can change the type.
 * We only flag truly incompatible operations (e.g., adding string + object).
 */
function isTypeCoercible(sourceType: string, targetType: string): boolean {
  // Same type is always compatible
  if (sourceType === targetType) {
    return true;
  }
  
  // Unknown types are always compatible (can't validate)
  if (sourceType === 'unknown' || targetType === 'unknown') {
    return true;
  }
  
  // String can be coerced to any type
  if (targetType === 'string') {
    return true;
  }
  
  // Number coercions
  if (targetType === 'number') {
    return ['string', 'boolean', 'date', 'datetime', 'time'].includes(sourceType);
  }
  
  // Boolean coercions
  if (targetType === 'boolean') {
    return ['string', 'number'].includes(sourceType);
  }
  
  // Date coercions
  if (targetType === 'date') {
    return ['string', 'number', 'datetime'].includes(sourceType);
  }
  
  // Datetime coercions (date and datetime are interchangeable)
  if (targetType === 'datetime') {
    return ['string', 'number', 'date'].includes(sourceType);
  }
  
  // Time coercions (KEY: Allow number and string to coerce to time)
  if (targetType === 'time') {
    return ['number', 'string'].includes(sourceType);
  }
  
  // List types - DYNAMIC: Allow assignment to change type
  // In a formula language, if you assign a list to a number variable, it becomes a list variable
  if (targetType === 'list' || sourceType === 'list') {
    return true; // Allow lists to be assigned to any declared type
  }
  
  // Object types - DYNAMIC: Allow assignment to change type  
  if (targetType === 'object' || sourceType === 'object') {
    return true; // Allow objects to be assigned to any declared type
  }
  
  return false;
}

/**
 * Validation error types
 */
export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationIssue {
  severity: ValidationSeverity;
  message: string;
  position?: {
    start: number;
    end: number;
  };
  code: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  info: ValidationIssue[];
}

/**
 * Formula validation hook
 * 
 * Note: Undefined variables are always flagged as errors, even while editing.
 * This provides immediate feedback about which variables are not defined.
 */
export function useFormulaValidation(
  variables: Variable[] = []
) {
  /**
   * Variable name lookup for fast validation
   */
  const variableNameSet = useMemo(() => {
    return new Set(variables.map(v => v.name));
  }, [variables]);

  /**
   * Validate formula expression
   */
  const validate = useCallback((formula: string): ValidationResult => {
    const issues: ValidationIssue[] = [];

    if (!formula || formula.trim() === '') {
      return {
        valid: true,
        issues: [],
        errors: [],
        warnings: [],
        info: [],
      };
    }

    // Strip comments before validation to avoid false positives with //
    // This prevents "//" in comments from being flagged as invalid operator sequence
    const formulaWithoutComments = formula.replace(/\/\/.*$/gm, '');

    // 1. Check for undefined variables
    const variablePattern = /\$([a-zA-Z_][a-zA-Z0-9_]*)/g;
    let match;
    while ((match = variablePattern.exec(formulaWithoutComments)) !== null) {
      const varName = match[1];
      
      // Always flag undefined variables (no suppression while editing)
      if (!variableNameSet.has(varName)) {
        issues.push({
          severity: 'error',
          message: `Undefined variable: $${varName}`,
          position: {
            start: match.index,
            end: match.index + match[0].length,
          },
          code: 'UNDEFINED_VARIABLE',
        });
      }
    }

    // 2. Check for unmatched parentheses
    let parenCount = 0;
    let bracketCount = 0;
    for (let i = 0; i < formulaWithoutComments.length; i++) {
      const char = formulaWithoutComments[i];
      if (char === '(') parenCount++;
      if (char === ')') parenCount--;
      if (char === '[') bracketCount++;
      if (char === ']') bracketCount--;

      if (parenCount < 0) {
        issues.push({
          severity: 'error',
          message: 'Unmatched closing parenthesis',
          position: { start: i, end: i + 1 },
          code: 'UNMATCHED_PAREN',
        });
        parenCount = 0; // Reset to continue checking
      }
      if (bracketCount < 0) {
        issues.push({
          severity: 'error',
          message: 'Unmatched closing bracket',
          position: { start: i, end: i + 1 },
          code: 'UNMATCHED_BRACKET',
        });
        bracketCount = 0;
      }
    }

    if (parenCount > 0) {
      issues.push({
        severity: 'error',
        message: `${parenCount} unclosed parenthesis(es)`,
        code: 'UNCLOSED_PAREN',
      });
    }
    if (bracketCount > 0) {
      issues.push({
        severity: 'error',
        message: `${bracketCount} unclosed bracket(s)`,
        code: 'UNCLOSED_BRACKET',
      });
    }

    // 3. Check for empty parentheses (but not for nullary functions)
    // Nullary functions are valid utility functions that don't require parameters
    const nullaryFunctions = [
      'NOW', 'TODAY', 'TRUE', 'FALSE', 'NULL', 'PI', 'E'
    ];
    
    const emptyParensPattern = /\(\s*\)/g;
    while ((match = emptyParensPattern.exec(formulaWithoutComments)) !== null) {
      // Check if this is preceded by a nullary function name
      const beforeParen = formulaWithoutComments.substring(0, match.index).trim();
      const isNullaryFunction = nullaryFunctions.some(fn => 
        new RegExp(`\\b${fn}$`, 'i').test(beforeParen)
      );
      
      if (!isNullaryFunction) {
        issues.push({
          severity: 'warning',
          message: 'Empty parentheses found',
          position: {
            start: match.index,
            end: match.index + match[0].length,
          },
          code: 'EMPTY_PARENS',
        });
      }
    }

    // 4. Check for consecutive operators (except for negative numbers)
    // Now uses formulaWithoutComments to avoid false positives with //
    const consecutiveOpsPattern = /[+*/%=<>!&|]{2,}|(?<!\d)--/g;
    while ((match = consecutiveOpsPattern.exec(formulaWithoutComments)) !== null) {
      // Skip valid cases like >= <= == != && ||
      const validPatterns = ['>=', '<=', '==', '!=', '&&', '||', '**'];
      if (!validPatterns.includes(match[0])) {
        issues.push({
          severity: 'error',
          message: 'Invalid operator sequence',
          position: {
            start: match.index,
            end: match.index + match[0].length,
          },
          code: 'INVALID_OPERATORS',
        });
      }
    }

    // 5. Check for division by zero (literal zero)
    const divByZeroPattern = /\/\s*0\s*(?![0-9.])/g;
    while ((match = divByZeroPattern.exec(formulaWithoutComments)) !== null) {
      issues.push({
        severity: 'warning',
        message: 'Division by zero',
        position: {
          start: match.index,
          end: match.index + match[0].length,
        },
        code: 'DIVISION_BY_ZERO',
      });
    }

    // 6. Check for unclosed string literals
    // CRITICAL: Remove comments first to avoid false positives from apostrophes in comments
    // Example: "// Calculate top performers' total" contains an apostrophe in a comment
    const stringPattern = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g;
    const strings = formulaWithoutComments.match(stringPattern) || [];
    const quoteCountDouble = (formulaWithoutComments.match(/"/g) || []).length;
    const quoteCountSingle = (formulaWithoutComments.match(/'/g) || []).length;
    
    // Count escaped quotes (these don't count as unclosed)
    const escapedDoubleQuotes = (formulaWithoutComments.match(/\\"/g) || []).length;
    const escapedSingleQuotes = (formulaWithoutComments.match(/\\'/g) || []).length;
    
    const actualDoubleQuotes = quoteCountDouble - escapedDoubleQuotes;
    const actualSingleQuotes = quoteCountSingle - escapedSingleQuotes;
    
    if (actualDoubleQuotes % 2 !== 0) {
      issues.push({
        severity: 'error',
        message: 'Unclosed string literal (double quote)',
        code: 'UNCLOSED_STRING',
      });
    }
    if (actualSingleQuotes % 2 !== 0) {
      issues.push({
        severity: 'error',
        message: 'Unclosed string literal (single quote)',
        code: 'UNCLOSED_STRING',
      });
    }

    // 7. Check for empty formula (only whitespace)
    if (formula.trim() === '') {
      issues.push({
        severity: 'info',
        message: 'Formula is empty',
        code: 'EMPTY_FORMULA',
      });
    }

    // 8. Warn about unused variables
    const usedVariables = new Set<string>();
    const usedVarPattern = /\$([a-zA-Z_][a-zA-Z0-9_]*)/g;
    while ((match = usedVarPattern.exec(formula)) !== null) {
      usedVariables.add(match[1]);
    }

    variables.forEach(v => {
      if (!usedVariables.has(v.name)) {
        issues.push({
          severity: 'info',
          message: `Variable $${v.name} is defined but not used`,
          code: 'UNUSED_VARIABLE',
        });
      }
    });

    // 9. Check for type mismatches in assignments
    // Pattern: $variableName = expression
    const assignmentPattern = /\$([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*([^=\n]+)/g;
    while ((match = assignmentPattern.exec(formulaWithoutComments)) !== null) {
      const varName = match[1];
      const expression = match[2].trim();
      
      // Find the variable definition
      const variable = variables.find(v => v.name === varName);
      if (!variable) continue; // Skip if undefined (already caught above)
      
      // Infer the type of the expression
      const expressionType = inferExpressionType(expression);
      
      // Check for type mismatch - allow coercible types
      if (expressionType !== 'unknown' && !isTypeCoercible(expressionType, variable.type)) {
        issues.push({
          severity: 'error',
          message: `Type mismatch: $${varName} is declared as ${variable.type}, but assigned ${expressionType} expression (cannot coerce)`,
          position: {
            start: match.index,
            end: match.index + match[0].length,
          },
          code: 'TYPE_MISMATCH_ASSIGNMENT',
        });
      }
    }

    // Categorize issues
    const errors = issues.filter(i => i.severity === 'error');
    const warnings = issues.filter(i => i.severity === 'warning');
    const info = issues.filter(i => i.severity === 'info');

    return {
      valid: errors.length === 0,
      issues,
      errors,
      warnings,
      info,
    };
  }, [variableNameSet, variables]);

  /**
   * Validate just the syntax (no semantic checks)
   */
  const validateSyntax = useCallback((formula: string): boolean => {
    const result = validate(formula);
    return result.errors.length === 0;
  }, [validate]);

  /**
   * Get human-readable error summary
   */
  const getErrorSummary = useCallback((result: ValidationResult): string => {
    if (result.valid) return 'Valid formula';
    
    const errorCount = result.errors.length;
    const warningCount = result.warnings.length;
    
    const parts: string[] = [];
    if (errorCount > 0) {
      parts.push(`${errorCount} error${errorCount > 1 ? 's' : ''}`);
    }
    if (warningCount > 0) {
      parts.push(`${warningCount} warning${warningCount > 1 ? 's' : ''}`);
    }
    
    return parts.join(', ');
  }, []);

  return {
    validate,
    validateSyntax,
    getErrorSummary,
  };
}