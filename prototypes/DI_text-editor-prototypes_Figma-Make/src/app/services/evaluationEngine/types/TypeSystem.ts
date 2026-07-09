/**
 * Type System for Formula & BAL Evaluation Engine
 * 
 * Defines the type system used for runtime type checking and coercion.
 * Supports: number, string, boolean, date, datetime, time types.
 * 
 * @module evaluationEngine/types/TypeSystem
 */

/**
 * Primitive types supported by the evaluation engine
 */
export type PrimitiveType = 'number' | 'string' | 'boolean' | 'date' | 'datetime' | 'time' | 'null' | 'undefined';

/**
 * List type - homogeneous collection of primitive values, objects, or nested lists
 * Supports nested lists (e.g., list of lists)
 */
export interface ListType {
  kind: 'list';
  elementType: PrimitiveType | ObjectType | ListType;
}

/**
 * Object type - structured data with named properties
 * All objects in an array must have the same shape (homogeneous)
 */
export interface ObjectType {
  kind: 'object';
  properties: Map<string, FormulaType>;
}

/**
 * All formula types (primitive, list, or object)
 */
export type FormulaType = PrimitiveType | ListType | ObjectType;

/**
 * Time value wrapper to distinguish from plain numbers
 * Internal representation is always milliseconds
 */
export class TimeValue {
  constructor(public milliseconds: number) {}
  
  toMinutes(): number {
    return this.milliseconds / 60000;
  }
  
  toHours(): number {
    return this.milliseconds / 3600000;
  }
  
  toSeconds(): number {
    return this.milliseconds / 1000;
  }
  
  toString(): string {
    return this.toHHMMSS();
  }
  
