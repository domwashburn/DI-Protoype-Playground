import { motion, AnimatePresence } from 'motion/react';
import styles from './TimelineItemDetail.module.css';
import type { TimelineEvent } from './types';

export interface TimelineItemDetailProps {
  event: TimelineEvent;
  isExpanded: boolean;
}

export default function TimelineItemDetail({ event, isExpanded }: TimelineItemDetailProps) {
  if (!isExpanded) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.detailPanel}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Event Details */}
        {event.details && (
          <div className={styles.detailSection}>
            <h4 className={styles.detailSectionTitle}>Details</h4>
            <div className={styles.detailGrid}>
              {Object.entries(event.details).map(([key, value]) => (
                <div key={key} className={styles.detailField}>
                  <div className={styles.detailLabel}>{formatLabel(key)}</div>
                  <div className={styles.detailValue}>{formatValue(value)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Changes */}
        {event.changes && event.changes.length > 0 && (
          <div className={styles.detailSection}>
            <h4 className={styles.detailSectionTitle}>Changes</h4>
            <div className={styles.changesList}>
              {event.changes.map((change, index) => (
                <div
                  key={index}
                  className={`${styles.changeItem} ${styles[change.changeType]}`}
                >
                  <div className={styles.changeField}>
                    <strong>{change.field}</strong>
                  </div>
                  <div className={styles.changeValues}>
                    {change.oldValue !== undefined && (
                      <div className={styles.changeOldValue}>
                        - {formatValue(change.oldValue)}
                      </div>
                    )}
                    {change.newValue !== undefined && (
                      <div className={styles.changeNewValue}>
                        + {formatValue(change.newValue)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Metadata */}
        {event.metadata && Object.keys(event.metadata).length > 0 && (
          <div className={styles.detailSection}>
            <h4 className={styles.detailSectionTitle}>Metadata</h4>
            <div className={styles.detailGrid}>
              {Object.entries(event.metadata).map(([key, value]) => (
                <div key={key} className={styles.detailField}>
                  <div className={styles.detailLabel}>{formatLabel(key)}</div>
                  <div className={styles.detailValue}>{formatValue(value)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {event.actions && event.actions.length > 0 && (
          <div className={styles.detailActions}>
            {event.actions.map((action, index) => (
              <button
                key={index}
                className={`${styles.detailButton} ${action.primary ? styles.primary : ''}`}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// Helper functions
function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function formatValue(value: any): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  return String(value);
}
