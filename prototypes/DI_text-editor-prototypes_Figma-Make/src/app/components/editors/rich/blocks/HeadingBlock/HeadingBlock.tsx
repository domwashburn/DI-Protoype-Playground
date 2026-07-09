import type { NodeKey } from 'lexical';

export function HeadingBlock({ nodeKey, level = 2 }: { nodeKey: NodeKey; level?: 1 | 2 | 3 }) {
  const Tag = `h${level}` as const;
  return <Tag data-lexical-node-key={nodeKey} />;
}
