import { VocabularyAttribute, BusinessObjectModel, ValidationResult } from './types';

/**
 * VocabularyValidator
 * 
 * Utility class for validating values against vocabulary attribute constraints
 * and validating BOM structure.
 */
export class VocabularyValidator {
  /**
   * Validate a value against vocabulary attribute constraints
   */
  public static validate(value: any, attribute: VocabularyAttribute): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    if (!attribute.validation) {
      return { valid: true };
    }
    
    const rules = attribute.validation;
    
    // Required check
    if (rules.required && (value === null || value === undefined || value === '')) {
      errors.push(`${attribute.singular.definite} is required`);
      return { valid: false, errors };
    }
    
    // Skip further validation if value is empty and not required
    if (value === null || value === undefined || value === '') {
      return { valid: true };
    }
    
    // Number validations
    if (attribute.type === 'number' && typeof value === 'number') {
      if (rules.min !== undefined && value < rules.min) {
        errors.push(`Value ${value} is less than minimum ${rules.min}`);
      }
      if (rules.max !== undefined && value > rules.max) {
        errors.push(`Value ${value} exceeds maximum ${rules.max}`);
      }
      if (rules.exclusiveMin !== undefined && value <= rules.exclusiveMin) {
        errors.push(`Value ${value} must be greater than ${rules.exclusiveMin}`);
      }
      if (rules.exclusiveMax !== undefined && value >= rules.exclusiveMax) {
        errors.push(`Value ${value} must be less than ${rules.exclusiveMax}`);
      }
      if (rules.multipleOf !== undefined && value % rules.multipleOf !== 0) {
        errors.push(`Value ${value} must be a multiple of ${rules.multipleOf}`);
      }
    }
    
    // String validations
    if (attribute.type === 'string' && typeof value === 'string') {
      if (rules.minLength !== undefined && value.length < rules.minLength) {
        errors.push(`String length ${value.length} is less than minimum ${rules.minLength}`);
      }
      if (rules.maxLength !== undefined && value.length > rules.maxLength) {
        errors.push(`String length ${value.length} exceeds maximum ${rules.maxLength}`);
      }
      if (rules.pattern) {
        const regex = typeof rules.pattern === 'string' ? new RegExp(rules.pattern) : rules.pattern;
        if (!regex.test(value)) {
          errors.push(`Value does not match required pattern`);
        }
      }
    }
    
    // Enum validations
    if (rules.enumValues && !rules.enumValues.includes(value)) {
      errors.push(`Value must be one of: ${rules.enumValues.join(', ')}`);
    }
    
    // List validations
    if (attribute.isList && Array.isArray(value)) {
      if (rules.minItems !== undefined && value.length < rules.minItems) {
        errors.push(`Array length ${value.length} is less than minimum ${rules.minItems}`);
      }
      if (rules.maxItems !== undefined && value.length > rules.maxItems) {
        errors.push(`Array length ${value.length} exceeds maximum ${rules.maxItems}`);
      }
      if (rules.uniqueItems) {
        const unique = new Set(value);
        if (unique.size !== value.length) {
          errors.push(`Array must contain unique items`);
        }
      }
    }
    
    // Custom error message
    if (errors.length > 0 && rules.errorMessage) {
      return {
        valid: false,
        errors: [rules.errorMessage]
      };
    }
    
    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
      warnings: warnings.length > 0 ? warnings : undefined
    };
  }
  
  /**
   * Validate BOM structure
   */
  public static validateBOM(bom: BusinessObjectModel): ValidationResult {
    const errors: string[] = [];
    
    if (!bom.id || typeof bom.id !== 'string') {
      errors.push('BOM must have a valid id');
    }
    
    if (!bom.name || typeof bom.name !== 'string') {
      errors.push('BOM must have a valid name');
    }
    
    if (!bom.attributes || !Array.isArray(bom.attributes)) {
      errors.push('BOM must have an attributes array');
    } else {
      // Validate each attribute
      for (let i = 0; i < bom.attributes.length; i++) {
        const attrErrors = this.validateAttribute(bom.attributes[i], `attributes[${i}]`);
        errors.push(...attrErrors);
      }
    }
    
    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined
    };
  }
  
  /**
   * Validate attribute structure
   */
  private static validateAttribute(attr: VocabularyAttribute, path: string): string[] {
    const errors: string[] = [];
    
    if (!attr.jsonName || typeof attr.jsonName !== 'string') {
      errors.push(`${path}: jsonName is required`);
    }
    
    if (!attr.type) {
      errors.push(`${path}: type is required`);
    }
    
    if (typeof attr.isList !== 'boolean') {
      errors.push(`${path}: isList must be boolean`);
    }
    
    if (!attr.singular || !attr.singular.definite || !attr.singular.indefinite) {
      errors.push(`${path}: singular.definite and singular.indefinite are required`);
    }
    
    if (!attr.plural || !attr.plural.definite || !attr.plural.bare) {
      errors.push(`${path}: plural.definite and plural.bare are required`);
    }
    
    if (!attr.expressions || !attr.expressions.template) {
      errors.push(`${path}: expressions.template is required`);
    }
    
    if (!attr.actions || !attr.actions.template) {
      errors.push(`${path}: actions.template is required`);
    }
    
    // Validate list-specific requirements
    if (attr.isList && !attr.listActions) {
      errors.push(`${path}: listActions required when isList is true`);
    }
    
    // Recursively validate nested attributes
    if (attr.attributes && Array.isArray(attr.attributes)) {
      for (let i = 0; i < attr.attributes.length; i++) {
        const nestedErrors = this.validateAttribute(
          attr.attributes[i],
          `${path}.attributes[${i}]`
        );
        errors.push(...nestedErrors);
      }
    }
    
    return errors;
  }
}
