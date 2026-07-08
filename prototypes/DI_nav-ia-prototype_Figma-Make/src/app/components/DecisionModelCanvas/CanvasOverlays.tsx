import { ComponentType, ReactNode, useState } from 'react';
import { MiniMap, useStore, type Node as RFNode } from 'reactflow';
import {
  Add,
  Catalog,
  CenterToFit,
  ChatLaunch,
  EdgeNode,
  Map,
  Migrate,
  Renew,
  Reset,
  Subtract,
} from '@carbon/icons-react';
import styles from './DecisionModelCanvas.module.css';

interface ToolButtonProps {
  icon: ComponentType<{ size?: number }>;
  ariaLabel: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

function ToolButton({ icon: Icon, ariaLabel, onClick, active, className }: ToolButtonProps) {
  return (
    <button
      type="button"
      className={[styles.toolButton, className].filter(Boolean).join(' ')}
      data-active={active ? 'true' : undefined}
      aria-label={ariaLabel}
      aria-pressed={active ?? undefined}
      onClick={onClick}
    >
      <Icon size={20} />
    </button>
  );
}

/** Module-level pure function so MiniMap's `nodeColor` prop has a stable
 *  reference across renders — otherwise MiniMap re-evaluates colour for
 *  every node every drag frame. */
function miniMapNodeColor(n: RFNode): string {
  if (n.type === 'inputData') return '#c1f0d1';
  if (n.type === 'businessKnowledge') {
    const variant = (n.data as { variant?: string } | undefined)?.variant;
    if (variant === 'generative') return '#fcd09a';
    if (variant === 'prediction') return '#ffd7d9';
    return '#a7f0e0';
  }
  return '#d0e2ff';
}

interface CanvasToolbarProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFit?: () => void;
  onReset?: () => void;
  onRotate?: () => void;
  orientation?: 'TB' | 'BT' | 'LR' | 'RL';
  /** When true, ReactFlow auto-pans the viewport while dragging a node toward
   *  the edge. Off by default (can be disorienting); user opts in via toggle. */
  autoPanOnDrag?: boolean;
  onToggleAutoPan?: () => void;
}

/**
 * Top-left tools dock: outline, comments, pan. View-control tools live in
 * the bottom-right cluster (see CanvasViewControls).
 */
export function CanvasToolbar() {
  return (
    <div className={styles.toolbar} role="toolbar" aria-label="Canvas tools">
      <ToolButton icon={Catalog} ariaLabel="Outline" />
      <ToolButton icon={ChatLaunch} ariaLabel="Comments" />
      <div className={styles.toolbarDivider} />
      <ToolButton icon={Migrate} ariaLabel="Pan" />
    </div>
  );
}

/**
 * Bottom-right cluster: the minimap stacks above a compact view-control bar.
 * The map button toggles minimap visibility while the cluster continues to
 * clear the inset panel when it opens.
 */
export function CanvasViewControls({
  onZoomIn,
  onZoomOut,
  onFit,
  onReset,
  onRotate,
  orientation,
  autoPanOnDrag,
  onToggleAutoPan,
}: CanvasToolbarProps) {
  const [showMiniMap, setShowMiniMap] = useState(true);
  const zoom = useStore((store) => store.transform[2]);
  const zoomLabel = `${Math.round(zoom * 100)}%`;

  return (
    <div className={styles.bottomRightCluster}>
      {showMiniMap ? (
        <div className={styles.minimapContainer} style={{ width: '193px', height: '131px' }}>
          <MiniMap
            className={styles.minimap}
            pannable
            zoomable
            maskColor="rgba(242, 244, 248, 0.72)"
            nodeColor={miniMapNodeColor}
            nodeStrokeColor="transparent"
            nodeBorderRadius={2}
          />
        </div>
      ) : null}
      <div
        className={styles.viewControls}
        role="toolbar"
        aria-label="Canvas view controls"
        style={{ height: '38px', padding: '2px', gap: '2px' }}
      >
        <ToolButton icon={Subtract} ariaLabel="Zoom out" onClick={onZoomOut} />
        <output className={styles.zoomValue} aria-label="Current zoom">
          {zoomLabel}
        </output>
        <ToolButton icon={Add} ariaLabel="Zoom in" onClick={onZoomIn} />
        <ToolButton icon={CenterToFit} ariaLabel="Fit to view" onClick={onFit} />
        {onRotate ? (
          <ToolButton
            icon={Renew}
            ariaLabel={`Rotate layout (current: ${orientation ?? 'BT'})`}
            onClick={onRotate}
          />
        ) : null}
        <ToolButton
          icon={Map}
          ariaLabel={showMiniMap ? 'Hide mini map' : 'Show mini map'}
          onClick={() => setShowMiniMap((visible) => !visible)}
          active={showMiniMap}
          className={styles.mapToggleButton}
        />
        {onToggleAutoPan ? (
          <ToolButton
            icon={EdgeNode}
            ariaLabel={
              autoPanOnDrag
                ? 'Disable auto-pan when dragging to canvas edge'
                : 'Enable auto-pan when dragging to canvas edge'
            }
            onClick={onToggleAutoPan}
            active={autoPanOnDrag}
          />
        ) : null}
      </div>
    </div>
  );
}

interface CanvasOverlaysProps {
  children?: ReactNode;
}

/** Pass-through container for absolutely-positioned canvas overlays. */
export function CanvasOverlays({ children }: CanvasOverlaysProps) {
  return <div className={styles.overlayLayer}>{children}</div>;
}
