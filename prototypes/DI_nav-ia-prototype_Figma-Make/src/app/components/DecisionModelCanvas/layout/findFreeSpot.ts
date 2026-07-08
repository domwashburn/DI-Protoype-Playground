import type { Node } from 'reactflow';
import type { LayoutOrientation } from './dagreLayout';

const DEFAULT_W = 160;
const DEFAULT_H = 60;

interface SizedNode {
  x: number;
  y: number;
  w: number;
  h: number;
}

function rectsOverlap(a: SizedNode, b: SizedNode): boolean {
  return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);
}

/**
 * Nudge `position` along the cross-axis of the orientation until it no longer
 * overlaps any other node. Caps at 8 attempts; falls back to the original
 * position. Cross-axis: we move along the layout's "node-sep" direction, so
 * for top/bottom layouts we shift x, for left/right layouts we shift y.
 */
export function findFreeSpot(
  position: { x: number; y: number },
  size: { width: number; height: number },
  others: Node[],
  measured: Map<string, { width?: number | null; height?: number | null }>,
  orientation: LayoutOrientation,
  step = 48,
  maxAttempts = 8,
): { x: number; y: number } {
  const horizontal = orientation === 'LR' || orientation === 'RL';
  const candidate: SizedNode = { x: position.x, y: position.y, w: size.width, h: size.height };
  const obstacles: SizedNode[] = others.map((n) => {
    const m = measured.get(n.id);
    return {
      x: n.position.x,
      y: n.position.y,
      w: m?.width ?? DEFAULT_W,
      h: m?.height ?? DEFAULT_H,
    };
  });

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const conflict = obstacles.some((o) => rectsOverlap(candidate, o));
    if (!conflict) return { x: candidate.x, y: candidate.y };
    const sign = attempt % 2 === 0 ? 1 : -1;
    const magnitude = Math.ceil((attempt + 1) / 2) * step;
    if (horizontal) {
      candidate.y = position.y + sign * magnitude;
    } else {
      candidate.x = position.x + sign * magnitude;
    }
  }
  return position;
}
