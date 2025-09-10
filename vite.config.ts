import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Cloudflare Pages için root path
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
