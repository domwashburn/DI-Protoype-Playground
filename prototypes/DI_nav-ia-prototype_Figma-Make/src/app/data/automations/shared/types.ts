/**
 * Shared Type Definitions for Decision Automations Data Layer
 * 
 * Extended to support:
 * - Hash IDs for easy referencing and URLs
 * - Data models integrated into services
 * - Functions with schemas
 * - Consistent entity structure
 */

// ============================================================================
// BASE TYPES
// ============================================================================

/**
 * Base entity interface
 * All entities extend this to ensure consistent structure
 */
export interface BaseEntity {
  id: string;              // Human-readable ID (primary)
  hashId: string;          // Short hash for URLs/sharing (5 characters)
  name: string;
  displayName?: string;
  description?: string;
  createdDate: string;
  lastUpdatedDate: string;
  createdBy?: string;
  lastUpdatedBy?: string;
  version: string;
}

/**
 * Tag for categorization
 */
export interface Tag {
  id: string;
  label: string;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'red' | 'cyan' | 'gray' | 'orange';
}

// ============================================================================
// DECISION AUTOMATION
// ============================================================================

export interface DecisionAutomation extends BaseEntity {
  status: 'draft' | 'deployed' | 'archived';
  variant: 'standard' | 'ai-generated';
  
  // Relationships (human-readable IDs)
  serviceIds: string[];              // e.g., ['credit-risk-assessment', 'fraud-detection']
  linkedObjectiveIds?: string[];     // e.g., ['obj-improve-credit-decisions']
  
  // Metadata
  tags: Tag[];
  industry?: string;
  branch?: string;
  
  // Analytics
  executionCount?: number;
  lastExecuted?: string;
  
  // AI Generation
  generatedFromConversationId?: string;
}

// ============================================================================
// DECISION SERVICE
// ============================================================================

export interface DecisionService extends BaseEntity {
  status: 'draft' | 'deployed' | 'archived';
  type: 'decision-service' | 'ml-service' | 'rule-service';
  
  // Parent relationship (human-readable ID)
  automationId: string;              // e.g., 'automation-6-24-20'
  
  // Child relationships (human-readable IDs)
  assetIds: string[];                // e.g., ['credit-decision-model', 'credit-risk-rules']
  functionIds?: string[];            // e.g., ['credit-score-checker', 'validate-income']
  dataModelIds?: string[];           // e.g., ['customer-data-model', 'risk-score-data-model']
  
  // Metadata
  tags: Tag[];
  branch?: string;
  
  // API Configuration
  endpoint?: string;
  authentication?: 'oauth' | 'api-key' | 'none';
  
  // Analytics
  requestCount?: number;
  avgResponseTime?: number;         // milliseconds
  successRate?: number;             // percentage
}

// ============================================================================
// DATA MODELS
// ============================================================================

export interface DataModel extends BaseEntity {
  serviceId: string;                 // Human-readable service ID
  
  schema: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
  
  tags?: Tag[];
}

// ============================================================================
// SERVICE FUNCTIONS
// ============================================================================

export interface ServiceFunction extends BaseEntity {
  serviceId: string;                 // Human-readable service ID
  
  // Function signature (uses data model IDs)
  inputDataModelId?: string;         // Human-readable data model ID
  outputDataModelId?: string;        // Human-readable data model ID
  
  // Implementation
  language?: 'javascript' | 'python' | 'java';
  runtime?: string;
  
  tags?: Tag[];
}

/**
 * Function schema (input/output)
 */
export interface FunctionSchema {
  inputSchema: Record<string, any>;
  outputSchema: Record<string, any>;
  examples?: {
    input: any;
    output: any;
  };
}

// ============================================================================
// ASSETS - BASE
// ============================================================================

export interface BaseAsset {
  id: string;
  hashId: string;
  name: string;
  displayName?: string;
  description?: string;
  type: AssetType;
  status: 'draft' | 'deployed' | 'archived';
  
  // Relationships
  serviceId: string;                 // Parent service (human-readable ID)
  parentAssetId?: string;            // For nested assets
  dependencies?: string[];           // Other asset IDs
  
  // Data model relationships
  inputDataModelIds?: string[];      // Input data models
  outputDataModelIds?: string[];     // Output data models
  
  // Metadata
  tags: Tag[];
  icon?: string;
  createdDate: string;
  lastUpdatedDate: string;
  lastUpdatedBy: string;
  createdBy: string;
  version: string;
  branch?: string;
}

export type AssetType = 
  | 'task-model'
  | 'decision-model'
  | 'rule-model'
  | 'ruleset'
  | 'ml-model'
  | 'ruleflow'
  | 'function'
  | 'artifact'
  | 'policy'
  | 'dashboard'
  | 'data-model';

// ============================================================================
// ASSETS - SPECIFIC TYPES
// ============================================================================

/**
 * Task Model Asset
 */
export interface TaskModelAsset extends BaseAsset {
  type: 'task-model';
  
  // Sub-assets
  artifactIds?: string[];
  functionIds?: string[];
  ruleflowIds?: string[];
  
