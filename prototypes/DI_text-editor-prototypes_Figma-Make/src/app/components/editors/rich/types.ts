export type EditorMode = 'rich' | 'markdown';

export type CalloutTone = 'info' | 'success' | 'warning' | 'error';

export type BlockType =
  | 'paragraph'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'bullet-list'
  | 'numbered-list'
  | 'check-list'
  | 'quote'
  | 'code'
  | 'divider'
  | 'callout'
  | 'table'
  | 'image';

export interface BlockDefinition {
  type: BlockType;
  label: string;
  description: string;
  markdownCompatible: boolean;
  keywords: string[];
}

export interface RichBlockEditorProps {
  initialContent?: string;
  mode?: EditorMode;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (payload: { html: string; markdown: string; json: string }) => void;
}
