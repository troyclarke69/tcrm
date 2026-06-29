# TCRM Starter

Starter CRM application using:
C#, React/Typescript, Postgres

## Startup (Docker)
docker compose up --build


## Quick Start

1. Install .NET 8 SDK, Docker Desktop, and Node.js.
2. Start PostgreSQL with Docker Compose:
   From project root - 
   - ..\TCRM
   - `docker compose up -d db` -- starts pg instance
   - docker compose down - stops

3. Run the API: ******* USE PowerShell *********
   - `cd backend/Tcrm.Api`
   - `dotnet restore`
   - `dotnet ef database update` ** NOT NECESSARY

   * ************************************************************
   * LOCAL -- 8080 -- IMPORTANT!!!
   * -> $env:ASPNETCORE_URLS="http://localhost:8080" 
   * must use PS
   * will get 401 Unauth if testing on 8080 -- run frontend
   * ************************************************************

   - `dotnet run`

4. Run the frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## Default Auth Flow


# TESTING *************IMPORTANT*****************************

Testing backend ie. http://localhost:8080/api/contacts
****************** will result in 401 Unauthorized.
## Run frontend as to pass necessary JWT..

# **********************************************************


# DEPLOYMENT NOTES

## Neon ConnectionString Notes:
* parsed your URL (user/password from the URI userinfo, host from host, DB name from the path) and mapped them to Npgsql fields: Host, Port (default 5432), Username, Password, Database.
* set SSL from sslmode=require → Ssl Mode=Require and added Trust Server Certificate=True (Neon uses managed certs; this avoids local validation issues). I also added Pooling=true.
* channel_binding=require query param is not directly represented in Npgsql connection strings so it was not mapped explicitly.
* Runtime conversion code is in Program.cs and the converted string was placed into appsettings.json.

# TCRM

## Overview

TCRM is a small CRM app with a .NET 8 backend (`backend/Tcrm.Api`) and a React + Vite frontend (`frontend`). This README covers local setup, configuration for secrets, and basic deployment notes for Neon (Postgres), Fly (backend) and Netlify (frontend).

## Local setup

Prerequisites:
- .NET 8 SDK
- Node.js 18+ and npm
- (Optional) Docker

Backend (run locally):

1. From the repo root, set your connection string securely.

Recommended (dotnet user-secrets):

```powershell
cd backend\Tcrm.Api
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=...;Port=5432;Username=...;Password=...;Database=...;Ssl Mode=Require;Trust Server Certificate=True;Pooling=true;"
dotnet run
```

Alternative (env var with Neon URL):

```powershell
$env:DATABASE_URL = 'postgresql://user:pass@host/dbname?sslmode=require'
dotnet run
```

Frontend (run locally):

```powershell
cd frontend
npm install
npm run dev
```

The backend expects a JWT for protected routes. Use the `/api/auth/register` or `/api/auth/login` endpoints to obtain a token.

## Configuration and secrets

- The repository does NOT contain secrets. `backend/Tcrm.Api/appsettings.json` contains an empty `DefaultConnection` placeholder.
- Local-only secrets file: `backend/Tcrm.Api/appsettings.Development.json` (gitignored) — useful for quick local testing.
- Recommended: use `dotnet user-secrets` for per-developer secrets and environment variables for CI/production.

## Deploy

Neon (Postgres):
- Create a Neon database and copy the connection URL.

Fly (backend):
- Ensure `flyctl` is installed.
- In `backend/Tcrm.Api` run:
```bash
flyctl launch
flyctl secrets set DATABASE_URL="postgresql://user:pass@host/dbname?sslmode=require"
flyctl deploy
```
Or set `ConnectionStrings__DefaultConnection` directly as a secret.

Netlify (frontend):
- Build and deploy the frontend. Set the `VITE_API_BASE_URL` environment variable to your Fly app URL (e.g. `https://your-app.fly.dev/api`).

## Security notes
- Do NOT commit any files containing secrets. If a secret was accidentally pushed, rotate credentials immediately.
- `appsettings.Development.json` is gitignored. Use env vars or user-secrets instead for team collaboration.

## Troubleshooting
- If the backend cannot connect to Postgres, check `DATABASE_URL` or `ConnectionStrings__DefaultConnection` and that SSL settings are correct.
- To see the effective connection string at runtime, prefer logging it temporarily (avoid committing logs that contain secrets).

---
For more help, ask me to: run the app here, set up CI, or create a Fly/Netlify deployment pipeline.

✅ Deployment Summary (Initial May 30 2026)

Backend: https://tcrm-api-verdant-thunder-5995.fly.dev/ (Fly.io)
Frontend: https://tecrm.netlify.app (Netlify)
Database: Neon PostgreSQL
GitHub: troyclarke69/tcrm (monorepo)
✅ Working Features

User registration & login with JWT tokens
CORS properly configured
All CRUD operations end-to-end
Next optional steps:

Add seeded demo users to backend (optional)
Set DATABASE_URL as Fly secret for better security (currently using appsettings.json)
Remove connection string from appsettings.json before next commit