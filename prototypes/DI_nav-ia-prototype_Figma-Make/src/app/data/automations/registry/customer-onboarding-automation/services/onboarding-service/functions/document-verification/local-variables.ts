/**
 * Function-Level Local Variables for Document Verification
 * 
 * Scoped to document-verification function only
 */

/**
 * OCR Providers
 */
export const OCR_PROVIDERS = {
  AWS_TEXTRACT: 'aws-textract',
  GOOGLE_VISION: 'google-vision',
  AZURE_VISION: 'azure-vision',
} as const;

export const DEFAULT_OCR_PROVIDER = OCR_PROVIDERS.AWS_TEXTRACT;

/**
 * Verification Confidence Thresholds
 */
export const CONFIDENCE_THRESHOLDS = {
  HIGH: 0.9,
  MEDIUM: 0.7,
  LOW: 0.5,
  MINIMUM_ACCEPTABLE: 0.7,
} as const;

/**
 * Document Expiration Checks
 */
export const EXPIRATION_CONFIG = {
  CHECK_EXPIRATION: true,
  ALLOW_EXPIRED_GRACE_DAYS: 30,
} as const;

/**
 * Verification Issue Codes
 */
export const ISSUE_CODES = {
  POOR_IMAGE_QUALITY: 'POOR_IMAGE_QUALITY',
  EXPIRED_DOCUMENT: 'EXPIRED_DOCUMENT',
  MISMATCHED_DATA: 'MISMATCHED_DATA',
  SUSPICIOUS_ALTERATIONS: 'SUSPICIOUS_ALTERATIONS',
  UNREADABLE_TEXT: 'UNREADABLE_TEXT',
} as const;

/**
 * Verification Issue Messages
 */
export const ISSUE_MESSAGES = {
  [ISSUE_CODES.POOR_IMAGE_QUALITY]: 'Image quality is too low for verification',
  [ISSUE_CODES.EXPIRED_DOCUMENT]: 'Document has expired',
  [ISSUE_CODES.MISMATCHED_DATA]: 'Extracted data does not match applicant information',
  [ISSUE_CODES.SUSPICIOUS_ALTERATIONS]: 'Document shows signs of alteration',
  [ISSUE_CODES.UNREADABLE_TEXT]: 'Text could not be extracted from document',
} as const;

/**
 * Required Fields by Document Type
 */
export const REQUIRED_FIELDS = {
  'drivers-license': ['name', 'documentNumber', 'expirationDate', 'address'],
  'passport': ['name', 'documentNumber', 'expirationDate'],
  'utility-bill': ['name', 'address'],
  'bank-statement': ['name', 'address'],
} as const;

/**
 * Processing Configuration
 */
export const PROCESSING_CONFIG = {
  MAX_IMAGE_SIZE_MB: 10,
  SUPPORTED_FORMATS: ['jpg', 'jpeg', 'png', 'pdf'],
  MAX_RETRY_ATTEMPTS: 3,
} as const;
