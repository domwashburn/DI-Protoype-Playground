/**
 * ApplicationLayoutTemplate - The Automation Shell
 * 
 * This component implements the "Automation Shell" - the layout structure specifically 
 * for viewing an individual decision automation. It maintains automation context throughout
 * internal navigation and provides an SPA-style routing system that swaps VIEWS while preserving:
 * - Breadcrumb + action bar
 * - Side rail navigation
 * - Branch/version context
 * - Automation metadata
 * - Panel state
 * 
 * Terminology:
 * - Application Shell: Global header, L1 navigation, content area, global panels/modals
 * - Automation Shell: This component - breadcrumb + action bar, side rail, panels, and view content
 * - Views: The content rendered in the Automation Shell (Overview, Services, Assets, Branches, etc.)
 * 
 * Architecture:
 * - Internal viewState manages which VIEW renders in the content area
 * - Side rail navigation controls viewState (not Application Shell L1 routes)
 * - All navigation within an automation happens inside this Automation Shell
 * - The shell persists while switching between views
 */

import { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router";
import DecisionAutomationSideNav from "./DecisionAutomationSideNav";
import PageHeader from "./PageHeader";
import BreadcrumbActionBar from "./BreadcrumbActionBar";
import { Settings, Information, Document } from "@carbon/icons-react";
import { 
  PanelManagerProvider, 
  usePanelManager,
  ServiceDetailsPanel,
  SettingsPanel,
  SectionInfluencedLayout,
  AutomationShellPanelRenderer
} from "./SidePanel";
import {
  InboxLayoutTemplate,
  InboxPanelHeader,
  InboxActionButton,
  InboxPanelToolbar,
  InboxPanelList,
  AddIcon,
} from "./InboxLayout";
import LargeListItem from "./LargeListItem";
import PlaceholderContent from "./PlaceholderContent";
import LinkedAutomationCard from "./LinkedAutomationCard";
import CardGrid from "./CardLayout/CardGrid";
import ObjectiveHierarchyTree from "./ObjectiveHierarchyTree";
import DecisionAssetsTable from "./DecisionAssetsTable";
import DataModelsTable from "./DataModelsTable";
import BranchesPage from "./pages/BranchesPage";
import HistoryPage from "./pages/HistoryPage";
import UpdatesPage from "./pages/UpdatesPage";
import TestAutomationPage from "./pages/TestAutomationPage";
import DeployAutomationPage from "./pages/DeployAutomationPage";
import MonitorAutomationPage from "./pages/MonitorAutomationPage";
import AutomationOverviewPage from "./pages/AutomationOverviewPage";
import VersionsPage from "./pages/VersionsPage";
import AutomationSettingsPage from "./pages/AutomationSettingsPage";
import DecisionModelPage from "./pages/DecisionModelPage";
import TaskModelPage from "./pages/TaskModelPage";
import PredictiveModelPage from "./pages/PredictiveModelPage";
import OptimizationModelPage from "./pages/OptimizationModelPage";
import GenAINodePage from "./pages/GenAINodePage";
import RulesAndPoliciesPage from "./pages/RulesAndPoliciesPage";
import DecisionOutcomesPage from "./pages/DecisionOutcomesPage";
import { useServices, useAssets, useObjectives, useGoals, useAutomations } from "../data/hooks";
import svgPaths from "../imports/svg-nx4jc4uvwt";
import styles from "./ApplicationLayoutTemplate.module.css";

// ============================================================================
// Types & Interfaces
// ============================================================================

/**
 * Internal view state for the automation shell
 * This tracks the current view and any associated context (service, asset, etc.)
 */
interface AutomationViewState {
  view: string; // 'automation-overview', 'services', 'asset-detail', 'branches', etc.
  serviceId?: string;
  serviceName?: string;
  assetId?: string;
  assetName?: string;
  assetType?: string;
  subAssetId?: string; // For navigating to a specific sub-asset within a task model
}

interface ApplicationLayoutTemplateProps {
  navigationBehavior?: "overlay" | "push";
  currentBranch?: string;
  onBranchChange?: (branchId: string) => void;
  branches?: Array<{
    id: string;
    name: string;
    isActive?: boolean;
  }>;
  automationId?: string;
  automationName?: string;
  // Initial view state (optional - defaults to overview)
  initialView?: AutomationViewState;
  onViewStateChange?: (context: {
    view: string;
    serviceName?: string;
    serviceId?: string;
    assetName?: string;
    assetType?: string;
  }) => void;
  // Ref to expose navigation function to parent
  navigationRef?: React.MutableRefObject<{
    navigateToView: (view: 'automation-overview' | 'services' | 'objectives', options?: { serviceId?: string; resetToInitial?: boolean }) => void;
  } | null>;
}

interface TabItem {
  id: string;
  label: string;
  isActive?: boolean;
}

// ============================================================================
// Icon Components
// ============================================================================

const ChevronRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M11 8L6.00001 13L5.30001 12.3L9.60001 8L5.30001 3.7L6.00001 3L11 8Z" />
  </svg>
);

const ErrorIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.99999 1.24999C8.84893 1.24285 7.7079 1.4643 6.64308 1.9015C5.57826 2.3387 4.61083 2.98295 3.79689 3.79689C2.98295 4.61083 2.3387 5.57826 1.9015 6.64308C1.4643 7.7079 1.24285 8.84893 1.24999 9.99999C1.24285 11.151 1.4643 12.2921 1.9015 13.3569C2.3387 14.4217 2.98295 15.3891 3.79689 16.2031C4.61083 17.017 5.57826 17.6613 6.64308 18.0985C7.7079 18.5357 8.84893 18.7571 9.99999 18.75C11.151 18.7571 12.2921 18.5357 13.3569 18.0985C14.4217 17.6613 15.3891 17.017 16.2031 16.2031C17.017 15.3891 17.6613 14.4217 18.0985 13.3569C18.5357 12.2921 18.7571 11.151 18.75 9.99999C18.7571 8.84893 18.5357 7.7079 18.0985 6.64308C17.6613 5.57826 17.017 4.61083 16.2031 3.79689C15.3891 2.98295 14.4217 2.3387 13.3569 1.9015C12.2921 1.4643 11.151 1.24285 9.99999 1.24999ZM13.403 14.375L5.62499 6.5973L6.5973 5.62499L14.375 13.403L13.403 14.375Z" />
  </svg>
);

// ============================================================================
// Main Component
// ============================================================================

