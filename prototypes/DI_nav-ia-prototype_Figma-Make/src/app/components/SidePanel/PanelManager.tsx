import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

/**
 * PanelManager - Global panel state with two independent slots.
 *
 * Slots:
 * - "main" slot — page-level, section-level, and global-overlay panels (Help, etc).
 *   Mutually exclusive: opening one closes the previous one.
 * - "assistant" slot — the AI Decision Assistant (global + influence).
 *   Independent of the main slot, so opening a page/section panel does not
 *   close the assistant, and vice-versa.
 *
 * Routing rule for openPanel():
 *   level === 'global' && pattern === 'influence'  →  assistant slot
 *   otherwise                                       →  main slot
 *
 * Animation Flow (Manual Close):
 * 1. closePanel() / closeAssistantPanel() is called without options
 * 2. open flag → false (triggers CSS transitions)
 * 3. CSS transitions run for 300ms
 * 4. content remains mounted during transition
 * 5. After 300ms, content → null (unmounts)
 *
 * Navigation Flow:
 * - Non-global panels in the main slot close immediately on route change.
 * - Global panels (Help overlay, Assistant) persist across navigation.
 */

export type PanelLevel = 'page' | 'section' | 'global';
export type PanelPattern = 'influence' | 'overlay' | 'inset';
export type PanelWidth = 'narrow' | 'standard' | 'wide';

export interface PanelConfig {
  content: ReactNode;
  level?: PanelLevel;
  pattern?: PanelPattern;
  width?: PanelWidth;
  id?: string;
  /** Whether this panel supports expanding (assistant: full viewport;
   *  section inset: covers the section with a sub-view shell). */
  expandable?: boolean;
  /** Section-inset only: optional ReactNode rendered as the sub-view body
   *  (right side of the expanded shell) when `expandable` is true and the
   *  user toggles expansion. Falls back to a generic placeholder. */
  expandedView?: ReactNode;
  /** Section-inset only: optional sub-view header title shown above the
   *  expandedView. Defaults to the panel id. */
  expandedTitle?: string;
  /** Section-inset only: optional sub-view header actions (right-aligned
   *  buttons), rendered alongside the sub-view's collapse-close cluster. */
  expandedActions?: ReactNode;
}

interface PanelManagerContextType {
  // ── Main slot (page / section / global-overlay) ──
  /** True when the main slot is open. (Back-compat alias: see also isMainPanelOpen.) */
  isPanelOpen: boolean;
  isMainPanelOpen: boolean;
  /** The panel currently in the main slot. (Back-compat alias for currentMainPanel.) */
  currentPanel: PanelConfig | null;
  currentMainPanel: PanelConfig | null;

  // ── Assistant slot (global + influence) ──
  isAssistantPanelOpen: boolean;
  assistantPanel: PanelConfig | null;
  /** True when the assistant panel is in full-width expanded state. */
  isAssistantExpanded: boolean;
  /** Back-compat: same as isAssistantExpanded (only the assistant is expandable today). */
  isExpanded: boolean;

  // ── Section-inset expansion + nested sub-panel ──
  /** True while a section-level inset panel is visually open in expanded sub-view mode. */
  isSectionExpanded: boolean;
  /** True while the expanded sub-view is mounted (delayed on close for animation). */
  isSectionExpandedMounted: boolean;
  /** True when the sub-view is visually attached to the parent panel rail
   *  (single merged card). When false the two cards float apart with the
   *  standard 16px gap. Default: true (attached). */
  isSubViewAttached: boolean;
  /** Single nested inset panel pushed in beside the sub-view. Non-expandable. */
  subPanel: PanelConfig | null;
  isSubPanelOpen: boolean;

