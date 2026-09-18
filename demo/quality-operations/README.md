# Demo — AI-Augmented Quality Operations

## Executive story

A global manufacturer processes 100,000 quality investigations per year across 10 sites.

AI CostIQ compares the baseline process with an AI-assisted process and calculates:

- engineering capacity released,
- economically realized productivity,
- quality/rework value,
- full AI operating cost,
- net AI contribution,
- value generated per euro of AI cost.

## Why quality operations?

Quality investigations are useful for the first reference implementation because they combine:

- repeatable business transactions,
- human engineering effort,
- structured and unstructured context,
- tool use,
- measurable cycle time,
- measurable quality/rework outcomes,
- material enterprise-scale economics.

## Transaction-level demonstration

A single synthetic investigation will use:

```text
business.transaction.id = NCR-001
```

The agent will receive a synthetic evidence package and produce an investigation recommendation.

OpenTelemetry captures the AI execution. The demo then associates that execution with the business transaction and aggregates the economics to annual enterprise scale.

## Scale-up

The transaction-level demo proves traceability.

The annual scenario proves the management model:

```text
100,000 investigations/year
x measurable delta per investigation
= enterprise operating impact
```

The annual figures remain `MODELED` until supported by observed process data.
