import { CarbonDecisionAssistant } from '../CarbonDecisionAssistant';
import styles from './DecisionAssistantPage.module.css';

export default function DecisionAssistantPage() {
  return (
    <div className={styles.chatPageContainer} data-name="Decision Assistant Page">
      <CarbonDecisionAssistant mode="full" />
    </div>
  );
}
