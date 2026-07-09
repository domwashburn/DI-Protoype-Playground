# Sample Data for Testing

This file contains sample annotations and content to populate your PDF annotation interface for testing and demonstration purposes.

## Mock PDF Content (5 Pages)

### Page 1: Overview
```
BASIC LOAN APPROVAL POLICY

United States Regulations

1. OVERVIEW

This document outlines the fundamental loan approval policy for financial institutions 
operating in the United States. The primary objective is to minimize credit risk while 
serving customer needs and maintaining regulatory compliance.

Key Principles:
• Risk-based decision making
• Regulatory compliance
• Customer service excellence
• Fair lending practices

All loan officers must adhere to these policies when evaluating loan applications 
and making approval decisions.
```

### Page 2: Borrower Eligibility Criteria
```
2. BORROWER ELIGIBILITY CRITERIA

2.1 MINIMUM REQUIREMENTS

Credit Score Requirements:
• Minimum credit score of 620 for most loan types
• Higher scores may qualify for better rates
• Credit history must show responsible borrowing

Financial Requirements:
• Stable employment history (minimum 2 years)
• Debt-to-income ratio not exceeding 43% for most loan types
• Sufficient income to cover loan payments
• Acceptable cash reserves

Legal Requirements:
• Legal resident or citizen of the United States
• Age 18 or older
• Valid government-issued identification
```

### Page 3: Loan Amount and Terms
```
3. LOAN AMOUNT AND TERMS

3.1 LOAN AMOUNT LIMITS

Maximum exposure to any single borrower: $500,000

Personal Loans:
• Minimum: $1,000
• Maximum: $50,000

Auto Loans:
• Maximum loan-to-value ratio of 120%
• Terms: 24-72 months
• New and used vehicles eligible

Mortgage Loans:
• Conforming loan limits apply
• Down payment requirements vary
• Terms: 15-30 years standard
```

### Page 4: Approval Process
```
4. APPROVAL PROCESS

4.1 APPLICATION PROCESS

Required Documentation:
• Income verification (2 years of tax returns, recent pay stubs)
• Credit authorization
• Asset documentation
• Employment verification

Decision Authority:
• Loan officers: Personal loans up to $10,000
• Senior officers: Loans $10,001 to $100,000
• Loan committee: Loans exceeding $100,000

Processing Timeline:
• Personal and auto loans: 3-5 business days
• Mortgage loans: 30-45 days
• Commercial loans: 45-60 days
```

### Page 5: Risk Management
```
5. RISK MANAGEMENT

5.1 RISK ASSESSMENT

Compliance Requirements:
• Comply with federal lending regulations
• Fair Credit Reporting Act (FCRA)
• Truth in Lending Act (TILA)
• Equal Credit Opportunity Act (ECOA)

Risk Analysis:
• Credit score analysis and credit report review
• Income and employment verification
• Collateral evaluation (when applicable)
• Debt service coverage ratio calculation

Quality Control:
• Monthly loan portfolio reviews
• Annual compliance audits
• Ongoing staff training
• Customer complaint monitoring
```

## Sample Annotations

Use these to populate the initial state (provide 10-15 diverse examples):

