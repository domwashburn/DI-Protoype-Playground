/**
 * useAutoSave Hook
 * 
 * Custom hook for managing auto-save functionality with debouncing.
 * Provides auto-save status tracking and configurable save behavior.
 * 
 * @example
 * const { autoSaveStatus, triggerSave } = useAutoSave({
 *   content,
 *   onSave: async (content) => { await saveToServer(content); },
 *   enabled: autoSaveEnabled,
 *   delay: 2000
 * });
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export type AutoSaveStatus = 'idle' | 'pending' | 'saving' | 'saved' | 'error';

export interface UseAutoSaveOptions<T> {
  /** Content to auto-save */
  content: T;
  /** Function called to save content */
  onSave: (content: T) => Promise<void>;
  /** Whether auto-save is enabled */
  enabled: boolean;
  /** Debounce delay in milliseconds */
  delay?: number;
  /** Callback when save completes successfully */
  onSaveSuccess?: () => void;
  /** Callback when save fails */
  onSaveError?: (error: Error) => void;
}

export interface UseAutoSaveResult {
  /** Current auto-save status */
  autoSaveStatus: AutoSaveStatus;
  /** Last save timestamp */
  lastSaved: number | null;
  /** Manually trigger a save */
  triggerSave: () => Promise<void>;
  /** Reset auto-save status */
  reset: () => void;
}

/**
 * Hook for auto-saving content with debouncing
 */
export function useAutoSave<T>({
  content,
  onSave,
  enabled,
  delay = 2000,
  onSaveSuccess,
  onSaveError
}: UseAutoSaveOptions<T>): UseAutoSaveResult {
  const [autoSaveStatus, setAutoSaveStatus] = useState<AutoSaveStatus>('idle');
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isMountedRef = useRef(true);
  const previousContentRef = useRef<T>(content);
  const isSavingRef = useRef(false);

  /**
   * Perform the actual save operation
   */
  const performSave = useCallback(async (contentToSave: T) => {
    if (isSavingRef.current) {
      return;
    }

    try {
      isSavingRef.current = true;
      setAutoSaveStatus('saving');
      
      await onSave(contentToSave);
      
      if (isMountedRef.current) {
        setAutoSaveStatus('saved');
        setLastSaved(Date.now());
        onSaveSuccess?.();
        
        // Reset to idle after showing "saved" status briefly
        setTimeout(() => {
          if (isMountedRef.current) {
            setAutoSaveStatus('idle');
          }
        }, 2000);
      }
    } catch (error) {
      if (isMountedRef.current) {
        setAutoSaveStatus('error');
        onSaveError?.(error as Error);
        
        // Reset to idle after showing error briefly
        setTimeout(() => {
          if (isMountedRef.current) {
            setAutoSaveStatus('idle');
          }
        }, 3000);
      }
    } finally {
      isSavingRef.current = false;
    }
  }, [onSave, onSaveSuccess, onSaveError]);

  /**
   * Manually trigger a save
   */
  const triggerSave = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    await performSave(content);
  }, [content, performSave]);

  /**
   * Reset auto-save status
   */
  const reset = useCallback(() => {
    setAutoSaveStatus('idle');
    setLastSaved(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  /**
   * Auto-save effect with debouncing
   */
  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Check if content has actually changed
    const contentChanged = JSON.stringify(content) !== JSON.stringify(previousContentRef.current);
    
    if (!contentChanged) {
      return;
    }

    previousContentRef.current = content;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set status to pending
    setAutoSaveStatus('pending');

    // Set new timeout for debounced save
    timeoutRef.current = setTimeout(() => {
      performSave(content);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [content, enabled, delay, performSave]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    autoSaveStatus,
    lastSaved,
    triggerSave,
    reset
  };
}
