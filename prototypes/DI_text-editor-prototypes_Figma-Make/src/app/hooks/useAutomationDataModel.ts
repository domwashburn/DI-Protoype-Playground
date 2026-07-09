/**
 * useAutomationDataModel Hook
 * 
 * Provides access to resolved data models for a specific automation.
 * Handles model resolution (base + extension → merged) and provides
 * mutation operations for managing automation-specific customizations.
 * 
 * @param automationId - ID of the automation
 * @returns Resolved model data and mutation operations
 * 
 * @example
 * const { 
 *   resolvedModel, 
 *   addAttribute, 
 *   addVocabulary 
 * } = useAutomationDataModel('auto-loan-approval');
 */

import { useState, useMemo, useCallback } from 'react';
import {
  dataModelService,
  type ResolvedDataModel,
  type DataModelExtension
} from '../services/dataModelService';
import type { DataModel, DataModelAttribute } from '../data/dataModels';
import { getDataModelById } from '../data/dataModels';

export interface UseAutomationDataModelResult {
  // Data
  /** Resolved data model (base + extension merged) */
  resolvedModel: ResolvedDataModel | null;
  
  /** Base data model (before extension) */
  baseModel: DataModel | null;
  
  /** Extension configuration (if exists) */
  extension: DataModelExtension | null;
  
  // State
  /** Loading state */
  isLoading: boolean;
  
  /** Error state */
  error: Error | null;
  
  // Queries
  /** Whether this automation has an extension */
  isExtended: boolean;
  
  /** Whether extension has custom attributes */
  hasCustomAttributes: boolean;
  
  /** Whether extension has vocabulary overrides */
  hasVocabularyOverrides: boolean;
  
  /** Get source of an attribute (global or custom) */
  getAttributeSource: (path: string) => 'global' | 'custom' | null;
  
  /** Get custom vocabulary for an attribute */
  getCustomVocabulary: (path: string) => string[] | null;
  
  /** Get all vocabulary (base + custom merged) */
  getAllVocabulary: () => string[];
  
  // Mutations - Extension Management
  /** Create a new extension for this automation */
  createExtension: (baseModelId: string) => void;
  
  /** Delete the extension for this automation */
  deleteExtension: () => void;
  
  // Mutations - Attribute Operations
  /** Add a custom attribute */
  addAttribute: (attribute: DataModelAttribute) => void;
  
  /** Remove a custom attribute */
  removeAttribute: (attributeName: string) => void;
  
  /** Update a custom attribute */
  updateAttribute: (attributeName: string, updates: Partial<DataModelAttribute>) => void;
  
  // Mutations - Vocabulary Operations
  /** Add vocabulary terms (additive - merges with base) */
  addVocabulary: (attributePath: string, terms: string[]) => void;
  
  /** Remove vocabulary terms */
  removeVocabulary: (attributePath: string, terms: string[]) => void;
  
  /** Reset vocabulary to base model only */
  resetVocabulary: (attributePath: string) => void;
  
  // Mutations - Attribute Visibility
  /** Hide a base model attribute */
  hideAttribute: (attributePath: string) => void;
  
  /** Unhide a base model attribute */
  unhideAttribute: (attributePath: string) => void;
  
  /** Refresh the model (re-resolve from service) */
  refresh: () => void;
}

/**
 * Hook to access and manage automation data models
 */
