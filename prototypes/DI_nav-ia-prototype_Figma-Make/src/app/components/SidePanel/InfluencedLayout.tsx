import { ReactNode, Children, useEffect } from 'react';
import { useSidePanel } from './SidePanelContext';
import styles from './InfluencedLayout.module.css';

interface InfluencedLayoutProps {
  children: ReactNode;
  sidePanel?: ReactNode;
  className?: string;
  panelLevel?: 'page' | 'section' | 'global';
  /** When true, the global side panel expands to fill the full viewport width */
  isExpanded?: boolean;
}

export default function InfluencedLayout({
  children,
  sidePanel,
  className = '',
  panelLevel = 'page',
  isExpanded = false,
}: InfluencedLayoutProps) {
  const { isPanelOpen, closePanel } = useSidePanel();
  const childArray = Children.toArray(children);

  let nonInfluencedChildren: ReactNode[] = [];
  let influencedChildren: ReactNode[] = [];

  if (panelLevel === 'global') {
    nonInfluencedChildren = [];
    influencedChildren = childArray;
  } else if (panelLevel === 'page') {
    nonInfluencedChildren = childArray.slice(0, 1);
    influencedChildren = childArray.slice(1);
  } else {
    nonInfluencedChildren = childArray.slice(0, 2);
    influencedChildren = childArray.slice(2);
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPanelOpen) {
        closePanel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isPanelOpen, closePanel]);

  return (
    <div className={`${styles.outerContainer} ${className}`}>
      {nonInfluencedChildren}

      <div className={styles.panelContainer}>
        {/* When expanded, the panel covers full width so no margin is needed */}
        <div
          className={styles.mainContent}
          data-panel-open={isPanelOpen}
          data-panel-expanded={isExpanded}
        >
          {influencedChildren}
        </div>

        {sidePanel && (
          <div
            className={panelLevel === 'global' ? styles.globalSidePanel : styles.sidePanel}
            data-panel-open={isPanelOpen}
            data-panel-expanded={panelLevel === 'global' ? isExpanded : undefined}
            aria-hidden={!isPanelOpen}
          >
            <div className={styles.sidePanelInner}>
              {sidePanel}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
