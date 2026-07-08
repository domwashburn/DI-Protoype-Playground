import {
  GridLayout,
  InfluencedLayout,
  PanelTriggerButton,
  SampleSidePanel,
  SidePanelProvider,
} from '../SidePanel';
import { ChevronRight, Settings } from '@carbon/icons-react';
import styles from './SidePanelDemoPage.module.css';

// Demo: Push/Influence Pattern - Page Level
function InfluencedPageLevelDemo() {
  return (
    <SidePanelProvider defaultOpen={true}>
      <InfluencedLayout
        panelLevel="page"
        sidePanel={<SampleSidePanel title="Page Level Panel" />}
      >
        {/* Breadcrumb - NOT influenced */}
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbText}>Home / Demo / Page Level Panel</span>
          <div className={styles.actions}>
            <PanelTriggerButton 
              icon={<Settings />}
              ariaLabel="Toggle page level panel"
            />
          </div>
        </div>

        {/* Page Header - IS influenced */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Push/Influence Pattern - Page Level</h1>
          <p className={styles.pageDescription}>
            The breadcrumb remains full width while all content below is influenced by the panel.
          </p>
        </div>

        {/* Content Area - IS influenced */}
        <div className={styles.contentArea}>
          <div className={styles.contentCard}>
            <h2 className={styles.cardTitle}>Content Area</h2>
            <p className={styles.cardText}>
              This content area shrinks when the panel is open. The panel pushes the content 
              to the left, creating space for itself on the right.
            </p>
            <div className={styles.demoGrid}>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className={styles.gridItem}>
                  <div className={styles.gridItemContent}>Item {i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </InfluencedLayout>
    </SidePanelProvider>
  );
}

// Demo: Push/Influence Pattern - Section Level
function InfluencedSectionLevelDemo() {
  return (
    <SidePanelProvider defaultOpen={false}>
      <InfluencedLayout
        panelLevel="section"
        sidePanel={<SampleSidePanel title="Section Level Panel" />}
      >
        {/* Breadcrumb - NOT influenced */}
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbText}>Home / Demo / Section Level Panel</span>
        </div>

        {/* Page Header - NOT influenced */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Push/Influence Pattern - Section Level</h1>
          <div className={styles.headerActions}>
            <PanelTriggerButton 
              icon={<Settings />}
              ariaLabel="Toggle section level panel"
            />
          </div>
        </div>

        {/* Content Area - IS influenced */}
        <div className={styles.contentArea}>
          <div className={styles.contentCard}>
            <h2 className={styles.cardTitle}>Content Section</h2>
            <p className={styles.cardText}>
              Only this content section is influenced by the panel. The breadcrumb and 
              page header remain at full width.
            </p>
            <div className={styles.demoGrid}>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className={styles.gridItem}>
                  <div className={styles.gridItemContent}>Item {i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </InfluencedLayout>
    </SidePanelProvider>
  );
}

// Demo: Overlay Pattern
function OverlayPatternDemo() {
  return (
    <SidePanelProvider defaultOpen={false}>
      <GridLayout
        panelWidth="standard"
        sidePanel={<SampleSidePanel title="Overlay Panel" />}
      >
        <div className={styles.overlayDemo}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbText}>Home / Demo / Overlay Pattern</span>
            <div className={styles.actions}>
              <PanelTriggerButton 
                icon={<ChevronRight />}
                ariaLabel="Toggle overlay panel"
              />
            </div>
          </div>

          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Overlay Pattern</h1>
            <p className={styles.pageDescription}>
              The panel overlays the content with a backdrop. Content remains full width underneath.
            </p>
          </div>

          <div className={styles.contentArea}>
            <div className={styles.contentCard}>
              <h2 className={styles.cardTitle}>Full Width Content</h2>
              <p className={styles.cardText}>
                This content stays at full width even when the panel is open. The panel 
                floats over the top with a semi-transparent backdrop.
              </p>
              <div className={styles.demoGrid}>
                {Array.from({ length: 9 }, (_, i) => (
                  <div key={i} className={styles.gridItem}>
                    <div className={styles.gridItemContent}>Item {i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </GridLayout>
    </SidePanelProvider>
  );
}

export default function SidePanelDemoPage() {
  return (
    <div className={styles.demoPage}>
      <div className={styles.demoSection}>
        <InfluencedPageLevelDemo />
      </div>
    </div>
  );
}
