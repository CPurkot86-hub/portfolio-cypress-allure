const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config); // Habilita o plugin do Allure
      return config;
    },
    // baseUrl removido, pois você já usa URLs completas no cy.visit()
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}', // Onde ficam seus testes
    supportFile: 'cypress/support/e2e.js'       // Arquivo de suporte
  },
  env: {
    allure: true // Ativa o plugin Allure
  }
});
