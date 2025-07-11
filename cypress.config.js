const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config); // Habilita o plugin do Allure
      return config;
    },
    baseUrl: 'http://localhost:3000', // <- Altere se estiver testando outra URL
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}', // Define onde estão os testes
    supportFile: 'cypress/support/e2e.js'       // Arquivo de suporte (se estiver usando)
  },
  reporter: 'cypress-mochawesome-reporter', // (opcional se usar outro reporter)
  env: {
    allure: true                            // Importante para ativar o plugin
  }
});
