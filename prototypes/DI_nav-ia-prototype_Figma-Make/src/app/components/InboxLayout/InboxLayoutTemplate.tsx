import React, { ReactNode } from 'react';
import styles from './InboxLayoutTemplate.module.css';

/**
 * InboxLayoutTemplate (Custom Carbon-compliant)
 *
 * A master-detail layout component following Carbon Design System patterns.
 * Reference: https://carbondesignsystem.com/patterns/overview/
 *
 * Provides a 320px fixed sidebar panel alongside a flexible content area,
 * matching the standard Carbon panel width for consistent visual rhythm.
 *
 * Composition:
 *   <InboxLayoutTemplate sidebar={<>...</>}>
 *     <InboxPanelHeader title="..." />
 *     <InboxActionButton ... />
 *     <InboxPanelToolbar ... />
 *     <InboxPanelList ... />
 *   </InboxLayoutTemplate>
 *
 * @param sidebar - Content rendered in the 320px sidebar panel
 * @param children - Content rendered in the main area
 * @param className - Additional CSS class names
 */
interface InboxLayoutTemplateProps {
  sidebar: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function InboxLayoutTemplate({
  sidebar,
  children,
  className = '',
}: InboxLayoutTemplateProps) {
  return (
    <div className={`${styles.inboxLayout} ${className}`}>
      {/* Sidebar Panel - 320px fixed width per Carbon panel standard */}
      <div className={styles.sidebarPanel}>{sidebar}</div>

      {/* View Content Area */}
      <div className={styles.mainContent}>{children}</div>
    </div>
  );
}