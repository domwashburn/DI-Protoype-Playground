import { useState } from "react";
import svgPaths from "../imports/svg-js2ltrbtsk";
import { SideRailNavigation, SideRailNavSection, SideRailNavItem } from './SideRailNavigation';

// Exact SVG components from Figma import
function SidePanelOpenFilled() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 16" width="16" height="16">
      <g>
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <path d={svgPaths.p10e94e00} fill="var(--cds-icon-primary)" />
      </g>
    </svg>
  );
}

function Dashboard() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 16" width="16" height="16">
      <g>
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g>
          <path d="M13 10.5H12V13H13V10.5Z" fill="var(--cds-icon-primary)" />
          <path d="M11 8H10V13H11V8Z" fill="var(--cds-icon-primary)" />
          <path d={svgPaths.p287dc200} fill="var(--cds-icon-primary)" />
          <path d={svgPaths.p15fb9780} fill="var(--cds-icon-primary)" />
        </g>
      </g>
    </svg>
  );
}

function Search() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 16" width="16" height="16">
      <g>
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <path d={svgPaths.p154b5b00} fill="var(--cds-icon-primary)" />
      </g>
    </svg>
  );
}

function Template() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 16" width="16" height="16">
      <g>
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g>
          <path d={svgPaths.p77b7740} fill="var(--cds-icon-primary)" />
          <path d={svgPaths.p2971ab00} fill="var(--cds-icon-primary)" />
          <path d={svgPaths.p257faa00} fill="var(--cds-icon-primary)" />
        </g>
      </g>
    </svg>
  );
}

function FileStorage() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 16" width="16" height="16">
      <g>
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g>
          <path d={svgPaths.p1e0ee900} fill="var(--cds-icon-primary)" />
          <path d={svgPaths.p5671c00} fill="var(--cds-icon-primary)" />
          <path d={svgPaths.p16130080} fill="var(--cds-icon-primary)" />
        </g>
      </g>
    </svg>
  );
}

function DataStructured() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 16" width="16" height="16">
      <g>
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g>
          <path d={svgPaths.p3a8a9900} fill="var(--cds-icon-primary)" />
          <path d={svgPaths.p1b6c2f00} fill="var(--cds-icon-primary)" />
        </g>
      </g>
    </svg>
  );
}

function Task() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 16" width="16" height="16">
      <g>
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g>
          <path d={svgPaths.p3797480} fill="var(--cds-icon-primary)" />
          <path d={svgPaths.p7568d80} fill="var(--cds-icon-primary)" />
        </g>
      </g>
    </svg>
  );
}

function Compare() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 16" width="16" height="16">
      <g>
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <path d={svgPaths.p3bb3e700} fill="var(--cds-icon-primary)" />
      </g>
    </svg>
  );
}

function RunMirror() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 16" width="16" height="16">
      <g>
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g>
          <path d="M4.5 9.5V12.5L7 11L4.5 9.5Z" fill="var(--cds-icon-primary)" />
          <path d={svgPaths.p1508a380} fill="var(--cds-icon-primary)" />
          <path d={svgPaths.p3271a380} fill="var(--cds-icon-primary)" />
        </g>
      </g>
    </svg>
  );
}

function Settings() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 16" width="16" height="16">
      <g>
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <g>
          <path d={svgPaths.p15159b00} fill="var(--cds-icon-primary)" />
          <path d={svgPaths.p17d2f500} fill="var(--cds-icon-primary)" />
        </g>
      </g>
    </svg>
  );
}

interface Match360NavigationProps {
  isExpanded?: boolean;
  onToggle?: () => void;
  behavior?: 'overlay' | 'push';
}

export default function Match360Navigation({ isExpanded = false, onToggle, behavior = 'overlay' }: Match360NavigationProps) {
  const [activeItem, setActiveItem] = useState("data-types");

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  // Define navigation sections with Match360-specific structure
  const navSections: SideRailNavSection[] = [
    {
      id: "primary",
      items: [
        { id: "overview", label: "Master data overview", icon: <Dashboard />, section: 1 },
        { id: "search", label: "Search master data", icon: <Search />, section: 1 },
        { id: "workspace", label: "Master data workspace", icon: <Template />, section: 1 },
      ],
      hasDividerAfter: true
    },
    {
      id: "secondary", 
      items: [
        { id: "assets", label: "Assets", icon: <FileStorage />, section: 2 },
        { id: "data-types", label: "Data types", icon: <DataStructured />, section: 2 },
        { id: "task-types", label: "Task types", icon: <Task />, section: 2 },
      ],
      hasDividerAfter: true
    },
    {
      id: "tertiary",
      items: [
        { id: "pair-review", label: "Pair review", icon: <Compare />, section: 3 },
        { id: "jobs", label: "Jobs", icon: <RunMirror />, section: 3 },
      ],
      hasDividerAfter: true
    },
    {
      id: "settings",
      items: [
        { id: "settings", label: "Instance settings", icon: <Settings />, section: 4 },
      ],
      hasDividerAfter: false
    }
  ];

  return (
    <SideRailNavigation
      isExpanded={isExpanded}
      onToggle={onToggle}
      headerTitle="Master data"
      sections={navSections}
      activeItemId={activeItem}
      onItemClick={handleItemClick}

      behavior={behavior}
    />
  );
}