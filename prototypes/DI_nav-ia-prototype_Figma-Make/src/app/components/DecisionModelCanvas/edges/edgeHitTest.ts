import { getSmoothStepPath, type Edge, type Node } from 'reactflow';
import { SIDE_FOR_ORIENTATION } from '../OrientationContext';
import type { LayoutOrientation } from '../layout';

interface Point {
  x: number;
  y: number;
}

const DEFAULT_W = 160;
const DEFAULT_H = 60;

/**
 * Sample points along each edge's smoothstep path and return the id of the
 * edge whose nearest sample is within `tolerance` flow-units of `point`.
 * Returns null if no edge is close enough.
 *
 * We sample rather than do exact segment math because `getSmoothStepPath`
 * returns an SVG `d` string that doesn't trivially decompose into segments.
 */
export function findEdgeNear(
  point: Point,
  edges: Edge[],
  nodes: Node[],
  measured: Map<string, { width?: number | null; height?: number | null }>,
  tolerance = 24,
  samplesPerEdge = 32,
  orientation: LayoutOrientation = 'BT',
): Edge | null {
  let best: { edge: Edge; dist: number } | null = null;
  for (const edge of edges) {
    const samples = sampleEdge(edge, nodes, measured, samplesPerEdge, orientation);
    for (const s of samples) {
      const d = Math.hypot(s.x - point.x, s.y - point.y);
      if (d <= tolerance && (!best || d < best.dist)) {
        best = { edge, dist: d };
      }
    }
  }
  return best?.edge ?? null;
}

function sampleEdge(
  edge: Edge,
  nodes: Node[],
  measured: Map<string, { width?: number | null; height?: number | null }>,
  samples: number,
  orientation: LayoutOrientation,
): Point[] {
  const source = nodes.find((n) => n.id === edge.source);
  const target = nodes.find((n) => n.id === edge.target);
  if (!source || !target) return [];

  const sm = measured.get(source.id);
  const tm = measured.get(target.id);
  const sw = sm?.width ?? DEFAULT_W;
  const sh = sm?.height ?? DEFAULT_H;
  const tw = tm?.width ?? DEFAULT_W;
  const th = tm?.height ?? DEFAULT_H;

  const sx = source.position.x + sw / 2;
  const sy = source.position.y + sh / 2;
  const tx = target.position.x + tw / 2;
  const ty = target.position.y + th / 2;

  // Sample at the orientation-correct sides so hit-test geometry matches the
  // rendered route. Wrong sides would shift samples off the actual line for
  // LR/RL and produce missed hits.
  const sides = SIDE_FOR_ORIENTATION[orientation];

  const [d] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
    sourcePosition: sides.source,
    targetPosition: sides.target,
    borderRadius: 5,
    offset: 20,
  });

  return samplePathD(d, samples);
}

/**
 * Lo-fi sampler for an SVG path string. Handles only the operators that
 * smoothstep emits: M, L, Q (quadratic). Returns evenly-spaced points along
 * the path's parameter, NOT its arc length — close enough for hit-testing.
 */
function samplePathD(d: string, samples: number): Point[] {
  const tokens = d.match(/[MLQ][^MLQ]*/g);
  if (!tokens) return [];
  const points: Point[] = [];
  let cursor: Point = { x: 0, y: 0 };
  for (const tok of tokens) {
    const op = tok[0];
    const nums = tok
      .slice(1)
      .trim()
      .split(/[ ,]+/)
      .map(parseFloat)
      .filter((n) => !Number.isNaN(n));
    if (op === 'M' || op === 'L') {
      const next = { x: nums[0], y: nums[1] };
      if (op === 'L') {
        for (let i = 0; i <= samples; i += 1) {
          const t = i / samples;
          points.push({ x: cursor.x + (next.x - cursor.x) * t, y: cursor.y + (next.y - cursor.y) * t });
        }
      }
      cursor = next;
    } else if (op === 'Q') {
      const ctrl = { x: nums[0], y: nums[1] };
      const end = { x: nums[2], y: nums[3] };
      for (let i = 0; i <= samples; i += 1) {
        const t = i / samples;
        const mt = 1 - t;
        points.push({
          x: mt * mt * cursor.x + 2 * mt * t * ctrl.x + t * t * end.x,
          y: mt * mt * cursor.y + 2 * mt * t * ctrl.y + t * t * end.y,
        });
      }
      cursor = end;
    }
  }
  return points;
}
