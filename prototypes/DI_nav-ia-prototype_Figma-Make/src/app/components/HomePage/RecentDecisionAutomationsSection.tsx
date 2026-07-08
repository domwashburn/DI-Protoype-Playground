import { HomePageSection, HomePageSectionTitle, HomePageSectionContent } from './index';
import { DecisionAutomationCard } from './DecisionAutomationCard';
import styles from './RecentDecisionAutomationsSection.module.css';
import { Button } from '@carbon/react';
import { Add } from '@carbon/icons-react';
import { useRecentAutomations } from '../../data/hooks';

export interface DecisionAutomation {
  id: string;
  name: string;
  description: string;
  serviceCount: string;
  lastAccessed: Date;
}

export interface RecentDecisionAutomationsSectionProps {
  onViewAll?: () => void;
  onNew?: () => void;
  onAutomationClick?: (id: string) => void;
}

/**
 * RecentDecisionAutomationsSection
 * 
 * Displays recently viewed/created decision automations from localStorage.
 * Cards are displayed in a horizontal wrapping grid with the most recently 
 * accessed automation appearing in the first position (leftmost).
 * 
 * Layout:
 * - Grid flows left-to-right, top-to-bottom
 * - Most recent item = first card (top-left)
 * - Responsive columns: 1 (mobile), 2 (tablet), 3 (laptop), 4 (desktop)
 * - Automatically updates when automations are viewed throughout the app
 */
export function RecentDecisionAutomationsSection({
  onViewAll,
  onNew,
  onAutomationClick
}: RecentDecisionAutomationsSectionProps) {
  // Use localStorage-based recent automations (sorted by lastAccessed DESC)
  const { recentAutomations } = useRecentAutomations();

  return (
    <HomePageSection backgroundColor="#e8e8e8">
      <HomePageSectionTitle
        title="Recent decision automations"
        subtitle="Open decision automations that you created, modified, or viewed"
      />
      <HomePageSectionContent>
        {/* Section actions - View all and New buttons */}
        <div className={styles.sectionActions}>
          <Button
            kind="ghost"
            size="sm"
            className={styles.viewAllButton}
            onClick={onViewAll}
          >
            View all
          </Button>

          <Button
            kind="ghost"
            size="sm"
            renderIcon={Add}
            className={styles.newButton}
            onClick={onNew}
          >
            New decision automation
          </Button>
        </div>

        {/* Card grid - 12 columns at large, cards span 3 each */}
        {recentAutomations.length > 0 ? (
          <div className={styles.decisionProjectsContext}>
            <div className={styles.decisionProjectsList}>
              {recentAutomations.map((automation) => (
                <DecisionAutomationCard
                  key={automation.id}
                  name={automation.name}
                  description={automation.description}
                  serviceCount={automation.serviceCount}
                  onClick={() => onAutomationClick?.(automation.id)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyStateText}>
              No recent decision automations. Create or open an automation to get started.
            </p>
          </div>
        )}
      </HomePageSectionContent>
    </HomePageSection>
  );
}