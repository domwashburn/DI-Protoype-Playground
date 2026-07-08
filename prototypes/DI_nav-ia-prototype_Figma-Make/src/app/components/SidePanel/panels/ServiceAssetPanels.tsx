import { ComponentType, ReactNode } from 'react';
import {
  Add,
  ChevronDown,
  ChevronUp,
  Close,
  Document,
  Edit,
  FlowConnection,
  Information,
  Time,
  TrashCan,
  WarningAlt,
} from '@carbon/icons-react';
import { Button, TextArea } from '@carbon/react';
import { usePanelManager } from '../PanelManager';
import styles from './ServiceAssetPanels.module.css';

export interface AssetPanelShellProps {
  title: string;
  subtitle: string;
  headerAction?: ReactNode;
  children?: ReactNode;
}

export function AssetPanelShell({ title, subtitle, headerAction, children }: AssetPanelShellProps) {
  const { closePanel } = usePanelManager();
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.headerActions}>
            {headerAction}
            <Button
              kind="ghost"
              size="sm"
              hasIconOnly
              renderIcon={Close}
              iconDescription="Close panel"
              onClick={() => closePanel()}
            />
          </div>
        </div>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export const ModelDetailsIcon: ComponentType = Information;
export const DependenciesIcon: ComponentType = FlowConnection;
export const ErrorReportIcon: ComponentType = WarningAlt;
export const ActivityHistoryIcon: ComponentType = Time;

/* ------------------------------------------------------------------------ */
/* Panel A — Model details                                                  */
/* ------------------------------------------------------------------------ */

const MODEL_DESCRIPTION_PLACEHOLDER =
  'Analyzes a customer email to extract data about requested products and calculate their total price.';

export function ModelDetailsPanel() {
  return (
    <AssetPanelShell title="Model details" subtitle="Decision model">
      <div className={styles.formField}>
        <label className={styles.fieldLabel} htmlFor="asset-model-description">
          Description (optional)
        </label>
        <TextArea
          id="asset-model-description"
          labelText=""
          hideLabel
          rows={5}
          defaultValue={MODEL_DESCRIPTION_PLACEHOLDER}
          aria-label="Model description"
        />
      </div>
    </AssetPanelShell>
  );
}

/* ------------------------------------------------------------------------ */
/* Panel B1 — Dependencies                                                  */
/* ------------------------------------------------------------------------ */

interface DependencyRow {
  id: string;
  name: string;
  description: string;
  groupId: string;
  artifactId: string;
  version: string;
}

const DEPENDENCIES: DependencyRow[] = [
  {
    id: 'dep-pricing-data',
    name: 'Pricing Data',
    description: '',
    groupId: '_643005n12z.samples.assisted_pricing',
    artifactId: 'pricingData',
    version: 'current',
  },
  {
    id: 'dep-part-number',
    name: 'Part number',
    description: 'Determines the part number of a product.',
    groupId: '_643005n12z.samples.assisted_pricing',
    artifactId: 'partNumber',
    version: 'current',
  },
  {
    id: 'dep-unit-price',
    name: 'Unit price',
    description: 'Determines the unit price of a product.',
    groupId: '_643005n12z.samples.assisted_pricing',
    artifactId: 'unitPrice',
    version: 'current',
  },
  {
    id: 'dep-email-analysis',
    name: 'Email analysis',
    description: 'Analyzes a customer email and extract data ...',
    groupId: '_643005n12z.samples.assisted_pricing',
    artifactId: 'emailAnalysis',
    version: 'current',
  },
];

export function DependenciesPanel() {
  return (
    <AssetPanelShell
      title="Manage dependencies"
      subtitle="Assets and resources this model depends on."
      headerAction={
        <Button kind="primary" size="sm" renderIcon={Add} iconDescription="Add dependency">
          Add
        </Button>
      }
    >
      <div className={styles.depTable} role="table" aria-label="Dependencies">
        <div className={`${styles.depHeader} ${styles.depRowGrid}`} role="row">
          <span role="columnheader">Name</span>
          <span role="columnheader">Group ID</span>
          <span role="columnheader">Artifact ID</span>
          <span role="columnheader">Version</span>
          <span role="columnheader" aria-label="Actions" />
        </div>
        {DEPENDENCIES.map((dep) => (
          <div key={dep.id} className={`${styles.depRow} ${styles.depRowGrid}`} role="row">
            <div className={styles.depNameCell} role="cell">
              <Document size={16} className={styles.depRowIcon} aria-hidden="true" />
              <div className={styles.depNameStack}>
                <a href="#" className={styles.linkText} onClick={(e) => e.preventDefault()}>
                  {dep.name}
                </a>
                {dep.description && (
                  <span className={styles.cellSecondary}>{dep.description}</span>
                )}
              </div>
            </div>
            <span className={styles.cellPrimary} role="cell">{dep.groupId}</span>
            <span className={styles.cellPrimary} role="cell">{dep.artifactId}</span>
            <span className={styles.cellPrimary} role="cell">{dep.version}</span>
            <div className={styles.depActions} role="cell">
              <Button
                kind="ghost"
                size="sm"
                hasIconOnly
                renderIcon={ChevronUp}
                iconDescription="Move up"
              />
              <Button
                kind="ghost"
                size="sm"
                hasIconOnly
                renderIcon={ChevronDown}
                iconDescription="Move down"
              />
              <Button
                kind="ghost"
                size="sm"
                hasIconOnly
                renderIcon={TrashCan}
                iconDescription="Remove dependency"
              />
            </div>
          </div>
        ))}
      </div>
    </AssetPanelShell>
  );
}

