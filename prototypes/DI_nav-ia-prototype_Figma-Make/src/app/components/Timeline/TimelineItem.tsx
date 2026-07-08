import { 
  ChevronDown, 
  Tag, 
  Rocket, 
  Edit, 
  WarningAlt, 
  Notification as NotificationIcon, 
  Idea,
  Information,
  Branch,
  WatsonxAi
} from '@carbon/icons-react';
import styles from './TimelineItem.module.css';
import TimelineItemDetail from './TimelineItemDetail';
import type { TimelineEvent } from './types';

export interface TimelineItemProps {
  event: TimelineEvent;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function TimelineItem({ event, isExpanded, onToggle }: TimelineItemProps) {
  // Check if event was created by AI
  const isAIGenerated = event.details?.createdBy === 'AI' || 
                        event.details?.aiModel || 
                        event.author === 'Decision Assistant';
  
  // Get icon based on event type and badge
  const getEventIcon = () => {
    // Check for specific notification types by badge label
    if (event.type === 'notification' && event.badge?.label) {
      if (event.badge.label === 'Platform Update') {
        return <Information size={16} />;
      }
      if (event.badge.label === 'Merge') {
        return <Branch size={16} />;
      }
    }
    
    // Default icons by type
    switch (event.type) {
      case 'version':
        // AI-generated versions use AI icon, others use Tag
        return isAIGenerated ? <WatsonxAi size={16} /> : <Tag size={16} />;
      case 'deployment':
        return <Rocket size={16} />;
      case 'change':
        // AI-generated changes use AI icon, others use Edit
        return isAIGenerated ? <WatsonxAi size={16} /> : <Edit size={16} />;
      case 'alert':
        return <WarningAlt size={16} />;
      case 'notification':
        return <NotificationIcon size={16} />;
      case 'recommendation':
        return <Idea size={16} />;
      default:
        return <Tag size={16} />;
    }
  };

  return (
    <>
      <div
        className={`${styles.timelineItem} ${isExpanded ? styles.expanded : ''}`}
        onClick={onToggle}
      >
        {/* Timeline Indicator */}
        <div className={styles.timelineIndicator}>
          <div className={`${styles.timelineDot} ${styles[event.type]}`}>
            {getEventIcon()}
          </div>
          <div className={styles.timelineLine} />
        </div>

        {/* Content */}
        <div className={styles.timelineContent}>
          <div className={styles.timelineHeader}>
            <h3 className={styles.timelineTitle}>{event.title}</h3>
            <div className={styles.expandIcon + (isExpanded ? ` ${styles.expanded}` : '')}>
              <ChevronDown size={20} />
            </div>
          </div>

          {event.description && (
            <p className={styles.timelineDescription}>{event.description}</p>
          )}

          <div className={styles.timelineMeta}>
            {event.author && (
              <span className={styles.timelineAuthor}>
                {event.author}
              </span>
            )}
            
            {event.badge && (
              <span className={`${styles.timelineBadge} ${styles[event.badge.variant || 'default']}`}>
                {event.badge.label}
              </span>
            )}
            
            <span className={styles.timelineTimestamp}>
              {formatTimestamp(event.timestamp)}
            </span>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <TimelineItemDetail event={event} isExpanded={isExpanded} />
    </>
  );
}

// Helper function to format timestamp
function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  
  // Format as date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}
