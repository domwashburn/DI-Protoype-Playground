/**
 * Task Model Assets for Credit Risk Assessment Service
 * 
 * Workflow orchestration for credit application processing
 */

import type { TaskModelAsset } from '../../../../shared/types';

export const taskModels: TaskModelAsset[] = [
  {
    id: 'credit-task-model',
    hashId: 'actm1',
    type: 'task-model',
    
    name: 'Credit Application Processing',
    displayName: 'Credit Application Workflow',
    description: 'End-to-end credit application processing workflow with automated verification and decision routing',
    
    status: 'deployed',
    serviceId: 'credit-risk-assessment',
    
    // Dependencies
    dependencies: [
      'credit-decision-model',
      'credit-risk-ml-model'
    ],
    
    // Sub-assets
    functionIds: [
      'credit-score-checker',
      'validate-income',
      'calculate-risk-score',
    ],
    
    // Task model specific
    errorCount: 3,
    executionCount: 152340,
    
    tags: [],
    createdDate: '2025-06-24T15:47:00.000Z',
    lastUpdatedDate: '2025-10-15T14:20:00.000Z',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
    createdBy: 'domwashburn@us.ibm.com',
    version: '1.2.0',
    branch: 'main',
  },
];
