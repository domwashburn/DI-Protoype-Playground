import { useState, useMemo, useEffect } from "react";
import PageHeader from "../PageHeader";
import { InsetLayout } from "../SidePanel";
import { Timeline } from "../Timeline";
import type { TimelineEvent } from "../Timeline/types";
import { 
  activityEvents, 
  getAllEvents,
  getDeploymentEventsForAutomation
} from "../../data/automations/activity-data";
import { useAutomations, useServices, useRecentAutomations } from "../../data/hooks";
import styles from "./HistoryPage.module.css";

interface HistoryPageProps {
  automationId?: string;
}

/**
 * HistoryPage - History view within the Automation Shell
 * 
 * Shows chronological history of changes, deployments, and updates
 * to the decision automation including:
 * - Version changes
 * - Deployment history  
 * - Configuration updates
 * - User actions and timestamps
 */
export default function HistoryPage({ automationId = 'automation-6-24-20' }: HistoryPageProps) {
  const [activeTab, setActiveTab] = useState("all");
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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Filter events based on active tab (excluding alerts and recommendations)
  const filteredEvents = useMemo(() => {
    switch (activeTab) {
      case 'all':
        return getAllEvents(automationId).filter(e => e.type !== 'alert' && e.type !== 'recommendation');
      case 'changes':
        return activityEvents.filter(e => e.type === 'change');
      case 'deployments':
        return getDeploymentEventsForAutomation(automationId);
      default:
        return getAllEvents(automationId).filter(e => e.type !== 'alert' && e.type !== 'recommendation');
    }
  }, [activeTab, automationId]);

  return (
    <div className={styles.pageContainer} data-name="History Page">
      <PageHeader
        title="History"
        actions={[
          {
            label: "Export history",
            variant: "secondary",
            onClick: () => console.log("Export history clicked"),
          },
        ]}
        tabs={[
          {
            id: "all",
            label: "All activity",
            isActive: activeTab === "all",
          },
          {
            id: "changes",
            label: "Changes",
            isActive: activeTab === "changes",
          },
          {
            id: "deployments",
            label: "Deployments",
            isActive: activeTab === "deployments",
          },
        ]}
        onTabChange={handleTabChange}
      />
      
      <InsetLayout>
        <div className={styles.pageContent}>
          <Timeline 
            events={filteredEvents}
            emptyMessage={`No ${activeTab} events found`}
          />
        </div>
      </InsetLayout>
    </div>
  );
}