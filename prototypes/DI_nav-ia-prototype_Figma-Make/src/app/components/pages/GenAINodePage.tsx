import { useState } from "react";
import DecisionServiceAssetDetailsPage from "./DecisionServiceAssetDetailsPage";
import PlaceholderContent from "../PlaceholderContent";
import { serviceAssetPanelGroups } from "./serviceAssetPanelGroups";

interface GenAINodePageProps {
  assetId: string;
  assetName: string;
}

/**
 * GenAINodePage - Detail view for GenAI Node assets
 * 
 * Displays information and controls for a specific GenAI Node including:
 * - AI model configuration
 * - Prompt templates
 * - Response handling
 * - Usage analytics
 */
export default function GenAINodePage({ assetId, assetName }: GenAINodePageProps) {
  const [activeTab, setActiveTab] = useState("build");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <DecisionServiceAssetDetailsPage
      assetId={assetId}
      assetName={assetName}
      assetType="GenAI Node"
      headerConfig={{
        title: assetName,
        status: { label: "published", variant: "published" },
        actions: [
          {
            label: "Edit configuration",
            variant: "primary",
            onClick: () => console.log("Edit configuration clicked"),
          },
          {
            label: "Test",
            variant: "secondary",
            onClick: () => console.log("Test clicked"),
          },
        ],
        tabs: [
          { id: "build", label: "Build", isActive: activeTab === "build" },
          { id: "test-cases", label: "Test Cases", isActive: activeTab === "test-cases", disabled: true },
        ],
        onTabChange: handleTabChange,
        panelGroups: serviceAssetPanelGroups,
      }}
    >
      <PlaceholderContent
        title="GenAI Node Content"
        description="AI model configuration, prompt templates, and analytics will be displayed here"
        variant="section"
      />
    </DecisionServiceAssetDetailsPage>
  );
}
