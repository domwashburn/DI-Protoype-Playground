/**
 * SettingsPanel
 *
 * Phase 6B : close button + footer buttons replaced with @carbon/react Button.
 * Phase 7  : all hand-rolled form elements replaced with @carbon/react form
 *            components (TextInput, TextArea, NumberInput, Select + SelectItem,
 *            Checkbox). Converted to a fully controlled form via useState.
 */
import { useState } from 'react';
import { Close } from '@carbon/icons-react';
import {
  Button,
  Checkbox,
  Form,
  NumberInput,
  Select,
  SelectItem,
  TextArea,
  TextInput,
} from '@carbon/react';
import { usePanelManager } from '../PanelManager';
import styles from './SettingsPanel.module.css';

interface SettingsPanelProps {
  title?: string;
}

export default function SettingsPanel({
  title = 'Settings',
}: SettingsPanelProps) {
  const { closePanel } = usePanelManager();

  // ── General ──────────────────────────────────────────────────────────────
  const [displayName, setDisplayName] = useState('Credit Risk Assessment');
  const [description, setDescription] = useState(
    'Automated credit risk assessment for loan applications'
  );
  const [autoDeployment, setAutoDeployment] = useState(true);
  const [sendNotifications, setSendNotifications] = useState(false);

  // ── Performance ──────────────────────────────────────────────────────────
  const [cacheDuration, setCacheDuration] = useState(30);
  const [rateLimit, setRateLimit] = useState(1000);

  // ── Security ─────────────────────────────────────────────────────────────
  const [apiKeyRotation, setApiKeyRotation] = useState('30');
  const [requireAuth, setRequireAuth] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);

  return (
    <div className={styles.panel}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Button
          kind="ghost"
          size="sm"
          hasIconOnly
          renderIcon={Close}
          iconDescription="Close panel"
          onClick={closePanel}
        />
      </div>

      {/* ── Scrollable content ──────────────────────────────────────────── */}
      <div className={styles.content}>
        <Form>
          {/* ── General ─────────────────────────────────────────────────── */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>General</h3>

            <div className={styles.field}>
              <TextInput
                id="settings-display-name"
                labelText="Display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter display name"
              />
            </div>

            <div className={styles.field}>
              <TextArea
                id="settings-description"
                labelText="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                rows={3}
              />
            </div>

            <div className={styles.field}>
              <Checkbox
                id="settings-auto-deployment"
                labelText="Enable automatic deployment"
                checked={autoDeployment}
                onChange={(_e, { checked }) => setAutoDeployment(checked)}
              />
            </div>

            <div className={styles.field}>
              <Checkbox
                id="settings-send-notifications"
                labelText="Send notifications on errors"
                checked={sendNotifications}
                onChange={(_e, { checked }) => setSendNotifications(checked)}
              />
            </div>
          </section>

          {/* ── Performance ──────────────────────────────────────────────── */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Performance</h3>

            <div className={styles.field}>
              {/*
               * NumberInput uses `label` (not `labelText`) — known Carbon API
               * inconsistency vs other form components.
               */}
              <NumberInput
                id="settings-cache-duration"
                label="Cache duration (minutes)"
                value={cacheDuration}
                min={0}
                max={1440}
                onChange={(_e, { value }) =>
                  setCacheDuration(Number(value))
                }
              />
            </div>

            <div className={styles.field}>
              <NumberInput
                id="settings-rate-limit"
                label="Rate limit (requests/min)"
                value={rateLimit}
                min={0}
                onChange={(_e, { value }) => setRateLimit(Number(value))}
              />
            </div>
          </section>

          {/* ── Security ─────────────────────────────────────────────────── */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Security</h3>

            <div className={styles.field}>
              <Select
                id="settings-api-key-rotation"
                labelText="API key rotation"
                value={apiKeyRotation}
                onChange={(e) => setApiKeyRotation(e.target.value)}
              >
                <SelectItem value="30" text="Every 30 days" />
                <SelectItem value="60" text="Every 60 days" />
                <SelectItem value="90" text="Every 90 days" />
                <SelectItem value="never" text="Never" />
              </Select>
            </div>

            <div className={styles.field}>
              <Checkbox
                id="settings-require-auth"
                labelText="Require authentication"
                checked={requireAuth}
                onChange={(_e, { checked }) => setRequireAuth(checked)}
              />
            </div>

            <div className={styles.field}>
              <Checkbox
                id="settings-audit-logging"
                labelText="Enable audit logging"
                checked={auditLogging}
                onChange={(_e, { checked }) => setAuditLogging(checked)}
              />
            </div>
          </section>
        </Form>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <div className={styles.footer}>
        <Button kind="ghost" size="md">
          Reset
        </Button>
        <Button kind="primary" size="md">
          Save changes
        </Button>
      </div>
    </div>
  );
}
