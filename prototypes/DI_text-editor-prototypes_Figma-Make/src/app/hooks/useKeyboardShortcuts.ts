/**
 * useKeyboardShortcuts - Global Keyboard Shortcuts Hook
 * 
 * Provides application-wide keyboard shortcuts with:
 * - Navigation between examples
 * - Panel tab cycling
 * - Debug mode controls
 * - Test execution
 * - Help modal display
 * 
 * Keyboard shortcuts:
 * - Cmd+Shift+Right: Next example
 * - Cmd+Shift+Left: Previous example
 * - Cmd+Option+Shift+Right: Last example
 * - Cmd+Option+Shift+Left: First example
 * - Cmd+Ctrl+Shift+Right: Last example in current section
 * - Cmd+Ctrl+Shift+Left: First example in current section
 * - Cmd+Shift+Down: Cycle tabs right (in right panel)
 * - Cmd+Shift+Up: Cycle tabs left (in right panel)
 * - Ctrl+D: Toggle debug mode
 * - Ctrl+R: Run test
 * - Cmd+Ctrl+R: Run test in debug mode
 * - Ctrl+C: Clear debug output
 * - Hold Command for 3s: Show keyboard shortcuts help modal
 */

import { useEffect, useRef, useCallback } from 'react';

export interface KeyboardShortcutsConfig {
  /** Called when next example shortcut triggered */
  onNextExample?: () => void;
  /** Called when previous example shortcut triggered */
  onPreviousExample?: () => void;
  /** Called when first example shortcut triggered */
  onFirstExample?: () => void;
  /** Called when last example shortcut triggered */
  onLastExample?: () => void;
  /** Called when first example in section shortcut triggered */
  onFirstInSection?: () => void;
  /** Called when last example in section shortcut triggered */
  onLastInSection?: () => void;
  /** Called when cycle tabs right shortcut triggered */
  onCycleTabsRight?: () => void;
  /** Called when cycle tabs left shortcut triggered */
  onCycleTabsLeft?: () => void;
  /** Called when switching editor tab by number (1-4) */
  onSwitchEditorTab?: (tabIndex: number) => void;
  /** Called when switching panel tab by number (1-3) */
  onSwitchPanelTab?: (tabIndex: number) => void;
  /** Called when toggle debug mode shortcut triggered */
  onToggleDebugMode?: () => void;
  /** Called when run test shortcut triggered */
  onRunTest?: () => void;
  /** Called when run test in debug mode shortcut triggered */
  onRunTestDebug?: () => void;
  /** Called when clear debug output shortcut triggered */
  onClearDebugOutput?: () => void;
  /** Called when debug step forward shortcut triggered */
  onDebugStepForward?: () => void;
  /** Called when debug step backward shortcut triggered */
  onDebugStepBackward?: () => void;
  /** Called when help modal should be shown */
  onShowHelp?: () => void;
  /** Whether shortcuts are enabled */
  enabled?: boolean;
}

/**
 * Check if event matches keyboard shortcut
 * IMPORTANT: This function now requires EXACT modifier matches.
 * If a modifier is not specified, it must NOT be pressed.
 */
function matchesShortcut(
  event: KeyboardEvent,
  key: string,
  modifiers: { ctrl?: boolean; alt?: boolean; shift?: boolean; meta?: boolean } = {}
): boolean {
  const keyMatches = event.key.toLowerCase() === key.toLowerCase();
  
  // EXACT matching: if modifier not specified, it must be false
  const ctrlMatches = (modifiers.ctrl ?? false) === event.ctrlKey;
  const altMatches = (modifiers.alt ?? false) === event.altKey;
  const shiftMatches = (modifiers.shift ?? false) === event.shiftKey;
  const metaMatches = (modifiers.meta ?? false) === event.metaKey;
  
  return keyMatches && ctrlMatches && altMatches && shiftMatches && metaMatches;
}

/**
 * Global keyboard shortcuts hook
 */
