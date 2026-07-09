/**
 * Sample Formulas: Loops and Switch/Case Statements
 * 
 * Demonstrates FOR loops, WHILE loops, SWITCH/CASE statements,
 * and BREAK/CONTINUE control flow.
 * 
 * Created for EPIC-007 Phase 1 implementation
 */

export interface LoopSwitchSample {
  name: string;
  description: string;
  category: 'for-loop' | 'while-loop' | 'switch-case' | 'advanced';
  formula: string;
  testInputs?: Record<string, any>;
  expectedOutput?: any;
  notes?: string;
}

export const loopsSwitchSamples: LoopSwitchSample[] = [
  // ============================================================================
  // FOR LOOP Examples
  // ============================================================================
  {
    name: 'Simple FOR Loop - Sum List',
    category: 'for-loop',
    description: 'Iterate over a list and sum all values',
    formula: `// Sum all values in a list
$total = 0
$numbers = [10, 20, 30, 40, 50]

FOR $num IN $numbers DO
  $total = $total + $num
END

RETURN $total`,
    testInputs: {},
    expectedOutput: 150,
    notes: 'Basic FOR loop iterating over a list'
  },

  {
    name: 'FOR Loop with Range',
    category: 'for-loop',
    description: 'Iterate over a numeric range',
    formula: `// Sum numbers from 1 to 10
$sum = 0

FOR $i IN 1..10 DO
  $sum = $sum + $i
END

RETURN $sum`,
    testInputs: {},
    expectedOutput: 55,
    notes: 'Demonstrates range syntax (1..10)'
  },

  {
    name: 'FOR Loop with Conditional',
    category: 'for-loop',
    description: 'Count items meeting a condition',
    formula: `// Count values greater than 25
$count = 0
$values = [10, 30, 15, 50, 20, 40]

FOR $value IN $values DO
  IF $value > 25 THEN
    $count = $count + 1
  END
END

RETURN $count`,
    testInputs: {},
    expectedOutput: 3,
    notes: 'Combines FOR loop with IF expression'
  },

  {
    name: 'FOR Loop with BREAK',
    category: 'for-loop',
    description: 'Find first value exceeding threshold',
    formula: `// Find first value over 30
$result = NULL
$values = [10, 20, 35, 40, 50]

FOR $value IN $values DO
  IF $value > 30 THEN
    $result = $value
    BREAK
  END
END

RETURN $result`,
    testInputs: {},
    expectedOutput: 35,
    notes: 'BREAK exits loop early when condition met'
  },

  {
    name: 'FOR Loop with CONTINUE',
    category: 'for-loop',
    description: 'Sum only positive values',
    formula: `// Sum only positive values (skip negatives)
$sum = 0
$values = [10, -5, 20, -3, 30, -8, 15]

FOR $value IN $values DO
  IF $value < 0 THEN
    CONTINUE
  END
  $sum = $sum + $value
END

RETURN $sum`,
    testInputs: {},
    expectedOutput: 75,
    notes: 'CONTINUE skips to next iteration'
  },

  {
    name: 'Commission Calculation',
    category: 'for-loop',
    description: 'Calculate tiered commission on sales',
    formula: `// Calculate total commission with tiered rates
$totalCommission = 0
$sales = [500, 1200, 800, 1500, 300]

FOR $sale IN $sales DO
  IF $sale > 1000 THEN
    $commission = $sale * 0.10
  ELSE
    $commission = $sale * 0.05
  END
  
  $totalCommission = $totalCommission + $commission
END

RETURN $totalCommission`,
    testInputs: {},
    expectedOutput: 220,
    notes: 'Real-world business logic example'
  },

  {
    name: 'Build List in Loop',
    category: 'for-loop',
    description: 'Build a new list by transforming values',
    formula: `// Apply 10% discount to all prices
$discountedPrices = []
$originalPrices = [100, 200, 150, 300]

FOR $price IN $originalPrices DO
  $discountedPrice = $price * 0.9
  $discountedPrices = CONCAT($discountedPrices, [$discountedPrice])
END

RETURN $discountedPrices`,
    testInputs: {},
    expectedOutput: [90, 180, 135, 270],
    notes: 'Using CONCAT to build a list'
  },

  // NOTE: Nested lists are not yet supported by the type system
  // This example is commented out until nested list support is added
  // {
  //   name: 'Nested FOR Loops',
  //   category: 'for-loop',
  //   description: 'Nested loops for matrix processing',
  //   formula: `// Sum all values in a matrix (list of lists)
  // $total = 0
  // $matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
  // 
  // FOR $row IN $matrix DO
  //   FOR $cell IN $row DO
  //     $total = $total + $cell
  //   END
  // END
  // 
  // RETURN $total`,
  //   testInputs: {},
  //   expectedOutput: 45,
  //   notes: 'Demonstrates nested loop structure'
  // },

  // ============================================================================
  // WHILE LOOP Examples
  // ============================================================================
  {
    name: 'Simple WHILE Loop',
    category: 'while-loop',
    description: 'Count up to a threshold',
    formula: `// Count from 1 to 10
$count = 1
$sum = 0

WHILE $count <= 10 DO
  $sum = $sum + $count
  $count = $count + 1
END

RETURN $sum`,
    testInputs: {},
    expectedOutput: 55,
    notes: 'Basic WHILE loop with counter'
  },

  {
    name: 'WHILE Loop - Find Threshold',
    category: 'while-loop',
    description: 'Double value until it exceeds threshold',
    formula: `// Double value until it exceeds 100
$value = 1

WHILE $value <= 100 DO
  $value = $value * 2
END

RETURN $value`,
    testInputs: {},
    expectedOutput: 128,
    notes: 'Iterative doubling'
  },

  {
    name: 'WHILE with BREAK',
    category: 'while-loop',
    description: 'Infinite loop with break condition',
    formula: `// Find first power of 2 over 1000
$value = 1

WHILE TRUE DO
  $value = $value * 2
  IF $value > 1000 THEN
    BREAK
  END
END

RETURN $value`,
    testInputs: {},
    expectedOutput: 1024,
    notes: 'Demonstrates WHILE TRUE with BREAK'
  },

  {
    name: 'Fibonacci Sequence',
    category: 'while-loop',
    description: 'Generate first 10 Fibonacci numbers',
    formula: `// Generate first 10 Fibonacci numbers
$fibonacci = [1, 1]
$count = 2

WHILE $count < 10 DO
  $lastIndex = LENGTH($fibonacci) - 1
  $secondLastIndex = $lastIndex - 1
  $next = $fibonacci[$lastIndex] + $fibonacci[$secondLastIndex]
  $fibonacci = CONCAT($fibonacci, [$next])
  $count = $count + 1
END

RETURN $fibonacci`,
    testInputs: {},
    expectedOutput: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
    notes: 'Classic iterative algorithm'
  },

  // ============================================================================
  // SWITCH/CASE Examples
  // ============================================================================
  {
    name: 'Simple SWITCH Statement',
    category: 'switch-case',
    description: 'Map status to priority',
    formula: `// Determine priority based on order status
$orderStatus = "urgent"
$priority = ""

SWITCH $orderStatus
  CASE "urgent"
    $priority = "high"
  CASE "standard"
    $priority = "medium"
  CASE "economy"
    $priority = "low"
  DEFAULT
    $priority = "unknown"
END

RETURN $priority`,
    testInputs: {},
    expectedOutput: 'high',
    notes: 'Basic SWITCH with string matching'
  },

  {
    name: 'SWITCH with Multiple Assignments',
    category: 'switch-case',
    description: 'Set multiple variables based on case',
    formula: `// Set shipping parameters based on order type
$orderType = "next-day"

SWITCH $orderType
  CASE "same-day"
    $shippingDays = 0
    $carrier = "express"
    $cost = 25.00
  CASE "next-day"
    $shippingDays = 1
    $carrier = "express"
    $cost = 15.00
  CASE "standard"
    $shippingDays = 5
    $carrier = "standard"
    $cost = 5.00
  DEFAULT
    $shippingDays = 7
    $carrier = "economy"
    $cost = 0.00
END

RETURN $cost`,
    testInputs: {},
    expectedOutput: 15.00,
    notes: 'Multiple assignments per case'
  },

  {
    name: 'SWITCH with Numeric Cases',
    category: 'switch-case',
    description: 'Map HTTP status codes to messages',
    formula: `// Map HTTP status code to message
$statusCode = 404

SWITCH $statusCode
  CASE 200
    $message = "Success"
  CASE 404
    $message = "Not Found"
  CASE 500
    $message = "Server Error"
  DEFAULT
    $message = "Unknown Status"
END

RETURN $message`,
    testInputs: {},
    expectedOutput: 'Not Found',
    notes: 'Demonstrates numeric case matching'
  },

  {
    name: 'Customer Tier Discount',
    category: 'switch-case',
    description: 'Calculate discount based on customer tier',
    formula: `// Calculate discount based on customer tier
$customerTier = "gold"
$orderAmount = 1000

SWITCH $customerTier
  CASE "platinum"
    $discountRate = 0.25
  CASE "gold"
    $discountRate = 0.15
  CASE "silver"
    $discountRate = 0.10
  CASE "bronze"
    $discountRate = 0.05
  DEFAULT
    $discountRate = 0.00
END

$finalAmount = $orderAmount * (1 - $discountRate)
RETURN $finalAmount`,
    testInputs: {},
    expectedOutput: 850,
    notes: 'Real-world tiered pricing example'
  },

  {
    name: 'SWITCH as Expression',
    category: 'switch-case',
    description: 'Use SWITCH result in assignment',
    formula: `// Assign SWITCH result directly to variable
$dayOfWeek = "Monday"

$workHours = SWITCH $dayOfWeek
  CASE "Monday"
    8
  CASE "Tuesday"
    8
  CASE "Wednesday"
    8
  CASE "Thursday"
    8
  CASE "Friday"
    6
  CASE "Saturday"
    0
  CASE "Sunday"
    0
  DEFAULT
    8
END

RETURN $workHours`,
    testInputs: {},
    expectedOutput: 8,
    notes: 'SWITCH can be used as an expression'
  },

  // ============================================================================
  // ADVANCED Examples
  // ============================================================================
  {
    name: 'FOR Loop with SWITCH Inside',
    category: 'advanced',
    description: 'Categorize and count items by type',
    formula: `// Count items by category
$items = ["apple", "car", "banana", "truck", "orange", "bus"]
$fruitCount = 0
$vehicleCount = 0

FOR $item IN $items DO
  SWITCH $item
    CASE "apple"
      $fruitCount = $fruitCount + 1
    CASE "banana"
      $fruitCount = $fruitCount + 1
    CASE "orange"
      $fruitCount = $fruitCount + 1
    CASE "car"
      $vehicleCount = $vehicleCount + 1
    CASE "truck"
      $vehicleCount = $vehicleCount + 1
    CASE "bus"
      $vehicleCount = $vehicleCount + 1
  END
END

RETURN $fruitCount`,
    testInputs: {},
    expectedOutput: 3,
    notes: 'Combining FOR and SWITCH'
  },

  {
    name: 'Variable Range Iteration',
    category: 'advanced',
    description: 'Use variables to define range bounds',
    formula: `// Sum numbers in a variable range
$start = 5
$end = 10
$sum = 0

FOR $i IN $start..$end DO
  $sum = $sum + $i
END

RETURN $sum`,
    testInputs: {},
    expectedOutput: 45,
    notes: 'Range expressions can use variables'
  },

  {
    name: 'Complex Business Logic',
    category: 'advanced',
    description: 'Multi-step order processing',
    formula: `// Process orders with complex rules
$orders = [
  {status: "new", amount: 150},
  {status: "urgent", amount: 500},
  {status: "standard", amount: 300}
]

$totalRevenue = 0
$urgentCount = 0

FOR $order IN $orders DO
  // Determine processing fee based on status
  SWITCH $order.status
    CASE "new"
      $fee = $order.amount * 0.05
    CASE "urgent"
      $fee = $order.amount * 0.10
      $urgentCount = $urgentCount + 1
    CASE "standard"
      $fee = $order.amount * 0.03
    DEFAULT
      $fee = 0
  END
  
  $totalRevenue = $totalRevenue + $order.amount + $fee
END

RETURN $totalRevenue`,
    testInputs: {},
    expectedOutput: 1016.50,
    notes: 'Nested control structures with object access'
  },

  {
    name: 'Early Exit Pattern',
    category: 'advanced',
    description: 'Search for item with early exit',
    formula: `// Find first item matching multiple criteria
$products = [
  {name: "Widget", price: 25, inStock: FALSE},
  {name: "Gadget", price: 15, inStock: TRUE},
  {name: "Doohickey", price: 10, inStock: TRUE}
]

$minPrice = 12
$found = NULL

FOR $product IN $products DO
  IF $product.price >= $minPrice AND $product.inStock = TRUE THEN
    $found = $product.name
    BREAK
  END
END

RETURN $found`,
    testInputs: {},
    expectedOutput: 'Gadget',
    notes: 'Demonstrates early exit pattern with BREAK'
  },

  {
    name: 'WHILE with Multiple Conditions',
    category: 'advanced',
    description: 'Complex WHILE loop termination',
    formula: `// Accumulate until sum exceeds threshold OR max items
$values = [10, 20, 15, 30, 25, 40, 50]
$sum = 0
$index = 0
$threshold = 100
$maxItems = 5

WHILE $sum < $threshold AND $index < $maxItems DO
  $sum = $sum + $values[$index]
  $index = $index + 1
END

RETURN $sum`,
    testInputs: {},
    expectedOutput: 95,
    notes: 'Complex condition with multiple criteria'
  },

  {
    name: 'Nested SWITCH Statements',
    category: 'advanced',
    description: 'Nested decision making',
    formula: `// Complex approval routing
$requestType = "purchase"
$amount = 15000
$approved = FALSE

SWITCH $requestType
  CASE "purchase"
    SWITCH TRUE
      CASE $amount < 1000
        $approved = TRUE
        $approver = "manager"
      CASE $amount < 10000
        $approved = FALSE
        $approver = "director"
      DEFAULT
        $approved = FALSE
        $approver = "vp"
    END
  CASE "expense"
    SWITCH TRUE
      CASE $amount < 500
        $approved = TRUE
        $approver = "supervisor"
      DEFAULT
        $approved = FALSE
        $approver = "director"
    END
  DEFAULT
    $approved = FALSE
    $approver = "unknown"
END

RETURN $approver`,
    testInputs: {},
    expectedOutput: 'vp',
    notes: 'Nested SWITCH for complex routing logic'
  }
];

/**
 * Get samples by category
 */
export function getSamplesByCategory(category: LoopSwitchSample['category']): LoopSwitchSample[] {
  return loopsSwitchSamples.filter(sample => sample.category === category);
}

/**
 * Get sample by name
 */
export function getSampleByName(name: string): LoopSwitchSample | undefined {
  return loopsSwitchSamples.find(sample => sample.name === name);
}

/**
 * Get all sample names for autocomplete
 */
export function getAllSampleNames(): string[] {
  return loopsSwitchSamples.map(sample => sample.name);
}
