/**
 * CarbonHeader — Phase 4A
 *
 * Replaces the custom GlobalHeader with official @carbon/react UI Shell Header
 * components. All panel interactions and active-state logic are preserved.
 *
 * Carbon components used:
 *   Header, HeaderMenuButton, HeaderName, HeaderGlobalBar,
 *   HeaderGlobalAction, SkipToContent, Theme
 *
 * Prop API is intentionally identical to GlobalHeader so AppLayout requires
 * only an import-swap.
 */

import {
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
} from '@carbon/react';
import { ChatBot, Help } from '@carbon/icons-react';
import {
  DecisionAssistantPanel,
  HelpPanel,
  usePanelManager,
} from '../SidePanel';
import styles from './CarbonHeader.module.css';

export interface CarbonHeaderProps {
  isNavigationOpen: boolean;
  onToggleNavigation: () => void;
  onNavigate?: (route: string) => void;
  /** Current route — used to suppress the Assistant button on the
   *  decision-assistant page (the page itself is the assistant). */
  currentRoute?: string;
}

/** Stable user-avatar component passed as renderIcon to HeaderGlobalAction. */
function UserAvatar() {
  return <div className={styles.userAvatar}>DW</div>;
}

export default function CarbonHeader({
  isNavigationOpen,
  onToggleNavigation,
  onNavigate,
  currentRoute,
}: CarbonHeaderProps) {
  const isOnAssistantPage = currentRoute === 'decision-assistant';
  const {
    openPanel,
    isPanelOpen,
    currentPanel,
    isAssistantPanelOpen,
    assistantPanel,
    closeAssistantPanel,
  } = usePanelManager();

  const isHelpPanelOpen =
    isPanelOpen && currentPanel?.id === 'global-help-panel';
  const isDecisionAssistantOpen =
    isAssistantPanelOpen && assistantPanel?.id === 'decision-assistant-panel';

  const handleHelpClick = () => {
    if (isNavigationOpen) onToggleNavigation();
    openPanel({
      id: 'global-help-panel',
      content: <HelpPanel />,
      level: 'global',
      pattern: 'overlay',
      width: 'standard',
    });
  };

  const handleDecisionAssistantClick = () => {
    if (isNavigationOpen) onToggleNavigation();
    if (isDecisionAssistantOpen) {
      closeAssistantPanel();
      return;
    }
    openPanel({
      id: 'decision-assistant-panel',
      content: (
        <DecisionAssistantPanel />
      ),
      level: 'global',
      pattern: 'influence',
      width: 'standard',
      expandable: true,
    });
  };

  return (
    <Header aria-label="IBM Decision Intelligence">
      <SkipToContent href="#main-content" />

      <HeaderMenuButton
        aria-label={isNavigationOpen ? 'Close navigation' : 'Open navigation'}
        isActive={isNavigationOpen}
        onClick={onToggleNavigation}
        className={styles.menuButton}
      />

      <HeaderName href="/" prefix="IBM">
        Decision Intelligence
      </HeaderName>

      <HeaderGlobalBar>
        <a
          href="#"
          className={styles.feedbackLink}
          onClick={(e) => e.preventDefault()}
        >
          Give feedback
        </a>

        {!isOnAssistantPage && (
          <HeaderGlobalAction
            aria-label="Decision Assistant"
            isActive={isDecisionAssistantOpen}
            onClick={handleDecisionAssistantClick}
          >
            <ChatBot size={20} />
          </HeaderGlobalAction>
        )}

        <HeaderGlobalAction
          aria-label="Help"
          isActive={isHelpPanelOpen}
          onClick={handleHelpClick}
        >
          <Help size={20} />
        </HeaderGlobalAction>

        <HeaderGlobalAction aria-label="User menu">
          <UserAvatar />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
}