import { useState } from "react";
import DecisionServiceAssetDetailsPage from "./DecisionServiceAssetDetailsPage";
import PlaceholderContent from "../PlaceholderContent";
import { serviceAssetPanelGroups } from "./serviceAssetPanelGroups";

interface PredictiveModelPageProps {
  assetId: string;
  assetName: string;
}

/**
 * PredictiveModelPage - Detail view for Predictive Model assets
 * 
 * Displays information and controls for a specific Predictive Model including:
 * - Model training data and features
 * - Predictions and accuracy metrics
 * - Model versioning
 * - Deployment status
 */
export default function PredictiveModelPage({ assetId, assetName }: PredictiveModelPageProps) {
  const [activeTab, setActiveTab] = useState("build");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <DecisionServiceAssetDetailsPage
      assetId={assetId}
      assetName={assetName}
      assetType="Predictive Model"
      headerConfig={{
        title: assetName,
        status: { label: "published", variant: "published" },
        actions: [
          {
            label: "Retrain model",
            variant: "primary",
            onClick: () => console.log("Retrain model clicked"),
          },
          {
            label: "Export",
            variant: "secondary",
            onClick: () => console.log("Export clicked"),
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
        title="Predictive Model Content"
        description="Model features, training data, and performance metrics will be displayed here"
        variant="section"
      />
    </DecisionServiceAssetDetailsPage>
  );
}
