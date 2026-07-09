/**
 * useDebugger - Hook for managing formula debugger state and playback
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { ExecutionTrace } from '../../../../../services/evaluationEngine/debugger';
import type { DebugLineValue } from '../DebugOutputColumn';

export interface DebuggerState {
  /** Current step index (0-based) */
  currentStep: number;
  /** Whether playback is active */
  isPlaying: boolean;
  /** Playback speed in ms */
  playbackSpeed: number;
  /** Total number of steps */
  totalSteps: number;
}

export interface DebuggerActions {
  /** Set current step */
  setCurrentStep: (step: number) => void;
  /** Step backward */
  stepBackward: () => void;
  /** Step forward */
  stepForward: () => void;
  /** Jump to first step */
  stepFirst: () => void;
  /** Jump to last step */
  stepLast: () => void;
  /** Toggle play/pause */
  togglePlay: () => void;
  /** Set playback speed */
  setPlaybackSpeed: (speed: number) => void;
  /** Reset debugger state */
  reset: () => void;
}

export interface UseDebuggerResult {
  state: DebuggerState;
  actions: DebuggerActions;
  /** Get debug output values for each line based on current step */
  getLineOutputValues: () => DebugLineValue[];
}

/**
 * Helper: Infer the type of a runtime value
 */
function inferType(value: any): DebugLineValue['type'] {
  if (value === null || value === undefined) return 'null';
  if (value instanceof Date) return 'date';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') {
    // Check if it's a time string (HH:MM:SS format)
    if (/^\d{2}:\d{2}:\d{2}$/.test(value)) return 'time';
    return 'string';
  }
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object') return 'object';
  return 'null';
}

/**
 * Helper: Format value for compact display in debug column
 */
function formatDebugValue(value: any): string {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return `"${value}"`;
  if (value instanceof Date) return value.toISOString().split('T')[0];
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const preview = value.slice(0, 3).map(v => formatDebugValue(v)).join(', ');
    return `[${preview}${value.length > 3 ? '...' : ''}]`;
  }
  if (typeof value === 'object') return '{...}';
  return String(value);
}

/**
 * Helper: Format value with full detail (for tooltip)
 */
function formatDebugValueFull(value: any): string {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return `"${value}"`;
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return JSON.stringify(value, null, 2);
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  return String(value);
}

/**
 * Hook for managing debugger state and playback
 */
export function useDebugger(trace: ExecutionTrace | null): UseDebuggerResult {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000); // 1 second default
  
  const playbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const totalSteps = trace?.steps.length ?? 0;
  
  // Reset when trace changes
  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    if (playbackTimerRef.current) {
      clearInterval(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }
  }, [trace]);
  
  // Playback logic
  useEffect(() => {
    if (isPlaying && trace) {
      playbackTimerRef.current = setInterval(() => {
        setCurrentStep(prev => {
          const next = prev + 1;
          if (next >= totalSteps) {
            setIsPlaying(false);
            return prev; // Stay at last step
          }
          return next;
        });
      }, playbackSpeed);
      
      return () => {
        if (playbackTimerRef.current) {
          clearInterval(playbackTimerRef.current);
          playbackTimerRef.current = null;
        }
      };
    }
  }, [isPlaying, playbackSpeed, trace, totalSteps]);
  
  const stepBackward = useCallback(() => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  }, []);
  
  const stepForward = useCallback(() => {
    setCurrentStep(prev => Math.min(totalSteps - 1, prev + 1));
  }, [totalSteps]);
  
  const stepFirst = useCallback(() => {
    setCurrentStep(0);
  }, []);
  
  const stepLast = useCallback(() => {
    setCurrentStep(totalSteps - 1);
  }, [totalSteps]);
  
  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);
  
  const reset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    if (playbackTimerRef.current) {
      clearInterval(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }
  }, []);
  
  /**
   * Get output values for each line based on current execution trace step.
   * Returns array with entries for lines that produced values.
   * 
   * This extracts the computed result for each line from the execution trace,
   * up to and including the current step being debugged.
   */
  const getLineOutputValues = useCallback((): DebugLineValue[] => {
    if (!trace || currentStep < 0 || currentStep >= totalSteps) {
      return [];
    }

    // Build map of line number → most recent computed value
    const lineValueMap = new Map<number, DebugLineValue>();

    // Process all steps up to current step (inclusive)
    for (let i = 0; i <= currentStep; i++) {
      const step = trace.steps[i];
      
      // Skip steps without location or result
      if (!step.location?.line || step.result === undefined) {
        continue;
      }

      const lineNumber = step.location.line;

      // Create debug line value
      const debugValue: DebugLineValue = {
        lineNumber,
        value: step.result,
        type: inferType(step.result),
        displayText: formatDebugValue(step.result),
        fullText: formatDebugValueFull(step.result),
        hasError: false, // TODO: Track errors when error handling is added
      };

      // Update map (latest value wins for lines executed multiple times)
      lineValueMap.set(lineNumber, debugValue);
    }

    // Convert map to array
    return Array.from(lineValueMap.values());
  }, [trace, currentStep, totalSteps]);
  
  return {
    state: {
      currentStep,
      isPlaying,
      playbackSpeed,
      totalSteps,
    },
    actions: {
      setCurrentStep,
      stepBackward,
      stepForward,
      stepFirst,
      stepLast,
      togglePlay,
      setPlaybackSpeed,
      reset,
    },
    getLineOutputValues,
  };
}
