/**
 * Strategic Goals Data
 * 
 * Top-level organizational goals that drive business objectives.
 */

import type { StrategicGoal } from './types';

export const strategicGoals: StrategicGoal[] = [
  {
    id: 'goal-revenue-growth',
    name: 'Accelerate Revenue Growth',
    description: 'Increase annual recurring revenue by 40% through improved customer acquisition, retention, and upsell strategies.',
    
    objectiveIds: [
      'obj-reduce-churn',
      'obj-improve-credit-decisions',
      'obj-streamline-onboarding',
    ],
    
    status: 'on-track',
    progress: 67,
    
    priority: 'critical',
    impactArea: 'Revenue Growth',
    
    owner: 'Sarah Chen',
    ownerEmail: 'sarah.chen@company.com',
    team: 'Revenue Operations',
    
    startDate: '2025-01-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2024-12-15T10:00:00.000Z',
    createdBy: 'sarah.chen@company.com',
    lastUpdatedDate: '2025-10-15T14:30:00.000Z',
    lastUpdatedBy: 'sarah.chen@company.com',
    
    tags: [
      { id: 'tag-q4-priority', label: 'Q4 Priority', color: 'red' },
      { id: 'tag-board-okr', label: 'Board OKR', color: 'purple' },
    ],
  },
  
  {
    id: 'goal-operational-excellence',
    name: 'Achieve Operational Excellence',
    description: 'Optimize operations through automation, AI, and process improvements to reduce costs by 25% while improving quality.',
    
    objectiveIds: [
      'obj-automate-fraud-detection',
      'obj-reduce-processing-time',
      'obj-improve-decision-accuracy',
    ],
    
    status: 'on-track',
    progress: 58,
    
    priority: 'critical',
    impactArea: 'Operational Efficiency',
    
    owner: 'Michael Rodriguez',
    ownerEmail: 'michael.rodriguez@company.com',
    team: 'Operations',
    
    startDate: '2025-01-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2024-12-15T10:00:00.000Z',
    createdBy: 'michael.rodriguez@company.com',
    lastUpdatedDate: '2025-10-14T09:20:00.000Z',
    lastUpdatedBy: 'michael.rodriguez@company.com',
    
    tags: [
      { id: 'tag-cost-savings', label: 'Cost Savings', color: 'green' },
      { id: 'tag-automation', label: 'Automation', color: 'blue' },
    ],
  },
  
  {
    id: 'goal-customer-experience',
    name: 'Deliver Exceptional Customer Experience',
    description: 'Increase customer satisfaction scores to 90+ through faster service, personalization, and proactive support.',
    
    objectiveIds: [
      'obj-reduce-response-time',
      'obj-personalize-offers',
      'obj-proactive-support',
    ],
    
    status: 'active',
    progress: 45,
    
    priority: 'high',
    impactArea: 'Customer Satisfaction',
    
    owner: 'Lisa Wang',
    ownerEmail: 'lisa.wang@company.com',
    team: 'Customer Success',
    
    startDate: '2025-01-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2024-12-15T10:00:00.000Z',
    createdBy: 'lisa.wang@company.com',
    lastUpdatedDate: '2025-10-10T16:45:00.000Z',
    lastUpdatedBy: 'lisa.wang@company.com',
    
    tags: [
      { id: 'tag-customer-first', label: 'Customer First', color: 'orange' },
    ],
  },
  
  {
    id: 'goal-risk-management',
    name: 'Strengthen Risk Management',
    description: 'Reduce financial risk exposure by 30% through improved fraud detection, credit assessment, and compliance.',
    
    objectiveIds: [
      'obj-enhance-fraud-detection',
      'obj-improve-credit-scoring',
      'obj-ensure-compliance',
    ],
    
    status: 'on-track',
    progress: 72,
    
    priority: 'critical',
    impactArea: 'Risk Mitigation',
    
    owner: 'James Patterson',
    ownerEmail: 'james.patterson@company.com',
    team: 'Risk Management',
    
    startDate: '2025-01-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2024-12-15T10:00:00.000Z',
    createdBy: 'james.patterson@company.com',
    lastUpdatedDate: '2025-10-16T08:15:00.000Z',
    lastUpdatedBy: 'james.patterson@company.com',
    
    tags: [
      { id: 'tag-compliance', label: 'Compliance', color: 'yellow' },
      { id: 'tag-security', label: 'Security', color: 'red' },
    ],
  },
  
  {
    id: 'goal-digital-transformation',
    name: 'Drive Digital Transformation',
    description: 'Modernize technology stack and adopt AI/ML capabilities to enable data-driven decision making across the organization.',
    
    objectiveIds: [
      'obj-ai-adoption',
      'obj-data-platform',
      'obj-cloud-migration',
    ],
    
    status: 'active',
    progress: 38,
    
    priority: 'high',
    impactArea: 'Digital Transformation',
    
    owner: 'David Kumar',
    ownerEmail: 'david.kumar@company.com',
    team: 'Technology',
    
    startDate: '2025-01-01T00:00:00.000Z',
    targetDate: '2026-06-30T23:59:59.000Z',
    
    createdDate: '2024-12-15T10:00:00.000Z',
    createdBy: 'david.kumar@company.com',
    lastUpdatedDate: '2025-10-12T11:30:00.000Z',
    lastUpdatedBy: 'david.kumar@company.com',
    
    tags: [
      { id: 'tag-innovation', label: 'Innovation', color: 'purple' },
      { id: 'tag-ai-ml', label: 'AI/ML', color: 'blue' },
    ],
  },
];
