/**
 * useTestData Hook
 * 
 * Manages test values for variables and attributes in formula/BAL testing.
 * Handles mock data generation, persona-based quick-fill, and validation.
 * 
 * @param config - Configuration for test data management
 * @returns Test data values and operations
 * 
 * @example
 * const { 
 *   attributeValues,
 *   setAttributeValue,
 *   generateMockValues
 * } = useTestData({
 *   attributes: dataModel.attributes,
 *   mode: 'formula'
 * });
 */

import { useState, useCallback, useMemo } from 'react';
import type { DataModelAttribute } from '../data/dataModels';

/**
 * Variable definition for formula testing
 */
export interface Variable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'time' | 'list' | 'object';
  description?: string;
  defaultValue?: any;
}

/**
 * Persona for quick-fill test data
 */
export interface Persona {
  id: string;
  name: string;
  description: string;
  values: Record<string, any>;
}

/**
 * Test data configuration
 */
export interface TestDataConfig {
  /** Variables to test (for formula mode) */
  variables?: Variable[];
  
  /** Attributes to test (from data model) */
  attributes?: DataModelAttribute[];
  
  /** Testing mode */
  mode: 'formula' | 'bal';
  
  /** Available personas for quick-fill */
  personas?: Persona[];
}

/**
 * Validation result for test values
 */
export interface TestValueValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface UseTestDataResult {
  // Test Values
  /** Values for variables (formula mode) */
  variableValues: Record<string, any>;
  
  /** Values for attributes (data model) */
  attributeValues: Record<string, any>;
  
  /** Vocabulary term to attribute mappings */
  vocabularyMappings: Record<string, string>;
  
  // Setters
  /** Set value for a variable */
  setVariableValue: (name: string, value: any) => void;
  
  /** Set value for an attribute */
  setAttributeValue: (path: string, value: any) => void;
  
  /** Set vocabulary mapping */
  setVocabularyMapping: (term: string, attributePath: string) => void;
  
  // Batch Operations
  /** Populate all values from a persona */
  populateFromPersona: (personaId: string) => void;
  
  /** Clear all test values */
  clearAllValues: () => void;
  
  /** Reset to default values */
  resetToDefaults: () => void;
  
  /** Generate mock values for all variables/attributes */
  generateMockValues: () => void;
  
  // Validation
  /** Validate all current values */
  validateAll: () => TestValueValidation;
  
  /** Whether all values are valid */
  isValid: boolean;
  
  /** Available personas */
  availablePersonas: Persona[];
}

/**
 * Generate mock value for an attribute based on its type
 */
function generateMockValueForAttribute(attribute: DataModelAttribute): any {
  switch (attribute.type) {
    case 'string':
      return attribute.name.includes('name') ? 'John Doe' :
             attribute.name.includes('email') ? 'john.doe@example.com' :
             attribute.name.includes('address') ? '123 Main St' :
             'Sample Text';
    
    case 'number':
      return attribute.name.includes('score') ? Math.floor(Math.random() * 100) :
             attribute.name.includes('amount') ? Math.floor(Math.random() * 100000) :
             attribute.name.includes('percent') ? Math.floor(Math.random() * 100) :
             attribute.name.includes('income') ? 75000 :
             Math.floor(Math.random() * 1000);
    
    case 'boolean':
      return Math.random() > 0.5;
    
    case 'date':
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 365));
      return date.toISOString().split('T')[0];
    
    case 'time':
      const hours = Math.floor(Math.random() * 24);
      const minutes = Math.floor(Math.random() * 60);
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    case 'list':
      return ['Item 1', 'Item 2', 'Item 3'];
    
    case 'object':
      // Generate mock values for sub-attributes
      if (attribute.subAttributes) {
        const obj: Record<string, any> = {};
        for (const subAttr of attribute.subAttributes) {
          obj[subAttr.name] = generateMockValueForAttribute(subAttr);
        }
        return obj;
      }
      return {};
    
    default:
      return null;
  }
}

/**
 * Validate a value against an attribute type
 */
function validateValue(value: any, attribute: DataModelAttribute): TestValueValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check type match
  switch (attribute.type) {
    case 'string':
      if (typeof value !== 'string') {
        errors.push(`Expected string, got ${typeof value}`);
      }
      break;
    
    case 'number':
      if (typeof value !== 'number' || isNaN(value)) {
        errors.push(`Expected number, got ${typeof value}`);
      }
      break;
    
    case 'boolean':
      if (typeof value !== 'boolean') {
        errors.push(`Expected boolean, got ${typeof value}`);
      }
      break;
    
    case 'date':
      if (typeof value === 'string') {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(value)) {
          errors.push('Date must be in YYYY-MM-DD format');
        }
      } else {
        errors.push('Date must be a string in YYYY-MM-DD format');
      }
      break;
    
    case 'time':
      if (typeof value === 'string') {
        const timeRegex = /^\d{2}:\d{2}$/;
        if (!timeRegex.test(value)) {
          errors.push('Time must be in HH:MM format');
        }
      } else {
        errors.push('Time must be a string in HH:MM format');
      }
      break;
    
    case 'list':
      if (!Array.isArray(value)) {
        errors.push(`Expected array, got ${typeof value}`);
      }
      break;
    
    case 'object':
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        errors.push(`Expected object, got ${typeof value}`);
      }
      break;
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Hook for managing test data
 */
