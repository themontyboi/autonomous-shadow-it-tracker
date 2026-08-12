# Codex Prompt Log

For each implementation prompt, record the milestone, objective, included
scope, explicit exclusions, and outcome. Do not add future prompts
speculatively.

## Milestone 1 — Project Architecture & Local Environment

**Objective:** Create a production-minded but deliberately small Next.js and
FastAPI project skeleton that demonstrates local frontend-to-backend health
communication.

**Included:** Repository conventions, frontend, backend, `GET /health`, explicit
development CORS, environment templates, backend testing, lint/format/build
configuration, and documentation.

**Explicitly excluded:** Database/Supabase, authentication, user and organisation
models, domain registration or verification, scanners, asset discovery,
findings, workers/queues/schedules, AI/LLM or LangGraph, integrations, alerts,
billing, and demo scanning logic.

**Outcome:** Milestone 1 implementation prepared for developer validation and
review. No future milestone functionality was fabricated.

## Milestone 1 — Documentation Closure

**Objective:** Accurately close Milestone 1 after successful developer manual
QA.

**Included:** Update the milestone, learning, and prompt logs with the verified
runtime behavior, graceful offline handling, Git hygiene check, and QA result.

**Explicitly excluded:** Application code, dependencies, architecture, UI,
tests, configuration, Milestone 2 work, commits, and pushes.

**Outcome:** Manual QA recorded as passed and Milestone 1 documentation closed.
The confirmed Milestone 1 implementation commit was recorded after it was
pushed to `main`.

## Milestone 2 — Cybersecurity SaaS Dashboard UI

**Objective:** Replace the temporary status page with a polished responsive
security-product shell built from typed synthetic data.

**Included:** Eight product routes, shared responsive navigation, dashboard
metrics and lightweight charts, reusable severity/status/table components,
centralized typed fixtures, client-side findings filters, local settings, an
explicitly simulated New Scan interaction, and the preserved real API health
indicator.

**Explicitly excluded:** Supabase/PostgreSQL, authentication and accounts,
organisations and membership, real domain registration or verification, scan
APIs/workers/queues, network discovery or probing, vulnerability detection,
finding persistence, secret searching, AI/LLM/LangGraph, remediation, external
API/OAuth/webhook integrations, scheduling, Stripe, checkout, subscription
enforcement, and production deployment.

**Outcome:** Milestone 2 product-shell implementation prepared for automated
validation and developer manual QA. No real scanning or future backend system
was created.

## Milestone 2 — Responsive Layout Correction

**Objective:** Correct the mobile dashboard width defect identified during
developer QA without changing product behavior or desktop layout.

**Included:** Inspect computed layout sizing, contain the wide findings table
inside its existing horizontal scroller, rerun regressions, and record the QA
fix while leaving manual verification pending.

**Explicitly excluded:** Mock data, routes, filters, scan behavior, settings,
charts/data, backend code, API health behavior, dependencies, and all future
milestone systems.

**Outcome:** Replaced the dashboard activity grid's automatic minimum track with
explicit `minmax(0, …)` tracks so mobile content can use the viewport width
without document-level horizontal overflow. Developer mobile re-verification is
pending.
