/**
 * BAL Editor with Vocabulary Support
 * 
 * Phase 5.11.4 Part 2
 * 
 * Wrapper component that adds vocabulary features to BAL Editor.
 * Uses composition pattern to avoid modifying original BAL Editor.
 * 
 * STRANGLER PATTERN:
 * - Original BALEditor.tsx remains UNTOUCHED
 * - This wrapper enhances vocabularyMappings with vocabulary repository terms
 * - BAL Editor's existing syntax highlighting will use enhanced mappings
 * - Feature flag controls which component is used
 * - Easy rollback by using original BALEditor
 * 
 * APPROACH:
 * - BAL Editor already highlights vocabulary terms in vocabularyMappings prop
 * - We enhance that prop by adding vocabulary repository terms
 * - No code changes needed to BAL Editor itself
 * 
 * @module BALEditor/BALEditorWithVocabulary
 */

import React, { useMemo, useEffect, useState } from 'react';
import { BALEditor, BALEditorProps, BALEditorHandle } from './BALEditor';
import { isVocabularyEnabledFor } from '../../services/evaluationEngine/config/vocabularyConfig';
import { getVocabularyResolver, initializeVocabularyResolver } from '../../services/evaluationEngine/parsers/VocabularyResolver';

/**
 * Enhanced BAL Editor with vocabulary support
 * 
 * Adds vocabulary repository terms to vocabularyMappings prop.
 * BAL Editor's existing syntax highlighting will recognize these terms.
 * 
 * @example
 * <BALEditorWithVocabulary
 *   value={code}
 *   onChange={setCode}
 *   errors={errors}
 *   vocabularyMappings={userMappings}
 * />
 */
export const BALEditorWithVocabulary = React.forwardRef<BALEditorHandle, BALEditorProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      errors,
      vocabularyMappings = [],
      ...rest
    } = props;
    
    // Check if vocabulary is enabled for BAL
    const vocabularyEnabled = isVocabularyEnabledFor('bal');
    
    // Initialize vocabulary resolver on mount
    const [resolverReady, setResolverReady] = useState(false);
    
    useEffect(() => {
      if (vocabularyEnabled) {
        initializeVocabularyResolver()
          .then(() => setResolverReady(true))
          .catch(error => {
            console.error('Failed to initialize vocabulary resolver:', error);
          });
      }
    }, [vocabularyEnabled]);
    
    /**
     * Enhanced vocabulary mappings
     * 
     * Combines:
     * - User-provided vocabulary mappings (from props)
     * - Vocabulary repository terms (if enabled)
     */
    const enhancedVocabularyMappings = useMemo(() => {
      // Start with user-provided mappings
      const mappings = [...vocabularyMappings];
      
      // Add vocabulary repository terms if enabled and ready
      if (vocabularyEnabled && resolverReady) {
        try {
          const resolver = getVocabularyResolver();
          if (resolver.isEnabled()) {
            const terms = resolver.getAllTerms();
            
            // Convert vocabulary terms to mapping format
            // BAL Editor expects: { term: string; definition: string; dataType?: string }
            terms.forEach(term => {
              const result = resolver.resolveTerm(term);
              if (result.resolved && result.resolution) {
                mappings.push({
                  term,
                  definition: result.resolution.attributePath,
                  dataType: result.resolution.attribute.type,
                });
              }
            });
          }
        } catch (error) {
          console.error('Failed to load vocabulary mappings:', error);
        }
      }
      
      return mappings;
    }, [vocabularyMappings, vocabularyEnabled, resolverReady]);
    
    // Use BAL Editor with enhanced vocabulary mappings
    // The existing BAL Editor syntax highlighting will recognize these terms
    return (
      <BALEditor
        ref={ref}
        value={value}
        onChange={onChange}
        errors={errors}
        vocabularyMappings={enhancedVocabularyMappings}
        {...rest}
      />
    );
  }
);

BALEditorWithVocabulary.displayName = 'BALEditorWithVocabulary';

/**
 * Default export for easy migration
 */
export default BALEditorWithVocabulary;