  toHHMMSS(): string {
    const totalSeconds = Math.floor(this.milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  toHHMM(): string {
    const totalMinutes = Math.floor(this.milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
}

/**
 * Type guard to check if a type is a list type
 */
export function isList(type: FormulaType): type is ListType {
  return typeof type === 'object' && type !== null && type.kind === 'list';
}

/**
 * Type guard to check if a type is an object type
 */
export function isObject(type: FormulaType): type is ObjectType {
  return typeof type === 'object' && type !== null && type.kind === 'object';
}

/**
 * Get element type from a list type
 */
export function getListElementType(type: ListType): PrimitiveType | ObjectType | ListType {
  return type.elementType;
}

/**
 * Create a list type
 */
export function createListType(elementType: PrimitiveType | ObjectType | ListType): ListType {
  return { kind: 'list', elementType };
}

/**
 * Create an object type
 */
export function createObjectType(properties: Map<string, FormulaType>): ObjectType {
  return { kind: 'object', properties };
}

/**
 * Check if two object types have the same shape
 */
export function areObjectShapesCompatible(type1: ObjectType, type2: ObjectType): boolean {
  // Check same number of properties
  if (type1.properties.size !== type2.properties.size) {
    return false;
  }
  
  // Check all properties match
  for (const [key, type] of type1.properties) {
    const otherType = type2.properties.get(key);
    if (!otherType) {
      return false;
    }
    
    // Check if types match
    if (!areFormulaTypesEqual(type, otherType)) {
      return false;
    }
  }
  
  return true;
}

/**
 * Check if two formula types are equal
 */
export function areFormulaTypesEqual(type1: FormulaType, type2: FormulaType): boolean {
  // Primitive types
  if (typeof type1 === 'string' && typeof type2 === 'string') {
    return type1 === type2;
  }
  
  // List types
  if (isList(type1) && isList(type2)) {
    return areFormulaTypesEqual(type1.elementType, type2.elementType);
  }
  
  // Object types
  if (isObject(type1) && isObject(type2)) {
    return areObjectShapesCompatible(type1, type2);
  }
  
  return false;
}

/**
 * Infer the runtime type of a value
 */
export function inferType(value: any): FormulaType {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) {
    // Infer list element type from first element
    if (value.length === 0) {
      // Empty array - cannot infer type
      throw new Error('Cannot infer type of empty list');
    }
    const elementType = inferType(value[0]);
    // Nested lists are now supported
    return createListType(elementType);
  }
  if (value instanceof TimeValue) return 'time';
  if (value instanceof Date) {
    // Check if this is a datetime (has time component) or just a date
    // If time is 00:00:00, treat as date; otherwise as datetime
    const hours = value.getHours();
    const minutes = value.getMinutes();
    const seconds = value.getSeconds();
    const hasTime = hours !== 0 || minutes !== 0 || seconds !== 0;
    return hasTime ? 'datetime' : 'date';
  }
  if (typeof value === 'object' && value !== null) {
    // Plain object - infer object type
    const properties = new Map<string, FormulaType>();
    for (const [key, val] of Object.entries(value)) {
      const propType = inferType(val);
      // Support nested objects and lists within objects
      properties.set(key, propType);
    }
    return createObjectType(properties);
  }
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') return 'string';
  if (typeof value === 'boolean') return 'boolean';
  
  return 'undefined';
}

/**
 * Check if a value is of a specific type
 */
export function isType(value: any, expectedType: FormulaType): boolean {
  const actualType = inferType(value);
  
  // Handle list types
  if (isList(expectedType) && isList(actualType)) {
    return expectedType.elementType === actualType.elementType;
  }
  
  return actualType === expectedType;
}

/**
 * Type coercion configuration
 */
export interface TypeCoercionConfig {
  /** Allow implicit type coercion */
  allowCoercion: boolean;
  /** Throw error on coercion failure */
  strictCoercion: boolean;
}

/**
 * Default type coercion config
 */
export const DEFAULT_COERCION_CONFIG: TypeCoercionConfig = {
  allowCoercion: true,
  strictCoercion: false
};

/**
 * Coerce value to target type
 * 
 * @param value - Value to coerce
 * @param targetType - Target type
 * @param config - Coercion configuration
 * @returns Coerced value
 * @throws TypeError if coercion fails and strictCoercion is true
 */
export function coerceType(
  value: any,
  targetType: PrimitiveType,
  config: TypeCoercionConfig = DEFAULT_COERCION_CONFIG
): any {
  const sourceType = inferType(value);
  
  // Already correct type
  if (sourceType === targetType) {
    return value;
  }
  
  // Allow date/datetime interchangeability
  if ((sourceType === 'date' || sourceType === 'datetime') && 
      (targetType === 'date' || targetType === 'datetime')) {
    return value;
  }
  
  // No coercion allowed
  if (!config.allowCoercion) {
    if (config.strictCoercion) {
      throw new Error(`Cannot coerce ${sourceType} to ${targetType}`);
    }
    return value;
  }
  
  // Perform coercion
  try {
    return performCoercion(value, sourceType, targetType);
  } catch (error) {
    if (config.strictCoercion) {
      throw error;
    }
    return value; // Return original value if coercion fails
  }
}

/**
 * Perform type coercion
 */
function performCoercion(value: any, sourceType: PrimitiveType, targetType: PrimitiveType): any {
  // String conversions
  if (targetType === 'string') {
    if (sourceType === 'date' || sourceType === 'datetime') {
      return (value as Date).toISOString();
    }
    return String(value);
  }
  
  // Number conversions
  if (targetType === 'number') {
    if (sourceType === 'string') {
      const num = Number(value);
      if (isNaN(num)) {
        throw new Error(`Cannot convert "${value}" to number`);
      }
      return num;
    }
    if (sourceType === 'boolean') {
      return value ? 1 : 0;
    }
    if (sourceType === 'date' || sourceType === 'datetime') {
      return (value as Date).getTime();
    }
  }
  
  // Boolean conversions
  if (targetType === 'boolean') {
    if (sourceType === 'string') {
      const lower = (value as string).toLowerCase();
      if (lower === 'true' || lower === '1') return true;
      if (lower === 'false' || lower === '0') return false;
      throw new Error(`Cannot convert "${value}" to boolean`);
    }
    if (sourceType === 'number') {
      return value !== 0;
    }
  }
  
  // Date/Datetime conversions
  if (targetType === 'date' || targetType === 'datetime') {
    if (sourceType === 'string') {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error(`Cannot convert "${value}" to ${targetType}`);
      }
      return date;
    }
    if (sourceType === 'number') {
      return new Date(value);
    }
    if (sourceType === 'date' || sourceType === 'datetime') {
      // Already a date, just return it
      return value;
    }
  }
  
  // Time conversions
  if (targetType === 'time') {
    if (sourceType === 'number') {
      // Assume number is milliseconds
      return new TimeValue(value);
    }
    if (sourceType === 'string') {
      // Parse time string formats
      // HH:MM:SS format
      const hhmmssMatch = value.match(/^(\d+):(\d+):(\d+)$/);
      if (hhmmssMatch) {
        const hours = parseInt(hhmmssMatch[1], 10);
        const minutes = parseInt(hhmmssMatch[2], 10);
        const seconds = parseInt(hhmmssMatch[3], 10);
        const ms = (hours * 3600 + minutes * 60 + seconds) * 1000;
        return new TimeValue(ms);
      }
      
      // HH:MM format
      const hhmmMatch = value.match(/^(\d+):(\d+)$/);
      if (hhmmMatch) {
        const hours = parseInt(hhmmMatch[1], 10);
        const minutes = parseInt(hhmmMatch[2], 10);
        const ms = (hours * 3600 + minutes * 60) * 1000;
        return new TimeValue(ms);
      }
      
      // Try parsing as number
      const num = Number(value);
      if (!isNaN(num)) {
        return new TimeValue(num);
      }
      
      throw new Error(`Cannot convert "${value}" to time`);
    }
  }
  
  throw new Error(`Cannot coerce ${sourceType} to ${targetType}`);
}

/**
 * Check if two types are compatible for a given operation
 * 
 * @param leftType - Left operand type
 * @param rightType - Right operand type
 * @param operator - Operator being applied
 * @returns True if types are compatible
 */
export function areTypesCompatible(
  leftType: PrimitiveType,
  rightType: PrimitiveType,
  operator?: string
): boolean {
  // Same type is always compatible
  if (leftType === rightType) {
    return true;
  }
  
  // Date/datetime are interchangeable
  if ((leftType === 'date' || leftType === 'datetime') && 
      (rightType === 'date' || rightType === 'datetime')) {
    return true;
  }
  
  // Null/undefined handling
  if (leftType === 'null' || leftType === 'undefined' || 
      rightType === 'null' || rightType === 'undefined') {
    return false;
  }
  
  // Operator-specific compatibility
  if (operator) {
    // Arithmetic operators (including exponentiation ^)
    if (['+', '-', '*', '/', '%', '^'].includes(operator)) {
      // Addition allows string concatenation
      if (operator === '+' && (leftType === 'string' || rightType === 'string')) {
        return true;
      }
      
      // Subtraction allows date - date
      if (operator === '-' && 
          (leftType === 'date' || leftType === 'datetime') && 
          (rightType === 'date' || rightType === 'datetime')) {
        return true;
      }
      
      // Other arithmetic requires numbers
      return leftType === 'number' && rightType === 'number';
    }
    
    // Comparison operators
    if (['<', '>', '<=', '>='].includes(operator)) {
      // Numbers
      if (leftType === 'number' && rightType === 'number') {
        return true;
      }
      
      // Dates
      if ((leftType === 'date' || leftType === 'datetime') && 
          (rightType === 'date' || rightType === 'datetime')) {
        return true;
      }
      
      // Times
      if (leftType === 'time' && rightType === 'time') {
        return true;
      }
      
      // Strings (lexicographic comparison)
      if (leftType === 'string' && rightType === 'string') {
        return true;
      }
      
      return false;
    }
    
    // Equality operators
    if (['=', '==', '!=', '<>'].includes(operator)) {
      // Can compare any types for equality
      return true;
    }
    
    // Logical operators
    if (['and', 'or', 'AND', 'OR'].includes(operator)) {
      return leftType === 'boolean' && rightType === 'boolean';
    }
  }
  
  // No operator specified - check general compatibility
  // Numbers and booleans can be coerced
  if ((leftType === 'number' && rightType === 'boolean') ||
      (leftType === 'boolean' && rightType === 'number')) {
    return true;
  }
  
  // String can concatenate with anything
  if (leftType === 'string' || rightType === 'string') {
    return true;
  }
  
  return false;
}

/**
 * Get type compatibility information
 */
export function getTypeCompatibility(sourceType: PrimitiveType, targetType: PrimitiveType): {
  compatible: boolean;
  requiresCoercion: boolean;
  canCoerce: boolean;
} {
  // Exact match
  if (sourceType === targetType) {
    return { compatible: true, requiresCoercion: false, canCoerce: false };
  }
  
  // Date/datetime are interchangeable
  if ((sourceType === 'date' || sourceType === 'datetime') && 
      (targetType === 'date' || targetType === 'datetime')) {
    return { compatible: true, requiresCoercion: false, canCoerce: false };
  }
  
  // Number to time coercion (for date arithmetic results)
  if (sourceType === 'number' && targetType === 'time') {
    return { compatible: true, requiresCoercion: true, canCoerce: true };
  }
  
  // Try coercion
  try {
    // Test with dummy value
    const testValue = sourceType === 'number' ? 0 :
                      sourceType === 'string' ? '' :
                      sourceType === 'boolean' ? false :
                      sourceType === 'date' || sourceType === 'datetime' ? new Date() :
                      sourceType === 'time' ? new TimeValue(0) :
                      null;
    
    if (testValue !== null) {
      performCoercion(testValue, sourceType, targetType);
      return { compatible: true, requiresCoercion: true, canCoerce: true };
    }
  } catch {
    // Coercion not possible
  }
  
  return { compatible: false, requiresCoercion: false, canCoerce: false };
}

/**
 * Format a value according to its type
 */
export function formatValue(value: any, type?: FormulaType): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  
  const valueType = type || inferType(value);
  
  // Handle list types
  if (Array.isArray(value)) {
    const elements = value.map(el => formatValue(el));
    return `[${elements.join(', ')}]`;
  }
  
  if (isList(valueType)) {
    // Type indicates list but value might not be
    if (Array.isArray(value)) {
      const elements = value.map(el => formatValue(el));
      return `[${elements.join(', ')}]`;
    }
  }
  
  // Handle object types
  if (isObject(valueType) || (typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date) && !(value instanceof TimeValue))) {
    const pairs: string[] = [];
    for (const [key, val] of Object.entries(value)) {
      pairs.push(`${key}: ${formatValue(val)}`);
    }
    return `{${pairs.join(', ')}}`;
  }
  
  if (valueType === 'time' && value instanceof TimeValue) {
    return value.toHHMMSS();
  }
  
  if ((valueType === 'date' || valueType === 'datetime') && value instanceof Date) {
    if (valueType === 'datetime') {
      return value.toISOString();
    }
    // Format as YYYY-MM-DD for date only
    return value.toISOString().split('T')[0];
  }
  
  if (valueType === 'string') {
    return `"${value}"`;
  }
  
  return String(value);
}