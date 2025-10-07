import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // FIX: Replaced `process.cwd()` with `'.'` to avoid a dependency on Node.js types,
  // which resolves the TypeScript errors. The problematic `/// <reference types="node" />`
  // directive has also been removed.
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    base: '/prime-day-deal-finder/',
    define: {
      'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
    },
  }
})
