import { usePanelManager } from '../PanelManager';
import { CarbonDecisionAssistant } from '../../CarbonDecisionAssistant';

export default function DecisionAssistantPanel() {
  const { closeAssistantPanel, isAssistantExpanded, expandPanel, collapsePanel } = usePanelManager();

  return (
    <CarbonDecisionAssistant
      mode={isAssistantExpanded ? 'expanded' : 'side'}
      onClose={() => closeAssistantPanel()}
      onExpand={expandPanel}
      onCollapse={collapsePanel}
    />
  );
}
