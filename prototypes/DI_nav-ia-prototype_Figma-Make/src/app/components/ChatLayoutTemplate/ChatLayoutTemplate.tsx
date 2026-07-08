import { CarbonDecisionAssistant } from '../CarbonDecisionAssistant';
import styles from './ChatLayoutTemplate.module.css';

interface ChatLayoutTemplateProps {
  navigationBehavior?: 'overlay' | 'push';
}

export default function ChatLayoutTemplate({
  navigationBehavior = 'overlay',
}: ChatLayoutTemplateProps) {
  return (
    <div
      className={styles.chatLayoutContent}
      data-navigation-behavior={navigationBehavior}
      data-name="Chat Layout Content"
    >
      <CarbonDecisionAssistant mode="full" />
    </div>
  );
}
