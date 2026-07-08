/**
 * /types/navigation.ts
 *
 * Canonical navigation types and URL↔route mapping utilities for the DI UI.
 * Extracted from App.tsx as part of Phase 1A (React Router migration).
 *
 * Consumers:
 *   - /layouts/AppLayout.tsx
 *   - /hooks/useAppNavigation.ts
 *   - /routes.tsx
 *   - /components/NavigationPanel.tsx  (Phase 1C — currently imports from App.tsx)
 *   - /components/pages/*.tsx          (Phase 1C — currently import from App.tsx or ../../App)
 */

// ── Route identifiers ─────────────────────────────────────────────────────────

/** All top-level and sub-level route identifiers in the DI UI. */
export type NavigationRoute =
  | 'home'
  | 'decision-assistant'
  | 'decision-automations'
  | 'rules-and-policies'
  | 'dashboards'
  | 'objectives-and-goals'
  | 'resource-hub'
  | 'resource-detail'
  | 'automation-detail'
  | 'decision-service-detail'
  | 'decision-model'
  | 'task-model'
  | 'predictive-model'
  | 'optimization-model'
  | 'genai-node';

/** Full application navigation + context state (drives panel system and breadcrumbs). */
export interface AppState {
  currentRoute: NavigationRoute;
  automationId?: string;
  serviceId?: string;
  assetId?: string;
  assetName?: string;
  assetType?: string;
  resourceId?: string;
  resourceName?: string;
}

// ── Sub-route context types ───────────────────────────────────────────────────

/**
 * View context within an automation shell.
 * Set by ApplicationLayoutTemplate via onViewStateChange callback.
 * Used by AppLayout to build dynamic breadcrumb paths.
 */
export interface AutomationViewContext {
  view: string;
  serviceName?: string;
  serviceId?: string;
  assetName?: string;
  assetType?: string;
}

/**
 * Imperative navigation API exposed by ApplicationLayoutTemplate via a ref.
 * Allows parent shell (AppLayout) to drive internal automation sub-navigation
 * from breadcrumb click handlers.
 */
export interface AutomationNavigationRef {
  navigateToView: (
    view: 'automation-overview' | 'services' | 'objectives',
    options?: { serviceId?: string; resetToInitial?: boolean }
  ) => void;
}

// ── URL ↔ Route mapping utilities ────────────────────────────────────────────

/**
 * Maps a URL pathname to the closest NavigationRoute.
 * Prefix matches handle parameterised routes (/automation/:id, /resource/:id).
 */
export function pathnameToRoute(pathname: string): NavigationRoute {
  if (pathname.startsWith('/automation/')) return 'automation-detail';
  if (pathname.startsWith('/resource/')) return 'resource-detail';

  const map: Record<string, NavigationRoute> = {
    '/': 'home',
    '/decision-assistant': 'decision-assistant',
    '/decision-automations': 'decision-automations',
    '/rules-and-policies': 'rules-and-policies',
    '/dashboards': 'dashboards',
    '/objectives-and-goals': 'objectives-and-goals',
    '/resource-hub': 'resource-hub',
  };

  return map[pathname] ?? 'home';
}

/**
 * Maps a NavigationRoute to a URL path.
 * Parameterised routes require the relevant id in the second argument.
 */
export function routeToPath(
  route: NavigationRoute,
  params?: { automationId?: string; resourceId?: string }
): string {
  switch (route) {
    case 'home':                 return '/';
    case 'decision-assistant':   return '/decision-assistant';
    case 'decision-automations': return '/decision-automations';
    case 'automation-detail':    return `/automation/${params?.automationId ?? ''}`;
    case 'rules-and-policies':   return '/rules-and-policies';
    case 'dashboards':           return '/dashboards';
    case 'objectives-and-goals': return '/objectives-and-goals';
    case 'resource-hub':         return '/resource-hub';
    case 'resource-detail':      return `/resource/${params?.resourceId ?? ''}`;
    default:                     return '/';
  }
}
