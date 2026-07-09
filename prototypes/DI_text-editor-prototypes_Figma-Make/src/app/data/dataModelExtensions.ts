/**
 * Data Model Extensions
 * 
 * Sample automation-specific extensions to global base models.
 * These demonstrate how automations can customize global models.
 */

import type { DataModelExtension } from '../services/dataModelService';

/**
 * Extension for Standard Loan Approval automation
 * Extends: loan-financial base model
 */
export const LOAN_APPROVAL_EXTENSION: DataModelExtension = {
  id: 'ext-loan-approval-001',
  automationId: 'auto-loan-approval',
  baseModelId: 'loan-financial',
  
  addedAttributes: [
    {
      name: 'riskScore',
      type: 'number',
      vocabulary: ['risk score', 'calculated risk', 'risk assessment'],
      description: 'Automated risk assessment score (0-100)'
    },
    {
      name: 'approvalOverride',
      type: 'boolean',
      vocabulary: ['override', 'manual approval', 'bypass', 'force approval'],
      description: 'Manual approval override flag for exceptional cases'
    },
    {
      name: 'underwriterNotes',
      type: 'string',
      vocabulary: ['notes', 'underwriter notes', 'comments'],
      description: 'Free-text notes from underwriter'
    }
  ],
  
  vocabularyOverrides: {
    'applicant.creditScore': ['FICO score', 'credit rating', 'creditworthiness'],
    'applicant.income': ['annual income', 'gross income', 'yearly salary']
  },
  
  hiddenAttributes: [],
  
  createdAt: new Date('2025-11-14T10:00:00Z'),
  updatedAt: new Date('2025-11-14T10:00:00Z')
};

/**
 * Extension for Mortgage Approval automation
 * Extends: loan-financial base model
 */
export const MORTGAGE_APPROVAL_EXTENSION: DataModelExtension = {
  id: 'ext-mortgage-approval-001',
  automationId: 'auto-mortgage-approval',
  baseModelId: 'loan-financial',
  
  addedAttributes: [
    {
      name: 'propertyValue',
      type: 'number',
      vocabulary: ['property value', 'home value', 'appraised value', 'market value'],
      description: 'Appraised value of the property'
    },
    {
      name: 'downPaymentPercent',
      type: 'number',
      vocabulary: ['down payment', 'down payment percentage', 'initial payment percent'],
      description: 'Down payment as percentage of property value'
    },
    {
      name: 'debtToIncomeRatio',
      type: 'number',
      vocabulary: ['DTI', 'debt to income ratio', 'debt ratio', 'DTI ratio'],
      description: 'Debt-to-income ratio as percentage'
    },
    {
      name: 'loanToValue',
      type: 'number',
      vocabulary: ['LTV', 'loan to value', 'LTV ratio'],
      description: 'Loan-to-value ratio as percentage'
    },
    {
      name: 'propertyType',
      type: 'string',
      vocabulary: ['property type', 'home type', 'dwelling type'],
      description: 'Type of property (single-family, condo, multi-family, etc.)'
    }
  ],
  
  vocabularyOverrides: {
    'applicant.income': ['household income', 'combined income', 'family income'],
    'loanAmount': ['mortgage amount', 'loan principal', 'financing amount']
  },
  
  hiddenAttributes: [],
  
  createdAt: new Date('2025-11-14T10:30:00Z'),
  updatedAt: new Date('2025-11-14T10:30:00Z')
};

/**
 * Extension for Holiday Eligibility automation
 * Extends: hr-employee base model
 */
export const HOLIDAY_ELIGIBILITY_EXTENSION: DataModelExtension = {
  id: 'ext-holiday-eligibility-001',
  automationId: 'auto-holiday-eligibility',
  baseModelId: 'hr-employee',
  
  addedAttributes: [
    {
      name: 'eligibility',
      type: 'object',
      vocabulary: ['holiday eligibility', 'leave eligibility', 'vacation eligibility'],
      description: 'Calculated holiday eligibility information',
      subAttributes: [
        {
          name: 'isEligibleForFixed',
          type: 'boolean',
          vocabulary: ['eligible for fixed holidays', 'fixed holiday eligible'],
          description: 'Whether employee is eligible for fixed holidays'
        },
        {
          name: 'isEligibleForPersonal',
          type: 'boolean',
          vocabulary: ['eligible for personal holidays', 'personal choice eligible'],
          description: 'Whether employee is eligible for personal choice holidays'
        },
        {
          name: 'totalEligibleDays',
          type: 'number',
          vocabulary: ['total eligible days', 'total holiday days', 'eligible vacation days'],
          description: 'Total number of holiday days eligible for'
        },
        {
          name: 'additionalDaysAfter5Years',
          type: 'number',
          vocabulary: ['additional days', 'bonus days', 'seniority days'],
          description: 'Additional days earned after 5 years of service'
        }
      ]
    },
    {
      name: 'minimumServiceForFixed',
      type: 'number',
      vocabulary: ['minimum service for fixed', 'fixed holiday threshold'],
      description: 'Minimum years of service required for fixed holidays (typically 0.5)'
    },
    {
      name: 'minimumServiceForPersonal',
      type: 'number',
      vocabulary: ['minimum service for personal', 'personal holiday threshold'],
      description: 'Minimum years of service required for personal holidays (typically 1)'
    }
  ],
  
  vocabularyOverrides: {
    'employee.yearsOfService': ['tenure', 'years employed', 'service length', 'employment duration'],
    'employee.department': ['dept', 'business unit', 'division']
  },
  
  hiddenAttributes: ['employee.salary'], // Not needed for holiday calculation
  
  createdAt: new Date('2025-11-14T11:00:00Z'),
  updatedAt: new Date('2025-11-14T11:00:00Z')
};

