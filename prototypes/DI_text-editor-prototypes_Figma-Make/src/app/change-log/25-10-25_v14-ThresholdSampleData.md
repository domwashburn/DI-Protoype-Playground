# v14 - Threshold Gap Handling Sample Data

**Date:** October 25, 2025  
**Type:** Sample Data Enhancement  
**Status:** ✅ Complete  
**Epic:** [EPIC: Advanced Threshold Evaluation](/change-log/EPIC-AdvancedThresholdEvaluation.md)  
**Related:**
- [v13 - Threshold Gap Handling Phase 1](/change-log/25-10-25_v13-ThresholdGapHandlingPhase1.md)
- [v06 - Threshold Evaluation Architecture](/change-log/25-10-25_v06-ThresholdEvaluationArchitecture.md)

---

## Summary

Added **8 comprehensive threshold examples** to `/SampleData/formulaSamples.ts` demonstrating all gap handling strategies, complex use cases, and edge cases. Each example is a production-realistic scenario that showcases when and why to use specific gap strategies.

---

## Sample Formulas Added

### 1. Credit Score Assessment (With Gaps)
**ID:** `credit-score-with-gaps`  
**Strategy:** Demonstrates general gap detection  
**Use Case:** Financial credit scoring with historical adjustments

**Threshold Configuration:**
- 300-579: Poor (error)
- **GAP 580-599** (20 points)
- 600-669: Fair (warning)
- **GAP 670-689** (20 points)
- 690-739: Good (info)
- **GAP 740-759** (20 points)
- 760-799: Very Good (success)
- **GAP 800-819** (20 points)
- 820+: Excellent (success)

**Key Features:**
- Multiple consistent gaps (20 points each)
- Real-world credit scoring scenario
- Demonstrates how gaps naturally occur
- Tests gap detection across entire range

---

### 2. Usage-Based Pricing (Interpolation)
**ID:** `pricing-tier-interpolate`  
**Strategy:** Perfect for `interpolate` strategy  
**Use Case:** API usage-based pricing with smooth cost curves

**Threshold Configuration:**
- 0-10: Free Tier (info)
- **GAP 10.01-24.99** (14.99 points)
- 25-49: Starter (success)
- **GAP 49.01-99.99** (50.99 points)
- 100+: Enterprise (info)

**Why Interpolation:**
- Numeric return values (10, 25, 100)
- Smooth pricing curves desired
- Proportional cost calculation
- Example: value=17.5 → interpolates to ~16.25

**Formula Logic:**
```
Usage <= 100  → score = 10
Usage <= 500  → score = 25
Usage <= 1000 → score = 50
Usage > 1000  → score = 100
```

---

### 3. Risk Assessment (Overlapping Ranges)
**ID:** `risk-assessment-overlapping`  
**Strategy:** Demonstrates **overlap detection** (INVALID)  
**Use Case:** Transaction risk scoring

**Threshold Configuration:**
- 0-30: Low Risk (success)
- 25-60: Medium Risk (warning) ← **OVERLAPS 25-30**
- 55+: High Risk (error) ← **OVERLAPS 55-60**

**Purpose:**
- Shows overlap detection in action
- Demonstrates validation errors
- Tests error messaging
- Example of what NOT to do

**Expected Behavior:**
- ThresholdValidator detects 2 overlaps
- Errors shown in UI
- User must fix before using

---

### 4. Temperature Monitoring (Nearest Strategy)
**ID:** `temperature-monitoring`  
**Strategy:** Best for `nearest` strategy  
**Use Case:** Industrial temperature monitoring with calibration

**Threshold Configuration:**
- -273-0°C: Below Freezing (info)
- **GAP 0.01-19.99°C** (small gap)
- 20-25°C: Normal Range (success)
- **GAP 25.01-29.99°C** (small gap)
- 30-40°C: Elevated (warning)
- **GAP 40.01-49.99°C** (small gap)
- 50+°C: Critical (error)

**Why Nearest:**
- Small gaps (< 1°C tolerance acceptable)
- Physical measurement uncertainties
- Nearest threshold is intuitive
- Example: 29.5°C → "Normal Range" (closer to 25 than 30)

---

### 5. Employee Performance Rating (Continuous)
**ID:** `performance-rating-continuous`  
**Strategy:** Perfect thresholds (NO GAPS)  
**Use Case:** HR performance evaluations

**Threshold Configuration:**
- 0-59: Needs Improvement (error)
- 60-74: Meets Expectations (warning)
- 75-89: Exceeds Expectations (info)
- 90+: Outstanding (success)

