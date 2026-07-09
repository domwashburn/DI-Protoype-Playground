/**
 * Automation Entities
 * 
 * Represents decision automations (BAL or Formula based).
 * Each automation can have its own data model configuration.
 */

/**
 * Data Model Configuration for an Automation
 */
export interface AutomationDataModelConfig {
  /** Mode: use global model, extend it, or create fully custom */
  mode: 'global' | 'extended' | 'custom';
  
  /** Base model ID (if mode is 'global' or 'extended') */
  baseModelId?: string;
  
  /** Extension ID (if mode is 'extended') */
  extensionId?: string;
  
  /** Custom model ID (if mode is 'custom') */
  customModelId?: string;
}

/**
 * Automation Entity
 */
export interface Automation {
  id: string;
  name: string;
  description: string;
  
  /** Type of automation */
  type: 'bal' | 'formula';
  
  /** Data model configuration */
  dataModelConfig: AutomationDataModelConfig;
  
  /** Automation content (BAL code or formula) */
  content: string;
  
  /** Metadata */
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  tags?: string[];
}

/**
 * Sample Automations
 */

export const LOAN_APPROVAL_AUTOMATION: Automation = {
  id: 'auto-loan-approval',
  name: 'Standard Loan Approval',
  description: 'Automated loan approval decision based on credit score, income, and loan amount',
  type: 'bal',
  
  dataModelConfig: {
    mode: 'extended',
    baseModelId: 'loan-financial',
    extensionId: 'ext-loan-approval-001'
  },
  
  content: `definitions:
  set 'minimum credit score' to 650;
  set 'maximum debt to income' to 43;
  set 'high risk threshold' to 700;

dictionary:
  'the applicant' is the applicant;
  'credit score' is the credit score of the applicant;
  'annual income' is the income of the applicant;
  
rules:
  // Risk score calculation
  if the credit score is greater than or equal to 750
    then set the risk score to 25;
  else if the credit score is greater than or equal to 700
    then set the risk score to 50;
  else if the credit score is greater than or equal to 650
    then set the risk score to 75;
  else
    set the risk score to 100;
    
  // Approval decision
  if the credit score is less than the minimum credit score
    then set the decision to "REJECTED";
  else if the approval override is true
    then set the decision to "APPROVED";
  else if the risk score is less than or equal to 50
    then set the decision to "APPROVED";
  else
    set the decision to "MANUAL_REVIEW";`,
  
  createdAt: new Date('2025-11-14T10:00:00Z'),
  updatedAt: new Date('2025-11-14T10:00:00Z'),
  tags: ['loan', 'approval', 'credit']
};

export const MORTGAGE_APPROVAL_AUTOMATION: Automation = {
  id: 'auto-mortgage-approval',
  name: 'Mortgage Approval',
  description: 'Mortgage-specific approval logic with property value and LTV considerations',
  type: 'bal',
  
  dataModelConfig: {
    mode: 'extended',
    baseModelId: 'loan-financial',
    extensionId: 'ext-mortgage-approval-001'
  },
  
  content: `definitions:
  set 'minimum credit score' to 620;
  set 'maximum LTV' to 95;
  set 'maximum DTI' to 43;

dictionary:
  'the applicant' is the applicant;
  'credit score' is the credit score of the applicant;
  
rules:
  // Calculate LTV
  set the loan to value to (the loan amount / the property value) * 100;
  
  // Approval decision
  if the credit score is less than the minimum credit score
    then set the decision to "REJECTED";
  else if the loan to value is greater than the maximum LTV
    then set the decision to "REJECTED";
  else if the debt to income ratio is greater than the maximum DTI
    then set the decision to "REJECTED";
  else
    set the decision to "APPROVED";`,
  
  createdAt: new Date('2025-11-14T10:30:00Z'),
  updatedAt: new Date('2025-11-14T10:30:00Z'),
  tags: ['mortgage', 'loan', 'property']
};

export const HOLIDAY_ELIGIBILITY_AUTOMATION: Automation = {
  id: 'auto-holiday-eligibility',
  name: 'Holiday Eligibility',
  description: 'Calculate employee holiday eligibility based on years of service',
  type: 'bal',
  
  dataModelConfig: {
    mode: 'extended',
    baseModelId: 'hr-employee',
    extensionId: 'ext-holiday-eligibility-001'
  },
  
  content: `definitions:
  set 'minimum service for fixed holidays' to 0.5;
  set 'minimum service for personal choice' to 1;
  set 'personal holidays per year' to 3;
  set 'additional holidays after 5 years' to 2;

dictionary:
  'the employee' is the employee;
  'years of service' is the years of service of the employee;

rules:
  // Fixed holidays eligibility
  if the years of service is greater than or equal to the minimum service for fixed holidays
    then set 'is eligible for fixed' of the eligibility to true;
  else
    set 'is eligible for fixed' of the eligibility to false;
    
  // Personal holidays eligibility
  if the years of service is greater than or equal to the minimum service for personal choice
    then set 'is eligible for personal' of the eligibility to true;
  else
    set 'is eligible for personal' of the eligibility to false;
    
  // Calculate total eligible days
  set 'total eligible days' of the eligibility to 0;
  
  if 'is eligible for personal' of the eligibility is true
    then set 'total eligible days' of the eligibility to the personal holidays per year;
    
  if the years of service is greater than or equal to 5
    then set 'total eligible days' of the eligibility to 
      'total eligible days' of the eligibility + the additional holidays after 5 years;`,
  
  createdAt: new Date('2025-11-14T11:00:00Z'),
  updatedAt: new Date('2025-11-14T11:00:00Z'),
  tags: ['hr', 'employee', 'holidays', 'leave']
};

