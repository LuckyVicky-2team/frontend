import { defineConfig } from 'cypress';

/* eslint-disable */
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Next.js 앱이 동작하는 주소
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
