import { defineConfig } from '@adonisjs/cors'
import env from '#start/env'

/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 */
function parseCorsOrigins(value: string) {
  return value
    .split(',')
    .map(origin => origin.trim())
    .filter(origin => origin.length > 0)
}

const corsConfig = defineConfig({
  enabled: true,
  origin: parseCorsOrigins(env.get('CORS_ORIGIN')),
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
