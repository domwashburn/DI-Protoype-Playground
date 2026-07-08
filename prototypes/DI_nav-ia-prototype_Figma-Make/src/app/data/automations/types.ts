/**
 * Type Definitions for Decision Automations Data Layer
 * 
 * This module provides comprehensive TypeScript types for the Decision Intelligence
 * platform's core data structures including automations, services, and assets.
 * 
 * Design Principles:
 * - Type-safe: Full TypeScript coverage
 * - Extensible: Easy to add new asset types
 * - Normalized: Relationships via IDs, not nested objects
 * - Consistent: Shared base types for common properties
 */

// ============================================================================
// BASE TYPES - Common properties and enums
// ============================================================================

/**
 * Common status types across the platform
 */
export type Status = 
  | 'draft' 
  | 'deployed' 
  | 'archived' 
  | 'pending'
  | 'published'
  | 'latest';

/**
 * Asset type enumeration
 * Extensible to support new asset types
 */
export type AssetType = 
  | 'decision-model'
  | 'ml-model'
  | 'predictive-model'
  | 'optimization-model'
  | 'task-model'
  | 'policy'
  | 'dashboard'
  | 'prompt'
  | 'data-model'
  | 'ruleset'
  | 'ruleflow'
  | 'decision-table'
  | 'genai-node'
  | 'function';

/**
 * Base metadata shared by all entities
 */
export interface BaseMetadata {
  id: string;
  createdDate: string;
  lastUpdatedDate: string;
  lastUpdatedBy: string;
  createdBy?: string;
  version?: string;
  branch?: string;
  
  // Version control (extended)
  currentBranchId?: string;
  currentVersion?: string;
  versionIds?: string[];
  
  // AI creation tracking
  creationMethod?: 'manual' | 'ai-generated' | 'ai-assisted' | 'imported' | 'cloned' | 'template';
  aiGenerated?: boolean;  // Deprecated: use creationMethod
}

/**
 * Tag/label structure
 */
export interface Tag {
  id: string;
  label: string;
  color?: string;
}

// ============================================================================
// DECISION AUTOMATION TYPES
// ============================================================================

/**
 * Decision Automation
 * Top-level entity that contains multiple services
 */
export interface DecisionAutomation extends BaseMetadata {
  name: string;
  displayName?: string;
  description: string;
  status: Status;
  
  // Relationships
  serviceIds: string[];  // References to services
  
  // Strategic Alignment (Bidirectional linking with objectives)
  linkedObjectiveIds?: string[];  // Business objectives this automation supports
  
  // AI Generation Tracking
  generatedFromConversationId?: string;  // Chat conversation that generated this automation (if AI-generated)
  
  // Metadata
  tags: Tag[];
  variant: 'standard' | 'ai-generated';
  industry?: string;
  
  // Analytics
  executionCount?: number;
  lastExecuted?: string;
  
  // Configuration
  settings?: Record<string, unknown>;
}

// ============================================================================
// SERVICE TYPES
// ============================================================================

/**
 * Decision Service
 * Container for related assets (models, rules, etc.)
 * Multiple services can belong to one automation
 */
export interface DecisionService extends BaseMetadata {
  name: string;
  displayName?: string;
  description: string;
  status: Status;
  
  // Relationships
  automationId: string;  // Parent automation
  assetIds: string[];    // Child assets
  
  // Metadata
  tags: Tag[];
  type: 'decision-service' | 'ml-service' | 'rule-service' | 'composite-service';
  
  // Configuration
  endpoint?: string;
  authentication?: 'oauth' | 'api-key' | 'none';
  
  // Analytics
  requestCount?: number;
  avgResponseTime?: number;
  successRate?: number;
}

// ============================================================================
// ASSET TYPES
// ============================================================================

/**
 * Base Asset Interface
 * All specific asset types extend this
 */
export interface BaseAsset extends BaseMetadata {
  name: string;
  displayName?: string;
  description: string;
  type: AssetType;
  status: Status;
  
  // Relationships
  serviceId: string;     // Parent service
  parentAssetId?: string; // For nested assets (e.g., ruleflow inside task model)
  dependencies?: string[]; // Other assets this depends on
  
  // Metadata
  tags: Tag[];
  icon?: string;
  
  // Content
  location?: string;      // Path or URL to asset content
  size?: number;          // File size if applicable
}

/**
 * Decision Model Asset
 * Business decision logic with rules and ML integration
 */
export interface DecisionModelAsset extends BaseAsset {
  type: 'decision-model';
  
  // Model-specific properties
  inputSchema?: Record<string, unknown>;
  outputSchema?: Record<string, unknown>;
  decisionTables?: string[];  // IDs of decision tables
  rules?: string[];           // IDs of rules
  mlModelIds?: string[];      // Integrated ML models
  
  // Performance metrics
  accuracy?: number;
  executionTime?: number;
}

/**
 * Ruleset Asset
 * BRMS business rules and rulesets
 * Note: Ruleflows only exist as sub-assets within task models
 */
export interface RulesetAsset extends BaseAsset {
  type: 'ruleset';
  
  // Rule-specific properties
  ruleCount?: number;
  decisionTableIds?: string[]; // IDs of decision tables
  
  // Validation
  validated?: boolean;
  validationErrors?: string[];
}

/**
 * ML Model Asset
 * Machine learning models (predictive, optimization, etc.)
 */
export interface MLModelAsset extends BaseAsset {
  type: 'ml-model' | 'predictive-model' | 'optimization-model';
  
  // ML-specific properties
  modelType: 'classification' | 'regression' | 'clustering' | 'optimization' | 'custom';
  framework?: 'tensorflow' | 'pytorch' | 'scikit-learn' | 'xgboost' | 'custom';
  
