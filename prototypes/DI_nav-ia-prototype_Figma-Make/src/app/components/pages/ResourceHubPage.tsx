import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Card, CardGrid } from '../CardLayout';
import { ResourceSection } from '../ResourceHub';
import ResourceHubHeader, { ResourceHubHeaderTab } from './ResourceHubHeader';
import styles from './ResourceHubPage.module.css';
import {
  loadResourceHubData,
  getSampleAssets,
  getSamplePrompts,
  getSamplePolicies,
  getMonitoringDashboards,
  resourceToCardData,
  type Resource,
} from '../../data/resourceHubData';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { InsetLayout, usePanelManager } from '../SidePanel';
import ResourceFiltersPanel from '../ResourceHub/ResourceFiltersPanel';

type TabKey = 'all' | 'assets' | 'policies' | 'prompts' | 'monitoring';

const TABS: ResourceHubHeaderTab[] = [
  { id: 'all', label: 'All' },
  { id: 'assets', label: 'Assets' },
  { id: 'policies', label: 'Policies' },
  { id: 'prompts', label: 'Prompts' },
  { id: 'monitoring', label: 'Dashboards' },
];

const PLACEHOLDER_TABS = ['More'];

export default function ResourceHubPage() {
  const { navigate } = useAppNavigation();
  const { openPanel, isPanelOpen, currentMainPanel } = usePanelManager();
  const filtersActive = isPanelOpen && currentMainPanel?.id === 'resource-filters';
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await loadResourceHubData();
        setResources(data.resources);
      } catch (error) {
        console.error('Failed to load resources:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleFilterClick = () =>
    openPanel({
      content: <ResourceFiltersPanel />,
      level: 'section',
      pattern: 'inset',
      width: 'narrow',
      id: 'resource-filters',
    });

  const expandSearch = () => {
    setSearchExpanded(true);
    requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const handleSearchBlur = () => {
    if (!searchValue) setSearchExpanded(false);
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSearchValue('');
      setSearchExpanded(false);
    }
  };

  const handleTabChange = (id: string) => {
    setActiveTab((id as TabKey) ?? 'all');
  };

  const getTabData = () => {
    if (loading || resources.length === 0) return [];
    switch (activeTab) {
      case 'assets':
        return getSampleAssets(resources);
      case 'prompts':
        return getSamplePrompts(resources);
      case 'policies':
        return getSamplePolicies(resources);
      case 'monitoring':
        return getMonitoringDashboards(resources);
      case 'all':
      default:
        return [
          ...getSampleAssets(resources),
          ...getSamplePolicies(resources),
          ...getSamplePrompts(resources),
          ...getMonitoringDashboards(resources),
        ];
    }
  };

  const tabData = getTabData();

  const query = searchValue.trim().toLowerCase();
  const displayData = query
    ? tabData
        .map(({ category, resources: sectionResources }) => ({
          category,
          resources: sectionResources.filter((r) => {
            const card = resourceToCardData(r);
            return (
              card.title.toLowerCase().includes(query) ||
              (card.description ?? '').toLowerCase().includes(query) ||
              (card.resourceType ?? '').toLowerCase().includes(query)
            );
          }),
        }))
        .filter(({ resources }) => resources.length > 0)
    : tabData;

  const sectionDescriptions: Record<string, string> = {
    'Decision Models': 'Intelligent decision-making models for automated business processes',
    'Rulesets': 'Business rules and logic for automated decision making',
    'ML Models': 'Machine learning models for predictive analytics and insights',
    'Task Models': 'Automated task orchestration and workflow models',
    'Policy Documents': 'Governance policies and compliance frameworks',
    'BAI Dashboards': 'Business analytics and intelligence dashboards',
    'Decision Assistant Prompts': 'Pre-configured prompts for decision model generation',
    'Decision Automations': 'End-to-end automated decision processes for business workflows',
    'Decision Services': 'Real-time decision services providing intelligent business decisions',
    'Data Models': 'Standardized data structures for consistent information management',
    'Optimization Models': 'Mathematical models for optimizing business outcomes',
    'Rules': 'Individual business rules and decision logic',
  };

  return (
    <div className={styles.resourceHubPage}>
      <ResourceHubHeader
        title="Resource hub"
        tabs={TABS}
        activeTabId={activeTab}
        onTabChange={handleTabChange}
        placeholderTabs={PLACEHOLDER_TABS}
        searchExpanded={searchExpanded}
        searchValue={searchValue}
        searchInputRef={searchInputRef}
        onSearchExpand={expandSearch}
        onSearchChange={setSearchValue}
        onSearchBlur={handleSearchBlur}
        onSearchKeyDown={handleSearchKeyDown}
        filtersActive={filtersActive}
        onFilterToggle={handleFilterClick}
      />

      <InsetLayout side="right">
        <div className={styles.sectionsContainer}>
          {loading ? (
            <div className={styles.loadingMessage}>Loading resources...</div>
          ) : displayData.length === 0 ? (
            <div className={styles.emptyMessage}>
              {query ? 'No resources match your search' : 'No resources available for this category'}
            </div>
          ) : (
            displayData.map(({ category, resources: sectionResources }) => (
              <div key={category} className={styles.sectionShell}>
                <ResourceSection
                  title={category}
                  description={sectionDescriptions[category] || ''}
                >
                  <CardGrid className={styles.tightCardGrid}>
                    {sectionResources.map((resource) => {
                      const cardData = resourceToCardData(resource);
                      return (
                        <Card
                          key={resource.id}
                          title={cardData.title}
                          resourceType={cardData.resourceType}
                          description={cardData.description}
                          provider={cardData.provider}
                          type={cardData.type}
                          onClick={() => navigate('resource-detail', { resourceId: resource.id })}
                        />
                      );
                    })}
                  </CardGrid>
                </ResourceSection>
              </div>
            ))
          )}
        </div>
      </InsetLayout>
    </div>
  );
}
