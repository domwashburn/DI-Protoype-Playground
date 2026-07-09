import type { NodeKey } from 'lexical';
import type { CalloutTone } from '../../types';

export interface CalloutBlockProps {
  nodeKey: NodeKey;
  tone: CalloutTone;
  children?: React.ReactNode;
}

export function CalloutBlock({ nodeKey, tone, children }: CalloutBlockProps) {
  return (
    <aside data-lexical-node-key={nodeKey} data-callout-tone={tone} role="note">
      {children}
    </aside>
  );
}
