import styles from "./HomePage.module.css";
import { HomePageHeader, HomePageSection, HomePageSectionTitle, HomePageSectionContent, PinnedDecisionAutomationSection, RecentDecisionAutomationsSection } from "./";
import { Card, CardGrid } from "../CardLayout";
import { ResourceHubTile } from "../ResourceHubTile";
import { WhatsNewTile } from "../WhatsNewTile";
import { useRecentAutomations, usePinnedAutomations } from "../../data/hooks";
import { useAutomations, useServices } from "../../data/hooks";
import { useMemo } from "react";
import { useAppNavigation } from "../../hooks/useAppNavigation";

export default function HomePage() {
  const { navigate } = useAppNavigation();

  // Get pinned automations hook
  const { pinnedAutomations, isInitialized } = usePinnedAutomations();
  
  // Get all automations and services
  const { automations } = useAutomations();
  const { services } = useServices();

  // Create a lookup map for service counts per automation
  const serviceCountsByAutomation = useMemo(() => {
    const counts = new Map<string, number>();
    automations.forEach(automation => {
      const automationServices = services.filter(s => s.automationId === automation.id);
      counts.set(automation.id, automationServices.length);
    });
    return counts;
  }, [automations, services]);

  const handleAutomationClick = (automationId: string) => {
    navigate('automation-detail', { automationId });
  };

  const handleViewAll = () => {
    navigate('decision-automations');
  };

  // Get all pinned automations with their services - render one section per pinned automation (up to 4)
  const pinnedSections = useMemo(() => {
    return pinnedAutomations.map(pinned => {
      const automation = automations.find(a => a.id === pinned.id);
      if (!automation) return null;
      
      // Get services for this automation
      const automationServices = services
        .filter(s => s.automationId === automation.id)
        .slice(0, 5) // Max 5 services per section
        .map(service => ({
          id: service.id,
          name: service.displayName || service.name,
          type: 'Decision service',
          version: 'v1.0.0',
          status: (service.status === 'deployed' ? 'running' : 'not-running') as 'running' | 'not-running',
          lastEditedBy: 'User',
          lastEditedOn: 'Mar 30, 2025'
        }));
      
      return {
        id: automation.id,
        automation: {
          id: automation.id,
          name: automation.displayName || automation.name,
          description: automation.description || ''
        },
        services: automationServices
      };
    }).filter(Boolean) as Array<{
      id: string;
      automation: {
        id: string;
        name: string;
        description: string;
      };
      services: Array<{
        id: string;
        name: string;
        type: string;
        version: string;
        status: 'running' | 'not-running';
        lastEditedBy: string;
        lastEditedOn: string;
      }>;
    }>;
  }, [pinnedAutomations, automations, services]);

  const handlePinnedAutomationClick = (automationId: string) => {
    handleAutomationClick(automationId);
  };

  return (
    <div className={styles.pageContainer} data-name="Home Page">
      <HomePageHeader 
        userName="First name"
        onDisplaySettings={() => console.log('Display settings clicked')}
      />
      
      {/* Recent decision automations section */}
      <RecentDecisionAutomationsSection 
        onAutomationClick={handleAutomationClick}
        onViewAll={handleViewAll}
        onNew={() => console.log('New automation clicked')}
      />

      {/* Pinned decision automation sections - Render one section per pinned automation (up to 4) */}
      {isInitialized && pinnedSections.length > 0 && pinnedSections.map(section => (
        <PinnedDecisionAutomationSection
          key={section.id}
          pinnedAutomation={section.automation}
          services={section.services}
          onAutomationClick={() => handlePinnedAutomationClick(section.id)}
          onNewService={() => console.log('New service clicked')}
          onAddDashboard={() => console.log('Add dashboard clicked')}
          onViewAllServices={() => console.log('View all services clicked')}
          onViewAllDashboards={() => console.log('View all dashboards clicked')}
        />
      ))}

      {/* Explore section */}
      <HomePageSection backgroundColor="var(--cds-background)">
        <HomePageSectionTitle
          title="Explore"
          subtitle="Quick access to resources and tools"
        />
        <HomePageSectionContent>
          <div className={styles.exploreTiles}>
            <div className={styles.exploreTileResource}>
              <ResourceHubTile />
            </div>
            <div className={styles.exploreTileWhatsNew}>
              <WhatsNewTile />
            </div>
          </div>
        </HomePageSectionContent>
      </HomePageSection>
    </div>
  );
}