import React from 'react';
import { CloudUpload, Movement, Timer, OverflowMenuHorizontal } from '@carbon/icons-react';
import styles from './BreadcrumbActionBar.module.css';
import { Button, Breadcrumb, BreadcrumbItem, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import BranchSwitcher, { Branch } from '../BranchSwitcher';

// Renamed from BreadcrumbItem to avoid clash with Carbon's BreadcrumbItem component
interface BreadcrumbNavItem {
  label: string;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface ActionButton {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

interface PanelTrigger {
  icon: React.ComponentType;
  onClick?: () => void;
  isActive?: boolean;
}

interface BreadcrumbActionBarProps {
  breadcrumbs?: BreadcrumbNavItem[];
  actions?: ActionButton[];
  instanceName?: string;
  panelTriggers?: PanelTrigger[];
  onInstanceChange?: () => void;
  branches?: Branch[];
  currentBranch?: string;
  onBranchChange?: (branchId: string) => void;
  onViewBranches?: () => void;
}

/**
 * BreadcrumbNavigation — Phase 4C
 * Replaced custom breadcrumb rendering with Carbon Breadcrumb + BreadcrumbItem.
 * - isActive maps to isCurrentPage (renders as <span aria-current="page">, no link)
 * - clickable non-current items use href="#" + preventDefault so Carbon renders
 *   a proper <a> element with link styling; our handler fires on click
 * - noTrailingSlash removes the trailing "/" after the last item
 */
function BreadcrumbNavigation({ breadcrumbs = [] }: { breadcrumbs: BreadcrumbNavItem[] }) {
  if (breadcrumbs.length === 0) return null;

  const renderItem = (item: BreadcrumbNavItem, key: React.Key, extraClassName?: string) => (
    <BreadcrumbItem
      key={key}
      className={extraClassName}
      href={!item.isActive ? (item.href ?? '#') : undefined}
      isCurrentPage={item.isActive}
      onClick={
        item.onClick && !item.isActive
          ? (e: React.MouseEvent) => {
              e.preventDefault();
              item.onClick!();
            }
          : undefined
      }
    >
      {item.label}
    </BreadcrumbItem>
  );

  // When there are more than 3 items, collapse the middle items into a
  // Carbon OverflowMenu rendered inside a BreadcrumbItem. First and last
  // items remain visible; the last item truncates with ellipsis when tight.
  const shouldCollapse = breadcrumbs.length > 3;
  const first = breadcrumbs[0];
  const last = breadcrumbs[breadcrumbs.length - 1];
  const middle = shouldCollapse ? breadcrumbs.slice(1, -1) : [];

  return (
    <div className={styles.breadcrumbContainer}>
      <Breadcrumb noTrailingSlash aria-label="Page navigation" className={styles.breadcrumb}>
        {shouldCollapse ? (
          <>
            {renderItem(first, 'first')}
            <BreadcrumbItem data-floating-menu-container key="overflow">
              <OverflowMenu
                align="bottom"
                aria-label="Overflow menu in a breadcrumb"
                renderIcon={OverflowMenuHorizontal}
              >
                {middle.map((item, i) => (
                  <OverflowMenuItem
                    key={i}
                    itemText={item.label}
                    href={item.href}
                    onClick={
                      item.onClick
                        ? (e: React.MouseEvent) => {
                            e.preventDefault();
                            item.onClick!();
                          }
                        : undefined
                    }
                  />
                ))}
              </OverflowMenu>
            </BreadcrumbItem>
            {renderItem(last, 'last', styles.breadcrumbItemTruncate)}
          </>
        ) : (
          breadcrumbs.map((item, index) =>
            renderItem(
              item,
              index,
              index === breadcrumbs.length - 1 ? styles.breadcrumbItemTruncate : undefined,
            ),
          )
        )}
      </Breadcrumb>
    </div>
  );
}

function ActionButtons({ actions = [] }: { actions: ActionButton[] }) {
  if (actions.length === 0) return null;

  // Map action labels to stable ComponentType references (avoids new-FC-per-render)
  const getIconForAction = (label: string): React.ComponentType | undefined => {
    const iconMap: Record<string, React.ComponentType> = {
      'New version': Timer,
      'New branch': Movement,
      'New hotfix': Movement,
      'Deploy': CloudUpload,
      'Publish': CloudUpload,
      'Request merge': Movement,
      'Merge': Movement,
      'Merge hotfix': Movement,
    };
    return iconMap[label];
  };

  return (
    <div className={styles.buttonGroup}>
      {actions.map((action, index) => (
        <Button
          key={index}
          kind="ghost"
          size="md"
          renderIcon={getIconForAction(action.label)}
          onClick={action.onClick}
          aria-label={action.label}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}

interface InstanceSelectorProps {
  instanceName?: string;
  onInstanceChange?: () => void;
  branches?: Branch[];
  currentBranch?: string;
  onBranchChange?: (branchId: string) => void;
  onViewBranches?: () => void;
}

function InstanceSelector({ 
  instanceName, 
  onInstanceChange, 
  branches,
  currentBranch,
  onBranchChange,
  onViewBranches
}: InstanceSelectorProps) {
  if (!instanceName) return null;

  const displayText = branches?.find(b => b.name === currentBranch)?.name || instanceName;

  return (
    <div className={styles.instanceLevelItems}>
      <div className={styles.instanceBorder} />
      <div className={styles.instanceContent}>
        <div className={styles.selectedInstanceName}>
          <p className={styles.instanceText}>{displayText}</p>
        </div>
      </div>
      {branches && branches.length > 0 && (
        <BranchSwitcher
          branches={branches}
          currentBranch={currentBranch}
          onBranchChange={onBranchChange}
          onViewBranches={onViewBranches}
        />
      )}
      <Button
        kind="ghost"
        size="md"
        hasIconOnly
        renderIcon={Timer}
        iconDescription="Processes popover"
        onClick={onInstanceChange}
      />
    </div>
  );
}

function PanelTriggers({ panelTriggers = [] }: { panelTriggers: PanelTrigger[] }) {
  if (panelTriggers.length === 0) return null;

  return (
    <div className={styles.panelTriggers}>
      <div className={styles.panelTriggersBorder} />
      {panelTriggers.map((trigger, index) => (
        <Button
          key={index}
          kind="ghost"
          size="md"
          hasIconOnly
          renderIcon={trigger.icon}
          iconDescription={`Panel trigger ${index + 1}`}
          isSelected={trigger.isActive}
          onClick={trigger.onClick}
        />
      ))}
    </div>
  );
}

export default function BreadcrumbActionBar({
  breadcrumbs = [],
  actions = [],
  instanceName,
  panelTriggers = [],
  onInstanceChange,
  branches,
  currentBranch,
  onBranchChange,
  onViewBranches
}: BreadcrumbActionBarProps) {
  return (
    <div className={styles.breadcrumbActionBar}>
      <div className={styles.bottomBorder} />
      <div className={styles.content}>
        <BreadcrumbNavigation breadcrumbs={breadcrumbs} />
        <ActionButtons actions={actions} />
        <InstanceSelector 
          instanceName={instanceName} 
          onInstanceChange={onInstanceChange}
          branches={branches}
          currentBranch={currentBranch}
          onBranchChange={onBranchChange}
          onViewBranches={onViewBranches}
        />
        <PanelTriggers panelTriggers={panelTriggers} />
      </div>
    </div>
  );
}