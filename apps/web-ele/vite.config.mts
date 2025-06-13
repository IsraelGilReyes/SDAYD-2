import { defineConfig } from '@vben/vite-config';

import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
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
