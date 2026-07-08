import { useState, useMemo, useEffect } from "react";
import PageHeader from "../PageHeader";
import PlaceholderContent from "../PlaceholderContent";
import { InsetLayout } from "../SidePanel";
import { Timeline } from "../Timeline";
import { alertEvents } from "../../data/automations/activity-data";
import { useAutomations, useServices, useRecentAutomations } from "../../data/hooks";
import styles from "./MonitorAutomationPage.module.css";

interface MonitorAutomationPageProps {
  automationId?: string;
}

/**
 * MonitorAutomationPage - Monitor view within the Automation Shell
 * 
 * Provides monitoring dashboards and analytics for the decision automation including:
 * - Real-time execution metrics
 * - Performance analytics and KPIs
 * - Error tracking and alerts
 * - Usage statistics and trends
 */
export default function MonitorAutomationPage({ automationId }: MonitorAutomationPageProps) {
  const [activeTab, setActiveTab] = useState("overview");
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

  return (
    <div className={styles.pageContainer} data-name="Monitor Automation Page">
      <PageHeader
        title="Monitor Automation"
        status={{ label: "published", variant: "published" }}
        actions={[
          {
            label: "Export metrics",
            variant: "secondary",
            onClick: () => console.log("Export metrics clicked"),
          },
          {
            label: "Configure alerts",
            variant: "secondary",
            onClick: () => console.log("Configure alerts clicked"),
          },
        ]}
        tabs={[
          {
            id: "overview",
            label: "Overview",
            isActive: activeTab === "overview",
          },
          {
            id: "metrics",
            label: "Performance metrics",
            isActive: activeTab === "metrics",
          },
          {
            id: "errors",
            label: `Errors & alerts ${alertEvents.length > 0 ? `(${alertEvents.length})` : ''}`,
            isActive: activeTab === "errors",
          },
          {
            id: "usage",
            label: "Usage statistics",
            isActive: activeTab === "usage",
          },
        ]}
        onTabChange={handleTabChange}
      />
      
      <InsetLayout>
        <div className={styles.pageContent}>
          {activeTab === "errors" ? (
            <Timeline 
              events={alertEvents}
              emptyMessage="No errors or alerts to display"
            />
          ) : (
            <PlaceholderContent
              title="Monitor Automation Content"
              description="Real-time monitoring, analytics, and performance metrics will be displayed here"
              variant="section"
            />
          )}
        </div>
      </InsetLayout>
    </div>
  );
}