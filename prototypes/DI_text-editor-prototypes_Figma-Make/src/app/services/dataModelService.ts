/**
 * Data Model Service
 * 
 * Handles data model resolution, extensions, and operations.
 * Enables automations to extend global base models with custom attributes.
 * 
 * Key Concepts:
 * - Base Models: Global models shared across automations
 * - Extensions: Automation-specific additions to base models
 * - Resolved Models: Base + Extension merged into single model
 * - Vocabulary: Always additive (base + custom both work)
 */

import type { DataModel, DataModelAttribute } from '../data/dataModels';
import { getDataModelById } from '../data/dataModels';

/**
 * Data Model Extension
 * Automation-specific additions/modifications to a base model
 */
export interface DataModelExtension {
  id: string;
  automationId: string;          // Which automation owns this extension
  baseModelId: string;            // Which global model to extend
  
  // Custom attributes added to this automation
  addedAttributes: DataModelAttribute[];
  
  // Vocabulary overrides (attributePath → additional vocabulary terms)
  // These are ADDITIVE - both base and custom vocabulary work
  vocabularyOverrides: Record<string, string[]>;
  
  // Base attributes to hide (if not needed for this automation)
  hiddenAttributes: string[];
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Resolved Data Model
 * Result of merging base model + extension
 */
export interface ResolvedDataModel extends DataModel {
  isExtended: boolean;
  baseModelId?: string;
  extensionId?: string;
  
  // Track source of each attribute
  attributeSources: Map<string, 'global' | 'custom'>;
  
  // Track which attributes have vocabulary overrides
  vocabularyOverrides: Map<string, string[]>;
}

/**
 * Validation result for extensions/attributes
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Data Model Service
 * Provides operations for data model extensions and resolution
 */
export class DataModelService {
  private extensions: Map<string, DataModelExtension> = new Map();
  
  /**
   * Register a data model extension
   */
  registerExtension(extension: DataModelExtension): void {
    this.extensions.set(extension.id, extension);
  }
  
  /**
   * Get extension by ID
   */
  getExtension(extensionId: string): DataModelExtension | undefined {
    return this.extensions.get(extensionId);
  }
  
  /**
   * Get extension for an automation
   */
  getExtensionByAutomation(automationId: string): DataModelExtension | undefined {
    return Array.from(this.extensions.values()).find(
      ext => ext.automationId === automationId
    );
  }
  
  /**
   * Create a new extension for an automation
   */
  createExtension(automationId: string, baseModelId: string): DataModelExtension {
    // Validate base model exists
    const baseModel = getDataModelById(baseModelId);
    if (!baseModel) {
      throw new Error(`Base model not found: ${baseModelId}`);
    }
    
    const extension: DataModelExtension = {
      id: `ext-${automationId}-${Date.now()}`,
      automationId,
      baseModelId,
      addedAttributes: [],
      vocabularyOverrides: {},
      hiddenAttributes: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.registerExtension(extension);
    return extension;
  }
  
  /**
   * Update an existing extension
   */
  updateExtension(
    extensionId: string, 
    updates: Partial<Omit<DataModelExtension, 'id' | 'automationId' | 'baseModelId' | 'createdAt'>>
  ): DataModelExtension {
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      throw new Error(`Extension not found: ${extensionId}`);
    }
    
    const updated: DataModelExtension = {
      ...extension,
      ...updates,
      updatedAt: new Date()
    };
    
    this.extensions.set(extensionId, updated);
    return updated;
  }
  
  /**
   * Delete an extension
   */
  deleteExtension(extensionId: string): boolean {
    return this.extensions.delete(extensionId);
  }
  
  /**
   * Add a custom attribute to an extension
   */
  addAttribute(extensionId: string, attribute: DataModelAttribute): void {
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      throw new Error(`Extension not found: ${extensionId}`);
    }
    
    // Validate attribute doesn't already exist
    const exists = extension.addedAttributes.some(attr => attr.name === attribute.name);
    if (exists) {
      throw new Error(`Attribute already exists: ${attribute.name}`);
    }
    
    extension.addedAttributes.push(attribute);
    extension.updatedAt = new Date();
  }
  
  /**
   * Remove a custom attribute from an extension
   */
  removeAttribute(extensionId: string, attributeName: string): void {
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      throw new Error(`Extension not found: ${extensionId}`);
    }
    
