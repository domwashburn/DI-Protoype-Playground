import { ReactNode, useEffect } from 'react';
import { useSidePanel } from './SidePanelContext';
import styles from './GridLayout.module.css';

interface GridLayoutProps {
  children: ReactNode;
  sidePanel?: ReactNode;
  className?: string;
  panelWidth?: 'narrow' | 'standard' | 'wide';
  showBackdrop?: boolean;
}

export default function GridLayout({
  children,
  sidePanel,
  className = '',
  panelWidth = 'standard',
  showBackdrop = false, // Disabled by default for overlay panels
}: GridLayoutProps) {
  const { isPanelOpen, closePanel } = useSidePanel();

  // Handle escape key to close panel
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPanelOpen) {
        closePanel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isPanelOpen, closePanel]);

  // Handle backdrop click to close panel
  const handleBackdropClick = () => {
    if (isPanelOpen) {
      closePanel();
    }
  };

  return (
    <div 
      className={`${styles.gridLayoutOverlay} ${isPanelOpen ? styles.hasOverlay : ''} ${className}`}
    >
      {/* Backdrop - disabled by default for overlay panels */}
      {showBackdrop && (
        <div 
          className={styles.backdrop}
          data-visible={isPanelOpen}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Full-width content */}
      <div className={styles.contentArea}>
        {children}
      </div>

      {/* Overlay panel */}
      {sidePanel && (
        <div 
          className={`${styles.overlayPanel} ${styles[`panel-${panelWidth}`]}`}
          data-panel-open={isPanelOpen}
          aria-hidden={!isPanelOpen}
        >
          <div className={styles.overlayPanelInner}>
            {sidePanel}
          </div>
        </div>
      )}
    </div>
  );
}
