# Frontend

The Milestone 1 Next.js frontend displays local application readiness and calls
the FastAPI `GET /health` endpoint from the browser. See the repository root
README for complete setup and scope documentation.

```powershell
Copy-Item .env.example .env.local
npm install
npm run dev
```

`NEXT_PUBLIC_API_BASE_URL` is public browser configuration and must never contain
secrets.
