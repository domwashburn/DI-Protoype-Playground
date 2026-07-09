/**
 * Function Registry for Formula & BAL Evaluation Engine
 * 
 * Manages built-in and custom functions available in formulas.
 * 
 * @module evaluationEngine/runtime/FunctionRegistry
 */

import type { ExecutionContext } from './Context';
import { InvalidArgumentCountError, UndefinedFunctionError } from '../errors/EvaluationError';
import { RuntimeError } from '../errors/EvaluationError';

/**
 * Built-in function definition
 */
export interface BuiltInFunction {
  /** Function name */
  name: string;
  
  /** Minimum number of arguments */
  minArgs?: number;
  
  /** Maximum number of arguments (undefined = unlimited) */
  maxArgs?: number;
  
  /** Execute function */
  execute: (args: any[], context: ExecutionContext) => any;
  
  /** Description for documentation */
  description: string;
}

/**
 * Function registry
 */
export class FunctionRegistry {
  private functions = new Map<string, BuiltInFunction>();
  
  constructor() {
    this.registerBuiltIns();
  }
  
  /**
   * Register a function
   */
  register(fn: BuiltInFunction): void {
    this.functions.set(fn.name.toUpperCase(), fn);
  }
  
  /**
   * Check if function exists
   */
  has(name: string): boolean {
    return this.functions.has(name.toUpperCase());
  }
  
  /**
   * Get function by name
   */
  get(name: string): BuiltInFunction | undefined {
    return this.functions.get(name.toUpperCase());
  }
  
  /**
   * Execute a function
   */
  execute(name: string, args: any[], context: ExecutionContext, location?: any): any {
    const fn = this.get(name);
    
    if (!fn) {
      throw new UndefinedFunctionError(
        name,
        location,
        this.getSuggestions(name)
      );
    }
    
    // Validate argument count
    if (fn.minArgs !== undefined && args.length < fn.minArgs) {
      throw new InvalidArgumentCountError(
        name,
        fn.minArgs,
        args.length,
        location
      );
    }
    
    if (fn.maxArgs !== undefined && args.length > fn.maxArgs) {
      throw new InvalidArgumentCountError(
        name,
        fn.maxArgs,
        args.length,
        location
      );
    }
    
    // Debug logging for function execution
    if (!fn.execute) {
      console.error('Function found but execute method is undefined!', {
        name,
        fn,
        fnKeys: Object.keys(fn),
        fnExecuteType: typeof fn.execute
      });
      throw new RuntimeError(
        `Function '${name}' exists but has no execute method`,
        location
      );
    }
    
    return fn.execute(args, context);
  }
  
  /**
   * Get all registered functions
   */
  getAll(): BuiltInFunction[] {
    return Array.from(this.functions.values());
  }
  
  /**
   * Get function name suggestions (for typos)
   */
  private getSuggestions(name: string): string[] {
    const allNames = Array.from(this.functions.keys());
    const upperName = name.toUpperCase();
    
    // Simple suggestion: find names that start with the same letter
    const suggestions = allNames.filter(n => n[0] === upperName[0]);
    
    return suggestions.slice(0, 3);
  }
  
