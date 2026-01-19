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
    proxy: {
      '/v1': {
        target: 'https://cloud.appwrite.io',
        changeOrigin: true,
        secure: false,
        // Ключевой момент: перезаписываем Domain в куках
        configure: (proxy, _options) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            const setCookieHeaders = proxyRes.headers['set-cookie'];
            if (setCookieHeaders) {
              // Модифицируем каждую куку
              proxyRes.headers['set-cookie'] = setCookieHeaders.map((cookie) => {
                return cookie
                  // Меняем Domain на localhost
                  .replace(/Domain=[^;]+;?/i, 'Domain=localhost;')
                  // Убираем SameSite=None (он несовместим с localhost без HTTPS)
                  .replace(/SameSite=None;?/i, 'SameSite=Lax;');
              });
            }
          });
        }
      }
    }
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
