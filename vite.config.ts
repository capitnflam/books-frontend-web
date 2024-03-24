/// <reference types="vitest" />

import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 4200,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react()],

  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },

  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['html', 'lcov'],
    },
  },
})