export function useKeyboardShortcuts(config: KeyboardShortcutsConfig = {}) {
  const {
    onNextExample,
    onPreviousExample,
    onFirstExample,
    onLastExample,
    onFirstInSection,
    onLastInSection,
    onCycleTabsRight,
    onCycleTabsLeft,
    onSwitchEditorTab,
    onSwitchPanelTab,
    onToggleDebugMode,
    onRunTest,
    onRunTestDebug,
    onClearDebugOutput,
    onDebugStepForward,
    onDebugStepBackward,
    onShowHelp,
    enabled = true
  } = config;

  // Track Command key hold time for help modal
  const commandKeyPressTime = useRef<number | null>(null);
  const commandHelpTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    // BUG FIX: Track Command key press for help modal (3 second hold)
    // Only show modal if Command is pressed ALONE (no other keys)
    // If user presses Cmd+S, Cmd+C, etc., don't trigger help modal
    if (event.key === 'Meta' && !commandKeyPressTime.current) {
      // Check if ONLY the Meta key is pressed (no other modifiers or regular keys)
      // Note: We check that this is the ONLY key down, not part of a combo
      const isCommandAlone = !event.ctrlKey && !event.altKey && !event.shiftKey;
      
      if (isCommandAlone) {
        commandKeyPressTime.current = Date.now();
        
        // Set timer for 3 seconds
        commandHelpTimerRef.current = setTimeout(() => {
          if (commandKeyPressTime.current) {
            onShowHelp?.();
            commandKeyPressTime.current = null;
          }
        }, 3000);
      }
    } else if (event.key !== 'Meta' && commandKeyPressTime.current) {
      // BUG FIX: If user presses any other key while holding Command,
      // cancel the help modal timer (they're doing a shortcut combo)
      commandKeyPressTime.current = null;
      
      if (commandHelpTimerRef.current) {
        clearTimeout(commandHelpTimerRef.current);
        commandHelpTimerRef.current = null;
      }
    }

    // Navigation shortcuts
    if (matchesShortcut(event, 'ArrowRight', { meta: true, shift: true })) {
      event.preventDefault();
      onNextExample?.();
      return;
    }

    if (matchesShortcut(event, 'ArrowLeft', { meta: true, shift: true })) {
      event.preventDefault();
      onPreviousExample?.();
      return;
    }

    if (matchesShortcut(event, 'ArrowRight', { meta: true, shift: true, alt: true })) {
      event.preventDefault();
      onLastExample?.();
      return;
    }

    if (matchesShortcut(event, 'ArrowLeft', { meta: true, shift: true, alt: true })) {
      event.preventDefault();
      onFirstExample?.();
      return;
    }

    if (matchesShortcut(event, 'ArrowRight', { meta: true, shift: true, ctrl: true })) {
      event.preventDefault();
      onLastInSection?.();
      return;
    }

    if (matchesShortcut(event, 'ArrowLeft', { meta: true, shift: true, ctrl: true })) {
      event.preventDefault();
      onFirstInSection?.();
      return;
    }

    // Panel tab cycling
    if (matchesShortcut(event, 'ArrowDown', { meta: true, shift: true })) {
      event.preventDefault();
      onCycleTabsRight?.();
      return;
    }

    if (matchesShortcut(event, 'ArrowUp', { meta: true, shift: true })) {
      event.preventDefault();
      onCycleTabsLeft?.();
      return;
    }

    // Debug and testing shortcuts
    if (matchesShortcut(event, 'd', { ctrl: true })) {
      event.preventDefault();
      onToggleDebugMode?.();
      return;
    }

    // Cmd+Ctrl+R: Run test in debug mode
    if (matchesShortcut(event, 'r', { ctrl: true, meta: true })) {
      event.preventDefault();
      onRunTestDebug?.();
      return;
    }

    // Ctrl+R: Run test (regular)
    if (matchesShortcut(event, 'r', { ctrl: true })) {
      event.preventDefault();
      onRunTest?.();
      return;
    }

    // Ctrl+C: Clear debug output
    if (matchesShortcut(event, 'c', { ctrl: true })) {
      event.preventDefault();
      onClearDebugOutput?.();
      return;
    }

    // Cmd+Ctrl+Right: Debug step forward
    if (matchesShortcut(event, 'ArrowRight', { ctrl: true, meta: true })) {
      event.preventDefault();
      onDebugStepForward?.();
      return;
    }

    // Cmd+Ctrl+Left: Debug step backward
    if (matchesShortcut(event, 'ArrowLeft', { ctrl: true, meta: true })) {
      event.preventDefault();
      onDebugStepBackward?.();
      return;
    }

    // Switch editor tabs: Ctrl+Cmd+[1-4] (0 for 10th if we had that many)
    // Number keys: 1-9, 0 maps to tab 10
    const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    for (let i = 0; i < numberKeys.length; i++) {
      if (matchesShortcut(event, numberKeys[i], { ctrl: true, meta: true })) {
        event.preventDefault();
        // 0 key maps to index 10, others map to their face value
        const tabIndex = numberKeys[i] === '0' ? 10 : parseInt(numberKeys[i]);
        onSwitchEditorTab?.(tabIndex);
        return;
      }
    }

    // Switch panel tabs: Ctrl+Cmd+Shift+[1-3] (or up to 10)
    for (let i = 0; i < numberKeys.length; i++) {
      if (matchesShortcut(event, numberKeys[i], { ctrl: true, meta: true, shift: true })) {
        event.preventDefault();
        // 0 key maps to index 10, others map to their face value
        const tabIndex = numberKeys[i] === '0' ? 10 : parseInt(numberKeys[i]);
        onSwitchPanelTab?.(tabIndex);
        return;
      }
    }
  }, [enabled, onNextExample, onPreviousExample, onFirstExample, onLastExample, onFirstInSection, onLastInSection, onCycleTabsRight, onCycleTabsLeft, 
      onToggleDebugMode, onRunTest, onRunTestDebug, onClearDebugOutput, onDebugStepForward, onDebugStepBackward, onShowHelp, onSwitchEditorTab, onSwitchPanelTab]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    // Reset Command key tracking when released
    if (event.key === 'Meta') {
      commandKeyPressTime.current = null;
      
      if (commandHelpTimerRef.current) {
        clearTimeout(commandHelpTimerRef.current);
        commandHelpTimerRef.current = null;
      }
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      
      if (commandHelpTimerRef.current) {
        clearTimeout(commandHelpTimerRef.current);
      }
    };
  }, [enabled, handleKeyDown, handleKeyUp]);

  return {
    enabled
  };
}

