# Phase 5.11.1: Vocabulary Data Model & Repository

**Epic:** Vocabulary-Backed Variable System  
**Phase:** 5.11.1  
**Status:** 📋 Planning  
**Dependencies:** None (Foundation phase)  
**Target:** Complete foundational vocabulary system following IBM ADS/ODM patterns

---

## Table of Contents

1. [Overview](#overview)
2. [Goals](#goals)
3. [Architecture](#architecture)
4. [File Structure](#file-structure)
5. [Type Definitions](#type-definitions)
6. [Repository Implementation](#repository-implementation)
7. [Data Persistence](#data-persistence)
8. [Migration Strategy](#migration-strategy)
9. [Testing Strategy](#testing-strategy)
10. [Usage Examples](#usage-examples)
11. [Success Criteria](#success-criteria)

---

## Overview

This phase implements the **Vocabulary Data Model** and **VocabularyRepository** service, which provides the foundational infrastructure for managing business-friendly terms that map to data model attributes.

### What This Enables

**For BAL Editor:**
- Natural language terms backed by structured vocabulary
- Expression patterns: `"the credit score of the applicant"`
- Action patterns: `"set the credit score of the applicant to 750"`
- Context-aware attribute resolution

**For Formula Editor:**
- Optional verbalization of variables
- Business-friendly autocomplete
- Type information from vocabulary
- Data model integration

**For Both:**
- Single source of truth for business terminology
- Variant/alias support
- Type validation
- Documentation integration

---

## Goals

### Primary Goals

1. ✅ **Define comprehensive vocabulary data model** following IBM ADS patterns
2. ✅ **Implement VocabularyRepository service** with full CRUD operations
3. ✅ **Support linguistic patterns** (singular/plural, articles, expressions, actions)
4. ✅ **Enable term resolution** with variant/alias matching
5. ✅ **Provide data persistence** (JSON storage initially)

### Secondary Goals

1. ✅ **Migration path** from existing `VocabularyMapping[]` in balSamples.ts
2. ✅ **Extensibility** for future data model integrations
3. ✅ **Type safety** with comprehensive TypeScript definitions
4. ✅ **Performance** for autocomplete and real-time resolution

### Non-Goals (Future Phases)

- ❌ UI for vocabulary management (Phase 5.11.2)
- ❌ Parser integration (Phase 5.11.3)
- ❌ BAL evaluation (Phase 5.11.4)
- ❌ Formula variable integration (Phase 5.11.5)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Vocabulary System Layer                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │         VocabularyRepository (Service)             │     │
│  │  ┌──────────────────────────────────────────────┐  │     │
│  │  │ • Term Resolution (exact + variants)         │  │     │
│  │  │ • CRUD Operations (add/update/delete)        │  │     │
│  │  │ • Search & Filtering                         │  │     │
│  │  │ • Scoping (global/project/formula)           │  │     │
│  │  │ • Validation                                 │  │     │
│  │  └──────────────────────────────────────────────┘  │     │
│  └────────────────────────────────────────────────────┘     │
│                          ↕                                   │
│  ┌────────────────────────────────────────────────────┐     │
│  │      VocabularyDataModel (Type Definitions)        │     │
│  │  ┌──────────────────────────────────────────────┐  │     │
│  │  │ • VocabularyAttribute                        │  │     │
│  │  │ • BusinessObjectModel (BOM)                  │  │     │
│  │  │ • VerbalizationPatterns                      │  │     │
│  │  │ • ValidationRules                            │  │     │
│  │  └──────────────────────────────────────────────┘  │     │
│  └────────────────────────────────────────────────────┘     │
│                          ↕                                   │
│  ┌────────────────────────────────────────────────────┐     │
│  │        VocabularyStorage (Persistence)             │     │
│  │  ┌──────────────────────────────────────────────┐  │     │
│  │  │ • JSON file storage                          │  │     │
│  │  │ • Import/Export utilities                    │  │     │
│  │  │ • Schema validation                          │  │     │
│  │  │ • Migration tools                            │  │     │
│  │  └──────────────────────────────────────────────┘  │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
/services/vocabulary/
├── README.md                          # Service documentation
├── index.ts                           # Barrel exports
│
├── types/
│   ├── VocabularyAttribute.ts         # Core attribute definition
│   ├── BusinessObjectModel.ts         # BOM container type
│   ├── VerbalizationPatterns.ts       # Linguistic pattern types
│   ├── ValidationRules.ts             # Validation type definitions
│   └── index.ts                       # Type exports
│
├── VocabularyRepository.ts            # Main repository service
├── VocabularyStorage.ts               # Persistence layer
├── VocabularyValidator.ts             # Validation utilities
├── VocabularyMigration.ts             # Migration from old format
│
└── __tests__/
    ├── VocabularyRepository.test.ts
    ├── VocabularyStorage.test.ts
    └── VocabularyValidator.test.ts

/data/vocabulary/
├── README.md                          # Vocabulary data documentation
├── global.vocabulary.json             # Global vocabulary definitions
├── loan-application.bom.json          # Sample BOM: Loan Application
└── employee-holiday.bom.json          # Sample BOM: Employee Holiday
```

---

## Type Definitions

### 1. VocabularyAttribute.ts

```typescript
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
```

---

### 2. VocabularyType.ts

```typescript
/**
 * Vocabulary Type System
 * 
 * Aligned with Formula evaluation engine types
 * Extended to support additional ADS/ODM types
 */
export type VocabularyType =
  // Primitive types
  | 'string'
  | 'number'
  | 'boolean'
  
  // Temporal types
  | 'date'
  | 'time'
  | 'datetime'
  | 'duration'
  
  // Complex types
  | 'object'
  | 'list'
  
  // Special types
  | 'any'
  | 'null';

/**
 * Type metadata with constraints
 */
export interface VocabularyTypeInfo {
  baseType: VocabularyType;
  elementType?: VocabularyType;  // For lists: List<number>
  nullable?: boolean;
  defaultValue?: any;
}
```

---

### 3. ValidationRules.ts

```typescript
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
```

---

### 4. BusinessObjectModel.ts

```typescript
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
```

---

## Repository Implementation

### VocabularyRepository.ts

```typescript
/**
 * VocabularyRepository
 * 
 * Central service for managing vocabulary definitions.
 * Provides CRUD operations, term resolution, search, and validation.
 * 
 * Usage:
 * ```typescript
 * const repo = VocabularyRepository.getInstance();
 * const term = repo.resolveTerm('the credit score');
 * ```
 */
export class VocabularyRepository {
  private static instance: VocabularyRepository;
  
  private boms: Map<string, BusinessObjectModel> = new Map();
  private termIndex: Map<string, TermResolution> = new Map();
  private storage: VocabularyStorage;
  
  private constructor() {
    this.storage = new VocabularyStorage();
    this.initialize();
  }
  
  /**
   * Singleton instance
   */
  public static getInstance(): VocabularyRepository {
    if (!VocabularyRepository.instance) {
      VocabularyRepository.instance = new VocabularyRepository();
    }
    return VocabularyRepository.instance;
  }
  
  // ========================================
  // INITIALIZATION
  // ========================================
  
  /**
   * Initialize repository with stored data
   */
  private async initialize(): Promise<void> {
    const boms = await this.storage.loadAll();
    for (const bom of boms) {
      this.addBOM(bom);
    }
  }
  
  // ========================================
  // BOM MANAGEMENT
  // ========================================
  
  /**
   * Add a Business Object Model
   */
  public addBOM(bom: BusinessObjectModel): void {
    this.boms.set(bom.id, bom);
    this.rebuildTermIndex(bom);
    this.storage.save(bom);
  }
  
  /**
   * Get BOM by ID
   */
  public getBOM(id: string): BusinessObjectModel | null {
    return this.boms.get(id) || null;
  }
  
  /**
   * Get all BOMs
   */
  public getAllBOMs(): BusinessObjectModel[] {
    return Array.from(this.boms.values());
  }
  
  /**
   * Update BOM
   */
  public updateBOM(id: string, updates: Partial<BusinessObjectModel>): void {
    const bom = this.boms.get(id);
    if (!bom) {
      throw new Error(`BOM not found: ${id}`);
    }
    
    const updated = { ...bom, ...updates, updatedAt: new Date().toISOString() };
    this.boms.set(id, updated);
    this.rebuildTermIndex(updated);
    this.storage.save(updated);
  }
  
  /**
   * Delete BOM
   */
  public deleteBOM(id: string): void {
    const bom = this.boms.get(id);
    if (bom) {
      this.boms.delete(id);
      this.removeFromTermIndex(bom);
      this.storage.delete(id);
    }
  }
  
  // ========================================
  // TERM RESOLUTION
  // ========================================
  
  /**
   * Resolve a natural language term to vocabulary attribute
   * 
   * Supports:
   * - Exact matches (definite, indefinite, bare)
   * - Variants and aliases
   * - Plural forms
   * - Case-insensitive matching
   * 
   * @param term - Natural language term to resolve
   * @returns Resolved attribute information or null
   * 
   * @example
   * resolveTerm('the credit score')
   * → {
   *     attribute: VocabularyAttribute,
   *     attributePath: 'applicant.creditScore',
   *     matchType: 'definite-singular',
   *     bomId: 'loan-application'
   *   }
   */
  public resolveTerm(term: string): TermResolution | null {
    const normalized = this.normalizeTerm(term);
    return this.termIndex.get(normalized) || null;
  }
  
  /**
   * Resolve multiple variants of a term
   * Returns all attributes that match any variant
   */
  public resolveTermVariants(term: string): TermResolution[] {
    const results: TermResolution[] = [];
    const normalized = this.normalizeTerm(term);
    
    // Exact match
    const exact = this.termIndex.get(normalized);
    if (exact) {
      results.push(exact);
    }
    
    // Fuzzy match on variants
    for (const [key, resolution] of this.termIndex.entries()) {
      if (key.includes(normalized) || normalized.includes(key)) {
        if (!results.find(r => r.attributePath === resolution.attributePath)) {
          results.push(resolution);
        }
      }
    }
    
    return results;
  }
  
  /**
   * Check if a term exists in vocabulary
   */
  public hasTerm(term: string): boolean {
    return this.resolveTerm(term) !== null;
  }
  
  // ========================================
  // ATTRIBUTE OPERATIONS
  // ========================================
  
  /**
   * Add attribute to a BOM
   */
  public addAttribute(
    bomId: string, 
    attribute: VocabularyAttribute,
    parentPath?: string
  ): void {
    const bom = this.boms.get(bomId);
    if (!bom) {
      throw new Error(`BOM not found: ${bomId}`);
    }
    
    if (parentPath) {
      // Add to nested attribute
      const parent = this.findAttribute(bom, parentPath);
      if (!parent) {
        throw new Error(`Parent attribute not found: ${parentPath}`);
      }
      if (!parent.attributes) {
        parent.attributes = [];
      }
      parent.attributes.push(attribute);
    } else {
      // Add to root
      bom.attributes.push(attribute);
    }
    
    this.rebuildTermIndex(bom);
    this.storage.save(bom);
  }
  
  /**
   * Update attribute
   */
  public updateAttribute(
    bomId: string,
    attributePath: string,
    updates: Partial<VocabularyAttribute>
  ): void {
    const bom = this.boms.get(bomId);
    if (!bom) {
      throw new Error(`BOM not found: ${bomId}`);
    }
    
    const attribute = this.findAttribute(bom, attributePath);
    if (!attribute) {
      throw new Error(`Attribute not found: ${attributePath}`);
    }
    
    Object.assign(attribute, updates, { updatedAt: new Date().toISOString() });
    
    this.rebuildTermIndex(bom);
    this.storage.save(bom);
  }
  
  /**
   * Delete attribute
   */
  public deleteAttribute(bomId: string, attributePath: string): void {
    const bom = this.boms.get(bomId);
    if (!bom) {
      throw new Error(`BOM not found: ${bomId}`);
    }
    
    const parts = attributePath.split('.');
    if (parts.length === 1) {
      // Root level
      bom.attributes = bom.attributes.filter(a => a.jsonName !== parts[0]);
    } else {
      // Nested
      const parentPath = parts.slice(0, -1).join('.');
      const parent = this.findAttribute(bom, parentPath);
      if (parent?.attributes) {
        parent.attributes = parent.attributes.filter(
          a => a.jsonName !== parts[parts.length - 1]
        );
      }
    }
    
    this.rebuildTermIndex(bom);
    this.storage.save(bom);
  }
  
  // ========================================
  // SEARCH & FILTERING
  // ========================================
  
  /**
   * Search vocabulary by query
   * Searches across terms, descriptions, tags
   */
  public search(query: string, options?: SearchOptions): SearchResult[] {
    const normalized = this.normalizeTerm(query);
    const results: SearchResult[] = [];
    
    for (const bom of this.boms.values()) {
      this.searchInBOM(bom, normalized, results, options);
    }
    
    return results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, options?.maxResults || 50);
  }
  
  /**
   * Get attributes by type
   */
  public getAttributesByType(type: VocabularyType): VocabularyAttribute[] {
    const results: VocabularyAttribute[] = [];
    
    for (const bom of this.boms.values()) {
      this.collectAttributesByType(bom.attributes, type, results);
    }
    
    return results;
  }
  
  /**
   * Get attributes by tag
   */
  public getAttributesByTag(tag: string): VocabularyAttribute[] {
    const results: VocabularyAttribute[] = [];
    
    for (const bom of this.boms.values()) {
      this.collectAttributesByTag(bom.attributes, tag, results);
    }
    
    return results;
  }
  
  /**
   * Get attributes in scope
   */
  public getAttributesInScope(scope: 'global' | 'project' | 'formula'): VocabularyAttribute[] {
    const results: VocabularyAttribute[] = [];
    
    for (const bom of this.boms.values()) {
      this.collectAttributesByScope(bom.attributes, scope, results);
    }
    
    return results;
  }
  
  // ========================================
  // VALIDATION
  // ========================================
  
  /**
   * Validate a value against vocabulary attribute constraints
   */
  public validate(
    attributePath: string,
    value: any,
    bomId?: string
  ): ValidationResult {
    const attribute = bomId 
      ? this.findAttribute(this.getBOM(bomId)!, attributePath)
      : this.findAttributeAcrossBOMs(attributePath);
    
    if (!attribute) {
      return {
        valid: false,
        errors: [`Attribute not found: ${attributePath}`]
      };
    }
    
    return VocabularyValidator.validate(value, attribute);
  }
  
  // ========================================
  // IMPORT / EXPORT
  // ========================================
  
  /**
   * Import BOM from JSON
   */
  public importFromJSON(json: string): BusinessObjectModel {
    const bom = JSON.parse(json) as BusinessObjectModel;
    VocabularyValidator.validateBOM(bom);
    this.addBOM(bom);
    return bom;
  }
  
  /**
   * Export BOM to JSON
   */
  public exportToJSON(bomId: string): string {
    const bom = this.getBOM(bomId);
    if (!bom) {
      throw new Error(`BOM not found: ${bomId}`);
    }
    return JSON.stringify(bom, null, 2);
  }
  
  /**
   * Export all BOMs
   */
  public exportAll(): string {
    const boms = this.getAllBOMs();
    return JSON.stringify(boms, null, 2);
  }
  
  // ========================================
  // PRIVATE HELPERS
  // ========================================
  
  /**
   * Rebuild term index for fast lookups
   */
  private rebuildTermIndex(bom: BusinessObjectModel): void {
    // Remove old entries for this BOM
    for (const [key, resolution] of this.termIndex.entries()) {
      if (resolution.bomId === bom.id) {
        this.termIndex.delete(key);
      }
    }
    
    // Add new entries
    this.indexAttributes(bom.id, bom.attributes, '');
  }
  
  /**
   * Recursively index attributes and all their verbalizations
   */
  private indexAttributes(
    bomId: string,
    attributes: VocabularyAttribute[],
    pathPrefix: string
  ): void {
    for (const attr of attributes) {
      const fullPath = pathPrefix 
        ? `${pathPrefix}.${attr.jsonName}`
        : attr.jsonName;
      
      // Index singular forms
      this.indexTerm(attr.singular.definite, {
        attribute: attr,
        attributePath: fullPath,
        matchType: 'definite-singular',
        bomId
      });
      
      this.indexTerm(attr.singular.indefinite, {
        attribute: attr,
        attributePath: fullPath,
        matchType: 'indefinite-singular',
        bomId
      });
      
      if (attr.singular.bare) {
        this.indexTerm(attr.singular.bare, {
          attribute: attr,
          attributePath: fullPath,
          matchType: 'bare-singular',
          bomId
        });
      }
      
      // Index singular variants
      if (attr.singular.variants) {
        for (const variant of attr.singular.variants) {
          this.indexTerm(variant, {
            attribute: attr,
            attributePath: fullPath,
            matchType: 'variant-singular',
            bomId
          });
        }
      }
      
      // Index plural forms
      this.indexTerm(attr.plural.definite, {
        attribute: attr,
        attributePath: fullPath,
        matchType: 'definite-plural',
        bomId
      });
      
      this.indexTerm(attr.plural.bare, {
        attribute: attr,
        attributePath: fullPath,
        matchType: 'bare-plural',
        bomId
      });
      
      // Index plural variants
      if (attr.plural.variants) {
        for (const variant of attr.plural.variants) {
          this.indexTerm(variant, {
            attribute: attr,
            attributePath: fullPath,
            matchType: 'variant-plural',
            bomId
          });
        }
      }
      
      // Recursively index nested attributes
      if (attr.attributes) {
        this.indexAttributes(bomId, attr.attributes, fullPath);
      }
    }
  }
  
  /**
   * Add term to index with normalization
   */
  private indexTerm(term: string, resolution: TermResolution): void {
    const normalized = this.normalizeTerm(term);
    this.termIndex.set(normalized, resolution);
  }
  
  /**
   * Normalize term for case-insensitive matching
   */
  private normalizeTerm(term: string): string {
    return term.toLowerCase().trim();
  }
  
  /**
   * Remove BOM entries from term index
   */
  private removeFromTermIndex(bom: BusinessObjectModel): void {
    for (const [key, resolution] of this.termIndex.entries()) {
      if (resolution.bomId === bom.id) {
        this.termIndex.delete(key);
      }
    }
  }
  
  /**
   * Find attribute by path within a BOM
   */
  private findAttribute(
    bom: BusinessObjectModel,
    path: string
  ): VocabularyAttribute | null {
    const parts = path.split('.');
    let current: VocabularyAttribute | undefined;
    let attributes = bom.attributes;
    
    for (const part of parts) {
      current = attributes.find(a => a.jsonName === part);
      if (!current) return null;
      if (current.attributes) {
        attributes = current.attributes;
      }
    }
    
    return current || null;
  }
  
  /**
   * Find attribute across all BOMs
   */
  private findAttributeAcrossBOMs(path: string): VocabularyAttribute | null {
    for (const bom of this.boms.values()) {
      const attr = this.findAttribute(bom, path);
      if (attr) return attr;
    }
    return null;
  }
  
  /**
   * Search within a BOM
   */
  private searchInBOM(
    bom: BusinessObjectModel,
    query: string,
    results: SearchResult[],
    options?: SearchOptions
  ): void {
    this.searchInAttributes(bom.id, bom.attributes, '', query, results, options);
  }
  
  /**
   * Recursively search attributes
   */
  private searchInAttributes(
    bomId: string,
    attributes: VocabularyAttribute[],
    pathPrefix: string,
    query: string,
    results: SearchResult[],
    options?: SearchOptions
  ): void {
    for (const attr of attributes) {
      const fullPath = pathPrefix 
        ? `${pathPrefix}.${attr.jsonName}`
        : attr.jsonName;
      
      let relevance = 0;
      
      // Check singular forms
      if (attr.singular.definite.toLowerCase().includes(query)) relevance += 10;
      if (attr.singular.indefinite.toLowerCase().includes(query)) relevance += 8;
      if (attr.singular.bare?.toLowerCase().includes(query)) relevance += 7;
      
      // Check variants
      if (attr.singular.variants) {
        for (const variant of attr.singular.variants) {
          if (variant.toLowerCase().includes(query)) relevance += 5;
        }
      }
      
      // Check documentation
      if (attr.documentation?.toLowerCase().includes(query)) relevance += 3;
      
      // Check tags
      if (attr.tags) {
        for (const tag of attr.tags) {
          if (tag.toLowerCase().includes(query)) relevance += 2;
        }
      }
      
      if (relevance > 0) {
        results.push({
          attribute: attr,
          attributePath: fullPath,
          bomId,
          relevance
        });
      }
      
      // Recurse into nested attributes
      if (attr.attributes) {
        this.searchInAttributes(bomId, attr.attributes, fullPath, query, results, options);
      }
    }
  }
  
  /**
   * Collect attributes by type
   */
  private collectAttributesByType(
    attributes: VocabularyAttribute[],
    type: VocabularyType,
    results: VocabularyAttribute[]
  ): void {
    for (const attr of attributes) {
      if (attr.type === type) {
        results.push(attr);
      }
      if (attr.attributes) {
        this.collectAttributesByType(attr.attributes, type, results);
      }
    }
  }
  
  /**
   * Collect attributes by tag
   */
  private collectAttributesByTag(
    attributes: VocabularyAttribute[],
    tag: string,
    results: VocabularyAttribute[]
  ): void {
    for (const attr of attributes) {
      if (attr.tags?.includes(tag)) {
        results.push(attr);
      }
      if (attr.attributes) {
        this.collectAttributesByTag(attr.attributes, tag, results);
      }
    }
  }
  
  /**
   * Collect attributes by scope
   */
  private collectAttributesByScope(
    attributes: VocabularyAttribute[],
    scope: 'global' | 'project' | 'formula',
    results: VocabularyAttribute[]
  ): void {
    for (const attr of attributes) {
      if (attr.scope === scope || !attr.scope) {
        results.push(attr);
      }
      if (attr.attributes) {
        this.collectAttributesByScope(attr.attributes, scope, results);
      }
    }
  }
}

// ========================================
// SUPPORTING TYPES
// ========================================

/**
 * Term resolution result
 */
export interface TermResolution {
  attribute: VocabularyAttribute;
  attributePath: string;
  matchType: 
    | 'definite-singular' 
    | 'indefinite-singular' 
    | 'bare-singular'
    | 'variant-singular'
    | 'definite-plural'
    | 'bare-plural'
    | 'variant-plural';
  bomId: string;
}

/**
 * Search options
 */
export interface SearchOptions {
  maxResults?: number;
  types?: VocabularyType[];
  tags?: string[];
  scope?: 'global' | 'project' | 'formula';
}

/**
 * Search result
 */
export interface SearchResult {
  attribute: VocabularyAttribute;
  attributePath: string;
  bomId: string;
  relevance: number;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}
```

---

## Data Persistence

### VocabularyStorage.ts

```typescript
/**
 * VocabularyStorage
 * 
 * Handles persistence of vocabulary data to/from JSON files.
 * Initial implementation uses local storage; future versions may support:
 * - Database storage
 * - API synchronization
 * - Version control integration
 */
export class VocabularyStorage {
  private readonly dataDir = '/data/vocabulary';
  
  /**
   * Load all BOMs from storage
   */
  public async loadAll(): Promise<BusinessObjectModel[]> {
    const boms: BusinessObjectModel[] = [];
    
    try {
      // Load global vocabulary
      const globalPath = `${this.dataDir}/global.vocabulary.json`;
      const globalBOM = await this.loadFromFile(globalPath);
      if (globalBOM) {
        boms.push(globalBOM);
      }
      
      // Load individual BOM files
      const files = await this.listFiles(this.dataDir);
      for (const file of files) {
        if (file.endsWith('.bom.json')) {
          const bom = await this.loadFromFile(`${this.dataDir}/${file}`);
          if (bom) {
            boms.push(bom);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load vocabulary data:', error);
    }
    
    return boms;
  }
  
  /**
   * Save a BOM to storage
   */
  public async save(bom: BusinessObjectModel): Promise<void> {
    const filename = `${bom.id}.bom.json`;
    const filepath = `${this.dataDir}/${filename}`;
    
    try {
      await this.saveToFile(filepath, bom);
    } catch (error) {
      console.error(`Failed to save BOM ${bom.id}:`, error);
      throw error;
    }
  }
  
  /**
   * Delete a BOM from storage
   */
  public async delete(bomId: string): Promise<void> {
    const filename = `${bomId}.bom.json`;
    const filepath = `${this.dataDir}/${filename}`;
    
    try {
      await this.deleteFile(filepath);
    } catch (error) {
      console.error(`Failed to delete BOM ${bomId}:`, error);
      throw error;
    }
  }
  
  // ========================================
  // FILE OPERATIONS
  // ========================================
  
  private async loadFromFile(filepath: string): Promise<BusinessObjectModel | null> {
    // Implementation depends on runtime environment
    // For now, use localStorage or fetch
    return null; // Placeholder
  }
  
  private async saveToFile(filepath: string, bom: BusinessObjectModel): Promise<void> {
    // Implementation depends on runtime environment
    // Placeholder
  }
  
  private async deleteFile(filepath: string): Promise<void> {
    // Implementation depends on runtime environment
    // Placeholder
  }
  
  private async listFiles(dir: string): Promise<string[]> {
    // Implementation depends on runtime environment
    // Placeholder
    return [];
  }
}
```

---

## Migration Strategy

### VocabularyMigration.ts

```typescript
/**
 * VocabularyMigration
 * 
 * Utilities for migrating from old VocabularyMapping[] format
 * to new VocabularyAttribute + BusinessObjectModel format.
 */
export class VocabularyMigration {
  /**
   * Migrate old vocabulary mappings to new BOM format
   * 
   * @param mappings - Old format from balSamples.ts
   * @param bomId - ID for the new BOM
   * @param bomName - Name for the new BOM
   * @returns BusinessObjectModel
   */
  public static migrateVocabularyMappings(
    mappings: OldVocabularyMapping[],
    bomId: string,
    bomName: string
  ): BusinessObjectModel {
    const attributes: VocabularyAttribute[] = [];
    
    for (const mapping of mappings) {
      const attribute = this.convertMapping(mapping);
      attributes.push(attribute);
    }
    
    return {
      id: bomId,
      name: bomName,
      description: `Migrated from legacy vocabulary mappings`,
      attributes,
      version: '1.0.0',
      createdAt: new Date().toISOString(),
      status: 'published'
    };
  }
  
  /**
   * Convert single mapping to VocabularyAttribute
   */
  private static convertMapping(
    mapping: OldVocabularyMapping
  ): VocabularyAttribute {
    // Parse attribute path to determine nesting
    const pathParts = mapping.attributePath.split('.');
    const jsonName = pathParts[pathParts.length - 1];
    
    // Generate verbalizations from term
    const definite = mapping.term.startsWith('the ') 
      ? mapping.term 
      : `the ${mapping.term}`;
    
    const indefinite = this.convertToIndefinite(mapping.term);
    const bare = mapping.term.replace(/^(the|an?)\s+/i, '');
    
    // Generate plural forms
    const plural = this.pluralize(bare);
    
    return {
      jsonName,
      type: this.mapType(mapping.type),
      isList: false,
      elementType: undefined,
      documentation: mapping.description,
      
      singular: {
        definite,
        indefinite,
        bare,
        variants: mapping.variants || []
      },
      
      plural: {
        definite: `the ${plural}`,
        bare: plural,
        variants: mapping.variants?.map(v => this.pluralize(v)) || []
      },
      
      expressions: {
        template: `{${bare}} of {this}`,
        examples: [
          `${definite} of the ${pathParts[0]}`,
          `${indefinite} of a ${pathParts[0]}`
        ]
      },
      
      actions: {
        template: `set ${definite} of {this} to {value}`,
        examples: [
          `set ${definite} of the ${pathParts[0]} to ${indefinite}`
        ]
      },
      
      scope: 'global',
      createdAt: new Date().toISOString()
    };
  }
  
  /**
   * Convert to indefinite article form
   */
  private static convertToIndefinite(term: string): string {
    const bare = term.replace(/^(the|an?)\s+/i, '');
    const article = /^[aeiou]/i.test(bare) ? 'an' : 'a';
    return `${article} ${bare}`;
  }
  
  /**
   * Simple pluralization
   */
  private static pluralize(term: string): string {
    // Very simple rules; real implementation would use pluralize library
    if (term.endsWith('y')) {
      return term.slice(0, -1) + 'ies';
    } else if (term.endsWith('s') || term.endsWith('x') || term.endsWith('ch')) {
      return term + 'es';
    } else {
      return term + 's';
    }
  }
  
  /**
   * Map old type to VocabularyType
   */
  private static mapType(oldType: string): VocabularyType {
    const mapping: Record<string, VocabularyType> = {
      'string': 'string',
      'number': 'number',
      'boolean': 'boolean',
      'date': 'date',
      'object': 'object'
    };
    return mapping[oldType] || 'any';
  }
}

/**
 * Old vocabulary mapping format (from balSamples.ts)
 */
interface OldVocabularyMapping {
  term: string;
  attributePath: string;
  type: string;
  description?: string;
  variants?: string[];
}
```

---

## Testing Strategy

### Test Coverage

1. **Unit Tests**
   - VocabularyRepository CRUD operations
   - Term resolution (exact, variants, plural)
   - Search functionality
   - Validation rules
   - Migration utilities

2. **Integration Tests**
   - Storage persistence
   - BOM import/export
   - Cross-BOM references
   - Term index rebuilding

3. **Performance Tests**
   - Term resolution speed (target: <1ms)
   - Search performance with large vocabularies
   - Index rebuild time

### Test Examples

```typescript
// VocabularyRepository.test.ts
describe('VocabularyRepository', () => {
  describe('resolveTerm', () => {
    it('should resolve definite singular form', () => {
      const repo = VocabularyRepository.getInstance();
      const result = repo.resolveTerm('the credit score');
      
      expect(result).not.toBeNull();
      expect(result?.attributePath).toBe('applicant.creditScore');
      expect(result?.matchType).toBe('definite-singular');
    });
    
    it('should resolve variant terms', () => {
      const repo = VocabularyRepository.getInstance();
      const result = repo.resolveTerm('the FICO score');
      
      expect(result).not.toBeNull();
      expect(result?.attributePath).toBe('applicant.creditScore');
      expect(result?.matchType).toBe('variant-singular');
    });
    
    it('should be case-insensitive', () => {
      const repo = VocabularyRepository.getInstance();
      const result1 = repo.resolveTerm('THE CREDIT SCORE');
      const result2 = repo.resolveTerm('the credit score');
      
      expect(result1?.attributePath).toBe(result2?.attributePath);
    });
  });
  
  describe('search', () => {
    it('should find attributes by partial term match', () => {
      const repo = VocabularyRepository.getInstance();
      const results = repo.search('credit');
      
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].relevance).toBeGreaterThan(0);
    });
  });
});
```

---

## Usage Examples

### Example 1: Creating a BOM

```typescript
import { VocabularyRepository } from './services/vocabulary';

const repo = VocabularyRepository.getInstance();

const loanBOM: BusinessObjectModel = {
  id: 'loan-application',
  name: 'Loan Application',
  description: 'Data model for loan application processing',
  
  attributes: [
    // NON-LIST attribute example
    {
      jsonName: 'creditScore',
      type: 'number',
      isList: false,
      documentation: 'Credit score (300-850)',
      
      singular: {
        definite: 'the credit score',
        indefinite: 'a credit score',
        variants: ['the FICO score', 'the credit rating']
      },
      
      plural: {
        definite: 'the credit scores',
        bare: 'credit scores'
      },
      
      expressions: {
        template: '{credit score} of {this}',
        examples: [
          'the credit score of the applicant',
          'a credit score of an applicant'
        ]
      },
      
      actions: {
        template: 'set the credit score of {this} to {value}',
        examples: [
          'set the credit score of the applicant to 750'
        ]
      },
      
      validation: {
        min: 300,
        max: 850,
        required: true
      }
    },
    
    // LIST attribute example
    {
      jsonName: 'areaNumbers',
      type: 'number',
      isList: true,
      elementType: 'number',
      documentation: 'Area numbers for SSN (list of numbers)',
      
      singular: {
        definite: 'the area number',
        indefinite: 'an area number',
        bare: 'area number'
      },
      
      plural: {
        definite: 'the area numbers',
        bare: 'area numbers'
      },
      
      expressions: {
        template: '{area numbers} of {this}',
        examples: [
          'the area numbers of a SSN',
          'the area numbers of SSNs'
        ]
      },
      
      actions: {
        template: 'set the area numbers of {this} to {value}',
        examples: [
          'set the area numbers of a SSN to area numbers'
        ]
      },
      
      // LIST-SPECIFIC ACTIONS
      listActions: {
        add: {
          template: 'add {0} to the area numbers of {this}',
          examples: [
            'add an area number to the area numbers of a SSN',
            'add 123 to the area numbers of this SSN'
          ]
        },
        remove: {
          template: 'remove {0} from the area numbers of {this}',
          examples: [
            'remove an area number from the area numbers of a SSN',
            'remove 123 from the area numbers of this SSN'
          ]
        },
        clear: {
          template: 'clear the area numbers of {this}',
          examples: [
            'clear the area numbers of a SSN',
            'clear the area numbers of this SSN'
          ]
        }
      },
      
      validation: {
        minItems: 1,
        maxItems: 10,
        uniqueItems: true
      }
    }
  ],
  
  version: '1.0.0',
  status: 'published'
};

repo.addBOM(loanBOM);
```

---

### Example 2: Resolving Terms

```typescript
// Resolve natural language term to attribute
const result = repo.resolveTerm('the credit score');

console.log(result);
// {
//   attribute: { jsonName: 'creditScore', ... },
//   attributePath: 'applicant.creditScore',
//   matchType: 'definite-singular',
//   bomId: 'loan-application'
// }

// Resolve variant
const result2 = repo.resolveTerm('the FICO score');
console.log(result2?.attributePath); // 'applicant.creditScore'

// Check if term exists
const exists = repo.hasTerm('the credit score'); // true
```

---

### Example 3: Searching Vocabulary

```typescript
// Search for attributes
const results = repo.search('credit', {
  maxResults: 10,
  types: ['number'],
  scope: 'global'
});

results.forEach(result => {
  console.log(`${result.attributePath} (relevance: ${result.relevance})`);
});
```

---

### Example 4: Validation

```typescript
// Validate a value
const validationResult = repo.validate('applicant.creditScore', 750);

if (!validationResult.valid) {
  console.error('Validation errors:', validationResult.errors);
}

// Validate with invalid value
const invalidResult = repo.validate('applicant.creditScore', 900);
console.log(invalidResult.errors); // ['Value 900 exceeds maximum 850']
```

---

### Example 5: Migration

```typescript
import { VocabularyMigration } from './services/vocabulary/VocabularyMigration';
import { vocabularyMappings } from './SampleData/balSamples';

// Migrate old format
const migratedBOM = VocabularyMigration.migrateVocabularyMappings(
  vocabularyMappings,
  'loan-application',
  'Loan Application'
);

// Add to repository
repo.addBOM(migratedBOM);

// Export to file
const json = repo.exportToJSON('loan-application');
console.log(json);
```

---

## Success Criteria

### Phase 5.11.1 Complete When:

✅ **Type Definitions Complete**
- [ ] All interfaces defined in `/services/vocabulary/types/`
- [ ] Full TypeScript coverage with JSDoc comments
- [ ] Exports organized in barrel file

✅ **Repository Implemented**
- [ ] VocabularyRepository class complete
- [ ] All CRUD operations working
- [ ] Term resolution with variants
- [ ] Search functionality
- [ ] Validation integration

✅ **Storage Implemented**
- [ ] JSON file persistence
- [ ] Import/export utilities
- [ ] Schema validation

✅ **Migration Complete**
- [ ] Existing vocabularyMappings migrated
- [ ] Sample BOMs created (loan, employee, pricing)
- [ ] Legacy format deprecated

✅ **Tests Passing**
- [ ] 90%+ code coverage
- [ ] All unit tests passing
- [ ] Integration tests passing
- [ ] Performance benchmarks met

✅ **Documentation Complete**
- [ ] Service README with examples
- [ ] Type documentation
- [ ] Usage guide
- [ ] API reference

---

## Next Steps (Future Phases)

After Phase 5.11.1 completion:

**Phase 5.11.2:** Vocabulary Manager UI
- Visual editor for BOMs
- Attribute creation/editing
- Import/export UI
- Validation rule editor

**Phase 5.11.3:** Parser Linguistic Resolution
- Extend tokenizer for vocabulary patterns
- Expression pattern matching
- Action pattern matching
- Context-aware resolution

**Phase 5.11.4:** BAL Editor Evaluation
- Connect to evaluation engine
- Test panel integration
- Variable inspector
- Debugger support

**Phase 5.11.5:** Formula Variable Integration
- Link variables to vocabulary
- Enhanced autocomplete
- Type checking via vocabulary
- Optional natural language syntax

---

## Questions & Decisions Needed

### 1. Storage Strategy
- **Option A:** JSON files in `/data/vocabulary/` (simple, version-control friendly)
- **Option B:** Browser localStorage (fast, client-side only)
- **Option C:** Hybrid (localStorage cache + JSON persistence)

**Recommendation:** Option A for now (simplicity), Option C for production

### 2. Scope Implementation
- Should vocabulary be scoped per-formula, per-project, or global?
- How do we handle scope precedence (formula > project > global)?

**Recommendation:** Support all three with precedence rules

### 3. Plural Detection
- How do we detect if user typed singular vs plural form?
- Does it matter for resolution?

**Recommendation:** Store matchType in resolution, let parser decide intent

### 4. Validation Execution
- When do we validate? (Real-time while typing? On evaluation only?)
- Do we show validation errors in BAL editor syntax highlighting?

**Recommendation:** Real-time for undefined terms, on-evaluation for value constraints

---

## Timeline Estimate

**Optimistic:** 2-3 days  
**Realistic:** 4-5 days  
**Pessimistic:** 7-8 days

### Breakdown:
- Day 1: Type definitions + basic repository structure
- Day 2: Repository implementation (CRUD, resolution)
- Day 3: Search, validation, storage
- Day 4: Migration utilities + sample BOMs
- Day 5: Testing, documentation, refinement

---

## References

- [IBM ADS Data Modeling](https://www.ibm.com/docs/en/decision-intelligence?topic=models-modeling-data)
- `/SampleData/balSamples.ts` - Existing vocabulary mappings
- `/services/evaluationEngine/` - Type system alignment
- `/Guidelines.md` - Development patterns

---

**Ready to implement?** Let's start with the type definitions and work our way up to the full repository implementation.