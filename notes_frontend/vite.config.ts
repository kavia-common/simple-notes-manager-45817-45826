import { defineConfig, UserConfig, Plugin } from 'vite'

/**
 * PUBLIC_INTERFACE
 * getPort resolves the dev server port from environment variables with a safe default.
 * Honors VITE_PORT or PORT, falling back to 3000.
 * Always returns a single number (never an array) to avoid Vite/Slidev option parsing errors.
 */
function getPort(): number {
  // Some CI inject arrays like "3000,3001" - normalize to first number
  const rawEnv = process.env.VITE_PORT || process.env.PORT || '3000'
  const raw = Array.isArray(rawEnv) ? rawEnv[0] : String(rawEnv).split(',')[0]
  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 3000
}

const PORT = getPort()

/**
 * Simple health endpoint for readiness checks in CI.
 * Exposes GET /healthz -> 200 OK with text 'ok'.
 */
function healthPlugin(): Plugin {
  return {
    name: 'health-endpoint',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === (process.env.VITE_HEALTHCHECK_PATH || '/healthz')) {
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/plain')
          res.end('ok')
          return
        }
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === (process.env.VITE_HEALTHCHECK_PATH || '/healthz')) {
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/plain')
          res.end('ok')
          return
        }
        next()
      })
    },
  }
}

/**
 * PUBLIC_INTERFACE
 * Vite configuration for both dev and preview servers.
 * - host: true binds to 0.0.0.0
 * - port: taken from env via getPort()
 * - strictPort: true ensures we fail if port is occupied (useful in CI)
 * - watch polling enabled for CI/headless environments
 */
export default defineConfig({
  plugins: [healthPlugin()],
  server: {
    host: true, // 0.0.0.0
    port: PORT,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
    open: false,
  },
  preview: {
    host: true,
    port: PORT,
    strictPort: true,
    open: false,
  },
} as UserConfig)
