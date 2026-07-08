/**
 * Integration helper for adding panel triggers to existing components
 */

import { useSidePanel } from './SidePanelContext';
import { ReactNode } from 'react';

interface PanelTrigger {
  icon: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

/**
 * Creates a panel trigger that automatically uses the SidePanel context
 * Use this to generate panel triggers for BreadcrumbActionBar
 */
export function usePanelTrigger(icon: ReactNode): PanelTrigger {
  const { togglePanel, isPanelOpen } = useSidePanel();
  
  return {
    icon,
    onClick: togglePanel,
    isActive: isPanelOpen
  };
}

/**
 * Hook to create multiple panel triggers
 */
export function usePanelTriggers(icons: ReactNode[]): PanelTrigger[] {
  const { togglePanel, isPanelOpen } = useSidePanel();
  
  return icons.map(icon => ({
    icon,
    onClick: togglePanel,
    isActive: isPanelOpen
  }));
}
