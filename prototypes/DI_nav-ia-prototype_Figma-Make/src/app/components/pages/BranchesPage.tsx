import { useState, useMemo } from 'react';
import { SettingsAdjust, ChevronDown } from '@carbon/icons-react';
import PageHeader from '../PageHeader';
import {
  InboxLayoutTemplate,
  InboxPanelHeader,
  InboxPanelToolbar,
  InboxActionButton,
  InboxPanelList,
  AddIcon,
  SearchIcon,
  FilterIcon,
} from '../InboxLayout';
import LargeListItem, { LargeListItemMenuItem } from '../LargeListItem';
import Modal from '../Modal';
import { useBranches, useBranch } from '../../data/hooks/useBranches';
import type { Branch } from '../../data/automations/branches-types';
import { InsetLayout } from '../SidePanel';
import styles from './BranchesPage.module.css';

// ============================================================================
// MOCK DATA - File Changes
// ============================================================================

interface FileChange {
  id: string;
  type: 'added' | 'modified' | 'removed';
  file: string;
  description: string;
  timestamp: string;
}

const mockFileChanges: Record<string, FileChange[]> = {
  'branch-main': [
    {
      id: 'change-main-1',
      type: 'modified',
      file: 'credit-scoring-automation/decision-model.dmn',
      description: 'Updated credit scoring thresholds',
      timestamp: '2 hours ago',
    },
    {
      id: 'change-main-2',
      type: 'added',
      file: 'fraud-detection/ml-model-v2.pmml',
      description: 'Added new fraud detection model',
      timestamp: '4 hours ago',
    },
  ],
  'branch-develop': [
    {
      id: 'change-dev-1',
      type: 'modified',
      file: 'src/decision-services/loan-approval.ts',
      description: 'Updated loan approval business logic',
      timestamp: '1 hour ago',
    },
    {
      id: 'change-dev-2',
      type: 'added',
      file: 'src/rules/credit-policy-v3.drl',
      description: 'Added new credit policy rules',
      timestamp: '2 hours ago',
    },
    {
      id: 'change-dev-3',
      type: 'removed',
      file: 'src/legacy/old-scoring.ts',
      description: 'Removed deprecated scoring module',
      timestamp: '3 hours ago',
    },
  ],
  'branch-feature-credit-scoring': [
    {
      id: 'change-feature-1',
      type: 'modified',
      file: 'ml-models/credit-scoring-enhanced.pmml',
      description: 'Enhanced credit scoring with new risk factors',
      timestamp: '30 minutes ago',
    },
    {
      id: 'change-feature-2',
      type: 'added',
      file: 'data/risk-factors-v2.json',
      description: 'Added new risk factor definitions',
      timestamp: '1 hour ago',
    },
    {
      id: 'change-feature-3',
      type: 'modified',
      file: 'decision-services/credit-assessment.dmn',
      description: 'Updated decision logic for enhanced scoring',
      timestamp: '2 hours ago',
    },
    {
      id: 'change-feature-4',
      type: 'added',
      file: 'tests/credit-scoring-tests.ts',
      description: 'Added comprehensive test suite',
      timestamp: '3 hours ago',
    },
  ],
};

// ============================================================================
// MOCK DATA - Commit History
// ============================================================================

interface Commit {
  id: string;
  message: string;
  author: string;
  timestamp: string;
  changesCount: number;
  additions: number;
  deletions: number;
  color: string;
}

