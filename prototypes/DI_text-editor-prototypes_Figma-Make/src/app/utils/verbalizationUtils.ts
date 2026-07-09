/**
 * Verbalization Utilities
 * 
 * Utilities for managing natural language variable aliases (verbalizations).
 * Supports bidirectional mapping between technical variable names ($customerName)
 * and business-friendly verbalizations ('customer name').
 * 
 * @module utils/verbalizationUtils
 */

import type { Variable, VerbalizationMap, VerbalizationValidation } from '../components/editors/core/types/EditorTypes';

/**
 * Build bidirectional verbalization map from variables
 * 
 * Creates a two-way lookup table for quick resolution:
 * - Variable name → Verbalization (for display/tooltips)
 * - Verbalization → Variable name (for parser resolution)
 * 
 * @param variables - Array of variables with optional verbalizations
 * @returns Bidirectional mapping object
 * 
 * @example
 * const variables = [
 *   { name: '$customerName', verbalization: 'customer name', ... },
 *   { name: '$totalRevenue', verbalization: 'total revenue', ... }
 * ];
 * const map = buildVerbalizationMap(variables);
 * // map.verbalizationToVariable.get('customer name') → '$customerName'
 * // map.variableToVerbalization.get('$customerName') → 'customer name'
 */
export function buildVerbalizationMap(variables: Variable[]): VerbalizationMap {
  const variableToVerbalization = new Map<string, string>();
  const verbalizationToVariable = new Map<string, string>();
  
  for (const variable of variables) {
    if (variable.verbalization) {
      // Normalize: store in lowercase for case-insensitive matching
      const normalizedVerbalization = variable.verbalization.toLowerCase();
      
      variableToVerbalization.set(variable.name, normalizedVerbalization);
      verbalizationToVariable.set(normalizedVerbalization, variable.name);
    }
  }
  
  return {
    variableToVerbalization,
    verbalizationToVariable
  };
}

/**
 * Validate verbalization for uniqueness and conflicts
 * 
 * Checks:
 * 1. No duplicate verbalizations across variables
 * 2. No conflicts with existing variable names
 * 3. Case-insensitive matching
 * 
 * @param verbalization - The verbalization to validate
 * @param currentVariableName - The variable being edited (to exclude from duplicate check)
 * @param allVariables - All variables in scope
 * @returns Validation result with error message if invalid
 * 
 * @example
 * const result = validateVerbalization(
 *   'customer name',
 *   '$customerName',
 *   variables
 * );
 * if (!result.valid) {
 *   console.error(result.error);
 * }
 */
export function validateVerbalization(
  verbalization: string,
  currentVariableName: string,
  allVariables: Variable[]
): VerbalizationValidation {
  // Empty verbalization is valid (it's optional)
  if (!verbalization || verbalization.trim() === '') {
    return { valid: true };
  }
  
  const trimmed = verbalization.trim();
  const normalized = trimmed.toLowerCase();
  
  // Check for duplicate verbalizations
  const duplicate = allVariables.find(
    v => v.verbalization?.toLowerCase() === normalized && v.name !== currentVariableName
  );
  
  if (duplicate) {
    return {
      valid: false,
      error: `Duplicate verbalization: "${trimmed}" is already used by ${duplicate.name}`,
      conflictingVariable: duplicate.name
    };
  }
  
  // Check for conflicts with variable names
  // A verbalization cannot be the same as any variable name (case-insensitive)
  const conflictingVariable = allVariables.find(
    v => v.name.toLowerCase() === normalized
  );
  
  if (conflictingVariable) {
    return {
      valid: false,
      error: `Verbalization "${trimmed}" conflicts with existing variable name ${conflictingVariable.name}`,
      conflictingVariable: conflictingVariable.name
    };
  }
  
  return { valid: true };
}

/**
 * Resolve verbalization to variable name
 * 
 * Case-insensitive lookup of variable name from verbalization.
 * 
 * @param verbalization - The verbalization to resolve
 * @param map - Verbalization map (from buildVerbalizationMap)
 * @returns Variable name if found, null otherwise
 * 
 * @example
 * const variableName = resolveVerbalization('customer name', map);
 * // Returns: '$customerName'
 */
export function resolveVerbalization(
  verbalization: string,
  map: VerbalizationMap
): string | null {
  const normalized = verbalization.toLowerCase();
  return map.verbalizationToVariable.get(normalized) ?? null;
}

/**
 * Get verbalization for a variable
 * 
 * Lookup verbalization string for a given variable name.
 * 
 * @param variableName - The variable name
 * @param map - Verbalization map (from buildVerbalizationMap)
 * @returns Verbalization if exists, null otherwise
 * 
 * @example
 * const verbalization = getVerbalization('$customerName', map);
 * // Returns: 'customer name'
 */
export function getVerbalization(
  variableName: string,
  map: VerbalizationMap
): string | null {
  return map.variableToVerbalization.get(variableName) ?? null;
}

/**
 * Check if a verbalization exists
 * 
 * @param verbalization - The verbalization to check
 * @param map - Verbalization map
 * @returns True if verbalization is defined
 */
export function hasVerbalization(
  verbalization: string,
  map: VerbalizationMap
): boolean {
  const normalized = verbalization.toLowerCase();
  return map.verbalizationToVariable.has(normalized);
}

/**
 * Get all verbalizations
 * 
 * @param map - Verbalization map
 * @returns Array of all verbalization strings
 */
export function getAllVerbalizations(map: VerbalizationMap): string[] {
  return Array.from(map.verbalizationToVariable.keys());
}

/**
 * Get variables with verbalizations only
 * 
 * Filter variables to only those with defined verbalizations.
 * 
 * @param variables - Array of variables
 * @returns Array of variables that have verbalizations
 */
export function getVariablesWithVerbalizations(variables: Variable[]): Variable[] {
  return variables.filter(v => v.verbalization && v.verbalization.trim() !== '');
}

/**
 * Normalize verbalization for consistent comparison
 * 
 * Rules:
 * - Trim whitespace
 * - Convert to lowercase
 * - Collapse multiple spaces to single space
 * 
 * @param verbalization - Raw verbalization string
 * @returns Normalized verbalization
 * 
 * @example
 * normalizeVerbalization('  Customer  Name  ')
 * // Returns: 'customer name'
 */
export function normalizeVerbalization(verbalization: string): string {
  return verbalization
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' '); // Collapse multiple spaces
}
