/**
 * Function-Level Local Variables for Validate Claim Data
 * 
 * Scoped to validate-claim-data function only
 */

/**
 * Validation Rules
 */
export const VALIDATION_RULES = {
  MIN_DESCRIPTION_LENGTH: 20,
  MAX_DESCRIPTION_LENGTH: 5000,
  MAX_ATTACHMENTS: 10,
  MAX_LOSS_AMOUNT: 1000000,
} as const;

/**
 * Required Fields by Policy Type
 */
export const REQUIRED_FIELDS = {
  auto: ['policyNumber', 'incidentDate', 'location', 'description', 'policeReport'],
  home: ['policyNumber', 'incidentDate', 'location', 'description', 'photos'],
  health: ['policyNumber', 'incidentDate', 'description', 'medicalRecords'],
  life: ['policyNumber', 'deceasedInfo', 'deathCertificate', 'beneficiaries'],
} as const;

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  MISSING_POLICY: 'Policy number is required',
  INVALID_POLICY: 'Policy number not found or inactive',
  MISSING_INCIDENT_DATE: 'Incident date is required',
  FUTURE_DATE: 'Incident date cannot be in the future',
  DESCRIPTION_TOO_SHORT: 'Description must be at least 20 characters',
  MISSING_ATTACHMENTS: 'Required attachments are missing',
  LOSS_TOO_HIGH: 'Claimed loss exceeds policy limits',
} as const;
