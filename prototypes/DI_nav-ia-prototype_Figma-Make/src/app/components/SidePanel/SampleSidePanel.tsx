/**
 * SampleSidePanel — generic panel shell used by ResourceHubPage "Add Resource" trigger.
 * Phase 6B: close button replaced with @carbon/react Button (ghost/icon-only/sm).
 */
import { Close } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import { usePanelManager } from './PanelManager';
import styles from './SampleSidePanel.module.css';

interface SampleSidePanelProps {
  title?: string;
  children?: React.ReactNode;
}

export default function SampleSidePanel({ 
  title = 'Side Panel', 
  children 
}: SampleSidePanelProps) {
  const { closePanel } = usePanelManager();

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Button
          kind="ghost"
          size="sm"
          hasIconOnly
          renderIcon={Close}
          iconDescription="Close panel"
          onClick={closePanel}
        />
      </div>
      <div className={styles.content}>
        {children || (
          <>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Panel Section</h3>
              <p className={styles.text}>
                This is a sample side panel that demonstrates the dual-pattern panel system. 
                The panel can be used in either Push/Influence or Overlay mode.
              </p>
            </div>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Features</h3>
              <ul className={styles.list}>
                <li className={styles.listItem}>Independent scrolling</li>
                <li className={styles.listItem}>Smooth animations</li>
                <li className={styles.listItem}>Responsive design</li>
                <li className={styles.listItem}>Keyboard support (Escape to close)</li>
              </ul>
            </div>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Additional Content</h3>
              <p className={styles.text}>
                Add any content you need here. The panel will scroll independently 
                from the main content area.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
