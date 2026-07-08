/**
 * Activity and Event History - Mock Data
 * 
 * This module contains activity events, deployments, notifications, and
 * other timeline events for decision automations.
 * 
 * Event Types:
 * - Activities: User actions, edits, status changes
 * - Deployments: Production deployments, rollbacks
 * - Notifications: System notifications, updates
 * - Recommendations: AI/system recommendations
 * - Alerts: Warnings, errors, critical issues
 */

import type { TimelineEvent } from '../../components/Timeline/types';

// ============================================================================
// ACTIVITY EVENTS
// ============================================================================

export const activityEvents: TimelineEvent[] = [
  // Recent activity
  {
    id: 'activity-1',
    type: 'change',
    title: 'Updated automation description',
    description: 'Modified description to include new ML-enhanced behavioral scoring capabilities',
    timestamp: '2025-10-16T11:20:00.000Z',
    author: 'domwashburn@us.ibm.com',
    badge: { label: 'Edit', variant: 'default' },
    details: {
      automation: 'Credit Risk Assessment Automation',
      branch: 'feature/enhanced-credit-scoring',
    },
    changes: [
      {
        field: 'description',
        changeType: 'modified',
        oldValue: 'Comprehensive credit risk evaluation with automated verification and fraud detection',
        newValue: 'Enhanced credit risk evaluation with ML-powered behavioral scoring and new risk factors',
      },
    ],
  },
  
  {
    id: 'activity-2',
    type: 'change',
    title: 'Added new decision service',
    description: 'Linked behavioral scoring service to automation',
    timestamp: '2025-10-16T10:45:00.000Z',
    author: 'domwashburn@us.ibm.com',
    badge: { label: 'Service added', variant: 'default' },
    details: {
      automation: 'Credit Risk Assessment Automation',
      serviceName: 'Behavioral Scoring Service',
      serviceId: 'service-behavioral-scoring',
    },
    changes: [
      {
        field: 'serviceIds',
        changeType: 'added',
        newValue: 'service-behavioral-scoring',
      },
    ],
  },
  
  {
    id: 'activity-3',
    type: 'deployment',
    title: 'Deployed to production',
    description: 'Successfully deployed version 1.1.0 to production environment',
    timestamp: '2025-10-15T14:20:00.000Z',
    author: 'domwashburn@us.ibm.com',
    badge: { label: 'v1.1.0', variant: 'deployment' },
    details: {
      version: '1.1.0',
      environment: 'Production',
      deploymentId: 'deploy-12345',
      duration: '2m 34s',
      status: 'Success',
    },
    metadata: {
      servicesDeployed: 2,
      assetsDeployed: 5,
      testsRun: 47,
      testsPassed: 47,
    },
    actions: [
      {
        label: 'View deployment logs',
        onClick: () => console.log('View logs'),
      },
      {
        label: 'Rollback',
        onClick: () => console.log('Rollback'),
      },
    ],
  },
  
  {
    id: 'activity-4',
    type: 'change',
    title: 'Status changed to Ready',
    description: 'Automation marked as ready for production deployment',
    timestamp: '2025-10-15T13:15:00.000Z',
    author: 'domwashburn@us.ibm.com',
    badge: { label: 'Status change', variant: 'default' },
    details: {
      automation: 'Credit Risk Assessment Automation',
    },
    changes: [
      {
        field: 'status',
        changeType: 'modified',
        oldValue: 'draft',
        newValue: 'ready',
      },
    ],
  },
  
  {
    id: 'activity-5',
    type: 'change',
    title: 'Added fraud detection service',
    description: 'Linked fraud detection service to enhance risk assessment',
    timestamp: '2025-06-25T10:20:00.000Z',
    author: 'domwashburn@us.ibm.com',
    badge: { label: 'Service added', variant: 'default' },
    details: {
      automation: 'Credit Risk Assessment Automation',
      serviceName: 'Fraud Detection Service',
      serviceId: 'service-fraud-detection',
    },
    changes: [
      {
        field: 'serviceIds',
        changeType: 'added',
        newValue: 'service-fraud-detection',
      },
    ],
  },
  
  {
    id: 'activity-6',
    type: 'version',
    title: 'Created version 1.0.0',
    description: 'Initial AI-generated version of credit risk assessment automation',
    timestamp: '2025-06-24T15:45:12.000Z',
    author: 'Decision Assistant',
    badge: { label: 'v1.0.0', variant: 'version' },
    details: {
      version: '1.0.0',
      versionType: 'Initial release',
      createdBy: 'AI',
      aiModel: 'gpt-4',
    },
    metadata: {
      filesChanged: 1,
      insertions: 50,
      deletions: 0,
    },
  },
];

