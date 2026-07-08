import { ReactNode } from 'react';
import styles from './HomePageSection.module.css';

interface HomePageSectionProps {
  children: ReactNode;
  backgroundColor?: string;
  className?: string;
}

/**
 * HomePageSection
 * 
 * Full-width content section for the home page.
 * Contains a 16-column Carbon grid with title area (4 cols) and content area (12 cols).
 * 
 * Usage:
 * <HomePageSection>
 *   <HomePageSectionTitle title="..." subtitle="..." />
 *   <HomePageSectionContent>
 *     {content}
 *   </HomePageSectionContent>
 * </HomePageSection>
 */
export function HomePageSection({ 
  children, 
  backgroundColor = 'var(--background-secondary)',
  className = ''
}: HomePageSectionProps) {
  return (
    <div 
      className={`${styles.section} ${className}`}
      style={{ backgroundColor }}
    >
      {children}
    </div>
  );
}