  // Model metrics
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1Score?: number;
  
  // Training info
  trainingDate?: string;
  datasetId?: string;
  
  // Deployment
  endpoint?: string;
  version?: string;
}

/**
 * Task Model Asset
 * Workflow/process automation with tasks and sub-assets
 */
export interface TaskModelAsset extends BaseAsset {
  type: 'task-model';
  
  // Task model structure
  tasks?: TaskDefinition[];
  workflow?: WorkflowDefinition;
  
  // Sub-assets (artifacts, functions, etc.)
  artifactIds?: string[];     // IDs of artifact assets
  functionIds?: string[];     // IDs of function assets
  ruleflowIds?: string[];     // IDs of ruleflow assets
  
  // Execution
  errorCount?: number;
  executionCount?: number;
}

/**
 * Task Definition within a Task Model
 */
export interface TaskDefinition {
  id: string;
  name: string;
  type: 'human' | 'automated' | 'decision' | 'service-call';
  assignee?: string;
  duration?: number;
  dependencies?: string[];  // IDs of other tasks
}

/**
 * Workflow Definition
 */
export interface WorkflowDefinition {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  startNodeId: string;
}

export interface WorkflowNode {
  id: string;
  type: 'start' | 'end' | 'task' | 'decision' | 'gateway';
  taskId?: string;
  position?: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  condition?: string;
}

/**
 * Ruleflow Asset
 * Visual rule orchestration, often part of task models
 */
export interface RuleflowAsset extends BaseAsset {
  type: 'ruleflow';
  
  // Ruleflow structure
  ruleIds?: string[];
  flowDefinition?: WorkflowDefinition;
}

/**
 * Decision Table Asset
 * Tabular decision logic
 */
export interface DecisionTableAsset extends BaseAsset {
  type: 'decision-table';
  
  // Table structure
  inputColumns?: string[];
  outputColumns?: string[];
  rowCount?: number;
}

/**
 * GenAI Node Asset
 * AI-powered decision node
 */
export interface GenAINodeAsset extends BaseAsset {
  type: 'genai-node';
  
  // GenAI-specific
  promptTemplate?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Function Asset
 * Reusable business logic functions
 */
export interface FunctionAsset extends BaseAsset {
  type: 'function';
  
  // Function properties
  language?: 'javascript' | 'python' | 'java' | 'custom';
  signature?: string;
  parameters?: FunctionParameter[];
  returnType?: string;
}

export interface FunctionParameter {
  name: string;
  type: string;
  required: boolean;
  description?: string;
}

/**
 * Policy Asset
 * Business policies and compliance documents
 */
export interface PolicyAsset extends BaseAsset {
  type: 'policy';
  
  // Policy properties
  policyType?: 'compliance' | 'business' | 'security' | 'operational';
  effectiveDate?: string;
  expiryDate?: string;
  approvedBy?: string;
}

/**
 * Dashboard Asset
 * Analytics and monitoring dashboards
 */
export interface DashboardAsset extends BaseAsset {
  type: 'dashboard';
  
  // Dashboard properties
  widgets?: DashboardWidget[];
  refreshInterval?: number;
}

export interface DashboardWidget {
  id: string;
  type: 'chart' | 'table' | 'metric' | 'gauge';
  title: string;
  dataSource?: string;
  position?: { x: number; y: number; w: number; h: number };
}

/**
 * Data Model Asset
 * Data structure definitions
 */
export interface DataModelAsset extends BaseAsset {
  type: 'data-model';
  
  // Data model properties
  schema?: Record<string, unknown>;
  entities?: string[];
  relationships?: string[];
}

/**
 * Union type of all possible assets
 * Used for type-safe asset handling
 */
export type Asset = 
  | DecisionModelAsset
  | RulesetAsset
  | MLModelAsset
  | TaskModelAsset
  | RuleflowAsset
  | DecisionTableAsset
  | GenAINodeAsset
  | FunctionAsset
  | PolicyAsset
  | DashboardAsset
  | DataModelAsset
  | BaseAsset;

// ============================================================================
// QUERY & FILTER TYPES
// ============================================================================

/**
 * Filter options for querying automations
 */
export interface AutomationFilter {
  status?: Status | Status[];
  variant?: 'standard' | 'ai-generated' | ('standard' | 'ai-generated')[];
  tags?: string[];
  industry?: string | string[];
  search?: string;
  createdAfter?: string;
  createdBefore?: string;
}

/**
 * Filter options for querying services
 */
export interface ServiceFilter {
  automationId?: string;
  status?: Status | Status[];
  type?: DecisionService['type'] | DecisionService['type'][];
  tags?: string[];
  search?: string;
}

/**
 * Filter options for querying assets
 */
export interface AssetFilter {
  serviceId?: string;
  parentAssetId?: string;
  type?: AssetType | AssetType[];
  status?: Status | Status[];
  tags?: string[];
  search?: string;
}

/**
 * Sort options
 */
export interface SortOptions {
  field: 'name' | 'createdDate' | 'lastUpdatedDate' | 'status';
  direction: 'asc' | 'desc';
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Count aggregation by asset type
 */
export interface AssetCounts {
  total: number;
  byType: Partial<Record<AssetType, number>>;
}

/**
 * Statistics for a service
 */
export interface ServiceStatistics {
  totalAssets: number;
  assetsByType: Partial<Record<AssetType, number>>;
  lastDeployment?: string;
  healthStatus: 'healthy' | 'warning' | 'error';
}

/**
 * Statistics for an automation
 */
export interface AutomationStatistics {
  totalServices: number;
  totalAssets: number;
  deployedServices: number;
  lastDeployment?: string;
  executionCount?: number;
  healthStatus: 'healthy' | 'warning' | 'error';
}
