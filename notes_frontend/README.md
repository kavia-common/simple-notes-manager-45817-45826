# Welcome to [Slidev](https://github.com/slidevjs/slidev)!

To start the slide show / Notes App:

- `pnpm install`
- `pnpm dev` (binds to 0.0.0.0 and does not auto-open a browser)
- visit <http://localhost:3000> (or your VITE_PORT)

Headless/CI environments:
- Use `pnpm dev:headless` which sets `BROWSER=none` explicitly and disables any auto-open behavior.
- You can override the port with `VITE_PORT=3000 pnpm dev:headless`
- Server always binds to 0.0.0.0 for preview compatibility

Open the "Notes App" slide from the left navigator or navigate slides until you reach "Notes App".
Notes persist in your browser localStorage.

Edit the [slides.md](./slides.md) or the notes page at [pages/notes-app.md](./pages/notes-app.md) to see changes.

Learn more about Slidev at the [documentation](https://sli.dev/).
