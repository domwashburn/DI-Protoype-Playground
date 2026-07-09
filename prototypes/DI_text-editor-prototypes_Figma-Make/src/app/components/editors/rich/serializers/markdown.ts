import { TRANSFORMERS, $convertToMarkdownString } from '@lexical/markdown';

export const richMarkdownTransformers = TRANSFORMERS;

export function serializeEditorToMarkdown(): string {
  return $convertToMarkdownString(richMarkdownTransformers);
}