  /**
   * Register built-in functions
   */
  private registerBuiltIns(): void {
    // Arithmetic functions
    this.register({
      name: 'ROUND',
      minArgs: 2,
      maxArgs: 2,
      execute: ([value, decimals]) => {
        const multiplier = Math.pow(10, decimals);
        return Math.round(value * multiplier) / multiplier;
      },
      description: 'Round number to specified decimal places'
    });
    
    this.register({
      name: 'FLOOR',
      minArgs: 1,
      maxArgs: 1,
      execute: ([value]) => Math.floor(value),
      description: 'Round down to nearest integer'
    });
    
    this.register({
      name: 'CEIL',
      minArgs: 1,
      maxArgs: 1,
      execute: ([value]) => Math.ceil(value),
      description: 'Round up to nearest integer'
    });
    
    this.register({
      name: 'ABS',
      minArgs: 1,
      maxArgs: 1,
      execute: ([value]) => Math.abs(value),
      description: 'Absolute value'
    });
    
    this.register({
      name: 'SQRT',
      minArgs: 1,
      maxArgs: 1,
      execute: ([value]) => Math.sqrt(value),
      description: 'Square root'
    });
    
    this.register({
      name: 'POW',
      minArgs: 2,
      maxArgs: 2,
      execute: ([base, exp]) => Math.pow(base, exp),
      description: 'Raise to power'
    });
    
    // Aggregate functions
    this.register({
      name: 'SUM',
      minArgs: 1,
      execute: (args) => {
        // Handle both: SUM(arr) and SUM(val1, val2, val3, ...)
        const values = Array.isArray(args[0]) && args.length === 1 ? args[0] : args;
        return values.reduce((sum, val) => sum + Number(val), 0);
      },
      description: 'Sum all arguments or array elements'
    });
    
    this.register({
      name: 'AVG',
      minArgs: 1,
      execute: (args) => {
        // Handle both: AVG(arr) and AVG(val1, val2, val3, ...)
        const values = Array.isArray(args[0]) && args.length === 1 ? args[0] : args;
        const sum = values.reduce((s, val) => s + Number(val), 0);
        return sum / values.length;
      },
      description: 'Average of all arguments or array elements'
    });
    
    this.register({
      name: 'MAX',
      minArgs: 1,
      execute: (args) => {
        // Handle both: MAX(arr) and MAX(val1, val2, val3, ...)
        const values = Array.isArray(args[0]) && args.length === 1 ? args[0] : args;
        return Math.max(...values.map(Number));
      },
      description: 'Maximum value from arguments or array'
    });
    
    this.register({
      name: 'MIN',
      minArgs: 1,
      execute: (args) => {
        // Handle both: MIN(arr) and MIN(val1, val2, val3, ...)
        const values = Array.isArray(args[0]) && args.length === 1 ? args[0] : args;
        return Math.min(...values.map(Number));
      },
      description: 'Minimum value from arguments or array'
    });
    
    this.register({
      name: 'COUNT',
      minArgs: 1,
      execute: (args) => {
        // Handle both: COUNT(arr) and COUNT(val1, val2, val3, ...)
        const values = Array.isArray(args[0]) && args.length === 1 ? args[0] : args;
        return values.length;
      },
      description: 'Count arguments or array elements'
    });
    
    // String functions
    this.register({
      name: 'CONCAT',
      minArgs: 1,
      execute: (args) => args.map(String).join(''),
      description: 'Concatenate strings'
    });
    
    this.register({
      name: 'UPPER',
      minArgs: 1,
      maxArgs: 1,
      execute: ([value]) => String(value).toUpperCase(),
      description: 'Convert to uppercase'
    });
    
    this.register({
      name: 'LOWER',
      minArgs: 1,
      maxArgs: 1,
      execute: ([value]) => String(value).toLowerCase(),
      description: 'Convert to lowercase'
    });
    
    this.register({
      name: 'TRIM',
      minArgs: 1,
      maxArgs: 1,
      execute: ([value]) => String(value).trim(),
      description: 'Remove leading/trailing whitespace'
    });
    
    this.register({
      name: 'LEN',
      minArgs: 1,
      maxArgs: 1,
      execute: ([value]) => String(value).length,
      description: 'String length'
    });
    
    // Logical functions
    this.register({
      name: 'IF',
      minArgs: 3,
      maxArgs: 3,
      execute: ([condition, thenValue, elseValue]) => condition ? thenValue : elseValue,
      description: 'Ternary conditional'
    });
    
    // Date functions
    this.register({
      name: 'NOW',
      minArgs: 0,
      maxArgs: 0,
      execute: () => new Date(),
      description: 'Current date and time'
    });
    
    this.register({
      name: 'TODAY',
      minArgs: 0,
      maxArgs: 0,
      execute: () => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
      },
      description: 'Current date at midnight'
    });
    
    // DateTime calculation functions
    this.register({
      name: 'MILLISECONDS_BETWEEN',
      minArgs: 2,
      maxArgs: 2,
      execute: ([date1, date2]) => {
        const d1 = date1 instanceof Date ? date1 : new Date(date1);
        const d2 = date2 instanceof Date ? date2 : new Date(date2);
        return d2.getTime() - d1.getTime();
      },
      description: 'Get milliseconds between two datetimes'
    });
    