// ============================================================================
// DEPLOYMENT EVENTS
// ============================================================================

export const deploymentEvents: TimelineEvent[] = [
  // Latest deployment (Credit Risk Assessment Automation)
  {
    id: 'deploy-1',
    type: 'deployment',
    automationId: 'automation-6-24-20',
    title: 'Deployed v1.1.0 to Production',
    description: 'Successfully deployed with execution tracking enabled',
    timestamp: '2025-10-15T14:20:00.000Z',
    author: 'domwashburn@us.ibm.com',
    badge: { label: 'Production', variant: 'deployment' },
    details: {
      version: '1.1.0',
      environment: 'Production',
      deploymentId: 'deploy-prod-1015-01',
      duration: '2m 34s',
      status: 'Success',
      instances: 3,
    },
    metadata: {
      servicesDeployed: 2,
      assetsDeployed: 5,
      testsRun: 47,
      testsPassed: 47,
      healthCheckStatus: 'Healthy',
    },
    actions: [
      {
        label: 'View deployment logs',
        onClick: () => console.log('View logs'),
      },
      {
        label: 'Monitor performance',
        onClick: () => console.log('Monitor'),
        primary: true,
      },
    ],
  },
  
  // Development deployment of v2.1.0 (Credit Risk Assessment Automation)
  {
    id: 'deploy-2',
    type: 'deployment',
    automationId: 'automation-6-24-20',
    title: 'Deployed v2.1.0 to Development',
    description: 'Enhanced dashboard analytics',
    timestamp: '2025-10-13T17:00:00.000Z',
    author: 'domwashburn@us.ibm.com',
    badge: { label: 'Development', variant: 'default' },
    details: {
      version: '2.1.0',
      environment: 'Development',
      deploymentId: 'deploy-dev-1013-01',
      duration: '1m 15s',
      status: 'Success',
      instances: 1,
    },
    metadata: {
      servicesDeployed: 2,
      assetsDeployed: 4,
      testsRun: 28,
      testsPassed: 28,
    },
  },
  
  // Staging deployment of v2.0.0 (Credit Risk Assessment Automation)
  {
    id: 'deploy-3',
    type: 'deployment',
    automationId: 'automation-6-24-20',
    title: 'Deployed v2.0.0 to Staging',
    description: 'Pre-production validation deployment',
    timestamp: '2025-06-30T11:00:00.000Z',
    author: 'domwashburn@us.ibm.com',
    badge: { label: 'Staging', variant: 'default' },
    details: {
      version: '2.0.0',
      environment: 'Staging',
      deploymentId: 'deploy-staging-0630-01',
      duration: '2m 05s',
      status: 'Success',
      instances: 2,
    },
    metadata: {
      servicesDeployed: 2,
      assetsDeployed: 5,
      testsRun: 45,
      testsPassed: 45,
    },
  },
  
  // Production deployment of v2.1.0 (Customer Onboarding Automation)
  {
    id: 'deploy-4',
    type: 'deployment',
    automationId: 'test-8',
    title: 'Deployed v2.1.0 to Production',
    description: 'Major update with KYC verification service',
    timestamp: '2025-10-09T08:00:00.000Z',
    author: 'domwashburn@us.ibm.com',
    badge: { label: 'Production', variant: 'deployment' },
    details: {
      version: '2.1.0',
      environment: 'Production',
      deploymentId: 'deploy-prod-1009-01',
      duration: '3m 12s',
      status: 'Success',
      instances: 3,
    },
    metadata: {
      servicesDeployed: 2,
      assetsDeployed: 6,
      testsRun: 52,
      testsPassed: 52,
      healthCheckStatus: 'Healthy',
    },
  },
  
  // Staging deployment of v2.1.0 (Customer Onboarding Automation)
  {
    id: 'deploy-5',
    type: 'deployment',
    automationId: 'test-8',
    title: 'Deployed v2.1.0 to Staging',
    description: 'Pre-production validation for KYC update',
    timestamp: '2025-10-10T16:45:00.000Z',
    author: 'domwashburn@us.ibm.com',
    badge: { label: 'Staging', variant: 'warning' },
    details: {
      version: '2.0.0',
      environment: 'Staging',
      deploymentId: 'deploy-stage-0630-01',
      duration: '2m 05s',
      status: 'Success',
      instances: 2,
    },
    metadata: {
      servicesDeployed: 2,
      assetsDeployed: 6,
      testsRun: 52,
      testsPassed: 52,
    },
  },
  
  // Development deployment of v2.2.0 (Customer Onboarding Automation)
  {
    id: 'deploy-6',
    type: 'deployment',
    automationId: 'test-8',
    title: 'Deployed v2.2.0 to Development',
    description: 'Enhanced onboarding flow testing',
    timestamp: '2025-10-14T09:30:00.000Z',
    author: 'domwashburn@us.ibm.com',
    badge: { label: 'Development', variant: 'default' },
    details: {
      version: '2.2.0',
      environment: 'Development',
      deploymentId: 'deploy-dev-1014-01',
      duration: '1m 35s',
      status: 'Success',
      instances: 1,
    },
    metadata: {
      servicesDeployed: 2,
      assetsDeployed: 6,
      testsRun: 38,
      testsPassed: 38,
    },
  },
  
  // Production deployment (Claims Processing Automation)
  {
    id: 'deploy-7',
    type: 'deployment',
    automationId: 'test-7',
    title: 'Deployed v1.5.2 to Production',
    description: 'Claims processing updates',
    timestamp: '2025-10-07T13:30:00.000Z',
    author: 'sarah.chen@ibm.com',
    badge: { label: 'Production', variant: 'deployment' },
    details: {
      version: '1.5.2',
      environment: 'Production',
      deploymentId: 'deploy-prod-1007-01',
      duration: '2m 45s',
      status: 'Success',
      instances: 3,
    },
    metadata: {
      servicesDeployed: 3,
      assetsDeployed: 7,
      testsRun: 58,
      testsPassed: 58,
      healthCheckStatus: 'Healthy',
    },
  },
  
  // Staging deployment (Claims Processing Automation)
  {
    id: 'deploy-8',
    type: 'deployment',
    automationId: 'test-7',
    title: 'Deployed v1.5.3 to Staging',
    description: 'Testing enhanced fraud check',
    timestamp: '2025-10-08T10:20:00.000Z',
    author: 'sarah.chen@ibm.com',
    badge: { label: 'Staging', variant: 'default' },
    details: {
      version: '1.5.3',
      environment: 'Staging',
      deploymentId: 'deploy-staging-1008-01',
      duration: '2m 10s',
      status: 'Success',
      instances: 2,
    },
    metadata: {
      servicesDeployed: 3,
      assetsDeployed: 7,
      testsRun: 55,
      testsPassed: 55,
    },
  },
  
  // Development deployment (Claims Processing Automation)
  {
    id: 'deploy-9',
    type: 'deployment',
    automationId: 'test-7',
    title: 'Deployed v1.5.3 to Development',
    description: 'Initial fraud detection enhancement',
    timestamp: '2025-10-12T14:15:00.000Z',
    author: 'sarah.chen@ibm.com',
    badge: { label: 'Development', variant: 'default' },
    details: {
      version: '1.5.3',
      environment: 'Development',
      deploymentId: 'deploy-dev-1012-01',
      duration: '1m 25s',
      status: 'Success',
      instances: 1,
    },
    metadata: {
      servicesDeployed: 3,
      assetsDeployed: 7,
      testsRun: 42,
      testsPassed: 42,
    },
  },
];

