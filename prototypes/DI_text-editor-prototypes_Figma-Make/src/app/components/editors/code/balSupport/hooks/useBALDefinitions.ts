/**
 * useBALDefinitions Hook
 * 
 * Extracts user-defined terms from BAL code's definitions section.
 * These terms are then used for dynamic keyword highlighting.
 * 
 * EPIC: BAL Dynamic Keyword Highlighting - Phase 1
 * 
 * @example
 * const { definedTerms, termLocations } = useBALDefinitions(balCode);
 * // definedTerms = Set(['minimum service for fixed holidays', 'personal holidays per year'])
 * // termLocations = Map([['minimum service for fixed holidays', 3], ...])
 */

import { useMemo } from 'react';

export interface BALDefinitions {
  /** Terms defined in definitions section (e.g., 'minimum service for fixed holidays') */
  definedTerms: Set<string>;
  
  /** Map of term to its definition location (line number, 1-based) */
  termLocations: Map<string, number>;
  
  /** Map of term to its assigned value */
  termValues: Map<string, string>;
}

/**
 * Extracts defined terms from BAL code's definitions section
 * 
 * Parses code like:
 * ```bal
 * definitions:
 *   set 'minimum service for fixed holidays' to 0.5;
 *   set 'personal holidays per year' to 3;
 * ```
 * 
 * @param code - BAL code to parse
 * @returns Object containing defined terms, locations, and values
 */
export function useBALDefinitions(code: string): BALDefinitions {
  return useMemo(() => {
    const definedTerms = new Set<string>();
    const termLocations = new Map<string, number>();
    const termValues = new Map<string, string>();
    
    if (!code || code.trim() === '') {
      return { definedTerms, termLocations, termValues };
    }
    
    // Find definitions section
    // Pattern: definitions: ... (until next section or end of content)
    const defMatch = code.match(/definitions:\s*([\s\S]*?)(?=\n\S|\n$|$)/i);
    
    if (!defMatch) {
      return { definedTerms, termLocations, termValues };
    }
    
    const defsSection = defMatch[1];
    const defsSectionStart = defMatch.index! + defMatch[0].indexOf(defsSection);
    
    // Pattern: set 'term name' to value;
    // Supports:
    // - Single quotes: set 'term' to value;
    // - Multi-word terms: set 'minimum service for fixed holidays' to 0.5;
    // - Various value types: numbers, strings, booleans
    const setPattern = /set\s+'([^']+)'\s+to\s+([^;]+);/gi;
    
    let match;
    while ((match = setPattern.exec(defsSection)) !== null) {
      const term = match[1].trim();
      const value = match[2].trim();
      
      // Add to set of defined terms
      definedTerms.add(term);
      
      // Store value
      termValues.set(term, value);
      
      // Calculate line number (1-based)
      const matchPosition = defsSectionStart + match.index;
      const lineNum = code.substring(0, matchPosition).split('\n').length;
      termLocations.set(term, lineNum);
    }
    
    return { definedTerms, termLocations, termValues };
  }, [code]);
}

/**
 * Normalizes a term for comparison by removing common articles and determiners
 * 
 * Examples:
 * - "the minimum service" -> "minimum service"
 * - "a holiday eligibility" -> "holiday eligibility"
 * - "an employee" -> "employee"
 * 
 * @param term - Term to normalize
 * @returns Normalized term
 */
export function normalizeBALTerm(term: string): string {
  return term
    .trim()
    .toLowerCase()
    // Remove leading articles/determiners
    .replace(/^(the|a|an|each|every|any|some)\s+/i, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ');
}

/**
 * Checks if a term reference matches a defined term
 * Handles articles and case-insensitive matching
 * 
 * @param reference - Term as it appears in code (e.g., "the minimum service")
 * @param definedTerm - Term as defined (e.g., "minimum service for fixed holidays")
 * @returns true if reference matches the defined term
 */
export function matchesDefinedTerm(reference: string, definedTerm: string): boolean {
  const normalizedRef = normalizeBALTerm(reference);
  const normalizedDef = normalizeBALTerm(definedTerm);
  
  // Check if reference matches the start of the defined term
  // This handles cases where the full term might be broken across tokens
  return normalizedDef === normalizedRef || normalizedDef.startsWith(normalizedRef + ' ');
}