    this.register({
      name: 'SECONDS_BETWEEN',
      minArgs: 2,
      maxArgs: 2,
      execute: ([date1, date2]) => {
        const d1 = date1 instanceof Date ? date1 : new Date(date1);
        const d2 = date2 instanceof Date ? date2 : new Date(date2);
        return (d2.getTime() - d1.getTime()) / 1000;
      },
      description: 'Get seconds between two datetimes'
    });
    
    this.register({
      name: 'MINUTES_BETWEEN',
      minArgs: 2,
      maxArgs: 2,
      execute: ([date1, date2]) => {
        const d1 = date1 instanceof Date ? date1 : new Date(date1);
        const d2 = date2 instanceof Date ? date2 : new Date(date2);
        return (d2.getTime() - d1.getTime()) / (1000 * 60);
      },
      description: 'Get minutes between two datetimes'
    });
    
    this.register({
      name: 'HOURS_BETWEEN',
      minArgs: 2,
      maxArgs: 2,
      execute: ([date1, date2]) => {
        const d1 = date1 instanceof Date ? date1 : new Date(date1);
        const d2 = date2 instanceof Date ? date2 : new Date(date2);
        return (d2.getTime() - d1.getTime()) / (1000 * 60 * 60);
      },
      description: 'Get hours between two datetimes'
    });
    
    this.register({
      name: 'DAYS_BETWEEN',
      minArgs: 2,
      maxArgs: 2,
      execute: ([date1, date2]) => {
        const d1 = date1 instanceof Date ? date1 : new Date(date1);
        const d2 = date2 instanceof Date ? date2 : new Date(date2);
        return (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);
      },
      description: 'Get days between two datetimes'
    });
    
    // DateTime formatting functions
    this.register({
      name: 'YEAR',
      minArgs: 1,
      maxArgs: 1,
      execute: ([date]) => {
        const d = date instanceof Date ? date : new Date(date);
        return d.getFullYear();
      },
      description: 'Extract year from datetime'
    });
    
    this.register({
      name: 'MONTH',
      minArgs: 1,
      maxArgs: 1,
      execute: ([date]) => {
        const d = date instanceof Date ? date : new Date(date);
        return d.getMonth() + 1; // 1-indexed
      },
      description: 'Extract month from datetime (1-12)'
    });
    
    this.register({
      name: 'DAY',
      minArgs: 1,
      maxArgs: 1,
      execute: ([date]) => {
        const d = date instanceof Date ? date : new Date(date);
        return d.getDate();
      },
      description: 'Extract day from datetime'
    });
    
    this.register({
      name: 'HOUR',
      minArgs: 1,
      maxArgs: 1,
      execute: ([date]) => {
        const d = date instanceof Date ? date : new Date(date);
        return d.getHours();
      },
      description: 'Extract hour from datetime (0-23)'
    });
    
    this.register({
      name: 'MINUTE',
      minArgs: 1,
      maxArgs: 1,
      execute: ([date]) => {
        const d = date instanceof Date ? date : new Date(date);
        return d.getMinutes();
      },
      description: 'Extract minute from datetime (0-59)'
    });
    
    this.register({
      name: 'SECOND',
      minArgs: 1,
      maxArgs: 1,
      execute: ([date]) => {
        const d = date instanceof Date ? date : new Date(date);
        return d.getSeconds();
      },
      description: 'Extract second from datetime (0-59)'
    });
    
    // Time conversion functions
    this.register({
      name: 'TIME_TO_SECONDS',
      minArgs: 1,
      maxArgs: 1,
      execute: ([time]) => {
        // Parse time string (HH:MM:SS or HH:MM or Date object)
        if (time instanceof Date) {
          return time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
        }
        const timeStr = String(time).trim();
        const parts = timeStr.split(':');
        if (parts.length === 3) {
          // HH:MM:SS
          return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
        } else if (parts.length === 2) {
          // HH:MM
          return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60;
        }
        return 0;
      },
      description: 'Convert time to total seconds (HH:MM:SS format or Date)'
    });
    