// ============================================================================
// NOTIFICATION EVENTS
// ============================================================================

export const notificationEvents: TimelineEvent[] = [
  {
    id: 'notif-1',
    type: 'notification',
    title: 'Execution threshold reached',
    description: 'Automation has processed over 15,000 requests',
    timestamp: '2025-10-16T08:30:00.000Z',
    badge: { label: 'Milestone', variant: 'default' },
    details: {
      automation: 'Credit Risk Assessment Automation',
      executionCount: 15432,
      threshold: 15000,
    },
    metadata: {
      averageExecutionTime: '245ms',
      successRate: '99.2%',
    },
  },
  
  {
    id: 'notif-2',
    type: 'notification',
    title: 'New team member added',
    description: 'sarah.chen@ibm.com was added as a collaborator',
    timestamp: '2025-10-14T11:00:00.000Z',
    author: 'domwashburn@us.ibm.com',
    badge: { label: 'Team', variant: 'default' },
    details: {
      newMember: 'sarah.chen@ibm.com',
      role: 'Editor',
      addedBy: 'domwashburn@us.ibm.com',
    },
  },
  
  {
    id: 'notif-3',
    type: 'notification',
    title: 'Branch merged',
    description: 'Feature branch hotfix/authentication-fix was merged into main',
    timestamp: '2025-10-15T18:30:00.000Z',
    author: 'security-team@ibm.com',
    badge: { label: 'Merge', variant: 'default' },
    details: {
      sourceBranch: 'hotfix/authentication-fix',
      targetBranch: 'main',
      commitsAdded: 2,
    },
  },
];

