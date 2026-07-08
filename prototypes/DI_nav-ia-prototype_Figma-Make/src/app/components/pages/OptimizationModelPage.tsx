import { useState } from "react";
import DecisionServiceAssetDetailsPage from "./DecisionServiceAssetDetailsPage";
import PlaceholderContent from "../PlaceholderContent";
import { serviceAssetPanelGroups } from "./serviceAssetPanelGroups";

interface OptimizationModelPageProps {
  assetId: string;
  assetName: string;
}

/**
 * OptimizationModelPage - Detail view for Optimization Model assets
 * 
 * Displays information and controls for a specific Optimization Model including:
 * - Objective functions and constraints
 * - Optimization parameters
 * - Solution history
 * - Performance analysis
 */
export default function OptimizationModelPage({ assetId, assetName }: OptimizationModelPageProps) {
  const [activeTab, setActiveTab] = useState("build");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <DecisionServiceAssetDetailsPage
      assetId={assetId}
      assetName={assetName}
      assetType="Optimization Model"
      headerConfig={{
        title: assetName,
        status: { label: "deployed", variant: "deployed" },
        actions: [
          {
            label: "Run optimization",
            variant: "primary",
            onClick: () => console.log("Run optimization clicked"),
          },
          {
            label: "Configure",
            variant: "secondary",
            onClick: () => console.log("Configure clicked"),
          },
        ],
        tabs: [
          { id: "build", label: "Build", isActive: activeTab === "build" },
          { id: "test-cases", label: "Test Cases", isActive: activeTab === "test-cases" },
        ],
        onTabChange: handleTabChange,
        panelGroups: serviceAssetPanelGroups,
      }}
    >
      <PlaceholderContent
        title="Optimization Model Content"
        description="Objective functions, constraints, and optimization results will be displayed here"
        variant="section"
      />
    </DecisionServiceAssetDetailsPage>
  );
}
