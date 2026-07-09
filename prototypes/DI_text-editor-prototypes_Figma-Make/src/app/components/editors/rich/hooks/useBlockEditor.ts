import { useMemo } from 'react';
import type { BlockDefinition, EditorMode } from '../types';
import { isMarkdownCompatibleBlock } from '../MARKDOWN_SUBSET';

const ALL_BLOCKS: BlockDefinition[] = [
  { type: 'paragraph', label: 'Text', description: 'Plain paragraph block', markdownCompatible: true, keywords: ['p', 'text'] },
  { type: 'heading-1', label: 'Heading 1', description: 'Large section heading', markdownCompatible: true, keywords: ['h1', '#'] },
  { type: 'heading-2', label: 'Heading 2', description: 'Medium section heading', markdownCompatible: true, keywords: ['h2', '##'] },
  { type: 'heading-3', label: 'Heading 3', description: 'Small section heading', markdownCompatible: true, keywords: ['h3', '###'] },
  { type: 'bullet-list', label: 'Bullet list', description: 'Unordered list', markdownCompatible: true, keywords: ['ul', '-', 'list'] },
  { type: 'numbered-list', label: 'Numbered list', description: 'Ordered list', markdownCompatible: true, keywords: ['ol', '1.', 'list'] },
  { type: 'check-list', label: 'Checklist', description: 'Task list with checkboxes', markdownCompatible: true, keywords: ['todo', 'task', 'check'] },
  { type: 'quote', label: 'Quote', description: 'Inset quoted or cited content', markdownCompatible: true, keywords: ['blockquote', '>'] },
  { type: 'code', label: 'Code', description: 'Code block with monospace text', markdownCompatible: true, keywords: ['```', 'pre'] },
  { type: 'divider', label: 'Divider', description: 'Section separator', markdownCompatible: true, keywords: ['hr', '---'] },
  { type: 'callout', label: 'Callout', description: 'Highlighted note with tone (info, success, warning, error)', markdownCompatible: false, keywords: ['note', 'admonition', 'alert', 'tip'] },
  { type: 'table', label: 'Table', description: 'Grid with nested block content in each cell', markdownCompatible: true, keywords: ['grid', 'rows', 'columns'] },
  { type: 'image', label: 'Image', description: 'Embedded image with caption and alt text', markdownCompatible: true, keywords: ['picture', 'img', 'media'] },
];

export function useBlockEditor(mode: EditorMode = 'rich') {
  const blocks = useMemo(() => {
    return mode === 'markdown' ? ALL_BLOCKS.filter((block) => isMarkdownCompatibleBlock(block.type)) : ALL_BLOCKS;
  }, [mode]);

  return { blocks, isMarkdownMode: mode === 'markdown' };
}
