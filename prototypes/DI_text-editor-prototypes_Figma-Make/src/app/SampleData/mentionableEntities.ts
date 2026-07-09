/**
 * Sample Mentionable Entities
 * 
 * Mock data for the @mention system across all entity types:
 * - Decision KPIs (flat)
 * - Dashboards (flat)
 * - Documents (hierarchical: Document → Section → Subsection)
 * - Automations (hierarchical: Automation → Service → Model)
 */

import type { MentionableEntity } from '../components/editors/core/types';

// ============================================================================
// KPIs (Flat - No Hierarchy)
// ============================================================================

export const sampleKPIs: MentionableEntity[] = [
  {
    id: 'kpi-1',
    name: 'Revenue Growth Rate',
    type: 'kpi',
    description: 'Year-over-year revenue growth percentage',
    icon: '📊',
    badge: 'KPI',
    url: '/kpis/revenue-growth-rate',
  },
  {
    id: 'kpi-2',
    name: 'Customer Churn Rate',
    type: 'kpi',
    description: 'Percentage of customers lost per month',
    icon: '📊',
    badge: 'KPI',
    url: '/kpis/customer-churn-rate',
  },
  {
    id: 'kpi-3',
    name: 'Net Promoter Score',
    type: 'kpi',
    description: 'Customer satisfaction and loyalty metric',
    icon: '📊',
    badge: 'KPI',
    url: '/kpis/net-promoter-score',
  },
  {
    id: 'kpi-4',
    name: 'Loan Default Rate',
    type: 'kpi',
    description: 'Percentage of loans that default',
    icon: '📊',
    badge: 'KPI',
    url: '/kpis/loan-default-rate',
  },
  {
    id: 'kpi-5',
    name: 'Customer Acquisition Cost',
    type: 'kpi',
    description: 'Average cost to acquire a new customer',
    icon: '📊',
    badge: 'KPI',
    url: '/kpis/customer-acquisition-cost',
  },
];

// ============================================================================
// Dashboards (Flat - No Hierarchy)
// ============================================================================

export const sampleDashboards: MentionableEntity[] = [
  {
    id: 'dash-1',
    name: 'Executive Dashboard',
    type: 'dashboard',
    description: 'High-level business metrics and KPIs',
    icon: '📈',
    badge: 'Dashboard',
    url: '/dashboards/executive',
  },
  {
    id: 'dash-2',
    name: 'Revenue Dashboard',
    type: 'dashboard',
    description: 'Revenue tracking and forecasting',
    icon: '📈',
    badge: 'Dashboard',
    url: '/dashboards/revenue',
  },
  {
    id: 'dash-3',
    name: 'Customer Analytics Dashboard',
    type: 'dashboard',
    description: 'Customer behavior and engagement metrics',
    icon: '📈',
    badge: 'Dashboard',
    url: '/dashboards/customer-analytics',
  },
  {
    id: 'dash-4',
    name: 'Loan Performance Dashboard',
    type: 'dashboard',
    description: 'Loan portfolio health and performance',
    icon: '📈',
    badge: 'Dashboard',
    url: '/dashboards/loan-performance',
  },
];

// ============================================================================
// Documents (Hierarchical: Document → Section → Subsection)
// ============================================================================

