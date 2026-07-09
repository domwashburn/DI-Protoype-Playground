/**
 * ResizeHandle - Simple draggable resize handle for Debug Output Column
 * 
 * Phase 2: Resize Functionality
 * Allows user to drag the handle left/right to adjust debug output column width.
 * Constrained to min/max width boundaries.
 */

import React, { useCallback, useRef, useState } from 'react';
import styles from './ResizeHandle.module.css';

export interface ResizeHandleProps {
  /** Callback fired when resize occurs (delta in pixels) */
  onResize: (deltaX: number) => void;
  
  /** Minimum width constraint (pixels) */
  minWidth: number;
  
  /** Maximum width constraint (pixels) */
  maxWidth: number;
}

export function ResizeHandle({ onResize, minWidth, maxWidth }: ResizeHandleProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number>(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartX.current = e.clientX;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - dragStartX.current;
      dragStartX.current = moveEvent.clientX;
      onResize(-deltaX); // Negative because dragging left increases width
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [onResize]);

  return (
    <div
      className={`${styles.resizeHandle} ${isDragging ? styles.dragging : ''}`}
      onMouseDown={handleMouseDown}
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize debug output column"
    />
  );
}
