import { useEffect, useState } from 'react';
import { usePanelManager } from './PanelManager';
import styles from './GlobalPanelRenderer.module.css';

/**
 * GlobalPanelRenderer - Renders global-level panels as siblings to app content
 * 
 * Global panels are positioned fixed to the viewport and sit outside the normal
 * content flow, making them accessible from anywhere in the app and ensuring
 * they're not constrained by parent container layouts.
 */
export default function GlobalPanelRenderer() {
  const { isPanelOpen, currentPanel, closePanel } = usePanelManager();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Only handle global panels that are NOT push (influence) pattern
  // Global push panels are handled by UniversalPanelWrapper to correctly push content
  const isGlobalPanel = currentPanel?.level === 'global';
  const isPushPanel = currentPanel?.pattern === 'influence';
  const shouldRenderHere = isGlobalPanel && !isPushPanel;
  
  const panelWidth = currentPanel?.width || 'standard';
  
  // Get panel content only if it's a global overlay panel
  // This ensures we don't render page/section/push panels here
  const globalPanelContent = shouldRenderHere ? currentPanel?.content : null;

  // Handle animation state - delay the open state to trigger CSS transition
  useEffect(() => {
    if (globalPanelContent && isPanelOpen) {
      // When panel opens, set shouldAnimate to true after a brief delay
      // This allows the DOM element to render first, then animate in
      const timer = requestAnimationFrame(() => {
        setShouldAnimate(true);
      });
      return () => cancelAnimationFrame(timer);
    } else {
      // When panel closes, reset immediately so next open can animate
      setShouldAnimate(false);
    }
  }, [globalPanelContent, isPanelOpen]);

  // Handle escape key — only when THIS renderer is showing a global-overlay panel.
  // (Assistant push panels are rendered by UniversalPanelWrapper and handle their own close.)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPanelOpen && shouldRenderHere) {
        closePanel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isPanelOpen, shouldRenderHere, closePanel]);

  return (
    <>
      {/* Global Panel - renders only when we have global panel content */}
      {globalPanelContent && (
        <div 
          className={`${styles.globalPanel} ${styles[`panel-${panelWidth}`]}`}
          data-panel-open={shouldAnimate}
          aria-hidden={!shouldAnimate}
        >
          <div className={styles.globalPanelInner}>
            {globalPanelContent}
          </div>
        </div>
      )}
    </>
  );
}
