/**
 * Business Objectives Type Definitions
 * 
 * Implements an OKR-inspired (Objectives and Key Results) data structure
 * with support for strategic goals, business objectives, key results,
 * and metrics tracking.
 * 
 * Hierarchy:
 * Strategic Goals (top-level, long-term)
 *   └─> Business Objectives (specific, measurable)
 *       └─> Key Results (outcomes, metrics)
 *           └─> Metrics (KPIs, measurements)
 * 
 * Features:
 * - Multi-level hierarchy
 * - Status tracking
 * - Progress measurement
 * - Automation relationships
 * - Owner/team assignment
 * - Timeline management
 */

// ============================================================================
// STRATEGIC GOAL TYPES
// ============================================================================

/**
 * Strategic Goal Status
 */
export type GoalStatus = 
  | 'draft'          // Planning phase
  | 'active'         // Currently being worked on
  | 'on-track'       // Progressing well
  | 'at-risk'        // Behind schedule/metrics
  | 'achieved'       // Successfully completed
  | 'abandoned';     // No longer pursued

/**
 * Goal Priority
 */
export type Priority = 
  | 'critical'       // Must achieve
  | 'high'          // Very important
  | 'medium'        // Important
  | 'low';          // Nice to have

/**
 * Strategic Goal
 * Top-level long-term goal for the organization
 */
export interface StrategicGoal {
  // Identity
  id: string;
  name: string;
  description: string;
  
  // Hierarchy
  objectiveIds: string[];          // Business objectives supporting this goal
  
  // Status & Progress
  status: GoalStatus;
  progress: number;                // 0-100 percentage
  
  // Priority & Impact
  priority: Priority;
  impactArea: string;              // e.g., "Revenue Growth", "Customer Satisfaction"
  
  // Ownership
  owner: string;
  ownerEmail: string;
  team?: string;
  
  // Timeline
  startDate: string;
  targetDate: string;
  achievedDate?: string;
  
  // Metadata
  createdDate: string;
  createdBy: string;
  lastUpdatedDate: string;
  lastUpdatedBy: string;
  
  // Additional
  tags?: Tag[];
  notes?: string;
}

// ============================================================================
// BUSINESS OBJECTIVE TYPES
// ============================================================================

/**
 * Business Objective
 * Specific, measurable objective supporting a strategic goal
 */
export interface BusinessObjective {
  // Identity
  id: string;
  name: string;
  description: string;
  
  // Hierarchy
  goalId: string;                  // Parent strategic goal
  keyResultIds: string[];          // Key results for this objective
  parentId?: string;               // Parent objective (for nested objectives)
  childIds?: string[];             // Child objectives (sub-objectives)
  
  // Relationships
  automationIds: string[];         // Automations supporting this objective
  serviceIds: string[];           // Services supporting this objective
  
  // Status & Progress
  status: GoalStatus;
  progress: number;                // 0-100 percentage
  
  // Priority & Impact
  priority: Priority;
  category: ObjectiveCategory;
  
  // Ownership
  owner: string;
  ownerEmail: string;
  team?: string;
  
  // Timeline
  startDate: string;
  targetDate: string;
  achievedDate?: string;
  
  // Metadata
  createdDate: string;
  createdBy: string;
  lastUpdatedDate: string;
  lastUpdatedBy: string;
  
  // Additional
  tags?: Tag[];
  notes?: string;
  dependencies?: string[];         // Other objective IDs this depends on
}

/**
 * Objective Category
 */
export type ObjectiveCategory = 
  | 'revenue'                     // Revenue growth
  | 'cost-reduction'              // Cost optimization
  | 'customer-satisfaction'       // Customer experience
  | 'operational-efficiency'      // Process improvement
  | 'risk-management'             // Risk mitigation
  | 'compliance'                  // Regulatory compliance
  | 'innovation'                  // New capabilities
  | 'quality'                     // Quality improvement
  | 'growth'                      // Market expansion
  | 'transformation';             // Digital transformation

// ============================================================================
// KEY RESULT TYPES
// ============================================================================

/**
 * Key Result Type
 */
export type KeyResultType = 
  | 'metric'         // Measured by KPI
  | 'milestone'      // Binary completion
  | 'boolean';       // Yes/no achievement

/**
 * Key Result
 * Measurable outcome for a business objective
 */
export interface KeyResult {
  // Identity
  id: string;
  name: string;
  description: string;
  
  // Hierarchy
  objectiveId: string;             // Parent objective
  
  // Measurement
  type: KeyResultType;
  metricId?: string;               // Associated metric (if type = 'metric')
  
  // Targets
  startValue?: number;
  targetValue?: number;
  currentValue?: number;
  unit?: string;                   // e.g., "$", "%", "days", "count"
  
  // Status & Progress
  status: GoalStatus;
  progress: number;                // 0-100 percentage
  
  // Timeline
  startDate: string;
  targetDate: string;
  achievedDate?: string;
  
  // Metadata
  createdDate: string;
  createdBy: string;
  lastUpdatedDate: string;
  lastUpdatedBy: string;
  
  // Additional
  notes?: string;
}

