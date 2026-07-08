import { useState, useMemo, useEffect } from 'react';
import DecisionServiceAssetDetailsPage from "./DecisionServiceAssetDetailsPage";
import PlaceholderContent from "../PlaceholderContent";
import { InsetPanel, InsetPanelHeader, InsetPanelToolbar } from "../InsetPanel";
import { TreeView, TreeNode as CarbonTreeNode } from '@carbon/react';
import { Folder, Document, Search, Grid, List, Menu, Code } from "@carbon/icons-react";
import { useSubAssets } from "../../data/hooks";
import { serviceAssetPanelGroups } from "./serviceAssetPanelGroups";
import type { Asset } from "../../data/automations";

interface TaskModelPageProps {
  assetId: string;
  assetName: string;
  initialSelectedSubAssetId?: string;
}

/** Stable icon wrapper components for Carbon TreeNode renderIcon. */
const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => <Folder size={16} {...(props as any)} />;
const DocumentIcon = (props: React.SVGProps<SVGSVGElement>) => <Document size={16} {...(props as any)} />;

/** Local tree node shape used by buildTreeFromAssets. */
interface TreeNodeData {
  id: string;
  label: string;
  type: 'folder' | 'item';
  renderIcon?: React.ComponentType<any>;
  children?: TreeNodeData[];
}

/**
 * Builds a tree structure from assets with folder paths
 */
function buildTreeFromAssets(assets: Asset[]): TreeNodeData[] {
  const tree: TreeNodeData[] = [];
  const folderMap = new Map<string, TreeNodeData>();

  // Sort assets by location to ensure consistent tree building
  const sortedAssets = [...assets].sort((a, b) => {
    const locA = a.location || '';
    const locB = b.location || '';
    return locA.localeCompare(locB);
  });

  sortedAssets.forEach(asset => {
    const path = asset.location || '/';
    const parts = path.split('/').filter(Boolean);

    let currentPath = '';
    let parentNode: TreeNodeData[] = tree;

    // Build folder structure
    parts.forEach((part) => {
      currentPath += `/${part}`;

      if (!folderMap.has(currentPath)) {
        const folderNode: TreeNodeData = {
          id: `folder-${currentPath}`,
          label: part,
          type: 'folder',
          renderIcon: FolderIcon,
          children: [],
        };

        parentNode.push(folderNode);
        folderMap.set(currentPath, folderNode);
      }

      const folderNode = folderMap.get(currentPath)!;
      parentNode = folderNode.children || [];
    });

    // Add the asset as a leaf node
    const assetNode: TreeNodeData = {
      id: asset.id,
      label: asset.displayName || asset.name,
      type: 'item',
      renderIcon: DocumentIcon,
    };

    parentNode.push(assetNode);
  });

  return tree;
}

/** Recursively renders Carbon TreeNode components from our TreeNodeData. */
function renderCarbonTreeNodes(nodes: TreeNodeData[]): React.ReactNode {
  return nodes.map((node) => (
    <CarbonTreeNode
      key={node.id}
      id={node.id}
      label={node.label}
      renderIcon={node.renderIcon}
      isExpanded={node.type === 'folder'}
    >
      {node.children && node.children.length > 0
        ? renderCarbonTreeNodes(node.children)
        : null}
    </CarbonTreeNode>
  ));
}

/**
 * TaskModelPage - Detail view for Task Model assets
 * 
 * Displays information and controls for a specific Task Model including:
 * - Workflow configuration
 * - Task dependencies
 * - Execution history
 * - Performance metrics
 * 
 * Uses a left panel layout for task navigation.
 * 
 * **Now powered by the centralized data layer!**
 * - Uses useTaskModelCounts hook for real count data
 * - Uses useSubAssets hook to fetch artifacts, functions, and ruleflows
 */
