/**
 * Pricing Engine Service (spe1k)
 * Complete service export
 */

export { service } from './service';
export { dataModels } from './data-models';
export { decisionModels } from './decision-models';
export { ruleModels } from './rule-models';
export * as functions from './functions';

import { decisionModels } from './decision-models';
import { ruleModels } from './rule-models';
import type { MLModelAsset, GenAINodeAsset } from '../../../../shared/types';


const optimizationModels: MLModelAsset[] = [
  {
    id: 'pricing-optimization-model',
    hashId: 'apom1',
    type: 'optimization-model',
    name: 'Pricing Optimization Model',
    displayName: 'Margin-aware Price Optimizer',
    description: 'Mathematical optimization model that balances margin, inventory, demand elasticity, and competitive position for recommended prices.',
    status: 'deployed',
    serviceId: 'pricing-engine',
    inputDataModelIds: ['pricing-model'],
    outputDataModelIds: ['pricing-model'],
    tags: [],
    createdDate: '2025-06-30T10:39:00.000Z',
    lastUpdatedDate: '2025-06-30T10:39:00.000Z',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
    createdBy: 'domwashburn@us.ibm.com',
    version: '3.0.1',
    branch: 'main',
    modelType: 'optimization',
    framework: 'custom',
    accuracy: 0.93,
  },
];

const genAINodes: GenAINodeAsset[] = [
  {
    id: 'pricing-explanation-genai-node',
    hashId: 'apgn1',
    type: 'genai-node',
    name: 'Pricing Explanation GenAI Node',
    displayName: 'Price Recommendation Explainer',
    description: 'Grounded GenAI node that explains recommended price changes using demand, margin, inventory, and competitor evidence.',
    status: 'deployed',
    serviceId: 'pricing-engine',
    inputDataModelIds: ['pricing-model'],
    outputDataModelIds: ['pricing-model'],
    tags: [],
    createdDate: '2025-06-30T10:39:00.000Z',
    lastUpdatedDate: '2025-06-30T10:39:00.000Z',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
    createdBy: 'domwashburn@us.ibm.com',
    version: '3.0.1',
    branch: 'main',
    promptTemplate: 'Explain the recommended price using only supplied pricing-model evidence.',
    model: 'watsonx/granite',
    temperature: 0.2,
    maxTokens: 700,
  },
];

export const allAssets = [
  ...decisionModels,
  ...ruleModels,
  ...optimizationModels,
  ...genAINodes,
];
