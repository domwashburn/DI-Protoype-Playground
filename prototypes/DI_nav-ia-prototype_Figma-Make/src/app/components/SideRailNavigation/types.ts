// SideRailNavigation Types
export interface SideRailNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  section?: number;
  isActive?: boolean;
  isChild?: boolean;
  children?: SideRailNavItem[];
  onClick?: () => void;
}

export interface SideRailNavSection {
  id: string;
  items: SideRailNavItem[];
  hasDividerAfter?: boolean;
  sectionType?: 'standard' | 'history';
  sectionLabel?: string;
  hideWhenCollapsed?: boolean;
  showWhenCollapsed?: boolean;
}

export interface PanelActionProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export interface HistoryGroup {
  title: string;
  items: Array<{
    id: string;
    title: string;
  }>;
}

export interface SideRailNavigationProps {
  isExpanded?: boolean;
  onToggle?: () => void;
  headerTitle?: string;
  sections: SideRailNavSection[];
  activeItemId?: string;
  onItemClick?: (itemId: string) => void;
  className?: string;
  toggleIcon?: React.ReactNode;
  behavior?: 'overlay' | 'push';
  expandedItems?: Set<string>;
  onToggleExpanded?: (itemId: string) => void;
  panelAction?: PanelActionProps;
  historyGroups?: HistoryGroup[];
  positioning?: 'fixed' | 'relative';
  branches?: BranchOption[];
  selectedBranch?: string;
  onBranchChange?: (branchId: string) => void;
  onCollapseRail?: () => void;
  /**
   * When provided, replaces the collapse/expand toggle in the header with
   * a primary action (e.g. "New chat"). The rail will not collapse in
   * this configuration.
   */
  newChatAction?: NewChatAction;
}

export interface BranchOption {
  id: string;
  name: string;
  isActive?: boolean;
}

export interface NewChatAction {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export interface SideRailHeaderProps {
  isExpanded: boolean;
  onToggle: () => void;
  title: string;
  toggleIcon?: React.ReactNode;
  branches?: BranchOption[];
  selectedBranch?: string;
  onBranchChange?: (branchId: string) => void;
  /**
   * When provided, replaces the collapse/expand toggle button with a
   * primary action (e.g. "New chat"). Used by the Decision Assistant
   * side rail where the rail does not collapse.
   */
  newChatAction?: NewChatAction;
}

export interface SideRailNavItemProps {
  item: SideRailNavItem;
  isExpanded: boolean;
  isActive: boolean;
  onClick: () => void;
  onCollapseRail?: () => void;
}

export interface SideRailDividerProps {
  isExpanded: boolean;
  label?: string;
  showWhenCollapsed?: boolean;
}