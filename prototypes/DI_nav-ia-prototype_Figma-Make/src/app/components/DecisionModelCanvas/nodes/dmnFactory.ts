import type { Node } from 'reactflow';
import type { NodePaletteKind } from '../NodeToolbar';
import type { DmnNodeData } from './DmnNodes';
import type { dmnNodeTypes } from './DmnNodes';

export const PALETTE_TEMPLATES: Record<
  NodePaletteKind,
  { type: keyof typeof dmnNodeTypes; data: DmnNodeData }
> = {
  decision: { type: 'decision', data: { name: 'New decision', type: 'Decision' } },
  inputData: { type: 'inputData', data: { name: 'New input', type: 'Input' } },
  prediction: {
    type: 'businessKnowledge',
    data: { name: 'New prediction', type: 'Prediction', variant: 'prediction' },
  },
  function: {
    type: 'businessKnowledge',
    data: { name: 'New function', type: 'Function', variant: 'default' },
  },
  generative: {
    type: 'businessKnowledge',
    data: { name: 'New generative', type: 'Generative AI', variant: 'generative' },
  },
};

let paletteNodeSeq = 0;

export function makePaletteNode(
  kind: NodePaletteKind,
  position: { x: number; y: number },
): Node<DmnNodeData> {
  const tpl = PALETTE_TEMPLATES[kind];
  paletteNodeSeq += 1;
  return {
    id: `palette-${kind}-${Date.now()}-${paletteNodeSeq}`,
    type: tpl.type,
    position,
    data: { ...tpl.data },
  };
}
