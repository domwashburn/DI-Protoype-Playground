import { Tag } from '@carbon/react';
import { Wikis } from '@carbon/icons-react';
import { PanelBlock } from '../../components/PanelBlock/index.js';
import styles from './DetailView.module.scss';

export function ContextSection({ context, prototypeId }) {
  const contextSources = context?.sources ?? [];

  return (
    <PanelBlock
      accent
      badge={<Wikis size={24} />}
      description="Stubbed entry point for a future LLM wiki that can summarize decisions and connect artifacts."
      id="context"
      title="Context"
    >
      <div className={styles.contextSummary}>
        <Tag type="purple">{context?.status ?? 'Stubbed'}</Tag>
        <p>{context?.summary ?? 'No context summary yet. Add one to the registry entry.'}</p>
      </div>
      {contextSources.length > 0 && (
        <ul className={styles.contextSourceList}>
          {contextSources.map((source) => (
            <li key={`${prototypeId}-${source}`}>{source}</li>
          ))}
        </ul>
      )}
    </PanelBlock>
  );
}
