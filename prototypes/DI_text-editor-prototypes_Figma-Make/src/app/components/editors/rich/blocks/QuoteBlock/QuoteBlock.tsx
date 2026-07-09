import type { NodeKey } from 'lexical';

export function QuoteBlock({ nodeKey }: { nodeKey: NodeKey }) {
  return <blockquote data-lexical-node-key={nodeKey} />;
}
