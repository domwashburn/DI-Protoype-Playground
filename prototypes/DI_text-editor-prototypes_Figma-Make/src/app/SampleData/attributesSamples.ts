/**
 * Sample Attributes for Formula Testing
 * 
 * Defines mock data model attributes that can be referenced in formulas using #attribute.path syntax.
 * Each attribute has a defined type which is used for type checking in the evaluation engine.
 */

import type { Attribute } from '../components/editors/core/types';

/**
 * Sample attributes for testing formulas
 * Organized by domain/entity
 */
export const sampleAttributes: Attribute[] = [
  // ============================================================================
  // Customer Attributes
  // ============================================================================
  {
    id: 'attr-customer-1',
    path: 'customer.creditScore',
    type: 'number',
    description: 'Customer credit score (300-850)',
  },
  {
    id: 'attr-customer-2',
    path: 'customer.income',
    type: 'number',
    description: 'Customer annual income',
  },
  {
    id: 'attr-customer-3',
    path: 'customer.debtToIncomeRatio',
    type: 'number',
    description: 'Customer debt-to-income ratio (0-1)',
  },
  {
    id: 'attr-customer-4',
    path: 'customer.loyaltyTier',
    type: 'string',
    description: 'Customer loyalty tier (bronze, silver, gold)',
  },
  {
    id: 'attr-customer-5',
    path: 'customer.hasRecentBankruptcy',
    type: 'boolean',
    description: 'Whether customer has recent bankruptcy',
  },
  {
    id: 'attr-customer-6',
    path: 'customer.yearsOfCreditHistory',
    type: 'number',
    description: 'Years of credit history',
  },
  {
    id: 'attr-customer-7',
    path: 'customer.accountAge',
    type: 'number',
    description: 'Age of customer account in days',
  },
  {
    id: 'attr-customer-8',
    path: 'customer.customerSatisfaction',
    type: 'number',
    description: 'Customer satisfaction rating (1-5)',
  },
  
  // ============================================================================
  // Order Attributes
  // ============================================================================
  {
    id: 'attr-order-1',
    path: 'order.total',
    type: 'number',
    description: 'Total order amount',
  },
  {
    id: 'attr-order-2',
    path: 'order.weight',
    type: 'number',
    description: 'Package weight in kg',
  },
  {
    id: 'attr-order-3',
    path: 'order.destination.distance',
    type: 'number',
    description: 'Shipping distance in km',
  },
  {
    id: 'attr-order-4',
    path: 'order.shippingSpeed',
    type: 'string',
    description: 'Shipping speed option (standard, express, overnight)',
  },
  
  // ============================================================================
  // Transaction Attributes
  // ============================================================================
  {
    id: 'attr-transaction-1',
    path: 'transaction.amount',
    type: 'number',
    description: 'Transaction amount',
  },
  {
    id: 'attr-transaction-2',
    path: 'transaction.foreignCountry',
    type: 'boolean',
    description: 'Whether transaction is from foreign country',
  },
  
  // ============================================================================
  // Account Attributes
  // ============================================================================
  {
    id: 'attr-account-1',
    path: 'account.apiCallsThisMonth',
    type: 'number',
    description: 'Number of API calls this month',
  },
  
  // ============================================================================
  // Sensor Attributes
  // ============================================================================
  {
    id: 'attr-sensor-1',
    path: 'sensor.temperatureCelsius',
    type: 'number',
    description: 'Temperature in Celsius',
  },
  {
    id: 'attr-sensor-2',
    path: 'sensor.calibrationOffset',
    type: 'number',
    description: 'Calibration offset for sensor',
  },
  
  // ============================================================================
  // Employee Attributes
  // ============================================================================
  {
    id: 'attr-employee-1',
    path: 'employee.tasksCompleted',
    type: 'number',
    description: 'Number of tasks completed',
  },
  {
    id: 'attr-employee-2',
    path: 'employee.tasksAssigned',
    type: 'number',
    description: 'Number of tasks assigned',
  },
  {
    id: 'attr-employee-3',
    path: 'employee.customerSatisfaction',
    type: 'number',
    description: 'Customer satisfaction rating (1-5)',
  },
  {
    id: 'attr-employee-4',
    path: 'employee.overtimeHours',
    type: 'number',
    description: 'Overtime hours worked',
  },
  {
    id: 'attr-employee-5',
    path: 'employee.hourlyRate',
    type: 'number',
    description: 'Hourly wage rate',
  },
  
  // ============================================================================
  // Timesheet Attributes
  // ============================================================================
  {
    id: 'attr-timesheet-1',
    path: 'timesheet.clockIn',
    type: 'time',
    description: 'Clock in time',
  },
  {
    id: 'attr-timesheet-2',
    path: 'timesheet.clockOut',
    type: 'time',
    description: 'Clock out time',
  },
  
  // ============================================================================
  // Appointment Attributes
  // ============================================================================
  {
    id: 'attr-appointment-1',
    path: 'appointment.requestedDate',
    type: 'date',
    description: 'Appointment requested date',
  },
  {
    id: 'attr-appointment-2',
    path: 'appointment.preferredDate',
    type: 'date',
    description: 'Customer preferred appointment date',
  },
  
  // ============================================================================
  // Inventory Attributes
  // ============================================================================
  {
    id: 'attr-inventory-1',
    path: 'inventory.currentStock',
    type: 'number',
    description: 'Current stock quantity',
  },
  {
    id: 'attr-inventory-2',
    path: 'inventory.maxCapacity',
    type: 'number',
    description: 'Maximum capacity',
  },
  {
    id: 'attr-inventory-3',
    path: 'inventory.leadTimeDays',
    type: 'number',
    description: 'Lead time in days',
  },
  
  // ============================================================================
  // Ticket Attributes (Support/SLA)
  // ============================================================================
  {
    id: 'attr-ticket-1',
    path: 'ticket.createdAt',
    type: 'datetime',
    description: 'Ticket created timestamp',
  },
  {
    id: 'attr-ticket-2',
    path: 'ticket.closedAt',
    type: 'datetime',
    description: 'Ticket closed timestamp',
  },
  {
    id: 'attr-ticket-3',
    path: 'ticket.priority',
    type: 'string',
    description: 'Ticket priority (low, normal, high, urgent)',
  },
  
  // ============================================================================
  // Survey Attributes
  // ============================================================================
  {
    id: 'attr-survey-1',
    path: 'survey.wouldRecommend',
    type: 'boolean',
    description: 'Would recommend to others',
  },
  {
    id: 'attr-survey-2',
    path: 'survey.easeOfUse',
    type: 'number',
    description: 'Ease of use rating (1-5)',
  },
  {
    id: 'attr-survey-3',
    path: 'survey.supportQuality',
    type: 'number',
    description: 'Support quality rating (1-5)',
  },
  
  // ============================================================================
  // Inspection Attributes
  // ============================================================================
  {
    id: 'attr-inspection-1',
    path: 'inspection.defectsFound',
    type: 'number',
    description: 'Number of defects found',
  },
  {
    id: 'attr-inspection-2',
    path: 'inspection.totalInspected',
    type: 'number',
    description: 'Total items inspected',
  },
  
  // ============================================================================
  // Production Attributes
  // ============================================================================
  {
    id: 'attr-production-1',
    path: 'production.machineAge',
    type: 'number',
    description: 'Machine age in years',
  },
];

/**
 * Get attribute by path
 */
export function getAttributeByPath(path: string): Attribute | undefined {
  return sampleAttributes.find(attr => attr.path === path);
}

/**
 * Get all attributes of a specific type
 */
export function getAttributesByType(type: Attribute['type']): Attribute[] {
  return sampleAttributes.filter(attr => attr.type === type);
}

/**
 * Get attributes by entity/domain (first part of path)
 */
export function getAttributesByDomain(domain: string): Attribute[] {
  return sampleAttributes.filter(attr => attr.path.startsWith(`${domain}.`));
}
