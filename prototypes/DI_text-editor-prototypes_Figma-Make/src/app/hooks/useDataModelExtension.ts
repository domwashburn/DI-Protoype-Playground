/**
 * useDataModelExtension Hook
 * 
 * Provides CRUD operations specifically for data model extensions.
 * More focused than useAutomationDataModel - just for extension management.
 * 
 * @param extensionId - ID of the extension to manage
 * @returns Extension data and operations
 * 
 * @example
 * const { 
 *   extension, 
 *   update, 
 *   validate 
 * } = useDataModelExtension('ext-loan-approval-001');
 */

import { useState, useMemo, useCallback } from 'react';
import {
  dataModelService,
  type DataModelExtension,
  type ValidationResult
} from '../services/dataModelService';
import type { DataModelAttribute } from '../data/dataModels';

export interface UseDataModelExtensionResult {
  // Data
  /** Extension configuration */
  extension: DataModelExtension | null;
  
  /** Validation result for current extension */
  validation: ValidationResult | null;
  
  // State
  /** Loading state */
  isLoading: boolean;
  
  /** Error state */
  error: Error | null;
  
  /** Whether extension is valid */
  isValid: boolean;
  
  // Operations
  /** Update extension (partial updates) */
  update: (updates: Partial<Omit<DataModelExtension, 'id' | 'automationId' | 'baseModelId' | 'createdAt'>>) => void;
  
  /** Validate extension */
  validate: () => ValidationResult;
  
  /** Validate a specific attribute */
  validateAttribute: (attribute: DataModelAttribute) => ValidationResult;
  
  /** Add a custom attribute with validation */
  addAttributeWithValidation: (attribute: DataModelAttribute) => boolean;
  
  /** Refresh extension data */
  refresh: () => void;
}

/**
 * Hook for managing data model extensions
 */
export function useDataModelExtension(
  extensionId?: string
): UseDataModelExtensionResult {
  // Refresh counter
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Error state
  const [error, setError] = useState<Error | null>(null);
  
  // Get extension
  const extension = useMemo(() => {
    if (!extensionId) return null;
    
    try {
      return dataModelService.getExtension(extensionId) || null;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    }
  }, [extensionId, refreshKey]);
  
  // Validate extension
  const validation = useMemo(() => {
    if (!extension) return null;
    
    try {
      return dataModelService.validateExtension(extension);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    }
  }, [extension]);
  
  // Is valid?
  const isValid = useMemo(() => {
    return validation?.isValid || false;
  }, [validation]);
  
  // Update extension
  const update = useCallback((
    updates: Partial<Omit<DataModelExtension, 'id' | 'automationId' | 'baseModelId' | 'createdAt'>>
  ) => {
    if (!extensionId) {
      setError(new Error('No extension ID provided'));
      return;
    }
    
    try {
      setError(null);
      dataModelService.updateExtension(extensionId, updates);
      setRefreshKey(k => k + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [extensionId]);
  
  // Validate (manually trigger)
  const validate = useCallback((): ValidationResult => {
    if (!extension) {
      return {
        isValid: false,
        errors: ['No extension found'],
        warnings: []
      };
    }
    
    return dataModelService.validateExtension(extension);
  }, [extension]);
  
  // Validate attribute
  const validateAttribute = useCallback((attribute: DataModelAttribute): ValidationResult => {
    return dataModelService.validateAttribute(attribute);
  }, []);
  
  // Add attribute with validation
  const addAttributeWithValidation = useCallback((attribute: DataModelAttribute): boolean => {
    if (!extensionId) {
      setError(new Error('No extension ID provided'));
      return false;
    }
    
    // Validate attribute first
    const validation = dataModelService.validateAttribute(attribute);
    if (!validation.isValid) {
      setError(new Error(`Invalid attribute: ${validation.errors.join(', ')}`));
      return false;
    }
    
    try {
      setError(null);
      dataModelService.addAttribute(extensionId, attribute);
      setRefreshKey(k => k + 1);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return false;
    }
  }, [extensionId]);
  
  // Refresh
  const refresh = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);
  
  // Loading state
  const isLoading = false; // Service is synchronous
  
  return {
    // Data
    extension,
    validation,
    
    // State
    isLoading,
    error,
    isValid,
    
    // Operations
    update,
    validate,
    validateAttribute,
    addAttributeWithValidation,
    refresh
  };
}
