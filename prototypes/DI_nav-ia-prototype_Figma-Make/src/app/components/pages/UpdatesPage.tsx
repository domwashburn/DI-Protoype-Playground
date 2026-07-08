import { useState, useMemo } from "react";
import PageHeader from "../PageHeader";
import { InsetLayout } from "../SidePanel";
import { Timeline } from "../Timeline";
import {
  notificationEvents,
  recommendationEvents,
  systemUpdateEvents,
} from "../../data/automations/activity-data";
import styles from "./UpdatesPage.module.css";

/**
 * UpdatesPage - Updates view within the Automation Shell
 * 
 * Shows recent updates, notifications, and alerts related to
 * the decision automation including:
 * - System updates
 * - Recommended improvements
 * - Version updates available
 * - Alerts and warnings
 * - Suggested optimizations
 */
export default function UpdatesPage() {
  const [activeTab, setActiveTab] = useState("notifications");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Filter events based on active tab
  const filteredEvents = useMemo(() => {
    switch (activeTab) {
      case 'notifications':
        return notificationEvents;
      case 'recommendations':
        return recommendationEvents;
      case 'system':
        return systemUpdateEvents;
      default:
        return notificationEvents;
    }
  }, [activeTab]);

  // Count unread items (for demonstration, marking all as unread)
  const unreadCount = filteredEvents.length;

  return (
    <div className={styles.pageContainer} data-name="Updates Page">
      <PageHeader
        title="Updates"
        actions={[
          {
            label: "Mark all as read",
            variant: "secondary",
            onClick: () => console.log("Mark all as read clicked"),
            disabled: unreadCount === 0,
          },
        ]}
        tabs={[
          {
            id: "notifications",
            label: `Notifications ${notificationEvents.length > 0 ? `(${notificationEvents.length})` : ''}`,
            isActive: activeTab === "notifications",
          },
          {
            id: "recommendations",
            label: `Recommendations ${recommendationEvents.length > 0 ? `(${recommendationEvents.length})` : ''}`,
            isActive: activeTab === "recommendations",
          },
          {
            id: "system",
            label: "System updates",
            isActive: activeTab === "system",
          },
        ]}
        onTabChange={handleTabChange}
      />
      
      <InsetLayout>
        <div className={styles.pageContent}>
          <Timeline 
            events={filteredEvents}
            emptyMessage={`No ${activeTab} to display`}
          />
        </div>
      </InsetLayout>
    </div>
  );
}
