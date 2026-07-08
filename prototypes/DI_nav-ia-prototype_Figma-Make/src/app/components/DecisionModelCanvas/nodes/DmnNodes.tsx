import { Handle, useStore, type NodeProps, type ReactFlowState } from 'reactflow';
import styles from './nodes.module.css';
import { useOrientation } from '../OrientationContext';

export type DmnNodeKind =
  | 'inputData'
  | 'decision'
  | 'businessKnowledge';

export interface DmnNodeData {
  name: string;
  type: string;
  /** Decision-only: render the output highlight (top accent border).
   *  Output decisions are sinks — they receive but never emit. */
  output?: boolean;
  /** BusinessKnowledge-only: visual variant for generative/prediction nodes. */
  variant?: 'default' | 'generative' | 'prediction';
  /** Optional warning marker (e.g. "node is part of a cycle"). */
  warning?: string;
}

/**
 * Connection terminals follow the canvas orientation:
 *
 *   BT  →  input bottom, output top
 *   TB  →  input top,    output bottom
 *   LR  →  input left,   output right
 *   RL  →  input right,  output left
 *
 * Per-kind rules:
 *   InputData       — output-only (no input terminal).
 *   Decision (out)  — input-only  (no output terminal).
 *   Decision        — both.
 *   BusinessKnowledge — both.
 *
 * Visibility:
 *   - Hidden by default.
 *   - Revealed on hover or selection.
 *   - Clustered (hidden) at low zoom for legibility.
 */

const ZOOM_CLUSTER_THRESHOLD = 0.7;

const selectZoom = (state: ReactFlowState) => state.transform[2];

interface NodeShellProps {
  className: string;
  data: DmnNodeData;
  selected: boolean;
  hasSource: boolean;
  hasTarget: boolean;
}

function NodeShell({ className, data, selected, hasSource, hasTarget }: NodeShellProps) {
  const zoom = useStore(selectZoom);
  const cluster = zoom < ZOOM_CLUSTER_THRESHOLD;
  const { source, target, sourceId, targetId } = useOrientation();

  return (
    <div
      className={`${styles.node} ${className}`}
      data-selected={selected ? 'true' : 'false'}
      data-zoom-cluster={cluster ? 'true' : 'false'}
      title={data.warning ?? undefined}
    >
      {hasTarget && (
        <Handle
          id={targetId}
          type="target"
          position={target}
          className={`${styles.handle} ${styles.terminal}`}
          isConnectable
        />
      )}
      <p className={styles.name}>{data.name}</p>
      <p className={styles.type}>{data.type}</p>
      {hasSource && (
        <Handle
          id={sourceId}
          type="source"
          position={source}
          className={`${styles.handle} ${styles.terminal}`}
          isConnectable
        />
      )}
      {data.warning && <span className={styles.warning} aria-hidden="true">!</span>}
    </div>
  );
}

export function InputDataNode({ data, selected }: NodeProps<DmnNodeData>) {
  return (
    <NodeShell
      className={styles.inputData}
      data={data}
      selected={!!selected}
      hasSource
      hasTarget={false}
    />
  );
}

export function DecisionNode({ data, selected }: NodeProps<DmnNodeData>) {
  const cls = `${styles.decision} ${data.output ? styles.decisionOutput : ''}`;
  return (
    <NodeShell
      className={cls}
      data={data}
      selected={!!selected}
      hasSource={!data.output}
      hasTarget
    />
  );
}

export function BusinessKnowledgeNode({ data, selected }: NodeProps<DmnNodeData>) {
  const variantCls =
    data.variant === 'generative'
      ? styles.generative
      : data.variant === 'prediction'
        ? styles.prediction
        : '';
  return (
    <NodeShell
      className={`${styles.businessKnowledge} ${variantCls}`}
      data={data}
      selected={!!selected}
      hasSource
      hasTarget
    />
  );
}

export const dmnNodeTypes = {
  inputData: InputDataNode,
  decision: DecisionNode,
  businessKnowledge: BusinessKnowledgeNode,
};
