/**
 * Validate test input value against variable type
 * Returns error message if invalid, null if valid
 */
export function validateTestValue(value: string, type: 'number' | 'string' | 'boolean' | 'date'): string | null {
  if (!value || value.trim() === '') {
    return null; // Empty is OK, will use default
  }
  
  switch (type) {
    case 'number':
      const num = Number(value);
      if (isNaN(num)) {
        return `Expected number, got "${value}"`;
      }
      return null;
    
    case 'boolean':
      if (value !== 'true' && value !== 'false') {
        return `Expected boolean (true or false), got "${value}"`;
      }
      return null;
    
    case 'date':
      // Date validation - check if it's a valid date string
      // We accept ISO dates, formatted dates, or empty
      if (value === '0') return null; // Allow 0 as empty date
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return `Expected valid date, got "${value}"`;
      }
      return null;
    
    case 'string':
      // Strings are always valid
      return null;
    
    default:
      return null;
  }
}

/**
 * Convert test input value to typed value
 * Returns converted value or default if conversion fails
 */
export function convertTestValue(value: string, type: 'number' | 'string' | 'boolean' | 'date'): any {
  if (!value || value.trim() === '') {
    // Return type-appropriate default
    switch (type) {
      case 'number': return 0;
      case 'boolean': return false;
      case 'date': return new Date(0);
      case 'string': return '';
    }
  }
  
  switch (type) {
    case 'number':
      const num = parseFloat(value);
      return isNaN(num) ? 0 : num;
    
    case 'boolean':
      return value === 'true';
    
    case 'date':
      // Return as-is for now (date handling is complex)
      return value;
    
    case 'string':
      return value;
    
    default:
      return value;
  }
}

/**
 * Extract variables that are defined (assigned) in the formula
 * These should NOT have test inputs as they're computed
 * 
 * @example
 * "$baseCost = $weight * 0.5" → ["baseCost"]
 */
