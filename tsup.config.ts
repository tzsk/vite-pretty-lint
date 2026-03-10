import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts', 'src/templates/*.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  target: 'es2022',
  outDir: 'dist',
  banner: {
    js: '#!/usr/bin/env node',
  },
});