export default function TaskModelPage({ assetId, assetName, initialSelectedSubAssetId }: TaskModelPageProps) {
  const [activeTab, setActiveTab] = useState("build");
  const [selectedItem, setSelectedItem] = useState<string | undefined>(initialSelectedSubAssetId);

  // Get sub-assets for this task model
  const { assets: subAssets } = useSubAssets(assetId);
  
  // Set the active tab based on the initial selected sub-asset type
  useEffect(() => {
    if (!initialSelectedSubAssetId) return;
    
    setActiveTab("build");
  }, [initialSelectedSubAssetId, subAssets]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedItem(undefined); // Reset selection when changing tabs
  };

  // Build tree structure for artifacts tab (only ruleflows, decision-tables, and business rules)
  // Data models are not part of task models and belong in the Data tab
  const artifactsTree = useMemo(() => {
    const artifactAssets = subAssets.filter(asset => 
      asset.type === 'ruleflow' || 
      asset.type === 'decision-table' || 
      asset.type === 'rule'
    );
    return buildTreeFromAssets(artifactAssets);
  }, [subAssets]);

  // Get functions list for functions tab (flat list, no folder structure)
  const functionsList = useMemo(() => {
    return subAssets.filter(asset => asset.type === 'function');
  }, [subAssets]);

  // Render left panel content based on active tab
  const renderLeftPanel = () => {
    if (activeTab === "artifacts") {
      return (
        <InsetPanel
          header={<InsetPanelHeader title="Artifacts" />}
          toolbar={
            <InsetPanelToolbar>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--cds-spacing-03)' }}>
                {/* Search */}
                <div style={{ position: 'relative' }}>
                  <Search 
                    size={16} 
                    style={{ 
                      position: 'absolute', 
                      left: 'var(--cds-spacing-03)', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: 'var(--cds-text-secondary)'
                    }} 
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    style={{
                      width: '100%',
                      padding: 'var(--cds-spacing-03)',
                      paddingLeft: 'calc(var(--cds-spacing-03) + 20px)',
                      border: '1px solid var(--cds-border-subtle)',
                      backgroundColor: 'var(--cds-field)',
                      color: 'var(--cds-text-primary)',
                      fontFamily: 'var(--cds-font-family)',
                    }}
                  />
                </div>
                
                {/* View controls */}
                <div style={{ display: 'flex', gap: 'var(--cds-spacing-02)' }}>
                  <button
                    type="button"
                    style={{
                      padding: 'var(--cds-spacing-02)',
                      border: '1px solid var(--cds-border-subtle)',
                      backgroundColor: 'var(--cds-layer)',
                      color: 'var(--cds-text-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-label="Tree view"
                  >
                    <Menu size={16} />
                  </button>
                  <button
                    type="button"
                    style={{
                      padding: 'var(--cds-spacing-02)',
                      border: '1px solid var(--cds-border-subtle)',
                      backgroundColor: 'var(--cds-layer)',
                      color: 'var(--cds-text-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </button>
                  <button
                    type="button"
                    style={{
                      padding: 'var(--cds-spacing-02)',
                      border: '1px solid var(--cds-border-subtle)',
                      backgroundColor: 'var(--cds-layer)',
                      color: 'var(--cds-text-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-label="Grid view"
                  >
                    <Grid size={16} />
                  </button>
                </div>
              </div>
            </InsetPanelToolbar>
          }
        >
          <TreeView
            label="Artifacts"
            selected={selectedItem ? [selectedItem] : []}
            onSelect={(_e: React.MouseEvent, node: { id: string }) => setSelectedItem(node.id)}
          >
            {renderCarbonTreeNodes(artifactsTree)}
          </TreeView>
        </InsetPanel>
      );
    }

    if (activeTab === "functions") {
      return (
        <InsetPanel
          header={<InsetPanelHeader title="Functions" />}
          toolbar={
            <InsetPanelToolbar>
              <div style={{ position: 'relative' }}>
                <Search 
                  size={16} 
                  style={{ 
                    position: 'absolute', 
                    left: 'var(--cds-spacing-03)', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: 'var(--cds-text-secondary)'
                  }} 
                />
                <input
                  type="text"
                  placeholder="Search"
                  style={{
                    width: '100%',
                    padding: 'var(--cds-spacing-03)',
                    paddingLeft: 'calc(var(--cds-spacing-03) + 20px)',
                    border: '1px solid var(--cds-border-subtle)',
                    backgroundColor: 'var(--cds-field)',
                    color: 'var(--cds-text-primary)',
                    fontFamily: 'var(--cds-font-family)',
                  }}
                />
              </div>
            </InsetPanelToolbar>
          }
        >
          {/* Flat list of functions */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {functionsList.length === 0 ? (
              <div style={{ 
                padding: 'var(--cds-spacing-05)', 
                color: 'var(--cds-text-secondary)',
                textAlign: 'center' 
              }}>
                No functions found
              </div>
            ) : (
              functionsList.map(func => (
                <button
                  key={func.id}
                  type="button"
                  onClick={() => setSelectedItem(func.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--cds-spacing-03)',
                    padding: 'var(--cds-spacing-03)',
                    border: 'none',
                    backgroundColor: selectedItem === func.id ? 'var(--cds-layer-selected)' : 'transparent',
                    color: 'var(--cds-text-primary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--cds-font-family)',
                    transition: 'background-color var(--cds-productive-02)',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedItem !== func.id) {
                      e.currentTarget.style.backgroundColor = 'var(--cds-layer-hover)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedItem !== func.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Code size={16} style={{ flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {func.displayName || func.name}
                  </span>
                </button>
              ))
            )}
          </div>
        </InsetPanel>
      );
    }

    return null;
  };

  // Get selected asset details if an item is selected
  const selectedAsset = selectedItem ? subAssets.find(a => a.id === selectedItem) : undefined;

  return (
    <DecisionServiceAssetDetailsPage
      assetId={assetId}
      assetName={assetName}
      assetType="Task Model"
      layoutModifier="left-panel"
      headerConfig={{
        title: assetName,
        status: { label: "deployed", variant: "deployed" },
        actions: [
          {
            label: "Edit workflow",
            variant: "primary",
            onClick: () => console.log("Edit workflow clicked"),
          },
          {
            label: "Run",
            variant: "secondary",
            onClick: () => console.log("Run clicked"),
          },
        ],
        tabs: [
          { id: "build", label: "Build", isActive: activeTab === "build" },
          { id: "test-cases", label: "Test Cases", isActive: activeTab === "test-cases" },
        ],
        onTabChange: handleTabChange,
        panelGroups: serviceAssetPanelGroups,
      }}
      leftPanelContent={renderLeftPanel()}
    >
      {activeTab === "build" && (
        selectedAsset ? (
          <PlaceholderContent
            title={selectedAsset.displayName || selectedAsset.name}
            description={`Viewing: ${selectedAsset.type}`}
            variant="section"
          />
        ) : (
          <PlaceholderContent
            title="Build"
            description="Build and configure your task model"
            variant="section"
          />
        )
      )}

      {activeTab === "test-cases" && (
        <PlaceholderContent
          title="Test Cases"
          description="Define and run test cases for your task model"
          variant="section"
        />
      )}

    </DecisionServiceAssetDetailsPage>
  );
}