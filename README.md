# Truff apps

## What's inside?

- AdonisJS 7
- React + TanStack Router & Query
- Tuyau for type-safe API calls + @tuyau/react-query for React Query integration
- Tailwind CSS & Shadcn UI
- PostgreSQL 18
- Turborepo & PNPM for monorepo management
- Oxlint & Oxformat for fast linting/formatting
- Classic AdonisJS folder structure (controllers, models, validators, transformers, actions)

## Getting started

### Installation

1. Clone the repo:
   ```bash
   git clone <repository-url>
   cd truff-apps
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the database:
   ```bash
   docker compose up -d
   ```
4. Run migrations:
   ```bash
   cd apps/api
   cp .env.test .env
   node ace migration:run
   ```
5. Start the dev servers:
   ```bash
   pnpm dev
   ```

The API will be running at `http://localhost:3333` and the frontend at `http://localhost:5173`.

## Project structure

```
apps/
  api/   # AdonisJS backend
  web/   # React frontend
compose.yaml
turbo.json
pnpm-workspace.yaml
```

## Useful scripts

- `pnpm dev` – start everything in dev mode
- `pnpm build` – build both front and back
- `pnpm lint` – lint the whole project
- `pnpm format` – format code with Oxformat

## Production deployment

### API (Railway)

Set on the `@truff-apps/api` service (dashboard or `railway variable set`):

- `APP_KEY` – Adonis encryption key (`node ace generate:key` in `apps/api`)
- `SECRET_TOKEN` – random secret for protected routes
- `CORS_ORIGIN` – URL of the frontend that calls the API (comma-separated if several), e.g. `https://truff-webapp.<account>.workers.dev`

Apply `.railway/railway.ts` when the project is linked: `railway config plan` then `railway config apply`.

### Frontend (Cloudflare Workers)

The SPA reads `VITE_API_URL` at **build** time (see `apps/web/src/lib/tuyau.ts`). Set it when building:

```bash
VITE_API_URL=https://<your-railway-api>.up.railway.app pnpm deploy:web
```

In Cloudflare Workers Builds, add the same variable to the build environment. Example local file: copy `apps/web/.env.example` to `apps/web/.env.production` (not committed) before `pnpm build:web`.

---

Feel free to fork, get inspired, or contribute if you want!

MIT License
