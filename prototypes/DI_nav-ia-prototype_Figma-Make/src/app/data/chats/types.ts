/**
 * Chat Logs Type Definitions
 * 
 * Comprehensive chat/conversation system with support for:
 * - Multi-turn conversations
 * - Canvas-style artifacts (like ChatGPT Canvas)
 * - Asset references (links to generated automations/services/assets)
 * - Version history of artifacts
 * - Rich message types
 * - Search and filtering
 * 
 * Architecture:
 * Conversations (chat sessions)
 *   └─> Messages (user/assistant exchanges)
 *       └─> Artifacts (generated assets viewable in Canvas)
 *           └─> References (links to actual automation assets)
 */

// ============================================================================
// CONVERSATION TYPES
// ============================================================================

/**
 * Conversation Status
 */
export type ConversationStatus = 
  | 'active'         // Currently being used
  | 'paused'         // Temporarily inactive
  | 'archived'       // Completed/stored
  | 'deleted';       // Soft deleted

/**
 * Conversation Type
 */
export type ConversationType = 
  | 'chat'           // Regular chat conversation
  | 'canvas'         // Canvas-focused session
  | 'review'         // Review/feedback session
  | 'brainstorm'     // Ideation session
  | 'debug'          // Debugging/troubleshooting
  | 'training';      // Learning/tutorial

/**
 * Conversation
 * A chat session with the AI assistant
 */
export interface Conversation {
  // Identity
  id: string;
  title: string;
  description?: string;
  
  // Type & Status
  type: ConversationType;
  status: ConversationStatus;
  
  // Relationships
  messageIds: string[];            // Messages in this conversation
  artifactIds: string[];           // Artifacts created in this conversation
  
  // Context
  contextAutomationId?: string;    // Automation being discussed
  contextServiceId?: string;       // Service being discussed
  contextAssetId?: string;         // Asset being discussed
  
  // Participants
  userId: string;
  userName: string;
  userEmail: string;
  aiModel: string;                 // e.g., "gpt-4", "claude-3"
  aiVersion?: string;
  
  // Metadata
  createdDate: string;
  lastMessageDate: string;
  lastUpdatedDate: string;
  
  // Statistics
  messageCount: number;
  artifactCount: number;
  totalTokens?: number;
  
  // Organization
  tags?: Tag[];
  isFavorite: boolean;
  isPinned: boolean;
  
  // Sharing
  isShared: boolean;
  sharedWith?: string[];           // User IDs
  
  // Additional
  summary?: string;                // AI-generated summary
  notes?: string;
}

// ============================================================================
// MESSAGE TYPES
// ============================================================================

/**
 * Message Role
 */
export type MessageRole = 
  | 'user'           // User message
  | 'assistant'      // AI response
  | 'system';        // System message

/**
 * Message Status
 */
export type MessageStatus = 
  | 'sending'        // Being sent
  | 'sent'           // Successfully sent
  | 'received'       // Received by server
  | 'generating'     // AI generating response
  | 'complete'       // Fully received
  | 'error'          // Error occurred
  | 'edited'         // Message was edited
  | 'deleted';       // Soft deleted

/**
 * Message Content Type
 */
export type MessageContentType = 
  | 'text'           // Plain text
  | 'markdown'       // Markdown formatted
  | 'code'           // Code block
  | 'artifact'       // Artifact reference
  | 'image'          // Image
  | 'file'           // File attachment
  | 'mixed';         // Multiple content types

/**
 * Message
 * A single message in a conversation
 */
export interface Message {
  // Identity
  id: string;
  conversationId: string;
  
  // Content
  role: MessageRole;
  content: string;
  contentType: MessageContentType;
  
  // Relationships
  replyToId?: string;              // Message this replies to
  artifactIds?: string[];          // Artifacts created/referenced
  assetReferences?: AssetReference[]; // References to automation assets
  
  // Status
  status: MessageStatus;
  
  // Metadata
  timestamp: string;
  editedAt?: string;
  deletedAt?: string;
  