export const sampleDocuments: MentionableEntity[] = [
  // Document 1: Product Requirements Document
  {
    id: 'doc-1',
    name: 'Product Requirements Document',
    type: 'document',
    description: 'PRD for Q4 2025 product features',
    icon: '📄',
    badge: 'Document',
    url: '/documents/product-requirements',
    children: [
      {
        id: 'doc-1-sec-1',
        name: '1. Overview',
        type: 'document-section',
        parentId: 'doc-1',
        icon: '📑',
        badge: 'Section',
        url: '/documents/product-requirements#overview',
      },
      {
        id: 'doc-1-sec-2',
        name: '2. User Stories',
        type: 'document-section',
        parentId: 'doc-1',
        icon: '📑',
        badge: 'Section',
        url: '/documents/product-requirements#user-stories',
        children: [
          {
            id: 'doc-1-sec-2-sub-1',
            name: '2.1 Admin User Stories',
            type: 'document-subsection',
            parentId: 'doc-1-sec-2',
            icon: '📋',
            badge: 'Subsection',
            url: '/documents/product-requirements#admin-user-stories',
          },
          {
            id: 'doc-1-sec-2-sub-2',
            name: '2.2 Customer User Stories',
            type: 'document-subsection',
            parentId: 'doc-1-sec-2',
            icon: '📋',
            badge: 'Subsection',
            url: '/documents/product-requirements#customer-user-stories',
          },
          {
            id: 'doc-1-sec-2-sub-3',
            name: '2.3 Analytics User Stories',
            type: 'document-subsection',
            parentId: 'doc-1-sec-2',
            icon: '📋',
            badge: 'Subsection',
            url: '/documents/product-requirements#analytics-user-stories',
          },
        ],
      },
      {
        id: 'doc-1-sec-3',
        name: '3. Technical Specifications',
        type: 'document-section',
        parentId: 'doc-1',
        icon: '📑',
        badge: 'Section',
        url: '/documents/product-requirements#technical-specs',
        children: [
          {
            id: 'doc-1-sec-3-sub-1',
            name: '3.1 Architecture',
            type: 'document-subsection',
            parentId: 'doc-1-sec-3',
            icon: '📋',
            badge: 'Subsection',
            url: '/documents/product-requirements#architecture',
          },
          {
            id: 'doc-1-sec-3-sub-2',
            name: '3.2 API Specifications',
            type: 'document-subsection',
            parentId: 'doc-1-sec-3',
            icon: '📋',
            badge: 'Subsection',
            url: '/documents/product-requirements#api-specs',
          },
        ],
      },
      {
        id: 'doc-1-sec-4',
        name: '4. Success Metrics',
        type: 'document-section',
        parentId: 'doc-1',
        icon: '📑',
        badge: 'Section',
        url: '/documents/product-requirements#success-metrics',
      },
    ],
  },
  
  // Document 2: Loan Policy Document
  {
    id: 'doc-2',
    name: 'Loan Policy Document',
    type: 'document',
    description: 'Lending policies and guidelines',
    icon: '📄',
    badge: 'Document',
    url: '/documents/loan-policy',
    children: [
      {
        id: 'doc-2-sec-1',
        name: '1. Eligibility Criteria',
        type: 'document-section',
        parentId: 'doc-2',
        icon: '📑',
        badge: 'Section',
        url: '/documents/loan-policy#eligibility',
      },
      {
        id: 'doc-2-sec-2',
        name: '2. Risk Assessment',
        type: 'document-section',
        parentId: 'doc-2',
        icon: '📑',
        badge: 'Section',
        url: '/documents/loan-policy#risk-assessment',
        children: [
          {
            id: 'doc-2-sec-2-sub-1',
            name: '2.1 Credit Score Requirements',
            type: 'document-subsection',
            parentId: 'doc-2-sec-2',
            icon: '📋',
            badge: 'Subsection',
            url: '/documents/loan-policy#credit-score',
          },
          {
            id: 'doc-2-sec-2-sub-2',
            name: '2.2 Income Verification',
            type: 'document-subsection',
            parentId: 'doc-2-sec-2',
            icon: '📋',
            badge: 'Subsection',
            url: '/documents/loan-policy#income-verification',
          },
        ],
      },
      {
        id: 'doc-2-sec-3',
        name: '3. Approval Process',
        type: 'document-section',
        parentId: 'doc-2',
        icon: '📑',
        badge: 'Section',
        url: '/documents/loan-policy#approval-process',
      },
    ],
  },
  
  // Document 3: API Documentation
  {
    id: 'doc-3',
    name: 'API Documentation',
    type: 'document',
    description: 'REST API reference and examples',
    icon: '📄',
    badge: 'Document',
    url: '/documents/api-documentation',
    children: [
      {
        id: 'doc-3-sec-1',
        name: '1. Authentication',
        type: 'document-section',
        parentId: 'doc-3',
        icon: '📑',
        badge: 'Section',
        url: '/documents/api-documentation#authentication',
      },
      {
        id: 'doc-3-sec-2',
        name: '2. Endpoints',
        type: 'document-section',
        parentId: 'doc-3',
        icon: '📑',
        badge: 'Section',
        url: '/documents/api-documentation#endpoints',
        children: [
          {
            id: 'doc-3-sec-2-sub-1',
            name: '2.1 User Endpoints',
            type: 'document-subsection',
            parentId: 'doc-3-sec-2',
            icon: '📋',
            badge: 'Subsection',
            url: '/documents/api-documentation#user-endpoints',
          },
          {
            id: 'doc-3-sec-2-sub-2',
            name: '2.2 Loan Endpoints',
            type: 'document-subsection',
            parentId: 'doc-3-sec-2',
            icon: '📋',
            badge: 'Subsection',
            url: '/documents/api-documentation#loan-endpoints',
          },
        ],
      },
    ],
  },
];

