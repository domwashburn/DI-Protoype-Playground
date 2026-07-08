import { useEffect, useState } from 'react';
import { usePanelManager } from './PanelManager';
import styles from './SectionPanelRenderer.module.css';

/**
 * SectionPanelRenderer - Renders section-level panels below the PageHeader
 * 
 * Section panels are positioned within the section content area and appear
 * directly below the PageHeader component that triggers them.
 */
export default function SectionPanelRenderer() {
  const { isPanelOpen, currentPanel, closePanel } = usePanelManager();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Only handle section panels
  const isSectionPanel = currentPanel?.level === 'section';
  const panelWidth = currentPanel?.width || 'standard';
  
  // Get panel content only if it's a section panel
  const sectionPanelContent = isSectionPanel ? currentPanel?.content : null;

  // Handle animation state - delay the open state to trigger CSS transition
  useEffect(() => {
    if (sectionPanelContent && isPanelOpen) {
      const timer = requestAnimationFrame(() => {
        setShouldAnimate(true);
      });
      return () => cancelAnimationFrame(timer);
    } else {
      setShouldAnimate(false);
    }
  }, [sectionPanelContent, isPanelOpen]);

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

  // Don't render anything if no section panel
  if (!sectionPanelContent) {
    return null;
  }

  return (
    <div 
      className={`${styles.sectionPanel} ${styles[`panel-${panelWidth}`]}`}
      data-panel-open={shouldAnimate}
      aria-hidden={!shouldAnimate}
    >
      <div className={styles.sectionPanelInner}>
        {sectionPanelContent}
      </div>
    </div>
  );
}
