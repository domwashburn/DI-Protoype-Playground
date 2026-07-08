/**
 * /layouts/AppLayout.tsx
 *
 * Root shell layout for the DI UI — React Router Data Mode replacement for
 * the AppContent + App components in App.tsx (Phase 1A).
 *
 * Responsibilities:
 *   - Provides PanelManagerProvider (wraps entire shell + GlobalPanelRenderer)
 *   - Renders GlobalHeader, GlobalNavigationPanel, BreadcrumbActionBar
 *   - Wraps page content in UniversalPanelWrapper
 *   - Renders <Outlet /> for page-level route children
 *   - Passes AppLayoutOutletContext to children for interim prop bridging (Phase 1B-1C)
 *
 * NOT yet wired into App.tsx — activated in Phase 1B.
 *
 * Phase 1C will remove route wrapper components once pages use useAppNavigation().
 */

import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useMatches, useNavigate } from 'react-router';
import CarbonHeader from '../components/CarbonHeader';
import CarbonSideNav from '../components/CarbonSideNav';
import BreadcrumbActionBar from '../components/BreadcrumbActionBar';
import {
  PanelManagerProvider,
  usePanelManager,
  UniversalPanelWrapper,
  GlobalPanelRenderer,
  ServiceDetailsPanel,
  SettingsPanel,
} from '../components/SidePanel';
import { Theme } from '@carbon/react';
import { Dashboard, Camera, Document } from '@carbon/icons-react';
import { getBranchesForSwitcher } from '../data/branches';
import { useAutomations, useServices } from '../data/hooks';
import {
  type NavigationRoute,
  type AutomationViewContext,
  type AutomationNavigationRef,
  pathnameToRoute,
  routeToPath,
} from '../types/navigation';
import styles from './AppLayout.module.css';

// ── Outlet context ────────────────────────────────────────────────────────────

/**
 * Context passed to all route children via <Outlet context={...} />.
 *
 * Route wrapper components in routes.tsx consume this to bridge props to
 * page components that still use prop-drilled navigation callbacks.
 * Phase 1C replaces all consumers with useAppNavigation().
 */
export interface AppLayoutOutletContext {
  /**
   * Navigation handler — mirrors the handleNavigation signature from App.tsx
   * so route wrappers can pass it directly to existing page component props.
   */
  onNavigate: (
    route: NavigationRoute,
    automationId?: string,
    assetId?: string,
    assetName?: string,
    assetType?: string,
    serviceId?: string,
    resourceId?: string
  ) => void;
  currentBranch: string;
  onBranchChange: (branchId: string) => void;
  branches: ReturnType<typeof getBranchesForSwitcher>;
  /** Callback for ApplicationLayoutTemplate to report sub-view changes for breadcrumbs. */
  onViewStateChange: (ctx: AutomationViewContext) => void;
  /** Ref passed to ApplicationLayoutTemplate for imperative breadcrumb navigation. */
  automationNavigationRef: React.MutableRefObject<AutomationNavigationRef | null>;
}

// ── Inner shell (must be inside PanelManagerProvider) ────────────────────────