  // AI Metadata (for assistant messages)
  aiModel?: string;
  aiVersion?: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  finishReason?: string;           // e.g., "stop", "length", "content_filter"
  
  // User Interaction
  rating?: MessageRating;          // User feedback
  isFavorite?: boolean;
  
  // Additional
  metadata?: Record<string, any>;  // Extensible metadata
}

/**
 * Message Rating
 */
export interface MessageRating {
  value: number;                   // 1-5 stars
  feedback?: string;
  timestamp: string;
}

// ============================================================================
// ARTIFACT TYPES
// ============================================================================

/**
 * Artifact Type
 * Type of content that can be opened in Canvas view
 */
export type ArtifactType = 
  | 'decision-model'                // Decision model definition
  | 'rule-model'                    // Business rules
  | 'ml-model'                      // ML model configuration
  | 'predictive-model'              // Predictive model
  | 'optimization-model'            // Optimization model
  | 'task-model'                    // Task model/workflow
  | 'policy'                        // Policy document
  | 'dashboard'                     // Dashboard configuration
  | 'prompt'                        // AI prompt
  | 'data-model'                    // Data structure
  | 'code'                          // Code snippet
  | 'document'                      // Text document
  | 'diagram'                       // Visual diagram
  | 'table'                         // Data table
  | 'json'                          // JSON data
  | 'yaml'                          // YAML configuration
  | 'csv';                          // CSV data

/**
 * Artifact Status
 */
export type ArtifactStatus = 
  | 'draft'          // Being created
  | 'generated'      // AI generated
  | 'reviewed'       // User reviewed
  | 'approved'       // Approved for use
  | 'published'      // Published/deployed
  | 'archived';      // No longer active

/**
 * Artifact
 * Generated content that can be viewed in Canvas
 */
export interface Artifact {
  // Identity
  id: string;
  title: string;
  description?: string;
  
  // Relationships
  conversationId: string;
  messageId: string;               // Message that created this artifact
  assetId?: string;                // Linked automation asset (if published)
  
  // Type & Content
  type: ArtifactType;
  content: string;                 // The actual content (JSON, markdown, code, etc.)
  contentType: string;             // MIME type
  
  // Status & Version
  status: ArtifactStatus;
  version: string;                 // Semantic version
  versionHistory: ArtifactVersion[];
  
  // AI Metadata
  aiGenerated: boolean;
  aiModel?: string;
  aiVersion?: string;
  prompt?: string;
  confidence?: number;
  
  // User Interaction
  viewCount: number;
  editCount: number;
  lastViewedDate?: string;
  lastEditedDate?: string;
  
  // Metadata
  createdDate: string;
  createdBy: string;
  lastUpdatedDate: string;
  lastUpdatedBy: string;
  
  // Canvas Settings
  canvasConfig?: CanvasConfig;
  
  // Additional
  tags?: Tag[];
  notes?: string;
  isPublic?: boolean;
}

/**
 * Artifact Version
 * Version history for an artifact
 */
export interface ArtifactVersion {
  id: string;
  version: string;
  content: string;
  changeDescription?: string;
  createdDate: string;
  createdBy: string;
  aiGenerated: boolean;
}

/**
 * Canvas Configuration
 * Settings for Canvas view
 */
export interface CanvasConfig {
  layout: 'editor' | 'split' | 'preview';
  theme: 'light' | 'dark' | 'auto';
  fontSize?: number;
  lineNumbers?: boolean;
  wordWrap?: boolean;
  readOnly?: boolean;
}

// ============================================================================
// ASSET REFERENCE TYPES
// ============================================================================

/**
 * Asset Reference
 * Links a message to an automation asset
 */
export interface AssetReference {
  // Identity
  id: string;
  messageId: string;
  
  // Referenced Asset
  assetId: string;                 // ID from automations data layer
  assetType: 'automation' | 'service' | 'asset';
  assetName: string;
  
  // Reference Type
  referenceType: ReferenceType;
  
