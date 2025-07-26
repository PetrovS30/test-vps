import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://31.41.155.175', // Все запросы, начинающиеся с /api, будут перенаправлены на Express
    },
  },
})
