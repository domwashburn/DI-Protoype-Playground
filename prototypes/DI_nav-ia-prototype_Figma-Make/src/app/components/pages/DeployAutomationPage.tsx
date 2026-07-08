import { useState, useMemo, useEffect } from "react";
import PageHeader from "../PageHeader";
import PlaceholderContent from "../PlaceholderContent";
import { InsetLayout } from "../SidePanel";
import { Timeline } from "../Timeline";
import { VersionList } from "../VersionList";
import { VersionDiffViewer } from "../VersionDiffViewer";
import { UndeployedChangesItem } from "../UndeployedChangesItem";
import { EnvironmentsList } from "../EnvironmentsList";
import { Modal } from "../Modal";
import { getDeploymentEventsForAutomation } from "../../data/automations/activity-data";
import { getVersionHistory, getUndeployedChanges } from "../../data/automations/versions-data";
import { getEnvironmentsForAutomation } from "../../data/automations/environments-data";
import { useAutomations, useServices, useRecentAutomations } from "../../data/hooks";
import styles from "./DeployAutomationPage.module.css";

interface DeployAutomationPageProps {
  automationId?: string;
}

/**
 * DeployAutomationPage - Deploy view within the Automation Shell
 * 
 * Manages decision automation deployments including:
 * - Deployment targets and environments
 * - Configuration settings
 * - Deployment history and rollback
 * - Release notes and versioning
 */
