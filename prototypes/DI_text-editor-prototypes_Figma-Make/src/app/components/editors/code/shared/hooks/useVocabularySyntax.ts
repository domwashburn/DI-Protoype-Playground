/**
 * useVocabularySyntax - Enhanced Syntax Highlighting with Vocabulary
 * 
 * NEW HOOK - Phase 5.11.4
 * 
 * Extends formula syntax highlighting to include vocabulary term recognition.
 * Highlights vocabulary terms differently than simple verbalizations.
 * 
 * STRANGLER PATTERN:
 * - New hook alongside existing useFormulaSyntax
 * - Can be adopted incrementally
 * - Falls back to standard highlighting when vocabulary disabled
 * 
 * @module shared/hooks/useVocabularySyntax
 */

import { useCallback, useMemo } from 'react';
import type { Variable } from '../../../core/types';
import { 
  getVocabularyResolver, 
  USE_VOCABULARY_RESOLUTION 
} from '../../../../../services/evaluationEngine/parsers/VocabularyResolver';

/**
 * Enhanced syntax highlighting with vocabulary support
 * 
 * @param variables - Standard variables for validation
 * @returns Syntax highlighting functions
 * 
 * @example
 * const { highlightSyntax } = useVocabularySyntax(variables);
 * const html = highlightSyntax('the credit score = 750');
 * // → Highlights "the credit score" as vocabulary term
 */
