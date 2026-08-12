# Learning Log

This log records concepts demonstrated by the implementation. It does not claim
that a developer has reviewed or mastered them.

## Milestone 1 — Full-stack local foundation

- **Frontend/backend separation:** Next.js and FastAPI run as independent
  processes with distinct responsibilities and ports.
- **REST health endpoint:** A small `GET /health` response provides a stable,
  non-sensitive way for clients and operators to confirm API availability. It
  is an explicit route, so `GET /` correctly returning 404 is expected.
- **Real availability state:** The frontend status reflects an actual HTTP
  request to FastAPI rather than a hardcoded value.
- **Graceful API failure:** When the backend is offline, the frontend remains
  usable, reports the unavailable state, and provides a retry path.
- **Origins and CORS:** Scheme, host, and port form a browser origin. CORS allows
  an explicitly named frontend origin to read a cross-origin API response; it
  does not authorize a user.
- **Environment variables:** Runtime/deployment differences belong in
  configuration. Templates document expected names without committing local
  settings.
- **`NEXT_PUBLIC_*` implications:** Next.js exposes these values to browser code
  and may inline them at build time, so they can contain public locations but
  never secrets.
- **Python environments and packages:** A project-local virtual environment
  isolates FastAPI and development tools from the system Python installation.
- **Automated tests:** FastAPI's in-process test client can validate status and
  payload without starting an external service.
- **Lint and build validation:** Ruff enforces Python consistency; ESLint,
  TypeScript, and the Next.js production build catch distinct frontend issues.

## Milestone 2 — Cybersecurity product shell

- **Nested/shared layouts:** The `(product)` layout owns navigation and workspace
  chrome once, while each route supplies only its page content.
- **Route groups:** Parenthesized folders organize related App Router routes
  without appearing in public URLs.
- **Product information hierarchy:** Overview metrics lead to operational tables
  and focused presentation routes for assets, scans, findings, and reports.
- **Typed frontend models:** Small unions and interfaces constrain severity,
  status, assets, findings, scans, reports, and chart inputs.
- **Fixtures versus backend data:** Centralized `.invalid`-hostname fixtures are
  visibly marked as demo data and never presented as live scanner evidence.
- **Reusable boundaries:** The shell, headers, metrics, badges, tables, and
  charts carry shared behavior without creating a full UI framework.
- **Responsive navigation:** A persistent desktop sidebar becomes an accessible
  dismissible drawer on smaller screens.
- **Accessible security semantics:** Severity and status always include readable
  text; colour is supplementary, and charts provide labelled text equivalents.
- **Client-side UI state:** Filters, menu state, preferences, and demo scan
  progression remain ephemeral and require no persistence service.
- **Safe scan simulation:** The New Scan flow illustrates product states only;
  it performs no DNS, HTTP, TLS, API, or other reconnaissance activity.
