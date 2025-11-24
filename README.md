# simple-notes-manager-45817-45826

Dev server notes:
- Frontend dev server binds to 0.0.0.0 and uses VITE_PORT or defaults to 3000.
- Do not pass --port/--host/--bind/--open via scripts; Vite config controls these.
- Health endpoint for readiness: GET /healthz (override via VITE_HEALTHCHECK_PATH).
- strictPort is enabled to fail fast if the port is taken.
- Chokidar polling is enabled for CI stability (usePolling on, 100ms).
- There are no hard references to port 3001; use VITE_PORT to override if needed.