**Purpose:**
- Demonstrates best practice (no gaps)
- Baseline for comparison
- Shows what continuous coverage looks like
- No gap strategy needed

**Formula Logic:**
```
baseScore = (tasksCompleted / tasksAssigned) * 100
+ customer satisfaction bonus
- overtime penalty
```

---

### 6. Inventory Reorder Point (Lower Strategy)
**ID:** `inventory-reorder-conservative`  
**Strategy:** Best for `lower` strategy (conservative)  
**Use Case:** Inventory management with safety stock

**Threshold Configuration:**
- 0-15%: Critical - Order Now (error)
- **GAP 15.01-24.99%**
- 25-50%: Low - Schedule Order (warning)
- **GAP 50.01-74.99%**
- 75+%: Adequate Stock (success)

**Why Lower:**
- Conservative approach to inventory
- Gap values round DOWN to be safe
- Example: 23% → "Critical" (lower=safer, ensures ordering)
- Prevents stockouts by being pessimistic

**Business Logic:**
```
If stock % falls in gap, assume lower category
→ Order sooner rather than later
→ Safety stock buffer
```

---

### 7. SLA Response Time (Upper Strategy)
**ID:** `sla-response-aggressive`  
**Strategy:** Best for `upper` strategy (aggressive)  
**Use Case:** Customer support SLA compliance

**Threshold Configuration:**
- 0-15 min: Excellent (success)
- **GAP 15.01-29.99 min**
- 30-60 min: Good (info)
- **GAP 60.01-119.99 min**
- 120-240 min: Acceptable (warning)
- **GAP 240.01-359.99 min**
- 360+ min: SLA Breach (error)

**Why Upper:**
- Aggressive SLA reporting
- Gap values round UP for stricter measurement
- Example: 118 min → "Acceptable" (upper=stricter, holds team accountable)
- Encourages faster response times

**Business Logic:**
```
If response time in gap, assume upper category
→ Higher standard applied
→ Drives performance improvement
```

---

### 8. Customer Satisfaction (Default Strategy)
**ID:** `customer-satisfaction-default`  
**Strategy:** Best for `default` strategy  
**Use Case:** Survey scoring with neutral option

**Threshold Configuration:**
- 0-30: Unhappy (error)
- **LARGE GAP 30.01-69.99** (39.99 points!)
- 70+: Satisfied (success)

**Why Default:**
- Large gap represents "neutral" sentiment
- Default value = "Neutral" (not in thresholds)
- Explicit handling of middle ground
- Example: 55 → returns "Neutral" (default)

**Formula Logic:**
```
totalScore = 0
+ 40 if would recommend
+ 30 if ease of use >= 4
+ 30 if support quality >= 4
= 0-100 score
```

---

### 9. Quality Control (Error Strategy - Strict)
**ID:** `quality-control-strict`  
**Strategy:** Best for `error` strategy (strict mode)  
**Use Case:** Manufacturing quality control

**Threshold Configuration:**
- 0-2%: Excellent Quality (success)
- **GAP 2.01-4.99%** ← THROWS ERROR
- 5-10%: Acceptable Quality (warning)
- **GAP 10.01-14.99%** ← THROWS ERROR
- 15+%: Poor Quality (error)

**Why Error:**
- Quality control requires precision
- Gaps are unacceptable in manufacturing
- Forces user to define complete coverage
- Example: 3.5% → **ERROR**: "Value 3.5 falls in gap..."

**Business Logic:**
```
Strict mode enforces:
- All possible values must be categorized
- No ambiguity allowed
- Complete threshold coverage required
```

---

## Sample Data Structure

Each sample includes:

```typescript
{
  id: string;                    // Unique identifier
  title: string;                 // Display name
  description: string;           // Strategy explanation
  formula: string;               // Working formula code
  variables: Variable[];         // Variable definitions
  formulaName: string;           // Function name
  formulaReturnType: 'number';   // Return type
  thresholds: Threshold[];       // Gap handling examples
  createdAt: string;             // Timestamp
  updatedAt: string;             // Timestamp
}
```

---

## Gap Strategy Summary Table