export function useAutomationDataModel(
  automationId?: string
): UseAutomationDataModelResult {
  // Refresh counter to trigger re-resolution
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Error state
  const [error, setError] = useState<Error | null>(null);
  
  // Get extension for this automation
  const extension = useMemo(() => {
    if (!automationId) return null;
    
    try {
      return dataModelService.getExtensionByAutomation(automationId) || null;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    }
  }, [automationId, refreshKey]);
  
  // Get base model (if extension exists)
  const baseModel = useMemo(() => {
    if (!extension) return null;
    
    try {
      return getDataModelById(extension.baseModelId) || null;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    }
  }, [extension]);
  
  // Resolve model (merge base + extension)
  const resolvedModel = useMemo(() => {
    if (!automationId || !extension) return null;
    
    try {
      setError(null);
      return dataModelService.resolveModel(automationId, extension.id);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    }
  }, [automationId, extension, refreshKey]);
  
  // Query: Is extended?
  const isExtended = useMemo(() => {
    return resolvedModel?.isExtended || false;
  }, [resolvedModel]);
  
  // Query: Has custom attributes?
  const hasCustomAttributes = useMemo(() => {
    return (extension?.addedAttributes.length || 0) > 0;
  }, [extension]);
  
  // Query: Has vocabulary overrides?
  const hasVocabularyOverrides = useMemo(() => {
    return Object.keys(extension?.vocabularyOverrides || {}).length > 0;
  }, [extension]);
  
  // Query: Get attribute source
  const getAttributeSource = useCallback((path: string): 'global' | 'custom' | null => {
    if (!resolvedModel) return null;
    return resolvedModel.attributeSources.get(path) || null;
  }, [resolvedModel]);
  
  // Query: Get custom vocabulary for attribute
  const getCustomVocabulary = useCallback((path: string): string[] | null => {
    if (!resolvedModel) return null;
    return resolvedModel.vocabularyOverrides.get(path) || null;
  }, [resolvedModel]);
  
  // Query: Get all vocabulary
  const getAllVocabulary = useCallback((): string[] => {
    if (!resolvedModel) return [];
    return dataModelService.getAllVocabulary(resolvedModel);
  }, [resolvedModel]);
  
  // Mutation: Create extension
  const createExtension = useCallback((baseModelId: string) => {
    if (!automationId) {
      setError(new Error('Cannot create extension without automation ID'));
      return;
    }
    
    try {
      setError(null);
      dataModelService.createExtension(automationId, baseModelId);
      setRefreshKey(k => k + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [automationId]);
  
  // Mutation: Delete extension
  const deleteExtension = useCallback(() => {
    if (!extension) {
      setError(new Error('No extension to delete'));
      return;
    }
    
    try {
      setError(null);
      dataModelService.deleteExtension(extension.id);
      setRefreshKey(k => k + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [extension]);
  
  // Mutation: Add attribute
  const addAttribute = useCallback((attribute: DataModelAttribute) => {
    if (!extension) {
      setError(new Error('No extension found - create extension first'));
      return;
    }
    
    try {
      setError(null);
      dataModelService.addAttribute(extension.id, attribute);
      setRefreshKey(k => k + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [extension]);
  
  // Mutation: Remove attribute
  const removeAttribute = useCallback((attributeName: string) => {
    if (!extension) {
      setError(new Error('No extension found'));
      return;
    }
    
    try {
      setError(null);
      dataModelService.removeAttribute(extension.id, attributeName);
      setRefreshKey(k => k + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [extension]);
  
  // Mutation: Update attribute
  const updateAttribute = useCallback((
    attributeName: string,
    updates: Partial<DataModelAttribute>
  ) => {
    if (!extension) {
      setError(new Error('No extension found'));
      return;
    }
    
    try {
      setError(null);
      dataModelService.updateAttribute(extension.id, attributeName, updates);
      setRefreshKey(k => k + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [extension]);
  
  // Mutation: Add vocabulary (ADDITIVE - merges with base)
  const addVocabulary = useCallback((attributePath: string, terms: string[]) => {
    if (!extension) {
      setError(new Error('No extension found - create extension first'));
      return;
    }
    
    try {
      setError(null);
      dataModelService.addVocabulary(extension.id, attributePath, terms);
      setRefreshKey(k => k + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [extension]);
  
  // Mutation: Remove vocabulary
  const removeVocabulary = useCallback((attributePath: string, terms: string[]) => {
    if (!extension) {
      setError(new Error('No extension found'));
      return;
    }
    
    try {
      setError(null);
      dataModelService.removeVocabulary(extension.id, attributePath, terms);
      setRefreshKey(k => k + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [extension]);
  
  // Mutation: Reset vocabulary
  const resetVocabulary = useCallback((attributePath: string) => {
    if (!extension) {
      setError(new Error('No extension found'));
      return;
    }
    
    try {
      setError(null);
      dataModelService.resetVocabulary(extension.id, attributePath);
      setRefreshKey(k => k + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [extension]);
  
  // Mutation: Hide attribute
  const hideAttribute = useCallback((attributePath: string) => {
    if (!extension) {
      setError(new Error('No extension found - create extension first'));
      return;
    }
    
    try {
      setError(null);
      dataModelService.hideAttribute(extension.id, attributePath);
      setRefreshKey(k => k + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [extension]);
  
  // Mutation: Unhide attribute
  const unhideAttribute = useCallback((attributePath: string) => {
    if (!extension) {
      setError(new Error('No extension found'));
      return;
    }
    
    try {
      setError(null);
      dataModelService.unhideAttribute(extension.id, attributePath);
      setRefreshKey(k => k + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [extension]);
  
  // Refresh (force re-resolution)
  const refresh = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);
  
  // Loading state (simple - service is synchronous)
  const isLoading = false; // Service is synchronous, no async operations
  
  return {
    // Data
    resolvedModel,
    baseModel,
    extension,
    
    // State
    isLoading,
    error,
    
    // Queries
    isExtended,
    hasCustomAttributes,
    hasVocabularyOverrides,
    getAttributeSource,
    getCustomVocabulary,
    getAllVocabulary,
    
    // Mutations - Extension Management
    createExtension,
    deleteExtension,
    
    // Mutations - Attribute Operations
    addAttribute,
    removeAttribute,
    updateAttribute,
    
    // Mutations - Vocabulary Operations
    addVocabulary,
    removeVocabulary,
    resetVocabulary,
    
    // Mutations - Attribute Visibility
    hideAttribute,
    unhideAttribute,
    
    // Refresh
    refresh
  };
}
