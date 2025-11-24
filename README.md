# simple-notes-manager-45817-45826

Dev server notes:
- Frontend dev server binds to 0.0.0.0 and uses VITE_PORT or defaults to 3000.
- Do not pass --port/--host/--bind via scripts; Vite config controls these.
- Health endpoint for readiness: GET /healthz (override via VITE_HEALTHCHECK_PATH).