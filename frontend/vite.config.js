import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslint({
      lintOnStart: true,
      failOnError: mode === "production",
    }),
  ],
  server: {
    proxy: {
      '/api': mode === 'development' ? 'http://localhost:8000' : '', // No proxy needed in production
    },
  },
  build: {
    outDir: 'dist', // Ensure this matches where your Express server expects the built files
  },
}));