const mockCommits: Record<string, Commit[]> = {
  'branch-main': [
    {
      id: 'commit-main-1',
      message: 'Adds gates and deeplink command support',
      author: 'Ramin Tadayon',
      timestamp: '2 weeks ago',
      changesCount: 3,
      additions: 100,
      deletions: 0,
      color: '#8a3ffc',
    },
    {
      id: 'commit-main-2',
      message: 'Updates storage key and splits automatic and manual',
      author: 'Ramin Tadayon',
      timestamp: '2 weeks ago',
      changesCount: 2,
      additions: 60,
      deletions: 40,
      color: '#8a3ffc',
    },
    {
      id: 'commit-main-3',
      message: 'Adds support for mcp server installation',
      author: 'Ramin Tadayon',
      timestamp: '2 weeks ago',
      changesCount: 5,
      additions: 100,
      deletions: 0,
      color: '#8a3ffc',
    },
    {
      id: 'commit-main-4',
      message: 'Run unit tests on push to main branch',
      author: 'Sergei Shmakov',
      timestamp: '2 weeks ago',
      changesCount: 1,
      additions: 100,
      deletions: 0,
      color: '#0f62fe',
    },
    {
      id: 'commit-main-5',
      message: 'Unifies autolink enrichment keys for integrations',
      author: 'Sergei Shmakov',
      timestamp: '2 weeks ago',
      changesCount: 8,
      additions: 50,
      deletions: 50,
      color: '#ff7eb6',
    },
    {
      id: 'commit-main-6',
      message: 'Enforces code formatting check before running test',
      author: 'Sergei Shmakov',
      timestamp: '2 weeks ago',
      changesCount: 1,
      additions: 80,
      deletions: 20,
      color: '#0f62fe',
    },
  ],
  'branch-develop': [
    {
      id: 'commit-dev-1',
      message: 'Adds unit tests for the string interpolate function',
      author: 'Ramin Tadayon',
      timestamp: '3 weeks ago',
      changesCount: 1,
      additions: 100,
      deletions: 0,
      color: '#0f62fe',
    },
    {
      id: 'commit-dev-2',
      message: 'Extracts host app name lookup into reusable helper',
      author: 'Eric Amodio',
      timestamp: '3 weeks ago',
      changesCount: 1,
      additions: 70,
      deletions: 30,
      color: '#0f62fe',
    },
    {
      id: 'commit-dev-3',
      message: 'Expands commit integration deep link support',
      author: 'Ramin Tadayon',
      timestamp: '3 weeks ago',
      changesCount: 4,
      additions: 100,
      deletions: 0,
      color: '#0f62fe',
    },
    {
      id: 'commit-dev-4',
      message: 'Updates CHANGELOG (patch)',
      author: 'Keith Daulton',
      timestamp: '3 weeks ago',
      changesCount: 1,
      additions: 60,
      deletions: 40,
      color: '#0f62fe',
    },
    {
      id: 'commit-dev-5',
      message: 'Bumps to v17.4.1',
      author: 'Keith Daulton',
      timestamp: '3 weeks ago',
      changesCount: 2,
      additions: 70,
      deletions: 30,
      color: '#8a3ffc',
    },
  ],
  'branch-feature-credit-scoring': [
    {
      id: 'commit-feature-1',
      message: 'Implements ML-enhanced credit scoring algorithm',
      author: 'domwashburn@us.ibm.com',
      timestamp: '1 day ago',
      changesCount: 4,
      additions: 100,
      deletions: 0,
      color: '#42be65',
    },
    {
      id: 'commit-feature-2',
      message: 'Refactors risk factor calculation for better accuracy',
      author: 'domwashburn@us.ibm.com',
      timestamp: '2 days ago',
      changesCount: 7,
      additions: 50,
      deletions: 50,
      color: '#42be65',
    },
    {
      id: 'commit-feature-3',
      message: 'Updates test coverage for edge cases',
      author: 'domwashburn@us.ibm.com',
      timestamp: '3 days ago',
      changesCount: 3,
      additions: 100,
      deletions: 0,
      color: '#42be65',
    },
    {
      id: 'commit-feature-4',
      message: 'Fixes formatting issues in documentation',
      author: 'domwashburn@us.ibm.com',
      timestamp: '4 days ago',
      changesCount: 2,
      additions: 80,
      deletions: 20,
      color: '#42be65',
    },
    {
      id: 'commit-feature-5',
      message: 'Merges latest changes from develop branch',
      author: 'Keith Daulton',
      timestamp: '1 week ago',
      changesCount: 12,
      additions: 60,
      deletions: 40,
      color: '#0f62fe',
    },
  ],
};

