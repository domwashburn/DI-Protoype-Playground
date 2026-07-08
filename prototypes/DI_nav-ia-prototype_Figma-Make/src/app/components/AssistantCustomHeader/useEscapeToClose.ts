import { useEffect, useRef } from 'react';

interface Options {
  /** When false the listener is not attached (e.g. while editing the title). */
  enabled?: boolean;
  /** Time window for the double-Escape "collapse then close" gesture, in ms. */
  doubleTapMs?: number;
  /** True when the panel is in its expanded mode (enables the double-tap). */
  isExpanded: boolean;
  /** Collapse the panel one step (expanded → side). */
  onCollapse?: () => void;
  /** Fully close the panel. */
  onClose?: () => void;
}

/**
 * Escape-to-close behavior for the assistant header.
 *
 * - Not expanded: single Escape calls `onClose`.
 * - Expanded: first Escape calls `onCollapse`; a second Escape within
 *   `doubleTapMs` calls `onClose`.
 *
 * Loosely coupled: this hook owns no UI and only reads/writes the callbacks
 * the caller passes in. To remove the feature entirely, delete this file and
 * its single call site in `AssistantCustomHeader.tsx`.
 */
export function useEscapeToClose({
  enabled = true,
  doubleTapMs = 400,
  isExpanded,
  onCollapse,
  onClose,
}: Options) {
  const lastEscAt = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      // Don't hijack Escape inside form fields / contenteditable surfaces.
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || t?.isContentEditable) return;

      if (isExpanded) {
        const now = Date.now();
        if (now - lastEscAt.current <= doubleTapMs) {
          lastEscAt.current = 0;
          onClose?.();
        } else {
          lastEscAt.current = now;
          onCollapse?.();
        }
      } else {
        onClose?.();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [enabled, doubleTapMs, isExpanded, onCollapse, onClose]);
}
