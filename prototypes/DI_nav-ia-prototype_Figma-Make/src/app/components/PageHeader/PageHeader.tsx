import { ReactNode, ComponentType } from "react";
import styles from "./PageHeader.module.css";
import { CircleDash } from '@carbon/icons-react';
import {
  usePanelManager,
  PlaceholderPanelA,
  PlaceholderPanelB,
  PlaceholderPanelC,
  PlaceholderSubViewA,
  PlaceholderSubViewB,
  PlaceholderSubViewC,
} from '../SidePanel';
import { Button, Tabs, TabList, Tab } from '@carbon/react';

interface StatusTag {
  label: string;
  variant:
    | "published"
    | "draft"
    | "archived"
    | "pending"
    | "deployed"
    | "latest"
    | "main"
    | "develop"
    | "feature"
    | "hotfix"
    | "release"
    | "protected";
}

interface HeaderAction {
  label: string;
  /** Must be a Carbon-compatible ComponentType (e.g. from @carbon/icons-react). */
  icon?: ComponentType;
  variant: "primary" | "secondary" | "tertiary";
  onClick: () => void;
  customButton?: ReactNode;
}

interface TabItem {
  id: string;
  label: string;
  isActive?: boolean;
  count?: number;
  disabled?: boolean;
}

export interface PanelTriggerConfig {
  id: string;
  ariaLabel: string;
  icon: ComponentType<{ className?: string }>;
  content: ReactNode;
  width?: 'narrow' | 'standard' | 'wide';
}

interface PageHeaderProps {
  subheading?: string;
  title: string;
  status?: StatusTag;
  badges?: StatusTag[];
  actions?: HeaderAction[];
  tabs?: TabItem[];
  onTabChange?: (tabId: string) => void;
  className?: string;
  showPanelTriggers?: boolean; // Optional: Enable default placeholder panel triggers
  panelTriggers?: Array<{ icon: ReactNode; onClick: () => void }>;
  /** When provided, replaces default placeholder triggers. Each inner array is a
   *  visually grouped cluster; groups are separated by a small gap. */
  panelGroups?: PanelTriggerConfig[][];
  tabLeadingControls?: ReactNode;
}

