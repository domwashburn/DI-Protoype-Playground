/**
 * BAL vocabulary and syntax definitions
 */
export const balVocabulary = {
  keywords: [
    'if', 'then', 'else', 'else if', 'otherwise', 'set', 'to', 'where', 'is', 'a', 'new',
    'the', 'of', 'and', 'or', 'not', 'define', 'function', 'returns', 'return',
    'for', 'each', 'in', 'while', 'do', 'true', 'false', 'null'
  ],
  operators: [
    'is greater than', 'is less than', 'is equal to', 'is not equal to',
    'is greater than or equal to', 'is less than or equal to',
    'contains', 'starts with', 'ends with'
  ],
  types: [
    'a number', 'a text', 'a boolean', 'a date', 'a time', 'a duration',
    'a list', 'an object'
  ],
  functions: [
    'calculate', 'validate', 'process', 'convert', 'format', 'parse'
  ]
};

/**
 * Vocabulary mappings - maps user-friendly terms to data model paths
 */
export interface VocabularyMapping {
  term: string;
  attributePath: string;
  type: string;
  description?: string;
  variants?: string[];
}

export const vocabularyMappings: VocabularyMapping[] = [
  // Applicant attributes
  { 
    term: 'applicant', 
    attributePath: 'applicant', 
    type: 'object', 
    description: 'Loan applicant information',
    variants: ['borrower', 'customer']
  },
  { 
    term: 'credit score', 
    attributePath: 'applicant.creditScore', 
    type: 'number', 
    description: 'Credit score (300-850)',
    variants: ['FICO score', 'credit rating']
  },
  { 
    term: 'debt to income ratio', 
    attributePath: 'applicant.debtToIncomeRatio', 
    type: 'number', 
    description: 'Debt-to-income ratio (0-1)',
    variants: ['DTI', 'debt ratio']
  },
  { 
    term: 'employment status', 
    attributePath: 'applicant.employmentStatus', 
    type: 'string', 
    description: 'Employment status',
    variants: ['job status', 'work status']
  },
  { 
    term: 'requested amount', 
    attributePath: 'applicant.requestedAmount', 
    type: 'number', 
    description: 'Requested loan amount',
    variants: ['loan request', 'desired amount']
  },
  
  // Loan decision attributes
  { 
    term: 'loan decision', 
    attributePath: 'loanDecision', 
    type: 'object', 
    description: 'Loan approval decision result'
  },
  { 
    term: 'is approved', 
    attributePath: 'loanDecision.isApproved', 
    type: 'boolean', 
    description: 'Whether loan is approved',
    variants: ['approved', 'approval status']
  },
  { 
    term: 'interest rate', 
    attributePath: 'loanDecision.interestRate', 
    type: 'number', 
    description: 'Annual interest rate percentage',
    variants: ['APR', 'rate']
  },
  { 
    term: 'loan amount', 
    attributePath: 'loanDecision.loanAmount', 
    type: 'number', 
    description: 'Approved loan amount',
    variants: ['approved amount']
  },
  { 
    term: 'approval message', 
    attributePath: 'loanDecision.approvalMessage', 
    type: 'string', 
    description: 'Message to display to applicant'
  },
  
  // Employee attributes
  { 
    term: 'employee', 
    attributePath: 'employee', 
    type: 'object', 
    description: 'Employee information',
    variants: ['staff member', 'worker']
  },
  { 
    term: 'years of service', 
    attributePath: 'employee.yearsOfService', 
    type: 'number', 
    description: 'Years employed',
    variants: ['tenure', 'service years']
  },
  { 
    term: 'department', 
    attributePath: 'employee.department', 
    type: 'string', 
    description: 'Department name'
  },
  { 
    term: 'salary', 
    attributePath: 'employee.salary', 
    type: 'number', 
    description: 'Annual salary',
    variants: ['compensation', 'pay']
  },
  { 
    term: 'performance rating', 
    attributePath: 'employee.performanceRating', 
    type: 'number', 
    description: 'Performance score (1-5)',
    variants: ['rating', 'performance score']
  },
  
  // Holiday eligibility attributes
  { 
    term: 'holiday eligibility', 
    attributePath: 'holidayEligibility', 
    type: 'object', 
    description: 'Holiday eligibility details'
  },
  { 
    term: 'is eligible for fixed holidays', 
    attributePath: 'holidayEligibility.isEligibleForFixedHolidays', 
    type: 'boolean', 
    description: 'Eligible for fixed holidays'
  },
  { 
    term: 'is eligible for personal choice holidays', 
    attributePath: 'holidayEligibility.isEligibleForPersonalChoiceHolidays', 
    type: 'boolean', 
    description: 'Eligible for personal choice holidays'
  },
  { 
    term: 'number of personal choice holidays', 
    attributePath: 'holidayEligibility.numberOfPersonalChoiceHolidays', 
    type: 'number', 
    description: 'Number of personal choice holidays'
  },
  
  // Pricing attributes
  { 
    term: 'customer tier', 
    attributePath: 'customer.tier', 
    type: 'string', 
    description: 'Customer tier',
    variants: ['tier', 'membership level']
  },
  { 
    term: 'base price', 
    attributePath: 'pricing.basePrice', 
    type: 'number', 
    description: 'Base price before discounts',
    variants: ['list price', 'original price']
  },
  { 
    term: 'discount rate', 
    attributePath: 'pricing.discountRate', 
    type: 'number', 
    description: 'Discount rate (0-1)'
  },
  { 
    term: 'volume discount', 
    attributePath: 'pricing.volumeDiscount', 
    type: 'number', 
    description: 'Volume-based discount (0-1)'
  },
  { 
    term: 'total discount', 
    attributePath: 'pricing.totalDiscount', 
    type: 'number', 
    description: 'Combined discount rate'
  },
  { 
    term: 'final price', 
    attributePath: 'pricing.finalPrice', 
    type: 'number', 
    description: 'Final calculated price',
    variants: ['net price', 'total price']
  },
];

