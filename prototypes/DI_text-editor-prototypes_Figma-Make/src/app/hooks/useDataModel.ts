/**
 * useDataModel Hook
 * 
 * Provides access to data models for a specific document/example.
 * Centralizes data model logic and makes it easy to swap implementations.
 * 
 * Now supports automation-specific data model resolution for extended models.
 * 
 * @param documentId - ID of the current document/example
 * @param options - Additional options (automationId for extended models)
 * @returns Data model information and utilities
 * 
 * @example
 * // Original usage (backward compatible)
 * const { dataModels, attributes, vocabulary } = useDataModel('holiday-eligibility');
 * 
 * @example
 * // New usage with automation-specific resolution
 * const { dataModels, attributes, vocabulary } = useDataModel('holiday-eligibility', {
 *   automationId: 'auto-holiday-001'
 * });
 */

import { useMemo } from 'react';
import { 
  ALL_DATA_MODELS, 
  getDataModelById,
  getAttributesFromModels,
  getVocabularyFromModels,
  type DataModel,
  type DataModelAttribute 
} from '../data/dataModels';
import { useAutomationDataModel } from './useAutomationDataModel';

/**
 * Document to Data Model mappings
 * Each document specifies which data models it uses
 */
const DOCUMENT_DATA_MODEL_MAP: Record<string, string[]> = {
  // BAL Examples
  'holiday-eligibility': ['global', 'hr-employee'],
  'loan-approval': ['global', 'loan-financial'],
  'insurance-premium': ['global', 'loan-financial'], // Uses financial models for risk assessment
  
  // Formula Examples
  'discount-calculator': ['global', 'customer-sales'],
  'commission-calculator': ['global', 'customer-sales'],
  'employee-bonus': ['global', 'hr-employee'],
  'loan-payment': ['global', 'loan-financial'],
  
  // Default fallback
  'default': ['global']
};

export interface UseDataModelOptions {
  /** Optional automation ID for automation-specific resolution */
  automationId?: string;
}

export interface UseDataModelResult {
  /** Data models used by this document */
  dataModels: DataModel[];
  
  /** All attributes from the document's data models (flattened) */
  attributes: DataModelAttribute[];
  
  /** All vocabulary terms from the document's data models */
  vocabulary: string[];
  
  /** Get a specific data model by ID */
  getModelById: (id: string) => DataModel | undefined;
  
  /** Check if a model is used by this document */
  usesModel: (modelId: string) => boolean;
  
  /** Whether using an extended (automation-specific) model */
  isExtended?: boolean;
  
  /** Source tracking for attributes (if using extended model) */
  getAttributeSource?: (path: string) => 'global' | 'custom' | null;
}

/**
 * Hook to access data models for a document
 */
export function useDataModel(
  documentId?: string,
  options?: UseDataModelOptions
): UseDataModelResult {
  const { automationId } = options || {};
  
  // Use automation-specific resolution if automationId provided
  const automationModel = useAutomationDataModel(automationId);
  
  // Get model IDs for this document
  const modelIds = useMemo(() => {
    if (!documentId) return ['global']; // Default to global only
    return DOCUMENT_DATA_MODEL_MAP[documentId] || DOCUMENT_DATA_MODEL_MAP['default'];
  }, [documentId]);
  
  // Get data model objects
  // If using automation resolution and extension exists, use resolved model
  const dataModels = useMemo(() => {
    if (automationId && automationModel.resolvedModel) {
      // Use resolved model (base + extension)
      return [automationModel.resolvedModel];
    }
    
    // Original behavior - get models by ID
    return modelIds
      .map(id => getDataModelById(id))
      .filter((model): model is DataModel => model !== undefined);
  }, [automationId, automationModel.resolvedModel, modelIds]);
  
  // Get all attributes
  const attributes = useMemo(() => {
    if (automationId && automationModel.resolvedModel) {
      // Use attributes from resolved model
      return automationModel.resolvedModel.attributes;
    }
    
    // Original behavior
    return getAttributesFromModels(modelIds);
  }, [automationId, automationModel.resolvedModel, modelIds]);
  
  // Get all vocabulary
  const vocabulary = useMemo(() => {
    if (automationId && automationModel.resolvedModel) {
      // Use vocabulary from resolved model (includes base + custom)
      return automationModel.getAllVocabulary();
    }
    
    // Original behavior
    return getVocabularyFromModels(modelIds);
  }, [automationId, automationModel, modelIds]);
  
  // Utility functions
  const getModelById = (id: string) => getDataModelById(id);
  
  const usesModel = (modelId: string) => modelIds.includes(modelId);
  
  return {
    dataModels,
    attributes,
    vocabulary,
    getModelById,
    usesModel,
    
    // Extended model info (if using automation resolution)
    isExtended: automationModel.isExtended,
    getAttributeSource: automationModel.getAttributeSource
  };
}

/**
 * Get all available document IDs
 */
export function getAvailableDocuments(): string[] {
  return Object.keys(DOCUMENT_DATA_MODEL_MAP).filter(id => id !== 'default');
}

/**
 * Add or update a document's data model mapping
 * Useful for dynamic documents
 */
export function setDocumentDataModels(documentId: string, modelIds: string[]): void {
  DOCUMENT_DATA_MODEL_MAP[documentId] = modelIds;
}