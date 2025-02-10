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
            src: '/TheRightWaylogo512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/TheRightWaylogo192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
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
        related_applications: [
          {
            platform: 'windows',
            url: 'The URL to your app in that app store',
          },
        ],
        prefer_related_applications: false,
        shortcuts: [
          {
            name: 'TheRightWay',
            url: '/shortcut',
            description: 'A description of the functionality of this shortcut',
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
  base: '/TheRightWay',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
  },
});