// ============================================================================
// RECOMMENDATION EVENTS
// ============================================================================

export const recommendationEvents: TimelineEvent[] = [
  {
    id: 'rec-1',
    type: 'recommendation',
    title: 'Optimize decision model performance',
    description: 'AI analysis suggests optimizing credit scoring decision tree to reduce latency by 30%',
    timestamp: '2025-10-16T06:00:00.000Z',
    badge: { label: 'Performance', variant: 'default' },
    details: {
      category: 'Performance Optimization',
      impact: 'Medium',
      estimatedImprovement: '30% latency reduction',
      confidenceScore: '0.87',
    },
    metadata: {
      currentLatency: '245ms',
      projectedLatency: '171ms',
      affectedAssets: 3,
    },
    actions: [
      {
        label: 'View details',
        onClick: () => console.log('View details'),
      },
      {
        label: 'Apply optimization',
        onClick: () => console.log('Apply'),
        primary: true,
      },
    ],
  },
  
  {
    id: 'rec-2',
    type: 'recommendation',
    title: 'Update ML model version',
    description: 'Newer version of fraud detection model available with improved accuracy',
    timestamp: '2025-10-15T09:00:00.000Z',
    badge: { label: 'Model Update', variant: 'default' },
    details: {
      category: 'Model Update',
      impact: 'High',
      currentVersion: '2.1.0',
      availableVersion: '2.3.0',
      accuracyImprovement: '+3.5%',
    },
    metadata: {
      currentAccuracy: '94.2%',
      newAccuracy: '97.7%',
      compatibilityCheck: 'Passed',
    },
    actions: [
      {
        label: 'Review changes',
        onClick: () => console.log('Review'),
      },
      {
        label: 'Update model',
        onClick: () => console.log('Update'),
        primary: true,
      },
    ],
  },
  
  {
    id: 'rec-3',
    type: 'recommendation',
    title: 'Add test coverage',
    description: 'Some decision paths lack comprehensive test coverage',
    timestamp: '2025-10-14T15:00:00.000Z',
    badge: { label: 'Quality', variant: 'warning' },
    details: {
      category: 'Testing',
      impact: 'Medium',
      currentCoverage: '73%',
      targetCoverage: '90%',
    },
    metadata: {
      untestedPaths: 8,
      criticalPaths: 2,
    },
    actions: [
      {
        label: 'Generate tests',
        onClick: () => console.log('Generate'),
        primary: true,
      },
    ],
  },
];

// ============================================================================
// ALERT EVENTS
// ============================================================================

export const alertEvents: TimelineEvent[] = [
  {
    id: 'alert-1',
    type: 'alert',
    title: 'High error rate detected',
    description: 'Error rate increased to 2.1% in the last hour',
    timestamp: '2025-10-16T14:00:00.000Z',
    badge: { label: 'Critical', variant: 'alert' },
    details: {
      severity: 'High',
      errorRate: '2.1%',
      threshold: '1.0%',
      affectedRequests: 142,
      environment: 'Production',
    },
    metadata: {
      errorType: 'Service timeout',
      mostCommonError: 'Connection timeout to ML service',
      duration: '45 minutes',
    },
    actions: [
      {
        label: 'View error logs',
        onClick: () => console.log('View logs'),
      },
      {
        label: 'Investigate',
        onClick: () => console.log('Investigate'),
        primary: true,
      },
    ],
  },
  
  {
    id: 'alert-2',
    type: 'alert',
    title: 'Decision model requires review',
    description: 'Credit scoring model hasn\'t been reviewed in 90 days',
    timestamp: '2025-10-15T08:00:00.000Z',
    badge: { label: 'Review Required', variant: 'warning' },
    details: {
      severity: 'Medium',
      assetName: 'Credit Scoring Model',
      lastReviewed: '2025-07-17',
      daysSinceReview: 90,
      reviewPolicy: 'Review every 90 days',
    },
    actions: [
      {
        label: 'Schedule review',
        onClick: () => console.log('Schedule'),
        primary: true,
      },
    ],
  },
  
  {
    id: 'alert-3',
    type: 'alert',
    title: 'Compliance check warning',
    description: 'Data retention policy may not meet new regulations',
    timestamp: '2025-10-13T10:00:00.000Z',
    badge: { label: 'Compliance', variant: 'warning' },
    details: {
      severity: 'Medium',
      regulation: 'GDPR Amendment 2025-Q3',
      currentPolicy: '2 years',
      recommendedPolicy: '18 months',
    },
    metadata: {
      affectedAutomations: 3,
      deadline: '2025-12-31',
    },
    actions: [
      {
        label: 'Review policy',
        onClick: () => console.log('Review'),
      },
      {
        label: 'Update settings',
        onClick: () => console.log('Update'),
        primary: true,
      },
    ],
  },
];