export const balSnippets = [
  {
    label: 'if-then-else',
    insertText: 'if ${1:condition}\\nthen\\n  ${2:action}\\nelse\\n  ${3:alternative}',
    detail: 'If-then-else statement'
  },
  {
    label: 'set-variable',
    insertText: "set '${1:variable name}' to ${2:value};",
    detail: 'Set variable'
  },
  {
    label: 'define-function',
    insertText: 'define function ${1:name}(${2:parameters}) returns ${3:type}:\\n  ${4:body}',
    detail: 'Define function'
  }
];

/**
 * BAL Sample documents
 */
export interface BALSample {
  id: string;
  title: string;
  description: string;
  content: string;
}

export const balSamples: BALSample[] = [
  {
    id: 'loan-approval',
    title: 'Loan Approval Decision',
    description: 'Business rules for determining loan approval',
    content: `// Loan Approval Decision
// Determines loan approval based on applicant creditworthiness

define decision 'Loan Approval'

definitions:
  set 'minimum credit score' to 650;
  set 'maximum debt ratio' to 0.43;
  set 'base interest rate' to 0.045;
  set 'premium interest rate' to 0.035;
  set 'standard interest rate' to 0.055;
  set 'high risk interest rate' to 0.075;
  set 'excellent credit threshold' to 750;

// Check credit score requirement
if the credit score of the applicant is greater than or equal to the minimum credit score
and the debt to income ratio of the applicant is less than or equal to the maximum debt ratio
and the employment status of the applicant is equal to "employed"
then
  set 'is approved' of the loan decision to true;
  
  // Determine interest rate based on credit score
  if the credit score of the applicant is greater than or equal to the excellent credit threshold
  then
    set 'interest rate' of the loan decision to the premium interest rate;
  else if the credit score of the applicant is greater than or equal to 700
  then
    set 'interest rate' of the loan decision to the base interest rate;
  else if the credit score of the applicant is greater than or equal to 650
  then
    set 'interest rate' of the loan decision to the standard interest rate;
  otherwise
    set 'interest rate' of the loan decision to the high risk interest rate;
  
  // Set approved amount (can be less than requested if DTI is high)
  if the debt to income ratio of the applicant is greater than 0.35
  then
    set 'loan amount' of the loan decision to the requested amount of the applicant * 0.8;
    set 'approval message' of the loan decision to "Approved for 80% of requested amount due to debt-to-income ratio";
  otherwise
    set 'loan amount' of the loan decision to the requested amount of the applicant;
    set 'approval message' of the loan decision to "Approved for full requested amount";
otherwise
  set 'is approved' of the loan decision to false;
  set 'interest rate' of the loan decision to 0;
  set 'loan amount' of the loan decision to 0;
  
  // Provide specific rejection reason
  if the credit score of the applicant is less than the minimum credit score
  then
    set 'approval message' of the loan decision to "Denied: Credit score below minimum requirement";
  else if the debt to income ratio of the applicant is greater than the maximum debt ratio
  then
    set 'approval message' of the loan decision to "Denied: Debt-to-income ratio too high";
  else if the employment status of the applicant is not equal to "employed"
  then
    set 'approval message' of the loan decision to "Denied: Employment verification required";
  otherwise
    set 'approval message' of the loan decision to "Denied: Does not meet approval criteria";`
  },
  {
    id: 'holiday-eligibility',
    title: 'Employee Holiday Eligibility',
    description: 'Rules for determining employee holiday entitlement',
    content: `// Employee Holiday Eligibility
// Determines employee eligibility for various holiday types

define decision 'Holiday Eligibility'

definitions:
  set 'minimum service for fixed holidays' to 0.5; // 6 months
  set 'minimum service for personal choice' to 1; // 1 year
  set 'personal holidays per year' to 3;
  set 'additional holidays after 5 years' to 2;

// Fixed Holidays
if the years of service of the employee is greater than or equal to the minimum service for fixed holidays
then
  set 'is eligible for fixed holidays' of the holiday eligibility to true;
otherwise
  set 'is eligible for fixed holidays' of the holiday eligibility to false;

// Personal Choice Holidays
if the years of service of the employee is greater than or equal to the minimum service for personal choice
then
  set 'is eligible for personal choice holidays' of the holiday eligibility to true;
  
  if the years of service of the employee is greater than or equal to 5
  then
    set 'number of personal choice holidays' of the holiday eligibility to 
      the personal holidays per year + the additional holidays after 5 years;
  otherwise
    set 'number of personal choice holidays' of the holiday eligibility to 
      the personal holidays per year;
otherwise
  set 'is eligible for personal choice holidays' of the holiday eligibility to false;
  set 'number of personal choice holidays' of the holiday eligibility to 0;`
  },
  {
    id: 'pricing-discount',
    title: 'Pricing with Tiered Discounts',
    description: 'Calculate final price based on customer tier and volume',
    content: `// Pricing Decision with Tiered Discounts
// Calculates final price based on customer tier and purchase volume

define decision 'Calculate Price'

definitions:
  set 'platinum discount' to 0.15;
  set 'gold discount' to 0.10;
  set 'silver discount' to 0.05;
  set 'bronze discount' to 0.02;
  set 'volume threshold' to 100;
  set 'volume discount rate' to 0.05;

// Determine tier-based discount
if the customer tier is equal to "platinum"
then
  set 'discount rate' of the pricing to the platinum discount;
else if the customer tier is equal to "gold"
then
  set 'discount rate' of the pricing to the gold discount;
else if the customer tier is equal to "silver"
then
  set 'discount rate' of the pricing to the silver discount;
otherwise
  set 'discount rate' of the pricing to the bronze discount;

// Apply volume discount if applicable
if the base price of the pricing is greater than the volume threshold
then
  set 'volume discount' of the pricing to the volume discount rate;
otherwise
  set 'volume discount' of the pricing to 0;

// Calculate total discount and final price
set 'total discount' of the pricing to 
  the discount rate of the pricing + the volume discount of the pricing;

set 'final price' of the pricing to 
  the base price of the pricing * (1 - the total discount of the pricing);`
  }
];