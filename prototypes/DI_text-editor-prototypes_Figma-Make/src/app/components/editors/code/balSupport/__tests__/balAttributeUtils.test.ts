/**
 * Tests for BAL Attribute Utilities
 */

import {
  extractBALAttributes,
  parseAttributeHierarchy,
  setNestedValue,
  getNestedValue,
  flattenAttributeValues,
  isLeafNode,
  countProperties
} from '../balAttributeUtils';

describe('extractBALAttributes', () => {
  it('extracts simple attributes', () => {
    const code = 'if employee.salary > 50000 then approve';
    const attrs = extractBALAttributes(code);
    expect(attrs).toEqual(['employee.salary']);
  });

  it('extracts multiple attributes', () => {
    const code = 'if employee.salary > 50000 and customer.age > 25 then approve';
    const attrs = extractBALAttributes(code);
    expect(attrs).toContain('employee.salary');
    expect(attrs).toContain('customer.age');
  });

  it('extracts nested attributes', () => {
    const code = 'set cost to order.shipping.cost + order.total';
    const attrs = extractBALAttributes(code);
    expect(attrs).toContain('order.shipping.cost');
    expect(attrs).toContain('order.total');
  });

  it('excludes BAL keywords', () => {
    const code = 'if then else set to do end';
    const attrs = extractBALAttributes(code);
    expect(attrs).toHaveLength(0);
  });

  it('handles quoted properties', () => {
    const code = "if employee.'years of service' > 5 then approve";
    const attrs = extractBALAttributes(code);
    expect(attrs).toContain('employee.years of service');
  });
});

describe('parseAttributeHierarchy', () => {
  it('parses flat attributes to nested structure', () => {
    const defs = [
      { path: 'employee.salary', type: 'number' as const },
      { path: 'employee.name', type: 'string' as const },
    ];
    
    const hierarchy = parseAttributeHierarchy(defs);
    
    expect(hierarchy.employee).toBeDefined();
    expect(hierarchy.employee.salary).toEqual({
      type: 'number',
      fullPath: 'employee.salary',
      description: undefined,
      defaultValue: undefined,
      unit: undefined,
    });
    expect(hierarchy.employee.name).toEqual({
      type: 'string',
      fullPath: 'employee.name',
      description: undefined,
      defaultValue: undefined,
      unit: undefined,
    });
  });

  it('handles deeply nested attributes', () => {
    const defs = [
      { path: 'order.shipping.address.city', type: 'string' as const },
    ];
    
    const hierarchy = parseAttributeHierarchy(defs);
    
    expect(hierarchy.order.shipping.address.city).toEqual({
      type: 'string',
      fullPath: 'order.shipping.address.city',
      description: undefined,
      defaultValue: undefined,
      unit: undefined,
    });
  });

  it('preserves metadata', () => {
    const defs = [
      { 
        path: 'employee.salary', 
        type: 'number' as const,
        description: 'Annual salary',
        defaultValue: 50000,
        unit: 'USD'
      },
    ];
    
    const hierarchy = parseAttributeHierarchy(defs);
    
    expect(hierarchy.employee.salary).toEqual({
      type: 'number',
      fullPath: 'employee.salary',
      description: 'Annual salary',
      defaultValue: 50000,
      unit: 'USD',
    });
  });
});

describe('setNestedValue', () => {
  it('sets value at simple path', () => {
    const obj = {};
    const result = setNestedValue(obj, 'name', 'John');
    expect(result).toEqual({ name: 'John' });
  });

  it('sets value at nested path', () => {
    const obj = {};
    const result = setNestedValue(obj, 'employee.salary', 60000);
    expect(result).toEqual({ employee: { salary: 60000 } });
  });

  it('sets value at deeply nested path', () => {
    const obj = {};
    const result = setNestedValue(obj, 'order.shipping.address.city', 'Boston');
    expect(result).toEqual({
      order: {
        shipping: {
          address: {
            city: 'Boston'
          }
        }
      }
    });
  });

  it('preserves existing values', () => {
    const obj = { employee: { name: 'John' } };
    const result = setNestedValue(obj, 'employee.salary', 60000);
    expect(result).toEqual({
      employee: {
        name: 'John',
        salary: 60000
      }
    });
  });

  it('is immutable', () => {
    const obj = { employee: { name: 'John' } };
    const result = setNestedValue(obj, 'employee.salary', 60000);
    expect(obj).toEqual({ employee: { name: 'John' } });
    expect(result).not.toBe(obj);
  });
});

describe('getNestedValue', () => {
  it('gets value at simple path', () => {
    const obj = { name: 'John' };
    const result = getNestedValue(obj, ['name']);
    expect(result).toBe('John');
  });

  it('gets value at nested path', () => {
    const obj = { employee: { salary: 60000 } };
    const result = getNestedValue(obj, ['employee', 'salary']);
    expect(result).toBe(60000);
  });

  it('returns undefined for missing path', () => {
    const obj = { employee: { name: 'John' } };
    const result = getNestedValue(obj, ['employee', 'salary']);
    expect(result).toBeUndefined();
  });
});

describe('flattenAttributeValues', () => {
  it('flattens simple object', () => {
    const nested = { name: 'John', age: 30 };
    const flat = flattenAttributeValues(nested);
    expect(flat).toEqual({ name: 'John', age: 30 });
  });

  it('flattens nested object', () => {
    const nested = {
      employee: {
        salary: 60000,
        name: 'John'
      }
    };
    const flat = flattenAttributeValues(nested);
    expect(flat).toEqual({
      'employee.salary': 60000,
      'employee.name': 'John'
    });
  });

  it('flattens deeply nested object', () => {
    const nested = {
      order: {
        shipping: {
          address: {
            city: 'Boston'
          }
        }
      }
    };
    const flat = flattenAttributeValues(nested);
    expect(flat).toEqual({
      'order.shipping.address.city': 'Boston'
    });
  });
});

describe('isLeafNode', () => {
  it('identifies leaf node', () => {
    const node = { type: 'number', fullPath: 'employee.salary' };
    expect(isLeafNode(node)).toBe(true);
  });

  it('identifies object node', () => {
    const node = { salary: {}, name: {} };
    expect(isLeafNode(node)).toBe(false);
  });
});

describe('countProperties', () => {
  it('counts leaf node as 1', () => {
    const node = { type: 'number', fullPath: 'employee.salary' };
    expect(countProperties(node)).toBe(1);
  });

  it('counts nested properties', () => {
    const node = {
      salary: { type: 'number', fullPath: 'employee.salary' },
      name: { type: 'string', fullPath: 'employee.name' }
    };
    expect(countProperties(node)).toBe(2);
  });

  it('counts deeply nested properties', () => {
    const node = {
      employee: {
        salary: { type: 'number', fullPath: 'x.employee.salary' },
        department: {
          name: { type: 'string', fullPath: 'x.employee.department.name' }
        }
      }
    };
    expect(countProperties(node)).toBe(2);
  });
});