// ============================================================================
// SYSTEM UPDATE EVENTS
// ============================================================================

export const systemUpdateEvents: TimelineEvent[] = [
  {
    id: 'system-1',
    type: 'notification',
    title: 'Platform update available',
    description: 'Decision Intelligence Platform v3.2.0 is now available',
    timestamp: '2025-10-16T00:00:00.000Z',
    badge: { label: 'Platform Update', variant: 'default' },
    details: {
      currentVersion: '3.1.5',
      availableVersion: '3.2.0',
      updateType: 'Minor',
      releaseNotes: 'Enhanced AI capabilities and performance improvements',
    },
    metadata: {
      newFeatures: 5,
      bugFixes: 12,
      securityPatches: 3,
    },
    actions: [
      {
        label: 'View release notes',
        onClick: () => console.log('View notes'),
      },
      {
        label: 'Schedule update',
        onClick: () => console.log('Schedule'),
        primary: true,
      },
    ],
  },
  
  {
    id: 'system-2',
    type: 'notification',
    title: 'Security patch applied',
    description: 'Critical security patch v3.1.5-sec was automatically applied',
    timestamp: '2025-10-10T03:00:00.000Z',
    badge: { label: 'Security', variant: 'default' },
    details: {
      patchVersion: '3.1.5-sec',
      severity: 'High',
      description: 'Fixes authentication vulnerability',
      appliedAutomatically: true,
    },
    metadata: {
      downtime: '0 minutes',
      affectedServices: 0,
    },
  },
  
  {
    id: 'system-3',
    type: 'notification',
    title: 'Maintenance window scheduled',
    description: 'System maintenance scheduled for October 20, 2025',
    timestamp: '2025-10-01T12:00:00.000Z',
    badge: { label: 'Scheduled', variant: 'default' },
    details: {
      scheduledDate: '2025-10-20T02:00:00.000Z',
      duration: '2 hours',
      impact: 'Read-only mode',
      reason: 'Database optimization and index rebuilding',
    },
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all events (optionally filtered by automation)
 */
export function getAllEvents(automationId?: string): TimelineEvent[] {
  const allEvents = [
    ...activityEvents,
    ...deploymentEvents,
    ...notificationEvents,
    ...recommendationEvents,
    ...alertEvents,
    ...systemUpdateEvents,
  ];
  
  const filtered = automationId 
    ? allEvents.filter(e => !e.automationId || e.automationId === automationId)
    : allEvents;
    
  return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

/**
 * Get events by type
 */
export function getEventsByType(type: TimelineEvent['type']): TimelineEvent[] {
  return getAllEvents().filter(e => e.type === type);
}

/**
 * Get events by date range
 */
export function getEventsByDateRange(startDate: string, endDate: string): TimelineEvent[] {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  
  return getAllEvents().filter(e => {
    const eventTime = new Date(e.timestamp).getTime();
    return eventTime >= start && eventTime <= end;
  });
}

/**
 * Get recent events (last N days)
 */
export function getRecentEvents(days: number = 7): TimelineEvent[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return getAllEvents().filter(e => 
    new Date(e.timestamp).getTime() >= cutoffDate.getTime()
  );
}

/**
 * Get deployment events for a specific automation
 */
export function getDeploymentEventsForAutomation(automationId: string): TimelineEvent[] {
  return deploymentEvents
    .filter(e => e.automationId === automationId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
