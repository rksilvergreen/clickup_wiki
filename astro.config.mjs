import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        'clickup_wifi/wiki.config': fileURLToPath(new URL('./wiki.config.ts', import.meta.url)),
        clickup_wifi: fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
  integrations: [mdx()],
});
