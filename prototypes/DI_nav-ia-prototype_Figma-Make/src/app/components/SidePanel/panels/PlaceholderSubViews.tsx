import { Add } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import { usePanelManager } from '../PanelManager';
import PlaceholderInnerPanel from './PlaceholderInnerPanel';

/**
 * Placeholder sub-views for expanded Panel A / B / C. Each renders a body
 * paragraph + one button that opens a nested inset panel inside the same
 * sub-view, exercising the one-level-deep nesting wiring.
 */

function makeSubView(letter: 'A' | 'B' | 'C') {
  function SubViewBody() {
    const { openSubPanel, isSubPanelOpen } = usePanelManager();
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--cds-spacing-05)',
          maxWidth: 640,
        }}
      >
        <p style={{ margin: 0 }}>
          Expanded sub-view for Panel {letter}. This area is the section's
          nested content surface — it can host its own header, actions, and a
          single inset panel pushed in from the right.
        </p>
        <div>
          <Button
            kind="primary"
            size="sm"
            renderIcon={Add}
            disabled={isSubPanelOpen}
            onClick={() =>
              openSubPanel({
                id: `placeholder-sub-${letter.toLowerCase()}`,
                content: <PlaceholderInnerPanel />,
                width: 'standard',
              })
            }
          >
            {isSubPanelOpen ? 'Inner panel open' : 'Open inner panel'}
          </Button>
        </div>
      </div>
    );
  }
  return SubViewBody;
}

export const PlaceholderSubViewA = makeSubView('A');
export const PlaceholderSubViewB = makeSubView('B');
export const PlaceholderSubViewC = makeSubView('C');