    this.register({
      name: 'TIME_TO_MINUTES',
      minArgs: 1,
      maxArgs: 1,
      execute: ([time]) => {
        // Parse time string (HH:MM:SS or HH:MM or Date object)
        if (time instanceof Date) {
          return time.getHours() * 60 + time.getMinutes() + time.getSeconds() / 60;
        }
        const timeStr = String(time).trim();
        const parts = timeStr.split(':');
        if (parts.length === 3) {
          // HH:MM:SS
          return parseInt(parts[0]) * 60 + parseInt(parts[1]) + parseInt(parts[2]) / 60;
        } else if (parts.length === 2) {
          // HH:MM
          return parseInt(parts[0]) * 60 + parseInt(parts[1]);
        }
        return 0;
      },
      description: 'Convert time to total minutes (HH:MM:SS format or Date)'
    });
    
    this.register({
      name: 'TIME_TO_HOURS',
      minArgs: 1,
      maxArgs: 1,
      execute: ([time]) => {
        // Parse time string (HH:MM:SS or HH:MM or Date object)
        if (time instanceof Date) {
          return time.getHours() + time.getMinutes() / 60 + time.getSeconds() / 3600;
        }
        const timeStr = String(time).trim();
        const parts = timeStr.split(':');
        if (parts.length === 3) {
          // HH:MM:SS
          return parseInt(parts[0]) + parseInt(parts[1]) / 60 + parseInt(parts[2]) / 3600;
        } else if (parts.length === 2) {
          // HH:MM
          return parseInt(parts[0]) + parseInt(parts[1]) / 60;
        }
        return 0;
      },
      description: 'Convert time to total hours (HH:MM:SS format or Date)'
    });
    
    // DateTime manipulation functions
    this.register({
      name: 'DATE_ADD',
      minArgs: 3,
      maxArgs: 3,
      execute: ([date, amount, unit]) => {
        const d = date instanceof Date ? new Date(date) : new Date(date);
        const amt = Number(amount);
        const unitStr = String(unit).toLowerCase();
        
        switch (unitStr) {
          case 'years':
          case 'year':
            d.setFullYear(d.getFullYear() + amt);
            break;
          case 'months':
          case 'month':
            d.setMonth(d.getMonth() + amt);
            break;
          case 'days':
          case 'day':
            d.setDate(d.getDate() + amt);
            break;
          case 'hours':
          case 'hour':
            d.setHours(d.getHours() + amt);
            break;
          case 'minutes':
          case 'minute':
            d.setMinutes(d.getMinutes() + amt);
            break;
          case 'seconds':
          case 'second':
            d.setSeconds(d.getSeconds() + amt);
            break;
          default:
            throw new Error(`Unknown unit: ${unit}`);
        }
        return d;
      },
      description: 'Add time to a date (unit: "years", "months", "days", "hours", "minutes", "seconds")'
    });
    
    this.register({
      name: 'DATE_SUBTRACT',
      minArgs: 3,
      maxArgs: 3,
      execute: ([date, amount, unit]) => {
        const d = date instanceof Date ? new Date(date) : new Date(date);
        const amt = Number(amount);
        const unitStr = String(unit).toLowerCase();
        
        switch (unitStr) {
          case 'years':
          case 'year':
            d.setFullYear(d.getFullYear() - amt);
            break;
          case 'months':
          case 'month':
            d.setMonth(d.getMonth() - amt);
            break;
          case 'days':
          case 'day':
            d.setDate(d.getDate() - amt);
            break;
          case 'hours':
          case 'hour':
            d.setHours(d.getHours() - amt);
            break;
          case 'minutes':
          case 'minute':
            d.setMinutes(d.getMinutes() - amt);
            break;
          case 'seconds':
          case 'second':
            d.setSeconds(d.getSeconds() - amt);
            break;
          default:
            throw new Error(`Unknown unit: ${unit}`);
        }
        return d;
      },
      description: 'Subtract time from a date (unit: "years", "months", "days", "hours", "minutes", "seconds")'
    });
    
