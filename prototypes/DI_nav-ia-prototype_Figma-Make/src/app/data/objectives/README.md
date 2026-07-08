##

 Business Objectives Data Layer

Comprehensive OKR-inspired (Objectives and Key Results) data structure for tracking strategic goals, business objectives, key results, and metrics with links to decision automations.

---

## 📊 Overview

This data layer provides:
- **Strategic Goals**: Top-level organizational goals
- **Business Objectives**: Specific, measurable objectives
- **Key Results**: Measurable outcomes
- **Metrics**: KPIs and measurements
- **Automation Links**: Connect objectives to decision automations

### Hierarchy

```
Strategic Goals (5)
  └─> Business Objectives (15)
      └─> Key Results (45+)
          └─> Metrics (30+)
```

### Relationships

```
Objectives ←→ Automations
Objectives ←→ Services
Objectives → Goals
Key Results → Objectives
Metrics → Key Results
```

---

## 🚀 Quick Start

```typescript
import { useObjectives, useGoals } from '@/data/hooks';

function ObjectivesPage() {
  // Get all objectives
  const { objectives } = useObjectives();
  
  // Get objectives for specific automation
  const { objectives: autoObjectives } = useObjectives({
    filter: { automationId: 'automation-6-24-20' }
  });
  
  // Get strategic goals
  const { goals } = useGoals();
  
  return <div>{objectives.length} objectives found</div>;
}
```

---

## 📁 Files

| File | Purpose | Lines |
|------|---------|-------|
| `types.ts` | TypeScript type definitions | ~400 |
| `goals.ts` | 5 strategic goals | ~150 |
| `objectives.ts` | 15 business objectives | ~600 |
| `key-results.ts` | 45+ key results | ~800 |
| `metrics.ts` | 30+ metrics | ~500 |
| `lookups.ts` | Query/filter functions | ~300 |
| `index.ts` | Main exports | ~50 |
| `README.md` | This file | ~400 |

**Total**: ~3,200 lines

---

## 🎯 Strategic Goals (5)

1. **Accelerate Revenue Growth** (67% progress)
   - 3 objectives, critical priority
   - Impact: Revenue Growth
   
2. **Achieve Operational Excellence** (58% progress)
   - 3 objectives, critical priority
   - Impact: Operational Efficiency
   
3. **Deliver Exceptional Customer Experience** (45% progress)
   - 3 objectives, high priority
   - Impact: Customer Satisfaction
   
4. **Strengthen Risk Management** (72% progress)
   - 3 objectives, critical priority
   - Impact: Risk Mitigation
   
5. **Drive Digital Transformation** (38% progress)
   - 3 objectives, high priority
   - Impact: Digital Transformation

---

## 💼 Business Objectives (15)

### Revenue Growth
- Reduce Customer Churn (75%)
- Improve Credit Decision Accuracy (82%)
- Streamline Customer Onboarding (68%)

### Operational Excellence
- Automate Fraud Detection (85%)
- Reduce Transaction Processing Time (52%)
- Improve Decision Accuracy (71%)

### Customer Experience
- Reduce Response Time (48%)
- Personalize Customer Offers (42%)
- Enable Proactive Support (38%)

### Risk Management
- Enhance Fraud Detection (78%)
- Improve Credit Scoring Models (84%)
- Ensure Regulatory Compliance (92%)

### Digital Transformation
- Scale AI Adoption (62%)
- Modernize Data Platform (35%)
- Complete Cloud Migration (28%)

---

## 🔗 Automation Links

Objectives are linked to decision automations:

| Objective | Automation | Progress |
|-----------|------------|----------|
| Improve Credit Decisions | automation-6-24-20 (AI) | 82% |
| Improve Credit Decisions | loan-approval-automation (AI) | 82% |
| Automate Fraud Detection | automation-6-24-20 (AI) | 85% |
| Reduce Churn | churn-prediction-model (AI) | 75% |
| Streamline Onboarding | test-8 | 68% |
| Scale AI Adoption | Multiple AI automations | 62% |

**Note**: Many objectives use AI-generated automations created by Decision Assistant!

---

## 📊 Key Results (45+)

Each objective has 2-3 key results:

### Example: "Improve Credit Decision Accuracy"

1. **Credit Accuracy**
   - Target: 95% accuracy
   - Current: 92%
   - Progress: 82%

2. **Approval Time**
   - Target: <2 hours
   - Current: 3.5 hours
   - Progress: 65%

3. **Loan Volume**
   - Target: 10,000/month
   - Current: 8,500/month
   - Progress: 85%

---

## 📈 Metrics (30+)

Metrics track KPIs, SLAs, benchmarks:

### Types
- **KPI**: Key Performance Indicators
- **SLA**: Service Level Agreements
- **Benchmark**: Comparison metrics
- **Diagnostic**: Health check metrics

### Examples
- Churn Rate (KPI)
- Fraud Detection Rate (KPI)
- Response Time (SLA)
- Processing Time (SLA)
- Customer Satisfaction (KPI)

---

## 🔍 Usage Examples

### Get All Objectives

```typescript
import { useObjectives } from '@/data/hooks';

const { objectives, count } = useObjectives();
```

### Filter by Status

```typescript
const { objectives } = useObjectives({
  filter: {
    status: 'on-track',
    priority: 'critical'
  }
});
```

### Get Objectives for Automation

```typescript
// Find all objectives supported by a specific automation
const { objectives } = useObjectives({
  filter: {
    automationId: 'automation-6-24-20'
  }
});
```

