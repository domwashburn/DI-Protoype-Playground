import type { BlockType } from './types';

export const MARKDOWN_COMPATIBLE_BLOCKS: BlockType[] = [
  'paragraph',
  'heading-1',
  'heading-2',
  'heading-3',
  'bullet-list',
  'numbered-list',
  'check-list',
  'quote',
  'code',
  'divider',
  'table',
  'image',
];

export function isMarkdownCompatibleBlock(type: BlockType) {
  return MARKDOWN_COMPATIBLE_BLOCKS.includes(type);
}
