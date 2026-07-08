import type { Edge, Node } from 'reactflow';
import type { LayoutOrientation } from '../layout';

const DEFAULT_W = 160;
const DEFAULT_H = 60;

const STUB = 15;        // matches orthogonalRouter STUB; rail must clear stubs
const LANE_STRIDE = 14; // px between subway lanes inside a rank gap
const MIN_INTERLANE = 6; // collapse stride when the gap is too narrow
// Two horizontal rails can share the same Y when their X-extents are this far
// apart or more — they won't visually collide. Below this padding we treat
// them as overlapping and force them onto different lanes.
const RAIL_OVERLAP_PAD = 24;

export interface EdgeLane {
  /** Horizontal lane track for vertical (BT/TB) flow. */
  centerY?: number;
  /** Vertical lane track for horizontal (LR/RL) flow. */
  centerX?: number;
  /** Step offset (distance from source/target before the elbow). */
  offset?: number;
}

/**
 * Lane assignment for orthogonal connectors.
 *
 * The "subway-map" look comes from putting every edge that crosses the same
 * rank-gap onto its own horizontal track inside that gap *only when needed* —
 * adjacent connectors with non-overlapping rail extents are kept on the SAME
 * track so their elbow corners line up cleanly.
 *
 * Steps:
 *  1. Compute each edge's inter-rank GAP and its rail-extent (the X-range its
 *     horizontal segment will cover for vertical flow, or Y-range for
 *     horizontal flow).
 *  2. Group edges with similar gap bounds (rounded to 16 px) so all edges
 *     crossing the same corridor share a lane band.
 *  3. Greedy lane packing: walk edges sorted by source-perpendicular axis;
 *     reuse the lowest existing lane whose committed extents don't overlap
 *     this edge's extent (with a small padding). Only add a new lane when an
 *     edge truly conflicts with everything already assigned.
 *  4. Distribute the resulting lane indices evenly across the gap band, with
 *     STUB-sized margins so the perpendicular stubs always have room.
 *
 * Net effect: when two parallel connectors are simply running side by side
 * they share a single rail Y and bend at the same point. They only fan out
 * onto separate tracks when their horizontal segments actually overlap.
 */