    this.register({
      name: 'WEEKDAY',
      minArgs: 1,
      maxArgs: 1,
      execute: ([date]) => {
        const d = date instanceof Date ? date : new Date(date);
        return d.getDay(); // 0 = Sunday, 6 = Saturday
      },
      description: 'Get day of week from datetime (0=Sunday, 6=Saturday)'
    });
    
    this.register({
      name: 'IS_WEEKEND',
      minArgs: 1,
      maxArgs: 1,
      execute: ([date]) => {
        const d = date instanceof Date ? date : new Date(date);
        const day = d.getDay();
        return day === 0 || day === 6;
      },
      description: 'Check if date is a weekend (Saturday or Sunday)'
    });
    
    this.register({
      name: 'IS_WEEKDAY',
      minArgs: 1,
      maxArgs: 1,
      execute: ([date]) => {
        const d = date instanceof Date ? date : new Date(date);
        const day = d.getDay();
        return day >= 1 && day <= 5;
      },
      description: 'Check if date is a weekday (Monday-Friday)'
    });
    
    // ============================================================================
    // List/Array Functions
    // ============================================================================
    
    this.register({
      name: 'LENGTH',
      minArgs: 1,
      maxArgs: 1,
      execute: ([list]) => {
        if (!Array.isArray(list)) {
          throw new Error('LENGTH requires a list argument');
        }
        return list.length;
      },
      description: 'Get the length of a list'
    });
    
    this.register({
      name: 'LIST_SUM',
      minArgs: 1,
      maxArgs: 1,
      execute: ([list]) => {
        if (!Array.isArray(list)) {
          throw new Error('LIST_SUM requires a list argument');
        }
        if (list.length === 0) {
          return 0;
        }
        return list.reduce((sum, val) => sum + Number(val), 0);
      },
      description: 'Sum all elements in a numeric list'
    });
    
    this.register({
      name: 'LIST_AVG',
      minArgs: 1,
      maxArgs: 1,
      execute: ([list]) => {
        if (!Array.isArray(list)) {
          throw new Error('LIST_AVG requires a list argument');
        }
        if (list.length === 0) {
          throw new Error('Cannot calculate average of empty list');
        }
        const sum = list.reduce((s, val) => s + Number(val), 0);
        return sum / list.length;
      },
      description: 'Calculate average of all elements in a numeric list'
    });
    
    this.register({
      name: 'LIST_MIN',
      minArgs: 1,
      maxArgs: 1,
      execute: ([list]) => {
        if (!Array.isArray(list)) {
          throw new Error('LIST_MIN requires a list argument');
        }
        if (list.length === 0) {
          throw new Error('Cannot find minimum of empty list');
        }
        return Math.min(...list.map(Number));
      },
      description: 'Find minimum value in a numeric list'
    });
    
    this.register({
      name: 'LIST_MAX',
      minArgs: 1,
      maxArgs: 1,
      execute: ([list]) => {
        if (!Array.isArray(list)) {
          throw new Error('LIST_MAX requires a list argument');
        }
        if (list.length === 0) {
          throw new Error('Cannot find maximum of empty list');
        }
        return Math.max(...list.map(Number));
      },
      description: 'Find maximum value in a numeric list'
    });
    
    this.register({
      name: 'CONTAINS',
      minArgs: 2,
      maxArgs: 2,
      execute: ([list, value]) => {
        // PHASE 5.5: Support both arrays and strings
        if (typeof list === 'string') {
          // String contains substring
          return list.includes(String(value));
        }
        if (!Array.isArray(list)) {
          throw new Error('CONTAINS requires a list or string as first argument');
        }
        return list.includes(value);
      },
      description: 'Check if list contains a value or if string contains a substring'
    });
    
    this.register({
      name: 'FIRST',
      minArgs: 1,
      maxArgs: 1,
      execute: ([list]) => {
        if (!Array.isArray(list)) {
          throw new Error('FIRST requires a list argument');
        }
        if (list.length === 0) {
          throw new Error('Cannot get first element of empty list');
        }
        return list[0];
      },
      description: 'Get the first element of a list'
    });
    
