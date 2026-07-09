/**
 * useCodeSyntax - Unified Code Syntax Highlighting Hook
 * 
 * Shared syntax highlighting for all code editors (BAL, Formula, etc.).
 * Provides configurable token-based highlighting with consistent behavior.
 * 
 * ARCHITECTURE:
 * - Single source of truth for syntax highlighting
 * - Mode-aware (BAL, Formula) with shared core logic
 * - Token-based with priority system
 * - Escape HTML after tokenization for proper rendering
 * 
 * @example
 * const { highlightSyntax } = useCodeSyntax({ 
 *   mode: 'formula',
 *   variables 
 * });
 * const html = highlightSyntax('$amount * 1.05 + #customer.discount');
 */

import { useCallback } from 'react';
import type { Variable } from '../../../core/types';

/**
 * Syntax highlighting mode
 */
export type SyntaxMode = 'formula' | 'bal';

/**
 * Syntax token types
 */
export interface SyntaxRule {
  name: string;
  pattern: RegExp;
  className: string;
  priority: number; // Higher priority applied last (wins overlaps)
}

/**
 * Configuration for syntax highlighting
 */
export interface CodeSyntaxConfig {
  /** Editor mode - determines which syntax rules to apply */
  mode: SyntaxMode;
  
  /** Variables for validation (formula mode) */
  variables?: Variable[];
  
  /** Vocabulary mappings (BAL mode) */
  vocabularyMappings?: Array<{ term: string; definition: string; dataType?: string }>;
  
  /** Defined terms from BAL definitions section (for dynamic keyword highlighting) */
  definedTerms?: Set<string>;
}

/**
 * Unified code syntax highlighting hook
 */
