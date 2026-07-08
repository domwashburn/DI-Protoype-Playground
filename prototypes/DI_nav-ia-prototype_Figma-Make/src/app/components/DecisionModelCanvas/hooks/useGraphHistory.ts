import { useCallback, useRef, useState } from 'react';
import type { Edge, Node } from 'reactflow';

export interface GraphSnapshot<TData = unknown> {
  nodes: Node<TData>[];
  edges: Edge[];
}

const HISTORY_LIMIT = 50;

export interface GraphHistoryApi<TData = unknown> {
  push: (snapshot: GraphSnapshot<TData>) => void;
  undo: () => GraphSnapshot<TData> | null;
  redo: () => GraphSnapshot<TData> | null;
  canUndo: boolean;
  canRedo: boolean;
}

/**
 * Tiny undo/redo stack for graph mutations. The caller is responsible for
 * pushing snapshots BEFORE mutating, and applying the result of undo/redo by
 * setting node/edge state to the returned snapshot.
 */
export function useGraphHistory<TData = unknown>(): GraphHistoryApi<TData> {
  const pastRef = useRef<GraphSnapshot<TData>[]>([]);
  const futureRef = useRef<GraphSnapshot<TData>[]>([]);
  const [, force] = useState(0);
  const rerender = useCallback(() => force((n) => n + 1), []);

  const push = useCallback(
    (snapshot: GraphSnapshot<TData>) => {
      pastRef.current.push(snapshot);
      if (pastRef.current.length > HISTORY_LIMIT) pastRef.current.shift();
      futureRef.current = [];
      rerender();
    },
    [rerender],
  );

  const undo = useCallback((): GraphSnapshot<TData> | null => {
    const snapshot = pastRef.current.pop();
    if (!snapshot) return null;
    futureRef.current.push(snapshot);
    rerender();
    return snapshot;
  }, [rerender]);

  const redo = useCallback((): GraphSnapshot<TData> | null => {
    const snapshot = futureRef.current.pop();
    if (!snapshot) return null;
    pastRef.current.push(snapshot);
    rerender();
    return snapshot;
  }, [rerender]);

  return {
    push,
    undo,
    redo,
    canUndo: pastRef.current.length > 0,
    canRedo: futureRef.current.length > 0,
  };
}