function AppShell() {
  const { openPanel, closePanel, isPanelOpen, currentPanel } = usePanelManager();
  const routerNavigate = useNavigate();
  const location = useLocation();
  const matches = useMatches();

  // Derive current route and URL params from the router
  const currentRoute = pathnameToRoute(location.pathname);

  // Merge params from all matched routes (AppLayout has no params; children do)
  const allParams = matches.reduce<Record<string, string | undefined>>(
    (acc, match) => ({ ...acc, ...match.params }),
    {}
  );
  const automationId = allParams.automationId;
  const resourceId   = allParams.resourceId;

  // ── State ───────────────────────────────────────────────────────────────────
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [currentBranch, setCurrentBranch]       = useState('main');
  const [automationViewContext, setAutomationViewContext] =
    useState<AutomationViewContext>({ view: 'automation-overview' });

  const automationNavigationRef = useRef<AutomationNavigationRef | null>(null);

  // Branch data
  const availableBranches = getBranchesForSwitcher(currentBranch);

  // Data lookup (for breadcrumb name resolution)
  const { getAutomationById } = useAutomations();
  const { getServiceById }    = useServices();

  // ── Breadcrumb presence flag ─────────────────────────────────────────────────
  const assetRoutes: NavigationRoute[] = [
    'decision-model', 'task-model', 'predictive-model', 'optimization-model', 'genai-node',
  ];
  const hasBreadcrumb =
    currentRoute === 'automation-detail' ||
    currentRoute === 'decision-service-detail' ||
    currentRoute === 'resource-detail' ||
    assetRoutes.includes(currentRoute);

  // ── Effects ──────────────────────────────────────────────────────────────────

  // Set CSS custom property used by the panel system to position panels below the header
  useEffect(() => {
    const offset = hasBreadcrumb ? '88px' : '48px';
    document.documentElement.style.setProperty('--panel-top-offset', offset);
    // Tells sticky PageHeaderWrapper how far to offset so it clears BreadcrumbActionBar
    document.documentElement.style.setProperty(
      '--page-header-sticky-top',
      hasBreadcrumb ? 'var(--breadcrumb-height, 40px)' : '0px'
    );
    return () => {
      document.documentElement.style.removeProperty('--panel-top-offset');
      document.documentElement.style.removeProperty('--page-header-sticky-top');
    };
  }, [hasBreadcrumb]);

  // Close any open global-overlay panel (e.g. Help) when the navigation drawer opens.
  // The Assistant panel persists across nav and route changes — do not close it here.
  useEffect(() => {
    if (isNavigationOpen && isPanelOpen && currentPanel?.level === 'global') {
      closePanel();
    }
  }, [isNavigationOpen, isPanelOpen, currentPanel, closePanel]);

  // Close navigation drawer on route change
  useEffect(() => {
    setIsNavigationOpen(false);
  }, [location.pathname]);

  // ── Navigation ────────────────────────────────────────────────────────────────

  const toggleNavigation = () => setIsNavigationOpen(prev => !prev);

  /**
   * Central navigation handler. Signature matches App.tsx handleNavigation so
   * route wrapper components can pass it directly to existing page props.
   */
  const handleNavigation = (
    route: NavigationRoute,
    routeAutomationId?: string,
    _assetId?: string,
    _assetName?: string,
    _assetType?: string,
    _serviceId?: string,
    routeResourceId?: string
  ): void => {
    routerNavigate(routeToPath(route, {
      automationId: routeAutomationId,
      resourceId: routeResourceId,
    }));
  };

  // ── Branch ────────────────────────────────────────────────────────────────────

  const handleBranchChange = (branchId: string): void => {
    const branch = availableBranches.find(b => b.id === branchId);
    setCurrentBranch(branch ? branch.name : branchId);
  };

  const handleViewBranches = (): void => {
    console.log('Opening branches tab');
  };

  const getBranchActions = () => {
    let branchType: string;
    if (currentBranch.startsWith('hotfix/'))       branchType = 'hotfix';
    else if (currentBranch.startsWith('feature/')) branchType = 'feature';
    else                                           branchType = currentBranch;

    switch (branchType) {
      case 'main':
        return [
          { label: 'New version',  icon: null, variant: 'secondary' as const, onClick: () => console.log('Create new version') },
          { label: 'New hotfix',   icon: null, variant: 'secondary' as const, onClick: () => console.log('Create new hotfix from main') },
          { label: 'Deploy',       icon: null, variant: 'primary'   as const, onClick: () => console.log('Deploy') },
        ];
      case 'develop':
        return [
          { label: 'New branch', icon: null, variant: 'secondary' as const, onClick: () => console.log('Create new feature branch from develop') },
          { label: 'Publish',    icon: null, variant: 'primary'   as const, onClick: () => console.log('Publish draft to main') },
        ];
      case 'feature':
        return [
          { label: 'Merge',        icon: null, variant: 'primary' as const, onClick: () => console.log('Merge feature to develop') },
        ];
      case 'hotfix':
        return [
          { label: 'Merge hotfix', icon: null, variant: 'primary' as const, onClick: () => console.log('Merge hotfix to main') },
        ];
      default:
        return [];
    }
  };

  // ── Breadcrumb helpers ────────────────────────────────────────────────────────

  const getAutomationName = (id?: string): string => {
    if (!id) return 'Unknown';
    const automation = getAutomationById(id);
    if (automation) return automation.displayName || automation.name;
    const service = getServiceById(id);
    if (service) return service.displayName || service.name;
    return 'Unknown';
  };

  const getResourceName = (id?: string): string =>
    id ? `Resource ${id.substring(0, 8)}...` : 'Unknown Resource';

  const getAutomationBreadcrumbs = () => {
    const crumbs: Array<{
      label: string;
      href?: string;
      onClick?: () => void;
      isActive?: boolean;
    }> = [
      {
        label: 'Decision Automations',
        href: '#',
        onClick: () => handleNavigation('decision-automations'),
      },
      {
        label: getAutomationName(automationId),
        isActive: automationViewContext.view !== 'asset-detail',
        onClick:
          automationViewContext.view === 'asset-detail'
            ? () => automationNavigationRef.current?.navigateToView('automation-overview')
            : undefined,
      },
    ];

    if (automationViewContext.view === 'asset-detail') {
      crumbs[1].isActive = false;
      crumbs.push({
        label: 'Decision Services',
        isActive: false,
        onClick: () =>
          automationNavigationRef.current?.navigateToView('services', { resetToInitial: true }),
      });
      if (automationViewContext.serviceName) {
        crumbs.push({
          label: automationViewContext.serviceName,
          isActive: false,
          onClick: () => {
            if (automationViewContext.serviceId) {
              automationNavigationRef.current?.navigateToView('services', {
                serviceId: automationViewContext.serviceId,
              });
            }
          },
        });
      }
      if (automationViewContext.assetName) {
        crumbs.push({ label: automationViewContext.assetName, isActive: true });
      }
    }

    return crumbs;
  };

  // ── Panel rendering delegation ────────────────────────────────────────────────

  // automation-detail has its own AutomationShellPanelRenderer; delegate to it
  const routesWithCustomPanelRendering: NavigationRoute[] = ['automation-detail'];
  const shouldDelegatePanelRendering = routesWithCustomPanelRendering.includes(currentRoute);

  // Always mount UniversalPanelWrapper so the Assistant slot can push the shell.
  // On delegated routes (automation-detail), the wrapper must NOT render the main-slot
  // panel itself — AutomationShellPanelRenderer owns that — so we pass renderPanel=false.
  const wrapperRendersMainPanel = !shouldDelegatePanelRendering;

  // ── Outlet context ────────────────────────────────────────────────────────────

  const outletContext: AppLayoutOutletContext = {
    onNavigate:             handleNavigation,
    currentBranch,
    onBranchChange:         handleBranchChange,
    branches:               availableBranches,
    onViewStateChange:      setAutomationViewContext,
    automationNavigationRef,
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className={styles.appContainer} data-name="DI UI Template">
      <div className={styles.userInterface} data-name="User Interface">

        {/* Theme wrapper for the UI Shell (g100 dark theme).
            Wraps BOTH Header and SideNav as direct siblings so Carbon's
            `.cds--header ~ .cds--side-nav` sibling selector fires, which
            automatically offsets the SideNav top to 48px (below the header).
            Keeping them as siblings inside a single Theme div is required —
            individual Theme wrappers on each component would break the selector. */}
        <Theme theme="g100">
          <CarbonHeader
            isNavigationOpen={isNavigationOpen}
            onToggleNavigation={toggleNavigation}
            onNavigate={(route) => handleNavigation(route as NavigationRoute)}
            currentRoute={currentRoute}
          />

          <CarbonSideNav
            isOpen={isNavigationOpen}
            onClose={toggleNavigation}
            currentRoute={currentRoute}
            onNavigate={handleNavigation}
          />
        </Theme>

        {/* App Content */}
        <div className={styles.appContent} data-name="App Content">
          <UniversalPanelWrapper renderPanel={wrapperRendersMainPanel}>

            {/* Breadcrumb Action Bar — automation shell
                key is required: Children.toArray in InfluencedLayout processes
                these as a list; stable explicit keys prevent null-key duplicates
                when the conditional renders toggle between renders. */}
            {currentRoute === 'automation-detail' && (
              <BreadcrumbActionBar
                key="breadcrumb-automation"
                breadcrumbs={getAutomationBreadcrumbs()}
                actions={getBranchActions()}
                instanceName="Instance A"
                branches={availableBranches}
                currentBranch={currentBranch}
                onBranchChange={handleBranchChange}
                onViewBranches={handleViewBranches}
                panelTriggers={[
                  {
                    icon: Dashboard,
                    onClick: () =>
                      openPanel({
                        content: <ServiceDetailsPanel serviceName="Decision Service Dashboard" />,
                        pattern: 'overlay',
                        level: 'page',
                        width: 'standard',
                        id: 'dashboard-panel',
                      }),
                  },
                  {
                    icon: Camera,
                    onClick: () =>
                      openPanel({
                        content: <ServiceDetailsPanel serviceName="Monitoring & Analytics" />,
                        pattern: 'overlay',
                        level: 'page',
                        width: 'standard',
                        id: 'camera-panel',
                      }),
                  },
                  {
                    icon: Document,
                    onClick: () =>
                      openPanel({
                        content: <SettingsPanel title="Documentation Settings" />,
                        pattern: 'overlay',
                        level: 'page',
                        width: 'standard',
                        id: 'document-panel',
                      }),
                  },
                ]}
              />
            )}

            {/* Breadcrumb Action Bar — resource detail */}
            {currentRoute === 'resource-detail' && (
              <BreadcrumbActionBar
                key="breadcrumb-resource"
                breadcrumbs={[
                  {
                    label: 'Resource hub',
                    href: '#',
                    onClick: () => handleNavigation('resource-hub'),
                  },
                  { label: getResourceName(resourceId), isActive: true },
                ]}
                actions={[]}
                panelTriggers={[
                  {
                    icon: Document,
                    onClick: () =>
                      openPanel({
                        content: <ServiceDetailsPanel serviceName="Resource Information" />,
                        pattern: 'overlay',
                        level: 'page',
                        width: 'standard',
                        id: 'resource-info-panel',
                      }),
                  },
                ]}
              />
            )}

            <div
              key="page-content"
              className={styles.pageContentWrapper}
              data-name="page content wrapper"
            >
              {/* Route children rendered here */}
              <Outlet context={outletContext} />

              {/*
               * Navigation open overlay — only shown on routes that don't manage
               * their own overlay (automation-detail has AutomationShellPanelRenderer,
               * decision-assistant has its own full-screen layout).
               */}
              {isNavigationOpen &&
                currentRoute !== 'automation-detail' &&
                currentRoute !== 'decision-assistant' && (
                  <div
                    className={`${styles.contentOverlay} ${
                      hasBreadcrumb ? styles.contentOverlayWithBreadcrumb : ''
                    }`}
                    onClick={toggleNavigation}
                    aria-label="Close navigation"
                  />
                )}
            </div>

          </UniversalPanelWrapper>
        </div>

      </div>
    </div>
  );
}

// ── Root export ───────────────────────────────────────────────────────────────

/**
 * AppLayout — root route component rendered by RouterProvider (Phase 1B).
 *
 * Wraps AppShell with PanelManagerProvider so panel state is shared across
 * the entire shell. GlobalPanelRenderer is a sibling to AppShell (matching
 * the current App.tsx structure) so global panels render outside the content flow.
 */
export default function AppLayout() {
  const location = useLocation();
  // Full pathname as the route key so PanelManager closes panels on navigation
  const routeKey = location.pathname;

  return (
    <PanelManagerProvider currentRoute={routeKey}>
      <AppShell />
      {/* Global panels rendered as sibling to the shell, matching App.tsx */}
      <GlobalPanelRenderer />
    </PanelManagerProvider>
  );
}