import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        scope: '/',
        id: '/',
        name: 'The Right Way',
        short_name: 'The Right Way',
        start_url: '/',
        display: 'standalone',
        description: 'A to-do application',
        lang: 'en',
        dir: 'auto',
        theme_color: '#2b3f5d',
        background_color: '#2b3f5d',
        orientation: 'any',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
          },
          {
            src: '/TheRightWaylogo192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/TheRightWaylogo512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        screenshots: [
          {
            src: '/TheRightWayscreenshot.png',
            sizes: '2560x1431',
            type: 'image/png',
            description: 'A screenshot of the home page',
          },
        ],
        prefer_related_applications: false,
        shortcuts: [
          {
            name: 'TheRightWay',
            url: '/',
            description: 'Open the app',
          },
        ],
      },
    }),
  ],

  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },

  // IMPORTANT for Vercel
  base: '/',

  build: {
    outDir: 'dist',
  },

  server: {
    port: 3000,
    open: true,
  },
});

