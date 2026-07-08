import { ChevronRight } from "@carbon/icons-react";
import styles from "./AutomationDetailPage.module.css";
import type { NavigationRoute } from "../../types/navigation";
import { useParams } from "react-router";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { useAutomations, useServices, useRecentAutomations } from "../../data/hooks";
import { useEffect, useMemo } from "react";

interface AutomationDetailPageProps {
  /** @deprecated — provide via URL param /automation/:automationId instead */
  automationId?: string;
  /** @deprecated — use useAppNavigation() instead; kept for sub-component usage */
  onNavigateBack?: (route: NavigationRoute, automationId?: string, assetId?: string, assetName?: string, assetType?: string) => void;
  onAssetClick?: (route: NavigationRoute, automationId?: string, assetId?: string, assetName?: string, assetType?: string) => void;
}

export default function AutomationDetailPage({ automationId: automationIdProp, onNavigateBack }: AutomationDetailPageProps) {
  const { automationId: routeAutomationId } = useParams<{ automationId?: string }>();
  const automationId = automationIdProp ?? routeAutomationId;
  const { navigate } = useAppNavigation();

  const { automations, getAutomationById } = useAutomations();
  const { services } = useServices();
  const { trackAutomationAccess } = useRecentAutomations();
  
  // Get the automation data from centralized source
  const automationData = automationId ? getAutomationById(automationId) : null;
  
  // Calculate service count for this automation
  const serviceCount = useMemo(() => {
    if (!automationId) return 0;
    return services.filter(s => s.automationId === automationId).length;
  }, [automationId, services]);
  
  // Track automation access when page loads
  useEffect(() => {
    if (automationData) {
      trackAutomationAccess({
        id: automationData.id,
        name: automationData.displayName || automationData.name,
        description: automationData.description || 'Decision automation',
        serviceCount: `${serviceCount} decision service${serviceCount !== 1 ? 's' : ''}`
      });
    }
  }, [automationData, serviceCount, trackAutomationAccess]);

  const handleBackNavigation = () => {
    if (onNavigateBack) {
      onNavigateBack('decision-automations');
    } else {
      navigate('decision-automations');
    }
  };

  return (
    <div className={styles.pageContainer} data-name="Automation Detail Page">
      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumbContainer}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <button
            onClick={handleBackNavigation}
            className={styles.breadcrumbLink}
          >
            Decision Automations
          </button>
          <ChevronRight className={styles.breadcrumbSeparator} />
          <span className={styles.breadcrumbCurrent}>
            {automationData ? automationData.displayName || automationData.name : 'Unknown Automation'}
          </span>
        </nav>
        
        {/* Branch Tag */}
        <div className={styles.branchTag}>
          {automationData ? automationData.branch || 'main' : 'main'}
        </div>
      </div>

      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{automationData ? automationData.displayName || automationData.name : 'Unknown Automation'}</h1>
        <p className={styles.pageDescription}>{automationData ? automationData.description || 'No description added yet' : 'Automation not found'}</p>
        <div className={styles.pageMeta}>
          <span className={styles.lastUpdated}>
            Last updated: {automationData ? new Date(automationData.lastUpdatedDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'numeric', 
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric'
            }) : 'Unknown'} by {automationData ? automationData.lastUpdatedBy : 'Unknown'}
          </span>
        </div>
      </div>

      {/* Empty State Content */}
      <div className={styles.contentArea}>
        <div className={styles.emptyState}>
          <div className={styles.emptyStateContent}>
            <h3 className={styles.emptyStateTitle}>Automation content coming soon</h3>
            <p className={styles.emptyStateDescription}>
              This automation detail page is ready for content implementation. 
              The automation configuration, rules, and execution details will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}