/**
 * AutoSaveIndicator Component (Presentational)
 * 
 * Displays the current auto-save status with appropriate visual feedback.
 * Pure presentational component with no internal state management.
 * 
 * CARBON_CONVERT: This file uses temporary replacements for Carbon components.
 * See /carbon-conversion.md for complete conversion mapping.
 */

import React from 'react';
// CARBON_CONVERT: Replace lucide-react icons with @carbon/icons-react:
// CheckCircle2 → <CheckmarkFilled />, Loader2 → <Loading />, AlertCircle → <WarningFilled />, CloudUpload → <CloudUpload />
import { CheckCircle2, Loader2, AlertCircle, CloudUpload } from 'lucide-react';
import type { AutoSaveStatus } from '../../hooks/useAutoSave';

export interface AutoSaveIndicatorProps {
  /** Current auto-save status */
  status: AutoSaveStatus;
  /** Timestamp of last successful save */
  lastSaved: number | null;
  /** Custom className for styling */
  className?: string;
}

/**
 * Format timestamp to relative time string
 */
const formatLastSaved = (timestamp: number | null): string => {
  if (!timestamp) return '';
  
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 10) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  
  return new Date(timestamp).toLocaleDateString();
};

/**
 * AutoSaveIndicator - Visual feedback for auto-save status
 */
export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  status,
  lastSaved,
  className = ''
}) => {
  const getStatusContent = () => {
    switch (status) {
      case 'idle':
        return {
          icon: null,
          text: lastSaved ? `Saved ${formatLastSaved(lastSaved)}` : 'No changes',
          color: '#525252'
        };
      
      case 'pending':
        return {
          icon: <CloudUpload size={16} style={{ animation: 'pulse 2s ease-in-out infinite' }} />,
          text: 'Pending...',
          color: '#0f62fe'
        };
      
      case 'saving':
        return {
          icon: <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />,
          text: 'Saving...',
          color: '#0f62fe'
        };
      
      case 'saved':
        return {
          icon: <CheckCircle2 size={16} />,
          text: 'Saved',
          color: '#24a148'
        };
      
      case 'error':
        return {
          icon: <AlertCircle size={16} />,
          text: 'Save failed',
          color: '#da1e28'
        };
      
      default:
        return {
          icon: null,
          text: '',
          color: '#525252'
        };
    }
  };

  const { icon, text, color } = getStatusContent();

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {icon && <span style={{ color, display: 'flex', alignItems: 'center' }}>{icon}</span>}
      <span style={{ fontSize: '12px', color, lineHeight: '16px' }}>{text}</span>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};
