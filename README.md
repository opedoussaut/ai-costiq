# AI CostIQ

> **AI Costs. Business Value. P&L Impact.**

AI CostIQ is an experimental reference application for measuring the economics of enterprise AI and agentic workflows.

It connects **AI execution telemetry** to **industrial business outcomes** so that AI can be managed in the language of operating cost, realized value, contribution margin, and P&L impact — not only tokens and model calls.

## The question

Enterprise AI creates a measurement gap:

- Engineering teams can see models, tokens, tools, latency, and traces.
- Finance can see invoices and cloud spend.
- Business teams can see cycle time, quality, throughput, scrap, and revenue.
- Very few systems connect all three.

AI CostIQ is designed to answer:

> **For every euro spent operating AI, how much business value is actually realized?**

## Executive KPIs

AI CostIQ centers on five KPIs:

| KPI | Meaning |
| --- | --- |
| **AI Operating Cost** | Full cost-to-serve of the AI-enabled process |
| **Gross Business Value** | Economic value attributable to the AI-enabled process before AI OpEx |
| **Realized Business Value** | Value that can be defended as economically realizable |
| **Net AI Contribution** | Realized Business Value − AI Operating Cost |
| **Value / AI Cost** | Realized Business Value ÷ AI Operating Cost |

The primary management metric is:

```text
Net AI Contribution = Realized Business Value - AI Operating Cost
```

## First demo — AI-Augmented Quality Operations

The first scenario models an industrial quality organization operating at enterprise scale:

- **10 manufacturing sites**
- **100,000 quality investigations / year**
- baseline investigation effort: **2.5 engineering hours**
- AI-assisted effort: **1.0 engineering hour**
- loaded engineering cost: **€100/hour**
- productivity realization factor: **40%**
- modeled quality/rework value: **€4.0M/year**
- modeled AI operating cost: **€1.5M/year**

This produces the following **MODELED** economics:

| Measure | Modeled result |
| --- | ---: |
| Engineering hours released | **150,000 h/year** |
| Theoretical capacity value | **€15.0M/year** |
| Realized capacity value | **€6.0M/year** |
| Quality/rework value | **€4.0M/year** |
| Gross realized value | **€10.0M/year** |
| AI operating cost | **€1.5M/year** |
| **Net AI contribution** | **€8.5M/year** |
| **Value / AI Cost** | **6.7×** |

These are not claimed customer results. They are transparent scenario assumptions used to demonstrate the methodology.

## Evidence levels

Every economic number in AI CostIQ has an evidence status:

- **BENCHMARKED** — supported by external industry evidence, but not measured in the current organization.
- **MODELED** — calculated from explicit assumptions.
- **MEASURED** — calculated from observed AI telemetry and actual business-system outcomes.

The objective is to progressively replace MODELED value with MEASURED value.

## Architecture

```text
                    ┌──────────────────────┐
                    │   BUSINESS EVENT     │
                    │ NCR / ECO / PO / ... │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   CODEX / AI AGENT   │
                    └──────────┬───────────┘
                               │
                         OpenTelemetry
                               │
                               ▼
                    ┌──────────────────────┐
                    │   OTEL COLLECTOR     │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┼─────────────┐
                 ▼             ▼             ▼
            AI execution   Cost ledger   Quality evidence
                 │             │             │
                 └─────────────┼─────────────┘
                               │
                         transaction_id
                               │
                               ▼
             ┌─────────────────────────────────┐
             │       BUSINESS OUTCOMES         │
             │ PLM / MES / ERP / Quality / BI │
             └────────────────┬────────────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │   VALUE ENGINE  │
                     └────────┬────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │      AI P&L       │
                    │ Cost / Value /    │
                    │ Contribution      │
                    └───────────────────┘
```

The key correlation field is:

```text
business.transaction.id
```

It connects an AI execution trace to the business event whose economic outcome is being measured.

## Repository structure

```text
ai-costiq/
├── README.md
├── AGENTS.md
├── demo/
│   └── quality-operations/
│       ├── scenario.yaml
│       └── README.md
├── telemetry/
│   ├── codex-config.example.toml
│   └── otel-collector.yaml
├── methodology/
│   └── ai-pnl.md
└── docs/
    └── architecture.md
```

## Codex + OpenTelemetry

Codex can export OpenTelemetry data for API activity, model execution, tool activity, latency, and token usage. AI CostIQ uses that telemetry as the technical evidence layer.

The repository keeps Codex telemetry configuration as a **template**. Codex OTel configuration belongs in the user's Codex configuration (normally `~/.codex/config.toml`), not as an automatically trusted project-local setting.

Prompts should remain redacted by default.

## Principle

> **Do not optimize AI for fewer tokens. Optimize AI for higher business contribution per euro of AI cost.**

## Status

**v0.1 — foundation**

Current focus:

1. Codex → OpenTelemetry capture
2. AI cost ledger
3. industrial business-value model
4. correlation through `business.transaction.id`
5. executive AI P&L view

