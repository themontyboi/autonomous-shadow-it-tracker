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