  // Task model specific
  errorCount?: number;
  executionCount?: number;
}

/**
 * Decision Model Asset
 */
export interface DecisionModelAsset extends BaseAsset {
  type: 'decision-model';
  
  // Decision logic
  decisionLogic?: string;
  
  // Dependencies
  dependencies?: string[];
}

/**
 * Rule Model Asset
 */
export interface RuleModelAsset extends BaseAsset {
  type: 'rule-model';
  
  ruleCount?: number;
  
  // Rule definitions (optional, can be in separate file)
  rules?: Rule[];
}

/**
 * Ruleset Asset
 */
export interface RulesetAsset extends BaseAsset {
  type: 'ruleset';
  
  ruleCount?: number;
  complexity?: 'simple' | 'moderate' | 'complex';
}

/**
 * ML Model Asset
 */
export interface MLModelAsset extends BaseAsset {
  type: 'ml-model' | 'predictive-model' | 'optimization-model';
  
  // ML specific
  modelType?: string;
  accuracy?: number;
  framework?: string;
  trainingDate?: string;
}

/**
 * Ruleflow Asset (sub-asset of task model)
 */
export interface RuleflowAsset extends BaseAsset {
  type: 'ruleflow';
  parentAssetId: string;             // Task model ID
  
  stepCount?: number;
}


/**
 * GenAI Node Asset
 */
export interface GenAINodeAsset extends BaseAsset {
  type: 'genai-node';

  promptTemplate?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Function Asset (sub-asset)
 */
export interface FunctionAsset extends BaseAsset {
  type: 'function';
  parentAssetId?: string;
  
  language?: string;
  runtime?: string;
}

/**
 * Artifact Asset (sub-asset)
 */
export interface ArtifactAsset extends BaseAsset {
  type: 'artifact';
  parentAssetId?: string;
  
  artifactType?: string;
  size?: number;
}

/**
 * Policy Asset
 */
export interface PolicyAsset extends BaseAsset {
  type: 'policy';
  
  policyType?: string;
  enforcement?: 'strict' | 'lenient';
}

/**
 * Dashboard Asset
 */
export interface DashboardAsset extends BaseAsset {
  type: 'dashboard';
  
  widgetCount?: number;
  refreshRate?: number;
}

/**
 * Data Model Asset
 */
export interface DataModelAsset extends BaseAsset {
  type: 'data-model';
  
  fields?: number;
  relationships?: number;
}

/**
 * Union type for all assets
 */
export type Asset =
  | TaskModelAsset
  | DecisionModelAsset
  | RuleModelAsset
  | RulesetAsset
  | MLModelAsset
  | GenAINodeAsset
  | RuleflowAsset
  | FunctionAsset
  | ArtifactAsset
  | PolicyAsset
  | DashboardAsset
  | DataModelAsset;

// ============================================================================
// RULE DEFINITIONS
// ============================================================================

export interface Rule {
  id: string;
  name: string;
  description: string;
  condition: string;
  action: string;
  priority: number;
}

// ============================================================================
// VERSIONING & HISTORY
// ============================================================================

export interface Version {
  id: string;
  entityId: string;
  entityType: 'automation' | 'service' | 'asset';
  branchId: string;
  
  version: string;
  semanticVersion?: { major: number; minor: number; patch: number };
  
  timestamp: string;
  author: string;
  authorEmail?: string;
  message: string;
  
  parentVersionIds?: string[];
  snapshot?: any;
  changes?: Change[];
  
  deployedTo?: Deployment[];
  
  filesChanged?: number;
  insertions?: number;
  deletions?: number;
  
  tags?: string[];
}

export interface Change {
  id: string;
  field: string;
  changeType: 'added' | 'modified' | 'removed';
  oldValue?: any;
  newValue?: any;
  timestamp: string;
  author: string;
}

export interface Deployment {
  environment: string;
  deployedAt: string;
  deployedBy: string;
  deploymentId: string;
}

// ============================================================================
// BRANCHES
// ============================================================================

export interface Branch {
  id: string;
  name: string;
  description?: string;
  type: 'main' | 'develop' | 'feature' | 'hotfix' | 'release';
  
  createdDate: string;
  createdBy: string;
  lastUpdatedDate: string;
  
  parentBranchId?: string;
  isProtected?: boolean;
  
  status: 'active' | 'merged' | 'archived';
}

// ============================================================================
// ENVIRONMENTS
// ============================================================================

export interface Environment {
  id: string;
  name: string;
  type: 'development' | 'staging' | 'production';
  
  deployedVersionId?: string;
  deployedAt?: string;
  deployedBy?: string;
  
  status: 'active' | 'inactive';
  url?: string;
}

// ============================================================================
// ACTIVITY
// ============================================================================

export interface Activity {
  id: string;
  entityId: string;
  entityType: 'automation' | 'service' | 'asset';
  
  activityType: 'created' | 'updated' | 'deployed' | 'tested' | 'approved';
  
  timestamp: string;
  author: string;
  authorEmail?: string;
  
  description: string;
  metadata?: Record<string, any>;
}
