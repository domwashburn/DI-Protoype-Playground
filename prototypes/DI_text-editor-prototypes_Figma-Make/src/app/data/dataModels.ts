/**
 * Data Model Definitions
 * 
 * Organized by domain/purpose rather than by example.
 * Used by both BAL and Formula editors.
 */

export interface DataModelAttribute {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'time' | 'list' | 'object';
  vocabulary?: string[]; // Natural language aliases
  description?: string;
  subAttributes?: DataModelAttribute[]; // For nested objects
}

export interface DataModel {
  id: string;
  name: string;
  description: string;
  isGlobal?: boolean; // True for the global data model
  attributes: DataModelAttribute[];
}

/**
 * Global Data Model
 * Always available, contains common system attributes
 */
export const GLOBAL_DATA_MODEL: DataModel = {
  id: 'global',
  name: 'Global Data Model',
  description: 'System-wide attributes available in all contexts',
  isGlobal: true,
  attributes: [
    {
      name: 'currentDate',
      type: 'date',
      vocabulary: ['today', 'current date', 'today\'s date'],
      description: 'Current system date'
    },
    {
      name: 'currentTime',
      type: 'time',
      vocabulary: ['now', 'current time'],
      description: 'Current system time'
    },
    {
      name: 'user',
      type: 'object',
      vocabulary: ['current user', 'logged in user'],
      description: 'Current authenticated user',
      subAttributes: [
        { name: 'id', type: 'string', description: 'User ID' },
        { name: 'name', type: 'string', vocabulary: ['user name', 'username'] },
        { name: 'email', type: 'string', vocabulary: ['user email'] },
        { name: 'role', type: 'string', vocabulary: ['user role'] }
      ]
    }
  ]
};

/**
 * HR/Employee Domain
 * For employee management, leave requests, etc.
 */
export const HR_EMPLOYEE_MODEL: DataModel = {
  id: 'hr-employee',
  name: 'HR & Employee',
  description: 'Employee information, leave management, and HR processes',
  attributes: [
    {
      name: 'employee',
      type: 'object',
      vocabulary: ['the employee', 'worker', 'staff member'],
      description: 'Employee information',
      subAttributes: [
        { 
          name: 'yearsOfService', 
          type: 'number', 
          vocabulary: ['years of service', 'tenure', 'years employed'],
          description: 'Number of years employed'
        },
        { 
          name: 'fullTime', 
          type: 'boolean', 
          vocabulary: ['full time', 'is full time'],
          description: 'Whether employee is full-time'
        },
        { 
          name: 'department', 
          type: 'string', 
          vocabulary: ['dept', 'department name'],
          description: 'Employee department'
        },
        { 
          name: 'jobTitle', 
          type: 'string', 
          vocabulary: ['job title', 'title', 'position'],
          description: 'Employee job title'
        },
        { 
          name: 'salary', 
          type: 'number', 
          vocabulary: ['employee salary', 'pay', 'compensation'],
          description: 'Annual salary'
        }
      ]
    },
    {
      name: 'leaveRequest',
      type: 'object',
      vocabulary: ['leave request', 'time off request', 'vacation request'],
      description: 'Leave/vacation request details',
      subAttributes: [
        { 
          name: 'startDate', 
          type: 'date', 
          vocabulary: ['start date', 'beginning date'],
          description: 'Leave start date'
        },
        { 
          name: 'endDate', 
          type: 'date', 
          vocabulary: ['end date', 'return date'],
          description: 'Leave end date'
        },
        { 
          name: 'days', 
          type: 'number', 
          vocabulary: ['number of days', 'days requested', 'duration'],
          description: 'Number of days requested'
        },
        { 
          name: 'type', 
          type: 'string', 
          vocabulary: ['leave type', 'request type'],
          description: 'Type of leave (vacation, sick, etc.)'
        }
      ]
    }
  ]
};

/**
 * Loan/Financial Domain
 * For loan applications, credit assessments, etc.
 */
