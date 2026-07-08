import { useEffect, useState } from 'react';
import { usePanelManager } from './PanelManager';
import styles from './AutomationShellPanelRenderer.module.css';

/**
 * AutomationShellPanelRenderer - Renders page-level panels within the Automation Shell
 * 
 * This renderer is specifically for panels triggered from the automation shell breadcrumb
 * or side rail. It positions panels to respect the side rail layout, ensuring they appear
 * correctly relative to the main content area.
 * 
 * Key differences from GlobalPanelRenderer:
 * - Respects the side rail offset (48px)
 * - Only renders page-level panels (not global or section)
 * - Positioned relative to the automation shell content area
 */
export default function AutomationShellPanelRenderer() {
  const { isPanelOpen, currentPanel, closePanel } = usePanelManager();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Only handle page panels
  const isPagePanel = currentPanel?.level === 'page';
  const panelWidth = currentPanel?.width || 'standard';
  
  // Get panel content only if it's a page panel
  const pagePanelContent = isPagePanel ? currentPanel?.content : null;

  // Handle animation state - delay the open state to trigger CSS transition
  useEffect(() => {
    if (pagePanelContent && isPanelOpen) {
      const timer = requestAnimationFrame(() => {
        setShouldAnimate(true);
      });
      return () => cancelAnimationFrame(timer);
    } else {
      setShouldAnimate(false);
    }
  }, [pagePanelContent, isPanelOpen]);

  // Handle escape key to close panel
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPanelOpen && isPagePanel) {
        closePanel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isPanelOpen, isPagePanel, closePanel]);

  // Don't render anything if no page panel
  if (!pagePanelContent) {
    return null;
  }

  return (
    <div 
      className={styles.automationShellPanel}
      data-panel-open={shouldAnimate}
      aria-hidden={!shouldAnimate}
    >
      <div className={styles.automationShellPanelInner}>
        {pagePanelContent}
      </div>
    </div>
  );
}