export const EMPLOYEE_BONUS_AUTOMATION: Automation = {
  id: 'auto-employee-bonus',
  name: 'Employee Bonus Calculator',
  description: 'Calculate annual bonus based on performance rating and salary',
  type: 'formula',
  
  dataModelConfig: {
    mode: 'extended',
    baseModelId: 'hr-employee',
    extensionId: 'ext-employee-bonus-001'
  },
  
  content: `// Bonus multiplier based on performance rating
$bonusMultiplier = IF(
  'performance rating' = "Exceptional", 0.15,
  'performance rating' = "Exceeds", 0.10,
  'performance rating' = "Meets", 0.05,
  0
)

// Calculate bonus amount
$calculatedBonus = 'base salary' * $bonusMultiplier

// Adjust for tenure
$tenureBonus = IF('years with company' >= 10, 2000, 0)

// Final bonus
$finalBonus = $calculatedBonus + $tenureBonus`,
  
  createdAt: new Date('2025-11-14T11:30:00Z'),
  updatedAt: new Date('2025-11-14T11:30:00Z'),
  tags: ['hr', 'employee', 'bonus', 'compensation']
};

export const DISCOUNT_CALCULATOR_AUTOMATION: Automation = {
  id: 'auto-discount-calculator',
  name: 'Customer Discount Calculator',
  description: 'Calculate customer discount based on tier and purchase history',
  type: 'formula',
  
  dataModelConfig: {
    mode: 'extended',
    baseModelId: 'customer-sales',
    extensionId: 'ext-discount-calculator-001'
  },
  
  content: `// Determine discount tier based on lifetime value
$discountTier = IF(
  'lifetime value' >= 50000, "Platinum",
  'lifetime value' >= 25000, "Gold",
  'lifetime value' >= 10000, "Silver",
  "Bronze"
)

// Base discount by tier
$tierDiscount = IF(
  $discountTier = "Platinum", 15,
  $discountTier = "Gold", 10,
  $discountTier = "Silver", 5,
  2
)

// Seasonal discount
$seasonalBonus = IF('seasonal discount' = TRUE, 5, 0)

// Final discount percentage
$finalDiscountPercent = MIN($tierDiscount + $seasonalBonus, 20)`,
  
  createdAt: new Date('2025-11-14T12:00:00Z'),
  updatedAt: new Date('2025-11-14T12:00:00Z'),
  tags: ['sales', 'customer', 'discount']
};

export const SIMPLE_FORMULA_AUTOMATION: Automation = {
  id: 'auto-simple-formula',
  name: 'Simple Formula (No Data Model)',
  description: 'Basic formula with only variables, no data model',
  type: 'formula',
  
  dataModelConfig: {
    mode: 'global',
    baseModelId: 'global'
  },
  
  content: `// Simple calculation with variables only
$price = 100
$quantity = 5
$taxRate = 0.08

$subtotal = $price * $quantity
$tax = $subtotal * $taxRate
$total = $subtotal + $tax`,
  
  createdAt: new Date('2025-11-14T12:30:00Z'),
  updatedAt: new Date('2025-11-14T12:30:00Z'),
  tags: ['simple', 'calculation']
};

/**
 * All sample automations
 */
export const ALL_AUTOMATIONS: Automation[] = [
  LOAN_APPROVAL_AUTOMATION,
  MORTGAGE_APPROVAL_AUTOMATION,
  HOLIDAY_ELIGIBILITY_AUTOMATION,
  EMPLOYEE_BONUS_AUTOMATION,
  DISCOUNT_CALCULATOR_AUTOMATION,
  SIMPLE_FORMULA_AUTOMATION
];

/**
 * Get automation by ID
 */
export function getAutomationById(id: string): Automation | undefined {
  return ALL_AUTOMATIONS.find(auto => auto.id === id);
}

/**
 * Get automations by type
 */
export function getAutomationsByType(type: 'bal' | 'formula'): Automation[] {
  return ALL_AUTOMATIONS.filter(auto => auto.type === type);
}

/**
 * Get automations using a specific base model
 */
export function getAutomationsByBaseModel(baseModelId: string): Automation[] {
  return ALL_AUTOMATIONS.filter(
    auto => auto.dataModelConfig.baseModelId === baseModelId
  );
}
