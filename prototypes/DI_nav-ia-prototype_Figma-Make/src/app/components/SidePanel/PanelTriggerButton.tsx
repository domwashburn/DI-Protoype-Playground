import { useSidePanel } from './SidePanelContext';
import styles from './PanelTriggerButton.module.css';

interface PanelTriggerButtonProps {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function PanelTriggerButton({
  label,
  icon,
  className = '',
  ariaLabel = 'Toggle side panel',
}: PanelTriggerButtonProps) {
  const { togglePanel, isPanelOpen } = useSidePanel();

  return (
    <button
      className={`${styles.triggerButton} ${className}`}
      onClick={togglePanel}
      aria-label={ariaLabel}
      aria-expanded={isPanelOpen}
      type="button"
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {label && <span className={styles.label}>{label}</span>}
    </button>
  );
}
