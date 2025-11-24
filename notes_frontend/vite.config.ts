import { defineConfig, UserConfig } from 'vite'

/**
 * PUBLIC_INTERFACE
 * getPort resolves the dev server port from environment variables with a safe default.
 * Honors VITE_PORT or PORT, falling back to 3000.
 * Always returns a single number (never an array) to avoid Vite/Slidev option parsing errors.
 */
function getPort(): number {
  const raw = process.env.VITE_PORT || process.env.PORT || '3000'
  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 3000
}

const PORT = getPort()

/**
 * PUBLIC_INTERFACE
 * Vite configuration for both dev and preview servers.
 * - host: true binds to 0.0.0.0
 * - port: taken from env via getPort()
 * - strictPort: true ensures we fail if port is occupied (useful in CI)
 */
export default defineConfig({
  server: {
    host: true, // equivalent to '0.0.0.0' and cross-platform
    port: PORT,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  preview: {
    host: true,
    port: PORT,
    strictPort: true,
  },
} as UserConfig)
