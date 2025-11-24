import { defineConfig, UserConfig } from 'vite'

/**
 * PUBLIC_INTERFACE
 * getPort resolves the dev server port from environment variables with a safe default.
 * Honors VITE_PORT or PORT, falling back to 3000.
 */
function getPort(): number {
  const raw = process.env.VITE_PORT || process.env.PORT || '3000'
  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 3000
}

const PORT = getPort()

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: PORT,
    strictPort: true, // fail fast if port is busy so CI can report accurately
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  preview: {
    host: '0.0.0.0',
    port: PORT,
    strictPort: true,
  },
} as UserConfig)
