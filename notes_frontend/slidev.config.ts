import { defineWindiSetup } from '@slidev/types'

// PUBLIC_INTERFACE
export default {
  /**
   * Dev server options are delegated to Vite via vite.config.ts.
   * This file exists to keep Slidev configuration centralized.
   * We do not enable any auto-open behavior here.
   * Explicitly disable automatic browser opening for all environments.
   */
  open: false,
}