```typescript
const sampleAnnotations: Annotation[] = [
  {
    id: '1',
    pageNumber: 2,
    text: 'Minimum credit score of 620 for most loan types',
    comment: 'Key eligibility threshold - this defines a critical decision boundary for loan approval',
    tags: [
      { id: 'data-model-attribute', name: 'Data model/attribute', color: '#60A5FA' },
      { id: 'decision-logic-rules', name: 'Decision Logic/rules', color: '#A78BFA' }
    ],
    positions: [{ x: 0.133, y: 0.28, width: 0.58, height: 0.022 }],
    createdAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    pageNumber: 2,
    text: 'Debt-to-income ratio not exceeding 43% for most loan types',
    comment: 'Critical financial ratio calculation - input attribute with business rule constraint',
    tags: [
      { id: 'data-model-attribute', name: 'Data model/attribute', color: '#60A5FA' },
      { id: 'decision-logic-validation', name: 'Decision Logic/validation', color: '#A78BFA' }
    ],
    positions: [{ x: 0.133, y: 0.44, width: 0.69, height: 0.022 }],
    createdAt: new Date('2024-01-15T10:35:00')
  },
  {
    id: '3',
    pageNumber: 2,
    text: 'Stable employment history (minimum 2 years)',
    comment: 'Employment stability requirement - temporal validation rule',
    tags: [
      { id: 'data-model-inputs', name: 'Data model/inputs', color: '#60A5FA' },
      { id: 'decision-logic-validation', name: 'Decision Logic/validation', color: '#A78BFA' }
    ],
    positions: [{ x: 0.133, y: 0.36, width: 0.52, height: 0.022 }],
    createdAt: new Date('2024-01-15T10:40:00')
  },
  {
    id: '4',
    pageNumber: 4,
    text: 'Personal loans up to $10,000',
    comment: 'Loan officer authority limit - defines decision hierarchy and output constraints',
    tags: [
      { id: 'data-model-output', name: 'Data model/output', color: '#60A5FA' },
      { id: 'decision-logic-rules', name: 'Decision Logic/rules', color: '#A78BFA' }
    ],
    positions: [{ x: 0.133, y: 0.56, width: 0.34, height: 0.022 }],
    createdAt: new Date('2024-01-15T10:45:00')
  },
  {
    id: '5',
    pageNumber: 3,
    text: 'Maximum loan-to-value ratio of 120%',
    comment: 'LTV business rule - key risk calculation parameter for auto loans',
    tags: [
      { id: 'data-model-vocabulary', name: 'Data model/Vocabulary', color: '#60A5FA' },
      { id: 'decision-logic-rules', name: 'Decision Logic/rules', color: '#A78BFA' }
    ],
    positions: [{ x: 0.133, y: 0.52, width: 0.49, height: 0.022 }],
    createdAt: new Date('2024-01-15T10:50:00')
  },
  {
    id: '6',
    pageNumber: 4,
    text: 'Income verification (2 years of tax returns, recent pay stubs)',
    comment: 'Required documentation inputs - defines data collection requirements',
    tags: [
      { id: 'data-model-inputs', name: 'Data model/inputs', color: '#60A5FA' },
      { id: 'decision-logic-validation', name: 'Decision Logic/validation', color: '#A78BFA' }
    ],
    positions: [{ x: 0.133, y: 0.28, width: 0.73, height: 0.022 }],
    createdAt: new Date('2024-01-15T10:55:00')
  },
  {
    id: '7',
    pageNumber: 4,
    text: 'Personal and auto loans: 3-5 business days',
    comment: 'SLA constraint - defines expected processing timeline output',
    tags: [
      { id: 'data-model-output', name: 'Data model/output', color: '#60A5FA' }
    ],
    positions: [{ x: 0.133, y: 0.8, width: 0.52, height: 0.022 }],
    createdAt: new Date('2024-01-15T11:00:00')
  },
  {
    id: '8',
    pageNumber: 5,
    text: 'Credit score analysis and credit report review',
    comment: 'Core risk assessment process - defines key evaluation inputs',
    tags: [
      { id: 'data-model-inputs', name: 'Data model/inputs', color: '#60A5FA' },
      { id: 'decision-logic-validation', name: 'Decision Logic/validation', color: '#A78BFA' }
    ],
    positions: [{ x: 0.133, y: 0.19, width: 0.61, height: 0.022 }],
    createdAt: new Date('2024-01-15T11:05:00')
  },
  {
    id: '9',
    pageNumber: 1,
    text: 'Minimize credit risk while serving customer needs',
    comment: 'Key business objective - defines the optimization goal for decision logic',
    tags: [
      { id: 'data-model-vocabulary', name: 'Data model/Vocabulary', color: '#60A5FA' }
    ],
    positions: [{ x: 0.133, y: 0.45, width: 0.6, height: 0.022 }],
    createdAt: new Date('2024-01-15T11:10:00')
  },
  {
    id: '10',
    pageNumber: 5,
    text: 'Fair Credit Reporting Act (FCRA)',
    comment: 'Regulatory constraint - external compliance rule affecting decision logic',
    tags: [
      { id: 'data-model-vocabulary', name: 'Data model/Vocabulary', color: '#60A5FA' },
      { id: 'decision-logic-validation', name: 'Decision Logic/validation', color: '#A78BFA' }
    ],
    positions: [{ x: 0.133, y: 0.4, width: 0.43, height: 0.022 }],
    createdAt: new Date('2024-01-15T11:15:00')
  },
  {
    id: '11',
    pageNumber: 1,
    text: 'serving customer needs',
    comment: 'Key business objective - balance risk with customer satisfaction and market competitiveness',
    tags: [
      { id: 'business-objective-customer', name: 'Business Objective/customer service', color: '#34D399' },
      { id: 'business-objective-strategic', name: 'Business Objective/strategic goals', color: '#34D399' }
    ],
    positions: [{ x: 0.545, y: 0.45, width: 0.245, height: 0.022 }],
    createdAt: new Date('2024-01-15T11:20:00')
  },
  {
    id: '12',
    pageNumber: 4,
    text: '3-5 business days',
    comment: 'Processing time KPI - operational efficiency metric for loan approval turnaround',
    tags: [
      { id: 'kpi-operational', name: 'KPI/operational metrics', color: '#FBBF24' }
    ],
    positions: [{ x: 0.4, y: 0.8, width: 0.2, height: 0.022 }],
    createdAt: new Date('2024-01-15T11:25:00')
  },
  {
    id: '13',
    pageNumber: 2,
    text: 'Debt-to-income ratio not exceeding 43%',
    comment: 'Critical risk metric threshold - DTI ratio serves as both decision rule and risk KPI',
    tags: [
      { id: 'kpi-risk', name: 'KPI/risk metrics', color: '#FBBF24' },
      { id: 'decision-logic-rules', name: 'Decision Logic/rules', color: '#A78BFA' }
    ],
    positions: [{ x: 0.133, y: 0.44, width: 0.48, height: 0.022 }],
    createdAt: new Date('2024-01-15T11:30:00')
  },
  {
    id: '14',
    pageNumber: 5,
    text: 'Comply with federal lending regulations',
    comment: 'Compliance objective - ensures all loan decisions meet regulatory requirements',
    tags: [
      { id: 'business-objective-compliance', name: 'Business Objective/compliance', color: '#34D399' }
    ],
    positions: [{ x: 0.133, y: 0.12, width: 0.45, height: 0.022 }],
    createdAt: new Date('2024-01-15T11:35:00')
  },
  {
    id: '15',
    pageNumber: 3,
    text: 'Maximum exposure to any single borrower: $500,000',
    comment: 'Risk management limit - prevents concentration risk and supports portfolio diversification objective',
    tags: [
      { id: 'business-objective-risk', name: 'Business Objective/risk management', color: '#34D399' },
      { id: 'kpi-financial', name: 'KPI/financial metrics', color: '#FBBF24' }
    ],
    positions: [{ x: 0.133, y: 0.68, width: 0.58, height: 0.022 }],
    createdAt: new Date('2024-01-15T11:40:00')
  },
  {
    id: '16',
    pageNumber: 5,
    text: 'Monthly loan portfolio reviews',
    comment: 'Quality assurance KPI - regular portfolio monitoring to maintain loan quality standards',
    tags: [
      { id: 'kpi-quality', name: 'KPI/quality metrics', color: '#FBBF24' },
      { id: 'business-objective-risk', name: 'Business Objective/risk management', color: '#34D399' }
    ],
    positions: [{ x: 0.133, y: 0.65, width: 0.37, height: 0.022 }],
    createdAt: new Date('2024-01-15T11:45:00')
  }
];
```