  // ── Actions ──
  /** Routes by config: global+influence → assistant slot, otherwise → main slot. */
  openPanel: (config: PanelConfig) => void;
  /** Closes the main slot. Use closeAssistantPanel() for the assistant. */
  closePanel: (options?: { immediate?: boolean }) => void;
  /** Closes the assistant slot. */
  closeAssistantPanel: (options?: { immediate?: boolean }) => void;
  /** Toggles based on config (routes by slot). With no config, toggles the main slot. */
  togglePanel: (config?: PanelConfig) => void;
  /** Closes the main slot iff it currently holds a section-level panel. */
  closeSectionPanels: (options?: { immediate?: boolean }) => void;
  /** Expand the assistant panel to full viewport width. */
  expandPanel: () => void;
  /** Collapse the assistant panel back to its normal width. */
  collapsePanel: () => void;
  /** Expand the current section-inset panel into the sub-view shell. */
  expandSectionPanel: () => void;
  /** Collapse the section-inset sub-view back to the side rail. */
  collapseSectionPanel: () => void;
  /** Toggle whether the sub-view is attached to or detached from the parent
   *  panel rail. */
  toggleSubViewAttachment: () => void;
  /** Force the sub-view into attached mode. */
  attachSubView: () => void;
  /** Force the sub-view into detached mode. */
  detachSubView: () => void;
  /** Open a nested inset panel inside the expanded sub-view (one level only). */
  openSubPanel: (config: PanelConfig) => void;
  /** Close the nested sub-panel. */
  closeSubPanel: (options?: { immediate?: boolean }) => void;
}

const PanelManagerContext = createContext<PanelManagerContextType | undefined>(undefined);

interface PanelManagerProviderProps {
  children: ReactNode;
  defaultOpen?: boolean;
  defaultPanel?: PanelConfig | null;
  currentRoute?: string;
}

function isAssistantConfig(config: PanelConfig): boolean {
  return config.level === 'global' && config.pattern === 'influence';
}

