/**
 * Common Tags for Decision Automations
 * 
 * Shared tags used across automations, services, and assets
 */

import type { Tag } from './types';

// ============================================================================
// AUTOMATION TAGS
// ============================================================================

export const commonTags: Tag[] = [
  { id: 'tag-review', label: 'Review updates', color: 'blue' },
  { id: 'tag-production', label: 'Production', color: 'green' },
  { id: 'tag-testing', label: 'Testing', color: 'yellow' },
  { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
  { id: 'tag-compliance', label: 'Compliance', color: 'red' },
  { id: 'tag-performance', label: 'Performance', color: 'cyan' },
];

// ============================================================================
// SERVICE TAGS
// ============================================================================

export const serviceTags: Tag[] = [
  ...commonTags,
  { id: 'tag-ml-enabled', label: 'ML Enabled', color: 'purple' },
  { id: 'tag-real-time', label: 'Real-time', color: 'orange' },
  { id: 'tag-batch', label: 'Batch Processing', color: 'gray' },
];

// ============================================================================
// ASSET TAGS
// ============================================================================

export const assetTags: Tag[] = [
  ...serviceTags,
  { id: 'tag-deprecated', label: 'Deprecated', color: 'red' },
  { id: 'tag-experimental', label: 'Experimental', color: 'yellow' },
  { id: 'tag-validated', label: 'Validated', color: 'green' },
];
