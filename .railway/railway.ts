import { defineRailway, github, postgres, preserve, project, service } from 'railway/iac'

export default defineRailway(() => {
  const db = postgres('Postgres')

  const api = service('@truff-apps/api', {
    source: github('florianmg/truff-apps', { branch: 'main' }),
    build: {
      buildCommand: 'pnpm --filter @truff-apps/api build',
      watchPatterns: [
        '/apps/api/**',
        '/packages/domain/**',
        '/package.json',
        '/pnpm-lock.yaml',
        '/pnpm-workspace.yaml',
        '/mise.toml',
      ],
    },
    start: 'pnpm --filter @truff-apps/api start',
    preDeploy: 'node apps/api/build/ace.js migration:run --force',
    env: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0',
      LOG_LEVEL: 'info',
      TZ: 'UTC',
      SESSION_DRIVER: 'cookie',
      APP_URL: 'https://${{@truff-apps/api.RAILWAY_PUBLIC_DOMAIN}}',
      APP_KEY: preserve(),
      SECRET_TOKEN: preserve(),
      CORS_ORIGIN: preserve(),
      DB_HOST: db.env.PGHOST,
      DB_PORT: db.env.PGPORT,
      DB_USER: db.env.PGUSER,
      DB_PASSWORD: db.env.PGPASSWORD,
      DB_DATABASE: db.env.PGDATABASE,
    },
  })

  return project('truff-apps', {
    resources: [db, api],
  })
})
