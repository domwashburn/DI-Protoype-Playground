import { SampleSidePanel } from '../SidePanel';

export default function ResourceFiltersPanel() {
  return (
    <SampleSidePanel title="Filters">
      <div style={{ padding: 'var(--cds-spacing-05)' }}>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--cds-font-family)',
            color: 'var(--cds-text-secondary)',
          }}
        >
          Filter panel contents — TBD
        </p>
      </div>
    </SampleSidePanel>
  );
}
