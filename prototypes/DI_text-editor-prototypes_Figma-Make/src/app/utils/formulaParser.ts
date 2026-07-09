/**
 * Formula Parser Utility
 * 
 * Provides utilities for parsing formula content to detect defined variables,
 * used variables (parameters), and other formula analysis.
 * 
 * IBM ADS/ODM Compatibility:
 * - Supports both implicit returns (last expression) and explicit RETURN statements
 * - RETURN keyword is optional and follows IBM ADS/ODM conventions where some
 *   rule types require explicit RETURN (boxed expressions, BOM methods, IRL functions)
 *   while others use implicit returns (action rules, decision tables)
 * 
 * The key insight: Variables on the LEFT side of `=` are being DEFINED.
 * Variables on the RIGHT side of `=` are being USED (parameters).
 * 
 * @example
 * // Formula: $baseScore = ($creditScore / 650) * 100
 * // Defined: baseScore
 * // Used: creditScore
 * 
 * @example
 * // Explicit return (IBM ADS/ODM style)
 * // Formula: RETURN $result * 1.05
 * // Used: result
 */

/**
 * Extracts variable names that are DEFINED in the formula (left side of = in assignments)
 * 
 * IMPORTANT: This distinguishes between:
 * - ASSIGNMENT: $var = value (defines the variable)
 * - COMPARISON: $var = value in IF/ELSIF conditions (just reads the variable)
 * 
 * Also detects verbalization assignments:
 * - VERBALIZATION ASSIGNMENT: 'customer tier' = value (defines the variable via verbalization)
 * 
 * @param formulaContent - The formula content to parse
 * @param variables - Optional array of variables with verbalizations for mapping
 * @returns Array of variable names that are being defined
 * 
 * @example
 * const defined = extractDefinedVariables('$result = $a + $b');
 * // Returns: ['result']
 * 
 * @example
 * const defined = extractDefinedVariables('IF $status = "pending" THEN 100 END');
 * // Returns: [] (comparison in IF, not assignment)
 * 
 * @example
 * const defined = extractDefinedVariables("'customer tier' = 'Gold'", variables);
 * // Returns: ['customerTier'] (resolved from verbalization)
 */
export function extractDefinedVariables(formulaContent: string, variables?: Array<{ name: string; verbalization?: string }>): string[] {
  const definedVariables: string[] = [];
  
  // Build verbalization map if variables provided
  const verbalizationMap = variables ? buildVerbalizationMapFromVariables(variables) : null;
  
  // Split by lines to analyze each line
  const lines = formulaContent.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) continue;
    
    // Skip lines that are part of control flow (IF, ELSIF, ELSE, END, THEN, RETURN)
    // These contain comparisons, not assignments
    if (
      trimmedLine.startsWith('IF ') ||
      trimmedLine.startsWith('ELSIF ') ||
      trimmedLine.startsWith('ELSE') ||
      trimmedLine.startsWith('END') ||
      trimmedLine.startsWith('THEN') ||
      trimmedLine.startsWith('RETURN ')
    ) {
      continue;
    }
    
    // Check for standard variable assignment: $variableName = ...
    const assignmentPattern = /^\s*\$([a-zA-Z0-9_]+)\s*=\s*(.+)$/;
    const match = assignmentPattern.exec(trimmedLine);
    
    if (match) {
      const variableName = match[1];
      
      if (!definedVariables.includes(variableName)) {
        definedVariables.push(variableName);
      }
      continue;
    }
    
    // Check for verbalization assignment: 'verbalization text' = ...
    const verbalizationPattern = /^\s*'([^']+)'\s*=\s*(.+)$/;
    const verbMatch = verbalizationPattern.exec(trimmedLine);
    
    if (verbMatch && verbalizationMap) {
      const verbalization = verbMatch[1];
      
      // Resolve verbalization to variable name
      const resolvedName = resolveVerbalizationToVariableName(verbalization, verbalizationMap);
      
      if (resolvedName && !definedVariables.includes(resolvedName)) {
        definedVariables.push(resolvedName);
      }
    }
  }
  
  return definedVariables;
}

/**
 * Build verbalization map from variables array
 * Maps normalized verbalization → variable name
 */
