/**
 * CarbonSideNav — Phase 4B
 *
 * Replaces the custom GlobalNavigationPanel with official @carbon/react
 * SideNav UI Shell components. All 7 primary navigation links, the
 * Settings expandable group, the Support expandable group, and the active-
 * state indicators are preserved.
 *
 * Carbon components used:
 *   SideNav, SideNavItems, SideNavLink, SideNavMenu, SideNavMenuItem, Theme
 *
 * Prop API is intentionally identical to NavigationPanel so AppLayout
 * requires only an import-swap.
 */

import {
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from '@carbon/react';
import {
  Home,
  ChatBot,
  DecisionTree,
  Rule,
  Dashboard,
  Trophy,
  Catalog,
  Settings,
  Help,
  Launch,
} from '@carbon/icons-react';
import type { NavigationRoute } from '../../types/navigation';
import styles from './CarbonSideNav.module.css';

export interface CarbonSideNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoute: NavigationRoute;
  onNavigate: (route: NavigationRoute) => void;
}

/** Primary navigation items (routes). */
const primaryNavItems: Array<{
  route: NavigationRoute;
  label: string;
  icon: React.ComponentType<any>;
  hasBeta?: boolean;
}> = [
  { route: 'home',                   label: 'Home',                  icon: Home },
  { route: 'decision-assistant',     label: 'Decision assistant',    icon: ChatBot,       hasBeta: true },
  { route: 'decision-automations',   label: 'Decision automations',  icon: DecisionTree },
  { route: 'rules-and-policies',     label: 'Rules and policies',    icon: Rule },
  { route: 'dashboards',             label: 'Dashboards',            icon: Dashboard },
  { route: 'objectives-and-goals',   label: 'Objectives',            icon: Trophy },
  { route: 'resource-hub',           label: 'Resource hub',          icon: Catalog },
];

export default function CarbonSideNav({
  isOpen,
  onClose,
  currentRoute,
  onNavigate,
}: CarbonSideNavProps) {
  const handleNavClick = (
    e: React.MouseEvent,
    route: NavigationRoute,
  ) => {
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <SideNav
      aria-label="Side navigation"
      expanded={isOpen}
      onOverlayClick={onClose}
      isPersistent={false}
    >
      <SideNavItems>
        {primaryNavItems.map((item) => (
          <SideNavLink
            key={item.route}
            href="#"
            renderIcon={item.icon}
            isActive={currentRoute === item.route}
            onClick={(e: React.MouseEvent) => handleNavClick(e, item.route)}
          >
            {item.hasBeta ? (
              <span className={styles.labelWithBadge}>
                {item.label}
                <span className={styles.betaBadge}>Beta</span>
              </span>
            ) : (
              item.label
            )}
          </SideNavLink>
        ))}

        {/* ── Expandable: Settings ──────────────────────────────────── */}
        <SideNavMenu title="Settings" renderIcon={Settings}>
          <SideNavMenuItem href="#">
            Configurations and settings
          </SideNavMenuItem>
        </SideNavMenu>

        {/* ── Expandable: Support ───────────────────────────────────── */}
        <SideNavMenu title="Support" renderIcon={Help}>
          <SideNavMenuItem href="#" className={styles.externalItem}>
            Documentation
            <Launch size={16} className={styles.launchIcon} />
          </SideNavMenuItem>
          <SideNavMenuItem href="#" className={styles.externalItem}>
            Give feedback
            <Launch size={16} className={styles.launchIcon} />
          </SideNavMenuItem>
        </SideNavMenu>
      </SideNavItems>
    </SideNav>
  );
}