    this.register({
      name: 'LAST',
      minArgs: 1,
      maxArgs: 1,
      execute: ([list]) => {
        if (!Array.isArray(list)) {
          throw new Error('LAST requires a list argument');
        }
        if (list.length === 0) {
          throw new Error('Cannot get last element of empty list');
        }
        return list[list.length - 1];
      },
      description: 'Get the last element of a list'
    });
    
    this.register({
      name: 'REVERSE',
      minArgs: 1,
      maxArgs: 1,
      execute: ([list]) => {
        if (!Array.isArray(list)) {
          throw new Error('REVERSE requires a list argument');
        }
        // Create a new array to avoid mutating the original
        return [...list].reverse();
      },
      description: 'Reverse the order of elements in a list'
    });
    
    this.register({
      name: 'SLICE',
      minArgs: 2,
      maxArgs: 3,
      execute: ([list, start, end]) => {
        if (!Array.isArray(list)) {
          throw new Error('SLICE requires a list as first argument');
        }
        if (typeof start !== 'number') {
          throw new Error('SLICE start index must be a number');
        }
        
        // Handle negative indices
        const actualStart = start < 0 ? Math.max(list.length + start, 0) : start;
        
        // If end is provided, use it; otherwise slice to end
        if (end !== undefined) {
          if (typeof end !== 'number') {
            throw new Error('SLICE end index must be a number');
          }
          const actualEnd = end < 0 ? Math.max(list.length + end, 0) : end;
          return list.slice(actualStart, actualEnd);
        }
        
        return list.slice(actualStart);
      },
      description: 'Extract a portion of a list from start (inclusive) to end (exclusive)'
    });
    
    this.register({
      name: 'CONCAT',
      minArgs: 2,
      execute: (args) => {
        // Validate all arguments are lists
        for (let i = 0; i < args.length; i++) {
          if (!Array.isArray(args[i])) {
            throw new Error(`CONCAT argument ${i + 1} must be a list`);
          }
        }
        
        // Concatenate all lists
        return args.reduce((result, list) => result.concat(list), []);
      },
      description: 'Concatenate two or more lists into a single list'
    });
    
    this.register({
      name: 'UNIQUE',
      minArgs: 1,
      maxArgs: 1,
      execute: ([list]) => {
        if (!Array.isArray(list)) {
          throw new Error('UNIQUE requires a list argument');
        }
        
        // Use Set to remove duplicates, then convert back to array
        return [...new Set(list)];
      },
      description: 'Remove duplicate elements from a list'
    });
    
    this.register({
      name: 'SORT',
      minArgs: 1,
      maxArgs: 1,
      execute: ([list]) => {
        if (!Array.isArray(list)) {
          throw new Error('SORT requires a list argument');
        }
        if (list.length === 0) {
          return [];
        }
        
        // Create a copy to avoid mutating original
        const sorted = [...list];
        
        // Determine sort based on first element type
        const firstElement = list[0];
        if (typeof firstElement === 'number') {
          return sorted.sort((a, b) => a - b);
        } else if (typeof firstElement === 'string') {
          return sorted.sort((a, b) => a.localeCompare(b));
        } else if (firstElement instanceof Date) {
          return sorted.sort((a, b) => a.getTime() - b.getTime());
        } else {
          // Fallback to default sort
          return sorted.sort();
        }
      },
      description: 'Sort a list in ascending order'
    });
    
    this.register({
      name: 'SORT_DESC',
      minArgs: 1,
      maxArgs: 1,
      execute: ([list]) => {
        if (!Array.isArray(list)) {
          throw new Error('SORT_DESC requires a list argument');
        }
        if (list.length === 0) {
          return [];
        }
        
        // Create a copy to avoid mutating original
        const sorted = [...list];
        
        // Determine sort based on first element type
        const firstElement = list[0];
        if (typeof firstElement === 'number') {
          return sorted.sort((a, b) => b - a);
        } else if (typeof firstElement === 'string') {
          return sorted.sort((a, b) => b.localeCompare(a));
        } else if (firstElement instanceof Date) {
          return sorted.sort((a, b) => b.getTime() - a.getTime());
        } else {
          // Fallback to default sort (reversed)
          return sorted.sort().reverse();
        }
      },
      description: 'Sort a list in descending order'
    });
    
