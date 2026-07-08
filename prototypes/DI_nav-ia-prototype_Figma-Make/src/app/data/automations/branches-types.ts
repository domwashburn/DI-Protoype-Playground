/**
 * Branching and Versioning Type Definitions
 * 
 * Comprehensive type system for git-like branching, version control,
 * and AI creation tracking for Decision Automations.
 * 
 * Features:
 * - Git-flow branching model
 * - Semantic versioning
 * - Change tracking
 * - Diff calculation
 * - Merge conflict detection
 * - AI metadata tracking
 */

// ============================================================================
// BRANCH TYPES
// ============================================================================

/**
 * Branch type following git-flow convention
 */
export type BranchType = 
  | 'main'        // Production-ready code (protected)
  | 'develop'     // Integration branch
  | 'feature'     // Feature development
  | 'hotfix'      // Critical production fixes
  | 'release'     // Release preparation
  | 'experiment'; // Experimental changes

/**
 * Branch status
 */
export type BranchStatus = 
  | 'active'      // Currently in use
  | 'stale'       // Not updated recently
  | 'merged'      // Merged into parent
  | 'archived';   // No longer in use

/**
 * Branch protection level
 */
export type ProtectionLevel = 
  | 'none'        // No restrictions
  | 'review'      // Requires review before merge
  | 'protected';  // Cannot be deleted, requires approval

/**
 * Branch entity
 */
export interface Branch {
  // Identity
  id: string;
  name: string;                    // e.g., "feature/enhanced-scoring"
  displayName?: string;            // e.g., "Enhanced Scoring"
  type: BranchType;
  
  // Relationships
  parentBranchId?: string;         // Branch created from
  baseBranchId?: string;           // Base for comparison/merges
  
  // Metadata
  createdDate: string;
  createdBy: string;
  lastCommitDate: string;
  lastCommitBy: string;
  
  // Protection
  protection: ProtectionLevel;
  status: BranchStatus;
  isDefault: boolean;              // Is this the default branch?
  
  // Commit tracking (vs base branch)
  aheadBy?: number;                // Commits ahead of base
  behindBy?: number;               // Commits behind base
  
  // Additional metadata
  description?: string;
  tags?: string[];
}

/**
 * Branch filter options
 */
export interface BranchFilter {
  type?: BranchType | BranchType[];
  status?: BranchStatus | BranchStatus[];
  protection?: ProtectionLevel | ProtectionLevel[];
  createdBy?: string;
  createdAfter?: string;
  createdBefore?: string;
  search?: string;
}

// ============================================================================
// VERSION TYPES
// ============================================================================

/**
 * Semantic version structure
 */
export interface SemanticVersion {
  major: number;
  minor: number;
  patch: number;
  prerelease?: string;             // e.g., "alpha", "beta", "rc.1"
  build?: string;
}

/**
 * Deployment environment
 */
export type DeploymentEnvironment = 
  | 'development'
  | 'staging'
  | 'production';

/**
 * Deployment information for a version
 */
export interface DeploymentInfo {
  environment: DeploymentEnvironment;
  deployedAt: string;               // Timestamp of deployment
  deployedBy: string;               // Who deployed it
  deploymentId?: string;            // Deployment tracking ID
}

/**
 * Version entity
 * Represents a snapshot in time with change tracking
 */
export interface Version {
  // Identity
  id: string;
  entityId: string;                // ID of automation/service/asset
  entityType: 'automation' | 'service' | 'asset';
  branchId: string;
  
  // Version info
  version: string;                 // Semantic version string (e.g., "1.2.0")
  semanticVersion: SemanticVersion;
  
  // Metadata
  timestamp: string;
  author: string;
  authorEmail?: string;
  message: string;                 // Commit message
  
  // Relationships
  parentVersionIds: string[];      // Parent version(s) - multiple for merges
  
  // Snapshot
  snapshot: any;                   // Full entity state at this version
  
  // Changes
  changes: Change[];               // What changed in this version
  
  // Git-like stats
  filesChanged?: number;
  insertions?: number;
  deletions?: number;
  
  // Deployment tracking
  deployedTo?: DeploymentInfo[];   // Environments this version is deployed to
  
  // Additional metadata
  tags?: string[];
}

/**
 * Version filter options
 */
export interface VersionFilter {
  entityId?: string;
  entityType?: 'automation' | 'service' | 'asset';
  branchId?: string;
  author?: string;
  after?: string;
  before?: string;
  search?: string;
}

// ============================================================================
// CHANGE TYPES
// ============================================================================

/**
 * Type of change
 */
export type ChangeType = 
  | 'added'       // New field/item added
  | 'modified'    // Existing field/item changed
  | 'removed'     // Field/item deleted
  | 'renamed'     // Field renamed
  | 'moved';      // Array item moved

/**
 * Individual change
 */
