import { Position } from 'reactflow';

/**
 * Orthogonal connector router with subway-map lanes and obstacle avoidance.
 *
 * Contract:
 *   - Connectors are pure right-angle (no curves, no diagonals).
 *   - Connectors *always* leave the source and enter the target perpendicular
 *     to the chosen side. We never displace the source/target X (or Y for
 *     horizontal flow): the perpendicular leg stays in line with the handle,
 *     so the visual entry/exit point is exactly where the user expects.
 *   - The horizontal/vertical "rail" between the two stubs takes a
 *     pre-assigned lane (from edgeLanes.ts). If that lane crosses a node, the
 *     rail is pushed in 8 px increments until clear. The endpoint legs are
 *     never moved sideways — only lengthened — so we keep the perpendicular
 *     guarantee.
 */

export interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Point {
  x: number;
  y: number;
}

interface RouteArgs {
  sourceX: number;
  sourceY: number;
  sourcePosition: Position;
  targetX: number;
  targetY: number;
  targetPosition: Position;
  obstacles: Obstacle[];
  /** Pre-assigned lane track (subway-map distribution). */
  centerX?: number;
  centerY?: number;
}

const STUB = 15;
const MARGIN = 8;
const MAX_PUSH = 800;
const PUSH_STEP = 8;

const isVerticalSide = (s: Position) => s === Position.Top || s === Position.Bottom;

function stub(x: number, y: number, side: Position, dist: number): Point {
  switch (side) {
    case Position.Top: return { x, y: y - dist };
    case Position.Bottom: return { x, y: y + dist };
    case Position.Left: return { x: x - dist, y };
    case Position.Right: return { x: x + dist, y };
  }
}

/** Does an axis-aligned segment intersect any obstacle (with MARGIN padding)?
 *  `axis` describes the segment's *direction*: a horizontal segment has a
 *  fixed Y (rail) and varies in X (perpA→perpB). */
function segmentBlocked(
  axis: 'horizontal' | 'vertical',
  rail: number,
  perpA: number,
  perpB: number,
  obstacles: Obstacle[],
): boolean {
  const min = Math.min(perpA, perpB);
  const max = Math.max(perpA, perpB);
  for (const o of obstacles) {
    if (axis === 'horizontal') {
      if (
        rail >= o.y - MARGIN &&
        rail <= o.y + o.h + MARGIN &&
        max >= o.x - MARGIN &&
        min <= o.x + o.w + MARGIN
      ) return true;
    } else {
      if (
        rail >= o.x - MARGIN &&
        rail <= o.x + o.w + MARGIN &&
        max >= o.y - MARGIN &&
        min <= o.y + o.h + MARGIN
      ) return true;
    }
  }
  return false;
}

function pushRail(
  axis: 'horizontal' | 'vertical',
  start: number,
  perpA: number,
  perpB: number,
  obstacles: Obstacle[],
): number {
  if (!segmentBlocked(axis, start, perpA, perpB, obstacles)) return start;
  for (let step = PUSH_STEP; step <= MAX_PUSH; step += PUSH_STEP) {
    if (!segmentBlocked(axis, start + step, perpA, perpB, obstacles)) return start + step;
    if (!segmentBlocked(axis, start - step, perpA, perpB, obstacles)) return start - step;
  }
  return start;
}

function pointsToPath(points: Point[]): string {
  if (points.length === 0) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) d += ` L ${points[i].x} ${points[i].y}`;
  return d;
}

function midpoint(points: Point[]): Point {
  if (points.length < 2) return points[0] ?? { x: 0, y: 0 };
  let total = 0;
  const lens: number[] = [];
  for (let i = 1; i < points.length; i++) {
    const len = Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
    lens.push(len);
    total += len;
  }
  const half = total / 2;
  let acc = 0;
  for (let i = 1; i < points.length; i++) {
    if (acc + lens[i - 1] >= half) {
      const t = lens[i - 1] === 0 ? 0 : (half - acc) / lens[i - 1];
      return {
        x: points[i - 1].x + (points[i].x - points[i - 1].x) * t,
        y: points[i - 1].y + (points[i].y - points[i - 1].y) * t,
      };
    }
    acc += lens[i - 1];
  }
  return points[points.length - 1];
}