/* ------------------------------------------------------------------------ */
/* Panel B2 — Error report                                                  */
/* ------------------------------------------------------------------------ */

interface ErrorRow {
  id: string;
  name: string;
  line: number;
  severity: 'error' | 'warning';
  message: string;
}

const ERRORS: ErrorRow[] = [
  {
    id: 'err-1',
    name: 'New business rule',
    line: 1,
    severity: 'error',
    message: 'The rule is incomplete, fill all the placeholders.',
  },
  {
    id: 'err-2',
    name: 'New business rule (2)',
    line: 1,
    severity: 'error',
    message: 'The rule is incomplete, fill all the placeholders.',
  },
];

export function ErrorReportPanel() {
  return (
    <AssetPanelShell
      title="Error report"
      subtitle="Errors and warnings found in the model."
    >
      <div className={styles.errTable} role="table" aria-label="Error report">
        <div className={`${styles.errHeader} ${styles.errRowGrid}`} role="row">
          <span role="columnheader">Name</span>
          <span role="columnheader">Line</span>
          <span role="columnheader">Severity</span>
          <span role="columnheader">Message</span>
        </div>
        {ERRORS.map((err) => (
          <div key={err.id} className={`${styles.errRow} ${styles.errRowGrid}`} role="row">
            <a
              href="#"
              className={styles.linkText}
              role="cell"
              onClick={(e) => e.preventDefault()}
            >
              {err.name}
            </a>
            <span className={styles.cellPrimary} role="cell">{err.line}</span>
            <span className={styles.severityCell} role="cell">
              <span
                className={styles.severityDot}
                aria-label={err.severity === 'error' ? 'Error' : 'Warning'}
              />
            </span>
            <span className={styles.cellPrimary} role="cell">{err.message}</span>
          </div>
        ))}
      </div>
    </AssetPanelShell>
  );
}

/* ------------------------------------------------------------------------ */
/* Panel B3 — Activity / History                                            */
/* ------------------------------------------------------------------------ */

interface ActivityEntry {
  id: string;
  icon: ComponentType<{ size?: number }>;
  title: string;
  timestamp: string;
  detail: string;
}

const ACTIVITY: ActivityEntry[] = [
  {
    id: 'act-1',
    icon: Edit,
    title: 'Updated by Anabel Lopez',
    timestamp: '6/16/2026, 4:37:42 PM',
    detail: 'Edited "price products" rule',
  },
  {
    id: 'act-2',
    icon: FlowConnection,
    title: 'Deployed by Build Bot',
    timestamp: '6/15/2026, 9:12:08 AM',
    detail: 'Deployed v3 to staging',
  },
  {
    id: 'act-3',
    icon: Add,
    title: 'Created by Anabel Lopez',
    timestamp: '6/12/2026, 1:24:55 PM',
    detail: 'Initial version',
  },
];

export function ActivityHistoryPanel() {
  return (
    <AssetPanelShell
      title="Activity / History"
      subtitle="Recent changes, deployments, and events for this model."
    >
      <ol className={styles.timelineList}>
        {ACTIVITY.map((entry) => {
          const Icon = entry.icon;
          return (
            <li key={entry.id} className={styles.timelineItem}>
              <span className={styles.timelineDot} aria-hidden="true">
                <Icon size={16} />
              </span>
              <div className={styles.timelineBody}>
                <p className={styles.timelineTitle}>{entry.title}</p>
                <p className={styles.timelineMeta}>{entry.timestamp}</p>
                <p className={styles.timelineDetail}>{entry.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </AssetPanelShell>
  );
}