export function useTestData(config: TestDataConfig): UseTestDataResult {
  const { variables = [], attributes = [], mode, personas = [] } = config;
  
  // State for test values
  const [variableValues, setVariableValues] = useState<Record<string, any>>({});
  const [attributeValues, setAttributeValues] = useState<Record<string, any>>({});
  const [vocabularyMappings, setVocabularyMappings] = useState<Record<string, string>>({});
  
  // Set variable value
  const setVariableValue = useCallback((name: string, value: any) => {
    setVariableValues(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);
  
  // Set attribute value
  const setAttributeValue = useCallback((path: string, value: any) => {
    setAttributeValues(prev => ({
      ...prev,
      [path]: value
    }));
  }, []);
  
  // Set vocabulary mapping
  const setVocabularyMapping = useCallback((term: string, attributePath: string) => {
    setVocabularyMappings(prev => ({
      ...prev,
      [term]: attributePath
    }));
  }, []);
  
  // Populate from persona
  const populateFromPersona = useCallback((personaId: string) => {
    const persona = personas.find(p => p.id === personaId);
    if (!persona) return;
    
    // Set attribute values from persona
    setAttributeValues(persona.values);
    
    // If in formula mode, also populate variables
    if (mode === 'formula' && variables.length > 0) {
      const varValues: Record<string, any> = {};
      for (const variable of variables) {
        if (persona.values[variable.name]) {
          varValues[variable.name] = persona.values[variable.name];
        }
      }
      setVariableValues(varValues);
    }
  }, [personas, mode, variables]);
  
  // Clear all values
  const clearAllValues = useCallback(() => {
    setVariableValues({});
    setAttributeValues({});
    setVocabularyMappings({});
  }, []);
  
  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    // Reset variables to their defaults
    const defaultVarValues: Record<string, any> = {};
    for (const variable of variables) {
      if (variable.defaultValue !== undefined) {
        defaultVarValues[variable.name] = variable.defaultValue;
      }
    }
    setVariableValues(defaultVarValues);
    
    // Reset attributes (no defaults, just clear)
    setAttributeValues({});
    setVocabularyMappings({});
  }, [variables]);
  
  // Generate mock values
  const generateMockValues = useCallback(() => {
    // Generate for variables
    const mockVarValues: Record<string, any> = {};
    for (const variable of variables) {
      // Create a temporary attribute to use the generator
      const tempAttr: DataModelAttribute = {
        name: variable.name,
        type: variable.type,
        vocabulary: []
      };
      mockVarValues[variable.name] = generateMockValueForAttribute(tempAttr);
    }
    setVariableValues(mockVarValues);
    
    // Generate for attributes
    const mockAttrValues: Record<string, any> = {};
    
    const generateForAttribute = (attr: DataModelAttribute, parentPath: string = '') => {
      const path = parentPath ? `${parentPath}.${attr.name}` : attr.name;
      mockAttrValues[path] = generateMockValueForAttribute(attr);
      
      // Recursively generate for sub-attributes
      if (attr.subAttributes) {
        for (const subAttr of attr.subAttributes) {
          generateForAttribute(subAttr, path);
        }
      }
    };
    
    for (const attr of attributes) {
      generateForAttribute(attr);
    }
    
    setAttributeValues(mockAttrValues);
  }, [variables, attributes]);
  
  // Validate all values
  const validateAll = useCallback((): TestValueValidation => {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Validate variable values
    for (const variable of variables) {
      const value = variableValues[variable.name];
      if (value !== undefined) {
        const tempAttr: DataModelAttribute = {
          name: variable.name,
          type: variable.type,
          vocabulary: []
        };
        const validation = validateValue(value, tempAttr);
        errors.push(...validation.errors.map(e => `${variable.name}: ${e}`));
        warnings.push(...validation.warnings.map(w => `${variable.name}: ${w}`));
      }
    }
    
    // Validate attribute values
    const validateAttributeValue = (attr: DataModelAttribute, parentPath: string = '') => {
      const path = parentPath ? `${parentPath}.${attr.name}` : attr.name;
      const value = attributeValues[path];
      
      if (value !== undefined) {
        const validation = validateValue(value, attr);
        errors.push(...validation.errors.map(e => `${path}: ${e}`));
        warnings.push(...validation.warnings.map(w => `${path}: ${w}`));
      }
      
      // Recursively validate sub-attributes
      if (attr.subAttributes) {
        for (const subAttr of attr.subAttributes) {
          validateAttributeValue(subAttr, path);
        }
      }
    };
    
    for (const attr of attributes) {
      validateAttributeValue(attr);
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }, [variables, attributes, variableValues, attributeValues]);
  
  // Is valid?
  const isValid = useMemo(() => {
    const validation = validateAll();
    return validation.isValid;
  }, [validateAll]);
  
  return {
    // Test Values
    variableValues,
    attributeValues,
    vocabularyMappings,
    
    // Setters
    setVariableValue,
    setAttributeValue,
    setVocabularyMapping,
    
    // Batch Operations
    populateFromPersona,
    clearAllValues,
    resetToDefaults,
    generateMockValues,
    
    // Validation
    validateAll,
    isValid,
    availablePersonas: personas
  };
}