export function PanelManagerProvider({
  children,
  defaultOpen = false,
  defaultPanel = null,
  currentRoute,
}: PanelManagerProviderProps) {
  // Main slot — initialize from defaults only if the default panel is not an assistant panel
  const defaultIsAssistant = defaultPanel ? isAssistantConfig(defaultPanel) : false;

  const [isMainPanelOpen, setIsMainPanelOpen] = useState(
    defaultOpen && !defaultIsAssistant
  );
  const [currentMainPanel, setCurrentMainPanel] = useState<PanelConfig | null>(
    defaultIsAssistant ? null : defaultPanel
  );

  // Assistant slot
  const [isAssistantPanelOpen, setIsAssistantPanelOpen] = useState(
    defaultOpen && defaultIsAssistant
  );
  const [assistantPanel, setAssistantPanel] = useState<PanelConfig | null>(
    defaultIsAssistant ? defaultPanel : null
  );
  const [isAssistantExpanded, setIsAssistantExpanded] = useState(false);

  // Section-inset expansion + nested sub-panel slot. Only ever active while
  // the main slot holds a section-level inset panel that's marked expandable.
  const [isSectionExpanded, setIsSectionExpanded] = useState(false);
  const [isSectionExpandedMounted, setIsSectionExpandedMounted] = useState(false);
  const [isSubViewAttached, setIsSubViewAttached] = useState(true);
  const [isSubPanelOpen, setIsSubPanelOpen] = useState(false);
  const [subPanel, setSubPanel] = useState<PanelConfig | null>(null);

  const previousRouteRef = useRef<string | undefined>(currentRoute);

  // ── Main slot actions ─────────────────────────────────────────────────────────

  const closeSubPanel = (options?: { immediate?: boolean }) => {
    setIsSubPanelOpen(false);
    if (options?.immediate) {
      setSubPanel(null);
    } else {
      setTimeout(() => setSubPanel(null), 300);
    }
  };

  const closePanel = (options?: { immediate?: boolean }) => {
    setIsMainPanelOpen(false);
    // Closing the main panel always tears down its expanded sub-view + any
    // nested sub-panel. Clear synchronously so the next opener doesn't
    // inherit stale expansion state.
    setIsSectionExpanded(false);
    setIsSubViewAttached(true);
    setIsSubPanelOpen(false);

    if (options?.immediate) {
      setCurrentMainPanel(null);
      setIsSectionExpandedMounted(false);
      setSubPanel(null);
    } else {
      setTimeout(() => {
        setCurrentMainPanel(null);
        setIsSectionExpandedMounted(false);
        setSubPanel(null);
      }, 300);
    }
  };

  const openMainPanel = (panelConfig: PanelConfig) => {
    // Same-ID toggle within the main slot
    if (isMainPanelOpen && currentMainPanel?.id === panelConfig.id) {
      closePanel();
      return;
    }

    // Switching to a different main panel always exits any prior expansion
    // and tears down a nested sub-panel.
    setIsSectionExpanded(false);
    setIsSectionExpandedMounted(false);
    setIsSubViewAttached(true);
    setIsSubPanelOpen(false);
    setSubPanel(null);

    setCurrentMainPanel(panelConfig);
    setIsMainPanelOpen(true);
  };

  const closeSectionPanels = (options?: { immediate?: boolean }) => {
    if (isMainPanelOpen && currentMainPanel?.level === 'section') {
      closePanel(options);
    }
  };

  // ── Assistant slot actions ────────────────────────────────────────────────────

  const closeAssistantPanel = (options?: { immediate?: boolean }) => {
    setIsAssistantPanelOpen(false);
    setIsAssistantExpanded(false);

    if (options?.immediate) {
      setAssistantPanel(null);
    } else {
      setTimeout(() => setAssistantPanel(null), 300);
    }
  };

  const openAssistantPanel = (panelConfig: PanelConfig) => {
    // Same-ID toggle within the assistant slot
    if (isAssistantPanelOpen && assistantPanel?.id === panelConfig.id) {
      closeAssistantPanel();
      return;
    }

    // Auto-dismiss any global-overlay panel (e.g. Help) when the AI opens.
    // Page/section panels in the main slot remain untouched.
    if (isMainPanelOpen && currentMainPanel?.level === 'global') {
      closePanel();
    }

    // Opening a different assistant config — reset expansion
    setIsAssistantExpanded(false);
    setAssistantPanel(panelConfig);
    setIsAssistantPanelOpen(true);
  };

  const expandPanel = () => {
    if (isAssistantPanelOpen && assistantPanel?.expandable) {
      setIsAssistantExpanded(true);
    }
  };

  const collapsePanel = () => {
    setIsAssistantExpanded(false);
  };

  // ── Section-inset expansion + nested sub-panel ───────────────────────────────

  const expandSectionPanel = () => {
    if (!isMainPanelOpen) return;
    const panel = currentMainPanel;
    if (
      !panel ||
      panel.level !== 'section' ||
      panel.pattern !== 'inset' ||
      !panel.expandable
    ) {
      // Page / global / non-inset / non-expandable panels cannot expand.
      return;
    }
    setIsSectionExpandedMounted(true);
    setIsSectionExpanded(true);
  };

  const collapseSectionPanel = () => {
    setIsSectionExpanded(false);
    setIsSubViewAttached(true);
    // Collapsing always tears down the nested sub-panel — the surface that
    // hosted it is gone.
    setIsSubPanelOpen(false);
    
    setTimeout(() => {
      setIsSectionExpandedMounted(false);
      setSubPanel(null);
    }, 300);
  };

  const toggleSubViewAttachment = () => {
    setIsSubViewAttached((v) => !v);
  };
  const attachSubView = () => setIsSubViewAttached(true);
  const detachSubView = () => setIsSubViewAttached(false);

  const openSubPanel = (panelConfig: PanelConfig) => {
    if (!isSectionExpanded) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('openSubPanel: ignored — no expanded section panel is open.');
      }
      return;
    }
    // Force one-level-deep, non-expandable inset.
    const safeConfig: PanelConfig = {
      ...panelConfig,
      level: 'section',
      pattern: 'inset',
      expandable: false,
    };
    // Single sub-panel slot — same-id toggle, otherwise replace.
    if (isSubPanelOpen && subPanel?.id === safeConfig.id) {
      closeSubPanel();
      return;
    }
    setSubPanel(safeConfig);
    setIsSubPanelOpen(true);
  };

  // ── Unified actions ───────────────────────────────────────────────────────────

  const openPanel = (panelConfig: PanelConfig) => {
    if (isAssistantConfig(panelConfig)) {
      openAssistantPanel(panelConfig);
    } else {
      openMainPanel(panelConfig);
    }
  };

  const togglePanel = (config?: PanelConfig) => {
    if (config) {
      openPanel(config);
      return;
    }
    // No config: act on the main slot (back-compat with prior single-slot behavior)
    if (isMainPanelOpen) {
      closePanel();
    } else if (currentMainPanel) {
      setIsMainPanelOpen(true);
    }
  };

  // ── Route-change effect ──────────────────────────────────────────────────────
  // - Close non-global main-slot panels on navigation.
  // - On the `decision-assistant` route, force-close the global Assistant slot
  //   (that route is itself the assistant — the floating one would duplicate it).

  useEffect(() => {
    const previousRoute = previousRouteRef.current;

    if (currentRoute !== previousRoute) {
      previousRouteRef.current = currentRoute;

      if (isMainPanelOpen && currentMainPanel && currentMainPanel.level !== 'global') {
        closePanel({ immediate: true });
      }
      // Route changes always tear down section expansion and nested panels.
      setIsSectionExpanded(false);
      setIsSectionExpandedMounted(false);
      setIsSubViewAttached(true);
      setIsSubPanelOpen(false);
      setSubPanel(null);
    }

    const isAssistantRoute =
      currentRoute === 'decision-assistant' ||
      currentRoute === '/decision-assistant';
    if (isAssistantRoute && isAssistantPanelOpen) {
      closeAssistantPanel({ immediate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoute]);

  // ── CSS var sync: expose assistant width to right-anchored panels ────────────
  // While the assistant is open, right-anchored panels (AutomationShellPanel,
  // GridLayout overlay, GlobalPanelRenderer) are shifted left by 320px so they
  // don't render hidden behind the assistant.
  //
  // When the assistant *expands* to full width, we intentionally KEEP the
  // offset at 320px (rather than flipping it to 0px). The full-width assistant
  // overlay covers those panels anyway, and freezing the offset prevents them
  // from animating their `right:` value — which previously looked like the
  // page/section panel was sliding closed underneath the expanding assistant.
  //
  // A separate `--assistant-panel-frozen` flag (0/1) is exposed so consumers
  // can suppress their own transitions while the assistant is expanded, since
  // any layout shifts during this window are not user-meaningful.

  useEffect(() => {
    const root = document.documentElement;
    const offset = isAssistantPanelOpen ? '320px' : '0px';
    root.style.setProperty('--assistant-panel-offset', offset);
    root.style.setProperty(
      '--assistant-panel-frozen',
      isAssistantExpanded ? '1' : '0'
    );
    return () => {
      root.style.removeProperty('--assistant-panel-offset');
      root.style.removeProperty('--assistant-panel-frozen');
    };
  }, [isAssistantPanelOpen, isAssistantExpanded]);

  return (
    <PanelManagerContext.Provider
      value={{
        // main slot
        isPanelOpen: isMainPanelOpen,
        isMainPanelOpen,
        currentPanel: currentMainPanel,
        currentMainPanel,

        // assistant slot
        isAssistantPanelOpen,
        assistantPanel,
        isAssistantExpanded,
        isExpanded: isAssistantExpanded,

        // section-inset expansion + nested sub-panel
        isSectionExpanded,
        isSectionExpandedMounted,
        isSubViewAttached,
        subPanel,
        isSubPanelOpen,

        // actions
        openPanel,
        closePanel,
        closeAssistantPanel,
        togglePanel,
        closeSectionPanels,
        expandPanel,
        collapsePanel,
        expandSectionPanel,
        collapseSectionPanel,
        toggleSubViewAttachment,
        attachSubView,
        detachSubView,
        openSubPanel,
        closeSubPanel,
      }}
    >
      {children}
    </PanelManagerContext.Provider>
  );
}

export function usePanelManager() {
  const context = useContext(PanelManagerContext);
  if (context === undefined) {
    throw new Error('usePanelManager must be used within a PanelManagerProvider');
  }
  return context;
}

export function usePanelTrigger(panelConfig: PanelConfig) {
  const {
    togglePanel,
    isMainPanelOpen,
    currentMainPanel,
    isAssistantPanelOpen,
    assistantPanel,
  } = usePanelManager();

  const targetsAssistant = isAssistantConfig(panelConfig);
  const isActive = targetsAssistant
    ? isAssistantPanelOpen && assistantPanel?.id === panelConfig.id
    : isMainPanelOpen && currentMainPanel?.id === panelConfig.id;

  return {
    onClick: () => togglePanel(panelConfig),
    isActive: Boolean(isActive),
  };
}
