/**
 * Messages Data
 * 
 * Individual messages in conversations, including messages that
 * created or referenced decision automation assets.
 */

import type { Message, AssetReference } from './types';

export const messages: Message[] = [
  // ============================================================================
  // Credit Risk Creation Conversation
  // ============================================================================
  
  {
    id: 'msg-cr-001',
    conversationId: 'conv-credit-risk-creation',
    
    role: 'user',
    content: 'I need to create a comprehensive credit risk assessment automation for loan applications. It should evaluate multiple factors like credit score, income, debt-to-income ratio, and also detect potential fraud. Can you help me build this?',
    contentType: 'text',
    
    status: 'complete',
    timestamp: '2025-06-24T14:30:00.000Z',
  },
  
  {
    id: 'msg-cr-002',
    conversationId: 'conv-credit-risk-creation',
    
    role: 'assistant',
    content: `I'll help you create a comprehensive credit risk assessment automation. Let me break this down into components:

1. **Credit Scoring Model** - Evaluates applicant creditworthiness
2. **Fraud Detection Model** - Identifies suspicious patterns
3. **Business Rules** - Defines approval/rejection criteria

I'll create these as decision models with proper integration. Let me start with the credit scoring model.`,
    contentType: 'markdown',
    
    artifactIds: ['artifact-credit-dm'],
    
    status: 'complete',
    timestamp: '2025-06-24T14:32:15.000Z',
    
    aiModel: 'gpt-4',
    aiVersion: '2024-05-13',
    promptTokens: 142,
    completionTokens: 98,
    totalTokens: 240,
    finishReason: 'stop',
  },
  
  {
    id: 'msg-cr-003',
    conversationId: 'conv-credit-risk-creation',
    
    role: 'user',
    content: 'Perfect! Can you also add fraud detection capabilities? I want to flag suspicious applications in real-time.',
    contentType: 'text',
    
    status: 'complete',
    timestamp: '2025-06-24T14:35:00.000Z',
  },
  
  {
    id: 'msg-cr-004',
    conversationId: 'conv-credit-risk-creation',
    
    role: 'assistant',
    content: `Absolutely! I've created a fraud detection ML model that analyzes:

- Application patterns
- Device fingerprinting
- Historical fraud indicators
- Behavioral anomalies

The model runs in parallel with credit scoring and can flag applications for manual review.`,
    contentType: 'markdown',
    
    artifactIds: ['artifact-fraud-ml'],
    assetReferences: [
      {
        id: 'ref-fraud-ml-001',
        messageId: 'msg-cr-004',
        assetId: 'asset-fraud-ml-002',
        assetType: 'asset',
        assetName: 'Fraud Detection ML Model',
        referenceType: 'created',
        context: 'Created fraud detection ML model as part of credit risk automation',
        createdDate: '2025-06-24T14:37:00.000Z',
      },
    ],
    
    status: 'complete',
    timestamp: '2025-06-24T14:37:00.000Z',
    
    aiModel: 'gpt-4',
    aiVersion: '2024-05-13',
    promptTokens: 85,
    completionTokens: 124,
    totalTokens: 209,
    finishReason: 'stop',
    
    rating: {
      value: 5,
      feedback: 'Excellent! Exactly what I needed.',
      timestamp: '2025-06-24T14:38:00.000Z',
    },
  },
  
  {
    id: 'msg-cr-005',
    conversationId: 'conv-credit-risk-creation',
    
    role: 'user',
    content: 'Great! Now I need business rules for final approval decisions. What thresholds should we use?',
    contentType: 'text',
    
    status: 'complete',
    timestamp: '2025-06-24T14:40:00.000Z',
  },
  
  {
    id: 'msg-cr-006',
    conversationId: 'conv-credit-risk-creation',
    
    role: 'assistant',
    content: `I've created a comprehensive rule model with these decision criteria:

**Auto-Approve:**
- Credit score ≥ 720
- DTI ratio < 35%
- No fraud flags
- Income verification passed

**Manual Review:**
- Credit score 650-719
- DTI ratio 35-45%
- Minor fraud flags

**Auto-Reject:**
- Credit score < 650
- DTI ratio > 45%
- High fraud risk

The complete automation is now ready to deploy!`,
    contentType: 'markdown',
    
    artifactIds: ['artifact-credit-rules'],
    assetReferences: [
      {
        id: 'ref-auto-001',
        messageId: 'msg-cr-006',
        assetId: 'automation-6-24-20',
        assetType: 'automation',
        assetName: 'Credit Risk Assessment Automation',
        referenceType: 'created',
        context: 'Completed creation of full automation with all components',
        createdDate: '2025-06-24T15:45:12.000Z',
      },
      {
        id: 'ref-credit-dm-001',
        messageId: 'msg-cr-006',
        assetId: 'asset-credit-dm-001',
        assetType: 'asset',
        assetName: 'Credit Scoring Model',
        referenceType: 'created',
        context: 'Created as primary decision model for automation',
        createdDate: '2025-06-24T15:45:12.000Z',
      },
    ],
    
    status: 'complete',
    timestamp: '2025-06-24T15:45:12.000Z',
    
    aiModel: 'gpt-4',
    aiVersion: '2024-05-13',
    promptTokens: 98,
    completionTokens: 186,
    totalTokens: 284,
    finishReason: 'stop',
    
    isFavorite: true,
  },
  
  // ============================================================================
  // Churn Prediction Conversation
  // ============================================================================
  
  {
    id: 'msg-churn-001',
    conversationId: 'conv-churn-prediction',
    
    role: 'user',
    content: 'I want to predict customer churn before it happens. We have historical data on customers who churned. Can you help me build a predictive model?',
    contentType: 'text',
    
    status: 'complete',
    timestamp: '2025-08-10T09:00:00.000Z',
  },
  
  {
    id: 'msg-churn-002',
    conversationId: 'conv-churn-prediction',
    
    role: 'assistant',
    content: `I'll create a churn prediction model using machine learning. The model will analyze:

- Customer engagement metrics
- Transaction patterns
- Support ticket history
- Product usage trends
- Demographics

I'll use a gradient boosting classifier with these features.`,
    contentType: 'markdown',
    
    artifactIds: ['artifact-churn-ml'],
    
    status: 'complete',
    timestamp: '2025-08-10T09:15:00.000Z',
    
    aiModel: 'gpt-4',
    aiVersion: '2024-05-13',
    promptTokens: 120,
    completionTokens: 145,
    totalTokens: 265,
    finishReason: 'stop',
  },
  
  {
    id: 'msg-churn-003',
    conversationId: 'conv-churn-prediction',
    
    role: 'user',
    content: 'Perfect! What actions should we take when we predict a customer is at risk?',
    contentType: 'text',
    
    status: 'complete',
    timestamp: '2025-08-10T10:30:00.000Z',
  },
  
  {
    id: 'msg-churn-004',
    conversationId: 'conv-churn-prediction',
    
    role: 'assistant',
    content: `I've added intervention rules based on churn risk level:

**High Risk (>75% probability):**
- Immediate account manager outreach
- Personalized retention offer
- Priority support escalation

**Medium Risk (40-75%):**
- Automated email campaign
- Product usage tips
- Satisfaction survey

**Low Risk (<40%):**
- Standard engagement
- Proactive feature announcements

The complete automation is ready!`,
    contentType: 'markdown',
    
    artifactIds: ['artifact-churn-rules'],
    assetReferences: [
      {
        id: 'ref-churn-auto-001',
        messageId: 'msg-churn-004',
        assetId: 'churn-prediction-model',
        assetType: 'automation',
        assetName: 'Customer Churn Prediction',
        referenceType: 'created',
        context: 'Created complete churn prediction automation with ML model and intervention rules',
        createdDate: '2025-08-10T11:30:00.000Z',
      },
    ],
    
    status: 'complete',
    timestamp: '2025-08-10T11:30:00.000Z',
    
    aiModel: 'gpt-4',
    aiVersion: '2024-05-13',
    promptTokens: 95,
    completionTokens: 178,
    totalTokens: 273,
    finishReason: 'stop',
  },
  
  // ============================================================================
  // Fraud Detection Improvement Conversation
  // ============================================================================
  
  {
    id: 'msg-fraud-001',
    conversationId: 'conv-improve-fraud-detection',
    
    role: 'user',
    content: 'I\'m reviewing our fraud detection model and seeing too many false positives. Can you help me analyze the current model and suggest improvements?',
    contentType: 'text',
    
    status: 'complete',
    timestamp: '2025-10-14T10:00:00.000Z',
  },
  
  {
    id: 'msg-fraud-002',
    conversationId: 'conv-improve-fraud-detection',
    
    role: 'assistant',
    content: `Let me review the current fraud detection model. I can see it's using these features:
- Transaction amount
- Location
- Time of day
- Device fingerprint

The false positive rate is 8.2%, which is indeed high. Let me analyze the data...`,
    contentType: 'markdown',
    
    assetReferences: [
      {
        id: 'ref-fraud-inspect-001',
        messageId: 'msg-fraud-002',
        assetId: 'asset-fraud-ml-002',
        assetType: 'asset',
        assetName: 'Fraud Detection ML Model',
        referenceType: 'inspected',
        context: 'Analyzed current fraud detection model performance',
        createdDate: '2025-10-14T10:15:00.000Z',
      },
    ],
    
    status: 'complete',
    timestamp: '2025-10-14T10:15:00.000Z',
    
    aiModel: 'gpt-4',
    aiVersion: '2024-05-13',
    promptTokens: 156,
    completionTokens: 92,
    totalTokens: 248,
    finishReason: 'stop',
  },
  
  {
    id: 'msg-fraud-003',
    conversationId: 'conv-improve-fraud-detection',
    
    role: 'user',
    content: 'What specific changes would you recommend?',
    contentType: 'text',
    
    status: 'complete',
    timestamp: '2025-10-14T10:20:00.000Z',
  },
  
  {
    id: 'msg-fraud-004',
    conversationId: 'conv-improve-fraud-detection',
    
    role: 'assistant',
    content: `Based on my analysis, here are my recommendations:

**Model Improvements:**
1. Add customer behavior history (reduces false positives by ~30%)
2. Include merchant category analysis
3. Add velocity checks (transactions per hour)
4. Implement ensemble model (Random Forest + XGBoost)

**Threshold Adjustments:**
- Current: 0.7 (too sensitive)
- Recommended: 0.82 (better precision/recall balance)

**New Features:**
- Average transaction amount by customer
- Typical purchase patterns
- Geographic consistency score

This should reduce false positives to ~3% while maintaining 99%+ detection rate.`,
    contentType: 'markdown',
    
    artifactIds: ['artifact-fraud-improvements'],
    
    status: 'complete',
    timestamp: '2025-10-14T10:35:00.000Z',
    
    aiModel: 'gpt-4',
    aiVersion: '2024-05-13',
    promptTokens: 108,
    completionTokens: 224,
    totalTokens: 332,
    finishReason: 'stop',
  },
  
  {
    id: 'msg-fraud-005',
    conversationId: 'conv-improve-fraud-detection',
    
    role: 'user',
    content: 'Excellent analysis! I\'ll implement these changes. Can you create a summary document?',
    contentType: 'text',
    
    status: 'complete',
    timestamp: '2025-10-14T11:30:00.000Z',
  },
  
  // ============================================================================
  // Review Credit Model Conversation
  // ============================================================================
  
  {
    id: 'msg-review-001',
    conversationId: 'conv-review-credit-model',
    
    role: 'user',
    content: 'Can you review the credit scoring model we created earlier? I want to make sure it\'s still performing well.',
    contentType: 'text',
    
    status: 'complete',
    timestamp: '2025-10-15T14:00:00.000Z',
  },
  
  {
    id: 'msg-review-002',
    conversationId: 'conv-review-credit-model',
    
    role: 'assistant',
    content: `Let me pull up the credit scoring model and review its current configuration...

I can see the model is performing well:
- Accuracy: 92.4%
- Approval rate: 68%
- Average decision time: 1.2 seconds

The model uses:
- Credit score (40% weight)
- DTI ratio (30% weight)
- Income verification (20% weight)
- Employment history (10% weight)

Performance looks good! Any specific concerns?`,
    contentType: 'markdown',
    
    assetReferences: [
      {
        id: 'ref-credit-review-001',
        messageId: 'msg-review-002',
        assetId: 'asset-credit-dm-001',
        assetType: 'asset',
        assetName: 'Credit Scoring Model',
        referenceType: 'inspected',
        context: 'Reviewed model configuration and performance metrics',
        createdDate: '2025-10-15T14:15:00.000Z',
      },
    ],
    
    status: 'complete',
    timestamp: '2025-10-15T14:15:00.000Z',
    
    aiModel: 'gpt-4',
    aiVersion: '2024-05-13',
    promptTokens: 98,
    completionTokens: 156,
    totalTokens: 254,
    finishReason: 'stop',
  },
  
  {
    id: 'msg-review-003',
    conversationId: 'conv-review-credit-model',
    
    role: 'user',
    content: 'Great! Just wanted to confirm it\'s working as expected. Thanks!',
    contentType: 'text',
    
    status: 'complete',
    timestamp: '2025-10-15T15:30:00.000Z',
  },
];

// Asset references array for easy lookup
export const assetReferences: AssetReference[] = messages
  .filter(msg => msg.assetReferences)
  .flatMap(msg => msg.assetReferences || []);
