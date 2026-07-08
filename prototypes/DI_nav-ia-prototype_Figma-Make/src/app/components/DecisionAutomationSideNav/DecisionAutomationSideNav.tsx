import { useState } from "react";
import { 
  Flow, 
  CloudServices, 
  Dashboard, 
  Flag, 
  Deploy, 
  SkillLevel, 
  Branch, 
  Settings,
  Time,
  Notification,
  Rule,
  ChartBubble
} from '@carbon/icons-react';
import { SideRailNavigation, SideRailNavSection } from '../SideRailNavigation';

interface DecisionAutomationSideNavProps {
  isExpanded?: boolean;
  onToggle?: () => void;
  behavior?: 'overlay' | 'push';
  activeItemId?: string;
  onActiveItemChange?: (itemId: string) => void;
  onCollapseRail?: () => void;
  currentBranch?: string;
  onBranchChange?: (branchId: string) => void;
  branches?: Array<{ id: string; name: string; isActive?: boolean }>;
}

export default function DecisionAutomationSideNav({ 
  isExpanded = false, 
  onToggle, 
  behavior = 'overlay',
  activeItemId,
  onActiveItemChange,
  onCollapseRail,
  currentBranch,
  onBranchChange,
  branches: propBranches
}: DecisionAutomationSideNavProps) {
  const [selectedBranch, setSelectedBranch] = useState("main");

  const handleItemClick = (itemId: string) => {
    // Notify parent component of the active item change
    // Parent controls the active state
    if (onActiveItemChange) {
      onActiveItemChange(itemId);
    }
  };

  // Use branches from props or fallback to default
  const branches = propBranches || [
    { id: "main", name: "main", isActive: true },
    { id: "develop", name: "develop" },
    { id: "feature-automation-v2", name: "feature/automation-v2" },
    { id: "hotfix-validation", name: "hotfix/validation" },
    { id: "release-2024-q1", name: "release/2024-q1" }
  ];

  // Define navigation sections for decision automation
  const navSections: SideRailNavSection[] = [
    {
      id: "primary",
      items: [
        { 
          id: "automation-overview", 
          label: "Automation overview", 
          icon: <Flow size={16} />, 
          section: 1 
        },
        { 
          id: "services", 
          label: "Decision services", 
          icon: <CloudServices size={16} />, 
          section: 1 
        },
        { 
          id: "decision-outcomes", 
          label: "Decision outcomes", 
          icon: <ChartBubble size={16} />, 
          section: 1 
        },
        { 
          id: "objectives", 
          label: "Linked objectives", 
          icon: <Flag size={16} />, 
          section: 1 
        },
        { 
          id: "policies-rules", 
          label: "Linked policies and rules", 
          icon: <Rule size={16} />, 
          section: 1 
        },
      ],
      hasDividerAfter: true
    },
    {
      id: "deploy", 
      items: [
        { 
          id: "testing", 
          label: "Test automation", 
          icon: <SkillLevel size={16} />, 
          section: 2 
        },{ 
          id: "deploy", 
          label: "Deploy automation", 
          icon: <Deploy size={16} />, 
          section: 2 
        },
        { 
          id: "monitor", 
          label: "Monitor automation", 
          icon: <Dashboard size={16} />, 
          section: 1 
        },
      ],
      hasDividerAfter: true
    },
    {
      id: "management",
      items: [
        { 
          id: "branches", 
          label: "Branches", 
          icon: <Branch size={16} />, 
          section: 3 
        },
        { 
          id: "settings", 
          label: "Automation settings", 
          icon: <Settings size={16} />, 
          section: 3 
        },
        { 
          id: "history", 
          label: "History", 
          icon: <Time size={16} />, 
          section: 3 
        },
        { 
          id: "updates", 
          label: "Updates", 
          icon: <Notification size={16} />, 
          section: 3 
        },
      ],
      hasDividerAfter: false
    }
  ];

  return (
    <SideRailNavigation
      isExpanded={isExpanded}
      onToggle={onToggle}
      headerTitle="Decision Automation"
      sections={navSections}
      activeItemId={activeItemId || "automation-overview"}
      onItemClick={handleItemClick}
      behavior={behavior}
      branches={branches}
      selectedBranch={currentBranch}
      onBranchChange={onBranchChange}
      onCollapseRail={onCollapseRail}
    />
  );
}