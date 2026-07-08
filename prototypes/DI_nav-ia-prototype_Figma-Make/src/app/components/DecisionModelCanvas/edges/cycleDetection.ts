/**
 * Cycle detection for the decision-model graph.
 *
 * Decision-model edges are dependency arrows; they must form a DAG. Any edge
 * (u → v) where a path v → ... → u already exists creates a circular
 * reference and is therefore invalid.
 */

interface MiniEdge {
  id: string;
  source: string;
  target: string;
}

function buildAdjacency(edges: MiniEdge[]): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  for (const e of edges) {
    const list = adj.get(e.source);
    if (list) list.push(e.target);
    else adj.set(e.source, [e.target]);
  }
  return adj;
}

/** Return true if a directed path from `from` to `to` exists. */
export function hasPath(
  edges: MiniEdge[],
  from: string,
  to: string,
): boolean {
  if (from === to) return true;
  const adj = buildAdjacency(edges);
  const visited = new Set<string>();
  const stack: string[] = [from];
  while (stack.length > 0) {
    const node = stack.pop()!;
    if (node === to) return true;
    if (visited.has(node)) continue;
    visited.add(node);
    const next = adj.get(node);
    if (next) stack.push(...next);
  }
  return false;
}

/** Return the set of edge ids that participate in at least one directed
 *  cycle. An edge (u → v) is in a cycle iff a path v → … → u also exists. */
export function findCycleEdgeIds(edges: MiniEdge[]): Set<string> {
  const out = new Set<string>();
  for (const e of edges) {
    if (hasPath(edges, e.target, e.source)) out.add(e.id);
  }
  return out;
}
