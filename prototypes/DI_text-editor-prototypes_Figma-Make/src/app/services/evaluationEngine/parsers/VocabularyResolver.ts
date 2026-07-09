/**
 * Vocabulary Resolver for Parser Integration
 * 
 * NEW LAYER - Phase 5.11.3
 * 
 * Integrates VocabularyRepository with the evaluation engine parser.
 * Provides term resolution for natural language expressions and actions.
 * 
 * STRANGLER PATTERN:
 * - Built in isolation, doesn't modify existing parser
 * - Provides optional vocabulary resolution layer
 * - Can be enabled/disabled via feature flag
 * - Keeps existing verbalization system working
 * 
 * @module evaluationEngine/parsers/VocabularyResolver
 */

import { VocabularyRepository } from '../../vocabulary';
import type { TermResolution, VocabularyAttribute } from '../../vocabulary/types';
import type { Token } from './Tokenizer';

/**
 * Feature flag for vocabulary integration
 * Set to true to enable vocabulary-based term resolution
 */
export const USE_VOCABULARY_RESOLUTION = false; // Default: OFF for Phase 5.11.3

/**
 * Vocabulary resolution result
 */
export interface VocabularyResolutionResult {
  /** Whether the term was resolved via vocabulary */
  resolved: boolean;
  
  /** Original term that was resolved */
  term: string;
  
  /** Vocabulary resolution details (if resolved) */
  resolution?: TermResolution;
  
  /** Suggested variable name based on attribute path */
  suggestedVariableName?: string;
  
  /** Whether this term represents a list attribute */
  isList?: boolean;
  
  /** Element type for list attributes */
  elementType?: string;
}

/**
 * VocabularyResolver
 * 
 * Resolves natural language terms using the VocabularyRepository.
 * Integrates with parser to provide vocabulary-backed variable resolution.
 */
export class VocabularyResolver {
  private repository: VocabularyRepository;
  private initialized: boolean = false;
  
  constructor() {
    this.repository = VocabularyRepository.getInstance();
  }
  