// ============================================================================
// METRIC TYPES
// ============================================================================

/**
 * Metric Type
 */
export type MetricType = 
  | 'kpi'            // Key Performance Indicator
  | 'sla'            // Service Level Agreement
  | 'benchmark'      // Comparison metric
  | 'diagnostic';    // Health check metric

/**
 * Metric Frequency
 */
export type MetricFrequency = 
  | 'real-time'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'annually';

/**
 * Metric Trend
 */
export type MetricTrend = 
  | 'improving'      // Moving toward target
  | 'stable'         // No significant change
  | 'declining';     // Moving away from target

/**
 * Metric
 * KPI or measurement tracking
 */
export interface Metric {
  // Identity
  id: string;
  name: string;
  description: string;
  
  // Type & Measurement
  type: MetricType;
  unit: string;                    // e.g., "$", "%", "ms", "count"
  frequency: MetricFrequency;
  
  // Current State
  currentValue: number;
  targetValue: number;
  baselineValue?: number;
  
  // Thresholds
  warningThreshold?: number;
  criticalThreshold?: number;
  
  // Trend
  trend: MetricTrend;
  changePercent?: number;          // % change from previous period
  
  // History
  historicalValues?: MetricDataPoint[];
  
  // Ownership
  owner: string;
  ownerEmail: string;
  
  // Metadata
  createdDate: string;
  lastUpdatedDate: string;
  
  // Additional
  formula?: string;                // Calculation formula
  dataSource?: string;             // Where data comes from
  notes?: string;
}

/**
 * Metric Data Point
 * Historical metric value
 */
export interface MetricDataPoint {
  timestamp: string;
  value: number;
  note?: string;
}

// ============================================================================
// SUPPORTING TYPES
// ============================================================================

/**
 * Tag for categorization
 */
export interface Tag {
  id: string;
  label: string;
  color?: string;
}

/**
 * Progress Update
 * Track progress over time
 */
export interface ProgressUpdate {
  id: string;
  entityId: string;               // Goal, objective, or key result ID
  entityType: 'goal' | 'objective' | 'key-result';
  
  timestamp: string;
  previousProgress: number;
  newProgress: number;
  
  author: string;
  note?: string;
}

// ============================================================================
// FILTER TYPES
// ============================================================================

/**
 * Goal Filter Options
 */
export interface GoalFilter {
  status?: GoalStatus | GoalStatus[];
  priority?: Priority | Priority[];
  owner?: string;
  team?: string;
  impactArea?: string;
  search?: string;
}

/**
 * Objective Filter Options
 */
export interface ObjectiveFilter {
  goalId?: string;
  status?: GoalStatus | GoalStatus[];
  priority?: Priority | Priority[];
  category?: ObjectiveCategory | ObjectiveCategory[];
  owner?: string;
  team?: string;
  automationId?: string;           // Find objectives for specific automation
  search?: string;
}

/**
 * Key Result Filter Options
 */
export interface KeyResultFilter {
  objectiveId?: string;
  type?: KeyResultType | KeyResultType[];
  status?: GoalStatus | GoalStatus[];
  search?: string;
}

/**
 * Metric Filter Options
 */
export interface MetricFilter {
  type?: MetricType | MetricType[];
  trend?: MetricTrend | MetricTrend[];
  owner?: string;
  frequency?: MetricFrequency | MetricFrequency[];
  search?: string;
}

// ============================================================================
// SORT TYPES
// ============================================================================

/**
 * Sort Direction
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Goal Sort Options
 */
export interface GoalSort {
  field: 'name' | 'priority' | 'progress' | 'startDate' | 'targetDate' | 'lastUpdatedDate';
  direction: SortDirection;
}

/**
 * Objective Sort Options
 */
export interface ObjectiveSort {
  field: 'name' | 'priority' | 'progress' | 'category' | 'startDate' | 'targetDate' | 'lastUpdatedDate';
  direction: SortDirection;
}

/**
 * Key Result Sort Options
 */
export interface KeyResultSort {
  field: 'name' | 'progress' | 'targetDate' | 'lastUpdatedDate';
  direction: SortDirection;
}

/**
 * Metric Sort Options
 */
export interface MetricSort {
  field: 'name' | 'type' | 'currentValue' | 'trend' | 'lastUpdatedDate';
  direction: SortDirection;
}

// ============================================================================
// RELATIONSHIP TYPES
// ============================================================================

/**
 * Objective-Automation Relationship
 * Links objectives to automations that support them
 */
export interface ObjectiveAutomationLink {
  objectiveId: string;
  automationId: string;
  contribution: number;            // 0-100 how much automation contributes
  description?: string;
}

/**
 * Dependency
 * One objective depends on another
 */
export interface Dependency {
  id: string;
  sourceId: string;               // Dependent objective
  targetId: string;               // Objective it depends on
  type: DependencyType;
  description?: string;
}

/**
 * Dependency Type
 */
export type DependencyType = 
  | 'blocks'         // Source is blocked by target
  | 'requires'       // Source requires target completion
  | 'relates-to';    // Loosely related
