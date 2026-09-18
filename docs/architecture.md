# AI CostIQ — Reference Architecture

## Goal

Create an auditable path from an AI execution to its economic impact.

## Layers

### 1. Business transaction

A process event with a stable identifier.

Examples:

- quality investigation,
- engineering change,
- supplier-risk decision,
- maintenance case,
- simulation campaign.

### 2. AI execution

Codex is the first instrumented agent runtime.

The architecture should remain extensible to other agent/model runtimes.

### 3. Telemetry

OpenTelemetry is the canonical technical telemetry layer.

Technical evidence can include:

- model/runtime,
- token usage,
- duration,
- tool calls,
- success/failure,
- retries,
- session/run identifiers.

Sensitive prompt content should remain disabled/redacted by default.

### 4. Cost ledger

The cost ledger translates measured resource consumption into economic cost.

A cost record should identify:

- transaction,
- cost category,
- quantity,
- unit,
- unit price,
- amount,
- pricing source,
- evidence status,
- timestamp.

### 5. Outcome ledger

The outcome ledger records process results such as:

- cycle time,
- human review time,
- quality score,
- rework,
- scrap,
- throughput,
- downtime,
- revenue/contribution outcome.

### 6. Value engine

The value engine applies explicit value equations to outcome deltas.

It must preserve:

- baseline,
- assumptions,
- realization factors,
- attribution method,
- evidence status.

### 7. AI P&L

The executive layer aggregates by:

- enterprise,
- business unit,
- site,
- use case,
- agent,
- process,
- time period.

The user should be able to drill from a multi-million-euro executive KPI down to the individual transactions and AI telemetry supporting it.

## Target drill-down

```text
Enterprise AI P&L
  -> Business unit
    -> Site
      -> Use case
        -> Business transaction
          -> AI run
            -> model/tool/token telemetry
```

## Data contract

AI CostIQ custom business attributes should use an application namespace to avoid being confused with official OpenTelemetry semantic conventions.

Suggested initial attributes:

```text
costiq.business.transaction.id
costiq.business.process
costiq.business.site
costiq.business.unit
costiq.evidence.status
costiq.outcome.success
costiq.outcome.quality_score
```

Where official OpenTelemetry semantic conventions exist, preserve and use them rather than redefining them.
