/**
 * Data Models for Credit Risk Assessment Service
 * 
 * Defines the data structures used by this service for input, output, and internal processing
 */

import type { DataModel } from '../../../../shared/types';

export const dataModels: DataModel[] = [
  // Customer Data Model
  {
    id: 'customer-data-model',
    hashId: 'dmcu1',
    
    name: 'Customer',
    displayName: 'Customer Data Model',
    description: 'Core customer information and attributes for credit assessment',
    
    serviceId: 'credit-risk-assessment',
    
    schema: {
      type: 'object',
      properties: {
        customerId: {
          type: 'string',
          description: 'Unique customer identifier',
        },
        firstName: {
          type: 'string',
          description: 'Customer first name',
        },
        lastName: {
          type: 'string',
          description: 'Customer last name',
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'Customer email address',
        },
        dateOfBirth: {
          type: 'string',
          format: 'date',
          description: 'Customer date of birth',
        },
        creditScore: {
          type: 'number',
          minimum: 300,
          maximum: 850,
          description: 'Current credit score',
        },
        annualIncome: {
          type: 'number',
          minimum: 0,
          description: 'Annual income in USD',
        },
        employmentStatus: {
          type: 'string',
          enum: ['employed', 'self-employed', 'unemployed', 'retired'],
          description: 'Current employment status',
        },
        yearsAtCurrentJob: {
          type: 'number',
          minimum: 0,
          description: 'Years at current employment',
        },
        monthlyDebt: {
          type: 'number',
          minimum: 0,
          description: 'Total monthly debt obligations',
        },
        monthlyIncome: {
          type: 'number',
          minimum: 0,
          description: 'Monthly gross income',
        },
      },
      required: ['customerId', 'firstName', 'lastName', 'email'],
    },
    
    version: '1.0.0',
    createdDate: '2025-06-24T15:45:12.000Z',
    lastUpdatedDate: '2025-06-24T15:45:12.000Z',
    createdBy: 'domwashburn@us.ibm.com',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
  },
  
  // Credit Application Data Model
  {
    id: 'credit-application-data-model',
    hashId: 'dmcr1',
    
    name: 'Credit Application',
    displayName: 'Credit Application Data Model',
    description: 'Credit application request data and terms',
    
    serviceId: 'credit-risk-assessment',
    
    schema: {
      type: 'object',
      properties: {
        applicationId: {
          type: 'string',
          description: 'Unique application identifier',
        },
        customerId: {
          type: 'string',
          description: 'Reference to customer',
        },
        requestedAmount: {
          type: 'number',
          minimum: 0,
          description: 'Requested credit amount in USD',
        },
        purpose: {
          type: 'string',
          enum: ['auto', 'home', 'personal', 'business', 'education'],
          description: 'Purpose of credit',
        },
        termMonths: {
          type: 'number',
          minimum: 1,
          description: 'Requested loan term in months',
        },
        downPayment: {
          type: 'number',
          minimum: 0,
          description: 'Down payment amount in USD',
        },
        collateralValue: {
          type: 'number',
          minimum: 0,
          description: 'Value of collateral if applicable',
        },
      },
      required: ['applicationId', 'customerId', 'requestedAmount', 'purpose'],
    },
    
    version: '1.0.0',
    createdDate: '2025-06-24T15:45:12.000Z',
    lastUpdatedDate: '2025-06-24T15:45:12.000Z',
    createdBy: 'domwashburn@us.ibm.com',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
  },
  
  // Risk Score Data Model
  {
    id: 'risk-score-data-model',
    hashId: 'dmrs1',
    
    name: 'Risk Score',
    displayName: 'Risk Score Data Model',
    description: 'Risk assessment output with decision and supporting factors',
    
    serviceId: 'credit-risk-assessment',
    
    schema: {
      type: 'object',
      properties: {
        riskScore: {
          type: 'number',
          minimum: 0,
          maximum: 100,
          description: 'Calculated risk score (0 = low risk, 100 = high risk)',
        },
        riskCategory: {
          type: 'string',
          enum: ['low', 'medium', 'high', 'very-high'],
          description: 'Risk category classification',
        },
        confidence: {
          type: 'number',
          minimum: 0,
          maximum: 1,
          description: 'Confidence level of the assessment (0-1)',
        },
        decision: {
          type: 'string',
          enum: ['approved', 'denied', 'manual-review'],
          description: 'Automated decision',
        },
        approvedAmount: {
          type: 'number',
          minimum: 0,
          description: 'Approved credit amount (may differ from requested)',
        },
        interestRate: {
          type: 'number',
          minimum: 0,
          description: 'Approved interest rate percentage',
        },
        factors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              factor: { 
                type: 'string',
                description: 'Risk factor name',
              },
              impact: { 
                type: 'number',
                description: 'Impact on risk score (-100 to +100)',
              },
              weight: {
                type: 'number',
                description: 'Weight in overall calculation (0-1)',
              },
              description: { 
                type: 'string',
                description: 'Human-readable explanation',
              },
            },
          },
          description: 'Contributing risk factors',
        },
      },
      required: ['riskScore', 'riskCategory', 'confidence', 'decision'],
    },
    
    version: '1.0.0',
    createdDate: '2025-06-24T15:45:12.000Z',
    lastUpdatedDate: '2025-06-24T15:45:12.000Z',
    createdBy: 'domwashburn@us.ibm.com',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
  },
];
