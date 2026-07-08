import { ReactNode } from 'react';
import { usePanelManager } from './PanelManager';
import SubView from './SubView';
import styles from './InsetLayout.module.css';

/**
 * InsetLayout — renders a page/section with an optional inset side panel.
 *
 * The section panel is a single persistent wrapper. Expansion widens that
 * wrapper in place and reveals slot content beside the original panel rail,
 * mirroring the assistant panel pattern without cross-fading DOM branches.
 */

interface InsetLayoutProps {
  children: ReactNode;
  side?: 'right' | 'left';
  className?: string;
}

export default function InsetLayout({
  children,
  side = 'right',
  className = '',
}: InsetLayoutProps) {
  const {
    isPanelOpen,
    currentPanel,
    isSectionExpanded,
    isSectionExpandedMounted,
    isSubViewAttached,
    isSubPanelOpen,
    subPanel,
  } = usePanelManager();

  const panelWidth = currentPanel?.width ?? 'standard';
  const isSectionPanel =
    currentPanel?.content &&
    (currentPanel.pattern === 'inset' ||
      (currentPanel.pattern === 'overlay' && currentPanel.level === 'section'));
  const isExpandableSectionPanel =
    currentPanel?.pattern === 'inset' &&
    currentPanel?.level === 'section' &&
    !!currentPanel?.expandable;
  const isExpandedSection = isExpandableSectionPanel && isSectionExpandedMounted;
  const isExpandedSectionOpen = isExpandedSection && isSectionExpanded;

  return (
    <div className={`${styles.container} ${className}`.trim()}>
      {/* Underlying section content stays mounted so canvas/table state
          survives the expand/collapse cycle. While expanded, it's hidden
          from AT and pointer events. */}
      <div
        className={styles.mainContent}
        aria-hidden={isExpandedSectionOpen ? 'true' : undefined}
        style={isExpandedSectionOpen ? { pointerEvents: 'none' } : undefined}
      >
        {children}
      </div>

      {isSectionPanel && currentPanel?.content && (
        <div
          className={[
            styles.panelWrapper,
            side === 'right' ? styles.wrapperRight : styles.wrapperLeft,
          ].join(' ')}
          data-panel-open={isPanelOpen ? 'true' : 'false'}
          data-expanded={isExpandedSectionOpen ? 'true' : 'false'}
          data-attached={isSubViewAttached ? 'true' : 'false'}
          data-width={panelWidth}
          aria-hidden={!isPanelOpen}
        >
          <div className={styles.panelSlot}>
            <div className={styles.panelShell}>{currentPanel.content}</div>
          </div>

          {isSectionExpandedMounted && (
            <div
              className={styles.subViewSlot}
              data-visible={isExpandedSectionOpen ? 'true' : 'false'}
            >
              <SubView
                title={currentPanel.expandedTitle ?? currentPanel.id ?? 'Sub-view'}
                actions={currentPanel.expandedActions}
              >
                {currentPanel.expandedView ?? (
                  <p>Expanded view (no content provided).</p>
                )}
              </SubView>
            </div>
          )}

          {subPanel?.content && (
            <div
              className={styles.nestedSlot}
              data-panel-open={isSubPanelOpen ? 'true' : 'false'}
              data-width={subPanel.width ?? 'standard'}
              aria-hidden={!isSubPanelOpen}
            >
              <div className={styles.panelShell}>{subPanel.content}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