/**
 * Keyboard shortcut definitions for help modal
 */
export const KEYBOARD_SHORTCUTS = [
  {
    category: 'Tab Switching',
    shortcuts: [
      {
        keys: ['Ctrl', 'Cmd', '1-4'],
        description: 'Switch editor tabs (1=BAL, 2=RTE, 3=Markdown, 4=Formula)',
        id: 'switch-editor-tab'
      },
      {
        keys: ['Ctrl', 'Cmd', 'Shift', '1-3'],
        description: 'Switch panel tabs (varies by editor)',
        id: 'switch-panel-tab'
      }
    ]
  },
  {
    category: 'Navigation',
    shortcuts: [
      {
        keys: ['Cmd', 'Shift', '→'],
        description: 'Next example',
        id: 'next-example'
      },
      {
        keys: ['Cmd', 'Shift', '←'],
        description: 'Previous example',
        id: 'prev-example'
      },
      {
        keys: ['Cmd', 'Option', 'Shift', '→'],
        description: 'Last example',
        id: 'last-example'
      },
      {
        keys: ['Cmd', 'Option', 'Shift', '←'],
        description: 'First example',
        id: 'first-example'
      },
      {
        keys: ['Cmd', 'Ctrl', 'Shift', '→'],
        description: 'Last in section (cycles to next section)',
        id: 'last-in-section'
      },
      {
        keys: ['Cmd', 'Ctrl', 'Shift', '←'],
        description: 'First in section (cycles to previous section)',
        id: 'first-in-section'
      }
    ]
  },
  {
    category: 'Right Panel',
    shortcuts: [
      {
        keys: ['Cmd', 'Shift', '↓'],
        description: 'Cycle tabs right',
        id: 'cycle-tabs-right'
      },
      {
        keys: ['Cmd', 'Shift', '↑'],
        description: 'Cycle tabs left',
        id: 'cycle-tabs-left'
      }
    ]
  },
  {
    category: 'Testing & Debugging',
    shortcuts: [
      {
        keys: ['Ctrl', 'D'],
        description: 'Toggle debug mode',
        id: 'toggle-debug'
      },
      {
        keys: ['Ctrl', 'R'],
        description: 'Run test',
        id: 'run-test'
      },
      {
        keys: ['Cmd', 'Ctrl', 'R'],
        description: 'Run test in debug mode',
        id: 'run-test-debug'
      },
      {
        keys: ['Ctrl', 'C'],
        description: 'Clear debug output (twice to disable debug mode)',
        id: 'clear-debug'
      },
      {
        keys: ['Cmd', 'Ctrl', '→'],
        description: 'Debug step forward',
        id: 'debug-step-forward'
      },
      {
        keys: ['Cmd', 'Ctrl', '←'],
        description: 'Debug step backward',
        id: 'debug-step-backward'
      }
    ]
  },
  {
    category: 'Help',
    shortcuts: [
      {
        keys: ['Hold Command', '3s'],
        description: 'Show this help',
        id: 'show-help'
      }
    ]
  }
] as const;