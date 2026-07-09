import type { NodeKey } from 'lexical';

export function NumberedListBlock({ nodeKey }: { nodeKey: NodeKey }) {
  return <ol data-lexical-node-key={nodeKey} />;
}