export function assignEdgeLanes(
  edges: Edge[],
  nodes: Node[],
  measured: Map<string, { width?: number | null; height?: number | null }>,
  orientation: LayoutOrientation,
): Map<string, EdgeLane> {
  const isVertical = orientation === 'BT' || orientation === 'TB';
  const out = new Map<string, EdgeLane>();
  if (edges.length === 0) return out;

  const dim = (id: string) => {
    const m = measured.get(id);
    return { w: m?.width ?? DEFAULT_W, h: m?.height ?? DEFAULT_H };
  };
  const nodeById = new Map(nodes.map((n) => [n.id, n] as const));

  type Entry = {
    id: string;
    sourceCenter: number; // perp axis of source for sort
    gapLow: number;       // lower-screen-coord boundary of the inter-rank gap
    gapHigh: number;      // upper-screen-coord boundary of the inter-rank gap
    extentLow: number;    // rail's perpendicular-axis range (low end)
    extentHigh: number;   // rail's perpendicular-axis range (high end)
  };

  const groups = new Map<string, Entry[]>();

  for (const edge of edges) {
    const source = nodeById.get(edge.source);
    const target = nodeById.get(edge.target);
    if (!source || !target) continue;
    const { w: sw, h: sh } = dim(source.id);
    const { w: tw, h: th } = dim(target.id);

    let gapLow = 0;
    let gapHigh = 0;
    let sourceCenter = 0;
    let extentLow = 0;
    let extentHigh = 0;

    if (isVertical) {
      const sTop = source.position.y;
      const sBot = source.position.y + sh;
      const tTop = target.position.y;
      const tBot = target.position.y + th;
      gapLow = Math.min(sTop, tBot, sBot, tTop);
      gapHigh = Math.max(sTop, tBot, sBot, tTop);
      const a = Math.max(Math.min(sTop, sBot), Math.min(tTop, tBot));
      const b = Math.min(Math.max(sTop, sBot), Math.max(tTop, tBot));
      if (a < b) {
        gapLow = a;
        gapHigh = b;
      }
      sourceCenter = source.position.x + sw / 2;
      // Rail is horizontal: its X-extent spans the source-X to target-X.
      const tCenter = target.position.x + tw / 2;
      extentLow = Math.min(sourceCenter, tCenter);
      extentHigh = Math.max(sourceCenter, tCenter);
    } else {
      const sLeft = source.position.x;
      const sRight = source.position.x + sw;
      const tLeft = target.position.x;
      const tRight = target.position.x + tw;
      const a = Math.max(Math.min(sLeft, sRight), Math.min(tLeft, tRight));
      const b = Math.min(Math.max(sLeft, sRight), Math.max(tLeft, tRight));
      gapLow = a;
      gapHigh = b;
      sourceCenter = source.position.y + sh / 2;
      // Rail is vertical: its Y-extent spans source-Y to target-Y.
      const tCenter = target.position.y + th / 2;
      extentLow = Math.min(sourceCenter, tCenter);
      extentHigh = Math.max(sourceCenter, tCenter);
    }

    const key = `${Math.round(gapLow / 16) * 16}>${Math.round(gapHigh / 16) * 16}`;
    const list = groups.get(key) ?? [];
    list.push({ id: edge.id, sourceCenter, gapLow, gapHigh, extentLow, extentHigh });
    groups.set(key, list);
  }

  for (const list of groups.values()) {
    list.sort((a, b) => a.sourceCenter - b.sourceCenter);
    const n = list.length;

    if (n === 1) {
      const ref = list[0];
      const center = (ref.gapLow + ref.gapHigh) / 2;
      out.set(ref.id, isVertical ? { centerY: center } : { centerX: center });
      continue;
    }

    // Greedy lane packing: each lane holds a list of [extentLow, extentHigh]
    // ranges. An edge joins the first lane that doesn't conflict (with a
    // small visual padding on each side); otherwise a new lane is created.
    const lanes: { ranges: [number, number][]; entryIds: string[] }[] = [];

    for (const entry of list) {
      let placed = false;
      for (const lane of lanes) {
        const conflict = lane.ranges.some(
          ([lo, hi]) =>
            !(entry.extentHigh < lo - RAIL_OVERLAP_PAD ||
              entry.extentLow > hi + RAIL_OVERLAP_PAD),
        );
        if (!conflict) {
          lane.ranges.push([entry.extentLow, entry.extentHigh]);
          lane.entryIds.push(entry.id);
          placed = true;
          break;
        }
      }
      if (!placed) {
        lanes.push({ ranges: [[entry.extentLow, entry.extentHigh]], entryIds: [entry.id] });
      }
    }

    const laneCount = lanes.length;
    const ref = list[0];
    const bandLow = ref.gapLow + STUB;
    const bandHigh = ref.gapHigh - STUB;
    const usable = Math.max(0, bandHigh - bandLow);
    const center = (ref.gapLow + ref.gapHigh) / 2;

    if (laneCount === 1) {
      // Every edge fits on the centre rail — bends align at one Y.
      const trackY = center;
      for (const id of lanes[0].entryIds) {
        out.set(id, isVertical ? { centerY: trackY } : { centerX: trackY });
      }
      continue;
    }

    let stride = LANE_STRIDE;
    const desiredSpread = (laneCount - 1) * stride;
    if (desiredSpread > usable && usable > 0) {
      stride = Math.max(MIN_INTERLANE, usable / (laneCount - 1));
    }
    const half = (laneCount - 1) / 2;

    lanes.forEach((lane, i) => {
      const trackY = center + (i - half) * stride;
      for (const id of lane.entryIds) {
        out.set(id, isVertical ? { centerY: trackY } : { centerX: trackY });
      }
    });
  }

  return out;
}
