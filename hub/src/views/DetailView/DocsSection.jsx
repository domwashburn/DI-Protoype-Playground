import { Link, Tag } from '@carbon/react';
import { Documentation } from '@carbon/icons-react';
import { PanelBlock } from '../../components/PanelBlock/index.js';
import { isExternalHref } from '../../lib/utils.js';
import styles from './DetailView.module.scss';

export function DocsSection({ docs, prototypeId }) {
  return (
    <PanelBlock
      badge={<Tag type="blue">{docs.length} linked</Tag>}
      description="Embedded docs, source notes, and package references attached to this registry object."
      id="docs"
      title="Docs"
    >
      <div className={styles.docList}>
        {docs.map((doc) => (
          <article className={styles.docCard} key={`${prototypeId}-${doc.title}`}>
            <div className={styles.docCardIcon}>
              <Documentation size={24} />
            </div>
            <div>
              <div className={styles.docCardHeading}>
                <h3>{doc.title}</h3>
                <Tag size="sm" type={doc.status === 'Embedded' ? 'green' : 'gray'}>
                  {doc.status}
                </Tag>
              </div>
              <p>{doc.description}</p>
              <div className={styles.docCardMeta}>
                <span>{doc.type}</span>
                {isExternalHref(doc.href) ? (
                  <Link href={doc.href} target="_blank" rel="noreferrer">Open doc</Link>
                ) : (
                  <code className={styles.docCardMetaCode}>{doc.href}</code>
                )}
              </div>
            </div>
          </article>
        ))}
        {docs.length === 0 && (
          <p className={styles.emptyNote}>No docs attached yet. Add them to the registry entry.</p>
        )}
      </div>
    </PanelBlock>
  );
}
