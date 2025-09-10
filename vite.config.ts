import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/twitter_n8n_v6/', // GitHub repo adınız için
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