// Default commits for branches without specific history
const defaultCommits: Commit[] = [
  {
    id: 'commit-default-1',
    message: 'Initial branch commit',
    author: 'System',
    timestamp: '1 day ago',
    changesCount: 1,
    additions: 100,
    deletions: 0,
    color: '#42be65',
  },
];

// ============================================================================
// MOCK DATA - Collaborators
// ============================================================================

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Write' | 'Read';
  avatarInitials: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function BranchesPage() {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('branch-main');
  const [activeTab, setActiveTab] = useState<'overview' | 'changes' | 'history' | 'pull-requests' | 'settings'>('changes');
  
  // Get branches from data layer
  const { branches } = useBranches();
  const { branch: selectedBranch } = useBranch(selectedBranchId);
  
  // Only show branch creator (owner) by default - collaborators can be invited for draft branches
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@company.com', role: 'Owner', avatarInitials: 'SJ' },
  ]);

  // Current user email - in real app this would come from auth context
  const currentUserEmail = 'sarah.johnson@company.com';
  
  // Check if current user has access (is a collaborator)
  const hasAccess = collaborators.some(c => c.email === currentUserEmail);

  // Version control settings modal
  const [isVersionControlModalOpen, setIsVersionControlModalOpen] = useState(false);
  const [versioningStrategy, setVersioningStrategy] = useState<'semver' | 'calver' | 'timestamp'>('semver');

  const tabs = [
    { id: 'overview', label: 'Overview', isActive: activeTab === 'overview' },
    { id: 'changes', label: 'Changes', isActive: activeTab === 'changes' },
    { id: 'history', label: 'History', isActive: activeTab === 'history' },
    { id: 'pull-requests', label: 'Pull requests', isActive: activeTab === 'pull-requests' },
    { id: 'settings', label: 'Settings', isActive: activeTab === 'settings' },
  ];

  // Get file changes and commits for selected branch
  const fileChanges = useMemo(() => {
    return mockFileChanges[selectedBranchId] || [];
  }, [selectedBranchId]);

  const commits = useMemo(() => {
    return mockCommits[selectedBranchId] || defaultCommits;
  }, [selectedBranchId]);

  const getBranchMenuItems = (branchId: string): LargeListItemMenuItem[] => {
    const branch = branches.find(b => b.id === branchId);
    const isMainBranch = branch?.type === 'main';
    const isDefaultBranch = branch?.type === 'main' || branch?.type === 'develop';

    const menuItems: LargeListItemMenuItem[] = [
      {
        label: 'Create pull request',
        onClick: () => console.log('Create PR for', branchId),
      },
      {
        label: 'Compare',
        onClick: () => console.log('Compare', branchId),
      },
      {
        label: 'Branch settings',
        onClick: () => console.log('Settings for', branchId),
      },
    ];

    // Add Deploy for main branch only, Delete for non-default branches
    if (isMainBranch) {
      menuItems.push(
        { isDivider: true, label: '', onClick: () => {} },
        {
          label: 'Deploy',
          onClick: () => console.log('Deploy', branchId),
        }
      );
    } else if (!isDefaultBranch) {
      menuItems.push(
        { isDivider: true, label: '', onClick: () => {} },
        {
          label: 'Delete branch',
          onClick: () => console.log('Delete', branchId),
          isDanger: true,
        }
      );
    }

    return menuItems;
  };

  const handleMenuAction = (action: string, branchId: string) => {
    console.log(`${action} for branch ${branchId}`);
  };

  const getChangeTypeIcon = (type: FileChange['type']) => {
    switch (type) {
      case 'added':
        return '+';
      case 'modified':
        return '~';
      case 'removed':
        return '-';
    }
  };

  const getChangeTypeColor = (type: FileChange['type']) => {
    switch (type) {
      case 'added':
        return 'var(--cds-support-success)';
      case 'modified':
        return 'var(--cds-support-warning)';
      case 'removed':
        return 'var(--cds-support-error)';
    }
  };

  const renderBranchItem = (branch: Branch, isSelected: boolean) => {
    // Format the description using the data from the branch
    const statusText = branch.status;
    const lastCommitText = branch.lastCommitDate 
      ? `Updated ${formatTimestamp(branch.lastCommitDate)}` 
      : '';
    const updatedByText = branch.lastCommitBy ? `by ${branch.lastCommitBy}` : '';
    
    const description = [
      branch.type,
      statusText,
      lastCommitText,
      updatedByText
    ].filter(Boolean).join(' • ');

    return (
      <LargeListItem
        key={branch.id}
        id={branch.id}
        title={branch.displayName || branch.name}
        isSelected={isSelected}
        onClick={() => setSelectedBranchId(branch.id)}
        showIcon={false}
        variant="description"
        description={description}
        showMenu={true}
        menuItems={getBranchMenuItems(branch.id)}
        onMenuAction={handleMenuAction}
      />
    );
  };

  // Format timestamp to relative time
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffWeeks = Math.floor(diffMs / 604800000);

    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
  };

  return (
    <InboxLayoutTemplate
      sidebar={
        <>
          <InboxPanelHeader title="Branches" />
          <InboxActionButton
            label="New Feature branch"
            icon={AddIcon}
            variant="combo"
            size="sm"
            fullWidth={true}
            onClick={() => console.log('Create new feature branch')}
            menuItems={[
              {
                label: 'New Hotfix branch (from Main)',
                onClick: () => console.log('Create new hotfix branch'),
              },
              {
                label: 'New Bugfix branch (from Develop)',
                onClick: () => console.log('Create new bugfix branch'),
              },
            ]}
          />
          <InboxPanelToolbar
            searchPlaceholder="Find a branch"
            SearchIcon={SearchIcon}
            FilterIcon={FilterIcon}
          />
          <InboxPanelList>
            {branches.map((branch) => renderBranchItem(branch, branch.id === selectedBranchId))}
          </InboxPanelList>
        </>
      }
    >
      {/* Page Header with Tabs */}
      <PageHeader
        title={selectedBranch?.displayName || selectedBranch?.name || 'Branch'}
        badges={
          selectedBranch && selectedBranch.protection === 'protected'
            ? [{ label: 'protected', variant: 'protected' as const }]
            : []
        }
        actions={[
          {
            label: 'Compare',
            icon: null,
            variant: 'secondary',
            onClick: () => console.log('Compare clicked'),
          },
          {
            label: 'Create pull request',
            icon: null,
            variant: 'primary',
            onClick: () => console.log('Create PR clicked'),
          },
        ]}
        tabs={tabs}
        onTabChange={(tabId) => setActiveTab(tabId as 'overview' | 'changes' | 'history' | 'pull-requests' | 'settings')}
      />

      {/* View Content with Section Panel Support */}
      <InsetLayout>
        <div className={styles.pageContainer}>
        <div className={styles.pageContent}>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {activeTab === 'overview' ? (
              <div className={styles.overviewTab}>
                <h3 className={styles.placeholderTitle}>Overview</h3>
                
                {selectedBranch && (
                  <div className={styles.branchOverview}>
                    <div className={styles.overviewSection}>
                      <div className={styles.overviewLabel}>Branch type</div>
                      <div className={styles.overviewValue}>{selectedBranch.type}</div>
                    </div>
                    
                    <div className={styles.overviewSection}>
                      <div className={styles.overviewLabel}>Status</div>
                      <div className={styles.overviewValue}>{selectedBranch.status}</div>
                    </div>
                    
                    <div className={styles.overviewSection}>
                      <div className={styles.overviewLabel}>Protection</div>
                      <div className={styles.overviewValue}>{selectedBranch.protection}</div>
                    </div>
                    
                    {selectedBranch.description && (
                      <div className={styles.overviewSection}>
                        <div className={styles.overviewLabel}>Description</div>
                        <div className={styles.overviewValue}>{selectedBranch.description}</div>
                      </div>
                    )}
                    
                    {selectedBranch.aheadBy !== undefined && selectedBranch.aheadBy > 0 && (
                      <div className={styles.overviewSection}>
                        <div className={styles.overviewLabel}>Ahead by</div>
                        <div className={styles.overviewValue}>{selectedBranch.aheadBy} commit{selectedBranch.aheadBy !== 1 ? 's' : ''}</div>
                      </div>
                    )}
                    
                    {selectedBranch.behindBy !== undefined && selectedBranch.behindBy > 0 && (
                      <div className={styles.overviewSection}>
                        <div className={styles.overviewLabel}>Behind by</div>
                        <div className={styles.overviewValue}>{selectedBranch.behindBy} commit{selectedBranch.behindBy !== 1 ? 's' : ''}</div>
                      </div>
                    )}
                    
                    <div className={styles.overviewSection}>
                      <div className={styles.overviewLabel}>Created</div>
                      <div className={styles.overviewValue}>
                        {formatTimestamp(selectedBranch.createdDate)} by {selectedBranch.createdBy}
                      </div>
                    </div>
                    
                    <div className={styles.overviewSection}>
                      <div className={styles.overviewLabel}>Last commit</div>
                      <div className={styles.overviewValue}>
                        {formatTimestamp(selectedBranch.lastCommitDate)} by {selectedBranch.lastCommitBy}
                      </div>
                    </div>
                    
                    {selectedBranch.tags && selectedBranch.tags.length > 0 && (
                      <div className={styles.overviewSection}>
                        <div className={styles.overviewLabel}>Tags</div>
                        <div className={styles.overviewValue}>{selectedBranch.tags.join(', ')}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : activeTab === 'changes' ? (
              <div className={styles.changesTab}>
                {/* Changes Summary */}
                <div className={styles.changesSummary}>
                  <div className={styles.summaryItem}>
                    <span
                      className={styles.summaryCount}
                      style={{ color: getChangeTypeColor('added') }}
                    >
                      {fileChanges.filter((c) => c.type === 'added').length}
                    </span>
                    <span className={styles.summaryLabel}>Added</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span
                      className={styles.summaryCount}
                      style={{ color: getChangeTypeColor('modified') }}
                    >
                      {fileChanges.filter((c) => c.type === 'modified').length}
                    </span>
                    <span className={styles.summaryLabel}>Modified</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span
                      className={styles.summaryCount}
                      style={{ color: getChangeTypeColor('removed') }}
                    >
                      {fileChanges.filter((c) => c.type === 'removed').length}
                    </span>
                    <span className={styles.summaryLabel}>Removed</span>
                  </div>
                </div>

                {/* Changes List */}
                {fileChanges.length > 0 ? (
                  <div className={styles.changesList}>
                    {fileChanges.map((change) => (
                      <div key={change.id} className={styles.changeItem}>
                        <div
                          className={styles.changeIcon}
                          style={{ color: getChangeTypeColor(change.type) }}
                        >
                          {getChangeTypeIcon(change.type)}
                        </div>
                        <div className={styles.changeContent}>
                          <div className={styles.changeFile}>{change.file}</div>
                          <div className={styles.changeDescription}>
                            {change.description}
                          </div>
                          <div className={styles.changeTimestamp}>
                            {change.timestamp}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <p className={styles.emptyStateText}>No changes in this branch yet.</p>
                  </div>
                )}
              </div>
            ) : activeTab === 'history' ? (
              <div className={styles.historyTab}>
                {/* Commit Graph */}
                <div className={styles.commitGraph}>
                  {/* Header */}
                  <div className={styles.commitGraphHeader}>
                    <div className={styles.graphColumn}>Graph</div>
                    <div className={styles.messageColumn}>Commit Message</div>
                    <div className={styles.changesColumn}>Changes</div>
                    <div className={styles.authorColumn}>Author</div>
                    <div className={styles.dateColumn}>Commit Date / Time</div>
                  </div>

                  {/* Commit Rows */}
                  <div className={styles.commitList}>
                    {commits.map((commit, index) => {
                      const totalChanges = commit.additions + commit.deletions;
                      const addPercent = totalChanges > 0 ? (commit.additions / totalChanges) * 100 : 100;
                      const delPercent = totalChanges > 0 ? (commit.deletions / totalChanges) * 100 : 0;
                      const hasMergeLine = commit.message.toLowerCase().includes('merge');

                      return (
                        <div key={commit.id} className={styles.commitRow}>
                          <div className={styles.graphColumn}>
                            <div className={styles.graphCell}>
                              <div className={styles.graphLine} style={{ background: commit.color }}></div>
                              <div className={styles.commitDot} style={{ background: commit.color }}></div>
                              {hasMergeLine && (
                                <div className={styles.mergeLine} style={{ background: commit.color }}></div>
                              )}
                            </div>
                          </div>
                          <div className={styles.messageColumn}>{commit.message}</div>
                          <div className={styles.changesColumn}>
                            <span className={styles.changeCount}>{commit.changesCount}</span>
                            {commit.deletions > 0 ? (
                              <div className={styles.changeBadges}>
                                <div 
                                  className={styles.changeBadge} 
                                  style={{ background: '#24a148', width: `${addPercent}%` }}
                                ></div>
                                <div 
                                  className={styles.changeBadge} 
                                  style={{ background: '#da1e28', width: `${delPercent}%` }}
                                ></div>
                              </div>
                            ) : (
                              <div className={styles.changeBadge} style={{ background: '#24a148' }}></div>
                            )}
                          </div>
                          <div className={styles.authorColumn}>{commit.author}</div>
                          <div className={styles.dateColumn}>{commit.timestamp}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : activeTab === 'pull-requests' ? (
              <div className={styles.placeholderTab}>
                <h3 className={styles.placeholderTitle}>Pull requests</h3>
                <p className={styles.placeholderText}>
                  Pull requests for this branch will appear here.
                </p>
              </div>
            ) : activeTab === 'settings' ? (
              <div className={styles.settingsTab}>
                {/* Branch Protection Settings */}
                <div className={styles.settingsSection}>
                  <h3 className={styles.settingsTitle}>Branch protection</h3>
                  <div className={styles.settingsGroup}>
                    <label className={styles.settingItem}>
                      <input 
                        type="checkbox" 
                        checked={selectedBranch?.protection === 'protected'} 
                        readOnly 
                      />
                      <span>Protect this branch</span>
                    </label>
                    <label className={styles.settingItem}>
                      <input type="checkbox" defaultChecked />
                      <span>Require pull request reviews before merging</span>
                    </label>
                    <label className={styles.settingItem}>
                      <input type="checkbox" defaultChecked />
                      <span>Require status checks to pass before merging</span>
                    </label>
                    <label className={styles.settingItem}>
                      <input type="checkbox" />
                      <span>Require conversation resolution before merging</span>
                    </label>
                  </div>
                </div>

                {/* Merge Settings */}
                <div className={styles.settingsSection}>
                  <h3 className={styles.settingsTitle}>Merge settings</h3>
                  <div className={styles.settingsGroup}>
                    <label className={styles.settingItem}>
                      <input type="checkbox" defaultChecked />
                      <span>Allow merge commits</span>
                    </label>
                    <label className={styles.settingItem}>
                      <input type="checkbox" defaultChecked />
                      <span>Allow squash merging</span>
                    </label>
                    <label className={styles.settingItem}>
                      <input type="checkbox" />
                      <span>Allow rebase merging</span>
                    </label>
                    <label className={styles.settingItem}>
                      <input type="checkbox" defaultChecked />
                      <span>Prevent merging branches with errors</span>
                    </label>
                  </div>
                </div>

                {/* Quality & Automation Settings */}
                <div className={styles.settingsSection}>
                  <h3 className={styles.settingsTitle}>Quality & automation</h3>
                  <div className={styles.settingsGroup}>
                    <label className={styles.settingItem}>
                      <input type="checkbox" defaultChecked />
                      <span>Require test cases for new automation assets</span>
                    </label>
                  </div>
                </div>

                {/* Branch Creation Settings */}
                <div className={styles.settingsSection}>
                  <h3 className={styles.settingsTitle}>Branch creation from this branch</h3>
                  <div className={styles.settingsGroup}>
                    <label className={styles.settingItem}>
                      <input
                        type="checkbox"
                        checked={selectedBranch?.type === 'develop'}
                        disabled={selectedBranch?.type !== 'develop'}
                        readOnly
                      />
                      <span>Allow feature branches from this branch</span>
                    </label>
                    <label className={styles.settingItem}>
                      <input
                        type="checkbox"
                        checked={selectedBranch?.type === 'develop'}
                        disabled={selectedBranch?.type !== 'develop'}
                        readOnly
                      />
                      <span>Allow bugfix branches from this branch</span>
                    </label>
                    <label className={styles.settingItem}>
                      <input
                        type="checkbox"
                        checked={selectedBranch?.type === 'main'}
                        disabled={selectedBranch?.type !== 'main'}
                        readOnly
                      />
                      <span>Allow hotfix branches from this branch</span>
                    </label>
                    <label className={styles.settingItem}>
                      <input
                        type="checkbox"
                        checked={selectedBranch?.type === 'main'}
                        disabled={selectedBranch?.type !== 'main'}
                        readOnly
                      />
                      <span>Allow deploy from this branch</span>
                    </label>
                  </div>
                </div>

                {/* Collaborators */}
                <div className={styles.settingsSection}>
                  <div className={styles.collaboratorHeader}>
                    <h3 className={styles.settingsTitle}>Collaborators</h3>
                    {hasAccess ? (
                      <button className={styles.addCollaboratorButton}>
                        Add collaborator
                      </button>
                    ) : (
                      <button className={styles.requestAccessButton}>
                        Request access
                      </button>
                    )}
                  </div>
                  <p className={styles.collaboratorDescription}>
                    {hasAccess 
                      ? 'Add team members to collaborate on this draft branch. Only the branch creator is the owner by default.'
                      : 'You do not have access to this branch. Request access from the branch owner to collaborate.'}
                  </p>
                  <div className={styles.collaboratorTable}>
                    <div className={styles.tableHeader}>
                      <div className={styles.tableHeaderCell} style={{ flex: '2' }}>Name</div>
                      <div className={styles.tableHeaderCell} style={{ flex: '2' }}>Email</div>
                      <div className={styles.tableHeaderCell} style={{ flex: '1' }}>Permission</div>
                      <div className={styles.tableHeaderCell} style={{ width: '48px' }}></div>
                    </div>
                    <div className={styles.tableBody}>
                      {collaborators.map((collaborator) => (
                        <div key={collaborator.id} className={styles.tableRow}>
                          <div className={styles.tableCell} style={{ flex: '2' }}>
                            <div className={styles.collaboratorInfo}>
                              <div className={styles.avatar}>{collaborator.avatarInitials}</div>
                              <span className={styles.collaboratorName}>{collaborator.name}</span>
                            </div>
                          </div>
                          <div className={styles.tableCell} style={{ flex: '2' }}>
                            <span className={styles.collaboratorEmail}>{collaborator.email}</span>
                          </div>
                          <div className={styles.tableCell} style={{ flex: '1' }}>
                            <select
                              className={styles.permissionSelect}
                              value={collaborator.role}
                              disabled={collaborator.role === 'Owner'}
                            >
                              <option value="Owner">Owner</option>
                              <option value="Admin">Admin</option>
                              <option value="Write">Write</option>
                              <option value="Read">Read</option>
                            </select>
                          </div>
                          <div className={styles.tableCell} style={{ width: '48px' }}>
                            {collaborator.role !== 'Owner' && (
                              <button className={styles.removeCollaboratorButton}>×</button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                {selectedBranch?.type !== 'main' && selectedBranch?.type !== 'develop' && (
                  <div className={styles.settingsSection}>
                    <h3 className={styles.settingsTitle} style={{ color: 'var(--cds-text-error)' }}>
                      Danger zone
                    </h3>
                    <div className={styles.dangerZone}>
                      <button className={styles.dangerButton}>
                        Delete this branch
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

        </div>
        </div>
      </InsetLayout>
    </InboxLayoutTemplate>
  );
}