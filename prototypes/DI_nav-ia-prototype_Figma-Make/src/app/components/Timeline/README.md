# Timeline Component

A flexible timeline component for displaying chronological events with expandable detail panels.

## Features

- **Event Timeline**: Visual timeline with dots and connecting lines
- **Expandable Details**: Click any event to see detailed information
- **Type Indicators**: Color-coded dots based on event type
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: Motion-based expand/collapse animations
- **Action Support**: Buttons for event-specific actions

## Components

### Timeline
Main container component that renders a list of timeline events.

```tsx
import { Timeline } from './components/Timeline';

<Timeline 
  events={events}
  emptyMessage="No events to display"
/>
```

### TimelineItem
Individual timeline event with header, description, and metadata.

### TimelineItemDetail
Expandable detail panel showing changes, metadata, and actions.

## Event Types

The timeline supports the following event types, each with distinct visual styling:

- `version` - Version releases and commits (Blue)
- `deployment` - Deployments to environments (Green)
- `change` - Configuration and content changes (Default)
- `alert` - Critical alerts and errors (Red)
- `notification` - System notifications (Blue)
- `recommendation` - AI/system recommendations (Purple)

## Event Structure

```typescript
interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  description?: string;
  timestamp: string;
  author?: string;
  badge?: TimelineBadge;
  
  // Expandable details
  details?: Record<string, any>;
  changes?: TimelineChange[];
  metadata?: Record<string, any>;
  actions?: TimelineAction[];
}
```

## Usage Example

### Basic Timeline

```tsx
import { Timeline } from './components/Timeline';
import type { TimelineEvent } from './components/Timeline/types';

function HistoryView() {
  const events: TimelineEvent[] = [
    {
      id: '1',
      type: 'deployment',
      title: 'Deployed v1.1.0 to Production',
      description: 'Successfully deployed with execution tracking',
      timestamp: '2025-10-15T14:20:00.000Z',
      author: 'domwashburn@us.ibm.com',
      badge: { label: 'v1.1.0', variant: 'deployment' },
      details: {
        version: '1.1.0',
        environment: 'Production',
        status: 'Success',
      },
      actions: [
        {
          label: 'View logs',
          onClick: () => console.log('View logs'),
        },
      ],
    },
  ];

  return <Timeline events={events} />;
}
```

### With Changes

```tsx
const eventWithChanges: TimelineEvent = {
  id: '2',
  type: 'change',
  title: 'Updated automation description',
  timestamp: '2025-10-16T11:20:00.000Z',
  author: 'domwashburn@us.ibm.com',
  changes: [
    {
      field: 'description',
      changeType: 'modified',
      oldValue: 'Old description',
      newValue: 'New description',
    },
  ],
};
```

### With Actions

```tsx
const eventWithActions: TimelineEvent = {
  id: '3',
  type: 'recommendation',
  title: 'Optimize decision model',
  description: 'AI suggests optimizing for 30% latency reduction',
  timestamp: '2025-10-16T06:00:00.000Z',
  actions: [
    {
      label: 'View details',
      onClick: () => console.log('View'),
    },
    {
      label: 'Apply optimization',
      onClick: () => console.log('Apply'),
      primary: true,
    },
  ],
};
```

## Styling

The Timeline component uses CSS modules and CSS variables from the design system:

- `--cds-background` - Background colors
- `--cds-layer-01`, `--cds-layer-02` - Layer colors
- `--cds-border-subtle-01` - Border colors
- `--cds-text-primary`, `--cds-text-secondary` - Text colors
- `--cds-support-*` - Color indicators for different event types
- `--cds-spacing-*` - Spacing scale
- `--cds-font-family` - Typography

## Integration with Data Layer

The Timeline component is designed to work with the activity data layer:

```tsx
import { useActivity } from '../../data/hooks';
import { Timeline } from '../Timeline';

function ActivityView() {
  const { allEvents, deployments, notifications } = useActivity();
  
  return (
    <div>
      <h2>All Activity</h2>
      <Timeline events={allEvents} />
      
      <h2>Deployments Only</h2>
      <Timeline events={deployments} />
    </div>
  );
}
```

## Animation

Timeline detail panels use Motion (Framer Motion) for smooth expand/collapse animations:

```tsx
<motion.div
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: 'auto' }}
  exit={{ opacity: 0, height: 0 }}
  transition={{ duration: 0.2 }}
>
  {/* Detail content */}
</motion.div>
```

## Accessibility

- All interactive elements are keyboard accessible
- Event items have proper focus states
- Semantic HTML structure
- Clear visual hierarchy

## Future Enhancements

- Filtering by event type
- Date range filtering
- Search within events
- Export to CSV/JSON
- Read/unread state tracking
- Real-time updates
- Pagination for large datasets
