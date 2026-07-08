import { useState } from 'react';
import styles from './Timeline.module.css';
import TimelineItem from './TimelineItem';
import type { TimelineEvent } from './types';

export interface TimelineProps {
  events: TimelineEvent[];
  emptyMessage?: string;
}

export default function Timeline({ events, emptyMessage = 'No events to display' }: TimelineProps) {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const handleToggle = (eventId: string) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };

  if (events.length === 0) {
    return (
      <div className={styles.timelineContainer}>
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineList}>
        {events.map((event) => (
          <TimelineItem
            key={event.id}
            event={event}
            isExpanded={expandedEventId === event.id}
            onToggle={() => handleToggle(event.id)}
          />
        ))}
      </div>
    </div>
  );
}
