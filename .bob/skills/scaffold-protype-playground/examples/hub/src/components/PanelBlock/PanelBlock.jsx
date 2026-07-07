import { Tile } from '@carbon/react';
import styles from './PanelBlock.module.scss';

/**
 * Shared panel layout used across DetailView sections.
 * Renders a Carbon Tile with a standard two-column heading row
 * (title + description on the left, an optional badge/icon on the right)
 * above a slot for panel body content.
 *
 * Props:
 *   id           – HTML id for scroll-anchor targeting
 *   title        – panel heading string
 *   description  – supporting copy below the heading
 *   badge        – optional React node (Tag, icon, count) in top-right
 *   accent       – when true, adds the interactive left-border accent
 *   children     – panel body content
 */
export function PanelBlock({ id, title, description, badge, accent, children }) {
  return (
    <Tile className={`${styles.panelBlock}${accent ? ` ${styles.panelBlockAccent}` : ''}`} id={id}>
      <div className={styles.panelHeading}>
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {badge ? <div className={styles.panelBadge}>{badge}</div> : null}
      </div>
      {children}
    </Tile>
  );
}