export default function PageHeader({
  subheading,
  title,
  status,
  badges,
  actions = [],
  tabs = [],
  onTabChange,
  className = "",
  showPanelTriggers = true, // Changed default to true for testing purposes
  panelTriggers: _panelTriggers,
  panelGroups,
  tabLeadingControls,
}: PageHeaderProps) {
  const { openPanel, isPanelOpen, currentPanel, closeSectionPanels } = usePanelManager();

  const handlePanelA = () => {
    openPanel({
      content: <PlaceholderPanelA />,
      level: 'section',
      pattern: 'inset',
      width: 'standard',
      id: 'placeholder-panel-a',
      expandable: true,
      expandedTitle: 'Sub-view A',
      expandedView: <PlaceholderSubViewA />,
    });
  };

  const handlePanelB = () => {
    openPanel({
      content: <PlaceholderPanelB />,
      level: 'section',
      pattern: 'inset',
      width: 'standard',
      id: 'placeholder-panel-b',
      expandable: true,
      expandedTitle: 'Sub-view B',
      expandedView: <PlaceholderSubViewB />,
    });
  };

  const handlePanelC = () => {
    openPanel({
      content: <PlaceholderPanelC />,
      level: 'section',
      pattern: 'inset',
      width: 'standard',
      id: 'placeholder-panel-c',
      expandable: true,
      expandedTitle: 'Sub-view C',
      expandedView: <PlaceholderSubViewC />,
    });
  };

  const handleTabChange = (tabId: string) => {
    // Only close section panels and notify parent if the tab is actually changing
    const currentActiveTab = tabs.find(t => t.isActive);
    if (currentActiveTab?.id !== tabId) {
      // Close section panels when changing tabs
      closeSectionPanels();
      // Notify parent
      onTabChange?.(tabId);
    }
  };

  const isPanelAActive = isPanelOpen && currentPanel?.id === 'placeholder-panel-a';
  const isPanelBActive = isPanelOpen && currentPanel?.id === 'placeholder-panel-b';
  const isPanelCActive = isPanelOpen && currentPanel?.id === 'placeholder-panel-c';

  return (
    <div className={`${styles.headerWrapper} ${className}`}>
      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
          {subheading && (
            <div className={styles.subHeading}>
              <p className={styles.subheadingText}>
                {subheading}
              </p>
            </div>
          )}
          <div className={styles.titleWrapper}>
            <h1 className={styles.pageTitle}>{title}</h1>
            {badges && badges.length > 0 ? (
              badges.map((badge, index) => (
                <div
                  key={`${badge.variant}-${index}`}
                  className={`${styles.statusTag} ${styles[`status-${badge.variant}`]}`}
                >
                  <span className={styles.tagText}>
                    {badge.label}
                  </span>
                </div>
              ))
            ) : status ? (
              <div
                className={`${styles.statusTag} ${styles[`status-${status.variant}`]}`}
              >
                <span className={styles.tagText}>
                  {status.label}
                </span>
              </div>
            ) : null}
          </div>
        </div>
        {actions.length > 0 && (
          <div className={styles.headerActions}>
            {actions.map((action, index) =>
              action.customButton ? (
                <div key={index}>{action.customButton}</div>
              ) : (
                <Button
                  key={index}
                  kind={action.variant as "primary" | "secondary" | "tertiary"}
                  size="sm"
                  renderIcon={action.icon}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ),
            )}
          </div>
        )}
      </div>
      {tabs.length > 0 && (
        <div className={styles.tabWrapper}>
          <div className={styles.tabWrapperInner}>
            <div className={styles.tabsContainer}>
              <div className={styles.tabsContainerInner}>
                <div className={styles.tabsContainerContent}>
                  {tabLeadingControls && (
                    <div className={styles.tabLeadingControls}>
                      {tabLeadingControls}
                    </div>
                  )}
                  <div className={styles.tabsInner}>
                    <Tabs
                      selectedIndex={Math.max(0, tabs.findIndex(t => t.isActive))}
                      onChange={({ selectedIndex }) => {
                        const next = tabs[selectedIndex];
                        if (next && !next.disabled) handleTabChange(next.id);
                      }}
                    >
                      <TabList aria-label="Page tabs">
                        {tabs.map((tab) => (
                          <Tab key={tab.id} disabled={tab.disabled}>
                            {tab.label}
                            {tab.count !== undefined && (
                              <span className={styles.tabCount}> ({tab.count})</span>
                            )}
                          </Tab>
                        ))}
                      </TabList>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
            {panelGroups ? (
              <div className={styles.panelGroups}>
                {panelGroups.map((group, groupIndex) => (
                  <div key={`group-${groupIndex}`} className={styles.panelGroup}>
                    {group.map((trigger) => {
                      const Icon = trigger.icon;
                      const isActive = isPanelOpen && currentPanel?.id === trigger.id;
                      return (
                        <button
                          key={trigger.id}
                          type="button"
                          className={`${styles.panelTriggerButton} ${styles.panelTriggerButtonStatic} ${isActive ? styles.panelTriggerActive : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openPanel({
                              content: trigger.content,
                              level: 'section',
                              pattern: 'inset',
                              width: trigger.width ?? 'standard',
                              id: trigger.id,
                            });
                          }}
                          aria-label={trigger.ariaLabel}
                        >
                          <Icon className={styles.panelTriggerIcon} />
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : showPanelTriggers && (
              <div className={styles.panelTriggers}>
                <button
                  type="button"
                  className={`${styles.panelTriggerButton} ${isPanelAActive ? styles.panelTriggerActive : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handlePanelA();
                  }}
                  aria-label="Open Panel A"
                >
                  <CircleDash className={styles.panelTriggerIcon} />
                </button>
                <button
                  type="button"
                  className={`${styles.panelTriggerButton} ${isPanelBActive ? styles.panelTriggerActive : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handlePanelB();
                  }}
                  aria-label="Open Panel B"
                >
                  <CircleDash className={styles.panelTriggerIcon} />
                </button>
                <button
                  type="button"
                  className={`${styles.panelTriggerButton} ${isPanelCActive ? styles.panelTriggerActive : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handlePanelC();
                  }}
                  aria-label="Open Panel C"
                >
                  <CircleDash className={styles.panelTriggerIcon} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}