/**
 * useFormulaVariables - Formula Variable Management Hook
 * 
 * Manages formula variables with real-time synchronization between
 * variable definitions and their usage in formulas.
 * 
 * Features:
 * - Automatic variable renaming in formulas
 * - Variable usage tracking
 * - Duplicate name detection
 * - Type management
 * 
 * @example
 * const { renameVariable, getVariableUsageCount } = useFormulaVariables(
 *   formula,
 *   variables,
 *   onFormulaChange,
 *   onVariablesChange
 * );
 */

import { useCallback, useMemo } from 'react';
import type { Variable } from '../../../core/types';
import { replaceVariableName } from '../../../../../utils/variableRename';

export interface VariableUsageInfo {
  variable: Variable;
  usageCount: number;
  positions: { start: number; end: number }[];
}

/**
 * Formula variable management hook
 */
export function useFormulaVariables(
  formula: string,
  variables: Variable[],
  onFormulaChange?: (formula: string) => void,
  onVariablesChange?: (variables: Variable[]) => void
) {
  /**
   * Get usage count and positions for a variable
   */
  const getVariableUsage = useCallback((variableName: string): VariableUsageInfo | null => {
    const variable = variables.find(v => v.name === variableName);
    if (!variable) return null;

    const positions: { start: number; end: number }[] = [];
    const pattern = new RegExp(`\\$${variableName}\\b`, 'g');
    let match;

    while ((match = pattern.exec(formula)) !== null) {
      positions.push({
        start: match.index,
        end: match.index + match[0].length,
      });
    }

    return {
      variable,
      usageCount: positions.length,
      positions,
    };
  }, [formula, variables]);

  /**
   * Get usage count for a variable (shorthand)
   */
  const getVariableUsageCount = useCallback((variableName: string): number => {
    const usage = getVariableUsage(variableName);
    return usage ? usage.usageCount : 0;
  }, [getVariableUsage]);

  /**
   * Get all variable usage statistics
   */
  const getAllVariableUsage = useMemo(() => {
    return variables.map(v => ({
      variable: v,
      usageCount: getVariableUsageCount(v.name),
    }));
  }, [variables, getVariableUsageCount]);

  /**
   * Rename a variable throughout the formula
   */
  const renameVariable = useCallback((oldName: string, newName: string): boolean => {
    if (!onFormulaChange || !onVariablesChange) return false;
    if (oldName === newName) return true;

    // Check if new name already exists
    const nameExists = variables.some(v => v.name === newName && v.name !== oldName);
    if (nameExists) {
      return false;
    }

    // Rename in formula
    const newFormula = replaceVariableName(formula, oldName, newName);

    // Update variable definition
    const newVariables = variables.map(v =>
      v.name === oldName ? { ...v, name: newName } : v
    );

    // Apply changes
    onFormulaChange(newFormula);
    onVariablesChange(newVariables);

    return true;
  }, [formula, variables, onFormulaChange, onVariablesChange]);

  /**
   * Delete a variable and remove its usage from formula
   */
  const deleteVariable = useCallback((variableName: string): boolean => {
    if (!onFormulaChange || !onVariablesChange) return false;

    // Remove from variables array
    const newVariables = variables.filter(v => v.name !== variableName);

    // Remove from formula (replace with placeholder or empty)
    const pattern = new RegExp(`\\$${variableName}\\b`, 'g');
    const newFormula = formula.replace(pattern, `[DELETED:$${variableName}]`);

    onVariablesChange(newVariables);
    onFormulaChange(newFormula);

    return true;
  }, [formula, variables, onFormulaChange, onVariablesChange]);

  /**
   * Add a new variable
   */
  const addVariable = useCallback((variable: Omit<Variable, 'id'>): Variable | null => {
    if (!onVariablesChange) return null;

    // Check for duplicate name
    const nameExists = variables.some(v => v.name === variable.name);
    if (nameExists) {
      return null;
    }

    // Create variable with ID
    const newVariable: Variable = {
      ...variable,
      id: `var-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    onVariablesChange([...variables, newVariable]);
    return newVariable;
  }, [variables, onVariablesChange]);

  /**
   * Update a variable's properties (except name, use renameVariable for that)
   */
  const updateVariable = useCallback((
    id: string,
    updates: Partial<Omit<Variable, 'id' | 'name'>>
  ): boolean => {
    if (!onVariablesChange) return false;

    const newVariables = variables.map(v =>
      v.id === id ? { ...v, ...updates } : v
    );

    onVariablesChange(newVariables);
    return true;
  }, [variables, onVariablesChange]);

  /**
   * Check if a variable name is valid and available
   */
  const isVariableNameValid = useCallback((name: string, currentId?: string): {
    valid: boolean;
    reason?: string;
  } => {
    // Check if empty
    if (!name || name.trim() === '') {
      return { valid: false, reason: 'Name cannot be empty' };
    }

    // Check if starts with number
    if (/^[0-9]/.test(name)) {
      return { valid: false, reason: 'Name cannot start with a number' };
    }

    // Check if contains invalid characters
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
      return { valid: false, reason: 'Name can only contain letters, numbers, and underscores' };
    }

    // Check if name is already used (by a different variable)
    const nameExists = variables.some(v => v.name === name && v.id !== currentId);
    if (nameExists) {
      return { valid: false, reason: 'Name already exists' };
    }

    return { valid: true };
  }, [variables]);

  /**
   * Get undefined variables (used in formula but not defined)
   */
  const getUndefinedVariables = useMemo(() => {
    const definedNames = new Set(variables.map(v => v.name));
    const usedVariables = new Set<string>();

    const pattern = /\$([a-zA-Z_][a-zA-Z0-9_]*)/g;
    let match;

    while ((match = pattern.exec(formula)) !== null) {
      usedVariables.add(match[1]);
    }

    return Array.from(usedVariables).filter(name => !definedNames.has(name));
  }, [formula, variables]);

  /**
   * Auto-fix undefined variables by creating them
   */
  const autoCreateUndefinedVariables = useCallback((): Variable[] => {
    if (!onVariablesChange) return [];

    const undefinedVars = getUndefinedVariables;
    const newVariables: Variable[] = undefinedVars.map(name => ({
      id: `var-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      type: 'number',
      description: 'Auto-created variable',
    }));

    if (newVariables.length > 0) {
      onVariablesChange([...variables, ...newVariables]);
    }

    return newVariables;
  }, [getUndefinedVariables, variables, onVariablesChange]);

  return {
    // Usage tracking
    getVariableUsage,
    getVariableUsageCount,
    getAllVariableUsage,
    
    // CRUD operations
    renameVariable,
    deleteVariable,
    addVariable,
    updateVariable,
    
    // Validation
    isVariableNameValid,
    getUndefinedVariables,
    autoCreateUndefinedVariables,
  };
}