import { useState } from "react";
import PageHeader from "../PageHeader";
import PlaceholderContent from "../PlaceholderContent";
import { InsetLayout } from "../SidePanel";
import styles from "./AutomationSettingsPage.module.css";

/**
 * AutomationSettingsPage - Settings view within the Automation Shell
 * 
 * Manages automation settings including:
 * - General configuration
 * - Permissions and access control
 * - Integration settings
 * - Advanced options
 */
export default function AutomationSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className={styles.pageContainer} data-name="Automation Settings Page">
      <PageHeader
        title="Automation Settings"
        actions={[
          {
            label: "Save changes",
            variant: "primary",
            onClick: () => console.log("Save changes clicked"),
          },
        ]}
        tabs={[
          {
            id: "general",
            label: "General",
            isActive: activeTab === "general",
          },
          {
            id: "permissions",
            label: "Permissions",
            isActive: activeTab === "permissions",
          },
          {
            id: "integrations",
            label: "Integrations",
            isActive: activeTab === "integrations",
          },
          {
            id: "advanced",
            label: "Advanced",
            isActive: activeTab === "advanced",
          },
        ]}
        onTabChange={handleTabChange}
      />
      
      <InsetLayout>
        <div className={styles.pageContent}>
          <PlaceholderContent
            title="Settings Content"
            description="Automation configuration and settings will be displayed here"
            variant="section"
          />
        </div>
      </InsetLayout>
    </div>
  );
}
