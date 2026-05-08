const path = require('node:path');
const { fileURLToPath } = require('node:url');
const { defineConfig } = require('vitest/config');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

module.exports = defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['lib/**/*.ts'],
      exclude: ['lib/supabase/**', 'lib/analytics/**']
    }
  },
  resolve: {
    alias: {
      '@': __dirname
    }
  }
});
