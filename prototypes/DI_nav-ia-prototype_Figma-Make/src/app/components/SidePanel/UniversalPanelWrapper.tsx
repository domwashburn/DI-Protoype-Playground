import { ReactNode, useEffect } from 'react';
import { usePanelManager } from './PanelManager';
import InfluencedLayout from './InfluencedLayout';
import GridLayout from './GridLayout';
import { SidePanelProvider, useSidePanel } from './SidePanelContext';

interface UniversalPanelWrapperProps {
  children: ReactNode;
  className?: string;
  renderPanel?: boolean;
}

/**
 * Syncs a single boolean (`isOpen`) into the surrounding SidePanelContext.
 * Used to bridge PanelManager state into the lower-level InfluencedLayout/GridLayout
 * components, which read open/closed via useSidePanel().
 */
function SidePanelOpenSync({ isOpen }: { isOpen: boolean }) {
  const { openPanel, closePanel } = useSidePanel();

  useEffect(() => {
    if (isOpen) {
      openPanel();
    } else {
      closePanel();
    }
  }, [isOpen, openPanel, closePanel]);

  return null;
}

/**
 * UniversalPanelWrapper — renders two independent panel slots that can be open
 * simultaneously:
 *
 *   1. Assistant slot (global + influence) — wraps the outside. When open, it
 *      pushes the entire shell to make room for the assistant on the right.
 *   2. Main slot (page / global-overlay-influence variants) — rendered inside
 *      the assistant layout. Page-influence panels push the page content; other
 *      patterns use the standard GridLayout.
 *
 * The `renderPanel` prop controls whether THIS wrapper renders the main slot:
 *   - true  (default): wrapper renders the main slot via GridLayout/InfluencedLayout.
 *   - false:           wrapper provides context only; a child (e.g. AutomationShell)
 *                      renders the main slot itself.
 *
 * Section-level panels and global-overlay panels are rendered elsewhere
 * (SectionPanelRenderer / GlobalPanelRenderer respectively).
 */
export default function UniversalPanelWrapper({
  children,
  className,
  renderPanel = true,
}: UniversalPanelWrapperProps) {
  const {
    isMainPanelOpen,
    currentMainPanel,
    isAssistantPanelOpen,
    assistantPanel,
    isAssistantExpanded,
  } = usePanelManager();

  // ── Main slot derivations ───────────────────────────────────────────────────
  const mainPattern = currentMainPanel?.pattern || 'overlay';
  const mainLevel = currentMainPanel?.level || 'page';
  const mainWidth = currentMainPanel?.width || 'standard';

  const isPagePanel = mainLevel === 'page';
  // (Global+influence is now exclusively the assistant slot and handled separately.)
  const mainRendersHere = isPagePanel;
  const mainPanelContent = mainRendersHere ? currentMainPanel?.content ?? null : null;
  const mainIsOpenAndRenders = isMainPanelOpen && mainRendersHere;

  // ── Inner subtree: the main-slot renderer ───────────────────────────────────
  let inner: ReactNode;

  if (!renderPanel) {
    inner = (
      <SidePanelProvider defaultOpen={mainIsOpenAndRenders}>
        <SidePanelOpenSync isOpen={mainIsOpenAndRenders} />
        {children}
      </SidePanelProvider>
    );
  } else if (mainPattern === 'influence' && mainRendersHere) {
    inner = (
      <SidePanelProvider defaultOpen={mainIsOpenAndRenders}>
        <SidePanelOpenSync isOpen={mainIsOpenAndRenders} />
        <InfluencedLayout
          panelLevel="page"
          sidePanel={mainPanelContent}
          isExpanded={false}
          className={className}
        >
          {children}
        </InfluencedLayout>
      </SidePanelProvider>
    );
  } else {
    inner = (
      <SidePanelProvider defaultOpen={mainIsOpenAndRenders}>
        <SidePanelOpenSync isOpen={mainIsOpenAndRenders} />
        <GridLayout
          panelWidth={mainWidth}
          sidePanel={mainPanelContent}
          className={className}
        >
          {children}
        </GridLayout>
      </SidePanelProvider>
    );
  }

  // ── Outer wrap: the assistant slot ──────────────────────────────────────────
  // Always render the same outer structure regardless of whether an assistant
  // panel is mounted. This keeps `inner`'s React tree identity stable across
  // assistant open/close, so any open page/section panel inside it does not
  // unmount + remount (which previously caused page/section panels to briefly
  // close and re-open when the assistant finished closing).
  return (
    <SidePanelProvider defaultOpen={isAssistantPanelOpen}>
      <SidePanelOpenSync isOpen={isAssistantPanelOpen} />
      <InfluencedLayout
        panelLevel="global"
        sidePanel={assistantPanel ? assistantPanel.content : null}
        isExpanded={isAssistantExpanded}
      >
        {inner}
      </InfluencedLayout>
    </SidePanelProvider>
  );
}
