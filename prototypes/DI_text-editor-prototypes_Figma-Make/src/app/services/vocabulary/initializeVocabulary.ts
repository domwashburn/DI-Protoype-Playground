/**
 * Vocabulary Initialization
 * 
 * Phase 5.11.4 Part 2
 * 
 * Central initialization for vocabulary system.
 * Loads sample BOMs and initializes repository.
 * 
 * @module vocabulary/initializeVocabulary
 */

import { VocabularyRepository } from './VocabularyRepository';
import { initializeVocabularyResolver } from '../evaluationEngine/parsers/VocabularyResolver';
import type { BOM } from './types';

/**
 * Get loan application BOM data
 * 
 * This function dynamically imports or provides the loan application BOM.
 * In production, this would load from an API or database.
 */
async function getLoanApplicationBOM(): Promise<BOM> {
  // Inline BOM data to avoid build issues with JSON imports
  // This is the same data from /data/vocabulary/loan-application.bom.json
  const loanApplicationBOM: BOM = {
    id: 'loan-application',
    name: 'Loan Application',
    version: '1.0.0',
    description: 'Loan application domain model for mortgage processing',
    classes: [
      {
        name: 'Applicant',
        label: 'the applicant',
        attributes: [
          {
            name: 'creditScore',
            type: 'number',
            label: 'the credit score',
            description: 'FICO credit score',
            constraints: { min: 300, max: 850 }
          },
          {
            name: 'annualIncome',
            type: 'number',
            label: 'the annual income',
            description: 'Total annual income',
            constraints: { min: 0 }
          },
          {
            name: 'monthlyIncome',
            type: 'number',
            label: 'the monthly income',
            description: 'Monthly income',
            constraints: { min: 0 }
          },
          {
            name: 'employmentStatus',
            type: 'string',
            label: 'the employment status',
            description: 'Current employment status',
            constraints: {
              enum: ['employed', 'self-employed', 'unemployed', 'retired']
            }
          },
          {
            name: 'yearsEmployed',
            type: 'number',
            label: 'the years employed',
            description: 'Years at current employer',
            constraints: { min: 0 }
          },
          {
            name: 'firstName',
            type: 'string',
            label: 'the first name',
            description: 'First name'
          },
          {
            name: 'lastName',
            type: 'string',
            label: 'the last name',
            description: 'Last name'
          },
          {
            name: 'dateOfBirth',
            type: 'date',
            label: 'the date of birth',
            description: 'Date of birth'
          },
          {
            name: 'socialSecurityNumber',
            type: 'string',
            label: 'the social security number',
            description: 'SSN'
          }
        ]
      },
      {
        name: 'Loan',
        label: 'the loan',
        attributes: [
          {
            name: 'amount',
            type: 'number',
            label: 'the loan amount',
            description: 'Requested loan amount',
            constraints: { min: 0 }
          },
          {
            name: 'purpose',
            type: 'string',
            label: 'the loan purpose',
            description: 'Purpose of the loan',
            constraints: {
              enum: ['purchase', 'refinance', 'cash-out']
            }
          },
          {
            name: 'type',
            type: 'string',
            label: 'the loan type',
            description: 'Type of loan',
            constraints: {
              enum: ['conventional', 'fha', 'va', 'usda']
            }
          },
          {
            name: 'propertyValue',
            type: 'number',
            label: 'the property value',
            description: 'Property value',
            constraints: { min: 0 }
          },
          {
            name: 'downPayment',
            type: 'number',
            label: 'the down payment',
            description: 'Down payment amount',
            constraints: { min: 0 }
          },
          {
            name: 'interestRate',
            type: 'number',
            label: 'the interest rate',
            description: 'Interest rate',
            constraints: { min: 0, max: 100 }
          }
        ]
      },
      {
        name: 'CalculatedValues',
        label: 'calculated values',
        attributes: [
          {
            name: 'dtiRatio',
            type: 'number',
            label: 'the debt-to-income ratio',
            description: 'Debt to income ratio',
            constraints: { min: 0, max: 100 }
          },
          {
            name: 'ltvRatio',
            type: 'number',
            label: 'the loan-to-value ratio',
            description: 'Loan to value ratio',
            constraints: { min: 0, max: 100 }
          },
          {
            name: 'monthlyPayment',
            type: 'number',
            label: 'the monthly payment',
            description: 'Calculated monthly payment',
            constraints: { min: 0 }
          }
        ]
      }
    ]
  };
  
  return loanApplicationBOM;
}

/**
 * Initialize vocabulary system with sample data
 * 
 * Call this once at application startup.
 * 
 * @returns Promise that resolves when initialization is complete
 * 
 * @example
 * // In App.tsx or main entry point
 * import { initializeVocabularySystem } from './services/vocabulary';
 * 
 * async function initApp() {
 *   await initializeVocabularySystem();
 *   // ... rest of app initialization
 * }
 */
export async function initializeVocabularySystem(): Promise<void> {
  console.log('[Vocabulary] Initializing vocabulary system...');
  
  try {
    // 1. Initialize repository
    const repository = VocabularyRepository.getInstance();
    await repository.initialize();
    console.log('[Vocabulary] Repository initialized');
    
    // 2. Load sample BOMs
    const loanApplicationBOM = await getLoanApplicationBOM();
    repository.addBOM(loanApplicationBOM as any, false); // Don't save to storage yet
    console.log('[Vocabulary] Loaded loan application BOM:', loanApplicationBOM.id);
    
    // 3. Initialize parser resolver
    await initializeVocabularyResolver();
    console.log('[Vocabulary] Parser resolver initialized');
    
    // 4. Log status
    const stats = repository.getStatistics();
    console.log('[Vocabulary] System ready:', {
      boms: stats.bomCount,
      attributes: stats.totalAttributes,
      terms: stats.totalTerms,
    });
    
  } catch (error) {
    console.error('[Vocabulary] Initialization failed:', error);
    throw error;
  }
}

/**
 * Clear all vocabulary data
 * 
 * Useful for testing and development.
 */
export async function clearVocabularySystem(): Promise<void> {
  const repository = VocabularyRepository.getInstance();
  repository.clear();
  console.log('[Vocabulary] System cleared');
}

/**
 * Reload vocabulary data
 * 
 * Clears and re-initializes the vocabulary system.
 */
export async function reloadVocabularySystem(): Promise<void> {
  await clearVocabularySystem();
  await initializeVocabularySystem();
}