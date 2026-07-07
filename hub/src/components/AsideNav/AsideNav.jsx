import { AnchorLink, AnchorLinks } from '@carbon-labs/mdx-components';
import styles from './AsideNav.module.scss';

export function AsideNav({ sections }) {
  return (
    <nav className={styles.asideNav} aria-label="Prototype documentation sections">
      <p className={styles.asideNavLabel}>Sections</p>
      <AnchorLinks>
        {sections.map(({ id, label }) => (
          <AnchorLink key={id} to={`#${id}`}>
            {label}
          </AnchorLink>
        ))}
      </AnchorLinks>
    </nav>
  );
}
