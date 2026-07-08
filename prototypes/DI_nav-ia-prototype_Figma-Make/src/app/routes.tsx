/**
 * /routes.tsx
 *
 * React Router Data Mode — browser router configuration for the DI UI.
 * Created Phase 1A; wired into App.tsx in Phase 1B; simplified in Phase 1C.
 *
 * Phase 1C status: all page components now use useAppNavigation() and/or
 * useParams() internally. Only two thin wrappers remain:
 *   - DecisionAssistantRoute  — passes navigationBehavior prop to ChatLayoutTemplate
 *   - AutomationDetailRoute   — passes shell-level context (branch, panels, view state)
 *                               to ApplicationLayoutTemplate until Phase 3 completes
 *                               the full self-contained migration.
 */

import { createBrowserRouter, useOutletContext } from 'react-router';
import AppLayout, { type AppLayoutOutletContext } from './layouts/AppLayout';

// Page components (self-contained — no nav props needed)
import HomePage                  from './components/HomePage/HomePage';
import DecisionAutomationsPage   from './components/pages/DecisionAutomationsPage';
import ChatLayoutTemplate        from './components/ChatLayoutTemplate';
import RulesAndPoliciesPage      from './components/pages/RulesAndPoliciesPage';
import DashboardsPage            from './components/pages/DashboardsPage';
import ObjectivesAndGoalsPage    from './components/pages/ObjectivesAndGoalsPage';
import ResourceHubPage           from './components/pages/ResourceHubPage';
import ResourceDetailsPage       from './components/pages/ResourceDetailsPage';
import ApplicationLayoutTemplate from './components/ApplicationLayoutTemplate';

// ── Remaining route wrappers ──────────────────────────────────────────────────

/** Passes the required navigationBehavior prop to ChatLayoutTemplate. */
function DecisionAssistantRoute() {
  return <ChatLayoutTemplate navigationBehavior="overlay" />;
}

/**
 * AutomationDetailRoute
 *
 * Bridges shell-level context (branch, view-state callback, nav ref) from
 * AppLayout to ApplicationLayoutTemplate. The automationId and automationName
 * are now resolved inside ApplicationLayoutTemplate via useParams() and the
 * data layer (Phase 1C). This wrapper will be eliminated in Phase 3 once
 * ApplicationLayoutTemplate is fully self-contained.
 */
function AutomationDetailRoute() {
  const ctx = useOutletContext<AppLayoutOutletContext>();
  return (
    <ApplicationLayoutTemplate
      navigationBehavior="overlay"
      currentBranch={ctx.currentBranch}
      onBranchChange={ctx.onBranchChange}
      branches={ctx.branches}
      onViewStateChange={ctx.onViewStateChange}
      navigationRef={ctx.automationNavigationRef}
    />
  );
}

// ── Router configuration ──────────────────────────────────────────────────────

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true,                        Component: HomePage },
      { path: 'decision-assistant',         Component: DecisionAssistantRoute },
      { path: 'decision-automations',       Component: DecisionAutomationsPage },
      { path: 'automation/:automationId',   Component: AutomationDetailRoute },
      { path: 'rules-and-policies',         Component: RulesAndPoliciesPage },
      { path: 'dashboards',                 Component: DashboardsPage },
      { path: 'objectives-and-goals',       Component: ObjectivesAndGoalsPage },
      { path: 'resource-hub',               Component: ResourceHubPage },
      { path: 'resource/:resourceId',       Component: ResourceDetailsPage },
      { path: '*',                          Component: HomePage },
    ],
  },
]);
