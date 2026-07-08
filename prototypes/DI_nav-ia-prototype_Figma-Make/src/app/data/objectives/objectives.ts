/**
 * Business Objectives Data
 * 
 * Specific, measurable objectives that support strategic goals
 * and link to decision automations.
 */

import type { BusinessObjective } from './types';

export const businessObjectives: BusinessObjective[] = [
  // Hierarchical Top-Level Objectives (Parent Objectives)
  {
    id: 'obj-2025-okrs',
    name: '2025 Company OKRs',
    description: 'Top-level objectives and key results for 2025 company-wide initiatives.',
    
    goalId: 'goal-revenue-growth',
    keyResultIds: [],
    childIds: ['obj-q1-revenue', 'obj-q1-operations'],
    
    automationIds: [],
    serviceIds: [],
    
    status: 'active',
    progress: 65,
    
    priority: 'critical',
    category: 'growth',
    
    owner: 'Executive Team',
    ownerEmail: 'exec@company.com',
    team: 'Executive',
    
    startDate: '2025-01-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2024-12-01T09:00:00.000Z',
    createdBy: 'exec@company.com',
    lastUpdatedDate: '2025-10-15T14:30:00.000Z',
    lastUpdatedBy: 'exec@company.com',
  },
  
  {
    id: 'obj-q1-revenue',
    name: 'Q1 Revenue Goals',
    description: 'First quarter revenue and customer acquisition objectives.',
    
    goalId: 'goal-revenue-growth',
    keyResultIds: [],
    parentId: 'obj-2025-okrs',
    childIds: ['obj-reduce-churn', 'obj-improve-credit-decisions', 'obj-streamline-onboarding'],
    
    automationIds: [],
    serviceIds: [],
    
    status: 'on-track',
    progress: 75,
    
    priority: 'critical',
    category: 'revenue',
    
    owner: 'Sarah Chen',
    ownerEmail: 'sarah.chen@company.com',
    team: 'Revenue Operations',
    
    startDate: '2025-01-01T00:00:00.000Z',
    targetDate: '2025-03-31T23:59:59.000Z',
    
    createdDate: '2024-12-15T09:00:00.000Z',
    createdBy: 'sarah.chen@company.com',
    lastUpdatedDate: '2025-10-15T14:30:00.000Z',
    lastUpdatedBy: 'sarah.chen@company.com',
  },
  
  {
    id: 'obj-q1-operations',
    name: 'Q1 Operational Excellence',
    description: 'First quarter operational efficiency and quality improvements.',
    
    goalId: 'goal-operational-excellence',
    keyResultIds: [],
    parentId: 'obj-2025-okrs',
    childIds: ['obj-automate-fraud-detection', 'obj-reduce-processing-time'],
    
    automationIds: [],
    serviceIds: [],
    
    status: 'on-track',
    progress: 68,
    
    priority: 'high',
    category: 'operational-efficiency',
    
    owner: 'Michael Rodriguez',
    ownerEmail: 'michael.rodriguez@company.com',
    team: 'Operations',
    
    startDate: '2025-01-01T00:00:00.000Z',
    targetDate: '2025-03-31T23:59:59.000Z',
    
    createdDate: '2024-12-15T09:00:00.000Z',
    createdBy: 'michael.rodriguez@company.com',
    lastUpdatedDate: '2025-10-14T09:20:00.000Z',
    lastUpdatedBy: 'michael.rodriguez@company.com',
  },
  
  // Revenue Growth Objectives (now children of Q1 Revenue Goals)
  {
    id: 'obj-reduce-churn',
    name: 'Reduce Customer Churn',
    description: 'Reduce customer churn rate from 15% to 8% through predictive analytics and proactive intervention.',
    
    goalId: 'goal-revenue-growth',
    keyResultIds: ['kr-churn-rate', 'kr-retention-value'],
    parentId: 'obj-q1-revenue',
    
    automationIds: ['churn-prediction-model'],
    serviceIds: ['service-churn-ml', 'service-churn-intervention'],
    
    status: 'on-track',
    progress: 75,
    
    priority: 'critical',
    category: 'revenue',
    
    owner: 'Sarah Chen',
    ownerEmail: 'sarah.chen@company.com',
    team: 'Revenue Operations',
    
    startDate: '2025-01-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2025-01-05T09:00:00.000Z',
    createdBy: 'sarah.chen@company.com',
    lastUpdatedDate: '2025-10-15T14:30:00.000Z',
    lastUpdatedBy: 'sarah.chen@company.com',
    
    tags: [
      { id: 'tag-revenue', label: 'Revenue', color: 'green' },
      { id: 'tag-ml', label: 'Machine Learning', color: 'blue' },
    ],
  },
  
  {
    id: 'obj-improve-credit-decisions',
    name: 'Improve Credit Decision Accuracy',
    description: 'Increase credit decision accuracy to 95% while reducing approval time by 50% using AI-powered risk assessment.',
    
    goalId: 'goal-revenue-growth',
    keyResultIds: ['kr-credit-accuracy', 'kr-approval-time', 'kr-loan-volume'],
    parentId: 'obj-q1-revenue',
    
    automationIds: ['automation-6-24-20', 'loan-approval-automation'],
    serviceIds: ['service-credit-risk', 'service-fraud-detection'],
    
    status: 'on-track',
    progress: 82,
    
    priority: 'critical',
    category: 'risk-management',
    
    owner: 'James Patterson',
    ownerEmail: 'james.patterson@company.com',
    team: 'Risk Management',
    
    startDate: '2025-01-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2025-01-05T09:00:00.000Z',
    createdBy: 'james.patterson@company.com',
    lastUpdatedDate: '2025-10-16T08:15:00.000Z',
    lastUpdatedBy: 'james.patterson@company.com',
    
    tags: [
      { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
      { id: 'tag-banking', label: 'Banking', color: 'blue' },
    ],
    
    notes: 'Linked to AI-generated credit risk automation created by Decision Assistant.',
  },
  
  {
    id: 'obj-streamline-onboarding',
    name: 'Streamline Customer Onboarding',
    description: 'Reduce customer onboarding time from 5 days to 24 hours through automated verification and decision making.',
    
    goalId: 'goal-revenue-growth',
    keyResultIds: ['kr-onboarding-time', 'kr-onboarding-completion'],
    parentId: 'obj-q1-revenue',
    
    automationIds: ['test-8'],
    serviceIds: ['service-onboarding-kyc', 'service-onboarding-verification'],
    
    status: 'on-track',
    progress: 68,
    
    priority: 'high',
    category: 'customer-satisfaction',
    
    owner: 'Lisa Wang',
    ownerEmail: 'lisa.wang@company.com',
    team: 'Customer Success',
    
    startDate: '2025-02-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2025-01-20T10:00:00.000Z',
    createdBy: 'lisa.wang@company.com',
    lastUpdatedDate: '2025-10-10T16:45:00.000Z',
    lastUpdatedBy: 'lisa.wang@company.com',
    
    tags: [
      { id: 'tag-cx', label: 'Customer Experience', color: 'orange' },
      { id: 'tag-automation', label: 'Automation', color: 'blue' },
    ],
  },
  
  // Operational Excellence Objectives (now children of Q1 Operations)
  {
    id: 'obj-automate-fraud-detection',
    name: 'Automate Fraud Detection',
    description: 'Achieve 99% fraud detection accuracy with <100ms response time using real-time ML models.',
    
    goalId: 'goal-operational-excellence',
    keyResultIds: ['kr-fraud-accuracy', 'kr-fraud-response-time', 'kr-false-positives'],
    parentId: 'obj-q1-operations',
    
    automationIds: ['automation-6-24-20'],
    serviceIds: ['service-fraud-detection'],
    
    status: 'on-track',
    progress: 85,
    
    priority: 'critical',
    category: 'risk-management',
    
    owner: 'Michael Rodriguez',
    ownerEmail: 'michael.rodriguez@company.com',
    team: 'Operations',
    
    startDate: '2025-01-01T00:00:00.000Z',
    targetDate: '2025-09-30T23:59:59.000Z',
    
    createdDate: '2025-01-05T09:00:00.000Z',
    createdBy: 'michael.rodriguez@company.com',
    lastUpdatedDate: '2025-10-14T09:20:00.000Z',
    lastUpdatedBy: 'michael.rodriguez@company.com',
    
    tags: [
      { id: 'tag-security', label: 'Security', color: 'red' },
      { id: 'tag-real-time', label: 'Real-time', color: 'blue' },
    ],
  },
  
  {
    id: 'obj-reduce-processing-time',
    name: 'Reduce Transaction Processing Time',
    description: 'Decrease average transaction processing time from 3 minutes to 30 seconds through automation.',
    
    goalId: 'goal-operational-excellence',
    keyResultIds: ['kr-processing-time', 'kr-throughput'],
    parentId: 'obj-q1-operations',
    
    automationIds: ['prod-suite'],
    serviceIds: ['service-payment-processing', 'service-transaction-validation'],
    
    status: 'active',
    progress: 52,
    
    priority: 'high',
    category: 'operational-efficiency',
    
    owner: 'Michael Rodriguez',
    ownerEmail: 'michael.rodriguez@company.com',
    team: 'Operations',
    
    startDate: '2025-03-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2025-02-15T10:00:00.000Z',
    createdBy: 'michael.rodriguez@company.com',
    lastUpdatedDate: '2025-10-14T09:20:00.000Z',
    lastUpdatedBy: 'michael.rodriguez@company.com',
    
    tags: [
      { id: 'tag-performance', label: 'Performance', color: 'green' },
    ],
  },
  
  {
    id: 'obj-improve-decision-accuracy',
    name: 'Improve Decision Accuracy',
    description: 'Increase automated decision accuracy to 98% across all decision models.',
    
    goalId: 'goal-operational-excellence',
    keyResultIds: ['kr-decision-accuracy', 'kr-manual-overrides'],
    
    automationIds: [
      'automation-6-24-20',
      'loan-approval-automation',
      'risk-model-automation',
    ],
    serviceIds: [
      'service-credit-risk',
      'service-loan-decisions',
      'service-risk-scoring',
    ],
    
    status: 'on-track',
    progress: 71,
    
    priority: 'high',
    category: 'quality',
    
    owner: 'James Patterson',
    ownerEmail: 'james.patterson@company.com',
    team: 'Risk Management',
    
    startDate: '2025-01-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2025-01-05T09:00:00.000Z',
    createdBy: 'james.patterson@company.com',
    lastUpdatedDate: '2025-10-16T08:15:00.000Z',
    lastUpdatedBy: 'james.patterson@company.com',
    
    tags: [
      { id: 'tag-quality', label: 'Quality', color: 'blue' },
      { id: 'tag-ai-ml', label: 'AI/ML', color: 'purple' },
    ],
  },
  
  // Customer Experience Objectives
  {
    id: 'obj-reduce-response-time',
    name: 'Reduce Response Time',
    description: 'Achieve <1 hour average response time for customer inquiries using AI-powered support.',
    
    goalId: 'goal-customer-experience',
    keyResultIds: ['kr-response-time', 'kr-first-contact-resolution'],
    
    automationIds: ['customer-segmentation-ai'],
    serviceIds: ['service-customer-support', 'service-ai-chatbot'],
    
    status: 'active',
    progress: 48,
    
    priority: 'high',
    category: 'customer-satisfaction',
    
    owner: 'Lisa Wang',
    ownerEmail: 'lisa.wang@company.com',
    team: 'Customer Success',
    
    startDate: '2025-02-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2025-01-20T10:00:00.000Z',
    createdBy: 'lisa.wang@company.com',
    lastUpdatedDate: '2025-10-10T16:45:00.000Z',
    lastUpdatedBy: 'lisa.wang@company.com',
    
    tags: [
      { id: 'tag-cx', label: 'Customer Experience', color: 'orange' },
      { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
    ],
  },
  
  {
    id: 'obj-personalize-offers',
    name: 'Personalize Customer Offers',
    description: 'Increase offer acceptance rate to 35% through AI-powered personalization and segmentation.',
    
    goalId: 'goal-customer-experience',
    keyResultIds: ['kr-offer-acceptance', 'kr-customer-ltv'],
    
    automationIds: ['customer-segmentation-ai', 'dashboard-analytics-auto'],
    serviceIds: ['service-segmentation', 'service-recommendation'],
    
    status: 'active',
    progress: 42,
    
    priority: 'medium',
    category: 'revenue',
    
    owner: 'Sarah Chen',
    ownerEmail: 'sarah.chen@company.com',
    team: 'Revenue Operations',
    
    startDate: '2025-03-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2025-02-20T10:00:00.000Z',
    createdBy: 'sarah.chen@company.com',
    lastUpdatedDate: '2025-10-15T14:30:00.000Z',
    lastUpdatedBy: 'sarah.chen@company.com',
    
    tags: [
      { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
      { id: 'tag-personalization', label: 'Personalization', color: 'pink' },
    ],
  },
  
  {
    id: 'obj-proactive-support',
    name: 'Enable Proactive Customer Support',
    description: 'Predict and prevent 60% of customer issues before they escalate using predictive analytics.',
    
    goalId: 'goal-customer-experience',
    keyResultIds: ['kr-issue-prevention', 'kr-csat-score'],
    
    automationIds: ['churn-prediction-model'],
    serviceIds: ['service-churn-ml', 'service-customer-insights'],
    
    status: 'active',
    progress: 38,
    
    priority: 'medium',
    category: 'customer-satisfaction',
    
    owner: 'Lisa Wang',
    ownerEmail: 'lisa.wang@company.com',
    team: 'Customer Success',
    
    startDate: '2025-04-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2025-03-15T10:00:00.000Z',
    createdBy: 'lisa.wang@company.com',
    lastUpdatedDate: '2025-10-10T16:45:00.000Z',
    lastUpdatedBy: 'lisa.wang@company.com',
    
    tags: [
      { id: 'tag-predictive', label: 'Predictive', color: 'blue' },
      { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
    ],
  },
  
  // Risk Management Objectives
  {
    id: 'obj-enhance-fraud-detection',
    name: 'Enhance Fraud Detection Capabilities',
    description: 'Reduce fraud losses by 40% through advanced ML-based detection and real-time intervention.',
    
    goalId: 'goal-risk-management',
    keyResultIds: ['kr-fraud-losses', 'kr-fraud-detection-rate'],
    
    automationIds: ['automation-6-24-20'],
    serviceIds: ['service-fraud-detection'],
    
    status: 'on-track',
    progress: 78,
    
    priority: 'critical',
    category: 'risk-management',
    
    owner: 'James Patterson',
    ownerEmail: 'james.patterson@company.com',
    team: 'Risk Management',
    
    startDate: '2025-01-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2025-01-05T09:00:00.000Z',
    createdBy: 'james.patterson@company.com',
    lastUpdatedDate: '2025-10-16T08:15:00.000Z',
    lastUpdatedBy: 'james.patterson@company.com',
    
    tags: [
      { id: 'tag-security', label: 'Security', color: 'red' },
      { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
    ],
  },
  
  {
    id: 'obj-improve-credit-scoring',
    name: 'Improve Credit Scoring Models',
    description: 'Achieve 96% credit score prediction accuracy while reducing bias by 30%.',
    
    goalId: 'goal-risk-management',
    keyResultIds: ['kr-credit-score-accuracy', 'kr-model-bias'],
    
    automationIds: ['automation-6-24-20', 'loan-approval-automation'],
    serviceIds: ['service-credit-risk'],
    
    status: 'on-track',
    progress: 84,
    
    priority: 'critical',
    category: 'quality',
    
    owner: 'James Patterson',
    ownerEmail: 'james.patterson@company.com',
    team: 'Risk Management',
    
    startDate: '2025-01-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2025-01-05T09:00:00.000Z',
    createdBy: 'james.patterson@company.com',
    lastUpdatedDate: '2025-10-16T08:15:00.000Z',
    lastUpdatedBy: 'james.patterson@company.com',
    
    tags: [
      { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
      { id: 'tag-fairness', label: 'Fairness', color: 'green' },
    ],
  },
  
  {
    id: 'obj-ensure-compliance',
    name: 'Ensure Regulatory Compliance',
    description: 'Maintain 100% compliance with financial regulations through automated monitoring and reporting.',
    
    goalId: 'goal-risk-management',
    keyResultIds: ['kr-compliance-rate', 'kr-audit-findings'],
    
    automationIds: ['compliance-check-1'],
    serviceIds: ['service-compliance-monitoring', 'service-regulatory-reporting'],
    
    status: 'on-track',
    progress: 92,
    
    priority: 'critical',
    category: 'compliance',
    
    owner: 'James Patterson',
    ownerEmail: 'james.patterson@company.com',
    team: 'Compliance',
    
    startDate: '2025-01-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2025-01-05T09:00:00.000Z',
    createdBy: 'james.patterson@company.com',
    lastUpdatedDate: '2025-10-16T08:15:00.000Z',
    lastUpdatedBy: 'james.patterson@company.com',
    
    tags: [
      { id: 'tag-compliance', label: 'Compliance', color: 'yellow' },
      { id: 'tag-regulatory', label: 'Regulatory', color: 'red' },
    ],
  },
  
  // Digital Transformation Objectives
  {
    id: 'obj-ai-adoption',
    name: 'Scale AI Adoption',
    description: 'Deploy AI capabilities across 80% of decision-making processes by year-end.',
    
    goalId: 'goal-digital-transformation',
    keyResultIds: ['kr-ai-coverage', 'kr-ai-accuracy'],
    
    automationIds: [
      'automation-6-24-20',
      'loan-approval-automation',
      'dashboard-analytics-auto',
      'customer-segmentation-ai',
      'churn-prediction-model',
    ],
    serviceIds: [
      'service-credit-risk',
      'service-fraud-detection',
      'service-churn-ml',
    ],
    
    status: 'active',
    progress: 62,
    
    priority: 'high',
    category: 'innovation',
    
    owner: 'David Kumar',
    ownerEmail: 'david.kumar@company.com',
    team: 'Technology',
    
    startDate: '2025-01-01T00:00:00.000Z',
    targetDate: '2025-12-31T23:59:59.000Z',
    
    createdDate: '2025-01-05T09:00:00.000Z',
    createdBy: 'david.kumar@company.com',
    lastUpdatedDate: '2025-10-12T11:30:00.000Z',
    lastUpdatedBy: 'david.kumar@company.com',
    
    tags: [
      { id: 'tag-ai-ml', label: 'AI/ML', color: 'purple' },
      { id: 'tag-transformation', label: 'Transformation', color: 'blue' },
    ],
    
    notes: 'Many AI-generated automations created by Decision Assistant are supporting this objective.',
  },
  
  {
    id: 'obj-data-platform',
    name: 'Modernize Data Platform',
    description: 'Build unified data platform enabling real-time analytics and ML model deployment.',
    
    goalId: 'goal-digital-transformation',
    keyResultIds: ['kr-data-integration', 'kr-query-performance'],
    
    automationIds: ['dashboard-analytics-auto'],
    serviceIds: ['service-data-integration', 'service-analytics'],
    
    status: 'active',
    progress: 35,
    
    priority: 'high',
    category: 'transformation',
    
    owner: 'David Kumar',
    ownerEmail: 'david.kumar@company.com',
    team: 'Data Engineering',
    
    startDate: '2025-02-01T00:00:00.000Z',
    targetDate: '2026-06-30T23:59:59.000Z',
    
    createdDate: '2025-01-20T10:00:00.000Z',
    createdBy: 'david.kumar@company.com',
    lastUpdatedDate: '2025-10-12T11:30:00.000Z',
    lastUpdatedBy: 'david.kumar@company.com',
    
    tags: [
      { id: 'tag-data', label: 'Data', color: 'blue' },
      { id: 'tag-infrastructure', label: 'Infrastructure', color: 'gray' },
    ],
  },
  
  {
    id: 'obj-cloud-migration',
    name: 'Complete Cloud Migration',
    description: 'Migrate 100% of on-premise applications to cloud with zero downtime.',
    
    goalId: 'goal-digital-transformation',
    keyResultIds: ['kr-cloud-migration', 'kr-uptime'],
    
    automationIds: [],
    serviceIds: [],
    
    status: 'active',
    progress: 28,
    
    priority: 'medium',
    category: 'transformation',
    
    owner: 'David Kumar',
    ownerEmail: 'david.kumar@company.com',
    team: 'Cloud Operations',
    
    startDate: '2025-03-01T00:00:00.000Z',
    targetDate: '2026-03-31T23:59:59.000Z',
    
    createdDate: '2025-02-15T10:00:00.000Z',
    createdBy: 'david.kumar@company.com',
    lastUpdatedDate: '2025-10-12T11:30:00.000Z',
    lastUpdatedBy: 'david.kumar@company.com',
    
    tags: [
      { id: 'tag-cloud', label: 'Cloud', color: 'cyan' },
      { id: 'tag-infrastructure', label: 'Infrastructure', color: 'gray' },
    ],
  },
];
