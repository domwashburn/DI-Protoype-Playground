import type { NodeKey } from 'lexical';

export function ParagraphBlock({ nodeKey }: { nodeKey: NodeKey }) {
  return <p data-lexical-node-key={nodeKey} />;
}
