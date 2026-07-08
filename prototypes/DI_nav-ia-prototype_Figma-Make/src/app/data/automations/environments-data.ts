/**
 * Deployment Environments Configuration - Mock Data
 * 
 * This module contains deployment environment configurations for decision automations.
 * Environments are defined at the global level, but deployment history is per-automation.
 * 
 * Accessed from:
 * - Deploy Automation page > Environments tab
 * - Settings/Configuration page (future)
 * 
 * Environment Types:
 * - Development: For initial testing and development
 * - Staging: Pre-production validation
 * - Production: Live production environment
 */

import type { DeploymentEnvironment } from './branches-types';

// ============================================================================
// AUTOMATION DEPLOYMENT TYPES
// ============================================================================

/**
 * Deployment information for a specific automation in an environment
 */
export interface AutomationDeployment {
  automationId: string;
  version: string;
  timestamp: string;
  deployedBy: string;
  status: 'success' | 'failed' | 'in-progress';
  deploymentId?: string;
}

/**
 * Map of automation deployments by environment and automation
 */
type AutomationDeploymentsMap = {
  [environmentId: string]: {
    [automationId: string]: AutomationDeployment;
  };
};

// ============================================================================
// ENVIRONMENT TYPES
// ============================================================================

/**
 * Environment configuration
 */
export interface EnvironmentConfig {
  id: string;
  name: string;
  type: DeploymentEnvironment;
  description: string;
  url?: string;
  status: 'active' | 'inactive' | 'maintenance';
  
  // Resource allocation
  instances: number;
  region: string;
  
  // Deployment settings
  autoDeployEnabled: boolean;
  requiresApproval: boolean;
  approvers?: string[];
  
  // Monitoring
  healthCheckUrl?: string;
  monitoringDashboard?: string;
  
  // Metadata
  createdDate: string;
  lastDeployment?: {
    version: string;
    timestamp: string;
    deployedBy: string;
    status: 'success' | 'failed' | 'in-progress';
  };
  
  // Configuration
  environmentVariables?: Record<string, string>;
  tags?: string[];
}

// ============================================================================
// ENVIRONMENTS CONFIGURATION
// ============================================================================

