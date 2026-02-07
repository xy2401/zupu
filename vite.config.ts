
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Use a relative base path so the app works in any subdirectory
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000
  }
});
