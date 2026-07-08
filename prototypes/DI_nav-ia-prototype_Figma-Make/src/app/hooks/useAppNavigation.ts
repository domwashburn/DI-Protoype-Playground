/**
 * /hooks/useAppNavigation.ts
 *
 * Typed navigation hook for the DI UI.
 * Wraps react-router's useNavigate, useParams, and useLocation with
 * NavigationRoute-typed helpers.
 *
 * Phase 1A: created (not yet consumed).
 * Phase 1C: replaces prop-drilled onNavigate callbacks in all page components.
 *
 * Used in (Phase 1C targets):
 *   - /components/pages/HomePage.tsx
 *   - /components/pages/DecisionAutomationsPage.tsx
 *   - /components/pages/ObjectivesAndGoalsPage.tsx
 *   - /components/pages/ResourceHubPage.tsx
 *   - /components/pages/ResourceDetailsPage.tsx
 *   - /components/pages/AutomationDetailPage.tsx
 *   - /components/ApplicationLayoutTemplate.tsx
 *   - /components/NavigationPanel.tsx
 *
 * @example
 * ```tsx
 * const { navigate, automationId, currentRoute } = useAppNavigation();
 * navigate('automation-detail', { automationId: 'abc123' });
 * ```
 */

import { useNavigate, useParams, useLocation } from 'react-router';
import { type NavigationRoute, pathnameToRoute, routeToPath } from '../types/navigation';

export interface AppNavigationHelpers {
  /** Current NavigationRoute derived from the URL pathname. */
  currentRoute: NavigationRoute;

  /**
   * Typed navigation function.
   * Replaces prop-drilled onNavigate / onNavigateToAutomation callbacks (Phase 1C).
   */
  navigate: (
    route: NavigationRoute,
    params?: { automationId?: string; resourceId?: string }
  ) => void;

  /** automationId URL param — present on /automation/:automationId routes. */
  automationId?: string;

  /** resourceId URL param — present on /resource/:resourceId routes. */
  resourceId?: string;
}

export function useAppNavigation(): AppNavigationHelpers {
  const routerNavigate = useNavigate();
  const params = useParams<{ automationId?: string; resourceId?: string }>();
  const location = useLocation();

  const currentRoute = pathnameToRoute(location.pathname);

  const navigate = (
    route: NavigationRoute,
    routeParams?: { automationId?: string; resourceId?: string }
  ): void => {
    routerNavigate(routeToPath(route, routeParams));
  };

  return {
    currentRoute,
    navigate,
    automationId: params.automationId,
    resourceId: params.resourceId,
  };
}
