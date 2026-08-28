import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  test: {
    environment: 'happy-dom',
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'images/*.jpg'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,ico}'],
        navigateFallback: '/index.html',
      },
      manifest: {
        name: 'Опора',
        short_name: 'Опора',
        description: 'Спокійний план: спина, їжа, сім’я — без надриву.',
        theme_color: '#2F4A3C',
        background_color: '#F6F1E8',
        display: 'standalone',
        lang: 'uk',
        start_url: '/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