    this.register({
      name: 'JOIN',
      minArgs: 2,
      maxArgs: 2,
      execute: ([list, separator]) => {
        if (!Array.isArray(list)) {
          throw new Error('JOIN requires a list as first argument');
        }
        
        const sep = String(separator);
        return list.map(String).join(sep);
      },
      description: 'Join list elements into a string with a separator'
    });
    
    this.register({
      name: 'SPLIT',
      minArgs: 2,
      maxArgs: 2,
      execute: ([str, separator]) => {
        const text = String(str);
        const sep = String(separator);
        
        if (sep === '') {
          // Split into individual characters
          return text.split('');
        }
        
        return text.split(sep);
      },
      description: 'Split a string into a list using a separator'
    });
    
    this.register({
      name: 'INDEX_OF',
      minArgs: 2,
      maxArgs: 2,
      execute: ([list, value]) => {
        if (!Array.isArray(list)) {
          throw new Error('INDEX_OF requires a list as first argument');
        }
        
        return list.indexOf(value);
      },
      description: 'Find the first index of a value in a list (-1 if not found)'
    });
    
    this.register({
      name: 'RANGE',
      minArgs: 2,
      maxArgs: 3,
      execute: ([start, end, step]) => {
        const startNum = Number(start);
        const endNum = Number(end);
        const stepNum = step !== undefined ? Number(step) : 1;
        
        if (stepNum === 0) {
          throw new Error('RANGE step cannot be zero');
        }
        
        const result: number[] = [];
        
        if (stepNum > 0) {
          for (let i = startNum; i < endNum; i += stepNum) {
            result.push(i);
          }
        } else {
          for (let i = startNum; i > endNum; i += stepNum) {
            result.push(i);
          }
        }
        
        return result;
      },
      description: 'Generate a list of numbers from start (inclusive) to end (exclusive) with optional step'
    });
    
    // PHASE 5.5: Natural Language Predicate Functions
    
    this.register({
      name: 'IS_NULL',
      minArgs: 1,
      maxArgs: 1,
      execute: ([value]) => {
        return value === null || value === undefined;
      },
      description: 'Check if value is null or undefined'
    });
    
    this.register({
      name: 'IS_NOT_NULL',
      minArgs: 1,
      maxArgs: 1,
      execute: ([value]) => {
        return value !== null && value !== undefined;
      },
      description: 'Check if value is not null or undefined'
    });
    
    this.register({
      name: 'IS_EMPTY',
      minArgs: 1,
      maxArgs: 1,
      execute: ([value]) => {
        if (value === null || value === undefined) {
          return true;
        }
        if (typeof value === 'string') {
          return value.length === 0;
        }
        if (Array.isArray(value)) {
          return value.length === 0;
        }
        if (typeof value === 'object') {
          return Object.keys(value).length === 0;
        }
        return false;
      },
      description: 'Check if value is empty (null, undefined, empty string, empty array, or empty object)'
    });
    
    this.register({
      name: 'IS_NOT_EMPTY',
      minArgs: 1,
      maxArgs: 1,
      execute: ([value]) => {
        if (value === null || value === undefined) {
          return false;
        }
        if (typeof value === 'string') {
          return value.length > 0;
        }
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        if (typeof value === 'object') {
          return Object.keys(value).length > 0;
        }
        return true;
      },
      description: 'Check if value is not empty'
    });
    
    this.register({
      name: 'STARTS_WITH',
      minArgs: 2,
      maxArgs: 2,
      execute: ([str, prefix]) => {
        const text = String(str);
        const prefixText = String(prefix);
        return text.startsWith(prefixText);
      },
      description: 'Check if string starts with the specified prefix'
    });
    
    this.register({
      name: 'ENDS_WITH',
      minArgs: 2,
      maxArgs: 2,
      execute: ([str, suffix]) => {
        const text = String(str);
        const suffixText = String(suffix);
        return text.endsWith(suffixText);
      },
      description: 'Check if string ends with the specified suffix'
    });
    
    // Note: CONTAINS is already registered above for arrays
    // We need to update it to support both arrays and strings
  }
}