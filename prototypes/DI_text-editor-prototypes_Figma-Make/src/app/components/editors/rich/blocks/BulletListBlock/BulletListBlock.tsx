import type { NodeKey } from 'lexical';

export function BulletListBlock({ nodeKey }: { nodeKey: NodeKey }) {
  return <ul data-lexical-node-key={nodeKey} />;
}
