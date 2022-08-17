import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/localProxy': {
        target: 'https://www.rakki.fun:30789',
        rewrite: path => path.replace(/^\/localProxy/, ''),
        secure: true,
        changeOrigin: true,
      }
    }
  }
})
