# TCRM Starter

Starter CRM application using:

- .NET 8 Web API
- PostgreSQL
- React + TypeScript
- Tailwind CSS
- Docker Compose

## Structure

- `backend/Tcrm.Api` - ASP.NET Core Web API
- `frontend` - React + TypeScript app powered by Vite
- `docker-compose.yml` - Local development stack

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
   - `dotnet ef database update` ** NOT NECESSARY / DOESN'T WORK 
   --> $env:ASPNETCORE_URLS="http://localhost:8080" *must use PS
   - `dotnet run`
4. Run the frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## Default Auth Flow

- Register with `POST /api/auth/register`
- Login with `POST /api/auth/login`
- Use the returned JWT as `Bearer <token>`

## Notes

- AI endpoints are starter implementations that return deterministic placeholder guidance.
- For the starter phase, the backend uses PostgreSQL and Entity Framework Core.

# TESTING

Testing backend ie. http://localhost:8080/api/contacts
will result in 401 Unauthorized.
## Run frontend as to pass necessary JWT..

# DEPLOYMENT NOTES

## Neon ConnectionString Notes:
* parsed your URL (user/password from the URI userinfo, host from host, DB name from the path) and mapped them to Npgsql fields: Host, Port (default 5432), Username, Password, Database.
* set SSL from sslmode=require → Ssl Mode=Require and added Trust Server Certificate=True (Neon uses managed certs; this avoids local validation issues). I also added Pooling=true.
* channel_binding=require query param is not directly represented in Npgsql connection strings so it was not mapped explicitly.
* Runtime conversion code is in Program.cs and the converted string was placed into appsettings.json.
