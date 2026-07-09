/**
 * KeyboardShortcutsHelp - Keyboard Shortcuts Help Modal
 * 
 * Displays all available keyboard shortcuts in a modal dialog.
 * Triggered by holding Option key for 3 seconds or manually.
 * 
 * CARBON_CONVERT: Uses CSS modules with Carbon Design System principles.
 */

import { X } from 'lucide-react';
import { KEYBOARD_SHORTCUTS } from '../../hooks/useKeyboardShortcuts';
import styles from './KeyboardShortcutsHelp.module.css';
import React from 'react';

export interface KeyboardShortcutsHelpProps {
  /** Whether modal is open */
  isOpen: boolean;
  /** Called when modal should close */
  onClose: () => void;
}

export function KeyboardShortcutsHelp({ isOpen, onClose }: KeyboardShortcutsHelpProps) {
  if (!isOpen) return null;

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close on Escape key - attach to window
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div 
      className={styles.backdrop} 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 id="shortcuts-title" className={styles.title}>Keyboard Shortcuts</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close shortcuts help"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {KEYBOARD_SHORTCUTS.map((section) => (
            <div key={section.category} className={styles.section}>
              <h3 className={styles.categoryTitle}>{section.category}</h3>
              <div className={styles.shortcutsList}>
                {section.shortcuts.map((shortcut) => (
                  <div key={shortcut.id} className={styles.shortcutRow}>
                    <div className={styles.keys}>
                      {shortcut.keys.map((key, index) => (
                        <React.Fragment key={`${shortcut.id}-${index}`}>
                          <kbd className={styles.key}>{key}</kbd>
                          {index < shortcut.keys.length - 1 && (
                            <span className={styles.plus}>+</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className={styles.description}>{shortcut.description}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.hint}>
            Tip: Hold <kbd className={styles.keySmall}>Command</kbd> for 3 seconds to show this help
          </p>
        </div>
      </div>
    </div>
  );
}