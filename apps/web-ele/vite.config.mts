import { defineConfig } from '@vben/vite-config';
import ElementPlus from 'unplugin-element-plus/vite';
import path from 'path';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
      },
      plugins: [
        ElementPlus({
          format: 'esm',
        }),
      ],
      server: {
        proxy: {
          '^/auth/.*': {
            target: 'http://localhost:8000',
            changeOrigin: true,
            secure: false,
            ws: true,
            rewrite: (path) => path,
          },
        },
      },
    },
  };
});