  /**
   * Initialize the resolver
   * Ensures repository is loaded before use
   */
  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }
    
    if (!this.repository.isInitialized()) {
      await this.repository.initialize();
    }
    
    this.initialized = true;
  }
  
  /**
   * Check if vocabulary resolution is enabled and ready
   */
  public isEnabled(): boolean {
    return USE_VOCABULARY_RESOLUTION && this.initialized;
  }
  
  /**
   * Resolve a natural language term to vocabulary attribute
   * 
   * @param term - Natural language term to resolve
   * @returns Resolution result
   * 
   * @example
   * const result = resolver.resolveTerm('the credit score');
   * if (result.resolved) {
   *   console.log('Attribute:', result.resolution.attributePath);
   *   console.log('Suggested variable:', result.suggestedVariableName);
   * }
   */
  public resolveTerm(term: string): VocabularyResolutionResult {
    if (!this.isEnabled()) {
      return { resolved: false, term };
    }
    
    const resolution = this.repository.resolveTerm(term);
    
    if (!resolution) {
      return { resolved: false, term };
    }
    
    return {
      resolved: true,
      term,
      resolution,
      suggestedVariableName: this.attributePathToVariableName(resolution.attributePath),
      isList: resolution.attribute.isList,
      elementType: resolution.attribute.elementType
    };
  }
  
  /**
   * Try to resolve a verbalization token
   * 
   * Called by parser when encountering VERBALIZATION tokens.
   * Provides vocabulary-based resolution as alternative to simple variable mapping.
   * 
   * @param token - VERBALIZATION token from tokenizer
   * @returns Resolution result
   */
  public resolveVerbalizationToken(token: Token): VocabularyResolutionResult {
    if (token.type !== 'VERBALIZATION') {
      return { resolved: false, term: token.value };
    }
    
    // Remove quotes from verbalization
    const term = token.value.replace(/^'|'$/g, '');
    
    return this.resolveTerm(term);
  }
  
  /**
   * Check if a term matches a vocabulary expression pattern
   * 
   * Useful for parsing statements like:
   * "the credit score of the applicant"
   * 
   * @param text - Text to check
   * @returns Resolution result if matches expression pattern
   */
  public matchesExpressionPattern(text: string): VocabularyResolutionResult | null {
    if (!this.isEnabled()) {
      return null;
    }
    
    // Try direct resolution first
    const direct = this.resolveTerm(text);
    if (direct.resolved) {
      return direct;
    }
    
    // Try to match expression templates
    // For now, just try variations with common patterns
    const variations = [
      text,
      `the ${text}`,
      `a ${text}`,
      text.replace(/^(the|a|an)\s+/, '')
    ];
    
    for (const variant of variations) {
      const result = this.resolveTerm(variant);
      if (result.resolved) {
        return result;
      }
    }
    
    return null;
  }
  
  /**
   * Check if a term matches a vocabulary action pattern
   * 
   * Useful for parsing statements like:
   * "set the credit score of the applicant to 750"
   * 
   * @param text - Text to check
   * @returns Resolution result if matches action pattern
   */
  public matchesActionPattern(text: string): VocabularyResolutionResult | null {
    if (!this.isEnabled()) {
      return null;
    }
    
    // Extract attribute reference from action patterns
    // Common patterns:
    // - "set the X of Y to Z"
    // - "add X to the Xs of Y"
    // - "remove X from the Xs of Y"
    
    const setPattern = /set\s+the\s+(.+?)\s+of\s+/i;
    const addPattern = /add\s+.+?\s+to\s+the\s+(.+?)\s+of\s+/i;
    const removePattern = /remove\s+.+?\s+from\s+the\s+(.+?)\s+of\s+/i;
    const clearPattern = /clear\s+the\s+(.+?)\s+of\s+/i;
    
    const patterns = [setPattern, addPattern, removePattern, clearPattern];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const term = `the ${match[1]}`;
        const result = this.resolveTerm(term);
        if (result.resolved) {
          return result;
        }
      }
    }
    
    return null;
  }
  
  /**
   * Search vocabulary for autocomplete suggestions
   * 
   * @param query - Partial term to search for
   * @param maxResults - Maximum number of results
   * @returns Array of suggestions
   */
  public searchForSuggestions(query: string, maxResults: number = 10): VocabularyResolutionResult[] {
    if (!this.isEnabled()) {
      return [];
    }
    
    const results = this.repository.search(query, { maxResults });
    
    return results.map(result => ({
      resolved: true,
      term: result.attribute.singular.definite,
      resolution: {
        attribute: result.attribute,
        attributePath: result.attributePath,
        matchType: 'definite-singular' as const,
        bomId: result.bomId
      },
      suggestedVariableName: this.attributePathToVariableName(result.attributePath),
      isList: result.attribute.isList,
      elementType: result.attribute.elementType
    }));
  }
  
  /**
   * Get all available vocabulary terms
   * Useful for building autocomplete dictionaries
   */
  public getAllTerms(): string[] {
    if (!this.isEnabled()) {
      return [];
    }
    
    const terms: string[] = [];
    const boms = this.repository.getAllBOMs();
    
    for (const bom of boms) {
      this.collectTermsFromAttributes(bom.attributes, terms);
    }
    
    return terms;
  }
  
  /**
   * Validate a value against vocabulary attribute constraints
   * 
   * @param attributePath - Path to attribute
   * @param value - Value to validate
   * @param bomId - Optional BOM ID
   * @returns Validation result
   */
  public validateValue(attributePath: string, value: any, bomId?: string) {
    if (!this.isEnabled()) {
      return { valid: true };
    }
    
    return this.repository.validate(attributePath, value, bomId);
  }
  
  // ========================================
  // PRIVATE HELPERS
  // ========================================
  
  /**
   * Convert attribute path to variable name
   * 
   * @example
   * 'applicant.creditScore' → '$applicantCreditScore'
   * 'creditScore' → '$creditScore'
   */
  private attributePathToVariableName(path: string): string {
    // Remove dots and capitalize next character
    const camelCase = path.replace(/\.(\w)/g, (_, letter) => letter.toUpperCase());
    return `$${camelCase}`;
  }
  
  /**
   * Recursively collect all terms from attributes
   */
  private collectTermsFromAttributes(attributes: VocabularyAttribute[], terms: string[]): void {
    for (const attr of attributes) {
      // Add singular forms
      terms.push(attr.singular.definite);
      terms.push(attr.singular.indefinite);
      if (attr.singular.bare) {
        terms.push(attr.singular.bare);
      }
      if (attr.singular.variants) {
        terms.push(...attr.singular.variants);
      }
      
      // Add plural forms
      terms.push(attr.plural.definite);
      terms.push(attr.plural.bare);
      if (attr.plural.variants) {
        terms.push(...attr.plural.variants);
      }
      
      // Recurse into nested attributes
      if (attr.attributes) {
        this.collectTermsFromAttributes(attr.attributes, terms);
      }
    }
  }
}

/**
 * Singleton instance for use in parsers
 */
let vocabularyResolverInstance: VocabularyResolver | null = null;

/**
 * Get the global VocabularyResolver instance
 */
export function getVocabularyResolver(): VocabularyResolver {
  if (!vocabularyResolverInstance) {
    vocabularyResolverInstance = new VocabularyResolver();
  }
  return vocabularyResolverInstance;
}

/**
 * Initialize the global vocabulary resolver
 * Should be called once at application startup
 */
export async function initializeVocabularyResolver(): Promise<void> {
  const resolver = getVocabularyResolver();
  await resolver.initialize();
}
