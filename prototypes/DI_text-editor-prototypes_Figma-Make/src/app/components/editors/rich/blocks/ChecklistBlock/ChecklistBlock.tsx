import type { NodeKey } from 'lexical';

export function ChecklistBlock({ nodeKey }: { nodeKey: NodeKey }) {
  return <ul data-lexical-node-key={nodeKey} aria-label="Checklist" />;
}
