import { defineWindiSetup } from '@slidev/types'

// PUBLIC_INTERFACE
export default {
  /**
   * Dev server options are delegated to Vite via vite.config.ts.
   * This file exists to keep Slidev configuration centralized.
   * We do not enable any auto-open behavior here.
   * Explicitly disable automatic browser opening for all environments.
   *
   * Important: Do NOT set host/port/strictPort here; those are defined
   * solely in vite.config.ts to avoid conflicting sources of truth.
   */
  open: false,
}
