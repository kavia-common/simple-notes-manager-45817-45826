import { defineConfig, UserConfig } from 'vite'

/**
 * Resolve port from environment, default to 3000.
 * VITE_* envs are exposed to client by Vite, but we also use them here at build-time.
 */
const PORT = Number(process.env.VITE_PORT || process.env.PORT || 3000)

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
    }
  },
} as UserConfig)
