import { useState } from "react";
import type { Node } from "reactflow";
import DecisionServiceAssetDetailsPage from "./DecisionServiceAssetDetailsPage";
import PlaceholderContent from "../PlaceholderContent";
import { serviceAssetPanelGroups } from "./serviceAssetPanelGroups";
import {
  DecisionModelCanvas,
  NodeDetailsPanel,
  pricingNodes,
  pricingEdges,
  type DmnNodeData,
} from "../DecisionModelCanvas";
import { usePanelManager } from "../SidePanel";

function BuildCanvas() {
  const { openPanel, closePanel, isMainPanelOpen, currentMainPanel } = usePanelManager();

  const handleNodeSelect = (node: Node<DmnNodeData> | null) => {
    if (!node) {
      closePanel();
      return;
    }
    openPanel({
      content: <NodeDetailsPanel node={node} />,
      level: 'section',
      pattern: 'overlay',
      width: 'standard',
      id: `dmn-node-${node.id}`,
    });
  };

  // The canvas only needs to compensate (shift the cluster + recentre the
  // graph) when the panel actually OVERLAYS the canvas. For inset panels,
  // the surrounding layout already shrinks the canvas around the panel, so
  // applying our own shift on top would double-up.
  const isCanvasPanelOpen =
    isMainPanelOpen && currentMainPanel?.pattern === 'overlay';

  return (
    <DecisionModelCanvas
      nodes={pricingNodes}
      edges={pricingEdges}
      onNodeSelect={handleNodeSelect}
      panelOpen={isCanvasPanelOpen}
    />
  );
}

interface DecisionModelPageProps {
  assetId: string;
  assetName: string;
}

/**
 * DecisionModelPage — Detail view for Decision Model assets.
 *
 * The "Build" tab renders the React Flow-powered DecisionModelCanvas. Selected
 * nodes surface in the page-level inset detail panel, mirroring the Resource
 * Hub inspection pattern.
 */
export default function DecisionModelPage({ assetId, assetName }: DecisionModelPageProps) {
  const [activeTab, setActiveTab] = useState("build");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <DecisionServiceAssetDetailsPage
      assetId={assetId}
      assetName={assetName}
      assetType="Decision Model"
      headerConfig={{
        title: assetName,
        status: { label: "published", variant: "published" },
        actions: [
          {
            label: "Edit model",
            variant: "primary",
            onClick: () => console.log("Edit model clicked"),
          },
          {
            label: "Test",
            variant: "secondary",
            onClick: () => console.log("Test clicked"),
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
      {activeTab === "build" ? (
        <BuildCanvas />
      ) : (
        <PlaceholderContent
          title="Test Cases"
          description="Define and run test cases for this decision model"
          variant="section"
        />
      )}
    </DecisionServiceAssetDetailsPage>
  );
}