export default function DeployAutomationPage({ automationId = 'automation-6-24-20' }: DeployAutomationPageProps) {
  const [activeTab, setActiveTab] = useState("updates");
  const { getAutomationById } = useAutomations();
  const { services } = useServices();
  const { trackAutomationAccess } = useRecentAutomations();

  // Get automation data
  const automationData = automationId ? getAutomationById(automationId) : null;

  // Calculate service count
  const serviceCount = useMemo(() => {
    if (!automationId) return 0;
    return services.filter(s => s.automationId === automationId).length;
  }, [automationId, services]);

  // Track automation access when page loads
  useEffect(() => {
    if (automationData) {
      trackAutomationAccess({
        id: automationData.id,
        name: automationData.displayName || automationData.name,
        description: automationData.description || 'Decision automation',
        serviceCount: `${serviceCount} decision service${serviceCount !== 1 ? 's' : ''}`
      });
    }
  }, [automationData, serviceCount, trackAutomationAccess]);

  const [versionsSubTab, setVersionsSubTab] = useState("all-versions");
  const [diffModalOpen, setDiffModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<{
    assetId: string;
    assetName: string;
    assetType: string;
    versionId: string;
  } | null>(null);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleVersionsSubTabChange = (tabId: string) => {
    setVersionsSubTab(tabId);
  };

  const handleViewDiff = (assetId: string, versionId: string) => {
    setSelectedAsset({
      assetId,
      assetName: 'Credit Scoring Decision Model',
      assetType: 'Decision Model',
      versionId,
    });
    setDiffModalOpen(true);
  };

  const handleCompareVersions = (versionId: string) => {
    console.log('Compare versions:', versionId);
  };

  const handleRollback = (versionId: string) => {
    console.log('Rollback to version:', versionId);
  };

  const handleDeploy = () => {
    console.log('Deploy un-deployed changes');
  };

  // Get deployment events specific to this automation
  const automationDeploymentEvents = useMemo(() => {
    return getDeploymentEventsForAutomation(automationId);
  }, [automationId]);

  // Get deployment timeline events
  const deploymentTimeline = useMemo(() => {
    return automationDeploymentEvents;
  }, [automationDeploymentEvents]);

  // Get all versions for all-versions tab
  const allVersions = useMemo(() => {
    const versions = getVersionHistory(automationId, 'branch-main');
    console.log(`All versions for ${automationId}:`, versions);
    console.log('Version count:', versions.length);
    versions.forEach(v => console.log(`  - ${v.version} (${v.id})`));
    return versions;
  }, [automationId]);

  // Filter versions based on sub-tab
  const filteredVersions = useMemo(() => {
    switch (versionsSubTab) {
      case 'all-versions':
        return allVersions;
      case 'published':
        return allVersions.filter(v => 
          v.snapshot && 'status' in v.snapshot && v.snapshot.status === 'deployed'
        );
      case 'drafts':
        return allVersions.filter(v => 
          v.snapshot && 'status' in v.snapshot && v.snapshot.status === 'draft'
        );
      case 'archived':
        return allVersions.filter(v => 
          v.tags && v.tags.includes('archived')
        );
      default:
        return allVersions;
    }
  }, [versionsSubTab, allVersions]);

  // Get version history for releases tab (with undeployed changes)
  const versions = useMemo(() => {
    return getVersionHistory(automationId, 'branch-main');
  }, [automationId]);

  // Get undeployed changes
  const undeployedData = useMemo(() => {
    return getUndeployedChanges(automationId);
  }, [automationId]);

  // Get environments with automation-specific deployment data
  const environmentsData = useMemo(() => {
    return getEnvironmentsForAutomation(automationId);
  }, [automationId]);

  return (
    <div className={styles.pageContainer} data-name="Deploy Automation Page">
      <PageHeader
        title="Deploy Automation"
        status={{ label: "published", variant: "published" }}
        actions={[
          {
            label: "Deploy now",
            variant: "primary",
            onClick: () => console.log("Deploy clicked"),
          },
          {
            label: "Schedule deployment",
            variant: "secondary",
            onClick: () => console.log("Schedule deployment clicked"),
          },
        ]}
        tabs={[
          {
            id: "updates",
            label: "Updates",
            isActive: activeTab === "updates",
          },
          {
            id: "all-versions",
            label: "All versions",
            isActive: activeTab === "all-versions",
          },
          {
            id: "environments",
            label: "Environments",
            isActive: activeTab === "environments",
          },
          {
            id: "history",
            label: "Deployment history",
            isActive: activeTab === "history",
          },
          {
            id: "configuration",
            label: "Configuration",
            isActive: activeTab === "configuration",
          },
          {
            id: "releases",
            label: "Releases",
            isActive: activeTab === "releases",
          },
        ]}
        onTabChange={handleTabChange}
      />
      
      <InsetLayout>
        <div className={styles.pageContent}>
          {/* Updates Tab - Shows undeployed changes */}
          {activeTab === 'updates' && (
            <div className={styles.updatesTabContent}>
              <UndeployedChangesItem
                lastDeployedVersion={undeployedData.lastDeployedVersion}
                publishedChanges={undeployedData.publishedChanges}
                draftChanges={undeployedData.draftChanges}
                totalAssetsChanged={undeployedData.totalAssetsChanged}
                onViewDiff={handleViewDiff}
                onCompareVersions={handleCompareVersions}
                onDeploy={handleDeploy}
              />
            </div>
          )}

          {/* All Versions Tab - Shows complete version list */}
          {activeTab === 'all-versions' && (
            <VersionList
              versions={allVersions}
              emptyMessage="No versions found"
              onViewDiff={handleViewDiff}
              onCompareVersions={handleCompareVersions}
              onRollback={handleRollback}
            />
          )}

          {/* Environments Tab */}
          {activeTab === 'environments' && (
            <EnvironmentsList environments={environmentsData} />
          )}

          {/* Deployment History Tab - Shows deployment timeline */}
          {activeTab === 'history' && (
            <Timeline 
              events={deploymentTimeline}
              emptyMessage="No deployment history found"
            />
          )}

          {/* Configuration Tab */}
          {activeTab === 'configuration' && (
            <PlaceholderContent
              title="Deployment Configuration"
              description="Deployment settings, rollback policies, and environment variables"
              variant="section"
            />
          )}

          {/* Releases Tab - Shows version list with undeployed changes */}
          {activeTab === 'releases' && (
            <VersionList
              versions={versions}
              emptyMessage="No releases found"
              showUndeployedChanges={true}
              undeployedData={undeployedData}
              onViewDiff={handleViewDiff}
              onCompareVersions={handleCompareVersions}
              onRollback={handleRollback}
              onDeploy={handleDeploy}
            />
          )}
        </div>
      </InsetLayout>

      {/* Diff Viewer Modal */}
      {diffModalOpen && selectedAsset && (
        <Modal
          isOpen={diffModalOpen}
          onClose={() => setDiffModalOpen(false)}
          title="View Diff"
          size="large"
        >
          <VersionDiffViewer
            assetName={selectedAsset.assetName}
            assetType={selectedAsset.assetType}
            oldVersion="1.0.0"
            newVersion="1.1.0"
            oldContent={mockOldContent}
            newContent={mockNewContent}
            onClose={() => setDiffModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

// Mock content for diff viewer
const mockOldContent = `{
  "name": "Credit Scoring Decision Model",
  "version": "1.0.0",
  "rules": [
    {
      "id": "rule-1",
      "condition": "creditScore > 700",
      "action": "APPROVE",
      "priority": 1
    },
    {
      "id": "rule-2",
      "condition": "creditScore < 600",
      "action": "DENY",
      "priority": 2
    }
  ],
  "thresholds": {
    "minimum": 600,
    "recommended": 700
  }
}`;

const mockNewContent = `{
  "name": "Credit Scoring Decision Model",
  "version": "1.1.0",
  "rules": [
    {
      "id": "rule-1",
      "condition": "creditScore > 720",
      "action": "APPROVE",
      "priority": 1
    },
    {
      "id": "rule-2",
      "condition": "creditScore < 580",
      "action": "DENY",
      "priority": 2
    },
    {
      "id": "rule-4",
      "condition": "debtToIncome < 0.4",
      "action": "APPROVE",
      "priority": 4
    }
  ],
  "thresholds": {
    "minimum": 580,
    "recommended": 720,
    "debtToIncomeMax": 0.4
  }
}`;