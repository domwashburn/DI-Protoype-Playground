/**
 * Timeline Component Types
 */

export type TimelineEventType = 
  | 'version' 
  | 'deployment' 
  | 'change' 
  | 'alert' 
  | 'notification'
  | 'recommendation';

export interface TimelineChange {
  field: string;
  changeType: 'added' | 'modified' | 'removed';
  oldValue?: any;
  newValue?: any;
}

export interface TimelineAction {
  label: string;
  onClick: () => void;
  primary?: boolean;
}

export interface TimelineBadge {
  label: string;
  variant?: 'version' | 'deployment' | 'alert' | 'warning' | 'default';
}

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  description?: string;
  timestamp: string;
  author?: string;
  badge?: TimelineBadge;
  
  // Entity relationship
  automationId?: string; // For filtering events by automation
  
  // Expandable details
  details?: Record<string, any>;
  changes?: TimelineChange[];
  metadata?: Record<string, any>;
  actions?: TimelineAction[];
}
