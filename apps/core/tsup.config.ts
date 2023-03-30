import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts'],
  dts: true,
  splitting: false,
  sourcemap: true,
  outDir: 'dist',
  clean: true,
  minify: true,
  target: ['es2022'],
  format: ['esm'],
});
