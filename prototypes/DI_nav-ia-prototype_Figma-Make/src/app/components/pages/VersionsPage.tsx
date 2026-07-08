import { useState, useMemo } from "react";
import PageHeader from "../PageHeader";
import { InsetLayout } from "../SidePanel";
import { VersionList } from "../VersionList";
import { VersionDiffViewer } from "../VersionDiffViewer";
import { Modal } from "../Modal";
import { getVersionHistory } from "../../data/automations/versions-data";
import styles from "./VersionsPage.module.css";

/**
 * VersionsPage - Version management view within the Automation Shell
 * 
 * Manages automation versions including:
 * - Version history and timeline
 * - Version comparison
 * - Release notes
 * - Version tagging and promotion
 */
export default function VersionsPage() {
  const [activeTab, setActiveTab] = useState("all-versions");
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

  const handleViewDiff = (assetId: string, versionId: string) => {
    // Mock asset data - in real app would fetch from data layer
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
    // Would implement version comparison logic
  };

  const handleRollback = (versionId: string) => {
    console.log('Rollback to version:', versionId);
    // Would implement rollback logic
  };

  // Get all versions
  const allVersions = useMemo(() => {
    // Using automation-6-24-20 as example - in real app, would use current automation ID
    return getVersionHistory('automation-6-24-20', 'branch-main');
  }, []);

  // Filter versions based on active tab
  const filteredVersions = useMemo(() => {
    switch (activeTab) {
      case 'all-versions':
        return allVersions;
      case 'published':
        // Filter for deployed/published versions
        return allVersions.filter(v => 
          v.snapshot && 'status' in v.snapshot && v.snapshot.status === 'deployed'
        );
      case 'drafts':
        // Filter for draft versions
        return allVersions.filter(v => 
          v.snapshot && 'status' in v.snapshot && v.snapshot.status === 'draft'
        );
      case 'archived':
        // Filter for archived versions (none in mock data currently)
        return allVersions.filter(v => 
          v.tags && v.tags.includes('archived')
        );
      default:
        return allVersions;
    }
  }, [activeTab, allVersions]);

  return (
    <div className={styles.pageContainer} data-name="Versions Page">
      <PageHeader
        title="Versions"
        actions={[
          {
            label: "Create version",
            variant: "primary",
            onClick: () => console.log("Create version clicked"),
          },
          {
            label: "Compare versions",
            variant: "secondary",
            onClick: () => console.log("Compare versions clicked"),
          },
        ]}
        tabs={[
          {
            id: "all-versions",
            label: "All versions",
            isActive: activeTab === "all-versions",
          },
          {
            id: "published",
            label: "Published",
            isActive: activeTab === "published",
          },
          {
            id: "drafts",
            label: "Drafts",
            isActive: activeTab === "drafts",
          },
          {
            id: "archived",
            label: "Archived",
            isActive: activeTab === "archived",
          },
        ]}
        onTabChange={handleTabChange}
      />
      
      <InsetLayout>
        <div className={styles.pageContent}>
          <VersionList
            versions={filteredVersions}
            emptyMessage={`No ${activeTab.replace('-', ' ')} found`}
            onViewDiff={handleViewDiff}
            onCompareVersions={handleCompareVersions}
            onRollback={handleRollback}
          />
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

// Mock content for diff viewer demo
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
    },
    {
      "id": "rule-3",
      "condition": "income > 50000",
      "action": "MANUAL_REVIEW",
      "priority": 3
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
      "id": "rule-3",
      "condition": "income > 60000",
      "action": "MANUAL_REVIEW",
      "priority": 3
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