import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { Position } from 'reactflow';
import type { LayoutOrientation } from './layout';

/**
 * Maps the active layout orientation to the side every node uses for its
 * input/output terminals. Nodes consume this via `useOrientation` so handle
 * positions follow the canvas-wide flow direction.
 *
 *   BT (bottom-up):    inputs on bottom, outputs on top
 *   TB (top-down):     inputs on top, outputs on bottom
 *   LR (left-to-right): inputs on left, outputs on right
 *   RL (right-to-left): inputs on right, outputs on left
 */
export interface OrientationSides {
  /** Side of the node where the source (output) handle sits. */
  source: Position;
  /** Side of the node where the target (input) handle sits. */
  target: Position;
  /** Stable handle id corresponding to `source`. */
  sourceId: string;
  /** Stable handle id corresponding to `target`. */
  targetId: string;
  /** The active orientation (for downstream consumers). */
  orientation: LayoutOrientation;
}

export const SIDE_FOR_ORIENTATION: Record<LayoutOrientation, { source: Position; target: Position; sourceId: string; targetId: string }> = {
  BT: { source: Position.Top,    target: Position.Bottom, sourceId: 's-top',    targetId: 't-bottom' },
  TB: { source: Position.Bottom, target: Position.Top,    sourceId: 's-bottom', targetId: 't-top'    },
  LR: { source: Position.Right,  target: Position.Left,   sourceId: 's-right',  targetId: 't-left'   },
  RL: { source: Position.Left,   target: Position.Right,  sourceId: 's-left',   targetId: 't-right'  },
};

const OrientationContext = createContext<OrientationSides>({
  ...SIDE_FOR_ORIENTATION.BT,
  orientation: 'BT',
});

export function OrientationProvider({
  orientation,
  children,
}: {
  orientation: LayoutOrientation;
  children: ReactNode;
}) {
  // Memoize the value object so it has stable reference identity across
  // unrelated parent re-renders. Without this every node consumer ticks on
  // every drag frame because the provider hands them a fresh object.
  const value = useMemo(
    () => ({ ...SIDE_FOR_ORIENTATION[orientation], orientation }),
    [orientation],
  );
  return (
    <OrientationContext.Provider value={value}>
      {children}
    </OrientationContext.Provider>
  );
}

export function useOrientation(): OrientationSides {
  return useContext(OrientationContext);
}
