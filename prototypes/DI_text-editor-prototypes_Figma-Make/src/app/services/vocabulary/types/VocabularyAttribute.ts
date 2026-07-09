import { VocabularyType } from './VocabularyType';
import { ValidationRules } from './ValidationRules';

/**
 * Vocabulary Attribute Definition
 * 
 * Represents a single attribute in a Business Object Model (BOM) with
 * full IBM ADS-compatible verbalization support.
 * 
 * @example
 * {
 *   jsonName: 'creditScore',
 *   type: 'number',
 *   singular: {
 *     definite: 'the credit score',
 *     indefinite: 'a credit score',
 *     variants: ['the FICO score']
 *   },
 *   expressions: {
 *     template: '{credit score} of {this}',
 *     examples: ['the credit score of the applicant']
 *   }
 * }
 */
export interface VocabularyAttribute {
  // ========================================
  // CORE IDENTITY
  // ========================================
  
  /**
   * JSON property name (camelCase)
   * Used in data model and attribute paths
   * 
   * @example 'creditScore', 'debtToIncomeRatio'
   */
  jsonName: string;
  
  /**
   * Data type of the attribute
   */
  type: VocabularyType;
  
  /**
   * Whether this is a list/array type
   * 
   * @example
   * false → applicant.creditScore (single value)
   * true  → applicant.employers (array)
   */
  isList: boolean;
  
  /**
   * Element type for list attributes
   * Only applicable when isList = true
   * 
   * @example
   * isList: true, elementType: 'number' → List<number>
   * isList: true, elementType: 'string' → List<string>
   */
  elementType?: VocabularyType;
  
  /**
   * Human-readable documentation
   * Displayed in tooltips, help panels, and vocabulary manager
   */
  documentation?: string;
  
  // ========================================
  // VERBALIZATION - SINGULAR FORMS
  // ========================================
  
  /**
   * Singular verbalization patterns
   * Defines how to reference a single instance in natural language
   */
  singular: {
    /**
     * Definite article form: "the X"
     * Most common form in BAL expressions
     * 
     * @example "the credit score", "the applicant"
     */
    definite: string;
    
    /**
     * Indefinite article form: "a/an X"
     * Used in declarations and introductions
     * 
     * @example "a credit score", "an applicant"
     */
    indefinite: string;
    
    /**
     * Bare form: "X" (no article)
     * Optional, for contexts where articles are omitted
     * 
     * @example "credit score", "applicant"
     */
    bare?: string;
    
    /**
     * Alternative phrasings and synonyms
     * All resolve to the same attribute
     * 
     * @example ['the FICO score', 'the credit rating']
     */
    variants?: string[];
  };
  
  // ========================================
  // VERBALIZATION - PLURAL FORMS
  // ========================================
  
  /**
   * Plural verbalization patterns
   * Used when referencing multiple instances or collections
   */
  plural: {
    /**
     * Definite article form: "the Xs"
     * 
     * @example "the credit scores", "the applicants"
     */
    definite: string;
    
    /**
     * Bare plural: "Xs" (no article)
     * 
     * @example "credit scores", "applicants"
     */
    bare: string;
    
    /**
     * Plural variants
     * 
     * @example ['FICO scores', 'credit ratings']
     */
    variants?: string[];
  };
  
  // ========================================
  // EXPRESSION PATTERNS (DATA ACCESS)
  // ========================================
  
  /**
   * Expression patterns for reading attribute values
   * Defines natural language patterns for data access
   */
  expressions: {
    /**
     * Template using placeholders
     * {this} = context object
     * {attribute} = this attribute's verbalization
     * 
     * @example "{credit score} of {this}"
     */
    template: string;
    
    /**
     * Concrete usage examples
     * Used for documentation and parser training
     * 
     * @example [
     *   "the credit score of the applicant",
     *   "the credit score of this applicant",
     *   "a credit score of an applicant"
     * ]
     */
    examples: string[];
  };
  
  // ========================================
  // ACTION PATTERNS (DATA MODIFICATION)
  // ========================================
  
