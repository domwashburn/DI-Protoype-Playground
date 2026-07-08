import { ReactNode, useEffect, useState } from 'react';
import { usePanelManager } from './PanelManager';
import styles from './SectionInfluencedLayout.module.css';

interface SectionInfluencedLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * SectionInfluencedLayout - Wrapper for section content with push/influence panel
 * 
 * This component wraps the section content (notification banner, tables, etc.) and
 * provides a container for section-level panels that push/influence the content width.
 * 
 * Usage:
 * <SectionInfluencedLayout>
 *   <div>Your section content here</div>
 * </SectionInfluencedLayout>
 */
export default function SectionInfluencedLayout({
  children,
  className = '',
}: SectionInfluencedLayoutProps) {
  const { isPanelOpen, currentPanel, closePanel } = usePanelManager();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  // Only handle section panels
  const isSectionPanel = currentPanel?.level === 'section';
  const panelContent = isSectionPanel ? currentPanel?.content : null;
  const panelWidth = currentPanel?.width || 'standard';

  // Handle animation state - delay the open state to trigger CSS transition
  useEffect(() => {
    if (panelContent && isPanelOpen && isSectionPanel) {
      const timer = requestAnimationFrame(() => {
        setShouldAnimate(true);
      });
      return () => cancelAnimationFrame(timer);
    } else {
      setShouldAnimate(false);
    }
  }, [panelContent, isPanelOpen, isSectionPanel]);

  // Handle escape key to close panel
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPanelOpen && isSectionPanel) {
        closePanel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isPanelOpen, isSectionPanel, closePanel]);

  return (
    <div className={`${styles.sectionContainer} ${className}`}>
      {/* Main content area — width unchanged; panel overlays content */}
      <div className={styles.mainContent}>
        {children}
      </div>

      {/* Side panel - always rendered for smooth transitions */}
      <div 
        className={`${styles.sidePanel} ${styles[`panel-${panelWidth}`]}`}
        data-panel-open={shouldAnimate}
        data-has-content={!!panelContent}
        aria-hidden={!shouldAnimate}
      >
        {panelContent && (
          <div className={styles.sidePanelInner}>
            {panelContent}
          </div>
        )}
      </div>
    </div>
  );
}