| Sample | Strategy | Gap Size | Use Case | Key Benefit |
|--------|----------|----------|----------|-------------|
| Credit Score | General | Medium (20 pts) | Financial scoring | Demonstrates gap detection |
| Pricing | Interpolate | Large | API pricing | Smooth cost curves |
| Risk | N/A (OVERLAP) | N/A | Transaction risk | Error detection |
| Temperature | Nearest | Small (< 1°C) | Industrial monitoring | Intuitive rounding |
| Performance | None (continuous) | No gaps | HR evaluation | Best practice example |
| Inventory | Lower | Medium | Stock management | Conservative safety |
| SLA | Upper | Large | Support metrics | Aggressive standards |
| Satisfaction | Default | Large (40 pts) | Survey scoring | Explicit neutral |
| Quality | Error (strict) | Medium | Manufacturing | Enforces precision |

---

## User Experience Flow

### 1. Exploring Gap Strategies

**User opens Formula Editor dropdown:**
```
1. Sees "Credit Score Assessment (With Gaps)"
2. Loads formula
3. Threshold Config shows gap warnings:
   "⚠️ Gap detected: Values between 579 and 600..."
4. Gap Strategy dropdown defaults to "nearest"
5. Tests with value 585 → "Fair" (nearest to 600)
6. Switches to "interpolate" → Error (can't interpolate strings)
7. Switches to "lower" → "Poor" (conservative)
8. Switches to "upper" → "Fair" (aggressive)
```

### 2. Learning Interpolation

**User selects "Usage-Based Pricing":**
```
1. Formula returns numeric scores (10, 25, 100)
2. Tests with value 17.5
3. Gaps detected, strategy = "interpolate"
4. Result: 16.25 (interpolated between 10 and 25)
5. Metadata shows calculation:
   "10 + (17.5-10)/(25-10) * (25-10) = 16.25"
6. User understands smooth pricing curve
```

### 3. Discovering Overlaps

**User selects "Risk Assessment":**
```
1. Loads formula
2. Immediate ERROR in Threshold Config:
   "❌ Overlap: 'Low Risk' and 'Medium Risk' both match 25-30"
   "❌ Overlap: 'Medium Risk' and 'High Risk' both match 55-60"
3. Cannot test until fixed
4. Learns: overlaps are blocking errors
5. Gaps are warnings, overlaps are errors
```

### 4. Conservative vs. Aggressive

**User compares Inventory (lower) vs. SLA (upper):**
```
Inventory (lower strategy):
- Value 23% in gap (15-25)
- Lower = "Critical" → Order now (safe)

SLA (upper strategy):
- Value 118 min in gap (60-120)
- Upper = "Acceptable" → Stricter standard
```

---

## Testing Scenarios

### Test 1: Gap Detection Accuracy

```typescript
import { ThresholdValidator } from './services/evaluationEngine';

const validator = new ThresholdValidator();
const creditThresholds = formulaSamples.find(f => f.id === 'credit-score-with-gaps').thresholds;

const analysis = validator.analyze(creditThresholds);

expect(analysis.gaps).toHaveLength(4); // 4 gaps detected
expect(analysis.gaps[0].min).toBe(579);
expect(analysis.gaps[0].max).toBe(600);
expect(analysis.warnings).toContain(/Gap detected.*579.*600/);
```

### Test 2: Interpolation Strategy

```typescript
import { ThresholdEvaluator } from './services/evaluationEngine';

const evaluator = new ThresholdEvaluator();
const pricingThresholds = formulaSamples.find(f => f.id === 'pricing-tier-interpolate').thresholds;

const result = evaluator.evaluate(17.5, pricingThresholds, {
  gapStrategy: 'interpolate'
});

expect(result.value).toBeCloseTo(16.25, 2);
expect(result.wasGap).toBe(true);
expect(result.strategyUsed).toBe('interpolate');
expect(result.metadata.interpolation).toBeDefined();
```

### Test 3: Overlap Detection

```typescript
const riskThresholds = formulaSamples.find(f => f.id === 'risk-assessment-overlapping').thresholds;

const analysis = validator.analyze(riskThresholds);

expect(analysis.isValid).toBe(false);
expect(analysis.overlaps).toHaveLength(2);
expect(analysis.errors).toContain(/Overlap.*Low Risk.*Medium Risk.*25.*30/);
```

### Test 4: Strategy Comparison

```typescript
// Test same gap value with different strategies
const testValue = 23; // In gap (15-25)
const inventoryThresholds = formulaSamples.find(f => f.id === 'inventory-reorder-conservative').thresholds;

const lowerResult = evaluator.evaluate(testValue, inventoryThresholds, { gapStrategy: 'lower' });
expect(lowerResult.value).toBe('Critical - Order Now'); // Conservative

const upperResult = evaluator.evaluate(testValue, inventoryThresholds, { gapStrategy: 'upper' });
expect(upperResult.value).toBe('Low - Schedule Order'); // Aggressive

const nearestResult = evaluator.evaluate(testValue, inventoryThresholds, { gapStrategy: 'nearest' });
expect(nearestResult.value).toBe('Low - Schedule Order'); // Closer to 25
```

