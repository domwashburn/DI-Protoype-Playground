import type { NodeKey } from 'lexical';

export function CodeBlock({ nodeKey }: { nodeKey: NodeKey }) {
  return <pre data-lexical-node-key={nodeKey}><code /></pre>;
}
