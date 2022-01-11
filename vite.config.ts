import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers';

import Icons from 'unplugin-icons/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [HeadlessUiResolver({}), IconsResolver()],
    }),
    Icons({
      // expiremental
      autoInstall: true,
      compiler: 'vue3',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
