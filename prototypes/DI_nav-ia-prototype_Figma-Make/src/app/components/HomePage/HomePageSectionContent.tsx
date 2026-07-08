import { ReactNode } from 'react';
import styles from './HomePageSectionContent.module.css';

interface HomePageSectionContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * HomePageSectionContent
 * 
 * Content area for home page sections.
 * Spans 12 columns in the 16-column grid.
 * Flexible container that can hold cards, tables, lists, etc.
 * 
 * Usage:
 * <HomePageSectionContent>
 *   <CardGrid>
 *     <Card>...</Card>
 *     <Card>...</Card>
 *   </CardGrid>
 * </HomePageSectionContent>
 */
export function HomePageSectionContent({ children, className = '' }: HomePageSectionContentProps) {
  return (
    <div className={`${styles.contentArea} ${className}`}>
      {children}
    </div>
  );
}