function ApplicationLayoutTemplate({
  navigationBehavior = "overlay",
  currentBranch = "main",
  onBranchChange,
  branches,
  automationId: automationIdProp,
  automationName: automationNameProp = "Decision Automation",
  initialView,
  onViewStateChange,
  navigationRef,
}: ApplicationLayoutTemplateProps) {
  // Phase 1C: resolve automationId from URL param; prop takes precedence for
  // backward-compat sub-component usage rendered outside the router.
  const { automationId: routeAutomationId } = useParams<{ automationId?: string }>();
  const automationId = automationIdProp ?? routeAutomationId;
  // Provide local alias so the rest of the 1200-line body is unchanged.
  const automationName = automationNameProp;

  // Get services data from centralized source
  const { services: allServices } = useServices({ automationId });
  
  // Get all assets to calculate accurate counts per service
  const { assets: allAssetsForCounting } = useAssets({});
  
  // Get objectives data from centralized source
  const { objectives: allObjectives } = useObjectives();
  
  // Get goals and automations for objectives view
  const { goals: allGoals } = useGoals();
  const { automations: allAutomationsData } = useAutomations();
  
  // Filter objectives to only show those linked to this automation
  const linkedObjectives = useMemo(() => {
    if (!automationId) return [];
    return allObjectives.filter(obj => obj.automationIds.includes(automationId));
  }, [allObjectives, automationId]);
  
  // Filter services for this automation
  const services = useMemo(() => {
    if (!automationId) return [];
    return allServices.map(service => {
      // Count assets for this service from the actual assets data
      const assetCount = allAssetsForCounting.filter(asset => asset.serviceId === service.id).length;
      
      return {
        id: service.id,
        name: service.displayName || service.name,
        details: [
          `${assetCount} asset${assetCount !== 1 ? 's' : ''}`,
          `Status: ${service.status}`
        ]
      };
    });
  }, [allServices, allAssetsForCounting, automationId]);

  // UI State
  const [isLeftNavExpanded, setIsLeftNavExpanded] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("models");
  
  // **KEY**: Internal View State - this maintains the automation context
  const [viewState, setViewState] = useState<AutomationViewState>(
    initialView || { view: "automation-overview" }
  );
  
  // Inbox selection state (for services and objectives) - initialize with first service
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || "");
  const [selectedObjectiveId, setSelectedObjectiveId] = useState(linkedObjectives[0]?.id || "");
  
  // Update selected service if services change and current selection is invalid
  useEffect(() => {
    if (services.length > 0 && !services.find(s => s.id === selectedServiceId)) {
      setSelectedServiceId(services[0].id);
    }
  }, [services, selectedServiceId]);
  
  // Update selected objective if objectives change and current selection is invalid
  useEffect(() => {
    if (linkedObjectives.length > 0 && !linkedObjectives.find(o => o.id === selectedObjectiveId)) {
      setSelectedObjectiveId(linkedObjectives[0].id);
    }
  }, [linkedObjectives, selectedObjectiveId]);
  
  // Access panel manager to close panels on internal navigation
  const { closePanel, closeSectionPanels, isPanelOpen, currentPanel } = usePanelManager();
  
  // Track previous view state to only close panels on actual navigation
  const prevViewStateRef = useRef({ 
    view: viewState.view, 
    serviceId: selectedServiceId,
    objectiveId: selectedObjectiveId 
  });
  
  // Drilling deeper: Close page and section panels when navigating to asset details
  // This provides a clean slate when moving to a more detailed view
  useEffect(() => {
    if (!isPanelOpen) return;
    
    // When navigating to asset detail view (drilling deeper), close page and section panels
    // Keep global panels open
    if (viewState.view === 'asset-detail' && currentPanel?.level !== 'global') {
      closePanel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewState.view, viewState.assetId]);
  
  // Section-level navigation: Close section panels when switching views or selections
  // Only closes if there's an actual change (not just a re-render)
  useEffect(() => {
    const prev = prevViewStateRef.current;
    const hasViewChanged = prev.view !== viewState.view;
    const hasServiceChanged = prev.serviceId !== selectedServiceId;
    const hasObjectiveChanged = prev.objectiveId !== selectedObjectiveId;
    
    // Update ref for next comparison
    prevViewStateRef.current = {
      view: viewState.view,
      serviceId: selectedServiceId,
      objectiveId: selectedObjectiveId
    };
    
    // Only close panels if something actually changed AND panel is open
    if (!isPanelOpen) return;
    if (!hasViewChanged && !hasServiceChanged && !hasObjectiveChanged) return;
    
    // Close section-level panels when navigating between views or selections
    // Skip if we're navigating to asset-detail (handled by the useEffect above)
    if (viewState.view !== 'asset-detail' && currentPanel?.level === 'section') {
      closeSectionPanels();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewState.view, selectedServiceId, selectedObjectiveId]);

  // Notify parent of view state changes for breadcrumb updates
  useEffect(() => {
    if (onViewStateChange) {
      onViewStateChange({
        view: viewState.view,
        serviceName: viewState.serviceName,
        serviceId: viewState.serviceId,
        assetName: viewState.assetName,
        assetType: viewState.assetType
      });
    }
  }, [viewState, onViewStateChange]);

  // Expose navigation function to parent via ref
  useEffect(() => {
    if (navigationRef) {
      navigationRef.current = {
        navigateToView: (view: 'automation-overview' | 'services' | 'objectives', options?: { serviceId?: string; resetToInitial?: boolean }) => {
          setViewState({ view });
          // If navigating to services and a serviceId is provided, pre-select it
          if (view === 'services') {
            if (options?.resetToInitial) {
              // Reset to initial state (first service)
              setSelectedServiceId('service-01');
            } else if (options?.serviceId) {
              // Navigate to specific service
              setSelectedServiceId(options.serviceId);
            }
          }
          // Similar logic for objectives if needed
          if (view === 'objectives' && options?.resetToInitial) {
            setSelectedObjectiveId(linkedObjectives[0]?.id || '');
          }
        }
      };
    }
  }, [navigationRef]);

  // ============================================================================
  // Computed Values for Objectives View
  // ============================================================================
  
  // Get selected objective and related data
  const selectedObjective = useMemo(() => {
    return allObjectives.find(obj => obj.id === selectedObjectiveId);
  }, [allObjectives, selectedObjectiveId]);
  
  const selectedGoal = useMemo(() => {
    if (!selectedObjective?.goalId) return null;
    return allGoals.find(g => g.id === selectedObjective.goalId);
  }, [allGoals, selectedObjective]);
  
  const linkedAutomationsForObjective = useMemo(() => {
    if (!selectedObjective || !selectedObjective.automationIds) return [];
    return allAutomationsData.filter(auto => 
      selectedObjective.automationIds.includes(auto.id)
    );
  }, [allAutomationsData, selectedObjective]);

  // ============================================================================
  // Navigation Handlers
  // ============================================================================

  /**
   * Main internal navigation handler
   * This changes the view within the automation shell without changing L1 routes
   */
  const handleInternalNavigation = (newViewState: Partial<AutomationViewState>) => {
    setViewState(prev => ({
      ...prev,
      ...newViewState
    }));
  };

  /**
   * Handle side rail navigation item changes
   */
  const handleNavigationItemChange = (itemId: string) => {
    // Merge with existing state instead of replacing it entirely
    // This preserves context like serviceId, assetId, etc.
    setViewState(prev => ({ ...prev, view: itemId }));
  };

  /**
   * Handle asset clicks from tables/lists
   */
  const handleAssetClick = (assetType: string, serviceId: string, assetId: string, assetName: string, assetTypeLabel: string, subAssetId?: string) => {
    // Find service name for breadcrumbs
    const service = services.find(s => s.id === serviceId);
    handleInternalNavigation({
      view: 'asset-detail',
      serviceId,
      serviceName: service?.name || 'Service',
      assetId,
      assetName,
      assetType: assetTypeLabel,
      subAssetId
    });
  };

  /**
   * Handle service clicks from inbox
   */
  const handleServiceClick = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    // Find service name for breadcrumbs
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setViewState(prev => ({
        ...prev,
        serviceName: service.name
      }));
    }
  };

  /**
   * Handle menu actions from inbox items
   */
  const handleInboxMenuAction = (action: string, id: string) => {
    console.log(`Menu action: ${action} on item: ${id}`);
    // Add specific handling for different actions here
    switch (action) {
      case 'Edit service':
      case 'Edit objective':
        console.log('Edit action not yet implemented');
        break;
      case 'Service settings':
      case 'Objective settings':
        console.log('Settings action not yet implemented');
        break;
      case 'Duplicate':
        console.log('Duplicate action not yet implemented');
        break;
      case 'Export':
        console.log('Export action not yet implemented');
        break;
      case 'Delete':
        console.log('Delete action not yet implemented');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  // ============================================================================
  // UI Handlers
  // ============================================================================

  const toggleLeftNav = () => {
    setIsLeftNavExpanded(!isLeftNavExpanded);
  };

  const collapseLeftNav = () => {
    setIsLeftNavExpanded(false);
  };

  const toggleRightPanel = () => {
    setIsRightPanelOpen(!isRightPanelOpen);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Menu action handler for services and objectives
  const handleMenuAction = (action: string, itemId: string) => {
    console.log(`${action} for item ${itemId}`);
  };

  // Get menu items for services
  const getServiceMenuItems = (serviceId: string) => [
    {
      label: "Edit service",
      onClick: () => handleMenuAction("Edit service", serviceId),
    },
    {
      label: "Service settings",
      onClick: () => handleMenuAction("Service settings", serviceId),
    },
    {
      label: "Duplicate",
      onClick: () => handleMenuAction("Duplicate", serviceId),
    },
    {
      label: "Export",
      onClick: () => handleMenuAction("Export", serviceId),
    },
    { isDivider: true, label: "", onClick: () => {} },
    {
      label: "Delete",
      onClick: () => handleMenuAction("Delete", serviceId),
      isDanger: true,
    },
  ];

  // Get menu items for objectives
  const getObjectiveMenuItems = (objectiveId: string) => [
    {
      label: "Edit objective",
      onClick: () => handleMenuAction("Edit objective", objectiveId),
    },
    {
      label: "Objective settings",
      onClick: () => handleMenuAction("Objective settings", objectiveId),
    },
    {
      label: "Duplicate",
      onClick: () => handleMenuAction("Duplicate", objectiveId),
    },
    {
      label: "Export",
      onClick: () => handleMenuAction("Export", objectiveId),
    },
    { isDivider: true, label: "", onClick: () => {} },
    {
      label: "Delete",
      onClick: () => handleMenuAction("Delete", objectiveId),
      isDanger: true,
    },
  ];

  // ============================================================================
  // Breadcrumb Builder
  // ============================================================================

  /**
   * Dynamically builds breadcrumbs based on current view state
   */
  const getBreadcrumbs = () => {
    const baseCrumbs = [
      { 
        label: "Decision Automations", 
        href: "#",
        onClick: () => console.log("Navigate to automations list") // This would go back to L1
      },
      { 
        label: automationName, 
        href: "#",
        onClick: () => handleInternalNavigation({ view: 'automation-overview' })
      }
    ];

    // Add context-specific breadcrumbs based on view
    if (viewState.view === 'asset-detail' && viewState.serviceName && viewState.assetName) {
      return [
        ...baseCrumbs,
        { 
          label: "Decision Services", 
          href: "#",
          onClick: () => handleInternalNavigation({ view: 'services' })
        },
        { 
          label: viewState.serviceName, 
          href: "#",
          onClick: () => {
            setSelectedServiceId(viewState.serviceId || '');
            handleInternalNavigation({ 
              view: 'services',
              serviceId: viewState.serviceId,
              serviceName: viewState.serviceName
            });
          }
        },
        { 
          label: viewState.assetName, 
          isActive: true
        }
      ];
    }

    return baseCrumbs;
  };

  // ============================================================================
  // View Router - Returns content for the current view
  // ============================================================================

  const renderViewContent = () => {
    const { view } = viewState;

    // Asset Detail Views
    if (view === 'asset-detail') {
      const assetId = viewState.assetId || '';
      const assetName = viewState.assetName || '';
      
      switch (viewState.assetType) {
        case 'Decision Model':
          return <DecisionModelPage assetId={assetId} assetName={assetName} />;
        case 'Task Model':
          return <TaskModelPage assetId={assetId} assetName={assetName} initialSelectedSubAssetId={viewState.subAssetId} />;
        case 'Predictive Model':
          return <PredictiveModelPage assetId={assetId} assetName={assetName} />;
        case 'Optimization Model':
          return <OptimizationModelPage assetId={assetId} assetName={assetName} />;
        case 'GenAI Node':
          return <GenAINodePage assetId={assetId} assetName={assetName} />;
        default:
          return <PlaceholderContent title="Asset not found" description="The requested asset type is not supported." variant="section" />;
      }
    }

    // Special standalone pages
    switch (view) {
      case 'automation-overview':
        return <AutomationOverviewPage onAssetClick={(route, automationIdParam, assetId, assetName, assetType, serviceId) => {
          // Map params: route -> assetType, serviceId -> serviceId, assetId -> assetId, 
          // assetName -> assetName, assetType -> assetTypeLabel
          handleAssetClick(route, serviceId || '', assetId || '', assetName || '', assetType || '');
        }} automationId={automationId} />;
      case 'branches':
        return <BranchesPage />;
      case 'history':
        return <HistoryPage automationId={automationId} />;
      case 'updates':
        return <UpdatesPage />;
      case 'testing':
        return <TestAutomationPage automationId={automationId} />;
      case 'deploy':
        return <DeployAutomationPage automationId={automationId} />;
      case 'monitor':
        return <MonitorAutomationPage automationId={automationId} />;
      case 'versions':
        return <VersionsPage />;
      case 'settings':
        return <AutomationSettingsPage />;
      case 'policies-rules':
        return <RulesAndPoliciesPage />;
      case 'decision-outcomes':
        return <DecisionOutcomesPage />;
      default:
        return null;
    }
  };

  // ============================================================================
  // Check if current view needs special layout
  // ============================================================================

  const specialPages = [
    "automation-overview",
    "branches", 
    "history", 
    "updates", 
    "testing", 
    "deploy", 
    "monitor",
    "versions",
    "settings",
    "policies-rules",
    "asset-detail",
    "decision-outcomes"
  ];
  
  const isSpecialPage = specialPages.includes(viewState.view);
  const isInboxView = viewState.view === "services" || viewState.view === "objectives";

  // ============================================================================
  // Render
  // ============================================================================

  let layoutContent = null;

  if (isSpecialPage) {
    const content = renderViewContent();
    
    layoutContent = (
      <>
        <div 
          className={`${styles.applicationContent} ${navigationBehavior === 'push' ? styles.pushMode : styles.overlayMode}`} 
          data-name="Automation Shell Content"
        >
          {/* Side Rail Navigation */}
          <DecisionAutomationSideNav 
            isExpanded={isLeftNavExpanded}
            onToggle={toggleLeftNav}
            behavior={navigationBehavior}
            activeItemId={viewState.view === 'asset-detail' ? 'services' : viewState.view}
            onActiveItemChange={handleNavigationItemChange}
            onCollapseRail={collapseLeftNav}
            currentBranch={currentBranch}
            onBranchChange={onBranchChange}
            branches={branches}
          />

          {/* View Content Area */}
          <div 
            className={`${styles.mainContent} ${isLeftNavExpanded ? styles.mainContentExpanded : ''} ${navigationBehavior === 'push' ? styles.pushContent : ''}`} 
            data-name="View Content"
          >
            {content}
          </div>
        </div>
        
        {/* Page-level panels for pages with side rails - positioned relative to viewport */}
        <AutomationShellPanelRenderer />
      </>
    );
  } else if (isInboxView) {
    layoutContent = (
      <>
      <div
        className={`${styles.applicationContent} ${navigationBehavior === "push" ? styles.pushMode : styles.overlayMode}`}
        data-name="Automation Shell Content"
      >
        {/* Side Rail Navigation */}
        <DecisionAutomationSideNav
          isExpanded={isLeftNavExpanded}
          onToggle={toggleLeftNav}
          behavior={navigationBehavior}
          activeItemId={viewState.view}
          onActiveItemChange={handleNavigationItemChange}
          onCollapseRail={collapseLeftNav}
          currentBranch={currentBranch}
          onBranchChange={onBranchChange}
          branches={branches}
        />

        {/* View Content with Inbox Layout */}
        <div
          className={`${styles.mainContent} ${isLeftNavExpanded ? styles.mainContentExpanded : ""} ${navigationBehavior === "push" ? styles.pushContent : ""}`}
          data-name="View Content"
        >
          <InboxLayoutTemplate
            sidebar={
              <>
                {viewState.view === "services" ? (
                  <>
                    <InboxPanelHeader title="Decision services" />
                    <InboxActionButton
                      label="New decision service"
                      icon={AddIcon}
                      variant="combo"
                      size="sm"
                      fullWidth={true}
                      onClick={() => console.log("Create new decision service")}
                      menuItems={[
                        { label: "From template", onClick: () => console.log("From template") },
                        { label: "From existing", onClick: () => console.log("From existing") },
                        { label: "Blank service", onClick: () => console.log("Blank service") }
                      ]}
                    />
                    <InboxPanelToolbar
                      searchPlaceholder="Find a decision service"
                    />
                    <InboxPanelList
                      items={services}
                      selectedItemId={selectedServiceId}
                      onItemClick={handleServiceClick}
                      onMenuAction={handleInboxMenuAction}
                      getMenuItems={getServiceMenuItems}
                    />
                  </>
                ) : (
                  <>
                    <InboxPanelHeader title="Linked objectives" />
                    <InboxActionButton
                      label="New objective"
                      icon={AddIcon}
                      variant="combo"
                      size="sm"
                      fullWidth={true}
                      onClick={() => console.log("Create new objective")}
                      menuItems={[
                        { label: "From template", onClick: () => console.log("From template") },
                        { label: "Blank objective", onClick: () => console.log("Blank objective") }
                      ]}
                    />
                    <InboxPanelToolbar
                      searchPlaceholder="Find a business objective"
                    />
                    <InboxPanelList
                      items={linkedObjectives.map(obj => ({
                        id: obj.id,
                        name: obj.name,
                        description: obj.description
                      }))}
                      selectedItemId={selectedObjectiveId}
                      onItemClick={setSelectedObjectiveId}
                      onMenuAction={handleInboxMenuAction}
                      getMenuItems={getObjectiveMenuItems}
                      variant="description"
                    />
                  </>
                )}
              </>
            }
          >
            {/* Page Header with Tabs - OUTSIDE SectionInfluencedLayout */}
            <PageHeader
              title={
                viewState.view === "objectives"
                  ? selectedObjective?.name || "Business Objective"
                  : services.find(s => s.id === selectedServiceId)?.name || "{Decision Service Name}"
              }
              status={
                viewState.view === "services" 
                  ? {
                      label: "published",
                      variant: "published",
                    }
                  : undefined
              }
              actions={[
                {
                  label:
                    viewState.view === "objectives"
                      ? "New objective"
                      : "create...",
                  icon: null,
                  variant: "secondary",
                  onClick: () => console.log("Create clicked"),
                },
              ]}
              tabs={
                viewState.view === "objectives"
                  ? [
                      {
                        id: "overview",
                        label: "Overview",
                        isActive: activeTab === "overview",
                      },
                      {
                        id: "kpis",
                        label: "KPIs",
                        isActive: activeTab === "kpis",
                      },
                      {
                        id: "insights",
                        label: "Insights",
                        isActive: activeTab === "insights",
                      },
                      {
                        id: "associated",
                        label: "Associated",
                        isActive: activeTab === "associated",
                      },
                      {
                        id: "manage",
                        label: "Manage",
                        isActive: activeTab === "manage",
                      },
                    ]
                  : [
                      {
                        id: "models",
                        label: "Service assets",
                        isActive: activeTab === "models",
                      },
                      {
                        id: "data",
                        label: "Data Models",
                        isActive: activeTab === "data",
                      },
                      {
                        id: "decision-operations",
                        label: "Decision Operations",
                        isActive: activeTab === "decision-operations",
                      },
                      {
                        id: "decision-service-settings",
                        label: "Decision service settings",
                        isActive: activeTab === "decision-service-settings",
                      },
                    ]
              }
              onTabChange={handleTabChange}
            />

            {/* Section Content - INSIDE SectionInfluencedLayout */}
            <SectionInfluencedLayout>
              <div className={styles.pageContainer}>
                <div className={styles.pageContent}>
                  {/* View Content Area */}
                  <div className={styles.contentArea}>
                    {viewState.view === "services" ? (
                      <>
                        {activeTab === "models" && (
                          <DecisionAssetsTable 
                            onAssetClick={(route, automationIdParam, assetId, assetName, assetType, serviceId, subAssetId) => {
                              // Map DecisionAssetsTable params to handleAssetClick params
                              // route -> assetType (route name), serviceId -> serviceId, assetId -> assetId, 
                              // assetName -> assetName, assetType -> assetTypeLabel (display name)
                              // subAssetId -> optional sub-asset to select in task model tree view
                              handleAssetClick(route, serviceId || selectedServiceId, assetId || '', assetName || '', assetType || '', subAssetId);
                            }}
                            automationId={automationId || ''}
                            serviceId={selectedServiceId}
                          />
                        )}
                        {activeTab === "data" && (
                          <DataModelsTable 
                            automationId={automationId || ''}
                            serviceId={selectedServiceId}
                          />
                        )}
                        {activeTab === "decision-operations" && (
                          <PlaceholderContent
                            title="Decision Operations"
                            description="Decision operations content will be displayed here."
                            variant="section"
                          />
                        )}
                        {activeTab === "decision-service-settings" && (
                          <PlaceholderContent
                            title="Decision Service Settings"
                            description="Decision service settings content will be displayed here."
                            variant="section"
                          />
                        )}
                      </>
                    ) : viewState.view === "objectives" ? (
                      <>
                        {linkedObjectives.length === 0 ? (
                          /* Empty state for no linked objectives */
                          <div className={styles.emptyObjectivesContainer}>
                            <div className={styles.emptyObjectivesContent}>
                              <div className={styles.emptyObjectivesIcon}>
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                  <path d="M24 4L6 14V34L24 44L42 34V14L24 4Z" stroke="var(--cds-icon-secondary)" strokeWidth="2" fill="none" />
                                  <circle cx="24" cy="24" r="6" fill="var(--cds-icon-primary)" />
                                </svg>
                              </div>
                              
                              <h2 className={styles.emptyObjectivesTitle}>No Linked Objectives</h2>
                              
                              <p className={styles.emptyObjectivesDescription}>
                                This automation is not currently linked to any business objectives. Link objectives to track how this automation contributes to organizational goals and measure its impact on key results.
                              </p>

                              <div className={styles.emptyObjectivesFeatureList}>
                                <div className={styles.emptyObjectivesFeatureItem}>
                                  <div className={styles.emptyObjectivesFeatureIcon}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                      <circle cx="10" cy="10" r="8" stroke="var(--cds-icon-secondary)" strokeWidth="1.5" fill="none" />
                                      <path d="M6 10L9 13L14 7" stroke="var(--cds-icon-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                  <div className={styles.emptyObjectivesFeatureText}>
                                    <div className={styles.emptyObjectivesFeatureTitle}>Track Progress</div>
                                    <div className={styles.emptyObjectivesFeatureDescription}>
                                      Monitor how this automation contributes to achieving specific business objectives and key results.
                                    </div>
                                  </div>
                                </div>

                                <div className={styles.emptyObjectivesFeatureItem}>
                                  <div className={styles.emptyObjectivesFeatureIcon}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                      <circle cx="10" cy="10" r="8" stroke="var(--cds-icon-secondary)" strokeWidth="1.5" fill="none" />
                                      <path d="M6 10L9 13L14 7" stroke="var(--cds-icon-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                  <div className={styles.emptyObjectivesFeatureText}>
                                    <div className={styles.emptyObjectivesFeatureTitle}>Measure Impact</div>
                                    <div className={styles.emptyObjectivesFeatureDescription}>
                                      Understand the business value delivered by this automation through objective-level metrics and KPIs.
                                    </div>
                                  </div>
                                </div>

                                <div className={styles.emptyObjectivesFeatureItem}>
                                  <div className={styles.emptyObjectivesFeatureIcon}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                      <circle cx="10" cy="10" r="8" stroke="var(--cds-icon-secondary)" strokeWidth="1.5" fill="none" />
                                      <path d="M6 10L9 13L14 7" stroke="var(--cds-icon-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                  <div className={styles.emptyObjectivesFeatureText}>
                                    <div className={styles.emptyObjectivesFeatureTitle}>Align Strategy</div>
                                    <div className={styles.emptyObjectivesFeatureDescription}>
                                      Ensure your automation efforts are aligned with organizational strategy and business priorities.
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className={styles.emptyObjectivesInfoBox}>
                                <div className={styles.emptyObjectivesInfoIcon}>
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="7" stroke="var(--cds-icon-secondary)" strokeWidth="1.5" fill="none" />
                                    <path d="M8 8V11M8 5V5.5" stroke="var(--cds-icon-secondary)" strokeWidth="1.5" strokeLinecap="round" />
                                  </svg>
                                </div>
                                <div className={styles.emptyObjectivesInfoText}>
                                  Link business objectives to this automation from the Objectives & Goals page, or create a new objective that this automation will support.
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                        {activeTab === "overview" && (
                          selectedObjective ? (
                          <div className={styles.objectiveOverview}>
                            {/* Objective Details */}
                            <div className={styles.objectiveSection}>
                              <h3 className={styles.objectiveSectionTitle}>Objective Details</h3>
                              <div className={styles.objectiveDetailGrid}>
                                <div className={styles.objectiveDetailItem}>
                                  <span className={styles.objectiveDetailLabel}>Status</span>
                                  <span className={`${styles.objectiveDetailValue} ${styles[`status-${selectedObjective.status}`]}`}>
                                    {selectedObjective.status?.replace('-', ' ')}
                                  </span>
                                </div>
                                <div className={styles.objectiveDetailItem}>
                                  <span className={styles.objectiveDetailLabel}>Priority</span>
                                  <span className={`${styles.objectiveDetailValue} ${styles[`priority-${selectedObjective.priority}`]}`}>
                                    {selectedObjective.priority}
                                  </span>
                                </div>
                                <div className={styles.objectiveDetailItem}>
                                  <span className={styles.objectiveDetailLabel}>Category</span>
                                  <span className={styles.objectiveDetailValue}>
                                    {selectedObjective.category?.replace('-', ' ')}
                                  </span>
                                </div>
                                <div className={styles.objectiveDetailItem}>
                                  <span className={styles.objectiveDetailLabel}>Progress</span>
                                  <span className={styles.objectiveDetailValue}>
                                    {selectedObjective.progress}%
                                  </span>
                                </div>
                              </div>
                              <div className={styles.objectiveProgressBar}>
                                <div
                                  className={styles.objectiveProgressFill}
                                  style={{ width: `${selectedObjective.progress || 0}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Description */}
                            <div className={styles.objectiveSection}>
                              <h3 className={styles.objectiveSectionTitle}>Description</h3>
                              <p className={styles.objectiveSectionText}>
                                {selectedObjective.description}
                              </p>
                            </div>

                            {/* Strategic Goal */}
                            {selectedGoal && (
                              <div className={styles.objectiveSection}>
                                <h3 className={styles.objectiveSectionTitle}>Strategic Goal</h3>
                                <div className={styles.objectiveGoalCard}>
                                  <div className={styles.objectiveGoalHeader}>
                                    <span className={styles.objectiveGoalName}>{selectedGoal.name}</span>
                                    <span className={styles.objectiveGoalProgress}>{selectedGoal.progress}%</span>
                                  </div>
                                  <p className={styles.objectiveGoalDescription}>{selectedGoal.description}</p>
                                  <div className={styles.objectiveGoalMeta}>
                                    <span className={styles.objectiveGoalImpact}>{selectedGoal.impactArea}</span>
                                    <span className={`${styles.objectiveGoalStatus} ${styles[`status-${selectedGoal.status}`]}`}>
                                      {selectedGoal.status.replace('-', ' ')}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Owner & Team */}
                            <div className={styles.objectiveSection}>
                              <h3 className={styles.objectiveSectionTitle}>Owner & Team</h3>
                              <div className={styles.objectiveTeamList}>
                                <div className={styles.objectiveTeamMember}>
                                  <div className={styles.objectiveMemberAvatar}>
                                    {selectedObjective.owner
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </div>
                                  <div className={styles.objectiveMemberInfo}>
                                    <div className={styles.objectiveMemberName}>
                                      {selectedObjective.owner}
                                    </div>
                                    <div className={styles.objectiveMemberRole}>Owner</div>
                                    {selectedObjective.team && (
                                      <div className={styles.objectiveMemberTeam}>
                                        {selectedObjective.team}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Timeline */}
                            <div className={styles.objectiveSection}>
                              <h3 className={styles.objectiveSectionTitle}>Timeline</h3>
                              <div className={styles.objectiveTimeline}>
                                <div className={styles.objectiveTimelineItem}>
                                  <span className={styles.objectiveTimelineLabel}>Start Date</span>
                                  <span className={styles.objectiveTimelineValue}>
                                    {new Date(selectedObjective.startDate).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className={styles.objectiveTimelineItem}>
                                  <span className={styles.objectiveTimelineLabel}>Target Date</span>
                                  <span className={styles.objectiveTimelineValue}>
                                    {new Date(selectedObjective.targetDate).toLocaleDateString()}
                                  </span>
                                </div>
                                {selectedObjective.achievedDate && (
                                  <div className={styles.objectiveTimelineItem}>
                                    <span className={styles.objectiveTimelineLabel}>Achieved Date</span>
                                    <span className={styles.objectiveTimelineValue}>
                                      {new Date(selectedObjective.achievedDate).toLocaleDateString()}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          ) : (
                            <PlaceholderContent
                              title="No objective selected"
                              description="Select an objective from the list to view its details."
                              variant="section"
                            />
                          )
                        )}
                        
                        {activeTab === "kpis" && (
                          <PlaceholderContent
                            title="KPIs"
                            description="Key performance indicators and metrics will appear here."
                            variant="section"
                          />
                        )}
                        
                        {activeTab === "insights" && (
                          <PlaceholderContent
                            title="Insights"
                            description="Data-driven insights and analysis will appear here."
                            variant="section"
                          />
                        )}
                        
                        {activeTab === "associated" && (
                          selectedObjective ? (
                          <div className={styles.objectiveAssociatedTab}>
                            {linkedAutomationsForObjective.length > 0 ? (
                              <>
                                <div className={styles.objectiveAutomationsHeader}>
                                  <h2 className={styles.objectiveAutomationsTitle}>
                                    Decision automations supporting this objective
                                  </h2>
                                  <p className={styles.objectiveAutomationsDescription}>
                                    These automations directly contribute to achieving this business objective.
                                  </p>
                                </div>
                                <CardGrid viewMode="grid">
                                  {linkedAutomationsForObjective.map((automation) => (
                                    <LinkedAutomationCard 
                                      key={automation.id} 
                                      automation={automation}
                                      onClick={(automationId) => {
                                        // Navigate to the automation overview by changing the automation shell context
                                        console.log('Navigate to automation:', automationId);
                                        // This would require a callback to parent to change automationId in ApplicationLayoutTemplate
                                        // For now, we'll just log - full implementation would need routing support
                                      }}
                                    />
                                  ))}
                                </CardGrid>
                                
                                {/* Objective Hierarchy */}
                                <div className={styles.objectiveHierarchySection}>
                                  <h2 className={styles.objectiveAutomationsTitle}>Objective Hierarchy</h2>
                                  <p className={styles.objectiveAutomationsDescription}>
                                    View parent and child objectives to understand how this objective fits into the broader organizational structure.
                                  </p>
                                  <ObjectiveHierarchyTree
                                    currentObjective={selectedObjective}
                                    allObjectives={allObjectives}
                                  />
                                </div>
                              </>
                            ) : (
                              <div className={styles.objectiveEmptyState}>
                                <h3 className={styles.objectiveEmptyStateTitle}>No linked automations</h3>
                                <p className={styles.objectiveEmptyStateText}>
                                  This objective doesn't have any linked decision automations yet. Link automations to track how they contribute to achieving this objective.
                                </p>
                              </div>
                            )}
                          </div>
                          ) : (
                            <PlaceholderContent
                              title="No objective selected"
                              description="Select an objective from the list to view associated automations."
                              variant="section"
                            />
                          )
                        )}
                        
                        {activeTab === "manage" && (
                          <PlaceholderContent
                            title="Manage"
                            description="Management settings and configuration options will appear here."
                            variant="section"
                          />
                        )}
                      </>
                        )
                      }
                      </>
                    ) : (
                      <PlaceholderContent
                        title="Content not available"
                        description="The requested content is not available."
                        variant="section"
                      />
                    )}
                  </div>
                </div>
              </div>
            </SectionInfluencedLayout>
          </InboxLayoutTemplate>
        </div>

        {/* Right Panel Toggle Button */}
        <button
          className={styles.rightPanelToggle}
          onClick={toggleRightPanel}
          aria-label="Toggle right panel"
        >
          <ChevronRightIcon />
        </button>
      </div>
      
      {/* Page-level panels for pages with side rails - positioned relative to viewport */}
      <AutomationShellPanelRenderer />
    </>
    );
  } else {
    // Default fallback
    layoutContent = (
      <>
        <div
          className={`${styles.applicationContent} ${navigationBehavior === "push" ? styles.pushMode : styles.overlayMode}`}
          data-name="Automation Shell Content"
        >
          <DecisionAutomationSideNav
            isExpanded={isLeftNavExpanded}
            onToggle={toggleLeftNav}
            behavior={navigationBehavior}
            activeItemId={viewState.view}
            onActiveItemChange={handleNavigationItemChange}
            onCollapseRail={collapseLeftNav}
            currentBranch={currentBranch}
            onBranchChange={onBranchChange}
            branches={branches}
          />

          <div
            className={`${styles.mainContent} ${isLeftNavExpanded ? styles.mainContentExpanded : ""} ${navigationBehavior === "push" ? styles.pushContent : ""}`}
          >
            <PlaceholderContent
              title="View not found"
              description="The requested view is not configured."
              variant="section"
            />
          </div>
        </div>
        
        {/* Page-level panels for automation shell */}
        <AutomationShellPanelRenderer />
      </>
    );
  }

  return layoutContent;
}

// ============================================================================
// Export
// ============================================================================

export default ApplicationLayoutTemplate;