## Testing Scenarios

### Scenario 1: Overlapping Highlights
Create two annotations on the same text to test overlapping:
- Annotation A: "Debt-to-income ratio not exceeding 43%" with Data model tag
- Annotation B: "not exceeding 43%" with KPI tag
- Should display both highlights with transparency

### Scenario 2: Multi-line Selection
Create an annotation that spans multiple lines:
- Text: "Income verification (2 years of tax returns, recent pay stubs)"
- Should create multiple position rectangles if text wraps

### Scenario 3: Tag Filtering
- Apply "Data model" filter → Should show annotations 1-10
- Apply "Business Objective" filter → Should show annotations 11, 14, 15, 16
- Apply "KPI" filter → Should show annotations 12, 13, 15, 16
- Clear filter → Should show all

### Scenario 4: Keyboard Navigation
- With no filter: Tab cycles through annotations 1-16 in order
- With "Data model" filter: Tab cycles through annotations 1-10 by visual position (page, then Y, then X)

### Scenario 5: Edit Mode Toggle
- View mode (default): Can select and navigate, cannot create/edit/delete
- Edit mode: Can create, edit, delete annotations

## Page Preview Text for PageSelector

```typescript
const getPagePreview = (pageNumber: number) => {
  const previews = {
    1: "BASIC LOAN APPROVAL POLICY\n\nUnited States Regulations\n\n1. OVERVIEW...",
    2: "2. BORROWER ELIGIBILITY CRITERIA\n\n2.1 MINIMUM REQUIREMENTS\nCredit Score • Income • Legal Status...",
    3: "3. LOAN AMOUNT AND TERMS\n\n3.1 LOAN AMOUNT LIMITS\nPersonal • Mortgage • Auto • Business...",
    4: "4. APPROVAL PROCESS\n\n4.1 APPLICATION PROCESS\nDocumentation • Authority • Timeline...",
    5: "5. RISK MANAGEMENT\n\n5.1 RISK ASSESSMENT\nCompliance • Quality Control • Appeals..."
  };
  return previews[pageNumber] || `Page ${pageNumber} content...`;
};
```

## Notes on Position Coordinates

All position coordinates are relative (0.0 to 1.0):

- **x**: Distance from left edge / page width (0.133 = 13.3% from left)
- **y**: Distance from top edge / page height (0.28 = 28% from top)
- **width**: Highlight width / page width (0.58 = 58% of page width)
- **height**: Highlight height / page height (0.022 = 2.2% of page height, ~1 line)

This ensures highlights scale properly with zoom and different viewport sizes.