export const environments: EnvironmentConfig[] = [
  {
    id: 'env-development',
    name: 'Development',
    type: 'development',
    description: 'Development environment for testing and experimentation',
    url: 'https://dev.decision-intelligence.ibm.com',
    status: 'active',
    
    instances: 1,
    region: 'us-east-1',
    
    autoDeployEnabled: true,
    requiresApproval: false,
    
    healthCheckUrl: 'https://dev.decision-intelligence.ibm.com/health',
    monitoringDashboard: 'https://monitor.ibm.com/dev',
    
    createdDate: '2025-01-15T10:00:00.000Z',
    lastDeployment: {
      version: '2.1.0',
      timestamp: '2025-10-13T17:00:00.000Z',
      deployedBy: 'domwashburn@us.ibm.com',
      status: 'success',
    },
    
    environmentVariables: {
      LOG_LEVEL: 'debug',
      ENABLE_DEBUG_MODE: 'true',
      API_TIMEOUT: '30000',
    },
    
    tags: ['development', 'testing'],
  },
  
  {
    id: 'env-staging',
    name: 'Staging',
    type: 'staging',
    description: 'Pre-production environment for validation and quality assurance',
    url: 'https://staging.decision-intelligence.ibm.com',
    status: 'active',
    
    instances: 2,
    region: 'us-east-1',
    
    autoDeployEnabled: false,
    requiresApproval: true,
    approvers: ['domwashburn@us.ibm.com', 'sarah.chen@ibm.com'],
    
    healthCheckUrl: 'https://staging.decision-intelligence.ibm.com/health',
    monitoringDashboard: 'https://monitor.ibm.com/staging',
    
    createdDate: '2025-01-15T10:00:00.000Z',
    lastDeployment: {
      version: '2.0.0',
      timestamp: '2025-06-30T11:00:00.000Z',
      deployedBy: 'domwashburn@us.ibm.com',
      status: 'success',
    },
    
    environmentVariables: {
      LOG_LEVEL: 'info',
      ENABLE_DEBUG_MODE: 'false',
      API_TIMEOUT: '15000',
    },
    
    tags: ['staging', 'qa', 'pre-production'],
  },
  
  {
    id: 'env-production',
    name: 'Production',
    type: 'production',
    description: 'Live production environment serving customer requests',
    url: 'https://decision-intelligence.ibm.com',
    status: 'active',
    
    instances: 3,
    region: 'us-east-1',
    
    autoDeployEnabled: false,
    requiresApproval: true,
    approvers: ['domwashburn@us.ibm.com', 'sarah.chen@ibm.com', 'ops-team@ibm.com'],
    
    healthCheckUrl: 'https://decision-intelligence.ibm.com/health',
    monitoringDashboard: 'https://monitor.ibm.com/production',
    
    createdDate: '2025-01-15T10:00:00.000Z',
    lastDeployment: {
      version: '1.1.0',
      timestamp: '2025-10-15T14:20:00.000Z',
      deployedBy: 'domwashburn@us.ibm.com',
      status: 'success',
    },
    
    environmentVariables: {
      LOG_LEVEL: 'warn',
      ENABLE_DEBUG_MODE: 'false',
      API_TIMEOUT: '10000',
    },
    
    tags: ['production', 'live', 'critical'],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get environment by ID
 */
export function getEnvironmentById(id: string): EnvironmentConfig | undefined {
  return environments.find(env => env.id === id);
}

/**
 * Get environment by type
 */
export function getEnvironmentByType(type: DeploymentEnvironment): EnvironmentConfig | undefined {
  return environments.find(env => env.type === type);
}

/**
 * Get all active environments
 */
export function getActiveEnvironments(): EnvironmentConfig[] {
  return environments.filter(env => env.status === 'active');
}

/**
 * Get environments sorted by promotion order (dev -> staging -> prod)
 */
export function getEnvironmentsByPromotionOrder(): EnvironmentConfig[] {
  const order: DeploymentEnvironment[] = ['development', 'staging', 'production'];
  return environments.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
}

// ============================================================================
// AUTOMATION-SPECIFIC DEPLOYMENTS
// ============================================================================

/**
 * Deployment history for each automation across environments
 * This maps environmentId -> automationId -> deployment info
 */
const automationDeployments: AutomationDeploymentsMap = {
  'env-development': {
    'automation-6-24-20': {
      automationId: 'automation-6-24-20',
      version: '2.1.0',
      timestamp: '2025-10-13T17:00:00.000Z',
      deployedBy: 'domwashburn@us.ibm.com',
      status: 'success',
      deploymentId: 'deploy-dev-1013-01',
    },
    'test-8': {
      automationId: 'test-8',
      version: '2.1.0',
      timestamp: '2025-10-13T17:00:00.000Z',
      deployedBy: 'domwashburn@us.ibm.com',
      status: 'success',
      deploymentId: 'deploy-dev-1013-01',
    },
    'test-7': {
      automationId: 'test-7',
      version: '1.5.3',
      timestamp: '2025-10-12T14:15:00.000Z',
      deployedBy: 'sarah.chen@ibm.com',
      status: 'success',
      deploymentId: 'deploy-dev-1012-01',
    },
  },
  'env-staging': {
    'automation-6-24-20': {
      automationId: 'automation-6-24-20',
      version: '2.0.0',
      timestamp: '2025-06-30T11:00:00.000Z',
      deployedBy: 'domwashburn@us.ibm.com',
      status: 'success',
      deploymentId: 'deploy-staging-0630-01',
    },
    'test-8': {
      automationId: 'test-8',
      version: '2.0.0',
      timestamp: '2025-06-30T11:00:00.000Z',
      deployedBy: 'domwashburn@us.ibm.com',
      status: 'success',
      deploymentId: 'deploy-stage-0630-01',
    },
    'test-7': {
      automationId: 'test-7',
      version: '1.5.2',
      timestamp: '2025-10-08T10:20:00.000Z',
      deployedBy: 'sarah.chen@ibm.com',
      status: 'success',
      deploymentId: 'deploy-staging-1008-01',
    },
  },
  'env-production': {
    'automation-6-24-20': {
      automationId: 'automation-6-24-20',
      version: '1.1.0',
      timestamp: '2025-10-15T14:20:00.000Z',
      deployedBy: 'domwashburn@us.ibm.com',
      status: 'success',
      deploymentId: 'deploy-prod-1015-01',
    },
    'test-8': {
      automationId: 'test-8',
      version: '2.0.0',
      timestamp: '2025-07-02T09:15:00.000Z',
      deployedBy: 'domwashburn@us.ibm.com',
      status: 'success',
      deploymentId: 'deploy-prod-0702-01',
    },
    'test-7': {
      automationId: 'test-7',
      version: '1.5.2',
      timestamp: '2025-10-07T13:30:00.000Z',
      deployedBy: 'sarah.chen@ibm.com',
      status: 'success',
      deploymentId: 'deploy-prod-1007-01',
    },
  },
};

/**
 * Get deployment info for a specific automation in an environment
 */
export function getAutomationDeployment(
  environmentId: string,
  automationId: string
): AutomationDeployment | undefined {
  return automationDeployments[environmentId]?.[automationId];
}

/**
 * Get all environments with automation-specific deployment info
 */
export function getEnvironmentsForAutomation(automationId: string): EnvironmentConfig[] {
  return getEnvironmentsByPromotionOrder().map(env => ({
    ...env,
    lastDeployment: automationDeployments[env.id]?.[automationId],
  }));
}