export const LOAN_FINANCIAL_MODEL: DataModel = {
  id: 'loan-financial',
  name: 'Loan & Financial',
  description: 'Loan applications, credit scoring, and financial assessments',
  attributes: [
    {
      name: 'applicant',
      type: 'object',
      vocabulary: ['the applicant', 'borrower', 'customer'],
      description: 'Loan applicant information',
      subAttributes: [
        { 
          name: 'age', 
          type: 'number', 
          vocabulary: ['applicant age', 'borrower age'],
          description: 'Applicant age in years'
        },
        { 
          name: 'creditScore', 
          type: 'number', 
          vocabulary: ['credit score', 'FICO score', 'credit rating'],
          description: 'Credit score (300-850)'
        },
        { 
          name: 'income', 
          type: 'number', 
          vocabulary: ['annual income', 'yearly income', 'salary'],
          description: 'Annual income'
        },
        { 
          name: 'employed', 
          type: 'boolean', 
          vocabulary: ['is employed', 'has job', 'working'],
          description: 'Employment status'
        },
        { 
          name: 'yearsEmployed', 
          type: 'number', 
          vocabulary: ['years employed', 'employment duration', 'job tenure'],
          description: 'Years in current employment'
        }
      ]
    },
    {
      name: 'loan',
      type: 'object',
      vocabulary: ['the loan', 'loan application'],
      description: 'Loan details',
      subAttributes: [
        { 
          name: 'amount', 
          type: 'number', 
          vocabulary: ['loan amount', 'requested amount', 'principal'],
          description: 'Requested loan amount'
        },
        { 
          name: 'term', 
          type: 'number', 
          vocabulary: ['loan term', 'duration', 'repayment period'],
          description: 'Loan term in months'
        },
        { 
          name: 'purpose', 
          type: 'string', 
          vocabulary: ['loan purpose', 'reason'],
          description: 'Purpose of loan (home, auto, etc.)'
        },
        { 
          name: 'interestRate', 
          type: 'number', 
          vocabulary: ['interest rate', 'APR', 'rate'],
          description: 'Interest rate percentage'
        }
      ]
    }
  ]
};

/**
 * Customer/Sales Domain
 * For customer management, sales, discounts, etc.
 */
export const CUSTOMER_SALES_MODEL: DataModel = {
  id: 'customer-sales',
  name: 'Customer & Sales',
  description: 'Customer information, orders, and sales processes',
  attributes: [
    {
      name: 'customer',
      type: 'object',
      vocabulary: ['the customer', 'client', 'buyer'],
      description: 'Customer information',
      subAttributes: [
        { 
          name: 'loyaltyTier', 
          type: 'string', 
          vocabulary: ['loyalty tier', 'membership level', 'tier'],
          description: 'Customer loyalty tier (bronze, silver, gold, platinum)'
        },
        { 
          name: 'accountAge', 
          type: 'number', 
          vocabulary: ['account age', 'years as customer', 'customer tenure'],
          description: 'Years as customer'
        },
        { 
          name: 'totalSpent', 
          type: 'number', 
          vocabulary: ['total spent', 'lifetime value', 'total purchases'],
          description: 'Total amount spent'
        },
        { 
          name: 'lastPurchaseDate', 
          type: 'date', 
          vocabulary: ['last purchase', 'most recent purchase'],
          description: 'Date of last purchase'
        }
      ]
    },
    {
      name: 'order',
      type: 'object',
      vocabulary: ['the order', 'purchase', 'transaction'],
      description: 'Order/transaction details',
      subAttributes: [
        { 
          name: 'subtotal', 
          type: 'number', 
          vocabulary: ['order subtotal', 'subtotal amount'],
          description: 'Order subtotal before discounts'
        },
        { 
          name: 'itemCount', 
          type: 'number', 
          vocabulary: ['item count', 'number of items', 'quantity'],
          description: 'Number of items in order'
        },
        { 
          name: 'category', 
          type: 'string', 
          vocabulary: ['order category', 'product category'],
          description: 'Primary product category'
        }
      ]
    }
  ]
};

/**
 * All available data models
 */
export const ALL_DATA_MODELS: DataModel[] = [
  GLOBAL_DATA_MODEL,
  HR_EMPLOYEE_MODEL,
  LOAN_FINANCIAL_MODEL,
  CUSTOMER_SALES_MODEL
];

/**
 * Get data model by ID
 */
export function getDataModelById(id: string): DataModel | undefined {
  return ALL_DATA_MODELS.find(model => model.id === id);
}

/**
 * Get all attributes from multiple data models (flattened)
 */
export function getAttributesFromModels(modelIds: string[]): DataModelAttribute[] {
  const attributes: DataModelAttribute[] = [];
  
  for (const id of modelIds) {
    const model = getDataModelById(id);
    if (model) {
      attributes.push(...model.attributes);
    }
  }
  
  return attributes;
}

/**
 * Get all vocabulary terms from multiple data models
 */
export function getVocabularyFromModels(modelIds: string[]): string[] {
  const vocabulary = new Set<string>();
  
  for (const id of modelIds) {
    const model = getDataModelById(id);
    if (model) {
      for (const attr of model.attributes) {
        if (attr.vocabulary) {
          attr.vocabulary.forEach(term => vocabulary.add(term));
        }
        // Include sub-attribute vocabulary
        if (attr.subAttributes) {
          for (const subAttr of attr.subAttributes) {
            if (subAttr.vocabulary) {
              subAttr.vocabulary.forEach(term => vocabulary.add(term));
            }
          }
        }
      }
    }
  }
  
  return Array.from(vocabulary).sort();
}
