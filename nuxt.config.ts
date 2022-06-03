import { defineNuxtConfig } from 'nuxt';
import { env, nodeless } from 'unenv';

const { alias } = env(nodeless);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { buffer: _, ...rest } = alias;

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vite: {
    define: {
      global: 'globalThis',
    },
    resolve: {
      alias: {
        ...rest,
      },
    },
  },
});
