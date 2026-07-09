/**
 * Object and List Sample Formulas
 * 
 * Demonstrates working with objects and lists in the Formula Editor.
 * Includes real-world examples from the screenshots.
 */

import type { Variable, Threshold } from '../components/editors/core/types';
import type { FormulaDocument } from './formulaSamples';

export const objectListSamples: FormulaDocument[] = [
  {
    id: 'object-basics',
    title: 'Object Basics - Creating and Accessing',
    description: 'Create a customer record object and extract individual properties',
    formula: `// Create a customer record object
$customer = {name: "Alice Chen", age: 32, score: 850}

// Access individual properties
$customerName = $customer.name
$customerAge = $customer.age
$customerScore = $customer.score

RETURN $customerScore`,
    variables: [
      {
        id: 'var-obj-1',
        name: 'customer',
        type: 'object',
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
    formulaName: 'extractCustomerProperties',
    formulaReturnType: 'number',
    createdAt: '2025-11-04T10:00:00Z',
    updatedAt: '2025-11-04T10:00:00Z',
  },
  
  {
    id: 'csv-text-processing',
    title: 'CSV Text Processing',
    description: 'Split string from external source, parse as a list, and process fruits',
    formula: `$csvData = "apple,banana,cherry,date,elderberry"
$fruits = SPLIT($csvData, ",")
$fruitCount = LENGTH($fruits)
$firstFruit = FIRST($fruits)
$lastFruit = LAST($fruits)
$hasCherry = CONTAINS($fruits, "cherry")

RETURN $fruitCount`,
    variables: [
      {
        id: 'var-csv-1',
        name: 'csvData',
        type: 'string',
        description: 'CSV formatted string',
      },
      {
        id: 'var-csv-2',
        name: 'fruits',
        type: 'list',
        description: 'List of fruits',
      },
      {
        id: 'var-csv-3',
        name: 'fruitCount',
        type: 'number',
        description: 'Number of fruits',
      },
      {
        id: 'var-csv-4',
        name: 'firstFruit',
        type: 'string',
        description: 'First fruit in list',
      },
      {
        id: 'var-csv-5',
        name: 'lastFruit',
        type: 'string',
        description: 'Last fruit in list',
      },
      {
        id: 'var-csv-6',
        name: 'hasCherry',
        type: 'boolean',
        description: 'Whether in list contains cherry',
      },
    ],
    formulaName: 'processCSVData',
    formulaReturnType: 'number',
    createdAt: '2025-11-04T10:05:00Z',
    updatedAt: '2025-11-04T10:05:00Z',
  },
  
  {
    id: 'student-grade-analysis',
    title: 'Student Grade Analysis',
    description: 'Analyze test scores using list operations',
    formula: `// Test scores for the semester
$scores = [85, 92, 78, 88, 91, 87, 94]

// Calculate final grade
$avgScore = LIST_AVG($scores)
$highestScore = LIST_MAX($scores)
$lowestScore = LIST_MIN($scores)
$totalTests = LENGTH($scores)

// Check if student passed all tests
$hasFailing = CONTAINS($scores, 60)

// Get first and last test
$firstTest = FIRST($scores)
$lastTest = LAST($scores)

// Check if specific grade exists in list and assign bonus
IF CONTAINS($scores, 92) THEN
  $bonus = 5
ELSE
  $bonus = 0
END

// Calculate improvement bonus (if last score > first score)
IF $lastTest > $firstTest THEN
  $finalGrade = $avgScore + $bonus
ELSE
  $finalGrade = $avgScore
END

RETURN $finalGrade`,
    variables: [
      {
        id: 'var-grades-1',
        name: 'scores',
        type: 'list',
        description: 'List of test scores',
      },
      {
        id: 'var-grades-2',
        name: 'avgScore',
        type: 'number',
        description: 'Average of all test scores',
      },
      {
        id: 'var-grades-3',
        name: 'highestScore',
        type: 'number',
        description: 'Highest test score',
      },
      {
        id: 'var-grades-4',
        name: 'lowestScore',
        type: 'number',
        description: 'Lowest test score',
      },
      {
        id: 'var-grades-5',
        name: 'totalTests',
        type: 'number',
        description: 'Total number of tests',
      },
      {
        id: 'var-grades-6',
        name: 'hasFailing',
        type: 'boolean',
        description: 'Whether there are any failing scores',
      },
      {
        id: 'var-grades-7',
        name: 'firstTest',
        type: 'number',
        description: 'First test score',
      },
      {
        id: 'var-grades-8',
        name: 'lastTest',
        type: 'number',
        description: 'Last test score',
      },
      {
        id: 'var-grades-9',
        name: 'bonus',
        type: 'number',
        description: 'Bonus points',
      },
      {
        id: 'var-grades-10',
        name: 'finalGrade',
        type: 'number',
        description: 'Final calculated grade',
      },
    ],
    formulaName: 'calculateStudentGrade',
    formulaReturnType: 'number',
    thresholds: [
      {
        id: 'grade-thresh-1',
        min: 0,
        max: 69,
        label: 'Failing',
        color: '#DA1E28',
        severity: 'error',
      },
      {
        id: 'grade-thresh-2',
        min: 70,
        max: 79,
        label: 'C',
        color: '#F1C21B',
        severity: 'warning',
      },
      {
        id: 'grade-thresh-3',
        min: 80,
        max: 89,
        label: 'B',
        color: '#0F62FE',
        severity: 'info',
      },
      {
        id: 'grade-thresh-4',
        min: 90,
        max: null,
        label: 'A',
        color: '#24A148',
        severity: 'success',
        isOpenEnded: true,
      },
    ],
    createdAt: '2025-11-04T10:10:00Z',
    updatedAt: '2025-11-04T10:10:00Z',
  },
  
  {
    id: 'sorted-fruits',
    title: 'Alphabetically Sorted Fruits',
    description: 'Sort list of fruits alphabetically and get display string',
    formula: `// Original list
$fruits = ["cherry", "apple", "banana", "date"]

// Sort alphabetically
$sortedFruits = SORT($fruits)

// Create display text
$displayText = JOIN($sortedFruits, ", ")

// Return length as score
RETURN LENGTH($sortedFruits)`,
    variables: [
      {
        id: 'var-sort-1',
        name: 'fruits',
        type: 'list',
        description: 'Unsorted list of fruits',
      },
      {
        id: 'var-sort-2',
        name: 'sortedFruits',
        type: 'list',
        description: 'Alphabetically sorted fruits',
      },
      {
        id: 'var-sort-3',
        name: 'displayText',
        type: 'string',
        description: 'Formatted display string',
      },
    ],
    formulaName: 'sortAndDisplayFruits',
    formulaReturnType: 'number',
    createdAt: '2025-11-04T10:15:00Z',
    updatedAt: '2025-11-04T10:15:00Z',
  },
];