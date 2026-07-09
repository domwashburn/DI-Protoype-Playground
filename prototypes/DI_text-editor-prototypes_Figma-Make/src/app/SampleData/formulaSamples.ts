/**
 * Formula Editor Sample Data
 * 
 * Sample formulas and variables for testing the Formula Editor.
 */

import type { Variable, Threshold } from '../components/editors/core/types';

export interface FormulaDocument {
  id: string;
  title: string;
  description: string;
  formula: string;
  variables: Variable[];
  // Formula metadata
  formulaName: string;
  formulaReturnType: 'number' | 'string' | 'boolean' | 'date' | 'time';
  thresholds?: Threshold[];
  createdAt: string;
  updatedAt: string;
  category?: 'business-rules' | 'basic-functions' | 'arrays-objects' | 'loops' | 'verbalizations' | 'datetime' | 'threshold-strategies' | 'error-tests';
}

export const formulaSamples: FormulaDocument[] = [
  {
    id: 'discount-calculator',
    title: 'Customer Discount Calculation',
    description: 'Calculate customer discount based on order total and loyalty status',
    formula: `IF $orderTotal > 1000 THEN
  IF $loyaltyTier = "gold" THEN
    $orderTotal * 0.15
  ELSIF $loyaltyTier = "silver" THEN
    $orderTotal * 0.10
  ELSE
    $orderTotal * 0.05
  END
ELSE
  0
END`,
    variables: [
      {
        id: 'var-1',
        name: 'orderTotal',
        type: 'number',
        dataSource: '#order.total',
        description: 'Total order amount',
        verbalization: 'order total',
      },
      {
        id: 'var-2',
        name: 'loyaltyTier',
        type: 'string',
        dataSource: '#customer.loyaltyTier',
        description: 'Customer loyalty tier (bronze, silver, gold)',
        verbalization: 'loyalty tier',
      },
    ],
    // Formula metadata
    formulaName: 'calculateCustomerDiscount',
    formulaReturnType: 'number',
    category: 'business-rules',
    createdAt: '2025-10-20T10:00:00Z',
    updatedAt: '2025-10-23T15:30:00Z',
  },
  {
    id: 'loan-eligibility',
    title: 'Loan Eligibility Score',
    description: 'Calculate loan eligibility score based on income, credit score, and debt ratio',
    formula: `$baseScore = (#customer.creditScore / 850) * 100

IF #customer.income >= 50000 THEN
  $baseScore = $baseScore + 10
END

IF $debtRatio < 0.30 THEN
  $baseScore = $baseScore + 15
ELSIF $debtRatio > 0.50 THEN
  $baseScore = $baseScore - 20
END

$baseScore`,
    variables: [
      {
        id: 'var-3',
        name: 'baseScore',
        type: 'number',
        description: 'Calculated base score',
        verbalization: 'base score',
      },
      {
        id: 'var-4',
        name: 'debtRatio',
        type: 'number',
        dataSource: '#customer.debtToIncomeRatio',
        description: 'Customer debt-to-income ratio',
        verbalization: 'debt ratio',
      },
    ],
    // Formula metadata
    formulaName: 'calculateLoanEligibilityScore',
    formulaReturnType: 'number',
    category: 'business-rules',
    thresholds: [
      {
        id: 'loan-thresh-1',
        min: 0,
        max: 40,
        label: 'Not Eligible',
        color: '#DA1E28',
        severity: 'error',
      },
      {
        id: 'loan-thresh-2',
        min: 41,
        max: 65,
        label: 'Review Required',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'loan-thresh-3',
        min: 66,
        max: 85,
        label: 'Eligible',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'loan-thresh-4',
        min: 86,
        max: null,
        label: 'Highly Eligible',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-21T09:00:00Z',
    updatedAt: '2025-10-24T11:00:00Z',
  },
  {
    id: 'shipping-cost',
    title: 'Shipping Cost Calculator',
    description: 'Calculate shipping cost based on weight, distance, and speed',
    formula: `$baseCost = $weight * 0.5

IF #order.destination.distance > 100 THEN
  $baseCost = $baseCost + ($distance - 100) * 0.1
END

IF $shippingSpeed = "express" THEN
  $baseCost * 1.5
ELSIF $shippingSpeed = "overnight" THEN
  $baseCost * 2.0
ELSE
  $baseCost
END`,
    variables: [
      {
        id: 'var-5',
        name: 'weight',
        type: 'number',
        dataSource: '#order.weight',
        description: 'Package weight in kg',
      },
      {
        id: 'var-6',
        name: 'distance',
        type: 'number',
        dataSource: '#order.destination.distance',
        description: 'Shipping distance in km',
      },
      {
        id: 'var-7',
        name: 'shippingSpeed',
        type: 'string',
        dataSource: '#order.shippingSpeed',
        description: 'Shipping speed option (standard, express, overnight)',
      },
      {
        id: 'var-8',
        name: 'baseCost',
        type: 'number',
        description: 'Calculated base shipping cost',
      },
    ],
    // Formula metadata
    formulaName: 'calculateShippingCost',
    formulaReturnType: 'number',
    category: 'business-rules',
    createdAt: '2025-10-22T14:00:00Z',
    updatedAt: '2025-10-24T10:15:00Z',
  },
  {
    id: 'simple-calculation',
    title: 'Simple Math Example',
    description: 'Basic mathematical formula for testing',
    formula: `$result = ($value1 + $value2) * $multiplier

IF $result > 100 THEN
  $result - 10
ELSE
  $result
END`,
    variables: [
      {
        id: 'var-9',
        name: 'value1',
        type: 'number',
        description: 'First value',
      },
      {
        id: 'var-10',
        name: 'value2',
        type: 'number',
        description: 'Second value',
      },
      {
        id: 'var-11',
        name: 'multiplier',
        type: 'number',
        description: 'Multiplier value',
      },
      {
        id: 'var-12',
        name: 'result',
        type: 'number',
        description: 'Calculated result',
      },
    ],
    // Formula metadata
    formulaName: 'simpleMathExample',
    formulaReturnType: 'number',
    category: 'basic-functions',
    createdAt: '2025-10-24T08:00:00Z',
    updatedAt: '2025-10-24T08:00:00Z',
  },
  {
    id: 'explicit-return-example',
    title: 'Explicit Return Example (IBM ADS/ODM Style)',
    description: 'Demonstrates explicit RETURN statement syntax',
    formula: `$taxRate = 0.08
$subtotal = $quantity * $unitPrice
$tax = $subtotal * $taxRate

RETURN $subtotal + $tax`,
    variables: [
      {
        id: 'var-ret-1',
        name: 'quantity',
        type: 'number',
        description: 'Quantity ordered',
      },
      {
        id: 'var-ret-2',
        name: 'unitPrice',
        type: 'number',
        description: 'Price per unit',
      },
      {
        id: 'var-ret-3',
        name: 'taxRate',
        type: 'number',
        description: 'Calculated tax rate',
      },
      {
        id: 'var-ret-4',
        name: 'subtotal',
        type: 'number',
        description: 'Subtotal before tax',
      },
      {
        id: 'var-ret-5',
        name: 'tax',
        type: 'number',
        description: 'Tax amount',
      },
    ],
    // Formula metadata
    formulaName: 'calculateOrderTotal',
    formulaReturnType: 'number',
    category: 'basic-functions',
    createdAt: '2025-10-25T11:00:00Z',
    updatedAt: '2025-10-25T11:00:00Z',
  },
  {
    id: 'multi-type-extraction',
    title: 'Multi-Type Extraction Demo',
    description: 'Demonstrates automatic option extraction for all data types',
    formula: `IF $status = "pending" OR $status = "approved" THEN
  IF $priority > 5 OR $priority = 3 THEN
    IF $startDate > "2024-01-01" AND $startDate < "2024-12-31" THEN
      IF $isActive = true THEN
        100
      ELSE
        50
      END
    ELSE
      25
    END
  ELSE
    10
  END
ELSE
  0
END`,
    variables: [
      {
        id: 'var-multi-1',
        name: 'status',
        type: 'string',
        description: 'Request status (will extract: pending, approved)',
      },
      {
        id: 'var-multi-2',
        name: 'priority',
        type: 'number',
        description: 'Priority level (will extract: 5, 3)',
      },
      {
        id: 'var-multi-3',
        name: 'startDate',
        type: 'date',
        dateFormat: 'YYYY-MM-DD',
        description: 'Start date (will extract: 2024-01-01, 2024-12-31)',
      },
      {
        id: 'var-multi-4',
        name: 'isActive',
        type: 'boolean',
        description: 'Active status (will extract: true)',
      },
    ],
    // Formula metadata
    formulaName: 'multiTypeExtractionDemo',
    formulaReturnType: 'number',
    category: 'basic-functions',
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  
  // ============================================================
  // THRESHOLD EVALUATION EXAMPLES - Gap Handling Strategies
  // ============================================================
  
  {
    id: 'credit-score-with-gaps',
    title: 'Credit Score Assessment (With Gaps)',
    description: 'Demonstrates threshold gaps and gap handling strategies',
    formula: `$adjustedScore = #customer.creditScore

IF #customer.hasRecentBankruptcy = true THEN
  $adjustedScore = $adjustedScore - 100
END

IF #customer.yearsOfCreditHistory >= 10 THEN
  $adjustedScore = $adjustedScore + 20
END

$adjustedScore`,
    variables: [
      {
        id: 'var-gap-1',
        name: 'adjustedScore',
        type: 'number',
        description: 'Credit score adjusted for history and bankruptcy',
      },
    ],
    // Formula metadata
    formulaName: 'assessCreditScore',
    formulaReturnType: 'number',
    // Thresholds with intentional gaps to demonstrate gap handling
    thresholds: [
      {
        id: 'credit-gap-1',
        min: 300,
        max: 579,
        label: 'Poor',
        color: '#DA1E28',
        severity: 'error',
      },
      // GAP: 580-599 (20 point gap)
      {
        id: 'credit-gap-2',
        min: 600,
        max: 669,
        label: 'Fair',
        color: '#F1C21B',
        severity: 'warning',
      },
      // GAP: 670-689 (20 point gap)
      {
        id: 'credit-gap-3',
        min: 690,
        max: 739,
        label: 'Good',
        color: '#0F62FE',
        severity: 'info',
      },
      // GAP: 740-759 (20 point gap)
      {
        id: 'credit-gap-4',
        min: 760,
        max: 799,
        label: 'Very Good',
        color: '#24A148',
        severity: 'success',
      },
      // GAP: 800-819 (20 point gap)
      {
        id: 'credit-gap-5',
        min: 820,
        max: null,
        label: 'Excellent',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-25T14:00:00Z',
    updatedAt: '2025-10-25T14:00:00Z',
  },
  
  {
    id: 'pricing-tier-interpolate',
    title: 'Usage-Based Pricing (Interpolation)',
    description: 'Demonstrates interpolation strategy for smooth pricing curves',
    formula: `$monthlyUsage = #account.apiCallsThisMonth / 1000

// Calculate base usage score
IF $monthlyUsage <= 100 THEN
  $usageScore = 10
ELSIF $monthlyUsage <= 500 THEN
  $usageScore = 25
ELSIF $monthlyUsage <= 1000 THEN
  $usageScore = 50
ELSE
  $usageScore = 100
END

$usageScore`,
    variables: [
      {
        id: 'var-price-1',
        name: 'monthlyUsage',
        type: 'number',
        description: 'Monthly API usage (in thousands)',
      },
      {
        id: 'var-price-2',
        name: 'usageScore',
        type: 'number',
        description: 'Calculated pricing tier score',
      },
    ],
    // Formula metadata
    formulaName: 'calculateUsagePricing',
    formulaReturnType: 'number',
    // Numeric thresholds perfect for interpolation
    thresholds: [
      {
        id: 'price-interp-1',
        min: 0,
        max: 10,
        label: 'Free Tier',
        color: '#0F62FE',
        severity: 'info',
      },
      // GAP: 10.01-24.99 (good for interpolation)
      {
        id: 'price-interp-2',
        min: 25,
        max: 49,
        label: 'Starter',
        color: '#24A148',
        severity: 'success',
      },
      // GAP: 49.01-99.99 (good for interpolation)
      {
        id: 'price-interp-3',
        min: 100,
        max: null,
        label: 'Enterprise',
        color: '#8A3FFC',
        severity: 'info',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-25T14:15:00Z',
    updatedAt: '2025-10-25T14:15:00Z',
  },
  
  {
    id: 'risk-assessment-overlapping',
    title: 'Risk Assessment (Overlapping Ranges)',
    description: 'Demonstrates overlap detection - INVALID configuration',
    formula: `$riskScore = 0

IF #transaction.amount > 10000 THEN
  $riskScore = $riskScore + 30
END

IF #customer.accountAge < 90 THEN
  $riskScore = $riskScore + 25
END

IF #transaction.foreignCountry = true THEN
  $riskScore = $riskScore + 20
END

$riskScore`,
    variables: [
      {
        id: 'var-risk-1',
        name: 'riskScore',
        type: 'number',
        description: 'Calculated risk score (0-100)',
      },
    ],
    // Formula metadata
    formulaName: 'assessTransactionRisk',
    formulaReturnType: 'number',
    // Intentionally overlapping thresholds (WILL SHOW ERRORS)
    thresholds: [
      {
        id: 'risk-overlap-1',
        min: 0,
        max: 30,
        label: 'Low Risk',
        color: '#24A148',
        severity: 'success',
      },
      {
        id: 'risk-overlap-2',
        min: 25,  // OVERLAP with previous (25-30)
        max: 60,
        label: 'Medium Risk',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'risk-overlap-3',
        min: 55,  // OVERLAP with previous (55-60)
        max: null,
        label: 'High Risk',
        color: '#DA1E28',
        severity: 'error',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-25T14:30:00Z',
    updatedAt: '2025-10-25T14:30:00Z',
  },
  
  {
    id: 'temperature-monitoring',
    title: 'Temperature Monitoring (Nearest Strategy)',
    description: 'Industrial temperature thresholds with small gaps for nearest strategy',
    formula: `$currentTemp = #sensor.temperatureCelsius

IF #sensor.calibrationOffset THEN
  $currentTemp = $currentTemp + #sensor.calibrationOffset
END

$currentTemp`,
    variables: [
      {
        id: 'var-temp-1',
        name: 'currentTemp',
        type: 'number',
        description: 'Current temperature with calibration',
      },
    ],
    // Formula metadata
    formulaName: 'monitorTemperature',
    formulaReturnType: 'number',
    // Thresholds with small gaps (0.1°C) - nearest makes sense
    thresholds: [
      {
        id: 'temp-1',
        min: -273,
        max: 0,
        label: 'Below Freezing',
        color: '#0F62FE',
        severity: 'info',
      },
      // GAP: 0.01-19.99 (small gap, nearest is appropriate)
      {
        id: 'temp-2',
        min: 20,
        max: 25,
        label: 'Normal Range',
        color: '#24A148',
        severity: 'success',
      },
      // GAP: 25.01-29.99 (small gap, nearest is appropriate)
      {
        id: 'temp-3',
        min: 30,
        max: 40,
        label: 'Elevated',
        color: '#F1C21B',
        severity: 'warning',
      },
      // GAP: 40.01-49.99 (small gap, nearest is appropriate)
      {
        id: 'temp-4',
        min: 50,
        max: null,
        label: 'Critical',
        color: '#DA1E28',
        severity: 'error',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-25T14:45:00Z',
    updatedAt: '2025-10-25T14:45:00Z',
  },
  
  {
    id: 'performance-rating-continuous',
    title: 'Employee Performance Rating (Continuous)',
    description: 'Continuous thresholds with no gaps - demonstrates perfect coverage',
    formula: `$baseScore = (#employee.tasksCompleted / #employee.tasksAssigned) * 100

IF #employee.customerSatisfaction >= 4.5 THEN
  $baseScore = $baseScore + 10
END

IF #employee.overtimeHours > 20 THEN
  $baseScore = $baseScore - 5
END

$baseScore`,
    variables: [
      {
        id: 'var-perf-1',
        name: 'baseScore',
        type: 'number',
        description: 'Calculated performance score',
      },
    ],
    // Formula metadata
    formulaName: 'calculatePerformanceRating',
    formulaReturnType: 'number',
    // Perfectly continuous thresholds (NO GAPS)
    thresholds: [
      {
        id: 'perf-1',
        min: 0,
        max: 59,
        label: 'Needs Improvement',
        color: '#DA1E28',
        severity: 'error',
      },
      {
        id: 'perf-2',
        min: 60,
        max: 74,
        label: 'Meets Expectations',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'perf-3',
        min: 75,
        max: 89,
        label: 'Exceeds Expectations',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'perf-4',
        min: 90,
        max: null,
        label: 'Outstanding',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-25T15:00:00Z',
    updatedAt: '2025-10-25T15:00:00Z',
  },
  
  {
    id: 'inventory-reorder-conservative',
    title: 'Inventory Reorder Point (Lower Strategy)',
    description: 'Conservative approach - always use lower threshold in gaps',
    formula: `$stockPercentage = (#inventory.currentStock / #inventory.maxCapacity) * 100

IF #inventory.leadTimeDays > 14 THEN
  $stockPercentage = $stockPercentage - 10
END

$stockPercentage`,
    variables: [
      {
        id: 'var-inv-1',
        name: 'stockPercentage',
        type: 'number',
        description: 'Current stock as percentage of capacity',
      },
    ],
    // Formula metadata
    formulaName: 'calculateReorderPoint',
    formulaReturnType: 'number',
    // Thresholds with gaps - lower strategy is conservative
    thresholds: [
      {
        id: 'inv-1',
        min: 0,
        max: 15,
        label: 'Critical - Order Now',
        color: '#DA1E28',
        severity: 'error',
      },
      // GAP: 15.01-24.99 (use lower = "Critical")
      {
        id: 'inv-2',
        min: 25,
        max: 50,
        label: 'Low - Schedule Order',
        color: '#F1C21B',
        severity: 'warning',
      },
      // GAP: 50.01-74.99 (use lower = "Low")
      {
        id: 'inv-3',
        min: 75,
        max: null,
        label: 'Adequate Stock',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-25T15:15:00Z',
    updatedAt: '2025-10-25T15:15:00Z',
  },
  
  {
    id: 'sla-response-aggressive',
    title: 'SLA Response Time (Upper Strategy)',
    description: 'Aggressive approach - always use upper threshold in gaps. Uses MINUTES_BETWEEN function for datetime calculations.',
    formula: `$responseTimeMinutes = MINUTES_BETWEEN(#ticket.createdAt, #ticket.closedAt)

IF #ticket.priority = "urgent" THEN
  $responseTimeMinutes = $responseTimeMinutes * 1.5
END

$responseTimeMinutes`,
    variables: [
      {
        id: 'var-sla-2',
        name: 'responseTimeMinutes',
        type: 'number',
        description: 'Response time in minutes (adjusted for priority)',
      },
    ],
    // Formula metadata
    formulaName: 'calculateSLACompliance',
    formulaReturnType: 'number',
    // Thresholds with gaps - upper strategy is aggressive
    thresholds: [
      {
        id: 'sla-1',
        min: 0,
        max: 15,
        label: 'Excellent',
        color: '#24A148',
        severity: 'success',
      },
      // GAP: 15.01-29.99 (use upper = "Good")
      {
        id: 'sla-2',
        min: 30,
        max: 60,
        label: 'Good',
        color: '#0F62FE',
        severity: 'info',
      },
      // GAP: 60.01-119.99 (use upper = "Acceptable")
      {
        id: 'sla-3',
        min: 120,
        max: 240,
        label: 'Acceptable',
        color: '#F1C21B',
        severity: 'warning',
      },
      // GAP: 240.01-359.99 (use upper = "SLA Breach")
      {
        id: 'sla-4',
        min: 360,
        max: null,
        label: 'SLA Breach',
        color: '#DA1E28',
        severity: 'error',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-25T15:30:00Z',
    updatedAt: '2025-10-28T10:00:00Z',
  },
  
  {
    id: 'customer-satisfaction-default',
    title: 'Customer Satisfaction (Default Strategy)',
    description: 'Returns default value for gaps - useful for undefined cases',
    formula: `$totalScore = 0

IF #survey.wouldRecommend = true THEN
  $totalScore = $totalScore + 40
END

IF #survey.easeOfUse >= 4 THEN
  $totalScore = $totalScore + 30
END

IF #survey.supportQuality >= 4 THEN
  $totalScore = $totalScore + 30
END

$totalScore`,
    variables: [
      {
        id: 'var-sat-1',
        name: 'totalScore',
        type: 'number',
        description: 'Calculated satisfaction score (0-100)',
      },
    ],
    // Formula metadata
    formulaName: 'calculateCustomerSatisfaction',
    formulaReturnType: 'number',
    // Sparse thresholds with large gaps - default strategy makes sense
    thresholds: [
      {
        id: 'sat-1',
        min: 0,
        max: 30,
        label: 'Unhappy',
        color: '#DA1E28',
        severity: 'error',
      },
      // LARGE GAP: 30.01-69.99 (would return "Neutral" as default)
      {
        id: 'sat-2',
        min: 70,
        max: null,
        label: 'Satisfied',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-25T15:45:00Z',
    updatedAt: '2025-10-25T15:45:00Z',
  },
  
  {
    id: 'quality-control-strict',
    title: 'Quality Control (Error Strategy - Strict)',
    description: 'Strict mode - throws error on gaps to force complete coverage',
    formula: `$defectRate = (#inspection.defectsFound / #inspection.totalInspected) * 100

IF #production.machineAge > 5 THEN
  $defectRate = $defectRate + 2
END

$defectRate`,
    variables: [
      {
        id: 'var-qc-1',
        name: 'defectRate',
        type: 'number',
        description: 'Calculated defect rate percentage',
      },
    ],
    // Formula metadata
    formulaName: 'calculateQualityScore',
    formulaReturnType: 'number',
    // Intentionally incomplete thresholds - error strategy enforces fixing
    thresholds: [
      {
        id: 'qc-1',
        min: 0,
        max: 2,
        label: 'Excellent Quality',
        color: '#24A148',
        severity: 'success',
      },
      // GAP: 2.01-4.99 (WILL THROW ERROR with error strategy)
      {
        id: 'qc-2',
        min: 5,
        max: 10,
        label: 'Acceptable Quality',
        color: '#F1C21B',
        severity: 'warning',
      },
      // GAP: 10.01-14.99 (WILL THROW ERROR with error strategy)
      {
        id: 'qc-3',
        min: 15,
        max: null,
        label: 'Poor Quality',
        color: '#DA1E28',
        severity: 'error',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-25T16:00:00Z',
    updatedAt: '2025-10-25T16:00:00Z',
    category: 'threshold-strategies',
  },
  
  // ============================================================
  // VERBALIZATION EXAMPLES - Natural Language Variable Names
  // ============================================================
  
  {
    id: 'verbalization-basic',
    title: 'Natural Language Variables (Basic)',
    description: 'Use natural language names like \'customer age\' instead of $customerAge',
    formula: `'customer age' = 30
'annual income' = 75000
'has premium status' = true

IF 'customer age' >= 21 AND 'annual income' >= 50000 THEN
  'credit tier' = "Gold"
ELSIF 'customer age' >= 18 AND 'annual income' >= 30000 THEN
  'credit tier' = "Silver"
ELSE
  'credit tier' = "Bronze"
END

RETURN 'credit tier'`,
    variables: [
      {
        id: 'verb-1',
        name: 'customerAge',
        type: 'number',
        description: 'Customer age in years',
        verbalization: 'customer age',
      },
      {
        id: 'verb-2',
        name: 'annualIncome',
        type: 'number',
        description: 'Annual income',
        verbalization: 'annual income',
      },
      {
        id: 'verb-3',
        name: 'hasPremiumStatus',
        type: 'boolean',
        description: 'Premium membership status',
        verbalization: 'has premium status',
      },
      {
        id: 'verb-4',
        name: 'creditTier',
        type: 'string',
        description: 'Calculated credit tier',
        verbalization: 'credit tier',
      },
    ],
    formulaName: 'naturalLanguageBasic',
    formulaReturnType: 'string',
    category: 'verbalizations',
    createdAt: '2025-11-07T10:00:00Z',
    updatedAt: '2025-11-07T10:00:00Z',
  },
  
  {
    id: 'verbalization-mixed',
    title: 'Mixed Symbolic and Natural Language',
    description: 'Mix $symbolic and \'natural language\' syntax in same formula',
    formula: `// Can use both styles interchangeably
$basePrice = 1000
'discount percentage' = 0.15

'discounted price' = $basePrice * (1 - 'discount percentage')

IF 'discounted price' < 500 THEN
  $finalPrice = 500  // Minimum price
ELSE
  $finalPrice = 'discounted price'
END

RETURN $finalPrice`,
    variables: [
      {
        id: 'verb-mix-1',
        name: 'basePrice',
        type: 'number',
        description: 'Base price before discount',
      },
      {
        id: 'verb-mix-2',
        name: 'discountPercentage',
        type: 'number',
        description: 'Discount as decimal (0.15 = 15%)',
        verbalization: 'discount percentage',
      },
      {
        id: 'verb-mix-3',
        name: 'discountedPrice',
        type: 'number',
        description: 'Price after discount applied',
        verbalization: 'discounted price',
      },
      {
        id: 'verb-mix-4',
        name: 'finalPrice',
        type: 'number',
        description: 'Final price with minimum enforced',
      },
    ],
    formulaName: 'mixedSyntaxExample',
    formulaReturnType: 'number',
    category: 'verbalizations',
    createdAt: '2025-11-07T10:15:00Z',
    updatedAt: '2025-11-07T10:15:00Z',
  },
  
  {
    id: 'verbalization-complex',
    title: 'Complex Natural Language Example',
    description: 'Complex business logic using natural language for better readability',
    formula: `'years of service' = 5
'base salary' = 50000
'performance score' = 8.5
'has leadership role' = true

// Calculate bonus percentage
'bonus percentage' = ('years of service' * 2 + 'performance score') / 100

// Add leadership bonus
IF 'has leadership role' THEN
  'bonus percentage' = 'bonus percentage' + 0.05
END

// Calculate total compensation
'bonus amount' = 'base salary' * 'bonus percentage'
'total compensation' = 'base salary' + 'bonus amount'

// Apply caps
IF 'bonus amount' > 20000 THEN
  'bonus amount' = 20000
  'total compensation' = 'base salary' + 20000
END

RETURN 'total compensation'`,
    variables: [
      {
        id: 'verb-comp-1',
        name: 'yearsOfService',
        type: 'number',
        description: 'Years employed',
        verbalization: 'years of service',
      },
      {
        id: 'verb-comp-2',
        name: 'baseSalary',
        type: 'number',
        description: 'Base annual salary',
        verbalization: 'base salary',
      },
      {
        id: 'verb-comp-3',
        name: 'performanceScore',
        type: 'number',
        description: 'Performance rating (1-10)',
        verbalization: 'performance score',
      },
      {
        id: 'verb-comp-4',
        name: 'hasLeadershipRole',
        type: 'boolean',
        description: 'Has management responsibilities',
        verbalization: 'has leadership role',
      },
      {
        id: 'verb-comp-5',
        name: 'bonusPercentage',
        type: 'number',
        description: 'Calculated bonus percentage',
        verbalization: 'bonus percentage',
      },
      {
        id: 'verb-comp-6',
        name: 'bonusAmount',
        type: 'number',
        description: 'Bonus amount in dollars',
        verbalization: 'bonus amount',
      },
      {
        id: 'verb-comp-7',
        name: 'totalCompensation',
        type: 'number',
        description: 'Total compensation including bonus',
        verbalization: 'total compensation',
      },
    ],
    formulaName: 'complexNaturalLanguage',
    formulaReturnType: 'number',
    category: 'verbalizations',
    createdAt: '2025-11-07T10:30:00Z',
    updatedAt: '2025-11-07T10:30:00Z',
  },
  
  {
    id: 'verbalization-autocomplete-test',
    title: 'Test Autocomplete Features',
    description: 'Try typing $ or \' to see autocomplete suggestions',
    formula: `// Type $ to see symbolic variables
// Type ' to see verbalized variables

'customer name' = "John Doe"
'customer age' = 25
'is adult' = 'customer age' >= 18

IF 'is adult' THEN
  'welcome message' = "Welcome, " + 'customer name'
ELSE
  'welcome message' = "Parental consent required"
END

RETURN 'welcome message'`,
    variables: [
      {
        id: 'verb-auto-1',
        name: 'customerName',
        type: 'string',
        description: 'Customer full name',
        verbalization: 'customer name',
      },
      {
        id: 'verb-auto-2',
        name: 'customerAge',
        type: 'number',
        description: 'Customer age in years',
        verbalization: 'customer age',
      },
      {
        id: 'verb-auto-3',
        name: 'isAdult',
        type: 'boolean',
        description: 'Whether customer is 18 or older',
        verbalization: 'is adult',
      },
      {
        id: 'verb-auto-4',
        name: 'welcomeMessage',
        type: 'string',
        description: 'Generated welcome message',
        verbalization: 'welcome message',
      },
    ],
    formulaName: 'autocompleteTest',
    formulaReturnType: 'string',
    category: 'verbalizations',
    createdAt: '2025-11-07T10:45:00Z',
    updatedAt: '2025-11-07T10:45:00Z',
  },
  
  {
    id: 'verbalization-arrays',
    title: 'Natural Language - Working with Arrays',
    description: 'Use natural language with list/array types like \'product names\' and \'available colors\'',
    formula: `// Arrays/Lists with natural language names
'product names' = ["Laptop", "Mouse", "Keyboard", "Monitor"]
'available colors' = ["Red", "Blue", "Green", "Black"]

// Work with the arrays using natural language
'total products' = LENGTH('product names')
'first product' = FIRST('product names')
'last product' = LAST('product names')

// Combine and filter
'all items' = CONCAT('product names', 'available colors')
'item count' = LENGTH('all items')

// Check for specific items
'has monitor' = CONTAINS('product names', "Monitor")
'has yellow' = CONTAINS('available colors', "Yellow")

// Sort alphabetically
'sorted products' = SORT('product names')

// Create display text
IF 'has monitor' THEN
  'message' = "We have " + 'first product' + " and " + LENGTH('available colors') + " colors available"
ELSE
  'message' = "Limited inventory"
END

RETURN 'message'`,
    variables: [
      {
        id: 'verb-arr-1',
        name: 'productNames',
        type: 'list',
        description: 'List of product names',
        verbalization: 'product names',
      },
      {
        id: 'verb-arr-2',
        name: 'availableColors',
        type: 'list',
        description: 'List of available colors',
        verbalization: 'available colors',
      },
      {
        id: 'verb-arr-3',
        name: 'totalProducts',
        type: 'number',
        description: 'Count of products',
        verbalization: 'total products',
      },
      {
        id: 'verb-arr-4',
        name: 'firstProduct',
        type: 'string',
        description: 'First product in list',
        verbalization: 'first product',
      },
      {
        id: 'verb-arr-5',
        name: 'lastProduct',
        type: 'string',
        description: 'Last product in list',
        verbalization: 'last product',
      },
      {
        id: 'verb-arr-6',
        name: 'allItems',
        type: 'list',
        description: 'Combined list of all items',
        verbalization: 'all items',
      },
      {
        id: 'verb-arr-7',
        name: 'itemCount',
        type: 'number',
        description: 'Total count of all items',
        verbalization: 'item count',
      },
      {
        id: 'verb-arr-8',
        name: 'hasMonitor',
        type: 'boolean',
        description: 'Whether monitor is in inventory',
        verbalization: 'has monitor',
      },
      {
        id: 'verb-arr-9',
        name: 'hasYellow',
        type: 'boolean',
        description: 'Whether yellow color is available',
        verbalization: 'has yellow',
      },
      {
        id: 'verb-arr-10',
        name: 'sortedProducts',
        type: 'list',
        description: 'Alphabetically sorted products',
        verbalization: 'sorted products',
      },
      {
        id: 'verb-arr-11',
        name: 'message',
        type: 'string',
        description: 'Generated inventory message',
        verbalization: 'message',
      },
    ],
    formulaName: 'inventoryCheck',
    formulaReturnType: 'string',
    category: 'verbalizations',
    createdAt: '2025-11-07T11:00:00Z',
    updatedAt: '2025-11-07T11:00:00Z',
  },
  
  {
    id: 'verbalization-objects',
    title: 'Natural Language - Working with Objects',
    description: 'Use natural language with object types like \'customer info\' and access properties naturally',
    formula: `// Define customer object with natural language
'customer info' = {
  name: "Sarah Johnson",
  age: 28,
  email: "sarah@example.com",
  isPremium: true
}

// Define order object
'current order' = {
  orderId: "ORD-12345",
  total: 250.00,
  itemCount: 3,
  isExpress: false
}

// Access object properties using natural language
'customer name' = 'customer info'.name
'customer age' = 'customer info'.age
'is premium member' = 'customer info'.isPremium

'order total' = 'current order'.total
'order item count' = 'current order'.itemCount

// Business logic with objects
IF 'is premium member' AND 'order total' >= 100 THEN
  'discount percentage' = 15
  'shipping cost' = 0
ELSIF 'order total' >= 50 THEN
  'discount percentage' = 10
  'shipping cost' = 5.99
ELSE
  'discount percentage' = 0
  'shipping cost' = 9.99
END

// Calculate final amounts
'discount amount' = 'order total' * ('discount percentage' / 100)
'final total' = 'order total' - 'discount amount' + 'shipping cost'

// Create confirmation message
'confirmation' = 'customer name' + ", your order #" + 'current order'.orderId + 
                 " totals $" + 'final total' + 
                 " (includes " + 'discount percentage' + "% discount)"

RETURN 'confirmation'`,
    variables: [
      {
        id: 'verb-obj-1',
        name: 'customerInfo',
        type: 'object',
        description: 'Customer information object',
        verbalization: 'customer info',
      },
      {
        id: 'verb-obj-2',
        name: 'currentOrder',
        type: 'object',
        description: 'Current order details',
        verbalization: 'current order',
      },
      {
        id: 'verb-obj-3',
        name: 'customerName',
        type: 'string',
        description: 'Customer full name',
        verbalization: 'customer name',
      },
      {
        id: 'verb-obj-4',
        name: 'customerAge',
        type: 'number',
        description: 'Customer age',
        verbalization: 'customer age',
      },
      {
        id: 'verb-obj-5',
        name: 'isPremiumMember',
        type: 'boolean',
        description: 'Premium membership status',
        verbalization: 'is premium member',
      },
      {
        id: 'verb-obj-6',
        name: 'orderTotal',
        type: 'number',
        description: 'Order total amount',
        verbalization: 'order total',
      },
      {
        id: 'verb-obj-7',
        name: 'orderItemCount',
        type: 'number',
        description: 'Number of items in order',
        verbalization: 'order item count',
      },
      {
        id: 'verb-obj-8',
        name: 'discountPercentage',
        type: 'number',
        description: 'Discount percentage applied',
        verbalization: 'discount percentage',
      },
      {
        id: 'verb-obj-9',
        name: 'shippingCost',
        type: 'number',
        description: 'Shipping cost',
        verbalization: 'shipping cost',
      },
      {
        id: 'verb-obj-10',
        name: 'discountAmount',
        type: 'number',
        description: 'Discount amount in dollars',
        verbalization: 'discount amount',
      },
      {
        id: 'verb-obj-11',
        name: 'finalTotal',
        type: 'number',
        description: 'Final total after discount and shipping',
        verbalization: 'final total',
      },
      {
        id: 'verb-obj-12',
        name: 'confirmation',
        type: 'string',
        description: 'Order confirmation message',
        verbalization: 'confirmation',
      },
    ],
    formulaName: 'orderProcessing',
    formulaReturnType: 'string',
    category: 'verbalizations',
    createdAt: '2025-11-07T11:05:00Z',
    updatedAt: '2025-11-07T11:05:00Z',
  },
  
  // ⚠️ ERROR TEST SAMPLES - For testing error line highlighting
  {
    id: 'error-syntax',
    title: '⚠️ ERROR: Syntax Error - Unknown Keyword',
    description: 'Test error highlighting: Unknown keyword "RETURM" on line 3',
    formula: `$discount = $orderTotal * 0.1
IF $discount > 100 THEN
  RETURM $discount
END`,
    variables: [
      {
        id: 'var-err-1',
        name: 'discount',
        type: 'number',
        description: 'Discount amount',
      },
      {
        id: 'var-err-2',
        name: 'orderTotal',
        type: 'number',
        description: 'Order total',
      },
    ],
    formulaName: 'errorTest1',
    formulaReturnType: 'number',
    category: 'error-tests',
    createdAt: '2025-10-28T10:00:00Z',
    updatedAt: '2025-10-28T10:00:00Z',
  },
  
  {
    id: 'error-undefined-function',
    title: '⚠️ ERROR: Undefined Function',
    description: 'Test error highlighting: Unknown function "UNKNOWNFUNC" on line 2',
    formula: `IF $orderTotal > 1000 THEN
  $discount = UNKNOWNFUNC($orderTotal)
  RETURN $discount
END
RETURN 0`,
    variables: [
      {
        id: 'var-err-3',
        name: 'discount',
        type: 'number',
        description: 'Discount amount',
      },
      {
        id: 'var-err-4',
        name: 'orderTotal',
        type: 'number',
        description: 'Order total',
      },
    ],
    formulaName: 'errorTest2',
    formulaReturnType: 'number',
    category: 'error-tests',
    createdAt: '2025-10-28T10:05:00Z',
    updatedAt: '2025-10-28T10:05:00Z',
  },
  
  {
    id: 'error-division-by-zero',
    title: '⚠️ ERROR: Division by Zero',
    description: 'Test error highlighting: Division by zero on line 1',
    formula: `$result = 10 / 0
RETURN $result`,
    variables: [
      {
        id: 'var-err-5',
        name: 'result',
        type: 'number',
        description: 'Result value',
      },
    ],
    formulaName: 'errorTest3',
    formulaReturnType: 'number',
    category: 'error-tests',
    createdAt: '2025-10-28T10:10:00Z',
    updatedAt: '2025-10-28T10:10:00Z',
  },
  
  {
    id: 'error-type-mismatch',
    title: '⚠️ ERROR: Type Mismatch',
    description: 'Test error highlighting: Cannot add string and number on line 1',
    formula: `$total = "abc" + 123
RETURN $total`,
    variables: [
      {
        id: 'var-err-6',
        name: 'total',
        type: 'number',
        description: 'Total value',
      },
    ],
    formulaName: 'errorTest4',
    formulaReturnType: 'number',
    category: 'error-tests',
    createdAt: '2025-10-28T10:15:00Z',
    updatedAt: '2025-10-28T10:15:00Z',
  },
  
  // ============================================================
  // TIME UTILITY EXAMPLES - Time conversion and manipulation
  // ============================================================
  
  {
    id: 'overtime-calculation',
    title: 'Overtime Hours Calculation',
    description: 'Calculate overtime pay using time conversion utilities',
    formula: `// Calculate total work hours from time entry
$totalMinutes = TIME_TO_MINUTES(#timesheet.clockOut) - TIME_TO_MINUTES(#timesheet.clockIn)
$totalHours = $totalMinutes / 60

// Subtract lunch break (30 minutes)
$workedHours = $totalHours - 0.5

// Calculate overtime (anything over 8 hours)
IF $workedHours > 8 THEN
  $overtimeHours = $workedHours - 8
  $regularPay = 8 * #employee.hourlyRate
  $overtimePay = $overtimeHours * #employee.hourlyRate * 1.5
  $totalPay = $regularPay + $overtimePay
ELSE
  $totalPay = $workedHours * #employee.hourlyRate
END

$totalPay`,
    variables: [
      {
        id: 'var-overtime-1',
        name: 'totalMinutes',
        type: 'number',
        description: 'Total minutes worked',
      },
      {
        id: 'var-overtime-2',
        name: 'totalHours',
        type: 'number',
        description: 'Total hours worked',
      },
      {
        id: 'var-overtime-3',
        name: 'workedHours',
        type: 'number',
        description: 'Hours worked minus breaks',
      },
      {
        id: 'var-overtime-4',
        name: 'overtimeHours',
        type: 'number',
        description: 'Overtime hours (over 8)',
      },
      {
        id: 'var-overtime-5',
        name: 'regularPay',
        type: 'number',
        description: 'Pay for regular hours',
      },
      {
        id: 'var-overtime-6',
        name: 'overtimePay',
        type: 'number',
        description: 'Pay for overtime hours',
      },
      {
        id: 'var-overtime-7',
        name: 'totalPay',
        type: 'number',
        description: 'Total pay including overtime',
      },
    ],
    formulaName: 'calculateOvertimePay',
    formulaReturnType: 'number',
    createdAt: '2025-10-28T11:00:00Z',
    updatedAt: '2025-10-28T11:00:00Z',
  },
  
  {
    id: 'business-days-calculation',
    title: 'Business Days Response Time',
    description: 'Calculate response time excluding weekends using datetime utilities',
    formula: `// Get response time in days
$responseDays = DAYS_BETWEEN(#ticket.createdAt, #ticket.closedAt)

// Check if created on weekend (add penalty)
IF IS_WEEKEND(#ticket.createdAt) THEN
  $adjustedDays = $responseDays + 1
ELSE
  $adjustedDays = $responseDays
END

// Weekday priority gets better SLA
IF IS_WEEKDAY(#ticket.createdAt) AND #ticket.priority = "urgent" THEN
  $slaTarget = 1
ELSIF IS_WEEKDAY(#ticket.createdAt) THEN
  $slaTarget = 3
ELSE
  $slaTarget = 5
END

// Calculate compliance score
IF $adjustedDays <= $slaTarget THEN
  100
ELSIF $adjustedDays <= $slaTarget * 1.5 THEN
  75
ELSIF $adjustedDays <= $slaTarget * 2 THEN
  50
ELSE
  25
END`,
    variables: [
      {
        id: 'var-bizdays-1',
        name: 'responseDays',
        type: 'number',
        description: 'Days between ticket creation and closure',
      },
      {
        id: 'var-bizdays-2',
        name: 'adjustedDays',
        type: 'number',
        description: 'Response days adjusted for weekend penalty',
      },
      {
        id: 'var-bizdays-3',
        name: 'slaTarget',
        type: 'number',
        description: 'SLA target in days based on priority',
      },
    ],
    formulaName: 'calculateBusinessDaysSLA',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'bizdays-1',
        min: 0,
        max: 49,
        label: 'SLA Miss',
        color: '#DA1E28',
        severity: 'error',
      },
      {
        id: 'bizdays-2',
        min: 50,
        max: 74,
        label: 'At Risk',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'bizdays-3',
        min: 75,
        max: 99,
        label: 'Good',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'bizdays-4',
        min: 100,
        max: null,
        label: 'Excellent',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-28T11:15:00Z',
    updatedAt: '2025-10-28T11:15:00Z',
  },
  
  {
    id: 'appointment-scheduling',
    title: 'Appointment Scheduling Window',
    description: 'Calculate appointment windows using DATE_ADD and DATE_SUBTRACT',
    formula: `// Calculate earliest and latest appointment times
// Earliest: 2 business days from request
$requestDate = #appointment.requestedDate
$earliestDate = DATE_ADD($requestDate, 2, "days")

// Latest: 2 weeks from request
$latestDate = DATE_ADD($requestDate, 14, "days")

// Calculate how many days until preferred time
$daysUntilPreferred = DAYS_BETWEEN(NOW(), #appointment.preferredDate)

// Score based on availability
IF $daysUntilPreferred < 2 THEN
  $score = 25  // Too soon
ELSIF $daysUntilPreferred > 14 THEN
  $score = 50  // Too far out
ELSIF $daysUntilPreferred >= 2 AND $daysUntilPreferred <= 7 THEN
  $score = 100 // Ideal window
ELSE
  $score = 75  // Acceptable
END

$score`,
    variables: [
      {
        id: 'var-appt-1',
        name: 'requestDate',
        type: 'datetime',
        description: 'Date appointment was requested',
      },
      {
        id: 'var-appt-2',
        name: 'earliestDate',
        type: 'datetime',
        description: 'Earliest available date (2 days out)',
      },
      {
        id: 'var-appt-3',
        name: 'latestDate',
        type: 'datetime',
        description: 'Latest available date (14 days out)',
      },
      {
        id: 'var-appt-4',
        name: 'daysUntilPreferred',
        type: 'number',
        description: 'Days until preferred appointment date',
      },
      {
        id: 'var-appt-5',
        name: 'score',
        type: 'number',
        description: 'Scheduling score (0-100)',
      },
    ],
    formulaName: 'calculateSchedulingScore',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'appt-1',
        min: 0,
        max: 25,
        label: 'Too Soon',
        color: '#DA1E28',
        severity: 'error',
      },
      {
        id: 'appt-2',
        min: 26,
        max: 50,
        label: 'Too Far',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'appt-3',
        min: 51,
        max: 75,
        label: 'Acceptable',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'appt-4',
        min: 76,
        max: null,
        label: 'Ideal',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-28T11:30:00Z',
    updatedAt: '2025-10-28T11:30:00Z',
  },
  
  // ============================================================
  // LIST/ARRAY EXAMPLES - List operations and transformations
  // ============================================================
  
  {
    id: 'revenue-analysis',
    title: 'Monthly Revenue Analysis',
    description: 'Analyze monthly revenue using list functions',
    formula: `// Monthly revenues for the year
$revenues = [45000, 52000, 48000, 61000, 58000, 63000, 67000, 71000, 69000, 74000, 78000, 82000]

// Calculate metrics
$totalRevenue = LIST_SUM($revenues)
$avgRevenue = LIST_AVG($revenues)
$bestMonth = LIST_MAX($revenues)
$worstMonth = LIST_MIN($revenues)
$numberOfMonths = LENGTH($revenues)

// Performance score (avg vs best)
$performanceScore = ($avgRevenue / $bestMonth) * 100

$performanceScore`,
    variables: [
      {
        id: 'var-rev-1',
        name: 'revenues',
        type: 'list',
        description: 'Monthly revenue amounts',
      },
      {
        id: 'var-rev-2',
        name: 'totalRevenue',
        type: 'number',
        description: 'Total annual revenue',
      },
      {
        id: 'var-rev-3',
        name: 'avgRevenue',
        type: 'number',
        description: 'Average monthly revenue',
      },
      {
        id: 'var-rev-4',
        name: 'bestMonth',
        type: 'number',
        description: 'Best performing month',
      },
      {
        id: 'var-rev-5',
        name: 'worstMonth',
        type: 'number',
        description: 'Worst performing month',
      },
      {
        id: 'var-rev-6',
        name: 'numberOfMonths',
        type: 'number',
        description: 'Number of months in dataset',
      },
      {
        id: 'var-rev-7',
        name: 'performanceScore',
        type: 'number',
        description: 'Performance score (0-100)',
      },
    ],
    formulaName: 'analyzeMonthlyRevenue',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'rev-1',
        min: 0,
        max: 60,
        label: 'Poor Performance',
        color: '#DA1E28',
        severity: 'error',
      },
      {
        id: 'rev-2',
        min: 61,
        max: 75,
        label: 'Below Average',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'rev-3',
        min: 76,
        max: 90,
        label: 'Good',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'rev-4',
        min: 91,
        max: null,
        label: 'Excellent',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-27T09:00:00Z',
    updatedAt: '2025-10-27T09:00:00Z',
  },
  
  {
    id: 'student-grades',
    title: 'Student Grade Analysis',
    description: 'Calculate student performance from test scores',
    formula: `// Test scores for the semester
$scores = [85, 92, 78, 88, 91, 87, 94]

// Calculate final grade
$avgScore = LIST_AVG($scores)
$highestScore = LIST_MAX($scores)
$lowestScore = LIST_MIN($scores)
$totalTests = LENGTH($scores)

// Check if student passed all tests
$hasFailing = CONTAINS($scores, 60)

// Improvement bonus (if last score > first score)
$firstTest = FIRST($scores)
$lastTest = LAST($scores)

IF $lastTest > $firstTest THEN
  $bonus = 5
  $finalGrade = $avgScore + $bonus
ELSE
  $finalGrade = $avgScore
END

$finalGrade`,
    variables: [
      {
        id: 'var-grade-1',
        name: 'scores',
        type: 'list',
        description: 'Test scores list',
      },
      {
        id: 'var-grade-2',
        name: 'avgScore',
        type: 'number',
        description: 'Average test score',
      },
      {
        id: 'var-grade-3',
        name: 'highestScore',
        type: 'number',
        description: 'Highest test score',
      },
      {
        id: 'var-grade-4',
        name: 'lowestScore',
        type: 'number',
        description: 'Lowest test score',
      },
      {
        id: 'var-grade-5',
        name: 'totalTests',
        type: 'number',
        description: 'Number of tests taken',
      },
      {
        id: 'var-grade-6',
        name: 'hasFailing',
        type: 'boolean',
        description: 'Has any failing scores',
      },
      {
        id: 'var-grade-7',
        name: 'firstTest',
        type: 'number',
        description: 'First test score',
      },
      {
        id: 'var-grade-8',
        name: 'lastTest',
        type: 'number',
        description: 'Last test score',
      },
      {
        id: 'var-grade-9',
        name: 'bonus',
        type: 'number',
        description: 'Improvement bonus points',
      },
      {
        id: 'var-grade-10',
        name: 'finalGrade',
        type: 'number',
        description: 'Final calculated grade',
      },
    ],
    formulaName: 'calculateStudentGrade',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'grade-1',
        min: 0,
        max: 59,
        label: 'F',
        color: '#DA1E28',
        severity: 'error',
      },
      {
        id: 'grade-2',
        min: 60,
        max: 69,
        label: 'D',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'grade-3',
        min: 70,
        max: 79,
        label: 'C',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'grade-4',
        min: 80,
        max: 89,
        label: 'B',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'grade-5',
        min: 90,
        max: null,
        label: 'A',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-27T09:15:00Z',
    updatedAt: '2025-10-27T09:15:00Z',
  },
  
  {
    id: 'inventory-levels',
    title: 'Inventory Level Check',
    description: 'Monitor inventory levels across multiple warehouses',
    formula: `// Stock levels across warehouses
$stockLevels = [125, 87, 203, 45, 156, 92, 178]

// Analyze inventory
$totalStock = LIST_SUM($stockLevels)
$avgStock = LIST_AVG($stockLevels)
$lowestStock = LIST_MIN($stockLevels)
$highestStock = LIST_MAX($stockLevels)

// Critical threshold check
$criticalLevel = 50
$hasCritical = CONTAINS($stockLevels, $criticalLevel)

// Calculate reorder urgency score
IF $lowestStock < 50 THEN
  $urgency = 100
ELSIF $lowestStock < 100 THEN
  $urgency = 75
ELSIF $avgStock < 150 THEN
  $urgency = 50
ELSE
  $urgency = 25
END

$urgency`,
    variables: [
      {
        id: 'var-inv-1',
        name: 'stockLevels',
        type: 'list',
        description: 'Stock levels per warehouse',
      },
      {
        id: 'var-inv-2',
        name: 'totalStock',
        type: 'number',
        description: 'Total stock across all warehouses',
      },
      {
        id: 'var-inv-3',
        name: 'avgStock',
        type: 'number',
        description: 'Average stock per warehouse',
      },
      {
        id: 'var-inv-4',
        name: 'lowestStock',
        type: 'number',
        description: 'Lowest warehouse stock',
      },
      {
        id: 'var-inv-5',
        name: 'highestStock',
        type: 'number',
        description: 'Highest warehouse stock',
      },
      {
        id: 'var-inv-6',
        name: 'criticalLevel',
        type: 'number',
        description: 'Critical stock threshold',
      },
      {
        id: 'var-inv-7',
        name: 'hasCritical',
        type: 'boolean',
        description: 'Has critical stock levels',
      },
      {
        id: 'var-inv-8',
        name: 'urgency',
        type: 'number',
        description: 'Reorder urgency score (0-100)',
      },
    ],
    formulaName: 'checkInventoryLevels',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'inv-1',
        min: 0,
        max: 25,
        label: 'Low Urgency',
        color: '#24A148',
        severity: 'success',
      },
      {
        id: 'inv-2',
        min: 26,
        max: 50,
        label: 'Monitor',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'inv-3',
        min: 51,
        max: 75,
        label: 'Reorder Soon',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'inv-4',
        min: 76,
        max: null,
        label: 'Urgent Reorder',
        color: '#DA1E28',
        severity: 'error',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-27T09:30:00Z',
    updatedAt: '2025-10-27T09:30:00Z',
  },
  
  {
    id: 'data-cleaning',
    title: 'Data Cleaning and De-duplication',
    description: 'Clean and de-duplicate data using list transformation functions',
    formula: `// Raw customer IDs with duplicates
$rawCustomerIds = [101, 203, 101, 405, 203, 607, 101, 809]

// Remove duplicates
$uniqueIds = UNIQUE($rawCustomerIds)

// Sort in ascending order
$sortedIds = SORT($uniqueIds)

// Calculate metrics
$totalRaw = LENGTH($rawCustomerIds)
$totalUnique = LENGTH($uniqueIds)
$duplicateCount = $totalRaw - $totalUnique

// Data quality score (higher is better)
$qualityScore = ($totalUnique / $totalRaw) * 100

$qualityScore`,
    variables: [
      {
        id: 'var-clean-1',
        name: 'rawCustomerIds',
        type: 'list',
        description: 'Raw customer IDs with duplicates',
      },
      {
        id: 'var-clean-2',
        name: 'uniqueIds',
        type: 'list',
        description: 'De-duplicated customer IDs',
      },
      {
        id: 'var-clean-3',
        name: 'sortedIds',
        type: 'list',
        description: 'Sorted unique IDs',
      },
      {
        id: 'var-clean-4',
        name: 'totalRaw',
        type: 'number',
        description: 'Total raw entries',
      },
      {
        id: 'var-clean-5',
        name: 'totalUnique',
        type: 'number',
        description: 'Total unique entries',
      },
      {
        id: 'var-clean-6',
        name: 'duplicateCount',
        type: 'number',
        description: 'Number of duplicates',
      },
      {
        id: 'var-clean-7',
        name: 'qualityScore',
        type: 'number',
        description: 'Data quality score (0-100)',
      },
    ],
    formulaName: 'cleanAndDeduplicateData',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'clean-1',
        min: 0,
        max: 50,
        label: 'Poor Quality',
        color: '#DA1E28',
        severity: 'error',
      },
      {
        id: 'clean-2',
        min: 51,
        max: 75,
        label: 'Fair Quality',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'clean-3',
        min: 76,
        max: 90,
        label: 'Good Quality',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'clean-4',
        min: 91,
        max: null,
        label: 'Excellent Quality',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-27T10:00:00Z',
    updatedAt: '2025-10-27T10:00:00Z',
  },
  
  {
    id: 'leaderboard-ranking',
    title: 'Sales Leaderboard with Ranking',
    description: 'Rank sales representatives and extract top performers',
    formula: `// Sales amounts for the month
$salesAmounts = [45000, 78000, 52000, 91000, 63000, 48000, 85000, 72000]

// Sort descending to get rankings
$rankedSales = SORT_DESC($salesAmounts)

// Get top 3 performers
$topThree = SLICE($rankedSales, 0, 3)

// Get bottom 2 performers (need improvement)
$bottomTwo = SLICE($rankedSales, -2)

// Calculate top performers' total
$topThreeTotal = LIST_SUM($topThree)
$overallTotal = LIST_SUM($salesAmounts)

// Top performers contribution percentage
$topPerformersShare = ($topThreeTotal / $overallTotal) * 100

$topPerformersShare`,
    variables: [
      {
        id: 'var-leader-1',
        name: 'salesAmounts',
        type: 'list',
        description: 'Monthly sales amounts',
      },
      {
        id: 'var-leader-2',
        name: 'rankedSales',
        type: 'list',
        description: 'Sales sorted descending',
      },
      {
        id: 'var-leader-3',
        name: 'topThree',
        type: 'list',
        description: 'Top 3 sales amounts',
      },
      {
        id: 'var-leader-4',
        name: 'bottomTwo',
        type: 'list',
        description: 'Bottom 2 sales amounts',
      },
      {
        id: 'var-leader-5',
        name: 'topThreeTotal',
        type: 'number',
        description: 'Total of top 3 performers',
      },
      {
        id: 'var-leader-6',
        name: 'overallTotal',
        type: 'number',
        description: 'Total of all sales',
      },
      {
        id: 'var-leader-7',
        name: 'topPerformersShare',
        type: 'number',
        description: 'Top performers contribution %',
      },
    ],
    formulaName: 'calculateLeaderboard',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'leader-1',
        min: 0,
        max: 30,
        label: 'Well Distributed',
        color: '#24A148',
        severity: 'success',
      },
      {
        id: 'leader-2',
        min: 31,
        max: 50,
        label: 'Balanced',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'leader-3',
        min: 51,
        max: 70,
        label: 'Top Heavy',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'leader-4',
        min: 71,
        max: null,
        label: 'Very Concentrated',
        color: '#DA1E28',
        severity: 'error',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-27T10:15:00Z',
    updatedAt: '2025-10-27T10:15:00Z',
  },
  
  {
    id: 'text-processing',
    title: 'CSV Text Processing',
    description: 'Parse CSV string into list and process data',
    formula: `// CSV string from external source
$csvData = "apple,banana,cherry,date,elderberry"

// Split into list
$fruits = SPLIT($csvData, ",")

// Get count
$fruitCount = LENGTH($fruits)

// Get first and last
$firstFruit = FIRST($fruits)
$lastFruit = LAST($fruits)

// Sort alphabetically
$sortedFruits = SORT($fruits)

// Create display string with sorted fruits
$displayText = JOIN($sortedFruits, " | ")

// Check if specific fruit exists
$hasCherry = CONTAINS($fruits, "cherry")
$cherryPosition = INDEX_OF($fruits, "cherry")

// Return count for scoring
$fruitCount`,
    variables: [
      {
        id: 'var-text-1',
        name: 'csvData',
        type: 'string',
        description: 'CSV formatted string',
      },
      {
        id: 'var-text-2',
        name: 'fruits',
        type: 'list',
        description: 'List of fruits',
      },
      {
        id: 'var-text-3',
        name: 'fruitCount',
        type: 'number',
        description: 'Number of fruits',
      },
      {
        id: 'var-text-4',
        name: 'firstFruit',
        type: 'string',
        description: 'First fruit in list',
      },
      {
        id: 'var-text-5',
        name: 'lastFruit',
        type: 'string',
        description: 'Last fruit in list',
      },
      {
        id: 'var-text-6',
        name: 'sortedFruits',
        type: 'list',
        description: 'Alphabetically sorted fruits',
      },
      {
        id: 'var-text-7',
        name: 'displayText',
        type: 'string',
        description: 'Formatted display string',
      },
      {
        id: 'var-text-8',
        name: 'hasCherry',
        type: 'boolean',
        description: 'Whether cherry is in list',
      },
      {
        id: 'var-text-9',
        name: 'cherryPosition',
        type: 'number',
        description: 'Index of cherry (-1 if not found)',
      },
    ],
    formulaName: 'processCSVData',
    formulaReturnType: 'number',
    createdAt: '2025-10-27T10:30:00Z',
    updatedAt: '2025-10-27T10:30:00Z',
  },
  
  {
    id: 'sequence-generation',
    title: 'Number Sequence Generation',
    description: 'Generate and combine number sequences using RANGE and CONCAT',
    formula: `// Generate sequential ranges
$range1to10 = RANGE(1, 11)           // [1, 2, 3, ..., 10]
$range10to20 = RANGE(10, 21)         // [10, 11, 12, ..., 20]
$evens = RANGE(0, 21, 2)             // [0, 2, 4, ..., 20]

// Combine ranges
$combined = CONCAT($range1to10, $range10to20)

// Remove duplicates from combined
$uniqueValues = UNIQUE($combined)

// Calculate statistics
$totalItems = LENGTH($uniqueValues)
$sumOfSequence = LIST_SUM($uniqueValues)
$avgValue = LIST_AVG($uniqueValues)

// Score based on sum
$score = $sumOfSequence / 10

$score`,
    variables: [
      {
        id: 'var-seq-1',
        name: 'range1to10',
        type: 'list',
        description: 'Numbers 1 through 10',
      },
      {
        id: 'var-seq-2',
        name: 'range10to20',
        type: 'list',
        description: 'Numbers 10 through 20',
      },
      {
        id: 'var-seq-3',
        name: 'evens',
        type: 'list',
        description: 'Even numbers 0 through 20',
      },
      {
        id: 'var-seq-4',
        name: 'combined',
        type: 'list',
        description: 'Combined ranges (with duplicates)',
      },
      {
        id: 'var-seq-5',
        name: 'uniqueValues',
        type: 'list',
        description: 'Unique values after combining',
      },
      {
        id: 'var-seq-6',
        name: 'totalItems',
        type: 'number',
        description: 'Total unique items',
      },
      {
        id: 'var-seq-7',
        name: 'sumOfSequence',
        type: 'number',
        description: 'Sum of all unique values',
      },
      {
        id: 'var-seq-8',
        name: 'avgValue',
        type: 'number',
        description: 'Average value',
      },
      {
        id: 'var-seq-9',
        name: 'score',
        type: 'number',
        description: 'Calculated score',
      },
    ],
    formulaName: 'generateNumberSequence',
    formulaReturnType: 'number',
    createdAt: '2025-10-27T10:45:00Z',
    updatedAt: '2025-10-27T10:45:00Z',
  },
  
  // ========================================================================
  // STRUCTURED DATA (OBJECTS) - Increment 3.1
  // ========================================================================
  
  {
    id: 'object-basics',
    title: 'Object Basics - Creating and Accessing',
    description: 'Demonstrates object literal creation and property access',
    formula: `// Create a customer record object
$customer = {name: "Alice Chen", age: 32, score: 850}

// Access individual properties
$customerName = $customer.name
$customerAge = $customer.age
$customerScore = $customer.score

// Calculate credit worthiness from properties
IF $customer.score >= 800 AND $customer.age >= 25 THEN
  95
ELSIF $customer.score >= 700 THEN
  75
ELSIF $customer.score >= 600 THEN
  50
ELSE
  25
END`,
    variables: [
      {
        id: 'var-obj-1',
        name: 'customer',
        type: 'string',
        description: 'Customer record object',
      },
      {
        id: 'var-obj-2',
        name: 'customerName',
        type: 'string',
        description: 'Customer name extracted from object',
      },
      {
        id: 'var-obj-3',
        name: 'customerAge',
        type: 'number',
        description: 'Customer age extracted from object',
      },
      {
        id: 'var-obj-4',
        name: 'customerScore',
        type: 'number',
        description: 'Customer credit score extracted from object',
      },
    ],
    formulaName: 'objectPropertyAccess',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'obj-1',
        min: 0,
        max: 40,
        label: 'High Risk',
        color: '#DA1E28',
        severity: 'error',
      },
      {
        id: 'obj-2',
        min: 41,
        max: 60,
        label: 'Medium Risk',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'obj-3',
        min: 61,
        max: 80,
        label: 'Low Risk',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'obj-4',
        min: 81,
        max: null,
        label: 'Minimal Risk',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-27T14:00:00Z',
    updatedAt: '2025-10-27T14:00:00Z',
  },
  
  {
    id: 'array-of-objects',
    title: 'Sales Leaderboard with Objects',
    description: 'Array of sales records with name, division, and amount properties',
    formula: `// Sales team performance data
$salesData = [
  {name: "Alice Chen", division: "West", amount: 45000},
  {name: "Bob Smith", division: "East", amount: 78000},
  {name: "Charlie Brown", division: "West", amount: 52000},
  {name: "Diana Prince", division: "North", amount: 91000},
  {name: "Ethan Hunt", division: "South", amount: 63000}
]

// Get the first record
$topSeller = $salesData[0]

// Access properties from array element
$topName = $salesData[0].name
$topAmount = $salesData[0].amount
$topDivision = $salesData[0].division

// Calculate total team performance
$teamSize = LENGTH($salesData)

// Performance score based on top seller
IF $topAmount >= 90000 THEN
  100
ELSIF $topAmount >= 75000 THEN
  85
ELSIF $topAmount >= 50000 THEN
  70
ELSE
  50
END`,
    variables: [
      {
        id: 'var-sales-1',
        name: 'salesData',
        type: 'string',
        description: 'Array of sales records',
      },
      {
        id: 'var-sales-2',
        name: 'topSeller',
        type: 'string',
        description: 'Top sales performer record',
      },
      {
        id: 'var-sales-3',
        name: 'topName',
        type: 'string',
        description: 'Name of top performer',
      },
      {
        id: 'var-sales-4',
        name: 'topAmount',
        type: 'number',
        description: 'Sales amount of top performer',
      },
      {
        id: 'var-sales-5',
        name: 'topDivision',
        type: 'string',
        description: 'Division of top performer',
      },
      {
        id: 'var-sales-6',
        name: 'teamSize',
        type: 'number',
        description: 'Number of sales team members',
      },
    ],
    formulaName: 'analyzeSalesLeaderboard',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'sales-obj-1',
        min: 0,
        max: 60,
        label: 'Below Target',
        color: '#DA1E28',
        severity: 'error',
      },
      {
        id: 'sales-obj-2',
        min: 61,
        max: 79,
        label: 'Approaching Target',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'sales-obj-3',
        min: 80,
        max: 94,
        label: 'Met Target',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'sales-obj-4',
        min: 95,
        max: null,
        label: 'Exceeded Target',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-27T14:15:00Z',
    updatedAt: '2025-10-27T14:15:00Z',
  },
  
  {
    id: 'chained-property-access',
    title: 'Chained Index and Property Access',
    description: 'Demonstrates combining array indexing with property access',
    formula: `// Product inventory across stores
$inventory = [
  {store: "Store A", product: "Widget", stock: 120},
  {store: "Store B", product: "Widget", stock: 45},
  {store: "Store C", product: "Widget", stock: 78},
  {store: "Store D", product: "Widget", stock: 23}
]

// Access first store's data using chained syntax
$firstStore = $inventory[0].store
$firstStock = $inventory[0].stock

// Access last store's data (negative indexing)
$lastStore = $inventory[-1].store
$lastStock = $inventory[-1].stock

// Check if first or last store needs reorder
IF $firstStock < 50 OR $lastStock < 50 THEN
  $reorderUrgency = 90
ELSIF $firstStock < 100 OR $lastStock < 100 THEN
  $reorderUrgency = 60
ELSE
  $reorderUrgency = 30
END

$reorderUrgency`,
    variables: [
      {
        id: 'var-inv-obj-1',
        name: 'inventory',
        type: 'string',
        description: 'Product inventory across stores',
      },
      {
        id: 'var-inv-obj-2',
        name: 'firstStore',
        type: 'string',
        description: 'Name of first store',
      },
      {
        id: 'var-inv-obj-3',
        name: 'firstStock',
        type: 'number',
        description: 'Stock level at first store',
      },
      {
        id: 'var-inv-obj-4',
        name: 'lastStore',
        type: 'string',
        description: 'Name of last store',
      },
      {
        id: 'var-inv-obj-5',
        name: 'lastStock',
        type: 'number',
        description: 'Stock level at last store',
      },
      {
        id: 'var-inv-obj-6',
        name: 'reorderUrgency',
        type: 'number',
        description: 'Reorder urgency score',
      },
    ],
    formulaName: 'checkInventoryUrgency',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'chain-1',
        min: 0,
        max: 40,
        label: 'Low Priority',
        color: '#24A148',
        severity: 'success',
      },
      {
        id: 'chain-2',
        min: 41,
        max: 70,
        label: 'Medium Priority',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'chain-3',
        min: 71,
        max: null,
        label: 'High Priority',
        color: '#DA1E28',
        severity: 'error',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-27T14:30:00Z',
    updatedAt: '2025-10-27T14:30:00Z',
  },
  
  // ========================================================================
  // LOOPS AND SWITCH STATEMENTS - EPIC-007 Phase 1
  // ========================================================================
  
  {
    id: 'for-loop-basic',
    title: 'FOR Loop - Basic Iteration',
    description: 'Demonstrates basic FOR loop with range syntax (1..10)',
    formula: `// Calculate sum of first 10 numbers using FOR loop
$sum = 0

FOR $i IN 1..10 DO
  $sum = $sum + $i
END

$sum`,
    variables: [
      {
        id: 'var-for-1',
        name: 'sum',
        type: 'number',
        description: 'Sum of numbers',
      },
      {
        id: 'var-for-2',
        name: 'i',
        type: 'number',
        description: 'Loop counter',
      },
    ],
    formulaName: 'calculateSumWithLoop',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'for-1',
        min: 0,
        max: 30,
        label: 'Low',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'for-2',
        min: 31,
        max: 55,
        label: 'Expected',
        color: '#24A148',
        severity: 'success',
      },
      {
        id: 'for-3',
        min: 56,
        max: null,
        label: 'High',
        color: '#F1C21B',
        severity: 'warning',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-31T10:00:00Z',
    updatedAt: '2025-10-31T10:00:00Z',
  },
  
  {
    id: 'for-loop-array',
    title: 'FOR Loop - Array Iteration',
    description: 'Demonstrates iterating over array elements with FOR IN loop',
    formula: `// Calculate total value from transaction array
$transactions = [125.50, 89.99, 234.00, 56.75, 187.25]
$total = 0
$count = 0

FOR $amount IN $transactions DO
  $total = $total + $amount
  $count = $count + 1
END

$average = $total / $count

// Return total transaction value
$total`,
    variables: [
      {
        id: 'var-for-arr-1',
        name: 'transactions',
        type: 'list',
        description: 'Array of transaction amounts',
      },
      {
        id: 'var-for-arr-2',
        name: 'total',
        type: 'number',
        description: 'Total of all transactions',
      },
      {
        id: 'var-for-arr-3',
        name: 'count',
        type: 'number',
        description: 'Number of transactions',
      },
      {
        id: 'var-for-arr-4',
        name: 'amount',
        type: 'number',
        description: 'Current transaction amount',
      },
      {
        id: 'var-for-arr-5',
        name: 'average',
        type: 'number',
        description: 'Average transaction amount',
      },
    ],
    formulaName: 'processTransactions',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'for-arr-1',
        min: 0,
        max: 400,
        label: 'Low Volume',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'for-arr-2',
        min: 401,
        max: 700,
        label: 'Normal Volume',
        color: '#24A148',
        severity: 'success',
      },
      {
        id: 'for-arr-3',
        min: 701,
        max: null,
        label: 'High Volume',
        color: '#0F62FE',
        severity: 'info',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-31T10:15:00Z',
    updatedAt: '2025-10-31T10:15:00Z',
  },
  
  {
    id: 'while-loop-basic',
    title: 'WHILE Loop - Conditional Iteration',
    description: 'Demonstrates WHILE loop with counter and break condition',
    formula: `// Calculate compound interest until target reached
$principal = 1000
$rate = 0.05
$target = 1500
$years = 0

WHILE $principal < $target DO
  $principal = $principal * (1 + $rate)
  $years = $years + 1
  
  // Safety check - stop after 50 years
  IF $years >= 50 THEN
    BREAK
  END
END

$years`,
    variables: [
      {
        id: 'var-while-1',
        name: 'principal',
        type: 'number',
        description: 'Current investment value',
      },
      {
        id: 'var-while-2',
        name: 'rate',
        type: 'number',
        description: 'Interest rate (5%)',
      },
      {
        id: 'var-while-3',
        name: 'target',
        type: 'number',
        description: 'Target investment value',
      },
      {
        id: 'var-while-4',
        name: 'years',
        type: 'number',
        description: 'Years to reach target',
      },
    ],
    formulaName: 'calculateCompoundingTime',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'while-1',
        min: 0,
        max: 5,
        label: 'Quick Growth',
        color: '#24A148',
        severity: 'success',
      },
      {
        id: 'while-2',
        min: 6,
        max: 10,
        label: 'Normal Growth',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'while-3',
        min: 11,
        max: null,
        label: 'Slow Growth',
        color: '#F1C21B',
        severity: 'warning',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-31T10:30:00Z',
    updatedAt: '2025-10-31T10:30:00Z',
  },
  
  {
    id: 'switch-basic',
    title: 'SWITCH Statement - Simple Case Matching',
    description: 'Demonstrates SWITCH statement with string matching',
    formula: `// Calculate shipping cost based on region
$region = "west"
$baseWeight = 5.5

SWITCH $region
  CASE "north"
    $rate = 12.50
  CASE "south"
    $rate = 10.00
  CASE "east"
    $rate = 11.25
  CASE "west"
    $rate = 13.75
  DEFAULT
    $rate = 15.00
END

$shippingCost = $baseWeight * $rate

$shippingCost`,
    variables: [
      {
        id: 'var-switch-1',
        name: 'region',
        type: 'string',
        description: 'Shipping region',
      },
      {
        id: 'var-switch-2',
        name: 'baseWeight',
        type: 'number',
        description: 'Package weight in kg',
      },
      {
        id: 'var-switch-3',
        name: 'rate',
        type: 'number',
        description: 'Regional rate per kg',
      },
      {
        id: 'var-switch-4',
        name: 'shippingCost',
        type: 'number',
        description: 'Final shipping cost',
      },
    ],
    formulaName: 'calculateRegionalShipping',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'switch-1',
        min: 0,
        max: 60,
        label: 'Economy',
        color: '#24A148',
        severity: 'success',
      },
      {
        id: 'switch-2',
        min: 61,
        max: 80,
        label: 'Standard',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'switch-3',
        min: 81,
        max: null,
        label: 'Premium',
        color: '#F1C21B',
        severity: 'warning',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-31T10:45:00Z',
    updatedAt: '2025-10-31T10:45:00Z',
  },
  
  {
    id: 'switch-number',
    title: 'SWITCH Statement - Numeric Case Matching',
    description: 'Demonstrates SWITCH with numeric cases for tier-based logic',
    formula: `// Membership tier benefits
$membershipLevel = 3
$baseDiscount = 5

SWITCH $membershipLevel
  CASE 1
    $additionalDiscount = 0
    $pointsMultiplier = 1
  CASE 2
    $additionalDiscount = 5
    $pointsMultiplier = 1.5
  CASE 3
    $additionalDiscount = 10
    $pointsMultiplier = 2.0
  CASE 4
    $additionalDiscount = 15
    $pointsMultiplier = 2.5
  CASE 5
    $additionalDiscount = 20
    $pointsMultiplier = 3.0
  DEFAULT
    $additionalDiscount = 0
    $pointsMultiplier = 1
END

$totalDiscount = $baseDiscount + $additionalDiscount

$totalDiscount`,
    variables: [
      {
        id: 'var-switch-num-1',
        name: 'membershipLevel',
        type: 'number',
        description: 'Customer membership tier (1-5)',
      },
      {
        id: 'var-switch-num-2',
        name: 'baseDiscount',
        type: 'number',
        description: 'Base discount percentage',
      },
      {
        id: 'var-switch-num-3',
        name: 'additionalDiscount',
        type: 'number',
        description: 'Tier-based additional discount',
      },
      {
        id: 'var-switch-num-4',
        name: 'pointsMultiplier',
        type: 'number',
        description: 'Loyalty points multiplier',
      },
      {
        id: 'var-switch-num-5',
        name: 'totalDiscount',
        type: 'number',
        description: 'Total discount percentage',
      },
    ],
    formulaName: 'calculateMembershipBenefits',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'switch-num-1',
        min: 0,
        max: 10,
        label: 'Basic Tier',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'switch-num-2',
        min: 11,
        max: 20,
        label: 'Premium Tier',
        color: '#8A3FFC',
        severity: 'info',
      },
      {
        id: 'switch-num-3',
        min: 21,
        max: null,
        label: 'Elite Tier',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-31T11:00:00Z',
    updatedAt: '2025-10-31T11:00:00Z',
  },
  
  {
    id: 'loop-break-continue',
    title: 'Loop Control - BREAK and CONTINUE',
    description: 'Demonstrates BREAK to exit early and CONTINUE to skip iterations',
    formula: `// Process scores, skip negatives, stop at first zero
$scores = [85, 92, 78, -1, 88, 95, 0, 82, 90]
$validSum = 0
$validCount = 0

FOR $score IN $scores DO
  // Stop processing if we hit a zero (data end marker)
  IF $score = 0 THEN
    BREAK
  END
  
  // Skip invalid (negative) scores
  IF $score < 0 THEN
    CONTINUE
  END
  
  // Process valid score
  $validSum = $validSum + $score
  $validCount = $validCount + 1
END

$average = $validSum / $validCount

$average`,
    variables: [
      {
        id: 'var-control-1',
        name: 'scores',
        type: 'list',
        description: 'Array of test scores',
      },
      {
        id: 'var-control-2',
        name: 'validSum',
        type: 'number',
        description: 'Sum of valid scores',
      },
      {
        id: 'var-control-3',
        name: 'validCount',
        type: 'number',
        description: 'Count of valid scores',
      },
      {
        id: 'var-control-4',
        name: 'score',
        type: 'number',
        description: 'Current score being processed',
      },
      {
        id: 'var-control-5',
        name: 'average',
        type: 'number',
        description: 'Average of valid scores',
      },
    ],
    formulaName: 'processScoresWithControl',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'control-1',
        min: 0,
        max: 70,
        label: 'Below Average',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'control-2',
        min: 71,
        max: 85,
        label: 'Average',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'control-3',
        min: 86,
        max: null,
        label: 'Above Average',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-31T11:15:00Z',
    updatedAt: '2025-10-31T11:15:00Z',
  },
  
  {
    id: 'nested-loops',
    title: 'Nested FOR Loops - Matrix Operations',
    description: 'Demonstrates nested loops for processing 2D data structures',
    formula: `// Calculate average across multiple departments
$dept1 = [85, 92, 78, 88]
$dept2 = [76, 84, 91, 82]
$dept3 = [89, 95, 87, 93]

$departments = [$dept1, $dept2, $dept3]
$grandTotal = 0
$totalCount = 0

FOR $dept IN $departments DO
  FOR $score IN $dept DO
    $grandTotal = $grandTotal + $score
    $totalCount = $totalCount + 1
  END
END

$overallAverage = $grandTotal / $totalCount

$overallAverage`,
    variables: [
      {
        id: 'var-nested-1',
        name: 'dept1',
        type: 'list',
        description: 'Department 1 scores',
      },
      {
        id: 'var-nested-2',
        name: 'dept2',
        type: 'list',
        description: 'Department 2 scores',
      },
      {
        id: 'var-nested-3',
        name: 'dept3',
        type: 'list',
        description: 'Department 3 scores',
      },
      {
        id: 'var-nested-4',
        name: 'departments',
        type: 'list',
        description: 'Array of department arrays',
      },
      {
        id: 'var-nested-5',
        name: 'grandTotal',
        type: 'number',
        description: 'Sum across all departments',
      },
      {
        id: 'var-nested-6',
        name: 'totalCount',
        type: 'number',
        description: 'Total number of scores',
      },
      {
        id: 'var-nested-7',
        name: 'dept',
        type: 'list',
        description: 'Current department array',
      },
      {
        id: 'var-nested-8',
        name: 'score',
        type: 'number',
        description: 'Current score',
      },
      {
        id: 'var-nested-9',
        name: 'overallAverage',
        type: 'number',
        description: 'Overall average score',
      },
    ],
    formulaName: 'calculateDepartmentAverages',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'nested-1',
        min: 0,
        max: 75,
        label: 'Needs Improvement',
        color: '#DA1E28',
        severity: 'error',
      },
      {
        id: 'nested-2',
        min: 76,
        max: 85,
        label: 'Satisfactory',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'nested-3',
        min: 86,
        max: null,
        label: 'Excellent',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-31T11:30:00Z',
    updatedAt: '2025-10-31T11:30:00Z',
  },
  
  {
    id: 'complex-loop-switch',
    title: 'Complex - Loops with SWITCH Inside',
    description: 'Demonstrates combining loops and switch statements for complex logic',
    formula: `// Process orders with different fulfillment rules per region
$orders = [
  {region: "north", amount: 125, priority: 1},
  {region: "south", amount: 89, priority: 2},
  {region: "east", amount: 234, priority: 1},
  {region: "west", amount: 156, priority: 3}
]

$totalFees = 0
$processedCount = 0

FOR $order IN $orders DO
  // Calculate base fee based on region
  SWITCH $order.region
    CASE "north"
      $baseFee = 15
    CASE "south"
      $baseFee = 12
    CASE "east"
      $baseFee = 18
    CASE "west"
      $baseFee = 20
    DEFAULT
      $baseFee = 25
  END
  
  // Apply priority multiplier
  IF $order.priority = 1 THEN
    $baseFee = $baseFee * 1.5
  ELSIF $order.priority = 2 THEN
    $baseFee = $baseFee * 1.2
  END
  
  $totalFees = $totalFees + $baseFee
  $processedCount = $processedCount + 1
END

$avgFee = $totalFees / $processedCount

$totalFees`,
    variables: [
      {
        id: 'var-complex-1',
        name: 'orders',
        type: 'number',
        description: 'Array of order objects',
      },
      {
        id: 'var-complex-2',
        name: 'totalFees',
        type: 'number',
        description: 'Total fulfillment fees',
      },
      {
        id: 'var-complex-3',
        name: 'processedCount',
        type: 'number',
        description: 'Number of orders processed',
      },
      {
        id: 'var-complex-4',
        name: 'order',
        type: 'number',
        description: 'Current order being processed',
      },
      {
        id: 'var-complex-5',
        name: 'baseFee',
        type: 'number',
        description: 'Base fulfillment fee',
      },
      {
        id: 'var-complex-6',
        name: 'avgFee',
        type: 'number',
        description: 'Average fee per order',
      },
    ],
    formulaName: 'calculateFulfillmentFees',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'complex-1',
        min: 0,
        max: 60,
        label: 'Low Cost',
        color: '#24A148',
        severity: 'success',
      },
      {
        id: 'complex-2',
        min: 61,
        max: 90,
        label: 'Standard Cost',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'complex-3',
        min: 91,
        max: null,
        label: 'High Cost',
        color: '#F1C21B',
        severity: 'warning',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-10-31T11:45:00Z',
    updatedAt: '2025-10-31T11:45:00Z',
  },
  
  // ============================================================
  // PHASE 5: NATURAL LANGUAGE OPERATORS & FUNCTIONS
  // ============================================================
  
  {
    id: 'nl-comparison-operators',
    title: 'Natural Language Comparison Operators',
    description: 'Use readable comparisons like "is greater than" instead of symbols',
    formula: `// Natural language comparison operators
'price' = 150
'min price' = 100
'max price' = 200
'discount threshold' = 150

IF 'price' is greater than 'min price' THEN
  'status' = "Above minimum"
END

IF 'price' is less than or equal to 'discount threshold' THEN
  'eligible for discount' = TRUE
ELSE
  'eligible for discount' = FALSE
END

IF 'price' is greater than or equal to 'min price' AND 'price' is less than or equal to 'max price' THEN
  'in range' = TRUE
ELSE
  'in range' = FALSE
END

RETURN 'in range'`,
    variables: [
      {
        id: 'nl-comp-1',
        name: 'price',
        type: 'number',
        description: 'Current price',
        verbalization: 'price',
      },
      {
        id: 'nl-comp-2',
        name: 'minPrice',
        type: 'number',
        description: 'Minimum allowed price',
        verbalization: 'min price',
      },
      {
        id: 'nl-comp-3',
        name: 'maxPrice',
        type: 'number',
        description: 'Maximum allowed price',
        verbalization: 'max price',
      },
      {
        id: 'nl-comp-4',
        name: 'discountThreshold',
        type: 'number',
        description: 'Price threshold for discount',
        verbalization: 'discount threshold',
      },
      {
        id: 'nl-comp-5',
        name: 'status',
        type: 'string',
        description: 'Price status message',
        verbalization: 'status',
      },
      {
        id: 'nl-comp-6',
        name: 'eligibleForDiscount',
        type: 'boolean',
        description: 'Whether eligible for discount',
        verbalization: 'eligible for discount',
      },
      {
        id: 'nl-comp-7',
        name: 'inRange',
        type: 'boolean',
        description: 'Whether price is in valid range',
        verbalization: 'in range',
      },
    ],
    formulaName: 'naturalLanguageComparisons',
    formulaReturnType: 'boolean',
    category: 'verbalizations',
    createdAt: '2025-11-07T12:00:00Z',
    updatedAt: '2025-11-07T12:00:00Z',
  },
  
  {
    id: 'nl-arithmetic-operators',
    title: 'Natural Language Arithmetic Operators',
    description: 'Use readable math like "multiplied by" and "divided by"',
    formula: `// Natural language arithmetic operators
'base amount' = 100
'tax rate' = 0.08
'quantity' = 5

// Using natural language arithmetic
'subtotal' = 'base amount' times 'quantity'
'tax' = 'subtotal' multiplied by 'tax rate'
'total before discount' = 'subtotal' plus 'tax'

'discount amount' = 'total before discount' divided by 10
'final total' = 'total before discount' minus 'discount amount'

// Power operators
'area side' = 4
'area' = 'area side' squared
'volume side' = 3
'volume' = 'volume side' cubed

// Using "to the power of"
'base' = 2
'exponent' = 8
'result' = 'base' to the power of 'exponent'

RETURN 'final total'`,
    variables: [
      {
        id: 'nl-arith-1',
        name: 'baseAmount',
        type: 'number',
        description: 'Base price per unit',
        verbalization: 'base amount',
      },
      {
        id: 'nl-arith-2',
        name: 'taxRate',
        type: 'number',
        description: 'Tax rate as decimal',
        verbalization: 'tax rate',
      },
      {
        id: 'nl-arith-3',
        name: 'quantity',
        type: 'number',
        description: 'Number of units',
        verbalization: 'quantity',
      },
      {
        id: 'nl-arith-4',
        name: 'subtotal',
        type: 'number',
        description: 'Subtotal before tax',
        verbalization: 'subtotal',
      },
      {
        id: 'nl-arith-5',
        name: 'tax',
        type: 'number',
        description: 'Tax amount',
        verbalization: 'tax',
      },
      {
        id: 'nl-arith-6',
        name: 'totalBeforeDiscount',
        type: 'number',
        description: 'Total before discount',
        verbalization: 'total before discount',
      },
      {
        id: 'nl-arith-7',
        name: 'discountAmount',
        type: 'number',
        description: 'Discount amount',
        verbalization: 'discount amount',
      },
      {
        id: 'nl-arith-8',
        name: 'finalTotal',
        type: 'number',
        description: 'Final total after discount',
        verbalization: 'final total',
      },
      {
        id: 'nl-arith-9',
        name: 'areaSide',
        type: 'number',
        description: 'Side length for area calculation',
        verbalization: 'area side',
      },
      {
        id: 'nl-arith-10',
        name: 'area',
        type: 'number',
        description: 'Calculated area',
        verbalization: 'area',
      },
      {
        id: 'nl-arith-11',
        name: 'volumeSide',
        type: 'number',
        description: 'Side length for volume calculation',
        verbalization: 'volume side',
      },
      {
        id: 'nl-arith-12',
        name: 'volume',
        type: 'number',
        description: 'Calculated volume',
        verbalization: 'volume',
      },
      {
        id: 'nl-arith-13',
        name: 'base',
        type: 'number',
        description: 'Base for exponentiation',
        verbalization: 'base',
      },
      {
        id: 'nl-arith-14',
        name: 'exponent',
        type: 'number',
        description: 'Exponent value',
        verbalization: 'exponent',
      },
      {
        id: 'nl-arith-15',
        name: 'result',
        type: 'number',
        description: 'Calculated result',
        verbalization: 'result',
      },
    ],
    formulaName: 'naturalLanguageArithmetic',
    formulaReturnType: 'number',
    category: 'verbalizations',
    createdAt: '2025-11-07T12:15:00Z',
    updatedAt: '2025-11-07T12:15:00Z',
  },
  
  {
    id: 'nl-aggregate-functions',
    title: 'Natural Language Aggregate Functions',
    description: 'Use functions like "the sum of" and "the average of"',
    formula: `// Natural language aggregate functions
'prices' = [10.50, 25.00, 15.75, 30.25, 12.50]
'quantities' = [2, 1, 3, 1, 4]

// Aggregate calculations with natural language
'total price' = the sum of 'prices'
'average price' = the average of 'prices'
'highest price' = the maximum of 'prices'
'lowest price' = the minimum of 'prices'
'product count' = the count of 'prices'

// Alternative syntax for sum
'total quantity' = the total of 'quantities'

// Check if we have items
IF 'product count' is greater than 0 THEN
  'summary' = "We have " + 'product count' + " products with average price of $" + 'average price'
ELSE
  'summary' = "No products"
END

RETURN 'summary'`,
    variables: [
      {
        id: 'nl-agg-1',
        name: 'prices',
        type: 'list',
        description: 'List of product prices',
        verbalization: 'prices',
      },
      {
        id: 'nl-agg-2',
        name: 'quantities',
        type: 'list',
        description: 'List of quantities',
        verbalization: 'quantities',
      },
      {
        id: 'nl-agg-3',
        name: 'totalPrice',
        type: 'number',
        description: 'Sum of all prices',
        verbalization: 'total price',
      },
      {
        id: 'nl-agg-4',
        name: 'averagePrice',
        type: 'number',
        description: 'Average price',
        verbalization: 'average price',
      },
      {
        id: 'nl-agg-5',
        name: 'highestPrice',
        type: 'number',
        description: 'Highest price',
        verbalization: 'highest price',
      },
      {
        id: 'nl-agg-6',
        name: 'lowestPrice',
        type: 'number',
        description: 'Lowest price',
        verbalization: 'lowest price',
      },
      {
        id: 'nl-agg-7',
        name: 'productCount',
        type: 'number',
        description: 'Number of products',
        verbalization: 'product count',
      },
      {
        id: 'nl-agg-8',
        name: 'totalQuantity',
        type: 'number',
        description: 'Total quantity',
        verbalization: 'total quantity',
      },
      {
        id: 'nl-agg-9',
        name: 'summary',
        type: 'string',
        description: 'Summary message',
        verbalization: 'summary',
      },
    ],
    formulaName: 'naturalLanguageAggregates',
    formulaReturnType: 'string',
    category: 'verbalizations',
    createdAt: '2025-11-07T12:30:00Z',
    updatedAt: '2025-11-07T12:30:00Z',
  },
  
  {
    id: 'nl-array-functions',
    title: 'Natural Language Array Functions',
    description: 'Use "the first element of" and "the last element of" for arrays',
    formula: `// Natural language array functions
'order items' = ["Laptop", "Mouse", "Keyboard", "Monitor", "Cable"]
'order prices' = [999, 25, 75, 450, 15]

// Access array elements with natural language
'first item' = the first element of 'order items'
'last item' = the last element of 'order items'

// Alternative shorter syntax
'first price' = the first of 'order prices'
'last price' = the last of 'order prices'

// Get array properties
'total items' = the length of 'order items'
'item count' = the size of 'order prices'

// Build a summary
'summary' = "Order: " + 'first item' + " to " + 'last item' + " (" + 'total items' + " items)"

RETURN 'summary'`,
    variables: [
      {
        id: 'nl-arr-fn-1',
        name: 'orderItems',
        type: 'list',
        description: 'List of ordered items',
        verbalization: 'order items',
      },
      {
        id: 'nl-arr-fn-2',
        name: 'orderPrices',
        type: 'list',
        description: 'List of prices',
        verbalization: 'order prices',
      },
      {
        id: 'nl-arr-fn-3',
        name: 'firstItem',
        type: 'string',
        description: 'First item in order',
        verbalization: 'first item',
      },
      {
        id: 'nl-arr-fn-4',
        name: 'lastItem',
        type: 'string',
        description: 'Last item in order',
        verbalization: 'last item',
      },
      {
        id: 'nl-arr-fn-5',
        name: 'firstPrice',
        type: 'number',
        description: 'First price',
        verbalization: 'first price',
      },
      {
        id: 'nl-arr-fn-6',
        name: 'lastPrice',
        type: 'number',
        description: 'Last price',
        verbalization: 'last price',
      },
      {
        id: 'nl-arr-fn-7',
        name: 'totalItems',
        type: 'number',
        description: 'Total number of items',
        verbalization: 'total items',
      },
      {
        id: 'nl-arr-fn-8',
        name: 'itemCount',
        type: 'number',
        description: 'Count of items',
        verbalization: 'item count',
      },
      {
        id: 'nl-arr-fn-9',
        name: 'summary',
        type: 'string',
        description: 'Order summary',
        verbalization: 'summary',
      },
    ],
    formulaName: 'naturalLanguageArrays',
    formulaReturnType: 'string',
    category: 'verbalizations',
    createdAt: '2025-11-07T12:45:00Z',
    updatedAt: '2025-11-07T12:45:00Z',
  },
  
  {
    id: 'nl-predicates',
    title: 'Natural Language Predicates (null, empty, string checks)',
    description: 'Use "is null", "is empty", "starts with", "ends with", "contains"',
    formula: `// Natural language predicate functions
'email' = "admin@example.com"
'filename' = "report.pdf"
'error message' = ""
'user input' = NULL
'valid codes' = ["ADMIN", "USER", "GUEST"]

// Null checks
IF 'user input' is null THEN
  'input status' = "No input provided"
ELSE
  'input status' = "Input received"
END

// Empty checks
IF 'error message' is empty THEN
  'has error' = FALSE
ELSE
  'has error' = TRUE
END

// String predicates
IF 'email' starts with "admin@" THEN
  'user type' = "Administrator"
ELSIF 'email' starts with "support@" THEN
  'user type' = "Support"
ELSE
  'user type' = "Regular User"
END

IF 'filename' ends with ".pdf" THEN
  'file type' = "PDF Document"
ELSIF 'filename' ends with ".txt" THEN
  'file type' = "Text File"
ELSE
  'file type' = "Unknown"
END

IF 'email' contains "example.com" THEN
  'domain match' = TRUE
ELSE
  'domain match' = FALSE
END

RETURN 'user type'`,
    variables: [
      {
        id: 'nl-pred-1',
        name: 'email',
        type: 'string',
        description: 'User email address',
        verbalization: 'email',
      },
      {
        id: 'nl-pred-2',
        name: 'filename',
        type: 'string',
        description: 'File name',
        verbalization: 'filename',
      },
      {
        id: 'nl-pred-3',
        name: 'errorMessage',
        type: 'string',
        description: 'Error message if any',
        verbalization: 'error message',
      },
      {
        id: 'nl-pred-4',
        name: 'userInput',
        type: 'string',
        description: 'User input value',
        verbalization: 'user input',
      },
      {
        id: 'nl-pred-5',
        name: 'validCodes',
        type: 'list',
        description: 'List of valid access codes',
        verbalization: 'valid codes',
      },
      {
        id: 'nl-pred-6',
        name: 'inputStatus',
        type: 'string',
        description: 'Status of user input',
        verbalization: 'input status',
      },
      {
        id: 'nl-pred-7',
        name: 'hasError',
        type: 'boolean',
        description: 'Whether error exists',
        verbalization: 'has error',
      },
      {
        id: 'nl-pred-8',
        name: 'userType',
        type: 'string',
        description: 'Type of user',
        verbalization: 'user type',
      },
      {
        id: 'nl-pred-9',
        name: 'fileType',
        type: 'string',
        description: 'Type of file',
        verbalization: 'file type',
      },
      {
        id: 'nl-pred-10',
        name: 'domainMatch',
        type: 'boolean',
        description: 'Whether domain matches',
        verbalization: 'domain match',
      },
    ],
    formulaName: 'naturalLanguagePredicates',
    formulaReturnType: 'string',
    category: 'verbalizations',
    createdAt: '2025-11-07T13:00:00Z',
    updatedAt: '2025-11-07T13:00:00Z',
  },
  
  {
    id: 'nl-comprehensive-example',
    title: 'Comprehensive Natural Language Example',
    description: 'Real-world example using all natural language features together',
    formula: `// Real-world pricing decision using natural language
'customer tier' = "Gold"
'order items' = ["Laptop", "Mouse", "Keyboard"]
'order prices' = [999, 25, 75]
'customer email' = "vip@example.com"
'promo code' = "SAVE20"

// Calculate base total
'base total' = the sum of 'order prices'

// Check customer tier for discounts
IF 'customer tier' is equal to "Gold" THEN
  'tier discount' = 'base total' multiplied by 0.15
ELSIF 'customer tier' is equal to "Silver" THEN
  'tier discount' = 'base total' multiplied by 0.10
ELSE
  'tier discount' = 0
END

// Check for VIP email domain
IF 'customer email' starts with "vip@" THEN
  'vip bonus' = 50
ELSE
  'vip bonus' = 0
END

// Check promo code
IF 'promo code' is not empty AND 'promo code' contains "SAVE" THEN
  'promo discount' = 'base total' multiplied by 0.20
ELSE
  'promo discount' = 0
END

// Calculate final price
'total discount' = the maximum of 'tier discount', 'promo discount'
'subtotal' = 'base total' minus 'total discount'
'final price' = 'subtotal' minus 'vip bonus'

// Ensure minimum order
IF 'final price' is less than 100 THEN
  'final price' = 100
END

// Get order summary
'item count' = the length of 'order items'
'first item' = the first of 'order items'
'last item' = the last of 'order items'

'summary' = 'item count' plus " items (" plus 'first item' plus " to " plus 'last item' plus ") = $" plus 'final price'

RETURN 'summary'`,
    variables: [
      {
        id: 'nl-comp-ex-1',
        name: 'customerTier',
        type: 'string',
        description: 'Customer loyalty tier',
        verbalization: 'customer tier',
      },
      {
        id: 'nl-comp-ex-2',
        name: 'orderItems',
        type: 'list',
        description: 'List of items in order',
        verbalization: 'order items',
      },
      {
        id: 'nl-comp-ex-3',
        name: 'orderPrices',
        type: 'list',
        description: 'List of item prices',
        verbalization: 'order prices',
      },
      {
        id: 'nl-comp-ex-4',
        name: 'customerEmail',
        type: 'string',
        description: 'Customer email address',
        verbalization: 'customer email',
      },
      {
        id: 'nl-comp-ex-5',
        name: 'promoCode',
        type: 'string',
        description: 'Promotional code',
        verbalization: 'promo code',
      },
      {
        id: 'nl-comp-ex-6',
        name: 'baseTotal',
        type: 'number',
        description: 'Base order total',
        verbalization: 'base total',
      },
      {
        id: 'nl-comp-ex-7',
        name: 'tierDiscount',
        type: 'number',
        description: 'Discount from tier',
        verbalization: 'tier discount',
      },
      {
        id: 'nl-comp-ex-8',
        name: 'vipBonus',
        type: 'number',
        description: 'VIP bonus discount',
        verbalization: 'vip bonus',
      },
      {
        id: 'nl-comp-ex-9',
        name: 'promoDiscount',
        type: 'number',
        description: 'Promo code discount',
        verbalization: 'promo discount',
      },
      {
        id: 'nl-comp-ex-10',
        name: 'totalDiscount',
        type: 'number',
        description: 'Total discount applied',
        verbalization: 'total discount',
      },
      {
        id: 'nl-comp-ex-11',
        name: 'subtotal',
        type: 'number',
        description: 'Subtotal after discount',
        verbalization: 'subtotal',
      },
      {
        id: 'nl-comp-ex-12',
        name: 'finalPrice',
        type: 'number',
        description: 'Final price',
        verbalization: 'final price',
      },
      {
        id: 'nl-comp-ex-13',
        name: 'itemCount',
        type: 'number',
        description: 'Number of items',
        verbalization: 'item count',
      },
      {
        id: 'nl-comp-ex-14',
        name: 'firstItem',
        type: 'string',
        description: 'First item name',
        verbalization: 'first item',
      },
      {
        id: 'nl-comp-ex-15',
        name: 'lastItem',
        type: 'string',
        description: 'Last item name',
        verbalization: 'last item',
      },
      {
        id: 'nl-comp-ex-16',
        name: 'summary',
        type: 'string',
        description: 'Order summary',
        verbalization: 'summary',
      },
    ],
    formulaName: 'comprehensiveNaturalLanguage',
    formulaReturnType: 'string',
    category: 'verbalizations',
    createdAt: '2025-11-07T13:15:00Z',
    updatedAt: '2025-11-07T13:15:00Z',
  },
  
  // =========================================
  // PHASE 5.8: NATURAL LANGUAGE CONTROL STRUCTURES
  // =========================================
  
  {
    id: 'phase58-discount-calculator',
    title: 'E-commerce Discount Calculator (Phase 5.8)',
    description: 'Demonstrates natural language variables with IF/ELSIF/ELSE structure',
    formula: `// Initialize base discount
'base discount' = 0

// Determine loyalty discount
IF 'customer tier' = "platinum" THEN
  'base discount' = 0.20
ELSIF 'customer tier' = "gold" THEN
  'base discount' = 0.15
ELSIF 'customer tier' = "silver" THEN
  'base discount' = 0.10
ELSE
  'base discount' = 0.05
END

// Add volume discount
IF 'order total' > 1000 THEN
  'volume discount' = 0.05
ELSE
  'volume discount' = 0
END

// Calculate total discount
'total discount' = 'base discount' + 'volume discount'

// Apply discount cap
IF 'total discount' > 0.30 THEN
  'total discount' = 0.30
END

// Calculate final price
'final price' = 'order total' * (1 - 'total discount')

RETURN 'final price'`,
    variables: [
      {
        id: 'phase58-dc-1',
        name: 'customerTier',
        type: 'string',
        description: 'Customer loyalty tier (platinum, gold, silver, bronze)',
        verbalization: 'customer tier',
      },
      {
        id: 'phase58-dc-2',
        name: 'orderTotal',
        type: 'number',
        description: 'Total order amount before discounts',
        verbalization: 'order total',
      },
      {
        id: 'phase58-dc-3',
        name: 'baseDiscount',
        type: 'number',
        description: 'Base discount from loyalty tier',
        verbalization: 'base discount',
      },
      {
        id: 'phase58-dc-4',
        name: 'volumeDiscount',
        type: 'number',
        description: 'Additional discount for large orders',
        verbalization: 'volume discount',
      },
      {
        id: 'phase58-dc-5',
        name: 'totalDiscount',
        type: 'number',
        description: 'Total discount percentage',
        verbalization: 'total discount',
      },
      {
        id: 'phase58-dc-6',
        name: 'finalPrice',
        type: 'number',
        description: 'Final price after discounts',
        verbalization: 'final price',
      },
    ],
    formulaName: 'ecommerceDiscountCalculator',
    formulaReturnType: 'number',
    category: 'verbalizations',
    createdAt: '2025-01-07T14:00:00Z',
    updatedAt: '2025-01-07T14:00:00Z',
  },
  
  {
    id: 'phase58-loan-approval',
    title: 'Loan Approval Decision (Phase 5.8)',
    description: 'Demonstrates natural language variables with complex boolean logic',
    formula: `// Initialize decision variables
'approved' = FALSE
'interest rate' = 0
'loan amount' = 0

// Evaluate credit worthiness
IF 'credit score' >= 750 THEN
  'approved' = TRUE
  'interest rate' = 0.035
  'approval reason' = "Excellent credit score"
ELSIF 'credit score' >= 650 AND 'annual income' > 50000 THEN
  'approved' = TRUE
  'interest rate' = 0.045
  'approval reason' = "Good credit with sufficient income"
ELSIF 'credit score' >= 600 AND 'annual income' > 75000 THEN
  'approved' = TRUE
  'interest rate' = 0.055
  'approval reason' = "High income compensates for credit"
ELSE
  'approved' = FALSE
  'approval reason' = "Credit score or income too low"
END

// Calculate loan amount if approved
IF 'approved' = TRUE THEN
  IF 'annual income' > 100000 THEN
    'loan amount' = 500000
  ELSIF 'annual income' > 75000 THEN
    'loan amount' = 350000
  ELSE
    'loan amount' = 200000
  END
END

RETURN 'approved'`,
    variables: [
      {
        id: 'phase58-la-1',
        name: 'creditScore',
        type: 'number',
        description: 'Credit score (300-850)',
        verbalization: 'credit score',
      },
      {
        id: 'phase58-la-2',
        name: 'annualIncome',
        type: 'number',
        description: 'Annual income in dollars',
        verbalization: 'annual income',
      },
      {
        id: 'phase58-la-3',
        name: 'approved',
        type: 'boolean',
        description: 'Loan approval status',
        verbalization: 'approved',
      },
      {
        id: 'phase58-la-4',
        name: 'interestRate',
        type: 'number',
        description: 'Interest rate (decimal)',
        verbalization: 'interest rate',
      },
      {
        id: 'phase58-la-5',
        name: 'loanAmount',
        type: 'number',
        description: 'Maximum loan amount',
        verbalization: 'loan amount',
      },
      {
        id: 'phase58-la-6',
        name: 'approvalReason',
        type: 'string',
        description: 'Reason for approval/denial',
        verbalization: 'approval reason',
      },
    ],
    formulaName: 'loanApprovalDecision',
    formulaReturnType: 'boolean',
    category: 'verbalizations',
    createdAt: '2025-01-07T14:00:00Z',
    updatedAt: '2025-01-07T14:00:00Z',
  },
  
  {
    id: 'phase58-shipping-cost',
    title: 'Shipping Cost Calculator (Phase 5.8)',
    description: 'Demonstrates natural language variables with weight-based pricing and distance surcharges',
    formula: `// Weight-based base cost
IF 'weight' <= 1 THEN
  'base cost' = 5.00
ELSIF 'weight' <= 5 THEN
  'base cost' = 10.00
ELSIF 'weight' <= 10 THEN
  'base cost' = 15.00
ELSE
  'base cost' = 20.00
END

// Shipping speed multiplier
IF 'shipping speed' = "express" THEN
  'speed multiplier' = 1.5
ELSIF 'shipping speed' = "overnight" THEN
  'speed multiplier' = 2.0
ELSE
  'speed multiplier' = 1.0
END

// Calculate shipping cost
'shipping cost' = 'base cost' * 'speed multiplier'

// Add distance surcharge for long distances
IF 'distance' > 100 THEN
  'distance surcharge' = ('distance' - 100) * 0.10
  'shipping cost' = 'shipping cost' + 'distance surcharge'
ELSE
  'distance surcharge' = 0
END

// Free shipping for orders over $50
IF 'order value' >= 50 THEN
  'shipping cost' = 0
  'shipping message' = "Free shipping applied!"
ELSE
  'shipping message' = "Shipping calculated"
END

RETURN 'shipping cost'`,
    variables: [
      {
        id: 'phase58-sc-1',
        name: 'weight',
        type: 'number',
        description: 'Package weight in pounds',
        verbalization: 'weight',
      },
      {
        id: 'phase58-sc-2',
        name: 'shippingSpeed',
        type: 'string',
        description: 'Shipping speed (standard, express, overnight)',
        verbalization: 'shipping speed',
      },
      {
        id: 'phase58-sc-3',
        name: 'distance',
        type: 'number',
        description: 'Shipping distance in miles',
        verbalization: 'distance',
      },
      {
        id: 'phase58-sc-4',
        name: 'orderValue',
        type: 'number',
        description: 'Order value in dollars',
        verbalization: 'order value',
      },
      {
        id: 'phase58-sc-5',
        name: 'baseCost',
        type: 'number',
        description: 'Base shipping cost',
        verbalization: 'base cost',
      },
      {
        id: 'phase58-sc-6',
        name: 'speedMultiplier',
        type: 'number',
        description: 'Speed-based multiplier',
        verbalization: 'speed multiplier',
      },
      {
        id: 'phase58-sc-7',
        name: 'distanceSurcharge',
        type: 'number',
        description: 'Surcharge for long distances',
        verbalization: 'distance surcharge',
      },
      {
        id: 'phase58-sc-8',
        name: 'shippingCost',
        type: 'number',
        description: 'Final shipping cost',
        verbalization: 'shipping cost',
      },
      {
        id: 'phase58-sc-9',
        name: 'shippingMessage',
        type: 'string',
        description: 'Shipping status message',
        verbalization: 'shipping message',
      },
    ],
    formulaName: 'shippingCostCalculator',
    formulaReturnType: 'number',
    category: 'verbalizations',
    createdAt: '2025-01-07T14:00:00Z',
    updatedAt: '2025-01-07T14:00:00Z',
  },
  
  {
    id: 'phase58-employee-bonus',
    title: 'Employee Bonus Calculation (Phase 5.8)',
    description: 'Demonstrates natural language variables with performance tiers and multiple bonus components',
    formula: `// Determine performance multiplier
IF 'performance rating' >= 4.5 THEN
  'multiplier' = 1.5
  'bonus message' = "Exceptional performance!"
ELSIF 'performance rating' >= 3.5 THEN
  'multiplier' = 1.2
  'bonus message' = "Great work!"
ELSIF 'performance rating' >= 2.5 THEN
  'multiplier' = 1.0
  'bonus message' = "Good effort!"
ELSE
  'multiplier' = 0.5
  'bonus message' = "Improvement needed"
END

// Calculate base bonus (10% of salary)
'base bonus' = 'salary' * 0.10

// Apply performance multiplier
'performance bonus' = 'base bonus' * 'multiplier'

// Add tenure bonus
IF 'years of service' >= 10 THEN
  'tenure bonus' = 2000
  'performance bonus' = 'performance bonus' + 'tenure bonus'
ELSIF 'years of service' >= 5 THEN
  'tenure bonus' = 1000
  'performance bonus' = 'performance bonus' + 'tenure bonus'
ELSE
  'tenure bonus' = 0
END

// Apply company-wide cap
IF 'performance bonus' > 25000 THEN
  'performance bonus' = 25000
  'bonus message' = 'bonus message' + " (capped at maximum)"
END

RETURN 'performance bonus'`,
    variables: [
      {
        id: 'phase58-eb-1',
        name: 'performanceRating',
        type: 'number',
        description: 'Performance rating (1-5)',
        verbalization: 'performance rating',
      },
      {
        id: 'phase58-eb-2',
        name: 'salary',
        type: 'number',
        description: 'Annual salary',
        verbalization: 'salary',
      },
      {
        id: 'phase58-eb-3',
        name: 'yearsOfService',
        type: 'number',
        description: 'Years with company',
        verbalization: 'years of service',
      },
      {
        id: 'phase58-eb-4',
        name: 'multiplier',
        type: 'number',
        description: 'Performance multiplier',
        verbalization: 'multiplier',
      },
      {
        id: 'phase58-eb-5',
        name: 'baseBonus',
        type: 'number',
        description: 'Base bonus amount',
        verbalization: 'base bonus',
      },
      {
        id: 'phase58-eb-6',
        name: 'performanceBonus',
        type: 'number',
        description: 'Final bonus amount',
        verbalization: 'performance bonus',
      },
      {
        id: 'phase58-eb-7',
        name: 'tenureBonus',
        type: 'number',
        description: 'Tenure bonus amount',
        verbalization: 'tenure bonus',
      },
      {
        id: 'phase58-eb-8',
        name: 'bonusMessage',
        type: 'string',
        description: 'Bonus description message',
        verbalization: 'bonus message',
      },
    ],
    formulaName: 'employeeBonusCalculation',
    formulaReturnType: 'number',
    category: 'verbalizations',
    createdAt: '2025-01-07T14:00:00Z',
    updatedAt: '2025-01-07T14:00:00Z',
  },
  
  {
    id: 'phase58-insurance-premium',
    title: 'Insurance Premium Calculator (Phase 5.8)',
    description: 'Comprehensive example demonstrating natural language variables with complex boolean logic',
    formula: `// Start with base premium
'base premium' = 500

// Age factor
IF 'age' < 25 THEN
  'age factor' = 1.5
ELSIF 'age' < 35 THEN
  'age factor' = 1.2
ELSIF 'age' < 50 THEN
  'age factor' = 1.0
ELSE
  'age factor' = 1.3
END

// Driving record factor
IF 'accidents' = 0 AND 'tickets' = 0 THEN
  'record factor' = 0.9
  'safe driver discount' = TRUE
  'record message' = "Safe driver discount applied"
ELSIF 'accidents' > 2 OR 'tickets' > 3 THEN
  'record factor' = 1.5
  'safe driver discount' = FALSE
  'record message' = "High risk - premium increased"
ELSE
  'record factor' = 1.2
  'safe driver discount' = FALSE
  'record message' = "Standard rating"
END

// Calculate base premium with factors
'premium' = 'base premium' * 'age factor' * 'record factor'

// Apply multi-policy discount
IF 'has home insurance' = TRUE THEN
  'multi policy discount' = 0.10
  'discount amount' = 'premium' * 'multi policy discount'
  'premium' = 'premium' - 'discount amount'
ELSE
  'multi policy discount' = 0
  'discount amount' = 0
END

// Calculate final premium
'final premium' = 'premium'

RETURN 'final premium'`,
    variables: [
      {
        id: 'phase58-ip-1',
        name: 'age',
        type: 'number',
        description: 'Driver age',
        verbalization: 'age',
      },
      {
        id: 'phase58-ip-2',
        name: 'accidents',
        type: 'number',
        description: 'Number of accidents in last 5 years',
        verbalization: 'accidents',
      },
      {
        id: 'phase58-ip-3',
        name: 'tickets',
        type: 'number',
        description: 'Number of tickets in last 5 years',
        verbalization: 'tickets',
      },
      {
        id: 'phase58-ip-4',
        name: 'hasHomeInsurance',
        type: 'boolean',
        description: 'Has home insurance with same company',
        verbalization: 'has home insurance',
      },
      {
        id: 'phase58-ip-5',
        name: 'basePremium',
        type: 'number',
        description: 'Base premium amount',
        verbalization: 'base premium',
      },
      {
        id: 'phase58-ip-6',
        name: 'ageFactor',
        type: 'number',
        description: 'Age-based risk factor',
        verbalization: 'age factor',
      },
      {
        id: 'phase58-ip-7',
        name: 'recordFactor',
        type: 'number',
        description: 'Driving record risk factor',
        verbalization: 'record factor',
      },
      {
        id: 'phase58-ip-8',
        name: 'safeDriverDiscount',
        type: 'boolean',
        description: 'Safe driver discount applied',
        verbalization: 'safe driver discount',
      },
      {
        id: 'phase58-ip-9',
        name: 'recordMessage',
        type: 'string',
        description: 'Driving record message',
        verbalization: 'record message',
      },
      {
        id: 'phase58-ip-10',
        name: 'premium',
        type: 'number',
        description: 'Premium before multi-policy discount',
        verbalization: 'premium',
      },
      {
        id: 'phase58-ip-11',
        name: 'multiPolicyDiscount',
        type: 'number',
        description: 'Multi-policy discount rate',
        verbalization: 'multi policy discount',
      },
      {
        id: 'phase58-ip-12',
        name: 'discountAmount',
        type: 'number',
        description: 'Multi-policy discount amount',
        verbalization: 'discount amount',
      },
      {
        id: 'phase58-ip-13',
        name: 'finalPremium',
        type: 'number',
        description: 'Final premium amount',
        verbalization: 'final premium',
      },
    ],
    formulaName: 'insurancePremiumCalculator',
    formulaReturnType: 'number',
    category: 'verbalizations',
    createdAt: '2025-01-07T14:00:00Z',
    updatedAt: '2025-01-07T14:00:00Z',
  },
];