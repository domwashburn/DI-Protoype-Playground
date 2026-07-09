import type { NodeKey } from 'lexical';

export function DividerBlock({ nodeKey }: { nodeKey: NodeKey }) {
  return <hr data-lexical-node-key={nodeKey} />;
}
