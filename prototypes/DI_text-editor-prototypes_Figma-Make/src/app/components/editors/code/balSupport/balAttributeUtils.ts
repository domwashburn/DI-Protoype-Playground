/**
 * BAL Attribute Utilities
 * 
 * Utilities for extracting and parsing dot-notation attributes from BAL code
 * and converting them to nested structures for the test panel UI.
 */

/**
 * BAL keywords to exclude from attribute detection
 */
const BAL_KEYWORDS = new Set([
  // Control flow
  'if', 'then', 'else', 'elsif', 'elseif', 'otherwise', 'end',
  // Statements
  'set', 'to', 'define', 'function', 'return',
  // Iteration
  'for', 'each', 'in', 'while', 'do',
  // Logical
  'and', 'or', 'not',
  // Predicates
  'is', 'null', 'empty', 'true', 'false',
  // Common natural language words
  'the', 'of', 'a', 'an',
]);

/**
 * Check if a word is a BAL keyword
 */
function isBALKeyword(word: string): boolean {
  return BAL_KEYWORDS.has(word.toLowerCase());
}

/**
 * Extract attributes referenced in BAL code
 * Supports: object.property, object.property.subproperty
 * Supports: object.'property with spaces'
 * 
 * @param code - BAL code to extract attributes from
 * @returns Array of unique attribute paths
 * 
 * @example
 * extractBALAttributes("if employee.salary > 50000 then...")
 * // Returns: ["employee.salary"]
 * 
 * @example
 * extractBALAttributes("set cost to order.total + order.shipping.cost")
 * // Returns: ["order.total", "order.shipping.cost"]
 */
export function extractBALAttributes(code: string): string[] {
  const attributes = new Set<string>();
  
  // Regex to match dot-notation attribute references
  // Matches: word.word, word.word.word, etc.
  // Supports spaces in attribute names: employee.'years of service'
  const attrPattern = /\b([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*|\.'[^']+'))+\b/g;
  
  const matches = code.matchAll(attrPattern);
  for (const match of matches) {
    const attr = match[0];
    
    // Exclude patterns that start with keywords
    const firstPart = attr.split('.')[0];
    if (!isBALKeyword(firstPart)) {
      // Clean up quoted parts: employee.'years of service' → employee.years of service
      const cleanAttr = attr.replace(/'/g, '');
      attributes.add(cleanAttr);
    }
  }
  
  return Array.from(attributes).sort();
}

/**
 * Attribute definition for test panel
 */
export interface AttributeDefinition {
  path: string; // 'employee.salary', 'customer.address.city'
  type: 'string' | 'number' | 'boolean' | 'date' | 'time' | 'datetime';
  description?: string;
  defaultValue?: any;
  unit?: string; // 'USD', 'days', 'kg', etc.
}

/**
 * Nested attribute node for hierarchical UI
 */
export interface NestedAttributeNode {
  // If this is a leaf node (actual attribute)
  type?: 'string' | 'number' | 'boolean' | 'date' | 'time' | 'datetime';
  description?: string;
  defaultValue?: any;
  unit?: string;
  fullPath?: string;
  
  // If this is an object node (has children)
  [key: string]: NestedAttributeNode | any;
}

/**
 * Parse flat dot-notation attributes into nested object structure
 * For hierarchical test panel UI
 * 
 * @param attributeDefs - Flat array of attribute definitions
 * @returns Nested object structure
 * 
 * @example
 * parseAttributeHierarchy([
 *   { path: 'employee.salary', type: 'number' },
 *   { path: 'employee.name', type: 'string' },
 *   { path: 'order.total', type: 'number' }
 * ])
 * // Returns:
 * // {
 * //   employee: {
 * //     salary: { type: 'number', fullPath: 'employee.salary' },
 * //     name: { type: 'string', fullPath: 'employee.name' }
 * //   },
 * //   order: {
 * //     total: { type: 'number', fullPath: 'order.total' }
 * //   }
 * // }
 */
export function parseAttributeHierarchy(
  attributeDefs: AttributeDefinition[]
): Record<string, NestedAttributeNode> {
  const root: Record<string, any> = {};
  
  attributeDefs.forEach(def => {
    const parts = def.path.split('.');
    let current = root;
    
    parts.forEach((part, i) => {
      const isLeaf = i === parts.length - 1;
      
      if (isLeaf) {
        // Leaf node - actual attribute with type
        current[part] = {
          type: def.type,
          description: def.description,
          defaultValue: def.defaultValue,
          unit: def.unit,
          fullPath: def.path
        };
      } else {
        // Intermediate node - nested object
        if (!current[part] || typeof current[part] !== 'object' || current[part].type) {
          // Don't overwrite leaf nodes
          current[part] = {};
        }
        current = current[part];
      }
    });
  });
  
  return root;
}

/**
 * Get nested value from object using dot-notation path
 * 
 * @param obj - Object to get value from
 * @param path - Array of keys representing path
 * @returns Value at path, or undefined if not found
 * 
 * @example
 * getNestedValue({ employee: { salary: 50000 } }, ['employee', 'salary'])
 * // Returns: 50000
 */
export function getNestedValue(obj: any, path: string[]): any {
  let current = obj;
  for (const part of path) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return current;
}

/**
 * Set nested value in object using dot-notation path
 * Creates intermediate objects as needed
 * Returns new object (immutable)
 * 
 * @param obj - Object to set value in
 * @param path - Dot-notation path
 * @param value - Value to set
 * @returns New object with value set
 * 
 * @example
 * setNestedValue({}, 'employee.salary', 50000)
 * // Returns: { employee: { salary: 50000 } }
 */
export function setNestedValue(obj: any, path: string, value: any): any {
  const newObj = { ...obj };
  const parts = path.split('.');
  let current: any = newObj;
  
  // Navigate to parent, creating objects as needed
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    } else {
      // Clone intermediate objects for immutability
      current[parts[i]] = { ...current[parts[i]] };
    }
    current = current[parts[i]];
  }
  
  // Set leaf value
  current[parts[parts.length - 1]] = value;
  
  return newObj;
}

/**
 * Flatten nested attribute values to dot-notation for evaluation engine
 * 
 * @param nested - Nested object
 * @returns Flat object with dot-notation keys
 * 
 * @example
 * flattenAttributeValues({ employee: { salary: 50000, name: 'Alice' } })
 * // Returns: { 'employee.salary': 50000, 'employee.name': 'Alice' }
 */
export function flattenAttributeValues(nested: any): Record<string, any> {
  const flat: Record<string, any> = {};
  
  function traverse(obj: any, path: string[] = []) {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = [...path, key];
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        traverse(value, currentPath);
      } else {
        flat[currentPath.join('.')] = value;
      }
    }
  }
  
  traverse(nested);
  return flat;
}

/**
 * Check if a node is a leaf (has type property) or object node
 */
export function isLeafNode(node: any): boolean {
  return node && typeof node === 'object' && 'type' in node && 'fullPath' in node;
}

/**
 * Count properties in nested structure (for UI display)
 */
export function countProperties(node: any): number {
  if (isLeafNode(node)) {
    return 1;
  }
  
  let count = 0;
  for (const [key, value] of Object.entries(node)) {
    if (key === 'type' || key === 'description' || key === 'defaultValue' || key === 'unit' || key === 'fullPath') {
      continue;
    }
    count += countProperties(value);
  }
  return count;
}
