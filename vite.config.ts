import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    host: '0.0.0.0', // Разрешает доступ со всех IP
    port: 5173,
    strictPort: true,
    allowedHosts: [],
  },
  build: {
    outDir: 'build'
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, './src/styles'),
      '@': path.resolve(__dirname, './src'),
    },
  }
})