export function getDefinedVariables(formula: string): string[] {
  const defined = new Set<string>();
  
  // Match variable assignments: $varName = ...
  const assignmentPattern = /\$([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g;
  let match;
  
  while ((match = assignmentPattern.exec(formula)) !== null) {
    defined.add(match[1]);
  }
  
  return Array.from(defined);
}

/**
 * Extract all variables referenced in the formula
 * 
 * @example
 * "$baseCost = $weight * 0.5" → ["baseCost", "weight"]
 */
export function getReferencedVariables(formula: string): string[] {
  const referenced = new Set<string>();
  
  // Match all variable references: $varName
  const variablePattern = /\$([a-zA-Z_][a-zA-Z0-9_]*)/g;
  let match;
  
  while ((match = variablePattern.exec(formula)) !== null) {
    referenced.add(match[1]);
  }
  
  return Array.from(referenced);
}

/**
 * Extract all attributes referenced in the formula
 * 
 * @example
 * "#order.destination.distance" → ["order.destination.distance"]
 */
export function getReferencedAttributes(formula: string): string[] {
  const attributes = new Set<string>();
  
  // Match attribute references: #path.to.attribute
  const attributePattern = /#([a-zA-Z_][a-zA-Z0-9_.]*)/g;
  let match;
  
  while ((match = attributePattern.exec(formula)) !== null) {
    attributes.add(match[1]);
  }
  
  return Array.from(attributes);
}

/**
 * Get testable variables (referenced but not defined)
 * These need test inputs
 * 
 * @example
 * "$baseCost = $weight * 0.5" → ["weight"] (baseCost is defined, weight is not)
 */
export function getTestableVariables(formula: string): string[] {
  const defined = new Set(getDefinedVariables(formula));
  const referenced = getReferencedVariables(formula);
  
  // Return variables that are referenced but not defined
  return referenced.filter(name => !defined.has(name));
}

/**
 * Extract string literal options for a variable from comparisons
 * Used to provide dropdown options for string variables
 * 
 * @example
 * '$shippingSpeed = "express"' → ["express"]
 * 'IF $status = "pending" OR $status = "active"' → ["pending", "active"]
 */
export function extractStringOptions(formula: string, variableName: string): string[] {
  const options = new Set<string>();
  
  // Match patterns like: $varName = "value" or $varName = 'value'
  const doubleQuotePattern = new RegExp(
    `\\$${variableName}\\s*=\\s*"([^"]+)"`,
    'g'
  );
  const singleQuotePattern = new RegExp(
    `\\$${variableName}\\s*=\\s*'([^']+)'`,
    'g'
  );
  
  let match;
  
  // Extract double-quoted strings
  while ((match = doubleQuotePattern.exec(formula)) !== null) {
    options.add(match[1]);
  }
  
  // Extract single-quoted strings
  while ((match = singleQuotePattern.exec(formula)) !== null) {
    options.add(match[1]);
  }
  
  return Array.from(options);
}

/**
 * Extract date literal options for a variable from comparisons
 * Used to provide dropdown options for date variables
 * 
 * @example
 * '$startDate > "2024-01-01"' → ["2024-01-01"]
 * 'IF $dueDate = "2024-12-31"' → ["2024-12-31"]
 */
export function extractDateOptions(formula: string, variableName: string): string[] {
  const options = new Set<string>();
  
  // Match patterns like: $varName operator "YYYY-MM-DD"
  // Supports =, !=, <, >, <=, >= operators
  const datePattern = new RegExp(
    `\\$${variableName}\\s*(?:=|!=|<|>|<=|>=)\\s*"(\\d{4}-\\d{2}-\\d{2})"`,
    'g'
  );
  
  let match;
  while ((match = datePattern.exec(formula)) !== null) {
    options.add(match[1]);
  }
  
  return Array.from(options);
}

/**
 * Extract number literal options for a variable from comparisons
 * Used to provide dropdown options for number variables
 * 
 * @example
 * '$age > 18' → ["18"]
 * 'IF $score >= 100 AND $score <= 1000' → ["100", "1000"]
 */
export function extractNumberOptions(formula: string, variableName: string): string[] {
  const options = new Set<string>();
  
  // Match patterns like: $varName operator number
  // Supports =, !=, <, >, <=, >= operators
  // Matches integers and decimals
  const numberPattern = new RegExp(
    `\\$${variableName}\\s*(?:=|!=|<|>|<=|>=)\\s*(-?\\d+\\.?\\d*)`,
    'g'
  );
  
  let match;
  while ((match = numberPattern.exec(formula)) !== null) {
    options.add(match[1]);
  }
  
  return Array.from(options);
}

/**
 * Extract boolean literal options for a variable from comparisons
 * Used to provide dropdown options for boolean variables
 * 
 * @example
 * '$isActive = true' → ["true"]
 * 'IF $isEnabled = false' → ["false"]
 */
export function extractBooleanOptions(formula: string, variableName: string): string[] {
  const options = new Set<string>();
  
  // Match patterns like: $varName = true/false
  const booleanPattern = new RegExp(
    `\\$${variableName}\\s*=\\s*(true|false)`,
    'gi'
  );
  
  let match;
  while ((match = booleanPattern.exec(formula)) !== null) {
    options.add(match[1].toLowerCase());
  }
  
  return Array.from(options);
}

/**
 * Extract all literal options for a variable based on its type
 * Unified interface for all extraction functions
 */
export function extractOptionsForVariable(
  formula: string, 
  variableName: string, 
  variableType: 'string' | 'number' | 'boolean' | 'date'
): string[] {
  switch (variableType) {
    case 'string':
      return extractStringOptions(formula, variableName);
    case 'number':
      return extractNumberOptions(formula, variableName);
    case 'boolean':
      return extractBooleanOptions(formula, variableName);
    case 'date':
      return extractDateOptions(formula, variableName);
    default:
      return [];
  }
}

/**
 * Detect if a variable should be treated as having predefined string options
 * based on string comparisons in the formula
 */
export function hasExtractableOptions(formula: string, variableName: string): boolean {
  return extractStringOptions(formula, variableName).length > 0;
}