import { useState, useMemo } from "react";
import { Add } from "@carbon/icons-react";
import styles from "./DecisionAutomationsPage.module.css";
import PageHeaderWrapper from "../PageHeaderWrapper";
import CardLayoutTemplate, { Card, CardMenuItem } from "../CardLayout";
import { InsetLayout } from "../SidePanel";
import { useAutomations, useServices, useRecentAutomations } from "../../data/hooks";
import { Button, Grid, Column } from "@carbon/react";
import { useAppNavigation } from "../../hooks/useAppNavigation";

export default function DecisionAutomationsPage() {
  const { navigate } = useAppNavigation();
  const [sortBy, setSortBy] = useState("Recently updated");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Get automations from centralized data
  const { automations: allAutomations } = useAutomations();
  const { services } = useServices();
  
  // Get recent automations hook for tracking
  const { trackAutomationAccess } = useRecentAutomations();

  // Create a lookup map for service counts per automation
  const serviceCountsByAutomation = useMemo(() => {
    const counts = new Map<string, number>();
    allAutomations.forEach(automation => {
      const automationServices = services.filter(s => s.automationId === automation.id);
      counts.set(automation.id, automationServices.length);
    });
    return counts;
  }, [allAutomations, services]);
  
  // Generate menu items for each automation card
  const getAutomationMenuItems = (automationId: string, status: string): CardMenuItem[] => {
    const menuItems: CardMenuItem[] = [
      {
        label: 'Edit details',
        onClick: () => {
          console.log('Edit details:', automationId);
        }
      },
      {
        label: 'Duplicate',
        onClick: () => {
          console.log('Duplicate:', automationId);
        }
      },
      {
        label: 'Export',
        onClick: () => {
          console.log('Export:', automationId);
        }
      }
    ];

    // Add archive/unarchive based on status
    if (status === 'Archived') {
      menuItems.push({
        isDivider: true
      });
      menuItems.push({
        label: 'Restore',
        onClick: () => {
          console.log('Restore:', automationId);
        }
      });
    } else {
      menuItems.push({
        isDivider: true
      });
      menuItems.push({
        label: 'Archive',
        onClick: () => {
          console.log('Archive:', automationId);
        }
      });
    }

    // Add delete option
    menuItems.push({
      label: 'Delete',
      onClick: () => {
        console.log('Delete:', automationId);
      },
      isDanger: true
    });

    return menuItems;
  };
  
  // Transform automation data for card display
  const automationCards = useMemo(() => {
    return allAutomations.map(automation => ({
      id: automation.id,
      title: automation.displayName || automation.name,
      status: automation.status === 'deployed' ? 'Deployed' : 
              automation.status === 'draft' ? 'Draft' : 
              automation.status === 'archived' ? 'Archived' : 'Deployed',
      description: automation.description || "No description added yet",
      lastUpdatedDate: new Date(automation.lastUpdatedDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      }).replace(/\//g, '-'),
      lastUpdatedBy: automation.lastUpdatedBy,
      tags: automation.tags?.map(tag => tag.label) || [],
      variant: automation.variant || 'standard' as const
    }));
  }, [allAutomations]);

  // Handle automation click - track access and navigate
  const handleAutomationClick = (automationId: string) => {
    // Get the full automation data
    const automation = allAutomations.find(a => a.id === automationId);
    if (automation) {
      // Get service count
      const serviceCount = serviceCountsByAutomation.get(automationId) || 0;
      
      // Track the access
      trackAutomationAccess({
        id: automation.id,
        name: automation.displayName || automation.name,
        description: automation.description || 'Decision automation',
        serviceCount: `${serviceCount} decision service${serviceCount !== 1 ? 's' : ''}`
      });

      // Navigate to automation detail page
      navigate('automation-detail', { automationId });
    }
  };

  return (
    <div className={styles.pageContainer} data-name="Decision Automations Page">
      {/* Page Header */}
      <PageHeaderWrapper 
        title="Decision automations" 
        showTabs={false}
        actionButton={
          <Button
            kind="primary"
            size="sm"
            renderIcon={Add}
          >
            New decision automation
          </Button>
        }
      />
      
      {/* Section content with influenced layout for section-level panels */}
      <InsetLayout>
        {/* Card Layout */}
        <CardLayoutTemplate
        toolbarProps={{
          sortOptions: [
            { value: "Recently updated", label: "Recently updated" },
            { value: "Name", label: "Name" },
            { value: "Created date", label: "Created date" }
          ],
          sortValue: sortBy,
          onSortChange: setSortBy,
          searchValue: searchTerm,
          onSearchChange: setSearchTerm,
          searchPlaceholder: "Search",
          viewMode: viewMode,
          onViewModeChange: setViewMode
        }}
        viewMode={viewMode}
        customContainer={viewMode === 'grid'}
      >
        {/* Automation Cards */}
        {viewMode === 'grid' ? (
          <Grid fullWidth narrow className={styles.cardsGrid}>
            {automationCards.map((automation) => (
              <Column sm={4} md={4} lg={4} max={3} key={automation.id} className={styles.cardColumn}>
                <Card
                  title={automation.title}
                  status={automation.status}
                  description={automation.description}
                  lastUpdatedDate={automation.lastUpdatedDate}
                  lastUpdatedBy={automation.lastUpdatedBy}
                  tags={automation.tags}
                  variant={automation.variant}
                  onClick={() => handleAutomationClick(automation.id)}
                  menuItems={getAutomationMenuItems(automation.id, automation.status)}
                />
              </Column>
            ))}
          </Grid>
        ) : (
          automationCards.map((automation) => (
            <Card
              key={automation.id}
              title={automation.title}
              status={automation.status}
              description={automation.description}
              lastUpdatedDate={automation.lastUpdatedDate}
              lastUpdatedBy={automation.lastUpdatedBy}
              tags={automation.tags}
              variant={automation.variant}
              onClick={() => handleAutomationClick(automation.id)}
              menuItems={getAutomationMenuItems(automation.id, automation.status)}
            />
          ))
        )}
      </CardLayoutTemplate>
      </InsetLayout>
    </div>
  );
}