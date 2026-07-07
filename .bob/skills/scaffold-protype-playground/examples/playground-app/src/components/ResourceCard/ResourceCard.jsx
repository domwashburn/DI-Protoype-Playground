import styles from './ResourceCard.module.scss';

/**
 * Single card inside a resource grid (Files, Resources panels).
 * Renders an icon, heading, optional sub-text, and a link/action slot.
 *
 * Props:
 *   icon      – React node (Carbon icon component instance)
 *   heading   – card title string
 *   subText   – optional secondary line (provider name, command string)
 *   children  – action slot (Link, Button, etc.)
 */
export function ResourceCard({ icon, heading, subText, children }) {
  return (
    <article className={styles.resourceCard}>
      {icon}
      <h3>{heading}</h3>
      {subText ? <span>{subText}</span> : null}
      {children}
    </article>
  );
}
