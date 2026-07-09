import type { NodeKey } from 'lexical';

export interface TableBlockProps {
  nodeKey: NodeKey;
  rows: number;
  columns: number;
  children?: React.ReactNode;
}

export function TableBlock({ nodeKey, rows, columns, children }: TableBlockProps) {
  return (
    <table
      data-lexical-node-key={nodeKey}
      data-lexical-table="true"
      data-rows={rows}
      data-columns={columns}
    >
      {children}
    </table>
  );
}
