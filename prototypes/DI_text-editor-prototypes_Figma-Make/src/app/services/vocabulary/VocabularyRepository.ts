import {
  BusinessObjectModel,
  VocabularyAttribute,
  TermResolution,
  SearchOptions,
  SearchResult,
  ValidationResult,
  VocabularyType
} from './types';
import { VocabularyStorage } from './VocabularyStorage';
import { VocabularyValidator } from './VocabularyValidator';

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
  private initialized: boolean = false;
  
  private constructor() {
    this.storage = new VocabularyStorage();
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
  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }
    
    const boms = await this.storage.loadAll();
    for (const bom of boms) {
      this.addBOM(bom, false); // Don't persist during initialization
    }
    
    this.initialized = true;
  }
  
  /**
   * Check if repository is initialized
   */
  public isInitialized(): boolean {
    return this.initialized;
  }
  
  // ========================================
  // BOM MANAGEMENT
  // ========================================
  
  /**
   * Add a Business Object Model
   */
  public addBOM(bom: BusinessObjectModel, persist: boolean = true): void {
    this.boms.set(bom.id, bom);
    this.rebuildTermIndex(bom);
    
    if (persist) {
      this.storage.save(bom);
    }
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
    const validation = VocabularyValidator.validateBOM(bom);
    
    if (!validation.valid) {
      throw new Error(`Invalid BOM: ${validation.errors?.join(', ')}`);
    }
    
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
  public findAttribute(
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
