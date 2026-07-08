/**
 * Shared branch data source for the application
 * 
 * This provides a single source of truth for all branch-related data
 * used across:
 * - BranchSwitcher (action bar)
 * - SideRailBranchDropdown (side rail)
 * - BranchesPage (inbox list)
 */

export interface BranchData {
  id: string;
  name: string;
  type: 'main' | 'develop' | 'feature' | 'hotfix' | 'release';
  status: 'published' | 'draft';
  isProtected: boolean;
  lastCommit?: string;
  updatedBy?: string;
  isActive?: boolean;
}

export const branches: BranchData[] = [
  {
    id: 'main',
    name: 'main',
    type: 'main',
    status: 'published',
    isProtected: true,
    lastCommit: '2 hours ago',
    updatedBy: 'Jane Smith',
  },
  {
    id: 'develop',
    name: 'develop',
    type: 'develop',
    status: 'draft',
    isProtected: true,
    lastCommit: '1 hour ago',
    updatedBy: 'John Doe',
  },
  {
    id: 'feature-new-service',
    name: 'feature/new-service',
    type: 'feature',
    status: 'draft',
    isProtected: false,
    lastCommit: '45 minutes ago',
    updatedBy: 'Emily Davis',
  },
  {
    id: 'feature-automation-v2',
    name: 'feature/automation-v2',
    type: 'feature',
    status: 'draft',
    isProtected: false,
    lastCommit: '3 hours ago',
    updatedBy: 'Mike Chen',
  },
  {
    id: 'hotfix-validation',
    name: 'hotfix/validation',
    type: 'hotfix',
    status: 'draft',
    isProtected: false,
    lastCommit: '15 minutes ago',
    updatedBy: 'Alex Rivera',
  },
];

/**
 * Get branch data by ID
 */
export function getBranchById(id: string): BranchData | undefined {
  return branches.find(b => b.id === id);
}

/**
 * Get branches for switcher components (simplified format)
 */
export function getBranchesForSwitcher(currentBranchId?: string) {
  return branches.map(b => ({
    id: b.id,
    name: b.name,
    isActive: b.id === currentBranchId,
  }));
}

/**
 * Get branches for inbox list (full format)
 */
export function getBranchesForInbox(selectedBranchId?: string) {
  return branches.map(b => ({
    ...b,
    isSelected: b.id === selectedBranchId,
  }));
}
