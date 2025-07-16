// cypress.config.js
import { defineConfig } from 'cypress';
import allureWriter from '@shelex/cypress-allure-plugin/writer.js';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    baseUrl: 'https://www.lojadaconstrucao.com.br', // ajuste conforme sua aplicação
    specPattern: 'cypress/e2e/**/*.cy.js'
  }
});
