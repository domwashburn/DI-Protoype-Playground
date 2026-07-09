/**
 * Validation Rules for Vocabulary Attributes
 * 
 * Applied during:
 * - Data entry in vocabulary manager
 * - Runtime evaluation
 * - Formula validation
 */
export interface ValidationRules {
  // ========================================
  // GENERAL CONSTRAINTS
  // ========================================
  
  /**
   * Whether this attribute is required
   */
  required?: boolean;
  
  /**
   * Custom error message for validation failures
   */
  errorMessage?: string;
  
  // ========================================
  // NUMBER CONSTRAINTS
  // ========================================
  
  /**
   * Minimum value (inclusive)
   * @applies number, date, datetime
   */
  min?: number;
  
  /**
   * Maximum value (inclusive)
   * @applies number, date, datetime
   */
  max?: number;
  
  /**
   * Value must be a multiple of this number
   * @applies number
   * @example multipleOf: 0.01 → enforces 2 decimal places
   */
  multipleOf?: number;
  
  /**
   * Exclusive minimum
   * @applies number
   */
  exclusiveMin?: number;
  
  /**
   * Exclusive maximum
   * @applies number
   */
  exclusiveMax?: number;
  
  // ========================================
  // STRING CONSTRAINTS
  // ========================================
  
  /**
   * Minimum string length
   * @applies string
   */
  minLength?: number;
  
  /**
   * Maximum string length
   * @applies string
   */
  maxLength?: number;
  
  /**
   * Regular expression pattern
   * @applies string
   * @example pattern: '^[A-Z]{2}\\d{5}$' → State + 5 digits
   */
  pattern?: string | RegExp;
  
  /**
   * Format hint
   * @applies string
   * @example 'email', 'url', 'uuid', 'ssn'
   */
  format?: string;
  
  // ========================================
  // ENUMERATION CONSTRAINTS
  // ========================================
  
  /**
   * Allowed values (enum)
   * @applies string, number
   * @example ['pending', 'approved', 'rejected']
   */
  enumValues?: (string | number)[];
  
  /**
   * Labels for enum values (for UI)
   * @example { 'pending': 'Pending Review', 'approved': 'Approved' }
   */
  enumLabels?: Record<string, string>;
  
  // ========================================
  // LIST CONSTRAINTS
  // ========================================
  
  /**
   * Minimum array length
   * @applies list
   */
  minItems?: number;
  
  /**
   * Maximum array length
   * @applies list
   */
  maxItems?: number;
  
  /**
   * All items must be unique
   * @applies list
   */
  uniqueItems?: boolean;
  
  // ========================================
  // CUSTOM VALIDATION
  // ========================================
  
  /**
   * Custom validation function name
   * References a registered validator function
   * 
   * @example 'validateSSN', 'validateCreditScore'
   */
  customValidator?: string;
  
  /**
   * Cross-field validation rules
   * @example
   * {
   *   type: 'greater-than',
   *   field: 'startDate',
   *   message: 'End date must be after start date'
   * }
   */
  crossFieldRules?: Array<{
    type: 'greater-than' | 'less-than' | 'equal-to' | 'not-equal-to';
    field: string;
    message?: string;
  }>;
}
