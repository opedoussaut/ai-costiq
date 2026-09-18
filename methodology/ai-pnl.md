# AI CostIQ — AI P&L Methodology

## 1. Objective

AI CostIQ evaluates AI as an operating capability, not merely as model consumption.

The core equation is:

```text
Net AI Contribution = Realized Business Value - AI Operating Cost
```

A second management KPI is:

```text
Value / AI Cost = Realized Business Value / AI Operating Cost
```

## 2. AI Operating Cost

Full cost-to-serve should include, when material:

```text
AI Operating Cost
= model inference
+ embeddings / retrieval
+ tool and API consumption
+ compute
+ data processing
+ orchestration
+ storage
+ observability
+ platform operations
+ human oversight
+ failure / retry overhead
```

Model/token cost alone is not the complete cost of an agentic process.

## 3. Productivity value

Time saved is not automatically cash saved.

For capacity-based productivity:

```text
Theoretical Capacity Value
= Transactions
x Hours Saved per Transaction
x Loaded Hourly Cost
```

Then:

```text
Realized Capacity Value
= Theoretical Capacity Value
x Productivity Realization Factor
```

The realization factor must be explicit and defensible.

Examples of stronger realization evidence include:

- avoided hiring,
- increased transactions processed with the same workforce,
- backlog reduction tied to throughput,
- reduced overtime,
- redeployment to measurable value-producing work.

## 4. Quality and risk value

Where probabilities and consequences are measurable:

```text
Expected Risk Value
= (Baseline Failure Probability - AI Failure Probability)
x Economic Consequence
x Relevant Transaction Volume
```

Examples:

- rework avoided,
- scrap avoided,
- warranty exposure reduced,
- downtime avoided,
- late-delivery penalties avoided.

## 5. Revenue value

Use contribution economics where possible rather than gross revenue:

```text
Incremental Contribution Value
= AI-attributable Incremental Revenue
x Contribution Margin
```

Attribution should use a baseline, comparison group, controlled rollout, or another documented causal method where feasible.

## 6. Evidence status

Every value record must carry one of:

### BENCHMARKED

External evidence indicates magnitude or plausibility.

It is not evidence that the current organization realized the value.

### MODELED

Calculated from explicit assumptions.

The assumptions must be inspectable.

### MEASURED

Derived from observed AI execution plus actual business-process outcomes.

Measured values should identify:

- source system,
- measurement window,
- baseline,
- transaction population,
- attribution method,
- confidence / limitations.

## 7. Transaction correlation

The central data contract is:

```text
business.transaction.id
```

Examples:

```text
NCR-001
ECO-98213
PO-77104
SIM-CAMPAIGN-204
SERVICE-CASE-91822
```

The identifier connects technical AI telemetry to a real business outcome.

## 8. Initial modeled example

For the quality-operations demo:

```text
100,000 investigations
x (2.5h - 1.0h)
x €100/h
= €15.0M theoretical capacity value

€15.0M
x 40% realization
= €6.0M realized capacity value

€6.0M capacity
+ €4.0M quality/rework
= €10.0M realized business value

€10.0M
- €1.5M AI operating cost
= €8.5M net AI contribution

€10.0M / €1.5M
= 6.67x value per AI cost
```

All values above are `MODELED`.
