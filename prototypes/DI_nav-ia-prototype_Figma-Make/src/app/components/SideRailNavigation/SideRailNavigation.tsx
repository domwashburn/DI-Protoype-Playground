/**
 * SideRailNavigation — Custom Carbon-compliant navigation rail
 *
 * Approved as a custom component per Guidelines.md. The SideRail and
 * all its sub-components intentionally deviate from core Carbon
 * button/nav patterns and should NOT be forced into off-the-shelf
 * Carbon components. @carbon/react Tooltip (with autoAlign) is the
 * one exception — used as a utility component for collapsed-state
 * hover labels, with CSS overrides to prevent its wrapper from
 * breaking the full-width nav item layout.
 */

import { SideRailNavigationProps } from './types';
import SideRailHeader from './SideRailHeader';
import SideRailNavItem from './SideRailNavItem';
import SideRailDivider from './SideRailDivider';
import SideRailActionButton from './SideRailActionButton';
import SideRailHistoryItems from './SideRailHistoryItems';
import styles from './SideRailNavigation.module.css';

export default function SideRailNavigation({
  isExpanded = false,
  onToggle,
  headerTitle = 'Navigation',
  sections,
  activeItemId,
  onItemClick,
  className,
  toggleIcon,
  behavior = 'overlay',
  expandedItems = new Set(),
  onToggleExpanded,
  panelAction,
  historyGroups,
  positioning = 'fixed',
  branches,
  selectedBranch,
  onBranchChange,
  onCollapseRail,
  newChatAction,
  ...props
}: SideRailNavigationProps) {
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
  };

  const handleItemClick = (itemId: string) => {
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  // Build inline positioning styles (dynamic values only — per CSS guidelines)
  const positioningStyle: React.CSSProperties = {};
  if (positioning === 'fixed') {
    // Account for global header (48px) + breadcrumb bar (40px) = 88px
    positioningStyle.height = 'calc(100% - 88px)';
    positioningStyle.top = '88px';
  }

  return (
    <div 
      className={`${styles.sideRailNavigation} ${isExpanded ? styles.expanded : styles.collapsed} ${styles[behavior]} ${styles[positioning]} ${className || ''}`}
      data-name="Side Rail Navigation"
      data-behavior={behavior}
      data-expanded={isExpanded}
      data-positioning={positioning}
      style={positioningStyle}
      {...props}
    >
      {/* Navigation Header */}
      <SideRailHeader
        isExpanded={isExpanded}
        onToggle={handleToggle}
        title={headerTitle}
        toggleIcon={toggleIcon}
        branches={branches}
        selectedBranch={selectedBranch}
        onBranchChange={onBranchChange}
        newChatAction={newChatAction}
      />

      {/* Panel Action Button */}
      {panelAction && (
        <div className={`${styles.actionButtonContainer} ${!isExpanded ? styles.actionButtonContainerCollapsed : ''}`}>
          <SideRailActionButton
            onClick={panelAction.onClick}
            icon={panelAction.icon}
            label={panelAction.label}
            isExpanded={isExpanded}
          />
        </div>
      )}

      {/* Navigation Items */}
      <nav className={styles.navItems} aria-label="Side rail navigation">
        <div className={styles.primaryNavItems}>
          {sections.map((section) => {
            // Skip history sections here, they're handled separately
            if (section.sectionType === 'history') return null;

            return (
              <div key={section.id} className={styles.navSection}>
                {/* Render section label/divider */}
                {section.sectionLabel && (
                  <SideRailDivider 
                    isExpanded={isExpanded} 
                    label={section.sectionLabel}
                    showWhenCollapsed={section.showWhenCollapsed}
                  />
                )}
                
                {/* Render section items */}
                {section.items.map((item) => (
                  <SideRailNavItem
                    key={item.id}
                    item={item}
                    isExpanded={isExpanded}
                    isActive={activeItemId === item.id}
                    onClick={() => handleItemClick(item.id)}
                    onCollapseRail={onCollapseRail}
                  />
                ))}
                
                {/* Render divider if needed */}
                {section.hasDividerAfter && (
                  <SideRailDivider isExpanded={isExpanded} />
                )}
              </div>
            );
          })}
        </div>

        {/* History Section - only show when expanded */}
        {historyGroups && historyGroups.length > 0 && isExpanded && (
          <div className={styles.historySection}>
            <SideRailDivider 
              isExpanded={isExpanded} 
              label="History"
              showWhenCollapsed={false}
            />
            <SideRailHistoryItems
              historyGroups={historyGroups}
              activeItemId={activeItemId}
              onItemClick={handleItemClick}
              isExpanded={isExpanded}
            />
          </div>
        )}

        <div className={styles.footerNavItems}>
          {/* Footer items can be added here if needed */}
        </div>
      </nav>
    </div>
  );
}