### Get Goal with Objectives

```typescript
import { useGoal, useObjectives } from '@/data/hooks';

const { goal } = useGoal('goal-revenue-growth');
const { objectives } = useObjectives({
  filter: { goalId: goal?.id }
});
```

### Get Key Results for Objective

```typescript
import { useKeyResults } from '@/data/hooks';

const { keyResults } = useKeyResults({
  filter: { objectiveId: 'obj-reduce-churn' }
});
```

### Get Metrics

```typescript
import { useMetrics } from '@/data/hooks';

const { metrics } = useMetrics({
  filter: {
    type: 'kpi',
    trend: 'improving'
  }
});
```

### Sort and Filter

```typescript
const { objectives } = useObjectives({
  filter: {
    status: ['on-track', 'active'],
    category: 'revenue',
    priority: ['critical', 'high']
  },
  sort: {
    field: 'progress',
    direction: 'desc'
  }
});
```

---

## 🎨 Type Definitions

### Main Types

```typescript
import type {
  StrategicGoal,
  BusinessObjective,
  KeyResult,
  Metric,
  ObjectiveCategory,
  GoalStatus,
  Priority,
  MetricType,
  MetricTrend,
} from '@/data/objectives';
```

### Status Types

```typescript
type GoalStatus = 
  | 'draft'
  | 'active'
  | 'on-track'
  | 'at-risk'
  | 'achieved'
  | 'abandoned';

type Priority = 
  | 'critical'
  | 'high'
  | 'medium'
  | 'low';
```

### Category Types

```typescript
type ObjectiveCategory = 
  | 'revenue'
  | 'cost-reduction'
  | 'customer-satisfaction'
  | 'operational-efficiency'
  | 'risk-management'
  | 'compliance'
  | 'innovation'
  | 'quality'
  | 'growth'
  | 'transformation';
```

---

## 🔧 Lookup Functions

All available in `/data/objectives/lookups.ts`:

```typescript
// Goals
getGoalById(id)
getAllGoals()
getGoalsByStatus(status)
getGoalsByPriority(priority)

// Objectives
getObjectiveById(id)
getAllObjectives()
getObjectivesByGoalId(goalId)
getObjectivesByAutomationId(automationId)
getObjectivesByCategory(category)

// Key Results
getKeyResultById(id)
getKeyResultsByObjectiveId(objectiveId)

// Metrics
getMetricById(id)
getMetricsByType(type)
getMetricsByTrend(trend)
```

---

## 🌟 Features

### 1. Multi-Level Hierarchy
Goals → Objectives → Key Results → Metrics

### 2. Automation Links
Direct relationships to decision automations and services

### 3. Progress Tracking
Real-time progress from 0-100% at every level

### 4. Status Management
Track draft, active, on-track, at-risk, achieved, abandoned

### 5. Priority System
Critical, high, medium, low with visual indicators

### 6. Ownership
Clear owners, teams, and accountability

### 7. Timeline Management
Start dates, target dates, achievement tracking

### 8. Dependencies
Objectives can depend on other objectives

### 9. Rich Metadata
Tags, notes, categories, impact areas

### 10. Filtering & Sorting
Powerful query capabilities

---

## 📦 Data Summary

| Entity | Count | Status |
|--------|-------|--------|
| Strategic Goals | 5 | ✅ Complete |
| Business Objectives | 15 | ✅ Complete |
| Key Results | 45+ | ✅ Complete |
| Metrics | 30+ | ✅ Complete |
| Automation Links | 20+ | ✅ Complete |

---

## 🔄 Integration with Automations

The objectives layer integrates seamlessly with the automations data layer:

```typescript
import { useObjectives, useAutomation } from '@/data/hooks';

function AutomationObjectives({ automationId }) {
  const { automation } = useAutomation(automationId);
  const { objectives } = useObjectives({
    filter: { automationId }
  });
  
  return (
    <div>
      <h2>{automation?.displayName}</h2>
      <h3>Supporting {objectives.length} Objectives:</h3>
      <ul>
        {objectives.map(obj => (
          <li key={obj.id}>
            {obj.name} ({obj.progress}%)
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🎯 Use Cases

### 1. Dashboard Views
Show all objectives with progress bars

### 2. Automation Impact
Display which objectives an automation supports

### 3. Goal Tracking
Monitor strategic goal progress

### 4. Team Performance
Track objectives by owner/team

### 5. Executive Reporting
Roll-up metrics for leadership

### 6. Risk Identification
Flag at-risk objectives

### 7. Dependency Management
Visualize objective dependencies

### 8. AI Impact Analysis
Show contribution of AI-generated automations

---

## 🚀 Next Steps

1. **Build UI Components**
   - Objective cards
   - Progress indicators
   - Goal timelines
   - Metric charts

2. **Create Pages**
   - Objectives overview
   - Goal detail pages
   - Metric dashboards

3. **Add Visualizations**
   - Progress charts
   - Dependency graphs
   - Impact analysis

4. **Extend Data**
   - More key results
   - Historical metrics
   - Progress updates

---

## 📚 Related Documentation

- **Automations**: `/data/automations/README.md`
- **Branching**: `/data/automations/BRANCHING_AND_VERSIONING.md`
- **Quick Reference**: `/data/automations/QUICK_REFERENCE.md`

---

**Last updated**: 2025-10-16  
**Version**: 1.0.0
