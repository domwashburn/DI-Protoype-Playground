/**
 * useKeyboardShortcuts - Formula Editor Keyboard Shortcuts
 * 
 * Provides keyboard shortcuts for common formula editor actions.
 * Follows standard text editor conventions.
 * 
 * @example
 * const { handleKeyDown } = useKeyboardShortcuts({
 *   onSelectAll: () => selectAllText(),
 *   onSave: () => saveFormula(),
 * });
 */

import { useCallback } from 'react';

export interface KeyboardShortcutsOptions {
  /** Called when Cmd/Ctrl+A is pressed */
  onSelectAll?: () => void;
  /** Called when Cmd/Ctrl+S is pressed */
  onSave?: () => void;
  /** Called when Cmd/Ctrl+Z is pressed */
  onUndo?: () => void;
  /** Called when Cmd/Ctrl+Shift+Z or Cmd/Ctrl+Y is pressed */
  onRedo?: () => void;
  /** Called when Cmd/Ctrl+D is pressed */
  onDuplicate?: () => void;
  /** Called when Escape is pressed */
  onEscape?: () => void;
  /** Called when Cmd/Ctrl+/ is pressed */
  onComment?: () => void;
}

/**
 * Keyboard shortcuts hook for formula editor
 */
export function useKeyboardShortcuts(options: KeyboardShortcutsOptions = {}) {
  const {
    onSelectAll,
    onSave,
    onUndo,
    onRedo,
    onDuplicate,
    onEscape,
    onComment,
  } = options;

  /**
   * Check if modifier key is pressed (Cmd on Mac, Ctrl on others)
   */
  const isModifier = useCallback((e: KeyboardEvent | React.KeyboardEvent): boolean => {
    return e.metaKey || e.ctrlKey;
  }, []);

  /**
   * Handle keyboard shortcuts
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key.toLowerCase();
    const mod = isModifier(e);

    // Cmd/Ctrl+A - Select All
    if (mod && key === 'a' && onSelectAll) {
      e.preventDefault();
      onSelectAll();
      return true;
    }

    // Cmd/Ctrl+S - Save
    if (mod && key === 's' && onSave) {
      e.preventDefault();
      onSave();
      return true;
    }

    // Cmd/Ctrl+Z - Undo
    if (mod && key === 'z' && !e.shiftKey && onUndo) {
      e.preventDefault();
      onUndo();
      return true;
    }

    // Cmd/Ctrl+Shift+Z or Cmd/Ctrl+Y - Redo
    if ((mod && key === 'z' && e.shiftKey) || (mod && key === 'y')) {
      if (onRedo) {
        e.preventDefault();
        onRedo();
        return true;
      }
    }

    // Cmd/Ctrl+D - Duplicate line
    if (mod && key === 'd' && onDuplicate) {
      e.preventDefault();
      onDuplicate();
      return true;
    }

    // Escape - Close/blur
    if (key === 'escape' && onEscape) {
      e.preventDefault();
      onEscape();
      return true;
    }

    // Cmd/Ctrl+/ - Toggle comment
    if (mod && key === '/' && onComment) {
      e.preventDefault();
      onComment();
      return true;
    }

    return false;
  }, [isModifier, onSelectAll, onSave, onUndo, onRedo, onDuplicate, onEscape, onComment]);

  return {
    handleKeyDown,
    isModifier,
  };
}

/**
 * Get keyboard shortcut display text for the current platform
 */
export function getShortcutText(shortcut: string): string {
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const mod = isMac ? '⌘' : 'Ctrl';
  
  return shortcut
    .replace(/Cmd/g, mod)
    .replace(/Ctrl/g, mod)
    .replace(/Shift/g, '⇧')
    .replace(/Alt/g, isMac ? '⌥' : 'Alt')
    .replace(/Enter/g, '↵')
    .replace(/Escape/g, 'Esc');
}
