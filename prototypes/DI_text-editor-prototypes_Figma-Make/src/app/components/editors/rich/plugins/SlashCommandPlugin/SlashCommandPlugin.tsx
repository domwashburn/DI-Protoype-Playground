import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $createCodeNode } from '@lexical/code';
import { INSERT_CHECK_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import { $createParagraphNode, $getSelection, $insertNodes, $isRangeSelection } from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { useMemo, useState } from 'react';
import type { BlockDefinition, BlockType } from '../../types';
import styles from '../../RichBlockEditor/RichBlockEditor.module.css';
import { $createCalloutNode } from '../../blocks/CalloutBlock/CalloutNode';
import { $createImageNode } from '../../blocks/ImageBlock/ImageNode';

function applyBlock(editor: ReturnType<typeof useLexicalComposerContext>[0], type: BlockType) {
  if (type === 'bullet-list') return editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  if (type === 'numbered-list') return editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  if (type === 'check-list') return editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
  if (type === 'table') {
    return editor.dispatchCommand(INSERT_TABLE_COMMAND, { columns: '3', rows: '3', includeHeaders: true });
  }
  editor.update(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;
    if (type === 'paragraph') $setBlocksType(selection, () => $createParagraphNode());
    if (type === 'heading-1') $setBlocksType(selection, () => $createHeadingNode('h1'));
    if (type === 'heading-2') $setBlocksType(selection, () => $createHeadingNode('h2'));
    if (type === 'heading-3') $setBlocksType(selection, () => $createHeadingNode('h3'));
    if (type === 'quote') $setBlocksType(selection, () => $createQuoteNode());
    if (type === 'code') $setBlocksType(selection, () => $createCodeNode());
    if (type === 'divider') $setBlocksType(selection, () => $createParagraphNode());
    if (type === 'callout') {
      const callout = $createCalloutNode('info');
      const paragraph = $createParagraphNode();
      callout.append(paragraph);
      $insertNodes([callout]);
      paragraph.select();
    }
    if (type === 'image') {
      const node = $createImageNode({
        src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=60',
        altText: 'Placeholder image',
        caption: '',
      });
      $insertNodes([node]);
    }
  });
}

export function SlashCommandPlugin({ blocks }: { blocks: BlockDefinition[] }) {
  const [editor] = useLexicalComposerContext();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => blocks.filter((block) => `${block.label} ${block.description} ${block.keywords.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [blocks, query]);

  return (
    <div onKeyUp={(event) => {
      if (event.key === '/') { setOpen(true); setQuery(''); }
      if (event.key === 'Escape') setOpen(false);
      if (open && event.key.length === 1 && event.key !== '/') setQuery((value) => `${value}${event.key}`);
      if (open && event.key === 'Backspace') setQuery((value) => value.slice(0, -1));
    }}>
      {open && (
        <div className={styles.palette} role="listbox" aria-label="Block command palette">
          <div className={styles.paletteHeader}>Type after / to filter blocks</div>
          {filtered.map((block, index) => (
            <button key={block.type} className={`${styles.paletteItem} ${index === 0 ? styles.paletteItemActive : ''}`} type="button" onMouseDown={(event) => { event.preventDefault(); applyBlock(editor, block.type); setOpen(false); }}>
              <span className={styles.paletteLabel}>{block.label}</span>
              <span className={styles.paletteDescription}>{block.description}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
