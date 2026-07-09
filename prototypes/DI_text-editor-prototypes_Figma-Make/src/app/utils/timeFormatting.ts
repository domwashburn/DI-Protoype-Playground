/**
 * Time Formatting Utilities
 * 
 * Utilities for formatting time values according to specified format strings.
 * Supports common time formats used in formula variables.
 * Internal representation is always milliseconds.
 */

import type { TimeFormat } from '../components/editors/core/types';

/**
 * Format a time value (in milliseconds) according to the specified format string
 * 
 * @param milliseconds - Time value in milliseconds
 * @param format - Format string (e.g., 'HH:MM:SS')
 * @returns Formatted time string
 * 
 * @example
 * formatTime(9045000, 'HH:MM:SS') // '02:30:45'
 * formatTime(9045000, 'HH:MM') // '02:30'
 * formatTime(9045000, 'minutes') // '150.75'
 */
export function formatTime(milliseconds: number, format: TimeFormat = 'HH:MM:SS'): string {
  // Validate input
  if (typeof milliseconds !== 'number' || isNaN(milliseconds)) {
    return '';
  }
  
  // Handle negative values
  const isNegative = milliseconds < 0;
  const absMs = Math.abs(milliseconds);
  const sign = isNegative ? '-' : '';
  
  switch (format) {
    case 'HH:MM:SS': {
      const totalSeconds = Math.floor(absMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
      
    case 'HH:MM': {
      const totalMinutes = Math.floor(absMs / 60000);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      
      return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
      
    case 'minutes': {
      const totalMinutes = absMs / 60000;
      return `${sign}${totalMinutes.toFixed(2)}`;
    }
      
    case 'hours': {
      const totalHours = absMs / 3600000;
      return `${sign}${totalHours.toFixed(2)}`;
    }
      
    case 'seconds': {
      const totalSeconds = absMs / 1000;
      return `${sign}${totalSeconds.toFixed(0)}`;
    }
      
    case 'milliseconds': {
      return `${sign}${absMs.toFixed(0)}`;
    }
      
    default:
      return formatTime(milliseconds, 'HH:MM:SS');
  }
}

/**
 * Parse a formatted time string back to milliseconds
 * Used when storing time values internally
 * 
 * @param timeString - Formatted time string
 * @param format - Format the string is in
 * @returns Time value in milliseconds or 0 if invalid
 * 
 * @example
 * parseFormattedTime('02:30:45', 'HH:MM:SS') // 9045000
 * parseFormattedTime('02:30', 'HH:MM') // 9000000
 * parseFormattedTime('150.75', 'minutes') // 9045000
 */
export function parseFormattedTime(timeString: string, format: TimeFormat = 'HH:MM:SS'): number {
  if (!timeString || typeof timeString !== 'string') return 0;
  
  try {
    // Handle negative values
    const isNegative = timeString.startsWith('-');
    const cleanString = isNegative ? timeString.substring(1) : timeString;
    const sign = isNegative ? -1 : 1;
    
    let milliseconds: number = 0;
    
    switch (format) {
      case 'HH:MM:SS': {
        const parts = cleanString.split(':');
        if (parts.length !== 3) return 0;
        
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        const seconds = parseInt(parts[2], 10);
        
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return 0;
        
        milliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
        break;
      }
      
      case 'HH:MM': {
        const parts = cleanString.split(':');
        if (parts.length !== 2) return 0;
        
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        
        if (isNaN(hours) || isNaN(minutes)) return 0;
        
        milliseconds = (hours * 3600 + minutes * 60) * 1000;
        break;
      }
      
      case 'minutes': {
        const totalMinutes = parseFloat(cleanString);
        if (isNaN(totalMinutes)) return 0;
        milliseconds = totalMinutes * 60000;
        break;
      }
      
      case 'hours': {
        const totalHours = parseFloat(cleanString);
        if (isNaN(totalHours)) return 0;
        milliseconds = totalHours * 3600000;
        break;
      }
      
      case 'seconds': {
        const totalSeconds = parseFloat(cleanString);
        if (isNaN(totalSeconds)) return 0;
        milliseconds = totalSeconds * 1000;
        break;
      }
      
      case 'milliseconds': {
        milliseconds = parseFloat(cleanString);
        if (isNaN(milliseconds)) return 0;
        break;
      }
      
      default:
        return parseFormattedTime(timeString, 'HH:MM:SS');
    }
    
    return milliseconds * sign;
  } catch (e) {
    return 0;
  }
}

/**
 * Convert milliseconds to a human-readable duration string
 * 
 * @param milliseconds - Time value in milliseconds
 * @returns Human-readable duration (e.g., "2 hours 30 minutes")
 */
export function formatDuration(milliseconds: number): string {
  if (typeof milliseconds !== 'number' || isNaN(milliseconds)) {
    return '0 seconds';
  }
  
  const absMs = Math.abs(milliseconds);
  const totalSeconds = Math.floor(absMs / 1000);
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  const parts: string[] = [];
  
  if (hours > 0) {
    parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
  }
  if (seconds > 0 || parts.length === 0) {
    parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
  }
  
  const result = parts.join(' ');
  return milliseconds < 0 ? `-${result}` : result;
}
