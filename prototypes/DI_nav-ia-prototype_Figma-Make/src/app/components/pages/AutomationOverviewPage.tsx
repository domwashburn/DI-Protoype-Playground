import { useState, useMemo, useEffect } from "react";
import PageHeader from "../PageHeader";
import PlaceholderContent from "../PlaceholderContent";
import { InsetLayout } from "../SidePanel";
import styles from "./AutomationOverviewPage.module.css";
import { useObjectives, useAutomations, useServices, useRecentAutomations } from "../../data/hooks";
import LinkedObjectiveCard from "../LinkedObjectiveCard";
import CardGrid from "../CardLayout/CardGrid";

interface AutomationOverviewPageProps {
  onAssetClick?: (route: string, automationId?: string, assetId?: string, assetName?: string, assetType?: string) => void;
  automationId?: string;
  onNavigate?: (objectiveId: string) => void;
}

/**
 * AutomationOverviewPage - Overview view within the Automation Shell
 * 
 * Displays high-level information about the decision automation including:
 * - Automation summary and description
 * - Key metrics and status
 * - Recent activity
 * - Quick actions and links
 */
export default function AutomationOverviewPage({ onAssetClick, automationId, onNavigate }: AutomationOverviewPageProps) {
  const [activeTab, setActiveTab] = useState("summary");
  const { objectives } = useObjectives();
  const { automations } = useAutomations();
  const { services } = useServices();
  const { trackAutomationAccess } = useRecentAutomations();

  // Find the current automation
  const currentAutomation = useMemo(() => {
    return automations.find(auto => auto.id === automationId);
  }, [automations, automationId]);

  // Calculate service count for this automation
  const serviceCount = useMemo(() => {
    if (!automationId) return 0;
    return services.filter(s => s.automationId === automationId).length;
  }, [automationId, services]);

  // Track automation access when page loads
  useEffect(() => {
    if (currentAutomation) {
      trackAutomationAccess({
        id: currentAutomation.id,
        name: currentAutomation.displayName || currentAutomation.name,
        description: currentAutomation.description || 'Decision automation',
        serviceCount: `${serviceCount} decision service${serviceCount !== 1 ? 's' : ''}`
      });
    }
  }, [currentAutomation, serviceCount, trackAutomationAccess]);

  // Find linked objectives for this automation
  const linkedObjectives = useMemo(() => {
    if (!automationId) return [];
    return objectives.filter(obj => obj.automationIds.includes(automationId));
  }, [objectives, automationId]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className={styles.pageContainer} data-name="Automation Overview Page">
      <PageHeader
        title="Automation Overview"
        status={{ label: "published", variant: "published" }}
        actions={[
          {
            label: "Edit automation",
            variant: "primary",
            onClick: () => console.log("Edit automation clicked"),
          },
          {
            label: "Export",
            variant: "secondary",
            onClick: () => console.log("Export clicked"),
          },
        ]}
        tabs={[
          {
            id: "summary",
            label: "Summary",
            isActive: activeTab === "summary",
          },
          {
            id: "activity",
            label: "Recent activity",
            isActive: activeTab === "activity",
          },
          {
            id: "metrics",
            label: "Key metrics",
            isActive: activeTab === "metrics",
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
          {activeTab === "linked-objectives" ? (
            <div className={styles.linkedObjectivesTab}>
              {linkedObjectives.length > 0 ? (
                <>
                  <div className={styles.linkedObjectivesHeader}>
                    <h2 className={styles.linkedObjectivesTitle}>
                      Business Objectives Supported by This Automation
                    </h2>
                    <p className={styles.linkedObjectivesDescription}>
                      This automation contributes to the following business objectives.
                    </p>
                  </div>
                  <CardGrid viewMode="grid">
                    {linkedObjectives.map((objective) => (
                      <LinkedObjectiveCard 
                        key={objective.id} 
                        objective={objective}
                        onClick={(objectiveId) => {
                          if (onNavigate) {
                            onNavigate(objectiveId);
                          }
                        }}
                      />
                    ))}
                  </CardGrid>
                </>
              ) : (
                <div className={styles.emptyState}>
                  <h3 className={styles.emptyStateTitle}>No linked objectives</h3>
                  <p className={styles.emptyStateText}>
                    This automation is not currently linked to any business objectives. Link objectives to track how this automation contributes to organizational goals.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <PlaceholderContent
              title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Content`}
              description={`Automation ${activeTab} information will be displayed here`}
              variant="section"
            />
          )}
        </div>
      </InsetLayout>
    </div>
  );
}