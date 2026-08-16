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

**PASSED — developer verified:**

- All desktop product routes were reviewed successfully.
- The mobile width defect was fixed and re-verified with full-width content,
  normal mobile gutters, and no document-level horizontal overflow.
- The mobile navigation drawer opens and closes correctly, including its
  backdrop, navigation links, and secondary Settings/Billing access.
- The real local API health indicator continues to handle both **Connected** and
  **Unavailable** states without making the product shell unusable.
- The demo scan progression was verified as local-only presentation state and
  performs no network activity.
- Findings search/filter controls and local-only settings behavior were
  verified.

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
1.2:0.8 column ratio. Corrected mobile QA subsequently passed developer
verification.

### Documentation status

Milestone 2 README, architecture, prompt, learning, and milestone records
updated. Milestone 2 closed following successful developer manual QA.

### Commit

- **Hash:** `5a4720e1543e69623a624acd4a525a31571a919b`
- **Message:** `milestone 2: build cybersecurity SaaS dashboard`
- **Status:** Pushed to `main`.

## Milestone 3 — Supabase Database Foundation

**Date:** 2026-08-16

### Objective

Create a reproducible, tenant-oriented Supabase/PostgreSQL persistence
foundation with secure defaults and a small backend-only create/read service.

### Scope

Repository-local Supabase CLI configuration; one versioned schema migration;
deterministic synthetic seed data; 11 relational application tables; UUIDs,
foreign keys, constraints, indexes, updated-at triggers, RLS and least-privilege
grants; the official Supabase Python client; lazy backend configuration; scoped
organization/domain services; record models; unit tests; and an opt-in local
Data API integration test. Authentication, authorization, verification,
scanning, AI, delivery, billing, public data routes, and frontend persistence
were excluded.

### Technical decisions

- Use CLI-generated repository configuration and PostgreSQL 17 with migrations
  and seeding enabled.
- Use consistent snake_case `organizations` naming and UUID identifiers.
- Store `organization_id` on tenant rows and use composite tenant foreign keys
  to reject cross-organization relationships at the database boundary.
- Enable RLS on every public application table, revoke application access from
  `anon`/`authenticated`, define no policies before authentication exists, and
  grant CRUD only to the backend `service_role`.
- Prefer `SUPABASE_SECRET_KEY`, with `SUPABASE_SERVICE_ROLE_KEY` as local/legacy
  fallback, and create the client lazily so `/health` remains independent.
- Keep Data API access behind organization-scoped service methods rather than
  adding premature public FastAPI routes.
- Keep the Milestone 2 browser entirely on its existing typed mock fixtures.

### Files/systems changed

Added `supabase/` CLI configuration, initial migration, and seed; added backend
database record models, lazy client configuration, organization/domain service,
unit and integration tests; added the bounded Supabase Python dependency and
safe environment variable templates; added schema documentation and updated
current README, architecture, prompt, learning, and milestone records. No
frontend source or FastAPI route was changed.

### Automated validation performed

- Local `npx supabase start`/status: stack running; API and database endpoints
  reported.
- `npx supabase db reset --local`: passed repeatedly; migration and seed rebuilt
  the local database from zero.
- `npx supabase migration list --local`: one local migration matched database
  history (`20260815171352`).
- PostgreSQL inspection: 11/11 expected application tables present, RLS enabled
  on 11/11, zero application policies, and CRUD table grants restricted to
  `service_role`.
- Seed inspection: 2 organizations, 2 domains, 3 assets, 1 finding, and 1
  evidence record with tenant-separated relationships.
- Automated database-invariant regression: a cross-tenant scan/domain reference
  was rejected by the composite foreign key.
- Live backend Data API integration tests: passed, 2 tests; organization create/
  read, cross-tenant domain exclusion, and database-level tenant consistency
  were verified. Temporary test organizations were removed afterward.
- Backend deterministic test suite: passed, 9 tests with 2 integration tests
  skipped unless explicitly enabled.
- Ruff lint and format checks: passed.
- Frontend ESLint, TypeScript, and production build regressions: passed.

### Manual QA

**PASSED — developer verified:**

- Local Supabase started successfully, and Supabase Studio was accessible.
- All 11 expected public application tables were visible: `profiles`,
  `organizations`, `organization_members`, `domains`, `scans`, `assets`,
  `findings`, `evidence`, `remediations`, `integrations`, and `notifications`.
- Seeded tenant/domain data was present, and `npx supabase db reset --local`
  successfully recreated the seeded state.
- FastAPI `GET /health` continued to return
  `{"status":"ok","service":"shadow-it-tracker-api"}` without database
  configuration.
- Tenant-scoped service queries excluded another organization's domains.
- The automated invariant test proved that PostgreSQL rejects an Organization A
  scan referencing Organization B's domain with error `23503` from
  `scans_domain_tenant_fk`.
- Opt-in Supabase integration tests passed: 2 passed. The normal backend suite
  passed: 9 passed, 2 integration tests skipped.
- Ruff lint and format checks, frontend lint and TypeScript validation, the
  frontend production build, and `git diff --check` all passed.
- Git status contained no real environment files, JWT-like secrets, elevated
  frontend Supabase keys, or other credential material.
- The Milestone 2 frontend remained synthetic/mock-data driven. No
  authentication, domain verification, scanners, AI, alerts, billing,
  scheduling, or production deployment was implemented.

### Problems/fixes

The Supabase CLI was not installed globally, so the supported current CLI was
invoked through `npx`. First startup required downloading the local Docker
images; subsequent migration, seed, and reset operations completed normally.
The official Python client emitted upstream deprecation warnings for its
internal PostgREST timeout/verification arguments during integration testing;
the requests still passed and no deprecated application API is used. The
restricted test environment also prevented pytest from writing its optional
cache, without affecting test execution.

### Documentation status

Milestone 3 README, architecture, database schema, prompt, learning, and
milestone records updated. Milestone 3 documentation closed following
successful developer manual QA; the implementation commit remains pending.

### Commit

**PENDING developer review.**
