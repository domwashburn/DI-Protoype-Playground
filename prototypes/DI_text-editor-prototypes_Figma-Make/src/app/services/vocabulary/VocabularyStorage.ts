import { BusinessObjectModel } from './types';

/**
 * VocabularyStorage
 * 
 * Handles persistence of vocabulary data to/from JSON files.
 * Initial implementation uses in-memory storage with localStorage fallback.
 * Future versions may support:
 * - Database storage
 * - API synchronization
 * - Version control integration
 */
export class VocabularyStorage {
  private readonly STORAGE_KEY = 'vocabulary_boms';
  private readonly dataDir = '/data/vocabulary';
  
  /**
   * Load all BOMs from storage
   */
  public async loadAll(): Promise<BusinessObjectModel[]> {
    try {
      // Try localStorage first
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as BusinessObjectModel[];
      }
      
      // Fall back to empty array
      return [];
    } catch (error) {
      console.error('Failed to load vocabulary data:', error);
      return [];
    }
  }
  
  /**
   * Save a BOM to storage
   */
  public async save(bom: BusinessObjectModel): Promise<void> {
    try {
      // Load existing BOMs
      const boms = await this.loadAll();
      
      // Find and update, or add new
      const index = boms.findIndex(b => b.id === bom.id);
      if (index >= 0) {
        boms[index] = bom;
      } else {
        boms.push(bom);
      }
      
      // Save back to storage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(boms));
    } catch (error) {
      console.error(`Failed to save BOM ${bom.id}:`, error);
      throw error;
    }
  }
  
  /**
   * Save all BOMs to storage
   */
  public async saveAll(boms: BusinessObjectModel[]): Promise<void> {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(boms));
    } catch (error) {
      console.error('Failed to save BOMs:', error);
      throw error;
    }
  }
  
  /**
   * Delete a BOM from storage
   */
  public async delete(bomId: string): Promise<void> {
    try {
      const boms = await this.loadAll();
      const filtered = boms.filter(b => b.id !== bomId);
      await this.saveAll(filtered);
    } catch (error) {
      console.error(`Failed to delete BOM ${bomId}:`, error);
      throw error;
    }
  }
  
  /**
   * Clear all vocabulary data
   */
  public async clear(): Promise<void> {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear vocabulary data:', error);
      throw error;
    }
  }
  
  /**
   * Export all BOMs as JSON string
   */
  public async exportAll(): Promise<string> {
    const boms = await this.loadAll();
    return JSON.stringify(boms, null, 2);
  }
  
  /**
   * Import BOMs from JSON string
   */
  public async importAll(json: string): Promise<void> {
    try {
      const boms = JSON.parse(json) as BusinessObjectModel[];
      await this.saveAll(boms);
    } catch (error) {
      console.error('Failed to import vocabulary data:', error);
      throw error;
    }
  }
}
