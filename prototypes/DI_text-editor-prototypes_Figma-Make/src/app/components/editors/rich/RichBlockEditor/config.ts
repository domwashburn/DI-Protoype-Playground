import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import type { InitialConfigType } from '@lexical/react/LexicalComposer';
import styles from './RichBlockEditor.module.css';
import { CalloutNode } from '../blocks/CalloutBlock/CalloutNode';
import { ImageNode } from '../blocks/ImageBlock/ImageNode';

export const richBlockEditorTheme = {
  paragraph: styles.paragraph,
  heading: { h1: styles.heading1, h2: styles.heading2, h3: styles.heading3 },
  quote: styles.quote,
  list: { ul: styles.listUl, ol: styles.listOl, listitem: styles.listItem, nested: { listitem: styles.nestedListItem }, checklist: styles.checkListItem, listitemChecked: styles.checkListItemChecked },
  code: styles.code,
  codeHighlight: { atrule: styles.codeHighlight, attr: styles.codeHighlight, boolean: styles.codeHighlight, builtin: styles.codeHighlight, cdata: styles.codeHighlight, char: styles.codeHighlight, class: styles.codeHighlight, comment: styles.codeHighlight, constant: styles.codeHighlight, deleted: styles.codeHighlight, doctype: styles.codeHighlight, entity: styles.codeHighlight, function: styles.codeHighlight, important: styles.codeHighlight, inserted: styles.codeHighlight, keyword: styles.codeHighlight, namespace: styles.codeHighlight, number: styles.codeHighlight, operator: styles.codeHighlight, prolog: styles.codeHighlight, property: styles.codeHighlight, punctuation: styles.codeHighlight, regex: styles.codeHighlight, selector: styles.codeHighlight, string: styles.codeHighlight, symbol: styles.codeHighlight, tag: styles.codeHighlight, url: styles.codeHighlight, variable: styles.codeHighlight },
  link: styles.link,
  text: { bold: styles.textBold, italic: styles.textItalic, underline: styles.textUnderline, strikethrough: styles.textStrikethrough, code: styles.textCode },
  table: styles.table,
  tableRow: styles.tableRow,
  tableCell: styles.tableCell,
  tableCellHeader: styles.tableCellHeader,
  callout: {
    base: styles.callout,
    tone: {
      info: styles.calloutInfo,
      success: styles.calloutSuccess,
      warning: styles.calloutWarning,
      error: styles.calloutError,
    },
  },
  image: styles.imageFigure,
};

export function createRichBlockEditorConfig(namespace: string, editable: boolean): InitialConfigType {
  return {
    namespace,
    editable,
    theme: richBlockEditorTheme,
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      CodeNode,
      CodeHighlightNode,
      LinkNode,
      AutoLinkNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      CalloutNode,
      ImageNode,
    ],
    onError(error: Error) { throw error; },
  };
}
