import { ReactNode } from "react";
import PageHeader, { type PanelTriggerConfig } from "../PageHeader";
import { InsetLayout } from "../SidePanel";
import styles from "./DecisionServiceAssetDetailsPage.module.css";

interface PageHeaderConfig {
  title: string;
  status?: { label: string; variant: string };
  actions?: Array<{
    label: string;
    variant: "primary" | "secondary";
    onClick: () => void;
  }>;
  tabs?: Array<{
    id: string;
    label: string;
    isActive: boolean;
  }>;
  onTabChange?: (tabId: string) => void;
  panelGroups?: PanelTriggerConfig[][];
}

interface DecisionServiceAssetDetailsPageProps {
  assetId: string;
  assetName: string;
  assetType: string;
  headerConfig: PageHeaderConfig;
  children: ReactNode;
  layoutModifier?: "default" | "left-panel" | "right-panel" | "split";
  leftPanelContent?: ReactNode;
  rightPanelContent?: ReactNode;
}

/**
 * DecisionServiceAssetDetailsPage
 * 
 * A flexible base component for all Decision Service asset detail pages.
 * Supports multiple layout configurations through the layoutModifier prop:
 * 
 * - "default": Full-width content area (used by Decision Model, Predictive Model, etc.)
 * - "left-panel": Content with a left sidebar panel (used by Task Model)
 * - "right-panel": Content with a right sidebar panel
 * - "split": Content split between left and right panels
 * 
 * This component provides:
 * - Consistent header structure across all asset types
 * - Flexible layout system for different asset requirements
 * - Integration with the Carbon Design System grid
 * - Proper spacing and typography using design system tokens
 */
export default function DecisionServiceAssetDetailsPage({
  assetId,
  assetName,
  assetType,
  headerConfig,
  children,
  layoutModifier = "default",
  leftPanelContent,
  rightPanelContent,
}: DecisionServiceAssetDetailsPageProps) {
  return (
    <div className={styles.pageContainer} data-name={`${assetType} Page`} data-asset-id={assetId}>
      <PageHeader
        title={headerConfig.title}
        status={headerConfig.status}
        actions={headerConfig.actions}
        tabs={headerConfig.tabs}
        onTabChange={headerConfig.onTabChange}
        panelGroups={headerConfig.panelGroups}
        showPanelTriggers={!headerConfig.panelGroups}
      />
      
      <InsetLayout>
        <div className={`${styles.contentWrapper} ${styles[`layout-${layoutModifier}`]}`}>
          {/* Left Panel (optional) - Inset floating panel */}
          {layoutModifier === "left-panel" && leftPanelContent && (
            <div className={styles.leftPanel}>
              {leftPanelContent}
            </div>
          )}
          
          {/* View Content */}
          <div className={styles.mainContent}>
            {children}
          </div>
          
          {/* Right Panel (optional) */}
          {layoutModifier === "right-panel" && rightPanelContent && (
            <div className={styles.rightPanel}>
              {rightPanelContent}
            </div>
          )}
        </div>
      </InsetLayout>
    </div>
  );
}