  // Context
  context?: string;                // Why this asset is referenced
  
  // Metadata
  createdDate: string;
}

/**
 * Reference Type
 */
export type ReferenceType = 
  | 'created'        // Asset was created in this message
  | 'modified'       // Asset was modified
  | 'referenced'     // Asset was mentioned
  | 'inspected'      // Asset was viewed/analyzed
  | 'compared'       // Asset was compared
  | 'cloned'         // Asset was duplicated
  | 'deleted';       // Asset was deleted

// ============================================================================
// SUPPORTING TYPES
// ============================================================================

/**
 * Tag
 */
export interface Tag {
  id: string;
  label: string;
  color?: string;
}

/**
 * Attachment
 */
export interface Attachment {
  id: string;
  messageId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  uploadedDate: string;
}

/**
 * Suggestion
 * AI-suggested follow-up actions
 */
export interface Suggestion {
  id: string;
  text: string;
  type: 'question' | 'action' | 'clarification';
  confidence?: number;
}

// ============================================================================
// FILTER TYPES
// ============================================================================

/**
 * Conversation Filter Options
 */
export interface ConversationFilter {
  status?: ConversationStatus | ConversationStatus[];
  type?: ConversationType | ConversationType[];
  userId?: string;
  contextAutomationId?: string;
  contextServiceId?: string;
  contextAssetId?: string;
  isFavorite?: boolean;
  isPinned?: boolean;
  isShared?: boolean;
  hasArtifacts?: boolean;
  createdAfter?: string;
  createdBefore?: string;
  search?: string;
}

/**
 * Message Filter Options
 */
export interface MessageFilter {
  conversationId?: string;
  role?: MessageRole | MessageRole[];
  status?: MessageStatus | MessageStatus[];
  contentType?: MessageContentType | MessageContentType[];
  hasArtifacts?: boolean;
  hasAssetReferences?: boolean;
  isFavorite?: boolean;
  createdAfter?: string;
  createdBefore?: string;
  search?: string;
}

/**
 * Artifact Filter Options
 */
export interface ArtifactFilter {
  conversationId?: string;
  type?: ArtifactType | ArtifactType[];
  status?: ArtifactStatus | ArtifactStatus[];
  aiGenerated?: boolean;
  assetId?: string;
  createdBy?: string;
  createdAfter?: string;
  createdBefore?: string;
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
 * Conversation Sort Options
 */
export interface ConversationSort {
  field: 'title' | 'createdDate' | 'lastMessageDate' | 'messageCount' | 'artifactCount';
  direction: SortDirection;
}

/**
 * Message Sort Options
 */
export interface MessageSort {
  field: 'timestamp' | 'role' | 'contentType';
  direction: SortDirection;
}

/**
 * Artifact Sort Options
 */
export interface ArtifactSort {
  field: 'title' | 'type' | 'status' | 'createdDate' | 'lastUpdatedDate' | 'viewCount';
  direction: SortDirection;
}

// ============================================================================
// STATISTICS TYPES
// ============================================================================

/**
 * Conversation Statistics
 */
export interface ConversationStats {
  totalConversations: number;
  activeConversations: number;
  totalMessages: number;
  totalArtifacts: number;
  totalTokens: number;
  averageMessagesPerConversation: number;
  mostUsedModel: string;
}

/**
 * User Activity
 */
export interface UserActivity {
  userId: string;
  userName: string;
  conversationCount: number;
  messageCount: number;
  artifactCount: number;
  lastActiveDate: string;
  favoriteTopics?: string[];
}

// ============================================================================
// EXPORT OPTIONS TYPES
// ============================================================================

/**
 * Export Format
 */
export type ExportFormat = 
  | 'json'
  | 'markdown'
  | 'html'
  | 'pdf'
  | 'txt';

/**
 * Export Options
 */
export interface ExportOptions {
  format: ExportFormat;
  includeMetadata: boolean;
  includeArtifacts: boolean;
  includeSystemMessages: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}
