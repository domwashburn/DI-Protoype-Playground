import { VocabularyAttribute } from './VocabularyAttribute';

/**
 * Business Object Model (BOM)
 * 
 * Top-level container for a collection of related vocabulary attributes.
 * Represents a complete data model for a business domain.
 * 
 * @example
 * - Loan Application BOM
 * - Employee Holiday BOM
 * - Pricing Decision BOM
 */
export interface BusinessObjectModel {
  // ========================================
  // IDENTITY
  // ========================================
  
  /**
   * Unique identifier
   * @example 'loan-application', 'employee-holiday'
   */
  id: string;
  
  /**
   * Human-readable name
   * @example 'Loan Application', 'Employee Holiday Eligibility'
   */
  name: string;
  
  /**
   * Description of this BOM's purpose
   */
  description?: string;
  
  /**
   * Primary namespace for attributes
   * Used as prefix in attribute paths
   * 
   * @example
   * namespace: 'applicant'
   * → applicant.creditScore
   * → applicant.debtToIncomeRatio
   */
  namespace?: string;
  
  // ========================================
  // ATTRIBUTES
  // ========================================
  
  /**
   * All attributes defined in this BOM
   */
  attributes: VocabularyAttribute[];
  
  // ========================================
  // RELATIONSHIPS
  // ========================================
  
  /**
   * References to other BOMs
   * Creates cross-model relationships
   * 
   * @example
   * {
   *   bomId: 'customer',
   *   relationship: 'has-one',
   *   attributeName: 'customer'
   * }
   */
  references?: Array<{
    bomId: string;
    relationship: 'has-one' | 'has-many' | 'belongs-to';
    attributeName?: string;
  }>;
  
  // ========================================
  // VERSIONING
  // ========================================
  
  /**
   * Semantic version
   * @example '1.0.0', '2.1.3'
   */
  version?: string;
  
  /**
   * Changelog entries
   */
  changelog?: Array<{
    version: string;
    date: string;
    changes: string[];
  }>;
  
  // ========================================
  // METADATA
  // ========================================
  
  /**
   * Tags for categorization
   * @example ['financial', 'customer-facing', 'production']
   */
  tags?: string[];
  
  /**
   * Author information
   */
  author?: {
    name: string;
    email?: string;
  };
  
  /**
   * Timestamps
   */
  createdAt?: string;
  updatedAt?: string;
  
  /**
   * Status
   */
  status?: 'draft' | 'review' | 'published' | 'archived';
}
