import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/AI-Fertilizer-Recommendation-System-Project/',
  plugins: [react()],
  server: {
    host: '127.0.0.1', // bind explicitly to IPv4 localhost to avoid IPv6 binding issues
    // Use a fixed port to avoid Vite auto-incrementing when a port is taken
    port: 5174,
    // Fail if the port is already in use instead of falling back to another port
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})
