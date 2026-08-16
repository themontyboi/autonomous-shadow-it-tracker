# Autonomous Shadow IT Tracker

Autonomous Shadow IT Tracker is a defensive External Attack Surface Management
(EASM) and exposure-monitoring project. Milestone 2 adds a responsive
cybersecurity SaaS product shell powered entirely by typed synthetic data.
Milestone 3 adds a reproducible Supabase/PostgreSQL data foundation and a small
backend-only data service while preserving the Milestone 1 health connection.

The database can now store synthetic foundational records. This repository does
**not** yet authenticate users, connect the dashboard to stored data, scan
domains, or use AI. Those capabilities belong to later, separately authorised
milestones.

## Current Milestone 3 status

Implemented:

- shared Next.js App Router product layout with eight application routes
- responsive desktop sidebar and accessible mobile navigation drawer
- typed synthetic assets, scans, findings, reports, and integration fixtures
- dashboard metrics, lightweight charts, tables, filters, and demo-only controls
- mocked New Scan interaction that performs no network activity
- compact checking, connected, and unavailable API health states
- FastAPI backend with a non-sensitive `GET /health` endpoint
- version-controlled Supabase configuration, PostgreSQL migration, and seed data
- tenant-oriented relational schema with constraints, indexes, and RLS enabled
- backend-only Supabase configuration and organization/domain service methods
- deterministic unit tests and an opt-in local Data API integration test
- explicit, configurable local CORS origins
- backend health test plus Ruff lint/format configuration
- environment templates and project documentation

## Current architecture and stack

The browser loads the Next.js product shell on port 3000. Product routes still
render centralized mock fixtures and do not query Supabase. A compact client
component independently calls FastAPI `GET /health` on port 8000. Backend-only
services can access the Supabase Data API when explicitly invoked; `/health`
does not require database configuration.

| Component | Technology | Current responsibility |
| --- | --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Lucide React | Present the responsive mock-data product shell and report backend health |
| Backend | Python 3.12+, FastAPI, Uvicorn, Supabase Python client | Serve health and provide internal database services |
| Database | Supabase CLI, PostgreSQL 17, Data API | Reproduce and expose the local relational foundation to backend services |
| Validation | ESLint, TypeScript, pytest, Ruff, local Supabase CLI | Check frontend, backend, schema, seed, and service behavior |

See [docs/architecture.md](docs/architecture.md) for the data flow and component
boundaries.

## Repository layout

```text
autonomous-shadow-it-tracker/
|-- frontend/               # Next.js browser application
|   |-- src/app/(product)/  # Shared product layout and application routes
|   |-- src/components/     # Shell, tables, badges, charts, demo interactions
|   |-- src/lib/            # API helper, mock fixtures, formatting
|   `-- src/types/          # Frontend security-domain types
|-- backend/
|   |-- app/api/health.py   # GET /health route
|   |-- app/main.py         # FastAPI app and CORS configuration
|   |-- app/models/         # Validated organization/domain records
|   |-- app/services/       # Lazy Supabase client and scoped data service
|   |-- tests/              # Backend automated tests
|   `-- pyproject.toml      # Python dependencies and tooling
|-- supabase/
|   |-- config.toml         # Repository-local Supabase CLI configuration
|   |-- migrations/         # Versioned PostgreSQL schema changes
|   `-- seed.sql            # Deterministic synthetic development data
|-- docs/                   # Architecture, milestone, prompt, learning logs
|-- .env.example            # Environment variable reference
`-- README.md
```

## Prerequisites

- Node.js 20.9 or newer (Node.js 24 was used for initial validation)
- npm
- Python 3.12 or newer (Python 3.13 was used for initial validation)
- Docker Desktop or another Docker-compatible runtime
- Supabase CLI 2.x, invoked directly or through `npx supabase`

## Local Supabase setup

From the repository root:

```powershell
npx supabase start
npx supabase status
npx supabase db reset --local
```

`db reset --local` reconstructs the database from the files in
`supabase/migrations/` and then applies `supabase/seed.sql`. Do not use a linked
reset for this local workflow. Supabase Studio is available at the URL printed
by `supabase status`.

Copy the local API URL and service-role key reported by the CLI into backend
process environment variables when exercising the data service. Hosted
environments should prefer `SUPABASE_SECRET_KEY`; local CLI compatibility can
use `SUPABASE_SERVICE_ROLE_KEY`. These are elevated backend-only values: never
place them in `NEXT_PUBLIC_*`, frontend source, or committed environment files.
See [docs/database-schema.md](docs/database-schema.md) for schema and security
details.

## Backend setup and start

PowerShell:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -e ".[dev]"
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

macOS/Linux activation equivalent:

```bash
source .venv/bin/activate
```

The built-in development CORS default allows `http://localhost:3000` and
`http://127.0.0.1:3000`. To override it in PowerShell before starting Uvicorn:

```powershell
$env:CORS_ALLOWED_ORIGINS = "http://localhost:3000,http://127.0.0.1:3000"
```

Use exact origins. Wildcards and malformed origins are rejected. The backend
template is `backend/.env.example`; it documents values but is not automatically
loaded, so export deployment-specific values through the process environment.
The Supabase client is created lazily, so these database values are not required
to start FastAPI or call `GET /health`.

Test the running endpoint:

```powershell
Invoke-RestMethod http://localhost:8000/health
```

Expected JSON:

```json
{"status":"ok","service":"shadow-it-tracker-api"}
```

## Frontend setup and start

Open a second terminal:

```powershell
cd frontend
Copy-Item .env.example .env.local
npm install
npm run dev
```

On macOS/Linux, use `cp .env.example .env.local`. Visit
<http://localhost:3000>, which redirects to `/dashboard`. With both development
servers running, the sidebar API status should move from **Checking** to
**Connected**. If FastAPI is stopped or misconfigured, it displays
**Unavailable** and the mock-data product UI remains usable.

`NEXT_PUBLIC_API_BASE_URL` is compiled into browser-delivered JavaScript. It is
appropriate for a public API location only—never place secrets, credentials, or
tokens in any `NEXT_PUBLIC_*` variable.

## Validation commands

Backend (with the virtual environment active):

```powershell
cd backend
python -c "from app.main import app; print(app.title)"
python -m pytest
python -m ruff check .
python -m ruff format --check .
```

The Supabase integration test is skipped during the normal deterministic test
run. To exercise it against the local stack, set `RUN_SUPABASE_INTEGRATION=1`,
`SUPABASE_URL`, and one backend-only elevated key before running
`python -m pytest -m integration`.

Frontend:

```powershell
cd frontend
npm run lint
npm run typecheck
npm run build
```

## Security and ethical scope

This product is intended only for defensive monitoring of assets an
organisation is authorised to assess. Full scanning in later milestones must
require verified organisational control or domain ownership; unrestricted
third-party scanning is not a product goal. Deterministic scanners will collect
evidence, while AI may later interpret that evidence—it will not replace
deterministic detection. Complete secrets must never be exposed in interfaces or
logs, and any future generated remediation remains subject to human review.

Milestone 3 introduces persistence shapes only. It contains no sign-up/sign-in,
sessions, user authorization, domain ownership verification, scanner or worker
logic, real asset discovery, vulnerability detection, AI/LLM calls,
remediation generation, notification delivery, billing enforcement, or
production deployment. All security and usage information shown in the
frontend remains synthetic demo data.
