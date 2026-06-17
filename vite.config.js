import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    // Default target — covers all modern browsers with ES module support
    target: 'es2015',
    // Output directory (default, stated explicitly for clarity)
    outDir: 'dist',
    // Do not inline assets larger than 4 kB as base64
    assetsInlineLimit: 4096,
    // Source maps off in production — avoids exposing source code
    sourcemap: false,
  },

  // Drop console.* and debugger statements from the production bundle.
  // Dev-only logs guarded by import.meta.env.DEV are already dead-code-
  // eliminated by Vite, but this catches any unguarded console calls too.
  // This only applies during `vite build`, not `vite dev`.
  esbuild: command === 'build'
    ? { drop: ['console', 'debugger'] }
    : {},
}))
