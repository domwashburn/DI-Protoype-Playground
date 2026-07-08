// Type definitions based on the JSON schema
export interface Resource {
  id: string;
  name: string;
  description: string;
  type: string;
  category: string;
  provider: string;
  providerType: 'ibm' | 'third-party' | 'customer';
  tasks: string[];
  deployment: 'provided' | 'third-party' | 'custom';
  createdDate: string;
  industry: string;
  icon?: string;
  kpis?: string[];
  businessGoals?: string;
  useCase?: string;
  prompt?: string;
  components?: string[];
  // Additional fields for resource details panel
  tags?: string[];
  providedBy?: string;
  version?: string;
  lastUpdated?: string;
  nestedAssets?: string[];
  usedIn?: string[];
}

export interface ResourceHubMetadata {
  title: string;
  description: string;
  version: string;
  lastUpdated: string;
  totalResources: number;
  industries: string[];
  resourceTypes: string[];
  categories: string[];
  providerTypes: string[];
  useCases: string[];
}

// Helper function to format date from YYYY-MM-DD to "Mon DD, YYYY"
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

import { mockResources, resourceHubMetadata } from './mockResourceData';

// Load resources - returns mock data synchronously wrapped in a Promise for API consistency
export async function loadResourceHubData(): Promise<{ resources: Resource[]; metadata: ResourceHubMetadata }> {
  // Return mock data (can be replaced with actual API call or JSON fetch later)
  return Promise.resolve({
    resources: mockResources,
    metadata: resourceHubMetadata
  });
}

// Labels that each resource type appends to its name — strip trailing matches.
const TYPE_SUFFIXES: Record<string, string[]> = {
  'decision-model':      ['Decision Model'],
  'predictive-model':    ['Predictive Model'],
  'ml-model':            ['ML Model'],
  'task-model':          ['Task Model'],
  'rule':                ['Rules', 'Rule'],
  'policy':              ['Policy'],
  'dashboard':           ['Dashboard'],
  'prompt':              ['Prompt'],
  'decision-automation': ['Decision Automation'],
  'decision-service':    ['Decision Service'],
  'data-model':          ['Data Model'],
  'optimization-model':  ['Optimization Model'],
};

function stripTypeSuffix(name: string, type: string): string {
  for (const suffix of TYPE_SUFFIXES[type] ?? []) {
    if (name.toLowerCase().endsWith(` ${suffix.toLowerCase()}`)) {
      return name.slice(0, name.length - suffix.length - 1);
    }
  }
  return name;
}

// Helper to convert resource to card format
export function resourceToCardData(resource: Resource) {
  // Ensure resource has required fields for details panel
  if (!resource.tags) {
    resource.tags = resource.tasks.slice(0, 3);
  }
  if (!resource.providedBy) {
    resource.providedBy = resource.provider;
  }
  if (!resource.version) {
    resource.version = '1.0.0';
  }
  if (!resource.lastUpdated) {
    resource.lastUpdated = resource.createdDate;
  }
  if (!resource.nestedAssets) {
    resource.nestedAssets = [];
  }
  if (!resource.usedIn) {
    resource.usedIn = [];
  }

  return {
    id: resource.id,
    title: stripTypeSuffix(resource.name, resource.type),
    description: resource.description,
    resourceType: resource.type,
    provider: resource.provider,
    type: resource.deployment ? resource.deployment.charAt(0).toUpperCase() + resource.deployment.slice(1) : '',
  };
}

// Group resources by category
export function groupResourcesByCategory(resources: Resource[]) {
  return {
    'Decision Models': resources.filter(r => r.category === 'Decision Models'),
    'Task Models': resources.filter(r => r.category === 'Task Models'),
    'Predictive Models': resources.filter(r => r.category === 'Predictive Models'),
    'Policy Documents': resources.filter(r => r.category === 'Policy Documents'),
    'BAI Dashboards': resources.filter(r => r.category === 'BAI Dashboards'),
    'Decision Assistant Prompts': resources.filter(r => r.category === 'Decision Assistant Prompts'),
    'Decision Automations': resources.filter(r => r.category === 'Decision Automations'),
    'Decision Services': resources.filter(r => r.category === 'Decision Services'),
    'Data Models': resources.filter(r => r.category === 'Data Models'),
    'Optimization Models': resources.filter(r => r.category === 'Optimization Models'),
    'GenAI Nodes': resources.filter(r => r.category === 'GenAI Nodes'),
  };
}

// Get resources for "Sample Assets" tab (non-prompt resources)
export function getSampleAssets(resources: Resource[]) {
  const assetCategories = [
    'Decision Models',
    'Task Models',
    'Predictive Models',
    'Optimization Models',
    'GenAI Nodes'
  ];
  
  const grouped = groupResourcesByCategory(resources);
  
  return assetCategories.map(category => ({
    category,
    resources: grouped[category as keyof typeof grouped] || []
  })).filter(group => group.resources.length > 0);
}

// Get resources for "Sample Prompts" tab
export function getSamplePrompts(resources: Resource[]) {
  const grouped = groupResourcesByCategory(resources);
  return [{
    category: 'Decision Assistant Prompts',
    resources: grouped['Decision Assistant Prompts'] || []
  }].filter(group => group.resources.length > 0);
}

// Get resources for "Sample Policies" tab
export function getSamplePolicies(resources: Resource[]) {
  const grouped = groupResourcesByCategory(resources);
  return [{
    category: 'Policy Documents',
    resources: grouped['Policy Documents'] || []
  }].filter(group => group.resources.length > 0);
}

// Get resources for "Monitoring" tab (BAI Dashboards)
export function getMonitoringDashboards(resources: Resource[]) {
  const grouped = groupResourcesByCategory(resources);
  return [{
    category: 'BAI Dashboards',
    resources: grouped['BAI Dashboards'] || []
  }].filter(group => group.resources.length > 0);
}