export function routeOrthogonal({
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  obstacles,
  centerX,
  centerY,
}: RouteArgs): [string, number, number] {
  const verticalFlow = isVerticalSide(sourcePosition) && isVerticalSide(targetPosition);
  const horizontalFlow = !isVerticalSide(sourcePosition) && !isVerticalSide(targetPosition);

  let mid: Point[] = [];

  if (verticalFlow) {
    if (Math.abs(sourceX - targetX) < 0.5) {
      // Same column → straight vertical (or push aside if blocked).
      if (segmentBlocked('vertical', sourceX, sourceY, targetY, obstacles)) {
        // Fall through to Z-shape via a side rail.
        const initial = centerY ?? (sourceY + targetY) / 2;
        const railY = pushRail('horizontal', initial, sourceX, targetX, obstacles);
        mid = [
          { x: sourceX, y: railY },
          { x: targetX, y: railY },
        ];
      } else {
        mid = [];
      }
    } else {
      // Z-shape: source vertical → rail horizontal → target vertical. The
      // perpendicular legs stay aligned with the handles — only the rail Y
      // moves to dodge obstacles.
      const initial = centerY ?? (sourceY + targetY) / 2;
      let railY = pushRail('horizontal', initial, sourceX, targetX, obstacles);

      // Make sure both perpendicular legs clear obstacles. If the source's
      // vertical (sourceX, sourceY..railY) is blocked, push the rail further
      // — never push the leg sideways. Same for the target leg.
      const stubSource = stub(sourceX, sourceY, sourcePosition, STUB);
      const stubTarget = stub(targetX, targetY, targetPosition, STUB);

      // Source-side leg from sourceY to railY at fixed sourceX. If blocked,
      // push railY past the obstacle along the same direction the source is
      // pointing (so the leg gets longer, never sideways).
      if (segmentBlocked('vertical', sourceX, sourceY, railY, obstacles)) {
        // Extend rail in the source's perpendicular direction.
        const dir = sourcePosition === Position.Top ? -1 : 1;
        for (let step = PUSH_STEP; step <= MAX_PUSH; step += PUSH_STEP) {
          const candidate = railY + dir * step;
          if (
            !segmentBlocked('vertical', sourceX, sourceY, candidate, obstacles) &&
            !segmentBlocked('horizontal', candidate, sourceX, targetX, obstacles)
          ) {
            railY = candidate;
            break;
          }
        }
      }
      if (segmentBlocked('vertical', targetX, targetY, railY, obstacles)) {
        const dir = targetPosition === Position.Top ? -1 : 1;
        for (let step = PUSH_STEP; step <= MAX_PUSH; step += PUSH_STEP) {
          const candidate = railY + dir * step;
          if (
            !segmentBlocked('vertical', targetX, targetY, candidate, obstacles) &&
            !segmentBlocked('horizontal', candidate, sourceX, targetX, obstacles)
          ) {
            railY = candidate;
            break;
          }
        }
      }

      // Reference stubs to suppress unused-var warnings (they document intent).
      void stubSource;
      void stubTarget;

      mid = [
        { x: sourceX, y: railY },
        { x: targetX, y: railY },
      ];
    }
  } else if (horizontalFlow) {
    if (Math.abs(sourceY - targetY) < 0.5) {
      if (segmentBlocked('horizontal', sourceY, sourceX, targetX, obstacles)) {
        const initial = centerX ?? (sourceX + targetX) / 2;
        const railX = pushRail('vertical', initial, sourceY, targetY, obstacles);
        mid = [
          { x: railX, y: sourceY },
          { x: railX, y: targetY },
        ];
      } else {
        mid = [];
      }
    } else {
      const initial = centerX ?? (sourceX + targetX) / 2;
      let railX = pushRail('vertical', initial, sourceY, targetY, obstacles);

      if (segmentBlocked('horizontal', sourceY, sourceX, railX, obstacles)) {
        const dir = sourcePosition === Position.Left ? -1 : 1;
        for (let step = PUSH_STEP; step <= MAX_PUSH; step += PUSH_STEP) {
          const candidate = railX + dir * step;
          if (
            !segmentBlocked('horizontal', sourceY, sourceX, candidate, obstacles) &&
            !segmentBlocked('vertical', candidate, sourceY, targetY, obstacles)
          ) {
            railX = candidate;
            break;
          }
        }
      }
      if (segmentBlocked('horizontal', targetY, targetX, railX, obstacles)) {
        const dir = targetPosition === Position.Left ? -1 : 1;
        for (let step = PUSH_STEP; step <= MAX_PUSH; step += PUSH_STEP) {
          const candidate = railX + dir * step;
          if (
            !segmentBlocked('horizontal', targetY, targetX, candidate, obstacles) &&
            !segmentBlocked('vertical', candidate, sourceY, targetY, obstacles)
          ) {
            railX = candidate;
            break;
          }
        }
      }

      mid = [
        { x: railX, y: sourceY },
        { x: railX, y: targetY },
      ];
    }
  } else {
    // Mixed sides → single L-bend.
    if (isVerticalSide(sourcePosition)) {
      mid = [{ x: sourceX, y: targetY }];
    } else {
      mid = [{ x: targetX, y: sourceY }];
    }
  }

  const points: Point[] = [
    { x: sourceX, y: sourceY },
    ...mid,
    { x: targetX, y: targetY },
  ];

  // Drop colinear / duplicate points so the output path has the minimum
  // number of L commands.
  const compact: Point[] = [];
  for (const p of points) {
    const prev = compact[compact.length - 1];
    if (!prev) {
      compact.push(p);
      continue;
    }
    if (Math.abs(prev.x - p.x) < 0.001 && Math.abs(prev.y - p.y) < 0.001) continue;
    compact.push(p);
  }

  const m = midpoint(compact);
  return [pointsToPath(compact), m.x, m.y];
}
