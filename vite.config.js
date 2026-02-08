import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/.netlify/functions': {
        target: 'http://localhost:8888',
        changeOrigin: true,
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000, // Varsayılan 500kb limitini 1000kb'a çıkarır
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'xlsx'], // Büyük kütüphaneleri ayrı bir dosyaya böler
        },
      },
    },
  },
})
