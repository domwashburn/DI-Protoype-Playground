/**
 * Function-Level Local Variables for Extract Claim Info
 * 
 * Scoped to extract-claim-info function only
 */

/**
 * Supported File Types
 */
export const SUPPORTED_FILE_TYPES = {
  PDF: 'pdf',
  JPG: 'jpg',
  JPEG: 'jpeg',
  PNG: 'png',
  TIFF: 'tiff',
} as const;

/**
 * OCR Providers
 */
export const OCR_PROVIDERS = {
  GOOGLE_VISION: 'google-vision',
  AWS_TEXTRACT: 'aws-textract',
  AZURE_VISION: 'azure-vision',
} as const;

export const DEFAULT_OCR_PROVIDER = OCR_PROVIDERS.GOOGLE_VISION;

/**
 * Extraction Confidence Thresholds
 */
export const CONFIDENCE_THRESHOLDS = {
  HIGH: 0.9,
  MEDIUM: 0.7,
  LOW: 0.5,
  MINIMUM_ACCEPTABLE: 0.6,
} as const;

/**
 * Processing Limits
 */
export const PROCESSING_LIMITS = {
  MAX_FILE_SIZE_MB: 25,
  MAX_PAGES_PER_PDF: 50,
  MAX_PROCESSING_TIME_MS: 60000,
} as const;

/**
 * Extraction Fields
 */
export const EXTRACTION_FIELDS = {
  DAMAGE_DESCRIPTION: 'damageDescription',
  ESTIMATED_COST: 'estimatedCost',
  PARTY_INFO: 'partyInformation',
  INCIDENT_DATE: 'incidentDate',
  LOCATION: 'location',
} as const;
