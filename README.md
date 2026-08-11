# Autonomous Shadow IT Tracker

Autonomous Shadow IT Tracker is a defensive External Attack Surface Management
(EASM) and exposure-monitoring project. Milestone 1 establishes a local
full-stack foundation and proves that a browser-hosted Next.js frontend can
communicate with a FastAPI backend.

This repository does **not** yet scan domains, store data, authenticate users,
or use AI. Those capabilities belong to later, separately authorised
milestones.

## Milestone 1 status

Implemented:

- Next.js App Router frontend with TypeScript, Tailwind CSS, and ESLint
- frontend status page with checking, connected, and unavailable API states
- reusable browser API helper configured by environment variable
- FastAPI backend with a non-sensitive `GET /health` endpoint
- explicit, configurable local CORS origins
- backend health test plus Ruff lint/format configuration
- environment templates and project documentation

## Current architecture and stack

The browser loads the Next.js frontend on port 3000. A small client component
calls the FastAPI `GET /health` endpoint on port 8000. FastAPI permits only the
configured frontend origins at the browser CORS boundary.

| Component | Technology | Current responsibility |
| --- | --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4 | Present local readiness and report backend health |
| Backend | Python 3.12+, FastAPI, Uvicorn | Serve the health endpoint and local CORS policy |
| Validation | ESLint, TypeScript, pytest, Ruff | Check the Milestone 1 codebase |

See [docs/architecture.md](docs/architecture.md) for the data flow and component
boundaries.

## Repository layout

```text
autonomous-shadow-it-tracker/
|-- frontend/               # Next.js browser application
|   |-- src/app/            # App Router page and global styles
|   |-- src/components/     # Small interactive UI components
|   `-- src/lib/            # Reusable API helper
|-- backend/
|   |-- app/api/health.py   # GET /health route
|   |-- app/main.py         # FastAPI app and CORS configuration
|   |-- tests/              # Backend automated tests
|   `-- pyproject.toml      # Python dependencies and tooling
|-- docs/                   # Architecture, milestone, prompt, learning logs
|-- .env.example            # Environment variable reference
`-- README.md
```

## Prerequisites

- Node.js 20.9 or newer (Node.js 24 was used for initial validation)
- npm
- Python 3.12 or newer (Python 3.13 was used for initial validation)

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
<http://localhost:3000>. With both development servers running, the backend
status should move from **Checking** to **Connected**. If FastAPI is stopped or
misconfigured, the UI displays **Unavailable** and remains usable.

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

Milestone 1 intentionally contains no Supabase/PostgreSQL integration,
authentication, organisations, domain registration or verification, scanner or
worker logic, asset discovery, findings, AI/LLM integration, alerts, billing, or
demo scan functionality.

