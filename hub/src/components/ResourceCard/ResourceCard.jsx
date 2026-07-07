import styles from './ResourceCard.module.scss';

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
