import { MarkerType, type Edge, type Node } from 'reactflow';
import type { DmnNodeData } from '../nodes';

/**
 * 1:1 reconstruction of the [Main] Pricing decision model from the source
 * dmn-diagram dump. Coordinates and edge directions match the source; node
 * sizing is the React Flow default for our DMN nodes (160×60), which differs
 * from the source by design — we recreate structure, not pixels.
 */

export const pricingNodes: Node<DmnNodeData>[] = [
  {
    id: 'node_0',
    type: 'inputData',
    position: { x: 513.408, y: 315 },
    data: { name: 'email', type: 'string' },
  },
  {
    id: 'node_1',
    type: 'decision',
    position: { x: 408, y: 215 },
    data: { name: 'Generated text', type: 'string' },
  },
  {
    id: 'node_3',
    type: 'decision',
    position: { x: 255, y: 100 },
    data: { name: 'Products', type: 'List of Product' },
  },
  {
    id: 'node_6',
    type: 'decision',
    position: { x: 255, y: 0 },
    data: { name: 'Pricing', type: 'double (64 bits)', output: true },
  },
  {
    id: 'node_4',
    type: 'businessKnowledge',
    position: { x: 0, y: 215 },
    data: { name: 'Part number', type: 'string' },
  },
  {
    id: 'node_5',
    type: 'businessKnowledge',
    position: { x: 204, y: 215 },
    data: { name: 'Unit price', type: 'double (64 bits)' },
  },
  {
    id: 'node_7',
    type: 'businessKnowledge',
    position: { x: 295.775, y: 315 },
    data: { name: 'Email analysis', type: 'email analysis output', variant: 'generative' },
  },
  {
    id: 'node_8',
    type: 'businessKnowledge',
    position: { x: 95.7754, y: 315 },
    data: {
      name: 'Prediction 8',
      type: 'string',
      variant: 'prediction',
      warning: "The node 'Prediction 8' must have one or more links to or from other nodes.",
    },
  },
];

const ARROW = { type: MarkerType.ArrowClosed, color: '#8d8d8d', width: 10, height: 10 };
const ARROW_LIGHT = { type: MarkerType.ArrowClosed, color: '#a8a8a8', width: 10, height: 10 };

export const pricingEdges: Edge[] = [
  { id: 'e_0_1', source: 'node_0', target: 'node_1', type: 'dmn', data: { dashed: false }, markerEnd: ARROW },
  { id: 'e_1_3', source: 'node_1', target: 'node_3', type: 'dmn', data: { dashed: false }, markerEnd: ARROW },
  { id: 'e_3_6', source: 'node_3', target: 'node_6', type: 'dmn', data: { dashed: false }, markerEnd: ARROW },
  { id: 'e_4_3', source: 'node_4', target: 'node_3', type: 'dmn', data: { dashed: true }, markerEnd: ARROW_LIGHT },
  { id: 'e_5_3', source: 'node_5', target: 'node_3', type: 'dmn', data: { dashed: true }, markerEnd: ARROW_LIGHT },
  { id: 'e_7_1', source: 'node_7', target: 'node_1', type: 'dmn', data: { dashed: true }, markerEnd: ARROW_LIGHT },
];