    const index = extension.addedAttributes.findIndex(attr => attr.name === attributeName);
    if (index === -1) {
      throw new Error(`Attribute not found: ${attributeName}`);
    }
    
    extension.addedAttributes.splice(index, 1);
    extension.updatedAt = new Date();
  }
  
  /**
   * Update a custom attribute in an extension
   */
  updateAttribute(
    extensionId: string, 
    attributeName: string, 
    updates: Partial<DataModelAttribute>
  ): void {
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      throw new Error(`Extension not found: ${extensionId}`);
    }
    
    const attribute = extension.addedAttributes.find(attr => attr.name === attributeName);
    if (!attribute) {
      throw new Error(`Attribute not found: ${attributeName}`);
    }
    
    Object.assign(attribute, updates);
    extension.updatedAt = new Date();
  }
  
  /**
   * Add vocabulary terms to an attribute (overrides are additive)
   */
  addVocabulary(extensionId: string, attributePath: string, terms: string[]): void {
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      throw new Error(`Extension not found: ${extensionId}`);
    }
    
    const existing = extension.vocabularyOverrides[attributePath] || [];
    extension.vocabularyOverrides[attributePath] = [
      ...existing,
      ...terms.filter(term => !existing.includes(term))
    ];
    extension.updatedAt = new Date();
  }
  
  /**
   * Remove vocabulary terms from an attribute
   */
  removeVocabulary(extensionId: string, attributePath: string, terms: string[]): void {
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      throw new Error(`Extension not found: ${extensionId}`);
    }
    
    const existing = extension.vocabularyOverrides[attributePath] || [];
    extension.vocabularyOverrides[attributePath] = existing.filter(
      term => !terms.includes(term)
    );
    extension.updatedAt = new Date();
  }
  
  /**
   * Reset vocabulary for an attribute to base model vocabulary only
   */
  resetVocabulary(extensionId: string, attributePath: string): void {
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      throw new Error(`Extension not found: ${extensionId}`);
    }
    
    delete extension.vocabularyOverrides[attributePath];
    extension.updatedAt = new Date();
  }
  
  /**
   * Hide a base model attribute
   */
  hideAttribute(extensionId: string, attributePath: string): void {
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      throw new Error(`Extension not found: ${extensionId}`);
    }
    
    if (!extension.hiddenAttributes.includes(attributePath)) {
      extension.hiddenAttributes.push(attributePath);
      extension.updatedAt = new Date();
    }
  }
  
  /**
   * Unhide a base model attribute
   */
  unhideAttribute(extensionId: string, attributePath: string): void {
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      throw new Error(`Extension not found: ${extensionId}`);
    }
    
    const index = extension.hiddenAttributes.indexOf(attributePath);
    if (index !== -1) {
      extension.hiddenAttributes.splice(index, 1);
      extension.updatedAt = new Date();
    }
  }
  
  /**
   * Resolve a data model for an automation
   * Merges base model + extension into a single resolved model
   */
  resolveModel(automationId: string, extensionId?: string): ResolvedDataModel {
    // Get extension
    const extension = extensionId 
      ? this.extensions.get(extensionId)
      : this.getExtensionByAutomation(automationId);
    
    // If no extension, return base model with minimal wrapper
    if (!extension) {
      // Find base model for this automation (would need automation entity to know which base model)
      // For now, return a not-extended marker
      throw new Error('Cannot resolve model without extension or automation configuration');
    }
    
    // Get base model
    const baseModel = getDataModelById(extension.baseModelId);
    if (!baseModel) {
      throw new Error(`Base model not found: ${extension.baseModelId}`);
    }
    
    // Start with base model attributes
    const resolvedAttributes: DataModelAttribute[] = [];
    const attributeSources = new Map<string, 'global' | 'custom'>();
    const vocabularyOverrides = new Map<string, string[]>();
    
    // Helper to process attributes recursively
    const processAttribute = (
      attr: DataModelAttribute, 
      parentPath: string = ''
    ): DataModelAttribute | null => {
      const attrPath = parentPath ? `${parentPath}.${attr.name}` : attr.name;
      
      // Skip if hidden
      if (extension.hiddenAttributes.includes(attrPath)) {
        return null;
      }
      
      // Track source
      attributeSources.set(attrPath, 'global');
      
      // Clone attribute
      const processed: DataModelAttribute = { ...attr };
      
      // Apply vocabulary overrides (additive)
      if (extension.vocabularyOverrides[attrPath]) {
        const baseVocab = attr.vocabulary || [];
        const customVocab = extension.vocabularyOverrides[attrPath];
        processed.vocabulary = [...baseVocab, ...customVocab];
        vocabularyOverrides.set(attrPath, customVocab);
      }
      
      // Process nested attributes
      if (attr.subAttributes) {
        processed.subAttributes = attr.subAttributes
          .map(subAttr => processAttribute(subAttr, attrPath))
          .filter((a): a is DataModelAttribute => a !== null);
      }
      
      return processed;
    };
    
    // Process all base attributes
    for (const attr of baseModel.attributes) {
      const processed = processAttribute(attr);
      if (processed) {
        resolvedAttributes.push(processed);
      }
    }
    
    // Add custom attributes
    for (const attr of extension.addedAttributes) {
      resolvedAttributes.push({ ...attr });
      attributeSources.set(attr.name, 'custom');
    }
    
    // Build resolved model
    const resolved: ResolvedDataModel = {
      id: `resolved-${automationId}`,
      name: `${baseModel.name} (Extended)`,
      description: `${baseModel.description} with automation-specific additions`,
      attributes: resolvedAttributes,
      
      isExtended: true,
      baseModelId: extension.baseModelId,
      extensionId: extension.id,
      
      attributeSources,
      vocabularyOverrides
    };
    
    return resolved;
  }
  
  /**
   * Get all vocabulary terms for a resolved model
   * Includes base + custom vocabulary (additive)
   */
  getAllVocabulary(resolvedModel: ResolvedDataModel): string[] {
    const terms = new Set<string>();
    
    const collectVocabulary = (attr: DataModelAttribute): void => {
      if (attr.vocabulary) {
        attr.vocabulary.forEach(term => terms.add(term));
      }
      if (attr.subAttributes) {
        attr.subAttributes.forEach(collectVocabulary);
      }
    };
    
    resolvedModel.attributes.forEach(collectVocabulary);
    
    return Array.from(terms);
  }
  
  /**
   * Validate an extension
   */
  validateExtension(extension: DataModelExtension): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Check base model exists
    const baseModel = getDataModelById(extension.baseModelId);
    if (!baseModel) {
      errors.push(`Base model not found: ${extension.baseModelId}`);
    }
    
    // Check for duplicate custom attribute names
    const customNames = new Set<string>();
    for (const attr of extension.addedAttributes) {
      if (customNames.has(attr.name)) {
        errors.push(`Duplicate custom attribute: ${attr.name}`);
      }
      customNames.add(attr.name);
    }
    
    // Check custom attributes don't conflict with base model
    if (baseModel) {
      const baseNames = new Set(baseModel.attributes.map(attr => attr.name));
      for (const attr of extension.addedAttributes) {
        if (baseNames.has(attr.name)) {
          errors.push(`Custom attribute conflicts with base model: ${attr.name}`);
        }
      }
    }
    
    // Validate attribute types
    for (const attr of extension.addedAttributes) {
      const validTypes = ['string', 'number', 'boolean', 'date', 'time', 'list', 'object'];
      if (!validTypes.includes(attr.type)) {
        errors.push(`Invalid attribute type: ${attr.type} for ${attr.name}`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
  
  /**
   * Validate a custom attribute
   */
  validateAttribute(attribute: DataModelAttribute): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Name required
    if (!attribute.name || attribute.name.trim() === '') {
      errors.push('Attribute name is required');
    }
    
    // Type required
    const validTypes = ['string', 'number', 'boolean', 'date', 'time', 'list', 'object'];
    if (!validTypes.includes(attribute.type)) {
      errors.push(`Invalid attribute type: ${attribute.type}`);
    }
    
    // Vocabulary terms should be non-empty
    if (attribute.vocabulary) {
      const emptyTerms = attribute.vocabulary.filter(term => !term || term.trim() === '');
      if (emptyTerms.length > 0) {
        errors.push('Vocabulary terms cannot be empty');
      }
    }
    
    // Object type should have sub-attributes
    if (attribute.type === 'object' && (!attribute.subAttributes || attribute.subAttributes.length === 0)) {
      warnings.push('Object type should have sub-attributes defined');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}

/**
 * Singleton instance
 */
export const dataModelService = new DataModelService();
