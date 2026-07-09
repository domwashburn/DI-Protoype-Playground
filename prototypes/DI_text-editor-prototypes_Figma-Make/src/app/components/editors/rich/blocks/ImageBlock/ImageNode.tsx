import {
  $applyNodeReplacement,
  DecoratorNode,
  type DOMConversionMap,
  type DOMConversionOutput,
  type DOMExportOutput,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
} from 'lexical';
import { ImageBlock } from './ImageBlock';

export interface ImagePayload {
  src: string;
  altText: string;
  caption?: string;
  width?: number;
  height?: number;
  key?: NodeKey;
}

export type SerializedImageNode = Spread<
  {
    src: string;
    altText: string;
    caption: string;
    width: number | undefined;
    height: number | undefined;
    type: 'image';
    version: 1;
  },
  SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __caption: string;
  __width: number | undefined;
  __height: number | undefined;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__altText, node.__caption, node.__width, node.__height, node.__key);
  }

  constructor(
    src: string,
    altText: string,
    caption = '',
    width?: number,
    height?: number,
    key?: NodeKey,
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__caption = caption;
    this.__width = width;
    this.__height = height;
  }

  createDOM(): HTMLElement {
    const figure = document.createElement('figure');
    figure.setAttribute('data-lexical-image', 'true');
    return figure;
  }

  updateDOM(): false {
    return false;
  }

  exportDOM(): DOMExportOutput {
    const figure = document.createElement('figure');
    figure.setAttribute('data-lexical-image', 'true');
    const img = document.createElement('img');
    img.setAttribute('src', this.__src);
    img.setAttribute('alt', this.__altText);
    if (this.__width) img.setAttribute('width', String(this.__width));
    if (this.__height) img.setAttribute('height', String(this.__height));
    figure.appendChild(img);
    if (this.__caption) {
      const figcaption = document.createElement('figcaption');
      figcaption.textContent = this.__caption;
      figure.appendChild(figcaption);
    }
    return { element: figure };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({
        conversion: (element: HTMLElement): DOMConversionOutput => {
          const src = element.getAttribute('src') ?? '';
          const alt = element.getAttribute('alt') ?? '';
          const width = element.getAttribute('width');
          const height = element.getAttribute('height');
          return {
            node: $createImageNode({
              src,
              altText: alt,
              width: width ? Number(width) : undefined,
              height: height ? Number(height) : undefined,
            }),
          };
        },
        priority: 1,
      }),
    };
  }

  static importJSON(serialized: SerializedImageNode): ImageNode {
    return $createImageNode({
      src: serialized.src,
      altText: serialized.altText,
      caption: serialized.caption,
      width: serialized.width,
      height: serialized.height,
    });
  }

  exportJSON(): SerializedImageNode {
    return {
      src: this.__src,
      altText: this.__altText,
      caption: this.__caption,
      width: this.__width,
      height: this.__height,
      type: 'image',
      version: 1,
    };
  }

  getSrc(): string {
    return this.getLatest().__src;
  }

  getAltText(): string {
    return this.getLatest().__altText;
  }

  getCaption(): string {
    return this.getLatest().__caption;
  }

  setCaption(caption: string): void {
    const self = this.getWritable();
    self.__caption = caption;
  }

  decorate(): JSX.Element {
    return (
      <ImageBlock
        nodeKey={this.getKey()}
        src={this.__src}
        altText={this.__altText}
        caption={this.__caption}
        width={this.__width}
        height={this.__height}
      />
    );
  }

  isInline(): false {
    return false;
  }
}

export function $createImageNode(payload: ImagePayload): ImageNode {
  return $applyNodeReplacement(
    new ImageNode(payload.src, payload.altText, payload.caption ?? '', payload.width, payload.height, payload.key),
  );
}

export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
  return node instanceof ImageNode;
}