  /**
   * Action patterns for setting/modifying attribute values
   * Defines natural language patterns for data modification
   * 
   * IMPORTANT: Different patterns for single vs list attributes
   * 
   * For NON-LIST attributes (isList: false):
   * - Only 'set' action is applicable
   * - Template uses singular forms
   * 
   * For LIST attributes (isList: true):
   * - Multiple action types: set, add, remove, clear
   * - Templates use plural forms
   * - See `listActions` property below
   */
  actions: {
    /**
     * Template for set/modify actions
     * {this} = context object
     * {value} = new value
     * 
     * @example 
     * NON-LIST: "set the credit score of {this} to {value}"
     * LIST: "set the area numbers of {this} to {value}"
     */
    template: string;
    
    /**
     * Concrete usage examples
     * 
     * @example
     * NON-LIST: [
     *   "set the credit score of the applicant to 750",
     *   "set the credit score of this applicant to a credit score"
     * ]
     * 
     * LIST: [
     *   "set the area numbers of a SSN to area numbers"
     * ]
     */
    examples: string[];
  };
  
  /**
   * List-specific action patterns
   * Only applicable when isList = true
   * 
   * Defines additional operations for list manipulation:
   * - Add: Insert element(s) into the list
   * - Remove: Delete element(s) from the list
   * - Clear: Empty the entire list
   */
  listActions?: {
    /**
     * Add element(s) to list
     */
    add: {
      /**
       * Template for add action
       * {element} = element to add (uses singular indefinite form)
       * {this} = context object
       * 
       * @example "add {0} to the area numbers of {this}"
       */
      template: string;
      
      /**
       * Concrete usage examples
       * 
       * @example [
       *   "add an area number to the area numbers of a SSN",
       *   "add 123 to the area numbers of this SSN"
       * ]
       */
      examples: string[];
    };
    
    /**
     * Remove element(s) from list
     */
    remove: {
      /**
       * Template for remove action
       * {element} = element to remove
       * {this} = context object
       * 
       * @example "remove {0} from the area numbers of {this}"
       */
      template: string;
      
      /**
       * Concrete usage examples
       * 
       * @example [
       *   "remove an area number from the area numbers of a SSN",
       *   "remove 123 from the area numbers of this SSN"
       * ]
       */
      examples: string[];
    };
    
    /**
     * Clear all elements from list
     */
    clear: {
      /**
       * Template for clear action
       * {this} = context object
       * 
       * @example "clear the area numbers of {this}"
       */
      template: string;
      
      /**
       * Concrete usage examples
       * 
       * @example [
       *   "clear the area numbers of a SSN",
       *   "clear the area numbers of this SSN"
       * ]
       */
      examples: string[];
    };
  };
  
  // ========================================
  // NESTED ATTRIBUTES
  // ========================================
  
  /**
   * Child attributes (for object types)
   * Creates hierarchical vocabulary structure
   * 
   * @example
   * applicant (object)
   *   ├── creditScore (number)
   *   ├── debtToIncomeRatio (number)
   *   └── address (object)
   *       ├── street (string)
   *       ├── city (string)
   *       └── zipCode (string)
   */
  attributes?: VocabularyAttribute[];
  
  // ========================================
  // VALIDATION RULES
  // ========================================
  
  /**
   * Runtime validation constraints
   * Applied during evaluation and data entry
   */
  validation?: ValidationRules;
  
  // ========================================
  // METADATA
  // ========================================
  
  /**
   * Scope of this attribute definition
   * Determines where this vocabulary is available
   * 
   * - 'global': Available in all formulas/rules
   * - 'project': Available within a specific project
   * - 'formula': Local to a specific formula
   */
  scope?: 'global' | 'project' | 'formula';
  
  /**
   * Tags for categorization and filtering
   * 
   * @example ['financial', 'customer', 'required']
   */
  tags?: string[];
  
  /**
   * Unique identifier (generated)
   */
  id?: string;
  
  /**
   * Timestamps
   */
  createdAt?: string;
  updatedAt?: string;
}
