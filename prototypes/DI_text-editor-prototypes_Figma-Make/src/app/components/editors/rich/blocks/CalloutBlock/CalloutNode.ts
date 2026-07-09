import {
  $applyNodeReplacement,
  $createParagraphNode,
  ElementNode,
  type DOMConversionMap,
  type DOMConversionOutput,
  type DOMExportOutput,
  type EditorConfig,
  type LexicalEditor,
  type LexicalNode,
  type NodeKey,
  type SerializedElementNode,
  type Spread,
} from 'lexical';
import type { CalloutTone } from '../../types';

export type SerializedCalloutNode = Spread<
  { tone: CalloutTone; type: 'callout'; version: 1 },
  SerializedElementNode
>;

const TONE_ATTR = 'data-callout-tone';

export class CalloutNode extends ElementNode {
  __tone: CalloutTone;

  static getType(): string {
    return 'callout';
  }

  static clone(node: CalloutNode): CalloutNode {
    return new CalloutNode(node.__tone, node.__key);
  }

  constructor(tone: CalloutTone = 'info', key?: NodeKey) {
    super(key);
    this.__tone = tone;
  }

  getTone(): CalloutTone {
    return this.getLatest().__tone;
  }

  setTone(tone: CalloutTone): this {
    const self = this.getWritable();
    self.__tone = tone;
    return self;
  }

  createDOM(config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const element = document.createElement('aside');
    element.setAttribute(TONE_ATTR, this.__tone);
    element.setAttribute('role', 'note');
    const themeCallout = (config.theme as { callout?: { base?: string; tone?: Record<CalloutTone, string> } }).callout;
    if (themeCallout?.base) element.className = themeCallout.base;
    if (themeCallout?.tone?.[this.__tone]) element.classList.add(themeCallout.tone[this.__tone]);
    return element;
  }

  updateDOM(prevNode: CalloutNode, dom: HTMLElement, config: EditorConfig): boolean {
    if (prevNode.__tone === this.__tone) return false;
    dom.setAttribute(TONE_ATTR, this.__tone);
    const themeCallout = (config.theme as { callout?: { base?: string; tone?: Record<CalloutTone, string> } }).callout;
    if (themeCallout?.tone) {
      Object.values(themeCallout.tone).forEach((className) => dom.classList.remove(className));
      if (themeCallout.tone[this.__tone]) dom.classList.add(themeCallout.tone[this.__tone]);
    }
    return false;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('aside');
    element.setAttribute(TONE_ATTR, this.__tone);
    element.setAttribute('data-lexical-callout', 'true');
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      aside: (node: HTMLElement) => {
        if (!node.hasAttribute('data-lexical-callout')) return null;
        return {
          conversion: (element: HTMLElement): DOMConversionOutput => {
            const tone = (element.getAttribute(TONE_ATTR) as CalloutTone) ?? 'info';
            return { node: $createCalloutNode(tone) };
          },
          priority: 1,
        };
      },
    };
  }

  static importJSON(serialized: SerializedCalloutNode): CalloutNode {
    const node = $createCalloutNode(serialized.tone);
    return node;
  }

  exportJSON(): SerializedCalloutNode {
    return {
      ...super.exportJSON(),
      tone: this.__tone,
      type: 'callout',
      version: 1,
    };
  }

  canBeEmpty(): boolean {
    return false;
  }

  isShadowRoot(): boolean {
    return false;
  }

  insertNewAfter(): LexicalNode | null {
    const paragraph = $createParagraphNode();
    const parent = this.getParentOrThrow();
    parent.insertAfter(paragraph);
    return paragraph;
  }

  collapseAtStart(): boolean {
    const paragraph = $createParagraphNode();
    const children = this.getChildren();
    children.forEach((child) => paragraph.append(child));
    this.replace(paragraph);
    return true;
  }
}

export function $createCalloutNode(tone: CalloutTone = 'info'): CalloutNode {
  return $applyNodeReplacement(new CalloutNode(tone));
}

export function $isCalloutNode(node: LexicalNode | null | undefined): node is CalloutNode {
  return node instanceof CalloutNode;
}
