/**
 * Date Formatting Utilities
 * 
 * Utilities for formatting dates according to specified format strings.
 * Supports common date formats used in formula variables.
 */

import type { DateFormat } from '../components/editors/core/types';

/**
 * Month names for formatting
 */
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_ABBR = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Format a date according to the specified format string
 * 
 * @param date - Date object or ISO string
 * @param format - Format string (e.g., 'YYYY-MM-DD')
 * @returns Formatted date string
 * 
 * @example
 * formatDate(new Date('2025-10-25'), 'YYYY-MM-DD') // '2025-10-25'
 * formatDate(new Date('2025-10-25'), 'MM/DD/YYYY') // '10/25/2025'
 * formatDate(new Date('2025-10-25'), 'DD-MMM-YYYY') // '25-Oct-2025'
 */
export function formatDate(date: Date | string, format: DateFormat = 'YYYY-MM-DD'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // Validate date
  if (isNaN(d.getTime())) {
    return '';
  }
  
  const year = d.getFullYear();
  const month = d.getMonth() + 1; // 0-indexed
  const day = d.getDate();
  
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  const yyyy = String(year);
  
  switch (format) {
    case 'YYYY-MM-DD':
      return `${yyyy}-${mm}-${dd}`;
      
    case 'MM/DD/YYYY':
      return `${mm}/${dd}/${yyyy}`;
      
    case 'DD/MM/YYYY':
      return `${dd}/${mm}/${yyyy}`;
      
    case 'DD-MMM-YYYY':
      return `${dd}-${MONTH_ABBR[d.getMonth()]}-${yyyy}`;
      
    case 'MMMM DD, YYYY':
      return `${MONTH_NAMES[d.getMonth()]} ${dd}, ${yyyy}`;
      
    case 'YYYY/MM/DD':
      return `${yyyy}/${mm}/${dd}`;
      
    default:
      return `${yyyy}-${mm}-${dd}`;
  }
}

/**
 * Parse a formatted date string back to ISO format (YYYY-MM-DD)
 * Used when storing date values internally
 * 
 * @param dateString - Formatted date string
 * @param format - Format the string is in
 * @returns ISO date string (YYYY-MM-DD) or empty string if invalid
 * 
 * @example
 * parseFormattedDate('10/25/2025', 'MM/DD/YYYY') // '2025-10-25'
 * parseFormattedDate('25-Oct-2025', 'DD-MMM-YYYY') // '2025-10-25'
 */
export function parseFormattedDate(dateString: string, format: DateFormat = 'YYYY-MM-DD'): string {
  if (!dateString) return '';
  
  try {
    let year: number;
    let month: number;
    let day: number;
    
    switch (format) {
      case 'YYYY-MM-DD': {
        const parts = dateString.split('-');
        year = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10);
        day = parseInt(parts[2], 10);
        break;
      }
      
      case 'MM/DD/YYYY': {
        const parts = dateString.split('/');
        month = parseInt(parts[0], 10);
        day = parseInt(parts[1], 10);
        year = parseInt(parts[2], 10);
        break;
      }
      
      case 'DD/MM/YYYY': {
        const parts = dateString.split('/');
        day = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10);
        year = parseInt(parts[2], 10);
        break;
      }
      
      case 'DD-MMM-YYYY': {
        const parts = dateString.split('-');
        day = parseInt(parts[0], 10);
        const monthAbbr = parts[1];
        const monthIndex = MONTH_ABBR.indexOf(monthAbbr);
        if (monthIndex === -1) return '';
        month = monthIndex + 1;
        year = parseInt(parts[2], 10);
        break;
      }
      
      case 'MMMM DD, YYYY': {
        // Parse "October 25, 2025"
        const match = dateString.match(/^(\w+)\s+(\d+),\s+(\d+)$/);
        if (!match) return '';
        const monthName = match[1];
        const monthIndex = MONTH_NAMES.indexOf(monthName);
        if (monthIndex === -1) return '';
        month = monthIndex + 1;
        day = parseInt(match[2], 10);
        year = parseInt(match[3], 10);
        break;
      }
      
      case 'YYYY/MM/DD': {
        const parts = dateString.split('/');
        year = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10);
        day = parseInt(parts[2], 10);
        break;
      }
      
      default:
        return dateString;
    }
    
    // Validate date components
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return '';
    }
    
    // Create date and validate it
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) {
      return '';
    }
    
    // Return ISO format
    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const yyyy = String(year);
    
    return `${yyyy}-${mm}-${dd}`;
  } catch (e) {
    return '';
  }
}

/**
 * Get today's date in the specified format
 * 
 * @param format - Format string
 * @returns Today's date formatted
 */
export function getTodayFormatted(format: DateFormat = 'YYYY-MM-DD'): string {
  return formatDate(new Date(), format);
}