// ============================================================================
// Automations (Hierarchical: Automation → Service → Model)
// ============================================================================

export const sampleAutomations: MentionableEntity[] = [
  // Automation 1: Loan Approval Automation
  {
    id: 'auto-1',
    name: 'Loan Approval Automation',
    type: 'automation',
    description: 'Automated loan application processing and approval',
    icon: '⚙️',
    badge: 'Automation',
    url: '/automations/loan-approval',
    children: [
      {
        id: 'auto-1-svc-1',
        name: 'Credit Check Service',
        type: 'service',
        parentId: 'auto-1',
        icon: '🔧',
        badge: 'Service',
        url: '/automations/loan-approval/credit-check',
        children: [
          {
            id: 'auto-1-svc-1-model-1',
            name: 'Credit Score Model',
            type: 'model',
            parentId: 'auto-1-svc-1',
            icon: '🧠',
            badge: 'Model',
            url: '/automations/loan-approval/credit-check/credit-score-model',
          },
          {
            id: 'auto-1-svc-1-model-2',
            name: 'Income Verification Model',
            type: 'model',
            parentId: 'auto-1-svc-1',
            icon: '🧠',
            badge: 'Model',
            url: '/automations/loan-approval/credit-check/income-model',
          },
          {
            id: 'auto-1-svc-1-model-3',
            name: 'Debt Ratio Model',
            type: 'model',
            parentId: 'auto-1-svc-1',
            icon: '🧠',
            badge: 'Model',
            url: '/automations/loan-approval/credit-check/debt-ratio-model',
          },
        ],
      },
      {
        id: 'auto-1-svc-2',
        name: 'Document Verification Service',
        type: 'service',
        parentId: 'auto-1',
        icon: '🔧',
        badge: 'Service',
        url: '/automations/loan-approval/document-verification',
        children: [
          {
            id: 'auto-1-svc-2-model-1',
            name: 'ID Verification Model',
            type: 'model',
            parentId: 'auto-1-svc-2',
            icon: '🧠',
            badge: 'Model',
            url: '/automations/loan-approval/document-verification/id-model',
          },
          {
            id: 'auto-1-svc-2-model-2',
            name: 'Document Classification Model',
            type: 'model',
            parentId: 'auto-1-svc-2',
            icon: '🧠',
            badge: 'Model',
            url: '/automations/loan-approval/document-verification/classification-model',
          },
        ],
      },
      {
        id: 'auto-1-svc-3',
        name: 'Approval Decision Service',
        type: 'service',
        parentId: 'auto-1',
        icon: '🔧',
        badge: 'Service',
        url: '/automations/loan-approval/approval-decision',
        children: [
          {
            id: 'auto-1-svc-3-model-1',
            name: 'Risk Scoring Model',
            type: 'model',
            parentId: 'auto-1-svc-3',
            icon: '🧠',
            badge: 'Model',
            url: '/automations/loan-approval/approval-decision/risk-model',
          },
          {
            id: 'auto-1-svc-3-model-2',
            name: 'Approval Rules Engine',
            type: 'model',
            parentId: 'auto-1-svc-3',
            icon: '🧠',
            badge: 'Model',
            url: '/automations/loan-approval/approval-decision/rules-engine',
          },
        ],
      },
    ],
  },
  
  // Automation 2: Fraud Detection Automation
  {
    id: 'auto-2',
    name: 'Fraud Detection Automation',
    type: 'automation',
    description: 'Real-time fraud detection and prevention',
    icon: '⚙️',
    badge: 'Automation',
    url: '/automations/fraud-detection',
    children: [
      {
        id: 'auto-2-svc-1',
        name: 'Transaction Analysis Service',
        type: 'service',
        parentId: 'auto-2',
        icon: '🔧',
        badge: 'Service',
        url: '/automations/fraud-detection/transaction-analysis',
        children: [
          {
            id: 'auto-2-svc-1-model-1',
            name: 'Anomaly Detection Model',
            type: 'model',
            parentId: 'auto-2-svc-1',
            icon: '🧠',
            badge: 'Model',
            url: '/automations/fraud-detection/transaction-analysis/anomaly-model',
          },
          {
            id: 'auto-2-svc-1-model-2',
            name: 'Pattern Recognition Model',
            type: 'model',
            parentId: 'auto-2-svc-1',
            icon: '🧠',
            badge: 'Model',
            url: '/automations/fraud-detection/transaction-analysis/pattern-model',
          },
        ],
      },
      {
        id: 'auto-2-svc-2',
        name: 'Behavior Analysis Service',
        type: 'service',
        parentId: 'auto-2',
        icon: '🔧',
        badge: 'Service',
        url: '/automations/fraud-detection/behavior-analysis',
        children: [
          {
            id: 'auto-2-svc-2-model-1',
            name: 'User Behavior Model',
            type: 'model',
            parentId: 'auto-2-svc-2',
            icon: '🧠',
            badge: 'Model',
            url: '/automations/fraud-detection/behavior-analysis/user-behavior-model',
          },
        ],
      },
    ],
  },
  
  // Automation 3: Customer Onboarding Automation
  {
    id: 'auto-3',
    name: 'Customer Onboarding Automation',
    type: 'automation',
    description: 'Automated customer registration and KYC',
    icon: '⚙️',
    badge: 'Automation',
    url: '/automations/customer-onboarding',
    children: [
      {
        id: 'auto-3-svc-1',
        name: 'KYC Verification Service',
        type: 'service',
        parentId: 'auto-3',
        icon: '🔧',
        badge: 'Service',
        url: '/automations/customer-onboarding/kyc-verification',
        children: [
          {
            id: 'auto-3-svc-1-model-1',
            name: 'Identity Verification Model',
            type: 'model',
            parentId: 'auto-3-svc-1',
            icon: '🧠',
            badge: 'Model',
            url: '/automations/customer-onboarding/kyc-verification/identity-model',
          },
          {
            id: 'auto-3-svc-1-model-2',
            name: 'Address Verification Model',
            type: 'model',
            parentId: 'auto-3-svc-1',
            icon: '🧠',
            badge: 'Model',
            url: '/automations/customer-onboarding/kyc-verification/address-model',
          },
        ],
      },
      {
        id: 'auto-3-svc-2',
        name: 'Account Setup Service',
        type: 'service',
        parentId: 'auto-3',
        icon: '🔧',
        badge: 'Service',
        url: '/automations/customer-onboarding/account-setup',
      },
    ],
  },
];

// ============================================================================
// Combined Entity List (All Entities)
// ============================================================================

/**
 * All mentionable entities combined
 */
export const allMentionableEntities: MentionableEntity[] = [
  ...sampleKPIs,
  ...sampleDashboards,
  ...sampleDocuments,
  ...sampleAutomations,
];

/**
 * Entity categories for UI grouping
 */
export const entityCategories = [
  {
    id: 'kpis',
    name: 'Decision KPIs',
    icon: '📊',
    types: ['kpi' as const],
  },
  {
    id: 'dashboards',
    name: 'Dashboards',
    icon: '📈',
    types: ['dashboard' as const],
  },
  {
    id: 'documents',
    name: 'Documents',
    icon: '📄',
    types: ['document' as const, 'document-section' as const, 'document-subsection' as const],
  },
  {
    id: 'automations',
    name: 'Automations',
    icon: '⚙️',
    types: ['automation' as const, 'service' as const, 'model' as const],
  },
];
