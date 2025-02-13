import { defineConfig } from 'cypress';

/* eslint-disable */
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 10000,
    video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