export function useVocabularySyntax(variables: Variable[] = []) {
  const resolver = getVocabularyResolver();
  const vocabularyEnabled = USE_VOCABULARY_RESOLUTION && resolver.isEnabled();
  
  /**
   * Get all vocabulary terms for pattern matching
   */
  const vocabularyTerms = useMemo(() => {
    if (!vocabularyEnabled) {
      return [];
    }
    
    try {
      return resolver.getAllTerms();
    } catch (error) {
      console.error('Failed to get vocabulary terms:', error);
      return [];
    }
  }, [vocabularyEnabled, resolver]);
  
  /**
   * Build regex patterns for vocabulary terms
   * Sorted by length (longest first) to match greedily
   */
  const vocabularyPatterns = useMemo(() => {
    if (vocabularyTerms.length === 0) {
      return null;
    }
    
    // Sort by length descending to match longest terms first
    const sorted = [...vocabularyTerms].sort((a, b) => b.length - a.length);
    
    // Escape regex special characters
    const escaped = sorted.map(term => 
      term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );
    
    // Create pattern that matches any vocabulary term
    // Use word boundaries where appropriate
    const pattern = new RegExp(
      `\\b(${escaped.join('|')})\\b`,
      'gi'
    );
    
    return pattern;
  }, [vocabularyTerms]);
  
  /**
   * Check if a term is a vocabulary term
   */
  const isVocabularyTerm = useCallback((term: string): boolean => {
    if (!vocabularyEnabled) {
      return false;
    }
    
    const result = resolver.resolveTerm(term);
    return result.resolved;
  }, [vocabularyEnabled, resolver]);
  
  /**
   * Enhanced syntax highlighting that includes vocabulary terms
   */
  const highlightSyntax = useCallback((text: string): string => {
    if (!text) return '';
    
    try {
      // Create tokens with positions for proper ordering
      interface Token {
        start: number;
        end: number;
        className: string;
        text: string;
        priority: number;
      }
      
      const tokens: Token[] = [];
      
      // ========================================
      // PHASE 5.11.4: VOCABULARY TERMS
      // Highest priority - match before other patterns
      // ========================================
      if (vocabularyEnabled && vocabularyPatterns) {
        const matches = text.matchAll(vocabularyPatterns);
        for (const match of matches) {
          if (match.index !== undefined) {
            // Verify this is actually a vocabulary term
            // (regex might have false positives)
            if (isVocabularyTerm(match[0])) {
              tokens.push({
                start: match.index,
                end: match.index + match[0].length,
                className: 'formula-vocabulary-term',
                text: match[0],
                priority: 12, // Highest priority
              });
            }
          }
        }
      }
      
      // ========================================
      // STANDARD SYNTAX RULES
      // ========================================
      
      // Comments
      {
        const pattern = /\/\/[^\n]*/g;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-comment',
              text: match[0],
              priority: 10,
            });
          }
        }
      }
      
      // Template literals
      {
        const pattern = /`(?:[^`\\]|\\.)*`/g;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-template-literal',
              text: match[0],
              priority: 11,
            });
          }
        }
      }
      
      // Keywords
      {
        const pattern = /\b(NULL|TRUE|FALSE)\b/gi;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-keyword',
              text: match[0],
              priority: 9,
            });
          }
        }
      }
      
      // Assignment keywords
      {
        const pattern = /\b(set|to|equal)\b/gi;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-operator',
              text: match[0],
              priority: 9,
            });
          }
        }
      }
      
      // Natural language functions (5-word)
      {
        const pattern = /\b(the\s+absolute\s+value\s+of|the\s+first\s+element\s+of|the\s+last\s+element\s+of|the\s+square\s+root\s+of|the\s+first\s+item\s+in|the\s+last\s+item\s+in)\b/gi;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-nl-operator',
              text: match[0],
              priority: 9,
            });
          }
        }
      }
      
      // Natural language functions (4-word)
      {
        const pattern = /\b(the\s+ceiling\s+of|the\s+uppercase\s+of|the\s+lowercase\s+of)\b/gi;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-nl-operator',
              text: match[0],
              priority: 9,
            });
          }
        }
      }
      
      // Natural language functions (3-word)
      {
        const pattern = /\b(the\s+sum\s+of|the\s+average\s+of|the\s+count\s+of|the\s+maximum\s+of|the\s+minimum\s+of|the\s+total\s+of|the\s+first\s+of|the\s+last\s+of|the\s+length\s+of|the\s+size\s+of|the\s+floor\s+of|the\s+round\s+of)\b/gi;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-nl-operator',
              text: match[0],
              priority: 9,
            });
          }
        }
      }
      
      // Natural language comparison operators
      {
        const pattern = /\b(is\s+less\s+than\s+or\s+equal\s+to|is\s+greater\s+than\s+or\s+equal\s+to|is\s+not\s+equal\s+to|is\s+greater\s+than|is\s+less\s+than|is\s+equal\s+to|is\s+not\s+null|is\s+not\s+empty|starts\s+with|is\s+null|is\s+empty|ends\s+with)\b/gi;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-nl-operator',
              text: match[0],
              priority: 8,
            });
          }
        }
      }
      
      // Natural language arithmetic operators
      {
        const pattern = /\b(to\s+the\s+power\s+of|multiplied\s+by|divided\s+by|times|plus|minus|mod|squared|cubed)\b/gi;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-nl-operator',
              text: match[0],
              priority: 8,
            });
          }
        }
      }
      
      // Built-in functions
      {
        const pattern = /\b(SUM|AVG|AVERAGE|MAX|MIN|COUNT|IF|ELSIF|ELSEIF|ELSE|OTHERWISE|END|THEN|AND|OR|NOT|ABS|ROUND|FLOOR|CEIL|SQRT|POW|MOD|CONCAT|UPPER|LOWER|TRIM|LEN|LEFT|RIGHT|MID|REPLACE|FIND|DATE|NOW|TODAY|YEAR|MONTH|DAY|HOUR|MINUTE|SECOND|WEEKDAY|MINUTES_BETWEEN|HOURS_BETWEEN|DAYS_BETWEEN|SECONDS_BETWEEN|MILLISECONDS_BETWEEN|TIME_TO_MINUTES|TIME_TO_HOURS|TIME_TO_SECONDS|DATE_ADD|DATE_SUBTRACT|IS_WEEKEND|IS_WEEKDAY|LENGTH|LIST_SUM|LIST_AVG|LIST_MIN|LIST_MAX|CONTAINS|FIRST|LAST|REVERSE|SLICE|UNIQUE|SORT|SORT_DESC|JOIN|SPLIT|INDEX_OF|RANGE|RETURN|FOR|WHILE|DO|IN|BREAK|CONTINUE|SWITCH|CASE|DEFAULT)\b/gi;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-function',
              text: match[0],
              priority: 3,
            });
          }
        }
      }
      
      // Attributes
      {
        const pattern = /#[a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*/g;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-attribute',
              text: match[0],
              priority: 5,
            });
          }
        }
      }
      
      // Variables with validation
      {
        const pattern = /\$[a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*/g;
        const variableNames = variables.map(v => v.name);
        const verbalizations = variables
          .filter(v => v.verbalization)
          .map(v => v.verbalization!.toLowerCase());
        
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            const varName = match[0].substring(1); // Remove $
            const isValid = variableNames.includes(varName) || 
                           verbalizations.includes(varName.toLowerCase());
            
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: isValid ? 'formula-variable' : 'formula-variable-undefined',
              text: match[0],
              priority: 6,
            });
          }
        }
      }
      
      // Verbalizations (single-quoted)
      {
        const pattern = /'([^'\\]|\\.)+('(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*)/g;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-verbalization',
              text: match[0],
              priority: 5,
            });
          }
        }
      }
      
      // String literals (double-quoted)
      {
        const pattern = /"(?:[^"\\]|\\.)*"/g;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-string',
              text: match[0],
              priority: 4,
            });
          }
        }
      }
      
      // Numbers
      {
        const pattern = /\b-?\d+\.?\d*\b/g;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-number',
              text: match[0],
              priority: 1,
            });
          }
        }
      }
      
      // Operators
      {
        const pattern = /[+\-*/%=<>!&|]+|\.\.(?!\.)/g;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-operator',
              text: match[0],
              priority: 2,
            });
          }
        }
      }
      
      // Brackets
      {
        const pattern = /[()[\]{}]/g;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-bracket',
              text: match[0],
              priority: 2,
            });
          }
        }
      }
      
      // Commas
      {
        const pattern = /,/g;
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className: 'formula-comma',
              text: match[0],
              priority: 2,
            });
          }
        }
      }
      
      // ========================================
      // TOKEN PROCESSING
      // ========================================
      
      // Sort tokens by position, then by priority (higher priority wins)
      tokens.sort((a, b) => {
        if (a.start !== b.start) return a.start - b.start;
        return b.priority - a.priority;
      });
      
      // Remove overlapping tokens (keep higher priority)
      const filteredTokens: Token[] = [];
      for (const token of tokens) {
        const hasOverlap = filteredTokens.some(existing =>
          (token.start >= existing.start && token.start < existing.end) ||
          (token.end > existing.start && token.end <= existing.end)
        );
        if (!hasOverlap) {
          filteredTokens.push(token);
        }
      }
      
      // Build highlighted HTML
      let result = '';
      let lastIndex = 0;
      
      filteredTokens.sort((a, b) => a.start - b.start);
      
      filteredTokens.forEach(token => {
        // Add text before token (escaped)
        if (token.start > lastIndex) {
          result += escapeHtml(text.substring(lastIndex, token.start));
        }
        
        // Add highlighted token
        result += `<span class="${token.className}">${escapeHtml(token.text)}</span>`;
        lastIndex = token.end;
      });
      
      // Add remaining text
      if (lastIndex < text.length) {
        result += escapeHtml(text.substring(lastIndex));
      }
      
      return result;
    } catch (error) {
      console.error('Syntax highlighting error:', error);
      return escapeHtml(text);
    }
  }, [variables, vocabularyEnabled, vocabularyPatterns, isVocabularyTerm]);
  
  /**
   * Escape HTML entities
   */
  const escapeHtml = (text: string): string => {
    return text
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '&quot;');
  };
  
  return {
    highlightSyntax,
    vocabularyEnabled,
    vocabularyTerms,
  };
}
