import { AnchorLink, AnchorLinks } from '@carbon-labs/mdx-components';
import styles from './AsideNav.module.scss';

/**
 * Vertical section navigation rendered inside the DetailView aside.
 * Forces Carbon-labs' AnchorLinks into a single-column list via SCSS overrides.
 *
 * Props:
 *   sections – Array<{ id: string, label: string }>
 *              Each item produces one AnchorLink pointing to `#${id}`.
 */
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