export function useCodeSyntax(config: CodeSyntaxConfig) {
  const { mode, variables = [], vocabularyMappings = [] } = config;
  const definedTerms = config.definedTerms || new Set<string>();
  
  /**
   * Get variable names and verbalizations for validation
   */
  const variableNames = variables.map(v => v.name);
  const verbalizations = variables
    .filter(v => v.verbalization)
    .map(v => v.verbalization!.toLowerCase());

  /**
   * Syntax highlighting rules
   * Applied in order of priority (lower to higher)
   * 
   * SHARED ACROSS ALL MODES - only className prefix differs
   */
  const getSyntaxRules = useCallback((): SyntaxRule[] => {
    // CSS class prefix based on mode
    const prefix = mode === 'formula' ? 'formula' : 'bal';
    
    return [
      // Natural language functions (5-word) - MUST be before keywords
      {
        name: 'nlFunction5',
        pattern: /\b(the\s+absolute\s+value\s+of|the\s+first\s+element\s+of|the\s+last\s+element\s+of|the\s+square\s+root\s+of|the\s+first\s+item\s+in|the\s+last\s+item\s+in)\b/gi,
        className: `${prefix}-nl-operator`,
        priority: 9,
      },
      
      // Natural language functions (4-word)
      {
        name: 'nlFunction4',
        pattern: /\b(the\s+ceiling\s+of|the\s+uppercase\s+of|the\s+lowercase\s+of)\b/gi,
        className: `${prefix}-nl-operator`,
        priority: 9,
      },
      
      // Natural language functions (3-word)
      {
        name: 'nlFunction3',
        pattern: /\b(the\s+sum\s+of|the\s+average\s+of|the\s+count\s+of|the\s+maximum\s+of|the\s+minimum\s+of|the\s+total\s+of|the\s+first\s+of|the\s+last\s+of|the\s+length\s+of|the\s+size\s+of|the\s+floor\s+of|the\s+round\s+of)\b/gi,
        className: `${prefix}-nl-operator`,
        priority: 9,
      },
      
      // Natural language comparison operators (6-word)
      {
        name: 'nlComparison6',
        pattern: /\b(is\s+less\s+than\s+or\s+equal\s+to|is\s+greater\s+than\s+or\s+equal\s+to)\b/gi,
        className: `${prefix}-nl-operator`,
        priority: 8,
      },
      
      // Natural language comparison operators (4-word)
      {
        name: 'nlComparison4',
        pattern: /\b(is\s+not\s+equal\s+to)\b/gi,
        className: `${prefix}-nl-operator`,
        priority: 8,
      },
      
      // Natural language comparison operators (3-word)
      {
        name: 'nlComparison3',
        pattern: /\b(is\s+greater\s+than|is\s+less\s+than|is\s+equal\s+to|is\s+not\s+null|is\s+not\s+empty|starts\s+with)\b/gi,
        className: `${prefix}-nl-operator`,
        priority: 8,
      },
      
      // Natural language comparison operators (2-word)
      {
        name: 'nlComparison2',
        pattern: /\b(is\s+null|is\s+empty|ends\s+with)\b/gi,
        className: `${prefix}-nl-operator`,
        priority: 8,
      },
      
      // Natural language arithmetic operators
      {
        name: 'nlArithmetic',
        pattern: /\b(to\s+the\s+power\s+of|multiplied\s+by|divided\s+by|times|plus|minus|mod|squared|cubed)\b/gi,
        className: `${prefix}-nl-operator`,
        priority: 8,
      },
      
      // Keywords - LOWER PRIORITY than NL operators
      {
        name: 'keyword',
        pattern: /\b(IF|THEN|ELSE|ELSIF|ELSEIF|OTHERWISE|END|AND|OR|NOT|SET|TO|WHERE|IS|NEW|THE|OF|DEFINE|FUNCTION|RETURNS|RETURN|FOR|EACH|IN|WHILE|DO|TRUE|FALSE|NULL|EQUAL)\b/gi,
        className: `${prefix}-keyword`,
        priority: 3,
      },
      
      // Built-in functions (Formula mode only)
      ...(mode === 'formula' ? [{
        name: 'function',
        pattern: /\b(SUM|AVG|AVERAGE|MAX|MIN|COUNT|IF|ELSIF|ELSEIF|ELSE|OTHERWISE|END|THEN|AND|OR|NOT|ABS|ROUND|FLOOR|CEIL|SQRT|POW|MOD|CONCAT|UPPER|LOWER|TRIM|LEN|LEFT|RIGHT|MID|REPLACE|FIND|DATE|NOW|TODAY|YEAR|MONTH|DAY|HOUR|MINUTE|SECOND|WEEKDAY|MINUTES_BETWEEN|HOURS_BETWEEN|DAYS_BETWEEN|SECONDS_BETWEEN|MILLISECONDS_BETWEEN|TIME_TO_MINUTES|TIME_TO_HOURS|TIME_TO_SECONDS|DATE_ADD|DATE_SUBTRACT|IS_WEEKEND|IS_WEEKDAY|LENGTH|LIST_SUM|LIST_AVG|LIST_MIN|LIST_MAX|CONTAINS|FIRST|LAST|REVERSE|SLICE|UNIQUE|SORT|SORT_DESC|JOIN|SPLIT|INDEX_OF|RANGE|RETURN|FOR|WHILE|DO|IN|BREAK|CONTINUE|SWITCH|CASE|DEFAULT)\b/gi,
        className: `${prefix}-function`,
        priority: 3,
      }] : []),
      
      // Vocabulary terms (BAL mode only)
      ...(mode === 'bal' ? vocabularyMappings.map(mapping => ({
        name: 'vocabulary',
        pattern: new RegExp(`\\\\b(${mapping.term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')})\\\\b`, 'gi'),
        className: `${prefix}-vocabulary`,
        priority: 6,
      })) : []),
      
      // Defined terms from definitions section (BAL mode only)
      // These are user-defined constants that should be highlighted distinctly
      // Priority 7 - higher than vocabulary so defined terms override vocabulary highlighting
      ...(mode === 'bal' && definedTerms.size > 0 ? Array.from(definedTerms).map(term => ({
        name: 'definedTerm',
        pattern: new RegExp(`\\\\b(the\\s+)?${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\\\b`, 'gi'),
        className: `${prefix}-definition-term`,
        priority: 7,
      })) : []),
      
      // Verbalizations with properties - single-quoted variable references
      // IMPORTANT: [^'\\\n] excludes newlines to prevent cross-line matching
      {
        name: 'verbalization',
        pattern: /'([^'\\\n]|\\.)+('(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*)/g,
        className: `${prefix}-verbalization`,
        priority: 5,
      },
      
      // String literals (double quotes only - single quotes are verbalizations)
      // IMPORTANT: [^"\\\n] excludes newlines to prevent cross-line matching
      {
        name: 'string',
        pattern: /"([^"\\\n]|\\.)*"/g,
        className: `${prefix}-string`,
        priority: 4,
      },
      
      // Attributes with properties (Formula mode only)
      ...(mode === 'formula' ? [{
        name: 'attribute',
        pattern: /#[a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*/g,
        className: `${prefix}-attribute`,
        priority: 5,
      }] : []),
      
      // Variables with properties
      ...(mode === 'formula' ? [{
        name: 'variable',
        pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*/g,
        className: `${prefix}-variable`,
        priority: 6,
      }] : []),
      
      // Object literal keys (Formula mode only)
      ...(mode === 'formula' ? [{
        name: 'objectKey',
        pattern: /([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g,
        className: `${prefix}-object-key`,
        priority: 7,
      }] : []),
      
      // Numbers
      {
        name: 'number',
        pattern: /\b-?\d+\.?\d*\b/g,
        className: `${prefix}-number`,
        priority: 2,
      },
      
      // Symbolic operators
      {
        name: 'operator',
        pattern: /[+\-*/%=<>!&|]+|\.\.(?!\.)/g,
        className: `${prefix}-operator`,
        priority: 1,
      },
      
      // Parentheses and brackets (Formula mode only)
      ...(mode === 'formula' ? [{
        name: 'bracket',
        pattern: /[()[\]{}]/g,
        className: `${prefix}-bracket`,
        priority: 2,
      }] : []),
      
      // Commas (Formula mode only)
      ...(mode === 'formula' ? [{
        name: 'comma',
        pattern: /,/g,
        className: `${prefix}-comma`,
        priority: 2,
      }] : []),
    ];
  }, [mode, vocabularyMappings]); // Removed definedTerms from deps - it's used but mode === 'bal' guards it

  /**
   * Escape HTML entities
   * Note: Single quotes are NOT escaped to match textarea rendering
   */
  const escapeHtml = (text: string): string => {
    return text
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '&quot;');
    // Note: Single quotes don't need escaping in HTML content (only in attributes)
    // Keeping them as-is ensures exact character width match with textarea
  };

  /**
   * Highlight syntax in code text
   * Returns HTML string with syntax highlighting spans
   */
  const highlightSyntax = useCallback((text: string): string => {
    if (!text) return '';

    try {
      // PRE-PROCESSING: Extract comments and template literals
      // These need special handling to prevent their content from being tokenized
      
      interface SpecialRegion {
        start: number;
        end: number;
        html: string;
        type: 'comment' | 'template';
      }
      
      const specialRegions: SpecialRegion[] = [];
      
      // 1. Find and process comments (// to end of line)
      const commentPattern = /\/\/[^\n]*/g;
      let match;
      while ((match = commentPattern.exec(text)) !== null) {
        specialRegions.push({
          start: match.index,
          end: match.index + match[0].length,
          html: `<span class="${mode}-comment">${escapeHtml(match[0])}</span>`,
          type: 'comment'
        });
      }
      
      // 2. Find and process template literals (only in formula mode)
      if (mode === 'formula') {
        const templatePattern = /`(?:[^`\\]|\\.)*`/g;
        while ((match = templatePattern.exec(text)) !== null) {
          const fullTemplate = match[0];
          const content = fullTemplate.substring(1, fullTemplate.length - 1); // Remove backticks
          
          // Recursively highlight the ENTIRE template content (not just ${} expressions)
          // This allows verbalizations, variables, operators, etc. to be highlighted inside templates
          const highlightedContent = highlightSyntax(content);
          
          specialRegions.push({
            start: match.index,
            end: match.index + match[0].length,
            html: `<span class="${mode}-template-literal">\`${highlightedContent}\`</span>`,
            type: 'template'
          });
        }
      }
      
      // Sort special regions by start position
      specialRegions.sort((a, b) => a.start - b.start);
      
      const syntaxRules = getSyntaxRules();
      
      // Create tokens with positions for proper ordering
      interface Token {
        start: number;
        end: number;
        className: string;
        text: string;
        priority: number;
      }

      const tokens: Token[] = [];

      // Find all tokens, but SKIP content inside special regions
      syntaxRules.forEach(rule => {
        const matches = text.matchAll(rule.pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            const matchStart = match.index;
            const matchEnd = match.index + match[0].length;
            
            // Check if this match overlaps with ANY special region
            // Proper overlap detection: match overlaps if match.start < region.end AND match.end > region.start
            const overlapsSpecial = specialRegions.some(region => 
              matchStart < region.end && matchEnd > region.start
            );
            
            if (overlapsSpecial) continue; // Skip tokens that overlap with comments/templates
            
            // Special handling for variables in formula mode - validate they exist
            if (mode === 'formula' && rule.name === 'variable') {
              const fullMatch = match[0]; // e.g., "$customer.name"
              const withoutDollar = fullMatch.substring(1); // e.g., "customer.name"
              
              // Split on dot to get base variable name
              const dotIndex = withoutDollar.indexOf('.');
              const baseVarName = dotIndex > 0 ? withoutDollar.substring(0, dotIndex) : withoutDollar;
              
              // Only validate the base variable name (property access is always valid)
              const isValid = variableNames.includes(baseVarName) || verbalizations.includes(baseVarName.toLowerCase());
              
              tokens.push({
                start: match.index,
                end: match.index + match[0].length,
                className: isValid ? rule.className : `${mode}-variable-undefined`,
                text: match[0],
                priority: rule.priority,
              });
            } else {
              tokens.push({
                start: match.index,
                end: match.index + match[0].length,
                className: rule.className,
                text: match[0],
                priority: rule.priority,
              });
            }
          }
        }
      });

      // Sort tokens by position, then by priority (higher priority wins for overlaps)
      tokens.sort((a, b) => {
        if (a.start !== b.start) return a.start - b.start;
        return b.priority - a.priority; // Higher priority first
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

      // Merge tokens and special regions, sorted by position
      const allHighlights = [
        ...filteredTokens.map(t => ({ ...t, isSpecial: false })),
        ...specialRegions.map(r => ({ ...r, isSpecial: true }))
      ].sort((a, b) => a.start - b.start);

      allHighlights.forEach(item => {
        // Add text before this highlight (escaped)
        if (item.start > lastIndex) {
          result += escapeHtml(text.substring(lastIndex, item.start));
        }

        if ('isSpecial' in item && item.isSpecial) {
          // Special region - use pre-rendered HTML
          result += (item as SpecialRegion).html;
        } else {
          // Regular token - add highlighted token (escaped)
          const token = item as Token;
          result += `<span class="${token.className}">${escapeHtml(token.text)}</span>`;
        }
        
        lastIndex = item.end;
      });

      // Add remaining text
      if (lastIndex < text.length) {
        result += escapeHtml(text.substring(lastIndex));
      }

      return result;
    } catch (error) {
      // If highlighting fails, return escaped text without highlighting
      console.error('Syntax highlighting error:', error);
      return escapeHtml(text);
    }
  }, [mode, getSyntaxRules, variableNames, verbalizations]);

  return {
    highlightSyntax,
  };
}