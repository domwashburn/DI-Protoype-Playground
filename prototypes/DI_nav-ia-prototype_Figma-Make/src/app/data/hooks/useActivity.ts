/**
 * useActivity Hook
 * 
 * React hooks for accessing activity events, deployments, notifications,
 * and other timeline events.
 * 
 * Features:
 * - Get all events
 * - Filter by event type
 * - Filter by date range
 * - Get recent events
 * 
 * @example
 * ```typescript
 * const { allEvents, deployments, notifications } = useActivity();
 * const { recentEvents } = useRecentActivity(7); // Last 7 days
 * ```
 */

import { useMemo } from 'react';
import type { TimelineEvent } from '../../components/Timeline/types';
import {
  getAllEvents,
  activityEvents,
  deploymentEvents,
  notificationEvents,
  recommendationEvents,
  alertEvents,
  systemUpdateEvents,
  getEventsByType,
  getEventsByDateRange,
  getRecentEvents,
} from '../automations/activity-data';

// ============================================================================
// USE ACTIVITY
// ============================================================================

export interface UseActivityResult {
  allEvents: TimelineEvent[];
  activities: TimelineEvent[];
  deployments: TimelineEvent[];
  notifications: TimelineEvent[];
  recommendations: TimelineEvent[];
  alerts: TimelineEvent[];
  systemUpdates: TimelineEvent[];
  count: number;
}

/**
 * Get all activity events
 */
export function useActivity(): UseActivityResult {
  const allEvents = useMemo(() => getAllEvents(), []);
  
  return {
    allEvents,
    activities: activityEvents,
    deployments: deploymentEvents,
    notifications: notificationEvents,
    recommendations: recommendationEvents,
    alerts: alertEvents,
    systemUpdates: systemUpdateEvents,
    count: allEvents.length,
  };
}

// ============================================================================
// USE ACTIVITY BY TYPE
// ============================================================================

export interface UseActivityByTypeResult {
  events: TimelineEvent[];
  count: number;
}

/**
 * Get activity events by type
 */
export function useActivityByType(type: TimelineEvent['type']): UseActivityByTypeResult {
  const events = useMemo(() => getEventsByType(type), [type]);
  
  return {
    events,
    count: events.length,
  };
}

// ============================================================================
// USE RECENT ACTIVITY
// ============================================================================

export interface UseRecentActivityResult {
  recentEvents: TimelineEvent[];
  count: number;
}

/**
 * Get recent activity (last N days)
 */
export function useRecentActivity(days: number = 7): UseRecentActivityResult {
  const recentEvents = useMemo(() => getRecentEvents(days), [days]);
  
  return {
    recentEvents,
    count: recentEvents.length,
  };
}

// ============================================================================
// USE ACTIVITY BY DATE RANGE
// ============================================================================

export interface UseActivityByDateRangeResult {
  events: TimelineEvent[];
  count: number;
}

/**
 * Get activity events within a date range
 */
export function useActivityByDateRange(
  startDate: string,
  endDate: string
): UseActivityByDateRangeResult {
  const events = useMemo(
    () => getEventsByDateRange(startDate, endDate),
    [startDate, endDate]
  );
  
  return {
    events,
    count: events.length,
  };
}

// ============================================================================
// USE UNREAD COUNTS
// ============================================================================

export interface UseUnreadCountsResult {
  notifications: number;
  recommendations: number;
  alerts: number;
  total: number;
}

/**
 * Get unread event counts
 * Note: In a real app, this would track read/unread state
 */
export function useUnreadCounts(): UseUnreadCountsResult {
  // For now, treating all as unread
  // In real app, would filter based on read state
  return {
    notifications: notificationEvents.length,
    recommendations: recommendationEvents.length,
    alerts: alertEvents.length,
    total: notificationEvents.length + recommendationEvents.length + alertEvents.length,
  };
}
