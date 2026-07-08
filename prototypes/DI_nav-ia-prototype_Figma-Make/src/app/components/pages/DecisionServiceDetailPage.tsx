import { useState, useMemo } from "react";
import PageHeader from "../PageHeader";
import DecisionAssetsTable from "../DecisionAssetsTable";
import DataModelsTable from "../DataModelsTable";
import PlaceholderContent from "../PlaceholderContent";
import { InsetLayout } from "../SidePanel";
import styles from "./DecisionServiceDetailPage.module.css";
import { useObjectives } from "../../data/hooks";
import LinkedObjectiveCard from "../LinkedObjectiveCard";

interface DecisionServiceDetailPageProps {
  serviceId: string;
  serviceName: string;
  automationId?: string;
  onAssetClick?: (route: string, serviceId?: string, assetId?: string, assetName?: string, assetType?: string, automationId?: string) => void;
}

/**
 * DecisionServiceDetailPage
 * 
 * Displays the detail view for a Decision Service, including:
 * - Service overview and information
 * - DecisionAssetsTable showing all assets belonging to this service
 * - Service-level actions and controls
 * 
 * This page is shown when a user selects a service from the Decision Services inbox.
 */
export default function DecisionServiceDetailPage({
  serviceId,
  serviceName,
  automationId,
  onAssetClick,
}: DecisionServiceDetailPageProps) {
  const [activeTab, setActiveTab] = useState("assets");
  const { objectives } = useObjectives();

  // Find linked objectives for this service (via automationId)
  const linkedObjectives = useMemo(() => {
    if (!automationId) return [];
    return objectives.filter(obj => obj.automationIds.includes(automationId));
  }, [objectives, automationId]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className={styles.pageContainer} data-name="Decision Service Detail Page">
      <PageHeader
        title={serviceName}
        status={{ label: "published", variant: "published" }}
        actions={[
          {
            label: "Edit service",
            variant: "primary",
            onClick: () => console.log("Edit service clicked"),
          },
          {
            label: "Deploy",
            variant: "secondary",
            onClick: () => console.log("Deploy clicked"),
          },
        ]}
        tabs={[
          {
            id: "assets",
            label: "Service assets",
            isActive: activeTab === "assets",
          },
          {
            id: "data",
            label: "Data Models",
            isActive: activeTab === "data",
          },
          {
            id: "overview",
            label: "Overview",
            isActive: activeTab === "overview",
          },
          {
            id: "configuration",
            label: "Configuration",
            isActive: activeTab === "configuration",
          },
          {
            id: "linked-objectives",
            label: "Linked Objectives",
            isActive: activeTab === "linked-objectives",
          },
        ]}
        onTabChange={handleTabChange}
      />
      
      <InsetLayout>
        <div className={styles.pageContent}>
          {activeTab === "assets" ? (
            <DecisionAssetsTable 
              onAssetClick={onAssetClick} 
              automationId={automationId || serviceId}
              serviceId={serviceId}
            />
          ) : activeTab === "data" ? (
            <DataModelsTable 
              automationId={automationId || serviceId}
              serviceId={serviceId}
            />
          ) : activeTab === "linked-objectives" ? (
            <div className={styles.linkedObjectivesTab}>
              {linkedObjectives.length > 0 ? (
                <>
                  <div className={styles.linkedObjectivesHeader}>
                    <h2 className={styles.linkedObjectivesTitle}>
                      Business Objectives Supported by This Service
                    </h2>
                    <p className={styles.linkedObjectivesDescription}>
                      This service contributes to the following business objectives through its parent automation.
                    </p>
                  </div>
                  <div className={styles.linkedObjectivesList}>
                    {linkedObjectives.map((objective) => (
                      <LinkedObjectiveCard 
                        key={objective.id} 
                        objective={objective}
                        onClick={(objectiveId) => console.log('Navigate to objective:', objectiveId)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className={styles.emptyState}>
                  <h3 className={styles.emptyStateTitle}>No linked objectives</h3>
                  <p className={styles.emptyStateText}>
                    This service is not currently linked to any business objectives. Link objectives to track how this service contributes to organizational goals.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <PlaceholderContent
              title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Content`}
              description={`Service ${activeTab} information will be displayed here`}
              variant="section"
            />
          )}
        </div>
      </InsetLayout>
    </div>
  );
}


