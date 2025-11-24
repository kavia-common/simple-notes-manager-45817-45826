import { defineConfig, UserConfig, Plugin } from 'vite'

/**
 * PUBLIC_INTERFACE
 * getPort resolves the dev/preview server port from environment variables with a safe default.
 * - Honors VITE_PORT only, falling back to 3000.
 * - Returns a single number to avoid option parser issues.
 */
function getPort(): number {
  const rawEnv = process.env.VITE_PORT ?? '3000'
  const rawFirst = Array.isArray(rawEnv) ? rawEnv[0] : String(rawEnv)
  const cleaned = rawFirst.split(',')[0].trim()
  const parsed = Number(cleaned)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 3000
}

const PORT = getPort()

/**
 * Simple health endpoint for readiness checks in CI/preview.
 * Exposes GET /healthz (or VITE_HEALTHCHECK_PATH) -> 200 OK with text 'ok'.
 */
function healthPlugin(): Plugin {
  const healthPath = process.env.VITE_HEALTHCHECK_PATH || '/healthz'
  return {
    name: 'health-endpoint',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === healthPath) {
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
        if (req.url === healthPath) {
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
 * Requirements satisfied:
 * - host: true binds to 0.0.0.0
 * - port: Number(process.env.VITE_PORT || 3000)
 * - strictPort: true (fail if taken to help CI detect readiness issues)
 * - chokidar polling enabled for CI stability
 * - do not auto-open browser
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
    host: true, // 0.0.0.0
    port: PORT,
    strictPort: true,
    open: false,
  },
} as UserConfig)
