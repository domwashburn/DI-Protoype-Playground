/**
 * PlaceholderPanelC - Section-level placeholder panel
 * Triggered from PageHeader panel trigger button 3
 * Phase 6B: close button replaced with @carbon/react Button (ghost/icon-only/sm)
 */

import { Close, Cube, Maximize, Minimize } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import { usePanelManager } from '../PanelManager';
import styles from './PlaceholderPanelC.module.css';

export default function PlaceholderPanelC() {
  const {
    closePanel,
    isSectionExpanded,
    expandSectionPanel,
    collapseSectionPanel,
  } = usePanelManager();

  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>Panel C</h2>
          <div style={{ display: 'flex', gap: 'var(--cds-spacing-02)' }}>
            <Button
              kind="ghost"
              size="sm"
              hasIconOnly
              renderIcon={isSectionExpanded ? Minimize : Maximize}
              iconDescription={isSectionExpanded ? 'Collapse' : 'Expand'}
              onClick={() =>
                isSectionExpanded ? collapseSectionPanel() : expandSectionPanel()
              }
            />
            <Button
              kind="ghost"
              size="sm"
              hasIconOnly
              renderIcon={Close}
              iconDescription="Close panel"
              onClick={() => closePanel()}
            />
          </div>
        </div>
        <p className={styles.subtitle}>
          Section-level placeholder panel content
        </p>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.placeholderContent}>
          <div className={styles.placeholderIcon}>
            <Cube size={48} />
          </div>
          <h3 className={styles.placeholderTitle}>Placeholder Panel C</h3>
          <p className={styles.placeholderDescription}>
            This is a section-level panel that can be replaced with actual content.
            It opens from the third icon button in the PageHeader component.
          </p>
        </div>
      </div>
    </div>
  );
}
