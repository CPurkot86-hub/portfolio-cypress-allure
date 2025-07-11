const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config); // Habilita o plugin do Allure
      return config;
    },
    // baseUrl removido, pois você já usa URLs completas
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.js'
  },
  reporter: 'cypress-mochawesome-reporter', // pode manter se estiver usando
  env: {
    allure: true
  }
});