function buildVerbalizationMapFromVariables(variables: Array<{ name: string; verbalization?: string }>): Record<string, string> {
  const map: Record<string, string> = {};
  
  for (const variable of variables) {
    if (variable.verbalization) {
      // Normalize: lowercase, trim, collapse whitespace
      const normalized = variable.verbalization.toLowerCase().trim().replace(/\s+/g, ' ');
      map[normalized] = variable.name;
    }
  }
  
  return map;
}

/**
 * Resolve verbalization to variable name using verbalization map
 */
function resolveVerbalizationToVariableName(verbalization: string, verbalizationMap: Record<string, string>): string | null {
  // Normalize: lowercase, trim, collapse whitespace
  const normalized = verbalization.toLowerCase().trim().replace(/\s+/g, ' ');
  return verbalizationMap[normalized] || null;
}

/**
 * Extracts all variable names that are USED in the formula (anywhere with $)
 * 
 * @param formulaContent - The formula content to parse
 * @returns Array of variable names that are used
 * 
 * @example
 * const used = extractUsedVariables('$result = $a + $b');
 * // Returns: ['result', 'a', 'b'] (includes defined variables)
 */
export function extractUsedVariables(formulaContent: string): string[] {
  const usedVariables: string[] = [];
  
  // Match all variables: $variableName
  const variablePattern = /\$([a-zA-Z0-9_]+)/g;
  
  let match;
  while ((match = variablePattern.exec(formulaContent)) !== null) {
    const variableName = match[1];
    if (!usedVariables.includes(variableName)) {
      usedVariables.push(variableName);
    }
  }
  
  return usedVariables;
}

/**
 * Extracts variable names that are PARAMETERS (used but not defined)
 * 
 * @param formulaContent - The formula content to parse
 * @returns Array of variable names that are parameters
 * 
 * @example
 * const params = extractParameterVariables('$result = $a + $b');
 * // Returns: ['a', 'b'] (excludes 'result' because it's defined)
 */
export function extractParameterVariables(formulaContent: string): string[] {
  const definedVars = extractDefinedVariables(formulaContent);
  const usedVars = extractUsedVariables(formulaContent);
  
  // Parameters are variables that are used but NOT defined
  return usedVars.filter(varName => !definedVars.includes(varName));
}

/**
 * Extracts all attribute references from the formula (#attribute.path)
 * 
 * @param formulaContent - The formula content to parse
 * @returns Array of attribute paths
 * 
 * @example
 * const attrs = extractAttributes('$score = #customer.creditScore / 100');
 * // Returns: ['customer.creditScore']
 */
export function extractAttributes(formulaContent: string): string[] {
  const attributes: string[] = [];
  
  // Match patterns like: #attribute.path or #attribute
  const attributePattern = /#([a-zA-Z0-9_.]+)/g;
  
  let match;
  while ((match = attributePattern.exec(formulaContent)) !== null) {
    const attributePath = match[1];
    if (!attributes.includes(attributePath)) {
      attributes.push(attributePath);
    }
  }
  
  return attributes;
}

/**
 * Analyzes a formula and returns comprehensive information
 * 
 * @param formulaContent - The formula content to parse
 * @param variables - Optional array of variables with verbalizations for mapping
 * @returns Object with defined variables, parameters, and attributes
 * 
 * @example
 * const analysis = analyzeFormula('$result = ($a + #attr.value) * 100');
 * // Returns:
 * // {
 * //   definedVariables: ['result'],
 * //   parameterVariables: ['a'],
 * //   allVariables: ['result', 'a'],
 * //   attributes: ['attr.value']
 * // }
 * 
 * @example
 * const analysis = analyzeFormula("'customer tier' = 'Gold'", variables);
 * // Returns:
 * // {
 * //   definedVariables: ['customerTier'],
 * //   parameterVariables: [],
 * //   allVariables: ['customerTier'],
 * //   attributes: []
 * // }
 */
export function analyzeFormula(formulaContent: string, variables?: Array<{ name: string; verbalization?: string }>): {
  definedVariables: string[];
  parameterVariables: string[];
  allVariables: string[];
  attributes: string[];
} {
  return {
    definedVariables: extractDefinedVariables(formulaContent, variables),
    parameterVariables: extractParameterVariables(formulaContent),
    allVariables: extractUsedVariables(formulaContent),
    attributes: extractAttributes(formulaContent),
  };
}