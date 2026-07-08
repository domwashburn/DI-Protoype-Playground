import { ReactNode } from 'react';
import { Breadcrumb, BreadcrumbItem } from '@carbon/react';
import styles from './PageHeaderWrapper.module.css';
import PageHeader from '../PageHeader';

interface Tab {
  id?: string;
  label: string;
  isActive?: boolean;
}

interface PageHeaderWrapperProps {
  title: string;
  tabs?: Tab[];
  showTabs?: boolean;
  actionButton?: React.ReactNode;
  subheading?: string;
  status?: { label: string; variant: string };
  onTabChange?: (tabId: string) => void;
  panelTriggers?: Array<{ icon: ReactNode; onClick: () => void }>;
  showPanelTriggers?: boolean; // Optional: Enable default placeholder panel triggers
  tabLeadingControls?: ReactNode;
  breadcrumbOnly?: boolean;
}



export default function PageHeaderWrapper({ 
  title, 
  tabs = [], 
  showTabs = true, 
  actionButton,
  subheading = '',
  status,
  onTabChange,
  panelTriggers,
  showPanelTriggers = true, // Changed default to true for testing purposes
  tabLeadingControls,
  breadcrumbOnly = false,
}: PageHeaderWrapperProps) {
  if (breadcrumbOnly) {
    return (
      <div className={styles.breadcrumbOnlyBar}>
        <Breadcrumb noTrailingSlash>
          <BreadcrumbItem isCurrentPage>{title}</BreadcrumbItem>
        </Breadcrumb>
      </div>
    );
  }

  // Convert action button to PageHeader actions format
  const actions = actionButton ? [{
    label: '',
    onClick: () => {},
    variant: 'primary' as const,
    customButton: actionButton
  }] : [];

  // Convert tabs to PageHeader tab format
  const pageHeaderTabs = tabs.map(tab => ({
    id: tab.id || tab.label.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, ''),
    label: tab.label,
    isActive: tab.isActive || false
  }));

  // Default onTabChange to no-op if not provided
  const handleTabChange = onTabChange || (() => {});

  return (
    <PageHeader
      title={title}
      subheading={subheading}
      status={status}
      actions={actions}
      tabs={showTabs ? pageHeaderTabs : []}
      onTabChange={handleTabChange}
      panelTriggers={panelTriggers}
      showPanelTriggers={showPanelTriggers}
      tabLeadingControls={tabLeadingControls}
    />
  );
}