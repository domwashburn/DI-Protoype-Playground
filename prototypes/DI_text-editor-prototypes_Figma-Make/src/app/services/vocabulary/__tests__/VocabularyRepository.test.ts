import { VocabularyRepository } from '../VocabularyRepository';
import { BusinessObjectModel, VocabularyAttribute } from '../types';

describe('VocabularyRepository', () => {
  let repo: VocabularyRepository;
  
  beforeEach(() => {
    // Get singleton instance
    repo = VocabularyRepository.getInstance();
    
    // Clear any existing data
    const boms = repo.getAllBOMs();
    boms.forEach(bom => repo.deleteBOM(bom.id));
  });
  
  describe('BOM Management', () => {
    it('should add a BOM', () => {
      const bom: BusinessObjectModel = {
        id: 'test-bom',
        name: 'Test BOM',
        attributes: []
      };
      
      repo.addBOM(bom, false); // Don't persist in tests
      
      const retrieved = repo.getBOM('test-bom');
      expect(retrieved).not.toBeNull();
      expect(retrieved?.name).toBe('Test BOM');
    });
    
    it('should get all BOMs', () => {
      const bom1: BusinessObjectModel = {
        id: 'bom-1',
        name: 'BOM 1',
        attributes: []
      };
      
      const bom2: BusinessObjectModel = {
        id: 'bom-2',
        name: 'BOM 2',
        attributes: []
      };
      
      repo.addBOM(bom1, false);
      repo.addBOM(bom2, false);
      
      const boms = repo.getAllBOMs();
      expect(boms.length).toBe(2);
    });
    
    it('should update a BOM', () => {
      const bom: BusinessObjectModel = {
        id: 'test-bom',
        name: 'Original Name',
        attributes: []
      };
      
      repo.addBOM(bom, false);
      repo.updateBOM('test-bom', { name: 'Updated Name' });
      
      const retrieved = repo.getBOM('test-bom');
      expect(retrieved?.name).toBe('Updated Name');
    });
    
    it('should delete a BOM', () => {
      const bom: BusinessObjectModel = {
        id: 'test-bom',
        name: 'Test BOM',
        attributes: []
      };
      
      repo.addBOM(bom, false);
      expect(repo.getBOM('test-bom')).not.toBeNull();
      
      repo.deleteBOM('test-bom');
      expect(repo.getBOM('test-bom')).toBeNull();
    });
  });
  
  describe('Term Resolution', () => {
    beforeEach(() => {
      const bom: BusinessObjectModel = {
        id: 'loan-app',
        name: 'Loan Application',
        attributes: [
          {
            jsonName: 'creditScore',
            type: 'number',
            isList: false,
            singular: {
              definite: 'the credit score',
              indefinite: 'a credit score',
              bare: 'credit score',
              variants: ['the FICO score', 'the credit rating']
            },
            plural: {
              definite: 'the credit scores',
              bare: 'credit scores'
            },
            expressions: {
              template: '{credit score} of {this}',
              examples: ['the credit score of the applicant']
            },
            actions: {
              template: 'set the credit score of {this} to {value}',
              examples: ['set the credit score of the applicant to 750']
            }
          }
        ]
      };
      
      repo.addBOM(bom, false);
    });
    
    it('should resolve definite singular term', () => {
      const result = repo.resolveTerm('the credit score');
      
      expect(result).not.toBeNull();
      expect(result?.attributePath).toBe('creditScore');
      expect(result?.matchType).toBe('definite-singular');
    });
    
    it('should resolve indefinite singular term', () => {
      const result = repo.resolveTerm('a credit score');
      
      expect(result).not.toBeNull();
      expect(result?.matchType).toBe('indefinite-singular');
    });
    
    it('should resolve variant term', () => {
      const result = repo.resolveTerm('the FICO score');
      
      expect(result).not.toBeNull();
      expect(result?.attributePath).toBe('creditScore');
      expect(result?.matchType).toBe('variant-singular');
    });
    
    it('should be case-insensitive', () => {
      const result1 = repo.resolveTerm('THE CREDIT SCORE');
      const result2 = repo.resolveTerm('the credit score');
      
      expect(result1?.attributePath).toBe(result2?.attributePath);
    });
    
    it('should return null for unknown term', () => {
      const result = repo.resolveTerm('unknown term');
      expect(result).toBeNull();
    });
    
    it('should check if term exists', () => {
      expect(repo.hasTerm('the credit score')).toBe(true);
      expect(repo.hasTerm('unknown term')).toBe(false);
    });
  });
  
  describe('Search', () => {
    beforeEach(() => {
      const bom: BusinessObjectModel = {
        id: 'loan-app',
        name: 'Loan Application',
        attributes: [
          {
            jsonName: 'creditScore',
            type: 'number',
            isList: false,
            documentation: 'Credit score from bureau',
            singular: {
              definite: 'the credit score',
              indefinite: 'a credit score'
            },
            plural: {
              definite: 'the credit scores',
              bare: 'credit scores'
            },
            expressions: {
              template: '{credit score} of {this}',
              examples: []
            },
            actions: {
              template: 'set the credit score of {this} to {value}',
              examples: []
            },
            tags: ['financial', 'credit']
          },
          {
            jsonName: 'annualIncome',
            type: 'number',
            isList: false,
            documentation: 'Annual income in dollars',
            singular: {
              definite: 'the annual income',
              indefinite: 'an annual income'
            },
            plural: {
              definite: 'the annual incomes',
              bare: 'annual incomes'
            },
            expressions: {
              template: '{annual income} of {this}',
              examples: []
            },
            actions: {
              template: 'set the annual income of {this} to {value}',
              examples: []
            },
            tags: ['financial', 'income']
          }
        ]
      };
      
      repo.addBOM(bom, false);
    });
    
    it('should find attributes by partial term match', () => {
      const results = repo.search('credit');
      
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].relevance).toBeGreaterThan(0);
      expect(results[0].attributePath).toBe('creditScore');
    });
    
    it('should search in documentation', () => {
      const results = repo.search('bureau');
      
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].attributePath).toBe('creditScore');
    });
    
    it('should search in tags', () => {
      const results = repo.search('financial');
      
      expect(results.length).toBe(2);
    });
    
    it('should sort by relevance', () => {
      const results = repo.search('credit');
      
      // creditScore should rank higher than income
      expect(results[0].attributePath).toBe('creditScore');
    });
  });
  
  describe('Validation', () => {
    beforeEach(() => {
      const bom: BusinessObjectModel = {
        id: 'loan-app',
        name: 'Loan Application',
        attributes: [
          {
            jsonName: 'creditScore',
            type: 'number',
            isList: false,
            singular: {
              definite: 'the credit score',
              indefinite: 'a credit score'
            },
            plural: {
              definite: 'the credit scores',
              bare: 'credit scores'
            },
            expressions: {
              template: '{credit score} of {this}',
              examples: []
            },
            actions: {
              template: 'set the credit score of {this} to {value}',
              examples: []
            },
            validation: {
              required: true,
              min: 300,
              max: 850
            }
          }
        ]
      };
      
      repo.addBOM(bom, false);
    });
    
    it('should validate valid value', () => {
      const result = repo.validate('creditScore', 750, 'loan-app');
      
      expect(result.valid).toBe(true);
      expect(result.errors).toBeUndefined();
    });
    
    it('should reject value below minimum', () => {
      const result = repo.validate('creditScore', 200, 'loan-app');
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Value 200 is less than minimum 300');
    });
    
    it('should reject value above maximum', () => {
      const result = repo.validate('creditScore', 900, 'loan-app');
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Value 900 exceeds maximum 850');
    });
  });
  
  describe('Import/Export', () => {
    it('should export BOM to JSON', () => {
      const bom: BusinessObjectModel = {
        id: 'test-bom',
        name: 'Test BOM',
        attributes: []
      };
      
      repo.addBOM(bom, false);
      const json = repo.exportToJSON('test-bom');
      
      expect(json).toContain('"id": "test-bom"');
      expect(json).toContain('"name": "Test BOM"');
    });
    
    it('should import BOM from JSON', () => {
      const json = JSON.stringify({
        id: 'imported-bom',
        name: 'Imported BOM',
        attributes: []
      });
      
      const bom = repo.importFromJSON(json);
      
      expect(bom.id).toBe('imported-bom');
      expect(repo.getBOM('imported-bom')).not.toBeNull();
    });
    
    it('should export all BOMs', () => {
      const bom1: BusinessObjectModel = {
        id: 'bom-1',
        name: 'BOM 1',
        attributes: []
      };
      
      const bom2: BusinessObjectModel = {
        id: 'bom-2',
        name: 'BOM 2',
        attributes: []
      };
      
      repo.addBOM(bom1, false);
      repo.addBOM(bom2, false);
      
      const json = repo.exportAll();
      
      expect(json).toContain('"id": "bom-1"');
      expect(json).toContain('"id": "bom-2"');
    });
  });
});
