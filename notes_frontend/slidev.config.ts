import { defineWindiSetup } from '@slidev/types'

// PUBLIC_INTERFACE
export default {
  /**
   * Dev server options are delegated to Vite via vite.config.ts.
   * We do not enable any auto-open behavior here.
   *
   * Important: Do NOT set host/port/strictPort here; those are defined
   * solely in vite.config.ts to avoid conflicting sources of truth.
   */
  open: false,
}
