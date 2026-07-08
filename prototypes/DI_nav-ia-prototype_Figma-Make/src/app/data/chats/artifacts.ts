/**
 * Artifacts Data
 * 
 * Canvas-style artifacts - generated content that can be viewed,
 * edited, and published as actual automation assets.
 */

import type { Artifact } from './types';

export const artifacts: Artifact[] = [
  // ============================================================================
  // Credit Risk Creation Artifacts
  // ============================================================================
  
  {
    id: 'artifact-credit-dm',
    title: 'Credit Scoring Decision Model',
    description: 'AI-generated credit scoring model with multi-factor analysis',
    
    conversationId: 'conv-credit-risk-creation',
    messageId: 'msg-cr-002',
    assetId: 'asset-credit-dm-001',
    
    type: 'decision-model',
    content: JSON.stringify({
      modelId: 'credit-scoring-v1',
      name: 'Credit Scoring Model',
      inputs: [
        { name: 'creditScore', type: 'number', required: true },
        { name: 'income', type: 'number', required: true },
        { name: 'dti', type: 'number', required: true },
        { name: 'employmentYears', type: 'number', required: true },
      ],
      rules: [
        {
          condition: 'creditScore >= 720 && dti < 35',
          action: 'approve',
          confidence: 0.95,
        },
        {
          condition: 'creditScore >= 650 && creditScore < 720 && dti < 45',
          action: 'review',
          confidence: 0.75,
        },
        {
          condition: 'creditScore < 650 || dti > 45',
          action: 'reject',
          confidence: 0.90,
        },
      ],
      output: { type: 'decision', values: ['approve', 'review', 'reject'] },
    }, null, 2),
    contentType: 'application/json',
    
    status: 'published',
    version: '1.0.0',
    versionHistory: [
      {
        id: 'ver-credit-dm-1',
        version: '1.0.0',
        content: '...',
        changeDescription: 'Initial version',
        createdDate: '2025-06-24T14:32:15.000Z',
        createdBy: 'Decision Assistant',
        aiGenerated: true,
      },
    ],
    
    aiGenerated: true,
    aiModel: 'gpt-4',
    aiVersion: '2024-05-13',
    prompt: 'Create a credit scoring decision model with thresholds',
    confidence: 0.94,
    
    viewCount: 142,
    editCount: 3,
    lastViewedDate: '2025-10-15T14:15:00.000Z',
    lastEditedDate: '2025-06-25T10:00:00.000Z',
    
    createdDate: '2025-06-24T14:32:15.000Z',
    createdBy: 'Decision Assistant',
    lastUpdatedDate: '2025-06-25T10:00:00.000Z',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
    
    canvasConfig: {
      layout: 'split',
      theme: 'light',
      fontSize: 14,
      lineNumbers: true,
      wordWrap: true,
      readOnly: false,
    },
    
    tags: [
      { id: 'tag-credit', label: 'Credit', color: 'blue' },
      { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
    ],
    
    isPublic: false,
  },
  
  {
    id: 'artifact-fraud-ml',
    title: 'Fraud Detection ML Model',
    description: 'Machine learning model for real-time fraud detection',
    
    conversationId: 'conv-credit-risk-creation',
    messageId: 'msg-cr-004',
    assetId: 'asset-fraud-ml-002',
    
    type: 'ml-model',
    content: JSON.stringify({
      modelType: 'gradient_boosting',
      framework: 'sklearn',
      features: [
        'transaction_amount',
        'location_distance',
        'time_of_day',
        'device_fingerprint',
        'merchant_category',
        'transaction_velocity',
      ],
      target: 'is_fraudulent',
      hyperparameters: {
        n_estimators: 100,
        max_depth: 5,
        learning_rate: 0.1,
      },
      performance: {
        accuracy: 0.987,
        precision: 0.945,
        recall: 0.992,
        f1_score: 0.968,
      },
      threshold: 0.75,
    }, null, 2),
    contentType: 'application/json',
    
    status: 'published',
    version: '1.0.0',
    versionHistory: [
      {
        id: 'ver-fraud-ml-1',
        version: '1.0.0',
        content: '...',
        changeDescription: 'Initial ML model',
        createdDate: '2025-06-24T14:37:00.000Z',
        createdBy: 'Decision Assistant',
        aiGenerated: true,
      },
    ],
    
    aiGenerated: true,
    aiModel: 'gpt-4',
    aiVersion: '2024-05-13',
    prompt: 'Create a fraud detection ML model configuration',
    confidence: 0.91,
    
    viewCount: 98,
    editCount: 5,
    lastViewedDate: '2025-10-14T10:15:00.000Z',
    lastEditedDate: '2025-07-10T14:00:00.000Z',
    
    createdDate: '2025-06-24T14:37:00.000Z',
    createdBy: 'Decision Assistant',
    lastUpdatedDate: '2025-07-10T14:00:00.000Z',
    lastUpdatedBy: 'james.patterson@company.com',
    
    canvasConfig: {
      layout: 'split',
      theme: 'dark',
      fontSize: 13,
      lineNumbers: true,
      wordWrap: false,
      readOnly: false,
    },
    
    tags: [
      { id: 'tag-fraud', label: 'Fraud Detection', color: 'red' },
      { id: 'tag-ml', label: 'Machine Learning', color: 'blue' },
      { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
    ],
    
    isPublic: false,
  },
  
  {
    id: 'artifact-credit-rules',
    title: 'Credit Approval Business Rules',
    description: 'Business rules for final credit approval decisions',
    
    conversationId: 'conv-credit-risk-creation',
    messageId: 'msg-cr-006',
    
    type: 'rule-model',
    content: `# Credit Approval Rules

## Auto-Approve Criteria
- Credit score ≥ 720
- DTI ratio < 35%
- No fraud flags (fraud_score < 0.3)
- Income verification: PASSED
- Employment: Stable (> 2 years)

## Manual Review Criteria
- Credit score: 650-719
- DTI ratio: 35-45%
- Minor fraud flags (fraud_score 0.3-0.6)
- Income verification: PENDING
- Employment: Recent change (< 2 years)

## Auto-Reject Criteria
- Credit score < 650
- DTI ratio > 45%
- High fraud risk (fraud_score > 0.6)
- Income verification: FAILED
- Bankruptcy in last 7 years

## Decision Logic
\`\`\`
IF credit_approved AND fraud_score < 0.3 THEN
  RETURN "APPROVED"
ELSE IF credit_review AND fraud_score < 0.6 THEN
  RETURN "MANUAL_REVIEW"
ELSE
  RETURN "REJECTED"
END IF
\`\`\`
`,
    contentType: 'text/markdown',
    
    status: 'published',
    version: '1.0.0',
    versionHistory: [
      {
        id: 'ver-credit-rules-1',
        version: '1.0.0',
        content: '...',
        changeDescription: 'Initial business rules',
        createdDate: '2025-06-24T15:45:12.000Z',
        createdBy: 'Decision Assistant',
        aiGenerated: true,
      },
    ],
    
    aiGenerated: true,
    aiModel: 'gpt-4',
    aiVersion: '2024-05-13',
    prompt: 'Create comprehensive business rules for credit approval',
    confidence: 0.96,
    
    viewCount: 234,
    editCount: 8,
    lastViewedDate: '2025-10-15T14:15:00.000Z',
    lastEditedDate: '2025-08-15T09:00:00.000Z',
    
    createdDate: '2025-06-24T15:45:12.000Z',
    createdBy: 'Decision Assistant',
    lastUpdatedDate: '2025-08-15T09:00:00.000Z',
    lastUpdatedBy: 'james.patterson@company.com',
    
    canvasConfig: {
      layout: 'preview',
      theme: 'light',
      fontSize: 14,
      lineNumbers: false,
      wordWrap: true,
      readOnly: false,
    },
    
    tags: [
      { id: 'tag-rules', label: 'Business Rules', color: 'green' },
      { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
    ],
    
    isPublic: true,
  },
  
  // ============================================================================
  // Churn Prediction Artifacts
  // ============================================================================
  
  {
    id: 'artifact-churn-ml',
    title: 'Customer Churn Prediction Model',
    description: 'ML model for predicting customer churn probability',
    
    conversationId: 'conv-churn-prediction',
    messageId: 'msg-churn-002',
    
    type: 'ml-model',
    content: JSON.stringify({
      modelType: 'gradient_boosting_classifier',
      framework: 'xgboost',
      features: [
        'customer_tenure_months',
        'monthly_charges',
        'total_charges',
        'contract_type',
        'payment_method',
        'support_tickets_count',
        'product_usage_score',
        'engagement_score',
        'last_interaction_days',
      ],
      target: 'churn_probability',
      hyperparameters: {
        n_estimators: 200,
        max_depth: 6,
        learning_rate: 0.05,
        subsample: 0.8,
      },
      performance: {
        accuracy: 0.894,
        precision: 0.876,
        recall: 0.908,
        f1_score: 0.892,
        auc_roc: 0.945,
      },
      churn_thresholds: {
        high_risk: 0.75,
        medium_risk: 0.40,
        low_risk: 0.0,
      },
    }, null, 2),
    contentType: 'application/json',
    
    status: 'published',
    version: '1.0.0',
    versionHistory: [
      {
        id: 'ver-churn-ml-1',
        version: '1.0.0',
        content: '...',
        changeDescription: 'Initial churn prediction model',
        createdDate: '2025-08-10T09:15:00.000Z',
        createdBy: 'Decision Assistant',
        aiGenerated: true,
      },
    ],
    
    aiGenerated: true,
    aiModel: 'gpt-4',
    aiVersion: '2024-05-13',
    prompt: 'Create churn prediction ML model using customer engagement data',
    confidence: 0.89,
    
    viewCount: 67,
    editCount: 2,
    lastViewedDate: '2025-10-10T12:00:00.000Z',
    lastEditedDate: '2025-09-01T15:00:00.000Z',
    
    createdDate: '2025-08-10T09:15:00.000Z',
    createdBy: 'Decision Assistant',
    lastUpdatedDate: '2025-09-01T15:00:00.000Z',
    lastUpdatedBy: 'sarah.chen@company.com',
    
    canvasConfig: {
      layout: 'split',
      theme: 'dark',
      fontSize: 13,
      lineNumbers: true,
      wordWrap: false,
      readOnly: false,
    },
    
    tags: [
      { id: 'tag-churn', label: 'Churn Prediction', color: 'orange' },
      { id: 'tag-ml', label: 'Machine Learning', color: 'blue' },
      { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
    ],
    
    isPublic: false,
  },
  
  {
    id: 'artifact-churn-rules',
    title: 'Churn Intervention Rules',
    description: 'Action rules based on churn risk level',
    
    conversationId: 'conv-churn-prediction',
    messageId: 'msg-churn-004',
    
    type: 'rule-model',
    content: `# Customer Churn Intervention Rules

## High Risk (Churn Probability > 75%)

**Immediate Actions:**
- Assign dedicated account manager
- Schedule personalized call within 24 hours
- Offer premium retention package
- Escalate to priority support queue

**Retention Offers:**
- 30% discount for 6 months
- Upgrade to premium tier at current price
- Free professional services consultation
- Extended contract with price lock

## Medium Risk (Churn Probability 40-75%)

**Automated Actions:**
- Triggered email campaign (3-part series)
- Product usage tips and best practices
- Customer satisfaction survey
- Feature announcement emails

**Offers:**
- 15% discount for 3 months
- Free add-on features
- Training session invitation

## Low Risk (Churn Probability < 40%)

**Standard Engagement:**
- Monthly newsletter
- Product update announcements
- Community event invitations
- Success story sharing

## Monitoring Rules

\`\`\`
IF churn_score > 0.85 AND customer_value > $10000 THEN
  ALERT: "Executive Intervention Required"
  ASSIGN: C-Suite Account Manager
END IF

IF churn_score increased by > 20% in 30 days THEN
  TRIGGER: Urgent Review
  NOTIFY: Account Team
END IF
\`\`\`
`,
    contentType: 'text/markdown',
    
    status: 'published',
    version: '1.0.0',
    versionHistory: [
      {
        id: 'ver-churn-rules-1',
        version: '1.0.0',
        content: '...',
        changeDescription: 'Initial intervention rules',
        createdDate: '2025-08-10T11:30:00.000Z',
        createdBy: 'Decision Assistant',
        aiGenerated: true,
      },
    ],
    
    aiGenerated: true,
    aiModel: 'gpt-4',
    aiVersion: '2024-05-13',
    prompt: 'Create intervention rules for different churn risk levels',
    confidence: 0.92,
    
    viewCount: 89,
    editCount: 4,
    lastViewedDate: '2025-10-12T09:00:00.000Z',
    lastEditedDate: '2025-09-15T11:00:00.000Z',
    
    createdDate: '2025-08-10T11:30:00.000Z',
    createdBy: 'Decision Assistant',
    lastUpdatedDate: '2025-09-15T11:00:00.000Z',
    lastUpdatedBy: 'sarah.chen@company.com',
    
    canvasConfig: {
      layout: 'preview',
      theme: 'light',
      fontSize: 14,
      lineNumbers: false,
      wordWrap: true,
      readOnly: false,
    },
    
    tags: [
      { id: 'tag-churn', label: 'Churn Prediction', color: 'orange' },
      { id: 'tag-rules', label: 'Business Rules', color: 'green' },
      { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
    ],
    
    isPublic: false,
  },
  
  // ============================================================================
  // Fraud Improvement Artifacts
  // ============================================================================
  
  {
    id: 'artifact-fraud-improvements',
    title: 'Fraud Detection Model Improvements',
    description: 'Recommendations for improving fraud detection accuracy',
    
    conversationId: 'conv-improve-fraud-detection',
    messageId: 'msg-fraud-004',
    
    type: 'document',
    content: `# Fraud Detection Model Improvements

## Executive Summary

Current fraud detection model has 8.2% false positive rate. Proposed improvements will reduce this to ~3% while maintaining 99%+ true positive rate.

## Current Performance

- **True Positive Rate**: 99.1%
- **False Positive Rate**: 8.2% ⚠️
- **Precision**: 54.3%
- **F1 Score**: 0.703

## Proposed Improvements

### 1. Enhanced Feature Engineering

**Add Customer Behavioral Features:**
- Historical transaction patterns
- Average transaction amount by merchant category
- Transaction velocity (transactions per time window)
- Geographic consistency score
- Time-of-day patterns

**Impact**: Estimated 30% reduction in false positives

### 2. Ensemble Model Approach

Replace single model with ensemble:
- Random Forest (70% weight)
- XGBoost (30% weight)

**Impact**: Improved generalization, 15% reduction in false positives

### 3. Threshold Optimization

**Current Threshold**: 0.70 (too sensitive)
**Recommended**: 0.82

Precision-Recall Analysis:
- At 0.70: Precision 54.3%, Recall 99.1%
- At 0.82: Precision 78.5%, Recall 98.7% ✅

### 4. New Risk Scoring Features

\`\`\`python
# Proposed features
customer_avg_transaction = historical_avg(customer_id)
merchant_risk_score = merchant_fraud_rate(merchant_id)
velocity_score = transactions_last_hour(customer_id)
geographic_distance = distance_from_home(transaction_location)
device_consistency = device_fingerprint_match(device_id)
\`\`\`

## Implementation Plan

1. **Week 1-2**: Feature engineering
2. **Week 3**: Model training and validation
3. **Week 4**: A/B testing
4. **Week 5**: Full deployment

## Expected Results

- False Positive Rate: 8.2% → 3.1%
- Precision: 54.3% → 81.2%
- True Positive Rate: 99.1% → 98.9%
- F1 Score: 0.703 → 0.894

## Cost-Benefit Analysis

**Annual Savings:**
- Reduced manual reviews: $450K
- Customer satisfaction improvement: $120K
- **Total**: $570K/year

**Implementation Cost**: $85K one-time

**ROI**: 570% in year 1
`,
    contentType: 'text/markdown',
    
    status: 'reviewed',
    version: '1.0.0',
    versionHistory: [
      {
        id: 'ver-fraud-imp-1',
        version: '1.0.0',
        content: '...',
        changeDescription: 'Initial recommendations document',
        createdDate: '2025-10-14T10:35:00.000Z',
        createdBy: 'Decision Assistant',
        aiGenerated: true,
      },
    ],
    
    aiGenerated: true,
    aiModel: 'gpt-4',
    aiVersion: '2024-05-13',
    prompt: 'Analyze fraud detection model and provide improvement recommendations',
    confidence: 0.95,
    
    viewCount: 45,
    editCount: 1,
    lastViewedDate: '2025-10-15T08:00:00.000Z',
    
    createdDate: '2025-10-14T10:35:00.000Z',
    createdBy: 'Decision Assistant',
    lastUpdatedDate: '2025-10-14T10:35:00.000Z',
    lastUpdatedBy: 'Decision Assistant',
    
    canvasConfig: {
      layout: 'preview',
      theme: 'light',
      fontSize: 15,
      lineNumbers: false,
      wordWrap: true,
      readOnly: true,
    },
    
    tags: [
      { id: 'tag-fraud', label: 'Fraud Detection', color: 'red' },
      { id: 'tag-improvement', label: 'Improvement', color: 'orange' },
      { id: 'tag-analysis', label: 'Analysis', color: 'blue' },
    ],
    
    notes: 'Approved by Risk Management team for implementation',
    isPublic: false,
  },
  
  // ============================================================================
  // Dashboard Analytics Artifacts
  // ============================================================================
  
  {
    id: 'artifact-dashboard-config',
    title: 'Analytics Dashboard Configuration',
    description: 'Real-time dashboard configuration for key metrics',
    
    conversationId: 'conv-dashboard-analytics',
    messageId: 'msg-dash-002',
    
    type: 'dashboard',
    content: JSON.stringify({
      dashboardId: 'analytics-dashboard-v1',
      name: 'Executive Analytics Dashboard',
      refreshInterval: 300,
      widgets: [
        {
          id: 'widget-revenue',
          type: 'metric',
          title: 'Monthly Recurring Revenue',
          dataSource: 'revenue_api',
          visualization: 'line_chart',
          timeRange: '30d',
        },
        {
          id: 'widget-churn',
          type: 'metric',
          title: 'Customer Churn Rate',
          dataSource: 'churn_predictions',
          visualization: 'gauge',
          thresholds: { warning: 0.10, critical: 0.15 },
        },
        {
          id: 'widget-fraud',
          type: 'metric',
          title: 'Fraud Detection Rate',
          dataSource: 'fraud_api',
          visualization: 'bar_chart',
          timeRange: '7d',
        },
        {
          id: 'widget-approvals',
          type: 'metric',
          title: 'Loan Approval Rate',
          dataSource: 'credit_decisions',
          visualization: 'donut_chart',
        },
      ],
      layout: 'grid',
      theme: 'executive',
    }, null, 2),
    contentType: 'application/json',
    
    status: 'published',
    version: '1.0.0',
    versionHistory: [
      {
        id: 'ver-dash-1',
        version: '1.0.0',
        content: '...',
        changeDescription: 'Initial dashboard configuration',
        createdDate: '2025-09-05T14:20:00.000Z',
        createdBy: 'Decision Assistant',
        aiGenerated: true,
      },
    ],
    
    aiGenerated: true,
    aiModel: 'gpt-4',
    aiVersion: '2024-05-13',
    prompt: 'Create analytics dashboard with key business metrics',
    confidence: 0.88,
    
    viewCount: 156,
    editCount: 6,
    lastViewedDate: '2025-10-16T07:00:00.000Z',
    lastEditedDate: '2025-09-20T10:00:00.000Z',
    
    createdDate: '2025-09-05T14:20:00.000Z',
    createdBy: 'Decision Assistant',
    lastUpdatedDate: '2025-09-20T10:00:00.000Z',
    lastUpdatedBy: 'lisa.wang@company.com',
    
    canvasConfig: {
      layout: 'split',
      theme: 'dark',
      fontSize: 13,
      lineNumbers: true,
      wordWrap: false,
      readOnly: false,
    },
    
    tags: [
      { id: 'tag-dashboard', label: 'Dashboard', color: 'cyan' },
      { id: 'tag-analytics', label: 'Analytics', color: 'blue' },
      { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
    ],
    
    isPublic: true,
  },
];