export interface Change {
  id: string;
  field: string;                   // Field path (e.g., "description", "tags[0]")
  changeType: ChangeType;
  oldValue?: any;
  newValue?: any;
  index?: number;                  // For array operations
  timestamp: string;
  author: string;
}

// ============================================================================
// DIFF TYPES
// ============================================================================

/**
 * Diff change (calculated difference)
 */
export interface DiffChange {
  path: string;                    // JSON path to changed field
  changeType: ChangeType;
  oldValue?: any;
  newValue?: any;
  context?: string;                // Human-readable context
}

/**
 * Diff result
 */
export interface Diff {
  fromVersionId: string;
  toVersionId: string;
  
  // Summary stats
  totalChanges: number;
  additions: number;
  modifications: number;
  deletions: number;
  
  // Detailed changes
  changes: DiffChange[];
  
  // Conflicts (if comparing branches)
  hasConflicts: boolean;
  conflicts?: Conflict[];
}

/**
 * Merge conflict
 */
export interface Conflict {
  path: string;
  baseValue?: any;                 // Value in common ancestor
  currentValue?: any;              // Value in current branch
  incomingValue?: any;             // Value in incoming branch
  conflictType: ConflictType;
}

/**
 * Types of conflicts
 */
export type ConflictType = 
  | 'both-modified'                // Both branches modified same field
  | 'deleted-modified'             // One deleted, one modified
  | 'added-added'                  // Both added different values
  | 'moved-modified';              // One moved, one modified

/**
 * Compare options
 */
export interface CompareOptions {
  ignoreWhitespace?: boolean;
  ignoreCase?: boolean;
  contextLines?: number;
}

// ============================================================================
// AI METADATA TYPES
// ============================================================================

/**
 * How was this entity created?
 */
export type CreationMethod = 
  | 'manual'                       // User created via UI
  | 'ai-generated'                 // Fully AI generated
  | 'ai-assisted'                  // AI helped user create
  | 'imported'                     // Imported from external source
  | 'cloned'                       // Cloned from existing entity
  | 'template';                    // Created from template

/**
 * AI creation metadata
 * Track AI involvement in entity creation
 */
export interface AIMetadata {
  // Creation method
  creationMethod: CreationMethod;
  
  // AI details (if AI-generated or AI-assisted)
  aiModel?: string;                // e.g., "gpt-4", "claude-2"
  aiVersion?: string;              // Model version
  prompt?: string;                 // User's prompt
  promptTokens?: number;           // Token usage
  completionTokens?: number;
  
  // Quality metrics
  confidence?: number;             // AI confidence (0-1)
  qualityScore?: number;           // Quality assessment (0-1)
  
  // Human oversight
  reviewedBy?: string;             // Who reviewed AI output
  reviewDate?: string;
  approved?: boolean;              // Was it approved?
  userModifications?: string[];    // Fields user modified after AI generation
  
  // Context
  context?: string;                // Additional context
  generatedAt: string;             // When AI generated it
}

// ============================================================================
// MERGE TYPES
// ============================================================================

/**
 * Merge request
 */
export interface MergeRequest {
  id: string;
  sourceBranchId: string;
  targetBranchId: string;
  sourceVersionId: string;
  targetVersionId: string;
  
  title: string;
  description?: string;
  
  createdBy: string;
  createdDate: string;
  
  status: MergeStatus;
  
  conflicts?: Conflict[];
  canAutoMerge: boolean;
  
  reviewers?: string[];
  approvals?: string[];
}

/**
 * Merge status
 */
export type MergeStatus = 
  | 'draft'
  | 'open'
  | 'approved'
  | 'merged'
  | 'rejected'
  | 'conflicts';

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Version comparison result
 */
export interface VersionComparison {
  isNewer: boolean;
  isDifferent: boolean;
  majorVersionDiff: number;
  minorVersionDiff: number;
  patchVersionDiff: number;
}

/**
 * Branch comparison result
 */
export interface BranchComparison {
  diverged: boolean;
  aheadBy: number;
  behindBy: number;
  commonAncestorId?: string;
  canFastForward: boolean;
}

/**
 * Timeline entry
 */
export interface TimelineEntry {
  version: Version;
  timestamp: string;
  author: string;
  message: string;
  changesCount: number;
  type: 'commit' | 'merge' | 'tag';
}

// ============================================================================
// HELPER TYPES
// ============================================================================

/**
 * Snapshot of an entity at a point in time
 */
export type EntitySnapshot = any; // Could be DecisionAutomation | DecisionService | Asset

/**
 * Version statistics
 */
export interface VersionStats {
  totalVersions: number;
  totalChanges: number;
  contributors: string[];
  firstVersion: Version | undefined;
  latestVersion: Version | undefined;
}

/**
 * Branch statistics
 */
export interface BranchStats {
  totalBranches: number;
  activeBranches: number;
  mergedBranches: number;
  staleBranches: number;
}
