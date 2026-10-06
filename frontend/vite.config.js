import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_DEV_API_TARGET || 'http://localhost:3000'

  return {
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: {
      // dev rejimda /api so'rovlari backendga yo'naltiriladi
      proxy: { '/api': apiTarget },
    },
    preview: {
      proxy: { '/api': apiTarget },
    },
    build: {
      assetsInlineLimit: 0,
    },
  }
})