---

## Educational Value

### For Users Learning Gap Strategies:

1. **Start with continuous** (Performance Rating) - see baseline
2. **Explore gaps** (Credit Score) - understand the problem
3. **Try nearest** (Temperature) - most intuitive
4. **Test interpolation** (Pricing) - see math in action
5. **Compare lower vs upper** (Inventory vs SLA) - business context
6. **Use default** (Satisfaction) - explicit neutral handling
7. **Encounter errors** (Quality Control) - strict mode
8. **Avoid overlaps** (Risk Assessment) - validation

### Progressive Complexity:

```
Simple → Complex
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Continuous (no gaps)
  ↓
Small gaps (nearest works)
  ↓
Large gaps (need strategy choice)
  ↓
Numeric gaps (interpolation option)
  ↓
Business context (lower vs upper)
  ↓
Sparse coverage (default strategy)
  ↓
Strict requirements (error strategy)
  ↓
Invalid config (overlaps - learn from errors)
```

---

## Integration with Threshold Config UI

These samples will populate the formula dropdown in the Formula Editor, allowing users to:

1. **Select from dropdown** - Choose any of the 8 gap examples
2. **Auto-load thresholds** - Thresholds automatically populate
3. **See gap warnings** - Immediate feedback on gaps
4. **Test gap values** - Try values that fall in gaps
5. **Compare strategies** - Switch strategies and see differences
6. **Learn by doing** - Hands-on exploration

**Example UI Flow:**
```
┌─────────────────────────────────────────────┐
│ Formula Dropdown                            │
│ ┌─────────────────────────────────────────┐ │
│ │ 📊 Credit Score Assessment (With Gaps) │ │ ← Select
│ │ 💰 Usage-Based Pricing (Interpolation) │ │
│ │ ⚠️  Risk Assessment (Overlapping)       │ │
│ │ 🌡️  Temperature Monitoring (Nearest)    │ │
│ │ ⭐ Performance Rating (Continuous)      │ │
│ │ 📦 Inventory Reorder (Lower Strategy)  │ │
│ │ ⏱️  SLA Response Time (Upper Strategy)  │ │
│ │ 😊 Customer Satisfaction (Default)     │ │
│ │ ✅ Quality Control (Error Strategy)    │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘

         ↓ (User selects Credit Score)

┌─────────────────────────────────────────────┐
│ Threshold Configuration                     │
│                                             │
│ ⚠️ Warnings (4)                              │
│ • Gap: 579-600 (Poor ↔ Fair)                │
│ • Gap: 669-690 (Fair ↔ Good)                │
│ • Gap: 739-760 (Good ↔ Very Good)           │
│ • Gap: 799-820 (Very Good ↔ Excellent)      │
│                                             │
│ Gap Strategy: [Nearest ▼]                   │
│                                             │
│ Test Value: [585]  [Evaluate]               │
│                                             │
│ Result: Fair (gap handled)                  │
│ • Used 'nearest' strategy                   │
│ • Distance to selected: 15 points           │
│ • Gap range: 579-600                        │
└─────────────────────────────────────────────┘
```

---

## Files Modified

- `/SampleData/formulaSamples.ts` - Added 8 comprehensive threshold examples

---

## Next Steps

### Phase 2: UI Integration
- [ ] Add gap strategy dropdown to ThresholdConfig
- [ ] Display gap/overlap warnings
- [ ] Show gap handling in test results
- [ ] Add strategy preview

### User Experience Enhancements
- [ ] Add visual gap indicators on threshold timeline
- [ ] Highlight which strategy is recommended for each sample
- [ ] Add "Try this strategy" suggestions in warnings
- [ ] Create interactive tutorial mode

---

## References

- [EPIC: Advanced Threshold Evaluation](/change-log/EPIC-AdvancedThresholdEvaluation.md)
- [v13 - Threshold Gap Handling Phase 1](/change-log/25-10-25_v13-ThresholdGapHandlingPhase1.md)
- [Evaluation Engine README](/services/evaluationEngine/README.md)

---

**Status:** ✅ Complete - Sample data ready for UI integration
