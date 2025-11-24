# Welcome to [Slidev](https://github.com/slidevjs/slidev)!

To start the slide show / Notes App:

- `pnpm install`
- `pnpm dev` (binds to 0.0.0.0 and does not auto-open a browser)
- visit http://localhost:3000 (or your VITE_PORT)

Headless/CI environments:
- Use `pnpm dev:headless` to run without any auto-open behavior.
- Override the port with `VITE_PORT=3000 pnpm dev:headless` if needed.
- Server always binds to 0.0.0.0 for preview compatibility.
- Health endpoint available at `/healthz` (or set VITE_HEALTHCHECK_PATH) for readiness checks.

Port/Host single source of truth:
- host/port/strictPort are defined only in `vite.config.ts`:
  - host = true (0.0.0.0), port = Number(process.env.VITE_PORT || 3000), strictPort = true
- package.json scripts do not pass --port/--host/--bind/--open flags; they rely on Vite/Slidev config.
- Chokidar polling is enabled by default for CI stability (via Vite config).

Open the "Notes App" slide from the left navigator or navigate slides until you reach "Notes App".
Notes persist in your browser localStorage.

Edit the [slides.md](./slides.md) or the notes page at [pages/notes-app.md](./pages/notes-app.md) to see changes.

Learn more about Slidev at the [documentation](https://sli.dev/).
