# AI CostIQ — Agent Instructions

## Product intent

AI CostIQ measures the economics of enterprise AI and agentic workflows.

Every implementation decision should preserve the chain:

```text
AI execution -> cost -> business transaction -> outcome -> realized value -> P&L contribution
```

## Non-negotiable principles

1. Never present modeled assumptions as measured savings.
2. Every business-value figure must carry an evidence status: `BENCHMARKED`, `MODELED`, or `MEASURED`.
3. Every measured AI run should be linkable to a `business.transaction.id`.
4. Token counts are diagnostic data, not the primary executive KPI.
5. Full AI cost-to-serve includes more than model inference.
6. Productivity time saved is not automatically cash savings; apply an explicit realization mechanism.
7. Keep prompts and sensitive business content redacted by default in telemetry.
8. Prefer open standards and portable telemetry; OpenTelemetry is the default observability layer.
9. Keep the demo industrial, financially material, and auditable.
10. Do not invent customer outcomes or external benchmark figures.

## Primary KPIs

- AI Operating Cost
- Realized Business Value
- Net AI Contribution
- Value / AI Cost
- Outcome Quality / Success Rate

## Initial use case

AI-Augmented Quality Operations at enterprise scale.

The first scenario is intentionally modeled and synthetic. It exists to validate the architecture and economic methodology before connecting real systems.
