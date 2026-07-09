/**
 * Vocabulary Feature Configuration
 * 
 * Phase 5.11.4 Part 2
 * 
 * Centralized configuration for vocabulary features across editors.
 * Provides per-editor feature flags for gradual rollout.
 * 
 * @module evaluationEngine/config/vocabularyConfig
 */

import { USE_VOCABULARY_RESOLUTION } from '../parsers/VocabularyResolver';

/**
 * Vocabulary feature configuration
 */
export interface VocabularyFeatureConfig {
  /** Master switch - controls all vocabulary features */
  masterEnabled: boolean;
  
  /** Enable vocabulary in BAL Editor */
  enabledInBAL: boolean;
  
  /** Enable vocabulary in Formula Editor */
  enabledInFormula: boolean;
  
  /** Enable vocabulary in test panels */
  enabledInTestPanels: boolean;
  
  /** Enable vocabulary autocomplete */
  enabledAutocomplete: boolean;
  
  /** Enable vocabulary syntax highlighting */
  enabledSyntaxHighlighting: boolean;
  
  /** Enable vocabulary parser resolution */
  enabledParserResolution: boolean;
  
  /** Enable vocabulary validation */
  enabledValidation: boolean;
}

/**
 * Default vocabulary configuration
 * 
 * Phase 5.11.4 Part 2: Enable for BAL Editor only
 * Phase 5.11.5: Will enable for Formula Editor
 */
export const DEFAULT_VOCABULARY_CONFIG: VocabularyFeatureConfig = {
  // Master switch (tied to USE_VOCABULARY_RESOLUTION)
  masterEnabled: USE_VOCABULARY_RESOLUTION,
  
  // Per-editor switches (Phase 5.11.4 Part 2)
  enabledInBAL: true,           // ✅ Enable for BAL
  enabledInFormula: false,      // ⬜ Wait for Phase 5.11.5
  enabledInTestPanels: true,    // ✅ Enable for testing
  
  // Feature-specific switches
  enabledAutocomplete: true,
  enabledSyntaxHighlighting: true,
  enabledParserResolution: true,
  enabledValidation: true,
};

/**
 * Runtime vocabulary configuration
 * Can be modified at runtime for testing/debugging
 */
let runtimeConfig: VocabularyFeatureConfig = { ...DEFAULT_VOCABULARY_CONFIG };

/**
 * Get current vocabulary configuration
 */
export function getVocabularyConfig(): VocabularyFeatureConfig {
  return { ...runtimeConfig };
}

/**
 * Update vocabulary configuration
 * 
 * @param updates - Partial configuration updates
 * 
 * @example
 * // Enable vocabulary in Formula Editor
 * updateVocabularyConfig({ enabledInFormula: true });
 * 
 * // Disable autocomplete
 * updateVocabularyConfig({ enabledAutocomplete: false });
 */
export function updateVocabularyConfig(updates: Partial<VocabularyFeatureConfig>): void {
  runtimeConfig = {
    ...runtimeConfig,
    ...updates,
  };
}

/**
 * Reset vocabulary configuration to defaults
 */
export function resetVocabularyConfig(): void {
  runtimeConfig = { ...DEFAULT_VOCABULARY_CONFIG };
}

/**
 * Check if vocabulary is enabled for a specific editor
 * 
 * @param editor - Editor type
 * @returns Whether vocabulary is enabled for that editor
 */
export function isVocabularyEnabledFor(editor: 'bal' | 'formula' | 'test'): boolean {
  const config = getVocabularyConfig();
  
  // Master switch must be enabled
  if (!config.masterEnabled) {
    return false;
  }
  
  // Check editor-specific switch
  switch (editor) {
    case 'bal':
      return config.enabledInBAL;
    case 'formula':
      return config.enabledInFormula;
    case 'test':
      return config.enabledInTestPanels;
    default:
      return false;
  }
}

/**
 * Check if a specific vocabulary feature is enabled
 * 
 * @param feature - Feature name
 * @returns Whether the feature is enabled
 */
export function isVocabularyFeatureEnabled(
  feature: 'autocomplete' | 'syntax' | 'parser' | 'validation'
): boolean {
  const config = getVocabularyConfig();
  
  // Master switch must be enabled
  if (!config.masterEnabled) {
    return false;
  }
  
  // Check feature-specific switch
  switch (feature) {
    case 'autocomplete':
      return config.enabledAutocomplete;
    case 'syntax':
      return config.enabledSyntaxHighlighting;
    case 'parser':
      return config.enabledParserResolution;
    case 'validation':
      return config.enabledValidation;
    default:
      return false;
  }
}

/**
 * Get feature flag status summary
 * Useful for debugging and diagnostics
 */
export function getVocabularyFeatureStatus(): {
  master: boolean;
  editors: { bal: boolean; formula: boolean; test: boolean };
  features: { autocomplete: boolean; syntax: boolean; parser: boolean; validation: boolean };
} {
  const config = getVocabularyConfig();
  
  return {
    master: config.masterEnabled,
    editors: {
      bal: isVocabularyEnabledFor('bal'),
      formula: isVocabularyEnabledFor('formula'),
      test: isVocabularyEnabledFor('test'),
    },
    features: {
      autocomplete: isVocabularyFeatureEnabled('autocomplete'),
      syntax: isVocabularyFeatureEnabled('syntax'),
      parser: isVocabularyFeatureEnabled('parser'),
      validation: isVocabularyFeatureEnabled('validation'),
    },
  };
}
