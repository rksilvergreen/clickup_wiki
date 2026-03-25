import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        clickup_wiki: fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
  integrations: [mdx()],
});
