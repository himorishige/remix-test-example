/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './.vitest/setup.ts',
    css: true,
    testTimeout: 60_000,
    hookTimeout: 60_000,
    exclude: [...configDefaults.exclude, 'functions/*', '.vitest/*'],
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
    },
  },
});