/**
 * Extension for Employee Bonus automation
 * Extends: hr-employee base model
 */
export const EMPLOYEE_BONUS_EXTENSION: DataModelExtension = {
  id: 'ext-employee-bonus-001',
  automationId: 'auto-employee-bonus',
  baseModelId: 'hr-employee',
  
  addedAttributes: [
    {
      name: 'performanceRating',
      type: 'string',
      vocabulary: ['performance rating', 'performance score', 'rating', 'performance level'],
      description: 'Annual performance rating (Exceptional, Exceeds, Meets, Below)'
    },
    {
      name: 'bonusMultiplier',
      type: 'number',
      vocabulary: ['bonus multiplier', 'bonus factor', 'multiplier'],
      description: 'Multiplier based on performance rating'
    },
    {
      name: 'calculatedBonus',
      type: 'number',
      vocabulary: ['calculated bonus', 'bonus amount', 'bonus payout'],
      description: 'Calculated bonus amount in dollars'
    }
  ],
  
  vocabularyOverrides: {
    'employee.salary': ['base salary', 'annual salary', 'compensation'],
    'employee.yearsOfService': ['years with company', 'tenure', 'seniority']
  },
  
  hiddenAttributes: [],
  
  createdAt: new Date('2025-11-14T11:30:00Z'),
  updatedAt: new Date('2025-11-14T11:30:00Z')
};

/**
 * Extension for Discount Calculator automation
 * Extends: customer-sales base model
 */
export const DISCOUNT_CALCULATOR_EXTENSION: DataModelExtension = {
  id: 'ext-discount-calculator-001',
  automationId: 'auto-discount-calculator',
  baseModelId: 'customer-sales',
  
  addedAttributes: [
    {
      name: 'discountTier',
      type: 'string',
      vocabulary: ['discount tier', 'tier level', 'customer tier'],
      description: 'Discount tier based on purchase history (Bronze, Silver, Gold, Platinum)'
    },
    {
      name: 'seasonalDiscountActive',
      type: 'boolean',
      vocabulary: ['seasonal discount', 'promotional discount', 'special offer'],
      description: 'Whether seasonal discount is currently active'
    },
    {
      name: 'finalDiscountPercent',
      type: 'number',
      vocabulary: ['final discount', 'total discount', 'discount percentage'],
      description: 'Final calculated discount percentage'
    }
  ],
  
  vocabularyOverrides: {
    'customer.totalPurchases': ['lifetime value', 'total spent', 'purchase total'],
    'order.amount': ['order total', 'purchase amount', 'cart total']
  },
  
  hiddenAttributes: [],
  
  createdAt: new Date('2025-11-14T12:00:00Z'),
  updatedAt: new Date('2025-11-14T12:00:00Z')
};

/**
 * All sample extensions
 */
export const ALL_EXTENSIONS: DataModelExtension[] = [
  LOAN_APPROVAL_EXTENSION,
  MORTGAGE_APPROVAL_EXTENSION,
  HOLIDAY_ELIGIBILITY_EXTENSION,
  EMPLOYEE_BONUS_EXTENSION,
  DISCOUNT_CALCULATOR_EXTENSION
];

/**
 * Get extension by ID
 */
export function getExtensionById(id: string): DataModelExtension | undefined {
  return ALL_EXTENSIONS.find(ext => ext.id === id);
}

/**
 * Get extension by automation ID
 */
export function getExtensionByAutomation(automationId: string): DataModelExtension | undefined {
  return ALL_EXTENSIONS.find(ext => ext.automationId === automationId);
}
