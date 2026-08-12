# Milestone Log

Use the following headings for each milestone: Objective, Scope, Technical
decisions, Files/systems changed, Automated validation, Manual QA,
Problems/fixes, Documentation status, and Commit.

## Milestone 1 — Project Architecture & Local Environment

**Date:** 2026-08-12

### Objective

Establish a clean full-stack project skeleton and prove local communication
between a Next.js browser frontend and a FastAPI backend.

### Scope

Next.js, TypeScript, Tailwind CSS, ESLint, FastAPI, `GET /health`, local CORS,
safe environment templates, automated backend testing, and documentation.
Database, authentication, organisation/domain workflows, scanners, workers,
findings, AI, alerts, and billing were excluded.

### Technical decisions

- Keep the App Router page server-rendered and isolate browser health state in a
  small client component.
- Centralise fetch and response validation in `src/lib/api.ts`.
- Use a minimal FastAPI router and a validated comma-separated CORS origin list.
- Use a `pyproject.toml` project with pytest and Ruff development tooling.

### Files/systems changed

Created the `frontend/`, `backend/`, and `docs/` foundations plus root
environment, ignore, and README files. No external service was introduced.

### Automated validation performed

- FastAPI import: passed; application title printed successfully.
- pytest 9.1.1: passed, 1 test collected and passed.
- Ruff 0.16.2 lint: passed with all checks clean.
- Ruff 0.16.2 format check: passed, 5 files already formatted.
- ESLint: passed with no findings.
- TypeScript `tsc --noEmit`: passed.
- Next.js 16.3.0 production build: passed; `/` and `/_not-found` generated as
  static routes.
- Live local HTTP/CORS check: `/health` returned 200 and the expected JSON; the
  configured origin received `Access-Control-Allow-Origin`, while an unlisted
  origin did not.

### Manual QA

**PASSED — developer verified:**

- FastAPI started on `127.0.0.1:8000`, and `GET /health` returned the expected
  healthy response.
- Next.js started on `localhost:3000` and displayed **Frontend: Ready**.
- With FastAPI running, the frontend displayed **Backend API: Connected**.
- With FastAPI stopped, the frontend displayed **Backend API: Unavailable** and
  the Retry control while remaining usable without crashing.
- After FastAPI restarted, Retry returned the frontend to **Connected**.
- Git was initialized locally on branch `main`. Status contained only the
  expected project source and documentation; local environment files,
  dependencies, build output, virtual environments, caches, and obvious secrets
  were absent from untracked files.

### Problems/fixes

The official Next.js scaffolder created nested Git metadata; only that generated
metadata was removed to preserve a single repository boundary. The first Python
format check found formatter-only differences, which Ruff corrected. FastAPI's
current test client preferred `httpx2`, so the dev dependency was updated to the
current 2.x line. React's ESLint rules prompted an explicit asynchronous state
boundary in the health component. The first frontend build could not download
Google Fonts in the restricted environment; using a system font stack removed
the network-time build dependency, and the next build passed.

### Documentation status

README, architecture, milestone, prompt, and learning documentation completed;
Milestone 1 closed following successful developer manual QA.

### Commit

- **Hash:** `91428befa3462e3eaf6b0c0adc2b7b12abe2c2a6`
- **Message:** `milestone 1: initialise Shadow IT Tracker architecture`
- **Status:** Pushed to `main`.

## Milestone 2 — Cybersecurity SaaS Dashboard UI

**Date:** 2026-08-12

### Objective

Build the cybersecurity SaaS product shell with typed mock data.

### Scope

Responsive shared application navigation; Dashboard, Assets, Scans, Findings,
Reports, Integrations, Settings, and Billing routes; reusable UI primitives;
lightweight charts; presentation filters; local-only controls; and a mocked New
Scan flow. Existing FastAPI health communication was preserved.

### Technical decisions

- Use a `(product)` route group with a shared Next.js layout.
- Centralize small security-domain types in `src/types/security.ts` and all
  fixtures in `src/lib/mock-data.ts`.
- Keep pages server-rendered by default and isolate interactive client
  components.
- Use reusable severity/status badges, table primitives, metric cards, and
  lightweight CSS/SVG charts.
- Use a persistent desktop sidebar and accessible mobile drawer.
- Simulate scan progression entirely in local state with explicit safety copy.
- Keep the existing API helper and genuine FastAPI health request in a compact
  shell indicator.
- Add only `lucide-react`; no UI kit, charting, state, form, or API framework.

### Files/systems changed

Replaced the temporary root experience with a dashboard redirect and shared
product layout; added eight frontend routes, typed security models, centralized
mock fixtures, formatting utility, reusable shell/UI/chart/table components,
and local-only scan/filter/settings interactions. Updated current architecture,
README, prompt, learning, and milestone documentation. Backend code was not
changed.

### Automated validation performed

- `npm run lint`: passed with no findings.
- `npm run typecheck`: passed with no TypeScript errors.
- `npm run build`: passed with all eight product routes and the root route
  generated as static content.
- `python -m pytest`: passed, 1 test collected and passed in 0.68 seconds.
- `python -m ruff check .`: passed with all checks clean.
- `python -m ruff format --check .`: passed, 5 files already formatted.

### Manual QA

**PENDING — developer verification required.**

### Problems/fixes

An early typecheck showed that the installed Lucide package does not include
brand icons, so a neutral `GitBranch` icon was used for the GitHub demo card.
React lint rules rejected mutable chart-stop accumulation during render; the
calculation was made pure. The route-group layout uses a standard typed children
prop because generated route-aware `LayoutProps` does not represent the group.
Developer mobile QA then found the dashboard document widened beyond the
viewport. Computed-layout inspection traced this to the recent-activity grid's
automatic minimum track sizing: the 720px table minimum widened its grid item
instead of remaining inside the table scroller. Explicit zero-minimum grid
tracks now contain the table at mobile widths while preserving the desktop
1.2:0.8 column ratio. Corrected mobile QA remains pending developer verification.

### Documentation status

Milestone 2 README, architecture, prompt, learning, and milestone records
updated. Manual QA remains pending.

### Commit

PENDING developer review.
